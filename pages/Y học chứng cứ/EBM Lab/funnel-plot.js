/* ============================================================
   INTERACTIVE FUNNEL PLOT BUILDER (SVG ENGINE)
   Location: pages/Y học chứng cứ/EBM Lab/funnel-plot.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initFunnelPlotBuilder();
});

const FUNNEL_PRESETS = {
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

function initFunnelPlotBuilder() {
  let activePreset = FUNNEL_PRESETS.doac;
  let studiesData = [...activePreset.studies];

  const tableBody = document.getElementById("fn-table-body");
  const svgCanvas = document.getElementById("fn-svg-canvas");
  const presetSelect = document.getElementById("fn-preset-select");
  const btnAddRow = document.getElementById("fn-btn-add-row");

  const statPooled = document.getElementById("fn-stat-pooled");
  const statEgger = document.getElementById("fn-stat-egger");
  const statBias = document.getElementById("fn-stat-bias");

  function calculatePooledEffect() {
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

  function renderTable() {
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

    document.querySelectorAll(".fn-inp").forEach((inp) => {
      inp.addEventListener("input", handleInputChange);
    });

    document.querySelectorAll(".fn-btn-del").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        studiesData.splice(idx, 1);
        renderTable();
        renderSvgFunnelPlot();
      });
    });
  }

  function handleInputChange(e) {
    const idx = parseInt(e.target.getAttribute("data-idx"));
    if (isNaN(idx)) return;

    const row = studiesData[idx];
    if (e.target.classList.contains("fn-name")) row.name = e.target.value;
    if (e.target.classList.contains("fn-val")) row.val = parseFloat(e.target.value) || 1.0;
    if (e.target.classList.contains("fn-se")) row.se = parseFloat(e.target.value) || 0.1;

    renderSvgFunnelPlot();
  }

  function renderSvgFunnelPlot() {
    if (!svgCanvas) return;

    const pooled = calculatePooledEffect();
    const maxSe = Math.max(...studiesData.map((s) => s.se), 0.5) * 1.15;
    const minVal = 0.2;
    const maxVal = 1.8;

    const margin = { top: 40, right: 40, bottom: 60, left: 65 };
    const width = 680;
    const height = 460;
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    svgCanvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svgCanvas.setAttribute("width", "100%");
    svgCanvas.setAttribute("height", height);

    function scaleX(val) {
      const clampVal = Math.max(minVal, Math.min(maxVal, val));
      return margin.left + ((clampVal - minVal) / (maxVal - minVal)) * plotWidth;
    }

    // Inverted Y axis: SE = 0 at top, SE = maxSe at bottom
    function scaleY(se) {
      const clampSe = Math.max(0, Math.min(maxSe, se));
      return margin.top + (clampSe / maxSe) * plotHeight;
    }

    // Canvas Background & Header
    let svgHtml = `
      <rect x="0" y="0" width="${width}" height="${height}" fill="var(--color-surface)" rx="12" />
      <text x="${margin.left}" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="var(--color-text)">${activePreset.title}</text>
    `;

    // 95% Pseudo CI Funnel Triangle Points
    // Left boundary: log(pooled) - 1.96 * SE, Right boundary: log(pooled) + 1.96 * SE
    const topX = scaleX(pooled);
    const topY = scaleY(0);

    const bottomSe = maxSe;
    const bottomY = scaleY(bottomSe);

    const leftVal = Math.exp(Math.log(pooled) - 1.96 * bottomSe);
    const rightVal = Math.exp(Math.log(pooled) + 1.96 * bottomSe);

    const leftX = scaleX(leftVal);
    const rightX = scaleX(rightVal);

    // Render Funnel Triangle Polygon (Soft emerald fill)
    svgHtml += `
      <polygon points="${topX},${topY} ${leftX},${bottomY} ${rightX},${bottomY}" fill="#10b981" opacity="0.12" />
      
      <!-- Funnel Boundary Lines (95% CI) -->
      <line x1="${topX}" y1="${topY}" x2="${leftX}" y2="${bottomY}" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" />
      <line x1="${topX}" y1="${topY}" x2="${rightX}" y2="${bottomY}" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,4" />
      
      <!-- Vertical Pooled Effect Line -->
      <line x1="${topX}" y1="${topY}" x2="${topX}" y2="${bottomY}" stroke="#7c3aed" stroke-width="2" />
      
      <!-- Null Line (1.0) -->
      <line x1="${scaleX(1.0)}" y1="${topY}" x2="${scaleX(1.0)}" y2="${bottomY}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2,2" />
      <text x="${scaleX(1.0)}" y="${topY - 6}" font-family="'Inter', sans-serif" font-size="10" font-weight="700" fill="#94a3b8" text-anchor="middle">Null (1.0)</text>
      <text x="${topX}" y="${topY - 6}" font-family="'Inter', sans-serif" font-size="10" font-weight="800" fill="#7c3aed" text-anchor="middle">Pooled: ${pooled.toFixed(2)}</text>
    `;

    // X Axis Ticks
    [0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8].forEach((v) => {
      const x = scaleX(v);
      svgHtml += `
        <line x1="${x}" y1="${bottomY}" x2="${x}" y2="${bottomY + 5}" stroke="var(--color-divider)" stroke-width="1" />
        <text x="${x}" y="${bottomY + 18}" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="var(--color-text-muted)" text-anchor="middle">${v}</text>
      `;
    });

    // Y Axis Ticks (SE)
    const seTicks = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
    seTicks.forEach((se) => {
      if (se <= maxSe) {
        const y = scaleY(se);
        svgHtml += `
          <line x1="${margin.left - 5}" y1="${y}" x2="${margin.left}" y2="${y}" stroke="var(--color-divider)" stroke-width="1" />
          <text x="${margin.left - 10}" y="${y + 4}" font-family="'Inter', sans-serif" font-size="10" font-weight="600" fill="var(--color-text-muted)" text-anchor="end">${se.toFixed(1)}</text>
        `;
      }
    });

    // Axes Labels
    svgHtml += `
      <text x="${margin.left + plotWidth / 2}" y="${height - 10}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle">Kích Thước Hiệu Quả Nghiên Cứu (Effect Estimate - HR/OR)</text>
      <text x="20" y="${margin.top + plotHeight / 2}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle" transform="rotate(-90 20 ${margin.top + plotHeight / 2})">Sai Số Chuẩn (Standard Error - SE)</text>
    `;

    // Render Study Points
    studiesData.forEach((st) => {
      const x = scaleX(st.val);
      const y = scaleY(st.se);

      svgHtml += `
        <circle cx="${x}" cy="${y}" r="6" fill="#047857" stroke="#ffffff" stroke-width="1.5" />
        <text x="${x + 9}" y="${y + 4}" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="var(--color-text)">${st.name}</text>
      `;
    });

    svgCanvas.innerHTML = svgHtml;

    // Update Stats Bar
    if (statPooled) statPooled.textContent = pooled.toFixed(2);
    if (statEgger) statEgger.textContent = activePreset.eggerP;
    if (statBias) {
      statBias.textContent = activePreset.biasText;
      statBias.style.color = activePreset.biasRisk === "High Risk" ? "var(--fn-danger)" : "var(--fn-primary-dark)";
    }
  }

  // Preset Event
  if (presetSelect) {
    presetSelect.addEventListener("change", (e) => {
      const presetKey = e.target.value;
      if (FUNNEL_PRESETS[presetKey]) {
        activePreset = FUNNEL_PRESETS[presetKey];
        studiesData = [...activePreset.studies];
        renderTable();
        renderSvgFunnelPlot();
      }
    });
  }

  if (btnAddRow) {
    btnAddRow.addEventListener("click", () => {
      studiesData.push({ name: `Nghiên cứu mới ${studiesData.length + 1}`, val: 0.85, se: 0.2 });
      renderTable();
      renderSvgFunnelPlot();
    });
  }

  // Initial Load
  renderTable();
  renderSvgFunnelPlot();
}
