/* ============================================================
   BEDSIDE EBM COPILOT & ULTRA-CONCISE EVIDENCE SNIPPET ENGINE
   Path: src/content/ebm/js/ebm-bedside-copilot.js
   CliniPortal - Hệ sinh thái Web Y khoa
============================================================ */

(function () {
  'use strict';

  // Core Bedside Evidence Trials & Multi-Study Meta-Analyses
  const BEDSIDE_EVIDENCE_VAULT = [
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
      id: 'afib-doac',
      category: 'cardio',
      categoryLabel: 'Tim mạch',
      title: 'Kháng đông DOACs vs Warfarin trong Rung nhĩ không do bệnh van tim',
      topic: 'Tim mạch & Đột quỵ',
      verdict: 'yes',
      verdictText: 'Có hiệu lực (Yes)',
      pico: {
        p: 'Rung nhĩ không do bệnh van tim có CHA2DS2-VASc ≥ 2 (nam) hoặc ≥ 3 (nữ)',
        i: 'Thuốc kháng đông đường uống thế hệ mới (DOACs: Apixaban, Rivaroxaban, Dabigatran)',
        c: 'Warfarin (Target INR 2.0-3.0)',
        o: 'Đột quỵ / Tắc mạch hệ thống & Xuất huyết nội sọ'
      },
      formats: {
        compact: '[EBM] DOACs vs Warfarin (Meta-analysis Lancet: RR 0.81 [0.73-0.91], Giảm XH não 52% | PMID: 24315148)',
        order: '✓ DOACs (Apixaban 5mg x2/d hoặc Rivaroxaban 20mg/d) ưu tiên hơn Warfarin (Mức IA - ESC/AHA | PMID: 24315148)',
        dx: '[EBM-Dx] CHA2DS2-VASc ≥ 2đ ở nam / ≥ 3đ ở nữ: Chỉ định kháng đông DOAC (Mức IA | PMID: 24315148)'
      },
      studies: [
        { category: "primary", name: "ARISTOTLE (Apixaban)", val: 0.79, low: 0.66, high: 0.95, weight: 30.0, pmid: "21870978" },
        { category: "primary", name: "RE-LY (Dabigatran 150mg)", val: 0.66, low: 0.53, high: 0.82, weight: 28.0, pmid: "19717844" },
        { category: "primary", name: "ROCKET-AF (Rivaroxaban)", val: 0.79, low: 0.66, high: 0.96, weight: 24.0, pmid: "21830957" },
        { category: "primary", name: "ENGAGE AF (Edoxaban 60mg)", val: 0.79, low: 0.63, high: 0.99, weight: 18.0, pmid: "24251361" }
      ],
      metric: "RR",
      pooled: { val: 0.75, low: 0.68, high: 0.83, i2: "8%" }
    },
    {
      id: 'sepsis-crrt-early',
      category: 'icu',
      categoryLabel: 'Hồi sức & Cấp cứu',
      title: 'Lọc máu liên tục (CRRT) Sớm vs Muộn trong Sốc Nhiễm Khuẩn có AKI',
      topic: 'Hồi sức cấp cứu',
      verdict: 'no',
      verdictText: 'Không hiệu lực (No)',
      pico: {
        p: 'Bệnh nhân Sốc nhiễm khuẩn có tổn thương thận cấp (AKI KDIGO 2-3)',
        i: 'Khởi động CRRT sớm (ngay khi chẩn đoán)',
        c: 'Khởi động CRRT trì hoãn (chỉ khi có biến chứng toan/tăng K/quá tải dịch)',
        o: 'Tử vong 60-90 ngày'
      },
      formats: {
        compact: '[EBM] Early vs Delayed RRT in AKI (STARRT-AKI 2020: RR 1.00 [0.93-1.09], Không giảm tử vong | PMID: 32668114)',
        order: '✓ Trì hoãn CRRT, chỉ định khi có chỉ định khẩn cấp (Toan pH<7.15, K>6.5, Phù phổi) (STARRT-AKI | PMID: 32668114)',
        dx: '[EBM-Dx] KDIGO Stage 2-3 AKI trong Sepsis: Chiến lược CRRT trì hoãn an toàn tương đương (PMID: 32668114)'
      },
      studies: [
        { category: "primary", name: "STARRT-AKI (NEJM 2020)", val: 1.00, low: 0.93, high: 1.09, weight: 48.0, pmid: "32668114" },
        { category: "primary", name: "AKIKI Trial (NEJM 2016)", val: 1.03, low: 0.82, high: 1.29, weight: 26.0, pmid: "27179809" },
        { category: "primary", name: "IDEAL-ICU (NEJM 2018)", val: 1.07, low: 0.84, high: 1.36, weight: 26.0, pmid: "30346274" }
      ],
      metric: "RR",
      pooled: { val: 1.02, low: 0.95, high: 1.09, i2: "0%" }
    },
    {
      id: 'cirrhosis-sbp-albumin',
      category: 'gi',
      categoryLabel: 'Tiêu hóa - Gan mật',
      title: 'Truyền Albumin trong Viêm phúc mạc nhiễm khuẩn nguyên phát (SBP)',
      topic: 'Tiêu hóa & Gan mật',
      verdict: 'yes',
      verdictText: 'Có hiệu lực (Yes)',
      pico: {
        p: 'Bệnh nhân Xơ gan có Viêm phúc mạc nhiễm khuẩn nguyên phát (SBP)',
        i: 'Kháng sinh + Albumin (1.5g/kg ngày 1, 1.0g/kg ngày 3)',
        c: 'Kháng sinh đơn thuần',
        o: 'Hội chứng gan thận (HRS) & Tử vong tại viện'
      },
      formats: {
        compact: '[EBM] Albumin in SBP (Sort et al. NEJM 1999: Giảm HRS từ 33% xuống 10%, OR 0.23 [0.08-0.65] | PMID: 10432325)',
        order: '✓ Albumin 20%: 1.5g/kg D1 và 1g/kg D3 phối hợp Ceftriaxone 2g/d (Mức IA - AASLD/EASL | PMID: 10432325)',
        dx: '[EBM-Dx] Dịch màng bụng PMN ≥ 250/mm³: Chẩn đoán SBP, chỉ định KS + Albumin (Mức IA | PMID: 10432325)'
      },
      studies: [
        { category: "primary", name: "Sort et al. (NEJM 1999)", val: 0.38, low: 0.17, high: 0.85, weight: 50.0, pmid: "10432325" },
        { category: "primary", name: "Salerno et al. Meta-analysis", val: 0.34, low: 0.19, high: 0.60, weight: 50.0, pmid: "23588998" }
      ],
      metric: "RR",
      pooled: { val: 0.35, low: 0.22, high: 0.57, i2: "0%" }
    },
    {
      id: 'sepsis-statin',
      category: 'icu',
      categoryLabel: 'Hồi sức & Cấp cứu',
      title: 'Khởi đầu Statin mới trong Sốc Nhiễm Khuẩn (Sepsis)',
      topic: 'Hồi sức cấp cứu',
      verdict: 'no',
      verdictText: 'Không hiệu lực (No)',
      pico: {
        p: 'Bệnh nhân Sepsis / Sốc nhiễm khuẩn chưa dùng Statin trước đó',
        i: 'Khởi đầu Rosuvastatin / Atorvastatin',
        c: 'Placebo',
        o: 'Tử vong 28 ngày & Suy đa tạng'
      },
      formats: {
        compact: '[EBM] De novo Statin in Sepsis (SAILS NEJM 2014: RR 1.01 [0.84-1.21], Không giảm tử vong | PMID: 24836979)',
        order: '❌ Không khuyến cáo khởi đầu Statin mới trong điều trị Sepsis/ARDS (SSC Guideline | PMID: 24836979)',
        dx: '[EBM-Dx] Sepsis SOFA score tăng: Tập trung hồi sức dịch, kháng sinh sớm và Noradrenaline (PMID: 24836979)'
      },
      studies: [
        { category: "primary", name: "SAILS Trial (NEJM 2014)", val: 1.01, low: 0.84, high: 1.21, weight: 55.0, pmid: "24836979" },
        { category: "primary", name: "HARP-2 Trial (NEJM 2014)", val: 0.98, low: 0.77, high: 1.25, weight: 45.0, pmid: "25268903" }
      ],
      metric: "RR",
      pooled: { val: 1.00, low: 0.86, high: 1.16, i2: "0%" }
    },
    {
      id: 'troponin-0h1h',
      category: 'cardio',
      categoryLabel: 'Tim mạch',
      title: 'Thuật toán hs-cTnT 0h/1h trong Loại trừ Hội chứng Vành cấp (NSTE-ACS)',
      topic: 'Tim mạch cấp cứu',
      verdict: 'yes',
      verdictText: 'Có hiệu lực (Yes)',
      pico: {
        p: 'Bệnh nhân đau ngực cấp nghi ngờ Nhồi máu cơ tim không ST chênh lên',
        i: 'Quy trình hs-cTnT 0h/1h (Rule-out / Rule-in protocol)',
        c: 'Quy trình chuẩn 0h/3h hoặc 0h/6h',
        o: 'Độ an toàn (NPV) & Tỷ lệ biến cố tim mạch 30 ngày'
      },
      formats: {
        compact: '[EBM-Dx] hs-cTnT 0h/1h algorithm (ESC 2023: Se 99.1%, NPV 99.7% | PMID: 37622654)',
        order: '✓ Làm hs-cTnT thời điểm 0h và 1h theo sơ đồ ESC (Mức IA - ESC ACS Guideline | PMID: 37622654)',
        dx: '[EBM-Dx] hs-cTnT 0h < 5ng/L (hoặc 0h < 12 & Δ1h < 3ng/L): Rule-out an toàn (NPV > 99% | PMID: 37622654)'
      },
      studies: [
        { category: "primary", name: "APACE Study (2019)", val: 0.99, low: 0.98, high: 1.00, weight: 50.0, pmid: "26487770" },
        { category: "primary", name: "High-STEACS (2020)", val: 0.99, low: 0.98, high: 1.00, weight: 50.0, pmid: "32353457" }
      ],
      metric: "RR",
      pooled: { val: 0.99, low: 0.98, high: 1.00, i2: "0%" }
    }
  ];

  // State
  let currentFormat = 'compact'; // 'compact' | 'order' | 'dx'
  let currentCategory = 'all';
  let currentSearchQuery = '';

  // DOM Elements
  let containerEl, searchInputEl, categoryContainerEl, formatSelectEl, gridEl, toastEl;

  document.addEventListener('DOMContentLoaded', () => {
    initCopilot();
  });

  function initCopilot() {
    containerEl = document.getElementById('bedside-copilot-container');
    if (!containerEl) return;

    renderCopilotLayout();
    bindEvents();
    renderCards();
    restoreCollapsedState();
  }

  function renderCopilotLayout() {
    containerEl.innerHTML = `
      <section class="copilot-section" id="copilot-main-section">
        <div class="copilot-header">
          <div class="copilot-title-box">
            <div class="copilot-icon-badge">
              <i class="fa-solid fa-notes-medical"></i>
            </div>
            <div>
              <h2 class="copilot-title">Bedside EBM Copilot — Trích Xuất Bằng Chứng Bệnh Án</h2>
              <p class="copilot-subtitle">Trích xuất nhanh Micro-evidence Snippet chuẩn 1 dòng vào phần Kế hoạch (Plan/Assessment) của bệnh án & Hội chẩn.</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;">
            <div class="copilot-format-selector">
              <i class="fa-solid fa-sliders" style="color: var(--copilot-primary);"></i>
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
              <button class="copilot-pill" data-cat="icu">Hồi sức & Cấp cứu</button>
              <button class="copilot-pill" data-cat="cardio">Tim mạch</button>
              <button class="copilot-pill" data-cat="gi">Tiêu hóa - Gan mật</button>
            </div>
          </div>

          <div class="copilot-grid" id="copilot-grid">
            <!-- Cards rendered by JS -->
          </div>
        </div>
      </section>

      <!-- Toast Element -->
      <div class="copilot-toast" id="copilot-toast">
        <i class="fa-solid fa-circle-check"></i>
        <span id="copilot-toast-text">Đã sao chép EBM Snippet vào bộ nhớ tạm!</span>
      </div>
    `;

    searchInputEl = document.getElementById('copilot-search-input');
    categoryContainerEl = document.getElementById('copilot-category-pills');
    formatSelectEl = document.getElementById('copilot-format-select');
    gridEl = document.getElementById('copilot-grid');
    toastEl = document.getElementById('copilot-toast');
  }

  function restoreCollapsedState() {
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

  function bindEvents() {
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
          localStorage.setItem('clini_bedside_copilot_collapsed', 'true');
        } else {
          section.classList.remove('collapsed');
          if (label) label.textContent = 'Thu gọn';
          if (icon) icon.textContent = '▲';
          localStorage.setItem('clini_bedside_copilot_collapsed', 'false');
        }
      });
    }
    if (formatSelectEl) {
      formatSelectEl.addEventListener('change', (e) => {
        currentFormat = e.target.value;
        renderCards();
      });
    }

    if (searchInputEl) {
      searchInputEl.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.trim().toLowerCase();
        renderCards();
      });
    }

    if (categoryContainerEl) {
      categoryContainerEl.addEventListener('click', (e) => {
        const pill = e.target.closest('.copilot-pill');
        if (!pill) return;

        categoryContainerEl.querySelectorAll('.copilot-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCategory = pill.dataset.cat;
        renderCards();
      });
    }

    if (gridEl) {
      gridEl.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.btn-copy-snippet');
        if (copyBtn) {
          const snippetText = copyBtn.dataset.snippet;
          copyToClipboard(snippetText, 'Đã copy Snippet 1 dòng vào Bệnh án!');
          return;
        }

        const forestBtn = e.target.closest('.btn-view-forest');
        if (forestBtn) {
          e.preventDefault();
          const trialId = forestBtn.dataset.trialId;
          const trial = BEDSIDE_EVIDENCE_VAULT.find(t => t.id === trialId);
          if (trial) {
            launchForestPlot(trial);
          }
        }
      });
    }
  }

  function renderCards() {
    if (!gridEl) return;

    const filtered = BEDSIDE_EVIDENCE_VAULT.filter(item => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const q = currentSearchQuery;
      const matchSearch = !q || 
        item.title.toLowerCase().includes(q) || 
        item.topic.toLowerCase().includes(q) ||
        item.pico.i.toLowerCase().includes(q) ||
        item.formats[currentFormat].toLowerCase().includes(q);

      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--copilot-text-muted);">
          <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
          <p>Không tìm thấy bằng chứng phù hợp với từ khóa "<strong>${escapeHTML(currentSearchQuery)}</strong>".</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = filtered.map(item => {
      const snippetText = item.formats[currentFormat] || item.formats.compact;
      const boxStyleClass = currentFormat === 'order' ? 'order-style' : (currentFormat === 'dx' ? 'dx-style' : '');

      return `
        <div class="copilot-card">
          <div>
            <div class="copilot-card-top">
              <div>
                <div class="copilot-card-topic"><i class="fa-solid fa-tag"></i> ${escapeHTML(item.topic)}</div>
                <h3 class="copilot-card-title">${escapeHTML(item.title)}</h3>
              </div>
              <span class="verdict-badge ${item.verdict}">
                <i class="fa-solid ${item.verdict === 'yes' ? 'fa-circle-check' : (item.verdict === 'no' ? 'fa-circle-xmark' : 'fa-circle-question')}"></i>
                ${escapeHTML(item.verdictText)}
              </span>
            </div>

            <div style="margin: 0.65rem 0 0.4rem 0;">
              <div class="snippet-box ${boxStyleClass}" title="Nhấp đúp để chọn hoặc bấm nút Copy">${escapeHTML(snippetText)}</div>
            </div>
          </div>

          <div class="copilot-card-actions">
            <button class="btn-copy-snippet" data-snippet="${escapeHTML(snippetText)}">
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

  function launchForestPlot(trial) {
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

    sessionStorage.setItem("forestPlotData", JSON.stringify(payload));
    
    // Determine relative path to forest-plot.html
    const isEbmLab = window.location.pathname.includes('/ebm-lab/');
    const forestUrl = isEbmLab ? 'forest-plot.html' : 'ebm-lab/forest-plot.html';
    window.location.href = forestUrl;
  }

  function copyToClipboard(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(message || 'Đã sao chép vào bộ nhớ tạm!');
      }).catch(() => {
        fallbackCopy(text, message);
      });
    } else {
      fallbackCopy(text, message);
    }
  }

  function fallbackCopy(text, message) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(message || 'Đã sao chép vào bộ nhớ tạm!');
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    if (!toastEl) return;
    const textEl = document.getElementById('copilot-toast-text');
    if (textEl) textEl.textContent = message;
    toastEl.classList.add('show');
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2400);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Export global API
  window.CliniBedsideCopilot = {
    getEvidenceVault: () => BEDSIDE_EVIDENCE_VAULT,
    copySnippet: copyToClipboard,
    launchForestPlot: launchForestPlot,
    generateSnippet: (data, format = 'compact') => {
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
  };

})();
