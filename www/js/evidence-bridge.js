/* ============================================================
   EVIDENCE BRIDGE SYSTEM — CROSS-MODULE LOGIC
   Location: js/evidence-bridge.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initEvidenceBridge();
});

const EVIDENCE_DATABASE = {
  "class-1a": {
    badgeText: "🔬 Class I-A (ESC/ACC)",
    badgeClass: "class-1a",
    title: "Mức Chỉ Định Class I — Bằng Chứng Mức A",
    body: "Khuyến cáo có hiệu quả cao và bắt buộc áp dụng cho tất cả bệnh nhân phù hợp tiêu chuẩn (trừ khi có chống chỉ định tuyệt đối). Được chứng minh từ nhiều Thử nghiệm lâm sàng ngẫu nhiên ngẫu nhiên (RCT) lớn.",
    linkUrl: "pages/Y học chứng cứ/Guidelines/Guidelines.html"
  },
  "byt-2026": {
    badgeText: "🇻🇳 QĐ 2131/QĐ-BYT 2026",
    badgeClass: "byt-2026",
    title: "Hướng Dẫn Lâm Sàng Bộ Y Tế Việt Nam 2026",
    body: "Khuyến cáo chính thức của Bộ Y tế Việt Nam ban hành kèm theo Quyết định số 2131/QĐ-BYT ngày 14/07/2026 về chẩn đoán và điều trị bệnh lý tại Việt Nam.",
    linkUrl: "pages/Y học chứng cứ/Guidelines/Kho Guidelines/byt-copd-2026.html"
  },
  "esc-2026": {
    badgeText: "🇪🇺 ESC 2026 Update",
    badgeClass: "esc-2026",
    title: "Khuyến Cáo Hiệp Hội Tim Mạch Châu Âu (ESC 2026)",
    body: "Cập nhật thay đổi thực hành lâm sàng mới nhất năm 2026 từ ESC, tối ưu hóa phân tầng nguy cơ và sử dụng các thuốc thế hệ mới.",
    linkUrl: "pages/Y học chứng cứ/Guideline Radar/radar.html"
  }
};

function initEvidenceBridge() {
  createModalStructure();
  scanAndInjectBadges();
}

function createModalStructure() {
  if (document.getElementById("eb-modal-overlay")) return;

  const modalHtml = `
    <div class="eb-modal-overlay" id="eb-modal-overlay">
      <div class="eb-modal-card">
        <button class="eb-modal-close" id="eb-modal-close">&times;</button>
        <span class="eb-modal-badge" id="eb-modal-badge-tag">Evidence</span>
        <h3 class="eb-modal-title" id="eb-modal-title">Tóm Tắt Bằng Chứng Y Học</h3>
        <p class="eb-modal-body" id="eb-modal-body">Nội dung tóm tắt...</p>
        <div class="eb-modal-footer">
          <a href="#" class="eb-btn-link" id="eb-modal-link-btn">Xem Guideline Chi Tiết <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const overlay = document.getElementById("eb-modal-overlay");
  const closeBtn = document.getElementById("eb-modal-close");

  closeBtn.addEventListener("click", () => overlay.classList.remove("active"));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("active");
  });
}

function scanAndInjectBadges() {
  // Scan elements with data-evidence attribute
  const elements = document.querySelectorAll("[data-evidence]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-evidence");
    const data = EVIDENCE_DATABASE[key];
    if (!data) return;

    const badge = document.createElement("span");
    badge.className = `eb-badge ${data.badgeClass}`;
    badge.innerHTML = data.badgeText;

    badge.addEventListener("click", (e) => {
      e.stopPropagation();
      openEvidenceModal(key);
    });

    el.appendChild(badge);
  });
}

function openEvidenceModal(key) {
  const data = EVIDENCE_DATABASE[key];
  if (!data) return;

  const overlay = document.getElementById("eb-modal-overlay");
  const title = document.getElementById("eb-modal-title");
  const body = document.getElementById("eb-modal-body");
  const badgeTag = document.getElementById("eb-modal-badge-tag");
  const linkBtn = document.getElementById("eb-modal-link-btn");

  title.textContent = data.title;
  body.textContent = data.body;
  badgeTag.className = `eb-modal-badge ${data.badgeClass}`;
  badgeTag.textContent = data.badgeText;

  // Resolve relative link based on current page location depth
  const depth = getPathDepthPrefix();
  linkBtn.href = depth + data.linkUrl;

  overlay.classList.add("active");
}

function getPathDepthPrefix() {
  const path = window.location.pathname;
  if (path.includes("/pages/Y học chứng cứ/Guidelines/Kho Guidelines/")) return "../../../../";
  if (path.includes("/pages/Y học chứng cứ/EBM Lab/") || path.includes("/pages/Y học chứng cứ/Guideline Radar/")) return "../../../";
  if (path.includes("/pages/")) return "../../";
  return "./";
}
