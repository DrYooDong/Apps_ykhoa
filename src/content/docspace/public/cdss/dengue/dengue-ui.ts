/**
 * CliniPortal CDSS — Dengue UI Renderer & Interactive Controller v2.0
 * Path: src/content/docspace/public/cdss/dengue/dengue-ui.ts
 * Standard: Clean Clinical, Ultra-Responsive (Desktop / Tablet / Mobile), Icon-First, 5 Clinical Cases
 */

import {
  DenguePatientInput,
  DengueCDSSPlan,
  Gender,
  DengueSeverity
} from '../cdss-types';

import { generateDengueCDSSPlan } from './dengue-engine';
import { DENGUE_FLUID_TEMPLATES } from './dengue-data';

interface ClinicalSampleCase {
  id: string;
  icon: string;
  label: string;
  tag: string;
  isDanger?: boolean;
  input: {
    ageYears: number;
    gender: Gender;
    actualWeightKg: number;
    severity: DengueSeverity;
  };
  clinicalHighlight: string;
}

const CLINICAL_SAMPLE_CASES: ClinicalSampleCase[] = [
  {
    id: 'child-obese',
    icon: 'fa-solid fa-child',
    label: 'Bé 8T Béo Phì (38kg)',
    tag: 'CDC 2014',
    input: {
      ageYears: 8,
      gender: 'male',
      actualWeightKg: 38,
      severity: 'warning_signs'
    },
    clinicalHighlight: 'Trẻ béo phì > 120% chuẩn: Tự động dùng chuẩn CDC 2014 (26kg) tránh phù phổi cấp.'
  },
  {
    id: 'child-shock',
    icon: 'fa-solid fa-heart-pulse',
    label: 'Bé Gái 5T Sốc (16kg)',
    tag: 'Sốc Còn Bù',
    input: {
      ageYears: 5,
      gender: 'female',
      actualWeightKg: 16,
      severity: 'shock'
    },
    clinicalHighlight: 'Trẻ nhỏ sốc còn bù: Chống sốc 15 ml/kg/h cữ 1, theo dõi sát sinh hiệu và Hct.'
  },
  {
    id: 'teen-female',
    icon: 'fa-solid fa-person',
    label: 'Thiếu Nữ 14T (49kg)',
    tag: 'Dấu Hiệu Cảnh Báo',
    input: {
      ageYears: 14,
      gender: 'female',
      actualWeightKg: 49,
      severity: 'warning_signs'
    },
    clinicalHighlight: 'Thiếu niên nữ (13-15 tuổi): Bù dịch bậc riêng, chuẩn bị 6 ml/kg/h trong 2h.'
  },
  {
    id: 'adult-male',
    icon: 'fa-solid fa-user-doctor',
    label: 'Nam 28T Sốc (55kg)',
    tag: 'Người Lớn Sốc',
    input: {
      ageYears: 28,
      gender: 'male',
      actualWeightKg: 55,
      severity: 'shock'
    },
    clinicalHighlight: 'Người lớn thể trạng chuẩn sốc còn bù: Bù dịch 15 ml/kg/h rồi giảm bậc 10 ml/kg/h.'
  },
  {
    id: 'adult-severe-shock',
    icon: 'fa-solid fa-bolt',
    label: 'Nữ 35T Sốc Nặng (62kg)',
    tag: 'Mạch 0 - HA 0',
    isDanger: true,
    input: {
      ageYears: 35,
      gender: 'female',
      actualWeightKg: 62,
      severity: 'severe_shock'
    },
    clinicalHighlight: 'Sốc nguy kịch khẩn cấp: Bơm dịch 20 ml/kg/h siêu tốc + chuẩn bị Noradrenalin bơm tiêm điện.'
  }
];

