/**
 * CliniPortal — Guidelines & Clinical Evidence Article Reader SPA View (TypeScript)
 * Path: src/content/ebm/guidelines/guideline-reader-view.ts
 * 
 * Flagship Full-Width Clinical Guideline Reader:
 * - Ultra-wide 100% expanded layout for high-density clinical review
 * - Dynamic font sizing (A- / A+) and Width mode switcher (Ultra-Wide / Standard / Fullscreen)
 * - Automatic script hydration for interactive calculators (PTS, Pain Scales, 18 Organ Systems)
 * - Standardized EBM SOAP Note clipboard exporter & clean medical PDF printing
 */

export function renderGuidelineReader(slug: string): string {
  // Normalize slug
  const cleanSlug = slug.endsWith('.html') ? slug : `${slug}.html`;
  const baseSlugName = cleanSlug.replace(/\.html$/i, '');

  // Retrieve saved preferences from localStorage
  const savedWidthMode = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_width') || 'wide') : 'wide';
  const savedFontSize = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_font_size') || '16') : '16';

  // Trigger async fetch after container mounts to DOM
  setTimeout(() => {
    fetchAndHydrateGuideline(cleanSlug, baseSlugName);
  }, 30);

  return `
    <div class="guideline-reader-wrapper animate-fade-in ${savedWidthMode === 'wide' ? 'reader-mode-wide' : 'reader-mode-standard'}" id="guideline-reader-wrapper" style="min-height: calc(100vh - 60px); background: var(--color-bg, #f0f4f8); padding-bottom: 3.5rem; transition: all 0.25s ease;">
      
      <!-- TOP CONTROL & BREADCRUMB PRO TOOLBAR -->
      <header class="guideline-reader-toolbar" style="position: sticky; top: 0; z-index: 185; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--color-border, #e2e8f0); padding: 0.65rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
        
        <!-- Breadcrumb & Document Info -->
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-muted, #64748b); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 240px;">
          <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-book-medical"></i> Y học Chứng cứ
          </a>
          <span>/</span>
          <a href="#/ebm/kho-guidelines" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700;">
            Kho Guidelines
          </a>
          <span>/</span>
          <span style="color: var(--color-text, #0f172a); font-weight: 800;" id="reader-breadcrumb-title">${baseSlugName}</span>
        </div>

        <!-- Pro Reader Controls (Width, Font size, Fullscreen, EBM Note, Print) -->
        <div class="reader-toolbar-actions" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          
          <!-- Font Size Scaler -->
          <div class="reader-btn-group" style="display: inline-flex; align-items: center; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; overflow: hidden;">
            <button class="reader-icon-btn" onclick="adjustReaderFontSize(-1)" title="Giảm cỡ chữ (A-)" style="padding: 0.35rem 0.6rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.78rem; font-weight: 800; cursor: pointer; border-right: 1px solid var(--color-border, #cbd5e1);">
              A-
            </button>
            <span id="reader-font-size-display" style="padding: 0 0.5rem; font-size: 0.75rem; font-weight: 700; font-family: monospace; color: var(--color-primary, #0284c7);">
              ${savedFontSize}px
            </span>
            <button class="reader-icon-btn" onclick="adjustReaderFontSize(1)" title="Tăng cỡ chữ (A+)" style="padding: 0.35rem 0.6rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.78rem; font-weight: 800; cursor: pointer; border-left: 1px solid var(--color-border, #cbd5e1);">
              A+
            </button>
          </div>

          <!-- Ultra-Wide / Standard View Toggle -->
          <button class="btn btn-outline" id="btn-toggle-wide-mode" onclick="toggleReaderWidthMode()" title="Chuyển đổi giao diện Mở Rộng Toàn Màn Hình / Khung Chuẩn" style="padding: 0.35rem 0.75rem; border-radius: 8px; border: 1.5px solid var(--color-primary, #0284c7); font-size: 0.78rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; background: rgba(2,132,199,0.08); color: var(--color-primary, #0284c7);">
            <i class="fa-solid fa-up-right-and-down-left-from-center" id="wide-mode-icon"></i> 
            <span id="wide-mode-text">${savedWidthMode === 'wide' ? 'Khung Chuẩn' : 'Mở Rộng Tối Đa'}</span>
          </button>

          <!-- Fullscreen Mode -->
          <button class="btn btn-outline" onclick="toggleBrowserFullscreen()" title="Toàn màn hình (F11 / Zen Mode)" style="padding: 0.35rem 0.7rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; background: var(--color-surface, #fff); color: var(--color-text, #334155);">
            <i class="fa-solid fa-expand"></i> <span>Fullscreen</span>
          </button>

          <!-- Copy EBM Note -->
          <button class="btn btn-outline" id="btn-copy-ebm-note" onclick="copyGuidelineSoapNote()" title="Sao chép tóm tắt EBM dán vào Bệnh án điện tử (EMR)" style="padding: 0.35rem 0.75rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; background: var(--color-surface, #fff); color: var(--color-text, #334155);">
            <i class="fa-solid fa-clipboard-list" style="color: var(--color-primary, #0284c7);"></i> <span>Copy EBM Note</span>
          </button>

          <!-- Print / PDF -->
          <button class="btn btn-outline" onclick="window.print()" title="In hoặc lưu PDF tài liệu" style="padding: 0.35rem 0.7rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.78rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; background: var(--color-surface, #fff); color: var(--color-text, #334155);">
            <i class="fa-solid fa-print"></i> <span>In / PDF</span>
          </button>

          <!-- Back to Kho Button -->
          <a href="#/ebm/kho-guidelines" class="btn btn-primary" style="padding: 0.35rem 0.9rem; border-radius: 8px; font-size: 0.78rem; font-weight: 800; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: var(--color-primary, #0284c7); color: #ffffff; box-shadow: 0 2px 6px rgba(2,132,199,0.25);">
            <i class="fa-solid fa-arrow-left"></i> <span>Kho Guidelines</span>
          </a>
        </div>
      </header>

      <!-- MAIN ARTICLE MOUNT CONTAINER -->
      <main id="guideline-article-mount" style="min-height: 550px; font-size: ${savedFontSize}px;">
        <div style="text-align: center; padding: 6rem 1rem; color: var(--color-text-muted, #64748b);">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2.8rem; color: var(--color-primary, #0284c7); margin-bottom: 1.25rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;">Đang Nạp & Mở Rộng Hướng Dẫn Lâm Sàng...</h3>
          <p style="font-size: 0.88rem; max-width: 520px; margin: 0 auto;">Đang tối ưu hóa giao diện toàn màn hình, khuyến cáo và công cụ tính toán tương tác.</p>
        </div>
      </main>

    </div>
  `;
}

