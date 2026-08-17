/**
 * Bedside EBM Copilot & Ultra-Concise Evidence Snippet Engine (ebm-bedside-copilot.ts)
 * Path: src/content/ebm/js/ebm-bedside-copilot.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface BedsideStudyItem {
  category: string;
  name: string;
  val: number;
  low: number;
  high: number;
  weight: number;
  pmid?: string;
  metric?: string;
}

export interface BedsideEvidenceItem {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  topic: string;
  verdict: 'yes' | 'no' | 'unclear';
  verdictText: string;
  pico: {
    p: string;
    i: string;
    c: string;
    o: string;
  };
  formats: {
    compact: string;
    order: string;
    dx: string;
  };
  studies: BedsideStudyItem[];
  metric: string;
  pooled: {
    val: number;
    low: number;
    high: number;
    i2: string;
  };
}

export const BEDSIDE_EVIDENCE_VAULT: BedsideEvidenceItem[] = [
  {
    id: 'ards-steroid',
    category: 'icu',
    categoryLabel: 'Hồi sức & Cấp cứu',
    title: 'Dexamethasone trong ARDS do COVID-19 / Thở oxy',
    topic: 'Hô hấp & Cấp cứu',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Bệnh nhân ARDS / COVID-19 cần thở oxy hoặc thở máy',
      i: 'Dexamethasone 6mg/ngày x 10 ngày',
      c: 'Điều trị chuẩn (Standard of Care)',
      o: 'Tử vong 28 ngày'
    },
    formats: {
      compact: '[EBM] Dexamethasone 6mg/d x10d (RECOVERY 2021: RR 0.82 [0.72-0.94] | PMID: 32678530)',
      order: '✓ Dexamethasone 6mg tiêm TM 1 lần/ngày x 10 ngày (Mức IA - RECOVERY 2021 | PMID: 32678530)',
      dx: '[EBM-Dx] Berlin ARDS Definition: PaO2/FiO2 ≤ 300 với PEEP ≥ 5 (Mortality RR 0.82 | PMID: 32678530)'
    },
    studies: [
      { category: "primary", name: "RECOVERY Trial (2021)", val: 0.82, low: 0.72, high: 0.94, weight: 45.0, pmid: "32678530" },
      { category: "primary", name: "CoDEX Trial (2020)", val: 0.76, low: 0.58, high: 0.99, weight: 25.0, pmid: "32876973" },
      { category: "primary", name: "CAPE COVID (2020)", val: 0.71, low: 0.49, high: 1.03, weight: 30.0, pmid: "32876974" }
    ],
    metric: "RR",
    pooled: { val: 0.78, low: 0.70, high: 0.87, i2: "0%" }
  },
  {
    id: 'hfpef-sglt2i',
    category: 'cardio',
    categoryLabel: 'Tim mạch',
    title: 'Empagliflozin trong Suy tim phân suất tống máu bảo tồn (HFpEF)',
    topic: 'Tim mạch can thiệp',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Bệnh nhân Suy tim có EF > 40% (HFmrEF / HFpEF)',
      i: 'Empagliflozin 10mg/ngày',
      c: 'Placebo + Điều trị nền',
      o: 'Tử vong Tim mạch hoặc Nhập viện vì Suy tim'
    },
    formats: {
      compact: '[EBM] Empagliflozin 10mg/d (EMPEROR-Preserved 2021: HR 0.79 [0.69-0.90], p<0.001 | PMID: 34449189)',
      order: '✓ Empagliflozin (Jardiance) 10mg uống 1 viên/ngày (Mức IA - EMPEROR-Preserved | PMID: 34449189)',
      dx: '[EBM-Dx] HFpEF HFA-PEFF score ≥ 5 (ESC 2023: Khuyến cáo nhóm I SGLT2i | PMID: 34449189)'
    },
    studies: [
      { category: "primary", name: "EMPEROR-Preserved (2021)", val: 0.79, low: 0.69, high: 0.90, weight: 52.0, pmid: "34449189" },
      { category: "primary", name: "DELIVER Trial (2022)", val: 0.82, low: 0.73, high: 0.92, weight: 48.0, pmid: "36027312" }
    ],
    metric: "HR",
    pooled: { val: 0.80, low: 0.73, high: 0.88, i2: "0%" }
  },
  {
    id: 'sepsis-steroid',
    category: 'icu',
    categoryLabel: 'Hồi sức & Cấp cứu',
    title: 'Hydrocortisone liều thấp trong Sốc nhiễm trùng kháng vận mạch',
    topic: 'Hồi sức sốc',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Sốc nhiễm trùng phụ thuộc Norepinephrine ≥ 0.25 mcg/kg/phút',
      i: 'Hydrocortisone 200mg/ngày truyền liên tục hoặc chia 4 lần',
      c: 'Placebo',
      o: 'Thời gian thoát sốc & Rút ngắn thở máy'
    },
    formats: {
      compact: '[EBM] Hydrocortisone 200mg/d (ADRENAL 2018: Rút ngắn sốc HR 1.32 [1.19-1.46] | PMID: 29347367)',
      order: '✓ Hydrocortisone 50mg tiêm TM mỗi 6 giờ khi Noradrenalin > 0.25 mcg/kg/ph (Surviving Sepsis 2021)',
      dx: '[EBM-Dx] Septic Shock Sepsis-3: MAP < 65 & Lactate > 2 mmol/L sau bù dịch (SSCG 2021)'
    },
    studies: [
      { category: "primary", name: "ADRENAL Trial (2018)", val: 0.95, low: 0.82, high: 1.10, weight: 60.0, pmid: "29347367" },
      { category: "primary", name: "APROCCHSS Trial (2018)", val: 0.88, low: 0.79, high: 0.99, weight: 40.0, pmid: "29490185" }
    ],
    metric: "RR",
    pooled: { val: 0.91, low: 0.83, high: 1.01, i2: "35%" }
  },
  {
    id: 'ckd-sglt2i',
    category: 'cardio',
    categoryLabel: 'Thận & Tim mạch',
    title: 'Dapagliflozin trong Bệnh thận mạn (CKD) có/không kèm Đái tháo đường',
    topic: 'Thận học & Nội tiết',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'CKD có eGFR 25-75 mL/min/1.73m2 và UACR 200-5000 mg/g',
      i: 'Dapagliflozin 10mg/ngày',
      c: 'Placebo',
      o: 'Giảm ≥ 50% eGFR, ESKD hoặc Tử vong thận/tim mạch'
    },
    formats: {
      compact: '[EBM] Dapagliflozin 10mg/d (DAPA-CKD 2020: HR 0.61 [0.51-0.72], NNT=19 | PMID: 32970396)',
      order: '✓ Dapagliflozin (Forxiga) 10mg uống 1 viên/ngày buổi sáng (Mức IA - KDIGO 2024)',
      dx: '[EBM-Dx] CKD Stage 2-4 với Albumin niệu A2/A3 (KDIGO 2024: Khuyến cáo độ 1A)'
    },
    studies: [
      { category: "primary", name: "DAPA-CKD (2020)", val: 0.61, low: 0.51, high: 0.72, weight: 50.0, pmid: "32970396" },
      { category: "primary", name: "EMPA-KIDNEY (2023)", val: 0.72, low: 0.64, high: 0.82, weight: 50.0, pmid: "36331198" }
    ],
    metric: "HR",
    pooled: { val: 0.67, low: 0.60, high: 0.75, i2: "0%" }
  },
  {
    id: 'af-noac',
    category: 'cardio',
    categoryLabel: 'Tim mạch',
    title: 'Kháng đông thế hệ mới (DOAC) so với Warfarin trong Rung nhĩ không do van tim',
    topic: 'Tim mạch can thiệp',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Bệnh nhân Rung nhĩ không do van tim có CHA2DS2-VASc ≥ 2 (nam) hoặc ≥ 3 (nữ)',
      i: 'DOACs (Apixaban, Rivaroxaban, Dabigatran, Edoxaban)',
      c: 'Warfarin (đích INR 2.0-3.0)',
      o: 'Đột quỵ, Thuyên tắc mạch hệ thống & Xuất huyết nội sọ'
    },
    formats: {
      compact: '[EBM] DOAC vs Warfarin (Ruff Meta-Analysis 2014: Stroke/SE RR 0.81 [0.73-0.91] | PMID: 24315148)',
      order: '✓ Kháng đông DOAC (Apixaban 5mg x2 hoặc Rivaroxaban 20mg x1) ưu tiên hơn Kháng Vitamin K (ESC 2024)',
      dx: '[EBM-Dx] CHA2DS2-VASc Score ≥ 2 điểm: Chỉ định bắt buộc kháng đông phòng ngừa đột quỵ (Class I)'
    },
    studies: [
      { category: "primary", name: "ARISTOTLE (Apixaban)", val: 0.79, low: 0.66, high: 0.95, weight: 28.0, pmid: "21870978" },
      { category: "primary", name: "RE-LY (Dabigatran 150)", val: 0.66, low: 0.53, high: 0.82, weight: 25.0, pmid: "19717844" },
      { category: "primary", name: "ROCKET AF (Rivaroxaban)", val: 0.88, low: 0.74, high: 1.03, weight: 27.0, pmid: "21830957" },
      { category: "primary", name: "ENGAGE AF (Edoxaban 60)", val: 0.87, low: 0.73, high: 1.04, weight: 20.0, pmid: "24251359" }
    ],
    metric: "RR",
    pooled: { val: 0.81, low: 0.73, high: 0.91, i2: "47%" }
  },
  {
    id: 'ugib-ppi',
    category: 'gi',
    categoryLabel: 'Tiêu hóa - Gan mật',
    title: 'PPI liều cao sau nội soi cầm máu Loét dạ dày tá tràng Forrest I/IIa',
    topic: 'Tiêu hóa & Cấp cứu',
    verdict: 'yes',
    verdictText: 'Có hiệu lực (Yes)',
    pico: {
      p: 'Bệnh nhân Xuất huyết tiêu hóa trên do Loét DD-TT có nguy cơ cao (Forrest I, IIa)',
      i: 'Esomeprazole/Omeprazole 80mg bolus sau đó 8mg/giờ x 72 giờ',
      c: 'Điều trị chuẩn / Giả dược',
      o: 'Tái xuất huyết trong 3 ngày & Nhu cầu phẫu thuật'
    },
    formats: {
      compact: '[EBM] PPI 80mg bolus + 8mg/h x72h (Laine Meta 2008: Tái XH RR 0.40 [0.28-0.59] | PMID: 18456727)',
      order: '✓ Esomeprazole 80mg tiêm TM chậm, sau đó truyền liên tục 8mg/giờ trong 72 giờ (ACG / ESGE Guidelines)',
      dx: '[EBM-Dx] Phân loại Forrest: Ia (Phun máu), Ib (Rỉ máu), IIa (Mạch máu lộ) - Chỉ định PPI liều cao'
    },
    studies: [
      { category: "primary", name: "Sung et al. (NEJM 2009)", val: 0.38, low: 0.22, high: 0.65, weight: 45.0, pmid: "19369666" },
      { category: "primary", name: "Lau et al. (NEJM 2000)", val: 0.42, low: 0.24, high: 0.72, weight: 35.0, pmid: "10928889" },
      { category: "primary", name: "Barkun et al. (Annals 2004)", val: 0.45, low: 0.28, high: 0.76, weight: 20.0, pmid: "15545678" }
    ],
    metric: "RR",
    pooled: { val: 0.40, low: 0.28, high: 0.59, i2: "0%" }
  }
];

export class EbmBedsideCopilot {
  private static currentFormat: 'compact' | 'order' | 'dx' = 'compact';
  private static currentCategory = 'all';
  private static currentSearchQuery = '';

  private static containerEl: HTMLElement | null = null;
  private static searchInputEl: HTMLInputElement | null = null;
  private static categoryContainerEl: HTMLElement | null = null;
  private static formatSelectEl: HTMLSelectElement | null = null;
  private static gridEl: HTMLElement | null = null;
  private static toastEl: HTMLElement | null = null;

  public static init(): void {
    this.containerEl = document.getElementById('bedside-copilot-container');
    if (!this.containerEl) return;

    this.renderCopilotLayout();
    this.bindEvents();
    this.renderCards();
    this.restoreCollapsedState();
  }

  public static renderCopilotLayout(): void {
    if (!this.containerEl) return;

    this.containerEl.innerHTML = `
      <section class="copilot-section" id="copilot-main-section">
        <div class="copilot-header">
          <div class="copilot-title-box">
            <div class="copilot-icon-badge">
              <i class="fa-solid fa-notes-medical"></i>
            </div>
            <div>
              <h2 class="copilot-title">Bedside EBM Copilot — Trích Xuất Bằng Chứng Bệnh Án</h2>
              <p class="copilot-subtitle">Trích xuất nhanh Micro-evidence Snippet chuẩn 1 dòng vào phần Kế hoạch (Plan/Assessment) của bệnh án &amp; Hội chẩn.</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <div class="copilot-format-selector">
              <i class="fa-solid fa-sliders" style="color: var(--copilot-primary, #0284c7);"></i>
              <span>Định dạng:</span>
              <select class="copilot-format-select" id="copilot-format-select">
                <option value="compact">Ultra-Compact (1 Dòng)</option>
                <option value="order">Y Lệnh Lâm Sàng (VN)</option>
                <option value="dx">Chẩn Đoán (EBM-Dx)</option>
              </select>
            </div>
            <button type="button" class="copilot-toggle-btn" id="btn-toggle-bedside-copilot" title="Thu gọn / Mở rộng bảng Bedside Copilot">
              <span id="copilot-toggle-label">Thu gọn</span>
              <span id="copilot-toggle-icon">▲</span>
            </button>
          </div>
        </div>

        <div id="copilot-collapsible-body">
          <div class="copilot-toolbar">
            <div class="copilot-search-box">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" class="copilot-search-input" id="copilot-search-input" placeholder="Tìm theo thuốc, bệnh lý, tên thử nghiệm lâm sàng (VD: Dexamethasone, ARDS, SGLT2i, RECOVERY...)...">
            </div>

            <div class="copilot-category-pills" id="copilot-category-pills">
              <button class="copilot-pill active" data-cat="all">Tất cả</button>
              <button class="copilot-pill" data-cat="icu">Hồi sức &amp; Cấp cứu</button>
              <button class="copilot-pill" data-cat="cardio">Tim mạch</button>
              <button class="copilot-pill" data-cat="gi">Tiêu hóa - Gan mật</button>
            </div>
          </div>

          <div class="copilot-grid" id="copilot-grid">
            <!-- Cards rendered dynamically -->
          </div>
        </div>
      </section>

      <!-- Toast Element -->
      <div class="copilot-toast" id="copilot-toast">
        <i class="fa-solid fa-circle-check"></i>
        <span id="copilot-toast-text">Đã sao chép EBM Snippet vào bộ nhớ tạm!</span>
      </div>
    `;

    this.searchInputEl = document.getElementById('copilot-search-input') as HTMLInputElement | null;
    this.categoryContainerEl = document.getElementById('copilot-category-pills');
    this.formatSelectEl = document.getElementById('copilot-format-select') as HTMLSelectElement | null;
    this.gridEl = document.getElementById('copilot-grid');
    this.toastEl = document.getElementById('copilot-toast');
  }

  public static restoreCollapsedState(): void {
    if (typeof localStorage === 'undefined') return;
    const isCollapsed = localStorage.getItem('clini_bedside_copilot_collapsed') === 'true';
    if (isCollapsed) {
      const section = document.getElementById('copilot-main-section');
      const label = document.getElementById('copilot-toggle-label');
      const icon = document.getElementById('copilot-toggle-icon');
      if (section) section.classList.add('collapsed');
      if (label) label.textContent = 'Mở rộng';
      if (icon) icon.textContent = '▼';
    }
  }

  public static bindEvents(): void {
    const toggleBtn = document.getElementById('btn-toggle-bedside-copilot');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const section = document.getElementById('copilot-main-section');
        const label = document.getElementById('copilot-toggle-label');
        const icon = document.getElementById('copilot-toggle-icon');
        if (!section) return;

        const willCollapse = !section.classList.contains('collapsed');
        if (willCollapse) {
          section.classList.add('collapsed');
          if (label) label.textContent = 'Mở rộng';
          if (icon) icon.textContent = '▼';
          if (typeof localStorage !== 'undefined') localStorage.setItem('clini_bedside_copilot_collapsed', 'true');
        } else {
          section.classList.remove('collapsed');
          if (label) label.textContent = 'Thu gọn';
          if (icon) icon.textContent = '▲';
          if (typeof localStorage !== 'undefined') localStorage.setItem('clini_bedside_copilot_collapsed', 'false');
        }
      });
    }

    if (this.formatSelectEl) {
      this.formatSelectEl.addEventListener('change', (e) => {
        this.currentFormat = (e.target as HTMLSelectElement).value as any;
        this.renderCards();
      });
    }

    if (this.searchInputEl) {
      this.searchInputEl.addEventListener('input', (e) => {
        this.currentSearchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
        this.renderCards();
      });
    }

    if (this.categoryContainerEl) {
      this.categoryContainerEl.addEventListener('click', (e) => {
        const pill = (e.target as HTMLElement).closest('.copilot-pill') as HTMLElement | null;
        if (!pill || !this.categoryContainerEl) return;

        this.categoryContainerEl.querySelectorAll('.copilot-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.dataset.cat || 'all';
        this.renderCards();
      });
    }

    if (this.gridEl) {
      this.gridEl.addEventListener('click', (e) => {
        const copyBtn = (e.target as HTMLElement).closest('.btn-copy-snippet') as HTMLElement | null;
        if (copyBtn) {
          const snippetText = copyBtn.dataset.snippet || '';
          this.copyToClipboard(snippetText, 'Đã copy Snippet 1 dòng vào Bệnh án!');
          return;
        }

        const forestBtn = (e.target as HTMLElement).closest('.btn-view-forest') as HTMLElement | null;
        if (forestBtn) {
          e.preventDefault();
          const trialId = forestBtn.dataset.trialId;
          const trial = BEDSIDE_EVIDENCE_VAULT.find(t => t.id === trialId);
          if (trial) {
            this.launchForestPlot(trial);
          }
        }
      });
    }
  }

  public static renderCards(): void {
    if (!this.gridEl) return;

    const filtered = BEDSIDE_EVIDENCE_VAULT.filter(item => {
      const matchCat = this.currentCategory === 'all' || item.category === this.currentCategory;
      const q = this.currentSearchQuery;
      const matchSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.topic.toLowerCase().includes(q) ||
        item.pico.i.toLowerCase().includes(q) ||
        (item.formats[this.currentFormat] && item.formats[this.currentFormat].toLowerCase().includes(q));

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      this.gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--copilot-text-muted, #64748b);">
          <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
          <p>Không tìm thấy bằng chứng phù hợp với từ khóa "<strong>${this.escapeHTML(this.currentSearchQuery)}</strong>".</p>
        </div>
      `;
      return;
    }

    this.gridEl.innerHTML = filtered.map(item => {
      const snippetText = item.formats[this.currentFormat] || item.formats.compact;
      const boxStyleClass = this.currentFormat === 'order' ? 'order-style' : (this.currentFormat === 'dx' ? 'dx-style' : '');

      return `
        <div class="copilot-card">
          <div>
            <div class="copilot-card-top">
              <div>
                <div class="copilot-card-topic"><i class="fa-solid fa-tag"></i> ${this.escapeHTML(item.topic)}</div>
                <h3 class="copilot-card-title">${this.escapeHTML(item.title)}</h3>
              </div>
              <span class="verdict-badge ${item.verdict}">
                <i class="fa-solid ${item.verdict === 'yes' ? 'fa-circle-check' : (item.verdict === 'no' ? 'fa-circle-xmark' : 'fa-circle-question')}"></i>
                ${this.escapeHTML(item.verdictText)}
              </span>
            </div>

            <div style="margin: 0.65rem 0 0.4rem 0;">
              <div class="snippet-box ${boxStyleClass}" title="Nhấp đúp để chọn hoặc bấm nút Copy">${this.escapeHTML(snippetText)}</div>
            </div>
          </div>

          <div class="copilot-card-actions">
            <button class="btn-copy-snippet" data-snippet="${this.escapeHTML(snippetText)}">
              <i class="fa-solid fa-copy"></i> Copy Snippet
            </button>
            <a href="#" class="btn-view-forest" data-trial-id="${item.id}">
              <i class="fa-solid fa-chart-column"></i> Forest Plot (${item.studies.length} RCTs)
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  public static launchForestPlot(trial: BedsideEvidenceItem): void {
    const payload = {
      title: trial.title,
      intervention: trial.pico.i,
      comparator: trial.pico.c,
      metric: trial.metric || "RR",
      outcomes: trial.studies.map(s => ({
        category: s.category || "primary",
        name: s.name,
        val: s.val,
        low: s.low,
        high: s.high,
        weight: s.weight,
        metric: trial.metric || "RR"
      }))
    };

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem("forestPlotData", JSON.stringify(payload));
    }
    
    if (typeof window !== 'undefined') {
      const isEbmLab = window.location.pathname.includes('/ebm-lab/');
      const forestUrl = isEbmLab ? 'forest-plot.html' : 'ebm-lab/forest-plot.html';
      window.location.href = forestUrl;
    }
  }

  public static copyToClipboard(text: string, message?: string): void {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(message || 'Đã sao chép vào bộ nhớ tạm!');
      }).catch(() => {
        this.fallbackCopy(text, message);
      });
    } else {
      this.fallbackCopy(text, message);
    }
  }

  private static fallbackCopy(text: string, message?: string): void {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast(message || 'Đã sao chép vào bộ nhớ tạm!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  public static showToast(message: string): void {
    if (!this.toastEl) return;
    const textEl = document.getElementById('copilot-toast-text');
    if (textEl) textEl.textContent = message;
    this.toastEl.classList.add('show');
    setTimeout(() => {
      this.toastEl?.classList.remove('show');
    }, 2400);
  }

  public static escapeHTML(str: string): string {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  public static generateSnippet(data: { intervention?: string; trialName?: string; year?: string; metric?: string; val?: string; ci?: string; pmid?: string }, format: 'compact' | 'order' | 'dx' = 'compact'): string {
    const drug = data.intervention || 'Can thiệp';
    const trial = data.trialName || 'RCT Trial';
    const year = data.year || '2026';
    const metric = data.metric || 'RR';
    const val = data.val || '0.80';
    const ci = data.ci || '0.70-0.90';
    const pmid = data.pmid ? ` | PMID: ${data.pmid}` : '';

    if (format === 'order') {
      return `✓ ${drug} (Mức IA - ${trial} ${year}${pmid})`;
    } else if (format === 'dx') {
      return `[EBM-Dx] ${drug} (${trial} ${year}: ${metric} ${val} [${ci}]${pmid})`;
    }
    return `[EBM] ${drug} (${trial} ${year}: ${metric} ${val} [${ci}]${pmid})`;
  }
}

// Global window exposure for legacy scripts and HTML
if (typeof window !== 'undefined') {
  (window as any).EbmBedsideCopilot = EbmBedsideCopilot;
  (window as any).CliniBedsideCopilot = {
    getEvidenceVault: () => BEDSIDE_EVIDENCE_VAULT,
    copySnippet: (text: string, msg?: string) => EbmBedsideCopilot.copyToClipboard(text, msg),
    launchForestPlot: (trial: BedsideEvidenceItem) => EbmBedsideCopilot.launchForestPlot(trial),
    generateSnippet: (data: any, format: any) => EbmBedsideCopilot.generateSnippet(data, format)
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => EbmBedsideCopilot.init());
  } else {
    EbmBedsideCopilot.init();
  }
}
