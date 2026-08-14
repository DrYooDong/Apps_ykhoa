/**
 * CliniPortal Pulse — Daily Clinical Pearls & Command Center (pulse.ts)
 * Path: src/core/pulse.ts
 */

export interface EbmPearlItem {
  title: string;
  body: string;
  specialty: string;
  source: string;
}

export const EBM_PEARLS: EbmPearlItem[] = [
  {
    title: "Sốc Nhiễm Khuẩn: Dược Động Học Kháng Sinh ICU",
    body: "Sốc nhiễm khuẩn gây biến đổi thể tích phân bố Vd và tăng thanh thải thận ARC. Luôn dùng LIỀU NẠP đầy đủ và ưu tiên TRUYỀN KÉO DÀI Beta-lactam để đạt fT > MIC tối đa.",
    specialty: "Hồi Sức / Truyền Nhiễm",
    source: "Critical Care Clinics"
  },
  {
    title: "Rung Nhĩ: Chuyển Sang Thang Điểm CARE-AF",
    body: "ESC khuyến cáo bổ sung thang điểm CARE-AF tích hợp eGFR và biomarker (hs-Tn, NT-proBNP) cho độ chính xác cao hơn so với CHA2DS2-VASc truyền thống.",
    specialty: "Tim Mạch",
    source: "ESC Guidelines"
  },
  {
    title: "Đái Tháo Đường: Khởi Đầu Sớm SGLT2i / GLP-1 RA",
    body: "ADA nhấn mạnh: Ở BN ĐTĐ typ 2 có kèm ASCVD, Suy tim hoặc CKD, hãy khởi đầu ngay SGLT2i hoặc GLP-1 RA độc lập với mức HbA1c ban đầu.",
    specialty: "Nội Tiết",
    source: "ADA Standards of Care"
  },
  {
    title: "Suy Tim HFrEF: Bộ Tứ Trụ Cột Class I",
    body: "VNHA & ESC chỉ định Bộ Tứ Trụ Cột (ARNI, Chẹn Beta, MRA, SGLT2i) là Class I-A cho mọi BN HFrEF.",
    specialty: "Tim Mạch",
    source: "VNHA Guidelines"
  }
];

export function initDailyPearl(): void {
  const pearlTitle = document.getElementById("pearl-title");
  const pearlBody = document.getElementById("pearl-body");
  const pearlSpec = document.getElementById("pearl-spec");
  const pearlSource = document.getElementById("pearl-source");
  const pearlDate = document.getElementById("pearl-date");
  const btnDone = document.getElementById("btn-pearl-done");

  if (!pearlTitle) return;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime() + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const pearlIndex = dayOfYear % EBM_PEARLS.length;
  const p = EBM_PEARLS[pearlIndex];

  pearlTitle.textContent = p.title;
  if (pearlBody) pearlBody.textContent = p.body;
  if (pearlSpec) pearlSpec.textContent = p.specialty;
  if (pearlSource) pearlSource.textContent = p.source;
  if (pearlDate) pearlDate.textContent = now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  const learnedKey = `cliniportal_pearl_learned_${now.toISOString().split("T")[0]}`;
  if (localStorage.getItem(learnedKey) === "done" && btnDone) {
    btnDone.innerHTML = `<i class="fa-solid fa-check"></i> Đã Ghi Nhớ Hôm Nay`;
    btnDone.style.background = "#059669";
  }

  btnDone?.addEventListener("click", () => {
    localStorage.setItem(learnedKey, "done");
    btnDone.innerHTML = `<i class="fa-solid fa-check"></i> Tuyệt Vời! Đã Lưu`;
    btnDone.style.background = "#059669";
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDailyPearl);
  } else {
    initDailyPearl();
  }
}
