/**
 * Resource Picker - DocSpace
 * Tích hợp công cụ tra cứu đa năng cho Phác đồ Tiếp cận (Approaches) và Kỹ năng (Skills)
 */

export interface ResourcePickerOptions {
  title: string;
  icon: string;
  jsonUrl: string;
  mode: 'insertText' | 'setValue'; // insertText cho textarea, setValue cho input
  targetInputId: string;
  prefixText?: string; // Ví dụ: "- Thực hiện thủ thuật: "
}

export class ResourcePicker {
  private modalEl: HTMLElement;
  private listContainer: HTMLElement | null = null;
  private resources: any[] = [];
  private currentOptions: ResourcePickerOptions | null = null;
  
  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalResourcePicker';
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

  public async open(options: ResourcePickerOptions) {
    this.currentOptions = options;
    
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:700px; max-height:85vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary);"><i class="${options.icon}"></i> ${options.title}</h3>
          <button id="btnCloseResourcePicker" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border);">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted);"></i>
            <input type="text" id="rpSearchInput" class="dsp-input" placeholder="Tìm kiếm theo tên bài..." style="width:100%; padding-left:36px;" />
          </div>
        </div>

        <div id="rpResults" style="padding:0; overflow-y:auto; flex:1; background:var(--color-bg);">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang tải dữ liệu...</div>
        </div>
      </div>
    `;
    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseResourcePicker')?.addEventListener('click', () => this.close());
    
    this.listContainer = document.getElementById('rpResults');
    const searchInput = document.getElementById('rpSearchInput') as HTMLInputElement;

    await this.loadResources(options.jsonUrl);
    
    if (searchInput) {
      searchInput.focus();
      searchInput.addEventListener('input', () => {
        this.renderList(searchInput.value);
      });
      // Hiển thị tất cả mặc định
      this.renderList('');
    }
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private async loadResources(url: string) {
    try {
      const res = await fetch(url);
      this.resources = await res.json();
    } catch (err) {
      console.error('Failed to load resource index', err);
      if (this.listContainer) {
        this.listContainer.innerHTML = '<div style="color:red; text-align:center; padding:20px;">Lỗi tải dữ liệu.</div>';
      }
    }
  }

  private renderList(query: string) {
    if (!this.listContainer) return;

    const lowerQuery = query.toLowerCase().trim();
    // Lọc bỏ thư mục/category ảo, chỉ lấy file
    let results = this.resources.filter(r => r.path);

    if (lowerQuery) {
      results = results.filter((r: any) => {
        const text = (r.name || r.id || r.path).toLowerCase();
        return text.includes(lowerQuery);
      });
    }

    if (results.length === 0) {
      this.listContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <h3 style="color:var(--color-text-muted);">Không tìm thấy tài liệu phù hợp</h3>
        </div>
      `;
      return;
    }

    this.listContainer.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        ${results.map((r: any, idx: number) => this.renderItem(r, idx)).join('')}
      </div>
    `;

    // Bind click events
    results.forEach((r: any, idx: number) => {
      document.getElementById(`rp-item-${idx}`)?.addEventListener('click', () => {
        this.selectResource(r);
      });
    });
  }

  private renderItem(r: any, idx: number): string {
    // Tên bài thường có định dạng file .html, ta lược bỏ đuôi
    let displayName = r.name || r.id;
    if (displayName.endsWith('.html')) {
      displayName = displayName.replace('.html', '');
    }
    // Chuyển dấu _ thành khoảng trắng cho dễ đọc (nếu tên file dùng dấu _)
    displayName = displayName.replace(/_/g, ' ');

    return `
      <div id="rp-item-${idx}" style="padding:16px 20px; border-bottom:1px solid var(--color-border); cursor:pointer; background:var(--color-surface); transition:background 0.2s;" onmouseover="this.style.background='var(--color-bg)'" onmouseout="this.style.background='var(--color-surface)'">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h4 style="margin:0; font-size:14px; color:var(--color-primary); font-weight:600;">
            ${displayName}
          </h4>
          <span style="font-size:11px; color:var(--color-text-muted); background:#f1f5f9; padding:2px 6px; border-radius:4px;">
            ${r.category || ''}
          </span>
        </div>
        <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">
          ${r.path}
        </div>
      </div>
    `;
  }

  private selectResource(r: any) {
    if (!this.currentOptions) return;

    const el = document.getElementById(this.currentOptions.targetInputId);
    if (!el) {
      this.close();
      return;
    }

    let urlToInsert = r.path.replace('./src/', ''); // VD: content/approaches/...
    urlToInsert = `../${urlToInsert}`; // Tương đối từ trang DocSpace
    
    let displayName = r.name || r.id;
    if (displayName.endsWith('.html')) displayName = displayName.replace('.html', '');
    displayName = displayName.replace(/_/g, ' ');

    if (this.currentOptions.mode === 'setValue') {
      const input = el as HTMLInputElement;
      input.value = urlToInsert;
    } else if (this.currentOptions.mode === 'insertText') {
      const textarea = el as HTMLTextAreaElement;
      const prefix = this.currentOptions.prefixText || '';
      const textToInsert = `\n${prefix}[${displayName}](${urlToInsert})\n`;
      
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      
      textarea.value = textarea.value.substring(0, startPos)
        + textToInsert
        + textarea.value.substring(endPos, textarea.value.length);
        
      textarea.selectionStart = startPos + textToInsert.length;
      textarea.selectionEnd = startPos + textToInsert.length;
      textarea.focus();
    }
    
    this.close();
  }
}

export const resourcePicker = new ResourcePicker();