export class DengueCDSSController {
  private container: HTMLElement;
  private currentPlan: DengueCDSSPlan | null = null;
  private customDurations: Record<number, number> = {};
  private activeCaseId: string = 'child-obese';

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
        <!-- TOP CLINICAL TOOLBAR (Header) -->
        <header class="cdss-top-bar">
          <div class="cdss-bar-branding">
            <div class="cdss-icon-badge">
              <i class="fa-solid fa-droplet"></i>
            </div>
            <div class="cdss-brand-titles">
              <h1 class="cdss-brand-title">
                CDSS Tính Dịch Truyền & Chống Sốc SXHD Dengue
                <span class="cdss-brand-badge">QĐ 2760/BYT 2023</span>
              </h1>
              <div class="cdss-brand-subtitle">
                <span><i class="fa-solid fa-scale-balanced"></i> Chuẩn CDC 2014</span>
                <span><i class="fa-solid fa-table-columns"></i> Cọc dịch 4 cột</span>
                <span><i class="fa-solid fa-syringe"></i> Vận mạch Bơm tiêm 50ml</span>
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
            <button id="btn-print" class="cdss-action-btn cdss-action-btn--icon-only" title="In phiếu y lệnh cọc dịch">
              <i class="fa-solid fa-print"></i>
            </button>
            <button id="btn-reset-durations" class="cdss-action-btn cdss-action-btn--icon-only" title="Khôi phục thời lượng chuẩn Bộ Y Tế">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
          </div>
        </header>

