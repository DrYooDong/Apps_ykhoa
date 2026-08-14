/**
 * Interactive Kaplan-Meier Survival Curve Builder (kaplan-meier.ts)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * SVG Engine vẽ đường cong sống còn Kaplan-Meier & Bảng Number at Risk
 */

export interface KMDataPoint {
  time: number;
  nA: number;
  eA: number;
  nB: number;
  eB: number;
}

export interface KMPreset {
  title: string;
  groupA: string;
  groupB: string;
  hr: string;
  pValue: string;
  medianA: string;
  medianB: string;
  points: KMDataPoint[];
}

export const KM_PRESETS: Record<string, KMPreset> = {
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

export function initKaplanMeierBuilder(): void {
  let activePreset = KM_PRESETS.keynote;
  let kmData: KMDataPoint[] = JSON.parse(JSON.stringify(activePreset.points));

  const tableBody = document.getElementById("km-table-body");
  const svgCanvas = document.getElementById("km-svg-canvas") as SVGSVGElement | null;
  const presetSelect = document.getElementById("km-preset-select") as HTMLSelectElement | null;
  const btnAddRow = document.getElementById("km-btn-add-row");

  const statHr = document.getElementById("km-stat-hr");
  const statP = document.getElementById("km-stat-p");
  const statMedian = document.getElementById("km-stat-median");

  function calculateSurvival(): { resA: { time: number; surv: number; n: number }[]; resB: { time: number; surv: number; n: number }[] } {
    let survA = 1.0;
    let survB = 1.0;
    const resA: { time: number; surv: number; n: number }[] = [];
    const resB: { time: number; surv: number; n: number }[] = [];

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

  function renderTable(): void {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    kmData.forEach((pt, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="number" value="${pt.time}" class="km-inp km-time" data-idx="${idx}"></td>
        <td><input type="number" value="${pt.nA}" class="km-inp km-na" data-idx="${idx}"></td>
        <td><input type="number" value="${pt.eA}" class="km-inp km-ea" data-idx="${idx}"></td>
        <td><input type="number" value="${pt.nB}" class="km-inp km-nb" data-idx="${idx}"></td>
        <td><input type="number" value="${pt.eB}" class="km-inp km-eb" data-idx="${idx}"></td>
        <td style="text-align: center;"><button class="km-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll(".km-inp").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        if (target.classList.contains("km-time")) kmData[idx].time = parseFloat(target.value) || 0;
        if (target.classList.contains("km-na")) kmData[idx].nA = parseInt(target.value, 10) || 0;
        if (target.classList.contains("km-ea")) kmData[idx].eA = parseInt(target.value, 10) || 0;
        if (target.classList.contains("km-nb")) kmData[idx].nB = parseInt(target.value, 10) || 0;
        if (target.classList.contains("km-eb")) kmData[idx].eB = parseInt(target.value, 10) || 0;
        updatePlot();
      });
    });

    tableBody.querySelectorAll(".km-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        kmData.splice(idx, 1);
        renderTable();
        updatePlot();
      });
    });
  }

  function renderSvgCurve(): void {
    if (!svgCanvas) return;
    svgCanvas.innerHTML = "";

    const W = 720;
    const H = 450;
    const padding = { top: 40, right: 30, bottom: 90, left: 60 };

    const maxTime = kmData[kmData.length - 1]?.time || 24;

    function getX(t: number): number {
      return padding.left + (t / (maxTime || 1)) * (W - padding.left - padding.right);
    }

    function getY(s: number): number {
      return padding.top + (1 - s) * (H - padding.top - padding.bottom);
    }

    const ns = "http://www.w3.org/2000/svg";
    const { resA, resB } = calculateSurvival();

    // Draw Stepped Lines (Group A: Teal #0d9488, Group B: Slate #64748b)
    const drawStep = (res: { time: number; surv: number }[], color: string, strokeWidth = "2.5") => {
      let pathStr = "";
      res.forEach((pt, i) => {
        const x = getX(pt.time);
        const y = getY(pt.surv);
        if (i === 0) {
          pathStr += `M ${x} ${y}`;
        } else {
          const prevY = getY(res[i - 1].surv);
          pathStr += ` L ${x} ${prevY} L ${x} ${y}`;
        }
      });

      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", pathStr);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", strokeWidth);
      svgCanvas.appendChild(path);
    };

    drawStep(resA, "#0284c7", "3");
    drawStep(resB, "#dc2626", "2.5");
  }

  function updatePlot(): void {
    if (statHr) statHr.innerText = activePreset.hr;
    if (statP) statP.innerText = activePreset.pValue;
    if (statMedian) statMedian.innerText = `${activePreset.medianA} vs ${activePreset.medianB}`;
    renderSvgCurve();
  }

  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const val = (e.target as HTMLSelectElement).value;
      if (KM_PRESETS[val]) {
        activePreset = KM_PRESETS[val];
        kmData = JSON.parse(JSON.stringify(activePreset.points));
        renderTable();
        updatePlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      const lastTime = kmData[kmData.length - 1]?.time || 0;
      kmData.push({
        time: lastTime + 6,
        nA: 100,
        eA: 5,
        nB: 100,
        eB: 8
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
    document.addEventListener('DOMContentLoaded', initKaplanMeierBuilder);
  } else {
    initKaplanMeierBuilder();
  }
}
