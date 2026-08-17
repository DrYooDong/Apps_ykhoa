/**
 * EBM Format Loader & Multi-Format Parsing Engine (ebm-format-loader.ts)
 * Path: src/content/ebm/js/ebm-format-loader.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * Supports: JSON Schemas, Markdown (.md), CSV Data, BibTeX/RIS Citations, SVG Diagrams
 */

export interface ParsedMarkdownResult {
  meta: Record<string, string>;
  contentHtml: string;
}

export class EBMFormatLoader {
  private static fallbackStorage: {
    json: Record<string, any>;
    markdown: Record<string, string>;
    csv: Record<string, string>;
  } = {
    json: {},
    markdown: {},
    csv: {}
  };

  public static registerFallback(type: 'json' | 'markdown' | 'csv', key: string, data: any): void {
    if (this.fallbackStorage[type]) {
      this.fallbackStorage[type][key] = data;
    }
  }

  public static async fetchOrFallback(url: string, type: 'json' | 'text' | 'md' | 'csv' = 'json', fallbackKey: string | null = null): Promise<any> {
    const key = fallbackKey || url.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';

    try {
      if (typeof window !== 'undefined' && window.location.protocol !== 'file:') {
        const response = await fetch(url);
        if (response.ok) {
          if (type === 'json') return await response.json();
          if (type === 'text' || type === 'md' || type === 'csv') return await response.text();
        }
      }
    } catch (e) {
      console.warn(`[EBMFormatLoader] Fetch unavailable for ${url}, switching to fallback:`, e);
    }

    if (type === 'json' && this.fallbackStorage.json[key]) return this.fallbackStorage.json[key];
    if ((type === 'md' || type === 'text') && this.fallbackStorage.markdown[key]) return this.fallbackStorage.markdown[key];
    if (type === 'csv' && this.fallbackStorage.csv[key]) return this.fallbackStorage.csv[key];

    return null;
  }

  public static parseMarkdown(mdText: string): ParsedMarkdownResult {
    if (!mdText) return { meta: {}, contentHtml: '' };

    const meta: Record<string, string> = {};
    let content = mdText;

    if (mdText.startsWith('---')) {
      const parts = mdText.split(/^---$/m);
      if (parts.length >= 3) {
        const yamlBlock = parts[1].trim();
        content = parts.slice(2).join('---').trim();

        yamlBlock.split('\n').forEach(line => {
          const colonIdx = line.indexOf(':');
          if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            let value = line.slice(colonIdx + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            meta[key] = value;
          }
        });
      }
    }

    const html = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote class="ebm-quote">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="ebm-code">$1</code>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>');

    return { meta, contentHtml: `<p>${html}</p>` };
  }

  public static parseCSV(csvText: string): Record<string, string>[] {
    if (!csvText) return [];
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      if (values.length === headers.length) {
        const row: Record<string, string> = {};
        headers.forEach((h, idx) => {
          row[h] = values[idx];
        });
        rows.push(row);
      }
    }

    return rows;
  }
}

// Global window exposure for legacy scripts
if (typeof window !== 'undefined') {
  (window as any).EBMFormatLoader = EBMFormatLoader;
}
