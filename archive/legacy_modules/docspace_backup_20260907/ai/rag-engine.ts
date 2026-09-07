/**
 * RAG Engine (Retrieval-Augmented Generation)
 * Tải file search-index.json và cung cấp hàm tìm kiếm văn bản đơn giản.
 */

import { VAULT_CATALOG } from '../../knowledge-vault/vault-loader';
import type { VaultArticle } from '../../knowledge-vault/types';

export interface RAGChunk {
  id: string;
  file: string;
  title: string;
  specialty: string;
  tags: string[];
  heading: string;
  content: string;
}

let searchIndex: RAGChunk[] = [];
let isLoading = false;

// Khởi tạo RAG Index từ Catalog Knowledge Vault
function buildVaultRAGChunks(): RAGChunk[] {
  if (!Array.isArray(VAULT_CATALOG)) return [];
  return VAULT_CATALOG.map((art: VaultArticle) => ({
    id: `vault_${art.id}`,
    file: `#/vault?search=${encodeURIComponent(art.title)}`,
    title: art.title,
    specialty: art.specialty,
    tags: [art.khoCode, art.khoName, ...(art.tags || []), ...(art.icd10 || []), ...(art.keywords || [])],
    heading: `Kho Tri Thức ${art.khoName} (${art.khoCode})`,
    content: art.snippet || (art.content ? art.content.slice(0, 500) : '') || art.title
  }));
}

// Tải file index vào bộ nhớ RAM
export async function loadRAGIndex(): Promise<void> {
  if (searchIndex.length > 0 || isLoading) return;
  
  try {
    isLoading = true;
    console.log('[RAG] Đang nạp Knowledge Vault RAG index...');

    // 1. Nạp tức thì 2.362+ bài viết từ Knowledge Vault
    const vaultChunks = buildVaultRAGChunks();
    const seenIds = new Set<string>(vaultChunks.map(c => c.id));
    searchIndex = [...vaultChunks];

    // 2. Thử kéo thêm từ search-index.json nếu có
    try {
      const response = await fetch('data/search-index.json');
      if (response.ok) {
        const extraChunks: RAGChunk[] = await response.json();
        if (Array.isArray(extraChunks)) {
          extraChunks.forEach(c => {
            if (c && c.id && !seenIds.has(c.id)) {
              seenIds.add(c.id);
              searchIndex.push(c);
            }
          });
        }
      }
    } catch {
      // Offline mode: Vault chunks are already loaded!
    }

    console.log(`[RAG] Đã nạp thành công ${searchIndex.length} khối kiến thức y khoa EBM.`);
  } catch (error) {
    console.warn('[RAG] Lỗi khi nạp search index:', error);
    if (searchIndex.length === 0) {
      searchIndex = buildVaultRAGChunks();
    }
  } finally {
    isLoading = false;
  }
}

// Bỏ dấu tiếng Việt để tìm kiếm chính xác hơn
function removeVietnameseTones(str: string): string {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

// Hàm tìm kiếm đơn giản bằng chấm điểm từ khóa, hỗ trợ Boost bằng mã ICD-10
export function searchContext(query: string, icd10Codes: string[] = [], topK: number = 5): RAGChunk[] {
  if (!searchIndex.length || !query) return [];
  
  const cleanQuery = removeVietnameseTones(query.toLowerCase());
  const keywords = cleanQuery.split(/[\s,\.\-]+/).filter(w => w.length > 2);
  
  if (keywords.length === 0) return [];

  const scoredChunks = searchIndex.map(chunk => {
    let score = 0;
    const textToSearch = removeVietnameseTones(
      (chunk.title + " " + chunk.heading + " " + chunk.tags.join(" ") + " " + chunk.content).toLowerCase()
    );
    
    const titleLower = removeVietnameseTones(chunk.title.toLowerCase());
    const headingLower = removeVietnameseTones(chunk.heading.toLowerCase());

    for (const kw of keywords) {
      if (textToSearch.includes(kw)) {
        score += 1;
        // Điểm thưởng cho tiêu đề và phần tử heading
        if (titleLower.includes(kw)) score += 5;
        if (headingLower.includes(kw)) score += 3;
      }
    }
    
    // ICD-10 tag boost
    if (icd10Codes && icd10Codes.length > 0) {
      for (const code of icd10Codes) {
        if (!code) continue;
        const codeLower = code.toLowerCase();
        if (chunk.tags.some(t => t.toLowerCase().startsWith(codeLower))) {
          score += 10; // Boost rất mạnh cho tài liệu khớp mã ICD-10
        }
      }
    }
    
    return { chunk, score };
  });
  
  // Sắp xếp giảm dần và lấy top K
  scoredChunks.sort((a, b) => b.score - a.score);
  return scoredChunks.filter(s => s.score > 0).slice(0, topK).map(s => s.chunk);
}

export async function searchContextWithAI(
  query: string,
  settings?: any,
  icd10Codes: string[] = [],
  topK: number = 5
): Promise<{ chunks: RAGChunk[]; expandedKeywords: string[] }> {
  let expandedKeywords = [query];
  if (settings && settings.enabled && settings.endpoint) {
    const { expandQueryWithAI } = await import('./llm-client');
    expandedKeywords = await expandQueryWithAI(query, settings);
  }

  const combinedQuery = expandedKeywords.join(' ');
  const chunks = searchContext(combinedQuery, icd10Codes, topK);
  return { chunks, expandedKeywords };
}
