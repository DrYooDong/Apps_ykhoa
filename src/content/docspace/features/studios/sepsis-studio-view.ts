/**
 * DocSpace — Sepsis & Critical Care ICU Resuscitation Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for Sepsis Studio ($10,000 Level)
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeSepsisStudio, renderSofaRadarSvg, renderHour1TimelineSvg, renderLactateTrajectorySvg,
  SEPSIS_PRESETS, SepsisInputs
} from './sepsis-studio';

export function renderSepsisPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioSepsis" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (20 Curated Research Presets - Redesigned Clinical Vault) -->
      <div class="dsp-case-vault" id="sepsisCaseVault">
        <!-- Vault Header Toolbar -->
        <div class="dsp-case-vault-header">
          <div class="dsp-case-vault-title">
            <i class="fa-solid fa-lungs-virus" style="color:#e11d48; font-size:1.15rem;"></i>
            <span>Kho 20 Ca Nghiên Cứu Nhiễm Khuẩn Huyết, Viêm Phổi Nặng &amp; Hồi Sức ICU Mẫu</span>
            <span class="dsp-badge" style="background:rgba(225,29,72,0.12); color:#e11d48; border:1px solid rgba(225,29,72,0.25); font-size:11px;">20 Ca Chuẩn EBM</span>
          </div>

          <div class="dsp-case-vault-toolbar">
            <!-- Quick Search Input -->
            <div class="dsp-case-search-wrap">
              <i class="fa-solid fa-magnifying-glass dsp-case-search-icon"></i>
              <input type="text" id="sepsisCaseSearchInput" class="dsp-case-search-input" placeholder="Tìm theo tên ca, Sepsis-3, Sốc NK, SOFA, Viêm phổi, Lactate..." />
            </div>

            <!-- View Switcher & Collapse -->
            <div style="display:flex; gap:4px; background:var(--color-bg); padding:2px; border-radius:8px; border:1px solid var(--color-border);">
              <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-view-toggle is-active" data-view="grid" title="Xem dạng lưới thẻ" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none;">
                <i class="fa-solid fa-table-cells-large"></i> Lưới Thẻ
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-view-toggle" data-view="chips" title="Xem dạng thu gọn" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none; background:transparent;">
                <i class="fa-solid fa-list-ul"></i> Thu Gọn
              </button>
            </div>

            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleSepsisVaultCollapse" title="Thu gọn / Mở rộng kho ca" style="padding:4px 8px; font-size:11px;">
              <i class="fa-solid fa-chevron-up" id="iconSepsisVaultCollapse"></i>
            </button>
          </div>
        </div>

        <!-- Vault Content Body -->
        <div id="sepsisVaultBody">
          <!-- Category Filter Pills -->
          <div class="dsp-case-filters-bar">
            <button type="button" class="dsp-case-filter-pill js-sepsis-filter-btn is-active" data-filter="all">Tất cả (20)</button>
            <button type="button" class="dsp-case-filter-pill js-sepsis-filter-btn" data-filter="septic_shock"><span style="color:#dc2626;">●</span> Sốc Nhiễm Khuẩn</button>
            <button type="button" class="dsp-case-filter-pill js-sepsis-filter-btn" data-filter="severe_pneumonia"><span style="color:#ef4444;">●</span> Viêm Phổi Nặng / ARDS</button>
            <button type="button" class="dsp-case-filter-pill js-sepsis-filter-btn" data-filter="crbsi_bloodstream"><span style="color:#7c3aed;">●</span> Catheter &amp; Nấm Huyết</button>
            <button type="button" class="dsp-case-filter-pill js-sepsis-filter-btn" data-filter="neutropenic_transplant"><span style="color:#ea580c;">●</span> Suy Giảm Miễn Dịch</button>
            <button type="button" class="dsp-case-filter-pill js-sepsis-filter-btn" data-filter="early_warning_news2"><span style="color:#0284c7;">●</span> Báo Động NEWS2 &amp; Sốc Ẩn</button>
          </div>

          <!-- Cards Grid View -->
          <div id="sepsisPresetsGrid" class="dsp-case-grid">
            ${SEPSIS_PRESETS.map((p, idx) => {
              const v = p.values;
              return `
                <div class="dsp-case-card js-sepsis-preset-card js-sepsis-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description + ' ' + p.badge).toLowerCase())}">
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
                      <span class="dsp-case-metric-tag" style="${v.serumLactateMmol && v.serumLactateMmol >= 2.0 ? 'color:#dc2626; border-color:rgba(220,38,38,0.3); background:rgba(220,38,38,0.06);' : ''}">
                        Lactate <strong>${v.serumLactateMmol || 2.0} mmol/L</strong>
                      </span>
                      <span class="dsp-case-metric-tag">
                        HA <strong>${v.systolicBp}/${v.diastolicBp}</strong>
                      </span>
                      <span class="dsp-case-metric-tag">
                        Mạch <strong>${v.heartRate}</strong>
                      </span>
                      ${v.pao2Fio2Ratio ? `<span class="dsp-case-metric-tag" style="color:#0284c7;">P/F <strong>${v.pao2Fio2Ratio}</strong></span>` : ''}
                      ${v.noradrenalineDoseUgKgMin ? `<span class="dsp-case-metric-tag" style="color:#7c3aed;">NorEpi: ${v.noradrenalineDoseUgKgMin}</span>` : ''}
                    </div>

                    <div class="dsp-case-desc">${escapeHtml(p.description)}</div>
                  </div>

                  <div class="dsp-case-card-footer">
                    <span style="font-size:0.7rem; color:var(--color-text-muted);">
                      <i class="fa-solid fa-hospital-user"></i> ${v.age}t • ${v.weightKg}kg • GCS ${v.gcs}
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
          <div id="sepsisPresetsChips" style="display:none; flex-wrap:wrap; gap:0.45rem; padding-top:0.25rem;">
            ${SEPSIS_PRESETS.map(p => `
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-sepsis-preset-btn js-sepsis-preset-chip" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description).toLowerCase())}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
                <strong>${escapeHtml(p.name)}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Top Visual Graphic: Surviving Sepsis Hour-1 Timeline & SOFA 6-Organ Radar Spider Chart SVG -->
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        
        <!-- Surviving Sepsis Campaign Hour-1 Bundle & Lactate Trajectory Card -->
        <div class="dsp-card" style="padding:1rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
              <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-stopwatch-20" style="color:#dc2626;"></i>
                <span>Gói Sống Còn Giờ Đầu (Surviving Sepsis Campaign Hour-1 Bundle)</span>
              </div>
            </div>
            <div id="sepsisHour1SvgContainer" style="overflow-x:auto;">
              ${renderHour1TimelineSvg()}
            </div>
          </div>

          <!-- Lactate Clearance Curve -->
          <div style="margin-top:0.75rem;">
            <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); margin-bottom:0.35rem; display:flex; justify-content:space-between;">
              <span><i class="fa-solid fa-chart-line" style="color:#dc2626;"></i> Động Học &amp; Quỹ Đạo Thanh Thải Lactate (Target ≥20% / 2h):</span>
            </div>
            <div id="sepsisLactateSvgWrap">
              ${renderLactateTrajectorySvg(4.8, 3.6, 2)}
            </div>
          </div>
        </div>

        <!-- 6-Organ SOFA Radar Spider Chart SVG Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-chart-pie" style="color:#e11d48;"></i>
              <span>Biểu Đồ Mạng Nhện Suy Đa Cơ Quan SOFA (6 Organ Systems)</span>
            </div>
          </div>
          <div id="sepsisSofaRadarWrap">
            ${renderSofaRadarSvg({ resp: 2, coag: 2, liver: 2, cardio: 3, cns: 1, renal: 2 })}
          </div>
        </div>

      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside Sepsis Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-subtab-btn is-active" data-sepsis-tab="sofa_news2" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-hospital-user"></i> 1. Suy Đa Cơ Quan SOFA &amp; NEWS2
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-subtab-btn" data-sepsis-tab="hemodynamics_bundle" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-heart-pulse"></i> 2. Huyết Động, Vận Mạch &amp; Hour-1
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-subtab-btn" data-sepsis-tab="pneumonia_smartcop" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-lungs"></i> 3. Viêm Phổi (CURB-65 &amp; SMART-COP)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-subtab-btn" data-sepsis-tab="lactate_fluids" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-droplet"></i> 4. Động Học Lactate &amp; Hồi Sức Dịch
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-sepsis-subtab-btn" data-sepsis-tab="empiric_antimicrobial" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-capsules"></i> 5. Kháng Sinh Kinh Nghiệm &amp; MDR
            </button>
          </div>

          <!-- Sub-tab Panels -->
          <!-- 1. SOFA 6-ORGAN & NEWS2 -->
          <div class="js-sepsis-subtab-panel" id="sepsisSubtabSofaNews2" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#e11d48;">
                <i class="fa-solid fa-hospital-user"></i> Đánh Giá 6 Cơ Quan SOFA, qSOFA &amp; Điểm Báo Động Sớm NEWS2
              </h4>

              <!-- Row 1: Vital Signs -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Nhịp Thở (Respiratory Rate)</span>
                    <span class="dsp-spec-unit-badge">lần/phút</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepsisRr" data-step="-1">−</button>
                    <input class="dsp-spec-input js-sepsis-input" type="number" id="sepsisRr" value="28" min="6" max="60" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepsisRr" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>qSOFA ≥22:</span><span class="dsp-spec-ref">1 điểm</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Huyết Áp Tâm Thu / Tâm Trương</span>
                    <span class="dsp-spec-unit-badge">mmHg</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisSbp" value="82" min="30" max="260" placeholder="HATT" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisDbp" value="45" min="20" max="160" placeholder="HATTr" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                  </div>
                  <div class="dsp-spec-range"><span>qSOFA ≤100:</span><span class="dsp-spec-ref">1 điểm</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Mạch &amp; Thân Nhiệt</span>
                    <span class="dsp-spec-unit-badge">bpm / °C</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisHr" value="125" min="30" max="220" placeholder="Mạch" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisTemp" value="38.8" step="0.1" min="32" max="43" placeholder="Nhiệt độ" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                  </div>
                  <div class="dsp-spec-range"><span>Shock Index:</span><span class="dsp-spec-ref">HR / SBP</span></div>
                </div>
              </div>

              <!-- Row 2: Oxygenation & Consciousness -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tỷ Số PaO2 / FiO2 (P/F Ratio)</span>
                    <span class="dsp-spec-unit-badge">mmHg</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisPaO2FiO2" value="220" min="40" max="600" style="font-weight:700;" />
                  <div style="margin-top:4px;">
                    <label style="font-size:11px; display:flex; align-items:center; gap:4px; cursor:pointer;">
                      <input type="checkbox" id="sepsisIsVentilated" class="js-sepsis-input" />
                      <span>Đang thở máy (Invasive / NIV)</span>
                    </label>
                  </div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tri Giác (GCS &amp; AVPU)</span>
                    <span class="dsp-spec-unit-badge">3 - 15</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:6px;">
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisGcs" value="13" min="3" max="15" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <select class="dsp-select js-sepsis-input" id="sepsisAvpu" style="padding:4px 8px; font-size:11px; font-weight:700;">
                      <option value="alert">Alert (Tỉnh)</option>
                      <option value="voice" selected>Voice (Đáp ứng lời)</option>
                      <option value="pain">Pain (Đáp ứng đau)</option>
                      <option value="unresponsive">Unresponsive (Mê)</option>
                    </select>
                  </div>
                  <div class="dsp-spec-range"><span>qSOFA GCS &lt;15:</span><span class="dsp-spec-ref">1 điểm</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">SpO2 &amp; Thang Đo NEWS2</span>
                    <span class="dsp-spec-unit-badge">%</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisSpo2" value="93" min="50" max="100" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <div style="display:flex; flex-direction:column; gap:2px;">
                      <label style="font-size:10.5px; display:flex; align-items:center; gap:3px; cursor:pointer;">
                        <input type="checkbox" id="sepsisIsOnOxygen" class="js-sepsis-input" checked />
                        <span>Thở oxy</span>
                      </label>
                      <label style="font-size:10.5px; display:flex; align-items:center; gap:3px; cursor:pointer;">
                        <input type="checkbox" id="sepsisIsCopd" class="js-sepsis-input" />
                        <span>COPD Scale 2</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Row 3: Organ Biomarkers (Platelets, Bilirubin, Creatinine) -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Số Lượng Tiểu Cầu (Platelets)</span>
                    <span class="dsp-spec-unit-badge">G/L (k/uL)</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisPlatelets" value="85" min="2" max="1000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>SOFA:</span><span class="dsp-spec-ref">&lt;150: 1đ, &lt;100: 2đ, &lt;50: 3đ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Bilirubin Toàn Phần</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisBilirubin" value="38" min="2" max="1000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>SOFA Gan:</span><span class="dsp-spec-ref">&ge;20: 1đ, &ge;33: 2đ, &ge;102: 3đ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Creatinine Huyết Thanh</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisCreatinine" value="240" min="20" max="1500" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>SOFA Thận:</span><span class="dsp-spec-ref">&ge;110: 1đ, &ge;171: 2đ, &ge;300: 3đ</span></div>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. HEMODYNAMICS, VASOPRESSORS (NEE/VIS) & HOUR-1 BUNDLE -->
          <div class="js-sepsis-subtab-panel" id="sepsisSubtabHemodynamics" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#dc2626;">
                <i class="fa-solid fa-heart-pulse"></i> Chuẩn Độ Vận Mạch (Norepinephrine Equivalent NEE), Vasoactive Score (VIS) &amp; Gói Hour-1
              </h4>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-syringe" style="color:#dc2626;"></i> Noradrenaline (L-Phed)</span>
                    <span class="dsp-spec-unit-badge">ug/kg/min</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisNorepi" value="0.28" step="0.02" min="0" max="2.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Vận mạch bậc 1:</span><span class="dsp-spec-ref">Đích MAP ≥ 65</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Adrenaline (Epinephrine)</span>
                    <span class="dsp-spec-unit-badge">ug/kg/min</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisEpi" value="0" step="0.02" min="0" max="2.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Bậc 2 (Phối hợp):</span><span class="dsp-spec-ref">Cường tim + Mạch</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Vasopressin</span>
                    <span class="dsp-spec-unit-badge">UI/min</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisVaso" value="0.03" step="0.01" min="0" max="0.06" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Liều cố định:</span><span class="dsp-spec-ref">0.03 UI/min (Sốc trơ)</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Dobutamine</span>
                    <span class="dsp-spec-unit-badge">ug/kg/min</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisDobutamine" value="0" step="1" min="0" max="20" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Inotrope tăng co bóp:</span><span class="dsp-spec-ref">Bệnh cơ tim do sốc</span></div>
                </div>
              </div>

              <!-- Refractory Shock & Corticosteroid Alert Box -->
              <div style="background:rgba(220,38,38,0.06); border:1px solid rgba(220,38,38,0.25); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
                <div style="font-size:11.5px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-shield-halved"></i> Tiêu Chuẩn Sốc Nhiễm Khuẩn Trơ (Refractory Septic Shock):
                </div>
                <div style="font-size:12px; line-height:1.45;">
                  Khi liều tương đương <strong>Norepinephrine Equivalent (NEE) ≥ 0.25 ug/kg/min</strong>: Khuyến cáo bắt buộc phối hợp <strong>Vasopressin 0.03 UI/phút</strong> (không chỉnh liều) và bổ sung <strong>Hydrocortisone 200 mg/ngày</strong> (50mg IV q6h hoặc truyền liên tục) theo Hướng dẫn Surviving Sepsis Campaign 2021!
                </div>
              </div>

            </div>
          </div>

          <!-- 3. SEVERE PNEUMONIA (CURB-65 & SMART-COP) -->
          <div class="js-sepsis-subtab-panel" id="sepsisSubtabPneumonia" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ef4444;">
                <i class="fa-solid fa-lungs"></i> Đánh Giá Viêm Phổi Nặng (CURB-65, SMART-COP &amp; Tiêu Chuẩn ATS/IDSA)
              </h4>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">BUN / Ure Huyết Thanh</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisBun" value="12.5" step="0.5" min="1" max="80" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>CURB-65:</span><span class="dsp-spec-ref">&gt; 7 mmol/L = 1đ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Albumin Máu</span>
                    <span class="dsp-spec-unit-badge">g/dL</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisAlbumin" value="2.8" step="0.1" min="1" max="6" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>SMART-COP:</span><span class="dsp-spec-ref">&lt; 3.5 g/dL = 1đ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Khí Máu Động Mạch (pH)</span>
                    <span class="dsp-spec-unit-badge">pH</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisArterialPh" value="7.28" step="0.02" min="6.8" max="7.7" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>SMART-COP:</span><span class="dsp-spec-ref">&lt; 7.35 = 1đ</span></div>
                </div>
              </div>

              <!-- Pneumonia Flags -->
              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisIsMultilobar" class="js-sepsis-input" checked />
                    <span>X-quang / CT ngực thâm nhiễm nhiều thùy phổi (Multilobar Infiltrate = 1đ SMART-COP)</span>
                  </label>
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisIsAspiration" class="js-sepsis-input" />
                    <span>Nghi ngờ Viêm phổi hít (Aspiration Pneumonia — Nguy cơ vi khuẩn kỵ khí vùng hầu họng)</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <!-- 4. LACTATE DYNAMICS & FLUID RESUSCITATION -->
          <div class="js-sepsis-subtab-panel" id="sepsisSubtabLactateFluids" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#0284c7;">
                <i class="fa-solid fa-droplet"></i> Động Học Lactate &amp; Đáp Ứng Bù Dịch 30 mL/kg (Surviving Sepsis Campaign 2021)
              </h4>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Lactate Máu Ban Đầu (0h)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisLactateInitial" value="4.8" step="0.2" min="0.5" max="25" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Ngưỡng sốc:</span><span class="dsp-spec-ref">≥ 2.0 mmol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Lactate Đo Lại (Sau 2 - 4h)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisLactateRepeat" value="3.6" step="0.2" min="0.5" max="25" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Đích thanh thải:</span><span class="dsp-spec-ref">Giảm ≥ 20% mỗi 2h</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Dịch Tinh Thể Đã Bù</span>
                    <span class="dsp-spec-unit-badge">mL</span>
                  </div>
                  <input class="dsp-input js-sepsis-input" type="number" id="sepsisFluidsGiven" value="1000" step="250" min="0" max="10000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Đích 30 mL/kg:</span><span class="dsp-spec-ref" id="sepsisFluidTargetLabel">2100 mL</span></div>
                </div>
              </div>

              <!-- Dynamic Fluid Responsiveness & CRT -->
              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <div style="font-size:11.5px; font-weight:800; color:#0284c7; text-transform:uppercase; margin-bottom:0.4rem;">
                  Đánh Giá Tưới Máu Ngoại Biên &amp; Đáp Ứng Bù Dịch Động (Fluid Responsiveness):
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.5rem;">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted);">Thời gian đổ đầy mao mạch (CRT):</label>
                    <input class="dsp-input js-sepsis-input" type="number" id="sepsisCrt" value="4.5" step="0.5" style="width:70px; padding:2px 6px; font-size:12px; font-weight:700;" />
                    <span style="font-size:11px;">giây</span>
                  </div>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisPlrPositive" class="js-sepsis-input" checked />
                    <span>Nghiệm pháp Nâng chân thụ động (PLR) Dương tính</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <!-- 5. EMPIRIC ANTIMICROBIAL & MDR MATRIX -->
          <div class="js-sepsis-subtab-panel" id="sepsisSubtabAntimicrobial" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#7c3aed;">
                <i class="fa-solid fa-capsules"></i> Lựa Chọn Kháng Sinh Kinh Nghiệm Theo Vị Trí Nhiễm Trùng &amp; Yếu Tố Nguy Cơ Đa Kháng (MDR)
              </h4>

              <div style="margin-bottom:1rem;">
                <label style="font-size:12px; font-weight:800; color:var(--color-text); margin-bottom:0.35rem; display:block;">
                  Vị Trí Nhiễm Trùng Nghi Ngờ (Infection Site):
                </label>
                <select id="sepsisInfectionSite" class="dsp-select js-sepsis-input" style="font-size:12.5px; font-weight:700; padding:6px 10px;">
                  <option value="abdominal" selected>1. Ổ Bụng &amp; Viêm Phúc Mạc (Peritonitis / Biliary / Perforated Viscus)</option>
                  <option value="pulmonary">2. Hô Hấp (Viêm Phổi Nặng CAP / HAP / VAP / Hít)</option>
                  <option value="urinary">3. Tiết Niệu (Urosepsis / Viêm Đài Bể Thận Cấp Phức Tạp)</option>
                  <option value="skin_soft_tissue">4. Da &amp; Mô Mềm (Viêm Cân Hoại Tử / Fournier / Viêm Mô Tế Bào)</option>
                  <option value="crbsi">5. Nhiễm Khuẩn Huyết Do Catheter (CRBSI / Dây Truyền Trung Tâm)</option>
                  <option value="cns">6. Thần Kinh Trung Ương (Viêm Màng Não Mủ Cấp Tính)</option>
                  <option value="unknown">7. Chưa Rõ Ổ Vào / Sốt Giảm Bạch Cầu Hạt (Febrile Neutropenia)</option>
                </select>
              </div>

              <!-- MDR Risk Checkboxes -->
              <div style="background:rgba(124,58,237,0.06); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:0.85rem;">
                <div style="font-size:11.5px; font-weight:800; color:#7c3aed; text-transform:uppercase; margin-bottom:0.4rem;">
                  Yếu Tố Nguy Cơ Vi Khuẩn Đa Kháng (MDR Risk Factors):
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem;">
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisRiskPseudomonas" class="js-sepsis-input" checked />
                    <span>Nguy cơ <strong>Pseudomonas aeruginosa</strong> (Nằm viện &gt;5d, kháng sinh gần đây, giãn PQ)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisRiskMrsa" class="js-sepsis-input" />
                    <span>Nguy cơ <strong>MRSA</strong> (Tiền sử cấy MRSA, lọc máu chu kỳ, đặt catheter)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisRiskEsbl" class="js-sepsis-input" checked />
                    <span>Nguy cơ <strong>Vi khuẩn sinh ESBL</strong> (Nhiễm trùng bệnh viện, dùng Cephalosporin)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="sepsisRiskAcineto" class="js-sepsis-input" />
                    <span>Nguy cơ <strong>Acinetobacter baumannii</strong> (ICU thở máy kéo dài, dịch bùng phát)</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Sepsis Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="sepsisResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountSepsisController(bindActionBtns: (container: HTMLElement) => void): void {
  // 1. Sub-tab navigation inside Sepsis Studio
  const sepsisSubtabBtns = document.querySelectorAll<HTMLElement>('.js-sepsis-subtab-btn');
  const sepsisSubtabPanels = document.querySelectorAll<HTMLElement>('.js-sepsis-subtab-panel');

  sepsisSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sepsisSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-sepsis-tab');

      sepsisSubtabPanels.forEach(p => (p.style.display = 'none'));
      if (target === 'sofa_news2') {
        const p = document.getElementById('sepsisSubtabSofaNews2'); if (p) p.style.display = 'block';
      } else if (target === 'hemodynamics_bundle') {
        const p = document.getElementById('sepsisSubtabHemodynamics'); if (p) p.style.display = 'block';
      } else if (target === 'pneumonia_smartcop') {
        const p = document.getElementById('sepsisSubtabPneumonia'); if (p) p.style.display = 'block';
      } else if (target === 'lactate_fluids') {
        const p = document.getElementById('sepsisSubtabLactateFluids'); if (p) p.style.display = 'block';
      } else if (target === 'empiric_antimicrobial') {
        const p = document.getElementById('sepsisSubtabAntimicrobial'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Real-time Search & Category Filter for 20 Presets
  const sepsisSearchInput = document.getElementById('sepsisCaseSearchInput') as HTMLInputElement | null;
  const filterBtns = document.querySelectorAll<HTMLElement>('.js-sepsis-filter-btn');
  let currentSepsisCatFilter = 'all';

  const applySepsisFiltering = () => {
    const query = (sepsisSearchInput?.value || '').trim().toLowerCase();
    const presetItems = document.querySelectorAll<HTMLElement>('.js-sepsis-preset-btn');

    presetItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const searchStr = item.getAttribute('data-search') || '';

      const matchesCat = currentSepsisCatFilter === 'all' || cat === currentSepsisCatFilter;
      const matchesQuery = !query || searchStr.includes(query);

      if (matchesCat && matchesQuery) {
        if (item.classList.contains('js-sepsis-preset-card')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'inline-flex';
        }
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (sepsisSearchInput) {
    sepsisSearchInput.addEventListener('input', applySepsisFiltering);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentSepsisCatFilter = btn.getAttribute('data-filter') || 'all';
      applySepsisFiltering();
    });
  });

  // View Switcher (Grid vs Chips)
  const viewToggleBtns = document.querySelectorAll<HTMLElement>('.js-sepsis-view-toggle');
  const gridView = document.getElementById('sepsisPresetsGrid');
  const chipsView = document.getElementById('sepsisPresetsChips');

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
  const btnToggleCollapse = document.getElementById('btnToggleSepsisVaultCollapse');
  const vaultBody = document.getElementById('sepsisVaultBody');
  const iconCollapse = document.getElementById('iconSepsisVaultCollapse');

  btnToggleCollapse?.addEventListener('click', () => {
    if (!vaultBody) return;
    const isHidden = vaultBody.style.display === 'none';
    vaultBody.style.display = isHidden ? 'block' : 'none';
    if (iconCollapse) {
      iconCollapse.className = isHidden ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    }
  });

  // 3. Preset Loading Handler
  document.querySelectorAll<HTMLElement>('.js-sepsis-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = SEPSIS_PRESETS.find(p => p.id === id);
      if (preset) {
        // Highlight active card
        document.querySelectorAll<HTMLElement>('.js-sepsis-preset-btn').forEach(b => {
          b.classList.remove('is-active');
          if (b.getAttribute('data-preset-id') === id) {
            b.classList.add('is-active');
          }
        });

        const v = preset.values;
        if (v.respiratoryRate) (document.getElementById('sepsisRr') as HTMLInputElement).value = String(v.respiratoryRate);
        if (v.systolicBp) (document.getElementById('sepsisSbp') as HTMLInputElement).value = String(v.systolicBp);
        if (v.diastolicBp) (document.getElementById('sepsisDbp') as HTMLInputElement).value = String(v.diastolicBp);
        if (v.heartRate) (document.getElementById('sepsisHr') as HTMLInputElement).value = String(v.heartRate);
        if (v.temperatureC) (document.getElementById('sepsisTemp') as HTMLInputElement).value = String(v.temperatureC);
        if (v.pao2Fio2Ratio) (document.getElementById('sepsisPaO2FiO2') as HTMLInputElement).value = String(v.pao2Fio2Ratio);
        (document.getElementById('sepsisIsVentilated') as HTMLInputElement).checked = !!v.isMechanicallyVentilated;
        if (v.gcs) (document.getElementById('sepsisGcs') as HTMLInputElement).value = String(v.gcs);
        if (v.avpu) (document.getElementById('sepsisAvpu') as HTMLSelectElement).value = v.avpu;
        if (v.spo2Percent) (document.getElementById('sepsisSpo2') as HTMLInputElement).value = String(v.spo2Percent);
        (document.getElementById('sepsisIsOnOxygen') as HTMLInputElement).checked = !!v.isOnOxygen;
        (document.getElementById('sepsisIsCopd') as HTMLInputElement).checked = !!v.isCopdHypercapnic;

        if (v.plateletsK) (document.getElementById('sepsisPlatelets') as HTMLInputElement).value = String(v.plateletsK);
        if (v.bilirubinUmol) (document.getElementById('sepsisBilirubin') as HTMLInputElement).value = String(v.bilirubinUmol);
        if (v.serumCreatinineUmol) (document.getElementById('sepsisCreatinine') as HTMLInputElement).value = String(v.serumCreatinineUmol);

        (document.getElementById('sepsisNorepi') as HTMLInputElement).value = String(v.noradrenalineDoseUgKgMin || 0);
        (document.getElementById('sepsisEpi') as HTMLInputElement).value = String(v.adrenalineDoseUgKgMin || 0);
        (document.getElementById('sepsisVaso') as HTMLInputElement).value = String(v.vasopressinDoseUiMin || 0);
        (document.getElementById('sepsisDobutamine') as HTMLInputElement).value = String(v.dobutamineDoseUgKgMin || 0);

        (document.getElementById('sepsisBun') as HTMLInputElement).value = v.serumBunMmol ? String(v.serumBunMmol) : '12.5';
        (document.getElementById('sepsisAlbumin') as HTMLInputElement).value = v.serumAlbuminGDl ? String(v.serumAlbuminGDl) : '2.8';
        (document.getElementById('sepsisArterialPh') as HTMLInputElement).value = v.arterialPh ? String(v.arterialPh) : '7.28';
        (document.getElementById('sepsisIsMultilobar') as HTMLInputElement).checked = !!v.isMultilobarInfiltrate;
        (document.getElementById('sepsisIsAspiration') as HTMLInputElement).checked = !!v.isAspirationSuspected;

        (document.getElementById('sepsisLactateInitial') as HTMLInputElement).value = String(v.serumLactateMmol || 2.0);
        (document.getElementById('sepsisLactateRepeat') as HTMLInputElement).value = v.repeatLactateMmol ? String(v.repeatLactateMmol) : '';
        (document.getElementById('sepsisFluidsGiven') as HTMLInputElement).value = String(v.fluidsGivenMl || 0);
        (document.getElementById('sepsisCrt') as HTMLInputElement).value = v.capillaryRefillTimeSec ? String(v.capillaryRefillTimeSec) : '2.0';
        (document.getElementById('sepsisPlrPositive') as HTMLInputElement).checked = !!v.isPlrPositive;

        if (v.infectionSite) (document.getElementById('sepsisInfectionSite') as HTMLSelectElement).value = v.infectionSite;
        (document.getElementById('sepsisRiskPseudomonas') as HTMLInputElement).checked = !!v.isPseudomonasRisk;
        (document.getElementById('sepsisRiskMrsa') as HTMLInputElement).checked = !!v.isMrsaRisk;
        (document.getElementById('sepsisRiskEsbl') as HTMLInputElement).checked = !!v.isEsblRisk;
        (document.getElementById('sepsisRiskAcineto') as HTMLInputElement).checked = !!v.isAcinetobacterRisk;

        // Auto switch tab to preset focus
        sepsisSubtabBtns.forEach(b => b.classList.remove('is-active'));
        sepsisSubtabPanels.forEach(p => (p.style.display = 'none'));
        if (preset.category === 'septic_shock') {
          document.querySelector<HTMLElement>('[data-sepsis-tab="hemodynamics_bundle"]')?.classList.add('is-active');
          const p = document.getElementById('sepsisSubtabHemodynamics'); if (p) p.style.display = 'block';
        } else if (preset.category === 'severe_pneumonia') {
          document.querySelector<HTMLElement>('[data-sepsis-tab="pneumonia_smartcop"]')?.classList.add('is-active');
          const p = document.getElementById('sepsisSubtabPneumonia'); if (p) p.style.display = 'block';
        } else {
          document.querySelector<HTMLElement>('[data-sepsis-tab="sofa_news2"]')?.classList.add('is-active');
          const p = document.getElementById('sepsisSubtabSofaNews2'); if (p) p.style.display = 'block';
        }

        recalcSepsis();
      }
    });
  });

  // 4. Master Calculation Function
  const recalcSepsis = () => {
    const age = 65;
    const weightKg = 70;

    const respiratoryRate = parseFloat((document.getElementById('sepsisRr') as HTMLInputElement)?.value) || 28;
    const systolicBp = parseFloat((document.getElementById('sepsisSbp') as HTMLInputElement)?.value) || 82;
    const diastolicBp = parseFloat((document.getElementById('sepsisDbp') as HTMLInputElement)?.value) || 45;
    const heartRate = parseFloat((document.getElementById('sepsisHr') as HTMLInputElement)?.value) || 125;
    const temperatureC = parseFloat((document.getElementById('sepsisTemp') as HTMLInputElement)?.value) || 38.8;
    const pao2Fio2Ratio = parseFloat((document.getElementById('sepsisPaO2FiO2') as HTMLInputElement)?.value) || 220;
    const isMechanicallyVentilated = (document.getElementById('sepsisIsVentilated') as HTMLInputElement)?.checked;
    const gcs = parseFloat((document.getElementById('sepsisGcs') as HTMLInputElement)?.value) || 13;
    const avpu = ((document.getElementById('sepsisAvpu') as HTMLSelectElement)?.value || 'voice') as any;
    const spo2Percent = parseFloat((document.getElementById('sepsisSpo2') as HTMLInputElement)?.value) || 93;
    const isOnOxygen = (document.getElementById('sepsisIsOnOxygen') as HTMLInputElement)?.checked;
    const isCopdHypercapnic = (document.getElementById('sepsisIsCopd') as HTMLInputElement)?.checked;

    const plateletsK = parseFloat((document.getElementById('sepsisPlatelets') as HTMLInputElement)?.value) || 85;
    const bilirubinUmol = parseFloat((document.getElementById('sepsisBilirubin') as HTMLInputElement)?.value) || 38;
    const serumCreatinineUmol = parseFloat((document.getElementById('sepsisCreatinine') as HTMLInputElement)?.value) || 240;

    const noradrenalineDoseUgKgMin = parseFloat((document.getElementById('sepsisNorepi') as HTMLInputElement)?.value) || 0;
    const adrenalineDoseUgKgMin = parseFloat((document.getElementById('sepsisEpi') as HTMLInputElement)?.value) || 0;
    const vasopressinDoseUiMin = parseFloat((document.getElementById('sepsisVaso') as HTMLInputElement)?.value) || 0;
    const dobutamineDoseUgKgMin = parseFloat((document.getElementById('sepsisDobutamine') as HTMLInputElement)?.value) || 0;

    const serumBunMmol = parseFloat((document.getElementById('sepsisBun') as HTMLInputElement)?.value) || 12.5;
    const serumAlbuminGDl = parseFloat((document.getElementById('sepsisAlbumin') as HTMLInputElement)?.value) || 2.8;
    const arterialPh = parseFloat((document.getElementById('sepsisArterialPh') as HTMLInputElement)?.value) || 7.28;
    const isMultilobarInfiltrate = (document.getElementById('sepsisIsMultilobar') as HTMLInputElement)?.checked;
    const isAspirationSuspected = (document.getElementById('sepsisIsAspiration') as HTMLInputElement)?.checked;

    const serumLactateMmol = parseFloat((document.getElementById('sepsisLactateInitial') as HTMLInputElement)?.value) || 4.8;
    const repeatLactateMmol = parseFloat((document.getElementById('sepsisLactateRepeat') as HTMLInputElement)?.value) || undefined;
    const fluidsGivenMl = parseFloat((document.getElementById('sepsisFluidsGiven') as HTMLInputElement)?.value) || 0;
    const capillaryRefillTimeSec = parseFloat((document.getElementById('sepsisCrt') as HTMLInputElement)?.value) || 2.0;
    const isPlrPositive = (document.getElementById('sepsisPlrPositive') as HTMLInputElement)?.checked;

    const infectionSite = ((document.getElementById('sepsisInfectionSite') as HTMLSelectElement)?.value || 'abdominal') as any;
    const isPseudomonasRisk = (document.getElementById('sepsisRiskPseudomonas') as HTMLInputElement)?.checked;
    const isMrsaRisk = (document.getElementById('sepsisRiskMrsa') as HTMLInputElement)?.checked;
    const isEsblRisk = (document.getElementById('sepsisRiskEsbl') as HTMLInputElement)?.checked;
    const isAcinetobacterRisk = (document.getElementById('sepsisRiskAcineto') as HTMLInputElement)?.checked;

    const inputs: SepsisInputs = {
      age, weightKg, heartRate, respiratoryRate, systolicBp, diastolicBp, temperatureC,
      spo2Percent, isOnOxygen, isCopdHypercapnic, gcs, avpu,
      pao2Fio2Ratio, isMechanicallyVentilated, plateletsK, bilirubinUmol, serumCreatinineUmol,
      serumLactateMmol, repeatLactateMmol, lactateDeltaHours: 2,
      noradrenalineDoseUgKgMin, adrenalineDoseUgKgMin, dopamineDoseUgKgMin: 0,
      dobutamineDoseUgKgMin, vasopressinDoseUiMin,
      fluidsGivenMl, capillaryRefillTimeSec, isPlrPositive,
      isMultilobarInfiltrate, serumAlbuminGDl, arterialPh, serumBunMmol, isAspirationSuspected,
      infectionSite, isPseudomonasRisk, isMrsaRisk, isEsblRisk, isAcinetobacterRisk
    };

    const res = analyzeSepsisStudio(inputs);

    // Update target fluid label
    const targetFluidLabel = document.getElementById('sepsisFluidTargetLabel');
    if (targetFluidLabel) targetFluidLabel.textContent = `${res.targetFluidVolumeMl} mL`;

    // Render SOFA Radar SVG
    const radarWrap = document.getElementById('sepsisSofaRadarWrap');
    if (radarWrap) {
      radarWrap.innerHTML = renderSofaRadarSvg({
        resp: res.sofaRespiration,
        coag: res.sofaCoagulation,
        liver: res.sofaLiver,
        cardio: res.sofaCardio,
        cns: res.sofaCns,
        renal: res.sofaRenal
      });
    }

    // Render Lactate Curve SVG
    const lactateSvgWrap = document.getElementById('sepsisLactateSvgWrap');
    if (lactateSvgWrap) {
      lactateSvgWrap.innerHTML = renderLactateTrajectorySvg(serumLactateMmol, repeatLactateMmol, 2);
    }

    // Render Result Card
    const resultCard = document.getElementById('sepsisResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:#e11d48;"></i> Kết Quả Hồi Sức &amp; Nhiễm Khuẩn Huyết Pro</h3>
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

          <!-- Sepsis Classification Summary Card -->
          <div style="background:rgba(225,29,72,0.08); border-left:4px solid ${res.sepsisColor}; padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân Tầng Hội Chứng Sepsis:</div>
            <div style="font-size:1.1rem; font-weight:800; color:${res.sepsisColor}; margin-top:0.25rem;">
              ${escapeHtml(res.sepsisClassification)}
            </div>
            <div style="font-size:0.82rem; color:var(--color-text); margin-top:0.25rem; font-weight:600;">
              Khuyến cáo: <span class="dsp-badge dsp-badge--danger">${escapeHtml(res.icuCareRecommendation)}</span>
            </div>
          </div>

          <!-- Score Metrics Grid -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.4rem;">
              Bảng Tổng Hợp Điểm Suy Đa Cơ Quan &amp; Báo Động Sớm:
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; font-size:11.5px;">
              <div>• <strong>SOFA Score:</strong> <span style="font-size:13px; color:${res.sepsisColor}; font-weight:900;">${res.sofaScore}/24</span></div>
              <div>• <strong>Tử vong dự báo:</strong> <strong>${res.sofaMortalityPercent}</strong></div>
              <div>• <strong>qSOFA Score:</strong> <strong>${res.qsofaScore}/3</strong> (${res.isQsofaHighRisk ? 'Nguy cơ cao' : 'Thấp'})</div>
              <div>• <strong>NEWS2 Score:</strong> <span style="color:${res.news2Color}; font-weight:800;">${res.news2Score}/20 (${res.news2RiskCategory.toUpperCase()})</span></div>
              <div>• <strong>CURB-65:</strong> <strong>${res.curb65Score}/5</strong></div>
              <div>• <strong>SMART-COP:</strong> <strong>${res.smartCopScore}/8</strong> (IRVO: ${res.smartCopIrvoRiskPercent})</div>
            </div>
          </div>

          <!-- Hemodynamics & Vasopressor Titration -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.35rem;">
              Huyết Động &amp; Chuẩn Độ Vận Mạch:
            </div>
            <div style="font-size:12px; line-height:1.45;">
              <div>• <strong>MAP:</strong> <span style="color:${res.mapMmHg < 65 ? '#dc2626' : '#10b981'}; font-weight:800;">${res.mapMmHg} mmHg</span> (Đích ≥ 65)</div>
              <div>• <strong>Shock Index:</strong> <span style="color:${res.shockIndex > 0.9 ? '#dc2626' : 'var(--color-text)'}; font-weight:700;">${res.shockIndex}</span> ${res.isOccultShock ? '(Sốc ẩn giấu)' : ''}</div>
              <div>• <strong>Norepinephrine Equivalent (NEE):</strong> <strong style="color:${res.isRefractorySepticShock ? '#dc2626' : 'var(--color-primary)'};">${res.noradrenalineEquivalentUgKgMin} ug/kg/min</strong> (VIS = ${res.vasoactiveInotropicScore})</div>
              <div>• <strong>Bù dịch 30 mL/kg:</strong> Đã bù ${fluidsGivenMl} / ${res.targetFluidVolumeMl} mL (Còn thiếu: ${res.fluidBalanceRemainingMl} mL)</div>
            </div>
          </div>

          <!-- Empiric Antibiotic Sheet -->
          <div style="background:rgba(124,58,237,0.06); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#7c3aed; text-transform:uppercase; margin-bottom:0.35rem;">
              Phác Đồ Kháng Sinh Kinh Nghiệm Gợi Ý:
            </div>
            <div style="font-size:11.5px; line-height:1.45; color:var(--color-text);">
              ${escapeHtml(res.antibioticRegimen)}
            </div>
          </div>

          <!-- Hour-1 Bundle Checklist Box -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.35rem;">
              Bảng Kiểm Gói Sống Còn Giờ Đầu (Hour-1 Bundle):
            </div>
            <ul style="margin:0; padding-left:1.2rem; font-size:11.5px; line-height:1.4; display:flex; flex-direction:column; gap:0.25rem;">
              ${res.hour1BundleChecklist.map(c => `
                <li>
                  <strong style="color:${c.status === 'urgent' ? '#dc2626' : '#10b981'};">${escapeHtml(c.step)}:</strong>
                  <span>${escapeHtml(c.detail)}</span>
                </li>
              `).join('')}
            </ul>
          </div>

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

  document.querySelectorAll('.js-sepsis-input').forEach(i => i.addEventListener('input', recalcSepsis));

  // Initial Run
  recalcSepsis();
}
