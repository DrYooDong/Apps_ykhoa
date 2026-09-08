/**
 * CliniPortal CDSS — ABG Pro UI Controller (DocSpace Clinical Integration)
 * Path: src/content/knowledge-vault/cdss/abg/abg-ui.ts
 */

import { ABGInput, ABGAnalysisResult, ClinicalCase, TreatmentProtocol, GlossaryItem } from './abg-types';
import { analyzeABG } from './abg-engine';
import { CLINICAL_CASES } from './abg-cases';
import { TREATMENT_PROTOCOLS } from './abg-protocols';
import { ABG_GLOSSARY } from './abg-glossary';

export const ABG_PRESETS: { name: string; desc: string; input: ABGInput }[] = [
  {
    name: 'Bình thường',
    desc: 'Khí máu động mạch chuẩn (Khí phòng FiO2 21%)',
    input: { unit: 'mmHg', pH: 7.40, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, k: 4.0, cl: 102, albumin: 40, lactate: 1.0, patientAge: 35 }
  },
  {
    name: 'Toan ceton DKA',
    desc: 'Đái tháo đường biến chứng toan ceton nặng',
    input: { unit: 'mmHg', pH: 7.15, pCO2: 20, pO2: 98, hco3: 7, be: -19, sao2: 99, fio2: 21, na: 132, k: 5.2, cl: 96, albumin: 38, glucose: 24.5, lactate: 1.8, patientAge: 28 }
  },
  {
    name: 'Sốc Toan Lactic',
    desc: 'Sốc nhiễm khuẩn suy đa tạng, toan chuyển hóa nặng',
    input: { unit: 'mmHg', pH: 7.10, pCO2: 28, pO2: 70, hco3: 9, be: -20, sao2: 91, fio2: 40, na: 138, k: 4.8, cl: 100, albumin: 28, lactate: 8.5, patientAge: 62 }
  },
  {
    name: 'Đợt cấp COPD',
    desc: 'Toan hô hấp mạn tính đợt cấp kiệt cơ hô hấp',
    input: { unit: 'mmHg', pH: 7.24, pCO2: 78, pO2: 52, hco3: 33, be: 6, sao2: 83, fio2: 24, na: 139, k: 4.1, cl: 98, albumin: 39, lactate: 1.4, patientAge: 71 }
  },
  {
    name: 'Suy hô hấp ARDS',
    desc: 'Tổn thương phổi cấp giảm oxy máu nặng (P/F < 150)',
    input: { unit: 'mmHg', pH: 7.36, pCO2: 42, pO2: 68, hco3: 23, be: -1, sao2: 92, fio2: 60, na: 140, k: 4.0, cl: 102, albumin: 30, lactate: 2.1, patientAge: 54 }
  },
  {
    name: 'Kiềm Chuyển Hóa',
    desc: 'Hẹp môn vị nôn ói nhiều mất dịch & acid HCl',
    input: { unit: 'mmHg', pH: 7.55, pCO2: 48, pO2: 90, hco3: 40, be: 14, sao2: 98, fio2: 21, na: 136, k: 2.9, cl: 86, albumin: 42, lactate: 1.0, patientAge: 45 }
  }
];

