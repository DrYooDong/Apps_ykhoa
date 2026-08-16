/**
 * Search Engine cho CliniPortal (Offline-First)
 * Hỗ trợ tìm kiếm nhanh nhạy (< 5ms) qua chỉ mục offline (FlexSearch / Custom Indexer).
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

export interface SearchResult {
  doc: SearchDocument;
  score: number;
}

export class CliniSearchEngine {
  private index: Map<string, SearchDocument> = new Map();
  private isReady: boolean = false;

  constructor() {}

  /**
   * Thêm tài liệu vào chỉ mục tìm kiếm offline
   */
  public addDocument(doc: SearchDocument): void {
    this.index.set(doc.id, doc);
    this.isReady = true;
  }

  /**
   * Tự động nạp toàn bộ danh mục từ 7 phân hệ y khoa qua contentLoaderEngine
   */
  public async initAllIndexes(categories: string[] = ['pathophysiology', 'ebm', 'docspace']): Promise<void> {
    for (const category of categories) {
      try {
        const items = await contentLoaderEngine.loadCategoryIndex(category);
        items.forEach(item => {
          const cleanTitle = item.name
            .replace(/\.(html|md)$/i, '')
            .replace(/_/g, ' ');

          const itemUrl = item.path && item.path.startsWith('#/') ? item.path : `#/${item.category}/${item.id}`;

          this.addDocument({
            id: `${item.category}/${item.id}`,
            title: cleanTitle,
            category: item.category,
            keywords: [item.id, item.subcategory || '', item.category, ...(item.tags || [])],
            contentSnippet: [item.category, item.subcategory || '', item.description || '', cleanTitle].filter(Boolean).join(' - '),
            url: itemUrl
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
        data.forEach(doc => this.addDocument(doc));
        this.isReady = true;
      }
    } catch (e) {
      console.warn('[CliniSearchEngine] Không thể tải index từ web server, chuyển sang chế độ in-memory:', e);
    }
  }

  /**
   * Tìm kiếm từ khóa theo thời gian thực (< 5ms)
   */
  public search(query: string, limit: number = 10): SearchResult[] {
    if (!query || query.trim().length === 0) return [];
    
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    this.index.forEach((doc) => {
      let score = 0;
      if (doc.title.toLowerCase().includes(q)) {
        score += 10;
      }
      if (doc.category.toLowerCase().includes(q)) {
        score += 5;
      }
      if (doc.keywords.some(k => k.toLowerCase().includes(q))) {
        score += 7;
      }
      if (doc.contentSnippet.toLowerCase().includes(q)) {
        score += 3;
      }

      if (score > 0) {
        results.push({ doc, score });
      }
    });

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  public getAllDocuments(): SearchDocument[] {
    return Array.from(this.index.values());
  }
}

export const searchEngine = new CliniSearchEngine();

