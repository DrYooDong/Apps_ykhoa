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

import { CliniPortalThemeManager } from '../../../main';
import { cliniMdxEngine } from '../../../core/mdx-engine';

export function renderGuidelineReader(slug: string): string {
  // Normalize slug & base name cleanly
  const baseSlugName = slug.replace(/\.(html|mdx)$/i, '');
  const cleanSlug = `${baseSlugName}.mdx`;

  // Retrieve saved preferences from localStorage
  const savedWidthMode = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_width') || 'wide') : 'wide';
  const savedFontSize = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_font_size') || '16') : '16';

  // Trigger async fetch after container mounts to DOM
  setTimeout(() => {
    fetchAndHydrateGuideline(cleanSlug, baseSlugName);
  }, 30);

  return `
    <div class="guideline-reader-wrapper animate-fade-in ${savedWidthMode === 'wide' ? 'reader-mode-wide' : 'reader-mode-standard'}" id="guideline-reader-wrapper" style="min-height: calc(100vh - 60px); background: var(--color-bg, #f0f4f8); padding: 1rem 1.25rem 3.5rem 1.25rem; transition: all 0.25s ease;">
      
      <!-- TOP CONTROL & BREADCRUMB PRO TOOLBAR (KHÔNG ĐÓNG BĂNG KHI CUỘN) -->
      <header class="guideline-reader-toolbar" style="position: relative; z-index: 10; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--color-border, #e2e8f0); padding: 0.65rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; box-shadow: 0 2px 10px rgba(0,0,0,0.04); margin-bottom: 1.25rem; border-radius: 12px;">
        
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

        <!-- Pro Reader Settings Dropdown (Dark Mode, Font size, Width, Fullscreen, EBM Note, Print) -->
        <div class="reader-toolbar-actions" style="display: flex; align-items: center; gap: 0.5rem; position: relative;">
          
          <div class="reader-settings-dropdown-wrapper" id="reader-settings-dropdown-wrapper" style="position: relative;">
            <button class="btn btn-outline reader-settings-btn" id="reader-settings-toggle-btn" onclick="toggleReaderSettingsMenu(event)" aria-expanded="false" title="Cài đặt & Tiện ích đọc" style="padding: 0.45rem 0.95rem; border-radius: 8px; border: 1.5px solid var(--color-primary, #0284c7); font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; background: rgba(2,132,199,0.08); color: var(--color-primary, #0284c7); box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: all 0.2s ease;">
              <i class="fa-solid fa-gear" style="font-size: 0.95rem;"></i>
              <span>Cài đặt</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.68rem; opacity: 0.7;"></i>
            </button>

            <!-- Dropdown Menu -->
            <div class="reader-settings-menu" id="reader-settings-menu" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); z-index: 220; min-width: 290px; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 14px; box-shadow: 0 12px 36px rgba(0,0,0,0.15); padding: 0.65rem; backdrop-filter: blur(12px);">
              
              <div style="padding: 0.4rem 0.6rem 0.5rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted, #64748b); border-bottom: 1px solid var(--color-border, #e2e8f0); margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: space-between;">
                <span>⚙️ Tùy chọn bài đọc</span>
                <span style="font-size: 0.7rem; font-weight: 600; opacity: 0.75;">CliniPortal</span>
              </div>

              <!-- 1. Dark Mode Toggle -->
              <button class="reader-menu-item" onclick="toggleReaderTheme(event)" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-moon" id="reader-menu-theme-icon" style="width: 18px; color: #8b5cf6; font-size: 0.95rem;"></i>
                  <span id="reader-menu-theme-text">Chế độ Tối</span>
                </span>
                <span class="rx-tag" id="reader-menu-theme-tag" style="font-size: 0.7rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">Theme</span>
              </button>

              <!-- 2. Font Size Adjustment -->
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-font" style="width: 18px; color: var(--color-primary, #0284c7); font-size: 0.95rem;"></i>
                  <span>Cỡ chữ đọc</span>
                </span>
                <div class="reader-btn-group" style="display: inline-flex; align-items: center; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; overflow: hidden;">
                  <button class="reader-icon-btn" onclick="adjustReaderFontSize(-1); event.stopPropagation();" title="Giảm cỡ chữ (A-)" style="padding: 0.28rem 0.55rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.75rem; font-weight: 800; cursor: pointer; border-right: 1px solid var(--color-border, #cbd5e1);">
                    A-
                  </button>
                  <span id="reader-font-size-display" style="padding: 0 0.5rem; font-size: 0.74rem; font-weight: 700; font-family: monospace; color: var(--color-primary, #0284c7);">
                    ${savedFontSize}px
                  </span>
                  <button class="reader-icon-btn" onclick="adjustReaderFontSize(1); event.stopPropagation();" title="Tăng cỡ chữ (A+)" style="padding: 0.28rem 0.55rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.75rem; font-weight: 800; cursor: pointer; border-left: 1px solid var(--color-border, #cbd5e1);">
                    A+
                  </button>
                </div>
              </div>

              <!-- 3. Width Mode Toggle -->
              <button class="reader-menu-item" onclick="toggleReaderWidthMode(); closeReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-up-right-and-down-left-from-center" style="width: 18px; color: #059669; font-size: 0.95rem;"></i>
                  <span id="reader-menu-width-text">${savedWidthMode === 'wide' ? 'Khung Chuẩn (1080px)' : 'Mở Rộng Tối Đa (Ultra-Wide)'}</span>
                </span>
              </button>

              <!-- 4. Fullscreen Mode -->
              <button class="reader-menu-item" onclick="toggleBrowserFullscreen(); closeReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-expand" style="width: 18px; color: #d97706; font-size: 0.95rem;"></i>
                  <span>Toàn màn hình (F11 / Zen)</span>
                </span>
              </button>

              <div style="height: 1px; background: var(--color-border, #e2e8f0); margin: 0.35rem 0;"></div>

              <!-- 5. Create SOAP in DocSpace -->
              <button class="reader-menu-item" id="btn-create-soap-from-guideline" onclick="createSoapFromCurrentGuideline(); closeReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: #0284c7; font-weight: 700; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-notes-medical" style="width: 18px; color: #0284c7; font-size: 0.95rem;"></i>
                  <span>Tạo Bệnh án SOAP từ bài này</span>
                </span>
                <span class="rx-tag" style="font-size: 0.7rem; padding: 2px 7px; border-radius: 6px; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7;">DocSpace</span>
              </button>

              <!-- 6. View Pathophysiology Mechanism -->
              <button class="reader-menu-item" id="btn-view-guideline-pathophysiology" onclick="openPathophysiologyForCurrentGuideline(); closeReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: #7c3aed; font-weight: 700; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-microscope" style="width: 18px; color: #7c3aed; font-size: 0.95rem;"></i>
                  <span>Xem Cơ Chế Bệnh Sinh &amp; Sinh Lý Bệnh</span>
                </span>
                <span class="rx-tag" style="font-size: 0.7rem; padding: 2px 7px; border-radius: 6px; font-weight: 700; background: rgba(139,92,246,0.1); color: #7c3aed;">Cơ Sở</span>
              </button>

              <!-- 7. Copy EBM Note -->
              <button class="reader-menu-item" id="btn-copy-ebm-note" onclick="copyGuidelineSoapNote();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-clipboard-list" style="width: 18px; color: var(--color-primary, #0284c7); font-size: 0.95rem;"></i>
                  <span>Sao chép EBM Note (EMR)</span>
                </span>
              </button>

              <!-- 8. Print / PDF -->
              <button class="reader-menu-item" onclick="window.print(); closeReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-print" style="width: 18px; color: #64748b; font-size: 0.95rem;"></i>
                  <span>In / Lưu PDF tài liệu</span>
                </span>
              </button>
            </div>
          </div>

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
    `/src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.html`,
    `src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.html`,
    `./src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.html`,
    `../src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.html`,
    `/dist/src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.html`,
    `dist/src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.html`,
    `kho-guidelines/${baseSlugName}.html`,
    `/kho-guidelines/${baseSlugName}.html`,
    `/src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.mdx`,
    `src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.mdx`,
    `./src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.mdx`,
    `../src/content/ebm/guidelines/kho-guidelines/${baseSlugName}.mdx`,
    `kho-guidelines/${baseSlugName}.mdx`,
    `/kho-guidelines/${baseSlugName}.mdx`
  ];

  let htmlText = '';
  let isMdx = false;

  for (const path of candidatePaths) {
    try {
      const isMdxPath = path.includes('.mdx') || path.includes('.md');
      const fetchUrl = isMdxPath && !path.includes('?raw') ? `${path}?raw` : path;
      let resp = await fetch(fetchUrl);
      if (!resp.ok && fetchUrl !== path) {
        resp = await fetch(path);
      }
      if (resp.ok) {
        htmlText = await resp.text();
        if (isMdxPath) {
          isMdx = true;
        }
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
          Không thể tải tệp <code>${baseSlugName}.mdx</code>. Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh sách Kho Guidelines.
        </p>
        <a href="#/ebm/kho-guidelines" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 0.65rem 1.35rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 8px; text-decoration: none; font-weight: 800;">
          <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Guidelines
        </a>
      </div>
    `;
    return;
  }

  // Handle Native MDX Rendering for Guidelines
  if (isMdx) {
    const parsed = cliniMdxEngine.parse(htmlText);
    const cleanTitle = parsed.title;
    const crumbEl = document.getElementById('reader-breadcrumb-title');
    if (crumbEl) crumbEl.textContent = cleanTitle;
    document.title = `${cleanTitle} – CliniPortal`;

    const frontmatter = parsed.frontmatter || {};
    const org = frontmatter.organization || 'EBM Taskforce';
    const year = frontmatter.year || '2026';
    const cor = frontmatter.cor || '';
    const loe = frontmatter.loe || '';

    // Ensure guidelines-article.css is loaded in DOM
    if (!document.querySelector('link[href*="guidelines-article.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = './src/styles/components/guidelines-article.css';
      document.head.appendChild(link);
    }

    mountEl.innerHTML = `
      <div class="reading-progress-bar" id="reading-progress-bar"></div>
      <div class="guideline-article-container" style="max-width: 1280px; margin: 0 auto; padding: 1.5rem 1.25rem;">
        
        <!-- LUXURY EBM HERO BANNER -->
        <div style="margin-bottom: 2rem; background: linear-gradient(135deg, #78350f 0%, #0f172a 50%, #92400e 100%); color: #ffffff; padding: 2.5rem 2rem; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2); position: relative; overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
            <span class="badge" style="background: rgba(251, 191, 36, 0.18); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.35); font-weight: 700; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: 999px; text-transform: uppercase;">
              <i class="fa-solid fa-scale-balanced"></i> GUIDELINE EBM • ${org} (${year})
            </span>
            <div style="display: flex; gap: 0.4rem;">
              ${cor ? `<span style="font-size: 0.75rem; background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); color: #34d399; padding: 0.2rem 0.55rem; border-radius: 6px; font-weight: 800;">COR ${cor}</span>` : ''}
              ${loe ? `<span style="font-size: 0.75rem; background: rgba(2,132,199,0.2); border: 1px solid rgba(2,132,199,0.4); color: #38bdf8; padding: 0.2rem 0.55rem; border-radius: 6px; font-weight: 800;">LOE ${loe}</span>` : ''}
            </div>
          </div>
          
          <h1 style="font-size: 2.1rem; font-weight: 800; color: #ffffff; margin: 0.5rem 0; line-height: 1.25;">
            ${parsed.title}
          </h1>
          
          <p style="margin: 0.5rem 0 1rem 0; font-size: 0.98rem; opacity: 0.92; line-height: 1.65; max-width: 960px;">
            ${parsed.description || ''}
          </p>
        </div>

        <!-- RENDERED CONTENT -->
        <div class="mdx-rendered-article">
          ${parsed.html}
        </div>
      </div>
    `;

    // Hydrate MDX Interactive CDSS Calculators & Smooth Anchors
    hydrateMdxInteractiveTools(mountEl);
    return;
  }

  // Parse HTML (Legacy Support)
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

  // Remove legacy placeholders, duplicate headers, and external stylesheet links
  doc.querySelectorAll('#header-placeholder, #footer-placeholder, .topnav, link[rel="stylesheet"]').forEach(el => el.remove());

  // Rewrite image sources to valid paths in SPA
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (!src) return;

    let targetSrc = src;
    if (src.includes('images/')) {
      const cleanImg = src.replace(/^(\.\/|\.\.\/)*images\//i, '');
      targetSrc = `/src/content/ebm/guidelines/kho-guidelines/images/${cleanImg}`;
    } else if (src.startsWith('./') || (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:'))) {
      const cleanImg = src.replace(/^\.\//, '');
      targetSrc = `/src/content/ebm/guidelines/kho-guidelines/${cleanImg}`;
    }

    img.setAttribute('src', targetSrc);

    // Add robust fallback handler for different server environments (dist/root/local)
    const rawFileName = (src || '').split('/').pop() || '';
    img.setAttribute(
      'onerror',
      `if(!this.dataset.tried){this.dataset.tried='1';this.src='./src/content/ebm/guidelines/kho-guidelines/images/${rawFileName}';}else if(this.dataset.tried==='1'){this.dataset.tried='2';this.src='src/content/ebm/guidelines/kho-guidelines/images/${rawFileName}';}else if(this.dataset.tried==='2'){this.dataset.tried='3';this.src='../src/content/ebm/guidelines/kho-guidelines/images/${rawFileName}';}else if(this.dataset.tried==='3'){this.dataset.tried='4';this.src='./images/${rawFileName}';}`
    );
  });

  // Wrap all table elements with responsive scrolling wrappers to prevent mobile overflow
  doc.querySelectorAll('table').forEach(tbl => {
    const parent = tbl.parentElement;
    if (!parent?.classList.contains('table-responsive') && !parent?.classList.contains('table-container') && !parent?.classList.contains('hemo-table-wrap')) {
      const wrap = doc.createElement('div');
      wrap.className = 'table-responsive';
      tbl.parentNode?.insertBefore(wrap, tbl);
      wrap.appendChild(tbl);
    }
  });

  // Extract clean article body content
  const articleHtml = doc.body ? doc.body.innerHTML : htmlText;

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

      /* Responsive Tables */
      .guideline-injected-article .table-responsive {
        width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        margin: 1.25rem 0 !important;
        border-radius: 10px !important;
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
        position: sticky !important;
        top: 80px !important;
        z-index: 150 !important;
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

      /* Mobile Overrides (<= 768px) */
      @media (max-width: 768px) {
        .guideline-reader-wrapper {
          padding-top: 64px !important;
          padding-bottom: 2.5rem !important;
        }

        .guideline-reader-toolbar {
          padding: 0.6rem 0.85rem !important;
          border-radius: 10px !important;
          margin-bottom: 1rem !important;
        }

        .reader-settings-menu {
          max-width: calc(100vw - 24px) !important;
          min-width: 0 !important;
          right: 0 !important;
        }

        .guideline-injected-article .quicknav,
        .guideline-injected-article .pillars-nav {
          top: 56px !important;
          padding: 0.45rem 0.65rem !important;
          border-radius: 10px !important;
        }

        .guideline-injected-article .hero {
          padding: 2.5rem 1.25rem 3rem !important;
          border-radius: 16px !important;
        }

        .guideline-injected-article .sec-hdr {
          padding: 1rem 1.25rem !important;
        }

        .guideline-injected-article .sec-body {
          padding: 1.25rem 1rem !important;
          font-size: 0.9rem !important;
        }

        .guideline-injected-article .matrix-grid,
        .guideline-injected-article .grid-2,
        .guideline-injected-article .grid-3,
        .guideline-injected-article .grid-2col,
        .guideline-injected-article .grid-3col,
        .guideline-injected-article .updates-grid,
        .guideline-injected-article .card-grid,
        .guideline-injected-article .figo-grid,
        .guideline-injected-article .flow-branches,
        .guideline-injected-article .doppler-grid {
          grid-template-columns: 1fr !important;
          gap: 0.85rem !important;
        }

        .guideline-injected-article .data-table th,
        .guideline-injected-article .data-table td {
          padding: 0.6rem 0.75rem !important;
          font-size: 0.825rem !important;
        }
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
      ${articleHtml}
    </div>
  `;

  // Hydrate Scripts (Interactive tools: PTS, Pain, Systems, Accordions, Search)
  hydrateGuidelineScripts(doc, mountEl);
}

function hydrateGuidelineScripts(doc: Document, mountEl: HTMLElement): void {
  // 1. Direct Accordion Support for Guideline System Cards & Sections
  mountEl.querySelectorAll('.sys-card-header, .accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.sys-card, .accordion-item');
      if (card) {
        card.classList.toggle('open');
      }
    });
  });

  // 2. Direct Filter Tabs Support
  const filterBtns = mountEl.querySelectorAll('.sys-filter-btn');
  const sysCards = mountEl.querySelectorAll('.sys-card');
  if (filterBtns.length > 0 && sysCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        sysCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            (card as HTMLElement).style.display = 'block';
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        });
      });
    });
  }

  // 3. Direct Search Bar Support
  const searchInput = mountEl.querySelector('#sysSearchInput') as HTMLInputElement | null;
  if (searchInput && sysCards.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
      sysCards.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        if (!q || text.includes(q)) {
          (card as HTMLElement).style.display = 'block';
          if (q) card.classList.add('open');
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      });
    });
  }

  // 4. Safely Execute Embedded Script Logic
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

  // 5. Ensure In-Page Anchors & QuickNav Smooth Scrolling without breaking SPA Router
  mountEl.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1 && !href.startsWith('#/')) {
        e.preventDefault();
        e.stopPropagation();
        const targetId = href.replace(/^#/, '');
        const targetEl = document.getElementById(targetId) || mountEl.querySelector(href);
        if (targetEl) {
          mountEl.querySelectorAll('.quicknav-link, .quickmenu-item, .pillar-tab, .toc-item').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
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

/**
 * Toggle Reader Settings Dropdown Menu
 */
export function toggleReaderSettingsMenu(event?: Event): void {
  if (event) event.stopPropagation();
  const menu = document.getElementById('reader-settings-menu');
  const btn = document.getElementById('reader-settings-toggle-btn');
  if (!menu) return;

  const isVisible = menu.style.display === 'block';
  if (isVisible) {
    closeReaderSettingsMenu();
  } else {
    syncReaderThemeUI();
    menu.style.display = 'block';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Close Reader Settings Dropdown Menu
 */
export function closeReaderSettingsMenu(): void {
  const menu = document.getElementById('reader-settings-menu');
  const btn = document.getElementById('reader-settings-toggle-btn');
  if (menu) menu.style.display = 'none';
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

/**
 * Toggle Theme directly from Reader Settings Dropdown
 */
export function toggleReaderTheme(event?: Event): void {
  if (event) event.stopPropagation();
  CliniPortalThemeManager.toggleTheme();
  syncReaderThemeUI();
}

/**
 * Synchronize Reader Theme text and icon with current data-theme state
 */
export function syncReaderThemeUI(): void {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = document.getElementById('reader-menu-theme-icon');
  const text = document.getElementById('reader-menu-theme-text');
  const tag = document.getElementById('reader-menu-theme-tag');

  if (currentTheme === 'dark') {
    if (icon) {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#f59e0b';
    }
    if (text) text.textContent = 'Chế độ Sáng (Light)';
    if (tag) {
      tag.textContent = 'Dark On';
      tag.style.background = 'rgba(245, 158, 11, 0.15)';
      tag.style.color = '#f59e0b';
    }
  } else {
    if (icon) {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '#8b5cf6';
    }
    if (text) text.textContent = 'Chế độ Tối (Dark)';
    if (tag) {
      tag.textContent = 'Light On';
      tag.style.background = 'rgba(139, 92, 246, 0.12)';
      tag.style.color = '#8b5cf6';
    }
  }
}

/**
 * Chuyển tiếp nhanh sang DocSpace SOAP và tự động khởi tạo ca bệnh với Guideline hiện tại
 */
export function createSoapFromCurrentGuideline(): void {
  const breadcrumbTitle = document.getElementById('reader-breadcrumb-title')?.textContent || '';
  const hash = window.location.hash || '';
  const match = hash.match(/kho-guidelines\/([^\/?#]+)/i) || hash.match(/reader\/([^\/?#]+)/i);
  const slug = match ? match[1] : breadcrumbTitle;
  window.location.hash = `#/docspace/soap?from_guideline=${encodeURIComponent(slug)}`;
}

/**
 * Mở giao diện Cơ Chế Bệnh Sinh & Sinh Lý Bệnh tương ứng trong phân hệ Pathophysiology
 */
export function openPathophysiologyForCurrentGuideline(): void {
  window.location.hash = '#/pathophysiology/co-che-benh-sinh';
}

// Global click outside listener to close settings menu
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('reader-settings-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target as Node)) {
      closeReaderSettingsMenu();
    }
  });
}

