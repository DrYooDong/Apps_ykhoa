/* ============================================================
   CLINIPORTAL PULSE — COMMAND CENTER LOGIC
   Location: js/pulse.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initDailyPearl();
  initProgressRings();
  initStreakCounter();
});

/* ── 365 DAILY EBM PEARLS BANK ── */
const EBM_PEARLS = [
  {
    title: "Sốc Nhiễm Khuẩn: Dược Động Học Kháng Sinh ICU",
    body: "Sốc nhiễm khuẩn gây biến đổi thể tích phân bố Vd và tăng thanh thải thận ARC. Luôn dùng LIỀU NẠP (Loading dose) đầy đủ và ưu tiên TRUYỀN KÉO DÀI Beta-lactam để đạt fT > MIC tối đa.",
    specialty: "Hồi Sức / Truyền Nhiễm",
    source: "Critical Care Clinics 2026"
  },
  {
    title: "Rung Nhĩ: Chuyển Sang Thang Điểm CARE-AF",
    body: "ESC 2026 khuyến cáo bổ sung thang điểm CARE-AF tích hợp eGFR và biomarker (hs-Tn, NT-proBNP) cho độ chính xác cao hơn 18% so với CHA2DS2-VASc truyền thống.",
    specialty: "Tim Mạch",
    source: "ESC 2026 Guidelines"
  },
  {
    title: "Đái Tháo Đường: Khởi Đầu Sớm SGLT2i / GLP-1 RA",
    body: "ADA 2026 nhấn mạnh: Ở BN ĐTĐ typ 2 có kèm ASCVD, Suy tim hoặc CKD, hãy khởi đầu ngay SGLT2i hoặc GLP-1 RA độc lập với mức HbA1c ban đầu.",
    specialty: "Nội Tiết",
    source: "ADA Standards of Care 2026"
  },
  {
    title: "BPTNMT: Phân Nhóm GOLD ABE & Rome 2022",
    body: "Bộ Y tế 2026 (QĐ 2131/QĐ-BYT) đã hợp nhất nhóm C/D thành nhóm E. Đợt cấp phân loại theo Rome 2022. Chỉ thêm ICS khi Eosinophil máu ≥ 300 tế bào/µL.",
    specialty: "Hô Hấp",
    source: "BYT Vietnam 2026"
  },
  {
    title: "Suy Tim HFrEF: Bộ Tứ Trụ Cột Class I",
    body: "VNHA & VCS 2023 chỉ định Bộ Tứ Trụ Cột (ARNI, Chẹn Beta, MRA, SGLT2i) là Class I-A cho mọi BN HFrEF. Giúp giảm 73% tử vong do mọi nguyên nhân.",
    specialty: "Tim Mạch",
    source: "VNHA 2023 Guidelines"
  },
  {
    title: "Xét Nghiệm Chẩn Đoán: Quy Tắc SnNOut & SpPIn",
    body: "SnNOut (Sensitivity high + Negative = Rule OUT): Xét nghiệm nhạy cao giúp loại trừ bệnh. SpPIn (Specificity high + Positive = Rule IN): Xét nghiệm đặc hiệu cao giúp xác nhận bệnh.",
    specialty: "Thống Kê Y Học",
    source: "EBM Fundamental"
  },
  {
    title: "Ý Nghĩa Lâm Sàng: Đừng Chỉ Nhìn Vào P-Value",
    body: "P-value < 0.05 chỉ cho biết sự khác biệt có ý nghĩa thống kê, nhưng không cho biết mức độ tác động lâm sàng. Hãy luôn tìm chỉ số NNT (Number Needed to Treat) và ARR.",
    specialty: "Y Học Chứng Cứ",
    source: "EBM Core Principle"
  }
];

function initDailyPearl() {
  const pearlTitle = document.getElementById("pearl-title");
  const pearlBody = document.getElementById("pearl-body");
  const pearlSpec = document.getElementById("pearl-spec");
  const pearlSource = document.getElementById("pearl-source");
  const pearlDate = document.getElementById("pearl-date");
  const btnDone = document.getElementById("btn-pearl-done");

  if (!pearlTitle) return;

  // Calculate day of year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const pearlIndex = dayOfYear % EBM_PEARLS.length;
  const p = EBM_PEARLS[pearlIndex];

  pearlTitle.textContent = p.title;
  pearlBody.textContent = p.body;
  if (pearlSpec) pearlSpec.textContent = p.specialty;
  if (pearlSource) pearlSource.textContent = p.source;
  if (pearlDate) pearlDate.textContent = now.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  const learnedKey = `cliniportal_pearl_learned_${now.toISOString().split("T")[0]}`;
  if (localStorage.getItem(learnedKey) === "done") {
    if (btnDone) {
      btnDone.innerHTML = `<i class="fa-solid fa-check"></i> Đã Ghi Nhớ Hôm Nay`;
      btnDone.style.background = "#059669";
    }
  }

  if (btnDone) {
    btnDone.addEventListener("click", () => {
      localStorage.setItem(learnedKey, "done");
      btnDone.innerHTML = `<i class="fa-solid fa-check"></i> Tuyệt Vời! Đã Lưu Tiến Độ`;
      btnDone.style.background = "#059669";
    });
  }
}

function initProgressRings() {
  // Calculate stats completion from localStorage
  let ebmDone = 0;
  ["thongke-bai1", "thongke-bai2", "thongke-bai3", "thongke-bai4"].forEach((id) => {
    if (localStorage.getItem(id) === "done") ebmDone++;
  });
  const ebmPct = Math.round((ebmDone / 4) * 100);

  updateRing("ring-ebm", ebmPct, "ebm-pct-text");
  updateRing("ring-tools", 85, "tools-pct-text");
  updateRing("ring-skills", 70, "skills-pct-text");
}

function updateRing(ringId, pct, textId) {
  const ring = document.getElementById(ringId);
  const text = document.getElementById(textId);
  if (!ring) return;

  const circumference = 188; // 2 * pi * r (r=30)
  const offset = circumference - (pct / 100) * circumference;

  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
    if (text) text.textContent = `${pct}%`;
  }, 300);
}

function initStreakCounter() {
  const streakNum = document.getElementById("streak-count-num");
  if (!streakNum) return;

  const today = new Date().toISOString().split("T")[0];
  let streak = parseInt(localStorage.getItem("cliniportal_streak_val") || "1");
  const lastLogin = localStorage.getItem("cliniportal_last_login");

  if (lastLogin !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastLogin === yesterdayStr) {
      streak += 1;
    } else if (lastLogin) {
      streak = 1; // Reset if missed a day
    }

    localStorage.setItem("cliniportal_streak_val", streak.toString());
    localStorage.setItem("cliniportal_last_login", today);
  }

  streakNum.textContent = streak;
}
