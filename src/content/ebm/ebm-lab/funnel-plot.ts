/**
 * Interactive Funnel Plot Builder (funnel-plot.ts)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * SVG Engine vẽ Funnel Plot đánh giá publication bias & Egger test
 */

export interface FunnelStudyItem {
  name: string;
  val: number;
  se: number;
}

export interface FunnelPreset {
  title: string;
  biasRisk: string;
  biasText: string;
  eggerP: string;
  studies: FunnelStudyItem[];
}

export const FUNNEL_PRESETS: Record<string, FunnelPreset> = {
  doac: {
    title: "DOACs vs Warfarin — Phân Tích Gộp Thử Nghiệm Lâm Sàng Đột Quỵ AF",
    biasRisk: "Low Risk",
    biasText: "Thấp (Phễu cân bằng đối xứng)",
    eggerP: "p = 0.58",
    studies: [
      { name: "RE-LY (Dabigatran 150mg)", val: 0.66, se: 0.11 },
      { name: "ROCKET AF (Rivaroxaban)", val: 0.79, se: 0.10 },
      { name: "ARISTOTLE (Apixaban)", val: 0.79, se: 0.09 },
      { name: "ENGAGE AF (Edoxaban 60mg)", val: 0.79, se: 0.12 },
      { name: "AVERROES (Apixaban vs ASA)", val: 0.45, se: 0.16 },
      { name: "J-ROCKET AF (Nhật Bản)", val: 0.85, se: 0.28 },
      { name: "PETRO Study", val: 0.70, se: 0.32 },
      { name: "EMBRACE Trial", val: 0.82, se: 0.25 }
    ]
  },
  herbal: {
    title: "Thử Nghiệm YHCT Kết Hợp Trong Hỗ Trợ Tăng Huyết Áp",
    biasRisk: "High Risk",
    biasText: "Cao (Phễu bị lệch nghiêng - Thiếu nghiên cứu nhỏ âm tính)",
    eggerP: "p = 0.015",
    studies: [
      { name: "Nghiên cứu Trung tâm A (Lớn)", val: 0.88, se: 0.10 },
      { name: "Nghiên cứu Trung tâm B", val: 0.80, se: 0.14 },
      { name: "Nghiên cứu Cỡ Nhỏ 1", val: 0.55, se: 0.35 },
      { name: "Nghiên cứu Cỡ Nhỏ 2", val: 0.48, se: 0.38 },
      { name: "Nghiên cứu Cỡ Nhỏ 3", val: 0.50, se: 0.40 },
      { name: "Nghiên cứu Cỡ Nhỏ 4", val: 0.42, se: 0.42 }
    ]
  },
  statin: {
    title: "Statin Trong Phòng Ngừa Đột Quỵ Thứ Phát",
    biasRisk: "Low Risk",
    biasText: "Thấp (Phễu đối xứng chuẩn)",
    eggerP: "p = 0.72",
    studies: [
      { name: "SPARCL Trial", val: 0.84, se: 0.08 },
      { name: "HPS Study", val: 0.78, se: 0.09 },
      { name: "LIPID Study", val: 0.81, se: 0.11 },
      { name: "CARE Trial", val: 0.86, se: 0.12 },
      { name: "4S Trial", val: 0.72, se: 0.14 },
      { name: "ASCOT-LLA", val: 0.73, se: 0.18 },
      { name: "CARDS Study", val: 0.79, se: 0.22 },
      { name: "PROSPER Trial", val: 0.90, se: 0.16 }
    ]
  }
};