        <!-- 5 CLINICAL SAMPLE CASES QUICK-SELECT BAR -->
        <div class="cdss-cases-bar">
          <div class="cdss-cases-label">
            <i class="fa-solid fa-wand-magic-sparkles"></i> 5 Ca Mẫu:
          </div>
          <div class="cdss-cases-list" id="cdss-cases-list">
            ${CLINICAL_SAMPLE_CASES.map(c => `
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

        <!-- MAIN GRID LAYOUT -->
        <div class="cdss-main-grid">
          <!-- LEFT COLUMN: PATIENT FORM & WEIGHT ANALYZER -->
          <aside class="cdss-left-col">
            <!-- Patient Input Parameters Card -->
            <div class="cdss-card">
              <div class="cdss-card-header">
                <h2 class="cdss-card-title">
                  <i class="fa-solid fa-user-injured"></i> Thông Tin & Phân Tầng
                </h2>
                <span id="case-status-indicator" class="cdss-brand-badge" style="display:none;"></span>
              </div>

              <form id="dengue-input-form">
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

                <!-- Phân độ lâm sàng -->
                <div class="cdss-form-group">
                  <label class="cdss-form-label" for="input-severity">Phân Độ Lâm Sàng SXHD</label>
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

            <!-- CDC 2014 Weight Analysis Card -->
            <div id="weight-analysis-box">
              <!-- Dynamically populated via renderWeightAnalysis -->
            </div>
          </aside>

          <!-- RIGHT COLUMN: CDSS OUTPUT, SCHEDULE & PROTOCOLS -->
          <main class="cdss-right-col">
            <!-- Dynamic Alert Banners -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-container"></div>

            <!-- Summary KPI Bento Grid -->
            <div id="cdss-stats-wrap" class="cdss-kpi-grid"></div>

            <!-- VISUAL FLUID TIMELINE -->
            <div class="cdss-timeline-card">
              <div class="cdss-timeline-header">
                <span class="cdss-timeline-title">
                  <i class="fa-solid fa-chart-gantt"></i> Tiến Trình Bậc Dịch Truyền Theo Giờ
                </span>
                <span id="timeline-duration-badge" class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">
                  <!-- Hours -->
                </span>
              </div>
              <div class="cdss-timeline-track" id="cdss-timeline-track">
                <!-- Dynamic timeline segments -->
              </div>
              <div class="cdss-timeline-ticks" id="cdss-timeline-ticks">
                <!-- Dynamic timeline ticks -->
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
                      <th style="width: 22%;">Cột 1: Mốc Giờ & Thời Lượng</th>
                      <th style="width: 28%;">Cột 2: Tốc Độ & Lượng Dịch Cần</th>
                      <th style="width: 26%;">Cột 3: Dịch Có Sẵn / Treo Thêm</th>
                      <th style="width: 24%;">Cột 4: Tổng Cọc & Giám Sát</th>
                    </tr>
                  </thead>
                  <tbody id="cdss-fluid-tbody">
                    <!-- Dynamic Rows -->
                  </tbody>
                </table>
              </div>

              <!-- Mobile Responsive Fluid Cards Stack -->
              <div class="cdss-fluid-cards-stack" id="cdss-fluid-cards-stack">
                <!-- Dynamic Mobile Cards -->
              </div>
            </section>

            <!-- ACCORDION: THUỐC VẬN MẠCH BƠM TIÊM ĐIỆN 50ML -->
            <section class="cdss-accordion" id="accordion-vaso">
              <button type="button" class="cdss-accordion-trigger" id="trigger-vaso">
                <div class="cdss-accordion-title-wrap">
                  <i class="fa-solid fa-syringe cdss-accordion-icon"></i>
                  <div>
                    <h3 class="cdss-accordion-title">Phác Đồ Thuốc Vận Mạch Bơm Tiêm Điện 50ml</h3>
                    <div class="cdss-accordion-subtitle">Công thức pha Dopamin & Noradrenalin chuẩn hóa theo kg (Tốc độ 1 ml/h = 1 hoặc 0.1 µg/kg/phút)</div>
                  </div>
                </div>
                <div class="cdss-accordion-right">
                  <span id="vaso-alert-badge" class="cdss-brand-badge" style="display:none;"></span>
                  <i class="fa-solid fa-chevron-down cdss-accordion-chevron"></i>
                </div>
              </button>
              <div class="cdss-accordion-content">
                <div class="cdss-vaso-grid" id="cdss-vaso-grid">
                  <!-- Dopamin & Noradrenalin Cards -->
                </div>
              </div>
            </section>

            <!-- ACCORDION: ĐIỀU DƯỠNG AN TOÀN & THEO DÕI GIỜ -->
            <section class="cdss-accordion" id="accordion-nursing">
              <button type="button" class="cdss-accordion-trigger" id="trigger-nursing">
                <div class="cdss-accordion-title-wrap">
                  <i class="fa-solid fa-user-nurse cdss-accordion-icon" style="color:var(--cdss-success);"></i>
                  <div>
                    <h3 class="cdss-accordion-title">Quy Trình Điều Dưỡng An Toàn & Theo Dõi Giờ</h3>
                    <div class="cdss-accordion-subtitle">Kiểm soát dấu hiệu quá tải, đích nước tiểu, thời điểm đo lại Hct tại giường</div>
                  </div>
                </div>
                <div class="cdss-accordion-right">
                  <i class="fa-solid fa-chevron-down cdss-accordion-chevron"></i>
                </div>
              </button>
              <div class="cdss-accordion-content">
                <ul class="cdss-nursing-list" id="cdss-nursing-list">
                  <!-- Dynamic Nursing Items -->
                </ul>
              </div>
            </section>
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

    // 5 Clinical Sample Cases Pills
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

    // Accordions
    this.setupAccordion('accordion-vaso', 'trigger-vaso');
    this.setupAccordion('accordion-nursing', 'trigger-nursing');

    // Reset Durations
    const btnReset1 = document.getElementById('btn-reset-durations');
    const btnReset2 = document.getElementById('btn-reset-durations-sub');
    const handleReset = () => {
      this.customDurations = {};
      this.recalculate();
      this.showToast('Đã khôi phục thời lượng cữ chuẩn theo Bộ Y Tế!');
    };
    if (btnReset1) btnReset1.addEventListener('click', handleReset);
    if (btnReset2) btnReset2.addEventListener('click', handleReset);

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

  private setupAccordion(sectionId: string, triggerId: string): void {
    const sec = document.getElementById(sectionId);
    const trig = document.getElementById(triggerId);
    if (sec && trig) {
      trig.addEventListener('click', () => {
        sec.classList.toggle('open');
      });
    }
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

    // Update Status Indicator
    const ind = document.getElementById('case-status-indicator');
    if (ind) {
      ind.textContent = sample.label;
      ind.style.display = 'inline-block';
    }

    this.recalculate();
    this.showToast(`Đã áp dụng: ${sample.label}`);
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

    return {
      ageYears: age,
      gender,
      actualWeightKg: weight,
      severity,
      startTime
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
    this.renderStats(plan);
    this.renderTimeline(plan);
    this.renderFluidSchedule(plan);
    this.renderVasopressors(plan);
    this.renderNursingList(plan);
    this.updateMobileStickyBar(plan);
    this.renderPrintSheet(plan);

    // Auto-open Vasopressor Accordion if in Shock
    const vasoSec = document.getElementById('accordion-vaso');
    const vasoBadge = document.getElementById('vaso-alert-badge');
    if (vasoSec) {
      if (plan.patient.severity === 'shock' || plan.patient.severity === 'severe_shock') {
        vasoSec.classList.add('open');
        if (vasoBadge) {
          vasoBadge.textContent = 'Khởi động khi sốc trơ dịch';
          vasoBadge.style.display = 'inline-block';
        }
      } else {
        if (vasoBadge) vasoBadge.style.display = 'none';
      }
    }
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
      <div class="cdss-card cdss-weight-box">
        <div class="cdss-weight-tags-row">
          <span class="cdss-weight-status-badge ${isObese ? 'cdss-weight-status-badge--obese' : 'cdss-weight-status-badge--normal'}">
            <i class="fa-solid ${isObese ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
            ${isObese ? 'Thừa Cân / Béo Phì (> 120% Chuẩn)' : 'Thể Trạng Hợp Lý'}
          </span>
          <span style="font-size:0.72rem; font-weight:600; color:var(--cdss-text-muted);">
            ${ageGroupLabel}
          </span>
        </div>

        <div class="cdss-weight-grid">
          <div class="cdss-wcell">
            <span class="cdss-wcell-label">Thực Tế</span>
            <span class="cdss-wcell-val ${isObese ? 'text-danger' : ''}">${weightResult.actualWeightKg} <small>kg</small></span>
          </div>
          <div class="cdss-wcell">
            <span class="cdss-wcell-label">CDC 2014</span>
            <span class="cdss-wcell-val" style="color:var(--cdss-text-muted);">${weightResult.standardWeightKg} <small>kg</small></span>
          </div>
          <div class="cdss-wcell cdss-wcell--highlight">
            <span class="cdss-wcell-label">Cân Tính Dịch</span>
            <span class="cdss-wcell-val">${weightResult.adjustedWeightKg} <small>kg</small></span>
          </div>
        </div>

        <div class="cdss-weight-note">
          <i class="fa-solid fa-circle-info"></i>
          <div>${weightResult.formulaNote}</div>
        </div>
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

  private renderStats(plan: DengueCDSSPlan): void {
    const wrap = document.getElementById('cdss-stats-wrap');
    if (!wrap) return;

    const mlPerKg = Math.round(plan.totalVolumeMl / plan.weightResult.adjustedWeightKg);
    const bottles500 = Math.ceil(plan.totalVolumeMl / 500);

    wrap.innerHTML = `
      <div class="cdss-kpi-card">
        <div class="cdss-kpi-icon cdss-kpi-icon--blue">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div class="cdss-kpi-content">
          <span class="cdss-kpi-label">Tổng Thể Tích Dịch Gộp</span>
          <span class="cdss-kpi-value">${plan.totalVolumeMl.toLocaleString('vi-VN')} <small>ml</small></span>
          <span class="cdss-kpi-sub">~ ${mlPerKg} ml/kg cân tính dịch</span>
        </div>
      </div>

      <div class="cdss-kpi-card">
        <div class="cdss-kpi-icon cdss-kpi-icon--purple">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div class="cdss-kpi-content">
          <span class="cdss-kpi-label">Tổng Thời Lượng Dự Kiến</span>
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
    `;
  }

  private renderTimeline(plan: DengueCDSSPlan): void {
    const track = document.getElementById('cdss-timeline-track');
    const ticks = document.getElementById('cdss-timeline-ticks');
    const durationBadge = document.getElementById('timeline-duration-badge');
    if (!track || !ticks) return;

    if (durationBadge) {
      durationBadge.textContent = `${plan.totalDurationHours} Giờ Truyền`;
    }

    const totalHours = plan.totalDurationHours || 1;
    const colors = ['cdss-seg-1', 'cdss-seg-2', 'cdss-seg-3', 'cdss-seg-4', 'cdss-seg-5'];

    track.innerHTML = plan.fluidRows.map((r, idx) => {
      const pct = Math.max(12, Math.round((r.durationHours / totalHours) * 100));
      const colClass = colors[idx % colors.length];
      return `
        <div class="cdss-timeline-segment ${colClass}" style="flex: ${r.durationHours};" title="Cữ ${r.stepIndex}: ${r.rateMlKgH} ml/kg/h (${r.durationHours}h) - Cần ${r.totalMl} ml">
          <span>${r.rateMlKgH} ml/kg/h</span>
          <small>Cữ ${r.stepIndex} (${r.durationHours}h)</small>
        </div>
      `;
    }).join('');

    const startH = plan.fluidRows[0]?.timeWindow.split(' - ')[0] || '08:00';
    const endH = plan.fluidRows[plan.fluidRows.length - 1]?.timeWindow.split(' - ')[1]?.split(' ')[0] || '24h';

    ticks.innerHTML = `
      <span><i class="fa-regular fa-clock"></i> Khởi đầu: <strong>${startH}</strong></span>
      <span>${plan.fluidRows.length} giai đoạn bù dịch liên tục</span>
      <span>Kết thúc: <strong>${endH}</strong></span>
    `;
  }

  private renderFluidSchedule(plan: DengueCDSSPlan): void {
    const tbody = document.getElementById('cdss-fluid-tbody');
    const mobileStack = document.getElementById('cdss-fluid-cards-stack');
    if (!tbody || !mobileStack) return;

    const ageGroup = plan.ageGroup;
    const tpls = DENGUE_FLUID_TEMPLATES[plan.patient.severity][ageGroup];

    // 1. Render Desktop / Tablet Table Rows
    tbody.innerHTML = plan.fluidRows.map((r, idx) => {
      const tpl = tpls[idx];
      const durationOptions = tpl?.durationOptions || [r.durationHours];

      const optionsHtml = durationOptions.map(dur => `
        <option value="${dur}" ${dur === r.durationHours ? 'selected' : ''}>${dur} giờ</option>
      `).join('');

      return `
        <tr>
          <!-- CỘT 1: MỐC GIỜ & THỜI LƯỢNG -->
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

          <!-- CỘT 2: TỐC ĐỘ & LƯỢNG DỊCH -->
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

          <!-- CỘT 3: DỊCH CÓ SẴN / TREO THÊM -->
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

          <!-- CỘT 4: TỔNG CỌC & GIÁM SÁT -->
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
    }).join('');

