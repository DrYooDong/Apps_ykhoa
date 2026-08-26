/**
 * PubMed & Gemini AI Integration Service (pubmed-gemini-service.ts)
 * Path: src/content/ebm/js/pubmed-gemini-service.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * Quản lý lấy danh sách Guidelines y khoa mới nhất trên PubMed (NCBI E-utilities)
 * và xử lý, chuẩn hóa thông tin (kèm Chuyên khoa) bằng Google Gemini Direct Client-side API.
 * Hỗ trợ tự động dò tìm model (gemini-3.7-flash, gemini-2.0-flash, gemini-1.5-flash-latest...)
 */

export interface PubMedArticle {
  pmid: string;
  title: string;
  journal?: string;
  source?: string;
  pubDate?: string;
  releaseDate?: string;
  doi?: string;
  specialty?: string;
  organization?: string;
  url?: string;
  summaryVi?: string;
}

export interface PubMedRawItem {
  pmid: string;
  title: string;
  source: string;
  pubdate: string;
  sortpubdate: string;
  authors: string;
  url: string;
}

export interface SpecialtyStyle {
  icon: string;
  bg: string;
  color: string;
}

export class PubMedGeminiService {
  public static readonly STORAGE_KEY_API = 'CLINI_GEMINI_KEY';
  public static readonly STORAGE_KEY_CACHE = 'yhcc_pubmed_guidelines_cache_v2';
  public static readonly CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours cache

  public static readonly CANDIDATE_MODELS = [
    'gemini-3.7-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-flash-latest',
    'gemini-2.0-flash',
    'gemini-1.5-flash-latest',
    'gemini-1.5-flash'
  ];

  private static detectedWorkingModel: string | null = null;
  private static currentGuidelines: PubMedArticle[] = [];
  private static isGeminiActive = false;

  // DOM references
  private static containerEl: HTMLElement | null = null;
  private static listEl: HTMLElement | null = null;
  private static syncBtnEl: HTMLElement | null = null;
  private static keyBtnEl: HTMLElement | null = null;
  private static badgeStatusEl: HTMLElement | null = null;

  private static modalEl: HTMLElement | null = null;
  private static modalInputEl: HTMLInputElement | null = null;
  private static modalSaveBtn: HTMLButtonElement | null = null;
  private static modalCancelBtn: HTMLButtonElement | null = null;
  private static modalClearBtn: HTMLButtonElement | null = null;
  private static modalTestBtn: HTMLButtonElement | null = null;
  private static modalToggleEyeBtn: HTMLButtonElement | null = null;
  private static modalStatusEl: HTMLElement | null = null;

  public static getApiKey(): string {
    if (typeof localStorage === 'undefined') return '';
    return localStorage.getItem(this.STORAGE_KEY_API) || '';
  }

