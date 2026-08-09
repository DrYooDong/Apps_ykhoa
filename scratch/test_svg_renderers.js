function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderComparisonBarSVG(data) {
  if (!data || !Array.isArray(data.items) || data.items.length < 2) return '';
  const items = data.items;

  const rowH = 28;
  const PAD_T = 32, PAD_B = 14;
  const W = 460;
  const H = PAD_T + PAD_B + items.length * rowH;

  const allMaxVals = items.map(d => d.max !== undefined ? d.max : d.value);
  const maxVal = Math.max(...allMaxVals, 0.1) * 1.2;
  const barX = 220;
  const plotW = 150;

  let svg = `<svg class="chart-svg chart-comp-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Biểu đồ đối sánh chỉ số">`;
  
  // Header / Legend
  svg += `<text x="10" y="16" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="var(--text-muted)">CHỈ SỐ DO LƯỜNG LÂM SÀNG</text>`;
  svg += `<text x="${W - 10}" y="16" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="700" fill="#10b981">🟢 Giảm nguy cơ | <tspan fill="#ef4444">🔴 Tăng nguy cơ</tspan></text>`;
  svg += `<line x1="10" y1="22" x2="${W - 10}" y2="22" stroke="var(--border)" stroke-width="0.75" opacity="0.6"/>`;

  items.forEach((item, idx) => {
    const y = PAD_T + idx * rowH;
    const cy = y + 12;

    let startX = barX;
    let barW = 0;

    if (item.isRange && item.min !== undefined && item.max !== undefined) {
      startX = barX + (item.min / maxVal) * plotW;
      barW = Math.max(8, ((item.max - item.min) / maxVal) * plotW);
    } else {
      barW = Math.max(3, (item.value / maxVal) * plotW);
    }

    const rawLbl = item.label || '';
    const lbl = rawLbl.length > 32 ? rawLbl.substring(0, 31) + '…' : rawLbl;
    svg += `<text x="${barX - 8}" y="${cy}" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="var(--text)">${escapeHtml(lbl)}</text>`;
    svg += `<rect x="${startX}" y="${y + 3}" width="${barW}" height="13" rx="3.5" fill="${item.color || '#10b981'}" opacity="0.9"/>`;

    if (item.isRange) {
      svg += `<circle cx="${startX}" cy="${y + 9.5}" r="2" fill="${item.color || '#10b981'}"/>`;
      svg += `<circle cx="${startX + barW}" cy="${y + 9.5}" r="2" fill="${item.color || '#10b981'}"/>`;
    }

    const countStr = (item.count !== null && item.count !== undefined && item.total !== null && item.total !== undefined) 
      ? `${item.value}% (${item.count}/${item.total})` 
      : (item.displayVal || `${item.value}%`);

    const valTextX = item.isRange ? (startX + barW + 6) : (barX + barW + 6);
    svg += `<text x="${valTextX}" y="${cy}" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="${item.color || '#10b981'}">${escapeHtml(countStr)}</text>`;
  });

  svg += `</svg>`;
  return svg;
}

const parsedData = [
  { label: "Giảm NC Tim thiếu máu (Thuần chay)", value: 27.5, min: 25, max: 30, isRange: true, isHarm: false, color: "#10b981", displayVal: "-25%–30%" },
  { label: "Giảm NC Tim thiếu máu (Ăn chay)", value: 22.5, min: 20, max: 25, isRange: true, isHarm: false, color: "#10b981", displayVal: "-20%–25%" },
  { label: "Giảm NC ĐTĐ Típ 2", value: 35, min: 20, max: 50, isRange: true, isHarm: false, color: "#10b981", displayVal: "-20%–50%" },
  { label: "Giảm NC Ung thư toàn bộ (Thuần chay)", value: 12, min: 8, max: 16, isRange: true, isHarm: false, color: "#10b981", displayVal: "-8%–16%" },
  { label: "Tăng NC Tử vong mọi nguyên nhân (uPDI)", value: 25, min: 20, max: 30, isRange: true, isHarm: true, color: "#ef4444", displayVal: "+20%–30%" }
];

console.log(renderComparisonBarSVG({ items: parsedData }));
