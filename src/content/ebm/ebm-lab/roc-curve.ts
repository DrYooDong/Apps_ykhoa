/**
 * Interactive ROC Curve & AUC Calculator (roc-curve.ts)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * SVG Engine vẽ ROC Curve, tính AUC và điểm cắt tối ưu Youden Index
 */

export interface RocDataPoint {
  cutoff: number | string;
  sens: number;
  spec: number;
}

export interface RocPreset {
  title: string;
  unit: string;
  aucCi: string;
  points: RocDataPoint[];
}

export const ROC_PRESETS: Record<string, RocPreset> = {
  troponin: {
    title: "hs-cTnI (High-Sensitivity Troponin I) — Chẩn Đoán Nhồi Máu Cơ Tim Cấp (AMI)",
    unit: "ng/L",
    aucCi: "0.94 (95% CI: 0.91 - 0.97)",
    points: [
      { cutoff: 2, sens: 99.0, spec: 45.0 },
      { cutoff: 6, sens: 96.0, spec: 72.0 },
      { cutoff: 14, sens: 88.0, spec: 90.0 },
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
      { cutoff: 450, sens: 89.0, spec: 86.0 },
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
      { cutoff: 0.5, sens: 84.0, spec: 82.0 },
      { cutoff: 2.0, sens: 70.0, spec: 92.0 },
      { cutoff: 10.0, sens: 45.0, spec: 98.0 }
    ]
  }
};

export function initRocCurveBuilder(): void {
  let activePreset = ROC_PRESETS.troponin;
  let rocData: RocDataPoint[] = JSON.parse(JSON.stringify(activePreset.points));

  const tableBody = document.getElementById("roc-table-body");
  const svgCanvas = document.getElementById("roc-svg-canvas") as SVGSVGElement | null;
  const presetSelect = document.getElementById("roc-preset-select") as HTMLSelectElement | null;
  const btnAddRow = document.getElementById("roc-btn-add-row");

  const statAuc = document.getElementById("roc-stat-auc");
  const statCutoff = document.getElementById("roc-stat-cutoff");
  const statYouden = document.getElementById("roc-stat-youden");

  function processPoints() {
    const sorted = rocData.map((p) => {
      const fpr = Math.max(0, Math.min(100, 100 - p.spec));
      const tpr = Math.max(0, Math.min(100, p.sens));
      const youden = tpr / 100 + p.spec / 100 - 1;
      return { ...p, fpr, tpr, youden };
    });

    sorted.sort((a, b) => a.fpr - b.fpr);

    const fullPoints = [
      { cutoff: "Min", sens: 0, spec: 100, fpr: 0, tpr: 0, youden: 0 },
      ...sorted,
      { cutoff: "Max", sens: 100, spec: 0, fpr: 100, tpr: 100, youden: 0 }
    ];

    let auc = 0;
    for (let i = 0; i < fullPoints.length - 1; i++) {
      const x1 = fullPoints[i].fpr / 100;
      const x2 = fullPoints[i + 1].fpr / 100;
      const y1 = fullPoints[i].tpr / 100;
      const y2 = fullPoints[i + 1].tpr / 100;
      auc += ((y1 + y2) / 2) * (x2 - x1);
    }
    auc = Math.min(1.0, Math.max(0.5, auc));

    const optPt = sorted.reduce((max, pt) => (pt.youden > max.youden ? pt : max), sorted[0] || fullPoints[0]);

    return { sorted, fullPoints, auc, optPt };
  }

  function renderTable(): void {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    rocData.forEach((pt, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="number" step="any" value="${pt.cutoff}" class="roc-inp roc-cutoff" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" min="0" max="100" value="${pt.sens}" class="roc-inp roc-sens" data-idx="${idx}"></td>
        <td><input type="number" step="0.1" min="0" max="100" value="${pt.spec}" class="roc-inp roc-spec" data-idx="${idx}"></td>
        <td style="text-align: center;"><button class="roc-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll(".roc-inp").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        if (target.classList.contains("roc-cutoff")) rocData[idx].cutoff = parseFloat(target.value) || 0;
        if (target.classList.contains("roc-sens")) rocData[idx].sens = parseFloat(target.value) || 0;
        if (target.classList.contains("roc-spec")) rocData[idx].spec = parseFloat(target.value) || 0;
        updatePlot();
      });
    });

    tableBody.querySelectorAll(".roc-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        rocData.splice(idx, 1);
        renderTable();
        updatePlot();
      });
    });
  }

  function renderSvgRoc(): void {
    if (!svgCanvas) return;
    svgCanvas.innerHTML = "";

    const W = 460;
    const H = 460;
    const padding = { top: 30, right: 30, bottom: 60, left: 60 };

    function getX(fpr: number): number {
      return padding.left + (fpr / 100) * (W - padding.left - padding.right);
    }

    function getY(tpr: number): number {
      return padding.top + (1 - tpr / 100) * (H - padding.top - padding.bottom);
    }

    const ns = "http://www.w3.org/2000/svg";
    const { sorted, fullPoints, optPt } = processPoints();

    // Draw Diagonal (Chance line)
    const diag = document.createElementNS(ns, "line");
    diag.setAttribute("x1", `${getX(0)}`);
    diag.setAttribute("y1", `${getY(0)}`);
    diag.setAttribute("x2", `${getX(100)}`);
    diag.setAttribute("y2", `${getY(100)}`);
    diag.setAttribute("stroke", "#94a3b8");
    diag.setAttribute("stroke-dasharray", "4,4");
    svgCanvas.appendChild(diag);

    // Draw ROC Path
    let pathD = "";
    fullPoints.forEach((p, i) => {
      const x = getX(p.fpr);
      const y = getY(p.tpr);
      pathD += (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`);
    });

    const rocPath = document.createElementNS(ns, "path");
    rocPath.setAttribute("d", pathD);
    rocPath.setAttribute("fill", "none");
    rocPath.setAttribute("stroke", "#0284c7");
    rocPath.setAttribute("stroke-width", "3");
    svgCanvas.appendChild(rocPath);

    // Draw Points
    sorted.forEach((p) => {
      const isOpt = (p === optPt);
      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("cx", `${getX(p.fpr)}`);
      circle.setAttribute("cy", `${getY(p.tpr)}`);
      circle.setAttribute("r", isOpt ? "7" : "5");
      circle.setAttribute("fill", isOpt ? "#dc2626" : "#0284c7");
      circle.setAttribute("stroke", "#ffffff");
      circle.setAttribute("stroke-width", "2");
      svgCanvas.appendChild(circle);
    });
  }

  function updatePlot(): void {
    const { auc, optPt } = processPoints();
    if (statAuc) statAuc.innerText = `AUC = ${auc.toFixed(2)}`;
    if (statCutoff) statCutoff.innerText = optPt ? `${optPt.cutoff} ${activePreset.unit}` : "-";
    if (statYouden) statYouden.innerText = optPt ? `J = ${optPt.youden.toFixed(2)} (Se ${optPt.sens}%, Sp ${optPt.spec}%)` : "-";
    renderSvgRoc();
  }

  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const val = (e.target as HTMLSelectElement).value;
      if (ROC_PRESETS[val]) {
        activePreset = ROC_PRESETS[val];
        rocData = JSON.parse(JSON.stringify(activePreset.points));
        renderTable();
        updatePlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      rocData.push({
        cutoff: 50,
        sens: 80,
        spec: 85
      });
      renderTable();
      updatePlot();
    });
  }

  renderTable();
  updatePlot();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRocCurveBuilder);
  } else {
    initRocCurveBuilder();
  }
}
