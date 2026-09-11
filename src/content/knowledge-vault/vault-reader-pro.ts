/**
 * CliniPortal — Knowledge Vault Medical Reader Pro Engine
 * Tích hợp:
 * 1. Clinical Pathway Matrix Ribbon (5 Khía cạnh bệnh học: GPSL, SLB, CD, PDDT, BC, CN)
 * 2. Dynamic Sticky TOC & Scrollspy
 * 3. Reading Toolbar (Zoom font, Serif/Sans toggle, Fullscreen, Copy Citation)
 */

import type { VaultArticle, ClinicalPathwayLinks, TocItem, VaultPersonalAnnotation } from './types';
import { findPathwayArticles, VAULT_CATALOG } from './vault-loader';

export interface ReaderSettings {
  fontSize: number; // in rem, default 1.0
  fontFamily: 'sans' | 'serif';
  isFullscreen: boolean;
}

let readerSettings: ReaderSettings = {
  fontSize: 1.0,
  fontFamily: 'sans',
  isFullscreen: false
};

/**
 * Lấy danh sách ghi chú đúc kết lâm sàng cá nhân cho bài viết
 */
export function getAnnotationsForArticle(articleId: string): VaultPersonalAnnotation[] {
  try {
    const profileId = localStorage.getItem('dsp_active_profile') || 'default_doctor';
    const raw = localStorage.getItem(`dsp_vault_annotations_${profileId}`);
    const all: VaultPersonalAnnotation[] = raw ? JSON.parse(raw) : [];
    return all.filter(a => a.articleId === articleId);
  } catch {
    return [];
  }
}

/**
 * Lưu ghi chú đúc kết lâm sàng cá nhân
 */
