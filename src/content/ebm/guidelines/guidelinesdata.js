// ════════════════════════════
// CONFIG & STATE
// ════════════════════════════

const SPECIALTIES = {
  cardio: { name: 'Tim mạch', color: '#dc2626', bg: '#fef2f2' },
  pulmo: { name: 'Hô hấp', color: '#2563eb', bg: '#eff6ff' },
  gi: { name: 'Tiêu hóa', color: '#ca8a04', bg: '#fefce8' },
  endo: { name: 'Nội tiết', color: '#7c3aed', bg: '#faf5ff' },
  neuro: { name: 'Thần kinh', color: '#c026d3', bg: '#fdf4ff' },
  infect: { name: 'Truyền nhiễm', color: '#16a34a', bg: '#f0fdf4' },
  renal: { name: 'Thận học', color: '#0891b2', bg: '#ecfeff' },
  rheum: { name: 'Cơ xương khớp', color: '#ea580c', bg: '#fff7ed' },
  hema: { name: 'Huyết học', color: '#db2777', bg: '#fdf2f8' },
  onco: { name: 'Ung thư', color: '#be185d', bg: '#fce7f3' },
  pedia: { name: 'Nhi khoa', color: '#0284c7', bg: '#f0f9ff' },
  obgyn: { name: 'Sản phụ khoa', color: '#e11d48', bg: '#fff1f2' },
  icu: { name: 'Hồi sức tích cực', color: '#059669', bg: '#ecfdf5' },
  derma: { name: 'Da liễu', color: '#ec4899', bg: '#fdf2f8' },
  ent: { name: 'Tai Mũi Họng', color: '#06b6d4', bg: '#ecfeff' },
  nutri: { name: 'Dinh dưỡng', color: '#65a30d', bg: '#f7fee7' }
};

const SOURCE_TYPES = {
  'intl-study': { name: 'Nghiên cứu Quốc tế', color: '#6366f1', bg: '#e0e7ff' },
  'intl-guideline': { name: 'Guideline Quốc tế', color: '#0d9488', bg: '#ccfbf1' },
  'vn-moh': { name: 'Bộ Y tế Việt Nam', color: '#dc2626', bg: '#fee2e2' },
  'vn-association': { name: 'Hội chuyên khoa VN', color: '#16a34a', bg: '#dcfce7' }
};

const DESIGNS = {
  'rct': { name: 'Thử nghiệm lâm sàng (RCT)' },
  'meta': { name: 'Tổng quan / Meta-Analysis' },
  'cohort': { name: 'Nghiên cứu quan sát / Thuần tập' },
  'guideline': { name: 'Hướng dẫn / Khuyến cáo' },
  'review': { name: 'Bài tổng quan y khoa (Review)' },
  'case-report': { name: 'Case Report / Series' },
  'other': { name: 'Khác' }
};

const IMPACTS = {
  'practice-changing': { name: 'Practice-Changing', color: '#dc2626', bg: '#fef2f2' },
  'informative': { name: 'Informative', color: '#2563eb', bg: '#eff6ff' },
  'early-signal': { name: 'Early Signal', color: '#d97706', bg: '#fffbeb' },
  'negative': { name: 'Negative/Âm tính', color: '#4b5563', bg: '#f3f4f6' },
  'regulatory': { name: 'Regulatory', color: '#7c3aed', bg: '#faf5ff' }
};

