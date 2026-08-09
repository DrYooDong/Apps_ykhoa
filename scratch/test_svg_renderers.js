function renderDonutProgressSVG(data) {
  if (!data) return '';
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
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${bgStroke}" stroke-width="${strokeW}"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${strokeW}"
           stroke-dasharray="${circ}" stroke-dashoffset="${dashoffset}" stroke-linecap="round"
           transform="rotate(-90 ${cx} ${cy})"/>`;
  svg += `<text x="${cx}" y="${cy + 3.5}" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="800" fill="${color}">${pct.toFixed(pct % 1 === 0 ? 0 : 1)}%</text>`;

  const labelX = 64;
  const labelStr = label.length > 24 ? label.substring(0, 23) + '…' : label;
  svg += `<text x="${labelX}" y="21" font-family="'Plus Jakarta Sans', sans-serif" font-size="9.5" font-weight="700" fill="var(--text)">${escapeHtml(labelStr)}</text>`;
  svg += `<text x="${labelX}" y="36" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="var(--text-muted)">${escapeHtml(fracText)}</text>`;

  const barX = labelX;
  const barY = 43;
  const maxBarW = W - labelX - 12;
  const barW = Math.max(4, (pct / 100) * maxBarW);
  svg += `<rect x="${barX}" y="${barY}" width="${maxBarW}" height="4" rx="2" fill="${bgStroke}"/>`;
  svg += `<rect x="${barX}" y="${barY}" width="${barW}" height="4" rx="2" fill="${color}"/>`;

  svg += `</svg>`;
  return svg;
}

function renderComparisonBarSVG(data) {
  if (!data || !Array.isArray(data.items) || data.items.length < 2) return '';
  const item1 = data.items[0];
  const item2 = data.items[1];

  const W = 270, H = 58;
  const maxVal = Math.max(item1.value, item2.value, 1) * 1.25;
  const plotW = 160;
  const barX = 90;

  const w1 = (item1.value / maxVal) * plotW;
  const w2 = (item2.value / maxVal) * plotW;

  let svg = `<svg class="chart-svg chart-comp-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Biểu đồ đối sánh">`;
  
  // Row 1
  const lbl1 = item1.label.length > 14 ? item1.label.substring(0, 13) + '…' : item1.label;
  svg += `<text x="82" y="20" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="var(--text)">${escapeHtml(lbl1)}</text>`;
  svg += `<rect x="${barX}" y="11" width="${w1}" height="11" rx="3" fill="${item1.color || '#10b981'}"/>`;
  svg += `<text x="${barX + w1 + 5}" y="20" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="${item1.color || '#10b981'}">${item1.value}%</text>`;

  // Row 2
  const lbl2 = item2.label.length > 14 ? item2.label.substring(0, 13) + '…' : item2.label;
  svg += `<text x="82" y="42" text-anchor="end" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="var(--text)">${escapeHtml(lbl2)}</text>`;
  svg += `<rect x="${barX}" y="33" width="${w2}" height="11" rx="3" fill="${item2.color || '#ef4444'}"/>`;
  svg += `<text x="${barX + w2 + 5}" y="42" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="${item2.color || '#ef4444'}">${item2.value}%</text>`;

  svg += `</svg>`;
  return svg;
}

function renderNNTSVG(data) {
  if (!data || !data.val) return '';
  const metric = data.metric || 'NNT';
  const val = data.val;
  const isHarm = metric === 'NNH';
  const color = isHarm ? '#dc2626' : '#0284c7';

  const W = 270, H = 52;

  let svg = `<svg class="chart-svg chart-nnt-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${metric} ${val}">`;
  
  // Badge box on left
  svg += `<rect x="8" y="10" width="75" height="32" rx="8" fill="${isHarm ? 'rgba(220,38,38,0.1)' : 'rgba(2,132,199,0.1)'}" stroke="${color}" stroke-width="1"/>`;
  svg += `<text x="45.5" y="24" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="${color}">${metric}</text>`;
  svg += `<text x="45.5" y="36" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="${color}">${val}</text>`;

  // Description text on right
  const desc = isHarm ? `Cứ ${val} ca điều trị gặp 1 biến cố bất lợi (NNH = ${val})` : `Cần điều trị ${val} bệnh nhân để ngừa 1 biến cố (NNT = ${val})`;
  svg += `<text x="94" y="24" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="var(--text)">${isHarm ? '⚠️ Nguy cơ Tác dụng phụ' : '🛡️ Hiệu quả Can thiệp'}</text>`;
  svg += `<text x="94" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="var(--text-muted)">${escapeHtml(desc)}</text>`;

  svg += `</svg>`;
  return svg;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

console.log('Donut SVG:', renderDonutProgressSVG({ pct: 91, count: 63, total: 69, label: 'Tỷ lệ khỏi bệnh' }));
console.log('Comp SVG:', renderComparisonBarSVG({ items: [{ label: 'Can thiệp', value: 3.7 }, { label: 'Placebo', value: 5.9 }] }));
console.log('NNT SVG:', renderNNTSVG({ metric: 'NNT', val: 19 }));
