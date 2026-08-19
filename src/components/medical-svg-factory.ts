/**
 * CliniPortal Medical SVG Factory
 * Pure Vanilla SVG Generator with CSS Variable Tokens & 100% Dark Mode Compatibility.
 * No external dependencies (Mermaid/Chart.js free).
 */

export interface QuadrantItem {
  title: string;
  desc: string;
  color: string;
}

export interface QuadrantOptions {
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  topLeft?: QuadrantItem;
  topRight?: QuadrantItem;
  bottomLeft?: QuadrantItem;
  bottomRight?: QuadrantItem;
}

export interface LayerItem {
  step: string;
  title: string;
  desc: string;
  color: string;
  hl?: string;
}

export interface LayerStackOptions {
  layers?: LayerItem[];
}

export interface PyramidTier {
  level: string;
  label: string;
  color: string;
  count?: string;
}

export interface EmergencyLoopStep {
  stepNumber: number;
  title: string;
  action: string;
  color: string;
}

export class MedicalSVGFactory {
  /**
   * Sinh Ma trận Phân tầng Nguy cơ 2x2 (Risk Stratification Matrix)
   */
  public static createQuadrant(options: QuadrantOptions = {}): string {
    const {
      xAxisLabel = "XÁC SUẤT TIỀN NGHIỆM ➔",
      yAxisLabel = "MỨC ĐỘ NGUY KỊCH ➔",
      topLeft = { title: "⚠️ NGUY CƠ CAO ẨN KHUẤT", desc: "Tầm soát chuyên sâu", color: "var(--color-warning)" },
      topRight = { title: "🚨 CẤP CỨU TỐI KHẨN", desc: "Xử trí hồi sức ngay", color: "var(--color-danger)" },
      bottomLeft = { title: "✅ XUẤT VIỆN AN TOÀN", desc: "Chăm sóc ban đầu ngoại trú", color: "var(--color-success)" },
      bottomRight = { title: "📋 ĐIỀU TRỊ CHUẨN", desc: "Theo dõi & điều trị định kỳ", color: "var(--color-primary)" }
    } = options;

    return `
<svg class="med-svg" viewBox="0 0 800 500" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="500" fill="var(--color-surface)" rx="12" stroke="var(--color-border)" stroke-width="1"/>
    
    <!-- Top-Left -->
    <rect x="60" y="40" width="330" height="195" fill="var(--color-warning-hl, rgba(245, 158, 11, 0.15))" fill-opacity="0.25" rx="8" stroke="var(--color-divider, #334155)"/>
    <text x="80" y="70" font-size="13" font-weight="700" fill="${topLeft.color}">${topLeft.title}</text>
    <text x="80" y="95" font-size="11" font-weight="500" fill="var(--color-text)">${topLeft.desc}</text>

    <!-- Top-Right -->
    <rect x="410" y="40" width="330" height="195" fill="var(--color-danger-hl, rgba(239, 68, 68, 0.15))" fill-opacity="0.35" rx="8" stroke="${topRight.color}" stroke-width="1.5"/>
    <text x="430" y="70" font-size="13" font-weight="800" fill="${topRight.color}">${topRight.title}</text>
    <text x="430" y="95" font-size="11" font-weight="600" fill="var(--color-text)">${topRight.desc}</text>

    <!-- Bottom-Left -->
    <rect x="60" y="255" width="330" height="195" fill="var(--color-success-hl, rgba(16, 185, 129, 0.15))" fill-opacity="0.3" rx="8" stroke="var(--color-divider, #334155)"/>
    <text x="80" y="285" font-size="13" font-weight="700" fill="${bottomLeft.color}">${bottomLeft.title}</text>
    <text x="80" y="310" font-size="11" font-weight="500" fill="var(--color-text)">${bottomLeft.desc}</text>

    <!-- Bottom-Right -->
    <rect x="410" y="255" width="330" height="195" fill="var(--color-primary-hl, rgba(2, 132, 199, 0.15))" fill-opacity="0.3" rx="8" stroke="var(--color-divider, #334155)"/>
    <text x="430" y="285" font-size="13" font-weight="700" fill="${bottomRight.color}">${bottomRight.title}</text>
    <text x="430" y="310" font-size="11" font-weight="500" fill="var(--color-text)">${bottomRight.desc}</text>

    <!-- Axes -->
    <line x1="60" y1="245" x2="740" y2="245" stroke="var(--color-border)" stroke-width="2"/>
    <line x1="400" y1="40" x2="400" y2="450" stroke="var(--color-border)" stroke-width="2"/>

    <!-- Labels -->
    <text x="400" y="480" font-size="11" font-weight="700" fill="var(--color-text)" text-anchor="middle">${xAxisLabel}</text>
    <text x="30" y="245" font-size="11" font-weight="700" fill="var(--color-text)" text-anchor="middle" transform="rotate(-90 30 245)">${yAxisLabel}</text>
</svg>`;
  }

