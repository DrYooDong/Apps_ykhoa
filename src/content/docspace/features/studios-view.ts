/**
 * DocSpace — Clinical Studios Pro Suite View & Interactive Controller
 * Phòng Lab 7 Công Cụ Lâm Sàng Tương Tác Chuyên Sâu, Quick Presets & Pure SVG Visualizations (100% Pure TypeScript)
 */

import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';
import { getActiveProfile } from '../storage';
import { analyzeAbg, renderDavenportSvg, ABG_PRESETS } from './studios/abg-studio';
import { analyzeEcg, renderEcgAxisSvg, ECG_PRESETS } from './studios/ecg-studio';
import { analyzeElectrolyte, renderFluidTimelineSvg, ELYTE_PRESETS } from './studios/electrolyte-studio';
import { analyzeRenalFunction, renderKdigoGaugeSvg, RENAL_PRESETS } from './studios/renal-dosing-studio';
import { analyzeCardioRisk, renderScore2GaugeSvg, CARDIO_PRESETS } from './studios/cardio-risk-studio';
import { analyzeSepsis, SEPSIS_PRESETS } from './studios/sepsis-studio';
import { analyzeCirrhosis, CIRRHOSIS_PRESETS } from './studios/cirrhosis-studio';

export type StudioTabKey = 'abg' | 'ecg' | 'electrolyte' | 'renal' | 'cardio' | 'sepsis' | 'cirrhosis';

