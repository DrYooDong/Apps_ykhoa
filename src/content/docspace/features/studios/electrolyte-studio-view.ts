/**
 * DocSpace — Electrolyte & Fluid Research Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for Electrolyte Studio
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeElectrolyte, renderFluidTimelineSvg,
  ELYTE_PRESETS, ElectrolyteInputs, INFUSATE_DATA
} from './electrolyte-studio';

export function renderElectrolytePanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioElectrolyte" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (20 Curated Research Presets - Redesigned Clinical Vault) -->
      <div class="dsp-case-vault" id="elyteCaseVault">
        <!-- Vault Header Toolbar -->
        <div class="dsp-case-vault-header">
          <div class="dsp-case-vault-title">
            <i class="fa-solid fa-droplet" style="color:#0284c7; font-size:1.15rem;"></i>
            <span>Kho 20 Ca Nghiên Cứu Thăng Bằng Điện Giải &amp; Hồi Sức Dịch Mẫu</span>
            <span class="dsp-badge" style="background:rgba(2,132,199,0.12); color:#0284c7; border:1px solid rgba(2,132,199,0.25); font-size:11px;">20 Ca Chuẩn EBM</span>
          </div>

          <div class="dsp-case-vault-toolbar">
            <!-- Quick Search Input -->
            <div class="dsp-case-search-wrap">
              <i class="fa-solid fa-magnifying-glass dsp-case-search-icon"></i>
              <input type="text" id="elyteCaseSearchInput" class="dsp-case-search-input" placeholder="Tìm theo tên ca, Hạ Natri, ODS, Tăng Kali, Canxi..." />
            </div>

            <!-- View Switcher & Collapse -->
            <div style="display:flex; gap:4px; background:var(--color-bg); padding:2px; border-radius:8px; border:1px solid var(--color-border);">
              <button type="button" class="dsp-btn dsp-btn-sm js-elyte-view-toggle is-active" data-view="grid" title="Xem dạng lưới thẻ" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none;">
                <i class="fa-solid fa-table-cells-large"></i> Lưới Thẻ
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-elyte-view-toggle" data-view="chips" title="Xem dạng thu gọn" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none; background:transparent;">
                <i class="fa-solid fa-list-ul"></i> Thu Gọn
              </button>
            </div>

            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleElyteVaultCollapse" title="Thu gọn / Mở rộng kho ca" style="padding:4px 8px; font-size:11px;">
              <i class="fa-solid fa-chevron-up" id="iconElyteVaultCollapse"></i>
            </button>
          </div>
        </div>

        <!-- Vault Content Body -->
        <div id="elyteVaultBody">
          <!-- Category Filter Pills -->
          <div class="dsp-case-filters-bar">
            <button type="button" class="dsp-case-filter-pill js-elyte-filter-btn is-active" data-filter="all">Tất cả (20)</button>
            <button type="button" class="dsp-case-filter-pill js-elyte-filter-btn" data-filter="hyponatremia"><span style="color:#0284c7;">●</span> Hạ Natri</button>
            <button type="button" class="dsp-case-filter-pill js-elyte-filter-btn" data-filter="hypernatremia"><span style="color:#ea580c;">●</span> Tăng Natri (FWD)</button>
            <button type="button" class="dsp-case-filter-pill js-elyte-filter-btn" data-filter="potassium"><span style="color:#ef4444;">●</span> Rối Loạn Kali</button>
            <button type="button" class="dsp-case-filter-pill js-elyte-filter-btn" data-filter="calcium_mg_p"><span style="color:#8b5cf6;">●</span> Canxi / Magie / PO4</button>
            <button type="button" class="dsp-case-filter-pill js-elyte-filter-btn" data-filter="critical_resus"><span style="color:#dc2626;">●</span> Cấp Cứu Khẩn</button>
          </div>

          <!-- Cards Grid View -->
          <div id="elytePresetsGrid" class="dsp-case-grid">
            ${ELYTE_PRESETS.map((p, idx) => {
              const v = p.values;
              return `
                <div class="dsp-case-card js-elyte-preset-card js-elyte-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description + ' ' + p.badge).toLowerCase())}">
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
                      <span class="dsp-case-metric-tag">
                        Na+ <strong>${v.serumNa}</strong>
                      </span>
                      ${v.serumK ? `<span class="dsp-case-metric-tag" style="color:#ef4444;">K+ <strong>${v.serumK}</strong></span>` : ''}
                      ${v.serumCaTotal ? `<span class="dsp-case-metric-tag" style="color:#8b5cf6;">Ca <strong>${v.serumCaTotal}</strong></span>` : ''}
                      ${v.serumMg ? `<span class="dsp-case-metric-tag" style="color:#10b981;">Mg <strong>${v.serumMg}</strong></span>` : ''}
                      ${v.isHighOdsRisk ? `<span class="dsp-case-metric-tag" style="color:#dc2626; border-color:rgba(220,38,38,0.3); background:rgba(220,38,38,0.06);">ODS Nguy Cơ Cao</span>` : ''}
                    </div>

                    <div class="dsp-case-desc">${escapeHtml(p.description)}</div>
                  </div>

                  <div class="dsp-case-card-footer">
                    <span style="font-size:0.7rem; color:var(--color-text-muted);">
                      <i class="fa-solid fa-weight-scale"></i> ${v.weightKg}kg • ${v.gender === 'male' ? 'Nam' : 'Nữ'}
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
          <div id="elytePresetsChips" style="display:none; flex-wrap:wrap; gap:0.45rem; padding-top:0.25rem;">
            ${ELYTE_PRESETS.map(p => `
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-elyte-preset-btn js-elyte-preset-chip" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description).toLowerCase())}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
                <strong>${escapeHtml(p.name)}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Top Visual Graphic: 48h Adrogué-Madias Trajectory Curve & ODS Danger Zone -->
      <div class="dsp-card" style="margin-bottom:1.25rem; padding:1rem 1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-chart-area" style="color:#0284c7;"></i>
            <span>Đường Cong Quỹ Đạo Bù Dịch 48 Giờ SVG &amp; Hành Lang An Toàn Phòng Ngừa Hủy Myelin Cầu Não (ODS)</span>
          </div>
          <div style="font-size:11px; color:var(--color-text-muted);">
            Công thức Adrogué-Madias: &Delta;Na = (Na<sub>inf</sub> - Na<sub>serum</sub>) / (TBW + 1)
          </div>
        </div>
        <div id="elyteTimelineContainer" style="overflow-x:auto;">
          ${renderFluidTimelineSvg(118, 126, 42, 6, false)}
        </div>
      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside Electrolyte Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-elyte-subtab-btn is-active" data-elyte-tab="sodium_tab" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-droplet"></i> 1. Rối Loạn Natri Máu
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-elyte-subtab-btn" data-elyte-tab="potassium_tab" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-bolt"></i> 2. Rối Loạn Kali Máu
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-elyte-subtab-btn" data-elyte-tab="calcium_tab" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-bone"></i> 3. Rối Loạn Canxi Máu
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-elyte-subtab-btn" data-elyte-tab="mg_po4_tab" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-flask"></i> 4. Magie, Photpho &amp; Refeeding
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-elyte-subtab-btn" data-elyte-tab="fluid_matrix_tab" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-syringe"></i> 5. So Sánh 8 Loại Dịch Truyền
            </button>
          </div>

          <!-- Sub-tab Panels -->
          <!-- 1. SODIUM DISORDERS (HYPO/HYPERNATREMIA) -->
          <div class="js-elyte-subtab-panel" id="elyteSubtabSodium" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#0284c7;">
                <i class="fa-solid fa-droplet"></i> Bảng Nhập &amp; Phân Tầng Rối Loạn Natri (Adrogué-Madias &amp; Free Water Deficit)
              </h4>

              <!-- Row 1: Mode, Weight, Gender -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Phân Loại Rối Loạn Natri</span>
                    <span class="dsp-spec-unit-badge">Mode</span>
                  </div>
                  <select class="dsp-select js-elyte-input" id="elyteMode" style="font-weight:700;">
                    <option value="hyponatremia" selected>Hạ Natri Máu (Hyponatremia)</option>
                    <option value="hypernatremia">Tăng Natri Máu (Hypernatremia - FWD)</option>
                    <option value="hypokalemia">Hạ Kali Máu (Hypokalemia)</option>
                    <option value="hyperkalemia">Tăng Kali Máu (Hyperkalemia)</option>
                    <option value="calcium_disorder">Rối Loạn Canxi Máu</option>
                    <option value="magnesium_po4">Magie &amp; Photpho (Refeeding)</option>
                  </select>
                  <div class="dsp-spec-range"><span>Thuật toán:</span><span class="dsp-spec-ref">Adrogué / FWD</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cân Nặng Bệnh Nhân</span>
                    <span class="dsp-spec-unit-badge">kg</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteWeight" data-step="-1">−</button>
                    <input class="dsp-spec-input js-elyte-input" type="number" id="elyteWeight" value="60" min="20" max="250" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteWeight" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>TBW ước tính:</span><span class="dsp-spec-ref">50 – 60% thể trọng</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Giới Tính &amp; Tuổi Tác</span>
                    <span class="dsp-spec-unit-badge">TBW</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    <select class="dsp-select js-elyte-input" id="elyteGender" style="padding:4px 8px; font-size:12px; font-weight:700;">
                      <option value="male" selected>Nam (0.6)</option>
                      <option value="female">Nữ (0.5)</option>
                    </select>
                    <label style="font-size:11px; display:flex; align-items:center; gap:4px; cursor:pointer;">
                      <input type="checkbox" id="elyteIsElderly" class="js-elyte-input" /> <span>Cao tuổi (-0.05)</span>
                    </label>
                  </div>
                  <div class="dsp-spec-range"><span>Hệ số nước:</span><span class="dsp-spec-ref">TBW fraction</span></div>
                </div>
              </div>

              <!-- Row 2: Serum Na, Target Na, Glucose -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#0284c7;"></i> Natri Máu Hiện Tại (Na+)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteNa" data-step="-1">−</button>
                    <input class="dsp-spec-input js-elyte-input" type="number" id="elyteNa" value="118" min="80" max="200" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteNa" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Chuẩn sinh lý:</span><span class="dsp-spec-ref">135 – 145 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Natri Mục Tiêu Đích</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteTargetNa" data-step="-1">−</button>
                    <input class="dsp-spec-input js-elyte-input" type="number" id="elyteTargetNa" value="126" min="100" max="160" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteTargetNa" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Hạ Na đích:</span><span class="dsp-spec-ref">+6 – 8 trong 24h</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Đường Huyết (Glucose)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteGlucose" data-step="-0.5">−</button>
                    <input class="dsp-spec-input js-elyte-input" type="number" id="elyteGlucose" value="5.6" min="1" max="80" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteGlucose" data-step="0.5">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Katz hiệu chỉnh:</span><span class="dsp-spec-ref">+1.6 mỗi 5.6 mmol/L</span></div>
                </div>
              </div>

              <!-- Row 3: Infusate Choice & High Risk Checkboxes -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Dung Dịch Bù Dự Kiến</span>
                    <span class="dsp-spec-unit-badge">Infusate</span>
                  </div>
                  <select class="dsp-select js-elyte-input" id="elyteInfusate" style="font-weight:700;">
                    <option value="nacl_3" selected>NaCl 3% (513 mEq/L - Ưu trương)</option>
                    <option value="nacl_09">NaCl 0.9% (154 mEq/L - Đẳng trương)</option>
                    <option value="ringer">Ringer Lactate (130 mEq/L - Cân bằng)</option>
                    <option value="plasmalyte">Plasma-Lyte 148 (140 mEq/L)</option>
                    <option value="d5w">Dextrose 5% D5W (0 mEq/L - Nước tự do)</option>
                    <option value="nacl_045">NaCl 0.45% 1/2 NS (77 mEq/L)</option>
                    <option value="d5_half_ns">D5 1/2 Normal Saline (77 mEq/L)</option>
                  </select>
                  <div class="dsp-spec-range"><span>Cấp cứu co giật:</span><span class="dsp-spec-ref">NaCl 3%</span></div>
                </div>

                <div class="dsp-spec-tile" style="grid-column: span 2;">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Yếu Tố Nguy Cơ Lâm Sàng &amp; Triệu Chứng</span>
                    <span class="dsp-spec-unit-badge">Cảnh Báo</span>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:0.4rem; padding-top:0.25rem;">
                    <label style="font-size:12px; font-weight:800; color:#dc2626; display:flex; align-items:center; gap:6px; cursor:pointer;">
                      <input type="checkbox" id="elyteSevere" class="js-elyte-input" />
                      <span><i class="fa-solid fa-triangle-exclamation"></i> Có triệu chứng thần kinh cấp nặng (Co giật, hôn mê, lơ mơ do phù não ➔ Kích hoạt Bolus NaCl 3%)</span>
                    </label>
                    <label style="font-size:11.5px; font-weight:700; color:#ea580c; display:flex; align-items:center; gap:6px; cursor:pointer;">
                      <input type="checkbox" id="elyteHighOdsRisk" class="js-elyte-input" />
                      <span>Bệnh nhân nguy cơ ODS cao (Xơ gan Child C, suy dinh dưỡng, nghiện rượu ➔ Khóa giới hạn &le; 4-6 mmol/L/24h)</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. POTASSIUM DISORDERS (HYPO/HYPERKALEMIA) -->
          <div class="js-elyte-subtab-panel" id="elyteSubtabPotassium" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#dc2626;">
                <i class="fa-solid fa-bolt"></i> Rối Loạn Kali Máu (Hạ Kali Kháng Trị vs Phác Đồ 3 Bước Tăng Kali Cấp Cứu)
              </h4>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#dc2626;"></i> Kali (K+) Máu Hiện Tại</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteK" data-step="-0.1">−</button>
                    <input class="dsp-spec-input js-elyte-input" type="number" id="elyteK" value="4.0" step="0.1" min="1.0" max="10.0" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteK" data-step="0.1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Chuẩn sinh lý:</span><span class="dsp-spec-ref">3.5 – 5.0 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Kali Mục Tiêu Đích</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elyteTargetK" value="4.0" step="0.1" min="3.0" max="5.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn mục tiêu:</span><span class="dsp-spec-ref">4.0 – 4.5 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Magie Máu Đi Kèm (Mg2+)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elyteMgCofactor" value="0.85" step="0.05" min="0.1" max="3.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Bắt buộc bù nếu:</span><span class="dsp-spec-ref">&lt; 0.75 mmol/L</span></div>
                </div>
              </div>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <div style="display:flex; flex-direction:column; gap:0.4rem;">
                  <label style="font-size:12px; font-weight:800; color:#dc2626; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="elyteHasEcgK" class="js-elyte-input" />
                    <span>Có biến đổi ECG (Sóng T cao nhọn đối xứng / QRS giãn rộng / Sóng U dẹt ➔ Chỉ định Calcium Gluconate Stat)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="elyteHasRenalFailure" class="js-elyte-input" />
                    <span>Bệnh nhân có Suy Thận / Vô niệu (Cân nhắc Lọc Máu Cấp Cứu Hemodialysis)</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <!-- 3. CALCIUM DISORDERS -->
          <div class="js-elyte-subtab-panel" id="elyteSubtabCalcium" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#9333ea;">
                <i class="fa-solid fa-bone"></i> Rối Loạn Canxi Máu (Hiệu Chỉnh Albumin &amp; Tích Số Canxi x Photpho)
              </h4>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Canxi Toàn Phần (Ca++)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elyteCaTotal" value="2.25" step="0.05" min="0.5" max="5.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">2.15 – 2.55 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Albumin Máu</span>
                    <span class="dsp-spec-unit-badge">g/dL</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elyteAlbumin" value="4.0" step="0.1" min="1.0" max="6.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">3.5 – 5.0 g/dL</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Photpho Máu Đi Kèm</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elytePhosphate" value="1.1" step="0.1" min="0.1" max="6.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Tích số Ca x P:</span><span class="dsp-spec-ref">Ngưỡng an toàn &le; 55</span></div>
                </div>
              </div>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <label style="font-size:12px; font-weight:800; color:#9333ea; display:flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="checkbox" id="elyteHasTetany" class="js-elyte-input" />
                  <span>Có dấu hiệu kích thích thần kinh cơ / Tetany (Dấu Chvostek, dấu Trousseau, tê bì co quắp ngón tay)</span>
                </label>
              </div>

            </div>
          </div>

          <!-- 4. MAGNESIUM, PHOSPHATE & REFEEDING -->
          <div class="js-elyte-subtab-panel" id="elyteSubtabMgPo4" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#c026d3;">
                <i class="fa-solid fa-flask"></i> Magie Máu, Loạn Nhịp Xoắn Đỉnh &amp; Hội Chứng Nuôi Ăn Lại (Refeeding Syndrome)
              </h4>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Magie Máu (Mg2+)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elyteMg" value="0.85" step="0.05" min="0.1" max="3.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">0.75 – 1.05 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Photpho Máu (PO4)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-elyte-input" type="number" id="elytePo4" value="1.0" step="0.05" min="0.1" max="5.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Hạ nặng nếu:</span><span class="dsp-spec-ref">&lt; 0.3 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Bệnh Cảnh Lâm Sàng</span>
                    <span class="dsp-spec-unit-badge">Nguy Cơ</span>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:0.35rem; padding-top:0.25rem;">
                    <label style="font-size:11.5px; font-weight:700; color:#dc2626; display:flex; align-items:center; gap:4px; cursor:pointer;">
                      <input type="checkbox" id="elyteHasTorsades" class="js-elyte-input" /> <span>Nguy cơ Xoắn Đỉnh</span>
                    </label>
                    <label style="font-size:11.5px; font-weight:700; color:#c026d3; display:flex; align-items:center; gap:4px; cursor:pointer;">
                      <input type="checkbox" id="elyteIsRefeeding" class="js-elyte-input" /> <span>Refeeding Syndrome</span>
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 5. FLUID MATRIX COMPARATOR -->
          <div class="js-elyte-subtab-panel" id="elyteSubtabFluidMatrix" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:var(--color-primary);">
                <i class="fa-solid fa-syringe"></i> Bảng So Sánh 8 Loại Dịch Truyền Hồi Sức &amp; Tác Động Natri Máu
              </h4>

              <div id="elyteFluidMatrixContainer" style="overflow-x:auto;">
                <!-- Rendered via JS -->
              </div>

            </div>
          </div>

        </div>

        <!-- Electrolyte Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="elyteResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountElectrolyteController(bindActionBtns: (container: HTMLElement) => void): void {
  // 1. Sub-tab navigation inside Electrolyte Studio
  const elyteSubtabBtns = document.querySelectorAll<HTMLElement>('.js-elyte-subtab-btn');
  const elyteSubtabPanels = document.querySelectorAll<HTMLElement>('.js-elyte-subtab-panel');

  elyteSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elyteSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-elyte-tab');

      elyteSubtabPanels.forEach(p => p.style.display = 'none');
      if (target === 'sodium_tab') {
        const p = document.getElementById('elyteSubtabSodium'); if (p) p.style.display = 'block';
      } else if (target === 'potassium_tab') {
        const p = document.getElementById('elyteSubtabPotassium'); if (p) p.style.display = 'block';
      } else if (target === 'calcium_tab') {
        const p = document.getElementById('elyteSubtabCalcium'); if (p) p.style.display = 'block';
      } else if (target === 'mg_po4_tab') {
        const p = document.getElementById('elyteSubtabMgPo4'); if (p) p.style.display = 'block';
      } else if (target === 'fluid_matrix_tab') {
        const p = document.getElementById('elyteSubtabFluidMatrix'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Real-time Search & Category Filter for 20 Presets
  const elyteSearchInput = document.getElementById('elyteCaseSearchInput') as HTMLInputElement | null;
  const elyteFilterBtns = document.querySelectorAll<HTMLElement>('.js-elyte-filter-btn');
  let currentElyteCatFilter = 'all';

  const applyElyteFiltering = () => {
    const query = (elyteSearchInput?.value || '').trim().toLowerCase();
    const presetItems = document.querySelectorAll<HTMLElement>('.js-elyte-preset-btn');

    presetItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const searchStr = item.getAttribute('data-search') || '';

      const matchesCat = currentElyteCatFilter === 'all' || cat === currentElyteCatFilter;
      const matchesQuery = !query || searchStr.includes(query);

      if (matchesCat && matchesQuery) {
        if (item.classList.contains('js-elyte-preset-card')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'inline-flex';
        }
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (elyteSearchInput) {
    elyteSearchInput.addEventListener('input', applyElyteFiltering);
  }

  elyteFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elyteFilterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentElyteCatFilter = btn.getAttribute('data-filter') || 'all';
      applyElyteFiltering();
    });
  });

  // View Switcher (Grid vs Chips)
  const viewToggleBtns = document.querySelectorAll<HTMLElement>('.js-elyte-view-toggle');
  const gridView = document.getElementById('elytePresetsGrid');
  const chipsView = document.getElementById('elytePresetsChips');

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
  const btnToggleCollapse = document.getElementById('btnToggleElyteVaultCollapse');
  const vaultBody = document.getElementById('elyteVaultBody');
  const iconCollapse = document.getElementById('iconElyteVaultCollapse');

  btnToggleCollapse?.addEventListener('click', () => {
    if (!vaultBody) return;
    const isHidden = vaultBody.style.display === 'none';
    vaultBody.style.display = isHidden ? 'block' : 'none';
    if (iconCollapse) {
      iconCollapse.className = isHidden ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    }
  });

  // 3. Preset Loading Handler
  document.querySelectorAll<HTMLElement>('.js-elyte-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = ELYTE_PRESETS.find(p => p.id === id);
      if (preset) {
        // Highlight active card
        document.querySelectorAll<HTMLElement>('.js-elyte-preset-btn').forEach(b => {
          b.classList.remove('is-active');
          if (b.getAttribute('data-preset-id') === id) {
            b.classList.add('is-active');
          }
        });

        const v = preset.values;
        if (v.mode) (document.getElementById('elyteMode') as HTMLSelectElement).value = v.mode;
        if (v.weightKg) (document.getElementById('elyteWeight') as HTMLInputElement).value = String(v.weightKg);
        if (v.gender) (document.getElementById('elyteGender') as HTMLSelectElement).value = v.gender;
        (document.getElementById('elyteIsElderly') as HTMLInputElement).checked = !!v.isElderly;
        
        if (v.serumNa !== undefined) (document.getElementById('elyteNa') as HTMLInputElement).value = String(v.serumNa);
        if (v.targetNa !== undefined) (document.getElementById('elyteTargetNa') as HTMLInputElement).value = String(v.targetNa);
        if (v.glucoseMmol !== undefined) (document.getElementById('elyteGlucose') as HTMLInputElement).value = String(v.glucoseMmol);
        if (v.selectedInfusate) (document.getElementById('elyteInfusate') as HTMLSelectElement).value = v.selectedInfusate;
        (document.getElementById('elyteSevere') as HTMLInputElement).checked = !!v.hasSevereSymptoms;
        (document.getElementById('elyteHighOdsRisk') as HTMLInputElement).checked = !!v.isHighOdsRisk;

        if (v.serumK !== undefined) (document.getElementById('elyteK') as HTMLInputElement).value = String(v.serumK);
        if (v.targetK !== undefined) (document.getElementById('elyteTargetK') as HTMLInputElement).value = String(v.targetK);
        (document.getElementById('elyteHasEcgK') as HTMLInputElement).checked = !!v.hasEcgChangesK;
        (document.getElementById('elyteHasRenalFailure') as HTMLInputElement).checked = !!v.hasRenalFailure;

        if (v.serumCaTotal !== undefined) (document.getElementById('elyteCaTotal') as HTMLInputElement).value = String(v.serumCaTotal);
        if (v.serumAlbuminGDl !== undefined) (document.getElementById('elyteAlbumin') as HTMLInputElement).value = String(v.serumAlbuminGDl);
        if (v.serumPhosphate !== undefined) {
          (document.getElementById('elytePhosphate') as HTMLInputElement).value = String(v.serumPhosphate);
          (document.getElementById('elytePo4') as HTMLInputElement).value = String(v.serumPhosphate);
        }
        (document.getElementById('elyteHasTetany') as HTMLInputElement).checked = !!v.hasTetanySigns;

        if (v.serumMg !== undefined) {
          (document.getElementById('elyteMg') as HTMLInputElement).value = String(v.serumMg);
          (document.getElementById('elyteMgCofactor') as HTMLInputElement).value = String(v.serumMg);
        }
        (document.getElementById('elyteHasTorsades') as HTMLInputElement).checked = !!v.hasTorsadesRisk;
        (document.getElementById('elyteIsRefeeding') as HTMLInputElement).checked = !!v.isRefeedingRisk;

        // Tự động chuyển subtab phù hợp với mode preset
        elyteSubtabBtns.forEach(b => b.classList.remove('is-active'));
        elyteSubtabPanels.forEach(p => p.style.display = 'none');
        if (v.mode === 'hyponatremia' || v.mode === 'hypernatremia') {
          document.querySelector<HTMLElement>('[data-elyte-tab="sodium_tab"]')?.classList.add('is-active');
          const p = document.getElementById('elyteSubtabSodium'); if (p) p.style.display = 'block';
        } else if (v.mode === 'hypokalemia' || v.mode === 'hyperkalemia') {
          document.querySelector<HTMLElement>('[data-elyte-tab="potassium_tab"]')?.classList.add('is-active');
          const p = document.getElementById('elyteSubtabPotassium'); if (p) p.style.display = 'block';
        } else if (v.mode === 'calcium_disorder') {
          document.querySelector<HTMLElement>('[data-elyte-tab="calcium_tab"]')?.classList.add('is-active');
          const p = document.getElementById('elyteSubtabCalcium'); if (p) p.style.display = 'block';
        } else if (v.mode === 'magnesium_po4') {
          document.querySelector<HTMLElement>('[data-elyte-tab="mg_po4_tab"]')?.classList.add('is-active');
          const p = document.getElementById('elyteSubtabMgPo4'); if (p) p.style.display = 'block';
        }

        recalcElectrolyte();
      }
    });
  });

  // 4. Master Recalculation Engine
  const recalcElectrolyte = () => {
    const mode = ((document.getElementById('elyteMode') as HTMLSelectElement)?.value || 'hyponatremia') as any;
    const weightKg = parseFloat((document.getElementById('elyteWeight') as HTMLInputElement)?.value) || 60;
    const gender = ((document.getElementById('elyteGender') as HTMLSelectElement)?.value || 'male') as any;
    const isElderly = (document.getElementById('elyteIsElderly') as HTMLInputElement)?.checked;

    const serumNa = parseFloat((document.getElementById('elyteNa') as HTMLInputElement)?.value) || 118;
    const targetNa = parseFloat((document.getElementById('elyteTargetNa') as HTMLInputElement)?.value) || 126;
    const glucoseMmol = parseFloat((document.getElementById('elyteGlucose') as HTMLInputElement)?.value) || 5.6;
    const selectedInfusate = ((document.getElementById('elyteInfusate') as HTMLSelectElement)?.value || 'nacl_3') as any;
    const hasSevereSymptoms = (document.getElementById('elyteSevere') as HTMLInputElement)?.checked;
    const isHighOdsRisk = (document.getElementById('elyteHighOdsRisk') as HTMLInputElement)?.checked;

    const serumK = parseFloat((document.getElementById('elyteK') as HTMLInputElement)?.value) || 4.0;
    const targetK = parseFloat((document.getElementById('elyteTargetK') as HTMLInputElement)?.value) || 4.0;
    const hasEcgChangesK = (document.getElementById('elyteHasEcgK') as HTMLInputElement)?.checked;
    const hasRenalFailure = (document.getElementById('elyteHasRenalFailure') as HTMLInputElement)?.checked;

    const serumCaTotal = parseFloat((document.getElementById('elyteCaTotal') as HTMLInputElement)?.value) || 2.25;
    const serumAlbuminGDl = parseFloat((document.getElementById('elyteAlbumin') as HTMLInputElement)?.value) || 4.0;
    const serumPhosphate = parseFloat((document.getElementById('elytePhosphate') as HTMLInputElement)?.value) || 1.1;
    const hasTetanySigns = (document.getElementById('elyteHasTetany') as HTMLInputElement)?.checked;

    const serumMg = parseFloat((document.getElementById('elyteMg') as HTMLInputElement)?.value) || 0.85;
    const hasTorsadesRisk = (document.getElementById('elyteHasTorsades') as HTMLInputElement)?.checked;
    const isRefeedingRisk = (document.getElementById('elyteIsRefeeding') as HTMLInputElement)?.checked;

    const inputs: ElectrolyteInputs = {
      mode, weightKg, gender, isElderly,
      serumNa, targetNa, glucoseMmol, selectedInfusate, hasSevereSymptoms, isHighOdsRisk,
      serumK, targetK, hasEcgChangesK, hasRenalFailure,
      serumCaTotal, serumAlbuminGDl, serumPhosphate, hasTetanySigns,
      serumMg, hasTorsadesRisk, isRefeedingRisk
    };

    const res = analyzeElectrolyte(inputs);

    // Render 48h Trajectory SVG
    const timelineContainer = document.getElementById('elyteTimelineContainer');
    if (timelineContainer) {
      const delta24h = isHighOdsRisk ? 6 : 8;
      timelineContainer.innerHTML = renderFluidTimelineSvg(serumNa, targetNa, res.infusionRateMlPerHour || 42, delta24h, isHighOdsRisk);
    }

    // Render 8-Infusate Fluid Matrix Table
    const fluidMatrixContainer = document.getElementById('elyteFluidMatrixContainer');
    if (fluidMatrixContainer) {
      fluidMatrixContainer.innerHTML = `
        <table style="width:100%; border-collapse:collapse; font-size:12px; line-height:1.45;">
          <thead>
            <tr style="border-bottom:2px solid var(--color-border); text-align:left; color:var(--color-text-muted);">
              <th style="padding:8px;">Dung Dịch Truyền</th>
              <th style="padding:8px; text-align:center;">Na+ (mEq/L)</th>
              <th style="padding:8px; text-align:center;">Áp Suất Thẩm Thấu (mOsm/L)</th>
              <th style="padding:8px; text-align:center;">&Delta;Na Huyết Thanh (1 Lít)</th>
              <th style="padding:8px;">Chỉ Định Lâm Sàng</th>
            </tr>
          </thead>
          <tbody>
            ${res.infusateComparison.map(f => `
              <tr style="border-bottom:1px solid var(--color-border); ${f.name.includes('NaCl 3%') ? 'background:rgba(220,38,38,0.06); font-weight:700;' : ''}">
                <td style="padding:8px;"><strong>${escapeHtml(f.name)}</strong></td>
                <td style="padding:8px; text-align:center;"><span class="dsp-badge dsp-badge--outline">${f.naContent}</span></td>
                <td style="padding:8px; text-align:center;">${f.osm}</td>
                <td style="padding:8px; text-align:center;"><span class="dsp-badge ${f.deltaNa > 0 ? 'dsp-badge--info' : 'dsp-badge--danger'}">${f.deltaNa > 0 ? `+${f.deltaNa}` : f.deltaNa} mmol/L</span></td>
                <td style="padding:8px; font-size:11px; color:var(--color-text-muted);">${escapeHtml(INFUSATE_DATA[Object.keys(INFUSATE_DATA).find(k => INFUSATE_DATA[k].name === f.name) || 'nacl_3']?.desc || '')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Render Result Sheet
    const resultCard = document.getElementById('elyteResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-flask-vial" style="color:#0284c7;"></i> Quyết Định Lâm Sàng &amp; Phác Đồ Bù Dịch</h3>
        </div>
        <div style="padding:1.25rem;">
          
          <!-- Emergency Alerts Banner -->
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

          <!-- TBW & Core Stat Tile -->
          <div style="background:rgba(2,132,199,0.08); border-left:4px solid var(--color-primary); padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase;">Thể tích nước cơ thể (TBW):</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--color-text); margin-top:0.2rem;">
              ${res.tbwLiters} Lít (${Math.round(res.tbwLiters * 1000)} mL)
            </div>
            ${res.correctedNa !== null ? `<div style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.25rem;">Natri hiệu chỉnh đường huyết (Katz): <strong>${res.correctedNa} mmol/L</strong></div>` : ''}
          </div>

          <!-- Specific Disorder Cards -->
          ${mode === 'hyponatremia' ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase; margin-bottom:0.4rem;">
                Kế Hoạch Nâng Natri (Adrogué-Madias):
              </div>
              <div style="font-size:12.5px; line-height:1.5;">
                <div>• 1 Lít ${INFUSATE_DATA[selectedInfusate]?.name}: <strong>+${res.adrogueDeltaNaPerLiter} mmol/L</strong></div>
                ${res.infusionRateMlPerHour ? `<div>• Tốc độ truyền duy trì: <span class="dsp-badge dsp-badge--info" style="font-size:12px; font-weight:800;">${res.infusionRateMlPerHour} mL/giờ</span></div>` : ''}
                <div>• Thiếu hụt Natri ước tính: <strong>${res.sodiumDeficitMeq} mEq</strong></div>
              </div>
            </div>

            ${res.bolusProtocolSummary ? `
              <div style="background:rgba(220,38,38,0.08); border:1px solid rgba(220,38,38,0.3); border-radius:8px; padding:0.85rem; margin-bottom:1rem; font-size:12px; color:var(--color-text);">
                <strong>Phác Đồ Bolus NaCl 3% Stat:</strong>
                <div style="margin-top:0.25rem;">${escapeHtml(res.bolusProtocolSummary)}</div>
              </div>
            ` : ''}

            ${res.odsRiskWarning ? `
              <div style="background:rgba(234,88,12,0.08); border:1px solid rgba(234,88,12,0.3); border-radius:8px; padding:0.85rem; margin-bottom:1rem; font-size:12px; color:var(--color-text);">
                ${escapeHtml(res.odsRiskWarning)}
              </div>
            ` : ''}
          ` : ''}

          ${mode === 'hypernatremia' ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#ef4444; text-transform:uppercase; margin-bottom:0.4rem;">
                Nước Tự Do Thiếu Hụt (Free Water Deficit):
              </div>
              <div style="font-size:12.5px; line-height:1.5;">
                <div>• Tổng FWD thiếu hụt: <strong style="color:#ef4444; font-size:14px;">${res.freeWaterDeficitLiters} Lít</strong></div>
                <div>• Tốc độ bù nước tự do: <span class="dsp-badge dsp-badge--danger" style="font-size:12px; font-weight:800;">${res.infusionRateMlPerHour} mL/giờ</span> (chia đều trong 48h)</div>
              </div>
            </div>
          ` : ''}

          ${mode === 'hyperkalemia' && res.hyperkalemiaStepProtocol ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.4rem;">
                Phác Đồ 3 Bước Tăng Kali Cấp Cứu:
              </div>
              <div style="font-size:11.5px; display:flex; flex-direction:column; gap:0.4rem;">
                ${res.hyperkalemiaStepProtocol.map(step => `
                  <div style="background:var(--color-surface); padding:6px 8px; border-radius:6px; border-left:3px solid #dc2626;">
                    ${escapeHtml(step)}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${mode === 'hypokalemia' ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#8b5cf6; text-transform:uppercase; margin-bottom:0.4rem;">
                Kế Hoạch Bù Kali:
              </div>
              <div style="font-size:12px; line-height:1.5;">
                <div>• Thiếu hụt K+ toàn cơ thể: ~<strong>${res.potassiumDeficitMeq} mEq</strong></div>
                <div style="margin-top:0.25rem;">${escapeHtml(res.potassiumIvMaxRateSummary || '')}</div>
              </div>
            </div>
          ` : ''}

          ${mode === 'calcium_disorder' ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#9333ea; text-transform:uppercase; margin-bottom:0.4rem;">
                Đánh Giá Canxi Máu &amp; Tích Số Ca x P:
              </div>
              <div style="font-size:12px; line-height:1.5;">
                <div>• Canxi hiệu chỉnh Albumin: <strong>${res.correctedCalciumMmol} mmol/L</strong></div>
                ${res.calciumPhosphateProduct ? `<div>• Tích số Ca x P: <strong>${res.calciumPhosphateProduct} mg²/dL²</strong> (${res.calciumPhosphateProduct > 55 ? '⚠️ Vượt ngưỡng an toàn' : 'An toàn'})</div>` : ''}
                ${res.calciumReplacementProtocol ? `<div style="margin-top:0.4rem; padding-top:0.4rem; border-top:1px dashed var(--color-border);">${escapeHtml(res.calciumReplacementProtocol)}</div>` : ''}
              </div>
            </div>
          ` : ''}

          ${res.safeSpeedLimitSummary ? `
            <div style="font-size:11.5px; color:var(--color-text-muted); margin-bottom:1rem; font-weight:600;">
              ${escapeHtml(res.safeSpeedLimitSummary)}
            </div>
          ` : ''}

          <!-- Action Buttons: SOAP, Copy, Print -->
          <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="width:100%;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào Sổ Tay SOAP
            </button>
            <div style="display:flex; gap:0.5rem;">
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
                <i class="fa-regular fa-copy"></i> Sao chép EMR
              </button>
              <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" onclick="window.print()" style="flex:1;">
                <i class="fa-solid fa-print"></i> In Báo Cáo
              </button>
            </div>
          </div>

        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-elyte-input').forEach(i => i.addEventListener('input', recalcElectrolyte));

  // Khởi chạy tính toán ban đầu
  recalcElectrolyte();
}
