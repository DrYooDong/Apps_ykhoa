function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderComparisonBarSVG(data) {
  if (!data || !Array.isArray(data.items) || data.items.length < 2) return '';
  const items = data.items;

  const rowH = 24;
  const PAD_T = 10, PAD_B = 10;
  const W = 270;
  const H = PAD_T + PAD_B + items.length * rowH;

  const maxVal = Math.max(...items.map(d => d.value), 0.1) * 1.25;
  const plotW = 125;
  const barX = 95;

  let svg = `<svg class="chart-svg chart-comp-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Biểu đồ đối sánh">`;
  
  items.forEach((item, idx) => {
    const y = PAD_T + idx * rowH;
    const cy = y + 11;
    const barW = Math.max(2, (item.value / maxVal) * plotW);

    const lbl = item.label.length > 16 ? item.label.substring(0, 15) + '…' : item.label;
    svg += `<text x="88" y="${cy}" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="700" fill="var(--text)">${escapeHtml(lbl)}</text>`;
    svg += `<rect x="${barX}" y="${y + 2}" width="${barW}" height="12" rx="3" fill="${item.color || '#10b981'}"/>`;

    const countStr = (item.count !== null && item.count !== undefined && item.total !== null && item.total !== undefined) 
      ? `${item.value}% (${item.count}/${item.total})` 
      : `${item.value}%`;

    svg += `<text x="${barX + barW + 5}" y="${cy}" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="${item.color || '#10b981'}">${escapeHtml(countStr)}</text>`;
  });

  svg += `</svg>`;
  return svg;
}

const data = {
  type: "comparison",
  items: [
    { label: "CĐ Lao phổi BAL-CBNAAT", value: 91.8, count: 89, total: 97, color: "#10b981" },
    { label: "PP Soi AFB dịch BAL", value: 0, count: 0, total: 97, color: "#ef4444" }
  ]
};

console.log(renderComparisonBarSVG(data));