export function saveAnnotationForArticle(articleId: string, noteText: string, pearlType: 'experience' | 'warning' | 'dosage' | 'general' = 'experience'): VaultPersonalAnnotation {
  const profileId = localStorage.getItem('dsp_active_profile') || 'default_doctor';
  const key = `dsp_vault_annotations_${profileId}`;
  const raw = localStorage.getItem(key);
  const all: VaultPersonalAnnotation[] = raw ? JSON.parse(raw) : [];

  const newAnn: VaultPersonalAnnotation = {
    id: `ann_${Date.now()}`,
    articleId,
    authorId: profileId,
    noteText,
    pearlType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  all.unshift(newAnn);
  localStorage.setItem(key, JSON.stringify(all));
  return newAnn;
}

/**
 * Xóa ghi chú cá nhân
 */
export function deleteAnnotation(articleId: string, annotationId: string): void {
  const profileId = localStorage.getItem('dsp_active_profile') || 'default_doctor';
  const key = `dsp_vault_annotations_${profileId}`;
  const raw = localStorage.getItem(key);
  if (!raw) return;
  let all: VaultPersonalAnnotation[] = JSON.parse(raw);
  all = all.filter(a => a.id !== annotationId);
  localStorage.setItem(key, JSON.stringify(all));
}

/**
 * Render Box Ghi Chú Đúc Kết Lâm Sàng Cá Nhân (Personal Clinical Pearls Box)
 */
export function renderAnnotationsBoxHtml(article: VaultArticle): string {
  const annotations = getAnnotationsForArticle(article.id);
  
  return `
    <div class="vault-annotations-container" style="background:linear-gradient(135deg, rgba(245,158,11,0.06), rgba(251,191,36,0.02)); border:1.5px dashed rgba(245,158,11,0.4); border-radius:10px; padding:14px 16px; margin-bottom:1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-size:12px; font-weight:800; color:#b45309; display:flex; align-items:center; gap:6px; text-transform:uppercase; letter-spacing:0.04em;">
          <i class="fa-solid fa-lightbulb" style="color:#f59e0b;"></i> Đúc Kết Kinh Nghiệm Lâm Sàng Của Bác Sĩ (${annotations.length})
        </span>
        <button type="button" id="btn-toggle-add-annotation" class="vault-tool-btn" style="background:var(--vault-surface); color:#b45309; font-weight:700; border-color:rgba(245,158,11,0.4); font-size:11px; padding:2px 8px;">
          <i class="fa-solid fa-plus"></i> Thêm kinh nghiệm
        </button>
      </div>

      <!-- Form nhập ghi chú mới -->
      <div id="vault-annotation-form" style="display:none; margin-bottom:12px; background:var(--vault-surface); padding:10px; border-radius:8px; border:1px solid var(--vault-border);">
        <textarea id="vault-annotation-input" rows="2" class="dsp-input" style="width:100%; font-size:12.5px; border:1px solid var(--vault-border); border-radius:6px; padding:6px; margin-bottom:6px; resize:vertical;" placeholder="Nhập kinh nghiệm ca bệnh, lưu ý chỉnh liều hoặc phản ứng hiếm gặp..."></textarea>
        <div style="display:flex; justify-content:flex-end; gap:6px;">
          <button type="button" id="btn-cancel-annotation" class="vault-tool-btn" style="font-size:11px; padding:2px 8px;">Hủy</button>
          <button type="button" id="btn-save-annotation" class="vault-tool-btn" style="background:#f59e0b; color:#fff; font-weight:700; border:none; font-size:11px; padding:2px 10px;">Lưu vào Vault</button>
        </div>
      </div>

      <!-- Danh sách ghi chú đã lưu -->
      <div id="vault-annotations-list" style="display:flex; flex-direction:column; gap:8px;">
        ${annotations.length === 0 ? `
          <div style="font-size:11.5px; color:var(--vault-muted); font-style:italic;">Chưa có ghi chú cá nhân nào cho bài viết này. Bấm <strong>"+ Thêm kinh nghiệm"</strong> để đúc kết ca bệnh.</div>
        ` : annotations.map(ann => `
          <div style="background:var(--vault-surface); border:1px solid var(--vault-border); border-radius:8px; padding:8px 12px; display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
            <div style="font-size:12.5px; line-height:1.5; color:var(--vault-text); flex:1;">
              <i class="fa-solid fa-quote-left" style="color:#f59e0b; font-size:10px; margin-right:4px;"></i>
              ${escapeHtml(ann.noteText)}
              <div style="font-size:10px; color:var(--vault-muted); margin-top:4px;">
                <i class="fa-regular fa-clock"></i> ${new Date(ann.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <button type="button" class="js-delete-annotation" data-id="${ann.id}" style="background:none; border:none; color:#ef4444; font-size:12px; cursor:pointer; padding:2px 4px;" title="Xóa ghi chú">&times;</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render Clinical Pathway Matrix Ribbon
 */
export function renderPathwayRibbon(currentArticle: VaultArticle): string {
  const pathway = findPathwayArticles(currentArticle);
  
  const facets = [
    { key: 'gpsl', label: 'GP & sinh lý',    icon: 'fa-heart-pulse',           color: '#0284c7', article: pathway.gpsl, code: 'GPSL' },
    { key: 'slb',  label: 'Sinh lý bệnh',    icon: 'fa-bolt',                  color: '#f59e0b', article: pathway.slb,  code: 'SLB' },
    { key: 'dth',  label: 'Dịch tễ học',     icon: 'fa-virus',                 color: '#10b981', article: pathway.dth,  code: 'DTH' },
    { key: 'ytnc', label: 'Yếu tố nguy cơ',  icon: 'fa-triangle-exclamation',  color: '#f97316', article: pathway.ytnc, code: 'YTNC' },
    { key: 'cd',   label: 'Tiêu chuẩn CĐ',   icon: 'fa-clipboard-check',       color: '#ec4899', article: pathway.cd,   code: 'CD' },
    { key: 'pddt', label: 'Phác đồ',         icon: 'fa-pills',                 color: '#3b82f6', article: pathway.pddt, code: 'PDDT' },
    { key: 'bc',   label: 'Biến chứng',      icon: 'fa-heart-crack',           color: '#ef4444', article: pathway.bc,   code: 'BC' },
    { key: 'tv',   label: 'Tư vấn',          icon: 'fa-hand-holding-medical',  color: '#84cc16', article: pathway.tv,   code: 'TV' }
  ];

  // Count how many facets exist for this condition
  const availableFacets = facets.filter(f => f.article !== undefined);
  if (availableFacets.length <= 1 && !pathway.slb && !pathway.cd && !pathway.pddt && !pathway.ytnc) {
    return ''; // No cross-facet links needed for unique single articles
  }

  return `
    <div class="vault-pathway-container">
      <div class="vault-pathway-header">
        <span><i class="fa-solid fa-diagram-project" style="color:var(--vault-primary);"></i> <strong>Chuỗi Bệnh Học Toàn Diện:</strong> ${escapeHtml(pathway.conditionName)}</span>
        <span class="vault-pathway-count">${availableFacets.length} phân hệ liên kết</span>
      </div>
      <div class="vault-pathway-ribbon">
        ${facets.map(f => {
          const isCurrent = currentArticle.id === f.article?.id || currentArticle.khoCode === f.code;
          if (f.article) {
            return `
              <button 
                class="vault-pathway-pill ${isCurrent ? 'active' : ''}" 
                data-nav-id="${f.article.id}"
                style="--pill-color: ${f.color};"
                title="Mở ${f.label}: ${escapeHtml(f.article.title)}"
              >
                <i class="fa-solid ${f.icon}"></i>
                <span>${f.label}</span>
                ${isCurrent ? '<i class="fa-solid fa-circle-check" style="font-size:10px; margin-left:2px;"></i>' : ''}
              </button>
            `;
          } else {
            return `
              <div class="vault-pathway-pill disabled" style="opacity:0.4; cursor:not-allowed;" title="Chưa có dữ liệu cho phân hệ này">
                <i class="fa-solid ${f.icon}"></i>
                <span>${f.label}</span>
              </div>
            `;
          }
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * Format Medical Callouts into professional editorial cards
 */
function formatMedicalCallouts(text: string): string {
  const typeConfig: Record<string, { label: string; icon: string; themeClass: string }> = {
    // 1. Chứng cứ & EBM
    TRIAL:     { label: 'CHỨNG CỨ LÂM SÀNG / EBM',          icon: 'fa-solid fa-flask-vial',           themeClass: 'vault-callout--trial' },
    EBM:       { label: 'Y HỌC CHỨNG CỨ / RCT',             icon: 'fa-solid fa-scale-balanced',       themeClass: 'vault-callout--trial' },

    // 2. Cảnh báo nguy cơ & Chống chỉ định
    WARNING:   { label: 'CẢNH BÁO LÂM SÀNG (RED FLAGS)',     icon: 'fa-solid fa-triangle-exclamation', themeClass: 'vault-callout--warning' },
    CAUTION:   { label: 'CHỐNG CHỈ ĐỊNH & NGUY CƠ CAO',     icon: 'fa-solid fa-circle-exclamation',   themeClass: 'vault-callout--danger' },
    DANGER:    { label: 'NGUY CƠ NGUY KỊCH',                icon: 'fa-solid fa-radiation',            themeClass: 'vault-callout--danger' },
    CRITICAL:  { label: 'CẤP CỨU & KHẨN CẤP',              icon: 'fa-solid fa-bell-slash',           themeClass: 'vault-callout--danger' },

    // 3. Quan trọng & Lưu ý bắt buộc
    IMPORTANT: { label: 'LƯU Ý QUAN TRỌNG / BẮT BUỘC',       icon: 'fa-solid fa-triangle-exclamation', themeClass: 'vault-callout--important' },
    ALERT:     { label: 'CẢNH BÁO / LƯU Ý BẮT BUỘC',        icon: 'fa-solid fa-circle-exclamation',   themeClass: 'vault-callout--important' },

    // 4. Thực hành & Kinh nghiệm
    PEARL:     { label: 'ĐIỂM NGỌC LÂM SÀNG (CLINICAL PEARL)', icon: 'fa-solid fa-gem',               themeClass: 'vault-callout--pearl' },
    DOSING:    { label: 'CHỈ ĐỊNH & HIỆU CHỈNH LIỀU',       icon: 'fa-solid fa-pills',                themeClass: 'vault-callout--dosing' },
    NOTE:      { label: 'GHI CHÚ THỰC HÀNH',                icon: 'fa-solid fa-circle-info',          themeClass: 'vault-callout--note' },
    INFO:      { label: 'THÔNG TIN BỔ TRỢ',                 icon: 'fa-solid fa-circle-info',          themeClass: 'vault-callout--note' },
    TIP:       { label: 'LỜI KHUYÊN BÁC SĨ',                icon: 'fa-solid fa-lightbulb',            themeClass: 'vault-callout--tip' },
    TEACHBACK: { label: 'KỸ THUẬT TEACH-BACK',              icon: 'fa-solid fa-comments',             themeClass: 'vault-callout--teachback' },

    // 5. Kiểm tra & Chuẩn tắc
    CHECK:     { label: 'BẢNG KIỂM AN TOÀN',                icon: 'fa-solid fa-circle-check',         themeClass: 'vault-callout--check' },
    SUCCESS:   { label: 'TIÊU CHUẨN AN TOÀN ĐẠT',           icon: 'fa-solid fa-circle-check',         themeClass: 'vault-callout--check' },
    EXAMPLE:   { label: 'VÍ DỤ / CA BỆNH ĐIỂN HÌNH',        icon: 'fa-solid fa-book-medical',         themeClass: 'vault-callout--note' },
    QUESTION:  { label: 'CÂU HỎI LÂM SÀNG THƯỜNG GẶP',      icon: 'fa-solid fa-circle-question',      themeClass: 'vault-callout--note' }
  };

  const calloutRegex = /(?:^|\n)>[ \t]*\[!([A-Za-z0-9_-]+)\][ \t]*([^\n]*)(?:\n((?:[ \t]*>.*(?:\n|$))*))?/g;

  return text.replace(calloutRegex, (match, rawType, rawFirstLine, rawBodyLines) => {
    const type = (rawType || '').toUpperCase();
    const config = typeConfig[type] || {
      label: type,
      icon: 'fa-solid fa-circle-info',
      themeClass: 'vault-callout--note'
    };

    let title = '';
    let bodyLines: string[] = [];

    const firstLine = (rawFirstLine || '').trim();
    if (rawBodyLines) {
      bodyLines = (rawBodyLines as string)
        .split('\n')
        .map(l => l.replace(/^[ \t]*>[ \t]?/, ''))
        .filter((l, idx, arr) => !(l.trim() === '' && idx === arr.length - 1));
    }

    // 1. Phân tích dòng đầu tiên để tách thông minh giữa Title và Body
    if (firstLine) {
      const parenMatch = firstLine.match(/^\(([^)]+)\)[ \t]*(.*)$/);
      const boldMatch = firstLine.match(/^\*\*([^*]+)\*\*[:\-\s]*(.*)$/);

      if (parenMatch) {
        title = parenMatch[1].trim();
        if (parenMatch[2].trim()) bodyLines.unshift(parenMatch[2].trim());
      } else if (boldMatch) {
        title = boldMatch[1].trim();
        if (boldMatch[2].trim()) bodyLines.unshift(boldMatch[2].trim());
      } else {
        if (firstLine.length < 60 && bodyLines.length > 0 && !firstLine.includes('.')) {
          title = firstLine.replace(/^[:\-\s]+/, '').replace(/[:\-\s]+$/, '').trim();
        } else {
          bodyLines.unshift(firstLine);
        }
      }
    }

    // 2. Nếu dòng đầu không có title, kiểm tra xem dòng đầu tiên của body có phải là **Tiêu đề**: không
    if (!title && bodyLines.length > 0) {
      const firstBody = bodyLines[0].trim();
      const boldPrefixMatch = firstBody.match(/^\*\*([^*]+)\*\*[:\-\s]*(.*)$/);
      if (boldPrefixMatch) {
        title = boldPrefixMatch[1].trim();
        if (boldPrefixMatch[2].trim()) {
          bodyLines[0] = boldPrefixMatch[2].trim();
        } else {
          bodyLines.shift();
        }
      }
    }

    // 3. Render Body thành HTML với đầy đủ lists, bold, italic, links
    const bodyHtml = renderCalloutBodyHtml(bodyLines.join('\n'));

    // 4. Làm sạch title nếu còn sót ký tự Markdown
    const cleanTitle = title.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').trim();

    return `\n\n<div class="vault-callout ${config.themeClass}">
      <div class="vault-callout__header">
        <span class="vault-callout__badge"><i class="${config.icon}"></i> ${config.label}</span>
        ${cleanTitle ? `<span class="vault-callout__title">${escapeHtml(cleanTitle)}</span>` : ''}
      </div>
      ${bodyHtml ? `<div class="vault-callout__body">${bodyHtml}</div>` : ''}
    </div>\n\n`;
  });
}

/**
 * Render Callout Body Markdown (Lists, Bold, Italic, Inline Code, Links, Wikilinks)
 */
function renderCalloutBodyHtml(content: string): string {
  if (!content || !content.trim()) return '';

  const lines = content.trim().split('\n');
  const result: string[] = [];
  let inUl = false;
  let inOl = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      if (inUl) { result.push('</ul>'); inUl = false; }
      if (inOl) { result.push('</ol>'); inOl = false; }
      continue;
    }

    // Unordered list (- hoặc *)
    const ulMatch = line.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (inOl) { result.push('</ol>'); inOl = false; }
      if (!inUl) { result.push('<ul class="vault-callout-list">'); inUl = true; }
      result.push(`<li>${formatCalloutInlineMarkdown(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list (1. 2. 3.)
    const olMatch = line.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) { result.push('</ul>'); inUl = false; }
      if (!inOl) { result.push('<ol class="vault-callout-list vault-callout-list--ordered">'); inOl = true; }
      result.push(`<li>${formatCalloutInlineMarkdown(olMatch[1])}</li>`);
      continue;
    }

    // Close any open lists before normal paragraph
    if (inUl) { result.push('</ul>'); inUl = false; }
    if (inOl) { result.push('</ol>'); inOl = false; }

    result.push(`<p>${formatCalloutInlineMarkdown(line)}</p>`);
  }

  if (inUl) result.push('</ul>');
  if (inOl) result.push('</ol>');

  return result.join('\n');
}

/**
 * Format inline Markdown inside Callout
 */
function formatCalloutInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g, (match, target, label) => {
      const display = (label || target).trim();
      return `<button type="button" class="vault-wikilink-btn" data-wikilink="${escapeHtml(target.trim())}" title="Nhảy đến: ${escapeHtml(display)}"><i class="fa-solid fa-link" style="font-size:10px; opacity:0.8;"></i> ${escapeHtml(display)}</button>`;
    })
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="vault-external-link">$1</a>');
}

/**
 * Format Markdown Lists (Ordered and Unordered)
 */
function formatMarkdownLists(text: string): string {
  // Ordered lists: 1. 2. 3.
  text = text.replace(/(?:^|\n)((?:[ \t]*\d+\.\s+[^\n]+(?:\n|$))+)/g, (match, block) => {
    const items = block.trim().split('\n').map((line: string) => {
      const itemText = line.replace(/^[ \t]*\d+\.\s+/, '').trim();
      return `<li>${itemText}</li>`;
    }).join('');
    return `\n\n<ol class="vault-list vault-list--ordered">${items}</ol>\n\n`;
  });

  // Unordered lists: - or *
  text = text.replace(/(?:^|\n)((?:[ \t]*[-*]\s+[^\n]+(?:\n|$))+)/g, (match, block) => {
    const items = block.trim().split('\n').map((line: string) => {
      const itemText = line.replace(/^[ \t]*[-*]\s+/, '').trim();
      return `<li>${itemText}</li>`;
    }).join('');
    return `\n\n<ul class="vault-list vault-list--unordered">${items}</ul>\n\n`;
  });

  return text;
}

/**
 * Parse Markdown & Generate Dynamic TOC
 */
export function processMarkdownWithToc(rawMarkdown: string, article?: VaultArticle): { htmlContent: string; tocItems: TocItem[] } {
  const tocItems: TocItem[] = [];
  let headingCounter = 0;

  const isKhoTuVan = !!article && (
    article.khoCode === 'TV' ||
    (article.khoName && article.khoName.toLowerCase().includes('tư vấn')) ||
    (article.khoDir && article.khoDir.toLowerCase().includes('tư vấn')) ||
    (article.relPath && article.relPath.toLowerCase().includes('tư vấn')) ||
    (article.fullFileName && article.fullFileName.startsWith('TV_')) ||
    article.perspective === 'patient-only'
  );

  // 1. Clean frontmatter
  let clean = rawMarkdown.replace(/^---[\s\S]*?---\n*/, '');

  // 1b. In Kho Tư Vấn: Extract ONLY Patient & Inpatient Sections (Discard Doctor Section)
  if (isKhoTuVan) {
    const docMatch = clean.match(/^# .*(?:GÓC BÁC SĨ|Góc Bác sĩ)/im);
    const patMatch = clean.match(/^# .*(?:GÓC NGƯỜI BỆNH|Góc Người bệnh)/im);

    if (docMatch && patMatch && patMatch.index! > docMatch.index!) {
      const docIdx = docMatch.index!;
      const patIdx = patMatch.index!;
      clean = clean.slice(0, docIdx).trim() + (docIdx > 0 ? '\n\n' : '') + clean.slice(patIdx).trim();
    }
  }

  // 2. Format Math symbols
  clean = clean.replace(/\$([^$\n]+)\$/g, (match, formula) => {
    let f = formula
      .replace(/\\le/g, '≤')
      .replace(/\\ge/g, '≥')
      .replace(/\\pm/g, '±')
      .replace(/\\approx/g, '≈')
      .replace(/\\times/g, '×')
      .replace(/\\text\{\s*([^}]+)\s*\}/g, ' $1 ')
      .replace(/\\mu/g, 'μ')
      .replace(/\\Delta/g, 'Δ')
      .trim();
    return `<span class="vault-math-inline">${f}</span>`;
  });

  // 3. Format Code Blocks (Timelines & Clinical Algorithms)
  clean = clean.replace(/```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/g, (match, code) => {
    return `\n\n<div class="vault-timeline-card">
      <div class="vault-timeline-card__header">
        <i class="fa-solid fa-code-branch"></i>
        <span>Sơ đồ Động học & Diễn tiến Lâm sàng</span>
      </div>
      <pre class="vault-timeline-code"><code>${escapeHtml(code.trimEnd())}</code></pre>
    </div>\n\n`;
  });

  // 4. Format Medical Callouts
  clean = formatMedicalCallouts(clean);

  // 5. Pre-calculate perspective offsets in text
  const docMatch = clean.match(/^# .*(?:GÓC BÁC SĨ|Góc Bác sĩ)/im);
  const patMatch = clean.match(/^# .*(?:GÓC NGƯỜI BỆNH|Góc Người bệnh)/im);
  const inpatMatch = clean.match(/^# .*(?:NỘI TRÚ|Nội trú|BUỒNG BỆNH)/im);

  const docOffset = docMatch ? docMatch.index! : -1;
  const patOffset = patMatch ? patMatch.index! : -1;
  const inpatOffset = inpatMatch ? inpatMatch.index! : -1;

  // 6. Format H1 Banners
  clean = clean.replace(/^# (.*$)/gim, (match, titleText) => {
    const t = titleText.trim();
    if (t.includes('GÓC BÁC SĨ') || t.includes('Góc Bác sĩ')) {
      return `<div class="vault-perspective-banner vault-perspective-banner--doctor">
        <div class="vault-perspective-banner__tag"><i class="fa-solid fa-stethoscope"></i> GÓC NHÌN CHUYÊN MÔN</div>
        <h1 class="vault-perspective-banner__title">${t}</h1>
        <p class="vault-perspective-banner__desc">Dành cho Thầy thuốc: Tiêu chuẩn Chẩn đoán, Phân tầng Nguy cơ, Y học Chứng cứ & Cạm bẫy Lâm sàng</p>
      </div>`;
    }
    if (t.includes('GÓC NGƯỜI BỆNH') || t.includes('Góc Người bệnh')) {
      if (isKhoTuVan) {
        const cleanTitle = article?.title || t.replace(/^.*?GÓC NGƯỜI BỆNH[:\-\s]*/i, '') || 'Tư Vấn & Dặn Dò Cho Người Bệnh';
        const currentDate = new Date().toLocaleDateString('vi-VN');
        return `<div class="vault-counseling-header-card">
          <div class="vault-counseling-header-card__top">
            <span class="vault-counseling-badge"><i class="fa-solid fa-heart-pulse"></i> CLINIPORTAL • TỜ RƠI DẶN DÒ Y KHOA</span>
            <span class="vault-counseling-date"><i class="fa-regular fa-calendar-check"></i> Ngày dặn: ${currentDate}</span>
          </div>
          <h1 class="vault-counseling-title">${escapeHtml(cleanTitle)}</h1>
          <p class="vault-counseling-desc">Bản hướng dẫn tự theo dõi an toàn, chế độ dùng thuốc, dinh dưỡng phục hồi và các dấu hiệu cảnh báo đỏ cần nhập viện khẩn cấp.</p>
        </div>`;
      }
      return `<div class="vault-perspective-banner vault-perspective-banner--patient">
        <div class="vault-perspective-banner__tag"><i class="fa-solid fa-hospital-user"></i> TƯ VẤN & DẶN DÒ BỆNH NHÂN</div>
        <h1 class="vault-perspective-banner__title">${t}</h1>
        <p class="vault-perspective-banner__desc">Bản hướng dẫn dành cho Người bệnh & Thân nhân: Dấu hiệu Cảnh báo Đỏ, Lối sống, Dinh dưỡng & Tự theo dõi An toàn tại nhà</p>
      </div>`;
    }
    if (t.includes('NỘI TRÚ') || t.includes('Nội trú') || t.includes('BUỒNG BỆNH')) {
      return `<div class="vault-perspective-banner vault-perspective-banner--inpatient">
        <div class="vault-perspective-banner__tag"><i class="fa-solid fa-bed-pulse"></i> PHÁC ĐỒ NỘI TRÚ</div>
        <h1 class="vault-perspective-banner__title">${t}</h1>
        <p class="vault-perspective-banner__desc">Kế hoạch Điều trị Nội trú, Hồi sức Truyền dịch & Tiêu chuẩn Xuất viện</p>
      </div>`;
    }
    if (isKhoTuVan) {
      const cleanTitle = article?.title || t;
      const currentDate = new Date().toLocaleDateString('vi-VN');
      return `<div class="vault-counseling-header-card">
        <div class="vault-counseling-header-card__top">
          <span class="vault-counseling-badge"><i class="fa-solid fa-heart-pulse"></i> CLINIPORTAL • TỜ RƠI DẶN DÒ Y KHOA</span>
          <span class="vault-counseling-date"><i class="fa-regular fa-calendar-check"></i> Ngày dặn: ${currentDate}</span>
        </div>
        <h1 class="vault-counseling-title">${escapeHtml(cleanTitle)}</h1>
        <p class="vault-counseling-desc">Bản hướng dẫn tự theo dõi an toàn, chế độ dùng thuốc, dinh dưỡng phục hồi và các dấu hiệu cảnh báo đỏ cần nhập viện khẩn cấp.</p>
      </div>`;
    }
    return `<h1 class="vault-h1">${t}</h1>`;
  });

  // 7. Extract and replace headings with IDs and Perspective tagging
  clean = clean.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, titleText, offset) => {
    headingCounter++;
    const level = hashes.length;
    const cleanText = titleText.replace(/[*_]/g, '').replace(/`/g, '').trim();
    const headingId = `vault-heading-${headingCounter}`;

    let perspective: 'doctor' | 'patient' | 'inpatient' | 'all' = 'all';
    if (inpatOffset !== -1 && offset >= inpatOffset) {
      perspective = 'inpatient';
    } else if (patOffset !== -1 && offset >= patOffset) {
      perspective = 'patient';
    } else if (docOffset !== -1 && offset >= docOffset) {
      perspective = 'doctor';
    }

    tocItems.push({
      id: headingId,
      text: cleanText,
      level: level,
      perspective: perspective
    });

    return `<h${level} id="${headingId}" class="vault-h${level} vault-toc-target" data-perspective="${perspective}">${titleText}</h${level}>`;
  });

  clean = clean.replace(/^#### (.*$)/gim, '<h4 class="vault-h4">$1</h4>');

  // 8. Format Bold & Italic
  clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 9. Format Horizontal Rules
  clean = clean.replace(/^---$/gm, '<hr class="vault-divider" />');

  // 10. Format Markdown Lists
  clean = formatMarkdownLists(clean);

  // 11. Format Markdown Tables
  clean = formatMarkdownTables(clean);

  // 12. Attachments & Images
  const isSpaMode = !window.location.pathname.includes('/src/content/knowledge-vault/');
  const attachmentBase = isSpaMode ? './knowledge-vault/_resources/attachments/' : '../../../knowledge-vault/_resources/attachments/';

  clean = clean.replace(/!\[\[(.*?)\]\]/g, (match, fileName) => {
    const trimmed = fileName.trim();
    const encoded = encodeURI(trimmed);
    return `<div class="vault-img-card" style="text-align:center; margin:1.5rem 0;"><img src="${attachmentBase}${encoded}" alt="${escapeHtml(trimmed)}" style="max-width:100%; height:auto; border-radius:8px; border:1px solid var(--vault-border); box-shadow:0 4px 12px rgba(0,0,0,0.06);" loading="lazy" /><div style="font-size:11px; color:var(--vault-muted); margin-top:6px; font-style:italic;"><i class="fa-regular fa-image"></i> ${escapeHtml(trimmed)}</div></div>`;
  });

  clean = clean.replace(/!\[(.*?)\]\((.*?)\)/g, (match, altText, src) => {
    const trimmedSrc = src.trim();
    const resolvedSrc = trimmedSrc.startsWith('http') || trimmedSrc.startsWith('/') 
      ? trimmedSrc 
      : `${attachmentBase}${encodeURI(trimmedSrc)}`;
    return `<div class="vault-img-card" style="text-align:center; margin:1.5rem 0;"><img src="${resolvedSrc}" alt="${escapeHtml(altText)}" style="max-width:100%; height:auto; border-radius:8px; border:1px solid var(--vault-border); box-shadow:0 4px 12px rgba(0,0,0,0.06);" loading="lazy" />${altText ? `<div style="font-size:11px; color:var(--vault-muted); margin-top:6px; font-style:italic;">${escapeHtml(altText)}</div>` : ''}</div>`;
  });

  // 13. Obsidian Wikilinks
  clean = clean.replace(/\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g, (match, target, label) => {
    const displayLabel = (label || target).trim();
    const cleanTarget = target.trim();
    return `<button type="button" class="vault-wikilink-btn" data-wikilink="${escapeHtml(cleanTarget)}" title="Nhảy đến bài viết / ghi chú: ${escapeHtml(displayLabel)}"><i class="fa-solid fa-link" style="font-size:10px; opacity:0.8;"></i> ${escapeHtml(displayLabel)}</button>`;
  });

  // 14. Format Citations [28, 421]
  clean = clean.replace(/(?<=\s)\[(\d+(?:,\s*\d+)*)\]/g, '<span class="vault-ref-pill" title="Tài liệu tham khảo số $1">[$1]</span>');

  // 15. Format Paragraphs
  clean = clean.split('\n\n').map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<div') || trimmed.startsWith('<table') || 
        trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<hr') || 
        trimmed.startsWith('<pre')) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).filter(Boolean).join('\n\n');

  // 16. Wrap Dual/Triplet-Perspective sections as MUTUALLY EXCLUSIVE SIBLINGS (Index-based slicing)
  const docBannerMatch = clean.match(/<div class="vault-perspective-banner vault-perspective-banner--doctor"/i);
  const patBannerMatch = clean.match(/<div class="(?:vault-counseling-header-card|vault-perspective-banner vault-perspective-banner--patient(?: [^"]*)?)"/i);
  const inpatBannerMatch = clean.match(/<div class="vault-perspective-banner vault-perspective-banner--inpatient"/i);

  const rawTitle = article?.title || (article?.fullFileName ? article.fullFileName.replace(/\.md$/i, '') : '') || 'Tài liệu Dặn dò Y khoa';
  const articleTitle = rawTitle.startsWith('TV_') || rawTitle.includes('_')
    ? (article?.title && !article.title.startsWith('TV_') ? article.title : rawTitle.replace(/^[A-Z0-9]+_/i, '').replace(/_/g, ' '))
    : rawTitle;
  const currentDate = new Date().toLocaleDateString('vi-VN');

  // Patient Leaflet Header (for Non-KhoTuVan articles having a dual patient perspective)
  const patientLeafletHeader = `
    <div class="vault-patient-leaflet-banner">
      <div class="vault-patient-leaflet-banner__top">
        <span class="vault-patient-leaflet-badge"><i class="fa-solid fa-heart-pulse"></i> CLINIPORTAL • TỜ RƠI DẶN DÒ Y KHOA</span>
        <span class="vault-patient-leaflet-date">Ngày dặn: ${currentDate}</span>
      </div>
      <h2 class="vault-patient-leaflet-title">${escapeHtml(articleTitle)}</h2>
      <p class="vault-patient-leaflet-desc">Tài liệu dặn dò tự theo dõi, chế độ dinh dưỡng, dùng thuốc an toàn và dấu hiệu cảnh báo đỏ cần tái khám ngay</p>
    </div>
  `;

  // Patient Leaflet Footer with Signatures & Emergency Reminder
  const patientLeafletFooter = `
    <div class="vault-patient-leaflet-footer">
      <div class="vault-patient-leaflet-signature-grid">
        <div class="vault-patient-sign-box">
          <span class="vault-sign-title">NGƯỜI BỆNH / THÂN NHÂN</span>
          <span class="vault-sign-note">(Đã hiểu rõ lời dặn và cam kết theo dõi)</span>
          <div class="vault-sign-space"></div>
          <span class="vault-sign-dotline">Ký và ghi rõ họ tên</span>
        </div>
        <div class="vault-patient-sign-box">
          <span class="vault-sign-title">BÁC SĨ ĐIỀU TRỊ / TƯ VẤN</span>
          <span class="vault-sign-note">(Ký tên & Đóng dấu phòng khám)</span>
          <div class="vault-sign-space"></div>
          <span class="vault-sign-dotline">Ký và ghi rõ họ tên</span>
        </div>
      </div>
      <div class="vault-patient-leaflet-emergency-alert">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>
          <strong>LƯU Ý CẤP CỨU KHẨN CẤP:</strong> Khi xuất hiện bất kỳ dấu hiệu nguy hiểm (Mệt lả, li bì, đau bụng dữ dội, nôn ói nhiều, chảy máu chân răng/chảy máu mũi, nôn ra máu, tay chân lạnh ẩm), phải lập tức đưa người bệnh đến ngay cơ sở y tế gần nhất, không được chần chừ!
        </div>
      </div>
    </div>
  `;

  if (isKhoTuVan) {
    const defaultCounselingHeader = `
      <div class="vault-counseling-header-card">
        <div class="vault-counseling-header-card__top">
          <span class="vault-counseling-badge"><i class="fa-solid fa-heart-pulse"></i> CLINIPORTAL • TỜ RƠI DẶN DÒ Y KHOA</span>
          <span class="vault-counseling-date"><i class="fa-regular fa-calendar-check"></i> Ngày dặn: ${currentDate}</span>
        </div>
        <h1 class="vault-counseling-title">${escapeHtml(articleTitle)}</h1>
        <p class="vault-counseling-desc">Bản hướng dẫn tự theo dõi an toàn, chế độ dùng thuốc, dinh dưỡng phục hồi và các dấu hiệu cảnh báo đỏ cần nhập viện khẩn cấp.</p>
      </div>
    `;

    if (patBannerMatch) {
      const patStart = patBannerMatch.index!;
      const inpatStart = inpatBannerMatch ? inpatBannerMatch.index! : -1;
      const preContent = clean.slice(0, patStart);

      if (inpatStart > patStart) {
        const patContent = clean.slice(patStart, inpatStart) + patientLeafletFooter;
        const inpatContent = clean.slice(inpatStart);
        clean = `${preContent}
          <div id="vault-perspective-patient" class="vault-perspective-block perspective-patient-block" style="display:block;">${patContent}</div>
          <div id="vault-perspective-inpatient" class="vault-perspective-block perspective-inpatient-block" style="display:block;">${inpatContent}</div>`;
      } else {
        const patContent = clean.slice(patStart) + patientLeafletFooter;
        clean = `${preContent}
          <div id="vault-perspective-patient" class="vault-perspective-block perspective-patient-block" style="display:block; border-left:none; padding-left:0;">${patContent}</div>`;
      }
    } else {
      const inpatStart = inpatBannerMatch ? inpatBannerMatch.index! : -1;
      if (inpatStart > -1) {
        const patContent = defaultCounselingHeader + clean.slice(0, inpatStart) + patientLeafletFooter;
        const inpatContent = clean.slice(inpatStart);
        clean = `
          <div id="vault-perspective-patient" class="vault-perspective-block perspective-patient-block" style="display:block; border-left:none; padding-left:0;">${patContent}</div>
          <div id="vault-perspective-inpatient" class="vault-perspective-block perspective-inpatient-block" style="display:block;">${inpatContent}</div>`;
      } else {
        const patContent = defaultCounselingHeader + clean + patientLeafletFooter;
        clean = `
          <div id="vault-perspective-patient" class="vault-perspective-block perspective-patient-block" style="display:block; border-left:none; padding-left:0;">${patContent}</div>`;
      }
    }
  } else if (docBannerMatch && patBannerMatch) {
    const docStart = docBannerMatch.index!;
    const patStart = patBannerMatch.index!;
    const inpatStart = inpatBannerMatch ? inpatBannerMatch.index! : -1;

    const preContent = clean.slice(0, docStart);
    let docContent = '';
    let patContent = '';
    let inpatContent = '';

    if (inpatStart > patStart) {
      docContent = clean.slice(docStart, patStart);
      patContent = patientLeafletHeader + clean.slice(patStart, inpatStart) + patientLeafletFooter;
      inpatContent = clean.slice(inpatStart);
      clean = `${preContent}
        <div id="vault-perspective-doctor" class="vault-perspective-block perspective-doctor-block">${docContent}</div>
        <div id="vault-perspective-patient" class="vault-perspective-block perspective-patient-block">${patContent}</div>
        <div id="vault-perspective-inpatient" class="vault-perspective-block perspective-inpatient-block">${inpatContent}</div>`;
    } else {
      docContent = clean.slice(docStart, patStart);
      patContent = patientLeafletHeader + clean.slice(patStart) + patientLeafletFooter;
      clean = `${preContent}
        <div id="vault-perspective-doctor" class="vault-perspective-block perspective-doctor-block">${docContent}</div>
        <div id="vault-perspective-patient" class="vault-perspective-block perspective-patient-block">${patContent}</div>`;
    }
  }

  return { htmlContent: clean, tocItems };
}

