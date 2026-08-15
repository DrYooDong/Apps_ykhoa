/**
 * CliniPortal 2.0 — Guidelines SVG Charts Engine (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-charts-engine.ts
 */

import { Study } from '../guidelines-types';

interface ForestMetricItem {
  label: string;
  metric: string;
  estimate: number;
  lower: number;
  upper: number;
  rawText: string;
}

interface ColumnDataItem {
  label: string;
  value: number;
  color: string;
}

import '../guidelines-types';

export function renderStudyMiniChart(study?: Study): string {
  if (!study) return '';

  let html = '';

  const subgroupSvg = renderSubgroupForestPlot(study.subgroups);
  if (subgroupSvg) {
    html += subgroupSvg;
  }

  const keyResultsChart = renderKeyResultsChart(study.keyResults);
  if (keyResultsChart) {
    html += keyResultsChart;
  }

  if (!html && study.keyResults) {
    html = `<div class="key-results-plain-text">${escapeHtml(study.keyResults)}</div>`;
  }

  return html;
}

export function renderSubgroupForestPlot(subgroups: any): string {
  if (!subgroups) return '';

  let sgObj: Record<string, any> | null = null;
  if (typeof subgroups === 'object') {
    sgObj = subgroups;
  } else if (typeof subgroups === 'string' && subgroups.trim().startsWith('{')) {
    try { sgObj = JSON.parse(subgroups.trim()); } catch (e) {}
  }

  if (!sgObj || Object.keys(sgObj).length === 0) return '';

  const items: ForestMetricItem[] = [];
  Object.keys(sgObj).forEach(label => {
    const valStr = String(sgObj![label]);
    const parsed = parseForestMetric(valStr, label);
    if (parsed) items.push(parsed);
  });

  if (items.length === 0) return '';

  return buildForestPlotSVG(items, 'Phân tích Phân nhóm (Subgroups)');
}

export function renderKeyResultsChart(keyResults?: string): string {
  if (!keyResults || typeof keyResults !== 'string') return '';
  const text = keyResults.trim();

  const colMatch = text.match(/^(?:COL|CỘT|BAR_V|COLUMN)\s*:\s*(.+)$/i);
  if (colMatch) {
    return buildColumnChartSVG(colMatch[1]);
  }

  const hbarMatch = text.match(/^(?:HBAR|NGANG|BAR_H|HORIZONTAL)\s*:\s*(.+)$/i);
  if (hbarMatch) {
    return buildHBarChartSVG(hbarMatch[1]);
  }

  const compMatch = text.match(/(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,20})[:\s]+)?(\d+(?:\.\d+)?)\s*%\s*(?:vs\.?|so với|versus)\s*(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,20})[:\s]+)?(\d+(?:\.\d+)?)\s*%/i);
  if (compMatch) {
    const l1 = (compMatch[1] || 'Can thiệp').trim();
    const v1 = parseFloat(compMatch[2]);
    const l2 = (compMatch[3] || 'Đối chứng').trim();
    const v2 = parseFloat(compMatch[4]);
    if (!isNaN(v1) && !isNaN(v2)) {
      return buildComparisonBarSVG(l1, v1, l2, v2, text);
    }
  }

  const singleForest = parseForestMetric(text, 'Chỉ số chính');
  if (singleForest) {
    return buildForestPlotSVG([singleForest], 'Forest Plot — Chỉ số chính', text);
  }

  const pctMatch = text.match(/(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,25})[:\s]+)?(\d+(?:\.\d+)?)\s*%\s*(?:\(\s*(\d+)\s*\/\s*(\d+)\s*\))?/i);
  if (pctMatch) {
    const label = (pctMatch[1] || 'Tỷ lệ').trim();
    const pct = parseFloat(pctMatch[2]);
    const count = pctMatch[3] ? parseInt(pctMatch[3], 10) : null;
    const total = pctMatch[4] ? parseInt(pctMatch[4], 10) : null;
    if (!isNaN(pct) && pct >= 0 && pct <= 100) {
      return buildDonutProgressSVG(label, pct, count, total, text);
    }
  }

  return '';
}

