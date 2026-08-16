import { saveProtocol, getActiveProfile } from '../storage';

export interface EbmSearchOptions {
  targetFieldId?: string;
  onInsertRecommendation?: (recText: string) => void;
}

export class EbmBridge {
  private modalEl: HTMLElement;
  private currentOptions?: EbmSearchOptions;
  
  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalEbmBridge';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1050';
    this.modalEl.style.background = 'rgba(0,0,0,0.65)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '20px';
    this.modalEl.style.backdropFilter = 'blur(4px)';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  public async openSearch(query: string, options?: EbmSearchOptions) {
    this.currentOptions = options;
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:960px; max-height:90vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border: 1px solid var(--color-border);">
        
        <!-- Header -->
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:34px; height:34px; border-radius:8px; background:rgba(2,132,199,0.15); color:var(--color-primary); display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
              <i class="fa-solid fa-book-medical"></i>
            </div>
            <div>
              <h3 style="margin:0; font-size:17px; font-weight:800; color:var(--color-primary);">EBM Bridge 2.0 — Kho Chứng Cứ Y Học</h3>
              <p style="margin:2px 0 0 0; font-size:12px; color:var(--color-text-muted);">Tra cứu khuyến cáo &amp; Chèn trực tiếp vào Bệnh án SOAP</p>
            </div>
          </div>
          <button id="btnCloseEbmBridge" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted); line-height:1;" title="Đóng">&times;</button>
        </div>

