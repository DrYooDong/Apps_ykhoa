/**
 * CliniPortal — Forest Plot SVG Renderer Engine (TypeScript)
 * Path: js/core/forest-plot-renderer.ts
 * 
 * Clinical Publishing Standard for Forest Plots in Landmark RCTs and Meta-Analyses.
 * Converts quantitative endpoint data into pure, responsive inline SVG graphics with 100% Dark Mode.
 */

export interface ForestPlotEndpoint {
  name: string;
  category?: 'primary' | 'secondary' | 'safety' | 'subgroup';
  hr: number;
  ciLow: number;
  ciHigh: number;
  pValue?: string;
  interventionEvents?: string;
  controlEvents?: string;
}

export interface ForestPlotOptions {
  title?: string;
  subtitle?: string;
  favorsInterventionLabel?: string;
  favorsControlLabel?: string;
  nullValue?: number;
  scaleMin?: number;
  scaleMax?: number;
  isLogScale?: boolean;
}

export class ForestPlotRenderer {
  /**
   * Tạo chuỗi SVG inline hoàn chỉnh cho danh sách endpoints
   */
  public static renderSvg(endpoints: ForestPlotEndpoint[], options: ForestPlotOptions = {}): string {
    if (!endpoints || !endpoints.length) return '';

    const title = options.title || 'Biểu Đồ Rừng (Forest Plot): Các Tiêu Chí Kết Cục Lâm Sàng';
    const favorsIntervention = options.favorsInterventionLabel || 'Nghiêng về Can thiệp';
    const favorsControl = options.favorsControlLabel || 'Nghiêng về Đối chứng';
    const nullVal = options.nullValue ?? 1.0;
    const isLog = options.isLogScale ?? true;

    // Tính toán giới hạn trục
    let minVal = options.scaleMin ?? 0.2;
    let maxVal = options.scaleMax ?? 2.2;

    endpoints.forEach(e => {
      if (e.ciLow > 0 && e.ciLow < minVal) minVal = Math.max(0.1, Math.floor(e.ciLow * 10) / 10);
      if (e.ciHigh > maxVal) maxVal = Math.ceil(e.ciHigh * 10) / 10;
    });

    // Layout Dimensions
    const width = 860;
    const rowHeight = 36;
    const headerHeight = 44;
    const footerHeight = 65;
    const rowsCount = endpoints.length;
    const height = headerHeight + rowsCount * rowHeight + footerHeight;

    // Columns X Coordinates
    const colNameX = 20;
    const colEventsX = 270;
    const plotStartX = 420;
    const plotEndX = 680;
    const plotWidth = plotEndX - plotStartX;
    const colStatsX = 705;
    const colPvalX = 805;

    // Scale mapping function
    const mapValToX = (val: number): number => {
      if (isLog) {
        const logMin = Math.log(minVal);
        const logMax = Math.log(maxVal);
        const clamped = Math.max(minVal, Math.min(maxVal, val));
        const ratio = (Math.log(clamped) - logMin) / (logMax - logMin);
        return plotStartX + ratio * plotWidth;
      } else {
        const ratio = (val - minVal) / (maxVal - minVal);
        return plotStartX + ratio * plotWidth;
      }
    };

    const nullX = mapValToX(nullVal);

    // Build Row Elements
    let rowsSvg = '';
    endpoints.forEach((ep, idx) => {
      const y = headerHeight + idx * rowHeight;
      const isPrimary = ep.category === 'primary' || idx === 0;
      const bgClass = idx % 2 === 0 ? 'row-bg-even' : 'row-bg-odd';

      const pointX = mapValToX(ep.hr);
      const lowX = mapValToX(ep.ciLow);
      const highX = mapValToX(ep.ciHigh);

      const isSignificant = (ep.ciLow > 1.0 || ep.ciHigh < 1.0) && ep.pValue && !ep.pValue.includes('ns');
      const pValClass = isSignificant ? 'text-sig' : 'text-muted';

      rowsSvg += `
        <!-- Row ${idx + 1}: ${ep.name} -->
        <g class="forest-plot-row" data-index="${idx}">
          <rect x="10" y="${y}" width="${width - 20}" height="${rowHeight}" class="${bgClass}" />
          
          <!-- Endpoint Name -->
          <text x="${colNameX}" y="${y + 22}" font-size="${isPrimary ? 13 : 12}" font-weight="${isPrimary ? '700' : '500'}" fill="currentColor">
            ${isPrimary ? '★ ' : ''}${this.escapeXml(ep.name)}
          </text>

          <!-- Events if available -->
          ${ep.interventionEvents ? `
            <text x="${colEventsX}" y="${y + 22}" font-size="11" class="text-muted" text-anchor="start">
              ${this.escapeXml(ep.interventionEvents)}${ep.controlEvents ? ' vs ' + this.escapeXml(ep.controlEvents) : ''}
            </text>
          ` : ''}

          <!-- CI Horizontal Bar -->
          <line x1="${lowX}" y1="${y + 18}" x2="${highX}" y1="${y + 18}" class="ci-line" />
          <line x1="${lowX}" y1="${y + 13}" x2="${lowX}" y2="${y + 23}" class="ci-line" />
          <line x1="${highX}" y1="${y + 13}" x2="${highX}" y2="${y + 23}" class="ci-line" />

          <!-- Marker Point (Square) -->
          <rect x="${pointX - (isPrimary ? 5 : 4)}" y="${y + 18 - (isPrimary ? 5 : 4)}" 
                width="${isPrimary ? 10 : 8}" height="${isPrimary ? 10 : 8}" 
                class="marker-square ${isPrimary ? 'primary' : ''}" />

          <!-- Value Text -->
          <text x="${colStatsX}" y="${y + 22}" font-size="11.5" font-family="var(--dsp-font-mono, monospace)" font-weight="600" fill="currentColor">
            ${ep.hr.toFixed(2)} (${ep.ciLow.toFixed(2)}–${ep.ciHigh.toFixed(2)})
          </text>

          <!-- p-value Text -->
          ${ep.pValue ? `
            <text x="${colPvalX}" y="${y + 22}" font-size="11" class="${pValClass}" font-family="var(--dsp-font-mono, monospace)">
              ${this.escapeXml(ep.pValue)}
            </text>
          ` : ''}
        </g>
      `;
    });

    // Axis Ticks (e.g., 0.25, 0.5, 0.75, 1.0, 1.5, 2.0)
    const tickValues = [0.25, 0.5, 0.75, 1.0, 1.5, 2.0].filter(v => v >= minVal && v <= maxVal);
    const axisY = headerHeight + rowsCount * rowHeight + 10;

    let ticksSvg = '';
    tickValues.forEach(tick => {
      const tx = mapValToX(tick);
      ticksSvg += `
        <line x1="${tx}" y1="${axisY}" x2="${tx}" y2="${axisY + 6}" class="axis-line" />
        <text x="${tx}" y="${axisY + 18}" font-size="10.5" font-family="var(--dsp-font-mono, monospace)" text-anchor="middle" class="text-muted">
          ${tick}
        </text>
      `;
    });

    return `
      <div class="forest-plot-card">
        <div class="forest-plot-header">
          <div class="forest-plot-title-wrap">
            <h4 class="forest-plot-title"><i class="fa-solid fa-chart-line" style="color: #6366f1; margin-right: 6px;"></i> ${this.escapeXml(title)}</h4>
            <span class="forest-plot-badge">Hazard Ratio &amp; 95% CI</span>
          </div>
          <span style="font-size:0.78rem; color:var(--dsp-text-secondary, #64748b);">Tỷ suất nguy hại &amp; Khoảng tin cậy</span>
        </div>

        <div class="forest-plot-canvas-wrapper">
          <svg class="forest-plot-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
            <!-- Header Labels -->
            <text x="${colNameX}" y="26" font-size="11.5" font-weight="700" class="text-muted">BIẾN CỐ / TIÊU CHÍ KẾT CỤC</text>
            <text x="${colEventsX}" y="26" font-size="11.5" font-weight="700" class="text-muted">BIẾN CỐ (CAN THIỆP vs ĐỐI CHỨNG)</text>
            <text x="${plotStartX + plotWidth / 2}" y="26" font-size="11.5" font-weight="700" class="text-muted" text-anchor="middle">BIỂU ĐỒ NGUY HẠI (HR / RR)</text>
            <text x="${colStatsX}" y="26" font-size="11.5" font-weight="700" class="text-muted">HR (95% CI)</text>
            <text x="${colPvalX}" y="26" font-size="11.5" font-weight="700" class="text-muted">GIÁ TRỊ p</text>

            <line x1="10" y1="36" x2="${width - 10}" y2="36" class="axis-line" />

            <!-- Vertical Null Line (1.0) -->
            <line x1="${nullX}" y1="38" x2="${nullX}" y2="${axisY}" class="null-line" />

            <!-- Rows -->
            ${rowsSvg}

            <!-- Bottom Axis Line -->
            <line x1="${plotStartX}" y1="${axisY}" x2="${plotEndX}" y2="${axisY}" class="axis-line" />
            ${ticksSvg}

            <!-- Directional Directional Labels -->
            <text x="${plotStartX + 20}" y="${axisY + 38}" font-size="11" font-weight="700" fill="#0284c7" text-anchor="start">
              ← ${this.escapeXml(favorsIntervention)}
            </text>
            <text x="${plotEndX - 20}" y="${axisY + 38}" font-size="11" font-weight="700" fill="#dc2626" text-anchor="end">
              ${this.escapeXml(favorsControl)} →
            </text>
          </svg>
        </div>

        <div class="forest-plot-legend">
          <div class="forest-plot-legend-item">
            <span style="display:inline-block; width:10px; height:10px; background:#0284c7; border-radius:2px;"></span>
            <span>Tiêu chí chính (Primary Endpoint)</span>
          </div>
          <div class="forest-plot-legend-item">
            <span style="display:inline-block; width:8px; height:8px; background:#6366f1; border-radius:2px;"></span>
            <span>Tiêu chí phụ (Secondary Endpoints)</span>
          </div>
          <div class="forest-plot-legend-item">
            <span style="display:inline-block; width:14px; height:2px; background:#ef4444; border-top:1px dashed #ef4444;"></span>
            <span>Đường ranh giới không khác biệt (1.0)</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Tự động trích xuất dữ liệu từ bảng .trial-endpoints-table để vẽ Forest Plot
   */
  public static extractFromTable(tableEl: HTMLTableElement): ForestPlotEndpoint[] {
    const endpoints: ForestPlotEndpoint[] = [];
    const rows = tableEl.querySelectorAll<HTMLTableRowElement>('tbody tr');

    rows.forEach(tr => {
      const cells = tr.querySelectorAll<HTMLTableCellElement>('td');
      if (cells.length < 4) return;

      const name = cells[0]?.textContent?.trim() || '';
      const expEvents = cells[1]?.textContent?.trim() || '';
      const ctrlEvents = cells[2]?.textContent?.trim() || '';
      const statsText = cells[3]?.textContent?.trim() || '';
      const pvalText = cells[4]?.textContent?.trim() || '';

      // Phân tích biểu thức HR (e.g. "HR 0.86 (95% CI 0.74–0.99)" or "HR 0.62 (0.49-0.77)")
      const hrMatch = statsText.match(/HR\s*([0-9.]+)\s*(?:\([^0-9.]*([0-9.]+)\s*[-–—,]\s*([0-9.]+)\))?/i);
      if (hrMatch) {
        const hr = parseFloat(hrMatch[1]);
        const ciLow = hrMatch[2] ? parseFloat(hrMatch[2]) : hr * 0.85;
        const ciHigh = hrMatch[3] ? parseFloat(hrMatch[3]) : hr * 1.15;
        const isPrimary = tr.classList.contains('endpoint-primary');

        endpoints.push({
          name,
          category: isPrimary ? 'primary' : 'secondary',
          hr,
          ciLow,
          ciHigh,
          pValue: pvalText,
          interventionEvents: expEvents,
          controlEvents: ctrlEvents
        });
      }
    });

    return endpoints;
  }

  private static escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}

/**
 * Hàm quét và nạp Forest Plot cho bài đọc
 */
export function hydrateForestPlots(mountEl?: HTMLElement | null): void {
  const container = mountEl || document;

  // 1. Quét các thẻ có thuộc tính data-forest-plot hoặc class .forest-plot-widget
  const plotContainers = container.querySelectorAll<HTMLElement>('.forest-plot-widget, [data-forest-plot]');
  plotContainers.forEach(el => {
    if (el.dataset.forestHydrated) return;
    el.dataset.forestHydrated = 'true';

    try {
      const rawData = el.dataset.endpoints || el.getAttribute('data-forest-plot') || '';
      if (rawData) {
        const endpoints = JSON.parse(rawData) as ForestPlotEndpoint[];
        const title = el.dataset.title || '';
        el.innerHTML = ForestPlotRenderer.renderSvg(endpoints, { title });
      }
    } catch (e) {
      console.warn('[ForestPlot] Failed to parse endpoint JSON', e);
    }
  });

  // 2. Tự động bổ sung Forest Plot cho các bảng .trial-endpoints-table có class hoặc flag
  const endpointTables = container.querySelectorAll<HTMLTableElement>('table.trial-endpoints-table');
  endpointTables.forEach(table => {
    if (table.dataset.forestGenerated) return;
    table.dataset.forestGenerated = 'true';

    const endpoints = ForestPlotRenderer.extractFromTable(table);
    if (endpoints.length >= 2) {
      const plotWrapper = document.createElement('div');
      plotWrapper.className = 'table-forest-plot-companion';
      plotWrapper.innerHTML = ForestPlotRenderer.renderSvg(endpoints, {
        title: 'Biểu Đồ Rừng (Forest Plot): Phân Tích Các Tiêu Chí Kết Cục Nghiên Cứu'
      });

      // Chèn ngay phía trên hoặc dưới bảng
      table.closest('.table-wrap, .table-responsive, table')?.insertAdjacentElement('beforebegin', plotWrapper);
    }
  });
}
