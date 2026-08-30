/**
 * CliniPortal 2.0 — Markdown & MDX Engine (TypeScript Core Wrapper)
 * Path: src/core/markdown-engine.ts
 * 
 * Hỗ trợ chuyển đổi Markdown (.md/.mdx) sang HTML y khoa cao cấp:
 * 1. Bảng Markdown (|---|) thành Semantic Table with Wrapper.
 * 2. KaTeX Math inline ($...$) & Display Block ($$...$$).
 * 3. Clinical Alerts & EBM Callouts (> [!NOTE], [!TIP], [!WARNING], [!DANGER], [!PEARL], [!KEY], [!LAB]).
 * 4. Emoji Highlights (🔑 Key Takeaways, 🧪 Lab Tests, 🧬 Molecular Genetics).
 * 5. Table of Contents (TOC) & Slug anchors.
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
   * Render Markdown text sang HTML với TOC, Bảng biểu, Math KaTeX và Alerts y khoa
   */
  public parse(mdText: string): { html: string; toc: { id: string; text: string; level: number }[] } {
    if (!mdText) {
      return { html: '', toc: [] };
    }

    const trimmed = mdText.trim();
    if (
      trimmed.startsWith('<!DOCTYPE') ||
      trimmed.startsWith('<div') ||
      trimmed.startsWith('<section') ||
      trimmed.startsWith('<article') ||
      trimmed.startsWith('<main') ||
      trimmed.startsWith('<html')
    ) {
      return { html: mdText, toc: [] };
    }

    if (this.windowParser && typeof this.windowParser.parse === 'function') {
      const html = this.windowParser.parse(mdText);
      return { html, toc: [] };
    }

    return this.fallbackParse(mdText);
  }

  /**
   * Fallback parser cho Markdown/MDX trong môi trường thuần Vanilla JS/TS
   */
  private fallbackParse(mdText: string): { html: string; toc: { id: string; text: string; level: number }[] } {
    const toc: { id: string; text: string; level: number }[] = [];
    let htmlLines: string[] = [];
    const lines = mdText.split(/\r?\n/);
    let inCodeBlock = false;
    let codeLang = '';
    let inTable = false;
    let tableRows: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Fenced Code Blocks
      if (line.trim().startsWith('```')) {
        if (inTable) {
          htmlLines.push(this.renderTable(tableRows));
          tableRows = [];
          inTable = false;
        }

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

      // Display Math ($$...$$)
      if (line.trim().startsWith('$$') && line.trim().endsWith('$$') && line.trim().length > 4) {
        const mathContent = line.trim().slice(2, -2).trim();
        htmlLines.push(`<div class="mdx-math-block">${this.escapeHtml(mathContent)}</div>`);
        continue;
      }

      // Markdown Tables (| Col 1 | Col 2 |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        tableRows.push(line.trim());
        continue;
      } else if (inTable) {
        htmlLines.push(this.renderTable(tableRows));
        tableRows = [];
        inTable = false;
      }

      // Blockquotes & Clinical Callouts (> [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!PEARL], > [!KEY], > [!LAB])
      if (line.trim().startsWith('>')) {
        let alertClass = 'mdx-alert mdx-alert-info';
        let alertIcon = 'fa-solid fa-circle-info';
        let alertTitle = 'THÔNG TIN LÂM SÀNG';
        let cleanText = line.trim().replace(/^>\s?/, '');

        if (cleanText.startsWith('[!NOTE]')) {
          alertClass = 'mdx-alert mdx-alert-info';
          alertIcon = 'fa-solid fa-circle-info';
          alertTitle = 'GHI CHÚ LÂM SÀNG';
          cleanText = cleanText.replace('[!NOTE]', '').trim();
        } else if (cleanText.startsWith('[!TIP]') || cleanText.startsWith('[!PEARL]')) {
          alertClass = 'mdx-alert mdx-alert-teal';
          alertIcon = 'fa-solid fa-gem';
          alertTitle = 'CLINICAL PEARL / MẸO LÂM SÀNG';
          cleanText = cleanText.replace(/\[!(TIP|PEARL)\]/, '').trim();
        } else if (cleanText.startsWith('[!WARNING]')) {
          alertClass = 'mdx-alert mdx-alert-warning';
          alertIcon = 'fa-solid fa-triangle-exclamation';
          alertTitle = 'CẢNH BÁO LÂM SÀNG';
          cleanText = cleanText.replace('[!WARNING]', '').trim();
        } else if (cleanText.startsWith('[!DANGER]') || cleanText.startsWith('[!IMPORTANT]')) {
          alertClass = 'mdx-alert mdx-alert-danger';
          alertIcon = 'fa-solid fa-circle-exclamation';
          alertTitle = 'LƯU Ý TỐI QUAN TRỌNG / RED FLAGS';
          cleanText = cleanText.replace(/\[!(DANGER|IMPORTANT)\]/, '').trim();
        } else if (cleanText.startsWith('[!KEY]')) {
          alertClass = 'mdx-key-takeaway';
          alertIcon = 'fa-solid fa-key';
          alertTitle = 'ĐIỂM CỐT LÕI (KEY TAKEAWAYS)';
          cleanText = cleanText.replace('[!KEY]', '').trim();
        } else if (cleanText.startsWith('[!LAB]')) {
          alertClass = 'mdx-lab-highlight';
          alertIcon = 'fa-solid fa-flask';
          alertTitle = 'CẬN LÂM SÀNG & XÉT NGHIỆM';
          cleanText = cleanText.replace('[!LAB]', '').trim();
        }

        htmlLines.push(`
          <div class="${alertClass}">
            <div class="mdx-alert-icon"><i class="${alertIcon}"></i></div>
            <div class="mdx-alert-body">
              <strong class="mdx-alert-title">${alertTitle}</strong>
              <p>${this.formatInline(cleanText)}</p>
            </div>
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

        htmlLines.push(`<h${level} id="${id}" class="section-heading level-${level}">${this.formatInline(text)}</h${level}>`);
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

      // Empty Lines
      if (line.trim() === '') {
        htmlLines.push('');
        continue;
      }

      // Special Emoji Leading Paragraphs
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('🔑')) {
        htmlLines.push(`<div class="mdx-key-takeaway"><div class="mdx-alert-icon"><i class="fa-solid fa-key" style="color:#d97706;"></i></div><div class="mdx-alert-body">${this.formatInline(line)}</div></div>`);
        continue;
      } else if (trimmedLine.startsWith('🧪')) {
        htmlLines.push(`<div class="mdx-lab-highlight"><div class="mdx-alert-icon"><i class="fa-solid fa-flask" style="color:#7c3aed;"></i></div><div class="mdx-alert-body">${this.formatInline(line)}</div></div>`);
        continue;
      } else if (trimmedLine.startsWith('🧬')) {
        htmlLines.push(`<div class="molecular-mechanism-card"><div class="mdx-alert-icon"><i class="fa-solid fa-dna" style="color:#0d9488;"></i></div><div class="mdx-alert-body">${this.formatInline(line)}</div></div>`);
        continue;
      }

      htmlLines.push(`<p>${this.formatInline(line)}</p>`);
    }

    if (inTable) {
      htmlLines.push(this.renderTable(tableRows));
    }

    return {
      html: htmlLines.join('\n'),
      toc
    };
  }

  /**
   * Chuyển đổi mảng dòng Markdown table sang thẻ HTML Table
   */
  private renderTable(rows: string[]): string {
    if (rows.length < 2) return rows.join('\n');

    const headerCells = rows[0]
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());

    // Bỏ qua dòng phân cách |---|---|
    const bodyRows = rows.slice(2);

    const theadHtml = `<thead><tr>${headerCells.map((h) => `<th>${this.formatInline(h)}</th>`).join('')}</tr></thead>`;

    const tbodyHtml = `<tbody>${bodyRows
      .map((r) => {
        const cells = r
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        return `<tr>${cells.map((c) => `<td>${this.formatInline(c)}</td>`).join('')}</tr>`;
      })
      .join('')}</tbody>`;

    return `<div class="table-wrapper mdx-table-wrapper"><table class="mdx-table">${theadHtml}${tbodyHtml}</table></div>`;
  }

  private formatInline(text: string): string {
    return text
      // Inline Math: $E = mc^2$
      .replace(/(?<!\$)\$(?!\$)([^\n$]+)(?<!\$)\$(?!\$)/g, '<span class="mdx-math-inline">$1</span>')
      // Bold
      .replace(/\*\*\s*([^*]+?)\s*\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')
      // Inline Code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Links
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
