/**
 * Smart Guideline Recommender Engine (smart-recommender.ts)
 * Path: src/simulators/smart-recommender.ts
 */

export interface RecommendationCatalogItem {
  id: string;
  title: string;
  specialty: string;
  specName: string;
  desc: string;
  url: string;
}

export const RECOMMENDATION_CATALOG: RecommendationCatalogItem[] = [
  {
    id: "rec1",
    title: "Kháng Sinh Trong Hồi Sức Tích Cực (ICU)",
    specialty: "infect",
    specName: "Truyền Nhiễm / Hồi Sức",
    desc: "Tối ưu hóa liều nạp, truyền kéo dài Beta-lactam & hiệu chỉnh liều theo PK/PD.",
    url: "#/ebm/kho-guidelines/2026-icu-khang-sinh-cho-bn-nang"
  },
  {
    id: "rec2",
    title: "Bộ Tứ Trụ Cột Điều Trị Suy Tim (VNHA/VCS)",
    specialty: "cardio",
    specName: "Tim Mạch",
    desc: "Khuyến cáo Class I-A cho ARNI, Chẹn beta, MRA & SGLT2i.",
    url: "src/content/ebm/guideline-radar/radar.html"
  }
];

export function initSmartRecommender(): void {
  const container = document.getElementById("smart-recommendations-container");
  if (!container) return;

  let html = `
    <div style="margin-top: 2rem;">
      <h3 style="font-size:1.1rem; color:var(--color-primary); font-weight:800; margin-bottom:1rem;">
        ✨ Gợi Ý Chứng Cứ Dành Cho Bạn
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
  `;

  RECOMMENDATION_CATALOG.forEach((item) => {
    html += `
      <a href="${item.url}" style="background:var(--color-surface); padding:1rem; border-radius:10px; border:1px solid var(--color-divider); text-decoration:none; display:block;">
        <span style="color:var(--color-primary); font-weight:700; font-size:0.8rem;">📌 ${item.specName}</span>
        <div style="font-weight:700; color:var(--color-text); margin:4px 0;">${item.title}</div>
        <div style="font-size:0.8rem; color:var(--color-text-muted);">${item.desc}</div>
      </a>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initSmartRecommender);
  } else {
    initSmartRecommender();
  }
}
