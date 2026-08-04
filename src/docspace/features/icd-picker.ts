/**
 * ICD-10 Picker & Clinical Navigation Hub - DocSpace
 * Công cụ tìm kiếm mã ICD-10 & Trung tâm Điều hướng Lâm sàng (Disease Command Center)
 */

import { findOrderSetByIcd, OrderSet } from '../data/disease-order-sets';

export interface IcdRecord {
  code: string;
  name: string;
  nameEn?: string;
}

export class IcdPicker {
  private modalEl: HTMLElement;
  private targetInputId: string = '';
  private searchInput: HTMLInputElement | null = null;
  private resultsContainer: HTMLElement | null = null;
  private debounceTimer: number | null = null;

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalIcdPicker';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1000';
    this.modalEl.style.background = 'rgba(0,0,0,0.6)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '20px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  public async open(targetInputId: string) {
    this.targetInputId = targetInputId;
    this.renderSearchMode();
    this.modalEl.style.display = 'flex';

    await this.loadIcdData();
    
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private renderSearchMode() {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #17213c); color:var(--color-text, #f8fafc); width:100%; max-width:750px; max-height:85vh; border-radius:16px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.5); border:1px solid var(--color-border, #2e3d66);">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-surface-offset, #222f52);">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary, #38bdf8); font-weight:800; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-compass"></i> Tra cứu ICD-10 & Clinical Hub
          </h3>
          <button id="btnCloseIcdPicker" class="dsp-icon-btn" style="font-size:24px; color:var(--color-text-muted);">&times;</button>
        </div>
        
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); background:var(--color-surface);">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:16px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:1.1rem;"></i>
            <input type="text" id="icdSearchInput" class="dsp-input" placeholder="Gõ tên bệnh hoặc mã bệnh (VD: Suy tim, Tăng huyết áp, I10, E11)..." style="width:100%; padding-left:46px; min-height:48px;" />
          </div>
        </div>

        <div id="icdResults" style="padding:0; overflow-y:auto; flex:1; background:var(--color-bg);">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Nhập từ khóa để tìm bệnh. Mã có lộ trình xử trí chuẩn sẽ có huy hiệu <span style="color:var(--color-primary); font-weight:700;">★ Order Set</span>.</div>
        </div>
      </div>
    `;

    document.getElementById('btnCloseIcdPicker')?.addEventListener('click', () => this.close());

    this.searchInput = document.getElementById('icdSearchInput') as HTMLInputElement;
    this.resultsContainer = document.getElementById('icdResults');

    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = window.setTimeout(() => this.search(this.searchInput!.value), 300);
      });
    }
  }

  private async loadIcdData() {
    if ((window as any).ICD10_DB) {
      return;
    }

    const candidatePaths = [
      'src/content/approaches/data/icd10-db.json',
      '/src/content/approaches/data/icd10-db.json',
      './src/content/approaches/data/icd10-db.json',
      '../src/content/approaches/data/icd10-db.json',
      '../../src/content/approaches/data/icd10-db.json',
      'content/approaches/data/icd10-db.json',
      '/content/approaches/data/icd10-db.json'
    ];

    for (const path of candidatePaths) {
      try {
        const resp = await fetch(path);
        if (resp.ok) {
          (window as any).ICD10_DB = await resp.json();
          return;
        }
      } catch {
        // Try next
      }
    }
  }

  private search(query: string) {
    if (!this.resultsContainer) return;

    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) {
      this.resultsContainer.innerHTML = '<div style="text-align:center; padding:40px; color:var(--color-text-muted);">Nhập từ khóa để tìm bệnh.</div>';
      return;
    }

    const icdData: IcdRecord[] = (window as any).ICD10_DB;
    if (!icdData) {
      this.resultsContainer.innerHTML = '<div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang tải dữ liệu ICD-10...</div>';
      return;
    }

    const results = icdData
      .filter(item => 
        item.code.toLowerCase().includes(lowerQuery) || 
        (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
        ((item as any).nameEn && (item as any).nameEn.toLowerCase().includes(lowerQuery))
      )
      .slice(0, 50);

    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <h3 style="color:var(--color-text-muted);">Không tìm thấy mã bệnh</h3>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        ${results.map((r: any, idx: number) => this.renderItem(r, idx)).join('')}
      </div>
    `;

    results.forEach((r: any, idx: number) => {
      document.getElementById(`icd-item-${idx}`)?.addEventListener('click', () => {
        this.handleSelectRecord(r);
      });
    });
  }

