const testText = "Huấn luyện nhận thức: cải thiện nhận thức nhỏ (Hedges' g 0.25) nhưng không giảm sa sút trí tuệ sau 5 năm (HR 1.00); Hoạt động xã hội: giảm nguy cơ sa sút trí tuệ (RR 0.81); Không khuyến cáo bổ sung Vitamin B, E, Omega-3 (Khuyến cáo mạnh); Chống chỉ định liệu pháp hormone (MHT) ở phụ nữ ≥65 tuổi vì không giảm nguy cơ sa sút trí tuệ (estrogen đơn trị: HR 1.49, estrogen + progestogen: HR 1.76); Ô nhiễm PM2.5 làm tăng nguy cơ sa sút trí tuệ (HR 1.40); Can thiệp đa miền cải thiện nhận thức nhỏ ở người bình thường (SMD 0.01-0.08) và người MCI (SMD 0.00-0.18)";

function normalizeMetric(m) {
  const clean = (m || '').trim();
  if (/^Hedges/i.test(clean) || /^g$/i.test(clean)) return "Hedges' g";
  if (/^Cohen/i.test(clean) || /^d$/i.test(clean)) return "Cohen's d";
  return clean.toUpperCase();
}

function cleanMedicalLabel(rawLabel) {
  if (!rawLabel) return '';
  let str = rawLabel.trim();
  str = str.replace(/^(?:tỷ lệ|kết quả|cho thấy|đạt|bằng|trong|nghiên cứu|thử nghiệm|phân tích|về|ở|đối với|khi|so với|là|nhưng|vì|làm|người|các|cho|có|với|tăng|cải thiện|giảm|không giảm|chống chỉ định|liệu pháp)\s+/gi, '');
  str = str.replace(/\s+(?:đạt|là|cho thấy|được|ở|với|bằng|so với|vì|làm|nhỏ|lớn|làm tăng|ở phụ nữ|≥65 tuổi|65 tuổi)\s*$/gi, '');
  str = str.replace(/\b(?:bằng|đạt|cho thấy|được|là|với)\b/gi, ' ');
  str = str.replace(/\s+/g, ' ').replace(/^[:\-\s,.;()]+|[:\-\s,.;()]+$/g, '').trim();
  return str;
}