  /**
   * Sinh Sơ đồ Chồng tầng Bậc thang (Layer Stack Diagram: WHO Pain Ladder, GINA Steps...)
   */
  public static createLayerStack(options: LayerStackOptions = {}): string {
    const {
      layers = [
        { step: "BẬC 3 (ĐAU NẶNG)", title: "Opioid Mạnh ± Thuốc Hỗ Trợ", desc: "Morphine, Fentanyl (NRS 7-10)", color: "var(--color-danger, #ef4444)", hl: "var(--color-danger-hl, rgba(239, 68, 68, 0.15))" },
        { step: "BẬC 2 (ĐAU VỪA)", title: "Opioid Yếu ± Non-Opioid", desc: "Codeine, Tramadol (NRS 4-6)", color: "var(--color-warning, #f59e0b)", hl: "var(--color-warning-hl, rgba(245, 158, 11, 0.15))" },
        { step: "BẬC 1 (ĐAU NHẸ)", title: "Thuốc Không-Opioid", desc: "Paracetamol, NSAIDs (NRS 1-3)", color: "var(--color-teal, #14b8a6)", hl: "var(--color-teal-hl, rgba(20, 184, 166, 0.15))" }
      ]
    } = options;

    const height = layers.length * 115 + 60;
    const layerElements = layers.map((l, idx) => {
      const y = 30 + idx * 110;
      return `
        <g>
            <rect x="40" y="${y}" width="720" height="95" rx="8" fill="${l.hl || 'var(--color-surface-2, #1e293b)'}" stroke="${l.color}" stroke-width="1.5"/>
            <rect x="55" y="${y + 15}" width="140" height="28" rx="4" fill="${l.color}"/>
            <text x="125" y="${y + 34}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${l.step}</text>
            <text x="210" y="${y + 34}" font-size="14" font-weight="700" fill="var(--color-text)">${l.title}</text>
            <text x="55" y="${y + 70}" font-size="12" fill="var(--color-text-muted)">• ${l.desc}</text>
        </g>`;
    }).join('\n');

    return `
<svg class="med-svg" viewBox="0 0 800 ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="${height}" fill="var(--color-surface)" rx="12" stroke="var(--color-border)" stroke-width="1"/>
    ${layerElements}
</svg>`;
  }

  /**
   * Sinh Kim tự tháp Bằng chứng EBM (Evidence Pyramid)
   */
  public static createEvidencePyramid(tiers: PyramidTier[] = []): string {
    const defaultTiers: PyramidTier[] = [
      { level: '1', label: 'Systematic Reviews & Meta-Analyses (SR/MA)', color: '#8b5cf6', count: 'Mức 1A' },
      { level: '2', label: 'Randomized Controlled Trials (RCTs)', color: '#3b82f6', count: 'Mức 1B' },
      { level: '3', label: 'Cohort Studies / Case-Control', color: '#10b981', count: 'Mức 2A/2B' },
      { level: '4', label: 'Case Series & Case Reports', color: '#f59e0b', count: 'Mức 3' },
      { level: '5', label: 'Expert Opinion & In Vitro / Animal Research', color: '#64748b', count: 'Mức 4/5' }
    ];

    const activeTiers = tiers.length > 0 ? tiers : defaultTiers;
    const height = 450;
    const width = 800;
    const tierHeight = (height - 80) / activeTiers.length;

    const tierSvg = activeTiers.map((t, idx) => {
      const topWidth = 200 + (idx * (560 / activeTiers.length));
      const bottomWidth = 200 + ((idx + 1) * (560 / activeTiers.length));
      const yTop = 40 + idx * tierHeight;
      const yBottom = yTop + tierHeight;

      const xTopLeft = (width - topWidth) / 2;
      const xTopRight = (width + topWidth) / 2;
      const xBottomLeft = (width - bottomWidth) / 2;
      const xBottomRight = (width + bottomWidth) / 2;

      return `
        <g>
          <polygon points="${xTopLeft},${yTop} ${xTopRight},${yTop} ${xBottomRight},${yBottom - 4} ${xBottomLeft},${yBottom - 4}" 
                   fill="${t.color}" fill-opacity="0.85" stroke="var(--color-surface)" stroke-width="2"/>
          <text x="${width / 2}" y="${yTop + tierHeight / 2 + 5}" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">
            ${t.label} ${t.count ? `(${t.count})` : ''}
          </text>
        </g>
      `;
    }).join('\n');

    return `
<svg class="med-svg" viewBox="0 0 ${width} ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="var(--color-surface)" rx="12" stroke="var(--color-border)" stroke-width="1"/>
    ${tierSvg}
</svg>`;
  }
}

export const medicalSVGFactory = MedicalSVGFactory;

if (typeof window !== 'undefined') {
  (window as any).MedicalSVG = MedicalSVGFactory;
}