export class AbgCDSSController {
  private container: HTMLElement;
  private currentInput: ABGInput;
  private currentTab: 'analyzer' | 'cases' | 'protocols' | 'glossary' = 'analyzer';
  private selectedCaseId: number | null = null;
  private glossaryFilter: string = '';

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
    this.currentInput = { ...ABG_PRESETS[0].input };
    this.init();
  }

  private init(): void {
    this.render();
    this.attachEventListeners();
  }

  private render(): void {
    const result = analyzeABG(this.currentInput);

    this.container.innerHTML = `
      <div class="abg-app-container">
        <!-- Brand / Header Card -->
        <header class="abg-header-card">
          <div class="abg-brand-wrap">
            <div class="abg-brand-icon">
              <i class="fa-solid fa-lungs"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="abg-badge abg-badge--primary"><i class="fa-solid fa-microchip"></i> CDSS Lâm Sàng 2.0</span>
                <span class="abg-badge abg-badge--success"><i class="fa-solid fa-circle-check"></i> Chuẩn EBM 2026</span>
              </div>
              <h1 class="abg-header-title">Hệ Thống Phân Tích Khí Máu Động Mạch & Xử Trí (ABG Pro)</h1>
              <p class="abg-header-subtitle">
                Đánh giá 6 bước rối loạn toan kiềm, tính khoảng trống Anion Gap hiệu chỉnh Albumin, Delta-Delta, A-a gradient và kết nối quy trình bệnh án DocSpace SOAP.
              </p>
            </div>
          </div>

          <div class="abg-header-actions">
            <button id="btn-export-soap" class="abg-btn abg-btn--soap" title="Chép kết quả phân tích theo cấu trúc bệnh án SOAP">
              <i class="fa-solid fa-copy"></i> <span>Chép Vào Bệnh Án SOAP</span>
            </button>
            <button id="btn-reset-normal" class="abg-btn abg-btn--outline" title="Đặt lại thông số bình thường">
              <i class="fa-solid fa-rotate-left"></i> <span>Đặt Lại</span>
            </button>
          </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="abg-tabs-bar">
          <button class="abg-tab-btn ${this.currentTab === 'analyzer' ? 'active' : ''}" data-tab="analyzer">
            <i class="fa-solid fa-calculator"></i> 1. Máy Tính & Phân Tích 6 Bước
          </button>
          <button class="abg-tab-btn ${this.currentTab === 'cases' ? 'active' : ''}" data-tab="cases">
            <i class="fa-solid fa-folder-open"></i> 2. Thư Viện Ca Lâm Sàng (${CLINICAL_CASES.length})
          </button>
          <button class="abg-tab-btn ${this.currentTab === 'protocols' ? 'active' : ''}" data-tab="protocols">
            <i class="fa-solid fa-notes-medical"></i> 3. Phác Đồ Cấp Cứu (${TREATMENT_PROTOCOLS.length})
          </button>
          <button class="abg-tab-btn ${this.currentTab === 'glossary' ? 'active' : ''}" data-tab="glossary">
            <i class="fa-solid fa-book-medical"></i> 4. Tra Cứu Thuật Ngữ (${ABG_GLOSSARY.length})
          </button>
        </nav>

        <!-- Tab Content View -->
        ${this.renderTabContent(result)}

        <!-- Toast Notification -->
        <div id="abg-toast" class="abg-toast">
          <i class="fa-solid fa-circle-check text-emerald-400"></i>
          <span id="abg-toast-msg">Đã chép nội dung vào khay nhớ tạm!</span>
        </div>
      </div>
    `;
  }

  private renderTabContent(result: ABGAnalysisResult): string {
    switch (this.currentTab) {
      case 'analyzer':
        return this.renderAnalyzerView(result);
      case 'cases':
        return this.renderCasesView();
      case 'protocols':
        return this.renderProtocolsView();
      case 'glossary':
        return this.renderGlossaryView();
      default:
        return '';
    }
  }

  private renderAnalyzerView(result: ABGAnalysisResult): string {
    return `
      <!-- Quick Presets -->
      <div class="abg-presets-bar">
        <span class="abg-presets-label"><i class="fa-solid fa-bolt"></i> Nạp Nhanh Ca Mẫu:</span>
        ${ABG_PRESETS.map((p, idx) => `
          <button class="abg-preset-chip" data-preset-idx="${idx}" title="${p.desc}">
            ${p.name}
          </button>
        `).join('')}
      </div>

      <!-- Main Form & Evaluation Grid -->
      <div class="abg-main-grid">
        <!-- Input Form Column -->
        <section class="abg-input-card">
          <div class="abg-card-title">
            <span><i class="fa-solid fa-sliders text-blue-600"></i> Thông Số Cận Lâm Sàng</span>
            <span style="font-size: 0.75rem; color: var(--abg-muted); font-weight: 500;">Đơn vị: mmHg</span>
          </div>

          <form id="abg-form" onsubmit="return false;">
            <!-- Section 1: Khí máu cốt lõi -->
            <div class="abg-form-section-title">1. Khí Máu Động Mạch (Cốt lõi)</div>
            <div class="abg-input-grid">
              <div class="abg-field">
                <label for="inp-ph">pH máu <span class="abg-normal-hint">7.35 - 7.45</span></label>
                <input type="number" step="0.01" id="inp-ph" value="${this.currentInput.pH}" required>
              </div>
              <div class="abg-field">
                <label for="inp-pco2">PaCO2 <span class="abg-normal-hint">35 - 45 mmHg</span></label>
                <input type="number" step="0.1" id="inp-pco2" value="${this.currentInput.pCO2}" required>
              </div>
              <div class="abg-field">
                <label for="inp-po2">PaO2 <span class="abg-normal-hint">80 - 100 mmHg</span></label>
                <input type="number" step="0.1" id="inp-po2" value="${this.currentInput.pO2}" required>
              </div>
              <div class="abg-field">
                <label for="inp-hco3">HCO3- <span class="abg-normal-hint">22 - 26 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-hco3" value="${this.currentInput.hco3}" required>
              </div>
              <div class="abg-field">
                <label for="inp-be">BE (Kiềm dư) <span class="abg-normal-hint">-2 đến +2</span></label>
                <input type="number" step="0.1" id="inp-be" value="${this.currentInput.be}">
              </div>
              <div class="abg-field">
                <label for="inp-sao2">SaO2 (%) <span class="abg-normal-hint">95 - 100%</span></label>
                <input type="number" step="0.1" id="inp-sao2" value="${this.currentInput.sao2}">
              </div>
              <div class="abg-field">
                <label for="inp-fio2">FiO2 (%) <span class="abg-normal-hint">21 - 100%</span></label>
                <input type="number" step="1" id="inp-fio2" value="${this.currentInput.fio2}">
              </div>
              <div class="abg-field">
                <label for="inp-age">Tuổi bệnh nhân <span class="abg-normal-hint">Năm</span></label>
                <input type="number" step="1" id="inp-age" value="${this.currentInput.patientAge || 40}">
              </div>
            </div>

            <!-- Section 2: Điện giải & Chuyển hóa -->
            <div class="abg-form-section-title">2. Điện Giải Đồ & Chuyển Hóa (Tính Anion Gap)</div>
            <div class="abg-input-grid">
              <div class="abg-field">
                <label for="inp-na">Na+ <span class="abg-normal-hint">135 - 145 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-na" value="${this.currentInput.na || 140}">
              </div>
              <div class="abg-field">
                <label for="inp-k">K+ <span class="abg-normal-hint">3.5 - 5.0 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-k" value="${this.currentInput.k || 4.0}">
              </div>
              <div class="abg-field">
                <label for="inp-cl">Cl- <span class="abg-normal-hint">98 - 106 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-cl" value="${this.currentInput.cl || 102}">
              </div>
              <div class="abg-field">
                <label for="inp-alb">Albumin máu <span class="abg-normal-hint">35 - 50 g/L</span></label>
                <input type="number" step="0.1" id="inp-alb" value="${this.currentInput.albumin || 40}">
              </div>
              <div class="abg-field">
                <label for="inp-lac">Lactate máu <span class="abg-normal-hint">< 2.0 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-lac" value="${this.currentInput.lactate || 1.0}">
              </div>
              <div class="abg-field">
                <label for="inp-glu">Glucose máu <span class="abg-normal-hint">3.9 - 6.4 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-glu" value="${this.currentInput.glucose || 5.5}">
              </div>
            </div>
          </form>
        </section>

        <!-- Evaluation Results Column -->
        <section class="abg-results-wrap">
          <!-- Primary Diagnosis Banner -->
          <div class="abg-diagnosis-banner">
            <div class="abg-diagnosis-badge-row">
              <span class="abg-badge ${result.acidBase.category === 'normal' ? 'abg-badge--success' : 'abg-badge--danger'}">
                <i class="fa-solid fa-heart-pulse"></i> ${result.acidBase.title}
              </span>
              <span class="abg-badge ${result.gasExchange.isHypoxaemia ? 'abg-badge--danger' : 'abg-badge--success'}">
                <i class="fa-solid fa-wind"></i> ${result.gasExchange.title}
              </span>
              <span class="abg-badge abg-badge--primary">
                ${result.calculations.pfClass}
              </span>
            </div>
            <h2 class="abg-diag-main-title">${result.acidBase.description}</h2>
            <p class="abg-diag-desc">${result.gasExchange.description}</p>
          </div>

          <!-- Critical Alerts if any -->
          ${result.criticalWarnings.length > 0 ? `
            <div class="abg-alerts-card">
              <div class="abg-alerts-title">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>Cảnh Báo Lâm Sàng Nguy Kịch (${result.criticalWarnings.length})</span>
              </div>
              ${result.criticalWarnings.map(w => `
                <div class="abg-alert-item">${w}</div>
              `).join('')}
            </div>
          ` : ''}

          <!-- Key Metrics Bento Grid -->
          <div class="abg-metrics-grid">
            <div class="abg-metric-card">
              <span class="abg-metric-label">Toan/Kiềm & [H+]</span>
              <span class="abg-metric-val">${result.calculations.hIonNmol} <span style="font-size: 0.8rem; font-weight: normal;">nmol/L</span></span>
              <span class="abg-metric-sub">pH ${this.currentInput.pH} (Chuẩn: 35-45 nmol/L)</span>
            </div>

            <div class="abg-metric-card">
              <span class="abg-metric-label">Tỷ số PaO2/FiO2 (P/F)</span>
              <span class="abg-metric-val" style="color: ${result.calculations.pfRatio < 300 ? '#ef4444' : '#10b981'};">
                ${result.calculations.pfRatio}
              </span>
              <span class="abg-metric-sub">${result.calculations.pfClass}</span>
            </div>

            <div class="abg-metric-card">
              <span class="abg-metric-label">Anion Gap & Hiệu Chỉnh</span>
              <span class="abg-metric-val" style="color: ${result.calculations.isAnionGapHigh ? '#ef4444' : 'var(--abg-ink)'};">
                ${result.calculations.anionGap !== undefined ? result.calculations.anionGap.toFixed(1) : '--'}
                <span style="font-size: 0.8rem; font-weight: normal;">mmol/L</span>
              </span>
              <span class="abg-metric-sub">
                ${result.calculations.correctedAnionGap ? `AG hiệu chỉnh Albumin: <b>${result.calculations.correctedAnionGap.toFixed(1)}</b>` : 'Chuẩn: 8-16 mmol/L'}
              </span>
            </div>

            <div class="abg-metric-card">
              <span class="abg-metric-label">A-a Gradient & Delta-Delta</span>
              <span class="abg-metric-val">${result.calculations.aaGradient.toFixed(1)} <span style="font-size: 0.8rem; font-weight: normal;">mmHg</span></span>
              <span class="abg-metric-sub">
                ${result.calculations.deltaRatioInterpretation ? `Delta: ${result.calculations.deltaRatio?.toFixed(2)} (${result.calculations.deltaRatioInterpretation})` : `Kỳ vọng tuổi: < ${result.calculations.expectedAaGradient.toFixed(1)} mmHg`}
              </span>
            </div>
          </div>

          <!-- 6-Step Structured Clinical Interpretation -->
          <div class="abg-six-steps-card">
            <div class="abg-card-title" style="margin-bottom: 1rem;">
              <span><i class="fa-solid fa-list-check text-blue-600"></i> Quy Trình 6 Bước Đọc Khí Máu Động Mạch</span>
              <span style="font-size: 0.75rem; color: var(--abg-muted);">Hennessey & Japp / Pierre & Ranson</span>
            </div>

            <div class="abg-step-timeline">
              ${result.sixSteps.map(s => `
                <div class="abg-step-item">
                  <div class="abg-step-num">${s.stepNumber}</div>
                  <div class="abg-step-body">
                    <div class="abg-step-name">${s.title}</div>
                    <div class="abg-step-finding">${s.finding}</div>
                    <div class="abg-step-detail">${s.detail}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Treatment Protocols Card -->
          <div class="abg-six-steps-card" style="border-left: 4px solid #10b981;">
            <div class="abg-card-title" style="margin-bottom: 0.75rem;">
              <span><i class="fa-solid fa-notes-medical text-emerald-600"></i> Hướng Dẫn Điều Trị & Thông Khí Đề Xuất</span>
              <span class="abg-badge abg-badge--success">Bedside Decision</span>
            </div>
            <p style="font-size: 0.88rem; font-weight: 600; color: var(--abg-ink); margin: 0 0 0.5rem;">
              ${result.treatmentProtocols.summary}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">
              <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--abg-primary); text-transform: uppercase;">Liệu Pháp Oxy:</div>
                <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.oxygenTherapy}</div>
              </div>
              <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
                <div style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">Hỗ Trợ Thông Khí:</div>
                <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.ventilationSupport}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  private renderCasesView(): string {
    const selectedCase = this.selectedCaseId ? CLINICAL_CASES.find(c => c.id === this.selectedCaseId) : CLINICAL_CASES[0];

    return `
      <div class="abg-main-grid" style="grid-template-columns: 380px 1fr;">
        <!-- Cases List -->
        <div class="abg-input-card" style="max-height: 800px; overflow-y: auto;">
          <div class="abg-card-title">
            <span><i class="fa-solid fa-folder-open text-blue-600"></i> Danh Mục Ca Bệnh</span>
            <span class="abg-badge abg-badge--primary">${CLINICAL_CASES.length} ca</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${CLINICAL_CASES.map(c => `
              <div class="abg-case-item-card ${selectedCase?.id === c.id ? 'active' : ''}" data-case-id="${c.id}" style="
                padding: 0.75rem 1rem;
                border-radius: 8px;
                border: 1px solid ${selectedCase?.id === c.id ? 'var(--abg-primary)' : 'var(--abg-line)'};
                background: ${selectedCase?.id === c.id ? 'var(--abg-primary-bg)' : 'var(--abg-panel)'};
                cursor: pointer;
                transition: all 0.15s ease;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; font-size: 0.82rem; color: var(--abg-primary);">Ca #${c.id}: ${c.caseNumberDisplay}</span>
                  <span class="abg-badge abg-badge--danger" style="font-size: 0.68rem;">${c.difficulty}</span>
                </div>
                <div style="font-weight: 600; font-size: 0.86rem; color: var(--abg-ink); margin-bottom: 0.2rem;">${c.title}</div>
                <div style="font-size: 0.74rem; color: var(--abg-muted);">${c.patientProfile}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Case Detail -->
        ${selectedCase ? `
          <div class="abg-results-wrap">
            <div class="abg-input-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <div style="display: flex; gap: 0.4rem; margin-bottom: 0.4rem;">
                    <span class="abg-badge abg-badge--primary">${selectedCase.categoryTag}</span>
                    <span class="abg-badge abg-badge--warning">${selectedCase.difficulty}</span>
                  </div>
                  <h2 style="font-family: var(--abg-font-display); font-size: 1.4rem; margin: 0; color: var(--abg-ink);">
                    ${selectedCase.title}
                  </h2>
                  <p style="font-size: 0.85rem; color: var(--abg-muted); margin: 0.25rem 0 0;">
                    Nguồn: ${selectedCase.source} · Bệnh nhân: ${selectedCase.patientProfile}
                  </p>
                </div>

                <button id="btn-load-case-to-calc" class="abg-btn abg-btn--primary" data-load-case="${selectedCase.id}">
                  <i class="fa-solid fa-calculator"></i> Nạp Vào Máy Tính ABG
                </button>
              </div>

              <!-- History & Vitals -->
              <div style="background: var(--abg-bg); padding: 1rem; border-radius: 8px; border: 1px solid var(--abg-line); margin-bottom: 1.25rem;">
                <h4 style="margin: 0 0 0.5rem; font-size: 0.86rem; font-weight: 700; color: var(--abg-ink);">Bệnh Sử & Lâm Sàng:</h4>
                <p style="font-size: 0.85rem; color: var(--abg-ink2); margin: 0 0 0.75rem; line-height: 1.5;">${selectedCase.history}</p>
                
                <h4 style="margin: 0 0 0.35rem; font-size: 0.84rem; font-weight: 700; color: var(--abg-ink);">Khám Lâm Sàng:</h4>
                <p style="font-size: 0.84rem; color: var(--abg-ink2); margin: 0 0 0.5rem;">${selectedCase.examination.findings}</p>
                
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.78rem; font-family: var(--abg-font-mono); color: var(--abg-muted); padding-top: 0.5rem; border-top: 1px dashed var(--abg-line);">
                  ${selectedCase.examination.vitals.pulse ? `<span>Mạch: <b>${selectedCase.examination.vitals.pulse}</b></span>` : ''}
                  ${selectedCase.examination.vitals.bp ? `<span>HA: <b>${selectedCase.examination.vitals.bp}</b></span>` : ''}
                  ${selectedCase.examination.vitals.rr ? `<span>Nhịp thở: <b>${selectedCase.examination.vitals.rr}</b></span>` : ''}
                  ${selectedCase.examination.vitals.spo2 ? `<span>SpO2: <b>${selectedCase.examination.vitals.spo2}</b></span>` : ''}
                  ${selectedCase.examination.vitals.fio2 ? `<span>FiO2: <b>${selectedCase.examination.vitals.fio2}</b></span>` : ''}
                </div>
              </div>

              <!-- ABG Values Strip -->
              <div style="background: var(--abg-primary-bg); border: 1px solid var(--abg-primary-border); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--abg-primary); text-transform: uppercase; margin-bottom: 0.5rem;">
                  Kết Quả Khí Máu Động Mạch:
                </div>
                <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; font-family: var(--abg-font-mono); font-size: 0.95rem;">
                  <span>pH: <b>${selectedCase.abg.pH}</b></span>
                  <span>PaCO2: <b>${selectedCase.abg.pCO2}</b> mmHg</span>
                  <span>PaO2: <b>${selectedCase.abg.pO2}</b> mmHg</span>
                  <span>HCO3-: <b>${selectedCase.abg.hco3}</b> mmol/L</span>
                  <span>BE: <b>${selectedCase.abg.be}</b></span>
                  ${selectedCase.abg.na ? `<span>Na: <b>${selectedCase.abg.na}</b></span>` : ''}
                  ${selectedCase.abg.cl ? `<span>Cl: <b>${selectedCase.abg.cl}</b></span>` : ''}
                  ${selectedCase.abg.lactate ? `<span>Lactate: <b>${selectedCase.abg.lactate}</b></span>` : ''}
                </div>
              </div>

              <!-- Structured Answers / Insights -->
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="border-left: 3px solid #ef4444; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #ef4444;">1. Đánh giá trao đổi khí (Gas Exchange):</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.gasExchange}</div>
                </div>
                <div style="border-left: 3px solid #f59e0b; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #d97706;">2. Rối loạn toan kiềm & Bù trừ (Acid-Base Status):</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.acidBase}</div>
                </div>
                <div style="border-left: 3px solid #3b82f6; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #2563eb;">3. Chẩn đoán phân biệt & Bệnh cảnh:</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.differentialDiagnosis}</div>
                </div>
                <div style="border-left: 3px solid #10b981; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #059669;">4. Xử trí lâm sàng & Biện pháp cấp cứu:</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.clinicalAction}</div>
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private renderProtocolsView(): string {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 1.5rem;">
        ${TREATMENT_PROTOCOLS.map((proto: TreatmentProtocol) => `
          <div class="abg-input-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div>
                <span class="abg-badge abg-badge--danger" style="margin-bottom: 0.4rem;">${proto.severityBadge}</span>
                <h3 style="font-family: var(--abg-font-display); font-size: 1.15rem; color: var(--abg-ink); margin: 0 0 0.25rem;">
                  ${proto.title}
                </h3>
                <p style="font-size: 0.8rem; color: var(--abg-muted); margin: 0;">${proto.subtitle}</p>
              </div>
            </div>

            <!-- Steps -->
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.65rem;">
              ${proto.steps.map((step: { title: string; action: string; notes?: string }, idx: number) => `
                <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line-subtle);">
                  <div style="font-weight: 700; font-size: 0.82rem; color: var(--abg-primary); margin-bottom: 0.2rem;">
                    Bước ${idx + 1}: ${step.title}
                  </div>
                  <div style="font-size: 0.82rem; color: var(--abg-ink);">${step.action}</div>
                  ${step.notes ? `<div style="font-size: 0.75rem; color: var(--abg-muted); margin-top: 0.2rem; font-style: italic;">* ${step.notes}</div>` : ''}
                </div>
              `).join('')}
            </div>

            <!-- Cautions -->
            ${proto.cautions && proto.cautions.length > 0 ? `
              <div style="margin-top: 1rem; padding: 0.75rem; background: var(--abg-amber-bg); border: 1px solid var(--abg-amber-border); border-radius: 8px;">
                <div style="font-size: 0.78rem; font-weight: 700; color: #b45309; margin-bottom: 0.25rem;">Lưu ý cấm kỵ:</div>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.78rem; color: #92400e;">
                  ${proto.cautions.map((c: string) => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderGlossaryView(): string {
    const filtered = this.glossaryFilter 
      ? ABG_GLOSSARY.filter(g => g.term.toLowerCase().includes(this.glossaryFilter.toLowerCase()) || g.definition.toLowerCase().includes(this.glossaryFilter.toLowerCase()))
      : ABG_GLOSSARY;

    return `
      <div class="abg-input-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-family: var(--abg-font-display); font-size: 1.25rem; margin: 0; color: var(--abg-ink);">
              Tra Cứu Bách Khoa Toàn Thư Khí Máu Động Mạch
            </h2>
            <p style="font-size: 0.82rem; color: var(--abg-muted); margin: 0.2rem 0 0;">
              Chỉ số tham chiếu, định nghĩa sinh lý bệnh học và nguyên nhân tăng/giảm thường gặp.
            </p>
          </div>

          <div style="position: relative; width: 300px;">
            <input type="text" id="inp-glossary-search" placeholder="Tìm thuật ngữ (ví dụ: Anion Gap, Winter...)" value="${this.glossaryFilter}" style="
              width: 100%;
              padding: 0.5rem 0.85rem;
              border-radius: 8px;
              border: 1px solid var(--abg-line);
              background: var(--abg-bg);
              color: var(--abg-ink);
              font-size: 0.85rem;
            ">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1rem;">
          ${filtered.map(item => `
            <div style="background: var(--abg-bg); border: 1px solid var(--abg-line); border-radius: 10px; padding: 1.1rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="font-family: var(--abg-font-display); font-size: 1.05rem; font-weight: 700; color: var(--abg-primary); margin: 0;">
                  ${item.term} ${item.symbol ? `<span style="font-size: 0.85rem; color: var(--abg-muted);">(${item.symbol})</span>` : ''}
                </h4>
                <span class="abg-badge abg-badge--primary" style="font-family: var(--abg-font-mono); font-size: 0.72rem;">
                  ${item.normalRange} ${item.unit}
                </span>
              </div>
              <p style="font-size: 0.82rem; color: var(--abg-ink); margin: 0 0 0.6rem; line-height: 1.5;">${item.definition}</p>
              <div style="font-size: 0.78rem; color: var(--abg-muted); border-top: 1px dashed var(--abg-line); padding-top: 0.5rem;">
                <b>Ý nghĩa:</b> ${item.clinicalSignificance}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    // Tab switching
    this.container.querySelectorAll('.abg-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).dataset.tab as any;
        if (tab && tab !== this.currentTab) {
          this.currentTab = tab;
          this.render();
          this.attachEventListeners();
        }
      });
    });

    // Preset clicks
    this.container.querySelectorAll('.abg-preset-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const idx = parseInt((e.currentTarget as HTMLElement).dataset.presetIdx || '0', 10);
        this.currentInput = { ...ABG_PRESETS[idx].input };
        this.render();
        this.attachEventListeners();
      });
    });

    // Reset button
    const resetBtn = this.container.querySelector('#btn-reset-normal');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.currentInput = { ...ABG_PRESETS[0].input };
        this.render();
        this.attachEventListeners();
      });
    }

    // Input form changes
    const inputs = ['ph', 'pco2', 'po2', 'hco3', 'be', 'sao2', 'fio2', 'age', 'na', 'k', 'cl', 'alb', 'lac', 'glu'];
    inputs.forEach(key => {
      const el = this.container.querySelector(`#inp-${key}`) as HTMLInputElement;
      if (el) {
        el.addEventListener('input', () => {
          this.readFormInputs();
          // Re-render results only
          const result = analyzeABG(this.currentInput);
          const resultsCol = this.container.querySelector('.abg-results-wrap');
          if (resultsCol) {
            resultsCol.outerHTML = this.renderAnalyzerResultsOnly(result);
          }
        });
      }
    });

    // Load case to calc
    const loadCaseBtn = this.container.querySelector('#btn-load-case-to-calc');
    if (loadCaseBtn) {
      loadCaseBtn.addEventListener('click', (e) => {
        const caseId = parseInt((e.currentTarget as HTMLElement).dataset.loadCase || '1', 10);
        const c = CLINICAL_CASES.find(x => x.id === caseId);
        if (c) {
          this.currentInput = { ...c.abg };
          this.currentTab = 'analyzer';
          this.render();
          this.attachEventListeners();
          this.showToast(`Đã nạp thông số Ca #${caseId} vào máy tính!`);
        }
      });
    }

    // Case selection
    this.container.querySelectorAll('.abg-case-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = parseInt((e.currentTarget as HTMLElement).dataset.caseId || '1', 10);
        this.selectedCaseId = id;
        this.render();
        this.attachEventListeners();
      });
    });

    // Glossary search
    const glossaryInp = this.container.querySelector('#inp-glossary-search') as HTMLInputElement;
    if (glossaryInp) {
      glossaryInp.addEventListener('input', (e) => {
        this.glossaryFilter = (e.target as HTMLInputElement).value;
        const glossaryTabContent = this.container.querySelector('.abg-input-card');
        if (glossaryTabContent) {
          this.render();
          this.attachEventListeners();
          const newInp = this.container.querySelector('#inp-glossary-search') as HTMLInputElement;
          if (newInp) {
            newInp.focus();
            newInp.setSelectionRange(newInp.value.length, newInp.value.length);
          }
        }
      });
    }

    // Export to SOAP Button
    const soapBtn = this.container.querySelector('#btn-export-soap');
    if (soapBtn) {
      soapBtn.addEventListener('click', () => {
        this.exportToSoap();
      });
    }
  }

  private readFormInputs(): void {
    const getVal = (id: string, def: number): number => {
      const el = this.container.querySelector(`#inp-${id}`) as HTMLInputElement;
      if (!el) return def;
      const v = parseFloat(el.value);
      return isNaN(v) ? def : v;
    };

    this.currentInput = {
      unit: 'mmHg',
      pH: getVal('ph', 7.4),
      pCO2: getVal('pco2', 40),
      pO2: getVal('po2', 95),
      hco3: getVal('hco3', 24),
      be: getVal('be', 0),
      sao2: getVal('sao2', 98),
      fio2: getVal('fio2', 21),
      patientAge: getVal('age', 40),
      na: getVal('na', 140),
      k: getVal('k', 4.0),
      cl: getVal('cl', 102),
      albumin: getVal('alb', 40),
      lactate: getVal('lac', 1.0),
      glucose: getVal('glu', 5.5)
    };
  }

  private renderAnalyzerResultsOnly(result: ABGAnalysisResult): string {
    return `
      <section class="abg-results-wrap">
        <!-- Primary Diagnosis Banner -->
        <div class="abg-diagnosis-banner">
          <div class="abg-diagnosis-badge-row">
            <span class="abg-badge ${result.acidBase.category === 'normal' ? 'abg-badge--success' : 'abg-badge--danger'}">
              <i class="fa-solid fa-heart-pulse"></i> ${result.acidBase.title}
            </span>
            <span class="abg-badge ${result.gasExchange.isHypoxaemia ? 'abg-badge--danger' : 'abg-badge--success'}">
              <i class="fa-solid fa-wind"></i> ${result.gasExchange.title}
            </span>
            <span class="abg-badge abg-badge--primary">
              ${result.calculations.pfClass}
            </span>
          </div>
          <h2 class="abg-diag-main-title">${result.acidBase.description}</h2>
          <p class="abg-diag-desc">${result.gasExchange.description}</p>
        </div>

        <!-- Critical Alerts if any -->
        ${result.criticalWarnings.length > 0 ? `
          <div class="abg-alerts-card">
            <div class="abg-alerts-title">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>Cảnh Báo Lâm Sàng Nguy Kịch (${result.criticalWarnings.length})</span>
            </div>
            ${result.criticalWarnings.map(w => `
              <div class="abg-alert-item">${w}</div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Key Metrics Bento Grid -->
        <div class="abg-metrics-grid">
          <div class="abg-metric-card">
            <span class="abg-metric-label">Toan/Kiềm & [H+]</span>
            <span class="abg-metric-val">${result.calculations.hIonNmol} <span style="font-size: 0.8rem; font-weight: normal;">nmol/L</span></span>
            <span class="abg-metric-sub">pH ${this.currentInput.pH} (Chuẩn: 35-45 nmol/L)</span>
          </div>

          <div class="abg-metric-card">
            <span class="abg-metric-label">Tỷ số PaO2/FiO2 (P/F)</span>
            <span class="abg-metric-val" style="color: ${result.calculations.pfRatio < 300 ? '#ef4444' : '#10b981'};">
              ${result.calculations.pfRatio}
            </span>
            <span class="abg-metric-sub">${result.calculations.pfClass}</span>
          </div>

          <div class="abg-metric-card">
            <span class="abg-metric-label">Anion Gap & Hiệu Chỉnh</span>
            <span class="abg-metric-val" style="color: ${result.calculations.isAnionGapHigh ? '#ef4444' : 'var(--abg-ink)'};">
              ${result.calculations.anionGap !== undefined ? result.calculations.anionGap.toFixed(1) : '--'}
              <span style="font-size: 0.8rem; font-weight: normal;">mmol/L</span>
            </span>
            <span class="abg-metric-sub">
              ${result.calculations.correctedAnionGap ? `AG hiệu chỉnh Albumin: <b>${result.calculations.correctedAnionGap.toFixed(1)}</b>` : 'Chuẩn: 8-16 mmol/L'}
            </span>
          </div>

          <div class="abg-metric-card">
            <span class="abg-metric-label">A-a Gradient & Delta-Delta</span>
            <span class="abg-metric-val">${result.calculations.aaGradient.toFixed(1)} <span style="font-size: 0.8rem; font-weight: normal;">mmHg</span></span>
            <span class="abg-metric-sub">
              ${result.calculations.deltaRatioInterpretation ? `Delta: ${result.calculations.deltaRatio?.toFixed(2)} (${result.calculations.deltaRatioInterpretation})` : `Kỳ vọng: < ${result.calculations.expectedAaGradient.toFixed(1)} mmHg`}
            </span>
          </div>
        </div>

        <!-- 6-Step Structured Clinical Interpretation -->
        <div class="abg-six-steps-card">
          <div class="abg-card-title" style="margin-bottom: 1rem;">
            <span><i class="fa-solid fa-list-check text-blue-600"></i> Quy Trình 6 Bước Đọc Khí Máu Động Mạch</span>
            <span style="font-size: 0.75rem; color: var(--abg-muted);">Hennessey & Japp / Pierre & Ranson</span>
          </div>

          <div class="abg-step-timeline">
            ${result.sixSteps.map(s => `
              <div class="abg-step-item">
                <div class="abg-step-num">${s.stepNumber}</div>
                <div class="abg-step-body">
                  <div class="abg-step-name">${s.title}</div>
                  <div class="abg-step-finding">${s.finding}</div>
                  <div class="abg-step-detail">${s.detail}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Treatment Protocols Card -->
        <div class="abg-six-steps-card" style="border-left: 4px solid #10b981;">
          <div class="abg-card-title" style="margin-bottom: 0.75rem;">
            <span><i class="fa-solid fa-notes-medical text-emerald-600"></i> Hướng Dẫn Điều Trị & Thông Khí Đề Xuất</span>
            <span class="abg-badge abg-badge--success">Bedside Decision</span>
          </div>
          <p style="font-size: 0.88rem; font-weight: 600; color: var(--abg-ink); margin: 0 0 0.5rem;">
            ${result.treatmentProtocols.summary}
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">
            <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--abg-primary); text-transform: uppercase;">Liệu Pháp Oxy:</div>
              <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.oxygenTherapy}</div>
            </div>
            <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
              <div style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">Hỗ Trợ Thông Khí:</div>
              <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.ventilationSupport}</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private exportToSoap(): void {
    const res = analyzeABG(this.currentInput);
    const agStr = res.calculations.anionGap !== undefined ? res.calculations.anionGap.toFixed(1) : 'N/A';
    const corAgStr = res.calculations.correctedAnionGap ? ` (Hiệu chỉnh Albumin: ${res.calculations.correctedAnionGap.toFixed(1)})` : '';
    
    const soapText = `[O - CẬN LÂM SÀNG] Khí máu động mạch (FiO2 ${this.currentInput.fio2}%):
- pH: ${this.currentInput.pH} | PaCO2: ${this.currentInput.pCO2} mmHg | PaO2: ${this.currentInput.pO2} mmHg
- HCO3-: ${this.currentInput.hco3} mmol/L | BE: ${this.currentInput.be} | SaO2: ${this.currentInput.sao2}%
- Điện giải: Na ${this.currentInput.na || '--'}, K ${this.currentInput.k || '--'}, Cl ${this.currentInput.cl || '--'} | Albumin: ${this.currentInput.albumin || '--'} g/L | Lactate: ${this.currentInput.lactate || '--'} mmol/L
- Chỉ số tính toán: Anion Gap = ${agStr} mmol/L${corAgStr} | PaO2/FiO2 = ${res.calculations.pfRatio} (${res.calculations.pfClass}) | A-a gradient = ${res.calculations.aaGradient.toFixed(1)} mmHg

[A - ĐÁNH GIÁ LÂM SÀNG]
- Toan kiềm: ${res.acidBase.description} (${res.acidBase.compensation})
- Trao đổi khí: ${res.gasExchange.description}
${res.criticalWarnings.length > 0 ? `- Cảnh báo nguy kịch: ${res.criticalWarnings.join('; ')}` : ''}

[P - HƯỚNG XỬ TRÍ]
- Thông khí & Oxy: ${res.treatmentProtocols.oxygenTherapy}; ${res.treatmentProtocols.ventilationSupport}
- Điều trị nguyên nhân: ${res.treatmentProtocols.summary}
- Theo dõi: ${res.treatmentProtocols.monitoringAdvice}`;

    navigator.clipboard.writeText(soapText).then(() => {
      this.showToast('Đã sao chép cấu trúc bệnh án SOAP vào khay nhớ tạm!');
    }).catch(() => {
      this.showToast('Sao chép thất bại! Vui lòng cấp quyền clipboard.');
    });
  }

  private showToast(msg: string): void {
    const toast = document.getElementById('abg-toast');
    const toastMsg = document.getElementById('abg-toast-msg');
    if (toast && toastMsg) {
      toastMsg.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
}
