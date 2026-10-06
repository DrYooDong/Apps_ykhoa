/**
 * CliniPortal — Standalone MDX Engine for Guidelines
 * Path: js/core/mdx-engine.ts
 */

export interface ParsedMdxResult {
  frontmatter: Record<string, any>;
  title: string;
  description: string;
  html: string;
  toc: Array<{ id: string; text: string; level: number }>;
}

export class CliniMdxEngine {
  public parse(rawMdx: string): ParsedMdxResult {
    if (!rawMdx) {
      return { frontmatter: {}, title: '', description: '', html: '', toc: [] };
    }

    let content = rawMdx;
    const frontmatter: Record<string, any> = {};
    const toc: Array<{ id: string; text: string; level: number }> = [];

    // 1. Extract YAML Frontmatter
    if (content.startsWith('---')) {
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
      if (match) {
        const yamlStr = match[1];
        content = content.slice(match[0].length);

        yamlStr.split('\n').forEach(line => {
          const colonIdx = line.indexOf(':');
          if (colonIdx !== -1) {
            const key = line.slice(0, colonIdx).trim();
            let val = line.slice(colonIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (val === 'true') frontmatter[key] = true;
            else if (val === 'false') frontmatter[key] = false;
            else if (!isNaN(Number(val)) && val !== '') frontmatter[key] = Number(val);
            else frontmatter[key] = val;
          }
        });
      }
    }

    const title = frontmatter.title || '';
    const description = frontmatter.description || '';

    // 2. Resolve image URLs & markdown image tags
    content = content.replace(/src=["'](?:\.\/)?images\/([^"']+)["']/g, 'src="kho-guidelines/images/$1"');
    content = content.replace(/!\[(.*?)\]\((?:\.\/)?(?:kho-guidelines\/)?images\/(.*?)\)/g, (_m, alt, imgPath) => {
      return `<figure class="ebm-figure" style="margin:1.5rem 0; text-align:center;">
        <img src="kho-guidelines/images/${imgPath}" alt="${alt}" class="fig-img" loading="lazy" style="max-width:100%; height:auto; border-radius:10px; border:1px solid var(--border-light,#e2e8f0); box-shadow:0 4px 14px rgba(0,0,0,0.06);" />
        ${alt ? `<figcaption class="fig-caption" style="font-size:0.82rem; color:var(--text-muted,#64748b); margin-top:6px; font-weight:600;">${alt}</figcaption>` : ''}
      </figure>`;
    });

    // 2.5. Stash System: Bảo vệ các khối HTML nhạy cảm (SVG, Scripts, Styles, Tables) khỏi bị parser markdown chia dòng chèn <br/> và <p>
    const stash = new Map<string, string>();
    let blockCounter = 0;

    const stashBlock = (htmlContent: string): string => {
      const placeholder = `__CLINI_MDX_STASH_${blockCounter++}__`;
      stash.set(placeholder, htmlContent.trim());
      return `\n\n${placeholder}\n\n`;
    };

    // Stash scripts & styles
    content = content.replace(/<script(?:\s+[^>]*)?>([\s\S]*?)<\/script>/gi, (match) => {
      return stashBlock(match);
    });
    content = content.replace(/<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi, (match) => {
      return stashBlock(match);
    });

    // BẢO VỆ TUYỆT ĐỐI TOÀN BỘ CÁC KHỐI SVG KHÔNG BỊ PHÁ HỎNG BỞI <br/> HAY <p>
    content = content.replace(/<svg\b[\s\S]*?<\/svg>/gi, (svgMatch) => {
      return stashBlock(svgMatch);
    });

    // 3. Process Custom MDX Components / Callouts
    content = content.replace(/<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)\/>/g, (_m, tagName, attrs) => {
      return `<div class="mdx-component mdx-${tagName.toLowerCase()}" ${attrs}></div>`;
    });

    content = content.replace(/<([A-Z][a-zA-Z0-9]*)\s+([^>]*?)>([\s\S]*?)<\/\1>/g, (_m, tagName, attrs, inner) => {
      return `<div class="mdx-callout mdx-${tagName.toLowerCase()}" ${attrs}><div class="mdx-callout-inner">${inner}</div></div>`;
    });

    // 4. Process Markdown Headings with {#custom-id}
    content = content.replace(/^(#{1,6})\s+(.*?)(?:\s+\{#([a-zA-Z0-9_\-]+)\})?$/gm, (_m, hashes, text, customId) => {
      const level = hashes.length;
      const cleanText = text.replace(/<[^>]+>/g, '').trim();
      const id = customId || cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, text: cleanText, level });
      return `<h${level} id="${id}" class="heading-level-${level}">${text}</h${level}>`;
    });

    // 5. Special Callouts: > [!NOTE], > [!WARNING], > [!TIP], > [!IMPORTANT], > [!PEARL], > [!KEY]
    content = content.replace(/^\>\s*\[\!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|PEARL|KEY)\]\s*\r?\n([\s\S]*?)(?=\n\n|\n[^\>]|$)/gm, (_m, type, body) => {
      const cleanBody = body.replace(/^\>\s?/gm, '').trim();
      const badgeColors: Record<string, { bg: string; border: string; color: string; icon: string }> = {
        NOTE: { bg: 'rgba(2, 132, 199, 0.08)', border: '#0284c7', color: '#0369a1', icon: 'fa-circle-info' },
        TIP: { bg: 'rgba(16, 185, 129, 0.08)', border: '#10b981', color: '#047857', icon: 'fa-lightbulb' },
        PEARL: { bg: 'rgba(16, 185, 129, 0.08)', border: '#10b981', color: '#047857', icon: 'fa-gem' },
        IMPORTANT: { bg: 'rgba(124, 58, 237, 0.08)', border: '#7c3aed', color: '#6d28d9', icon: 'fa-triangle-exclamation' },
        KEY: { bg: 'rgba(2, 132, 199, 0.08)', border: '#0284c7', color: '#0369a1', icon: 'fa-key' },
        WARNING: { bg: 'rgba(245, 158, 11, 0.1)', border: '#f59e0b', color: '#b45309', icon: 'fa-triangle-exclamation' },
        CAUTION: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', color: '#b91c1c', icon: 'fa-circle-xmark' },
      };
      const conf = badgeColors[type] || badgeColors.NOTE;
      return `<div class="ebm-callout-box" style="border-left:4px solid ${conf.border}; background:${conf.bg}; padding:1rem 1.25rem; border-radius:0 10px 10px 0; margin:1.25rem 0;">
        <div style="font-weight:800; font-size:0.85rem; color:${conf.color}; display:flex; align-items:center; gap:8px; margin-bottom:0.4rem; text-transform:uppercase;">
          <i class="fa-solid ${conf.icon}"></i> ${type}
        </div>
        <div style="font-size:0.92rem; color:var(--text,#0f172a); line-height:1.65;">${cleanBody}</div>
      </div>`;
    });

    // 6. Standard Markdown Quotes
    content = content.replace(/^\>\s+(.*$)/gm, '<blockquote class="ebm-quote">$1</blockquote>');

    // 7. Bold & Italic & Code & Links
    content = content.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="ebm-link">$1 <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7em;"></i></a>');

    // 8. Markdown Tables (Được stash để bảo toàn dòng)
    content = content.replace(/((?:^\|.*?\|\r?\n)+)/gm, (tableMatch) => {
      const lines = tableMatch.trim().split('\n').filter(l => l.trim().startsWith('|'));
      if (lines.length < 2) return tableMatch;

      let tableHtml = '<div class="table-responsive" style="overflow-x:auto; margin:1.5rem 0; border:1px solid var(--border-light,#e2e8f0); border-radius:10px;"><table class="ebm-guideline-table" style="width:100%; border-collapse:collapse; font-size:0.88rem;">';
      let isHeader = true;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (/^\|[-:\s|]+\|$/.test(line)) {
          isHeader = false;
          continue;
        }

        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        const tag = isHeader ? 'th' : 'td';
        const cellStyle = isHeader 
          ? 'background:var(--surface-2,#f8fafc); font-weight:700; color:var(--text,#0f172a); padding:0.75rem 1rem; border-bottom:1.5px solid var(--border-light,#e2e8f0); text-align:left;' 
          : 'padding:0.75rem 1rem; border-bottom:1px solid var(--border-light,#e2e8f0); color:var(--text,#0f172a);';

        tableHtml += '<tr>';
        cells.forEach(cell => {
          tableHtml += `<${tag} style="${cellStyle}">${cell}</${tag}>`;
        });
        tableHtml += '</tr>';

        if (isHeader) {
          isHeader = false;
        }
      }

      tableHtml += '</table></div>';
      return stashBlock(tableHtml);
    });

    // 9. Ordered & Unordered Lists
    content = content.replace(/^(\d+)\.\s+(.*$)/gm, '<li class="ebm-ordered-item" value="$1">$2</li>');
    content = content.replace(/((?:<li class="ebm-ordered-item" value="\d+">.*<\/li>\r?\n?)+)/g, '<ol class="ebm-ordered-list" style="margin:1rem 0 1rem 1.5rem; line-height:1.7;">$1</ol>');

    content = content.replace(/^-\s+(.*$)/gm, '<li class="ebm-list-item">$1</li>');
    content = content.replace(/((?:<li class="ebm-list-item">.*<\/li>\r?\n?)+)/g, '<ul class="ebm-list" style="margin:1rem 0 1rem 1.5rem; line-height:1.7;">$1</ul>');

    // 10. Line breaks to paragraphs (Chỉ đóng gói các đoạn văn bản thuần, KHÔNG đóng gói khối HTML hoặc placeholder)
    const paragraphs = content.split(/\r?\n\r?\n/).map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      // Giữ nguyên các placeholder token
      if (trimmed.startsWith('__CLINI_MDX_STASH_') && trimmed.endsWith('__')) {
        return trimmed;
      }
      // Giữ nguyên các thẻ HTML khối và comment
      if (/^<(h[1-6]|div|ul|ol|table|blockquote|pre|figure|svg|section|nav|details|summary|aside|header|footer|article|p|!--)/i.test(trimmed)) {
        return trimmed;
      }
      return `<p class="ebm-paragraph" style="line-height:1.7; margin-bottom:1.15rem;">${trimmed.replace(/\r?\n/g, '<br/>')}</p>`;
    });

    let html = paragraphs.filter(Boolean).join('\n');

    // 11. Hoàn nguyên toàn bộ các khối stashed (loại bỏ trường hợp bị bao bọc nhầm trong <p>)
    stash.forEach((savedHtml, placeholder) => {
      const pWrappedRegex = new RegExp(`<p[^>]*>\\s*${placeholder}\\s*<\\/p>`, 'g');
      html = html.replace(pWrappedRegex, savedHtml);
      html = html.replaceAll(placeholder, savedHtml);
    });

    return {
      frontmatter,
      title,
      description,
      html,
      toc
    };
  }
}

export const cliniMdxEngine = new CliniMdxEngine();
