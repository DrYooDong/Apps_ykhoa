/**
 * CliniPortal — Biochemistry & Molecular Metabolism (Hóa Sinh Y Học) SPA View
 * Path: src/content/pathophysiology/biochemistry-view.ts
 * Giao diện kinh điển đồng bộ chuẩn 100% với Sinh Lý & Cơ Chế Bệnh Sinh
 * (Classic Hero Molecular SVG, Feature Banners, Toolbar Search/Grid Toggle, Sticky Block-Nav 7 Khối, Specialty Cards)
 */

import '../../../css/components/module-dashboard.css';
import '../../../css/components/physio-content.css';
import '../../../css/components/formula-vault.css';
import '../../../css/components/biochemistry-hub.css';
import '../../../css/components/physio-promax-hub.css';
import { BIOCHEMISTRY_DATA } from './data/biochemistry-data';
import { BiochemistryBlock, BiochemistryTopic } from './types/biochemistry.types';

export function renderBiochemistryView(): string {
  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/pathophysiology" style="color: inherit; text-decoration: none;">Cơ Sở Y Khoa</a> &nbsp;/&nbsp; 
        <span style="color: #8b5cf6; font-weight: 600;">Hóa Sinh Y Học & Chuyển Hóa (HS - CH)</span>
      </div>

      <!-- PROMAX LUXURY HERO SECTION -->
      <section class="promax-hero hero-biochem-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="promax-badge-pulse">
              <span class="pulse-dot"></span>
              <span>Molecular Biochemistry & Clinical Diagnostics • Harper & Tietz Standards</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🧪 HÓA SINH Y HỌC & CHUYỂN HÓA
            </h1>
            <p class="promax-hero-desc">
              Hệ thống hóa cấu trúc phân tử sinh học, động học enzym, năng lượng sinh học ti thể, chuyển hóa 4 đại phân tử và biện luận xét nghiệm lâm sàng tại giường bệnh (EBM & Clinical Biochemistry).
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-cubes-stacked" style="font-size: 1.1rem; color: #c084fc;"></i>
                <div>
                  <div class="promax-kpi-num">7</div>
                  <div class="promax-kpi-lbl">Khối Chuyên Đề</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-flask-vial" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">31</div>
                  <div class="promax-kpi-lbl">Bài Học Chi Tiết</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-lightbulb" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">112+</div>
                  <div class="promax-kpi-lbl">Clinical Pearls</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-diagram-project" style="font-size: 1.1rem; color: #34d399;"></i>
                <div>
                  <div class="promax-kpi-num">5 Maps</div>
                  <div class="promax-kpi-lbl">Bản Đồ Chuyển Hóa</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));">
              <circle cx="50" cy="50" r="38" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.6"/>
              <polygon points="50,22 72,35 72,61 50,74 28,61 28,35" stroke="#ffffff" stroke-width="3.5" fill="rgba(255,255,255,0.15)" stroke-linejoin="round"/>
              <circle cx="50" cy="48" r="14" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="4 3"/>
              <circle cx="50" cy="22" r="5.5" fill="#38bdf8"/>
              <circle cx="72" cy="35" r="5.5" fill="#ffffff"/>
              <circle cx="72" cy="61" r="5.5" fill="#38bdf8"/>
              <circle cx="50" cy="74" r="5.5" fill="#ffffff"/>
              <circle cx="28" cy="61" r="5.5" fill="#38bdf8"/>
              <circle cx="28" cy="35" r="5.5" fill="#ffffff"/>
              <line x1="72" y1="35" x2="88" y2="25" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
              <circle cx="88" cy="25" r="5" fill="#fbbf24"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- PROMAX BENTO ACTION GRID (4 CÔNG CỤ TƯƠNG TÁC CAO CẤP) -->
      <section class="promax-bento-grid">
        <a href="#/pathophysiology/metabolic-map" class="promax-bento-card" style="--bento-color: #8b5cf6; --bento-bg: rgba(139,92,246,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-diagram-project"></i></div>
          <div>
            <span class="promax-bento-tag">Metabolic Studio</span>
            <h4 class="promax-bento-title">Bản Đồ Chuyển Hóa Phân Tử</h4>
            <p class="promax-bento-desc">Khám phá tương tác 5 chu trình năng lượng, tra cứu enzyme, vitamin & đích thuốc.</p>
          </div>
        </a>

        <a href="#/pathophysiology/quiz" class="promax-bento-card" style="--bento-color: #10b981; --bento-bg: rgba(16,185,129,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-brain"></i></div>
          <div>
            <span class="promax-bento-tag">Cascade Reasoning</span>
            <h4 class="promax-bento-title">Thử Thách Ca Bệnh & Flashcards</h4>
            <p class="promax-bento-desc">Luyện tập chuỗi cơ chế chuyển hóa, rối loạn di truyền & Spaced Repetition.</p>
          </div>
        </a>

        <a href="#/pathophysiology/simulators" class="promax-bento-card" style="--bento-color: #0284c7; --bento-bg: rgba(2,132,199,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-bolt"></i></div>
          <div>
            <span class="promax-bento-tag">Real-Time Canvas</span>
            <h4 class="promax-bento-title">Mô Phỏng Sinh Lý Động</h4>
            <p class="promax-bento-desc">Thí nghiệm Nernst, Starling, Frank-Starling & Toan kiềm trực quan.</p>
          </div>
        </a>

        <a href="#/pathophysiology/formula-vault" class="promax-bento-card" style="--bento-color: #f59e0b; --bento-bg: rgba(245,158,11,0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-calculator"></i></div>
          <div>
            <span class="promax-bento-tag">JSON Vault</span>
            <h4 class="promax-bento-title">Kho Công Thức Định Lượng</h4>
            <p class="promax-bento-desc">Cơ sở dữ liệu phương trình Nernst, Fick, Starling, GHK kèm máy tính.</p>
          </div>
        </a>
      </section>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm bài học hóa sinh (Krebs, Đường phân, Enzym, PFK-1, Bilirubin, Acid Uric, Troponin...)..." aria-label="Tìm kiếm chuyên đề hóa sinh">
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

      <!-- DASHBOARD LAYOUT -->
      <div class="dashboard-layout">
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục khối hóa sinh">
          <div class="nav-sidebar-sticky" id="physio-nav">
            <h4 class="nav-sidebar-title">Khối Kiến Thức</h4>
            <ul class="part-nav-list">
              ${BIOCHEMISTRY_DATA.blocks.map((b, idx) => `
                <li>
                  <a href="#${b.id}-section" class="part-nav-item p${idx + 1} ${idx === 0 ? 'active' : ''}" data-target="${b.id}-section">
                    <span class="part-icon"><i class="fa-solid ${b.icon}"></i></span>
                    <span class="part-text">${b.code}. ${b.name.replace(/^Khối \d+:\s*/, '')}</span>
                    <span class="part-count-badge">${BIOCHEMISTRY_DATA.topics.filter(t => t.blockId === b.id).length}</span>
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
            <h3>Không tìm thấy chuyên đề hóa sinh nào</h3>
            <p>Vui lòng thử từ khóa khác (ví dụ: Krebs, Đường phân, Troponin, Ure, Acid Uric, Bilirubin...).</p>
          </div>

          <!-- 7 BLOCKS SECTIONS -->
          ${BIOCHEMISTRY_DATA.blocks.map(block => {
            const blockTopics = BIOCHEMISTRY_DATA.topics.filter(t => t.blockId === block.id);
            const blockFolderMap: Record<string, string> = {
              'block-1': 'block1-biomolecules',
              'block-2': 'block2-catalysis-signaling',
              'block-3': 'block3-bioenergetics',
              'block-4': 'block4-intermediary-metabolism',
              'block-5': 'block5-molecular-genetics',
              'block-6': 'block6-organ-metabolism',
              'block-7': 'block7-clinical-biochemistry'
            };
            const blockFolder = blockFolderMap[block.id] || 'block1-biomolecules';

            return `
              <section id="${block.id}-section" aria-labelledby="${block.id}-heading" style="margin-bottom: 2rem;">
                <div class="physio-group-container">
                  <div class="physio-group-header">
                    <span class="physio-group-icon" style="color: ${block.color}; background: ${block.bgColor};">
                      <i class="fa-solid ${block.icon}"></i>
                    </span>
                    <div>
                      <h3 id="${block.id}-heading">${block.code}. ${block.name}</h3>
                      <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">${block.description}</p>
                    </div>
                  </div>

                  <div class="specialty-grid">
                    ${blockTopics.map(topic => `
                      <a href="#/pathophysiology/biochemistry/${blockFolder}/${topic.slug}" class="specialty-card" data-topic-id="${topic.id}">
                        <div class="specialty-card-top">
                          <div class="specialty-icon" style="background: ${block.bgColor}; color: ${block.color};">
                            <i class="fa-solid ${block.icon}"></i>
                          </div>
                          <div class="specialty-info">
                            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
                              <span style="font-size: 0.72rem; font-weight: 700; background: var(--color-bg, #f1f5f9); color: var(--color-primary, #0284c7); padding: 0.1rem 0.4rem; border-radius: 4px;">${topic.code}</span>
                              <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-star" style="color: #f59e0b; font-size: 0.65rem;"></i> ${topic.clinicalPearls.length} Pearls</span>
                            </div>
                            <h3>${topic.title}</h3>
                            <p>${topic.overview}</p>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem;">
                              ${topic.tags.slice(0, 3).map(tag => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">#${tag}</span>`).join('')}
                            </div>
                          </div>
                        </div>
                        <div class="specialty-card-action">
                          <span>Xem bài</span>
                          <i class="fa-solid fa-chevron-right"></i>
                        </div>
                      </a>
                    `).join('')}
                  </div>
                </div>
              </section>
            `;
          }).join('')}
        </main>
      </div>

    </div>

    <!-- QUICK PREVIEW MODAL / DRAWER -->
    <div class="biochem-modal-backdrop" id="biochemModalBackdrop">
      <div class="biochem-modal" id="biochemModalContainer" role="dialog" aria-modal="true"></div>
    </div>
  `;
}

export function initBiochemistryView(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const lessonsContainer = document.getElementById('lessons-container') as HTMLElement | null;
  const navItems = document.querySelectorAll('.part-nav-item');
  const sections = document.querySelectorAll('.layout-content-area > section');
  const modalBackdrop = document.getElementById('biochemModalBackdrop');
  const modalContainer = document.getElementById('biochemModalContainer');

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

  // 5. Quick Preview Modal
  function openQuickPreview(topicId: string): void {
    if (!modalBackdrop || !modalContainer) return;

    const topic = BIOCHEMISTRY_DATA.topics.find(t => t.id === topicId);
    if (!topic) return;

    const block = BIOCHEMISTRY_DATA.blocks.find(b => b.id === topic.blockId);

    modalContainer.innerHTML = `
      <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-surface);">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-bg); color: var(--color-primary); padding: 0.2rem 0.5rem; border-radius: 4px;">${topic.code} • ${block ? block.name : ''}</span>
          <h3 style="margin: 0.35rem 0 0 0; font-size: 1.25rem; font-weight: 700; color: var(--color-text);">${topic.title}</h3>
        </div>
        <button type="button" class="modal-close-btn" onclick="window.BiochemHub?.closeModal()" aria-label="Đóng" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body" style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <!-- Tóm tắt -->
        <div style="margin-bottom: 1.5rem; background: var(--color-bg); padding: 1.25rem; border-radius: 10px; border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> Mục Tiêu & Tổng Quan Cơ Chế
          </h4>
          <p style="margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--color-text);">${topic.overview}</p>
        </div>

        <!-- Phản ứng -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #8b5cf6; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-flask"></i> Phản Ứng & Điểm Chốt Cơ Chế
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem;">
            ${topic.keyReactions.map(r => `<li style="font-size: 0.875rem; color: var(--color-text);"><code style="background: rgba(139,92,246,0.1); color: #7c3aed; padding: 0.15rem 0.4rem; border-radius: 4px; font-family: monospace;">${r}</code></li>`).join('')}
          </ul>
        </div>

        <!-- Clinical Pearls -->
        <div style="margin-bottom: 1.5rem; background: rgba(245,158,11,0.08); border-left: 4px solid #f59e0b; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Điểm Ngọc Lâm Sàng (Clinical Pearls)
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${topic.clinicalPearls.map(p => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${p}</li>`).join('')}
          </ul>
        </div>

        <!-- Lab Tests -->
        <div>
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #10b981; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-stethoscope"></i> Chỉ Số Xét Nghiệm & Thăm Dò Liên Quan
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${topic.relatedLabTests.map(l => `<span style="font-size: 0.825rem; background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-primary); font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem;"><i class="fa-solid fa-vial" style="font-size: 0.75rem; color: #10b981;"></i> ${l}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  window.BiochemHub = {
    openQuickPreview,
    closeModal,
    selectPathway: openQuickPreview
  };

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });
}
