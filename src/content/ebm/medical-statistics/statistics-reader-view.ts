/**
 * CliniPortal — Medical Statistics & Research Methods Article Reader SPA View (TypeScript)
 * Path: src/content/ebm/medical-statistics/statistics-reader-view.ts
 * 
 * Flagship Reader for Medical Statistics & Research Methodology lessons:
 * - Ultra-wide / Standard width switcher
 * - Dynamic font sizing (A- / A+)
 * - Dark Mode & Light Mode support
 * - Fast async fetch & hydration
 * - Standardized Medical Statistics Toolbar & clean print layout
 */

export function renderStatisticsReader(slug: string): string {
  // Normalize slug
  const cleanSlug = slug.endsWith('.html') ? slug : `${slug}.html`;
  const baseSlugName = cleanSlug.replace(/\.html$/i, '');

  // Retrieve saved preferences from localStorage
  const savedWidthMode = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_width') || 'wide') : 'wide';
  const savedFontSize = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_font_size') || '16') : '16';

  // Trigger async fetch after container mounts to DOM
  setTimeout(() => {
    fetchAndHydrateStatArticle(cleanSlug, baseSlugName);
  }, 30);

  return `
    <div class="guideline-reader-wrapper animate-fade-in ${savedWidthMode === 'wide' ? 'reader-mode-wide' : 'reader-mode-standard'}" id="stat-reader-wrapper" style="min-height: calc(100vh - 60px); background: var(--color-bg, #f0f4f8); padding-top: 84px; padding-bottom: 3.5rem; transition: all 0.25s ease;">
      
      <!-- TOP CONTROL & BREADCRUMB PRO TOOLBAR -->
      <header class="guideline-reader-toolbar" style="position: relative; z-index: 10; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--color-border, #e2e8f0); padding: 0.65rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; box-shadow: 0 2px 10px rgba(0,0,0,0.04); margin-bottom: 1.25rem; border-radius: 12px;">
        
        <!-- Breadcrumb & Document Info -->
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-muted, #64748b); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 240px;">
          <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-book-medical"></i> Y học Chứng cứ
          </a>
          <span>/</span>
          <a href="#/ebm/thong-ke-y-hoc" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700;">
            Thống Kê Y Học & NCKH
          </a>
          <span>/</span>
          <span style="color: var(--color-text, #0f172a); font-weight: 800;" id="stat-reader-breadcrumb-title">${baseSlugName}</span>
        </div>

        <!-- Pro Reader Settings Dropdown (Dark Mode, Font size, Width, Print) -->
        <div class="reader-toolbar-actions" style="display: flex; align-items: center; gap: 0.5rem; position: relative;">
          
          <div class="reader-settings-dropdown-wrapper" id="stat-reader-settings-dropdown-wrapper" style="position: relative;">
            <button class="btn btn-outline reader-settings-btn" id="stat-reader-settings-toggle-btn" onclick="toggleStatReaderSettingsMenu(event)" aria-expanded="false" title="Cài đặt & Tiện ích đọc" style="padding: 0.45rem 0.95rem; border-radius: 8px; border: 1.5px solid var(--color-primary, #0284c7); font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; background: rgba(2,132,199,0.08); color: var(--color-primary, #0284c7); box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: all 0.2s ease;">
              <i class="fa-solid fa-gear" style="font-size: 0.95rem;"></i>
              <span>Cài đặt</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.68rem; opacity: 0.7;"></i>
            </button>

            <!-- Dropdown Menu -->
            <div class="reader-settings-menu" id="stat-reader-settings-menu" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); z-index: 220; min-width: 290px; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 14px; box-shadow: 0 12px 36px rgba(0,0,0,0.15); padding: 0.65rem; backdrop-filter: blur(12px);">
              
              <div style="padding: 0.4rem 0.6rem 0.5rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted, #64748b); border-bottom: 1px solid var(--color-border, #e2e8f0); margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: space-between;">
                <span>⚙️ Tùy chọn bài đọc thống kê</span>
                <span style="font-size: 0.7rem; font-weight: 600; opacity: 0.75;">CliniPortal</span>
              </div>

              <!-- 1. Dark Mode Toggle -->
              <button class="reader-menu-item" onclick="toggleStatReaderTheme(event)" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-moon" id="stat-reader-menu-theme-icon" style="width: 18px; color: #8b5cf6; font-size: 0.95rem;"></i>
                  <span id="stat-reader-menu-theme-text">Chế độ Tối</span>
                </span>
                <span class="rx-tag" id="stat-reader-menu-theme-tag" style="font-size: 0.7rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">Theme</span>
              </button>

              <!-- 2. Font Size Adjustment -->
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-font" style="width: 18px; color: var(--color-primary, #0284c7); font-size: 0.95rem;"></i>
                  <span>Cỡ chữ đọc</span>
                </span>
                <div class="reader-btn-group" style="display: inline-flex; align-items: center; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; overflow: hidden;">
                  <button class="reader-icon-btn" onclick="adjustStatReaderFontSize(-1); event.stopPropagation();" title="Giảm cỡ chữ (A-)" style="padding: 0.28rem 0.55rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.75rem; font-weight: 800; cursor: pointer; border-right: 1px solid var(--color-border, #cbd5e1);">
                    A-
                  </button>
                  <span id="stat-reader-font-size-display" style="padding: 0 0.5rem; font-size: 0.74rem; font-weight: 700; font-family: monospace; color: var(--color-primary, #0284c7);">
                    ${savedFontSize}px
                  </span>
                  <button class="reader-icon-btn" onclick="adjustStatReaderFontSize(1); event.stopPropagation();" title="Tăng cỡ chữ (A+)" style="padding: 0.28rem 0.55rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.75rem; font-weight: 800; cursor: pointer; border-left: 1px solid var(--color-border, #cbd5e1);">
                    A+
                  </button>
                </div>
              </div>

              <!-- 3. Width Mode Toggle -->
              <button class="reader-menu-item" onclick="toggleStatReaderWidthMode(); closeStatReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-up-right-and-down-left-from-center" style="width: 18px; color: #059669; font-size: 0.95rem;"></i>
                  <span id="stat-reader-menu-width-text">${savedWidthMode === 'wide' ? 'Khung Chuẩn (1080px)' : 'Mở Rộng Tối Đa (Ultra-Wide)'}</span>
                </span>
              </button>

              <div style="height: 1px; background: var(--color-border, #e2e8f0); margin: 0.35rem 0;"></div>

              <!-- 4. Print / PDF Export -->
              <button class="reader-menu-item" onclick="window.print(); closeStatReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; gap: 9px; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <i class="fa-solid fa-print" style="width: 18px; color: #64748b; font-size: 0.95rem;"></i>
                <span>In bài học / Lưu PDF</span>
              </button>

            </div>
          </div>

          <!-- Quick Return Button -->
          <a href="#/ebm/thong-ke-y-hoc" class="btn btn-outline" title="Quay lại danh mục Thống Kê Y Học" style="padding: 0.45rem 0.85rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.82rem; font-weight: 700; text-decoration: none; color: var(--color-text, #334155); display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Thống Kê Y Học</span>
          </a>

        </div>

      </header>

      <!-- MAIN ARTICLE MOUNT CONTAINER -->
      <main id="stat-article-mount" style="min-height: 550px; font-size: ${savedFontSize}px; max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
        <div style="text-align: center; padding: 6rem 1rem; color: var(--color-text-muted, #64748b);">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2.8rem; color: var(--color-primary, #0284c7); margin-bottom: 1.25rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;">Đang Nạp Bài Học Thống Kê Y Học...</h3>
          <p style="font-size: 0.88rem; max-width: 520px; margin: 0 auto;">Đang tối ưu hóa giao diện toàn màn hình, công thức toán thống kê và bài tập lâm sàng.</p>
        </div>
      </main>

    </div>
  `;
}

