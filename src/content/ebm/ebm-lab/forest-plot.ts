/**
 * Interactive Forest Plot Builder (forest-plot.ts)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * SVG Engine vẽ Forest Plot đa tầng (Hard, Composite, Surrogate, Safety)
 */

export interface StudyItem {
  category: 'primary' | 'composite' | 'surrogate' | 'safety' | 'subgroup' | string;
  name: string;
  val: number;
  low: number;
  high: number;
  weight: number;
}

export interface PooledResult {
  val: number;
  low: number;
  high: number;
}

export interface PresetDataset {
  title: string;
  subtitle: string;
  metricMode: 'ratio' | 'difference';
  metric: string;
  nullVal: number;
  minVal: number;
  maxVal: number;
  studies: StudyItem[];
  pooled: PooledResult;
}

export const PRESETS: Record<string, PresetDataset> = {
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

export const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  primary: { label: "🎯 Primary Hard Outcomes", color: "#166534" },
  composite: { label: "🧩 Composite Outcomes", color: "#6b21a8" },
  surrogate: { label: "🧪 Surrogate Endpoints", color: "#075985" },
  safety: { label: "⚠️ Safety Endpoints", color: "#92400e" },
  subgroup: { label: "📊 Subgroup Analysis", color: "#0369a1" }
};

