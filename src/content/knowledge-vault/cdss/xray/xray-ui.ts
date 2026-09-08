/**
 * CliniPortal CDSS — RadAI X-Ray UI Controller (DocSpace PACS Integration)
 * Path: src/content/knowledge-vault/cdss/xray/xray-ui.ts
 */

import { CaseStudy, Finding, ExamType, KnowledgeEntry } from './xray-types';
import { DEFAULT_CASES, DEFAULT_KNOWLEDGE } from './xray-cases';
import { XRayCanvasRenderer } from './xray-canvas-renderer';

export class XRayCDSSController {
  private container: HTMLElement;
  private cases: CaseStudy[] = DEFAULT_CASES;
  private currentCase: CaseStudy;
  private currentTab: 'pacs' | 'cases' | 'knowledge' = 'pacs';
  private renderer: XRayCanvasRenderer | null = null;
  private activeFindingId: string | null = null;
  private knowledgeFilter: string = '';

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
    this.currentCase = this.cases[0];
    this.init();
  }

  private init(): void {
    this.render();
    this.initCanvas();
    this.attachEventListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="xray-app-container">
        <!-- Header Card -->
        <header class="xray-header-card">
          <div class="xray-brand-wrap">
            <div class="xray-brand-icon">
              <i class="fa-solid fa-x-ray"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="xray-badge xray-badge--mild"><i class="fa-solid fa-microchip"></i> RadAI PACS 2.0</span>
                <span class="xray-badge xray-badge--moderate"><i class="fa-solid fa-circle-check"></i> Chẩn Đoán Hình Ảnh</span>
              </div>
              <h1 class="xray-header-title">Hệ Thống Phân Tích X-Quang Ngực & Bụng Thông Minh (RadAI)</h1>
              <p class="xray-header-subtitle">
                Mô phỏng chẩn đoán hình ảnh kỹ thuật số PACS: nhận diện tổn thương nhu mô, màng phổi, bóng tim, tắc ruột và xuất kết luận chuẩn hóa vào Bệnh Án DocSpace SOAP.
              </p>
            </div>
          </div>

          <div class="xray-header-actions">
            <button id="btn-export-soap" class="xray-btn xray-btn--soap" title="Chép kết luận hình ảnh học theo mẫu SOAP">
              <i class="fa-solid fa-copy"></i> <span>Chép Kết Luận Vào SOAP</span>
            </button>
            <button id="btn-reset-pacs" class="xray-btn xray-btn--outline" title="Đặt lại bộ lọc hình ảnh">
              <i class="fa-solid fa-rotate-left"></i> <span>Đặt Lại PACS</span>
            </button>
          </div>
        </header>

        <!-- Patient Banner -->
        <section class="xray-patient-banner">
          <div class="xray-demographics-list">
            <div class="xray-demographics-item">
              <i class="fa-solid fa-hospital-user text-blue-600"></i>
              <span>Bệnh nhân: <b>${this.currentCase.title}</b> (${this.currentCase.patientGender === 'M' ? 'Nam' : 'Nữ'}, ${this.currentCase.patientAge} tuổi)</span>
            </div>
            <div class="xray-demographics-item">
              <i class="fa-solid fa-film text-purple-600"></i>
              <span>Kỹ thuật: <b>${this.getExamLabel(this.currentCase.examType)}</b></span>
            </div>
            <div class="xray-demographics-item">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              <span>Tổn thương: <b>${this.currentCase.findings.length} điểm phát hiện</b></span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label for="select-case-dropdown" style="font-size: 0.8rem; font-weight: 700; color: var(--xray-muted);">Chọn ca:</label>
            <select id="select-case-dropdown" style="
              padding: 0.4rem 0.75rem;
              border-radius: 6px;
              border: 1px solid var(--xray-line);
              background: var(--xray-panel);
              color: var(--xray-ink);
              font-size: 0.82rem;
              font-weight: 600;
            ">
              ${this.cases.map(c => `
                <option value="${c.id}" ${c.id === this.currentCase.id ? 'selected' : ''}>
                  ${c.title} (${this.getExamLabel(c.examType)})
                </option>
              `).join('')}
            </select>
          </div>
        </section>

        <!-- Navigation Tabs -->
        <nav class="xray-tabs-bar">
          <button class="xray-tab-btn ${this.currentTab === 'pacs' ? 'active' : ''}" data-tab="pacs">
            <i class="fa-solid fa-desktop"></i> 1. Phòng Đọc X-Quang PACS
          </button>
          <button class="xray-tab-btn ${this.currentTab === 'cases' ? 'active' : ''}" data-tab="cases">
            <i class="fa-solid fa-folder-open"></i> 2. Thư Viện Ca Bệnh (${this.cases.length})
          </button>
          <button class="xray-tab-btn ${this.currentTab === 'knowledge' ? 'active' : ''}" data-tab="knowledge">
            <i class="fa-solid fa-book-atlas"></i> 3. Sổ Tay Dấu Hiệu X-Quang (${DEFAULT_KNOWLEDGE.length})
          </button>
        </nav>

        <!-- Tab Body -->
        ${this.renderTabBody()}

        <!-- Toast -->
        <div id="xray-toast" class="xray-toast">
          <i class="fa-solid fa-circle-check text-emerald-400"></i>
          <span id="xray-toast-msg">Đã chép kết luận vào khay nhớ tạm!</span>
        </div>
      </div>
    `;
  }

  private renderTabBody(): string {
    switch (this.currentTab) {
      case 'pacs':
        return this.renderPacsView();
      case 'cases':
        return this.renderCasesView();
      case 'knowledge':
        return this.renderKnowledgeView();
      default:
        return '';
    }
  }

  private renderPacsView(): string {
    return `
      <div class="xray-workstation-grid">
        <!-- PACS Viewport Column -->
        <div class="xray-pacs-card">
          <!-- Toolbar -->
          <div class="xray-pacs-toolbar">
            <div class="xray-pacs-tool-group">
              <button id="pacs-btn-invert" class="xray-pacs-btn" title="Đảo âm bản X-quang">
                <i class="fa-solid fa-circle-half-stroke"></i> <span>Đảo Âm Bản</span>
              </button>
              <button id="pacs-btn-overlay" class="xray-pacs-btn active" title="Bật/Tắt điểm phát hiện tổn thương">
                <i class="fa-solid fa-bullseye"></i> <span>Điểm Tổn Thương</span>
              </button>
            </div>

            <div class="xray-pacs-tool-group">
              <button id="pacs-btn-zoom-in" class="xray-pacs-btn" title="Phóng to">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
              </button>
              <button id="pacs-btn-zoom-out" class="xray-pacs-btn" title="Thu nhỏ">
                <i class="fa-solid fa-magnifying-glass-minus"></i>
              </button>
              <button id="pacs-btn-reset-view" class="xray-pacs-btn" title="Khôi phục góc nhìn">
                <i class="fa-solid fa-arrows-to-dot"></i> <span>Vừa Khung</span>
              </button>
            </div>
          </div>

          <!-- Sliders Bar -->
          <div class="xray-pacs-sliders">
            <div class="xray-slider-item">
              <i class="fa-solid fa-sun"></i>
              <span>Sáng:</span>
              <input type="range" id="pacs-slider-brightness" min="-80" max="80" value="0">
            </div>
            <div class="xray-slider-item">
              <i class="fa-solid fa-circle-half-stroke"></i>
              <span>Tương phản:</span>
              <input type="range" id="pacs-slider-contrast" min="-80" max="80" value="0">
            </div>
            <div class="xray-slider-item" style="margin-left: auto;">
              <span style="color: #64748b; font-family: var(--xray-font-mono);">Kéo chuột để di chuyển ảnh</span>
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="xray-canvas-viewport">
            <canvas id="xray-canvas"></canvas>
          </div>
        </div>

        <!-- Findings & Diagnosis Column -->
        <div class="xray-findings-panel">
          <!-- Primary Diagnosis Card -->
          <div class="xray-findings-card" style="border-left: 5px solid var(--xray-primary);">
            <span class="xray-badge xray-badge--mild" style="margin-bottom: 0.5rem;">Kết Luận Chẩn Đoán</span>
            <h3 style="font-family: var(--xray-font-display); font-size: 1.25rem; font-weight: 800; color: var(--xray-ink); margin: 0 0 0.5rem;">
              ${this.currentCase.diagnosis || this.currentCase.title}
            </h3>
            <p style="font-size: 0.86rem; color: var(--xray-ink2); margin: 0 0 0.75rem; line-height: 1.55;">
              ${this.currentCase.notes || this.currentCase.clinicalHistory}
            </p>
            ${this.currentCase.tags && this.currentCase.tags.length > 0 ? `
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                ${this.currentCase.tags.map(t => `<span class="xray-badge xray-badge--mild" style="font-size: 0.68rem;">#${t}</span>`).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Findings List Card -->
          <div class="xray-findings-card">
            <div class="xray-findings-header">
              <h4 style="font-family: var(--xray-font-display); font-size: 1.05rem; font-weight: 700; color: var(--xray-ink); margin: 0;">
                <i class="fa-solid fa-list-check text-blue-600"></i> Các Tổn Thương Phát Hiện (${this.currentCase.findings.length})
              </h4>
              <span style="font-size: 0.75rem; color: var(--xray-muted);">Click vào thẻ hoặc vòng tròn trên phim</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              ${this.currentCase.findings.map(f => {
                const isActive = f.id === this.activeFindingId;
                const conf = Math.round(f.confidence > 1 ? f.confidence : f.confidence * 100);
                return `
                  <div class="xray-finding-item ${isActive ? 'active' : ''}" data-finding-id="${f.id}">
                    <div class="xray-finding-top">
                      <span class="xray-finding-title">
                        <i class="fa-solid fa-circle-dot" style="color: ${this.getSeverityColor(f.severity)};"></i>
                        ${f.nameVi || f.name}
                      </span>
                      <span class="xray-badge ${this.getSeverityBadgeClass(f.severity)}">${this.getSeverityLabel(f.severity)} (${conf}%)</span>
                    </div>

                    <p class="xray-finding-desc">${f.description}</p>

                    <div class="xray-finding-details">
                      <div><b>Vị trí:</b> ${f.location}</div>
                      ${f.radiographicSign ? `<div><b>Dấu hiệu X-quang:</b> ${f.radiographicSign}</div>` : ''}
                      ${f.differentialDiagnosis && f.differentialDiagnosis.length > 0 ? `
                        <div><b>Chẩn đoán phân biệt:</b> ${f.differentialDiagnosis.join(', ')}</div>
                      ` : ''}
                      ${f.clinicalCorrelation ? `<div><b>Tương quan lâm sàng:</b> ${f.clinicalCorrelation}</div>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderCasesView(): string {
    return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.25rem;">
        ${this.cases.map(c => `
          <div class="xray-findings-card" style="display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <span class="xray-badge xray-badge--mild">${this.getExamLabel(c.examType)}</span>
              <span style="font-size: 0.76rem; color: var(--xray-muted); font-family: var(--xray-font-mono);">${c.patientGender === 'M' ? 'Nam' : 'Nữ'}, ${c.patientAge}T</span>
            </div>

            <h3 style="font-family: var(--xray-font-display); font-size: 1.15rem; font-weight: 700; color: var(--xray-ink); margin: 0 0 0.4rem;">
              ${c.title}
            </h3>
            <p style="font-size: 0.82rem; color: var(--xray-ink2); margin: 0 0 0.85rem; line-height: 1.5; flex: 1;">
              ${c.clinicalHistory}
            </p>

            <div style="background: var(--xray-bg); padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid var(--xray-line); margin-bottom: 1rem; font-size: 0.78rem;">
              <div><b>Chẩn đoán:</b> ${c.diagnosis || c.title}</div>
              <div style="color: var(--xray-muted); margin-top: 0.2rem;">${c.findings.length} tổn thương trên phim</div>
            </div>

            <button class="xray-btn xray-btn--primary btn-open-case-pacs" data-case-id="${c.id}" style="width: 100%; justify-content: center;">
              <i class="fa-solid fa-desktop"></i> Mở Ca Này Trên PACS
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  private renderKnowledgeView(): string {
    const filtered = this.knowledgeFilter
      ? DEFAULT_KNOWLEDGE.filter(k => k.title.toLowerCase().includes(this.knowledgeFilter.toLowerCase()) || k.content.toLowerCase().includes(this.knowledgeFilter.toLowerCase()))
      : DEFAULT_KNOWLEDGE;

    return `
      <div class="xray-findings-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-family: var(--xray-font-display); font-size: 1.25rem; margin: 0; color: var(--xray-ink);">
              Sổ Tay Dấu Hiệu Hình Ảnh Học X-Quang Lâm Sàng
            </h2>
            <p style="font-size: 0.82rem; color: var(--xray-muted); margin: 0.2rem 0 0;">
              Tra cứu dấu hiệu bóng mờ, phế quản khí, liềm hơi dưới hoành, mức nước-hơi ruột và chẩn đoán phân biệt.
            </p>
          </div>

          <div style="position: relative; width: 320px;">
            <input type="text" id="inp-xray-knowledge-search" placeholder="Tìm dấu hiệu (ví dụ: Silhouette, Air bronchogram...)" value="${this.knowledgeFilter}" style="
              width: 100%;
              padding: 0.5rem 0.85rem;
              border-radius: 8px;
              border: 1px solid var(--xray-line);
              background: var(--xray-bg);
              color: var(--xray-ink);
              font-size: 0.85rem;
            ">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1rem;">
          ${filtered.map(entry => `
            <div style="background: var(--xray-bg); border: 1px solid var(--xray-line); border-radius: 10px; padding: 1.1rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
                <h4 style="font-family: var(--xray-font-display); font-size: 1.05rem; font-weight: 700; color: var(--xray-primary); margin: 0;">
                  ${entry.title}
                </h4>
                <span class="xray-badge xray-badge--mild" style="font-size: 0.68rem;">${entry.category}</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--xray-ink); margin: 0 0 0.6rem; line-height: 1.55;">
                ${entry.content}
              </p>
              ${entry.tags && entry.tags.length > 0 ? `
                <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; border-top: 1px dashed var(--xray-line); padding-top: 0.5rem;">
                  ${entry.tags.map(t => `<span style="font-size: 0.72rem; color: var(--xray-muted);">#${t}</span>`).join(' ')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private initCanvas(): void {
    if (this.currentTab !== 'pacs') return;
    const canvas = this.container.querySelector('#xray-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    this.renderer = new XRayCanvasRenderer(canvas);
    this.renderer.setExamData(this.currentCase.examType, this.currentCase.findings, this.activeFindingId);

    this.renderer.setOnSelectFinding((finding) => {
      this.activeFindingId = finding ? finding.id : null;
      this.highlightFindingInList(this.activeFindingId);
    });
  }

  private attachEventListeners(): void {
    // Tab switching
    this.container.querySelectorAll('.xray-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = (e.currentTarget as HTMLElement).dataset.tab as any;
        if (tab && tab !== this.currentTab) {
          this.currentTab = tab;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
        }
      });
    });

    // Case dropdown switch
    const caseSelect = this.container.querySelector('#select-case-dropdown') as HTMLSelectElement;
    if (caseSelect) {
      caseSelect.addEventListener('change', (e) => {
        const id = (e.target as HTMLSelectElement).value;
        const c = this.cases.find(x => x.id === id);
        if (c) {
          this.currentCase = c;
          this.activeFindingId = null;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
        }
      });
    }

    // Open case button in cases tab
    this.container.querySelectorAll('.btn-open-case-pacs').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.caseId;
        const c = this.cases.find(x => x.id === id);
        if (c) {
          this.currentCase = c;
          this.currentTab = 'pacs';
          this.activeFindingId = null;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
          this.showToast(`Đã mở ${c.title} trên màn hình PACS!`);
        }
      });
    });

    // PACS Viewport Controls
    const btnInvert = this.container.querySelector('#pacs-btn-invert');
    if (btnInvert && this.renderer) {
      btnInvert.addEventListener('click', () => {
        const next = !this.renderer!.state.inverted;
        this.renderer!.updateState({ inverted: next });
        btnInvert.classList.toggle('active', next);
      });
    }

    const btnOverlay = this.container.querySelector('#pacs-btn-overlay');
    if (btnOverlay && this.renderer) {
      btnOverlay.addEventListener('click', () => {
        const next = !this.renderer!.state.showOverlay;
        this.renderer!.updateState({ showOverlay: next });
        btnOverlay.classList.toggle('active', next);
      });
    }

    const btnZoomIn = this.container.querySelector('#pacs-btn-zoom-in');
    if (btnZoomIn && this.renderer) {
      btnZoomIn.addEventListener('click', () => {
        this.renderer!.updateState({ zoom: Math.min(this.renderer!.state.zoom * 1.2, 3.5) });
      });
    }

    const btnZoomOut = this.container.querySelector('#pacs-btn-zoom-out');
    if (btnZoomOut && this.renderer) {
      btnZoomOut.addEventListener('click', () => {
        this.renderer!.updateState({ zoom: Math.max(this.renderer!.state.zoom / 1.2, 0.5) });
      });
    }

    const btnResetView = this.container.querySelector('#pacs-btn-reset-view');
    if (btnResetView && this.renderer) {
      btnResetView.addEventListener('click', () => {
        this.renderer!.resetTransform();
      });
    }

    const sliderBright = this.container.querySelector('#pacs-slider-brightness') as HTMLInputElement;
    if (sliderBright && this.renderer) {
      sliderBright.addEventListener('input', (e) => {
        this.renderer!.updateState({ brightness: parseInt((e.target as HTMLInputElement).value, 10) });
      });
    }

    const sliderContrast = this.container.querySelector('#pacs-slider-contrast') as HTMLInputElement;
    if (sliderContrast && this.renderer) {
      sliderContrast.addEventListener('input', (e) => {
        this.renderer!.updateState({ contrast: parseInt((e.target as HTMLInputElement).value, 10) });
      });
    }

    // Findings Item Click
    this.container.querySelectorAll('.xray-finding-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.findingId || null;
        this.activeFindingId = id;
        this.renderer?.setActiveFinding(id);
        this.highlightFindingInList(id);
      });
    });

    // Reset PACS button in header
    const btnResetPacs = this.container.querySelector('#btn-reset-pacs');
    if (btnResetPacs && this.renderer) {
      btnResetPacs.addEventListener('click', () => {
        this.renderer!.resetTransform();
        if (sliderBright) sliderBright.value = '0';
        if (sliderContrast) sliderContrast.value = '0';
        if (btnInvert) btnInvert.classList.remove('active');
        this.showToast('Đã đặt lại các thông số hiển thị PACS!');
      });
    }

    // Knowledge search
    const searchInp = this.container.querySelector('#inp-xray-knowledge-search') as HTMLInputElement;
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        this.knowledgeFilter = (e.target as HTMLInputElement).value;
        this.render();
        this.attachEventListeners();
        const newInp = this.container.querySelector('#inp-xray-knowledge-search') as HTMLInputElement;
        if (newInp) {
          newInp.focus();
          newInp.setSelectionRange(newInp.value.length, newInp.value.length);
        }
      });
    }

    // Export SOAP button
    const soapBtn = this.container.querySelector('#btn-export-soap');
    if (soapBtn) {
      soapBtn.addEventListener('click', () => {
        this.exportToSoap();
      });
    }
  }

  private highlightFindingInList(id: string | null): void {
    this.container.querySelectorAll('.xray-finding-item').forEach(el => {
      const isMatch = (el as HTMLElement).dataset.findingId === id;
      el.classList.toggle('active', isMatch);
      if (isMatch) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  private exportToSoap(): void {
    const c = this.currentCase;
    const findingsSummary = c.findings.map(f => 
      `- ${f.nameVi || f.name} (${f.location}): ${f.description}${f.radiographicSign ? ` (Dấu hiệu: ${f.radiographicSign})` : ''}`
    ).join('\n');

    const soapText = `[O - CẬN LÂM SÀNG HÌNH ẢNH HỌC]
X-quang ${this.getExamLabel(c.examType)}:
${findingsSummary}

[A - CHẨN ĐOÁN HÌNH ẢNH HỌC]
- Kết luận: ${c.diagnosis || c.title}
- Chẩn đoán phân biệt: ${c.findings.flatMap(f => f.differentialDiagnosis || []).slice(0, 3).join('; ') || 'Không ghi nhận thêm'}

[P - HƯỚNG XỬ TRÍ & ĐỀ NGHỊ]
- Kế hoạch: ${c.notes || 'Đối chiếu lâm sàng, theo dõi sát tiến triển'}
- Đề nghị cận lâm sàng tiếp theo: Chụp CT Scan ngực/bụng hoặc siêu âm kiểm tra nếu triệu chứng không thuyên giảm.`;

    navigator.clipboard.writeText(soapText).then(() => {
      this.showToast('Đã sao chép kết luận X-quang vào khay nhớ tạm (SOAP)!');
    }).catch(() => {
      this.showToast('Sao chép thất bại! Vui lòng cấp quyền clipboard.');
    });
  }

  private getExamLabel(t: ExamType): string {
    switch (t) {
      case 'chest_pa': return 'Ngực thẳng (PA)';
      case 'chest_lateral': return 'Ngực nghiêng';
      case 'abdomen_supine': return 'Bụng nằm ngửa';
      case 'abdomen_erect': return 'Bụng đứng';
      default: return t;
    }
  }

  private getSeverityBadgeClass(s: string): string {
    switch (s) {
      case 'critical': return 'xray-badge--critical';
      case 'severe': return 'xray-badge--severe';
      case 'moderate': return 'xray-badge--moderate';
      default: return 'xray-badge--mild';
    }
  }

  private getSeverityColor(s: string): string {
    switch (s) {
      case 'critical': return '#ef4444';
      case 'severe': return '#f97316';
      case 'moderate': return '#f59e0b';
      default: return '#10b981';
    }
  }

  private getSeverityLabel(s: string): string {
    switch (s) {
      case 'critical': return 'Nguy kịch';
      case 'severe': return 'Nặng';
      case 'moderate': return 'Trung bình';
      default: return 'Nhẹ';
    }
  }

  private showToast(msg: string): void {
    const toast = document.getElementById('xray-toast');
    const toastMsg = document.getElementById('xray-toast-msg');
    if (toast && toastMsg) {
      toastMsg.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
}