/**
 * Fetch, parse, and inject guideline content with Ultra-Wide CSS rules
 */
async function fetchAndHydrateGuideline(cleanSlug: string, baseSlugName: string): Promise<void> {
  const mountEl = document.getElementById('guideline-article-mount');
  if (!mountEl) return;

  const candidatePaths = [
    `/src/content/ebm/guidelines/kho-guidelines/${cleanSlug}`,
    `src/content/ebm/guidelines/kho-guidelines/${cleanSlug}`,
    `./src/content/ebm/guidelines/kho-guidelines/${cleanSlug}`,
    `../src/content/ebm/guidelines/kho-guidelines/${cleanSlug}`,
    `/dist/src/content/ebm/guidelines/kho-guidelines/${cleanSlug}`,
    `dist/src/content/ebm/guidelines/kho-guidelines/${cleanSlug}`,
    `kho-guidelines/${cleanSlug}`,
    `/kho-guidelines/${cleanSlug}`
  ];

  let htmlText = '';

  for (const path of candidatePaths) {
    try {
      const resp = await fetch(path);
      if (resp.ok) {
        htmlText = await resp.text();
        break;
      }
    } catch {
      // Continue searching
    }
  }

  if (!htmlText) {
    mountEl.innerHTML = `
      <div style="max-width: 680px; margin: 4rem auto; text-align: center; padding: 3rem 2rem; background: var(--color-surface, #fff); border-radius: 16px; border: 1px solid #fca5a5; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3.2rem; color: #dc2626; margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #991b1b; margin-bottom: 0.75rem;">Không tìm thấy bản tóm tắt Guideline</h3>
        <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Không thể tải tệp <code>${cleanSlug}</code>. Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh sách Kho Guidelines.
        </p>
        <a href="#/ebm/kho-guidelines" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 0.65rem 1.35rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 8px; text-decoration: none; font-weight: 800;">
          <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Guidelines
        </a>
      </div>
    `;
    return;
  }

  // Parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // Extract Page Title
  const docTitle = doc.querySelector('title')?.textContent || doc.querySelector('.hero-title')?.textContent || baseSlugName;
  const cleanTitle = docTitle.replace(/– CliniPortal.*$/i, '').trim();
  const crumbEl = document.getElementById('reader-breadcrumb-title');
  if (crumbEl) crumbEl.textContent = cleanTitle;
  document.title = `${cleanTitle} – CliniPortal`;

  // Extract Styles
  const styles = doc.querySelectorAll('style');
  let inlineStyles = '';
  styles.forEach(s => {
    inlineStyles += s.textContent || '';
  });

  // Extract Structural Elements
  const heroEl = doc.querySelector('.hero');
  const quicknavEl = doc.querySelector('.quicknav, .pillars-nav');
  const pillarsEl = doc.querySelector('.pillars');
  const pageContentEl = doc.querySelector('.page-content, .main-container, main, body');

  // Build Injected HTML with Expanded Full-Width Layout Rules
  mountEl.innerHTML = `
    <style id="guideline-expanded-reader-styles">
      ${inlineStyles}

      /* ═══════════════════════════════════════════════════════════
         FULL-WIDTH ULTRA-CLEAR READER STYLES OVERRIDES
         ═══════════════════════════════════════════════════════════ */
      .guideline-reader-wrapper .topnav { display: none !important; }
      
      /* Wide Mode: Expand Containers to 1540px / 96% */
      .guideline-reader-wrapper.reader-mode-wide .hero-inner,
      .guideline-reader-wrapper.reader-mode-wide .pillars-inner,
      .guideline-reader-wrapper.reader-mode-wide .quicknav,
      .guideline-reader-wrapper.reader-mode-wide .pillars-nav-inner,
      .guideline-reader-wrapper.reader-mode-wide .page-content,
      .guideline-reader-wrapper.reader-mode-wide .main-container {
        max-width: min(1560px, 96%) !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      /* Standard Mode: Centered 1100px */
      .guideline-reader-wrapper.reader-mode-standard .hero-inner,
      .guideline-reader-wrapper.reader-mode-standard .pillars-inner,
      .guideline-reader-wrapper.reader-mode-standard .page-content {
        max-width: 1080px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      /* Enhanced Visual Polish for Reading Clarity */
      .guideline-injected-article .hero {
        padding: 3.5rem 2rem 4.5rem;
      }
      .guideline-injected-article .hero-title {
        font-size: clamp(2rem, 4.5vw, 3.2rem) !important;
        line-height: 1.2 !important;
      }
      .guideline-injected-article .hero-subtitle {
        font-size: 1.05rem !important;
        max-width: 1100px !important;
        line-height: 1.7 !important;
      }
      .guideline-injected-article .quicknav,
      .guideline-injected-article .pillars-nav {
        top: 54px !important;
        background: var(--color-surface, #ffffff);
        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      }
      .guideline-injected-article .sec-card {
        margin-bottom: 2rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        border: 1px solid var(--color-border, #cbd5e1);
      }
      .guideline-injected-article .sec-hdr {
        padding: 1.25rem 1.75rem;
      }
      .guideline-injected-article .sec-title {
        font-size: 1.2rem !important;
      }
      .guideline-injected-article .sec-body {
        padding: 1.75rem;
        font-size: 0.95rem;
        line-height: 1.75;
      }
      .guideline-injected-article .matrix-grid {
        grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr)) !important;
        gap: 1.25rem !important;
      }
      .guideline-injected-article .data-table th,
      .guideline-injected-article .data-table td {
        padding: 0.95rem 1.15rem !important;
        font-size: 0.92rem !important;
      }
      .guideline-injected-article .infobox {
        padding: 1.2rem 1.5rem !important;
        font-size: 0.92rem !important;
      }
      .guideline-injected-article .calc-container {
        padding: 1.75rem !important;
      }
      .guideline-injected-article .sys-card-header {
        padding: 1.15rem 1.5rem !important;
      }

      /* Dark Mode High Contrast Enhancements */
      [data-theme="dark"] .guideline-reader-toolbar {
        background: rgba(15, 23, 42, 0.96) !important;
        border-color: #334155 !important;
      }
      [data-theme="dark"] .guideline-injected-article .sec-card {
        background: #1e293b !important;
        border-color: #334155 !important;
      }
    </style>

    <div class="guideline-injected-article" id="guideline-injected-article">
      ${heroEl ? heroEl.outerHTML : ''}
      ${quicknavEl ? quicknavEl.outerHTML : ''}
      ${pillarsEl ? pillarsEl.outerHTML : ''}
      ${pageContentEl ? pageContentEl.outerHTML : htmlText}
    </div>
  `;

  // Hydrate Scripts (Interactive tools: PTS, Pain, Systems, Accordions, Search)
  hydrateGuidelineScripts(doc, mountEl);
}

