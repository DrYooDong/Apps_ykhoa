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
  }
];

window.SAMPLE_STUDIES = SAMPLE_STUDIES;


