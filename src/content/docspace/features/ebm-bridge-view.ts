import { saveProtocol, getActiveProfile } from '../storage';
import { KHO_GUIDELINES_STATIC } from '../../ebm/guidelines/js/kho-guidelines-registry';
import { calculatorPicker } from './calculator-picker';

export interface EbmSearchOptions {
  targetFieldId?: string;
  onInsertRecommendation?: (recText: string) => void;
}

export class EbmBridge {
  private modalEl: HTMLElement;
  private currentOptions?: EbmSearchOptions;
  private currentDesignFilter: string = 'all';
  private currentQuery: string = '';
  
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

  public async openSearch(query: string = '', options?: EbmSearchOptions) {
    this.currentOptions = options;
    
    // Xử lý sạch query: Nếu là từ khóa cờ 'practice-changing' hoặc rỗng thì mở chế độ lọc tương ứng
    let cleanQuery = (query || '').trim();
    if (cleanQuery.toLowerCase() === 'practice-changing') {
      this.currentDesignFilter = 'practice-changing';
      cleanQuery = '';
    } else {
      this.currentDesignFilter = 'all';
    }

    // Nếu query quá dài (do bóc tách cả đoạn S/O), rút trích ngắn gọn
    cleanQuery = this.sanitizeQuery(cleanQuery);
    this.currentQuery = cleanQuery;

    // Tạo Smart Context Chips động theo query
    const dynamicChips = this.generateContextChips(cleanQuery);

    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); width:100%; max-width:1050px; max-height:92vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border: 1px solid var(--color-border);">
        
