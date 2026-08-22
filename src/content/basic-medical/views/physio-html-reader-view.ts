/**
 * CliniPortal — Physiology & Pathophysiology Cases HTML Article Reader SPA View (TypeScript)
 * Path: src/content/pathophysiology/physio-html-reader-view.ts
 * 
 * Vận dụng cơ chế Flagship Reader của Kho Guidelines để hiển thị toàn bộ
 * các bài giảng HTML trong kho GP-SL (Phần 1 -> Phần 9) và kho CCBS (pathophysiology-cases) mượt mà trong SPA.
 */

import { CliniPortalThemeManager } from '../../../main';

export function renderPhysioHtmlReader(part: string, slug: string): string {
  // Normalize slug & part
  const cleanSlug = slug.endsWith('.html') ? slug : `${slug}.html`;
  const baseSlugName = cleanSlug.replace(/\.html$/i, '');
  const cleanPart = part.toLowerCase();
  const isCaseStudy = cleanPart === 'cases' || cleanPart === 'co-che-benh-sinh' || cleanPart === 'pathophysiology-cases';
  const isBiochem = cleanPart.startsWith('block') || cleanPart.startsWith('biochem');
  const isEpi = cleanPart === 'epidemiology' || cleanPart === 'dth' || cleanPart === 'dich-te-hoc';

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
    'co-che-benh-sinh': 'Cơ Chế Bệnh Sinh & Bệnh Học',
    'block1-biomolecules': 'Khối 1: Cấu Trúc Phân Tử',
    'block2-catalysis-signaling': 'Khối 2: Động Học Xúc Tác & Tín Hiệu',
    'block3-bioenergetics': 'Khối 3: Năng Lượng Sinh Học & ETC',
    'block4-intermediary-metabolism': 'Khối 4: Chuyển Hóa 4 Đại Phân Tử',
    'block5-molecular-genetics': 'Khối 5: Sinh Học Phân Tử & Gen',
    'block6-organ-metabolism': 'Khối 6: Hóa Sinh Cơ Quan & Tích Hợp',
    'block7-clinical-biochemistry': 'Khối 7: Hóa Sinh Lâm Sàng',
    'epidemiology': 'Dịch Tễ Bệnh Học',
    'dth': 'Dịch Tễ Bệnh Học',
    'dich-te-hoc': 'Dịch Tễ Bệnh Học'
  };

  const partName = partTitles[cleanPart] || (isBiochem ? `Khối Hóa Sinh` : (isEpi ? 'Dịch Tễ Bệnh Học' : `Phần ${cleanPart.replace('part', '')}`));

  // Trigger async fetch after container mounts to DOM
  setTimeout(() => {
    fetchAndHydratePhysioArticle(cleanPart, cleanSlug, baseSlugName, partName, isCaseStudy, isBiochem, isEpi);
  }, 30);

  let parentModuleUrl = '#/basic-medical/giai-phau-sinh-ly';
  let parentModuleName = 'GP - SL';
  let partUrl = `#/basic-medical/giai-phau-sinh-ly#${cleanPart}-section`;

  if (isCaseStudy) {
    parentModuleUrl = '#/basic-medical/co-che-benh-sinh';
    parentModuleName = 'CCBS - SBL';
    partUrl = '#/basic-medical/co-che-benh-sinh';
  } else if (isBiochem) {
    parentModuleUrl = '#/basic-medical/hoa-sinh';
    parentModuleName = 'Hóa Sinh';
    partUrl = `#/basic-medical/hoa-sinh#${cleanPart}-section`;
  } else if (isEpi) {
    parentModuleUrl = '#/basic-medical/dich-te-hoc';
    parentModuleName = 'DTH - YTCC';
    partUrl = `#/basic-medical/dich-te-hoc#disease-epidemiology-section`;
  }

  return `
    <div class="guideline-reader-wrapper animate-fade-in ${savedWidthMode === 'wide' ? 'reader-mode-wide' : 'reader-mode-standard'}" id="physio-reader-wrapper" style="min-height: calc(100vh - 60px); background: var(--color-bg, #f0f4f8); padding-top: 84px; padding-bottom: 3.5rem; transition: all 0.25s ease;">
      
      <!-- TOP CONTROL & BREADCRUMB PRO TOOLBAR (KHÔNG ĐÓNG BĂNG KHI CUỘN) -->
      <header class="guideline-reader-toolbar" style="position: relative; z-index: 10; background: rgba(255, 255, 255, 0.96); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid var(--color-border, #e2e8f0); padding: 0.65rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; box-shadow: 0 2px 10px rgba(0,0,0,0.04); margin-bottom: 1.25rem; border-radius: 12px;">
        
        <!-- Breadcrumb & Document Info -->
        <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--color-text-muted, #64748b); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 240px;">
          <a href="#/basic-medical" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
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
async function fetchAndHydratePhysioArticle(part: string, cleanSlug: string, baseSlugName: string, partName: string, isCaseStudy: boolean, isBiochem = false, isEpi = false): Promise<void> {
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
  } else if (isBiochem) {
    candidatePaths = [
      `/src/content/pathophysiology/biochemistry/${part}/${cleanSlug}`,
      `src/content/pathophysiology/biochemistry/${part}/${cleanSlug}`,
      `./src/content/pathophysiology/biochemistry/${part}/${cleanSlug}`,
      `../src/content/pathophysiology/biochemistry/${part}/${cleanSlug}`,
      `/dist/src/content/pathophysiology/biochemistry/${part}/${cleanSlug}`,
      `dist/src/content/pathophysiology/biochemistry/${part}/${cleanSlug}`
    ];
  } else if (isEpi) {
    candidatePaths = [
      `/src/content/basic-medical/epidemiology/${cleanSlug}`,
      `src/content/basic-medical/epidemiology/${cleanSlug}`,
      `./src/content/basic-medical/epidemiology/${cleanSlug}`,
      `../src/content/basic-medical/epidemiology/${cleanSlug}`,
      `/dist/src/content/basic-medical/epidemiology/${cleanSlug}`,
      `dist/src/content/basic-medical/epidemiology/${cleanSlug}`
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
    let returnUrl = '#/basic-medical/giai-phau-sinh-ly';
    let returnText = 'Giải Phẫu & Sinh Lý (GP-SL)';

    if (isCaseStudy) {
      returnUrl = '#/basic-medical/co-che-benh-sinh';
      returnText = 'Cơ Chế Bệnh Sinh (CCBS)';
    } else if (isBiochem) {
      returnUrl = '#/basic-medical/hoa-sinh';
      returnText = 'Hóa Sinh Y Học (HS-CH)';
    } else if (isEpi) {
      returnUrl = '#/basic-medical/dich-te-hoc';
      returnText = 'Dịch Tễ Học (DTH-YTCC)';
    }

    mountEl.innerHTML = `
      <div style="max-width: 680px; margin: 4rem auto; text-align: center; padding: 3rem 2rem; background: var(--color-surface, #fff); border-radius: 16px; border: 1px solid #fca5a5; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 3.2rem; color: #dc2626; margin-bottom: 1.25rem;"></i>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: #991b1b; margin-bottom: 0.75rem;">Không tìm thấy bài giảng</h3>
        <p style="color: #64748b; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.5rem;">
          Không thể tải tệp <code>${isCaseStudy ? 'pathophysiology-cases/' : (isBiochem ? 'biochemistry/' + part + '/' : part + '/')}${cleanSlug}</code>. Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh mục.
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

  // Remove legacy placeholders, sidebars, breadcrumbs, and external stylesheet links
  doc.querySelectorAll(
    '#header-placeholder, #footer-placeholder, .topnav, link[rel="stylesheet"], clini-header, clini-footer, .sidebar-overlay, .app-sidebar, clini-breadcrumb, .chapter-navigation, .toc-sidebar, #tocContainer, .toc-card, .toc-box'
  ).forEach(el => el.remove());

  // Unwrap legacy wrappers (.app-container, .main-wrapper, .visual-container)
  const legacyWrappers = doc.querySelectorAll('.app-container, .main-wrapper, .visual-container');
  legacyWrappers.forEach(wrap => {
    if (wrap.parentNode) {
      while (wrap.firstChild) {
        wrap.parentNode.insertBefore(wrap.firstChild, wrap);
      }
      wrap.remove();
    }
  });

  // Ensure content is wrapped in .physio-article-container
  let container = doc.querySelector('.physio-article-container');
  if (!container && doc.body) {
    const newContainer = doc.createElement('div');
    newContainer.className = 'physio-article-container';
    while (doc.body.firstChild) {
      newContainer.appendChild(doc.body.firstChild);
    }
    doc.body.appendChild(newContainer);
    container = newContainer;
  }

  // Modernize Chapter Header Card
  const chapterHeader = doc.querySelector('.chapter-header, .biochem-article-header, .physio-article-header');
  if (chapterHeader) {
    chapterHeader.classList.add('chapter-header', 'gradient-header');
    
    // Check if it's pediatric (Part 9 / Nhi khoa)
    const isPediatric = (part || '').toLowerCase().includes('part9') || (part || '').toLowerCase().includes('nhi') || (cleanSlug || '').toLowerCase().includes('nhi');
    if (isPediatric) {
      chapterHeader.classList.add('hero-pediatric-theme');
    }
    
    // Remove existing badges inside chapterHeader to prevent duplicate overlapping badges
    chapterHeader.querySelectorAll('.module-hero-badge, .physio-badge, .biochem-badge, .hero-badge').forEach(b => b.remove());
    
    const badge = doc.createElement('span');
    badge.className = 'physio-badge';
    const badgeIcon = isCaseStudy ? 'fa-microscope' : (isBiochem ? 'fa-flask-vial' : (isPediatric ? 'fa-baby' : 'fa-heart-pulse'));
    badge.innerHTML = `<i class="fa-solid ${badgeIcon}"></i> ${isCaseStudy ? 'Cơ Chế Bệnh Sinh' : (isBiochem ? 'Hóa Sinh Y Học' : partName)}`;
    const h1 = chapterHeader.querySelector('h1');
    if (h1) {
      chapterHeader.insertBefore(badge, h1);
    } else {
      chapterHeader.prepend(badge);
    }
  }

  // Icon palette for section headers
  const icons = [
    'fa-layer-group', 'fa-heart-pulse', 'fa-flask-vial', 'fa-shapes',
    'fa-border-all', 'fa-circle-nodes', 'fa-route', 'fa-stethoscope',
    'fa-vials', 'fa-dna', 'fa-book-medical', 'fa-shield-halved'
  ];

  // Modernize all H2 elements with section-title class, IDs, and icons
  const h2Elements = Array.from(doc.querySelectorAll('h2'));
  h2Elements.forEach((h2, idx) => {
    h2.classList.add('section-title');
    let secId = h2.getAttribute('id');
    if (!secId) {
      secId = `sec-${idx + 1}`;
      h2.setAttribute('id', secId);
    }
    const parentSec = h2.closest('.article-section, .physio-content');
    if (parentSec && !parentSec.getAttribute('id')) {
      parentSec.setAttribute('id', secId);
    }

    if (!h2.querySelector('i')) {
      const iconEl = doc.createElement('i');
      iconEl.className = `fa-solid ${icons[idx % icons.length]}`;
      h2.prepend(iconEl);
    }
  });

  // Build Sticky Pillars Nav Strip if missing and multiple H2 sections exist
  if (!doc.querySelector('.pillars-nav, .quicknav') && h2Elements.length >= 2) {
    const navEl = doc.createElement('nav');
    navEl.className = 'pillars-nav';
    navEl.setAttribute('aria-label', 'Mục lục bài học nhanh');
    const navInner = doc.createElement('div');
    navInner.className = 'pillars-nav-inner';

    h2Elements.forEach((h2, idx) => {
      const secId = h2.getAttribute('id') || `sec-${idx + 1}`;
      const rawText = h2.textContent?.trim() || `Phần ${idx + 1}`;
      const shortText = rawText.replace(/^[0-9IVXLCDM\.\-\s]+/, '').slice(0, 26).trim();
      const tabLink = doc.createElement('a');
      tabLink.href = `#${secId}`;
      tabLink.className = `pillar-tab p-${(idx % 8) + 1}`;
      const iconClass = icons[idx % icons.length];
      tabLink.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${idx + 1}. ${shortText || rawText}`;
      navInner.appendChild(tabLink);
    });

    navEl.appendChild(navInner);

    if (chapterHeader && chapterHeader.parentNode) {
      chapterHeader.parentNode.insertBefore(navEl, chapterHeader.nextSibling);
    } else if (container) {
      container.insertBefore(navEl, container.firstChild);
    }
  }

  // Rewrite image sources to valid paths in SPA
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (!src) return;

    let targetSrc = src;
    if (src.includes('images/')) {
      const cleanImg = src.replace(/^(\.\.\/)+images\//i, '').replace(/^images\//i, '');
      targetSrc = `/src/content/pathophysiology/images/${cleanImg}`;
    } else if (src.startsWith('./') || (!src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:'))) {
      const cleanImg = src.replace(/^\.\//, '');
      if (isCaseStudy) {
        targetSrc = `/src/content/pathophysiology/pathophysiology-cases/${cleanImg}`;
      } else {
        targetSrc = `/src/content/pathophysiology/physiology/${part}/${cleanImg}`;
      }
    }

    img.setAttribute('src', targetSrc);

    // Add robust fallback handler
    img.setAttribute(
      'onerror',
      `if(!this.dataset.tried){this.dataset.tried='1';const s=this.getAttribute('src')||'';if(s.includes('Phan')){this.src=s.replace(/Phan(\\d+)/i,'part$1');}else if(s.includes('part')){this.src=s.replace(/part(\\d+)/i,'Phan$1');}else{this.style.display='none';const c=this.closest('.image-placeholder-card, .physio-figure, .image-drop-area');if(c){const fb=c.querySelector('.fallback-placeholder');if(fb)fb.style.display='block';}}}`
    );
  });

  // Wrap all table elements with responsive scrolling wrappers to prevent mobile overflow
  doc.querySelectorAll('table').forEach(tbl => {
    const parent = tbl.parentElement;
    if (!parent?.classList.contains('table-responsive') && !parent?.classList.contains('physio-table-wrap')) {
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
    <style id="physio-expanded-reader-styles">
      ${inlineStyles}
      
      /* Scope containment */
      #physio-article-mount {
        color: var(--color-text, #0f172a);
        line-height: 1.7;
        font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
      }
      #physio-article-mount .main-wrapper,
      #physio-article-mount .container,
      #physio-article-mount .content-area,
      #physio-article-mount .visual-container {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* Centered Elegant Card Container */
      #physio-article-mount .physio-article-container {
        max-width: 1140px;
        margin: 0 auto;
        padding: 2.25rem 2.5rem;
        background: var(--color-surface, #ffffff);
        border-radius: 20px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        border: 1px solid var(--color-border, #e2e8f0);
        box-sizing: border-box;
      }

      [data-theme="dark"] #physio-article-mount .physio-article-container {
        background: var(--color-surface, #1e293b);
        border-color: var(--color-border, #334155);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
      }

      @media (max-width: 768px) {
        #physio-article-mount .physio-article-container {
          padding: 1.25rem 1rem;
          border-radius: 12px;
        }
      }

      /* Hero Header Gradient Card */
      #physio-article-mount .chapter-header,
      #physio-article-mount .biochem-article-header,
      #physio-article-mount .physio-article-header {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0284c7 100%) !important;
        color: #ffffff !important;
        padding: 2.25rem 2rem !important;
        border-radius: 16px !important;
        margin-bottom: 1.75rem !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2) !important;
        position: relative !important;
        overflow: hidden !important;
        border: 1px solid rgba(255, 255, 255, 0.15) !important;
      }

      #physio-article-mount .chapter-header.hero-pediatric-theme,
      #physio-article-mount .chapter-header.pediatric-theme {
        background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 40%, #0284c7 70%, #0ea5e9 100%) !important;
      }

      [data-theme="dark"] #physio-article-mount .chapter-header.hero-pediatric-theme,
      [data-theme="dark"] #physio-article-mount .chapter-header.pediatric-theme {
        background: linear-gradient(135deg, #082f49 0%, #0c4a6e 40%, #0369a1 80%, #0284c7 100%) !important;
      }

      #physio-article-mount .chapter-header h1,
      #physio-article-mount .biochem-article-header h1,
      #physio-article-mount .physio-article-header h1 {
        color: #ffffff !important;
        font-size: clamp(1.5rem, 3.2vw, 2.1rem) !important;
        font-weight: 800 !important;
        margin: 0.25rem 0 0.75rem 0 !important;
        line-height: 1.3 !important;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25) !important;
      }

      #physio-article-mount .chapter-header p,
      #physio-article-mount .biochem-article-header p,
      #physio-article-mount .physio-article-header p {
        color: rgba(255, 255, 255, 0.95) !important;
        font-size: 1rem !important;
        line-height: 1.65 !important;
        margin: 0 !important;
        max-width: 960px !important;
      }

      #physio-article-mount .physio-badge,
      #physio-article-mount .biochem-badge,
      #physio-article-mount .module-hero-badge {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.5rem !important;
        background: rgba(255, 255, 255, 0.22) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        padding: 0.35rem 0.85rem !important;
        border-radius: 999px !important;
        font-size: 0.82rem !important;
        font-weight: 700 !important;
        margin-bottom: 0.85rem !important;
        border: 1px solid rgba(255, 255, 255, 0.35) !important;
        text-transform: uppercase !important;
        color: #ffffff !important;
      }

      /* Sticky Pillars Navigation with Safe Top Offset */
      #physio-article-mount .pillars-nav,
      #physio-article-mount .quicknav {
        position: sticky !important;
        top: 80px !important;
        z-index: 150 !important;
        background: var(--color-surface, #ffffff);
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 14px;
        padding: 0.75rem 1rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
      }

      @media (max-width: 767px) {
        #physio-article-mount .pillars-nav,
        #physio-article-mount .quicknav {
          top: 60px !important;
          border-radius: 10px !important;
          padding: 0.5rem 0.75rem !important;
          margin-bottom: 1.25rem !important;
        }
      }

      #physio-article-mount .pillars-nav-inner {
        display: flex;
        gap: 0.6rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      #physio-article-mount .pillars-nav-inner::-webkit-scrollbar,
      #physio-article-mount .quicknav::-webkit-scrollbar {
        height: 4px;
      }

      #physio-article-mount .pillars-nav-inner::-webkit-scrollbar-thumb,
      #physio-article-mount .quicknav::-webkit-scrollbar-thumb {
        background: var(--color-border, #cbd5e1);
        border-radius: 4px;
      }

      #physio-article-mount .pillar-tab,
      #physio-article-mount .quicknav-link {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.45rem 0.85rem;
        border-radius: 10px;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--color-text-muted, #64748b);
        border: 1px solid var(--color-border, #e2e8f0);
        background: var(--color-bg, #f8fafc);
        text-decoration: none;
        white-space: nowrap;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      #physio-article-mount .pillar-tab:hover,
      #physio-article-mount .pillar-tab.active,
      #physio-article-mount .quicknav-link:hover,
      #physio-article-mount .quicknav-link.active {
        border-color: var(--color-primary, #0284c7);
        color: var(--color-primary, #0284c7);
        background: rgba(2, 132, 199, 0.08);
        transform: translateY(-1px);
      }

      #physio-article-mount .pillar-tab.p-1 { border-left: 4px solid #0284c7; }
      #physio-article-mount .pillar-tab.p-2 { border-left: 4px solid #10b981; }
      #physio-article-mount .pillar-tab.p-3 { border-left: 4px solid #8b5cf6; }
      #physio-article-mount .pillar-tab.p-4 { border-left: 4px solid #f59e0b; }
      #physio-article-mount .pillar-tab.p-5 { border-left: 4px solid #06b6d4; }
      #physio-article-mount .pillar-tab.p-6 { border-left: 4px solid #ec4899; }
      #physio-article-mount .pillar-tab.p-7 { border-left: 4px solid #ef4444; }
      #physio-article-mount .pillar-tab.p-8 { border-left: 4px solid #3b82f6; }

      /* Medical Image & Illustration Cards */
      #physio-article-mount .image-placeholder-card,
      #physio-article-mount .physio-figure {
        background: var(--color-surface, #ffffff);
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 14px;
        padding: 1.25rem;
        margin: 1.75rem auto;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      #physio-article-mount .physio-figure img,
      #physio-article-mount .physio-img {
        display: block;
        margin: 0 auto;
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }

      #physio-article-mount .physio-figure figcaption {
        text-align: center;
        margin-top: 0.75rem;
        max-width: 800px;
      }

      #physio-article-mount .image-title {
        font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--color-primary, #0284c7);
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      #physio-article-mount .image-drop-area {
        background: var(--color-bg, #f8fafc);
        border: 1.5px dashed rgba(2, 132, 199, 0.3);
        border-radius: 10px;
        padding: 1.5rem;
        text-align: center;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 180px;
      }

      #physio-article-mount .image-description {
        font-size: 0.88rem;
        line-height: 1.6;
        color: var(--color-text-muted, #64748b);
        background: rgba(2, 132, 199, 0.04);
        border-left: 3px solid var(--color-primary, #0284c7);
        padding: 0.6rem 0.85rem;
        border-radius: 0 6px 6px 0;
      }

      #physio-article-mount .fallback-placeholder {
        padding: 1.5rem;
        text-align: center;
      }

      [data-theme="dark"] #physio-article-mount .image-placeholder-card,
      [data-theme="dark"] #physio-article-mount .physio-figure {
        background: var(--color-surface, #1e293b);
        border-color: var(--color-border, #334155);
      }

      [data-theme="dark"] #physio-article-mount .image-drop-area {
        background: var(--color-surface-2, #0f172a);
        border-color: rgba(56, 189, 248, 0.3);
      }

      [data-theme="dark"] #physio-article-mount .image-title {
        color: #38bdf8;
      }

      /* Section & Headings */
      #physio-article-mount .article-section,
      #physio-article-mount .physio-content {
        scroll-margin-top: 80px;
        margin-bottom: 2.25rem;
      }

      #physio-article-mount h2,
      #physio-article-mount .section-title {
        font-family: var(--font-display, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif);
        font-size: 1.35rem;
        font-weight: 800;
        color: var(--color-primary, #0284c7);
        border-bottom: 2px solid rgba(var(--color-primary-rgb, 2, 132, 199), 0.2);
        padding-bottom: 0.5rem;
        margin-top: 2.25rem;
        margin-bottom: 1.15rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.65rem;
        scroll-margin-top: 80px;
      }
      #physio-article-mount h2 i,
      #physio-article-mount .section-title i {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-size: 1rem;
        background: rgba(var(--color-primary-rgb, 2, 132, 199), 0.12);
        color: var(--color-primary, #0284c7);
        border-radius: 8px;
        flex-shrink: 0;
      }
      #physio-article-mount h3,
      #physio-article-mount .subsection-title {
        font-family: var(--font-display, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif);
        font-size: 1.12rem;
        font-weight: 700;
        color: var(--color-primary, #0284c7);
        margin-top: 1.65rem;
        margin-bottom: 0.85rem;
        padding: 0.45rem 0.85rem;
        border-left: 4px solid var(--color-primary, #0284c7);
        background: linear-gradient(90deg, rgba(var(--color-primary-rgb, 2, 132, 199), 0.08) 0%, transparent 100%);
        border-radius: 0 8px 8px 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      #physio-article-mount h4 {
        font-size: 1rem;
        font-weight: 700;
        color: var(--color-primary, #0284c7);
        margin-top: 1.25rem;
        margin-bottom: 0.5rem;
      }

      /* Core Boxes & Cards */
      #physio-article-mount .key-concept {
        background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(2, 132, 199, 0.02) 100%);
        border-left: 4px solid var(--color-primary, #0284c7);
        padding: 1.25rem 1.5rem;
        border-radius: 0 12px 12px 0;
        margin: 1.5rem 0;
        font-size: 0.95rem;
        line-height: 1.65;
      }

      #physio-article-mount .reaction-box {
        background: rgba(139, 92, 246, 0.08);
        border-left: 4px solid #8b5cf6;
        padding: 1.25rem 1.5rem;
        border-radius: 0 12px 12px 0;
        margin: 1.5rem 0;
      }

      #physio-article-mount .pearl-box {
        background: rgba(245, 158, 11, 0.08);
        border-left: 4px solid #f59e0b;
        padding: 1.25rem 1.5rem;
        border-radius: 0 12px 12px 0;
        margin: 1.5rem 0;
      }

      #physio-article-mount .danger-box {
        background: rgba(239, 68, 68, 0.08);
        border-left: 4px solid #ef4444;
        padding: 1.25rem 1.5rem;
        border-radius: 0 12px 12px 0;
        margin: 1.5rem 0;
      }

      #physio-article-mount .info-box {
        background: rgba(2, 132, 199, 0.08);
        border-left: 4px solid #0284c7;
        padding: 1.25rem 1.5rem;
        border-radius: 0 12px 12px 0;
        margin: 1.5rem 0;
      }

      #physio-article-mount .concept-grid,
      #physio-article-mount .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
        margin: 1.5rem 0;
      }

      #physio-article-mount .concept-card,
      #physio-article-mount .feature-card {
        background: var(--color-surface, #ffffff);
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 12px;
        padding: 1.25rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        transition: all 0.2s ease;
      }

      #physio-article-mount .concept-card:hover,
      #physio-article-mount .feature-card:hover {
        border-color: var(--color-primary, #0284c7);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(2, 132, 199, 0.08);
      }

      #physio-article-mount .term-hl {
        color: var(--color-primary, #0284c7);
        background: rgba(2, 132, 199, 0.08);
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-weight: 700;
      }

      #physio-article-mount .term-hl-secondary {
        color: #8b5cf6;
        background: rgba(139, 92, 246, 0.08);
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
        font-weight: 700;
      }

      #physio-article-mount table {
        width: 100%;
        border-collapse: collapse;
        margin: 1.5rem 0;
        background: var(--color-surface, #fff);
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--color-border, #e2e8f0);
        font-size: 0.92rem;
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

      /* Dark Mode Adaptations */
      [data-theme="dark"] #physio-article-mount .chapter-header,
      [data-theme="dark"] #physio-article-mount .biochem-article-header,
      [data-theme="dark"] #physio-article-mount .physio-article-header {
        background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e3a8a 100%);
      }

      [data-theme="dark"] #physio-article-mount .pillars-nav,
      [data-theme="dark"] #physio-article-mount .quicknav {
        background: var(--color-surface, #1e293b);
        border-color: var(--color-border, #334155);
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
      }

      [data-theme="dark"] #physio-article-mount .pillar-tab,
      [data-theme="dark"] #physio-article-mount .quicknav-link {
        background: var(--color-surface-2, #0f172a);
        border-color: var(--color-border, #334155);
        color: var(--color-text-muted, #94a3b8);
      }

      [data-theme="dark"] #physio-article-mount .pillar-tab:hover,
      [data-theme="dark"] #physio-article-mount .pillar-tab.active,
      [data-theme="dark"] #physio-article-mount .quicknav-link:hover,
      [data-theme="dark"] #physio-article-mount .quicknav-link.active {
        border-color: #38bdf8;
        color: #38bdf8;
        background: rgba(56, 189, 248, 0.12);
      }

      [data-theme="dark"] #physio-article-mount h2,
      [data-theme="dark"] #physio-article-mount .section-title,
      [data-theme="dark"] #physio-article-mount h3,
      [data-theme="dark"] #physio-article-mount .subsection-title {
        color: #38bdf8;
      }

      [data-theme="dark"] #physio-article-mount h2 i,
      [data-theme="dark"] #physio-article-mount .section-title i {
        background: rgba(56, 189, 248, 0.15);
        color: #38bdf8;
      }

      [data-theme="dark"] #physio-article-mount h3,
      [data-theme="dark"] #physio-article-mount .subsection-title {
        border-left-color: #38bdf8;
        background: linear-gradient(90deg, rgba(56, 189, 248, 0.12) 0%, transparent 100%);
      }

      [data-theme="dark"] #physio-article-mount .concept-card,
      [data-theme="dark"] #physio-article-mount .feature-card {
        background: var(--color-surface, #1e293b);
        border-color: var(--color-border, #334155);
      }

      [data-theme="dark"] #physio-article-mount table {
        background: var(--color-surface, #1e293b);
        border-color: var(--color-border, #334155);
      }

      [data-theme="dark"] #physio-article-mount th {
        background: var(--color-surface-2, #0f172a);
        color: var(--color-text, #f8fafc);
        border-color: var(--color-border, #334155);
      }

      [data-theme="dark"] #physio-article-mount td {
        border-color: var(--color-border, #334155);
      }

      /* Mobile Responsive Reader Overrides */
      #physio-article-mount .table-responsive,
      #physio-article-mount .physio-table-wrap {
        width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
        margin: 1.25rem 0 !important;
        border-radius: 10px !important;
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

        #physio-article-mount .physio-grid,
        #physio-article-mount .grid-2col,
        #physio-article-mount .concept-grid,
        #physio-article-mount .card-grid {
          grid-template-columns: 1fr !important;
          gap: 0.85rem !important;
        }

        #physio-article-mount table {
          font-size: 0.825rem !important;
          margin: 0.85rem 0 !important;
        }

        #physio-article-mount th,
        #physio-article-mount td {
          padding: 0.55rem 0.7rem !important;
        }

        #physio-article-mount .pillars-nav,
        #physio-article-mount .quicknav {
          top: 56px !important;
          padding: 0.45rem 0.65rem !important;
        }
      }
    </style>
    <div class="physio-injected-content">
      ${articleHtml}
    </div>
  `;

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
