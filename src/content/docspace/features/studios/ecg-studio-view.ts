/**
 * DocSpace — ECG Research Studio Pro View & Controller
 * UI Panel HTML & Interactive Event Bindings for ECG Studio
 * Features: Visual Waveform Comparator, AI Multi-Label Classifier (% Confidence),
 * Digital Denoising Filters, Multi-Montage Paper, and Morphology Atlas.
 */

import { escapeHtml } from './studio-shared';
import {
  analyzeEcg, renderEcgAxisSvg, renderCoronaryArterySvg,
  render12LeadEcgPaper, renderEcgSideBySideSvg, renderEcgGhostOverlaySvg,
  renderEcgFocalLeadsWithCalloutsSvg, getPresetMorphologyComparison,
  computeAiDiagnosticProbabilities, computeEcgSignalQuality, computeHrvMetrics,
  renderPoincarePlotSvg, renderHrvPsdSvg,
  NORMAL_SINUS_BASELINE, EcgPaperSettings, DEFAULT_PAPER_SETTINGS,
  ECG_PRESETS, EcgInputs, EcgMontageType, EcgFilterType,
  EcgSignalQualityResult, HrvAnalysisResult
} from './ecg-studio';

export function renderEcgPanel(isActive: boolean): string {
  return `
    <div class="js-studio-panel" id="panelStudioEcg" style="display:${isActive ? 'block' : 'none'};">
      
      <!-- Quick Case Presets Bar (22 Curated Research Presets - Redesigned Clinical Vault) -->
      <div class="dsp-case-vault" id="ecgCaseVault">
        <!-- Vault Header Toolbar -->
        <div class="dsp-case-vault-header">
          <div class="dsp-case-vault-title">
            <i class="fa-solid fa-heart-pulse" style="color:#dc2626; font-size:1.15rem;"></i>
            <span>Kho Ca Lâm Sàng Mẫu Nghiên Cứu ECG Pro</span>
            <span class="dsp-badge" style="background:rgba(220,38,38,0.12); color:#dc2626; border:1px solid rgba(220,38,38,0.25); font-size:11px;">22 Presets Chuẩn EBM</span>
          </div>

          <div class="dsp-case-vault-toolbar">
            <!-- Quick Search Input -->
            <div class="dsp-case-search-wrap">
              <i class="fa-solid fa-magnifying-glass dsp-case-search-icon"></i>
              <input type="text" id="ecgCaseSearchInput" class="dsp-case-search-input" placeholder="Tìm theo tên ca, STEMI, OMI, VT, WPW, Brugada, Tăng K+..." />
            </div>

            <!-- View Switcher & Collapse -->
            <div style="display:flex; gap:4px; background:var(--color-bg); padding:2px; border-radius:8px; border:1px solid var(--color-border);">
              <button type="button" class="dsp-btn dsp-btn-sm js-ecg-view-toggle is-active" data-view="grid" title="Xem dạng lưới thẻ" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none;">
                <i class="fa-solid fa-table-cells-large"></i> Lưới Thẻ
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-ecg-view-toggle" data-view="chips" title="Xem dạng thu gọn" style="padding:3px 8px; font-size:11px; border-radius:6px; border:none; background:transparent;">
                <i class="fa-solid fa-list-ul"></i> Thu Gọn
              </button>
            </div>

            <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleEcgVaultCollapse" title="Thu gọn / Mở rộng kho ca" style="padding:4px 8px; font-size:11px;">
              <i class="fa-solid fa-chevron-up" id="iconEcgVaultCollapse"></i>
            </button>
          </div>
        </div>

        <!-- Vault Content Body -->
        <div id="ecgVaultBody">
          <!-- Category Filter Pills -->
          <div class="dsp-case-filters-bar">
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn is-active" data-filter="all">Tất cả (22)</button>
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn" data-filter="ischemia"><span style="color:#dc2626;">●</span> OMI / Thiếu Máu</button>
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn" data-filter="conduction"><span style="color:#7c3aed;">●</span> Dẫn Truyền / WPW</button>
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn" data-filter="arrhythmia"><span style="color:#ea580c;">●</span> Loạn Nhịp / VT</button>
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn" data-filter="electrolyte"><span style="color:#10b981;">●</span> Điện Giải &amp; Độc Chất</button>
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn" data-filter="hypertrophy"><span style="color:#0284c7;">●</span> Dày Buồng Tim</button>
            <button type="button" class="dsp-case-filter-pill js-ecg-filter-btn" data-filter="channelopathy"><span style="color:#0ea5e9;">●</span> Bệnh Kênh / Brugada</button>
          </div>

          <!-- Cards Grid View -->
          <div id="ecgPresetsGrid" class="dsp-case-grid">
            ${ECG_PRESETS.map((p, idx) => {
              const v = p.values;
              return `
                <div class="dsp-case-card js-ecg-preset-card js-ecg-preset-btn ${idx === 0 ? 'is-active' : ''}" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description + ' ' + p.badge).toLowerCase())}">
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
                      <span class="dsp-case-metric-tag" style="color:#dc2626;">
                        Tần số <strong>${v.heartRate} bpm</strong>
                      </span>
                      <span class="dsp-case-metric-tag">
                        Nhịp: <strong>${v.rhythmType.toUpperCase()}</strong>
                      </span>
                      ${v.qrsDuration ? `<span class="dsp-case-metric-tag" style="${v.qrsDuration > 120 ? 'color:#ea580c;' : ''}">QRS <strong>${v.qrsDuration}ms</strong></span>` : ''}
                      ${v.qtInterval ? `<span class="dsp-case-metric-tag">QT <strong>${v.qtInterval}ms</strong></span>` : ''}
                      ${v.prInterval ? `<span class="dsp-case-metric-tag">PR <strong>${v.prInterval}ms</strong></span>` : ''}
                    </div>

                    <div class="dsp-case-desc">${escapeHtml(p.description)}</div>
                  </div>

                  <div class="dsp-case-card-footer">
                    <span style="font-size:0.7rem; color:var(--color-text-muted);">
                      <i class="fa-solid fa-wave-square"></i> Đối Chiếu Ca Mẫu
                    </span>
                    <button type="button" class="dsp-case-load-btn">
                      <span>Nạp &amp; Đối Chiếu</span> <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Compact Chips View (Hidden by default) -->
          <div id="ecgPresetsChips" style="display:none; flex-wrap:wrap; gap:0.45rem; padding-top:0.25rem;">
            ${ECG_PRESETS.map(p => `
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-ecg-preset-btn js-ecg-preset-chip" data-preset-id="${p.id}" data-category="${p.category}" data-search="${escapeHtml((p.name + ' ' + p.description).toLowerCase())}" style="font-size:11.5px; border-radius:20px; padding:4px 12px; background:var(--color-bg); border-color:var(--color-border); display:inline-flex; align-items:center; gap:6px;">
                <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; flex-shrink:0;"></span>
                <strong>${escapeHtml(p.name)}</strong>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Top Canvas: ECG Visual Comparison & Paper Studio -->
      <div class="dsp-card" style="margin-bottom:1.25rem;">
        <div class="dsp-card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
          <div>
            <h2 class="dsp-card-title" style="font-size:1.1rem; margin-bottom:0.15rem;">
              <i class="fa-solid fa-code-compare" style="color:#dc2626;"></i> Phòng Giả Lập &amp; Đối Chiếu Hình Ảnh ECG Chuẩn
            </h2>
            <span style="font-size:0.8rem; color:var(--color-text-muted);">
              Tích hợp AI Phân Loại Đa Nhãn (torch_ecg), Bộ Lọc Khử Nhiễu Thời Gian Thực &amp; 5 Layout Đạo Trình Quốc Tế
            </span>
          </div>

          <!-- Paper Settings & Display Toolbar -->
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">

            <!-- === MONTAGE SELECTOR === -->
            <div style="display:flex; align-items:center; gap:0.3rem;">
              <span style="font-size:10px; font-weight:700; color:var(--color-primary); white-space:nowrap;"><i class="fa-solid fa-layer-group"></i> Layout:</span>
              <select id="ecgMontageSelect" class="dsp-select" style="padding:3px 7px; font-size:11px; font-weight:800; height:28px; border-color:var(--color-primary);">
                <option value="cabrera" selected>📐 Cabrera 4x3 + Rhythm</option>
                <option value="standard6x2">📊 Standard 6x2 (Chi | Ngực)</option>
                <option value="continuous12x1">📈 12x1 Continuous Strip</option>
                <option value="extended_rv_posterior">🫀 Mở Rộng: V7-V9 &amp; V3R-V5R</option>
                <option value="lewis_lead">⚡ Lewis Bipolar (Phóng Đại Sóng P)</option>
              </select>
            </div>

            <!-- === FILTER SELECTOR === -->
            <div style="display:flex; align-items:center; gap:0.3rem;">
              <span style="font-size:10px; font-weight:700; color:#10b981; white-space:nowrap;"><i class="fa-solid fa-filter"></i> Lọc:</span>
              <select id="ecgFilterSelect" class="dsp-select" style="padding:3px 7px; font-size:11px; font-weight:800; height:28px; border-color:#10b981;">
                <option value="standard" selected>🛡️ 0.5-35Hz + Notch (Chuẩn Y Tế)</option>
                <option value="raw">⚡ RAW (Tín Hiệu Thô - Không Lọc)</option>
                <option value="hp05">🌊 0.5 Hz HP (Lọc Trôi Baseline)</option>
                <option value="notch50">🔌 50 Hz Notch (Lọc Điện Lưới AC)</option>
                <option value="lp35">💪 35 Hz LP (Lọc Nhiễu Co Cơ)</option>
              </select>
            </div>

            <!-- === SPEED SETTING === -->
            <div style="display:flex; align-items:center; gap:0.3rem;">
              <span style="font-size:10px; font-weight:700; color:var(--color-text-muted); white-space:nowrap;">Tốc độ:</span>
              <div class="dsp-btn-group" style="display:flex; background:var(--color-bg); border:1px solid var(--color-border); border-radius:6px; overflow:hidden;">
                <button type="button" class="dsp-paper-speed-btn" data-speed="12.5" style="padding:3px 8px; font-size:10.5px; font-weight:700; border:none; background:transparent; cursor:pointer; color:var(--color-text-muted);">12.5</button>
                <button type="button" class="dsp-paper-speed-btn is-active" data-speed="25" style="padding:3px 8px; font-size:10.5px; font-weight:700; border:none; background:var(--color-primary); cursor:pointer; color:#fff; border-radius:4px;">25</button>
                <button type="button" class="dsp-paper-speed-btn" data-speed="50" style="padding:3px 8px; font-size:10.5px; font-weight:700; border:none; background:transparent; cursor:pointer; color:var(--color-text-muted);">50</button>
              </div>
              <span style="font-size:9.5px; color:var(--color-text-muted);">mm/s</span>
            </div>

            <!-- === GAIN SETTING === -->
            <div style="display:flex; align-items:center; gap:0.3rem;">
              <span style="font-size:10px; font-weight:700; color:var(--color-text-muted); white-space:nowrap;">Gain:</span>
              <div class="dsp-btn-group" style="display:flex; background:var(--color-bg); border:1px solid var(--color-border); border-radius:6px; overflow:hidden;">
                <button type="button" class="dsp-paper-gain-btn" data-gain="5" style="padding:3px 8px; font-size:10.5px; font-weight:700; border:none; background:transparent; cursor:pointer; color:var(--color-text-muted);">5</button>
                <button type="button" class="dsp-paper-gain-btn is-active" data-gain="10" style="padding:3px 8px; font-size:10.5px; font-weight:700; border:none; background:var(--color-primary); cursor:pointer; color:#fff; border-radius:4px;">10</button>
                <button type="button" class="dsp-paper-gain-btn" data-gain="20" style="padding:3px 8px; font-size:10.5px; font-weight:700; border:none; background:transparent; cursor:pointer; color:var(--color-text-muted);">20</button>
              </div>
              <span style="font-size:9.5px; color:var(--color-text-muted);">mm/mV</span>
            </div>

            <!-- === THEME SWITCHER === -->
            <div style="display:flex; align-items:center; gap:0.3rem;">
              <select id="ecgThemeSelect" class="dsp-select" style="padding:3px 7px; font-size:10.5px; font-weight:700; height:28px;">
                <option value="paper" selected>📜 Giấy ECG</option>
                <option value="neon">⚡ Neon Monitor</option>
                <option value="dark">🌑 Dark Lab</option>
              </select>
            </div>

            <!-- Caliper Toggle -->
            <button type="button" id="btnToggleCaliper" class="dsp-btn dsp-btn-sm dsp-btn-ghost" style="border-radius:6px; font-size:11.5px; padding:4px 10px; font-weight:700;">
              <i class="fa-solid fa-ruler-combined" style="color:var(--color-primary);"></i> <span id="caliperToggleLabel">Thước Kẹp</span>
            </button>
          </div>
        </div>

        <!-- 🌟 DEDICATED VISUAL MODE SWITCHER TOOLBAR -->
        <div style="background:var(--color-surface); padding:0.5rem 0.85rem; border-bottom:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
            <div style="font-size:11.5px; font-weight:800; color:var(--color-text-muted); display:flex; align-items:center; gap:0.35rem;">
              <i class="fa-solid fa-eye" style="color:var(--color-primary);"></i> Chế Độ Hiển Thị:
            </div>
            <div class="dsp-btn-group" style="display:flex; background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:2px; gap:2px; flex-wrap:wrap;">
              <button type="button" class="dsp-btn dsp-btn-sm js-ecg-canvas-mode-btn is-active" data-mode="12lead" style="padding:4px 10px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:var(--color-primary); color:#fff;">
                <i class="fa-solid fa-table-cells"></i> 12 Chuyển Đạo Chuẩn
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-ecg-canvas-mode-btn" data-mode="side_by_side" style="padding:4px 10px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:transparent; color:var(--color-text-muted);">
                <i class="fa-solid fa-columns"></i> Đối Sánh Song Song (VS)
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-ecg-canvas-mode-btn" data-mode="ghost_overlay" style="padding:4px 10px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:transparent; color:var(--color-text-muted);">
                <i class="fa-solid fa-layer-group"></i> Xếp Chồng Hình Thái (Ghost)
              </button>
              <button type="button" class="dsp-btn dsp-btn-sm js-ecg-canvas-mode-btn" data-mode="focal_leads" style="padding:4px 10px; font-size:11px; font-weight:700; border-radius:6px; border:none; background:transparent; color:var(--color-text-muted);">
                <i class="fa-solid fa-crosshairs"></i> Soi Trọng Điểm
              </button>
            </div>
          </div>

          <!-- SQI Quality Badge -->
          <div id="ecgSqiQualityBadge">
            <span class="dsp-badge" style="background:rgba(16,185,129,0.12); color:#10b981; border:1px solid rgba(16,185,129,0.3); font-size:11px; font-weight:800;">
              🟢 SQI: 94% (Rất Tốt)
            </span>
          </div>
        </div>

        <!-- ECG Canvas SVG Container -->
        <div id="ecgGridCanvasWrap" style="padding:0.75rem; overflow-x:auto; background:var(--color-bg); position:relative;">
          ${render12LeadEcgPaper({ heartRate: 110, rhythmType: 'sinus', lead1Net: 10, avfNet: -8, prInterval: 145, qrsDuration: 95, qtInterval: 390, stV1: 3, stV2: 5.5, stV3: 6, stV4: 4.5, tWaveType: 'hyperacute' }, DEFAULT_PAPER_SETTINGS, 'paper', 'cabrera', 'standard')}
        </div>

        <!-- Digital Caliper Tool Drawer (Interactive) -->
        <div id="ecgCaliperBox" style="display:none; background:var(--color-surface); border-top:1px solid var(--color-border); padding:1rem 1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:0.75rem;">
            <div style="font-size:12px; font-weight:800; color:var(--color-primary); display:flex; align-items:center; gap:0.4rem;">
              <i class="fa-solid fa-ruler"></i> Bảng Điều Khiển Thước Kẹp Số Hóa &amp; Hiệu Chỉnh Khoảng Đo:
            </div>
            <!-- Quick Measure Presets -->
            <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-caliper-preset" data-ms="160" data-mv="0" style="font-size:11px; padding:3px 8px; border-radius:4px;">Đo Khoảng PR (160ms)</button>
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-caliper-preset" data-ms="90" data-mv="1.5" style="font-size:11px; padding:3px 8px; border-radius:4px;">Đo Độ Rộng QRS (90ms)</button>
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-caliper-preset" data-ms="400" data-mv="0" style="font-size:11px; padding:3px 8px; border-radius:4px;">Đo Khoảng QT (400ms)</button>
              <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-caliper-preset" data-ms="80" data-mv="3.0" style="font-size:11px; padding:3px 8px; border-radius:4px;">Đo ST Chênh (3.0mm)</button>
            </div>
          </div>

          <div style="grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem; align-items:center; display:grid;">
            <div>
              <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:flex; justify-content:space-between; margin-bottom:0.25rem;">
                <span>Khoảng Thời Gian Đo (&Delta;t):</span>
                <span id="caliperMsDisplay" style="color:var(--color-primary); font-weight:800;">400 ms (10.0 ô nhỏ)</span>
              </label>
              <input type="range" id="caliperRangeSlider" min="20" max="1200" step="10" value="400" class="dsp-range-slider" />
            </div>

            <div>
              <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted); display:flex; justify-content:space-between; margin-bottom:0.25rem;">
                <span>Biên Độ / Độ Chênh Điện Thế (&Delta;V):</span>
                <span id="caliperMvDisplay" style="color:#ef4444; font-weight:800;">0.0 mV (0.0 mm)</span>
              </label>
              <input type="range" id="caliperMvSlider" min="-10" max="30" step="0.5" value="0" class="dsp-range-slider" />
            </div>

            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.6rem 0.85rem; font-size:11.5px; display:flex; justify-content:space-around;">
              <div style="text-align:center;">
                <div style="font-size:10px; color:var(--color-text-muted); font-weight:700;">TẦN SỐ TỨC THỜI:</div>
                <div id="caliperInstantHr" style="font-size:13px; font-weight:800; color:var(--color-text);">150 l/p</div>
              </div>
              <div style="border-left:1px solid var(--color-border); margin:0 0.5rem;"></div>
              <div style="text-align:center;">
                <div style="font-size:10px; color:var(--color-text-muted); font-weight:700;">SỐ Ô LỚN / Ô NHỎ:</div>
                <div id="caliperBoxesCount" style="font-size:13px; font-weight:800; color:var(--color-primary);">2.0 lớn (10 nhỏ)</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 🌟 MORPHOLOGICAL COMPARISON ATLAS CARD (Directly below ECG Paper) -->
        <div id="ecgMorphologyCard" style="background:var(--color-surface); border-top:1px solid var(--color-border); padding:1rem 1.25rem;">
          <!-- Dynamically populated by recalcEcg() -->
        </div>
      </div>

      <!-- Main Diagnostic Workspace (Two-Column Layout) -->
      <div class="dsp-two-col">
        
        <!-- Main Column: Multi-Engine Diagnostic Tabs -->
        <div class="dsp-col-main">
          
          <!-- Sub-Engine Tab Navigation -->
          <div class="dsp-proto-tab-switcher" style="margin-bottom:1rem; flex-wrap:wrap; gap:0.35rem;">
            <button type="button" class="dsp-proto-tab-btn is-active js-ecg-subtab-btn" data-ecg-tab="core_inputs">
              <i class="fa-solid fa-sliders" style="color:var(--color-primary);"></i> Thông Số Cơ Bản
            </button>
            <button type="button" class="dsp-proto-tab-btn js-ecg-subtab-btn" data-ecg-tab="omi_coronary">
              <i class="fa-solid fa-heart-crack" style="color:#dc2626;"></i> OMI &amp; Bản Đồ Mạch Vành
            </button>
            <button type="button" class="dsp-proto-tab-btn js-ecg-subtab-btn" data-ecg-tab="axis_cabrera">
              <i class="fa-solid fa-compass" style="color:#10b981;"></i> Trục Điện Tim 360°
            </button>
            <button type="button" class="dsp-proto-tab-btn js-ecg-subtab-btn" data-ecg-tab="arrhythmia_wct">
              <i class="fa-solid fa-bolt-lightning" style="color:#ea580c;"></i> Loạn Nhịp &amp; WPW
            </button>
            <button type="button" class="dsp-proto-tab-btn js-ecg-subtab-btn" data-ecg-tab="hypertrophy_lvh">
              <i class="fa-solid fa-lungs" style="color:#0284c7;"></i> Dày Buồng Tim
            </button>
            <button type="button" class="dsp-proto-tab-btn js-ecg-subtab-btn" data-ecg-tab="metabolic_toxic">
              <i class="fa-solid fa-flask-vial" style="color:#7c3aed;"></i> Điện Giải &amp; Độc Chất
            </button>
            <button type="button" class="dsp-proto-tab-btn js-ecg-subtab-btn" data-ecg-tab="hrv_sqi">
              <i class="fa-solid fa-wave-square" style="color:#0ea5e9;"></i> HRV &amp; Chất Lượng Bản Ghi
            </button>
          </div>

          <!-- 1. SUB-TAB: THÔNG SỐ CƠ BẢN (CORE INPUTS) -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabCoreInputs" style="display:block;">
            <div class="dsp-card">
              <div class="dsp-card-header">
                <h3 class="dsp-card-title"><i class="fa-solid fa-heart-pulse" style="color:#dc2626;"></i> Thông Số Nhịp, Dẫn Truyền &amp; Trục Chi</h3>
              </div>
              <div style="padding:1.25rem;">
                
                <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label"><i class="fa-solid fa-heart-pulse" style="color:#dc2626;"></i> Tần Số Tim</span>
                      <span class="dsp-spec-unit-badge">lần/phút</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgHr" data-step="-5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgHr" value="110" min="20" max="300" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgHr" data-step="5">+</button>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Chuẩn sinh lý:</span>
                      <span class="dsp-spec-ref">60 – 100</span>
                    </div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Dạng Nhịp Cơ Bản</span>
                      <span class="dsp-spec-unit-badge">Rhythm</span>
                    </div>
                    <div style="padding:0.25rem 0;">
                      <select class="dsp-select js-ecg-input" id="ecgRhythm" style="font-weight:700;">
                        <option value="sinus" selected>Nhịp xoang (Sinus Rhythm)</option>
                        <option value="afib">Rung nhĩ (Atrial Fibrillation)</option>
                        <option value="aflutter">Cuồng nhĩ (Atrial Flutter)</option>
                        <option value="svt">Nhịp nhanh trên thất (SVT / AVNRT)</option>
                        <option value="vt">Nhịp nhanh thất (VT)</option>
                        <option value="pacing">Nhịp máy tạo nhịp (Paced)</option>
                        <option value="junctional">Nhịp thoát bộ nối (Junctional)</option>
                      </select>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Hình thái P &amp; RR:</span>
                      <span class="dsp-spec-ref">Đều đặn</span>
                    </div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Khoảng QT Đo Được</span>
                      <span class="dsp-spec-unit-badge">ms</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgQt" data-step="-10">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgQt" value="390" min="200" max="800" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgQt" data-step="10">+</button>
                    </div>
                    <div class="dsp-spec-range">
                      <span>QTc an toàn:</span>
                      <span class="dsp-spec-ref">&lt; 440 (Nam) / &lt; 460 (Nữ)</span>
                    </div>
                  </div>
                </div>

                <!-- Vector Leads Net -->
                <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Biên độ Chuyển đạo DI (R − S)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgLead1" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgLead1" value="10" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgLead1" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Góc 0° trục hoành:</span>
                      <span class="dsp-spec-ref">DI &gt; 0: Hướng trái</span>
                    </div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Biên độ Chuyển đạo aVF (R − S)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgAvf" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgAvf" value="-8" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgAvf" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Góc +90° trục tung:</span>
                      <span class="dsp-spec-ref">aVF &gt; 0: Hướng dưới</span>
                    </div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Giới Tính Bệnh Nhân</span>
                      <span class="dsp-spec-unit-badge">Gender</span>
                    </div>
                    <div style="padding:0.25rem 0;">
                      <select class="dsp-select js-ecg-input" id="ecgGender" style="font-weight:700;">
                        <option value="male" selected>Nam giới (Cutoff Cornell &gt; 28mm)</option>
                        <option value="female">Nữ giới (Cutoff Cornell &gt; 20mm)</option>
                      </select>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Tiêu chuẩn QTc:</span>
                      <span class="dsp-spec-ref">Nữ dài hơn nam ~10ms</span>
                    </div>
                  </div>
                </div>

                <div class="dsp-spec-grid">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Khoảng PR</span>
                      <span class="dsp-spec-unit-badge">ms</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgPr" data-step="-10">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgPr" value="145" min="60" max="400" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgPr" data-step="10">+</button>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Chuẩn sinh lý:</span>
                      <span class="dsp-spec-ref">120 – 200 ms</span>
                    </div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Độ rộng QRS</span>
                      <span class="dsp-spec-unit-badge">ms</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgQrs" data-step="-5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgQrs" value="95" min="40" max="250" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgQrs" data-step="5">+</button>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Bình thường:</span>
                      <span class="dsp-spec-ref">&lt; 120 ms</span>
                    </div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">Hình Thái Sóng T</span>
                      <span class="dsp-spec-unit-badge">T-Wave</span>
                    </div>
                    <div style="padding:0.25rem 0;">
                      <select class="dsp-select js-ecg-input" id="ecgTWaveType" style="font-weight:700;">
                        <option value="normal">Bình thường (Dương, đồng trục)</option>
                        <option value="hyperacute" selected>Sóng T khổng lồ tối cấp (Hyperacute)</option>
                        <option value="peaked">T cao nhọn đáy hẹp (Tăng Kali)</option>
                        <option value="inverted">T âm sâu đối xứng (Wellens B / Thiếu máu)</option>
                        <option value="biphasic_wellens">T hai pha (+/-) (Wellens A)</option>
                        <option value="de_winter">De Winter (ST chênh xuống + T cao nhọn)</option>
                        <option value="flattened">T dẹt / Âm nhẹ (Hạ Kali)</option>
                      </select>
                    </div>
                    <div class="dsp-spec-range">
                      <span>Tái cực thất:</span>
                      <span class="dsp-spec-ref">Đánh giá thiếu máu cơ tim</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- 2. SUB-TAB: OMI & BẢN ĐỒ MẠCH VÀNH (CORONARY MAP) -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabOmiCoronary" style="display:none;">
            <div class="dsp-card">
              <div class="dsp-card-header">
                <h3 class="dsp-card-title"><i class="fa-solid fa-heart-crack" style="color:#dc2626;"></i> Mức Độ ST Chênh Lên / Chênh Xuống (mm)</h3>
              </div>
              <div style="padding:1.25rem;">
                <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">ST V1 - V2 (Vách)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStV1V2" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgStV1V2" value="5.5" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStV1V2" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range"><span>Ngưỡng STEMI nam:</span><span class="dsp-spec-ref">&ge; 2.0 mm</span></div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">ST V3 - V4 (Trước mỏm)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStV3V4" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgStV3V4" value="5.0" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStV3V4" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range"><span>Ngưỡng STEMI:</span><span class="dsp-spec-ref">&ge; 1.5 mm</span></div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">ST DI, aVL, V5, V6 (Bên)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStLateral" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgStLateral" value="2.5" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStLateral" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range"><span>Ngưỡng STEMI bên:</span><span class="dsp-spec-ref">&ge; 1.0 mm</span></div>
                  </div>
                </div>

                <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">ST DII, DIII, aVF (Dưới)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStInferior" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgStInferior" value="-2.5" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStInferior" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range"><span>Soi gương thành dưới:</span><span class="dsp-spec-ref">&lt; 0 mm</span></div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">ST aVR</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStAvr" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgStAvr" value="1.0" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStAvr" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range"><span>ST aVR &ge; 1mm:</span><span class="dsp-spec-ref">Hẹp Thân Chung (LMCA)</span></div>
                  </div>

                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header">
                      <span class="dsp-spec-label">ST V4R (Thất Phải)</span>
                      <span class="dsp-spec-unit-badge">mm</span>
                    </div>
                    <div class="dsp-spec-input-wrap">
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStV4R" data-step="-0.5">−</button>
                      <input class="dsp-spec-input js-ecg-input" type="number" id="ecgStV4R" value="0" step="0.5" />
                      <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgStV4R" data-step="0.5">+</button>
                    </div>
                    <div class="dsp-spec-range"><span>ST V4R &ge; 0.5mm:</span><span class="dsp-spec-ref">Nhồi máu thất phải</span></div>
                  </div>
                </div>

                <!-- Coronary Tree Map SVG Display -->
                <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:12px; padding:1rem; text-align:center;">
                  <div style="font-size:12px; font-weight:800; color:var(--color-text); margin-bottom:0.75rem;">
                    🫀 Sơ Đồ Cây Động Mạch Vành &amp; Nhánh Thủ Phạm (Coronary Tree OMI Mapper):
                  </div>
                  <div id="coronaryArterySvgWrap" style="display:flex; justify-content:center;">
                    ${renderCoronaryArterySvg('LAD')}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- 3. SUB-TAB: TRỤC ĐIỆN TIM CABRERA 360° -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabAxisCabrera" style="display:none;">
            <div class="dsp-card">
              <div class="dsp-card-header">
                <h3 class="dsp-card-title"><i class="fa-solid fa-compass" style="color:#10b981;"></i> La Bàn Vector Trục Điện Tim Hệ 6 Trục Cabrera</h3>
              </div>
              <div style="padding:1.25rem; display:flex; flex-direction:column; align-items:center;">
                <div id="ecgAxisSvgContainer" style="width:100%; display:flex; justify-content:center; margin-bottom:1rem;">
                  ${renderEcgAxisSvg(-39)}
                </div>
                <div id="ecgAxisEtiologyBox" style="width:100%; background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.85rem; font-size:12px;">
                  <!-- Live Axis Output -->
                </div>
              </div>
            </div>
          </div>

          <!-- 4. SUB-TAB: LOẠN NHỊP, WPW & SGARBOSSA -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabArrhythmiaWct" style="display:none;">
            <div class="dsp-card">
              <div class="dsp-card-header">
                <h3 class="dsp-card-title"><i class="fa-solid fa-bolt-lightning" style="color:#ea580c;"></i> Tiêu Chuẩn Sgarbossa (LBBB/Paced) &amp; WCT (Brugada / Vereckei)</h3>
              </div>
              <div style="padding:1.25rem;">
                
                <!-- LBBB Sgarbossa Section -->
                <div style="margin-bottom:1.25rem; background:var(--color-bg); padding:1rem; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:12px; font-weight:800; color:#dc2626; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                    <i class="fa-solid fa-heart-pulse"></i> Tiêu Chuẩn Smith-Modified Sgarbossa (STEMI trên nền LBBB / Máy tạo nhịp):
                  </div>
                  
                  <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:12px;">
                    <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                      <input type="checkbox" id="ecgHasLbbb" class="js-ecg-input" />
                      <strong>Bệnh nhân có LBBB hoàn toàn hoặc Nhịp máy tạo nhịp (Paced Rhythm)</strong>
                    </label>

                    <div id="ecgSgarbossaWrap" style="display:none; flex-direction:column; gap:0.5rem; margin-top:0.4rem; padding-left:1.5rem;">
                      <label style="display:flex; align-items:center; gap:0.5rem;">
                        <input type="checkbox" id="sg1" class="js-ecg-input" />
                        <span>ST chênh lên cùng hướng &ge; 1mm ở chuyển đạo có QRS dương (5 điểm)</span>
                      </label>
                      <label style="display:flex; align-items:center; gap:0.5rem;">
                        <input type="checkbox" id="sg2" class="js-ecg-input" />
                        <span>ST chênh xuống cùng hướng &ge; 1mm ở V1, V2 hoặc V3 (3 điểm)</span>
                      </label>
                      <div style="grid-template-columns:1fr 1fr; gap:0.5rem; margin-top:0.25rem; display:grid;">
                        <div>
                          <label style="font-size:11px; font-weight:700;">ST chênh lên ngược hướng (mm):</label>
                          <input type="number" id="sgDiscordantSte" class="dsp-input js-ecg-input" value="0" step="0.5" />
                        </div>
                        <div>
                          <label style="font-size:11px; font-weight:700;">Biên độ sóng S trước đó (mm):</label>
                          <input type="number" id="sgPrecedingS" class="dsp-input js-ecg-input" value="0" step="1" />
                        </div>
                      </div>
                      <div style="font-size:11px; color:var(--color-text-muted);">
                        Modified Smith-Sgarbossa: Tỷ lệ ST/S &ge; 0.25 xác nhận nhồi máu cơ tim có tắc mạch cấp với độ đặc hiệu 91%.
                      </div>
                    </div>
                  </div>
                </div>

                <!-- WCT Brugada Section -->
                <div style="margin-bottom:1.25rem; background:var(--color-bg); padding:1rem; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:12px; font-weight:800; color:#ea580c; margin-bottom:0.6rem;">
                    ⚡ Thuật Toán Phân Biệt Nhịp Nhanh QRS Rộng (WCT: VT vs SVT Aberrancy):
                  </div>
                  <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:12px;">
                    <label style="display:flex; align-items:center; gap:0.5rem;">
                      <input type="checkbox" id="wctStep1" class="js-ecg-input" />
                      <span>Brugada 1: Vắng mặt hoàn toàn phức bộ RS ở toàn bộ V1-V6 (Concordance) ➔ <strong>VT 100%</strong></span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.5rem;">
                      <input type="checkbox" id="wctStep2" class="js-ecg-input" />
                      <span>Brugada 2: Khoảng RS dài nhất &gt; 100ms ở một chuyển đạo trước tim ➔ <strong>VT</strong></span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.5rem;">
                      <input type="checkbox" id="wctStep3" class="js-ecg-input" />
                      <span>Brugada 3: Hiện diện Phân ly nhĩ thất / Nhát bóp hỗn hợp (Fusion / Capture) ➔ <strong>VT</strong></span>
                    </label>
                    <label style="display:flex; align-items:center; gap:0.5rem;">
                      <input type="checkbox" id="wctVereckei1" class="js-ecg-input" />
                      <span>Vereckei 1: Sóng R ban đầu đơn độc ở chuyển đạo aVR ➔ <strong>VT</strong></span>
                    </label>
                  </div>
                </div>

                <!-- WPW Arruda Algorithm -->
                <div style="background:var(--color-bg); padding:1rem; border-radius:8px; border:1px solid var(--color-border);">
                  <div style="font-size:12px; font-weight:800; color:#7c3aed; margin-bottom:0.6rem;">
                    ⚡ Định Vị Vị Trí Cầu Kent Hội Chứng WPW (Arruda Algorithm):
                  </div>
                  <label style="display:flex; align-items:center; gap:0.5rem; font-size:12px; margin-bottom:0.5rem;">
                    <input type="checkbox" id="ecgHasDelta" class="js-ecg-input" />
                    <strong>Có Sóng Delta (Hội chứng WPW)</strong>
                  </label>
                  <div id="wpwArrudaWrap" style="display:none; grid-template-columns:1fr 1fr 1fr; gap:0.5rem; font-size:11.5px;">
                    <div>
                      <label>Sóng Delta V1:</label>
                      <select id="wpwDeltaV1" class="dsp-select js-ecg-input"><option value="pos">Dương (+) Type A</option><option value="neg">Âm (-) Type B</option></select>
                    </div>
                    <div>
                      <label>Sóng Delta aVF:</label>
                      <select id="wpwDeltaAvf" class="dsp-select js-ecg-input"><option value="pos">Dương (+)</option><option value="neg">Âm (-)</option></select>
                    </div>
                    <div>
                      <label>Sóng Delta DI:</label>
                      <select id="wpwDeltaI" class="dsp-select js-ecg-input"><option value="pos">Dương (+)</option><option value="neg">Âm (-)</option></select>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- 5. SUB-TAB: DÀY BUỒNG TIM (LVH & RVH) -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabHypertrophyLvh" style="display:none;">
            <div class="dsp-card">
              <div class="dsp-card-header">
                <h3 class="dsp-card-title"><i class="fa-solid fa-lungs" style="color:#0284c7;"></i> Ma Trận Tiêu Chuẩn Dày Thất &amp; Nhĩ Toàn Diện</h3>
              </div>
              <div style="padding:1.25rem;">
                <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">S V1 (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgSv1" value="6" />
                  </div>
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">R V5 (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgRv5" value="14" />
                  </div>
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">R aVL (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgRaVL" value="8" />
                  </div>
                </div>

                <div class="dsp-spec-grid" style="margin-bottom:1rem;">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">S V3 (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgSv3" value="8" />
                  </div>
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">S V4 (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgSv4" value="10" />
                  </div>
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">S Sâu Nhất Bất Kỳ (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgDeepestS" value="12" />
                  </div>
                </div>

                <div class="dsp-spec-grid">
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">Độ Rộng Sóng P (ms)</span><span class="dsp-spec-unit-badge">ms</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgPWaveDuration" value="100" />
                  </div>
                  <div class="dsp-spec-tile">
                    <div class="dsp-spec-header"><span class="dsp-spec-label">Biên Độ P ở DII (mm)</span><span class="dsp-spec-unit-badge">mm</span></div>
                    <input class="dsp-input js-ecg-input" type="number" id="ecgPWaveAmpLead2" value="1.5" step="0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. SUB-TAB: ĐIỆN GIẢI & ĐỘC CHẤT -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabMetabolicToxic" style="display:none;">
            <div class="dsp-card">
              <div class="dsp-card-header">
                <h3 class="dsp-card-title"><i class="fa-solid fa-flask-vial" style="color:#7c3aed;"></i> Rối Loạn Điện Giải, Độc Chất &amp; Thân Nhiệt</h3>
              </div>
              <div style="padding:1.25rem;">
                <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:12px;">
                  <div>
                    <label style="font-weight:700; display:block; margin-bottom:0.25rem;">Giai Đoạn Tăng Kali Máu (Hyperkalemia):</label>
                    <select id="ecgHyperkalemiaStage" class="dsp-select js-ecg-input" style="font-weight:700;">
                      <option value="0" selected>0 - Không tăng Kali</option>
                      <option value="1">Giai đoạn 1 (K+ 5.5-6.5): Sóng T nhọn hoắt, đáy hẹp</option>
                      <option value="2">Giai đoạn 2 (K+ 6.5-7.5): PR kéo dài, P dẹt dần</option>
                      <option value="3">Giai đoạn 3 (K+ 7.5-8.5): QRS giãn rộng hình Sin (Sine wave)</option>
                      <option value="4">Giai đoạn 4 (K+ &gt; 8.5): Đe dọa Rung thất / Vô tâm thu</option>
                    </select>
                  </div>

                  <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                    <input type="checkbox" id="ecgHasUWave" class="js-ecg-input" />
                    <span>Hạ Kali Máu: Xuất hiện sóng U nổi bật &gt; 1mm ở V2-V4</span>
                  </label>

                  <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                    <input type="checkbox" id="ecgHasDigoxin" class="js-ecg-input" />
                    <span>Ngấm Digoxin: ST chênh xuống hình đáy chén Salvador Dalí</span>
                  </label>

                  <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;">
                    <input type="checkbox" id="ecgHasOsborn" class="js-ecg-input" />
                    <span>Hạ Thân Nhiệt Nặng (&lt; 30°C): Sóng Osborn (J-wave)</span>
                  </label>

                  <div>
                    <label style="font-weight:700; display:block; margin-bottom:0.25rem;">Hội Chứng Brugada:</label>
                    <select id="ecgBrugadaSelect" class="dsp-select js-ecg-input" style="font-weight:700;">
                      <option value="none" selected>Không có</option>
                      <option value="type1">Brugada Type 1: ST chênh lên dạng vòm (Coved-type &ge; 2mm)</option>
                      <option value="type2">Brugada Type 2: ST chênh lên dạng yên ngựa (Saddleback)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 7. SUB-TAB: HRV & CHẤT LƯỢNG TÍN HIỆU (NEUROKIT2 STUDIO) -->
          <div class="js-ecg-subtab-panel" id="ecgSubtabHrvSqi" style="display:none;">
            <div class="dsp-card">
              <div class="dsp-card-header" style="display:flex; justify-content:space-between; align-items:center;">
                <h3 class="dsp-card-title"><i class="fa-solid fa-wave-square" style="color:#0ea5e9;"></i> Biến Thiên Nhịp Tim (HRV 3 Miền) &amp; Chất Lượng Bản Ghi (SQI)</h3>
                <span class="dsp-badge" style="background:rgba(14,165,233,0.12); color:#0ea5e9; border:1px solid rgba(14,165,233,0.3); font-size:10px;">Chuẩn Thuật Toán NeuroKit2</span>
              </div>
              <div style="padding:1.25rem;">
                
                <!-- Top Visual Grid: Poincaré Plot (Left) & PSD Spectrum (Right) -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
                  <!-- Poincaré Plot Card -->
                  <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:0.85rem; text-align:center;">
                    <div style="font-size:11.5px; font-weight:800; color:var(--color-text); margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center;">
                      <span><i class="fa-solid fa-circle-dot" style="color:#dc2626;"></i> Đồ Thị Poincaré (RR<sub>n</sub> vs RR<sub>n+1</sub>)</span>
                      <span class="dsp-badge" style="font-size:9.5px;">Nonlinear Geometry</span>
                    </div>
                    <div id="ecgPoincareSvgWrap"></div>
                    <div style="font-size:10px; color:var(--color-text-muted); margin-top:0.4rem; text-align:left; line-height:1.4;">
                      <strong>SD1</strong> (độ rộng ngang): Biến thiên ngắn hạn (phó giao cảm) | <strong>SD2</strong> (chiều dài dọc): Biến thiên dài hạn.
                    </div>
                  </div>

                  <!-- PSD Spectrum Card -->
                  <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:0.85rem; text-align:center;">
                    <div style="font-size:11.5px; font-weight:800; color:var(--color-text); margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center;">
                      <span><i class="fa-solid fa-chart-column" style="color:#10b981;"></i> Phổ Mật Độ Tần Số (PSD Bands)</span>
                      <span class="dsp-badge" style="font-size:9.5px;">Welch PSD Method</span>
                    </div>
                    <div id="ecgPsdSvgWrap"></div>
                    <div style="font-size:10px; color:var(--color-text-muted); margin-top:0.4rem; text-align:left; line-height:1.4;">
                      <strong>VLF</strong> (&lt;0.04Hz): Hệ Renin-Angiotensin | <strong>LF</strong> (0.04-0.15Hz): Giao cảm + Phó giao cảm | <strong>HF</strong> (0.15-0.40Hz): Phó giao cảm hô hấp (RSA).
                    </div>
                  </div>
                </div>

                <!-- Dynamic HRV & SQI Breakdown Container -->
                <div id="ecgHrvMetricsWrap"></div>

              </div>
            </div>
          </div>

        </div>

        <!-- Sidebar Column: Real-time Analysis & Recommendations -->
        <div class="dsp-col-side">
          <div class="dsp-card" id="ecgResultCard" style="position:sticky; top:1rem;">
            <!-- Live Diagnostic Report -->
          </div>
        </div>

      </div>

    </div>
  `;
}

export const mountEcgController = setupEcgStudioEvents;

export function setupEcgStudioEvents(bindActionBtns: (container: HTMLElement) => void): void {
  let ecgPaperSettings: EcgPaperSettings = { ...DEFAULT_PAPER_SETTINGS };
  let ecgActiveTheme: 'paper' | 'neon' | 'dark' = 'paper';
  let ecgVisualMode: '12lead' | 'side_by_side' | 'ghost_overlay' | 'focal_leads' = '12lead';
  let ecgGhostTargetLead = 'V2';
  let currentActivePresetId = 'stemi_anterior_proximal_lad';
  let ecgMontage: EcgMontageType = 'cabrera';
  let ecgFilter: EcgFilterType = 'standard';

  // 1. Sub-Tab Switchers
  const ecgSubtabBtns = document.querySelectorAll<HTMLElement>('.js-ecg-subtab-btn');
  const ecgSubtabPanels = document.querySelectorAll<HTMLElement>('.js-ecg-subtab-panel');

  ecgSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      ecgSubtabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const tabId = btn.getAttribute('data-ecg-tab');

      ecgSubtabPanels.forEach(p => { p.style.display = 'none'; });
      if (tabId === 'core_inputs') {
        const p = document.getElementById('ecgSubtabCoreInputs'); if (p) p.style.display = 'block';
      } else if (tabId === 'omi_coronary') {
        const p = document.getElementById('ecgSubtabOmiCoronary'); if (p) p.style.display = 'block';
      } else if (tabId === 'axis_cabrera') {
        const p = document.getElementById('ecgSubtabAxisCabrera'); if (p) p.style.display = 'block';
      } else if (tabId === 'arrhythmia_wct') {
        const p = document.getElementById('ecgSubtabArrhythmiaWct'); if (p) p.style.display = 'block';
      } else if (tabId === 'hypertrophy_lvh') {
        const p = document.getElementById('ecgSubtabHypertrophyLvh'); if (p) p.style.display = 'block';
      } else if (tabId === 'metabolic_toxic') {
        const p = document.getElementById('ecgSubtabMetabolicToxic'); if (p) p.style.display = 'block';
      } else if (tabId === 'hrv_sqi') {
        const p = document.getElementById('ecgSubtabHrvSqi'); if (p) p.style.display = 'block';
      }
    });
  });

  // 🌟 VISUAL MODE SWITCHER (12-Lead vs Side-by-Side vs Ghost vs Focal)
  const canvasModeBtns = document.querySelectorAll<HTMLElement>('.js-ecg-canvas-mode-btn');

  canvasModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      canvasModeBtns.forEach(b => {
        b.classList.remove('is-active');
        b.style.background = 'transparent';
        b.style.color = 'var(--color-text-muted)';
      });
      btn.classList.add('is-active');
      btn.style.background = 'var(--color-primary)';
      btn.style.color = '#ffffff';

      ecgVisualMode = (btn.getAttribute('data-mode') || '12lead') as any;
      recalcEcg();
    });
  });

  // 🌟 MONTAGE & FILTER SWITCHERS
  const montageSelect = document.getElementById('ecgMontageSelect') as HTMLSelectElement | null;
  montageSelect?.addEventListener('change', () => {
    ecgMontage = (montageSelect.value || 'cabrera') as EcgMontageType;
    recalcEcg();
  });

  const filterSelect = document.getElementById('ecgFilterSelect') as HTMLSelectElement | null;
  filterSelect?.addEventListener('change', () => {
    ecgFilter = (filterSelect.value || 'standard') as EcgFilterType;
    recalcEcg();
  });

  // 2. Real-time Search & Category Filter for Presets
  const ecgSearchInput = document.getElementById('ecgCaseSearchInput') as HTMLInputElement | null;
  const filterBtns = document.querySelectorAll<HTMLElement>('.js-ecg-filter-btn');
  let currentEcgCatFilter = 'all';

  const applyEcgFiltering = () => {
    const query = (ecgSearchInput?.value || '').trim().toLowerCase();
    const presetItems = document.querySelectorAll<HTMLElement>('.js-ecg-preset-btn');

    presetItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const searchStr = item.getAttribute('data-search') || '';

      const matchesCat = currentEcgCatFilter === 'all' || cat === currentEcgCatFilter;
      const matchesQuery = !query || searchStr.includes(query);

      if (matchesCat && matchesQuery) {
        if (item.classList.contains('dsp-case-card')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'inline-flex';
        }
      } else {
        item.style.display = 'none';
      }
    });
  };

  if (ecgSearchInput) {
    ecgSearchInput.addEventListener('input', applyEcgFiltering);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentEcgCatFilter = btn.getAttribute('data-filter') || 'all';
      applyEcgFiltering();
    });
  });

  // View Switcher (Grid vs Chips)
  const viewToggleBtns = document.querySelectorAll<HTMLElement>('.js-ecg-view-toggle');
  const gridView = document.getElementById('ecgPresetsGrid');
  const chipsView = document.getElementById('ecgPresetsChips');

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
  const btnToggleCollapse = document.getElementById('btnToggleEcgVaultCollapse');
  const vaultBody = document.getElementById('ecgVaultBody');
  const iconCollapse = document.getElementById('iconEcgVaultCollapse');

  btnToggleCollapse?.addEventListener('click', () => {
    if (!vaultBody) return;
    const isHidden = vaultBody.style.display === 'none';
    vaultBody.style.display = isHidden ? 'block' : 'none';
    if (iconCollapse) {
      iconCollapse.className = isHidden ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
    }
  });

  // 3. Paper Settings: Speed & Gain
  document.querySelectorAll<HTMLElement>('.dsp-paper-speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll<HTMLElement>('.dsp-paper-speed-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--color-text-muted)';
        b.classList.remove('is-active');
      });
      btn.style.background = 'var(--color-primary)';
      btn.style.color = '#fff';
      btn.classList.add('is-active');
      const speed = parseFloat(btn.getAttribute('data-speed') || '25');
      ecgPaperSettings = { ...ecgPaperSettings, speedMmPerSec: speed as 12.5 | 25 | 50 };
      recalcEcg();
    });
  });

  document.querySelectorAll<HTMLElement>('.dsp-paper-gain-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll<HTMLElement>('.dsp-paper-gain-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.color = 'var(--color-text-muted)';
        b.classList.remove('is-active');
      });
      btn.style.background = 'var(--color-primary)';
      btn.style.color = '#fff';
      btn.classList.add('is-active');
      const gain = parseInt(btn.getAttribute('data-gain') || '10', 10);
      ecgPaperSettings = { ...ecgPaperSettings, gainMmPerMv: gain as 5 | 10 | 20 };
      recalcEcg();
    });
  });

  const themeSelect = document.getElementById('ecgThemeSelect') as HTMLSelectElement;
  themeSelect?.addEventListener('change', () => {
    ecgActiveTheme = (themeSelect.value || 'paper') as any;
    recalcEcg();
  });

  // 4. Digital Caliper Drawer
  const btnToggleCaliper = document.getElementById('btnToggleCaliper');
  const caliperBox = document.getElementById('ecgCaliperBox');
  const caliperToggleLabel = document.getElementById('caliperToggleLabel');
  btnToggleCaliper?.addEventListener('click', () => {
    if (!caliperBox) return;
    const isHidden = caliperBox.style.display === 'none';
    caliperBox.style.display = isHidden ? 'block' : 'none';
    if (caliperToggleLabel) caliperToggleLabel.textContent = isHidden ? 'Đóng Thước Kẹp' : 'Mở Thước Kẹp';
  });

  const caliperRangeSlider = document.getElementById('caliperRangeSlider') as HTMLInputElement;
  const caliperMvSlider = document.getElementById('caliperMvSlider') as HTMLInputElement;
  const caliperMsDisplay = document.getElementById('caliperMsDisplay');
  const caliperMvDisplay = document.getElementById('caliperMvDisplay');
  const caliperInstantHr = document.getElementById('caliperInstantHr');
  const caliperBoxesCount = document.getElementById('caliperBoxesCount');

  const updateCaliperReadout = () => {
    const ms = parseFloat(caliperRangeSlider?.value || '400');
    const mv = parseFloat(caliperMvSlider?.value || '0');
    const smallBoxes = (ms / 40).toFixed(1);
    const largeBoxes = (ms / 200).toFixed(1);
    const instantHr = ms > 0 ? Math.round(60000 / ms) : 0;

    if (caliperMsDisplay) caliperMsDisplay.textContent = `${ms} ms (${smallBoxes} ô nhỏ)`;
    if (caliperMvDisplay) caliperMvDisplay.textContent = `${mv > 0 ? `+${mv}` : mv} mV (${(mv * 10).toFixed(1)} mm)`;
    if (caliperInstantHr) caliperInstantHr.textContent = `${instantHr} l/p`;
    if (caliperBoxesCount) caliperBoxesCount.textContent = `${largeBoxes} lớn (${smallBoxes} nhỏ)`;
  };

  caliperRangeSlider?.addEventListener('input', updateCaliperReadout);
  caliperMvSlider?.addEventListener('input', updateCaliperReadout);

  document.querySelectorAll<HTMLElement>('.js-caliper-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const ms = btn.getAttribute('data-ms');
      const mv = btn.getAttribute('data-mv');
      if (ms && caliperRangeSlider) caliperRangeSlider.value = ms;
      if (mv && caliperMvSlider) caliperMvSlider.value = mv;
      updateCaliperReadout();
    });
  });

  // 5. Preset Load Handlers
  document.querySelectorAll<HTMLElement>('.js-ecg-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = ECG_PRESETS.find(p => p.id === id);
      if (!preset) return;

      currentActivePresetId = preset.id;

      // Highlight active card
      document.querySelectorAll<HTMLElement>('.js-ecg-preset-btn').forEach(b => {
        b.classList.remove('is-active');
        if (b.getAttribute('data-preset-id') === id) {
          b.classList.add('is-active');
        }
      });

      const v = preset.values;
      (document.getElementById('ecgHr') as HTMLInputElement).value = String(v.heartRate);
      (document.getElementById('ecgRhythm') as HTMLSelectElement).value = v.rhythmType;
      (document.getElementById('ecgQt') as HTMLInputElement).value = String(v.qtInterval || 400);
      (document.getElementById('ecgLead1') as HTMLInputElement).value = String(v.lead1Net);
      (document.getElementById('ecgAvf') as HTMLInputElement).value = String(v.avfNet);
      (document.getElementById('ecgPr') as HTMLInputElement).value = String(v.prInterval || 160);
      (document.getElementById('ecgQrs') as HTMLInputElement).value = String(v.qrsDuration || 90);
      (document.getElementById('ecgGender') as HTMLSelectElement).value = v.gender || 'male';
      (document.getElementById('ecgTWaveType') as HTMLSelectElement).value = v.tWaveType || 'normal';

      (document.getElementById('ecgStV1V2') as HTMLInputElement).value = String(v.stV1 || 0);
      (document.getElementById('ecgStV3V4') as HTMLInputElement).value = String(v.stV3 || 0);
      (document.getElementById('ecgStLateral') as HTMLInputElement).value = String(v.stI || 0);
      (document.getElementById('ecgStInferior') as HTMLInputElement).value = String(v.stII || 0);
      (document.getElementById('ecgStAvr') as HTMLInputElement).value = String(v.staVR || 0);
      (document.getElementById('ecgStV4R') as HTMLInputElement).value = String(v.stV4R || 0);

      (document.getElementById('ecgSv1') as HTMLInputElement).value = String(v.sv1 || 6);
      (document.getElementById('ecgRv5') as HTMLInputElement).value = String(v.rv5 || 14);
      (document.getElementById('ecgRaVL') as HTMLInputElement).value = String(v.raVL || 8);
      (document.getElementById('ecgSv3') as HTMLInputElement).value = String(v.sv3 || 8);
      (document.getElementById('ecgSv4') as HTMLInputElement).value = String(v.sv4 || 10);
      (document.getElementById('ecgDeepestS') as HTMLInputElement).value = String(v.deepestS || 12);
      (document.getElementById('ecgPWaveDuration') as HTMLInputElement).value = String(v.pWaveDuration || 100);
      (document.getElementById('ecgPWaveAmpLead2') as HTMLInputElement).value = String(v.pWaveAmpLead2 || 1.5);

      (document.getElementById('ecgHasLbbb') as HTMLInputElement).checked = !!v.hasLbbb;
      (document.getElementById('sg1') as HTMLInputElement).checked = !!v.sgarbossaConcordantStElevation;
      (document.getElementById('sg2') as HTMLInputElement).checked = !!v.sgarbossaConcordantStDepressionV1V3;
      (document.getElementById('sgDiscordantSte') as HTMLInputElement).value = String(v.sgarbossaDiscordantSte || 0);
      (document.getElementById('sgPrecedingS') as HTMLInputElement).value = String(v.sgarbossaPrecedingS || 0);

      (document.getElementById('wctStep1') as HTMLInputElement).checked = !!v.wctRsAbsentAllPrecordial;
      (document.getElementById('wctStep2') as HTMLInputElement).checked = !!v.wctRsLongestOver100ms;
      (document.getElementById('wctStep3') as HTMLInputElement).checked = !!v.wctAvDissociation;
      (document.getElementById('wctVereckei1') as HTMLInputElement).checked = !!v.wctVereckeiInitialR;

      (document.getElementById('ecgHasDelta') as HTMLInputElement).checked = !!v.hasDeltaWave;
      if (v.wpwDeltaV1) (document.getElementById('wpwDeltaV1') as HTMLSelectElement).value = v.wpwDeltaV1;
      if (v.wpwDeltaAvf) (document.getElementById('wpwDeltaAvf') as HTMLSelectElement).value = v.wpwDeltaAvf;
      if (v.wpwDeltaI) (document.getElementById('wpwDeltaI') as HTMLSelectElement).value = v.wpwDeltaI;

      (document.getElementById('ecgHyperkalemiaStage') as HTMLInputElement).value = String(v.hyperkalemiaStage || 0);
      (document.getElementById('ecgHasUWave') as HTMLInputElement).checked = !!v.hasUWave;
      (document.getElementById('ecgHasDigoxin') as HTMLInputElement).checked = !!v.hasDigoxinSagging;
      (document.getElementById('ecgHasOsborn') as HTMLInputElement).checked = !!v.hasOsbornWave;
      (document.getElementById('ecgBrugadaSelect') as HTMLSelectElement).value = v.hasBrugadaPattern || 'none';

      // Chuyển tab phù hợp với ca bệnh
      ecgSubtabBtns.forEach(b => b.classList.remove('is-active'));
      ecgSubtabPanels.forEach(p => { p.style.display = 'none'; });
      if (preset.category === 'ischemia') {
        document.querySelector<HTMLElement>('[data-ecg-tab="omi_coronary"]')?.classList.add('is-active');
        const p = document.getElementById('ecgSubtabOmiCoronary'); if (p) p.style.display = 'block';
      } else if (preset.category === 'conduction' || preset.category === 'arrhythmia') {
        document.querySelector<HTMLElement>('[data-ecg-tab="arrhythmia_wct"]')?.classList.add('is-active');
        const p = document.getElementById('ecgSubtabArrhythmiaWct'); if (p) p.style.display = 'block';
      } else if (preset.category === 'electrolyte' || preset.category === 'channelopathy') {
        document.querySelector<HTMLElement>('[data-ecg-tab="metabolic_toxic"]')?.classList.add('is-active');
        const p = document.getElementById('ecgSubtabMetabolicToxic'); if (p) p.style.display = 'block';
      } else if (preset.category === 'hypertrophy') {
        document.querySelector<HTMLElement>('[data-ecg-tab="hypertrophy_lvh"]')?.classList.add('is-active');
        const p = document.getElementById('ecgSubtabHypertrophyLvh'); if (p) p.style.display = 'block';
      } else {
        document.querySelector<HTMLElement>('[data-ecg-tab="core_inputs"]')?.classList.add('is-active');
        const p = document.getElementById('ecgSubtabCoreInputs'); if (p) p.style.display = 'block';
      }

      if (preset.keyLeads && preset.keyLeads.length > 0) {
        ecgGhostTargetLead = preset.keyLeads[0];
      }

      recalcEcg();
    });
  });

  // 6. Recalculate ECG Core Function
  const recalcEcg = () => {
    const heartRate = parseFloat((document.getElementById('ecgHr') as HTMLInputElement)?.value) || 80;
    const rhythmType = ((document.getElementById('ecgRhythm') as HTMLSelectElement)?.value || 'sinus') as any;
    const lead1Net = parseFloat((document.getElementById('ecgLead1') as HTMLInputElement)?.value) || 0;
    const avfNet = parseFloat((document.getElementById('ecgAvf') as HTMLInputElement)?.value) || 0;
    const prInterval = parseFloat((document.getElementById('ecgPr') as HTMLInputElement)?.value) || 160;
    const qrsDuration = parseFloat((document.getElementById('ecgQrs') as HTMLInputElement)?.value) || 90;
    const qtInterval = parseFloat((document.getElementById('ecgQt') as HTMLInputElement)?.value) || 400;
    const gender = ((document.getElementById('ecgGender') as HTMLSelectElement)?.value || 'male') as any;
    const tWaveType = ((document.getElementById('ecgTWaveType') as HTMLSelectElement)?.value || 'normal') as any;

    const stV1V2 = parseFloat((document.getElementById('ecgStV1V2') as HTMLInputElement)?.value) || 0;
    const stV3V4 = parseFloat((document.getElementById('ecgStV3V4') as HTMLInputElement)?.value) || 0;
    const stLateral = parseFloat((document.getElementById('ecgStLateral') as HTMLInputElement)?.value) || 0;
    const stInferior = parseFloat((document.getElementById('ecgStInferior') as HTMLInputElement)?.value) || 0;
    const staVR = parseFloat((document.getElementById('ecgStAvr') as HTMLInputElement)?.value) || 0;
    const stV4R = parseFloat((document.getElementById('ecgStV4R') as HTMLInputElement)?.value) || 0;

    const sv1 = parseFloat((document.getElementById('ecgSv1') as HTMLInputElement)?.value) || 6;
    const rv5 = parseFloat((document.getElementById('ecgRv5') as HTMLInputElement)?.value) || 14;
    const raVL = parseFloat((document.getElementById('ecgRaVL') as HTMLInputElement)?.value) || 8;
    const sv3 = parseFloat((document.getElementById('ecgSv3') as HTMLInputElement)?.value) || 8;
    const sv4 = parseFloat((document.getElementById('ecgSv4') as HTMLInputElement)?.value) || 10;
    const deepestS = parseFloat((document.getElementById('ecgDeepestS') as HTMLInputElement)?.value) || 12;
    const pWaveDuration = parseFloat((document.getElementById('ecgPWaveDuration') as HTMLInputElement)?.value) || 100;
    const pWaveAmpLead2 = parseFloat((document.getElementById('ecgPWaveAmpLead2') as HTMLInputElement)?.value) || 1.5;

    const hasLbbb = (document.getElementById('ecgHasLbbb') as HTMLInputElement)?.checked;
    const sgarbossaConcordantStElevation = (document.getElementById('sg1') as HTMLInputElement)?.checked;
    const sgarbossaConcordantStDepressionV1V3 = (document.getElementById('sg2') as HTMLInputElement)?.checked;
    const sgarbossaDiscordantSte = parseFloat((document.getElementById('sgDiscordantSte') as HTMLInputElement)?.value) || 0;
    const sgarbossaPrecedingS = parseFloat((document.getElementById('sgPrecedingS') as HTMLInputElement)?.value) || 0;

    const wctRsAbsentAllPrecordial = (document.getElementById('wctStep1') as HTMLInputElement)?.checked;
    const wctRsLongestOver100ms = (document.getElementById('wctStep2') as HTMLInputElement)?.checked;
    const wctAvDissociation = (document.getElementById('wctStep3') as HTMLInputElement)?.checked;
    const wctVereckeiInitialR = (document.getElementById('wctVereckei1') as HTMLInputElement)?.checked;

    const hasDeltaWave = (document.getElementById('ecgHasDelta') as HTMLInputElement)?.checked;
    const wpwDeltaV1 = ((document.getElementById('wpwDeltaV1') as HTMLSelectElement)?.value || 'pos') as any;
    const wpwDeltaAvf = ((document.getElementById('wpwDeltaAvf') as HTMLSelectElement)?.value || 'pos') as any;
    const wpwDeltaI = ((document.getElementById('wpwDeltaI') as HTMLSelectElement)?.value || 'pos') as any;

    const hyperkalemiaStage = parseInt((document.getElementById('ecgHyperkalemiaStage') as HTMLInputElement)?.value || '0', 10) as any;
    const hasUWave = (document.getElementById('ecgHasUWave') as HTMLInputElement)?.checked;
    const hasDigoxinSagging = (document.getElementById('ecgHasDigoxin') as HTMLInputElement)?.checked;
    const hasOsbornWave = (document.getElementById('ecgHasOsborn') as HTMLInputElement)?.checked;
    const hasBrugadaPattern = ((document.getElementById('ecgBrugadaSelect') as HTMLSelectElement)?.value || 'none') as any;

    const inputs: EcgInputs = {
      heartRate, rhythmType, lead1Net, avfNet, prInterval, qrsDuration, qtInterval, gender, tWaveType,
      stV1: stV1V2, stV2: stV1V2, stV3: stV3V4, stV4: stV3V4,
      stI: stLateral, staVL: stLateral, stV5: stLateral, stV6: stLateral,
      stII: stInferior, stIII: stInferior, staVF: stInferior, staVR, stV4R,
      sv1, rv5, raVL, sv3, sv4, deepestS, pWaveDuration, pWaveAmpLead2,
      hasLbbb, sgarbossaConcordantStElevation, sgarbossaConcordantStDepressionV1V3,
      sgarbossaDiscordantSte, sgarbossaPrecedingS,
      wctRsAbsentAllPrecordial, wctRsLongestOver100ms, wctAvDissociation, wctVereckeiInitialR,
      hasDeltaWave, wpwDeltaV1, wpwDeltaAvf, wpwDeltaI,
      hyperkalemiaStage, hasUWave, hasDigoxinSagging, hasOsbornWave, hasBrugadaPattern
    };

    const res = analyzeEcg(inputs);
    const aiScores = computeAiDiagnosticProbabilities(inputs, res);
    const sqi = computeEcgSignalQuality(inputs, ecgFilter);
    const hrv = computeHrvMetrics(inputs);
    const currentPreset = ECG_PRESETS.find(p => p.id === currentActivePresetId) || ECG_PRESETS[0];

    // 🌟 Update SQI Badge in Paper Toolbar
    const sqiBadge = document.getElementById('ecgSqiQualityBadge');
    if (sqiBadge) {
      sqiBadge.innerHTML = `
        <span class="dsp-badge" style="background:${sqi.badgeColor}18; color:${sqi.badgeColor}; border:1px solid ${sqi.badgeColor}40; font-size:11px; font-weight:800; cursor:pointer;" title="${escapeHtml(sqi.explanation)}">
          <i class="fa-solid fa-shield-halved"></i> SQI: <strong>${sqi.overallSqi}%</strong> (${escapeHtml(sqi.badgeLevel.toUpperCase())})
        </span>
      `;
    }

    // 🌟 Render Poincaré SVG & PSD Spectrum SVG (NeuroKit2)
    const poincareWrap = document.getElementById('ecgPoincareSvgWrap');
    if (poincareWrap) poincareWrap.innerHTML = renderPoincarePlotSvg(hrv, inputs, ecgActiveTheme);

    const psdWrap = document.getElementById('ecgPsdSvgWrap');
    if (psdWrap) psdWrap.innerHTML = renderHrvPsdSvg(hrv);

    // 🌟 Render HRV & SQI Breakdown Tables
    const hrvWrap = document.getElementById('ecgHrvMetricsWrap');
    if (hrvWrap) {
      hrvWrap.innerHTML = `
        <!-- Autonomic Status Hero Banner -->
        <div style="background:${hrv.autonomicStateColor}14; border-left:4px solid ${hrv.autonomicStateColor}; border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
          <div style="font-size:11px; font-weight:800; color:${hrv.autonomicStateColor}; text-transform:uppercase; display:flex; justify-content:space-between; align-items:center;">
            <span><i class="fa-solid fa-brain"></i> Trạng Thái Thần Kinh Thực Vật (Autonomic Balance)</span>
            <span class="dsp-badge" style="background:${hrv.autonomicStateColor}25; color:${hrv.autonomicStateColor};">LF/HF = ${hrv.freq.lfHfRatio}</span>
          </div>
          <div style="font-size:1.05rem; font-weight:800; color:var(--color-text); margin-top:0.25rem;">
            ${escapeHtml(hrv.autonomicStateTitle)}
          </div>
          <ul style="margin:0.4rem 0 0 0; padding-left:1.2rem; font-size:11.5px; color:var(--color-text); line-height:1.45;">
            ${hrv.clinicalSignificance.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
          </ul>
        </div>

        <!-- 3-Domains Comparative Matrix Table -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1rem;">
          
          <!-- Column 1: Time Domain -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
            <div style="font-size:11.5px; font-weight:800; color:var(--color-primary); margin-bottom:0.5rem; border-bottom:1px solid var(--color-border); padding-bottom:0.25rem;">
              ⏱️ Miền Thời Gian (Time Domain)
            </div>
            <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:11.5px;">
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Khoảng RR Trung Bình (Mean NN):</span>
                <strong>${hrv.time.meanNn} ms</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Độ Lệch Chuẩn RR (SDNN):</span>
                <strong style="color:${hrv.time.sdnn < 20 ? '#dc2626' : '#10b981'};">${hrv.time.sdnn} ms</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Hiệu Số Bình Phương (RMSSD):</span>
                <strong style="color:#0284c7;">${hrv.time.rmssd} ms</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Tỷ Lệ pNN50 (&gt;50ms):</span>
                <strong>${hrv.time.pnn50}%</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Hệ Số Biến Thiên (CVNN):</span>
                <strong>${hrv.time.cvnn}%</strong>
              </div>
            </div>
          </div>

          <!-- Column 2: Frequency Domain -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
            <div style="font-size:11.5px; font-weight:800; color:#10b981; margin-bottom:0.5rem; border-bottom:1px solid var(--color-border); padding-bottom:0.25rem;">
              📈 Miền Tần Số (Spectral Density)
            </div>
            <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:11.5px;">
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Tần Số Siêu Thấp (VLF &lt;0.04Hz):</span>
                <strong>${hrv.freq.vlfPower} ms²</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Tần Số Thấp (LF 0.04-0.15Hz):</span>
                <strong style="color:#ef4444;">${hrv.freq.lfPower} ms² (${hrv.freq.lfn}%)</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Tần Số Cao (HF 0.15-0.40Hz):</span>
                <strong style="color:#10b981;">${hrv.freq.hfPower} ms² (${hrv.freq.hfn}%)</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Tổng Năng Lượng (Total Power):</span>
                <strong>${hrv.freq.totalPower} ms²</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Tỷ Số Giao Cảm/Phế Vị (LF/HF):</span>
                <strong style="color:${hrv.freq.lfHfRatio > 2.0 ? '#ef4444' : '#10b981'};">${hrv.freq.lfHfRatio}</strong>
              </div>
            </div>
          </div>

          <!-- Column 3: Nonlinear & SQI Quality -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem;">
            <div style="font-size:11.5px; font-weight:800; color:#7c3aed; margin-bottom:0.5rem; border-bottom:1px solid var(--color-border); padding-bottom:0.25rem;">
              🌀 Phi Tuyến &amp; Chất Lượng Tín Hiệu SQI
            </div>
            <div style="display:flex; flex-direction:column; gap:0.35rem; font-size:11.5px;">
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Độ Lệch Ngắn Hạn (SD1):</span>
                <strong>${hrv.nonlinear.sd1} ms</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Độ Lệch Dài Hạn (SD2):</span>
                <strong>${hrv.nonlinear.sd2} ms</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Chỉ Số Giao Cảm Tim (CSI):</span>
                <strong>${hrv.nonlinear.csi}</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Chỉ Số Phế Vị Tim (CVI):</span>
                <strong>${hrv.nonlinear.cvi}</strong>
              </div>
              <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--color-text-muted);">Độ Phức Tạp Sample Entropy:</span>
                <strong>${hrv.nonlinear.sampleEntropy}</strong>
              </div>
              <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--color-border); padding-top:0.25rem; margin-top:0.2rem;">
                <span style="color:var(--color-text-muted);">Độ Ổn Định Baseline (basSQI):</span>
                <strong style="color:#10b981;">${sqi.basSqi}%</strong>
              </div>
            </div>
          </div>

        </div>
      `;
    }

    // 🌟 Render Canvas based on current visual mode & montage & filter
    const canvasWrap = document.getElementById('ecgGridCanvasWrap');
    if (canvasWrap) {
      const settings: EcgPaperSettings = {
        ...ecgPaperSettings,
      };

      if (ecgVisualMode === '12lead') {
        canvasWrap.innerHTML = render12LeadEcgPaper(inputs, settings, ecgActiveTheme, ecgMontage, ecgFilter);
      } else if (ecgVisualMode === 'side_by_side') {
        canvasWrap.innerHTML = renderEcgSideBySideSvg(inputs, NORMAL_SINUS_BASELINE, settings, ecgActiveTheme, currentPreset.name, 'ĐỐI CHỨNG BÌNH THƯỜNG');
      } else if (ecgVisualMode === 'ghost_overlay') {
        canvasWrap.innerHTML = renderEcgGhostOverlaySvg(inputs, NORMAL_SINUS_BASELINE, ecgGhostTargetLead, settings, ecgActiveTheme);
      } else if (ecgVisualMode === 'focal_leads') {
        const leads = currentPreset.keyLeads || ['V2', 'V3', 'aVL', 'III'];
        const annotations = currentPreset.annotations || [];
        canvasWrap.innerHTML = renderEcgFocalLeadsWithCalloutsSvg(inputs, leads, annotations, settings, ecgActiveTheme);
      }
    }

    // 🌟 Render Morphology Comparison Atlas Card
    const morphCard = document.getElementById('ecgMorphologyCard');
    if (morphCard) {
      const morph = getPresetMorphologyComparison(currentActivePresetId);
      if (morph) {
        morphCard.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
            <div style="font-size:13px; font-weight:800; color:var(--color-primary); display:flex; align-items:center; gap:0.4rem;">
              <i class="fa-solid fa-microscope"></i> ${escapeHtml(morph.title)}
            </div>
            <div style="display:flex; gap:0.35rem; align-items:center;">
              <span style="font-size:11px; color:var(--color-text-muted); font-weight:700;">Soi Nhanh Ghost Overlay:</span>
              ${morph.targetLeads.map(lead => `
                <button type="button" class="dsp-btn dsp-btn-sm js-focal-jump-btn" data-lead="${lead}" style="padding:2px 8px; font-size:10.5px; font-weight:800; border-radius:4px; background:${ecgGhostTargetLead === lead ? 'var(--color-primary)' : 'var(--color-bg)'}; color:${ecgGhostTargetLead === lead ? '#fff' : 'var(--color-text)'}; border:1px solid var(--color-border);">
                  ${lead}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="overflow-x:auto; margin-bottom:0.85rem;">
            <table class="dsp-table" style="width:100%; font-size:11.5px; border-collapse:collapse; background:var(--color-bg); border-radius:8px; overflow:hidden;">
              <thead>
                <tr style="background:rgba(0,0,0,0.04); text-align:left; border-bottom:1px solid var(--color-border);">
                  <th style="padding:8px 10px; font-weight:800;">Đặc Điểm Hình Thái</th>
                  <th style="padding:8px 10px; font-weight:800; color:#0284c7;">Chuẩn Bình Thường (Baseline)</th>
                  <th style="padding:8px 10px; font-weight:800; color:#dc2626;">Dấu Ấn Bệnh Lý Ca Này</th>
                  <th style="padding:8px 10px; font-weight:800;">Ý Nghĩa Lâm Sàng (EBM)</th>
                </tr>
              </thead>
              <tbody>
                ${morph.keySignatures.map(sig => `
                  <tr style="border-bottom:1px solid var(--color-border);">
                    <td style="padding:7px 10px; font-weight:700;">${escapeHtml(sig.feature)}</td>
                    <td style="padding:7px 10px; color:var(--color-text-muted);">${escapeHtml(sig.normal)}</td>
                    <td style="padding:7px 10px; color:#dc2626; font-weight:700;">${escapeHtml(sig.abnormal)}</td>
                    <td style="padding:7px 10px; color:var(--color-text);">${escapeHtml(sig.significance)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; font-size:11.5px; line-height:1.45;">
            <div style="margin-bottom:0.35rem;">
              <strong style="color:var(--color-primary);"><i class="fa-solid fa-bolt"></i> Cơ Chế Điện Sinh Lý Học:</strong>
              <span>${escapeHtml(morph.electrophysiologyMechanism)}</span>
            </div>
            ${morph.reciprocalChanges ? `
              <div>
                <strong style="color:#f59e0b;"><i class="fa-solid fa-arrows-left-right-to-line"></i> Biến Đổi Soi Gương (Reciprocal Changes):</strong>
                <span>${escapeHtml(morph.reciprocalChanges)}</span>
              </div>
            ` : ''}
          </div>
        `;

        morphCard.querySelectorAll<HTMLElement>('.js-focal-jump-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const lead = btn.getAttribute('data-lead');
            if (lead) {
              ecgGhostTargetLead = lead;
              ecgVisualMode = 'ghost_overlay';
              canvasModeBtns.forEach(b => {
                b.classList.remove('is-active');
                b.style.background = 'transparent';
                b.style.color = 'var(--color-text-muted)';
                if (b.getAttribute('data-mode') === 'ghost_overlay') {
                  b.classList.add('is-active');
                  b.style.background = 'var(--color-primary)';
                  b.style.color = '#ffffff';
                }
              });
              recalcEcg();
            }
          });
        });
      } else {
        morphCard.innerHTML = `
          <div style="font-size:12px; color:var(--color-text-muted); text-align:center; padding:0.5rem;">
            Chọn một ca bệnh mẫu ở kho Preset bên trên để xem đối chiếu hình thái sóng chi tiết.
          </div>
        `;
      }
    }

    // Render Coronary SVG
    const coronaryWrap = document.getElementById('coronaryArterySvgWrap');
    if (coronaryWrap) coronaryWrap.innerHTML = renderCoronaryArterySvg(res.culpritArtery);

    // Render Axis SVG
    const svgAxisContainer = document.getElementById('ecgAxisSvgContainer');
    if (svgAxisContainer) svgAxisContainer.innerHTML = renderEcgAxisSvg(res.axisAngleDegree);

    // Update Axis Etiology Box
    const axisEtiologyBox = document.getElementById('ecgAxisEtiologyBox');
    if (axisEtiologyBox) {
      axisEtiologyBox.innerHTML = `
        <div style="font-weight:800; color:${res.axisColor}; margin-bottom:0.35rem;">
          Góc &alpha; = ${res.axisAngleDegree > 0 ? `+${res.axisAngleDegree}` : res.axisAngleDegree}° ➔ ${escapeHtml(res.axisClassification)}
        </div>
        <div style="color:var(--color-text-muted);">
          <strong>Nguyên nhân gợi ý:</strong> ${res.axisEtiologies.map(e => `<span class="dsp-badge dsp-badge--outline" style="margin-right:4px; margin-top:2px;">${escapeHtml(e)}</span>`).join('')}
        </div>
      `;
    }

    // Toggle sub-sections
    const sgWrap = document.getElementById('ecgSgarbossaWrap');
    if (sgWrap) sgWrap.style.display = hasLbbb ? 'flex' : 'none';

    const wpwWrap = document.getElementById('wpwArrudaWrap');
    if (wpwWrap) wpwWrap.style.display = hasDeltaWave ? 'grid' : 'none';

    // 🌟 Render Full EBM Diagnostic Result Card with AI Multi-Label Confidence Meter
    const resultCard = document.getElementById('ecgResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:#dc2626;"></i> Kết Quả Chẩn Đoán ECG Pro</h3>
        </div>
        <div style="padding:1.25rem;">
          
          <!-- 🌟 AI MULTI-LABEL DL CLASSIFIER PROBABILITIES (from torch_ecg) -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:0.85rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:var(--color-primary); text-transform:uppercase; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center;">
              <span><i class="fa-solid fa-robot"></i> Mô Hình AI Deep Learning (torch_ecg)</span>
              <span class="dsp-badge" style="font-size:9.5px; background:rgba(2,132,199,0.12); color:var(--color-primary);">1D-ResNet + Transformer</span>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:0.45rem;">
              ${aiScores.slice(0, 5).map(s => {
                const barColor = s.severity === 'critical' ? '#dc2626' : s.severity === 'danger' ? '#ea580c' : s.severity === 'warning' ? '#f59e0b' : '#10b981';
                return `
                  <div>
                    <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; margin-bottom:2px;">
                      <span>${escapeHtml(s.label)}</span>
                      <span style="color:${barColor}; font-weight:800;">${s.probability}%</span>
                    </div>
                    <div style="width:100%; height:6px; background:var(--color-surface); border-radius:3px; overflow:hidden; border:1px solid var(--color-border);">
                      <div style="width:${s.probability}%; height:100%; background:${barColor}; border-radius:3px; transition:width 0.4s ease;"></div>
                    </div>
                    <div style="font-size:9.5px; color:var(--color-text-muted); margin-top:2px;">${escapeHtml(s.reasoning)}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

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

          <!-- Rhythm & Axis Summary Badge -->
          <div style="background:rgba(2,132,199,0.08); border-left:4px solid ${res.axisColor}; padding:0.85rem 1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân Loại Nhịp &amp; Trục:</div>
            <div style="font-size:1.05rem; font-weight:800; color:var(--color-text); margin-top:0.2rem;">
              ${rhythmType.toUpperCase()} | ${heartRate} l/p (${escapeHtml(res.heartRateCategory)})
            </div>
            <div style="font-size:0.85rem; color:${res.axisColor}; font-weight:700; margin-top:0.25rem;">
              Trục ${res.axisAngleDegree > 0 ? `+${res.axisAngleDegree}` : res.axisAngleDegree}° (${escapeHtml(res.axisClassification)})
            </div>
          </div>

          <!-- QTc 4-Formula Panel -->
          ${res.qtcBazett ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.4rem;">
                Đo Đạc Khoảng QTc (4 Công Thức):
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; font-size:11.5px; margin-bottom:0.4rem;">
                <div><strong>Bazett:</strong> <span class="dsp-badge ${res.qtcSeverity === 'critical' ? 'dsp-badge--danger' : res.qtcSeverity === 'prolonged' ? 'dsp-badge--warning' : 'dsp-badge--info'}">${res.qtcBazett} ms</span></div>
                <div><strong>Fridericia:</strong> <span class="dsp-badge dsp-badge--info">${res.qtcFridericia} ms</span></div>
                <div><strong>Framingham:</strong> <span class="dsp-badge dsp-badge--outline">${res.qtcFramingham} ms</span></div>
                <div><strong>Hodges:</strong> <span class="dsp-badge dsp-badge--outline">${res.qtcHodges} ms</span></div>
              </div>
              <div style="font-size:11.5px; color:${res.qtcSeverity === 'critical' ? '#dc2626' : 'var(--color-text-muted)'}; font-weight:600;">
                ${escapeHtml(res.qtcInterpretation || '')}
              </div>
            </div>
          ` : ''}

          <!-- Ischemia & Culprit Artery Sheet -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:800; color:#dc2626; text-transform:uppercase; margin-bottom:0.35rem;">
              Đánh Giá Thiếu Máu / Nhồi Máu (OMI):
            </div>
            <div style="font-size:12px; margin-bottom:0.3rem;">
              <strong>Vùng nhồi máu / OMI:</strong> <span style="color:#dc2626; font-weight:800;">${escapeHtml(res.stemiTerritory || 'Không phát hiện OMI rõ')}</span>
            </div>
            <div style="font-size:12px; margin-bottom:0.3rem;">
              <strong>Động mạch thủ phạm:</strong> <span class="dsp-badge dsp-badge--danger" style="font-weight:800;">${escapeHtml(res.culpritArtery)}</span>
            </div>
            ${res.culpritDescription ? `
              <div style="font-size:11.5px; color:var(--color-text-muted); line-height:1.4;">
                ${escapeHtml(res.culpritDescription)}
              </div>
            ` : ''}
          </div>

          <!-- Chamber Hypertrophy Criteria -->
          ${(res.lvhStatus || res.rvhStatus || res.atrialEnlargementStatus) ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase; margin-bottom:0.35rem;">
                Tiêu Chuẩn Dày Buồng Tim:
              </div>
              <ul style="margin:0; padding-left:1.2rem; font-size:12px; line-height:1.45;">
                ${res.lvhStatus ? `<li><strong>Dày thất trái (LVH):</strong> ${escapeHtml(res.lvhStatus)}</li>` : ''}
                ${res.rvhStatus ? `<li><strong>Dày thất phải (RVH):</strong> ${escapeHtml(res.rvhStatus)}</li>` : ''}
                ${res.atrialEnlargementStatus ? `<li><strong>Dày nhĩ:</strong> ${escapeHtml(res.atrialEnlargementStatus)}</li>` : ''}
              </ul>
            </div>
          ` : ''}

          <!-- Conduction & Arrhythmia Reasoning -->
          ${(res.wctResult || res.wpwLocalization || res.metabolicFindings.length > 0) ? `
            <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:0.75rem; margin-bottom:1rem;">
              <div style="font-size:11px; font-weight:800; color:#7c3aed; text-transform:uppercase; margin-bottom:0.35rem;">
                Dẫn Truyền / Loạn Nhịp / Điện Giải:
              </div>
              <ul style="margin:0; padding-left:1.2rem; font-size:12px; line-height:1.45;">
                ${res.wctResult ? `<li><strong>WCT Algorithm:</strong> ${escapeHtml(res.wctResult.certainty)} (${escapeHtml(res.wctResult.brugadaStep)})</li>` : ''}
                ${res.wpwLocalization ? `<li><strong>Định vị WPW:</strong> ${escapeHtml(res.wpwLocalization.pathwayLocation)}</li>` : ''}
                ${res.metabolicFindings.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
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
                <i class="fa-solid fa-print"></i> In Kết Quả
              </button>
            </div>
          </div>

        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-ecg-input').forEach(i => i.addEventListener('input', recalcEcg));

  // Khởi chạy tính toán ban đầu
  recalcEcg();
}
