function renderMultiForestPlotSVG(multiData) {
  if (!multiData || !Array.isArray(multiData.items) || multiData.items.length === 0) return '';
  const items = multiData.items;

  // Single item fallback to compact mode if items.length === 1
  if (items.length === 1) {
    const item = items[0];
    return renderSingleForestPlotSVG(item);
  }

  const rowH = 26;
  const PAD_T = 28;
  const PAD_B = 22;
  const W = 480;
  const H = PAD_T + items.length * rowH + PAD_B;

  // Check metric types
  const isDiff = items.some(d => ['MD', 'SMD', 'WMD', 'RD', 'ARR'].includes(d.metric));
  const nullVal = isDiff ? 0.0 : 1.0;

  const minLower = Math.min(...items.map(d => d.lower));
  const maxUpper = Math.max(...items.map(d => d.upper));

  const maxDist = Math.max(Math.abs(maxUpper - nullVal), Math.abs(nullVal - minLower)) * 1.25 + 0.05;
  const axisMin = isDiff ? (nullVal - maxDist) : Math.max(0.1, nullVal - maxDist);
  const axisMax = nullVal + maxDist;

  const plotX1 = 165;
  const plotX2 = 345;
  const plotW = plotX2 - plotX1;

  function toX(val) {
    return plotX1 + ((val - axisMin) / (axisMax - axisMin)) * plotW;
  }

  const xNull = toX(nullVal);

  let svg = `<svg class="forest-plot-svg-multi chart-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sơ đồ Forest plot tổng hợp">`;

  // Filter defs for clean rendering
  svg += `<style>
    .forest-plot-svg-multi text { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif; }
    .forest-plot-svg-multi .val-text { font-family: 'JetBrains Mono', monospace; }
  </style>`;

  // Top header labels
  svg += `<text x="12" y="16" font-size="8.5" font-weight="800" fill="var(--text-muted)" text-transform="uppercase" letter-spacing="0.03em">Nghiên cứu / Tiêu chí</text>`;
  svg += `<text x="${(plotX1 + plotX2) / 2}" y="16" text-anchor="middle" font-size="8.5" font-weight="800" fill="var(--text-muted)" text-transform="uppercase" letter-spacing="0.03em">Biểu đồ Forest Plot</text>`;
  svg += `<text x="${W - 12}" y="16" text-anchor="end" font-size="8.5" font-weight="800" fill="var(--text-muted)" text-transform="uppercase" letter-spacing="0.03em">Chỉ số (95% CI)</text>`;
  svg += `<line x1="10" y1="22" x2="${W - 10}" y2="22" stroke="var(--border-light)" stroke-width="1"/>`;

  // Null Line across rows
  const nullLineY2 = H - PAD_B + 2;
  svg += `<line x1="${xNull}" y1="23" x2="${xNull}" y2="${nullLineY2}" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="3,2"/>`;

  // Render Rows
  items.forEach((item, idx) => {
    const cy = PAD_T + idx * rowH + rowH / 2;
    const isOdd = idx % 2 === 1;

    if (isOdd) {
      svg += `<rect x="8" y="${cy - rowH / 2}" width="${W - 16}" height="${rowH}" fill="var(--surface-2)" opacity="0.7" rx="4"/>`;
    }

    const isGreen = isDiff ? item.estimate < 0.0 : item.estimate < 1.0;
    const isHarm  = isDiff ? item.estimate > 0.0 : item.estimate > 1.0;
    const dotColor = isGreen ? '#16a34a' : isHarm ? '#dc2626' : '#6b7280';
    const ciColor  = isGreen ? '#86efac' : isHarm ? '#fca5a5' : '#cbd5e1';

    const xL = toX(item.lower);
    const xU = toX(item.upper);
    const xE = toX(item.estimate);

    // Label (truncated if long)
    const labelStr = item.label.length > 24 ? item.label.substring(0, 23) + '…' : item.label;
    svg += `<text x="12" y="${cy + 3.5}" font-size="9.5" font-weight="700" fill="var(--text)">${escapeHtml(labelStr)}</text>`;

    // CI Whiskers
    svg += `<line x1="${xL}" y1="${cy}" x2="${xU}" y2="${cy}" stroke="${ciColor}" stroke-width="3" stroke-linecap="round"/>`;
    svg += `<line x1="${xL}" y1="${cy - 3.5}" x2="${xL}" y2="${cy + 3.5}" stroke="${dotColor}" stroke-width="1.8"/>`;
    svg += `<line x1="${xU}" y1="${cy - 3.5}" x2="${xU}" y2="${cy + 3.5}" stroke="${dotColor}" stroke-width="1.8"/>`;

    // Diamond
    svg += `<polygon points="${xE},${cy - 4.5} ${xE + 4.5},${cy} ${xE},${cy + 4.5} ${xE - 4.5},${cy}" fill="${dotColor}" opacity="0.95"/>`;

    // Metric text
    const pStr = item.pValue ? ` p${item.pValue}` : '';
    const valText = `${item.metric || 'HR'} ${item.estimate.toFixed(2)} [${item.lower.toFixed(2)}–${item.upper.toFixed(2)}]`;
    svg += `<text x="${W - 12}" y="${cy + 3.5}" text-anchor="end" class="val-text" font-size="9" font-weight="700" fill="${dotColor}">${valText}</text>`;
  });

  // Footer axis
  const footerY = H - 6;
  svg += `<line x1="${plotX1}" y1="${nullLineY2}" x2="${plotX2}" y2="${nullLineY2}" stroke="var(--border-light)" stroke-width="1"/>`;
  svg += `<text x="${plotX1}" y="${footerY}" font-size="7.5" fill="var(--text-faint)" class="val-text">${axisMin.toFixed(2)}</text>`;
  svg += `<text x="${xNull}" y="${footerY}" text-anchor="middle" font-size="7.5" font-weight="700" fill="var(--text-muted)" class="val-text">${nullVal.toFixed(1)}</text>`;
  svg += `<text x="${plotX2}" y="${footerY}" text-anchor="end" font-size="7.5" fill="var(--text-faint)" class="val-text">${axisMax.toFixed(2)}</text>`;

  svg += `</svg>`;
  return svg;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderSingleForestPlotSVG(forestData) {
  const { label, metric, estimate, lower, upper, pValue } = forestData;
  const mLabel = metric || label || 'HR';
  const W = 270, H = 46;
  const PAD_L = 10, PAD_R = 10;
  const plotW = W - PAD_L - PAD_R;
  const cy = (H / 2) - 2;

  const isDiff = ['MD', 'SMD', 'WMD', 'RD', 'ARR'].includes(mLabel);
  const nullVal = isDiff ? 0.0 : 1.0;

  const maxDist = Math.max(Math.abs(upper - nullVal), Math.abs(nullVal - lower)) * 1.3 + 0.15;
  const axisMin = isDiff ? (nullVal - maxDist) : Math.max(0.05, nullVal - maxDist);
  const axisMax = nullVal + maxDist;

  function toX(val) {
    return PAD_L + ((val - axisMin) / (axisMax - axisMin)) * plotW;
  }

  const x0 = toX(nullVal);
  const xE = toX(estimate);
  const xL = toX(lower);
  const xU = toX(upper);

  const isGreen = isDiff ? estimate < 0.0 : estimate < 1.0;
  const isHarm  = isDiff ? estimate > 0.0 : estimate > 1.0;
  const dotColor = isGreen ? '#16a34a' : isHarm ? '#dc2626' : '#6b7280';
  const ciColor  = isGreen ? '#86efac' : isHarm ? '#fca5a5' : '#cbd5e1';

  const pStr = pValue ? ` (p${pValue.startsWith('<') || pValue.startsWith('>') ? '' : '='}${pValue})` : '';
  const labelText = `${mLabel} ${estimate.toFixed(2)} [${lower.toFixed(2)}–${upper.toFixed(2)}]${pStr}`;

  return `
    <svg class="forest-plot-svg chart-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"
         xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forest plot: ${labelText}">
      <line x1="${PAD_L}" y1="${cy}" x2="${W - PAD_R}" y2="${cy}" stroke="#cbd5e1" stroke-width="1"/>
      <line x1="${x0}" y1="${cy - 12}" x2="${x0}" y2="${cy + 12}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2"/>
      <line x1="${xL}" y1="${cy}" x2="${xU}" y2="${cy}" stroke="${ciColor}" stroke-width="4" stroke-linecap="round"/>
      <line x1="${xL}" y1="${cy - 4}" x2="${xL}" y2="${cy + 4}" stroke="${dotColor}" stroke-width="2"/>
      <line x1="${xU}" y1="${cy - 4}" x2="${xU}" y2="${cy + 4}" stroke="${dotColor}" stroke-width="2"/>
      <polygon points="${xE},${cy - 6} ${xE + 6},${cy} ${xE},${cy + 6} ${xE - 6},${cy}"
               fill="${dotColor}" opacity="0.95"/>
      <text x="${W / 2}" y="${H - 2}" text-anchor="middle"
            font-family="monospace" font-size="9" fill="${dotColor}" font-weight="700">${labelText}</text>
      <text x="${PAD_L}" y="${cy - 6}" font-family="monospace" font-size="7.5" fill="#94a3b8">${axisMin.toFixed(2)}</text>
      <text x="${x0}" y="${cy - 6}" text-anchor="middle" font-family="monospace" font-size="7.5" fill="#94a3b8">${nullVal.toFixed(1)}</text>
      <text x="${W - PAD_R}" y="${cy - 6}" text-anchor="end" font-family="monospace" font-size="7.5" fill="#94a3b8">${axisMax.toFixed(2)}</text>
    </svg>
  `;
}
