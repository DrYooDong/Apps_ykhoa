/**
 * Calculator Picker - DocSpace
 * Tích hợp công cụ và thang điểm từ thư viện Calculators
 */

export class CalculatorPicker {
  private modalEl: HTMLElement;
  private targetInputId: string = '';
  private iframeContainer: HTMLElement | null = null;
  private listContainer: HTMLElement | null = null;
  private calculators: any[] = [];
  
  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalCalculatorPicker';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1000';
    this.modalEl.style.background = 'rgba(0,0,0,0.6)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '20px';
    document.body.appendChild(this.modalEl);

    // Prevent closing when clicking inside the iframe/content
    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  public async open(targetInputId: string) {
    this.targetInputId = targetInputId;
    
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:900px; height:85vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.2); position:relative;">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <h3 id="cpTitle" style="margin:0; font-size:18px; color:var(--color-primary);"><i class="fa-solid fa-calculator"></i> Kho Thang điểm & Công cụ</h3>
          <div style="display:flex; gap:12px; align-items:center;">
            <button id="btnCpBack" style="display:none; background:var(--color-surface); border:1px solid var(--color-border); padding:6px 12px; border-radius:6px; cursor:pointer; font-size:13px; font-weight:600;"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
            <button id="btnCloseCalculatorPicker" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
          </div>
        </div>
        
