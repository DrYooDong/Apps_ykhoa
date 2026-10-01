/**
 * CliniPortal CDSS — Dengue UI Workstation & Interactive Controller v3.0
 * Path: public/cdss/dengue/dengue-ui.ts
 * Standard: Clean Clinical, Ultra-Responsive (Desktop / Tablet / Mobile), Icon-First, Zero-Pill Discipline
 * Comprehensive Non-Response & Refractory Shock Management Suite (BYT QĐ 2760/2023)
 */

import {
  DenguePatientInput,
  DengueCDSSPlan,
  Gender,
  DengueSeverity
} from '../cdss-types';

import {
  generateDengueCDSSPlan,
  calculateAlbuminDose
} from './dengue-engine';

import {
  DENGUE_FLUID_TEMPLATES,
  DENGUE_NON_RESPONSE_SCENARIOS
} from './dengue-data';

export type WorkspaceMode = 'fluid_schedule' | 'refractory_suite' | 'vasopressors' | 'nursing_checklist';

interface ClinicalSampleCase {
  id: string;
  category: 'initial' | 'refractory';
  icon: string;
  label: string;
  tag: string;
  isDanger?: boolean;
  input: {
    ageYears: number;
    gender: Gender;
    actualWeightKg: number;
    severity: DengueSeverity;
    clinicalResponse?: string;
    currentHctPercent?: number;
    baselineHctPercent?: number;
    massiveBleeding?: boolean;
    liverEnzymesAST_ALT?: number;
    plateletsCount?: number;
    cvpValue?: number;
  };
  clinicalHighlight: string;
}

const CLINICAL_SAMPLE_CASES: ClinicalSampleCase[] = [
  // 1. Nhóm Bù Dịch Ban Đầu & Phân Tầng Thể Trạng
  {
    id: 'child-obese',
    category: 'initial',
    icon: 'fa-solid fa-child',
    label: 'Bé 8T Béo Phì (38kg)',
    tag: 'CDC 2014',
    input: {
      ageYears: 8,
      gender: 'male',
      actualWeightKg: 38,
      severity: 'warning_signs',
      clinicalResponse: 'good',
      currentHctPercent: 42,
      baselineHctPercent: 36
    },
    clinicalHighlight: 'Trẻ béo phì > 120% chuẩn: Tự động dùng cân nặng hiệu chỉnh CDC 2014 (26kg) tránh phù phổi cấp.'
  },
  {
    id: 'child-shock',
    category: 'initial',
    icon: 'fa-solid fa-heart-pulse',
    label: 'Bé Gái 5T Sốc (16kg)',
    tag: 'Sốc Còn Bù',
    input: {
      ageYears: 5,
      gender: 'female',
      actualWeightKg: 16,
      severity: 'shock',
      clinicalResponse: 'good',
      currentHctPercent: 41,
      baselineHctPercent: 35
    },
    clinicalHighlight: 'Trẻ nhỏ sốc còn bù: Chống sốc 15 ml/kg/h cữ 1, theo dõi sát sinh hiệu và Hct.'
  },
  {
    id: 'adult-severe-shock',
    category: 'initial',
    icon: 'fa-solid fa-bolt',
    label: 'Nữ 35T Sốc Nguy Kịch (62kg)',
    tag: 'Mạch 0 - HA 0',
    isDanger: true,
    input: {
      ageYears: 35,
      gender: 'female',
      actualWeightKg: 62,
      severity: 'severe_shock',
      clinicalResponse: 'good',
      currentHctPercent: 49,
      baselineHctPercent: 38
    },
    clinicalHighlight: 'Sốc nguy kịch khẩn cấp: Bơm dịch 20 ml/kg/h siêu tốc + chuẩn bị Noradrenalin bơm tiêm điện.'
  },

  // 2. Nhóm Sốc Trơ & Xử Trí Không Đáp Ứng
  {
    id: 'child-refractory-cpt',
    category: 'refractory',
    icon: 'fa-solid fa-arrow-trend-up',
    label: 'Trẻ 7T Trơ Dịch (23kg)',
    tag: 'Hct 48% · Đổi CPT',
    isDanger: true,
    input: {
      ageYears: 7,
      gender: 'male',
      actualWeightKg: 23,
      severity: 'shock',
      clinicalResponse: 'refractory_hct_high',
      currentHctPercent: 48,
      baselineHctPercent: 37
    },
    clinicalHighlight: 'Sốc trơ dịch tinh thể, Hct 48%: Thoát huyết tương nặng -> Đổi ngay Cao phân tử Dextran 40 10-20 ml/kg/h.'
  },
  {
    id: 'adult-bleeding',
    category: 'refractory',
    icon: 'fa-solid fa-droplet',
    label: 'Nam 32T Sốc Kéo Dài (58kg)',
    tag: 'Hct 26% · Mất Máu Ẩn',
    isDanger: true,
    input: {
      ageYears: 32,
      gender: 'male',
      actualWeightKg: 58,
      severity: 'shock',
      clinicalResponse: 'refractory_bleeding',
      currentHctPercent: 26,
      baselineHctPercent: 44,
      massiveBleeding: true
    },
    clinicalHighlight: 'Sốc kéo dài kèm Hct tụt sâu 26%: Báo động đỏ Xuất huyết nội tạng ẩn -> Truyền Hồng Cầu Lắng & CPT song song.'
  },
  {
    id: 'refractory-cvp',
    category: 'refractory',
    icon: 'fa-solid fa-gauge-high',
    label: 'Nữ 26T Sốc Trơ Dịch (48kg)',
    tag: 'CVP > 15 · Vận Mạch',
    isDanger: true,
    input: {
      ageYears: 26,
      gender: 'female',
      actualWeightKg: 48,
      severity: 'shock',
      clinicalResponse: 'refractory_shock_cvp',
      currentHctPercent: 39,
      baselineHctPercent: 38,
      cvpValue: 17
    },
    clinicalHighlight: 'Bù CPT ≥ 60ml/kg nhưng vẫn sốc: Đặt catheter đo CVP tĩnh mạch nền, test dịch & Dobutamin / Bù Albumin.'
  },
  {
    id: 'acute-liver',
    category: 'refractory',
    icon: 'fa-solid fa-triangle-exclamation',
    label: 'Nam 42T Suy Gan Cấp (64kg)',
    tag: 'AST 1650 · Phác Đồ NAC',
    isDanger: true,
    input: {
      ageYears: 42,
      gender: 'male',
      actualWeightKg: 64,
      severity: 'warning_signs',
      clinicalResponse: 'liver_failure',
      liverEnzymesAST_ALT: 1650,
      currentHctPercent: 40
    },
    clinicalHighlight: 'AST 1650 U/L tổn thương gan cấp: Phác đồ NAC 4 pha, TUYỆT ĐỐI CẤM Ringer Lactate & Paracetamol.'
  }
];