    // 2. Render Mobile Fluid Cards Stack
    mobileStack.innerHTML = plan.fluidRows.map((r, idx) => {
      const tpl = tpls[idx];
      const durationOptions = tpl?.durationOptions || [r.durationHours];
      const optionsHtml = durationOptions.map(dur => `
        <option value="${dur}" ${dur === r.durationHours ? 'selected' : ''}>${dur}h</option>
      `).join('');

      return `
        <div class="cdss-fluid-mobile-card">
          <div class="cdss-fcard-top">
            <div class="cdss-fcard-badge-wrap">
              <span class="cdss-step-badge">Cữ ${r.stepIndex}</span>
              <span class="cdss-fcard-time">${r.timeWindow}</span>
            </div>
            <div class="cdss-duration-picker">
              <select class="cdss-duration-select" data-row-idx="${idx}">
                ${optionsHtml}
              </select>
            </div>
          </div>

          <div style="font-size:0.78rem; font-weight:600; color:var(--cdss-text-muted);">
            ${r.stageName}
          </div>

          <div class="cdss-fcard-metrics-grid">
            <div class="cdss-fcard-metric">
              <div class="cdss-fcard-metric-label">Tốc Độ Bù</div>
              <div class="cdss-fcard-metric-val" style="color:var(--cdss-primary);">
                ${r.rateMlKgH} <small>ml/kg/h</small>
              </div>
              <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:2px;">
                ~ <strong>${r.dropsPerMin}</strong> giọt/phút
              </div>
            </div>

            <div class="cdss-fcard-metric">
              <div class="cdss-fcard-metric-label">Lượng Dịch Cần</div>
              <div class="cdss-fcard-metric-val">
                ${r.totalMl.toLocaleString('vi-VN')} <small>ml</small>
              </div>
              <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:2px;">
                Treo thêm: <strong>${r.bottlesToHang}</strong> chai 500ml
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; border-top:1px solid var(--cdss-border-subtle); padding-top:0.5rem;">
            <span>Tổng có trên cọc: <strong>${r.totalAtPoleMl} ml</strong></span>
            ${r.hctCheckRequired ? `
              <span class="cdss-hct-pill" style="margin:0;">
                <i class="fa-solid fa-vial"></i> Đo lại Hct
              </span>
            ` : ''}
          </div>

          <div class="cdss-monitor-tip" style="font-size:0.74rem;">
            ${r.monitoringNotes}
          </div>
        </div>
      `;
    }).join('');

