// File dữ liệu chuẩn hóa danh sách các công cụ lâm sàng (Updated 2026)
const clinicalToolsData = [
  // Phần 1: Chung
  {
    id: "benh-an-noi-khoa",
    title: "Mẫu bệnh án nội khoa",
    description: "Hướng dẫn viết bệnh án nội khoa chuẩn hóa",
    icon: "📝",
    link: "general/benh-an-noi-khoa.html",
    part: "part1-section",
    tags: ["chung", "bệnh án", "hành chính", "mẫu"]
  },
  {
    id: "tra-cuu-icd10",
    title: "Tra cứu mã ICD10 hưởng BHYT",
    description: "Tra cứu mã ICD10 hưởng Bảo hiểm y tế nhanh chóng",
    icon: "📝",
    link: "general/tracuu-ma-icd10.html",
    part: "part1-section",
    tags: ["chung", "icd10", "bhyt", "bảo hiểm", "tra cứu"]
  },
  {
    id: "tinh-co-mau",
    title: "Tính toán cỡ mẫu trong nghiên cứu",
    description: "Hướng dẫn tính toán cỡ mẫu trong nghiên cứu khoa học",
    icon: "🧮",
    link: "general/nckh-tinh-co-mau.html",
    part: "part1-section",
    tags: ["chung", "nghiên cứu khoa học", "nckh", "cỡ mẫu", "thống kê"]
  },
  {
    id: "quy-doi-lieu",
    title: "Bộ Quy Đổi Liều Thuốc Tương Đương",
    description: "Quy đổi liều Corticoid, Opioid (OME), Statin, PPI, DOACs, Benzodiazepines chính xác",
    icon: "⚖️",
    link: "general/quy-doi-lieu-tuong-duong.html",
    part: "part1-section",
    tags: ["chung", "quy đổi", "liều lượng", "tương đương", "corticoid", "statin"]
  },
  {
    id: "kho-cong-thuc-sinh-ly",
    title: "Kho Công Thức Sinh Lý Định Lượng",
    description: "Cơ sở dữ liệu công thức sinh lý (Nernst, GHK, Fick, Starling, HH, PAO2, eGFR) kèm máy tính tức thì",
    icon: "📐",
    link: "general/formula-vault.html",
    part: "part1-section",
    tags: ["chung", "sinh lý", "công thức", "nernst", "ghk", "fick", "starling", "mathjax", "định lượng"]
  },


  // Phần 2: Truyền Nhiễm
  {
    id: "sepsis-studio",
    title: "Sepsis Pro Studio — Sàng Lọc & Phân Tầng Nhiễm Khuẩn",
    description: "Workstation sàng lọc nhiễm khuẩn toàn diện 6 thang điểm (NEWS2, SOFA, SIRS, qSOFA, MEDS, Shock Index) & Sepsis-3 1-Hour Bundle",
    icon: "🦠",
    link: "infectious/sepsis-studio.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "nhiễm khuẩn", "sepsis", "sofa", "qsofa", "news2", "meds", "shock index", "studio"]
  },
  {
    id: "chinh-lieu-khang-sinh",
    title: "Chỉnh liều kháng sinh",
    description: "Tra cứu kháng sinh đồ và chỉnh liều dựa trên chức năng thận",
    icon: "🦠",
    link: "infectious/chinh-lieu-khang-sinh.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "kháng sinh", "chỉnh liều", "chức năng thận", "egfr"]
  },
  {
    id: "ql-vancomycin",
    title: "Quản lý sử dụng Vancomycin",
    description: "Khởi liều, theo dõi MRSA, Vancomycin",
    icon: "🦠",
    link: "infectious/ql-vancomycin.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "vancomycin", "mrsa", "kháng sinh", "trough"]
  },
  {
    id: "microbiology-studio",
    title: "Microbiology Pro Studio (Vi sinh lâm sàng)",
    description: "Giả lập kính hiển vi ảo, đĩa cấy, cây nhận diện vi khuẩn & Antibiogram S/I/R",
    icon: "🔬",
    link: "infectious/microbiology-studio.html",
    part: "part2-section",
    tags: ["truyền nhiễm", "vi sinh", "nhuộm gram", "kháng sinh đồ", "antibiogram", "vi khuẩn", "studio"]
  },

  // Phần 3: Cấp cứu & Hồi sức
  {
    id: "bu-dich",
    title: "Fluid Resuscitation Pro Studio",
    description: "Workstation quản lý lượng dịch, tốc độ truyền và y lệnh theo 7 bệnh cảnh lâm sàng cấp cứu",
    icon: "💧",
    link: "emergency/ql-bu-dich-studio.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "bù dịch", "bolus", "sốc", "fluid", "studio"]
  },
  {
    id: "van-mach-tro-tim",
    title: "Quản lý Vận mạch & Trợ tim",
    description: "Tính liều bơm tiêm điện, hướng dẫn chỉnh liều và chuyển đổi vận mạch an toàn",
    icon: "⚡",
    link: "emergency/ql-van-mach.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "vận mạch", "trợ tim", "noradrenaline", "adrenaline"]
  },
  {
    id: "quan-ly-may-tho",
    title: "Ventilator Pro Studio — Giả Lập & Xử Trí Máy Thở ICU",
    description: "Workstation giả lập máy thở ICU 3 kênh sóng thở động, 5 chế độ thở (VCV, PCV, PSV, SIMV, CPAP), Bệnh nhân ảo & Quiz chẩn đoán",
    icon: "💨",
    link: "emergency/ql-may-tho.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "máy thở", "thở máy", "cai thở máy", "icu", "ventilator", "studio", "sóng thở", "ards", "copd"]
  },
  {
    id: "toxicology-studio",
    title: "Toxicology Pro Studio (Hồi Sức Chống Độc & Giải Độc)",
    description: "Workstation nhận diện Toxidrome, máy tính liều giải độc đặc hiệu (NAC, Atropine, Naloxone, DigiFab...), PSS & kế hoạch khử độc",
    icon: "🧪",
    link: "emergency/toxicology-studio.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "chống độc", "toxidrome", "giải độc", "nac", "atropine", "naloxone", "studio", "gcs", "pss"]
  },
  {
    id: "an-than-icu",
    title: "An thần & Giảm đau ICU",
    description: "RASS, CPOT, CAM-ICU & Máy tính bơm tiêm điện an thần ICU",
    icon: "💊",
    link: "emergency/dg-an-than-icu.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "an thần", "rass", "cpot", "cam-icu", "bơm tiêm điện"]
  },
  {
    id: "ecg-studio",
    title: "ECG Pro Studio 12 Chuyển Đạo",
    description: "Giải lập sóng ECG 12 chuyển đạo tương tác, thước đo Calipers ảo & Quiz chẩn đoán cấp cứu",
    icon: "⚡",
    link: "emergency/ecg-studio.html",
    part: "part3-section",
    tags: ["cấp cứu", "hồi sức", "ecg", "điện tâm đồ", "tim mạch", "stemi", "caliper", "studio"]
  },

  // Phần 4: Hô hấp & Lao
  {
    id: "pneumonia-studio",
    title: "Pneumonia Studio",
    description: "CURB-65, PSI, IDSA/ATS, MDR Risk, SARI",
    icon: "🫁",
    link: "respiratory/pneumonia-studio.html",
    part: "part4-section",
    tags: ["hô hấp", "viêm phổi", "curb-65", "psi", "idsa", "sari"]
  },
  {
    id: "cxr-studio",
    title: "CXR Pro Studio",
    description: "Đọc phim X-quang ngực cấp cứu 12 bước, CTR ảo & 20+ bất thường",
    icon: "🫁",
    link: "respiratory/cxr-studio.html",
    part: "part4-section",
    tags: ["hô hấp", "lao", "cxr", "x-quang", "phổi", "studio", "ctr"]
  },
  {
    id: "pleural-effusion-studio",
    title: "Pleural Effusion Pro Studio",
    description: "Thuật toán chẩn đoán dịch màng phổi 5 tầng, Tiêu chuẩn Light, SEAG & phân tầng mủ màng phổi",
    icon: "🫁",
    link: "respiratory/pleural-effusion-studio.html",
    part: "part4-section",
    tags: ["hô hấp", "dịch màng phổi", "light", "seag", "mủ màng phổi", "ada", "studio", "exudate", "transudate"]
  },

  // Phần 5: Tiêu hóa & Dinh dưỡng
  {
    id: "ascites-studio",
    title: "Ascites Pro Studio",
    description: "Phân tích dịch màng bụng 5 tầng, SAAG Tăng áp cửa, SBP & phác đồ truyền Albumin IV",
    icon: "🫄",
    link: "gastroenterology/ascites-studio.html",
    part: "part5-section",
    tags: ["tiêu hóa", "dịch màng bụng", "báng bụng", "saag", "sbp", "viêm phúc mạc", "albumin", "studio", "xơ gan"]
  },
  {
    id: "dg-dinh-duong",
    title: "Đánh giá Dinh dưỡng nội viện",
    description: "Nhu cầu năng lượng, Đạm (Protein), Dịch, Carbohydrate, Lipid",
    icon: "🍽️",
    link: "gastroenterology/dg-dinh-duong-noi-tru.html",
    part: "part5-section",
    tags: ["tiêu hóa", "dinh dưỡng", "nội viện", "calo", "protein", "năng lượng"]
  },
  {
    id: "dg-xo-gan-studio",
    title: "Cirrhosis Studio – Đánh Giá Xơ Gan & MELD-Na",
    description: "Child-Pugh, MELD 3.0, FIB-4, APRI, ALBI Grade & Red Flags Mất bù",
    icon: "🫗",
    link: "gastroenterology/dg-xo-gan-studio.html",
    part: "part5-section",
    tags: ["tiêu hóa", "xơ gan", "child-pugh", "meld-na", "meld 3.0", "fib-4", "albi", "gan", "studio"]
  },
  {
    id: "ptnc-hcc",
    title: "Phân tầng nguy cơ HCC",
    description: "Phân tầng nguy cơ mắc ung thư biểu mô tế bào gan (HCC) theo guideline AGA 2026",
    icon: "🫗",
    link: "gastroenterology/dg-ptnc-hcc.html",
    part: "part5-section",
    tags: ["tiêu hóa", "xơ gan", "hcc", "ung thư gan", "aga"]
  },
  {
    id: "xuat-huyet-tieu-hoa",
    title: "Xuất huyết Tiêu hóa cấp (UGIB & LGIB)",
    description: "Glasgow-Blatchford (GBS), Oakland Score & Phác đồ truyền máu, PPI",
    icon: "🫀",
    link: "gastroenterology/dg-xhth.html",
    part: "part5-section",
    tags: ["tiêu hóa", "xuất huyết", "gbs", "blatchford", "oakland", "truyền máu"]
  },

  // Phần 6: Thận & Điện giải
  {
    id: "chuc-nang-than",
    title: "Chức năng thận",
    description: "Cockcroft-Gault, CKD-EPI 2021, KDIGO, KDIGO AKI",
    icon: "🔬",
    link: "renal/renal-function.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "egfr", "ckd", "aki", "cockcroft-gault"]
  },
  {
    id: "khi-mau-dong-mach",
    title: "Phân tích khí máu động mạch",
    description: "Henderson-Hasselbalch, Winters, Anion Gap, Delta Ratio",
    icon: "🔬",
    link: "renal/dg-abg-studio.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "khí máu", "abg", "toan kiềm", "anion gap"]
  },
  {
    id: "electrolyte-studio",
    title: "Electrolyte Pro Studio (Điện giải & Dịch truyền)",
    description: "Giả lập & Xử trí Rối loạn Điện giải (Na, K, Ca, Mg), Adrogue-Madias & ODS Risk",
    icon: "🧪",
    link: "renal/electrolyte-studio.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "natri", "kali", "canxi", "magie", "dịch", "studio"]
  },
  {
    id: "danh-gia-nguyen-nhan-aki",
    title: "Đánh giá Nguyên nhân AKI",
    description: "Phân loại tổn thương thận cấp (Trước thận, Tại thận, Sau thận) dựa trên bệnh sử và xét nghiệm",
    icon: "🔬",
    link: "renal/dg-nguyen-nhan-aki.html",
    part: "part6-section",
    tags: ["thận", "điện giải", "aki", "tổn thương thận cấp", "nguyên nhân", "trước thận", "tại thận", "sau thận"]
  },

  // Phần 7: Tim mạch & Huyết khối
  {
    id: "phan-loai-roi-loan-nhip",
    title: "Phân loại Rối loạn nhịp tim & ECG Arrhythmia Studio",
    description: "6 trục phân loại rối loạn nhịp, Thuật toán Brugada 4 bước, QTc đa công thức & Phân tầng nguy cơ Xoắn đỉnh",
    icon: "🫀",
    link: "cardiology/phan-loai-roi-loan-nhip-studio.html",
    part: "part7-section",
    tags: ["tim mạch", "rối loạn nhịp", "ecg", "qtc", "brugada", "wpw", "xoắn đỉnh", "arvc", "arrhythmia"]
  },
  {
    id: "ptnc-tim-mach",
    title: "Phân tầng nguy cơ tim mạch toàn bộ",
    description: "SCORE2, SCORE2-OP, SCORE2-Diabetes, PREVENT",
    icon: "📊",
    link: "cardiology/ptnc-tim-mach.html",
    part: "part7-section",
    tags: ["tim mạch", "huyết khối", "score2", "nguy cơ tim mạch", "prevent"]
  },
  {
    id: "dg-ldlc",
    title: "Đánh giá mục tiêu LDL-c",
    description: "Xác định mục tiêu LDL-c theo phân tầng nguy cơ tim mạch ESC/VNHA và so sánh thực tế.",
    icon: "🩸",
    link: "cardiology/dg-ldl-c.html",
    part: "part7-section",
    tags: ["tim mạch", "huyết khối", "mỡ máu", "ldl-c", "esc", "statin"]
  },
  {
    id: "dg-suy-tim",
    title: "Đánh giá & Phân loại Suy tim",
    description: "Phân tầng nguy cơ toàn diện – Áp dụng trực tiếp cho thực hành lâm sàng tại Việt Nam.",
    icon: "❤️",
    link: "cardiology/dg-suy-tim.html",
    part: "part7-section",
    tags: ["tim mạch", "suy tim", "hfref", "hfpef", "phân độ suy tim"]
  },
  {
    id: "vte-toolkit",
    title: "VTE Toolkit: DVT & Thuyên tắc Phổi",
    description: "Wells DVT, Wells PE, sPESI, D-Dimer & CTPA Algorithm",
    icon: "🩸",
    link: "cardiology/dg-vte.html",
    part: "part7-section",
    tags: ["tim mạch", "huyết khối", "vte", "dvt", "pe", "wells", "d-dimer"]
  },

  // Phần 8: Nội tiết & Chuyển hóa
  {
    id: "chinh-lieu-insulin",
    title: "Chỉnh liều Insulin nội trú",
    description: "Basal-Bolus, CII (ICU)",
    icon: "💉",
    link: "endocrinology/dg-insulin-dtd.html",
    part: "part8-section",
    tags: ["nội tiết", "chuyển hóa", "tiểu đường", "đái tháo đường", "insulin"]
  },

  // Phần 9: Thần kinh
  {
    id: "dg-dot-quy",
    title: "Stroke Pro Studio — Cấp Cứu Đột Quỵ Nào Cấp",
    description: "Thanh cửa sổ thời gian Time-Window Bar (rtPA ≤ 4.5h / EVT ≤ 24h), NIHSS 11 mục Visual, Liều rtPA & ICH Score",
    icon: "🧠",
    link: "neurology/dg-dot-quy-studio.html",
    part: "part9-section",
    tags: ["thần kinh", "đột quỵ", "nihss", "rtpa", "alteplase", "evt", "dawn", "ich", "studio"]
  },

  // Phần 10: Huyết học
  {
    id: "lab-pro-studio",
    title: "Lab Pro Studio — Giả Lập & Phân Tích Xét Nghiệm Máu",
    description: "Trình giả lập kết quả xét nghiệm máu tương tác PACS-style (CBC, Gan, Thận, Lipid, Đông máu), gauge bars, gợi ý chẩn đoán phân biệt & Quiz",
    icon: "🧪",
    link: "hematology/lab-studio.html",
    part: "part10-section",
    tags: ["huyết học", "xét nghiệm", "lab", "cbc", "sinh hóa", "đông máu", "studio", "pacs"]
  },
  {
    id: "phan-tang-thieu-mau",
    title: "Phân tầng Thiếu máu & Thuật toán chẩn đoán",
    description: "CRI/RPI, MCV/MCH, Iron Panel & Thalassemia Guidance",
    icon: "🔴",
    link: "hematology/dg-thieu-mau.html",
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
