/**
 * CliniPortal — Physiology & Pathophysiology Cases HTML Article Reader SPA View (TypeScript)
 * Path: src/content/pathophysiology/physio-html-reader-view.ts
 * 
 * Vận dụng cơ chế Flagship Reader của Kho Guidelines để hiển thị toàn bộ
 * các bài giảng HTML trong kho GP-SL (Phần 1 -> Phần 9) và kho CCBS (pathophysiology-cases) mượt mà trong SPA.
 */

import { CliniPortalThemeManager } from '../../main';

export function renderPhysioHtmlReader(part: string, slug: string): string {
  // Normalize slug & part
  const cleanSlug = slug.endsWith('.html') ? slug : `${slug}.html`;
  const baseSlugName = cleanSlug.replace(/\.html$/i, '');
  const cleanPart = part.toLowerCase();
  const isCaseStudy = cleanPart === 'cases' || cleanPart === 'co-che-benh-sinh' || cleanPart === 'pathophysiology-cases';

  // Retrieve saved preferences from localStorage
  const savedWidthMode = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_width') || 'wide') : 'wide';
  const savedFontSize = typeof localStorage !== 'undefined' ? (localStorage.getItem('cp_reader_font_size') || '16') : '16';

  // Part display name helper
  const partTitles: Record<string, string> = {
    part1: 'Phần 1: Đại Cương & Tế Bào',
    part2: 'Phần 2: Thần Kinh & Cơ',
    part3: 'Phần 3: Máu & Miễn Dịch',
    part4: 'Phần 4: Tim Mạch & Hô Hấp',
    part5: 'Phần 5: Tiêu Hóa & Chuyển Hóa',
    part6: 'Phần 6: Thận & Dịch Cơ Thể',
    part7: 'Phần 7: Nội Tiết & Sinh Sản',
    part8: 'Phần 8: Sản Phụ Khoa',
    part9: 'Phần 9: Nhi Khoa',
    cases: 'Cơ Chế Bệnh Sinh & Bệnh Học',
    'co-che-benh-sinh': 'Cơ Chế Bệnh Sinh & Bệnh Học'
  };

  const partName = partTitles[cleanPart] || `Phần ${cleanPart.replace('part', '')}`;

  // Trigger async fetch after container mounts to DOM
  setTimeout(() => {
    fetchAndHydratePhysioArticle(cleanPart, cleanSlug, baseSlugName, partName, isCaseStudy);
  }, 30);

  const parentModuleUrl = isCaseStudy ? '#/pathophysiology/co-che-benh-sinh' : '#/pathophysiology/giai-phau-sinh-ly';
  const parentModuleName = isCaseStudy ? 'CCBS - SBL' : 'GP - SL';
  const partUrl = isCaseStudy ? '#/pathophysiology/co-che-benh-sinh' : `#/pathophysiology/giai-phau-sinh-ly#${cleanPart}-section`;

  return `
    <div class="guideline-reader-wrapper animate-fade-in ${savedWidthMode === 'wide' ? 'reader-mode-wide' : 'reader-mode-standard'}" id="physio-reader-wrapper" style="min-height: calc(100vh - 60px); background: var(--color-bg, #f0f4f8); padding-bottom: 3.5rem; transition: all 0.25s ease;">
      
      <!-- TOP CONTROL & BREADCRUMB PRO TOOLBAR -->
      <header class="guideline-reader-toolbar" style="position: sticky; top: 0; z-index: 185; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--color-border, #e2e8f0); padding: 0.65rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; box-shadow: 0 2px 10px rgba(0,0,0,0.04);">
        
        <!-- Breadcrumb & Document Info -->
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-muted, #64748b); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 240px;">
          <a href="#/pathophysiology" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-dna"></i> Cơ Sở Y Khoa
          </a>
          <span>/</span>
          <a href="${parentModuleUrl}" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700;">
            ${parentModuleName}
          </a>
          <span>/</span>
          <a href="${partUrl}" style="color: var(--color-text-muted, #64748b); text-decoration: none;">
            ${partName}
          </a>
          <span>/</span>
          <span style="color: var(--color-text, #0f172a); font-weight: 800;" id="physio-reader-breadcrumb-title">${baseSlugName}</span>
        </div>

        <!-- Pro Reader Settings Dropdown (Dark Mode, Font size, Width, Print) -->
        <div class="reader-toolbar-actions" style="display: flex; align-items: center; gap: 0.5rem; position: relative;">
          
          <div class="reader-settings-dropdown-wrapper" id="physio-reader-settings-dropdown-wrapper" style="position: relative;">
            <button class="btn btn-outline reader-settings-btn" id="physio-reader-settings-toggle-btn" onclick="togglePhysioReaderSettingsMenu(event)" aria-expanded="false" title="Cài đặt & Tiện ích đọc" style="padding: 0.45rem 0.95rem; border-radius: 8px; border: 1.5px solid var(--color-primary, #0284c7); font-size: 0.82rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; background: rgba(2,132,199,0.08); color: var(--color-primary, #0284c7); box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: all 0.2s ease;">
              <i class="fa-solid fa-gear" style="font-size: 0.95rem;"></i>
              <span>Cài đặt</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.68rem; opacity: 0.7;"></i>
            </button>

            <!-- Dropdown Menu -->
            <div class="reader-settings-menu" id="physio-reader-settings-menu" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); z-index: 220; min-width: 290px; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 14px; box-shadow: 0 12px 36px rgba(0,0,0,0.15); padding: 0.65rem; backdrop-filter: blur(12px);">
              
              <div style="padding: 0.4rem 0.6rem 0.5rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted, #64748b); border-bottom: 1px solid var(--color-border, #e2e8f0); margin-bottom: 0.4rem; display: flex; align-items: center; justify-content: space-between;">
                <span>⚙️ Tùy chọn bài đọc y khoa</span>
                <span style="font-size: 0.7rem; font-weight: 600; opacity: 0.75;">CliniPortal</span>
              </div>

              <!-- 1. Dark Mode Toggle -->
              <button class="reader-menu-item" onclick="togglePhysioReaderTheme(event)" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-moon" id="physio-reader-menu-theme-icon" style="width: 18px; color: #8b5cf6; font-size: 0.95rem;"></i>
                  <span id="physio-reader-menu-theme-text">Chế độ Tối</span>
                </span>
                <span class="rx-tag" id="physio-reader-menu-theme-tag" style="font-size: 0.7rem; padding: 2px 7px; border-radius: 6px; font-weight: 700;">Theme</span>
              </button>

              <!-- 2. Font Size Adjustment -->
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-font" style="width: 18px; color: var(--color-primary, #0284c7); font-size: 0.95rem;"></i>
                  <span>Cỡ chữ đọc</span>
                </span>
                <div class="reader-btn-group" style="display: inline-flex; align-items: center; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; overflow: hidden;">
                  <button class="reader-icon-btn" onclick="adjustPhysioReaderFontSize(-1); event.stopPropagation();" title="Giảm cỡ chữ (A-)" style="padding: 0.28rem 0.55rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.75rem; font-weight: 800; cursor: pointer; border-right: 1px solid var(--color-border, #cbd5e1);">
                    A-
                  </button>
                  <span id="physio-reader-font-size-display" style="padding: 0 0.5rem; font-size: 0.74rem; font-weight: 700; font-family: monospace; color: var(--color-primary, #0284c7);">
                    ${savedFontSize}px
                  </span>
                  <button class="reader-icon-btn" onclick="adjustPhysioReaderFontSize(1); event.stopPropagation();" title="Tăng cỡ chữ (A+)" style="padding: 0.28rem 0.55rem; border: none; background: none; color: var(--color-text, #334155); font-size: 0.75rem; font-weight: 800; cursor: pointer; border-left: 1px solid var(--color-border, #cbd5e1);">
                    A+
                  </button>
                </div>
              </div>

              <!-- 3. Width Mode Toggle -->
              <button class="reader-menu-item" onclick="togglePhysioReaderWidthMode(); closePhysioReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <span style="display: flex; align-items: center; gap: 9px;">
                  <i class="fa-solid fa-up-right-and-down-left-from-center" style="width: 18px; color: #059669; font-size: 0.95rem;"></i>
                  <span id="physio-reader-menu-width-text">${savedWidthMode === 'wide' ? 'Khung Chuẩn (1080px)' : 'Mở Rộng Tối Đa (Ultra-Wide)'}</span>
                </span>
              </button>

              <div style="height: 1px; background: var(--color-border, #e2e8f0); margin: 0.35rem 0;"></div>

              <!-- 4. Print / PDF Export -->
              <button class="reader-menu-item" onclick="window.print(); closePhysioReaderSettingsMenu();" style="width: 100%; display: flex; align-items: center; gap: 9px; padding: 0.6rem 0.75rem; border: none; background: transparent; border-radius: 8px; cursor: pointer; font-size: 0.84rem; color: var(--color-text, #0f172a); font-weight: 600; text-align: left; transition: background 0.15s;">
                <i class="fa-solid fa-print" style="width: 18px; color: #64748b; font-size: 0.95rem;"></i>
                <span>In bài giảng / Lưu PDF</span>
              </button>

            </div>
          </div>

          <!-- Quick Return Button -->
          <a href="${parentModuleUrl}" class="btn btn-outline" title="Quay lại danh mục ${parentModuleName}" style="padding: 0.45rem 0.85rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.82rem; font-weight: 700; text-decoration: none; color: var(--color-text, #334155); display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-arrow-left"></i>
            <span>${parentModuleName}</span>
          </a>

        </div>

      </header>

      <!-- MAIN ARTICLE MOUNT CONTAINER -->
      <main id="physio-article-mount" style="min-height: 550px; font-size: ${savedFontSize}px; max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
        <div style="text-align: center; padding: 6rem 1rem; color: var(--color-text-muted, #64748b);">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2.8rem; color: var(--color-primary, #0284c7); margin-bottom: 1.25rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;">Đang Nạp Bài Giảng Y Khoa...</h3>
          <p style="font-size: 0.88rem; max-width: 520px; margin: 0 auto;">Đang tối ưu hóa giao diện toàn màn hình, công thức sinh lý và sơ đồ cơ chế.</p>
        </div>
      </main>

    </div>
  `;
}