    // Attach row duration select listeners to both desktop and mobile
    const attachSelects = (container: HTMLElement) => {
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
    };

    attachSelects(tbody);
    attachSelects(mobileStack);
  }

  private renderVasopressors(plan: DengueCDSSPlan): void {
    const grid = document.getElementById('cdss-vaso-grid');
    if (!grid) return;

    const { vasopressorDopamin: d, vasopressorNoradrenalin: n } = plan;

    grid.innerHTML = `
      <!-- Card Dopamin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div>
            <div class="cdss-drug-name cdss-drug-name--primary">Dopamin</div>
            <div class="cdss-drug-indication">Lựa chọn đầu tay ở trẻ em</div>
          </div>
          <span class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">
            Bơm Tiêm 50ml
          </span>
        </div>

        <div class="cdss-recipe-box">
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">Công thức pha:</span>
            <span><strong>${d.totalMg} mg</strong> Dopamin (3 × ${d.patientWeightKg} kg)</span>
          </div>
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">Dung môi pha:</span>
            <span>Glucose 5% vừa đủ <strong>50 ml</strong></span>
          </div>
          <div class="cdss-recipe-row cdss-recipe-highlight text-primary">
            <span>Tương đương liều:</span>
            <span>Tốc độ 1 ml/giờ = 1 µg/kg/phút</span>
          </div>
        </div>

        <div class="cdss-dosing-strip">
          <div>
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Liều Khuyến Cáo</div>
            <strong>${d.standardDoseRange}</strong>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Tốc Độ Bơm Tiêm</div>
            <strong style="color:var(--cdss-primary); font-size:1.05rem;">${d.recommendedPumpRateMlH}</strong>
          </div>
        </div>

        <p class="cdss-vaso-warning">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${d.precautions}</span>
        </p>
      </div>

      <!-- Card Noradrenalin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div>
            <div class="cdss-drug-name cdss-drug-name--danger">Noradrenalin</div>
            <div class="cdss-drug-indication">Sốc giãn mạch / Tụt HA tâm trương / Người lớn</div>
          </div>
          <span class="cdss-brand-badge">High Alert</span>
        </div>

        <div class="cdss-recipe-box">
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">Công thức pha:</span>
            <span><strong>${n.totalMg} mg</strong> Noradrenalin (0.3 × ${n.patientWeightKg} kg)</span>
          </div>
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">Dung môi pha:</span>
            <span>Glucose 5% vừa đủ <strong>50 ml</strong></span>
          </div>
          <div class="cdss-recipe-row cdss-recipe-highlight text-danger">
            <span>Tương đương liều:</span>
            <span>Tốc độ 1 ml/giờ = 0.1 µg/kg/phút</span>
          </div>
        </div>

        <div class="cdss-dosing-strip">
          <div>
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Liều Khởi Đầu</div>
            <strong>${n.standardDoseRange}</strong>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Tốc Độ Bơm Tiêm</div>
            <strong style="color:var(--cdss-danger); font-size:1.05rem;">${n.recommendedPumpRateMlH}</strong>
          </div>
        </div>

        <p class="cdss-vaso-warning">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${n.precautions}</span>
        </p>
      </div>
    `;
  }

  private renderNursingList(plan: DengueCDSSPlan): void {
    const list = document.getElementById('cdss-nursing-list');
    if (!list) return;

    list.innerHTML = plan.nursingInstructions.map(item => `
      <li class="cdss-nursing-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${item}</span>
      </li>
    `).join('');
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

    const { patient, weightResult, fluidRows, totalVolumeMl, totalDurationHours, vasopressorDopamin: d, vasopressorNoradrenalin: n } = plan;

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
            <div style="font-weight:bold; text-transform:uppercase;">KHOA CẤP CỨU / TRUYỀN NHIỄM</div>
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
          <h1 class="cdss-print-main-title">PHIẾU Y LỆNH & THEO DÕI TRUYỀN DỊCH SXHD DENGUE</h1>
          <div class="cdss-print-sub-title">(Theo Hướng dẫn Chẩn đoán & Điều trị Sốt Xuất Huyết Dengue — Quyết định 2760/QĐ-BYT 2023)</div>
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
            <span>Giờ bắt đầu truyền: <strong>${patient.startTime || '08:00'}</strong></span>
          </div>
        </div>

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
