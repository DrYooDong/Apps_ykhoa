/* ============================================================
   EBM PRACTICE LAB — INTERACTIVE LOGIC
   Location: src/content/ebm/EBM Lab/ebm-lab.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initTabs();
  initPicoBuilder();
  initCaspChecklist();
  initNntCalculator();
});

/* ── TAB SWITCHING ── */
function initTabs() {
  const tabBtns = document.querySelectorAll(".lab-tab-btn");
  const panels = document.querySelectorAll(".lab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPanel = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`panel-${targetPanel}`).classList.add("active");
    });
  });
}

/* ── 1. PICO BUILDER LOGIC (EBM OUTCOME EXTRACTOR) ── */
function initPicoBuilder() {
  const pInput = document.getElementById("pico-p");
  const iInput = document.getElementById("pico-i");
  const cInput = document.getElementById("pico-c");
  const oHidden = document.getElementById("pico-o");

  const oCategory = document.getElementById("pico-o-category");
  const oMetric = document.getElementById("pico-o-metric");
  const oName = document.getElementById("pico-o-name");
  const oVal = document.getElementById("pico-o-val");
  const oLow = document.getElementById("pico-o-low");
  const oHigh = document.getElementById("pico-o-high");
  const btnAddOutcome = document.getElementById("btn-add-outcome");
  const outcomeList = document.getElementById("pico-outcome-list");

  const qPreview = document.getElementById("pico-question-preview");
  const searchString = document.getElementById("pico-search-string");
  const btnCopy = document.getElementById("btn-copy-pico");
  const btnExportForest = document.getElementById("btn-export-forest");

  let outcomes = [
    { name: "Tử vong do nguyên nhân tim mạch (CV Death)", category: "primary", metric: "HR", val: 0.62, low: 0.49, high: 0.77 },
    { name: "3-point MACE (Tử vong TM, MI, Đột quỵ)", category: "composite", metric: "HR", val: 0.86, low: 0.74, high: 0.99 },
    { name: "Giảm chỉ số HbA1c (%)", category: "surrogate", metric: "MD", val: -0.60, low: -0.72, high: -0.48 },
    { name: "Biến cố hạ đường huyết nặng", category: "safety", metric: "OR", val: 0.95, low: 0.80, high: 1.12 }
  ];

  // Load saved PICO Draft (including outcomes)
  const savedPico = localStorage.getItem("cliniportal_pico_draft");
  if (savedPico) {
    try {
      const data = JSON.parse(savedPico);
      if (pInput && data.p) pInput.value = data.p;
      if (iInput && data.i) iInput.value = data.i;
      if (cInput && data.c) cInput.value = data.c;
      if (Array.isArray(data.outcomes) && data.outcomes.length > 0) {
        outcomes = data.outcomes;
      }
    } catch (e) {
      console.warn("Could not load PICO draft:", e);
    }
  }

  function savePicoDraft() {
    localStorage.setItem(
      "cliniportal_pico_draft",
      JSON.stringify({
        p: pInput ? pInput.value : "",
        i: iInput ? iInput.value : "",
        c: cInput ? cInput.value : "",
        outcomes: outcomes
      })
    );
  }

  function renderOutcomes() {
    if (!outcomeList) return;
    outcomeList.innerHTML = "";

    const catBadgeMap = {
      primary: { label: "🎯 Primary Hard", bg: "#dcfce7", color: "#166534" },
      composite: { label: "🧩 Composite", bg: "#f3e8ff", color: "#6b21a8" },
      surrogate: { label: "🧪 Surrogate", bg: "#e0f2fe", color: "#075985" },
      safety: { label: "⚠️ Safety", bg: "#fef3c7", color: "#92400e" }
    };

    outcomes.forEach((item, idx) => {
      const badge = catBadgeMap[item.category] || catBadgeMap.primary;
      const row = document.createElement("div");
      row.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: var(--ebm-surface, #fff); padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid var(--ebm-border, #e2e8f0); font-size: 0.82rem; gap: 0.5rem; flex-wrap: wrap;";
      
      const statText = item.val ? `${item.metric || 'HR'}: ${item.val} (${item.low || '?'}-${item.high || '?'})` : '';
      const isRatio = ["HR", "OR", "RR"].includes(item.metric);

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; flex: 1;">
          <span style="background: ${badge.bg}; color: ${badge.color}; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 6px; font-size: 0.75rem;">${badge.label}</span>
          <strong style="color: var(--ebm-text, #0f172a);">${item.name}</strong>
          ${statText ? `<span style="font-family: 'JetBrains Mono', monospace; color: var(--ebm-primary-dark, #0369a1); font-weight: 600;">[${statText}]</span>` : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          ${isRatio && item.val ? `<button type="button" class="btn-calc-nnt" data-idx="${idx}" style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-calculator"></i> Tính NNT</button>` : ''}
          <button type="button" class="btn-del-outcome" data-idx="${idx}" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.9rem; padding: 0.2rem 0.4rem;">&times;</button>
        </div>
      `;
      outcomeList.appendChild(row);
    });

    // Update hidden field value for legacy compatibility
    const outcomeSummary = outcomes.map(o => o.name).join(", ");
    if (oHidden) oHidden.value = outcomeSummary;

    // Add delete listeners
    document.querySelectorAll(".btn-del-outcome").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        outcomes.splice(idx, 1);
        renderOutcomes();
        updatePicoOutput();
        savePicoDraft();
      });
    });

    // Add NNT transfer listeners
    document.querySelectorAll(".btn-calc-nnt").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        const item = outcomes[idx];
        if (!item || !item.val) return;

        // Assume baseline Control Event Rate (CER) = 15% if not set
        const cer = 15.0;
        const ratio = item.val;
        const eer = parseFloat((cer * ratio).toFixed(1));

        const cerInp = document.getElementById("calc-cer");
        const eerInp = document.getElementById("calc-eer");
        if (cerInp) cerInp.value = cer;
        if (eerInp) eerInp.value = eer;

        // Switch to Tab 3 (NNT)
        const tabBtns = document.querySelectorAll(".lab-tab-btn");
        const panels = document.querySelectorAll(".lab-panel");
        tabBtns.forEach((b) => b.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        const nntTabBtn = document.querySelector('.lab-tab-btn[data-tab="nnt"]');
        const nntPanel = document.getElementById("panel-nnt");
        if (nntTabBtn) nntTabBtn.classList.add("active");
        if (nntPanel) nntPanel.classList.add("active");

        // Trigger NNT recalculation
        if (typeof window.updateNntCalculation === "function") {
          window.updateNntCalculation();
        } else {
          const event = new Event("input");
          if (cerInp) cerInp.dispatchEvent(event);
        }

        // Smooth scroll to NNT section
        if (nntPanel) {
          nntPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  if (btnAddOutcome) {
    btnAddOutcome.addEventListener("click", () => {
      const name = oName.value.trim();
      if (!name) return;

      outcomes.push({
        name: name,
        category: oCategory.value,
        metric: oMetric.value,
        val: parseFloat(oVal.value) || null,
        low: parseFloat(oLow.value) || null,
        high: parseFloat(oHigh.value) || null
      });

      oName.value = "";
      oVal.value = "";
      oLow.value = "";
      oHigh.value = "";

      renderOutcomes();
      updatePicoOutput();
      savePicoDraft();
    });
  }

  function updatePicoOutput() {
    const p = pInput.value.trim() || "[Đối tượng bệnh nhân]";
    const i = iInput.value.trim() || "[Biện pháp can thiệp]";
    const c = cInput.value.trim() || "[Biện pháp so sánh]";
    const oStr = outcomes.length > 0 ? outcomes.map(o => o.name).join("; ") : "[Các kết cục lâm sàng]";

    // Build Natural Language Question
    qPreview.innerHTML = `Ở bệnh nhân <strong style="color: var(--ebm-primary-dark);">${p}</strong>, việc sử dụng <strong style="color: #06b6d4;">${i}</strong> so với <strong style="color: var(--ebm-purple);">${c}</strong> có cải thiện <strong style="color: var(--ebm-success);">${oStr}</strong> hay không?`;

    // Build PubMed Search String
    const meshP = pInput.value.trim() ? `(${pInput.value.trim()}[Title/Abstract] OR "${pInput.value.trim()}"[MeSH Terms])` : "";
    const meshI = iInput.value.trim() ? `(${iInput.value.trim()}[Title/Abstract] OR "${iInput.value.trim()}"[MeSH Terms])` : "";
    const meshC = cInput.value.trim() ? `(${cInput.value.trim()}[Title/Abstract])` : "";
    const meshO = outcomes.length > 0 ? `(${outcomes.map(o => `"${o.name}"[Title/Abstract]`).join(" OR ")})` : "";

    const parts = [meshP, meshI, meshC, meshO].filter(Boolean);
    const query = parts.length > 0 ? parts.join(" AND ") : "Nhập thông tin PICO phía trên để tạo chuỗi tìm kiếm...";

    searchString.textContent = query;
  }

  [pInput, iInput, cInput].forEach((el) => {
    if (el) {
      el.addEventListener("input", () => {
        updatePicoOutput();
        savePicoDraft();
      });
    }
  });

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(searchString.textContent).then(() => {
        const origText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép!`;
        setTimeout(() => (btnCopy.innerHTML = origText), 2000);
      });
    });
  }

  if (btnExportForest) {
    btnExportForest.addEventListener("click", () => {
      const payload = {
        title: `${iInput.value.trim() || 'Biện pháp Can thiệp'} vs ${cInput.value.trim() || 'Biện pháp So sánh'}`,
        intervention: iInput.value.trim() || 'Can thiệp',
        comparator: cInput.value.trim() || 'Đối chứng',
        outcomes: outcomes
      };
      sessionStorage.setItem("forestPlotData", JSON.stringify(payload));
      window.location.href = "forest-plot.html";
    });
  }

  renderOutcomes();
  updatePicoOutput();
}

