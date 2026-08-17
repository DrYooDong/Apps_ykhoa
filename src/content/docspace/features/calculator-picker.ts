/**
 * Calculator Picker - DocSpace
 * Kho Thang điểm & Công cụ Tính toán Lâm sàng Native TypeScript
 * Hỗ trợ Dual-Panel, Tự động trích xuất thông số từ Bệnh nhân (Autofill) & Lưu lịch sử
 */

import { BaseCalculator, CalculatorField, CalculatorResult } from '../tools/types';
import { toolRegistry } from '../tools/registry';
import { SoapPatientRecord } from '../types';
import { getActiveProfile, saveCalculatorSession } from '../storage';

export class CalculatorPicker {
  private modalEl: HTMLElement;
  private targetInputId: string = '';
  private activePatient: SoapPatientRecord | null = null;
  private currentTab: 'native' | 'classic' = 'native';
  private selectedCalcId: string = 'qsofa';
  private currentFormValues: Record<string, any> = {};
  private currentResult: CalculatorResult | null = null;
  private legacyCalculators: any[] = [];
  private selectedSpecialty: string = 'all';

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalCalculatorPicker';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1050';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(4px)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  /**
   * Mở modal Kho Thang điểm & Công cụ
   * @param targetInputId ID của ô textarea cần chèn kết quả
   * @param patient Bệnh nhân SOAP đang thao tác (để auto-populate)
   * @param defaultCalcId ID của thang điểm muốn mở ngay (nếu có)
   */
  public async open(targetInputId: string = '', patient: SoapPatientRecord | null = null, defaultCalcId: string = '') {
    this.targetInputId = targetInputId;
    this.activePatient = patient;
    if (defaultCalcId && toolRegistry.get(defaultCalcId)) {
      this.selectedCalcId = defaultCalcId;
      this.currentTab = 'native';
    } else {
      this.selectedCalcId = this.selectedCalcId || 'qsofa';
    }

    this.renderModalLayout();
    this.modalEl.style.display = 'flex';

    await this.loadLegacyCalculators();
    this.bindGlobalEvents();
    this.renderSidebarList();
    this.renderCalculatorDetail(this.selectedCalcId, true);
  }