function parseForestMetric(text: string, defaultLabel: string): ForestMetricItem | null {
  const match = text.match(/\b(HR|OR|RR|aHR|aOR|aRR)\s*[:=]?\s*(\d+(?:\.\d+)?)\s*(?:\(?\s*95%\s*CI\s*[:=]?\s*(\d+(?:\.\d+)?)\s*[-–—to,]+\s*(\d+(?:\.\d+)?)\)?)?/i);
  if (!match) return null;

  const metric = match[1].toUpperCase();
  const estimate = parseFloat(match[2]);
  const lower = match[3] ? parseFloat(match[3]) : estimate * 0.8;
  const upper = match[4] ? parseFloat(match[4]) : estimate * 1.25;

  if (isNaN(estimate) || isNaN(lower) || isNaN(upper)) return null;

  return {
    label: defaultLabel,
    metric,
    estimate,
    lower: Math.min(lower, upper),
    upper: Math.max(lower, upper),
    rawText: text
  };
}

function buildForestPlotSVG(items: ForestMetricItem[], title: string, rawFullText = ''): string {
  const rowH = 34;
  const PAD_T = title ? 30 : 14;
  const PAD_B = 24;
  const W = 460;
  const H = PAD_T + items.length * rowH + PAD_B;

  const nullVal = 1.0;
  const minL = Math.min(...items.map(i => i.lower));
  const maxU = Math.max(...items.map(i => i.upper));
  const maxDist = Math.max(Math.abs(maxU - nullVal), Math.abs(nullVal - minL)) * 1.25 + 0.1;
  const axisMin = Math.max(0.1, nullVal - maxDist);
  const axisMax = nullVal + maxDist;

  const pX1 = 150;
  const pX2 = 330;
  const pW = pX2 - pX1;

  function toX(val: number): number {
    return pX1 + ((val - axisMin) / (axisMax - axisMin)) * pW;
  }

  const xNull = toX(nullVal);

  let svg = `<div class="mini-chart-box mini-forest-box" style="margin: 6px 0;">`;
  svg += `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" class="mini-forest-svg" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<style>
    .mini-forest-svg text { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
    .mini-forest-svg .val-text { font-family: 'JetBrains Mono', monospace; }
  </style>`;

  if (title) {
    svg += `<text x="8" y="16" font-size="11" font-weight="800" fill="var(--accent)" text-transform="uppercase">${title}</text>`;
    svg += `<line x1="6" y1="22" x2="${W - 6}" y2="22" stroke="var(--border-light)" stroke-width="1"/>`;
  }

  svg += `<line x1="${xNull}" y1="${PAD_T}" x2="${xNull}" y2="${H - 18}" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="3,3"/>`;

  items.forEach((item, idx) => {
    const cy = PAD_T + idx * rowH + rowH / 2;
    const xEst = toX(item.estimate);
    const xLow = Math.max(pX1, toX(item.lower));
    const xUpp = Math.min(pX2, toX(item.upper));
    const isFavorsTreatment = item.estimate < 1.0;
    const color = isFavorsTreatment ? '#16a34a' : '#dc2626';

    svg += `<text x="8" y="${cy + 4}" font-size="11" font-weight="700" fill="var(--text)">${escapeHtml(item.label.length > 20 ? item.label.substring(0, 18) + '…' : item.label)}</text>`;
    svg += `<line x1="${xLow}" y1="${cy}" x2="${xUpp}" y2="${cy}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>`;
    svg += `<line x1="${xLow}" y1="${cy - 4}" x2="${xLow}" y2="${cy + 4}" stroke="${color}" stroke-width="1.8"/>`;
    svg += `<line x1="${xUpp}" y1="${cy - 4}" x2="${xUpp}" y2="${cy + 4}" stroke="${color}" stroke-width="1.8"/>`;
    svg += `<rect x="${xEst - 4.5}" y="${cy - 4.5}" width="9" height="9" fill="${color}" rx="2"/>`;

    const valStr = `${item.metric} ${item.estimate} (${item.lower}-${item.upper})`;
    svg += `<text x="${W - 6}" y="${cy + 4}" text-anchor="end" font-size="11" font-weight="700" fill="var(--text)" class="val-text">${valStr}</text>`;
  });

  svg += `<line x1="${pX1}" y1="${H - 16}" x2="${pX2}" y2="${H - 16}" stroke="var(--border-light)" stroke-width="1.2"/>`;
  svg += `<text x="${pX1}" y="${H - 3}" font-size="10" font-weight="600" fill="var(--text-muted)">${axisMin.toFixed(1)}</text>`;
  svg += `<text x="${xNull}" y="${H - 3}" text-anchor="middle" font-size="10" font-weight="800" fill="var(--text-muted)">1.0</text>`;
  svg += `<text x="${pX2}" y="${H - 3}" text-anchor="end" font-size="10" font-weight="600" fill="var(--text-muted)">${axisMax.toFixed(1)}</text>`;

  svg += `</svg>`;
  if (rawFullText && rawFullText !== items[0].rawText) {
    svg += `<div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">${escapeHtml(rawFullText)}</div>`;
  }
  svg += `</div>`;

  return svg;
}

