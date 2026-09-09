/**
 * CliniPortal CDSS — Dengue UI Renderer & Interactive Controller (Bộ Y Tế 2023)
 * Path: src/content/knowledge-vault/cdss/dengue/dengue-ui.ts
 */

import {
  DenguePatientInput,
  DengueCDSSPlan,
  Gender,
  DengueSeverity,
  PregnancyTrimester,
  ClinicalResponseStatus
} from '../cdss-types';

import { generateDengueCDSSPlan } from './dengue-engine';
export { generateDengueCDSSPlan };
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
              <span class="cdss-badge cdss-badge--success"><i class="fa-solid fa-shield-halved"></i> Toàn Diện 7 Nhánh</span>
            </div>
            <h1 class="cdss-title">
              <i class="fa-solid fa-droplet cdss-icon-pulse"></i> 
              CDSS Tính Toán Dịch Truyền & Chống Sốc SXHD Dengue
            </h1>
            <p class="cdss-subtitle">
              Hệ thống Hỗ trợ Quyết định Lâm sàng: Tự động chuẩn hóa cân nặng CDC 2014 & PNCT, điều phối cọc dịch 4 cột động học, định hướng nhánh CPT/truyền máu, liều 4 thuốc vận mạch 50ml, phác đồ suy gan NAC và bảng kiểm ABCS.
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
                    <input type="number" id="input-age" min="0.1" max="100" value="8" step="0.5" required class="cdss-input" />
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
                    <input type="number" id="input-weight" min="2" max="150" value="38" step="0.5" required class="cdss-input" />
                    <span class="cdss-input-addon">kg</span>
                  </div>
                  <span class="cdss-input-hint" id="weight-hint-text">VD: Bé 8 tuổi, nặng 38kg (Thừa cân > 120% chuẩn)</span>
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

                <!-- KHỐI ĐỐI TƯỢNG ĐẶC BIỆT -->
                <div class="cdss-section-divider">
                  <span><i class="fa-solid fa-person-breastfeeding"></i> Đối Tượng Đặc Biệt</span>
                </div>

                <div class="cdss-special-box">
                  <!-- Thai kỳ (Chỉ hiện khi là Nữ) -->
                  <div id="wrap-pregnant" class="cdss-checkbox-row" style="display:none;">
                    <label class="cdss-check-label">
                      <input type="checkbox" id="check-pregnant" />
                      <span><strong>Phụ nữ mang thai (PNCT)</strong></span>
                    </label>
                    <div id="wrap-trimester" class="cdss-inline-select" style="display:none; margin-top:0.4rem;">
                      <label for="select-trimester" style="font-size:0.8rem; color:var(--cdss-muted);">Tam cá nguyệt:</label>
                      <select id="select-trimester" class="cdss-select cdss-select--sm">
                        <option value="1">3 tháng đầu (T1)</option>
                        <option value="2">3 tháng giữa (T2: -3kg)</option>
                        <option value="3" selected>3 tháng cuối (T3: -6kg thai/ối)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Thalassemia -->
                  <div class="cdss-checkbox-row">
                    <label class="cdss-check-label">
                      <input type="checkbox" id="check-thalassemia" />
                      <span><strong>Bệnh Thalassemia / Huyết tán</strong></span>
                    </label>
                  </div>

                  <!-- Hct Nền -->
                  <div class="cdss-form-group cdss-mt-2">
                    <label for="input-baseline-hct">Hct Nền Sinh Lý (%)</label>
                    <input type="number" id="input-baseline-hct" min="15" max="60" value="40" step="1" class="cdss-input" />
                    <span class="cdss-input-hint">Nữ: 38% | Nam: 42% | Thalassemia: 20-28% | PNCT: 32-35%</span>
                  </div>
                </div>

                <!-- KHỐI CẬN LÂM SÀNG & RẼ NHÁNH -->
                <div class="cdss-section-divider">
                  <span><i class="fa-solid fa-vial-circle-check"></i> Cận Lâm Sàng & Rẽ Nhánh</span>
                </div>

                <div class="cdss-cln-box">
                  <div class="cdss-form-row">
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-current-hct">Hct Hiện Tại (%)</label>
                      <input type="number" id="input-current-hct" min="15" max="75" value="42" step="1" class="cdss-input font-bold" />
                    </div>
                    <div class="cdss-form-group cdss-col-6">
                      <label for="select-response">Đáp Ứng Lâm Sàng</label>
                      <select id="select-response" class="cdss-select">
                        <option value="improved" selected>Đang Ổn Định / Ra Sốc</option>
                        <option value="worsened">Xấu Đi / Chi Lạnh Ẩm</option>
                        <option value="refractory">Sốc Trơ / Không Đáp Ứng</option>
                      </select>
                    </div>
                  </div>

                  <div class="cdss-form-row">
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-liver-ast">AST / ALT (U/L)</label>
                      <input type="number" id="input-liver-ast" min="10" max="15000" value="35" step="5" class="cdss-input" />
                      <span class="cdss-input-hint">≥ 400: Cấm RL | ≥ 1000: NAC</span>
                    </div>
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-platelets">Tiểu Cầu (/mm³)</label>
                      <input type="number" id="input-platelets" min="1000" max="500000" value="85000" step="1000" class="cdss-input" />
                      <span class="cdss-input-hint">&lt; 5.000: Bắt buộc truyền TC</span>
                    </div>
                  </div>

                  <div class="cdss-form-row">
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-inr">Đông Máu INR</label>
                      <input type="number" id="input-inr" min="0.8" max="10" value="1.05" step="0.05" class="cdss-input" />
                    </div>
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-fibrinogen">Fibrinogen (g/L)</label>
                      <input type="number" id="input-fibrinogen" min="0.2" max="6" value="2.6" step="0.1" class="cdss-input" />
                    </div>
                  </div>

                  <div class="cdss-checkbox-row cdss-mt-1">
                    <label class="cdss-check-label cdss-check-label--danger">
                      <input type="checkbox" id="check-bleeding" />
                      <span><strong><i class="fa-solid fa-droplet text-danger"></i> Xuất huyết ồ ạt / Đe dọa tính mạng</strong></span>
                    </label>
                  </div>
                </div>

                <!-- Case Mẫu Nhanh -->
                <div class="cdss-section-divider">
                  <span><i class="fa-solid fa-wand-magic-sparkles"></i> Ca Lâm Sàng Mẫu</span>
                </div>

                <div class="cdss-form-actions">
                  <button type="button" id="btn-quick-child" class="cdss-chip-btn">
                    <i class="fa-solid fa-child"></i> 1. Trẻ 8T Béo Phì (38kg)
                  </button>
                  <button type="button" id="btn-quick-adult" class="cdss-chip-btn">
                    <i class="fa-solid fa-user"></i> 2. Người Lớn Sốc (55kg)
                  </button>
                  <button type="button" id="btn-quick-severe" class="cdss-chip-btn cdss-chip-btn--danger">
                    <i class="fa-solid fa-bolt"></i> 3. Sốc Nguy Kịch (Mạch 0 HA 0)
                  </button>
                  <button type="button" id="btn-quick-pregnant" class="cdss-chip-btn cdss-chip-btn--warning">
                    <i class="fa-solid fa-person-pregnant"></i> 4. Sản Phụ Sốc (Thai T3 62kg)
                  </button>
                  <button type="button" id="btn-quick-refractory-cpt" class="cdss-chip-btn cdss-chip-btn--info">
                    <i class="fa-solid fa-network-wired"></i> 5. Sốc Trơ + CPT (Hct 48%)
                  </button>
                  <button type="button" id="btn-quick-liver-failure" class="cdss-chip-btn cdss-chip-btn--danger">
                    <i class="fa-solid fa-triangle-exclamation"></i> 6. Suy Gan Cấp (AST 1250 U/L)
                  </button>
                </div>
              </form>
            </div>

            <!-- Box Thông Tin Cân Nặng CDC -->
            <div id="weight-analysis-box" class="cdss-panel cdss-weight-panel">
              <!-- Rendered via updateWeightAnalysis -->
            </div>
          </aside>

          <!-- Right Column: CDSS Results, 4-Column Table, Vasopressors, Blood Products, ABCS -->
          <main class="cdss-content-col">
            <!-- Alert Banner Container -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-wrap"></div>

            <!-- Summary Stat Cards -->
            <div id="cdss-stats-wrap" class="cdss-stats-grid"></div>

            <!-- KHỐI NHÁNH QUYẾT ĐỊNH LÂM SÀNG BYT 2023 -->
            <section id="cdss-branch-panel" class="cdss-panel cdss-branch-panel">
              <!-- Rendered via renderBranchDecision -->
            </section>

            <!-- BẢNG CỌC DỊCH 4 CỘT -->
            <section class="cdss-panel cdss-schedule-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-table-list"></i> Bảng Điều Phối Cọc Dịch 4 Cột Chuẩn Hóa
                  </h2>
                  <p class="cdss-panel-desc">
                    Tự động tính toán lượng dịch gộp, số giọt/phút, dịch dư chuyển cữ và số chai 500ml treo thêm tại cọc theo phác đồ QĐ 2760/QĐ-BYT.
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

            <!-- KHỐI CHỈ ĐỊNH 4 CHẾ PHẨM MÁU -->
            <section id="cdss-blood-panel" class="cdss-panel cdss-blood-panel">
              <!-- Rendered via renderBloodProducts -->
            </section>

            <!-- KHỐI VẬN MẠCH BƠM TIÊM ĐIỆN 50ML (4 THUỐC) -->
            <section class="cdss-panel cdss-vasopressor-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-syringe"></i> Phác Đồ 4 Thuốc Vận Mạch Bơm Tiêm Điện 50ml
                  </h2>
                  <p class="cdss-panel-desc">
                    Áp dụng khi tái sốc hoặc sốc trơ dịch truyền (đã bù đủ thể tích nội mạch hoặc CVP > 10 cmH₂O). Chuẩn hóa công thức pha 50ml nồng độ tương đương tốc độ bơm tiêm điện.
                  </p>
                </div>
              </div>

              <div class="cdss-vasopressor-grid" id="cdss-vaso-grid">
                <!-- 4 Vasopressor Cards -->
              </div>
            </section>

            <!-- KHỐI XỬ TRÍ BIẾN CHỨNG & BẢNG KIỂM ABCS -->
            <section id="cdss-complication-panel" class="cdss-panel cdss-complication-panel">
              <!-- Rendered via renderComplicationsAndABCS -->
            </section>

            <!-- HƯỚNG DẪN ĐIỀU DƯỠNG AN TOÀN (HKKK) -->
            <section class="cdss-panel cdss-nursing-panel">
              <h2 class="cdss-panel-title">
                <i class="fa-solid fa-user-nurse"></i> Quy Trình Điều Dưỡng An Toàn & Theo Dõi Giờ (HKKK)
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

    // Toggle hiện/ẩn Thai kỳ theo giới tính
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(r => {
      r.addEventListener('change', () => {
        this.updateGenderUI();
        this.recalculate();
      });
    });

    // Checkbox pregnant change
    const checkPreg = document.getElementById('check-pregnant');
    if (checkPreg) {
      checkPreg.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        const wrapTrim = document.getElementById('wrap-trimester');
        if (wrapTrim) wrapTrim.style.display = isChecked ? 'block' : 'none';
        this.recalculate();
      });
    }

    // Checkbox thalassemia change
    const checkThal = document.getElementById('check-thalassemia');
    if (checkThal) {
      checkThal.addEventListener('change', (e) => {
        const isChecked = (e.target as HTMLInputElement).checked;
        const baseHctInput = document.getElementById('input-baseline-hct') as HTMLInputElement | null;
        if (baseHctInput && isChecked) {
          baseHctInput.value = '24';
        } else if (baseHctInput && !isChecked) {
          baseHctInput.value = '40';
        }
        this.recalculate();
      });
    }

    // Quick preset buttons
    const btnChild = document.getElementById('btn-quick-child');
    if (btnChild) {
      btnChild.addEventListener('click', () => {
        this.setInputValue('input-age', '8');
        this.setGender('male');
        this.setInputValue('input-weight', '38');
        this.setInputValue('input-severity', 'warning_signs');
        this.setInputValue('input-current-hct', '42');
        this.setInputValue('select-response', 'improved');
        this.setInputValue('input-liver-ast', '35');
        this.setCheckbox('check-pregnant', false);
        this.setCheckbox('check-thalassemia', false);
        this.setCheckbox('check-bleeding', false);
        this.customDurations = {};
        this.updateGenderUI();
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
        this.setInputValue('input-current-hct', '46');
        this.setInputValue('select-response', 'improved');
        this.setInputValue('input-liver-ast', '65');
        this.setCheckbox('check-pregnant', false);
        this.setCheckbox('check-thalassemia', false);
        this.setCheckbox('check-bleeding', false);
        this.customDurations = {};
        this.updateGenderUI();
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
        this.setInputValue('input-current-hct', '49');
        this.setInputValue('select-response', 'worsened');
        this.setInputValue('input-liver-ast', '120');
        this.setCheckbox('check-pregnant', false);
        this.setCheckbox('check-thalassemia', false);
        this.setCheckbox('check-bleeding', false);
        this.customDurations = {};
        this.updateGenderUI();
        this.recalculate();
      });
    }

    const btnPreg = document.getElementById('btn-quick-pregnant');
    if (btnPreg) {
      btnPreg.addEventListener('click', () => {
        this.setInputValue('input-age', '26');
        this.setGender('female');
        this.setInputValue('input-weight', '62');
        this.setInputValue('input-severity', 'shock');
        this.setInputValue('input-current-hct', '39');
        this.setInputValue('input-baseline-hct', '32');
        this.setInputValue('select-response', 'improved');
        this.setCheckbox('check-pregnant', true);
        this.setInputValue('select-trimester', '3');
        this.setCheckbox('check-thalassemia', false);
        this.setCheckbox('check-bleeding', false);
        this.customDurations = {};
        this.updateGenderUI();
        const wrapTrim = document.getElementById('wrap-trimester');
        if (wrapTrim) wrapTrim.style.display = 'block';
        this.recalculate();
      });
    }

    const btnRefractory = document.getElementById('btn-quick-refractory-cpt');
    if (btnRefractory) {
      btnRefractory.addEventListener('click', () => {
        this.setInputValue('input-age', '14');
        this.setGender('male');
        this.setInputValue('input-weight', '48');
        this.setInputValue('input-severity', 'shock');
        this.setInputValue('input-current-hct', '48');
        this.setInputValue('select-response', 'refractory');
        this.setCheckbox('check-bleeding', false);
        this.customDurations = {};
        this.updateGenderUI();
        this.recalculate();
      });
    }

    const btnLiver = document.getElementById('btn-quick-liver-failure');
    if (btnLiver) {
      btnLiver.addEventListener('click', () => {
        this.setInputValue('input-age', '22');
        this.setGender('male');
        this.setInputValue('input-weight', '58');
        this.setInputValue('input-severity', 'shock');
        this.setInputValue('input-current-hct', '42');
        this.setInputValue('input-liver-ast', '1250');
        this.setInputValue('input-inr', '1.85');
        this.setInputValue('select-response', 'worsened');
        this.customDurations = {};
        this.updateGenderUI();
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

  private updateGenderUI(): void {
    const isFemale = (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value === 'female';
    const wrapPreg = document.getElementById('wrap-pregnant');
    if (wrapPreg) {
      wrapPreg.style.display = isFemale ? 'block' : 'none';
      if (!isFemale) {
        this.setCheckbox('check-pregnant', false);
        const wrapTrim = document.getElementById('wrap-trimester');
        if (wrapTrim) wrapTrim.style.display = 'none';
      }
    }
  }

  private setInputValue(id: string, val: string): void {
    const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
    if (el) el.value = val;
  }

  private setCheckbox(id: string, checked: boolean): void {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el) el.checked = checked;
  }

  private setGender(val: Gender): void {
    const radio = document.querySelector(`input[name="gender"][value="${val}"]`) as HTMLInputElement | null;
    if (radio) radio.checked = true;
  }

  private getFormData(): DenguePatientInput {
    const age = parseFloat((document.getElementById('input-age') as HTMLInputElement)?.value) || 8;
    const gender = ((document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value as Gender) || 'male';
    const weight = parseFloat((document.getElementById('input-weight') as HTMLInputElement)?.value) || 30;
    const severity = ((document.getElementById('input-severity') as HTMLSelectElement)?.value as DengueSeverity) || 'warning_signs';
    const startTime = (document.getElementById('input-starttime') as HTMLInputElement)?.value || '08:00';

    const isPregnant = gender === 'female' && !!(document.getElementById('check-pregnant') as HTMLInputElement)?.checked;
    const pregnancyTrimester = parseInt((document.getElementById('select-trimester') as HTMLSelectElement)?.value || '3', 10) as PregnancyTrimester;
    const hasThalassemia = !!(document.getElementById('check-thalassemia') as HTMLInputElement)?.checked;
    const baselineHct = parseFloat((document.getElementById('input-baseline-hct') as HTMLInputElement)?.value) || (hasThalassemia ? 24 : gender === 'female' ? 38 : 42);
    const currentHct = parseFloat((document.getElementById('input-current-hct') as HTMLInputElement)?.value) || 40;
    const clinicalResponse = ((document.getElementById('select-response') as HTMLSelectElement)?.value as ClinicalResponseStatus) || 'improved';
    const liverAST = parseFloat((document.getElementById('input-liver-ast') as HTMLInputElement)?.value) || 35;
    const plt = parseFloat((document.getElementById('input-platelets') as HTMLInputElement)?.value) || 150000;
    const inr = parseFloat((document.getElementById('input-inr') as HTMLInputElement)?.value) || 1.0;
    const fbg = parseFloat((document.getElementById('input-fibrinogen') as HTMLInputElement)?.value) || 2.5;
    const massiveBleeding = !!(document.getElementById('check-bleeding') as HTMLInputElement)?.checked;

    return {
      ageYears: age,
      gender,
      actualWeightKg: weight,
      severity,
      startTime,
      isPregnant,
      pregnancyTrimester,
      hasThalassemia,
      baselineHctPercent: baselineHct,
      currentHctPercent: currentHct,
      clinicalResponse,
      liverEnzymesAST_ALT: liverAST,
      plateletsCount: plt,
      inrValue: inr,
      fibrinogenGL: fbg,
      massiveBleeding
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
    this.renderBranchDecision(plan);
    this.renderFluidTable(plan);
    this.renderBloodProducts(plan);
    this.renderVasopressors(plan);
    this.renderComplicationsAndABCS(plan);
    this.renderNursingList(plan);
  }

  private renderWeightAnalysis(plan: DengueCDSSPlan): void {
    const box = document.getElementById('weight-analysis-box');
    if (!box) return;

    const { weightResult, ageGroup, patient } = plan;
    const isObese = weightResult.isObese;
    const isPregAdj = weightResult.isPregnantAdjusted;

    box.innerHTML = `
      <div class="cdss-weight-header">
        <span class="cdss-weight-badge ${isObese ? 'cdss-badge--danger' : isPregAdj ? 'cdss-badge--warning' : 'cdss-badge--success'}">
          ${isObese ? '<i class="fa-solid fa-triangle-exclamation"></i> Thừa Cân / Béo Phì' : isPregAdj ? '<i class="fa-solid fa-person-pregnant"></i> Hiệu Chỉnh Thai Kỳ' : '<i class="fa-solid fa-circle-check"></i> Cân Nặng Chuẩn / Hợp Lý'}
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
          <span class="cdss-stat-label">${isPregAdj ? 'Trừ Thai/Ối' : 'Chuẩn CDC 2014'}</span>
          <span class="cdss-stat-val text-muted">${isPregAdj ? '- 6 kg' : `${weightResult.standardWeightKg} kg`}</span>
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
    const fluidType = plan.branchDecision.recommendedFluid;

    wrap.innerHTML = `
      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--blue">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">Tổng Thể Tích Dịch Gộp</span>
          <span class="cdss-card-val">${plan.totalVolumeMl.toLocaleString('vi-VN')} <small>ml</small></span>
          <span class="cdss-card-sub">~ ${mlPerKg} ml/kg (${plan.weightResult.adjustedWeightKg}kg)</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--purple">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">Tổng Thời Lượng Dự Kiến</span>
          <span class="cdss-card-val">${plan.totalDurationHours} <small>giờ</small></span>
          <span class="cdss-card-sub">${plan.fluidRows.length} bậc tốc độ chuẩn BYT</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--teal">
          <i class="fa-solid fa-bottle-water"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">Ước Tính Số Chai 500ml</span>
          <span class="cdss-card-val">${Math.ceil(plan.totalVolumeMl / 500)} <small>chai</small></span>
          <span class="cdss-card-sub">${fluidType.includes('NaCl') ? 'NaCl 0.9%' : 'Ringer Lactate'}</span>
        </div>
      </div>
    `;
  }

  private renderBranchDecision(plan: DengueCDSSPlan): void {
    const panel = document.getElementById('cdss-branch-panel');
    if (!panel) return;

    const b = plan.branchDecision;
    const isDanger = b.branchType === 'blood' || b.branchType === 'refractory_shock';
    const isWarning = b.branchType === 'cpt';

    panel.innerHTML = `
      <div class="cdss-panel-header-row">
        <div>
          <h2 class="cdss-panel-title">
            <i class="fa-solid fa-code-branch"></i> Nhánh Quyết Định Lâm Sàng (Phụ Lục 10 BYT 2023)
          </h2>
          <p class="cdss-panel-desc">
            Phân tích tự động dựa trên Hct hiện tại (${plan.patient.currentHctPercent ?? 40}%), Hct nền (${plan.patient.baselineHctPercent ?? 40}%), phân độ và đáp ứng bù dịch.
          </p>
        </div>
        <span class="cdss-badge ${isDanger ? 'cdss-badge--danger' : isWarning ? 'cdss-badge--warning' : 'cdss-badge--success'}">
          ${b.branchType.toUpperCase()}
        </span>
      </div>

      <div class="cdss-branch-box ${isDanger ? 'cdss-branch-box--danger' : isWarning ? 'cdss-branch-box--warning' : 'cdss-branch-box--standard'}">
        <div class="cdss-branch-head">
          <div class="cdss-branch-title">
            <i class="fa-solid ${isDanger ? 'fa-triangle-exclamation text-danger' : isWarning ? 'fa-shuffle text-warning' : 'fa-circle-check text-success'}"></i>
            <strong>${b.title}</strong>
          </div>
          <div class="cdss-branch-fluid">
            Dịch khuyến nghị: <strong class="text-primary">${b.recommendedFluid}</strong>
          </div>
        </div>
        <p class="cdss-branch-reasoning">${b.reasoning}</p>

        ${b.warnings.length > 0 ? `
          <ul class="cdss-branch-warnings">
            ${b.warnings.map(w => `<li><i class="fa-solid fa-arrow-right"></i> ${w}</li>`).join('')}
          </ul>
        ` : ''}

        <!-- Hộp hướng dẫn chuyển đổi Cao phân tử về Tinh thể (Phụ lục 10) -->
        <div class="cdss-cpt-conversion-box">
          <div class="cdss-cpt-conversion-title">
            <i class="fa-solid fa-repeat"></i> Quy Tắc Chuyển Đổi Cao Phân Tử → Tinh Thể (Phụ lục 10):
          </div>
          <div class="cdss-cpt-conversion-content">
            • <strong>Điều kiện:</strong> Mạch rõ, HA bình thường (hiệu áp > 30 mmHg), chi ấm, CRT &lt; 2s, nước tiểu ≥ 0.5 - 1.0 ml/kg/h, Hct giảm và ổn định.<br>
            • <strong>Bậc hạ:</strong> Giảm CPT 10 ml/kg/h (1-2h) → 7.5 ml/kg/h (1-2h) → 5 ml/kg/h (2-3h) → Chuyển sang Dịch tinh thể 5 hoặc 3 ml/kg/h.<br>
            • <strong>Trần an toàn:</strong> Dextran 40 ≤ 30 ml/kg/24h | HES 200 ≤ 30-50 ml/kg/24h.
          </div>
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
              <small style="color:var(--cdss-muted);">(Dây 20 giọt/ml)</small>
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

  private renderBloodProducts(plan: DengueCDSSPlan): void {
    const panel = document.getElementById('cdss-blood-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="cdss-panel-header-row">
        <div>
          <h2 class="cdss-panel-title">
            <i class="fa-solid fa-hand-holding-droplet"></i> Chỉ Định 4 Chế Phẩm Máu Chuẩn Bộ Y Tế 2023
          </h2>
          <p class="cdss-panel-desc">
            Áp dụng khi có biến chứng xuất huyết nặng hoặc rối loạn đông máu kèm thất bại bù dịch. Tính liều chính xác theo cân nặng hiệu chỉnh ${plan.weightResult.adjustedWeightKg} kg.
          </p>
        </div>
      </div>

      <div class="cdss-blood-grid">
        ${plan.bloodProducts.map(p => `
          <div class="cdss-blood-card ${p.thresholdMet ? 'cdss-blood-card--active' : ''}">
            <div class="cdss-blood-card-header">
              <div class="cdss-blood-card-title">
                <strong>${p.productName}</strong>
                ${p.thresholdMet ? '<span class="cdss-badge cdss-badge--danger"><i class="fa-solid fa-bell"></i> ĐẠT NGƯỠNG CHỈ ĐỊNH</span>' : '<span class="cdss-badge cdss-badge--info">Theo Dõi</span>'}
              </div>
            </div>
            <div class="cdss-blood-card-body">
              <div class="cdss-blood-dose">
                Liều tính theo thể trọng: <strong class="text-primary font-bold">${p.calculatedDose}</strong>
                <small class="text-muted">(${p.doseFormula})</small>
              </div>
              <div class="cdss-blood-ind">
                <strong>Chỉ định BYT:</strong> ${p.indication}
              </div>
              <div class="cdss-blood-target">
                <strong>Mục tiêu:</strong> ${p.targetClinical}
              </div>
              <div class="cdss-blood-prec">
                <i class="fa-solid fa-circle-exclamation"></i> ${p.precautions}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderVasopressors(plan: DengueCDSSPlan): void {
    const grid = document.getElementById('cdss-vaso-grid');
    if (!grid) return;

    const {
      vasopressorDopamin: d,
      vasopressorNoradrenalin: n,
      vasopressorDobutamin: dob,
      vasopressorAdrenalin: adr
    } = plan;

    const list = [d, n, dob, adr];

    grid.innerHTML = list.map((item, idx) => {
      const isDopamin = item.drugName === 'Dopamin';
      const isNor = item.drugName === 'Noradrenalin';
      const isDob = item.drugName === 'Dobutamin';
      const isAdr = item.drugName === 'Adrenalin';

      const tagClass = isDopamin ? 'cdss-drug-tag--primary' : isNor ? 'cdss-drug-tag--danger' : isDob ? 'cdss-drug-tag--warning' : 'cdss-drug-tag--purple';
      const badgeText = isNor || isAdr ? 'High Alert' : 'Bơm Tiêm Điện 50ml';
      const badgeClass = isNor || isAdr ? 'cdss-badge--danger' : 'cdss-badge--info';

      return `
        <div class="cdss-vaso-card">
          <div class="cdss-vaso-card-header">
            <div class="cdss-vaso-title">
              <span class="cdss-drug-tag ${tagClass}">${item.drugName}</span>
              <span class="cdss-drug-indication">${item.clinicalIndications}</span>
            </div>
            <span class="cdss-badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="cdss-vaso-body">
            <div class="cdss-vaso-recipe">
              <div class="cdss-recipe-row">
                <span class="cdss-recipe-key">Công thức pha:</span>
                <span class="cdss-recipe-val"><strong>${item.totalMg} mg</strong> ${item.drugName} (${item.calculationFormula})</span>
              </div>
              <div class="cdss-recipe-row">
                <span class="cdss-recipe-key">Dung môi pha:</span>
                <span class="cdss-recipe-val">${item.diluentSolution}</span>
              </div>
              <div class="cdss-recipe-row cdss-recipe-highlight">
                <span class="cdss-recipe-key">Tương đương:</span>
                <span class="cdss-recipe-val"><strong>${item.infusionEquivalent}</strong></span>
              </div>
            </div>
            <div class="cdss-vaso-dosing">
              <div class="cdss-dosing-range">
                Liều khuyến cáo: <strong>${item.standardDoseRange}</strong>
              </div>
              <div class="cdss-pump-rate">
                Tốc độ bơm: <strong class="${isNor || isAdr ? 'text-danger' : 'text-primary'}">${item.recommendedPumpRateMlH}</strong>
              </div>
            </div>
            <p class="cdss-vaso-notes"><i class="fa-solid fa-circle-exclamation"></i> ${item.precautions}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  private renderComplicationsAndABCS(plan: DengueCDSSPlan): void {
    const panel = document.getElementById('cdss-complication-panel');
    if (!panel) return;

    const nac = plan.nacProtocol;
    const abcs = plan.abcsChecklist;

    panel.innerHTML = `
      <div class="cdss-panel-header-row">
        <div>
          <h2 class="cdss-panel-title">
            <i class="fa-solid fa-shield-virus"></i> Xử Trí Biến Chứng Nặng & Bảng Kiểm ABCS
          </h2>
          <p class="cdss-panel-desc">
            Phác đồ N-Acetylcysteine (NAC) đường tĩnh mạch điều trị suy gan cấp và quy trình kiểm soát ABCS khi tái sốc hoặc sốc kéo dài trơ dịch.
          </p>
        </div>
      </div>

      <!-- KHỐI PHÁC ĐỒ NAC SUY GAN CẤP -->
      <div class="cdss-complication-box ${nac.indicated ? 'cdss-complication-box--danger' : ''}">
        <div class="cdss-complication-head">
          <div class="cdss-complication-title">
            <i class="fa-solid fa-liver text-danger"></i>
            <strong>Phác Đồ N-Acetylcysteine (NAC) Tĩnh Mạch — Tổn Thương Gan Cấp / Suy Gan</strong>
          </div>
          <span class="cdss-badge ${nac.indicated ? 'cdss-badge--danger' : 'cdss-badge--info'}">
            ${nac.severityLevel === 'acute_liver_failure' ? 'SUY GAN CẤP' : nac.severityLevel === 'severe_hepatitis' ? 'VIÊM GAN NẶNG' : 'CHỨC NĂNG GAN BÌNH THƯỜNG'}
          </span>
        </div>
        <p class="cdss-complication-summary">${nac.summary}</p>

        ${nac.phases.length > 0 ? `
          <div class="cdss-table-responsive cdss-mt-2">
            <table class="cdss-table cdss-table--sm">
              <thead>
                <tr>
                  <th>Pha</th>
                  <th>Liều mg/kg</th>
                  <th>Tổng Liều (mg)</th>
                  <th>Dung Môi & Thể Tích</th>
                  <th>Thời Gian</th>
                  <th>Tốc Độ Bơm Tiêm</th>
                </tr>
              </thead>
              <tbody>
                ${nac.phases.map(p => `
                  <tr>
                    <td><strong>${p.phaseName}</strong></td>
                    <td>${p.doseMgKg} mg/kg</td>
                    <td><strong class="text-primary">${p.totalMg} mg</strong></td>
                    <td>${p.diluent}</td>
                    <td>${p.infusionTimeHours} giờ</td>
                    <td><strong class="text-danger">${p.pumpRateMlH}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${nac.precautions.length > 0 ? `
          <ul class="cdss-complication-precautions">
            ${nac.precautions.map(pr => `<li><i class="fa-solid fa-triangle-exclamation text-warning"></i> ${pr}</li>`).join('')}
          </ul>
        ` : ''}
      </div>

      <!-- KHỐI BẢNG KIỂM ABCS -->
      <div class="cdss-abcs-wrap cdss-mt-3">
        <h3 class="cdss-abcs-header-title">
          <i class="fa-solid fa-list-check"></i> Bảng Kiểm ABCS Khi Sốc Kéo Dài Hoặc Tái Sốc Trơ Dịch
        </h3>
        <div class="cdss-abcs-grid">
          <!-- A: Acidosis -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--a">A</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.acidosis.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Tiêu chuẩn:</strong> ${abcs.acidosis.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>Xử trí:</strong> ${abcs.acidosis.action}</div>
            </div>
          </div>

          <!-- B: Bleeding -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--b">B</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.bleeding.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Tiêu chuẩn:</strong> ${abcs.bleeding.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>Xử trí:</strong> ${abcs.bleeding.action}</div>
            </div>
          </div>

          <!-- C: Calcium -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--c">C</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.calcium.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Tiêu chuẩn:</strong> ${abcs.calcium.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>Xử trí:</strong> ${abcs.calcium.action}</div>
            </div>
          </div>

          <!-- S: Sugar -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--s">S</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.sugar.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Tiêu chuẩn:</strong> ${abcs.sugar.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>Xử trí:</strong> ${abcs.sugar.action}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- KHỐI QUÁ TẢI DỊCH & XUẤT HUYẾT TIÊU HÓA -->
      <div class="cdss-extra-complications-grid cdss-mt-3">
        <div class="cdss-extra-comp-card">
          <div class="cdss-extra-comp-title">
            <i class="fa-solid fa-water-ladder text-info"></i> Quá Tải Dịch & Phù Phổi Cấp (ALI/ARDS)
          </div>
          <p class="cdss-extra-comp-desc">
            • Dấu hiệu: Thở nhanh, SpO2 &lt; 92%, ran ẩm đáy phổi, gan to nhanh đau tức, X-quang phổi mờ hình cánh bướm.<br>
            • Xử trí: Giảm tốc độ truyền dịch về tốc độ tối thiểu hoặc tạm ngừng; thở oxy qua gọng kính / CPAP; tiêm <strong>Furosemid 0.5 - 1.0 mg/kg</strong> tĩnh mạch chậm nếu đã đủ thể tích nội mạch và huyết áp ổn định.
          </p>
        </div>
        <div class="cdss-extra-comp-card">
          <div class="cdss-extra-comp-title">
            <i class="fa-solid fa-kit-medical text-danger"></i> Xuất Huyết Tiêu Hóa Nặng
          </div>
          <p class="cdss-extra-comp-desc">
            • Đặt ống thông dạ dày giải áp và theo dõi màu sắc dịch.<br>
            • Khởi động thuốc ức chế bơm proton (PPI): <strong>Omeprazole 80mg tiêm tĩnh mạch bolus</strong>, sau đó truyền liên tục 8mg/giờ hoặc 40mg tĩnh mạch mỗi 12 giờ.<br>
            • Hội chẩn nội soi tiêu hóa can thiệp cầm máu khẩn cấp khi huyết áp tạm ổn định.
          </p>
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
      `• Cân tính dịch CDC 2014: ${p.weightResult.adjustedWeightKg} kg ${p.weightResult.isObese ? '(HIỆU CHỈNH THỪA CÂN)' : p.weightResult.isPregnantAdjusted ? '(HIỆU CHỈNH PNCT)' : ''}`,
      `• Phân độ: ${p.patient.severity === 'warning_signs' ? 'Dấu hiệu cảnh báo' : p.patient.severity === 'shock' ? 'Sốc SXHD' : 'Sốc nguy kịch'}`,
      `• Hct đo tại giường: ${p.patient.currentHctPercent ?? 40}% (Hct nền: ${p.patient.baselineHctPercent ?? 40}%) | Đáp ứng: ${p.patient.clinicalResponse}`,
      `• Nhánh điều trị: ${p.branchDecision.title} (Khuyến nghị: ${p.branchDecision.recommendedFluid})`,
      `• Kế hoạch cọc dịch:`,
      ...p.fluidRows.map(r => `  - Cữ ${r.stepIndex} (${r.timeWindow}): ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} giọt/phút) | Cần ${r.totalMl} ml | Treo thêm: ${r.bottlesToHang} chai | Tại cọc: ${r.totalAtPoleMl} ml`),
      `• Tổng dịch: ${p.totalVolumeMl} ml trong ${p.totalDurationHours} giờ.`,
      `• Vận mạch khi cần: Dopamin (${p.vasopressorDopamin.totalMg}mg/50ml) | Noradrenalin (${p.vasopressorNoradrenalin.totalMg}mg/50ml) | Dobutamin (${p.vasopressorDobutamin.totalMg}mg/50ml)`,
      ...(p.nacProtocol.indicated ? [`• Phác đồ NAC: Suy gan cấp (AST/ALT ${p.nacProtocol.astAltVal} U/L) - CẤM Ringer Lactate & Paracetamol.`] : []),
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

// Support offline file:/// and global scripts
if (typeof window !== 'undefined') {
  (window as any).DengueCDSSController = DengueCDSSController;
  (window as any).generateDengueCDSSPlan = generateDengueCDSSPlan;
}


