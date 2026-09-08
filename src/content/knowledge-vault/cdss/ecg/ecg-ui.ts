/**
 * CliniPortal CDSS — ECG UI Controller & Clinical Decision Assistant
 * Path: src/content/knowledge-vault/cdss/ecg/ecg-ui.ts
 */

import { EcgCase, LeadName, WaveType, AnnotationValidationReport } from './ecg-types';
import { ECG_CASES } from './ecg-cases';
import { EcgCanvasRenderer, EcgCanvasOptions } from './ecg-canvas-renderer';
import { LEAD_ANATOMY_MAP, LEAD_FILTER_DEFINITIONS } from './ecg-math';

export class EcgCDSSController {
  private container: HTMLElement;
  private currentCase: EcgCase;
  private renderer: EcgCanvasRenderer | null = null;
  private currentTab: 'diagnosis' | 'criteria' | 'anatomy' | 'annotation' = 'diagnosis';

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
    this.currentCase = ECG_CASES[0];
    this.init();
  }

  private init(): void {
    this.renderLayout();
    this.initCanvasRenderer();
    this.attachEventListeners();
    this.updatePatientInfo();
    this.updateDiagnosticPanel();
  }

  private renderLayout(): void {
    this.container.innerHTML = `
      <div class="ecg-cdss-app">
        <!-- Top Toolbar Card -->
        <header class="ecg-top-card">
          <div class="ecg-header-main">
            <div class="ecg-badge-group">
              <span class="ecg-badge ecg-badge--cardio"><i class="fa-solid fa-heart-pulse"></i> CDSS Điện Tâm Đồ 12 Đạo Trình</span>
              <span class="ecg-badge ecg-badge--live" id="live-indicator"><i class="fa-solid fa-circle"></i> Sẵn sàng</span>
              <span class="ecg-badge ecg-badge--secondary" id="case-severity-badge">Mức độ: ${this.currentCase.severity}</span>
            </div>
            <h1 class="ecg-app-title">
              Hệ Thống Phân Tích & Hỗ Trợ Chẩn Đoán ECG 12 Chuyển Đạo
            </h1>
          </div>

          <!-- Case Selector & Quick Actions -->
          <div class="ecg-case-selector-wrap">
            <label for="ecg-case-select"><i class="fa-solid fa-folder-open"></i> Thư Viện Ca Lâm Sàng:</label>
            <select id="ecg-case-select" class="ecg-select">
              ${ECG_CASES.map(c => `
                <option value="${c.id}" ${c.id === this.currentCase.id ? 'selected' : ''}>
                  [${c.category}] ${c.title} — ${c.severity}
                </option>
              `).join('')}
            </select>
            <button id="btn-export-soap" class="ecg-btn ecg-btn--primary">
              <i class="fa-solid fa-notes-medical"></i> Chép Vào Bệnh Án
            </button>
          </div>
        </header>

        <!-- Patient Info Card -->
        <section class="ecg-patient-banner" id="ecg-patient-banner">
          <!-- Dynamic Patient Info -->
        </section>

        <!-- Canvas Toolbar (Controls, Caliper, Speed, Theme) -->
        <div class="ecg-canvas-toolbar">
          <div class="ecg-tool-group">
            <button id="btn-toggle-live" class="ecg-tool-btn" title="Mô phỏng máy monitor thời gian thực">
              <i class="fa-solid fa-play"></i> <span>Mô Phỏng Monitor</span>
            </button>
            <button id="btn-toggle-audio" class="ecg-tool-btn" title="Bật/Tắt âm thanh nhịp tim QRS">
              <i class="fa-solid fa-volume-xmark"></i> <span>Âm Nhịp Tim</span>
            </button>
            <button id="btn-toggle-caliper" class="ecg-tool-btn" title="Bật thước đo Caliper điện tử">
              <i class="fa-solid fa-ruler-combined"></i> <span>Thước Caliper</span>
            </button>
          </div>

          <div class="ecg-tool-group">
            <span class="ecg-tool-label">Bố cục:</span>
            <select id="select-layout" class="ecg-select-sm">
              <option value="3x4" selected>Tiêu chuẩn 3x4 + DII kéo dài</option>
              <option value="6x2">6 Chi / 6 Trước tim (6x2)</option>
              <option value="12x1">Dọc 12 đạo trình</option>
              <option value="single">Phóng đại 1 đạo trình</option>
            </select>
          </div>

          <div class="ecg-tool-group">
            <span class="ecg-tool-label">Giao diện:</span>
            <select id="select-theme" class="ecg-select-sm">
              <option value="paper" selected>Giấy Hồng ECG Lâm Sàng</option>
              <option value="monitor">Monitor Hồi Sức (Xanh Neon)</option>
              <option value="amber">Monitor CRT Hổ Phách</option>
            </select>
          </div>

          <div class="ecg-tool-group">
            <span class="ecg-tool-label">Biên độ:</span>
            <select id="select-gain" class="ecg-select-sm">
              <option value="0.5">0.5x (5mm/mV)</option>
              <option value="1.0" selected>1.0x (10mm/mV chuẩn)</option>
              <option value="2.0">2.0x (20mm/mV)</option>
            </select>
          </div>
        </div>

        <!-- Annotation Tools Strip -->
        <div class="ecg-annotation-toolbar">
          <span class="ecg-ann-label"><i class="fa-solid fa-tags"></i> Chấm Điểm Mốc Sóng:</span>
          <div class="ecg-ann-btn-group">
            <button class="ecg-ann-btn" data-wave="P">Sóng P</button>
            <button class="ecg-ann-btn" data-wave="Q">Sóng Q</button>
            <button class="ecg-ann-btn" data-wave="R">Đỉnh R</button>
            <button class="ecg-ann-btn" data-wave="S">Sóng S</button>
            <button class="ecg-ann-btn" data-wave="J">Điểm J</button>
            <button class="ecg-ann-btn" data-wave="T">Sóng T</button>
            <button class="ecg-ann-btn" data-wave="U">Sóng U</button>
            <button id="btn-clear-ann" class="ecg-ann-btn ecg-ann-btn--clear" title="Xóa toàn bộ nhãn đã chấm">
              <i class="fa-solid fa-trash-can"></i> Xóa Nhãn
            </button>
          </div>
        </div>

        <!-- Canvas Container -->
        <div class="ecg-canvas-wrapper" id="ecg-canvas-mount-point">
          <!-- Canvas injected here -->
        </div>

        <!-- Clinical Diagnostic & Evaluation Subsystem -->
        <section class="ecg-diagnostic-section">
          <!-- Navigation Tabs -->
          <div class="ecg-diag-tabs">
            <button class="ecg-tab-btn active" data-tab="diagnosis">
              <i class="fa-solid fa-stethoscope"></i> Chẩn Đoán & Khuyến Cáo Lâm Sàng
            </button>
            <button class="ecg-tab-btn" data-tab="criteria">
              <i class="fa-solid fa-calculator"></i> Thước Đo Chỉ Số & Tiêu Chuẩn Điện Sinh Lý
            </button>
            <button class="ecg-tab-btn" data-tab="anatomy">
              <i class="fa-solid fa-diagram-project"></i> Giải Phẫu Chuyển Đạo & Nhánh Mạch Vành
            </button>
            <button class="ecg-tab-btn" data-tab="annotation">
              <i class="fa-solid fa-award"></i> Bảng Đánh Giá Chấm Mốc Sóng (${this.currentCase.id})
            </button>
          </div>

          <!-- Tab Content Container -->
          <div class="ecg-tab-content" id="ecg-tab-content">
            <!-- Dynamic Tab Content -->
          </div>
        </section>

        <!-- Toast -->
        <div id="ecg-toast" class="ecg-toast" style="display:none;"></div>
      </div>
    `;
  }

  private initCanvasRenderer(): void {
    this.renderer = new EcgCanvasRenderer('ecg-canvas-mount-point', this.currentCase, {
      theme: 'paper',
      layoutMode: '3x4',
      paperSpeed: 25,
      voltageGain: 1.0,
      isLiveMode: false,
      isAudioMuted: true
    });

    window.addEventListener('ecg-annotation-update', (e: any) => {
      const report = e.detail?.report as AnnotationValidationReport | null;
      if (report && this.currentTab === 'annotation') {
        this.renderAnnotationTab(report);
      }
    });
  }

  private attachEventListeners(): void {
    // Case Selector
    const caseSelect = document.getElementById('ecg-case-select') as HTMLSelectElement | null;
    if (caseSelect) {
      caseSelect.addEventListener('change', () => {
        const found = ECG_CASES.find(c => c.id === caseSelect.value);
        if (found) {
          this.currentCase = found;
          this.renderer?.setCase(found);
          this.updatePatientInfo();
          this.updateDiagnosticPanel();
          this.showToast(`Đã tải ca bệnh: ${found.title}`);
        }
      });
    }

    // Live Mode Toggle
    const btnLive = document.getElementById('btn-toggle-live');
    if (btnLive) {
      btnLive.addEventListener('click', () => {
        if (!this.renderer) return;
        const isLive = this.renderer.toggleLive();
        btnLive.classList.toggle('active', isLive);
        btnLive.innerHTML = isLive
          ? `<i class="fa-solid fa-pause"></i> <span>Tạm Dừng</span>`
          : `<i class="fa-solid fa-play"></i> <span>Mô Phỏng Monitor</span>`;
        
        const ind = document.getElementById('live-indicator');
        if (ind) {
          ind.className = `ecg-badge ${isLive ? 'ecg-badge--danger' : 'ecg-badge--live'}`;
          ind.innerHTML = isLive ? `<i class="fa-solid fa-heartbeat fa-beat"></i> ĐANG CHẠY MONITOR` : `<i class="fa-solid fa-circle"></i> Sẵn sàng`;
        }
      });
    }

    // Audio Mute Toggle
    const btnAudio = document.getElementById('btn-toggle-audio');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        if (!this.renderer) return;
        const isMuted = this.renderer.toggleMute();
        btnAudio.classList.toggle('active', !isMuted);
        btnAudio.innerHTML = !isMuted
          ? `<i class="fa-solid fa-volume-high"></i> <span>Âm Thanh: Bật</span>`
          : `<i class="fa-solid fa-volume-xmark"></i> <span>Âm Nhịp Tim</span>`;
      });
    }

    // Caliper Toggle
    const btnCaliper = document.getElementById('btn-toggle-caliper');
    if (btnCaliper) {
      btnCaliper.addEventListener('click', () => {
        if (!this.renderer) return;
        const isActive = this.renderer.toggleCaliper();
        btnCaliper.classList.toggle('active', isActive);
        if (isActive) {
          this.showToast('Thước Caliper đã bật: Nhấp và kéo trên giấy ECG để đo khoảng thời gian và biên độ.');
        }
      });
    }

    // Layout Select
    const selectLayout = document.getElementById('select-layout') as HTMLSelectElement | null;
    if (selectLayout) {
      selectLayout.addEventListener('change', () => {
        this.renderer?.setOptions({ layoutMode: selectLayout.value as any });
      });
    }

    // Theme Select
    const selectTheme = document.getElementById('select-theme') as HTMLSelectElement | null;
    if (selectTheme) {
      selectTheme.addEventListener('change', () => {
        this.renderer?.setOptions({ theme: selectTheme.value as any });
      });
    }

    // Gain Select
    const selectGain = document.getElementById('select-gain') as HTMLSelectElement | null;
    if (selectGain) {
      selectGain.addEventListener('change', () => {
        this.renderer?.setOptions({ voltageGain: parseFloat(selectGain.value) });
      });
    }

    // Annotation buttons
    const annBtns = document.querySelectorAll('.ecg-ann-btn[data-wave]');
    annBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const wave = btn.getAttribute('data-wave') as WaveType;
        const wasActive = btn.classList.contains('active');
        annBtns.forEach(b => b.classList.remove('active'));
        if (!wasActive) {
          btn.classList.add('active');
          this.renderer?.setAnnotationMode(wave);
          this.showToast(`Đã kích hoạt chế độ chấm ${wave}: Nhấp lên đường biểu diễn sóng.`);
        } else {
          this.renderer?.setAnnotationMode(null);
        }
      });
    });

    const btnClearAnn = document.getElementById('btn-clear-ann');
    if (btnClearAnn) {
      btnClearAnn.addEventListener('click', () => {
        this.renderer?.clearAnnotations();
        annBtns.forEach(b => b.classList.remove('active'));
        this.showToast('Đã xóa toàn bộ nhãn sóng.');
        if (this.currentTab === 'annotation') {
          this.renderAnnotationTab(null);
        }
      });
    }

    // Diagnostic Tabs
    const tabBtns = document.querySelectorAll('.ecg-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.getAttribute('data-tab') as any;
        this.updateDiagnosticPanel();
      });
    });

    // Export SOAP Plan
    const btnExportSoap = document.getElementById('btn-export-soap');
    if (btnExportSoap) {
      btnExportSoap.addEventListener('click', () => this.exportSoapPlan());
    }
  }

  private updatePatientInfo(): void {
    const banner = document.getElementById('ecg-patient-banner');
    if (!banner) return;

    const p = this.currentCase.patient;
    const m = this.currentCase.metrics;

    banner.innerHTML = `
      <div class="ecg-patient-grid">
        <div class="ecg-patient-col-main">
          <div class="ecg-patient-name-row">
            <span class="ecg-patient-name"><i class="fa-solid fa-user-injured"></i> ${p.name}</span>
            <span class="ecg-patient-demog">${p.age} tuổi • ${p.gender}</span>
          </div>
          <p class="ecg-patient-complaint"><strong>Lý do vào viện:</strong> ${p.chiefComplaint}</p>
          <p class="ecg-patient-history"><strong>Bệnh sử:</strong> ${p.clinicalHistory}</p>
        </div>

        <div class="ecg-patient-vitals-col">
          <div class="ecg-vital-item">
            <span class="ecg-vital-label">Huyết Áp:</span>
            <span class="ecg-vital-val font-bold">${p.vitals.bp} mmHg</span>
          </div>
          <div class="ecg-vital-item">
            <span class="ecg-vital-label">Nhịp Tim (HR):</span>
            <span class="ecg-vital-val font-bold text-danger">${m.heartRate} bpm</span>
          </div>
          <div class="ecg-vital-item">
            <span class="ecg-vital-label">SpO2 / Nhiệt:</span>
            <span class="ecg-vital-val">${p.vitals.spo2}% • ${p.vitals.temp}°C</span>
          </div>
          ${p.labs?.troponinI ? `
            <div class="ecg-vital-item ecg-vital-item--highlight">
              <span class="ecg-vital-label">Troponin I:</span>
              <span class="ecg-vital-val text-danger font-bold">${p.labs.troponinI}</span>
            </div>
          ` : ''}
          ${p.labs?.k ? `
            <div class="ecg-vital-item">
              <span class="ecg-vital-label">K+ máu:</span>
              <span class="ecg-vital-val">${p.labs.k} mEq/L</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    // Severity badge in header
    const sevBadge = document.getElementById('case-severity-badge');
    if (sevBadge) {
      sevBadge.textContent = `Mức độ: ${this.currentCase.severity}`;
      sevBadge.className = `ecg-badge ${
        this.currentCase.severity === 'Khẩn cấp' || this.currentCase.severity === 'Nguy kịch'
          ? 'ecg-badge--danger'
          : 'ecg-badge--secondary'
      }`;
    }
  }

  private updateDiagnosticPanel(): void {
    const wrap = document.getElementById('ecg-tab-content');
    if (!wrap) return;

    if (this.currentTab === 'diagnosis') {
      this.renderDiagnosisTab(wrap);
    } else if (this.currentTab === 'criteria') {
      this.renderCriteriaTab(wrap);
    } else if (this.currentTab === 'anatomy') {
      this.renderAnatomyTab(wrap);
    } else {
      this.renderAnnotationTab(this.renderer?.lastValidationReport || null);
    }
  }

  private renderDiagnosisTab(wrap: HTMLElement): void {
    const c = this.currentCase;
    const d = c.diagnosis;

    wrap.innerHTML = `
      <div class="ecg-diag-grid">
        <!-- Chẩn đoán then chốt & Nhánh thủ phạm -->
        <div class="ecg-diag-card ecg-diag-card--primary">
          <div class="ecg-diag-card-header">
            <i class="fa-solid fa-file-waveform"></i>
            <h3>Kết Luận Chẩn Đoán Điện Tâm Đồ</h3>
            <span class="ecg-confidence-tag">Độ tin cậy: ${d.confidence.primary}%</span>
          </div>
          <div class="ecg-primary-diagnosis">
            ${d.primary}
          </div>
          ${d.culpritVesselOrCause ? `
            <div class="ecg-culprit-box">
              <i class="fa-solid fa-heart-crack text-danger"></i>
              <div>
                <strong>Vị trí tổn thương / Nhánh thủ phạm:</strong>
                <p>${d.culpritVesselOrCause}</p>
              </div>
            </div>
          ` : ''}

          <div class="ecg-key-findings-list">
            <strong>Dấu hiệu then chốt trên 12 đạo trình:</strong>
            <ul>
              ${d.keyFindings.map(f => `<li><i class="fa-solid fa-circle-check text-primary"></i> <span>${f}</span></li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Phác Đồ Xử Trí Khẩn Cấp & Chẩn Đoán Phân Biệt -->
        <div class="ecg-diag-card">
          <div class="ecg-diag-card-header">
            <i class="fa-solid fa-truck-medical"></i>
            <h3>Hướng Xử Trí Cấp Cứu & Can Thiệp</h3>
          </div>
          
          <ol class="ecg-treatment-steps">
            ${d.treatment.map((step, idx) => `
              <li>
                <span class="ecg-step-num">${idx + 1}</span>
                <span class="ecg-step-text">${step}</span>
              </li>
            `).join('')}
          </ol>

          <div class="ecg-differentials-box">
            <strong>Chẩn đoán phân biệt cần loại trừ:</strong>
            <p>${d.differentials.join(' • ')}</p>
          </div>

          <div class="ecg-learning-box">
            <i class="fa-solid fa-graduation-cap"></i>
            <div>
              <strong>Điểm cốt lõi lâm sàng:</strong>
              <p>${c.learningNotes.coreTakeaway}</p>
              <small class="text-muted"><i class="fa-solid fa-triangle-exclamation"></i> Cạm bẫy: ${c.learningNotes.pitfallToAvoid}</small>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCriteriaTab(wrap: HTMLElement): void {
    const m = this.currentCase.metrics;

    wrap.innerHTML = `
      <div class="ecg-criteria-grid">
        <!-- Thông số đo đạc điện học -->
        <div class="ecg-criteria-card">
          <h3><i class="fa-solid fa-wave-square"></i> Các Khoảng Thời Gian Điện Học</h3>
          <table class="ecg-metrics-table">
            <tr>
              <td>Nhịp & Tính chất:</td>
              <td class="font-bold">${m.rhythmType} (${m.regularity})</td>
            </tr>
            <tr>
              <td>Tần số thất (HR):</td>
              <td class="font-bold text-danger">${m.heartRate} chu kỳ/phút</td>
            </tr>
            <tr>
              <td>Trục điện tim (Góc α):</td>
              <td class="font-bold">${m.axis} (${m.alphaAngle}°)</td>
            </tr>
            <tr>
              <td>Khoảng PR:</td>
              <td class="${m.prInterval > 200 ? 'text-danger font-bold' : ''}">${m.prInterval} ms (Chuẩn: 120-200ms)</td>
            </tr>
            <tr>
              <td>Độ rộng QRS:</td>
              <td class="${m.qrsDuration > 120 ? 'text-danger font-bold' : ''}">${m.qrsDuration} ms (Chuẩn: &lt;120ms)</td>
            </tr>
            <tr>
              <td>Khoảng QT:</td>
              <td>${m.qt} ms</td>
            </tr>
            <tr>
              <td>QTc (Công thức Bazett):</td>
              <td class="${m.qtc > 450 ? 'text-danger font-bold' : ''}">${m.qtc} ms (Chuẩn: &lt;440ms nam, &lt;460ms nữ)</td>
            </tr>
          </table>
        </div>

        <!-- Thang điểm phì đại & Tiêu chuẩn đặc biệt -->
        <div class="ecg-criteria-card">
          <h3><i class="fa-solid fa-list-check"></i> Tiêu Chuẩn Phì Đại & Tiên Lượng</h3>
          <div class="ecg-criteria-list">
            <div class="ecg-crit-item">
              <div class="ecg-crit-header">
                <strong>Chỉ số Sokolow-Lyon (Dày thất trái):</strong>
                <span class="ecg-crit-val">${m.sokolowLyon !== undefined ? `${m.sokolowLyon} mm` : 'N/A'}</span>
              </div>
              <p class="ecg-crit-desc">SV1 + RV5 (Ngưỡng dày thất trái: ≥ 35 mm ở người lớn > 35 tuổi).</p>
            </div>

            <div class="ecg-crit-item">
              <div class="ecg-crit-header">
                <strong>Tiêu chuẩn Cornell:</strong>
                <span class="ecg-crit-val">${m.cornellCriteria !== undefined ? `${m.cornellCriteria} mm` : 'N/A'}</span>
              </div>
              <p class="ecg-crit-desc">R aVL + S V3 (&gt; 28 mm ở nam, &gt; 20 mm ở nữ).</p>
            </div>

            <div class="ecg-crit-item">
              <div class="ecg-crit-header">
                <strong>Hội chứng Brugada:</strong>
                <span class="ecg-crit-val">${this.currentCase.diagnosis.brugadaAnalysis || 'Âm tính'}</span>
              </div>
              <p class="ecg-crit-desc">Đoạn ST chênh lên dạng vòm (Type 1) hoặc dạng yên ngựa (Type 2) ≥ 2mm ở V1-V2.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderAnatomyTab(wrap: HTMLElement): void {
    const leads: LeadName[] = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

    wrap.innerHTML = `
      <div class="ecg-anatomy-grid">
        ${leads.map(l => {
          const info = LEAD_ANATOMY_MAP[l];
          return `
            <div class="ecg-lead-anatomy-card">
              <div class="ecg-lead-anatomy-header">
                <span class="ecg-lead-code">${info.lead}</span>
                <span class="ecg-lead-region">${info.region}</span>
              </div>
              <div class="ecg-lead-vessel">
                <i class="fa-solid fa-syringe text-danger"></i> <strong>ĐM nuôi:</strong> ${info.culpritVessel}
              </div>
              <p class="ecg-lead-desc">${info.description}</p>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  private renderAnnotationTab(report: AnnotationValidationReport | null): void {
    const wrap = document.getElementById('ecg-tab-content');
    if (!wrap) return;

    if (!report || report.totalAnnotations === 0) {
      wrap.innerHTML = `
        <div class="ecg-empty-ann-state">
          <i class="fa-solid fa-hand-pointer fa-3x text-muted"></i>
          <h3>Chưa có mốc sóng nào được chấm điểm</h3>
          <p>
            Chọn các nút sóng (P, Q, R, S, J, T, U) ở thanh công cụ phía trên và nhấp chuột trực tiếp lên đường biểu diễn điện tâm đồ để hệ thống chấm điểm độ chính xác.
          </p>
        </div>
      `;
      return;
    }

    wrap.innerHTML = `
      <div class="ecg-ann-report">
        <div class="ecg-ann-summary-card">
          <div class="ecg-ann-score-box">
            <span class="ecg-ann-score">${report.overallScore}</span>
            <span class="ecg-ann-score-label">/ 100 Điểm</span>
          </div>
          <div class="ecg-ann-summary-text">
            <h3>Kết Quả Nhận Diện Sóng Lâm Sàng</h3>
            <p class="ecg-ann-feedback">${report.feedback}</p>
            <p class="ecg-ann-pearl"><i class="fa-solid fa-lightbulb text-warning"></i> ${report.clinicalPearl}</p>
          </div>
        </div>

        <div class="ecg-ann-items-list">
          <h4>Chi Tiết Từng Vị Trí Sóng:</h4>
          ${report.items.map(item => `
            <div class="ecg-ann-result-row ecg-ann-result-row--${item.status}">
              <div class="ecg-ann-wave-badge">${item.waveType} (${item.lead})</div>
              <div class="ecg-ann-item-desc">
                <strong>${item.message}</strong>
                <p>${item.morphologyEvaluation}</p>
              </div>
              <div class="ecg-ann-item-score font-bold">${item.score}đ</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private exportSoapPlan(): void {
    const c = this.currentCase;
    const p = c.patient;
    const m = c.metrics;
    const d = c.diagnosis;
    const dateStr = new Date().toLocaleDateString('vi-VN');

    const text = [
      `--- BÁO CÁO ĐIỆN TÂM ĐỒ 12 CHUYỂN ĐẠO (CDSS ECG MASTER) [${dateStr}] ---`,
      `Bệnh nhân: ${p.name} | ${p.age} tuổi (${p.gender})`,
      `Lý do khám: ${p.chiefComplaint}`,
      `Sinh hiệu: HA ${p.vitals.bp} mmHg, Mạch ${m.heartRate} bpm, SpO2 ${p.vitals.spo2}%`,
      `\nKẾT QUẢ ĐO ĐẠC ĐIỆN HỌC:`,
      `  • Nhịp: ${m.rhythmType} (${m.regularity}) | Tần số: ${m.heartRate} l/p`,
      `  • Trục điện tim: ${m.axis} (${m.alphaAngle}°)`,
      `  • PR: ${m.prInterval} ms | QRS: ${m.qrsDuration} ms | QTc: ${m.qtc} ms`,
      `\nCHẨN ĐOÁN XÁC ĐỊNH:`,
      `  • ${d.primary}`,
      ...(d.culpritVesselOrCause ? [`  • Nhánh thủ phạm / Nguyên nhân: ${d.culpritVesselOrCause}`] : []),
      `  • Dấu hiệu chìa khóa: ${d.keyFindings.join('; ')}`,
      `\nKẾ HOẠCH ĐIỀU TRỊ KHẨN CẤP (SOAP PLAN):`,
      ...d.treatment.map((t, idx) => `  ${idx + 1}. ${t}`),
      `\nPhân biệt: ${d.differentials.join(', ')}`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Đã sao chép kết quả ECG vào Hồ Sơ Bệnh Án / DocSpace!');
    });
  }

  private showToast(msg: string): void {
    const toast = document.getElementById('ecg-toast');
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