/**
 * Fetch, parse, and inject physiology or pathophysiology cases HTML content
 */
async function fetchAndHydratePhysioArticle(part: string, cleanSlug: string, baseSlugName: string, partName: string, isCaseStudy: boolean): Promise<void> {
  const mountEl = document.getElementById('physio-article-mount');
  if (!mountEl) return;

  let candidatePaths: string[] = [];

  if (isCaseStudy) {
    candidatePaths = [
      `/src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`,
      `src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`,
      `./src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`,
      `../src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`,
      `/dist/src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`,
      `dist/src/content/pathophysiology/pathophysiology-cases/${cleanSlug}`,
      `pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/${cleanSlug}`,
      `/pages/Sinh lý - Sinh lý bệnh/SLB_CCBS/${cleanSlug}`
    ];
  } else {
    candidatePaths = [
      `/src/content/pathophysiology/physiology/${part}/${cleanSlug}`,
      `src/content/pathophysiology/physiology/${part}/${cleanSlug}`,
      `./src/content/pathophysiology/physiology/${part}/${cleanSlug}`,
      `../src/content/pathophysiology/physiology/${part}/${cleanSlug}`,
      `/dist/src/content/pathophysiology/physiology/${part}/${cleanSlug}`,
      `dist/src/content/pathophysiology/physiology/${part}/${cleanSlug}`,
      `pages/Sinh lý - Sinh lý bệnh/Sinhly/${part.replace('part', 'Phan')}/${cleanSlug}`,
      `/pages/Sinh lý - Sinh lý bệnh/Sinhly/${part.replace('part', 'Phan')}/${cleanSlug}`
    ];
  }

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
    const returnUrl = isCaseStudy ? '#/pathophysiology/co-che-benh-sinh' : '#/pathophysiology/giai-phau-sinh-ly';
    const returnText = isCaseStudy ? 'Cơ Chế Bệnh Sinh (CCBS)' : 'Giải Phẫu & Sinh Lý (GP-SL)';

    mountEl.innerHTML = `
      <div style="max-width: 680px; margin: 4rem auto; text-align: center; padding: 3rem 2rem; background: var(--color-surface, #fff); border-radius: 16px; border: 1px solid #fca5a5; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3.2rem; color: #dc2626; margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #991b1b; margin-bottom: 0.75rem;">Không tìm thấy bài giảng</h3>
        <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Không thể tải tệp <code>${isCaseStudy ? 'pathophysiology-cases/' : part + '/'}${cleanSlug}</code>. Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh mục.
        </p>
        <a href="${returnUrl}" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; padding: 0.65rem 1.35rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 8px; text-decoration: none; font-weight: 800;">
          <i class="fa-solid fa-arrow-left"></i> Quay lại ${returnText}
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
  const crumbEl = document.getElementById('physio-reader-breadcrumb-title');
  if (crumbEl) crumbEl.textContent = cleanTitle;
  document.title = `${cleanTitle} – CliniPortal`;

  // Extract Styles
  const styles = doc.querySelectorAll('style');
  let inlineStyles = '';
  styles.forEach(s => {
    inlineStyles += s.textContent || '';
  });

  // Remove legacy placeholders, duplicate headers, and external stylesheet links
  doc.querySelectorAll('#header-placeholder, #footer-placeholder, .topnav, link[rel="stylesheet"], clini-header, clini-footer').forEach(el => el.remove());

  // Rewrite image sources to valid paths in SPA
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (!src) return;

    if (src.includes('images/')) {
      const cleanImg = src.replace(/^(\.\.\/)+images\//i, '').replace(/^images\//i, '');
      img.setAttribute('src', `/src/content/pathophysiology/images/${cleanImg}`);
    } else if (src.startsWith('./') || (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:'))) {
      const cleanImg = src.replace(/^\.\//, '');
      if (isCaseStudy) {
        img.setAttribute('src', `/src/content/pathophysiology/pathophysiology-cases/${cleanImg}`);
      } else {
        img.setAttribute('src', `/src/content/pathophysiology/physiology/${part}/${cleanImg}`);
      }
    }

    // Add fallback onerror handler
    img.setAttribute('onerror', "if(!this.dataset.tried){this.dataset.tried='1';if(this.src.includes('Phan')){this.src=this.src.replace(/Phan(\\\\d+)/i,'part$1');}else if(this.src.includes('part')){this.src=this.src.replace(/part(\\\\d+)/i,'Phan$1');}else if(this.src.startsWith('/src/')){this.src=this.src.replace('/src/content/pathophysiology/','/');}}");
  });

  // Extract clean article body content
  const articleHtml = doc.body ? doc.body.innerHTML : htmlText;

  // Build Injected HTML with Expanded Full-Width Layout Rules
  mountEl.innerHTML = `
    <style id="physio-expanded-reader-styles">
      ${inlineStyles}
      
      /* Scope containment */
      #physio-article-mount {
        color: var(--color-text, #0f172a);
        line-height: 1.7;
      }
      #physio-article-mount .main-wrapper,
      #physio-article-mount .container,
      #physio-article-mount .content-area {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      #physio-article-mount h1 {
        font-size: 1.85rem;
        font-weight: 800;
        color: var(--color-primary, #0284c7);
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }
      #physio-article-mount h2 {
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--color-text, #0f172a);
        border-bottom: 2px solid var(--color-border, #e2e8f0);
        padding-bottom: 0.4rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }
      #physio-article-mount h3 {
        font-size: 1.15rem;
        font-weight: 700;
        color: var(--color-text, #1e293b);
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
      }
      #physio-article-mount table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        background: var(--color-surface, #fff);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--color-border, #e2e8f0);
      }
      #physio-article-mount th,
      #physio-article-mount td {
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border, #e2e8f0);
      }
      #physio-article-mount th {
        background: var(--color-surface-offset, #f8fafc);
        font-weight: 700;
        color: var(--color-text, #0f172a);
      }
      #physio-article-mount .clinical-callout,
      #physio-article-mount .note-box,
      #physio-article-mount .alert {
        background: var(--color-surface-offset, #f8fafc);
        border-left: 4px solid var(--color-primary, #0284c7);
        padding: 1rem 1.25rem;
        border-radius: 6px;
        margin: 1.5rem 0;
      }
      #physio-article-mount img,
      #physio-article-mount svg {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
    </style>
    <div class="physio-injected-content">
      ${articleHtml}
    </div>
  `;

  // Hydrate Scripts if any
  const scripts = doc.querySelectorAll('script');
  scripts.forEach(s => {
    if (s.src) {
      const newScript = document.createElement('script');
      newScript.src = s.src;
      document.body.appendChild(newScript);
    } else if (s.textContent) {
      try {
        const runScript = new Function(s.textContent);
        runScript();
      } catch (err) {
        console.warn('Script execution notice:', err);
      }
    }
  });
}

// -------------------------------------------------------------
// Reader Interactive Handlers
// -------------------------------------------------------------

export function togglePhysioReaderSettingsMenu(event?: Event): void {
  if (event) event.stopPropagation();
  const menu = document.getElementById('physio-reader-settings-menu');
  const btn = document.getElementById('physio-reader-settings-toggle-btn');
  if (!menu) return;

  const isVisible = menu.style.display === 'block';
  if (isVisible) {
    closePhysioReaderSettingsMenu();
  } else {
    syncPhysioReaderThemeUI();
    menu.style.display = 'block';
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

export function closePhysioReaderSettingsMenu(): void {
  const menu = document.getElementById('physio-reader-settings-menu');
  const btn = document.getElementById('physio-reader-settings-toggle-btn');
  if (menu) menu.style.display = 'none';
  if (btn) btn.setAttribute('aria-expanded', 'false');
}

export function togglePhysioReaderTheme(event?: Event): void {
  if (event) event.stopPropagation();
  CliniPortalThemeManager.toggleTheme();
  syncPhysioReaderThemeUI();
}

export function syncPhysioReaderThemeUI(): void {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const icon = document.getElementById('physio-reader-menu-theme-icon');
  const text = document.getElementById('physio-reader-menu-theme-text');
  const tag = document.getElementById('physio-reader-menu-theme-tag');

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

export function togglePhysioReaderWidthMode(): void {
  const wrapper = document.getElementById('physio-reader-wrapper');
  const label = document.getElementById('physio-reader-menu-width-text');
  if (!wrapper) return;

  if (wrapper.classList.contains('reader-mode-wide')) {
    wrapper.classList.remove('reader-mode-wide');
    wrapper.classList.add('reader-mode-standard');
    localStorage.setItem('cp_reader_width', 'standard');
    if (label) label.textContent = 'Mở Rộng Tối Đa (Ultra-Wide)';
  } else {
    wrapper.classList.remove('reader-mode-standard');
    wrapper.classList.add('reader-mode-wide');
    localStorage.setItem('cp_reader_width', 'wide');
    if (label) label.textContent = 'Khung Chuẩn (1080px)';
  }
}

export function adjustPhysioReaderFontSize(delta: number): void {
  const mount = document.getElementById('physio-article-mount');
  const display = document.getElementById('physio-reader-font-size-display');
  if (!mount) return;

  let currentSize = parseInt(localStorage.getItem('cp_reader_font_size') || '16', 10);
  currentSize = Math.max(13, Math.min(24, currentSize + delta));

  mount.style.fontSize = `${currentSize}px`;
  if (display) display.textContent = `${currentSize}px`;
  localStorage.setItem('cp_reader_font_size', currentSize.toString());
}

// Global click outside listener
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('physio-reader-settings-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target as Node)) {
      closePhysioReaderSettingsMenu();
    }
  });
}

// Expose actions to window for inline onclick handlers
if (typeof window !== 'undefined') {
  const win = window as any;
  win.togglePhysioReaderSettingsMenu = togglePhysioReaderSettingsMenu;
  win.closePhysioReaderSettingsMenu = closePhysioReaderSettingsMenu;
  win.togglePhysioReaderTheme = togglePhysioReaderTheme;
  win.syncPhysioReaderThemeUI = syncPhysioReaderThemeUI;
  win.togglePhysioReaderWidthMode = togglePhysioReaderWidthMode;
  win.adjustPhysioReaderFontSize = adjustPhysioReaderFontSize;
}