/* ── 2. CASP CRITICAL APPRAISAL TOOLKIT LOGIC ── */
function initCaspChecklist() {
  const caspRadios = document.querySelectorAll('.casp-options input[type="radio"]');
  const scoreVal = document.getElementById("casp-score-value");
  const riskBadge = document.getElementById("casp-risk-badge");

  function calculateCaspScore() {
    let yesCount = 0;
    let noCount = 0;
    let cantCount = 0;
    let totalAnswered = 0;

    const questions = document.querySelectorAll(".casp-item");
    questions.forEach((q) => {
      const checked = q.querySelector('input[type="radio"]:checked');
      if (checked) {
        totalAnswered++;
        if (checked.value === "yes") yesCount++;
        else if (checked.value === "no") noCount++;
        else if (checked.value === "cant") cantCount++;
      }
    });

    scoreVal.textContent = `${yesCount} / 11`;

    if (totalAnswered < 5) {
      riskBadge.className = "casp-score-badge mod-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-circle-info"></i> Đang đánh giá (${totalAnswered}/11 câu)...`;
      return;
    }

    if (yesCount >= 9 && noCount <= 1) {
      riskBadge.className = "casp-score-badge low-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Sai số thấp (High Quality RCT)`;
    } else if (yesCount >= 6) {
      riskBadge.className = "casp-score-badge mod-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Sai số trung bình (Moderate Quality)`;
    } else {
      riskBadge.className = "casp-score-badge high-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Sai số cao / Chất lượng thấp (Low Quality)`;
    }
  }

  caspRadios.forEach((radio) => {
    radio.addEventListener("change", calculateCaspScore);
  });

  calculateCaspScore();
}

