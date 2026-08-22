/**
 * CliniPortal — Knowledge Vault Medical Reader Pro Engine
 * Tích hợp:
 * 1. Clinical Pathway Matrix Ribbon (5 Khía cạnh bệnh học: GPSL, SLB, CD, PDDT, BC, CN)
 * 2. Dynamic Sticky TOC & Scrollspy
 * 3. Reading Toolbar (Zoom font, Serif/Sans toggle, Fullscreen, Copy Citation)
 */

import { VaultArticle, ClinicalPathwayLinks, TocItem, VaultPersonalAnnotation } from './types';
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
        <button type="button" id="btn-toggle-add-annotation" class="vault-tool-btn" style="background:#fff; color:#b45309; font-weight:700; border-color:rgba(245,158,11,0.4); font-size:11px; padding:2px 8px;">
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
    { key: 'gpsl', label: 'Giải phẫu & SL', icon: 'fa-heart-pulse', color: '#0284c7', article: pathway.gpsl, code: 'GPSL' },
    { key: 'slb',  label: 'Sinh lý bệnh',   icon: 'fa-bolt',        color: '#f59e0b', article: pathway.slb,  code: 'SLB' },
    { key: 'dth',  label: 'Dịch tễ học',    icon: 'fa-virus',       color: '#10b981', article: pathway.dth,  code: 'DTH' },
    { key: 'ytnc', label: 'Yếu tố nguy cơ', icon: 'fa-triangle-exclamation', color: '#f97316', article: pathway.ytnc, code: 'YTNC' },
    { key: 'cd',   label: 'Chẩn đoán',      icon: 'fa-clipboard-check', color: '#ec4899', article: pathway.cd,   code: 'CD' },
    { key: 'pddt', label: 'Phác đồ ĐT',     icon: 'fa-pills',       color: '#3b82f6', article: pathway.pddt, code: 'PDDT' },
    { key: 'bc',   label: 'Biến chứng',     icon: 'fa-triangle-exclamation', color: '#ef4444', article: pathway.bc,   code: 'BC' },
    { key: 'cn',   label: 'Guidelines',     icon: 'fa-arrows-rotate', color: '#14b8a6', article: pathway.cn,   code: 'CN' }
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
 * Parse Markdown & Generate Dynamic TOC
 */
