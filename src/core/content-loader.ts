/**
 * CliniPortal 2.0 — Content Loader Engine
 * Quản lý nạp động bài viết Markdown (.md), công cụ lâm sàng HTML (.html), và danh mục (.json) từ src/content/.
 */

export interface ContentIndexItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  type?: string;
  path: string;
  legacyPath?: string;
  description?: string;
  tags?: string[];
  icon?: string;
}

export interface LoadedContent {
  isHtml: boolean;
  raw: string;
  metadata: Record<string, string>;
  body: string;
  category: string;
  slug: string;
  path: string;
  item?: ContentIndexItem;
}

export type ArticleContent = LoadedContent;

export class ContentLoaderEngine {
  private cache: Map<string, string> = new Map();
  private indexCache: Map<string, ContentIndexItem[]> = new Map();

  /**
   * Tải danh mục index.json của phân hệ y khoa (ví dụ: calculators, pharmacology...)
   */
  public async loadCategoryIndex(category: string): Promise<ContentIndexItem[]> {
    if (!category) return [];
    const catKey = category.toLowerCase().trim();
    if (this.indexCache.has(catKey)) {
      return this.indexCache.get(catKey)!;
    }

    const mappedCategory = catKey === 'pathophysiology' ? 'basic-medical' : catKey;

    const candidateIndexPaths = [
      `./src/content/${mappedCategory}/index.json`,
      `./content/${mappedCategory}/index.json`,
      `./src/content/${catKey}/index.json`,
      `./content/${catKey}/index.json`,
      `./knowledge-vault/${mappedCategory}/index.json`
    ];

    for (const indexPath of candidateIndexPaths) {
      try {
        const response = await fetch(indexPath);
        if (response.ok) {
          const contentType = response.headers.get('content-type') || '';
          const text = await response.text();
          const trimmed = text.trim();

          // Ngăn Vite fallback index.html trả về html thay vì json
          if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
            const data: ContentIndexItem[] = JSON.parse(trimmed);
            if (Array.isArray(data)) {
              this.indexCache.set(category, data);
              return data;
            }
          }
        }
      } catch (err) {
        console.warn(`[ContentLoader] Could not load category index from ${indexPath}:`, err);
      }
    }

    return [];
  }

  /**
   * Tạo các candidate URL path tương ứng với category và slug (fallback)
   */
  private getCandidatePaths(category: string, slug: string): string[] {
    const paths: string[] = [];
    const cat = category.toLowerCase().trim();
    const mapped = cat === 'pathophysiology' ? 'basic-medical' : cat;

    if (category && slug) {
      paths.push(`./src/content/${mapped}/${slug}.md`);
      paths.push(`./src/content/${mapped}/${slug}.html`);
      paths.push(`./src/content/${cat}/${slug}.md`);
      paths.push(`./src/content/${cat}/${slug}.html`);
      paths.push(`./content/${mapped}/${slug}.md`);
      paths.push(`./content/${mapped}/${slug}.html`);
      paths.push(`./knowledge-vault/${mapped}/${slug}.md`);
      paths.push(`./src/content/${mapped}/${slug}.json`);
    } else if (category && !slug) {
      paths.push(`./src/content/${mapped}/index.md`);
      paths.push(`./content/${mapped}/index.md`);
    }

    return paths;
  }

  /**
   * Tải nội dung thô từ URL path
   */
  public async fetchRawContent(url: string): Promise<string | null> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    try {
      const response = await fetch(url);
      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        const text = await response.text();
        const trimmed = text.trim();

        // Prevent Vite dev server HTML fallback (index.html) from being treated as valid content
        if ((url.endsWith('.md') || url.endsWith('.json') || url.endsWith('.html')) && (contentType.includes('text/html') && (trimmed.includes('CliniPortal – Hệ sinh thái') || trimmed.includes('<script type="module" src="./src/index.ts">')))) {
          return null;
        }

        this.cache.set(url, text);
        return text;
      }
    } catch (err) {
      console.warn(`[ContentLoader] Failed to fetch content from ${url}:`, err);
    }
    return null;
  }

  /**
   * Nạp bài viết hoặc công cụ dựa theo category và slug/id
   */
  public async loadItem(category: string, slugOrId: string): Promise<LoadedContent | null> {
    const items = await this.loadCategoryIndex(category);

    if (items.length > 0 && slugOrId) {
      const cleanSlug = decodeURIComponent(slugOrId).toLowerCase().trim();
      const matchedItem = items.find(it => {
        const idLower = (it.id || '').toLowerCase();
        const nameLower = (it.name || '').toLowerCase().replace(/\.(html|md)$/, '');
        const pathLower = (it.path || '').toLowerCase();

        return idLower === cleanSlug ||
               nameLower === cleanSlug ||
               idLower.endsWith('-' + cleanSlug) ||
               idLower.endsWith(cleanSlug) ||
               pathLower.endsWith('/' + cleanSlug + '.html') ||
               pathLower.endsWith('/' + cleanSlug + '.md');
      });

      if (matchedItem) {
        const isHtml = matchedItem.path.endsWith('.html') ||
                       matchedItem.type === 'calculator' ||
                       matchedItem.type === 'page' ||
                       matchedItem.type === 'tool';

        if (isHtml) {
          return {
            isHtml: true,
            raw: '',
            metadata: {
              title: matchedItem.name.replace(/\.(html|md)$/i, '').replace(/_/g, ' '),
              description: matchedItem.description || ''
            },
            body: '',
            category,
            slug: slugOrId,
            path: matchedItem.path,
            item: matchedItem
          };
        } else {
          const rawText = await this.fetchRawContent(matchedItem.path);
          if (rawText !== null) {
            const { metadata, body } = this.parseFrontmatter(rawText);
            return {
              isHtml: false,
              raw: rawText,
              metadata: {
                title: matchedItem.name.replace(/\.md$/i, '').replace(/_/g, ' '),
                ...metadata
              },
              body,
              category,
              slug: slugOrId,
              path: matchedItem.path,
              item: matchedItem
            };
          }
        }
      }
    }

    // Fallback nếu không tìm thấy trong index.json
    const candidatePaths = this.getCandidatePaths(category, slugOrId);

    for (const path of candidatePaths) {
      const rawText = await this.fetchRawContent(path);
      if (rawText !== null) {
        const isHtml = path.endsWith('.html');
        const { metadata, body } = isHtml ? { metadata: { title: slugOrId }, body: '' } : this.parseFrontmatter(rawText);
        return {
          isHtml,
          raw: rawText,
          metadata,
          body,
          category,
          slug: slugOrId,
          path
        };
      }
    }

    return null;
  }

  /**
   * Tương thích ngược với lời gọi loadArticle cũ
   */
  public async loadArticle(category: string, slug: string): Promise<ArticleContent | null> {
    return this.loadItem(category, slug);
  }

  /**
   * Parse YAML frontmatter đơn giản từ chuỗi Markdown
   */
  public parseFrontmatter(text: string): { metadata: Record<string, string>; body: string } {
    const metadata: Record<string, string> = {};
    let body = text;

    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
    const match = text.match(frontmatterRegex);

    if (match) {
      const yamlBlock = match[1];
      body = text.slice(match[0].length);

      const lines = yamlBlock.split('\n');
      for (const line of lines) {
        const colonIdx = line.indexOf(':');
        if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim();
          let value = line.slice(colonIdx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          metadata[key] = value;
        }
      }
    }

    return { metadata, body };
  }
}

export const contentLoaderEngine = new ContentLoaderEngine();