/* ── 3. NNT & ARR CALCULATOR LOGIC ── */
function initNntCalculator() {
  const inputCer = document.getElementById("calc-cer"); // Control Event Rate (%)
  const inputEer = document.getElementById("calc-eer"); // Experimental Event Rate (%)

  const valArr = document.getElementById("metric-arr");
  const valRrr = document.getElementById("metric-rrr");
  const valNnt = document.getElementById("metric-nnt");
  const valOr = document.getElementById("metric-or");

  const iconGrid = document.getElementById("icon-array-grid");
  const iconText = document.getElementById("icon-array-text");

  function calculateNnt() {
    let cer = parseFloat(inputCer.value);
    let eer = parseFloat(inputEer.value);

    if (isNaN(cer)) cer = 20;
    if (isNaN(eer)) eer = 12;

    const arr = Math.abs(cer - eer); // Absolute Risk Reduction (%)
    const rrr = cer > 0 ? ((cer - eer) / cer) * 100 : 0; // Relative Risk Reduction (%)
    const nnt = arr > 0 ? Math.ceil(100 / arr) : 0; // Number Needed to Treat

    // Odd Ratio approximation for events
    const oddsControl = cer / (100 - cer);
    const oddsExp = eer / (100 - eer);
    const oddsRatio = oddsControl > 0 ? (oddsExp / oddsControl).toFixed(2) : "--";

    valArr.textContent = `${arr.toFixed(1)}%`;
    valRrr.textContent = `${rrr.toFixed(1)}%`;
    valNnt.textContent = nnt > 0 ? nnt : "∞";
    valOr.textContent = oddsRatio;

    // Render 100 Icon Array Visual
    renderIconArray(cer, eer, arr, nnt);
  }

  function renderIconArray(cer, eer, arr, nnt) {
    if (!iconGrid) return;
    iconGrid.innerHTML = "";

    const numSaved = Math.round(arr); // How many out of 100 are saved by drug
    const numEventExp = Math.round(eer); // How many still have event despite drug
    const numUnaffected = 100 - numSaved - numEventExp;

    for (let i = 0; i < 100; i++) {
      const icon = document.createElement("div");
      icon.className = "person-icon";

      if (i < numSaved) {
        icon.classList.add("saved");
        icon.innerHTML = `<i class="fa-solid fa-heart-pulse"></i>`;
        icon.title = "Được cứu nhờ can thiệp điều trị";
      } else if (i < numSaved + numEventExp) {
        icon.classList.add("event");
        icon.innerHTML = `<i class="fa-solid fa-user-xmark"></i>`;
        icon.title = "Vẫn xảy ra biến cố";
      } else {
        icon.classList.add("unaffected");
        icon.innerHTML = `<i class="fa-solid fa-user"></i>`;
        icon.title = "Không xảy ra biến cố";
      }

      iconGrid.appendChild(icon);
    }

    if (iconText) {
      iconText.innerHTML = `Điều trị <strong>100</strong> bệnh nhân sẽ giúp cứu được <strong style="color: var(--ebm-success);">${numSaved} người</strong> khỏi biến cố (NNT = <strong>${nnt}</strong>).`;
    }
  }

  [inputCer, inputEer].forEach((input) => {
    if (input) input.addEventListener("input", calculateNnt);
  });

  calculateNnt();
}