export class DengueCDSSController {
  private container: HTMLElement;
  private currentPlan: DengueCDSSPlan | null = null;
  private customDurations: Record<number, number> = {};
  private activeCaseId: string = 'child-obese';
  private activeWorkspaceMode: WorkspaceMode = 'fluid_schedule';
  private activeRefractorySubTab: string = 'tab-cpt';

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) {
      throw new Error(`Container #${containerId} not found`);
    }
    this.container = el;
    this.init();
  }

  private init(): void {
    this.renderInitialLayout();
    this.attachEventListeners();
    this.recalculate();
  }

  private renderInitialLayout(): void {
    const now = new Date();
    const curTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    this.container.innerHTML = `
      <!-- DEDICATED MEDICAL PRINT SHEET (Chỉ hiển thị khi in phiếu y lệnh) -->
      <div id="cdss-print-sheet" class="cdss-print-sheet"></div>

      <div class="dengue-cdss-app">
        <!-- TOP CLINICAL WORKSTATION TOOLBAR -->
        <header class="cdss-top-bar">
          <div class="cdss-bar-branding">
            <div class="cdss-icon-badge">
              <i class="fa-solid fa-droplet"></i>
            </div>
            <div class="cdss-brand-titles">
              <h1 class="cdss-brand-title">
                CDSS Điều Trị SXHD Dengue &amp; Chống Sốc Phức Tạp
              </h1>
              <div class="cdss-brand-subtitle">
                <span>Bộ Y Tế 2023</span>
                <span aria-hidden="true">·</span>
                <span>QĐ 2760/QĐ-BYT</span>
                <span aria-hidden="true">·</span>
                <span>Phụ lục 6, 8, 16, 17, 18 &amp; 26</span>
              </div>
            </div>
          </div>

          <div class="cdss-toolbar-actions">
            <button id="btn-copy-soap" class="cdss-action-btn cdss-action-btn--primary" title="Sao chép Kế hoạch SOAP vào Bệnh án / DocSpace">
              <i class="fa-solid fa-notes-medical"></i> <span>Bệnh Án SOAP</span>
            </button>
            <button id="btn-copy-handover" class="cdss-action-btn" title="Sao chép báo cáo giao ban cọc dịch">
              <i class="fa-solid fa-clipboard-check"></i> <span>Bàn Giao Ca</span>
            </button>
            <button id="btn-print" class="cdss-action-btn cdss-action-btn--icon-only" title="In phiếu y lệnh cọc dịch chuẩn A4">
              <i class="fa-solid fa-print"></i>
            </button>
            <button id="btn-reset-durations" class="cdss-action-btn cdss-action-btn--icon-only" title="Khôi phục thời lượng chuẩn Bộ Y Tế">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
          </div>
        </header>

        <!-- CA LÂM SÀNG PHÂN TẦNG (CLINICAL CASES BAR) -->
        <div class="cdss-cases-bar">
          <!-- Nhóm 1: Bù dịch ban đầu -->
          <div class="cdss-cases-group">
            <div class="cdss-cases-group-title">
              <i class="fa-solid fa-hand-holding-droplet text-primary"></i> Bù Dịch Ban Đầu:
            </div>
            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
              ${CLINICAL_SAMPLE_CASES.filter(c => c.category === 'initial').map(c => `
                <button type="button" 
                  class="cdss-case-pill ${c.isDanger ? 'cdss-case-pill--danger' : ''} ${c.id === this.activeCaseId ? 'active' : ''}" 
                  data-case-id="${c.id}"
                  title="${c.clinicalHighlight}">
                  <i class="${c.icon} cdss-case-pill-icon"></i>
                  <span>${c.label}</span>
                  <span class="cdss-case-pill-tag">${c.tag}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Nhóm 2: Sốc trơ & Không đáp ứng -->
          <div class="cdss-cases-group" style="padding-top:0.4rem; border-top:1px dashed var(--cdss-border-subtle);">
            <div class="cdss-cases-group-title" style="color:var(--cdss-danger);">
              <i class="fa-solid fa-shield-virus text-danger"></i> Sốc Trơ &amp; Biến Chứng:
            </div>
            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
              ${CLINICAL_SAMPLE_CASES.filter(c => c.category === 'refractory').map(c => `
                <button type="button" 
                  class="cdss-case-pill cdss-case-pill--danger ${c.id === this.activeCaseId ? 'active' : ''}" 
                  data-case-id="${c.id}"
                  title="${c.clinicalHighlight}">
                  <i class="${c.icon} cdss-case-pill-icon"></i>
                  <span>${c.label}</span>
                  <span class="cdss-case-pill-tag">${c.tag}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- MAIN GRID LAYOUT -->
        <div class="cdss-main-grid">
          <!-- LEFT COLUMN: TRẠM ĐÁNH GIÁ NGƯỜI BỆNH UNIFIED PATIENT STATION -->
          <aside class="cdss-left-col">
            <div class="cdss-card" style="padding:0; overflow:hidden;">
              <div class="cdss-card-header" style="padding:0.85rem 1rem;">
                <h2 class="cdss-card-title">
                  <i class="fa-solid fa-user-injured text-primary"></i> Trạm Đánh Giá Người Bệnh
                </h2>
                <span id="case-status-indicator" class="cdss-brand-badge" style="display:none;"></span>
              </div>

              <!-- KHỐI 1: DỮ KIỆN BAN ĐẦU & THỂ TRẠNG -->
              <div class="cdss-station-section">
                <div class="cdss-station-title">
                  <span>01. Thể Trạng &amp; Phân Tầng Ban Đầu</span>
                  <span style="font-size:0.7rem; font-weight:600; text-transform:none; color:var(--cdss-text-muted);">CDC 2014</span>
                </div>

                <form id="dengue-input-form" style="display:flex; flex-direction:column; gap:0.75rem;">
                  <!-- Tuổi & Giới tính -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-age">Tuổi (Năm)</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-age" min="1" max="100" value="8" step="1" required class="cdss-input" />
                        <span class="cdss-input-suffix">tuổi</span>
                      </div>
                    </div>

                    <div class="cdss-form-group">
                      <label class="cdss-form-label">Giới Tính</label>
                      <div class="cdss-segmented" id="gender-segmented">
                        <button type="button" class="cdss-segmented-btn active" data-gender="male">
                          <i class="fa-solid fa-mars"></i> Nam
                        </button>
                        <button type="button" class="cdss-segmented-btn" data-gender="female">
                          <i class="fa-solid fa-venus"></i> Nữ
                        </button>
                      </div>
                      <input type="hidden" id="input-gender" value="male" />
                    </div>
                  </div>

                  <!-- Cân nặng thực tế -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-weight">
                      <span>Cân Nặng Thực Tế</span>
                      <small style="color:var(--cdss-text-muted);">Cân đo tại cấp cứu</small>
                    </label>
                    <div class="cdss-input-group">
                      <input type="number" id="input-weight" min="5" max="160" value="38" step="0.5" required class="cdss-input" />
                      <span class="cdss-input-suffix">kg</span>
                    </div>
                  </div>

                  <!-- Phân độ lâm sàng ban đầu -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-severity">Phân Độ Lâm Sàng Ban Đầu</label>
                    <select id="input-severity" class="cdss-select">
                      <option value="warning_signs" selected>1. Có Dấu Hiệu Cảnh Báo (DHCB)</option>
                      <option value="shock">2. Sốc SXHD (Còn Bù)</option>
                      <option value="severe_shock">3. Sốc Nguy Kịch (Mạch 0, HA 0)</option>
                    </select>
                  </div>

                  <!-- Giờ bắt đầu truyền -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-starttime">Mốc Giờ Bắt Đầu Truyền</label>
                    <input type="time" id="input-starttime" value="${curTime}" class="cdss-input" />
                  </div>
                </form>
              </div>

              <!-- KHỐI 2: TÁI ĐÁNH GIÁ & CẬN LÂM SÀNG (ĐỘNG HỌC) -->
              <div class="cdss-station-section" style="background: rgba(239, 68, 68, 0.02);">
                <div class="cdss-station-title" style="color:var(--cdss-danger);">
                  <span>02. Tái Đánh Giá &amp; Cận Lâm Sàng</span>
                  <span style="font-size:0.7rem; font-weight:700; text-transform:none; color:var(--cdss-danger);">QĐ 2760</span>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.75rem;">
                  <!-- Dropdown Đáp Ứng Lâm Sàng Lớn -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-response">
                      <span>Tình Trạng Đáp Ứng Sau Bù Dịch Ban Đầu</span>
                    </label>
                    <select id="input-response" class="cdss-select" style="font-weight:700; border-color:rgba(239,68,68,0.3);">
                      <option value="good">🟢 Đáp ứng tốt, ra sốc (Bù dịch nấc thang chuẩn)</option>
                      <option value="refractory_hct_high">🟠 Không đáp ứng + Hct còn cao ≥ 40% (Đổi CPT nấc thang)</option>
                      <option value="refractory_bleeding">🔴 Không đáp ứng + Hct tụt hoặc Xuất huyết ẩn (Truyền Máu HCL)</option>
                      <option value="refractory_shock_cvp">🟣 Sốc thất bại bù dịch / Tái sốc ≥ 2 lần (Đo CVP & Vận Mạch)</option>
                      <option value="fluid_overload">⚠️ Biến chứng Dư dịch / Quá tải tuần hoàn / Phù phổi cấp</option>
                      <option value="liver_failure">🟤 Biến chứng Suy gan cấp / AST-ALT ≥ 1000 U/L (Phác đồ NAC)</option>
                    </select>
                  </div>

                  <!-- Hct Hiện Tại & Hct Nền -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-current-hct">Hct Hiện Tại (%)</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-current-hct" min="15" max="65" value="42" step="0.5" class="cdss-input" />
                        <span class="cdss-input-suffix">%</span>
                      </div>
                    </div>
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-baseline-hct">Hct Nền (%)</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-baseline-hct" min="20" max="55" value="36" step="0.5" class="cdss-input" />
                        <span class="cdss-input-suffix">%</span>
                      </div>
                    </div>
                  </div>

                  <!-- CVP & Men Gan AST/ALT -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-cvp">CVP Đo Được</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-cvp" min="0" max="30" placeholder="Chưa đo" step="1" class="cdss-input" />
                        <span class="cdss-input-suffix">cmH2O</span>
                      </div>
                    </div>
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-ast-alt">Men Gan AST/ALT</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-ast-alt" min="10" max="10000" placeholder="U/L" step="10" class="cdss-input" />
                        <span class="cdss-input-suffix">U/L</span>
                      </div>
                    </div>
                  </div>

                  <!-- Tiểu Cầu & Xuất Huyết Ẩn -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-platelets">Số Lượng Tiểu Cầu</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-platelets" min="1000" max="500000" placeholder="/mm³" step="1000" class="cdss-input" />
                        <span class="cdss-input-suffix">/mm³</span>
                      </div>
                    </div>
                    <div class="cdss-form-group" style="display:flex; align-items:flex-end;">
                      <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.76rem; font-weight:700; color:var(--cdss-danger); cursor:pointer; padding-bottom:0.6rem;">
                        <input type="checkbox" id="input-bleeding" style="width:16px; height:16px; accent-color:var(--cdss-danger);" />
                        <span>Có Xuất Huyết Ẩn / Tiêu Hóa</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- KHỐI 3: PHÂN TÍCH CÂN NẶNG CDC 2014 & CÂN TÍNH DỊCH (INLINE METRIC) -->
              <div id="weight-analysis-box" class="cdss-station-section">
                <!-- Dynamically populated via renderWeightAnalysis -->
              </div>
            </div>
          </aside>

          <!-- RIGHT COLUMN: CDSS DIRECTIVE & WORKSPACE MODES -->
          <main class="cdss-right-col">
            <!-- Dynamic Alert Banners -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-container"></div>

            <!-- CLINICAL DIRECTIVE EXECUTIVE CARD (CHỈ ĐẠO LÂM SÀNG ĐỘNG HỌC) -->
            <div id="cdss-directive-wrap"></div>

            <!-- WORKSPACE MODE SWITCHER TABS -->
            <div class="cdss-mode-switcher-wrap">
              <div class="cdss-mode-tabs" id="cdss-mode-tabs">
                <button type="button" class="cdss-mode-btn active" data-mode="fluid_schedule">
                  <i class="fa-solid fa-table-list"></i>
                  <span>1. Bảng Cọc Dịch Ban Đầu</span>
                </button>
                <button type="button" class="cdss-mode-btn" data-mode="refractory_suite" id="btn-mode-refractory">
                  <i class="fa-solid fa-shield-virus"></i>
                  <span>2. Sốc Trơ &amp; Không Đáp Ứng</span>
                  <span id="refractory-alert-dot" style="display:none; width:8px; height:8px; border-radius:50%; background:#ef4444;"></span>
                </button>
                <button type="button" class="cdss-mode-btn" data-mode="vasopressors">
                  <i class="fa-solid fa-syringe"></i>
                  <span>3. Vận Mạch 50ml (4 Loại)</span>
                </button>
                <button type="button" class="cdss-mode-btn" data-mode="nursing_checklist">
                  <i class="fa-solid fa-user-nurse"></i>
                  <span>4. Điều Dưỡng An Toàn</span>
                </button>
              </div>

              <div class="cdss-mode-hint" id="cdss-mode-hint">
                <i class="fa-solid fa-circle-info text-primary"></i>
                <span id="cdss-mode-hint-text">Đang hiển thị phác đồ bù dịch nấc thang</span>
              </div>
            </div>

            <!-- WORKSPACE CONTENT CONTAINER (DYNAMIC VIEWS) -->
            <div id="cdss-workspace-content">
              <!-- Dynamically populated via renderWorkspaceContent -->
            </div>
          </main>
        </div>

        <!-- STICKY MOBILE BOTTOM BAR -->
        <div class="cdss-mobile-sticky-bar">
          <div class="cdss-mobile-bar-inner">
            <div class="cdss-mbar-summary">
              <div class="cdss-mbar-main">
                <span id="mbar-weight">26 kg</span>
                <span class="cdss-brand-badge" id="mbar-severity-badge">DHCB</span>
              </div>
              <div class="cdss-mbar-sub" id="mbar-volume-sub">Tổng: 2.340 ml / 24h</div>
            </div>
            <div class="cdss-mbar-actions">
              <button type="button" id="btn-open-drawer" class="cdss-action-btn cdss-action-btn--primary">
                <i class="fa-solid fa-sliders"></i> Chỉnh Ca
              </button>
              <button type="button" id="btn-mbar-soap" class="cdss-action-btn cdss-action-btn--icon-only" title="Chép Bệnh Án">
                <i class="fa-solid fa-notes-medical"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- MOBILE DRAWER OVERLAY & PANEL -->
        <div class="cdss-drawer-overlay" id="cdss-drawer-overlay"></div>
        <div class="cdss-mobile-drawer" id="cdss-mobile-drawer">
          <div class="cdss-drawer-handle"></div>
          <div class="cdss-drawer-header">
            <h3 class="cdss-drawer-title">
              <i class="fa-solid fa-sliders"></i> Chỉnh Thông Số Ca Bệnh
            </h3>
            <button type="button" class="cdss-action-btn cdss-action-btn--icon-only" id="btn-close-drawer">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div id="drawer-form-container">
            <!-- Mirrored controls for phone -->
          </div>
        </div>

        <!-- TOAST NOTIFICATION -->
        <div id="cdss-toast" class="cdss-toast">
          <i class="fa-solid fa-circle-check"></i>
          <span id="cdss-toast-text">Thông báo</span>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const form = document.getElementById('dengue-input-form');
    if (form) {
      form.addEventListener('input', () => {
        this.clearActivePreset();
        this.recalculate();
      });
      form.addEventListener('change', () => {
        this.clearActivePreset();
        this.recalculate();
      });
    }

    // Response and Lab Inputs
    const responseSelect = document.getElementById('input-response');
    if (responseSelect) {
      responseSelect.addEventListener('change', () => {
        this.clearActivePreset();
        const val = (responseSelect as HTMLSelectElement).value;
        if (val !== 'good') {
          this.activeWorkspaceMode = 'refractory_suite';
        }
        this.recalculate();
      });
    }

    const labInputs = ['input-current-hct', 'input-baseline-hct', 'input-cvp', 'input-ast-alt', 'input-platelets', 'input-bleeding'];
    labInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          this.clearActivePreset();
          this.recalculate();
        });
        el.addEventListener('change', () => {
          this.clearActivePreset();
          this.recalculate();
        });
      }
    });

    // Gender Segmented Buttons
    const genderBtns = document.querySelectorAll('#gender-segmented .cdss-segmented-btn');
    genderBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const gender = target.getAttribute('data-gender') as Gender;
        genderBtns.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        const inputGender = document.getElementById('input-gender') as HTMLInputElement | null;
        if (inputGender) inputGender.value = gender;
        this.clearActivePreset();
        this.recalculate();
      });
    });

    // Clinical Sample Cases Pills
    const casePills = document.querySelectorAll('.cdss-case-pill');
    casePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const caseId = target.getAttribute('data-case-id');
        if (caseId) {
          this.applySampleCase(caseId);
        }
      });
    });

    // Workspace Mode Switcher
    const modeBtns = document.querySelectorAll('.cdss-mode-btn');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const mode = target.getAttribute('data-mode') as WorkspaceMode;
        if (mode) {
          modeBtns.forEach(b => b.classList.remove('active'));
          target.classList.add('active');
          this.activeWorkspaceMode = mode;
          this.renderWorkspaceContent();
        }
      });
    });

    // Reset Durations
    const btnReset1 = document.getElementById('btn-reset-durations');
    const handleReset = () => {
      this.customDurations = {};
      this.recalculate();
      this.showToast('Đã khôi phục thời lượng cữ chuẩn theo Bộ Y Tế!');
    };
    if (btnReset1) btnReset1.addEventListener('click', handleReset);

    // Copy SOAP
    const btnSoap = document.getElementById('btn-copy-soap');
    const btnMbarSoap = document.getElementById('btn-mbar-soap');
    if (btnSoap) btnSoap.addEventListener('click', () => this.copySoapPlan());
    if (btnMbarSoap) btnMbarSoap.addEventListener('click', () => this.copySoapPlan());

    // Copy Handover
    const btnHandover = document.getElementById('btn-copy-handover');
    if (btnHandover) btnHandover.addEventListener('click', () => this.copyHandoverReport());

    // Print
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());

    // Mobile Drawer
    const btnOpenDrawer = document.getElementById('btn-open-drawer');
    const btnCloseDrawer = document.getElementById('btn-close-drawer');
    const drawerOverlay = document.getElementById('cdss-drawer-overlay');
    const drawer = document.getElementById('cdss-mobile-drawer');

    const openDrawer = () => {
      if (drawer && drawerOverlay) {
        drawer.classList.add('active');
        drawerOverlay.classList.add('active');
      }
    };
    const closeDrawer = () => {
      if (drawer && drawerOverlay) {
        drawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
      }
    };

    if (btnOpenDrawer) btnOpenDrawer.addEventListener('click', openDrawer);
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  }

  private clearActivePreset(): void {
    this.activeCaseId = '';
    const pills = document.querySelectorAll('.cdss-case-pill');
    pills.forEach(p => p.classList.remove('active'));
    const ind = document.getElementById('case-status-indicator');
    if (ind) ind.style.display = 'none';
  }

  public applySampleCase(caseId: string): void {
    const sample = CLINICAL_SAMPLE_CASES.find(c => c.id === caseId);
    if (!sample) return;

    this.activeCaseId = caseId;
    this.customDurations = {};

    // Update Pills
    const pills = document.querySelectorAll('.cdss-case-pill');
    pills.forEach(p => {
      if (p.getAttribute('data-case-id') === caseId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    // Update Form Inputs
    this.setInputValue('input-age', sample.input.ageYears.toString());
    this.setInputValue('input-weight', sample.input.actualWeightKg.toString());
    this.setInputValue('input-severity', sample.input.severity);
    this.setGender(sample.input.gender);

    if (sample.input.clinicalResponse) {
      this.setInputValue('input-response', sample.input.clinicalResponse);
    }
    if (sample.input.currentHctPercent !== undefined) {
      this.setInputValue('input-current-hct', sample.input.currentHctPercent.toString());
    }
    if (sample.input.baselineHctPercent !== undefined) {
      this.setInputValue('input-baseline-hct', sample.input.baselineHctPercent.toString());
    }
    if (sample.input.liverEnzymesAST_ALT !== undefined) {
      this.setInputValue('input-ast-alt', sample.input.liverEnzymesAST_ALT.toString());
    } else {
      this.setInputValue('input-ast-alt', '');
    }
    if (sample.input.cvpValue !== undefined) {
      this.setInputValue('input-cvp', sample.input.cvpValue.toString());
    } else {
      this.setInputValue('input-cvp', '');
    }

    const bleedCheckbox = document.getElementById('input-bleeding') as HTMLInputElement | null;
    if (bleedCheckbox) {
      bleedCheckbox.checked = !!sample.input.massiveBleeding;
    }

    // Auto-switch workspace mode & sub-tab according to clinical category
    if (sample.category === 'refractory') {
      this.activeWorkspaceMode = 'refractory_suite';
      if (sample.input.clinicalResponse === 'refractory_hct_high') {
        this.activeRefractorySubTab = 'tab-cpt';
      } else if (sample.input.clinicalResponse === 'refractory_bleeding' || sample.input.massiveBleeding) {
        this.activeRefractorySubTab = 'tab-blood';
      } else if (sample.input.clinicalResponse === 'refractory_shock_cvp') {
        this.activeRefractorySubTab = 'tab-cvp';
      } else if (sample.input.clinicalResponse === 'liver_failure') {
        this.activeRefractorySubTab = 'tab-liver';
      }
    } else {
      this.activeWorkspaceMode = 'fluid_schedule';
    }

    // Update Status Indicator
    const ind = document.getElementById('case-status-indicator');
    if (ind) {
      ind.textContent = sample.label;
      ind.style.display = 'inline-block';
    }

    this.recalculate();
    this.showToast(`Đã áp dụng ca lâm sàng: ${sample.label}`);
  }

  private setInputValue(id: string, val: string): void {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  }

  private setGender(val: Gender): void {
    const hidden = document.getElementById('input-gender') as HTMLInputElement | null;
    if (hidden) hidden.value = val;

    const btns = document.querySelectorAll('#gender-segmented .cdss-segmented-btn');
    btns.forEach(btn => {
      if (btn.getAttribute('data-gender') === val) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  private getFormData(): DenguePatientInput {
    const age = parseFloat((document.getElementById('input-age') as HTMLInputElement)?.value) || 8;
    const gender = ((document.getElementById('input-gender') as HTMLInputElement)?.value as Gender) || 'male';
    const weight = parseFloat((document.getElementById('input-weight') as HTMLInputElement)?.value) || 30;
    const severity = ((document.getElementById('input-severity') as HTMLSelectElement)?.value as DengueSeverity) || 'warning_signs';
    const startTime = (document.getElementById('input-starttime') as HTMLInputElement)?.value || '08:00';
    const response = ((document.getElementById('input-response') as HTMLSelectElement)?.value) || 'good';
    const currentHct = parseFloat((document.getElementById('input-current-hct') as HTMLInputElement)?.value) || undefined;
    const baselineHct = parseFloat((document.getElementById('input-baseline-hct') as HTMLInputElement)?.value) || undefined;
    const massiveBleeding = (document.getElementById('input-bleeding') as HTMLInputElement)?.checked || false;
    const liverEnzymesAST_ALT = parseFloat((document.getElementById('input-ast-alt') as HTMLInputElement)?.value) || undefined;
    const plateletsCount = parseFloat((document.getElementById('input-platelets') as HTMLInputElement)?.value) || undefined;

    return {
      ageYears: age,
      gender,
      actualWeightKg: weight,
      severity,
      startTime,
      clinicalResponse: response,
      currentHctPercent: currentHct,
      baselineHctPercent: baselineHct,
      massiveBleeding,
      liverEnzymesAST_ALT,
      plateletsCount
    };
  }

  public recalculate(): void {
    const input = this.getFormData();
    this.currentPlan = generateDengueCDSSPlan(input, this.customDurations);
    this.renderPlan(this.currentPlan);
  }

  private renderPlan(plan: DengueCDSSPlan): void {
    this.renderWeightAnalysis(plan);
    this.renderAlerts(plan);
    this.renderDirective(plan);
    this.updateWorkspaceModeSwitcher(plan);
    this.renderWorkspaceContent();
    this.updateMobileStickyBar(plan);
    this.renderPrintSheet(plan);
  }

  private renderWeightAnalysis(plan: DengueCDSSPlan): void {
    const box = document.getElementById('weight-analysis-box');
    if (!box) return;

    const { weightResult, ageGroup } = plan;
    const isObese = weightResult.isObese;

    const ageGroupLabel = ageGroup === 'child' 
      ? 'Trẻ em (< 13 tuổi)' 
      : ageGroup === 'adolescent' 
        ? 'Thiếu niên (13-15T)' 
        : 'Người lớn (≥ 16T)';

    box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--cdss-text-muted);">
          Cân Nặng Tính Dịch (CDSS)
        </span>
        <span style="font-size:0.72rem; font-weight:700; color:${isObese ? 'var(--cdss-danger)' : 'var(--cdss-success)'};">
          ${isObese ? 'Thừa Cân (> 120% Chuẩn)' : 'Thể Trạng Chuẩn'}
        </span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1.3fr; gap:0.4rem; background:var(--cdss-surface-alt); border:1px solid var(--cdss-border-subtle); border-radius:8px; padding:0.5rem;">
        <div style="text-align:center;">
          <div style="font-size:0.68rem; color:var(--cdss-text-muted);">Thực tế</div>
          <strong style="font-size:0.95rem; font-family:var(--cdss-font-mono);">${weightResult.actualWeightKg} kg</strong>
        </div>
        <div style="text-align:center; border-left:1px solid var(--cdss-border-subtle); border-right:1px solid var(--cdss-border-subtle);">
          <div style="font-size:0.68rem; color:var(--cdss-text-muted);">CDC 2014</div>
          <strong style="font-size:0.95rem; font-family:var(--cdss-font-mono); color:var(--cdss-text-muted);">${weightResult.standardWeightKg} kg</strong>
        </div>
        <div style="text-align:center; background:var(--cdss-surface); border-radius:6px; padding:2px 0;">
          <div style="font-size:0.68rem; color:var(--cdss-primary); font-weight:700;">Tính dịch</div>
          <strong style="font-size:1.05rem; font-family:var(--cdss-font-mono); color:var(--cdss-primary);">${weightResult.adjustedWeightKg} kg</strong>
        </div>
      </div>

      <div style="font-size:0.72rem; color:var(--cdss-text-muted); line-height:1.4; margin-top:0.4rem;">
        <i class="fa-solid fa-circle-info text-primary"></i> ${weightResult.formulaNote}
      </div>
    `;
  }

  private renderAlerts(plan: DengueCDSSPlan): void {
    const wrap = document.getElementById('cdss-alerts-wrap');
    if (!wrap) return;

    if (plan.alerts.length === 0) {
      wrap.innerHTML = '';
      return;
    }

    wrap.innerHTML = plan.alerts.map(a => `
      <div class="cdss-alert-box cdss-alert-box--${a.level}">
        <i class="fa-solid ${a.level === 'danger' ? 'fa-triangle-exclamation' : a.level === 'warning' ? 'fa-circle-exclamation' : 'fa-circle-info'}"></i>
        <div class="cdss-alert-body">
          <strong>${a.title}</strong>
          <div>${a.message}</div>
        </div>
      </div>
    `).join('');
  }

  private renderDirective(plan: DengueCDSSPlan): void {
    const wrap = document.getElementById('cdss-directive-wrap');
    if (!wrap) return;

    const { branchDecision, patient } = plan;
    const isDanger = branchDecision.branchType === 'blood' || branchDecision.branchType === 'refractory_shock';
    const isWarning = branchDecision.branchType === 'cpt';
    const isStandard = branchDecision.branchType === 'standard';

    wrap.innerHTML = `
      <div class="cdss-directive-card ${isDanger ? 'directive--danger' : isWarning ? 'directive--warning' : ''}">
        <div class="cdss-directive-header">
          <h2 class="cdss-directive-title">
            <i class="fa-solid ${isDanger ? 'fa-triangle-exclamation text-danger' : isWarning ? 'fa-arrow-trend-up text-warning' : 'fa-circle-check text-primary'}"></i>
            <span>${branchDecision.title}</span>
          </h2>
          <span class="cdss-directive-tag" style="background:${isDanger ? 'rgba(239,68,68,0.1)' : isWarning ? 'rgba(245,158,11,0.1)' : 'rgba(2,132,199,0.1)'}; color:${isDanger ? 'var(--cdss-danger)' : isWarning ? 'var(--cdss-warning)' : 'var(--cdss-primary)'};">
            ${branchDecision.branchType === 'blood' ? 'MẤT MÁU CẤP' : branchDecision.branchType === 'cpt' ? 'THOÁT HUYẾT TƯƠNG TRƠ' : branchDecision.branchType === 'refractory_shock' ? 'SỐC KHÁNG TRỊ' : 'ĐÁP ỨNG CHUẨN'}
          </span>
        </div>

        <div class="cdss-directive-action-banner ${isDanger ? 'action--danger' : isWarning ? 'action--warning' : 'action--primary'}">
          <i class="fa-solid fa-arrow-right-arrow-left" style="font-size:1.1rem;"></i>
          <div>
            <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.04em; font-weight:800; opacity:0.85;">Khuyến Cáo Xử Trí Ưu Tiên:</div>
            <strong style="font-size:0.95rem;">${branchDecision.recommendedFluid}</strong>
          </div>
        </div>

        <div class="cdss-directive-reasoning">
          <strong>Lý luận lâm sàng:</strong> ${branchDecision.reasoning}
        </div>

        <!-- Thanh Thử Nghiệm Kịch Bản Lâm Sàng 1 Chạm -->
        <div class="cdss-scenario-bar">
          <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:var(--cdss-text-muted); margin-right:4px;">
            Thử nghiệm kịch bản:
          </span>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === 'good' ? 'active' : ''}" onclick="window.__dengueSetScenario('good');">
            🟢 Ổn định
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === 'refractory_hct_high' ? 'active' : ''}" onclick="window.__dengueSetScenario('refractory_hct_high');">
            🟠 Hct cao ≥40% (Đổi CPT)
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === 'refractory_bleeding' ? 'active' : ''}" onclick="window.__dengueSetScenario('refractory_bleeding');">
            🔴 Xuất huyết (Truyền Máu)
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === 'refractory_shock_cvp' ? 'active' : ''}" onclick="window.__dengueSetScenario('refractory_shock_cvp');">
            🟣 Đo CVP &amp; Vận Mạch
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === 'liver_failure' ? 'active' : ''}" onclick="window.__dengueSetScenario('liver_failure');">
            🟤 Suy Gan (NAC)
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === 'fluid_overload' ? 'active' : ''}" onclick="window.__dengueSetScenario('fluid_overload');">
            ⚠️ Dư Dịch / Phù Phổi
          </button>
        </div>
      </div>
    `;

    // Global scenario setter helper
    (window as any).__dengueSetScenario = (scenario: string) => {
      const respEl = document.getElementById('input-response') as HTMLSelectElement | null;
      if (respEl) {
        respEl.value = scenario;
      }
      if (scenario === 'refractory_bleeding') {
        const bl = document.getElementById('input-bleeding') as HTMLInputElement | null;
        if (bl) bl.checked = true;
      } else if (scenario === 'liver_failure') {
        const ast = document.getElementById('input-ast-alt') as HTMLInputElement | null;
        if (ast && !ast.value) ast.value = '1500';
      }
      if (scenario !== 'good') {
        this.activeWorkspaceMode = 'refractory_suite';
        if (scenario === 'refractory_hct_high') this.activeRefractorySubTab = 'tab-cpt';
        else if (scenario === 'refractory_bleeding') this.activeRefractorySubTab = 'tab-blood';
        else if (scenario === 'refractory_shock_cvp') this.activeRefractorySubTab = 'tab-cvp';
        else if (scenario === 'liver_failure') this.activeRefractorySubTab = 'tab-liver';
        else if (scenario === 'fluid_overload') this.activeRefractorySubTab = 'tab-overload';
      }
      this.recalculate();
    };
  }

  private updateWorkspaceModeSwitcher(plan: DengueCDSSPlan): void {
    const modeBtns = document.querySelectorAll('.cdss-mode-btn');
    modeBtns.forEach(btn => {
      const m = btn.getAttribute('data-mode');
      if (m === this.activeWorkspaceMode) {
        btn.classList.add('active');
        if (m === 'refractory_suite' && plan.patient.clinicalResponse !== 'good') {
          btn.classList.add('mode-danger');
        } else {
          btn.classList.remove('mode-danger');
        }
      } else {
        btn.classList.remove('active', 'mode-danger');
      }
    });

    const dot = document.getElementById('refractory-alert-dot');
    if (dot) {
      dot.style.display = plan.patient.clinicalResponse !== 'good' ? 'inline-block' : 'none';
    }

    const hintText = document.getElementById('cdss-mode-hint-text');
    if (hintText) {
      if (this.activeWorkspaceMode === 'fluid_schedule') {
        hintText.textContent = 'Bảng điều phối cọc dịch 4 cột chuẩn hóa (BYT)';
      } else if (this.activeWorkspaceMode === 'refractory_suite') {
        hintText.textContent = 'Phác đồ 6 phân nhánh khi bệnh nhân không đáp ứng';
      } else if (this.activeWorkspaceMode === 'vasopressors') {
        hintText.textContent = 'Công thức pha 4 thuốc vận mạch bơm tiêm điện 50ml';
      } else {
        hintText.textContent = 'Quy trình kiểm soát an toàn điều dưỡng tại giường';
      }
    }
  }

  private renderWorkspaceContent(): void {
    const container = document.getElementById('cdss-workspace-content');
    if (!container || !this.currentPlan) return;

    const plan = this.currentPlan;

    switch (this.activeWorkspaceMode) {
      case 'fluid_schedule':
        this.renderFluidScheduleView(container, plan);
        break;
      case 'refractory_suite':
        this.renderRefractorySuiteView(container, plan);
        break;
      case 'vasopressors':
        this.renderVasopressorsView(container, plan);
        break;
      case 'nursing_checklist':
        this.renderNursingChecklistView(container, plan);
        break;
    }
  }

  // VIEW 1: BẢNG CỌC DỊCH BAN ĐẦU (INITIAL FLUID VIEW)
  private renderFluidScheduleView(container: HTMLElement, plan: DengueCDSSPlan): void {
    const mlPerKg = Math.round(plan.totalVolumeMl / plan.weightResult.adjustedWeightKg);
    const bottles500 = Math.ceil(plan.totalVolumeMl / 500);

    const ageGroup = plan.ageGroup;
    const tpls = DENGUE_FLUID_TEMPLATES[plan.patient.severity][ageGroup];

    container.innerHTML = `
      <!-- Summary Bento Stats -->
      <div class="cdss-kpi-grid" style="margin-bottom: 1.25rem;">
        <div class="cdss-kpi-card">
          <div class="cdss-kpi-icon cdss-kpi-icon--blue">
            <i class="fa-solid fa-fill-drip"></i>
          </div>
          <div class="cdss-kpi-content">
            <span class="cdss-kpi-label">Tổng Dịch Ban Đầu</span>
            <span class="cdss-kpi-value">${plan.totalVolumeMl.toLocaleString('vi-VN')} <small>ml</small></span>
            <span class="cdss-kpi-sub">~ ${mlPerKg} ml/kg cân tính dịch</span>
          </div>
        </div>

        <div class="cdss-kpi-card">
          <div class="cdss-kpi-icon cdss-kpi-icon--purple">
            <i class="fa-solid fa-hourglass-half"></i>
          </div>
          <div class="cdss-kpi-content">
            <span class="cdss-kpi-label">Thời Lượng Dự Kiến</span>
            <span class="cdss-kpi-value">${plan.totalDurationHours} <small>giờ</small></span>
            <span class="cdss-kpi-sub">${plan.fluidRows.length} bậc tốc độ giảm dần</span>
          </div>
        </div>

        <div class="cdss-kpi-card">
          <div class="cdss-kpi-icon cdss-kpi-icon--teal">
            <i class="fa-solid fa-bottle-water"></i>
          </div>
          <div class="cdss-kpi-content">
            <span class="cdss-kpi-label">Ước Tính Số Chai 500ml</span>
            <span class="cdss-kpi-value">${bottles500} <small>chai</small></span>
            <span class="cdss-kpi-sub">Ringer Lactate / NaCl 0.9%</span>
          </div>
        </div>
      </div>

      <!-- VISUAL FLUID TIMELINE -->
      <div class="cdss-timeline-card">
        <div class="cdss-timeline-header">
          <span class="cdss-timeline-title">
            <i class="fa-solid fa-chart-gantt"></i> Tiến Trình Bậc Dịch Truyền Ban Đầu Theo Giờ
          </span>
          <span class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">
            ${plan.totalDurationHours} Giờ Truyền
          </span>
        </div>
        <div class="cdss-timeline-track" id="cdss-timeline-track">
          ${plan.fluidRows.map((r, idx) => {
            const colors = ['cdss-seg-1', 'cdss-seg-2', 'cdss-seg-3', 'cdss-seg-4', 'cdss-seg-5'];
            const colClass = colors[idx % colors.length];
            return `
              <div class="cdss-timeline-segment ${colClass}" style="flex: ${r.durationHours};" title="Cữ ${r.stepIndex}: ${r.rateMlKgH} ml/kg/h (${r.durationHours}h) - Cần ${r.totalMl} ml">
                <span>${r.rateMlKgH} ml/kg/h</span>
                <small>Cữ ${r.stepIndex} (${r.durationHours}h)</small>
              </div>
            `;
          }).join('')}
        </div>
        <div class="cdss-timeline-ticks">
          <span><i class="fa-regular fa-clock"></i> Khởi đầu: <strong>${plan.fluidRows[0]?.timeWindow.split(' - ')[0] || '08:00'}</strong></span>
          <span>${plan.fluidRows.length} giai đoạn bù dịch liên tục</span>
          <span>Kết thúc: <strong>${plan.fluidRows[plan.fluidRows.length - 1]?.timeWindow.split(' - ')[1]?.split(' ')[0] || '24h'}</strong></span>
        </div>
      </div>

      <!-- BẢNG ĐIỀU PHỐI CỌC DỊCH 4 CỘT -->
      <section class="cdss-table-card">
        <div class="cdss-table-header-wrap">
          <div class="cdss-table-title-area">
            <h2 class="cdss-table-title">
              <i class="fa-solid fa-table-list"></i> Bảng Điều Phối Cọc Dịch 4 Cột Chuẩn Hóa
            </h2>
            <p class="cdss-table-desc">
              Tự động gộp thể tích, tính giọt/phút (dây 20g/ml), chuyển dịch dư và tính số chai 500ml treo thêm tại cọc.
            </p>
          </div>
          <button id="btn-reset-durations-sub" class="cdss-action-btn" title="Khôi phục thời lượng chuẩn Bộ Y Tế">
            <i class="fa-solid fa-clock-rotate-left"></i> <span>Đặt Lại Giờ Chuẩn</span>
          </button>
        </div>

        <!-- Desktop / Tablet Table -->
        <div class="cdss-table-scroll">
          <table class="cdss-table">
            <thead>
              <tr>
                <th style="width: 22%;">Cột 1: Mốc Giờ &amp; Thời Lượng</th>
                <th style="width: 28%;">Cột 2: Tốc Độ &amp; Lượng Dịch Cần</th>
                <th style="width: 26%;">Cột 3: Dịch Có SẴN / Treo Thêm</th>
                <th style="width: 24%;">Cột 4: Tổng Cọc &amp; Giám Sát</th>
              </tr>
            </thead>
            <tbody>
              ${plan.fluidRows.map((r, idx) => {
                const tpl = tpls[idx];
                const durationOptions = tpl?.durationOptions || [r.durationHours];
                const optionsHtml = durationOptions.map(dur => `
                  <option value="${dur}" ${dur === r.durationHours ? 'selected' : ''}>${dur} giờ</option>
                `).join('');

                return `
                  <tr>
                    <td>
                      <div class="cdss-step-badge">Cữ ${r.stepIndex}</div>
                      <div class="cdss-time-window">${r.timeWindow}</div>
                      <div class="cdss-duration-picker">
                        <label><i class="fa-regular fa-clock"></i> Thời lượng:</label>
                        <select class="cdss-duration-select" data-row-idx="${idx}">
                          ${optionsHtml}
                        </select>
                      </div>
                      <div class="cdss-stage-title">${r.stageName}</div>
                    </td>
                    <td>
                      <div class="cdss-rate-display">
                        <span class="cdss-rate-number">${r.rateMlKgH}</span>
                        <span class="cdss-rate-unit">ml/kg/giờ</span>
                      </div>
                      <div class="cdss-drops-box">
                        <i class="fa-solid fa-water" style="color:var(--cdss-info);"></i> 
                        <strong>${r.dropsPerMin}</strong> giọt/phút
                        <small style="color:var(--cdss-text-muted);">(Dây 20 g/ml)</small>
                      </div>
                      <div class="cdss-volume-calc">
                        Thể tích cần: <strong>${r.totalMl.toLocaleString('vi-VN')} ml</strong>
                        <div style="font-size:0.7rem; color:var(--cdss-text-muted);">
                          (${r.rateMlKgH} × ${plan.weightResult.adjustedWeightKg}kg × ${r.durationHours}h)
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="cdss-carry-over">
                        Dịch sẵn từ cữ trước: <strong>${r.existingFluidMl} ml</strong>
                      </div>
                      <div>
                        <span class="cdss-hang-badge ${r.bottlesToHang > 0 ? 'cdss-hang-badge--active' : ''}">
                          <i class="fa-solid fa-plus"></i> Treo thêm: <strong>${r.bottlesToHang}</strong> chai 500ml
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="cdss-pole-metric">
                        Tổng có trên cọc: <strong>${r.totalAtPoleMl.toLocaleString('vi-VN')} ml</strong>
                      </div>
                      ${r.hctCheckRequired ? `
                        <div class="cdss-hct-pill">
                          <i class="fa-solid fa-vial"></i> <strong>Đo lại Hct tại giường</strong>
                        </div>
                      ` : ''}
                      <div class="cdss-monitor-tip">
                        ${r.monitoringNotes}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;

    // Attach row select events
    const selects = container.querySelectorAll('.cdss-duration-select');
    selects.forEach(sel => {
      sel.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        const rowIdx = parseInt(target.getAttribute('data-row-idx') || '0', 10);
        const newDur = parseFloat(target.value);
        this.customDurations[rowIdx] = newDur;
        this.recalculate();
      });
    });

    const btnSub = container.querySelector('#btn-reset-durations-sub');
    if (btnSub) {
      btnSub.addEventListener('click', () => {
        this.customDurations = {};
        this.recalculate();
        this.showToast('Đã khôi phục thời lượng cữ chuẩn theo Bộ Y Tế!');
      });
    }
  }

  // VIEW 2: PHÁC ĐỒ XỬ TRÍ KHI KHÔNG ĐÁP ỨNG & SỐC TRƠ
  private renderRefractorySuiteView(container: HTMLElement, plan: DengueCDSSPlan): void {
    const effectiveWeight = plan.weightResult.adjustedWeightKg;
    const albuminCalc = calculateAlbuminDose(effectiveWeight, 2.0, 3.5);

    container.innerHTML = `
      <section class="cdss-refractory-card" style="margin-top:0;">
        <div class="cdss-refractory-header">
          <h2 class="cdss-refractory-title">
            <i class="fa-solid fa-shield-virus"></i> Phác Đồ Xử Trí Khi Không Đáp Ứng &amp; Sốc Trơ (Bộ Y Tế 2023)
          </h2>
          <span class="cdss-brand-badge" style="background:rgba(239, 68, 68, 0.1); color:var(--cdss-danger); border-color:rgba(239,68,68,0.3);">
            Phụ lục 8, 16, 17, 18 &amp; 26
          </span>
        </div>

        <!-- Refractory Sub-Tabs Nav -->
        <div class="cdss-refractory-nav" id="cdss-ref-subtabs">
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === 'tab-cpt' ? 'active' : ''}" data-subtab="tab-cpt">
            <i class="fa-solid fa-arrow-trend-up text-warning"></i>
            <span>1. Đổi CPT Nấc Thang</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === 'tab-blood' ? 'active' : ''}" data-subtab="tab-blood">
            <i class="fa-solid fa-droplet text-danger"></i>
            <span>2. Máu &amp; Albumin (PL 17)</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === 'tab-cvp' ? 'active' : ''}" data-subtab="tab-cvp">
            <i class="fa-solid fa-gauge-high text-primary"></i>
            <span>3. Đo CVP &amp; Vận Mạch (PL 18)</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === 'tab-abcs' ? 'active' : ''}" data-subtab="tab-abcs">
            <i class="fa-solid fa-kit-medical text-purple"></i>
            <span>4. Gói Hồi Sức ABCS</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === 'tab-liver' ? 'active' : ''}" data-subtab="tab-liver">
            <i class="fa-solid fa-triangle-exclamation text-danger"></i>
            <span>5. Suy Gan Cấp (NAC - PL 26)</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === 'tab-overload' ? 'active' : ''}" data-subtab="tab-overload">
            <i class="fa-solid fa-water text-info"></i>
            <span>6. Quá Tải / Phù Phổi Cấp</span>
          </button>
        </div>

        <div class="cdss-refractory-body" id="cdss-ref-subtab-content">
          <!-- Dynamic Content -->
        </div>
      </section>
    `;

    // Render active sub-tab content
    this.renderSubTabContent(plan);

    // Attach sub-tab click events
    const subTabBtns = container.querySelectorAll('.cdss-ref-tab-btn');
    subTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const sub = target.getAttribute('data-subtab');
        if (sub) {
          subTabBtns.forEach(b => b.classList.remove('active'));
          target.classList.add('active');
          this.activeRefractorySubTab = sub;
          this.renderSubTabContent(plan);
        }
      });
    });
  }

  private renderSubTabContent(plan: DengueCDSSPlan): void {
    const body = document.getElementById('cdss-ref-subtab-content');
    if (!body) return;

    const effectiveWeight = plan.weightResult.adjustedWeightKg;
    const albuminCalc = calculateAlbuminDose(effectiveWeight, 2.0, 3.5);

    switch (this.activeRefractorySubTab) {
      case 'tab-cpt': {
        const cptScen = DENGUE_NON_RESPONSE_SCENARIOS.cpt_escalation;
        const rateAdult = Math.round(15 * effectiveWeight);
        const rateChild = Math.round(20 * effectiveWeight);
        body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-text); margin:0;">
                  ${cptScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${cptScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge">${cptScen.tag}</span>
            </div>

            <div style="background:var(--cdss-surface-alt); border:1px solid var(--cdss-border); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.82rem; line-height:1.45; margin-bottom:0.6rem;">
                <strong>Cơ chế sinh lý bệnh:</strong> ${cptScen.mechanism}
              </div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--cdss-primary);">
                <strong>Xử trí tức thì:</strong> ${cptScen.primaryAction}
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
              <div class="cdss-card" style="padding:0.85rem; border-top:3px solid var(--cdss-warning);">
                <div style="font-size:0.85rem; font-weight:800; margin-bottom:0.4rem; color:var(--cdss-text);">
                  <i class="fa-solid fa-child text-warning"></i> Liều Trẻ Em (< 16 Tuổi)
                </div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--cdss-warning); font-family:var(--cdss-font-mono);">
                  10 - 20 ml/kg/giờ
                </div>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:4px;">
                  Bệnh nhân (${effectiveWeight}kg): <strong>${Math.round(10 * effectiveWeight)} - ${rateChild} ml/giờ</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:6px;">
                  Truyền trong 1 giờ. Nếu ra sốc: giảm bậc 10 ml/kg/h (1-2h) -> 7.5 -> 5 -> 3 ml/kg/h.
                </div>
              </div>

              <div class="cdss-card" style="padding:0.85rem; border-top:3px solid var(--cdss-primary);">
                <div style="font-size:0.85rem; font-weight:800; margin-bottom:0.4rem; color:var(--cdss-text);">
                  <i class="fa-solid fa-user-doctor text-primary"></i> Liều Người Lớn (≥ 16 Tuổi)
                </div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--cdss-primary); font-family:var(--cdss-font-mono);">
                  10 - 15 ml/kg/giờ
                </div>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:4px;">
                  Bệnh nhân (${effectiveWeight}kg): <strong>${Math.round(10 * effectiveWeight)} - ${rateAdult} ml/giờ</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:6px;">
                  Truyền trong 1 giờ. Nếu ra sốc: giảm bậc 10 -> 7.5 -> 5 -> 3 ml/kg/h.
                </div>
              </div>
            </div>

            <div style="font-size:0.8rem; background:var(--cdss-surface); border:1px solid var(--cdss-border); border-radius:6px; padding:0.75rem 1rem;">
              <strong style="color:var(--cdss-text);"><i class="fa-solid fa-list-check text-primary"></i> Y lệnh cụ thể &amp; Giám sát:</strong>
              <ul style="margin:0.4rem 0 0 1.2rem; padding:0; line-height:1.45;">
                ${cptScen.keyOrders.map(o => `<li>${o}</li>`).join('')}
              </ul>
              <div style="margin-top:0.6rem; padding-top:0.4rem; border-top:1px dashed var(--cdss-border); color:var(--cdss-danger); font-size:0.76rem; font-weight:600;">
                <i class="fa-solid fa-triangle-exclamation"></i> Giới hạn tổng liều CPT: Tối đa 60 ml/kg. Nếu tổng CPT ≥ 60 ml/kg mà còn sốc -> Bắt buộc đo CVP và xem xét bù Albumin 5%!
              </div>
            </div>
          </div>
        `;
        break;
      }

      case 'tab-blood': {
        const bloodScen = DENGUE_NON_RESPONSE_SCENARIOS.occult_bleeding;
        const products = plan.bloodProducts;
        body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-danger); margin:0;">
                  <i class="fa-solid fa-droplet"></i> ${bloodScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${bloodScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge cdss-dose-badge--danger">${bloodScen.tag}</span>
            </div>

            <!-- Bảng Tính Chế Phẩm Máu Theo Cân Nặng Bệnh Nhân -->
            <table class="cdss-ref-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Chế Phẩm Máu / Thuốc</th>
                  <th style="width: 25%;">Liều Tính Ra (${effectiveWeight}kg)</th>
                  <th style="width: 28%;">Chỉ Định &amp; Ngưỡng Truyền (BYT 2023)</th>
                  <th style="width: 22%;">Lưu Ý An Toàn</th>
                </tr>
              </thead>
              <tbody>
                ${products.map(p => `
                  <tr>
                    <td>
                      <div style="font-weight:700; color:var(--cdss-text);">${p.productName}</div>
                      <div style="font-size:0.72rem; color:var(--cdss-text-muted);">${p.doseFormula}</div>
                    </td>
                    <td>
                      <span class="cdss-dose-badge ${p.thresholdMet ? 'cdss-dose-badge--danger' : ''}">${p.calculatedDose}</span>
                    </td>
                    <td style="font-size:0.76rem;">${p.indication}</td>
                    <td style="font-size:0.74rem; color:var(--cdss-text-muted);">${p.precautions}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <!-- Bảng Tính Bù Albumin Theo Công Thức QĐ 2760 -->
            <div class="cdss-albumin-calc-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                <div style="font-size:0.9rem; font-weight:800; color:var(--cdss-primary);">
                  <i class="fa-solid fa-flask-vial"></i> Bảng Tính Bù Albumin (Bộ Y Tế Trang 20 - QĐ 2760)
                </div>
                <span class="cdss-brand-badge">Áp lực keo</span>
              </div>
              <div style="font-size:0.8rem; color:var(--cdss-text); margin-bottom:0.6rem;">
                ${albuminCalc.indicationNotes}
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.6rem; background:var(--cdss-surface); border-radius:6px; padding:0.6rem; border:1px solid var(--cdss-border);">
                <div>
                  <div style="font-size:0.72rem; color:var(--cdss-text-muted);">Liều Albumin nguyên chất</div>
                  <strong style="font-size:1.05rem; color:var(--cdss-primary); font-family:var(--cdss-font-mono);">${albuminCalc.albuminGrams} g</strong>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted);">Cần ${albuminCalc.vials20Percent50ml} lọ Albumin 20% 50ml</div>
                </div>
                <div>
                  <div style="font-size:0.72rem; color:var(--cdss-text-muted);">Cách pha 5% (chuẩn)</div>
                  <div style="font-size:0.76rem; font-weight:600;">${albuminCalc.preparation5Percent}</div>
                </div>
                <div>
                  <div style="font-size:0.72rem; color:var(--cdss-text-muted);">Tốc độ truyền khuyến cáo</div>
                  <div style="font-size:0.76rem; font-weight:700; color:var(--cdss-primary);">${albuminCalc.infusionRateMlH}</div>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      case 'tab-cvp': {
        const cvpScen = DENGUE_NON_RESPONSE_SCENARIOS.refractory_shock_cvp;
        const testDose = Math.round(5 * effectiveWeight);
        body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-purple); margin:0;">
                  <i class="fa-solid fa-gauge-high"></i> ${cvpScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${cvpScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge" style="background:var(--cdss-purple-light); color:var(--cdss-purple); border-color:var(--cdss-purple);">
                ${cvpScen.tag}
              </span>
            </div>

            <!-- Khuyến cáo đặt Catheter Tĩnh Mạch Nền Khuỷu Tay -->
            <div style="background:rgba(139, 92, 246, 0.05); border:1px solid rgba(139, 92, 246, 0.2); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--cdss-purple); margin-bottom:0.35rem;">
                <i class="fa-solid fa-triangle-exclamation"></i> KỸ THUẬT ĐẶT CVP BẮT BUỘC: QUA TĨNH MẠCH NỀN KHUỶU TAY (SELDINGER CẢI TIẾN)
              </div>
              <div style="font-size:0.78rem; line-height:1.45; color:var(--cdss-text);">
                <strong>Tuyệt đối KHÔNG chọc tĩnh mạch cảnh trong hoặc dưới đòn:</strong> Bệnh nhân SXHD nặng có rối loạn đông máu và giảm tiểu cầu sâu; nguy cơ tụ máu chèn ép khí quản và tràn máu màng phổi tử vong không thể ép cầm máu được. Đặt TM nền khuỷu tay ép cầm máu dễ dàng và an toàn 100%.
              </div>
            </div>

            <!-- Test Dịch & Phân Nhánh CVP -->
            <div style="background:var(--cdss-surface-alt); border:1px solid var(--cdss-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:0.85rem; font-weight:800; margin-bottom:0.4rem; color:var(--cdss-text);">
                <i class="fa-solid fa-vial"></i> Test Dịch Đo CVP: Cao Phân Tử 5 ml/kg trong 30 phút (${testDose} ml)
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-top:0.6rem;">
                <div style="background:var(--cdss-surface); border:1px solid rgba(2, 132, 199, 0.3); border-radius:6px; padding:0.75rem; border-top:3px solid var(--cdss-primary);">
                  <div style="font-weight:800; color:var(--cdss-primary); font-size:0.88rem; margin-bottom:0.25rem;">
                    1. Nếu CVP ≤ 15 cmH2O (IVC xẹp)
                  </div>
                  <div style="font-size:0.78rem; line-height:1.4; color:var(--cdss-text-muted);">
                    • Vẫn còn thiếu thể tích tuần hoàn hữu hiệu.<br>
                    • Tiếp tục truyền Cao Phân Tử 10 - 20 ml/kg/h.<br>
                    • Nếu tổng CPT ≥ 60 ml/kg kèm Albumin < 2.5 g/dL: Bù Albumin 5% hoặc 10%.
                  </div>
                </div>

                <div style="background:var(--cdss-surface); border:1px solid rgba(239, 68, 68, 0.3); border-radius:6px; padding:0.75rem; border-top:3px solid var(--cdss-danger);">
                  <div style="font-weight:800; color:var(--cdss-danger); font-size:0.88rem; margin-bottom:0.25rem;">
                    2. Nếu CVP > 15 cmH2O (IVC căng to)
                  </div>
                  <div style="font-size:0.78rem; line-height:1.4; color:var(--cdss-text-muted);">
                    • Quá tải thể tích hoặc suy co bóp tim.<br>
                    • Ngưng dịch nếu có dấu hiệu quá tải.<br>
                    • <strong>Dobutamin 3 - 10 µg/kg/phút</strong> tăng co bóp cơ tim.<br>
                    • Phối hợp <strong>Noradrenalin</strong> nếu HA tâm trương tụt (sốc ấm).<br>
                    • Phối hợp <strong>Adrenalin</strong> nếu sốc kháng trị co bóp tim suy giảm.
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      case 'tab-abcs': {
        const abcs = plan.abcsChecklist;
        body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-text); margin:0;">
                <i class="fa-solid fa-kit-medical text-primary"></i> Gói Hồi Sức Toàn Diện ABCS (Phụ Lục 16.2 &amp; 18)
              </h3>
              <span class="cdss-brand-badge">Bắt buộc khi sốc trơ</span>
            </div>
            <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-bottom:0.85rem;">
              Ở mọi bệnh nhân sốc SXHD không đáp ứng bù dịch hoặc tái sốc nhiều lần, bắt buộc rà soát đồng thời 4 yếu tố cơ bản ABCS để đảo ngược toan kiềm, hạ canxi và suy tạng:
            </div>

            <div class="cdss-abcs-grid">
              <div class="cdss-abcs-card cdss-abcs-card--acidosis">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-vial-virus text-danger"></i> ${abcs.acidosis.title}
                </div>
                <div class="cdss-abcs-criteria">Ngưỡng: ${abcs.acidosis.criteria}</div>
                <div class="cdss-abcs-action">${abcs.acidosis.action}</div>
              </div>

              <div class="cdss-abcs-card cdss-abcs-card--bleeding">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-droplet text-danger"></i> ${abcs.bleeding.title}
                </div>
                <div class="cdss-abcs-criteria">Ngưỡng: ${abcs.bleeding.criteria}</div>
                <div class="cdss-abcs-action">${abcs.bleeding.action}</div>
              </div>

              <div class="cdss-abcs-card cdss-abcs-card--calcium">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-bone text-warning"></i> ${abcs.calcium.title}
                </div>
                <div class="cdss-abcs-criteria">Ngưỡng: ${abcs.calcium.criteria}</div>
                <div class="cdss-abcs-action">${abcs.calcium.action}</div>
              </div>

              <div class="cdss-abcs-card cdss-abcs-card--sugar">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-cubes-stacked text-success"></i> ${abcs.sugar.title}
                </div>
                <div class="cdss-abcs-criteria">Ngưỡng: ${abcs.sugar.criteria}</div>
                <div class="cdss-abcs-action">${abcs.sugar.action}</div>
              </div>
            </div>
          </div>
        `;
        break;
      }

      case 'tab-liver': {
        const nac = plan.nacProtocol;
        const liverScen = DENGUE_NON_RESPONSE_SCENARIOS.acute_liver_failure;
        body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-danger); margin:0;">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${liverScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${liverScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge cdss-dose-badge--danger">${liverScen.tag}</span>
            </div>

            <!-- Cảnh Báo Chống Chỉ Định Tuyệt Đối Ringer Lactate & Paracetamol -->
            <div style="background:rgba(239, 68, 68, 0.08); border:1.5px solid var(--cdss-danger); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.9rem; font-weight:800; color:var(--cdss-danger); margin-bottom:0.35rem;">
                <i class="fa-solid fa-ban"></i> CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI RINGER LACTATE &amp; PARACETAMOL!
              </div>
              <div style="font-size:0.78rem; line-height:1.45; color:var(--cdss-text);">
                Khi gan tổn thương nặng hoặc suy gan cấp (AST/ALT ≥ 1000 U/L), gan không chuyển hóa được lactate dẫn đến bùng phát toan lactic tử vong. Dịch thay thế bắt buộc: <strong>NaCl 0.9% hoặc Ringer Acetate, Dextrosaline</strong>. Hạ sốt bằng lau mát nước ấm.
              </div>
            </div>

            <!-- Bảng Phác Đồ N-Acetylcysteine 4 Pha -->
            <div style="font-size:0.85rem; font-weight:800; color:var(--cdss-text); margin-bottom:0.4rem;">
              Phác Đồ Truyền N-Acetylcysteine (NAC) Tĩnh Mạch 4 Pha (Phụ Lục 26 - QĐ 2760)
            </div>
            <table class="cdss-ref-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Giai Đoạn</th>
                  <th style="width: 20%;">Liều mg/kg</th>
                  <th style="width: 25%;">Tổng Lượng (${effectiveWeight}kg)</th>
                  <th style="width: 30%;">Dung Môi &amp; Tốc Độ Bơm Tiêm</th>
                </tr>
              </thead>
              <tbody>
                ${nac.phases.map(p => `
                  <tr>
                    <td><strong>${p.phaseName}</strong></td>
                    <td><span class="cdss-dose-badge">${p.doseMgKg} mg/kg</span></td>
                    <td><strong>${p.totalMg.toLocaleString('vi-VN')} mg</strong></td>
                    <td style="font-size:0.78rem;">
                      <div>${p.diluent}</div>
                      <div style="color:var(--cdss-primary); font-weight:700;">Tốc độ: ${p.pumpRateMlH}</div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `;
        break;
      }

      case 'tab-overload': {
        const overScen = DENGUE_NON_RESPONSE_SCENARIOS.fluid_overload;
        const furoDose = Math.round(0.75 * effectiveWeight * 10) / 10;
        body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-warning); margin:0;">
                  <i class="fa-solid fa-water"></i> ${overScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${overScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge" style="background:var(--cdss-warning-light); color:var(--cdss-warning); border-color:var(--cdss-warning);">
                ${overScen.tag}
              </span>
            </div>

            <!-- Xử Trí Khẩn Cấp -->
            <div style="background:rgba(245, 158, 11, 0.08); border:1.5px solid var(--cdss-warning); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.9rem; font-weight:800; color:var(--cdss-warning); margin-bottom:0.35rem;">
                <i class="fa-solid fa-stop-circle"></i> NGƯNG NGAY DỊCH TRUYỀN TĨNH MẠCH!
              </div>
              <div style="font-size:0.8rem; line-height:1.45; color:var(--cdss-text);">
                (1) Nằm đầu cao 30 - 45°.<br>
                (2) Thở oxy qua canulla 2 - 5 L/p -> Thở NCPAP áp lực 4 - 6 cmH2O nếu SpO2 < 92%.<br>
                (3) <strong>Furosemide:</strong> 0.5 - 1 mg/kg tiêm TM chậm (Bệnh nhân ${effectiveWeight}kg: <strong>${furoDose} mg</strong> TM). <em>Chỉ dùng khi huyết áp ổn định</em>.<br>
                (4) <strong>Dobutamin:</strong> 5 - 10 µg/kg/phút để tăng co bóp cơ tim, giảm áp lực mao mạch phổi bít.<br>
                (5) Chọc hút giải áp màng bụng/màng phổi khi suy hô hấp nặng và áp lực bàng quang > 27 cmH2O.
              </div>
            </div>
          </div>
        `;
        break;
      }
    }
  }

  // VIEW 3: THUỐC VẬN MẠCH 4 LOẠI BƠM TIÊM ĐIỆN 50ML
  private renderVasopressorsView(container: HTMLElement, plan: DengueCDSSPlan): void {
    const {
      vasopressorDopamin: d,
      vasopressorNoradrenalin: n,
      vasopressorDobutamin: dob,
      vasopressorAdrenalin: adr
    } = plan;

    container.innerHTML = `
      <div class="cdss-card" style="margin-top:0;">
        <div class="cdss-card-header">
          <div>
            <h2 class="cdss-card-title">
              <i class="fa-solid fa-syringe text-primary"></i> Phác Đồ 4 Thuốc Vận Mạch Bơm Tiêm Điện 50ml
            </h2>
            <div style="font-size:0.78rem; color:var(--cdss-text-muted); margin-top:2px;">
              Chuẩn hóa 100% theo Phụ lục 15 &amp; 18 — Quyết định 2760/QĐ-BYT (Tính theo ${plan.weightResult.adjustedWeightKg} kg cân tính dịch)
            </div>
          </div>
          <span class="cdss-brand-badge">Bơm Tiêm 50ml</span>
        </div>

        <div style="padding:1rem;">
          <div class="cdss-vaso-quad-grid">
            <!-- 1. Dopamin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name cdss-drug-name--primary">1. Dopamin</div>
                  <div class="cdss-drug-indication">Lựa chọn đầu tay ở trẻ em</div>
                </div>
                <span class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">1 ml/h = 1 µg</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Công thức pha:</span>
                  <span><strong>${d.totalMg} mg</strong> Dopamin (3 × ${d.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung môi:</span>
                  <span>Glucose 5% vừa đủ <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight text-primary">
                  <span>Quy đổi liều:</span>
                  <span>Tốc độ 1 ml/giờ = 1 µg/kg/phút</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Liều Khuyến Cáo</div>
                  <strong>${d.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Tốc Độ Bơm</div>
                  <strong style="color:var(--cdss-primary); font-size:1.05rem;">${d.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${d.precautions}</span>
              </p>
            </div>

            <!-- 2. Noradrenalin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name cdss-drug-name--danger">2. Noradrenalin</div>
                  <div class="cdss-drug-indication">Sốc giãn mạch / Tụt HA tâm trương / Người lớn</div>
                </div>
                <span class="cdss-brand-badge cdss-brand-badge--danger">High Alert</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Công thức pha:</span>
                  <span><strong>${n.totalMg} mg</strong> Noradrenalin (0.3 × ${n.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung môi:</span>
                  <span>Glucose 5% vừa đủ <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight text-danger">
                  <span>Quy đổi liều:</span>
                  <span>Tốc độ 1 ml/giờ = 0.1 µg/kg/phút</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Liều Khởi Đầu</div>
                  <strong>${n.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Tốc Độ Bơm</div>
                  <strong style="color:var(--cdss-danger); font-size:1.05rem;">${n.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${n.precautions}</span>
              </p>
            </div>

            <!-- 3. Dobutamin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name" style="color:var(--cdss-purple);">3. Dobutamin</div>
                  <div class="cdss-drug-indication">CVP > 15 cmH2O / Giảm co bóp cơ tim</div>
                </div>
                <span class="cdss-brand-badge" style="background:var(--cdss-purple-light); color:var(--cdss-purple); border-color:var(--cdss-purple);">Inotrope</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Công thức pha:</span>
                  <span><strong>${dob.totalMg} mg</strong> Dobutamin (3 × ${dob.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung môi:</span>
                  <span>Glucose 5% vừa đủ <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight" style="color:var(--cdss-purple);">
                  <span>Quy đổi liều:</span>
                  <span>Tốc độ 1 ml/giờ = 1 µg/kg/phút</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Liều Khởi Đầu</div>
                  <strong>${dob.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Tốc Độ Bơm</div>
                  <strong style="color:var(--cdss-purple); font-size:1.05rem;">${dob.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${dob.precautions}</span>
              </p>
            </div>

            <!-- 4. Adrenalin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name text-danger">4. Adrenalin</div>
                  <div class="cdss-drug-indication">Sốc kháng trị / Mạch rời rạc / Ngừng tuần hoàn</div>
                </div>
                <span class="cdss-brand-badge cdss-brand-badge--danger">Cấp cứu tối khẩn</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Công thức pha:</span>
                  <span><strong>${adr.totalMg} mg</strong> Adrenalin (0.3 × ${adr.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung môi:</span>
                  <span>Glucose 5% vừa đủ <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight text-danger">
                  <span>Quy đổi liều:</span>
                  <span>Tốc độ 1 ml/giờ = 0.1 µg/kg/phút</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Liều Cứu Nguy</div>
                  <strong>${adr.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Tốc Độ Bơm</div>
                  <strong style="color:var(--cdss-danger); font-size:1.05rem;">${adr.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${adr.precautions}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // VIEW 4: ĐIỀU DƯỠNG AN TOÀN & BẢNG KIỂM
  private renderNursingChecklistView(container: HTMLElement, plan: DengueCDSSPlan): void {
    container.innerHTML = `
      <div class="cdss-card" style="margin-top:0;">
        <div class="cdss-card-header">
          <h2 class="cdss-card-title">
            <i class="fa-solid fa-user-nurse text-success"></i> Quy Trình Điều Dưỡng An Toàn &amp; Bảng Kiểm Tại Giường
          </h2>
          <span class="cdss-brand-badge">HKKK Chuẩn BYT</span>
        </div>
        <div style="padding:1rem;">
          <ul class="cdss-nursing-list" style="margin:0;">
            ${plan.nursingInstructions.map(item => `
              <li class="cdss-nursing-item">
                <i class="fa-solid fa-circle-check"></i>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  private updateMobileStickyBar(plan: DengueCDSSPlan): void {
    const elWeight = document.getElementById('mbar-weight');
    const elSeverity = document.getElementById('mbar-severity-badge');
    const elVolume = document.getElementById('mbar-volume-sub');

    if (elWeight) {
      elWeight.textContent = `${plan.weightResult.adjustedWeightKg} kg`;
    }
    if (elSeverity) {
      const sevMap: Record<DengueSeverity, string> = {
        warning_signs: 'Dấu Hiệu Cảnh Báo',
        shock: 'Sốc SXHD',
        severe_shock: 'Sốc Nguy Kịch'
      };
      elSeverity.textContent = sevMap[plan.patient.severity];
    }
    if (elVolume) {
      elVolume.textContent = `Tổng: ${plan.totalVolumeMl.toLocaleString('vi-VN')} ml (${plan.totalDurationHours}h)`;
    }
  }

  private renderPrintSheet(plan: DengueCDSSPlan): void {
    const el = document.getElementById('cdss-print-sheet');
    if (!el) return;

    const {
      patient,
      weightResult,
      fluidRows,
      totalVolumeMl,
      totalDurationHours,
      vasopressorDopamin: d,
      vasopressorNoradrenalin: n,
      vasopressorDobutamin: dob,
      branchDecision
    } = plan;

    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const severityText = patient.severity === 'warning_signs'
      ? 'Có Dấu Hiệu Cảnh Báo (DHCB)'
      : patient.severity === 'shock'
        ? 'Sốc Sốt Xuất Huyết Dengue (Còn Bù)'
        : 'Sốc Sốt Xuất Huyết Dengue Nguy Kịch (Mạch 0, HA 0)';

    const genderText = patient.gender === 'male' ? 'Nam' : 'Nữ';
    const mlPerKg = Math.round(totalVolumeMl / weightResult.adjustedWeightKg);
    const bottles500 = Math.ceil(totalVolumeMl / 500);

    el.innerHTML = `
      <div class="cdss-print-page">
        <!-- HEADER CƠ QUAN & TIÊU ĐỀ PHIẾU IN -->
        <div class="cdss-print-meta-top">
          <div class="cdss-print-left-org">
            <div style="font-weight:bold; text-transform:uppercase;">KHOA CẤP CỨU / HỒI SỨC TÍCH CỰC</div>
            <div>BỆNH ÁN SỐ: ................................</div>
            <div>PHÒNG / GIƯỜNG: ........................</div>
          </div>
          <div class="cdss-print-right-org">
            <div style="font-weight:bold;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div style="font-style:italic;">Độc lập - Tự do - Hạnh phúc</div>
            <div style="font-size:0.85em; margin-top:2px;">Thời điểm lập phiếu: ${dateFormatted}</div>
          </div>
        </div>

        <div class="cdss-print-title-area">
          <h1 class="cdss-print-main-title">PHIẾU Y LỆNH TRUYỀN DỊCH &amp; CHỐNG SỐC SXHD DENGUE</h1>
          <div class="cdss-print-sub-title">(Theo Hướng dẫn Chẩn đoán &amp; Điều trị Sốt Xuất Huyết Dengue — Quyết định 2760/QĐ-BYT 2023)</div>
        </div>

        <!-- THÔNG TIN BỆNH NHÂN & ĐÁNH GIÁ CÂN NẶNG CDC 2014 -->
        <div class="cdss-print-patient-box">
          <div class="cdss-print-row">
            <span>Họ và tên người bệnh: <strong>...........................................................................</strong></span>
            <span>Tuổi: <strong>${patient.ageYears} tuổi</strong></span>
            <span>Giới tính: <strong>${genderText}</strong></span>
          </div>

          <div class="cdss-print-row" style="margin-top: 5px;">
            <span>Cân thực tế: <strong>${weightResult.actualWeightKg} kg</strong></span>
            <span>Chuẩn CDC 2014: <strong>${weightResult.standardWeightKg} kg</strong></span>
            <span class="cdss-print-weight-highlight">
              CÂN TÍNH DỊCH (CDSS): <strong>${weightResult.adjustedWeightKg} kg</strong>
              ${weightResult.isObese ? '<em>(HIỆU CHỈNH TRẺ BÉO PHÌ &gt; 120% CHUẨN)</em>' : ''}
            </span>
          </div>

          <div class="cdss-print-row" style="margin-top: 5px;">
            <span>Chẩn đoán / Phân độ: <strong style="text-transform:uppercase;">${severityText}</strong></span>
            <span>Đáp ứng lâm sàng: <strong>${branchDecision.title}</strong></span>
          </div>
        </div>

        <!-- Y LỆNH XỬ TRÍ KHÔNG ĐÁP ỨNG NẾU CÓ -->
        ${branchDecision.branchType !== 'standard' ? `
          <div style="border:1.5px solid #000; padding:6px 10px; margin-bottom:8px; background:#fff7ed;">
            <div style="font-weight:bold; font-size:10pt; text-transform:uppercase; color:#b91c1c;">
              [!] Y LỆNH XỬ TRÍ KHI KHÔNG ĐÁP ỨNG: ${branchDecision.title}
            </div>
            <div style="font-size:9pt; margin-top:2px;">
              <strong>Hướng xử trí:</strong> ${branchDecision.recommendedFluid} | <strong>Lý do:</strong> ${branchDecision.reasoning}
            </div>
          </div>
        ` : ''}

        <!-- BẢNG ĐIỀU PHỐI CỌC DỊCH 4 CỘT CHUẨN HÓA (TRỌNG TÂM PHIẾU IN) -->
        <table class="cdss-print-table">
          <thead>
            <tr>
              <th style="width: 17%;">MỐC GIỜ & THỜI LƯỢNG</th>
              <th style="width: 25%;">TỐC ĐỘ & LƯỢNG DỊCH CẦN</th>
              <th style="width: 24%;">ĐIỀU PHỐI TẠI CỌC</th>
              <th style="width: 22%;">GIÁM SÁT & ĐO LẠI HCT</th>
              <th style="width: 12%;">ĐD THỰC HIỆN</th>
            </tr>
          </thead>
          <tbody>
            ${fluidRows.map(r => `
              <tr>
                <td style="text-align: center;">
                  <div style="font-weight: bold; font-size: 1.05em;">Cữ ${r.stepIndex} (${r.durationHours}h)</div>
                  <div style="font-weight: 600; margin: 2px 0;">${r.timeWindow}</div>
                  <div style="font-size: 0.82em; color: #444;">${r.stageName}</div>
                </td>
                <td>
                  <div>Tốc độ: <strong style="font-size: 1.15em;">${r.rateMlKgH} ml/kg/h</strong></div>
                  <div>Số giọt: <strong>${r.dropsPerMin} giọt/phút</strong> <small>(dây 20 giọt/ml)</small></div>
                  <div>Lượng dịch cần: <strong>${r.totalMl.toLocaleString('vi-VN')} ml</strong></div>
                </td>
                <td>
                  <div>Dịch có sẵn từ cữ trước: <strong>${r.existingFluidMl} ml</strong></div>
                  <div style="font-weight: bold; margin: 2px 0;">
                    ${r.bottlesToHang > 0 ? `Treo thêm: +${r.bottlesToHang} chai 500ml` : 'Không cần treo thêm chai'}
                  </div>
                  <div>Tổng có tại cọc: <strong>${r.totalAtPoleMl.toLocaleString('vi-VN')} ml</strong></div>
                </td>
                <td>
                  ${r.hctCheckRequired ? `
                    <div style="font-weight: bold; color: #b91c1c; margin-bottom: 2px;">
                      [!] BẮT BUỘC ĐO LẠI HCT
                    </div>
                  ` : ''}
                  <div style="font-size: 0.82em; line-height: 1.3;">${r.monitoringNotes}</div>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <div style="font-size: 0.78em; color: #555;">Bắt đầu: ....h....</div>
                  <div style="font-size: 0.78em; margin-top: 14px;">Ký: ..............</div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- TỔNG KẾT DỊCH TRUYỀN DỰ KIẾN -->
        <div class="cdss-print-summary-strip">
          <span>Tổng lượng dịch bù: <strong>${totalVolumeMl.toLocaleString('vi-VN')} ml</strong> (~ <strong>${mlPerKg} ml/kg</strong>)</span>
          <span>Thời gian dự kiến: <strong>${totalDurationHours} giờ</strong> (${fluidRows.length} cữ)</span>
          <span>Ước tính số chai 500ml: <strong>${bottles500} chai</strong> (Ringer Lactate / NaCl 0.9%)</span>
        </div>

        <!-- PHÁC ĐỒ VẬN MẠCH BƠM TIÊM ĐIỆN 50ML -->
        <div class="cdss-print-vaso-box">
          <div style="font-weight: bold; text-transform: uppercase; font-size: 0.88em; margin-bottom: 3px; border-bottom: 1px dotted #666; padding-bottom: 2px;">
            PHÁC ĐỒ THUỐC VẬN MẠCH BƠM TIÊM ĐIỆN 50ML (ÁP DỤNG KHI TÁI SỐC HOẶC SỐC TRƠ DỊCH TRUYỀN)
          </div>
          <div class="cdss-print-vaso-grid">
            <div class="cdss-print-vaso-col">
              <strong>1. Dopamin (Đầu tay trẻ em):</strong> ${d.totalMg} mg (3 × ${d.patientWeightKg}kg) pha vừa đủ 50ml Glucose 5%. 
              <em>Quy đổi: 1 ml/h = 1 µg/kg/phút</em>. Liều khuyến cáo: ${d.standardDoseRange} (Tốc độ bơm: <strong>${d.recommendedPumpRateMlH}</strong>).
            </div>
            <div class="cdss-print-vaso-col">
              <strong>2. Noradrenalin (Sốc giãn mạch / người lớn):</strong> ${n.totalMg} mg (0.3 × ${n.patientWeightKg}kg) pha vừa đủ 50ml Glucose 5%. 
              <em>Quy đổi: 1 ml/h = 0.1 µg/kg/phút</em>. Liều khuyến cáo: ${n.standardDoseRange} (Tốc độ bơm: <strong>${n.recommendedPumpRateMlH}</strong>).
            </div>
            <div class="cdss-print-vaso-col" style="margin-top:4px;">
              <strong>3. Dobutamin (CVP > 15 / Suy tim):</strong> ${dob.totalMg} mg (3 × ${dob.patientWeightKg}kg) pha 50ml G5%. 
              <em>Quy đổi: 1 ml/h = 1 µg/kg/phút</em>. Tốc độ: <strong>${dob.recommendedPumpRateMlH}</strong>.
            </div>
            <div class="cdss-print-vaso-col" style="margin-top:4px;">
              <strong>4. Gói ABCS Cấp Cứu:</strong> Natri Bicarbonate 4.2% ${Math.round(2 * weightResult.adjustedWeightKg)}ml TM; Calci clorua 10% 2-5ml TM; Dextrose 30% ${Math.round(1.5 * weightResult.adjustedWeightKg)}ml TM.
            </div>
          </div>
        </div>

        <!-- NGUYÊN TẮC ĐIỀU DƯỠNG AN TOÀN KHI TRUYỀN DỊCH -->
        <div class="cdss-print-safety-notes">
          <strong>Lưu ý điều dưỡng an toàn:</strong>
          (1) Luôn đo lại Hct tại giường trước khi quyết định giảm bậc dịch theo y lệnh.
          (2) Đích nước tiểu tối thiểu: &ge; 0.5 - 1 ml/kg/giờ.
          (3) Báo bác sĩ ngay nếu có dấu hiệu quá tải tuần hoàn (phù mi mắt, thở nhanh co kéo, ran ẩm đáy phổi, gan to nhanh).
          (4) Ngưng truyền dịch khi mạch, huyết áp ổn định, thoát sốc sau 24-48 giờ giai đoạn hồi phục.
        </div>

        <!-- CHỮ KÝ XÁC NHẬN Y LỆNH -->
        <div class="cdss-print-signatures">
          <div class="cdss-print-sign-col">
            <div style="font-weight: bold;">ĐIỀU DƯỠNG THEO DÕI & THỰC HIỆN</div>
            <div style="font-style: italic; font-size: 0.85em;">(Ký và ghi rõ họ tên)</div>
            <div style="margin-top: 45px; font-weight: bold;">............................................................</div>
          </div>
          <div class="cdss-print-sign-col">
            <div style="font-weight: bold;">BÁC SĨ CHỈ ĐỊNH Y LỆNH</div>
            <div style="font-style: italic; font-size: 0.85em;">(Ký và ghi rõ họ tên)</div>
            <div style="margin-top: 45px; font-weight: bold;">............................................................</div>
          </div>
        </div>
      </div>
    `;
  }

  private copyHandoverReport(): void {
    if (!this.currentPlan) return;
    const p = this.currentPlan;
    const text = [
      `📋 BÁO CÁO GIAO BAN DỊCH TRUYỀN SXHD DENGUE (QĐ 2760/QĐ-BYT)`,
      `• Bệnh nhân: ${p.patient.ageYears} tuổi (${p.patient.gender === 'male' ? 'Nam' : 'Nữ'}) | Nặng thực tế: ${p.weightResult.actualWeightKg} kg`,
      `• Cân tính dịch CDC 2014: ${p.weightResult.adjustedWeightKg} kg ${p.weightResult.isObese ? '(ĐÃ HIỆU CHỈNH TRẺ THỪA CÂN)' : ''}`,
      `• Phân độ: ${p.patient.severity === 'warning_signs' ? 'Dấu hiệu cảnh báo' : p.patient.severity === 'shock' ? 'Sốc SXHD' : 'Sốc nguy kịch'}`,
      `• Đánh giá đáp ứng: ${p.branchDecision.title}`,
      `• Hướng xử trí: ${p.branchDecision.recommendedFluid}`,
      `• Kế hoạch cọc dịch:`,
      ...p.fluidRows.map(r => `  - Cữ ${r.stepIndex} (${r.timeWindow}): ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} giọt/phút) | Cần ${r.totalMl} ml | Treo thêm: ${r.bottlesToHang} chai | Tại cọc: ${r.totalAtPoleMl} ml`),
      `• Tổng dịch: ${p.totalVolumeMl} ml trong ${p.totalDurationHours} giờ.`,
      `• Điều dưỡng lưu ý: Theo dõi nước tiểu mỗi giờ (đích ≥ 0.5-1 ml/kg/h), đo lại Hct trước khi giảm cữ dịch.`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Đã sao chép bảng bàn giao cọc dịch vào bộ nhớ tạm!');
    });
  }

  private copySoapPlan(): void {
    if (!this.currentPlan) return;
    navigator.clipboard.writeText(this.currentPlan.soapExportText).then(() => {
      this.showToast('Đã sao chép Kế hoạch SOAP Plan (Bệnh Án / DocSpace)!');
    });
  }

  private showToast(msg: string): void {
    const toast = document.getElementById('cdss-toast');
    const toastText = document.getElementById('cdss-toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = msg;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }
}

// Global window registration for fallback environments
if (typeof window !== 'undefined') {
  (window as any).DengueCDSSController = DengueCDSSController;
}