  private renderItem(r: any, idx: number): string {
    const orderSet = findOrderSetByIcd(r.code);
    return `
      <div id="icd-item-${idx}" style="padding:16px 20px; border-bottom:1px solid var(--color-border); cursor:pointer; background:var(--color-surface); transition:background 0.2s; display:flex; align-items:center; justify-content:space-between; gap:14px;" onmouseover="this.style.background='var(--color-surface-offset)'" onmouseout="this.style.background='var(--color-surface)'">
        <div style="display:flex; align-items:flex-start; gap:14px;">
          <span style="font-size:13px; font-weight:800; color:var(--color-primary); background:var(--color-surface-offset); border:1px solid var(--color-border); padding:4px 10px; border-radius:6px; white-space:nowrap; margin-top: 2px;">
            ${r.code}
          </span>
          <div style="display:flex; flex-direction:column; gap:3px;">
            <span style="font-size:15px; color:var(--color-text); font-weight:600; line-height:1.4;">
              ${r.name}
            </span>
            ${r.nameEn ? `<span style="font-size:13px; color:var(--color-text-muted);">${r.nameEn}</span>` : ''}
          </div>
        </div>
        ${orderSet ? `
          <span style="font-size:12px; font-weight:700; color:#38bdf8; background:rgba(56, 189, 248, 0.15); border:1px solid rgba(56, 189, 248, 0.3); padding:4px 10px; border-radius:12px; white-space:nowrap; display:flex; align-items:center; gap:4px;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Order Set
          </span>
        ` : ''}
      </div>
    `;
  }

  private handleSelectRecord(r: IcdRecord) {
    const orderSet = findOrderSetByIcd(r.code);
    if (orderSet) {
      // Chuyển sang màn hình Disease Command Center View
      this.renderCommandCenterView(r, orderSet);
    } else {
      // Chèn trực tiếp tên bệnh nếu không có order set
      this.quickInsertDisease(r);
    }
  }

