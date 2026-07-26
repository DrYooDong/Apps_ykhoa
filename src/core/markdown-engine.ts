/**
 * CliniPortal 2.0 — Markdown Engine (TypeScript Core Wrapper)
 * Hỗ trợ chuyển đổi Markdown (.md) sang HTML trực quan, sinh Table of Contents (TOC) và Alerts.
 */

export interface ParsedMarkdown {
  metadata: Record<string, string>;
  body: string;
  html: string;
  toc: { id: string; text: string; level: number }[];
}

export class MarkdownCoreEngine {
  private get windowParser() {
    if (typeof window !== 'undefined' && (window as any).CliniMarkdown) {
      return (window as any).CliniMarkdown;
    }
    return null;
  }

  /**
   * Render Markdown text sang HTML với TOC và Callout/Alerts
   */
  public parse(mdText: string): { html: string; toc: { id: string; text: string; level: number }[] } {
    if (!mdText) {
      return { html: '', toc: [] };
    }

    const trimmed = mdText.trim();
    if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<div') || trimmed.startsWith('<section') || trimmed.startsWith('<article') || trimmed.startsWith('<main') || trimmed.startsWith('<html')) {
      return { html: mdText, toc: [] };
    }

    if (this.windowParser && typeof this.windowParser.parse === 'function') {
      const html = this.windowParser.parse(mdText);
      return { html, toc: [] };
    }

    return this.fallbackParse(mdText);
  }

  /**
   * Fallback parser cho Markdown trong môi trường thuần Vanilla JS/TS
   */
  private fallbackParse(mdText: string): { html: string; toc: { id: string; text: string; level: number }[] } {
    const toc: { id: string; text: string; level: number }[] = [];
    let htmlLines: string[] = [];
    const lines = mdText.split(/\r?\n/);
    let inCodeBlock = false;
    let codeLang = '';

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Fenced Code Blocks
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = line.trim().slice(3).trim();
          htmlLines.push(`<pre><code class="language-${codeLang}">`);
        } else {
          inCodeBlock = false;
          htmlLines.push(`</code></pre>`);
        }
        continue;
      }

      if (inCodeBlock) {
        htmlLines.push(this.escapeHtml(line));
        continue;
      }

      // Blockquotes & Callouts/Alerts (> [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT])
      if (line.trim().startsWith('>')) {
        let alertClass = 'note-box';
        let alertTitle = 'GHI CHÚ';
        let cleanText = line.trim().replace(/^>\s?/, '');

        if (cleanText.startsWith('[!NOTE]')) {
          alertClass = 'note-box alert-note';
          alertTitle = 'THÔNG TIN GHI CHÚ';
          cleanText = cleanText.replace('[!NOTE]', '').trim();
        } else if (cleanText.startsWith('[!TIP]')) {
          alertClass = 'note-box alert-tip';
          alertTitle = 'MẸO LÂM SÀNG';
          cleanText = cleanText.replace('[!TIP]', '').trim();
        } else if (cleanText.startsWith('[!WARNING]')) {
          alertClass = 'note-box alert-warning';
          alertTitle = 'CẢNH BÁO LÂM SÀNG';
          cleanText = cleanText.replace('[!WARNING]', '').trim();
        } else if (cleanText.startsWith('[!IMPORTANT]')) {
          alertClass = 'note-box alert-important';
          alertTitle = 'LƯU Ý QUAN TRỌNG';
          cleanText = cleanText.replace('[!IMPORTANT]', '').trim();
        }

        htmlLines.push(`
          <div class="${alertClass}">
            <div class="note-title"><i class="fa-solid fa-circle-info"></i> ${alertTitle}</div>
            <p>${this.formatInline(cleanText)}</p>
          </div>
        `);
        continue;
      }

      // Headings (# H1, ## H2, ### H3)
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
        const id = this.slugify(text);

        if (level <= 3) {
          toc.push({ id, text: this.cleanHeadingText(text), level });
        }

        htmlLines.push(`<h${level} id="${id}">${this.formatInline(text)}</h${level}>`);
        continue;
      }

      // Horizontal Rule
      if (/^(---|\*\*\*|___)$/.test(line.trim())) {
        htmlLines.push('<hr>');
        continue;
      }

      // Unordered Lists (- item, * item)
      if (/^\s*[-*+]\s+(.*)$/.test(line)) {
        const listText = line.replace(/^\s*[-*+]\s+/, '');
        htmlLines.push(`<ul><li>${this.formatInline(listText)}</li></ul>`);
        continue;
      }

      // Ordered Lists (1. item)
      if (/^\s*\d+\.\s+(.*)$/.test(line)) {
        const listText = line.replace(/^\s*\d+\.\s+/, '');
        htmlLines.push(`<ol><li>${this.formatInline(listText)}</li></ol>`);
        continue;
      }

      // Empty Lines / Paragraphs
      if (line.trim() === '') {
        htmlLines.push('');
        continue;
      }

      htmlLines.push(`<p>${this.formatInline(line)}</p>`);
    }

    return {
      html: htmlLines.join('\n'),
      toc
    };
  }

  private formatInline(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  private cleanHeadingText(text: string): string {
    return text.replace(/[*_`]/g, '');
  }
}

export const markdownCoreEngine = new MarkdownCoreEngine();
