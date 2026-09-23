(() => {
  // src/content/docspace/public/cdss/cdss-registry.ts
  var CDSS_MODULES = [
    {
      id: "cdss-dengue-fluid",
      slug: "dengue",
      title: "Ph\xE1c \u0110\u1ED3 D\u1ECBch Truy\u1EC1n & Ch\u1ED1ng S\u1ED1c SXHD Dengue (B\u1ED9 Y T\u1EBF 2023)",
      titleEn: "Dengue Fluid Resuscitation & Shock Management CDSS",
      shortDesc: "T\u1EF1 \u0111\u1ED9ng t\xEDnh c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh CDC 2014, b\u1EA3ng k\u1EBF ho\u1EA1ch c\u1ECDc d\u1ECBch 4 c\u1ED9t \u0111\u1ED9ng h\u1ECDc v\xE0 li\u1EC1u v\u1EADn m\u1EA1ch Dopamin/Noradrenalin b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml.",
      category: "infectious",
      categoryName: "Truy\u1EC1n nhi\u1EC5m & Vi sinh",
      version: "2.0.0 (BYT 2023)",
      updatedAt: "2026-09-08",
      author: "CliniPortal CDSS Squad & BYT Q\u0110 2760/Q\u0110-BYT",
      guidelineSource: "Quy\u1EBFt \u0111\u1ECBnh s\u1ED1 2760/Q\u0110-BYT ng\xE0y 04/07/2023 c\u1EE7a B\u1ED9 Y t\u1EBF Vi\u1EC7t Nam",
      icd10: ["A97", "A97.0", "A97.1", "A97.2", "A97.9"],
      icon: "fa-solid fa-droplet",
      badge: "B\u1ED9 Y T\u1EBF 2023",
      isStandalone: true,
      standaloneUrl: "dengue/index.html"
    },
    {
      id: "cdss-ecg-analysis",
      slug: "ecg",
      title: "Ph\xE2n T\xEDch \u0110i\u1EC7n T\xE2m \u0110\u1ED3 12 Chuy\u1EC3n \u0110\u1EA1o & H\u1ED7 Tr\u1EE3 Ch\u1EA9n \u0110o\xE1n ECG Master",
      titleEn: "12-Lead ECG Waveform Analysis & Diagnostic Assistant CDSS",
      shortDesc: "B\u1ED9 ph\xE2n t\xEDch \u0111i\u1EC7n t\xE2m \u0111\u1ED3 12 \u0111\u1EA1o tr\xECnh tr\u1EF1c quan tr\xEAn canvas \u0111\u1ED9 ph\xE2n gi\u1EA3i cao: 21 ca b\u1EC7nh l\xE2m s\xE0ng \u0111i\u1EC3n h\xECnh, \u0111o \u0111\u1EA1c th\u01B0\u1EDBc Caliper \u0111i\u1EC7n t\u1EED, c\u1EA9m nang 10 b\u01B0\u1EDBc BS Nguy\u1EC5n T\xF4n Kinh Thi & ECG Made Easy, \u0111o tr\u1EE5c \u0111i\u1EC7n tim, QT/QTc, STEMI \u0111\u1ECBnh khu v\xE0 thu\u1EADt to\xE1n Brugada.",
      category: "cardiology",
      categoryName: "Tim m\u1EA1ch",
      version: "2.5.0 (21 Ca L\xE2m S\xE0ng)",
      updatedAt: "2026-09-09",
      author: "CliniPortal ECG Master Squad & Dr. Atul Luthra",
      guidelineSource: "AHA/ACC/HRS Guidelines for the Interpretation of the 12-Lead Electrocardiogram & BS Nguy\u1EC5n T\xF4n Kinh Thi",
      icd10: ["I21", "I47", "I48", "I49", "R94.3"],
      icon: "fa-solid fa-heart-pulse",
      badge: "21 Ca L\xE2m S\xE0ng + Caliper",
      isStandalone: true,
      standaloneUrl: "ecg/index.html"
    },
    {
      id: "cdss-abg-pro",
      slug: "abg",
      title: "Ph\xE2n T\xEDch Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch & X\u1EED Tr\xED L\xE2m S\xE0ng (ABG Pro)",
      titleEn: "Arterial Blood Gas Analysis & Acid-Base Clinical Decision Support",
      shortDesc: "\u0110\xE1nh gi\xE1 6 b\u01B0\u1EDBc r\u1ED1i lo\u1EA1n toan ki\u1EC1m, 24 ca l\xE2m s\xE0ng chuy\xEAn s\xE2u, Nomogram Siggaard-Andersen t\u01B0\u01A1ng t\xE1c, 3 c\xE2y quy\u1EBFt \u0111\u1ECBnh trao \u0111\u1ED5i kh\xED & GOLDMARK, c\u1EA9m nang Test Allen v\xE0 k\u1EF9 thu\u1EADt l\u1EA5y m\xE1u \u0111\u1ED9ng m\u1EA1ch.",
      category: "respiratory",
      categoryName: "H\xF4 h\u1EA5p & C\u1EA5p c\u1EE9u",
      version: "2.5.0 (24 Ca L\xE2m S\xE0ng + Nomogram)",
      updatedAt: "2026-09-09",
      author: "CliniPortal Critical Care Squad & EBM Guidelines",
      guidelineSource: "Hennessey & Japp / Pierre & Ranson ABG Interpretation Guidelines / Arterial Blood Gases Made Easy",
      icd10: ["E87.2", "E87.3", "J96", "E10.1", "R06.0"],
      icon: "fa-solid fa-lungs",
      badge: "24 Ca + Nomogram + C\xE2y Quy\u1EBFt \u0110\u1ECBnh",
      isStandalone: true,
      standaloneUrl: "abg/index.html"
    },
    {
      id: "cdss-radai-xray",
      slug: "xray",
      title: "Ph\xE2n T\xEDch X-Quang Ng\u1EF1c & B\u1EE5ng Th\xF4ng Minh (RadAI Analyzer)",
      titleEn: "Intelligent Chest & Abdominal Radiography PACS CDSS",
      shortDesc: "M\xF4 ph\u1ECFng tr\u1EA1m \u0111\u1ECDc PACS s\u1ED1 h\xF3a: ph\xE1t hi\u1EC7n \u0111\xF4ng \u0111\u1EB7c, tr\xE0n kh\xED, tr\xE0n d\u1ECBch, b\xF3ng tim to, m\u1EE9c n\u01B0\u1EDBc-h\u01A1i t\u1EAFc ru\u1ED9t, li\u1EC1m h\u01A1i d\u01B0\u1EDBi ho\xE0nh v\xE0 xu\u1EA5t k\u1EBFt lu\u1EADn h\xECnh \u1EA3nh SOAP.",
      category: "radiology",
      categoryName: "Ch\u1EA9n \u0111o\xE1n h\xECnh \u1EA3nh",
      version: "2.0.0",
      updatedAt: "2026-09-08",
      author: "CliniPortal RadAI Squad",
      guidelineSource: "ACR Appropriateness Criteria & Radiology Clinical Decision Rules",
      icd10: ["J18", "J98.1", "J90", "K56", "R91"],
      icon: "fa-solid fa-x-ray",
      badge: "PACS Workstation",
      isStandalone: true,
      standaloneUrl: "xray/index.html"
    },
    {
      id: "cdss-hepa-biochem",
      slug: "hepa",
      title: "Ph\xE2n T\xEDch Sinh H\xF3a Gan & Quy\u1EBFt \u0110\u1ECBnh L\xE2m S\xE0ng (HepaCDSS)",
      titleEn: "Liver Biochemistry & Clinical Decision Support System",
      shortDesc: "Ph\xE2n t\xEDch sinh h\xF3a gan chu\u1EA9n ACG, WHO: l\u01B0u \u0111\u1ED3 ti\u1EBFp c\u1EADn, t\xEDnh t\u1EF7 s\u1ED1 R-ratio, De Ritis, FIB-4, APRI, ph\xE2n t\u1EA7ng vi\xEAm gan virus, x\u01A1 gan Child-Pugh, MELD-Na v\xE0 t\u1ED5n th\u01B0\u01A1ng gan do thu\u1ED1c (DILI).",
      category: "gastroenterology",
      categoryName: "Ti\xEAu h\xF3a & Gan m\u1EADt",
      version: "2.0.0",
      updatedAt: "2026-09-08",
      author: "CliniPortal HepaCDSS Squad & ACG Guidelines",
      guidelineSource: "ACG Clinical Guideline: Evaluation of Abnormal Liver Chemistries (Am J Gastroenterol 2017)",
      icd10: ["K71", "K72", "K73", "K74", "K76", "B18"],
      icon: "fa-solid fa-virus",
      badge: "ACG & WHO Standard",
      isStandalone: true,
      standaloneUrl: "hepa/index.html"
    },
    {
      id: "cdss-neuro-exam",
      slug: "neuro",
      title: "Th\u1EA7n Kinh L\xE2m S\xE0ng & M\xF4 Ph\u1ECFng Y Khoa (NeuroExam Pro)",
      titleEn: "Clinical Neurological Examination & Simulation CDSS",
      shortDesc: "N\u1EC1n t\u1EA3ng kh\xE1m th\u1EA7n kinh chuy\xEAn s\xE2u & m\xF4 ph\u1ECFng \u0111\u1ED9ng 2D/3D: 5 lo\u1EA1i tho\xE1t v\u1ECB n\xE3o & tam ch\u1EE9ng Cushing 3D, v\u1EADn nh\xE3n III/IV/VI, ph\u1EA3n x\u1EA1 \u0111\u1ED3ng t\u1EED, khoanh da C2-S5, 6 d\xE1ng \u0111i, c\xE2y ph\xE2n lo\u1EA1i r\u1ED1i lo\u1EA1n v\u1EADn \u0111\u1ED9ng Shibasaki, h\u1ED9i ch\u1EE9ng th\xE2n n\xE3o b\u1EAFt ch\xE9o & m\u1ED9t r\u01B0\u1EE1i, quy tr\xECnh c\u1EA5p c\u1EE9u h\xF4n m\xEA & Japan Coma Scale (JCS 3-3-9), thang \u0111i\u1EC3m NIHSS/ASPECTS v\xE0 ng\xE2n h\xE0ng kinh nghi\u1EC7m l\xE2m s\xE0ng.",
      category: "neurology",
      categoryName: "Th\u1EA7n kinh & \u0110\u1ED9t qu\u1EF5",
      version: "2.5.0 (C\u1EA5p C\u1EE9u & M\xF4 Ph\u1ECFng \u0110\u1ED9ng)",
      updatedAt: "2026-09-10",
      author: "CliniPortal NeuroExam Squad",
      guidelineSource: "AHA/ASA Guidelines for Acute Ischemic Stroke & Campbell Neurologic Exam",
      icd10: ["I63", "I61", "G40", "G45", "R40"],
      icon: "fa-solid fa-brain",
      badge: "B\u1EA3n N\xE2ng C\u1EA5p 2.5: 3D + Th\xE2n N\xE3o + JCS + R\u1ED1i Lo\u1EA1n V\u1EADn \u0110\u1ED9ng",
      isStandalone: true,
      standaloneUrl: "neuro/index.html"
    },
    {
      id: "cdss-microbiology-mahon",
      slug: "microbio",
      title: "H\u1EC7 Th\u1ED1ng Vi Sinh L\xE2m S\xE0ng & \u0110\u1ECBnh Danh Vi Khu\u1EA9n (Mahon CDSS)",
      titleEn: "Clinical Diagnostic Microbiology System (Mahon & Lehman)",
      shortDesc: "N\u1EC1n t\u1EA3ng vi sinh ch\u1EA9n \u0111o\xE1n chuy\xEAn s\xE2u theo gi\xE1o tr\xECnh Mahon 6th Ed. v\xE0 ti\xEAu chu\u1EA9n CLSI M100: L\u01B0u \u0111\u1ED3 \u0111\u1ECBnh danh t\u01B0\u01A1ng t\xE1c, tra c\u1EE9u to\xE0n di\u1EC7n 50+ t\xE1c nh\xE2n, k\xEDnh hi\u1EC3n vi 2D/3D m\xF4 ph\u1ECFng h\xECnh th\xE1i, \u0111\u1ED9c t\u1ED1 h\u1ECDc, ma tr\u1EADn kh\xE1ng sinh \u0111\u1ED3 (AST/CLSI) v\xE0 xu\u1EA5t b\xE1o c\xE1o PDF chu\u1EA9n SOAP.",
      category: "infectious",
      categoryName: "Truy\u1EC1n nhi\u1EC5m & Vi sinh",
      version: "2.0.0 (Mahon 6th Ed. & CLSI M100)",
      updatedAt: "2026-09-11",
      author: "CliniPortal CDSS Squad & Connie R. Mahon, Donald C. Lehman",
      guidelineSource: "Mahon's Textbook of Diagnostic Microbiology, 6th Edition & CLSI M100 Performance Standards",
      icd10: ["A41", "A49", "B95", "B96", "Z16"],
      icon: "fa-solid fa-bacterium",
      badge: "Mahon 6th Ed. + AST/CLSI",
      isStandalone: true,
      standaloneUrl: "microbio/index.html"
    },
    {
      id: "cdss-antibiotic-dosing",
      slug: "antibiotic",
      title: "H\u1EC7 Th\u1ED1ng Qu\u1EA3n L\xFD Li\u1EC1u Kh\xE1ng Sinh & Suy Th\u1EADn (Antibiotic CDSS)",
      titleEn: "Clinical Antibiotic Dosing & Renal Adjustment CDSS",
      shortDesc: "T\xEDnh to\xE1n li\u1EC1u kh\xE1ng sinh chu\u1EA9n h\xF3a theo \u0111\u1ED9 thanh th\u1EA3i Creatinine (Cockcroft-Gault), eGFR CKD-EPI 2021, l\u1ECDc m\xE1u chu k\u1EF3 HD/CRRT/CAPD, c\u1EA3nh b\xE1o t\u01B0\u01A1ng t\xE1c thu\u1ED1c DDI, ph\xE2n lo\u1EA1i WHO AWaRe v\xE0 xu\u1EA5t b\xE1o c\xE1o h\u1ED9i ch\u1EA9n PDF.",
      category: "pharmacology",
      categoryName: "D\u01B0\u1EE3c l\xFD & Kh\xE1ng sinh",
      version: "2.0.0 (WHO AWaRe & Sanford)",
      updatedAt: "2026-09-19",
      author: "CliniPortal Pharmacology Squad & Sanford Guidelines",
      guidelineSource: "WHO AWaRe Classification & The Sanford Guide to Antimicrobial Therapy",
      icd10: ["Z16", "N18", "A41", "A49"],
      icon: "fa-solid fa-pills",
      badge: "WHO AWaRe + Sanford + HD/CRRT",
      isStandalone: true,
      standaloneUrl: "antibiotic/index.html"
    },
    {
      id: "cdss-vancomycin-pk",
      slug: "vancomycin",
      title: "Qu\u1EA3n L\xFD Li\u1EC1u & D\u01B0\u1EE3c \u0110\u1ED9ng H\u1ECDc Vancomycin (ASHP/IDSA 2020)",
      titleEn: "Vancomycin Precision Dosing & TDM AUC/MIC CDSS",
      shortDesc: "H\u1ED7 tr\u1EE3 ra quy\u1EBFt \u0111\u1ECBnh l\xE2m s\xE0ng t\xEDnh to\xE1n li\u1EC1u n\u1EA1p, li\u1EC1u duy tr\xEC, ch\u1EC9nh li\u1EC1u theo CrCl/eGFR, b\xE9o ph\xEC (Zhang 2024), l\u1ECDc m\xE1u IHD, gi\xE1m s\xE1t n\u1ED3ng \u0111\u1ED9 \u0111\xE1y Trough v\xE0 TDM AUC24/MIC m\u1EE5c ti\xEAu 400-600 theo h\u01B0\u1EDBng d\u1EABn ASHP/IDSA 2020 v\xE0 BV\u0110K C\xE0 Mau.",
      category: "pharmacology",
      categoryName: "D\u01B0\u1EE3c l\xFD & Kh\xE1ng sinh",
      version: "2.0.0 (ASHP 2020 & BV C\xE0 Mau)",
      updatedAt: "2026-09-22",
      author: "CliniPortal Pharmacology Squad & H\u01B0\u1EDBng d\u1EABn ASHP/IDSA/PIDS/SIDP 2020 & BV\u0110K C\xE0 Mau",
      guidelineSource: "ASHP/IDSA/PIDS/SIDP 2020 Therapeutic Monitoring of Vancomycin & H\u01B0\u1EDBng D\u1EABn S\u1EED D\u1EE5ng Vancomycin BV\u0110K C\xE0 Mau",
      icd10: ["Z16", "N18", "A41", "A49", "B95.6"],
      icon: "fa-solid fa-syringe",
      badge: "ASHP 2020 + TDM AUC/MIC + B\xE9o Ph\xEC",
      isStandalone: true,
      standaloneUrl: "vancomycin/index.html"
    },
    {
      id: "cdss-sepsis-risk",
      slug: "sepsis",
      title: "Ph\xE2n T\u1EA7ng Nguy C\u01A1 Nhi\u1EC5m Tr\xF9ng & S\u1ED1c Nhi\u1EC5m Khu\u1EA9n (SepsisCDSS)",
      titleEn: "Sepsis & Septic Shock Clinical Decision Support System",
      shortDesc: "S\xE0ng l\u1ECDc \u0111a ph\u01B0\u01A1ng th\u1EE9c, nh\u1EADn di\u1EC7n v\xE0 ph\xE2n t\u1EA7ng nguy c\u01A1 nhi\u1EC5m tr\xF9ng, nhi\u1EC5m khu\u1EA9n huy\u1EBFt (Sepsis) v\xE0 s\u1ED1c nhi\u1EC5m khu\u1EA9n theo NICE 2024/2026, Sepsis-3 (SOFA/qSOFA), Phoenix 2024 (Nhi khoa), Obstetric SOFA, LP-NEWS v\xE0 t\u1EF7 s\u1ED1 NLR.",
      category: "resuscitation",
      categoryName: "H\u1ED3i s\u1EE9c C\u1EA5p c\u1EE9u",
      version: "2.0.0 (NICE & Sepsis-3 & Phoenix)",
      updatedAt: "2026-09-23",
      author: "CliniPortal Critical Care Squad & NICE NG253 / SSC 2024",
      guidelineSource: "NICE NG253 (2024/2026 update), Surviving Sepsis Campaign (SSC) & Phoenix Sepsis Criteria 2024",
      icd10: ["A41.9", "R65.2", "R65.21", "A40", "A41"],
      icon: "fa-solid fa-biohazard",
      badge: "NICE 2024 + Phoenix 2024 + Sepsis-3",
      isStandalone: true,
      standaloneUrl: "sepsis/index.html"
    }
  ];
  function getCDSSModuleById(id) {
    return CDSS_MODULES.find((m) => m.id === id);
  }
  function getCDSSModuleBySlug(slug) {
    return CDSS_MODULES.find((m) => m.slug === slug);
  }

  // src/content/docspace/public/cdss/dengue/dengue-data.ts
  var CDC_STANDARD_WEIGHT = {
    2: { male: 13, female: 12 },
    3: { male: 14, female: 14 },
    4: { male: 16, female: 16 },
    5: { male: 18, female: 18 },
    6: { male: 21, female: 20 },
    7: { male: 23, female: 23 },
    8: { male: 26, female: 26 },
    9: { male: 29, female: 29 },
    10: { male: 32, female: 33 },
    11: { male: 36, female: 37 },
    12: { male: 40, female: 42 },
    13: { male: 45, female: 46 },
    14: { male: 51, female: 49 },
    15: { male: 56, female: 52 },
    16: { male: 61, female: 54 }
  };
  function getCDCStandardWeight(age, gender) {
    if (age < 2) {
      return gender === "male" ? 10 : 9.5;
    }
    if (age > 16) {
      return gender === "male" ? 60 : 50;
    }
    const entry = CDC_STANDARD_WEIGHT[Math.round(age)];
    return entry ? entry[gender] : gender === "male" ? 30 : 30;
  }
  var DENGUE_FLUID_TEMPLATES = {
    // 1. Dấu hiệu cảnh báo
    warning_signs: {
      child: [
        {
          stageName: "C\u1EEF 1: B\xF9 d\u1ECBch ban \u0111\u1EA7u (Tr\u1EBB em)",
          defaultRateMlKgH: 6,
          rateOptions: [6, 7],
          defaultDurationHours: 2,
          durationOptions: [1, 2, 3],
          hctCheckRequired: true,
          notes: "\u0110o l\u1EA1i Hct sau 2 gi\u1EDD. N\u1EBFu Hct gi\u1EA3m v\xE0 l\xE2m s\xE0ng c\u1EA3i thi\u1EC7n -> chuy\u1EC3n C\u1EEF 2."
        },
        {
          stageName: "C\u1EEF 2: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 b\u1EADc 1",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 3,
          durationOptions: [2, 3, 4],
          hctCheckRequired: true,
          notes: "\u0110\xE1nh gi\xE1 sinh hi\u1EC7u, l\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u v\xE0 Hct tr\u01B0\u1EDBc khi quy\u1EBFt \u0111\u1ECBnh gi\u1EA3m ti\u1EBFp."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 b\u1EADc 2",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 5, 6],
          hctCheckRequired: false,
          notes: "Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 1 ml/kg/h. Theo d\xF5i s\xE1t tri gi\xE1c."
        },
        {
          stageName: "C\u1EEF 4: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 duy tr\xEC & Cai d\u1ECBch",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 6,
          durationOptions: [4, 6, 8, 12, 18],
          hctCheckRequired: true,
          notes: "C\xE2n nh\u1EAFc ng\u01B0ng d\u1ECBch khi b\u1EC7nh nh\xE2n \u0103n u\u1ED1ng \u0111\u01B0\u1EE3c, m\u1EA1ch HA \u1ED5n \u0111\u1ECBnh, h\u1EBFt s\u1ED1t \u2265 48h."
        }
      ],
      adolescent: [
        {
          stageName: "C\u1EEF 1: Kh\u1EDFi \u0111\u1EA7u (Thi\u1EBFu ni\xEAn 13-15 tu\u1ED5i)",
          defaultRateMlKgH: 6,
          rateOptions: [6, 7],
          defaultDurationHours: 1,
          durationOptions: [1, 1.5, 2],
          hctCheckRequired: true,
          notes: "Th\u1EDDi gian m\u1ED7i n\u1EA5c t\u1ED1c \u0111\u1ED9 b\u1EB1ng 1/2 tr\u1EBB em nh\u1EB1m tr\xE1nh th\u1EEBa d\u1ECBch qu\xE1 t\u1EA3i."
        },
        {
          stageName: "C\u1EEF 2: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 n\u1EA5c 1",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 1.5,
          durationOptions: [1, 1.5, 2],
          hctCheckRequired: true,
          notes: "Ki\u1EC3m tra m\u1EA1ch, HA v\xE0 SpO2."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 n\u1EA5c 2",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 2,
          durationOptions: [2, 3],
          hctCheckRequired: false,
          notes: "Theo d\xF5i n\u01B0\u1EDBc ti\u1EC3u, ph\xE1t hi\u1EC7n s\u1EDBm d\u1EA5u hi\u1EC7u t\xE1i s\u1ED1c."
        },
        {
          stageName: "C\u1EEF 4: Duy tr\xEC & Ng\u01B0ng d\u1ECBch",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [2, 4, 6],
          hctCheckRequired: true,
          notes: "H\u1EBFt s\u1ED1t, h\u1ED3i ph\u1EE5c th\u1EC3 t\xEDch n\u1ED9i m\u1EA1ch, cai truy\u1EC1n t\u0129nh m\u1EA1ch s\u1EDBm."
        }
      ],
      adult: [
        {
          stageName: "C\u1EEF 1: B\xF9 ban \u0111\u1EA7u (Ng\u01B0\u1EDDi l\u1EDBn \u2265 16 tu\u1ED5i)",
          defaultRateMlKgH: 6,
          rateOptions: [6],
          defaultDurationHours: 2,
          durationOptions: [1, 2, 3],
          hctCheckRequired: true,
          notes: "Theo d\xF5i Hct, SpO2 v\xE0 ti\u1EBFng th\u1EDF \u1EDF ph\u1ED5i (ran \u1EA9m \u0111\xE1y ph\u1ED5i)."
        },
        {
          stageName: "C\u1EEF 2: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 b\u1EADc 1",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 3,
          durationOptions: [2, 3, 4],
          hctCheckRequired: true,
          notes: "Theo d\xF5i \u0111\xE1p \u1EE9ng tri gi\xE1c v\xE0 n\u01B0\u1EDBc ti\u1EC3u."
        },
        {
          stageName: "C\u1EEF 3: Duy tr\xEC & Cai d\u1ECBch",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: true,
          notes: "Ng\u01B0ng d\u1ECBch khi l\xE2m s\xE0ng \u1ED5n \u0111\u1ECBnh, khuy\u1EBFn kh\xEDch b\xF9 n\u01B0\u1EDBc \u0111i\u1EC7n gi\u1EA3i \u0111\u01B0\u1EDDng u\u1ED1ng."
        }
      ]
    },
    // 2. Sốc SXHD (Còn bù)
    shock: {
      child: [
        {
          stageName: "C\u1EEF 1: T\u1EA3i d\u1ECBch ch\u1ED1ng s\u1ED1c gi\u1EDD \u0111\u1EA7u (20 ml/kg/h)",
          defaultRateMlKgH: 20,
          rateOptions: [15, 20],
          defaultDurationHours: 1,
          durationOptions: [1],
          hctCheckRequired: true,
          notes: "D\u1ECBch tinh th\u1EC3 Ringer Lactate/NaCl 0.9%. \u0110\xE1nh gi\xE1 l\u1EA1i m\u1EA1ch, HA v\xE0 Hct ngay sau 1 gi\u1EDD."
        },
        {
          stageName: "C\u1EEF 2: Ra s\u1ED1c - Gi\u1EA3m xu\u1ED1ng 10 ml/kg/h",
          defaultRateMlKgH: 10,
          rateOptions: [10],
          defaultDurationHours: 1,
          durationOptions: [1, 2],
          hctCheckRequired: true,
          notes: "N\u1EBFu kh\xF4ng ra s\u1ED1c ho\u1EB7c Hct t\u0103ng cao -> h\u1ED9i ch\u1EA9n \u0111\u1ED5i Cao ph\xE2n t\u1EED."
        },
        {
          stageName: "C\u1EEF 3: Ti\u1EBFp t\u1EE5c gi\u1EA3m xu\u1ED1ng 7.5 ml/kg/h",
          defaultRateMlKgH: 7.5,
          rateOptions: [7.5],
          defaultDurationHours: 2,
          durationOptions: [1, 2],
          hctCheckRequired: false,
          notes: "Duy tr\xEC t\u01B0 th\u1EBF n\u1EB1m ngang, \u1EE7 \u1EA5m."
        },
        {
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 5 ml/kg/h",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 4,
          durationOptions: [2, 4],
          hctCheckRequired: true,
          notes: "Ki\u1EC3m tra Hct m\u1ED7i 2-4h."
        },
        {
          stageName: "C\u1EEF 5: Gi\u1EA3m xu\u1ED1ng 3 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: false,
          notes: "Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1 ml/kg/h."
        },
        {
          stageName: "C\u1EEF 6: Duy tr\xEC 1.5 ml/kg/h & Cai d\u1ECBch",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 6,
          durationOptions: [4, 6, 8, 12],
          hctCheckRequired: true,
          notes: "T\u1ED5ng th\u1EDDi gian truy\u1EC1n d\u1ECBch ch\u1ED1ng s\u1ED1c th\u01B0\u1EDDng kh\xF4ng qu\xE1 24 - 48 gi\u1EDD."
        }
      ],
      adolescent: [
        {
          stageName: "C\u1EEF 1: T\u1EA3i nhanh ch\u1ED1ng s\u1ED1c (15-20 ml/kg/h)",
          defaultRateMlKgH: 15,
          rateOptions: [15, 20],
          defaultDurationHours: 1,
          durationOptions: [1],
          hctCheckRequired: true,
          notes: "Theo d\xF5i s\xE1t Hct v\xE0 sinh hi\u1EC7u sau 1 gi\u1EDD."
        },
        {
          stageName: "C\u1EEF 2: Gi\u1EA3m xu\u1ED1ng 10 ml/kg/h",
          defaultRateMlKgH: 10,
          rateOptions: [10],
          defaultDurationHours: 1,
          durationOptions: [1],
          hctCheckRequired: true,
          notes: "Ki\u1EC3m tra xem ra s\u1ED1c hay t\xE1i s\u1ED1c."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m xu\u1ED1ng 5 ml/kg/h",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 2,
          durationOptions: [2, 3],
          hctCheckRequired: false,
          notes: "R\xFAt ng\u1EAFn th\u1EDDi gian m\u1ED7i n\u1EA5c ph\xF2ng ng\u1EEBa qu\xE1 t\u1EA3i."
        },
        {
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 3 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 2,
          durationOptions: [2, 3],
          hctCheckRequired: true,
          notes: "\u0110\xE1nh gi\xE1 tri gi\xE1c v\xE0 n\u01B0\u1EDBc ti\u1EC3u."
        },
        {
          stageName: "C\u1EEF 5: Duy tr\xEC 1.5 ml/kg/h & Cai d\u1ECBch",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: true,
          notes: "Chu\u1EA9n b\u1ECB ng\u01B0ng d\u1ECBch an to\xE0n."
        }
      ],
      adult: [
        {
          stageName: "C\u1EEF 1: T\u1EA3i d\u1ECBch ch\u1ED1ng s\u1ED1c ng\u01B0\u1EDDi l\u1EDBn (15 ml/kg/h)",
          defaultRateMlKgH: 15,
          rateOptions: [15],
          defaultDurationHours: 1,
          durationOptions: [1],
          hctCheckRequired: true,
          notes: "B\xF9 d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng. \u0110o Hct ngay k\u1EBFt th\xFAc 1 gi\u1EDD."
        },
        {
          stageName: "C\u1EEF 2: Ra s\u1ED1c - Gi\u1EA3m xu\u1ED1ng 10 ml/kg/h",
          defaultRateMlKgH: 10,
          rateOptions: [10],
          defaultDurationHours: 1,
          durationOptions: [1, 2],
          hctCheckRequired: true,
          notes: "\u0110\xE1nh gi\xE1 m\u1EA1ch, huy\u1EBFt \xE1p, n\u01B0\u1EDBc ti\u1EC3u."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m xu\u1ED1ng 5 ml/kg/h",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 2,
          durationOptions: [2, 3],
          hctCheckRequired: false,
          notes: "L\u1EAFng nghe ran ph\u1ED5i, \u0111\u1EC1 ph\xF2ng ph\xF9 ph\u1ED5i c\u1EA5p."
        },
        {
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 3 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 3,
          durationOptions: [2, 3, 4],
          hctCheckRequired: true,
          notes: "Ki\u1EC3m tra Hct."
        },
        {
          stageName: "C\u1EEF 5: Duy tr\xEC 1.5 ml/kg/h",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: true,
          notes: "Gi\u1EA3m d\u1EA7n v\xE0 ng\u1EEBng truy\u1EC1n d\u1ECBch."
        }
      ]
    },
    // 3. Sốc SXHD Nặng / Nguy kịch (Mạch 0, HA 0)
    severe_shock: {
      child: [
        {
          stageName: "C\u1EEF 1: B\u01A1m tr\u1EF1c ti\u1EBFp t\u0129nh m\u1EA1ch 15-20 ml/kg trong 15 ph\xFAt",
          defaultRateMlKgH: 60,
          // Tương đương 15ml/kg trong 15 phút (0.25h)
          rateOptions: [60, 80],
          defaultDurationHours: 0.25,
          durationOptions: [0.25],
          hctCheckRequired: true,
          notes: "D\xF9ng b\u01A1m ti\xEAm ho\u1EB7c t\xFAi \xE9p truy\u1EC1n nhanh tr\u1EF1c ti\u1EBFp. L\u1EADp 2 \u0111\u01B0\u1EDDng truy\u1EC1n t\u0129nh m\u1EA1ch l\u1EDBn."
        },
        {
          stageName: "C\u1EEF 2: N\u1EBFu ra s\u1ED1c -> Gi\u1EA3m xu\u1ED1ng 10 ml/kg/h",
          defaultRateMlKgH: 10,
          rateOptions: [10],
          defaultDurationHours: 1,
          durationOptions: [1, 2],
          hctCheckRequired: true,
          notes: "N\u1EBFu KH\xD4NG ra s\u1ED1c ho\u1EB7c Hct t\u0103ng: \u0111\u1ED5i ngay sang D\u1ECBch Cao Ph\xE2n T\u1EED (Dextran 40/HES 200) 10-15 ml/kg/h."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m xu\u1ED1ng 7.5 ml/kg/h",
          defaultRateMlKgH: 7.5,
          rateOptions: [7.5],
          defaultDurationHours: 2,
          durationOptions: [1, 2],
          hctCheckRequired: false,
          notes: "Theo d\xF5i li\xEAn t\u1EE5c SpO2, ECG, CVP n\u1EBFu c\xF3 ch\u1EC9 \u0111\u1ECBnh."
        },
        {
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 5 ml/kg/h",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 3,
          durationOptions: [2, 3, 4],
          hctCheckRequired: true,
          notes: "\u0110\xE1nh gi\xE1 d\u1EA5u hi\u1EC7u h\u1ED3i ph\u1EE5c t\u01B0\u1EDBi m\xE1u m\xF4."
        },
        {
          stageName: "C\u1EEF 5: Gi\u1EA3m 3 -> 1.5 ml/kg/h & Cai d\u1ECBch",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 4,
          durationOptions: [3, 4],
          hctCheckRequired: true,
          notes: "Chuy\u1EC3n d\u1EA7n sang duy tr\xEC 1.5 ml/kg/h khi huy\u1EBFt \u0111\u1ED9ng ho\xE0n to\xE0n \u1ED5n \u0111\u1ECBnh."
        }
      ],
      adolescent: [
        {
          stageName: "C\u1EEF 1: B\u01A1m tr\u1EF1c ti\u1EBFp t\u0129nh m\u1EA1ch 15-20 ml/kg trong 15 ph\xFAt",
          defaultRateMlKgH: 60,
          rateOptions: [60, 80],
          defaultDurationHours: 0.25,
          durationOptions: [0.25],
          hctCheckRequired: true,
          notes: "Kh\u1EA9n tr\u01B0\u01A1ng l\u1EADp \u0111\u01B0\u1EDDng truy\u1EC1n l\u1EDBn, \u0111o Hct t\u1EA1i gi\u01B0\u1EDDng."
        },
        {
          stageName: "C\u1EEF 2: D\u1ECBch tinh th\u1EC3 ho\u1EB7c Cao ph\xE2n t\u1EED 10 ml/kg/h",
          defaultRateMlKgH: 10,
          rateOptions: [10],
          defaultDurationHours: 1,
          durationOptions: [1],
          hctCheckRequired: true,
          notes: "\u0110\xE1nh gi\xE1 \u0111\xE1p \u1EE9ng sau 1 gi\u1EDD."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m xu\u1ED1ng 5 ml/kg/h",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 2,
          durationOptions: [1, 2],
          hctCheckRequired: false,
          notes: "Theo d\xF5i s\xE1t n\u01B0\u1EDBc ti\u1EC3u v\xE0 \xE1p l\u1EF1c t\u0129nh m\u1EA1ch trung t\xE2m."
        },
        {
          stageName: "C\u1EEF 4: Duy tr\xEC 3 -> 1.5 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 3,
          durationOptions: [2, 3],
          hctCheckRequired: true,
          notes: "Cai d\u1ECBch s\u1EDBm, tr\xE1nh qu\xE1 t\u1EA3i t\xE1i h\u1EA5p thu."
        }
      ],
      adult: [
        {
          stageName: "C\u1EEF 1: B\u01A1m tr\u1EF1c ti\u1EBFp 15 ml/kg trong 15 ph\xFAt",
          defaultRateMlKgH: 60,
          rateOptions: [60],
          defaultDurationHours: 0.25,
          durationOptions: [0.25],
          hctCheckRequired: true,
          notes: "B\u01A1m nhanh t\u0129nh m\u1EA1ch qua kim 18G ho\u1EB7c truy\u1EC1n d\u01B0\u1EDBi \xE1p l\u1EF1c t\xFAi \xE9p."
        },
        {
          stageName: "C\u1EEF 2: Ra s\u1ED1c -> Duy tr\xEC 10 ml/kg/h",
          defaultRateMlKgH: 10,
          rateOptions: [10],
          defaultDurationHours: 1,
          durationOptions: [1],
          hctCheckRequired: true,
          notes: "N\u1EBFu s\u1ED1c tr\u01A1: \u0111\u1ED5i sang Cao ph\xE2n t\u1EED 10-15 ml/kg/h ho\u1EB7c ph\u1ED1i h\u1EE3p v\u1EADn m\u1EA1ch."
        },
        {
          stageName: "C\u1EEF 3: Gi\u1EA3m xu\u1ED1ng 5 ml/kg/h",
          defaultRateMlKgH: 5,
          rateOptions: [5],
          defaultDurationHours: 2,
          durationOptions: [2, 3],
          hctCheckRequired: false,
          notes: "Kh\xE1m \u0111\xE1y ph\u1ED5i t\xECm ran \u1EA9m."
        },
        {
          stageName: "C\u1EEF 4: Duy tr\xEC 3 -> 1.5 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 4,
          durationOptions: [3, 4],
          hctCheckRequired: true,
          notes: "\u0110\u01B0a v\u1EC1 t\u1ED1c \u0111\u1ED9 an to\xE0n v\xE0 ng\u01B0ng d\u1ECBch."
        }
      ]
    }
  };
  var DENGUE_NURSING_CHECKLIST = [
    "\u0110o sinh hi\u1EC7u (M\u1EA1ch, HA, Nh\u1ECBp th\u1EDF, SpO2) v\xE0 ki\u1EC3m tra tri gi\xE1c tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9 truy\u1EC1n.",
    "\u0110o Hct t\u1EA1i gi\u01B0\u1EDDng tr\u01B0\u1EDBc v\xE0 sau m\u1ED7i \u0111\u1EE3t t\u0103ng/gi\u1EA3m t\u1ED1c \u0111\u1ED9 d\u1ECBch ho\u1EB7c khi b\u1EC7nh nh\xE2n b\u1EE9t r\u1EE9t, v\xE3 m\u1ED3 h\xF4i, chi l\u1EA1nh.",
    "\u0110\u1EB7t sonde ti\u1EC3u theo d\xF5i l\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u m\u1ED7i gi\u1EDD \u1EDF b\u1EC7nh nh\xE2n s\u1ED1c; b\xE1o b\xE1c s\u0129 ngay n\u1EBFu n\u01B0\u1EDBc ti\u1EC3u < 0.5 ml/kg/h.",
    "Ki\u1EC3m tra \u0111\u1ECBnh k\u1EF3 d\u1ECBch d\u01B0 trong chai tr\u01B0\u1EDBc khi treo th\xEAm chai m\u1EDBi; ghi r\xF5 s\u1ED1 ml d\u1ECBch hi\u1EC7n t\u1EA1i v\xE0o h\u1ED3 s\u01A1.",
    "L\u1EAFng nghe ph\u1ED5i t\xECm ran \u1EA9m, ph\xE1t hi\u1EC7n s\u1EDBm ph\xF9 ph\u1ED5i c\u1EA5p (kh\xF3 th\u1EDF, b\u1ECDt h\u1ED3ng, SpO2 t\u1EE5t, gan to nhanh \u0111au t\u1EE9c).",
    "Tuy\u1EC7t \u0111\u1ED1i c\u1EA5m ti\xEAm b\u1EAFp, d\xF9ng Aspirin, Ibuprofen v\xE0 c\xE1c thu\u1ED1c NSAIDs.",
    'B\xE0n giao c\u1EEF r\xF5 r\xE0ng: D\xF9ng n\xFAt "Sao Ch\xE9p B\u1EA3ng B\xE0n Giao C\u1EEF" tr\xEAn CDSS \u0111\u1EC3 d\xE1n v\xE0o phi\u1EBFu theo d\xF5i giao ban.'
  ];

  // src/content/docspace/public/cdss/dengue/dengue-engine.ts
  function classifyAgeGroup(ageYears) {
    if (ageYears >= 16) return "adult";
    if (ageYears >= 13) return "adolescent";
    return "child";
  }
  function calculateWeightAdjustment(ageYears, gender, actualWeightKg) {
    const stdWeight = getCDCStandardWeight(ageYears, gender);
    const ratio = actualWeightKg / stdWeight;
    const isObese = ratio > 1.2;
    let adjustedWeightKg = actualWeightKg;
    let formulaNote = "C\xE2n n\u1EB7ng th\u1EF1c t\u1EBF (Kh\xF4ng qu\xE1 ng\u01B0\u1EE1ng th\u1EEBa c\xE2n 120%)";
    let warningText = void 0;
    if (isObese) {
      if (ageYears < 16) {
        adjustedWeightKg = stdWeight;
        formulaNote = `\xC1p d\u1EE5ng C\xE2n n\u1EB7ng chu\u1EA9n CDC 2014 (${stdWeight} kg) thay cho c\xE2n n\u1EB7ng th\u1EF1c (${actualWeightKg} kg) do v\u01B0\u1EE3t ng\u01B0\u1EE1ng 120% (${Math.round(ratio * 100)}% chu\u1EA9n tu\u1ED5i).`;
        warningText = `C\u1EA3nh b\xE1o: Tr\u1EBB th\u1EEBa c\xE2n / b\xE9o ph\xEC (${Math.round(ratio * 100)}% so v\u1EDBi chu\u1EA9n tu\u1ED5i). B\u1EAFt bu\u1ED9c d\xF9ng c\xE2n n\u1EB7ng chu\u1EA9n ${stdWeight} kg \u0111\u1EC3 t\xEDnh d\u1ECBch nh\u1EB1m tr\xE1nh ph\xF9 ph\u1ED5i c\u1EA5p v\xE0 qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n.`;
      } else {
        adjustedWeightKg = Math.min(actualWeightKg, 65);
        formulaNote = `Ng\u01B0\u1EDDi l\u1EDBn b\xE9o ph\xEC: C\xE2n n\u1EB7ng t\xEDnh d\u1ECBch hi\u1EC7u ch\u1EC9nh t\u1ED1i \u0111a ${adjustedWeightKg} kg`;
        warningText = `Ng\u01B0\u1EDDi l\u1EDBn th\u1EC3 tr\u1ECDng l\u1EDBn (${actualWeightKg} kg): C\u1EA7n gi\xE1m s\xE1t ch\u1EB7t ch\u1EBD \xE1p l\u1EF1c t\u0129nh m\u1EA1ch v\xE0 ran \u0111\xE1y ph\u1ED5i khi b\xF9 d\u1ECBch.`;
      }
    }
    return {
      actualWeightKg,
      standardWeightKg: stdWeight,
      isObese,
      ratioToStandard: ratio,
      adjustedWeightKg,
      formulaNote,
      warningText
    };
  }
  function addHoursToTime(startTimeStr, hoursToAdd) {
    const [hStr, mStr] = startTimeStr.split(":");
    let totalMinutes = parseInt(hStr || "8", 10) * 60 + parseInt(mStr || "0", 10) + Math.round(hoursToAdd * 60);
    totalMinutes = (totalMinutes % (24 * 60) + 24 * 60) % (24 * 60);
    const newH = Math.floor(totalMinutes / 60);
    const newM = totalMinutes % 60;
    return `${newH.toString().padStart(2, "0")}:${newM.toString().padStart(2, "0")}`;
  }
  function calculateFluidSchedule(patient, effectiveWeightKg, customDurations) {
    const ageGroup = classifyAgeGroup(patient.ageYears);
    const templates = DENGUE_FLUID_TEMPLATES[patient.severity][ageGroup];
    let currentClock = patient.startTime || "08:00";
    let carryingFluidMl = 0;
    let totalVolumeMl = 0;
    let totalDurationHours = 0;
    const rows = [];
    templates.forEach((tpl, idx) => {
      const duration = customDurations?.[idx] !== void 0 ? customDurations[idx] : tpl.defaultDurationHours;
      const rate = tpl.defaultRateMlKgH;
      const neededMl = Math.round(rate * effectiveWeightKg * duration);
      totalVolumeMl += neededMl;
      totalDurationHours += duration;
      const dropsPerMin = Math.round(rate * effectiveWeightKg / 3);
      const endClock = addHoursToTime(currentClock, duration);
      const timeWindow = `${currentClock} - ${endClock} (${duration}h)`;
      const existingFluidMl = carryingFluidMl;
      const deficitMl = Math.max(0, neededMl - existingFluidMl);
      const bottlesToHang = Math.ceil(deficitMl / 500);
      const addedFluidMl = bottlesToHang * 500;
      const totalAtPoleMl = existingFluidMl + addedFluidMl;
      carryingFluidMl = Math.max(0, totalAtPoleMl - neededMl);
      rows.push({
        stepIndex: idx + 1,
        stageName: tpl.stageName,
        durationHours: duration,
        rateMlKgH: rate,
        dropsPerMin,
        totalMl: neededMl,
        timeWindow,
        existingFluidMl,
        bottlesToHang,
        bottleType: "500ml",
        totalAtPoleMl,
        monitoringNotes: tpl.notes,
        hctCheckRequired: tpl.hctCheckRequired
      });
      currentClock = endClock;
    });
    return { rows, totalVolumeMl, totalDurationHours };
  }
  function calculateVasopressorDoses(effectiveWeightKg) {
    const dopaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
    const dopamin = {
      drugName: "Dopamin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Dopamin (mg) = 3 \xD7 C\xE2n n\u1EB7ng (kg)",
      totalMg: dopaminTotalMg,
      diluentSolution: "Glucose 5% ho\u1EB7c NaCl 0.9%",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "5 - 10 \xB5g/kg/ph\xFAt (duy tr\xEC t\u1ED1i \u0111a 20 \xB5g/kg/ph\xFAt)",
      recommendedPumpRateMlH: "5 - 10 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "Ch\u1EC9 \u0111\u1ECBnh h\xE0ng \u0111\u1EA7u khi s\u1ED1c SXHD t\xE1i s\u1ED1c ho\u1EB7c s\u1ED1c tr\u01A1 d\u1ECBch k\xE8m CVP > 10 cmH2O ho\u1EB7c suy gi\u1EA3m s\u1EE9c co b\xF3p c\u01A1 tim.",
      precautions: "Kh\xF4ng pha chung v\u1EDBi dung d\u1ECBch ki\u1EC1m (Natri Bicarbonat). Theo d\xF5i li\xEAn t\u1EE5c nh\u1ECBp tim tr\xEAn monitor, gi\u1EA3m li\u1EC1u khi c\xF3 lo\u1EA1n nh\u1ECBp nhanh."
    };
    const noradrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
    const noradrenalin = {
      drugName: "Noradrenalin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Noradrenalin (mg) = 0.3 \xD7 C\xE2n n\u1EB7ng (kg)",
      totalMg: noradrenalinTotalMg,
      diluentSolution: "Glucose 5% v\u1EEBa \u0111\u1EE7 50ml",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 0.1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "0.05 - 0.5 \xB5g/kg/ph\xFAt (ch\u1EC9nh li\u1EC1u theo Huy\u1EBFt \xE1p m\u1EE5c ti\xEAu)",
      recommendedPumpRateMlH: "0.5 - 5 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "Ch\u1EC9 \u0111\u1ECBnh khi s\u1ED1c SXHD c\xF3 t\u1EE5t huy\u1EBFt \xE1p t\xE2m tr\u01B0\u01A1ng n\u1EB7ng, \xE1p l\u1EF1c m\u1EA1ch gi\xE3n r\u1ED9ng (s\u1ED1c gi\xE3n m\u1EA1ch) ho\u1EB7c th\u1EA5t b\u1EA1i v\u1EDBi Dopamin.",
      precautions: "B\u1EAFt bu\u1ED9c truy\u1EC1n qua t\u0129nh m\u1EA1ch l\u1EDBn ho\u1EB7c catheter t\u0129nh m\u1EA1ch trung t\xE2m. Nguy c\u01A1 ho\u1EA1i t\u1EED m\xF4 n\u1EBFu tho\xE1t m\u1EA1ch."
    };
    return { dopamin, noradrenalin };
  }
  function generateDengueCDSSPlan(patient, customDurations) {
    const ageGroup = classifyAgeGroup(patient.ageYears);
    const weightResult = calculateWeightAdjustment(patient.ageYears, patient.gender, patient.actualWeightKg);
    const effectiveWeight = weightResult.adjustedWeightKg;
    const { rows, totalVolumeMl, totalDurationHours } = calculateFluidSchedule(
      patient,
      effectiveWeight,
      customDurations
    );
    const { dopamin, noradrenalin } = calculateVasopressorDoses(effectiveWeight);
    const alerts = [];
    if (weightResult.isObese) {
      alerts.push({
        id: "alert_obese",
        level: "danger",
        title: "C\u1EA2NH B\xC1O QU\xC1 T\u1EA2I D\u1ECACH \u1EDE TR\u1EBA TH\u1EEAA C\xC2N / B\xC9O PH\xCC",
        message: weightResult.warningText || "B\u1EC7nh nh\xE2n th\u1EEBa c\xE2n. B\u1EAFt bu\u1ED9c d\xF9ng c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh CDC 2014.",
        ruleCode: "CDC_2014_OBESE_RULE"
      });
    }
    if (patient.severity === "severe_shock") {
      alerts.push({
        id: "alert_severe_shock",
        level: "danger",
        title: "S\u1ED0C SXHD NGUY K\u1ECACH (M\u1EA0CH = 0, HUY\u1EBET \xC1P = 0)",
        message: "B\u01A1m tr\u1EF1c ti\u1EBFp t\u0129nh m\u1EA1ch 15-20 ml/kg trong 15 ph\xFAt. L\u1EADp ngay 2 \u0111\u01B0\u1EDDng truy\u1EC1n kim l\u1EDBn. Chu\u1EA9n b\u1ECB s\u1EB5n D\u1ECBch Cao Ph\xE2n T\u1EED (Dextran 40 / HES 200) v\xE0 thu\u1ED1c v\u1EADn m\u1EA1ch.",
        ruleCode: "SEVERE_SHOCK_EMERGENCY"
      });
    } else if (patient.severity === "shock") {
      alerts.push({
        id: "alert_shock",
        level: "warning",
        title: "S\u1ED0C SXHD (C\xD2N B\xD9) \u2014 C\u1EA6N \u0110O L\u1EA0I HCT SAU 1 GI\u1EDC",
        message: "T\u1EA3i nhanh 15-20 ml/kg/h trong gi\u1EDD \u0111\u1EA7u. B\u1EAFt bu\u1ED9c \u0111o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng tr\u01B0\u1EDBc khi chuy\u1EC3n c\u1EEF truy\u1EC1n.",
        ruleCode: "SHOCK_RESUS_1H"
      });
    }
    if (totalDurationHours > 24) {
      alerts.push({
        id: "alert_prolonged_fluid",
        level: "warning",
        title: "T\u1ED4NG TH\u1EDCI GIAN TRUY\u1EC0N D\u1ECACH > 24 GI\u1EDC",
        message: "Nguy c\u01A1 t\xE1i h\u1EA5p thu d\u1ECBch l\xF2ng m\u1EA1ch g\xE2y ph\xF9 ph\u1ED5i c\u1EA5p ho\u1EB7c suy h\xF4 h\u1EA5p do tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i/m\xE0ng b\u1EE5ng. R\xE0 so\xE1t gi\u1EA3m t\u1ED1c \u0111\u1ED9 v\xE0 cai d\u1ECBch s\u1EDBm.",
        ruleCode: "FLUID_OVERLOAD_RISK"
      });
    }
    const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN");
    const soapLines = [
      `--- K\u1EBE HO\u1EA0CH B\xD9 D\u1ECACH SXHD DENGUE (CDSS BYT 2023) [${dateStr}] ---`,
      `B\u1EC7nh nh\xE2n: ${patient.ageYears} tu\u1ED5i, Gi\u1EDBi t\xEDnh: ${patient.gender === "male" ? "Nam" : "N\u1EEF"}`,
      `Ph\xE2n \u0111\u1ED9: ${patient.severity === "warning_signs" ? "SXHD c\xF3 D\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o" : patient.severity === "shock" ? "S\u1ED1c SXHD" : "S\u1ED1c SXHD n\u1EB7ng nguy k\u1ECBch"}`,
      `C\xE2n n\u1EB7ng th\u1EF1c: ${patient.actualWeightKg} kg | C\xE2n n\u1EB7ng chu\u1EA9n: ${weightResult.standardWeightKg} kg | C\xE2n n\u1EB7ng t\xEDnh d\u1ECBch: ${effectiveWeight} kg`,
      ...weightResult.isObese ? [`[L\u01AFU \xDD]: \u0110\xE3 hi\u1EC7u ch\u1EC9nh theo chu\u1EA9n CDC 2014 \u0111\u1EC3 tr\xE1nh qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n.`] : [],
      `T\u1ED5ng th\u1EC3 t\xEDch d\u1EF1 ki\u1EBFn: ${totalVolumeMl} ml (${Math.round(totalVolumeMl / effectiveWeight)} ml/kg) trong ${totalDurationHours} gi\u1EDD.`,
      `
B\u1EA2NG C\u1ECCC D\u1ECACH \u0110I\u1EC0U TR\u1ECA:`,
      ...rows.map((r) => `  \u2022 C\u1EEF ${r.stepIndex}: ${r.timeWindow} | T\u1ED1c \u0111\u1ED9 ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} gi\u1ECDt/ph\xFAt) | C\u1EA7n ${r.totalMl} ml (Treo th\xEAm ${r.bottlesToHang} chai 500ml) | T\u1EA1i c\u1ECDc: ${r.totalAtPoleMl} ml`),
      `
LI\u1EC0U V\u1EACN M\u1EA0CH (KHI S\u1ED0C TR\u01A0 / CVP > 10 cmH2O):`,
      `  \u2022 Dopamin: Pha ${dopamin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 5-10 ml/h).`,
      `  \u2022 Noradrenalin: Pha ${noradrenalin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 0.1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 0.5-2 ml/h).`,
      `
\u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N: \u0110o Hct tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9; Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1.0 ml/kg/h; B\xE1o BS ngay n\u1EBFu n\u01B0\u1EDBc ti\u1EC3u < 0.5 ml/kg/h ho\u1EB7c ran \u1EA9m ph\u1ED5i.`
    ];
    return {
      patient,
      ageGroup,
      weightResult,
      fluidRows: rows,
      totalVolumeMl,
      totalDurationHours,
      vasopressorDopamin: dopamin,
      vasopressorNoradrenalin: noradrenalin,
      alerts,
      nursingInstructions: DENGUE_NURSING_CHECKLIST,
      soapExportText: soapLines.join("\n"),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }

  // src/content/docspace/public/cdss/dengue/dengue-ui.ts
  var DengueCDSSController = class {
    constructor(containerId) {
      this.currentPlan = null;
      this.customDurations = {};
      const el = document.getElementById(containerId);
      if (!el) {
        throw new Error(`Container #${containerId} not found`);
      }
      this.container = el;
      this.init();
    }
    init() {
      this.renderInitialLayout();
      this.attachEventListeners();
      this.recalculate();
    }
    renderInitialLayout() {
      const now = /* @__PURE__ */ new Date();
      const curTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      this.container.innerHTML = `
      <div class="dengue-cdss-app">
        <!-- Header Banner -->
        <header class="cdss-header-card">
          <div class="cdss-header-meta">
            <div class="cdss-badge-wrap">
              <span class="cdss-badge cdss-badge--danger"><i class="fa-solid fa-triangle-exclamation"></i> C\u1EA5p C\u1EE9u Truy\u1EC1n Nhi\u1EC5m</span>
              <span class="cdss-badge cdss-badge--info">Q\u0110 2760/Q\u0110-BYT 2023</span>
              <span class="cdss-badge cdss-badge--primary">CDC 2014 Standard</span>
            </div>
            <h1 class="cdss-title">
              <i class="fa-solid fa-droplet cdss-icon-pulse"></i> 
              CDSS T\xEDnh To\xE1n D\u1ECBch Truy\u1EC1n & Ch\u1ED1ng S\u1ED1c SXHD Dengue
            </h1>
            <p class="cdss-subtitle">
              H\u1EC7 th\u1ED1ng H\u1ED7 tr\u1EE3 Quy\u1EBFt \u0111\u1ECBnh L\xE2m s\xE0ng: T\u1EF1 \u0111\u1ED9ng chu\u1EA9n h\xF3a c\xE2n n\u1EB7ng CDC 2014, \u0111i\u1EC1u ph\u1ED1i c\u1ECDc d\u1ECBch 4 c\u1ED9t \u0111\u1ED9ng h\u1ECDc v\xE0 t\xEDnh li\u1EC1u v\u1EADn m\u1EA1ch b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml.
            </p>
          </div>
          <div class="cdss-header-actions">
            <button id="btn-copy-soap" class="cdss-btn cdss-btn--primary">
              <i class="fa-solid fa-notes-medical"></i> Ch\xE9p V\xE0o B\u1EC7nh \xC1n
            </button>
            <button id="btn-copy-handover" class="cdss-btn cdss-btn--secondary">
              <i class="fa-solid fa-clipboard-check"></i> Ch\xE9p B\xE0n Giao Ca
            </button>
            <button id="btn-print" class="cdss-btn cdss-btn--ghost">
              <i class="fa-solid fa-print"></i> In Phi\u1EBFu
            </button>
          </div>
        </header>

        <!-- Main Grid Layout -->
        <div class="cdss-main-grid">
          <!-- Left Column: Patient Parameters Form -->
          <aside class="cdss-sidebar-col">
            <div class="cdss-panel cdss-form-panel">
              <h2 class="cdss-panel-title">
                <i class="fa-solid fa-user-injured"></i> Th\xF4ng Tin & Ph\xE2n T\u1EA7ng
              </h2>

              <form id="dengue-input-form" class="cdss-form">
                <!-- Tu\u1ED5i & Gi\u1EDBi t\xEDnh -->
                <div class="cdss-form-row">
                  <div class="cdss-form-group cdss-col-6">
                    <label for="input-age">Tu\u1ED5i (N\u0103m)</label>
                    <input type="number" id="input-age" min="1" max="100" value="8" step="1" required class="cdss-input" />
                  </div>
                  <div class="cdss-form-group cdss-col-6">
                    <label>Gi\u1EDBi T\xEDnh</label>
                    <div class="cdss-radio-group">
                      <label class="cdss-radio-label">
                        <input type="radio" name="gender" value="male" checked /> Nam
                      </label>
                      <label class="cdss-radio-label">
                        <input type="radio" name="gender" value="female" /> N\u1EEF
                      </label>
                    </div>
                  </div>
                </div>

                <!-- C\xE2n n\u1EB7ng th\u1EF1c t\u1EBF -->
                <div class="cdss-form-group">
                  <label for="input-weight">
                    C\xE2n N\u1EB7ng Th\u1EF1c T\u1EBF (kg)
                    <span class="cdss-tooltip" title="C\xE2n n\u1EB7ng khi ti\u1EBFp nh\u1EADn ph\xF2ng c\u1EA5p c\u1EE9u">
                      <i class="fa-solid fa-circle-question"></i>
                    </span>
                  </label>
                  <div class="cdss-input-addon-wrap">
                    <input type="number" id="input-weight" min="5" max="150" value="38" step="0.5" required class="cdss-input" />
                    <span class="cdss-input-addon">kg</span>
                  </div>
                  <span class="cdss-input-hint">VD: B\xE9 8 tu\u1ED5i, n\u1EB7ng 38kg (Th\u1EEBa c\xE2n > 120% chu\u1EA9n)</span>
                </div>

                <!-- Ph\xE2n \u0111\u1ED9 l\xE2m s\xE0ng -->
                <div class="cdss-form-group">
                  <label for="input-severity">Ph\xE2n \u0110\u1ED9 L\xE2m S\xE0ng SXHD</label>
                  <select id="input-severity" class="cdss-select">
                    <option value="warning_signs" selected>1. C\xF3 D\u1EA5u Hi\u1EC7u C\u1EA3nh B\xE1o (DHCB)</option>
                    <option value="shock">2. S\u1ED1c SXHD (C\xF2n B\xF9)</option>
                    <option value="severe_shock">3. S\u1ED1c Nguy K\u1ECBch (M\u1EA1ch 0, HA 0)</option>
                  </select>
                </div>

                <!-- Gi\u1EDD b\u1EAFt \u0111\u1EA7u truy\u1EC1n -->
                <div class="cdss-form-group">
                  <label for="input-starttime">M\u1ED1c Gi\u1EDD B\u1EAFt \u0110\u1EA7u Truy\u1EC1n</label>
                  <input type="time" id="input-starttime" value="${curTime}" class="cdss-input" />
                </div>

                <div class="cdss-form-actions">
                  <button type="button" id="btn-quick-child" class="cdss-chip-btn">
                    <i class="fa-solid fa-child"></i> Tr\u1EBB 8T B\xE9o Ph\xEC (38kg)
                  </button>
                  <button type="button" id="btn-quick-adult" class="cdss-chip-btn">
                    <i class="fa-solid fa-user"></i> Ng\u01B0\u1EDDi L\u1EDBn S\u1ED1c (55kg)
                  </button>
                  <button type="button" id="btn-quick-severe" class="cdss-chip-btn cdss-chip-btn--danger">
                    <i class="fa-solid fa-bolt"></i> S\u1ED1c N\u1EB7ng (M\u1EA1ch 0 HA 0)
                  </button>
                </div>
              </form>
            </div>

            <!-- Box Th\xF4ng Tin C\xE2n N\u1EB7ng CDC -->
            <div id="weight-analysis-box" class="cdss-panel cdss-weight-panel">
              <!-- Rendered via updateWeightAnalysis -->
            </div>
          </aside>

          <!-- Right Column: CDSS Results, 4-Column Table, Vasopressors -->
          <main class="cdss-content-col">
            <!-- Alert Banner Container -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-wrap"></div>

            <!-- Summary Stat Cards -->
            <div id="cdss-stats-wrap" class="cdss-stats-grid"></div>

            <!-- B\u1EA2NG C\u1ECCC D\u1ECACH 4 C\u1ED8T -->
            <section class="cdss-panel cdss-schedule-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-table-list"></i> B\u1EA3ng \u0110i\u1EC1u Ph\u1ED1i C\u1ECDc D\u1ECBch 4 C\u1ED9t Chu\u1EA9n H\xF3a
                  </h2>
                  <p class="cdss-panel-desc">
                    T\u1EF1 \u0111\u1ED9ng t\xEDnh to\xE1n l\u01B0\u1EE3ng d\u1ECBch g\u1ED9p, s\u1ED1 gi\u1ECDt/ph\xFAt, d\u1ECBch d\u01B0 chuy\u1EC3n c\u1EEF v\xE0 s\u1ED1 chai 500ml treo th\xEAm t\u1EA1i c\u1ECDc.
                  </p>
                </div>
                <button id="btn-reset-durations" class="cdss-btn cdss-btn--sm cdss-btn--ghost" title="Kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng chu\u1EA9n B\u1ED9 Y T\u1EBF">
                  <i class="fa-solid fa-clock-rotate-left"></i> \u0110\u1EB7t L\u1EA1i Gi\u1EDD Chu\u1EA9n
                </button>
              </div>

              <div class="cdss-table-responsive">
                <table id="cdss-fluid-table" class="cdss-table">
                  <thead>
                    <tr>
                      <th style="width: 22%;">C\u1ED9t 1: M\u1ED1c Gi\u1EDD & Th\u1EDDi L\u01B0\u1EE3ng</th>
                      <th style="width: 28%;">C\u1ED9t 2: T\u1ED1c \u0110\u1ED9 & L\u01B0\u1EE3ng D\u1ECBch C\u1EA7n</th>
                      <th style="width: 26%;">C\u1ED9t 3: D\u1ECBch C\xF3 S\u1EB5n / Treo Th\xEAm</th>
                      <th style="width: 24%;">C\u1ED9t 4: T\u1ED5ng D\u1ECBch T\u1EA1i C\u1ECDc & Gi\xE1m S\xE1t</th>
                    </tr>
                  </thead>
                  <tbody id="cdss-fluid-tbody">
                    <!-- Dynamic Rows -->
                  </tbody>
                </table>
              </div>
            </section>

            <!-- KH\u1ED0I V\u1EACN M\u1EA0CH B\u01A0M TI\xCAM \u0110I\u1EC6N 50ML -->
            <section class="cdss-panel cdss-vasopressor-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-syringe"></i> Ph\xE1c \u0110\u1ED3 Thu\u1ED1c V\u1EADn M\u1EA1ch B\u01A1m Ti\xEAm \u0110i\u1EC7n 50ml
                  </h2>
                  <p class="cdss-panel-desc">
                    \xC1p d\u1EE5ng khi t\xE1i s\u1ED1c ho\u1EB7c s\u1ED1c tr\u01A1 d\u1ECBch truy\u1EC1n (\u0111\xE3 b\xF9 \u0111\u1EE7 th\u1EC3 t\xEDch n\u1ED9i m\u1EA1ch ho\u1EB7c CVP > 10 cmH\u2082O).
                  </p>
                </div>
              </div>

              <div class="cdss-vasopressor-grid" id="cdss-vaso-grid">
                <!-- Dopamin & Noradrenalin Cards -->
              </div>
            </section>

            <!-- H\u01AF\u1EDANG D\u1EAAN \u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N (HKKK) -->
            <section class="cdss-panel cdss-nursing-panel">
              <h2 class="cdss-panel-title">
                <i class="fa-solid fa-user-nurse"></i> Quy Tr\xECnh \u0110i\u1EC1u D\u01B0\u1EE1ng An To\xE0n & Theo D\xF5i Gi\u1EDD
              </h2>
              <ul class="cdss-nursing-list" id="cdss-nursing-list">
                <!-- Nursing items -->
              </ul>
            </section>
          </main>
        </div>

        <!-- Toast Notification -->
        <div id="cdss-toast" class="cdss-toast" style="display:none;"></div>
      </div>
    `;
    }
    attachEventListeners() {
      const form = document.getElementById("dengue-input-form");
      if (form) {
        form.addEventListener("input", () => this.recalculate());
        form.addEventListener("change", () => this.recalculate());
      }
      const btnChild = document.getElementById("btn-quick-child");
      if (btnChild) {
        btnChild.addEventListener("click", () => {
          this.setInputValue("input-age", "8");
          this.setGender("male");
          this.setInputValue("input-weight", "38");
          this.setInputValue("input-severity", "warning_signs");
          this.customDurations = {};
          this.recalculate();
        });
      }
      const btnAdult = document.getElementById("btn-quick-adult");
      if (btnAdult) {
        btnAdult.addEventListener("click", () => {
          this.setInputValue("input-age", "28");
          this.setGender("male");
          this.setInputValue("input-weight", "55");
          this.setInputValue("input-severity", "shock");
          this.customDurations = {};
          this.recalculate();
        });
      }
      const btnSevere = document.getElementById("btn-quick-severe");
      if (btnSevere) {
        btnSevere.addEventListener("click", () => {
          this.setInputValue("input-age", "11");
          this.setGender("female");
          this.setInputValue("input-weight", "35");
          this.setInputValue("input-severity", "severe_shock");
          this.customDurations = {};
          this.recalculate();
        });
      }
      const btnResetDur = document.getElementById("btn-reset-durations");
      if (btnResetDur) {
        btnResetDur.addEventListener("click", () => {
          this.customDurations = {};
          this.recalculate();
          this.showToast("\u0110\xE3 kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng c\u1EEF chu\u1EA9n theo B\u1ED9 Y T\u1EBF!");
        });
      }
      const btnCopyHandover = document.getElementById("btn-copy-handover");
      if (btnCopyHandover) {
        btnCopyHandover.addEventListener("click", () => this.copyHandoverReport());
      }
      const btnCopySoap = document.getElementById("btn-copy-soap");
      if (btnCopySoap) {
        btnCopySoap.addEventListener("click", () => this.copySoapPlan());
      }
      const btnPrint = document.getElementById("btn-print");
      if (btnPrint) {
        btnPrint.addEventListener("click", () => window.print());
      }
    }
    setInputValue(id, val) {
      const el = document.getElementById(id);
      if (el) el.value = val;
    }
    setGender(val) {
      const radio = document.querySelector(`input[name="gender"][value="${val}"]`);
      if (radio) radio.checked = true;
    }
    getFormData() {
      const age = parseFloat(document.getElementById("input-age").value) || 8;
      const gender = document.querySelector('input[name="gender"]:checked')?.value || "male";
      const weight = parseFloat(document.getElementById("input-weight").value) || 30;
      const severity = document.getElementById("input-severity").value || "warning_signs";
      const startTime = document.getElementById("input-starttime")?.value || "08:00";
      return {
        ageYears: age,
        gender,
        actualWeightKg: weight,
        severity,
        startTime
      };
    }
    recalculate() {
      const input = this.getFormData();
      this.currentPlan = generateDengueCDSSPlan(input, this.customDurations);
      this.renderPlan(this.currentPlan);
    }
    renderPlan(plan) {
      this.renderWeightAnalysis(plan);
      this.renderAlerts(plan);
      this.renderStats(plan);
      this.renderFluidTable(plan);
      this.renderVasopressors(plan);
      this.renderNursingList(plan);
    }
    renderWeightAnalysis(plan) {
      const box = document.getElementById("weight-analysis-box");
      if (!box) return;
      const { weightResult, ageGroup, patient } = plan;
      const isObese = weightResult.isObese;
      box.innerHTML = `
      <div class="cdss-weight-header">
        <span class="cdss-weight-badge ${isObese ? "cdss-badge--danger" : "cdss-badge--success"}">
          ${isObese ? '<i class="fa-solid fa-triangle-exclamation"></i> Th\u1EEBa C\xE2n / B\xE9o Ph\xEC' : '<i class="fa-solid fa-circle-check"></i> C\xE2n N\u1EB7ng H\u1EE3p L\xFD'}
        </span>
        <span class="cdss-age-tag">
          ${ageGroup === "child" ? "Tr\u1EBB em (< 13 tu\u1ED5i)" : ageGroup === "adolescent" ? "Thi\u1EBFu ni\xEAn (13-15T)" : "Ng\u01B0\u1EDDi l\u1EDBn (\u2265 16T)"}
        </span>
      </div>

      <div class="cdss-weight-comparison">
        <div class="cdss-weight-stat">
          <span class="cdss-stat-label">C\xE2n N\u1EB7ng Th\u1EF1c T\u1EBF</span>
          <span class="cdss-stat-val ${isObese ? "text-danger" : ""}">${weightResult.actualWeightKg} kg</span>
        </div>
        <div class="cdss-weight-stat">
          <span class="cdss-stat-label">Chu\u1EA9n CDC 2014</span>
          <span class="cdss-stat-val text-muted">${weightResult.standardWeightKg} kg</span>
        </div>
        <div class="cdss-weight-stat cdss-weight-stat--primary">
          <span class="cdss-stat-label">C\xC2N T\xCDNH D\u1ECACH (CDSS)</span>
          <span class="cdss-stat-val text-primary font-bold">${weightResult.adjustedWeightKg} kg</span>
        </div>
      </div>

      <div class="cdss-weight-note">
        <i class="fa-solid fa-circle-info"></i>
        <span>${weightResult.formulaNote}</span>
      </div>
    `;
    }
    renderAlerts(plan) {
      const wrap = document.getElementById("cdss-alerts-wrap");
      if (!wrap) return;
      if (plan.alerts.length === 0) {
        wrap.innerHTML = "";
        return;
      }
      wrap.innerHTML = plan.alerts.map((a) => `
      <div class="cdss-alert cdss-alert--${a.level}">
        <div class="cdss-alert-icon">
          <i class="fa-solid ${a.level === "danger" ? "fa-skull-crossbones" : a.level === "warning" ? "fa-triangle-exclamation" : "fa-circle-info"}"></i>
        </div>
        <div class="cdss-alert-content">
          <div class="cdss-alert-title">${a.title}</div>
          <div class="cdss-alert-msg">${a.message}</div>
        </div>
      </div>
    `).join("");
    }
    renderStats(plan) {
      const wrap = document.getElementById("cdss-stats-wrap");
      if (!wrap) return;
      const mlPerKg = Math.round(plan.totalVolumeMl / plan.weightResult.adjustedWeightKg);
      wrap.innerHTML = `
      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--blue">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">T\u1ED5ng Th\u1EC3 T\xEDch D\u1ECBch G\u1ED9p</span>
          <span class="cdss-card-val">${plan.totalVolumeMl.toLocaleString("vi-VN")} <small>ml</small></span>
          <span class="cdss-card-sub">~ ${mlPerKg} ml/kg</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--purple">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">T\u1ED5ng Th\u1EDDi L\u01B0\u1EE3ng D\u1EF1 Ki\u1EBFn</span>
          <span class="cdss-card-val">${plan.totalDurationHours} <small>gi\u1EDD</small></span>
          <span class="cdss-card-sub">${plan.fluidRows.length} b\u1EADc t\u1ED1c \u0111\u1ED9 gi\u1EA3m d\u1EA7n</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--teal">
          <i class="fa-solid fa-bottle-water"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">\u01AF\u1EDBc T\xEDnh S\u1ED1 Chai 500ml</span>
          <span class="cdss-card-val">${Math.ceil(plan.totalVolumeMl / 500)} <small>chai</small></span>
          <span class="cdss-card-sub">Ringer Lactate / NaCl 0.9%</span>
        </div>
      </div>
    `;
    }
    renderFluidTable(plan) {
      const tbody = document.getElementById("cdss-fluid-tbody");
      if (!tbody) return;
      const ageGroup = plan.ageGroup;
      const tpls = DENGUE_FLUID_TEMPLATES[plan.patient.severity][ageGroup];
      tbody.innerHTML = plan.fluidRows.map((r, idx) => {
        const tpl = tpls[idx];
        const durationOptions = tpl?.durationOptions || [r.durationHours];
        const optionsHtml = durationOptions.map((dur) => `
        <option value="${dur}" ${dur === r.durationHours ? "selected" : ""}>${dur} gi\u1EDD</option>
      `).join("");
        return `
        <tr class="cdss-row-${idx % 2 === 0 ? "even" : "odd"}">
          <!-- C\u1ED8T 1: M\u1ED0C GI\u1EDC & TH\u1EDCI L\u01AF\u1EE2NG -->
          <td class="cdss-col-time">
            <div class="cdss-step-badge">C\u1EEF ${r.stepIndex}</div>
            <div class="cdss-time-window">${r.timeWindow}</div>
            <div class="cdss-duration-select-wrap">
              <label><i class="fa-regular fa-clock"></i> Th\u1EDDi l\u01B0\u1EE3ng:</label>
              <select class="cdss-duration-select" data-row-idx="${idx}">
                ${optionsHtml}
              </select>
            </div>
            <div class="cdss-stage-label">${r.stageName}</div>
          </td>

          <!-- C\u1ED8T 2: T\u1ED0C \u0110\u1ED8 & L\u01AF\u1EE2NG D\u1ECACH -->
          <td class="cdss-col-rate">
            <div class="cdss-rate-main">
              <span class="cdss-rate-val">${r.rateMlKgH}</span>
              <span class="cdss-rate-unit">ml/kg/gi\u1EDD</span>
            </div>
            <div class="cdss-rate-drops">
              <i class="fa-solid fa-water"></i> <strong>${r.dropsPerMin}</strong> gi\u1ECDt/ph\xFAt
              <small style="color:var(--vault-muted);">(D\xE2y 20 gi\u1ECDt/ml)</small>
            </div>
            <div class="cdss-rate-calc">
              Th\u1EC3 t\xEDch c\u1EA7n: <strong>${r.totalMl.toLocaleString("vi-VN")} ml</strong>
              <div class="cdss-formula-tiny">(${r.rateMlKgH} \xD7 ${plan.weightResult.adjustedWeightKg}kg \xD7 ${r.durationHours}h)</div>
            </div>
          </td>

          <!-- C\u1ED8T 3: D\u1ECACH C\xD3 S\u1EB4N / TREO TH\xCAM -->
          <td class="cdss-col-bottles">
            <div class="cdss-bottle-flow">
              <div class="cdss-bottle-stat">
                <span class="cdss-label-sm">D\u1ECBch s\u1EB5n t\u1EEB c\u1EEF tr\u01B0\u1EDBc:</span>
                <span class="cdss-val-sm">${r.existingFluidMl} ml</span>
              </div>
              <div class="cdss-bottle-action">
                <span class="cdss-hang-badge ${r.bottlesToHang > 0 ? "cdss-hang-badge--active" : ""}">
                  <i class="fa-solid fa-plus"></i> Treo th\xEAm: <strong>${r.bottlesToHang}</strong> chai 500ml
                </span>
              </div>
            </div>
          </td>

          <!-- C\u1ED8T 4: T\u1ED4NG D\u1ECACH T\u1EA0I C\u1ECCC & GI\xC1M S\xC1T -->
          <td class="cdss-col-pole">
            <div class="cdss-pole-total">
              <span class="cdss-label-sm">T\u1ED5ng c\xF3 tr\xEAn c\u1ECDc:</span>
              <span class="cdss-pole-val">${r.totalAtPoleMl.toLocaleString("vi-VN")} ml</span>
            </div>
            ${r.hctCheckRequired ? `
              <div class="cdss-hct-alert">
                <i class="fa-solid fa-vial"></i> <strong>\u0110o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng</strong>
              </div>
            ` : ""}
            <div class="cdss-monitoring-tip">
              ${r.monitoringNotes}
            </div>
          </td>
        </tr>
      `;
      }).join("");
      const selects = tbody.querySelectorAll(".cdss-duration-select");
      selects.forEach((sel) => {
        sel.addEventListener("change", (e) => {
          const target = e.target;
          const rowIdx = parseInt(target.getAttribute("data-row-idx") || "0", 10);
          const newDur = parseFloat(target.value);
          this.customDurations[rowIdx] = newDur;
          this.recalculate();
        });
      });
    }
    renderVasopressors(plan) {
      const grid = document.getElementById("cdss-vaso-grid");
      if (!grid) return;
      const { vasopressorDopamin: d, vasopressorNoradrenalin: n } = plan;
      grid.innerHTML = `
      <!-- Card Dopamin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div class="cdss-vaso-title">
            <span class="cdss-drug-tag cdss-drug-tag--primary">Dopamin</span>
            <span class="cdss-drug-indication">L\u1EF1a ch\u1ECDn \u0111\u1EA7u tay \u1EDF tr\u1EBB em</span>
          </div>
          <span class="cdss-badge cdss-badge--info">B\u01A1m Ti\xEAm \u0110i\u1EC7n 50ml</span>
        </div>
        <div class="cdss-vaso-body">
          <div class="cdss-vaso-recipe">
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
              <span class="cdss-recipe-val"><strong>${d.totalMg} mg</strong> Dopamin (3 \xD7 ${d.patientWeightKg} kg)</span>
            </div>
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">Dung m\xF4i pha:</span>
              <span class="cdss-recipe-val">Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
            </div>
            <div class="cdss-recipe-row cdss-recipe-highlight">
              <span class="cdss-recipe-key">T\u01B0\u01A1ng \u0111\u01B0\u01A1ng li\u1EC1u:</span>
              <span class="cdss-recipe-val"><strong>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 1 \xB5g/kg/ph\xFAt</strong></span>
            </div>
          </div>
          <div class="cdss-vaso-dosing">
            <div class="cdss-dosing-range">
              Li\u1EC1u khuy\u1EBFn c\xE1o: <strong>${d.standardDoseRange}</strong>
            </div>
            <div class="cdss-pump-rate">
              T\u1ED1c \u0111\u1ED9 b\u01A1m ti\xEAm: <strong class="text-primary">${d.recommendedPumpRateMlH}</strong>
            </div>
          </div>
          <p class="cdss-vaso-notes"><i class="fa-solid fa-circle-exclamation"></i> ${d.precautions}</p>
        </div>
      </div>

      <!-- Card Noradrenalin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div class="cdss-vaso-title">
            <span class="cdss-drug-tag cdss-drug-tag--danger">Noradrenalin</span>
            <span class="cdss-drug-indication">S\u1ED1c gi\xE3n m\u1EA1ch / T\u1EE5t HA t\xE2m tr\u01B0\u01A1ng</span>
          </div>
          <span class="cdss-badge cdss-badge--danger">High Alert</span>
        </div>
        <div class="cdss-vaso-body">
          <div class="cdss-vaso-recipe">
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
              <span class="cdss-recipe-val"><strong>${n.totalMg} mg</strong> Noradrenalin (0.3 \xD7 ${n.patientWeightKg} kg)</span>
            </div>
            <div class="cdss-recipe-row">
              <span class="cdss-recipe-key">Dung m\xF4i pha:</span>
              <span class="cdss-recipe-val">Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
            </div>
            <div class="cdss-recipe-row cdss-recipe-highlight">
              <span class="cdss-recipe-key">T\u01B0\u01A1ng \u0111\u01B0\u01A1ng li\u1EC1u:</span>
              <span class="cdss-recipe-val"><strong>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 0.1 \xB5g/kg/ph\xFAt</strong></span>
            </div>
          </div>
          <div class="cdss-vaso-dosing">
            <div class="cdss-dosing-range">
              Li\u1EC1u kh\u1EDFi \u0111\u1EA7u: <strong>${n.standardDoseRange}</strong>
            </div>
            <div class="cdss-pump-rate">
              T\u1ED1c \u0111\u1ED9 b\u01A1m ti\xEAm: <strong class="text-danger">${n.recommendedPumpRateMlH}</strong>
            </div>
          </div>
          <p class="cdss-vaso-notes"><i class="fa-solid fa-triangle-exclamation"></i> ${n.precautions}</p>
        </div>
      </div>
    `;
    }
    renderNursingList(plan) {
      const list = document.getElementById("cdss-nursing-list");
      if (!list) return;
      list.innerHTML = plan.nursingInstructions.map((item) => `
      <li class="cdss-nursing-item">
        <i class="fa-solid fa-check cdss-check-icon"></i>
        <span>${item}</span>
      </li>
    `).join("");
    }
    copyHandoverReport() {
      if (!this.currentPlan) return;
      const p = this.currentPlan;
      const text = [
        `\u{1F4CB} B\xC1O C\xC1O GIAO BAN D\u1ECACH TRUY\u1EC0N SXHD DENGUE (Q\u0110 2760/Q\u0110-BYT)`,
        `\u2022 B\u1EC7nh nh\xE2n: ${p.patient.ageYears} tu\u1ED5i (${p.patient.gender === "male" ? "Nam" : "N\u1EEF"}) | N\u1EB7ng th\u1EF1c t\u1EBF: ${p.weightResult.actualWeightKg} kg`,
        `\u2022 C\xE2n t\xEDnh d\u1ECBch CDC 2014: ${p.weightResult.adjustedWeightKg} kg ${p.weightResult.isObese ? "(\u0110\xC3 HI\u1EC6U CH\u1EC8NH TR\u1EBA TH\u1EEAA C\xC2N)" : ""}`,
        `\u2022 Ph\xE2n \u0111\u1ED9: ${p.patient.severity === "warning_signs" ? "D\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o" : p.patient.severity === "shock" ? "S\u1ED1c SXHD" : "S\u1ED1c nguy k\u1ECBch"}`,
        `\u2022 K\u1EBF ho\u1EA1ch c\u1ECDc d\u1ECBch:`,
        ...p.fluidRows.map((r) => `  - C\u1EEF ${r.stepIndex} (${r.timeWindow}): ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} gi\u1ECDt/ph\xFAt) | C\u1EA7n ${r.totalMl} ml | Treo th\xEAm: ${r.bottlesToHang} chai | T\u1EA1i c\u1ECDc: ${r.totalAtPoleMl} ml`),
        `\u2022 T\u1ED5ng d\u1ECBch: ${p.totalVolumeMl} ml trong ${p.totalDurationHours} gi\u1EDD.`,
        `\u2022 \u0110i\u1EC1u d\u01B0\u1EE1ng l\u01B0u \xFD: Theo d\xF5i n\u01B0\u1EDBc ti\u1EC3u m\u1ED7i gi\u1EDD (\u0111\xEDch \u2265 0.5-1 ml/kg/h), \u0111o l\u1EA1i Hct tr\u01B0\u1EDBc khi gi\u1EA3m c\u1EEF d\u1ECBch.`
      ].join("\n");
      navigator.clipboard.writeText(text).then(() => {
        this.showToast("\u0110\xE3 sao ch\xE9p b\u1EA3ng b\xE0n giao c\u1ECDc d\u1ECBch v\xE0o b\u1ED9 nh\u1EDB t\u1EA1m!");
      });
    }
    copySoapPlan() {
      if (!this.currentPlan) return;
      navigator.clipboard.writeText(this.currentPlan.soapExportText).then(() => {
        this.showToast("\u0110\xE3 sao ch\xE9p K\u1EBF ho\u1EA1ch SOAP Plan (B\u1EC7nh \xC1n / DocSpace)!");
      });
    }
    showToast(msg) {
      const toast = document.getElementById("cdss-toast");
      if (!toast) return;
      toast.textContent = msg;
      toast.style.display = "block";
      toast.classList.add("fade-in");
      setTimeout(() => {
        toast.style.display = "none";
        toast.classList.remove("fade-in");
      }, 3200);
    }
  };

  // src/content/docspace/public/cdss/xray/xray-canvas-renderer.ts
  var XRayCanvasRenderer = class {
    constructor(canvas) {
      this.W = 600;
      this.H = 750;
      this.examType = "chest_pa";
      this.findings = [];
      this.activeFindingId = null;
      this.hoveredFindingId = null;
      this.state = {
        zoom: 1,
        panX: 0,
        panY: 0,
        brightness: 0,
        contrast: 0,
        inverted: false,
        showOverlay: true
      };
      this.isDragging = false;
      this.startDragX = 0;
      this.startDragY = 0;
      this.canvas = canvas;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D context");
      this.ctx = ctx;
      this.offscreenCanvas = document.createElement("canvas");
      this.offscreenCanvas.width = this.W;
      this.offscreenCanvas.height = this.H;
      this.offscreenCtx = this.offscreenCanvas.getContext("2d");
      this.setupCanvasDimensions();
      this.attachEvents();
    }
    setExamData(examType, findings, activeId) {
      this.examType = examType;
      this.findings = findings;
      this.activeFindingId = activeId || null;
      this.renderBaseOffscreen();
      this.draw();
    }
    setActiveFinding(id) {
      this.activeFindingId = id;
      this.draw();
    }
    setOnSelectFinding(cb) {
      this.onSelectFindingCallback = cb;
    }
    updateState(newState) {
      this.state = { ...this.state, ...newState };
      this.draw();
    }
    resetTransform() {
      this.state.zoom = 1;
      this.state.panX = 0;
      this.state.panY = 0;
      this.state.brightness = 0;
      this.state.contrast = 0;
      this.state.inverted = false;
      this.draw();
    }
    setupCanvasDimensions() {
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = this.W * dpr;
      this.canvas.height = this.H * dpr;
      this.canvas.style.width = "100%";
      this.canvas.style.maxWidth = `${this.W}px`;
      this.canvas.style.height = "auto";
      this.canvas.style.aspectRatio = `${this.W} / ${this.H}`;
      this.ctx.scale(dpr, dpr);
    }
    attachEvents() {
      this.canvas.addEventListener("mousedown", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.W / rect.width;
        const scaleY = this.H / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        const transformedX = (clickX - this.W / 2 - this.state.panX) / this.state.zoom + this.W / 2;
        const transformedY = (clickY - this.H / 2 - this.state.panY) / this.state.zoom + this.H / 2;
        let hitFinding = null;
        if (this.state.showOverlay) {
          for (const f of this.findings) {
            if (f.x !== void 0 && f.y !== void 0) {
              const rad = f.radius || 40;
              const dist = Math.hypot(transformedX - f.x, transformedY - f.y);
              if (dist <= rad) {
                hitFinding = f;
                break;
              }
            }
          }
        }
        if (hitFinding) {
          this.activeFindingId = hitFinding.id;
          this.onSelectFindingCallback?.(hitFinding);
          this.draw();
          return;
        }
        this.isDragging = true;
        this.startDragX = e.clientX - this.state.panX;
        this.startDragY = e.clientY - this.state.panY;
        this.canvas.style.cursor = "grabbing";
      });
      window.addEventListener("mousemove", (e) => {
        if (this.isDragging) {
          this.state.panX = e.clientX - this.startDragX;
          this.state.panY = e.clientY - this.startDragY;
          this.draw();
        }
      });
      window.addEventListener("mouseup", () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.canvas.style.cursor = "crosshair";
        }
      });
      this.canvas.addEventListener("wheel", (e) => {
        e.preventDefault();
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newZoom = Math.min(Math.max(this.state.zoom * zoomFactor, 0.5), 3.5);
        this.state.zoom = newZoom;
        this.draw();
      }, { passive: false });
    }
    // ==========================================
    // RENDER BASE ANATOMY
    // ==========================================
    renderBaseOffscreen() {
      const ctx = this.offscreenCtx;
      ctx.clearRect(0, 0, this.W, this.H);
      if (this.examType.startsWith("abdomen")) {
        this.renderAbdomenAnatomy(ctx);
      } else {
        this.renderChestAnatomy(ctx);
      }
    }
    renderChestAnatomy(ctx) {
      const W = this.W;
      const H = this.H;
      const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W * 0.85);
      filmGrad.addColorStop(0, "#1a1a1a");
      filmGrad.addColorStop(0.5, "#101010");
      filmGrad.addColorStop(1, "#050505");
      ctx.fillStyle = filmGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.filter = "blur(8px)";
      const bodyGrad = ctx.createLinearGradient(0, 0, 0, H);
      bodyGrad.addColorStop(0, "rgba(60,60,60,0.3)");
      bodyGrad.addColorStop(0.2, "rgba(80,80,80,0.4)");
      bodyGrad.addColorStop(0.5, "rgba(70,70,70,0.3)");
      bodyGrad.addColorStop(1, "rgba(50,50,50,0.2)");
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.moveTo(30, 80);
      ctx.bezierCurveTo(80, 60, 200, 50, 300, 55);
      ctx.bezierCurveTo(400, 50, 520, 60, 570, 80);
      ctx.lineTo(580, H);
      ctx.lineTo(20, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      const lungGradR = ctx.createRadialGradient(200, 350, 20, 200, 350, 200);
      lungGradR.addColorStop(0, "rgba(5,5,5,0.95)");
      lungGradR.addColorStop(0.3, "rgba(10,10,10,0.9)");
      lungGradR.addColorStop(0.6, "rgba(15,15,15,0.85)");
      lungGradR.addColorStop(1, "rgba(35,35,35,0.4)");
      ctx.save();
      ctx.filter = "blur(4px)";
      ctx.fillStyle = lungGradR;
      ctx.beginPath();
      ctx.moveTo(280, 120);
      ctx.bezierCurveTo(270, 200, 260, 350, 270, 480);
      ctx.bezierCurveTo(275, 530, 280, 560, 290, 580);
      ctx.bezierCurveTo(250, 590, 150, 580, 100, 540);
      ctx.bezierCurveTo(70, 500, 60, 400, 65, 300);
      ctx.bezierCurveTo(70, 200, 90, 140, 130, 110);
      ctx.bezierCurveTo(180, 85, 250, 95, 280, 120);
      ctx.closePath();
      ctx.fill();
      const lungGradL = ctx.createRadialGradient(400, 350, 20, 400, 350, 190);
      lungGradL.addColorStop(0, "rgba(5,5,5,0.95)");
      lungGradL.addColorStop(0.3, "rgba(10,10,10,0.9)");
      lungGradL.addColorStop(0.6, "rgba(15,15,15,0.85)");
      lungGradL.addColorStop(1, "rgba(35,35,35,0.4)");
      ctx.fillStyle = lungGradL;
      ctx.beginPath();
      ctx.moveTo(320, 120);
      ctx.bezierCurveTo(330, 200, 340, 350, 330, 480);
      ctx.bezierCurveTo(325, 530, 320, 560, 310, 580);
      ctx.bezierCurveTo(350, 590, 450, 580, 500, 540);
      ctx.bezierCurveTo(530, 500, 540, 400, 535, 300);
      ctx.bezierCurveTo(530, 200, 510, 140, 470, 110);
      ctx.bezierCurveTo(420, 85, 350, 95, 320, 120);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      const hasCardiomegaly = this.findings.some((f) => f.type === "cardiomegaly");
      const heartScale = hasCardiomegaly ? 1.25 : 1;
      ctx.save();
      ctx.filter = "blur(5px)";
      const heartGrad = ctx.createRadialGradient(320, 400, 10, 320, 400, 130 * heartScale);
      heartGrad.addColorStop(0, "rgba(75,75,75,0.9)");
      heartGrad.addColorStop(0.4, "rgba(65,65,65,0.85)");
      heartGrad.addColorStop(1, "rgba(35,35,35,0.3)");
      ctx.fillStyle = heartGrad;
      ctx.beginPath();
      ctx.moveTo(300, 180);
      ctx.bezierCurveTo(310, 220, 330, 300, 340 * heartScale, 380);
      ctx.bezierCurveTo(350 * heartScale, 440, 370 * heartScale, 500, 340, 560);
      ctx.bezierCurveTo(320, 590, 270, 590, 240, 570);
      ctx.bezierCurveTo(210, 540, 200, 480, 210, 420);
      ctx.bezierCurveTo(225, 350, 260, 280, 280, 220);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(2px)";
      const spineGrad = ctx.createLinearGradient(285, 0, 315, 0);
      spineGrad.addColorStop(0, "rgba(55,55,55,0.4)");
      spineGrad.addColorStop(0.5, "rgba(80,80,80,0.7)");
      spineGrad.addColorStop(1, "rgba(55,55,55,0.4)");
      ctx.fillStyle = spineGrad;
      ctx.fillRect(288, 100, 24, 500);
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(2px)";
      ctx.strokeStyle = "rgba(75,75,75,0.35)";
      ctx.lineWidth = 4;
      for (let i = 0; i < 9; i++) {
        const y = 160 + i * 45;
        ctx.beginPath();
        ctx.moveTo(290, y);
        ctx.bezierCurveTo(200, y + 20, 100, y + 50, 90, y + 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(310, y);
        ctx.bezierCurveTo(400, y + 20, 500, y + 50, 510, y + 80);
        ctx.stroke();
      }
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(4px)";
      ctx.fillStyle = "rgba(65,65,65,0.7)";
      ctx.beginPath();
      ctx.moveTo(80, 600);
      ctx.quadraticCurveTo(190, 520, 300, 560);
      ctx.lineTo(300, H);
      ctx.lineTo(80, H);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(300, 560);
      ctx.quadraticCurveTo(410, 530, 520, 600);
      ctx.lineTo(520, H);
      ctx.lineTo(300, H);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(2px)";
      ctx.strokeStyle = "rgba(85,85,85,0.6)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(280, 130);
      ctx.quadraticCurveTo(180, 115, 80, 140);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(320, 130);
      ctx.quadraticCurveTo(420, 115, 520, 140);
      ctx.stroke();
      ctx.restore();
    }
    renderAbdomenAnatomy(ctx) {
      const W = this.W;
      const H = this.H;
      const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W * 0.8);
      filmGrad.addColorStop(0, "#1c1c1c");
      filmGrad.addColorStop(0.5, "#121212");
      filmGrad.addColorStop(1, "#060606");
      ctx.fillStyle = filmGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.filter = "blur(6px)";
      const bodyGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, 280);
      bodyGrad.addColorStop(0, "rgba(55,55,55,0.3)");
      bodyGrad.addColorStop(0.5, "rgba(50,50,50,0.4)");
      bodyGrad.addColorStop(1, "rgba(20,20,20,0)");
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(W / 2, H / 2, 250, 340, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(4px)";
      ctx.fillStyle = "rgba(55,55,55,0.25)";
      ctx.beginPath();
      ctx.moveTo(280, 200);
      ctx.lineTo(290, 200);
      ctx.lineTo(260, 600);
      ctx.lineTo(240, 600);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(320, 200);
      ctx.lineTo(310, 200);
      ctx.lineTo(340, 600);
      ctx.lineTo(360, 600);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(2px)";
      for (let i = 0; i < 5; i++) {
        const y = 200 + i * 70;
        const vw = 50 + i * 3;
        const vh = 45;
        ctx.fillStyle = "rgba(80,80,80,0.6)";
        ctx.fillRect(300 - vw / 2, y, vw, vh);
        ctx.fillStyle = "rgba(95,95,95,0.4)";
        ctx.fillRect(300 - vw / 2, y, vw, 3);
        ctx.fillRect(300 - vw / 2, y + vh - 3, vw, 3);
      }
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(4px)";
      ctx.strokeStyle = "rgba(75,75,75,0.5)";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(220, 640, 60, 0.4, Math.PI * 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(380, 640, 60, -Math.PI * 0.2, Math.PI * 0.6);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(3px)";
      ctx.fillStyle = "rgba(10,10,10,0.85)";
      ctx.beginPath();
      ctx.ellipse(380, 160, 45, 30, -0.2, 0, Math.PI * 2);
      ctx.fill();
      for (let x = 180; x < 420; x += 35) {
        ctx.beginPath();
        ctx.ellipse(x, 260 + Math.sin(x * 0.05) * 15, 18, 22, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    // ==========================================
    // MAIN COMPOSITOR DRAW
    // ==========================================
    draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.W, this.H);
      ctx.save();
      const b = this.state.brightness;
      const c = this.state.contrast;
      const brightnessVal = 100 + b;
      const contrastVal = 100 + c;
      const invertVal = this.state.inverted ? 100 : 0;
      ctx.filter = `brightness(${brightnessVal}%) contrast(${contrastVal}%) invert(${invertVal}%)`;
      ctx.translate(this.W / 2 + this.state.panX, this.H / 2 + this.state.panY);
      ctx.scale(this.state.zoom, this.state.zoom);
      ctx.translate(-this.W / 2, -this.H / 2);
      ctx.drawImage(this.offscreenCanvas, 0, 0);
      this.renderPathologies(ctx);
      ctx.restore();
      if (this.state.showOverlay) {
        this.renderHotspotsOverlay();
      }
    }
    renderPathologies(ctx) {
      ctx.save();
      this.findings.forEach((f) => {
        const x = f.x || 300;
        const y = f.y || 400;
        const r = f.radius || 50;
        if (f.type === "pneumothorax" || f.type === "lucency") {
          ctx.save();
          ctx.filter = "blur(2px)";
          ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(200, 200, 200, 0.8)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        } else if (f.type === "consolidation" || f.type === "opacity") {
          ctx.save();
          ctx.filter = "blur(6px)";
          const grad = ctx.createRadialGradient(x, y, 5, x, y, r);
          grad.addColorStop(0, "rgba(180, 180, 180, 0.85)");
          grad.addColorStop(0.6, "rgba(140, 140, 140, 0.6)");
          grad.addColorStop(1, "rgba(80, 80, 80, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (f.type === "effusion" || f.type === "pleural_effusion") {
          ctx.save();
          ctx.filter = "blur(4px)";
          ctx.fillStyle = "rgba(160, 160, 160, 0.9)";
          ctx.beginPath();
          ctx.moveTo(x - r, y);
          ctx.quadraticCurveTo(x, y - 20, x + r, y - 40);
          ctx.lineTo(x + r, y + r);
          ctx.lineTo(x - r, y + r);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else if (f.type === "calcification") {
          ctx.save();
          ctx.filter = "blur(1px)";
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      ctx.restore();
    }
    renderHotspotsOverlay() {
      const ctx = this.ctx;
      ctx.save();
      this.findings.forEach((f) => {
        if (f.x === void 0 || f.y === void 0) return;
        const screenX = (f.x - this.W / 2) * this.state.zoom + this.W / 2 + this.state.panX;
        const screenY = (f.y - this.H / 2) * this.state.zoom + this.H / 2 + this.state.panY;
        const screenR = (f.radius || 40) * this.state.zoom;
        const isActive = f.id === this.activeFindingId;
        const color = this.getSeverityColor(f.severity);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = isActive ? 2.5 : 1.5;
        ctx.setLineDash(isActive ? [4, 4] : [2, 2]);
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, isActive ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
        if (isActive) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(screenX, screenY, screenR + 6, 0, Math.PI * 2);
          ctx.stroke();
        }
        const label = `${f.nameVi || f.name} (${Math.round(f.confidence > 1 ? f.confidence : f.confidence * 100)}%)`;
        ctx.font = '600 11px "Be Vietnam Pro", sans-serif';
        const textWidth = ctx.measureText(label).width;
        const boxW = textWidth + 16;
        const boxH = 22;
        const boxX = screenX - boxW / 2;
        const boxY = screenY - screenR - 26;
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        this.roundRect(ctx, boxX, boxY, boxW, boxH, 4);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.fillText(label, boxX + 8, boxY + 15);
        ctx.restore();
      });
      ctx.restore();
    }
    getSeverityColor(sev) {
      switch (sev) {
        case "critical":
          return "#ef4444";
        case "severe":
          return "#f97316";
        case "moderate":
          return "#f59e0b";
        default:
          return "#10b981";
      }
    }
    roundRect(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    }
  };

  // src/content/docspace/public/cdss/xray/xray-cases.ts
  var DEFAULT_CASES = [
    {
      id: "case-copd-001",
      title: "B\u1EC7nh ph\u1ED5i t\u1EAFc ngh\u1EBDn m\xE3n t\xEDnh (COPD) n\u1EB7ng",
      patientAge: 68,
      patientGender: "M",
      clinicalHistory: "Nam 68 tu\u1ED5i, ti\u1EC1n s\u1EED h\xFAt thu\u1ED1c 40 n\u0103m. Kh\xF3 th\u1EDF t\u0103ng d\u1EA7n, ho khan m\u1EA1n t\xEDnh. FEV1/FVC < 70%. Nh\u1EADp vi\u1EC7n v\xEC \u0111\u1EE3t c\u1EA5p COPD.",
      examType: "chest_pa",
      findings: [
        {
          id: "copd-hyperinflate",
          name: "T\u0103ng th\xF4ng kh\xED ph\u1ED5i",
          description: "Ph\u1ED5i t\u0103ng s\xE1ng hai b\xEAn, \u0111\u1EB7c bi\u1EC7t v\xF9ng ngo\u1EA1i vi. Khoang li\xEAn s\u01B0\u1EDDn gi\xE3n r\u1ED9ng.",
          severity: "moderate",
          location: "Hai ph\u1ED5i, v\xF9ng ngo\u1EA1i vi",
          radiographicSign: "Hyperlucency - Ph\u1ED5i s\xE1ng h\u01A1n b\xECnh th\u01B0\u1EDDng do kh\xED ph\u1EBF th\u0169ng. C\xE1c b\xF3ng kh\xED ph\u1EBF nang gi\xE3n r\u1ED9ng l\xE0m gi\u1EA3m m\u1EADt \u0111\u1ED9 m\xF4 ph\u1ED5i.",
          differentialDiagnosis: ["Kh\xED ph\u1EBF th\u0169ng trung t\xE2m ti\u1EC3u th\xF9y", "Kh\xED ph\u1EBF th\u1EE7ng to\xE0n ti\u1EC3u th\xF9y", "H\u1ED9i ch\u1EE9ng Swyer-James"],
          clinicalCorrelation: "T\u01B0\u01A1ng quan v\u1EDBi gi\u1EA3m FEV1, t\u0103ng dung t\xEDch c\u1EB7n ch\u1EE9c n\u0103ng (FRC). B\u1EC7nh nh\xE2n c\xF3 kh\xF3 th\u1EDF khi g\u1EAFng s\u1EE9c.",
          confidence: 0.92,
          x: 200,
          y: 350,
          radius: 120,
          type: "lucency"
        },
        {
          id: "copd-flatdiaphragm",
          name: "C\u01A1 ho\xE0nh d\u1EB9t",
          description: "C\u01A1 ho\xE0nh hai b\xEAn d\u1EB9t xu\u1ED1ng th\u1EA5p, v\xF2m ho\xE0nh ph\u1EA3i \u1EDF khoang li\xEAn s\u01B0\u1EDDn 8, tr\xE1i \u1EDF KLS 9.",
          severity: "moderate",
          location: "C\u01A1 ho\xE0nh hai b\xEAn",
          radiographicSign: "Flat diaphragm - V\xF2m ho\xE0nh th\u1EA5p h\u01A1n b\xECnh th\u01B0\u1EDDng, m\u1EA5t \u0111\u1ED9 cong sinh l\xFD. D\u1EA5u hi\u1EC7u t\u0103ng th\xF4ng kh\xED m\u1EA1n t\xEDnh.",
          differentialDiagnosis: ["T\u0103ng th\xF4ng kh\xED do hen", "X\u01A1 ph\u1ED5i giai \u0111o\u1EA1n mu\u1ED9n"],
          clinicalCorrelation: "C\u01A1 ho\xE0nh d\u1EB9t l\xE0m gi\u1EA3m hi\u1EC7u qu\u1EA3 co b\xF3p, g\xF3p ph\u1EA7n v\xE0o suy h\xF4 h\u1EA5p.",
          confidence: 0.88,
          x: 300,
          y: 560,
          radius: 150,
          type: "lucency"
        },
        {
          id: "copd-narrowheart",
          name: "B\xF3ng tim thu nh\u1ECF",
          description: "Ch\u1EC9 s\u1ED1 tim/ng\u1EF1c < 0.42 (b\xECnh th\u01B0\u1EDDng 0.45-0.5). B\xF3ng tim h\u1EB9p do ph\u1ED5i t\u0103ng th\xF4ng kh\xED.",
          severity: "mild",
          location: "Trung th\u1EA5t",
          radiographicSign: "Narrow cardiac silhouette - Tim tr\xF4ng nh\u1ECF h\u01A1n do ph\u1ED5i gi\xE3n qu\xE1 m\u1EE9c \u0111\u1EA9y v\xE0o.",
          differentialDiagnosis: ["Gi\u1EA3m th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n", "Suy dinh d\u01B0\u1EE1ng n\u1EB7ng"],
          clinicalCorrelation: "B\xF3ng tim nh\u1ECF l\xE0 d\u1EA5u hi\u1EC7u gi\xE1n ti\u1EBFp c\u1EE7a kh\xED ph\u1EBF th\u1EE7ng n\u1EB7ng.",
          confidence: 0.85,
          x: 300,
          y: 420,
          radius: 80,
          type: "lucency"
        }
      ],
      diagnosis: "COPD giai \u0111o\u1EA1n D (GOLD) - Kh\xED ph\u1EBF th\u1EE7ng ph\u1ED5i n\u1EB7ng hai b\xEAn",
      notes: "Phim X-quang ng\u1EF1c t\u01B0 th\u1EBF th\u1EB3ng cho th\u1EA5y d\u1EA5u hi\u1EC7u \u0111i\u1EC3n h\xECnh c\u1EE7a kh\xED ph\u1EBF th\u1EE7ng: ph\u1ED5i t\u0103ng s\xE1ng, c\u01A1 ho\xE0nh d\u1EB9t, b\xF3ng tim h\u1EB9p. C\u1EA7n ch\u1EE5p CT ng\u1EF1c \u0111\xE1nh gi\xE1 m\u1EE9c \u0111\u1ED9 kh\xED ph\u1EBF th\u1EE7ng.",
      tags: ["COPD", "kh\xED ph\u1EBF th\u1EE7ng", "h\xF4 h\u1EA5p", "ng\u01B0\u1EDDi gi\xE0"],
      createdAt: "2024-01-15",
      isTemplate: true
    },
    {
      id: "case-pneumonia-001",
      title: "Vi\xEAm ph\u1ED5i th\xF9y ph\u1EA3i d\u01B0\u1EDBi",
      patientAge: 45,
      patientGender: "F",
      clinicalHistory: "N\u1EEF 45 tu\u1ED5i, s\u1ED1t cao 39\xB0C 3 ng\xE0y, ho \u0111\u1EDDm v\xE0ng xanh, \u0111au ng\u1EF1c ph\u1EA3i. Nghe ph\u1ED5i c\xF3 ran \u1EA9m \u0111\xE1y ph\u1EA3i. CRP 180 mg/L, b\u1EA1ch c\u1EA7u 15.000.",
      examType: "chest_pa",
      findings: [
        {
          id: "pneumonia-consolidation",
          name: "\u0110\xF4ng \u0111\u1EB7c ph\u1ED5i th\xF9y d\u01B0\u1EDBi ph\u1EA3i",
          description: "Opaque \u0111\u1ED3ng nh\u1EA5t v\xF9ng \u0111\xE1y ph\u1ED5i ph\u1EA3i, x\xF3a g\xF3c s\u01B0\u1EDDn ho\xE0nh ph\u1EA3i. Ranh gi\u1EDBi r\xF5 v\u1EDBi nhu m\xF4 ph\u1ED5i b\xECnh th\u01B0\u1EDDng l\xE2n c\u1EADn.",
          severity: "severe",
          location: "Th\xF9y d\u01B0\u1EDBi ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Lobar consolidation - V\xF9ng \u0111\xF4ng \u0111\u1EB7c \u0111\u1ED3ng nh\u1EA5t, b\u1EDD r\xF5, c\xF3 th\u1EC3 th\u1EA5y air bronchogram. X\xF3a g\xF3c costophrenic.",
          differentialDiagnosis: ["Ung th\u01B0 ph\u1ED5i t\u1EAFc ngh\u1EBDn", "X\u1EB9p ph\u1ED5i do n\xFAt nh\u1EA7y", "Nh\u1ED3i m\xE1u ph\u1ED5i"],
          clinicalCorrelation: "T\u01B0\u01A1ng quan v\u1EDBi tri\u1EC7u ch\u1EE9ng l\xE2m s\xE0ng: s\u1ED1t, ho \u0111\u1EDDm, ran \u1EA9m. \u0110\xE1p \u1EE9ng kh\xE1ng sinh sau 48-72h.",
          confidence: 0.95,
          x: 200,
          y: 450,
          radius: 90,
          type: "opacity"
        },
        {
          id: "pneumonia-air-broncho",
          name: "Air bronchogram",
          description: "C\xE1c nh\xE1nh ph\u1EBF qu\u1EA3n ch\u1EE9a kh\xED th\u1EA5y r\xF5 trong v\xF9ng \u0111\xF4ng \u0111\u1EB7c, t\u1EA1o h\xECnh \u1EA3nh \u0111\u01B0\u1EDDng s\xE1ng tr\xEAn n\u1EC1n m\u1EDD.",
          severity: "moderate",
          location: "Trong v\xF9ng \u0111\xF4ng \u0111\u1EB7c",
          radiographicSign: "Air bronchogram sign - \u0110\u01B0\u1EDDng s\xE1ng c\u1EE7a ph\u1EBF qu\u1EA3n ch\u1EE9a kh\xED n\u1ED5i tr\xEAn n\u1EC1n nhu m\xF4 \u0111\xF4ng \u0111\u1EB7c m\u1EDD \u0111\u1EE5c.",
          differentialDiagnosis: ["Vi\xEAm ph\u1ED5i do ph\u1EBF c\u1EA7u", "Vi\xEAm ph\u1ED5i do Klebsiella", "Ph\xF9 ph\u1ED5i khu tr\xFA"],
          clinicalCorrelation: "Air bronchogram g\u1EE3i \xFD qu\xE1 tr\xECnh b\u1EC7nh trong ph\u1EBF nang, kh\xF4ng ph\u1EA3i trong ph\u1EBF qu\u1EA3n.",
          confidence: 0.9,
          x: 190,
          y: 420,
          radius: 40,
          type: "opacity"
        },
        {
          id: "pneumonia-effusion",
          name: "Tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i ph\u1EA3i (l\u01B0\u1EE3ng \xEDt)",
          description: "M\u1EDD \u0111\xE1y ph\u1ED5i ph\u1EA3i, m\u1EA5t g\xF3c costophrenic ph\u1EA3i. M\u1EE9c d\u1ECBch \u01B0\u1EDBc t\xEDnh < 500ml.",
          severity: "mild",
          location: "Khoang m\xE0ng ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Small pleural effusion - M\u1EDD \u0111\xE1y ph\u1ED5i, meniscus sign. Blunting of costophrenic angle.",
          differentialDiagnosis: ["Tr\xE0n d\u1ECBch c\u1EADn vi\xEAm ph\u1ED5i", "Tr\xE0n d\u1ECBch do suy tim", "Tr\xE0n d\u1ECBch \xE1c t\xEDnh"],
          clinicalCorrelation: "Tr\xE0n d\u1ECBch ph\u1EA3n \u1EE9ng c\u1EA1nh vi\xEAm ph\u1ED5i. C\u1EA7n si\xEAu \xE2m \u0111\xE1nh gi\xE1 l\u01B0\u1EE3ng d\u1ECBch v\xE0 ch\u1ECDc d\u1ECBch n\u1EBFu nghi ng\u1EDD.",
          confidence: 0.82,
          x: 160,
          y: 540,
          radius: 50,
          type: "effusion"
        }
      ],
      diagnosis: "Vi\xEAm ph\u1ED5i th\xF9y ph\u1EA3i d\u01B0\u1EDBi - C\xF3 th\u1EC3 do Streptococcus pneumoniae",
      notes: "\u0110\xF4ng \u0111\u1EB7c th\xF9y \u0111i\u1EC3n h\xECnh v\u1EDBi air bronchogram. Tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i l\u01B0\u1EE3ng \xEDt ph\u1EA3n \u1EE9ng. \u0110i\u1EC1u tr\u1ECB kh\xE1ng sinh ph\u1ED5 r\u1ED9ng, \u0111\xE1nh gi\xE1 l\u1EA1i sau 48-72h. N\u1EBFu kh\xF4ng \u0111\xE1p \u1EE9ng c\u1EA7n CT ng\u1EF1c v\xE0 n\u1ED9i soi ph\u1EBF qu\u1EA3n.",
      tags: ["vi\xEAm ph\u1ED5i", "\u0111\xF4ng \u0111\u1EB7c", "nhi\u1EC5m khu\u1EA9n", "air bronchogram"],
      createdAt: "2024-02-20",
      isTemplate: true
    },
    {
      id: "case-lung-cancer-001",
      title: "Ung th\u01B0 ph\u1ED5i trung t\xE2m",
      patientAge: 62,
      patientGender: "M",
      clinicalHistory: "Nam 62 tu\u1ED5i, h\xFAt thu\u1ED1c 30 bao-n\u0103m. Ho ra m\xE1u \xEDt, g\u1EA7y s\xFAt 5kg/2 th\xE1ng. N\u1ED9i soi ph\u1EBF qu\u1EA3n: u s\xF9i ph\u1EBF qu\u1EA3n g\u1ED1c ph\u1EA3i.",
      examType: "chest_pa",
      findings: [
        {
          id: "cancer-mass",
          name: "Kh\u1ED1i u r\u1ED1n ph\u1ED5i ph\u1EA3i",
          description: "Kh\u1ED1i m\u1EDD \u0111\u1EADm v\xF9ng r\u1ED1n ph\u1EA3i, b\u1EDD kh\xF4ng \u0111\u1EC1u, k\xEDch th\u01B0\u1EDBc \u01B0\u1EDBc t\xEDnh 5x4cm. C\xF3 d\u1EA5u hi\u1EC7u ph\u1EBF qu\u1EA3n b\u1ECB ch\xE8n \xE9p.",
          severity: "critical",
          location: "R\u1ED1n ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Hilar mass - Kh\u1ED1i m\u1EDD v\xF9ng r\u1ED1n ph\u1ED5i, b\u1EDD tua gai ho\u1EB7c kh\xF4ng \u0111\u1EC1u. C\xF3 th\u1EC3 c\xF3 d\u1EA5u hi\u1EC7u ch\xE8n \xE9p ph\u1EBF qu\u1EA3n.",
          differentialDiagnosis: ["Ung th\u01B0 t\u1EBF b\xE0o v\u1EA3y", "Ung th\u01B0 t\u1EBF b\xE0o nh\u1ECF", "U lympho", "Di c\u0103n h\u1EA1ch"],
          clinicalCorrelation: "Ho ra m\xE1u + g\u1EA7y s\xFAt + ti\u1EC1n s\u1EED h\xFAt thu\u1ED1c = nghi ng\u1EDD cao ung th\u01B0 ph\u1ED5i. C\u1EA7n sinh thi\u1EBFt.",
          confidence: 0.94,
          x: 280,
          y: 280,
          radius: 55,
          type: "mass"
        },
        {
          id: "cancer-atelectasis",
          name: "X\u1EB9p ph\u1ED5i th\xF9y gi\u1EEFa ph\u1EA3i",
          description: "Tam gi\xE1c m\u1EDD v\xF9ng r\u1ED1n ph\u1EA3i (golden S sign), ranh gi\u1EDBi b\u1EDFi khe n\u1EE9t ngang v\xE0 khe n\u1EE9t ch\xE9o.",
          severity: "severe",
          location: "Th\xF9y gi\u1EEFa ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Golden S sign of Golden - \u0110\u01B0\u1EDDng cong h\xECnh ch\u1EEF S ng\u01B0\u1EE3c t\u1EA1o b\u1EDFi b\u1EDD d\u01B0\u1EDBi kh\u1ED1i u v\xE0 b\u1EDD tr\xEAn th\xF9y gi\u1EEFa x\u1EB9p.",
          differentialDiagnosis: ["X\u1EB9p ph\u1ED5i do t\u1EAFc ngh\u1EBDn", "Vi\xEAm ph\u1ED5i kh\xF4ng resolving", "U carcinoid"],
          clinicalCorrelation: "X\u1EB9p th\xF9y gi\u1EEFa do kh\u1ED1i u trung t\xE2m ch\xE8n \xE9p ph\u1EBF qu\u1EA3n. C\u1EA7n CT v\xE0 n\u1ED9i soi ph\u1EBF qu\u1EA3n.",
          confidence: 0.88,
          x: 230,
          y: 350,
          radius: 60,
          type: "opacity"
        },
        {
          id: "cancer-calcification",
          name: "H\u1EA1ch trung th\u1EA5t v\xF4i h\xF3a",
          description: "C\xE1c n\u1ED1t v\xF4i h\xF3a v\xF9ng trung th\u1EA5t c\u1EA1nh kh\xED qu\u1EA3n, c\xF3 th\u1EC3 l\xE0 h\u1EA1ch di c\u0103n ho\u1EB7c h\u1EA1ch lao c\u0169.",
          severity: "moderate",
          location: "Trung th\u1EA5t tr\xEAn",
          radiographicSign: "Mediastinal calcified lymph nodes - N\u1ED1t \u0111\u1EADm \u0111\u1ED9 cao, b\u1EDD r\xF5 v\xF9ng trung th\u1EA5t.",
          differentialDiagnosis: ["H\u1EA1ch lao v\xF4i h\xF3a", "H\u1EA1ch di c\u0103n", "B\u1EC7nh b\u1EE5i ph\u1ED5i"],
          clinicalCorrelation: "C\u1EA7n ph\xE2n bi\u1EC7t h\u1EA1ch lao c\u0169 v\xE0 h\u1EA1ch di c\u0103n. PET-CT gi\xFAp \u0111\xE1nh gi\xE1 ho\u1EA1t \u0111\u1ED9ng chuy\u1EC3n h\xF3a.",
          confidence: 0.75,
          x: 310,
          y: 180,
          radius: 15,
          type: "calcification"
        }
      ],
      diagnosis: "Ung th\u01B0 ph\u1EBF qu\u1EA3n ph\u1EA3i - Giai \u0111o\u1EA1n IIIA (T3N2M0) - C\u1EA7n staging ho\xE0n ch\u1EC9nh",
      notes: "Kh\u1ED1i u trung t\xE2m v\u1EDBi d\u1EA5u hi\u1EC7u Golden S. C\u1EA7n CT ng\u1EF1c c\xF3 thu\u1ED1c c\u1EA3n quang, PET-CT, n\u1ED9i soi ph\u1EBF qu\u1EA3n sinh thi\u1EBFt, \u0111\xE1nh gi\xE1 ch\u1EE9c n\u0103ng h\xF4 h\u1EA5p tr\u01B0\u1EDBc ph\u1EABu thu\u1EADt. H\u1ED9i ch\u1EA9n \u0111a chuy\xEAn khoa.",
      tags: ["ung th\u01B0 ph\u1ED5i", "kh\u1ED1i u", "h\u1EA1ch trung th\u1EA5t", "x\u1EB9p ph\u1ED5i"],
      createdAt: "2024-03-10",
      isTemplate: true
    },
    {
      id: "case-heart-failure-001",
      title: "Suy tim sung huy\u1EBFt",
      patientAge: 72,
      patientGender: "F",
      clinicalHistory: "N\u1EEF 72 tu\u1ED5i, ti\u1EC1n s\u1EED suy tim EF 30%. Kh\xF3 th\u1EDF khi n\u1EB1m, ph\xF9 hai ch\xE2n. NT-proBNP 5800 pg/mL. Nghe ph\u1ED5i ran n\u1ED5 hai \u0111\xE1y.",
      examType: "chest_pa",
      findings: [
        {
          id: "hf-cardiomegaly",
          name: "B\xF3ng tim to",
          description: "CTR = 0.62 (b\xECnh th\u01B0\u1EDDng < 0.5). B\xF3ng tim to to\xE0n b\u1ED9, \u0111\u1EB7c bi\u1EC7t bu\u1ED3ng th\u1EA5t tr\xE1i.",
          severity: "severe",
          location: "Trung th\u1EA5t d\u01B0\u1EDBi",
          radiographicSign: "Cardiomegaly (CTR > 0.5) - B\xF3ng tim to tr\xEAn phim th\u1EB3ng. \u0110\xE1nh gi\xE1 t\u1EEBng bu\u1ED3ng tim.",
          differentialDiagnosis: ["B\u1EC7nh van tim", "B\u1EC7nh c\u01A1 tim gi\xE3n", "Tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim"],
          clinicalCorrelation: "CTR > 0.5 t\u01B0\u01A1ng quan v\u1EDBi suy tim m\u1EA1n. Si\xEAu \xE2m tim \u0111\xE1nh gi\xE1 EF v\xE0 c\u1EA5u tr\xFAc.",
          confidence: 0.96,
          x: 310,
          y: 420,
          radius: 110,
          type: "cardiomegaly"
        },
        {
          id: "hf-edema",
          name: "Ph\xF9 ph\u1ED5i k\u1EBD",
          description: "\u0110\u01B0\u1EDDng Kerley B \u1EDF \u0111\xE1y ph\u1ED5i hai b\xEAn. m\u1EDD ph\u1EBF tru qu\u1EA3n quanh r\u1ED1n ph\u1ED5i (perihilar haze).",
          severity: "severe",
          location: "Ph\u1ED5i hai b\xEAn, v\xF9ng \u0111\xE1y",
          radiographicSign: "Kerley B lines - \u0110\u01B0\u1EDDng ngang ng\u1EAFn \u1EDF \u0111\xE1y ph\u1ED5i, vu\xF4ng g\xF3c v\u1EDBi m\xE0ng ph\u1ED5i. Perihilar haze do ph\xF9 n\u1EC1 k\u1EBD.",
          differentialDiagnosis: ["X\u01A1 ph\u1ED5i k\u1EBD", "B\u1EA1ch huy\u1EBFtang carcinomatosa", "Vi\xEAm ph\u1ED5i kh\xF4ng \u0111i\u1EC3n h\xECnh"],
          clinicalCorrelation: "Kerley B ph\u1EA3n \xE1nh t\u0103ng \xE1p l\u1EF1c t\u0129nh m\u1EA1ch ph\u1ED5i > 18 mmHg. \u0110\xE1p \u1EE9ng l\u1EE3i ti\u1EC3u.",
          confidence: 0.91,
          x: 200,
          y: 500,
          radius: 70,
          type: "opacity"
        },
        {
          id: "hf-effusion",
          name: "Tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i hai b\xEAn",
          description: "M\u1EDD hai \u0111\xE1y ph\u1ED5i, m\u1EA5t g\xF3c costophrenic hai b\xEAn. B\xEAn ph\u1EA3i nhi\u1EC1u h\u01A1n b\xEAn tr\xE1i.",
          severity: "moderate",
          location: "Khoang m\xE0ng ph\u1ED5i hai b\xEAn",
          radiographicSign: "Bilateral pleural effusion - M\u1EDD \u0111\xE1y ph\u1ED5i hai b\xEAn, meniscus sign. Th\u01B0\u1EDDng ph\u1EA3i > tr\xE1i trong suy tim.",
          differentialDiagnosis: ["Tr\xE0n d\u1ECBch do suy tim", "Tr\xE0n d\u1ECBch do gi\u1EA3m albumin", "Tr\xE0n d\u1ECBch \xE1c t\xEDnh hai b\xEAn"],
          clinicalCorrelation: "Tr\xE0n d\u1ECBch hai b\xEAn trong suy tim th\u01B0\u1EDDng \u0111\u1ED1i x\u1EE9ng ho\u1EB7c ph\u1EA3i nhi\u1EC1u h\u01A1n. \u0110\xE1p \u1EE9ng \u0111i\u1EC1u tr\u1ECB suy tim.",
          confidence: 0.89,
          x: 300,
          y: 560,
          radius: 100,
          type: "effusion"
        },
        {
          id: "hf-cephalization",
          name: "T\xE1i ph\xE2n b\u1ED1 m\u1EA1ch m\xE1u l\xEAn \u0111\u1EC9nh",
          description: "M\u1EA1ch m\xE1u v\xF9ng \u0111\u1EC9nh ph\u1ED5i n\u1ED5i r\xF5 h\u01A1n b\xECnh th\u01B0\u1EDDng, \u0111\u01B0\u1EDDng k\xEDnh m\u1EA1ch m\xE1u \u0111\u1EC9nh \u2265 m\u1EA1ch m\xE1u \u0111\xE1y.",
          severity: "moderate",
          location: "Ph\u1ED5i hai b\xEAn, v\xF9ng \u0111\u1EC9nh",
          radiographicSign: "Cephalization of pulmonary vessels - M\u1EA1ch m\xE1u \u0111\u1EC9nh ph\u1ED5i to b\u1EB1ng ho\u1EB7c h\u01A1n m\u1EA1ch m\xE1u \u0111\xE1y. B\xECnh th\u01B0\u1EDDng: \u0111\xE1y > \u0111\u1EC9nh.",
          differentialDiagnosis: ["T\u0103ng \xE1p t\u0129nh m\u1EA1ch ph\u1ED5i", "H\u1EB9p hai l\xE1", "T\xE1i ph\xE2n b\u1ED1 t\u01B0 th\u1EBF"],
          clinicalCorrelation: "D\u1EA5u hi\u1EC7u s\u1EDBm c\u1EE7a ph\xF9 ph\u1ED5i, tr\u01B0\u1EDBc khi c\xF3 Kerley B. \xC1p l\u1EF1c mao m\u1EA1ch ph\u1ED5i > 12 mmHg.",
          confidence: 0.84,
          x: 300,
          y: 150,
          radius: 80,
          type: "opacity"
        }
      ],
      diagnosis: "Suy tim sung huy\u1EBFt m\u1EA5t b\xF9 - Ph\xF9 ph\u1ED5i k\u1EBD + tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i hai b\xEAn",
      notes: "Tam ch\u1EE9ng: b\xF3ng tim to + ph\xF9 ph\u1ED5i k\u1EBD + tr\xE0n d\u1ECBch hai b\xEAn. \u0110i\u1EC1u tr\u1ECB: l\u1EE3i ti\u1EC3u furosemide, h\u1EA1n ch\u1EBF d\u1ECBch, t\u01B0 th\u1EBF ng\u1ED3i. \u0110\xE1nh gi\xE1 l\u1EA1i phim sau 24-48h \u0111i\u1EC1u tr\u1ECB.",
      tags: ["suy tim", "ph\xF9 ph\u1ED5i", "tr\xE0n d\u1ECBch", "b\xF3ng tim to"],
      createdAt: "2024-04-05",
      isTemplate: true
    },
    {
      id: "case-pneumothorax-001",
      title: "Tr\xE0n kh\xED m\xE0ng ph\u1ED5i t\u1EF1 ph\xE1t",
      patientAge: 25,
      patientGender: "M",
      clinicalHistory: "Nam 25 tu\u1ED5i, cao g\u1EA7y, h\xFAt thu\u1ED1c. \u0110au ng\u1EF1c ph\u1EA3i \u0111\u1ED9t ng\u1ED9t khi ch\u01A1i th\u1EC3 thao. Kh\xF3 th\u1EDF nh\u1EB9. Nghe ph\u1ED5i gi\u1EA3m r\xEC r\xE0o ph\u1EBF nang ph\u1EA3i.",
      examType: "chest_pa",
      findings: [
        {
          id: "ptx-air",
          name: "Tr\xE0n kh\xED m\xE0ng ph\u1ED5i ph\u1EA3i",
          description: "V\xF9ng s\xE1ng ngo\xE0i r\xECa ph\u1ED5i ph\u1EA3i, kh\xF4ng th\u1EA5y m\u1EA1ch m\xE1u ph\u1ED5i. \u0110\u01B0\u1EDDng m\xE0ng ph\u1ED5i t\u1EA1ng th\u1EA5y r\xF5 song song th\xE0nh ng\u1EF1c.",
          severity: "severe",
          location: "Khoang m\xE0ng ph\u1ED5i ph\u1EA3i, v\xF9ng \u0111\u1EC9nh",
          radiographicSign: "Visceral pleural line - \u0110\u01B0\u1EDDng s\xE1ng m\u1EA3nh song song th\xE0nh ng\u1EF1c. V\xF9ng ngo\xE0i kh\xF4ng c\xF3 m\u1EA1ch m\xE1u ph\u1ED5i (lucent area without vascular markings).",
          differentialDiagnosis: ["B\xF3ng da cu\u1ED9n", "N\u1EBFp g\u1EA5p m\xE0ng ph\u1ED5i", "Kh\xED trong d\u1EA1 d\xE0y"],
          clinicalCorrelation: "Tr\xE0n kh\xED t\u1EF1 ph\xE1t nguy\xEAn ph\xE1t \u1EDF ng\u01B0\u1EDDi tr\u1EBB, cao g\u1EA7y, h\xFAt thu\u1ED1c. \u0110\xE1nh gi\xE1 k\xEDch th\u01B0\u1EDBc \u0111\u1EC3 quy\u1EBFt \u0111\u1ECBnh d\u1EABn l\u01B0u.",
          confidence: 0.97,
          x: 450,
          y: 200,
          radius: 80,
          type: "pneumothorax"
        },
        {
          id: "ptx-collapse",
          name: "X\u1EB9p ph\u1ED5i ph\u1EA3i m\u1ED9t ph\u1EA7n",
          description: "Ph\u1ED5i ph\u1EA3i x\u1EB9p v\u1EC1 ph\xEDa r\u1ED1n, b\u1EDD th\u1EA5y r\xF5. \u01AF\u1EDBc t\xEDnh x\u1EB9p kho\u1EA3ng 30% th\u1EC3 t\xEDch.",
          severity: "moderate",
          location: "Ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Lung collapse - Nhu m\xF4 ph\u1ED5i \u0111\u1EB7c h\u01A1n b\xECnh th\u01B0\u1EDDng, co v\u1EC1 ph\xEDa r\u1ED1n. M\u1EA1ch m\xE1u t\u1EADp trung.",
          differentialDiagnosis: ["X\u1EB9p ph\u1ED5i do t\u1EAFc ngh\u1EBDn", "X\u1EB9p do ch\xE8n \xE9p ngo\xE0i"],
          clinicalCorrelation: "X\u1EB9p < 30% c\xF3 th\u1EC3 theo d\xF5i. > 30% ho\u1EB7c c\xF3 tri\u1EC7u ch\u1EE9ng c\u1EA7n d\u1EABn l\u01B0u.",
          confidence: 0.88,
          x: 420,
          y: 350,
          radius: 60,
          type: "opacity"
        }
      ],
      diagnosis: "Tr\xE0n kh\xED m\xE0ng ph\u1ED5i ph\u1EA3i t\u1EF1 ph\xE1t nguy\xEAn ph\xE1t - X\u1EB9p ph\u1ED5i 30%",
      notes: "Tr\xE0n kh\xED t\u1EF1 ph\xE1t nguy\xEAn ph\xE1t. Ch\u1EC9 \u0111\u1ECBnh: h\xFAt kh\xED b\u1EB1ng kim ho\u1EB7c d\u1EABn l\u01B0u \u1ED1ng nh\u1ECF (pigtail). Theo d\xF5i phim sau 6h. T\u01B0 v\u1EA5n b\u1ECF thu\u1ED1c l\xE1.",
      tags: ["tr\xE0n kh\xED", "t\u1EF1 ph\xE1t", "c\u1EA5p c\u1EE9u", "ng\u01B0\u1EDDi tr\u1EBB"],
      createdAt: "2024-05-12",
      isTemplate: true
    },
    {
      id: "case-bowel-obstruction-001",
      title: "T\u1EAFc ru\u1ED9t non c\u01A1 h\u1ECDc",
      patientAge: 55,
      patientGender: "F",
      clinicalHistory: "N\u1EEF 55 tu\u1ED5i, ti\u1EC1n s\u1EED m\u1ED5 c\u1EAFt t\u1EED cung 5 n\u0103m tr\u01B0\u1EDBc. \u0110au b\u1EE5ng qu\u1EB7n t\u1EEBng c\u01A1n, n\xF4n, b\xED trung \u0111\u1EA1i ti\u1EC7n 2 ng\xE0y. B\u1EE5ng ch\u01B0\u1EDBng c\u0103ng.",
      examType: "abdomen_supine",
      findings: [
        {
          id: "bo-dilated",
          name: "Quai ru\u1ED9t non gi\xE3n",
          description: "Nhi\u1EC1u quai ru\u1ED9t non gi\xE3n > 3cm, ch\u1EE9a c\u1EA3 h\u01A1i v\xE0 d\u1ECBch. H\xECnh \u1EA3nh b\u1EADc thang h\u01A1i-d\u1ECBch (step-ladder pattern).",
          severity: "severe",
          location: "Gi\u1EEFa \u1ED5 b\u1EE5ng",
          radiographicSign: "Dilated small bowel loops - Quai ru\u1ED9t gi\xE3n > 3cm (b\xECnh th\u01B0\u1EDDng < 2.5cm). Van n\u1ED1i tr\xE0ng (plicae circulares) th\u1EA5y r\xF5 b\u1EAFt ngang quai ru\u1ED9t.",
          differentialDiagnosis: ["T\u1EAFc ru\u1ED9t do d\xEDnh", "Tho\xE1t v\u1ECB ngh\u1EB9t", "U ch\xE8n \xE9p", "Vi\xEAm ru\u1ED9t"],
          clinicalCorrelation: "Ti\u1EC1n s\u1EED m\u1ED5 b\u1EE5ng + t\u1EAFc ru\u1ED9t = nghi ng\u1EDD t\u1EAFc do d\xEDnh. C\u1EA7n CT b\u1EE5ng c\xF3 thu\u1ED1c c\u1EA3n quang \u0111\u1EC3 x\xE1c \u0111\u1ECBnh v\u1ECB tr\xED v\xE0 nguy\xEAn nh\xE2n.",
          confidence: 0.93,
          x: 300,
          y: 380,
          radius: 120,
          type: "lucency"
        },
        {
          id: "bo-fluid-levels",
          name: "M\u1EE9c h\u01A1i-d\u1ECBch",
          description: "C\xE1c m\u1EE9c h\u01A1i-d\u1ECBch ngang th\u1EA5y tr\xEAn phim t\u01B0 th\u1EBF \u0111\u1EE9ng. Chi\u1EC1u r\u1ED9ng quai ru\u1ED9t > 3cm.",
          severity: "severe",
          location: "\u1ED4 b\u1EE5ng",
          radiographicSign: "Air-fluid levels - C\xE1c \u0111\u01B0\u1EDDng ngang chia \u0111\xF4i quai ru\u1ED9t th\xE0nh ph\u1EA7n h\u01A1i tr\xEAn v\xE0 ph\u1EA7n d\u1ECBch d\u01B0\u1EDBi.",
          differentialDiagnosis: ["T\u1EAFc ru\u1ED9t c\u01A1 h\u1ECDc", "Li\u1EC7t ru\u1ED9t", "Vi\xEAm ph\xFAc m\u1EA1c"],
          clinicalCorrelation: "M\u1EE9c h\u01A1i-d\u1ECBch nhi\u1EC1u t\u1EA7ng g\u1EE3i \xFD t\u1EAFc ru\u1ED9t c\u01A1 h\u1ECDc. Li\u1EC7t ru\u1ED9t th\u01B0\u1EDDng \xEDt m\u1EE9c h\u01A1n.",
          confidence: 0.91,
          x: 250,
          y: 400,
          radius: 45,
          type: "lucency"
        },
        {
          id: "bo-gasless",
          name: "Thi\u1EBFu h\u01A1i \u0111\u1EA1i tr\xE0ng",
          description: "\u0110\u1EA1i tr\xE0ng \xEDt h\u01A1i, kh\xF4ng th\u1EA5y h\u01A1i tr\u1EF1c tr\xE0ng. Khung \u0111\u1EA1i tr\xE0ng x\u1EB9p.",
          severity: "moderate",
          location: "Khung \u0111\u1EA1i tr\xE0ng",
          radiographicSign: "Gasless colon - \u0110\u1EA1i tr\xE0ng kh\xF4ng ch\u1EE9a h\u01A1i b\xECnh th\u01B0\u1EDDng. G\u1EE3i \xFD t\u1EAFc ho\xE0n to\xE0n.",
          differentialDiagnosis: ["T\u1EAFc ru\u1ED9t ho\xE0n to\xE0n", "Nh\u1ECBn \u0103n l\xE2u ng\xE0y", "Th\u1EE5t th\xE1o g\u1EA7n \u0111\xE2y"],
          clinicalCorrelation: "\u0110\u1EA1i tr\xE0ng x\u1EB9p + ru\u1ED9t non gi\xE3n = t\u1EAFc ru\u1ED9t c\u01A1 h\u1ECDc ho\xE0n to\xE0n. C\u1EA7n can thi\u1EC7p ngo\u1EA1i khoa.",
          confidence: 0.86,
          x: 300,
          y: 550,
          radius: 100,
          type: "opacity"
        }
      ],
      diagnosis: "T\u1EAFc ru\u1ED9t non c\u01A1 h\u1ECDc ho\xE0n to\xE0n - Nghi ng\u1EDD do d\xEDnh sau m\u1ED5",
      notes: "Tam ch\u1EE9ng: quai ru\u1ED9t non gi\xE3n + m\u1EE9c h\u01A1i-d\u1ECBch + \u0111\u1EA1i tr\xE0ng x\u1EB9p. Ch\u1EC9 \u0111\u1ECBnh: \u0111\u1EB7t \u1ED1ng th\xF4ng d\u1EA1 d\xE0y, b\xF9 d\u1ECBch \u0111i\u1EC7n gi\u1EA3i, theo d\xF5i. N\u1EBFu kh\xF4ng c\u1EA3i thi\u1EC7n sau 24-48h ho\u1EB7c c\xF3 d\u1EA5u hi\u1EC7u estrangulation \u2192 ph\u1EABu thu\u1EADt.",
      tags: ["t\u1EAFc ru\u1ED9t", "ru\u1ED9t non", "c\u1EA5p c\u1EE9u b\u1EE5ng", "sau m\u1ED5"],
      createdAt: "2024-06-08",
      isTemplate: true
    }
  ];
  var DEFAULT_KNOWLEDGE = [
    {
      id: "kb-approach-001",
      title: "Ph\u01B0\u01A1ng ph\xE1p \u0111\u1ECDc phim X-quang ng\u1EF1c h\u1EC7 th\u1ED1ng",
      category: "Ph\u01B0\u01A1ng ph\xE1p",
      content: `## Quy tr\xECnh \u0111\u1ECDc phim X-quang ng\u1EF1c A-B-C-D-E-F-G

### A - Airway (\u0110\u01B0\u1EDDng th\u1EDF)
- Kh\xED qu\u1EA3n: c\xF3 l\u1EC7ch kh\xF4ng? (l\u1EC7ch v\u1EC1 ph\xEDa x\u1EB9p, \u0111\u1EA9y sang b\xEAn \u0111\u1ED1i di\u1EC7n trong tr\xE0n kh\xED/d\u1ECBch l\u1EDBn)
- Ph\u1EBF qu\u1EA3n g\u1ED1c: c\xF3 th\u1EA5y r\xF5 kh\xF4ng?
- Carina: g\xF3c chia nh\xE1nh (b\xECnh th\u01B0\u1EDDng 60-70\xB0)

### B - Bones (X\u01B0\u01A1ng)
- X\u01B0\u01A1ng \u0111\xF2n: \u0111\u1ED1i x\u1EE9ng hai b\xEAn
- X\u01B0\u01A1ng s\u01B0\u1EDDn: \u0111\u1EBFm t\u1EEB tr\xEAn xu\u1ED1ng, t\xECm g\xE3y x\u01B0\u01A1ng, h\u1EE7y x\u01B0\u01A1ng
- C\u1ED9t s\u1ED1ng: th\u1EB3ng h\xE0ng, t\xECm x\u1EB9p \u0111\u1ED1t s\u1ED1ng
- X\u01B0\u01A1ng b\u1EA3 vai

### C - Cardiac (Tim)
- CTR (Cardiothoracic Ratio): b\xECnh th\u01B0\u1EDDng < 0.5
- Cung tim: cung tr\xE1i (th\u1EA5t tr\xE1i), cung ph\u1EA3i (nh\u0129 ph\u1EA3i)
- B\xF3ng \u0111\u1ED9ng m\u1EA1ch ch\u1EE7
- R\u1ED1n ph\u1ED5i

### D - Diaphragm (C\u01A1 ho\xE0nh)
- V\xF2m ho\xE0nh ph\u1EA3i cao h\u01A1n tr\xE1i (0.5-1.5 cm)
- G\xF3c costophrenic: nh\u1ECDn, r\xF5
- G\xF3c cardiophrenic
- H\u01A1i t\u1EF1 do d\u01B0\u1EDBi ho\xE0nh (t\u01B0 th\u1EBF \u0111\u1EE9ng)

### E - Effusion (Tr\xE0n d\u1ECBch)
- M\u1EDD \u0111\xE1y ph\u1ED5i
- M\u1EA5t g\xF3c costophrenic (>200ml m\u1EDBi th\u1EA5y tr\xEAn phim th\u1EB3ng)
- Meniscus sign
- Tr\xE0n d\u1ECBch k\u1EBD (Kerley B lines)

### F - Fields (Tr\u01B0\u1EDDng ph\u1ED5i)
- So s\xE1nh hai b\xEAn: \u0111\u1ED1i x\u1EE9ng?
- M\u1EA1ch m\xE1u ph\u1ED5i: k\xEDch th\u01B0\u1EDBc, ph\xE2n b\u1ED1
- T\xECm opacity, lucency b\u1EA5t th\u01B0\u1EDDng
- V\xF9ng ngo\u1EA1i vi vs trung t\xE2m

### G - Gastric/Soft tissues
- B\xF3ng h\u01A1i d\u1EA1 d\xE0y
- C\xE1c m\xF4 m\u1EC1m: v\xFA, n\xE1ch, c\u1ED5`,
      tags: ["ph\u01B0\u01A1ng ph\xE1p", "h\u1EC7 th\u1ED1ng", "c\u01A1 b\u1EA3n", "\u0111\u1ECDc phim"],
      createdAt: "2024-01-01",
      updatedAt: "2024-06-01"
    },
    {
      id: "kb-approach-002",
      title: "C\xE1c d\u1EA5u hi\u1EC7u X-quang kinh \u0111i\u1EC3n c\u1EA7n nh\u1EDB",
      category: "D\u1EA5u hi\u1EC7u",
      content: `## D\u1EA5u hi\u1EC7u X-quang kinh \u0111i\u1EC3n

### 1. Golden S Sign
- **M\xF4 t\u1EA3**: \u0110\u01B0\u1EDDng cong h\xECnh ch\u1EEF S ng\u01B0\u1EE3c \u1EDF r\u1ED1n ph\u1ED5i
- **Nguy\xEAn nh\xE2n**: Kh\u1ED1i u trung t\xE2m + x\u1EB9p th\xF9y ph\u1ED5i ph\xEDa ngo\u1EA1i vi
- **\xDD ngh\u0129a**: Ung th\u01B0 ph\u1ED5i trung t\xE2m

### 2. Silhouette Sign (D\u1EA5u hi\u1EC7u m\u1EA5t b\xF3ng)
- **M\xF4 t\u1EA3**: M\u1EA5t ranh gi\u1EDBi gi\u1EEFa c\xE1c c\u1EA5u tr\xFAcnormally th\u1EA5y r\xF5
- **V\xED d\u1EE5**: 
  - M\u1EA5t b\u1EDD tim ph\u1EA3i \u2192 \u0111\xF4ng \u0111\u1EB7c th\xF9y gi\u1EEFa ph\u1EA3i
  - M\u1EA5t b\u1EDD tim tr\xE1i \u2192 \u0111\xF4ng \u0111\u1EB7c th\xF9y l\u01B0\u1EE1i
  - M\u1EA5t c\u01A1 ho\xE0nh ph\u1EA3i \u2192 \u0111\xF4ng \u0111\u1EB7c th\xF9y d\u01B0\u1EDBi ph\u1EA3i

### 3. Air Bronchogram
- **M\xF4 t\u1EA3**: Ph\u1EBF qu\u1EA3n ch\u1EE9a kh\xED th\u1EA5y r\xF5 trong n\u1EC1n \u0111\xF4ng \u0111\u1EB7c
- **\xDD ngh\u0129a**: Qu\xE1 tr\xECnh trong ph\u1EBF nang (vi\xEAm ph\u1ED5i, ph\xF9 ph\u1ED5i, BAC)
- **Ph\xE2n bi\u1EC7t**: Kh\xF4ng c\xF3 trong x\u1EB9p ph\u1ED5i do t\u1EAFc ngh\u1EBDn

### 4. Hampton's Hump
- **M\xF4 t\u1EA3**: V\xF9ng m\u1EDD h\xECnh n\xEAm, \u0111\xE1y h\u01B0\u1EDBng v\u1EC1 m\xE0ng ph\u1ED5i
- **\xDD ngh\u0129a**: Nh\u1ED3i m\xE1u ph\u1ED5i

### 5. Westermark Sign
- **M\xF4 t\u1EA3**: V\xF9ng s\xE1ng c\u1EE5c b\u1ED9 do gi\u1EA3m t\u01B0\u1EDBi m\xE1u
- **\xDD ngh\u0129a**: Thuy\xEAn t\u1EAFc ph\u1ED5i

### 6. Double Density Sign
- **M\xF4 t\u1EA3**: Hai l\u1EDBp \u0111\u1EADm \u0111\u1ED9 ch\u1ED3ng l\xEAn nhau \u1EDF v\xF9ng tim
- **\xDD ngh\u0129a**: Ph\xEC \u0111\u1EA1i nh\u0129 tr\xE1i

### 7. Cephalization
- **M\xF4 t\u1EA3**: M\u1EA1ch m\xE1u \u0111\u1EC9nh ph\u1ED5i to \u2265 m\u1EA1ch m\xE1u \u0111\xE1y
- **\xDD ngh\u0129a**: T\u0103ng \xE1p t\u0129nh m\u1EA1ch ph\u1ED5i (suy tim s\u1EDBm)

### 8. Kerley Lines
- **Kerley A**: \u0110\u01B0\u1EDDng d\xE0i 2-6cm, xi\xEAn, t\u1EEB r\u1ED1n ph\u1ED5i ra ngo\u1EA1i vi
- **Kerley B**: \u0110\u01B0\u1EDDng ng\u1EAFn 1-2cm, ngang, \u1EDF \u0111\xE1y ph\u1ED5i vu\xF4ng g\xF3c m\xE0ng ph\u1ED5i
- **Kerley C**: M\u1EA1ng l\u01B0\u1EDBi m\u1ECBn \u1EDF \u0111\xE1y ph\u1ED5i
- **\xDD ngh\u0129a**: Ph\xF9 ph\u1ED5i k\u1EBD / t\u0103ng \xE1p l\u1EF1c mao m\u1EA1ch ph\u1ED5i`,
      tags: ["d\u1EA5u hi\u1EC7u", "kinh \u0111i\u1EC3n", "ch\u1EA9n \u0111o\xE1n"],
      createdAt: "2024-01-15",
      updatedAt: "2024-05-20"
    },
    {
      id: "kb-approach-003",
      title: "Ph\xE2n bi\u1EC7t c\xE1c nguy\xEAn nh\xE2n m\u1EDD ph\u1ED5i tr\xEAn X-quang",
      category: "Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t",
      content: `## Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t v\xF9ng m\u1EDD ph\u1ED5i

### M\u1EDD th\xF9y (Lobar opacity)
1. **Vi\xEAm ph\u1ED5i th\xF9y** - Air bronchogram (+), b\u1EDD r\xF5 theo gi\u1EA3i ph\u1EABu th\xF9y
2. **X\u1EB9p ph\u1ED5i** - D\u1EA5u hi\u1EC7u th\u1EC3 t\xEDch gi\u1EA3m (l\u1EC7ch trung th\u1EA5t, n\xE2ng c\u01A1 ho\xE0nh)
3. **Ung th\u01B0 ph\u1ED5i t\u1EAFc ngh\u1EBDn** - Kh\xF4ng air bronchogram, x\u1EB9p ch\u1EADm

### M\u1EDD \u0111\u1ED1m (Patchy opacity)
1. **Vi\xEAm ph\u1ED5i ph\u1EBF qu\u1EA3n** - Ph\xE2n b\u1ED1 kh\xF4ng \u0111\u1ED1i x\u1EE9ng, quanh ph\u1EBF qu\u1EA3n
2. **Ph\xF9 ph\u1ED5i** - \u0110\u1ED1i x\u1EE9ng hai b\xEAn, v\xF9ng quanh r\u1ED1n
3. **Xu\u1EA5t huy\u1EBFt ph\u1ED5i** - Thay \u0111\u1ED5i nhanh, l\xE2m s\xE0ng n\u1EB7ng

### M\u1EDD n\u1ED1t (Nodule)
1. **U nguy\xEAn ph\xE1t** - B\u1EDD tua gai, k\xEDch th\u01B0\u1EDBc t\u0103ng
2. **Di c\u0103n** - Nhi\u1EC1u n\u1ED1t, b\u1EDD r\xF5, ph\xE2n b\u1ED1 ngo\u1EA1i vi
3. **U h\u1EA1t (granuloma)** - V\xF4i h\xF3a trung t\xE2m ho\u1EB7c \u0111\u1ED3ng t\xE2m, \u1ED5n \u0111\u1ECBnh
4. **AVM** - N\u1ED1i v\u1EDBi m\u1EA1ch m\xE1u, t\u0103ng c\u01B0\u1EDDng thu\u1ED1c c\u1EA3n quang

### M\u1EDD lan t\u1ECFa (Diffuse opacity)
1. **ARDS** - M\u1EDD tr\u1EAFng hai b\xEAn, kh\xF4ng \u0111\u1ED1i x\u1EE9ng ho\xE0n to\xE0n
2. **Ph\xF9 ph\u1ED5i** - C\xE1nh b\u01B0\u1EDBm, Kerley B, b\xF3ng tim to
3. **Vi\xEAm ph\u1ED5i k\xEA** - N\u1ED1t nh\u1ECF 1-3mm r\u1EA3i r\xE1c
4. **B\u1EC7nh b\u1EE5i ph\u1ED5i** - Ti\u1EC1n s\u1EED ngh\u1EC1 nghi\u1EC7p, v\xF4i h\xF3a h\u1EA1ch`,
      tags: ["ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t", "m\u1EDD ph\u1ED5i", "n\u1ED1t ph\u1ED5i"],
      createdAt: "2024-02-10",
      updatedAt: "2024-06-15"
    },
    {
      id: "kb-approach-004",
      title: "H\u01B0\u1EDBng d\u1EABn \u0111\u1ECDc X-quang b\u1EE5ng c\u1EA5p c\u1EE9u",
      category: "Ph\u01B0\u01A1ng ph\xE1p",
      content: `## \u0110\u1ECDc phim X-quang b\u1EE5ng c\u1EA5p c\u1EE9u

### T\u01B0 th\u1EBF phim
- **Supine (n\u1EB1m ng\u1EEDa)**: \u0110\xE1nh gi\xE1 t\u1ED5ng qu\xE1t, k\xEDch th\u01B0\u1EDBc t\u1EA1ng
- **Erect (\u0111\u1EE9ng)**: Ph\xE1t hi\u1EC7n h\u01A1i t\u1EF1 do, m\u1EE9c h\u01A1i-d\u1ECBch
- **Decubitus (n\u1EB1m nghi\xEAng)**: Thay th\u1EBF khi b\u1EC7nh nh\xE2n kh\xF4ng \u0111\u1EE9ng \u0111\u01B0\u1EE3c

### Tr\xECnh t\u1EF1 \u0111\u1ECDc
1. **Kh\xED b\u1EA5t th\u01B0\u1EDDng**
   - H\u01A1i t\u1EF1 do d\u01B0\u1EDBi ho\xE0nh \u2192 th\u1EE7ng t\u1EA1ng r\u1ED7ng
   - Kh\xED trong th\xE0nh ru\u1ED9t \u2192 ho\u1EA1i t\u1EED ru\u1ED9t
   - Kh\xED trong t\u0129nh m\u1EA1ch c\u1EEDa \u2192 ho\u1EA1i t\u1EED ru\u1ED9t n\u1EB7ng
   - Pneumobilia \u2192 r\xF2 m\u1EADt-ru\u1ED9t

2. **Ru\u1ED9t**
   - Ru\u1ED9t non: gi\xE3n > 3cm = b\u1EA5t th\u01B0\u1EDDng
     - Van n\u1ED1i tr\xE0ng (plicae circulares) b\u1EAFt ngang
   - \u0110\u1EA1i tr\xE0ng: gi\xE3n > 6cm = b\u1EA5t th\u01B0\u1EDDng (9cm manh tr\xE0ng = nguy c\u01A1 th\u1EE7ng)
     - Haustra kh\xF4ng b\u1EAFt ngang ho\xE0n to\xE0n
   - Ph\xE2n bi\u1EC7t: Ru\u1ED9t non (trung t\xE2m, van n\u1ED1i) vs \u0110\u1EA1i tr\xE0ng (ngo\u1EA1i vi, haustra)

3. **T\u01B0 t\u1EA1ng \u0111\u1EB7c**
   - Gan: k\xEDch th\u01B0\u1EDBc, v\xF4i h\xF3a
   - L\xE1ch: k\xEDch th\u01B0\u1EDBc (b\xECnh th\u01B0\u1EDDng < 12cm)
   - Th\u1EADn: b\xF3ng th\u1EADn, s\u1ECFi (50% s\u1ECFi c\u1EA3n quang)
   - Tuy\u1EBFn th\u01B0\u1EE3ng th\u1EADn: hi\u1EBFm th\u1EA5y

4. **X\u01B0\u01A1ng**
   - C\u1ED9t s\u1ED1ng th\u1EAFt l\u01B0ng
   - Khung ch\u1EADu
   - H\xF4ng kh\u1EDBp
   - T\xECm h\u1EE7y x\u01B0\u01A1ng, g\xE3y x\u01B0\u01A1ng

5. **M\xF4 m\u1EC1m**
   - B\xF3ng c\u01A1 th\u1EAFt l\u01B0ng (psoas)
   - M\u1EE1 tr\u01B0\u1EDBc th\u1EADn
   - Th\xE0nh b\u1EE5ng

### D\u1EA5u hi\u1EC7u nguy hi\u1EC3m c\u1EA7n ph\xE1t hi\u1EC7n
- \u26A0\uFE0F H\u01A1i t\u1EF1 do d\u01B0\u1EDBi ho\xE0nh
- \u26A0\uFE0F Gi\xE3n ru\u1ED9t + m\u1EE9c h\u01A1i-d\u1ECBch
- \u26A0\uFE0F B\xF3ng gan m\u1EDD (\xE1p xe)
- \u26A0\uFE0F S\u1ECFi ni\u1EC7u qu\u1EA3n + \u1EE9 n\u01B0\u1EDBc
- \u26A0\uFE0F Ph\xECnh \u0111\u1ED9ng m\u1EA1ch ch\u1EE7 b\u1EE5ng (v\xF4i h\xF3a th\xE0nh m\u1EA1ch)`,
      tags: ["b\u1EE5ng", "c\u1EA5p c\u1EE9u", "ph\u01B0\u01A1ng ph\xE1p", "t\u1EAFc ru\u1ED9t"],
      createdAt: "2024-03-01",
      updatedAt: "2024-06-20"
    },
    {
      id: "kb-approach-005",
      title: "Kinh nghi\u1EC7m: Tr\xE1nh sai l\u1EA7m th\u01B0\u1EDDng g\u1EB7p",
      category: "Kinh nghi\u1EC7m",
      content: `## C\xE1c sai l\u1EA7m th\u01B0\u1EDDng g\u1EB7p khi \u0111\u1ECDc X-quang

### 1. B\u1ECF qu\xEAn v\xF9ng "blind spots"
- **\u0110\u1EC9nh ph\u1ED5i**: D\u1EC5 b\u1ECF qua kh\u1ED1i nh\u1ECF, lao
- **Sau tim**: T\u1ED5n th\u01B0\u01A1ng th\xF9y d\u01B0\u1EDBi tr\xE1i b\u1ECB tim che
- **D\u01B0\u1EDBi c\u01A1 ho\xE0nh**: T\u1ED5n th\u01B0\u01A1ng th\xF9y d\u01B0\u1EDBi b\u1ECB c\u01A1 ho\xE0nh che
- **R\xECa phim**: Lu\xF4n nh\xECn \u0111\u1EBFn t\u1EADn r\xECa

### 2. Nh\u1EA7m l\u1EABn gi\u1EA3i ph\u1EABu b\xECnh th\u01B0\u1EDDng
- **Nh\xFA ng\u1EF1c (nipple shadow)**: N\u1ED1t tr\xF2n \u0111\u1ED1i x\u1EE9ng hai b\xEAn, so s\xE1nh phim c\u0169
- **X\u01B0\u01A1ng s\u01B0\u1EDDn ch\xE9o**: T\u1EA1o h\xECnh \u1EA3nh gi\u1EA3 gi\u1ED1ng g\xE3y x\u01B0\u01A1ng
- **M\u1EA1ch m\xE1u c\u1EAFt ngang**: N\u1ED1t tr\xF2n \u1EDF ngo\u1EA1i vi, n\u1ED1i v\u1EDBi m\u1EA1ch m\xE1u
- **M\xF4 m\u1EC1m v\xFA**: Kh\u1ED1i m\u1EDD kh\xF4ng \u0111\u1EC1u, thay \u0111\u1ED5i theo t\u01B0 th\u1EBF

### 3. Kh\xF4ng \u0111\xE1nh gi\xE1 ch\u1EA5t l\u01B0\u1EE3ng phim
- **T\u01B0 th\u1EBF**: Phim xoay \u2192 gi\u1EA3 b\xF3ng tim to, l\u1EC7ch trung th\u1EA5t
- **H\xEDt v\xE0o**: Kh\xF4ng h\xEDt \u0111\u1EE7 \u2192 gi\u1EA3 \u0111\xF4ng \u0111\u1EB7c, tim to
- **Ph\u01A1i nhi\u1EC5m**: Qu\xE1 s\xE1ng/t\u1ED1i \u2192 b\u1ECF t\u1ED5n th\u01B0\u01A1ng

### 4. B\u1ECF qua l\xE2m s\xE0ng
- Lu\xF4n \u0111\u1ED1i chi\u1EBFu v\u1EDBi tri\u1EC7u ch\u1EE9ng
- Ti\u1EC1n s\u1EED quan tr\u1ECDng: m\u1ED5 c\u0169, ung th\u01B0, lao
- So s\xE1nh phim c\u0169: t\u1ED5n th\u01B0\u01A1ng m\u1EDBi hay c\u0169?

### 5. Kh\xF4ng bi\u1EBFt gi\u1EDBi h\u1EA1n c\u1EE7a X-quang
- X-quang ng\u1EF1c b\u1ECF qua 20-30% t\u1ED5n th\u01B0\u01A1ng so v\u1EDBi CT
- X-quang b\u1EE5ng b\xECnh th\u01B0\u1EDDng KH\xD4NG lo\u1EA1i tr\u1EEB c\u1EA5p c\u1EE9u ngo\u1EA1i khoa
- Lu\xF4n ch\u1EC9 \u0111\u1ECBnh th\xEAm CT/MRI khi l\xE2m s\xE0ng nghi ng\u1EDD cao

### 6. M\xF4 t\u1EA3 kh\xF4ng \u0111\u1EA7y \u0111\u1EE7
- Thi\u1EBFu v\u1ECB tr\xED ch\xEDnh x\xE1c
- Kh\xF4ng m\xF4 t\u1EA3 k\xEDch th\u01B0\u1EDBc
- Kh\xF4ng so s\xE1nh phim c\u0169
- Kh\xF4ng \u0111\u01B0a ra ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t`,
      tags: ["sai l\u1EA7m", "kinh nghi\u1EC7m", "c\u1EA3i thi\u1EC7n"],
      createdAt: "2024-04-01",
      updatedAt: "2024-07-01"
    }
  ];

  // src/content/docspace/public/cdss/xray/xray-ui.ts
  var XRayCDSSController = class {
    constructor(containerId) {
      this.cases = DEFAULT_CASES;
      this.currentTab = "pacs";
      this.renderer = null;
      this.activeFindingId = null;
      this.knowledgeFilter = "";
      const el = document.getElementById(containerId);
      if (!el) throw new Error(`Container #${containerId} not found`);
      this.container = el;
      this.currentCase = this.cases[0];
      this.init();
    }
    init() {
      this.render();
      this.initCanvas();
      this.attachEventListeners();
    }
    render() {
      this.container.innerHTML = `
      <div class="xray-app-container">
        <!-- Header Card -->
        <header class="xray-header-card">
          <div class="xray-brand-wrap">
            <div class="xray-brand-icon">
              <i class="fa-solid fa-x-ray"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="xray-badge xray-badge--mild"><i class="fa-solid fa-microchip"></i> RadAI PACS 2.0</span>
                <span class="xray-badge xray-badge--moderate"><i class="fa-solid fa-circle-check"></i> Ch\u1EA9n \u0110o\xE1n H\xECnh \u1EA2nh</span>
              </div>
              <h1 class="xray-header-title">H\u1EC7 Th\u1ED1ng Ph\xE2n T\xEDch X-Quang Ng\u1EF1c & B\u1EE5ng Th\xF4ng Minh (RadAI)</h1>
              <p class="xray-header-subtitle">
                M\xF4 ph\u1ECFng ch\u1EA9n \u0111o\xE1n h\xECnh \u1EA3nh k\u1EF9 thu\u1EADt s\u1ED1 PACS: nh\u1EADn di\u1EC7n t\u1ED5n th\u01B0\u01A1ng nhu m\xF4, m\xE0ng ph\u1ED5i, b\xF3ng tim, t\u1EAFc ru\u1ED9t v\xE0 xu\u1EA5t k\u1EBFt lu\u1EADn chu\u1EA9n h\xF3a v\xE0o B\u1EC7nh \xC1n DocSpace SOAP.
              </p>
            </div>
          </div>

          <div class="xray-header-actions">
            <button id="btn-export-soap" class="xray-btn xray-btn--soap" title="Ch\xE9p k\u1EBFt lu\u1EADn h\xECnh \u1EA3nh h\u1ECDc theo m\u1EABu SOAP">
              <i class="fa-solid fa-copy"></i> <span>Ch\xE9p K\u1EBFt Lu\u1EADn V\xE0o SOAP</span>
            </button>
            <button id="btn-reset-pacs" class="xray-btn xray-btn--outline" title="\u0110\u1EB7t l\u1EA1i b\u1ED9 l\u1ECDc h\xECnh \u1EA3nh">
              <i class="fa-solid fa-rotate-left"></i> <span>\u0110\u1EB7t L\u1EA1i PACS</span>
            </button>
          </div>
        </header>

        <!-- Patient Banner -->
        <section class="xray-patient-banner">
          <div class="xray-demographics-list">
            <div class="xray-demographics-item">
              <i class="fa-solid fa-hospital-user text-blue-600"></i>
              <span>B\u1EC7nh nh\xE2n: <b>${this.currentCase.title}</b> (${this.currentCase.patientGender === "M" ? "Nam" : "N\u1EEF"}, ${this.currentCase.patientAge} tu\u1ED5i)</span>
            </div>
            <div class="xray-demographics-item">
              <i class="fa-solid fa-film text-purple-600"></i>
              <span>K\u1EF9 thu\u1EADt: <b>${this.getExamLabel(this.currentCase.examType)}</b></span>
            </div>
            <div class="xray-demographics-item">
              <i class="fa-solid fa-triangle-exclamation text-amber-500"></i>
              <span>T\u1ED5n th\u01B0\u01A1ng: <b>${this.currentCase.findings.length} \u0111i\u1EC3m ph\xE1t hi\u1EC7n</b></span>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <label for="select-case-dropdown" style="font-size: 0.8rem; font-weight: 700; color: var(--xray-muted);">Ch\u1ECDn ca:</label>
            <select id="select-case-dropdown" style="
              padding: 0.4rem 0.75rem;
              border-radius: 6px;
              border: 1px solid var(--xray-line);
              background: var(--xray-panel);
              color: var(--xray-ink);
              font-size: 0.82rem;
              font-weight: 600;
            ">
              ${this.cases.map((c) => `
                <option value="${c.id}" ${c.id === this.currentCase.id ? "selected" : ""}>
                  ${c.title} (${this.getExamLabel(c.examType)})
                </option>
              `).join("")}
            </select>
          </div>
        </section>

        <!-- Navigation Tabs -->
        <nav class="xray-tabs-bar">
          <button class="xray-tab-btn ${this.currentTab === "pacs" ? "active" : ""}" data-tab="pacs">
            <i class="fa-solid fa-desktop"></i> 1. Ph\xF2ng \u0110\u1ECDc X-Quang PACS
          </button>
          <button class="xray-tab-btn ${this.currentTab === "cases" ? "active" : ""}" data-tab="cases">
            <i class="fa-solid fa-folder-open"></i> 2. Th\u01B0 Vi\u1EC7n Ca B\u1EC7nh (${this.cases.length})
          </button>
          <button class="xray-tab-btn ${this.currentTab === "knowledge" ? "active" : ""}" data-tab="knowledge">
            <i class="fa-solid fa-book-atlas"></i> 3. S\u1ED5 Tay D\u1EA5u Hi\u1EC7u X-Quang (${DEFAULT_KNOWLEDGE.length})
          </button>
        </nav>

        <!-- Tab Body -->
        ${this.renderTabBody()}

        <!-- Toast -->
        <div id="xray-toast" class="xray-toast">
          <i class="fa-solid fa-circle-check text-emerald-400"></i>
          <span id="xray-toast-msg">\u0110\xE3 ch\xE9p k\u1EBFt lu\u1EADn v\xE0o khay nh\u1EDB t\u1EA1m!</span>
        </div>
      </div>
    `;
    }
    renderTabBody() {
      switch (this.currentTab) {
        case "pacs":
          return this.renderPacsView();
        case "cases":
          return this.renderCasesView();
        case "knowledge":
          return this.renderKnowledgeView();
        default:
          return "";
      }
    }
    renderPacsView() {
      return `
      <div class="xray-workstation-grid">
        <!-- PACS Viewport Column -->
        <div class="xray-pacs-card">
          <!-- Toolbar -->
          <div class="xray-pacs-toolbar">
            <div class="xray-pacs-tool-group">
              <button id="pacs-btn-invert" class="xray-pacs-btn" title="\u0110\u1EA3o \xE2m b\u1EA3n X-quang">
                <i class="fa-solid fa-circle-half-stroke"></i> <span>\u0110\u1EA3o \xC2m B\u1EA3n</span>
              </button>
              <button id="pacs-btn-overlay" class="xray-pacs-btn active" title="B\u1EADt/T\u1EAFt \u0111i\u1EC3m ph\xE1t hi\u1EC7n t\u1ED5n th\u01B0\u01A1ng">
                <i class="fa-solid fa-bullseye"></i> <span>\u0110i\u1EC3m T\u1ED5n Th\u01B0\u01A1ng</span>
              </button>
            </div>

            <div class="xray-pacs-tool-group">
              <button id="pacs-btn-zoom-in" class="xray-pacs-btn" title="Ph\xF3ng to">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
              </button>
              <button id="pacs-btn-zoom-out" class="xray-pacs-btn" title="Thu nh\u1ECF">
                <i class="fa-solid fa-magnifying-glass-minus"></i>
              </button>
              <button id="pacs-btn-reset-view" class="xray-pacs-btn" title="Kh\xF4i ph\u1EE5c g\xF3c nh\xECn">
                <i class="fa-solid fa-arrows-to-dot"></i> <span>V\u1EEBa Khung</span>
              </button>
            </div>
          </div>

          <!-- Sliders Bar -->
          <div class="xray-pacs-sliders">
            <div class="xray-slider-item">
              <i class="fa-solid fa-sun"></i>
              <span>S\xE1ng:</span>
              <input type="range" id="pacs-slider-brightness" min="-80" max="80" value="0">
            </div>
            <div class="xray-slider-item">
              <i class="fa-solid fa-circle-half-stroke"></i>
              <span>T\u01B0\u01A1ng ph\u1EA3n:</span>
              <input type="range" id="pacs-slider-contrast" min="-80" max="80" value="0">
            </div>
            <div class="xray-slider-item" style="margin-left: auto;">
              <span style="color: #64748b; font-family: var(--xray-font-mono);">K\xE9o chu\u1ED9t \u0111\u1EC3 di chuy\u1EC3n \u1EA3nh</span>
            </div>
          </div>

          <!-- Canvas Container -->
          <div class="xray-canvas-viewport">
            <canvas id="xray-canvas"></canvas>
          </div>
        </div>

        <!-- Findings & Diagnosis Column -->
        <div class="xray-findings-panel">
          <!-- Primary Diagnosis Card -->
          <div class="xray-findings-card" style="border-left: 5px solid var(--xray-primary);">
            <span class="xray-badge xray-badge--mild" style="margin-bottom: 0.5rem;">K\u1EBFt Lu\u1EADn Ch\u1EA9n \u0110o\xE1n</span>
            <h3 style="font-family: var(--xray-font-display); font-size: 1.25rem; font-weight: 800; color: var(--xray-ink); margin: 0 0 0.5rem;">
              ${this.currentCase.diagnosis || this.currentCase.title}
            </h3>
            <p style="font-size: 0.86rem; color: var(--xray-ink2); margin: 0 0 0.75rem; line-height: 1.55;">
              ${this.currentCase.notes || this.currentCase.clinicalHistory}
            </p>
            ${this.currentCase.tags && this.currentCase.tags.length > 0 ? `
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                ${this.currentCase.tags.map((t) => `<span class="xray-badge xray-badge--mild" style="font-size: 0.68rem;">#${t}</span>`).join("")}
              </div>
            ` : ""}
          </div>

          <!-- Findings List Card -->
          <div class="xray-findings-card">
            <div class="xray-findings-header">
              <h4 style="font-family: var(--xray-font-display); font-size: 1.05rem; font-weight: 700; color: var(--xray-ink); margin: 0;">
                <i class="fa-solid fa-list-check text-blue-600"></i> C\xE1c T\u1ED5n Th\u01B0\u01A1ng Ph\xE1t Hi\u1EC7n (${this.currentCase.findings.length})
              </h4>
              <span style="font-size: 0.75rem; color: var(--xray-muted);">Click v\xE0o th\u1EBB ho\u1EB7c v\xF2ng tr\xF2n tr\xEAn phim</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.65rem;">
              ${this.currentCase.findings.map((f) => {
        const isActive = f.id === this.activeFindingId;
        const conf = Math.round(f.confidence > 1 ? f.confidence : f.confidence * 100);
        return `
                  <div class="xray-finding-item ${isActive ? "active" : ""}" data-finding-id="${f.id}">
                    <div class="xray-finding-top">
                      <span class="xray-finding-title">
                        <i class="fa-solid fa-circle-dot" style="color: ${this.getSeverityColor(f.severity)};"></i>
                        ${f.nameVi || f.name}
                      </span>
                      <span class="xray-badge ${this.getSeverityBadgeClass(f.severity)}">${this.getSeverityLabel(f.severity)} (${conf}%)</span>
                    </div>

                    <p class="xray-finding-desc">${f.description}</p>

                    <div class="xray-finding-details">
                      <div><b>V\u1ECB tr\xED:</b> ${f.location}</div>
                      ${f.radiographicSign ? `<div><b>D\u1EA5u hi\u1EC7u X-quang:</b> ${f.radiographicSign}</div>` : ""}
                      ${f.differentialDiagnosis && f.differentialDiagnosis.length > 0 ? `
                        <div><b>Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t:</b> ${f.differentialDiagnosis.join(", ")}</div>
                      ` : ""}
                      ${f.clinicalCorrelation ? `<div><b>T\u01B0\u01A1ng quan l\xE2m s\xE0ng:</b> ${f.clinicalCorrelation}</div>` : ""}
                    </div>
                  </div>
                `;
      }).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
    }
    renderCasesView() {
      return `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.25rem;">
        ${this.cases.map((c) => `
          <div class="xray-findings-card" style="display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <span class="xray-badge xray-badge--mild">${this.getExamLabel(c.examType)}</span>
              <span style="font-size: 0.76rem; color: var(--xray-muted); font-family: var(--xray-font-mono);">${c.patientGender === "M" ? "Nam" : "N\u1EEF"}, ${c.patientAge}T</span>
            </div>

            <h3 style="font-family: var(--xray-font-display); font-size: 1.15rem; font-weight: 700; color: var(--xray-ink); margin: 0 0 0.4rem;">
              ${c.title}
            </h3>
            <p style="font-size: 0.82rem; color: var(--xray-ink2); margin: 0 0 0.85rem; line-height: 1.5; flex: 1;">
              ${c.clinicalHistory}
            </p>

            <div style="background: var(--xray-bg); padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid var(--xray-line); margin-bottom: 1rem; font-size: 0.78rem;">
              <div><b>Ch\u1EA9n \u0111o\xE1n:</b> ${c.diagnosis || c.title}</div>
              <div style="color: var(--xray-muted); margin-top: 0.2rem;">${c.findings.length} t\u1ED5n th\u01B0\u01A1ng tr\xEAn phim</div>
            </div>

            <button class="xray-btn xray-btn--primary btn-open-case-pacs" data-case-id="${c.id}" style="width: 100%; justify-content: center;">
              <i class="fa-solid fa-desktop"></i> M\u1EDF Ca N\xE0y Tr\xEAn PACS
            </button>
          </div>
        `).join("")}
      </div>
    `;
    }
    renderKnowledgeView() {
      const filtered = this.knowledgeFilter ? DEFAULT_KNOWLEDGE.filter((k) => k.title.toLowerCase().includes(this.knowledgeFilter.toLowerCase()) || k.content.toLowerCase().includes(this.knowledgeFilter.toLowerCase())) : DEFAULT_KNOWLEDGE;
      return `
      <div class="xray-findings-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-family: var(--xray-font-display); font-size: 1.25rem; margin: 0; color: var(--xray-ink);">
              S\u1ED5 Tay D\u1EA5u Hi\u1EC7u H\xECnh \u1EA2nh H\u1ECDc X-Quang L\xE2m S\xE0ng
            </h2>
            <p style="font-size: 0.82rem; color: var(--xray-muted); margin: 0.2rem 0 0;">
              Tra c\u1EE9u d\u1EA5u hi\u1EC7u b\xF3ng m\u1EDD, ph\u1EBF qu\u1EA3n kh\xED, li\u1EC1m h\u01A1i d\u01B0\u1EDBi ho\xE0nh, m\u1EE9c n\u01B0\u1EDBc-h\u01A1i ru\u1ED9t v\xE0 ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t.
            </p>
          </div>

          <div style="position: relative; width: 320px;">
            <input type="text" id="inp-xray-knowledge-search" placeholder="T\xECm d\u1EA5u hi\u1EC7u (v\xED d\u1EE5: Silhouette, Air bronchogram...)" value="${this.knowledgeFilter}" style="
              width: 100%;
              padding: 0.5rem 0.85rem;
              border-radius: 8px;
              border: 1px solid var(--xray-line);
              background: var(--xray-bg);
              color: var(--xray-ink);
              font-size: 0.85rem;
            ">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1rem;">
          ${filtered.map((entry) => `
            <div style="background: var(--xray-bg); border: 1px solid var(--xray-line); border-radius: 10px; padding: 1.1rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
                <h4 style="font-family: var(--xray-font-display); font-size: 1.05rem; font-weight: 700; color: var(--xray-primary); margin: 0;">
                  ${entry.title}
                </h4>
                <span class="xray-badge xray-badge--mild" style="font-size: 0.68rem;">${entry.category}</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--xray-ink); margin: 0 0 0.6rem; line-height: 1.55;">
                ${entry.content}
              </p>
              ${entry.tags && entry.tags.length > 0 ? `
                <div style="display: flex; gap: 0.3rem; flex-wrap: wrap; border-top: 1px dashed var(--xray-line); padding-top: 0.5rem;">
                  ${entry.tags.map((t) => `<span style="font-size: 0.72rem; color: var(--xray-muted);">#${t}</span>`).join(" ")}
                </div>
              ` : ""}
            </div>
          `).join("")}
        </div>
      </div>
    `;
    }
    initCanvas() {
      if (this.currentTab !== "pacs") return;
      const canvas = this.container.querySelector("#xray-canvas");
      if (!canvas) return;
      this.renderer = new XRayCanvasRenderer(canvas);
      this.renderer.setExamData(this.currentCase.examType, this.currentCase.findings, this.activeFindingId);
      this.renderer.setOnSelectFinding((finding) => {
        this.activeFindingId = finding ? finding.id : null;
        this.highlightFindingInList(this.activeFindingId);
      });
    }
    attachEventListeners() {
      this.container.querySelectorAll(".xray-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.dataset.tab;
          if (tab && tab !== this.currentTab) {
            this.currentTab = tab;
            this.render();
            this.initCanvas();
            this.attachEventListeners();
          }
        });
      });
      const caseSelect = this.container.querySelector("#select-case-dropdown");
      if (caseSelect) {
        caseSelect.addEventListener("change", (e) => {
          const id = e.target.value;
          const c = this.cases.find((x) => x.id === id);
          if (c) {
            this.currentCase = c;
            this.activeFindingId = null;
            this.render();
            this.initCanvas();
            this.attachEventListeners();
          }
        });
      }
      this.container.querySelectorAll(".btn-open-case-pacs").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.caseId;
          const c = this.cases.find((x) => x.id === id);
          if (c) {
            this.currentCase = c;
            this.currentTab = "pacs";
            this.activeFindingId = null;
            this.render();
            this.initCanvas();
            this.attachEventListeners();
            this.showToast(`\u0110\xE3 m\u1EDF ${c.title} tr\xEAn m\xE0n h\xECnh PACS!`);
          }
        });
      });
      const btnInvert = this.container.querySelector("#pacs-btn-invert");
      if (btnInvert && this.renderer) {
        btnInvert.addEventListener("click", () => {
          const next = !this.renderer.state.inverted;
          this.renderer.updateState({ inverted: next });
          btnInvert.classList.toggle("active", next);
        });
      }
      const btnOverlay = this.container.querySelector("#pacs-btn-overlay");
      if (btnOverlay && this.renderer) {
        btnOverlay.addEventListener("click", () => {
          const next = !this.renderer.state.showOverlay;
          this.renderer.updateState({ showOverlay: next });
          btnOverlay.classList.toggle("active", next);
        });
      }
      const btnZoomIn = this.container.querySelector("#pacs-btn-zoom-in");
      if (btnZoomIn && this.renderer) {
        btnZoomIn.addEventListener("click", () => {
          this.renderer.updateState({ zoom: Math.min(this.renderer.state.zoom * 1.2, 3.5) });
        });
      }
      const btnZoomOut = this.container.querySelector("#pacs-btn-zoom-out");
      if (btnZoomOut && this.renderer) {
        btnZoomOut.addEventListener("click", () => {
          this.renderer.updateState({ zoom: Math.max(this.renderer.state.zoom / 1.2, 0.5) });
        });
      }
      const btnResetView = this.container.querySelector("#pacs-btn-reset-view");
      if (btnResetView && this.renderer) {
        btnResetView.addEventListener("click", () => {
          this.renderer.resetTransform();
        });
      }
      const sliderBright = this.container.querySelector("#pacs-slider-brightness");
      if (sliderBright && this.renderer) {
        sliderBright.addEventListener("input", (e) => {
          this.renderer.updateState({ brightness: parseInt(e.target.value, 10) });
        });
      }
      const sliderContrast = this.container.querySelector("#pacs-slider-contrast");
      if (sliderContrast && this.renderer) {
        sliderContrast.addEventListener("input", (e) => {
          this.renderer.updateState({ contrast: parseInt(e.target.value, 10) });
        });
      }
      this.container.querySelectorAll(".xray-finding-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.findingId || null;
          this.activeFindingId = id;
          this.renderer?.setActiveFinding(id);
          this.highlightFindingInList(id);
        });
      });
      const btnResetPacs = this.container.querySelector("#btn-reset-pacs");
      if (btnResetPacs && this.renderer) {
        btnResetPacs.addEventListener("click", () => {
          this.renderer.resetTransform();
          if (sliderBright) sliderBright.value = "0";
          if (sliderContrast) sliderContrast.value = "0";
          if (btnInvert) btnInvert.classList.remove("active");
          this.showToast("\u0110\xE3 \u0111\u1EB7t l\u1EA1i c\xE1c th\xF4ng s\u1ED1 hi\u1EC3n th\u1ECB PACS!");
        });
      }
      const searchInp = this.container.querySelector("#inp-xray-knowledge-search");
      if (searchInp) {
        searchInp.addEventListener("input", (e) => {
          this.knowledgeFilter = e.target.value;
          this.render();
          this.attachEventListeners();
          const newInp = this.container.querySelector("#inp-xray-knowledge-search");
          if (newInp) {
            newInp.focus();
            newInp.setSelectionRange(newInp.value.length, newInp.value.length);
          }
        });
      }
      const soapBtn = this.container.querySelector("#btn-export-soap");
      if (soapBtn) {
        soapBtn.addEventListener("click", () => {
          this.exportToSoap();
        });
      }
    }
    highlightFindingInList(id) {
      this.container.querySelectorAll(".xray-finding-item").forEach((el) => {
        const isMatch = el.dataset.findingId === id;
        el.classList.toggle("active", isMatch);
        if (isMatch) {
          el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }
    exportToSoap() {
      const c = this.currentCase;
      const findingsSummary = c.findings.map(
        (f) => `- ${f.nameVi || f.name} (${f.location}): ${f.description}${f.radiographicSign ? ` (D\u1EA5u hi\u1EC7u: ${f.radiographicSign})` : ""}`
      ).join("\n");
      const soapText = `[O - C\u1EACN L\xC2M S\xC0NG H\xCCNH \u1EA2NH H\u1ECCC]
X-quang ${this.getExamLabel(c.examType)}:
${findingsSummary}

[A - CH\u1EA8N \u0110O\xC1N H\xCCNH \u1EA2NH H\u1ECCC]
- K\u1EBFt lu\u1EADn: ${c.diagnosis || c.title}
- Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t: ${c.findings.flatMap((f) => f.differentialDiagnosis || []).slice(0, 3).join("; ") || "Kh\xF4ng ghi nh\u1EADn th\xEAm"}

[P - H\u01AF\u1EDANG X\u1EEC TR\xCD & \u0110\u1EC0 NGH\u1ECA]
- K\u1EBF ho\u1EA1ch: ${c.notes || "\u0110\u1ED1i chi\u1EBFu l\xE2m s\xE0ng, theo d\xF5i s\xE1t ti\u1EBFn tri\u1EC3n"}
- \u0110\u1EC1 ngh\u1ECB c\u1EADn l\xE2m s\xE0ng ti\u1EBFp theo: Ch\u1EE5p CT Scan ng\u1EF1c/b\u1EE5ng ho\u1EB7c si\xEAu \xE2m ki\u1EC3m tra n\u1EBFu tri\u1EC7u ch\u1EE9ng kh\xF4ng thuy\xEAn gi\u1EA3m.`;
      navigator.clipboard.writeText(soapText).then(() => {
        this.showToast("\u0110\xE3 sao ch\xE9p k\u1EBFt lu\u1EADn X-quang v\xE0o khay nh\u1EDB t\u1EA1m (SOAP)!");
      }).catch(() => {
        this.showToast("Sao ch\xE9p th\u1EA5t b\u1EA1i! Vui l\xF2ng c\u1EA5p quy\u1EC1n clipboard.");
      });
    }
    getExamLabel(t) {
      switch (t) {
        case "chest_pa":
          return "Ng\u1EF1c th\u1EB3ng (PA)";
        case "chest_lateral":
          return "Ng\u1EF1c nghi\xEAng";
        case "abdomen_supine":
          return "B\u1EE5ng n\u1EB1m ng\u1EEDa";
        case "abdomen_erect":
          return "B\u1EE5ng \u0111\u1EE9ng";
        default:
          return t;
      }
    }
    getSeverityBadgeClass(s) {
      switch (s) {
        case "critical":
          return "xray-badge--critical";
        case "severe":
          return "xray-badge--severe";
        case "moderate":
          return "xray-badge--moderate";
        default:
          return "xray-badge--mild";
      }
    }
    getSeverityColor(s) {
      switch (s) {
        case "critical":
          return "#ef4444";
        case "severe":
          return "#f97316";
        case "moderate":
          return "#f59e0b";
        default:
          return "#10b981";
      }
    }
    getSeverityLabel(s) {
      switch (s) {
        case "critical":
          return "Nguy k\u1ECBch";
        case "severe":
          return "N\u1EB7ng";
        case "moderate":
          return "Trung b\xECnh";
        default:
          return "Nh\u1EB9";
      }
    }
    showToast(msg) {
      const toast = document.getElementById("xray-toast");
      const toastMsg = document.getElementById("xray-toast-msg");
      if (toast && toastMsg) {
        toastMsg.innerText = msg;
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3e3);
      }
    }
  };

  // src/content/docspace/public/cdss/index.ts
  function initCDSSHub(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
    <div class="cdss-hub-container">
      <!-- Hero Banner -->
      <section class="cdss-hub-hero">
        <div class="cdss-hero-tag">
          <i class="fa-solid fa-microchip"></i> H\u1EC7 Th\u1ED1ng H\u1ED7 Tr\u1EE3 Quy\u1EBFt \u0110\u1ECBnh L\xE2m S\xE0ng 2.0
        </div>
        <h1 class="cdss-hero-title">
          Kho CDSS L\xE2m S\xE0ng \u0110\u1ED9c L\u1EADp
        </h1>
        <p class="cdss-hero-subtitle">
          T\u1EADp h\u1EE3p c\xE1c c\xF4ng c\u1EE5 thu\u1EADt to\xE1n t\xEDnh to\xE1n li\u1EC1u l\u01B0\u1EE3ng, \u0111i\u1EC1u ph\u1ED1i ph\xE1c \u0111\u1ED3 truy\u1EC1n d\u1ECBch \u0111\u1ED9ng h\u1ECDc, ph\xE2n t\xEDch s\xF3ng \u0111i\u1EC7n tim v\xE0 h\u1ED7 tr\u1EE3 ra quy\u1EBFt \u0111\u1ECBnh \u0111i\u1EC1u tr\u1ECB t\u1EA1i gi\u01B0\u1EDDng b\u1EC7nh (Bedside Decision Support).
        </p>
      </section>

      <!-- Grid of CDSS Modules -->
      <section class="cdss-hub-modules-section">
        <div class="cdss-modules-header">
          <h2 class="cdss-section-heading">
            <i class="fa-solid fa-shapes"></i> Danh S\xE1ch Module CDSS \u0110ang Ho\u1EA1t \u0110\u1ED9ng
          </h2>
          <span class="cdss-module-count">${CDSS_MODULES.length} modules s\u1EB5n s\xE0ng</span>
        </div>

        <div class="cdss-modules-grid">
          ${CDSS_MODULES.map((m) => `
            <div class="cdss-module-card cdss-module-card--${m.category}">
              <div class="cdss-card-top">
                <div class="cdss-card-icon-wrap">
                  <i class="${m.icon}"></i>
                </div>
                <div class="cdss-card-badges">
                  <span class="cdss-badge cdss-badge--category">${m.categoryName}</span>
                  ${m.badge ? `<span class="cdss-badge cdss-badge--highlight">${m.badge}</span>` : ""}
                </div>
              </div>

              <h3 class="cdss-card-title">
                <a href="${m.standaloneUrl}">${m.title}</a>
              </h3>
              ${m.titleEn ? `<p class="cdss-card-title-en">${m.titleEn}</p>` : ""}
              
              <p class="cdss-card-desc">${m.shortDesc}</p>

              <div class="cdss-card-meta">
                <div class="cdss-meta-item">
                  <i class="fa-solid fa-book-medical"></i> <span>${m.guidelineSource}</span>
                </div>
                ${m.icd10 && m.icd10.length > 0 ? `
                  <div class="cdss-meta-item">
                    <i class="fa-solid fa-barcode"></i> <span>ICD-10: ${m.icd10.join(", ")}</span>
                  </div>
                ` : ""}
              </div>

              <div class="cdss-card-footer">
                <span class="cdss-version-tag">Phi\xEAn b\u1EA3n ${m.version}</span>
                <a href="${m.standaloneUrl}" class="cdss-open-btn">
                  <span>M\u1EDF CDSS</span> <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;
  }
  if (typeof window !== "undefined") {
    window.initCDSSHub = initCDSSHub;
    window.CDSS_MODULES = CDSS_MODULES;
    window.getCDSSModuleById = getCDSSModuleById;
  }
})();
