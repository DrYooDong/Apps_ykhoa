/**
 * CliniPortal — Antibiotics & Antimicrobial Stewardship (AMS) Hub View
 * Path: src/content/basic-medical/antibiotics/views/antibiotics-hub-view.ts
 * 
 * Master Dashboard cho Phân hệ Kháng Sinh Học Lâm Sàng (BMS-ATB)
 * Tích hợp 100% với CliniPortal Design Tokens, Dark Mode, Pure Vanilla TS & SPA Router
 */

import { renderBasicMedicalNav, scrollActiveBasicMedicalNavIntoView } from '../../views/basic-medical-nav';
import { 
  ANTIBIOTIC_MODULES, 
  ANTIBIOTIC_TOOLS, 
  getAllAntibioticLessons 
} from '../data/antibiotics-curriculum-data';

export function renderAntibioticsHubView(): string {
  const allLessons = getAllAntibioticLessons();

  return `
    <div class="basic-medical-hub-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1rem 1.25rem 4rem;">
      
      <!-- Universal Sticky Sub-Nav -->
      ${renderBasicMedicalNav('khang-sinh')}

      <!-- Hero Banner -->
      <section class="atb-hero" style="
        background: linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(139, 92, 246, 0.10) 50%, rgba(16, 185, 129, 0.08) 100%);
        border: 1px solid var(--dsp-border-subtle, rgba(2, 132, 199, 0.25));
        border-radius: var(--dsp-radius-xl, 16px);
        padding: 2rem 2.25rem;
        margin-bottom: 2rem;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(12px);
      ">
        <div style="position: absolute; right: -20px; bottom: -30px; font-size: 14rem; opacity: 0.04; color: var(--color-primary, #0284c7); pointer-events: none;">
          <i class="fa-solid fa-shield-virus"></i>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem;">
          <span style="
            display: inline-flex; 
            align-items: center; 
            gap: 6px; 
            padding: 4px 12px; 
            border-radius: 999px; 
            background: rgba(2, 132, 199, 0.15); 
            color: var(--color-primary, #0284c7); 
            font-size: 0.78rem; 
            font-weight: 800; 
            letter-spacing: 0.04em; 
            text-transform: uppercase;
          ">
            <i class="fa-solid fa-dna"></i> BMS-ATB • Chuẩn WHO AWaRe 2023 & IDSA
          </span>
          <span style="
            display: inline-flex; 
            align-items: center; 
            gap: 5px; 
            padding: 4px 10px; 
            border-radius: 999px; 
            background: rgba(16, 185, 129, 0.15); 
            color: #10b981; 
            font-size: 0.78rem; 
            font-weight: 700;
          ">
            <i class="fa-solid fa-circle-check"></i> EBM 2026
          </span>
        </div>

        <h1 style="font-size: 2.15rem; font-weight: 900; margin: 0 0 0.85rem 0; color: var(--color-text, #0f172a); line-height: 1.25;">
          Kháng Sinh Học Lâm Sàng & Quản Lý Kháng Sinh (AMS)
        </h1>
        <p style="font-size: 1.02rem; line-height: 1.65; color: var(--color-text-muted, #64748b); max-width: 860px; margin: 0 0 1.75rem 0;">
          Cầu nối thép giữa <strong>Vi Sinh Y Học</strong>, <strong>Dược Động / Dược Lực Học (PK/PD)</strong> và <strong>Ra Quyết Định Kê Đơn An Toàn Tại Giường Bệnh</strong>. 
          Chuẩn hóa phản xạ lâm sàng theo chiến lược Đèn Tín Hiệu WHO AWaRe, bảng kiểm 8 điều D8 và thuật toán xóa nhãn dị ứng Penicillin sai lầm.
        </p>

        <!-- KPI Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1rem;">
          <div style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--dsp-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(2, 132, 199, 0.12); color: var(--color-primary, #0284c7); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <div style="font-size: 1.45rem; font-weight: 900; color: var(--color-text, #0f172a); line-height: 1;">6 Modules</div>
              <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-top: 3px;">Vi sinh đến Phác đồ ngoại trú</div>
            </div>
          </div>

          <div style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--dsp-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              <i class="fa-solid fa-book-open"></i>
            </div>
            <div>
              <div style="font-size: 1.45rem; font-weight: 900; color: var(--color-text, #0f172a); line-height: 1;">14 Bài Học</div>
              <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-top: 3px;">Chuẩn CliniMdx Native & KaTeX</div>
            </div>
          </div>

          <div style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--dsp-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(245, 158, 11, 0.12); color: #f59e0b; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              <i class="fa-solid fa-sliders"></i>
            </div>
            <div>
              <div style="font-size: 1.45rem; font-weight: 900; color: var(--color-text, #0f172a); line-height: 1;">5 Công Cụ</div>
              <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-top: 3px;">D8 • PK/PD • AWaRe • Delabel</div>
            </div>
          </div>

          <div style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: var(--dsp-shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(239, 68, 68, 0.12); color: #ef4444; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">
              <i class="fa-solid fa-traffic-light"></i>
            </div>
            <div>
              <div style="font-size: 1.45rem; font-weight: 900; color: var(--color-text, #0f172a); line-height: 1;">&ge; 60% Access</div>
              <div style="font-size: 0.78rem; font-weight: 600; color: var(--color-text-muted, #64748b); margin-top: 3px;">Chỉ số vàng giám sát kháng sinh</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5 Interactive Clinical Tools Bento Grid -->
      <section style="margin-bottom: 2.75rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; margin: 0 0 0.35rem 0; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--color-primary, #0284c7);"></i>
              Bộ 5 Công Cụ Lâm Sàng Tương Tác Đột Phá
            </h2>
            <p style="margin: 0; font-size: 0.88rem; color: var(--color-text-muted, #64748b);">
              Hệ thống hỗ trợ ra quyết định lâm sàng (CDSS) vận hành offline 100% bằng Pure TypeScript & SVG
            </p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.15rem;">
          ${ANTIBIOTIC_TOOLS.map(tool => `
            <a href="#/basic-medical/khang-sinh/tools/${tool.id}" class="atb-tool-card" style="
              text-decoration: none;
              background: var(--color-surface, #ffffff);
              border: 1px solid var(--color-border, #e2e8f0);
              border-radius: 14px;
              padding: 1.35rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-shadow: 0 2px 8px rgba(0,0,0,0.03);
              transition: all 0.25s ease;
              position: relative;
              overflow: hidden;
            " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 10px 24px rgba(0,0,0,0.08)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';">
              
              <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.85rem;">
                <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(2,132,199,0.1); color: ${tool.color}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                  <i class="fa-solid ${tool.icon}"></i>
                </div>
                <span style="font-size: 0.72rem; font-weight: 700; padding: 3px 8px; border-radius: 6px; background: rgba(0,0,0,0.05); color: var(--color-text-muted, #64748b);">
                  ${tool.badge}
                </span>
              </div>

              <div>
                <h3 style="font-size: 1.05rem; font-weight: 800; margin: 0 0 0.5rem 0; color: var(--color-text, #0f172a); line-height: 1.35;">
                  ${tool.title}
                </h3>
                <p style="font-size: 0.82rem; line-height: 1.55; color: var(--color-text-muted, #64748b); margin: 0 0 0.85rem 0;">
                  ${tool.description}
                </p>
              </div>

              <div style="padding-top: 0.75rem; border-top: 1px solid var(--color-border, #f1f5f9); display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; font-weight: 700; color: var(--color-primary, #0284c7);">
                <span>Khởi chạy công cụ</span>
                <i class="fa-solid fa-arrow-right" style="transition: transform 0.2s ease;"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- Multi-filter Toolbar -->
      <section style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.75rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        
        <!-- Search Input -->
        <div style="position: relative; flex: 1; min-width: 260px;">
          <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #94a3b8); font-size: 0.85rem;"></i>
          <input 
            type="text" 
            id="atbSearchInput" 
            placeholder="Tìm kiếm bài giảng, hoạt chất, cơ chế, vi khuẩn..." 
            style="
              width: 100%;
              padding: 0.6rem 0.75rem 0.6rem 2.25rem;
              border-radius: 8px;
              border: 1px solid var(--color-border, #cbd5e1);
              background: var(--color-bg, #f8fafc);
              color: var(--color-text, #0f172a);
              font-size: 0.88rem;
              outline: none;
              transition: border-color 0.2s ease;
            "
            onfocus="this.style.borderColor='var(--color-primary, #0284c7)';"
            onblur="this.style.borderColor='var(--color-border, #cbd5e1)';"
          />
        </div>

        <!-- Module Filter Buttons -->
        <div style="display: flex; align-items: center; gap: 6px; overflow-x: auto; max-width: 100%; padding-bottom: 2px;" class="hide-scrollbar" id="atbModuleFilterContainer">
          <button class="atb-filter-btn active" data-filter="all" style="padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border, #cbd5e1); background: var(--color-primary, #0284c7); color: #fff; font-size: 0.78rem; font-weight: 700; cursor: pointer; white-space: nowrap;">
            Tất cả 14 bài
          </button>
          ${ANTIBIOTIC_MODULES.map(m => `
            <button class="atb-filter-btn" data-filter="${m.key}" style="padding: 6px 12px; border-radius: 6px; border: 1px solid var(--color-border, #cbd5e1); background: transparent; color: var(--color-text-muted, #64748b); font-size: 0.78rem; font-weight: 600; cursor: pointer; white-space: nowrap;">
              M${m.number}: ${m.shortTitle}
            </button>
          `).join('')}
        </div>
      </section>

      <!-- Modules & Lessons Content Accordion / Bento Section -->
      <div id="atbCurriculumContainer" style="display: flex; flex-direction: column; gap: 2rem;">
        ${ANTIBIOTIC_MODULES.map(module => `
          <div class="atb-module-block" data-module-key="${module.key}" style="
            background: var(--color-surface, #ffffff);
            border: 1px solid var(--color-border, #e2e8f0);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
          ">
            
            <!-- Module Header Banner -->
            <div style="
              padding: 1.25rem 1.5rem;
              background: linear-gradient(to right, rgba(2, 132, 199, 0.06), transparent);
              border-bottom: 1px solid var(--color-border, #e2e8f0);
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: 0.75rem;
            ">
              <div style="display: flex; align-items: center; gap: 0.85rem;">
                <div style="width: 40px; height: 40px; border-radius: 10px; background: rgba(2, 132, 199, 0.12); color: ${module.color}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                  <i class="fa-solid ${module.icon}"></i>
                </div>
                <div>
                  <h3 style="font-size: 1.2rem; font-weight: 800; margin: 0 0 2px 0; color: var(--color-text, #0f172a);">
                    ${module.title}
                  </h3>
                  <div style="font-size: 0.82rem; color: var(--color-text-muted, #64748b);">
                    ${module.clinicalObjective}
                  </div>
                </div>
              </div>

              <span style="font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; background: rgba(2,132,199,0.1); color: var(--color-primary, #0284c7);">
                ${module.lessons.length} bài giảng
              </span>
            </div>

            <!-- Lessons Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem; padding: 1.25rem;">
              ${module.lessons.map(lesson => `
                <div class="atb-lesson-card" data-slug="${lesson.slug}" data-tags="${lesson.tags.join(' ')}" style="
                  background: var(--color-bg, #f8fafc);
                  border: 1px solid var(--color-border, #e2e8f0);
                  border-radius: 12px;
                  padding: 1.15rem;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  transition: all 0.2s ease;
                ">
                  <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.65rem;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-primary, #0284c7); text-transform: uppercase;">
                        Bài ${module.number}.${lesson.lessonNumber}
                      </span>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        ${lesson.isNewEbm2026 ? `
                          <span style="font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: rgba(16, 185, 129, 0.15); color: #10b981;">
                            MỚI EBM 2026
                          </span>
                        ` : ''}
                        <span style="font-size: 0.72rem; color: var(--color-text-muted, #94a3b8); font-weight: 600;">
                          <i class="fa-regular fa-clock"></i> ${lesson.estimatedMinutes}p
                        </span>
                      </div>
                    </div>

                    <h4 style="font-size: 0.98rem; font-weight: 800; line-height: 1.4; margin: 0 0 0.55rem 0; color: var(--color-text, #0f172a);">
                      <a href="#/basic-medical/khang-sinh/${module.key}/${lesson.slug}" style="color: inherit; text-decoration: none;" onmouseover="this.style.color='var(--color-primary, #0284c7)';" onmouseout="this.style.color='inherit';">
                        ${lesson.title}
                      </a>
                    </h4>

                    <p style="font-size: 0.81rem; line-height: 1.5; color: var(--color-text-muted, #64748b); margin: 0 0 0.85rem 0;">
                      ${lesson.description}
                    </p>

                    <!-- Key Takeaway Pill -->
                    <div style="background: rgba(2, 132, 199, 0.05); border-left: 3px solid var(--color-primary, #0284c7); padding: 6px 9px; border-radius: 0 6px 6px 0; margin-bottom: 0.85rem; font-size: 0.76rem; color: var(--color-text, #0f172a); line-height: 1.45;">
                      <strong>Hạt ngọc lâm sàng:</strong> ${lesson.keyTakeaway}
                    </div>

                    <!-- Tags -->
                    <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 1rem;">
                      ${lesson.tags.map(tag => `
                        <span style="font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.04); color: var(--color-text-muted, #64748b);">
                          #${tag}
                        </span>
                      `).join('')}
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div style="display: flex; align-items: center; gap: 0.5rem; pt: 0.75rem; border-top: 1px solid var(--color-border, #f1f5f9);">
                    <a href="#/basic-medical/khang-sinh/${module.key}/${lesson.slug}" class="btn btn-sm btn-primary" style="
                      flex: 1;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      gap: 6px;
                      padding: 0.45rem 0.85rem;
                      background: var(--color-primary, #0284c7);
                      color: #fff;
                      border-radius: 6px;
                      text-decoration: none;
                      font-size: 0.78rem;
                      font-weight: 700;
                    ">
                      <i class="fa-solid fa-book-open"></i> Đọc bài giảng
                    </a>
                    ${lesson.hasInteractiveTool && lesson.toolId ? `
                      <a href="#/basic-medical/khang-sinh/tools/${lesson.toolId}" title="Mở công cụ liên quan" style="
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        border-radius: 6px;
                        border: 1px solid var(--color-border, #cbd5e1);
                        background: var(--color-surface, #ffffff);
                        color: var(--color-primary, #0284c7);
                        text-decoration: none;
                        font-size: 0.85rem;
                      ">
                        <i class="fa-solid fa-calculator"></i>
                      </a>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}

export function initAntibioticsHubView(): void {
  scrollActiveBasicMedicalNavIntoView();

  const searchInput = document.getElementById('atbSearchInput') as HTMLInputElement | null;
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('.atb-filter-btn');
  const moduleBlocks = document.querySelectorAll<HTMLElement>('.atb-module-block');
  const lessonCards = document.querySelectorAll<HTMLElement>('.atb-lesson-card');

  let activeFilter = 'all';

  function applyFilterAndSearch(): void {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    moduleBlocks.forEach(block => {
      const moduleKey = block.getAttribute('data-module-key');
      const matchesFilter = activeFilter === 'all' || moduleKey === activeFilter;

      let visibleLessonsInBlock = 0;
      const cardsInBlock = block.querySelectorAll<HTMLElement>('.atb-lesson-card');

      cardsInBlock.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
        const matchesQuery = query === '' || text.includes(query) || tags.includes(query);

        if (matchesFilter && matchesQuery) {
          card.style.display = 'flex';
          visibleLessonsInBlock++;
        } else {
          card.style.display = 'none';
        }
      });

      if (matchesFilter && visibleLessonsInBlock > 0) {
        block.style.display = 'block';
      } else {
        block.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilterAndSearch);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = 'var(--color-text-muted, #64748b)';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--color-primary, #0284c7)';
      btn.style.color = '#ffffff';

      activeFilter = btn.getAttribute('data-filter') || 'all';
      applyFilterAndSearch();
    });
  });
}

