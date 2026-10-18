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
  private currentTab: 'analyzer' | 'cases' | 'protocols' | 'glossary' | 'nomogram' | 'procedures' = 'analyzer';
  private nomogramPco2: number = 40;
  private nomogramPh: number = 7.40;
  private activeTree: 'gas-exchange' | 'acid-base' | 'anion-gap' = 'gas-exchange';
  private activeProcedureSub: 'puncture' | 'allen' | 'vbg' | 'physiology' = 'puncture';
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
          <button class="abg-tab-btn ${this.currentTab === 'nomogram' ? 'active' : ''}" data-tab="nomogram">
            <i class="fa-solid fa-diagram-project"></i> 5. Nomogram & Cây Quyết Định
          </button>
          <button class="abg-tab-btn ${this.currentTab === 'procedures' ? 'active' : ''}" data-tab="procedures">
            <i class="fa-solid fa-syringe"></i> 6. Cẩm Nang & Kỹ Thuật Lấy Máu
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
      case 'nomogram':
        return this.renderNomogramAndTreesView();
      case 'procedures':
        return this.renderProceduresAndPhysiologyView();
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

  
  private renderNomogramAndTreesView(): string {
    const currentH = Math.round(Math.pow(10, 9 - this.nomogramPh));
    const approxHco3 = Math.round((24 * this.nomogramPco2) / Math.max(10, currentH));

    let zoneName = 'Vùng Bình Thường (Normal Buffer Line)';
    let zoneClass = 'abg-badge--success';
    if (this.nomogramPh < 7.35 && this.nomogramPco2 > 45) {
      zoneName = 'Toan Hô Hấp (Cấp tính hoặc Mạn tính bù trừ)';
      zoneClass = 'abg-badge--danger';
    } else if (this.nomogramPh < 7.35 && this.nomogramPco2 <= 45) {
      zoneName = 'Toan Chuyển Hóa (Metabolic Acidosis)';
      zoneClass = 'abg-badge--danger';
    } else if (this.nomogramPh > 7.45 && this.nomogramPco2 < 35) {
      zoneName = 'Kiềm Hô Hấp (Respiratory Alkalosis)';
      zoneClass = 'abg-badge--primary';
    } else if (this.nomogramPh > 7.45 && this.nomogramPco2 >= 35) {
      zoneName = 'Kiềm Chuyển Hóa (Metabolic Alkalosis)';
      zoneClass = 'abg-badge--primary';
    } else if (this.nomogramPh >= 7.35 && this.nomogramPh <= 7.45 && (this.nomogramPco2 < 35 || this.nomogramPco2 > 45)) {
      zoneName = 'Rối loạn Toan - Kiềm Hỗn Hợp đã bù trừ hoàn toàn';
      zoneClass = 'abg-badge--warning';
    }

    return `
      <div class="abg-knowledge-container">
        <!-- Sub navigation pills -->
        <div class="abg-knowledge-subnav">
          <button class="abg-subnav-pill ${this.activeTree === 'gas-exchange' ? 'active' : ''}" data-tree="gas-exchange">
            <i class="fa-solid fa-wind"></i> 1. Cây Trao Đổi Khí (Hình 22)
          </button>
          <button class="abg-subnav-pill ${this.activeTree === 'acid-base' ? 'active' : ''}" data-tree="acid-base">
            <i class="fa-solid fa-scale-balanced"></i> 2. Cây Thăng Bằng Toan Kiềm (Hình 23)
          </button>
          <button class="abg-subnav-pill ${this.activeTree === 'anion-gap' ? 'active' : ''}" data-tree="anion-gap">
            <i class="fa-solid fa-triangle-exclamation"></i> 3. Cây Phân Nhánh Anion Gap (GOLDMARK)
          </button>
        </div>

        <!-- Interactive Nomogram Card -->
        <section class="abg-nomogram-card">
          <div class="abg-nomogram-header">
            <div>
              <span class="abg-badge abg-badge--primary"><i class="fa-solid fa-chart-line"></i> Nomogram Thăng Bằng Toan Kiềm Tương Tác</span>
              <h3>Biểu Đồ Siggaard-Andersen & Davenport (Hình 16)</h3>
              <p class="abg-card-desc">Kéo con trượt để định vị tọa độ PaCO2 và pH máu, tự động tính nồng độ [H+] nmol/L và HCO3- xấp xỉ theo phương trình Henderson-Hasselbalch.</p>
            </div>
            <button id="btn-nomogram-to-analyzer" class="abg-btn abg-btn--primary">
              <i class="fa-solid fa-calculator"></i> Nạp Sang Máy Tính 6 Bước
            </button>
          </div>

          <div class="abg-nomogram-grid">
            <div class="abg-nomogram-sliders">
              <div class="abg-slider-group">
                <div class="abg-slider-label">
                  <span>Phân áp PaCO2:</span>
                  <strong id="nomo-val-pco2">${this.nomogramPco2} mmHg</strong>
                </div>
                <input type="range" id="nomo-range-pco2" min="15" max="100" step="1" value="${this.nomogramPco2}">
                <div class="abg-slider-ticks"><span>15 (Giảm sâu)</span><span>40 (Chuẩn)</span><span>100 (Ứ trệ nặng)</span></div>
              </div>

              <div class="abg-slider-group">
                <div class="abg-slider-label">
                  <span>Độ pH Máu:</span>
                  <strong id="nomo-val-ph">${this.nomogramPh.toFixed(2)}</strong>
                </div>
                <input type="range" id="nomo-range-ph" min="6.90" max="7.75" step="0.01" value="${this.nomogramPh}">
                <div class="abg-slider-ticks"><span>6.90 (Toan nặng)</span><span>7.40 (Chuẩn)</span><span>7.75 (Kiềm nặng)</span></div>
              </div>
            </div>

            <div class="abg-nomogram-readout">
              <div class="abg-readout-item">
                <span>Nồng độ [H+]:</span>
                <strong id="nomo-readout-h">${currentH} nmol/L</strong>
                <small class="text-muted">Bình thường: 35 - 45 nmol/L</small>
              </div>
              <div class="abg-readout-item">
                <span>HCO3- ước tính:</span>
                <strong id="nomo-readout-hco3">${approxHco3} mmol/L</strong>
                <small class="text-muted">24 × PaCO2 / [H+]</small>
              </div>
              <div class="abg-readout-item" style="grid-column: 1 / -1;">
                <span>Phân vùng chẩn đoán:</span>
                <div id="nomo-zone-badge" class="abg-badge ${zoneClass}" style="margin-top: 0.35rem; display: inline-flex; font-size: 0.88rem; padding: 0.4rem 0.8rem;">
                  ${zoneName}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Decision Tree Display -->
        <section class="abg-tree-card">
          ${this.renderActiveDecisionTree()}
        </section>
      </div>
    `;
  }

  private renderActiveDecisionTree(): string {
    if (this.activeTree === 'gas-exchange') {
      return `
        <div class="abg-tree-wrap">
          <div class="abg-tree-header">
            <h4><i class="fa-solid fa-wind text-blue-500"></i> Sơ Đồ Đánh Giá Trao Đổi Khí Phổi (Arterial Blood Gases Made Easy - Figure 22)</h4>
            <p>Phân loại suy hô hấp dựa trên phân áp PaO2 khí trời và đáp ứng đào thải CO2 của phế nang.</p>
          </div>

          <div class="abg-tree-flow">
            <div class="abg-tree-node abg-tree-node--root">
              <strong>BƯỚC 1: Phân áp Oxy máu PaO2 (Khí trời)</strong>
              <div class="abg-tree-branches">
                <div class="abg-tree-branch">
                  <span class="abg-branch-cond">PaO2 ≥ 80 mmHg</span>
                  <div class="abg-tree-leaf abg-tree-leaf--ok">
                    <strong>Trao đổi khí oxy bình thường</strong>
                    <p>Không có suy hô hấp giảm oxy máu. Kiểm tra tiếp PaCO2 để đánh giá thông khí phế nang.</p>
                  </div>
                </div>
                <div class="abg-tree-branch">
                  <span class="abg-branch-cond">PaO2 < 60 mmHg (hoặc SaO2 < 90%)</span>
                  <div class="abg-tree-leaf abg-tree-leaf--alert">
                    <strong>SUY HÔ HẤP CẤP (Respiratory Failure)</strong>
                    <p>Khảo sát tiếp phân áp PaCO2:</p>
                    <div class="abg-tree-subbranches">
                      <div class="abg-tree-subleaf">
                        <strong>• PaCO2 ≤ 45 mmHg (Bình thường hoặc Giảm):</strong>
                        <p><strong>Suy Hô Hấp Type 1 (Giảm Oxy Máu - Hypoxemic):</strong> Bất tương xứng Thông khí/Tưới máu (V/Q mismatch), Shunt phổi (Viêm phổi đông đặc, ARDS, Phù phổi cấp, Thuyên tắc phổi). Thường đáp ứng tốt với liệu pháp oxy.</p>
                      </div>
                      <div class="abg-tree-subleaf">
                        <strong>• PaCO2 > 45 mmHg (Tăng CO2 máu):</strong>
                        <p><strong>Suy Hô Hấp Type 2 (Tăng Thán Khí - Hypercapnic):</strong> Giảm thông khí phế nang toàn bộ (Kiệt cơ hô hấp trong Đợt cấp COPD, Cơn hen ác tính, Béo phì giảm thông khí Pickwickian, Ức chế trung tâm hô hấp do Morphin/Seduxen, Nhược cơ/GBS). Cần hỗ trợ thông khí (NIV BiPAP hoặc Đặt nội khí quản).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (this.activeTree === 'acid-base') {
      return `
        <div class="abg-tree-wrap">
          <div class="abg-tree-header">
            <h4><i class="fa-solid fa-scale-balanced text-primary"></i> Sơ Đồ Thuật Toán Rẽ Nhánh Thăng Bằng Toan Kiềm (Figure 23)</h4>
            <p>Hệ thống đánh giá thứ tự: pH máu → Nguồn gốc nguyên phát (Hô hấp vs Chuyển hóa) → Đánh giá bù trừ.</p>
          </div>

          <div class="abg-tree-flow">
            <div class="abg-tree-grid-2">
              <div class="abg-tree-card-sub">
                <div class="abg-sub-head text-danger"><i class="fa-solid fa-arrow-trend-down"></i> NHIỄM TOAN (Acidemia: pH < 7.35)</div>
                <ul class="abg-sub-list">
                  <li><strong>PaCO2 > 45 mmHg: Toan Hô Hấp</strong>
                    <br>• Cấp: HCO3- tăng 1 mmol/L cho mỗi 10 mmHg PaCO2 tăng.
                    <br>• Mạn: HCO3- tăng 3.5 - 4 mmol/L cho mỗi 10 mmHg PaCO2 tăng (Bù trừ thận cần 3-5 ngày).
                  </li>
                  <li><strong>HCO3- < 22 mmol/L: Toan Chuyển Hóa</strong>
                    <br>• Kiểm tra bù trừ hô hấp theo Công thức Winter: PaCO2 dự đoán = 1.5 × [HCO3-] + 8 ± 2.
                    <br>• Bắt buộc tính Khoảng trống Anion Gap (AG) hiệu chỉnh Albumin: AG = Na - (Cl + HCO3).
                  </li>
                </ul>
              </div>

              <div class="abg-tree-card-sub">
                <div class="abg-sub-head text-primary"><i class="fa-solid fa-arrow-trend-up"></i> NHIỄM KIỀM (Alkalemia: pH > 7.45)</div>
                <ul class="abg-sub-list">
                  <li><strong>PaCO2 < 35 mmHg: Kiềm Hô Hấp</strong>
                    <br>• Cấp (Tăng thông khí lo âu, đau, sốt, PE giai đoạn đầu): HCO3- giảm 2 mmol/L mỗi 10 mmHg PaCO2 giảm.
                    <br>• Mạn: HCO3- giảm 4 - 5 mmol/L mỗi 10 mmHg PaCO2 giảm.
                  </li>
                  <li><strong>HCO3- > 26 mmol/L: Kiềm Chuyển Hóa</strong>
                    <br>• Bù trừ hô hấp: PaCO2 dự đoán = 0.7 × [HCO3-] + 21 ± 2 (tối đa PaCO2 ~ 55-60 mmHg).
                    <br>• Định lượng Clo niệu: Đáp ứng muối Clo (Nôn ói, dùng lợi tiểu) vs Kháng muối Clo (Cường Aldosterone, Cushing).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="abg-tree-wrap">
          <div class="abg-tree-header">
            <h4><i class="fa-solid fa-triangle-exclamation text-amber-500"></i> Cây Phân Nhánh Toan Chuyển Hóa & Bảng Ký Tự Gợi Nhớ GOLDMARK</h4>
            <p>Anion Gap = [Na+] - ([Cl-] + [HCO3-]). Bình thường: 10 - 12 mmol/L (Hiệu chỉnh: + 2.5 cho mỗi 10 g/L Albumin giảm dưới 40 g/L).</p>
          </div>

          <div class="abg-tree-grid-2">
            <div class="abg-tree-card-sub">
              <div class="abg-sub-head text-danger"><i class="fa-solid fa-circle-exclamation"></i> Tăng Anion Gap (High AG > 12) — Nhớ "GOLDMARK":</div>
              <ul class="abg-goldmark-list">
                <li><span class="abg-gold-letter">G</span><strong>Glycols:</strong> Ethylene glycol, Propylene glycol (Ngộ độc dung dịch chống đông).</li>
                <li><span class="abg-gold-letter">O</span><strong>Oxoproline (5-oxoproline / Pyroglutamic acid):</strong> Lạm dụng Paracetamol kéo dài ở người suy kiệt, phụ nữ lớn tuổi.</li>
                <li><span class="abg-gold-letter">L</span><strong>L-Lactate:</strong> Toan Lactic Type A (Sốc, thiếu oxy mô, ngừng tim, thiếu máu cục bộ ruột) & Type B (Metformin, suy gan, co giật, ung thư).</li>
                <li><span class="abg-gold-letter">D</span><strong>D-Lactate:</strong> Hội chứng ruột ngắn (Short bowel syndrome) do vi khuẩn đường ruột lên men carbohydrate.</li>
                <li><span class="abg-gold-letter">M</span><strong>Methanol:</strong> Rượu lậu độc hại, chuyển hóa thành Acid Formic gây mù lòa và phù gai thị.</li>
                <li><span class="abg-gold-letter">A</span><strong>Aspirin (Salicylate):</strong> Gây toan chuyển hóa AG cao kèm kiềm hô hấp hỗn hợp sớm.</li>
                <li><span class="abg-gold-letter">R</span><strong>Renal Failure (Uremia):</strong> Suy thận cấp hoặc mạn giai đoạn nặng giảm bài tiết ion H+, Sulfat, Phosphat.</li>
                <li><span class="abg-gold-letter">K</span><strong>Ketoacidosis:</strong> Toan Ceton Đái tháo đường (DKA), toan ceton do nhịn đói (Starvation), toan ceton do rượu (AKA).</li>
              </ul>
            </div>

            <div class="abg-tree-card-sub">
              <div class="abg-sub-head text-primary"><i class="fa-solid fa-shield-halved"></i> Anion Gap Bình Thường (Normal AG / Tăng Clo Máu):</div>
              <p style="font-size: 0.82rem; color: var(--abg-muted); margin-bottom: 0.5rem;">Khi mất ion Bicarbonate (HCO3-), thận tái hấp thu Clo (Cl-) bù lại để giữ cân bằng điện tích:</p>
              <ul class="abg-sub-list">
                <li><strong>1. Mất HCO3- qua đường tiêu hóa (Mất kiềm ngoài thận):</strong>
                  <br>• Tiêu chảy cấp ồ ạt (Diarrhea) — Nguyên nhân hàng đầu.
                  <br>• Dò mật, dò tụy, dò ruột non (Mất dịch tiêu hóa giàu HCO3-).
                  <br>• Phẫu thuật nối niệu quản vào đại tràng Sigma.
                </li>
                <li><strong>2. Mất HCO3- qua thận (Toan hóa ống thận - RTA):</strong>
                  <br>• <em>RTA Type 1 (Ống xa):</em> Giảm bài tiết H+ tại ống lượn xa; pH nước tiểu luôn > 5.5, hạ Kali máu, sỏi calci thận.
                  <br>• <em>RTA Type 2 (Ống gần):</em> Giảm tái hấp thu HCO3- tại ống lượn gần (Hội chứng Fanconi); pH nước tiểu biến thiên.
                  <br>• <em>RTA Type 4 (Giảm Aldosterone):</em> Thiếu hụt hoặc kháng Aldosterone (Đái tháo đường biến chứng thận); KALI MÁU TĂNG CAO.
                </li>
                <li><strong>3. Do điều trị y khoa (Iatrogenic):</strong>
                  <br>• Truyền ồ ạt dung dịch NaCl 0.9% (Normal Saline gây toan tăng clo máu pha loãng).
                  <br>• Dùng thuốc ức chế Carbonic Anhydrase (Acetazolamide).
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }
  }

  private renderProceduresAndPhysiologyView(): string {
    return `
      <div class="abg-knowledge-container">
        <!-- Sub navigation pills -->
        <div class="abg-knowledge-subnav">
          <button class="abg-subnav-pill ${this.activeProcedureSub === 'puncture' ? 'active' : ''}" data-proc="puncture">
            <i class="fa-solid fa-syringe"></i> 1. Kỹ Thuật Lấy Máu Động Mạch
          </button>
          <button class="abg-subnav-pill ${this.activeProcedureSub === 'allen' ? 'active' : ''}" data-proc="allen">
            <i class="fa-solid fa-hand"></i> 2. Nghiệm Pháp Allen (Test Allen)
          </button>
          <button class="abg-subnav-pill ${this.activeProcedureSub === 'vbg' ? 'active' : ''}" data-proc="vbg">
            <i class="fa-solid fa-arrows-split-up-and-left"></i> 3. Đối Chiếu ABG vs VBG
          </button>
          <button class="abg-subnav-pill ${this.activeProcedureSub === 'physiology' ? 'active' : ''}" data-proc="physiology">
            <i class="fa-solid fa-dna"></i> 4. Sinh Lý Học Hệ Đệm
          </button>
        </div>

        <section class="abg-proc-card">
          ${this.renderActiveProcedureContent()}
        </section>
      </div>
    `;
  }

  private renderActiveProcedureContent(): string {
    switch (this.activeProcedureSub) {
      case 'puncture':
        return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-syringe text-blue-600"></i> Quy Trình Lâm Sàng Lấy Máu Động Mạch (Arterial Puncture)</h3>
              <p class="text-muted">Thủ thuật xâm lấn chẩn đoán quan trọng trong hồi sức cấp cứu và bệnh lý hô hấp.</p>
            </div>

            <div class="abg-proc-grid">
              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-location-dot text-danger"></i> Vị Trí Chọc Ưu Tiên:</h4>
                <ul>
                  <li><strong>1. Động mạch quay (Radial Artery - Ưu tiên hàng đầu):</strong> Nông, dễ cố định, ít biến chứng, có cung bàng hệ động mạch trụ bảo vệ (phải làm Test Allen trước). Góc đâm kim: <strong>45°</strong>.</li>
                  <li><strong>2. Động mạch cánh tay (Brachial Artery - Lựa chọn 2):</strong> Nằm sâu ở nếp khuỷu, nguy cơ tổn thương dây thần kinh giữa (Median nerve) và bàng hệ kém hơn. Góc đâm kim: <strong>60°</strong>.</li>
                  <li><strong>3. Động mạch đùi (Femoral Artery - Lựa chọn cấp cứu):</strong> Dưới dây chằng bẹn 2cm. Dành cho bệnh nhân ngừng tuần hoàn hô hấp hoặc tụt huyết áp nặng không bắt được mạch ngoại vi. Góc đâm kim: <strong>90°</strong> (vuông góc).</li>
                </ul>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-list-ol text-primary"></i> 5 Bước Thao Tác Chuẩn:</h4>
                <ol>
                  <li><strong>Chuẩn bị:</strong> Bơm tiêm chuyên dụng tráng sẵn Heparin khô (Lithium Heparin), kim 23G hoặc 25G.</li>
                  <li><strong>Sát khuẩn & Cố định:</strong> Ngửa cổ tay, lót gạc dưới cổ tay góc 30-45°. Sát khuẩn cồn iod/chlorhexidine. Bắt rõ mạch đập giữa ngón trỏ và ngón giữa.</li>
                  <li><strong>Đâm kim:</strong> Mặt vát kim hướng lên trên, đâm góc 45° ngược chiều dòng máu cho đến khi máu đỏ tươi tự động đẩy piston dâng lên (không cần hút mạnh). Lấy đủ 1 - 1.5 mL.</li>
                  <li><strong>Đuổi khí & Đóng nút:</strong> Đâm kim vào nút cao su/nắp bảo vệ, đẩy bọt khí ra ngoài ngay lập tức (tránh PaO2 sai lệch). Lăn nhẹ bơm tiêm giữa hai lòng bàn tay để trộn đều heparin.</li>
                  <li><strong>Ép cầm máu:</strong> Đè ép gạc chặt tại vị trí chọc ít nhất <strong>5 phút liên tục</strong> (10-15 phút nếu có rối loạn đông máu hoặc đang dùng kháng đông).</li>
                </ol>
              </div>

              <div class="abg-proc-box" style="grid-column: 1 / -1;">
                <h4><i class="fa-solid fa-triangle-exclamation text-amber-500"></i> Các Cạm Bẫy Sai Số Cận Lâm Sàng Thường Gặp (Pre-analytical Errors):</h4>
                <div class="abg-table-wrap">
                  <table class="abg-proc-table">
                    <thead>
                      <tr><th>Lỗi tiền xét nghiệm</th><th>Cơ chế tác động</th><th>Hậu quả sai lệch chỉ số</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><strong>Lọt bọt khí trong xilanh</strong></td><td>Cân bằng khí với không khí phòng (PO2 khí phòng ~ 150 mmHg, PCO2 ~ 0 mmHg)</td><td>PaO2 tăng giả tạo, PaCO2 giảm giả tạo, pH tăng nhẹ.</td></tr>
                      <tr><td><strong>Chậm trễ gửi mẫu (> 20 phút không ướp đá)</strong></td><td>Bạch cầu và hồng cầu tiếp tục tiêu thụ oxy và chuyển hóa kỵ khí sinh acid lactic</td><td>PaO2 giảm sâu, PaCO2 tăng giả tạo, pH giảm (toan giả).</td></tr>
                      <tr><td><strong>Thừa Heparin lỏng trong bơm</strong></td><td>Dung dịch Heparin acid làm loãng mẫu máu</td><td>pH giảm giả tạo, PaCO2 giảm pha loãng, HCO3- giảm.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;

      case 'allen':
        return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-hand text-primary"></i> Nghiệm Pháp Allen Cải Biên (Modified Allen's Test)</h3>
              <p class="text-muted">Quy trình bắt buộc phải thực hiện trước khi chọc động mạch quay để xác định tính toàn vẹn của cung bàng hệ động mạch trụ.</p>
            </div>

            <div class="abg-allen-steps-grid">
              <div class="abg-allen-step">
                <span class="abg-step-badge">Bước 1</span>
                <strong>Đè ép đồng thời 2 mạch</strong>
                <p>Yêu cầu bệnh nhân giơ cao tay, nắm chặt nắm tay lại trong 30 giây. Bác sĩ dùng các đầu ngón tay ép chặt đồng thời cả động mạch quay và động mạch trụ ở cổ tay.</p>
              </div>

              <div class="abg-allen-step">
                <span class="abg-step-badge">Bước 2</span>
                <strong>Mở bàn tay - Bàn tay nhợt</strong>
                <p>Bệnh nhân mở bàn tay ra (không duỗi quá căng). Lòng bàn tay và các đầu ngón tay lúc này phải nhợt nhạt, tái trắng do mất hoàn toàn dòng máu nuôi dưỡng.</p>
              </div>

              <div class="abg-allen-step">
                <span class="abg-step-badge">Bước 3</span>
                <strong>Buông áp lực Động mạch trụ</strong>
                <p>Bác sĩ thả lỏng tay đang đè ép Động mạch trụ, nhưng VẪN TIẾP TỤC ĐÈ CHẶT Động mạch quay. Quan sát thời gian lòng bàn tay hồng hào trở lại.</p>
              </div>

              <div class="abg-allen-step abg-allen-step--result">
                <span class="abg-step-badge" style="background: #10b981;">Đánh Giá Kết Quả</span>
                <p><strong>• Test Allen DƯƠNG TÍNH (Bình thường):</strong> Lòng bàn tay hồng trở lại trong vòng <strong>< 7 - 10 giây</strong> → Cung bàng hệ ĐM trụ tốt, <em>AN TOÀN để chọc ĐM quay</em>.</p>
                <p><strong>• Test Allen ÂM TÍNH (Bất thường):</strong> Sau <strong>> 10 - 14 giây</strong> bàn tay vẫn nhợt nhạt → Cung bàng hệ tắc nghẽn hoặc kém phát triển, <em>CHỐNG CHỈ ĐỊNH chọc ĐM quay tay này</em> (nguy cơ hoại tử bàn tay nếu tắc mạch).</p>
              </div>
            </div>
          </div>
        `;

      case 'vbg':
        return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-arrows-split-up-and-left text-purple-600"></i> Đối Chiếu Khí Máu Tĩnh Mạch (VBG) vs Động Mạch (ABG)</h3>
              <p class="text-muted">Khi nào VBG có thể thay thế ABG để giảm đau đớn và biến chứng cho người bệnh?</p>
            </div>

            <div class="abg-table-wrap" style="margin-bottom: 1.5rem;">
              <table class="abg-proc-table">
                <thead>
                  <tr>
                    <th>Chỉ số</th>
                    <th>Khí máu Động mạch (ABG)</th>
                    <th>Khí máu Tĩnh mạch (VBG)</th>
                    <th>Mức độ chênh lệch (VBG - ABG)</th>
                    <th>Ý nghĩa lâm sàng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>pH Máu</strong></td>
                    <td>7.35 - 7.45</td>
                    <td>7.31 - 7.41</td>
                    <td><strong>Thấp hơn 0.03 - 0.05</strong></td>
                    <td>Tương quan cực cao (r > 0.95). VBG hoàn toàn phản ánh trung thực tình trạng toan kiềm máu.</td>
                  </tr>
                  <tr>
                    <td><strong>PCO2 (mmHg)</strong></td>
                    <td>35 - 45</td>
                    <td>40 - 50</td>
                    <td><strong>Cao hơn 4 - 6 mmHg</strong></td>
                    <td>Nếu PvCO2 < 40 mmHg thì chắc chắn PaCO2 không bị ứ CO2; nhưng nếu sốc nặng, PvCO2 ứ đọng nhiều có thể chênh lệch lớn hơn.</td>
                  </tr>
                  <tr>
                    <td><strong>HCO3- (mmol/L)</strong></td>
                    <td>22 - 26</td>
                    <td>23 - 27</td>
                    <td><strong>Cao hơn 1 - 2 mmol/L</strong></td>
                    <td>Tương quan lâm sàng hoàn hảo, hoàn toàn dùng được để tính Anion Gap.</td>
                  </tr>
                  <tr>
                    <td><strong>Lactate</strong></td>
                    <td>0.5 - 1.6 mmol/L</td>
                    <td>0.5 - 2.0 mmol/L</td>
                    <td><strong>Tương đương (± 0.2)</strong></td>
                    <td>VBG dùng rất tốt để tầm soát nhiễm toan lactic và sốc nhiễm khuẩn.</td>
                  </tr>
                  <tr>
                    <td><strong>PO2 (mmHg)</strong></td>
                    <td>80 - 100</td>
                    <td>30 - 40</td>
                    <td><strong>KHÔNG CÓ TƯƠNG QUAN</strong></td>
                    <td><span class="text-danger">TUYỆT ĐỐI KHÔNG DÙNG VBG để đánh giá thiếu oxy máu, tính P/F ratio hay A-a gradient!</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="abg-proc-grid">
              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-circle-check text-emerald-600"></i> Trường Hợp VBG ĐƯỢC PHÉP Thay Thế ABG:</h4>
                <ul>
                  <li>Theo dõi đáp ứng điều trị Toan Ceton Đái Tháo Đường (DKA) (theo hướng dẫn ADA).</li>
                  <li>Đánh giá bù dịch và hạ đường huyết, theo dõi ion đồ Kali, Natri, Clo.</li>
                  <li>Tầm soát nhanh tình trạng Toan chuyển hóa và đo Lactate máu ở khoa Cấp cứu.</li>
                  <li>Ngộ độc khí CO (Carboxyhemoglobin) hoặc Methemoglobinemia (tương quan 99% giữa ABG và VBG).</li>
                </ul>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-circle-xmark text-danger"></i> Trường Hợp BẮT BUỘC Phải Lấy Khí Máu Động Mạch (ABG):</h4>
                <ul>
                  <li>Bệnh nhân suy hô hấp cấp, nghi ngờ ARDS, viêm phổi nặng, thuyên tắc phổi.</li>
                  <li>Cần tính chính xác phân áp Oxy máu động mạch PaO2, chỉ số PaO2/FiO2 và A-a gradient.</li>
                  <li>Bệnh nhân đang thở máy cần cài đặt thông số PEEP, FiO2, thể tích thông khí Vt.</li>
                  <li>Sốc sâu co mạch ngoại vi nặng (khi máu tĩnh mạch ngoại vi bị ứ đọng chuyển hóa yếm khí cực độ).</li>
                </ul>
              </div>
            </div>
          </div>
        `;

      case 'physiology':
        return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-dna text-indigo-600"></i> Sinh Lý Học Thăng Bằng Toan Kiềm & Ba Tuyến Phòng Thủ Của Cơ Thể</h3>
              <p class="text-muted">Cơ chế duy trì nồng độ ion H+ trong khoảng sinh lý hẹp 35 - 45 nmol/L (pH 7.35 - 7.45).</p>
            </div>

            <div class="abg-proc-grid">
              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-square-root-variable text-primary"></i> 1. Phương Trình Henderson - Hasselbalch:</h4>
                <div class="abg-formula-box">
                  <strong>pH = 6.1 + log ( [HCO3-] / (0.03 × PaCO2) )</strong>
                </div>
                <p style="font-size: 0.83rem; margin-top: 0.5rem;">
                  Tỷ số chuẩn [HCO3-] / (0.03 × PaCO2) = 24 / (0.03 × 40) = 24 / 1.2 = <strong>20 : 1</strong>. Khi tỷ số này giữ vững 20:1, pH máu sẽ duy trì chính xác ở mức 7.40.
                </p>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-shield-halved text-success"></i> 2. Tuyến Phòng Thủ 1: Hệ Đệm Hóa Học (Vài Giây):</h4>
                <ul>
                  <li><strong>Hệ đệm Bicarbonate (H2CO3 / HCO3-):</strong> Hệ đệm ngoại bào quan trọng nhất, chiếm 65% dung lượng đệm, mở vì CO2 có thể đào thải qua phổi và HCO3- được điều hòa bởi thận.</li>
                  <li><strong>Hệ đệm Hemoglobin & Protein:</strong> Chiếm 30% dung lượng đệm, đệm nội bào qua các gốc histidine.</li>
                  <li><strong>Hệ đệm Phosphate (HPO4 2- / H2PO4 -):</strong> Đệm quan trọng trong dịch ống thận và nội bào.</li>
                </ul>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-lungs text-blue-600"></i> 3. Tuyến Phòng Thủ 2: Điều Hòa Hô Hấp (Vài Phút đến Vài Giờ):</h4>
                <p style="font-size: 0.83rem; line-height: 1.5;">
                  Các thụ thể hóa học (Chemoreceptors) trung ương ở hành não và ngoại vi ở xoang cảnh / quai động mạch chủ cực kỳ nhạy cảm với pH và PaCO2. Khi pH giảm hoặc PaCO2 tăng, trung tâm hô hấp lập tức kích thích tăng tần số và biên độ thở (thở nhanh sâu kiểu Kussmaul) để đào thải CO2, đưa pH về gần mức bình thường.
                </p>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-kidneys text-amber-600"></i> 4. Tuyến Phòng Thủ 3: Bù Trừ Thận (Vài Ngày: 3 - 5 Ngày):</h4>
                <p style="font-size: 0.83rem; line-height: 1.5;">
                  Tuyến bù trừ chậm nhất nhưng có công suất vô hạn:
                  <br>• Tái hấp thu 99.9% lượng Bicarbonate lọc qua cầu thận (chủ yếu tại ống lượn gần).
                  <br>• Bài tiết ion H+ chủ động qua bơm H+-ATPase và trao đổi Na+/H+ tại ống lượn xa.
                  <br>• Sản sinh Bicarbonate mới thông qua quá trình tạo Amoniac (NH3 + H+ → NH4+) và acid chuẩn độ được (H2PO4-).
                </p>
              </div>
            </div>
          </div>
        `;
    }
  }

  private attachEventListeners(): void {
    // Tab switching
    
    // Nomogram subnav tree switching
    this.container.querySelectorAll('.abg-subnav-pill[data-tree]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tree = (e.currentTarget as HTMLElement).dataset.tree as any;
        if (tree) {
          this.activeTree = tree;
          this.render();
          this.attachEventListeners();
        }
      });
    });

    // Procedure subnav switching
    this.container.querySelectorAll('.abg-subnav-pill[data-proc]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const proc = (e.currentTarget as HTMLElement).dataset.proc as any;
        if (proc) {
          this.activeProcedureSub = proc;
          this.render();
          this.attachEventListeners();
        }
      });
    });

    // Nomogram Sliders
    const pco2Range = this.container.querySelector('#nomo-range-pco2') as HTMLInputElement | null;
    const phRange = this.container.querySelector('#nomo-range-ph') as HTMLInputElement | null;
    if (pco2Range && phRange) {
      const updateNomogram = () => {
        this.nomogramPco2 = parseInt(pco2Range.value, 10);
        this.nomogramPh = parseFloat(phRange.value);

        const valPco2 = this.container.querySelector('#nomo-val-pco2');
        const valPh = this.container.querySelector('#nomo-val-ph');
        const readH = this.container.querySelector('#nomo-readout-h');
        const readHco3 = this.container.querySelector('#nomo-readout-hco3');
        const zoneBadge = this.container.querySelector('#nomo-zone-badge');

        if (valPco2) valPco2.textContent = `${this.nomogramPco2} mmHg`;
        if (valPh) valPh.textContent = this.nomogramPh.toFixed(2);

        const currentH = Math.round(Math.pow(10, 9 - this.nomogramPh));
        const approxHco3 = Math.round((24 * this.nomogramPco2) / Math.max(10, currentH));

        if (readH) readH.textContent = `${currentH} nmol/L`;
        if (readHco3) readHco3.textContent = `${approxHco3} mmol/L`;

        if (zoneBadge) {
          let name = 'Vùng Bình Thường (Normal Buffer Line)';
          let cls = 'abg-badge abg-badge--success';
          if (this.nomogramPh < 7.35 && this.nomogramPco2 > 45) {
            name = 'Toan Hô Hấp (Cấp tính hoặc Mạn tính bù trừ)';
            cls = 'abg-badge abg-badge--danger';
          } else if (this.nomogramPh < 7.35 && this.nomogramPco2 <= 45) {
            name = 'Toan Chuyển Hóa (Metabolic Acidosis)';
            cls = 'abg-badge abg-badge--danger';
          } else if (this.nomogramPh > 7.45 && this.nomogramPco2 < 35) {
            name = 'Kiềm Hô Hấp (Respiratory Alkalosis)';
            cls = 'abg-badge abg-badge--primary';
          } else if (this.nomogramPh > 7.45 && this.nomogramPco2 >= 35) {
            name = 'Kiềm Chuyển Hóa (Metabolic Alkalosis)';
            cls = 'abg-badge abg-badge--primary';
          } else if (this.nomogramPh >= 7.35 && this.nomogramPh <= 7.45 && (this.nomogramPco2 < 35 || this.nomogramPco2 > 45)) {
            name = 'Rối loạn Toan - Kiềm Hỗn Hợp đã bù trừ hoàn toàn';
            cls = 'abg-badge abg-badge--warning';
          }
          zoneBadge.className = cls;
          zoneBadge.textContent = name;
        }
      };

      pco2Range.addEventListener('input', updateNomogram);
      phRange.addEventListener('input', updateNomogram);
    }

    // Nomogram to Analyzer Button
    const btnNomoToAnalyzer = this.container.querySelector('#btn-nomogram-to-analyzer');
    if (btnNomoToAnalyzer) {
      btnNomoToAnalyzer.addEventListener('click', () => {
        const currentH = Math.round(Math.pow(10, 9 - this.nomogramPh));
        const approxHco3 = Math.round((24 * this.nomogramPco2) / Math.max(10, currentH));
        this.currentInput.pH = this.nomogramPh;
        this.currentInput.pCO2 = this.nomogramPco2;
        this.currentInput.hco3 = approxHco3;
        this.currentInput.be = Math.round(approxHco3 - 24);
        this.currentTab = 'analyzer';
        this.render();
        this.attachEventListeners();
        this.showToast(`Đã chuyển thông số Nomogram (pH ${this.nomogramPh.toFixed(2)}, PaCO2 ${this.nomogramPco2}) sang máy tính!`);
      });
    }

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


if (typeof window !== 'undefined') {
  (window as any).AbgCDSSController = AbgCDSSController;
}