function buildColumnChartSVG(colStr: string): string {
  const itemsRaw = colStr.split('|');
  const data: ColumnDataItem[] = [];
  const colors = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#7c3aed', '#0d9488'];

  itemsRaw.forEach((str, idx) => {
    const parts = str.split(/[:=]/);
    if (parts.length >= 2) {
      const label = parts[0].trim();
      const val = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
      if (!isNaN(val)) {
        data.push({ label, value: val, color: colors[idx % colors.length] });
      }
    }
  });

  if (data.length === 0) return `<div class="key-results-plain-text">${escapeHtml(colStr)}</div>`;

  const W = 460, H = 170, padB = 40, padT = 28, padL = 30, padR = 20;
  const maxVal = Math.max(...data.map(d => d.value)) * 1.25 || 10;
  const barW = Math.min(52, (W - padL - padR) / data.length - 16);

  let svg = `<div class="mini-chart-box" style="margin: 6px 0;"><svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" class="mini-col-svg">`;
  svg += `<line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="var(--border-light)" stroke-width="1.5"/>`;

  data.forEach((d, idx) => {
    const step = (W - padL - padR) / data.length;
    const cx = padL + idx * step + step / 2;
    const x = cx - barW / 2;
    const barH = (d.value / maxVal) * (H - padT - padB);
    const y = H - padB - barH;

    svg += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="${d.color}" rx="4"/>`;
    svg += `<text x="${cx}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="900" fill="var(--text)">${d.value}%</text>`;
    svg += `<text x="${cx}" y="${H - 12}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-muted)">${escapeHtml(d.label.length > 14 ? d.label.substring(0, 12) + '…' : d.label)}</text>`;
  });

  svg += `</svg></div>`;
  return svg;
}

function buildHBarChartSVG(hbarStr: string): string {
  const itemsRaw = hbarStr.split('|');
  const data: ColumnDataItem[] = [];
  const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0d9488'];

  itemsRaw.forEach((str, idx) => {
    const parts = str.split(/[:=]/);
    if (parts.length >= 2) {
      const label = parts[0].trim();
      const val = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
      if (!isNaN(val)) {
        data.push({ label, value: val, color: colors[idx % colors.length] });
      }
    }
  });

  if (data.length === 0) return `<div class="key-results-plain-text">${escapeHtml(hbarStr)}</div>`;

  const W = 460;
  const rowH = 32;
  const H = data.length * rowH + 16;
  const maxVal = Math.max(...data.map(d => d.value)) * 1.2 || 10;
  const pX = 140, pW = 240;

  let svg = `<div class="mini-chart-box" style="margin: 6px 0;"><svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" class="mini-hbar-svg">`;

  data.forEach((d, idx) => {
    const y = idx * rowH + 6;
    const bW = (d.value / maxVal) * pW;

    svg += `<text x="8" y="${y + 16}" font-size="11" font-weight="700" fill="var(--text)">${escapeHtml(d.label.length > 18 ? d.label.substring(0, 16) + '…' : d.label)}</text>`;
    svg += `<rect x="${pX}" y="${y + 3}" width="${pW}" height="14" fill="var(--surface-2)" rx="7"/>`;
    svg += `<rect x="${pX}" y="${y + 3}" width="${bW}" height="14" fill="${d.color}" rx="7"/>`;
    svg += `<text x="${pX + pW + 8}" y="${y + 15}" font-size="11.5" font-weight="900" fill="var(--text)">${d.value}%</text>`;
  });

  svg += `</svg></div>`;
  return svg;
}

