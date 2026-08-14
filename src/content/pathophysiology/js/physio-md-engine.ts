/**
 * CliniPortal Physiology - Universal Vanilla TS Markdown Engine
 * Parses Markdown + YAML Frontmatter + Custom Medical Callout Blocks
 * Fully offline-first (file:// compatible)
 */

export interface ParsedFrontmatter {
  metadata: Record<string, any>;
  body: string;
}

export class PhysioMDEngine {
  /**
   * Parse YAML Frontmatter from raw text
   */
  public static parseFrontmatter(text: string): ParsedFrontmatter {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
    const match = text.match(frontmatterRegex);

    let metadata: Record<string, any> = {};
    let body = text;

    if (match) {
      const rawYaml = match[1];
      body = text.slice(match[0].length);

      rawYaml.split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          const key = line.slice(0, colonIdx).trim();
          let val: any = line.slice(colonIdx + 1).trim();

          // Parse arrays [item1, item2]
          if (val.startsWith('[') && val.endsWith(']')) {
            val = val.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^['"]|['"]$/g, ''));
          } else if (val === 'true') {
            val = true;
          } else if (val === 'false') {
            val = false;
          } else {
            val = val.replace(/^['"]|['"]$/g, '');
          }
          metadata[key] = val;
        }
      });
    }

    return { metadata, body };
  }

  /**
   * Parse Custom Blocks (:::clinical-pearl, :::physio-steps, :::formula-card, :::warning-box)
   */
  public static parseCustomBlocks(text: string): string {
    // :::clinical-pearl ... :::
    text = text.replace(/:::clinical-pearl\r?\n([\s\S]*?)\r?\n:::/g, (_m, content) => {
      return `<div class="clinical-pearl">${this.renderSimpleMarkdown(content)}</div>`;
    });

    // :::physio-steps ... :::
    text = text.replace(/:::physio-steps\r?\n([\s\S]*?)\r?\n:::/g, (_m, content) => {
      const items = content.split(/\r?\n(?=\d+\.\s)/);
      let html = '<ol class="physio-steps">';
      items.forEach(item => {
        if (item.trim()) {
          const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
          html += `<li><div class="physio-step-card">${this.renderSimpleMarkdown(cleanItem)}</div></li>`;
        }
      });
      html += '</ol>';
      return html;
    });

    // :::formula-card ... :::
    text = text.replace(/:::formula-card\r?\n([\s\S]*?)\r?\n:::/g, (_m, content) => {
      return `<div class="formula-card physio-step-card">${this.renderSimpleMarkdown(content)}</div>`;
    });

    return text;
  }

  /**
   * Convert markdown tables to styled responsive HTML tables
   */
  public static parseTables(text: string): string {
    const tableRegex = /((?:\|[^\n]+\|\r?\n)+)/g;

    return text.replace(tableRegex, match => {
      const lines = match.trim().split(/\r?\n/);
      if (lines.length < 2) return match;

      let html = '<div class="table-responsive"><table class="physio-table physio-table-compare"><thead><tr>';

      // Headers
      const headers = lines[0].split('|').slice(1, -1).map(h => h.trim());
      headers.forEach(h => {
        html += `<th>${this.renderInline(h)}</th>`;
      });
      html += '</tr></thead><tbody>';

      // Rows (skip index 1 separator line)
      for (let i = 2; i < lines.length; i++) {
        const cells = lines[i].split('|').slice(1, -1).map(c => c.trim());
        html += '<tr>';
        cells.forEach(c => {
          html += `<td>${this.renderInline(c)}</td>`;
        });
        html += '</tr>';
      }

      html += '</tbody></table></div>';
      return html;
    });
  }

  public static renderInline(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  }

  public static renderSimpleMarkdown(md: string): string {
    let text = this.parseCustomBlocks(md);
    text = this.parseTables(text);

    // Headings
    text = text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Inline
    text = this.renderInline(text);

    // Paragraphs
    text = text.replace(/^\s*(\n)?(.+)/gim, (m) => {
      return m.startsWith('<') ? m : `<p>${m}</p>`;
    });

  public static async loadArticle(articlePath: string): Promise<ParsedFrontmatter> {
    try {
      const resp = await fetch(articlePath);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const text = await resp.text();
      return this.parseFrontmatter(text);
    } catch (e) {
      console.warn('Fetch failed, trying XHR for offline:', e);
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', articlePath, true);
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 0) {
            resolve(this.parseFrontmatter(xhr.responseText));
          } else {
            resolve({
              metadata: { title: 'Không tìm thấy bài viết' },
              body: `<div class="physio-alert-card alert-type-danger"><p>Không thể tải bài học từ đường dẫn <code>${articlePath}</code>.</p></div>`
            });
          }
        };
        xhr.onerror = () => {
          resolve({
            metadata: { title: 'Lỗi tải bài viết' },
            body: `<div class="physio-alert-card alert-type-danger"><p>Lỗi kết nối hoặc đường dẫn không hợp lệ.</p></div>`
          });
        };
        xhr.send();
      });
    }
  }

  public static renderMarkdown(md: string): string {
    return this.renderSimpleMarkdown(md);
  }
}

if (typeof window !== 'undefined') {
  (window as any).PhysioMDEngine = PhysioMDEngine;
}

