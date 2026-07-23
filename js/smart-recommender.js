/* ============================================================
   SMART GUIDELINE RECOMMENDER ENGINE
   Location: js/smart-recommender.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initSmartRecommender();
});

const RECOMMENDATION_CATALOG = [
  {
    id: "rec1",
    title: "Kháng Sinh Trong Hồi Sức Tích Cực (ICU) 2026",
    specialty: "infect",
    specName: "Truyền Nhiễm / Hồi Sức",
    desc: "Tối ưu hóa liều nạp, truyền kéo dài Beta-lactam & hiệu chỉnh liều theo PK/PD.",
    url: "pages/Y học chứng cứ/Guidelines/Kho Guidelines/ks-cho-bn-nang.html"
  },
  {
    title: "Bộ Tứ Trụ Cột Điều Trị Suy Tim (VNHA/VCS)",
    specialty: "cardio",
    specName: "Tim Mạch",
    desc: "Khuyến cáo Class I-A cho ARNI, Chẹn beta, MRA & SGLT2i.",
    url: "pages/Y học chứng cứ/Guideline Radar/radar.html"
  },
  {
    title: "Hướng Dẫn BPTNMT (COPD) Bộ Y Tế 2026",
    specialty: "pulmo",
    specName: "Hô Hấp",
    desc: "Quyết định 2131/QĐ-BYT, phân nhóm ABE và tiêu chuẩn Rome 2022.",
    url: "pages/Y học chứng cứ/Guidelines/Kho Guidelines/byt-copd-2026.html"
  },
  {
    title: "Thử Nghiệm EMPA-REG OUTCOME",
    specialty: "cardio",
    specName: "Tim Mạch / Nội Tiết",
    desc: "Empagliflozin giảm 38% tử vong do tim mạch ở BN đái tháo đường.",
    url: "pages/Y học chứng cứ/Guidelines/Kho Guidelines/empa-reg.html"
  }
];

function initSmartRecommender() {
  const container = document.getElementById("smart-recommendations-container");
  if (!container) return;

  const depth = typeof getPathDepthPrefix === "function" ? getPathDepthPrefix() : "./";

  let html = `
    <div style="margin-top: 2rem;">
      <h3 class="pulse-section-title"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--pulse-purple);"></i> Gợi Ý Chứng Cứ Dành Cho Bạn</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 1rem; margin-top: 0.85rem;">
  `;

  RECOMMENDATION_CATALOG.forEach((item) => {
    html += `
      <a href="${depth}${item.url}" class="pulse-action-card">
        <span class="pulse-action-sub" style="color: var(--pulse-purple); font-weight: 700;">📌 ${item.specName}</span>
        <div class="pulse-action-title">${item.title}</div>
        <div class="pulse-action-sub">${item.desc}</div>
      </a>
    `;
  });

  html += `</div></div>`;
  container.innerHTML = html;
}