  public close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private renderModalLayout() {
    const activeDoc = this.activePatient;
    const patientBadge = activeDoc 
      ? `<div style="display:flex; align-items:center; gap:6px; background:rgba(2,132,199,0.1); border:1px solid rgba(2,132,199,0.3); padding:4px 10px; border-radius:20px; font-size:12px; color:var(--color-primary, #0284c7); font-weight:600;">
          <i class="fa-solid fa-user-injured"></i> BN: ${activeDoc.fullName || activeDoc.patientCode} (${activeDoc.age}t)
        </div>`
      : '';

    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #ffffff); width:100%; max-width:1150px; height:88vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid var(--color-border, #e2e8f0); position:relative; font-family:inherit;">
        
        <!-- Header -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #0284c7, #0369a1); color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 6px -1px rgba(2,132,199,0.3);">
              <i class="fa-solid fa-calculator"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:10px;">
                <h3 style="margin:0; font-size:17px; font-weight:700; color:var(--color-text, #0f172a);">Kho Thang Điểm & Công Cụ Lâm Sàng</h3>
                ${patientBadge}
              </div>
              <p style="margin:2px 0 0; font-size:12px; color:var(--color-text-muted, #64748b);">Tích hợp tính điểm nhanh, tra cứu khuyến cáo EBM & tự động điền từ bệnh án</p>
            </div>
          </div>

          <!-- Tabs Switcher & Cross-Module Links & Close -->
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; background:var(--color-border, #e2e8f0); padding:3px; border-radius:8px; gap:2px;">
              <button id="cpTabNative" style="background:${this.currentTab === 'native' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'native' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:${this.currentTab === 'native' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                <i class="fa-solid fa-bolt"></i> Thang điểm Native
              </button>
              <button id="cpTabClassic" style="background:${this.currentTab === 'classic' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'classic' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:${this.currentTab === 'classic' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                <i class="fa-solid fa-folder-open"></i> Kho Mở Rộng 70+
              </button>
            </div>

            <!-- Pathophysiology Links -->
            <a href="#/pathophysiology/formula-vault" class="dsp-btn dsp-btn-sm" style="text-decoration:none; font-size:11px; padding:5px 8px; border-radius:6px; color:#0284c7; border:1px solid rgba(2,132,199,0.3); background:rgba(2,132,199,0.06); font-weight:700; display:inline-flex; align-items:center; gap:4px;" title="Xem Kho Công Thức Sinh Lý Học">
              <i class="fa-solid fa-square-root-variable"></i> Công thức Sinh lý
            </a>
            <a href="#/pathophysiology/simulators" class="dsp-btn dsp-btn-sm" style="text-decoration:none; font-size:11px; padding:5px 8px; border-radius:6px; color:#8b5cf6; border:1px solid rgba(139,92,246,0.3); background:rgba(139,92,246,0.06); font-weight:700; display:inline-flex; align-items:center; gap:4px;" title="Mở Máy Mô Phỏng Sinh Lý Tương Tác">
              <i class="fa-solid fa-bolt"></i> Mô phỏng Sinh lý
            </a>

            <button id="btnCloseCalculatorPicker" style="background:none; border:none; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px; cursor:pointer; color:var(--color-text-muted, #64748b); transition:all 0.2s;" title="Đóng (Esc)">&times;</button>
          </div>
        </div>

        <!-- Main Body Area -->
        <div id="cpBodyContainer" style="display:flex; flex:1; overflow:hidden; position:relative;">
          
          <!-- Native Container (Dual Panel) -->
          <div id="cpNativeContainer" style="display:${this.currentTab === 'native' ? 'flex' : 'none'}; width:100%; height:100%; overflow:hidden;">
            
            <!-- Left Sidebar (Tool Directory) -->
            <div style="width:340px; border-right:1px solid var(--color-border, #e2e8f0); display:flex; flex-direction:column; background:var(--color-bg, #f8fafc); flex-shrink:0;">
              <!-- Search & Filter Header -->
              <div style="padding:12px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; flex-direction:column; gap:8px;">
                <div style="position:relative;">
                  <i class="fa-solid fa-search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--color-text-muted, #94a3b8); font-size:13px;"></i>
                  <input type="text" id="cpNativeSearch" class="dsp-input" placeholder="Tìm kiếm thang điểm (qSOFA, GCS, CHA2DS2)..." style="width:100%; padding:7px 10px 7px 32px; font-size:13px; border-radius:8px; border:1px solid var(--color-border, #cbd5e1); background:var(--color-surface, #fff);" />
                </div>
                <!-- Specialty Filter Chips -->
                <div id="cpSpecialtyFilters" style="display:flex; gap:4px; overflow-x:auto; padding-bottom:2px; scrollbar-width:thin;">
                  <!-- Injected via JS -->
                </div>
              </div>

              <!-- Tools List -->
              <div id="cpToolsList" style="flex:1; overflow-y:auto; padding:8px; display:flex; flex-direction:column; gap:6px;">
                <!-- Injected via JS -->
              </div>
            </div>

            <!-- Right Main Detail Panel (Calculator UI) -->
            <div id="cpToolDetail" style="flex:1; display:flex; flex-direction:column; overflow-y:auto; background:var(--color-surface, #fff); padding:24px 28px;">
              <!-- Injected via JS -->
            </div>

          </div>

          <!-- Classic Legacy Container (Iframe View) -->
          <div id="cpClassicContainer" style="display:${this.currentTab === 'classic' ? 'flex' : 'none'}; width:100%; height:100%; flex-direction:column; overflow:hidden;">
            <div id="cpClassicListView" style="display:flex; flex-direction:column; flex:1; overflow:hidden;">
              <div style="padding:14px 20px; border-bottom:1px solid var(--color-border, #e2e8f0); background:var(--color-bg, #f8fafc);">
                <div style="position:relative;">
                  <i class="fa-solid fa-search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted, #94a3b8);"></i>
                  <input type="text" id="cpClassicSearch" class="dsp-input" placeholder="Tìm trong 70+ công cụ mở rộng (ABG, eGFR, Bù dịch, Thở máy...)..." style="width:100%; padding:8px 12px 8px 36px; border-radius:8px;" />
                </div>
              </div>
              <div id="cpClassicResults" style="padding:16px 20px; overflow-y:auto; flex:1; background:var(--color-bg, #f8fafc);">
                <!-- Injected via JS -->
              </div>
            </div>

            <div id="cpClassicIframeView" style="display:none; flex-direction:column; flex:1; overflow:hidden; position:relative;">
              <div style="background:#e0e7ff; padding:10px 18px; border-bottom:1px solid #c7d2fe; display:flex; justify-content:space-between; align-items:center;">
                <div style="display:flex; align-items:center; gap:10px;">
                  <button id="btnCpClassicBack" style="background:#fff; border:1px solid #c7d2fe; color:#4338ca; padding:5px 12px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:700;"><i class="fa-solid fa-arrow-left"></i> Danh sách</button>
                  <span id="cpClassicIframeTitle" style="font-size:13px; color:#4338ca; font-weight:700;">Công cụ mở rộng</span>
                </div>
                <button id="btnCpClassicInsertResult" style="background:#4f46e5; color:#fff; border:none; padding:6px 16px; border-radius:6px; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 2px 4px rgba(79,70,229,0.3);"><i class="fa-solid fa-download"></i> Chèn Kết Quả</button>
              </div>
              <iframe id="cpIframe" style="width:100%; height:100%; border:none; background:#fff;"></iframe>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  private bindGlobalEvents() {
    document.getElementById('btnCloseCalculatorPicker')?.addEventListener('click', () => this.close());
    
    // Tab switching
    const tabNative = document.getElementById('cpTabNative');
    const tabClassic = document.getElementById('cpTabClassic');
    const nativeContainer = document.getElementById('cpNativeContainer');
    const classicContainer = document.getElementById('cpClassicContainer');

    tabNative?.addEventListener('click', () => {
      this.currentTab = 'native';
      this.renderModalLayout();
      this.bindGlobalEvents();
      this.renderSidebarList();
      this.renderCalculatorDetail(this.selectedCalcId, true);
    });

    tabClassic?.addEventListener('click', () => {
      this.currentTab = 'classic';
      if (nativeContainer) nativeContainer.style.display = 'none';
      if (classicContainer) classicContainer.style.display = 'flex';
      if (tabNative) {
        tabNative.style.background = 'transparent';
        tabNative.style.color = 'var(--color-text-muted, #64748b)';
        tabNative.style.boxShadow = 'none';
      }
      if (tabClassic) {
        tabClassic.style.background = 'var(--color-surface, #fff)';
        tabClassic.style.color = 'var(--color-primary, #0284c7)';
        tabClassic.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }
      this.renderClassicList('');
    });

    // Native Search & Filter
    const searchNative = document.getElementById('cpNativeSearch') as HTMLInputElement;
    searchNative?.addEventListener('input', () => {
      this.renderSidebarList(searchNative.value);
    });

    // Classic Search
    const searchClassic = document.getElementById('cpClassicSearch') as HTMLInputElement;
    searchClassic?.addEventListener('input', () => {
      this.renderClassicList(searchClassic.value);
    });

    document.getElementById('btnCpClassicBack')?.addEventListener('click', () => {
      document.getElementById('cpClassicListView')!.style.display = 'flex';
      document.getElementById('cpClassicIframeView')!.style.display = 'none';
    });

    document.getElementById('btnCpClassicInsertResult')?.addEventListener('click', () => {
      this.scrapeAndInsertResult();
    });
  }

  // ─────────────────────────────────────────────
  // NATIVE CALCULATOR RENDERING & LOGIC
  // ─────────────────────────────────────────────

  private renderSidebarList(query: string = '') {
    const listEl = document.getElementById('cpToolsList');
    const filtersEl = document.getElementById('cpSpecialtyFilters');
    if (!listEl) return;

    let calcs = toolRegistry.search(query);
    if (this.selectedSpecialty !== 'all') {
      calcs = calcs.filter(c => c.specialty === this.selectedSpecialty);
    }

    // Render Filters
    if (filtersEl) {
      const specialties = [{ id: 'all', label: 'Tất cả' }, ...toolRegistry.getSpecialties()];
      filtersEl.innerHTML = specialties.map(s => `
        <button class="cp-spec-chip" data-spec="${s.id}" style="padding:3px 8px; font-size:11px; border-radius:12px; border:1px solid ${this.selectedSpecialty === s.id ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #cbd5e1)'}; background:${this.selectedSpecialty === s.id ? 'var(--color-primary, #0284c7)' : 'var(--color-surface, #fff)'}; color:${this.selectedSpecialty === s.id ? '#fff' : 'var(--color-text-muted, #475569)'}; font-weight:600; cursor:pointer; white-space:nowrap; transition:all 0.15s;">
          ${s.label}
        </button>
      `).join('');

      filtersEl.querySelectorAll('.cp-spec-chip').forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedSpecialty = btn.getAttribute('data-spec') || 'all';
          this.renderSidebarList((document.getElementById('cpNativeSearch') as HTMLInputElement)?.value || '');
        });
      });
    }

    if (calcs.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--color-text-muted, #94a3b8);">
          <i class="fa-solid fa-magnifying-glass" style="font-size:24px; margin-bottom:8px; opacity:0.6;"></i>
          <div style="font-size:13px;">Không tìm thấy thang điểm phù hợp</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = calcs.map(calc => {
      const isSelected = calc.id === this.selectedCalcId;
      return `
        <div class="cp-tool-item" data-id="${calc.id}" style="padding:10px 12px; border-radius:8px; border:1px solid ${isSelected ? 'var(--color-primary, #0284c7)' : 'transparent'}; background:${isSelected ? 'rgba(2,132,199,0.08)' : 'var(--color-surface, #fff)'}; cursor:pointer; display:flex; align-items:flex-start; gap:10px; transition:all 0.15s; box-shadow:0 1px 2px rgba(0,0,0,0.03);">
          <div style="width:32px; height:32px; border-radius:8px; background:${isSelected ? 'var(--color-primary, #0284c7)' : 'rgba(2,132,199,0.1)'}; color:${isSelected ? '#fff' : 'var(--color-primary, #0284c7)'}; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; margin-top:2px;">
            <i class="fa-solid ${calc.icon}"></i>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:13px; font-weight:700; color:${isSelected ? 'var(--color-primary, #0284c7)' : 'var(--color-text, #0f172a)'}; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                ${calc.shortName}
              </span>
              <span style="font-size:10px; padding:1px 6px; border-radius:4px; background:var(--color-border, #e2e8f0); color:var(--color-text-muted, #475569); font-weight:600;">
                ${calc.specialtyLabel}
              </span>
            </div>
            <div style="font-size:11px; color:var(--color-text-muted, #64748b); margin-top:2px; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${calc.name}
            </div>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.cp-tool-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (id) {
          this.selectedCalcId = id;
          this.renderSidebarList((document.getElementById('cpNativeSearch') as HTMLInputElement)?.value || '');
          this.renderCalculatorDetail(id, true);
        }
      });
    });
  }

  private renderCalculatorDetail(calcId: string, autoFillIfAvailable: boolean = true) {
    const container = document.getElementById('cpToolDetail');
    if (!container) return;

    const calc = toolRegistry.get(calcId);
    if (!calc) {
      container.innerHTML = `<div style="text-align:center; padding:60px; color:var(--color-text-muted);">Vui lòng chọn thang điểm từ danh sách bên trái.</div>`;
      return;
    }

    // Initialize or reset form values
    this.currentFormValues = {};
    
    // Set default values from field definitions
    calc.fields.forEach(f => {
      if (f.defaultValue !== undefined) {
        this.currentFormValues[f.id] = f.defaultValue;
      }
    });

    // Auto-fill from patient if requested
    let autofilledCount = 0;
    if (autoFillIfAvailable && this.activePatient && calc.autofillFromPatient) {
      const autofillData = calc.autofillFromPatient(this.activePatient);
      Object.entries(autofillData).forEach(([k, v]) => {
        if (v !== undefined) {
          this.currentFormValues[k] = v;
          autofilledCount++;
        }
      });
    }

    // Render Detail Container
    container.innerHTML = `
      <!-- Tool Header -->
      <div style="border-bottom:1px solid var(--color-border, #e2e8f0); padding-bottom:16px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--color-primary, #0284c7); background:rgba(2,132,199,0.1); padding:2px 8px; border-radius:4px;">
                ${calc.specialtyLabel}
              </span>
              ${autofilledCount > 0 ? `<span style="font-size:11px; font-weight:600; color:#059669; background:#ecfdf5; border:1px solid #a7f3d0; padding:2px 8px; border-radius:12px;"><i class="fa-solid fa-wand-magic-sparkles"></i> Đã tự động điền ${autofilledCount} thông số từ BN</span>` : ''}
            </div>
            <h2 style="margin:0 0 6px 0; font-size:20px; font-weight:700; color:var(--color-text, #0f172a);">
              ${calc.name}
            </h2>
            <p style="margin:0; font-size:13px; color:var(--color-text-muted, #475569); line-height:1.5;">
              ${calc.description}
            </p>
          </div>

          <!-- Autofill Action button if patient exists -->
          ${this.activePatient && calc.autofillFromPatient ? `
            <button id="btnCpReAutofill" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #cbd5e1); color:var(--color-primary, #0284c7); padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; flex-shrink:0; transition:all 0.15s;" title="Trích xuất lại từ Diễn tiến & Sinh hiệu">
              <i class="fa-solid fa-rotate"></i> Lấy lại từ BN
            </button>
          ` : ''}
        </div>

        ${calc.evidenceReference ? `
          <div style="margin-top:10px; font-size:11px; color:var(--color-text-muted, #94a3b8); font-style:italic;">
            <i class="fa-solid fa-book-bookmark"></i> Tham khảo: ${calc.evidenceReference}
          </div>
        ` : ''}
      </div>

      <!-- Two-column Layout: Left Form Inputs | Right Live Result Card -->
      <div style="display:grid; grid-template-columns:1.2fr 1fr; gap:24px; align-items:start;">
        
        <!-- Form Inputs Column -->
        <div style="display:flex; flex-direction:column; gap:16px;">
          <h4 style="margin:0; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted, #64748b); display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-sliders"></i> Thông số đánh giá
          </h4>

          <div id="cpFormFields" style="display:flex; flex-direction:column; gap:12px;">
            ${calc.fields.map(f => this.renderFormField(f, this.currentFormValues[f.id])).join('')}
          </div>
        </div>

        <!-- Result Column -->
        <div style="position:sticky; top:0; display:flex; flex-direction:column; gap:16px;">
          <h4 style="margin:0; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted, #64748b); display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-square-poll-vertical"></i> Kết quả & Khuyến cáo
          </h4>

          <div id="cpResultCard" style="border-radius:12px; padding:18px; border:1px solid var(--color-border, #e2e8f0); background:var(--color-bg, #f8fafc); display:flex; flex-direction:column; gap:12px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
            <!-- Live calculated result injected here -->
          </div>

          <!-- Actions -->
          <div style="display:flex; flex-direction:column; gap:8px;">
            <button id="btnCpInsertNative" style="background:#0284c7; color:#fff; border:none; padding:10px 16px; border-radius:8px; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 6px -1px rgba(2,132,199,0.3); transition:all 0.2s;">
              <i class="fa-solid fa-file-import"></i> Chèn vào Diễn tiến Bệnh án
            </button>
            <button id="btnCpCopyNative" style="background:var(--color-surface, #fff); color:var(--color-text, #0f172a); border:1px solid var(--color-border, #cbd5e1); padding:8px 16px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:all 0.2s;">
              <i class="fa-regular fa-copy"></i> Sao chép kết quả
            </button>
          </div>
        </div>

      </div>
    `;

    this.bindFormEvents(calc);
    this.updateCalculation(calc);

    document.getElementById('btnCpReAutofill')?.addEventListener('click', () => {
      this.renderCalculatorDetail(calcId, true);
    });

    document.getElementById('btnCpInsertNative')?.addEventListener('click', () => {
      this.insertNativeResult(calc);
    });

    document.getElementById('btnCpCopyNative')?.addEventListener('click', () => {
      this.copyNativeResult(calc);
    });
  }

  private renderFormField(field: CalculatorField, currentValue: any): string {
    if (field.type === 'boolean') {
      const isChecked = currentValue === true || currentValue === 'true';
      return `
        <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:10px 12px; display:flex; align-items:flex-start; gap:10px; cursor:pointer;" onclick="const cb = document.getElementById('field_${field.id}'); cb.checked = !cb.checked; cb.dispatchEvent(new Event('change'));">
          <input type="checkbox" id="field_${field.id}" data-fid="${field.id}" ${isChecked ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer; margin-top:2px;" onclick="event.stopPropagation();" />
          <div style="flex:1;">
            <label for="field_${field.id}" style="font-size:13px; font-weight:600; color:var(--color-text, #0f172a); cursor:pointer; display:block; line-height:1.4;">
              ${field.label}
            </label>
            ${field.helpText ? `<div style="font-size:11px; color:var(--color-text-muted, #64748b); margin-top:2px;">${field.helpText}</div>` : ''}
          </div>
        </div>
      `;
    }

    if (field.type === 'select') {
      const options = field.options || [];
      return `
        <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:6px;">
          <label for="field_${field.id}" style="font-size:13px; font-weight:600; color:var(--color-text, #0f172a);">
            ${field.label}
          </label>
          <select id="field_${field.id}" data-fid="${field.id}" class="dsp-input" style="width:100%; padding:8px 10px; border-radius:6px; font-size:13px; border:1px solid var(--color-border, #cbd5e1); background:var(--color-surface, #fff);">
            ${options.map(opt => `
              <option value="${opt.value}" ${String(currentValue) === String(opt.value) ? 'selected' : ''}>
                ${opt.label}
              </option>
            `).join('')}
          </select>
          ${field.helpText ? `<div style="font-size:11px; color:var(--color-text-muted, #64748b);">${field.helpText}</div>` : ''}
        </div>
      `;
    }

    if (field.type === 'number') {
      const val = currentValue !== undefined ? currentValue : '';
      return `
        <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label for="field_${field.id}" style="font-size:13px; font-weight:600; color:var(--color-text, #0f172a);">
              ${field.label}
            </label>
            ${field.unit ? `<span style="font-size:12px; font-weight:600; color:var(--color-text-muted, #64748b);">${field.unit}</span>` : ''}
          </div>
          <input type="number" id="field_${field.id}" data-fid="${field.id}" class="dsp-input" value="${val}" min="${field.min ?? ''}" max="${field.max ?? ''}" step="${field.step ?? 'any'}" placeholder="${field.placeholder || ''}" style="width:100%; padding:8px 10px; border-radius:6px; font-size:13px; border:1px solid var(--color-border, #cbd5e1); background:var(--color-surface, #fff);" />
          ${field.helpText ? `<div style="font-size:11px; color:var(--color-text-muted, #64748b);">${field.helpText}</div>` : ''}
        </div>
      `;
    }

    return '';
  }

  private bindFormEvents(calc: BaseCalculator) {
    const fieldsContainer = document.getElementById('cpFormFields');
    if (!fieldsContainer) return;

    fieldsContainer.querySelectorAll('input, select').forEach(input => {
      const fid = input.getAttribute('data-fid');
      if (!fid) return;

      const handler = () => {
        if (input instanceof HTMLInputElement && input.type === 'checkbox') {
          this.currentFormValues[fid] = input.checked;
        } else if (input instanceof HTMLInputElement && input.type === 'number') {
          this.currentFormValues[fid] = input.value === '' ? undefined : Number(input.value);
        } else if (input instanceof HTMLSelectElement) {
          this.currentFormValues[fid] = input.value;
        }
        this.updateCalculation(calc);
      };

      input.addEventListener('input', handler);
      input.addEventListener('change', handler);
    });
  }

  private updateCalculation(calc: BaseCalculator) {
    const resultCard = document.getElementById('cpResultCard');
    if (!resultCard) return;

    try {
      const res = calc.calculate(this.currentFormValues);
      this.currentResult = res;

      let severityBg = '#f0fdf4';
      let severityBorder = '#bbf7d0';
      let severityColor = '#15803d';
      let icon = 'fa-circle-check';

      if (res.severity === 'moderate') {
        severityBg = '#fffbeb';
        severityBorder = '#fde68a';
        severityColor = '#b45309';
        icon = 'fa-triangle-exclamation';
      } else if (res.severity === 'high' || res.severity === 'critical') {
        severityBg = '#fef2f2';
        severityBorder = '#fecaca';
        severityColor = '#b91c1c';
        icon = 'fa-circle-exclamation';
      }

      resultCard.innerHTML = `
        <div style="background:${severityBg}; border:1px solid ${severityBorder}; border-radius:10px; padding:12px 14px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <i class="fa-solid ${icon}" style="color:${severityColor}; font-size:16px;"></i>
            <span style="font-size:14px; font-weight:800; color:${severityColor};">
              ${res.label}
            </span>
          </div>
          ${res.score !== undefined && res.maxScore !== undefined ? `
            <div style="font-size:12px; color:${severityColor}; font-weight:600; opacity:0.9;">
              Điểm số: ${res.score} / ${res.maxScore}
            </div>
          ` : ''}
        </div>

        <div>
          <div style="font-size:12px; font-weight:700; color:var(--color-text, #0f172a); margin-bottom:4px; text-transform:uppercase; letter-spacing:0.02em;">
            Khuyến cáo lâm sàng:
          </div>
          <div style="font-size:12.5px; color:var(--color-text, #1e293b); line-height:1.5; background:var(--color-surface, #fff); padding:10px 12px; border-radius:8px; border:1px solid var(--color-border, #e2e8f0);">
            ${res.recommendation}
          </div>
        </div>

        ${res.details && res.details.length > 0 ? `
          <div>
            <div style="font-size:11px; font-weight:700; color:var(--color-text-muted, #64748b); margin-bottom:4px;">
              Tiêu chuẩn đạt được:
            </div>
            <ul style="margin:0; padding-left:18px; font-size:11.5px; color:var(--color-text-muted, #475569); line-height:1.4;">
              ${res.details.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      `;
    } catch (err) {
      console.error('Calculation error', err);
      resultCard.innerHTML = `<div style="color:var(--color-danger, #ef4444); font-size:12px;">Đang đợi nhập đủ thông số...</div>`;
    }
  }

  private insertNativeResult(calc: BaseCalculator) {
    if (!this.currentResult) return;

    const textToInsert = `\n${this.currentResult.textForInsert}\n`;
    
    // Save session to doctor's history
    const profile = getActiveProfile();
    if (profile) {
      saveCalculatorSession(profile.id, {
        calculatorId: calc.id,
        calculatorName: calc.name,
        patientId: this.activePatient?.id,
        inputs: this.currentFormValues,
        result: {
          score: this.currentResult.score,
          maxScore: this.currentResult.maxScore,
          label: this.currentResult.label,
          severity: this.currentResult.severity,
          textForInsert: this.currentResult.textForInsert
        }
      });
    }

    if (this.targetInputId) {
      const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
      if (textarea) {
        const startPos = textarea.selectionStart ?? textarea.value.length;
        const endPos = textarea.selectionEnd ?? textarea.value.length;

        textarea.value = textarea.value.substring(0, startPos)
          + textToInsert
          + textarea.value.substring(endPos, textarea.value.length);

        textarea.selectionStart = startPos + textToInsert.length;
        textarea.selectionEnd = startPos + textToInsert.length;
        textarea.focus();
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }

    this.close();
  }

  private copyNativeResult(calc: BaseCalculator) {
    if (!this.currentResult) return;
    navigator.clipboard.writeText(this.currentResult.textForInsert).then(() => {
      const btn = document.getElementById('btnCpCopyNative');
      if (btn) {
        btn.innerHTML = '<i class="fa-solid fa-check" style="color:#059669;"></i> Đã sao chép!';
        setTimeout(() => {
          btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép kết quả';
        }, 1500);
      }
    });
  }

  // ─────────────────────────────────────────────
  // CLASSIC (LEGACY) CALCULATOR METHODS
  // ─────────────────────────────────────────────

  private async loadLegacyCalculators() {
    try {
      const res = await fetch('content/calculators/index.json');
      this.legacyCalculators = await res.json();
    } catch (err) {
      console.error('Failed to load calculators index', err);
    }
  }

  private renderClassicList(query: string) {
    const listContainer = document.getElementById('cpClassicResults');
    if (!listContainer) return;

    const lowerQuery = query.toLowerCase().trim();
    let results = this.legacyCalculators.filter(c => c.type === 'calculator' || c.type === 'studio');

    if (lowerQuery) {
      results = results.filter((c: any) => 
        (c.name && c.name.toLowerCase().includes(lowerQuery)) || 
        (c.subcategory && c.subcategory.toLowerCase().includes(lowerQuery))
      );
    }

    if (results.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--color-text-muted);">
          <h3>Không tìm thấy công cụ</h3>
        </div>
      `;
      return;
    }

    const grouped = results.reduce((acc: any, curr: any) => {
      const cat = curr.subcategory || 'general';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(curr);
      return acc;
    }, {});

    let html = '';
    for (const [cat, items] of Object.entries(grouped)) {
      html += `
        <div style="margin-bottom:20px;">
          <h4 style="margin:0 0 10px 0; font-size:13px; color:var(--color-text-muted); text-transform:uppercase; border-bottom:1px solid var(--color-border); padding-bottom:4px; font-weight:700;">
            Phân hệ: ${cat}
          </h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:10px;">
            ${(items as any[]).map(c => `
              <div class="cp-legacy-item" data-id="${c.id}" style="padding:12px; background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:10px; transition:all 0.2s;">
                <div style="width:36px; height:36px; border-radius:8px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; color:var(--color-primary); font-size:16px; flex-shrink:0;">
                  <i class="fa-solid fa-square-root-variable"></i>
                </div>
                <div style="flex:1; min-width:0;">
                  <div style="font-size:13px; font-weight:700; color:var(--color-primary); line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    listContainer.innerHTML = html;

    listContainer.querySelectorAll('.cp-legacy-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const calc = this.legacyCalculators.find(c => c.id === id);
        if (calc) {
          if (calc.route) {
            this.close();
            window.location.hash = calc.route;
          } else {
            this.showClassicIframeView(calc);
          }
        }
      });
    });
  }

  private showClassicIframeView(calc: any) {
    document.getElementById('cpClassicListView')!.style.display = 'none';
    document.getElementById('cpClassicIframeView')!.style.display = 'flex';
    document.getElementById('cpClassicIframeTitle')!.innerHTML = `<i class="fa-solid fa-calculator"></i> ${calc.name}`;

    const iframe = document.getElementById('cpIframe') as HTMLIFrameElement;
    iframe.src = calc.path.replace('./src/', '');
  }

  private scrapeAndInsertResult() {
    const iframe = document.getElementById('cpIframe') as HTMLIFrameElement;
    if (!iframe || !iframe.contentWindow) return;

    try {
      const idoc = iframe.contentWindow.document;
      const resultBox = idoc.querySelector('#result-box, .result-box, #result, .alert-success, .alert-danger, .alert-warning') as HTMLElement;
      
      let resultText = '';
      if (resultBox) {
        resultText = resultBox.innerText.trim();
      } else {
        const h3 = idoc.querySelector('h3, h4');
        if (h3) resultText = (h3 as HTMLElement).innerText.trim();
      }

      if (!resultText) {
        alert('Không tìm thấy vùng kết quả trong công cụ này. Vui lòng copy thủ công.');
        return;
      }

      const cleanText = resultText.replace(/\n\s*\n/g, '\n').trim();
      if (this.targetInputId) {
        const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
        if (textarea) {
          const textToInsert = `\n[KQ Thang điểm]: ${cleanText}\n`;
          const startPos = textarea.selectionStart ?? textarea.value.length;
          const endPos = textarea.selectionEnd ?? textarea.value.length;
          
          textarea.value = textarea.value.substring(0, startPos)
            + textToInsert
            + textarea.value.substring(endPos, textarea.value.length);
            
          textarea.selectionStart = startPos + textToInsert.length;
          textarea.selectionEnd = startPos + textToInsert.length;
          textarea.focus();
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      
      this.close();
    } catch (err) {
      console.error(err);
      alert('Không thể đọc kết quả từ công cụ. Vui lòng copy thủ công.');
    }
  }
}

export const calculatorPicker = new CalculatorPicker();