export function initFunnelPlotBuilder(): void {
  let activePreset = FUNNEL_PRESETS.doac;
  let studiesData: FunnelStudyItem[] = JSON.parse(JSON.stringify(activePreset.studies));

  const tableBody = document.getElementById("fn-table-body");
  const svgCanvas = document.getElementById("fn-svg-canvas") as unknown as SVGSVGElement | null;
  const presetSelect = document.getElementById("fn-preset-select") as HTMLSelectElement | null;
  const btnAddRow = document.getElementById("fn-btn-add-row");

  const statPooled = document.getElementById("fn-stat-pooled");
  const statEgger = document.getElementById("fn-stat-egger");
  const statBias = document.getElementById("fn-stat-bias");

  function calculatePooledEffect(): number {
    if (studiesData.length === 0) return 1.0;
    let sumW = 0;
    let sumWLogVal = 0;

    studiesData.forEach((s) => {
      const se = s.se || 0.1;
      const w = 1 / (se * se);
      sumW += w;
      sumWLogVal += w * Math.log(s.val || 1.0);
    });

    return Math.exp(sumWLogVal / (sumW || 1));
  }

  function renderTable(): void {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    studiesData.forEach((st, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" value="${st.name}" class="fn-inp fn-name" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.val}" class="fn-inp fn-val" data-idx="${idx}"></td>
        <td><input type="number" step="0.01" value="${st.se}" class="fn-inp fn-se" data-idx="${idx}"></td>
        <td style="text-align: center;"><button class="fn-btn-del" data-idx="${idx}">&times;</button></td>
      `;
      tableBody.appendChild(tr);
    });

    tableBody.querySelectorAll(".fn-inp").forEach((inp) => {
      inp.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        if (target.classList.contains("fn-name")) studiesData[idx].name = target.value;
        if (target.classList.contains("fn-val")) studiesData[idx].val = parseFloat(target.value) || 1.0;
        if (target.classList.contains("fn-se")) studiesData[idx].se = parseFloat(target.value) || 0.1;
        updatePlot();
      });
    });

    tableBody.querySelectorAll(".fn-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        studiesData.splice(idx, 1);
        renderTable();
        updatePlot();
      });
    });
  }

  function renderSvgFunnel(): void {
    if (!svgCanvas) return;
    svgCanvas.innerHTML = "";

    const W = 680;
    const H = 420;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };

    const minX = 0.2;
    const maxX = 2.0;
    const maxSE = 0.55;

    const pooledVal = calculatePooledEffect();
    const logMinX = Math.log(minX);
    const logMaxX = Math.log(maxX);
    const logPooled = Math.log(pooledVal);

    function getX(val: number): number {
      const logV = Math.log(Math.max(minX, Math.min(maxX, val)));
      return padding.left + ((logV - logMinX) / (logMaxX - logMinX)) * (W - padding.left - padding.right);
    }

    function getY(se: number): number {
      return padding.top + (se / maxSE) * (H - padding.top - padding.bottom);
    }

    const ns = "http://www.w3.org/2000/svg";

    // Pseudo 95% Confidence Funnel (Triangle/Cone)
    const apexX = getX(pooledVal);
    const apexY = getY(0);
    const left95X = getX(Math.exp(logPooled - 1.96 * maxSE));
    const right95X = getX(Math.exp(logPooled + 1.96 * maxSE));
    const bottomY = getY(maxSE);

    const funnel95 = document.createElementNS(ns, "polygon");
    funnel95.setAttribute("points", `${apexX},${apexY} ${right95X},${bottomY} ${left95X},${bottomY}`);
    funnel95.setAttribute("fill", "rgba(2, 132, 199, 0.08)");
    funnel95.setAttribute("stroke", "rgba(2, 132, 199, 0.4)");
    funnel95.setAttribute("stroke-dasharray", "4,4");
    svgCanvas.appendChild(funnel95);

    // Pooled Vertical Line
    const centerLine = document.createElementNS(ns, "line");
    centerLine.setAttribute("x1", `${apexX}`);
    centerLine.setAttribute("y1", `${padding.top}`);
    centerLine.setAttribute("x2", `${apexX}`);
    centerLine.setAttribute("y2", `${H - padding.bottom}`);
    centerLine.setAttribute("stroke", "#0284c7");
    centerLine.setAttribute("stroke-width", "2");
    svgCanvas.appendChild(centerLine);

    // Null line at 1.0
    const nullX = getX(1.0);
    const nullLine = document.createElementNS(ns, "line");
    nullLine.setAttribute("x1", `${nullX}`);
    nullLine.setAttribute("y1", `${padding.top}`);
    nullLine.setAttribute("x2", `${nullX}`);
    nullLine.setAttribute("y2", `${H - padding.bottom}`);
    nullLine.setAttribute("stroke", "#94a3b8");
    nullLine.setAttribute("stroke-dasharray", "3,3");
    svgCanvas.appendChild(nullLine);

    // Studies Points
    studiesData.forEach((st) => {
      const cx = getX(st.val);
      const cy = getY(st.se);

      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("cx", `${cx}`);
      circle.setAttribute("cy", `${cy}`);
      circle.setAttribute("r", "6");
      circle.setAttribute("fill", "#0284c7");
      circle.setAttribute("stroke", "#ffffff");
      circle.setAttribute("stroke-width", "2");
      svgCanvas.appendChild(circle);
    });
  }

  function updatePlot(): void {
    const pooled = calculatePooledEffect();
    if (statPooled) statPooled.innerText = `RR/HR = ${pooled.toFixed(2)}`;
    if (statEgger) statEgger.innerText = activePreset.eggerP;
    if (statBias) statBias.innerText = activePreset.biasText;
    renderSvgFunnel();
  }

  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const val = (e.target as HTMLSelectElement).value;
      if (FUNNEL_PRESETS[val]) {
        activePreset = FUNNEL_PRESETS[val];
        studiesData = JSON.parse(JSON.stringify(activePreset.studies));
        renderTable();
        updatePlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      studiesData.push({
        name: `Nghiên cứu mới ${studiesData.length + 1}`,
        val: 0.75,
        se: 0.20
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
    document.addEventListener('DOMContentLoaded', initFunnelPlotBuilder);
  } else {
    initFunnelPlotBuilder();
  }
}
