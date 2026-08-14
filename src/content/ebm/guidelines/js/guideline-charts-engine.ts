/**
 * Guideline Mini Charts & SVG Visualizer Engine (guideline-charts-engine.ts)
 * Path: src/content/ebm/guidelines/js/guideline-charts-engine.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface ParsedMetric {
  label: string;
  metric: string;
  val: number;
  low: number;
  high: number;
}

export class GuidelineChartsEngine {
  public static parseForestMetric(text: string, label: string): ParsedMetric | null {
    if (!text) return null;
    const match = text.match(/(HR|OR|RR)\s*[:=]?\s*(\d+(?:\.\d+)?)\s*(?:\[|95%\s*CI:?\s*\(?)?\s*(\d+(?:\.\d+)?)\s*[-–,]\s*(\d+(?:\.\d+)?)/i);
    if (!match) return null;

    return {
      label,
      metric: match[1].toUpperCase(),
      val: parseFloat(match[2]),
      low: parseFloat(match[3]),
      high: parseFloat(match[4])
    };
  }

  public static buildForestPlotSVG(items: ParsedMetric[], title = 'Phân tích Rủi ro (Forest Plot)'): string {
    if (!items.length) return '';

    const rowH = 32;
    const headerH = 35;
    const footerH = 35;
    const totalH = headerH + items.length * rowH + footerH;
    const W = 420;

    let svg = `<svg viewBox="0 0 ${W} ${totalH}" style="width:100%; height:auto; background:var(--color-surface); border-radius:8px; border:1px solid var(--color-divider); margin:8px 0; font-family:'Plus Jakarta Sans', sans-serif;">`;
    svg += `<text x="12" y="22" font-size="11" font-weight="700" fill="var(--color-primary)">${title}</text>`;

    // Null line at center (X=260)
    const nullX = 260;
    svg += `<line x1="${nullX}" y1="30" x2="${nullX}" y2="${totalH - 25}" stroke="#94a3b8" stroke-dasharray="3,3" />`;

    items.forEach((item, idx) => {
      const y = headerH + idx * rowH + 18;
      const xVal = nullX + (item.val - 1.0) * 100;
      const xLow = nullX + (item.low - 1.0) * 100;
      const xHigh = nullX + (item.high - 1.0) * 100;

      svg += `<text x="12" y="${y + 4}" font-size="10" fill="var(--color-text)">${item.label.substring(0, 24)}</text>`;
      svg += `<line x1="${Math.max(160, xLow)}" y1="${y}" x2="${Math.min(W - 10, xHigh)}" y2="${y}" stroke="#0284c7" stroke-width="2" />`;
      svg += `<rect x="${xVal - 4}" y="${y - 4}" width="8" height="8" fill="#0284c7" rx="1" />`;
    });

    svg += `</svg>`;
    return svg;
  }

  public static renderStudyMiniChart(study: any): string {
    if (!study) return '';
    if (study.subgroups) {
      const items: ParsedMetric[] = [];
      Object.keys(study.subgroups).forEach(label => {
        const parsed = this.parseForestMetric(String(study.subgroups[label]), label);
        if (parsed) items.push(parsed);
      });
      if (items.length) return this.buildForestPlotSVG(items, 'Subgroup Analysis');
    }

    if (study.keyResults) {
      const parsed = this.parseForestMetric(study.keyResults, 'Chỉ số chính');
      if (parsed) return this.buildForestPlotSVG([parsed], 'Hiệu quả Can thiệp');
    }

    return '';
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineChartsEngine = GuidelineChartsEngine;
}