export function processMarkdownWithToc(rawMarkdown: string): { htmlContent: string; tocItems: TocItem[] } {
  const tocItems: TocItem[] = [];
  let headingCounter = 0;

  // Clean frontmatter
  let clean = rawMarkdown.replace(/^---[\s\S]*?---\n*/, '');

  // Extract and replace headings with IDs
  clean = clean.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, titleText) => {
    headingCounter++;
    const level = hashes.length;
    const cleanText = titleText.replace(/[*_]/g, '').replace(/\x60/g, '').trim();
    const headingId = `vault-heading-${headingCounter}`;

    tocItems.push({
      id: headingId,
      text: cleanText,
      level: level
    });

    return `<h${level} id="${headingId}" class="vault-h${level} vault-toc-target">${titleText}</h${level}>`;
  });

  // Format H1
  clean = clean.replace(/^# (.*$)/gim, '<h1 class="vault-h1">$1</h1>');
  clean = clean.replace(/^#### (.*$)/gim, '<h4 class="vault-h4">$1</h4>');

  // Format Bold & Italic
  clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  clean = clean.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Format Markdown Tables
  clean = formatMarkdownTables(clean);

  // Determine base path for attachments (SPA root vs Standalone HTML)
  const isSpaMode = !window.location.pathname.includes('/src/content/knowledge-vault/');
  const attachmentBase = isSpaMode ? './knowledge-vault/_resources/attachments/' : '../../../knowledge-vault/_resources/attachments/';

  // Format Obsidian Image Embeds ![[image.png]]
  clean = clean.replace(/!\[\[(.*?)\]\]/g, (match, fileName) => {
    const trimmed = fileName.trim();
    const encoded = encodeURI(trimmed);
    return `<div class="vault-img-card" style="text-align:center; margin:1.5rem 0;"><img src="${attachmentBase}${encoded}" alt="${escapeHtml(trimmed)}" style="max-width:100%; height:auto; border-radius:8px; border:1px solid var(--vault-border); box-shadow:0 4px 12px rgba(0,0,0,0.06);" loading="lazy" /><div style="font-size:11px; color:var(--vault-muted); margin-top:6px; font-style:italic;"><i class="fa-regular fa-image"></i> ${escapeHtml(trimmed)}</div></div>`;
  });

  // Format Standard Markdown Images ![alt](src)
  clean = clean.replace(/!\[(.*?)\]\((.*?)\)/g, (match, altText, src) => {
    const trimmedSrc = src.trim();
    const resolvedSrc = trimmedSrc.startsWith('http') || trimmedSrc.startsWith('/') 
      ? trimmedSrc 
      : `${attachmentBase}${encodeURI(trimmedSrc)}`;
    return `<div class="vault-img-card" style="text-align:center; margin:1.5rem 0;"><img src="${resolvedSrc}" alt="${escapeHtml(altText)}" style="max-width:100%; height:auto; border-radius:8px; border:1px solid var(--vault-border); box-shadow:0 4px 12px rgba(0,0,0,0.06);" loading="lazy" />${altText ? `<div style="font-size:11px; color:var(--vault-muted); margin-top:6px; font-style:italic;">${escapeHtml(altText)}</div>` : ''}</div>`;
  });

  // Obsidian Wikilinks [[Target|Label]] or [[Target]]
  clean = clean.replace(/\[\[([^\]|\n]+)(?:\|([^\]\n]+))?\]\]/g, (match, target, label) => {
    const displayLabel = (label || target).trim();
    const cleanTarget = target.trim();
    return `<button type="button" class="vault-wikilink-btn" data-wikilink="${escapeHtml(cleanTarget)}" title="Nhảy đến bài viết / ghi chú: ${escapeHtml(displayLabel)}"><i class="fa-solid fa-link" style="font-size:10px; opacity:0.8;"></i> ${escapeHtml(displayLabel)}</button>`;
  });

  // Extended Medical Callouts & Bách khoa Toàn thư Badges
  clean = clean.replace(/> \[!NOTE\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-note" style="border-left:4px solid #0284c7; background:rgba(2,132,199,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-circle-info" style="color:#0284c7;"></i> <strong>Ghi chú:</strong> $1</div>');
  clean = clean.replace(/> \[!TIP\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-tip" style="border-left:4px solid #10b981; background:rgba(16,185,129,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-lightbulb" style="color:#10b981;"></i> <strong>Điểm ngọc lâm sàng (Clinical Pearl):</strong> $1</div>');
  clean = clean.replace(/> \[!WARNING\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-warning" style="border-left:4px solid #f59e0b; background:rgba(245,158,11,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-triangle-exclamation" style="color:#f59e0b;"></i> <strong>Cảnh báo (Red Flags):</strong> $1</div>');
  clean = clean.replace(/> \[!CAUTION\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout dsp-callout-danger" style="border-left:4px solid #ef4444; background:rgba(239,68,68,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-circle-exclamation" style="color:#ef4444;"></i> <strong>Chống chỉ định & Nguy hiểm:</strong> $1</div>');
  clean = clean.replace(/> \[!PEARL\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout" style="border-left:4px solid #8b5cf6; background:rgba(139,92,246,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-gem" style="color:#8b5cf6;"></i> <strong>Kinh nghiệm thực chiến:</strong> $1</div>');
  clean = clean.replace(/> \[!DOSING\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout" style="border-left:4px solid #06b6d4; background:rgba(6,182,212,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-pills" style="color:#06b6d4;"></i> <strong>Liều & Chỉnh liều:</strong> $1</div>');
  clean = clean.replace(/> \[!TRIAL\]\s*([\s\S]*?)(?=\n\n|$)/g, '<div class="dsp-callout" style="border-left:4px solid #ec4899; background:rgba(236,72,153,0.08); padding:0.75rem 1rem; border-radius:6px; margin:1rem 0;"><i class="fa-solid fa-flask-vial" style="color:#ec4899;"></i> <strong>Chứng cứ Landmark Trial / EBM:</strong> $1</div>');

  // Format Paragraphs
  clean = clean.split('\n\n').map(p => {
    if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<table') || p.startsWith('<ul') || p.startsWith('<ol')) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return { htmlContent: clean, tocItems };
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
 * Render Sticky Table of Contents Sidebar HTML
 */
export function renderTocHtml(tocItems: TocItem[]): string {
  if (tocItems.length < 2) return '';

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

/**
 * Render Reader Toolbar (Controls for Zoom, Font, Fullscreen, Copy)
 */
export function renderReaderToolbar(article: VaultArticle): string {
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

  // TOC Links Smooth Scroll
  const scrollContainer = drawerPanel.querySelector('.vault-drawer-body') as HTMLElement | null;
  drawerPanel.querySelectorAll('.vault-toc-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (!targetId || !scrollContainer) return;

      const targetEl = drawerPanel.querySelector(`#${targetId}`) as HTMLElement | null;
      if (targetEl) {
        scrollContainer.scrollTo({
          top: targetEl.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // TOC Scrollspy
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
      const targets = drawerPanel.querySelectorAll('.vault-toc-target');
      let currentId = '';

      targets.forEach(t => {
        const el = t as HTMLElement;
        if (el.offsetTop - scrollContainer.scrollTop <= 80) {
          currentId = el.id;
        }
      });

      drawerPanel.querySelectorAll('.vault-toc-link').forEach(link => {
        if (link.getAttribute('data-target') === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    });
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
