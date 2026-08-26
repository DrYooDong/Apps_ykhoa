/**
 * Evidence Bridge System (evidence-bridge.ts)
 * Path: src/knowledge/evidence-bridge.ts
 */

export interface EvidenceItem {
  badgeText: string;
  badgeClass: string;
  title: string;
  body: string;
  linkUrl: string;
}

export const EVIDENCE_DATABASE: Record<string, EvidenceItem> = {
  "class-1a": {
    badgeText: "🔬 Class I-A (ESC/ACC)",
    badgeClass: "class-1a",
    title: "Mức Chỉ Định Class I — Bằng Chứng Mức A",
    body: "Khuyến cáo có hiệu quả cao và bắt buộc áp dụng cho tất cả bệnh nhân phù hợp tiêu chuẩn (trừ khi có chống chỉ định tuyệt đối). Được chứng minh từ nhiều Thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCT) lớn.",
    linkUrl: "src/content/ebm/guidelines/guidelines.html"
  },
  "byt-2026": {
    badgeText: "🇻🇳 BYT Việt Nam 2026",
    badgeClass: "byt-2026",
    title: "Hướng Dẫn Lâm Sàng Bộ Y Tế Việt Nam",
    body: "Khuyến cáo chính thức của Bộ Y tế Việt Nam về chẩn đoán và điều trị bệnh lý tại Việt Nam.",
    linkUrl: "#/ebm/kho-guidelines/2026-byt-copd"
  },
  "esc-2026": {
    badgeText: "🇪🇺 ESC 2026 Update",
    badgeClass: "esc-2026",
    title: "Khuyến Cáo Hiệp Hội Tim Mạch Châu Âu (ESC)",
    body: "Cập nhật thay đổi thực hành lâm sàng mới nhất từ ESC, tối ưu hóa phân tầng nguy cơ và sử dụng các thuốc thế hệ mới.",
    linkUrl: "src/content/ebm/guideline-radar/radar.html"
  }
};

export function initEvidenceBridge(): void {
  const elements = document.querySelectorAll("[data-evidence]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-evidence");
    if (!key) return;
    const data = EVIDENCE_DATABASE[key];
    if (!data) return;

    const badge = document.createElement("span");
    badge.className = `eb-badge ${data.badgeClass}`;
    badge.innerHTML = data.badgeText;
    el.appendChild(badge);
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initEvidenceBridge);
  } else {
    initEvidenceBridge();
  }
}
