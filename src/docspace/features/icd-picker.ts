/**
 * ICD-10 Picker - DocSpace
 * Công cụ tìm kiếm và chèn mã bệnh ICD-10 (Hỗ trợ chẩn đoán Đa bệnh lý)
 */

export interface IcdRecord {
  code: string;
  name: string;
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
    
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:700px; max-height:85vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary);"><i class="fa-solid fa-list-ul"></i> Tra cứu ICD-10</h3>
          <button id="btnCloseIcdPicker" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border);">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted);"></i>
            <input type="text" id="icdSearchInput" class="dsp-input" placeholder="Gõ tên bệnh hoặc mã bệnh (VD: Suy tim, I50)..." style="width:100%; padding-left:36px;" />
          </div>
        </div>

        <div id="icdResults" style="padding:0; overflow-y:auto; flex:1; background:var(--color-bg);">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Nhập từ khóa để tìm bệnh.</div>
        </div>
      </div>
    `;
    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseIcdPicker')?.addEventListener('click', () => this.close());
    
    this.searchInput = document.getElementById('icdSearchInput') as HTMLInputElement;
    this.resultsContainer = document.getElementById('icdResults');

    await this.loadIcdData();
    
    if (this.searchInput) {
      this.searchInput.focus();
      this.searchInput.addEventListener('input', () => {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = window.setTimeout(() => this.search(this.searchInput!.value), 300);
      });
    }
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private async loadIcdData() {
    if (typeof (window as any).ICD10_DATA !== 'undefined' && Array.isArray((window as any).ICD10_DATA) && (window as any).ICD10_DATA.length > 0) {
      return;
    }

    const candidatePaths = [
      'js/data/icd10-data.js',
      '/js/data/icd10-data.js',
      './js/data/icd10-data.js',
      '../js/data/icd10-data.js',
      '../../js/data/icd10-data.js'
    ];

    for (const path of candidatePaths) {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = path;
          script.onload = () => {
            if (typeof (window as any).ICD10_DATA !== 'undefined' && Array.isArray((window as any).ICD10_DATA) && (window as any).ICD10_DATA.length > 0) {
              resolve();
            } else {
              script.remove();
              reject(new Error('Loaded script but ICD10_DATA empty'));
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

  private search(query: string) {
    if (!this.resultsContainer) return;

    const lowerQuery = query.trim().toLowerCase();
    if (lowerQuery.length < 2) {
      this.resultsContainer.innerHTML = '<div style="text-align:center; padding:40px; color:var(--color-text-muted);">Nhập ít nhất 2 ký tự để tìm kiếm.</div>';
      return;
    }

    const icdData = (window as any).ICD10_DATA as any[];
    if (!icdData) {
      this.resultsContainer.innerHTML = '<div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang tải dữ liệu ICD-10...</div>';
      return;
    }

    const results = icdData
      .filter(item => 
        item.code.toLowerCase().includes(lowerQuery) || 
        (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(lowerQuery))
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
        this.selectItem(r);
      });
    });
  }

  private renderItem(r: any, idx: number): string {
    return `
      <div id="icd-item-${idx}" style="padding:12px 20px; border-bottom:1px solid var(--color-border); cursor:pointer; background:var(--color-surface); transition:background 0.2s; display:flex; align-items:flex-start; gap:12px;" onmouseover="this.style.background='var(--color-bg)'" onmouseout="this.style.background='var(--color-surface)'">
        <span style="font-size:13px; font-weight:700; color:#4338ca; background:#e0e7ff; padding:2px 8px; border-radius:4px; white-space:nowrap; margin-top: 2px;">
          ${r.code}
        </span>
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span style="font-size:14px; color:var(--color-text); font-weight:500;">
            ${r.name}
          </span>
          ${r.nameEn ? `<span style="font-size:12.5px; color:var(--color-text-muted);">${r.nameEn}</span>` : ''}
        </div>
      </div>
    `;
  }

  private selectItem(r: any) {
    const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
    if (textarea) {
      // Format chuẩn nội khoa: TÊN BỆNH (MÃ)
      // Chuyển tên bệnh thành in hoa
      const diseaseName = r.name.toUpperCase();
      const textToInsert = `${diseaseName} (${r.code})`;
      
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      
      // Nếu đằng trước chưa có khoảng trắng và không phải là đầu dòng hoặc dấu phẩy thì thêm phẩy
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
}

export const icdPicker = new IcdPicker();
