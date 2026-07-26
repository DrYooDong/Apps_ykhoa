/* ============================================================
   KAPLAN-MEIER SURVIVAL CURVE BUILDER (SVG ENGINE)
   Location: pages/Y học chứng cứ/EBM Lab/kaplan-meier.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initKaplanMeierBuilder();
});

const KM_PRESETS = {
  keynote: {
    title: "KEYNOTE-189 — Pembrolizumab + Hóa trị vs Giả dược (Ung Thư Phổi Kế Tế Bào Nhỏ)",
    groupA: "Pembrolizumab + Chemo",
    groupB: "Placebo + Chemo",
    hr: "0.49 (95% CI: 0.38 - 0.64)",
    pValue: "p < 0.0001",
    medianA: "22.0 tháng",
    medianB: "10.7 tháng",
    points: [
      { time: 0, nA: 410, eA: 0, nB: 206, eB: 0 },
      { time: 3, nA: 395, eA: 15, nB: 180, eB: 26 },
      { time: 6, nA: 360, eA: 30, nB: 142, eB: 35 },
      { time: 9, nA: 320, eA: 28, nB: 110, eB: 25 },
      { time: 12, nA: 285, eA: 22, nB: 85, eB: 18 },
      { time: 15, nA: 250, eA: 18, nB: 62, eB: 14 },
      { time: 18, nA: 220, eA: 15, nB: 45, eB: 10 },
      { time: 21, nA: 195, eA: 12, nB: 32, eB: 8 },
      { time: 24, nA: 170, eA: 10, nB: 20, eB: 5 }
    ]
  },

  empareg: {
    title: "EMPA-REG OUTCOME — Tử Vong Do Nguyên Nhân Tim Mạch (Empagliflozin vs Placebo)",
    groupA: "Empagliflozin",
    groupB: "Placebo",
    hr: "0.62 (95% CI: 0.49 - 0.77)",
    pValue: "p = 0.0001",
    medianA: "Chưa đạt (NR)",
    medianB: "Chưa đạt (NR)",
    points: [
      { time: 0, nA: 4687, eA: 0, nB: 2333, eB: 0 },
      { time: 6, nA: 4610, eA: 25, nB: 2270, eB: 32 },
      { time: 12, nA: 4520, eA: 35, nB: 2200, eB: 48 },
      { time: 18, nA: 4430, eA: 32, nB: 2130, eB: 42 },
      { time: 24, nA: 4340, eA: 28, nB: 2050, eB: 38 },
      { time: 30, nA: 4250, eA: 25, nB: 1970, eB: 35 },
      { time: 36, nA: 3050, eA: 20, nB: 1400, eB: 28 },
      { time: 42, nA: 1800, eA: 7, nB: 820, eB: 12 }
    ]
  },

  paradigm: {
    title: "PARADIGM-HF — Tiêu Chí Gộp Nhập Viện Do Suy Tim Hoặc Tử Vong TM",
    groupA: "LCZ696 (Sacubitril/Valsartan)",
    groupB: "Enalapril",
    hr: "0.80 (95% CI: 0.73 - 0.87)",
    pValue: "p < 0.0001",
    medianA: "27.2 tháng",
    medianB: "22.5 tháng",
    points: [
      { time: 0, nA: 4187, eA: 0, nB: 4212, eB: 0 },
      { time: 6, nA: 3980, eA: 120, nB: 3930, eB: 160 },
      { time: 12, nA: 3750, eA: 140, nB: 3640, eB: 190 },
      { time: 18, nA: 3520, eA: 130, nB: 3370, eB: 175 },
      { time: 24, nA: 3300, eA: 115, nB: 3100, eB: 155 },
      { time: 30, nA: 3080, eA: 105, nB: 2850, eB: 140 },
      { time: 36, nA: 2500, eA: 80, nB: 2280, eB: 110 }
    ]
  }
};

function initKaplanMeierBuilder() {
  let activePreset = KM_PRESETS.keynote;
  let kmData = [...activePreset.points];

  const tableBody = document.getElementById("km-table-body");
  const svgCanvas = document.getElementById("km-svg-canvas");
  const presetSelect = document.getElementById("km-preset-select");
  const btnAddRow = document.getElementById("km-btn-add-row");

  const statHr = document.getElementById("km-stat-hr");
  const statP = document.getElementById("km-stat-p");
  const statMedian = document.getElementById("km-stat-median");

  function calculateSurvival() {
    let survA = 1.0;
    let survB = 1.0;

    let resA = [];
    let resB = [];

    kmData.forEach((pt) => {
      if (pt.nA > 0 && pt.eA > 0) {
        survA = survA * (1 - pt.eA / pt.nA);
      }
      if (pt.nB > 0 && pt.eB > 0) {
        survB = survB * (1 - pt.eB / pt.nB);
      }
      resA.push({ time: pt.time, surv: Math.max(0, Math.min(1.0, survA)), n: pt.nA });
      resB.push({ time: pt.time, surv: Math.max(0, Math.min(1.0, survB)), n: pt.nB });
    });

    return { resA, resB };
  }

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    kmData.forEach((pt, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="number" step="1" value="${pt.time}" class="km-inp km-time" data-idx="${idx}"></td>
        <td><input type="number" step="1" value="${pt.nA}" class="km-inp km-na" data-idx="${idx}"></td>
        <td><input type="number" step="1" value="${pt.eA}" class="km-inp km-ea" data-idx="${idx}"></td>
        <td><input type="number" step="1" value="${pt.nB}" class="km-inp km-nb" data-idx="${idx}"></td>
        <td><input type="number" step="1" value="${pt.eB}" class="km-inp km-eb" data-idx="${idx}"></td>
        <td style="text-align: center;"><button class="km-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    document.querySelectorAll(".km-inp").forEach((inp) => {
      inp.addEventListener("input", handleInputChange);
    });

    document.querySelectorAll(".km-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        kmData.splice(idx, 1);
        renderTable();
        renderSvgKmPlot();
      });
    });
  }

  function handleInputChange(e) {
    const idx = parseInt(e.target.getAttribute("data-idx"));
    if (isNaN(idx)) return;

    const row = kmData[idx];
    if (e.target.classList.contains("km-time")) row.time = parseFloat(e.target.value) || 0;
    if (e.target.classList.contains("km-na")) row.nA = parseInt(e.target.value) || 0;
    if (e.target.classList.contains("km-ea")) row.eA = parseInt(e.target.value) || 0;
    if (e.target.classList.contains("km-nb")) row.nB = parseInt(e.target.value) || 0;
    if (e.target.classList.contains("km-eb")) row.eB = parseInt(e.target.value) || 0;

    renderSvgKmPlot();
  }

  function renderSvgKmPlot() {
    if (!svgCanvas) return;

    const { resA, resB } = calculateSurvival();
    const maxTime = Math.max(...kmData.map((d) => d.time), 12);

    const margin = { top: 40, right: 30, bottom: 100, left: 65 };
    const width = 720;
    const height = 440;
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    svgCanvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svgCanvas.setAttribute("width", "100%");
    svgCanvas.setAttribute("height", height);

    function scaleX(t) {
      return margin.left + (t / maxTime) * plotWidth;
    }

    function scaleY(s) {
      return margin.top + (1 - s) * plotHeight;
    }

    // Gridlines & Axes
    let svgHtml = `
      <rect x="0" y="0" width="${width}" height="${height}" fill="var(--color-surface)" rx="12" />
      
      <!-- Chart Title & Legend -->
      <text x="${margin.left}" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="800" fill="var(--color-text)">${activePreset.title}</text>
      
      <!-- Y-Axis Gridlines (0%, 25%, 50%, 75%, 100%) -->
    `;

    for (let p = 0; p <= 100; p += 25) {
      const y = scaleY(p / 100);
      svgHtml += `
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="var(--color-divider)" stroke-width="1" stroke-dasharray="3,3" />
        <text x="${margin.left - 10}" y="${y + 4}" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="var(--color-text-muted)" text-anchor="end">${p}%</text>
      `;
    }

    // X-Axis Labels
    const numTicks = 6;
    for (let i = 0; i <= numTicks; i++) {
      const t = Math.round((i / numTicks) * maxTime);
      const x = scaleX(t);
      svgHtml += `
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + plotHeight}" stroke="var(--color-divider)" stroke-width="1" stroke-dasharray="2,2" />
        <text x="${x}" y="${margin.top + plotHeight + 18}" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="var(--color-text)" text-anchor="middle">${t}</text>
      `;
    }

    // Axis Labels
    svgHtml += `
      <text x="${margin.left + plotWidth / 2}" y="${margin.top + plotHeight + 36}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">Mốc Thời Gian (Tháng)</text>
      <text x="20" y="${margin.top + plotHeight / 2}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle" transform="rotate(-90 20 ${margin.top + plotHeight / 2})">Xác Suất Sống Còn Tích Lũy S(t)</text>
      
      <!-- 50% Median Survival Line -->
      <line x1="${margin.left}" y1="${scaleY(0.5)}" x2="${width - margin.right}" y2="${scaleY(0.5)}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,4" />
      <text x="${width - margin.right - 5}" y="${scaleY(0.5) - 6}" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#f59e0b" text-anchor="end">Trung vị (50% Survival)</text>
    `;

    // Helper to generate Step Path String
    function generateStepPath(data) {
      if (data.length === 0) return "";
      let path = `M ${scaleX(data[0].time)} ${scaleY(1.0)}`;
      let currY = scaleY(1.0);

      for (let i = 0; i < data.length; i++) {
        const nextX = scaleX(data[i].time);
        const nextY = scaleY(data[i].surv);
        path += ` L ${nextX} ${currY} L ${nextX} ${nextY}`;
        currY = nextY;
      }
      path += ` L ${scaleX(maxTime)} ${currY}`;
      return path;
    }

    // Draw Curve A (Intervention - Purple/Blue)
    const pathA = generateStepPath(resA);
    svgHtml += `
      <path d="${pathA}" fill="none" stroke="#7c3aed" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    `;

    // Draw Curve B (Control - Red/Orange)
    const pathB = generateStepPath(resB);
    svgHtml += `
      <path d="${pathB}" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    `;

    // Draw Censored Points
    resA.forEach((pt) => {
      svgHtml += `<circle cx="${scaleX(pt.time)}" cy="${scaleY(pt.surv)}" r="3" fill="#7c3aed" />`;
    });
    resB.forEach((pt) => {
      svgHtml += `<circle cx="${scaleX(pt.time)}" cy="${scaleY(pt.surv)}" r="3" fill="#ef4444" />`;
    });

    // Draw Legends
    svgHtml += `
      <g transform="translate(${margin.left + 20}, ${margin.top + 15})">
        <rect x="0" y="0" width="220" height="50" fill="var(--color-surface)" stroke="var(--color-divider)" rx="8" opacity="0.9" />
        <line x1="12" y1="18" x2="35" y2="18" stroke="#7c3aed" stroke-width="3" />
        <text x="42" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#7c3aed">${activePreset.groupA}</text>
        
        <line x1="12" y1="36" x2="35" y2="36" stroke="#ef4444" stroke-width="3" />
        <text x="42" y="40" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#ef4444">${activePreset.groupB}</text>
      </g>
    `;

    // Render "Number at Risk" Table at the bottom
    const yRiskHeader = margin.top + plotHeight + 58;
    svgHtml += `
      <line x1="${margin.left - 50}" y1="${yRiskHeader - 12}" x2="${width - margin.right}" y2="${yRiskHeader - 12}" stroke="var(--color-divider)" stroke-width="1" />
      <text x="15" y="${yRiskHeader}" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#7c3aed">Number at risk (A)</text>
      <text x="15" y="${yRiskHeader + 16}" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#ef4444">Number at risk (B)</text>
    `;

    for (let i = 0; i <= numTicks; i++) {
      const t = Math.round((i / numTicks) * maxTime);
      const x = scaleX(t);
      const itemA = resA.reduce((prev, curr) => (curr.time <= t ? curr : prev), resA[0]);
      const itemB = resB.reduce((prev, curr) => (curr.time <= t ? curr : prev), resB[0]);

      svgHtml += `
        <text x="${x}" y="${yRiskHeader}" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="var(--color-text)" text-anchor="middle">${itemA ? itemA.n : 0}</text>
        <text x="${x}" y="${yRiskHeader + 16}" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="var(--color-text)" text-anchor="middle">${itemB ? itemB.n : 0}</text>
      `;
    }

    svgCanvas.innerHTML = svgHtml;

    // Update Stats Bar
    if (statHr) statHr.textContent = activePreset.hr;
    if (statP) statP.textContent = activePreset.pValue;
    if (statMedian) statMedian.textContent = `${activePreset.groupA}: ${activePreset.medianA} | ${activePreset.groupB}: ${activePreset.medianB}`;
  }

  // Presets selector event
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const presetKey = e.target.value;
      if (KM_PRESETS[presetKey]) {
        activePreset = KM_PRESETS[presetKey];
        kmData = [...activePreset.points];
        renderTable();
        renderSvgKmPlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      const lastTime = kmData.length > 0 ? kmData[kmData.length - 1].time + 3 : 0;
      kmData.push({ time: lastTime, nA: 100, eA: 5, nB: 100, eB: 10 });
      renderTable();
      renderSvgKmPlot();
    });
  }

  // Initial Load
  renderTable();
  renderSvgKmPlot();
}