/**
 * Execute embedded script logic to revive calculators & interactive features
 */
function hydrateGuidelineScripts(doc: Document, mountEl: HTMLElement): void {
  const scripts = doc.querySelectorAll('script');
  scripts.forEach(script => {
    const code = script.textContent || '';
    if (!script.src && code.trim()) {
      try {
        const runScript = new Function(code);
        runScript();
      } catch (err) {
        console.debug('Guideline script hydration note:', err);
      }
    }
  });

  // Ensure QuickNav smooth scrolling works inside SPA
  mountEl.querySelectorAll('.quicknav-link, .pillar-tab').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#sec-')) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/**
 * Toggle Reader Width Mode between Ultra-Wide (1560px/96%) and Standard (1080px)
 */
export function toggleReaderWidthMode(): void {
  const wrapper = document.getElementById('guideline-reader-wrapper');
  const textEl = document.getElementById('wide-mode-text');
  if (!wrapper) return;

  const isCurrentlyWide = wrapper.classList.contains('reader-mode-wide');
  if (isCurrentlyWide) {
    wrapper.classList.remove('reader-mode-wide');
    wrapper.classList.add('reader-mode-standard');
    if (textEl) textEl.textContent = 'Mở Rộng Tối Đa';
    localStorage.setItem('cp_reader_width', 'standard');
  } else {
    wrapper.classList.remove('reader-mode-standard');
    wrapper.classList.add('reader-mode-wide');
    if (textEl) textEl.textContent = 'Khung Chuẩn';
    localStorage.setItem('cp_reader_width', 'wide');
  }
}

/**
 * Adjust font size for clear reading
 */
export function adjustReaderFontSize(delta: number): void {
  const mountEl = document.getElementById('guideline-article-mount');
  const displayEl = document.getElementById('reader-font-size-display');
  if (!mountEl) return;

  const currentSize = parseInt(mountEl.style.fontSize || '16', 10);
  const newSize = Math.max(13, Math.min(22, currentSize + delta));
  
  mountEl.style.fontSize = `${newSize}px`;
  if (displayEl) displayEl.textContent = `${newSize}px`;
  localStorage.setItem('cp_reader_font_size', String(newSize));
}

/**
 * Toggle native browser Fullscreen (Zen Reading Mode)
 */
export function toggleBrowserFullscreen(): void {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

/**
 * Copy a standardized EBM clinical note into user's clipboard
 */
export function copyGuidelineSoapNote(): void {
  const title = document.getElementById('reader-breadcrumb-title')?.textContent || 'Guideline Khuyến Cáo';
  const url = window.location.href;
  
  const recElements = document.querySelectorAll('.sec-card .criteria-item, .ebm-rec-card, .infobox');
  let points: string[] = [];
  recElements.forEach((el, idx) => {
    if (idx < 8) {
      const text = el.textContent?.replace(/\s+/g, ' ').trim();
      if (text) points.push(`- ${text}`);
    }
  });

  const note = `[EBM CLINICAL NOTE — CLINIPORTAL]
📌 TÀI LIỆU: ${title}
🔗 NGUỒN: ${url}
⏱️ TRÍCH XUẤT: ${new Date().toLocaleDateString('vi-VN')}

📋 CÁC TIÊU CHUẨN & KHUYẾN CÁO THEN CHỐT:
${points.join('\n')}

⚠️ LƯU Ý: Khuyến cáo hỗ trợ ra quyết định lâm sàng (CDSS), bác sĩ cá thể hóa trên từng ca bệnh.`;

  navigator.clipboard.writeText(note).then(() => {
    const btn = document.getElementById('btn-copy-ebm-note');
    if (btn) {
      const origHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check" style="color:#16a34a;"></i> <span>Đã sao chép!</span>';
      setTimeout(() => {
        btn.innerHTML = origHtml;
      }, 2500);
    }
  }).catch(() => {
    alert('Đã tạo bản ghi EBM Note!');
  });
}

// Expose actions to window for direct event handler execution
if (typeof window !== 'undefined') {
  const win = window as any;
  win.toggleReaderWidthMode = toggleReaderWidthMode;
  win.adjustReaderFontSize = adjustReaderFontSize;
  win.toggleBrowserFullscreen = toggleBrowserFullscreen;
  win.copyGuidelineSoapNote = copyGuidelineSoapNote;
}