  private renderCommandCenterView(r: IcdRecord, orderSet: OrderSet) {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #17213c); color:var(--color-text, #f8fafc); width:100%; max-width:800px; max-height:90vh; border-radius:16px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.5); border:1px solid var(--color-border, #2e3d66);">
        <!-- Header -->
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-surface-offset, #222f52);">
          <div style="display:flex; align-items:center; gap:12px;">
            <button id="btnBackToSearch" class="dsp-btn dsp-btn-sm dsp-btn-outline" style="padding:4px 10px; font-size:13px;">
              <i class="fa-solid fa-arrow-left"></i> Tìm mã khác
            </button>
            <h3 style="margin:0; font-size:17px; color:var(--color-primary, #38bdf8); font-weight:800; display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-compass"></i> Clinical Hub: ${r.name} (${r.code})
            </h3>
          </div>
          <button id="btnCloseIcdPicker" class="dsp-icon-btn" style="font-size:24px; color:var(--color-text-muted);">&times;</button>
        </div>

        <!-- Body Scrollable -->
        <div style="padding:20px; overflow-y:auto; flex:1; background:var(--color-bg); display:flex; flex-direction:column; gap:18px;">
          <!-- Strategy Summary Alert -->
          <div style="background:rgba(56, 189, 248, 0.08); border-left:4px solid var(--color-primary); padding:14px 16px; border-radius:8px;">
            <div style="font-size:14px; font-weight:700; color:var(--color-primary); margin-bottom:4px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-lightbulb"></i> Chiến lược điều trị cốt lõi
            </div>
            <div style="font-size:13.5px; color:var(--color-text); line-height:1.5;">
              ${orderSet.summary}
            </div>
          </div>

          <!-- Guidelines Section -->
          ${orderSet.guidelines.length > 0 ? `
          <div>
            <h4 style="margin:0 0 10px 0; font-size:14px; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-book-medical" style="color:var(--color-primary);"></i> Phác đồ & Guidelines Liên Quan
            </h4>
            <div style="display:flex; flex-direction:column; gap:8px;">
              ${orderSet.guidelines.map((g, i) => `
                <div style="background:var(--color-surface); border:1px solid var(--color-border); padding:12px 16px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:14px; font-weight:600; color:var(--color-text);">${g.title}</span>
                  <a href="${g.link}" target="_blank" class="dsp-btn dsp-btn-sm dsp-btn-ghost" style="color:var(--color-primary); font-size:13px; text-decoration:none;">
                    <i class="fa-solid fa-external-link"></i> Xem phác đồ
                  </a>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- Suggested Drugs Section (Order Set) -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <h4 style="margin:0; font-size:14px; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-capsules" style="color:#a855f7;"></i> Bộ Thuốc Gợi Ý (Order Set)
              </h4>
              <span style="font-size:12px; color:var(--color-text-muted);">Tick chọn các thuốc muốn kê đơn vào ca bệnh</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              ${orderSet.suggestedDrugs.map((drug, i) => `
                <label style="background:var(--color-surface); border:1px solid var(--color-border); padding:12px 16px; border-radius:8px; display:flex; align-items:flex-start; gap:12px; cursor:pointer; transition:background 0.2s;" onmouseover="this.style.background='var(--color-surface-offset)'" onmouseout="this.style.background='var(--color-surface)'">
                  <input type="checkbox" class="order-set-drug-cb" data-index="${i}" checked style="margin-top:4px; width:18px; height:18px; accent-color:var(--color-primary);" />
                  <div style="display:flex; flex-direction:column; gap:3px; flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:14.5px; font-weight:700; color:var(--color-primary);">${drug.name}</span>
                      ${drug.note ? `<span style="font-size:12px; background:var(--color-surface-offset); color:var(--color-text-muted); border:1px solid var(--color-border); padding:2px 8px; border-radius:4px;">${drug.note}</span>` : ''}
                    </div>
                    <span style="font-size:13px; color:var(--color-text);"><i class="fa-solid fa-syringe" style="font-size:11px; opacity:0.7;"></i> ${drug.dosage || 'Liều tiêu chuẩn'}</span>
                  </div>
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div style="padding:16px 20px; border-top:1px solid var(--color-border); background:var(--color-surface-offset); display:flex; justify-content:space-between; align-items:center;">
          <button id="btnQuickInsertOnly" class="dsp-btn dsp-btn-ghost" style="color:var(--color-text-muted);">
            Chỉ chèn Tên Bệnh
          </button>

          <button id="btnApplyOrderSet" class="dsp-btn dsp-btn-primary" style="padding:10px 20px; font-size:14px; font-weight:700;">
            <i class="fa-solid fa-circle-check"></i> Áp dụng Y lệnh & Phác đồ
          </button>
        </div>
      </div>
    `;

    document.getElementById('btnCloseIcdPicker')?.addEventListener('click', () => this.close());
    document.getElementById('btnBackToSearch')?.addEventListener('click', () => this.renderSearchMode());
    
    document.getElementById('btnQuickInsertOnly')?.addEventListener('click', () => {
      this.quickInsertDisease(r);
    });

    document.getElementById('btnApplyOrderSet')?.addEventListener('click', () => {
      this.applyFullOrderSet(r, orderSet);
    });
  }

  private quickInsertDisease(r: IcdRecord) {
    const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
    if (textarea) {
      const diseaseName = r.name.toUpperCase();
      const textToInsert = `${diseaseName} (${r.code})`;
      
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      
      const textBefore = textarea.value.substring(0, startPos);
      const prefix = (textBefore.length > 0 && !textBefore.match(/[\s,\n/-]$/)) ? ', ' : '';
      
      const insertStr = prefix + textToInsert;

      textarea.value = textBefore
        + insertStr
        + textarea.value.substring(endPos, textarea.value.length);
        
      textarea.selectionStart = startPos + insertStr.length;
      textarea.selectionEnd = startPos + insertStr.length;
      textarea.focus();
    }
    
    this.close();
  }

  private applyFullOrderSet(r: IcdRecord, orderSet: OrderSet) {
    // 1. Insert Chẩn đoán
    this.quickInsertDisease(r);

    // 2. Thu thập các thuốc đã chọn
    const checkboxes = document.querySelectorAll('.order-set-drug-cb:checked') as NodeListOf<HTMLInputElement>;
    const selectedDrugsText: string[] = [];
    checkboxes.forEach(cb => {
      const idx = parseInt(cb.getAttribute('data-index') || '0', 10);
      const drug = orderSet.suggestedDrugs[idx];
      if (drug) {
        selectedDrugsText.push(`- ${drug.name}: ${drug.dosage || 'Liều chuẩn'}${drug.note ? ` (${drug.note})` : ''}`);
      }
    });

    // 3. Insert vào ô Xử trí (dspCaseMgmt) nếu tồn tại
    if (selectedDrugsText.length > 0) {
      const mgmtTextarea = document.getElementById('dspCaseMgmt') as HTMLTextAreaElement;
      if (mgmtTextarea) {
        const drugBlock = `\nY LỆNH GỢI Ý (${r.code}):\n` + selectedDrugsText.join('\n');
        mgmtTextarea.value = mgmtTextarea.value ? (mgmtTextarea.value.trim() + '\n' + drugBlock) : drugBlock;
      }
    }

    // 4. Insert link Guideline vào ô Reference Link (dspCaseLink) nếu tồn tại
    if (orderSet.guidelines.length > 0) {
      const linkInput = document.getElementById('dspCaseLink') as HTMLInputElement;
      if (linkInput && !linkInput.value) {
        linkInput.value = orderSet.guidelines[0].link;
      }
    }

    this.close();
  }
}

export const icdPicker = new IcdPicker();
