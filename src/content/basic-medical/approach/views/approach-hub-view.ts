/**
 * CliniPortal — Clinical Approach Subsystem (Tiếp Cận Lâm Sàng) SPA Hub View
 * Path: src/content/basic-medical/approach/views/approach-hub-view.ts
 *
 * Giao diện Promax đồng bộ 100% với Sinh Lý, Hóa Sinh, CCBS & Kháng Sinh:
 * - Universal Sticky Basic Medical Nav (tab 'tiep-can')
 * - Promax Hero với Pure Editorial SVG Clinical Compass
 * - Bộ lọc theo Trạng thái (Đã xuất bản / Tất cả) & Mức khẩn cấp (Tối khẩn / Khẩn / Thường quy)
 * - Tìm kiếm tức thì (Ctrl + K), chuyển đổi Grid / List
 * - Sticky 13-Specialty Sidebar & Mobile Bottom Sheet Drawer
 * - Preview Modal cho các chuyên đề đang biên soạn (tránh 404)
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
  APPROACH_SPECIALTIES,
  getAllApproachLessons,
  getPublishedApproachLessons
} from '../data/approach-curriculum-data';
import { renderUrgencyPill } from '../components/UrgencyPill';
import { ApproachLesson } from '../types/approach.types';

export function renderApproachHubView(): string {
  const allLessons = getAllApproachLessons();
  const publishedLessons = getPublishedApproachLessons();
  const vaultReadyCount = allLessons.filter(l => l.hasVaultSource).length;

  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp;
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
        <span style="color: #e11d48; font-weight: 700;">Tiếp Cận Lâm Sàng (13 Chuyên Khoa)</span>
      </div>

      <!-- UNIVERSAL STICKY SUB-NAV -->
      ${renderBasicMedicalNav('tiep-can')}

      <!-- PROMAX LUXURY HERO SECTION -->
      <section class="promax-hero hero-approach-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="promax-badge-pulse">
              <span class="pulse-dot"></span>
              <span>Symptom-to-Diagnosis Framework • 9-Step Red Flags First • EBM 2026</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🩺 TIẾP CẬN LÂM SÀNG THEO CHUYÊN KHOA
            </h1>
            <p class="promax-hero-desc">
              Hệ thống hóa tư duy chẩn đoán từ <strong>Triệu Chứng &amp; Hội Chứng Đầu Vào</strong> qua lăng kính <strong>Sinh Lý Bệnh</strong>,
              ưu tiên nhận diện <strong>Dấu Hiệu Báo Động (Red Flags)</strong>, chẩn đoán phân biệt 2 tầng và lưu đồ quyết định Pure SVG tại giường bệnh.
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-stethoscope" style="font-size: 1.1rem; color: #fda4af;"></i>
                <div>
                  <div class="promax-kpi-num">${APPROACH_SPECIALTIES.length}</div>
                  <div class="promax-kpi-lbl">Chuyên Khoa</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-book-medical" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">${allLessons.length}</div>
                  <div class="promax-kpi-lbl">Chuyên Đề Tiếp Cận</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-circle-check" style="font-size: 1.1rem; color: #34d399;"></i>
                <div>
                  <div class="promax-kpi-num">${publishedLessons.length}</div>
                  <div class="promax-kpi-lbl">Bài MDX Xuất Bản</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-database" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">${vaultReadyCount}</div>
                  <div class="promax-kpi-lbl">Sẵn Nguồn Vault</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork (Clinical Diagnostic Compass SVG) -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.25));">
              <circle cx="50" cy="50" r="42" stroke="#ffffff" stroke-width="2" stroke-dasharray="5 4" opacity="0.65"/>
              <circle cx="50" cy="50" r="30" stroke="#ffffff" stroke-width="2.5" fill="rgba(255,255,255,0.12)"/>
              <polygon points="50,16 57,46 50,52 43,46" fill="#fda4af" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"/>
              <polygon points="50,84 57,54 50,48 43,54" fill="#ffffff" opacity="0.85"/>
              <line x1="16" y1="50" x2="28" y2="50" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="72" y1="50" x2="84" y2="50" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
              <circle cx="50" cy="50" r="5" fill="#fbbf24" stroke="#ffffff" stroke-width="2"/>
              <circle cx="50" cy="10" r="3.5" fill="#34d399"/>
              <circle cx="90" cy="50" r="3.5" fill="#38bdf8"/>
              <circle cx="10" cy="50" r="3.5" fill="#38bdf8"/>
              <circle cx="50" cy="90" r="3.5" fill="#fda4af"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- QUICK FILTER BAR (URGENCY & PUBLICATION STATUS) -->
      <div class="epi-compact-toolkit-bar" aria-label="Bộ lọc nhanh chuyên đề tiếp cận">
        <div class="epi-toolkit-badge">
          <i class="fa-solid fa-filter" style="color: #e11d48; font-size: 0.95rem;"></i>
          <span>Lọc nhanh:</span>
        </div>
        <div class="epi-toolkit-pills" id="approach-filter-pills">
          <button type="button" class="epi-tool-pill-btn approach-filter-btn active" data-filter-type="all" style="cursor: pointer;">
            <i class="fa-solid fa-layer-group" style="color: #0284c7;"></i>
            <span>Tất cả (${allLessons.length})</span>
          </button>
          <button type="button" class="epi-tool-pill-btn approach-filter-btn" data-filter-type="published" style="cursor: pointer;">
            <i class="fa-solid fa-star" style="color: #10b981;"></i>
            <span>Đã xuất bản (${publishedLessons.length})</span>
          </button>
          <button type="button" class="epi-tool-pill-btn approach-filter-btn" data-filter-type="emergent" style="cursor: pointer;">
            <i class="fa-solid fa-triangle-exclamation" style="color: #e11d48;"></i>
            <span>Tối khẩn (Emergent)</span>
          </button>
          <button type="button" class="epi-tool-pill-btn approach-filter-btn" data-filter-type="urgent" style="cursor: pointer;">
            <i class="fa-solid fa-clock" style="color: #f59e0b;"></i>
            <span>Khẩn cấp (Urgent)</span>
          </button>
          <button type="button" class="epi-tool-pill-btn approach-filter-btn" data-filter-type="routine" style="cursor: pointer;">
            <i class="fa-solid fa-circle-check" style="color: #0d9488;"></i>
            <span>Thường quy (Routine)</span>
          </button>
        </div>
      </div>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="approach-lesson-search" class="promax-search-input" placeholder="Tìm triệu chứng, hội chứng (Đau ngực, Hạ Natri, Trẻ sốt, Sốc, Khó thở, AKI, Ngất, HEART, NICE...)..." aria-label="Tìm kiếm chuyên đề tiếp cận lâm sàng">
          <span class="promax-shortcut-pill">Ctrl + K</span>
          <button id="approach-clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none; position: absolute; right: 4.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        </div>

        <div class="view-toggle-container" style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="toggle-label" style="font-size: 0.825rem; font-weight: 600; color: var(--color-text-muted);">Hiển thị:</span>
          <div class="toggle-buttons">
            <button id="approach-view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button id="approach-view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
              <i class="fa-solid fa-list-ul"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- MOBILE SPECIALTY PICKER TRIGGER -->
      <button class="bm-mobile-drawer-trigger" id="bmApproachPickerBtn" type="button" aria-label="Chọn chuyên khoa tiếp cận">
        <span><i class="fa-solid fa-stethoscope" style="color: #e11d48; margin-right: 6px;"></i> Danh mục 13 Chuyên Khoa Tiếp Cận</span>
        <span style="font-size: 0.8rem; color: #e11d48; font-weight: 800; display: flex; align-items: center; gap: 4px;">
          <span>Xem tất cả</span>
          <i class="fa-solid fa-chevron-down"></i>
        </span>
      </button>

      <!-- DASHBOARD LAYOUT -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục 13 chuyên khoa tiếp cận">
          <div class="nav-sidebar-sticky" id="approach-nav">
            <div class="nav-sidebar-header">
              <div class="nav-sidebar-title-wrap">
                <i class="fa-solid fa-stethoscope nav-sidebar-header-icon"></i>
                <span>Chuyên Khoa</span>
              </div>
              <span class="nav-sidebar-total-badge">13 CK</span>
            </div>
            <ul class="part-nav-list">
              ${APPROACH_SPECIALTIES.map((spec, idx) => `
                <li>
                  <a href="#${spec.key}-section" class="part-nav-item p${(idx % 9) + 1} ${idx === 0 ? 'active' : ''}" data-target="${spec.key}-section">
                    <div class="part-nav-left">
                      <span class="part-icon"><i class="fa-solid ${spec.icon}"></i></span>
                      <span class="part-text">CK${String(spec.number).padStart(2, '0')}. ${spec.shortTitle}</span>
                    </div>
                    <span class="part-count-badge">${spec.lessons.length}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="layout-content-area" id="approach-lessons-container">
          <!-- Empty Search State -->
          <div id="approach-empty-search-state" class="empty-search-state" style="display: none;">
            <div class="empty-search-icon">🔍</div>
            <h3>Không tìm thấy chuyên đề tiếp cận phù hợp</h3>
            <p>Thử từ khóa khác (ví dụ: Đau ngực, Hạ Natri, Trẻ sốt, Sốc, Đau bụng, AKI, Ngất...) hoặc đặt lại bộ lọc.</p>
          </div>

          <!-- 13 SPECIALTY SECTIONS -->
          ${APPROACH_SPECIALTIES.map(spec => {
            const pubInSpec = spec.lessons.filter(l => l.status === 'published').length;
            return `
            <section id="${spec.key}-section" aria-labelledby="${spec.key}-heading" style="margin-bottom: 2rem;">
              <div class="physio-group-container">
                <div class="physio-group-header">
                  <span class="physio-group-icon" style="color: ${spec.color}; background: ${spec.bgColor || 'rgba(225, 29, 72, 0.1)'};">
                    <i class="fa-solid ${spec.icon}"></i>
                  </span>
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                      <h3 id="${spec.key}-heading" style="margin: 0;">CK${String(spec.number).padStart(2, '0')}. ${spec.title}</h3>
                      <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: var(--color-bg, #f1f5f9); color: var(--color-text-muted, #64748b); border: 1px solid var(--color-border, #e2e8f0);">
                        ${spec.lessons.length > 0 ? `${pubInSpec}/${spec.lessons.length} đã xuất bản` : 'Chưa có bài MDX'}
                      </span>
                    </div>
                    <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">${spec.clinicalObjective || spec.description}</p>
                  </div>
                </div>

                ${spec.lessons.length > 0
                  ? `<div class="specialty-grid">
                      ${spec.lessons.map(lesson => renderApproachLessonCard(spec.color, spec.bgColor || 'rgba(225,29,72,0.1)', spec.icon, lesson)).join('')}
                    </div>`
                  : `<div style="padding: 1rem 1.25rem; border-radius: 12px; border: 1px dashed var(--color-border, #cbd5e1); background: var(--color-bg, #f8fafc); color: var(--color-text-muted, #64748b); font-size: 0.85rem; display: flex; align-items: center; gap: 0.6rem;">
                      <i class="fa-regular fa-folder-open" style="color: ${spec.color};"></i>
                      <span>Chưa có bài học MDX nào trong chuyên khoa này.</span>
                    </div>`
                }
              </div>
            </section>
          `;
          }).join('')}
        </main>
      </div>

    </div>

    <!-- DRAFT PREVIEW MODAL -->
    <div class="biochem-modal-backdrop" id="approachDraftModalBackdrop" style="display: none;">
      <div class="biochem-modal" id="approachDraftModalContainer" role="dialog" aria-modal="true" style="max-width: 560px; padding: 1.5rem;"></div>
    </div>

    <!-- MOBILE BOTTOM SHEET DRAWER -->
    <div class="bm-mobile-drawer-backdrop" id="bmApproachDrawerBackdrop"></div>
    <div class="bm-mobile-drawer-sheet" id="bmApproachDrawerSheet" role="dialog" aria-modal="true" aria-label="Chọn chuyên khoa tiếp cận">
      <div class="bm-drawer-header">
        <h3 class="bm-drawer-title">
          <i class="fa-solid fa-stethoscope" style="color: #e11d48;"></i>
          <span>13 Chuyên Khoa Tiếp Cận</span>
        </h3>
        <button class="bm-drawer-close-btn" id="bmApproachDrawerClose" aria-label="Đóng">&times;</button>
      </div>
      <div class="bm-drawer-body">
        ${APPROACH_SPECIALTIES.map((spec, idx) => `
          <a href="#${spec.key}-section" class="bm-drawer-item ${idx === 0 ? 'active' : ''}" data-drawer-target="${spec.key}-section">
            <span><i class="fa-solid ${spec.icon}" style="margin-right:8px; color:${spec.color};"></i> CK${String(spec.number).padStart(2, '0')}. ${spec.shortTitle}</span>
            <span class="bm-drawer-item-badge">${spec.lessons.length}</span>
          </a>
        `).join('')}
      </div>
    </div>
  `;
}

function renderApproachLessonCard(
  color: string,
  bgColor: string,
  icon: string,
  lesson: ApproachLesson
): string {
  const isPublished = lesson.status === 'published';
  const href = isPublished
    ? `#/basic-medical/tiep-can/${lesson.specialtyKey}/${lesson.slug}`
    : `#approach-draft-${lesson.id}`;

  const statusBadge = isPublished
    ? `<span style="font-size: 0.68rem; font-weight: 800; padding: 0.12rem 0.45rem; border-radius: 4px; background: rgba(16, 185, 129, 0.15); color: #059669;"><i class="fa-solid fa-circle-check"></i> ${lesson.isGoldenTemplate ? 'GOLDEN MDX' : 'ĐÃ XUẤT BẢN'}</span>`
    : `<span style="font-size: 0.68rem; font-weight: 700; padding: 0.12rem 0.45rem; border-radius: 4px; background: var(--color-bg, #f1f5f9); color: var(--color-text-muted, #64748b); border: 1px solid var(--color-border, #e2e8f0);">${lesson.hasVaultSource ? 'Sẵn nguồn Vault' : 'Kế hoạch EBM'}</span>`;

  return `
    <a href="${href}"
       class="specialty-card ${isPublished ? 'approach-card-published' : 'approach-card-draft'}"
       data-lesson-id="${lesson.id}"
       data-status="${lesson.status}"
       data-urgency="${lesson.urgency}"
       data-specialty="${lesson.specialtyKey}"
       style="${!isPublished ? 'opacity: 0.88;' : ''}">
      <div class="specialty-card-top">
        <div class="specialty-icon" style="background: ${bgColor}; color: ${color};">
          <i class="fa-solid ${icon}"></i>
        </div>
        <div class="specialty-info">
          <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.3rem;">
            <span style="font-size: 0.72rem; font-weight: 800; background: var(--color-bg, #f1f5f9); color: ${color}; padding: 0.1rem 0.42rem; border-radius: 4px;">${lesson.code}</span>
            ${renderUrgencyPill(lesson.urgency, lesson.urgency === 'emergent' ? 'TỐI KHẨN' : lesson.urgency === 'urgent' ? 'KHẨN' : 'THƯỜNG QUY')}
            ${statusBadge}
          </div>
          <h3>${lesson.title}</h3>
          <p>${lesson.description}</p>

          <!-- Key Takeaway Pearl Box -->
          <div style="margin-top: 0.45rem; background: rgba(225, 29, 72, 0.05); border-left: 3px solid ${color}; padding: 5px 8px; border-radius: 0 4px 4px 0; font-size: 0.75rem; color: var(--color-text); line-height: 1.45;">
            <strong style="color: ${color};"><i class="fa-solid fa-gem" style="font-size: 0.7rem;"></i> Chốt lâm sàng:</strong> ${lesson.keyTakeaway}
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.45rem;">
            ${lesson.tags.slice(0, 4).map(tag => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">#${tag}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="specialty-card-action">
        <span>${isPublished ? 'Mở bài tiếp cận MDX' : 'Xem khung dự kiến'}</span>
        <i class="fa-solid ${isPublished ? 'fa-chevron-right' : 'fa-circle-info'}"></i>
      </div>
    </a>
  `;
}

export function initApproachHubView(): void {
  scrollActiveBasicMedicalNavIntoView();

  const searchInput = document.getElementById('approach-lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('approach-clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('approach-empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('approach-view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('approach-view-list-btn') as HTMLElement | null;
  const lessonsContainer = document.getElementById('approach-lessons-container') as HTMLElement | null;
  const navItems = document.querySelectorAll('#approach-nav .part-nav-item');
  const sections = document.querySelectorAll('#approach-lessons-container > section');
  const filterBtns = document.querySelectorAll('.approach-filter-btn');

  // Mobile Drawer elements
  const mobileDrawerTrigger = document.getElementById('bmApproachPickerBtn');
  const mobileDrawerBackdrop = document.getElementById('bmApproachDrawerBackdrop');
  const mobileDrawerSheet = document.getElementById('bmApproachDrawerSheet');
  const mobileDrawerClose = document.getElementById('bmApproachDrawerClose');

  // Draft preview modal
  const draftModalBackdrop = document.getElementById('approachDraftModalBackdrop');
  const draftModalContainer = document.getElementById('approachDraftModalContainer');

  let activeFilter = 'all';

  function applyFilters(): void {
    const q = (searchInput?.value || '').toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    let totalVisible = 0;

    sections.forEach(sec => {
      const sectionEl = sec as HTMLElement;
      const cards = sectionEl.querySelectorAll('.specialty-card');
      let sectionVisibleCount = 0;

      cards.forEach(card => {
        const cardEl = card as HTMLElement;
        const text = cardEl.textContent?.toLowerCase() || '';
        const status = cardEl.getAttribute('data-status') || '';
        const urgency = cardEl.getAttribute('data-urgency') || '';

        const matchQuery = !q || text.includes(q);
        let matchFilter = true;
        if (activeFilter === 'published') matchFilter = status === 'published';
        else if (activeFilter === 'emergent' || activeFilter === 'urgent' || activeFilter === 'routine') {
          matchFilter = urgency === activeFilter;
        }

        if (matchQuery && matchFilter) {
          cardEl.style.display = '';
          sectionVisibleCount++;
          totalVisible++;
        } else {
          cardEl.style.display = 'none';
        }
      });

      const showEmptySpecialty = activeFilter === 'all' && !q;
      sectionEl.style.display = (sectionVisibleCount > 0 || showEmptySpecialty) ? '' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = (totalVisible === 0 && (activeFilter !== 'all' || !!q)) ? 'block' : 'none';
    }
  }

  // 1. Filter Pills
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-filter-type') || 'all';
      filterBtns.forEach(b => {
        b.classList.remove('active');
        (b as HTMLElement).style.borderColor = '';
        (b as HTMLElement).style.fontWeight = '';
      });
      btn.classList.add('active');
      (btn as HTMLElement).style.borderColor = '#e11d48';
      (btn as HTMLElement).style.fontWeight = '800';
      applyFilters();
    });
  });

  // 2. Live Search
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        const currentInput = document.getElementById('approach-lesson-search') as HTMLInputElement | null;
        if (currentInput) {
          e.preventDefault();
          currentInput.focus();
          currentInput.select();
        }
      }
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      applyFilters();
      searchInput.focus();
    });
  }

  // 3. View Toggle (Grid / List)
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

  // 4. Draft Card Preview Modal (prevents dead 404 navigation)
  const allLessonsMap = new Map(getAllApproachLessons().map(l => [l.id, l]));

  function closeDraftModal(): void {
    if (draftModalBackdrop) {
      draftModalBackdrop.style.display = 'none';
      draftModalBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (draftModalBackdrop) {
    draftModalBackdrop.addEventListener('click', (e) => {
      if (e.target === draftModalBackdrop) closeDraftModal();
    });
  }

  document.querySelectorAll('.approach-card-draft').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = card.getAttribute('data-lesson-id') || '';
      const lesson = allLessonsMap.get(id);
      if (!lesson || !draftModalBackdrop || !draftModalContainer) return;

      draftModalContainer.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 0.45rem;">
              <span style="font-size: 0.75rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; background: rgba(225, 29, 72, 0.12); color: #e11d48;">${lesson.code}</span>
              ${renderUrgencyPill(lesson.urgency)}
            </div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--color-text);">${lesson.title}</h3>
            <p style="margin: 0.25rem 0 0; font-size: 0.82rem; color: var(--color-text-muted);">${lesson.specialtyTitle}</p>
          </div>
          <button type="button" id="closeApproachDraftBtn" aria-label="Đóng" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); line-height: 1;">&times;</button>
        </div>

        <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text); margin-bottom: 1rem;">${lesson.description}</p>

        <div style="background: rgba(2, 132, 199, 0.07); border-left: 3px solid var(--color-primary, #0284c7); padding: 0.75rem 1rem; border-radius: 0 8px 8px 0; margin-bottom: 1rem; font-size: 0.85rem; color: var(--color-text);">
          <strong><i class="fa-solid fa-gem" style="color: #0284c7;"></i> Chốt lâm sàng cốt lõi:</strong> ${lesson.keyTakeaway}
        </div>

        <div style="font-size: 0.82rem; color: var(--color-text-muted); background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
          <div style="font-weight: 700; color: var(--color-text); margin-bottom: 0.35rem;">
            <i class="fa-solid fa-hourglass-half" style="color: #f59e0b;"></i> Trạng thái biên soạn MDX (9 mục chuẩn)
          </div>
          <div>• <strong>Nguồn tri thức:</strong> ${lesson.hasVaultSource ? `Đã có dữ liệu đầy đủ tại <code>${lesson.vaultFile}</code> (Pha 2 nhập hàng loạt).` : `Dàn ý khung tại Vault — sẽ soạn chuyên sâu theo EBM 2026 (Pha 3).`}</div>
          <div style="margin-top: 0.25rem;">• <strong>Đường dẫn MDX mục tiêu:</strong> <code>approach/${lesson.specialtyKey}/${lesson.slug}.mdx</code></div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button type="button" id="closeApproachDraftOkBtn" class="btn btn-primary" style="padding: 0.55rem 1.25rem; border-radius: 8px; border: none; background: var(--color-primary, #0284c7); color: #ffffff; font-weight: 700; cursor: pointer;">Đóng</button>
        </div>
      `;

      draftModalBackdrop.style.display = 'flex';
      draftModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';

      document.getElementById('closeApproachDraftBtn')?.addEventListener('click', closeDraftModal);
      document.getElementById('closeApproachDraftOkBtn')?.addEventListener('click', closeDraftModal);
    });
  });

  // 5. Scroll Spy & Smooth Scroll
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
          item.classList.toggle('active', item.getAttribute('data-target') === id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  function scrollToSection(targetId: string): void {
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;
      scrollToSection(targetId);
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // 6. Mobile Drawer Handlers
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

  mobileDrawerTrigger?.addEventListener('click', openMobileDrawer);
  mobileDrawerClose?.addEventListener('click', closeMobileDrawer);
  mobileDrawerBackdrop?.addEventListener('click', closeMobileDrawer);

  document.querySelectorAll('#bmApproachDrawerSheet .bm-drawer-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-drawer-target');
      closeMobileDrawer();
      if (targetId) scrollToSection(targetId);
    });
  });
}