        <!-- Search Bar Strip & Quick Category Chips -->
        <div style="padding:12px 20px; background:var(--color-surface); border-bottom:1px solid var(--color-border); display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; gap:10px; align-items:center;">
            <div style="position:relative; flex:1;">
              <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:13px;"></i>
              <input type="text" id="ebmBridgeSearchInput" class="dsp-input" value="${query.replace(/"/g, '&quot;')}" placeholder="Tìm theo tên bệnh, mã ICD-10 (VD: J18, I50), thuốc hoặc phác đồ..." style="padding-left:34px; font-size:13px;" />
            </div>
            <button type="button" id="btnEbmBridgeDoSearch" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight:700;">
              <i class="fa-solid fa-filter"></i> Tìm kiếm
            </button>
          </div>
          
          <!-- Quick Suggestion Filters -->
          <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:4px; scrollbar-width:thin;">
            <style>
              .js-ebm-chip { transition: all 0.15s ease; cursor: pointer; }
              .js-ebm-chip:hover { transform: translateY(-1px); border-color: var(--color-primary) !important; color: var(--color-primary) !important; }
              .js-ebm-chip.active { background: var(--color-primary) !important; color: #fff !important; border-color: var(--color-primary) !important; font-weight: 700 !important; }
            </style>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="practice-changing" style="background:rgba(16,185,129,0.12); color:#059669; border:1px solid rgba(16,185,129,0.3); font-size:11px; font-weight:700; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              <i class="fa-solid fa-star"></i> Nổi bật (Practice-Changing)
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="viêm phổi" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Viêm phổi (CAP)
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="sepsis" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Sepsis / Sốc NK
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="rung nhĩ" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Rung nhĩ (AF)
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="suy tim" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Suy tim (HF)
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="tăng huyết áp" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Huyết áp
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="đái tháo đường" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Đái tháo đường
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="thận" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Thận mạn (CKD)
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="viêm gan" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Viêm gan B/C
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="sốt xuất huyết" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              SXH Dengue
            </button>
            <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="kháng sinh" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:3px 9px; border-radius:12px; height:auto; white-space:nowrap;">
              Kháng sinh (AMR)
            </button>
          </div>
        </div>

        <!-- Results Body -->
        <div id="ebmBridgeContent" style="padding:20px; overflow-y:auto; flex:1;">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:24px; margin-bottom:8px;"></i>
            <div>Đang nạp dữ liệu từ Kho Guidelines...</div>
          </div>
        </div>

      </div>
    `;

    this.modalEl.style.display = 'flex';

    document.getElementById('btnCloseEbmBridge')?.addEventListener('click', () => this.close());
    
    const searchInput = document.getElementById('ebmBridgeSearchInput') as HTMLInputElement;
    const btnSearch = document.getElementById('btnEbmBridgeDoSearch');

    let debounceTimer: any = null;

    // ⚡ Live Search khi gõ (Debounce 180ms)
    searchInput?.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = searchInput.value.trim();
        this.modalEl.querySelectorAll('.js-ebm-chip').forEach(c => c.classList.remove('active'));
        this.performSearch(val);
      }, 180);
    });

    btnSearch?.addEventListener('click', () => {
      clearTimeout(debounceTimer);
      if (searchInput) this.performSearch(searchInput.value.trim());
    });

    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(debounceTimer);
        this.performSearch(searchInput.value.trim());
      }
    });

    // Quick chip clicks
    this.modalEl.querySelectorAll('.js-ebm-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.modalEl.querySelectorAll('.js-ebm-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const kw = chip.getAttribute('data-keyword') || '';
        if (searchInput) searchInput.value = kw === 'practice-changing' ? '' : kw;
        clearTimeout(debounceTimer);
        this.performSearch(kw);
      });
    });

    await this.loadEbmData();
    this.performSearch(query);
  }

  public close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  public getStudiesList(): any[] {
    const customLocal = (() => {
      try {
        const s = localStorage.getItem('cliniportal_custom_studies');
        return s ? JSON.parse(s) : [];
      } catch { return []; }
    })();
    const windowStudies = (window as any).studies || [];
    const combined = [...customLocal, ...windowStudies];
    const seen = new Set<string>();
    const list: any[] = [];
    combined.forEach(s => {
      if (s && s.id && !seen.has(s.id)) {
        seen.add(s.id);
        list.push(s);
      }
    });
    return list;
  }

  public async loadEbmData(): Promise<void> {
    let studies = this.getStudiesList();

    // Nếu localStorage chưa có, tự động kéo từ Supabase nếu đã có config
    if (studies.length === 0) {
      const sbUrl = localStorage.getItem('supabaseUrl') || localStorage.getItem('dsp_soap_supabase_url') || localStorage.getItem('dsp_supabase_url');
      const sbKey = localStorage.getItem('supabaseKey') || localStorage.getItem('dsp_soap_supabase_key') || localStorage.getItem('dsp_supabase_key');
      
      if (sbUrl && sbKey) {
        try {
          const endpoint = `${sbUrl.replace(/\/+$/, '')}/rest/v1/clinical_guidelines?select=*`;
          const res = await fetch(endpoint, {
            headers: { 'apikey': sbKey, 'Authorization': `Bearer ${sbKey}` }
          });
          if (res.ok) {
            const remote = await res.json();
            if (Array.isArray(remote) && remote.length > 0) {
              studies = remote;
              if (typeof window !== 'undefined') {
                (window as any).studies = studies;
              }
              try {
                localStorage.setItem('cliniportal_custom_studies', JSON.stringify(studies));
              } catch {}
            }
          }
        } catch (e) {
          console.warn('[EBM Bridge] Không thể kết nối Supabase:', e);
        }
      }
    }

    if (typeof window !== 'undefined') {
      (window as any).studies = studies;
    }
  }

  /**
   * Trả về danh sách 2-4 guidelines phù hợp nhất cho Contextual Suggestion Bar trong SOAP
   */
  public async getSmartSuggestions(query: string, icd10Codes: string[] = []): Promise<any[]> {
    await this.loadEbmData();
    const studies = this.getStudiesList();
    if (!studies.length || !query) return [];

    const icdRegex = /[A-Z][0-9]{2}(?:\.[0-9]+)?/gi;
    const foundCodes = Array.from(new Set([...(query.match(icdRegex) || []), ...icd10Codes])).map(c => c.toUpperCase());

    const results: any[] = [];
    const seenIds = new Set<string>();

    if (foundCodes.length > 0) {
      foundCodes.forEach(code => {
        const rootCode = code.split('.')[0]!;
        studies.forEach((s: any) => {
          if (s.icd10Codes && s.icd10Codes.some((c: string) => c.toUpperCase().startsWith(rootCode)) && !seenIds.has(s.id)) {
            seenIds.add(s.id);
            results.push(s);
          }
        });
      });
    }

    // Keyword fallback / addition
    const lower = query.toLowerCase().replace(/icd-10|icd|mã|bệnh|soạn|khám/gi, '').trim();
    const keywords = lower.split(/[\s,\.\-]+/).filter(k => k.length > 2);

    if (keywords.length > 0) {
      studies.forEach((s: any) => {
        if (seenIds.has(s.id)) return;
        const text = [s.title, s.intervention, s.population, s.summary, s.drug].join(' ').toLowerCase();
        if (keywords.some(kw => text.includes(kw))) {
          seenIds.add(s.id);
          results.push(s);
        }
      });
    }

    // Ưu tiên hiển thị practice-changing lên đầu
    results.sort((a, b) => {
      const aImpact = a.impact === 'practice-changing' ? 1 : 0;
      const bImpact = b.impact === 'practice-changing' ? 1 : 0;
      return bImpact - aImpact;
    });

    return results.slice(0, 4);
  }

  private performSearch(query: string) {
    const contentEl = document.getElementById('ebmBridgeContent');
    if (!contentEl) return;

    const studies = this.getStudiesList();
    
    const SPECIALTY_KEYWORD_MAP: Record<string, string[]> = {
      'cardio': ['tim mạch', 'tim', 'rung nhĩ', 'suy tim', 'tăng huyết áp', 'đột quỵ', 'ngất', 'mạch vành', 'af', 'hypertension', 'syncope'],
      'pulmo': ['hô hấp', 'phổi', 'viêm phổi', 'copd', 'hen', 'asthma', 'mô kẽ', 'ards', 'shh', 'suy hô hấp'],
      'icu': ['hồi sức', 'cấp cứu', 'sepsis', 'sốc', 'nhiễm khuẩn huyết', 'sốc tim', 'ards', 'thở máy', 'tăng áp', 'icu', 'nặng'],
      'endo': ['nội tiết', 'đái tháo đường', 'tiểu đường', 'diabetes', 'bão giáp', 'tuyến giáp', 'bàn chân', 'hba1c'],
      'renal': ['thận', 'suy thận', 'ckd', 'aki', 'kdigo', 'tiết niệu', 'creatinine', 'lọc máu'],
      'infect': ['truyền nhiễm', 'nhiễm khuẩn', 'viêm gan', 'sốt rét', 'sốt xuất huyết', 'dengue', 'cúm', 'sởi', 'covid', 'lao', 'kháng sinh', 'amr', 'vi nấm'],
      'neuro': ['thần kinh', 'màng não', 'viêm màng não', 'động kinh', 'tai biến'],
      'obgyn': ['sản', 'phụ khoa', 'u xơ', 'tử cung', 'thai']
    };

    let results: any[] = [];

    if (!query || query.trim() === '') {
      results = [...studies];
    } else if (query === 'practice-changing') {
      results = studies.filter((s: any) => s.impact === 'practice-changing');
    } else {
      const lowerQuery = query.toLowerCase()
        .replace(/icd-10|icd|mã|bệnh|khám|chẩn đoán|biện luận|mức độ|đáp ứng|điều trị|theo dõi/gi, ' ')
        .trim();

      // 1. Trích xuất tất cả các mã ICD-10 từ đoạn văn bản
      const icdRegex = /[A-Z][0-9]{2}(?:\.[0-9]+)?/gi;
      const foundCodes = Array.from(new Set((query.match(icdRegex) || []).map(c => c.toUpperCase())));

      // 2. Trích xuất các cụm từ chẩn đoán y khoa tiêu biểu
      const KEY_MEDICAL_PHRASES = [
        'viêm phổi', 'suy hô hấp', 'copd', 'hen phế quản', 'ards',
        'sepsis', 'sốc nhiễm khuẩn', 'sốc tim', 'kháng sinh',
        'rung nhĩ', 'suy tim', 'tăng huyết áp', 'ngất', 'đột quỵ',
        'hạ kali', 'tăng kali', 'rối loạn điện giải', 'suy thận', 'bệnh thận mạn', 'ckd', 'aki',
        'đái tháo đường', 'bão giáp', 'hạ đường huyết',
        'viêm gan b', 'viêm gan c', 'sốt xuất huyết', 'sốt rét', 'lao phổi', 'viêm màng não',
        'u xơ tử cung', 'nhập viện cấp cứu'
      ];

      const matchedPhrases = KEY_MEDICAL_PHRASES.filter(p => lowerQuery.includes(p));

      // 3. Tách các từ đơn có nghĩa (loại bỏ từ nối ngắn)
      const stopWords = new Set(['và', 'hoặc', 'của', 'với', 'trong', 'khi', 'cho', 'này', 'các', 'được', 'tốt', 'nhẹ', 'nặng', 'n1', 'n2', 'n3', 'n4', 'dt', 'bn', 'người']);
      const tokens = lowerQuery.split(/[\s,\.\-()/:;]+/).filter(k => k.length >= 2 && !stopWords.has(k));

      // Scoring Engine cho từng nghiên cứu
      const scoredList: { study: any; score: number; matchedTags: string[] }[] = [];

      studies.forEach((s: any) => {
        let score = 0;
        const matchedTags: string[] = [];
        const studyText = [
          s.title,
          s.drug,
          s.summary,
          s.detailedConclusion,
          s.intervention,
          s.population,
          s.organization,
          (s.icd10Codes || []).join(' ')
        ].join(' ').toLowerCase();

        // A. Match ICD-10 (+150 điểm)
        if (foundCodes.length > 0) {
          foundCodes.forEach(code => {
            const rootCode = code.split('.')[0]!;
            if (s.icd10Codes && s.icd10Codes.some((c: string) => c.toUpperCase().startsWith(rootCode))) {
              score += 150;
              matchedTags.push(code);
            }
          });
        }

        // B. Match cụm từ y khoa chính xác (+100 điểm cho Tiêu đề, +50 điểm cho Nội dung)
        matchedPhrases.forEach(phrase => {
          if (s.title && s.title.toLowerCase().includes(phrase)) {
            score += 100;
            matchedTags.push(phrase);
          } else if (studyText.includes(phrase)) {
            score += 50;
            matchedTags.push(phrase);
          }
        });

        // C. Match Chuyên khoa (+30 điểm)
        Object.entries(SPECIALTY_KEYWORD_MAP).forEach(([specKey, syns]) => {
          if (s.specialty === specKey && syns.some(syn => lowerQuery.includes(syn))) {
            score += 30;
          }
        });

        // D. Match Tokens (+15 điểm cho Tiêu đề/Thuốc, +5 điểm cho tóm tắt)
        tokens.forEach(tok => {
          if (s.title && s.title.toLowerCase().includes(tok)) {
            score += 15;
          } else if (studyText.includes(tok)) {
            score += 5;
          }
        });

        // Bonus điểm nếu là Practice-Changing (+20)
        if (score > 0 && s.impact === 'practice-changing') {
          score += 20;
        }

        if (score > 0) {
          const cloned = { ...s };
          if (matchedTags.length > 0) {
            cloned._matchedCodes = Array.from(new Set(matchedTags));
          }
          scoredList.push({ study: cloned, score, matchedTags });
        }
      });

      scoredList.sort((a, b) => b.score - a.score);
      results = scoredList.map(item => item.study);
    }

    if (studies.length === 0) {
      contentEl.innerHTML = `
        <div style="text-align:center; padding:50px 20px;">
          <div style="font-size:48px; margin-bottom:12px; opacity:0.8;">📚</div>
          <h3 style="color:var(--color-text); margin:0 0 8px 0; font-size:18px; font-weight:800;">Kho Guidelines Chưa Có Dữ Liệu Nghiên Cứu</h3>
          <p style="font-size:13.5px; color:var(--color-text-muted); margin:0 0 20px 0; max-width:550px; margin-left:auto; margin-right:auto; line-height:1.6;">
            Dữ liệu EBM trong SOAP được kết nối <strong>trực tiếp và đồng bộ động 100%</strong> với phân hệ <strong>Kho Guidelines</strong> của bạn. Bất kỳ nghiên cứu mới nào được nạp, tạo mới hoặc đồng bộ qua Supabase trong phân hệ Guidelines sẽ tự động hiển thị tại đây.
          </p>
          <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
            <a href="#/ebm/guidelines" class="dsp-btn dsp-btn-primary" onclick="document.getElementById('modalEbmBridge').style.display='none';">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Kho Guidelines (EBM) để thêm nghiên cứu
            </a>
          </div>
        </div>
      `;
      return;
    }

    if (results.length === 0) {
      contentEl.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
          <div style="font-size:40px; margin-bottom:10px; color:var(--color-text-muted);">📁</div>
          <h3 style="color:var(--color-text); margin:0 0 6px 0; font-size:16px; font-weight:800;">Không Tìm Thấy Guideline Khớp Từ Khóa</h3>
          <p style="font-size:13px; color:var(--color-text-muted); margin:0 0 16px 0; max-width:550px; margin-left:auto; margin-right:auto;">
            Không có nghiên cứu nào trong Kho Guidelines khớp với từ khóa <em>"${escapeHtml(query)}"</em>. Bạn có thể thử tìm theo mã ICD-10, tên hoạt chất hoặc chọn tất cả để duyệt.
          </p>
          <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" onclick="document.getElementById('ebmBridgeSearchInput').value=''; document.getElementById('btnEbmBridgeDoSearch').click();">
            <i class="fa-solid fa-list"></i> Xem tất cả ${studies.length} nghiên cứu hiện có
          </button>
        </div>
      `;
      return;
    }

    const headerText = query === 'practice-changing'
      ? `Danh sách <strong>${results.length}</strong> khuyến cáo thay đổi thực hành lâm sàng nổi bật.`
      : `Tìm thấy <strong>${results.length}</strong> kết quả phù hợp cho "${escapeHtml(query)}".`;

    contentEl.innerHTML = `
      <div style="margin-bottom:16px; font-size:13px; color:var(--color-text); background:rgba(2,132,199,0.08); border-left:4px solid var(--color-primary); padding:10px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
        <div><i class="fa-solid fa-brain" style="color:var(--color-primary); margin-right:8px;"></i> ${headerText}</div>
        <span style="font-size:11px; color:var(--color-text-muted); font-weight:600;">EBM Bridge 2.0 (${studies.length} Guidelines Sẵn Sàng)</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${results.map((r: any) => this.renderStudyCard(r)).join('')}
      </div>
    `;

    // Bind Inserter & Bookmark actions
    this.bindCardActions(results);
  }

  private renderStudyCard(s: any): string {
    const isPracticeChanging = s.impact === 'practice-changing';
    const detailConclusion = s.detailedConclusion || s.keyResults || s.summary;

    return `
      <div class="dsp-card dsp-p-4" style="border:1px solid ${isPracticeChanging ? '#10b981' : 'var(--color-border)'}; background:${isPracticeChanging ? 'rgba(16, 185, 129, 0.03)' : 'var(--color-surface)'}; border-radius:10px; box-shadow:${isPracticeChanging ? '0 4px 12px rgba(16,185,129,0.12)' : '0 2px 6px rgba(0,0,0,0.04)'};">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; gap:12px;">
          <div>
            ${isPracticeChanging ? `
              <div style="display:inline-flex; align-items:center; gap:5px; background:linear-gradient(135deg, #10b981, #059669); color:#fff; font-size:11px; font-weight:800; padding:3px 9px; border-radius:6px; margin-bottom:6px; box-shadow:0 2px 4px rgba(16,185,129,0.25);">
                <i class="fa-solid fa-star"></i> KHUYẾN CÁO NỔI BẬT (Practice-Changing)
              </div>
            ` : ''}
            <h4 style="margin:0; font-size:15.5px; color:${isPracticeChanging ? '#047857' : 'var(--color-primary)'}; font-weight:800; line-height:1.4;">
              ${escapeHtml(s.title)}
            </h4>
            <div style="font-size:11.5px; color:var(--color-text-muted); margin-top:3px;">
              <i class="fa-solid fa-building-columns"></i> ${escapeHtml(s.organization || 'Tổ chức chuyên khoa')} · <i class="fa-solid fa-calendar"></i> ${s.year || '2026'}
            </div>
          </div>
          <div style="display:flex; gap:6px; flex-shrink:0; flex-wrap:wrap; justify-content:flex-end;">
            ${s.file ? `
              <a href="src/content/ebm/guidelines/${s.file}" target="_blank" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size:11px; padding:4px 8px; color:var(--color-primary); text-decoration:none; display:inline-flex; align-items:center; gap:4px; border:1px solid var(--color-border); border-radius:6px;" title="Mở trang Infographic & Guideline đầy đủ trong tab mới">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Đọc bài gốc
              </a>
            ` : ''}
            
            <!-- Button chèn vào ô A (Đánh giá) -->
            <button type="button" class="dsp-btn dsp-btn-sm js-btn-insert-a" data-study-id="${s.id}" style="font-size:11px; font-weight:700; padding:4px 9px; background:rgba(2,132,199,0.1); color:var(--color-primary); border:1px solid var(--color-primary); border-radius:6px; display:inline-flex; align-items:center; gap:4px;" title="Chèn khuyến cáo và phân tầng nguy cơ vào ô Đánh giá (A)">
              <i class="fa-solid fa-stethoscope"></i> + Chèn vào ô A (Đánh giá)
            </button>

            <!-- Button chèn vào ô P (Kế hoạch) -->
            <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm js-btn-insert-p" data-study-id="${s.id}" style="font-size:11px; font-weight:700; padding:4px 9px; background:${isPracticeChanging ? '#059669' : 'var(--color-primary)'}; border-color:${isPracticeChanging ? '#059669' : 'var(--color-primary)'}; border-radius:6px; display:inline-flex; align-items:center; gap:4px;" title="Chèn phác đồ thuốc, can thiệp và liều lượng vào ô Kế hoạch (P)">
              <i class="fa-solid fa-capsules"></i> + Chèn vào ô P (Kế hoạch)
            </button>

            <!-- Button lưu phác đồ -->
            <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm js-btn-save-protocol" data-study-id="${s.id}" style="font-size:11px; padding:4px 8px; border-radius:6px;" title="Lưu thành Phác đồ cá nhân trong sổ tay DocSpace">
              <i class="fa-solid fa-bookmark"></i> Lưu phác đồ
            </button>
          </div>
        </div>
        
        <div style="font-size:12px; margin-bottom:8px; display:flex; gap:6px; flex-wrap:wrap;">
          ${s._matchedCodes ? s._matchedCodes.map((c: string) => `<span style="background:rgba(245,158,11,0.15); color:#f59e0b; padding:2px 6px; border-radius:4px; font-weight:700;"><i class="fa-solid fa-tag"></i> ${c}</span>`).join('') : ''}
          ${s.drug ? `<span style="background:rgba(99,102,241,0.15); color:#818cf8; padding:2px 6px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-pills"></i> ${escapeHtml(s.drug)}</span>` : ''}
        </div>

        <div style="font-size:13px; color:var(--color-text); margin-bottom:8px; line-height:1.5;">
          <strong>Tóm tắt:</strong> ${escapeHtml(s.summary)}
        </div>
        
        <div style="font-size:13px; color:var(--color-text); background:${isPracticeChanging ? '#ecfdf5' : 'var(--color-bg)'}; padding:10px 12px; border-radius:6px; border-left:4px solid ${isPracticeChanging ? '#10b981' : 'var(--color-primary)'}; line-height:1.5;">
          <strong style="color:${isPracticeChanging ? '#065f46' : 'var(--color-text)'};">Khuyến cáo chính (EBM):</strong> ${escapeHtml(detailConclusion)}
        </div>
      </div>
    `;
  }

  private bindCardActions(studies: any[]) {
    // Helper chèn nội dung vào textarea
    const insertIntoTextarea = (targetEl: HTMLTextAreaElement | null, text: string, successMsg: string) => {
      if (targetEl) {
        const currentVal = targetEl.value.trim();
        const prefix = currentVal ? '\n\n' : '';
        targetEl.value = currentVal + prefix + text;
        targetEl.focus();
        alert(successMsg);
        this.close();
      } else {
        navigator.clipboard.writeText(text).then(() => {
          alert('✅ Đã sao chép nội dung khuyến cáo vào Clipboard! Bạn có thể dán (Ctrl+V) vào bệnh án.');
        });
      }
    };

    // 1A. Chèn vào ô A (Đánh giá / Chẩn đoán)
    document.querySelectorAll('.js-btn-insert-a').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-study-id');
        const study = studies.find(s => s.id === id);
        if (!study) return;

        const conclusion = study.detailedConclusion || study.keyResults || study.summary;
        const textToInsert = `[EBM Đánh giá — ${study.title}]:\n• Khuyến cáo & Phân tầng: ${conclusion}`;

        if (this.currentOptions?.onInsertRecommendation) {
          this.currentOptions.onInsertRecommendation(textToInsert);
          this.close();
          return;
        }

        const esAAssessmentEl = document.getElementById('esAAssessment') as HTMLTextAreaElement;
        const dspCaseDiagnosisEl = document.getElementById('dspCaseDiagnosis') as HTMLTextAreaElement;
        const target = esAAssessmentEl || dspCaseDiagnosisEl;

        insertIntoTextarea(target, textToInsert, '✅ Đã chèn khuyến cáo EBM vào ô Đánh giá (A) thành công!');
      });
    });

    // 1B. Chèn vào ô P (Kế hoạch / Y lệnh điều trị)
    document.querySelectorAll('.js-btn-insert-p').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-study-id');
        const study = studies.find(s => s.id === id);
        if (!study) return;

        const drugLine = study.drug ? `\n• Thuốc / Phác đồ: ${study.drug}` : '';
        const interventionLine = study.intervention ? `\n• Can thiệp: ${study.intervention}` : '';
        const conclusion = study.detailedConclusion || study.keyResults || study.summary;
        const textToInsert = `[EBM Kế hoạch & Điều trị — ${study.title}]:${drugLine}${interventionLine}\n• Hướng dẫn thực hành: ${conclusion}`;

        if (this.currentOptions?.onInsertRecommendation) {
          this.currentOptions.onInsertRecommendation(textToInsert);
          this.close();
          return;
        }

        const esPPlanEl = document.getElementById('esPPlan') as HTMLTextAreaElement;
        const dspCaseMgmtEl = document.getElementById('dspCaseMgmt') as HTMLTextAreaElement;
        const target = esPPlanEl || dspCaseMgmtEl;

        insertIntoTextarea(target, textToInsert, '✅ Đã chèn phác đồ điều trị EBM vào ô Kế hoạch (P) thành công!');
      });
    });

    // 2. Save Protocol
    document.querySelectorAll('.js-btn-save-protocol').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-study-id');
        const study = studies.find(s => s.id === id);
        if (!study) return;

        const profile = getActiveProfile();
        if (!profile) {
          alert('Vui lòng chọn hồ sơ bác sĩ trước.');
          return;
        }

        const conclusion = study.detailedConclusion || study.keyResults || study.summary;
        saveProtocol(profile.id, {
          title: `Phác đồ: ${study.title}`,
          specialty: study.organization || 'EBM Guideline',
          steps: [
            { order: 1, text: `Chỉ định / Đối tượng: ${study.population || study.title}` },
            { order: 2, text: `Can thiệp / Liều: ${study.intervention || study.drug || 'Theo phác đồ chuẩn'}` },
            { order: 3, text: `Khuyến cáo thực hành: ${conclusion}`, isAlert: study.impact === 'practice-changing' },
          ],
          warnings: study.impact === 'practice-changing' ? ['Thay đổi thực hành lâm sàng quan trọng'] : [],
          references: [study.title, study.organization],
        });

        alert(`✅ Đã lưu "${study.title}" vào Phác Đồ Cá Nhân thành công!`);
      });
    });
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/[&<>"']/g, match => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return map[match] || match;
  });
}

export const ebmBridge = new EbmBridge();