  public static setApiKey(key: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY_API, key.trim());
  }

  public static clearApiKey(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY_API);
  }

  public static init(): void {
    this.initDOMElements();
    this.bindEvents();
    this.loadAndRenderGuidelines();
  }

  private static initDOMElements(): void {
    this.containerEl = document.getElementById('pubmed-board-container');
    this.listEl = document.getElementById('pubmed-guidelines-list');
    this.syncBtnEl = document.getElementById('btn-pubmed-sync');
    this.keyBtnEl = document.getElementById('btn-gemini-config');
    this.badgeStatusEl = document.getElementById('pubmed-status-badge');

    this.modalEl = document.getElementById('gemini-key-modal');
    this.modalInputEl = document.getElementById('gemini-api-key-input') as HTMLInputElement | null;
    this.modalSaveBtn = document.getElementById('btn-gemini-key-save') as HTMLButtonElement | null;
    this.modalCancelBtn = document.getElementById('btn-gemini-key-cancel') as HTMLButtonElement | null;
    this.modalClearBtn = document.getElementById('btn-gemini-key-clear') as HTMLButtonElement | null;
    this.modalTestBtn = document.getElementById('btn-gemini-key-test') as HTMLButtonElement | null;
    this.modalToggleEyeBtn = document.getElementById('btn-toggle-key-visibility') as HTMLButtonElement | null;
    this.modalStatusEl = document.getElementById('gemini-key-status-text');
  }

  private static bindEvents(): void {
    if (this.syncBtnEl) {
      this.syncBtnEl.addEventListener('click', () => {
        this.loadAndRenderGuidelines(true);
      });
    }

    if (this.keyBtnEl) {
      this.keyBtnEl.addEventListener('click', () => this.openGeminiModal());
    }

    if (this.modalSaveBtn) {
      this.modalSaveBtn.addEventListener('click', () => this.handleSaveKey());
    }

    if (this.modalCancelBtn) {
      this.modalCancelBtn.addEventListener('click', () => this.closeGeminiModal());
    }

    if (this.modalClearBtn) {
      this.modalClearBtn.addEventListener('click', () => this.handleClearKey());
    }

    if (this.modalTestBtn) {
      this.modalTestBtn.addEventListener('click', () => this.handleTestKey());
    }

    if (this.modalToggleEyeBtn && this.modalInputEl) {
      this.modalToggleEyeBtn.addEventListener('click', () => {
        if (!this.modalInputEl || !this.modalToggleEyeBtn) return;
        const isPass = this.modalInputEl.type === 'password';
        this.modalInputEl.type = isPass ? 'text' : 'password';
        this.modalToggleEyeBtn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
      });
    }

    if (this.modalEl) {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) this.closeGeminiModal();
      });
    }
  }

  public static openGeminiModal(): void {
    if (!this.modalEl) return;
    const existingKey = this.getApiKey();
    if (this.modalInputEl) {
      this.modalInputEl.value = existingKey;
      this.modalInputEl.type = 'password';
      if (this.modalToggleEyeBtn) this.modalToggleEyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
    if (this.modalStatusEl) {
      if (existingKey) {
        this.modalStatusEl.innerHTML = '<span style="color: #10b981; font-weight: 700;">✓ Đã lưu Key trong trình duyệt. Nhấn "Kiểm tra Key" để kiểm tra kết nối với Google AI.</span>';
      } else {
        this.modalStatusEl.innerHTML = '<span style="color: var(--hub-text-muted);">Chưa cài đặt Key (Đang chạy ở chế độ PubMed trực tiếp không AI).</span>';
      }
    }
    this.modalEl.classList.add('active');
  }

  public static closeGeminiModal(): void {
    if (this.modalEl) this.modalEl.classList.remove('active');
  }

  public static async discoverAvailableModel(key: string): Promise<string> {
    if (this.detectedWorkingModel) return this.detectedWorkingModel;
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`, {
        headers: { 'x-goog-api-key': key }
      });
      if (res.ok) {
        const data = await res.json();
        const availableNames: string[] = (data.models || []).map((m: any) => m.name.replace('models/', ''));
        for (const candidate of this.CANDIDATE_MODELS) {
          if (availableNames.includes(candidate)) {
            this.detectedWorkingModel = candidate;
            return candidate;
          }
        }
        const anyGenerate = (data.models || []).find((m: any) =>
          Array.isArray(m.supportedGenerationMethods) &&
          m.supportedGenerationMethods.includes('generateContent') &&
          !m.name.includes('embedding')
        );
        if (anyGenerate) {
          this.detectedWorkingModel = anyGenerate.name.replace('models/', '');
          return this.detectedWorkingModel || 'gemini-2.0-flash';
        }
      }
    } catch (e) {
      console.warn('Auto-discovery failed, using default candidate list', e);
    }
    return 'gemini-2.0-flash';
  }

  public static async callGeminiGenerateContent(prompt: string, key: string): Promise<{ resJson: any; model: string; latency: number }> {
    const initialModel = await this.discoverAvailableModel(key);
    const modelsToTry = [initialModel, ...this.CANDIDATE_MODELS.filter(m => m !== initialModel)];

    let lastError: Error | null = null;
    for (const model of modelsToTry) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;
        const payload = {
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2048
          }
        };

        const startTime = Date.now();
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key
          },
          body: JSON.stringify(payload)
        });
        const latency = Date.now() - startTime;

        if (res.ok) {
          this.detectedWorkingModel = model;
          const resJson = await res.json();
          return { resJson, model, latency };
        } else {
          const errText = await res.text();
          let parsedMsg = errText;
          try {
            const errObj = JSON.parse(errText);
            if (errObj.error?.message) parsedMsg = errObj.error.message;
          } catch (e) {}

          lastError = new Error(`[${model}] ${parsedMsg}`);
          
          if (res.status === 400 && (parsedMsg.includes('API_KEY_INVALID') || parsedMsg.includes('API key not valid'))) {
            throw new Error('Key không chính xác (API_KEY_INVALID). Vui lòng kiểm tra lại Key từ Google AI Studio.');
          }
          if (res.status === 404 || parsedMsg.includes('not found') || parsedMsg.includes('not supported')) {
            continue;
          }
        }
      } catch (err: any) {
        lastError = err;
        if (err.message && err.message.includes('API_KEY_INVALID')) throw err;
      }
    }

    throw lastError || new Error('Không thể kết nối với model Gemini phù hợp.');
  }

  public static async handleTestKey(): Promise<void> {
    if (!this.modalInputEl || !this.modalStatusEl) return;
    const key = this.modalInputEl.value.trim();
    if (!key) {
      this.modalStatusEl.innerHTML = '<span style="color: #ef4444; font-weight: 700;">⚠️ Vui lòng dán API Key vào ô trên trước khi kiểm tra!</span>';
      return;
    }

    this.modalStatusEl.innerHTML = '<span style="color: var(--hub-blue); font-weight: 600;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tự động kết nối và kiểm tra API Key với Google AI...</span>';
    if (this.modalTestBtn) this.modalTestBtn.disabled = true;

    try {
      const result = await this.callGeminiGenerateContent('Respond with OK only', key);
      this.modalStatusEl.innerHTML = `<span style="color: #10b981; font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Key hợp lệ 100%! Đã kết nối thành công model <code>${result.model}</code> (${result.latency}ms). Bạn có thể bấm "Lưu & Kích hoạt AI" ngay.</span>`;
    } catch (err: any) {
      console.error('Test API Key Error:', err);
      this.modalStatusEl.innerHTML = `<span style="color: #ef4444; font-weight: 700;"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi kết nối: ${err.message}</span>`;
    } finally {
      if (this.modalTestBtn) this.modalTestBtn.disabled = false;
    }
  }

  public static handleSaveKey(): void {
    if (!this.modalInputEl) return;
    const key = this.modalInputEl.value.trim();
    if (!key) {
      alert('Vui lòng nhập API Key hợp lệ hoặc nhấn Xóa Key nếu không sử dụng.');
      return;
    }
    this.setApiKey(key);
    this.closeGeminiModal();
    if (typeof localStorage !== 'undefined') localStorage.removeItem(this.STORAGE_KEY_CACHE);
    this.loadAndRenderGuidelines(true);
  }

  public static handleClearKey(): void {
    if (confirm('Bạn có chắc chắn muốn xóa Gemini API Key khỏi trình duyệt này?')) {
      this.clearApiKey();
      if (typeof localStorage !== 'undefined') localStorage.removeItem(this.STORAGE_KEY_CACHE);
      if (this.modalInputEl) this.modalInputEl.value = '';
      this.closeGeminiModal();
      this.loadAndRenderGuidelines(true);
    }
  }

  public static async fetchPubMedRawGuidelines(): Promise<PubMedRawItem[]> {
    const currentYear = new Date().getFullYear();
    const prevYear = currentYear - 1;
    const term = encodeURIComponent(`(Practice Guideline[pt] OR Guideline[pt]) AND ("${prevYear}"[dp] : "${currentYear}"[dp])`);
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}&sort=pub_date&retmode=json&retmax=8`;

    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) throw new Error(`PubMed Search Error: ${searchRes.statusText}`);
    const searchData = await searchRes.json();
    const idList: string[] = searchData.esearchresult?.idlist || [];

    if (idList.length === 0) return [];

    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idList.join(',')}&retmode=json`;
    const summaryRes = await fetch(summaryUrl);
    if (!summaryRes.ok) throw new Error(`PubMed Summary Error: ${summaryRes.statusText}`);
    const summaryData = await summaryRes.json();
    const resultObj = summaryData.result || {};

    const rawList: PubMedRawItem[] = idList.map(pmid => {
      const item = resultObj[pmid] || {};
      return {
        pmid: pmid,
        title: item.title ? item.title.replace(/\[|\]|\.$/g, '') : 'Hướng dẫn thực hành lâm sàng',
        source: item.source || 'PubMed Central',
        pubdate: item.pubdate || '',
        sortpubdate: item.sortpubdate || '',
        authors: (item.authors && item.authors.length > 0) ? item.authors[0].name : '',
        url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`
      };
    });

    return rawList;
  }

  public static inferSpecialtyFromText(text: string): string {
    const lower = (text || '').toLowerCase();
    if (/cardio|heart|hypertension|infarction|arrhythmia|vascular|coronary|aortic/i.test(lower)) return 'Tim Mạch';
    if (/pulmon|respirat|asthma|copd|lung|pneumonia|bronch/i.test(lower)) return 'Hô Hấp';
    if (/gastro|digest|liver|hepat|colon|bowel|gerd|pancrea/i.test(lower)) return 'Tiêu Hóa';
    if (/diabet|endocrin|thyroid|metabol|glycem|hormon/i.test(lower)) return 'Nội Tiết';
    if (/sepsis|critical|intensive|icu|shock|emergency|resuscitat|trauma/i.test(lower)) return 'Cấp Cứu - ICU';
    if (/pediatr|child|infant|neonat|adolescent/i.test(lower)) return 'Nhi Khoa';
    if (/neuro|stroke|brain|epilep|dementia|parkinson/i.test(lower)) return 'Thần Kinh';
    if (/infect|virus|bacteri|antimicrob|hiv|covid|vaccin|septic/i.test(lower)) return 'Truyền Nhiễm';
    if (/oncol|cancer|tumor|carcinoma|chemotherap/i.test(lower)) return 'Ung Bướu';
    if (/renai|kidney|nephro|dialysis/i.test(lower)) return 'Thận - Tiết Niệu';
    if (/rheum|arthrit|lupus|autoimmun/i.test(lower)) return 'Cơ Xương Khớp';
    return 'Đa Khoa';
  }

  public static formatRawPubMedData(rawList: PubMedRawItem[]): PubMedArticle[] {
    return rawList.map(item => {
      let formattedDate = 'Gần đây';
      if (item.sortpubdate) {
        const parts = item.sortpubdate.split(' ')[0].split('/');
        if (parts.length === 3) {
          formattedDate = `${parts[2].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[0]}`;
        }
      } else if (item.pubdate) {
        formattedDate = item.pubdate;
      }

      const inferredSpec = this.inferSpecialtyFromText(`${item.title} ${item.source}`);

      return {
        pmid: item.pmid,
        title: item.title,
        specialty: inferredSpec,
        organization: item.source || 'Tổ chức Y khoa Quốc tế',
        releaseDate: formattedDate,
        url: item.url
      };
    });
  }

  public static async processGuidelinesWithGemini(rawList: PubMedRawItem[], apiKey: string): Promise<{ data: PubMedArticle[]; model: string }> {
    const prompt = `Bạn là Trợ lý AI Y học chứng cứ (EBM AI) của CliniPortal.
Nhiệm vụ: Phân tích danh sách kết quả thô các Hướng dẫn điều trị lâm sàng (Practice Guidelines) mới nhất từ PubMed dưới đây.

Hãy trích xuất và chuẩn hóa 4 thông tin cho mỗi bài báo:
1. title: Tên bài viết/Hướng dẫn điều trị (Dịch tên sang Tiếng Việt chuẩn y khoa, giữ nguyên tên viết tắt của thuốc/bệnh/guideline).
2. specialty: Tên Chuyên khoa tương ứng (ví dụ: Tim Mạch, Hô Hấp, Tiêu Hóa, Nội Tiết, Cấp Cứu - ICU, Thần Kinh, Nhi Khoa, Truyền Nhiễm, Ung Bướu, Thận - Tiết Niệu, Cơ Xương Khớp, hoặc Đa Khoa).
3. organization: Tên Tổ chức/Hiệp hội hoặc Tạp chí y khoa uy tín phát hành (ví dụ: AHA, ESC, ADA, WHO, CHEST, IDSA, KDIGO, JAMA, The Lancet, BMJ, Bộ Y Tế...).
4. releaseDate: Ngày tháng năm phát hành theo đúng định dạng chuẩn DD/MM/YYYY (ví dụ: 14/02/2026). Nếu chỉ có năm/tháng thì để DD là 01 (ví dụ 01/01/2026).

Dữ liệu đầu vào từ PubMed:
${JSON.stringify(rawList, null, 2)}

YÊU CẦU ĐẦU RA:
Chỉ trả về DUY NHẤT 01 mảng JSON thuần túy (JSON Array), KHÔNG kèm bất kỳ lời dẫn giải, mở đầu hay markdown nào ngoài JSON:
[
  {
    "pmid": "mã pmid",
    "title": "Tên Guideline tiếng Việt chuẩn y khoa",
    "specialty": "Tên chuyên khoa",
    "organization": "Tên tổ chức/Hiệp hội/Tạp chí",
    "releaseDate": "DD/MM/YYYY",
    "url": "https://pubmed.ncbi.nlm.nih.gov/pmid/"
  }
]`;

    const { resJson, model } = await this.callGeminiGenerateContent(prompt, apiKey);
    const rawAiOutput = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const cleanedJson = rawAiOutput.replace(/^```json/m, '').replace(/^```/m, '').replace(/```$/m, '').trim();
    const parsedData: PubMedArticle[] = JSON.parse(cleanedJson);

    return { data: parsedData, model };
  }

  public static async loadAndRenderGuidelines(forceRefresh = false): Promise<void> {
    if (!this.listEl) return;

    const apiKey = this.getApiKey();
    this.isGeminiActive = Boolean(apiKey);

    if (this.badgeStatusEl) {
      if (this.isGeminiActive) {
        this.badgeStatusEl.className = 'pubmed-board-badge badge-gemini-active';
        this.badgeStatusEl.innerHTML = '<i class="fa-solid fa-bolt"></i> Gemini AI Active';
      } else {
        this.badgeStatusEl.className = 'pubmed-board-badge badge-pubmed-direct';
        this.badgeStatusEl.innerHTML = '<i class="fa-solid fa-globe"></i> PubMed Direct';
      }
    }

    if (!forceRefresh && typeof localStorage !== 'undefined') {
      const cachedStr = localStorage.getItem(this.STORAGE_KEY_CACHE);
      if (cachedStr) {
        try {
          const cached = JSON.parse(cachedStr);
          if (Date.now() - cached.timestamp < this.CACHE_TTL_MS && Array.isArray(cached.data) && cached.data.length > 0) {
            this.currentGuidelines = cached.data;
            this.renderList(this.currentGuidelines);
            return;
          }
        } catch (e) {
          console.warn('Invalid cache format, refreshing...', e);
        }
      }
    }

    this.listEl.innerHTML = `
      <div class="pubmed-loading-skeleton">
        <div class="pubmed-spinner"></div>
        <div>Đang truy vấn PubMed & ${this.isGeminiActive ? 'chuẩn hóa chuyên khoa với Gemini AI' : 'tải danh sách Guidelines mới nhất'}...</div>
      </div>
    `;

    try {
      const rawList = await this.fetchPubMedRawGuidelines();
      if (!rawList || rawList.length === 0) {
        this.listEl.innerHTML = `<div class="pubmed-loading-skeleton">Không tìm thấy Guidelines mới phù hợp từ PubMed trong thời gian gần đây.</div>`;
        return;
      }

      let finalGuidelines: PubMedArticle[] = [];

      if (this.isGeminiActive) {
        try {
          const result = await this.processGuidelinesWithGemini(rawList, apiKey);
          finalGuidelines = result.data;
          if (this.badgeStatusEl) {
            this.badgeStatusEl.className = 'pubmed-board-badge badge-gemini-active';
            this.badgeStatusEl.innerHTML = `<i class="fa-solid fa-bolt"></i> Gemini AI Active (${result.model})`;
          }
        } catch (geminiError) {
          console.error('Lỗi khi gọi Gemini API, chuyển sang chế độ dự phòng PubMed:', geminiError);
          finalGuidelines = this.formatRawPubMedData(rawList);
          if (this.badgeStatusEl) {
            this.badgeStatusEl.className = 'pubmed-board-badge';
            this.badgeStatusEl.style.background = 'rgba(239, 68, 68, 0.12)';
            this.badgeStatusEl.style.color = '#ef4444';
            this.badgeStatusEl.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            this.badgeStatusEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Lỗi Gemini Key (Dùng PubMed)';
          }
        }
      } else {
        finalGuidelines = this.formatRawPubMedData(rawList);
      }

      this.currentGuidelines = finalGuidelines;

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY_CACHE, JSON.stringify({
          timestamp: Date.now(),
          data: finalGuidelines
        }));
      }

      this.renderList(finalGuidelines);

    } catch (err) {
      console.error('Lỗi tải PubMed Guidelines:', err);
      this.listEl.innerHTML = `
        <div class="pubmed-loading-skeleton" style="color: var(--hub-red, #ef4444);">
          <i class="fa-solid fa-circle-exclamation" style="font-size: 1.2rem; margin-bottom: 0.4rem; display: block;"></i>
          Không thể kết nối với máy chủ PubMed hoặc Gemini AI. Vui lòng kiểm tra kết nối mạng và thử lại.
        </div>
      `;
    }
  }

  public static getSpecialtyBadgeStyle(spec: string): SpecialtyStyle {
    const s = (spec || '').toLowerCase();
    if (s.includes('tim')) return { icon: '🫀', bg: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' };
    if (s.includes('hô hấp') || s.includes('phổi')) return { icon: '🫁', bg: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' };
    if (s.includes('nội tiết') || s.includes('đường')) return { icon: '🩺', bg: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' };
    if (s.includes('tiêu hóa') || s.includes('gan')) return { icon: '🧫', bg: 'rgba(16, 185, 129, 0.12)', color: '#10b981' };
    if (s.includes('cấp cứu') || s.includes('icu')) return { icon: '⚡', bg: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' };
    if (s.includes('nhi')) return { icon: '👶', bg: 'rgba(236, 72, 153, 0.12)', color: '#ec4899' };
    if (s.includes('thần kinh') || s.includes('não')) return { icon: '🧠', bg: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' };
    if (s.includes('truyền nhiễm') || s.includes('nhiễm')) return { icon: '🛡️', bg: 'rgba(20, 184, 166, 0.12)', color: '#14b8a6' };
    if (s.includes('ung bướu')) return { icon: '🎗️', bg: 'rgba(225, 29, 72, 0.12)', color: '#e11d48' };
    if (s.includes('thận')) return { icon: '💧', bg: 'rgba(3, 105, 161, 0.12)', color: '#0369a1' };
    return { icon: '📋', bg: 'rgba(100, 116, 139, 0.12)', color: '#64748b' };
  }

  public static renderList(guidelines: PubMedArticle[]): void {
    if (!this.listEl) return;
    if (!guidelines || guidelines.length === 0) {
      this.listEl.innerHTML = `<div class="pubmed-loading-skeleton">Chưa có dữ liệu Guidelines.</div>`;
      return;
    }

    let html = '';
    guidelines.forEach(item => {
      const pmidUrl = item.url || (item.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/` : '#');
      const title = item.title || 'Hướng dẫn thực hành lâm sàng';
      const spec = item.specialty || 'Đa Khoa';
      const org = item.organization || 'Tổ chức Y khoa Quốc tế';
      const date = item.releaseDate || '2026';

      const specStyle = this.getSpecialtyBadgeStyle(spec);

      html += `
        <a href="${pmidUrl}" target="_blank" rel="noopener noreferrer" class="pubmed-guideline-card" title="Xem chi tiết toàn văn trên PubMed (${item.pmid || ''})">
          <div class="guideline-main-col">
            <div class="guideline-title-text">${title}</div>
            <div class="guideline-meta-sub">
              <span class="guideline-spec-pill" style="background: ${specStyle.bg}; color: ${specStyle.color};">
                <span>${specStyle.icon}</span> ${spec}
              </span>
              <span class="guideline-org-pill">
                <i class="fa-solid fa-building-columns"></i> ${org}
              </span>
              <span class="guideline-date-badge">
                <i class="fa-regular fa-calendar"></i> ${date}
              </span>
            </div>
          </div>
          <div>
            <span class="guideline-action-btn">
              PubMed <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </div>
        </a>
      `;
    });

    this.listEl.innerHTML = html;
  }
}

// Global window exposure for legacy inline onclick scripts
if (typeof window !== 'undefined') {
  (window as any).PubMedGeminiService = PubMedGeminiService;
  (window as any).togglePubmedBoard = function () {
    const listEl = document.getElementById('pubmed-guidelines-list');
    const labelEl = document.getElementById('pubmed-toggle-label');
    const iconEl = document.getElementById('pubmed-toggle-icon');
    if (!listEl) return;
    const isHidden = listEl.style.display === 'none';
    listEl.style.display = isHidden ? 'flex' : 'none';
    if (labelEl) labelEl.textContent = isHidden ? 'Thu gọn' : 'Mở rộng';
    if (iconEl) iconEl.textContent = isHidden ? '▲' : '▼';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => PubMedGeminiService.init());
  } else {
    PubMedGeminiService.init();
  }
}
