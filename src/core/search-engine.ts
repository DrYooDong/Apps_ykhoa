/**
 * Search Engine cho CliniPortal (Offline-First)
 * Hỗ trợ tìm kiếm siêu tốc (< 5ms), không phân biệt dấu tiếng Việt
 * và tự động mở rộng từ viết tắt y khoa lâm sàng (SXHD, VPMN, UTI, DKA, AKI...).
 */

import { contentLoaderEngine } from './content-loader';

export interface SearchDocument {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  contentSnippet: string;
  url: string;
}

interface IndexedDocument {
  doc: SearchDocument;
  titleNorm: string;
  categoryNorm: string;
  keywordsNorm: string[];
  snippetNorm: string;
}

export interface SearchResult {
  doc: SearchDocument;
  score: number;
}

const MEDICAL_ABBREVIATIONS: Record<string, string[]> = {
  sxhd: ['sot xuat huyet dengue', 'dengue'],
  vpmn: ['viem mang nao', 'meningitis'],
  vmn: ['viem mang nao', 'meningitis'],
  ntt: ['nhiem trung tieu', 'uti'],
  uti: ['nhiem trung tieu', 'viem bang quang', 'viem than be than'],
  ruti: ['nhiem trung tieu tai phat', 'viem bang quang'],
  dka: ['nhiem toan ceton', 'dai thao duong'],
  aki: ['ton thuong than cap', 'suy than cap'],
  ckd: ['benh than man', 'suy than man'],
  copd: ['benh phoi tac nghen man tinh', 'bptnmt'],
  bptnmt: ['copd', 'benh phoi tac nghen man tinh'],
  cap: ['viem phoi mac phai cong dong', 'viem phoi'],
  hbv: ['viem gan b', 'viem gan vi rut b'],
  hcv: ['viem gan c', 'viem gan vi rut c'],
  vgsv: ['viem gan vi rut', 'viem gan'],
  nmct: ['nhoi mau co tim', 'acs'],
  acs: ['hoi chung vanh cap', 'nhoi mau co tim'],
  pe: ['thuyen tac phoi'],
  tcm: ['tay chan mieng'],
  crnn: ['sot chua ro nguyen nhan', 'fuo'],
  fuo: ['sot chua ro nguyen nhan'],
  ssti: ['nhiem trung da mo mem'],
  dili: ['ton thuong gan do thuoc'],
  ards: ['suy ho hap cap tien trien'],
  tb: ['lao phoi', 'lao'],
  sle: ['lupus ban do'],
};

function normalizeVi(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, ' ')
    .trim();
}

export class CliniSearchEngine {
  private index: Map<string, IndexedDocument> = new Map();
  private isReady: boolean = false;

  constructor() {}

  /**
   * Thêm tài liệu vào chỉ mục tìm kiếm offline (pre-normalized để tìm < 5ms)
   */
  public addDocument(doc: SearchDocument): void {
    this.index.set(doc.id, {
      doc,
      titleNorm: normalizeVi(doc.title),
      categoryNorm: normalizeVi(doc.category),
      keywordsNorm: (doc.keywords || []).map(normalizeVi).filter(Boolean),
      snippetNorm: normalizeVi(doc.contentSnippet),
    });
    this.isReady = true;
  }

  /**
   * Tự động nạp toàn bộ danh mục từ các phân hệ y khoa qua contentLoaderEngine
   */
  public async initAllIndexes(categories: string[] = ['pathophysiology', 'ebm', 'docspace']): Promise<void> {
    for (const category of categories) {
      try {
        const items = await contentLoaderEngine.loadCategoryIndex(category);
        items.forEach((item) => {
          const cleanTitle = item.name.replace(/\.(html|md|mdx)$/i, '').replace(/_/g, ' ');
          const itemUrl = item.path && item.path.startsWith('#/') ? item.path : `#/${item.category}/${item.id}`;

          this.addDocument({
            id: `${item.category}/${item.id}`,
            title: cleanTitle,
            category: item.category,
            keywords: [item.id, item.subcategory || '', item.category, ...(item.tags || [])],
            contentSnippet: [item.category, item.subcategory || '', item.description || '', cleanTitle]
              .filter(Boolean)
              .join(' - '),
            url: itemUrl,
          });
        });
      } catch (err) {
        console.warn(`[CliniSearchEngine] Failed to index category ${category}:`, err);
      }
    }
    console.log(`[CliniSearchEngine] Indexed ${this.index.size} clinical tools & articles across ${categories.length} modules.`);
    this.isReady = true;
  }

  /**
   * Tải danh sách chỉ mục từ file JSON (được tạo ra ở bước build)
   */
  public async loadIndex(indexUrl: string = '/search-index.json'): Promise<void> {
    try {
      const response = await fetch(indexUrl);
      if (response.ok) {
        const data: SearchDocument[] = await response.json();
        data.forEach((doc) => this.addDocument(doc));
        this.isReady = true;
      }
    } catch (e) {
      console.warn('[CliniSearchEngine] Không thể tải index từ web server, chuyển sang chế độ in-memory:', e);
    }
  }

  /**
   * Tìm kiếm từ khóa theo thời gian thực (< 5ms) — hỗ trợ không dấu & viết tắt y khoa
   */
  public search(query: string, limit: number = 10): SearchResult[] {
    const qNorm = normalizeVi(query);
    if (!qNorm) return [];

    const expandedTerms = new Set<string>([qNorm]);
    const tokens = qNorm.split(' ').filter(Boolean);
    tokens.forEach((tok) => {
      const expansions = MEDICAL_ABBREVIATIONS[tok];
      if (expansions) {
        expansions.forEach((exp) => expandedTerms.add(exp));
      }
    });
    const terms = Array.from(expandedTerms);

    const results: SearchResult[] = [];

    this.index.forEach((entry) => {
      let score = 0;
      for (const term of terms) {
        const isPrimary = term === qNorm;
        const weight = isPrimary ? 1 : 0.85;

        if (entry.titleNorm === term) {
          score += 20 * weight;
        } else if (entry.titleNorm.includes(term)) {
          score += 10 * weight;
        }
        if (entry.keywordsNorm.some((k) => k.includes(term))) {
          score += 7 * weight;
        }
        if (entry.categoryNorm.includes(term)) {
          score += 5 * weight;
        }
        if (entry.snippetNorm.includes(term)) {
          score += 3 * weight;
        }
      }

      if (score > 0) {
        results.push({ doc: entry.doc, score });
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  public getAllDocuments(): SearchDocument[] {
    return Array.from(this.index.values()).map((entry) => entry.doc);
  }
}

export const searchEngine = new CliniSearchEngine();