/**
 * Render thanh điều khiển chuyển đổi góc nhìn đa chiều (Góc Bác Sĩ ↔ Người Bệnh ↔ Kế Hoạch Nội Trú)
 */
export function renderPerspectiveBar(article: VaultArticle, rawMarkdown: string): string {
  const isKhoTuVan = !!article && (
    article.khoCode === 'TV' ||
    (article.khoName && article.khoName.toLowerCase().includes('tư vấn')) ||
    (article.khoDir && article.khoDir.toLowerCase().includes('tư vấn')) ||
    (article.relPath && article.relPath.toLowerCase().includes('tư vấn')) ||
    (article.fullFileName && article.fullFileName.startsWith('TV_')) ||
    article.perspective === 'patient-only'
  );

  const isDual = isKhoTuVan || 
    ((rawMarkdown.includes('GÓC BÁC SĨ') || rawMarkdown.includes('Góc Bác sĩ')) && 
     (rawMarkdown.includes('GÓC NGƯỜI BỆNH') || rawMarkdown.includes('Góc Người bệnh')));
     
  if (!isDual) return '';

  const hasInpatient = rawMarkdown.includes('NỘI TRÚ') || rawMarkdown.includes('Nội trú') || article.context === 'noi-tru' || rawMarkdown.includes('BUỒNG BỆNH');

  if (isKhoTuVan) {
    return `
      <div class="vault-perspective-control-bar vault-counseling-action-bar">
        <div class="vault-perspective-badge-wrap">
          <span class="vault-perspective-title" style="color: #10b981;">
            <i class="fa-solid fa-hospital-user"></i>
            <strong>DẶN DÒ NGƯỜI BỆNH</strong>
          </span>
          ${hasInpatient ? `
          <div class="vault-perspective-tabs">
            <button type="button" class="vault-perspective-tab active" data-perspective="patient" title="Xem Hướng Dẫn Dặn Dò Bệnh Nhân (Ngoại trú)">
              <i class="fa-solid fa-house-chimney-medical"></i> <span>Ngoại Trú / Tại Nhà</span>
            </button>
            <button type="button" class="vault-perspective-tab" data-perspective="inpatient" title="Xem Kế Hoạch Nội Trú & Hướng Dẫn Nằm Viện">
              <i class="fa-solid fa-bed-pulse"></i> <span>Kế Hoạch Nội Trú</span>
            </button>
          </div>
          ` : `
          <span class="vault-counseling-pill-tag">
            <i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Chuẩn Giao Tiếp & Tờ Rơi In
          </span>
          `}
        </div>

        <div class="vault-perspective-actions">
          <button type="button" id="btn-print-patient-leaflet" class="vault-clinic-btn vault-clinic-btn--print" title="In tờ rơi dặn dò A4 chuẩn phát cho người bệnh">
            <i class="fa-solid fa-print"></i> <span>In Tờ Rơi A4</span>
          </button>
          <button type="button" id="btn-copy-patient-script" class="vault-clinic-btn vault-clinic-btn--copy" title="Sao chép toàn bộ lời dặn bệnh nhân để dán vào Zalo / SMS / Bệnh án">
            <i class="fa-regular fa-copy"></i> <span>Chép Lời Dặn (Zalo/SMS)</span>
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="vault-perspective-control-bar">
      <div class="vault-perspective-badge-wrap">
        <span class="vault-perspective-title">
          <i class="fa-solid fa-arrows-split-up-and-left" style="color: #84cc16;"></i>
          <strong>Góc Nhìn Đa Chiều:</strong>
        </span>
        <div class="vault-perspective-tabs">
          <button type="button" class="vault-perspective-tab active" data-perspective="all" title="Xem toàn diện tất cả các góc nhìn">
            <i class="fa-solid fa-layer-group"></i> <span>Toàn Diện</span>
          </button>
          <button type="button" class="vault-perspective-tab" data-perspective="doctor" title="Chỉ xem Góc Bác Sĩ: Chuyên môn, Cạm bẫy & Kỹ thuật Teach-Back">
            <i class="fa-solid fa-user-doctor"></i> <span>🩺 Góc Bác Sĩ</span>
          </button>
          <button type="button" class="vault-perspective-tab" data-perspective="patient" title="Chỉ xem Góc Người Bệnh: Dấu hiệu đỏ, Lối sống & Xử trí quên liều">
            <i class="fa-solid fa-hospital-user"></i> <span>👤 Góc Người Bệnh</span>
          </button>
          ${hasInpatient ? `
          <button type="button" class="vault-perspective-tab" data-perspective="inpatient" title="Chỉ xem Kế Hoạch Nội Trú & Checklist Xuất Viện">
            <i class="fa-solid fa-bed-pulse"></i> <span>🏥 Kế Hoạch Nội Trú</span>
          </button>
          ` : ''}
        </div>
      </div>

      <div class="vault-perspective-actions">
        <button type="button" id="btn-print-patient-leaflet" class="vault-clinic-btn vault-clinic-btn--print" title="In tờ rơi dặn dò A4 chuẩn phát cho người bệnh">
          <i class="fa-solid fa-print"></i> <span>In Tờ Rơi Bệnh Nhân</span>
        </button>
        <button type="button" id="btn-copy-patient-script" class="vault-clinic-btn vault-clinic-btn--copy" title="Sao chép toàn bộ lời dặn bệnh nhân để dán vào Zalo / SMS / Bệnh án">
          <i class="fa-regular fa-copy"></i> <span>Chép Lời Dặn (Zalo/SMS)</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Render Encyclopedia Quick Facts Card ở đầu bài viết bách khoa
 */
export function renderEncyclopediaQuickFactsHtml(article: VaultArticle): string {
  const icdText = (article.icd10 && article.icd10.length > 0) ? article.icd10.join(', ') : 'Chưa gán';
  const specialty = article.specialty || 'Tổng hợp';
  const readTime = article.readTime || '8-12 phút';
  
  return `
    <div class="vault-encyclopedia-card" style="background:var(--vault-surface); border:1px solid var(--vault-border); border-radius:12px; padding:1rem 1.25rem; margin-bottom:1.5rem; box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--vault-border); padding-bottom:8px; margin-bottom:12px;">
        <span style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:var(--vault-primary); display:flex; align-items:center; gap:6px;">
          <i class="fa-solid fa-graduation-cap"></i> Bách Khoa Toàn Thư Y Học — Tóm Tắt Nhanh
        </span>
        <span style="font-size:11px; background:rgba(2,132,199,0.1); color:var(--vault-primary); padding:2px 8px; border-radius:999px; font-weight:700;">
          Chuẩn EBM
        </span>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; font-size:12px;">
        <div style="background:var(--vault-bg); padding:8px 10px; border-radius:8px; border:1px solid var(--vault-border);">
          <div style="font-size:10.5px; color:var(--vault-muted); font-weight:600;"><i class="fa-solid fa-tags"></i> Phân loại / Chuyên khoa</div>
          <div style="font-weight:700; color:var(--vault-text); margin-top:2px;">${escapeHtml(specialty)}</div>
        </div>
        <div style="background:var(--vault-bg); padding:8px 10px; border-radius:8px; border:1px solid var(--vault-border);">
          <div style="font-size:10.5px; color:var(--vault-muted); font-weight:600;"><i class="fa-solid fa-barcode"></i> Mã ICD-10</div>
          <div style="font-weight:700; color:#ec4899; margin-top:2px;">${escapeHtml(icdText)}</div>
        </div>
        <div style="background:var(--vault-bg); padding:8px 10px; border-radius:8px; border:1px solid var(--vault-border);">
          <div style="font-size:10.5px; color:var(--vault-muted); font-weight:600;"><i class="fa-regular fa-clock"></i> Thời lượng đọc</div>
          <div style="font-weight:700; color:var(--vault-text); margin-top:2px;">${escapeHtml(readTime)}</div>
        </div>
        <div style="background:var(--vault-bg); padding:8px 10px; border-radius:8px; border:1px solid var(--vault-border);">
          <div style="font-size:10.5px; color:var(--vault-muted); font-weight:600;"><i class="fa-solid fa-circle-check"></i> Mức độ hoàn thiện</div>
          <div style="font-weight:700; color:#10b981; margin-top:2px;">Đã kiểm chứng EBM</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Sticky Table of Contents Sidebar HTML with Section Categorization
 */
export function renderTocHtml(tocItems: TocItem[]): string {
  if (tocItems.length < 2) return '';

  const hasPerspectives = tocItems.some(t => t.perspective && t.perspective !== 'all');

  if (!hasPerspectives) {
    return `
      <div class="vault-toc-sidebar">
        <div class="vault-toc-title"><i class="fa-solid fa-list-ul"></i> Mục lục bài viết</div>
        <nav class="vault-toc-nav">
          ${tocItems.map(item => `
            <a 
              href="#${item.id}" 
              class="vault-toc-link vault-toc-level-${item.level}" 
              data-target="${item.id}"
            >
              ${escapeHtml(item.text)}
            </a>
          `).join('')}
        </nav>
      </div>
    `;
  }

  const doctorItems = tocItems.filter(t => t.perspective === 'doctor');
  const patientItems = tocItems.filter(t => t.perspective === 'patient');
  const inpatientItems = tocItems.filter(t => t.perspective === 'inpatient');
  const otherItems = tocItems.filter(t => !t.perspective || t.perspective === 'all');

  // If there are no doctor items and no inpatient items, display clean single-column TOC without redundant perspective header
  if (doctorItems.length === 0 && inpatientItems.length === 0) {
    const allItems = [...otherItems, ...patientItems];
    return `
      <div class="vault-toc-sidebar">
        <div class="vault-toc-title"><i class="fa-solid fa-list-ul"></i> Mục lục bài viết</div>
        <nav class="vault-toc-nav">
          ${allItems.map(item => `
            <a 
              href="#${item.id}" 
              class="vault-toc-link vault-toc-level-${item.level}" 
              data-target="${item.id}"
            >
              ${escapeHtml(item.text)}
            </a>
          `).join('')}
        </nav>
      </div>
    `;
  }

  return `
    <div class="vault-toc-sidebar">
      <div class="vault-toc-title"><i class="fa-solid fa-list-ul"></i> Mục lục bài viết</div>
      <nav class="vault-toc-nav">
        ${otherItems.map(item => `
          <a href="#${item.id}" class="vault-toc-link vault-toc-level-${item.level}" data-target="${item.id}">
            ${escapeHtml(item.text)}
          </a>
        `).join('')}

        ${doctorItems.length > 0 ? `
          <div class="vault-toc-section-header vault-toc-section--doctor" data-perspective-target="doctor" title="Bấm để chuyển sang Góc Bác Sĩ">
            <i class="fa-solid fa-stethoscope"></i> <span>GÓC BÁC SĨ</span>
          </div>
          ${doctorItems.map(item => `
            <a href="#${item.id}" class="vault-toc-link vault-toc-level-${item.level}" data-target="${item.id}" data-perspective="doctor">
              ${escapeHtml(item.text)}
            </a>
          `).join('')}
        ` : ''}

        ${patientItems.length > 0 ? `
          <div class="vault-toc-section-header vault-toc-section--patient" data-perspective-target="patient" title="Bấm để chuyển sang Góc Người Bệnh">
            <i class="fa-solid fa-hospital-user"></i> <span>${inpatientItems.length > 0 ? 'NGOẠI TRÚ / TẠI NHÀ' : 'GÓC NGƯỜI BỆNH'}</span>
          </div>
          ${patientItems.map(item => `
            <a href="#${item.id}" class="vault-toc-link vault-toc-level-${item.level}" data-target="${item.id}" data-perspective="patient">
              ${escapeHtml(item.text)}
            </a>
          `).join('')}
        ` : ''}

        ${inpatientItems.length > 0 ? `
          <div class="vault-toc-section-header vault-toc-section--inpatient" data-perspective-target="inpatient" title="Bấm để chuyển sang Kế Hoạch Nội Trú">
            <i class="fa-solid fa-bed-pulse"></i> <span>KẾ HOẠCH NỘI TRÚ</span>
          </div>
          ${inpatientItems.map(item => `
            <a href="#${item.id}" class="vault-toc-link vault-toc-level-${item.level}" data-target="${item.id}" data-perspective="inpatient">
              ${escapeHtml(item.text)}
            </a>
          `).join('')}
        ` : ''}
      </nav>
    </div>
  `;
}

/**
 * Xác định Clinical Studio phù hợp nhất trong DocSpace dựa trên từ khóa bài viết
 */
export function getMatchingDocSpaceStudio(article: VaultArticle): { id: string; name: string; url: string; icon: string } | null {
  const text = `${article.title} ${article.specialty} ${article.snippet || ''} ${(article.keywords || []).join(' ')}`.toLowerCase();
  
  if (text.includes('khí máu') || text.includes('toan kiềm') || text.includes('abg') || text.includes('anion gap') || text.includes('davenport')) {
    return { id: 'abg', name: 'ABG Studio Pro', url: '#/docspace/studios/abg', icon: 'fa-solid fa-flask-vial' };
  }
  if (text.includes('điện tâm đồ') || text.includes('ecg') || text.includes('nhịp tim') || text.includes('rung nhĩ') || text.includes('qt kéo dài')) {
    return { id: 'ecg', name: 'ECG Lab Studio Pro', url: '#/docspace/studios/ecg', icon: 'fa-solid fa-heart-pulse' };
  }
  if (text.includes('sepsis') || text.includes('nhiễm khuẩn huyết') || text.includes('sốc nhiễm') || text.includes('curb-65') || text.includes('qsofa') || text.includes('viêm phổi')) {
    return { id: 'sepsis', name: 'Sepsis & ICU Studio', url: '#/docspace/studios/sepsis', icon: 'fa-solid fa-lungs-virus' };
  }
  if (text.includes('thận') || text.includes('suy thận') || text.includes('egfr') || text.includes('vancomycin') || text.includes('aminoglycoside') || text.includes('ckd-epi')) {
    return { id: 'renal', name: 'Renal & Dosing Studio', url: '#/docspace/studios/renal', icon: 'fa-solid fa-dna' };
  }
  if (text.includes('tim mạch') || text.includes('score2') || text.includes('ascvd') || text.includes('suy tim') || text.includes('lipid')) {
    return { id: 'cardio', name: 'Cardio Risk Studio', url: '#/docspace/studios/cardio', icon: 'fa-solid fa-chart-pie' };
  }
  if (text.includes('xơ gan') || text.includes('meld') || text.includes('child-pugh') || text.includes('gan mật') || text.includes('giãn tĩnh mạch')) {
    return { id: 'cirrhosis', name: 'Cirrhosis Studio Pro', url: '#/docspace/studios/cirrhosis', icon: 'fa-solid fa-disease' };
  }
  if (text.includes('thần kinh') || text.includes('nihss') || text.includes('đột quỵ') || text.includes('gcs') || text.includes('glasgow') || text.includes('màng não')) {
    return { id: 'neuro', name: 'Neuro-ICU Studio', url: '#/docspace/studios/neuro', icon: 'fa-solid fa-brain' };
  }
  if (text.includes('điện giải') || text.includes('hạ natri') || text.includes('ods') || text.includes('cpm') || text.includes('hạ kali') || text.includes('tăng kali')) {
    return { id: 'electrolyte', name: 'Electrolyte Studio Pro', url: '#/docspace/studios/electrolyte', icon: 'fa-solid fa-droplet' };
  }
  return null;
}

/**
 * Render Reader Toolbar (Controls for Zoom, Font, Fullscreen, Copy & DocSpace Actions)
 */
export function renderReaderToolbar(article: VaultArticle): string {
  const isKhoTuVan = !!article && (
    article.khoCode === 'TV' ||
    (article.khoName && article.khoName.toLowerCase().includes('tư vấn')) ||
    (article.khoDir && article.khoDir.toLowerCase().includes('tư vấn')) ||
    (article.relPath && article.relPath.toLowerCase().includes('tư vấn')) ||
    (article.fullFileName && article.fullFileName.startsWith('TV_')) ||
    article.perspective === 'patient-only'
  );

  if (isKhoTuVan) {
    return `
      <div class="vault-reader-toolbar vault-reader-toolbar--counseling">
        <div class="vault-reader-toolbar-left">
          <button id="btn-font-dec" class="vault-tool-btn" title="Giảm cỡ chữ (A-)"><i class="fa-solid fa-font" style="font-size:11px;"></i>-</button>
          <button id="btn-font-inc" class="vault-tool-btn" title="Tăng cỡ chữ (A+)"><i class="fa-solid fa-font"></i>+</button>
          <button id="btn-font-family" class="vault-tool-btn" title="Đổi kiểu chữ Serif / Sans">
            <i class="fa-solid fa-pen-nib"></i> <span id="font-family-label">${readerSettings.fontFamily === 'serif' ? 'Serif' : 'Sans'}</span>
          </button>
          <button id="btn-senior-mode" class="vault-tool-btn" style="color:#0284c7; font-weight:700; background:rgba(2,132,199,0.08); border-color:rgba(2,132,199,0.25);" title="Bật cỡ chữ lớn & tương phản cao cho người cao tuổi / bệnh nhân đọc đối diện">
            <i class="fa-solid fa-glasses"></i> <span>Chữ Lớn Cho BN</span>
          </button>
        </div>

        <div class="vault-reader-toolbar-right">
          <button id="btn-open-obsidian" class="vault-tool-btn" data-rel="${escapeHtml(article.relPath)}" style="color:#a855f7; font-weight:700;" title="Mở trực tiếp bài viết này trong ứng dụng Obsidian">
            <i class="fa-solid fa-gem"></i> Obsidian Note
          </button>
          <button id="btn-copy-vault-path" class="vault-tool-btn" data-rel="${escapeHtml(article.relPath)}" title="Sao chép đường dẫn tệp Markdown trong Vault">
            <i class="fa-regular fa-copy"></i> Copy Path
          </button>
          <button id="btn-fullscreen-reader" class="vault-tool-btn" title="Bật/Tắt chế độ đọc toàn màn hình">
            <i class="fa-solid ${readerSettings.isFullscreen ? 'fa-compress' : 'fa-expand'}"></i>
          </button>
        </div>
      </div>
    `;
  }

  const matchingStudio = getMatchingDocSpaceStudio(article);

  return `
    <div class="vault-reader-toolbar">
      <div class="vault-reader-toolbar-left">
        <button id="btn-font-dec" class="vault-tool-btn" title="Giảm cỡ chữ (A-)"><i class="fa-solid fa-font" style="font-size:11px;"></i>-</button>
        <button id="btn-font-inc" class="vault-tool-btn" title="Tăng cỡ chữ (A+)"><i class="fa-solid fa-font"></i>+</button>
        <button id="btn-font-family" class="vault-tool-btn" title="Đổi kiểu chữ Serif / Sans">
          <i class="fa-solid fa-pen-nib"></i> <span id="font-family-label">${readerSettings.fontFamily === 'serif' ? 'Serif' : 'Sans'}</span>
        </button>
      </div>

      <div class="vault-reader-toolbar-right">
        <!-- Nút liên thông DocSpace SOAP -->
        <button id="btn-apply-to-soap" class="vault-tool-btn" data-id="${article.id}" style="color:#0284c7; font-weight:800; background:rgba(2,132,199,0.1); border-color:rgba(2,132,199,0.3);" title="Nạp phác đồ và khuyến cáo này vào Bệnh án SOAP DocSpace">
          <i class="fa-solid fa-notes-medical"></i> Áp Dụng Vào SOAP
        </button>

        ${matchingStudio ? `
          <a href="${matchingStudio.url}" class="vault-tool-btn" style="color:#8b5cf6; font-weight:800; background:rgba(139,92,246,0.1); border-color:rgba(139,92,246,0.3); text-decoration:none; display:inline-flex; align-items:center; gap:5px;" title="Mở phòng nghiên cứu & tính toán chuyên sâu trong DocSpace">
            <i class="${matchingStudio.icon}"></i> Mở ${matchingStudio.name}
          </a>
        ` : ''}

        <button id="btn-open-obsidian" class="vault-tool-btn" data-rel="${escapeHtml(article.relPath)}" style="color:#a855f7; font-weight:700;" title="Mở trực tiếp bài viết này trong ứng dụng Obsidian">
          <i class="fa-solid fa-gem"></i> Mở Obsidian
        </button>
        <button id="btn-copy-vault-path" class="vault-tool-btn" data-rel="${escapeHtml(article.relPath)}" title="Sao chép đường dẫn tệp Markdown trong Vault">
          <i class="fa-regular fa-copy"></i> Copy Path
        </button>
        <button id="btn-add-annotation-tool" class="vault-tool-btn" data-id="${article.id}" style="color:#d97706; font-weight:700;" title="Đúc kết kinh nghiệm lâm sàng vào bài viết này">
          <i class="fa-solid fa-pen-to-square"></i> Đúc kết lâm sàng
        </button>
        <button id="btn-import-to-docspace-protocol" class="vault-tool-btn" data-id="${article.id}" style="color:var(--vault-primary); font-weight:700;" title="Nạp phác đồ này thành bảng kiểm điều trị động trong DocSpace">
          <i class="fa-solid fa-bolt"></i> Nạp vào DocSpace Protocol
        </button>
        <button id="btn-export-vault-md" class="vault-tool-btn" data-id="${article.id}" style="color:#059669; font-weight:600;" title="Tải bài viết dạng Markdown (.md) kèm ghi chú cá nhân">
          <i class="fa-solid fa-file-arrow-down"></i> Xuất MD
        </button>
        <button id="btn-copy-citation" class="vault-tool-btn" title="Sao chép trích dẫn y khoa vào Clipboard">
          <i class="fa-solid fa-quote-right"></i> Trích dẫn
        </button>
        <button id="btn-fullscreen-reader" class="vault-tool-btn" title="Bật/Tắt chế độ đọc toàn màn hình">
          <i class="fa-solid ${readerSettings.isFullscreen ? 'fa-compress' : 'fa-expand'}"></i>
        </button>
      </div>
    </div>
  `;
}

/**
 * Bind Reader Pro Events (Pathway clicks, TOC smooth scroll, Scrollspy, Toolbar)
 */
export function attachReaderProEvents(drawerPanel: HTMLElement, onNavigateArticle: (id: string) => void): void {
  // Pathway Navigation Pills
  drawerPanel.querySelectorAll('.vault-pathway-pill[data-nav-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const navId = btn.getAttribute('data-nav-id');
      if (navId) onNavigateArticle(navId);
    });
  });

  // Wikilink Button Two-Way Navigation
  drawerPanel.querySelectorAll('.vault-wikilink-btn[data-wikilink]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rawTarget = btn.getAttribute('data-wikilink') || '';
      const cleanTarget = rawTarget.replace(/^[./\\]+/, '').trim();
      const baseName = cleanTarget.split('/').pop()?.replace(/\.md$/, '').trim().toLowerCase() || '';

      const found = VAULT_CATALOG.find(a => 
        a.id === rawTarget || 
        a.relPath.toLowerCase() === cleanTarget.toLowerCase() ||
        a.relPath.toLowerCase().endsWith(cleanTarget.toLowerCase()) ||
        a.title.toLowerCase() === baseName || 
        (a.aliases || []).some(al => al.toLowerCase() === baseName) ||
        a.fullFileName.toLowerCase().replace(/\.md$/, '') === baseName
      );

      if (found) {
        onNavigateArticle(found.id);
      } else {
        // Fallback: Open note in Obsidian
        const cleanFile = cleanTarget.replace(/\.md$/, '');
        window.open(`obsidian://open?vault=Apps_ykhoa&file=${encodeURIComponent(cleanFile)}`);
      }
    });
  });

  // Open in Obsidian
  const openObsidianBtn = drawerPanel.querySelector('#btn-open-obsidian');
  if (openObsidianBtn) {
    openObsidianBtn.addEventListener('click', () => {
      const relPath = openObsidianBtn.getAttribute('data-rel') || '';
      const cleanPath = 'knowledge-vault/' + relPath.replace(/\.md$/, '');
      window.open(`obsidian://open?vault=Apps_ykhoa&file=${encodeURIComponent(cleanPath)}`);
    });
  }

  // Copy Vault Path
  const copyVaultPathBtn = drawerPanel.querySelector('#btn-copy-vault-path');
  if (copyVaultPathBtn) {
    copyVaultPathBtn.addEventListener('click', () => {
      const relPath = copyVaultPathBtn.getAttribute('data-rel') || '';
      const fullVaultPath = `knowledge-vault/${relPath}`;
      navigator.clipboard.writeText(fullVaultPath).then(() => {
        copyVaultPathBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã chép Path';
        setTimeout(() => {
          copyVaultPathBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Path';
        }, 2000);
      });
    });
  }

  // TOC Links Smooth Scroll & Auto-Perspective Switching
  const scrollContainer = drawerPanel.querySelector('.vault-drawer-body') as HTMLElement | null;
  let isUserClickingToc = false;

  // Helper function: accurately scroll to a heading inside scrollContainer
  const scrollToTargetHeading = (targetEl: HTMLElement) => {
    if (!scrollContainer) return;
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const targetScrollTop = scrollContainer.scrollTop + (targetRect.top - containerRect.top) - 20;

    scrollContainer.scrollTo({
      top: Math.max(0, targetScrollTop),
      behavior: 'smooth'
    });
  };

  // Helper function: accurately update Scrollspy active indicator
  const updateScrollspy = () => {
    if (isUserClickingToc || !scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const targets = Array.from(drawerPanel.querySelectorAll('.vault-toc-target')) as HTMLElement[];

    // Filter only visible targets (not display: none)
    const visibleTargets = targets.filter(el => {
      return el.offsetParent !== null && el.offsetWidth > 0 && el.offsetHeight > 0;
    });

    if (visibleTargets.length === 0) return;

    let activeTargetId = '';

    for (let i = 0; i < visibleTargets.length; i++) {
      const el = visibleTargets[i];
      const rect = el.getBoundingClientRect();
      const relativeTop = rect.top - containerRect.top;

      // Heading has scrolled into or past the top view area (within 100px threshold)
      if (relativeTop <= 100) {
        activeTargetId = el.id;
      } else {
        break;
      }
    }

    // Default to the first visible heading if at the top of the article
    if (!activeTargetId && visibleTargets.length > 0) {
      activeTargetId = visibleTargets[0].id;
    }

    if (activeTargetId) {
      drawerPanel.querySelectorAll('.vault-toc-link').forEach(link => {
        if (link.getAttribute('data-target') === activeTargetId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  drawerPanel.querySelectorAll('.vault-toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (!targetId || !scrollContainer) return;

      const targetEl = drawerPanel.querySelector(`#${targetId}`) as HTMLElement | null;
      if (!targetEl) return;

      // Lock scrollspy temporarily during smooth scroll
      isUserClickingToc = true;
      drawerPanel.querySelectorAll('.vault-toc-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Auto-switch perspective if target is inside a hidden block
      const parentBlock = targetEl.closest('.vault-perspective-block') as HTMLElement | null;
      let delay = 0;

      if (parentBlock && parentBlock.style.display === 'none') {
        delay = 80;
        if (parentBlock.id === 'vault-perspective-patient') {
          const patTab = drawerPanel.querySelector('.vault-perspective-tab[data-perspective="patient"]') as HTMLElement | null;
          if (patTab) patTab.click();
        } else if (parentBlock.id === 'vault-perspective-doctor') {
          const docTab = drawerPanel.querySelector('.vault-perspective-tab[data-perspective="doctor"]') as HTMLElement | null;
          if (docTab) docTab.click();
        } else if (parentBlock.id === 'vault-perspective-inpatient') {
          const inpatTab = drawerPanel.querySelector('.vault-perspective-tab[data-perspective="inpatient"]') as HTMLElement | null;
          if (inpatTab) inpatTab.click();
        }
      }

      setTimeout(() => {
        scrollToTargetHeading(targetEl);
        setTimeout(() => {
          isUserClickingToc = false;
        }, 700);
      }, delay);
    });
  });

  // TOC Section Header clicks switch perspective tab
  drawerPanel.querySelectorAll('.vault-toc-section-header[data-perspective-target]').forEach(header => {
    header.addEventListener('click', () => {
      const targetPersp = header.getAttribute('data-perspective-target');
      if (targetPersp) {
        const tab = drawerPanel.querySelector(`.vault-perspective-tab[data-perspective="${targetPersp}"]`) as HTMLElement | null;
        if (tab) {
          tab.click();
          setTimeout(() => {
            updateScrollspy();
          }, 80);
        }
      }
    });
  });

  // TOC Scrollspy listener
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', updateScrollspy, { passive: true });
    setTimeout(updateScrollspy, 120);
  }

  // Reading Toolbar Controls
  const fontDecBtn = drawerPanel.querySelector('#btn-font-dec');
  const fontIncBtn = drawerPanel.querySelector('#btn-font-inc');
  const fontFamBtn = drawerPanel.querySelector('#btn-font-family');
  const fullBtn = drawerPanel.querySelector('#btn-fullscreen-reader');
  const copyBtn = drawerPanel.querySelector('#btn-copy-citation');
  const contentEl = drawerPanel.querySelector('.vault-article-content') as HTMLElement | null;

  if (fontDecBtn && contentEl) {
    fontDecBtn.addEventListener('click', () => {
      if (readerSettings.fontSize > 0.85) {
        readerSettings.fontSize -= 0.1;
        contentEl.style.fontSize = `${readerSettings.fontSize}rem`;
      }
    });
  }

  if (fontIncBtn && contentEl) {
    fontIncBtn.addEventListener('click', () => {
      if (readerSettings.fontSize < 1.45) {
        readerSettings.fontSize += 0.1;
        contentEl.style.fontSize = `${readerSettings.fontSize}rem`;
      }
    });
  }

  if (fontFamBtn && contentEl) {
    fontFamBtn.addEventListener('click', () => {
      readerSettings.fontFamily = readerSettings.fontFamily === 'sans' ? 'serif' : 'sans';
      contentEl.style.fontFamily = readerSettings.fontFamily === 'serif' ? '"Merriweather", Georgia, serif' : 'inherit';
      const label = drawerPanel.querySelector('#font-family-label');
      if (label) label.textContent = readerSettings.fontFamily === 'serif' ? 'Serif' : 'Sans';
    });
  }

  const seniorModeBtn = drawerPanel.querySelector('#btn-senior-mode');
  if (seniorModeBtn) {
    seniorModeBtn.addEventListener('click', () => {
      const isSenior = drawerPanel.classList.toggle('vault-patient-reading-mode');
      seniorModeBtn.classList.toggle('active', isSenior);
      seniorModeBtn.innerHTML = isSenior 
        ? '<i class="fa-solid fa-glasses"></i> <span>Chữ Thường</span>' 
        : '<i class="fa-solid fa-glasses"></i> <span>Chữ Lớn Cho BN</span>';
    });
  }

  if (fullBtn) {
    fullBtn.addEventListener('click', () => {
      readerSettings.isFullscreen = !readerSettings.isFullscreen;
      drawerPanel.classList.toggle('fullscreen-mode', readerSettings.isFullscreen);
      fullBtn.innerHTML = `<i class="fa-solid ${readerSettings.isFullscreen ? 'fa-compress' : 'fa-expand'}"></i>`;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const title = drawerPanel.querySelector('#vault-drawer-title')?.textContent || 'Tài liệu CliniPortal';
      const citationText = `[Trích dẫn CliniPortal Knowledge Vault]: ${title} (Truy cập: ${new Date().toLocaleDateString('vi-VN')})`;
      navigator.clipboard.writeText(citationText).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã chép';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-quote-right"></i> Trích dẫn';
        }, 2000);
      });
    });
  }

  // Apply to Active DocSpace SOAP
  const applySoapBtn = drawerPanel.querySelector('#btn-apply-to-soap');
  if (applySoapBtn) {
    applySoapBtn.addEventListener('click', () => {
      const articleId = applySoapBtn.getAttribute('data-id');
      const article = VAULT_CATALOG.find(a => a.id === articleId);
      const title = drawerPanel.querySelector('#vault-drawer-title')?.textContent || 'Tài liệu Knowledge Vault';
      const snippetEl = drawerPanel.querySelector('.vault-article-content');
      const snippet = snippetEl ? snippetEl.textContent?.slice(0, 400).trim() || '' : '';
      const icdCode = (article && article.icd10 && article.icd10.length > 0) ? article.icd10[0] : '';
      
      const payload = {
        title,
        icd10: icdCode,
        evidence: `[EBM Vault]: ${title}${icdCode ? ` (Mã ICD: ${icdCode})` : ''}\n• Trích dẫn hướng dẫn: ${snippet}`,
        appliedAt: new Date().toISOString()
      };

      try {
        localStorage.setItem('dsp_pending_vault_import', JSON.stringify(payload));
        window.dispatchEvent(new CustomEvent('dsp:vault-applied-to-soap', { detail: payload }));
        
        applySoapBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã Chuyển Sang SOAP';
        applySoapBtn.setAttribute('style', 'color:#10b981; font-weight:800; background:rgba(16,185,129,0.1); border-color:rgba(16,185,129,0.3);');
        
        setTimeout(() => {
          const icdParam = icdCode ? `&from_vault_icd=${encodeURIComponent(icdCode)}` : '';
          window.location.hash = `#/docspace/soap?from_vault=${encodeURIComponent(title)}${icdParam}`;
        }, 300);
      } catch (e) {
        alert(`Đã lưu trích dẫn bài viết "${title}" vào bộ đệm lâm sàng.`);
      }
    });
  }

  // Import to DocSpace Living Protocol
  const importProtoBtn = drawerPanel.querySelector('#btn-import-to-docspace-protocol');
  if (importProtoBtn) {
    importProtoBtn.addEventListener('click', () => {
      const title = drawerPanel.querySelector('#vault-drawer-title')?.textContent || 'Phác đồ mới';
      const headings = drawerPanel.querySelectorAll('.vault-toc-target');
      
      const steps = Array.from(headings).map((h, idx) => ({
        order: idx + 1,
        title: h.textContent || `Bước ${idx + 1}`,
        text: (h.nextElementSibling?.textContent || '').slice(0, 200),
        isAlert: false
      }));

      // Fallback default step if no headings
      if (steps.length === 0) {
        steps.push({
          order: 1,
          title: 'Khởi đầu phác đồ',
          text: 'Thực hiện theo chỉ định phác đồ chuẩn hóa từ Knowledge Vault.',
          isAlert: false
        });
      }

      // Save into DocSpace localStorage
      try {
        const profileId = localStorage.getItem('dsp_active_profile') || 'default_doctor';
        const key = `dsp_${profileId}_protocols`;
        const existingRaw = localStorage.getItem(key);
        const protocols = existingRaw ? JSON.parse(existingRaw) : [];

        const newProto = {
          id: `proto_vault_${Date.now()}`,
          doctorId: profileId,
          title: title,
          specialty: 'Kho Tri Thức Vault',
          summary: `Nhập tự động từ Knowledge Vault: ${title}`,
          steps: steps,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        protocols.unshift(newProto);
        localStorage.setItem(key, JSON.stringify(protocols));

        importProtoBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã Nạp Vào DocSpace';
        importProtoBtn.setAttribute('style', 'color:#10b981; font-weight:700;');

        // Dispatch cross-window event
        window.dispatchEvent(new CustomEvent('dsp:protocol-imported', { detail: newProto }));
      } catch (err) {
        alert('Đã nạp phác đồ vào bộ nhớ DocSpace thành công.');
      }
    });
  }

  // Personal Annotation Form Toggle & Actions
  const toggleAnnBtn = drawerPanel.querySelector('#btn-toggle-add-annotation');
  const toggleAnnToolBtn = drawerPanel.querySelector('#btn-add-annotation-tool');
  const annForm = drawerPanel.querySelector('#vault-annotation-form') as HTMLElement | null;
  const annInput = drawerPanel.querySelector('#vault-annotation-input') as HTMLTextAreaElement | null;
  const cancelAnnBtn = drawerPanel.querySelector('#btn-cancel-annotation');
  const saveAnnBtn = drawerPanel.querySelector('#btn-save-annotation');

  const showAnnForm = () => {
    if (annForm) {
      annForm.style.display = 'block';
      annInput?.focus();
    }
  };

  toggleAnnBtn?.addEventListener('click', showAnnForm);
  toggleAnnToolBtn?.addEventListener('click', showAnnForm);

  cancelAnnBtn?.addEventListener('click', () => {
    if (annForm) annForm.style.display = 'none';
  });

  saveAnnBtn?.addEventListener('click', () => {
    const text = annInput?.value.trim();
    const articleId = drawerPanel.querySelector('.vault-pathway-pill.active')?.getAttribute('data-nav-id') || 
                      drawerPanel.querySelector('#btn-import-to-docspace-protocol')?.getAttribute('data-id');
    if (!text || !articleId) return;

    saveAnnotationForArticle(articleId, text);
    if (annInput) annInput.value = '';
    if (annForm) annForm.style.display = 'none';

    // Re-render drawer for updated notes
    onNavigateArticle(articleId);
  });

  // Delete Annotation Handler
  drawerPanel.querySelectorAll('.js-delete-annotation').forEach(btn => {
    btn.addEventListener('click', () => {
      const annId = btn.getAttribute('data-id');
      const articleId = drawerPanel.querySelector('.vault-pathway-pill.active')?.getAttribute('data-nav-id') || 
                        drawerPanel.querySelector('#btn-import-to-docspace-protocol')?.getAttribute('data-id');
      if (annId && articleId && confirm('Bạn có chắc muốn xóa ghi chú lâm sàng này?')) {
        deleteAnnotation(articleId, annId);
        onNavigateArticle(articleId);
      }
    });
  });

  // Export Markdown File with Personal Pearls
  const exportMdBtn = drawerPanel.querySelector('#btn-export-vault-md');
  if (exportMdBtn) {
    exportMdBtn.addEventListener('click', () => {
      const title = drawerPanel.querySelector('#vault-drawer-title')?.textContent || 'TaiLieu_Vault';
      const articleId = exportMdBtn.getAttribute('data-id') || 'article';
      const annotations = getAnnotationsForArticle(articleId);
      
      let markdownExport = `---\ntitle: "${title}"\nauthor: "${localStorage.getItem('dsp_active_profile') || 'CliniPortal Doctor'}"\nexportedAt: "${new Date().toISOString()}"\ntags: ["CliniPortal", "KnowledgeVault", "ClinicalPractice"]\n---\n\n# ${title}\n\n`;

      if (annotations.length > 0) {
        markdownExport += `## 💡 Đúc Kết Kinh Nghiệm Lâm Sàng (Clinical Pearls)\n\n`;
        annotations.forEach(a => {
          markdownExport += `> [!TIP]\n> **Ghi chú (${new Date(a.createdAt).toLocaleDateString('vi-VN')}):** ${a.noteText}\n\n`;
        });
      }

      const contentEl = drawerPanel.querySelector('.vault-article-content');
      if (contentEl) {
        markdownExport += `## Nội Dung Tài Liệu\n\n` + contentEl.textContent;
      }

      // Trigger download
      const blob = new Blob([markdownExport], { type: 'text/markdown;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${title.replace(/[/\\?%*:|"<>]/g, '_')}_Annotated.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      exportMdBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã Tải MD';
      setTimeout(() => {
        exportMdBtn.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Xuất MD';
      }, 2000);
    });
  }

  // Dual/Triplet-Perspective Switcher Tabs
  drawerPanel.querySelectorAll('.vault-perspective-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      drawerPanel.querySelectorAll('.vault-perspective-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const perspective = tab.getAttribute('data-perspective');
      const doctorBlock = drawerPanel.querySelector('#vault-perspective-doctor') as HTMLElement | null;
      const patientBlock = drawerPanel.querySelector('#vault-perspective-patient') as HTMLElement | null;
      const inpatientBlock = drawerPanel.querySelector('#vault-perspective-inpatient') as HTMLElement | null;
      const annotationsContainer = drawerPanel.querySelector('.vault-annotations-container') as HTMLElement | null;
      const tocSidebar = drawerPanel.querySelector('.vault-toc-sidebar') as HTMLElement | null;

      if (tocSidebar) {
        tocSidebar.classList.remove('perspective-active-doctor', 'perspective-active-patient', 'perspective-active-inpatient');
        if (perspective && perspective !== 'all') {
          tocSidebar.classList.add(`perspective-active-${perspective}`);
        }
      }

      if (perspective === 'all') {
        if (doctorBlock) doctorBlock.style.display = 'block';
        if (patientBlock) patientBlock.style.display = 'block';
        if (inpatientBlock) inpatientBlock.style.display = 'block';
        if (annotationsContainer) annotationsContainer.style.display = 'block';
      } else if (perspective === 'doctor') {
        if (doctorBlock) doctorBlock.style.display = 'block';
        if (patientBlock) patientBlock.style.display = 'none';
        if (inpatientBlock) inpatientBlock.style.display = 'none';
        if (annotationsContainer) annotationsContainer.style.display = 'block';
      } else if (perspective === 'patient') {
        if (doctorBlock) doctorBlock.style.display = 'none';
        if (patientBlock) patientBlock.style.display = 'block';
        if (inpatientBlock) inpatientBlock.style.display = 'none';
        if (annotationsContainer) annotationsContainer.style.display = 'none';
      } else if (perspective === 'inpatient') {
        if (doctorBlock) doctorBlock.style.display = 'none';
        if (patientBlock) patientBlock.style.display = 'none';
        if (inpatientBlock) inpatientBlock.style.display = 'block';
        if (annotationsContainer) annotationsContainer.style.display = 'none';
      }

      // Re-evaluate scrollspy for the active perspective
      setTimeout(updateScrollspy, 80);
    });
  });

  // Print Patient Leaflet Action (In tờ rơi dặn dò chuẩn cho người bệnh)
  const printLeafletBtn = drawerPanel.querySelector('#btn-print-patient-leaflet');
  if (printLeafletBtn) {
    printLeafletBtn.addEventListener('click', () => {
      // 1. Tự động chuyển sang góc người bệnh
      const patientTab = drawerPanel.querySelector('.vault-perspective-tab[data-perspective="patient"]') as HTMLElement | null;
      if (patientTab) patientTab.click();

      // 2. Gắn cờ class chuyên biệt khi in
      document.body.classList.add('vault-printing-patient-leaflet');

      // 3. Kích hoạt in ấn sau khi layout hoàn tất
      setTimeout(() => {
        window.print();
      }, 300);

      window.addEventListener('afterprint', () => {
        document.body.classList.remove('vault-printing-patient-leaflet');
      }, { once: true });
    });
  }

  // Copy Patient Advice Script Action
  const copyScriptBtn = drawerPanel.querySelector('#btn-copy-patient-script');
  if (copyScriptBtn) {
    copyScriptBtn.addEventListener('click', () => {
      const activeTab = drawerPanel.querySelector('.vault-perspective-tab.active')?.getAttribute('data-perspective');
      const patientEl = drawerPanel.querySelector('#vault-perspective-patient') as HTMLElement | null;
      const inpatientEl = drawerPanel.querySelector('#vault-perspective-inpatient') as HTMLElement | null;
      const title = drawerPanel.querySelector('#vault-drawer-title')?.textContent || 'Tài liệu dặn dò';

      let text = '';
      let contextTitle = 'NGOẠI TRÚ / BUỒNG KHÁM';
      if (activeTab === 'inpatient' && inpatientEl) {
        text = inpatientEl.innerText;
        contextTitle = 'NỘI TRÚ / CHECKLIST XUẤT VIỆN';
      } else if (patientEl) {
        text = patientEl.innerText;
        contextTitle = 'NGƯỜI BỆNH / TỜ RƠI DẶN DÒ';
      }

      if (!text) {
        const fullContent = drawerPanel.querySelector('.vault-article-content') as HTMLElement | null;
        text = fullContent ? (fullContent as HTMLElement).innerText : '';
      }

      let cleanBody = text
        .replace(/CLINIPORTAL • TỜ RƠI DẶN DÒ Y KHOA[\s\S]*?Bản hướng dẫn tự theo dõi[^\n]*/i, '')
        .replace(/NGƯỜI BỆNH \/ THÂN NHÂN[\s\S]*$/i, '')
        .replace(/\[\d+(?:,\s*\d+)*\]/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      const scriptHeader = `CLINIPORTAL - BẢN HƯỚNG DẪN & DẶN DÒ Y KHOA (${contextTitle})\n` +
        `BỆNH LÝ: ${title.toUpperCase()}\n` +
        `Thời gian dặn: ${new Date().toLocaleDateString('vi-VN')}\n` +
        `--------------------------------------------------\n\n`;

      navigator.clipboard.writeText(scriptHeader + cleanBody).then(() => {
        copyScriptBtn.innerHTML = '<i class="fa-solid fa-check" style="color:#10b981;"></i> Đã Chép Lời Dặn!';
        setTimeout(() => {
          copyScriptBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Chép Lời Dặn (Zalo/SMS)</span>';
        }, 2500);
      });
    });
  }
}

/**
 * Format Markdown Tables into clean HTML tables
 */
function formatMarkdownTables(text: string): string {
  const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;
  return text.replace(tableRegex, (match, headerRow, bodyRows) => {
    const headers = headerRow.split('|').filter((c: string) => c.trim().length > 0).map((c: string) => `<th>${c.trim()}</th>`).join('');
    const rows = bodyRows.trim().split('\n').map((row: string) => {
      const cols = row.split('|').filter((c: string) => c.trim().length > 0).map((c: string) => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cols}</tr>`;
    }).join('');

    return `
      <div class="vault-table-wrapper">
        <table class="vault-data-table">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  });
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