// Expose actions to window for direct event handler execution
if (typeof window !== 'undefined') {
  const win = window as any;
  win.toggleReaderSettingsMenu = toggleReaderSettingsMenu;
  win.closeReaderSettingsMenu = closeReaderSettingsMenu;
  win.toggleReaderTheme = toggleReaderTheme;
  win.syncReaderThemeUI = syncReaderThemeUI;
  win.toggleReaderWidthMode = toggleReaderWidthMode;
  win.adjustReaderFontSize = adjustReaderFontSize;
  win.toggleBrowserFullscreen = toggleBrowserFullscreen;
  win.copyGuidelineSoapNote = copyGuidelineSoapNote;
  win.createSoapFromCurrentGuideline = createSoapFromCurrentGuideline;
  win.openPathophysiologyForCurrentGuideline = openPathophysiologyForCurrentGuideline;
}

/**
 * Hydrate Interactive CDSS Calculators & Smooth Anchors for MDX Articles
 */
function hydrateMdxInteractiveTools(mountEl: HTMLElement): void {
  // 1. Replace un-rendered HTML entities like &rarr; in text nodes
  const walker = document.createTreeWalker(mountEl, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.nodeValue && node.nodeValue.includes('&rarr;')) {
      node.nodeValue = node.nodeValue.replace(/&rarr;/g, '→');
    }
  }

  // 2. CDSS 1: BP Classification Calculator (Table 4 AHA/ACC 2025)
  const inputSbp = mountEl.querySelector('#input-sbp') as HTMLInputElement | null;
  const inputDbp = mountEl.querySelector('#input-dbp') as HTMLInputElement | null;
  const resultEl = mountEl.querySelector('#bp-class-result') as HTMLElement | null;

  if (inputSbp && inputDbp && resultEl) {
    const calculateBpClass = () => {
      const sbp = parseFloat(inputSbp.value) || 0;
      const dbp = parseFloat(inputDbp.value) || 0;

      if (sbp <= 0 || dbp <= 0) {
        resultEl.innerHTML = '<span style="color: var(--color-text-muted);">Vui lòng nhập trị số SBP và DBP</span>';
        return;
      }

      let category = '';
      let badgeStyle = '';
      let advice = '';

      if (sbp >= 180 || dbp >= 120) {
        category = 'Cơn Tăng Huyết Áp Nguy Kịch (Hypertensive Crisis)';
        badgeStyle = 'background: #7f1d1d; color: #ffffff;';
        advice = 'Cần đánh giá ngay tổn thương cơ quan đích cấp tính (HMOD). Nếu có: Cấp cứu THA (Emergency) nhập ICU hạ áp IV. Nếu không: Khẩn cấp THA (Urgency) hạ áp uống.';
      } else if (sbp >= 140 || dbp >= 90) {
        category = 'Tăng Huyết Áp Độ 2 (Stage 2)';
        badgeStyle = 'background: #dc2626; color: #ffffff;';
        advice = 'Chỉ định khởi trị ngay bằng Viên Phối Hợp Liều Cố Định (SPC) 2 nhóm thuốc (RAASi + CCB hoặc Thiazide) kết hợp thay đổi lối sống. Mục tiêu HA < 130/80 mm Hg.';
      } else if ((sbp >= 130 && sbp <= 139) || (dbp >= 80 && dbp <= 89)) {
        category = 'Tăng Huyết Áp Độ 1 (Stage 1)';
        badgeStyle = 'background: #d97706; color: #ffffff;';
        advice = 'Đánh giá nguy cơ tim mạch 10 năm bằng PREVENT™. Nếu PREVENT ≥ 7.5% hoặc có CVD/CKD/Đái tháo đường: Khởi trị thuốc hạ áp đơn trị/phối hợp. Nếu < 7.5%: Can thiệp lối sống tích cực 3-6 tháng.';
      } else if (sbp >= 120 && sbp <= 129 && dbp < 80) {
        category = 'Huyết Áp Tăng Nhẹ (Elevated BP)';
        badgeStyle = 'background: #0284c7; color: #ffffff;';
        advice = 'Can thiệp lối sống không dùng thuốc (Chế độ ăn DASH, giảm muối < 2300mg/ngày, tập thể dục 150 phút/tuần, giảm cân, hạn chế rượu bia). Tái khám đánh giá lại sau 3–6 tháng.';
      } else {
        category = 'Huyết Áp Bình Thường (Normal BP)';
        badgeStyle = 'background: #059669; color: #ffffff;';
        advice = 'Duy trì lối sống lành mạnh và kiểm tra huyết áp định kỳ hàng năm.';
      }

      resultEl.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.4rem; width: 100%;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
              📊 Kết Quả: <span class="badge" style="padding: 0.25rem 0.65rem; border-radius: 6px; font-weight: 800; ${badgeStyle}">${category}</span>
            </span>
            <span style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">HA: ${sbp}/${dbp} mm Hg</span>
          </div>
          <p style="margin: 0; font-size: 0.82rem; line-height: 1.5; color: var(--color-text-muted, #475569);">${advice}</p>
        </div>
      `;
    };

    inputSbp.addEventListener('input', calculateBpClass);
    inputDbp.addEventListener('input', calculateBpClass);
    calculateBpClass();
  }

  // 3. Smooth scroll in-page anchors
  mountEl.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1 && !href.startsWith('#/')) {
        e.preventDefault();
        e.stopPropagation();
        const targetId = href.replace(/^#/, '');
        const targetEl = document.getElementById(targetId) || mountEl.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}
