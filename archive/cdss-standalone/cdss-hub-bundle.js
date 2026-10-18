var CDSSHub = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/content/docspace/public/cdss/index.ts
  var index_exports = {};
  __export(index_exports, {
    CDC_STANDARD_WEIGHT: () => CDC_STANDARD_WEIGHT,
    CDSS_MODULES: () => CDSS_MODULES,
    DENGUE_FLUID_TEMPLATES: () => DENGUE_FLUID_TEMPLATES,
    DENGUE_NON_RESPONSE_SCENARIOS: () => DENGUE_NON_RESPONSE_SCENARIOS,
    DENGUE_NURSING_CHECKLIST: () => DENGUE_NURSING_CHECKLIST,
    DENGUE_REFRACTORY_SCENARIOS: () => DENGUE_REFRACTORY_SCENARIOS,
    DengueCDSSController: () => DengueCDSSController,
    XRayCDSSController: () => XRayCDSSController,
    XRayCanvasRenderer: () => XRayCanvasRenderer,
    calculateABCSChecklist: () => calculateABCSChecklist,
    calculateAlbuminDose: () => calculateAlbuminDose,
    calculateBloodProducts: () => calculateBloodProducts,
    calculateBranchDecision: () => calculateBranchDecision,
    calculateFluidSchedule: () => calculateFluidSchedule,
    calculateNACProtocol: () => calculateNACProtocol,
    calculateVasopressorDoses: () => calculateVasopressorDoses,
    calculateWeightAdjustment: () => calculateWeightAdjustment,
    classifyAgeGroup: () => classifyAgeGroup,
    generateDengueCDSSPlan: () => generateDengueCDSSPlan,
    getCDCStandardWeight: () => getCDCStandardWeight,
    getCDSSModuleById: () => getCDSSModuleById,
    getCDSSModuleBySlug: () => getCDSSModuleBySlug,
    initCDSSHub: () => initCDSSHub
  });

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
      title: "\u0110\xE1nh Gi\xE1 Nhi\u1EC5m Tr\xF9ng & Ph\xE1c \u0110\u1ED3, Li\u1EC1u Kh\xE1ng Sinh (InfectoDose CDSS)",
      titleEn: "Infection Assessment, MDR Risk Stratification & Precision Antibiotic Dosing CDSS",
      shortDesc: "H\u1EC7 th\u1ED1ng h\u1ED7 tr\u1EE3 ra quy\u1EBFt \u0111\u1ECBnh l\xE2m s\xE0ng 2 ph\xE2n h\u1EC7 ho\xE0n ch\u1EC9nh: (1) \u0110\xE1nh gi\xE1 nhi\u1EC5m tr\xF9ng NHSN-CDC, ph\xE2n t\u1EA7ng nguy c\u01A1 vi khu\u1EA9n \u0111a kh\xE1ng (SOFA/CLIF-SOFA) v\xE0 ph\xE1c \u0111\u1ED3 kh\xE1ng sinh kh\u1EDFi \u0111\u1EA7u theo BV B\u1EC7nh Nhi\u1EC7t \u0110\u1EDBi & B\u1ED9 Y T\u1EBF; (2) C\xE1 th\u1EC3 h\xF3a t\xEDnh li\u1EC1u 43 kh\xE1ng sinh, hi\u1EC7u ch\u1EC9nh ch\u1EE9c n\u0103ng th\u1EADn (CrCl/eGFR), l\u1ECDc m\xE1u chu k\u1EF3 HD/CRRT/CAPD, t\u01B0\u01A1ng t\xE1c thu\u1ED1c DDI v\xE0 t\xE1i \u0111\xE1nh gi\xE1 xu\u1ED1ng thang 48-72h.",
      category: "pharmacology",
      categoryName: "Truy\u1EC1n nhi\u1EC5m & Kh\xE1ng sinh",
      version: "3.0.0 (BVBND 2026 & NHSN)",
      updatedAt: "2026-10-10",
      author: "CliniPortal CDSS Squad & BV B\u1EC7nh Nhi\u1EC7t \u0110\u1EDBi & Sanford/Stanford",
      guidelineSource: "BV B\u1EC7nh Nhi\u1EC7t \u0110\u1EDBi (eMed 2026), Q\u0110 5631/Q\u0110-BYT 2020 & Stanford/Sanford Antimicrobial Guide",
      icd10: ["A41", "A49", "Z16", "N18", "J18", "K65"],
      icon: "fa-solid fa-viruses",
      badge: "BVBND 2026 + NHSN + 43 KS + HD/CRRT",
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
    },
    {
      id: "cdss-inpatient-exam",
      slug: "inpatient",
      title: "Ti\u1EBFp C\u1EADn L\xE2m S\xE0ng & Kh\xE1m B\u1EC7nh N\u1ED9i Tr\xFA (Bates & Macleod)",
      titleEn: "Inpatient Clinical Examination & Diagnostic Approach CDSS",
      shortDesc: "C\u1EA9m nang kh\xE1m l\xE2m s\xE0ng c\xF3 h\u1EC7 th\u1ED1ng, ti\u1EBFp c\u1EADn c\xE1c h\u1ED9i ch\u1EE9ng v\xE0 tri\u1EC7u ch\u1EE9ng b\u1EC7nh n\u1ED9i tr\xFA kinh \u0111i\u1EC3n, b\u1ED9 c\xF4ng c\u1EE5 h\u1ECFi b\u1EC7nh s\u1EED 7 thu\u1ED9c t\xEDnh, tra c\u1EE9u nhanh v\xE0 ghi ch\xFA m\u1EE5c ti\xEAu l\xE2m s\xE0ng.",
      category: "internal",
      categoryName: "N\u1ED9i khoa & L\xE2m s\xE0ng",
      version: "1.0.0 (Bates & Macleod)",
      updatedAt: "2026-09-28",
      author: "CliniPortal CDSS Squad & Bates / Macleod",
      guidelineSource: "Bates\u2019 Pocket Guide to Physical Examination & Macleod's Clinical Examination",
      icd10: ["R00-R99", "Z00.0"],
      icon: "fa-solid fa-stethoscope",
      badge: "Bates & Macleod + 7 Thu\u1ED9c T\xEDnh",
      isStandalone: true,
      standaloneUrl: "inpatient/index.html"
    },
    {
      id: "cdss-diacare-insulin",
      slug: "diacare",
      title: "Qu\u1EA3n L\xFD Insulin & \u0110\u01B0\u1EDDng Huy\u1EBFt N\u1ED9i Vi\u1EC7n (DiaCare CDSS)",
      titleEn: "DiaCare Inpatient Glycemic & Insulin Management CDSS",
      shortDesc: "H\u1EC7 th\u1ED1ng h\u1ED7 tr\u1EE3 ra quy\u1EBFt \u0111\u1ECBnh l\xE2m s\xE0ng qu\u1EA3n l\xFD \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng n\u1ED9i vi\u1EC7n, t\u1EF1 \u0111\u1ED9ng t\xEDnh to\xE1n li\u1EC1u insulin ph\xE1c \u0111\u1ED3 Basal-Bolus, hi\u1EC7u ch\u1EC9nh suy th\u1EADn/suy gan/b\xE9o ph\xEC, ph\xE1c \u0111\u1ED3 tr\u01B0\u1EE3t SSI, x\u1EED tr\xED c\u1EA5p c\u1EE9u DKA/HHS v\xE0 t\xECnh hu\u1ED1ng l\xE2m s\xE0ng \u0111\u1EB7c th\xF9 (chu ph\u1EABu, corticoid, l\u1ECDc m\xE1u, nu\xF4i \u0103n sonde) theo ADA 2026 v\xE0 JBDS-IP.",
      category: "endocrinology",
      categoryName: "N\u1ED9i ti\u1EBFt & Chuy\u1EC3n h\xF3a",
      version: "2.0.0 (ADA 2026 & JBDS-IP)",
      updatedAt: "2026-09-28",
      author: "CliniPortal CDSS Squad & ADA 2026 / JBDS-IP",
      guidelineSource: "ADA Standards of Care 2026 (Hospital Care) & JBDS-IP Inpatient Glycemic Guidelines",
      icd10: ["E10", "E11", "E14", "E87.2", "R73.9"],
      icon: "fa-solid fa-syringe",
      badge: "ADA 2026 + JBDS-IP + Basal-Bolus",
      isStandalone: true,
      standaloneUrl: "diacare/index.html"
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
  var DENGUE_REFRACTORY_SCENARIOS = {
    // 1. Không đáp ứng + Hct cao ≥ 40% (Thất thoát huyết tương ồ ạt)
    hct_high_cpt: {
      id: "hct_high_cpt",
      code: "CPT_ESCALATION",
      name: "Kh\xF4ng \u0110\xE1p \u1EE8ng + Hct C\xF2n Cao \u2265 40% (Th\u1EA5t Tho\xE1t Huy\u1EBFt T\u01B0\u01A1ng Ti\u1EBFn Tri\u1EC3n)",
      tag: "Chuy\u1EC3n Cao Ph\xE2n T\u1EED",
      badgeClass: "danger",
      triggerCriteria: "Sau b\xF9 d\u1ECBch tinh th\u1EC3 gi\u1EDD \u0111\u1EA7u nh\u01B0ng m\u1EA1ch c\xF2n nhanh nh\u1ECF, HA c\xF2n k\u1EB9t \u2264 20 mmHg ho\u1EB7c t\u1EE5t, Hct \u2265 40% ho\u1EB7c kh\xF4ng gi\u1EA3m.",
      mechanism: "Th\u1EA5t tho\xE1t huy\u1EBFt t\u01B0\u01A1ng n\u1EB7ng qua h\xE0ng r\xE0o n\u1ED9i m\xF4 mao m\u1EA1ch; d\u1ECBch tinh th\u1EC3 nhanh ch\xF3ng tho\xE1t ra khoang th\u1EE9 ba g\xE2y \u1EE9 d\u1ECBch m\xE0ng b\u1EE5ng/m\xE0ng ph\u1ED5i m\xE0 kh\xF4ng gi\u1EEF \u0111\u01B0\u1EE3c th\u1EC3 t\xEDch n\u1ED9i m\u1EA1ch.",
      primaryAction: "Chuy\u1EC3n sang dung d\u1ECBch Cao Ph\xE2n T\u1EED (Dextran 40, Dextran 70 ho\u1EB7c 6% HES 200). Tr\u1EBB em: 10 - 20 ml/kg/h x 1h; Ng\u01B0\u1EDDi l\u1EDBn: 10 - 15 ml/kg/h x 1h.",
      keyOrders: [
        "Tr\u1EBB em: Cao ph\xE2n t\u1EED (Dextran 40 / 6% HES 200) 10 - 20 ml/kg/h truy\u1EC1n t\u0129nh m\u1EA1ch trong 1 gi\u1EDD. N\u1EBFu c\u1EA3i thi\u1EC7n -> gi\u1EA3m d\u1EA7n 10 -> 7.5 -> 5 ml/kg/h.",
        "Ng\u01B0\u1EDDi l\u1EDBn: Cao ph\xE2n t\u1EED 10 - 15 ml/kg/h truy\u1EC1n t\u0129nh m\u1EA1ch trong 1 gi\u1EDD. N\u1EBFu c\u1EA3i thi\u1EC7n -> chuy\u1EC3n \u0111i\u1EC7n gi\u1EA3i RL/NaCl 0.9% 10 -> 6 -> 3 -> 1.5 ml/kg/h.",
        "N\u1EBFu kh\xF4ng c\u1EA3i thi\u1EC7n l\xE2m s\xE0ng sau CPT l\u1EA7n 1: L\u1EB7p l\u1EA1i CPT 10 - 20 ml/kg/h (tr\u1EBB em) ho\u1EB7c 10 ml/kg/h (ng\u01B0\u1EDDi l\u1EDBn) trong 1 gi\u1EDD.",
        "N\u1EBFu v\u1EABn kh\xF4ng ra s\u1ED1c sau 2 l\u1EA7n CPT: K\xEDch ho\u1EA1t ngay L\u01B0u \u0111\u1ED3 S\u1ED1c Th\u1EA5t B\u1EA1i B\xF9 D\u1ECBch (Ph\u1EE5 l\u1EE5c 18)."
      ],
      monitoringSteps: [
        "\u0110o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng sau m\u1ED7i gi\u1EDD truy\u1EC1n CPT.",
        "Theo d\xF5i sinh hi\u1EC7u (M\u1EA1ch, HA, SpO2) m\u1ED7i 15 - 30 ph\xFAt.",
        "Ghi nh\u1EADn l\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u m\u1ED7i gi\u1EDD (\u0111\xEDch \u2265 0.5 - 1 ml/kg/h).",
        "C\u1EA3nh b\xE1o gi\u1EDBi h\u1EA1n t\u1ED5ng li\u1EC1u CPT: Kh\xF4ng v\u01B0\u1EE3t qu\xE1 60 ml/kg \u0111\u1EC3 tr\xE1nh suy th\u1EADn c\u1EA5p v\xE0 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u."
      ],
      precautions: [
        "Khi t\u1ED5ng li\u1EC1u CPT \u2265 60 ml/kg m\xE0 c\xF2n s\u1ED1c: H\u1ED9i ch\u1EA9n chuy\u1EC3n sang truy\u1EC1n Albumin 5% ho\u1EB7c 10% (trang 20 Q\u0110 2760).",
        "N\u1EBFu kh\xF4ng c\xF3 Dextran 40/HES 200, c\xF3 th\u1EC3 thay b\u1EB1ng HES 130 ho\u1EB7c Gelatin nh\u01B0ng kh\u1EA3 n\u0103ng gi\u1EEF th\u1EC3 t\xEDch k\xE9m h\u01A1n, c\u1EA7n theo d\xF5i s\xE1t."
      ],
      appendixRef: "Ph\u1EE5 l\u1EE5c 8, 11, 12, 16.1, 16.2 & Trang 15, 28 Q\u0110 2760"
    },
    // 2. Không đáp ứng + Hct giảm nhanh > 20% hoặc Hct ≤ 35% (Xuất huyết nội ẩn)
    occult_bleeding: {
      id: "occult_bleeding",
      code: "OCCULT_BLEEDING",
      name: "Kh\xF4ng \u0110\xE1p \u1EE8ng + Hct Gi\u1EA3m Nhanh > 20% ho\u1EB7c Hct \u2264 35% (Nghi Xu\u1EA5t Huy\u1EBFt N\u1ED9i \u1EA8n)",
      tag: "Truy\u1EC1n M\xE1u Kh\u1EA9n C\u1EA5p",
      badgeClass: "danger",
      triggerCriteria: "S\u1ED1c th\u1EA5t b\u1EA1i b\xF9 d\u1ECBch \u2265 40-60 ml/kg k\xE8m Hct gi\u1EA3m \u0111\u1ED9t ng\u1ED9t > 20% so v\u1EDBi ban \u0111\u1EA7u ho\u1EB7c Hct \u2264 35% (\u1EDF ng\u01B0\u1EDDi l\u1EDBn Hct < 35%), ho\u1EB7c \u0111ang c\xF3 xu\u1EA5t huy\u1EBFt \u1ED3 \u1EA1t.",
      mechanism: "M\u1EA5t m\xE1u c\u1EA5p do xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a \u1EA9n (d\u1EA1 d\xE0y, ru\u1ED9t non), xu\u1EA5t huy\u1EBFt ph\u1EE7 t\u1EA1ng ho\u1EB7c t\u1EE5 m\xE1u c\u01A1 sau m\u1EA1c treo k\u1EBFt h\u1EE3p gi\u1EA3m ti\u1EC3u c\u1EA7u n\u1EB7ng v\xE0 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u ti\xEAu th\u1EE5.",
      primaryAction: "Th\u0103m kh\xE1m t\xECm \u1ED5 xu\u1EA5t huy\u1EBFt n\u1ED9i, truy\u1EC1n H\u1ED3ng C\u1EA7u L\u1EAFng kh\u1EA9n c\u1EA5p, song song duy tr\xEC CPT 10 ml/kg/h trong l\xFAc ch\u1EDD m\xE1u.",
      keyOrders: [
        "H\u1ED3ng c\u1EA7u l\u1EAFng 5 - 10 ml/kg (ho\u1EB7c M\xE1u to\xE0n ph\u1EA7n 10 - 20 ml/kg l\u1EA5y < 7 ng\xE0y) truy\u1EC1n t\u0129nh m\u1EA1ch trong 1 - 2 gi\u1EDD. M\u1EE5c ti\xEAu Hct duy tr\xEC 35 - 40%.",
        "Song song: Truy\u1EC1n Cao ph\xE2n t\u1EED 10 ml/kg/h \u0111\u1EC3 n\xE2ng huy\u1EBFt \xE1p ch\u1ED1ng s\u1ED1c trong khi ch\u1EDD l\u0129nh m\xE1u.",
        "Huy\u1EBFt t\u01B0\u01A1ng t\u01B0\u01A1i \u0111\xF4ng l\u1EA1nh (HT\u0110L) 10 - 20 ml/kg/2-4h: Khi PT ho\u1EB7c aPTT > 1.5 l\u1EA7n ch\u1EE9ng k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng ho\u1EB7c chu\u1EA9n b\u1ECB th\u1EE7 thu\u1EADt.",
        "K\u1EBFt t\u1EE7a l\u1EA1nh 1 t\xFAi / 6 kg (ch\u1EE9a 150mg Fibrinogen): Khi xu\u1EA5t huy\u1EBFt n\u1EB7ng k\xE8m Fibrinogen < 1 g/L.",
        "Ti\u1EC3u c\u1EA7u \u0111\u1EADm \u0111\u1EB7c: 1 \u0111\u01A1n v\u1ECB / 5 kg (ho\u1EB7c 1 \u0111v g\u1EA1n t\xE1ch / 10 kg) khi TC < 50.000/mm\xB3 k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng ho\u1EB7c TC < 5.000/mm\xB3.",
        "Omeprazole 1 mg/kg IV ch\u1EADm (ng\u01B0\u1EDDi l\u1EDBn: Bolus 80mg TM, sau \u0111\xF3 40mg m\u1ED7i 12h) n\u1EBFu nghi ng\u1EDD lo\xE9t d\u1EA1 d\xE0y - t\xE1 tr\xE0ng.",
        "Vitamin K1 1 mg/kg t\u0129nh m\u1EA1ch ch\u1EADm (t\u1ED1i \u0111a 20 mg/ng\xE0y) n\u1EBFu c\xF3 t\u1ED5n th\u01B0\u01A1ng gan n\u1EB7ng."
      ],
      monitoringSteps: [
        "Th\u0103m tr\u1EF1c tr\xE0ng t\xECm ph\xE2n \u0111en / m\xE1u; \u0111\u1EB7t sonde d\u1EA1 d\xE0y qua \u0111\u01B0\u1EDDng MI\u1EC6NG (kh\xF4ng \u0111\u1EB7t \u0111\u01B0\u1EDDng m\u0169i do d\u1EC5 ch\u1EA3y m\xE1u cu\u1ED1ng m\u0169i).",
        "\u0110o l\u1EA1i Hct sau 1 gi\u1EDD truy\u1EC1n m\xE1u v\xE0 CPT.",
        "Theo d\xF5i s\xE1t d\u1EA5u hi\u1EC7u sinh t\u1ED3n 15 ph\xFAt/l\u1EA7n cho \u0111\u1EBFn khi huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh.",
        "B\u0103ng \xE9p t\u1EA1i ch\u1ED7 m\u1ECDi v\u1ECB tr\xED ch\u1EA3y m\xE1u ti\xEAm ch\xEDch; nh\xE9t b\u1EA5c m\u0169i t\u1EA9m Adrenalin n\u1EBFu ch\u1EA3y m\xE1u m\u0169i n\u1EB7ng."
      ],
      precautions: [
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng ch\u1ECDc t\u0129nh m\u1EA1ch c\u1ED5 hay t\u0129nh m\u1EA1ch d\u01B0\u1EDBi \u0111\xF2n (nguy c\u01A1 t\u1EE5 m\xE1u trung th\u1EA5t t\u1EED vong).",
        "H\u1EA1n ch\u1EBF t\u1ED1i \u0111a ti\xEAm b\u1EAFp; l\u1EA5y m\xE1u x\xE9t nghi\u1EC7m t\u1EA1i t\u0129nh m\u1EA1ch chi v\xE0 \xE9p ch\u1EB7t \u0111i\u1EC3m ti\xEAm 1-2 ph\xFAt."
      ],
      appendixRef: "Ph\u1EE5 l\u1EE5c 17 & Trang 16, 22-23, 29-30 Q\u0110 2760"
    },
    // 3. Sốc thất bại bù dịch / Sốc kéo dài / Tái sốc ≥ 2 lần (Lưu đồ Phụ lục 18)
    refractory_shock: {
      id: "refractory_shock",
      code: "REFRACTORY_SHOCK",
      name: "S\u1ED1c Th\u1EA5t B\u1EA1i B\xF9 D\u1ECBch / S\u1ED1c K\xE9o D\xE0i / T\xE1i S\u1ED1c \u2265 2 L\u1EA7n (L\u01B0u \u0110\u1ED3 Ph\u1EE5 L\u1EE5c 18)",
      tag: "\u0110o CVP & V\u1EADn M\u1EA1ch",
      badgeClass: "danger",
      triggerCriteria: "B\xF9 d\u1ECBch CPT \u2265 60-100 ml/kg nh\u01B0ng huy\u1EBFt \u0111\u1ED9ng v\u1EABn kh\xF4ng \u1ED5n \u0111\u1ECBnh, t\xE1i s\u1ED1c nhi\u1EC1u l\u1EA7n, toan chuy\u1EC3n h\xF3a ti\u1EBFn tri\u1EC3n.",
      mechanism: "Suy tu\u1EA7n ho\xE0n ph\u1EE9c t\u1EA1p k\u1EBFt h\u1EE3p: s\u1ED1c gi\u1EA3m th\u1EC3 t\xEDch k\xE9o d\xE0i, toan m\xE1u n\u1EB7ng \u1EE9c ch\u1EBF c\u01A1 tim, suy ch\u1EE9c n\u0103ng co b\xF3p c\u01A1 tim do vi\xEAm c\u01A1 tim Dengue v\xE0 gi\u1EA3m kh\xE1ng l\u1EF1c m\u1EA1ch h\u1EC7 th\u1ED1ng.",
      primaryAction: "H\u1ED9i ch\u1EA9n kh\u1EA9n c\u1EA5p chuy\xEAn gia SXHD. \u0110\u1EB7t catheter \u0111o CVP qua t\u0129nh m\u1EA1ch n\u1EC1n khu\u1EF7u tay (Seldinger c\u1EA3i ti\u1EBFn), \u0111o HA\u0110MXL, l\xE0m kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch, \u0111i\u1EC1u tr\u1ECB g\xF3i ABCS v\xE0 x\u1EED tr\xED theo m\u1EE9c CVP.",
      keyOrders: [
        "\u0110o CVP & HA\u0110MXL: \u0110\u1EB7t t\u0129nh m\u1EA1ch n\u1EC1n khu\u1EF7u tay (kh\xF4ng d\xF9ng TM c\u1EA3nh/d\u01B0\u1EDBi \u0111\xF2n). Si\xEAu \xE2m IVC \u0111\xE1nh gi\xE1 x\u1EB9p/c\u0103ng.",
        "Test d\u1ECBch: Truy\u1EC1n Cao ph\xE2n t\u1EED 5 ml/kg trong 30 ph\xFAt.",
        "N\u1EBFu CVP \u2264 15 cmH2O (ho\u1EB7c IVC x\u1EB9p): Ti\u1EBFp t\u1EE5c truy\u1EC1n CPT 10 - 20 ml/kg/h. N\u1EBFu t\u1ED5ng CPT \u2265 60 ml/kg k\xE8m Albumin < 2.5 g/dL -> Ch\u1EC9 \u0111\u1ECBnh b\xF9 Albumin 5% ho\u1EB7c 10%.",
        "N\u1EBFu CVP > 15 cmH2O (ho\u1EB7c IVC c\u0103ng to su\u1ED1t chu k\u1EF3 th\u1EDF):",
        "  \u2022 Co b\xF3p c\u01A1 tim b\xECnh th\u01B0\u1EDDng: Ng\u01B0ng d\u1ECBch n\u1EBFu qu\xE1 t\u1EA3i, d\xF9ng Dobutamin 3 - 10 \xB5g/kg/ph\xFAt.",
        "  \u2022 Co b\xF3p c\u01A1 tim gi\u1EA3m: Truy\u1EC1n Dopamin 5 - 10 \xB5g/kg/ph\xFAt; n\u1EBFu qu\xE1 t\u1EA3i ng\u01B0ng d\u1ECBch + Dobutamin 3 - 10 \xB5g/kg/ph\xFAt.",
        "  \u2022 N\u1EBFu c\xF2n s\u1ED1c k\xE8m gi\u1EA3m co b\xF3p c\u01A1 tim: Ph\u1ED1i h\u1EE3p Adrenalin 0.05 - 0.3 \xB5g/kg/ph\xFAt.",
        "  \u2022 N\u1EBFu gi\u1EA3m kh\xE1ng l\u1EF1c m\u1EA1ch h\u1EC7 th\u1ED1ng (HA t\xE2m tr\u01B0\u01A1ng t\u1EE5t, s\u1ED1c \u1EA5m): Ph\u1ED1i h\u1EE3p Noradrenalin 0.05 - 1 \xB5g/kg/ph\xFAt.",
        "G\xF3i h\u1ED3i s\u1EE9c ABCS b\u1EAFt bu\u1ED9c: A (Bicarbonate 4.2% n\u1EBFu pH < 7.35), B (M\xE1u & ch\u1EBF ph\u1EA9m), C (Calci clorua 10% n\u1EBFu Ca++ < 1.0 mmol/L), S (Dextrose 30% n\u1EBFu Glucose < 40 mg/dL)."
      ],
      monitoringSteps: [
        "Theo d\xF5i li\xEAn t\u1EE5c monitor: ECG, SpO2, HA\u0110MXL, CVP.",
        "\u0110o ScvO2 (kh\xED m\xE1u t\u0129nh m\u1EA1ch trung t\xE2m): M\u1EE5c ti\xEAu duy tr\xEC ScvO2 \u2265 70%.",
        "Lactate m\xE1u \u0111\u1ED9ng m\u1EA1ch m\u1ED7i 2 - 4 gi\u1EDD (m\u1EE5c ti\xEAu gi\u1EA3m < 2 mmol/L).",
        "Ki\u1EC3m tra men tim Troponin I, CK-MB, si\xEAu \xE2m tim t\u1EA1i gi\u01B0\u1EDDng t\xECm tr\xE0n d\u1ECBch m\xE0ng tim / vi\xEAm c\u01A1 tim."
      ],
      precautions: [
        "C\xF4ng th\u1EE9c t\xEDnh li\u1EC1u Albumin (g): [N\u1ED3ng \u0111\u1ED9 Albumin c\u1EA7n \u0111\u1EA1t (g/dL) - N\u1ED3ng \u0111\u1ED9 hi\u1EC7n t\u1EA1i (g/dL)] \xD7 0.8 \xD7 C\xE2n n\u1EB7ng (kg).",
        "C\xE1ch pha Albumin 5%: 1 l\u1ECD 20% 50ml + 150ml NaCl 0.9% = 200ml Albumin 5%.",
        "C\xE1ch pha Albumin 10%: 1 l\u1ECD 20% 50ml + 50ml NaCl 0.9% = 100ml Albumin 10%."
      ],
      appendixRef: "Ph\u1EE5 l\u1EE5c 12, 13, 15, 18 & Trang 16, 20-21, 28-29 Q\u0110 2760"
    },
    // 4. Biến chứng Dư dịch / Quá tải tuần hoàn / Phù phổi cấp
    fluid_overload: {
      id: "fluid_overload",
      code: "FLUID_OVERLOAD",
      name: "Bi\u1EBFn Ch\u1EE9ng D\u01B0 D\u1ECBch / Qu\xE1 T\u1EA3i Tu\u1EA7n Ho\xE0n / Ph\xF9 Ph\u1ED5i C\u1EA5p",
      tag: "Ng\u01B0ng D\u1ECBch & L\u1EE3i Ti\u1EC3u",
      badgeClass: "warning",
      triggerCriteria: "\u0110\u1ED9t ng\u1ED9t ho, kh\xF3 th\u1EDF, th\u1EDF nhanh, co k\xE9o, SpO2 < 92%, ran \u1EA9m n\u1ED5 d\xE2ng nhanh \u1EDF hai \u0111\xE1y ph\u1ED5i, kh\u1EA1c b\u1ECDt h\u1ED3ng, t\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i, gan to \u0111au, CVP > 15 cmH2O.",
      mechanism: "Qu\xE1 t\u1EA3i th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n do b\xF9 d\u1ECBch t\u1ED1c \u0111\u1ED9 cao k\xE9o d\xE0i k\u1EBFt h\u1EE3p hi\u1EC7n t\u01B0\u1EE3ng t\xE1i h\u1EA5p thu d\u1ECBch t\u1EEB khoang k\u1EBD v\xE0o l\xF2ng m\u1EA1ch \u1EDF ng\xE0y th\u1EE9 6 - 7 c\u1EE7a b\u1EC7nh.",
      primaryAction: "NG\u01AFNG NGAY D\u1ECACH TRUY\u1EC0N T\u0128NH M\u1EA0CH. Cho b\u1EC7nh nh\xE2n n\u1EB1m \u0111\u1EA7u cao 30 - 45\xB0, th\u1EDF oxy g\u1ECDng k\xEDnh -> th\u1EDF NCPAP ho\u1EB7c th\u1EDF m\xE1y, d\xF9ng Furosemide v\xE0 Dobutamin.",
      keyOrders: [
        "NG\u01AFNG TRUY\u1EC0N D\u1ECACH T\u0128NH M\u1EA0CH NGAY L\u1EACP T\u1EE8C.",
        "T\u01B0 th\u1EBF: N\u1EB1m \u0111\u1EA7u cao 30 - 45\xB0.",
        "H\u1ED7 tr\u1EE3 h\xF4 h\u1EA5p: Th\u1EDF oxy qua canulla 2 - 5 L/ph\xFAt -> Th\u1EDF NCPAP \xE1p l\u1EF1c 4 - 6 cmH2O, FiO2 40-60%, t\u0103ng d\u1EA7n \u0111\u1EBFn 10 cmH2O v\xE0 FiO2 80-100% n\u1EBFu kh\xF4ng c\u1EA3i thi\u1EC7n.",
        "Furosemide 0.5 - 1 mg/kg ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm, c\xF3 th\u1EC3 l\u1EB7p l\u1EA1i sau 1 gi\u1EDD n\u1EBFu t\xECnh tr\u1EA1ng huy\u1EBFt \u0111\u1ED9ng cho ph\xE9p (Huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh).",
        "Dobutamin 5 - 10 \xB5g/kg/ph\xFAt truy\u1EC1n t\u0129nh m\u1EA1ch \u0111\u1EC3 t\u0103ng co b\xF3p c\u01A1 tim, gi\u1EA3m \xE1p l\u1EF1c mao m\u1EA1ch ph\u1ED5i b\xEDt.",
        "Ch\u1ECDc h\xFAt - d\u1EABn l\u01B0u m\xE0ng b\u1EE5ng gi\u1EA3i \xE1p khi: Suy h\xF4 h\u1EA5p th\u1EA5t b\u1EA1i v\u1EDBi NCPAP + tr\xE0n d\u1ECBch m\xE0ng b\u1EE5ng l\u01B0\u1EE3ng nhi\u1EC1u ch\xE8n \xE9p c\u01A1 ho\xE0nh v\xE0 \xE1p l\u1EF1c \u1ED5 b\u1EE5ng (\xE1p l\u1EF1c b\xE0ng quang) > 27 cmH2O.",
        "Ch\u1ECDc h\xFAt m\xE0ng ph\u1ED5i gi\u1EA3i \xE1p: Khi tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i l\u01B0\u1EE3ng nhi\u1EC1u m\u1EDD > 1/2 ph\u1EBF tr\u01B0\u1EDDng ch\xE8n \xE9p ph\u1ED5i g\xE2y suy h\xF4 h\u1EA5p n\u1EB7ng (l\u01B0u \xFD ch\u1EC9nh \u0111\xF4ng m\xE1u tr\u01B0\u1EDBc ch\u1ECDc)."
      ],
      monitoringSteps: [
        "SpO2 li\xEAn t\u1EE5c, kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch \u0111\xE1nh gi\xE1 PaO2/FiO2 (ARDS).",
        "X-quang ng\u1EF1c th\u1EB3ng t\u1EA1i gi\u01B0\u1EDDng \u0111\xE1nh gi\xE1 ph\xF9 ph\u1ED5i m\u1EDD h\xECnh c\xE1nh b\u01B0\u1EDBm / tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i.",
        "Theo d\xF5i l\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u m\u1ED7i 30 - 60 ph\xFAt sau d\xF9ng Furosemide.",
        "\u0110o \xE1p l\u1EF1c b\xE0ng quang qua sonde ti\u1EC3u gi\xE1n ti\u1EBFp \u0111o \xE1p l\u1EF1c \u1ED5 b\u1EE5ng."
      ],
      precautions: [
        "Kh\xF4ng d\xF9ng Furosemide khi huy\u1EBFt \xE1p c\xF2n t\u1EE5t ho\u1EB7c b\u1EC7nh nh\xE2n c\xF2n \u0111ang s\u1ED1c gi\u1EA3m th\u1EC3 t\xEDch ch\u01B0a ra s\u1ED1c.",
        "Trong giai \u0111o\u1EA1n t\xE1i h\u1EA5p thu (N6 - N7), Hct th\u01B0\u1EDDng b\u1ECB pha lo\xE3ng gi\u1EA3m sinh l\xFD; kh\xF4ng nh\u1EA7m l\u1EABn v\u1EDBi m\u1EA5t m\xE1u n\u1EBFu chi \u1EA5m, m\u1EA1ch ch\u1EADm r\xF5, HA b\xECnh th\u01B0\u1EDDng."
      ],
      appendixRef: "Ph\u1EE5 l\u1EE5c 7, 20 & Trang 21, 26-28 Q\u0110 2760"
    },
    // 5. Biến chứng Tổn thương gan nặng & Suy gan cấp (Phụ lục 26)
    acute_liver_failure: {
      id: "acute_liver_failure",
      code: "ACUTE_LIVER_FAILURE",
      name: "Bi\u1EBFn Ch\u1EE9ng T\u1ED5n Th\u01B0\u01A1ng Gan N\u1EB7ng & Suy Gan C\u1EA5p (Ph\u1EE5 L\u1EE5c 26)",
      tag: "Ph\xE1c \u0110\u1ED3 NAC & L\u1ECDc M\xE1u",
      badgeClass: "danger",
      triggerCriteria: "AST ho\u1EB7c ALT \u2265 1000 U/L, ho\u1EB7c k\xE8m b\u1EC7nh n\xE3o gan \u0111\u1ED9 I-IV, INR \u2265 1.5, ho\u1EB7c MELD score \u2265 15.",
      mechanism: "Vi r\xFAt Dengue t\u1EA5n c\xF4ng tr\u1EF1c ti\u1EBFp t\u1EBF b\xE0o gan v\xE0 ph\u1EA3n \u1EE9ng mi\u1EC5n d\u1ECBch vi\xEAm cytokine b\xE3o h\xF2a g\xE2y ho\u1EA1i t\u1EED nhu m\xF4 gan di\u1EC7n r\u1ED9ng, k\xE8m thi\u1EBFu m\xE1u c\u1EE5c b\u1ED9 trong s\u1ED1c k\xE9o d\xE0i.",
      primaryAction: "TUY\u1EC6T \u0110\u1ED0I TR\xC1NH D\xD9NG RINGER LACTATE V\xC0 PARACETAMOL. D\xF9ng dung d\u1ECBch NaCl 0.9% ho\u1EB7c Ringer Acetate. Kh\u1EDFi \u0111\u1ED9ng ph\xE1c \u0111\u1ED3 truy\u1EC1n N-Acetylcysteine (NAC) 4 pha.",
      keyOrders: [
        "Ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh tuy\u1EC7t \u0111\u1ED1i: Ringer Lactate (gan suy kh\xF4ng chuy\u1EC3n h\xF3a \u0111\u01B0\u1EE3c lactate g\xE2y toan lactic n\u1EB7ng) v\xE0 Paracetamol.",
        "D\u1ECBch thay th\u1EBF: NaCl 0.9% ho\u1EB7c Ringer Acetate, Dextrosaline. H\u1EA1n ch\u1EBF t\u1ED1i \u0111a d\xF9ng HES.",
        "Ph\xE1c \u0111\u1ED3 N-Acetylcysteine (NAC) truy\u1EC1n t\u0129nh m\u1EA1ch:",
        "  \u2022 Pha 1 (T\u1EA5n c\xF4ng): 150 mg/kg truy\u1EC1n trong 1 gi\u1EDD (pha Glucose 5% 200ml).",
        "  \u2022 Pha 2: 50 mg/kg truy\u1EC1n trong 4 gi\u1EDD ti\u1EBFp theo (pha Glucose 5% 500ml).",
        "  \u2022 Pha 3: 100 mg/kg truy\u1EC1n trong 16 gi\u1EDD ti\u1EBFp theo (pha Glucose 5% 1000ml).",
        "  \u2022 Pha 4: Duy tr\xEC 6.25 mg/kg/gi\u1EDD li\xEAn t\u1EE5c trong 48 - 72 gi\u1EDD.",
        "\u0110i\u1EC1u tr\u1ECB b\u1EC7nh n\xE3o gan: Lactulose 15 - 30ml u\u1ED1ng ho\u1EB7c th\u1EE5t th\xE1o; Kh\xE1ng sinh Metronidazol 500mg q8h ho\u1EB7c Rifaximin.",
        "Vitamin K1 1 mg/kg TM ch\u1EADm (t\u1ED1i \u0111a 20 mg/ng\xE0y). Truy\u1EC1n huy\u1EBFt t\u01B0\u01A1ng \u0111\xF4ng l\u1EA1nh n\u1EBFu c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u / ch\u1EA3y m\xE1u.",
        "Xem x\xE9t Thay huy\u1EBFt t\u01B0\u01A1ng (TPE) th\u1EC3 t\xEDch cao v\xE0 L\u1ECDc m\xE1u li\xEAn t\u1EE5c (CVVHDF) khi th\u1EA5t b\u1EA1i \u0111i\u1EC1u tr\u1ECB n\u1ED9i sau 24 - 48 gi\u1EDD ho\u1EB7c c\xF3 k\xE8m t\u1ED5n th\u01B0\u01A1ng th\u1EADn c\u1EA5p, Bilirubin \u2265 200 \xB5mol/L, INR \u2265 2.5, NH3 \u2265 150 mmol/L, Lactate \u2265 5."
      ],
      monitoringSteps: [
        "\u0110\xF4ng m\xE1u to\xE0n b\u1ED9 (PT, INR, aPTT, Fibrinogen), men gan, Bilirubin, Amoniac m\xE1u (NH3), Lactate m\u1ED7i 6 - 12 gi\u1EDD.",
        "\u0110\u01B0\u1EDDng huy\u1EBFt mao m\u1EA1ch m\u1ED7i 2 - 4 gi\u1EDD (nguy c\u01A1 h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt nghi\xEAm tr\u1ECDng do m\u1EA5t d\u1EF1 tr\u1EEF glycogen).",
        "Kh\xE1m tri gi\xE1c \u0111\u1ECBnh k\u1EF3 ph\xE1t hi\u1EC7n d\u1EA5u hi\u1EC7u ph\xF9 n\xE3o v\xE0 t\u0103ng \xE1p l\u1EF1c n\u1ED9i s\u1ECD."
      ],
      precautions: [
        "L\u01B0u \xFD nguy c\u01A1 ph\u1EA3n \u1EE9ng ph\u1EA3n v\u1EC7 khi ti\xEAm truy\u1EC1n N-Acetylcysteine; kh\xF4ng d\xF9ng cho b\u1EC7nh nh\xE2n thi\u1EBFu men G6PD.",
        "H\u1EA1n ch\u1EBF d\u1ECBch truy\u1EC1n 2/3 - 3/4 nhu c\u1EA7u c\u01A1 b\u1EA3n khi kh\xF4ng c\xF2n s\u1ED1c \u0111\u1EC3 tr\xE1nh ph\xF9 n\xE3o v\xE0 suy tim."
      ],
      appendixRef: "Ph\u1EE5 l\u1EE5c 26 & Trang 24-25, 30-31 Q\u0110 2760"
    },
    // 6. Sốt xuất huyết Thể Não & Tăng Áp Lực Nội Sọ
    encephalopathy_icp: {
      id: "encephalopathy_icp",
      code: "ENCEPHALOPATHY_ICP",
      name: "S\u1ED1t Xu\u1EA5t Huy\u1EBFt Th\u1EC3 N\xE3o & T\u0103ng \xC1p L\u1EF1c N\u1ED9i S\u1ECD",
      tag: "Ch\u1ED1ng Ph\xF9 N\xE3o & Co Gi\u1EADt",
      badgeClass: "danger",
      triggerCriteria: "R\u1ED1i lo\u1EA1n tri gi\xE1c (GCS gi\u1EA3m), co gi\u1EADt, d\u1EA5u th\u1EA7n kinh khu tr\xFA, tam ch\u1EE9ng Cushing (m\u1EA1ch ch\u1EADm, HA cao, th\u1EDF b\u1EA5t th\u01B0\u1EDDng), ph\xF9 gai th\u1ECB.",
      mechanism: "Ph\xF9 n\xE3o th\u1EE9 ph\xE1t do t\u0103ng t\xEDnh th\u1EA5m th\xE0nh m\u1EA1ch n\xE3o, \u0111\u1ED9c t\u1ED1 th\u1EA7n kinh c\u1EE7a suy gan, toan chuy\u1EC3n h\xF3a n\u1EB7ng, xu\u1EA5t huy\u1EBFt vi m\u1EA1ch n\xE3o ho\u1EB7c vi\xEAm n\xE3o Dengue.",
      primaryAction: "N\u1EB1m \u0111\u1EA7u cao 30\xB0, th\u1EDF oxy ho\u1EB7c \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y t\u0103ng th\xF4ng kh\xED (m\u1EE5c ti\xEAu PaCO2 30-35 mmHg), ch\u1ED1ng ph\xF9 n\xE3o b\u1EB1ng Mannitol 20% v\xE0 NaCl 3%, c\u1EAFt c\u01A1n co gi\u1EADt.",
      keyOrders: [
        "T\u01B0 th\u1EBF: N\u1EB1m \u0111\u1EA7u cao 30\xB0 ch\xEDnh gi\u1EEFa c\u1ED5 (kh\xF4ng g\u1EADp ho\u1EB7c nghi\xEAng c\u1ED5 l\xE0m ngh\u1EBDn h\u1ED3i l\u01B0u t\u0129nh m\u1EA1ch c\u1EA3nh).",
        "Ch\u1ED1ng ph\xF9 n\xE3o: Mannitol 20% li\u1EC1u 0.5 g/kg truy\u1EC1n t\u0129nh m\u1EA1ch nhanh trong 30 ph\xFAt, l\u1EB7p l\u1EA1i m\u1ED7i 8 gi\u1EDD.",
        "C\xF3 th\u1EC3 ph\u1ED1i h\u1EE3p xen k\u1EBD Natri Clorua 3% li\u1EC1u 4 ml/kg truy\u1EC1n nhanh 30 ph\xFAt, l\u1EB7p l\u1EA1i m\u1ED7i 8 gi\u1EDD.",
        "C\u1EAFt c\u01A1n co gi\u1EADt: Diazepam 0.2 mg/kg ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm (ho\u1EB7c b\u01A1m h\u1EADu m\xF4n 0.5 mg/kg). L\u1EB7p l\u1EA1i li\u1EC1u 2 sau 10 ph\xFAt (t\u1ED1i \u0111a 3 li\u1EC1u). N\u1EBFu th\u1EA5t b\u1EA1i: Phenobarbital 10 - 20 mg/kg truy\u1EC1n TM trong 15 - 30 ph\xFAt.",
        "\u0110\u1EB7t n\u1ED9i kh\xED qu\u1EA3n b\u1EA3o v\u1EC7 \u0111\u01B0\u1EDDng th\u1EDF v\xE0 th\u1EDF m\xE1y ki\u1EC3m so\xE1t \xE1p l\u1EF1c: T\u0103ng th\xF4ng kh\xED gi\u1EEF PaCO2 t\u1EEB 30 - 35 mmHg.",
        "\u0110i\u1EC1u tr\u1ECB h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt kh\u1EA9n c\u1EA5p: Dextrose 30% 1 - 2 ml/kg TM ch\u1EADm (tr\u1EBB < 1 tu\u1ED5i: Dextrose 10% 2 ml/kg)."
      ],
      monitoringSteps: [
        "\u0110\xE1nh gi\xE1 ph\u1EA3n x\u1EA1 \u0111\u1ED3ng t\u1EED, thang \u0111i\u1EC3m Glasgow (ho\u1EB7c thang \u0111i\u1EC3m AVPU) m\u1ED7i 1 - 2 gi\u1EDD.",
        "Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch ki\u1EC3m so\xE1t PaCO2 v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan.",
        "Theo d\xF5i \u0111i\u1EC7n gi\u1EA3i \u0111\u1ED3 m\xE1u (Na+, K+, Cl-) v\xE0 \xE1p l\u1EF1c th\u1EA9m th\u1EA5u m\xE1u (Osmolality)."
      ],
      precautions: [
        "Kh\xF4ng d\xF9ng Mannitol khi b\u1EC7nh nh\xE2n \u0111ang t\u1EE5t huy\u1EBFt \xE1p ho\u1EB7c s\u1ED1c ch\u01B0a \u1ED5n \u0111\u1ECBnh.",
        "Tr\xE1nh h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt v\xE0 h\u1EA1 Natri m\xE1u v\xEC l\xE0m n\u1EB7ng th\xEAm t\xECnh tr\u1EA1ng ph\xF9 n\xE3o."
      ],
      appendixRef: "Trang 25-26, 31-32 Q\u0110 2760"
    }
  };
  var DENGUE_NON_RESPONSE_SCENARIOS = {
    ...DENGUE_REFRACTORY_SCENARIOS,
    cpt_escalation: DENGUE_REFRACTORY_SCENARIOS.hct_high_cpt
  };

  // src/content/docspace/public/cdss/dengue/dengue-engine.ts
  function classifyAgeGroup(ageYears) {
    if (ageYears >= 16) return "adult";
    if (ageYears >= 13) return "adolescent";
    return "child";
  }
  function calculateWeightAdjustment(ageYears, gender, actualWeightKg, heightCm) {
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
        let ibw = stdWeight;
        if (heightCm && heightCm > 100) {
          if (heightCm >= 152.4) {
            ibw = gender === "male" ? 50 + 0.91 * (heightCm - 152.4) : 45.5 + 0.91 * (heightCm - 152.4);
          } else {
            ibw = 22 * Math.pow(heightCm / 100, 2);
          }
          ibw = Math.max(35, Math.round(ibw * 10) / 10);
        }
        const adjBw = Math.round((ibw + 0.4 * (actualWeightKg - ibw)) * 10) / 10;
        adjustedWeightKg = Math.max(ibw, Math.min(actualWeightKg, adjBw));
        formulaNote = `Ng\u01B0\u1EDDi l\u1EDBn b\xE9o ph\xEC: C\xE2n n\u1EB7ng t\xEDnh d\u1ECBch hi\u1EC7u ch\u1EC9nh AdjBW = ${adjustedWeightKg} kg (IBW: ${ibw} kg, TBW: ${actualWeightKg} kg)`;
        warningText = `Ng\u01B0\u1EDDi l\u1EDBn th\u1EC3 tr\u1ECDng l\u1EDBn (${actualWeightKg} kg): D\xF9ng c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh AdjBW ${adjustedWeightKg} kg \u0111\u1EC3 t\xEDnh d\u1ECBch. C\u1EA7n gi\xE1m s\xE1t ch\u1EB7t ch\u1EBD CVP, SpO2 v\xE0 ran \u0111\xE1y ph\u1ED5i khi b\xF9 d\u1ECBch.`;
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
      const isPediatric = ageGroup === "child";
      const dropsPerMin = isPediatric ? Math.round(rate * effectiveWeightKg) : Math.round(rate * effectiveWeightKg / 3);
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
      calculationFormula: "T\u1ED5ng li\u1EC1u Dopamin (mg) = 3 \xD7 C\xE2n n\u1EB7ng (kg) pha \u0111\u1EE7 50ml G5%",
      totalMg: dopaminTotalMg,
      diluentSolution: "Glucose 5% ho\u1EB7c NaCl 0.9%",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "5 - 10 \xB5g/kg/ph\xFAt (t\u1ED1i \u0111a 20 \xB5g/kg/ph\xFAt)",
      recommendedPumpRateMlH: "5 - 10 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "Thu\u1ED1c v\u1EADn m\u1EA1ch ch\u1ECDn l\u1EF1a \u0111\u1EA7u ti\xEAn khi s\u1ED1c k\xE9o d\xE0i, s\u1ED1c tr\u01A1 d\u1ECBch k\xE8m CVP > 10 cmH2O ho\u1EB7c %PPV/SVV < 15%.",
      precautions: "Kh\xF4ng pha chung v\u1EDBi dung d\u1ECBch ki\u1EC1m (Natri Bicarbonat). Theo d\xF5i li\xEAn t\u1EE5c nh\u1ECBp tim tr\xEAn monitor, gi\u1EA3m li\u1EC1u khi lo\u1EA1n nh\u1ECBp nhanh."
    };
    const noradrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
    const noradrenalin = {
      drugName: "Noradrenalin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Noradrenalin (mg) = 0.3 \xD7 C\xE2n n\u1EB7ng (kg) pha \u0111\u1EE7 50ml G5%",
      totalMg: noradrenalinTotalMg,
      diluentSolution: "Glucose 5% v\u1EEBa \u0111\u1EE7 50ml",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 0.1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "0.05 - 1.0 \xB5g/kg/ph\xFAt (tr\u1EBB em: 0.05 - 0.3 \xB5g/kg/ph\xFAt)",
      recommendedPumpRateMlH: "0.5 - 5 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml (ch\u1EC9nh theo MAP \u0111\xEDch)",
      clinicalIndications: "Ch\u1EC9 \u0111\u1ECBnh khi s\u1ED1c SXHD c\xF3 gi\u1EA3m kh\xE1ng l\u1EF1c m\u1EA1ch h\u1EC7 th\u1ED1ng (HA t\xE2m tr\u01B0\u01A1ng t\u1EE5t, s\u1ED1c \u1EA5m) ho\u1EB7c th\u1EA5t b\u1EA1i v\u1EDBi Dopamin.",
      precautions: "B\u1EAFt bu\u1ED9c truy\u1EC1n qua t\u0129nh m\u1EA1ch l\u1EDBn ho\u1EB7c catheter t\u0129nh m\u1EA1ch trung t\xE2m. Nguy c\u01A1 ho\u1EA1i t\u1EED m\xF4 n\u1EBFu tho\xE1t m\u1EA1ch."
    };
    const dobutaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
    const dobutamin = {
      drugName: "Dobutamin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Dobutamin (mg) = 3 \xD7 C\xE2n n\u1EB7ng (kg) pha \u0111\u1EE7 50ml G5%",
      totalMg: dobutaminTotalMg,
      diluentSolution: "Glucose 5% ho\u1EB7c NaCl 0.9%",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "3 - 10 \xB5g/kg/ph\xFAt (t\u1ED1i \u0111a 15 \xB5g/kg/ph\xFAt)",
      recommendedPumpRateMlH: "3 - 10 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "Ch\u1EC9 \u0111\u1ECBnh khi suy tim c\u1EA5p do qu\xE1 t\u1EA3i d\u1ECBch, ph\xF9 ph\u1ED5i c\u1EA5p ho\u1EB7c s\u1ED1c tim tr\u01A1 Dopamin k\xE8m CVP > 15 cmH2O.",
      precautions: "C\xF3 th\u1EC3 g\xE2y t\u1EE5t huy\u1EBFt \xE1p n\u1EBFu ch\u01B0a b\xF9 \u0111\u1EE7 th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n. Theo d\xF5i SpO2 v\xE0 nghe tim ph\u1ED5i."
    };
    const adrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
    const adrenalin = {
      drugName: "Adrenalin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Adrenalin (mg) = 0.3 \xD7 C\xE2n n\u1EB7ng (kg) pha \u0111\u1EE7 50ml G5%",
      totalMg: adrenalinTotalMg,
      diluentSolution: "Glucose 5% v\u1EEBa \u0111\u1EE7 50ml",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 0.1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "0.05 - 0.3 \xB5g/kg/ph\xFAt",
      recommendedPumpRateMlH: "0.5 - 3 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "Ch\u1EC9 \u0111\u1ECBnh khi s\u1ED1c SXHD tr\u01A1 Dopamin v\xE0 Dobutamin k\xE8m gi\u1EA3m s\u1EE9c co b\xF3p c\u01A1 tim, nh\u1ECBp ch\u1EADm ho\u1EB7c ng\u1EEBng tu\u1EA7n ho\xE0n.",
      precautions: "Theo d\xF5i monitor li\xEAn t\u1EE5c; nguy c\u01A1 t\u0103ng \u0111\u01B0\u1EDDng huy\u1EBFt, toan lactic v\xE0 lo\u1EA1n nh\u1ECBp nhanh th\u1EA5t."
    };
    return { dopamin, noradrenalin, dobutamin, adrenalin };
  }
  function calculateBloodProducts(patient, effectiveWeightKg) {
    const isAdult = patient.ageYears >= 16;
    const hclMinMl = Math.round(5 * effectiveWeightKg);
    const hclMaxMl = Math.round(10 * effectiveWeightKg);
    const wbMinMl = Math.round(10 * effectiveWeightKg);
    const wbMaxMl = Math.round(20 * effectiveWeightKg);
    const ffpMinMl = Math.round(10 * effectiveWeightKg);
    const ffpMaxMl = Math.round(20 * effectiveWeightKg);
    const cryoBags = Math.max(1, Math.ceil(effectiveWeightKg / 6));
    const pltPacks = Math.max(1, Math.ceil(effectiveWeightKg / 5));
    const pltApheresis = Math.max(1, Math.ceil(effectiveWeightKg / 10));
    const items = [
      {
        id: "hcl",
        productName: "Kh\u1ED1i H\u1ED3ng C\u1EA7u L\u1EAFng (HCL)",
        indication: "S\u1ED1c kh\xF4ng c\u1EA3i thi\u1EC7n sau b\xF9 d\u1ECBch 40-60 ml/kg k\xE8m Hct < 35% ho\u1EB7c Hct gi\u1EA3m nhanh > 20% so v\u1EDBi ban \u0111\u1EA7u, ho\u1EB7c xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a / ph\u1EE7 t\u1EA1ng \u1ED3 \u1EA1t.",
        doseFormula: "5 - 10 ml/kg truy\u1EC1n t\u0129nh m\u1EA1ch trong 1 - 2 gi\u1EDD",
        calculatedDose: `${hclMinMl} - ${hclMaxMl} ml (t\u01B0\u01A1ng \u0111\u01B0\u01A1ng 1 - 2 \u0111\u01A1n v\u1ECB HCL)`,
        thresholdMet: !!(patient.currentHctPercent && patient.currentHctPercent <= 35) || !!patient.massiveBleeding,
        targetClinical: "Duy tr\xEC Hct m\u1EE5c ti\xEAu t\u1EEB 35% \u0111\u1EBFn 40%, c\u1EA3i thi\u1EC7n huy\u1EBFt \u0111\u1ED9ng, chi \u1EA5m, m\u1EA1ch ch\u1EADm l\u1EA1i.",
        precautions: "Song song truy\u1EC1n Cao ph\xE2n t\u1EED 10 ml/kg/h \u0111\u1EC3 n\xE2ng huy\u1EBFt \xE1p trong l\xFAc ch\u1EDD m\xE1u. L\xE0m ph\u1EA3n \u1EE9ng ch\xE9o t\u1EA1i gi\u01B0\u1EDDng."
      },
      {
        id: "whole_blood",
        productName: "M\xE1u To\xE0n Ph\u1EA7n (L\u1EA5y < 7 ng\xE0y)",
        indication: "Ch\u1EC9 \u0111\u1ECBnh khi m\u1EA5t m\xE1u c\u1EA5p kh\u1ED1i l\u01B0\u1EE3ng l\u1EDBn ho\u1EB7c khi kh\xF4ng c\xF3 s\u1EB5n h\u1ED3ng c\u1EA7u l\u1EAFng.",
        doseFormula: "10 - 20 ml/kg truy\u1EC1n t\u0129nh m\u1EA1ch trong 1 - 2 gi\u1EDD",
        calculatedDose: `${wbMinMl} - ${wbMaxMl} ml`,
        thresholdMet: !!patient.massiveBleeding,
        targetClinical: "B\xF9 th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n v\xE0 ph\u1EE5c h\u1ED3i kh\u1EA3 n\u0103ng mang oxy.",
        precautions: "\u01AFu ti\xEAn d\xF9ng h\u1ED3ng c\u1EA7u l\u1EAFng k\u1EBFt h\u1EE3p d\u1ECBch tinh th\u1EC3/cao ph\xE2n t\u1EED \u0111\u1EC3 tr\xE1nh qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n."
      },
      {
        id: "ffp",
        productName: "Huy\u1EBFt T\u01B0\u01A1ng T\u01B0\u01A1i \u0110\xF4ng L\u1EA1nh (FFP)",
        indication: "R\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u n\u1EB7ng (PT hay aPTT > 1.5 l\u1EA7n ch\u1EE9ng ho\u1EB7c INR > 1.5) k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng, ho\u1EB7c chu\u1EA9n b\u1ECB th\u1EE7 thu\u1EADt x\xE2m l\u1EA5n, ho\u1EB7c truy\u1EC1n m\xE1u kh\u1ED1i l\u01B0\u1EE3ng l\u1EDBn.",
        doseFormula: "10 - 20 ml/kg truy\u1EC1n t\u0129nh m\u1EA1ch trong 2 - 4 gi\u1EDD",
        calculatedDose: `${ffpMinMl} - ${ffpMaxMl} ml (kho\u1EA3ng ${Math.ceil(ffpMinMl / 200)} - ${Math.ceil(ffpMaxMl / 200)} t\xFAi 200ml)`,
        thresholdMet: !!(patient.inrValue && patient.inrValue > 1.5),
        targetClinical: "M\u1EE5c ti\xEAu \u0111\u1EA1t PT/PTc < 1.5, ph\u1EE5c h\u1ED3i c\xE1c y\u1EBFu t\u1ED1 \u0111\xF4ng m\xE1u huy\u1EBFt t\u01B0\u01A1ng.",
        precautions: "R\xE3 \u0111\xF4ng \u0111\xFAng k\u1EF9 thu\u1EADt \u1EDF 37\xB0C v\xE0 d\xF9ng ngay trong v\xF2ng 4 gi\u1EDD."
      },
      {
        id: "cryo",
        productName: "K\u1EBFt T\u1EE7a L\u1EA1nh (Cryoprecipitate)",
        indication: "Xu\u1EA5t huy\u1EBFt n\u1EB7ng k\xE8m Fibrinogen m\xE1u < 1.0 g/L.",
        doseFormula: "1 t\xFAi / 6 kg c\xE2n n\u1EB7ng (m\u1ED7i t\xFAi ch\u1EE9a ~150 mg Fibrinogen)",
        calculatedDose: `${cryoBags} t\xFAi k\u1EBFt t\u1EE7a l\u1EA1nh`,
        thresholdMet: !!(patient.fibrinogenGL && patient.fibrinogenGL < 1),
        targetClinical: "M\u1EE5c ti\xEAu \u0111\u1EA1t Fibrinogen > 1.0 g/L.",
        precautions: "Truy\u1EC1n nhanh ngay sau khi r\xE3 \u0111\xF4ng."
      },
      {
        id: "platelets",
        productName: "Kh\u1ED1i Ti\u1EC3u C\u1EA7u (Ti\u1EC3u c\u1EA7u \u0111\u1EADm \u0111\u1EB7c / G\u1EA1n t\xE1ch)",
        indication: "Ti\u1EC3u c\u1EA7u < 50.000/mm\xB3 k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng ho\u1EB7c chu\u1EA9n b\u1ECB ch\u1ECDc m\xE0ng ph\u1ED5i/b\u1EE5ng; ho\u1EB7c Ti\u1EC3u c\u1EA7u < 5.000/mm\xB3 d\xF9 ch\u01B0a ch\u1EA3y m\xE1u.",
        doseFormula: "1 \u0111\u01A1n v\u1ECB \u0111\u1EADm \u0111\u1EB7c / 5 kg ho\u1EB7c 1 \u0111\u01A1n v\u1ECB g\u1EA1n t\xE1ch (chi\u1EBFt t\xE1ch) / 10 kg",
        calculatedDose: `${pltPacks} \u0111\u01A1n v\u1ECB \u0111\u1EADm \u0111\u1EB7c (ho\u1EB7c ${pltApheresis} kh\u1ED1i ti\u1EC3u c\u1EA7u chi\u1EBFt t\xE1ch)`,
        thresholdMet: !!(patient.plateletsCount && (patient.plateletsCount < 5e3 || patient.massiveBleeding && patient.plateletsCount < 5e4)),
        targetClinical: "M\u1EE5c ti\xEAu TC > 50.000/mm\xB3 khi \u0111ang xu\u1EA5t huy\u1EBFt n\u1EB7ng; TC > 30.000/mm\xB3 khi l\xE0m th\u1EE7 thu\u1EADt.",
        precautions: "Kh\xF4ng truy\u1EC1n ti\u1EC3u c\u1EA7u d\u1EF1 ph\xF2ng khi ch\u01B0a c\xF3 xu\u1EA5t huy\u1EBFt n\u1EB7ng (tr\u1EEB khi TC < 5.000/mm\xB3). Kh\xF4ng d\xF9ng m\xE0ng l\u1ECDc b\u1EA1ch c\u1EA7u chu\u1EA9n cho ti\u1EC3u c\u1EA7u."
      },
      {
        id: "ppi_omeprazole",
        productName: "Thu\u1ED1c \u1EE8c Ch\u1EBF B\u01A1m Proton (Omeprazole / Pantoprazole)",
        indication: "Nghi ng\u1EDD ho\u1EB7c c\xF3 xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a tr\xEAn, lo\xE9t d\u1EA1 d\xE0y - t\xE1 tr\xE0ng ho\u1EB7c s\u1ED1c SXHD k\xE9o d\xE0i.",
        doseFormula: isAdult ? "Bolus 80 mg TM, sau \u0111\xF3 40 mg m\u1ED7i 12 gi\u1EDD x 3 ng\xE0y" : "1 mg/kg/ng\xE0y ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm",
        calculatedDose: isAdult ? "80 mg TM bolus, sau \u0111\xF3 40 mg q12h" : `${Math.round(1 * effectiveWeightKg)} mg ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm`,
        thresholdMet: true,
        targetClinical: "N\xE2ng pH d\u1EA1 d\xE0y > 6.0 gi\xFAp \u1ED5n \u0111\u1ECBnh c\u1EE5c m\xE1u \u0111\xF4ng.",
        precautions: "Kh\xF4ng \u0111\u1EB7t sonde d\u1EA1 d\xE0y qua \u0111\u01B0\u1EDDng m\u0169i; n\u1EBFu c\u1EA7n ch\u1EC9 \u0111\u1EB7t qua \u0111\u01B0\u1EDDng MI\u1EC6NG."
      },
      {
        id: "vitamin_k1",
        productName: "Vitamin K1 (Phytomenadione)",
        indication: "S\u1ED1t xu\u1EA5t huy\u1EBFt Dengue c\xF3 t\u1ED5n th\u01B0\u01A1ng gan n\u1EB7ng, suy gan c\u1EA5p ho\u1EB7c k\xE9o d\xE0i th\u1EDDi gian \u0111\xF4ng m\xE1u.",
        doseFormula: "1 mg/kg ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm, t\u1ED1i \u0111a 20 mg/ng\xE0y",
        calculatedDose: `${Math.min(20, Math.round(1 * effectiveWeightKg))} mg t\u0129nh m\u1EA1ch ch\u1EADm`,
        thresholdMet: !!(patient.liverEnzymesAST_ALT && patient.liverEnzymesAST_ALT >= 400),
        targetClinical: "H\u1ED7 tr\u1EE3 t\u1ED5ng h\u1EE3p c\xE1c y\u1EBFu t\u1ED1 \u0111\xF4ng m\xE1u ph\u1EE5 thu\u1ED9c vitamin K t\u1EA1i gan (II, VII, IX, X).",
        precautions: "Ti\xEAm t\u0129nh m\u1EA1ch th\u1EADt ch\u1EADm; tr\xE1nh ti\xEAm b\u1EAFp do nguy c\u01A1 t\u1EE5 m\xE1u l\u1EDBn."
      }
    ];
    return items;
  }
  function calculateAlbuminDose(effectiveWeightKg, currentAlbuminGDl = 2, targetAlbuminGDl = 3.5) {
    const diff = Math.max(0, targetAlbuminGDl - currentAlbuminGDl);
    const albuminGrams = diff > 0 ? Math.round(diff * 0.8 * effectiveWeightKg * 10) / 10 : 0;
    const vials20Percent50ml = diff > 0 ? Math.max(1, Math.ceil(albuminGrams / 10)) : 0;
    const minRateMlH = Math.round(5 * effectiveWeightKg);
    const maxRateMlH = Math.round(20 * effectiveWeightKg);
    return {
      albuminGrams,
      vials20Percent50ml,
      preparation5Percent: `Pha Albumin 5%: 1 l\u1ECD Albumin 20% 50ml + 150ml NaCl 0.9% = 200ml Albumin 5% (C\u1EA7n ${vials20Percent50ml} l\u1ECD)`,
      preparation10Percent: `Pha Albumin 10%: 1 l\u1ECD Albumin 20% 50ml + 50ml NaCl 0.9% = 100ml Albumin 10% (C\u1EA7n ${vials20Percent50ml} l\u1ECD)`,
      infusionRateMlH: `${minRateMlH} - ${maxRateMlH} ml/gi\u1EDD (T\u1ED5ng t\u1ED1c \u0111\u1ED9 d\u1ECBch g\u1ED3m CPT v\xE0 Albumin \u2264 20 ml/kg/h)`,
      indicationNotes: "Ch\u1EC9 \u0111\u1ECBnh khi t\u1ED5ng CPT \u2265 60 ml/kg v\xE0 \u0111ang ch\u1ED1ng s\u1ED1c CPT \u2265 5-10 ml/kg/h k\xE8m Albumin < 2.5 g/dL ho\u1EB7c b\u1EC7nh nh\xE2n suy gan, suy th\u1EADn, ARDS."
    };
  }
  function calculateNACProtocol(patient, effectiveWeightKg) {
    const astAlt = patient.liverEnzymesAST_ALT || 0;
    const isSevere = astAlt >= 1e3;
    const isModerate = astAlt >= 400 && astAlt < 1e3;
    const p1Mg = Math.round(150 * effectiveWeightKg);
    const p2Mg = Math.round(50 * effectiveWeightKg);
    const p3Mg = Math.round(100 * effectiveWeightKg);
    const p4MgH = Math.round(6.25 * effectiveWeightKg * 10) / 10;
    const phases = [
      {
        phase: 1,
        phaseName: "Pha 1: Li\u1EC1u T\u1EA5n C\xF4ng (Gi\u1EDD 1)",
        doseMgKg: 150,
        infusionTimeHours: 1,
        diluent: "Glucose 5% ho\u1EB7c NaCl 0.9% 200ml",
        totalMg: p1Mg,
        pumpRateMlH: "200 ml/h trong 1 gi\u1EDD"
      },
      {
        phase: 2,
        phaseName: "Pha 2: Duy tr\xEC b\u01B0\u1EDBc 1 (4 gi\u1EDD ti\u1EBFp theo)",
        doseMgKg: 50,
        infusionTimeHours: 4,
        diluent: "Glucose 5% ho\u1EB7c NaCl 0.9% 500ml",
        totalMg: p2Mg,
        pumpRateMlH: "125 ml/h trong 4 gi\u1EDD"
      },
      {
        phase: 3,
        phaseName: "Pha 3: Duy tr\xEC b\u01B0\u1EDBc 2 (16 gi\u1EDD ti\u1EBFp theo)",
        doseMgKg: 100,
        infusionTimeHours: 16,
        diluent: "Glucose 5% ho\u1EB7c NaCl 0.9% 1000ml",
        totalMg: p3Mg,
        pumpRateMlH: "62.5 ml/h trong 16 gi\u1EDD"
      },
      {
        phase: 4,
        phaseName: "Pha 4: Duy tr\xEC li\xEAn t\u1EE5c (48 - 72 gi\u1EDD)",
        doseMgKg: 6.25,
        // mg/kg/h
        infusionTimeHours: 48,
        diluent: "B\u01A1m ti\xEAm \u0111i\u1EC7n ho\u1EB7c chai truy\u1EC1n li\xEAn t\u1EE5c",
        totalMg: Math.round(p4MgH * 48),
        pumpRateMlH: `${p4MgH} mg/gi\u1EDD (ch\u1EC9nh theo n\u1ED3ng \u0111\u1ED9 pha)`
      }
    ];
    return {
      indicated: isSevere || isModerate,
      severityLevel: isSevere ? "acute_liver_failure" : isModerate ? "severe_hepatitis" : "normal",
      astAltVal: astAlt,
      summary: isSevere ? `AST/ALT ${astAlt} U/L: T\u1ED5n th\u01B0\u01A1ng gan c\u1EA5p m\u1EE9c \u0111\u1ED9 N\u1EB7ng / Suy gan c\u1EA5p. B\u1EAFt bu\u1ED9c k\xEDch ho\u1EA1t ph\xE1c \u0111\u1ED3 N-Acetylcysteine t\u0129nh m\u1EA1ch 4 pha v\xE0 TUY\u1EC6T \u0110\u1ED0I TR\xC1NH Ringer Lactate & Paracetamol.` : isModerate ? `AST/ALT ${astAlt} U/L: T\u1ED5n th\u01B0\u01A1ng gan trung b\xECnh. D\xF9ng NaCl 0.9% ho\u1EB7c Ringer Acetate, tr\xE1nh thu\u1ED1c \u0111\u1ED9c gan.` : "Men gan trong gi\u1EDBi h\u1EA1n theo d\xF5i.",
      phases,
      precautions: [
        "Ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh tuy\u1EC7t \u0111\u1ED1i Ringer Lactate: Gan suy kh\xF4ng chuy\u1EC3n h\xF3a \u0111\u01B0\u1EE3c lactate d\u1EABn \u0111\u1EBFn toan lactic m\u1EA5t b\xF9.",
        "C\u1EA5m d\xF9ng Paracetamol; h\u1EA1 nhi\u1EC7t b\u1EB1ng lau m\xE1t n\u01B0\u1EDBc \u1EA5m.",
        "C\u1EA3nh b\xE1o ph\u1EA3n \u1EE9ng ph\u1EA3n v\u1EC7 v\u1EDBi N-Acetylcysteine; ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh \u1EDF b\u1EC7nh nh\xE2n thi\u1EBFu men G6PD.",
        "Xem x\xE9t L\u1ECDc m\xE1u li\xEAn t\u1EE5c (CVVHDF) v\xE0 Thay huy\u1EBFt t\u01B0\u01A1ng (TPE) n\u1EBFu kh\xF4ng c\u1EA3i thi\u1EC7n sau 24 - 48 gi\u1EDD."
      ]
    };
  }
  function calculateABCSChecklist(patient, effectiveWeightKg) {
    const bicarbMl = Math.round(2 * effectiveWeightKg);
    const hclDose = `${Math.round(5 * effectiveWeightKg)} - ${Math.round(10 * effectiveWeightKg)} ml`;
    const calciumMl = Math.min(10, Math.max(0.5, Math.round(0.15 * effectiveWeightKg * 10) / 10));
    const dextroseMl = Math.round(1.5 * effectiveWeightKg);
    return {
      acidosis: {
        title: "A \u2014 Acidosis (Toan H\xF3a M\xE1u Chuy\u1EC3n H\xF3a)",
        criteria: "pH < 7.35 v\xE0/ho\u1EB7c HCO3\u207B < 17 mEq/L (ho\u1EB7c BE < -5)",
        action: `Natri Bicarbonate 4.2% li\u1EC1u 2 ml/kg t\u0129nh m\u1EA1ch ch\u1EADm: Ti\xEAm ${bicarbMl} ml TM ch\u1EADm trong 10-15 ph\xFAt. Kh\xF4ng ti\xEAm c\xF9ng \u0111\u01B0\u1EDDng truy\u1EC1n v\u1EDBi Calci hay Dopamin.`
      },
      bleeding: {
        title: "B \u2014 Bleeding (Xu\u1EA5t Huy\u1EBFt N\u1EB7ng & \u1EA8n)",
        criteria: "Hct < 35% ho\u1EB7c gi\u1EA3m nhanh > 20% k\xE8m s\u1ED1c, ho\u1EB7c xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a / ph\u1EE7 t\u1EA1ng",
        action: `Truy\u1EC1n H\u1ED3ng c\u1EA7u l\u1EAFng 5 - 10 ml/kg (${hclDose}) trong 1-2 gi\u1EDD. Song song truy\u1EC1n CPT 10 ml/kg/h. B\xF9 HT\u0110L n\u1EBFu INR > 1.5, K\u1EBFt t\u1EE7a l\u1EA1nh n\u1EBFu Fibrinogen < 1 g/L.`
      },
      calcium: {
        title: "C \u2014 Calcium (H\u1EA1 Canxi M\xE1u)",
        criteria: "Canxi ion h\xF3a (Ca++) < 1.0 mmol/L",
        action: `Calci Clorua 10% 0.1 - 0.2 ml/kg: L\u1EA5y ${calciumMl} ml Calci Clorua 10% pha lo\xE3ng trong 15 ml Glucose 5% ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm trong 5 - 10 ph\xFAt tr\xEAn monitor.`
      },
      sugar: {
        title: "S \u2014 Sugar (H\u1EA1 \u0110\u01B0\u1EDDng Huy\u1EBFt)",
        criteria: "Glucose m\xE1u < 40 mg/dL (ho\u1EB7c < 2.2 mmol/L)",
        action: patient.ageYears < 1 ? `Dextrose 10% li\u1EC1u 2 ml/kg: Ti\xEAm ${Math.round(2 * effectiveWeightKg)} ml Dextrose 10% TM ch\u1EADm.` : `Dextrose 30% li\u1EC1u 1 - 2 ml/kg: Ti\xEAm ${dextroseMl} ml Dextrose 30% TM ch\u1EADm, sau \u0111\xF3 duy tr\xEC truy\u1EC1n Glucose 5-10%.`
      }
    };
  }
  function calculateBranchDecision(patient, effectiveWeightKg) {
    const isAdult = patient.ageYears >= 16;
    const currentHct = patient.currentHctPercent;
    const baselineHct = patient.baselineHctPercent || (isAdult ? patient.gender === "male" ? 43 : 38 : 38);
    const response = patient.clinicalResponse || "good";
    const isBleedingSuspicion = patient.massiveBleeding || currentHct !== void 0 && (currentHct <= 35 || (baselineHct - currentHct) / baselineHct > 0.2);
    if (isBleedingSuspicion && (patient.severity === "shock" || patient.severity === "severe_shock" || response === "refractory" || response === "worsened")) {
      return {
        branchType: "blood",
        title: "NH\xC1NH X\u1EEC TR\xCD XU\u1EA4T HUY\u1EBET N\u1EB6NG & M\u1EA4T M\xC1U C\u1EA4P (Ph\u1EE5 L\u1EE5c 17)",
        recommendedFluid: "H\u1ED3ng C\u1EA7u L\u1EAFng (5 - 10 ml/kg) + Song song Cao Ph\xE2n T\u1EED 10 ml/kg/h",
        rateMlKgH: 10,
        durationHours: 2,
        reasoning: `B\u1EC7nh nh\xE2n s\u1ED1c kh\xF4ng c\u1EA3i thi\u1EC7n v\u1EDBi Hct t\u1EE5t (${currentHct || "< 35"}%), nghi ng\u1EDD xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a ho\u1EB7c xu\u1EA5t huy\u1EBFt ph\u1EE7 t\u1EA1ng \u1EA9n. Kh\xF4ng th\u1EC3 b\xF9 b\u1EB1ng d\u1ECBch tinh th\u1EC3 \u0111\u01A1n thu\u1EA7n.`,
        warnings: [
          "B\u1EAFt bu\u1ED9c th\u0103m d\xF2 tr\u1EF1c tr\xE0ng, ki\u1EC3m tra d\u1ECBch h\xFAt d\u1EA1 d\xE0y qua \u0111\u01B0\u1EDDng MI\u1EC6NG.",
          "Truy\u1EC1n HCL 5-10 ml/kg k\u1EBFt h\u1EE3p CPT 10 ml/kg/h trong l\xFAc ch\u1EDD m\xE1u.",
          "B\u1ED5 sung Omeprazole 1 mg/kg TM v\xE0 Vitamin K1 n\u1EBFu c\xF3 b\u1EC7nh gan."
        ]
      };
    }
    const isHctHigh = currentHct !== void 0 && currentHct >= 40;
    if ((isHctHigh || response === "refractory") && patient.severity !== "warning_signs") {
      const cptRate = isAdult ? 15 : 20;
      return {
        branchType: "cpt",
        title: "NH\xC1NH CAO PH\xC2N T\u1EEC N\u1EA4C THANG (CPT ESCALATION - Ph\u1EE5 L\u1EE5c 8 & 16)",
        recommendedFluid: "Cao Ph\xE2n T\u1EED: Dextran 40 ho\u1EB7c 6% HES 200 (10 - 20 ml/kg/h)",
        rateMlKgH: cptRate,
        durationHours: 1,
        reasoning: `D\u1ECBch tinh th\u1EC3 kh\xF4ng gi\u1EEF \u0111\u01B0\u1EE3c th\u1EC3 t\xEDch do th\u1EA5t tho\xE1t huy\u1EBFt t\u01B0\u01A1ng li\xEAn t\u1EE5c (Hct ${currentHct || "\u2265 40"}%). C\u1EA7n \xE1p l\u1EF1c keo m\u1EA1nh \u0111\u1EC3 k\xE9o d\u1ECBch v\xE0o l\xF2ng m\u1EA1ch.`,
        warnings: [
          "\u0110o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng sau 1 gi\u1EDD truy\u1EC1n CPT.",
          "Gi\xE1m s\xE1t t\u1ED5ng li\u1EC1u CPT: T\u1ED1i \u0111a 60 ml/kg (tr\xE1nh t\u1ED5n th\u01B0\u01A1ng th\u1EADn c\u1EA5p).",
          "N\u1EBFu sau 2 \u0111\u1EE3t CPT v\u1EABn kh\xF4ng ra s\u1ED1c -> Chuy\u1EC3n sang L\u01B0u \u0111\u1ED3 S\u1ED1c Th\u1EA5t B\u1EA1i B\xF9 D\u1ECBch (Ph\u1EE5 l\u1EE5c 18)."
        ]
      };
    }
    if (response === "refractory" || response === "worsened") {
      return {
        branchType: "refractory_shock",
        title: "L\u01AFU \u0110\u1ED2 S\u1ED0C SXHD KH\xD4NG \u0110\xC1P \u1EE8NG D\u1ECACH TRUY\u1EC0N (Ph\u1EE5 L\u1EE5c 18)",
        recommendedFluid: "\u0110o CVP & HA\u0110MXL + Test CPT 5 ml/kg/30ph + B\xF9 Albumin & V\u1EADn M\u1EA1ch",
        rateMlKgH: 5,
        durationHours: 0.5,
        reasoning: "S\u1ED1c tr\u01A1 v\u1EDBi b\xF9 d\u1ECBch th\xF4ng th\u01B0\u1EDDng. C\u1EA7n ph\u1ED1i h\u1EE3p \u0111o CVP \u0111\u1EC3 ph\xE2n \u0111\u1ECBnh thi\u1EBFu th\u1EC3 t\xEDch (CVP \u2264 15) hay suy c\u01A1 tim/qu\xE1 t\u1EA3i (CVP > 15) v\xE0 b\xF9 d\u1ECBch Albumin / v\u1EADn m\u1EA1ch t\u01B0\u01A1ng \u1EE9ng.",
        warnings: [
          "H\u1ED9i ch\u1EA9n kh\u1EA9n c\u1EA5p chuy\xEAn gia SXHD.",
          "Ki\u1EC3m tra \u0111\u1EA7y \u0111\u1EE7 g\xF3i ABCS: Kh\xED m\xE1u, \u0111i\u1EC7n gi\u1EA3i, Calci ion, \u0111\u01B0\u1EDDng huy\u1EBFt.",
          "\u0110o CVP qua t\u0129nh m\u1EA1ch n\u1EC1n khu\u1EF7u tay Seldinger c\u1EA3i ti\u1EBFn (c\u1EA5m ch\u1ECDc TM c\u1EA3nh/d\u01B0\u1EDBi \u0111\xF2n)."
        ]
      };
    }
    return {
      branchType: "standard",
      title: "PH\xC1C \u0110\u1ED2 B\xD9 D\u1ECACH CHU\u1EA8N THEO PH\xC2N \u0110\u1ED8 B\u1ED8 Y T\u1EBE 2023",
      recommendedFluid: "Ringer Lactate ho\u1EB7c NaCl 0.9%",
      rateMlKgH: patient.severity === "warning_signs" ? 6 : 15,
      durationHours: 2,
      reasoning: "B\xF9 d\u1ECBch tinh th\u1EC3 theo ti\u1EBFn tr\xECnh n\u1EA5c thang gi\u1EA3m d\u1EA7n t\u1ED1c \u0111\u1ED9 k\u1EBFt h\u1EE3p theo d\xF5i s\xE1t sinh hi\u1EC7u v\xE0 Hct.",
      warnings: [
        "\u0110o l\u1EA1i Hct v\xE0 sinh hi\u1EC7u tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9.",
        "Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1 ml/kg/h."
      ]
    };
  }
  function generateDengueCDSSPlan(patient, customDurations) {
    const ageGroup = classifyAgeGroup(patient.ageYears);
    const weightResult = calculateWeightAdjustment(patient.ageYears, patient.gender, patient.actualWeightKg, patient.heightCm);
    const effectiveWeight = weightResult.adjustedWeightKg;
    const { rows, totalVolumeMl, totalDurationHours } = calculateFluidSchedule(
      patient,
      effectiveWeight,
      customDurations
    );
    const { dopamin, noradrenalin, dobutamin, adrenalin } = calculateVasopressorDoses(effectiveWeight);
    const bloodProducts = calculateBloodProducts(patient, effectiveWeight);
    const nacProtocol = calculateNACProtocol(patient, effectiveWeight);
    const abcsChecklist = calculateABCSChecklist(patient, effectiveWeight);
    const branchDecision = calculateBranchDecision(patient, effectiveWeight);
    const alerts = [];
    if (weightResult.isObese) {
      alerts.push({
        id: "alert_obese",
        level: "danger",
        title: patient.ageYears >= 16 ? "C\u1EA2NH B\xC1O QU\xC1 T\u1EA2I D\u1ECACH \u1EDE NG\u01AF\u1EDCI L\u1EDAN TH\u1EEAA C\xC2N / B\xC9O PH\xCC" : "C\u1EA2NH B\xC1O QU\xC1 T\u1EA2I D\u1ECACH \u1EDE TR\u1EBA TH\u1EEAA C\xC2N / B\xC9O PH\xCC",
        message: weightResult.warningText || (patient.ageYears >= 16 ? "B\u1EC7nh nh\xE2n th\u1EEBa c\xE2n. D\xF9ng c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh AdjBW." : "B\u1EC7nh nh\xE2n th\u1EEBa c\xE2n. B\u1EAFt bu\u1ED9c d\xF9ng c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh CDC 2014."),
        ruleCode: patient.ageYears >= 16 ? "ADULT_OBESE_RULE" : "CDC_2014_OBESE_RULE"
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
    if (branchDecision.branchType === "blood") {
      alerts.push({
        id: "alert_bleeding",
        level: "danger",
        title: "B\xC1O \u0110\u1ED8NG \u0110\u1ECE: XU\u1EA4T HUY\u1EBET N\u1ED8I \u1EA8N / M\u1EA4T M\xC1U C\u1EA4P",
        message: "Hct gi\u1EA3m th\u1EA5p ho\u1EB7c gi\u1EA3m nhanh k\u1EBFt h\u1EE3p s\u1ED1c kh\xF4ng c\u1EA3i thi\u1EC7n. Ch\u1EC9 \u0111\u1ECBnh truy\u1EC1n H\u1ED3ng C\u1EA7u L\u1EAFng kh\u1EA9n c\u1EA5p v\xE0 CPT song song!",
        ruleCode: "OCCULT_BLEEDING_ALERT"
      });
    } else if (branchDecision.branchType === "cpt") {
      alerts.push({
        id: "alert_cpt_escalation",
        level: "danger",
        title: "B\xC1O \u0110\u1ED8NG: TH\u1EA4T THO\xC1T HUY\u1EBET T\u01AF\u01A0NG TR\u01A0 D\u1ECACH TINH TH\u1EC2",
        message: "Hct c\xF2n cao \u2265 40%. Chuy\u1EC3n ngay sang Cao Ph\xE2n T\u1EED (Dextran 40 / 6% HES 200) 10-20 ml/kg/h trong 1 gi\u1EDD!",
        ruleCode: "CPT_ESCALATION_ALERT"
      });
    }
    if (nacProtocol.indicated && nacProtocol.severityLevel === "acute_liver_failure") {
      alerts.push({
        id: "alert_liver_failure",
        level: "danger",
        title: "C\u1EA2NH B\xC1O SUY GAN C\u1EA4P: TUY\u1EC6T \u0110\u1ED0I TR\xC1NH RINGER LACTATE & PARACETAMOL",
        message: "Men gan AST/ALT \u2265 1000 U/L. Kh\u1EDFi \u0111\u1ED9ng ph\xE1c \u0111\u1ED3 N-Acetylcysteine (NAC) 4 pha, d\xF9ng NaCl 0.9% ho\u1EB7c Ringer Acetate.",
        ruleCode: "ACUTE_LIVER_FAILURE_ALERT"
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
      `--- K\u1EBE HO\u1EA0CH \u0110I\u1EC0U TR\u1ECA & CH\u1ED0NG S\u1ED0C SXHD DENGUE (CDSS BYT 2023) [${dateStr}] ---`,
      `B\u1EC7nh nh\xE2n: ${patient.ageYears} tu\u1ED5i, Gi\u1EDBi t\xEDnh: ${patient.gender === "male" ? "Nam" : "N\u1EEF"}`,
      `Ph\xE2n \u0111\u1ED9: ${patient.severity === "warning_signs" ? "SXHD c\xF3 D\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o" : patient.severity === "shock" ? "S\u1ED1c SXHD" : "S\u1ED1c SXHD n\u1EB7ng nguy k\u1ECBch"}`,
      `C\xE2n n\u1EB7ng th\u1EF1c: ${patient.actualWeightKg} kg | C\xE2n n\u1EB7ng chu\u1EA9n: ${weightResult.standardWeightKg} kg | C\xE2n n\u1EB7ng t\xEDnh d\u1ECBch: ${effectiveWeight} kg`,
      ...weightResult.isObese ? [`[L\u01AFU \xDD]: \u0110\xE3 hi\u1EC7u ch\u1EC9nh theo chu\u1EA9n CDC 2014 \u0111\u1EC3 tr\xE1nh qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n.`] : [],
      ...patient.currentHctPercent ? [`Hct hi\u1EC7n t\u1EA1i: ${patient.currentHctPercent}% | \u0110\xE1nh gi\xE1 \u0111\xE1p \u1EE9ng: ${patient.clinicalResponse || "Theo d\xF5i"}`] : [],
      `
1. NH\xC1NH X\u1EEC TR\xCD L\xC2M S\xC0NG: ${branchDecision.title}`,
      `  \u2022 H\u01B0\u1EDBng x\u1EED tr\xED: ${branchDecision.recommendedFluid}`,
      `  \u2022 L\xFD lu\u1EADn l\xE2m s\xE0ng: ${branchDecision.reasoning}`,
      `
2. B\u1EA2NG C\u1ECCC D\u1ECACH \u0110I\u1EC0U TR\u1ECA BAN \u0110\u1EA6U:`,
      ...rows.map((r) => `  \u2022 C\u1EEF ${r.stepIndex}: ${r.timeWindow} | T\u1ED1c \u0111\u1ED9 ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} gi\u1ECDt/ph\xFAt) | C\u1EA7n ${r.totalMl} ml (Treo th\xEAm ${r.bottlesToHang} chai 500ml) | T\u1EA1i c\u1ECDc: ${r.totalAtPoleMl} ml`),
      `
3. PH\xC1C \u0110\u1ED2 KHI KH\xD4NG \u0110\xC1P \u1EE8NG / S\u1ED0C TR\u01A0 / T\xC1I S\u1ED0C (PH\u1EE4 L\u1EE4C 18):`,
      `  \u2022 Dopamin: Pha ${dopamin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 5-10 ml/h).`,
      `  \u2022 Noradrenalin: Pha ${noradrenalin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 0.1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 0.5-2 ml/h).`,
      `  \u2022 Dobutamin: Pha ${dobutamin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 3-10 ml/h khi CVP > 15 cmH2O ho\u1EB7c suy tim).`,
      `  \u2022 HCL (khi Hct < 35%): Truy\u1EC1n ${Math.round(5 * effectiveWeight)} - ${Math.round(10 * effectiveWeight)} ml trong 1-2h song song CPT 10 ml/kg/h.`,
      `  \u2022 G\xF3i ABCS: Acidosis (Bicarbonate 4.2% ${Math.round(2 * effectiveWeight)} ml); Calcium (Calci clorua 10% 2-5ml); Sugar (Dextrose 30% ${Math.round(1.5 * effectiveWeight)} ml).`,
      ...nacProtocol.indicated ? [`  \u2022 Ph\xE1c \u0111\u1ED3 NAC Suy gan: T\u1EA5n c\xF4ng 150mg/kg (1h) -> 50mg/kg (4h) -> 100mg/kg (16h) -> Duy tr\xEC 6.25mg/kg/h. Tuy\u1EC7t \u0111\u1ED1i TR\xC1NH Ringer Lactate & Paracetamol.`] : [],
      `
4. \u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N: \u0110o Hct tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9; Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1.0 ml/kg/h; B\xE1o BS ngay n\u1EBFu n\u01B0\u1EDBc ti\u1EC3u < 0.5 ml/kg/h ho\u1EB7c ran \u1EA9m ph\u1ED5i.`
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
      vasopressorDobutamin: dobutamin,
      vasopressorAdrenalin: adrenalin,
      bloodProducts,
      nacProtocol,
      branchDecision,
      abcsChecklist,
      alerts,
      nursingInstructions: DENGUE_NURSING_CHECKLIST,
      soapExportText: soapLines.join("\n"),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }

  // src/content/docspace/public/cdss/dengue/dengue-ui.ts
  var CLINICAL_SAMPLE_CASES = [
    // 1. Nhóm Bù Dịch Ban Đầu & Phân Tầng Thể Trạng
    {
      id: "child-obese",
      category: "initial",
      icon: "fa-solid fa-child",
      label: "B\xE9 8T B\xE9o Ph\xEC (38kg)",
      tag: "CDC 2014",
      input: {
        ageYears: 8,
        gender: "male",
        actualWeightKg: 38,
        severity: "warning_signs",
        clinicalResponse: "good",
        currentHctPercent: 42,
        baselineHctPercent: 36
      },
      clinicalHighlight: "Tr\u1EBB b\xE9o ph\xEC > 120% chu\u1EA9n: T\u1EF1 \u0111\u1ED9ng d\xF9ng c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh CDC 2014 (26kg) tr\xE1nh ph\xF9 ph\u1ED5i c\u1EA5p."
    },
    {
      id: "child-shock",
      category: "initial",
      icon: "fa-solid fa-heart-pulse",
      label: "B\xE9 G\xE1i 5T S\u1ED1c (16kg)",
      tag: "S\u1ED1c C\xF2n B\xF9",
      input: {
        ageYears: 5,
        gender: "female",
        actualWeightKg: 16,
        severity: "shock",
        clinicalResponse: "good",
        currentHctPercent: 41,
        baselineHctPercent: 35
      },
      clinicalHighlight: "Tr\u1EBB nh\u1ECF s\u1ED1c c\xF2n b\xF9: Ch\u1ED1ng s\u1ED1c 15 ml/kg/h c\u1EEF 1, theo d\xF5i s\xE1t sinh hi\u1EC7u v\xE0 Hct."
    },
    {
      id: "adult-severe-shock",
      category: "initial",
      icon: "fa-solid fa-bolt",
      label: "N\u1EEF 35T S\u1ED1c Nguy K\u1ECBch (62kg)",
      tag: "M\u1EA1ch 0 - HA 0",
      isDanger: true,
      input: {
        ageYears: 35,
        gender: "female",
        actualWeightKg: 62,
        severity: "severe_shock",
        clinicalResponse: "good",
        currentHctPercent: 49,
        baselineHctPercent: 38
      },
      clinicalHighlight: "S\u1ED1c nguy k\u1ECBch kh\u1EA9n c\u1EA5p: B\u01A1m d\u1ECBch 20 ml/kg/h si\xEAu t\u1ED1c + chu\u1EA9n b\u1ECB Noradrenalin b\u01A1m ti\xEAm \u0111i\u1EC7n."
    },
    // 2. Nhóm Sốc Trơ & Xử Trí Không Đáp Ứng
    {
      id: "child-refractory-cpt",
      category: "refractory",
      icon: "fa-solid fa-arrow-trend-up",
      label: "Tr\u1EBB 7T Tr\u01A1 D\u1ECBch (23kg)",
      tag: "Hct 48% \xB7 \u0110\u1ED5i CPT",
      isDanger: true,
      input: {
        ageYears: 7,
        gender: "male",
        actualWeightKg: 23,
        severity: "shock",
        clinicalResponse: "refractory_hct_high",
        currentHctPercent: 48,
        baselineHctPercent: 37
      },
      clinicalHighlight: "S\u1ED1c tr\u01A1 d\u1ECBch tinh th\u1EC3, Hct 48%: Tho\xE1t huy\u1EBFt t\u01B0\u01A1ng n\u1EB7ng -> \u0110\u1ED5i ngay Cao ph\xE2n t\u1EED Dextran 40 10-20 ml/kg/h."
    },
    {
      id: "adult-bleeding",
      category: "refractory",
      icon: "fa-solid fa-droplet",
      label: "Nam 32T S\u1ED1c K\xE9o D\xE0i (58kg)",
      tag: "Hct 26% \xB7 M\u1EA5t M\xE1u \u1EA8n",
      isDanger: true,
      input: {
        ageYears: 32,
        gender: "male",
        actualWeightKg: 58,
        severity: "shock",
        clinicalResponse: "refractory_bleeding",
        currentHctPercent: 26,
        baselineHctPercent: 44,
        massiveBleeding: true
      },
      clinicalHighlight: "S\u1ED1c k\xE9o d\xE0i k\xE8m Hct t\u1EE5t s\xE2u 26%: B\xE1o \u0111\u1ED9ng \u0111\u1ECF Xu\u1EA5t huy\u1EBFt n\u1ED9i t\u1EA1ng \u1EA9n -> Truy\u1EC1n H\u1ED3ng C\u1EA7u L\u1EAFng & CPT song song."
    },
    {
      id: "refractory-cvp",
      category: "refractory",
      icon: "fa-solid fa-gauge-high",
      label: "N\u1EEF 26T S\u1ED1c Tr\u01A1 D\u1ECBch (48kg)",
      tag: "CVP > 15 \xB7 V\u1EADn M\u1EA1ch",
      isDanger: true,
      input: {
        ageYears: 26,
        gender: "female",
        actualWeightKg: 48,
        severity: "shock",
        clinicalResponse: "refractory_shock_cvp",
        currentHctPercent: 39,
        baselineHctPercent: 38,
        cvpValue: 17
      },
      clinicalHighlight: "B\xF9 CPT \u2265 60ml/kg nh\u01B0ng v\u1EABn s\u1ED1c: \u0110\u1EB7t catheter \u0111o CVP t\u0129nh m\u1EA1ch n\u1EC1n, test d\u1ECBch & Dobutamin / B\xF9 Albumin."
    },
    {
      id: "acute-liver",
      category: "refractory",
      icon: "fa-solid fa-triangle-exclamation",
      label: "Nam 42T Suy Gan C\u1EA5p (64kg)",
      tag: "AST 1650 \xB7 Ph\xE1c \u0110\u1ED3 NAC",
      isDanger: true,
      input: {
        ageYears: 42,
        gender: "male",
        actualWeightKg: 64,
        severity: "warning_signs",
        clinicalResponse: "liver_failure",
        liverEnzymesAST_ALT: 1650,
        currentHctPercent: 40
      },
      clinicalHighlight: "AST 1650 U/L t\u1ED5n th\u01B0\u01A1ng gan c\u1EA5p: Ph\xE1c \u0111\u1ED3 NAC 4 pha, TUY\u1EC6T \u0110\u1ED0I C\u1EA4M Ringer Lactate & Paracetamol."
    }
  ];
  var DengueCDSSController = class {
    constructor(containerId) {
      this.currentPlan = null;
      this.customDurations = {};
      this.activeCaseId = "child-obese";
      this.activeWorkspaceMode = "fluid_schedule";
      this.activeRefractorySubTab = "tab-cpt";
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
      <!-- DEDICATED MEDICAL PRINT SHEET (Ch\u1EC9 hi\u1EC3n th\u1ECB khi in phi\u1EBFu y l\u1EC7nh) -->
      <div id="cdss-print-sheet" class="cdss-print-sheet"></div>

      <div class="dengue-cdss-app">
        <!-- TOP CLINICAL WORKSTATION TOOLBAR -->
        <header class="cdss-top-bar">
          <div class="cdss-bar-branding">
            <div class="cdss-icon-badge">
              <i class="fa-solid fa-droplet"></i>
            </div>
            <div class="cdss-brand-titles">
              <h1 class="cdss-brand-title">
                CDSS \u0110i\u1EC1u Tr\u1ECB SXHD Dengue &amp; Ch\u1ED1ng S\u1ED1c Ph\u1EE9c T\u1EA1p
              </h1>
              <div class="cdss-brand-subtitle">
                <span>B\u1ED9 Y T\u1EBF 2023</span>
                <span aria-hidden="true">\xB7</span>
                <span>Q\u0110 2760/Q\u0110-BYT</span>
                <span aria-hidden="true">\xB7</span>
                <span>Ph\u1EE5 l\u1EE5c 6, 8, 16, 17, 18 &amp; 26</span>
              </div>
            </div>
          </div>

          <div class="cdss-toolbar-actions">
            <button id="btn-copy-soap" class="cdss-action-btn cdss-action-btn--primary" title="Sao ch\xE9p K\u1EBF ho\u1EA1ch SOAP v\xE0o B\u1EC7nh \xE1n / DocSpace">
              <i class="fa-solid fa-notes-medical"></i> <span>B\u1EC7nh \xC1n SOAP</span>
            </button>
            <button id="btn-copy-handover" class="cdss-action-btn" title="Sao ch\xE9p b\xE1o c\xE1o giao ban c\u1ECDc d\u1ECBch">
              <i class="fa-solid fa-clipboard-check"></i> <span>B\xE0n Giao Ca</span>
            </button>
            <button id="btn-print" class="cdss-action-btn cdss-action-btn--icon-only" title="In phi\u1EBFu y l\u1EC7nh c\u1ECDc d\u1ECBch chu\u1EA9n A4">
              <i class="fa-solid fa-print"></i>
            </button>
            <button id="btn-reset-durations" class="cdss-action-btn cdss-action-btn--icon-only" title="Kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng chu\u1EA9n B\u1ED9 Y T\u1EBF">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
          </div>
        </header>

        <!-- CA L\xC2M S\xC0NG PH\xC2N T\u1EA6NG (CLINICAL CASES BAR) -->
        <div class="cdss-cases-bar">
          <!-- Nh\xF3m 1: B\xF9 d\u1ECBch ban \u0111\u1EA7u -->
          <div class="cdss-cases-group">
            <div class="cdss-cases-group-title">
              <i class="fa-solid fa-hand-holding-droplet text-primary"></i> B\xF9 D\u1ECBch Ban \u0110\u1EA7u:
            </div>
            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
              ${CLINICAL_SAMPLE_CASES.filter((c) => c.category === "initial").map((c) => `
                <button type="button" 
                  class="cdss-case-pill ${c.isDanger ? "cdss-case-pill--danger" : ""} ${c.id === this.activeCaseId ? "active" : ""}" 
                  data-case-id="${c.id}"
                  title="${c.clinicalHighlight}">
                  <i class="${c.icon} cdss-case-pill-icon"></i>
                  <span>${c.label}</span>
                  <span class="cdss-case-pill-tag">${c.tag}</span>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Nh\xF3m 2: S\u1ED1c tr\u01A1 & Kh\xF4ng \u0111\xE1p \u1EE9ng -->
          <div class="cdss-cases-group" style="padding-top:0.4rem; border-top:1px dashed var(--cdss-border-subtle);">
            <div class="cdss-cases-group-title" style="color:var(--cdss-danger);">
              <i class="fa-solid fa-shield-virus text-danger"></i> S\u1ED1c Tr\u01A1 &amp; Bi\u1EBFn Ch\u1EE9ng:
            </div>
            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
              ${CLINICAL_SAMPLE_CASES.filter((c) => c.category === "refractory").map((c) => `
                <button type="button" 
                  class="cdss-case-pill cdss-case-pill--danger ${c.id === this.activeCaseId ? "active" : ""}" 
                  data-case-id="${c.id}"
                  title="${c.clinicalHighlight}">
                  <i class="${c.icon} cdss-case-pill-icon"></i>
                  <span>${c.label}</span>
                  <span class="cdss-case-pill-tag">${c.tag}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- MAIN GRID LAYOUT -->
        <div class="cdss-main-grid">
          <!-- LEFT COLUMN: TR\u1EA0M \u0110\xC1NH GI\xC1 NG\u01AF\u1EDCI B\u1EC6NH UNIFIED PATIENT STATION -->
          <aside class="cdss-left-col">
            <div class="cdss-card" style="padding:0; overflow:hidden;">
              <div class="cdss-card-header" style="padding:0.85rem 1rem;">
                <h2 class="cdss-card-title">
                  <i class="fa-solid fa-user-injured text-primary"></i> Tr\u1EA1m \u0110\xE1nh Gi\xE1 Ng\u01B0\u1EDDi B\u1EC7nh
                </h2>
                <span id="case-status-indicator" class="cdss-brand-badge" style="display:none;"></span>
              </div>

              <!-- KH\u1ED0I 1: D\u1EEE KI\u1EC6N BAN \u0110\u1EA6U & TH\u1EC2 TR\u1EA0NG -->
              <div class="cdss-station-section">
                <div class="cdss-station-title">
                  <span>01. Th\u1EC3 Tr\u1EA1ng &amp; Ph\xE2n T\u1EA7ng Ban \u0110\u1EA7u</span>
                  <span style="font-size:0.7rem; font-weight:600; text-transform:none; color:var(--cdss-text-muted);">CDC 2014</span>
                </div>

                <form id="dengue-input-form" style="display:flex; flex-direction:column; gap:0.75rem;">
                  <!-- Tu\u1ED5i & Gi\u1EDBi t\xEDnh -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-age">Tu\u1ED5i (N\u0103m)</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-age" min="1" max="100" value="8" step="1" required class="cdss-input" />
                        <span class="cdss-input-suffix">tu\u1ED5i</span>
                      </div>
                    </div>

                    <div class="cdss-form-group">
                      <label class="cdss-form-label">Gi\u1EDBi T\xEDnh</label>
                      <div class="cdss-segmented" id="gender-segmented">
                        <button type="button" class="cdss-segmented-btn active" data-gender="male">
                          <i class="fa-solid fa-mars"></i> Nam
                        </button>
                        <button type="button" class="cdss-segmented-btn" data-gender="female">
                          <i class="fa-solid fa-venus"></i> N\u1EEF
                        </button>
                      </div>
                      <input type="hidden" id="input-gender" value="male" />
                    </div>
                  </div>

                  <!-- C\xE2n n\u1EB7ng th\u1EF1c t\u1EBF -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-weight">
                      <span>C\xE2n N\u1EB7ng Th\u1EF1c T\u1EBF</span>
                      <small style="color:var(--cdss-text-muted);">C\xE2n \u0111o t\u1EA1i c\u1EA5p c\u1EE9u</small>
                    </label>
                    <div class="cdss-input-group">
                      <input type="number" id="input-weight" min="5" max="160" value="38" step="0.5" required class="cdss-input" />
                      <span class="cdss-input-suffix">kg</span>
                    </div>
                  </div>

                  <!-- Ph\xE2n \u0111\u1ED9 l\xE2m s\xE0ng ban \u0111\u1EA7u -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-severity">Ph\xE2n \u0110\u1ED9 L\xE2m S\xE0ng Ban \u0110\u1EA7u</label>
                    <select id="input-severity" class="cdss-select">
                      <option value="warning_signs" selected>1. C\xF3 D\u1EA5u Hi\u1EC7u C\u1EA3nh B\xE1o (DHCB)</option>
                      <option value="shock">2. S\u1ED1c SXHD (C\xF2n B\xF9)</option>
                      <option value="severe_shock">3. S\u1ED1c Nguy K\u1ECBch (M\u1EA1ch 0, HA 0)</option>
                    </select>
                  </div>

                  <!-- Gi\u1EDD b\u1EAFt \u0111\u1EA7u truy\u1EC1n -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-starttime">M\u1ED1c Gi\u1EDD B\u1EAFt \u0110\u1EA7u Truy\u1EC1n</label>
                    <input type="time" id="input-starttime" value="${curTime}" class="cdss-input" />
                  </div>
                </form>
              </div>

              <!-- KH\u1ED0I 2: T\xC1I \u0110\xC1NH GI\xC1 & C\u1EACN L\xC2M S\xC0NG (\u0110\u1ED8NG H\u1ECCC) -->
              <div class="cdss-station-section" style="background: rgba(239, 68, 68, 0.02);">
                <div class="cdss-station-title" style="color:var(--cdss-danger);">
                  <span>02. T\xE1i \u0110\xE1nh Gi\xE1 &amp; C\u1EADn L\xE2m S\xE0ng</span>
                  <span style="font-size:0.7rem; font-weight:700; text-transform:none; color:var(--cdss-danger);">Q\u0110 2760</span>
                </div>

                <div style="display:flex; flex-direction:column; gap:0.75rem;">
                  <!-- Dropdown \u0110\xE1p \u1EE8ng L\xE2m S\xE0ng L\u1EDBn -->
                  <div class="cdss-form-group">
                    <label class="cdss-form-label" for="input-response">
                      <span>T\xECnh Tr\u1EA1ng \u0110\xE1p \u1EE8ng Sau B\xF9 D\u1ECBch Ban \u0110\u1EA7u</span>
                    </label>
                    <select id="input-response" class="cdss-select" style="font-weight:700; border-color:rgba(239,68,68,0.3);">
                      <option value="good">\u{1F7E2} \u0110\xE1p \u1EE9ng t\u1ED1t, ra s\u1ED1c (B\xF9 d\u1ECBch n\u1EA5c thang chu\u1EA9n)</option>
                      <option value="refractory_hct_high">\u{1F7E0} Kh\xF4ng \u0111\xE1p \u1EE9ng + Hct c\xF2n cao \u2265 40% (\u0110\u1ED5i CPT n\u1EA5c thang)</option>
                      <option value="refractory_bleeding">\u{1F534} Kh\xF4ng \u0111\xE1p \u1EE9ng + Hct t\u1EE5t ho\u1EB7c Xu\u1EA5t huy\u1EBFt \u1EA9n (Truy\u1EC1n M\xE1u HCL)</option>
                      <option value="refractory_shock_cvp">\u{1F7E3} S\u1ED1c th\u1EA5t b\u1EA1i b\xF9 d\u1ECBch / T\xE1i s\u1ED1c \u2265 2 l\u1EA7n (\u0110o CVP & V\u1EADn M\u1EA1ch)</option>
                      <option value="fluid_overload">\u26A0\uFE0F Bi\u1EBFn ch\u1EE9ng D\u01B0 d\u1ECBch / Qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n / Ph\xF9 ph\u1ED5i c\u1EA5p</option>
                      <option value="liver_failure">\u{1F7E4} Bi\u1EBFn ch\u1EE9ng Suy gan c\u1EA5p / AST-ALT \u2265 1000 U/L (Ph\xE1c \u0111\u1ED3 NAC)</option>
                    </select>
                  </div>

                  <!-- Hct Hi\u1EC7n T\u1EA1i & Hct N\u1EC1n -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-current-hct">Hct Hi\u1EC7n T\u1EA1i (%)</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-current-hct" min="15" max="65" value="42" step="0.5" class="cdss-input" />
                        <span class="cdss-input-suffix">%</span>
                      </div>
                    </div>
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-baseline-hct">Hct N\u1EC1n (%)</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-baseline-hct" min="20" max="55" value="36" step="0.5" class="cdss-input" />
                        <span class="cdss-input-suffix">%</span>
                      </div>
                    </div>
                  </div>

                  <!-- CVP & Men Gan AST/ALT -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-cvp">CVP \u0110o \u0110\u01B0\u1EE3c</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-cvp" min="0" max="30" placeholder="Ch\u01B0a \u0111o" step="1" class="cdss-input" />
                        <span class="cdss-input-suffix">cmH2O</span>
                      </div>
                    </div>
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-ast-alt">Men Gan AST/ALT</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-ast-alt" min="10" max="10000" placeholder="U/L" step="10" class="cdss-input" />
                        <span class="cdss-input-suffix">U/L</span>
                      </div>
                    </div>
                  </div>

                  <!-- Ti\u1EC3u C\u1EA7u & Xu\u1EA5t Huy\u1EBFt \u1EA8n -->
                  <div class="cdss-form-row">
                    <div class="cdss-form-group">
                      <label class="cdss-form-label" for="input-platelets">S\u1ED1 L\u01B0\u1EE3ng Ti\u1EC3u C\u1EA7u</label>
                      <div class="cdss-input-group">
                        <input type="number" id="input-platelets" min="1000" max="500000" placeholder="/mm\xB3" step="1000" class="cdss-input" />
                        <span class="cdss-input-suffix">/mm\xB3</span>
                      </div>
                    </div>
                    <div class="cdss-form-group" style="display:flex; align-items:flex-end;">
                      <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.76rem; font-weight:700; color:var(--cdss-danger); cursor:pointer; padding-bottom:0.6rem;">
                        <input type="checkbox" id="input-bleeding" style="width:16px; height:16px; accent-color:var(--cdss-danger);" />
                        <span>C\xF3 Xu\u1EA5t Huy\u1EBFt \u1EA8n / Ti\xEAu H\xF3a</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- KH\u1ED0I 3: PH\xC2N T\xCDCH C\xC2N N\u1EB6NG CDC 2014 & C\xC2N T\xCDNH D\u1ECACH (INLINE METRIC) -->
              <div id="weight-analysis-box" class="cdss-station-section">
                <!-- Dynamically populated via renderWeightAnalysis -->
              </div>
            </div>
          </aside>

          <!-- RIGHT COLUMN: CDSS DIRECTIVE & WORKSPACE MODES -->
          <main class="cdss-right-col">
            <!-- Dynamic Alert Banners -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-container"></div>

            <!-- CLINICAL DIRECTIVE EXECUTIVE CARD (CH\u1EC8 \u0110\u1EA0O L\xC2M S\xC0NG \u0110\u1ED8NG H\u1ECCC) -->
            <div id="cdss-directive-wrap"></div>

            <!-- WORKSPACE MODE SWITCHER TABS -->
            <div class="cdss-mode-switcher-wrap">
              <div class="cdss-mode-tabs" id="cdss-mode-tabs">
                <button type="button" class="cdss-mode-btn active" data-mode="fluid_schedule">
                  <i class="fa-solid fa-table-list"></i>
                  <span>1. B\u1EA3ng C\u1ECDc D\u1ECBch Ban \u0110\u1EA7u</span>
                </button>
                <button type="button" class="cdss-mode-btn" data-mode="refractory_suite" id="btn-mode-refractory">
                  <i class="fa-solid fa-shield-virus"></i>
                  <span>2. S\u1ED1c Tr\u01A1 &amp; Kh\xF4ng \u0110\xE1p \u1EE8ng</span>
                  <span id="refractory-alert-dot" style="display:none; width:8px; height:8px; border-radius:50%; background:#ef4444;"></span>
                </button>
                <button type="button" class="cdss-mode-btn" data-mode="vasopressors">
                  <i class="fa-solid fa-syringe"></i>
                  <span>3. V\u1EADn M\u1EA1ch 50ml (4 Lo\u1EA1i)</span>
                </button>
                <button type="button" class="cdss-mode-btn" data-mode="nursing_checklist">
                  <i class="fa-solid fa-user-nurse"></i>
                  <span>4. \u0110i\u1EC1u D\u01B0\u1EE1ng An To\xE0n</span>
                </button>
              </div>

              <div class="cdss-mode-hint" id="cdss-mode-hint">
                <i class="fa-solid fa-circle-info text-primary"></i>
                <span id="cdss-mode-hint-text">\u0110ang hi\u1EC3n th\u1ECB ph\xE1c \u0111\u1ED3 b\xF9 d\u1ECBch n\u1EA5c thang</span>
              </div>
            </div>

            <!-- WORKSPACE CONTENT CONTAINER (DYNAMIC VIEWS) -->
            <div id="cdss-workspace-content">
              <!-- Dynamically populated via renderWorkspaceContent -->
            </div>
          </main>
        </div>

        <!-- STICKY MOBILE BOTTOM BAR -->
        <div class="cdss-mobile-sticky-bar">
          <div class="cdss-mobile-bar-inner">
            <div class="cdss-mbar-summary">
              <div class="cdss-mbar-main">
                <span id="mbar-weight">26 kg</span>
                <span class="cdss-brand-badge" id="mbar-severity-badge">DHCB</span>
              </div>
              <div class="cdss-mbar-sub" id="mbar-volume-sub">T\u1ED5ng: 2.340 ml / 24h</div>
            </div>
            <div class="cdss-mbar-actions">
              <button type="button" id="btn-open-drawer" class="cdss-action-btn cdss-action-btn--primary">
                <i class="fa-solid fa-sliders"></i> Ch\u1EC9nh Ca
              </button>
              <button type="button" id="btn-mbar-soap" class="cdss-action-btn cdss-action-btn--icon-only" title="Ch\xE9p B\u1EC7nh \xC1n">
                <i class="fa-solid fa-notes-medical"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- MOBILE DRAWER OVERLAY & PANEL -->
        <div class="cdss-drawer-overlay" id="cdss-drawer-overlay"></div>
        <div class="cdss-mobile-drawer" id="cdss-mobile-drawer">
          <div class="cdss-drawer-handle"></div>
          <div class="cdss-drawer-header">
            <h3 class="cdss-drawer-title">
              <i class="fa-solid fa-sliders"></i> Ch\u1EC9nh Th\xF4ng S\u1ED1 Ca B\u1EC7nh
            </h3>
            <button type="button" class="cdss-action-btn cdss-action-btn--icon-only" id="btn-close-drawer">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div id="drawer-form-container">
            <!-- Mirrored controls for phone -->
          </div>
        </div>

        <!-- TOAST NOTIFICATION -->
        <div id="cdss-toast" class="cdss-toast">
          <i class="fa-solid fa-circle-check"></i>
          <span id="cdss-toast-text">Th\xF4ng b\xE1o</span>
        </div>
      </div>
    `;
    }
    attachEventListeners() {
      const form = document.getElementById("dengue-input-form");
      if (form) {
        form.addEventListener("input", () => {
          this.clearActivePreset();
          this.recalculate();
        });
        form.addEventListener("change", () => {
          this.clearActivePreset();
          this.recalculate();
        });
      }
      const responseSelect = document.getElementById("input-response");
      if (responseSelect) {
        responseSelect.addEventListener("change", () => {
          this.clearActivePreset();
          const val = responseSelect.value;
          if (val !== "good") {
            this.activeWorkspaceMode = "refractory_suite";
          }
          this.recalculate();
        });
      }
      const labInputs = ["input-current-hct", "input-baseline-hct", "input-cvp", "input-ast-alt", "input-platelets", "input-bleeding"];
      labInputs.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener("input", () => {
            this.clearActivePreset();
            this.recalculate();
          });
          el.addEventListener("change", () => {
            this.clearActivePreset();
            this.recalculate();
          });
        }
      });
      const genderBtns = document.querySelectorAll("#gender-segmented .cdss-segmented-btn");
      genderBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const target = e.currentTarget;
          const gender = target.getAttribute("data-gender");
          genderBtns.forEach((b) => b.classList.remove("active"));
          target.classList.add("active");
          const inputGender = document.getElementById("input-gender");
          if (inputGender) inputGender.value = gender;
          this.clearActivePreset();
          this.recalculate();
        });
      });
      const casePills = document.querySelectorAll(".cdss-case-pill");
      casePills.forEach((pill) => {
        pill.addEventListener("click", (e) => {
          const target = e.currentTarget;
          const caseId = target.getAttribute("data-case-id");
          if (caseId) {
            this.applySampleCase(caseId);
          }
        });
      });
      const modeBtns = document.querySelectorAll(".cdss-mode-btn");
      modeBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const target = e.currentTarget;
          const mode = target.getAttribute("data-mode");
          if (mode) {
            modeBtns.forEach((b) => b.classList.remove("active"));
            target.classList.add("active");
            this.activeWorkspaceMode = mode;
            this.renderWorkspaceContent();
          }
        });
      });
      const btnReset1 = document.getElementById("btn-reset-durations");
      const handleReset = () => {
        this.customDurations = {};
        this.recalculate();
        this.showToast("\u0110\xE3 kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng c\u1EEF chu\u1EA9n theo B\u1ED9 Y T\u1EBF!");
      };
      if (btnReset1) btnReset1.addEventListener("click", handleReset);
      const btnSoap = document.getElementById("btn-copy-soap");
      const btnMbarSoap = document.getElementById("btn-mbar-soap");
      if (btnSoap) btnSoap.addEventListener("click", () => this.copySoapPlan());
      if (btnMbarSoap) btnMbarSoap.addEventListener("click", () => this.copySoapPlan());
      const btnHandover = document.getElementById("btn-copy-handover");
      if (btnHandover) btnHandover.addEventListener("click", () => this.copyHandoverReport());
      const btnPrint = document.getElementById("btn-print");
      if (btnPrint) btnPrint.addEventListener("click", () => window.print());
      const btnOpenDrawer = document.getElementById("btn-open-drawer");
      const btnCloseDrawer = document.getElementById("btn-close-drawer");
      const drawerOverlay = document.getElementById("cdss-drawer-overlay");
      const drawer = document.getElementById("cdss-mobile-drawer");
      const openDrawer = () => {
        if (drawer && drawerOverlay) {
          drawer.classList.add("active");
          drawerOverlay.classList.add("active");
        }
      };
      const closeDrawer = () => {
        if (drawer && drawerOverlay) {
          drawer.classList.remove("active");
          drawerOverlay.classList.remove("active");
        }
      };
      if (btnOpenDrawer) btnOpenDrawer.addEventListener("click", openDrawer);
      if (btnCloseDrawer) btnCloseDrawer.addEventListener("click", closeDrawer);
      if (drawerOverlay) drawerOverlay.addEventListener("click", closeDrawer);
    }
    clearActivePreset() {
      this.activeCaseId = "";
      const pills = document.querySelectorAll(".cdss-case-pill");
      pills.forEach((p) => p.classList.remove("active"));
      const ind = document.getElementById("case-status-indicator");
      if (ind) ind.style.display = "none";
    }
    applySampleCase(caseId) {
      const sample = CLINICAL_SAMPLE_CASES.find((c) => c.id === caseId);
      if (!sample) return;
      this.activeCaseId = caseId;
      this.customDurations = {};
      const pills = document.querySelectorAll(".cdss-case-pill");
      pills.forEach((p) => {
        if (p.getAttribute("data-case-id") === caseId) {
          p.classList.add("active");
        } else {
          p.classList.remove("active");
        }
      });
      this.setInputValue("input-age", sample.input.ageYears.toString());
      this.setInputValue("input-weight", sample.input.actualWeightKg.toString());
      this.setInputValue("input-severity", sample.input.severity);
      this.setGender(sample.input.gender);
      if (sample.input.clinicalResponse) {
        this.setInputValue("input-response", sample.input.clinicalResponse);
      }
      if (sample.input.currentHctPercent !== void 0) {
        this.setInputValue("input-current-hct", sample.input.currentHctPercent.toString());
      }
      if (sample.input.baselineHctPercent !== void 0) {
        this.setInputValue("input-baseline-hct", sample.input.baselineHctPercent.toString());
      }
      if (sample.input.liverEnzymesAST_ALT !== void 0) {
        this.setInputValue("input-ast-alt", sample.input.liverEnzymesAST_ALT.toString());
      } else {
        this.setInputValue("input-ast-alt", "");
      }
      if (sample.input.cvpValue !== void 0) {
        this.setInputValue("input-cvp", sample.input.cvpValue.toString());
      } else {
        this.setInputValue("input-cvp", "");
      }
      const bleedCheckbox = document.getElementById("input-bleeding");
      if (bleedCheckbox) {
        bleedCheckbox.checked = !!sample.input.massiveBleeding;
      }
      if (sample.category === "refractory") {
        this.activeWorkspaceMode = "refractory_suite";
        if (sample.input.clinicalResponse === "refractory_hct_high") {
          this.activeRefractorySubTab = "tab-cpt";
        } else if (sample.input.clinicalResponse === "refractory_bleeding" || sample.input.massiveBleeding) {
          this.activeRefractorySubTab = "tab-blood";
        } else if (sample.input.clinicalResponse === "refractory_shock_cvp") {
          this.activeRefractorySubTab = "tab-cvp";
        } else if (sample.input.clinicalResponse === "liver_failure") {
          this.activeRefractorySubTab = "tab-liver";
        }
      } else {
        this.activeWorkspaceMode = "fluid_schedule";
      }
      const ind = document.getElementById("case-status-indicator");
      if (ind) {
        ind.textContent = sample.label;
        ind.style.display = "inline-block";
      }
      this.recalculate();
      this.showToast(`\u0110\xE3 \xE1p d\u1EE5ng ca l\xE2m s\xE0ng: ${sample.label}`);
    }
    setInputValue(id, val) {
      const el = document.getElementById(id);
      if (el) el.value = val;
    }
    setGender(val) {
      const hidden = document.getElementById("input-gender");
      if (hidden) hidden.value = val;
      const btns = document.querySelectorAll("#gender-segmented .cdss-segmented-btn");
      btns.forEach((btn) => {
        if (btn.getAttribute("data-gender") === val) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
    getFormData() {
      const age = parseFloat(document.getElementById("input-age")?.value) || 8;
      const gender = document.getElementById("input-gender")?.value || "male";
      const weight = parseFloat(document.getElementById("input-weight")?.value) || 30;
      const severity = document.getElementById("input-severity")?.value || "warning_signs";
      const startTime = document.getElementById("input-starttime")?.value || "08:00";
      const response = document.getElementById("input-response")?.value || "good";
      const currentHct = parseFloat(document.getElementById("input-current-hct")?.value) || void 0;
      const baselineHct = parseFloat(document.getElementById("input-baseline-hct")?.value) || void 0;
      const massiveBleeding = document.getElementById("input-bleeding")?.checked || false;
      const liverEnzymesAST_ALT = parseFloat(document.getElementById("input-ast-alt")?.value) || void 0;
      const plateletsCount = parseFloat(document.getElementById("input-platelets")?.value) || void 0;
      return {
        ageYears: age,
        gender,
        actualWeightKg: weight,
        severity,
        startTime,
        clinicalResponse: response,
        currentHctPercent: currentHct,
        baselineHctPercent: baselineHct,
        massiveBleeding,
        liverEnzymesAST_ALT,
        plateletsCount
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
      this.renderDirective(plan);
      this.updateWorkspaceModeSwitcher(plan);
      this.renderWorkspaceContent();
      this.updateMobileStickyBar(plan);
      this.renderPrintSheet(plan);
    }
    renderWeightAnalysis(plan) {
      const box = document.getElementById("weight-analysis-box");
      if (!box) return;
      const { weightResult, ageGroup } = plan;
      const isObese = weightResult.isObese;
      const ageGroupLabel = ageGroup === "child" ? "Tr\u1EBB em (< 13 tu\u1ED5i)" : ageGroup === "adolescent" ? "Thi\u1EBFu ni\xEAn (13-15T)" : "Ng\u01B0\u1EDDi l\u1EDBn (\u2265 16T)";
      box.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--cdss-text-muted);">
          C\xE2n N\u1EB7ng T\xEDnh D\u1ECBch (CDSS)
        </span>
        <span style="font-size:0.72rem; font-weight:700; color:${isObese ? "var(--cdss-danger)" : "var(--cdss-success)"};">
          ${isObese ? "Th\u1EEBa C\xE2n (> 120% Chu\u1EA9n)" : "Th\u1EC3 Tr\u1EA1ng Chu\u1EA9n"}
        </span>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1.3fr; gap:0.4rem; background:var(--cdss-surface-alt); border:1px solid var(--cdss-border-subtle); border-radius:8px; padding:0.5rem;">
        <div style="text-align:center;">
          <div style="font-size:0.68rem; color:var(--cdss-text-muted);">Th\u1EF1c t\u1EBF</div>
          <strong style="font-size:0.95rem; font-family:var(--cdss-font-mono);">${weightResult.actualWeightKg} kg</strong>
        </div>
        <div style="text-align:center; border-left:1px solid var(--cdss-border-subtle); border-right:1px solid var(--cdss-border-subtle);">
          <div style="font-size:0.68rem; color:var(--cdss-text-muted);">CDC 2014</div>
          <strong style="font-size:0.95rem; font-family:var(--cdss-font-mono); color:var(--cdss-text-muted);">${weightResult.standardWeightKg} kg</strong>
        </div>
        <div style="text-align:center; background:var(--cdss-surface); border-radius:6px; padding:2px 0;">
          <div style="font-size:0.68rem; color:var(--cdss-primary); font-weight:700;">T\xEDnh d\u1ECBch</div>
          <strong style="font-size:1.05rem; font-family:var(--cdss-font-mono); color:var(--cdss-primary);">${weightResult.adjustedWeightKg} kg</strong>
        </div>
      </div>

      <div style="font-size:0.72rem; color:var(--cdss-text-muted); line-height:1.4; margin-top:0.4rem;">
        <i class="fa-solid fa-circle-info text-primary"></i> ${weightResult.formulaNote}
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
      <div class="cdss-alert-box cdss-alert-box--${a.level}">
        <i class="fa-solid ${a.level === "danger" ? "fa-triangle-exclamation" : a.level === "warning" ? "fa-circle-exclamation" : "fa-circle-info"}"></i>
        <div class="cdss-alert-body">
          <strong>${a.title}</strong>
          <div>${a.message}</div>
        </div>
      </div>
    `).join("");
    }
    renderDirective(plan) {
      const wrap = document.getElementById("cdss-directive-wrap");
      if (!wrap) return;
      const { branchDecision, patient } = plan;
      const isDanger = branchDecision.branchType === "blood" || branchDecision.branchType === "refractory_shock";
      const isWarning = branchDecision.branchType === "cpt";
      const isStandard = branchDecision.branchType === "standard";
      wrap.innerHTML = `
      <div class="cdss-directive-card ${isDanger ? "directive--danger" : isWarning ? "directive--warning" : ""}">
        <div class="cdss-directive-header">
          <h2 class="cdss-directive-title">
            <i class="fa-solid ${isDanger ? "fa-triangle-exclamation text-danger" : isWarning ? "fa-arrow-trend-up text-warning" : "fa-circle-check text-primary"}"></i>
            <span>${branchDecision.title}</span>
          </h2>
          <span class="cdss-directive-tag" style="background:${isDanger ? "rgba(239,68,68,0.1)" : isWarning ? "rgba(245,158,11,0.1)" : "rgba(2,132,199,0.1)"}; color:${isDanger ? "var(--cdss-danger)" : isWarning ? "var(--cdss-warning)" : "var(--cdss-primary)"};">
            ${branchDecision.branchType === "blood" ? "M\u1EA4T M\xC1U C\u1EA4P" : branchDecision.branchType === "cpt" ? "THO\xC1T HUY\u1EBET T\u01AF\u01A0NG TR\u01A0" : branchDecision.branchType === "refractory_shock" ? "S\u1ED0C KH\xC1NG TR\u1ECA" : "\u0110\xC1P \u1EE8NG CHU\u1EA8N"}
          </span>
        </div>

        <div class="cdss-directive-action-banner ${isDanger ? "action--danger" : isWarning ? "action--warning" : "action--primary"}">
          <i class="fa-solid fa-arrow-right-arrow-left" style="font-size:1.1rem;"></i>
          <div>
            <div style="font-size:0.72rem; text-transform:uppercase; letter-spacing:0.04em; font-weight:800; opacity:0.85;">Khuy\u1EBFn C\xE1o X\u1EED Tr\xED \u01AFu Ti\xEAn:</div>
            <strong style="font-size:0.95rem;">${branchDecision.recommendedFluid}</strong>
          </div>
        </div>

        <div class="cdss-directive-reasoning">
          <strong>L\xFD lu\u1EADn l\xE2m s\xE0ng:</strong> ${branchDecision.reasoning}
        </div>

        <!-- Thanh Th\u1EED Nghi\u1EC7m K\u1ECBch B\u1EA3n L\xE2m S\xE0ng 1 Ch\u1EA1m -->
        <div class="cdss-scenario-bar">
          <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:var(--cdss-text-muted); margin-right:4px;">
            Th\u1EED nghi\u1EC7m k\u1ECBch b\u1EA3n:
          </span>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === "good" ? "active" : ""}" onclick="window.__dengueSetScenario('good');">
            \u{1F7E2} \u1ED4n \u0111\u1ECBnh
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === "refractory_hct_high" ? "active" : ""}" onclick="window.__dengueSetScenario('refractory_hct_high');">
            \u{1F7E0} Hct cao \u226540% (\u0110\u1ED5i CPT)
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === "refractory_bleeding" ? "active" : ""}" onclick="window.__dengueSetScenario('refractory_bleeding');">
            \u{1F534} Xu\u1EA5t huy\u1EBFt (Truy\u1EC1n M\xE1u)
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === "refractory_shock_cvp" ? "active" : ""}" onclick="window.__dengueSetScenario('refractory_shock_cvp');">
            \u{1F7E3} \u0110o CVP &amp; V\u1EADn M\u1EA1ch
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === "liver_failure" ? "active" : ""}" onclick="window.__dengueSetScenario('liver_failure');">
            \u{1F7E4} Suy Gan (NAC)
          </button>
          <button type="button" class="cdss-scenario-btn ${patient.clinicalResponse === "fluid_overload" ? "active" : ""}" onclick="window.__dengueSetScenario('fluid_overload');">
            \u26A0\uFE0F D\u01B0 D\u1ECBch / Ph\xF9 Ph\u1ED5i
          </button>
        </div>
      </div>
    `;
      window.__dengueSetScenario = (scenario) => {
        const respEl = document.getElementById("input-response");
        if (respEl) {
          respEl.value = scenario;
        }
        if (scenario === "refractory_bleeding") {
          const bl = document.getElementById("input-bleeding");
          if (bl) bl.checked = true;
        } else if (scenario === "liver_failure") {
          const ast = document.getElementById("input-ast-alt");
          if (ast && !ast.value) ast.value = "1500";
        }
        if (scenario !== "good") {
          this.activeWorkspaceMode = "refractory_suite";
          if (scenario === "refractory_hct_high") this.activeRefractorySubTab = "tab-cpt";
          else if (scenario === "refractory_bleeding") this.activeRefractorySubTab = "tab-blood";
          else if (scenario === "refractory_shock_cvp") this.activeRefractorySubTab = "tab-cvp";
          else if (scenario === "liver_failure") this.activeRefractorySubTab = "tab-liver";
          else if (scenario === "fluid_overload") this.activeRefractorySubTab = "tab-overload";
        }
        this.recalculate();
      };
    }
    updateWorkspaceModeSwitcher(plan) {
      const modeBtns = document.querySelectorAll(".cdss-mode-btn");
      modeBtns.forEach((btn) => {
        const m = btn.getAttribute("data-mode");
        if (m === this.activeWorkspaceMode) {
          btn.classList.add("active");
          if (m === "refractory_suite" && plan.patient.clinicalResponse !== "good") {
            btn.classList.add("mode-danger");
          } else {
            btn.classList.remove("mode-danger");
          }
        } else {
          btn.classList.remove("active", "mode-danger");
        }
      });
      const dot = document.getElementById("refractory-alert-dot");
      if (dot) {
        dot.style.display = plan.patient.clinicalResponse !== "good" ? "inline-block" : "none";
      }
      const hintText = document.getElementById("cdss-mode-hint-text");
      if (hintText) {
        if (this.activeWorkspaceMode === "fluid_schedule") {
          hintText.textContent = "B\u1EA3ng \u0111i\u1EC1u ph\u1ED1i c\u1ECDc d\u1ECBch 4 c\u1ED9t chu\u1EA9n h\xF3a (BYT)";
        } else if (this.activeWorkspaceMode === "refractory_suite") {
          hintText.textContent = "Ph\xE1c \u0111\u1ED3 6 ph\xE2n nh\xE1nh khi b\u1EC7nh nh\xE2n kh\xF4ng \u0111\xE1p \u1EE9ng";
        } else if (this.activeWorkspaceMode === "vasopressors") {
          hintText.textContent = "C\xF4ng th\u1EE9c pha 4 thu\u1ED1c v\u1EADn m\u1EA1ch b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml";
        } else {
          hintText.textContent = "Quy tr\xECnh ki\u1EC3m so\xE1t an to\xE0n \u0111i\u1EC1u d\u01B0\u1EE1ng t\u1EA1i gi\u01B0\u1EDDng";
        }
      }
    }
    renderWorkspaceContent() {
      const container = document.getElementById("cdss-workspace-content");
      if (!container || !this.currentPlan) return;
      const plan = this.currentPlan;
      switch (this.activeWorkspaceMode) {
        case "fluid_schedule":
          this.renderFluidScheduleView(container, plan);
          break;
        case "refractory_suite":
          this.renderRefractorySuiteView(container, plan);
          break;
        case "vasopressors":
          this.renderVasopressorsView(container, plan);
          break;
        case "nursing_checklist":
          this.renderNursingChecklistView(container, plan);
          break;
      }
    }
    // VIEW 1: BẢNG CỌC DỊCH BAN ĐẦU (INITIAL FLUID VIEW)
    renderFluidScheduleView(container, plan) {
      const mlPerKg = Math.round(plan.totalVolumeMl / plan.weightResult.adjustedWeightKg);
      const bottles500 = Math.ceil(plan.totalVolumeMl / 500);
      const ageGroup = plan.ageGroup;
      const tpls = DENGUE_FLUID_TEMPLATES[plan.patient.severity][ageGroup];
      container.innerHTML = `
      <!-- Summary Bento Stats -->
      <div class="cdss-kpi-grid" style="margin-bottom: 1.25rem;">
        <div class="cdss-kpi-card">
          <div class="cdss-kpi-icon cdss-kpi-icon--blue">
            <i class="fa-solid fa-fill-drip"></i>
          </div>
          <div class="cdss-kpi-content">
            <span class="cdss-kpi-label">T\u1ED5ng D\u1ECBch Ban \u0110\u1EA7u</span>
            <span class="cdss-kpi-value">${plan.totalVolumeMl.toLocaleString("vi-VN")} <small>ml</small></span>
            <span class="cdss-kpi-sub">~ ${mlPerKg} ml/kg c\xE2n t\xEDnh d\u1ECBch</span>
          </div>
        </div>

        <div class="cdss-kpi-card">
          <div class="cdss-kpi-icon cdss-kpi-icon--purple">
            <i class="fa-solid fa-hourglass-half"></i>
          </div>
          <div class="cdss-kpi-content">
            <span class="cdss-kpi-label">Th\u1EDDi L\u01B0\u1EE3ng D\u1EF1 Ki\u1EBFn</span>
            <span class="cdss-kpi-value">${plan.totalDurationHours} <small>gi\u1EDD</small></span>
            <span class="cdss-kpi-sub">${plan.fluidRows.length} b\u1EADc t\u1ED1c \u0111\u1ED9 gi\u1EA3m d\u1EA7n</span>
          </div>
        </div>

        <div class="cdss-kpi-card">
          <div class="cdss-kpi-icon cdss-kpi-icon--teal">
            <i class="fa-solid fa-bottle-water"></i>
          </div>
          <div class="cdss-kpi-content">
            <span class="cdss-kpi-label">\u01AF\u1EDBc T\xEDnh S\u1ED1 Chai 500ml</span>
            <span class="cdss-kpi-value">${bottles500} <small>chai</small></span>
            <span class="cdss-kpi-sub">Ringer Lactate / NaCl 0.9%</span>
          </div>
        </div>
      </div>

      <!-- VISUAL FLUID TIMELINE -->
      <div class="cdss-timeline-card">
        <div class="cdss-timeline-header">
          <span class="cdss-timeline-title">
            <i class="fa-solid fa-chart-gantt"></i> Ti\u1EBFn Tr\xECnh B\u1EADc D\u1ECBch Truy\u1EC1n Ban \u0110\u1EA7u Theo Gi\u1EDD
          </span>
          <span class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">
            ${plan.totalDurationHours} Gi\u1EDD Truy\u1EC1n
          </span>
        </div>
        <div class="cdss-timeline-track" id="cdss-timeline-track">
          ${plan.fluidRows.map((r, idx) => {
        const colors = ["cdss-seg-1", "cdss-seg-2", "cdss-seg-3", "cdss-seg-4", "cdss-seg-5"];
        const colClass = colors[idx % colors.length];
        return `
              <div class="cdss-timeline-segment ${colClass}" style="flex: ${r.durationHours};" title="C\u1EEF ${r.stepIndex}: ${r.rateMlKgH} ml/kg/h (${r.durationHours}h) - C\u1EA7n ${r.totalMl} ml">
                <span>${r.rateMlKgH} ml/kg/h</span>
                <small>C\u1EEF ${r.stepIndex} (${r.durationHours}h)</small>
              </div>
            `;
      }).join("")}
        </div>
        <div class="cdss-timeline-ticks">
          <span><i class="fa-regular fa-clock"></i> Kh\u1EDFi \u0111\u1EA7u: <strong>${plan.fluidRows[0]?.timeWindow.split(" - ")[0] || "08:00"}</strong></span>
          <span>${plan.fluidRows.length} giai \u0111o\u1EA1n b\xF9 d\u1ECBch li\xEAn t\u1EE5c</span>
          <span>K\u1EBFt th\xFAc: <strong>${plan.fluidRows[plan.fluidRows.length - 1]?.timeWindow.split(" - ")[1]?.split(" ")[0] || "24h"}</strong></span>
        </div>
      </div>

      <!-- B\u1EA2NG \u0110I\u1EC0U PH\u1ED0I C\u1ECCC D\u1ECACH 4 C\u1ED8T -->
      <section class="cdss-table-card">
        <div class="cdss-table-header-wrap">
          <div class="cdss-table-title-area">
            <h2 class="cdss-table-title">
              <i class="fa-solid fa-table-list"></i> B\u1EA3ng \u0110i\u1EC1u Ph\u1ED1i C\u1ECDc D\u1ECBch 4 C\u1ED9t Chu\u1EA9n H\xF3a
            </h2>
            <p class="cdss-table-desc">
              T\u1EF1 \u0111\u1ED9ng g\u1ED9p th\u1EC3 t\xEDch, t\xEDnh gi\u1ECDt/ph\xFAt (d\xE2y 20g/ml), chuy\u1EC3n d\u1ECBch d\u01B0 v\xE0 t\xEDnh s\u1ED1 chai 500ml treo th\xEAm t\u1EA1i c\u1ECDc.
            </p>
          </div>
          <button id="btn-reset-durations-sub" class="cdss-action-btn" title="Kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng chu\u1EA9n B\u1ED9 Y T\u1EBF">
            <i class="fa-solid fa-clock-rotate-left"></i> <span>\u0110\u1EB7t L\u1EA1i Gi\u1EDD Chu\u1EA9n</span>
          </button>
        </div>

        <!-- Desktop / Tablet Table -->
        <div class="cdss-table-scroll">
          <table class="cdss-table">
            <thead>
              <tr>
                <th style="width: 22%;">C\u1ED9t 1: M\u1ED1c Gi\u1EDD &amp; Th\u1EDDi L\u01B0\u1EE3ng</th>
                <th style="width: 28%;">C\u1ED9t 2: T\u1ED1c \u0110\u1ED9 &amp; L\u01B0\u1EE3ng D\u1ECBch C\u1EA7n</th>
                <th style="width: 26%;">C\u1ED9t 3: D\u1ECBch C\xF3 S\u1EB4N / Treo Th\xEAm</th>
                <th style="width: 24%;">C\u1ED9t 4: T\u1ED5ng C\u1ECDc &amp; Gi\xE1m S\xE1t</th>
              </tr>
            </thead>
            <tbody>
              ${plan.fluidRows.map((r, idx) => {
        const tpl = tpls[idx];
        const durationOptions = tpl?.durationOptions || [r.durationHours];
        const optionsHtml = durationOptions.map((dur) => `
                  <option value="${dur}" ${dur === r.durationHours ? "selected" : ""}>${dur} gi\u1EDD</option>
                `).join("");
        return `
                  <tr>
                    <td>
                      <div class="cdss-step-badge">C\u1EEF ${r.stepIndex}</div>
                      <div class="cdss-time-window">${r.timeWindow}</div>
                      <div class="cdss-duration-picker">
                        <label><i class="fa-regular fa-clock"></i> Th\u1EDDi l\u01B0\u1EE3ng:</label>
                        <select class="cdss-duration-select" data-row-idx="${idx}">
                          ${optionsHtml}
                        </select>
                      </div>
                      <div class="cdss-stage-title">${r.stageName}</div>
                    </td>
                    <td>
                      <div class="cdss-rate-display">
                        <span class="cdss-rate-number">${r.rateMlKgH}</span>
                        <span class="cdss-rate-unit">ml/kg/gi\u1EDD</span>
                      </div>
                      <div class="cdss-drops-box">
                        <i class="fa-solid fa-water" style="color:var(--cdss-info);"></i> 
                        <strong>${r.dropsPerMin}</strong> gi\u1ECDt/ph\xFAt
                        <small style="color:var(--cdss-text-muted);">(D\xE2y 20 g/ml)</small>
                      </div>
                      <div class="cdss-volume-calc">
                        Th\u1EC3 t\xEDch c\u1EA7n: <strong>${r.totalMl.toLocaleString("vi-VN")} ml</strong>
                        <div style="font-size:0.7rem; color:var(--cdss-text-muted);">
                          (${r.rateMlKgH} \xD7 ${plan.weightResult.adjustedWeightKg}kg \xD7 ${r.durationHours}h)
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="cdss-carry-over">
                        D\u1ECBch s\u1EB5n t\u1EEB c\u1EEF tr\u01B0\u1EDBc: <strong>${r.existingFluidMl} ml</strong>
                      </div>
                      <div>
                        <span class="cdss-hang-badge ${r.bottlesToHang > 0 ? "cdss-hang-badge--active" : ""}">
                          <i class="fa-solid fa-plus"></i> Treo th\xEAm: <strong>${r.bottlesToHang}</strong> chai 500ml
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="cdss-pole-metric">
                        T\u1ED5ng c\xF3 tr\xEAn c\u1ECDc: <strong>${r.totalAtPoleMl.toLocaleString("vi-VN")} ml</strong>
                      </div>
                      ${r.hctCheckRequired ? `
                        <div class="cdss-hct-pill">
                          <i class="fa-solid fa-vial"></i> <strong>\u0110o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng</strong>
                        </div>
                      ` : ""}
                      <div class="cdss-monitor-tip">
                        ${r.monitoringNotes}
                      </div>
                    </td>
                  </tr>
                `;
      }).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
      const selects = container.querySelectorAll(".cdss-duration-select");
      selects.forEach((sel) => {
        sel.addEventListener("change", (e) => {
          const target = e.target;
          const rowIdx = parseInt(target.getAttribute("data-row-idx") || "0", 10);
          const newDur = parseFloat(target.value);
          this.customDurations[rowIdx] = newDur;
          this.recalculate();
        });
      });
      const btnSub = container.querySelector("#btn-reset-durations-sub");
      if (btnSub) {
        btnSub.addEventListener("click", () => {
          this.customDurations = {};
          this.recalculate();
          this.showToast("\u0110\xE3 kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng c\u1EEF chu\u1EA9n theo B\u1ED9 Y T\u1EBF!");
        });
      }
    }
    // VIEW 2: PHÁC ĐỒ XỬ TRÍ KHI KHÔNG ĐÁP ỨNG & SỐC TRƠ
    renderRefractorySuiteView(container, plan) {
      const effectiveWeight = plan.weightResult.adjustedWeightKg;
      const albuminCalc = calculateAlbuminDose(effectiveWeight, 2, 3.5);
      container.innerHTML = `
      <section class="cdss-refractory-card" style="margin-top:0;">
        <div class="cdss-refractory-header">
          <h2 class="cdss-refractory-title">
            <i class="fa-solid fa-shield-virus"></i> Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED Khi Kh\xF4ng \u0110\xE1p \u1EE8ng &amp; S\u1ED1c Tr\u01A1 (B\u1ED9 Y T\u1EBF 2023)
          </h2>
          <span class="cdss-brand-badge" style="background:rgba(239, 68, 68, 0.1); color:var(--cdss-danger); border-color:rgba(239,68,68,0.3);">
            Ph\u1EE5 l\u1EE5c 8, 16, 17, 18 &amp; 26
          </span>
        </div>

        <!-- Refractory Sub-Tabs Nav -->
        <div class="cdss-refractory-nav" id="cdss-ref-subtabs">
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === "tab-cpt" ? "active" : ""}" data-subtab="tab-cpt">
            <i class="fa-solid fa-arrow-trend-up text-warning"></i>
            <span>1. \u0110\u1ED5i CPT N\u1EA5c Thang</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === "tab-blood" ? "active" : ""}" data-subtab="tab-blood">
            <i class="fa-solid fa-droplet text-danger"></i>
            <span>2. M\xE1u &amp; Albumin (PL 17)</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === "tab-cvp" ? "active" : ""}" data-subtab="tab-cvp">
            <i class="fa-solid fa-gauge-high text-primary"></i>
            <span>3. \u0110o CVP &amp; V\u1EADn M\u1EA1ch (PL 18)</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === "tab-abcs" ? "active" : ""}" data-subtab="tab-abcs">
            <i class="fa-solid fa-kit-medical text-purple"></i>
            <span>4. G\xF3i H\u1ED3i S\u1EE9c ABCS</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === "tab-liver" ? "active" : ""}" data-subtab="tab-liver">
            <i class="fa-solid fa-triangle-exclamation text-danger"></i>
            <span>5. Suy Gan C\u1EA5p (NAC - PL 26)</span>
          </button>
          <button type="button" class="cdss-ref-tab-btn ${this.activeRefractorySubTab === "tab-overload" ? "active" : ""}" data-subtab="tab-overload">
            <i class="fa-solid fa-water text-info"></i>
            <span>6. Qu\xE1 T\u1EA3i / Ph\xF9 Ph\u1ED5i C\u1EA5p</span>
          </button>
        </div>

        <div class="cdss-refractory-body" id="cdss-ref-subtab-content">
          <!-- Dynamic Content -->
        </div>
      </section>
    `;
      this.renderSubTabContent(plan);
      const subTabBtns = container.querySelectorAll(".cdss-ref-tab-btn");
      subTabBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const target = e.currentTarget;
          const sub = target.getAttribute("data-subtab");
          if (sub) {
            subTabBtns.forEach((b) => b.classList.remove("active"));
            target.classList.add("active");
            this.activeRefractorySubTab = sub;
            this.renderSubTabContent(plan);
          }
        });
      });
    }
    renderSubTabContent(plan) {
      const body = document.getElementById("cdss-ref-subtab-content");
      if (!body) return;
      const effectiveWeight = plan.weightResult.adjustedWeightKg;
      const albuminCalc = calculateAlbuminDose(effectiveWeight, 2, 3.5);
      switch (this.activeRefractorySubTab) {
        case "tab-cpt": {
          const cptScen = DENGUE_NON_RESPONSE_SCENARIOS.cpt_escalation;
          const rateAdult = Math.round(15 * effectiveWeight);
          const rateChild = Math.round(20 * effectiveWeight);
          body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-text); margin:0;">
                  ${cptScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${cptScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge">${cptScen.tag}</span>
            </div>

            <div style="background:var(--cdss-surface-alt); border:1px solid var(--cdss-border); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.82rem; line-height:1.45; margin-bottom:0.6rem;">
                <strong>C\u01A1 ch\u1EBF sinh l\xFD b\u1EC7nh:</strong> ${cptScen.mechanism}
              </div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--cdss-primary);">
                <strong>X\u1EED tr\xED t\u1EE9c th\xEC:</strong> ${cptScen.primaryAction}
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
              <div class="cdss-card" style="padding:0.85rem; border-top:3px solid var(--cdss-warning);">
                <div style="font-size:0.85rem; font-weight:800; margin-bottom:0.4rem; color:var(--cdss-text);">
                  <i class="fa-solid fa-child text-warning"></i> Li\u1EC1u Tr\u1EBB Em (< 16 Tu\u1ED5i)
                </div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--cdss-warning); font-family:var(--cdss-font-mono);">
                  10 - 20 ml/kg/gi\u1EDD
                </div>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:4px;">
                  B\u1EC7nh nh\xE2n (${effectiveWeight}kg): <strong>${Math.round(10 * effectiveWeight)} - ${rateChild} ml/gi\u1EDD</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:6px;">
                  Truy\u1EC1n trong 1 gi\u1EDD. N\u1EBFu ra s\u1ED1c: gi\u1EA3m b\u1EADc 10 ml/kg/h (1-2h) -> 7.5 -> 5 -> 3 ml/kg/h.
                </div>
              </div>

              <div class="cdss-card" style="padding:0.85rem; border-top:3px solid var(--cdss-primary);">
                <div style="font-size:0.85rem; font-weight:800; margin-bottom:0.4rem; color:var(--cdss-text);">
                  <i class="fa-solid fa-user-doctor text-primary"></i> Li\u1EC1u Ng\u01B0\u1EDDi L\u1EDBn (\u2265 16 Tu\u1ED5i)
                </div>
                <div style="font-size:1.15rem; font-weight:800; color:var(--cdss-primary); font-family:var(--cdss-font-mono);">
                  10 - 15 ml/kg/gi\u1EDD
                </div>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:4px;">
                  B\u1EC7nh nh\xE2n (${effectiveWeight}kg): <strong>${Math.round(10 * effectiveWeight)} - ${rateAdult} ml/gi\u1EDD</strong>
                </div>
                <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:6px;">
                  Truy\u1EC1n trong 1 gi\u1EDD. N\u1EBFu ra s\u1ED1c: gi\u1EA3m b\u1EADc 10 -> 7.5 -> 5 -> 3 ml/kg/h.
                </div>
              </div>
            </div>

            <div style="font-size:0.8rem; background:var(--cdss-surface); border:1px solid var(--cdss-border); border-radius:6px; padding:0.75rem 1rem;">
              <strong style="color:var(--cdss-text);"><i class="fa-solid fa-list-check text-primary"></i> Y l\u1EC7nh c\u1EE5 th\u1EC3 &amp; Gi\xE1m s\xE1t:</strong>
              <ul style="margin:0.4rem 0 0 1.2rem; padding:0; line-height:1.45;">
                ${cptScen.keyOrders.map((o) => `<li>${o}</li>`).join("")}
              </ul>
              <div style="margin-top:0.6rem; padding-top:0.4rem; border-top:1px dashed var(--cdss-border); color:var(--cdss-danger); font-size:0.76rem; font-weight:600;">
                <i class="fa-solid fa-triangle-exclamation"></i> Gi\u1EDBi h\u1EA1n t\u1ED5ng li\u1EC1u CPT: T\u1ED1i \u0111a 60 ml/kg. N\u1EBFu t\u1ED5ng CPT \u2265 60 ml/kg m\xE0 c\xF2n s\u1ED1c -> B\u1EAFt bu\u1ED9c \u0111o CVP v\xE0 xem x\xE9t b\xF9 Albumin 5%!
              </div>
            </div>
          </div>
        `;
          break;
        }
        case "tab-blood": {
          const bloodScen = DENGUE_NON_RESPONSE_SCENARIOS.occult_bleeding;
          const products = plan.bloodProducts;
          body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-danger); margin:0;">
                  <i class="fa-solid fa-droplet"></i> ${bloodScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${bloodScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge cdss-dose-badge--danger">${bloodScen.tag}</span>
            </div>

            <!-- B\u1EA3ng T\xEDnh Ch\u1EBF Ph\u1EA9m M\xE1u Theo C\xE2n N\u1EB7ng B\u1EC7nh Nh\xE2n -->
            <table class="cdss-ref-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Ch\u1EBF Ph\u1EA9m M\xE1u / Thu\u1ED1c</th>
                  <th style="width: 25%;">Li\u1EC1u T\xEDnh Ra (${effectiveWeight}kg)</th>
                  <th style="width: 28%;">Ch\u1EC9 \u0110\u1ECBnh &amp; Ng\u01B0\u1EE1ng Truy\u1EC1n (BYT 2023)</th>
                  <th style="width: 22%;">L\u01B0u \xDD An To\xE0n</th>
                </tr>
              </thead>
              <tbody>
                ${products.map((p) => `
                  <tr>
                    <td>
                      <div style="font-weight:700; color:var(--cdss-text);">${p.productName}</div>
                      <div style="font-size:0.72rem; color:var(--cdss-text-muted);">${p.doseFormula}</div>
                    </td>
                    <td>
                      <span class="cdss-dose-badge ${p.thresholdMet ? "cdss-dose-badge--danger" : ""}">${p.calculatedDose}</span>
                    </td>
                    <td style="font-size:0.76rem;">${p.indication}</td>
                    <td style="font-size:0.74rem; color:var(--cdss-text-muted);">${p.precautions}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>

            <!-- B\u1EA3ng T\xEDnh B\xF9 Albumin Theo C\xF4ng Th\u1EE9c Q\u0110 2760 -->
            <div class="cdss-albumin-calc-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                <div style="font-size:0.9rem; font-weight:800; color:var(--cdss-primary);">
                  <i class="fa-solid fa-flask-vial"></i> B\u1EA3ng T\xEDnh B\xF9 Albumin (B\u1ED9 Y T\u1EBF Trang 20 - Q\u0110 2760)
                </div>
                <span class="cdss-brand-badge">\xC1p l\u1EF1c keo</span>
              </div>
              <div style="font-size:0.8rem; color:var(--cdss-text); margin-bottom:0.6rem;">
                ${albuminCalc.indicationNotes}
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.6rem; background:var(--cdss-surface); border-radius:6px; padding:0.6rem; border:1px solid var(--cdss-border);">
                <div>
                  <div style="font-size:0.72rem; color:var(--cdss-text-muted);">Li\u1EC1u Albumin nguy\xEAn ch\u1EA5t</div>
                  <strong style="font-size:1.05rem; color:var(--cdss-primary); font-family:var(--cdss-font-mono);">${albuminCalc.albuminGrams} g</strong>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted);">C\u1EA7n ${albuminCalc.vials20Percent50ml} l\u1ECD Albumin 20% 50ml</div>
                </div>
                <div>
                  <div style="font-size:0.72rem; color:var(--cdss-text-muted);">C\xE1ch pha 5% (chu\u1EA9n)</div>
                  <div style="font-size:0.76rem; font-weight:600;">${albuminCalc.preparation5Percent}</div>
                </div>
                <div>
                  <div style="font-size:0.72rem; color:var(--cdss-text-muted);">T\u1ED1c \u0111\u1ED9 truy\u1EC1n khuy\u1EBFn c\xE1o</div>
                  <div style="font-size:0.76rem; font-weight:700; color:var(--cdss-primary);">${albuminCalc.infusionRateMlH}</div>
                </div>
              </div>
            </div>
          </div>
        `;
          break;
        }
        case "tab-cvp": {
          const cvpScen = DENGUE_NON_RESPONSE_SCENARIOS.refractory_shock_cvp;
          const testDose = Math.round(5 * effectiveWeight);
          body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-purple); margin:0;">
                  <i class="fa-solid fa-gauge-high"></i> ${cvpScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${cvpScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge" style="background:var(--cdss-purple-light); color:var(--cdss-purple); border-color:var(--cdss-purple);">
                ${cvpScen.tag}
              </span>
            </div>

            <!-- Khuy\u1EBFn c\xE1o \u0111\u1EB7t Catheter T\u0129nh M\u1EA1ch N\u1EC1n Khu\u1EF7u Tay -->
            <div style="background:rgba(139, 92, 246, 0.05); border:1px solid rgba(139, 92, 246, 0.2); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--cdss-purple); margin-bottom:0.35rem;">
                <i class="fa-solid fa-triangle-exclamation"></i> K\u1EF8 THU\u1EACT \u0110\u1EB6T CVP B\u1EAET BU\u1ED8C: QUA T\u0128NH M\u1EA0CH N\u1EC0N KHU\u1EF6U TAY (SELDINGER C\u1EA2I TI\u1EBEN)
              </div>
              <div style="font-size:0.78rem; line-height:1.45; color:var(--cdss-text);">
                <strong>Tuy\u1EC7t \u0111\u1ED1i KH\xD4NG ch\u1ECDc t\u0129nh m\u1EA1ch c\u1EA3nh trong ho\u1EB7c d\u01B0\u1EDBi \u0111\xF2n:</strong> B\u1EC7nh nh\xE2n SXHD n\u1EB7ng c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u v\xE0 gi\u1EA3m ti\u1EC3u c\u1EA7u s\xE2u; nguy c\u01A1 t\u1EE5 m\xE1u ch\xE8n \xE9p kh\xED qu\u1EA3n v\xE0 tr\xE0n m\xE1u m\xE0ng ph\u1ED5i t\u1EED vong kh\xF4ng th\u1EC3 \xE9p c\u1EA7m m\xE1u \u0111\u01B0\u1EE3c. \u0110\u1EB7t TM n\u1EC1n khu\u1EF7u tay \xE9p c\u1EA7m m\xE1u d\u1EC5 d\xE0ng v\xE0 an to\xE0n 100%.
              </div>
            </div>

            <!-- Test D\u1ECBch & Ph\xE2n Nh\xE1nh CVP -->
            <div style="background:var(--cdss-surface-alt); border:1px solid var(--cdss-border); border-radius:8px; padding:0.85rem; margin-bottom:1rem;">
              <div style="font-size:0.85rem; font-weight:800; margin-bottom:0.4rem; color:var(--cdss-text);">
                <i class="fa-solid fa-vial"></i> Test D\u1ECBch \u0110o CVP: Cao Ph\xE2n T\u1EED 5 ml/kg trong 30 ph\xFAt (${testDose} ml)
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-top:0.6rem;">
                <div style="background:var(--cdss-surface); border:1px solid rgba(2, 132, 199, 0.3); border-radius:6px; padding:0.75rem; border-top:3px solid var(--cdss-primary);">
                  <div style="font-weight:800; color:var(--cdss-primary); font-size:0.88rem; margin-bottom:0.25rem;">
                    1. N\u1EBFu CVP \u2264 15 cmH2O (IVC x\u1EB9p)
                  </div>
                  <div style="font-size:0.78rem; line-height:1.4; color:var(--cdss-text-muted);">
                    \u2022 V\u1EABn c\xF2n thi\u1EBFu th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n h\u1EEFu hi\u1EC7u.<br>
                    \u2022 Ti\u1EBFp t\u1EE5c truy\u1EC1n Cao Ph\xE2n T\u1EED 10 - 20 ml/kg/h.<br>
                    \u2022 N\u1EBFu t\u1ED5ng CPT \u2265 60 ml/kg k\xE8m Albumin < 2.5 g/dL: B\xF9 Albumin 5% ho\u1EB7c 10%.
                  </div>
                </div>

                <div style="background:var(--cdss-surface); border:1px solid rgba(239, 68, 68, 0.3); border-radius:6px; padding:0.75rem; border-top:3px solid var(--cdss-danger);">
                  <div style="font-weight:800; color:var(--cdss-danger); font-size:0.88rem; margin-bottom:0.25rem;">
                    2. N\u1EBFu CVP > 15 cmH2O (IVC c\u0103ng to)
                  </div>
                  <div style="font-size:0.78rem; line-height:1.4; color:var(--cdss-text-muted);">
                    \u2022 Qu\xE1 t\u1EA3i th\u1EC3 t\xEDch ho\u1EB7c suy co b\xF3p tim.<br>
                    \u2022 Ng\u01B0ng d\u1ECBch n\u1EBFu c\xF3 d\u1EA5u hi\u1EC7u qu\xE1 t\u1EA3i.<br>
                    \u2022 <strong>Dobutamin 3 - 10 \xB5g/kg/ph\xFAt</strong> t\u0103ng co b\xF3p c\u01A1 tim.<br>
                    \u2022 Ph\u1ED1i h\u1EE3p <strong>Noradrenalin</strong> n\u1EBFu HA t\xE2m tr\u01B0\u01A1ng t\u1EE5t (s\u1ED1c \u1EA5m).<br>
                    \u2022 Ph\u1ED1i h\u1EE3p <strong>Adrenalin</strong> n\u1EBFu s\u1ED1c kh\xE1ng tr\u1ECB co b\xF3p tim suy gi\u1EA3m.
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
          break;
        }
        case "tab-abcs": {
          const abcs = plan.abcsChecklist;
          body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-text); margin:0;">
                <i class="fa-solid fa-kit-medical text-primary"></i> G\xF3i H\u1ED3i S\u1EE9c To\xE0n Di\u1EC7n ABCS (Ph\u1EE5 L\u1EE5c 16.2 &amp; 18)
              </h3>
              <span class="cdss-brand-badge">B\u1EAFt bu\u1ED9c khi s\u1ED1c tr\u01A1</span>
            </div>
            <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-bottom:0.85rem;">
              \u1EDE m\u1ECDi b\u1EC7nh nh\xE2n s\u1ED1c SXHD kh\xF4ng \u0111\xE1p \u1EE9ng b\xF9 d\u1ECBch ho\u1EB7c t\xE1i s\u1ED1c nhi\u1EC1u l\u1EA7n, b\u1EAFt bu\u1ED9c r\xE0 so\xE1t \u0111\u1ED3ng th\u1EDDi 4 y\u1EBFu t\u1ED1 c\u01A1 b\u1EA3n ABCS \u0111\u1EC3 \u0111\u1EA3o ng\u01B0\u1EE3c toan ki\u1EC1m, h\u1EA1 canxi v\xE0 suy t\u1EA1ng:
            </div>

            <div class="cdss-abcs-grid">
              <div class="cdss-abcs-card cdss-abcs-card--acidosis">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-vial-virus text-danger"></i> ${abcs.acidosis.title}
                </div>
                <div class="cdss-abcs-criteria">Ng\u01B0\u1EE1ng: ${abcs.acidosis.criteria}</div>
                <div class="cdss-abcs-action">${abcs.acidosis.action}</div>
              </div>

              <div class="cdss-abcs-card cdss-abcs-card--bleeding">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-droplet text-danger"></i> ${abcs.bleeding.title}
                </div>
                <div class="cdss-abcs-criteria">Ng\u01B0\u1EE1ng: ${abcs.bleeding.criteria}</div>
                <div class="cdss-abcs-action">${abcs.bleeding.action}</div>
              </div>

              <div class="cdss-abcs-card cdss-abcs-card--calcium">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-bone text-warning"></i> ${abcs.calcium.title}
                </div>
                <div class="cdss-abcs-criteria">Ng\u01B0\u1EE1ng: ${abcs.calcium.criteria}</div>
                <div class="cdss-abcs-action">${abcs.calcium.action}</div>
              </div>

              <div class="cdss-abcs-card cdss-abcs-card--sugar">
                <div class="cdss-abcs-card-title">
                  <i class="fa-solid fa-cubes-stacked text-success"></i> ${abcs.sugar.title}
                </div>
                <div class="cdss-abcs-criteria">Ng\u01B0\u1EE1ng: ${abcs.sugar.criteria}</div>
                <div class="cdss-abcs-action">${abcs.sugar.action}</div>
              </div>
            </div>
          </div>
        `;
          break;
        }
        case "tab-liver": {
          const nac = plan.nacProtocol;
          const liverScen = DENGUE_NON_RESPONSE_SCENARIOS.acute_liver_failure;
          body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-danger); margin:0;">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${liverScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${liverScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge cdss-dose-badge--danger">${liverScen.tag}</span>
            </div>

            <!-- C\u1EA3nh B\xE1o Ch\u1ED1ng Ch\u1EC9 \u0110\u1ECBnh Tuy\u1EC7t \u0110\u1ED1i Ringer Lactate & Paracetamol -->
            <div style="background:rgba(239, 68, 68, 0.08); border:1.5px solid var(--cdss-danger); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.9rem; font-weight:800; color:var(--cdss-danger); margin-bottom:0.35rem;">
                <i class="fa-solid fa-ban"></i> CH\u1ED0NG CH\u1EC8 \u0110\u1ECANH TUY\u1EC6T \u0110\u1ED0I RINGER LACTATE &amp; PARACETAMOL!
              </div>
              <div style="font-size:0.78rem; line-height:1.45; color:var(--cdss-text);">
                Khi gan t\u1ED5n th\u01B0\u01A1ng n\u1EB7ng ho\u1EB7c suy gan c\u1EA5p (AST/ALT \u2265 1000 U/L), gan kh\xF4ng chuy\u1EC3n h\xF3a \u0111\u01B0\u1EE3c lactate d\u1EABn \u0111\u1EBFn b\xF9ng ph\xE1t toan lactic t\u1EED vong. D\u1ECBch thay th\u1EBF b\u1EAFt bu\u1ED9c: <strong>NaCl 0.9% ho\u1EB7c Ringer Acetate, Dextrosaline</strong>. H\u1EA1 s\u1ED1t b\u1EB1ng lau m\xE1t n\u01B0\u1EDBc \u1EA5m.
              </div>
            </div>

            <!-- B\u1EA3ng Ph\xE1c \u0110\u1ED3 N-Acetylcysteine 4 Pha -->
            <div style="font-size:0.85rem; font-weight:800; color:var(--cdss-text); margin-bottom:0.4rem;">
              Ph\xE1c \u0110\u1ED3 Truy\u1EC1n N-Acetylcysteine (NAC) T\u0129nh M\u1EA1ch 4 Pha (Ph\u1EE5 L\u1EE5c 26 - Q\u0110 2760)
            </div>
            <table class="cdss-ref-table">
              <thead>
                <tr>
                  <th style="width: 25%;">Giai \u0110o\u1EA1n</th>
                  <th style="width: 20%;">Li\u1EC1u mg/kg</th>
                  <th style="width: 25%;">T\u1ED5ng L\u01B0\u1EE3ng (${effectiveWeight}kg)</th>
                  <th style="width: 30%;">Dung M\xF4i &amp; T\u1ED1c \u0110\u1ED9 B\u01A1m Ti\xEAm</th>
                </tr>
              </thead>
              <tbody>
                ${nac.phases.map((p) => `
                  <tr>
                    <td><strong>${p.phaseName}</strong></td>
                    <td><span class="cdss-dose-badge">${p.doseMgKg} mg/kg</span></td>
                    <td><strong>${p.totalMg.toLocaleString("vi-VN")} mg</strong></td>
                    <td style="font-size:0.78rem;">
                      <div>${p.diluent}</div>
                      <div style="color:var(--cdss-primary); font-weight:700;">T\u1ED1c \u0111\u1ED9: ${p.pumpRateMlH}</div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;
          break;
        }
        case "tab-overload": {
          const overScen = DENGUE_NON_RESPONSE_SCENARIOS.fluid_overload;
          const furoDose = Math.round(0.75 * effectiveWeight * 10) / 10;
          body.innerHTML = `
          <div class="cdss-tab-pane active">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
              <div>
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--cdss-warning); margin:0;">
                  <i class="fa-solid fa-water"></i> ${overScen.name}
                </h3>
                <div style="font-size:0.8rem; color:var(--cdss-text-muted); margin-top:2px;">
                  ${overScen.triggerCriteria}
                </div>
              </div>
              <span class="cdss-dose-badge" style="background:var(--cdss-warning-light); color:var(--cdss-warning); border-color:var(--cdss-warning);">
                ${overScen.tag}
              </span>
            </div>

            <!-- X\u1EED Tr\xED Kh\u1EA9n C\u1EA5p -->
            <div style="background:rgba(245, 158, 11, 0.08); border:1.5px solid var(--cdss-warning); border-radius:8px; padding:0.85rem 1rem; margin-bottom:1rem;">
              <div style="font-size:0.9rem; font-weight:800; color:var(--cdss-warning); margin-bottom:0.35rem;">
                <i class="fa-solid fa-stop-circle"></i> NG\u01AFNG NGAY D\u1ECACH TRUY\u1EC0N T\u0128NH M\u1EA0CH!
              </div>
              <div style="font-size:0.8rem; line-height:1.45; color:var(--cdss-text);">
                (1) N\u1EB1m \u0111\u1EA7u cao 30 - 45\xB0.<br>
                (2) Th\u1EDF oxy qua canulla 2 - 5 L/p -> Th\u1EDF NCPAP \xE1p l\u1EF1c 4 - 6 cmH2O n\u1EBFu SpO2 < 92%.<br>
                (3) <strong>Furosemide:</strong> 0.5 - 1 mg/kg ti\xEAm TM ch\u1EADm (B\u1EC7nh nh\xE2n ${effectiveWeight}kg: <strong>${furoDose} mg</strong> TM). <em>Ch\u1EC9 d\xF9ng khi huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh</em>.<br>
                (4) <strong>Dobutamin:</strong> 5 - 10 \xB5g/kg/ph\xFAt \u0111\u1EC3 t\u0103ng co b\xF3p c\u01A1 tim, gi\u1EA3m \xE1p l\u1EF1c mao m\u1EA1ch ph\u1ED5i b\xEDt.<br>
                (5) Ch\u1ECDc h\xFAt gi\u1EA3i \xE1p m\xE0ng b\u1EE5ng/m\xE0ng ph\u1ED5i khi suy h\xF4 h\u1EA5p n\u1EB7ng v\xE0 \xE1p l\u1EF1c b\xE0ng quang > 27 cmH2O.
              </div>
            </div>
          </div>
        `;
          break;
        }
      }
    }
    // VIEW 3: THUỐC VẬN MẠCH 4 LOẠI BƠM TIÊM ĐIỆN 50ML
    renderVasopressorsView(container, plan) {
      const {
        vasopressorDopamin: d,
        vasopressorNoradrenalin: n,
        vasopressorDobutamin: dob,
        vasopressorAdrenalin: adr
      } = plan;
      container.innerHTML = `
      <div class="cdss-card" style="margin-top:0;">
        <div class="cdss-card-header">
          <div>
            <h2 class="cdss-card-title">
              <i class="fa-solid fa-syringe text-primary"></i> Ph\xE1c \u0110\u1ED3 4 Thu\u1ED1c V\u1EADn M\u1EA1ch B\u01A1m Ti\xEAm \u0110i\u1EC7n 50ml
            </h2>
            <div style="font-size:0.78rem; color:var(--cdss-text-muted); margin-top:2px;">
              Chu\u1EA9n h\xF3a 100% theo Ph\u1EE5 l\u1EE5c 15 &amp; 18 \u2014 Quy\u1EBFt \u0111\u1ECBnh 2760/Q\u0110-BYT (T\xEDnh theo ${plan.weightResult.adjustedWeightKg} kg c\xE2n t\xEDnh d\u1ECBch)
            </div>
          </div>
          <span class="cdss-brand-badge">B\u01A1m Ti\xEAm 50ml</span>
        </div>

        <div style="padding:1rem;">
          <div class="cdss-vaso-quad-grid">
            <!-- 1. Dopamin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name cdss-drug-name--primary">1. Dopamin</div>
                  <div class="cdss-drug-indication">L\u1EF1a ch\u1ECDn \u0111\u1EA7u tay \u1EDF tr\u1EBB em</div>
                </div>
                <span class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">1 ml/h = 1 \xB5g</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
                  <span><strong>${d.totalMg} mg</strong> Dopamin (3 \xD7 ${d.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung m\xF4i:</span>
                  <span>Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight text-primary">
                  <span>Quy \u0111\u1ED5i li\u1EC1u:</span>
                  <span>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 1 \xB5g/kg/ph\xFAt</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Li\u1EC1u Khuy\u1EBFn C\xE1o</div>
                  <strong>${d.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">T\u1ED1c \u0110\u1ED9 B\u01A1m</div>
                  <strong style="color:var(--cdss-primary); font-size:1.05rem;">${d.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${d.precautions}</span>
              </p>
            </div>

            <!-- 2. Noradrenalin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name cdss-drug-name--danger">2. Noradrenalin</div>
                  <div class="cdss-drug-indication">S\u1ED1c gi\xE3n m\u1EA1ch / T\u1EE5t HA t\xE2m tr\u01B0\u01A1ng / Ng\u01B0\u1EDDi l\u1EDBn</div>
                </div>
                <span class="cdss-brand-badge cdss-brand-badge--danger">High Alert</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
                  <span><strong>${n.totalMg} mg</strong> Noradrenalin (0.3 \xD7 ${n.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung m\xF4i:</span>
                  <span>Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight text-danger">
                  <span>Quy \u0111\u1ED5i li\u1EC1u:</span>
                  <span>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 0.1 \xB5g/kg/ph\xFAt</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Li\u1EC1u Kh\u1EDFi \u0110\u1EA7u</div>
                  <strong>${n.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">T\u1ED1c \u0110\u1ED9 B\u01A1m</div>
                  <strong style="color:var(--cdss-danger); font-size:1.05rem;">${n.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${n.precautions}</span>
              </p>
            </div>

            <!-- 3. Dobutamin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name" style="color:var(--cdss-purple);">3. Dobutamin</div>
                  <div class="cdss-drug-indication">CVP > 15 cmH2O / Gi\u1EA3m co b\xF3p c\u01A1 tim</div>
                </div>
                <span class="cdss-brand-badge" style="background:var(--cdss-purple-light); color:var(--cdss-purple); border-color:var(--cdss-purple);">Inotrope</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
                  <span><strong>${dob.totalMg} mg</strong> Dobutamin (3 \xD7 ${dob.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung m\xF4i:</span>
                  <span>Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight" style="color:var(--cdss-purple);">
                  <span>Quy \u0111\u1ED5i li\u1EC1u:</span>
                  <span>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 1 \xB5g/kg/ph\xFAt</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Li\u1EC1u Kh\u1EDFi \u0110\u1EA7u</div>
                  <strong>${dob.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">T\u1ED1c \u0110\u1ED9 B\u01A1m</div>
                  <strong style="color:var(--cdss-purple); font-size:1.05rem;">${dob.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${dob.precautions}</span>
              </p>
            </div>

            <!-- 4. Adrenalin -->
            <div class="cdss-vaso-card">
              <div class="cdss-vaso-card-header">
                <div>
                  <div class="cdss-drug-name text-danger">4. Adrenalin</div>
                  <div class="cdss-drug-indication">S\u1ED1c kh\xE1ng tr\u1ECB / M\u1EA1ch r\u1EDDi r\u1EA1c / Ng\u1EEBng tu\u1EA7n ho\xE0n</div>
                </div>
                <span class="cdss-brand-badge cdss-brand-badge--danger">C\u1EA5p c\u1EE9u t\u1ED1i kh\u1EA9n</span>
              </div>
              <div class="cdss-recipe-box">
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
                  <span><strong>${adr.totalMg} mg</strong> Adrenalin (0.3 \xD7 ${adr.patientWeightKg} kg)</span>
                </div>
                <div class="cdss-recipe-row">
                  <span class="cdss-recipe-key">Dung m\xF4i:</span>
                  <span>Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
                </div>
                <div class="cdss-recipe-row cdss-recipe-highlight text-danger">
                  <span>Quy \u0111\u1ED5i li\u1EC1u:</span>
                  <span>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 0.1 \xB5g/kg/ph\xFAt</span>
                </div>
              </div>
              <div class="cdss-dosing-strip">
                <div>
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Li\u1EC1u C\u1EE9u Nguy</div>
                  <strong>${adr.standardDoseRange}</strong>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">T\u1ED1c \u0110\u1ED9 B\u01A1m</div>
                  <strong style="color:var(--cdss-danger); font-size:1.05rem;">${adr.recommendedPumpRateMlH}</strong>
                </div>
              </div>
              <p class="cdss-vaso-warning">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${adr.precautions}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    // VIEW 4: ĐIỀU DƯỠNG AN TOÀN & BẢNG KIỂM
    renderNursingChecklistView(container, plan) {
      container.innerHTML = `
      <div class="cdss-card" style="margin-top:0;">
        <div class="cdss-card-header">
          <h2 class="cdss-card-title">
            <i class="fa-solid fa-user-nurse text-success"></i> Quy Tr\xECnh \u0110i\u1EC1u D\u01B0\u1EE1ng An To\xE0n &amp; B\u1EA3ng Ki\u1EC3m T\u1EA1i Gi\u01B0\u1EDDng
          </h2>
          <span class="cdss-brand-badge">HKKK Chu\u1EA9n BYT</span>
        </div>
        <div style="padding:1rem;">
          <ul class="cdss-nursing-list" style="margin:0;">
            ${plan.nursingInstructions.map((item) => `
              <li class="cdss-nursing-item">
                <i class="fa-solid fa-circle-check"></i>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      </div>
    `;
    }
    updateMobileStickyBar(plan) {
      const elWeight = document.getElementById("mbar-weight");
      const elSeverity = document.getElementById("mbar-severity-badge");
      const elVolume = document.getElementById("mbar-volume-sub");
      if (elWeight) {
        elWeight.textContent = `${plan.weightResult.adjustedWeightKg} kg`;
      }
      if (elSeverity) {
        const sevMap = {
          warning_signs: "D\u1EA5u Hi\u1EC7u C\u1EA3nh B\xE1o",
          shock: "S\u1ED1c SXHD",
          severe_shock: "S\u1ED1c Nguy K\u1ECBch"
        };
        elSeverity.textContent = sevMap[plan.patient.severity];
      }
      if (elVolume) {
        elVolume.textContent = `T\u1ED5ng: ${plan.totalVolumeMl.toLocaleString("vi-VN")} ml (${plan.totalDurationHours}h)`;
      }
    }
    renderPrintSheet(plan) {
      const el = document.getElementById("cdss-print-sheet");
      if (!el) return;
      const {
        patient,
        weightResult,
        fluidRows,
        totalVolumeMl,
        totalDurationHours,
        vasopressorDopamin: d,
        vasopressorNoradrenalin: n,
        vasopressorDobutamin: dob,
        branchDecision
      } = plan;
      const now = /* @__PURE__ */ new Date();
      const dateFormatted = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getFullYear()} ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const severityText = patient.severity === "warning_signs" ? "C\xF3 D\u1EA5u Hi\u1EC7u C\u1EA3nh B\xE1o (DHCB)" : patient.severity === "shock" ? "S\u1ED1c S\u1ED1t Xu\u1EA5t Huy\u1EBFt Dengue (C\xF2n B\xF9)" : "S\u1ED1c S\u1ED1t Xu\u1EA5t Huy\u1EBFt Dengue Nguy K\u1ECBch (M\u1EA1ch 0, HA 0)";
      const genderText = patient.gender === "male" ? "Nam" : "N\u1EEF";
      const mlPerKg = Math.round(totalVolumeMl / weightResult.adjustedWeightKg);
      const bottles500 = Math.ceil(totalVolumeMl / 500);
      el.innerHTML = `
      <div class="cdss-print-page">
        <!-- HEADER C\u01A0 QUAN & TI\xCAU \u0110\u1EC0 PHI\u1EBEU IN -->
        <div class="cdss-print-meta-top">
          <div class="cdss-print-left-org">
            <div style="font-weight:bold; text-transform:uppercase;">KHOA C\u1EA4P C\u1EE8U / H\u1ED2I S\u1EE8C T\xCDCH C\u1EF0C</div>
            <div>B\u1EC6NH \xC1N S\u1ED0: ................................</div>
            <div>PH\xD2NG / GI\u01AF\u1EDCNG: ........................</div>
          </div>
          <div class="cdss-print-right-org">
            <div style="font-weight:bold;">C\u1ED8NG H\xD2A X\xC3 H\u1ED8I CH\u1EE6 NGH\u0128A VI\u1EC6T NAM</div>
            <div style="font-style:italic;">\u0110\u1ED9c l\u1EADp - T\u1EF1 do - H\u1EA1nh ph\xFAc</div>
            <div style="font-size:0.85em; margin-top:2px;">Th\u1EDDi \u0111i\u1EC3m l\u1EADp phi\u1EBFu: ${dateFormatted}</div>
          </div>
        </div>

        <div class="cdss-print-title-area">
          <h1 class="cdss-print-main-title">PHI\u1EBEU Y L\u1EC6NH TRUY\u1EC0N D\u1ECACH &amp; CH\u1ED0NG S\u1ED0C SXHD DENGUE</h1>
          <div class="cdss-print-sub-title">(Theo H\u01B0\u1EDBng d\u1EABn Ch\u1EA9n \u0111o\xE1n &amp; \u0110i\u1EC1u tr\u1ECB S\u1ED1t Xu\u1EA5t Huy\u1EBFt Dengue \u2014 Quy\u1EBFt \u0111\u1ECBnh 2760/Q\u0110-BYT 2023)</div>
        </div>

        <!-- TH\xD4NG TIN B\u1EC6NH NH\xC2N & \u0110\xC1NH GI\xC1 C\xC2N N\u1EB6NG CDC 2014 -->
        <div class="cdss-print-patient-box">
          <div class="cdss-print-row">
            <span>H\u1ECD v\xE0 t\xEAn ng\u01B0\u1EDDi b\u1EC7nh: <strong>...........................................................................</strong></span>
            <span>Tu\u1ED5i: <strong>${patient.ageYears} tu\u1ED5i</strong></span>
            <span>Gi\u1EDBi t\xEDnh: <strong>${genderText}</strong></span>
          </div>

          <div class="cdss-print-row" style="margin-top: 5px;">
            <span>C\xE2n th\u1EF1c t\u1EBF: <strong>${weightResult.actualWeightKg} kg</strong></span>
            <span>Chu\u1EA9n CDC 2014: <strong>${weightResult.standardWeightKg} kg</strong></span>
            <span class="cdss-print-weight-highlight">
              C\xC2N T\xCDNH D\u1ECACH (CDSS): <strong>${weightResult.adjustedWeightKg} kg</strong>
              ${weightResult.isObese ? "<em>(HI\u1EC6U CH\u1EC8NH TR\u1EBA B\xC9O PH\xCC &gt; 120% CHU\u1EA8N)</em>" : ""}
            </span>
          </div>

          <div class="cdss-print-row" style="margin-top: 5px;">
            <span>Ch\u1EA9n \u0111o\xE1n / Ph\xE2n \u0111\u1ED9: <strong style="text-transform:uppercase;">${severityText}</strong></span>
            <span>\u0110\xE1p \u1EE9ng l\xE2m s\xE0ng: <strong>${branchDecision.title}</strong></span>
          </div>
        </div>

        <!-- Y L\u1EC6NH X\u1EEC TR\xCD KH\xD4NG \u0110\xC1P \u1EE8NG N\u1EBEU C\xD3 -->
        ${branchDecision.branchType !== "standard" ? `
          <div style="border:1.5px solid #000; padding:6px 10px; margin-bottom:8px; background:#fff7ed;">
            <div style="font-weight:bold; font-size:10pt; text-transform:uppercase; color:#b91c1c;">
              [!] Y L\u1EC6NH X\u1EEC TR\xCD KHI KH\xD4NG \u0110\xC1P \u1EE8NG: ${branchDecision.title}
            </div>
            <div style="font-size:9pt; margin-top:2px;">
              <strong>H\u01B0\u1EDBng x\u1EED tr\xED:</strong> ${branchDecision.recommendedFluid} | <strong>L\xFD do:</strong> ${branchDecision.reasoning}
            </div>
          </div>
        ` : ""}

        <!-- B\u1EA2NG \u0110I\u1EC0U PH\u1ED0I C\u1ECCC D\u1ECACH 4 C\u1ED8T CHU\u1EA8N H\xD3A (TR\u1ECCNG T\xC2M PHI\u1EBEU IN) -->
        <table class="cdss-print-table">
          <thead>
            <tr>
              <th style="width: 17%;">M\u1ED0C GI\u1EDC & TH\u1EDCI L\u01AF\u1EE2NG</th>
              <th style="width: 25%;">T\u1ED0C \u0110\u1ED8 & L\u01AF\u1EE2NG D\u1ECACH C\u1EA6N</th>
              <th style="width: 24%;">\u0110I\u1EC0U PH\u1ED0I T\u1EA0I C\u1ECCC</th>
              <th style="width: 22%;">GI\xC1M S\xC1T & \u0110O L\u1EA0I HCT</th>
              <th style="width: 12%;">\u0110D TH\u1EF0C HI\u1EC6N</th>
            </tr>
          </thead>
          <tbody>
            ${fluidRows.map((r) => `
              <tr>
                <td style="text-align: center;">
                  <div style="font-weight: bold; font-size: 1.05em;">C\u1EEF ${r.stepIndex} (${r.durationHours}h)</div>
                  <div style="font-weight: 600; margin: 2px 0;">${r.timeWindow}</div>
                  <div style="font-size: 0.82em; color: #444;">${r.stageName}</div>
                </td>
                <td>
                  <div>T\u1ED1c \u0111\u1ED9: <strong style="font-size: 1.15em;">${r.rateMlKgH} ml/kg/h</strong></div>
                  <div>S\u1ED1 gi\u1ECDt: <strong>${r.dropsPerMin} gi\u1ECDt/ph\xFAt</strong> <small>(d\xE2y 20 gi\u1ECDt/ml)</small></div>
                  <div>L\u01B0\u1EE3ng d\u1ECBch c\u1EA7n: <strong>${r.totalMl.toLocaleString("vi-VN")} ml</strong></div>
                </td>
                <td>
                  <div>D\u1ECBch c\xF3 s\u1EB5n t\u1EEB c\u1EEF tr\u01B0\u1EDBc: <strong>${r.existingFluidMl} ml</strong></div>
                  <div style="font-weight: bold; margin: 2px 0;">
                    ${r.bottlesToHang > 0 ? `Treo th\xEAm: +${r.bottlesToHang} chai 500ml` : "Kh\xF4ng c\u1EA7n treo th\xEAm chai"}
                  </div>
                  <div>T\u1ED5ng c\xF3 t\u1EA1i c\u1ECDc: <strong>${r.totalAtPoleMl.toLocaleString("vi-VN")} ml</strong></div>
                </td>
                <td>
                  ${r.hctCheckRequired ? `
                    <div style="font-weight: bold; color: #b91c1c; margin-bottom: 2px;">
                      [!] B\u1EAET BU\u1ED8C \u0110O L\u1EA0I HCT
                    </div>
                  ` : ""}
                  <div style="font-size: 0.82em; line-height: 1.3;">${r.monitoringNotes}</div>
                </td>
                <td style="text-align: center; vertical-align: middle;">
                  <div style="font-size: 0.78em; color: #555;">B\u1EAFt \u0111\u1EA7u: ....h....</div>
                  <div style="font-size: 0.78em; margin-top: 14px;">K\xFD: ..............</div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>

        <!-- T\u1ED4NG K\u1EBET D\u1ECACH TRUY\u1EC0N D\u1EF0 KI\u1EBEN -->
        <div class="cdss-print-summary-strip">
          <span>T\u1ED5ng l\u01B0\u1EE3ng d\u1ECBch b\xF9: <strong>${totalVolumeMl.toLocaleString("vi-VN")} ml</strong> (~ <strong>${mlPerKg} ml/kg</strong>)</span>
          <span>Th\u1EDDi gian d\u1EF1 ki\u1EBFn: <strong>${totalDurationHours} gi\u1EDD</strong> (${fluidRows.length} c\u1EEF)</span>
          <span>\u01AF\u1EDBc t\xEDnh s\u1ED1 chai 500ml: <strong>${bottles500} chai</strong> (Ringer Lactate / NaCl 0.9%)</span>
        </div>

        <!-- PH\xC1C \u0110\u1ED2 V\u1EACN M\u1EA0CH B\u01A0M TI\xCAM \u0110I\u1EC6N 50ML -->
        <div class="cdss-print-vaso-box">
          <div style="font-weight: bold; text-transform: uppercase; font-size: 0.88em; margin-bottom: 3px; border-bottom: 1px dotted #666; padding-bottom: 2px;">
            PH\xC1C \u0110\u1ED2 THU\u1ED0C V\u1EACN M\u1EA0CH B\u01A0M TI\xCAM \u0110I\u1EC6N 50ML (\xC1P D\u1EE4NG KHI T\xC1I S\u1ED0C HO\u1EB6C S\u1ED0C TR\u01A0 D\u1ECACH TRUY\u1EC0N)
          </div>
          <div class="cdss-print-vaso-grid">
            <div class="cdss-print-vaso-col">
              <strong>1. Dopamin (\u0110\u1EA7u tay tr\u1EBB em):</strong> ${d.totalMg} mg (3 \xD7 ${d.patientWeightKg}kg) pha v\u1EEBa \u0111\u1EE7 50ml Glucose 5%. 
              <em>Quy \u0111\u1ED5i: 1 ml/h = 1 \xB5g/kg/ph\xFAt</em>. Li\u1EC1u khuy\u1EBFn c\xE1o: ${d.standardDoseRange} (T\u1ED1c \u0111\u1ED9 b\u01A1m: <strong>${d.recommendedPumpRateMlH}</strong>).
            </div>
            <div class="cdss-print-vaso-col">
              <strong>2. Noradrenalin (S\u1ED1c gi\xE3n m\u1EA1ch / ng\u01B0\u1EDDi l\u1EDBn):</strong> ${n.totalMg} mg (0.3 \xD7 ${n.patientWeightKg}kg) pha v\u1EEBa \u0111\u1EE7 50ml Glucose 5%. 
              <em>Quy \u0111\u1ED5i: 1 ml/h = 0.1 \xB5g/kg/ph\xFAt</em>. Li\u1EC1u khuy\u1EBFn c\xE1o: ${n.standardDoseRange} (T\u1ED1c \u0111\u1ED9 b\u01A1m: <strong>${n.recommendedPumpRateMlH}</strong>).
            </div>
            <div class="cdss-print-vaso-col" style="margin-top:4px;">
              <strong>3. Dobutamin (CVP > 15 / Suy tim):</strong> ${dob.totalMg} mg (3 \xD7 ${dob.patientWeightKg}kg) pha 50ml G5%. 
              <em>Quy \u0111\u1ED5i: 1 ml/h = 1 \xB5g/kg/ph\xFAt</em>. T\u1ED1c \u0111\u1ED9: <strong>${dob.recommendedPumpRateMlH}</strong>.
            </div>
            <div class="cdss-print-vaso-col" style="margin-top:4px;">
              <strong>4. G\xF3i ABCS C\u1EA5p C\u1EE9u:</strong> Natri Bicarbonate 4.2% ${Math.round(2 * weightResult.adjustedWeightKg)}ml TM; Calci clorua 10% 2-5ml TM; Dextrose 30% ${Math.round(1.5 * weightResult.adjustedWeightKg)}ml TM.
            </div>
          </div>
        </div>

        <!-- NGUY\xCAN T\u1EAEC \u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N KHI TRUY\u1EC0N D\u1ECACH -->
        <div class="cdss-print-safety-notes">
          <strong>L\u01B0u \xFD \u0111i\u1EC1u d\u01B0\u1EE1ng an to\xE0n:</strong>
          (1) Lu\xF4n \u0111o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng tr\u01B0\u1EDBc khi quy\u1EBFt \u0111\u1ECBnh gi\u1EA3m b\u1EADc d\u1ECBch theo y l\u1EC7nh.
          (2) \u0110\xEDch n\u01B0\u1EDBc ti\u1EC3u t\u1ED1i thi\u1EC3u: &ge; 0.5 - 1 ml/kg/gi\u1EDD.
          (3) B\xE1o b\xE1c s\u0129 ngay n\u1EBFu c\xF3 d\u1EA5u hi\u1EC7u qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n (ph\xF9 mi m\u1EAFt, th\u1EDF nhanh co k\xE9o, ran \u1EA9m \u0111\xE1y ph\u1ED5i, gan to nhanh).
          (4) Ng\u01B0ng truy\u1EC1n d\u1ECBch khi m\u1EA1ch, huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh, tho\xE1t s\u1ED1c sau 24-48 gi\u1EDD giai \u0111o\u1EA1n h\u1ED3i ph\u1EE5c.
        </div>

        <!-- CH\u1EEE K\xDD X\xC1C NH\u1EACN Y L\u1EC6NH -->
        <div class="cdss-print-signatures">
          <div class="cdss-print-sign-col">
            <div style="font-weight: bold;">\u0110I\u1EC0U D\u01AF\u1EE0NG THEO D\xD5I & TH\u1EF0C HI\u1EC6N</div>
            <div style="font-style: italic; font-size: 0.85em;">(K\xFD v\xE0 ghi r\xF5 h\u1ECD t\xEAn)</div>
            <div style="margin-top: 45px; font-weight: bold;">............................................................</div>
          </div>
          <div class="cdss-print-sign-col">
            <div style="font-weight: bold;">B\xC1C S\u0128 CH\u1EC8 \u0110\u1ECANH Y L\u1EC6NH</div>
            <div style="font-style: italic; font-size: 0.85em;">(K\xFD v\xE0 ghi r\xF5 h\u1ECD t\xEAn)</div>
            <div style="margin-top: 45px; font-weight: bold;">............................................................</div>
          </div>
        </div>
      </div>
    `;
    }
    copyHandoverReport() {
      if (!this.currentPlan) return;
      const p = this.currentPlan;
      const text = [
        `\u{1F4CB} B\xC1O C\xC1O GIAO BAN D\u1ECACH TRUY\u1EC0N SXHD DENGUE (Q\u0110 2760/Q\u0110-BYT)`,
        `\u2022 B\u1EC7nh nh\xE2n: ${p.patient.ageYears} tu\u1ED5i (${p.patient.gender === "male" ? "Nam" : "N\u1EEF"}) | N\u1EB7ng th\u1EF1c t\u1EBF: ${p.weightResult.actualWeightKg} kg`,
        `\u2022 C\xE2n t\xEDnh d\u1ECBch CDC 2014: ${p.weightResult.adjustedWeightKg} kg ${p.weightResult.isObese ? "(\u0110\xC3 HI\u1EC6U CH\u1EC8NH TR\u1EBA TH\u1EEAA C\xC2N)" : ""}`,
        `\u2022 Ph\xE2n \u0111\u1ED9: ${p.patient.severity === "warning_signs" ? "D\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o" : p.patient.severity === "shock" ? "S\u1ED1c SXHD" : "S\u1ED1c nguy k\u1ECBch"}`,
        `\u2022 \u0110\xE1nh gi\xE1 \u0111\xE1p \u1EE9ng: ${p.branchDecision.title}`,
        `\u2022 H\u01B0\u1EDBng x\u1EED tr\xED: ${p.branchDecision.recommendedFluid}`,
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
      const toastText = document.getElementById("cdss-toast-text");
      if (!toast || !toastText) return;
      toastText.textContent = msg;
      toast.classList.add("visible");
      setTimeout(() => {
        toast.classList.remove("visible");
      }, 3200);
    }
  };
  if (typeof window !== "undefined") {
    window.DengueCDSSController = DengueCDSSController;
  }

  // src/content/docspace/public/cdss/xray/xray-canvas-renderer.ts
  var XRayCanvasRenderer = class {
    constructor(canvas) {
      this.noiseCanvas = null;
      this.W = 600;
      this.H = 750;
      this.examType = "chest_pa";
      this.caseId = "case-copd-001";
      this.patientInfo = { age: 68, gender: "M" };
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
      this.windowPreset = "DEFAULT";
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
      this.initNoiseTexture();
      this.setupCanvasDimensions();
      this.attachEvents();
    }
    setWindowPreset(preset) {
      this.windowPreset = preset;
      switch (preset) {
        case "LUNG":
          this.state.contrast = 25;
          this.state.brightness = -10;
          break;
        case "MEDIASTINUM":
          this.state.contrast = 45;
          this.state.brightness = -25;
          break;
        case "BONE":
          this.state.contrast = 60;
          this.state.brightness = 20;
          break;
        case "HIGH_DYNAMIC":
          this.state.contrast = 70;
          this.state.brightness = 0;
          break;
        case "DEFAULT":
        default:
          this.state.contrast = 0;
          this.state.brightness = 0;
          break;
      }
      this.draw();
    }
    setExamData(examType, findings, activeId, caseId, patientInfo) {
      this.examType = examType;
      this.findings = findings;
      this.activeFindingId = activeId || null;
      if (caseId) this.caseId = caseId;
      if (patientInfo) this.patientInfo = patientInfo;
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
    initNoiseTexture() {
      const nc = document.createElement("canvas");
      nc.width = 128;
      nc.height = 128;
      const nctx = nc.getContext("2d");
      if (!nctx) return;
      const imgData = nctx.createImageData(128, 128);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 45;
        const v = Math.min(255, Math.max(0, 128 + noise));
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 22;
      }
      nctx.putImageData(imgData, 0, 0);
      this.noiseCanvas = nc;
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
              const rad = (f.radius || 40) + 12;
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
    // RENDER BASE ANATOMY OFFSCREEN
    // ==========================================
    renderBaseOffscreen() {
      const ctx = this.offscreenCtx;
      ctx.clearRect(0, 0, this.W, this.H);
      if (this.examType.startsWith("abdomen")) {
        this.renderAbdomenAnatomy(ctx);
      } else {
        this.renderChestAnatomy(ctx);
      }
      if (this.noiseCanvas) {
        ctx.save();
        const pattern = ctx.createPattern(this.noiseCanvas, "repeat");
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, this.W, this.H);
        }
        ctx.restore();
      }
      this.renderDicomMetadataAndLeadMarker(ctx);
    }
    // ==========================================
    // PHOTOREALISTIC CHEST ANATOMY (CXR)
    // ==========================================
    renderChestAnatomy(ctx) {
      const W = this.W;
      const H = this.H;
      const isCopd = this.caseId === "case-copd-001";
      const isPneumonia = this.caseId === "case-pneumonia-001";
      const isCancer = this.caseId === "case-lung-cancer-001";
      const isHeartFailure = this.caseId === "case-heart-failure-001";
      const isPtx = this.caseId === "case-pneumothorax-001";
      const isLoculated = this.caseId === "case-loculated-effusion-001";
      const isEarlyGGO = this.caseId === "case-early-consolidation-001";
      const isApicalTb = this.caseId === "case-apical-tb-cavity-001";
      const isPneumoperitoneum = this.caseId === "case-pneumoperitoneum-001";
      const isArds = this.caseId === "case-ards-covid-001";
      const isMiliary = this.caseId === "case-miliary-tb-001";
      const isPericardial = this.caseId === "case-pericardial-effusion-001";
      const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W * 0.95);
      filmGrad.addColorStop(0, "#0a0d14");
      filmGrad.addColorStop(0.5, "#05070c");
      filmGrad.addColorStop(1, "#020306");
      ctx.fillStyle = filmGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.strokeStyle = "rgba(25, 32, 44, 0.4)";
      ctx.lineWidth = 12;
      this.roundRect(ctx, 10, 10, W - 20, H - 20, 16);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(10px)";
      const softTissueGrad = ctx.createLinearGradient(0, 0, 0, H);
      softTissueGrad.addColorStop(0, "rgba(45, 50, 60, 0.35)");
      softTissueGrad.addColorStop(0.2, "rgba(55, 62, 72, 0.45)");
      softTissueGrad.addColorStop(0.6, "rgba(50, 56, 66, 0.4)");
      softTissueGrad.addColorStop(1, "rgba(35, 40, 48, 0.3)");
      ctx.fillStyle = softTissueGrad;
      ctx.beginPath();
      ctx.moveTo(35, 90);
      ctx.bezierCurveTo(80, 60, 200, 48, 300, 50);
      ctx.bezierCurveTo(400, 48, 520, 60, 565, 90);
      ctx.bezierCurveTo(575, 140, 580, 300, 575, 520);
      ctx.bezierCurveTo(570, 620, 560, 700, 555, H);
      ctx.lineTo(45, H);
      ctx.bezierCurveTo(40, 700, 30, 620, 25, 520);
      ctx.bezierCurveTo(20, 300, 25, 140, 35, 90);
      ctx.closePath();
      ctx.fill();
      if (this.patientInfo.gender === "F" || isHeartFailure) {
        const breastGrad = ctx.createRadialGradient(200, 490, 10, 200, 490, 95);
        breastGrad.addColorStop(0, "rgba(80, 85, 95, 0.35)");
        breastGrad.addColorStop(0.7, "rgba(55, 60, 70, 0.2)");
        breastGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = breastGrad;
        ctx.beginPath();
        ctx.arc(195, 490, 95, 0, Math.PI * 2);
        ctx.fill();
        const breastGradL = ctx.createRadialGradient(405, 490, 10, 405, 490, 95);
        breastGradL.addColorStop(0, "rgba(80, 85, 95, 0.35)");
        breastGradL.addColorStop(0.7, "rgba(55, 60, 70, 0.2)");
        breastGradL.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = breastGradL;
        ctx.beginPath();
        ctx.arc(405, 490, 95, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      const diaphragmY = isCopd ? 610 : 570;
      const lungDarkness = isCopd ? "rgba(2, 3, 5, 0.98)" : "rgba(7, 9, 14, 0.94)";
      ctx.save();
      ctx.filter = "blur(6px)";
      ctx.fillStyle = lungDarkness;
      ctx.beginPath();
      ctx.moveTo(280, 115);
      ctx.bezierCurveTo(270, 200, 260, 350, 270, 470);
      ctx.bezierCurveTo(275, 520, 280, diaphragmY - 20, 290, diaphragmY);
      ctx.bezierCurveTo(240, diaphragmY + 15, 140, diaphragmY + 8, 85, diaphragmY - 20);
      ctx.bezierCurveTo(65, 480, 55, 380, 60, 280);
      ctx.bezierCurveTo(65, 180, 85, 130, 125, 105);
      ctx.bezierCurveTo(175, 80, 245, 90, 280, 115);
      ctx.closePath();
      ctx.fill();
      const leftDiaphragmY = diaphragmY + 15;
      ctx.beginPath();
      ctx.moveTo(320, 115);
      ctx.bezierCurveTo(330, 200, 345, 350, 335, 470);
      ctx.bezierCurveTo(330, 520, 325, leftDiaphragmY - 20, 315, leftDiaphragmY);
      ctx.bezierCurveTo(360, leftDiaphragmY + 15, 460, leftDiaphragmY + 8, 515, leftDiaphragmY - 20);
      ctx.bezierCurveTo(535, 480, 545, 380, 540, 280);
      ctx.bezierCurveTo(535, 180, 515, 130, 475, 105);
      ctx.bezierCurveTo(425, 80, 355, 90, 320, 115);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(1.5px)";
      for (let i = 0; i < 12; i++) {
        const y = 90 + i * 42;
        const vW = 30 + (i > 6 ? (i - 6) * 1.5 : 0);
        const vH = 34;
        const vX = 300 - vW / 2;
        const vGrad = ctx.createLinearGradient(vX, 0, vX + vW, 0);
        vGrad.addColorStop(0, "rgba(110, 115, 125, 0.45)");
        vGrad.addColorStop(0.5, "rgba(145, 150, 165, 0.55)");
        vGrad.addColorStop(1, "rgba(110, 115, 125, 0.45)");
        ctx.fillStyle = vGrad;
        this.roundRect(ctx, vX, y, vW, vH, 4);
        ctx.fill();
        ctx.fillStyle = "rgba(25, 30, 40, 0.6)";
        ctx.fillRect(vX + 2, y + vH, vW - 4, 6);
        ctx.strokeStyle = "rgba(180, 185, 200, 0.5)";
        ctx.lineWidth = 1.8;
        ctx.strokeRect(vX + 3, y + 8, 5, 8);
        ctx.strokeRect(vX + vW - 8, y + 8, 5, 8);
        ctx.fillStyle = "rgba(165, 170, 185, 0.6)";
        ctx.beginPath();
        ctx.ellipse(300, y + 17, 3, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(1.2px)";
      ctx.fillStyle = "rgba(10, 14, 20, 0.95)";
      ctx.strokeStyle = "rgba(150, 155, 168, 0.45)";
      ctx.lineWidth = 1.5;
      const tracheaShift = isPtx ? 8 : 0;
      ctx.beginPath();
      ctx.moveTo(291 + tracheaShift, 70);
      ctx.lineTo(291 + tracheaShift, 265);
      ctx.lineTo(309 + tracheaShift, 265);
      ctx.lineTo(309 + tracheaShift, 70);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(293 + tracheaShift, 265);
      ctx.quadraticCurveTo(275 + tracheaShift, 290, 260 + tracheaShift, 320);
      ctx.lineTo(272 + tracheaShift, 325);
      ctx.quadraticCurveTo(285 + tracheaShift, 295, 300 + tracheaShift, 275);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(307 + tracheaShift, 265);
      ctx.quadraticCurveTo(330 + tracheaShift, 295, 355 + tracheaShift, 325);
      ctx.lineTo(348 + tracheaShift, 335);
      ctx.quadraticCurveTo(320 + tracheaShift, 305, 300 + tracheaShift, 275);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      this.renderRibCage(ctx, isCopd);
      this.renderClaviclesAndScapulae(ctx);
      this.renderPulmonaryVasculature(ctx, isCopd, isHeartFailure, isPtx, isPericardial, isArds, isMiliary, isEarlyGGO);
      this.renderCardiacSilhouette(ctx, isCopd, isHeartFailure, isPtx, isPericardial, isEarlyGGO);
      this.renderHemidiaphragms(ctx, isCopd, isPneumonia, isHeartFailure, isPtx, isLoculated, isPneumoperitoneum, isPericardial);
      this.renderCaseSpecificPathologies(ctx, {
        isCopd,
        isPneumonia,
        isCancer,
        isHeartFailure,
        isPtx,
        isLoculated,
        isEarlyGGO,
        isApicalTb,
        isPneumoperitoneum,
        isArds,
        isMiliary,
        isPericardial
      });
    }
    // ==========================================
    // PHOTOREALISTIC ABDOMEN KUB (BOWEL OBSTRUCTION)
    // ==========================================
    renderAbdomenAnatomy(ctx) {
      const W = this.W;
      const H = this.H;
      const filmGrad = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, W * 0.95);
      filmGrad.addColorStop(0, "#0a0d14");
      filmGrad.addColorStop(0.5, "#05070c");
      filmGrad.addColorStop(1, "#020306");
      ctx.fillStyle = filmGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.filter = "blur(8px)";
      ctx.fillStyle = "rgba(50, 55, 65, 0.4)";
      ctx.beginPath();
      ctx.moveTo(50, 30);
      ctx.bezierCurveTo(70, 200, 65, 450, 55, H);
      ctx.lineTo(545, H);
      ctx.bezierCurveTo(535, 450, 530, 200, 550, 30);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(65, 70, 82, 0.35)";
      ctx.beginPath();
      ctx.moveTo(270, 150);
      ctx.lineTo(150, 560);
      ctx.lineTo(190, 570);
      ctx.lineTo(285, 150);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(330, 150);
      ctx.lineTo(450, 560);
      ctx.lineTo(410, 570);
      ctx.lineTo(315, 150);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.filter = "blur(1.8px)";
      for (let i = 0; i < 5; i++) {
        const y = 140 + i * 55;
        const vW = 55 + i * 2;
        const vH = 42;
        const vX = 300 - vW / 2;
        ctx.fillStyle = "rgba(135, 140, 155, 0.55)";
        this.roundRect(ctx, vX, y, vW, vH, 6);
        ctx.fill();
        ctx.fillStyle = "rgba(25, 30, 40, 0.7)";
        ctx.fillRect(vX + 4, y + vH, vW - 8, 8);
        ctx.fillStyle = "rgba(125, 130, 145, 0.45)";
        ctx.fillRect(vX - 22, y + 12, 22, 12);
        ctx.fillRect(vX + vW, y + 12, 22, 12);
      }
      ctx.strokeStyle = "rgba(145, 150, 168, 0.55)";
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(200, 640, 75, 0.3, Math.PI * 1.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(400, 640, 75, -Math.PI * 0.1, Math.PI * 0.7);
      ctx.stroke();
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = "rgba(130, 135, 150, 0.4)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(270, 70);
      ctx.quadraticCurveTo(170, 95, 80, 120);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(330, 70);
      ctx.quadraticCurveTo(430, 95, 520, 120);
      ctx.stroke();
      ctx.restore();
      this.renderBowelObstructionPathology(ctx);
    }
    // ==========================================
    // DETAILED SKELETAL SYSTEM
    // ==========================================
    renderRibCage(ctx, isCopd) {
      ctx.save();
      ctx.filter = "blur(1.6px)";
      const numRibs = 10;
      const baseSpacing = isCopd ? 48 : 42;
      const startY = isCopd ? 120 : 135;
      for (let i = 0; i < numRibs; i++) {
        const y = startY + i * baseSpacing;
        const ribW = 12 + Math.sin(i / numRibs * Math.PI) * 5;
        const curvature = isCopd ? 0.75 : 1;
        ctx.strokeStyle = "rgba(165, 172, 188, 0.45)";
        ctx.lineWidth = ribW;
        ctx.beginPath();
        ctx.moveTo(280, y - 5);
        ctx.bezierCurveTo(
          210,
          y + 10 * curvature,
          110,
          y + 28 * curvature,
          70,
          y + 55 * curvature
        );
        ctx.stroke();
        ctx.strokeStyle = "rgba(195, 202, 218, 0.65)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(280, y - 5 - ribW / 2);
        ctx.bezierCurveTo(210, y + 10 * curvature - ribW / 2, 110, y + 28 * curvature - ribW / 2, 70, y + 55 * curvature - ribW / 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(165, 172, 188, 0.45)";
        ctx.lineWidth = ribW;
        ctx.beginPath();
        ctx.moveTo(320, y - 5);
        ctx.bezierCurveTo(
          390,
          y + 10 * curvature,
          490,
          y + 28 * curvature,
          530,
          y + 55 * curvature
        );
        ctx.stroke();
        ctx.strokeStyle = "rgba(195, 202, 218, 0.65)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(320, y - 5 - ribW / 2);
        ctx.bezierCurveTo(390, y + 10 * curvature - ribW / 2, 490, y + 28 * curvature - ribW / 2, 530, y + 55 * curvature - ribW / 2);
        ctx.stroke();
      }
      for (let i = 0; i < 8; i++) {
        const y = startY + 60 + i * baseSpacing;
        const ribW = 9;
        ctx.strokeStyle = "rgba(145, 152, 168, 0.3)";
        ctx.lineWidth = ribW;
        ctx.beginPath();
        ctx.moveTo(70, y);
        ctx.quadraticCurveTo(150, y + 45, 240, y + 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(530, y);
        ctx.quadraticCurveTo(450, y + 45, 360, y + 80);
        ctx.stroke();
      }
      ctx.restore();
    }
    renderClaviclesAndScapulae(ctx) {
      ctx.save();
      ctx.filter = "blur(1.5px)";
      ctx.strokeStyle = "rgba(175, 182, 198, 0.65)";
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(275, 135);
      ctx.bezierCurveTo(220, 115, 150, 105, 80, 125);
      ctx.stroke();
      ctx.strokeStyle = "rgba(215, 222, 238, 0.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(275, 130);
      ctx.bezierCurveTo(220, 110, 150, 100, 80, 120);
      ctx.stroke();
      ctx.strokeStyle = "rgba(175, 182, 198, 0.65)";
      ctx.lineWidth = 11;
      ctx.beginPath();
      ctx.moveTo(325, 135);
      ctx.bezierCurveTo(380, 115, 450, 105, 520, 125);
      ctx.stroke();
      ctx.strokeStyle = "rgba(215, 222, 238, 0.75)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(325, 130);
      ctx.bezierCurveTo(380, 110, 450, 100, 520, 120);
      ctx.stroke();
      ctx.strokeStyle = "rgba(115, 120, 135, 0.35)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(65, 150);
      ctx.lineTo(45, 280);
      ctx.lineTo(75, 340);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(535, 150);
      ctx.lineTo(555, 280);
      ctx.lineTo(525, 340);
      ctx.stroke();
      ctx.restore();
    }
    // ==========================================
    // PULMONARY VASCULATURE & BRONCHOVASCULAR TREE
    // ==========================================
    renderPulmonaryVasculature(ctx, isCopd, isHeartFailure, isPtx, isPericardial, isArds, isMiliary, isEarlyGGO) {
      ctx.save();
      ctx.filter = "blur(2px)";
      const hilarAlpha = isHeartFailure ? 0.75 : isPericardial ? 0.38 : isCopd ? 0.65 : 0.55;
      const vesselColor = `rgba(145, 152, 168, ${hilarAlpha})`;
      ctx.strokeStyle = vesselColor;
      ctx.lineWidth = isHeartFailure ? 14 : isPericardial ? 8.5 : 10;
      ctx.beginPath();
      ctx.moveTo(265, 280);
      ctx.quadraticCurveTo(255, 320, 245, 370);
      ctx.stroke();
      ctx.lineWidth = isHeartFailure ? 15 : isPericardial ? 9 : 11;
      ctx.beginPath();
      ctx.moveTo(345, 270);
      ctx.quadraticCurveTo(365, 305, 375, 360);
      ctx.stroke();
      if (!isPtx) {
        const branchesR = [
          // Upper lobe branches
          { from: [260, 290], to: [200, 210], w: isHeartFailure ? 5 : 3.5 },
          { from: [200, 210], to: [170, 160], w: isHeartFailure ? 3.5 : 2 },
          { from: [200, 210], to: [230, 160], w: isHeartFailure ? 3.5 : 2 },
          // Middle & Lower lobe branches
          { from: [250, 350], to: [180, 420], w: isCopd ? 2 : isPericardial ? 2.5 : 4 },
          { from: [180, 420], to: [140, 470], w: isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
          { from: [245, 370], to: [220, 490], w: isCopd ? 2 : isPericardial ? 2.8 : 4.5 },
          { from: [220, 490], to: [190, 540], w: isCopd ? 1 : isPericardial ? 1.8 : 2.5 }
        ];
        branchesR.forEach((b) => {
          ctx.lineWidth = b.w;
          ctx.beginPath();
          ctx.moveTo(b.from[0], b.from[1]);
          ctx.lineTo(b.to[0], b.to[1]);
          ctx.stroke();
        });
      }
      const branchesL = [
        // Upper lobe branches
        { from: [360, 285], to: [420, 210], w: isHeartFailure ? 5 : 3.5 },
        { from: [420, 210], to: [450, 160], w: isHeartFailure ? 3.5 : 2 },
        { from: [420, 210], to: [390, 160], w: isHeartFailure ? 3.5 : 2 },
        // Lower lobe & Lingula branches (Sharp lines passing through GGO)
        { from: [370, 340], to: [440, 420], w: isEarlyGGO ? 3.8 : isCopd ? 2 : isPericardial ? 2.5 : 4 },
        { from: [440, 420], to: [480, 470], w: isEarlyGGO ? 2.4 : isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
        { from: [375, 360], to: [400, 490], w: isEarlyGGO ? 4 : isCopd ? 2 : isPericardial ? 2.8 : 4.5 },
        { from: [400, 490], to: [430, 540], w: isEarlyGGO ? 2.4 : isCopd ? 1 : isPericardial ? 1.8 : 2.5 },
        // Extra lingular subsegmental vessels for early GGO case
        ...isEarlyGGO ? [
          { from: [390, 410], to: [425, 445], w: 2.2 },
          { from: [400, 430], to: [415, 465], w: 1.8 }
        ] : []
      ];
      branchesL.forEach((b) => {
        ctx.lineWidth = b.w;
        ctx.beginPath();
        ctx.moveTo(b.from[0], b.from[1]);
        ctx.lineTo(b.to[0], b.to[1]);
        ctx.stroke();
      });
      if (isMiliary) {
        ctx.strokeStyle = "rgba(175, 182, 200, 0.25)";
        ctx.lineWidth = 0.9;
        for (let i = 0; i < 24; i++) {
          const rx = 90 + i % 8 * 55;
          const ry = 150 + Math.floor(i / 8) * 110;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx + 28, ry + 16);
          ctx.lineTo(rx + 45, ry - 8);
          ctx.stroke();
        }
      }
      ctx.restore();
    }
    // ==========================================
    // CARDIAC SILHOUETTE & MEDIASTINUM
    // ==========================================
    renderCardiacSilhouette(ctx, isCopd, isHeartFailure, isPtx, isPericardial, isEarlyGGO) {
      ctx.save();
      ctx.filter = "blur(4px)";
      const shift = isPtx ? 14 : 0;
      const heartWidth = isPericardial ? 320 : isHeartFailure ? 260 : isCopd ? 130 : 190;
      const apexX = isPericardial ? 472 : isHeartFailure ? 450 : isCopd ? 365 : 405;
      const apexY = isPericardial ? 565 : isHeartFailure ? 555 : isCopd ? 530 : 540;
      const rightHeartX = isPericardial ? 145 : 215;
      const heartGrad = ctx.createRadialGradient(
        310 + shift,
        420,
        20,
        310 + shift,
        420,
        heartWidth * 0.95
      );
      heartGrad.addColorStop(0, "rgba(125, 132, 148, 0.92)");
      heartGrad.addColorStop(0.5, "rgba(105, 112, 126, 0.88)");
      heartGrad.addColorStop(0.85, "rgba(75, 82, 94, 0.75)");
      heartGrad.addColorStop(1, "rgba(40, 45, 55, 0.3)");
      ctx.fillStyle = heartGrad;
      ctx.beginPath();
      if (isPericardial) {
        ctx.moveTo(295 + shift, 175);
        ctx.bezierCurveTo(340 + shift, 185, 410 + shift, 280, 445 + shift, 390);
        ctx.bezierCurveTo(465 + shift, 450, apexX + shift, 520, apexX + shift, apexY);
        ctx.bezierCurveTo(380 + shift, apexY + 28, 270 + shift, apexY + 30, rightHeartX + shift, apexY);
        ctx.bezierCurveTo(rightHeartX - 25 + shift, 500, 160 + shift, 420, 185 + shift, 360);
        ctx.bezierCurveTo(210 + shift, 280, 260 + shift, 185, 295 + shift, 175);
        ctx.closePath();
        ctx.fill();
        ctx.filter = "blur(1.2px)";
        ctx.strokeStyle = "rgba(8, 12, 18, 0.92)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(apexX - 18 + shift, apexY - 25);
        ctx.quadraticCurveTo(apexX - 8 + shift, apexY, apexX - 35 + shift, apexY + 12);
        ctx.stroke();
        ctx.strokeStyle = "rgba(235, 240, 255, 0.85)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(apexX - 22 + shift, apexY - 28);
        ctx.quadraticCurveTo(apexX - 10 + shift, apexY - 2, apexX - 38 + shift, apexY + 14);
        ctx.stroke();
      } else {
        ctx.moveTo(295 + shift, 185);
        ctx.bezierCurveTo(310 + shift, 180, 335 + shift, 185, 345 + shift, 205);
        ctx.bezierCurveTo(348 + shift, 225, 338 + shift, 245, 335 + shift, 260);
        ctx.bezierCurveTo(345 + shift, 280, 355 + shift, 310, 355 + shift, 340);
        ctx.bezierCurveTo(370 + shift, 380, apexX + shift, 460, apexX + shift, apexY);
        ctx.bezierCurveTo(380 + shift, apexY + 25, 300 + shift, apexY + 30, 240 + shift, apexY + 15);
        ctx.bezierCurveTo(205 + shift, apexY - 20, 210 + shift, 480, 215 + shift, 420);
        ctx.bezierCurveTo(220 + shift, 360, 235 + shift, 300, 255 + shift, 260);
        ctx.bezierCurveTo(265 + shift, 230, 280 + shift, 200, 295 + shift, 185);
        ctx.closePath();
        ctx.fill();
        if (isEarlyGGO) {
          ctx.filter = "blur(6px)";
          ctx.fillStyle = "rgba(145, 152, 170, 0.45)";
          ctx.beginPath();
          ctx.ellipse(365, 435, 26, 42, 0.25, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    }
    // ==========================================
    // HEMIDIAPHRAGMS & SUBDIAPHRAGMATIC
    // ==========================================
    renderHemidiaphragms(ctx, isCopd, isPneumonia, isHeartFailure, isPtx, isLoculated, isPneumoperitoneum, isPericardial) {
      const H = this.H;
      const diaphragmBaseY = isCopd ? 625 : 570;
      const curvature = isCopd ? 0.35 : 1;
      ctx.save();
      ctx.filter = "blur(4px)";
      const rightEffusion = isPneumonia || isHeartFailure;
      const liverGrad = ctx.createLinearGradient(0, diaphragmBaseY - 40, 0, H);
      liverGrad.addColorStop(0, "rgba(85, 92, 105, 0.85)");
      liverGrad.addColorStop(0.3, "rgba(65, 72, 82, 0.9)");
      liverGrad.addColorStop(1, "rgba(30, 35, 42, 0.95)");
      ctx.fillStyle = liverGrad;
      ctx.beginPath();
      ctx.moveTo(300, diaphragmBaseY);
      if (isLoculated) {
        ctx.quadraticCurveTo(190, diaphragmBaseY - 55, 135, diaphragmBaseY - 25);
        ctx.lineTo(125, diaphragmBaseY - 38);
        ctx.quadraticCurveTo(95, diaphragmBaseY - 15, 65, diaphragmBaseY + 10);
      } else {
        ctx.quadraticCurveTo(
          190,
          diaphragmBaseY - 60 * curvature,
          rightEffusion ? 120 : 65,
          // Blunted in effusion
          diaphragmBaseY + (rightEffusion ? 30 : 0)
        );
      }
      ctx.lineTo(65, H);
      ctx.lineTo(300, H);
      ctx.closePath();
      ctx.fill();
      const leftBaseY = diaphragmBaseY + 15;
      const leftEffusion = isHeartFailure;
      ctx.beginPath();
      ctx.moveTo(300, leftBaseY);
      ctx.quadraticCurveTo(
        410,
        leftBaseY - 55 * curvature,
        leftEffusion ? 480 : 535,
        leftBaseY + (leftEffusion ? 25 : 0)
      );
      ctx.lineTo(535, H);
      ctx.lineTo(300, H);
      ctx.closePath();
      ctx.fill();
      ctx.filter = "blur(2px)";
      ctx.fillStyle = "rgba(8, 10, 15, 0.92)";
      ctx.beginPath();
      ctx.ellipse(390, leftBaseY + 30, 38, 22, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(140, 145, 160, 0.4)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    }
    // ==========================================
    // CASE-SPECIFIC RADIOLOGICAL PATHOLOGIES
    // ==========================================
    renderCaseSpecificPathologies(ctx, p) {
      const {
        isCopd,
        isPneumonia,
        isCancer,
        isHeartFailure,
        isPtx,
        isLoculated,
        isEarlyGGO,
        isApicalTb,
        isPneumoperitoneum,
        isArds,
        isMiliary,
        isPericardial
      } = p;
      if (isCopd) {
        ctx.save();
        ctx.filter = "blur(1.5px)";
        ctx.strokeStyle = "rgba(160, 165, 180, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(160, 180, 45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(430, 175, 40, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      if (isPneumonia) {
        ctx.save();
        ctx.filter = "blur(5px)";
        const consolGrad = ctx.createRadialGradient(200, 500, 10, 200, 500, 95);
        consolGrad.addColorStop(0, "rgba(195, 200, 215, 0.88)");
        consolGrad.addColorStop(0.5, "rgba(170, 175, 192, 0.75)");
        consolGrad.addColorStop(0.85, "rgba(130, 135, 150, 0.45)");
        consolGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = consolGrad;
        ctx.beginPath();
        ctx.arc(200, 500, 95, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = "blur(1.2px)";
        ctx.strokeStyle = "rgba(8, 12, 18, 0.95)";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(215, 440);
        ctx.lineTo(205, 480);
        ctx.lineTo(185, 520);
        ctx.moveTo(205, 480);
        ctx.lineTo(225, 515);
        ctx.stroke();
        ctx.fillStyle = "rgba(175, 180, 195, 0.82)";
        ctx.beginPath();
        ctx.moveTo(65, 540);
        ctx.quadraticCurveTo(100, 560, 140, 580);
        ctx.lineTo(140, 610);
        ctx.lineTo(65, 610);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      if (isCancer) {
        ctx.save();
        ctx.filter = "blur(2.5px)";
        const massGrad = ctx.createRadialGradient(275, 285, 5, 275, 285, 55);
        massGrad.addColorStop(0, "rgba(215, 220, 235, 0.95)");
        massGrad.addColorStop(0.6, "rgba(185, 190, 205, 0.85)");
        massGrad.addColorStop(1, "rgba(130, 135, 150, 0.2)");
        ctx.fillStyle = massGrad;
        ctx.beginPath();
        ctx.arc(275, 285, 55, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(195, 200, 215, 0.65)";
        ctx.lineWidth = 1.8;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
          ctx.beginPath();
          ctx.moveTo(275 + Math.cos(a) * 45, 285 + Math.sin(a) * 45);
          ctx.lineTo(275 + Math.cos(a) * 72, 285 + Math.sin(a) * 72);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(165, 170, 185, 0.65)";
        ctx.beginPath();
        ctx.moveTo(275, 285);
        ctx.bezierCurveTo(240, 310, 170, 340, 120, 355);
        ctx.lineTo(260, 380);
        ctx.closePath();
        ctx.fill();
        ctx.filter = "blur(1px)";
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(310, 180, 5, 0, Math.PI * 2);
        ctx.arc(302, 192, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (isHeartFailure) {
        ctx.save();
        ctx.filter = "blur(7px)";
        const batwingGrad = ctx.createRadialGradient(250, 370, 10, 250, 370, 85);
        batwingGrad.addColorStop(0, "rgba(175, 180, 195, 0.65)");
        batwingGrad.addColorStop(0.7, "rgba(145, 150, 165, 0.45)");
        batwingGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = batwingGrad;
        ctx.beginPath();
        ctx.ellipse(230, 370, 75, 55, -0.2, 0, Math.PI * 2);
        ctx.ellipse(370, 370, 75, 55, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = "blur(1px)";
        ctx.strokeStyle = "rgba(215, 220, 235, 0.85)";
        ctx.lineWidth = 2.2;
        for (let i = 0; i < 6; i++) {
          const yR = 490 + i * 14;
          ctx.beginPath();
          ctx.moveTo(70, yR);
          ctx.lineTo(95, yR);
          ctx.stroke();
          const yL = 500 + i * 14;
          ctx.beginPath();
          ctx.moveTo(530, yL);
          ctx.lineTo(505, yL);
          ctx.stroke();
        }
        ctx.restore();
      }
      if (isPtx) {
        ctx.save();
        ctx.filter = "blur(3px)";
        ctx.fillStyle = "#020306";
        ctx.beginPath();
        ctx.moveTo(215, 115);
        ctx.bezierCurveTo(150, 140, 120, 240, 130, 370);
        ctx.bezierCurveTo(135, 470, 175, 550, 220, 570);
        ctx.lineTo(65, 570);
        ctx.lineTo(65, 115);
        ctx.closePath();
        ctx.fill();
        ctx.filter = "blur(1.2px)";
        ctx.strokeStyle = "rgba(235, 240, 255, 0.9)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(215, 115);
        ctx.bezierCurveTo(160, 150, 140, 260, 145, 380);
        ctx.bezierCurveTo(150, 470, 185, 530, 225, 565);
        ctx.stroke();
        ctx.filter = "blur(4px)";
        ctx.fillStyle = "rgba(125, 132, 148, 0.45)";
        ctx.beginPath();
        ctx.moveTo(215, 115);
        ctx.bezierCurveTo(160, 150, 140, 260, 145, 380);
        ctx.bezierCurveTo(150, 470, 185, 530, 225, 565);
        ctx.lineTo(275, 565);
        ctx.lineTo(275, 115);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      if (isLoculated) {
        ctx.save();
        ctx.filter = "blur(2.5px)";
        ctx.strokeStyle = "rgba(205, 212, 228, 0.55)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(70, 345);
        ctx.lineTo(275, 345);
        ctx.stroke();
        const pseudoGrad = ctx.createRadialGradient(215, 345, 5, 215, 345, 55);
        pseudoGrad.addColorStop(0, "rgba(205, 212, 228, 0.95)");
        pseudoGrad.addColorStop(0.65, "rgba(175, 182, 200, 0.82)");
        pseudoGrad.addColorStop(1, "rgba(110, 118, 135, 0.1)");
        ctx.fillStyle = pseudoGrad;
        ctx.beginPath();
        ctx.moveTo(150, 345);
        ctx.bezierCurveTo(180, 320, 250, 320, 280, 345);
        ctx.bezierCurveTo(250, 370, 180, 370, 150, 345);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(230, 238, 255, 0.85)";
        ctx.lineWidth = 1.8;
        ctx.stroke();
        const locGrad = ctx.createLinearGradient(65, 0, 145, 0);
        locGrad.addColorStop(0, "rgba(195, 202, 218, 0.92)");
        locGrad.addColorStop(0.65, "rgba(160, 168, 185, 0.8)");
        locGrad.addColorStop(1, "rgba(95, 102, 118, 0.15)");
        ctx.fillStyle = locGrad;
        ctx.beginPath();
        ctx.moveTo(65, 375);
        ctx.bezierCurveTo(135, 395, 140, 465, 65, 490);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(225, 232, 248, 0.85)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(65, 370);
        ctx.bezierCurveTo(140, 395, 145, 465, 65, 495);
        ctx.stroke();
        ctx.filter = "blur(1.5px)";
        ctx.strokeStyle = "rgba(215, 220, 235, 0.8)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(105, 560);
        ctx.lineTo(125, 532);
        ctx.lineTo(148, 565);
        ctx.stroke();
        ctx.fillStyle = "rgba(175, 182, 198, 0.65)";
        ctx.beginPath();
        ctx.arc(125, 105, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (isEarlyGGO) {
        ctx.save();
        ctx.filter = "blur(7px)";
        const ggoGrad = ctx.createRadialGradient(395, 430, 8, 395, 430, 80);
        ggoGrad.addColorStop(0, "rgba(175, 182, 200, 0.52)");
        ggoGrad.addColorStop(0.55, "rgba(145, 152, 170, 0.35)");
        ggoGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = ggoGrad;
        ctx.beginPath();
        ctx.ellipse(395, 430, 80, 65, 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = "blur(2.2px)";
        const acinarCenters = [
          [375, 405],
          [390, 420],
          [410, 410],
          [385, 445],
          [415, 440],
          [365, 390]
        ];
        acinarCenters.forEach(([ax, ay]) => {
          const rosetGrad = ctx.createRadialGradient(ax, ay, 1, ax, ay, 9);
          rosetGrad.addColorStop(0, "rgba(205, 212, 228, 0.65)");
          rosetGrad.addColorStop(0.7, "rgba(165, 172, 190, 0.38)");
          rosetGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = rosetGrad;
          ctx.beginPath();
          ctx.arc(ax, ay, 9, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.filter = "blur(5px)";
        ctx.fillStyle = "rgba(155, 162, 180, 0.45)";
        ctx.beginPath();
        ctx.ellipse(355, 455, 30, 42, 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      if (isApicalTb) {
        ctx.save();
        ctx.filter = "blur(1.5px)";
        ctx.fillStyle = "rgba(195, 202, 218, 0.85)";
        ctx.beginPath();
        ctx.arc(205, 175, 26, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(8, 12, 18, 0.95)";
        ctx.beginPath();
        ctx.arc(205, 175, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(185, 192, 208, 0.75)";
        ctx.beginPath();
        ctx.arc(205, 175, 18, 0.2, Math.PI - 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(235, 240, 255, 0.85)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(189, 180);
        ctx.lineTo(221, 180);
        ctx.stroke();
        ctx.strokeStyle = "rgba(215, 222, 238, 0.65)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(205, 175, 26, 0, Math.PI * 2);
        ctx.stroke();
        ctx.filter = "blur(1.8px)";
        const satNodules = [
          [165, 150, 4.5],
          [175, 195, 5],
          [235, 155, 4],
          [240, 190, 6],
          [225, 225, 5],
          [250, 235, 4.5],
          [195, 240, 5],
          [215, 265, 4]
        ];
        satNodules.forEach(([nx, ny, nr]) => {
          const nodGrad = ctx.createRadialGradient(nx, ny, 1, nx, ny, nr);
          nodGrad.addColorStop(0, "rgba(210, 218, 235, 0.85)");
          nodGrad.addColorStop(0.7, "rgba(175, 182, 200, 0.5)");
          nodGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.fillStyle = nodGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, nr, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.strokeStyle = "rgba(195, 202, 218, 0.7)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(175, 110, 35, Math.PI * 0.8, Math.PI * 1.8);
        ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 2]);
        ctx.beginPath();
        ctx.moveTo(205, 195);
        ctx.lineTo(260, 265);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
      if (isPneumoperitoneum) {
        ctx.save();
        ctx.filter = "blur(1px)";
        ctx.fillStyle = "#020408";
        ctx.beginPath();
        ctx.moveTo(130, 565);
        ctx.quadraticCurveTo(195, 520, 275, 555);
        ctx.quadraticCurveTo(195, 532, 130, 565);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(240, 245, 255, 0.95)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(125, 565);
        ctx.quadraticCurveTo(195, 520, 275, 555);
        ctx.stroke();
        ctx.strokeStyle = "rgba(165, 172, 188, 0.85)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(130, 565);
        ctx.quadraticCurveTo(195, 532, 275, 555);
        ctx.stroke();
        ctx.fillStyle = "#020408";
        ctx.beginPath();
        ctx.moveTo(330, 565);
        ctx.quadraticCurveTo(410, 538, 485, 575);
        ctx.quadraticCurveTo(410, 548, 330, 565);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(240, 245, 255, 0.95)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(330, 565);
        ctx.quadraticCurveTo(410, 538, 485, 575);
        ctx.stroke();
        ctx.filter = "blur(1.5px)";
        ctx.strokeStyle = "rgba(235, 242, 255, 0.9)";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.ellipse(310, 640, 38, 20, 0.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      if (isArds) {
        ctx.save();
        ctx.filter = "blur(8px)";
        const ardsGradR = ctx.createRadialGradient(180, 420, 20, 180, 420, 110);
        ardsGradR.addColorStop(0, "rgba(185, 192, 210, 0.65)");
        ardsGradR.addColorStop(0.7, "rgba(150, 158, 175, 0.45)");
        ardsGradR.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = ardsGradR;
        ctx.beginPath();
        ctx.ellipse(175, 410, 105, 95, -0.15, 0, Math.PI * 2);
        ctx.fill();
        const ardsGradL = ctx.createRadialGradient(420, 430, 20, 420, 430, 110);
        ardsGradL.addColorStop(0, "rgba(185, 192, 210, 0.65)");
        ardsGradL.addColorStop(0.7, "rgba(150, 158, 175, 0.45)");
        ardsGradL.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = ardsGradL;
        ctx.beginPath();
        ctx.ellipse(425, 420, 105, 95, 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = "blur(4.5px)";
        const basePatchR = ctx.createRadialGradient(165, 485, 10, 165, 485, 65);
        basePatchR.addColorStop(0, "rgba(215, 222, 238, 0.85)");
        basePatchR.addColorStop(0.7, "rgba(175, 182, 200, 0.6)");
        basePatchR.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = basePatchR;
        ctx.beginPath();
        ctx.arc(165, 485, 65, 0, Math.PI * 2);
        ctx.fill();
        const basePatchL = ctx.createRadialGradient(435, 495, 10, 435, 495, 65);
        basePatchL.addColorStop(0, "rgba(215, 222, 238, 0.85)");
        basePatchL.addColorStop(0.7, "rgba(175, 182, 200, 0.6)");
        basePatchL.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = basePatchL;
        ctx.beginPath();
        ctx.arc(435, 495, 65, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = "blur(1.2px)";
        ctx.strokeStyle = "rgba(6, 10, 16, 0.95)";
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        ctx.moveTo(170, 450);
        ctx.lineTo(165, 490);
        ctx.lineTo(145, 525);
        ctx.moveTo(165, 490);
        ctx.lineTo(185, 520);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(430, 455);
        ctx.lineTo(435, 495);
        ctx.lineTo(455, 530);
        ctx.moveTo(435, 495);
        ctx.lineTo(420, 525);
        ctx.stroke();
        ctx.restore();
      }
      if (isMiliary) {
        ctx.save();
        ctx.filter = "blur(1.0px)";
        const noduleColor = "rgba(225, 232, 248, 0.82)";
        const noduleCore = "rgba(255, 255, 255, 0.95)";
        const drawMiliaryField = (minX, maxX, minY, maxY) => {
          let seed = 42;
          const pseudoRand = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
          };
          for (let i = 0; i < 220; i++) {
            const nx = minX + pseudoRand() * (maxX - minX);
            const ny = minY + pseudoRand() * (maxY - minY);
            const nr = 1.2 + pseudoRand() * 1.4;
            if (nx > 240 && nx < 360 && ny > 260 && ny < 560) continue;
            ctx.fillStyle = noduleColor;
            ctx.beginPath();
            ctx.arc(nx, ny, nr, 0, Math.PI * 2);
            ctx.fill();
            if (nr > 1.8) {
              ctx.fillStyle = noduleCore;
              ctx.beginPath();
              ctx.arc(nx, ny, nr * 0.45, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        };
        drawMiliaryField(75, 275, 120, 560);
        drawMiliaryField(325, 525, 120, 560);
        ctx.restore();
      }
      if (isPericardial) {
        ctx.save();
        ctx.filter = "blur(1.5px)";
        ctx.strokeStyle = "rgba(225, 235, 255, 0.85)";
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(310, 440, 160, 0.25, Math.PI - 0.25);
        ctx.stroke();
        ctx.restore();
      }
    }
    // ==========================================
    // BOWEL OBSTRUCTION PATHOLOGY
    // ==========================================
    renderBowelObstructionPathology(ctx) {
      ctx.save();
      ctx.filter = "blur(2.5px)";
      const loops = [
        { x: 190, y: 260, w: 140, h: 55 },
        { x: 270, y: 330, w: 155, h: 60 },
        { x: 180, y: 400, w: 165, h: 65 },
        { x: 260, y: 475, w: 150, h: 60 }
      ];
      loops.forEach((lp) => {
        ctx.fillStyle = "rgba(5, 7, 10, 0.95)";
        ctx.beginPath();
        ctx.ellipse(lp.x + lp.w / 2, lp.y + lp.h / 2, lp.w / 2, lp.h / 2, 0, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = "rgba(155, 160, 175, 0.75)";
        ctx.beginPath();
        ctx.ellipse(lp.x + lp.w / 2, lp.y + lp.h / 2, lp.w / 2, lp.h / 2, 0, 0, Math.PI);
        ctx.fill();
        ctx.strokeStyle = "rgba(235, 240, 255, 0.85)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(lp.x, lp.y + lp.h / 2);
        ctx.lineTo(lp.x + lp.w, lp.y + lp.h / 2);
        ctx.stroke();
        ctx.strokeStyle = "rgba(195, 200, 215, 0.55)";
        ctx.lineWidth = 1.4;
        for (let vx = lp.x + 12; vx < lp.x + lp.w - 10; vx += 14) {
          ctx.beginPath();
          ctx.moveTo(vx, lp.y + 4);
          ctx.lineTo(vx, lp.y + lp.h - 4);
          ctx.stroke();
        }
      });
      ctx.restore();
    }
    // ==========================================
    // DICOM METADATA & LEAD ORIENTATION MARKER
    // ==========================================
    renderDicomMetadataAndLeadMarker(ctx) {
      ctx.save();
      const markerX = 40;
      const markerY = 40;
      ctx.fillStyle = "rgba(235, 240, 255, 0.95)";
      ctx.font = '900 24px "Be Vietnam Pro", sans-serif';
      ctx.fillText("R", markerX, markerY);
      ctx.strokeStyle = "rgba(235, 240, 255, 0.85)";
      ctx.lineWidth = 2;
      this.roundRect(ctx, markerX - 6, markerY - 22, 28, 28, 4);
      ctx.stroke();
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.fillStyle = "rgba(195, 205, 225, 0.85)";
      ctx.fillText("CHO RAY HOSPITAL \u2022 RADIOLOGY PACS", 80, 30);
      ctx.fillStyle = "rgba(145, 155, 175, 0.75)";
      ctx.fillText(`PATIENT: ${this.patientInfo.gender === "F" ? "FEMALE" : "MALE"}, ${this.patientInfo.age || 60}Y \u2022 ${this.caseId.toUpperCase()}`, 80, 45);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(195, 205, 225, 0.85)";
      ctx.fillText(this.examType === "abdomen_supine" ? "KUB ERECT" : "CXR PA UPRIGHT", this.W - 30, 30);
      ctx.fillStyle = "rgba(145, 155, 175, 0.75)";
      ctx.fillText("120 kVp \u2022 3.2 mAs \u2022 FFD: 180cm", this.W - 30, 45);
      ctx.textAlign = "left";
      let windowTag = "WL: -500  WW: 1500 (LUNG)";
      if (this.windowPreset === "MEDIASTINUM") windowTag = "WL: 40  WW: 400 (MEDIASTINUM)";
      else if (this.windowPreset === "BONE") windowTag = "WL: 300  WW: 2000 (BONE)";
      else if (this.windowPreset === "HIGH_DYNAMIC") windowTag = "WL: -200  WW: 800 (HI-DYNAMIC)";
      else if (this.windowPreset === "DEFAULT") windowTag = "WL: -500  WW: 1500 (STANDARD)";
      ctx.fillText(windowTag, 30, this.H - 30);
      ctx.fillText("MATRIX: 2048 x 2560 \u2022 16-BIT DR", 30, this.H - 18);
      const scaleBarX = this.W - 130;
      const scaleBarY = this.H - 26;
      ctx.strokeStyle = "rgba(215, 225, 245, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(scaleBarX, scaleBarY);
      ctx.lineTo(scaleBarX + 100, scaleBarY);
      ctx.moveTo(scaleBarX, scaleBarY - 5);
      ctx.lineTo(scaleBarX, scaleBarY + 5);
      ctx.moveTo(scaleBarX + 50, scaleBarY - 3);
      ctx.lineTo(scaleBarX + 50, scaleBarY + 3);
      ctx.moveTo(scaleBarX + 100, scaleBarY - 5);
      ctx.lineTo(scaleBarX + 100, scaleBarY + 5);
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(195, 205, 225, 0.85)";
      ctx.fillText("10 cm", scaleBarX + 50, scaleBarY - 8);
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
      ctx.restore();
      if (this.state.showOverlay) {
        this.renderHotspotsOverlay();
      }
    }
    // ==========================================
    // SLEEK RADAI CAD OVERLAY
    // ==========================================
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
        ctx.setLineDash(isActive ? [5, 4] : [3, 3]);
        ctx.beginPath();
        ctx.arc(screenX, screenY, screenR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        const crossSize = 10;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(screenX - screenR, screenY - 8);
        ctx.lineTo(screenX - screenR, screenY + 8);
        ctx.moveTo(screenX - 8, screenY - screenR);
        ctx.lineTo(screenX + 8, screenY - screenR);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(screenX, screenY, isActive ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fill();
        if (isActive) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(screenX, screenY, screenR + 8, 0, Math.PI * 2);
          ctx.stroke();
        }
        const conf = Math.round(f.confidence > 1 ? f.confidence : f.confidence * 100);
        const label = `${f.nameVi || f.name} (${conf}%)`;
        ctx.font = '700 11px "Be Vietnam Pro", sans-serif';
        const textWidth = ctx.measureText(label).width;
        const boxW = textWidth + 20;
        const boxH = 24;
        const boxX = screenX - boxW / 2;
        const boxY = screenY - screenR - 28;
        ctx.fillStyle = "rgba(10, 16, 28, 0.9)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        this.roundRect(ctx, boxX, boxY, boxW, boxH, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.fillText(label, boxX + 10, boxY + 16);
        ctx.restore();
      });
      ctx.restore();
    }
    getSeverityColor(sev) {
      switch (sev) {
        case "critical":
          return "#f43f5e";
        case "severe":
          return "#fb923c";
        case "moderate":
          return "#fbbf24";
        default:
          return "#34d399";
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
          x: 135,
          y: 240,
          radius: 85,
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
          x: 210,
          y: 360,
          radius: 65,
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
    },
    {
      id: "case-loculated-effusion-001",
      title: "Tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i khu tr\xFA & U ma r\xE3nh li\xEAn th\xF9y",
      patientAge: 64,
      patientGender: "M",
      clinicalHistory: "Nam 64 tu\u1ED5i, ti\u1EC1n s\u1EED vi\xEAm m\u1EE7 m\xE0ng ph\u1ED5i c\u0169 \u0111\xE3 \u0111i\u1EC1u tr\u1ECB 3 n\u0103m tr\u01B0\u1EDBc v\xE0 suy tim nh\u1EB9. G\u1EA7n \u0111\xE2y t\u1EE9c n\u1EB7ng ng\u1EF1c ph\u1EA3i khi n\u1EB1m nghi\xEAng, kh\xF3 th\u1EDF nh\u1EB9 khi g\u1EAFng s\u1EE9c. Kh\xF4ng s\u1ED1t. Th\u1EED nghi\u1EC7m thay \u0111\u1ED5i t\u01B0 th\u1EBF ch\u1EE5p th\u1EA5y b\xF3ng m\u1EDD kh\xF4ng thay \u0111\u1ED5i h\xECnh d\u1EA1ng.",
      examType: "chest_pa",
      findings: [
        {
          id: "loc-pseudotumor",
          name: "U ma r\xE3nh li\xEAn th\xF9y b\xE9 (Vanishing Pseudotumor)",
          nameVi: "U ma r\xE3nh li\xEAn th\xF9y b\xE9",
          description: "B\xF3ng m\u1EDD h\xECnh thoi / th\u1EA5u k\xEDnh hai m\u1EB7t l\u1ED3i (biconvex/spindle-shaped) n\u1EB1m d\u1ECDc theo r\xE3nh li\xEAn th\xF9y ngang ph\u1ED5i ph\u1EA3i. B\u1EDD r\xF5 n\xE9t, hai \u0111\u1EA7u vu\u1ED1t nh\u1ECDn (tapered ends). Bi\u1EBFn m\u1EA5t sau khi \u0111i\u1EC1u tr\u1ECB l\u1EE3i ti\u1EC3u.",
          severity: "moderate",
          location: "R\xE3nh li\xEAn th\xF9y ngang (Minor fissure) ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Vanishing tumor of the pleura / Phantom tumor - D\u1ECBch b\u1ECB bao b\u1ECDc trong r\xE3nh li\xEAn th\xF9y t\u1EA1o h\xECnh gi\u1EA3 u, kh\xF4ng d\u1ECBch chuy\u1EC3n theo t\u01B0 th\u1EBF n\u1EB1m.",
          differentialDiagnosis: ["U m\xE0ng ph\u1ED5i nguy\xEAn ph\xE1t", "U ph\u1ED5i ngo\u1EA1i vi", "K\xE9n ph\u1EBF qu\u1EA3n", "T\u1EE5 m\xE1u m\xE0ng ph\u1ED5i"],
          clinicalCorrelation: "Th\u01B0\u1EDDng g\u1EB7p trong suy tim sung huy\u1EBFt tr\xEAn b\u1EC7nh nh\xE2n c\xF3 d\xEDnh r\xE3nh li\xEAn th\xF9y sau vi\xEAm m\xE0ng ph\u1ED5i tr\u01B0\u1EDBc \u0111\xF3. \u0110\xE1p \u1EE9ng ngo\u1EA1n m\u1EE5c v\u1EDBi Furosemide.",
          confidence: 0.94,
          x: 215,
          y: 345,
          radius: 55,
          type: "effusion"
        },
        {
          id: "loc-pleural-peel",
          name: "D\xE0y d\xEDnh & tr\xE0n d\u1ECBch v\xE1ch h\xF3a th\xE0nh ng\u1EF1c",
          nameVi: "Tr\xE0n d\u1ECBch v\xE1ch h\xF3a th\xE0nh ng\u1EF1c",
          description: "B\xF3ng m\u1EDD d\u1EA1ng ch\u1EEF D (D-shaped opacity) \xE1p s\xE1t th\xE0nh ng\u1EF1c b\xEAn ph\u1EA3i, t\u1EA1o g\xF3c t\xF9 (obtuse angles) v\u1EDBi th\xE0nh ng\u1EF1c, ranh gi\u1EDBi trong l\u1ED3i v\xE0o nhu m\xF4 ph\u1ED5i.",
          severity: "moderate",
          location: "M\xE0ng ph\u1ED5i th\xE0nh b\xEAn ph\u1EA3i",
          radiographicSign: "Obtuse angle sign / Incomplete border sign - G\xF3c t\xF9 gi\u1EEFa t\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1ED5i v\xE0 th\xE0nh ng\u1EF1c ch\u1EE9ng minh t\u1ED5n th\u01B0\u01A1ng xu\u1EA5t ph\xE1t t\u1EEB khoang m\xE0ng ph\u1ED5i.",
          differentialDiagnosis: ["U m\u1EE1 m\xE0ng ph\u1ED5i", "D\xE0y d\xEDnh m\xE0ng ph\u1ED5i sau ch\u1EA5n th\u01B0\u01A1ng", "U trung bi\u1EC3u m\xF4 (Mesothelioma)"],
          clinicalCorrelation: "D\u1ECBch m\xE0ng ph\u1ED5i b\u1ECB v\xE1ch h\xF3a kh\xF4ng ch\u1EA3y t\u1EF1 do v\xE0o g\xF3c s\u01B0\u1EDDn ho\xE0nh. Ch\u1ECDc h\xFAt m\xF9 c\xF3 t\u1EF7 l\u1EC7 th\u1EA5t b\u1EA1i cao, b\u1EAFt bu\u1ED9c si\xEAu \xE2m d\u1EABn \u0111\u01B0\u1EDDng.",
          confidence: 0.89,
          x: 105,
          y: 430,
          radius: 50,
          type: "effusion"
        },
        {
          id: "loc-apical-thickening",
          name: "D\xE0y m\xE0ng ph\u1ED5i \u0111\u1EC9nh v\xE0 v\xF2m ho\xE0nh d\xEDnh",
          nameVi: "D\xE0y d\xEDnh m\xE0ng ph\u1ED5i di ch\u1EE9ng",
          description: "D\u1EA3i m\u1EDD v\xF2m m\xE0ng ph\u1ED5i \u0111\u1EC9nh ph\u1EA3i v\xE0 g\xF3c s\u01B0\u1EDDn ho\xE0nh ph\u1EA3i b\u1ECB k\xE9o r\xFAt nh\u1ECDn do x\u01A1 d\xEDnh c\u0169.",
          severity: "mild",
          location: "\u0110\u1EC9nh v\xE0 \u0111\xE1y ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Pleural tenting & blunting - V\xF2m ho\xE0nh b\u1ECB k\xE9o nh\u1ECDn h\xECnh l\u1EC1u, b\u1EB1ng ch\u1EE9ng c\u1EE7a d\xEDnh m\xE0ng ph\u1ED5i m\u1EA1n t\xEDnh.",
          differentialDiagnosis: ["X\u01A1 s\u1EB9o sau lao", "Di ch\u1EE9ng m\u1EE7 m\xE0ng ph\u1ED5i"],
          clinicalCorrelation: "G\u1EE3i \xFD n\u1EC1n b\u1EC7nh m\xE0ng ph\u1ED5i m\u1EA1n t\xEDnh t\u1EA1o \u0111i\u1EC1u ki\u1EC7n cho d\u1ECBch khu tr\xFA v\xE1ch h\xF3a.",
          confidence: 0.85,
          x: 125,
          y: 575,
          radius: 45,
          type: "opacity"
        }
      ],
      diagnosis: "Tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i khu tr\xFA r\xE3nh li\xEAn th\xF9y ngang (H\u1ED9i ch\u1EE9ng u ma - Pseudotumor) & V\xE1ch h\xF3a th\xE0nh ng\u1EF1c ph\u1EA3i",
      notes: "Ca kh\xF3 \u0111i\u1EC3n h\xECnh: t\u1ED5n th\u01B0\u01A1ng d\u1EC5 ch\u1EA9n \u0111o\xE1n nh\u1EA7m th\xE0nh u ph\u1ED5i ho\u1EB7c u trung th\u1EA5t. C\u1EA7n si\xEAu \xE2m ng\u1EF1c \u0111\u1EC3 x\xE1c \u0111\u1ECBnh t\xEDnh ch\u1EA5t d\u1ECBch v\xE1ch h\xF3a v\xE0 CT ng\u1EF1c ti\xEAm c\u1EA3n quang \u0111\u1EC3 kh\u1EB3ng \u0111\u1ECBnh kh\xF4ng c\xF3 ng\u1EA5m thu\u1ED1c d\u1EA1ng u.",
      tags: ["tr\xE0n d\u1ECBch khu tr\xFA", "u ma", "pseudotumor", "v\xE1ch h\xF3a", "suy tim", "ca kh\xF3"],
      createdAt: "2024-07-15",
      isTemplate: true
    },
    {
      id: "case-early-consolidation-001",
      title: "\u0110\xF4ng \u0111\u1EB7c ph\u1ED5i giai \u0111o\u1EA1n s\u1EDBm & K\xEDnh m\u1EDD (GGO)",
      patientAge: 38,
      patientGender: "F",
      clinicalHistory: "N\u1EEF 38 tu\u1ED5i, s\u1ED1t 38.3\xB0C ng\xE0y th\u1EE9 2, ho khan k\xE8m t\u1EE9c ng\u1EF1c tr\xE1i m\u01A1 h\u1ED3, kh\xF4ng kh\xF3 th\u1EDF, SpO2 96%. Nghe ph\u1ED5i c\xF3 gi\u1EA3m nh\u1EB9 r\xEC r\xE0o ph\u1EBF nang ph\xE2n th\xF9y l\u01B0\u1EE1i tr\xE1i, ch\u01B0a c\xF3 ran n\u1ED5 r\xF5. CRP 35 mg/L, b\u1EA1ch c\u1EA7u 10.800.",
      examType: "chest_pa",
      findings: [
        {
          id: "early-ggo",
          name: "K\xEDnh m\u1EDD ph\u1EBF nang s\u1EDBm (Ground-Glass Opacity)",
          nameVi: "K\xEDnh m\u1EDD ph\u1EBF nang s\u1EDBm (GGO)",
          description: "V\xF9ng t\u0103ng \u0111\u1EADm \u0111\u1ED9 nh\u1EB9 d\u1EA1ng m\u1EDD s\u01B0\u01A1ng m\u1ECFng manh \u1EDF ph\xE2n th\xF9y l\u01B0\u1EE1i ph\u1ED5i tr\xE1i. C\xE1c m\u1EA1ch m\xE1u ph\u1ED5i b\xEAn d\u01B0\u1EDBi v\u1EABn c\xF2n nh\xECn th\u1EA5y m\u1EDD qua v\xF9ng t\u1ED5n th\u01B0\u01A1ng (ch\u01B0a b\u1ECB x\xF3a ho\xE0n to\xE0n).",
          severity: "moderate",
          location: "Ph\xE2n th\xF9y l\u01B0\u1EE1i (Lingula) ph\u1ED5i tr\xE1i",
          radiographicSign: "Ground-glass attenuation - M\u1EDD d\u1EA1ng m\xE2y s\u01B0\u01A1ng, b\u1EA3o t\u1ED3n \u0111\u01B0\u1EDDng b\u1EDD m\u1EA1ch m\xE1u ph\u1ED5i b\xEAn d\u01B0\u1EDBi, ph\u1EA3n \xE1nh d\u1ECBch r\u1EC9 vi\xEAm m\u1EDBi l\u1EA5p \u0111\u1EA7y m\u1ED9t ph\u1EA7n ph\u1EBF nang.",
          differentialDiagnosis: ["Vi\xEAm ph\u1ED5i virus (C\xFAm, COVID-19)", "Vi\xEAm ph\u1ED5i Mycoplasma", "Ph\xF9 ph\u1ED5i khu tr\xFA", "Xu\u1EA5t huy\u1EBFt ph\u1EBF nang"],
          clinicalCorrelation: "Giai \u0111o\u1EA1n xu\u1EA5t ti\u1EBFt s\u1EDBm (early exudative phase). N\u1EBFu kh\xF4ng \u0111i\u1EC1u tr\u1ECB s\u1EDBm s\u1EBD ti\u1EBFn tri\u1EC3n th\xE0nh \u0111\xF4ng \u0111\u1EB7c ho\xE0n to\xE0n trong 24-48 gi\u1EDD.",
          confidence: 0.91,
          x: 395,
          y: 430,
          radius: 65,
          type: "opacity"
        },
        {
          id: "early-acinar",
          name: "N\u1ED1t m\u1EDD ph\u1EBF nang ch\xF9m (Acinar Rosettes)",
          nameVi: "N\u1ED1t m\u1EDD ph\u1EBF nang ch\xF9m",
          description: "C\xE1c n\u1ED1t m\u1EDD nh\u1ECF 5-8mm d\u1EA1ng b\xF4ng r\u1EA3i r\xE1c c\u1EE5m quanh nh\xE1nh ph\u1EBF qu\u1EA3n ph\xE2n th\xF9y, b\u1EDD m\u1EDD kh\xF4ng s\u1EAFc n\xE9t.",
          severity: "moderate",
          location: "Quanh ph\u1EBF qu\u1EA3n th\xF9y l\u01B0\u1EE1i",
          radiographicSign: "Acinar nodules / Peribronchial cuffing - D\xE0y th\xE0nh ph\u1EBF qu\u1EA3n v\xE0 th\xE2m nhi\u1EC5m ph\u1EBF nang quanh ph\u1EBF qu\u1EA3n giai \u0111o\u1EA1n ph\u1EBF qu\u1EA3n ph\u1EBF vi\xEAm s\u1EDBm.",
          differentialDiagnosis: ["Vi\xEAm ti\u1EC3u ph\u1EBF qu\u1EA3n nhi\u1EC5m tr\xF9ng", "Lao ph\u1EBF qu\u1EA3n ph\xE1t t\xE1n s\u1EDBm"],
          clinicalCorrelation: "B\u1EC7nh t\xEDch vi\xEAm lan truy\u1EC1n qua l\xF2ng ph\u1EBF qu\u1EA3n (bronchogenic spread) giai \u0111o\u1EA1n kh\u1EDFi ph\xE1t.",
          confidence: 0.87,
          x: 365,
          y: 390,
          radius: 40,
          type: "opacity"
        },
        {
          id: "early-silhouette",
          name: "D\u1EA5u hi\u1EC7u Silhouette s\u1EDBm \u1EDF b\u1EDD tim tr\xE1i",
          nameVi: "X\xF3a m\u1EDD b\u1EDD tim tr\xE1i m\u1ED9t ph\u1EA7n",
          description: "B\u1EDD th\u1EA5t tr\xE1i \u1EDF \u0111o\u1EA1n gi\u1EEFa b\u1ECB m\u1EDD nh\u1EB9 do t\u1ED5n th\u01B0\u01A1ng ph\u1EBF nang \u1EDF th\xF9y l\u01B0\u1EE1i (n\u1EB1m c\xF9ng m\u1EB7t ph\u1EB3ng gi\u1EA3i ph\u1EABu tr\u01B0\u1EDBc tim).",
          severity: "mild",
          location: "B\u1EDD tim tr\xE1i",
          radiographicSign: "Partial Silhouette Sign of Felson - M\u1EA5t ranh gi\u1EDBi b\u1EDD tim do hai c\u1EA5u tr\xFAc c\xF3 c\xF9ng t\u1EF7 tr\u1ECDng n\u01B0\u1EDBc n\u1EB1m ti\u1EBFp x\xFAc v\u1EDBi nhau.",
          differentialDiagnosis: ["T\u1ED5n th\u01B0\u01A1ng th\xF9y d\u01B0\u1EDBi tr\xE1i", "M\u1EE1 m\xE0ng ngo\xE0i tim"],
          clinicalCorrelation: "X\xE1c \u0111\u1ECBnh v\u1ECB tr\xED t\u1ED5n th\u01B0\u01A1ng ch\u1EAFc ch\u1EAFn n\u1EB1m \u1EDF th\xF9y l\u01B0\u1EE1i (th\xF9y tr\xEAn tr\u01B0\u1EDBc) ch\u1EE9 kh\xF4ng ph\u1EA3i th\xF9y d\u01B0\u1EDBi.",
          confidence: 0.89,
          x: 350,
          y: 460,
          radius: 45,
          type: "opacity"
        }
      ],
      diagnosis: "Ph\u1EBF qu\u1EA3n ph\u1EBF vi\xEAm giai \u0111o\u1EA1n s\u1EDBm (Early Bronchopneumonia) / K\xEDnh m\u1EDD ph\u1EBF nang th\xF9y l\u01B0\u1EE1i tr\xE1i",
      notes: "Ca kh\xF3 tinh t\u1EBF: T\u1ED5n th\u01B0\u01A1ng r\u1EA5t d\u1EC5 b\u1ECB b\u1ECF s\xF3t n\u1EBFu ch\u1EC9 nh\xECn l\u01B0\u1EDBt qua ho\u1EB7c m\xE1y c\xF3 \u0111\u1ED9 t\u01B0\u01A1ng ph\u1EA3n \u0111\u1ED9ng k\xE9m. C\u1EA7n ch\u1EC9nh c\u1EEDa s\u1ED5 LUNG (t\u0103ng t\u01B0\u01A1ng ph\u1EA3n) \u0111\u1EC3 th\u1EA5y r\xF5 \u0111\xE1m m\u1EDD s\u01B0\u01A1ng v\xE0 b\u1EA3o t\u1ED3n m\u1EA1ch m\xE1u.",
      tags: ["\u0111\xF4ng \u0111\u1EB7c s\u1EDBm", "k\xEDnh m\u1EDD", "GGO", "vi\xEAm ph\u1ED5i s\u1EDBm", "ca kh\xF3", "silhouette"],
      createdAt: "2024-07-22",
      isTemplate: true
    },
    {
      id: "case-apical-tb-cavity-001",
      title: "Lao ph\u1ED5i ti\u1EBFn tri\u1EC3n t\u1EA1o hang \u0111\u1EC9nh ph\u1ED5i",
      patientAge: 49,
      patientGender: "M",
      clinicalHistory: "Nam 49 tu\u1ED5i, th\u1EC3 tr\u1EA1ng g\u1EA7y, ho kh\u1EA1c \u0111\u1EDDm nh\u1EA7y 2 th\xE1ng, s\u1ED1t nh\u1EB9 v\u1EC1 chi\u1EC1u v\xE0 v\xE3 m\u1ED3 h\xF4i \u0111\xEAm. S\xFAt 6kg. Th\u1EC9nh tho\u1EA3ng ho c\xF3 v\u1EC7t m\xE1u t\u01B0\u01A1i. Ran \u1EA9m \u0111\xE1y \u0111\xF2n ph\u1EA3i.",
      examType: "chest_pa",
      findings: [
        {
          id: "tb-thick-cavity",
          name: "Hang lao th\xE0nh d\xE0y v\xF9ng \u0111\u1EC9nh - h\u1EA1 \u0111\xF2n ph\u1EA3i",
          nameVi: "Hang lao \u0111\u1EC9nh ph\u1ED5i ph\u1EA3i",
          description: "V\xF9ng th\u1EA5u quang tr\xF2n \u0111\u01B0\u1EDDng k\xEDnh 3.5cm t\u1EA1i v\xF9ng h\u1EA1 \u0111\xF2n ph\u1EA3i, th\xE0nh d\xE0y 3-4mm, b\u1EDD trong nham nh\u1EDF, c\xF3 m\u1EE9c d\u1ECBch - h\u01A1i nh\u1ECF b\xEAn trong \u0111\xE1y hang.",
          severity: "critical",
          location: "H\u1EA1 \u0111\xF2n v\xE0 \u0111\u1EC9nh ph\u1ED5i ph\u1EA3i (Th\xF9y tr\xEAn)",
          radiographicSign: "Thick-walled cavitary lesion - Hang th\xE0nh d\xE0y th\xF9y tr\xEAn c\xF3 m\u1EE9c d\u1ECBch, d\u1EA5u hi\u1EC7u ho\u1EA1i t\u1EED b\xE3 \u0111\u1EADu tho\xE1t ra ngo\xE0i qua \u0111\u01B0\u1EDDng ph\u1EBF qu\u1EA3n.",
          differentialDiagnosis: ["\xC1p xe ph\u1ED5i do vi khu\u1EA9n k\u1EF5 kh\xED", "Ung th\u01B0 ph\u1ED5i ho\u1EA1i t\u1EED t\u1EA1o hang", "N\u1EA5m ph\u1ED5i Aspergilloma", "U h\u1EA1t Wegener"],
          clinicalCorrelation: "Hang lao l\xE0 \u1ED5 ch\u1EE9a l\u01B0\u1EE3ng l\u1EDBn tr\u1EF1c khu\u1EA9n lao (10^7 - 10^9 vi khu\u1EA9n), nguy c\u01A1 l\xE2y nhi\u1EC5m r\u1EA5t cao trong c\u1ED9ng \u0111\u1ED3ng v\xE0 nguy c\u01A1 ho ra m\xE1u s\xE9t \u0111\xE1nh.",
          confidence: 0.96,
          x: 205,
          y: 175,
          radius: 45,
          type: "mass"
        },
        {
          id: "tb-satellite-spread",
          name: "N\u1ED1t v\u1EC7 tinh ph\xE1t t\xE1n theo \u0111\u01B0\u1EDDng ph\u1EBF qu\u1EA3n",
          nameVi: "N\u1ED1t v\u1EC7 tinh ph\xE1t t\xE1n ph\u1EBF qu\u1EA3n",
          description: "Nhi\u1EC1u n\u1ED1t m\u1EDD k\xEDch th\u01B0\u1EDBc 3-6mm \u0111\u1EADm \u0111\u1ED9 kh\xF4ng \u0111\u1ED3ng \u0111\u1EC1u r\u1EA3i r\xE1c xung quanh hang v\xE0 th\xF9y d\u01B0\u1EDBi c\xF9ng b\xEAn.",
          severity: "severe",
          location: "Quanh hang lao v\xE0 \u0111\xE1y ph\u1ED5i ph\u1EA3i",
          radiographicSign: "Satellite nodules / Bronchogenic dissemination - N\u1ED1t v\u1EC7 tinh r\u1EA3i r\xE1c xung quanh hang m\u1EB9 l\xE0 d\u1EA5u hi\u1EC7u \u0111\u1EB7c tr\u01B0ng ph\xE2n bi\u1EC7t lao v\u1EDBi ung th\u01B0 ph\u1ED5i.",
          differentialDiagnosis: ["Di c\u0103n ph\u1ED5i th\u1EC3 n\u1ED1t", "Vi\xEAm ph\u1ED5i k\u1EBD"],
          clinicalCorrelation: "Ch\u1EE9ng minh vi khu\u1EA9n lao \u0111ang ho\u1EA1t \u0111\u1ED9ng v\xE0 gieo r\u1EAFc theo d\u1ECBch ph\u1EBF qu\u1EA3n.",
          confidence: 0.92,
          x: 235,
          y: 230,
          radius: 55,
          type: "opacity"
        },
        {
          id: "tb-hilar-retraction",
          name: "X\u01A1 co k\xE9o r\u1ED1n ph\u1ED5i ph\u1EA3i l\xEAn tr\xEAn",
          nameVi: "Co k\xE9o r\u1ED1n ph\u1ED5i & d\xE0y d\xEDnh \u0111\u1EC9nh",
          description: "R\u1ED1n ph\u1ED5i ph\u1EA3i b\u1ECB k\xE9o cao h\u01A1n b\xECnh th\u01B0\u1EDDng (b\xECnh th\u01B0\u1EDDng r\u1ED1n ph\u1ED5i ph\u1EA3i th\u1EA5p h\u01A1n r\u1ED1n ph\u1ED5i tr\xE1i 1-2cm), k\xE8m d\u1EA3i x\u01A1 \u0111\u1EC9nh ph\u1ED5i.",
          severity: "moderate",
          location: "R\u1ED1n ph\u1ED5i ph\u1EA3i v\xE0 v\xF2m \u0111\u1EC9nh",
          radiographicSign: "Hilar elevation & apical pleural cap - X\u01A1 h\xF3a co r\xFAt th\u1EC3 t\xEDch th\xF9y tr\xEAn k\xE9o r\u1ED1n ph\u1ED5i l\xEAn cao.",
          differentialDiagnosis: ["X\u1EB9p th\xF9y tr\xEAn ph\u1EA3i ho\xE0n to\xE0n", "Di ch\u1EE9ng x\u01A1 s\u1EB9o ph\u1EABu thu\u1EADt c\u0169"],
          clinicalCorrelation: "Ph\u1EA3n \xE1nh qu\xE1 tr\xECnh vi\xEAm m\u1EA1n t\xEDnh v\xE0 x\u01A1 h\xF3a m\xF4 ph\u1ED5i k\xE9o d\xE0i nhi\u1EC1u th\xE1ng.",
          confidence: 0.88,
          x: 260,
          y: 260,
          radius: 40,
          type: "opacity"
        }
      ],
      diagnosis: "Lao ph\u1ED5i ti\u1EBFn tri\u1EC3n c\xF3 t\u1EA1o hang h\u1EA1 \u0111\xF2n ph\u1EA3i (Active Cavitary Tuberculosis) - Ph\xE1t t\xE1n ph\u1EBF qu\u1EA3n",
      notes: "B\u1EC7nh c\u1EA3nh c\u1EA5p b\xE1ch l\xE2y nhi\u1EC5m cao. Ch\u1EC9 \u0111\u1ECBnh c\xE1ch ly bu\u1ED3ng \xE1p l\u1EF1c \xE2m, x\xE9t nghi\u1EC7m GeneXpert / AFB \u0111\u1EDDm 3 m\u1EABu, t\u1EA7m so\xE1t HIV v\xE0 b\u1EAFt \u0111\u1EA7u ph\xE1c \u0111\u1ED3 ch\u1ED1ng lao ti\xEAu chu\u1EA9n 2RHZE/4RHE.",
      tags: ["lao ph\u1ED5i", "hang lao", "ho\u1EA1i t\u1EED b\xE3 \u0111\u1EADu", "n\u1ED1t v\u1EC7 tinh", "ho ra m\xE1u", "truy\u1EC1n nhi\u1EC5m"],
      createdAt: "2024-08-05",
      isTemplate: true
    },
    {
      id: "case-pneumoperitoneum-001",
      title: "Li\u1EC1m h\u01A1i d\u01B0\u1EDBi ho\xE0nh do th\u1EE7ng t\u1EA1ng r\u1ED7ng",
      patientAge: 58,
      patientGender: "M",
      clinicalHistory: "Nam 58 tu\u1ED5i, ti\u1EC1n s\u1EED vi\xEAm lo\xE9t d\u1EA1 d\xE0y t\xE1 tr\xE0ng kh\xF4ng \u0111i\u1EC1u tr\u1ECB \u0111\u1EC1u. C\xE1ch 4 gi\u1EDD \u0111\u1ED9t ng\u1ED9t \u0111au b\u1EE5ng d\u1EEF d\u1ED9i nh\u01B0 dao \u0111\xE2m v\xF9ng th\u01B0\u1EE3ng v\u1ECB, lan kh\u1EAFp b\u1EE5ng. B\u1EE5ng g\u1ED3ng c\u1EE9ng nh\u01B0 g\u1ED7, m\u1EA5t v\xF9ng \u0111\u1EE5c tr\u01B0\u1EDBc gan. Ch\u1EE5p X-quang ng\u1EF1c th\u1EB3ng t\u01B0 th\u1EBF \u0111\u1EE9ng c\u1EA5p c\u1EE9u b\u1EE5ng.",
      examType: "chest_pa",
      findings: [
        {
          id: "air-subdiaphragm-right",
          name: "Li\u1EC1m h\u01A1i d\u01B0\u1EDBi v\xF2m ho\xE0nh ph\u1EA3i",
          nameVi: "Li\u1EC1m h\u01A1i d\u01B0\u1EDBi v\xF2m ho\xE0nh ph\u1EA3i",
          description: "D\u1EA3i s\xE1ng th\u1EA5u quang h\xECnh li\u1EC1m m\u1EA3nh (3-5mm) n\u1EB1m ngay d\u01B0\u1EDBi v\xF2m ho\xE0nh ph\u1EA3i, ng\u0103n c\xE1ch gi\u1EEFa v\xF2m ho\xE0nh c\u1EA3n quang v\xE0 nhu m\xF4 gan \u0111\u1EADm \u0111\u1ED9 \u0111\u1ED3ng nh\u1EA5t.",
          severity: "critical",
          location: "D\u01B0\u1EDBi v\xF2m ho\xE0nh ph\u1EA3i",
          radiographicSign: "Free subdiaphragmatic air / Crescent sign - D\u1EA5u hi\u1EC7u li\u1EC1m h\u01A1i d\u01B0\u1EDBi v\xF2m ho\xE0nh \u1EDF t\u01B0 th\u1EBF \u0111\u1EE9ng, ch\u1EC9 c\u1EA7n l\u01B0\u1EE3ng kh\xED r\u1EA5t nh\u1ECF (1-2 mL) c\u0169ng c\xF3 th\u1EC3 ph\xE1t hi\u1EC7n \u0111\u01B0\u1EE3c.",
          differentialDiagnosis: ["H\u1ED9i ch\u1EE9ng Chilaiditi (\u0111\u1EA1i tr\xE0ng xen gi\u1EEFa gan v\xE0 c\u01A1 ho\xE0nh)", "\xC1p xe d\u01B0\u1EDBi ho\xE0nh c\xF3 sinh h\u01A1i", "M\u1EE1 d\u01B0\u1EDBi ho\xE0nh"],
          clinicalCorrelation: "D\u1EA5u hi\u1EC7u ch\u1EC9 \u0111i\u1EC3m th\u1EE7ng t\u1EA1ng r\u1ED7ng (th\u01B0\u1EDDng l\xE0 th\u1EE7ng \u1ED5 lo\xE9t d\u1EA1 d\xE0y ho\u1EB7c h\xE0nh t\xE1 tr\xE0ng) c\xF3 ch\u1EC9 \u0111\u1ECBnh m\u1ED5 c\u1EA5p c\u1EE9u b\u1EE5ng ngo\u1EA1i khoa kh\u1EA9n.",
          confidence: 0.98,
          x: 200,
          y: 565,
          radius: 65,
          type: "free_air"
        },
        {
          id: "air-subdiaphragm-left",
          name: "Kh\xED t\u1EF1 do d\u01B0\u1EDBi v\xF2m ho\xE0nh tr\xE1i t\xE1ch bi\u1EC7t d\u1EA1 d\xE0y",
          nameVi: "Kh\xED t\u1EF1 do d\u01B0\u1EDBi v\xF2m ho\xE0nh tr\xE1i",
          description: "D\u1EA3i h\u01A1i m\u1ECFng d\u01B0\u1EDBi v\xF2m ho\xE0nh tr\xE1i n\u1EB1m ri\xEAng bi\u1EC7t \u1EDF ph\xEDa tr\xEAn b\xF3ng h\u01A1i d\u1EA1 d\xE0y (Magenblase).",
          severity: "severe",
          location: "D\u01B0\u1EDBi v\xF2m ho\xE0nh tr\xE1i",
          radiographicSign: "Subdiaphragmatic gas stripe - Kh\xED t\u1EF1 do n\u1EB1m s\xE1t c\u01A1 ho\xE0nh, ph\xEDa d\u01B0\u1EDBi l\xE0 th\xE0nh d\u1EA1 d\xE0y v\xE0 b\xF3ng h\u01A1i ti\xEAu h\xF3a.",
          differentialDiagnosis: ["B\xF3ng h\u01A1i ph\xECnh v\u1ECB d\u1EA1 d\xE0y b\xECnh th\u01B0\u1EDDng", "T\xFAi h\u01A1i \u0111\u1EA1i tr\xE0ng g\xF3c l\xE1ch"],
          clinicalCorrelation: "Kh\u1EB3ng \u0111\u1ECBnh tr\xE0n kh\xED ph\xFAc m\u1EA1c hai b\xEAn (Bilateral pneumoperitoneum).",
          confidence: 0.92,
          x: 410,
          y: 575,
          radius: 50,
          type: "free_air"
        },
        {
          id: "air-rigler-double-wall",
          name: "D\u1EA5u hi\u1EC7u th\xE0nh \u0111\xF4i Rigler (Rigler Sign)",
          nameVi: "D\u1EA5u hi\u1EC7u th\xE0nh \u0111\xF4i Rigler",
          description: "Nh\xECn th\u1EA5y r\xF5 n\xE9t c\u1EA3 b\u1EDD trong v\xE0 b\u1EDD ngo\xE0i c\u1EE7a th\xE0nh quai ru\u1ED9t \u1EDF v\xF9ng b\u1EE5ng tr\xEAn do c\xF3 kh\xED t\u1EF1 do bao b\u1ECDc b\xEAn ngo\xE0i th\xE0nh ru\u1ED9t.",
          severity: "severe",
          location: "V\xF9ng h\u1EA1 s\u01B0\u1EDDn v\xE0 th\u01B0\u1EE3ng v\u1ECB",
          radiographicSign: "Rigler's sign / Double-wall sign - Th\xE0nh ru\u1ED9t nh\xECn r\xF5 nh\u01B0 m\u1ED9t \u0111\u01B0\u1EDDng vi\u1EC1n tr\u1EAFng n\u1ED5i tr\xEAn n\u1EC1n kh\xED \u0111en c\u1EA3 hai ph\xEDa.",
          differentialDiagnosis: ["Hai quai ru\u1ED9t ch\u1EE9a h\u01A1i n\u1EB1m \xE1p s\xE1t nhau"],
          clinicalCorrelation: "L\u01B0\u1EE3ng kh\xED t\u1EF1 do trong \u1ED5 ph\xFAc m\u1EA1c t\u1EEB trung b\xECnh \u0111\u1EBFn l\u1EDBn.",
          confidence: 0.91,
          x: 310,
          y: 640,
          radius: 50,
          type: "free_air"
        }
      ],
      diagnosis: "Tr\xE0n kh\xED ph\xFAc m\u1EA1c t\u1EF1 do c\u1EA5p t\xEDnh (Pneumoperitoneum) - Th\u1EE7ng \u1ED5 lo\xE9t h\xE0nh t\xE1 tr\xE0ng / t\u1EA1ng r\u1ED7ng",
      notes: "C\u1EA4P C\u1EE8U NGO\u1EA0I KHOA KH\u1EA8N C\u1EA4P: Ch\u1ED1ng s\u1ED1c, \u0111\u1EB7t \u1ED1ng th\xF4ng d\u1EA1 d\xE0y h\xFAt gi\u1EA3m \xE1p, truy\u1EC1n kh\xE1ng sinh ph\u1ED5 r\u1ED9ng t\u0129nh m\u1EA1ch v\xE0 chuy\u1EC3n ngay ph\xF2ng m\u1ED5 n\u1ED9i soi ho\u1EB7c m\u1EDF b\u1EE5ng kh\xE2u l\u1ED7 th\u1EE7ng.",
      tags: ["th\u1EE7ng t\u1EA1ng r\u1ED7ng", "li\u1EC1m h\u01A1i d\u01B0\u1EDBi ho\xE0nh", "c\u1EA5p c\u1EE9u b\u1EE5ng", "ngo\u1EA1i khoa", "vi\xEAm ph\xFAc m\u1EA1c", "rigler"],
      createdAt: "2024-08-18",
      isTemplate: true
    },
    {
      id: "case-ards-covid-001",
      title: "H\u1ED9i ch\u1EE9ng suy h\xF4 h\u1EA5p c\u1EA5p ti\u1EBFn tri\u1EC3n (ARDS) - K\xEDnh m\u1EDD lan t\u1ECFa & \u0110\xF4ng \u0111\u1EB7c hai ph\u1ED5i ngo\u1EA1i vi",
      patientAge: 52,
      patientGender: "M",
      clinicalHistory: "Nam 52 tu\u1ED5i, s\u1ED1t cao ng\xE0y th\u1EE9 6, ho khan nhi\u1EC1u, kh\xF3 th\u1EDF ti\u1EBFn tri\u1EC3n nhanh nguy k\u1ECBch. Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch: PaO2/FiO2 = 115 mmHg, SpO2 82% v\u1EDBi m\u1EB7t n\u1EA1 t\xFAi tr\u1EEF 15L/p. Th\xE2m nhi\u1EC5m hai ph\u1ED5i xu\u1EA5t hi\u1EC7n c\u1EA5p t\xEDnh trong 24 gi\u1EDD.",
      examType: "chest_pa",
      findings: [
        {
          id: "ards-bilateral-ggo",
          name: "K\xEDnh m\u1EDD lan t\u1ECFa hai b\xEAn \u01B0u th\u1EBF ngo\u1EA1i vi (Diffuse Bilateral GGO)",
          nameVi: "K\xEDnh m\u1EDD lan t\u1ECFa hai b\xEAn ngo\u1EA1i vi",
          description: "V\xF9ng m\u1EDD s\u01B0\u01A1ng m\u1ECFng manh d\u1EA1ng k\xEDnh m\u1EDD (Ground-glass opacities) lan t\u1ECFa r\u1ED9ng kh\u1EAFp hai b\xEAn ph\u1EBF tr\u01B0\u1EDDng, ph\xE2n b\u1ED1 \u01B0u th\u1EBF \u1EDF ngo\u1EA1i vi v\xE0 th\xF9y d\u01B0\u1EDBi, ch\u1EEBa v\xF9ng \u0111\u1EC9nh ph\u1ED5i.",
          severity: "critical",
          location: "Hai ph\u1EBF tr\u01B0\u1EDDng, v\xF9ng gi\u1EEFa v\xE0 ngo\u1EA1i vi",
          radiographicSign: "Diffuse peripheral ground-glass attenuation - T\u1ED5n th\u01B0\u01A1ng ph\u1EBF nang lan t\u1ECFa c\u1EA5p t\xEDnh (DAD) do ph\xF9 ph\u1EBF nang kh\xF4ng do nguy\xEAn nh\xE2n tim m\u1EA1ch.",
          differentialDiagnosis: ["Ph\xF9 ph\u1ED5i c\u1EA5p do suy tim sung huy\u1EBFt", "Vi\xEAm ph\u1ED5i virus k\u1EBD lan t\u1ECFa", "Xu\u1EA5t huy\u1EBFt ph\u1EBF nang lan t\u1ECFa"],
          clinicalCorrelation: "T\u01B0\u01A1ng \u1EE9ng v\u1EDBi t\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1EBF nang - mao m\u1EA1ch l\xE0m tr\xE0n ng\u1EADp d\u1ECBch gi\xE0u protein v\xE0o ph\u1EBF nang, g\xE2y shunt trong ph\u1ED5i n\u1EB7ng.",
          confidence: 0.95,
          x: 180,
          y: 390,
          radius: 95,
          type: "opacity"
        },
        {
          id: "ards-patchy-consolidation",
          name: "\u0110\xF4ng \u0111\u1EB7c ph\u1EBF nang \u0111a \u1ED5 k\xE8m ph\u1EBF qu\u1EA3n kh\xED (Multifocal Consolidation)",
          nameVi: "\u0110\xF4ng \u0111\u1EB7c ph\u1EBF nang \u0111a \u1ED5 hai b\xEAn",
          description: "C\xE1c \u0111\xE1m \u0111\xF4ng \u0111\u1EB7c ph\u1EBF nang kh\xF4ng \u0111\u1ED3ng nh\u1EA5t r\u1EA3i r\xE1c \u1EDF \u0111\xE1y hai ph\u1ED5i, nh\xECn th\u1EA5y ph\u1EBF qu\u1EA3n kh\xED (air bronchogram) ph\xE2n nh\xE1nh.",
          severity: "critical",
          location: "\u0110\xE1y ph\u1ED5i hai b\xEAn",
          radiographicSign: "Patchy alveolar consolidation with air bronchograms - \u0110\xF4ng \u0111\u1EB7c kh\xF4ng \u0111\u1ED3ng \u0111\u1EC1u, t\u0103ng \u0111\u1EADm \u0111\u1ED9 \u1EDF c\xE1c v\xF9ng ph\u1EE5 thu\u1ED9c tr\u1ECDng l\u1EF1c.",
          differentialDiagnosis: ["B\u1ED9i nhi\u1EC5m vi khu\u1EA9n k\xE8m theo", "Nh\u1ED3i m\xE1u ph\u1ED5i di\u1EC7n r\u1ED9ng"],
          clinicalCorrelation: "G\u1EE3i \xFD v\xF9ng ph\u1ED5i \u0111\xF4ng \u0111\u1EB7c \u0111\xF4ng \u0111\u1EB7c n\u1EB7ng c\u1EA7n \xE1p l\u1EF1c PEEP th\xEDch h\u1EE3p \u0111\u1EC3 huy \u0111\u1ED9ng ph\u1EBF nang (alveolar recruitment).",
          confidence: 0.93,
          x: 420,
          y: 440,
          radius: 85,
          type: "opacity"
        },
        {
          id: "ards-normal-heart",
          name: "B\xF3ng tim v\xE0 cu\u1ED1ng m\u1EA1ch b\xECnh th\u01B0\u1EDDng (Kh\xF4ng suy tim)",
          nameVi: "B\xF3ng tim & cu\u1ED1ng m\u1EA1ch b\xECnh th\u01B0\u1EDDng",
          description: "Ch\u1EC9 s\u1ED1 tim/ng\u1EF1c CTR = 0.44 (b\xECnh th\u01B0\u1EDDng), cu\u1ED1ng m\u1EA1ch trung th\u1EA5t kh\xF4ng gi\xE3n, kh\xF4ng c\xF3 \u0111\u01B0\u1EDDng Kerley B hay tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i l\u01B0\u1EE3ng nhi\u1EC1u.",
          severity: "mild",
          location: "Trung th\u1EA5t & r\u1ED1n ph\u1ED5i",
          radiographicSign: "Normal cardiac silhouette & vascular pedicle - D\u1EA5u hi\u1EC7u \xE2m t\xEDnh quan tr\u1ECDng lo\u1EA1i tr\u1EEB ph\xF9 ph\u1ED5i huy\u1EBFt \u0111\u1ED9ng do suy tim tr\xE1i.",
          differentialDiagnosis: ["Suy tim \u1EE9 huy\u1EBFt (CTR th\u01B0\u1EDDng > 0.55 v\xE0 c\xF3 Kerley B)", "H\u1EB9p van hai l\xE1"],
          clinicalCorrelation: "Kh\u1EB3ng \u0111\u1ECBnh suy h\xF4 h\u1EA5p do t\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1EBF nang c\u1EA5p (ARDS ti\xEAu chu\u1EA9n Berlin 2012), kh\xF4ng do qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n.",
          confidence: 0.96,
          x: 300,
          y: 430,
          radius: 65,
          type: "lucency"
        }
      ],
      diagnosis: "H\u1ED9i ch\u1EE9ng suy h\xF4 h\u1EA5p c\u1EA5p ti\u1EBFn tri\u1EC3n n\u1EB7ng (Severe ARDS - Berlin Definition) / T\u1ED5n th\u01B0\u01A1ng ph\u1EBF nang lan t\u1ECFa (DAD)",
      notes: "C\u1EA4P C\u1EE8U H\u1ED2I S\u1EE8C T\xCDCH C\u1EF0C (ICU): \u0110\u1EB7t n\u1ED9i kh\xED qu\u1EA3n th\xF4ng kh\xED b\u1EA3o v\u1EC7 ph\u1ED5i (Vt 4-6 ml/kg PBW, duy tr\xEC Pplat < 30 cmH2O, PEEP 10-14 cmH2O). Ch\u1EC9 \u0111\u1ECBnh th\xF4ng kh\xED n\u1EB1m s\u1EA5p (Prone positioning) \xEDt nh\u1EA5t 16h/ng\xE0y v\xE0 xem x\xE9t ECMO n\u1EBFu PaO2/FiO2 < 80 mmHg k\xE9o d\xE0i.",
      tags: ["ARDS", "suy h\xF4 h\u1EA5p c\u1EA5p", "k\xEDnh m\u1EDD lan t\u1ECFa", "\u0111\xF4ng \u0111\u1EB7c hai b\xEAn", "ICU", "h\u1ED3i s\u1EE9c"],
      createdAt: "2024-09-02",
      isTemplate: true
    },
    {
      id: "case-miliary-tb-001",
      title: "Lao k\xEA lan t\u1ECFa hai ph\u1ED5i (Miliary Tuberculosis)",
      patientAge: 29,
      patientGender: "F",
      clinicalHistory: "N\u1EEF 29 tu\u1ED5i, s\u1ED1t \xE2m \u1EC9 k\xE9o d\xE0i 4 tu\u1EA7n kh\xF4ng r\xF5 nguy\xEAn nh\xE2n (FUO), g\u1EA7y s\xFAt c\xE2n nhanh 6kg, suy nh\u01B0\u1EE3c, kh\xF3 th\u1EDF nh\u1EB9 khi g\u1EAFng s\u1EE9c. Ti\u1EC1n s\u1EED d\xF9ng thu\u1ED1c \u1EE9c ch\u1EBF mi\u1EC5n d\u1ECBch \u0111i\u1EC1u tr\u1ECB lupus. Nghe ph\u1ED5i r\xEC r\xE0o ph\u1EBF nang \u0111\u1EC1u hai b\xEAn, ch\u01B0a nghe ran r\xF5.",
      examType: "chest_pa",
      findings: [
        {
          id: "miliary-snowstorm-nodules",
          name: "V\xF4 s\u1ED1 vi n\u1ED1t h\u1EA1t k\xEA 1-3mm lan t\u1ECFa \u0111\u1ED3ng \u0111\u1EC1u (Miliary Snowstorm)",
          nameVi: "V\xF4 s\u1ED1 vi n\u1ED1t h\u1EA1t k\xEA 1-3mm",
          description: "V\xF4 s\u1ED1 n\u1ED1t m\u1EDD k\xEDch th\u01B0\u1EDBc r\u1EA5t nh\u1ECF 1-3 mm ph\xE2n b\u1ED1 \u0111\u1ED3ng \u0111\u1EC1u nh\u01B0 r\u1EAFc h\u1EA1t m\xE8 tr\xEAn kh\u1EAFp hai ph\u1EBF tr\u01B0\u1EDDng t\u1EEB \u0111\u1EC9nh \u0111\u1EBFn \u0111\xE1y, ranh gi\u1EDBi r\xF5 n\xE9t, m\u1EADt \u0111\u1ED9 d\xE0y \u0111\u1EB7c.",
          severity: "critical",
          location: "To\xE0n b\u1ED9 hai ph\u1EBF tr\u01B0\u1EDDng t\u1EEB \u0111\u1EC9nh \u0111\u1EBFn \u0111\xE1y",
          radiographicSign: "Miliary pattern / Snowstorm appearance - H\u1EA1t k\xEA lan t\u1ECFa \u0111\u1ED1i x\u1EE9ng qua \u0111\u01B0\u1EDDng m\xE1u, c\xE1c n\u1ED1t c\xF3 k\xEDch th\u01B0\u1EDBc v\xE0 \u0111\u1EADm \u0111\u1ED9 t\u01B0\u01A1ng \u0111\u1ED3ng nhau.",
          differentialDiagnosis: ["Di c\u0103n ung th\u01B0 th\u1EC3 k\xEA (tuy\u1EBFn gi\xE1p, th\u1EADn, h\u1EAFc t\u1ED1)", "B\u1EC7nh b\u1EE5i ph\u1ED5i Silicosis", "Nhi\u1EC5m n\u1EA5m Histoplasmosis", "Sarcoidosis"],
          clinicalCorrelation: "G\u1EE3i \xFD tr\u1EF1c khu\u1EA9n lao Mycobacterium tuberculosis ph\xE1t t\xE1n \u1ED3 \u1EA1t qua \u0111\u01B0\u1EDDng tu\u1EA7n ho\xE0n m\xE1u (hematogenous dissemination).",
          confidence: 0.97,
          x: 230,
          y: 310,
          radius: 90,
          type: "nodule"
        },
        {
          id: "miliary-preserved-volume",
          name: "Th\u1EC3 t\xEDch ph\u1ED5i b\u1EA3o t\u1ED3n ho\xE0n to\xE0n",
          nameVi: "Th\u1EC3 t\xEDch ph\u1ED5i b\xECnh th\u01B0\u1EDDng",
          description: "Hai tr\u01B0\u1EDDng ph\u1ED5i n\u1EDF \u0111\u1EC1u, v\xF2m ho\xE0nh n\u1EB1m \u0111\xFAng v\u1ECB tr\xED sinh l\xFD (KLS 9-10 sau), kh\xF4ng c\xF3 x\u1EB9p th\xF9y ph\u1ED5i hay x\u01A1 co k\xE9o l\u1EDBn.",
          severity: "mild",
          location: "L\u1ED3ng ng\u1EF1c hai b\xEAn",
          radiographicSign: "Preserved lung volume with symmetric expansion - \u0110\u1EB7c tr\u01B0ng c\u1EE7a t\u1ED5n th\u01B0\u01A1ng k\u1EBD th\u1EC3 k\xEA giai \u0111o\u1EA1n c\u1EA5p.",
          differentialDiagnosis: ["X\u01A1 ph\u1ED5i k\u1EBD ti\u1EBFn tri\u1EC3n (th\u1EC3 t\xEDch ph\u1ED5i th\u01B0\u1EDDng co nh\u1ECF)"],
          clinicalCorrelation: "D\xF9 t\u1ED5n th\u01B0\u01A1ng vi th\u1EC3 d\xE0y \u0111\u1EB7c nh\u01B0ng c\u01A1 h\u1ECDc ph\u1ED5i giai \u0111o\u1EA1n \u0111\u1EA7u v\u1EABn ch\u01B0a b\u1ECB x\u01A1 teo.",
          confidence: 0.9,
          x: 400,
          y: 320,
          radius: 85,
          type: "lucency"
        },
        {
          id: "miliary-subtle-hilar",
          name: "H\u1EA1ch r\u1ED1n ph\u1ED5i v\xE0 m\u1EA1ng l\u01B0\u1EDBi k\u1EBD t\u0103ng sinh",
          nameVi: "M\u1EA1ng l\u01B0\u1EDBi t\u1ED5 ch\u1EE9c k\u1EBD r\u1ED1n ph\u1ED5i",
          description: "D\xE0y nh\u1EB9 t\u1ED5 ch\u1EE9c k\u1EBD quanh r\u1ED1n ph\u1ED5i v\xE0 b\xF3ng h\u1EA1ch r\u1ED1n ph\u1ED5i m\u1EDD nh\u1EB9 hai b\xEAn.",
          severity: "moderate",
          location: "R\u1ED1n ph\u1ED5i hai b\xEAn",
          radiographicSign: "Fine reticular interstitial background with mild hilar fullness - M\u1EA1ng k\u1EBD d\u1EA1ng l\u01B0\u1EDBi m\u1ECFng li\xEAn k\u1EBFt c\xE1c vi n\u1ED1t h\u1EA1t k\xEA.",
          differentialDiagnosis: ["Vi\xEAm ph\u1ED5i k\u1EBD do virus", "Ph\xF9 ph\u1ED5i k\u1EBD"],
          clinicalCorrelation: "Ph\u1EA3n \u1EE9ng vi\xEAm h\u1EC7 th\u1ED1ng v\xE0 h\u1EA1ch b\u1EA1ch huy\u1EBFt trung th\u1EA5t do tr\u1EF1c khu\u1EA9n lao.",
          confidence: 0.88,
          x: 290,
          y: 290,
          radius: 50,
          type: "opacity"
        }
      ],
      diagnosis: "Lao k\xEA lan t\u1ECFa hai ph\u1ED5i c\u1EA5p t\xEDnh (Acute Miliary Tuberculosis) - Ph\xE1t t\xE1n theo \u0111\u01B0\u1EDDng m\xE1u",
      notes: "NGUY C\u01A0 LAO M\xC0NG N\xC3O & SUY \u0110A T\u1EA0NG: C\u1EA7n ch\u1EC9 \u0111\u1ECBnh ch\u1ECDc d\u1ECBch n\xE3o t\u1EE7y t\u1EA7m so\xE1t vi\xEAm m\xE0ng n\xE3o lao, soi \u0111\xE1y m\u1EAFt t\xECm n\u1ED1t c\u1EE7 lao m\xE0ng m\u1EA1ch (Choroidal tubercles), c\u1EA5y m\xE1u, GeneXpert \u0111\u1EDDm v\xE0 b\u1EAFt \u0111\u1EA7u ph\xE1c \u0111\u1ED3 ch\u1ED1ng lao ph\u1ED1i h\u1EE3p Corticoid s\u1EDBm.",
      tags: ["lao k\xEA", "miliary TB", "vi n\u1ED1t h\u1EA1t m\xE8", "s\u1ED1t k\xE9o d\xE0i", "ph\xE1t t\xE1n \u0111\u01B0\u1EDDng m\xE1u", "ca kh\xF3"],
      createdAt: "2024-09-10",
      isTemplate: true
    },
    {
      id: "case-pericardial-effusion-001",
      title: "Tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim l\u01B0\u1EE3ng nhi\u1EC1u (B\xF3ng tim h\xECnh gi\u1ECDt n\u01B0\u1EDBc / Chai n\u01B0\u1EDBc)",
      patientAge: 61,
      patientGender: "F",
      clinicalHistory: "N\u1EEF 61 tu\u1ED5i, m\u1EC7t l\u1EA3, kh\xF3 th\u1EDF n\u1EB7ng khi n\u1EB1m \u0111\u1EA7u b\u1EB1ng (orthopnea), c\u1EA3m gi\xE1c t\u1EE9c n\u1EB7ng ng\u1EF1c m\u01A1 h\u1ED3. Kh\xE1m: Huy\u1EBFt \xE1p 92/68 mmHg, m\u1EA1ch nhanh 112 l/p, m\u1EA1ch ngh\u1ECBch (Pulsus paradoxus 16 mmHg), t\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i to \u1EDF t\u01B0 th\u1EBF 45\xB0, ti\u1EBFng tim m\u1EDD xa x\u0103m. \u0110i\u1EC7n t\xE2m \u0111\u1ED3: \u0111i\u1EC7n th\u1EBF th\u1EA5p lan t\u1ECFa v\xE0 so le \u0111i\u1EC7n th\u1EBF.",
      examType: "chest_pa",
      findings: [
        {
          id: "pericardial-flask-heart",
          name: "B\xF3ng tim to \u0111\u1ED1i x\u1EE9ng h\xECnh chai n\u01B0\u1EDBc (Water Bottle / Flask Heart)",
          nameVi: "B\xF3ng tim h\xECnh chai n\u01B0\u1EDBc (CTR > 0.68)",
          description: "B\xF3ng tim gi\xE3n to kh\u1ED5ng l\u1ED3 h\xECnh b\xECnh c\u1EA7u \u0111\u1ED1i x\u1EE9ng, ch\u1EC9 s\u1ED1 tim/ng\u1EF1c CTR = 0.68, \u0111\u01B0\u1EDDng b\u1EDD tim hai b\xEAn nh\u1EB5n thon \u0111\u1EC1u, m\u1EA5t c\xE1c eo gi\u1EA3i ph\u1EABu sinh l\xFD gi\u1EEFa quai \u0111\u1ED9ng m\u1EA1ch ch\u1EE7 v\xE0 th\u1EA5t.",
          severity: "critical",
          location: "B\xF3ng tim trung th\u1EA5t",
          radiographicSign: "Water-bottle sign / Flask-shaped cardiac silhouette - D\u1ECBch m\xE0ng ngo\xE0i tim t\u1EF1 do (>500 mL) \u0111\u1ECDng \u1EDF ph\u1EA7n th\u1EA5p v\xE0 bung \u0111\u1EC1u sang hai b\xEAn d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a tr\u1ECDng l\u1EF1c \u1EDF t\u01B0 th\u1EBF \u0111\u1EE9ng.",
          differentialDiagnosis: ["B\u1EC7nh c\u01A1 tim gi\xE3n (Dilated cardiomyopathy - th\u01B0\u1EDDng k\xE8m sung huy\u1EBFt ph\u1ED5i n\u1EB7ng)", "H\u1EDF van tim n\u1EB7ng \u0111a van"],
          clinicalCorrelation: "D\u1EA5u hi\u1EC7u kinh \u0111i\u1EC3n c\u1EE7a tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim l\u01B0\u1EE3ng nhi\u1EC1u. C\u1EA3nh b\xE1o nguy c\u01A1 ch\xE8n \xE9p tim c\u1EA5p (Cardiac Tamponade).",
          confidence: 0.98,
          x: 325,
          y: 440,
          radius: 130,
          type: "opacity"
        },
        {
          id: "pericardial-clear-lung-fields",
          name: "Ph\u1EBF tr\u01B0\u1EDDng s\xE1ng kh\xF4ng sung huy\u1EBFt (Oligemic / Clear Lungs)",
          nameVi: "Ph\u1EBF tr\u01B0\u1EDDng s\xE1ng kh\xF4ng sung huy\u1EBFt",
          description: "Hai ph\u1EBF tr\u01B0\u1EDDng ho\xE0n to\xE0n s\xE1ng trong, m\u1EA1ng l\u01B0\u1EDBi m\u1EA1ch m\xE1u ph\u1ED5i b\xECnh th\u01B0\u1EDDng, kh\xF4ng c\xF3 t\xE1i ph\xE2n b\u1ED1 m\u1EA1ch m\xE1u l\xEAn \u0111\u1EC9nh (Cephalization) hay \u0111\u01B0\u1EDDng Kerley B.",
          severity: "moderate",
          location: "Hai ph\u1EBF tr\u01B0\u1EDDng",
          radiographicSign: "Clear lung fields in severe cardiomegaly - D\u1EA5u hi\u1EC7u m\u1EA5u ch\u1ED1t ph\xE2n bi\u1EC7t tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim v\u1EDBi suy tim sung huy\u1EBFt tr\xE1i (trong suy tim tr\xE1i, b\xF3ng tim to lu\xF4n \u0111i k\xE8m sung huy\u1EBFt ph\u1EBF nang ho\u1EB7c Kerley).",
          differentialDiagnosis: ["Suy tim \u1EE9 huy\u1EBFt (Lu\xF4n k\xE8m sung huy\u1EBFt ph\u1ED5i)"],
          clinicalCorrelation: "Gi\u1EA3m cung l\u01B0\u1EE3ng tim do h\u1EA1n ch\u1EBF \u0111\u1ED5 \u0111\u1EA7y c\u01A1 h\u1ECDc (diastolic filling restriction), kh\xF4ng c\xF3 \u1EE9 tr\u1EC7 tu\u1EA7n ho\xE0n t\u0129nh m\u1EA1ch ph\u1ED5i.",
          confidence: 0.96,
          x: 160,
          y: 350,
          radius: 80,
          type: "lucency"
        },
        {
          id: "pericardial-fat-pad-sign",
          name: "D\u1EA5u hi\u1EC7u \u0111\u01B0\u1EDDng m\u1EE1 m\xE0ng ngo\xE0i tim (Epicardial Fat Pad Sign)",
          nameVi: "D\u1EA5u hi\u1EC7u d\u1EA3i m\u1EE1 th\u01B0\u1EE3ng t\xE2m m\u1EA1c",
          description: "D\u1EA3i th\u1EA5u quang m\u1ECFng c\u1EE7a l\xE1 m\u1EE1 th\u01B0\u1EE3ng t\xE2m m\u1EA1c b\u1ECB \u0111\u1EA9y t\xE1ch bi\u1EC7t kh\u1ECFi \u0111\u01B0\u1EDDng b\u1EDD ngo\xE0i c\u1EE7a m\xE0ng ngo\xE0i tim m\u1ED9t kho\u1EA3ng > 5mm do l\u1EDBp d\u1ECBch n\u1EB1m xen gi\u1EEFa.",
          severity: "severe",
          location: "B\u1EDD tr\u01B0\u1EDBc d\u01B0\u1EDBi tim",
          radiographicSign: "Epicardial fat pad sign / Pericardial stripe thickening - D\xE0y d\u1EA3i m\xE0ng ngo\xE0i tim > 2mm kh\u1EB3ng \u0111\u1ECBnh ch\u1EAFc ch\u1EAFn c\xF3 d\u1ECBch gi\u1EEFa c\xE1c l\xE1 m\xE0ng.",
          differentialDiagnosis: ["D\xE0y d\xEDnh m\xE0ng ngo\xE0i tim \u0111\u01A1n thu\u1EA7n", "U m\u1EE1 m\xE0ng ngo\xE0i tim"],
          clinicalCorrelation: "Kh\u1EB3ng \u0111\u1ECBnh t\u1ED5n th\u01B0\u01A1ng l\xE0 d\u1ECBch khoang m\xE0ng ngo\xE0i tim ch\u1EE9 kh\xF4ng ph\u1EA3i ph\xEC \u0111\u1EA1i th\xE0nh c\u01A1 tim.",
          confidence: 0.92,
          x: 430,
          y: 520,
          radius: 45,
          type: "lucency"
        }
      ],
      diagnosis: "Tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim l\u01B0\u1EE3ng nhi\u1EC1u (Severe Pericardial Effusion) - \u0110e d\u1ECDa ch\xE8n \xE9p tim c\u1EA5p (Impending Tamponade)",
      notes: "C\u1EA4P C\u1EE8U TIM M\u1EA0CH T\u1ED0I KH\u1EA8N: Ch\u1EC9 \u0111\u1ECBnh si\xEAu \xE2m tim t\u1EA1i gi\u01B0\u1EDDng (POCUS) kh\u1EA9n c\u1EA5p x\xE1c nh\u1EADn \u0111\xE8 s\u1EE5p nh\u0129 ph\u1EA3i/th\u1EA5t ph\u1EA3i th\xEC t\xE2m tr\u01B0\u01A1ng, chu\u1EA9n b\u1ECB b\u1ED9 ch\u1ECDc h\xFAt d\u1EABn l\u01B0u m\xE0ng ngo\xE0i tim (Pericardiocentesis) gi\u1EA3i \xE1p c\u1EA5p c\u1EE9u.",
      tags: ["tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim", "chai n\u01B0\u1EDBc", "water bottle", "tamponade", "ch\xE8n \xE9p tim", "CTR cao", "ca kh\xF3"],
      createdAt: "2024-09-18",
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
    },
    {
      id: "kb-approach-006",
      title: "Ph\xE2n bi\u1EC7t tr\xE0n d\u1ECBch khu tr\xFA (Pseudotumor) v\u1EDBi u nhu m\xF4 ph\u1ED5i",
      category: "Ca kh\xF3 & B\u1EABy ch\u1EA9n \u0111o\xE1n",
      content: `## Ph\xE2n bi\u1EC7t Tr\xE0n d\u1ECBch r\xE3nh li\xEAn th\xF9y (H\u1ED9i ch\u1EE9ng u ma) vs Kh\u1ED1i u ph\u1ED5i

### 1. \u0110\u1EB7c \u0111i\u1EC3m c\u1EE7a "U ma" (Phantom Tumor / Vanishing Tumor):
- **V\u1ECB tr\xED**: N\u1EB1m ho\xE0n to\xE0n d\u1ECDc theo h\u01B0\u1EDBng \u0111i c\u1EE7a r\xE3nh li\xEAn th\xF9y b\xE9 (ngang) ho\u1EB7c r\xE3nh l\u1EDBn (ch\u1EBFch).
- **H\xECnh th\xE1i**: H\xECnh th\u1EA5u k\xEDnh hai m\u1EB7t l\u1ED3i (biconvex spindle lens) v\u1EDBi hai \u0111\u1EA7u vu\u1ED1t nh\u1ECDn d\u1EA7n (tapered ends) ti\u1EBFp n\u1ED1i v\xE0o \u0111\u01B0\u1EDDng r\xE3nh li\xEAn th\xF9y m\u1ECFng.
- **B\u1EDD**: Nh\u1EB5n, s\u1EAFc n\xE9t, kh\xF4ng c\xF3 tua gai (corona radiata) hay ph\xE1 h\u1EE7y x\u01B0\u01A1ng s\u01B0\u1EDDn.
- **Ti\u1EBFn tri\u1EC3n**: Bi\u1EBFn m\u1EA5t nhanh ch\xF3ng sau 48-72 gi\u1EDD \u0111i\u1EC1u tr\u1ECB suy tim b\u1EB1ng thu\u1ED1c l\u1EE3i ti\u1EC3u (Furosemide).

### 2. D\u1EA5u hi\u1EC7u t\u1ED5n th\u01B0\u01A1ng ngo\xE0i ph\u1ED5i (Pleural vs Parenchymal):
- **G\xF3c ti\u1EBFp x\xFAc**: T\u1ED5n th\u01B0\u01A1ng xu\u1EA5t ph\xE1t t\u1EEB m\xE0ng ph\u1ED5i t\u1EA1o **g\xF3c t\xF9 (obtuse angle > 90\xB0)** v\u1EDBi th\xE0nh ng\u1EF1c (D\u1EA5u hi\u1EC7u ch\u1EEF D).
- Kh\u1ED1i u t\u1EEB nhu m\xF4 ph\u1ED5i l\u1EA5n v\xE0o m\xE0ng ph\u1ED5i t\u1EA1o **g\xF3c nh\u1ECDn (acute angle < 90\xB0)**.
- **D\u1EA5u hi\u1EC7u ranh gi\u1EDBi kh\xF4ng ho\xE0n to\xE0n (Incomplete border sign)**: B\u1EDD ngo\xE0i ti\u1EBFp x\xFAc v\u1EDBi th\xE0nh ng\u1EF1c kh\xF4ng nh\xECn th\u1EA5y \u0111\u01B0\u1EE3c.`,
      tags: ["pseudotumor", "u ma", "r\xE3nh li\xEAn th\xF9y", "tr\xE0n d\u1ECBch khu tr\xFA", "g\xF3c t\xF9"],
      createdAt: "2024-09-01",
      updatedAt: "2024-09-01"
    },
    {
      id: "kb-approach-007",
      title: "K\u1EF9 thu\u1EADt \u0111i\u1EC1u ch\u1EC9nh c\u1EEDa s\u1ED5 PACS & Nh\u1EADn di\u1EC7n k\xEDnh m\u1EDD s\u1EDBm (GGO)",
      category: "K\u1EF9 thu\u1EADt PACS",
      content: `## \u0110\u1ECDc t\u1ED5n th\u01B0\u01A1ng k\xEDnh m\u1EDD (Ground-Glass Opacity) tr\xEAn X-quang k\u1EF9 thu\u1EADt s\u1ED1

### 1. B\u1EA3n ch\u1EA5t h\xECnh \u1EA3nh h\u1ECDc c\u1EE7a GGO:
- T\u0103ng t\u1EF7 tr\u1ECDng nhu m\xF4 ph\u1ED5i d\u1EA1ng m\u1EDD s\u01B0\u01A1ng m\u1ECFng manh.
- **D\u1EA5u hi\u1EC7u m\u1EA5u ch\u1ED1t**: M\u1EA1ch m\xE1u ph\u1ED5i v\xE0 th\xE0nh ph\u1EBF qu\u1EA3n b\xEAn d\u01B0\u1EDBi **V\u1EAAN C\xD2N NH\xCCN TH\u1EA4Y R\xD5** qua \u0111\xE1m m\u1EDD (ch\u01B0a b\u1ECB x\xF3a ho\xE0n to\xE0n nh\u01B0 trong \u0111\xF4ng \u0111\u1EB7c \u0111\u1EB7c \u0111\u1ED3ng nh\u1EA5t).
- Ph\u1EA3n \xE1nh s\u1EF1 l\u1EA5p \u0111\u1EA7y m\u1ED9t ph\u1EA7n l\xF2ng ph\u1EBF nang b\u1EDFi d\u1ECBch r\u1EC9 vi\xEAm, t\u1EBF b\xE0o ho\u1EB7c d\xE0y c\xE1c v\xE1ch k\u1EBD ph\u1EBF nang.

### 2. Thao t\xE1c Window/Level (\u0110\u1ED9 t\u01B0\u01A1ng ph\u1EA3n \u0111\u1ED9ng):
- **C\u1EEDa s\u1ED5 Nhu m\xF4 (Lung Window)**: T\u0103ng t\u01B0\u01A1ng ph\u1EA3n (+25 \u0111\u1EBFn +50), gi\u1EA3m nh\u1EB9 \u0111\u1ED9 s\xE1ng (-10) \u0111\u1EC3 ph\xE2n t\xE1ch ranh gi\u1EDBi m\u1EDD s\u01B0\u01A1ng v\u1EDBi nhu m\xF4 ph\u1ED5i l\xE0nh.
- **B\u1ED9 l\u1ECDc Hi-Dynamic DR**: T\u0103ng c\u01B0\u1EDDng vi\u1EC1n c\u1EA5u tr\xFAc vi m\xF4, gi\xFAp ph\xE1t hi\u1EC7n s\u1EDBm c\xE1c ch\xF9m n\u1ED1t ph\u1EBF nang (acinar rosettes 5-8mm) tr\u01B0\u1EDBc khi h\u1EE3p l\u01B0u th\xE0nh \u0111\xF4ng \u0111\u1EB7c l\u1EDBn.
- **D\u1EA5u hi\u1EC7u Silhouette m\u1ED9t ph\u1EA7n**: Ch\xFA \xFD m\u1EA5t \u0111\u01B0\u1EDDng b\u1EDD tim tr\xE1i (th\xF9y l\u01B0\u1EE1i) ho\u1EB7c v\xF2m ho\xE0nh (th\xF9y d\u01B0\u1EDBi) d\xF9 \u0111\xE1m m\u1EDD r\u1EA5t nh\u1EB9.`,
      tags: ["k\xEDnh m\u1EDD", "GGO", "PACS window", "\u0111\xF4ng \u0111\u1EB7c s\u1EDBm", "dynamic contrast"],
      createdAt: "2024-09-01",
      updatedAt: "2024-09-01"
    },
    {
      id: "kb-approach-008",
      title: "Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t b\xF3ng tim to: Suy tim \u1EE9 huy\u1EBFt vs Tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim",
      category: "Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t",
      content: `## Ph\xE2n bi\u1EC7t Suy tim xung huy\u1EBFt vs Tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim l\u01B0\u1EE3ng nhi\u1EC1u

| Ti\xEAu ch\xED | Suy tim sung huy\u1EBFt (CHF) | Tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim (Pericardial Effusion) |
|---|---|---|
| **H\xECnh d\u1EA1ng b\xF3ng tim** | Th\u1EA5t tr\xE1i ph\xEC \u0111\u1EA1i l\u1EC7ch tr\xE1i, cung tim r\xF5 eo | H\xECnh b\xECnh c\u1EA7u / gi\u1ECDt n\u01B0\u1EDBc / chai n\u01B0\u1EDBc \u0111\u1ED1i x\u1EE9ng (Water-bottle heart) |
| **\u0110\u01B0\u1EDDng b\u1EDD tim** | Nh\xECn r\xF5 ranh gi\u1EDBi c\xE1c cung gi\u1EA3i ph\u1EABu | Nh\u1EB5n tr\xF2n, m\u1EA5t c\xE1c eo gi\u1EA3i ph\u1EABu b\xECnh th\u01B0\u1EDDng |
| **Ph\u1EBF tr\u01B0\u1EDDng ph\u1ED5i** | Sung huy\u1EBFt r\u1ED1n ph\u1ED5i, t\xE1i ph\xE2n b\u1ED1 \u0111\u1EC9nh, Kerley B | **S\xC1NG TRONG (Oligemic / Clear lungs)**, kh\xF4ng sung huy\u1EBFt |
| **Ch\u1EC9 s\u1ED1 CTR** | 0.52 - 0.62 | Th\u01B0\u1EDDng > 0.65 - 0.70 |
| **D\u1EA5u hi\u1EC7u \u0111\u1EB7c tr\u01B0ng** | D\u01A1i bay (Batwing), Kerley A & B, m\u1EDD g\xF3c s\u01B0\u1EDDn ho\xE0nh | D\u1EA3i m\u1EE1 th\u01B0\u1EE3ng t\xE2m m\u1EA1c b\u1ECB \u0111\u1EA9y t\xE1ch (Epicardial fat pad sign) |
| **L\xE2m s\xE0ng c\u1EA5p c\u1EE9u** | Kh\xF3 th\u1EDF k\u1ECBch ph\xE1t v\u1EC1 \u0111\xEAm, ran \u1EA9m \u0111\xE1y ph\u1ED5i | Tam ch\u1EE9ng Beck (HA t\u1EE5t, T\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i, Ti\u1EBFng tim m\u1EDD), M\u1EA1ch ngh\u1ECBch |`,
      tags: ["suy tim", "tr\xE0n d\u1ECBch m\xE0ng ngo\xE0i tim", "chai n\u01B0\u1EDBc", "CTR", "ch\xE8n \xE9p tim"],
      createdAt: "2024-09-01",
      updatedAt: "2024-09-01"
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
      this.showCtrCalculator = false;
      this.currentPreset = "DEFAULT";
      this.mrdVal = 4.5;
      this.mldVal = 8.5;
      this.idVal = 24;
      const el = document.getElementById(containerId);
      if (!el) throw new Error(`Container #${containerId} not found`);
      this.container = el;
      this.currentCase = this.cases[0];
      this.updateCtrDefaultsForCase(this.currentCase.id);
      this.init();
    }
    updateCtrDefaultsForCase(caseId) {
      if (caseId === "case-heart-failure-001") {
        this.mrdVal = 6;
        this.mldVal = 10.2;
        this.idVal = 24.5;
      } else if (caseId === "case-pericardial-effusion-001") {
        this.mrdVal = 6.8;
        this.mldVal = 11.2;
        this.idVal = 24.8;
      } else if (caseId === "case-copd-001") {
        this.mrdVal = 3.2;
        this.mldVal = 6.2;
        this.idVal = 26.5;
      } else if (caseId === "case-early-consolidation-001") {
        this.mrdVal = 4.2;
        this.mldVal = 7.6;
        this.idVal = 24.5;
      } else if (caseId === "case-ards-covid-001") {
        this.mrdVal = 3.9;
        this.mldVal = 7.1;
        this.idVal = 25;
      } else {
        this.mrdVal = 4.4;
        this.mldVal = 7.8;
        this.idVal = 24.5;
      }
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
              <button id="pacs-btn-ctr" class="xray-pacs-btn ${this.showCtrCalculator ? "active" : ""}" title="Th\u01B0\u1EDBc \u0111o ch\u1EC9 s\u1ED1 tim - ng\u1EF1c CTR (Cardiothoracic Ratio)">
                <i class="fa-solid fa-ruler-combined"></i> <span>Ch\u1EC9 S\u1ED1 CTR</span>
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

          <!-- Window Presets Bar -->
          <div class="xray-pacs-presets-bar">
            <span class="xray-presets-label"><i class="fa-solid fa-sliders"></i> C\u1EEDa S\u1ED5 PACS:</span>
            <button class="xray-preset-btn ${this.currentPreset === "DEFAULT" ? "active" : ""}" data-preset="DEFAULT" title="C\u1EEDa s\u1ED5 chu\u1EA9n X-quang ti\xEAu chu\u1EA9n">
              <i class="fa-solid fa-grip-lines"></i> Chu\u1EA9n
            </button>
            <button class="xray-preset-btn ${this.currentPreset === "LUNG" ? "active" : ""}" data-preset="LUNG" title="C\u1EEDa s\u1ED5 Nhu m\xF4 ph\u1ED5i (WL: -500, WW: 1500) - T\u1ED1i \u01B0u ph\xE1t hi\u1EC7n k\xEDnh m\u1EDD GGO & n\u1ED1t ph\u1EBF nang">
              <i class="fa-solid fa-lungs"></i> Nhu M\xF4 Ph\u1ED5i
            </button>
            <button class="xray-preset-btn ${this.currentPreset === "MEDIASTINUM" ? "active" : ""}" data-preset="MEDIASTINUM" title="C\u1EEDa s\u1ED5 Trung th\u1EA5t (WL: 40, WW: 400) - R\xF5 n\xE9t b\xF3ng tim, r\xE3nh li\xEAn th\xF9y & trung th\u1EA5t">
              <i class="fa-solid fa-heart"></i> Trung Th\u1EA5t
            </button>
            <button class="xray-preset-btn ${this.currentPreset === "BONE" ? "active" : ""}" data-preset="BONE" title="C\u1EEDa s\u1ED5 X\u01B0\u01A1ng (WL: 300, WW: 2000) - R\xF5 v\u1ECF x\u01B0\u01A1ng s\u01B0\u1EDDn, x\u01B0\u01A1ng \u0111\xF2n & c\u1ED9t s\u1ED1ng">
              <i class="fa-solid fa-bone"></i> X\u01B0\u01A1ng
            </button>
            <button class="xray-preset-btn ${this.currentPreset === "HIGH_DYNAMIC" ? "active" : ""}" data-preset="HIGH_DYNAMIC" title="T\u01B0\u01A1ng ph\u1EA3n \u0111\u1ED9ng k\u1EF9 thu\u1EADt s\u1ED1 cao (Clarity DR) - T\u1ED1i \u01B0u vi\u1EC1n m\xE0ng ph\u1ED5i, tr\xE0n d\u1ECBch khu tr\xFA & vi n\u1ED1t k\xEA">
              <i class="fa-solid fa-wand-magic-sparkles"></i> \u0110\u1ED9ng Cao (DR)
            </button>
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
          ${this.showCtrCalculator ? `
            <!-- CTR Interactive Calculator Card -->
            <div class="xray-findings-card" style="border-left: 5px solid #0284c7; background: #f0f9ff;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
                <span class="xray-badge xray-badge--mild" style="background: #0284c7; color: white;">
                  <i class="fa-solid fa-ruler-combined"></i> Th\u01B0\u1EDBc \u0110o Ch\u1EC9 S\u1ED1 Tim - Ng\u1EF1c CTR
                </span>
                <span style="font-size: 0.75rem; color: #0369a1; font-weight: 600;">Chu\u1EA9n X-quang Ng\u1EF1c Th\u1EB3ng PA</span>
              </div>

              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.75rem;">
                <div>
                  <label style="font-size: 0.72rem; color: #334155; font-weight: 600; display: block;">B\u1EDD Ph\u1EA3i (MRD, cm):</label>
                  <input type="number" id="inp-ctr-mrd" step="0.1" value="${this.mrdVal}" style="width: 100%; padding: 0.35rem 0.5rem; border-radius: 6px; border: 1px solid #bae6fd; font-size: 0.85rem; font-weight: 700; background: white;">
                </div>
                <div>
                  <label style="font-size: 0.72rem; color: #334155; font-weight: 600; display: block;">B\u1EDD Tr\xE1i (MLD, cm):</label>
                  <input type="number" id="inp-ctr-mld" step="0.1" value="${this.mldVal}" style="width: 100%; padding: 0.35rem 0.5rem; border-radius: 6px; border: 1px solid #bae6fd; font-size: 0.85rem; font-weight: 700; background: white;">
                </div>
                <div>
                  <label style="font-size: 0.72rem; color: #334155; font-weight: 600; display: block;">\u0110K L\u1ED3ng Ng\u1EF1c (ID, cm):</label>
                  <input type="number" id="inp-ctr-id" step="0.1" value="${this.idVal}" style="width: 100%; padding: 0.35rem 0.5rem; border-radius: 6px; border: 1px solid #bae6fd; font-size: 0.85rem; font-weight: 700; background: white;">
                </div>
              </div>

              ${(() => {
        const totalHeart = this.mrdVal + this.mldVal;
        const ctr = this.idVal > 0 ? Number((totalHeart / this.idVal).toFixed(2)) : 0;
        let ctrBadge = "B\xECnh th\u01B0\u1EDDng (CTR \u2264 0.50)";
        let ctrColor = "#10b981";
        if (ctr > 0.6) {
          ctrBadge = "B\xF3ng tim to N\u1EB6NG (\u0110\u1ED9 III, CTR > 0.60)";
          ctrColor = "#ef4444";
        } else if (ctr > 0.55) {
          ctrBadge = "B\xF3ng tim to TRUNG B\xCCNH (\u0110\u1ED9 II, 0.56 - 0.60)";
          ctrColor = "#f97316";
        } else if (ctr > 0.5) {
          ctrBadge = "B\xF3ng tim to NH\u1EB8 (\u0110\u1ED9 I, 0.51 - 0.55)";
          ctrColor = "#eab308";
        }
        return `
                  <div style="background: white; border: 1px solid #bae6fd; border-radius: 8px; padding: 0.65rem 0.85rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 0.8rem; color: #475569;">Ch\u1EC9 s\u1ED1 CTR = (${this.mrdVal} + ${this.mldVal}) / ${this.idVal} =</span>
                      <span style="font-family: var(--xray-font-mono); font-size: 1.15rem; font-weight: 800; color: ${ctrColor};">${ctr}</span>
                    </div>
                    <div style="margin-top: 0.35rem; font-size: 0.78rem; font-weight: 700; color: ${ctrColor};">
                      <i class="fa-solid fa-heart-pulse"></i> ${ctrBadge}
                    </div>
                  </div>
                `;
      })()}
            </div>
          ` : ""}

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
      this.renderer.setExamData(
        this.currentCase.examType,
        this.currentCase.findings,
        this.activeFindingId,
        this.currentCase.id,
        {
          age: this.currentCase.patientAge,
          gender: this.currentCase.patientGender,
          title: this.currentCase.title
        }
      );
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
            this.updateCtrDefaultsForCase(c.id);
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
            this.updateCtrDefaultsForCase(c.id);
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
      const btnCtr = this.container.querySelector("#pacs-btn-ctr");
      if (btnCtr) {
        btnCtr.addEventListener("click", () => {
          this.showCtrCalculator = !this.showCtrCalculator;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
        });
      }
      const inpMrd = this.container.querySelector("#inp-ctr-mrd");
      if (inpMrd) {
        inpMrd.addEventListener("input", (e) => {
          this.mrdVal = parseFloat(e.target.value) || 0;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
        });
      }
      const inpMld = this.container.querySelector("#inp-ctr-mld");
      if (inpMld) {
        inpMld.addEventListener("input", (e) => {
          this.mldVal = parseFloat(e.target.value) || 0;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
        });
      }
      const inpId = this.container.querySelector("#inp-ctr-id");
      if (inpId) {
        inpId.addEventListener("input", (e) => {
          this.idVal = parseFloat(e.target.value) || 1;
          this.render();
          this.initCanvas();
          this.attachEventListeners();
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
      this.container.querySelectorAll(".xray-preset-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const preset = e.currentTarget.dataset.preset;
          if (preset && this.renderer) {
            this.currentPreset = preset;
            this.renderer.setWindowPreset(preset);
            this.container.querySelectorAll(".xray-preset-btn").forEach((b) => b.classList.remove("active"));
            e.currentTarget.classList.add("active");
            if (sliderBright) sliderBright.value = String(this.renderer.state.brightness);
            if (sliderContrast) sliderContrast.value = String(this.renderer.state.contrast);
            const presetName = preset === "LUNG" ? "Nhu m\xF4 ph\u1ED5i" : preset === "MEDIASTINUM" ? "Trung th\u1EA5t" : preset === "BONE" ? "X\u01B0\u01A1ng" : preset === "HIGH_DYNAMIC" ? "T\u01B0\u01A1ng ph\u1EA3n \u0111\u1ED9ng cao" : "Chu\u1EA9n";
            this.showToast(`\u0110\xE3 chuy\u1EC3n sang c\u1EEDa s\u1ED5 ${presetName}!`);
          }
        });
      });
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
          this.currentPreset = "DEFAULT";
          this.renderer.setWindowPreset("DEFAULT");
          this.container.querySelectorAll(".xray-preset-btn").forEach((b) => {
            b.classList.toggle("active", b.dataset.preset === "DEFAULT");
          });
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
  return __toCommonJS(index_exports);
})();
