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
    title: "Quản lý Bệnh nhân Máy thở",
    description: "Thông khí cơ học, cai thở máy",
    icon: "💨",
    link: "Cấp cứu & hồi sức/QL_Maytho.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "máy thở", "thở máy", "cai thở máy", "icu"]
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
    id: "rl-kali-canxi",
    title: "Xử trí rối loạn kali/canxi máu",
    description: "Canxi hiệu chỉnh (Albumin), Phác đồ UKKA",
    icon: "🔬",
    link: "Thận & Điện giải - toan kiềm/DG_Kali-Canxi.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "kali", "canxi", "hạ kali", "tăng kali"]
  },
  {
    id: "rl-natri-dich",
    title: "Xử trí rối loạn natri máu & dịch",
    description: "Adrogue-Madias, TBW, Free Water Deficit, ODS Risk",
    icon: "🔬",
    link: "Thận & Điện giải - toan kiềm/DG_Natri-Dich.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "natri", "tbw", "dịch", "hạ natri"]
  },
  {
    id: "danh-gia-nguyen-nhan-aki",
    title: "Đánh giá Nguyên nhân AKI",
    description: "Phân loại tổn thương thận cấp (Trước thận, Tại thận, Sau thận) dựa trên bệnh sử và xét nghiệm",
    icon: "🔬",
    link: "Thận & Điện giải - toan kiềm/danh-gia-nguyen-nhan-aki.html",
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
  "part9-section": { id: "part9", name: "Phần 9: Thần kinh", icon: "fa-brain" }
};
