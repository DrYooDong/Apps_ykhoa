/**
 * CliniPortal — Clinical Studio Tools Master View & Interactive Workbench Runner (TypeScript)
 * Path: src/content/calculators/studio-view.ts
 */

import { CLINICAL_STUDIOS_REGISTRY, filterStudios, getStudioById } from './studio-registry';
import { ClinicalStudioManifest, SpecialtyCategory, RiskTier } from './studio-models';

/**
 * Render Master Bento Hub for All Studio Tools
 */
export function renderStudioHubView(activeCategory: SpecialtyCategory | 'all' = 'all'): string {
  const studios = filterStudios(activeCategory);

  const riskBadgeStyles: Record<RiskTier, { bg: string; color: string; border: string }> = {
    low: { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
    mid: { bg: '#eff6ff', color: '#1e40af', border: '#bfdbfe' },
    high: { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    critical: { bg: '#fef2f2', color: '#991b1b', border: '#fecaca' }
  };

  const categories: { id: SpecialtyCategory | 'all'; name: string; icon: string }[] = [
    { id: 'all', name: 'Tất Cả Studio', icon: 'fa-layer-group' },
    { id: 'emergency', name: 'Cấp Cứu & ICU', icon: 'fa-truck-medical' },
    { id: 'cardiology', name: 'Tim Mạch', icon: 'fa-heart-pulse' },
    { id: 'renal', name: 'Thận & Điện Giải', icon: 'fa-flask' },
    { id: 'respiratory', name: 'Hô Hấp', icon: 'fa-lungs' },
    { id: 'infectious', name: 'Truyền Nhiễm', icon: 'fa-virus' },
    { id: 'gastroenterology', name: 'Tiêu Hóa - Gan Mật', icon: 'fa-bowl-food' },
    { id: 'endocrinology', name: 'Nội Tiết & ĐTĐ', icon: 'fa-syringe' },
    { id: 'hematology', name: 'Huyết Học & XN', icon: 'fa-vial-virus' },
    { id: 'neurology', name: 'Thần Kinh', icon: 'fa-brain' }
  ];

  return `
    <div class="studio-hub-container animate-fade-in" style="width: 100%; max-width: 1520px; margin: 0 auto; padding: 1.5rem 1rem 3rem 1rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp;
        <a href="#/calculators" style="color: inherit; text-decoration: none;">Công cụ lâm sàng</a> &nbsp;/&nbsp;
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Studio Workbenches Hub</span>
      </div>

      <!-- HERO BANNER -->
      <section style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0369a1 100%); border-radius: 16px; padding: 2.25rem 2rem; color: #fff; margin-bottom: 2rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2); position: relative; overflow: hidden;">
        <div style="position: relative; z-index: 2; max-width: 860px;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); padding: 0.35rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.75rem;">
            <i class="fa-solid fa-wand-magic-sparkles" style="color: #38bdf8;"></i> Clinical Studio Workbenches Suite (TypeScript Native)
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; margin: 0 0 0.75rem 0; line-height: 1.2; letter-spacing: -0.5px;">
            Hệ Thống Bàn Làm Việc Lâm Sàng Tương Tác Dạng Studio
          </h1>
          <p style="font-size: 1rem; color: #cbd5e1; margin: 0; line-height: 1.6;">
            Công cụ hỗ trợ quyết định y khoa chuyên sâu (CDSS) chuẩn EBM 2026: Tích hợp mô phỏng Canvas 2D/SVG, đa bơm tiêm điện động, phác đồ can thiệp 4 khối và xuất y lệnh HIS tức thì.
          </p>
        </div>
      </section>

      <!-- SEARCH & FILTER BAR -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        
        <!-- Search Input -->
        <div style="position: relative; flex: 1; min-width: 280px; max-width: 480px;">
          <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #94a3b8);"></i>
          <input 
            type="text" 
            id="studioSearchInput" 
            placeholder="Tìm kiếm Studio (vận mạch, máy thở, ARDS, sepsis, ABG, insulin...)"
            style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border-radius: 10px; border: 1px solid var(--color-border, #cbd5e1); background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 0.9rem;"
            oninput="window.handleStudioSearch(this.value)"
          />
        </div>

        <!-- Counter Badge -->
        <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); font-weight: 600;">
          Hiển thị <span id="studioCountDisplay" style="color: var(--color-primary, #0284c7); font-weight: 800;">${studios.length}</span> Studio lâm sàng
        </div>
      </div>

      <!-- CATEGORY PILLS -->
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.75rem; margin-bottom: 1.75rem; scrollbar-width: thin;">
        ${categories.map(cat => `
          <button 
            class="studio-cat-pill ${activeCategory === cat.id ? 'active' : ''}" 
            onclick="window.switchStudioCategory('${cat.id}')"
            style="padding: 0.55rem 1rem; border-radius: 20px; border: 1px solid ${activeCategory === cat.id ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; background: ${activeCategory === cat.id ? 'var(--color-primary, #0284c7)' : 'var(--color-surface, #fff)'}; color: ${activeCategory === cat.id ? '#fff' : 'var(--color-text, #334155)'}; font-size: 0.85rem; font-weight: 600; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.45rem; transition: all 0.2s;"
          >
            <i class="fa-solid ${cat.icon}"></i>
            <span>${cat.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- BENTO GRID CARDS -->
      <div id="studioGridContainer" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.5rem;">
        ${studios.map(studio => {
          const badgeStyle = riskBadgeStyles[studio.riskTier];
          return `
            <div 
              class="studio-card-bento animate-fade-in" 
              data-studio-id="${studio.id}"
              data-category="${studio.specialty}"
              style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, box-shadow 0.2s; position: relative; overflow: hidden;"
            >
              <div>
                <!-- Top Meta Row -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; gap: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; padding: 0.25rem 0.6rem; border-radius: 6px; background: ${badgeStyle.bg}; color: ${badgeStyle.color}; border: 1px solid ${badgeStyle.border}; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <i class="fa-solid fa-triangle-exclamation"></i> ${studio.riskLabel}
                  </span>
                  <span style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;">
                    <i class="fa-solid ${studio.specialtyIcon}"></i> ${studio.specialtyName}
                  </span>
                </div>

                <!-- Title -->
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.4; display: flex; align-items: center; gap: 0.5rem;">
                  <span>${studio.icon}</span> <span>${studio.shortTitle}</span>
                </h3>

                <!-- Description -->
                <p style="font-size: 0.875rem; color: var(--color-text-muted, #475569); line-height: 1.5; margin: 0 0 1rem 0;">
                  ${studio.description}
                </p>

                <!-- Features Tags -->
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
                  ${studio.features.slice(0, 3).map(f => `
                    <span style="font-size: 0.75rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.2rem 0.5rem; border-radius: 4px;">
                      ✓ ${f}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Action Row -->
              <div style="border-top: 1px solid var(--color-border, #f1f5f9); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;">
                <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">
                  <i class="fa-solid fa-folder-open"></i> ${studio.presets.length} ca mẫu
                </div>
                
                <a 
                  href="#${studio.route}" 
                  class="btn btn-primary" 
                  style="padding: 0.55rem 1.1rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;"
                >
                  <span>Mở Studio</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/**
 * Render 4-Panel Interactive Studio Workbench Runner
 */
export function renderStudioRunnerView(manifest: ClinicalStudioManifest): string {
  return `
    <div class="studio-runner-container animate-fade-in" style="width: 100%; max-width: 1520px; margin: 0 auto; padding: 1.5rem 1rem 3rem 1rem;">
      
      <!-- BREADCRUMB & TOP CONTROLS -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
        <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
          <a href="#/" style="color: inherit; text-decoration: none;">🏠 Home</a> &nbsp;/&nbsp;
          <a href="#/calculators" style="color: inherit; text-decoration: none;">Công cụ</a> &nbsp;/&nbsp;
          <a href="#/calculators/studios" style="color: inherit; text-decoration: none;">Studio Hub</a> &nbsp;/&nbsp;
          <span style="color: var(--color-primary, #0284c7); font-weight: 600;">${manifest.shortTitle}</span>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline" onclick="window.resetStudioParams('${manifest.id}')" style="padding: 0.45rem 0.9rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.85rem; font-weight: 600; cursor: pointer; background: var(--color-surface, #fff); color: var(--color-text, #334155);">
            <i class="fa-solid fa-rotate-left"></i> Đặt lại
          </button>
          <button class="btn btn-outline" onclick="window.copyHisOrder('${manifest.id}')" style="padding: 0.45rem 0.9rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.85rem; font-weight: 600; cursor: pointer; background: var(--color-surface, #fff); color: var(--color-text, #334155);">
            <i class="fa-solid fa-copy"></i> Copy Y Lệnh HIS
          </button>
          <a href="#/calculators/studios" class="btn btn-outline" style="padding: 0.45rem 0.9rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.85rem; font-weight: 600; text-decoration: none; background: var(--color-surface, #fff); color: var(--color-text, #334155);">
            <i class="fa-solid fa-table-cells-large"></i> Tất cả Studio
          </a>
        </div>
      </div>

      <!-- HEADER TITLE CARD -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: #eff6ff; color: #0284c7; padding: 0.25rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem;">
              <i class="fa-solid ${manifest.specialtyIcon}"></i> ${manifest.specialtyName} • ${manifest.riskLabel}
            </div>
            <h1 style="font-size: 1.6rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0;">
              ${manifest.icon} ${manifest.title}
            </h1>
            <p style="font-size: 0.9rem; color: var(--color-text-muted, #475569); margin: 0; max-width: 980px; line-height: 1.5;">
              ${manifest.description}
            </p>
          </div>
        </div>
      </div>

      <!-- 4-PANEL WORKBENCH GRID -->
      <div style="display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
        
        <!-- PANEL 1: CASE PRESETS & PATIENT INFO -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-folder-open" style="color: var(--color-primary, #0284c7);"></i> Ca Bệnh Mẫu (Presets)
          </h3>
          <p style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0;">
            Chọn ca bệnh lâm sàng điển hình để tự động nạp toàn bộ thông số:
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            ${manifest.presets.map((preset, idx) => `
              <button 
                class="studio-preset-btn ${idx === 0 ? 'active' : ''}"
                onclick="window.loadStudioPreset('${manifest.id}', '${preset.id}')"
                style="text-align: left; padding: 0.85rem; border-radius: 10px; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-bg, #f8fafc); cursor: pointer; transition: all 0.2s;"
              >
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <strong style="font-size: 0.85rem; color: var(--color-text, #0f172a);">${preset.name}</strong>
                  <span style="font-size: 0.7rem; background: #e0f2fe; color: #0369a1; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 700;">${preset.badge}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">
                  ${preset.description}
                </div>
              </button>
            `).join('')}
          </div>

          <div style="border-top: 1px solid var(--color-border, #f1f5f9); padding-top: 1rem;">
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text, #334155); margin-bottom: 0.4rem;">
              <i class="fa-solid fa-book-medical"></i> Hướng Dẫn & Bằng Chứng EBM:
            </div>
            <ul style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); margin: 0; padding-left: 1.2rem; line-height: 1.5;">
              ${manifest.ebmGuidelines.map(g => `<li>${g}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- RIGHT MAIN: PANEL 2 (VISUALIZER) + PANEL 3 (DYNAMIC CONTROLS) -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          
          <!-- PANEL 2: INTERACTIVE VISUALIZER CANVAS / RADAR / WAVEFORM -->
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-chart-pie" style="color: #0d9488;"></i> Mô Phỏng Lâm Sàng Trực Quan (SVG Vector Canvas)
              </h3>
              <span style="font-size: 0.75rem; color: #0d9488; font-weight: 700; background: #ccfbf1; padding: 0.2rem 0.6rem; border-radius: 6px;">
                Tự động tính toán phản xạ
              </span>
            </div>

            <!-- SVG Visualizer Placeholder / Canvas Engine -->
            <div id="studioVisualizerCanvas" style="background: #0f172a; border-radius: 10px; padding: 1.5rem; min-height: 180px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff;">
              <svg viewBox="0 0 400 120" style="width: 100%; max-width: 500px; height: 100px;">
                <!-- Grid background -->
                <line x1="0" y1="30" x2="400" y2="30" stroke="#1e293b" stroke-width="1" />
                <line x1="0" y1="60" x2="400" y2="60" stroke="#1e293b" stroke-width="1" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="#1e293b" stroke-width="1" />
                <!-- Dynamic Waveform / Vector Radar Curve -->
                <path d="M 10 60 L 60 60 L 75 20 L 90 100 L 105 50 L 120 60 L 200 60 L 215 15 L 230 105 L 245 45 L 260 60 L 390 60" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 0.5rem;">
                Trạng thái đồ thị động lực học: <strong id="studioDynamicStatus" style="color: #38bdf8;">Đang hoạt động ổn định</strong>
              </div>
            </div>
          </div>

          <!-- PANEL 3: DYNAMIC CONTROLS & MULTI-PARAM SLIDERS -->
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.5rem;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-sliders" style="color: #7c3aed;"></i> Bộ Điều Khiển Động & Hiệu Chỉnh Liều
            </h3>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
              <div>
                <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155); display: flex; justify-content: space-between;">
                  <span>Cân nặng bệnh nhân:</span>
                  <strong id="val_weight" style="color: #0284c7;">65 kg</strong>
                </label>
                <input type="range" id="input_weight" min="35" max="140" value="65" style="width: 100%; margin-top: 0.4rem;" oninput="window.updateStudioParam('weight', this.value)" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155); display: flex; justify-content: space-between;">
                  <span>Huyết áp động mạch trung bình (MAP):</span>
                  <strong id="val_map" style="color: #e11d48;">55 mmHg</strong>
                </label>
                <input type="range" id="input_map" min="40" max="110" value="55" style="width: 100%; margin-top: 0.4rem;" oninput="window.updateStudioParam('map', this.value)" />
              </div>

              <div>
                <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155); display: flex; justify-content: space-between;">
                  <span>Mức độ đáp ứng / Đích can thiệp:</span>
                  <strong id="val_target" style="color: #10b981;">MAP ≥ 65</strong>
                </label>
                <select id="input_target" style="width: 100%; padding: 0.45rem; border-radius: 6px; border: 1px solid #cbd5e1; margin-top: 0.4rem;" onchange="window.updateStudioParam('target', this.value)">
                  <option value="65" selected>Chuẩn: MAP ≥ 65 mmHg</option>
                  <option value="70">Tăng áp lực nội sọ / THA mạn: MAP ≥ 70-75</option>
                  <option value="60">Hạ HA có kiểm soát (Trauma Permissive): MAP 55-60</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL 4: ADVANCED INTERVENTIONAL MANAGEMENT & ACTION PROTOCOLS -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-hand-holding-medical" style="color: #dc2626;"></i> Trung Tâm Xử Trí Can Thiệp & Y Lệnh Bệnh Án
        </h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
          ${manifest.protocols.map(proto => `
            <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 1.25rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: #dc2626; margin: 0 0 0.5rem 0; display: flex; align-items: center; gap: 0.4rem;">
                <i class="fa-solid ${proto.icon}"></i> ${proto.title}
              </h4>
              <p style="font-size: 0.85rem; color: var(--color-text-muted, #475569); margin: 0 0 0.75rem 0;">
                ${proto.summary}
              </p>
              <ol style="font-size: 0.8rem; color: var(--color-text, #334155); margin: 0; padding-left: 1.2rem; line-height: 1.5;">
                ${proto.steps.map(s => `<li>${s}</li>`).join('')}
              </ol>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Khởi tạo sự kiện Controller cho Studio Hub
 */
export function initStudioHub(): void {
  // Global search & filter bindings
  (window as any).switchStudioCategory = (cat: SpecialtyCategory | 'all') => {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = renderStudioHubView(cat);
      initStudioHub();
    }
  };

  (window as any).handleStudioSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll<HTMLElement>('.studio-card-bento');
    let visibleCount = 0;

    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      const match = !q || text.includes(q);
      card.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const countDisplay = document.getElementById('studioCountDisplay');
    if (countDisplay) countDisplay.textContent = String(visibleCount);
  };
}

/**
 * Khởi tạo Controller cho Studio Runner
 */
export function initStudioRunner(): void {
  (window as any).loadStudioPreset = (studioId: string, presetId: string) => {
    const studio = getStudioById(studioId);
    if (!studio) return;
    const preset = studio.presets.find(p => p.id === presetId);
    if (!preset) return;

    // Highlight active preset button
    document.querySelectorAll('.studio-preset-btn').forEach(btn => btn.classList.remove('active'));

    // Update weight
    if (preset.params.weight) {
      const wInput = document.getElementById('input_weight') as HTMLInputElement;
      const wVal = document.getElementById('val_weight');
      if (wInput) wInput.value = preset.params.weight;
      if (wVal) wVal.textContent = `${preset.params.weight} kg`;
    }

    // Update map
    if (preset.params.map) {
      const mInput = document.getElementById('input_map') as HTMLInputElement;
      const mVal = document.getElementById('val_map');
      if (mInput) mInput.value = preset.params.map;
      if (mVal) mVal.textContent = `${preset.params.map} mmHg`;
    }

    const statusEl = document.getElementById('studioDynamicStatus');
    if (statusEl) {
      statusEl.textContent = `Đã nạp ca mẫu: ${preset.name}`;
      statusEl.style.color = '#10b981';
    }
  };

  (window as any).updateStudioParam = (key: string, value: string) => {
    const valEl = document.getElementById(`val_${key}`);
    if (valEl) {
      if (key === 'weight') valEl.textContent = `${value} kg`;
      if (key === 'map') valEl.textContent = `${value} mmHg`;
    }
  };

  (window as any).copyHisOrder = (studioId: string) => {
    const studio = getStudioById(studioId);
    const orderText = `Y LỆNH BỆNH ÁN (${studio?.shortTitle || 'Studio Tool'} - CliniPortal 2.0):\n- Bệnh nhân đã được phân tầng theo tiêu chuẩn EBM 2026.\n- Theo dõi liên tục sinh hiệu và áp lực động mạch.\n- Cập nhật lúc: ${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`;
    navigator.clipboard.writeText(orderText).then(() => {
      alert('Đã sao chép Y lệnh tiêu chuẩn HIS vào Clipboard!');
    }).catch(() => {
      alert(orderText);
    });
  };

  (window as any).resetStudioParams = (studioId: string) => {
    const studio = getStudioById(studioId);
    if (studio && studio.presets.length > 0) {
      (window as any).loadStudioPreset(studioId, studio.presets[0].id);
    }
  };
}