        <!-- Header -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(2,132,199,0.15); color:var(--color-primary); display:flex; align-items:center; justify-content:center; font-size:1.15rem;">
              <i class="fa-solid fa-book-medical"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:16.5px; font-weight:800; color:var(--color-primary);">Tra cứu Y học Chứng cứ (EBM Bridge 2.0)</h3>
                <span style="background:rgba(2,132,199,0.12); color:var(--color-primary); font-size:11px; font-weight:700; padding:2px 8px; border-radius:10px;">Phân loại Nghiên cứu Sát Bệnh Án SOAP</span>
              </div>
              <p style="margin:2px 0 0 0; font-size:12px; color:var(--color-text-muted);">Tra cứu khuyến cáo Guidelines, RCTs &amp; Chèn trực tiếp vào Bệnh án SOAP (ô A hoặc P)</p>
            </div>
          </div>
          <button id="btnCloseEbmBridge" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted); line-height:1;" title="Đóng">&times;</button>
        </div>

        <!-- Search Bar Strip & Design Type Filter Tabs -->
        <div style="padding:12px 20px; background:var(--color-surface); border-bottom:1px solid var(--color-border); display:flex; flex-direction:column; gap:10px;">
          
          <div style="display:flex; gap:10px; align-items:center;">
            <div style="position:relative; flex:1;">
              <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:13px;"></i>
              <input type="text" id="ebmBridgeSearchInput" class="dsp-input" value="${cleanQuery.replace(/"/g, '&quot;')}" placeholder="Tìm theo tên bệnh, mã ICD-10 (VD: J18, I50, E11, I48), hoạt chất hoặc phác đồ..." style="padding-left:34px; font-size:13px;" />
            </div>
            <button type="button" id="btnEbmBridgeDoSearch" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight:700;">
              <i class="fa-solid fa-filter"></i> Tìm kiếm
            </button>
          </div>

          <!-- Filter Tabs: Loại Nghiên cứu (Design Filters) -->
          <div style="display:flex; gap:6px; align-items:center; overflow-x:auto; padding-bottom:2px; scrollbar-width:thin; border-bottom: 1px dashed var(--color-border); padding-bottom: 8px;">
            <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; white-space:nowrap; margin-right:4px;">
              <i class="fa-solid fa-layer-group"></i> Loại nghiên cứu:
            </span>
            <button type="button" class="js-design-filter dsp-btn dsp-btn-sm ${this.currentDesignFilter === 'all' ? 'active' : ''}" data-design="all" style="font-size:11px; padding:2px 8px; border-radius:12px; height:auto;">
              Tất cả
            </button>
            <button type="button" class="js-design-filter dsp-btn dsp-btn-sm ${this.currentDesignFilter === 'guideline' ? 'active' : ''}" data-design="guideline" style="font-size:11px; padding:2px 8px; border-radius:12px; height:auto;">
              <i class="fa-solid fa-file-shield" style="color:#0d9488;"></i> Guidelines &amp; BYT
            </button>
            <button type="button" class="js-design-filter dsp-btn dsp-btn-sm ${this.currentDesignFilter === 'rct' ? 'active' : ''}" data-design="rct" style="font-size:11px; padding:2px 8px; border-radius:12px; height:auto;">
              <i class="fa-solid fa-flask-vial" style="color:#dc2626;"></i> Thử nghiệm RCT
            </button>
            <button type="button" class="js-design-filter dsp-btn dsp-btn-sm ${this.currentDesignFilter === 'meta' ? 'active' : ''}" data-design="meta" style="font-size:11px; padding:2px 8px; border-radius:12px; height:auto;">
              <i class="fa-solid fa-chart-pie" style="color:#2563eb;"></i> Meta-Analysis
            </button>
            <button type="button" class="js-design-filter dsp-btn dsp-btn-sm ${this.currentDesignFilter === 'review' ? 'active' : ''}" data-design="review" style="font-size:11px; padding:2px 8px; border-radius:12px; height:auto;">
              <i class="fa-solid fa-book-open" style="color:#7c3aed;"></i> Bài Tổng quan Review
            </button>
            <button type="button" class="js-design-filter dsp-btn dsp-btn-sm ${this.currentDesignFilter === 'practice-changing' ? 'active' : ''}" data-design="practice-changing" style="background:rgba(16,185,129,0.12); color:#059669; border:1px solid rgba(16,185,129,0.3); font-size:11px; font-weight:700; padding:2px 8px; border-radius:12px; height:auto;">
              <i class="fa-solid fa-star"></i> Practice-Changing
            </button>
          </div>
          
          <!-- Smart Context Suggested Chips -->
          <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:2px; scrollbar-width:thin;">
            <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; white-space:nowrap; margin-right:4px;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Gợi ý ngữ cảnh:
            </span>
            ${dynamicChips}
          </div>
        </div>

        <!-- Results Body -->
        <div id="ebmBridgeContent" style="padding:16px 20px; overflow-y:auto; flex:1;">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:24px; margin-bottom:8px;"></i>
            <div>Đang nạp dữ liệu từ Kho Guidelines &amp; EBM Registry...</div>
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
        this.currentQuery = val;
        this.performSearch(val);
      }, 180);
    });

    btnSearch?.addEventListener('click', () => {
      clearTimeout(debounceTimer);
      if (searchInput) {
        this.currentQuery = searchInput.value.trim();
        this.performSearch(this.currentQuery);
      }
    });

    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(debounceTimer);
        this.currentQuery = searchInput.value.trim();
        this.performSearch(this.currentQuery);
      }
    });

    // Handle Design Filter Tabs click
    this.modalEl.querySelectorAll('.js-design-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        this.modalEl.querySelectorAll('.js-design-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentDesignFilter = btn.getAttribute('data-design') || 'all';
        this.performSearch(this.currentQuery);
      });
    });

    // Handle Context Chip clicks
    this.modalEl.querySelectorAll('.js-ebm-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.modalEl.querySelectorAll('.js-ebm-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const kw = chip.getAttribute('data-keyword') || '';
        if (searchInput) searchInput.value = kw;
        this.currentQuery = kw;
        clearTimeout(debounceTimer);
        this.performSearch(kw);
      });
    });

    await this.loadEbmData();
    this.performSearch(cleanQuery);
  }

  public close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  /**
   * Rút gọn và làm sạch chuỗi query lâm sàng
   */
  private sanitizeQuery(raw: string): string {
    if (!raw) return '';
    let q = raw.trim();
    // Nếu query có dấu xuống dòng, lấy dòng đầu tiên
    if (q.includes('\n')) {
      q = q.split('\n')[0].trim();
    }
    // Tìm mã ICD-10 trước nếu có
    const icdMatch = q.match(/[A-Z][0-9]{2}(?:\.[0-9]+)?/i);
    if (icdMatch && q.length > 50) {
      return icdMatch[0].toUpperCase();
    }
    // Cắt bớt nếu quá dài
    if (q.length > 60) {
      q = q.substring(0, 60).split(/[,;.-]/)[0].trim();
    }
    return q;
  }

  /**
   * Sinh Smart Context Chips theo ngữ cảnh query hoặc chẩn đoán SOAP
   */
  private generateContextChips(query: string): string {
    const q = (query || '').toLowerCase();
    
    // Default general chips
    let chipList: Array<{ label: string; kw: string }> = [];

    if (q.includes('phổi') || q.includes('hô hấp') || q.includes('copd') || q.includes('hen') || q.includes('j18') || q.includes('j44') || q.includes('j45')) {
      chipList = [
        { label: 'Viêm phổi (CAP)', kw: 'viêm phổi' },
        { label: 'COPD (GOLD/BYT)', kw: 'copd' },
        { label: 'Hen suyễn (GINA)', kw: 'hen suyễn' },
        { label: 'Lao phổi (TB)', kw: 'lao' },
        { label: 'Bệnh phổi kẽ (ILD)', kw: 'mô kẽ' },
        { label: 'Nấm Aspergillus', kw: 'aspergillus' }
      ];
    } else if (q.includes('tim') || q.includes('mạch') || q.includes('huyết áp') || q.includes('i50') || q.includes('i48') || q.includes('i10') || q.includes('i25')) {
      chipList = [
        { label: 'Rung nhĩ (AF ESC)', kw: 'rung nhĩ' },
        { label: 'Tăng huyết áp (AHA)', kw: 'tăng huyết áp' },
        { label: 'Suy tim & EMPA-REG', kw: 'suy tim' },
        { label: 'H/C Tim-Thận (CKM)', kw: 'ckm' },
        { label: 'Sốc tim (JCVA)', kw: 'sốc tim' },
        { label: 'Ngất (Syncope NEJM)', kw: 'ngất' }
      ];
    } else if (q.includes('sepsis') || q.includes('sốc') || q.includes('icu') || q.includes('cấp cứu') || q.includes('nhiễm khuẩn') || q.includes('a41')) {
      chipList = [
        { label: 'Sepsis / Sốc NK (SSC)', kw: 'sepsis' },
        { label: 'Kháng sinh ICU (PK/PD)', kw: 'kháng sinh' },
        { label: 'ARDS & Nằm sấp', kw: 'ards' },
        { label: 'Tiêu chuẩn Cấp cứu (BYT)', kw: 'nhập viện' },
        { label: 'Vi khuẩn đa kháng (AMR)', kw: 'kháng thuốc' }
      ];
    } else if (q.includes('đường') || q.includes('đái tháo đường') || q.includes('tiểu đường') || q.includes('e11') || q.includes('giáp') || q.includes('nội tiết')) {
      chipList = [
        { label: 'ĐTĐ Típ 2 (ADA 2026)', kw: 'đái tháo đường' },
        { label: 'Bão giáp (JCEM)', kw: 'bão giáp' },
        { label: 'Bệnh TK ĐTĐ (BYT)', kw: 'thần kinh đái tháo đường' },
        { label: 'H/C CKM Tim-Thận', kw: 'ckm' },
        { label: 'Ăn kiêng Low-Carb', kw: 'low-carb' }
      ];
    } else if (q.includes('thận') || q.includes('n18') || q.includes('ckd') || q.includes('aki') || q.includes('tiết niệu')) {
      chipList = [
        { label: 'Bệnh thận mạn (KDIGO)', kw: 'bệnh thận mạn' },
        { label: 'H/C CKM Tim-Thận', kw: 'ckm' },
        { label: 'Empagliflozin Bảo vệ thận', kw: 'empagliflozin' },
        { label: 'Kháng sinh chỉnh liều thận', kw: 'kháng sinh' }
      ];
    } else if (q.includes('gan') || q.includes('b18') || q.includes('k74') || q.includes('tiêu hóa') || q.includes('hcv') || q.includes('hbv')) {
      chipList = [
        { label: 'Viêm gan B (BYT/APASL)', kw: 'viêm gan b' },
        { label: 'Viêm gan C (BYT/DAAs)', kw: 'viêm gan c' },
        { label: 'Lưu đồ nhanh VGB', kw: 'lưu đồ viêm gan b' }
      ];
    } else if (q.includes('sốt') || q.includes('nhiễm trùng') || q.includes('virus') || q.includes('dengue') || q.includes('sởi') || q.includes('cúm')) {
      chipList = [
        { label: 'SXH Dengue (BYT)', kw: 'sốt xuất huyết' },
        { label: 'Sốt rét (BYT)', kw: 'sốt rét' },
        { label: 'Cúm mùa (Tamiflu)', kw: 'cúm' },
        { label: 'Sởi (Vitamin A)', kw: 'sởi' },
        { label: 'Viêm màng não (WHO)', kw: 'viêm màng não' },
        { label: 'Tay Chân Miệng (HFMD)', kw: 'tay chân miệng' }
      ];
    } else {
      chipList = [
        { label: 'Viêm phổi (CAP)', kw: 'viêm phổi' },
        { label: 'Sepsis / Sốc NK', kw: 'sepsis' },
        { label: 'Rung nhĩ (AF)', kw: 'rung nhĩ' },
        { label: 'Suy tim (HF)', kw: 'suy tim' },
        { label: 'Tăng huyết áp', kw: 'tăng huyết áp' },
        { label: 'Đái tháo đường', kw: 'đái tháo đường' },
        { label: 'Thận mạn (CKD)', kw: 'bệnh thận mạn' },
        { label: 'Viêm gan B', kw: 'viêm gan b' },
        { label: 'SXH Dengue', kw: 'sốt xuất huyết' },
        { label: 'Kháng sinh (AMR)', kw: 'kháng sinh' }
      ];
    }

    return chipList.map(item => `
      <button type="button" class="js-ebm-chip dsp-btn dsp-btn-sm" data-keyword="${escapeHtml(item.kw)}" style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); font-size:11px; font-weight:600; padding:2px 8px; border-radius:12px; height:auto; white-space:nowrap;">
        ${escapeHtml(item.label)}
      </button>
    `).join('');
  }

  public getStudiesList(): any[] {
    // 1. Nguồn static chuẩn hóa (luôn giữ độ ưu tiên và độ tin cậy cao nhất)
    const staticList = KHO_GUIDELINES_STATIC || [];
    const seen = new Set<string>(staticList.map(s => s.id));
    const list: any[] = [...staticList];

    // 2. Bổ sung các custom studies hoặc remote nếu có
    const customLocal = (() => {
      try {
        const s = localStorage.getItem('cliniportal_custom_studies');
        return s ? JSON.parse(s) : [];
      } catch { return []; }
    })();

    const windowStudies = (window as any).studies || [];
    [...windowStudies, ...customLocal].forEach(s => {
      if (s && s.id && !seen.has(s.id)) {
        seen.add(s.id);
        list.push(s);
      }
    });

    return list;
  }

  public async loadEbmData(): Promise<void> {
    let studies = this.getStudiesList();

    // Kéo thêm từ Supabase nếu có cấu hình
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
            const seen = new Set<string>(studies.map(s => s.id));
            const newRemoteStudies: any[] = [];
            remote.forEach((r: any) => {
              if (r && r.id && !seen.has(r.id)) {
                seen.add(r.id);
                studies.push(r);
                newRemoteStudies.push(r);
              }
            });
            if (typeof window !== 'undefined') {
              (window as any).studies = studies;
            }
            if (newRemoteStudies.length > 0) {
              try {
                localStorage.setItem('cliniportal_custom_studies', JSON.stringify(newRemoteStudies));
              } catch {}
            }
          }
        }
      } catch (e) {
        console.warn('[EBM Bridge] Không thể kết nối Supabase:', e);
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
    if (!studies.length || (!query && (!icd10Codes || icd10Codes.length === 0))) return [];

    const icdRegex = /[A-Z][0-9]{2}(?:\.[0-9]+)?/gi;
    const foundCodes = Array.from(new Set([...(query ? (query.match(icdRegex) || []) : []), ...icd10Codes])).map(c => c.toUpperCase());

    const results: any[] = [];
    const seenIds = new Set<string>();

    if (foundCodes.length > 0) {
      foundCodes.forEach(code => {
        const rootCode = code.split('.')[0]!;
        studies.forEach((s: any) => {
          const codes = s.icd10Codes || s.icd10 || [];
          if (Array.isArray(codes) && codes.some((c: string) => c.toUpperCase().startsWith(rootCode)) && !seenIds.has(s.id)) {
            seenIds.add(s.id);
            results.push(s);
          }
        });
      });
    }

    // Keyword fallback
    if (query) {
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
    }

    // Ưu tiên: Guideline & RCT & Practice-Changing lên trước
    results.sort((a, b) => {
      const getScore = (s: any) => {
        let sc = 0;
        if (s.design === 'guideline') sc += 40;
        else if (s.design === 'rct') sc += 30;
        if (s.impact === 'practice-changing') sc += 20;
        return sc;
      };
      return getScore(b) - getScore(a);
    });

    return results.slice(0, 4);
  }

  private performSearch(query: string) {
    const contentEl = document.getElementById('ebmBridgeContent');
    if (!contentEl) return;

    let studies = this.getStudiesList();

    // 1. Áp dụng bộ lọc Type Tab (Design Filter)
    if (this.currentDesignFilter === 'guideline') {
      studies = studies.filter((s: any) => s.design === 'guideline' || s.sourceType === 'vn-moh');
    } else if (this.currentDesignFilter === 'rct') {
      studies = studies.filter((s: any) => s.design === 'rct');
    } else if (this.currentDesignFilter === 'meta') {
      studies = studies.filter((s: any) => s.design === 'meta');
    } else if (this.currentDesignFilter === 'review') {
      studies = studies.filter((s: any) => s.design === 'review');
    } else if (this.currentDesignFilter === 'practice-changing') {
      studies = studies.filter((s: any) => s.impact === 'practice-changing');
    }
    
    const SPECIALTY_KEYWORD_MAP: Record<string, string[]> = {
      'cardio': ['tim mạch', 'tim', 'rung nhĩ', 'suy tim', 'tăng huyết áp', 'đột quỵ', 'ngất', 'mạch vành', 'af', 'hypertension', 'syncope'],
      'pulmo': ['hô hấp', 'phổi', 'viêm phổi', 'copd', 'hen', 'asthma', 'mô kẽ', 'ild', 'lao', 'ards', 'shh', 'suy hô hấp'],
      'icu': ['hồi sức', 'cấp cứu', 'sepsis', 'sốc', 'nhiễm khuẩn huyết', 'sốc tim', 'ards', 'thở máy', 'tăng áp', 'icu', 'nặng', 'nhập viện'],
      'endo': ['nội tiết', 'đái tháo đường', 'tiểu đường', 'diabetes', 'bão giáp', 'tuyến giáp', 'bàn chân', 'hba1c'],
      'renal': ['thận', 'suy thận', 'ckd', 'aki', 'kdigo', 'tiết niệu', 'creatinine', 'lọc máu'],
      'infect': ['truyền nhiễm', 'nhiễm khuẩn', 'viêm gan', 'sốt rét', 'sốt xuất huyết', 'dengue', 'cúm', 'sởi', 'covid', 'lao', 'kháng sinh', 'amr', 'vi nấm', 'aspergillus', 'marburg', 'ebola', 'nipah', 'tay chân miệng'],
      'neuro': ['thần kinh', 'màng não', 'viêm màng não', 'động kinh', 'tai biến'],
      'obgyn': ['sản', 'phụ khoa', 'u xơ', 'tử cung', 'thai']
    };

    let results: any[] = [];

    if (!query || query.trim() === '') {
      // Khi không có query, sắp xếp theo độ quan trọng lâm sàng EBM
      results = [...studies].sort((a, b) => {
        const score = (s: any) => {
          let pts = 0;
          if (s.impact === 'practice-changing') pts += 50;
          if (s.sourceType === 'vn-moh') pts += 35;
          if (s.design === 'guideline') pts += 30;
          if (s.design === 'rct') pts += 25;
          return pts;
        };
        return score(b) - score(a);
      });
    } else {
      const lowerQuery = query.toLowerCase()
        .replace(/icd-10|icd|mã|bệnh|khám|chẩn đoán|biện luận|mức độ|đáp ứng|điều trị|theo dõi/gi, ' ')
        .trim();

      // 1. Trích xuất tất cả các mã ICD-10
      const icdRegex = /[A-Z][0-9]{2}(?:\.[0-9]+)?/gi;
      const foundCodes = Array.from(new Set((query.match(icdRegex) || []).map(c => c.toUpperCase())));

      // 2. Trích xuất các cụm từ y khoa chính
      const KEY_MEDICAL_PHRASES = [
        'viêm phổi', 'suy hô hấp', 'copd', 'hen phế quản', 'hen suyễn', 'ards', 'mô kẽ', 'lao phổi',
        'sepsis', 'sốc nhiễm khuẩn', 'sốc tim', 'kháng sinh', 'kháng thuốc',
        'rung nhĩ', 'suy tim', 'tăng huyết áp', 'ngất', 'đột quỵ', 'mạch vành',
        'hạ kali', 'tăng kali', 'rối loạn điện giải', 'suy thận', 'bệnh thận mạn', 'ckd', 'aki',
        'đái tháo đường', 'bão giáp', 'hạ đường huyết', 'thần kinh đái tháo đường',
        'viêm gan b', 'viêm gan c', 'sốt xuất huyết', 'sốt rét', 'viêm màng não', 'tay chân miệng', 'sởi', 'cúm',
        'u xơ tử cung', 'nhập viện cấp cứu', 'aspergillus', 'nấm'
      ];

      const matchedPhrases = KEY_MEDICAL_PHRASES.filter(p => lowerQuery.includes(p));

      // 3. Tách tokens
      const stopWords = new Set(['và', 'hoặc', 'của', 'với', 'trong', 'khi', 'cho', 'này', 'các', 'được', 'tốt', 'nhẹ', 'nặng', 'n1', 'n2', 'n3', 'n4', 'dt', 'bn', 'người']);
      const tokens = lowerQuery.split(/[\s,\.\-()/:;]+/).filter(k => k.length >= 2 && !stopWords.has(k));

      // Scoring Engine chuyên biệt cho SOAP EBM
      const scoredList: { study: any; score: number; matchedTags: string[] }[] = [];

      studies.forEach((s: any) => {
        let score = 0;
        const matchedTags: string[] = [];
        const studyCodes = s.icd10Codes || s.icd10 || [];
        const studyText = [
          s.title,
          s.titleEn,
          s.drug,
          s.summary,
          s.detailedConclusion,
          s.intervention,
          s.population,
          s.organization,
          s.journal,
          Array.isArray(studyCodes) ? studyCodes.join(' ') : ''
        ].join(' ').toLowerCase();

        // A. Match ICD-10 (+180 điểm)
        if (foundCodes.length > 0 && Array.isArray(studyCodes)) {
          foundCodes.forEach(code => {
            const rootCode = code.split('.')[0]!;
            if (studyCodes.some((c: string) => c.toUpperCase().startsWith(rootCode))) {
              score += 180;
              matchedTags.push(code);
            }
          });
        }

        // B. Match cụm từ y khoa chính xác (+120 điểm Tiêu đề, +60 điểm Nội dung)
        matchedPhrases.forEach(phrase => {
          if (s.title && s.title.toLowerCase().includes(phrase)) {
            score += 120;
            matchedTags.push(phrase);
          } else if (studyText.includes(phrase)) {
            score += 60;
            matchedTags.push(phrase);
          }
        });

        // C. Match Chuyên khoa (+35 điểm)
        Object.entries(SPECIALTY_KEYWORD_MAP).forEach(([specKey, syns]) => {
          if (s.specialty === specKey && syns.some(syn => lowerQuery.includes(syn))) {
            score += 35;
          }
        });

        // D. Match Tokens (+20 điểm Tiêu đề/Thuốc, +8 điểm Tóm tắt)
        tokens.forEach(tok => {
          if (s.title && s.title.toLowerCase().includes(tok)) {
            score += 20;
          } else if (studyText.includes(tok)) {
            score += 8;
          }
        });

        // ⭐ SOAP_RELEVANCE_SCORE: Thưởng điểm theo Loại nghiên cứu & Giá trị thực hành
        if (score > 0) {
          // Thưởng theo Design
          if (s.design === 'guideline') score += 60;
          else if (s.design === 'rct') score += 45;
          else if (s.design === 'meta') score += 35;
          else if (s.design === 'review') score += 15;
          else if (s.design === 'cohort') score += 5;

          // Thưởng theo Impact
          if (s.impact === 'practice-changing') score += 30;
          else if (s.impact === 'regulatory' || s.sourceType === 'vn-moh') score += 25;
          else if (s.impact === 'informative') score += 10;
          else if (s.impact === 'negative') score -= 10;

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

    if (results.length === 0) {
      contentEl.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
          <div style="font-size:40px; margin-bottom:10px; color:var(--color-text-muted);">📁</div>
          <h3 style="color:var(--color-text); margin:0 0 6px 0; font-size:16px; font-weight:800;">Không Tìm Thấy Nghiên Cứu Phù Hợp</h3>
          <p style="font-size:13px; color:var(--color-text-muted); margin:0 0 16px 0; max-width:550px; margin-left:auto; margin-right:auto;">
            Không có nghiên cứu nào trong Kho EBM khớp với từ khóa <em>"${escapeHtml(query)}"</em> trong bộ lọc hiện tại. Bạn có thể chọn loại nghiên cứu <strong>Tất cả</strong> hoặc xem toàn bộ danh mục.
          </p>
          <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm" id="btnEbmResetAll">
            <i class="fa-solid fa-list"></i> Xem tất cả nghiên cứu (${this.getStudiesList().length} tài liệu)
          </button>
        </div>
      `;

      document.getElementById('btnEbmResetAll')?.addEventListener('click', () => {
        const searchInput = document.getElementById('ebmBridgeSearchInput') as HTMLInputElement;
        if (searchInput) searchInput.value = '';
        this.currentQuery = '';
        this.currentDesignFilter = 'all';
        this.modalEl.querySelectorAll('.js-design-filter').forEach(b => {
          if (b.getAttribute('data-design') === 'all') b.classList.add('active');
          else b.classList.remove('active');
        });
        this.performSearch('');
      });
      return;
    }

    const headerText = query
      ? `Tìm thấy <strong>${results.length}</strong> kết quả phù hợp cho "<em>${escapeHtml(query)}</em>"`
      : `Đang hiển thị <strong>${results.length}</strong> khuyến cáo &amp; nghiên cứu lâm sàng`;

    contentEl.innerHTML = `
      <div style="margin-bottom:14px; font-size:12.5px; color:var(--color-text); background:rgba(2,132,199,0.08); border-left:4px solid var(--color-primary); padding:8px 14px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <div><i class="fa-solid fa-brain" style="color:var(--color-primary); margin-right:6px;"></i> ${headerText}</div>
        <span style="font-size:11px; color:var(--color-text-muted); font-weight:600;">EBM Registry: 45+ Hướng Dẫn Lâm Sàng Sẵn Sàng</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:14px;">
        ${results.map((r: any) => this.renderStudyCard(r)).join('')}
      </div>
    `;

    // Bind Inserter & Bookmark actions
    this.bindCardActions(results);
  }

  /**
   * Xác định công cụ tính điểm lâm sàng tương ứng với nghiên cứu
   */
  private getMatchingCalculator(s: any): { id: string; label: string } | null {
    const text = `${s.conditionKey || ''} ${s.title || ''} ${s.intervention || ''}`.toLowerCase();
    if (text.includes('viêm phổi') || text.includes('pneumonia') || text.includes('cap')) {
      return { id: 'curb65', label: 'CURB-65' };
    }
    if (text.includes('rung nhĩ') || text.includes('atrial fibrillation') || text.includes('af')) {
      return { id: 'cha2ds2vasc', label: 'CHA₂DS₂-VASc' };
    }
    if (text.includes('sepsis') || text.includes('nhiễm khuẩn huyết') || text.includes('sốc nhiễm')) {
      return { id: 'qsofa', label: 'qSOFA' };
    }
    if (text.includes('thận') || text.includes('ckd') || text.includes('egfr') || text.includes('kdigo')) {
      return { id: 'ckd-epi', label: 'CKD-EPI' };
    }
    if (text.includes('xơ gan') || text.includes('gan') || text.includes('cirrhosis')) {
      return { id: 'child-pugh', label: 'Child-Pugh' };
    }
    if (text.includes('đột quỵ') || text.includes('stroke') || text.includes('thiếu máu não')) {
      return { id: 'nihss', label: 'NIHSS' };
    }
    if (text.includes('thuyên tắc phổi') || text.includes('huyết khối') || text.includes('wells')) {
      return { id: 'wells-pe', label: 'Wells PE' };
    }
    if (text.includes('kháng sinh') || text.includes('vancomycin') || text.includes('mrsa')) {
      return { id: 'antibiotic-dosing', label: 'Chỉnh liều KS' };
    }
    return null;
  }

  private renderStudyCard(s: any): string {
    const isPracticeChanging = s.impact === 'practice-changing';
    const isMOH = s.sourceType === 'vn-moh' || (s.organization && s.organization.includes('Bộ Y tế'));
    const detailConclusion = s.detailedConclusion || s.keyResults || s.summary;

    // Design Badge Text & Color
    let designBadge = '';
    if (s.design === 'guideline') {
      designBadge = `<span style="background:rgba(13,148,136,0.12); color:#0d9488; font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; border:1px solid rgba(13,148,136,0.3);"><i class="fa-solid fa-file-shield"></i> GUIDELINE</span>`;
    } else if (s.design === 'rct') {
      designBadge = `<span style="background:rgba(220,38,38,0.12); color:#dc2626; font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; border:1px solid rgba(220,38,38,0.3);"><i class="fa-solid fa-flask-vial"></i> RCT</span>`;
    } else if (s.design === 'meta') {
      designBadge = `<span style="background:rgba(37,99,235,0.12); color:#2563eb; font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; border:1px solid rgba(37,99,235,0.3);"><i class="fa-solid fa-chart-pie"></i> META-ANALYSIS</span>`;
    } else if (s.design === 'review') {
      designBadge = `<span style="background:rgba(124,58,237,0.12); color:#7c3aed; font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; border:1px solid rgba(124,58,237,0.3);"><i class="fa-solid fa-book-open"></i> REVIEW</span>`;
    }

    // Impact Badge
    let impactBadge = '';
    if (isPracticeChanging) {
      impactBadge = `<span style="background:linear-gradient(135deg, #10b981, #059669); color:#fff; font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; box-shadow:0 2px 4px rgba(16,185,129,0.2);"><i class="fa-solid fa-star"></i> PRACTICE-CHANGING</span>`;
    } else if (isMOH) {
      impactBadge = `<span style="background:rgba(220,38,38,0.12); color:#dc2626; font-size:10.5px; font-weight:800; padding:2px 7px; border-radius:4px; border:1px solid rgba(220,38,38,0.25);"><i class="fa-solid fa-landmark"></i> BỘ Y TẾ VN</span>`;
    }

    // Chuẩn hóa đường dẫn đọc theo SPA Reader Route
    const cleanSlug = s.file ? s.file.replace(/\.html$/i, '') : s.id;
    const readerRoute = `#/ebm/kho-guidelines/${cleanSlug}`;

    // Công cụ tính điểm liên quan nếu có
    const matchingCalc = this.getMatchingCalculator(s);

    return `
      <div class="dsp-card dsp-p-4" style="border:1px solid ${isPracticeChanging ? '#10b981' : 'var(--color-border)'}; background:${isPracticeChanging ? 'rgba(16, 185, 129, 0.025)' : 'var(--color-surface)'}; border-radius:10px; box-shadow:${isPracticeChanging ? '0 3px 10px rgba(16,185,129,0.1)' : '0 2px 5px rgba(0,0,0,0.03)'};">
        
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; gap:12px; flex-wrap:wrap;">
          <div style="flex:1; min-width:280px;">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:5px;">
              ${designBadge}
              ${impactBadge}
              ${s.year ? `<span style="font-size:11px; color:var(--color-text-muted); font-weight:600;"><i class="fa-solid fa-calendar"></i> ${s.year}</span>` : ''}
              ${s.journal ? `<span style="font-size:11px; color:var(--color-text-muted);"><i class="fa-solid fa-newspaper"></i> <strong>${escapeHtml(s.journal)}</strong></span>` : ''}
            </div>
            
            <h4 style="margin:0; font-size:15px; color:${isPracticeChanging ? '#047857' : 'var(--color-primary)'}; font-weight:800; line-height:1.4;">
              ${escapeHtml(s.title)}
            </h4>

            ${s.titleEn ? `
              <div style="font-size:12px; color:var(--color-text-muted); font-style:italic; margin-top:2px;">
                ${escapeHtml(s.titleEn)}
              </div>
            ` : ''}

            <div style="font-size:11.5px; color:var(--color-text-muted); margin-top:4px;">
              <i class="fa-solid fa-building-columns"></i> ${escapeHtml(s.organization || 'Tổ chức Chuyên khoa')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; gap:6px; flex-shrink:0; flex-wrap:wrap; justify-content:flex-end;">
            <a href="${readerRoute}" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size:11px; padding:4px 8px; color:var(--color-primary); text-decoration:none; display:inline-flex; align-items:center; gap:4px; border:1px solid var(--color-border); border-radius:6px;" title="Mở trang Infographic & Guideline đầy đủ trong CliniPortal Reader">
              <i class="fa-solid fa-book-open-reader"></i> Đọc tài liệu
            </a>
            
            ${matchingCalc ? `
              <button type="button" class="dsp-btn dsp-btn-sm js-btn-open-calculator" data-calc-id="${matchingCalc.id}" style="font-size:11px; font-weight:600; padding:4px 8px; background:rgba(217,119,6,0.08); color:#d97706; border:1px solid rgba(217,119,6,0.3); border-radius:6px; display:inline-flex; align-items:center; gap:4px;" title="Mở công cụ tính điểm ${matchingCalc.label}">
                <i class="fa-solid fa-calculator"></i> ${matchingCalc.label}
              </button>
            ` : ''}

            <!-- Button chèn vào ô A (Đánh giá) -->
            <button type="button" class="dsp-btn dsp-btn-sm js-btn-insert-a" data-study-id="${s.id}" style="font-size:11px; font-weight:700; padding:4px 9px; background:rgba(2,132,199,0.08); color:var(--color-primary); border:1px solid var(--color-primary); border-radius:6px; display:inline-flex; align-items:center; gap:4px;" title="Chèn khuyến cáo và phân tầng nguy cơ vào ô Đánh giá (A)">
              <i class="fa-solid fa-stethoscope"></i> + Ô A (Đánh giá)
            </button>

            <!-- Button chèn vào ô P (Kế hoạch) -->
            <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm js-btn-insert-p" data-study-id="${s.id}" style="font-size:11px; font-weight:700; padding:4px 9px; background:${isPracticeChanging ? '#059669' : 'var(--color-primary)'}; border-color:${isPracticeChanging ? '#059669' : 'var(--color-primary)'}; border-radius:6px; display:inline-flex; align-items:center; gap:4px;" title="Chèn phác đồ thuốc, can thiệp và liều lượng vào ô Kế hoạch (P)">
              <i class="fa-solid fa-capsules"></i> + Ô P (Kế hoạch)
            </button>

            <!-- Button lưu phác đồ -->
            <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm js-btn-save-protocol" data-study-id="${s.id}" style="font-size:11px; padding:4px 8px; border-radius:6px;" title="Lưu thành Phác đồ cá nhân trong sổ tay DocSpace">
              <i class="fa-solid fa-bookmark"></i> Lưu phác đồ
            </button>
          </div>
        </div>
        
        <!-- Tags Strip: Matched ICD, Drug, Condition -->
        <div style="font-size:11.5px; margin-bottom:8px; display:flex; gap:6px; flex-wrap:wrap;">
          ${s._matchedCodes ? s._matchedCodes.map((c: string) => `<span style="background:rgba(245,158,11,0.15); color:#d97706; padding:1px 6px; border-radius:4px; font-weight:700;"><i class="fa-solid fa-tag"></i> ${c}</span>`).join('') : ''}
          ${Array.isArray(s.icd10 || s.icd10Codes) ? (s.icd10 || s.icd10Codes).slice(0, 3).map((code: string) => `<span style="background:var(--color-bg); color:var(--color-text-muted); border:1px solid var(--color-border); padding:1px 5px; border-radius:4px; font-size:10.5px;"><i class="fa-solid fa-barcode"></i> ${code}</span>`).join('') : ''}
          ${s.drug ? `<span style="background:rgba(99,102,241,0.12); color:#6366f1; padding:1px 6px; border-radius:4px; font-weight:600;"><i class="fa-solid fa-pills"></i> ${escapeHtml(s.drug)}</span>` : ''}
        </div>

        ${s.intervention ? `
          <div style="font-size:12.5px; color:var(--color-text); margin-bottom:6px; line-height:1.45;">
            <strong>Can thiệp / Phác đồ:</strong> <span style="color:var(--color-text-muted);">${escapeHtml(s.intervention)}</span>
          </div>
        ` : ''}

        ${s.summary ? `
          <div style="font-size:12.5px; color:var(--color-text); margin-bottom:8px; line-height:1.5;">
            <strong>Tóm tắt:</strong> ${escapeHtml(s.summary)}
          </div>
        ` : ''}
        
        <div style="font-size:12.5px; color:var(--color-text); background:${isPracticeChanging ? '#ecfdf5' : 'var(--color-bg)'}; padding:9px 12px; border-radius:6px; border-left:4px solid ${isPracticeChanging ? '#10b981' : 'var(--color-primary)'}; line-height:1.5;">
          <strong style="color:${isPracticeChanging ? '#065f46' : 'var(--color-text)'};">Khuyến cáo EBM chính:</strong> ${escapeHtml(detailConclusion)}
        </div>
      </div>
    `;
  }

  private bindCardActions(studies: any[]) {
    // Helper chèn nội dung vào textarea và kích hoạt auto-save
    const insertIntoTextarea = (targetEl: HTMLTextAreaElement | null, text: string, successMsg: string) => {
      if (targetEl) {
        const currentVal = targetEl.value.trim();
        const prefix = currentVal ? '\n\n' : '';
        targetEl.value = currentVal + prefix + text;
        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
        targetEl.dispatchEvent(new Event('change', { bubbles: true }));
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

    // 2. Mở máy tính điểm lâm sàng
    document.querySelectorAll('.js-btn-open-calculator').forEach(btn => {
      btn.addEventListener('click', () => {
        const calcId = btn.getAttribute('data-calc-id');
        if (calcId) {
          this.close();
          calculatorPicker.open(this.currentOptions?.targetFieldId || 'esAAssessment', null, calcId);
        }
      });
    });

    // 3. Save Protocol
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

  /**
   * Render thanh gợi ý EBM trực tiếp dưới ô Chẩn đoán / Đánh giá trong SOAP
   */
  public async renderContextualBar(containerEl: HTMLElement, query: string, icd10Codes: string[] = [], onInsert?: (text: string, field: 'assessment' | 'plan') => void): Promise<void> {
    if (!containerEl) return;
    const suggestions = await this.getSmartSuggestions(query, icd10Codes);
    if (!suggestions || suggestions.length === 0) {
      containerEl.innerHTML = '';
      containerEl.style.display = 'none';
      return;
    }

    containerEl.style.display = 'block';
    containerEl.innerHTML = `
      <div style="background:rgba(2,132,199,0.05); border:1px dashed rgba(2,132,199,0.25); border-radius:8px; padding:7px 10px; margin-top:8px; display:flex; flex-direction:column; gap:6px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:11px; font-weight:700; color:var(--color-primary); display:flex; align-items:center; gap:5px;">
            <i class="fa-solid fa-lightbulb"></i> Khuyến cáo EBM liên quan ngữ cảnh (${suggestions.length}):
          </span>
          <button type="button" class="dsp-btn dsp-btn-ghost dsp-btn-sm js-btn-open-full-ebm" style="font-size:10.5px; padding:1px 6px; color:var(--color-primary); height:auto; min-height:0;">
            <i class="fa-solid fa-magnifying-glass"></i> Mở rộng EBM Bridge
          </button>
        </div>
        <div style="display:flex; gap:6px; overflow-x:auto; padding-bottom:2px; scrollbar-width:thin;">
          ${suggestions.map(s => {
            const cleanSlug = s.file ? s.file.replace(/\.html$/i, '') : s.id;
            return `
              <div class="dsp-card" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:6px; padding:6px 8px; min-width:260px; max-width:320px; flex-shrink:0; font-size:11.5px; display:flex; flex-direction:column; justify-content:space-between; gap:4px;">
                <div style="display:flex; align-items:center; justify-content:space-between; gap:4px;">
                  <strong style="color:var(--color-primary); font-size:11.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(s.title)}">
                    ${escapeHtml(s.title)}
                  </strong>
                  ${s.impact === 'practice-changing' ? `<span style="background:#10b981; color:#fff; font-size:9px; font-weight:800; padding:1px 4px; border-radius:3px; flex-shrink:0;">EBM ★</span>` : ''}
                </div>
                <div style="font-size:11px; color:var(--color-text-muted); line-height:1.35; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                  ${escapeHtml(s.detailedConclusion || s.summary || s.intervention)}
                </div>
                <div style="display:flex; gap:4px; align-items:center; justify-content:flex-end; margin-top:2px;">
                  <a href="#/ebm/kho-guidelines/${cleanSlug}" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size:10px; padding:2px 5px; color:var(--color-text-muted); height:auto; min-height:0;" title="Đọc toàn văn tài liệu">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Đọc
                  </a>
                  <button type="button" class="dsp-btn dsp-btn-outline dsp-btn-sm js-ctx-insert-a" data-study-id="${s.id}" style="font-size:10px; padding:2px 6px; height:auto; min-height:0; color:var(--color-primary); border-color:var(--color-primary);" title="Chèn vào ô Đánh giá (A)">
                    + Ô A
                  </button>
                  <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm js-ctx-insert-p" data-study-id="${s.id}" style="font-size:10px; padding:2px 6px; height:auto; min-height:0;" title="Chèn phác đồ vào ô Kế hoạch (P)">
                    + Ô P
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Bind events
    containerEl.querySelector('.js-btn-open-full-ebm')?.addEventListener('click', () => {
      this.openSearch(query, { targetFieldId: 'esAAssessment' });
    });

    containerEl.querySelectorAll('.js-ctx-insert-a').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-study-id');
        const study = suggestions.find(s => s.id === id);
        if (!study) return;
        const conclusion = study.detailedConclusion || study.keyResults || study.summary;
        const textToInsert = `[EBM Đánh giá — ${study.title}]:\n• Khuyến cáo: ${conclusion}`;
        if (onInsert) {
          onInsert(textToInsert, 'assessment');
        } else {
          const target = document.getElementById('esAAssessment') as HTMLTextAreaElement;
          if (target) {
            target.value = target.value.trim() ? `${target.value.trim()}\n\n${textToInsert}` : textToInsert;
            target.dispatchEvent(new Event('input', { bubbles: true }));
            target.dispatchEvent(new Event('change', { bubbles: true }));
            target.focus();
          }
        }
      });
    });

    containerEl.querySelectorAll('.js-ctx-insert-p').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-study-id');
        const study = suggestions.find(s => s.id === id);
        if (!study) return;
        const drugLine = study.drug ? `\n• Thuốc: ${study.drug}` : '';
        const interventionLine = study.intervention ? `\n• Can thiệp: ${study.intervention}` : '';
        const conclusion = study.detailedConclusion || study.keyResults || study.summary;
        const textToInsert = `[EBM Phác đồ — ${study.title}]:${drugLine}${interventionLine}\n• Hướng dẫn: ${conclusion}`;
        if (onInsert) {
          onInsert(textToInsert, 'plan');
        } else {
          const target = document.getElementById('esPPlan') as HTMLTextAreaElement;
          if (target) {
            target.value = target.value.trim() ? `${target.value.trim()}\n\n${textToInsert}` : textToInsert;
            target.dispatchEvent(new Event('input', { bubbles: true }));
            target.dispatchEvent(new Event('change', { bubbles: true }));
            target.focus();
          }
        }
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
