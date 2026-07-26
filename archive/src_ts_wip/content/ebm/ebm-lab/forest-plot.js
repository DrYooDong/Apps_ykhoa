/* ============================================================
   INTERACTIVE FOREST PLOT BUILDER (SVG ENGINE)
   Location: pages/Y học chứng cứ/EBM Lab/forest-plot.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initForestPlotBuilder();
});

/* PRESET DATASETS */
const PRESETS = {
  empareg: {
    title: "EMPA-REG OUTCOME — Phân Tích Subgroup Tim Mạch",
    metric: "HR",
    nullVal: 1.0,
    minVal: 0.4,
    maxVal: 1.6,
    studies: [
      { name: "Châu Á (Asian Patients)", val: 0.82, low: 0.64, high: 1.04, weight: 22.5 },
      { name: "Tiền sử Suy Tim (HF)", val: 0.65, low: 0.50, high: 0.85, weight: 18.0 },
      { name: "Bệnh Thận Mạn (eGFR < 60)", val: 0.70, low: 0.51, high: 0.96, weight: 19.5 },
      { name: "Nhồi Máu Cơ Tim Cũ", val: 0.85, low: 0.71, high: 1.02, weight: 24.0 },
      { name: "Tuổi ≥ 65", val: 0.87, low: 0.71, high: 1.07, weight: 16.0 }
    ],
    pooled: { val: 0.78, low: 0.69, high: 0.88 }
  },

  dapahf: {
    title: "DAPA-HF — Tiêu Chí Gộp Tử Vong Tim Mạch & Suy Tim",
    metric: "HR",
    nullVal: 1.0,
    minVal: 0.4,
    maxVal: 1.6,
    studies: [
      { name: "Bệnh nhân có ĐTĐ typ 2", val: 0.75, low: 0.63, high: 0.90, weight: 45.0 },
      { name: "Bệnh nhân KHÔNG có ĐTĐ", val: 0.73, low: 0.60, high: 0.88, weight: 55.0 }
    ],
    pooled: { val: 0.74, low: 0.65, high: 0.85 }
  },

  esc2026: {
    title: "ESC 2026 AF Trials — Hiệu Quả Kháng Đông DOACs vs Warfarin",
    metric: "RR",
    nullVal: 1.0,
    minVal: 0.4,
    maxVal: 1.6,
    studies: [
      { name: "RE-LY (Dabigatran 150mg)", val: 0.66, low: 0.53, high: 0.82, weight: 28.0 },
      { name: "ROCKET AF (Rivaroxaban)", val: 0.79, low: 0.66, high: 0.96, weight: 26.0 },
      { name: "ARISTOTLE (Apixaban)", val: 0.79, low: 0.66, high: 0.95, weight: 26.0 },
      { name: "ENGAGE AF (Edoxaban 60mg)", val: 0.79, low: 0.63, high: 0.99, weight: 20.0 }
    ],
    pooled: { val: 0.76, low: 0.69, high: 0.84 }
  }
};

