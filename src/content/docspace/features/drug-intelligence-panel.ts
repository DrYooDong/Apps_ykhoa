/**
 * Drug Intelligence Panel - DocSpace
 * Trung tâm Dược lý Lâm sàng, Tra cứu Dược thư & Kiểm tra Tương tác Thuốc Đa tương tác
 */

import { DRUG_FORMULARY_DATABASE, DRUG_INTERACTIONS, DrugFormularyItem, DrugInteractionRule } from '../data/drug-interactions';
import { SoapPatientRecord } from '../types';
import { escapeHtml } from '../docspace-view';

export class DrugIntelligencePanel {
  private modalEl: HTMLElement;
  private targetInputId: string = '';
  private activePatient: SoapPatientRecord | null = null;
  private onSelectCallback?: (drug: DrugFormularyItem) => void;
  private selectedDrugsForCheck: string[] = [];
  private currentTab: 'formulary' | 'interactions' = 'formulary';
  private selectedDrugDetail: DrugFormularyItem | null = null;

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalDrugIntelligencePanel';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1060';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(4px)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.style.display === 'flex') {
        this.close();
      }
    });
  }

  public open(targetInputId: string = '', patient: SoapPatientRecord | null = null, onSelectCallback?: (drug: DrugFormularyItem) => void) {
    this.targetInputId = targetInputId;
    this.activePatient = patient;
    this.onSelectCallback = onSelectCallback;
    this.selectedDrugDetail = DRUG_FORMULARY_DATABASE[0] || null;

    this.renderLayout();
    this.modalEl.style.display = 'flex';
    this.bindEvents();
  }

  public close() {
    this.modalEl.style.display = 'none';
  }

  private renderLayout() {
    const patientBadge = this.activePatient
      ? `<span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-size:11px;">
          <i class="fa-solid fa-user-injured"></i> ${escapeHtml(this.activePatient.fullName)} (BN: ${this.activePatient.patientCode || 'N/A'})
         </span>`
      : '';

    this.modalEl.innerHTML = `
      <div class="dip-modal-card" style="background:var(--color-surface, #ffffff); width:100%; max-width:1100px; height:88vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid var(--color-border, #e2e8f0); position:relative; font-family:inherit;">
        
        <!-- Header -->
        <div class="dip-modal-header" style="padding:14px 20px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div class="dip-header-left" style="display:flex; align-items:center; gap:12px;">
            <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 6px -1px rgba(236,72,153,0.3); flex-shrink:0;">
              <i class="fa-solid fa-pills"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--color-text, #0f172a);">Drug Intelligence Panel</h3>
                <span class="dsp-badge" style="background:#fce7f3; color:#be185d; border:1px solid #fbcfe8; font-size:11px;">Dược lý & Tương tác</span>
                ${patientBadge}
              </div>
              <p class="dip-header-sub" style="margin:2px 0 0; font-size:11.5px; color:var(--color-text-muted, #64748b);">Tra cứu dược thư, chỉnh liều suy thận & kiểm tra tương tác thuốc</p>
            </div>
          </div>

          <!-- Tab switchers & Close -->
          <div class="dip-header-right" style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <div class="dip-header-tabs" style="display:flex; background:var(--color-border, #e2e8f0); padding:3px; border-radius:8px; gap:2px;">
              <button id="dipTabFormulary" style="background:${this.currentTab === 'formulary' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'formulary' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:${this.currentTab === 'formulary' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                <i class="fa-solid fa-book-medical"></i> Dược thư
              </button>
              <button id="dipTabInteractions" style="background:${this.currentTab === 'interactions' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'interactions' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:${this.currentTab === 'interactions' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                <i class="fa-solid fa-triangle-exclamation"></i> Tương tác (${this.selectedDrugsForCheck.length})
              </button>
            </div>
            <button id="btnCloseDrugIntelligence" style="background:none; border:none; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px; cursor:pointer; color:var(--color-text-muted, #64748b); transition:all 0.2s;" title="Đóng (Esc)">&times;</button>
          </div>
        </div>

        <!-- Body Area -->
        <div id="dipBody" style="display:flex; flex:1; overflow:hidden; position:relative;">
          
          <!-- TAB 1: FORMULARY (DUAL PANEL) -->
          <div id="dipFormularyView" class="dip-formulary-view" style="display:${this.currentTab === 'formulary' ? 'flex' : 'none'}; width:100%; height:100%;">
            
            <!-- Left List -->
            <div class="dip-list-panel" style="width:340px; border-right:1px solid var(--color-border, #e2e8f0); display:flex; flex-direction:column; background:var(--color-bg, #f8fafc); flex-shrink:0;">
              <div style="padding:12px; border-bottom:1px solid var(--color-border, #e2e8f0);">
                <div style="position:relative;">
                  <i class="fa-solid fa-search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:var(--color-text-muted, #94a3b8); font-size:13px;"></i>
                  <input type="text" id="dipSearchInput" class="dsp-input" placeholder="Tìm tên thuốc, biệt dược..." style="width:100%; padding:7px 10px 7px 32px; font-size:13px; border-radius:8px; border:1px solid var(--color-border, #cbd5e1); background:var(--color-surface, #fff);" />
                </div>
              </div>
              <div id="dipDrugsList" style="flex:1; overflow-y:auto; padding:8px; display:flex; flex-direction:column; gap:6px;">
                ${this.renderDrugListHtml(DRUG_FORMULARY_DATABASE)}
              </div>
            </div>

            <!-- Right Detail -->
            <div id="dipDrugDetailPanel" class="dip-detail-panel" style="flex:1; overflow-y:auto; padding:24px 28px; background:var(--color-surface, #ffffff);">
              ${this.renderDrugDetailHtml(this.selectedDrugDetail)}
            </div>

          </div>

          <!-- TAB 2: INTERACTIONS CHECKER -->
          <div id="dipInteractionsView" style="display:${this.currentTab === 'interactions' ? 'flex' : 'none'}; width:100%; height:100%; flex-direction:column; padding:20px 24px; overflow-y:auto; background:var(--color-bg, #f8fafc);">
            <div style="background:var(--color-surface, #fff); padding:18px 20px; border-radius:12px; border:1px solid var(--color-border, #e2e8f0); margin-bottom:18px;">
              <h4 style="margin:0 0 8px; font-size:15px; color:var(--color-text, #0f172a); font-weight:700;"><i class="fa-solid fa-layer-group" style="color:var(--color-primary);"></i> Chọn hoặc Nhập danh sách thuốc cần kiểm tra chéo:</h4>
              <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;" id="dipSelectedChips">
                ${this.selectedDrugsForCheck.map(d => `
                  <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; padding:6px 12px; font-size:13px; display:inline-flex; align-items:center; gap:6px;">
                    ${d}
                    <i class="fa-solid fa-times dip-remove-chip" data-drug="${d}" style="cursor:pointer; opacity:0.7;"></i>
                  </span>
                `).join('')}
              </div>
              <div style="display:flex; gap:10px;">
                <input type="text" id="dipInteractionsInput" class="dsp-input" placeholder="Gõ tên thuốc (VD: vancomycin, gentamicin, amiodarone, digoxin) hoặc thêm từ danh mục..." style="flex:1;" />
                <button id="btnRunInteractionCheck" class="dsp-btn dsp-btn-primary"><i class="fa-solid fa-bolt"></i> Kiểm tra Ngay</button>
              </div>
            </div>

            <!-- Interactions Result Container -->
            <div id="dipInteractionsResult" style="display:flex; flex-direction:column; gap:12px;">
              ${this.renderInteractionsResultHtml()}
            </div>

          </div>

        </div>

      </div>
    `;
  }

  private renderDrugListHtml(drugs: DrugFormularyItem[]): string {
    if (!drugs.length) {
      return `<div style="text-align:center; padding:30px; color:var(--color-text-muted);">Không tìm thấy thuốc phù hợp.</div>`;
    }

    return drugs.map(drug => {
      const isSelected = this.selectedDrugDetail?.id === drug.id;
      return `
        <div class="dip-drug-item" data-drug-id="${drug.id}" style="padding:10px 12px; border-radius:8px; cursor:pointer; background:${isSelected ? 'rgba(2, 132, 199, 0.08)' : 'transparent'}; border:1px solid ${isSelected ? 'var(--color-primary, #0284c7)' : 'transparent'}; transition:all 0.15s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2px;">
            <strong style="font-size:13.5px; color:${isSelected ? 'var(--color-primary, #0284c7)' : 'var(--color-text, #0f172a)'};">${escapeHtml(drug.name)}</strong>
            <span style="font-size:10.5px; padding:2px 6px; border-radius:4px; background:#f1f5f9; color:#475569;">${escapeHtml(drug.category.split(' ')[0])}</span>
          </div>
          <div style="font-size:11.5px; color:var(--color-text-muted, #64748b); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${drug.brandNames.join(', ')}
          </div>
        </div>
      `;
    }).join('');
  }

  private renderDrugDetailHtml(drug: DrugFormularyItem | null): string {
    if (!drug) {
      return `<div style="text-align:center; padding:40px; color:var(--color-text-muted);">Chọn một thuốc từ danh sách bên trái để xem chi tiết liều và hướng dẫn.</div>`;
    }

    return `
      <div>
        <div class="dip-detail-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; border-bottom:1px solid var(--color-border, #e2e8f0); padding-bottom:14px; gap:12px; flex-wrap:wrap;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <h2 style="margin:0; font-size:20px; color:var(--color-text, #0f172a); font-weight:800;">${escapeHtml(drug.name)}</h2>
              <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1;">${escapeHtml(drug.category)}</span>
            </div>
            <div style="margin-top:4px; font-size:12.5px; color:var(--color-text-muted, #64748b);">
              <strong>Biệt dược thường gặp:</strong> ${drug.brandNames.join(', ')}
            </div>
          </div>
          
          <div class="dip-detail-actions" style="display:flex; gap:8px; flex-wrap:wrap;">
            <button id="btnAddToCheck" data-drug-name="${drug.name}" class="dsp-btn dsp-btn-secondary dsp-btn-sm" style="font-size:12px;">
              <i class="fa-solid fa-plus"></i> Thêm vào Tương tác
            </button>
            <button id="btnInsertDrugToSoap" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-size:12px;">
              <i class="fa-solid fa-file-medical"></i> Chèn vào Plan
            </button>
          </div>
        </div>

        ${drug.blackBoxWarning ? `
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-left:4px solid #e11d48; padding:12px 14px; border-radius:8px; margin-bottom:16px;">
            <div style="font-size:12px; font-weight:800; color:#9f1239; margin-bottom:2px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-skull-crossbones"></i> CẢNH BÁO BLACK BOX WARNING / NGUY HIỂM:
            </div>
            <div style="font-size:12.5px; color:#881337; line-height:1.4;">
              ${escapeHtml(drug.blackBoxWarning)}
            </div>
          </div>
        ` : ''}

        <!-- Dosing Cards -->
        <div class="dip-dosing-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
          
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="font-size:13px; font-weight:700; color:var(--color-primary, #0284c7); margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-clock"></i> Liều Dùng Tiêu Chuẩn Người Lớn
            </div>
            <div style="font-size:13px; color:var(--color-text, #1e293b); line-height:1.45;">
              ${escapeHtml(drug.standardDose)}
            </div>
          </div>

          <div style="background:#fefce8; border:1px solid #fef08a; border-radius:10px; padding:14px;">
            <div style="font-size:13px; font-weight:700; color:#854d0e; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-droplet"></i> Hiệu Chỉnh Theo Chức Năng Thận (Clcr)
            </div>
            <div style="font-size:13px; color:#713f12; line-height:1.45;">
              ${escapeHtml(drug.renalAdjustment)}
            </div>
          </div>

        </div>

        <!-- Contraindications -->
        <div style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px; margin-bottom:16px;">
          <div style="font-size:13px; font-weight:700; color:var(--color-danger, #ef4444); margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-ban"></i> Chống Chỉ Định & Thận Trọng
          </div>
          <ul style="margin:0; padding-left:18px; font-size:12.5px; color:var(--color-text, #334155); line-height:1.5;">
            ${drug.contraindications.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
          </ul>
        </div>

        <!-- Clinical Pearls -->
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:14px;">
          <div style="font-size:13px; font-weight:700; color:#15803d; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-lightbulb"></i> Clinical Pearls & Lưu Ý Thực Hành Giường Bệnh
          </div>
          <div style="font-size:13px; color:#166534; line-height:1.5;">
            ${escapeHtml(drug.clinicalPearls)}
          </div>
        </div>

      </div>
    `;
  }

  private renderInteractionsResultHtml(): string {
    if (this.selectedDrugsForCheck.length < 2) {
      return `
        <div style="background:var(--color-surface, #fff); border:1px dashed var(--color-border, #cbd5e1); border-radius:12px; padding:30px; text-align:center; color:var(--color-text-muted);">
          <i class="fa-solid fa-capsules" style="font-size:32px; color:var(--color-primary); margin-bottom:10px; opacity:0.6;"></i>
          <p style="margin:0; font-size:14px; font-weight:600;">Cần ít nhất 2 loại thuốc để phân tích tương tác chéo.</p>
          <p style="margin:4px 0 0; font-size:12px;">Hãy nhập tên thuốc vào ô tìm kiếm hoặc click "Thêm vào Kiểm tra Tương tác" từ tab Dược thư.</p>
        </div>
      `;
    }

    const detectedInteractions: DrugInteractionRule[] = [];
    const normalizedList = this.selectedDrugsForCheck.map(d => d.toLowerCase().trim());

    for (const rule of DRUG_INTERACTIONS) {
      const drugA = rule.drug_a.toLowerCase();
      const drugB = rule.drug_b.toLowerCase();

      const hasA = normalizedList.some(item => item.includes(drugA) || drugA.includes(item));
      const hasB = normalizedList.some(item => item.includes(drugB) || drugB.includes(item));

      if (hasA && hasB) {
        detectedInteractions.push(rule);
      }
    }

    if (!detectedInteractions.length) {
      return `
        <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; display:flex; align-items:center; gap:14px;">
          <div style="width:40px; height:40px; border-radius:50%; background:#22c55e; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">
            <i class="fa-solid fa-check"></i>
          </div>
          <div>
            <h4 style="margin:0; font-size:15px; color:#15803d; font-weight:700;">Không phát hiện tương tác nguy hiểm nghiêm trọng trong cơ sở dữ liệu!</h4>
            <p style="margin:2px 0 0; font-size:12.5px; color:#166534;">Các thuốc [${this.selectedDrugsForCheck.join(', ')}] có thể phối hợp, tiếp tục theo dõi lâm sàng.</p>
          </div>
        </div>
      `;
    }

    return detectedInteractions.map(inter => `
      <div style="background:var(--color-surface, #fff); border:1px solid ${inter.severity === 'high' ? '#fecdd3' : '#fed7aa'}; border-left:5px solid ${inter.severity === 'high' ? '#e11d48' : '#f97316'}; border-radius:10px; padding:16px 18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <strong style="font-size:15px; color:var(--color-text, #0f172a); text-transform:capitalize;">${inter.drug_a} + ${inter.drug_b}</strong>
            <span class="dsp-badge" style="background:${inter.severity === 'high' ? '#ffe4e6' : '#ffedd5'}; color:${inter.severity === 'high' ? '#9f1239' : '#9a3412'}; font-weight:700; font-size:11px;">
              ${inter.severity === 'high' ? '⚠️ MỨC ĐỘ NẶNG / NGUY HIỂM' : '⚡ MỨC ĐỘ TRUNG BÌNH'}
            </span>
          </div>
        </div>
        <div style="font-size:13px; color:#334155; margin-bottom:6px; line-height:1.4;">
          <strong>Cơ chế:</strong> ${escapeHtml(inter.mechanism)}
        </div>
        <div style="font-size:13px; color:#1e293b; line-height:1.4; background:${inter.severity === 'high' ? '#fff1f2' : '#fff7ed'}; padding:8px 12px; border-radius:6px;">
          <strong>Khuyến cáo xử trí:</strong> ${escapeHtml(inter.recommendation)}
        </div>
      </div>
    `).join('');
  }

  private bindEvents() {
    // Close button
    document.getElementById('btnCloseDrugIntelligence')?.addEventListener('click', () => this.close());

    // Tab buttons
    document.getElementById('dipTabFormulary')?.addEventListener('click', () => {
      this.currentTab = 'formulary';
      this.renderLayout();
      this.bindEvents();
    });

    document.getElementById('dipTabInteractions')?.addEventListener('click', () => {
      this.currentTab = 'interactions';
      this.renderLayout();
      this.bindEvents();
    });

    // Search filter in formulary
    const searchInput = document.getElementById('dipSearchInput') as HTMLInputElement;
    searchInput?.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      const filtered = DRUG_FORMULARY_DATABASE.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.brandNames.some(b => b.toLowerCase().includes(q)) ||
        d.category.toLowerCase().includes(q)
      );
      const listEl = document.getElementById('dipDrugsList');
      if (listEl) {
        listEl.innerHTML = this.renderDrugListHtml(filtered);
        this.bindDrugListClickEvents();
      }
    });

    this.bindDrugListClickEvents();

    // Add to interaction check button
    document.getElementById('btnAddToCheck')?.addEventListener('click', (e) => {
      const drugName = (e.currentTarget as HTMLElement).getAttribute('data-drug-name');
      if (drugName && !this.selectedDrugsForCheck.includes(drugName)) {
        this.selectedDrugsForCheck.push(drugName);
        this.currentTab = 'interactions';
        this.renderLayout();
        this.bindEvents();
      }
    });

    // Insert drug to SOAP Plan
    document.getElementById('btnInsertDrugToSoap')?.addEventListener('click', () => {
      if (!this.selectedDrugDetail) return;
      const textToInsert = `[Thuốc - ${this.selectedDrugDetail.name}]: ${this.selectedDrugDetail.standardDose} | Chỉnh thận: ${this.selectedDrugDetail.renalAdjustment}`;

      if (this.onSelectCallback) {
        this.onSelectCallback(this.selectedDrugDetail);
      } else if (this.targetInputId) {
        const input = document.getElementById(this.targetInputId) as HTMLTextAreaElement | HTMLInputElement;
        if (input) {
          input.value = input.value ? `${input.value}\n${textToInsert}` : textToInsert;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      this.close();
    });

    // Remove chip in interaction tab
    this.modalEl.querySelectorAll('.dip-remove-chip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const drug = (e.target as HTMLElement).getAttribute('data-drug');
        if (drug) {
          this.selectedDrugsForCheck = this.selectedDrugsForCheck.filter(d => d !== drug);
          this.renderLayout();
          this.bindEvents();
        }
      });
    });

    // Interaction input
    const interInput = document.getElementById('dipInteractionsInput') as HTMLInputElement;
    const btnRunInter = document.getElementById('btnRunInteractionCheck');
    const runCheck = () => {
      if (interInput && interInput.value.trim()) {
        const raw = interInput.value.split(/[,;\n]+/).map(s => s.trim()).filter(Boolean);
        for (const r of raw) {
          if (!this.selectedDrugsForCheck.includes(r)) this.selectedDrugsForCheck.push(r);
        }
        interInput.value = '';
        this.renderLayout();
        this.bindEvents();
      }
    };
    btnRunInter?.addEventListener('click', runCheck);
    interInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runCheck();
    });
  }

  private bindDrugListClickEvents() {
    this.modalEl.querySelectorAll('.dip-drug-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-drug-id');
        this.selectedDrugDetail = DRUG_FORMULARY_DATABASE.find(d => d.id === id) || null;
        
        // Update list styling
        this.modalEl.querySelectorAll('.dip-drug-item').forEach(el => {
          (el as HTMLElement).style.background = 'transparent';
          (el as HTMLElement).style.borderColor = 'transparent';
        });
        (item as HTMLElement).style.background = 'rgba(2, 132, 199, 0.08)';
        (item as HTMLElement).style.borderColor = 'var(--color-primary, #0284c7)';

        const detailPanel = document.getElementById('dipDrugDetailPanel');
        if (detailPanel) {
          detailPanel.innerHTML = this.renderDrugDetailHtml(this.selectedDrugDetail);
          // rebind action buttons
          this.bindEvents();
        }
      });
    });
  }
}

export const drugIntelligencePanel = new DrugIntelligencePanel();
