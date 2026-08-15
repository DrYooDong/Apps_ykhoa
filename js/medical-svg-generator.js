/**
 * CliniPortal Medical SVG Generator
 * Pure Vanilla JavaScript Helper to generate editorial-grade medical SVGs
 * No external dependencies. 100% compatible with CSS Variables and Dark Mode.
 */

const MedicalSVG = {
    /**
     * Generate 2x2 Clinical Risk Stratification Matrix (Quadrant)
     */
    createQuadrant({
        title = "Ma Trận Phân Tầng Nguy Cơ",
        xAxisLabel = "XÁC SUẤT TIỀN NGHIỆM ➔",
        yAxisLabel = "MỨC ĐỘ NGUY KỊCH ➔",
        topLeft = { title: "⚠️ NGUY CƠ CAO ẨN KHUẤT", desc: "Tầm soát chuyên sâu", color: "var(--color-warning)" },
        topRight = { title: "🚨 CẤP CỨU TỐI KHẨN", desc: "Xử trí hồi sức ngay", color: "var(--color-danger)" },
        bottomLeft = { title: "✅ XUẤT VIỆN AN TOÀN", desc: "Chăm sóc ban đầu ngoại trú", color: "var(--color-success)" },
        bottomRight = { title: "📋 ĐIỀU TRỊ CHUẨN", desc: "Theo dõi & điều trị định kỳ", color: "var(--color-primary)" }
    } = {}) {
        return `
<svg class="med-svg" viewBox="0 0 800 500" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="500" fill="var(--color-surface)" rx="12" stroke="var(--color-border)" stroke-width="1"/>
    
    <!-- Top-Left -->
    <rect x="60" y="40" width="330" height="195" fill="var(--color-warning-hl)" fill-opacity="0.25" rx="8" stroke="var(--color-divider)"/>
    <text x="80" y="70" font-size="13" font-weight="700" fill="${topLeft.color}">${topLeft.title}</text>
    <text x="80" y="95" font-size="11" font-weight="500" fill="var(--color-text)">${topLeft.desc}</text>

    <!-- Top-Right -->
    <rect x="410" y="40" width="330" height="195" fill="var(--color-danger-hl)" fill-opacity="0.35" rx="8" stroke="${topRight.color}" stroke-width="1.5"/>
    <text x="430" y="70" font-size="13" font-weight="800" fill="${topRight.color}">${topRight.title}</text>
    <text x="430" y="95" font-size="11" font-weight="600" fill="var(--color-text)">${topRight.desc}</text>

    <!-- Bottom-Left -->
    <rect x="60" y="255" width="330" height="195" fill="var(--color-success-hl)" fill-opacity="0.3" rx="8" stroke="var(--color-divider)"/>
    <text x="80" y="285" font-size="13" font-weight="700" fill="${bottomLeft.color}">${bottomLeft.title}</text>
    <text x="80" y="310" font-size="11" font-weight="500" fill="var(--color-text)">${bottomLeft.desc}</text>

    <!-- Bottom-Right -->
    <rect x="410" y="255" width="330" height="195" fill="var(--color-primary-hl)" fill-opacity="0.3" rx="8" stroke="var(--color-divider)"/>
    <text x="430" y="285" font-size="13" font-weight="700" fill="${bottomRight.color}">${bottomRight.title}</text>
    <text x="430" y="310" font-size="11" font-weight="500" fill="var(--color-text)">${bottomRight.desc}</text>

    <!-- Axes -->
    <line x1="60" y1="245" x2="740" y2="245" stroke="var(--color-border)" stroke-width="2"/>
    <line x1="400" y1="40" x2="400" y2="450" stroke="var(--color-border)" stroke-width="2"/>

    <!-- Labels -->
    <text x="400" y="480" font-size="11" font-weight="700" fill="var(--color-text)" text-anchor="middle">${xAxisLabel}</text>
    <text x="30" y="245" font-size="11" font-weight="700" fill="var(--color-text)" text-anchor="middle" transform="rotate(-90 30 245)">${yAxisLabel}</text>
</svg>`;
    },

    /**
     * Generate Layer Stack Diagram (e.g. WHO Pain ladder, GINA steps)
     */
    createLayerStack({
        layers = [
            { step: "BẬC 3 (ĐAU NẶNG)", title: "Opioid Mạnh ± Thuốc Hỗ Trợ", desc: "Morphine, Fentanyl (NRS 7-10)", color: "var(--color-rose)", hl: "var(--color-rose-hl)" },
            { step: "BẬC 2 (ĐAU VỪA)", title: "Opioid Yếu ± Non-Opioid", desc: "Codeine, Tramadol (NRS 4-6)", color: "var(--color-warning)", hl: "var(--color-warning-hl)" },
            { step: "BẬC 1 (ĐAU NHẸ)", title: "Thuốc Không-Opioid", desc: "Paracetamol, NSAIDs (NRS 1-3)", color: "var(--color-teal)", hl: "var(--color-teal-hl)" }
        ]
    } = {}) {
        const height = layers.length * 115 + 60;
        let layerElements = layers.map((l, idx) => {
            const y = 30 + idx * 110;
            return `
        <g>
            <rect x="40" y="${y}" width="720" height="95" rx="8" fill="${l.hl || 'var(--color-surface-2)'}" stroke="${l.color}" stroke-width="1.5"/>
            <rect x="55" y="${y + 15}" width="130" height="28" rx="4" fill="${l.color}"/>
            <text x="120" y="${y + 34}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${l.step}</text>
            <text x="200" y="${y + 34}" font-size="14" font-weight="700" fill="var(--color-text)">${l.title}</text>
            <text x="55" y="${y + 70}" font-size="12" fill="var(--color-text-muted)">• ${l.desc}</text>
        </g>`;
        }).join('\n');

        return `
<svg class="med-svg" viewBox="0 0 800 ${height}" width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="${height}" fill="var(--color-surface)" rx="12" stroke="var(--color-border)" stroke-width="1"/>
    ${layerElements}
</svg>`;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MedicalSVG;
}
