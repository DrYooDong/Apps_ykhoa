/**
 * CliniPortal — Antibiotics & Antimicrobial Stewardship (AMS) SPA View
 * Path: src/content/basic-medical/antibiotics/views/antibiotics-hub-view.ts
 * Giao diện kinh điển Promax đồng bộ chuẩn 100% với Hóa Sinh, Sinh Lý & Cơ Chế Bệnh Sinh
 * (Promax Hero Shield SVG, Compact Toolkit Bar, Toolbar Search/Grid Toggle, Sticky Module-Nav 6 Khối, Specialty Cards)
 */

import '../../../../styles/components/module-dashboard.css';
import '../../../../styles/components/physio-content.css';
import '../../../../styles/components/formula-vault.css';
import '../../../../styles/components/biochemistry-hub.css';
import '../../../../styles/components/physio-promax-hub.css';
import '../../../../styles/components/epidemiology-hub.css';
import '../../css/basic-medical-mobile.css';

import { renderBasicMedicalNav, scrollActiveBasicMedicalNavIntoView } from '../../views/basic-medical-nav';
import { 
  ANTIBIOTIC_MODULES, 
  ANTIBIOTIC_TOOLS, 
  getAllAntibioticLessons 
} from '../data/antibiotics-curriculum-data';

export function renderAntibioticsHubView(): string {
  const allLessons = getAllAntibioticLessons();

  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <span style="color: #0284c7; font-weight: 600;">Kháng Sinh Học Lâm Sàng (AMS)</span>
      </div>

      <!-- UNIVERSAL STICKY SUB-NAV -->
      ${renderBasicMedicalNav('khang-sinh')}

      <!-- PROMAX LUXURY HERO SECTION -->
      <section class="promax-hero hero-antibiotics-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="promax-badge-pulse">
              <span class="pulse-dot"></span>
              <span>Antimicrobial Stewardship & Clinical Pharmacology • WHO AWaRe 2023 & IDSA</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🛡️ KHÁNG SINH HỌC LÂM SÀNG & AMS
            </h1>
            <p class="promax-hero-desc">
              Cầu nối thép giữa <strong>Vi Sinh Y Học</strong>, <strong>Dược Động / Dược Lực Học (PK/PD)</strong> và <strong>Ra Quyết Định Kê Đơn An Toàn Tại Giường Bệnh</strong>. 
              Chuẩn hóa phản xạ lâm sàng theo chiến lược Đèn Tín Hiệu WHO AWaRe 2023, bảng kiểm 8 điều D8 và ma trận xóa nhãn dị ứng Penicillin.
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-cubes-stacked" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">${ANTIBIOTIC_MODULES.length}</div>
                  <div class="promax-kpi-lbl">Khối Chuyên Đề</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-book-medical" style="font-size: 1.1rem; color: #34d399;"></i>
                <div>
                  <div class="promax-kpi-num">${allLessons.length}</div>
                  <div class="promax-kpi-lbl">Bài Học Chi Tiết</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-sliders" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">${ANTIBIOTIC_TOOLS.length} Tools</div>
                  <div class="promax-kpi-lbl">Bộ Công Cụ CDSS</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-traffic-light" style="font-size: 1.1rem; color: #f87171;"></i>
                <div>
                  <div class="promax-kpi-num">&ge; 60%</div>
                  <div class="promax-kpi-lbl">Access Target</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork (Shield & Molecular Core) -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.25));">
              <!-- Outer Pulsing Orbit -->
              <circle cx="50" cy="50" r="42" stroke="#ffffff" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
              <!-- Shield Armor Contour -->
              <path d="M50 14 L78 26 C78 54 50 82 50 82 C50 82 22 54 22 26 Z" stroke="#ffffff" stroke-width="3" fill="rgba(255,255,255,0.15)" stroke-linejoin="round"/>
              <!-- Beta-lactam 4-membered core ring -->
              <rect x="41" y="36" width="18" height="18" rx="3" stroke="#38bdf8" stroke-width="2.5" fill="rgba(56, 189, 248, 0.25)"/>
              <line x1="41" y1="45" x2="59" y2="45" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 2"/>
              <!-- Cross-hairs & Functional Groups -->
              <circle cx="50" cy="14" r="5" fill="#34d399"/>
              <circle cx="78" cy="26" r="4.5" fill="#38bdf8"/>
              <circle cx="22" cy="26" r="4.5" fill="#38bdf8"/>
              <circle cx="50" cy="82" r="5" fill="#fbbf24"/>
              <!-- Side chain R1 branch -->
              <line x1="59" y1="36" x2="72" y2="25" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="72" cy="25" r="4.5" fill="#f87171"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- COMPACT ISOLATED TOOLKIT SUITE (GÓC CÔNG CỤ KHÁNG SINH TINH GỌN) -->
      <div class="epi-compact-toolkit-bar" aria-label="Bộ công cụ kháng sinh học tương tác">
        <div class="epi-toolkit-badge">
          <i class="fa-solid fa-toolbox" style="color: #0284c7; font-size: 1rem;"></i>
          <span>Bộ Công Cụ Hỗ Trợ Kháng Sinh:</span>
        </div>
        <div class="epi-toolkit-pills">
          <a href="#/basic-medical/khang-sinh/tools/d8-safety-wizard" class="epi-tool-pill-btn tool-metabolic" title="Bảng kiểm 8 điều bắt buộc trước khi ký đơn thuốc kháng sinh nhằm chặn đứng sai sót liều">
            <i class="fa-solid fa-clipboard-check" style="color: #10b981;"></i>
            <span>D8 Prescribing Safety Wizard</span>
          </a>
          <a href="#/basic-medical/khang-sinh/tools/pkpd-simulator" class="epi-tool-pill-btn tool-sim" title="Trực quan hóa nồng độ thuốc theo thời gian trên Canvas/SVG: so sánh tiêm ngắt quãng vs truyền kéo dài">
            <i class="fa-solid fa-chart-line" style="color: #0284c7;"></i>
            <span>Mô Phỏng Truyền Kéo Dài PK/PD</span>
          </a>
          <a href="#/basic-medical/khang-sinh/tools/aware-navigator" class="epi-tool-pill-btn tool-formula" title="Tra cứu tức thì 180+ hoạt chất theo phân loại WHO AWaRe 2023 kèm cảnh báo đề kháng">
            <i class="fa-solid fa-traffic-light" style="color: #f59e0b;"></i>
            <span>WHO AWaRe 2023 Navigator</span>
          </a>
          <a href="#/basic-medical/khang-sinh/tools/delabeling-matrix" class="epi-tool-pill-btn tool-quiz" title="Thuật toán phân tầng nguy cơ dị ứng thực sự vs phản ứng chéo chuỗi bên R1/R2">
            <i class="fa-solid fa-shield-halved" style="color: #f43f5e;"></i>
            <span>Ma Trận Xóa Nhãn Dị Ứng</span>
          </a>
          <a href="#/basic-medical/khang-sinh/tools/iv-po-stepdown" class="epi-tool-pill-btn tool-metabolic" title="Đánh giá 4 tiêu chuẩn lâm sàng ổn định và đề xuất kháng sinh uống tương đương">
            <i class="fa-solid fa-pills" style="color: #0d9488;"></i>
            <span>Đánh Giá Chuyển Đổi IV-to-PO</span>
          </a>
        </div>
      </div>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm bài học kháng sinh (Beta-lactam, PK/PD, Vancomycin, TDM, CRE, Pseudomonas, D8, AWaRe...)..." aria-label="Tìm kiếm chuyên đề kháng sinh">
          <span class="promax-shortcut-pill">Ctrl + K</span>
          <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none; position: absolute; right: 4.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        </div>

        <div class="view-toggle-container" style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="toggle-label" style="font-size: 0.825rem; font-weight: 600; color: var(--color-text-muted);">Hiển thị:</span>
          <div class="toggle-buttons">
            <button id="view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button id="view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
              <i class="fa-solid fa-list-ul"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- MOBILE BLOCK PICKER TRIGGER (VISIBLE ON MOBILE ONLY) -->
      <button class="bm-mobile-drawer-trigger" id="bmSystemPickerBtn" type="button" aria-label="Chọn khối kháng sinh">
        <span><i class="fa-solid fa-shield-virus" style="color: var(--dsp-sky, #0284c7); margin-right: 6px;"></i> Danh mục 6 Modules Kháng Sinh</span>
        <span style="font-size: 0.8rem; color: var(--dsp-sky, #0284c7); font-weight: 800; display: flex; align-items: center; gap: 4px;">
          <span>Xem tất cả</span>
          <i class="fa-solid fa-chevron-down"></i>
        </span>
      </button>

      <!-- MOBILE BOTTOM SHEET DRAWER -->
      <div class="bm-mobile-drawer-backdrop" id="bmMobileDrawerBackdrop"></div>
      <div class="bm-mobile-drawer-sheet" id="bmMobileDrawerSheet" role="dialog" aria-modal="true" aria-label="Chọn khối kháng sinh">
        <div class="bm-drawer-header">
          <h3 class="bm-drawer-title">
            <i class="fa-solid fa-shield-virus" style="color: var(--dsp-sky, #0284c7);"></i>
            <span>Khối Chuyên Đề Kháng Sinh (6 Modules)</span>
          </h3>
          <button class="bm-drawer-close-btn" id="bmMobileDrawerClose" aria-label="Đóng">&times;</button>
        </div>
        <div class="bm-drawer-body">
          ${ANTIBIOTIC_MODULES.map((m, idx) => `
            <a href="#${m.key}-section" class="bm-drawer-item ${idx === 0 ? 'active' : ''}">
              <span><i class="fa-solid ${m.icon}" style="margin-right:8px; color:#0284c7;"></i> M${m.number}. ${m.shortTitle}</span>
              <span class="bm-drawer-item-badge">${m.lessons.length}</span>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- DASHBOARD LAYOUT -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục khối chuyên đề kháng sinh">
          <div class="nav-sidebar-sticky" id="physio-nav">
            <div class="nav-sidebar-header">
              <div class="nav-sidebar-title-wrap">
                <i class="fa-solid fa-layer-group nav-sidebar-header-icon"></i>
                <span>Khối Chuyên Đề</span>
              </div>
              <span class="nav-sidebar-total-badge">6 Modules</span>
            </div>
            <ul class="part-nav-list">
              ${ANTIBIOTIC_MODULES.map((m, idx) => `
                <li>
                  <a href="#${m.key}-section" class="part-nav-item p${idx + 1} ${idx === 0 ? 'active' : ''}" data-target="${m.key}-section">
                    <div class="part-nav-left">
                      <span class="part-icon"><i class="fa-solid ${m.icon}"></i></span>
                      <span class="part-text">M${m.number}. ${m.shortTitle}</span>
                    </div>
                    <span class="part-count-badge">${m.lessons.length}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="layout-content-area" id="lessons-container">
          <!-- Empty Search State -->
          <div id="empty-search-state" class="empty-search-state" style="display: none;">
            <div class="empty-search-icon">🔍</div>
            <h3>Không tìm thấy bài học kháng sinh nào</h3>
            <p>Vui lòng thử từ khóa khác (ví dụ: Beta-lactam, Vancomycin, TDM, CRE, Pseudomonas, D8, AWaRe...).</p>
          </div>

          <!-- 6 MODULES SECTIONS -->
          ${ANTIBIOTIC_MODULES.map(module => `
            <section id="${module.key}-section" aria-labelledby="${module.key}-heading" style="margin-bottom: 2rem;">
              <div class="physio-group-container">
                <div class="physio-group-header">
                  <span class="physio-group-icon" style="color: ${module.color}; background: ${module.bgColor || 'rgba(2, 132, 199, 0.1)'};">
                    <i class="fa-solid ${module.icon}"></i>
                  </span>
                  <div>
                    <h3 id="${module.key}-heading">M${module.number}. ${module.title}</h3>
                    <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">${module.clinicalObjective || module.description}</p>
                  </div>
                </div>

                <div class="specialty-grid">
                  ${module.lessons.map(lesson => `
                    <a href="#/basic-medical/khang-sinh/${module.key}/${lesson.slug}" class="specialty-card" data-lesson-id="${lesson.id}">
                      <div class="specialty-card-top">
                        <div class="specialty-icon" style="background: ${module.bgColor || 'rgba(2, 132, 199, 0.1)'}; color: ${module.color};">
                          <i class="fa-solid ${module.icon}"></i>
                        </div>
                        <div class="specialty-info">
                          <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
                            <span style="font-size: 0.72rem; font-weight: 700; background: var(--color-bg, #f1f5f9); color: var(--color-primary, #0284c7); padding: 0.1rem 0.4rem; border-radius: 4px;">M${module.number}.${lesson.lessonNumber}</span>
                            ${lesson.isNewEbm2026 ? `<span style="font-size: 0.68rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px; background: rgba(16, 185, 129, 0.15); color: #10b981;">EBM 2026</span>` : ''}
                            <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);"><i class="fa-regular fa-clock" style="font-size: 0.65rem;"></i> ${lesson.estimatedMinutes}p</span>
                          </div>
                          <h3>${lesson.title}</h3>
                          <p>${lesson.description}</p>
                          
                          <!-- Key Takeaway Pearl Box -->
                          <div style="margin-top: 0.45rem; background: rgba(2, 132, 199, 0.05); border-left: 3px solid var(--color-primary, #0284c7); padding: 5px 8px; border-radius: 0 4px 4px 0; font-size: 0.75rem; color: var(--color-text); line-height: 1.45;">
                            <strong style="color: var(--color-primary, #0284c7);"><i class="fa-solid fa-lightbulb" style="font-size: 0.7rem; color: #f59e0b;"></i> Pearl:</strong> ${lesson.keyTakeaway}
                          </div>

                          <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.45rem;">
                            ${lesson.tags.slice(0, 3).map(tag => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">#${tag}</span>`).join('')}
                          </div>
                        </div>
                      </div>
                      <div class="specialty-card-action">
                        <span>Xem bài giảng</span>
                        <i class="fa-solid fa-chevron-right"></i>
                      </div>
                    </a>
                  `).join('')}
                </div>
              </div>
            </section>
          `).join('')}
        </main>
      </div>

    </div>

    <!-- QUICK PREVIEW MODAL / DRAWER -->
    <div class="biochem-modal-backdrop" id="antibioticsModalBackdrop">
      <div class="biochem-modal" id="antibioticsModalContainer" role="dialog" aria-modal="true"></div>
    </div>
  `;
}

export function initAntibioticsHubView(): void {
  scrollActiveBasicMedicalNavIntoView();

  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const lessonsContainer = document.getElementById('lessons-container') as HTMLElement | null;
  const navItems = document.querySelectorAll('.part-nav-item');
  const sections = document.querySelectorAll('.layout-content-area > section');

  // Mobile Drawer elements
  const mobileDrawerTrigger = document.getElementById('bmSystemPickerBtn');
  const mobileDrawerBackdrop = document.getElementById('bmMobileDrawerBackdrop');
  const mobileDrawerSheet = document.getElementById('bmMobileDrawerSheet');
  const mobileDrawerClose = document.getElementById('bmMobileDrawerClose');

  // 1. Live Search
  function performSearch(query: string): void {
    const q = query.toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    let totalVisible = 0;

    sections.forEach(sec => {
      const sectionEl = sec as HTMLElement;
      const cards = sectionEl.querySelectorAll('.specialty-card');
      let sectionVisibleCount = 0;

      cards.forEach(card => {
        const cardEl = card as HTMLElement;
        const text = cardEl.textContent?.toLowerCase() || '';
        if (!q || text.includes(q)) {
          cardEl.style.display = '';
          sectionVisibleCount++;
          totalVisible++;
        } else {
          cardEl.style.display = 'none';
        }
      });

      sectionEl.style.display = sectionVisibleCount > 0 ? '' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = totalVisible === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch((e.target as HTMLInputElement).value);
    });

    // Ctrl + K Shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
  }

  // 2. View Toggle (Grid / List)
  if (viewGridBtn && viewListBtn && lessonsContainer) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.remove('list-view'));
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.add('list-view'));
    });
  }

  // 3. Scroll Spy for Sticky Nav Sidebar
  function updateScrollSpy(): void {
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const sectionEl = sec as HTMLElement;
      if (sectionEl.style.display === 'none') return;

      const top = sectionEl.offsetTop;
      const height = sectionEl.offsetHeight;
      const id = sectionEl.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // 4. Smooth Scroll when clicking nav item
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 100;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // 5. Mobile Drawer Handlers
  function openMobileDrawer(): void {
    if (mobileDrawerBackdrop && mobileDrawerSheet) {
      mobileDrawerBackdrop.classList.add('active');
      mobileDrawerSheet.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer(): void {
    if (mobileDrawerBackdrop && mobileDrawerSheet) {
      mobileDrawerBackdrop.classList.remove('active');
      mobileDrawerSheet.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileDrawerTrigger) {
    mobileDrawerTrigger.addEventListener('click', openMobileDrawer);
  }
  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }
  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  const drawerLinks = document.querySelectorAll('.bm-drawer-item');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });
}
