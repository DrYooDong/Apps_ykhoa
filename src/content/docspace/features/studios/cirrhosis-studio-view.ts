/**
 * DocSpace — Cirrhosis, Portal Hypertension & Advanced Hepatology Research Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for Cirrhosis Studio ($10,000 Level)
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeCirrhosisStudio, renderMeldGaugeSvg, renderAlbiMatrixSvg,
  CIRRHOSIS_PRESETS, CirrhosisInputs
} from './cirrhosis-studio';

export function renderCirrhosisPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioCirrhosis" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (20 Curated Research Presets) -->
      <div class="dsp-card" style="margin-bottom:1.25rem; padding:1rem 1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
          <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; display:flex; align-items:center; gap:0.4rem;">
            <i class="fa-solid fa-disease" style="color:#b45309;"></i> Kho 20 Ca Nghiên Cứu Gan Mật, Xơ Gan Mất Bù &amp; Tăng Áp Lực Tĩnh Mạch Cửa Mẫu:
          </div>
          <!-- Category Filter Pills -->
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-filter-btn is-active" data-filter="all" style="font-size:11px; padding:3px 10px; border-radius:12px;">Tất cả (20)</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-filter-btn" data-filter="decompensated_aclf" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#dc2626;">●</span> Mất Bù &amp; ACLF</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-filter-btn" data-filter="variceal_bleeding" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#ef4444;">●</span> Vỡ Giãn TMTQ (Baveno VII)</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-filter-btn" data-filter="ascites_sbp_hrs" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#ea580c;">●</span> Báng Bụng, SBP &amp; HRS</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-filter-btn" data-filter="encephalopathy_metabolic" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#7c3aed;">●</span> Hôn Mê Gan (HE)</button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-filter-btn" data-filter="fibrosis_screening" style="font-size:11px; padding:3px 10px; border-radius:12px;"><span style="color:#10b981;">●</span> Sàng Lọc FIB-4 &amp; ALBI</button>
          </div>
        </div>
        <div id="cirrhosisPresetsContainer" style="display:flex; flex-wrap:wrap; gap:0.45rem;">
          ${CIRRHOSIS_PRESETS.map(p => `
            <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-cirrhosis-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
              <strong>${escapeHtml(p.name)}</strong>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Top Visual Graphic: MELD-Na 2016 Gauge & ALBI vs Child-Pugh 2D Matrix SVG -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        
        <!-- MELD-Na 2016 Half-Circle Gauge Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-gauge-high" style="color:#b45309;"></i>
              <span>Đồng Hồ Tiên Lượng Tử Vong 3 Tháng MELD-Na 2016 (6 - 40 Điểm)</span>
            </div>
          </div>
          <div id="cirrhosisMeldGaugeWrap">
            ${renderMeldGaugeSvg(28)}
          </div>
        </div>

        <!-- ALBI vs Child-Pugh 2D Functional Matrix Card -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-table-cells" style="color:#10b981;"></i>
              <span>Ma Trận Dự Trữ Chức Năng Gan Khách Quan ALBI vs Child-Pugh</span>
            </div>
          </div>
          <div id="cirrhosisAlbiMatrixWrap">
            ${renderAlbiMatrixSvg('Grade 3', 'C')}
          </div>
        </div>

      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside Cirrhosis Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-subtab-btn is-active" data-cirrhosis-tab="child_meld" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-chart-pie"></i> 1. Child-Pugh &amp; MELD-Na / MELD 3.0
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-subtab-btn" data-cirrhosis-tab="variceal_baveno" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-hospital-user"></i> 2. Xuất Huyết TMTQ (Baveno VII) &amp; TIPS
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-subtab-btn" data-cirrhosis-tab="ascites_hrs" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-droplet"></i> 3. Dịch Báng, SBP, LVP &amp; HRS-AKI
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-subtab-btn" data-cirrhosis-tab="encephalopathy_mdf" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-brain"></i> 4. Hôn Mê Gan &amp; Viêm Gan Rượu (mDF)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-cirrhosis-subtab-btn" data-cirrhosis-tab="fibrosis_albi" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-dna"></i> 5. Sàng Lọc Xơ Hóa FIB-4 &amp; ALBI
            </button>
          </div>

          <!-- Sub-tab Panels -->
          <!-- 1. CHILD-PUGH & MELD-NA / MELD 3.0 -->
          <div class="js-cirrhosis-subtab-panel" id="cirrhosisSubtabChildMeld" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#b45309;">
                <i class="fa-solid fa-chart-pie"></i> Đánh Giá Phân Độ Child-Turcotte-Pugh, Điểm MELD-Na 2016 &amp; MELD 3.0 Thế Hệ Mới
              </h4>

              <!-- Row 1: Demographics & Core Biomarkers -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Tuổi &amp; Giới Tính</span>
                    <span class="dsp-spec-unit-badge">Age / Gender</span>
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1.2fr; gap:6px;">
                    <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisAge" value="56" min="18" max="100" style="padding:4px 8px; font-size:12px; font-weight:700;" />
                    <select class="dsp-select js-cirrhosis-input" id="cirrhosisGender" style="padding:4px 8px; font-size:11.5px; font-weight:700;">
                      <option value="male" selected>Nam giới</option>
                      <option value="female">Nữ (+1.33đ MELD 3.0)</option>
                    </select>
                  </div>
                  <div class="dsp-spec-range"><span>MELD 3.0:</span><span class="dsp-spec-ref">Hiệu chỉnh giới tính nữ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#b45309;"></i> Bilirubin Toàn Phần</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisBilirubin" data-step="-5">−</button>
                    <input class="dsp-spec-input js-cirrhosis-input" type="number" id="cirrhosisBilirubin" value="85" min="2" max="1000" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisBilirubin" data-step="5">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Child-Pugh:</span><span class="dsp-spec-ref">&lt;34: 1đ, 34-51: 2đ, &gt;51: 3đ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Albumin Huyết Thanh</span>
                    <span class="dsp-spec-unit-badge">g/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisAlbumin" data-step="-1">−</button>
                    <input class="dsp-spec-input js-cirrhosis-input" type="number" id="cirrhosisAlbumin" value="24" min="10" max="60" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisAlbumin" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Child-Pugh:</span><span class="dsp-spec-ref">&gt;35: 1đ, 28-35: 2đ, &lt;28: 3đ</span></div>
                </div>
              </div>

              <!-- Row 2: INR, Creatinine & Serum Sodium -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Chỉ Số Đông Máu (INR)</span>
                    <span class="dsp-spec-unit-badge">INR</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisInr" data-step="-0.1">−</button>
                    <input class="dsp-spec-input js-cirrhosis-input" type="number" id="cirrhosisInr" value="2.1" step="0.05" min="0.8" max="10" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisInr" data-step="0.1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>Child-Pugh:</span><span class="dsp-spec-ref">&lt;1.7: 1đ, 1.7-2.2: 2đ, &gt;2.2: 3đ</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Creatinine Huyết Thanh</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisCreatinine" data-step="-5">−</button>
                    <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisCreatinine" value="180" min="20" max="1500" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisCreatinine" data-step="5">+</button>
                  </div>
                  <div style="margin-top:4px;">
                    <label style="font-size:10.5px; display:flex; align-items:center; gap:3px; cursor:pointer;">
                      <input type="checkbox" id="cirrhosisIsDialysis" class="js-cirrhosis-input" />
                      <span>Lọc máu ≥2 lần tuần qua (MELD Cr = 4.0)</span>
                    </label>
                  </div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Natri Máu (Serum Na)</span>
                    <span class="dsp-spec-unit-badge">mmol/L</span>
                  </div>
                  <div class="dsp-spec-input-wrap">
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisNa" data-step="-1">−</button>
                    <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisNa" value="124" min="100" max="160" />
                    <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrhosisNa" data-step="1">+</button>
                  </div>
                  <div class="dsp-spec-range"><span>MELD-Na:</span><span class="dsp-spec-ref">Hiệu chỉnh Na 125 - 137</span></div>
                </div>
              </div>

              <!-- Row 3: Ascites & Hepatic Encephalopathy -->
              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Mức Độ Cổ Trướng (Ascites)</span>
                    <span class="dsp-spec-unit-badge">Child-Pugh</span>
                  </div>
                  <select id="cirrhosisAscites" class="dsp-select js-cirrhosis-input" style="font-size:12px; font-weight:700; padding:6px;">
                    <option value="none">Không có cổ trướng (1 điểm)</option>
                    <option value="mild">Nhẹ / Vừa kiểm soát bằng lợi tiểu (2 điểm)</option>
                    <option value="moderate_severe" selected>Nhiều / Căng tức / Kháng trị (3 điểm)</option>
                  </select>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Bệnh Não Gan (Hôn Mê Gan)</span>
                    <span class="dsp-spec-unit-badge">West Haven</span>
                  </div>
                  <select id="cirrhosisEncephalopathy" class="dsp-select js-cirrhosis-input" style="font-size:12px; font-weight:700; padding:6px;">
                    <option value="none">Không có bệnh não gan (1 điểm)</option>
                    <option value="grade_1_2" selected>Độ 1 - 2: Rối loạn giấc ngủ, run vỗ cánh (2 điểm)</option>
                    <option value="grade_3_4">Độ 3 - 4: Lú lẫn nặng, ngủ gà, hôn mê (3 điểm)</option>
                  </select>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Cân Nặng Bệnh Nhân</span>
                    <span class="dsp-spec-unit-badge">kg</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisWeight" value="65" min="30" max="200" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Bù Albumin SBP:</span><span class="dsp-spec-ref">1.5 g/kg N1, 1.0 g/kg N3</span></div>
                </div>
              </div>

            </div>
          </div>

          <!-- 2. VARICEAL BLEEDING (BAVENO VII) & PREEMPTIVE TIPS -->
          <div class="js-cirrhosis-subtab-panel" id="cirrhosisSubtabVariceal" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ef4444;">
                <i class="fa-solid fa-hospital-user"></i> Cấp Cứu Xuất Huyết Vỡ Giãn TMTQ (Baveno VII) &amp; Tiêu Chuẩn TIPS Dự Phòng Sớm
              </h4>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
                <div style="display:flex; flex-direction:column; gap:0.6rem;">
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="cirrhosisHasVaricealBleed" class="js-cirrhosis-input" checked />
                    <span>Đang có tình trạng <strong>Xuất huyết tiêu hóa do vỡ giãn TMTQ cấp tính</strong> (Kích hoạt Terlipressin + Ceftriaxone)</span>
                  </label>
                  <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="cirrhosisHasActiveBleedEndo" class="js-cirrhosis-input" checked />
                    <span>Nội soi quan sát thấy <strong>Máu đang phun/chảy hoạt động từ búi giãn</strong> (Active bleeding at endoscopy)</span>
                  </label>
                </div>
              </div>

              <!-- Preemptive TIPS Criteria Explanation Box -->
              <div style="background:rgba(124,58,237,0.06); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:0.85rem;">
                <div style="font-size:11.5px; font-weight:800; color:#7c3aed; text-transform:uppercase; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-bolt"></i> Tiêu Chuẩn Chỉ Định TIPS Dự Phòng Sớm (Preemptive TIPS trong vòng 72h theo Baveno VII):
                </div>
                <div style="font-size:12px; line-height:1.45;">
                  Bệnh nhân xuất huyết vỡ giãn TMTQ được chỉ định làm TIPS sớm (&lt; 72 giờ, tối ưu &lt; 24 giờ) khi:
                  <ul style="margin:0.25rem 0 0 1.2rem; padding:0;">
                    <li><strong>Xơ gan Child-Pugh C (10 - 13 điểm)</strong>, HOẶC</li>
                    <li><strong>Xơ gan Child-Pugh B (8 - 9 điểm) CÓ máu đang chảy hoạt động</strong> khi nội soi can thiệp.</li>
                  </ul>
                  <em>➔ Đã chứng minh giảm 50% nguy cơ tử vong 1 năm và ngăn ngừa tái xuất huyết vượt trội so với chỉ thắt EVL + Thuốc!</em>
                </div>
              </div>

            </div>
          </div>

          <!-- 3. ASCITES, SBP, LVP & HEPATORENAL SYNDROME (HRS) -->
          <div class="js-cirrhosis-subtab-panel" id="cirrhosisSubtabAscites" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ea580c;">
                <i class="fa-solid fa-droplet"></i> Quản Lý Dịch Báng, Chọc Tháo Thể Tích Lớn (LVP), Viêm Phúc Mạc SBP &amp; Hội Chứng Gan Thận
              </h4>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Thể Tích Dịch Báng Chọc Tháo</span>
                    <span class="dsp-spec-unit-badge">Lít</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisParacentesisLiters" value="8" min="0" max="20" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Bù Albumin 20%:</span><span class="dsp-spec-ref">&ge; 5 Lít: Bù 8g/L</span></div>
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Đạm Toàn Phần Dịch Báng</span>
                    <span class="dsp-spec-unit-badge">g/L</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisAsciticProtein" value="11" min="2" max="60" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Dự phòng SBP:</span><span class="dsp-spec-ref">&lt; 15 g/L: Nguy cơ cao SBP</span></div>
                </div>
              </div>

              <!-- SBP Checkbox -->
              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem;">
                <label style="font-size:12px; font-weight:700; display:flex; align-items:center; gap:6px; cursor:pointer;">
                  <input type="checkbox" id="cirrhosisIsSbpPmn" class="js-cirrhosis-input" checked />
                  <span>Xét nghiệm dịch báng có <strong>Bạch cầu đa nhân (PMN) ≥ 250 tế bào/mm³</strong> ➔ Chẩn đoán xác định <strong>Viêm Phúc Mạc Nhiễm Khuẩn Nguyên Phát (SBP)</strong></span>
                </label>
              </div>

            </div>
          </div>

          <!-- 4. HEPATIC ENCEPHALOPATHY & ALCOHOLIC HEPATITIS (MADDREY DF / LILLE) -->
          <div class="js-cirrhosis-subtab-panel" id="cirrhosisSubtabEncephalopathy" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#7c3aed;">
                <i class="fa-solid fa-brain"></i> Bệnh Não Gan (West Haven) &amp; Viêm Gan Do Rượu Nặng (Maddrey DF / Lille Model)
              </h4>

              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem;">
                <input type="checkbox" id="cirrhosisIsAlcoholicHepatitis" class="js-cirrhosis-input" checked style="width:16px; height:16px;" />
                <label for="cirrhosisIsAlcoholicHepatitis" style="font-weight:800; color:#7c3aed; cursor:pointer;">
                  Kích hoạt Đánh Giá Viêm Gan Do Rượu Nặng (Maddrey Discriminant Function &amp; Điểm Lille Ngày 7)
                </label>
              </div>

              <div id="cirrhosisAlcoholicBox" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Thời Gian Prothrombin (PT Bệnh Nhân)</span>
                    <span class="dsp-spec-unit-badge">giây</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisPtPatient" value="24" min="10" max="60" style="font-weight:700;" />
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Thời Gian Prothrombin (PT Chứng)</span>
                    <span class="dsp-spec-unit-badge">giây</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisPtControl" value="12" min="10" max="16" style="font-weight:700;" />
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Bilirubin Ngày Thứ 7 (Lille Model)</span>
                    <span class="dsp-spec-unit-badge">umol/L</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisDay7Bili" value="130" min="5" max="1000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>Đáp ứng Steroid:</span><span class="dsp-spec-ref">Lille &lt; 0.45</span></div>
                </div>
              </div>

            </div>
          </div>

          <!-- 5. NON-INVASIVE FIBROSIS SCREENING (FIB-4 & APRI) -->
          <div class="js-cirrhosis-subtab-panel" id="cirrhosisSubtabFibrosis" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#10b981;">
                <i class="fa-solid fa-dna"></i> Sàng Lọc Xơ Hóa Gan Không Xâm Lấn (FIB-4 Index &amp; APRI) &amp; ALBI Grade
              </h4>

              <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">AST (SGOT)</span>
                    <span class="dsp-spec-unit-badge">U/L</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisAst" value="95" min="5" max="2000" style="font-weight:700;" />
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">ALT (SGPT)</span>
                    <span class="dsp-spec-unit-badge">U/L</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisAlt" value="60" min="5" max="2000" style="font-weight:700;" />
                </div>

                <div class="dsp-spec-tile">
                  <div class="dsp-spec-header">
                    <span class="dsp-spec-label">Số Lượng Tiểu Cầu</span>
                    <span class="dsp-spec-unit-badge">G/L (k/uL)</span>
                  </div>
                  <input class="dsp-input js-cirrhosis-input" type="number" id="cirrhosisPlatelets" value="65" min="5" max="1000" style="font-weight:700;" />
                  <div class="dsp-spec-range"><span>FIB-4 Cutoffs:</span><span class="dsp-spec-ref">&lt;1.3: Thấp, &gt;2.67: Cao</span></div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Cirrhosis Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="cirrhosisResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountCirrhosisController(bindActionBtns: (container: HTMLElement) => void): void {
  // 1. Sub-tab navigation inside Cirrhosis Studio
  const cirrhosisSubtabBtns = document.querySelectorAll<HTMLElement>('.js-cirrhosis-subtab-btn');
  const cirrhosisSubtabPanels = document.querySelectorAll<HTMLElement>('.js-cirrhosis-subtab-panel');

  cirrhosisSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cirrhosisSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-cirrhosis-tab');

      cirrhosisSubtabPanels.forEach(p => (p.style.display = 'none'));
      if (target === 'child_meld') {
        const p = document.getElementById('cirrhosisSubtabChildMeld'); if (p) p.style.display = 'block';
      } else if (target === 'variceal_baveno') {
        const p = document.getElementById('cirrhosisSubtabVariceal'); if (p) p.style.display = 'block';
      } else if (target === 'ascites_hrs') {
        const p = document.getElementById('cirrhosisSubtabAscites'); if (p) p.style.display = 'block';
      } else if (target === 'encephalopathy_mdf') {
        const p = document.getElementById('cirrhosisSubtabEncephalopathy'); if (p) p.style.display = 'block';
      } else if (target === 'fibrosis_albi') {
        const p = document.getElementById('cirrhosisSubtabFibrosis'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Category filter for 20 Presets
  const filterBtns = document.querySelectorAll<HTMLElement>('.js-cirrhosis-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.getAttribute('data-filter');
      const presetBtns = document.querySelectorAll<HTMLElement>('.js-cirrhosis-preset-btn');
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
  document.querySelectorAll<HTMLElement>('.js-cirrhosis-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = CIRRHOSIS_PRESETS.find(p => p.id === id);
      if (preset) {
        const v = preset.values;
        if (v.age) (document.getElementById('cirrhosisAge') as HTMLInputElement).value = String(v.age);
        if (v.gender) (document.getElementById('cirrhosisGender') as HTMLSelectElement).value = v.gender;
        if (v.weightKg) (document.getElementById('cirrhosisWeight') as HTMLInputElement).value = String(v.weightKg);

        if (v.bilirubinUmol) (document.getElementById('cirrhosisBilirubin') as HTMLInputElement).value = String(v.bilirubinUmol);
        if (v.albuminGPerL) (document.getElementById('cirrhosisAlbumin') as HTMLInputElement).value = String(v.albuminGPerL);
        if (v.inr) (document.getElementById('cirrhosisInr') as HTMLInputElement).value = String(v.inr);
        if (v.serumCreatinineUmol) (document.getElementById('cirrhosisCreatinine') as HTMLInputElement).value = String(v.serumCreatinineUmol);
        if (v.serumNaMmol) (document.getElementById('cirrhosisNa') as HTMLInputElement).value = String(v.serumNaMmol);
        if (v.astUPerL) (document.getElementById('cirrhosisAst') as HTMLInputElement).value = String(v.astUPerL);
        if (v.altUPerL) (document.getElementById('cirrhosisAlt') as HTMLInputElement).value = String(v.altUPerL);
        if (v.plateletsK) (document.getElementById('cirrhosisPlatelets') as HTMLInputElement).value = String(v.plateletsK);

        if (v.ascites) (document.getElementById('cirrhosisAscites') as HTMLSelectElement).value = v.ascites;
        if (v.encephalopathy) (document.getElementById('cirrhosisEncephalopathy') as HTMLSelectElement).value = v.encephalopathy;
        (document.getElementById('cirrhosisIsDialysis') as HTMLInputElement).checked = !!v.isDialysisTwiceLastWeek;

        (document.getElementById('cirrhosisHasVaricealBleed') as HTMLInputElement).checked = !!v.hasActiveVaricealBleed;
        (document.getElementById('cirrhosisHasActiveBleedEndo') as HTMLInputElement).checked = !!v.hasActiveBleedingAtEndoscopy;

        (document.getElementById('cirrhosisParacentesisLiters') as HTMLInputElement).value = v.paracentesisLiters ? String(v.paracentesisLiters) : '0';
        (document.getElementById('cirrhosisIsSbpPmn') as HTMLInputElement).checked = !!v.isAsciticFluidPmnOver250;
        (document.getElementById('cirrhosisAsciticProtein') as HTMLInputElement).value = v.asciticFluidTotalProteinGPerL ? String(v.asciticFluidTotalProteinGPerL) : '15';

        (document.getElementById('cirrhosisIsAlcoholicHepatitis') as HTMLInputElement).checked = !!v.isAlcoholicHepatitis;
        (document.getElementById('cirrhosisPtPatient') as HTMLInputElement).value = v.ptPatientSec ? String(v.ptPatientSec) : '20';
        (document.getElementById('cirrhosisPtControl') as HTMLInputElement).value = v.ptControlSec ? String(v.ptControlSec) : '12';
        (document.getElementById('cirrhosisDay7Bili') as HTMLInputElement).value = v.day7BilirubinUmol ? String(v.day7BilirubinUmol) : '';

        // Auto switch tab to preset focus
        cirrhosisSubtabBtns.forEach(b => b.classList.remove('is-active'));
        cirrhosisSubtabPanels.forEach(p => (p.style.display = 'none'));
        if (preset.category === 'variceal_bleeding') {
          document.querySelector<HTMLElement>('[data-cirrhosis-tab="variceal_baveno"]')?.classList.add('is-active');
          const p = document.getElementById('cirrhosisSubtabVariceal'); if (p) p.style.display = 'block';
        } else if (preset.category === 'ascites_sbp_hrs') {
          document.querySelector<HTMLElement>('[data-cirrhosis-tab="ascites_hrs"]')?.classList.add('is-active');
          const p = document.getElementById('cirrhosisSubtabAscites'); if (p) p.style.display = 'block';
        } else if (preset.category === 'encephalopathy_metabolic') {
          document.querySelector<HTMLElement>('[data-cirrhosis-tab="encephalopathy_mdf"]')?.classList.add('is-active');
          const p = document.getElementById('cirrhosisSubtabEncephalopathy'); if (p) p.style.display = 'block';
        } else if (preset.category === 'fibrosis_screening') {
          document.querySelector<HTMLElement>('[data-cirrhosis-tab="fibrosis_albi"]')?.classList.add('is-active');
          const p = document.getElementById('cirrhosisSubtabFibrosis'); if (p) p.style.display = 'block';
        } else {
          document.querySelector<HTMLElement>('[data-cirrhosis-tab="child_meld"]')?.classList.add('is-active');
          const p = document.getElementById('cirrhosisSubtabChildMeld'); if (p) p.style.display = 'block';
        }

        recalcCirrhosis();
      }
    });
  });

  // 4. Master Calculation Function
  const recalcCirrhosis = () => {
    const age = parseFloat((document.getElementById('cirrhosisAge') as HTMLInputElement)?.value) || 56;
    const gender = ((document.getElementById('cirrhosisGender') as HTMLSelectElement)?.value || 'male') as any;
    const weightKg = parseFloat((document.getElementById('cirrhosisWeight') as HTMLInputElement)?.value) || 65;

    const bilirubinUmol = parseFloat((document.getElementById('cirrhosisBilirubin') as HTMLInputElement)?.value) || 85;
    const albuminGPerL = parseFloat((document.getElementById('cirrhosisAlbumin') as HTMLInputElement)?.value) || 24;
    const inr = parseFloat((document.getElementById('cirrhosisInr') as HTMLInputElement)?.value) || 2.1;
    const serumCreatinineUmol = parseFloat((document.getElementById('cirrhosisCreatinine') as HTMLInputElement)?.value) || 180;
    const serumNaMmol = parseFloat((document.getElementById('cirrhosisNa') as HTMLInputElement)?.value) || 124;
    const astUPerL = parseFloat((document.getElementById('cirrhosisAst') as HTMLInputElement)?.value) || 95;
    const altUPerL = parseFloat((document.getElementById('cirrhosisAlt') as HTMLInputElement)?.value) || 60;
    const plateletsK = parseFloat((document.getElementById('cirrhosisPlatelets') as HTMLInputElement)?.value) || 65;

    const ascites = ((document.getElementById('cirrhosisAscites') as HTMLSelectElement)?.value || 'moderate_severe') as any;
    const encephalopathy = ((document.getElementById('cirrhosisEncephalopathy') as HTMLSelectElement)?.value || 'grade_1_2') as any;
    const isDialysisTwiceLastWeek = (document.getElementById('cirrhosisIsDialysis') as HTMLInputElement)?.checked;

    const hasActiveVaricealBleed = (document.getElementById('cirrhosisHasVaricealBleed') as HTMLInputElement)?.checked;
    const hasActiveBleedingAtEndoscopy = (document.getElementById('cirrhosisHasActiveBleedEndo') as HTMLInputElement)?.checked;

    const paracentesisLiters = parseFloat((document.getElementById('cirrhosisParacentesisLiters') as HTMLInputElement)?.value) || 0;
    const isAsciticFluidPmnOver250 = (document.getElementById('cirrhosisIsSbpPmn') as HTMLInputElement)?.checked;
    const asciticFluidTotalProteinGPerL = parseFloat((document.getElementById('cirrhosisAsciticProtein') as HTMLInputElement)?.value) || 15;

    const isAlcoholicHepatitis = (document.getElementById('cirrhosisIsAlcoholicHepatitis') as HTMLInputElement)?.checked;
    const ptPatientSec = parseFloat((document.getElementById('cirrhosisPtPatient') as HTMLInputElement)?.value) || 20;
    const ptControlSec = parseFloat((document.getElementById('cirrhosisPtControl') as HTMLInputElement)?.value) || 12;
    const day7BilirubinUmol = parseFloat((document.getElementById('cirrhosisDay7Bili') as HTMLInputElement)?.value) || undefined;

    const inputs: CirrhosisInputs = {
      age, gender, weightKg,
      bilirubinUmol, albuminGPerL, inr, ptPatientSec, ptControlSec,
      serumCreatinineUmol, serumNaMmol, astUPerL, altUPerL, plateletsK,
      isDialysisTwiceLastWeek, ascites, encephalopathy,
      paracentesisLiters, isAsciticFluidPmnOver250, asciticFluidTotalProteinGPerL,
      hasActiveVaricealBleed, hasActiveBleedingAtEndoscopy,
      isAlcoholicHepatitis, day7BilirubinUmol
    };

    const res = analyzeCirrhosisStudio(inputs);

    // Render MELD Gauge SVG
    const meldGaugeWrap = document.getElementById('cirrhosisMeldGaugeWrap');
    if (meldGaugeWrap) {
      meldGaugeWrap.innerHTML = renderMeldGaugeSvg(res.meldNaScore);
    }

    // Render ALBI Matrix SVG
    const albiMatrixWrap = document.getElementById('cirrhosisAlbiMatrixWrap');
    if (albiMatrixWrap) {
      albiMatrixWrap.innerHTML = renderAlbiMatrixSvg(res.albiGrade, res.childPughClass);
    }

    // Render Result Card
    const resultCard = document.getElementById('cirrhosisResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:#b45309;"></i> Kết Quả Đánh Giá Gan Mật &amp; Xơ Gan Pro</h3>
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

          <!-- Child-Pugh & MELD Prognosis Summary Card -->
          <div style="background:rgba(180,83,9,0.08); border-left:4px solid ${res.childPughColor}; padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân Loại Giai Đoạn Xơ Gan:</div>
            <div style="font-size:1.1rem; font-weight:800; color:${res.childPughColor}; margin-top:0.25rem;">
              ${escapeHtml(res.childPughClassLabel)}
            </div>
            <div style="font-size:0.82rem; color:var(--color-text); margin-top:0.25rem; font-weight:600;">
              Sống còn: 1 năm ~ <strong>${res.childPugh1YearSurvival}</strong> | 2 năm ~ <strong>${res.childPugh2YearSurvival}</strong>
            </div>
            <div style="font-size:0.85rem; color:#b45309; margin-top:0.25rem; font-weight:800;">
              MELD-Na: ${res.meldNaScore} điểm (MELD 3.0: ${res.meld30Score}đ) ➔ ${res.meldMortality3Month}
            </div>
          </div>

          <!-- Objective Biomarker Reserve: ALBI Grade -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.35rem;">
              Dự Trữ Chức Năng Gan Khách Quan (ALBI Grade):
            </div>
            <div style="font-size:12px; line-height:1.45;">
              <div>• <strong>ALBI Score:</strong> <span style="font-weight:800; color:${res.albiColor};">${res.albiGrade} (${res.albiScore})</span></div>
              <div style="font-size:11px; color:var(--color-text-muted);">• Tiên lượng sống trung vị: ${escapeHtml(res.albiMedianSurvival)}</div>
            </div>
          </div>

          <!-- Fibrosis Sreening Scores: FIB-4 & APRI -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#10b981; text-transform:uppercase; margin-bottom:0.35rem;">
              Sàng Lọc Xơ Hóa Gan Không Xâm Lấn:
            </div>
            <div style="font-size:11.5px; line-height:1.45;">
              <div>• ${escapeHtml(res.fib4Interpretation)}</div>
              <div>• ${escapeHtml(res.apriInterpretation)}</div>
            </div>
          </div>

          <!-- Paracentesis Albumin Calculator Result -->
          ${res.lvpAlbuminRequiredGrams !== null ? `
            <div style="background:rgba(2,132,199,0.06); border:1px solid rgba(2,132,199,0.25); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase; margin-bottom:0.3rem;">
                Bù Albumin Sau Chọc Báng LVP (${paracentesisLiters} Lít):
              </div>
              <div style="font-size:12px; font-weight:700; color:var(--color-text);">
                Cần bù: <span style="color:#0284c7; font-size:13px;">${res.lvpAlbuminRequiredGrams}g Albumin</span> (tương đương <strong>${res.lvpAlbumin20PercentBottles} chai Albumin 20% 50mL</strong>)
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

  document.querySelectorAll('.js-cirrhosis-input').forEach(i => i.addEventListener('input', recalcCirrhosis));

  // Initial Run
  recalcCirrhosis();
}
