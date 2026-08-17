/**
 * DocSpace — Cardio & Lipid SCORE2 Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for Cardio Studio ($10,000 Level)
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeCardioStudio, renderScore2GaugeSvg, renderLdlWaterfallSvg,
  CARDIO_PRESETS, CardioRiskInputs
} from './cardio-risk-studio';

export function renderCardioPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioCardio" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (20 Curated Research Presets) -->
      <div class="dsp-card" style="margin-bottom:1.25rem; padding:1rem 1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
          <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; display:flex; align-items:center; gap:0.4rem;">
            <i class="fa-solid fa-chart-pie" style="color:#ca8a04;"></i> Kho 20 Ca Nghiên Cứu Tim Mạch Dự Phòng, Rối Loạn Lipid Máu &amp; Suy Tim GDMT Mẫu:
          </div>
          <!-- Category Filter Pills -->
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-filter-btn is-active" data-filter="all" style="font-size:11px; padding:3px 10px; border-radius:12px;">Tất cả (20)</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-filter-btn" data-filter="secondary_ascvd" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#dc2626;">●</span> Thứ Phát / ASCVD</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-filter-btn" data-filter="diabetes_ckd" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#ef4444;">●</span> ĐTĐ &amp; Thận Mạn (CKD)</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-filter-btn" data-filter="primary_fh" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#ea580c;">●</span> Tiên Phát &amp; Di Truyền FH</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-filter-btn" data-filter="heart_failure_gdmt" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#7c3aed;">●</span> Suy Tim GDMT 4 Trụ Cột</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-filter-btn" data-filter="elderly_sams" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#0284c7;">●</span> Cao Tuổi &amp; Không Dung Nạp Statin</button>
          </div>
        </div>
        <div id="cardioPresetsContainer" style="display:flex; flex-wrap:wrap; gap:0.45rem;">
          ${CARDIO_PRESETS.map(p => `
            <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-cardio-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
              <strong>${escapeHtml(p.name)}</strong>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Top Visual Graphic: SCORE2 Gauge & Stepwise Lipid Waterfall SVG -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        
        <!-- SCORE2 10-Year CVD Risk Gauge Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-gauge-high" style="color:#ca8a04;"></i>
              <span>Đồng Hồ Dự Báo Biến Cố Tim Mạch 10 Năm (ESC SCORE2 / SCORE2-OP)</span>
            </div>
          </div>
          <div id="cardioScore2GaugeWrap">
            ${renderScore2GaugeSvg(28)}
          </div>
        </div>

        <!-- Stepwise LDL-C Waterfall Cascade Reduction Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-chart-column" style="color:#10b981;"></i>
              <span>Mô Phỏng Thác Đổ Hạ LDL-C Theo Bậc Trị Liệu (Statin / Ezetimibe / PCSK9i)</span>
            </div>
          </div>
          <div id="cardioLdlWaterfallWrap">
            ${renderLdlWaterfallSvg(4.2, 1.4)}
          </div>
        </div>

      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside Cardio Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-subtab-btn is-active" data-cardio-tab="score2_ascvd" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-chart-pie"></i> 1. Đánh Giá Nguy Cơ 10 Năm (SCORE2 / ASCVD)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-subtab-btn" data-cardio-tab="lipid_titration" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-capsules"></i> 2. Chuẩn Độ Lipid (Statin, Ezetimibe, PCSK9i)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-subtab-btn" data-cardio-tab="heart_failure_gdmt" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-heart-pulse"></i> 3. Tối Ưu Suy Tim GDMT 4 Trụ Cột
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-subtab-btn" data-cardio-tab="fh_screening" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-dna"></i> 4. Tăng Cholesterol Gia Đình &amp; Lp(a)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cardio-subtab-btn" data-cardio-tab="lifestyle_dapt" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-person-running"></i> 5. Kháng Kết Tập Tiểu Cầu &amp; Lối Sống
            </button>
          </div>

          <!-- Sub-tab Panels -->
          <!-- 1. SCORE2 / ASCVD 10-YEAR RISK EVALUATION -->
          <div class="js-cardio-subtab-panel" id="cardioSubtabScore2" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ca8a04;">
                <i class="fa-solid fa-chart-pie"></i> Đánh Giá Nguy Cơ Tim Mạch 10 Năm ESC SCORE2 (40-69), SCORE2-OP (70-89) &amp; ASCVD
              </h4>

              <!-- Row 1: Demographics & Smoking -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tuổi &amp; Giới Tính</span>
                    <span class="dsp-spec-unit-badge">Age / Gender</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:6px;">
                    <input class="dsp-input js-cardio-input" type="number" id="cardioAge" value="58" min="18" max="100" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <select class="dsp-select js-cardio-input" id="cardioGender" style="padding:4px 8px; font-size:11.5px; font-weight:700;">
                      <option value="male" selected>Nam giới</option>
                      <option value="female">Nữ giới</option>
                    </select>
                  </div>
                  <div class="dsp-spec-range"><span>Phân loại:</span><span class="dsp-spec-ref">≥70 tuổi: SCORE2-OP</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Huyết Áp Tâm Thu (HATT)</span>
                    <span class="dsp-spec-unit-badge">mmHg</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cardioSbp" data-step="-5">−</button>
                    <input class="dsp-spec-input js-cardio-input" type="number" id="cardioSbp" value="135" min="70" max="260" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cardioSbp" data-step="5">+</button>
                  </div>
                  <div style="margin-top:4px;">
                    <label style="font-size:10.5px; display:flex; align-items:center; gap:3px; cursor:pointer;">
                      <input type="checkbox" id="cardioIsTreatedHtn" class="js-cardio-input" />
                      <span>Đang điều trị thuốc hạ áp</span>
                    </label>
                  </div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tình Trạng Hút Thuốc Lá</span>
                    <span class="dsp-spec-unit-badge">Smoker</span>
                  </div>
                  <div style="padding:0.25rem 0;">
                    <select class="dsp-select js-cardio-input" id="cardioIsSmoker" style="font-weight:700;">
                      <option value="yes" selected>Đang hút thuốc lá (Tăng gấp đôi nguy cơ)</option>
                      <option value="no">Không hút thuốc lá</option>
                    </select>
                  </div>
                  <div class="dsp-spec-range"><span>ESC:</span><span class="dsp-spec-ref">Cai thuốc giảm 50% nguy cơ</span></div>
                </div>
              </div>

              <!-- Row 2: Lipid Profile -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cholesterol Toàn Phần</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-cardio-input" type="number" id="cardioTotalChol" value="6.2" step="0.1" min="1" max="25" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>&gt; 8.0 mmol/L:</span><span class="dsp-spec-ref">Nguy cơ Cao độc lập</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">HDL-Cholesterol</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-cardio-input" type="number" id="cardioHdl" value="0.95" step="0.05" min="0.2" max="5.0" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Non-HDL-C:</span><span class="dsp-spec-ref">Total - HDL</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#ca8a04;"></i> LDL-Cholesterol (Hiện Tại)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <input class="dsp-input js-cardio-input" type="number" id="cardioLdl" value="4.2" step="0.1" min="0.2" max="20" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Quy đổi:</span><span class="dsp-spec-ref">mmol/L x 38.67 = mg/dL</span></div>
                </div>
              </div>

              <!-- Row 3: ASCVD Comorbidities Flags -->
              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <div style="font-size:11.5px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.4rem;">
                  Tiền Sử Bệnh Tim Mạch Xơ Vữa &amp; Bệnh Đồng Mắc (ASCVD Automatic Classifiers):
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem;">
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="cardioHasCvdHistory" class="js-cardio-input" checked />
                    <span>Đã có <strong>Bệnh tim mạch xơ vữa ASCVD</strong> (NMCT, PCI, CABG, Đột quỵ, PAD)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="cardioHasRecurrentAscvd" class="js-cardio-input" />
                    <span>Biến cố xơ vữa <strong>TÁI PHÁT TRONG 2 NĂM</strong> (Extreme Risk ➔ Đích LDL &lt; 1.0)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="cardioHasDiabetes" class="js-cardio-input" />
                    <span>Mắc <strong>Đái Tháo Đường Type 2</strong> (Có biến chứng hoặc kéo dài &gt;10 năm)</span>
                  </label>
                  <label style="font-size:11.5px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="cardioHasCkd" class="js-cardio-input" />
                    <span>Mắc <strong>Bệnh Thận Mạn (CKD)</strong> eGFR &lt; 60 mL/p</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. STEPWISE LIPID TITRATION (STATIN, EZETIMIBE, PCSK9i) -->
          <div class="js-cardio-subtab-panel" id="cardioSubtabLipid" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#10b981;">
                <i class="fa-solid fa-capsules"></i> Chuẩn Độ Hạ Lipid Máu Theo Bậc (ESC Stepwise Strategy) &amp; Hội Chứng SAMS
              </h4>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
                <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="checkbox" id="cardioIsStatinIntolerant" class="js-cardio-input" />
                  <span>Bệnh nhân <strong>Không dung nạp Statin do đau cơ (SAMS)</strong> ➔ Thay thế bằng Bempedoic Acid + Ezetimibe ± PCSK9i</span>
                </label>
              </div>

              <!-- Stepwise Cascade Explanation -->
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem;">
                <div style="background:rgba(234,88,12,0.06); border:1px solid rgba(234,88,12,0.25); border-radius:8px; padding:0.75rem;">
                  <div style="font-size:11px; font-weight:800; color:#ea580c; text-transform:uppercase;">Bậc 1: Statin Cường Độ Cao</div>
                  <div style="font-size:12px; font-weight:700; margin-top:0.25rem;">Rosuva 20-40mg / Atorva 40-80mg</div>
                  <div style="font-size:11px; color:var(--color-text-muted); margin-top:0.2rem;">Kỳ vọng hạ ~50% LDL-C</div>
                </div>

                <div style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.25); border-radius:8px; padding:0.75rem;">
                  <div style="font-size:11px; font-weight:800; color:#f59e0b; text-transform:uppercase;">Bậc 2: Thêm Ezetimibe 10mg</div>
                  <div style="font-size:12px; font-weight:700; margin-top:0.25rem;">Statin + Ezetimibe 10mg</div>
                  <div style="font-size:11px; color:var(--color-text-muted); margin-top:0.2rem;">Kỳ vọng hạ thêm 15-20% (Tổng ~65%)</div>
                </div>

                <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:0.75rem;">
                  <div style="font-size:11px; font-weight:800; color:#10b981; text-transform:uppercase;">Bậc 3: Thêm Thuốc Ức Chế PCSK9</div>
                  <div style="font-size:12px; font-weight:700; margin-top:0.25rem;">Evolocumab 140mg / Inclisiran</div>
                  <div style="font-size:11px; color:var(--color-text-muted); margin-top:0.2rem;">Kỳ vọng hạ thêm 50-60% (Tổng ~85%)</div>
                </div>
              </div>

            </div>
          </div>

          <!-- 3. HEART FAILURE GDMT 4-PILLARS -->
          <div class="js-cardio-subtab-panel" id="cardioSubtabHf" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#7c3aed;">
                <i class="fa-solid fa-heart-pulse"></i> Tối Ưu Hóa 4 Trụ Cột GDMT Trong Điều Trị Suy Tim (HFrEF / HFmrEF / HFpEF)
              </h4>

              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem;">
                <input type="checkbox" id="cardioIsHfEvaluated" class="js-cardio-input" checked style="width:16px; height:16px;" />
                <label for="cardioIsHfEvaluated" style="font-weight:800; color:#7c3aed; cursor:pointer;">
                  Kích hoạt Đánh Giá Suy Tim &amp; Tối Ưu Liều 4 Nhóm Thuốc Cứu Sống GDMT
                </label>
              </div>

              <div id="cardioHfBox" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Phân Suất Tống Máu (LVEF)</span>
                    <span class="dsp-spec-unit-badge">%</span>
                  </div>
                  <input class="dsp-input js-cardio-input" type="number" id="cardioLvef" value="42" min="10" max="80" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Phân loại:</span><span class="dsp-spec-ref">≤40%: HFrEF, 41-49%: HFmrEF</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">1. ARNI (Sacubitril/Valsartan)</span>
                    <span class="dsp-spec-unit-badge">Pillar 1</span>
                  </div>
                  <select id="cardioArniDose" class="dsp-select js-cardio-input" style="font-size:11.5px; font-weight:700;">
                    <option value="none">Chưa dùng</option>
                    <option value="low" selected>Liều khởi đầu: 24/26mg BID</option>
                    <option value="medium">Liều trung bình: 49/51mg BID</option>
                    <option value="target">Liều đích tối ưu: 97/103mg BID</option>
                  </select>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">2. Chẹn Beta Giao Cảm</span>
                    <span class="dsp-spec-unit-badge">Pillar 2</span>
                  </div>
                  <select id="cardioBetaBlockerDose" class="dsp-select js-cardio-input" style="font-size:11.5px; font-weight:700;">
                    <option value="none">Chưa dùng</option>
                    <option value="low">Liều thấp (Bisoprolol 2.5mg)</option>
                    <option value="medium" selected>Liều trung bình (Bisoprolol 5mg)</option>
                    <option value="target">Liều đích (Bisoprolol 10mg / Carvedilol 25 BID)</option>
                  </select>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">3. Kháng MRA (Spironolactone)</span>
                    <span class="dsp-spec-unit-badge">Pillar 3</span>
                  </div>
                  <select id="cardioMraDose" class="dsp-select js-cardio-input" style="font-size:11.5px; font-weight:700;">
                    <option value="none">Chưa dùng</option>
                    <option value="low">Liều khởi đầu: 12.5 - 25mg QD</option>
                    <option value="target" selected>Liều đích: 25 - 50mg QD</option>
                  </select>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">4. Thuốc Ức Chế SGLT2i</span>
                    <span class="dsp-spec-unit-badge">Pillar 4</span>
                  </div>
                  <select id="cardioSglt2iDose" class="dsp-select js-cardio-input" style="font-size:11.5px; font-weight:700;">
                    <option value="none">Chưa dùng</option>
                    <option value="target" selected>Đủ liều chuẩn: Dapa/Empa 10mg QD</option>
                  </select>
                </div>
              </div>

            </div>
          </div>

          <!-- 4. FAMILIAL HYPERCHOLESTEROLEMIA (FH) & Lp(a) -->
          <div class="js-cardio-subtab-panel" id="cardioSubtabFh" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ea580c;">
                <i class="fa-solid fa-dna"></i> Tăng Cholesterol Máu Gia Đình (HeFH) &amp; Yếu Tố Khuếch Đại Lipoprotein(a)
              </h4>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Lipoprotein(a) — Lp(a)</span>
                    <span class="dsp-spec-unit-badge">mg/dL</span>
                  </div>
                  <input class="dsp-input js-cardio-input" type="number" id="cardioLpa" value="25" min="1" max="300" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>&gt; 50 mg/dL:</span><span class="dsp-spec-ref">Yếu tố nguy cơ xơ vữa cao</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Apolipoprotein B (ApoB)</span>
                    <span class="dsp-spec-unit-badge">mg/dL</span>
                  </div>
                  <input class="dsp-input js-cardio-input" type="number" id="cardioApob" value="105" min="20" max="250" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Đích Rất Cao:</span><span class="dsp-spec-ref">&lt; 65 mg/dL</span></div>
                </div>
              </div>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="checkbox" id="cardioIsFh" class="js-cardio-input" />
                  <span>Nghi ngờ hoặc chẩn đoán xác định <strong>Tăng Cholesterol Máu Gia Đình Dị Hợp Tử (HeFH)</strong> (Gân gót Achilles dày, u vàng, LDL &gt; 4.9 mmol/L)</span>
                </label>
              </div>

            </div>
          </div>

          <!-- 5. ANTITHROMBOTIC & LIFESTYLE -->
          <div class="js-cardio-subtab-panel" id="cardioSubtabLifestyle" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#0284c7;">
                <i class="fa-solid fa-person-running"></i> Chiến Lược Kháng Kết Tập Tiểu Cầu (DAPT) &amp; Can Thiệp Lối Sống
              </h4>

              <div style="font-size:12px; line-height:1.5;">
                <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.25); border-radius:8px; padding:0.85rem; margin-bottom:0.75rem;">
                  <strong>1. Kháng Kết Tập Tiểu Cầu Kép (DAPT sau Can Thiệp Mạch Vành PCI):</strong>
                  <ul style="margin:0.25rem 0 0 1.2rem; padding:0;">
                    <li><strong>Sau Hội chứng vành cấp (ACS):</strong> Aspirin 81-100mg + Ticagrelor 90mg BID (hoặc Prasugrel 10mg QD) trong 12 tháng.</li>
                    <li><strong>Bệnh mạch vành mạn (CCS):</strong> Aspirin 81-100mg + Clopidogrel 75mg QD trong 6 tháng.</li>
                    <li><strong>Nếu kèm Rung nhĩ:</strong> Liệu pháp 3 thuốc (NOAC + Aspirin + Clopidogrel) trong 1-4 tuần ➔ Chuyển Liệu pháp Đôi (NOAC + Clopidogrel) đến 12 tháng.</li>
                  </ul>
                </div>

                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                  <strong>2. Can Thiệp Lối Sống Tim Mạch (ESC 2021):</strong>
                  <ul style="margin:0.25rem 0 0 1.2rem; padding:0;">
                    <li>Chế độ ăn Địa Trung Hải giàu cá, rau quả, dầu ô liu; hạn chế chất béo bão hòa &lt; 7% tổng năng lượng.</li>
                    <li>Vận động thể lực nhịp điệu mức độ trung bình ≥ 150 - 300 phút/tuần hoặc gắng sức ≥ 75 - 150 phút/tuần.</li>
                    <li>Kiểm soát Huyết áp đích: 120 - 130 / 70 - 80 mmHg ở hầu hết bệnh nhân &lt; 70 tuổi.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Cardio Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="cardioResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountCardioController(bindActionBtns: (container: HTMLElement) => void): void {
  // 1. Sub-tab navigation inside Cardio Studio
  const cardioSubtabBtns = document.querySelectorAll<HTMLElement>('.js-cardio-subtab-btn');
  const cardioSubtabPanels = document.querySelectorAll<HTMLElement>('.js-cardio-subtab-panel');

  cardioSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cardioSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-cardio-tab');

      cardioSubtabPanels.forEach(p => (p.style.display = 'none'));
      if (target === 'score2_ascvd') {
        const p = document.getElementById('cardioSubtabScore2'); if (p) p.style.display = 'block';
      } else if (target === 'lipid_titration') {
        const p = document.getElementById('cardioSubtabLipid'); if (p) p.style.display = 'block';
      } else if (target === 'heart_failure_gdmt') {
        const p = document.getElementById('cardioSubtabHf'); if (p) p.style.display = 'block';
      } else if (target === 'fh_screening') {
        const p = document.getElementById('cardioSubtabFh'); if (p) p.style.display = 'block';
      } else if (target === 'lifestyle_dapt') {
        const p = document.getElementById('cardioSubtabLifestyle'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Category filter for 20 Presets
  const filterBtns = document.querySelectorAll<HTMLElement>('.js-cardio-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.getAttribute('data-filter');
      const presetBtns = document.querySelectorAll<HTMLElement>('.js-cardio-preset-btn');
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
  document.querySelectorAll<HTMLElement>('.js-cardio-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = CARDIO_PRESETS.find(p => p.id === id);
      if (preset) {
        const v = preset.values;
        if (v.age) (document.getElementById('cardioAge') as HTMLInputElement).value = String(v.age);
        if (v.gender) (document.getElementById('cardioGender') as HTMLSelectElement).value = v.gender;
        if (v.systolicBp) (document.getElementById('cardioSbp') as HTMLInputElement).value = String(v.systolicBp);
        (document.getElementById('cardioIsSmoker') as HTMLSelectElement).value = v.isSmoker ? 'yes' : 'no';

        if (v.totalCholesterolMmol) (document.getElementById('cardioTotalChol') as HTMLInputElement).value = String(v.totalCholesterolMmol);
        if (v.hdlCholesterolMmol) (document.getElementById('cardioHdl') as HTMLInputElement).value = String(v.hdlCholesterolMmol);
        if (v.ldlCholesterolMmol) (document.getElementById('cardioLdl') as HTMLInputElement).value = String(v.ldlCholesterolMmol);

        (document.getElementById('cardioHasCvdHistory') as HTMLInputElement).checked = !!v.hasCvdHistory;
        (document.getElementById('cardioHasRecurrentAscvd') as HTMLInputElement).checked = !!v.hasRecurrentAscvdWithin2Yrs;
        (document.getElementById('cardioHasDiabetes') as HTMLInputElement).checked = !!v.hasDiabetes;
        (document.getElementById('cardioHasCkd') as HTMLInputElement).checked = !!v.hasCkd;

        (document.getElementById('cardioIsStatinIntolerant') as HTMLInputElement).checked = !!v.isStatinIntolerant;
        (document.getElementById('cardioIsFh') as HTMLInputElement).checked = !!v.isFamilialHypercholesterolemia;
        if (v.lipoproteinAMgDl) (document.getElementById('cardioLpa') as HTMLInputElement).value = String(v.lipoproteinAMgDl);

        (document.getElementById('cardioIsHfEvaluated') as HTMLInputElement).checked = !!v.isHeartFailureEvaluated;
        if (v.lvefPercent) (document.getElementById('cardioLvef') as HTMLInputElement).value = String(v.lvefPercent);
        if (v.currentArniDose) (document.getElementById('cardioArniDose') as HTMLSelectElement).value = v.currentArniDose;
        if (v.currentBetaBlockerDose) (document.getElementById('cardioBetaBlockerDose') as HTMLSelectElement).value = v.currentBetaBlockerDose;
        if (v.currentMraDose) (document.getElementById('cardioMraDose') as HTMLSelectElement).value = v.currentMraDose;
        if (v.currentSglt2iDose) (document.getElementById('cardioSglt2iDose') as HTMLSelectElement).value = v.currentSglt2iDose;

        // Auto switch tab to preset focus
        cardioSubtabBtns.forEach(b => b.classList.remove('is-active'));
        cardioSubtabPanels.forEach(p => (p.style.display = 'none'));
        if (preset.category === 'heart_failure_gdmt') {
          document.querySelector<HTMLElement>('[data-cardio-tab="heart_failure_gdmt"]')?.classList.add('is-active');
          const p = document.getElementById('cardioSubtabHf'); if (p) p.style.display = 'block';
        } else if (preset.category === 'primary_fh') {
          document.querySelector<HTMLElement>('[data-cardio-tab="fh_screening"]')?.classList.add('is-active');
          const p = document.getElementById('cardioSubtabFh'); if (p) p.style.display = 'block';
        } else if (preset.category === 'elderly_sams') {
          document.querySelector<HTMLElement>('[data-cardio-tab="lipid_titration"]')?.classList.add('is-active');
          const p = document.getElementById('cardioSubtabLipid'); if (p) p.style.display = 'block';
        } else {
          document.querySelector<HTMLElement>('[data-cardio-tab="score2_ascvd"]')?.classList.add('is-active');
          const p = document.getElementById('cardioSubtabScore2'); if (p) p.style.display = 'block';
        }

        recalcCardio();
      }
    });
  });

  // 4. Master Calculation Function
  const recalcCardio = () => {
    const age = parseFloat((document.getElementById('cardioAge') as HTMLInputElement)?.value) || 58;
    const gender = ((document.getElementById('cardioGender') as HTMLSelectElement)?.value || 'male') as any;
    const systolicBp = parseFloat((document.getElementById('cardioSbp') as HTMLInputElement)?.value) || 135;
    const isTreatedHypertension = (document.getElementById('cardioIsTreatedHtn') as HTMLInputElement)?.checked;
    const isSmoker = (document.getElementById('cardioIsSmoker') as HTMLSelectElement)?.value === 'yes';

    const totalCholesterolMmol = parseFloat((document.getElementById('cardioTotalChol') as HTMLInputElement)?.value) || 6.2;
    const hdlCholesterolMmol = parseFloat((document.getElementById('cardioHdl') as HTMLInputElement)?.value) || 0.95;
    const ldlCholesterolMmol = parseFloat((document.getElementById('cardioLdl') as HTMLInputElement)?.value) || 4.2;

    const hasCvdHistory = (document.getElementById('cardioHasCvdHistory') as HTMLInputElement)?.checked;
    const hasRecurrentAscvdWithin2Yrs = (document.getElementById('cardioHasRecurrentAscvd') as HTMLInputElement)?.checked;
    const hasDiabetes = (document.getElementById('cardioHasDiabetes') as HTMLInputElement)?.checked;
    const hasCkd = (document.getElementById('cardioHasCkd') as HTMLInputElement)?.checked;

    const isStatinIntolerant = (document.getElementById('cardioIsStatinIntolerant') as HTMLInputElement)?.checked;
    const isFamilialHypercholesterolemia = (document.getElementById('cardioIsFh') as HTMLInputElement)?.checked;
    const lipoproteinAMgDl = parseFloat((document.getElementById('cardioLpa') as HTMLInputElement)?.value) || undefined;

    const isHeartFailureEvaluated = (document.getElementById('cardioIsHfEvaluated') as HTMLInputElement)?.checked;
    const lvefPercent = parseFloat((document.getElementById('cardioLvef') as HTMLInputElement)?.value) || 42;
    const currentArniDose = ((document.getElementById('cardioArniDose') as HTMLSelectElement)?.value || 'low') as any;
    const currentBetaBlockerDose = ((document.getElementById('cardioBetaBlockerDose') as HTMLSelectElement)?.value || 'medium') as any;
    const currentMraDose = ((document.getElementById('cardioMraDose') as HTMLSelectElement)?.value || 'target') as any;
    const currentSglt2iDose = ((document.getElementById('cardioSglt2iDose') as HTMLSelectElement)?.value || 'target') as any;

    const inputs: CardioRiskInputs = {
      age, gender, isSmoker, systolicBp, isTreatedHypertension,
      totalCholesterolMmol, hdlCholesterolMmol, ldlCholesterolMmol,
      hasCvdHistory, hasRecurrentAscvdWithin2Yrs, hasDiabetes, hasCkd,
      isFamilialHypercholesterolemia, lipoproteinAMgDl, isStatinIntolerant,
      isHeartFailureEvaluated, lvefPercent, nyhaClass: 'II',
      currentArniDose, currentBetaBlockerDose, currentMraDose, currentSglt2iDose
    };

    const res = analyzeCardioStudio(inputs);

    // Render SCORE2 Gauge SVG
    const gaugeWrap = document.getElementById('cardioScore2GaugeWrap');
    if (gaugeWrap) {
      gaugeWrap.innerHTML = renderScore2GaugeSvg(res.score2Percentage);
    }

    // Render Waterfall SVG
    const waterfallWrap = document.getElementById('cardioLdlWaterfallWrap');
    if (waterfallWrap) {
      waterfallWrap.innerHTML = renderLdlWaterfallSvg(ldlCholesterolMmol, res.targetLdlMmol);
    }

    // Render Result Card
    const resultCard = document.getElementById('cardioResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:#ca8a04;"></i> Kết Quả Nguy Cơ Tim Mạch &amp; Lipid Pro</h3>
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

          <!-- Risk Stratification Summary Card -->
          <div style="background:rgba(202,138,4,0.08); border-left:4px solid ${res.riskColor}; padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân Tầng Nguy Cơ Tim Mạch 10 Năm:</div>
            <div style="font-size:1.05rem; font-weight:800; color:${res.riskColor}; margin-top:0.25rem;">
              ${escapeHtml(res.riskCategoryLabel)}
            </div>
            <div style="font-size:0.82rem; color:var(--color-text); margin-top:0.25rem; font-weight:600;">
              ${res.score2ModelUsed}: ~<strong>${res.score2Percentage}%</strong> | ASCVD 10 năm: ~<strong>${res.ascvd10YearPercentage}%</strong>
            </div>
          </div>

          <!-- Precision Lipid Target Box -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#10b981; text-transform:uppercase; margin-bottom:0.4rem;">
              Mục Tiêu Kiểm Soát Lipid (ESC 2021/2026):
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; font-size:11.5px;">
              <div>• <strong>Đích LDL-C:</strong> <span style="font-size:12.5px; color:#10b981; font-weight:900;">&lt; ${res.targetLdlMmol} mmol/L</span> (&lt; ${res.targetLdlMgDl} mg/dL)</div>
              <div>• <strong>Non-HDL-C:</strong> <strong>&lt; ${res.targetNonHdlMmol} mmol/L</strong></div>
              <div>• <strong>Hiện tại:</strong> <strong>${ldlCholesterolMmol} mmol/L</strong></div>
              <div>• <strong>Cần giảm thêm:</strong> <span style="color:${res.currentLdlGapMmol > 0 ? '#dc2626' : '#10b981'}; font-weight:800;">${res.currentLdlGapMmol > 0 ? `-${res.currentLdlGapMmol} mmol/L (-${res.currentLdlGapPercent}%)` : 'ĐÃ ĐẠT ĐÍCH'}</span></div>
            </div>
          </div>

          <!-- Stepwise Treatment Regimen -->
          <div style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.25); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#10b981; text-transform:uppercase; margin-bottom:0.35rem;">
              Phác Đồ Hạ Lipid Gợi Ý:
            </div>
            <div style="font-size:11.5px; line-height:1.45; color:var(--color-text);">
              ${escapeHtml(res.stepwiseRegimenRecommendation)}
            </div>
          </div>

          <!-- Heart Failure GDMT Status -->
          ${isHeartFailureEvaluated ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#7c3aed; text-transform:uppercase; margin-bottom:0.35rem;">
                Tối Ưu Hóa 4 Trụ Cột GDMT Suy Tim (EF ${lvefPercent}%):
              </div>
              <div style="font-size:12px; margin-bottom:0.3rem;">
                <strong>Mức độ tối ưu:</strong> <span class="dsp-badge ${res.gdmtPillarsCount === 4 ? 'dsp-badge--success' : (res.gdmtPillarsCount >= 2 ? 'dsp-badge--warning' : 'dsp-badge--danger')}">${res.gdmtPillarsCount}/4 Trụ Cột (${res.gdmtOptimizationScore}%)</span>
              </div>
              ${res.gdmtRecommendations.length > 0 ? `
                <ul style="margin:0; padding-left:1.2rem; font-size:11px; line-height:1.4; color:var(--color-text-muted);">
                  ${res.gdmtRecommendations.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
                </ul>
              ` : ''}
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

  document.querySelectorAll('.js-cardio-input').forEach(i => i.addEventListener('input', recalcCardio));

  // Initial Run
  recalcCardio();
}