export function initForestPlotBuilder(): void {
  let metricMode: 'ratio' | 'difference' = "ratio";
  let currentMetric = "HR";
  let nullVal = 1.0;
  let studiesData: StudyItem[] = [];
  let pooledData: PooledResult = { val: 1.0, low: 1.0, high: 1.0 };
  let minAxis = 0.3;
  let maxAxis = 1.8;

  const passedDataStr = sessionStorage.getItem("forestPlotData");
  let currentActiveTrial: PresetDataset = PRESETS.multi_tier_ada;

  if (passedDataStr) {
    try {
      const parsed = JSON.parse(passedDataStr);
      if (parsed.studies && parsed.studies.length) {
        currentActiveTrial = parsed;
      }
    } catch (e) {
      console.warn("Could not parse forestPlotData from sessionStorage", e);
    }
  }

  const loadDataset = (ds: PresetDataset) => {
    metricMode = ds.metricMode;
    currentMetric = ds.metric;
    nullVal = ds.nullVal;
    minAxis = ds.minVal;
    maxAxis = ds.maxVal;
    studiesData = JSON.parse(JSON.stringify(ds.studies));
    pooledData = JSON.parse(JSON.stringify(ds.pooled));

    const titleEl = document.getElementById("plot-title-display");
    const subEl = document.getElementById("plot-subtitle-display");
    if (titleEl) titleEl.innerText = ds.title;
    if (subEl) subEl.innerText = ds.subtitle;

    const metricSelect = document.getElementById("metric-select") as HTMLSelectElement | null;
    if (metricSelect) metricSelect.value = ds.metric;
  };

  loadDataset(currentActiveTrial);

  const tableBody = document.getElementById("studies-table-body");
  const svgCanvas = document.getElementById("forest-svg") as unknown as SVGSVGElement | null;

  const recalculatePooled = () => {
    if (!studiesData.length) return;
    let sumWeight = 0;
    let sumValWeighted = 0;

    studiesData.forEach((s) => {
      const w = s.weight || 10;
      sumWeight += w;
      sumValWeighted += (metricMode === "ratio" ? Math.log(s.val) : s.val) * w;
    });

    if (sumWeight > 0) {
      const pooledMean = sumValWeighted / sumWeight;
      pooledData.val = metricMode === "ratio" ? parseFloat(Math.exp(pooledMean).toFixed(2)) : parseFloat(pooledMean.toFixed(2));
      const se = 0.06;
      pooledData.low = metricMode === "ratio" ? parseFloat(Math.exp(pooledMean - 1.96 * se).toFixed(2)) : parseFloat((pooledMean - 1.96 * se).toFixed(2));
      pooledData.high = metricMode === "ratio" ? parseFloat(Math.exp(pooledMean + 1.96 * se).toFixed(2)) : parseFloat((pooledMean + 1.96 * se).toFixed(2));
    }
  };

  const valToX = (val: number, width: number, leftMargin: number, plotWidth: number): number => {
    if (metricMode === "ratio") {
      const logMin = Math.log(minAxis);
      const logMax = Math.log(maxAxis);
      const logVal = Math.log(Math.max(minAxis, Math.min(maxAxis, val)));
      return leftMargin + ((logVal - logMin) / (logMax - logMin)) * plotWidth;
    } else {
      return leftMargin + ((val - minAxis) / (maxAxis - minAxis)) * plotWidth;
    }
  };

  const renderSvgForestPlot = () => {
    if (!svgCanvas) return;
    svgCanvas.innerHTML = "";

    const svgWidth = 840;
    const rowHeight = 36;
    const headerHeight = 70;
    const footerHeight = 100;
    const totalHeight = headerHeight + studiesData.length * rowHeight + footerHeight;

    svgCanvas.setAttribute("viewBox", `0 0 ${svgWidth} ${totalHeight}`);
    svgCanvas.setAttribute("width", "100%");
    svgCanvas.setAttribute("height", `${totalHeight}`);

    const leftColWidth = 280;
    const plotWidth = 360;
    const rightColWidth = 180;
    const plotLeft = leftColWidth;

    const ns = "http://www.w3.org/2000/svg";

    // Draw Background
    const bg = document.createElementNS(ns, "rect");
    bg.setAttribute("width", "100%");
    bg.setAttribute("height", "100%");
    bg.setAttribute("fill", "var(--color-surface, #ffffff)");
    svgCanvas.appendChild(bg);

    // Headers
    const addText = (txt: string, x: number, y: number, fw = "bold", fs = "12", fill = "var(--color-text, #1e293b)", anchor = "start") => {
      const t = document.createElementNS(ns, "text");
      t.setAttribute("x", `${x}`);
      t.setAttribute("y", `${y}`);
      t.setAttribute("font-weight", fw);
      t.setAttribute("font-size", fs);
      t.setAttribute("fill", fill);
      t.setAttribute("text-anchor", anchor);
      t.setAttribute("font-family", "'Plus Jakarta Sans', sans-serif");
      t.textContent = txt;
      svgCanvas.appendChild(t);
      return t;
    };

    addText("Tiêu Chí Kết Cục / Nghiên Cứu", 15, 40, "800", "13");
    addText(`Hiệu Quả Can Thiệp (${currentMetric} & 95% CI)`, plotLeft + plotWidth / 2, 25, "800", "13", "var(--color-text)", "middle");
    addText(`Trọng Số & ${currentMetric} [95% CI]`, svgWidth - 15, 40, "800", "13", "var(--color-text)", "end");

    // Sub-labels on Plot
    addText("← Ưu thế Can Thiệp", plotLeft + 10, 48, "600", "10", "#16a34a", "start");
    addText("Ưu thế Chứng / Placebo →", plotLeft + plotWidth - 10, 48, "600", "10", "#dc2626", "end");

    // Null Line
    const nullX = valToX(nullVal, svgWidth, plotLeft, plotWidth);
    const nullLine = document.createElementNS(ns, "line");
    nullLine.setAttribute("x1", `${nullX}`);
    nullLine.setAttribute("y1", `${headerHeight - 10}`);
    nullLine.setAttribute("x2", `${nullX}`);
    nullLine.setAttribute("y2", `${totalHeight - footerHeight + 15}`);
    nullLine.setAttribute("stroke", "#94a3b8");
    nullLine.setAttribute("stroke-width", "1.5");
    nullLine.setAttribute("stroke-dasharray", "4,4");
    svgCanvas.appendChild(nullLine);

    // Rows
    studiesData.forEach((s, idx) => {
      const y = headerHeight + idx * rowHeight + 20;

      // Row background
      if (idx % 2 === 1) {
        const rowBg = document.createElementNS(ns, "rect");
        rowBg.setAttribute("x", "5");
        rowBg.setAttribute("y", `${y - 18}`);
        rowBg.setAttribute("width", `${svgWidth - 10}`);
        rowBg.setAttribute("height", `${rowHeight}`);
        rowBg.setAttribute("fill", "var(--color-surface-2, rgba(241, 245, 249, 0.5))");
        rowBg.setAttribute("rx", "4");
        svgCanvas.appendChild(rowBg);
      }

      // Name & category badge
      const cat = CATEGORY_MAP[s.category] || CATEGORY_MAP.primary;
      const tName = addText(s.name, 15, y, "600", "11", "var(--color-text, #334155)");
      if (s.name.length > 36) {
        tName.textContent = s.name.substring(0, 34) + "...";
      }

      // CI Line
      const xLow = valToX(s.low, svgWidth, plotLeft, plotWidth);
      const xHigh = valToX(s.high, svgWidth, plotLeft, plotWidth);
      const xMid = valToX(s.val, svgWidth, plotLeft, plotWidth);

      const ciLine = document.createElementNS(ns, "line");
      ciLine.setAttribute("x1", `${xLow}`);
      ciLine.setAttribute("y1", `${y - 4}`);
      ciLine.setAttribute("x2", `${xHigh}`);
      ciLine.setAttribute("y2", `${y - 4}`);
      ciLine.setAttribute("stroke", cat.color || "#0284c7");
      ciLine.setAttribute("stroke-width", "2");
      svgCanvas.appendChild(ciLine);

      // Square
      const sqSize = Math.max(6, Math.min(14, (s.weight / 100) * 28));
      const sq = document.createElementNS(ns, "rect");
      sq.setAttribute("x", `${xMid - sqSize / 2}`);
      sq.setAttribute("y", `${y - 4 - sqSize / 2}`);
      sq.setAttribute("width", `${sqSize}`);
      sq.setAttribute("height", `${sqSize}`);
      sq.setAttribute("fill", cat.color || "#0284c7");
      sq.setAttribute("rx", "2");
      svgCanvas.appendChild(sq);

      // Value label
      addText(`${s.weight.toFixed(1)}%   |   ${s.val.toFixed(2)} [${s.low.toFixed(2)}, ${s.high.toFixed(2)}]`, svgWidth - 15, y, "600", "11", "var(--color-text-muted, #64748b)", "end");
    });

    // Diamond for Pooled
    const diamondY = headerHeight + studiesData.length * rowHeight + 25;
    const dMid = valToX(pooledData.val, svgWidth, plotLeft, plotWidth);
    const dLow = valToX(pooledData.low, svgWidth, plotLeft, plotWidth);
    const dHigh = valToX(pooledData.high, svgWidth, plotLeft, plotWidth);
    const dH = 9;

    const diamond = document.createElementNS(ns, "polygon");
    diamond.setAttribute("points", `${dMid},${diamondY - dH} ${dHigh},${diamondY} ${dMid},${diamondY + dH} ${dLow},${diamondY}`);
    diamond.setAttribute("fill", "#dc2626");
    diamond.setAttribute("stroke", "#b91c1c");
    diamond.setAttribute("stroke-width", "1.5");
    svgCanvas.appendChild(diamond);

    addText("HIỆU ỨNG GỘP (Pooled Estimate)", 15, diamondY + 4, "800", "12", "#dc2626");
    addText(`100.0%   |   ${pooledData.val.toFixed(2)} [${pooledData.low.toFixed(2)}, ${pooledData.high.toFixed(2)}]`, svgWidth - 15, diamondY + 4, "800", "12", "#dc2626", "end");
  };

  const renderTable = () => {
    if (!tableBody) return;
    tableBody.innerHTML = "";
    studiesData.forEach((s, idx) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><input type="text" class="form-input form-input-sm" value="${s.name}" data-idx="${idx}" data-field="name"></td>
        <td>
          <select class="form-input form-input-sm" data-idx="${idx}" data-field="category">
            <option value="primary" ${s.category === "primary" ? "selected" : ""}>🎯 Primary</option>
            <option value="composite" ${s.category === "composite" ? "selected" : ""}>🧩 Composite</option>
            <option value="surrogate" ${s.category === "surrogate" ? "selected" : ""}>🧪 Surrogate</option>
            <option value="safety" ${s.category === "safety" ? "selected" : ""}>⚠️ Safety</option>
            <option value="subgroup" ${s.category === "subgroup" ? "selected" : ""}>📊 Subgroup</option>
          </select>
        </td>
        <td><input type="number" step="0.01" class="form-input form-input-sm" value="${s.val}" data-idx="${idx}" data-field="val"></td>
        <td><input type="number" step="0.01" class="form-input form-input-sm" value="${s.low}" data-idx="${idx}" data-field="low"></td>
        <td><input type="number" step="0.01" class="form-input form-input-sm" value="${s.high}" data-idx="${idx}" data-field="high"></td>
        <td><input type="number" step="0.5" class="form-input form-input-sm" value="${s.weight}" data-idx="${idx}" data-field="weight"></td>
        <td><button class="btn btn-sm btn-outline-danger btn-del-study" data-idx="${idx}"><i class="fa-solid fa-trash"></i></button></td>
      `;
      tableBody.appendChild(tr);
    });

    // Attach row events
    tableBody.querySelectorAll("input, select").forEach(el => {
      el.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        const idx = parseInt(target.dataset.idx || "0", 10);
        const field = target.dataset.field as keyof StudyItem;
        if (field === "name" || field === "category") {
          (studiesData[idx] as any)[field] = target.value;
        } else {
          (studiesData[idx] as any)[field] = parseFloat(target.value) || 0;
        }
        recalculatePooled();
        renderSvgForestPlot();
      });
    });

    tableBody.querySelectorAll(".btn-del-study").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const target = (e.currentTarget as HTMLElement);
        const idx = parseInt(target.dataset.idx || "0", 10);
        studiesData.splice(idx, 1);
        recalculatePooled();
        renderTable();
        renderSvgForestPlot();
      });
    });
  };

  // Setup presets selector
  const presetSelector = document.getElementById("preset-selector") as HTMLSelectElement | null;
  if (presetSelector) {
    presetSelector.addEventListener("change", (e) => {
      const val = (e.target as HTMLSelectElement).value;
      if (PRESETS[val]) {
        loadDataset(PRESETS[val]);
        recalculatePooled();
        renderTable();
        renderSvgForestPlot();
      }
    });
  }

  // Add study button
  const btnAddStudy = document.getElementById("btn-add-study");
  if (btnAddStudy) {
    btnAddStudy.addEventListener("click", () => {
      studiesData.push({
        category: "primary",
        name: `Nghiên cứu mới ${studiesData.length + 1}`,
        val: 0.80,
        low: 0.65,
        high: 0.98,
        weight: 15.0
      });
      recalculatePooled();
      renderTable();
      renderSvgForestPlot();
    });
  }

  // Export Handlers
  const btnExportSvg = document.getElementById("btn-export-svg");
  if (btnExportSvg && svgCanvas) {
    btnExportSvg.addEventListener("click", () => {
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

  // Initial Load
  recalculatePooled();
  renderTable();
  renderSvgForestPlot();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForestPlotBuilder);
  } else {
    initForestPlotBuilder();
  }
}