const CLINICAL_CONDITIONS = {
  // TIM MẠCH
  'heart-failure': { id: 'heart-failure', name: 'Suy tim (Heart Failure)', icd10: ['I50', 'I50.1', 'I50.9'], color: '#dc2626', bg: '#fef2f2' },
  'hypertension': { id: 'hypertension', name: 'Tăng huyết áp', icd10: ['I10', 'I11', 'I15'], color: '#0891b2', bg: '#ecfeff' },
  'af': { id: 'af', name: 'Rung nhĩ (AF)', icd10: ['I48', 'I48.0'], color: '#ea580c', bg: '#fff7ed' },
  'cad': { id: 'cad', name: 'Bệnh động mạch vành (CAD/CCS)', icd10: ['I25', 'I20', 'I21'], color: '#b91c1c', bg: '#fff1f1' },
  'valvular-heart': { id: 'valvular-heart', name: 'Bệnh van tim', icd10: ['I34', 'I35', 'I05'], color: '#be123c', bg: '#fff1f2' },

  // NỘI TIẾT - CHUYỂN HÓA
  'diabetes-t2d': { id: 'diabetes-t2d', name: 'Đái tháo đường Típ 2', icd10: ['E11', 'E11.9', 'E11.2'], color: '#7c3aed', bg: '#faf5ff' },
  'diabetes-t1d': { id: 'diabetes-t1d', name: 'Đái tháo đường Típ 1', icd10: ['E10', 'E10.9'], color: '#6d28d9', bg: '#f5f3ff' },
  'thyroid': { id: 'thyroid', name: 'Bệnh lý tuyến giáp (Bão giáp / Nhược giáp)', icd10: ['E05', 'E05.5', 'E03'], color: '#0284c7', bg: '#f0f9ff' },
  'dyslipidemia': { id: 'dyslipidemia', name: 'Rối loạn lipid máu', icd10: ['E78', 'E78.0', 'E78.5'], color: '#d97706', bg: '#fffbeb' },
  'obesity': { id: 'obesity', name: 'Béo phì & Hội chứng chuyển hóa', icd10: ['E66', 'E66.9', 'E88.81'], color: '#9a3412', bg: '#fff7ed' },

  // HÔ HẤP
  'copd': { id: 'copd', name: 'Bệnh phổi tắc nghẽn mạn tính (COPD)', icd10: ['J44', 'J44.9', 'J44.1'], color: '#0284c7', bg: '#f0f9ff' },
  'asthma': { id: 'asthma', name: 'Hen suyễn (Asthma)', icd10: ['J45', 'J45.9'], color: '#0d9488', bg: '#f0fdfa' },
  'pneumonia': { id: 'pneumonia', name: 'Viêm phổi mắc phải cộng đồng & Bệnh viện', icd10: ['J18', 'J15', 'J18.9'], color: '#2563eb', bg: '#eff6ff' },
  'interstitial-lung': { id: 'interstitial-lung', name: 'Bệnh phổi mô kẽ & Xơ phổi', icd10: ['J84', 'J84.1'], color: '#475569', bg: '#f8fafc' },
  'tb': { id: 'tb', name: 'Lao phổi & Lao ngoài phổi', icd10: ['A15', 'A16', 'A19'], color: '#b45309', bg: '#fef3c7' },

  // THẬN - TIẾT NIỆU
  'ckd': { id: 'ckd', name: 'Bệnh thận mạn (CKD)', icd10: ['N18', 'N18.3', 'N18.9'], color: '#059669', bg: '#ecfdf5' },
  'aki': { id: 'aki', name: 'Tổn thương thận cấp (AKI)', icd10: ['N17', 'N17.9'], color: '#047857', bg: '#f0fdf4' },
  'nephrotic': { id: 'nephrotic', name: 'Hội chứng thận hư & Viêm cầu thận', icd10: ['N04', 'N00', 'N03'], color: '#0f766e', bg: '#f0fdfa' },
  'bph-luts': { id: 'bph-luts', name: 'Tăng sinh lành tính tuyến tiền liệt (BPH/LUTS)', icd10: ['N40', 'N40.1'], color: '#4338ca', bg: '#eef2ff' },
  'uti': { id: 'uti', name: 'Nhiễm khuẩn tiết niệu', icd10: ['N39.0', 'N10'], color: '#1d4ed8', bg: '#eff6ff' },

  // TRUYỀN NHIỄM & HỒI SỨC
  'icu': { id: 'icu', name: 'Nhiễm trùng Hồi sức & Sốc nhiễm khuẩn', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'], color: '#059669', bg: '#ecfdf5' },
  'hepatitis-b': { id: 'hepatitis-b', name: 'Viêm gan vi rút B', icd10: ['B18.0', 'B18.1'], color: '#ca8a04', bg: '#fefce8' },
  'hepatitis-c': { id: 'hepatitis-c', name: 'Viêm gan vi rút C', icd10: ['B18.2'], color: '#16a34a', bg: '#f0fdf4' },
  'flu': { id: 'flu', name: 'Cúm mùa', icd10: ['J09', 'J10', 'J11'], color: '#2563eb', bg: '#eff6ff' },
  'covid19': { id: 'covid19', name: 'COVID-19', icd10: ['U07.1'], color: '#6366f1', bg: '#e0e7ff' },
  'hemorrhagic-fever': { id: 'hemorrhagic-fever', name: 'Sốt xuất huyết (Dengue/Marburg/Ebola/Nipah)', icd10: ['A90', 'A91', 'A98.3', 'A98.4', 'A98'], color: '#be185d', bg: '#fce7f3' },
  'measles': { id: 'measles', name: 'Sởi', icd10: ['B05'], color: '#e11d48', bg: '#fff1f2' },
  'invasive-fungal': { id: 'invasive-fungal', name: 'Nhiễm nấm xâm lấn & Aspergillus', icd10: ['B49', 'B44'], color: '#854d0e', bg: '#fefce8' },
  'hfmd': { id: 'hfmd', name: 'Bệnh Tay chân miệng', icd10: ['B08.4'], color: '#ea580c', bg: '#fff7ed' },

  // TIÊU HÓA - GAN MẬT
  'cirrhosis': { id: 'cirrhosis', name: 'Xơ gan & Tăng áp tĩnh mạch cửa', icd10: ['K74', 'K70.3'], color: '#991b1b', bg: '#fef2f2' },
  'masld-mash': { id: 'masld-mash', name: 'Gan nhiễm mỡ (MASLD / MASH)', icd10: ['K76.0', 'K75.8'], color: '#65a30d', bg: '#f7fee7' },
  'gerd-peptic': { id: 'gerd-peptic', name: 'Trào ngược GERD & Loét dạ dày', icd10: ['K21', 'K25', 'K27'], color: '#c2410c', bg: '#fff7ed' },
  'ibd': { id: 'ibd', name: 'Viêm ruột mạn tính (IBD - Crohn / UC)', icd10: ['K50', 'K51'], color: '#7e22ce', bg: '#faf5ff' },

  // THẦN KINH
  'stroke': { id: 'stroke', name: 'Đột quỵ thiếu máu & Xuất huyết não', icd10: ['I63', 'I61', 'I64', 'G45'], color: '#9333ea', bg: '#faf5ff' },
  'epilepsy': { id: 'epilepsy', name: 'Động kinh & Co giật', icd10: ['G40', 'G40.9'], color: '#a855f7', bg: '#f3e8ff' },
  'headache-migraine': { id: 'headache-migraine', name: 'Đau đầu & Migraine', icd10: ['G43', 'G44'], color: '#6b21a8', bg: '#faf5ff' },

  // CƠ XƯƠNG KHỚP
  'gout': { id: 'gout', name: 'Bệnh Gút (Gout)', icd10: ['M10', 'M10.0'], color: '#b91c1c', bg: '#fef2f2' },
  'ra': { id: 'ra', name: 'Viêm khớp dạng thấp (RA)', icd10: ['M05', 'M06'], color: '#c05621', bg: '#fffaf0' },
  'osteoporosis': { id: 'osteoporosis', name: 'Loãng xương', icd10: ['M81', 'M80'], color: '#71717a', bg: '#f4f4f5' },
  'lupus-sle': { id: 'lupus-sle', name: 'Lupus ban đỏ hệ thống (SLE)', icd10: ['M32'], color: '#be185d', bg: '#fce7f3' },

  // UNG BƯỚU & HUYẾT HỌC
  'solid-cancers': { id: 'solid-cancers', name: 'Ung thư các tạng (Phổi, Gan, Vú, Đại trực tràng)', icd10: ['C34', 'C22', 'C50', 'C18'], color: '#be123c', bg: '#fff1f2' },
  'vte-pe': { id: 'vte-pe', name: 'Huyết khối tĩnh mạch & Thuyên tắc phổi (VTE/PE)', icd10: ['I82', 'I26'], color: '#9f1239', bg: '#fff1f2' }
};

window.CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;
window.DEFAULT_CLINICAL_CONDITIONS = CLINICAL_CONDITIONS;

const SAMPLE_STUDIES = [
  {
    id: "2025-byt-soi",
    title: "Bộ Y Tế 2025: Hướng Dẫn Chẩn Đoán, Điều Trị & Phòng Bệnh Sởi",
    titleEn: "Vietnam MOH Guidelines on Diagnosis, Treatment & Prevention of Measles (2025)",
    year: 2025,
    sourceType: "vn-moh",
    design: "guideline",
    impact: "practice-changing",
    specialty: "infect",
    authors: "Bộ Y tế Việt Nam (Quyết định 1019/QĐ-BYT)",
    journal: "Bộ Y tế Việt Nam",
    file: "kho-guidelines/2025-byt-soi.html",
    summary: "Hướng dẫn toàn diện chẩn đoán, điều trị và phòng bệnh sởi theo Quyết định 1019/QĐ-BYT ngày 26/03/2025 (thay thế QĐ 1327/QĐ-BYT năm 2014). Diễn tiến 4 giai đoạn lâm sàng; hạt Koplik đặc hiệu; vết thâm vằn da hổ; phác đồ Vitamin A liều cao theo độ tuổi; chống chỉ định Corticoid toàn thân; bậc thang hồi sức hô hấp NCPAP/HFNC/ARDS; truyền IVIG cho viêm phổi/viêm não và quy trình dự phòng PEP sau phơi nhiễm.",
    tags: ["Sởi", "Measles", "Morbillivirus", "Hạt Koplik", "Bộ Y tế", "Vitamin A", "IVIG", "ARDS", "Vằn da hổ", "Chống chỉ định Corticoid", "Croup", "PEP"],
    keyResults: "QĐ 1019/QĐ-BYT | Bổ sung Vitamin A liều cao 2 ngày liên tiếp | Cấm Corticoid toàn thân khi chưa loại sởi | IVIG 0.25g/kg x 3 ngày"
  },

  {
    id: "2023-byt-covid19",
    title: "Bộ Y Tế 2023: Hướng Dẫn Chẩn Đoán & Điều Trị Bệnh COVID-19",
    titleEn: "Vietnam MOH Guidelines on Diagnosis & Treatment of COVID-19 (2023)",
    year: 2023,
    sourceType: "vn-moh",
    design: "guideline",
    impact: "practice-changing",
    specialty: "infect",
    authors: "Bộ Y tế Việt Nam (Quyết định 2671/QĐ-BYT)",
    journal: "Bộ Y tế Việt Nam",
    file: "kho-guidelines/2023-byt-covid19.html",
    summary: "Hướng dẫn toàn diện chẩn đoán và điều trị COVID-19 theo Quyết định 2671/QĐ-BYT ngày 26/06/2023 (thay thế QĐ 250/QĐ-BYT và QĐ 437/QĐ-BYT). Phân loại 5 mức độ lâm sàng; nhận diện Giảm oxy máu thầm lặng (Silent Hypoxia); phác đồ Remdesivir, Paxlovid, Molnupiravir; chỉ định Corticoid cho thể nặng/nguy kịch; Tocilizumab, Baricitinib, chống đông Enoxaparin, lọc máu CRRT/hấp phụ bão cytokine và tiêu chuẩn xuất viện.",
    tags: ["COVID-19", "SARS-CoV-2", "Bộ Y tế", "Omicron", "Remdesivir", "Paxlovid", "Molnupiravir", "Dexamethason", "Tocilizumab", "Baricitinib", "Enoxaparin", "Silent Hypoxia", "ARDS", "ECMO", "LUSS"],
    keyResults: "QĐ 2671/QĐ-BYT | Silent Hypoxia (5-10% BN) | Corticoid CHỈ DÙNG thể Nặng/Nguy kịch | Molnupiravir cấm thai phụ"
  },

  {
    id: "2025-byt-cummua",
    title: "Bộ Y Tế 2025: Hướng Dẫn Chẩn Đoán, Điều Trị & Dự Phòng Cúm Mùa",
    titleEn: "Vietnam MOH Guidelines on Diagnosis, Treatment & Prevention of Seasonal Influenza (2025)",
    year: 2025,
    sourceType: "vn-moh",
    design: "guideline",
    impact: "practice-changing",
    specialty: "infect",
    authors: "Bộ Y tế Việt Nam (Quyết định 1840/QĐ-BYT)",
    journal: "Bộ Y tế Việt Nam",
    file: "kho-guidelines/2025-byt-cummua.html",
    summary: "Hướng dẫn toàn diện chẩn đoán, điều trị và dự phòng cúm mùa theo Quyết định 1840/QĐ-BYT ngày 03/06/2025 (thay thế QĐ 2078/QĐ-BYT năm 2011). Phân loại cúm A/H1N1, A/H3N2, Cúm B; phân độ cúm nhẹ và nặng; chỉ định kháng vi rút đầu tay Oseltamivir, Baloxavir, Zanamivir; chống chỉ định Aspirin (Hội chứng Reye); bậc thang hồi sức ARDS/ECMO và phác đồ dự phòng sau phơi nhiễm.",
    tags: ["Cúm mùa", "Seasonal Influenza", "Cúm A", "Cúm B", "H1N1", "H3N2", "Bộ Y tế", "Oseltamivir", "Baloxavir", "Zanamivir", "Hội chứng Reye", "ARDS", "HFNC", "ECMO"],
    keyResults: "QĐ 1840/QĐ-BYT | Oseltamivir đầu tay cho thai phụ & trẻ em | Cấm Aspirin (Hội chứng Reye) | Baloxavir 1 liều duy nhất"
  },

  {
    id: "2023-byt-marburg",
    title: "Bộ Y Tế 2023: Hướng Dẫn Chẩn Đoán, Điều Trị & Kiểm Soát Lây Nhiễm Bệnh Sốt Xuất Huyết Marburg",
    titleEn: "Vietnam MOH Guidelines on Diagnosis, Treatment & Infection Control of Marburg Virus Disease (2023)",
    year: 2023,
    sourceType: "vn-moh",
    design: "guideline",
    impact: "practice-changing",
    specialty: "infect",
    authors: "Bộ Y tế Việt Nam (Quyết định 2201/QĐ-BYT)",
    journal: "Bộ Y tế Việt Nam",
    file: "kho-guidelines/2023-byt-marburg.html",
    summary: "Hướng dẫn toàn diện chẩn đoán, điều trị và kiểm soát lây nhiễm bệnh sốt xuất huyết Marburg theo Quyết định 2201/QĐ-BYT ngày 16/05/2023. Tỷ lệ tử vong tới 88%, diễn tiến 4 giai đoạn lâm sàng, xét nghiệm RT-PCR/ELISA, phác đồ điều trị hỗ trợ tích cực, chống chỉ định NSAID, quy trình PPE kháng thấm cấp 3-4, đóng gói mẫu 3 lớp và hỏa táng tử thi.",
    tags: ["Marburg", "MVD", "Vi rút Marburg", "Filoviridae", "Bộ Y tế", "Bệnh truyền nhiễm nhóm A", "Sốt xuất huyết Marburg", "PPE", "Hỏa táng", "Đóng gói 3 lớp"],
    keyResults: "QĐ 2201/QĐ-BYT | Tử vong tới 88% | Ủ bệnh 2-21 ngày | PCR nhắc lại sau 72h nếu âm tính lần 1"
  },

  {
    id: "2026-byt-ebola",
    title: "Bộ Y Tế 2026: Hướng Dẫn Chẩn Đoán, Điều Trị & Phòng Lây Nhiễm Bệnh Do Vi Rút Ebola",
    titleEn: "Vietnam MOH Guidelines on Diagnosis, Treatment & Infection Control of Ebola Virus Disease (2026)",
    year: 2026,
    sourceType: "vn-moh",
    design: "guideline",
    impact: "practice-changing",
    specialty: "infect",
    authors: "Bộ Y tế Việt Nam (Quyết định 1505/QĐ-BYT)",
    journal: "Bộ Y tế Việt Nam",
    file: "kho-guidelines/2026-byt-ebola.html",
    summary: "Hướng dẫn toàn diện chẩn đoán, điều trị và kiểm soát lây nhiễm bệnh do vi rút Ebola theo Quyết định 1505/QĐ-BYT ngày 25/05/2026 (thay thế QĐ 2968/QĐ-BYT năm 2014). Phân loại 6 loài Filovirus, tỷ lệ tử vong 25%-90%, tiêu chuẩn chẩn đoán RT-PCR, phác đồ điều trị hỗ trợ, liệu pháp kháng thể đơn dòng (Inmazeb, Ebanga), chống chỉ định NSAID, vắc-xin Ervebo và quy định cách ly/hỏa táng.",
    tags: ["Ebola", "EBOV", "Filovirus", "Bộ Y tế", "Bệnh truyền nhiễm nhóm A", "Sốt xuất huyết Ebola", "Inmazeb", "Ebanga", "Ervebo", "Cách ly", "Hỏa táng"],
    keyResults: "QĐ 1505/QĐ-BYT | Tử vong trung bình 50% (25%-90%) | Ủ bệnh 2-21 ngày | Inmazeb & Ebanga cho Zaire ebolavirus"
  },

  {
    id: "2026-byt-nipah",
    title: "Bộ Y Tế 2026: Hướng Dẫn Chẩn Đoán & Điều Trị Bệnh Do Vi Rút Nipah",
    titleEn: "Vietnam MOH Guidelines on Diagnosis & Treatment of Nipah Virus Infection (2026)",
    year: 2026,
    sourceType: "vn-moh",
    design: "guideline",
    impact: "practice-changing",
    specialty: "infect",
    authors: "Bộ Y tế Việt Nam (Quyết định 493/QĐ-BYT)",
    journal: "Bộ Y tế Việt Nam",
    file: "kho-guidelines/2026-byt-nipah.html",
    summary: "Hướng dẫn toàn diện chẩn đoán, cách ly và điều trị bệnh do vi rút Nipah theo Quyết định 493/QĐ-BYT ngày 13/02/2026. Phân loại bệnh truyền nhiễm nhóm A, nhận diện 2 dòng vi rút (NiV-M, NiV-B/I), tiêu chuẩn ca bệnh, chẩn đoán PCR/ELISA, MRI/X-quang, cách ly triệt để, chống chỉ định NSAID và điều trị triệu chứng hô hấp/thần kinh.",
    tags: ["Nipah", "NiV", "Vi rút Nipah", "Bộ Y tế", "Bệnh truyền nhiễm nhóm A", "Viêm não", "Suy hô hấp", "ARDS", "Cách ly"],
    keyResults: "QĐ 493/QĐ-BYT | Bệnh truyền nhiễm Nhóm A | Tử vong 40% - 75% | Ủ bệnh 3-14 ngày (tới 45 ngày)"
  },

  {
    id: '2026-byt-viem-gan-b',
    title: 'Bộ Y Tế 2026: Hướng Dẫn Chẩn Đoán & Điều Trị Viêm Gan Vi Rút B',
    titleEn: 'Vietnam MOH Guidelines on Diagnosis & Treatment of Hepatitis B Virus Infection (2026)',
    year: 2026,
    sourceType: 'vn-moh',
    design: 'guideline',
    impact: 'practice-changing',
    specialty: 'infect',
    authors: 'Bộ Y tế Việt Nam (QĐ 1740/QĐ-BYT)',
    journal: 'Bộ Y tế Việt Nam',
    file: 'kho-guidelines/2026-byt-viem-gan-b.html',
    summary: 'Hướng dẫn toàn diện chẩn đoán và điều trị viêm gan vi rút B theo Quyết định 1740/QĐ-BYT năm 2026 thay thế Quyết định 3310/QĐ-BYT năm 2019. Mở rộng chỉ định NAs, quy ước ALT nam/nữ, dự phòng MTCT và quản lý suy thận.',
    tags: ['HBV', 'Viêm gan B', 'Bộ Y tế', 'NAs', 'TDF', 'TAF', 'ETV', 'MTCT'],
    keyResults: 'QĐ 1740/QĐ-BYT | ULN ALT: Nam 30 U/L, Nữ 19 U/L | Chỉ định NAs từ F2 trở lên'
  },

  {
    id: '2024-byt-vgsvc',
    title: 'Bộ Y Tế 2024: Hướng Dẫn Chẩn Đoán & Điều Trị Viêm Gan Vi Rút C',
    titleEn: 'Vietnam MOH Guidelines on Diagnosis & Treatment of Hepatitis C Virus Infection (2024)',
    year: 2024,
    sourceType: 'vn-moh',
    design: 'guideline',
    impact: 'practice-changing',
    specialty: 'infect',
    authors: 'Bộ Y tế Việt Nam (QĐ 2855/QĐ-BYT)',
    journal: 'Bộ Y tế Việt Nam',
    file: 'kho-guidelines/2024-byt-vgsvc.html',
    summary: 'Hướng dẫn toàn diện chẩn đoán và điều trị viêm gan vi rút C theo Quyết định 2855/QĐ-BYT ngày 25/09/2024 của Bộ Y tế Việt Nam (thay thế QĐ 2065/QĐ-BYT 2021). Tiêu chuẩn khẳng định hiện nhiễm anti-HCV/HCV RNA/HCVcAg; phân loại xơ hóa APRI/FIB-4/FibroScan/Child-Pugh; phác đồ DAA theo độ tuổi & mốc cân nặng (SOF/VEL, G/P, SOF/DAC, SOF/LED); chống chỉ định -previr ở xơ gan mất bù; thuật toán xử trí quên thuốc DAA; phác đồ cứu vãn SOF/VEL/VOX; bảng tương tác DDI (Amiodaron, CYP3A, PPI, Statin); điều trị đồng nhiễm HIV/HBV/lao và tầm soát HCC sau SVR12.',
    tags: ['HCV', 'Viêm gan C', 'Bộ Y tế', 'DAA', 'SOF/VEL', 'Glecaprevir', 'Pibrentasvir', 'SOF/VEL/VOX', 'SVR12', 'Quên thuốc', 'DDI', 'FibroScan', 'APRI', 'Child-Pugh', 'HCC'],
    keyResults: 'QĐ 2855/QĐ-BYT | SVR12 giảm 85% HCC | Phác đồ DAA theo lứa tuổi & kg | Thuật toán xử trí quên thuốc DAA | Cấm -previr ở xơ gan mất bù'
  }
];

window.SAMPLE_STUDIES = SAMPLE_STUDIES;