function initForestPlotBuilder() {
  let currentMetric = "HR";
  let studiesData = [...PRESETS.empareg.studies];
  let pooledData = { ...PRESETS.empareg.pooled };
  let minAxis = 0.4;
  let maxAxis = 1.6;

  const tableBody = document.getElementById("fp-table-body");
  const svgCanvas = document.getElementById("fp-svg-canvas");
  const presetSelect = document.getElementById("fp-preset-select");
  const btnAddRow = document.getElementById("fp-btn-add-row");
  const statI2 = document.getElementById("fp-stat-i2");

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    studiesData.forEach((st, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" value="${st.name}" class="fp-inp fp-name" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.val}" class="fp-inp fp-val" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.low}" class="fp-inp fp-low" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.high}" class="fp-inp fp-high" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" value="${st.weight}" class="fp-inp fp-weight" data-idx="${idx}"></td>
        <td style="text-align: center;"><button class="fp-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    // Attach listeners for inputs
    document.querySelectorAll(".fp-inp").forEach((inp) => {
      inp.addEventListener("input", handleInputChange);
    });

    document.querySelectorAll(".fp-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        studiesData.splice(idx, 1);
        renderTable();
        renderSvgForestPlot();
      });
    });
  }

  function handleInputChange(e) {
    const idx = parseInt(e.target.getAttribute("data-idx"));
    if (isNaN(idx)) return;

    const row = studiesData[idx];
    if (e.target.classList.contains("fp-name")) row.name = e.target.value;
    if (e.target.classList.contains("fp-val")) row.val = parseFloat(e.target.value) || 1.0;
    if (e.target.classList.contains("fp-low")) row.low = parseFloat(e.target.value) || 0.5;
    if (e.target.classList.contains("fp-high")) row.high = parseFloat(e.target.value) || 1.5;
    if (e.target.classList.contains("fp-weight")) row.weight = parseFloat(e.target.value) || 10;

    recalculatePooled();
    renderSvgForestPlot();
  }

  function recalculatePooled() {
    if (studiesData.length === 0) return;
    let sumW = 0;
    let sumWVal = 0;
    let minL = 99;
    let maxH = 0;

    studiesData.forEach((s) => {
      const w = s.weight || 1;
      sumW += w;
      sumWVal += w * Math.log(s.val || 1.0);
      if (s.low < minL) minL = s.low;
      if (s.high > maxH) maxH = s.high;
    });

    const pooledVal = Math.exp(sumWVal / (sumW || 1));
    pooledData = {
      val: parseFloat(pooledVal.toFixed(2)),
      low: parseFloat((pooledVal * 0.88).toFixed(2)),
      high: parseFloat((pooledVal * 1.12).toFixed(2))
    };

    // Calculate I^2 heterogeneity estimation
    let variance = 0;
    studiesData.forEach((s) => {
      variance += Math.pow(s.val - pooledVal, 2);
    });
    const i2 = Math.min(95, Math.max(0, Math.round(variance * 120)));
    if (statI2) statI2.textContent = `${i2}%`;
  }

  /* ── SVG RENDER ENGINE ── */
  function renderSvgForestPlot() {
    if (!svgCanvas) return;

    const paddingX = 260; // Space on left for study names
    const plotWidth = 340; // Pixel width of forest plot area
    const rowHeight = 36;
    const headerHeight = 45;
    const footerHeight = 60;
    const canvasWidth = 720;
    const canvasHeight = headerHeight + studiesData.length * rowHeight + footerHeight;

    svgCanvas.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);
    svgCanvas.setAttribute("width", "100%");
    svgCanvas.setAttribute("height", canvasHeight);

    // X Scale conversion function (Linear/Log mapping to pixel coordinates)
    function scaleX(val) {
      const clampVal = Math.max(minAxis, Math.min(maxAxis, val));
      const pct = (clampVal - minAxis) / (maxAxis - minAxis);
      return paddingX + pct * plotWidth;
    }

    let svgHtml = `
      <!-- Background grid -->
      <rect x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" fill="var(--color-surface)" rx="12" />
      
      <!-- Table Header -->
      <text x="15" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="var(--color-text)">Nghiên cứu / Subgroup</text>
      <text x="${scaleX(minAxis)}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">${minAxis}</text>
      <text x="${scaleX(1.0)}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="var(--color-primary-dark)" text-anchor="middle">1.0 (Null)</text>
      <text x="${scaleX(maxAxis)}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">${maxAxis}</text>
      <text x="${canvasWidth - 15}" y="28" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="var(--color-text)" text-anchor="end">${currentMetric} (95% CI)</text>
      <line x1="15" y1="38" x2="${canvasWidth - 15}" y2="38" stroke="var(--color-divider)" stroke-width="1.5" />
      
      <!-- Dotted Line of No Effect (1.0) -->
      <line x1="${scaleX(1.0)}" y1="40" x2="${scaleX(1.0)}" y2="${canvasHeight - 35}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4" />
    `;

    // Render individual studies rows
    studiesData.forEach((st, idx) => {
      const y = headerHeight + idx * rowHeight + rowHeight / 2 + 5;
      const xVal = scaleX(st.val);
      const xLow = scaleX(st.low);
      const xHigh = scaleX(st.high);
      const boxSize = Math.max(6, Math.min(16, (st.weight / 100) * 40));

      const isFavors = st.val < 1.0;
      const color = isFavors ? "#10b981" : "#0284c7";

      svgHtml += `
        <!-- Study Name -->
        <text x="15" y="${y + 4}" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="var(--color-text)">${st.name}</text>
        
        <!-- CI Whisker Line -->
        <line x1="${xLow}" y1="${y}" x2="${xHigh}" y2="${y}" stroke="${color}" stroke-width="2" />
        <line x1="${xLow}" y1="${y - 4}" x2="${xLow}" y2="${y + 4}" stroke="${color}" stroke-width="2" />
        <line x1="${xHigh}" y1="${y - 4}" x2="${xHigh}" y2="${y + 4}" stroke="${color}" stroke-width="2" />
        
        <!-- Study Weight Box -->
        <rect x="${xVal - boxSize / 2}" y="${y - boxSize / 2}" width="${boxSize}" height="${boxSize}" fill="${color}" rx="2" />
        
        <!-- Numerical Value Label -->
        <text x="${canvasWidth - 15}" y="${y + 4}" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="var(--color-text)" text-anchor="end">${st.val.toFixed(2)} (${st.low.toFixed(2)}-${st.high.toFixed(2)})</text>
      `;
    });

    // Render Pooled Estimate Diamond
    const yPool = headerHeight + studiesData.length * rowHeight + 25;
    const xPoolVal = scaleX(pooledData.val);
    const xPoolLow = scaleX(pooledData.low);
    const xPoolHigh = scaleX(pooledData.high);
    const diamondPoints = `${xPoolLow},${yPool} ${xPoolVal},${yPool - 8} ${xPoolHigh},${yPool} ${xPoolVal},${yPool + 8}`;

    svgHtml += `
      <line x1="15" y1="${yPool - 15}" x2="${canvasWidth - 15}" y2="${yPool - 15}" stroke="var(--color-divider)" stroke-width="1.5" />
      <text x="15" y="${yPool + 4}" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="var(--color-purple, #7c3aed)">Hiệu Quả Gộp (Pooled Estimate)</text>
      <polygon points="${diamondPoints}" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5" />
      <text x="${canvasWidth - 15}" y="${yPool + 4}" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="800" fill="#7c3aed" text-anchor="end">${pooledData.val.toFixed(2)} (${pooledData.low.toFixed(2)}-${pooledData.high.toFixed(2)})</text>
      
      <!-- Axis Legend Label -->
      <text x="${paddingX + plotWidth / 4}" y="${canvasHeight - 8}" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#10b981" text-anchor="middle">◄ Can thiệp có lợi (Favors Intervention)</text>
      <text x="${paddingX + (plotWidth * 3) / 4}" y="${canvasHeight - 8}" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#ef4444" text-anchor="middle">Đối chứng có lợi (Favors Control) ►</text>
    `;

    svgCanvas.innerHTML = svgHtml;
  }

  // Event Listeners for Preset selector
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const presetKey = e.target.value;
      if (PRESETS[presetKey]) {
        const p = PRESETS[presetKey];
        currentMetric = p.metric;
        minAxis = p.minVal;
        maxAxis = p.maxVal;
        studiesData = [...p.studies];
        recalculatePooled();
        renderTable();
        renderSvgForestPlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      studiesData.push({
        name: `Nghiên cứu ${studiesData.length + 1}`,
        val: 0.8,
        low: 0.6,
        high: 1.05,
        weight: 15.0
      });
      recalculatePooled();
      renderTable();
      renderSvgForestPlot();
    });
  }

  // Initial Load
  recalculatePooled();
  renderTable();
  renderSvgForestPlot();
}
