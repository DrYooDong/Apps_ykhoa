function renderDonutProgressSVG(data) {
  const pct = Math.min(100, Math.max(0, data.pct || 0));
  const count = data.count;
  const total = data.total;
  const label = data.label || 'Tỷ lệ đạt được';

  const W = 270, H = 58;
  const cx = 32, cy = 29, r = 20;
  const strokeW = 4.5;
  const circ = 2 * Math.PI * r;
  const dashoffset = circ - (pct / 100) * circ;

  const color = pct >= 80 ? '#10b981' : pct >= 50 ? '#0284c7' : '#d97706';
  const bgStroke = 'var(--border-light)';

  const fracText = (count !== null && total !== null) ? `${count} / ${total} ca (${pct.toFixed(pct % 1 === 0 ? 0 : 1)}%)` : `${pct.toFixed(pct % 1 === 0 ? 0 : 1)}%`;

  let svg = `<svg class="chart-svg chart-donut-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Biểu đồ tỷ lệ ${pct}%">`;
  
  // Background circle
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${bgStroke}" stroke-width="${strokeW}"/>`;
  
  // Progress arc (rotated -90deg)
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeW}"
           stroke-dasharray="${circ}" stroke-dashoffset="${dashoffset}" stroke-linecap="round"
           transform="rotate(-90 ${cx} ${cy})"/>`;

  // Center percentage text
  svg += `<text x="${cx}" y="${cy + 3.5}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="800" fill="${color}">${pct.toFixed(pct % 1 === 0 ? 0 : 1)}%</text>`;

  // Right side label info
  const labelX = 64;
  const labelStr = label.length > 24 ? label.substring(0, 23) + '…' : label;
  svg += `<text x="${labelX}" y="22" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="700" fill="var(--text)">${escapeHtml(labelStr)}</text>`;
  
  // Subtitle / Fraction text
  svg += `<text x="${labelX}" y="38" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="var(--text-muted)">${escapeHtml(fracText)}</text>`;

  // Progress Bar strip below text
  const barX = labelX;
  const barY = 44;
  const maxBarW = W - labelX - 12;
  const barW = Math.max(4, (pct / 100) * maxBarW);
  svg += `<rect x="${barX}" y="${barY}" width="${maxBarW}" height="4" rx="2" fill="${bgStroke}"/>`;
  svg += `<rect x="${barX}" y="${barY}" width="${barW}" height="4" rx="2" fill="${color}"/>`;

  svg += `</svg>`;
  return svg;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const test1 = { type: 'donut-progress', label: 'Tỷ lệ âm tính Đờm', pct: 91, count: 63, total: 69 };
console.log(renderDonutProgressSVG(test1));
