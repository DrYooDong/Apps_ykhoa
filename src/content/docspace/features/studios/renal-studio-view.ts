/**
 * DocSpace — Renal & Nephro-Pharmacology Research Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for Renal Studio ($10,000 Level)
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeRenalStudio, renderKdigoHeatmapSvg, renderKdigoGaugeSvg, renderVancoAucSvg,
  RENAL_PRESETS, RenalInputs, MASTER_DRUG_DATABASE
} from './renal-dosing-studio';

export function renderRenalPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioRenal" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (20 Curated Research Presets) -->
      <div class="dsp-card" style="margin-bottom:1.25rem; padding:1rem 1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
          <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; display:flex; align-items:center; gap:0.4rem;">
            <i class="fa-solid fa-dna" style="color:#7c3aed;"></i> Kho 20 Ca Nghiên Cứu Thận Học &amp; Dược Lý Lâm Sàng Mẫu:
          </div>
          <!-- Category Filter Pills -->
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-filter-btn is-active" data-filter="all" style="font-size:11px; padding:3px 10px; border-radius:12px;">Tất cả (20)</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-filter-btn" data-filter="aki" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#dc2626;">●</span> AKI Cấp</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-filter-btn" data-filter="ckd" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#f59e0b;">●</span> CKD Mạn</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-filter-btn" data-filter="arc" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#7c3aed;">●</span> Tăng Thanh Thải ARC⚡</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-filter-btn" data-filter="cardiorenal_hrs" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#0284c7;">●</span> Tim Thận &amp; Gan Thận</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-filter-btn" data-filter="toxic_cin" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#ea580c;">●</span> Cản Quang (CIN) &amp; Độc Chất</button>
          </div>
        </div>
        <div id="renalPresetsContainer" style="display:flex; flex-wrap:wrap; gap:0.45rem;">
          ${RENAL_PRESETS.map(p => `
            <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-renal-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
              <strong>${escapeHtml(p.name)}</strong>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Top Visual Graphic: KDIGO 2D Heatmap & Half-Circle ARC Gauge SVG -->
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        
        <!-- KDIGO 2D Matrix Heatmap Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-table-cells-large" style="color:#7c3aed;"></i>
              <span>Ma Trận Nhiệt Phân Tầng Nguy Cơ KDIGO Heatmap (GFR x Albuminuria)</span>
            </div>
          </div>
          <div id="renalKdigoHeatmapContainer" style="overflow-x:auto;">
            ${renderKdigoHeatmapSvg('G3b', 'A3')}
          </div>
        </div>

        <!-- KDIGO Gauge & Vancomycin PK/PD Card -->
        <div class="dsp-card" style="padding:1rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
              <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-gauge-high" style="color:#0284c7;"></i>
                <span>Đồng Hồ Mức Lọc Cầu Thận eGFR &amp; Vùng Tăng Thanh Thải ARC</span>
              </div>
            </div>
            <div id="renalKdigoGaugeWrap">
              ${renderKdigoGaugeSvg(31)}
            </div>
          </div>

          <!-- Mini Vancomycin PK/PD SVG Box -->
          <div id="renalVancoSvgWrap" style="margin-top:0.5rem;">
            ${renderVancoAucSvg(465, 32.5, 16.2, 12)}
          </div>
        </div>

      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside Renal Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-subtab-btn is-active" data-renal-tab="egfr_kinetic" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-calculator"></i> 1. Đa Công Thức eGFR &amp; Kinetic GFR
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-subtab-btn" data-renal-tab="aki_fena" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-droplet"></i> 2. Tổn Thương Thận Cấp AKI &amp; FENa/FEUrea
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-subtab-btn" data-renal-tab="cin_mehran" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-radiation"></i> 3. Cản Quang (Mehran 2.0)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-subtab-btn" data-renal-tab="vanco_pkpd" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-flask"></i> 4. Dược Động Học Vancomycin AUC/MIC
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-renal-subtab-btn" data-renal-tab="drug_matrix" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-pills"></i> 5. Ma Trận Liều 30+ Thuốc &amp; CRRT/HD
            </button>
          </div>

          <!-- Sub-tab Panels -->
          <!-- 1. MULTI-FORMULA eGFR & KINETIC GFR -->
          <div class="js-renal-subtab-panel" id="renalSubtabEgfrKinetic" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#7c3aed;">
                <i class="fa-solid fa-calculator"></i> CKD-EPI 2021 (Cr / Cystatin C), Cockcroft-Gault Đa Trọng Lượng &amp; Kinetic GFR Động
              </h4>

              <!-- Row 1: Demographics -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tuổi Bệnh Nhân</span>
                    <span class="dsp-spec-unit-badge">tuổi</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalAge" data-step="-1">−</button>
                    <input class="dsp-spec-input js-renal-input" type="number" id="renalAge" value="68" min="18" max="110" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalAge" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Chuẩn hóa:</span><span class="dsp-spec-ref">CKD-EPI 2021</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Giới Tính</span>
                    <span class="dsp-spec-unit-badge">Gender</span>
                  </div>
                  <div style="padding:0.25rem 0;">
                    <select class="dsp-select js-renal-input" id="renalGender" style="font-weight:700;">
                      <option value="male">Nam giới</option>
                      <option value="female" selected>Nữ giới (Hệ số 1.012)</option>
                    </select>
                  </div>
                  <div class="dsp-spec-range"><span>IBW:</span><span class="dsp-spec-ref">45.5 + 0.9(H-152)</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cân Nặng &amp; Chiều Cao</span>
                    <span class="dsp-spec-unit-badge">kg / cm</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                    <input class="dsp-input js-renal-input" type="number" id="renalWeight" value="64" min="25" max="250" placeholder="Cân nặng" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <input class="dsp-input js-renal-input" type="number" id="renalHeight" value="155" min="100" max="220" placeholder="Chiều cao" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                  </div>
                  <div class="dsp-spec-range"><span>Béo phì:</span><span class="dsp-spec-ref">Tự động tính AdjBW</span></div>
                </div>
              </div>

              <!-- Row 2: Biomarkers -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#7c3aed;"></i> Creatinine Huyết Thanh</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalCreatinine" data-step="-5">−</button>
                    <input class="dsp-spec-input js-renal-input" type="number" id="renalCreatinine" value="165" min="20" max="1500" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalCreatinine" data-step="5">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Chuẩn:</span><span class="dsp-spec-ref">60 – 110 umol/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cystatin C Huyết Thanh</span>
                    <span class="dsp-spec-unit-badge">mg/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalCystatinC" data-step="-0.1">−</button>
                    <input class="dsp-spec-input js-renal-input" type="number" id="renalCystatinC" value="1.82" step="0.05" min="0.3" max="10" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalCystatinC" data-step="0.1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Không phụ thuộc khối cơ:</span><span class="dsp-spec-ref">0.6 – 1.0 mg/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tỷ Số Albumin/Cr Niệu (UACR)</span>
                    <span class="dsp-spec-unit-badge">mg/g</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalUacr" value="850" min="0" max="5000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>KDIGO A-Stage:</span><span class="dsp-spec-ref">A1 &lt;30, A2 30-300, A3 &gt;300</span></div>
                </div>
              </div>

              <!-- Row 3: Kinetic GFR Toggle & Parameters -->
              <div style="background:rgba(124,58,237,0.06); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:0.85rem;">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
                  <input type="checkbox" id="renalIsKineticGfr" class="js-renal-input" checked style="width:16px; height:16px;" />
                  <label for="renalIsKineticGfr" style="font-weight:800; color:#7c3aed; cursor:pointer;">
                    Kích hoạt Tính Kinetic GFR (Chen 2013) — Dành cho Creatinine biến động nhanh trong Tổn thương thận cấp (Non-Steady State AKI)
                  </label>
                </div>
                <div id="renalKineticBox" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem;">
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Creatinine nền ổn định (umol/L):</label>
                    <input class="dsp-input js-renal-input" type="number" id="renalBaselineCr" value="80" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Khoảng cách 2 lần xét nghiệm (&Delta;t giờ):</label>
                    <input class="dsp-input js-renal-input" type="number" id="renalDeltaHours" value="24" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                  <div>
                    <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Độ thay đổi Creatinine (&Delta;Scr umol/L):</label>
                    <input class="dsp-input js-renal-input" type="number" id="renalDeltaCr" value="85" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. AKI KDIGO & DIFFERENTIAL (FENa, FEUrea, FST) -->
          <div class="js-renal-subtab-panel" id="renalSubtabAkiFena" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#dc2626;">
                <i class="fa-solid fa-droplet"></i> Phân Tầng Tổn Thương Thận Cấp AKI KDIGO, Phân Biệt Trước Thận vs Tại Thận &amp; Nghiệm Pháp FST
              </h4>

              <!-- Row 1: Urine Output & Period -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Thể Tích Nước Tiểu Theo Dõi</span>
                    <span class="dsp-spec-unit-badge">mL</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalUrineVolPeriod" value="350" min="0" max="5000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Đánh giá thiểu niệu:</span><span class="dsp-spec-ref">&lt; 0.5 mL/kg/h</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Thời Gian Theo Dõi Nước Tiểu</span>
                    <span class="dsp-spec-unit-badge">giờ</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalUrineHours" value="12" min="1" max="72" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>KDIGO Cutoffs:</span><span class="dsp-spec-ref">6h / 12h / 24h</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">BUN / Ure Máu</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalBun" value="18.5" step="0.5" min="1" max="80" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>BUN/Cr Ratio:</span><span class="dsp-spec-ref">&gt; 20: Trước thận</span></div>
                </div>
              </div>

              <!-- Row 2: Urine Electrolytes for FENa & FEUrea -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Natri Niệu (U_Na)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalUrineNa" value="14" min="0" max="200" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>FENa &lt; 1%:</span><span class="dsp-spec-ref">Trước thận</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Creatinine Niệu (U_Cr)</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalUrineCr" value="12500" min="500" max="50000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Cô đặc nước tiểu:</span><span class="dsp-spec-ref">U_Cr/S_Cr</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Ure Niệu (U_Urea)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-renal-input" type="number" id="renalUrineUrea" value="320" min="10" max="1000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>FEUrea &lt; 35%:</span><span class="dsp-spec-ref">Dùng khi có Lợi tiểu</span></div>
                </div>
              </div>

              <!-- Row 3: Diuretic status & Furosemide Stress Test -->
              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <div style="display:flex; flex-direction:column; gap:0.5rem;">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="renalIsTakingDiuretic" class="js-renal-input" />
                    <span>Bệnh nhân đang dùng Lợi tiểu quai (Furosemide / Torsemide) ➔ <strong>Ưu tiên dùng FEUrea thay vì FENa</strong></span>
                  </label>
                  <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-top:0.25rem;">
                    <span style="font-size:11.5px; font-weight:700; color:var(--color-text-muted);">Nghiệm pháp Lợi tiểu FST (Nước tiểu sau 2h tiêm Furosemide 1.0-1.5 mg/kg):</span>
                    <input class="dsp-input js-renal-input" type="number" id="renalFstVol" placeholder="VD: 65 mL" style="padding:3px 8px; font-size:12px; font-weight:700; max-width:140px;" />
                    <span style="font-size:11px; color:var(--color-text-muted);">&lt; 200 mL sau 2h: Báo động cần Lọc Máu Cấp Cứu</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 3. CONTRAST-INDUCED NEPHROPATHY (MEHRAN SCORE 2.0) -->
          <div class="js-renal-subtab-panel" id="renalSubtabCinMehran" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ea580c;">
                <i class="fa-solid fa-radiation"></i> Đánh Giá Nguy Cơ Tổn Thương Thận Do Thuốc Cản Quang Sau Chụp Mạch / CT Scan (Mehran 2.0)
              </h4>

              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem;">
                <input type="checkbox" id="renalIsMehran" class="js-renal-input" checked style="width:16px; height:16px;" />
                <label for="renalIsMehran" style="font-weight:800; color:#ea580c; cursor:pointer;">
                  Kích hoạt Dự Báo Nguy Cơ Tổn Thương Thận Cản Quang (CA-AKI / CIN) &amp; Phác Đồ Truyền Dịch Phòng Ngừa
                </label>
              </div>

              <div id="renalMehranBox" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.75rem;">
                <div style="background:var(--color-bg); padding:0.75rem; border-radius:8px; border:1px solid var(--color-border);">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="renalMehranHypotension" class="js-renal-input" />
                    <span>Tụt HA (SBP &lt; 100) hoặc Cần Vận Mạch (5đ)</span>
                  </label>
                </div>

                <div style="background:var(--color-bg); padding:0.75rem; border-radius:8px; border:1px solid var(--color-border);">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="renalMehranIabp" class="js-renal-input" />
                    <span>Đặt Bóng Đối Xung ĐM Chủ IABP (5đ)</span>
                  </label>
                </div>

                <div style="background:var(--color-bg); padding:0.75rem; border-radius:8px; border:1px solid var(--color-border);">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="renalMehranChf" class="js-renal-input" />
                    <span>Suy Tim NYHA III/IV hoặc LVEF &lt; 40% (5đ)</span>
                  </label>
                </div>

                <div style="background:var(--color-bg); padding:0.75rem; border-radius:8px; border:1px solid var(--color-border);">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="renalMehranDm" class="js-renal-input" />
                    <span>Bệnh Nhân Đái Tháo Đường (3đ)</span>
                  </label>
                </div>

                <div style="background:var(--color-bg); padding:0.75rem; border-radius:8px; border:1px solid var(--color-border);">
                  <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Thể Tích Thuốc Cản Quang Dự Kiến (mL):</label>
                  <input class="dsp-input js-renal-input" type="number" id="renalMehranContrastVol" value="150" step="10" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  <span style="font-size:10px; color:var(--color-text-muted);">(1 điểm mỗi 100 mL cản quang)</span>
                </div>

                <div style="background:var(--color-bg); padding:0.75rem; border-radius:8px; border:1px solid var(--color-border);">
                  <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Hematocrit Huyết Học (%):</label>
                  <input class="dsp-input js-renal-input" type="number" id="renalMehranHct" value="38" step="1" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                  <span style="font-size:10px; color:var(--color-text-muted);">(Thiếu máu: &lt;39% nam, &lt;36% nữ = 3đ)</span>
                </div>
              </div>

            </div>
          </div>

          <!-- 4. VANCOMYCIN PRECISION PK/PD SIMULATOR & AMINOGLYCOSIDES -->
          <div class="js-renal-subtab-panel" id="renalSubtabVancoPkpd" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#0284c7;">
                <i class="fa-solid fa-flask"></i> Dược Động Học Cá Thể Hóa Vancomycin (AUC24/MIC Bayesian-like) &amp; Nomogram Aminoglycoside (Hartford)
              </h4>

              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem;">
                <input type="checkbox" id="renalIsVancoPk" class="js-renal-input" checked style="width:16px; height:16px;" />
                <label for="renalIsVancoPk" style="font-weight:800; color:#0284c7; cursor:pointer;">
                  Kích hoạt Bộ Giả Lập Dược Động Học Vancomycin 24h &amp; Dự Báo Nồng Độ Đáy Trough / Nồng Độ Đỉnh Peak
                </label>
              </div>

              <div id="renalVancoBox" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                <div>
                  <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Liều Vancomycin Mỗi Lần (mg):</label>
                  <input class="dsp-input js-renal-input" type="number" id="renalVancoDose" value="1000" step="250" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Khoảng Cách Liều (&tau; giờ):</label>
                  <select id="renalVancoInterval" class="dsp-select js-renal-input" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;">
                    <option value="8">Mỗi 8 giờ (q8h - ARC)</option>
                    <option value="12" selected>Mỗi 12 giờ (q12h - Chuẩn)</option>
                    <option value="24">Mỗi 24 giờ (q24h - Suy thận)</option>
                    <option value="48">Mỗi 48 giờ (q48h - Suy thận nặng)</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Thời Gian Truyền (giờ):</label>
                  <input class="dsp-input js-renal-input" type="number" id="renalVancoInfTime" value="1.5" step="0.5" min="1" max="4" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:700; color:var(--color-text-muted);">Nồng Độ Ức Chế Tối Thiểu (MIC):</label>
                  <input class="dsp-input js-renal-input" type="number" id="renalVancoMic" value="1.0" step="0.5" style="padding:4px 8px; font-size:12px; font-weight:700; margin-top:2px;" />
                </div>
              </div>

              <!-- Aminoglycoside Hartford Guidance Box -->
              <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.25); border-radius:8px; padding:0.85rem;">
                <div style="font-weight:800; font-size:11.5px; color:#0284c7; text-transform:uppercase; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-syringe"></i> Phác Đồ Liều Mở Rộng Aminoglycoside (Hartford 7 mg/kg):
                </div>
                <div id="renalAminoglycosideGuidance" style="font-size:12px; line-height:1.4;">
                  <!-- Rendered via JS -->
                </div>
              </div>

            </div>
          </div>

          <!-- 5. 30+ DRUG ICU & CRRT/HD DOSING MATRIX -->
          <div class="js-renal-subtab-panel" id="renalSubtabDrugMatrix" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.85rem;">
                <h4 style="margin:0; font-size:13px; font-weight:800; color:var(--color-primary);">
                  <i class="fa-solid fa-pills"></i> Ma Trận Hiệu Chỉnh Liều 30+ Thuốc Hồi Sức &amp; Lâm Sàng Theo eGFR / IHD / CRRT
                </h4>
                <input type="text" id="renalDrugSearchInput" placeholder="🔍 Lọc tên thuốc (Meropenem, Vanco...)" class="dsp-input" style="max-width:240px; padding:4px 8px; font-size:11.5px;" />
              </div>

              <div id="renalDrugTableContainer" style="overflow-x:auto;">
                <!-- Rendered via JS -->
              </div>
            </div>
          </div>

        </div>

        <!-- Renal Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="renalResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountRenalController(bindActionBtns: (container: HTMLElement) => void): void {
  // 1. Sub-tab navigation inside Renal Studio
  const renalSubtabBtns = document.querySelectorAll<HTMLElement>('.js-renal-subtab-btn');
  const renalSubtabPanels = document.querySelectorAll<HTMLElement>('.js-renal-subtab-panel');

  renalSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      renalSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-renal-tab');

      renalSubtabPanels.forEach(p => (p.style.display = 'none'));
      if (target === 'egfr_kinetic') {
        const p = document.getElementById('renalSubtabEgfrKinetic'); if (p) p.style.display = 'block';
      } else if (target === 'aki_fena') {
        const p = document.getElementById('renalSubtabAkiFena'); if (p) p.style.display = 'block';
      } else if (target === 'cin_mehran') {
        const p = document.getElementById('renalSubtabCinMehran'); if (p) p.style.display = 'block';
      } else if (target === 'vanco_pkpd') {
        const p = document.getElementById('renalSubtabVancoPkpd'); if (p) p.style.display = 'block';
      } else if (target === 'drug_matrix') {
        const p = document.getElementById('renalSubtabDrugMatrix'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Category filter for 20 Presets
  const filterBtns = document.querySelectorAll<HTMLElement>('.js-renal-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.getAttribute('data-filter');
      const presetBtns = document.querySelectorAll<HTMLElement>('.js-renal-preset-btn');
      presetBtns.forEach(pBtn => {
        if (cat === 'all' || pBtn.getAttribute('data-category') === cat) {
          pBtn.style.display = 'inline-flex';
        } else {
          pBtn.style.display = 'none';
        }
      });
    });
  });

  // 3. Preset Loading Handler
  document.querySelectorAll<HTMLElement>('.js-renal-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = RENAL_PRESETS.find(p => p.id === id);
      if (preset) {
        const v = preset.values;
        if (v.age) (document.getElementById('renalAge') as HTMLInputElement).value = String(v.age);
        if (v.gender) (document.getElementById('renalGender') as HTMLSelectElement).value = v.gender;
        if (v.weightKg) (document.getElementById('renalWeight') as HTMLInputElement).value = String(v.weightKg);
        if (v.heightCm) (document.getElementById('renalHeight') as HTMLInputElement).value = String(v.heightCm);

        (document.getElementById('renalCreatinine') as HTMLInputElement).value = String(v.serumCreatinineUmol || 100);
        (document.getElementById('renalCystatinC') as HTMLInputElement).value = v.serumCystatinCMgL ? String(v.serumCystatinCMgL) : '';
        (document.getElementById('renalUacr') as HTMLInputElement).value = v.urineAlbuminToCreatinineMgG ? String(v.urineAlbuminToCreatinineMgG) : '10';

        (document.getElementById('renalIsKineticGfr') as HTMLInputElement).checked = !!v.isKineticGfrEnabled;
        (document.getElementById('renalBaselineCr') as HTMLInputElement).value = v.baselineCreatinineUmol ? String(v.baselineCreatinineUmol) : '';
        (document.getElementById('renalDeltaHours') as HTMLInputElement).value = v.deltaHours ? String(v.deltaHours) : '24';
        (document.getElementById('renalDeltaCr') as HTMLInputElement).value = v.deltaCreatinineUmol ? String(v.deltaCreatinineUmol) : '0';

        (document.getElementById('renalUrineVolPeriod') as HTMLInputElement).value = v.urineVolumePeriodMl ? String(v.urineVolumePeriodMl) : '';
        (document.getElementById('renalUrineHours') as HTMLInputElement).value = v.urineOutputHours ? String(v.urineOutputHours) : '12';
        (document.getElementById('renalBun') as HTMLInputElement).value = v.serumBUNMmol ? String(v.serumBUNMmol) : '';
        (document.getElementById('renalUrineNa') as HTMLInputElement).value = v.urineNaMmol ? String(v.urineNaMmol) : '';
        (document.getElementById('renalUrineCr') as HTMLInputElement).value = v.urineCreatinineUmol ? String(v.urineCreatinineUmol) : '';
        (document.getElementById('renalUrineUrea') as HTMLInputElement).value = v.urineUreaMmol ? String(v.urineUreaMmol) : '';
        (document.getElementById('renalIsTakingDiuretic') as HTMLInputElement).checked = !!v.isTakingDiuretic;
        (document.getElementById('renalFstVol') as HTMLInputElement).value = v.furosemideStressTest2hMl ? String(v.furosemideStressTest2hMl) : '';

        (document.getElementById('renalIsMehran') as HTMLInputElement).checked = !!v.isMehranEnabled;
        (document.getElementById('renalMehranHypotension') as HTMLInputElement).checked = !!v.hasHypotensionOrInotropes;
        (document.getElementById('renalMehranIabp') as HTMLInputElement).checked = !!v.hasIabp;
        (document.getElementById('renalMehranChf') as HTMLInputElement).checked = !!v.hasHeartFailureNyha;
        (document.getElementById('renalMehranDm') as HTMLInputElement).checked = !!v.hasDiabetes;
        (document.getElementById('renalMehranContrastVol') as HTMLInputElement).value = v.contrastVolumeMl ? String(v.contrastVolumeMl) : '150';
        (document.getElementById('renalMehranHct') as HTMLInputElement).value = v.hematocritPercent ? String(v.hematocritPercent) : '38';

        (document.getElementById('renalIsVancoPk') as HTMLInputElement).checked = !!v.isVancoPkEnabled;
        (document.getElementById('renalVancoDose') as HTMLInputElement).value = v.vancoDoseMg ? String(v.vancoDoseMg) : '1000';
        (document.getElementById('renalVancoInterval') as HTMLSelectElement).value = v.vancoIntervalHours ? String(v.vancoIntervalHours) : '12';

        // Auto switch tab to preset focus
        renalSubtabBtns.forEach(b => b.classList.remove('is-active'));
        renalSubtabPanels.forEach(p => (p.style.display = 'none'));
        if (preset.category === 'aki') {
          document.querySelector<HTMLElement>('[data-renal-tab="aki_fena"]')?.classList.add('is-active');
          const p = document.getElementById('renalSubtabAkiFena'); if (p) p.style.display = 'block';
        } else if (preset.category === 'toxic_cin') {
          document.querySelector<HTMLElement>('[data-renal-tab="cin_mehran"]')?.classList.add('is-active');
          const p = document.getElementById('renalSubtabCinMehran'); if (p) p.style.display = 'block';
        } else if (preset.category === 'arc') {
          document.querySelector<HTMLElement>('[data-renal-tab="vanco_pkpd"]')?.classList.add('is-active');
          const p = document.getElementById('renalSubtabVancoPkpd'); if (p) p.style.display = 'block';
        } else {
          document.querySelector<HTMLElement>('[data-renal-tab="egfr_kinetic"]')?.classList.add('is-active');
          const p = document.getElementById('renalSubtabEgfrKinetic'); if (p) p.style.display = 'block';
        }

        recalcRenal();
      }
    });
  });

  // 4. Drug Search Filter
  const drugSearch = document.getElementById('renalDrugSearchInput') as HTMLInputElement;
  drugSearch?.addEventListener('input', () => {
    const q = drugSearch.value.toLowerCase().trim();
    document.querySelectorAll<HTMLElement>('.js-renal-drug-row').forEach(row => {
      const text = row.textContent?.toLowerCase() || '';
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });

  // 5. Master Calculation Function
  const recalcRenal = () => {
    const age = parseFloat((document.getElementById('renalAge') as HTMLInputElement)?.value) || 68;
    const gender = ((document.getElementById('renalGender') as HTMLSelectElement)?.value || 'female') as any;
    const weightKg = parseFloat((document.getElementById('renalWeight') as HTMLInputElement)?.value) || 64;
    const heightCm = parseFloat((document.getElementById('renalHeight') as HTMLInputElement)?.value) || 155;

    const serumCreatinineUmol = parseFloat((document.getElementById('renalCreatinine') as HTMLInputElement)?.value) || 165;
    const serumCystatinCMgL = parseFloat((document.getElementById('renalCystatinC') as HTMLInputElement)?.value) || undefined;
    const urineAlbuminToCreatinineMgG = parseFloat((document.getElementById('renalUacr') as HTMLInputElement)?.value) || 10;

    const isKineticGfrEnabled = (document.getElementById('renalIsKineticGfr') as HTMLInputElement)?.checked;
    const baselineCreatinineUmol = parseFloat((document.getElementById('renalBaselineCr') as HTMLInputElement)?.value) || undefined;
    const deltaHours = parseFloat((document.getElementById('renalDeltaHours') as HTMLInputElement)?.value) || 24;
    const deltaCreatinineUmol = parseFloat((document.getElementById('renalDeltaCr') as HTMLInputElement)?.value) || 0;

    const urineVolumePeriodMl = parseFloat((document.getElementById('renalUrineVolPeriod') as HTMLInputElement)?.value) || undefined;
    const urineOutputHours = parseFloat((document.getElementById('renalUrineHours') as HTMLInputElement)?.value) || 12;
    const serumBUNMmol = parseFloat((document.getElementById('renalBun') as HTMLInputElement)?.value) || undefined;
    const urineNaMmol = parseFloat((document.getElementById('renalUrineNa') as HTMLInputElement)?.value) || undefined;
    const urineCreatinineUmol = parseFloat((document.getElementById('renalUrineCr') as HTMLInputElement)?.value) || undefined;
    const urineUreaMmol = parseFloat((document.getElementById('renalUrineUrea') as HTMLInputElement)?.value) || undefined;
    const isTakingDiuretic = (document.getElementById('renalIsTakingDiuretic') as HTMLInputElement)?.checked;
    const furosemideStressTest2hMl = parseFloat((document.getElementById('renalFstVol') as HTMLInputElement)?.value) || undefined;

    const isMehranEnabled = (document.getElementById('renalIsMehran') as HTMLInputElement)?.checked;
    const hasHypotensionOrInotropes = (document.getElementById('renalMehranHypotension') as HTMLInputElement)?.checked;
    const hasIabp = (document.getElementById('renalMehranIabp') as HTMLInputElement)?.checked;
    const hasHeartFailureNyha = (document.getElementById('renalMehranChf') as HTMLInputElement)?.checked;
    const hasDiabetes = (document.getElementById('renalMehranDm') as HTMLInputElement)?.checked;
    const contrastVolumeMl = parseFloat((document.getElementById('renalMehranContrastVol') as HTMLInputElement)?.value) || 150;
    const hematocritPercent = parseFloat((document.getElementById('renalMehranHct') as HTMLInputElement)?.value) || 38;

    const isVancoPkEnabled = (document.getElementById('renalIsVancoPk') as HTMLInputElement)?.checked;
    const vancoDoseMg = parseFloat((document.getElementById('renalVancoDose') as HTMLInputElement)?.value) || 1000;
    const vancoIntervalHours = parseFloat((document.getElementById('renalVancoInterval') as HTMLSelectElement)?.value) || 12;
    const vancoInfusionHours = parseFloat((document.getElementById('renalVancoInfTime') as HTMLInputElement)?.value) || 1.5;
    const targetMicMgL = parseFloat((document.getElementById('renalVancoMic') as HTMLInputElement)?.value) || 1.0;

    const inputs: RenalInputs = {
      age, gender, weightKg, heightCm,
      serumCreatinineUmol, serumCystatinCMgL, baselineCreatinineUmol,
      serumBUNMmol, serumNaMmol: 138,
      isKineticGfrEnabled, deltaHours, deltaCreatinineUmol,
      urineVolumePeriodMl, urineOutputHours, urineNaMmol, urineCreatinineUmol, urineUreaMmol,
      urineAlbuminToCreatinineMgG, isTakingDiuretic, furosemideStressTest2hMl,
      isMehranEnabled, hasHypotensionOrInotropes, hasIabp, hasHeartFailureNyha,
      hasDiabetes, contrastVolumeMl, hematocritPercent,
      isVancoPkEnabled, vancoDoseMg, vancoIntervalHours, vancoInfusionHours, targetMicMgL
    };

    const res = analyzeRenalStudio(inputs);

    // Render KDIGO Heatmap SVG
    const heatmapContainer = document.getElementById('renalKdigoHeatmapContainer');
    if (heatmapContainer) {
      heatmapContainer.innerHTML = renderKdigoHeatmapSvg(res.kdigoGStage, res.kdigoAStage);
    }

    // Render KDIGO Gauge SVG
    const gaugeWrap = document.getElementById('renalKdigoGaugeWrap');
    if (gaugeWrap) {
      gaugeWrap.innerHTML = renderKdigoGaugeSvg(res.ckdEpi2021Combined || res.ckdEpi2021Cr);
    }

    // Render Vancomycin SVG
    const vancoSvgWrap = document.getElementById('renalVancoSvgWrap');
    if (vancoSvgWrap && res.vancoPk) {
      vancoSvgWrap.innerHTML = renderVancoAucSvg(res.vancoPk.auc24, res.vancoPk.predictedPeak, res.vancoPk.predictedTrough, vancoIntervalHours);
    }

    // Render Aminoglycoside Guidance
    const agGuidance = document.getElementById('renalAminoglycosideGuidance');
    if (agGuidance) {
      agGuidance.innerHTML = escapeHtml(res.aminoglycosideRegimen);
    }

    // Render 30+ Drug Matrix Table
    const tableContainer = document.getElementById('renalDrugTableContainer');
    if (tableContainer) {
      tableContainer.innerHTML = `
        <table style="width:100%; border-collapse:collapse; font-size:12px; line-height:1.45;">
          <thead>
            <tr style="border-bottom:2px solid var(--color-border); text-align:left; color:var(--color-text-muted);">
              <th style="padding:8px;">Thuốc &amp; Phân Nhóm</th>
              <th style="padding:8px;">Liều Chuẩn</th>
              <th style="padding:8px;">Liều Hiệu Chỉnh Theo Thận (CrCl / eGFR)</th>
              <th style="padding:8px;">Thận Nhân Tạo (IHD)</th>
              <th style="padding:8px;">Lọc Máu Liên Tục (CRRT)</th>
            </tr>
          </thead>
          <tbody>
            ${res.drugAdjustments.map(d => `
              <tr class="js-renal-drug-row" style="border-bottom:1px solid var(--color-border); ${d.isContraindicated ? 'background:rgba(239,68,68,0.06);' : ''}">
                <td style="padding:8px; font-weight:700;">
                  ${escapeHtml(d.drugName)}
                  <div style="font-size:10px; color:var(--color-text-muted); font-weight:normal;">${escapeHtml(d.category)}</div>
                </td>
                <td style="padding:8px; color:var(--color-text-muted);">${escapeHtml(d.standardDose)}</td>
                <td style="padding:8px; font-weight:700; color:${d.isContraindicated ? '#ef4444' : 'var(--color-primary)'};">
                  ${escapeHtml(d.adjustedDose)}
                  <div style="font-size:10.5px; color:var(--color-text-muted); font-weight:normal; margin-top:2px;">${escapeHtml(d.monitoringWarning)}</div>
                </td>
                <td style="padding:8px; font-size:11.5px;">${escapeHtml(d.hemodialysisDose)}</td>
                <td style="padding:8px; font-size:11.5px; color:#7c3aed; font-weight:600;">${escapeHtml(d.crrtDose)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    // Render Result Card
    const resultCard = document.getElementById('renalResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:#7c3aed;"></i> Kết Quả Thận Học &amp; Dược Động Học Pro</h3>
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

          <!-- KDIGO Summary Card -->
          <div style="background:rgba(124,58,237,0.08); border-left:4px solid ${res.kdigoStageColor}; padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân Độ KDIGO &amp; Mức Lọc Cầu Thận:</div>
            <div style="font-size:1.15rem; font-weight:800; color:${res.kdigoStageColor}; margin-top:0.25rem;">
              eGFR: ${res.ckdEpi2021Combined || res.ckdEpi2021Cr} mL/p/1.73m² (${res.kdigoGStage}-${res.kdigoAStage})
            </div>
            <div style="font-size:0.82rem; color:var(--color-text); margin-top:0.25rem; font-weight:600;">
              Nguy cơ tiến triển: <span class="dsp-badge ${res.kdigoRiskTier === 'very_high' ? 'dsp-badge--danger' : res.kdigoRiskTier === 'high' ? 'dsp-badge--warning' : 'dsp-badge--info'}">${res.kdigoRiskTier.toUpperCase()}</span>
            </div>
            <div style="font-size:0.8rem; color:var(--color-text-muted); margin-top:0.2rem;">
              ${escapeHtml(res.kdigoDescription)}
            </div>
          </div>

          <!-- Clearance Multi-Formulas Panel -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.4rem;">
              Bảng Đối Sánh Các Công Thức Thanh Thải:
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; font-size:11.5px;">
              <div>• CKD-EPI (Creatinine): <strong>${res.ckdEpi2021Cr}</strong></div>
              <div>• CKD-EPI (Cystatin C): <strong>${res.ckdEpi2021CysC ?? 'Chưa đo'}</strong></div>
              <div>• Cockcroft-Gault (ABW): <strong>${res.cockcroftGaultAbw} mL/p</strong></div>
              <div>• Cockcroft-Gault (IBW ${res.ibwKg}kg): <strong>${res.cockcroftGaultIbw} mL/p</strong></div>
              ${res.cockcroftGaultAdjBw ? `<div style="grid-column: span 2; color:#0284c7;">• Cockcroft-Gault (AdjBW Béo phì): <strong>${res.cockcroftGaultAdjBw} mL/p</strong></div>` : ''}
              ${res.kineticGfr !== null ? `<div style="grid-column: span 2; color:#7c3aed; font-weight:700;">• Kinetic GFR (Chen 2013): ${res.kineticGfr} mL/phút</div>` : ''}
            </div>
          </div>

          <!-- AKI & Differential Box -->
          ${res.akiStage !== 'No AKI' || res.feNa !== null ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.35rem;">
                Chẩn Đoán Tổn Thương Thận Cấp (AKI):
              </div>
              <div style="font-size:12px; margin-bottom:0.3rem;">
                <strong>Phân độ AKI:</strong> <span class="dsp-badge ${res.akiStage === 'Stage 3' ? 'dsp-badge--danger' : 'dsp-badge--warning'}">${res.akiStage}</span>
              </div>
              ${res.feNa !== null ? `<div style="font-size:11.5px; margin-top:0.25rem;">• ${escapeHtml(res.feNaInterpretation || '')}</div>` : ''}
              ${res.feUrea !== null ? `<div style="font-size:11.5px; margin-top:0.25rem;">• ${escapeHtml(res.feUreaInterpretation || '')}</div>` : ''}
              ${res.fstInterpretation ? `<div style="font-size:11.5px; margin-top:0.35rem; color:#dc2626; font-weight:700;">${escapeHtml(res.fstInterpretation)}</div>` : ''}
            </div>
          ` : ''}

          <!-- Vancomycin PK/PD Box -->
          ${res.vancoPk ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase; margin-bottom:0.35rem;">
                Chỉ Số Dược Động Học Vancomycin 24h:
              </div>
              <div style="font-size:12px; line-height:1.45;">
                <div>• AUC24/MIC: <strong style="color:${res.vancoPk.aucTargetStatus === 'optimal' ? '#10b981' : (res.vancoPk.aucTargetStatus === 'toxic' ? '#dc2626' : '#f59e0b')}; font-size:13px;">${res.vancoPk.auc24} mg·h/L</strong> (Đích: 400 - 600)</div>
                <div>• Dự báo Nồng độ Đỉnh (Peak): <strong>${res.vancoPk.predictedPeak} mcg/mL</strong></div>
                <div>• Dự báo Nồng độ Đáy (Trough): <strong>${res.vancoPk.predictedTrough} mcg/mL</strong></div>
                <div>• Liều nạp Loading Dose: <strong>${res.vancoPk.loadingDoseMg} mg IV</strong></div>
                <div style="font-size:11px; color:var(--color-text-muted); margin-top:0.2rem;">Khuyến cáo: ${escapeHtml(res.vancoPk.recommendedMaintenance)}</div>
              </div>
            </div>
          ` : ''}

          <!-- Mehran 2.0 CIN Box -->
          ${res.mehranScore !== null ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#ea580c; text-transform:uppercase; margin-bottom:0.35rem;">
                Nguy Cơ Tổn Thương Thận Do Cản Quang (Mehran 2.0):
              </div>
              <div style="font-size:12px; line-height:1.45;">
                <div>• Tổng điểm Mehran: <strong>${res.mehranScore} điểm</strong> (${escapeHtml(res.mehranRiskCategory || '')})</div>
                <div>• Nguy cơ CA-AKI: <strong style="color:#ea580c;">${res.mehranCinRiskPercent}%</strong> | Cần lọc máu: <strong>${res.mehranDialysisRiskPercent}%</strong></div>
                <div style="font-size:11px; color:var(--color-text-muted); margin-top:0.25rem;">${escapeHtml(res.mehranHydrationProtocol || '')}</div>
              </div>
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

  document.querySelectorAll('.js-renal-input').forEach(i => i.addEventListener('input', recalcRenal));

  // Initial Calculation Run
  recalcRenal();
}
