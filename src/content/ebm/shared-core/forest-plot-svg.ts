/**
 * CliniPortal 2.0 — Cross-Study & Endpoint Forest Plot SVG Engine
 * Path: src/content/ebm/shared-core/forest-plot-svg.ts
 *
 * Pure SVG generator using CSS Design Tokens (100% Dark Mode adaptive, zero external libs).
 * Supports plotting multiple studies side-by-side on a shared logarithmic or linear axis.
 */

export interface ComparativeForestPoint {
  id: string;
  label: string;
  sublabel?: string;
  measure: string; // HR | RR | OR
  estimate: number;
  ciLower: number;
  ciUpper: number;
  sampleSize?: number | null;
  pValue?: string;
  direction?: 'positive-superior' | 'non-inferior' | 'neutral-null' | 'harm-negative' | 'mixed-coprimary' | string;
}

export interface ComparativeForestOptions {
  title?: string;
  subtitle?: string;
  favorsLeftLabel?: string;
  favorsRightLabel?: string;
  nullValue?: number;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderCrossStudyForestPlotSvg(
  points: ComparativeForestPoint[],
  options: ComparativeForestOptions = {}
): string {
  const validPoints = points.filter(
    (p) =>
      typeof p.estimate === 'number' &&
      !Number.isNaN(p.estimate) &&
      p.estimate > 0 &&
      typeof p.ciLower === 'number' &&
      p.ciLower > 0 &&
      typeof p.ciUpper === 'number' &&
      p.ciUpper > 0
  );

  if (validPoints.length === 0) {
    return '';
  }

  const nullVal = options.nullValue ?? 1.0;
  const title = options.title || 'Biểu Đồ Rừng Đối Sánh Hiệu Quả Định Lượng (Cross-Study Forest Plot)';
  const subtitle =
    options.subtitle ||
    'Kích thước ô vuông tỷ lệ với cỡ mẫu nghiên cứu (N) • Đường đứt nét tại 1.0 biểu thị ngưỡng không khác biệt';
  const favorsLeft = options.favorsLeftLabel || '← Nghiêng về Can thiệp (Có lợi)';
  const favorsRight = options.favorsRightLabel || 'Nghiêng về Đối chứng / Bất lợi →';

  let minVal = 0.25;
  let maxVal = 2.0;
  for (const pt of validPoints) {
    if (pt.ciLower < minVal) minVal = Math.max(0.08, Math.floor(pt.ciLower * 10) / 10);
    if (pt.ciUpper > maxVal) maxVal = Math.min(8.0, Math.ceil(pt.ciUpper * 10) / 10);
  }

  const maxSample = Math.max(...validPoints.map((p) => p.sampleSize || 500), 1000);

  const width = 920;
  const headerH = 68;
  const rowH = 48;
  const footerH = 64;
  const height = headerH + validPoints.length * rowH + footerH;

  const colStudyX = 20;
  const colSampleX = 285;
  const plotLeft = 365;
  const plotRight = 665;
  const plotWidth = plotRight - plotLeft;
  const colEstX = 688;
  const colPValX = 835;

  const mapX = (val: number): number => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    const ratio = (Math.log(clamped) - Math.log(minVal)) / (Math.log(maxVal) - Math.log(minVal));
    return plotLeft + ratio * plotWidth;
  };