function extractLabelFromContext(preText, metricName, itemIndex, state) {
  let cleanPre = (preText || '').replace(/[\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim();
  const snippet = cleanPre.slice(-85);

  let parentTopic = '';
  if (/PM2\.5|ô nhiễm/i.test(snippet) || /PM2\.5|ô nhiễm/i.test(cleanPre.split(/;/).pop())) parentTopic = 'Ô nhiễm PM2.5';
  else if (/Can thiệp đa miền/i.test(snippet) || /Can thiệp đa miền/i.test(cleanPre.split(/;/).pop())) parentTopic = 'Can thiệp đa miền';
  else if (/estrogen|progestogen|MHT|liệu pháp hormone/i.test(snippet)) parentTopic = 'MHT';
  else if (/Hoạt động xã hội/i.test(cleanPre.split(/;/).pop())) parentTopic = 'Hoạt động xã hội';
  else if (/Huấn luyện nhận thức/i.test(cleanPre.split(/;/).pop())) parentTopic = 'HL nhận thức';

  let subDetail = '';
  if (/estrogen\s*\+\s*progestogen/i.test(snippet)) subDetail = 'Estrogen + Progestogen';
  else if (/estrogen\s*đơn\s*trị/i.test(snippet)) subDetail = 'Estrogen đơn trị';
  else if (/người\s*MCI|MCI/i.test(snippet)) subDetail = 'Người MCI';
  else if (/người\s*bình\s*thường/i.test(snippet)) subDetail = 'Người bình thường';
  else if (/cải thiện nhận thức/i.test(snippet)) subDetail = 'Cải thiện nhận thức';
  else if (/sa sút trí tuệ\s*sau\s*5\s*năm/i.test(snippet)) subDetail = 'Sa sút trí tuệ (5y)';
  else if (/sa sút trí tuệ/i.test(snippet)) subDetail = 'Sa sút trí tuệ';

  let finalLabel = '';
  if (parentTopic && subDetail && !subDetail.toLowerCase().includes(parentTopic.toLowerCase())) {
    finalLabel = `${parentTopic} (${subDetail})`;
  } else if (subDetail) {
    finalLabel = subDetail;
  } else if (parentTopic) {
    finalLabel = parentTopic;
  } else {
    const clauses = cleanPre.split(/(?:[;•\n\r]|\d+\.\s+)/);
    let clause = (clauses.pop() || '').trim();
    let topic = clause.includes(':') ? clause.split(':')[0].trim() : clause;
    finalLabel = cleanMedicalLabel(topic) || `${metricName} #${itemIndex}`;
  }

  finalLabel = finalLabel
    .replace(/Huấn luyện nhận thức/gi, 'HL nhận thức')
    .replace(/estrogen đơn trị/gi, 'Estrogen đơn trị')
    .replace(/estrogen \+ progestogen/gi, 'Estrogen + Progestogen')
    .replace(/bình thường/gi, 'Người bình thường')
    .replace(/MCI/gi, 'Bệnh nhân MCI');

  if (finalLabel.length > 32) finalLabel = finalLabel.substring(0, 31) + '…';

  return finalLabel;
}

function parseForestDataAll(keyResults) {
  if (!keyResults || typeof keyResults !== 'string') return null;

  const metricRegexStr = "(aHR|aOR|aRR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR|Hedges'\\s*g|Hedges\\s*g|Cohen's\\s*d|Cohen\\s*d|\\bg\\b|\\bd\\b)";
  const sep = '(?:đến|dến|dên|to|[-\u2013\u2014,])';
  const unit = '(?:\\s+[a-zA-Z%°µμ/-]+)?';

  const patternFullCI = new RegExp(
    `\\b${metricRegexStr}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*` +
    `(?:` +
      `\\([^)]*?CI[^\\d-]*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)|` +
      `\\([^)]*?CI[^\\d-]*(-?[\\d.]+)\\s+to\\s+(-?[\\d.]+)[^)]*\\)|` +
      `\\(\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)|` +
      `\\[[^\\]]*?CI[^\\d-]*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^\\]]*\\]|` +
      `[,;]\\s*(?:95%\\s*)?CI\\s*[=:]?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)|` +
      `\\s+(?:95%\\s*)?CI\\s*[=:]?\\s*\\[?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)\\]?` +
    `)`,
    'gi'
  );

  const patternRange = new RegExp(
    `\\b${metricRegexStr}\\s*[=:]?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)`,
    'gi'
  );

  const patternPoint = new RegExp(
    `\\b${metricRegexStr}\\s*[=:]?\\s*(-?[\\d.]+)`,
    'gi'
  );

  const rawMatches = [];
  const occupiedRanges = [];

  function isOverlapping(start, end) {
    return occupiedRanges.some(r => !(end <= r.start || start >= r.end));
  }

  // Pass 1: Full CI
  let match;
  while ((match = patternFullCI.exec(keyResults)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (isOverlapping(start, end)) continue;

    const rawMetric = match[1];
    const metricName = normalizeMetric(rawMetric);
    const estimate = parseFloat(match[2]);
    const ciLowerStr = match[3] || match[5] || match[7] || match[9] || match[11] || match[13];
    const ciUpperStr = match[4] || match[6] || match[8] || match[10] || match[12] || match[14];
    const lower = parseFloat(ciLowerStr);
    const upper = parseFloat(ciUpperStr);

    if (isNaN(estimate) || isNaN(lower) || isNaN(upper)) continue;

    occupiedRanges.push({ start, end });
    rawMatches.push({
      start,
      metric: metricName,
      estimate,
      lower,
      upper,
      hasCI: true
    });
  }

  // Pass 2: Range (SMD 0.01-0.08)
  while ((match = patternRange.exec(keyResults)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (isOverlapping(start, end)) continue;

    const rawMetric = match[1];
    const metricName = normalizeMetric(rawMetric);
    const val1 = parseFloat(match[2]);
    const val2 = parseFloat(match[3]);

    if (isNaN(val1) || isNaN(val2)) continue;

    const lower = Math.min(val1, val2);
    const upper = Math.max(val1, val2);
    const estimate = (lower + upper) / 2;

    occupiedRanges.push({ start, end });
    rawMatches.push({
      start,
      metric: metricName,
      estimate,
      lower,
      upper,
      hasCI: true,
      isRange: true
    });
  }

  // Pass 3: Single Point Estimate (HR 1.00)
  while ((match = patternPoint.exec(keyResults)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    if (isOverlapping(start, end)) continue;

    const rawMetric = match[1];
    const metricName = normalizeMetric(rawMetric);
    const estimate = parseFloat(match[2]);

    if (isNaN(estimate)) continue;

    occupiedRanges.push({ start, end });
    rawMatches.push({
      start,
      metric: metricName,
      estimate,
      lower: estimate,
      upper: estimate,
      hasCI: false
    });
  }

  rawMatches.sort((a, b) => a.start - b.start);

  const state = { lastParentTopic: '' };
  const matches = rawMatches.map((m, idx) => {
    const preText = keyResults.substring(0, m.start);
    const label = extractLabelFromContext(preText, m.metric, idx + 1, state);
    const { start, ...rest } = m;
    return { ...rest, label };
  });

  if (matches.length > 0) {
    return {
      type: 'forest-multi',
      items: matches
    };
  }

  return null;
}

function renderMultiForestPlotSVG(multiData) {
  if (!multiData || !Array.isArray(multiData.items) || multiData.items.length === 0) return '';
  const items = multiData.items;

  const rowH = 26;
  const PAD_T = 28;
  const PAD_B = 22;
  const W = 480;
  const H = PAD_T + items.length * rowH + PAD_B;

  const isDiff = items.some(d => ['MD', 'SMD', 'WMD', 'RD', 'ARR', "HEDGES' G", "COHEN'S D"].includes((d.metric || '').toUpperCase()));
  const nullVal = isDiff ? 0.0 : 1.0;

  const minLower = Math.min(...items.map(d => d.lower));
  const maxUpper = Math.max(...items.map(d => d.upper));

  const maxDist = Math.max(Math.abs(maxUpper - nullVal), Math.abs(nullVal - minLower)) * 1.25 + 0.05;
  const axisMin = isDiff ? (nullVal - maxDist) : Math.max(0.1, nullVal - maxDist);
  const axisMax = nullVal + maxDist;

  const plotX1 = 175;
  const plotX2 = 345;
  const plotW = plotX2 - plotX1;

  function toX(val) {
    return plotX1 + ((val - axisMin) / (axisMax - axisMin)) * plotW;
  }

  const xNull = toX(nullVal);

  let svg = `<svg class="forest-plot-svg-multi chart-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sơ đồ Forest plot tổng hợp">`;

  svg += `<style>
    .forest-plot-svg-multi text { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif; }
    .forest-plot-svg-multi .val-text { font-family: 'JetBrains Mono', monospace; }
  </style>`;

  svg += `<text x="12" y="16" font-size="8.5" font-weight="800" fill="var(--text-muted)" text-transform="uppercase" letter-spacing="0.03em">Nghiên cứu / Tiêu chí</text>`;
  svg += `<text x="${(plotX1 + plotX2) / 2}" y="16" text-anchor="middle" font-size="8.5" font-weight="800" fill="var(--text-muted)" text-transform="uppercase" letter-spacing="0.03em">Biểu đồ Forest Plot</text>`;
  svg += `<text x="${W - 12}" y="16" text-anchor="end" font-size="8.5" font-weight="800" fill="var(--text-muted)" text-transform="uppercase" letter-spacing="0.03em">Chỉ số (95% CI)</text>`;
  svg += `<line x1="10" y1="22" x2="${W - 10}" y2="22" stroke="var(--border-light)" stroke-width="1"/>`;

  const nullLineY2 = H - PAD_B + 2;
  svg += `<line x1="${xNull}" y1="23" x2="${xNull}" y2="${nullLineY2}" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="3,2"/>`;

  items.forEach((item, idx) => {
    const cy = PAD_T + idx * rowH + rowH / 2;
    const isOdd = idx % 2 === 1;

    if (isOdd) {
      svg += `<rect x="8" y="${cy - rowH / 2}" width="${W - 16}" height="${rowH}" fill="var(--surface-2)" opacity="0.7" rx="4"/>`;
    }

    const itemMetric = (item.metric || 'HR').toUpperCase();
    const itemIsDiff = ['MD', 'SMD', 'WMD', 'RD', 'ARR', "HEDGES' G", "COHEN'S D"].includes(itemMetric);
    const itemNull = itemIsDiff ? 0.0 : 1.0;

    const isGreen = itemIsDiff ? item.estimate > 0.0 : item.estimate < 1.0;
    const isHarm  = itemIsDiff ? item.estimate < 0.0 : item.estimate > 1.0;
    const isNeutral = item.estimate === itemNull;

    const dotColor = isNeutral ? '#6b7280' : isGreen ? '#16a34a' : '#dc2626';
    const ciColor  = isNeutral ? '#cbd5e1' : isGreen ? '#86efac' : '#fca5a5';

    const xL = toX(item.lower);
    const xU = toX(item.upper);
    const xE = toX(item.estimate);

    const labelStr = item.label.length > 25 ? item.label.substring(0, 24) + '…' : item.label;
    svg += `<text x="12" y="${cy + 3.5}" font-size="9.5" font-weight="700" fill="var(--text)">${labelStr}</text>`;

    if (item.hasCI && item.lower !== item.upper) {
      svg += `<line x1="${xL}" y1="${cy}" x2="${xU}" y2="${cy}" stroke="${ciColor}" stroke-width="3" stroke-linecap="round"/>`;
      svg += `<line x1="${xL}" y1="${cy - 3.5}" x2="${xL}" y2="${cy + 3.5}" stroke="${dotColor}" stroke-width="1.8"/>`;
      svg += `<line x1="${xU}" y1="${cy - 3.5}" x2="${xU}" y2="${cy + 3.5}" stroke="${dotColor}" stroke-width="1.8"/>`;
    }

    svg += `<polygon points="${xE},${cy - 4.5} ${xE + 4.5},${cy} ${xE},${cy + 4.5} ${xE - 4.5},${cy}" fill="${dotColor}" opacity="0.95"/>`;

    let valText = '';
    if (item.isRange) {
      valText = `${item.metric} ${item.lower.toFixed(2)}–${item.upper.toFixed(2)}`;
    } else if (item.hasCI && item.lower !== item.upper) {
      valText = `${item.metric} ${item.estimate.toFixed(2)} [${item.lower.toFixed(2)}–${item.upper.toFixed(2)}]`;
    } else {
      valText = `${item.metric} ${item.estimate.toFixed(2)}`;
    }

    svg += `<text x="${W - 12}" y="${cy + 3.5}" text-anchor="end" class="val-text" font-size="9" font-weight="700" fill="${dotColor}">${valText}</text>`;
  });

  const footerY = H - 6;
  svg += `<line x1="${plotX1}" y1="${nullLineY2}" x2="${plotX2}" y2="${nullLineY2}" stroke="var(--border-light)" stroke-width="1"/>`;
  svg += `<text x="${plotX1}" y="${footerY}" font-size="7.5" fill="var(--text-faint)" class="val-text">${axisMin.toFixed(2)}</text>`;
  svg += `<text x="${xNull}" y="${footerY}" text-anchor="middle" font-size="7.5" font-weight="700" fill="var(--text-muted)" class="val-text">${nullVal.toFixed(1)}</text>`;
  svg += `<text x="${plotX2}" y="${footerY}" text-anchor="end" font-size="7.5" fill="var(--text-faint)" class="val-text">${axisMax.toFixed(2)}</text>`;

  svg += `</svg>`;
  return svg;
}

const parsed = parseForestDataAll(testText);
console.log("=== PARSED ITEMS ===");
parsed.items.forEach((it, idx) => console.log(`${idx + 1}. [${it.metric}] "${it.label}" -> ${it.estimate}`));

const svgOutput = renderMultiForestPlotSVG(parsed);
console.log("\n=== SVG GENERATED SUCCESSFULLY! ===");
console.log("SVG Length:", svgOutput.length, "chars");
