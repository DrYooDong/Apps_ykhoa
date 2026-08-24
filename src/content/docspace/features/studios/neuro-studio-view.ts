/**
 * DocSpace — Neuro-ICU & EEG Coma/Sedation Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings ($10,000 Level Clinical Suite)
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeNeuroStudio, renderEegPsdBandsSvg, renderEegTracesSvg,
  NEURO_PRESETS, NeuroInputs, NeuroPreset
} from './neuro-studio';

export function renderNeuroPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioNeuro" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (Curated Research Presets) -->
      <div class="dsp-case-vault" id="neuroCaseVault">
        <!-- Vault Header Toolbar -->
        <div class="dsp-case-vault-header">
          <div class="dsp-case-vault-title">
            <i class="fa-solid fa-brain" style="color:#7c3aed; font-size:1.15rem;"></i>
            <span>Kho Ca Nghiên Cứu Thần Kinh Neuro-ICU, Điện Não cEEG, Hôn Mê &amp; Sảng Mẫu</span>
            <span class="dsp-badge" style="background:rgba(124,58,237,0.12); color:#7c3aed; border:1px solid rgba(124,58,237,0.25); font-size:11px;">Chuẩn EBM</span>
          </div>

          <div class="dsp-case-vault-toolbar">
            <!-- Quick Search Input -->
            <div class="dsp-case-search-wrap">
              <i class="fa-solid fa-magnifying-glass dsp-case-search-icon"></i>
              <input type="text" id="neuroCaseSearchInput" class="dsp-case-search-input" placeholder="Tìm ca hôn mê, ngừng tuần hoàn, động kinh, sảng ICU, BSR..." />
            </div>

            <!-- View Switcher & Collapse -->
            <div style="display:flex; gap:4px; background:var(--color-bg); padding:2px; border-radius:8px; border:1px solid var(--color-border);">
              <button type="button" class="dsp-btn dsp-btn-sm js-neuro-view-toggle is-active" data-view="grid" title="Xem dạng lưới thẻ" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none;">
                <i class="fa-solid fa-table-cells-large"></i> Lưới Thẻ
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-neuro-view-toggle" data-view="chips" title="Xem dạng thu gọn" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none; background:transparent;">
                <i class="fa-solid fa-list-ul"></i> Thu Gọn
              </button>
            </div>

            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleNeuroVaultCollapse" title="Thu gọn / Mở rộng kho ca" style="padding:4px 8px; font-size:11px;">
              <i class="fa-solid fa-chevron-up" id="iconNeuroVaultCollapse"></i>
            </button>
          </div>
        </div>

        <!-- Vault Content Body -->
        <div id="neuroVaultBody">
          <!-- Category Filter Pills -->
          <div class="dsp-case-filters-bar">
            <button type="button" class="dsp-case-filter-pill js-neuro-filter-btn is-active" data-filter="all">Tất cả</button>
            <button type="button" class="dsp-case-filter-pill js-neuro-filter-btn" data-filter="coma_anoxia"><span style="color:#dc2626;">●</span> Hôn Mê Thiếu Oxy Não</button>
            <button type="button" class="dsp-case-filter-pill js-neuro-filter-btn" data-filter="status_epilepticus"><span style="color:#ea580c;">●</span> Động Kinh Liên Tục</button>
            <button type="button" class="dsp-case-filter-pill js-neuro-filter-btn" data-filter="icu_sedation"><span style="color:#7c3aed;">●</span> An Thần &amp; BSR</button>
            <button type="button" class="dsp-case-filter-pill js-neuro-filter-btn" data-filter="delirium_encephalopathy"><span style="color:#ca8a04;">●</span> Sảng ICU &amp; Bệnh Não</button>
            <button type="button" class="dsp-case-filter-pill js-neuro-filter-btn" data-filter="brain_death_prion"><span style="color:#64748b;">●</span> Chết Não / Đẳng Điện</button>
          </div>

          <!-- Cards Grid View -->
          <div id="neuroPresetsGrid" class="dsp-case-grid">
            ${NEURO_PRESETS.map((p, idx) => {
              const v = p.values;
              return `
                <div class="dsp-case-card js-neuro-preset-card js-neuro-preset-btn" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description + ' ' + p.badge).toLowerCase())}">
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
                      <span class="dsp-case-metric-tag" style="color:#7c3aed;">
                        GCS <strong>${v.gcsScore}</strong>
                      </span>
                      <span class="dsp-case-metric-tag">
                        RASS <strong>${v.rassScore > 0 ? `+${v.rassScore}` : v.rassScore}</strong>
                      </span>
                      <span class="dsp-case-metric-tag" style="color:#0284c7;">
                        EEG <strong>${v.dominantFrequencyHz} Hz</strong>
                      </span>
                      ${v.burstSuppressionRatioPercent ? `<span class="dsp-case-metric-tag" style="color:#dc2626;">BSR <strong>${v.burstSuppressionRatioPercent}%</strong></span>` : ''}
                    </div>

                    <div class="dsp-case-desc">${escapeHtml(p.description)}</div>
                  </div>

                  <div class="dsp-case-card-footer">
                    <span style="font-size:0.7rem; color:var(--color-text-muted);">
                      <i class="fa-solid fa-brain"></i> Neuro-ICU Case
                    </span>
                    <button type="button" class="dsp-case-load-btn">
                      <span>Nạp Ca Này</span> <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Collapsed Chips View -->
          <div id="neuroPresetsChips" class="dsp-case-chips" style="display:none;">
            ${NEURO_PRESETS.map(p => `
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-neuro-preset-btn js-neuro-preset-chip" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description).toLowerCase())}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
                <strong>${escapeHtml(p.name)}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Top Visual Graphical Display: 4-Channel cEEG Traces & 5-Band Spectral Density SVG -->
      <div style="display:grid; grid-template-columns:1.3fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
        
        <!-- Live cEEG Traces Container -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-bolt" style="color:#0284c7;"></i>
              <span>Dải Sóng Điện Não Đa Kênh Thời Gian Thực (Continuous EEG / NeuroKit2)</span>
            </div>
          </div>
          <div id="neuroEegTracesWrap" style="overflow-x:auto;">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- 5-Band Spectral Density Bar Chart Container -->
        <div class="dsp-card" style="padding:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
            <div style="font-weight:800; font-size:13px; color:var(--color-text); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-chart-simple" style="color:#7c3aed;"></i>
              <span>Phân Bố Mật Độ Phổ Năng Lượng (Delta - Gamma)</span>
            </div>
          </div>
          <div id="neuroEegPsdWrap">
            <!-- Rendered dynamically -->
          </div>
        </div>

      </div>

      <!-- Main Multi-Engine Diagnostic Workspace & Side Result Column -->
      <div class="dsp-two-col">
        <div class="dsp-col-main">

          <!-- Sub-tabs Navigation inside Neuro Studio -->
          <div style="display:flex; gap:0.4rem; margin-bottom:1rem; border-bottom:2px solid var(--color-border); padding-bottom:0.4rem; overflow-x:auto;">
            <button type="button" class="dsp-btn dsp-btn-sm js-neuro-subtab-btn is-active" data-neuro-tab="four_gcs_coma" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-hospital-user"></i> 1. Thang Điểm FOUR &amp; GCS
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-neuro-subtab-btn" data-neuro-tab="rass_sedation" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-bed"></i> 2. Mức Độ An Thần (RASS)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-neuro-subtab-btn" data-neuro-tab="cam_icu_delirium" style="border-radius:8px 8px 0 0;">
              <i class="fa-solid fa-triangle-exclamation"></i> 3. Tầm Soát Sảng (CAM-ICU)
            </button>
            <button type="button" class="dsp-btn dsp-btn-sm js-neuro-subtab-btn" data-neuro-tab="eeg_spectral_studio" style="border-radius:8px 8px 0 0; background:rgba(124,58,237,0.1); color:#7c3aed; border-color:rgba(124,58,237,0.3);">
              <i class="fa-solid fa-brain"></i> 4. Phổ Điện Não &amp; Động Kinh (cEEG)
            </button>
          </div>

          <!-- Sub-tab Panels -->

          <!-- 1. FOUR SCORE & GCS COMA ASSESSMENT -->
          <div class="js-neuro-subtab-panel" id="neuroSubtabFourComa" style="display:block;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#7c3aed;">
                <i class="fa-solid fa-hospital-user"></i> Thang Điểm Hôn Mê Toàn Diện FOUR Score (Full Outline of UnResponsiveness)
              </h4>
              <p style="font-size:11.5px; color:var(--color-text-muted); margin-bottom:1rem;">
                FOUR Score khắc phục nhược điểm của GCS trên bệnh nhân thở máy có đặt nội khí quản nhờ đánh giá trực tiếp phản xạ thân não và kiểu thở.
              </p>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-bottom:1rem;">
                
                <!-- Eye Response -->
                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
                  <label style="font-size:11.5px; font-weight:800; color:var(--color-primary); display:block; margin-bottom:0.35rem;">
                    1. Đáp Ứng Mắt (Eye Response - E):
                  </label>
                  <select id="fourEyeSelect" class="dsp-select js-neuro-input" style="font-size:11px; font-weight:700;">
                    <option value="4" selected>4 - Mở mắt tự nhiên, nhìn dõi theo (Tracking)</option>
                    <option value="3">3 - Mở mắt khi gọi to (Open to loud voice)</option>
                    <option value="2">2 - Mở mắt khi kích thích đau (Open to pain)</option>
                    <option value="1">1 - Nhắm mắt nhưng mở khi đau (Closed, grimace)</option>
                    <option value="0">0 - Mắt nhắm nghiền không mở khi đau</option>
                  </select>
                </div>

                <!-- Motor Response -->
                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
                  <label style="font-size:11.5px; font-weight:800; color:#10b981; display:block; margin-bottom:0.35rem;">
                    2. Đáp Ứng Vận Động (Motor Response - M):
                  </label>
                  <select id="fourMotorSelect" class="dsp-select js-neuro-input" style="font-size:11px; font-weight:700;">
                    <option value="4" selected>4 - Làm theo lệnh: Giơ ngón cái / Nắm tay / Chữ V</option>
                    <option value="3">3 - Gạt đúng vị trí đau (Localizing to pain)</option>
                    <option value="2">2 - Co tay tránh đau (Flexion response to pain)</option>
                    <option value="1">1 - Duỗi cứng mất não (Extensor posturing)</option>
                    <option value="0">0 - Hoàn toàn không đáp ứng vận động / Co giật</option>
                  </select>
                </div>

                <!-- Brainstem Reflexes -->
                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
                  <label style="font-size:11.5px; font-weight:800; color:#ea580c; display:block; margin-bottom:0.35rem;">
                    3. Phản Xạ Thân Não (Brainstem Reflexes - B):
                  </label>
                  <select id="fourBrainstemSelect" class="dsp-select js-neuro-input" style="font-size:11px; font-weight:700;">
                    <option value="4" selected>4 - Đồng tử &amp; Phản xạ giác mạc đều nguyên vẹn</option>
                    <option value="3">3 - Một đồng tử giãn cố định (Unilateral fixed)</option>
                    <option value="2">2 - Mất phản xạ đồng tử HOẶC giác mạc</option>
                    <option value="1">1 - Mất cả phản xạ đồng tử VÀ giác mạc</option>
                    <option value="0">0 - Mất toàn bộ phản xạ thân não &amp; phản xạ ho</option>
                  </select>
                </div>

                <!-- Respiration Pattern -->
                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
                  <label style="font-size:11.5px; font-weight:800; color:#7c3aed; display:block; margin-bottom:0.35rem;">
                    4. Kiểu Thở (Respiration Pattern - R):
                  </label>
                  <select id="fourRespSelect" class="dsp-select js-neuro-input" style="font-size:11px; font-weight:700;">
                    <option value="4" selected>4 - Không đặt NKQ, nhịp thở đều sinh lý</option>
                    <option value="3">3 - Không đặt NKQ, kiểu thở Cheyne-Stokes</option>
                    <option value="2">2 - Không đặt NKQ, thở không đều / Thở thất điều</option>
                    <option value="1">1 - Đặt NKQ, tự thở kích máy thở (Triggered MV)</option>
                    <option value="0">0 - Đặt NKQ, thở hoàn toàn theo máy (Apnea)</option>
                  </select>
                </div>

              </div>

              <!-- GCS Reference Row -->
              <div style="display:flex; align-items:center; gap:1rem; background:rgba(2,132,199,0.06); padding:0.75rem; border-radius:8px; border:1px solid rgba(2,132,199,0.2);">
                <label style="font-size:11.5px; font-weight:800; color:var(--color-primary);">Thang Điểm GCS Đối Chiếu (3 - 15):</label>
                <input type="number" id="neuroGcsInput" value="15" min="3" max="15" class="dsp-input js-neuro-input" style="width:80px; font-weight:800; font-size:13px; text-align:center;" />
                <span style="font-size:11px; color:var(--color-text-muted);">GCS &le; 8: Chỉ định đặt nội khí quản bảo vệ đường thở.</span>
              </div>

            </div>
          </div>

          <!-- 2. RASS SEDATION EVALUATION -->
          <div class="js-neuro-subtab-panel" id="neuroSubtabRassSedation" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#10b981;">
                <i class="fa-solid fa-bed"></i> Thang Điểm Kích Động - An Thần Richmond (RASS)
              </h4>

              <div style="margin-bottom:1rem;">
                <label style="font-size:12px; font-weight:800; color:var(--color-text); display:flex; justify-content:space-between; margin-bottom:0.4rem;">
                  <span>Điểm RASS Hiện Tại:</span>
                  <span id="rassValueDisplay" style="color:#10b981; font-weight:900; font-size:1.1rem;">0 (Tỉnh táo, điềm tĩnh)</span>
                </label>
                <input type="range" id="neuroRassSlider" min="-5" max="4" step="1" value="0" class="dsp-range-slider js-neuro-input" />
                <div style="font-size:10px; color:var(--color-text-muted); display:flex; justify-content:space-between; margin-top:4px;">
                  <span style="color:#dc2626;">-5 (Hôn mê sâu)</span>
                  <span style="color:#ca8a04;">-3 (An thần vừa)</span>
                  <span style="color:#10b981; font-weight:800;">-1 đến 0 (ĐÍCH ICU)</span>
                  <span style="color:#ea580c;">+2 (Kích động)</span>
                  <span style="color:#dc2626;">+4 (Hung hãn)</span>
                </div>
              </div>

              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; font-size:11.5px; line-height:1.5;">
                <div style="font-weight:800; color:var(--color-primary); margin-bottom:0.25rem;">🎯 Hướng Dẫn Điều Chỉnh An Thần Theo Mục Tiêu (Target-Controlled Sedation):</div>
                <div>• <strong>Đích chuẩn ICU đa số:</strong> RASS -1 đến 0 (Bệnh nhân điềm tĩnh, mở mắt khi gọi tiếng nói, hợp tác tốt).</div>
                <div>• <strong>Chỉ định an thần sâu (RASS -4 đến -5):</strong> ARDS nặng có chẹn thần kinh cơ (NMBAs), Tăng áp nội sọ kháng trị, Động kinh liên tục trơ.</div>
                <div>• <strong>Nghiệm pháp ngưng an thần hàng ngày (DSI):</strong> Thực hiện mỗi sáng cho mọi bệnh nhân có RASS &le; -3 để đánh giá khả năng rút ống.</div>
              </div>

            </div>
          </div>

          <!-- 3. CAM-ICU DELIRIUM SCREENING -->
          <div class="js-neuro-subtab-panel" id="neuroSubtabCamIcu" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#ca8a04;">
                <i class="fa-solid fa-triangle-exclamation"></i> Bộ Công Cụ Đánh Giá Sảng ICU (CAM-ICU Screening)
              </h4>

              <div style="display:flex; flex-direction:column; gap:0.65rem; margin-bottom:1rem;">
                
                <label style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; display:flex; align-items:flex-start; gap:8px; cursor:pointer;">
                  <input type="checkbox" id="camFeat1" class="js-neuro-input" style="margin-top:3px;" />
                  <div>
                    <strong style="font-size:12px; color:var(--color-primary);">Tiêu chuẩn 1: Khởi phát cấp tính hoặc tiến triển dao động (Acute Onset / Fluctuating Course)</strong>
                    <div style="font-size:11px; color:var(--color-text-muted);">Có thay đổi tri giác cấp tính so với ban đầu hoặc dao động trong 24 giờ qua (dựa trên điểm RASS/GCS)?</div>
                  </div>
                </label>

                <label style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; display:flex; align-items:flex-start; gap:8px; cursor:pointer;">
                  <input type="checkbox" id="camFeat2" class="js-neuro-input" style="margin-top:3px;" />
                  <div>
                    <strong style="font-size:12px; color:#dc2626;">Tiêu chuẩn 2: Giảm chú ý (Inattention - Test chữ cái SAVEAHAART)</strong>
                    <div style="font-size:11px; color:var(--color-text-muted);">Đọc 10 chữ cái (yêu cầu nắm tay khi nghe chữ 'A'): Có &ge; 3 lỗi (nắm sai hoặc không nắm khi đọc chữ 'A')?</div>
                  </div>
                </label>

                <label style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; display:flex; align-items:flex-start; gap:8px; cursor:pointer;">
                  <input type="checkbox" id="camFeat3" class="js-neuro-input" style="margin-top:3px;" />
                  <div>
                    <strong style="font-size:12px; color:#ea580c;">Tiêu chuẩn 3: Thay đổi mức độ ý thức (Altered Level of Consciousness)</strong>
                    <div style="font-size:11px; color:var(--color-text-muted);">Điểm RASS hiện tại khác 0 (nghĩa là RASS &gt; 0 hoặc RASS &lt; 0)?</div>
                  </div>
                </label>

                <label style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; display:flex; align-items:flex-start; gap:8px; cursor:pointer;">
                  <input type="checkbox" id="camFeat4" class="js-neuro-input" style="margin-top:3px;" />
                  <div>
                    <strong style="font-size:12px; color:#7c3aed;">Tiêu chuẩn 4: Tư duy mất tổ chức (Disorganized Thinking)</strong>
                    <div style="font-size:11px; color:var(--color-text-muted);">Trả lời sai các câu hỏi đơn giản (VD: Đá có nổi trên nước không?) hoặc không làm theo lệnh 2 bước?</div>
                  </div>
                </label>

              </div>

            </div>
          </div>

          <!-- 4. EEG SPECTRAL STUDIO & NCSE -->
          <div class="js-neuro-subtab-panel" id="neuroSubtabEegStudio" style="display:none;">
            <div class="dsp-card" style="padding:1.25rem;">
              <h4 style="margin:0 0 0.85rem 0; font-size:13px; font-weight:800; color:#7c3aed;">
                <i class="fa-solid fa-brain"></i> Mô Hình Điện Não Đồ cEEG &amp; Phân Tích Phổ Năng Lượng (NeuroKit2)
              </h4>

              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; background:var(--color-bg); padding:1rem; border-radius:10px; border:1px solid var(--color-border); margin-bottom:1rem;">
                
                <!-- Pattern Type -->
                <div>
                  <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:block; margin-bottom:0.25rem;">Mô Hình Sóng cEEG:</label>
                  <select id="eegPatternSelect" class="dsp-select js-neuro-input" style="font-weight:800; font-size:11.5px;">
                    <option value="normal_alpha" selected>1. Alpha thức tỉnh bình thường (10 Hz)</option>
                    <option value="spike_wave_seizure">2. Phóng điện Nhọn-Sóng Động kinh (Spike-Wave 3Hz)</option>
                    <option value="diffuse_delta_coma">3. Sóng chậm Delta Hôn mê sâu (< 2Hz)</option>
                    <option value="burst_suppression">4. Ức chế Bùng nổ (Burst-Suppression BSR)</option>
                    <option value="triphasic_waves">5. Sóng 3 pha Bệnh não gan (Triphasic 2Hz)</option>
                    <option value="isoelectric_flat">6. Điện não đẳng điện / Chết não (< 2uV)</option>
                  </select>
                </div>

                <!-- Dominant Frequency -->
                <div>
                  <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:flex; justify-content:space-between; margin-bottom:0.25rem;">
                    <span>Tần Số Chủ Đạo:</span>
                    <span id="dominantFreqDisplay" style="color:#0284c7; font-weight:800;">10.0 Hz</span>
                  </label>
                  <input type="range" id="eegFreqSlider" min="0.5" max="30" step="0.5" value="10" class="dsp-range-slider js-neuro-input" />
                </div>

                <!-- Burst Suppression Ratio (BSR) -->
                <div>
                  <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:flex; justify-content:space-between; margin-bottom:0.25rem;">
                    <span>Tỷ Lệ Ức Chế (BSR %):</span>
                    <span id="eegBsrDisplay" style="color:#7c3aed; font-weight:800;">0%</span>
                  </label>
                  <input type="range" id="eegBsrSlider" min="0" max="100" step="5" value="0" class="dsp-range-slider js-neuro-input" />
                </div>

              </div>

            </div>
          </div>

        </div>

        <!-- Neuro Results & Clinical Decision Column -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="neuroResultCard">
            <!-- Rendered dynamic via JS -->
          </div>
        </div>
      </div>

    </div>
  `;
}

export function mountNeuroController(bindActionBtns: (container: HTMLElement) => void): void {
  // 1. Sub-tab navigation inside Neuro Studio
  const neuroSubtabBtns = document.querySelectorAll<HTMLElement>('.js-neuro-subtab-btn');
  const neuroSubtabPanels = document.querySelectorAll<HTMLElement>('.js-neuro-subtab-panel');

  neuroSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      neuroSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const target = btn.getAttribute('data-neuro-tab');

      neuroSubtabPanels.forEach(p => (p.style.display = 'none'));
      if (target === 'four_gcs_coma') {
        const p = document.getElementById('neuroSubtabFourComa'); if (p) p.style.display = 'block';
      } else if (target === 'rass_sedation') {
        const p = document.getElementById('neuroSubtabRassSedation'); if (p) p.style.display = 'block';
      } else if (target === 'cam_icu_delirium') {
        const p = document.getElementById('neuroSubtabCamIcu'); if (p) p.style.display = 'block';
      } else if (target === 'eeg_spectral_studio') {
        const p = document.getElementById('neuroSubtabEegStudio'); if (p) p.style.display = 'block';
      }
    });
  });

  // 2. Real-time Search & Filter for Presets
  const neuroSearchInput = document.getElementById('neuroCaseSearchInput') as HTMLInputElement | null;
  const filterBtns = document.querySelectorAll<HTMLElement>('.js-neuro-filter-btn');
  let currentNeuroCatFilter = 'all';

  const applyNeuroFiltering = () => {
    const query = (neuroSearchInput?.value || '').trim().toLowerCase();
    const presetItems = document.querySelectorAll<HTMLElement>('.js-neuro-preset-btn');

    presetItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const searchStr = item.getAttribute('data-search') || '';

      const matchesCat = currentNeuroCatFilter === 'all' || cat === currentNeuroCatFilter;
      const matchesQuery = !query || searchStr.includes(query);

      if (matchesCat && matchesQuery) {
        if (item.classList.contains('js-neuro-preset-card')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'inline-flex';
        }
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (neuroSearchInput) {
    neuroSearchInput.addEventListener('input', applyNeuroFiltering);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentNeuroCatFilter = btn.getAttribute('data-filter') || 'all';
      applyNeuroFiltering();
    });
  });

  // View Switcher (Grid vs Chips)
  const viewToggleBtns = document.querySelectorAll<HTMLElement>('.js-neuro-view-toggle');
  const gridView = document.getElementById('neuroPresetsGrid');
  const chipsView = document.getElementById('neuroPresetsChips');

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

  // Collapse / Expand Vault
  const btnToggleCollapse = document.getElementById('btnToggleNeuroVaultCollapse');
  const vaultBody = document.getElementById('neuroVaultBody');
  const iconCollapse = document.getElementById('iconNeuroVaultCollapse');
  let isCollapsed = false;

  if (btnToggleCollapse && vaultBody && iconCollapse) {
    btnToggleCollapse.addEventListener('click', () => {
      isCollapsed = !isCollapsed;
      vaultBody.style.display = isCollapsed ? 'none' : 'block';
      iconCollapse.className = isCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
    });
  }

  // Load Preset Click Handler
  const presetButtons = document.querySelectorAll<HTMLElement>('.js-neuro-preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset-id');
      const preset = NEURO_PRESETS.find(p => p.id === presetId);
      if (!preset) return;

      const v = preset.values;

      const fourEye = document.getElementById('fourEyeSelect') as HTMLSelectElement | null;
      if (fourEye) fourEye.value = String(v.fourEyeResponse);

      const fourMotor = document.getElementById('fourMotorSelect') as HTMLSelectElement | null;
      if (fourMotor) fourMotor.value = String(v.fourMotorResponse);

      const fourBrainstem = document.getElementById('fourBrainstemSelect') as HTMLSelectElement | null;
      if (fourBrainstem) fourBrainstem.value = String(v.fourBrainstemReflexes);

      const fourResp = document.getElementById('fourRespSelect') as HTMLSelectElement | null;
      if (fourResp) fourResp.value = String(v.fourRespirationPattern);

      const gcsInp = document.getElementById('neuroGcsInput') as HTMLInputElement | null;
      if (gcsInp) gcsInp.value = String(v.gcsScore);

      const rassSlider = document.getElementById('neuroRassSlider') as HTMLInputElement | null;
      if (rassSlider) rassSlider.value = String(v.rassScore);

      const f1 = document.getElementById('camFeat1') as HTMLInputElement | null; if (f1) f1.checked = v.camIcuAcuteOnset;
      const f2 = document.getElementById('camFeat2') as HTMLInputElement | null; if (f2) f2.checked = v.camIcuInattention;
      const f3 = document.getElementById('camFeat3') as HTMLInputElement | null; if (f3) f3.checked = v.camIcuAlteredLoc;
      const f4 = document.getElementById('camFeat4') as HTMLInputElement | null; if (f4) f4.checked = v.camIcuDisorganizedThinking;

      const patSelect = document.getElementById('eegPatternSelect') as HTMLSelectElement | null;
      if (patSelect) patSelect.value = v.eegPatternType;

      const freqSlider = document.getElementById('eegFreqSlider') as HTMLInputElement | null;
      if (freqSlider) freqSlider.value = String(v.dominantFrequencyHz);

      const bsrSlider = document.getElementById('eegBsrSlider') as HTMLInputElement | null;
      if (bsrSlider) bsrSlider.value = String(v.burstSuppressionRatioPercent || 0);

      recalcNeuro();
    });
  });

  // Main Recalculate Neuro Function
  const recalcNeuro = () => {
    const fourEye = parseInt((document.getElementById('fourEyeSelect') as HTMLSelectElement)?.value, 10) || 4;
    const fourMotor = parseInt((document.getElementById('fourMotorSelect') as HTMLSelectElement)?.value, 10) || 4;
    const fourBrainstem = parseInt((document.getElementById('fourBrainstemSelect') as HTMLSelectElement)?.value, 10) || 4;
    const fourResp = parseInt((document.getElementById('fourRespSelect') as HTMLSelectElement)?.value, 10) || 4;
    const gcs = parseInt((document.getElementById('neuroGcsInput') as HTMLInputElement)?.value, 10) || 15;
    const rass = parseInt((document.getElementById('neuroRassSlider') as HTMLInputElement)?.value, 10) || 0;

    const rassDisp = document.getElementById('rassValueDisplay');
    if (rassDisp) {
      const label = rass > 0 ? `+${rass}` : String(rass);
      rassDisp.textContent = `${label} (${rass === 0 ? 'Tỉnh táo, điềm tĩnh' : (rass > 0 ? 'Kích động' : 'An thần')})`;
    }

    const f1 = (document.getElementById('camFeat1') as HTMLInputElement)?.checked || false;
    const f2 = (document.getElementById('camFeat2') as HTMLInputElement)?.checked || false;
    const f3 = (document.getElementById('camFeat3') as HTMLInputElement)?.checked || (rass !== 0);
    const f4 = (document.getElementById('camFeat4') as HTMLInputElement)?.checked || false;

    const eegPattern = ((document.getElementById('eegPatternSelect') as HTMLSelectElement)?.value || 'normal_alpha') as any;
    const freq = parseFloat((document.getElementById('eegFreqSlider') as HTMLInputElement)?.value) || 10;
    const bsr = parseFloat((document.getElementById('eegBsrSlider') as HTMLInputElement)?.value) || 0;

    const freqDisp = document.getElementById('dominantFreqDisplay'); if (freqDisp) freqDisp.textContent = `${freq.toFixed(1)} Hz`;
    const bsrDisp = document.getElementById('eegBsrDisplay'); if (bsrDisp) bsrDisp.textContent = `${bsr}%`;

    // Dynamic band weights based on pattern
    let delta = 20, theta = 20, alpha = 45, beta = 12, gamma = 3;
    if (eegPattern === 'diffuse_delta_coma') { delta = 80; theta = 12; alpha = 5; beta = 2; gamma = 1; }
    else if (eegPattern === 'spike_wave_seizure') { delta = 20; theta = 15; alpha = 10; beta = 38; gamma = 17; }
    else if (eegPattern === 'burst_suppression') { delta = 55; theta = 20; alpha = 15; beta = 8; gamma = 2; }
    else if (eegPattern === 'triphasic_waves') { delta = 45; theta = 38; alpha = 12; beta = 4; gamma = 1; }
    else if (eegPattern === 'isoelectric_flat') { delta = 95; theta = 3; alpha = 1; beta = 1; gamma = 0; }

    const inputs: NeuroInputs = {
      patientAge: 55,
      gender: 'male',
      isMechanicallyVentilated: fourResp <= 1,
      gcsScore: gcs,
      fourEyeResponse: fourEye,
      fourMotorResponse: fourMotor,
      fourBrainstemReflexes: fourBrainstem,
      fourRespirationPattern: fourResp,
      rassScore: rass,
      camIcuAcuteOnset: f1,
      camIcuInattention: f2,
      camIcuAlteredLoc: f3,
      camIcuDisorganizedThinking: f4,
      eegPatternType: eegPattern,
      dominantFrequencyHz: freq,
      deltaPowerPercent: delta,
      thetaPowerPercent: theta,
      alphaPowerPercent: alpha,
      betaPowerPercent: beta,
      gammaPowerPercent: gamma,
      burstSuppressionRatioPercent: bsr,
      bispectralIndexEstimated: eegPattern === 'isoelectric_flat' ? 0 : (eegPattern === 'burst_suppression' ? 20 : (delta > 50 ? 30 : 85)),
    };

    const res = analyzeNeuroStudio(inputs);

    // 1. Render Top SVGs
    const tracesWrap = document.getElementById('neuroEegTracesWrap');
    if (tracesWrap) tracesWrap.innerHTML = renderEegTracesSvg(inputs);

    const psdWrap = document.getElementById('neuroEegPsdWrap');
    if (psdWrap) psdWrap.innerHTML = renderEegPsdBandsSvg(inputs);

    // 2. Render Side Decision Result Card
    const resultCard = document.getElementById('neuroResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-brain" style="color:#7c3aed;"></i> Đánh Giá Tri Giác &amp; cEEG Pro</h3>
        </div>

        <div style="padding:1.25rem;">
          
          <!-- FOUR Score Hero Badge -->
          <div style="background:${res.fourBadgeColor}14; border-left:4px solid ${res.fourBadgeColor}; border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:${res.fourBadgeColor}; text-transform:uppercase; display:flex; justify-content:space-between; align-items:center;">
              <span>Thang Điểm FOUR Score (0 - 16)</span>
              <span class="dsp-badge" style="background:${res.fourBadgeColor}25; color:${res.fourBadgeColor}; font-size:12px;">${res.totalFourScore}/16 Điểm</span>
            </div>
            <div style="font-size:11.5px; font-weight:800; color:var(--color-text); margin-top:0.35rem;">
              ${escapeHtml(res.fourInterpretation)}
            </div>
          </div>

          <!-- RASS & CAM-ICU Mini Grid -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.65rem;">
              <div style="font-size:10.5px; color:var(--color-text-muted); font-weight:700;">Mức Độ An Thần:</div>
              <div style="font-weight:800; font-size:12px; color:${res.rassTargetStatus === 'at_target' ? '#10b981' : '#ea580c'};">
                RASS ${inputs.rassScore > 0 ? `+${inputs.rassScore}` : inputs.rassScore}
              </div>
              <div style="font-size:10px; color:var(--color-text-muted);">${escapeHtml(res.rassInterpretation.split(':')[0])}</div>
            </div>

            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.65rem;">
              <div style="font-size:10.5px; color:var(--color-text-muted); font-weight:700;">Sảng ICU (CAM-ICU):</div>
              <div style="font-weight:800; font-size:12px; color:${res.isDeliriumPositive ? '#dc2626' : '#10b981'};">
                ${res.isDeliriumPositive ? `DƯƠNG TÍNH (${res.deliriumSubtype.toUpperCase()})` : 'ÂM TÍNH'}
              </div>
              <div style="font-size:10px; color:var(--color-text-muted);">${res.isDeliriumPositive ? 'Có hội chứng sảng' : 'Không có sảng'}</div>
            </div>
          </div>

          <!-- EEG Spectral Metrics -->
          <div style="background:rgba(124,58,237,0.06); border:1px solid rgba(124,58,237,0.25); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#7c3aed; text-transform:uppercase; margin-bottom:0.35rem;">
              Mô Hình Phổ cEEG (NeuroKit2):
            </div>
            <div style="font-size:12px; font-weight:700; color:var(--color-text); margin-bottom:0.25rem;">
              ${escapeHtml(res.brainStateSummary)}
            </div>
            <div style="font-size:11px; color:var(--color-text-muted);">
              • Tần số chủ đạo: <strong>${inputs.dominantFrequencyHz} Hz</strong> | Tỷ số TAR (Theta/Alpha): <strong>${res.spectralRatioThetaAlpha}</strong>
            </div>
          </div>

          <!-- Immediate Actions & Sedation Advice -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.35rem;">
              Khuyến Cáo Xử Trí Khẩn Cấp (EBM):
            </div>
            <ul style="margin:0; padding-left:1.2rem; font-size:11px; color:var(--color-text); line-height:1.45;">
              ${res.immediateActions.concat(res.sedationAdjustments).map(a => `<li>${escapeHtml(a)}</li>`).join('')}
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

  document.querySelectorAll('.js-neuro-input').forEach(i => {
    i.addEventListener('input', recalcNeuro);
    i.addEventListener('change', recalcNeuro);
  });

  // Initial Run
  recalcNeuro();
}