/**
 * Fetch, parse, and inject medical statistics HTML content
 */
async function fetchAndHydrateStatArticle(cleanSlug: string, baseSlugName: string): Promise<void> {
  const mountEl = document.getElementById('stat-article-mount');
  if (!mountEl) return;

  const candidatePaths = [
    `/src/content/ebm/medical-statistics/${cleanSlug}`,
    `src/content/ebm/medical-statistics/${cleanSlug}`,
    `./src/content/ebm/medical-statistics/${cleanSlug}`,
    `../src/content/ebm/medical-statistics/${cleanSlug}`,
    `/dist/src/content/ebm/medical-statistics/${cleanSlug}`,
    `dist/src/content/ebm/medical-statistics/${cleanSlug}`,
    `medical-statistics/${cleanSlug}`,
    `/medical-statistics/${cleanSlug}`
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
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #991b1b; margin-bottom: 0.75rem;">Không tìm thấy bài học Thống kê</h3>
        <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Không thể tải tệp <code>${cleanSlug}</code>. Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh sách Thống Kê Y Học.
        </p>
        <a href="#/ebm/thong-ke-y-hoc" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 0.65rem 1.35rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 8px; text-decoration: none; font-weight: 800;">
          <i class="fa-solid fa-arrow-left"></i> Quay lại Thống Kê Y Học
        </a>
      </div>
    `;
    return;
  }

  // Parse HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');

  // Extract Page Title
  const docTitle = doc.querySelector('title')?.textContent || doc.querySelector('h1')?.textContent || baseSlugName;
  const cleanTitle = docTitle.replace(/– CliniPortal.*$/i, '').trim();
  const crumbEl = document.getElementById('stat-reader-breadcrumb-title');
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

  // Wrap all table elements with responsive scrolling wrappers to prevent mobile overflow
  doc.querySelectorAll('table').forEach(tbl => {
    const parent = tbl.parentElement;
    if (!parent?.classList.contains('table-responsive') && !parent?.classList.contains('table-container')) {
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
    <style id="stat-expanded-reader-styles">
      ${inlineStyles}

      /* ═══════════════════════════════════════════════════════════
         FULL-WIDTH ULTRA-CLEAR STAT READER OVERRIDES
         ═══════════════════════════════════════════════════════════ */
      .guideline-reader-wrapper .topnav { display: none !important; }
      
      /* Wide Mode: Expand Containers to 1540px / 96% */
      .guideline-reader-wrapper.reader-mode-wide .main-container,
      .guideline-reader-wrapper.reader-mode-wide .content-box,
      .guideline-reader-wrapper.reader-mode-wide .lesson-container {
        max-width: min(1560px, 96%) !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      /* Standard Mode: Centered 1080px */
      .guideline-reader-wrapper.reader-mode-standard .main-container,
      .guideline-reader-wrapper.reader-mode-standard .content-box,
      .guideline-reader-wrapper.reader-mode-standard .lesson-container {
        max-width: 1080px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .stat-injected-article .table-responsive {
        width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        margin: 1.25rem 0 !important;
        border-radius: 10px !important;
      }

      .stat-injected-article .content-box {
        background: var(--color-surface, #ffffff);
        border: 1px solid var(--color-border, #cbd5e1);
        border-radius: 16px;
        padding: 2.25rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.04);
      }

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

        .stat-injected-article .content-box {
          padding: 1.25rem 1rem !important;
          border-radius: 12px !important;
          margin-bottom: 1.25rem !important;
        }

        .stat-injected-article table th,
        .stat-injected-article table td {
          padding: 0.55rem 0.7rem !important;
          font-size: 0.825rem !important;
        }
      }
    </style>

    <div class="stat-injected-article animate-fade-in" style="width: 100%;">
      ${articleHtml}
    </div>
  `;

  // Normalize and fallback images in article
  normalizeStatImages(mountEl);

  // Execute embedded scripts if any
  const scripts = mountEl.querySelectorAll('script');
  scripts.forEach(s => {
    try {
      const newScript = document.createElement('script');
      if (s.src) {
        newScript.src = s.src;
      } else {
        newScript.textContent = s.textContent;
      }
      document.body.appendChild(newScript);
    } catch (e) {
      console.warn('[StatReader] Script execution notice:', e);
    }
  });

  // Sync theme
  updateStatReaderThemeUI();
}

/**
 * Chuẩn hóa và thiết lập fallback đa tầng cho ảnh trong bài viết Thống Kê Y Học
 */
function normalizeStatImages(mountEl: HTMLElement): void {
  mountEl.querySelectorAll<HTMLImageElement>('img').forEach(img => {
    const rawSrc = img.getAttribute('src') || '';
    if (!rawSrc || rawSrc.startsWith('data:') || rawSrc.startsWith('http://') || rawSrc.startsWith('https://')) return;

    const rawFileName = rawSrc.split('/').pop()?.split('?')[0] || '';
    if (!rawFileName) return;

    const candidatePaths = [
      `./assets/images/${rawFileName}`,
      `/assets/images/${rawFileName}`,
      `assets/images/${rawFileName}`,
      `./src/content/ebm/medical-statistics/images/${rawFileName}`,
      `/src/content/ebm/medical-statistics/images/${rawFileName}`,
      `./images/${rawFileName}`,
      `/images/${rawFileName}`
    ];

    if (!img.src || img.src.endsWith('/images/' + rawFileName) || img.getAttribute('src')?.startsWith('./images/')) {
      img.src = candidatePaths[0];
    }

    let attempt = 0;
    img.onerror = () => {
      attempt++;
      if (attempt < candidatePaths.length) {
        img.src = candidatePaths[attempt];
      }
    };
  });
}

/**
 * Settings Menu Toggles & Handlers
 */
if (typeof window !== 'undefined') {
  (window as any).toggleStatReaderSettingsMenu = function(e: Event): void {
    e.stopPropagation();
    const menu = document.getElementById('stat-reader-settings-menu');
    if (!menu) return;
    const isVisible = menu.style.display === 'block';
    menu.style.display = isVisible ? 'none' : 'block';
    const btn = document.getElementById('stat-reader-settings-toggle-btn');
    if (btn) btn.setAttribute('aria-expanded', String(!isVisible));
  };

  (window as any).closeStatReaderSettingsMenu = function(): void {
    const menu = document.getElementById('stat-reader-settings-menu');
    if (menu) menu.style.display = 'none';
    const btn = document.getElementById('stat-reader-settings-toggle-btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  };

  (window as any).toggleStatReaderTheme = function(e: Event): void {
    e.stopPropagation();
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('cliniportal_theme', newTheme);
    updateStatReaderThemeUI();
  };

  (window as any).adjustStatReaderFontSize = function(delta: number): void {
    const mountEl = document.getElementById('stat-article-mount');
    const displayEl = document.getElementById('stat-reader-font-size-display');
    if (!mountEl) return;
    let current = parseInt(localStorage.getItem('cp_reader_font_size') || '16', 10);
    current = Math.min(24, Math.max(13, current + delta));
    mountEl.style.fontSize = `${current}px`;
    if (displayEl) displayEl.textContent = `${current}px`;
    localStorage.setItem('cp_reader_font_size', String(current));
  };

  (window as any).toggleStatReaderWidthMode = function(): void {
    const wrapper = document.getElementById('stat-reader-wrapper');
    const textEl = document.getElementById('stat-reader-menu-width-text');
    if (!wrapper) return;
    const isWide = wrapper.classList.contains('reader-mode-wide');
    if (isWide) {
      wrapper.classList.remove('reader-mode-wide');
      wrapper.classList.add('reader-mode-standard');
      localStorage.setItem('cp_reader_width', 'standard');
      if (textEl) textEl.textContent = 'Mở Rộng Tối Đa (Ultra-Wide)';
    } else {
      wrapper.classList.remove('reader-mode-standard');
      wrapper.classList.add('reader-mode-wide');
      localStorage.setItem('cp_reader_width', 'wide');
      if (textEl) textEl.textContent = 'Khung Chuẩn (1080px)';
    }
  };

  document.addEventListener('click', () => {
    (window as any).closeStatReaderSettingsMenu?.();
  });
}

function updateStatReaderThemeUI(): void {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = document.getElementById('stat-reader-menu-theme-icon');
  const text = document.getElementById('stat-reader-menu-theme-text');
  const tag = document.getElementById('stat-reader-menu-theme-tag');
  if (icon && text && tag) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    icon.style.color = isDark ? '#f59e0b' : '#8b5cf6';
    text.textContent = isDark ? 'Chế độ Sáng' : 'Chế độ Tối';
    tag.textContent = isDark ? 'Dark' : 'Light';
  }
}