  const nullX = mapX(nullVal);
  const ticks = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0, 3.0].filter((t) => t >= minVal && t <= maxVal);

  let rowsSvg = '';
  validPoints.forEach((pt, idx) => {
    const y = headerH + idx * rowH;
    const centerY = y + rowH / 2;
    const estX = mapX(pt.estimate);
    const lowX = mapX(pt.ciLower);
    const highX = mapX(pt.ciUpper);

    const nRatio = Math.sqrt((pt.sampleSize || 400) / maxSample);
    const boxSize = Math.max(8, Math.min(16, Math.round(8 + nRatio * 8)));

    const isBeneficial = pt.ciUpper < nullVal || pt.direction === 'positive-superior';
    const isHarm = pt.ciLower > nullVal || pt.direction === 'harm-negative';
    const pointClass = isBeneficial
      ? 'res-fp-point-pos'
      : isHarm
        ? 'res-fp-point-neg'
        : 'res-fp-point-neu';

    const shortLabel = pt.label.length > 36 ? `${pt.label.slice(0, 34)}…` : pt.label;
    const estString = `${pt.measure} ${pt.estimate.toFixed(2)} (${pt.ciLower.toFixed(2)}–${pt.ciUpper.toFixed(2)})`;

    rowsSvg += `
      <g class="res-fp-row">
        <rect x="12" y="${y}" width="${width - 24}" height="${rowH - 4}" rx="8" class="${
          idx % 2 === 0 ? 'res-fp-row-even' : 'res-fp-row-odd'
        }" />
        <text x="${colStudyX}" y="${y + 20}" class="res-fp-study-name">${escapeXml(shortLabel)}</text>
        ${
          pt.sublabel
            ? `<text x="${colStudyX}" y="${y + 36}" class="res-fp-study-sub">${escapeXml(pt.sublabel)}</text>`
            : ''
        }
        <text x="${colSampleX}" y="${centerY + 4}" class="res-fp-mono">${
          pt.sampleSize ? `N=${pt.sampleSize.toLocaleString('en-US')}` : '—'
        }</text>
        <line x1="${lowX.toFixed(1)}" y1="${centerY}" x2="${highX.toFixed(1)}" y2="${centerY}" class="res-fp-ci-line" />
        <line x1="${lowX.toFixed(1)}" y1="${centerY - 5}" x2="${lowX.toFixed(1)}" y2="${centerY + 5}" class="res-fp-ci-cap" />
        <line x1="${highX.toFixed(1)}" y1="${centerY - 5}" x2="${highX.toFixed(1)}" y2="${centerY + 5}" class="res-fp-ci-cap" />
        <rect x="${(estX - boxSize / 2).toFixed(1)}" y="${(centerY - boxSize / 2).toFixed(
          1
        )}" width="${boxSize}" height="${boxSize}" rx="3" class="${pointClass}" />
        <text x="${colEstX}" y="${centerY + 4}" class="res-fp-mono-bold">${escapeXml(estString)}</text>
        <text x="${colPValX}" y="${centerY + 4}" class="res-fp-pval ${
          isBeneficial ? 'is-sig' : ''
        }">${escapeXml(pt.pValue ? `p=${pt.pValue.replace(/^p\s*[=<>]\s*/i, '')}` : '—')}</text>
      </g>
    `;
  });

  const ticksSvg = ticks
    .map((t) => {
      const tx = mapX(t);
      return `
        <line x1="${tx.toFixed(1)}" y1="${height - footerH + 6}" x2="${tx.toFixed(1)}" y2="${
          height - footerH + 12
        }" class="res-fp-axis-tick" />
        <text x="${tx.toFixed(1)}" y="${height - footerH + 26}" text-anchor="middle" class="res-fp-tick-lbl">${t}</text>
      `;
    })
    .join('');

  return `
    <div class="res-forest-plot-card">
      <svg class="res-forest-svg" viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${escapeXml(title)}">
        <text x="20" y="26" class="res-fp-title">${escapeXml(title)}</text>
        <text x="20" y="45" class="res-fp-subtitle">${escapeXml(subtitle)}</text>
        <line x1="12" y1="${headerH - 8}" x2="${width - 12}" y2="${headerH - 8}" class="res-fp-divider" />

        <line x1="${nullX.toFixed(1)}" y1="${headerH - 4}" x2="${nullX.toFixed(1)}" y2="${
          height - footerH + 6
        }" class="res-fp-null-line" />

        ${rowsSvg}

        <line x1="${plotLeft}" y1="${height - footerH + 6}" x2="${plotRight}" y2="${
          height - footerH + 6
        }" class="res-fp-axis-line" />
        ${ticksSvg}

        <text x="${nullX - 10}" y="${height - 14}" text-anchor="end" class="res-fp-favor-left">${escapeXml(favorsLeft)}</text>
        <text x="${nullX + 10}" y="${height - 14}" text-anchor="start" class="res-fp-favor-right">${escapeXml(favorsRight)}</text>
      </svg>
    </div>
  `;
}
