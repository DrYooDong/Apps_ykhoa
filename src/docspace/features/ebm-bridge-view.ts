/**
 * EBM Bridge View - DocSpace
 * Kết nối tra cứu Y học chứng cứ từ EBM Guidelines dựa trên mã bệnh ICD-10
 */

export class EbmBridge {
  private modalEl: HTMLElement;
  
  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalEbmBridge';
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

  public async openSearch(query: string) {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:900px; max-height:90vh; border-radius:12px; display:flex; flex-direction:column; overflow:hidden;">
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary);"><i class="fa-solid fa-book-medical"></i> EBM Guidelines: "${query}"</h3>
          <button id="btnCloseEbmBridge" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        <div id="ebmBridgeContent" style="padding:20px; overflow-y:auto; flex:1;">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang tải dữ liệu EBM...</div>
        </div>
      </div>
    `;
    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseEbmBridge')?.addEventListener('click', () => this.close());

    await this.loadEbmData();
    this.performSearch(query);
  }

  private close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private async loadEbmData() {
    if (typeof (window as any).SAMPLE_STUDIES !== 'undefined' && Array.isArray((window as any).SAMPLE_STUDIES) && (window as any).SAMPLE_STUDIES.length > 0) {
      return;
    }

    const candidatePaths = [
      'src/content/ebm/guidelines/guidelinesdata.js',
      '/src/content/ebm/guidelines/guidelinesdata.js',
      './src/content/ebm/guidelines/guidelinesdata.js',
      '../src/content/ebm/guidelines/guidelinesdata.js',
      'content/ebm/guidelines/guidelinesdata.js',
      '/content/ebm/guidelines/guidelinesdata.js'
    ];

    for (const path of candidatePaths) {
      try {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = path;
          script.onload = () => {
            if (typeof (window as any).SAMPLE_STUDIES !== 'undefined' && Array.isArray((window as any).SAMPLE_STUDIES) && (window as any).SAMPLE_STUDIES.length > 0) {
              resolve();
            } else {
              script.remove();
              reject(new Error('Loaded script but SAMPLE_STUDIES empty'));
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
    const contentEl = document.getElementById('ebmBridgeContent');
    if (!contentEl) return;

    const studies = (window as any).CliniPortalSync ? (window as any).CliniPortalSync.getStudies() : ((window as any).SAMPLE_STUDIES || []);
    
    // 1. Trích xuất tất cả các mã ICD-10 từ đoạn văn bản (VD: I50.0, E11.9, I10)
    const icdRegex = /[A-Z][0-9]{2}(?:\.[0-9]+)?/g;
    const foundCodes = Array.from(new Set(query.match(icdRegex) || []));

    // 2. Nếu tìm thấy mã ICD, tra cứu theo mã. Nếu không, tra cứu theo từ khóa (fallback)
    let results: any[] = [];
    
    if (foundCodes.length > 0) {
      // Tìm các guidelines mà trong icd10Codes có chứa mã gốc (VD I50.0 -> I50)
      foundCodes.forEach(code => {
        const rootCode = code.split('.')[0]; // I50.0 -> I50
        const matched = studies.filter((s: any) => 
          s.icd10Codes && s.icd10Codes.some((c: string) => c.startsWith(rootCode))
        );
        
        matched.forEach((m: any) => {
          // Gắn thêm tag bệnh lý để hiển thị
          if (!m._matchedCodes) m._matchedCodes = [];
          if (!m._matchedCodes.includes(code)) m._matchedCodes.push(code);
          
          if (!results.find(r => r.id === m.id)) {
            results.push(m);
          }
        });
      });
    } else {
      // Fallback: Tìm theo từ khóa
      const lowerQuery = query.toLowerCase().replace(/icd-10|icd|mã|bệnh/gi, '').trim();
      const keywords = lowerQuery.split(/\s+/).filter(k => k.length > 2);

      results = studies.filter((s: any) => {
        const text = [s.title, s.intervention, s.population, s.summary, s.drug].join(' ').toLowerCase();
        if (keywords.length === 0) return true;
        return keywords.some(kw => text.includes(kw));
      });
    }

    if (results.length === 0) {
      contentEl.innerHTML = `
        <div style="text-align:center; padding:40px;">
          <i class="fa-solid fa-folder-open" style="font-size:48px; color:var(--color-border); margin-bottom:16px;"></i>
          <h3 style="color:var(--color-text-muted);">Không tìm thấy Guideline phù hợp</h3>
          <p style="font-size:14px; color:var(--color-text-muted);">Không có nghiên cứu EBM nào khớp với dữ liệu chẩn đoán vừa nhập.</p>
        </div>
      `;
      return;
    }

    const headerText = foundCodes.length > 0 
      ? `Đã phân tích <strong>${foundCodes.length}</strong> bệnh lý: <span style="color:var(--color-primary); font-family:monospace;">${foundCodes.join(', ')}</span>. Tìm thấy <strong>${results.length}</strong> guidelines.`
      : `Tìm thấy <strong>${results.length}</strong> kết quả theo từ khóa.`;

    contentEl.innerHTML = `
      <div style="margin-bottom:16px; font-size:14px; color:var(--color-text); background:#f0f9ff; border-left:4px solid #0284c7; padding:12px; border-radius:4px;">
        <i class="fa-solid fa-brain" style="color:#0284c7; margin-right:8px;"></i> ${headerText}
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${results.map((r: any) => this.renderStudyCard(r)).join('')}
      </div>
    `;
  }

  private renderStudyCard(s: any): string {
    const isPracticeChanging = s.impact === 'practice-changing';
    return `
      <div style="border:1px solid ${isPracticeChanging ? '#fca5a5' : 'var(--color-border)'}; border-radius:8px; padding:16px; background:${isPracticeChanging ? '#fef2f2' : 'var(--color-surface)'}; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
          <h4 style="margin:0; font-size:15px; color:${isPracticeChanging ? '#b91c1c' : 'var(--color-primary)'}; font-weight:700;">
            ${s.title}
          </h4>
          <span style="font-size:11px; font-weight:600; padding:2px 8px; border-radius:12px; background:var(--color-bg); color:var(--color-text-muted); white-space:nowrap; margin-left:12px;">
            ${s.year} | ${s.organization}
          </span>
        </div>
        
        <div style="font-size:12px; margin-bottom:8px; display:flex; gap:8px; flex-wrap:wrap;">
          ${s._matchedCodes ? s._matchedCodes.map((c: string) => `<span style="background:#fef3c7; color:#b45309; padding:2px 6px; border-radius:4px; font-weight:700;"><i class="fa-solid fa-tag"></i> ${c}</span>`).join('') : ''}
          <span style="background:#e0e7ff; color:#4338ca; padding:2px 6px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-pills"></i> ${s.drug}</span>
          ${isPracticeChanging ? `<span style="background:#fee2e2; color:#b91c1c; padding:2px 6px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-bolt"></i> Thay đổi thực hành</span>` : ''}
        </div>

        <div style="font-size:13px; color:var(--color-text); margin-bottom:8px; line-height:1.5;">
          <strong>Tóm tắt:</strong> ${s.summary}
        </div>
        
        <div style="font-size:13px; color:var(--color-text-muted); background:var(--color-bg); padding:8px 12px; border-radius:6px; border-left:3px solid var(--color-primary);">
          <strong>Kết luận chính:</strong> ${s.detailedConclusion || s.keyResults}
        </div>
      </div>
    `;
  }
}

export const ebmBridge = new EbmBridge();