function buildComparisonBarSVG(l1: string, v1: number, l2: string, v2: number, _fullText?: string): string {
  const W = 420, H = 75;
  const maxVal = Math.max(v1, v2) * 1.25 || 10;
  const barMaxW = 210;
  const w1 = (v1 / maxVal) * barMaxW;
  const w2 = (v2 / maxVal) * barMaxW;

  let svg = `<div class="mini-chart-box" style="margin: 6px 0;">`;
  svg += `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}">`;
  
  svg += `<text x="8" y="24" font-size="11" font-weight="700" fill="#16a34a">${escapeHtml(l1.length > 16 ? l1.substring(0, 14) + '…' : l1)}</text>`;
  svg += `<rect x="120" y="11" width="${barMaxW}" height="14" fill="var(--surface-2)" rx="7"/>`;
  svg += `<rect x="120" y="11" width="${w1}" height="14" fill="#16a34a" rx="7"/>`;
  svg += `<text x="${128 + barMaxW}" y="24" font-size="11.5" font-weight="900" fill="#16a34a">${v1}%</text>`;

  svg += `<text x="8" y="56" font-size="11" font-weight="700" fill="#dc2626">${escapeHtml(l2.length > 16 ? l2.substring(0, 14) + '…' : l2)}</text>`;
  svg += `<rect x="120" y="43" width="${barMaxW}" height="14" fill="var(--surface-2)" rx="7"/>`;
  svg += `<rect x="120" y="43" width="${w2}" height="14" fill="#dc2626" rx="7"/>`;
  svg += `<text x="${128 + barMaxW}" y="56" font-size="11.5" font-weight="900" fill="#dc2626">${v2}%</text>`;

  svg += `</svg>`;
  svg += `</div>`;

  return svg;
}

function buildDonutProgressSVG(label: string, pct: number, count: number | null, total: number | null, fullText?: string): string {
  const W = 380, H = 68;
  const cx = 34, cy = 34, r = 24, strokeW = 5.5;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  let svg = `<div class="mini-chart-box" style="display:flex; align-items:center; gap:12px; margin:6px 0;">`;
  svg += `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}">`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="var(--border-light)" stroke-width="${strokeW}" fill="none"/>`;
  svg += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="var(--accent)" stroke-width="${strokeW}" fill="none" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round" transform="rotate(-90 ${cx} ${cy})"/>`;
  svg += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="11.5" font-weight="900" fill="var(--accent)">${pct}%</text>`;

  svg += `<text x="74" y="30" font-size="12" font-weight="800" fill="var(--text)">${escapeHtml(label)}</text>`;
  if (count !== null && total !== null) {
    svg += `<text x="74" y="50" font-size="10.5" fill="var(--text-muted)">Đạt ${count} / ${total} bệnh nhân</text>`;
  } else {
    svg += `<text x="74" y="50" font-size="10.5" fill="var(--text-muted)">${escapeHtml(fullText || '')}</text>`;
  }

  svg += `</svg></div>`;
  return svg;
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

if (typeof window !== 'undefined') {
  window.renderStudyMiniChart = renderStudyMiniChart;
  window.renderSubgroupForestPlot = renderSubgroupForestPlot;
  window.renderKeyResultsChart = renderKeyResultsChart;
}
