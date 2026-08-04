/**
 * Drug Picker - DocSpace
 * Kết nối tra cứu Dược lý từ thư viện DRUGS_DB để kê đơn thông minh
 */

export class DrugPicker {
  private modalEl: HTMLElement;
  private targetInputId: string = '';
  private onSelectCallback?: (drug: any) => void;
  private searchInput: HTMLInputElement | null = null;
  private resultsContainer: HTMLElement | null = null;
  
  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalDrugPicker';
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

  public async open(targetInputId?: string, onSelectCallback?: (drug: any) => void) {
    this.targetInputId = targetInputId || '';
    this.onSelectCallback = onSelectCallback;
    
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface); color:var(--color-text); width:100%; max-width:700px; max-height:85vh; border-radius:16px; display:flex; flex-direction:column; overflow:hidden; box-shadow:var(--shadow-lg, 0 20px 50px rgba(0,0,0,0.3)); border:1px solid var(--color-border);">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-surface-offset);">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary); font-weight:800;"><i class="fa-solid fa-capsules"></i> Kê đơn (Dược lý)</h3>
          <button id="btnCloseDrugPicker" class="dsp-icon-btn" style="font-size:24px; color:var(--color-text-muted);">&times;</button>
        </div>
        
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); background:var(--color-surface);">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:16px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:1.1rem;"></i>
            <input type="text" id="dpSearchInput" class="dsp-input" placeholder="Gõ tên gốc, biệt dược hoặc nhóm thuốc (VD: Amoxicillin, Augmentin)..." style="width:100%; padding-left:46px; min-height:48px;" />
          </div>
        </div>

        <div id="dpResults" style="padding:0; overflow-y:auto; flex:1; background:var(--color-bg);">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang tải dữ liệu Dược lý...</div>
        </div>
      </div>
    `;
    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseDrugPicker')?.addEventListener('click', () => this.close());
    
    this.searchInput = document.getElementById('dpSearchInput') as HTMLInputElement;
    this.resultsContainer = document.getElementById('dpResults');

    await this.loadDrugsData();
    
    if (this.searchInput) {
      this.searchInput.focus();
      this.searchInput.addEventListener('input', () => {
        this.performSearch(this.searchInput!.value);
      });
      // Hiển thị tất cả mặc định
      this.performSearch('');
    }
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private async loadDrugsData() {
    if (typeof (window as any).DRUGS_DB !== 'undefined' && Array.isArray((window as any).DRUGS_DB) && (window as any).DRUGS_DB.length > 0) {
      return;
    }

    const candidatePaths = [
      'src/content/pharmacology/data/drugs-db.js',
      '/src/content/pharmacology/data/drugs-db.js',
      './src/content/pharmacology/data/drugs-db.js',
      '../src/content/pharmacology/data/drugs-db.js',
      '../../src/content/pharmacology/data/drugs-db.js',
      'content/pharmacology/data/drugs-db.js',
      '/content/pharmacology/data/drugs-db.js'
    ];

    for (const path of candidatePaths) {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = path;
          script.onload = () => {
            if (typeof (window as any).DRUGS_DB !== 'undefined' && Array.isArray((window as any).DRUGS_DB) && (window as any).DRUGS_DB.length > 0) {
              resolve();
            } else {
              script.remove();
              reject(new Error('Loaded script but DRUGS_DB empty'));
            }
          };
          script.onerror = () => {
            script.remove();
            reject(new Error(`Failed to load ${path}`));
          };
          document.head.appendChild(script);
        });
        return;
      } catch {
        // Try next path candidate
      }
    }
  }

  private performSearch(query: string) {
    if (!this.resultsContainer) return;

    const db = (window as any).DRUGS_DB || [];
    const lowerQuery = query.toLowerCase().trim();

    let results = db;
    if (lowerQuery) {
      results = db.filter((d: any) => {
        const text = [
          d.name,
          ...(d.brandNames || []),
          d.drugClass,
          d.category
        ].join(' ').toLowerCase();
        return text.includes(lowerQuery);
      }).slice(0, 50); // limit to 50 results
    } else {
      results = db.slice(0, 50);
    }

    if (results.length === 0) {
      this.resultsContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <i class="fa-solid fa-prescription-bottle-medical" style="font-size:48px; color:var(--color-border); margin-bottom:16px;"></i>
          <h3 style="color:var(--color-text-muted);">Không tìm thấy thuốc</h3>
          <p style="font-size:14px; color:var(--color-text-muted);">Thử tìm bằng tên gốc hoặc biệt dược khác.</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        ${results.map((d: any, idx: number) => this.renderDrugItem(d, idx)).join('')}
      </div>
    `;

    // Bind click events
    results.forEach((d: any, idx: number) => {
      document.getElementById(`dp-item-${idx}`)?.addEventListener('click', () => {
        this.selectDrug(d);
      });
    });
  }

  private renderDrugItem(d: any, idx: number): string {
    const brands = d.brandNames && d.brandNames.length > 0 ? d.brandNames.join(', ') : '';
    const dosage = d.dosage?.standardAdult || '';
    
    return `
      <div id="dp-item-${idx}" style="padding:18px 20px; border-bottom:1px solid var(--color-border); cursor:pointer; background:var(--color-surface); transition:background 0.2s;" onmouseover="this.style.background='var(--color-surface-offset)'" onmouseout="this.style.background='var(--color-surface)'">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px; gap:8px;">
          <h4 style="margin:0; font-size:16px; color:var(--color-primary); font-weight:700;">
            ${d.name} ${brands ? `<span style="font-weight:normal; color:var(--color-text-muted); font-size:13px;">(${brands})</span>` : ''}
          </h4>
          <span style="font-size:12px; font-weight:700; padding:4px 10px; border-radius:6px; background:var(--color-surface-offset); color:var(--color-primary); border:1px solid var(--color-border); white-space:nowrap;">
            ${d.drugClass || d.category || 'Thuốc'}
          </span>
        </div>
        
        ${dosage ? `
        <div style="font-size:14px; color:var(--color-text); display:flex; gap:8px; margin-top:8px; line-height:1.5;">
          <i class="fa-solid fa-syringe" style="color:var(--color-primary); margin-top:3px;"></i>
          <span><strong>Liều người lớn:</strong> ${dosage}</span>
        </div>` : ''}
      </div>
    `;
  }

  private selectDrug(d: any) {
    if (this.onSelectCallback) {
      this.onSelectCallback(d);
      this.close();
      return;
    }

    if (this.targetInputId) {
      const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
      if (textarea) {
        const dosage = d.dosage?.standardAdult || '...';
        const mainBrand = d.brandNames && d.brandNames.length > 0 ? ` (${d.brandNames[0]})` : '';
        const textToInsert = `- ${d.name}${mainBrand}: ${dosage}\n`;
        
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        
        textarea.value = textarea.value.substring(0, startPos)
          + textToInsert
          + textarea.value.substring(endPos, textarea.value.length);
          
        textarea.selectionStart = startPos + textToInsert.length;
        textarea.selectionEnd = startPos + textToInsert.length;
        textarea.focus();
      }
    }
    
    this.close();
  }
}

export const drugPicker = new DrugPicker();
