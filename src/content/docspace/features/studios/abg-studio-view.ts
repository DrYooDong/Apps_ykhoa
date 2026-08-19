/**
 * DocSpace — ABG & Acid-Base Research Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for ABG Studio
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeAbg, renderDavenportSvg, renderOxygenationGaugeSvg,
  ABG_PRESETS, AbgInputs
} from './abg-studio';

export function renderAbgPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioAbg" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (20 Curated Research Presets - Redesigned Clinical Vault) -->
      <div class="dsp-case-vault" id="abgCaseVault">
        <!-- Vault Header Toolbar -->
        <div class="dsp-case-vault-header">
          <div class="dsp-case-vault-title">
            <i class="fa-solid fa-flask-vial" style="color:var(--color-primary); font-size:1.15rem;"></i>
            <span>Kho 20 Ca Nghiên Cứu Khí Máu &amp; Toan Kiềm Mẫu</span>
            <span class="dsp-badge" style="background:rgba(2,132,199,0.12); color:var(--color-primary); border:1px solid rgba(2,132,199,0.25); font-size:11px;">20 Ca Chuẩn EBM</span>
          </div>

          <div class="dsp-case-vault-toolbar">
            <!-- Quick Search Input -->
            <div class="dsp-case-search-wrap">
              <i class="fa-solid fa-magnifying-glass dsp-case-search-icon"></i>
              <input type="text" id="abgCaseSearchInput" class="dsp-case-search-input" placeholder="Tìm theo tên ca, DKA, COPD, ARDS, Lactate..." />
            </div>

            <!-- View Switcher & Collapse -->
            <div style="display:flex; gap:4px; background:var(--color-bg); padding:2px; border-radius:8px; border:1px solid var(--color-border);">
              <button type="button" class="dsp-btn dsp-btn-sm js-case-view-toggle is-active" data-view="grid" title="Xem dạng lưới thẻ" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none;">
                <i class="fa-solid fa-table-cells-large"></i> Lưới Thẻ
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-case-view-toggle" data-view="chips" title="Xem dạng thu gọn" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none; background:transparent;">
                <i class="fa-solid fa-list-ul"></i> Thu Gọn
              </button>
            </div>

            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleVaultCollapse" title="Thu gọn / Mở rộng kho ca" style="padding:4px 8px; font-size:11px;">
              <i class="fa-solid fa-chevron-up" id="iconVaultCollapse"></i>
            </button>
          </div>
        </div>

        <!-- Vault Content Body -->
        <div id="abgVaultBody">
          <!-- Category Filter Pills -->
          <div class="dsp-case-filters-bar">
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn is-active" data-filter="all">Tất cả (20)</button>
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn" data-filter="metabolic_acidosis"><span style="color:#ef4444;">●</span> Toan Chuyển Hóa</button>
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn" data-filter="metabolic_alkalosis"><span style="color:#0ea5e9;">●</span> Kiềm Chuyển Hóa</button>
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn" data-filter="respiratory"><span style="color:#f59e0b;">●</span> Toan / Kiềm Hô Hấp</button>
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn" data-filter="mixed_triple"><span style="color:#8b5cf6;">●</span> Hỗn Hợp 3 Tầng</button>
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn" data-filter="toxic_osmolal"><span style="color:#ec4899;">●</span> Độc Chất &amp; Osmolal</button>
            <button type="button" class="dsp-case-filter-pill js-abg-filter-btn" data-filter="oxygenation_ards"><span style="color:#dc2626;">●</span> Oxy Hóa &amp; ARDS</button>
          </div>

          <!-- Cards Grid View -->
          <div id="abgPresetsGrid" class="dsp-case-grid">
            ${ABG_PRESETS.map((p, idx) => {
              const v = p.values;
              const pfVal = (v.pao2 && v.fio2) ? Math.round((v.pao2 / v.fio2) * 100) : null;
              const isPhAbnormal = v.ph < 7.35 || v.ph > 7.45;
              const isPaco2Abnormal = v.paco2 < 35 || v.paco2 > 45;
              const isHco3Abnormal = v.hco3 < 22 || v.hco3 > 26;

              return `
                <div class="dsp-case-card js-abg-preset-card js-abg-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description + ' ' + p.badge).toLowerCase())}">
                  <div>
                    <div class="dsp-case-card-header">
                      <span class="dsp-case-idx">#${String(idx + 1).padStart(2, '0')}</span>
                      <span class="dsp-case-badge" style="background:${p.badgeColor}18; color:${p.badgeColor}; border:1px solid ${p.badgeColor}40;">
                        <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:${p.badgeColor};"></span>
                        ${escapeHtml(p.badge)}
                      </span>
                    </div>

                    <div class="dsp-case-name">${escapeHtml(p.name)}</div>

                    <div class="dsp-case-metrics">
                      <span class="dsp-case-metric-tag" style="${isPhAbnormal ? 'color:#ef4444; border-color:rgba(239,68,68,0.3); background:rgba(239,68,68,0.06);' : ''}">
                        pH <strong>${v.ph.toFixed(2)}</strong>
                      </span>
                      <span class="dsp-case-metric-tag" style="${isPaco2Abnormal ? 'color:#f59e0b; border-color:rgba(245,158,11,0.3); background:rgba(245,158,11,0.06);' : ''}">
                        PaCO2 <strong>${v.paco2}</strong>
                      </span>
                      <span class="dsp-case-metric-tag" style="${isHco3Abnormal ? 'color:#0ea5e9; border-color:rgba(14,165,233,0.3); background:rgba(14,165,233,0.06);' : ''}">
                        HCO3 <strong>${v.hco3}</strong>
                      </span>
                      ${v.lactate && v.lactate > 2.0 ? `
                        <span class="dsp-case-metric-tag" style="color:#dc2626; border-color:rgba(220,38,38,0.3); background:rgba(220,38,38,0.06);">
                          Lactate <strong>${v.lactate}</strong>
                        </span>
                      ` : ''}
                      ${pfVal ? `
                        <span class="dsp-case-metric-tag" style="${pfVal < 300 ? 'color:#b91c1c; border-color:rgba(185,28,28,0.3);' : ''}">
                          P/F <strong>${pfVal}</strong>
                        </span>
                      ` : ''}
                      ${v.measuredOsmolality ? `
                        <span class="dsp-case-metric-tag" style="color:#8b5cf6;">
                          Osm <strong>${v.measuredOsmolality}</strong>
                        </span>
                      ` : ''}
                    </div>

                    <div class="dsp-case-desc">${escapeHtml(p.description)}</div>
                  </div>

                  <div class="dsp-case-card-footer">
                    <span style="font-size:0.7rem; color:var(--color-text-muted);">
                      <i class="fa-solid fa-user-injured"></i> ${v.patientAge || 45}t • ${v.patientWeightKg || 60}kg
                    </span>
                    <button type="button" class="dsp-case-load-btn">
                      <span>Nạp Ca Này</span> <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Compact Chips View (Hidden by default) -->
          <div id="abgPresetsChips" style="display:none; flex-wrap:wrap; gap:0.45rem; padding-top:0.25rem;">
            ${ABG_PRESETS.map(p => `
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-abg-preset-btn js-abg-preset-chip" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description).toLowerCase())}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
                <strong>${escapeHtml(p.name)}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Top Visual Graphic Nomogram & Ventilator Simulator Workspace -->
      <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        
        <!-- Davenport Nomogram Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-chart-line" style="color:var(--color-primary);"></i>
              <span>Biểu Đồ Toan Kiềm Davenport SVG (6 Vùng Màu &amp; Đường Đẳng Áp PaCO2 Động)</span>
            </div>
          </div>
          <div id="abgDavenportContainer" style="overflow-x:auto;">
            ${renderDavenportSvg(7.25, 26, 60)}
          </div>
        </div>

        <!-- Oxygenation Gauge & Ventilator Live Prediction Card -->
        <div class="dsp-card" style="padding:1rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
              <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-lungs" style="color:#0284c7;"></i>
                <span>Đồng Hồ Trao Đổi Khí &amp; ARDS (Berlin)</span>
              </div>
            </div>
            <div id="abgOxygenationGaugeWrap" style="margin-bottom:0.75rem;">
              ${renderOxygenationGaugeSvg(357, 18)}
            </div>
          </div>

          <!-- Quick Mechanical Ventilator Live Readout Box -->
          <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.25); border-radius:8px; padding:0.75rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
              <span style="font-size:11px; font-weight:800; color:var(--color-primary); text-transform:uppercase;">
                <i class="fa-solid fa-calculator"></i> Dự Báo Sau Can Thiệp Máy Thở:
              </span>
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleVentilatorDrawer" style="font-size:10.5px; padding:2px 8px;">
                <i class="fa-solid fa-sliders"></i> Tùy Chỉnh Máy Thở
              </button>
            </div>
            <div id="abgVentQuickReadout" style="font-size:12px; line-height:1.4;">
              <!-- Rendered dynamically via JS -->
            </div>
          </div>
        </div>

      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside ABG Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-abg-subtab-btn is-active" data-abg-tab="core_triad" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-vial"></i> 1. Khí Máu Cơ Bản
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-abg-subtab-btn" data-abg-tab="anion_osmolal" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-atom"></i> 2. Anion Gap &amp; Osmolal (Độc Chất)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-abg-subtab-btn" data-abg-tab="urine_rta" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-droplet"></i> 3. Nước Tiểu &amp; Toan Hóa Ống Thận (UAG)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-abg-subtab-btn" data-abg-tab="oxygenation_hb" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-lungs-virus"></i> 4. Oxy Hóa &amp; Huyết Sắc Tố (CO/MetHb)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-abg-subtab-btn" data-abg-tab="vent_simulator" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-sliders"></i> 5. Mô Phỏng Cài Đặt Máy Thở
            </button>
          </div>

          <!-- Sub-tab Panels -->
          <!-- 1. CORE TRIAD & BASIC GASES -->
          <div class="js-abg-subtab-panel" id="abgSubtabCoreTriad" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:var(--color-primary);">
                <i class="fa-solid fa-vial"></i> Bộ Ba Cơ Bản (Core Triad) &amp; Kiểm Tra Nhất Quán Henderson-Hasselbalch
              </h4>
              
              <!-- Row 1: Core Triad -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <!-- pH Tile -->
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#ef4444;"></i> pH Máu <span class="dsp-required">*</span></span>
                    <span class="dsp-spec-unit-badge">pH</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPh" data-step="-0.01">−</button>
                    <input class="dsp-spec-input js-abg-input" type="number" id="abgPh" value="7.25" step="0.01" min="6.8" max="7.9" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPh" data-step="0.01">+</button>
                  </div>
                  <input class="dsp-range-slider js-abg-slider" type="range" id="sliderAbgPh" min="6.80" max="7.80" step="0.01" value="7.25" />
                  <div class="dsp-spec-range">
                    <span>Chuẩn sinh lý:</span>
                    <span class="dsp-spec-ref">7.35 – 7.45</span>
                  </div>
                </div>

                <!-- PaCO2 Tile -->
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-wind" style="color:#0284c7;"></i> PaCO2 <span class="dsp-required">*</span></span>
                    <span class="dsp-spec-unit-badge">mmHg</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPaco2" data-step="-1">−</button>
                    <input class="dsp-spec-input js-abg-input" type="number" id="abgPaco2" value="60" step="1" min="10" max="150" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPaco2" data-step="1">+</button>
                  </div>
                  <input class="dsp-range-slider js-abg-slider" type="range" id="sliderAbgPaco2" min="15" max="100" step="1" value="60" />
                  <div class="dsp-spec-range">
                    <span>Chuẩn sinh lý:</span>
                    <span class="dsp-spec-ref">35 – 45</span>
                  </div>
                </div>

                <!-- HCO3 Tile -->
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-flask" style="color:#10b981;"></i> HCO3- <span class="dsp-required">*</span></span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgHco3" data-step="-0.5">−</button>
                    <input class="dsp-spec-input js-abg-input" type="number" id="abgHco3" value="26" step="0.5" min="2" max="60" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgHco3" data-step="0.5">+</button>
                  </div>
                  <input class="dsp-range-slider js-abg-slider" type="range" id="sliderAbgHco3" min="5" max="50" step="0.5" value="26" />
                  <div class="dsp-spec-range">
                    <span>Chuẩn sinh lý:</span>
                    <span class="dsp-spec-ref">22 – 26</span>
                  </div>
                </div>
              </div>

              <!-- Row 2: Oxygenation & Environmental factors -->
              <div class="dsp-spec-grid">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">PaO2 (Phân áp Oxy)</span>
                    <span class="dsp-spec-unit-badge">mmHg</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPao2" data-step="-5">−</button>
                    <input class="dsp-spec-input js-abg-input" type="number" id="abgPao2" value="75" step="1" min="20" max="600" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPao2" data-step="5">+</button>
                  </div>
                  <div class="dsp-spec-range">
                    <span>Khí trời:</span>
                    <span class="dsp-spec-ref">80 – 100</span>
                  </div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">FiO2 (Oxy khí thở)</span>
                    <span class="dsp-spec-unit-badge">%</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgFio2" data-step="-5">−</button>
                    <input class="dsp-spec-input js-abg-input" type="number" id="abgFio2" value="21" step="1" min="21" max="100" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgFio2" data-step="5">+</button>
                  </div>
                  <div class="dsp-spec-range">
                    <span>Khí trời tự nhiên:</span>
                    <span class="dsp-spec-ref">21%</span>
                  </div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tuổi &amp; Áp Suất Khí Quyển</span>
                    <span class="dsp-spec-unit-badge">tuổi / mmHg</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    <input class="dsp-input js-abg-input" type="number" id="abgPatientAge" value="45" min="1" max="110" placeholder="Tuổi" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <input class="dsp-input js-abg-input" type="number" id="abgPatm" value="760" min="400" max="800" placeholder="Patm" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                  </div>
                  <div class="dsp-spec-range">
                    <span>Chuẩn mực biển:</span>
                    <span class="dsp-spec-ref">Patm 760 mmHg</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. ANION GAP & OSMOLAL GAP (TOXICOLOGY) -->
          <div class="js-abg-subtab-panel" id="abgSubtabAnionOsmolal" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ea580c;">
                <i class="fa-solid fa-atom"></i> Anion Gap Hiệu Chỉnh Albumin / Phosphate &amp; Khoảng Trống Thẩm Thấu (Osmolal Gap)
              </h4>

              <!-- Row 1: Electrolytes for AG -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Natri (Na+)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgNa" value="140" step="1" min="100" max="180" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">135 – 145</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Kali (K+)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgK" value="4.0" step="0.1" min="1.0" max="10.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">3.5 – 5.0</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Clo (Cl-)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgCl" value="100" step="1" min="60" max="140" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">96 – 106</span></div>
                </div>
              </div>

              <!-- Row 2: Albumin, Phosphate, Lactate -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Albumin Máu</span>
                    <span class="dsp-spec-unit-badge">g/dL</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgAlbumin" value="4.0" step="0.1" min="1" max="6" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">3.5 – 5.0</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Phosphate Máu</span>
                    <span class="dsp-spec-unit-badge">mg/dL</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgPhosphate" value="3.5" step="0.1" min="0.5" max="15" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">2.5 – 4.5</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Lactate Máu</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgLactate" value="1.8" step="0.1" min="0" max="30" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Bình thường:</span><span class="dsp-spec-ref">&lt; 2.0</span></div>
                </div>
              </div>

              <!-- Row 3: Osmolality Parameters (Methanol / Ethylene Glycol) -->
              <div style="background:rgba(234,88,12,0.06); border:1px solid rgba(234,88,12,0.25); border-radius:8px; padding:0.85rem;">
                <div style="font-weight:800; font-size:11.5px; color:#ea580c; text-transform:uppercase; margin-bottom:0.5rem;">
                  <i class="fa-solid fa-beer-mug-empty"></i> Thông Số Thẩm Thấu &amp; Tìm Cồn Độc Chất (Toxic Alcohols):
                </div>
                <div class="dsp-spec-grid">
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Áp Suất Thẩm Thấu Đo Được (mOsm/kg):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgMeasuredOsm" placeholder="VD: 300" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:3px;" />
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Glucose Máu (mmol/L):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgGlucose" value="5.6" step="0.1" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:3px;" />
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">BUN / Ure (mg/dL hoặc mmol/L):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgBun" value="14" step="1" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:3px;" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 3. URINARY ANION GAP & RTA -->
          <div class="js-abg-subtab-panel" id="abgSubtabUrineRta" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ca8a04;">
                <i class="fa-solid fa-droplet"></i> Điện Giải Niệu &amp; Khoảng Trống Anion Niệu (UAG = Na_u + K_u - Cl_u)
              </h4>
              <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:1rem;">
                Chỉ định khi có <strong>Toan Chuyển Hóa Anion Gap Bình Thường (Tăng Clo máu)</strong> nhằm phân biệt mất Bicarbonate qua đường tiêu hóa (UAG âm sâu) với Toan hóa ống thận RTA (UAG dương).
              </p>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Natri Niệu (Na_u)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgUrineNa" placeholder="VD: 40" style="font-weight:700;" />
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Kali Niệu (K_u)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgUrineK" placeholder="VD: 25" style="font-weight:700;" />
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Clo Niệu (Cl_u)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgUrineCl" placeholder="VD: 35" style="font-weight:700;" />
                </div>
              </div>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted);">pH Nước Tiểu (Urine Dipstick / Điện cực pH):</label>
                <input class="dsp-input js-abg-input" type="number" id="abgUrinePh" step="0.1" min="4.5" max="8.5" placeholder="VD: 5.5" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:3px; max-width:200px;" />
                <span style="font-size:11px; color:var(--color-text-muted); margin-left:8px;">(pH niệu &gt; 5.5 khi đang toan máu nặng ➔ Gợi ý Distal RTA Type 1)</span>
              </div>
            </div>
          </div>

          <!-- 4. OXYGENATION & TOXIC HEMOGLOBIN (ARDS / CO / METHB) -->
          <div class="js-abg-subtab-panel" id="abgSubtabOxygenationHb" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#dc2626;">
                <i class="fa-solid fa-lungs-virus"></i> Oxy Hóa Màng Phế Nang, PEEP &amp; Độc Chất Huyết Sắc Tố (CO &amp; MetHb)
              </h4>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cài Đặt PEEP</span>
                    <span class="dsp-spec-unit-badge">cmH2O</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgPeep" value="5" step="1" min="0" max="24" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Berlin tiêu chuẩn:</span><span class="dsp-spec-ref">&ge; 5 cmH2O</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Áp Lực Đường Thở Trung Bình (MAP)</span>
                    <span class="dsp-spec-unit-badge">cmH2O</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgMap" placeholder="VD: 14" step="1" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Dùng cho:</span><span class="dsp-spec-ref">Oxygenation Index</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cân Nặng Bệnh Nhân</span>
                    <span class="dsp-spec-unit-badge">kg</span>
                  </div>
                  <input class="dsp-input js-abg-input" type="number" id="abgPatientWeight" value="60" step="1" min="20" max="200" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Tính liều bù:</span><span class="dsp-spec-ref">NaHCO3 8.4%</span></div>
                </div>
              </div>

              <div style="background:rgba(220,38,38,0.06); border:1px solid rgba(220,38,38,0.25); border-radius:8px; padding:0.85rem;">
                <div style="font-weight:800; font-size:11.5px; color:#dc2626; text-transform:uppercase; margin-bottom:0.5rem;">
                  <i class="fa-solid fa-skull-crossbones"></i> Co-oximetry &amp; Độc Chất Huyết Sắc Tố:
                </div>
                <div class="dsp-spec-grid">
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">% Carboxyhemoglobin (COHb):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgCohb" placeholder="VD: 2.0" step="0.5" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:3px;" />
                    <span style="font-size:10.5px; color:var(--color-text-muted);">&gt; 5% là bất thường (Ngộ độc CO)</span>
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">% Methemoglobin (MetHb):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgMethb" placeholder="VD: 1.0" step="0.5" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:3px;" />
                    <span style="font-size:10.5px; color:var(--color-text-muted);">&gt; 5% là bất thường (Dapsone / Nitrit)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 5. VENTILATOR SIMULATOR LAB -->
          <div class="js-abg-subtab-panel" id="abgSubtabVentSimulator" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:var(--color-primary);">
                <i class="fa-solid fa-sliders"></i> Bộ Giả Lập Can Thiệp Thông Khí Phút (Mechanical Ventilator Titration Lab)
              </h4>
              <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:1rem;">
                Phương trình bảo toàn CO2: $PaCO_{2\text{ (mới)}} = PaCO_{2\text{ (cũ)}} \times \frac{V_{E\text{ (cũ)}}}{V_{E\text{ (mới)}}}$. Kéo thanh trượt để dự báo tức thì $PaCO_2$ và $pH$ mới sau khi điều chỉnh máy thở.
              </p>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
                <!-- Current Settings -->
                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                  <div style="font-weight:800; font-size:11.5px; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.5rem;">
                    1. Cài Đặt Hiện Tại (Current Ventilator Settings):
                  </div>
                  <div style="margin-bottom:0.6rem;">
                    <label style="font-size:11px; font-weight:700;">Thể tích lưu thông hiện tại Vt (mL):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgVentCurrentVt" value="400" step="10" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700;">Tần số thở hiện tại RR (lần/phút):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgVentCurrentRr" value="14" step="1" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                </div>

                <!-- Target Settings -->
                <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.3); border-radius:8px; padding:0.85rem;">
                  <div style="font-weight:800; font-size:11.5px; color:var(--color-primary); text-transform:uppercase; margin-bottom:0.5rem;">
                    2. Cài Đặt Mục Tiêu Can Thiệp (Target Settings):
                  </div>
                  <div style="margin-bottom:0.6rem;">
                    <label style="font-size:11px; font-weight:700;">Mục tiêu Vt (mL):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgVentTargetVt" value="440" step="10" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700;">Mục tiêu RR (lần/phút):</label>
                    <input class="dsp-input js-abg-input" type="number" id="abgVentTargetRr" value="18" step="1" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                </div>
              </div>

              <div id="abgVentSimResultBox" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <!-- Rendered via JS -->
              </div>

            </div>
          </div>

        </div>

        <!-- ABG Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="abgResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountAbgController(bindActionBtns: (container: HTMLElement) => void): void {
  const abgPhInput = document.getElementById('abgPh') as HTMLInputElement;
  const abgPaco2Input = document.getElementById('abgPaco2') as HTMLInputElement;
  const abgHco3Input = document.getElementById('abgHco3') as HTMLInputElement;
  const sliderAbgPh = document.getElementById('sliderAbgPh') as HTMLInputElement;
  const sliderAbgPaco2 = document.getElementById('sliderAbgPaco2') as HTMLInputElement;
  const sliderAbgHco3 = document.getElementById('sliderAbgHco3') as HTMLInputElement;

  sliderAbgPh?.addEventListener('input', () => { if (abgPhInput) abgPhInput.value = sliderAbgPh.value; recalcAbg(); });
  sliderAbgPaco2?.addEventListener('input', () => { if (abgPaco2Input) abgPaco2Input.value = sliderAbgPaco2.value; recalcAbg(); });
  sliderAbgHco3?.addEventListener('input', () => { if (abgHco3Input) abgHco3Input.value = sliderAbgHco3.value; recalcAbg(); });

  // 1. Sub-tab navigation inside ABG Studio
  const abgSubtabBtns = document.querySelectorAll<HTMLElement>('.js-abg-subtab-btn');
  const abgSubtabPanels = document.querySelectorAll<HTMLElement>('.js-abg-subtab-panel');

  abgSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      abgSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-abg-tab');

      abgSubtabPanels.forEach(p => p.style.display = 'none');
      if (target === 'core_triad') {
        const p = document.getElementById('abgSubtabCoreTriad'); if (p) p.style.display = 'block';
      } else if (target === 'anion_osmolal') {
        const p = document.getElementById('abgSubtabAnionOsmolal'); if (p) p.style.display = 'block';
      } else if (target === 'urine_rta') {
        const p = document.getElementById('abgSubtabUrineRta'); if (p) p.style.display = 'block';
      } else if (target === 'oxygenation_hb') {
        const p = document.getElementById('abgSubtabOxygenationHb'); if (p) p.style.display = 'block';
      } else if (target === 'vent_simulator') {
        const p = document.getElementById('abgSubtabVentSimulator'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Real-time Search & Category Filter for 20 Presets
  const abgSearchInput = document.getElementById('abgCaseSearchInput') as HTMLInputElement | null;
  const abgFilterBtns = document.querySelectorAll<HTMLElement>('.js-abg-filter-btn');
  let currentCategoryFilter = 'all';

  const applyCaseFiltering = () => {
    const query = (abgSearchInput?.value || '').trim().toLowerCase();
    const presetItems = document.querySelectorAll<HTMLElement>('.js-abg-preset-btn');

    presetItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const searchStr = item.getAttribute('data-search') || '';

      const matchesCat = currentCategoryFilter === 'all' || cat === currentCategoryFilter;
      const matchesQuery = !query || searchStr.includes(query);

      if (matchesCat && matchesQuery) {
        if (item.classList.contains('js-abg-preset-card')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'inline-flex';
        }
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (abgSearchInput) {
    abgSearchInput.addEventListener('input', applyCaseFiltering);
  }

  abgFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      abgFilterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentCategoryFilter = btn.getAttribute('data-filter') || 'all';
      applyCaseFiltering();
    });
  });

  // View Switcher (Grid vs Chips)
  const viewToggleBtns = document.querySelectorAll<HTMLElement>('.js-case-view-toggle');
  const gridView = document.getElementById('abgPresetsGrid');
  const chipsView = document.getElementById('abgPresetsChips');

  viewToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewToggleBtns.forEach(b => {
        b.classList.remove('is-active');
        b.style.background = 'transparent';
      });
      btn.classList.add('is-active');
      btn.style.background = 'var(--color-surface)';

      const mode = btn.getAttribute('data-view');
      if (mode === 'grid') {
        if (gridView) gridView.style.display = 'grid';
        if (chipsView) chipsView.style.display = 'none';
      } else {
        if (gridView) gridView.style.display = 'none';
        if (chipsView) chipsView.style.display = 'flex';
      }
    });
  });

  // Collapse / Expand Vault Body
  const btnToggleCollapse = document.getElementById('btnToggleVaultCollapse');
  const vaultBody = document.getElementById('abgVaultBody');
  const iconCollapse = document.getElementById('iconVaultCollapse');

  btnToggleCollapse?.addEventListener('click', () => {
    if (!vaultBody) return;
    const isHidden = vaultBody.style.display === 'none';
    vaultBody.style.display = isHidden ? 'block' : 'none';
    if (iconCollapse) {
      iconCollapse.className = isHidden ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    }
  });

  // 3. Toggle quick ventilator drawer
  const btnToggleVentDrawer = document.getElementById('btnToggleVentilatorDrawer');
  btnToggleVentDrawer?.addEventListener('click', () => {
    const ventTabBtn = document.querySelector<HTMLElement>('.js-abg-subtab-btn[data-abg-tab="vent_simulator"]');
    ventTabBtn?.click();
  });

  // 4. Preset Load Buttons (20 Presets)
  document.querySelectorAll<HTMLElement>('.js-abg-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = ABG_PRESETS.find(p => p.id === id);
      if (!preset) return;

      // Update active highlight on cards & chips
      document.querySelectorAll<HTMLElement>('.js-abg-preset-btn').forEach(b => {
        b.classList.remove('is-active');
        if (b.getAttribute('data-preset-id') === id) {
          b.classList.add('is-active');
        }
      });

      const v = preset.values;
      if (abgPhInput) abgPhInput.value = String(v.ph);
      if (sliderAbgPh) sliderAbgPh.value = String(v.ph);
      if (abgPaco2Input) abgPaco2Input.value = String(v.paco2);
      if (sliderAbgPaco2) sliderAbgPaco2.value = String(v.paco2);
      if (abgHco3Input) abgHco3Input.value = String(v.hco3);
      if (sliderAbgHco3) sliderAbgHco3.value = String(v.hco3);

      (document.getElementById('abgPao2') as HTMLInputElement).value = String(v.pao2 || 80);
      (document.getElementById('abgFio2') as HTMLInputElement).value = String(v.fio2 || 21);
      (document.getElementById('abgPatientAge') as HTMLInputElement).value = String(v.patientAge || 45);
      (document.getElementById('abgPatm') as HTMLInputElement).value = String(v.patm || 760);

      (document.getElementById('abgNa') as HTMLInputElement).value = String(v.na || 140);
      (document.getElementById('abgK') as HTMLInputElement).value = String(v.k || 4.0);
      (document.getElementById('abgCl') as HTMLInputElement).value = String(v.cl || 100);
      (document.getElementById('abgAlbumin') as HTMLInputElement).value = String(v.albumin || 4.0);
      (document.getElementById('abgPhosphate') as HTMLInputElement).value = String(v.phosphate || 3.5);
      (document.getElementById('abgLactate') as HTMLInputElement).value = String(v.lactate || 1.5);

      (document.getElementById('abgMeasuredOsm') as HTMLInputElement).value = v.measuredOsmolality ? String(v.measuredOsmolality) : '';
      (document.getElementById('abgGlucose') as HTMLInputElement).value = String(v.glucose || 5.6);
      (document.getElementById('abgBun') as HTMLInputElement).value = String(v.bun || 14);

      (document.getElementById('abgUrineNa') as HTMLInputElement).value = v.urineNa ? String(v.urineNa) : '';
      (document.getElementById('abgUrineK') as HTMLInputElement).value = v.urineK ? String(v.urineK) : '';
      (document.getElementById('abgUrineCl') as HTMLInputElement).value = v.urineCl ? String(v.urineCl) : '';
      (document.getElementById('abgUrinePh') as HTMLInputElement).value = v.urinePh ? String(v.urinePh) : '';

      (document.getElementById('abgPeep') as HTMLInputElement).value = String(v.peep || 5);
      (document.getElementById('abgMap') as HTMLInputElement).value = v.meanAirwayPressure ? String(v.meanAirwayPressure) : '';
      (document.getElementById('abgPatientWeight') as HTMLInputElement).value = String(v.patientWeightKg || 60);
      (document.getElementById('abgCohb') as HTMLInputElement).value = v.cohbPercent ? String(v.cohbPercent) : '';
      (document.getElementById('abgMethb') as HTMLInputElement).value = v.methbPercent ? String(v.methbPercent) : '';

      (document.getElementById('abgVentCurrentVt') as HTMLInputElement).value = String(v.ventCurrentVt || 400);
      (document.getElementById('abgVentCurrentRr') as HTMLInputElement).value = String(v.ventCurrentRr || 14);
      (document.getElementById('abgVentTargetVt') as HTMLInputElement).value = String(v.ventTargetVt || 440);
      (document.getElementById('abgVentTargetRr') as HTMLInputElement).value = String(v.ventTargetRr || 18);

      recalcAbg();
    });
  });

  // 5. Recalculate ABG Core Function
  const recalcAbg = () => {
    const ph = parseFloat(abgPhInput?.value) || 7.25;
    const paco2 = parseFloat(abgPaco2Input?.value) || 60;
    const hco3 = parseFloat(abgHco3Input?.value) || 26;
    const pao2 = parseFloat((document.getElementById('abgPao2') as HTMLInputElement)?.value) || undefined;
    const fio2 = parseFloat((document.getElementById('abgFio2') as HTMLInputElement)?.value) || 21;
    const patientAge = parseFloat((document.getElementById('abgPatientAge') as HTMLInputElement)?.value) || 45;
    const patm = parseFloat((document.getElementById('abgPatm') as HTMLInputElement)?.value) || 760;

    const na = parseFloat((document.getElementById('abgNa') as HTMLInputElement)?.value) || undefined;
    const k = parseFloat((document.getElementById('abgK') as HTMLInputElement)?.value) || 4.0;
    const cl = parseFloat((document.getElementById('abgCl') as HTMLInputElement)?.value) || undefined;
    const albumin = parseFloat((document.getElementById('abgAlbumin') as HTMLInputElement)?.value) || 4.0;
    const phosphate = parseFloat((document.getElementById('abgPhosphate') as HTMLInputElement)?.value) || 3.5;
    const lactate = parseFloat((document.getElementById('abgLactate') as HTMLInputElement)?.value) || undefined;

    const measuredOsm = parseFloat((document.getElementById('abgMeasuredOsm') as HTMLInputElement)?.value) || undefined;
    const glucose = parseFloat((document.getElementById('abgGlucose') as HTMLInputElement)?.value) || undefined;
    const bun = parseFloat((document.getElementById('abgBun') as HTMLInputElement)?.value) || undefined;

    const urineNa = parseFloat((document.getElementById('abgUrineNa') as HTMLInputElement)?.value) || undefined;
    const urineK = parseFloat((document.getElementById('abgUrineK') as HTMLInputElement)?.value) || undefined;
    const urineCl = parseFloat((document.getElementById('abgUrineCl') as HTMLInputElement)?.value) || undefined;

    const peep = parseFloat((document.getElementById('abgPeep') as HTMLInputElement)?.value) || 5;
    const meanAirwayPressure = parseFloat((document.getElementById('abgMap') as HTMLInputElement)?.value) || undefined;
    const patientWeightKg = parseFloat((document.getElementById('abgPatientWeight') as HTMLInputElement)?.value) || 60;
    const cohbPercent = parseFloat((document.getElementById('abgCohb') as HTMLInputElement)?.value) || undefined;
    const methbPercent = parseFloat((document.getElementById('abgMethb') as HTMLInputElement)?.value) || undefined;

    const ventCurrentVt = parseFloat((document.getElementById('abgVentCurrentVt') as HTMLInputElement)?.value) || 400;
    const ventCurrentRr = parseFloat((document.getElementById('abgVentCurrentRr') as HTMLInputElement)?.value) || 14;
    const ventTargetVt = parseFloat((document.getElementById('abgVentTargetVt') as HTMLInputElement)?.value) || 440;
    const ventTargetRr = parseFloat((document.getElementById('abgVentTargetRr') as HTMLInputElement)?.value) || 18;

    const inputs: AbgInputs = {
      ph, paco2, hco3, pao2, fio2, patm, patientAge, peep, meanAirwayPressure,
      na, k, cl, albumin, phosphate, lactate,
      measuredOsmolality: measuredOsm, glucose, bun, isGlucoseMmol: true,
      urineNa, urineK, urineCl,
      cohbPercent, methbPercent, patientWeightKg,
      ventCurrentVt, ventCurrentRr, ventTargetVt, ventTargetRr
    };

    const res = analyzeAbg(inputs);

    // Update Davenport Nomogram SVG
    const davenportContainer = document.getElementById('abgDavenportContainer');
    if (davenportContainer) davenportContainer.innerHTML = renderDavenportSvg(ph, hco3, paco2);

    // Update Oxygenation Gauge SVG
    const oxyGaugeWrap = document.getElementById('abgOxygenationGaugeWrap');
    if (oxyGaugeWrap) oxyGaugeWrap.innerHTML = renderOxygenationGaugeSvg(res.pfRatio, res.aaGradient);

    // Update Ventilator Quick Readout Box
    const ventQuickReadout = document.getElementById('abgVentQuickReadout');
    if (ventQuickReadout) {
      if (res.predictedPaco2WithTargetVent && res.predictedPhWithTargetVent) {
        ventQuickReadout.innerHTML = `
          <div>Thông khí hiện tại: <strong>${((ventCurrentVt * ventCurrentRr) / 1000).toFixed(1)} L/p</strong> ➔ Mục tiêu: <strong>${((ventTargetVt * ventTargetRr) / 1000).toFixed(1)} L/p</strong></div>
          <div style="margin-top:0.25rem; font-weight:800; color:var(--color-primary);">
            Dự báo sau chỉnh máy thở: PaCO2 = ${res.predictedPaco2WithTargetVent} mmHg | pH = ${res.predictedPhWithTargetVent}
          </div>
        `;
      } else {
        ventQuickReadout.innerHTML = `<div>Nhập thông số máy thở để nhận dự báo tức thì PaCO2 và pH mới.</div>`;
      }
    }

    // Update Ventilator Simulator Subtab Box
    const ventSimBox = document.getElementById('abgVentSimResultBox');
    if (ventSimBox && res.predictedPaco2WithTargetVent) {
      ventSimBox.innerHTML = `
        <div style="font-weight:800; font-size:12.5px; color:var(--color-primary); margin-bottom:0.35rem;">
          <i class="fa-solid fa-chart-line"></i> Kết Quả Mô Phỏng Thay Đổi Thông Khí Phút (Minute Ventilation):
        </div>
        <div style="font-size:12px; line-height:1.5;">
          • Thông khí phút cũ: <strong>${((ventCurrentVt * ventCurrentRr) / 1000).toFixed(2)} L/phút</strong> ➔ PaCO2 = ${paco2} mmHg (pH ${ph})<br/>
          • Thông khí phút mới: <strong>${((ventTargetVt * ventTargetRr) / 1000).toFixed(2)} L/phút</strong> ➔ <strong>PaCO2 dự kiến: ${res.predictedPaco2WithTargetVent} mmHg</strong> (<strong>pH dự kiến: ${res.predictedPhWithTargetVent}</strong>)<br/>
          • Hướng dẫn ARDSNet: Cài đặt Vt bảo vệ phổi <strong>6 mL/kg cân nặng lý tưởng (PBW)</strong>, duy trì áp lực đẩy Driving Pressure &lt; 14 cmH2O.
        </div>
      `;
    }

    // Render Full EBM Diagnostic Result Card
    const resultCard = document.getElementById('abgResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:var(--color-primary);"></i> Kết Quả Chẩn Đoán Khí Máu Pro</h3>
        </div>
        <div style="padding:1.25rem;">
          
          <!-- Emergency Flags Banner -->
          ${res.emergencyFlags.length > 0 ? `
            <div style="background:rgba(220,38,38,0.1); border:1px solid rgba(220,38,38,0.35); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.35rem;">
                <i class="fa-solid fa-triangle-exclamation"></i> Cảnh Báo Khẩn Cấp (Red Flags):
              </div>
              <ul style="margin:0; padding-left:1.2rem; font-size:12px; color:var(--color-text); font-weight:600; display:flex; flex-direction:column; gap:0.3rem;">
                ${res.emergencyFlags.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Consistency Warning -->
          ${res.consistencyWarning ? `
            <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              ${escapeHtml(res.consistencyWarning)}
            </div>
          ` : ''}

          <!-- Primary Disorder Summary Card -->
          <div style="background:rgba(2,132,199,0.08); border-left:4px solid var(--color-primary); padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase;">Kết Luận Toan Kiềm Nguyên Phát:</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--color-text); margin-top:0.25rem;">
              ${escapeHtml(res.primaryDisorder)}
            </div>
            <div style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.25rem; font-weight:600;">
              ${escapeHtml(res.compensationStatus)}
            </div>
            <div style="font-size:0.8rem; color:var(--color-text-muted); margin-top:0.2rem;">
              ${escapeHtml(res.expectedCompValue)}
            </div>
          </div>

          <!-- Anion Gap & Delta Ratio Panel -->
          ${res.anionGapCorrected !== null ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.4rem;">
                Phân Tích Anion Gap &amp; Delta Ratio:
              </div>
              <div style="font-size:12px; margin-bottom:0.35rem;">
                <strong>Anion Gap:</strong> <span class="dsp-badge ${res.anionGapCorrected > 12 ? 'dsp-badge--danger' : 'dsp-badge--info'}">${res.anionGapCorrected.toFixed(1)} mmol/L</span> (Chuẩn: 8 - 12)
                ${albumin !== 4.0 ? `<span style="font-size:11px; color:var(--color-text-muted);"> (Hiệu chỉnh Albumin: ${albumin} g/dL)</span>` : ''}
              </div>
              ${res.deltaRatioInterpretation ? `
                <div style="font-size:11.5px; color:var(--color-text-muted); line-height:1.4; border-top:1px dashed var(--color-border); padding-top:0.35rem; margin-top:0.35rem;">
                  <strong>Delta Ratio (${res.deltaRatio?.toFixed(2)}):</strong> ${escapeHtml(res.deltaRatioInterpretation)}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Osmolal Gap Warning -->
          ${res.osmolalGapInterpretation ? `
            <div style="background:${res.osmolalGap! > 10 ? 'rgba(220,38,38,0.08)' : 'var(--color-bg)'}; border:1px solid ${res.osmolalGap! > 10 ? 'rgba(220,38,38,0.3)' : 'var(--color-border)'}; border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              <strong>Osmolal Gap:</strong> ${escapeHtml(res.osmolalGapInterpretation)}
            </div>
          ` : ''}

          <!-- Urinary Anion Gap -->
          ${res.uagInterpretation ? `
            <div style="background:rgba(202,138,4,0.08); border:1px solid rgba(202,138,4,0.3); border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              <strong>Anion Gap Niệu (UAG):</strong> ${escapeHtml(res.uagInterpretation)}
            </div>
          ` : ''}

          <!-- Stewart Approach -->
          ${res.stewartInterpretation ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              <strong>Hóa lý Stewart:</strong> ${escapeHtml(res.stewartInterpretation)}
            </div>
          ` : ''}

          <!-- Oxygenation & ARDS Breakdown -->
          ${res.pfRatio ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              <div style="font-weight:800; margin-bottom:0.3rem;">Trao Đổi Khí Màng Phế Nang:</div>
              <div>• PaO2/FiO2: <strong>${res.pfRatio} mmHg</strong> ${res.berlinArdsCategory ? `➔ <span style="font-weight:700; color:#dc2626;">${escapeHtml(res.berlinArdsCategory)}</span>` : ''}</div>
              <div>• A-a Gradient: <strong>${res.aaGradient} mmHg</strong> (Kỳ vọng theo tuổi: ${res.aaGradientExpectedForAge} mmHg) ${res.isAaGradientElevated ? '➔ <span style="color:#dc2626; font-weight:700;">TĂNG CAO</span>' : ''}</div>
              ${res.shuntFractionEstimate ? `<div>• Shunt Phổi Ước Tính (Qs/Qt): <strong>${res.shuntFractionEstimate}%</strong></div>` : ''}
            </div>
          ` : ''}

          <!-- Bicarbonate Therapy Guidance -->
          ${res.bicarbDeficitMeq ? `
            <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.25); border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              <div style="font-weight:800; color:var(--color-primary); margin-bottom:0.3rem;"><i class="fa-solid fa-syringe"></i> Bù Natri Bicarbonate 8.4%:</div>
              <div>${escapeHtml(res.bicarbIndicationStatus)}</div>
            </div>
          ` : ''}

          <!-- Clinical Recommendations -->
          ${res.recommendations.length > 0 ? `
            <div style="background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:0.75rem; font-size:11.5px; margin-bottom:1rem;">
              <div style="font-weight:800; color:#f59e0b; margin-bottom:0.35rem;"><i class="fa-solid fa-lightbulb"></i> Khuyến Cáo Xử Trí Lâm Sàng:</div>
              <ul style="margin:0; padding-left:1.2rem; display:flex; flex-direction:column; gap:0.25rem;">
                ${res.recommendations.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="width:100%;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào Sổ Tay SOAP
            </button>
            <div style="display:flex; gap:0.5rem;">
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
                <i class="fa-regular fa-copy"></i> Sao chép EMR
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" onclick="window.print();" style="flex:1;">
                <i class="fa-solid fa-print"></i> In / Xuất PDF
              </button>
            </div>
          </div>

        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-abg-input').forEach(i => i.addEventListener('input', recalcAbg));

  // Chạy tính toán ban đầu
  recalcAbg();
}
