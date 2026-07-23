// File dữ liệu chuẩn hóa danh sách các công cụ lâm sàng
const clinicalToolsData = [
  // Phần 1: Chung
  {
    id: "benh-an-noi-khoa",
    title: "Mẫu bệnh án nội khoa",
    description: "Hướng dẫn viết bệnh án nội khoa chuẩn hóa",
    icon: "📝",
    link: "Chung/Bệnh án/benh-an-noi-khoa.html",
    part: "part1-section",
    tags: ["chung", "bệnh án", "hành chính", "mẫu"]
  },
  {
    id: "tra-cuu-icd10",
    title: "Tra cứu mã ICD10 hưởng BHYT",
    description: "Tra cứu mã ICD10 hưởng Bảo hiểm y tế nhanh chóng",
    icon: "📝",
    link: "Chung/Tracuu_maICD10.html",
    part: "part1-section",
    tags: ["chung", "icd10", "bhyt", "bảo hiểm", "tra cứu"]
  },
  {
    id: "tinh-co-mau",
    title: "Tính toán cỡ mẫu trong nghiên cứu",
    description: "Hướng dẫn tính toán cỡ mẫu trong nghiên cứu khoa học",
    icon: "🧮",
    link: "Chung/NCKH/NCKH_Tinhcomau.html",
    part: "part1-section",
    tags: ["chung", "nghiên cứu khoa học", "nckh", "cỡ mẫu", "thống kê"]
  },
  {
    id: "quy-doi-lieu",
    title: "Bộ Quy Đổi Liều Thuốc Tương Đương",
    description: "Quy đổi liều Corticoid, Opioid (OME), Statin, PPI, DOACs, Benzodiazepines chính xác",
    icon: "⚖️",
    link: "Chung/QuyDoi_LieuTuongDuong.html",
    part: "part1-section",
    tags: ["chung", "quy đổi", "liều lượng", "tương đương", "corticoid", "statin"]
  },

  // Phần 2: Truyền Nhiễm
  {
    id: "sang-loc-nhiem-khuan",
    title: "Sàng lọc Nhiễm khuẩn",
    description: "NEWS2, SOFA, qSOFA, SIRS, MEDS",
    icon: "🦠",
    link: "Truyền Nhiễm/SL_Nhiem-khuan.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "nhiễm khuẩn", "sepsis", "sofa", "qsofa", "news2"]
  },
  {
    id: "chinh-lieu-khang-sinh",
    title: "Chỉnh liều kháng sinh",
    description: "Tra cứu kháng sinh đồ và chỉnh liều dựa trên chức năng thận",
    icon: "🦠",
    link: "Truyền Nhiễm/Chinhlieu_khangsinh.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "kháng sinh", "chỉnh liều", "chức năng thận", "egfr"]
  },
  {
    id: "ql-vancomycin",
    title: "Quản lý sử dụng Vancomycin",
    description: "Khởi liều, theo dõi MRSA, Vancomycin",
    icon: "🦠",
    link: "Truyền Nhiễm/QL_Vancomycin.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "vancomycin", "mrsa", "kháng sinh", "trough"]
  },
  {
    id: "microbiology-studio",
    title: "Microbiology Pro Studio (Vi sinh lâm sàng)",
    description: "Giả lập kính hiển vi ảo, đĩa cấy, cây nhận diện vi khuẩn & Antibiogram S/I/R",
    icon: "🔬",
    link: "Truyền Nhiễm/Microbiology_Studio.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "vi sinh", "nhuộm gram", "kháng sinh đồ", "antibiogram", "vi khuẩn", "studio"]
  },

  // Phần 3: Cấp cứu & Hồi sức
  {
    id: "bu-dich",
    title: "Bù dịch",
    description: "Mini-fluid challenge, Bolus, Mục tiêu CO, Cân bằng nước.",
    icon: "💧",
    link: "Cấp cứu & hồi sức/QL_Budich.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "bù dịch", "bolus", "sốc", "fluid"]
  },
  {
    id: "van-mach-tro-tim",
    title: "Quản lý Vận mạch & Trợ tim",
    description: "Tính liều bơm tiêm điện, hướng dẫn chỉnh liều và chuyển đổi vận mạch an toàn",
    icon: "⚡",
    link: "Cấp cứu & hồi sức/QL_Vanmach.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "vận mạch", "trợ tim", "noradrenaline", "adrenaline"]
  },
  {
    id: "quan-ly-may-tho",
    title: "Ventilator Pro Studio — Giả Lập & Xử Trí Máy Thở ICU",
    description: "Workstation giả lập máy thở ICU 3 kênh sóng thở động, 5 chế độ thở (VCV, PCV, PSV, SIMV, CPAP), Bệnh nhân ảo & Quiz chẩn đoán",
    icon: "💨",
    link: "Cấp cứu & hồi sức/QL_Maytho.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "máy thở", "thở máy", "cai thở máy", "icu", "ventilator", "studio", "sóng thở", "ards", "copd"]
  },
  {
    id: "an-than-icu",
    title: "An thần & Giảm đau ICU",
    description: "RASS, CPOT, CAM-ICU & Máy tính bơm tiêm điện an thần ICU",
    icon: "💊",
    link: "Cấp cứu & hồi sức/DG_AnthanICU.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "an thần", "rass", "cpot", "cam-icu", "bơm tiêm điện"]
  },
  {
    id: "ecg-studio",
    title: "ECG Pro Studio 12 Chuyển Đạo",
    description: "Giải lập sóng ECG 12 chuyển đạo tương tác, thước đo Calipers ảo & Quiz chẩn đoán cấp cứu",
    icon: "⚡",
    link: "Cấp cứu & hồi sức/ECG_Studio.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "ecg", "điện tâm đồ", "tim mạch", "stemi", "caliper", "studio"]
  },

  // Phần 4: Hô hấp & Lao
  {
    id: "dg-viem-phoi",
    title: "Đánh giá Viêm phổi",
    description: "CURB-65, PSI, IDSA/ATS, MDR Risk, SARI",
    icon: "🫁",
    link: "Hô hấp & Lao/DG_Viem-phoi.html",
    part: "part4-section",
    tags: ["hô hấp", "viêm phổi", "curb-65", "psi", "idsa", "sari"]
  },
  {
    id: "cxr-studio",
    title: "CXR Pro Studio",
    description: "Đọc phim X-quang ngực cấp cứu 12 bước, CTR ảo & 20+ bất thường",
    icon: "🫁",
    link: "Hô hấp & Lao/CXR_Studio.html",
    part: "part4-section",
    tags: ["hô hấp", "lao", "cxr", "x-quang", "phổi", "studio", "ctr"]
  },

  // Phần 5: Tiêu hóa & Dinh dưỡng
  {
    id: "dg-dinh-duong",
    title: "Đánh giá Dinh dưỡng nội viện",
    description: "Nhu cầu năng lượng, Đạm (Protein), Dịch, Carbohydrate, Lipid",
    icon: "🍽️",
    link: "Tiêu hóa & Dinh dưỡng/DG_Dinhduongnoitru.html",
    part: "part5-section",
    tags: ["tiêu hóa", "dinh dưỡng", "nội viện", "calo", "protein", "năng lượng"]
  },
  {
    id: "dg-xo-gan",
    title: "Đánh giá & Phân độ Xơ gan",
    description: "Child-Pugh, MELD-Na",
    icon: "🫗",
    link: "Tiêu hóa & Dinh dưỡng/DG_Xogan.html",
    part: "part5-section",
    tags: ["tiêu hóa", "xơ gan", "child-pugh", "meld-na", "gan"]
  },
  {
    id: "ptnc-hcc",
    title: "Phân tầng nguy cơ HCC",
    description: "Phân tầng nguy cơ mắc ung thư biểu mô tế bào gan (HCC) theo guideline AGA 2026",
    icon: "🫗",
    link: "Tiêu hóa & Dinh dưỡng/DG_ptncHCC.html",
    part: "part5-section",
    tags: ["tiêu hóa", "xơ gan", "hcc", "ung thư gan", "aga"]
  },
  {
    id: "xuat-huyet-tieu-hoa",
    title: "Xuất huyết Tiêu hóa cấp (UGIB & LGIB)",
    description: "Glasgow-Blatchford (GBS), Oakland Score & Phác đồ truyền máu, PPI",
    icon: "🫀",
    link: "Tiêu hóa & Dinh dưỡng/DG_XHTH.html",
    part: "part5-section",
    tags: ["tiêu hóa", "xuất huyết", "gbs", "blatchford", "oakland", "truyền máu"]
  },

  // Phần 6: Thận & Điện giải
  {
    id: "chuc-nang-than",
    title: "Chức năng thận",
    description: "Cockcroft-Gault, CKD-EPI 2021, KDIGO, KDIGO AKI",
    icon: "🔬",
    link: "Thận & Điện giải - toan kiềm/renal-function.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "egfr", "ckd", "aki", "cockcroft-gault"]
  },
  {
    id: "khi-mau-dong-mach",
    title: "Phân tích khí máu động mạch",
    description: "Henderson-Hasselbalch, Winters, Anion Gap, Delta Ratio",
    icon: "🔬",
    link: "Thận & Điện giải - toan kiềm/DG_ABG.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "khí máu", "abg", "toan kiềm", "anion gap"]
  },
  {
    id: "electrolyte-studio",
    title: "Electrolyte Pro Studio (Điện giải & Dịch truyền)",
    description: "Giả lập & Xử trí Rối loạn Điện giải (Na, K, Ca, Mg), Adrogue-Madias & ODS Risk",
    icon: "🧪",
    link: "Thận & Điện giải - toan kiềm/Electrolyte_Studio.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "natri", "kali", "canxi", "magie", "dịch", "studio"]
  },
  {
    id: "danh-gia-nguyen-nhan-aki",
    title: "Đánh giá Nguyên nhân AKI",
    description: "Phân loại tổn thương thận cấp (Trước thận, Tại thận, Sau thận) dựa trên bệnh sử và xét nghiệm",
    icon: "🔬",
    link: "Thận & Điện giải - toan kiềm/DG_nguyennhanAKI.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "aki", "tổn thương thận cấp", "nguyên nhân", "trước thận", "tại thận", "sau thận"]
  },

  // Phần 7: Tim mạch & Huyết khối
  {
    id: "ptnc-tim-mach",
    title: "Phân tầng nguy cơ tim mạch toàn bộ",
    description: "SCORE2, SCORE2-OP, SCORE2-Diabetes, PREVENT",
    icon: "📊",
    link: "Tim mạch & huyết khối/ptnctimmach.html",
    part: "part7-section",
    tags: ["tim mạch", "huyết khối", "score2", "nguy cơ tim mạch", "prevent"]
  },
  {
    id: "dg-ldlc",
    title: "Đánh giá mục tiêu LDL-c",
    description: "Xác định mục tiêu LDL-c theo phân tầng nguy cơ tim mạch ESC/VNHA và so sánh thực tế.",
    icon: "🩸",
    link: "Tim mạch & huyết khối/DG_LDLc.html",
    part: "part7-section",
    tags: ["tim mạch", "huyết khối", "mỡ máu", "ldl-c", "esc", "statin"]
  },
  {
    id: "dg-suy-tim",
    title: "Đánh giá & Phân loại Suy tim",
    description: "Phân tầng nguy cơ toàn diện – Áp dụng trực tiếp cho thực hành lâm sàng tại Việt Nam.",
    icon: "❤️",
    link: "Tim mạch & huyết khối/DG_Suytim.html",
    part: "part7-section",
    tags: ["tim mạch", "suy tim", "hfref", "hfpef", "phân độ suy tim"]
  },
  {
    id: "vte-toolkit",
    title: "VTE Toolkit: DVT & Thuyên tắc Phổi",
    description: "Wells DVT, Wells PE, sPESI, D-Dimer & CTPA Algorithm",
    icon: "🩸",
    link: "Tim mạch & huyết khối/DG_VTE.html",
    part: "part7-section",
    tags: ["tim mạch", "huyết khối", "vte", "dvt", "pe", "wells", "d-dimer"]
  },

  // Phần 8: Nội tiết & Chuyển hóa
  {
    id: "chinh-lieu-insulin",
    title: "Chỉnh liều Insulin nội trú",
    description: "Basal-Bolus, CII (ICU)",
    icon: "💉",
    link: "Nội tiết & Chuyển hóa/DG_Insulin-ĐTĐ.html",
    part: "part8-section",
    tags: ["nội tiết", "chuyển hóa", "tiểu đường", "đái tháo đường", "insulin"]
  },

  // Phần 9: Thần kinh
  {
    id: "dg-dot-quy",
    title: "Sàng lọc & Phân tầng Đột quỵ cấp",
    description: "NIHSS, ASPECTS, ABCD2, ICH, VAN",
    icon: "🫀",
    link: "Thần kinh/DG_Dotquy.html",
    part: "part9-section",
    tags: ["thần kinh", "đột quỵ", "nihss", "aspects", "abcd2"]
  },

  // Phần 10: Huyết học
  {
    id: "lab-pro-studio",
    title: "Lab Pro Studio — Giả Lập & Phân Tích Xét Nghiệm Máu",
    description: "Trình giả lập kết quả xét nghiệm máu tương tác PACS-style (CBC, Gan, Thận, Lipid, Đông máu), gauge bars, gợi ý chẩn đoán phân biệt & Quiz",
    icon: "🧪",
    link: "Huyết học/Lab_Studio.html",
    part: "part10-section",
    tags: ["huyết học", "xét nghiệm", "lab", "cbc", "sinh hóa", "đông máu", "studio", "pacs"]
  },
  {
    id: "phan-tang-thieu-mau",
    title: "Phân tầng Thiếu máu & Thuật toán chẩn đoán",
    description: "CRI/RPI, MCV/MCH, Iron Panel & Thalassemia Guidance",
    icon: "🔴",
    link: "Huyết học/DG_Thieumau.html",
    part: "part10-section",
    tags: ["huyết học", "thiếu máu", "anemia", "mcv", "mch", "rpi", "ferritin"]
  }
];