        <!-- View 1: List -->
        <div id="cpListView" style="display:flex; flex-direction:column; flex:1; overflow:hidden;">
          <div style="padding:16px 20px; border-bottom:1px solid var(--color-border);">
            <div style="position:relative;">
              <i class="fa-solid fa-search" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted);"></i>
              <input type="text" id="cpSearchInput" class="dsp-input" placeholder="Tìm kiếm thang điểm (VD: CHA2DS2, GCS, BMI)..." style="width:100%; padding-left:36px;" />
            </div>
          </div>
          <div id="cpResults" style="padding:20px; overflow-y:auto; flex:1; background:var(--color-bg);">
            <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang tải dữ liệu...</div>
          </div>
        </div>

        <!-- View 2: Iframe -->
        <div id="cpIframeView" style="display:none; flex-direction:column; flex:1; overflow:hidden; position:relative;">
          <div style="background:#e0e7ff; padding:8px 16px; border-bottom:1px solid #c7d2fe; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:13px; color:#4338ca; font-weight:600;"><i class="fa-solid fa-info-circle"></i> Hãy tính điểm bên dưới. Sau khi có kết quả, nhấn nút bên phải để chèn vào bệnh án.</span>
            <button id="btnCpInsertResult" style="background:#4f46e5; color:#fff; border:none; padding:6px 16px; border-radius:6px; font-weight:700; font-size:13px; cursor:pointer; box-shadow:0 2px 4px rgba(79,70,229,0.3);"><i class="fa-solid fa-download"></i> Chèn Kết Quả</button>
          </div>
          <iframe id="cpIframe" style="width:100%; height:100%; border:none; background:#fff;"></iframe>
        </div>
      </div>
    `;
    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseCalculatorPicker')?.addEventListener('click', () => this.close());
    document.getElementById('btnCpBack')?.addEventListener('click', () => this.showListView());
    document.getElementById('btnCpInsertResult')?.addEventListener('click', () => this.scrapeAndInsertResult());
    
    this.listContainer = document.getElementById('cpResults');
    const searchInput = document.getElementById('cpSearchInput') as HTMLInputElement;

    await this.loadCalculators();
    
    if (searchInput) {
      searchInput.focus();
      searchInput.addEventListener('input', () => {
        this.renderList(searchInput.value);
      });
      this.renderList('');
    }
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private showListView() {
    document.getElementById('cpListView')!.style.display = 'flex';
    document.getElementById('cpIframeView')!.style.display = 'none';
    document.getElementById('btnCpBack')!.style.display = 'none';
    document.getElementById('cpTitle')!.innerHTML = '<i class="fa-solid fa-calculator"></i> Kho Thang điểm & Công cụ';
  }

  private showIframeView(calc: any) {
    document.getElementById('cpListView')!.style.display = 'none';
    document.getElementById('cpIframeView')!.style.display = 'flex';
    document.getElementById('btnCpBack')!.style.display = 'block';
    document.getElementById('cpTitle')!.innerHTML = `<i class="fa-solid fa-calculator"></i> ${calc.name}`;
    
    const iframe = document.getElementById('cpIframe') as HTMLIFrameElement;
    // URL tương đối từ thư mục gốc
    iframe.src = calc.path.replace('./src/', '');
  }

  private async loadCalculators() {
    try {
      const res = await fetch('content/calculators/index.json');
      this.calculators = await res.json();
    } catch (err) {
      console.error('Failed to load calculators index', err);
      if (this.listContainer) {
        this.listContainer.innerHTML = '<div style="color:red; text-align:center;">Lỗi tải dữ liệu thang điểm.</div>';
      }
    }
  }

  private renderList(query: string) {
    if (!this.listContainer) return;

    const lowerQuery = query.toLowerCase().trim();
    let results = this.calculators.filter(c => c.type === 'calculator');

    if (lowerQuery) {
      results = results.filter((c: any) => c.name.toLowerCase().includes(lowerQuery) || c.subcategory.toLowerCase().includes(lowerQuery));
    }

    if (results.length === 0) {
      this.listContainer.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <h3 style="color:var(--color-text-muted);">Không tìm thấy thang điểm</h3>
        </div>
      `;
      return;
    }

    // Group by subcategory
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
          <h4 style="margin:0 0 10px 0; font-size:14px; color:var(--color-text-muted); text-transform:uppercase; border-bottom:1px solid var(--color-border); padding-bottom:4px;">
            Phân hệ: ${cat}
          </h4>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:12px;">
            ${(items as any[]).map(c => `
              <div class="cp-calc-item" data-id="${c.id}" style="padding:16px; background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:12px; transition:all 0.2s;">
                <div style="width:40px; height:40px; border-radius:8px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; color:var(--color-primary); font-size:20px;">
                  <i class="fa-solid fa-square-root-variable"></i>
                </div>
                <div style="flex:1;">
                  <div style="font-size:14px; font-weight:700; color:var(--color-primary); line-height:1.3;">${c.name}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    this.listContainer.innerHTML = html;

    // Hover effects and click events
    this.listContainer.querySelectorAll('.cp-calc-item').forEach(el => {
      (el as HTMLElement).onmouseover = () => (el as HTMLElement).style.borderColor = 'var(--color-primary)';
      (el as HTMLElement).onmouseout = () => (el as HTMLElement).style.borderColor = 'var(--color-border)';
      
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        const calc = this.calculators.find(c => c.id === id);
        if (calc) this.showIframeView(calc);
      });
    });
  }

  private scrapeAndInsertResult() {
    const iframe = document.getElementById('cpIframe') as HTMLIFrameElement;
    if (!iframe || !iframe.contentWindow) return;

    try {
      const idoc = iframe.contentWindow.document;
      // Dựa vào cấu trúc phổ biến của CliniPortal Calculators
      // Thường kết quả nằm trong element có id="result-box", class="result-text", class="alert"
      const resultBox = idoc.querySelector('#result-box, .result-box, #result, .alert-success, .alert-danger, .alert-warning') as HTMLElement;
      
      let resultText = '';
      if (resultBox) {
        // Loại bỏ các thẻ thừa và lấy text
        resultText = resultBox.innerText.trim();
      } else {
        // Fallback: Tìm thẻ in đậm hoặc h3/h4 thường dùng chứa kết quả
        const h3 = idoc.querySelector('h3, h4');
        if (h3) resultText = (h3 as HTMLElement).innerText.trim();
      }

      if (!resultText) {
        alert('Không tìm thấy vùng kết quả trong công cụ này. Vui lòng copy thủ công.');
        return;
      }

      // Xử lý text để chèn đẹp hơn
      // Format lại xuống dòng
      const cleanText = resultText.replace(/\n\s*\n/g, '\n').trim();
      
      const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
      if (textarea) {
        const textToInsert = `\n[KQ Thang điểm]: ${cleanText}\n`;
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
    } catch (err) {
      console.error(err);
      alert('Không thể đọc kết quả từ công cụ (có thể do lỗi bảo mật hoặc iframe chưa tải xong). Vui lòng copy thủ công.');
    }
  }
}

export const calculatorPicker = new CalculatorPicker();
