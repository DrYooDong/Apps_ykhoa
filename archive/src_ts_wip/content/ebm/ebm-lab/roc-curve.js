/* ============================================================
   ROC CURVE & AUC CALCULATOR (SVG ENGINE)
   Location: pages/Y học chứng cứ/EBM Lab/roc-curve.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initRocCurveBuilder();
});

const ROC_PRESETS = {
  troponin: {
    title: "hs-cTnI (High-Sensitivity Troponin I) — Chẩn Đoán Nhồi Máu Cơ Tim Cấp (AMI)",
    unit: "ng/L",
    aucCi: "0.94 (95% CI: 0.91 - 0.97)",
    points: [
      { cutoff: 2, sens: 99.0, spec: 45.0 },
      { cutoff: 6, sens: 96.0, spec: 72.0 },
      { cutoff: 14, sens: 88.0, spec: 90.0 }, // Optimal
      { cutoff: 28, sens: 78.0, spec: 96.0 },
      { cutoff: 50, sens: 65.0, spec: 98.5 },
      { cutoff: 100, sens: 48.0, spec: 99.5 }
    ]
  },

  ntprobnp: {
    title: "NT-proBNP — Chẩn Đoán Suy Tim Cấp Tại Khoa Cấp Cứu",
    unit: "pg/mL",
    aucCi: "0.91 (95% CI: 0.88 - 0.94)",
    points: [
      { cutoff: 100, sens: 98.0, spec: 50.0 },
      { cutoff: 300, sens: 93.0, spec: 76.0 },
      { cutoff: 450, sens: 89.0, spec: 86.0 }, // Optimal
      { cutoff: 900, sens: 78.0, spec: 93.0 },
      { cutoff: 1800, sens: 62.0, spec: 97.0 }
    ]
  },

  pct: {
    title: "Procalcitonin (PCT) — Phân Biệt Sepsis vs Phản Ứng Viêm Toàn Thân (SIRS)",
    unit: "ng/mL",
    aucCi: "0.88 (95% CI: 0.83 - 0.92)",
    points: [
      { cutoff: 0.1, sens: 97.0, spec: 40.0 },
      { cutoff: 0.25, sens: 91.0, spec: 68.0 },
      { cutoff: 0.5, sens: 84.0, spec: 82.0 }, // Optimal
      { cutoff: 2.0, sens: 70.0, spec: 92.0 },
      { cutoff: 10.0, sens: 45.0, spec: 98.0 }
    ]
  }
};

function initRocCurveBuilder() {
  let activePreset = ROC_PRESETS.troponin;
  let rocData = [...activePreset.points];

  const tableBody = document.getElementById("roc-table-body");
  const svgCanvas = document.getElementById("roc-svg-canvas");
  const presetSelect = document.getElementById("roc-preset-select");
  const btnAddRow = document.getElementById("roc-btn-add-row");

  const statAuc = document.getElementById("roc-stat-auc");
  const statCutoff = document.getElementById("roc-stat-cutoff");
  const statYouden = document.getElementById("roc-stat-youden");

  function processPoints() {
    // Sort points by 1 - Specificity ascending
    let sorted = [...rocData].map((p) => {
      const fpr = Math.max(0, Math.min(100, 100 - p.spec));
      const tpr = Math.max(0, Math.min(100, p.sens));
      const youden = tpr / 100 + p.spec / 100 - 1;
      return { ...p, fpr, tpr, youden };
    });

    sorted.sort((a, b) => a.fpr - b.fpr);

    // Add endpoint (0,0) and (100,100) for ROC curve completeness
    let fullPoints = [{ cutoff: "Min", sens: 0, spec: 100, fpr: 0, tpr: 0, youden: 0 }, ...sorted, { cutoff: "Max", sens: 100, spec: 0, fpr: 100, tpr: 100, youden: 0 }];

    // Calculate AUC using trapezoidal rule
    let auc = 0;
    for (let i = 0; i < fullPoints.length - 1; i++) {
      const x1 = fullPoints[i].fpr / 100;
      const x2 = fullPoints[i + 1].fpr / 100;
      const y1 = fullPoints[i].tpr / 100;
      const y2 = fullPoints[i + 1].tpr / 100;
      auc += ((y1 + y2) / 2) * (x2 - x1);
    }
    auc = Math.min(1.0, Math.max(0.5, auc));

    // Find optimal Youden index point
    let optPt = sorted.reduce((max, pt) => (pt.youden > max.youden ? pt : max), sorted[0] || fullPoints[0]);

    return { sorted, fullPoints, auc, optPt };
  }

  function renderTable() {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    rocData.forEach((pt, idx) => {
      const fpr = (100 - pt.spec).toFixed(1);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="number" step="0.1" value="${pt.cutoff}" class="roc-inp roc-cutoff" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" value="${pt.sens}" class="roc-inp roc-sens" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" value="${pt.spec}" class="roc-inp roc-spec" data-idx="${idx}"></td>
        <td><strong style="color: var(--color-text-muted);">${fpr}%</strong></td>
        <td style="text-align: center;"><button class="roc-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    document.querySelectorAll(".roc-inp").forEach((inp) => {
      inp.addEventListener("input", handleInputChange);
    });

    document.querySelectorAll(".roc-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        rocData.splice(idx, 1);
        renderTable();
        renderSvgRocPlot();
      });
    });
  }

  function handleInputChange(e) {
    const idx = parseInt(e.target.getAttribute("data-idx"));
    if (isNaN(idx)) return;

    const row = rocData[idx];
    if (e.target.classList.contains("roc-cutoff")) row.cutoff = parseFloat(e.target.value) || 0;
    if (e.target.classList.contains("roc-sens")) row.sens = parseFloat(e.target.value) || 0;
    if (e.target.classList.contains("roc-spec")) row.spec = parseFloat(e.target.value) || 0;

    renderSvgRocPlot();
  }

  function renderSvgRocPlot() {
    if (!svgCanvas) return;

    const { fullPoints, auc, optPt } = processPoints();

    const margin = { top: 40, right: 40, bottom: 65, left: 65 };
    const width = 560;
    const height = 500;
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    svgCanvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svgCanvas.setAttribute("width", "100%");
    svgCanvas.setAttribute("height", height);

    function scaleX(fpr) {
      return margin.left + (fpr / 100) * plotWidth;
    }

    function scaleY(tpr) {
      return margin.top + (1 - tpr / 100) * plotHeight;
    }

    // Canvas & Grid
    let svgHtml = `
      <rect x="0" y="0" width="${width}" height="${height}" fill="var(--color-surface)" rx="12" />
      <text x="${margin.left}" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="var(--color-text)">${activePreset.title}</text>
    `;

    // Grid lines (0 to 100%)
    for (let p = 0; p <= 100; p += 20) {
      const x = scaleX(p);
      const y = scaleY(p);

      svgHtml += `
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="var(--color-divider)" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="${x}" y1="${margin.top}" x2="${x}" y2="${margin.top + plotHeight}" stroke="var(--color-divider)" stroke-width="1" stroke-dasharray="3,3" />
        
        <text x="${margin.left - 10}" y="${y + 4}" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="var(--color-text-muted)" text-anchor="end">${p}%</text>
        <text x="${x}" y="${margin.top + plotHeight + 18}" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="var(--color-text-muted)" text-anchor="middle">${p}%</text>
      `;
    }

    // Axes Labels
    svgHtml += `
      <text x="${margin.left + plotWidth / 2}" y="${margin.top + plotHeight + 42}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">1 - Specificity (False Positive Rate %)</text>
      <text x="20" y="${margin.top + plotHeight / 2}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle" transform="rotate(-90 20 ${margin.top + plotHeight / 2})">Sensitivity (True Positive Rate %)</text>
      
      <!-- Diagonal Reference Line (Null AUC = 0.5) -->
      <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(100)}" y2="${scaleY(100)}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5,5" />
    `;

    // AUC Fill Polygon
    let polyPoints = `${scaleX(0)},${scaleY(0)}`;
    fullPoints.forEach((pt) => {
      polyPoints += ` ${scaleX(pt.fpr)},${scaleY(pt.tpr)}`;
    });
    polyPoints += ` ${scaleX(100)},${scaleY(0)}`;

    svgHtml += `
      <polygon points="${polyPoints}" fill="#06b6d4" opacity="0.18" />
    `;

    // ROC Line Path
    let pathD = `M ${scaleX(fullPoints[0].fpr)} ${scaleY(fullPoints[0].tpr)}`;
    for (let i = 1; i < fullPoints.length; i++) {
      pathD += ` L ${scaleX(fullPoints[i].fpr)} ${scaleY(fullPoints[i].tpr)}`;
    }

    svgHtml += `
      <path d="${pathD}" fill="none" stroke="#0891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    `;

    // Render Data Points
    fullPoints.forEach((pt) => {
      if (typeof pt.cutoff === "number") {
        svgHtml += `
          <circle cx="${scaleX(pt.fpr)}" cy="${scaleY(pt.tpr)}" r="4" fill="#0891b2" stroke="#ffffff" stroke-width="1.5" />
        `;
      }
    });

    // Render Optimal Cut-off Youden Point (Red Badge)
    if (optPt && typeof optPt.cutoff === "number") {
      const optX = scaleX(optPt.fpr);
      const optY = scaleY(optPt.tpr);
      svgHtml += `
        <circle cx="${optX}" cy="${optY}" r="8" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
        <circle cx="${optX}" cy="${optY}" r="12" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="2,2" />
        
        <!-- Callout Box -->
        <g transform="translate(${optX + 12}, ${optY - 25})">
          <rect x="0" y="0" width="135" height="36" fill="#7c3aed" rx="6" />
          <text x="8" y="15" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#ffffff">Ngưỡng: ${optPt.cutoff} ${activePreset.unit}</text>
          <text x="8" y="28" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#e0e7ff">Se: ${optPt.sens}% | Sp: ${optPt.spec}%</text>
        </g>
      `;
    }

    // Legend Badge inside Canvas
    svgHtml += `
      <g transform="translate(${margin.left + plotWidth - 140}, ${margin.top + plotHeight - 50})">
        <rect x="0" y="0" width="130" height="40" fill="var(--color-surface)" stroke="var(--color-divider)" rx="8" />
        <text x="12" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="var(--color-text-muted)">Diện tích AUC:</text>
        <text x="12" y="32" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="800" fill="#0891b2">${auc.toFixed(2)}</text>
      </g>
    `;

    svgCanvas.innerHTML = svgHtml;

    // Update Stats Bar
    if (statAuc) statAuc.textContent = `${auc.toFixed(2)} (${activePreset.aucCi})`;
    if (statCutoff) statCutoff.textContent = optPt ? `> ${optPt.cutoff} ${activePreset.unit}` : "N/A";
    if (statYouden) statYouden.textContent = optPt ? `${optPt.youden.toFixed(2)} (Se: ${optPt.sens}%, Sp: ${optPt.spec}%)` : "N/A";
  }

  // Preset Event
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const presetKey = e.target.value;
      if (ROC_PRESETS[presetKey]) {
        activePreset = ROC_PRESETS[presetKey];
        rocData = [...activePreset.points];
        renderTable();
        renderSvgRocPlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      rocData.push({ cutoff: 15, sens: 80.0, spec: 85.0 });
      renderTable();
      renderSvgRocPlot();
    });
  }

  // Initial Load
  renderTable();
  renderSvgRocPlot();
}
