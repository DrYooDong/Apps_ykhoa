/* ============================================================
   INTERACTIVE FOREST PLOT BUILDER (SVG ENGINE — MULTI-TIER OUTCOME ENHANCED)
   Location: src/content/ebm/ebm-lab/forest-plot.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initForestPlotBuilder();
});

/* PRESET DATASETS */
const PRESETS = {
  multi_tier_ada: {
    title: "ADA 2026 — SGLT2i Multi-Tier Outcomes Analysis",
    subtitle: "Bóc Tách Kết Cục Đa Tầng (Hard, Composite, Surrogate, Safety)",
    metricMode: "ratio",
    metric: "HR",
    nullVal: 1.0,
    minVal: 0.3,
    maxVal: 1.8,
    studies: [
      { category: "primary", name: "Tử vong do mọi nguyên nhân (All-Cause Mortality)", val: 0.68, low: 0.54, high: 0.86, weight: 25.0 },
      { category: "primary", name: "Tử vong do tim mạch (CV Mortality)", val: 0.62, low: 0.49, high: 0.77, weight: 22.0 },
      { category: "composite", name: "3-Point MACE (CV Death, MI, Stroke)", val: 0.86, low: 0.74, high: 0.99, weight: 30.0 },
      { category: "composite", name: "Kết cục gộp Thận (Renal Composite Outcome)", val: 0.61, low: 0.48, high: 0.76, weight: 18.0 },
      { category: "surrogate", name: "Mức giảm HbA1c trung bình (MD -0.6%)", val: 0.75, low: 0.65, high: 0.87, weight: 15.0 },
      { category: "safety", name: "Biến cố Hạ đường huyết nặng (Severe Hypo)", val: 0.95, low: 0.80, high: 1.12, weight: 10.0 }
    ],
    pooled: { val: 0.72, low: 0.64, high: 0.81 }
  },

  empareg: {
    title: "EMPA-REG OUTCOME — Phân Tích Subgroup Tim Mạch",
    subtitle: "Can thiệp: Empagliflozin vs Placebo",
    metricMode: "ratio",
    metric: "HR",
    nullVal: 1.0,
    minVal: 0.4,
    maxVal: 1.6,
    studies: [
      { category: "subgroup", name: "Châu Á (Asian Patients)", val: 0.82, low: 0.64, high: 1.04, weight: 22.5 },
      { category: "subgroup", name: "Tiền sử Suy Tim (HF)", val: 0.65, low: 0.50, high: 0.85, weight: 18.0 },
      { category: "subgroup", name: "Bệnh Thận Mạn (eGFR < 60)", val: 0.70, low: 0.51, high: 0.96, weight: 19.5 },
      { category: "subgroup", name: "Nhồi Máu Cơ Tim Cũ", val: 0.85, low: 0.71, high: 1.02, weight: 24.0 },
      { category: "subgroup", name: "Tuổi ≥ 65", val: 0.87, low: 0.71, high: 1.07, weight: 16.0 }
    ],
    pooled: { val: 0.78, low: 0.69, high: 0.88 }
  },

  dapahf: {
    title: "DAPA-HF — Tiêu Chí Gộp Tử Vong Tim Mạch & Suy Tim",
    subtitle: "Can thiệp: Dapagliflozin vs Placebo",
    metricMode: "ratio",
    metric: "HR",
    nullVal: 1.0,
    minVal: 0.4,
    maxVal: 1.6,
    studies: [
      { category: "subgroup", name: "Bệnh nhân có ĐTĐ typ 2", val: 0.75, low: 0.63, high: 0.90, weight: 45.0 },
      { category: "subgroup", name: "Bệnh nhân KHÔNG có ĐTĐ", val: 0.73, low: 0.60, high: 0.88, weight: 55.0 }
    ],
    pooled: { val: 0.74, low: 0.65, high: 0.85 }
  },

  esc2026: {
    title: "ESC 2026 AF Trials — Hiệu Quả Kháng Đông DOACs vs Warfarin",
    subtitle: "Can thiệp: DOACs vs Warfarin",
    metricMode: "ratio",
    metric: "RR",
    nullVal: 1.0,
    minVal: 0.4,
    maxVal: 1.6,
    studies: [
      { category: "primary", name: "RE-LY (Dabigatran 150mg)", val: 0.66, low: 0.53, high: 0.82, weight: 28.0 },
      { category: "primary", name: "ROCKET AF (Rivaroxaban)", val: 0.79, low: 0.66, high: 0.96, weight: 26.0 },
      { category: "primary", name: "ARISTOTLE (Apixaban)", val: 0.79, low: 0.66, high: 0.95, weight: 26.0 },
      { category: "primary", name: "ENGAGE AF (Edoxaban 60mg)", val: 0.79, low: 0.63, high: 0.99, weight: 20.0 }
    ],
    pooled: { val: 0.76, low: 0.69, high: 0.84 }
  }
};