export async function renderStudiosView(profileId: string, initialTab: StudioTabKey = 'abg'): Promise<string> {
  const profile = getActiveProfile();
  if (!profile) return '';

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'studios')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'studios')}
        <div class="dsp-page-content">

          <!-- Page Header & 7 Studio Selector Tabs -->
          <div class="dsp-page-header">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
              <div>
                <h1 class="dsp-page-title"><i class="fa-solid fa-flask-vial" style="color:var(--color-primary);"></i> Clinical Studios Pro Suite</h1>
                <p class="dsp-page-subtitle">Phòng Lab Quyết định & Mô phỏng Lâm sàng Đồ họa Cao cấp (100% TypeScript & Pure SVG).</p>
              </div>

              <!-- 7 Studio Selector Tabs -->
              <div class="dsp-proto-tab-switcher" style="flex-wrap:wrap; gap:0.35rem;">
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'abg' ? 'is-active' : ''}" data-studio-tab="abg">
                  <i class="fa-solid fa-droplet" style="color:#ef4444;"></i> ABG Studio
                </button>
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'ecg' ? 'is-active' : ''}" data-studio-tab="ecg">
                  <i class="fa-solid fa-heart-pulse" style="color:#dc2626;"></i> ECG Pro Studio
                </button>
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'electrolyte' ? 'is-active' : ''}" data-studio-tab="electrolyte">
                  <i class="fa-solid fa-flask" style="color:#0284c7;"></i> Electrolyte & Fluid
                </button>
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'renal' ? 'is-active' : ''}" data-studio-tab="renal">
                  <i class="fa-solid fa-dna" style="color:#7c3aed;"></i> Renal & Dosing
                </button>
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'cardio' ? 'is-active' : ''}" data-studio-tab="cardio">
                  <i class="fa-solid fa-chart-pie" style="color:#ca8a04;"></i> Cardio Risk
                </button>
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'sepsis' ? 'is-active' : ''}" data-studio-tab="sepsis">
                  <i class="fa-solid fa-lungs-virus" style="color:#e11d48;"></i> Sepsis & Pneumonia
                </button>
                <button type="button" class="dsp-proto-tab-btn ${initialTab === 'cirrhosis' ? 'is-active' : ''}" data-studio-tab="cirrhosis">
                  <i class="fa-solid fa-disease" style="color:#b45309;"></i> Cirrhosis & Liver
                </button>
              </div>
            </div>
          </div>

          <!-- CONTAINER CHO 7 STUDIOS -->
          <div id="studioPanelsWrap">

            <!-- 1. ABG STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioAbg" style="display:${initialTab === 'abg' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#f59e0b;"></i> Ca Bệnh Mẫu Điển Hình (Quick Presets — 1-Click Load):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${ABG_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-abg-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-droplet" style="color:#ef4444;"></i> Bảng Nhập Thông Số Khí Máu & Sinh Hóa</h2>
                    </div>
                    <div style="padding:1.25rem;">
                      
                      <!-- Row 1: Core Triad -->
                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
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

                      <!-- Row 2: Oxygenation & Lactate -->
                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">PaO2</span>
                            <span class="dsp-spec-unit-badge">mmHg</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPao2" data-step="-5">−</button>
                            <input class="dsp-spec-input js-abg-input" type="number" id="abgPao2" value="75" step="1" min="20" max="600" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgPao2" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Chuẩn khí trời:</span>
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
                            <span class="dsp-spec-label">Lactate Máu</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgLactate" data-step="-0.2">−</button>
                            <input class="dsp-spec-input js-abg-input" type="number" id="abgLactate" value="1.8" step="0.1" min="0" max="30" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgLactate" data-step="0.2">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">&lt; 2.0</span>
                          </div>
                        </div>
                      </div>

                      <!-- Row 3: Electrolytes & Albumin for AG -->
                      <div class="dsp-spec-grid">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Natri (Na+)</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgNa" data-step="-1">−</button>
                            <input class="dsp-spec-input js-abg-input" type="number" id="abgNa" value="140" step="1" min="100" max="180" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgNa" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Chuẩn sinh lý:</span>
                            <span class="dsp-spec-ref">135 – 145</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Clo (Cl-)</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgCl" data-step="-1">−</button>
                            <input class="dsp-spec-input js-abg-input" type="number" id="abgCl" value="100" step="1" min="60" max="140" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgCl" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Chuẩn sinh lý:</span>
                            <span class="dsp-spec-ref">96 – 106</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Albumin Máu</span>
                            <span class="dsp-spec-unit-badge">g/dL</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgAlbumin" data-step="-0.1">−</button>
                            <input class="dsp-spec-input js-abg-input" type="number" id="abgAlbumin" value="4.0" step="0.1" min="1" max="6" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="abgAlbumin" data-step="0.1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Chuẩn sinh lý:</span>
                            <span class="dsp-spec-ref">3.5 – 5.0</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <!-- Davenport Graphic -->
                  <div class="dsp-card" style="margin-top:1.25rem;">
                    <div class="dsp-card-header">
                      <h3 class="dsp-card-title"><i class="fa-solid fa-chart-line" style="color:var(--color-primary);"></i> Biểu Đồ Toan Kiềm Davenport SVG (6 Vùng Màu Lâm Sàng)</h3>
                    </div>
                    <div id="abgDavenportContainer" style="padding:1rem;">
                      ${renderDavenportSvg(7.25, 26)}
                    </div>
                  </div>
                </div>

                <!-- ABG Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="abgResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 2. ECG STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioEcg" style="display:${initialTab === 'ecg' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#dc2626;"></i> Ca ECG Mẫu Điển Hình (Quick Presets):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${ECG_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-ecg-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-heart-pulse" style="color:#dc2626;"></i> Thông Số 12 Chuyển Đạo & Trục Điện Tim</h2>
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
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgHr" value="80" min="20" max="300" />
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
                              <option value="sinus">Nhịp xoang (Sinus Rhythm)</option>
                              <option value="afib">Rung nhĩ (Atrial Fibrillation)</option>
                              <option value="aflutter">Cuồng nhĩ (Atrial Flutter)</option>
                              <option value="svt">Nhịp nhanh trên thất (SVT)</option>
                              <option value="vt">Nhịp nhanh thất (VT)</option>
                              <option value="pacing">Nhịp máy tạo nhịp (Paced)</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Sóng P &amp; RR:</span>
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
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgQt" value="400" min="200" max="800" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgQt" data-step="10">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>QTc an toàn:</span>
                            <span class="dsp-spec-ref">&lt; 440 – 460</span>
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
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgLead1" value="6" step="0.5" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgLead1" data-step="0.5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Góc 0° trục hoành:</span>
                            <span class="dsp-spec-ref">DI &gt; 0: Trục hướng trái</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Biên độ Chuyển đạo aVF (R − S)</span>
                            <span class="dsp-spec-unit-badge">mm</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgAvf" data-step="-0.5">−</button>
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgAvf" value="-5" step="0.5" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgAvf" data-step="0.5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Góc +90° trục tung:</span>
                            <span class="dsp-spec-ref">aVF &gt; 0: Trục hướng dưới</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Khoảng PR</span>
                            <span class="dsp-spec-unit-badge">ms</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgPr" data-step="-10">−</button>
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgPr" value="160" min="60" max="400" />
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
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgQrs" value="90" min="40" max="250" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgQrs" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">&lt; 120 ms</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Sóng RaVL</span>
                            <span class="dsp-spec-unit-badge">mm</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgRaVL" data-step="-1">−</button>
                            <input class="dsp-spec-input js-ecg-input" type="number" id="ecgRaVL" value="8" min="0" max="40" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="ecgRaVL" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Dày thất trái:</span>
                            <span class="dsp-spec-ref">&gt; 11 mm</span>
                          </div>
                        </div>
                      </div>

                      <!-- Sgarbossa Checkbox Section -->
                      <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; padding:1rem; margin-top:0.5rem;">
                        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
                          <input type="checkbox" id="ecgHasLbbb" class="js-ecg-input" style="width:16px; height:16px;" />
                          <label for="ecgHasLbbb" style="font-weight:800; cursor:pointer; color:var(--color-text);">Bệnh nhân có Block Nhánh Trái (LBBB) hoặc Nhịp máy tạo nhịp</label>
                        </div>
                        <div id="ecgSgarbossaWrap" style="display:none; padding-left:1.5rem; flex-direction:column; gap:0.45rem;">
                          <label style="font-size:12px; font-weight:600; display:flex; align-items:center; gap:8px; cursor:pointer;">
                            <input type="checkbox" id="sg1" class="js-ecg-input" /> ST chênh lên ≥ 1mm cùng hướng QRS (5 điểm — Độ đặc hiệu 98%)
                          </label>
                          <label style="font-size:12px; font-weight:600; display:flex; align-items:center; gap:8px; cursor:pointer;">
                            <input type="checkbox" id="sg2" class="js-ecg-input" /> ST chênh xuống ≥ 1mm ở V1, V2 hoặc V3 (3 điểm)
                          </label>
                          <label style="font-size:12px; font-weight:600; display:flex; align-items:center; gap:8px; cursor:pointer;">
                            <input type="checkbox" id="sg3" class="js-ecg-input" /> ST chênh lên ≥ 5mm ngược hướng QRS (2 điểm)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- ECG Axis SVG Vector Compass -->
                  <div class="dsp-card" style="margin-top:1.25rem;">
                    <div class="dsp-card-header">
                      <h3 class="dsp-card-title"><i class="fa-solid fa-compass" style="color:#ef4444;"></i> Vòng Tròn Trục Điện Tim Vector 360° SVG</h3>
                    </div>
                    <div id="ecgAxisSvgContainer" style="padding:1rem; display:flex; justify-content:center;">
                      ${renderEcgAxisSvg(-40)}
                    </div>
                  </div>
                </div>

                <!-- ECG Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="ecgResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. ELECTROLYTE STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioElectrolyte" style="display:${initialTab === 'electrolyte' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#0284c7;"></i> Ca Rối Loạn Điện Giải Mẫu (Quick Presets):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${ELYTE_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-elyte-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-flask" style="color:#0284c7;"></i> Bảng Tính Toán Điện Giải &amp; Nước Cơ Thể</h2>
                    </div>
                    <div style="padding:1.25rem;">
                      
                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Rối Loạn Cần Tính</span>
                            <span class="dsp-spec-unit-badge">Mode</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-elyte-input" id="elyteMode" style="font-weight:700;">
                              <option value="hyponatremia">Hạ Natri máu (Hyponatremia)</option>
                              <option value="hypernatremia">Tăng Natri máu (Hypernatremia - FWD)</option>
                              <option value="hypokalemia">Hạ Kali máu (Hypokalemia)</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Công thức:</span>
                            <span class="dsp-spec-ref">Adrogué-Madias</span>
                          </div>
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
                          <div class="dsp-spec-range">
                            <span>TBW ước tính:</span>
                            <span class="dsp-spec-ref">50 – 60% thể trọng</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Giới Tính</span>
                            <span class="dsp-spec-unit-badge">Gender</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-elyte-input" id="elyteGender" style="font-weight:700;">
                              <option value="male">Nam giới</option>
                              <option value="female">Nữ giới</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Hệ số nước TBW:</span>
                            <span class="dsp-spec-ref">0.6 (Nam) / 0.5 (Nữ)</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-droplet" style="color:#0284c7;"></i> Natri (Na+) Máu</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteNa" data-step="-1">−</button>
                            <input class="dsp-spec-input js-elyte-input" type="number" id="elyteNa" value="118" min="90" max="190" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteNa" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">135 – 145 mmol/L</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Đường Huyết (Glucose)</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteGlucose" data-step="-0.5">−</button>
                            <input class="dsp-spec-input js-elyte-input" type="number" id="elyteGlucose" value="5.6" min="1" max="60" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="elyteGlucose" data-step="0.5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Hiệu chỉnh Katz:</span>
                            <span class="dsp-spec-ref">+1.6 mỗi 5.6 mmol/L đường</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Dung Dịch Bù Dự Kiến</span>
                            <span class="dsp-spec-unit-badge">Infusate</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-elyte-input" id="elyteInfusate" style="font-weight:700;">
                              <option value="nacl_3">Natri Clorid 3% (513 mEq/L)</option>
                              <option value="nacl_09">Natri Clorid 0.9% (154 mEq/L)</option>
                              <option value="ringer">Ringer Lactate (130 mEq/L)</option>
                              <option value="d5w">Glucose 5% (0 mEq/L)</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Ưu tiên cấp cứu:</span>
                            <span class="dsp-spec-ref">NaCl 3%</span>
                          </div>
                        </div>
                      </div>

                      <div style="background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.25); border-radius:10px; padding:0.85rem 1rem; display:flex; align-items:center; gap:0.6rem;">
                        <input type="checkbox" id="elyteSevere" class="js-elyte-input" style="width:16px; height:16px;" />
                        <label for="elyteSevere" style="font-weight:800; color:#dc2626; cursor:pointer; font-size:12.5px;">
                          <i class="fa-solid fa-triangle-exclamation"></i> Có triệu chứng thần kinh cấp nguy hiểm (Co giật, hôn mê, lơ mơ do phù não)
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Timeline Fluid Chart -->
                  <div class="dsp-card" style="margin-top:1.25rem;">
                    <div class="dsp-card-header">
                      <h3 class="dsp-card-title"><i class="fa-solid fa-clock-rotate-left" style="color:#0284c7;"></i> Lộ Trình Bù Dịch An Toàn (Fluid Timeline 0h - 48h SVG)</h3>
                    </div>
                    <div id="elyteTimelineContainer" style="padding:1rem;">
                      ${renderFluidTimelineSvg(118, 130, 42)}
                    </div>
                  </div>
                </div>

                <!-- Electrolyte Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="elyteResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. RENAL & DOSING STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioRenal" style="display:${initialTab === 'renal' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#7c3aed;"></i> Ca Bệnh Thận Mẫu (Quick Presets):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${RENAL_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-renal-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-dna" style="color:#7c3aed;"></i> Bảng Nhập Chức Năng Thận &amp; Thể Trọng</h2>
                    </div>
                    <div style="padding:1.25rem;">
                      
                      <div class="dsp-spec-grid">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Tuổi Bệnh Nhân</span>
                            <span class="dsp-spec-unit-badge">tuổi</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalAge" data-step="-1">−</button>
                            <input class="dsp-spec-input js-renal-input" type="number" id="renalAge" value="65" min="18" max="110" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalAge" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>CKD-EPI 2021:</span>
                            <span class="dsp-spec-ref">Chuẩn hóa theo tuổi</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Giới Tính</span>
                            <span class="dsp-spec-unit-badge">Gender</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-renal-input" id="renalGender" style="font-weight:700;">
                              <option value="male">Nam</option>
                              <option value="female">Nữ</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Hệ số nữ:</span>
                            <span class="dsp-spec-ref">x 1.012 (CKD-EPI)</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Cân Nặng</span>
                            <span class="dsp-spec-unit-badge">kg</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalWeight" data-step="-1">−</button>
                            <input class="dsp-spec-input js-renal-input" type="number" id="renalWeight" value="60" min="25" max="250" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalWeight" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Cockcroft-Gault:</span>
                            <span class="dsp-spec-ref">Tính CrCl thực tế</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-vial" style="color:#7c3aed;"></i> Creatinine Huyết Thanh</span>
                            <span class="dsp-spec-unit-badge">umol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalCreatinine" data-step="-5">−</button>
                            <input class="dsp-spec-input js-renal-input" type="number" id="renalCreatinine" value="180" min="30" max="1500" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="renalCreatinine" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">60 – 110 umol/L</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <!-- Drug Dosing Table -->
                  <div class="dsp-card" style="margin-top:1.25rem;">
                    <div class="dsp-card-header">
                      <h3 class="dsp-card-title"><i class="fa-solid fa-pills" style="color:var(--color-primary);"></i> Gợi Ý Hiệu Chỉnh Liều Tự Động Theo Mức Lọc Cầu Thận</h3>
                    </div>
                    <div id="renalDrugTableContainer" style="padding:1rem;">
                      <!-- Rendered via JS -->
                    </div>
                  </div>
                </div>

                <!-- Renal Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="renalResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 5. CARDIO RISK STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioCardio" style="display:${initialTab === 'cardio' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#ca8a04;"></i> Ca Tim Mạch &amp; Lipid Mẫu (Quick Presets):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${CARDIO_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-cardio-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-chart-pie" style="color:#ca8a04;"></i> Bảng Nhập Nguy Cơ Tim Mạch &amp; Bilan Lipid</h2>
                    </div>
                    <div style="padding:1.25rem;">
                      
                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Tuổi</span>
                            <span class="dsp-spec-unit-badge">tuổi</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crAge" data-step="-1">−</button>
                            <input class="dsp-spec-input js-cardio-input" type="number" id="crAge" value="58" min="20" max="90" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crAge" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Thang SCORE2:</span>
                            <span class="dsp-spec-ref">40 – 89 tuổi</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Giới Tính</span>
                            <span class="dsp-spec-unit-badge">Gender</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-cardio-input" id="crGender" style="font-weight:700;">
                              <option value="male">Nam</option>
                              <option value="female">Nữ</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Nguy cơ giới:</span>
                            <span class="dsp-spec-ref">Nam &gt; Nữ</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-gauge-high" style="color:#dc2626;"></i> Huyết Áp Tâm Thu</span>
                            <span class="dsp-spec-unit-badge">mmHg</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crSbp" data-step="-5">−</button>
                            <input class="dsp-spec-input js-cardio-input" type="number" id="crSbp" value="145" min="80" max="240" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crSbp" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Mục tiêu HA:</span>
                            <span class="dsp-spec-ref">&lt; 130 mmHg</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Cholesterol Toàn Phần</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crChol" data-step="-0.1">−</button>
                            <input class="dsp-spec-input js-cardio-input" type="number" id="crChol" value="5.8" step="0.1" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crChol" data-step="0.1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Mục tiêu:</span>
                            <span class="dsp-spec-ref">&lt; 5.2 mmol/L</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">HDL-C (Mỡ Tốt)</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crHdl" data-step="-0.1">−</button>
                            <input class="dsp-spec-input js-cardio-input" type="number" id="crHdl" value="1.1" step="0.1" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crHdl" data-step="0.1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bảo vệ tim:</span>
                            <span class="dsp-spec-ref">&gt; 1.0 (Nam) / &gt; 1.2 (Nữ)</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-bullseye" style="color:#ca8a04;"></i> LDL-C Hiện Tại</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crLdl" data-step="-0.1">−</button>
                            <input class="dsp-spec-input js-cardio-input" type="number" id="crLdl" value="3.6" step="0.1" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="crLdl" data-step="0.1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Đích theo phân tầng:</span>
                            <span class="dsp-spec-ref">&lt; 1.4 – 2.6</span>
                          </div>
                        </div>
                      </div>

                      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.5rem; background:var(--color-bg); padding:0.85rem; border-radius:10px; border:1px solid var(--color-border);">
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="crSmoker" class="js-cardio-input" checked style="width:16px; height:16px;" /> Đang hút thuốc lá
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="crDiabetes" class="js-cardio-input" style="width:16px; height:16px;" /> Đái tháo đường
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="crCvd" class="js-cardio-input" style="width:16px; height:16px;" /> Tiền sử NMCT/Đột quỵ (ASCVD)
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="crCkd" class="js-cardio-input" style="width:16px; height:16px;" /> Bệnh thận mạn (CKD)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Cardio Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="cardioResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 6. SEPSIS & PNEUMONIA STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioSepsis" style="display:${initialTab === 'sepsis' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#e11d48;"></i> Ca Nhiễm Khuẩn &amp; Viêm Phổi Mẫu (Quick Presets):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${SEPSIS_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-sepsis-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-lungs-virus" style="color:#e11d48;"></i> Bảng Nhập Thông Số Sốc Nhiễm Khuẩn &amp; Viêm Phổi</h2>
                    </div>
                    <div style="padding:1.25rem;">
                      
                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-wind" style="color:#0284c7;"></i> Nhịp Thở</span>
                            <span class="dsp-spec-unit-badge">lần/phút</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepRr" data-step="-1">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepRr" value="28" min="8" max="60" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepRr" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>qSOFA ≥ 22 / CURB ≥ 30:</span>
                            <span class="dsp-spec-ref">Chuẩn: 12 – 20</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-heart-crack" style="color:#dc2626;"></i> HA Tâm Thu / Trương</span>
                            <span class="dsp-spec-unit-badge">mmHg</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepSbp" value="82" min="40" max="250" placeholder="Tâm thu" />
                            <span style="font-weight:800; color:var(--color-text-muted);">/</span>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepDbp" value="45" min="20" max="140" placeholder="Tâm trương" />
                          </div>
                          <div class="dsp-spec-range">
                            <span>Tụt HA Sốc:</span>
                            <span class="dsp-spec-ref">SBP ≤ 100 / MAP &lt; 65</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-brain" style="color:#8b5cf6;"></i> Tri Giác (Glasgow GCS)</span>
                            <span class="dsp-spec-unit-badge">điểm</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepGcs" data-step="-1">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepGcs" value="13" min="3" max="15" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepGcs" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">15 điểm</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Chỉ Số P/F (PaO2/FiO2)</span>
                            <span class="dsp-spec-unit-badge">mmHg</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepPf" data-step="-10">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepPf" value="220" min="40" max="600" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepPf" data-step="10">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>ARDS / Suy hô hấp:</span>
                            <span class="dsp-spec-ref">Chuẩn &gt; 300</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Tiểu Cầu (Platelets)</span>
                            <span class="dsp-spec-unit-badge">G/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepPlt" data-step="-10">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepPlt" value="85" min="5" max="800" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepPlt" data-step="10">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Giảm tiểu cầu SOFA:</span>
                            <span class="dsp-spec-ref">Chuẩn: 150 – 400</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> Lactate Máu</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepLactate" data-step="-0.5">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepLactate" value="4.8" step="0.1" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepLactate" data-step="0.5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Sốc nhiễm khuẩn:</span>
                            <span class="dsp-spec-ref">&gt; 2.0 – 4.0 mmol/L</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Bilirubin Toàn Phần</span>
                            <span class="dsp-spec-unit-badge">umol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepBili" data-step="-2">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepBili" value="38" min="2" max="600" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepBili" data-step="2">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">&lt; 20 umol/L</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Creatinine Máu</span>
                            <span class="dsp-spec-unit-badge">umol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepCreat" data-step="-10">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepCreat" value="240" min="30" max="1200" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepCreat" data-step="10">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Bình thường:</span>
                            <span class="dsp-spec-ref">60 – 110 umol/L</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Tuổi</span>
                            <span class="dsp-spec-unit-badge">tuổi</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepAge" data-step="-1">−</button>
                            <input class="dsp-spec-input js-sepsis-input" type="number" id="sepAge" value="62" min="18" max="110" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="sepAge" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>CURB-65 / SMART-COP:</span>
                            <span class="dsp-spec-ref">≥ 65 tuổi</span>
                          </div>
                        </div>
                      </div>

                      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.5rem; background:var(--color-bg); padding:0.85rem; border-radius:10px; border:1px solid var(--color-border);">
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="sepVasopressor" class="js-sepsis-input" checked style="width:16px; height:16px;" /> Cần thuốc vận mạch (Noradrenaline)
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="sepPseudomonas" class="js-sepsis-input" checked style="width:16px; height:16px;" /> Nguy cơ Trực khuẩn mủ xanh (Pseudomonas)
                        </label>
                        <label style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; cursor:pointer;">
                          <input type="checkbox" id="sepMrsa" class="js-sepsis-input" style="width:16px; height:16px;" /> Nguy cơ Tụ cầu vàng kháng Methicillin (MRSA)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sepsis Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="sepsisResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

            <!-- 7. CIRRHOSIS & LIVER STUDIO PANEL -->
            <div class="js-studio-panel" id="panelStudioCirrhosis" style="display:${initialTab === 'cirrhosis' ? 'block' : 'none'};">
              <!-- Quick Case Presets Bar -->
              <div class="dsp-card" style="margin-bottom:1.25rem; padding:0.85rem 1.25rem;">
                <div style="font-size:12px; font-weight:800; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.4rem;">
                  <i class="fa-solid fa-bolt" style="color:#b45309;"></i> Ca Gan Mật &amp; Xơ Gan Mẫu (Quick Presets):
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                  ${CIRRHOSIS_PRESETS.map(p => `
                    <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-cirrhosis-preset-btn" data-preset-id="${p.id}" style="font-size:11.5px; border-radius:20px; padding:5px 14px; background:var(--color-bg); border-color:var(--color-border);">
                      <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${p.badgeColor}; margin-right:5px;"></span>
                      <strong>${escapeHtml(p.name)}</strong>
                    </button>
                  `).join('')}
                </div>
              </div>

              <div class="dsp-two-col">
                <div class="dsp-col-main">
                  <div class="dsp-card">
                    <div class="dsp-card-header">
                      <h2 class="dsp-card-title"><i class="fa-solid fa-disease" style="color:#b45309;"></i> Bảng Nhập Đánh Giá Xơ Gan: Child-Pugh, MELD-Na, FIB-4 &amp; ALBI</h2>
                    </div>
                    <div style="padding:1.25rem;">
                      
                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label"><i class="fa-solid fa-droplet" style="color:#f59e0b;"></i> Bilirubin Toàn Phần</span>
                            <span class="dsp-spec-unit-badge">umol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrBili" data-step="-5">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrBili" value="85" min="2" max="800" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrBili" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Child-Pugh:</span>
                            <span class="dsp-spec-ref">&lt; 34 / 34-51 / &gt; 51</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Albumin Máu</span>
                            <span class="dsp-spec-unit-badge">g/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAlb" data-step="-1">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrAlb" value="24" min="10" max="60" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAlb" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Child-Pugh:</span>
                            <span class="dsp-spec-ref">&gt; 35 / 28-35 / &lt; 28</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">INR Đông Máu</span>
                            <span class="dsp-spec-unit-badge">INR</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrInr" data-step="-0.1">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrInr" value="2.1" step="0.1" min="0.8" max="10" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrInr" data-step="0.1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Child-Pugh:</span>
                            <span class="dsp-spec-ref">&lt; 1.7 / 1.7-2.2 / &gt; 2.2</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Creatinine Máu</span>
                            <span class="dsp-spec-unit-badge">umol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrCreat" data-step="-10">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrCreat" value="180" min="30" max="1200" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrCreat" data-step="10">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>MELD-Na 2016:</span>
                            <span class="dsp-spec-ref">Hội chứng Gan Thận HRS</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Natri (Na+) Máu</span>
                            <span class="dsp-spec-unit-badge">mmol/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrNa" data-step="-1">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrNa" value="124" min="100" max="170" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrNa" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Hạ Na máu xơ gan:</span>
                            <span class="dsp-spec-ref">Tăng điểm MELD-Na</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Tiểu Cầu (FIB-4)</span>
                            <span class="dsp-spec-unit-badge">G/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrPlt" data-step="-10">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrPlt" value="65" min="5" max="800" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrPlt" data-step="10">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Lách to tăng áp cửa:</span>
                            <span class="dsp-spec-ref">Tiểu cầu &lt; 100 G/L</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid" style="margin-bottom:0.85rem;">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">AST / GOT</span>
                            <span class="dsp-spec-unit-badge">U/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAst" data-step="-5">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrAst" value="95" min="5" max="1000" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAst" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>FIB-4 Index:</span>
                            <span class="dsp-spec-ref">Tỷ số AST/ALT</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">ALT / GPT</span>
                            <span class="dsp-spec-unit-badge">U/L</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAlt" data-step="-5">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrAlt" value="60" min="5" max="1000" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAlt" data-step="5">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Men gan ALT:</span>
                            <span class="dsp-spec-ref">Chuẩn: &lt; 35 U/L</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Tuổi</span>
                            <span class="dsp-spec-unit-badge">tuổi</span>
                          </div>
                          <div class="dsp-spec-input-wrap">
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAge" data-step="-1">−</button>
                            <input class="dsp-spec-input js-cirr-input" type="number" id="cirrAge" value="56" min="18" max="100" />
                            <button type="button" class="dsp-spec-step-btn js-step-btn" data-target="cirrAge" data-step="1">+</button>
                          </div>
                          <div class="dsp-spec-range">
                            <span>FIB-4 Index:</span>
                            <span class="dsp-spec-ref">Hệ số tuổi</span>
                          </div>
                        </div>
                      </div>

                      <div class="dsp-spec-grid">
                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Mức Độ Cổ Trướng (Báng Bụng)</span>
                            <span class="dsp-spec-unit-badge">Ascites</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-cirr-input" id="cirrAscites" style="font-weight:700;">
                              <option value="none">Không có cổ trướng (1 điểm)</option>
                              <option value="mild">Cổ trướng nhẹ / lượng ít (2 điểm)</option>
                              <option value="moderate_severe" selected>Cổ trướng vừa đến nhiều / căng (3 điểm)</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Thăm khám / Siêu âm:</span>
                            <span class="dsp-spec-ref">Child-Pugh</span>
                          </div>
                        </div>

                        <div class="dsp-spec-tile">
                          <div class="dsp-spec-header">
                            <span class="dsp-spec-label">Bệnh Não Gan (Hôn Mê Gan)</span>
                            <span class="dsp-spec-unit-badge">Encephalopathy</span>
                          </div>
                          <div style="padding:0.25rem 0;">
                            <select class="dsp-select js-cirr-input" id="cirrEnceph" style="font-weight:700;">
                              <option value="none">Không có bệnh não gan (1 điểm)</option>
                              <option value="grade_1_2" selected>Độ 1 - 2: Rối loạn giấc ngủ, lơ mơ nhẹ (2 điểm)</option>
                              <option value="grade_3_4">Độ 3 - 4: Lú lẫn nặng, hôn mê (3 điểm)</option>
                            </select>
                          </div>
                          <div class="dsp-spec-range">
                            <span>Tiêu chuẩn West Haven:</span>
                            <span class="dsp-spec-ref">Child-Pugh</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <!-- Cirrhosis Results Column -->
                <div class="dsp-col-side">
                  <div class="dsp-card" id="cirrhosisResultCard">
                    <!-- Rendered dynamic via JS -->
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  `;
}

export function mountStudiosController(profileId: string): void {
  // 1. Tab switching
  const tabBtns = document.querySelectorAll<HTMLElement>('[data-studio-tab]');
  const panels = document.querySelectorAll<HTMLElement>('.js-studio-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const targetTab = btn.getAttribute('data-studio-tab');
      panels.forEach(p => p.style.display = 'none');

      if (targetTab === 'abg') {
        const p = document.getElementById('panelStudioAbg');
        if (p) p.style.display = 'block';
        recalcAbg();
      } else if (targetTab === 'ecg') {
        const p = document.getElementById('panelStudioEcg');
        if (p) p.style.display = 'block';
        recalcEcg();
      } else if (targetTab === 'electrolyte') {
        const p = document.getElementById('panelStudioElectrolyte');
        if (p) p.style.display = 'block';
        recalcElectrolyte();
      } else if (targetTab === 'renal') {
        const p = document.getElementById('panelStudioRenal');
        if (p) p.style.display = 'block';
        recalcRenal();
      } else if (targetTab === 'cardio') {
        const p = document.getElementById('panelStudioCardio');
        if (p) p.style.display = 'block';
        recalcCardio();
      } else if (targetTab === 'sepsis') {
        const p = document.getElementById('panelStudioSepsis');
        if (p) p.style.display = 'block';
        recalcSepsis();
      } else if (targetTab === 'cirrhosis') {
        const p = document.getElementById('panelStudioCirrhosis');
        if (p) p.style.display = 'block';
        recalcCirrhosis();
      }
    });
  });

  // 1.1 Stepper buttons [-] / [+] handler
  document.querySelectorAll<HTMLButtonElement>('.js-step-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const stepVal = parseFloat(btn.getAttribute('data-step') || '0');
      if (!targetId || isNaN(stepVal)) return;

      const input = document.getElementById(targetId) as HTMLInputElement;
      if (!input) return;

      let currentVal = parseFloat(input.value) || 0;
      let min = input.min !== '' ? parseFloat(input.min) : -Infinity;
      let max = input.max !== '' ? parseFloat(input.max) : Infinity;

      let newVal = currentVal + stepVal;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;

      // Giữ số chữ số thập phân phù hợp
      if (Math.abs(stepVal) < 1) {
        input.value = (Math.round(newVal * 100) / 100).toFixed(stepVal.toString().split('.')[1]?.length || 2);
      } else {
        input.value = Math.round(newVal).toString();
      }

      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });

  // 2. ABG Controller & Sliders Sync & Presets
  const abgPhInput = document.getElementById('abgPh') as HTMLInputElement;
  const abgPaco2Input = document.getElementById('abgPaco2') as HTMLInputElement;
  const abgHco3Input = document.getElementById('abgHco3') as HTMLInputElement;
  const sliderAbgPh = document.getElementById('sliderAbgPh') as HTMLInputElement;
  const sliderAbgPaco2 = document.getElementById('sliderAbgPaco2') as HTMLInputElement;
  const sliderAbgHco3 = document.getElementById('sliderAbgHco3') as HTMLInputElement;

  sliderAbgPh?.addEventListener('input', () => { if (abgPhInput) abgPhInput.value = sliderAbgPh.value; recalcAbg(); });
  sliderAbgPaco2?.addEventListener('input', () => { if (abgPaco2Input) abgPaco2Input.value = sliderAbgPaco2.value; recalcAbg(); });
  sliderAbgHco3?.addEventListener('input', () => { if (abgHco3Input) abgHco3Input.value = sliderAbgHco3.value; recalcAbg(); });

  document.querySelectorAll<HTMLElement>('.js-abg-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = ABG_PRESETS.find(p => p.id === id);
      if (preset) {
        if (abgPhInput) abgPhInput.value = String(preset.values.ph);
        if (sliderAbgPh) sliderAbgPh.value = String(preset.values.ph);
        if (abgPaco2Input) abgPaco2Input.value = String(preset.values.paco2);
        if (sliderAbgPaco2) sliderAbgPaco2.value = String(preset.values.paco2);
        if (abgHco3Input) abgHco3Input.value = String(preset.values.hco3);
        if (sliderAbgHco3) sliderAbgHco3.value = String(preset.values.hco3);
        (document.getElementById('abgPao2') as HTMLInputElement).value = String(preset.values.pao2 || 80);
        (document.getElementById('abgFio2') as HTMLInputElement).value = String(preset.values.fio2 || 21);
        (document.getElementById('abgNa') as HTMLInputElement).value = String(preset.values.na || 140);
        (document.getElementById('abgCl') as HTMLInputElement).value = String(preset.values.cl || 100);
        (document.getElementById('abgAlbumin') as HTMLInputElement).value = String(preset.values.albumin || 4.0);
        (document.getElementById('abgLactate') as HTMLInputElement).value = String(preset.values.lactate || 1.5);
        recalcAbg();
      }
    });
  });

  const recalcAbg = () => {
    const ph = parseFloat(abgPhInput?.value) || 7.25;
    const paco2 = parseFloat(abgPaco2Input?.value) || 60;
    const hco3 = parseFloat(abgHco3Input?.value) || 26;
    const pao2 = parseFloat((document.getElementById('abgPao2') as HTMLInputElement)?.value) || undefined;
    const fio2 = parseFloat((document.getElementById('abgFio2') as HTMLInputElement)?.value) || 21;
    const lactate = parseFloat((document.getElementById('abgLactate') as HTMLInputElement)?.value) || undefined;
    const na = parseFloat((document.getElementById('abgNa') as HTMLInputElement)?.value) || undefined;
    const cl = parseFloat((document.getElementById('abgCl') as HTMLInputElement)?.value) || undefined;
    const albumin = parseFloat((document.getElementById('abgAlbumin') as HTMLInputElement)?.value) || 4.0;

    const res = analyzeAbg({ ph, paco2, hco3, pao2, fio2, lactate, na, cl, albumin });

    const dPh = document.getElementById('abgPhDisplay'); if (dPh) dPh.textContent = ph.toFixed(2);
    const dCo2 = document.getElementById('abgPaco2Display'); if (dCo2) dCo2.textContent = String(paco2);
    const dHco3 = document.getElementById('abgHco3Display'); if (dHco3) dHco3.textContent = String(hco3);

    const svgContainer = document.getElementById('abgDavenportContainer');
    if (svgContainer) svgContainer.innerHTML = renderDavenportSvg(ph, hco3);

    const resultCard = document.getElementById('abgResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-square-poll-vertical" style="color:var(--color-primary);"></i> Kết Quả Phân Tích ABG</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="background:rgba(2,132,199,0.1); border-left:4px solid var(--color-primary); padding:1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase;">Rối loạn nguyên phát:</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--color-text); margin-top:0.25rem;">${escapeHtml(res.primaryDisorder)}</div>
            <div style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.25rem;">${escapeHtml(res.compensationStatus)}</div>
          </div>

          ${res.anionGapCorrected !== null ? `
            <div style="font-size:0.88rem; margin-bottom:0.5rem;">
              <strong>Anion Gap (hiệu chỉnh):</strong> <span class="dsp-badge dsp-badge--info">${res.anionGapCorrected.toFixed(1)} mmol/L</span>
            </div>
          ` : ''}

          ${res.deltaRatioInterpretation ? `
            <div style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:0.5rem; background:var(--color-bg); padding:0.5rem; border-radius:6px;">
              <strong>Delta Ratio (${res.deltaRatio?.toFixed(2)}):</strong> ${escapeHtml(res.deltaRatioInterpretation)}
            </div>
          ` : ''}

          ${res.oxygenationStatus ? `
            <div style="font-size:0.88rem; margin-bottom:0.75rem;">
              <strong>Oxy hóa máu (P/F):</strong> <span style="font-weight:700; color:var(--color-primary);">${escapeHtml(res.oxygenationStatus)}</span>
            </div>
          ` : ''}

          ${res.recommendations.length > 0 ? `
            <div style="background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:6px; padding:0.75rem; font-size:0.82rem; margin-bottom:1rem;">
              <div style="font-weight:700; color:#f59e0b; margin-bottom:0.35rem;"><i class="fa-solid fa-lightbulb"></i> Khuyến cáo lâm sàng:</div>
              <ul style="margin:0; padding-left:1.25rem;">
                ${res.recommendations.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="display:flex; gap:0.5rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-abg-input').forEach(i => i.addEventListener('input', recalcAbg));

  // 3. ECG Controller & Presets
  document.querySelectorAll<HTMLElement>('.js-ecg-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = ECG_PRESETS.find(p => p.id === id);
      if (preset) {
        (document.getElementById('ecgHr') as HTMLInputElement).value = String(preset.values.heartRate);
        (document.getElementById('ecgRhythm') as HTMLSelectElement).value = preset.values.rhythmType;
        (document.getElementById('ecgLead1') as HTMLInputElement).value = String(preset.values.lead1Net);
        (document.getElementById('ecgAvf') as HTMLInputElement).value = String(preset.values.avfNet);
        (document.getElementById('ecgPr') as HTMLInputElement).value = String(preset.values.prInterval || 160);
        (document.getElementById('ecgQrs') as HTMLInputElement).value = String(preset.values.qrsDuration || 90);
        (document.getElementById('ecgQt') as HTMLInputElement).value = String(preset.values.qtInterval || 400);
        (document.getElementById('ecgRaVL') as HTMLInputElement).value = String(preset.values.raVL || 8);
        (document.getElementById('ecgHasLbbb') as HTMLInputElement).checked = !!preset.values.hasLbbb;
        (document.getElementById('sg1') as HTMLInputElement).checked = !!preset.values.sgarbossaConcordantStElevation;
        (document.getElementById('sg2') as HTMLInputElement).checked = !!preset.values.sgarbossaConcordantStDepressionV1V3;
        (document.getElementById('sg3') as HTMLInputElement).checked = !!preset.values.sgarbossaExcessiveDiscordant;
        recalcEcg();
      }
    });
  });

  const recalcEcg = () => {
    const heartRate = parseFloat((document.getElementById('ecgHr') as HTMLInputElement)?.value) || 80;
    const rhythmType = ((document.getElementById('ecgRhythm') as HTMLSelectElement)?.value || 'sinus') as any;
    const lead1Net = parseFloat((document.getElementById('ecgLead1') as HTMLInputElement)?.value) || 6;
    const avfNet = parseFloat((document.getElementById('ecgAvf') as HTMLInputElement)?.value) || -5;
    const prInterval = parseFloat((document.getElementById('ecgPr') as HTMLInputElement)?.value) || undefined;
    const qrsDuration = parseFloat((document.getElementById('ecgQrs') as HTMLInputElement)?.value) || undefined;
    const qtInterval = parseFloat((document.getElementById('ecgQt') as HTMLInputElement)?.value) || undefined;
    const raVL = parseFloat((document.getElementById('ecgRaVL') as HTMLInputElement)?.value) || 0;
    const hasLbbb = (document.getElementById('ecgHasLbbb') as HTMLInputElement)?.checked;
    const sgarbossaConcordantStElevation = (document.getElementById('sg1') as HTMLInputElement)?.checked;
    const sgarbossaConcordantStDepressionV1V3 = (document.getElementById('sg2') as HTMLInputElement)?.checked;
    const sgarbossaExcessiveDiscordant = (document.getElementById('sg3') as HTMLInputElement)?.checked;

    const res = analyzeEcg({
      heartRate, rhythmType, lead1Net, avfNet, prInterval, qrsDuration, qtInterval, raVL,
      hasLbbb, sgarbossaConcordantStElevation, sgarbossaConcordantStDepressionV1V3, sgarbossaExcessiveDiscordant
    });

    const svgContainer = document.getElementById('ecgAxisSvgContainer');
    if (svgContainer) svgContainer.innerHTML = renderEcgAxisSvg(res.axisAngleDegree);

    const sgWrap = document.getElementById('ecgSgarbossaWrap');
    if (sgWrap) sgWrap.style.display = hasLbbb ? 'flex' : 'none';

    const resultCard = document.getElementById('ecgResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-heart-pulse" style="color:#dc2626;"></i> Kết Quả Phân Tích ECG</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="background:rgba(220,38,38,0.08); border-left:4px solid ${res.axisColor}; padding:1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Trục điện tim (Góc α):</div>
            <div style="font-size:1.15rem; font-weight:800; color:${res.axisColor}; margin-top:0.25rem;">
              ${res.axisAngleDegree > 0 ? `+${res.axisAngleDegree}` : res.axisAngleDegree}° — ${escapeHtml(res.axisClassification)}
            </div>
          </div>

          ${res.qtcBazett ? `
            <div style="font-size:0.88rem; margin-bottom:0.5rem;">
              <strong>QTc Bazett:</strong> <span class="dsp-badge dsp-badge--info">${res.qtcBazett} ms</span> (Fridericia: ${res.qtcFridericia} ms)
            </div>
            <div style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:0.75rem;">
              ${escapeHtml(res.qtcInterpretation || '')}
            </div>
          ` : ''}

          ${res.sgarbossaInterpretation ? `
            <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:0.75rem; font-size:0.85rem; margin-bottom:0.75rem;">
              ${escapeHtml(res.sgarbossaInterpretation)}
            </div>
          ` : ''}

          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-ecg-input').forEach(i => i.addEventListener('input', recalcEcg));

  // 4. Electrolyte Controller & Presets
  document.querySelectorAll<HTMLElement>('.js-elyte-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = ELYTE_PRESETS.find(p => p.id === id);
      if (preset) {
        (document.getElementById('elyteMode') as HTMLSelectElement).value = preset.values.mode;
        (document.getElementById('elyteWeight') as HTMLInputElement).value = String(preset.values.weightKg);
        (document.getElementById('elyteGender') as HTMLSelectElement).value = preset.values.gender;
        (document.getElementById('elyteNa') as HTMLInputElement).value = String(preset.values.serumNa);
        (document.getElementById('elyteGlucose') as HTMLInputElement).value = String(preset.values.glucoseMmol || 5.6);
        if (preset.values.selectedInfusate) (document.getElementById('elyteInfusate') as HTMLSelectElement).value = preset.values.selectedInfusate;
        (document.getElementById('elyteSevere') as HTMLInputElement).checked = !!preset.values.hasSevereSymptoms;
        recalcElectrolyte();
      }
    });
  });

  const recalcElectrolyte = () => {
    const mode = ((document.getElementById('elyteMode') as HTMLSelectElement)?.value || 'hyponatremia') as any;
    const weightKg = parseFloat((document.getElementById('elyteWeight') as HTMLInputElement)?.value) || 60;
    const gender = ((document.getElementById('elyteGender') as HTMLSelectElement)?.value || 'male') as any;
    const serumNa = parseFloat((document.getElementById('elyteNa') as HTMLInputElement)?.value) || 118;
    const glucoseMmol = parseFloat((document.getElementById('elyteGlucose') as HTMLInputElement)?.value) || 5.6;
    const selectedInfusate = ((document.getElementById('elyteInfusate') as HTMLSelectElement)?.value || 'nacl_3') as any;
    const hasSevereSymptoms = (document.getElementById('elyteSevere') as HTMLInputElement)?.checked;

    const res = analyzeElectrolyte({ mode, weightKg, gender, serumNa, glucoseMmol, selectedInfusate, hasSevereSymptoms });

    const timelineContainer = document.getElementById('elyteTimelineContainer');
    if (timelineContainer) timelineContainer.innerHTML = renderFluidTimelineSvg(serumNa, 130, res.infusionRateMlPerHour || 42);

    const resultCard = document.getElementById('elyteResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-flask" style="color:#0284c7;"></i> Kết Quả Bù Điện Giải & Dịch</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="background:rgba(2,132,199,0.1); border-left:4px solid var(--color-primary); padding:1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase;">Thể tích nước cơ thể (TBW):</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--color-text); margin-top:0.25rem;">${res.tbwLiters} Lít (${res.tbwLiters * 1000} mL)</div>
            ${res.correctedNa !== null ? `<div style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.25rem;">Natri hiệu chỉnh: <strong>${res.correctedNa} mmol/L</strong></div>` : ''}
          </div>

          ${res.infusionRateMlPerHour ? `
            <div style="font-size:0.9rem; margin-bottom:0.75rem;">
              <strong>Tốc độ truyền khuyến nghị:</strong> <span class="dsp-badge dsp-badge--info" style="font-size:13px; font-weight:800;">${res.infusionRateMlPerHour} mL/giờ</span>
            </div>
          ` : ''}

          <div style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:0.75rem;">
            ${escapeHtml(res.safeSpeedLimitSummary)}
          </div>

          ${res.safetyAlerts.map(a => `
            <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; padding:0.65rem; font-size:0.8rem; margin-bottom:0.5rem; color:var(--color-text);">
              ${escapeHtml(a)}
            </div>
          `).join('')}

          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-elyte-input').forEach(i => i.addEventListener('input', recalcElectrolyte));

  // 5. Renal Controller & Presets
  document.querySelectorAll<HTMLElement>('.js-renal-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = RENAL_PRESETS.find(p => p.id === id);
      if (preset) {
        (document.getElementById('renalAge') as HTMLInputElement).value = String(preset.values.age);
        (document.getElementById('renalGender') as HTMLSelectElement).value = preset.values.gender;
        (document.getElementById('renalWeight') as HTMLInputElement).value = String(preset.values.weightKg);
        (document.getElementById('renalCreatinine') as HTMLInputElement).value = String(preset.values.serumCreatinineUmol);
        recalcRenal();
      }
    });
  });

  const recalcRenal = () => {
    const age = parseFloat((document.getElementById('renalAge') as HTMLInputElement)?.value) || 65;
    const gender = ((document.getElementById('renalGender') as HTMLSelectElement)?.value || 'male') as any;
    const weightKg = parseFloat((document.getElementById('renalWeight') as HTMLInputElement)?.value) || 60;
    const serumCreatinineUmol = parseFloat((document.getElementById('renalCreatinine') as HTMLInputElement)?.value) || 180;

    const res = analyzeRenalFunction({ age, gender, weightKg, serumCreatinineUmol });

    const tableContainer = document.getElementById('renalDrugTableContainer');
    if (tableContainer) {
      tableContainer.innerHTML = `
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:12px; line-height:1.4;">
            <thead>
              <tr style="border-bottom:2px solid var(--color-border); text-align:left; color:var(--color-text-muted);">
                <th style="padding:6px 8px;">Thuốc</th>
                <th style="padding:6px 8px;">Liều Chuẩn</th>
                <th style="padding:6px 8px;">Liều Hiệu Chỉnh Theo Thận</th>
                <th style="padding:6px 8px;">Lưu Ý TDM / An Toàn</th>
              </tr>
            </thead>
            <tbody>
              ${res.drugAdjustments.map(d => `
                <tr style="border-bottom:1px solid var(--color-border); ${d.isContraindicated ? 'background:rgba(239,68,68,0.06);' : ''}">
                  <td style="padding:8px; font-weight:700;">
                    ${escapeHtml(d.drugName)}
                    <div style="font-size:10px; color:var(--color-text-muted);">${escapeHtml(d.category)}</div>
                  </td>
                  <td style="padding:8px; color:var(--color-text-muted);">${escapeHtml(d.standardDose)}</td>
                  <td style="padding:8px; font-weight:700; color:${d.isContraindicated ? '#ef4444' : 'var(--color-primary)'};">
                    ${escapeHtml(d.adjustedDose)}
                  </td>
                  <td style="padding:8px; font-size:11px; color:var(--color-text-muted);">${escapeHtml(d.monitoringWarning)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    const resultCard = document.getElementById('renalResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-dna" style="color:#7c3aed;"></i> Chức Năng Thận</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="display:flex; justify-content:center; margin-bottom:0.5rem;">
            ${renderKdigoGaugeSvg(res.ckdEpi2021)}
          </div>

          <div style="background:rgba(124,58,237,0.08); border-left:4px solid ${res.kdigoStageColor}; padding:0.85rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">eGFR (CKD-EPI 2021):</div>
            <div style="font-size:1.2rem; font-weight:800; color:${res.kdigoStageColor}; margin-top:0.25rem;">
              ${res.ckdEpi2021} mL/p/1.73m² (Giai đoạn ${res.kdigoStage})
            </div>
            <div style="font-size:0.8rem; color:var(--color-text); margin-top:0.25rem;">${escapeHtml(res.kdigoDescription)}</div>
          </div>

          <div style="font-size:0.88rem; margin-bottom:0.75rem;">
            <strong>Cockcroft-Gault CrCl:</strong> <span class="dsp-badge dsp-badge--info">${res.cockcroftGault} mL/phút</span>
          </div>

          <div style="display:flex; gap:0.5rem; margin-top:1rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-renal-input').forEach(i => i.addEventListener('input', recalcRenal));

  // 6. Cardio Risk Controller & Presets
  document.querySelectorAll<HTMLElement>('.js-cardio-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = CARDIO_PRESETS.find(p => p.id === id);
      if (preset) {
        (document.getElementById('crAge') as HTMLInputElement).value = String(preset.values.age);
        (document.getElementById('crGender') as HTMLSelectElement).value = preset.values.gender;
        (document.getElementById('crSbp') as HTMLInputElement).value = String(preset.values.systolicBp);
        (document.getElementById('crChol') as HTMLInputElement).value = String(preset.values.totalCholesterolMmol);
        (document.getElementById('crHdl') as HTMLInputElement).value = String(preset.values.hdlCholesterolMmol);
        (document.getElementById('crLdl') as HTMLInputElement).value = String(preset.values.ldlCholesterolMmol);
        (document.getElementById('crSmoker') as HTMLInputElement).checked = !!preset.values.isSmoker;
        (document.getElementById('crDiabetes') as HTMLInputElement).checked = !!preset.values.hasDiabetes;
        (document.getElementById('crCvd') as HTMLInputElement).checked = !!preset.values.hasCvdHistory;
        (document.getElementById('crCkd') as HTMLInputElement).checked = !!preset.values.hasCkd;
        recalcCardio();
      }
    });
  });

  const recalcCardio = () => {
    const age = parseFloat((document.getElementById('crAge') as HTMLInputElement)?.value) || 58;
    const gender = ((document.getElementById('crGender') as HTMLSelectElement)?.value || 'male') as any;
    const systolicBp = parseFloat((document.getElementById('crSbp') as HTMLInputElement)?.value) || 145;
    const totalCholesterolMmol = parseFloat((document.getElementById('crChol') as HTMLInputElement)?.value) || 5.8;
    const hdlCholesterolMmol = parseFloat((document.getElementById('crHdl') as HTMLInputElement)?.value) || 1.1;
    const ldlCholesterolMmol = parseFloat((document.getElementById('crLdl') as HTMLInputElement)?.value) || 3.6;
    const isSmoker = (document.getElementById('crSmoker') as HTMLInputElement)?.checked;
    const hasDiabetes = (document.getElementById('crDiabetes') as HTMLInputElement)?.checked;
    const hasCvdHistory = (document.getElementById('crCvd') as HTMLInputElement)?.checked;
    const hasCkd = (document.getElementById('crCkd') as HTMLInputElement)?.checked;

    const res = analyzeCardioRisk({
      age, gender, systolicBp, totalCholesterolMmol, hdlCholesterolMmol, ldlCholesterolMmol,
      isSmoker, hasDiabetes, hasCvdHistory, hasCkd
    });

    const resultCard = document.getElementById('cardioResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-chart-pie" style="color:#ca8a04;"></i> Nguy Cơ Tim Mạch</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="display:flex; justify-content:center; margin-bottom:0.5rem;">
            ${renderScore2GaugeSvg(res.score2Percentage)}
          </div>

          <div style="background:rgba(202,138,4,0.08); border-left:4px solid ${res.riskColor}; padding:0.85rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân tầng nguy cơ 10 năm:</div>
            <div style="font-size:1.05rem; font-weight:800; color:${res.riskColor}; margin-top:0.25rem;">${escapeHtml(res.riskCategoryLabel)}</div>
          </div>

          <div style="background:var(--color-bg); padding:0.75rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:0.85rem;"><strong>Mục tiêu LDL-C khuyến nghị:</strong></div>
            <div style="font-size:1.2rem; font-weight:800; color:var(--color-primary); margin-top:0.25rem;">
              < ${res.targetLdlMmol} mmol/L (< ${res.targetLdlMgDl} mg/dL)
            </div>
            <div style="font-size:0.82rem; color:var(--color-text-muted); margin-top:0.25rem;">
              ${res.currentLdlGapMmol > 0 ? `⚠️ Cần hạ thêm <strong>${res.currentLdlGapMmol} mmol/L</strong>` : '✅ ĐÃ ĐẠT MỤC TIÊU'}
            </div>
          </div>

          <div style="font-size:0.82rem; margin-bottom:1rem;">
            <strong>Phác đồ Statin:</strong>
            <div style="color:var(--color-text); margin-top:0.25rem;">${escapeHtml(res.statinRegimenRecommendation)}</div>
          </div>

          <div style="display:flex; gap:0.5rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-cardio-input').forEach(i => i.addEventListener('input', recalcCardio));

  // 7. Sepsis Controller & Presets
  document.querySelectorAll<HTMLElement>('.js-sepsis-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = SEPSIS_PRESETS.find(p => p.id === id);
      if (preset) {
        (document.getElementById('sepAge') as HTMLInputElement).value = String(preset.values.age);
        (document.getElementById('sepRr') as HTMLInputElement).value = String(preset.values.respiratoryRate);
        (document.getElementById('sepSbp') as HTMLInputElement).value = String(preset.values.systolicBp);
        (document.getElementById('sepDbp') as HTMLInputElement).value = String(preset.values.diastolicBp);
        (document.getElementById('sepGcs') as HTMLInputElement).value = String(preset.values.gcs);
        (document.getElementById('sepPf') as HTMLInputElement).value = String(preset.values.pao2Fio2Ratio);
        (document.getElementById('sepPlt') as HTMLInputElement).value = String(preset.values.plateletsK);
        (document.getElementById('sepLactate') as HTMLInputElement).value = String(preset.values.serumLactateMmol);
        (document.getElementById('sepBili') as HTMLInputElement).value = String(preset.values.bilirubinUmol);
        (document.getElementById('sepCreat') as HTMLInputElement).value = String(preset.values.serumCreatinineUmol);
        (document.getElementById('sepVasopressor') as HTMLInputElement).checked = !!preset.values.vasopressorNeed;
        (document.getElementById('sepPseudomonas') as HTMLInputElement).checked = !!preset.values.isPseudomonasRisk;
        (document.getElementById('sepMrsa') as HTMLInputElement).checked = !!preset.values.isMrsaRisk;
        recalcSepsis();
      }
    });
  });

  const recalcSepsis = () => {
    const age = parseFloat((document.getElementById('sepAge') as HTMLInputElement)?.value) || 62;
    const respiratoryRate = parseFloat((document.getElementById('sepRr') as HTMLInputElement)?.value) || 28;
    const systolicBp = parseFloat((document.getElementById('sepSbp') as HTMLInputElement)?.value) || 82;
    const diastolicBp = parseFloat((document.getElementById('sepDbp') as HTMLInputElement)?.value) || 45;
    const gcs = parseFloat((document.getElementById('sepGcs') as HTMLInputElement)?.value) || 13;
    const pao2Fio2Ratio = parseFloat((document.getElementById('sepPf') as HTMLInputElement)?.value) || 220;
    const plateletsK = parseFloat((document.getElementById('sepPlt') as HTMLInputElement)?.value) || 85;
    const serumLactateMmol = parseFloat((document.getElementById('sepLactate') as HTMLInputElement)?.value) || 4.8;
    const bilirubinUmol = parseFloat((document.getElementById('sepBili') as HTMLInputElement)?.value) || 38;
    const serumCreatinineUmol = parseFloat((document.getElementById('sepCreat') as HTMLInputElement)?.value) || 240;
    const vasopressorNeed = (document.getElementById('sepVasopressor') as HTMLInputElement)?.checked;
    const isPseudomonasRisk = (document.getElementById('sepPseudomonas') as HTMLInputElement)?.checked;
    const isMrsaRisk = (document.getElementById('sepMrsa') as HTMLInputElement)?.checked;

    const res = analyzeSepsis({
      age, respiratoryRate, systolicBp, diastolicBp, gcs, pao2Fio2Ratio,
      plateletsK, bilirubinUmol, serumCreatinineUmol, serumLactateMmol,
      vasopressorNeed, isPseudomonasRisk, isMrsaRisk
    });

    const resultCard = document.getElementById('sepsisResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-lungs-virus" style="color:#e11d48;"></i> Kết Quả Sepsis & Viêm Phổi</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="background:rgba(225,29,72,0.08); border-left:4px solid ${res.sepsisColor}; padding:1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân loại:</div>
            <div style="font-size:1.1rem; font-weight:800; color:${res.sepsisColor}; margin-top:0.25rem;">${escapeHtml(res.sepsisClassification)}</div>
            <div style="font-size:0.82rem; font-weight:700; color:var(--color-text); margin-top:0.35rem;">${escapeHtml(res.icuCareRecommendation)}</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
            <div style="background:var(--color-bg); padding:0.65rem; border-radius:6px; text-align:center;">
              <div style="font-size:10.5px; color:var(--color-text-muted);">SOFA Score</div>
              <div style="font-size:1.2rem; font-weight:900; color:var(--color-primary);">${res.sofaScore} đ</div>
            </div>
            <div style="background:var(--color-bg); padding:0.65rem; border-radius:6px; text-align:center;">
              <div style="font-size:10.5px; color:var(--color-text-muted);">qSOFA Score</div>
              <div style="font-size:1.2rem; font-weight:900; color:${res.qsofaScore >= 2 ? '#ef4444' : 'var(--color-primary)'};">${res.qsofaScore} đ</div>
            </div>
            <div style="background:var(--color-bg); padding:0.65rem; border-radius:6px; text-align:center;">
              <div style="font-size:10.5px; color:var(--color-text-muted);">CURB-65</div>
              <div style="font-size:1.2rem; font-weight:900; color:var(--color-text);">${res.curb65Score} đ</div>
            </div>
            <div style="background:var(--color-bg); padding:0.65rem; border-radius:6px; text-align:center;">
              <div style="font-size:10.5px; color:var(--color-text-muted);">SMART-COP</div>
              <div style="font-size:1.2rem; font-weight:900; color:var(--color-text);">${res.smartCopScore} đ</div>
            </div>
          </div>

          <div style="background:rgba(2,132,199,0.08); padding:0.75rem; border-radius:6px; margin-bottom:1rem; font-size:0.82rem;">
            <strong style="color:var(--color-primary);"><i class="fa-solid fa-pills"></i> Kháng sinh kinh nghiệm:</strong>
            <div style="margin-top:0.25rem; line-height:1.4;">${escapeHtml(res.antibioticRegimen)}</div>
          </div>

          ${res.treatmentChecklist.length > 0 ? `
            <div style="background:rgba(245,158,11,0.08); padding:0.75rem; border-radius:6px; font-size:0.8rem; margin-bottom:1rem;">
              <strong style="color:#f59e0b;"><i class="fa-solid fa-list-check"></i> Gói Sống Còn Giờ Đầu (Hour-1):</strong>
              <ul style="margin:0.25rem 0 0; padding-left:1rem;">
                ${res.treatmentChecklist.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div style="display:flex; gap:0.5rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-sepsis-input').forEach(i => i.addEventListener('input', recalcSepsis));

  // 8. Cirrhosis Controller & Presets
  document.querySelectorAll<HTMLElement>('.js-cirrhosis-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preset-id');
      const preset = CIRRHOSIS_PRESETS.find(p => p.id === id);
      if (preset) {
        (document.getElementById('cirrBili') as HTMLInputElement).value = String(preset.values.bilirubinUmol);
        (document.getElementById('cirrAlb') as HTMLInputElement).value = String(preset.values.albuminGPerL);
        (document.getElementById('cirrInr') as HTMLInputElement).value = String(preset.values.inr);
        (document.getElementById('cirrCreat') as HTMLInputElement).value = String(preset.values.serumCreatinineUmol);
        (document.getElementById('cirrNa') as HTMLInputElement).value = String(preset.values.serumNaMmol);
        (document.getElementById('cirrPlt') as HTMLInputElement).value = String(preset.values.plateletsK);
        (document.getElementById('cirrAst') as HTMLInputElement).value = String(preset.values.astUPerL);
        (document.getElementById('cirrAlt') as HTMLInputElement).value = String(preset.values.altUPerL);
        (document.getElementById('cirrAge') as HTMLInputElement).value = String(preset.values.age);
        (document.getElementById('cirrAscites') as HTMLSelectElement).value = preset.values.ascites;
        (document.getElementById('cirrEnceph') as HTMLSelectElement).value = preset.values.encephalopathy;
        recalcCirrhosis();
      }
    });
  });

  const recalcCirrhosis = () => {
    const bilirubinUmol = parseFloat((document.getElementById('cirrBili') as HTMLInputElement)?.value) || 85;
    const albuminGPerL = parseFloat((document.getElementById('cirrAlb') as HTMLInputElement)?.value) || 24;
    const inr = parseFloat((document.getElementById('cirrInr') as HTMLInputElement)?.value) || 2.1;
    const serumCreatinineUmol = parseFloat((document.getElementById('cirrCreat') as HTMLInputElement)?.value) || 180;
    const serumNaMmol = parseFloat((document.getElementById('cirrNa') as HTMLInputElement)?.value) || 124;
    const plateletsK = parseFloat((document.getElementById('cirrPlt') as HTMLInputElement)?.value) || 65;
    const astUPerL = parseFloat((document.getElementById('cirrAst') as HTMLInputElement)?.value) || 95;
    const altUPerL = parseFloat((document.getElementById('cirrAlt') as HTMLInputElement)?.value) || 60;
    const age = parseFloat((document.getElementById('cirrAge') as HTMLInputElement)?.value) || 56;
    const ascites = ((document.getElementById('cirrAscites') as HTMLSelectElement)?.value || 'moderate_severe') as any;
    const encephalopathy = ((document.getElementById('cirrEnceph') as HTMLSelectElement)?.value || 'grade_1_2') as any;

    const res = analyzeCirrhosis({
      age, bilirubinUmol, albuminGPerL, inr, serumCreatinineUmol, serumNaMmol,
      astUPerL, altUPerL, plateletsK, ascites, encephalopathy, isDialysisTwiceLastWeek: false
    });

    const resultCard = document.getElementById('cirrhosisResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="dsp-card-header" style="border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
          <h3 class="dsp-card-title"><i class="fa-solid fa-disease" style="color:#b45309;"></i> Kết Quả Đánh Giá Gan Mật</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="background:rgba(180,83,9,0.08); border-left:4px solid ${res.childPughColor}; padding:1rem; border-radius:6px; margin-bottom:1rem;">
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Phân loại Child-Pugh:</div>
            <div style="font-size:1.15rem; font-weight:800; color:${res.childPughColor}; margin-top:0.25rem;">
              ${escapeHtml(res.childPughClassLabel)}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
            <div style="background:var(--color-bg); padding:0.65rem; border-radius:6px; text-align:center;">
              <div style="font-size:10.5px; color:var(--color-text-muted);">MELD-Na 2016</div>
              <div style="font-size:1.3rem; font-weight:900; color:#dc2626;">${res.meldNaScore} đ</div>
            </div>
            <div style="background:var(--color-bg); padding:0.65rem; border-radius:6px; text-align:center;">
              <div style="font-size:10.5px; color:var(--color-text-muted);">FIB-4 Index</div>
              <div style="font-size:1.3rem; font-weight:900; color:var(--color-primary);">${res.fib4Score}</div>
            </div>
          </div>

          <div style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:0.75rem; background:var(--color-bg); padding:0.6rem; border-radius:6px;">
            <strong>Tiên lượng 3 tháng:</strong> ${escapeHtml(res.meldMortality3Month)}
          </div>

          <div style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:1rem;">
            <strong>ALBI Score:</strong> ${escapeHtml(res.albiGrade)}
          </div>

          <div style="display:flex; gap:0.5rem;">
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm js-apply-studio-soap" data-text="${escapeHtml(res.clinicalSummary)}" style="flex:1;">
              <i class="fa-solid fa-notes-medical"></i> Chèn vào SOAP
            </button>
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm js-copy-studio-text" data-text="${escapeHtml(res.clinicalSummary)}">
              <i class="fa-regular fa-copy"></i> Sao chép
            </button>
          </div>
        </div>
      `;
      bindActionBtns(resultCard);
    }
  };

  document.querySelectorAll('.js-cirr-input').forEach(i => i.addEventListener('input', recalcCirrhosis));

  // Helper bind actions
  function bindActionBtns(container: HTMLElement) {
    container.querySelectorAll('.js-apply-studio-soap').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = (e.currentTarget as HTMLElement).getAttribute('data-text') || '';
        sessionStorage.setItem('dsp_pending_soap_plan', text);
        alert('✅ Đã nạp kết quả Studio vào bộ nhớ đệm SOAP! Đang chuyển đến Sổ Tay Bệnh Án...');
        window.location.hash = '#/docspace/soap';
      });
    });

    container.querySelectorAll('.js-copy-studio-text').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = (e.currentTarget as HTMLElement).getAttribute('data-text') || '';
        navigator.clipboard.writeText(text).then(() => {
          const el = e.currentTarget as HTMLElement;
          el.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép';
          setTimeout(() => { el.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 1500);
        });
      });
    });
  }

  // Khởi chạy tính toán ban đầu
  recalcAbg();
  recalcEcg();
  recalcElectrolyte();
  recalcRenal();
  recalcCardio();
  recalcSepsis();
  recalcCirrhosis();
}