// Helper để cung cấp thông tin các phần (Parts)
const partMetadata = {
  "part1-section": { id: "part1", name: "Phần 1: Chung", icon: "fa-file-lines" },
  "part2-section": { id: "part2", name: "Phần 2: Truyền Nhiễm", icon: "fa-virus" },
  "part3-section": { id: "part3", name: "Phần 3: Cấp cứu & Hồi sức", icon: "fa-triangle-exclamation" },
  "part4-section": { id: "part4", name: "Phần 4: Hô hấp & Lao", icon: "fa-lungs" },
  "part5-section": { id: "part5", name: "Phần 5: Tiêu hóa & Dinh dưỡng", icon: "fa-apple-whole" },
  "part6-section": { id: "part6", name: "Phần 6: Thận & Điện giải", icon: "fa-filter" },
  "part7-section": { id: "part7", name: "Phần 7: Tim mạch & Huyết khối", icon: "fa-heart-pulse" },
  "part8-section": { id: "part8", name: "Phần 8: Nội tiết & Chuyển hóa", icon: "fa-droplet" },
  "part9-section": { id: "part9", name: "Phần 9: Thần kinh", icon: "fa-brain" },
  "part10-section": { id: "part10", name: "Phần 10: Huyết học", icon: "fa-vial" }
};