const CATEGORY_MAP = {
  primary: { label: "🎯 Primary Hard Outcomes", color: "#166534" },
  composite: { label: "🧩 Composite Outcomes", color: "#6b21a8" },
  surrogate: { label: "🧪 Surrogate Endpoints", color: "#075985" },
  safety: { label: "⚠️ Safety Endpoints", color: "#92400e" },
  subgroup: { label: "📊 Subgroup Analysis", color: "#0369a1" }
};

function initForestPlotBuilder() {
  let metricMode = "ratio"; // "ratio" (Log) or "difference" (Linear)
  let currentMetric = "HR";
  let nullVal = 1.0;
  let studiesData = [];
  let pooledData = {};
  let minAxis = 0.3;
  let maxAxis = 1.8;

  // Check if multi-outcome data passed from PICO Builder via sessionStorage
  const passedDataStr = sessionStorage.getItem("forestPlotData");
  if (passedDataStr) {
    try {
      const passedData = JSON.parse(passedDataStr);
      if (passedData.title) {
        document.querySelector("h1").textContent = `Forest Plot: ${passedData.title}`;
      }
      if (passedData.intervention && passedData.comparator) {
        const descEl = document.querySelector(".fp-card-desc");
        if (descEl) descEl.textContent = `Can thiệp: ${passedData.intervention} vs ${passedData.comparator}`;
      }

      if (passedData.outcomes && passedData.outcomes.length > 0) {
        studiesData = passedData.outcomes.map(o => ({
          category: o.category || "primary",
          name: o.name,
          val: o.val || 0.8,
          low: o.low || 0.6,
          high: o.high || 1.05,
          weight: 20.0
        }));
        // Check metric mode
        const firstMetric = passedData.outcomes[0].metric || "HR";
        if (["MD", "SMD", "WMD"].includes(firstMetric)) {
          metricMode = "difference";
          nullVal = 0.0;
          minAxis = -1.5;
          maxAxis = 1.5;
          currentMetric = firstMetric;
        } else {
          metricMode = "ratio";
          nullVal = 1.0;
          minAxis = 0.3;
          maxAxis = 1.8;
          currentMetric = firstMetric;
        }
      }
      sessionStorage.removeItem("forestPlotData");
    } catch (e) {
      console.error("Error parsing forestPlotData:", e);
      studiesData = [...PRESETS.multi_tier_ada.studies];
    }
  } else {
    studiesData = [...PRESETS.multi_tier_ada.studies];
  }

  const tableBody = document.getElementById("fp-table-body");
  const svgCanvas = document.getElementById("fp-svg-canvas");
  const presetSelect = document.getElementById("fp-preset-select");
  const metricTypeSelect = document.getElementById("fp-metric-type-select");
  const btnAddRow = document.getElementById("fp-btn-add-row");
  const statI2 = document.getElementById("fp-stat-i2");
  const statNull = document.getElementById("fp-stat-null");
  const statScale = document.getElementById("fp-stat-scale");

  if (metricTypeSelect) {
    metricTypeSelect.value = metricMode;
    metricTypeSelect.addEventListener("change", (e) => {
      metricMode = e.target.value;
      if (metricMode === "ratio") {
        nullVal = 1.0;
        minAxis = 0.3;
        maxAxis = 1.8;
        currentMetric = "HR";
        if (statNull) statNull.textContent = "1.0";
        if (statScale) statScale.textContent = "Logarithmic Scale";
      } else {
        nullVal = 0.0;
        minAxis = -1.5;
        maxAxis = 1.5;
        currentMetric = "MD";
        if (statNull) statNull.textContent = "0.0";
        if (statScale) statScale.textContent = "Linear Scale";
      }
      recalculatePooled();
      renderTable();
      renderSvgForestPlot();
    });
  }

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    studiesData.forEach((st, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>
          <select class="fp-inp fp-cat" data-idx="${idx}">
            <option value="primary" ${st.category === 'primary' ? 'selected' : ''}>🎯 Primary Hard</option>
            <option value="composite" ${st.category === 'composite' ? 'selected' : ''}>🧩 Composite</option>
            <option value="surrogate" ${st.category === 'surrogate' ? 'selected' : ''}>🧪 Surrogate</option>
            <option value="safety" ${st.category === 'safety' ? 'selected' : ''}>⚠️ Safety</option>
            <option value="subgroup" ${st.category === 'subgroup' ? 'selected' : ''}>📊 Subgroup</option>
          </select>
        </td>
        <td><input type="text" value="${st.name}" class="fp-inp fp-name" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.val}" class="fp-inp fp-val" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.low}" class="fp-inp fp-low" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.high}" class="fp-inp fp-high" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" value="${st.weight}" class="fp-inp fp-weight" data-idx="${idx}"></td>
        <td style="text-align: center;"><button class="fp-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    // Input change listeners
    document.querySelectorAll(".fp-inp").forEach((inp) => {
      inp.addEventListener("input", handleInputChange);
    });

    document.querySelectorAll(".fp-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        studiesData.splice(idx, 1);
        renderTable();
        recalculatePooled();
        renderSvgForestPlot();
      });
    });
  }

  function handleInputChange(e) {
    const idx = parseInt(e.target.getAttribute("data-idx"));
    if (isNaN(idx)) return;

    const row = studiesData[idx];
    if (e.target.classList.contains("fp-cat")) row.category = e.target.value;
    if (e.target.classList.contains("fp-name")) row.name = e.target.value;
    if (e.target.classList.contains("fp-val")) row.val = parseFloat(e.target.value) || nullVal;
    if (e.target.classList.contains("fp-low")) row.low = parseFloat(e.target.value) || nullVal - 0.2;
    if (e.target.classList.contains("fp-high")) row.high = parseFloat(e.target.value) || nullVal + 0.2;
    if (e.target.classList.contains("fp-weight")) row.weight = parseFloat(e.target.value) || 10;

    recalculatePooled();
    renderSvgForestPlot();
  }

  function recalculatePooled() {
    if (studiesData.length === 0) return;
    let sumW = 0;
    let sumWVal = 0;

    studiesData.forEach((s) => {
      const w = s.weight || 1;
      sumW += w;
      if (metricMode === "ratio") {
        sumWVal += w * Math.log(s.val || 1.0);
      } else {
        sumWVal += w * (s.val || 0.0);
      }
    });

    let pooledVal = metricMode === "ratio" ? Math.exp(sumWVal / (sumW || 1)) : sumWVal / (sumW || 1);
    pooledData = {
      val: parseFloat(pooledVal.toFixed(2)),
      low: parseFloat((metricMode === "ratio" ? pooledVal * 0.88 : pooledVal - 0.2).toFixed(2)),
      high: parseFloat((metricMode === "ratio" ? pooledVal * 1.12 : pooledVal + 0.2).toFixed(2))
    };

    let variance = 0;
    studiesData.forEach((s) => {
      variance += Math.pow(s.val - pooledVal, 2);
    });
    const i2 = Math.min(95, Math.max(0, Math.round(variance * 80)));
    if (statI2) statI2.textContent = `${i2}%`;
  }

  /* ── SVG ENGINE WITH LOGIC-BASED SCALING & SEMANTIC UI ── */
  function renderSvgForestPlot() {
    if (!svgCanvas) return;

    const paddingX = 280;
    const plotWidth = 330;
    const rowHeight = 34;
    const groupHeaderHeight = 24;
    const headerHeight = 45;
    const footerHeight = 65;
    const canvasWidth = 750;

    // Group studies by category
    const grouped = {};
    studiesData.forEach((st) => {
      const cat = st.category || "primary";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(st);
    });

    const activeCategories = Object.keys(grouped);
    let totalRows = studiesData.length + (activeCategories.length > 1 ? activeCategories.length : 0);
    const canvasHeight = headerHeight + totalRows * rowHeight + footerHeight;

    svgCanvas.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);
    svgCanvas.setAttribute("width", "100%");
    svgCanvas.setAttribute("height", canvasHeight);

    // Scale X function (Logarithmic vs Linear)
    function scaleX(val) {
      const clampVal = Math.max(minAxis, Math.min(maxAxis, val));
      if (metricMode === "ratio") {
        const logMin = Math.log(minAxis);
        const logMax = Math.log(maxAxis);
        const logVal = Math.log(clampVal);
        const pct = (logVal - logMin) / (logMax - logMin);
        return paddingX + pct * plotWidth;
      } else {
        const pct = (clampVal - minAxis) / (maxAxis - minAxis);
        return paddingX + pct * plotWidth;
      }
    }

    const xNull = scaleX(nullVal);

    let svgHtml = `
      <!-- Background Card -->
      <rect x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" fill="var(--color-surface)" rx="12" />
      
      <!-- Table Header -->
      <text x="15" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="var(--color-text)">Nghiên Cứu / Outcome Category</text>
      <text x="${scaleX(minAxis)}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">${minAxis}</text>
      <text x="${xNull}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="var(--color-primary-dark)" text-anchor="middle">${nullVal} (Null)</text>
      <text x="${scaleX(maxAxis)}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">${maxAxis}</text>
      <text x="${canvasWidth - 15}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="var(--color-text)" text-anchor="end">${currentMetric} (95% CI)</text>
      <line x1="15" y1="38" x2="${canvasWidth - 15}" y2="38" stroke="var(--color-divider)" stroke-width="1.5" />
      
      <!-- Dotted Line of No Effect -->
      <line x1="${xNull}" y1="40" x2="${xNull}" y2="${canvasHeight - 40}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
    `;

    let currentY = headerHeight + 15;

    activeCategories.forEach((catKey) => {
      const items = grouped[catKey];
      const catMeta = CATEGORY_MAP[catKey] || CATEGORY_MAP.primary;

      // Group Header (only if multiple categories exist)
      if (activeCategories.length > 1) {
        svgHtml += `
          <text x="15" y="${currentY + 12}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="${catMeta.color}">${catMeta.label}</text>
          <line x1="15" y1="${currentY + 18}" x2="${paddingX - 10}" y2="${currentY + 18}" stroke="${catMeta.color}" stroke-width="1" stroke-dasharray="2,2" opacity="0.4" />
        `;
        currentY += groupHeaderHeight;
      }

      items.forEach((st) => {
        const y = currentY + rowHeight / 2;
        const xVal = scaleX(st.val);
        const xLow = scaleX(st.low);
        const xHigh = scaleX(st.high);
        const boxSize = Math.max(6, Math.min(16, (st.weight / 100) * 40));

        // SEMANTIC UI COLORING LOGIC
        // Is CI crossing Null line?
        const crossesNull = st.low <= nullVal && st.high >= nullVal;
        let color = "#64748b"; // Default Gray (Not Significant)

        if (!crossesNull) {
          const isBetter = metricMode === "ratio" ? st.val < nullVal : st.val < nullVal;
          color = isBetter ? "#10b981" : "#ef4444"; // Green (Favors Tx) vs Red (Favors Ctrl)
        }

        svgHtml += `
          <!-- Outcome Name -->
          <text x="${activeCategories.length > 1 ? 25 : 15}" y="${y + 4}" font-family="'Inter', sans-serif" font-size="11.5" font-weight="600" fill="var(--color-text)">${st.name}</text>
          
          <!-- CI Whisker Line -->
          <line x1="${xLow}" y1="${y}" x2="${xHigh}" y2="${y}" stroke="${color}" stroke-width="2" />
          <line x1="${xLow}" y1="${y - 4}" x2="${xLow}" y2="${y + 4}" stroke="${color}" stroke-width="2" />
          <line x1="${xHigh}" y1="${y - 4}" x2="${xHigh}" y2="${y + 4}" stroke="${color}" stroke-width="2" />
          
          <!-- Study Weight Box -->
          <rect x="${xVal - boxSize / 2}" y="${y - boxSize / 2}" width="${boxSize}" height="${boxSize}" fill="${color}" rx="2" />
          
          <!-- Numerical Value Label -->
          <text x="${canvasWidth - 15}" y="${y + 4}" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="${color}" text-anchor="end">${st.val.toFixed(2)} (${st.low.toFixed(2)}-${st.high.toFixed(2)})</text>
        `;

        currentY += rowHeight;
      });
    });

    // Pooled Estimate Diamond
    const yPool = currentY + 20;
    const xPoolVal = scaleX(pooledData.val);
    const xPoolLow = scaleX(pooledData.low);
    const xPoolHigh = scaleX(pooledData.high);
    const diamondPoints = `${xPoolLow},${yPool} ${xPoolVal},${yPool - 8} ${xPoolHigh},${yPool} ${xPoolVal},${yPool + 8}`;

    svgHtml += `
      <line x1="15" y1="${yPool - 12}" x2="${canvasWidth - 15}" y2="${yPool - 12}" stroke="var(--color-divider)" stroke-width="1.5" />
      <text x="15" y="${yPool + 4}" font-family="'Plus Jakarta Sans', sans-serif" font-size="12.5" font-weight="800" fill="#7c3aed">Hiệu Quả Gộp (Pooled Estimate)</text>
      <polygon points="${diamondPoints}" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5" />
      <text x="${canvasWidth - 15}" y="${yPool + 4}" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="800" fill="#7c3aed" text-anchor="end">${pooledData.val.toFixed(2)} (${pooledData.low.toFixed(2)}-${pooledData.high.toFixed(2)})</text>
      
      <!-- Axis Legend Label -->
      <text x="${paddingX + plotWidth / 4}" y="${canvasHeight - 8}" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#10b981" text-anchor="middle">◄ Can thiệp có lợi (Favors Intervention)</text>
      <text x="${paddingX + (plotWidth * 3) / 4}" y="${canvasHeight - 8}" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#ef4444" text-anchor="middle">Đối chứng có lợi (Favors Control) ►</text>
    `;

    svgCanvas.innerHTML = svgHtml;
  }

  // Presets selector listener
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const presetKey = e.target.value;
      if (PRESETS[presetKey]) {
        const p = PRESETS[presetKey];
        metricMode = p.metricMode || "ratio";
        currentMetric = p.metric;
        nullVal = p.nullVal;
        minAxis = p.minVal;
        maxAxis = p.maxVal;
        studiesData = [...p.studies];
        if (metricTypeSelect) metricTypeSelect.value = metricMode;
        if (statNull) statNull.textContent = nullVal.toFixed(1);
        if (statScale) statScale.textContent = metricMode === "ratio" ? "Logarithmic Scale" : "Linear Scale";
        recalculatePooled();
        renderTable();
        renderSvgForestPlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      studiesData.push({
        category: "primary",
        name: `Outcome mới ${studiesData.length + 1}`,
        val: metricMode === "ratio" ? 0.75 : -0.5,
        low: metricMode === "ratio" ? 0.60 : -0.8,
        high: metricMode === "ratio" ? 0.95 : -0.2,
        weight: 15.0
      });
      recalculatePooled();
      renderTable();
      renderSvgForestPlot();
    });
  }

  // Living Review Topic Selector & Bedside Snippet Integration
  const livingTopicSelect = document.getElementById("fp-living-topic-select");
  const verdictBadge = document.getElementById("fp-verdict-badge");
  const verdictText = document.getElementById("fp-verdict-text");
  const bedsideSnippetDisplay = document.getElementById("fp-bedside-snippet-display");
  const snippetFormatSelect = document.getElementById("fp-snippet-format");
  const btnCopySnippet = document.getElementById("fp-btn-copy-snippet");

  let currentActiveTrial = null;

  if (livingTopicSelect) {
    livingTopicSelect.addEventListener("change", (e) => {
      const topicId = e.target.value;
      if (!topicId) return;

      if (window.CliniBedsideCopilot) {
        const vault = window.CliniBedsideCopilot.getEvidenceVault();
        const trial = vault.find(t => t.id === topicId);
        if (trial) {
          currentActiveTrial = trial;
          document.querySelector("h1").textContent = `Forest Plot: ${trial.title}`;
          const descEl = document.querySelector(".fp-card-desc");
          if (descEl) descEl.textContent = `PICO: ${trial.pico.p} | Can thiệp: ${trial.pico.i} vs ${trial.pico.c} | Kết cục: ${trial.pico.o}`;

          studiesData = trial.studies.map(s => ({
            category: s.category || "primary",
            name: s.name,
            val: s.val,
            low: s.low,
            high: s.high,
            weight: s.weight
          }));

          metricMode = trial.metric === "MD" ? "difference" : "ratio";
          currentMetric = trial.metric || "RR";
          nullVal = metricMode === "ratio" ? 1.0 : 0.0;
          minAxis = metricMode === "ratio" ? 0.3 : -1.5;
          maxAxis = metricMode === "ratio" ? 1.8 : 1.5;

          if (metricTypeSelect) metricTypeSelect.value = metricMode;
          if (statNull) statNull.textContent = nullVal.toFixed(1);
          if (statScale) statScale.textContent = metricMode === "ratio" ? "Logarithmic Scale" : "Linear Scale";

          recalculatePooled();
          renderTable();
          renderSvgForestPlot();
          updateVerdictAndSnippet(trial);
        }
      }
    });
  }

  function updateVerdictAndSnippet(trialData) {
    if (!verdictBadge || !bedsideSnippetDisplay) return;

    const fmt = snippetFormatSelect ? snippetFormatSelect.value : 'compact';

    if (trialData) {
      // Use existing trial data
      const verdict = trialData.verdict || 'yes';
      verdictBadge.className = `verdict-badge ${verdict}`;
      verdictBadge.innerHTML = `<i class="fa-solid ${verdict === 'yes' ? 'fa-circle-check' : (verdict === 'no' ? 'fa-circle-xmark' : 'fa-circle-question')}"></i> <span>${trialData.verdictText || 'Evidence Assessed'}</span>`;

      if (trialData.formats && trialData.formats[fmt]) {
        bedsideSnippetDisplay.textContent = trialData.formats[fmt];
      } else {
        bedsideSnippetDisplay.textContent = `[EBM] ${trialData.pico.i} (${trialData.title}: ${trialData.metric || 'RR'} ${pooledData.val} [${pooledData.low}-${pooledData.high}])`;
      }
    } else {
      // Compute dynamic verdict from pooledData
      let verdict = 'maybe';
      let vText = 'Bằng chứng chưa thống nhất (Inconclusive)';

      if (metricMode === 'ratio') {
        if (pooledData.high < 1.0) {
          verdict = 'yes';
          vText = 'Bằng chứng ủng hộ can thiệp (Favors Intervention - Yes)';
        } else if (pooledData.low > 1.0) {
          verdict = 'no';
          vText = 'Bằng chứng ủng hộ nhóm chứng (Favors Control - No)';
        }
      } else {
        if (pooledData.high < 0.0) {
          verdict = 'yes';
          vText = 'Can thiệp làm giảm chỉ số có ý nghĩa (Yes)';
        } else if (pooledData.low > 0.0) {
          verdict = 'no';
          vText = 'Can thiệp làm tăng chỉ số (No)';
        }
      }

      verdictBadge.className = `verdict-badge ${verdict}`;
      verdictBadge.innerHTML = `<i class="fa-solid ${verdict === 'yes' ? 'fa-circle-check' : (verdict === 'no' ? 'fa-circle-xmark' : 'fa-circle-question')}"></i> <span>${vText}</span>`;

      const pTitle = document.querySelector("h1").textContent.replace("Forest Plot: ", "") || "Can thiệp lâm sàng";
      if (fmt === 'order') {
        bedsideSnippetDisplay.textContent = `✓ Y lệnh ${pTitle} (Pooled ${currentMetric}: ${pooledData.val} [${pooledData.low}-${pooledData.high}] | CliniPortal EBM)`;
      } else if (fmt === 'dx') {
        bedsideSnippetDisplay.textContent = `[EBM-Dx] ${pTitle} (Pooled ${currentMetric}: ${pooledData.val} [${pooledData.low}-${pooledData.high}])`;
      } else {
        bedsideSnippetDisplay.textContent = `[EBM] ${pTitle} (Meta-Analysis Pooled ${currentMetric}: ${pooledData.val} [${pooledData.low}-${pooledData.high}], I²=${statI2 ? statI2.textContent : '0%'})`;
      }
    }
  }

  if (snippetFormatSelect) {
    snippetFormatSelect.addEventListener("change", () => {
      updateVerdictAndSnippet(currentActiveTrial);
    });
  }

  if (btnCopySnippet && bedsideSnippetDisplay) {
    btnCopySnippet.addEventListener("click", () => {
      const text = bedsideSnippetDisplay.textContent.trim();
      if (window.CliniBedsideCopilot && window.CliniBedsideCopilot.copySnippet) {
        window.CliniBedsideCopilot.copySnippet(text, 'Đã copy Snippet 1 dòng vào Bệnh án!');
      } else {
        navigator.clipboard.writeText(text).then(() => {
          const toast = document.getElementById("copilot-toast");
          if (toast) {
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 2400);
          }
        });
      }
    });
  }

  // Export SVG & PNG Handlers
  const btnExportSvg = document.getElementById("btn-export-svg");
  const btnExportPng = document.getElementById("btn-export-png");

  if (btnExportSvg) {
    btnExportSvg.addEventListener("click", () => {
      if (!svgCanvas) return;
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgCanvas);

      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Forest_Plot_CliniPortal.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  if (btnExportPng) {
    btnExportPng.addEventListener("click", () => {
      if (!svgCanvas) return;
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svgCanvas);

      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const URL_Obj = window.URL || window.webkitURL || window;
      const blobURL = URL_Obj.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const scale = 2; // HD Quality multiplier
        const width = parseInt(svgCanvas.getAttribute("viewBox").split(" ")[2]) || 750;
        const height = parseInt(svgCanvas.getAttribute("viewBox").split(" ")[3]) || 400;

        canvas.width = width * scale;
        canvas.height = height * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);

        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = "Forest_Plot_CliniPortal.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL_Obj.revokeObjectURL(blobURL);
      };
      img.src = blobURL;
    });
  }

  // Initial Load
  recalculatePooled();
  renderTable();
  renderSvgForestPlot();
  updateVerdictAndSnippet(currentActiveTrial);
}
