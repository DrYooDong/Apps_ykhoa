/**
 * CliniPortal CDSS — Dengue UI Renderer & Interactive Controller
 * Path: src/content/knowledge-vault/cdss/dengue/dengue-ui.ts
 */

import {
  DenguePatientInput,
  DengueCDSSPlan,
  Gender,
  DengueSeverity
} from '../cdss-types';

import { generateDengueCDSSPlan } from './dengue-engine';
import { DENGUE_FLUID_TEMPLATES } from './dengue-data';

export class DengueCDSSController {
  private container: HTMLElement;
  private currentPlan: DengueCDSSPlan | null = null;
  private customDurations: Record<number, number> = {};

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
    // Chạy tính toán ban đầu với case mẫu trẻ em 8 tuổi béo phì (điển hình)
    this.recalculate();
  }

  private renderInitialLayout(): void {
    const now = new Date();
    const curTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    this.container.innerHTML = `
      <div class="dengue-cdss-app">
        <!-- Header Banner -->
        <header class="cdss-header-card">
          <div class="cdss-header-meta">
            <div class="cdss-badge-wrap">
              <span class="cdss-badge cdss-badge--danger"><i class="fa-solid fa-triangle-exclamation"></i> Cấp Cứu Truyền Nhiễm</span>
              <span class="cdss-badge cdss-badge--info">QĐ 2760/QĐ-BYT 2023</span>
              <span class="cdss-badge cdss-badge--primary">CDC 2014 Standard</span>
            </div>
            <h1 class="cdss-title">
              <i class="fa-solid fa-droplet cdss-icon-pulse"></i> 
              CDSS Tính Toán Dịch Truyền & Chống Sốc SXHD Dengue
            </h1>
            <p class="cdss-subtitle">
              Hệ thống Hỗ trợ Quyết định Lâm sàng: Tự động chuẩn hóa cân nặng CDC 2014, điều phối cọc dịch 4 cột động học và tính liều vận mạch bơm tiêm điện 50ml.
            </p>
          </div>
          <div class="cdss-header-actions">
            <button id="btn-copy-soap" class="cdss-btn cdss-btn--primary">
              <i class="fa-solid fa-notes-medical"></i> Chép Vào Bệnh Án
            </button>
            <button id="btn-copy-handover" class="cdss-btn cdss-btn--secondary">
              <i class="fa-solid fa-clipboard-check"></i> Chép Bàn Giao Ca
            </button>
            <button id="btn-print" class="cdss-btn cdss-btn--ghost">
              <i class="fa-solid fa-print"></i> In Phiếu
            </button>
          </div>
        </header>

        <!-- Main Grid Layout -->
        <div class="cdss-main-grid">
          <!-- Left Column: Patient Parameters Form -->
          <aside class="cdss-sidebar-col">
            <div class="cdss-panel cdss-form-panel">
              <h2 class="cdss-panel-title">
                <i class="fa-solid fa-user-injured"></i> Thông Tin & Phân Tầng
              </h2>

              <form id="dengue-input-form" class="cdss-form">
                <!-- Tuổi & Giới tính -->
                <div class="cdss-form-row">
                  <div class="cdss-form-group cdss-col-6">
                    <label for="input-age">Tuổi (Năm)</label>
                    <input type="number" id="input-age" min="1" max="100" value="8" step="1" required class="cdss-input" />
                  </div>
                  <div class="cdss-form-group cdss-col-6">
                    <label>Giới Tính</label>
                    <div class="cdss-radio-group">
                      <label class="cdss-radio-label">
                        <input type="radio" name="gender" value="male" checked /> Nam
                      </label>
                      <label class="cdss-radio-label">
                        <input type="radio" name="gender" value="female" /> Nữ
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Cân nặng thực tế -->
                <div class="cdss-form-group">
                  <label for="input-weight">
                    Cân Nặng Thực Tế (kg)
                    <span class="cdss-tooltip" title="Cân nặng khi tiếp nhận phòng cấp cứu">
                      <i class="fa-solid fa-circle-question"></i>
                    </span>
                  </label>
                  <div class="cdss-input-addon-wrap">
                    <input type="number" id="input-weight" min="5" max="150" value="38" step="0.5" required class="cdss-input" />
                    <span class="cdss-input-addon">kg</span>
                  </div>
                  <span class="cdss-input-hint">VD: Bé 8 tuổi, nặng 38kg (Thừa cân > 120% chuẩn)</span>
                </div>

                <!-- Phân độ lâm sàng -->
                <div class="cdss-form-group">
                  <label for="input-severity">Phân Độ Lâm Sàng SXHD</label>
                  <select id="input-severity" class="cdss-select">
                    <option value="warning_signs" selected>1. Có Dấu Hiệu Cảnh Báo (DHCB)</option>
                    <option value="shock">2. Sốc SXHD (Còn Bù)</option>
                    <option value="severe_shock">3. Sốc Nguy Kịch (Mạch 0, HA 0)</option>
                  </select>
                </div>

                <!-- Giờ bắt đầu truyền -->
                <div class="cdss-form-group">
                  <label for="input-starttime">Mốc Giờ Bắt Đầu Truyền</label>
                  <input type="time" id="input-starttime" value="${curTime}" class="cdss-input" />
                </div>

                <div class="cdss-form-actions">
                  <button type="button" id="btn-quick-child" class="cdss-chip-btn">
                    <i class="fa-solid fa-child"></i> Trẻ 8T Béo Phì (38kg)
                  </button>
                  <button type="button" id="btn-quick-adult" class="cdss-chip-btn">
                    <i class="fa-solid fa-user"></i> Người Lớn Sốc (55kg)
                  </button>
                  <button type="button" id="btn-quick-severe" class="cdss-chip-btn cdss-chip-btn--danger">
                    <i class="fa-solid fa-bolt"></i> Sốc Nặng (Mạch 0 HA 0)
                  </button>
                </div>
              </form>
            </div>

            <!-- Box Thông Tin Cân Nặng CDC -->
            <div id="weight-analysis-box" class="cdss-panel cdss-weight-panel">
              <!-- Rendered via updateWeightAnalysis -->
            </div>
          </aside>

          <!-- Right Column: CDSS Results, 4-Column Table, Vasopressors -->
          <main class="cdss-content-col">
            <!-- Alert Banner Container -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-wrap"></div>

            <!-- Summary Stat Cards -->
            <div id="cdss-stats-wrap" class="cdss-stats-grid"></div>

            <!-- BẢNG CỌC DỊCH 4 CỘT -->
            <section class="cdss-panel cdss-schedule-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-table-list"></i> Bảng Điều Phối Cọc Dịch 4 Cột Chuẩn Hóa
                  </h2>
                  <p class="cdss-panel-desc">
                    Tự động tính toán lượng dịch gộp, số giọt/phút, dịch dư chuyển cữ và số chai 500ml treo thêm tại cọc.
                  </p>
                </div>
                <button id="btn-reset-durations" class="cdss-btn cdss-btn--sm cdss-btn--ghost" title="Khôi phục thời lượng chuẩn Bộ Y Tế">
                  <i class="fa-solid fa-clock-rotate-left"></i> Đặt Lại Giờ Chuẩn
                </button>
              </div>

              <div class="cdss-table-responsive">
                <table id="cdss-fluid-table" class="cdss-table">
                  <thead>
                    <tr>
                      <th style="width: 22%;">Cột 1: Mốc Giờ & Thời Lượng</th>
                      <th style="width: 28%;">Cột 2: Tốc Độ & Lượng Dịch Cần</th>
                      <th style="width: 26%;">Cột 3: Dịch Có Sẵn / Treo Thêm</th>
                      <th style="width: 24%;">Cột 4: Tổng Dịch Tại Cọc & Giám Sát</th>
                    </tr>
                  </thead>
                  <tbody id="cdss-fluid-tbody">
                    <!-- Dynamic Rows -->
                  </tbody>
                </table>
              </div>
            </section>

            <!-- KHỐI VẬN MẠCH BƠM TIÊM ĐIỆN 50ML -->
            <section class="cdss-panel cdss-vasopressor-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-syringe"></i> Phác Đồ Thuốc Vận Mạch Bơm Tiêm Điện 50ml
                  </h2>
                  <p class="cdss-panel-desc">
                    Áp dụng khi tái sốc hoặc sốc trơ dịch truyền (đã bù đủ thể tích nội mạch hoặc CVP > 10 cmH₂O).
                  </p>
                </div>
              </div>

              <div class="cdss-vasopressor-grid" id="cdss-vaso-grid">
                <!-- Dopamin & Noradrenalin Cards -->
              </div>
            </section>

            <!-- HƯỚNG DẪN ĐIỀU DƯỠNG AN TOÀN (HKKK) -->
            <section class="cdss-panel cdss-nursing-panel">
              <h2 class="cdss-panel-title">
                <i class="fa-solid fa-user-nurse"></i> Quy Trình Điều Dưỡng An Toàn & Theo Dõi Giờ
              </h2>
              <ul class="cdss-nursing-list" id="cdss-nursing-list">
                <!-- Nursing items -->
              </ul>
            </section>
          </main>
        </div>

        <!-- Toast Notification -->
        <div id="cdss-toast" class="cdss-toast" style="display:none;"></div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const form = document.getElementById('dengue-input-form');
    if (form) {
      form.addEventListener('input', () => this.recalculate());
      form.addEventListener('change', () => this.recalculate());
    }

    // Quick preset buttons
    const btnChild = document.getElementById('btn-quick-child');
    if (btnChild) {
      btnChild.addEventListener('click', () => {
        this.setInputValue('input-age', '8');
        this.setGender('male');
        this.setInputValue('input-weight', '38');
        this.setInputValue('input-severity', 'warning_signs');
        this.customDurations = {};
        this.recalculate();
      });
    }

    const btnAdult = document.getElementById('btn-quick-adult');
    if (btnAdult) {
      btnAdult.addEventListener('click', () => {
        this.setInputValue('input-age', '28');
        this.setGender('male');
        this.setInputValue('input-weight', '55');
        this.setInputValue('input-severity', 'shock');
        this.customDurations = {};
        this.recalculate();
      });
    }

    const btnSevere = document.getElementById('btn-quick-severe');
    if (btnSevere) {
      btnSevere.addEventListener('click', () => {
        this.setInputValue('input-age', '11');
        this.setGender('female');
        this.setInputValue('input-weight', '35');
        this.setInputValue('input-severity', 'severe_shock');
        this.customDurations = {};
        this.recalculate();
      });
    }

    // Reset durations button
    const btnResetDur = document.getElementById('btn-reset-durations');
    if (btnResetDur) {
      btnResetDur.addEventListener('click', () => {
        this.customDurations = {};
        this.recalculate();
        this.showToast('Đã khôi phục thời lượng cữ chuẩn theo Bộ Y Tế!');
      });
    }

    // Copy Handover button
    const btnCopyHandover = document.getElementById('btn-copy-handover');
    if (btnCopyHandover) {
      btnCopyHandover.addEventListener('click', () => this.copyHandoverReport());
    }

    // Copy SOAP Plan button
    const btnCopySoap = document.getElementById('btn-copy-soap');
    if (btnCopySoap) {
      btnCopySoap.addEventListener('click', () => this.copySoapPlan());
    }

    // Print button
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => window.print());
    }
  }

  private setInputValue(id: string, val: string): void {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  }

  private setGender(val: Gender): void {
    const radio = document.querySelector(`input[name="gender"][value="${val}"]`) as HTMLInputElement | null;
    if (radio) radio.checked = true;
  }

  private getFormData(): DenguePatientInput {
    const age = parseFloat((document.getElementById('input-age') as HTMLInputElement).value) || 8;
    const gender = ((document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value as Gender) || 'male';
    const weight = parseFloat((document.getElementById('input-weight') as HTMLInputElement).value) || 30;
    const severity = ((document.getElementById('input-severity') as HTMLSelectElement).value as DengueSeverity) || 'warning_signs';
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
    this.renderFluidTable(plan);
    this.renderVasopressors(plan);
    this.renderNursingList(plan);
  }

  private renderWeightAnalysis(plan: DengueCDSSPlan): void {
    const box = document.getElementById('weight-analysis-box');
    if (!box) return;

    const { weightResult, ageGroup, patient } = plan;
    const isObese = weightResult.isObese;

    box.innerHTML = `
      <div class="cdss-weight-header">
        <span class="cdss-weight-badge ${isObese ? 'cdss-badge--danger' : 'cdss-badge--success'}">
          ${isObese ? '<i class="fa-solid fa-triangle-exclamation"></i> Thừa Cân / Béo Phì' : '<i class="fa-solid fa-circle-check"></i> Cân Nặng Hợp Lý'}
        </span>
        <span class="cdss-age-tag">
          ${ageGroup === 'child' ? 'Trẻ em (< 13 tuổi)' : ageGroup === 'adolescent' ? 'Thiếu niên (13-15T)' : 'Người lớn (≥ 16T)'}
        </span>
      </div>

      <div class="cdss-weight-comparison">
        <div class="cdss-weight-stat">
          <span class="cdss-stat-label">Cân Nặng Thực Tế</span>
          <span class="cdss-stat-val ${isObese ? 'text-danger' : ''}">${weightResult.actualWeightKg} kg</span>
        </div>
        <div class="cdss-weight-stat">
          <span class="cdss-stat-label">Chuẩn CDC 2014</span>
          <span class="cdss-stat-val text-muted">${weightResult.standardWeightKg} kg</span>
        </div>
        <div class="cdss-weight-stat cdss-weight-stat--primary">
          <span class="cdss-stat-label">CÂN TÍNH DỊCH (CDSS)</span>
          <span class="cdss-stat-val text-primary font-bold">${weightResult.adjustedWeightKg} kg</span>
        </div>
      </div>

      <div class="cdss-weight-note">
        <i class="fa-solid fa-circle-info"></i>
        <span>${weightResult.formulaNote}</span>
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
      <div class="cdss-alert cdss-alert--${a.level}">
        <div class="cdss-alert-icon">
          <i class="fa-solid ${a.level === 'danger' ? 'fa-skull-crossbones' : a.level === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}"></i>
        </div>
        <div class="cdss-alert-content">
          <div class="cdss-alert-title">${a.title}</div>
          <div class="cdss-alert-msg">${a.message}</div>
        </div>
      </div>
    `).join('');
  }

  private renderStats(plan: DengueCDSSPlan): void {
    const wrap = document.getElementById('cdss-stats-wrap');
    if (!wrap) return;

    const mlPerKg = Math.round(plan.totalVolumeMl / plan.weightResult.adjustedWeightKg);

    wrap.innerHTML = `
      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--blue">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">Tổng Thể Tích Dịch Gộp</span>
          <span class="cdss-card-val">${plan.totalVolumeMl.toLocaleString('vi-VN')} <small>ml</small></span>
          <span class="cdss-card-sub">~ ${mlPerKg} ml/kg</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--purple">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">Tổng Thời Lượng Dự Kiến</span>
          <span class="cdss-card-val">${plan.totalDurationHours} <small>giờ</small></span>
          <span class="cdss-card-sub">${plan.fluidRows.length} bậc tốc độ giảm dần</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--teal">
          <i class="fa-solid fa-bottle-water"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">Ước Tính Số Chai 500ml</span>
          <span class="cdss-card-val">${Math.ceil(plan.totalVolumeMl / 500)} <small>chai</small></span>
          <span class="cdss-card-sub">Ringer Lactate / NaCl 0.9%</span>
        </div>
      </div>
    `;
  }

  private renderFluidTable(plan: DengueCDSSPlan): void {
    const tbody = document.getElementById('cdss-fluid-tbody');
    if (!tbody) return;

    const ageGroup = plan.ageGroup;
    const tpls = DENGUE_FLUID_TEMPLATES[plan.patient.severity][ageGroup];

    tbody.innerHTML = plan.fluidRows.map((r, idx) => {
      const tpl = tpls[idx];
      const durationOptions = tpl?.durationOptions || [r.durationHours];

      // Dropdown chọn số giờ linh hoạt
      const optionsHtml = durationOptions.map(dur => `
        <option value="${dur}" ${dur === r.durationHours ? 'selected' : ''}>${dur} giờ</option>
      `).join('');

      return `
        <tr class="cdss-row-${idx % 2 === 0 ? 'even' : 'odd'}">
          <!-- CỘT 1: MỐC GIỜ & THỜI LƯỢNG -->
          <td class="cdss-col-time">
            <div class="cdss-step-badge">Cữ ${r.stepIndex}</div>
            <div class="cdss-time-window">${r.timeWindow}</div>
            <div class="cdss-duration-select-wrap">
              <label><i class="fa-regular fa-clock"></i> Thời lượng:</label>
              <select class="cdss-duration-select" data-row-idx="${idx}">
                ${optionsHtml}
              </select>
            </div>
            <div class="cdss-stage-label">${r.stageName}</div>
          </td>

          <!-- CỘT 2: TỐC ĐỘ & LƯỢNG DỊCH -->
          <td class="cdss-col-rate">
            <div class="cdss-rate-main">
              <span class="cdss-rate-val">${r.rateMlKgH}</span>
              <span class="cdss-rate-unit">ml/kg/giờ</span>
            </div>
            <div class="cdss-rate-drops">
              <i class="fa-solid fa-water"></i> <strong>${r.dropsPerMin}</strong> giọt/phút
              <small style="color:var(--vault-muted);">(Dây 20 giọt/ml)</small>
            </div>
            <div class="cdss-rate-calc">
              Thể tích cần: <strong>${r.totalMl.toLocaleString('vi-VN')} ml</strong>
              <div class="cdss-formula-tiny">(${r.rateMlKgH} × ${plan.weightResult.adjustedWeightKg}kg × ${r.durationHours}h)</div>
            </div>
          </td>

          <!-- CỘT 3: DỊCH CÓ SẴN / TREO THÊM -->
          <td class="cdss-col-bottles">
            <div class="cdss-bottle-flow">
              <div class="cdss-bottle-stat">
                <span class="cdss-label-sm">Dịch sẵn từ cữ trước:</span>
                <span class="cdss-val-sm">${r.existingFluidMl} ml</span>
              </div>
              <div class="cdss-bottle-action">
                <span class="cdss-hang-badge ${r.bottlesToHang > 0 ? 'cdss-hang-badge--active' : ''}">
                  <i class="fa-solid fa-plus"></i> Treo thêm: <strong>${r.bottlesToHang}</strong> chai 500ml
                </span>
              </div>
            </div>
          </td>

          <!-- CỘT 4: TỔNG DỊCH TẠI CỌC & GIÁM SÁT -->
          <td class="cdss-col-pole">
            <div class="cdss-pole-total">
              <span class="cdss-label-sm">Tổng có trên cọc:</span>
              <span class="cdss-pole-val">${r.totalAtPoleMl.toLocaleString('vi-VN')} ml</span>
            </div>
            ${r.hctCheckRequired ? `
              <div class="cdss-hct-alert">
                <i class="fa-solid fa-vial"></i> <strong>Đo lại Hct tại giường</strong>
              </div>
            ` : ''}
            <div class="cdss-monitoring-tip">
              ${r.monitoringNotes}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Gắn sự kiện thay đổi số giờ dropdown
    const selects = tbody.querySelectorAll('.cdss-duration-select');
    selects.forEach(sel => {
      sel.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        const rowIdx = parseInt(target.getAttribute('data-row-idx') || '0', 10);
        const newDur = parseFloat(target.value);
        this.customDurations[rowIdx] = newDur;
        this.recalculate();
      });
    });
  }

  private renderVasopressors(plan: DengueCDSSPlan): void {
    const grid = document.getElementById('cdss-vaso-grid');
    if (!grid) return;

    const { vasopressorDopamin: d, vasopressorNoradrenalin: n } = plan;

    grid.innerHTML = `
      <!-- Card Dopamin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div class="cdss-vaso-title">
            <span class="cdss-drug-tag cdss-drug-tag--primary">Dopamin</span>
            <span class="cdss-drug-indication">Lựa chọn đầu tay ở trẻ em</span>
          </div>
          <span class="cdss-badge cdss-badge--info">Bơm Tiêm Điện 50ml</span>
        </div>
        <div class="cdss-vaso-body">
          <div class="cdss-vaso-recipe">
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">Công thức pha:</span>
              <span class="cdss-recipe-val"><strong>${d.totalMg} mg</strong> Dopamin (3 × ${d.patientWeightKg} kg)</span>
            </div>
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">Dung môi pha:</span>
              <span class="cdss-recipe-val">Glucose 5% vừa đủ <strong>50 ml</strong></span>
            </div>
            <div class="cdss-recipe-row cdss-recipe-highlight">
              <span class="cdss-recipe-key">Tương đương liều:</span>
              <span class="cdss-recipe-val"><strong>Tốc độ 1 ml/giờ = 1 µg/kg/phút</strong></span>
            </div>
          </div>
          <div class="cdss-vaso-dosing">
            <div class="cdss-dosing-range">
              Liều khuyến cáo: <strong>${d.standardDoseRange}</strong>
            </div>
            <div class="cdss-pump-rate">
              Tốc độ bơm tiêm: <strong class="text-primary">${d.recommendedPumpRateMlH}</strong>
            </div>
          </div>
          <p class="cdss-vaso-notes"><i class="fa-solid fa-circle-exclamation"></i> ${d.precautions}</p>
        </div>
      </div>

      <!-- Card Noradrenalin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div class="cdss-vaso-title">
            <span class="cdss-drug-tag cdss-drug-tag--danger">Noradrenalin</span>
            <span class="cdss-drug-indication">Sốc giãn mạch / Tụt HA tâm trương</span>
          </div>
          <span class="cdss-badge cdss-badge--danger">High Alert</span>
        </div>
        <div class="cdss-vaso-body">
          <div class="cdss-vaso-recipe">
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">Công thức pha:</span>
              <span class="cdss-recipe-val"><strong>${n.totalMg} mg</strong> Noradrenalin (0.3 × ${n.patientWeightKg} kg)</span>
            </div>
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">Dung môi pha:</span>
              <span class="cdss-recipe-val">Glucose 5% vừa đủ <strong>50 ml</strong></span>
            </div>
            <div class="cdss-recipe-row cdss-recipe-highlight">
              <span class="cdss-recipe-key">Tương đương liều:</span>
              <span class="cdss-recipe-val"><strong>Tốc độ 1 ml/giờ = 0.1 µg/kg/phút</strong></span>
            </div>
          </div>
          <div class="cdss-vaso-dosing">
            <div class="cdss-dosing-range">
              Liều khởi đầu: <strong>${n.standardDoseRange}</strong>
            </div>
            <div class="cdss-pump-rate">
              Tốc độ bơm tiêm: <strong class="text-danger">${n.recommendedPumpRateMlH}</strong>
            </div>
          </div>
          <p class="cdss-vaso-notes"><i class="fa-solid fa-triangle-exclamation"></i> ${n.precautions}</p>
        </div>
      </div>
    `;
  }

  private renderNursingList(plan: DengueCDSSPlan): void {
    const list = document.getElementById('cdss-nursing-list');
    if (!list) return;

    list.innerHTML = plan.nursingInstructions.map(item => `
      <li class="cdss-nursing-item">
        <i class="fa-solid fa-check cdss-check-icon"></i>
        <span>${item}</span>
      </li>
    `).join('');
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
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    toast.classList.add('fade-in');
    setTimeout(() => {
      toast.style.display = 'none';
      toast.classList.remove('fade-in');
    }, 3200);
  }
}
