"use strict";
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

  // src/content/knowledge-vault/cdss/index.ts
  var index_exports = {};
  __export(index_exports, {
    ABCS_CHECKLIST_RULES: () => ABCS_CHECKLIST_RULES,
    ABG_PRESETS: () => ABG_PRESETS,
    AbgCDSSController: () => AbgCDSSController,
    BLOOD_PRODUCT_PROTOCOLS: () => BLOOD_PRODUCT_PROTOCOLS,
    CDC_STANDARD_WEIGHT: () => CDC_STANDARD_WEIGHT,
    CDSS_MODULES: () => CDSS_MODULES,
    CLINICAL_ECG_CASES: () => CLINICAL_ECG_CASES,
    DENGUE_BRANCH_RULES: () => DENGUE_BRANCH_RULES,
    DENGUE_FLUID_TEMPLATES: () => DENGUE_FLUID_TEMPLATES,
    DENGUE_NURSING_CHECKLIST: () => DENGUE_NURSING_CHECKLIST,
    DENGUE_VASOPRESSOR_PROTOCOLS: () => DENGUE_VASOPRESSOR_PROTOCOLS,
    DengueCDSSController: () => DengueCDSSController,
    ECG_CASES: () => ECG_CASES,
    EcgCDSSController: () => EcgCDSSController,
    EcgCanvasRenderer: () => EcgCanvasRenderer,
    KPA_TO_MMHG: () => KPA_TO_MMHG,
    LEAD_ANATOMY_MAP: () => LEAD_ANATOMY_MAP,
    LEAD_FILTER_DEFINITIONS: () => LEAD_FILTER_DEFINITIONS,
    LIVER_INJURY_PROTOCOL: () => LIVER_INJURY_PROTOCOL,
    MMHG_TO_KPA: () => MMHG_TO_KPA,
    SPECIAL_PATIENT_RULES: () => SPECIAL_PATIENT_RULES,
    XRayCDSSController: () => XRayCDSSController,
    XRayCanvasRenderer: () => XRayCanvasRenderer,
    analyzeABG: () => analyzeABG,
    assessSpecialPatient: () => assessSpecialPatient,
    calculateBloodProducts: () => calculateBloodProducts,
    calculateFluidSchedule: () => calculateFluidSchedule,
    calculateHIon: () => calculateHIon,
    calculateNACProtocol: () => calculateNACProtocol,
    calculateVasopressorDoses: () => calculateVasopressorDoses,
    calculateWeightAdjustment: () => calculateWeightAdjustment,
    classifyAgeGroup: () => classifyAgeGroup,
    convertPressureToKpa: () => convertPressureToKpa,
    convertPressureToMmHg: () => convertPressureToMmHg,
    evaluateHctBranch: () => evaluateHctBranch,
    generateABCSChecklist: () => generateABCSChecklist,
    generateCalibrationPulse: () => generateCalibrationPulse,
    generateDengueCDSSPlan: () => generateDengueCDSSPlan,
    generateLeadWaveformPoints: () => generateLeadWaveformPoints,
    getCDCStandardWeight: () => getCDCStandardWeight,
    getCDSSModuleById: () => getCDSSModuleById,
    getCDSSModuleBySlug: () => getCDSSModuleBySlug,
    initCDSSHub: () => initCDSSHub,
    playQrsBeep: () => playQrsBeep,
    pointsToSvgPath: () => pointsToSvgPath,
    validateUserManualAnnotations: () => validateUserManualAnnotations
  });

  // src/content/knowledge-vault/cdss/cdss-registry.ts
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
      shortDesc: "N\u1EC1n t\u1EA3ng tra c\u1EE9u l\xE2m s\xE0ng v\xE0 kh\xE1m th\u1EA7n kinh: m\xF4 ph\u1ECFng \u0111\u1ED9ng 2D/3D (ph\u1EA3n x\u1EA1 \xE1nh s\xE1ng \u0111\u1ED3ng t\u1EED, v\u1EADn nh\xE3n, khoanh da, d\xE1ng \u0111i, tho\xE1t v\u1ECB n\xE3o), thang \u0111i\u1EC3m c\u1EA5p c\u1EE9u NIHSS, GCS v\xE0 \u0111\u1ECBnh v\u1ECB t\u1ED5n th\u01B0\u01A1ng t\u1EE7y/n\xE3o.",
      category: "neurology",
      categoryName: "Th\u1EA7n kinh & \u0110\u1ED9t qu\u1EF5",
      version: "2.0.0",
      updatedAt: "2026-09-08",
      author: "CliniPortal NeuroExam Squad",
      guidelineSource: "AHA/ASA Guidelines for the Early Management of Patients With Acute Ischemic Stroke",
      icd10: ["I63", "I61", "G40", "G45", "R40"],
      icon: "fa-solid fa-brain",
      badge: "M\xF4 Ph\u1ECFng 2D/3D",
      isStandalone: true,
      standaloneUrl: "neuro/index.html"
    }
  ];
  function getCDSSModuleById(id) {
    return CDSS_MODULES.find((m) => m.id === id);
  }
  function getCDSSModuleBySlug(slug) {
    return CDSS_MODULES.find((m) => m.slug === slug);
  }

  // src/content/knowledge-vault/cdss/dengue/dengue-data.ts
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
          stageName: "C\u1EEF 3: Gi\u1EA3m xu\u1ED1ng 6 ml/kg/h (Ph\xE1c \u0111\u1ED3 BYT 2023)",
          defaultRateMlKgH: 6,
          rateOptions: [6],
          defaultDurationHours: 2,
          durationOptions: [2],
          hctCheckRequired: true,
          notes: "N\u1EA5c chu\u1EA9n h\xF3a 6 ml/kg/h theo Q\u0110 2760/Q\u0110-BYT. Ki\u1EC3m tra Hct, SpO2, m\u1EA1ch, HA."
        },
        {
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 3 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 3,
          durationOptions: [2, 3, 4],
          hctCheckRequired: false,
          notes: "L\u1EAFng nghe ran ph\u1ED5i, duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 ml/kg/h."
        },
        {
          stageName: "C\u1EEF 5: Duy tr\xEC 1.5 ml/kg/h & Cai d\u1ECBch",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: true,
          notes: "Gi\u1EA3m d\u1EA7n v\xE0 ng\u1EEBng truy\u1EC1n d\u1ECBch sau 24-48 gi\u1EDD."
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
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 3 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 2,
          durationOptions: [2, 3],
          hctCheckRequired: true,
          notes: "Cai d\u1ECBch s\u1EDBm, tr\xE1nh qu\xE1 t\u1EA3i t\xE1i h\u1EA5p thu."
        },
        {
          stageName: "C\u1EEF 5: Duy tr\xEC 1.5 ml/kg/h & Cai d\u1ECBch an to\xE0n",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: true,
          notes: "Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1 ml/kg/h tr\u01B0\u1EDBc khi ng\u01B0ng h\u1EB3n d\u1ECBch truy\u1EC1n."
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
          stageName: "C\u1EEF 4: Gi\u1EA3m xu\u1ED1ng 3 ml/kg/h",
          defaultRateMlKgH: 3,
          rateOptions: [3],
          defaultDurationHours: 3,
          durationOptions: [2, 3, 4],
          hctCheckRequired: true,
          notes: "Theo d\xF5i n\u01B0\u1EDBc ti\u1EC3u v\xE0 \xE1p l\u1EF1c t\u0129nh m\u1EA1ch."
        },
        {
          stageName: "C\u1EEF 5: Duy tr\xEC 1.5 ml/kg/h & Cai d\u1ECBch an to\xE0n",
          defaultRateMlKgH: 1.5,
          rateOptions: [1.5],
          defaultDurationHours: 4,
          durationOptions: [3, 4, 6],
          hctCheckRequired: true,
          notes: "\u0110\u01B0a v\u1EC1 t\u1ED1c \u0111\u1ED9 an to\xE0n v\xE0 ng\u01B0ng d\u1ECBch sau 24-48 gi\u1EDD."
        }
      ]
    }
  };
  var DENGUE_BRANCH_RULES = {
    // Nhánh tái sốc / chi lạnh ẩm
    cold_extremities: {
      name: "Chi L\u1EA1nh \u1EA8m / M\u1EA1ch Nhanh Nh\u1ECF",
      condition: "B\u1EC7nh nh\xE2n c\xF3 bi\u1EC3u hi\u1EC7n v\xE3 m\u1ED3 h\xF4i, chi l\u1EA1nh \u1EA9m, CRT > 2s, m\u1EA1ch nhanh nh\u1ECF nh\u01B0ng HA ch\u01B0a k\u1EB9p",
      action: "Truy\u1EC1n d\u1ECBch tinh th\u1EC3 (Ringer Lactate / NaCl 0.9%) t\u1ED1c \u0111\u1ED9 10 ml/kg/gi\u1EDD trong 1 gi\u1EDD.",
      targetHctCheck: true
    },
    // Nhánh sốc thất bại với dịch tinh thể + Hct cao
    shock_failed_high_hct: {
      name: "Kh\xF4ng \u0110\xE1p \u1EE8ng Tinh Th\u1EC3 + Hct T\u0103ng Cao (\u2265 40% ho\u1EB7c t\u0103ng so v\u1EDBi n\u1EC1n)",
      condition: "Sau 1-2h b\xF9 tinh th\u1EC3 li\u1EC1u cao m\xE0 m\u1EA1ch nhanh, HA k\u1EB9p/t\u1EE5t v\xE0 Hct v\u1EABn t\u0103ng cao",
      action: "Chuy\u1EC3n ngay sang D\u1ECBch Cao Ph\xE2n T\u1EED (Dextran 40 10% ho\u1EB7c HES 200 6%) li\u1EC1u 10 - 15 - 20 ml/kg/gi\u1EDD trong 1 gi\u1EDD.",
      precautions: "T\u1ED5ng l\u01B0\u1EE3ng Dextran 40 kh\xF4ng qu\xE1 30 ml/kg/24h, HES 200 kh\xF4ng qu\xE1 30-50 ml/kg/24h \u0111\u1EC3 tr\xE1nh suy th\u1EADn c\u1EA5p v\xE0 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u."
    },
    // Nhánh sốc thất bại với dịch tinh thể + Hct tụt
    shock_failed_low_hct: {
      name: "Kh\xF4ng \u0110\xE1p \u1EE8ng Tinh Th\u1EC3 + Hct Gi\u1EA3m Nhanh (\u2264 35% ho\u1EB7c gi\u1EA3m > 20% so v\u1EDBi n\u1EC1n)",
      condition: "Sau b\xF9 d\u1ECBch m\xE0 s\u1ED1c kh\xF4ng c\u1EA3i thi\u1EC7n, nh\u01B0ng Hct gi\u1EA3m nhanh \u0111\u1ED9t ng\u1ED9t",
      action: "Nghi ng\u1EDD xu\u1EA5t huy\u1EBFt n\u1ED9i t\u1EA1ng ti\u1EC1m \u1EA9n (ti\xEAu h\xF3a, \u1ED5 b\u1EE5ng, ph\xFAc m\u1EA1c). H\u1ED9i ch\u1EA9n kh\u1EA9n truy\u1EC1n Kh\u1ED1i H\u1ED3ng C\u1EA7u 5 - 10 ml/kg. Kh\xF4ng t\u0103ng ti\u1EBFp t\u1ED1c \u0111\u1ED9 tinh th\u1EC3/CPT.",
      targetHct: "35 - 40%"
    },
    // Điều kiện chuyển đổi Cao phân tử về Dịch tinh thể (Phụ lục 10)
    cpt_to_crystalloid: {
      name: "\u0110i\u1EC1u Ki\u1EC7n Chuy\u1EC3n \u0110\u1ED5i Cao Ph\xE2n T\u1EED \u2192 Tinh Th\u1EC3",
      criteria: [
        "M\u1EA1ch r\xF5, t\u1EA7n s\u1ED1 tim tr\u1EDF v\u1EC1 b\xECnh th\u01B0\u1EDDng theo tu\u1ED5i",
        "Huy\u1EBFt \xE1p b\xECnh th\u01B0\u1EDDng, hi\u1EC7u \xE1p > 30 mmHg",
        "Chi \u1EA5m, th\u1EDDi gian \u0111\u1ED5 \u0111\u1EA7y mao m\u1EA1ch CRT < 2 gi\xE2y",
        "L\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1.0 ml/kg/gi\u1EDD",
        "Hct gi\u1EA3m v\xE0 \u1ED5n \u0111\u1ECBnh"
      ],
      stepDownProtocol: "Gi\u1EA3m CPT: 10 ml/kg/h (1-2h) \u2192 7.5 ml/kg/h (1-2h) \u2192 5 ml/kg/h (2-3h) \u2192 Chuy\u1EC3n sang D\u1ECBch tinh th\u1EC3 5 ho\u1EB7c 3 ml/kg/h."
    }
  };
  var BLOOD_PRODUCT_PROTOCOLS = {
    red_blood_cells: {
      id: "hcl",
      name: "Kh\u1ED1i H\u1ED3ng C\u1EA7u (HCL)",
      indications: [
        "S\u1ED1c kh\xF4ng h\u1ED3i ph\u1EE5c sau b\xF9 d\u1ECBch k\xE8m Hct gi\u1EA3m nhanh > 20% so v\u1EDBi tr\u01B0\u1EDBc b\xF9 d\u1ECBch ho\u1EB7c Hct \u2264 35%",
        "Xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a ho\u1EB7c n\u1ED9i t\u1EA1ng \u1ED3 \u1EA1t (d\xF9 Hct l\xFAc \u0111\u1EA7u c\xF3 th\u1EC3 ch\u01B0a gi\u1EA3m do c\xF4 \u0111\u1EB7c m\xE1u)"
      ],
      dosePerKg: "5 - 10 ml/kg (ng\u01B0\u1EDDi l\u1EDBn: 1-2 \u0111\u01A1n v\u1ECB 250-350ml)",
      target: "Duy tr\xEC Hct \u0111\u1EA1t 35% - 40%",
      precautions: "B\xF9 d\u1ECBch trong khi ch\u1EDD m\xE1u; theo d\xF5i nguy c\u01A1 ph\xF9 ph\u1ED5i c\u1EA5p khi truy\u1EC1n nhanh tr\xEAn n\u1EC1n qu\xE1 t\u1EA3i d\u1ECBch."
    },
    fresh_frozen_plasma: {
      id: "ffp",
      name: "Huy\u1EBFt T\u01B0\u01A1ng T\u01B0\u01A1i \u0110\xF4ng L\u1EA1nh (FFP)",
      indications: [
        "R\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u n\u1EB7ng: INR > 1.5 ho\u1EB7c aPTT k\xE9o d\xE0i > 1.5 l\u1EA7n ch\u1EE9ng k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng \u0111ang ti\u1EBFn tri\u1EC3n",
        "C\u1EA7n ph\u1EABu thu\u1EADt ho\u1EB7c can thi\u1EC7p th\u1EE7 thu\u1EADt x\xE2m l\u1EA5n kh\u1EA9n c\u1EA5p"
      ],
      dosePerKg: "10 - 20 ml/kg",
      target: "\u0110\u01B0a INR v\u1EC1 < 1.5 v\xE0 aPTT v\u1EC1 < 1.5 l\u1EA7n ch\u1EE9ng",
      precautions: "Kh\xF4ng d\xF9ng FFP \u0111\u1EC3 b\xF9 th\u1EC3 t\xEDch \u0111\u01A1n thu\u1EA7n n\u1EBFu kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u ho\u1EB7c xu\u1EA5t huy\u1EBFt."
    },
    cryoprecipitate: {
      id: "cryo",
      name: "T\u1EE7a L\u1EA1nh (Cryoprecipitate)",
      indications: [
        "Fibrinogen m\xE1u < 1.0 g/L (100 mg/dL) k\xE8m xu\u1EA5t huy\u1EBFt \u0111e d\u1ECDa t\xEDnh m\u1EA1ng ho\u1EB7c \u0111ang ph\u1EABu thu\u1EADt"
      ],
      dosePerKg: "1 t\xFAi / 6 kg c\xE2n n\u1EB7ng (t\u01B0\u01A1ng \u0111\u01B0\u01A1ng 0.15 t\xFAi/kg; ng\u01B0\u1EDDi l\u1EDBn: 6 - 10 t\xFAi)",
      target: "N\xE2ng Fibrinogen l\xEAn \u2265 1.0 - 1.5 g/L",
      precautions: "Truy\u1EC1n nhanh ngay sau khi r\xE3 \u0111\xF4ng."
    },
    platelets: {
      id: "platelets",
      name: "Kh\u1ED1i Ti\u1EC3u C\u1EA7u",
      indications: [
        "Ti\u1EC3u c\u1EA7u < 50.000/mm\xB3 k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng (n\xE3o, ti\xEAu h\xF3a \u1ED3 \u1EA1t)",
        "Ti\u1EC3u c\u1EA7u < 5.000/mm\xB3 d\xF9 ch\u01B0a c\xF3 bi\u1EC3u hi\u1EC7n xu\u1EA5t huy\u1EBFt l\xE2m s\xE0ng",
        "C\u1EA7n ph\u1EABu thu\u1EADt c\u1EA5p c\u1EE9u v\xE0 ti\u1EC3u c\u1EA7u < 50.000/mm\xB3"
      ],
      dosePerKg: "Ti\u1EC3u c\u1EA7u \u0111\u1EADm \u0111\u1EB7c 1 \u0111\u01A1n v\u1ECB / 5 - 7 kg (ng\u01B0\u1EDDi l\u1EDBn: 1 pool 4-6 \u0111\u01A1n v\u1ECB ho\u1EB7c 1 kh\u1ED1i g\u1EA1n t\xE1ch m\xE1y Apheresis)",
      target: "C\u1EA7m m\xE1u l\xE2m s\xE0ng (kh\xF4ng truy\u1EC1n ti\u1EC3u c\u1EA7u \u0111\u1EC3 ph\xF2ng ng\u1EEBa n\u1EBFu kh\xF4ng c\xF3 ch\u1EC9 \u0111\u1ECBnh tr\xEAn)",
      precautions: "Kh\xF4ng truy\u1EC1n ti\u1EC3u c\u1EA7u d\u1EF1 ph\xF2ng khi ti\u1EC3u c\u1EA7u > 5.000/mm\xB3 kh\xF4ng xu\u1EA5t huy\u1EBFt (tr\xE1nh nguy c\u01A1 s\u1ED1c ph\u1EA3n v\u1EC7, qu\xE1 t\u1EA3i th\u1EC3 t\xEDch v\xE0 \u1EE9 \u0111\u1ECDng mi\u1EC5n d\u1ECBch)."
    }
  };
  var SPECIAL_PATIENT_RULES = {
    pregnancy: {
      name: "Ph\u1EE5 N\u1EEF Mang Thai (PNCT)",
      baselineHct: "28% - 40% (sinh l\xFD pha lo\xE3ng m\xE1u l\xFAc mang thai)",
      hemoconcentrationThreshold: "Hct > 36% - 38% \u0111\xE3 l\xE0 c\xF4 \u0111\u1EB7c m\xE1u b\u1EC7nh l\xFD",
      weightCorrection: "3 th\xE1ng cu\u1ED1i thai k\u1EF3: Tr\u1EEB b\u1EDBt 5 - 8 kg c\xE2n n\u1EB7ng thai + \u1ED1i + d\u1ECBch ngo\u1EA1i b\xE0o \u0111\u1EC3 t\xEDnh li\u1EC1u d\u1ECBch, tr\xE1nh ph\xF9 ph\u1ED5i c\u1EA5p.",
      posture: "N\u1EB1m nghi\xEAng tr\xE1i 15 - 30 \u0111\u1ED9 \u0111\u1EC3 gi\u1EA3i \xE1p t\u0129nh m\u1EA1ch ch\u1EE7 d\u01B0\u1EDBi, c\u1EA3i thi\u1EC7n tu\u1EA7n ho\xE0n nhau thai.",
      contraindication: "CH\u1ED0NG CH\u1EC8 \u0110\u1ECANH m\u1ED5 l\u1EA5y thai ho\u1EB7c kh\u1EDFi ph\xE1t chuy\u1EC3n d\u1EA1 ch\u1EE7 \u0111\u1ED9ng trong giai \u0111o\u1EA1n tho\xE1t huy\u1EBFt t\u01B0\u01A1ng c\u1EA5p (ng\xE0y 3-6) n\u1EBFu kh\xF4ng c\xF3 ch\u1EC9 \u0111\u1ECBnh sinh t\u1EED v\xEC nguy c\u01A1 xu\u1EA5t huy\u1EBFt v\xE0 s\u1ED1c t\u1EED vong c\u1EF1c cao."
    },
    thalassemia: {
      name: "B\u1EC7nh Nh\xE2n Thalassemia / Huy\u1EBFt T\xE1n M\xE3n",
      baselineHct: "20% - 28% (thi\u1EBFu m\xE1u n\u1EC1n m\u1EA1n t\xEDnh)",
      hemoconcentrationThreshold: "Hct t\u0103ng > 20% so v\u1EDBi Hct n\u1EC1n c\u1EE7a ch\xEDnh b\u1EC7nh nh\xE2n (VD: n\u1EC1n 22% -> Hct 27% \u0111\xE3 l\xE0 c\xF4 \u0111\u1EB7c m\xE1u n\u1EB7ng)",
      fluidCaution: "C\u01A1 tim b\u1EC7nh nh\xE2n Thalassemia th\u01B0\u1EDDng \u0111\xE3 qu\xE1 t\u1EA3i s\u1EAFt v\xE0 gi\xE3n bu\u1ED3ng tim, r\u1EA5t d\u1EC5 ph\xF9 ph\u1ED5i c\u1EA5p khi truy\u1EC1n d\u1ECBch nhanh. C\xE2n nh\u1EAFc \u0111o CVP s\u1EDBm.",
      fluidType: "\u01AFu ti\xEAn NaCl 0.9%, th\u1EADn tr\u1ECDng khi d\xF9ng Ringer Lactate n\u1EBFu c\xF3 \u1EE9 s\u1EAFt g\xE2y suy gan k\xE8m theo."
    },
    infant: {
      name: "Tr\u1EBB Nh\u0169 Nhi (< 12 Th\xE1ng Tu\u1ED5i)",
      baselineHct: "30% - 35%",
      risks: "D\u1EC5 co gi\u1EADt do s\u1ED1t cao, d\u1EC5 h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt, d\u1EC5 h\u1EA1 natri m\xE1u do b\xF9 n\u01B0\u1EDBc kh\xF4ng \u0111\xFAng c\xE1ch.",
      monitoring: "\u0110o \u0111\u01B0\u1EDDng huy\u1EBFt mao m\u1EA1ch m\u1ED7i 4-6 gi\u1EDD. B\xF9 Glucose 10% ngay n\u1EBFu \u0111\u01B0\u1EDDng huy\u1EBFt < 4.0 mmol/L (70 mg/dL)."
    }
  };
  var LIVER_INJURY_PROTOCOL = {
    tiers: [
      {
        level: "mild_moderate",
        astAltRange: "120 - 400 U/L",
        desc: "T\u1ED5n th\u01B0\u01A1ng gan nh\u1EB9 \u0111\u1EBFn v\u1EEBa",
        fluidAdvice: "C\xF3 th\u1EC3 d\xF9ng Ringer Lactate n\u1EBFu ch\u1EE9c n\u0103ng gan c\xF2n b\xF9 v\xE0 kh\xF4ng toan m\xE1u."
      },
      {
        level: "severe_hepatitis",
        astAltRange: "400 - 1000 U/L",
        desc: "Vi\xEAm gan c\u1EA5p n\u1EB7ng",
        fluidAdvice: "NG\u1EEANG D\xD9NG Ringer Lactate (chuy\u1EC3n sang NaCl 0.9% ho\u1EB7c Acetate Ringer/Plasma-Lyte). Ng\u1EEBng ngay Paracetamol."
      },
      {
        level: "acute_liver_failure",
        astAltRange: "\u2265 1000 U/L ho\u1EB7c k\xE8m r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u (INR > 1.5) / B\u1EC7nh n\xE3o gan",
        desc: "T\u1ED5n th\u01B0\u01A1ng gan t\u1ED1i c\u1EA5p / Suy gan c\u1EA5p",
        fluidAdvice: "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng d\xF9ng Ringer Lactate. Ch\u1EC9 \u0111\u1ECBnh ph\xE1c \u0111\u1ED3 N-Acetylcysteine (NAC) truy\u1EC1n t\u0129nh m\u1EA1ch."
      }
    ],
    nacProtocol: {
      name: "Ph\xE1c \u0110\u1ED3 N-Acetylcysteine (NAC) T\u0129nh M\u1EA1ch \u0110i\u1EC1u Tr\u1ECB Suy Gan SXHD",
      phases: [
        {
          phase: 1,
          name: "Pha 1: T\u1EA3i nhanh",
          doseMgKg: 150,
          durationHours: 1,
          diluent: "Glucose 5% 200ml (ho\u1EB7c 100ml \u1EDF tr\u1EBB em)"
        },
        {
          phase: 2,
          name: "Pha 2: Duy tr\xEC 1",
          doseMgKg: 50,
          durationHours: 4,
          diluent: "Glucose 5% 500ml (ho\u1EB7c 250ml \u1EDF tr\u1EBB em)"
        },
        {
          phase: 3,
          name: "Pha 3: Duy tr\xEC 2",
          doseMgKg: 100,
          durationHours: 16,
          diluent: "Glucose 5% 1000ml (ho\u1EB7c 500ml \u1EDF tr\u1EBB em)"
        },
        {
          phase: 4,
          name: "Pha 4: Duy tr\xEC ti\u1EBFp theo (n\u1EBFu ch\u01B0a h\u1ED3i ph\u1EE5c)",
          doseMgKg: 100,
          durationHours: 24,
          diluent: "Glucose 5% 1000ml truy\u1EC1n li\xEAn t\u1EE5c cho \u0111\u1EBFn khi men gan gi\u1EA3m v\xE0 INR < 1.5"
        }
      ],
      precautions: "Theo d\xF5i ph\u1EA3n \u1EE9ng ph\u1EA3n v\u1EC7/d\u1ECB \u1EE9ng v\u1EDBi NAC (ph\xE1t ban, co th\u1EAFt ph\u1EBF qu\u1EA3n); x\u1EED tr\xED b\u1EB1ng kh\xE1ng histamin n\u1EBFu c\xF3 bi\u1EC3u hi\u1EC7n."
    }
  };
  var DENGUE_VASOPRESSOR_PROTOCOLS = {
    dopamin: {
      drugName: "Dopamin",
      syringeVolumeMl: 50,
      diluent: "Glucose 5%",
      weightMultiplier: 3,
      // 3 * P (kg) mg
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "5 - 10 \xB5g/kg/ph\xFAt (t\u1ED1i \u0111a 20 \xB5g/kg/ph\xFAt)",
      indications: "L\u1EF1a ch\u1ECDn \u0111\u1EA7u tay \u1EDF tr\u1EBB em khi s\u1ED1c k\xE9o d\xE0i ho\u1EB7c t\xE1i s\u1ED1c \u0111\xE3 b\xF9 \u0111\u1EE7 d\u1ECBch.",
      precautions: "G\xE2y nh\u1ECBp nhanh xoang; t\u0103ng nhu c\u1EA7u oxy c\u01A1 tim."
    },
    noradrenalin: {
      drugName: "Noradrenalin",
      syringeVolumeMl: 50,
      diluent: "Glucose 5%",
      weightMultiplier: 0.3,
      // 0.3 * P (kg) mg
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 0.1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "0.05 - 0.5 \xB5g/kg/ph\xFAt (kh\u1EDFi \u0111\u1EA7u 0.1 \xB5g/kg/ph\xFAt)",
      indications: "S\u1ED1c gi\xE3n m\u1EA1ch (chi \u1EA5m, HA t\xE2m tr\u01B0\u01A1ng t\u1EE5t s\xE2u, \xE1p l\u1EF1c t\u01B0\u1EDBi m\xE1u k\xE9m) ho\u1EB7c ng\u01B0\u1EDDi l\u1EDBn s\u1ED1c tr\u01A1 d\u1ECBch.",
      precautions: "B\u1EAFt bu\u1ED9c truy\u1EC1n qua catheter t\u0129nh m\u1EA1ch trung t\xE2m ho\u1EB7c t\u0129nh m\u1EA1ch l\u1EDBn, tr\xE1nh ho\u1EA1i t\u1EED m\xF4 khi tho\xE1t m\u1EA1ch."
    },
    dobutamin: {
      drugName: "Dobutamin",
      syringeVolumeMl: 50,
      diluent: "Glucose 5%",
      weightMultiplier: 3,
      // 3 * P (kg) mg
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "3 - 10 \xB5g/kg/ph\xFAt (t\u1ED1i \u0111a 15 \xB5g/kg/ph\xFAt)",
      indications: "Suy gi\u1EA3m ch\u1EE9c n\u0103ng c\u01A1 tim, CVP cao (> 10-12 cmH\u2082O), \xE1p l\u1EF1c t\u0129nh m\u1EA1ch cao k\xE8m HA k\u1EB9p, cung l\u01B0\u1EE3ng tim th\u1EA5p.",
      precautions: "C\xF3 th\u1EC3 g\xE2y t\u1EE5t huy\u1EBFt \xE1p n\u1EBFu ch\u01B0a b\xF9 \u0111\u1EE7 th\u1EC3 t\xEDch d\u1ECBch; c\u1EA7n ph\u1ED1i h\u1EE3p Noradrenalin n\u1EBFu c\xF3 k\xE8m t\u1EE5t HA t\xE2m tr\u01B0\u01A1ng."
    },
    adrenalin: {
      drugName: "Adrenalin",
      syringeVolumeMl: 50,
      diluent: "Glucose 5%",
      weightMultiplier: 0.3,
      // 0.3 * P (kg) mg
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 0.1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "0.05 - 0.3 \xB5g/kg/ph\xFAt",
      indications: "S\u1ED1c nguy k\u1ECBch, s\u1ED1c tr\u01A1 v\u1EDBi Dopamin v\xE0 Noradrenalin, ho\u1EB7c c\xF3 k\xE8m nh\u1ECBp tim ch\u1EADm nghi\xEAm tr\u1ECDng.",
      precautions: "Nguy c\u01A1 lo\u1EA1n nh\u1ECBp tim cao, co m\u1EA1ch ngo\u1EA1i vi m\u1EA1nh g\xE2y thi\u1EBFu m\xE1u \u0111\u1EA7u chi."
    }
  };
  var ABCS_CHECKLIST_RULES = {
    acidosis: {
      title: "A \u2014 Acidosis (Toan Chuy\u1EC3n H\xF3a)",
      criteria: "Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch: pH < 7.15 ho\u1EB7c HCO\u2083\u207B < 10 mmol/L k\xE8m s\u1ED1c k\xE9o d\xE0i tr\u01A1 v\u1EDBi d\u1ECBch truy\u1EC1n",
      action: "B\xF9 Natri Bicarbonat 4.2% (ho\u1EB7c 8.4% pha lo\xE3ng) theo c\xF4ng th\u1EE9c: L\u01B0\u1EE3ng NaHCO\u2083 4.2% (ml) = BE \xD7 C\xE2n n\u1EB7ng (kg) \xD7 0.3 (ho\u1EB7c 1-2 ml/kg truy\u1EC1n ch\u1EADm trong 30-60 ph\xFAt)."
    },
    bleeding: {
      title: "B \u2014 Bleeding (Xu\u1EA5t Huy\u1EBFt \u1EA8n)",
      criteria: "Hct t\u1EE5t \u0111\u1ED9t ng\u1ED9t sau b\xF9 d\u1ECBch (gi\u1EA3m > 20% ho\u1EB7c \u2264 35%) trong khi m\u1EA1ch nhanh, HA v\u1EABn k\u1EB9p ho\u1EB7c t\u1EE5t",
      action: "Nghi ng\u1EDD xu\u1EA5t huy\u1EBFt n\u1ED9i t\u1EA1ng ti\u1EC1m \u1EA9n (d\u1EA1 d\xE0y, \u1ED5 b\u1EE5ng, t\u1EE5 m\xE1u th\xE0nh b\u1EE5ng). H\u1ED9i ch\u1EA9n kh\u1EA9n truy\u1EC1n Kh\u1ED1i H\u1ED3ng C\u1EA7u 5-10 ml/kg, \u0111\u1EB7t sonde d\u1EA1 d\xE0y, n\u1ED9i soi c\u1EA7m m\xE1u khi huy\u1EBFt \u0111\u1ED9ng cho ph\xE9p."
    },
    calcium: {
      title: "C \u2014 Calcium (H\u1EA1 Canxi M\xE1u)",
      criteria: "Canxi ion h\xF3a (Ca\xB2\u207A) < 1.0 mmol/L (th\u01B0\u1EDDng g\u1EB7p khi truy\u1EC1n m\xE1u ho\u1EB7c toan chuy\u1EC3n h\xF3a n\u1EB7ng l\xE0m gi\u1EA3m co b\xF3p c\u01A1 tim)",
      action: "Ti\xEAm Canxi Clorid 10% 0.2 ml/kg (ho\u1EB7c Canxi Gluconate 10% 0.5-1 ml/kg) pha lo\xE3ng v\u1EDBi Glucose 5% ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm trong 10-15 ph\xFAt d\u01B0\u1EDBi theo d\xF5i monitor nh\u1ECBp tim."
    },
    sugar: {
      title: "S \u2014 Sugar (H\u1EA1 \u0110\u01B0\u1EDDng Huy\u1EBFt)",
      criteria: "\u0110\u01B0\u1EDDng huy\u1EBFt mao m\u1EA1ch < 4.0 mmol/L (< 70 mg/dL)",
      action: "Bolus Glucose 10% 2 ml/kg ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm trong 3-5 ph\xFAt, sau \u0111\xF3 duy tr\xEC truy\u1EC1n d\u1ECBch ch\u1EE9a Glucose 5% ho\u1EB7c 10% \u0111\u1EC3 gi\u1EEF \u0111\u01B0\u1EDDng huy\u1EBFt 5 - 8 mmol/L."
    }
  };
  var DENGUE_NURSING_CHECKLIST = [
    "\u0110o sinh hi\u1EC7u (M\u1EA1ch, HA, Nh\u1ECBp th\u1EDF, SpO2) v\xE0 ki\u1EC3m tra tri gi\xE1c tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9 truy\u1EC1n.",
    "\u0110o Hct t\u1EA1i gi\u01B0\u1EDDng tr\u01B0\u1EDBc v\xE0 sau m\u1ED7i \u0111\u1EE3t t\u0103ng/gi\u1EA3m t\u1ED1c \u0111\u1ED9 d\u1ECBch ho\u1EB7c khi b\u1EC7nh nh\xE2n b\u1EE9t r\u1EE9t, v\xE3 m\u1ED3 h\xF4i, chi l\u1EA1nh.",
    "\u0110\u1EB7t sonde ti\u1EC3u theo d\xF5i l\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u m\u1ED7i gi\u1EDD \u1EDF b\u1EC7nh nh\xE2n s\u1ED1c; b\xE1o b\xE1c s\u0129 ngay n\u1EBFu n\u01B0\u1EDBc ti\u1EC3u < 0.5 ml/kg/h.",
    "Ki\u1EC3m tra \u0111\u1ECBnh k\u1EF3 d\u1ECBch d\u01B0 trong chai tr\u01B0\u1EDBc khi treo th\xEAm chai m\u1EDBi; ghi r\xF5 s\u1ED1 ml d\u1ECBch hi\u1EC7n t\u1EA1i v\xE0o h\u1ED3 s\u01A1.",
    "L\u1EAFng nghe ph\u1ED5i t\xECm ran \u1EA9m, ph\xE1t hi\u1EC7n s\u1EDBm ph\xF9 ph\u1ED5i c\u1EA5p (kh\xF3 th\u1EDF, b\u1ECDt h\u1ED3ng, SpO2 t\u1EE5t, gan to nhanh \u0111au t\u1EE9c).",
    "Tuy\u1EC7t \u0111\u1ED1i c\u1EA5m ti\xEAm b\u1EAFp, d\xF9ng Aspirin, Ibuprofen v\xE0 c\xE1c thu\u1ED1c NSAIDs.",
    'B\xE0n giao c\u1EEF r\xF5 r\xE0ng: D\xF9ng n\xFAt "Sao Ch\xE9p B\u1EA3ng B\xE0n Giao C\u1EEF" tr\xEAn CDSS \u0111\u1EC3 d\xE1n v\xE0o phi\u1EBFu theo d\xF5i giao ban.',
    "Si\xEAu \xE2m t\u1EA1i gi\u01B0\u1EDDng (POCUS) \u0111\xE1nh gi\xE1 \u0111\u01B0\u1EDDng k\xEDnh v\xE0 \u0111\u1ED9 x\u1EB9p t\u0129nh m\u1EA1ch ch\u1EE7 d\u01B0\u1EDBi (IVC) \u0111\u1EC3 h\u01B0\u1EDBng d\u1EABn b\xF9 d\u1ECBch v\xE0 tr\xE1nh ph\xF9 ph\u1ED5i c\u1EA5p.",
    "X\xE1c nh\u1EADn lo\u1EA1i d\u1ECBch truy\u1EC1n: Kh\xF4ng d\xF9ng Ringer Lactate khi b\u1EC7nh nh\xE2n c\xF3 t\u1ED5n th\u01B0\u01A1ng gan c\u1EA5p n\u1EB7ng (AST/ALT \u2265 400 U/L ho\u1EB7c suy gan); \u0111\u1ED5i ngay sang NaCl 0.9%.",
    "Xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a: \u0110\u1EB7t sonde d\u1EA1 d\xE0y ki\u1EC3m tra d\u1ECBch, d\xF9ng PPI li\u1EC1u cao (Omeprazole 80mg bolus t\u0129nh m\u1EA1ch r\u1ED3i 8mg/gi\u1EDD ho\u1EB7c 40mg TM m\u1ED7i 12 gi\u1EDD)."
  ];

  // src/content/knowledge-vault/cdss/dengue/dengue-engine.ts
  function classifyAgeGroup(ageYears) {
    if (ageYears >= 16) return "adult";
    if (ageYears >= 13) return "adolescent";
    return "child";
  }
  function calculateWeightAdjustment(ageYears, gender, actualWeightKg, isPregnant, pregnancyTrimester) {
    const stdWeight = getCDCStandardWeight(ageYears, gender);
    const ratio = actualWeightKg / stdWeight;
    const isObese = ratio > 1.2;
    let adjustedWeightKg = actualWeightKg;
    let formulaNote = "C\xE2n n\u1EB7ng th\u1EF1c t\u1EBF (Kh\xF4ng qu\xE1 ng\u01B0\u1EE1ng th\u1EEBa c\xE2n 120%)";
    let warningText = void 0;
    if (isPregnant && gender === "female") {
      if (pregnancyTrimester === 3) {
        adjustedWeightKg = Math.max(38, actualWeightKg - 6);
        formulaNote = `PNCT tam c\xE1 nguy\u1EC7t 3: Tr\u1EEB 6kg tr\u1ECDng l\u01B0\u1EE3ng thai & d\u1ECBch \u1ED1i (${actualWeightKg}kg \u2192 ${adjustedWeightKg}kg) \u0111\u1EC3 t\xEDnh li\u1EC1u d\u1ECBch b\xF9 tu\u1EA7n ho\xE0n m\u1EB9, ph\xF2ng ng\u1EEBa ph\xF9 ph\u1ED5i c\u1EA5p.`;
        warningText = `S\u1EA3n ph\u1EE5 mang thai 3 th\xE1ng cu\u1ED1i: C\u01A1 th\u1EC3 c\xF3 hi\u1EC7n t\u01B0\u1EE3ng gi\u1EEF n\u01B0\u1EDBc sinh l\xFD. B\u1EAFt bu\u1ED9c d\xF9ng c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh ${adjustedWeightKg} kg \u0111\u1EC3 b\xF9 d\u1ECBch; n\u1EB1m nghi\xEAng tr\xE1i 15-30 \u0111\u1ED9.`;
      } else if (pregnancyTrimester === 2) {
        adjustedWeightKg = Math.max(38, actualWeightKg - 3);
        formulaNote = `PNCT tam c\xE1 nguy\u1EC7t 2: Tr\u1EEB 3kg tr\u1ECDng l\u01B0\u1EE3ng thai & t\u1EED cung (${actualWeightKg}kg \u2192 ${adjustedWeightKg}kg).`;
      }
      return {
        actualWeightKg,
        standardWeightKg: stdWeight,
        isObese: false,
        ratioToStandard: ratio,
        adjustedWeightKg,
        formulaNote,
        warningText,
        isPregnantAdjusted: true,
        pregnancyTrimester
      };
    }
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
      warningText,
      isPregnantAdjusted: false
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
  function evaluateHctBranch(patient, effectiveWeightKg) {
    const curHct = patient.currentHctPercent ?? patient.initialHctPercent ?? 40;
    const baseHct = patient.baselineHctPercent ?? (patient.gender === "male" ? 42 : 38);
    const hctDiffPercent = (curHct - baseHct) / baseHct * 100;
    const isRefractory = patient.clinicalResponse === "refractory";
    const isWorsened = patient.clinicalResponse === "worsened";
    if (patient.massiveBleeding || isRefractory && curHct <= 35 || hctDiffPercent < -20 && (patient.severity === "shock" || patient.severity === "severe_shock")) {
      return {
        branchType: "blood",
        title: "Nh\xE1nh C\u1EA3nh B\xE1o: S\u1ED1c Kh\xF4ng H\u1ED3i Ph\u1EE5c K\xE8m Gi\u1EA3m Hct / Xu\u1EA5t Huy\u1EBFt \u1EA8n",
        recommendedFluid: "Kh\u1ED1i H\u1ED3ng C\u1EA7u (HCL)",
        rateMlKgH: 5,
        durationHours: 2,
        reasoning: `B\u1EC7nh nh\xE2n s\u1ED1c k\xE8m Hct gi\u1EA3m th\u1EA5p (${curHct}%) ho\u1EB7c xu\u1EA5t huy\u1EBFt \u0111e d\u1ECDa t\xEDnh m\u1EA1ng. Th\u1EC3 hi\u1EC7n ch\u1EA3y m\xE1u n\u1ED9i t\u1EA1ng ho\u1EB7c ti\xEAu h\xF3a ti\u1EC1m \u1EA9n. B\u1EAFt bu\u1ED9c h\u1ED9i ch\u1EA9n truy\u1EC1n Kh\u1ED1i H\u1ED3ng C\u1EA7u 5-10 ml/kg (${Math.round(effectiveWeightKg * 5)} - ${Math.round(effectiveWeightKg * 10)} ml), ng\u1EEBng t\u0103ng ti\u1EBFp t\u1ED1c \u0111\u1ED9 d\u1ECBch tinh th\u1EC3/CPT.`,
        warnings: [
          "Kh\xF4ng t\u0103ng t\u1ED1c \u0111\u1ED9 d\u1ECBch tinh th\u1EC3 \u0111\u01A1n thu\u1EA7n khi Hct t\u1EE5t v\xEC s\u1EBD g\xE2y pha lo\xE3ng m\xE1u v\xE0 n\u1EB7ng th\xEAm r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u.",
          "\u0110\u1EB7t \u1ED1ng th\xF4ng d\u1EA1 d\xE0y ki\u1EC3m tra d\u1ECBch xu\u1EA5t huy\u1EBFt ti\xEAu h\xF3a.",
          "Duy tr\xEC \u0111\xEDch Hct \u0111\u1EA1t 35% - 40%."
        ]
      };
    }
    if ((isRefractory || isWorsened || patient.severity === "severe_shock") && (curHct >= 40 || patient.hasThalassemia && hctDiffPercent >= 20)) {
      return {
        branchType: "cpt",
        title: "Nh\xE1nh Chuy\u1EC3n \u0110\u1ED5i: Cao Ph\xE2n T\u1EED (Dextran 40 10% / HES 200 6%)",
        recommendedFluid: "Dextran 40 10% ho\u1EB7c Hydroxyethyl Starch (HES 200 6%)",
        rateMlKgH: 15,
        durationHours: 1,
        reasoning: `S\u1ED1c kh\xF4ng \u0111\xE1p \u1EE9ng v\u1EDBi tinh th\u1EC3 sau 1-2 gi\u1EDD k\xE8m c\xF4 \u0111\u1EB7c m\xE1u n\u1EB7ng (Hct = ${curHct}%). Hi\u1EC7n t\u01B0\u1EE3ng tho\xE1t huy\u1EBFt t\u01B0\u01A1ng \u1ED3 \u1EA1t ti\u1EBFp di\u1EC5n l\xE0m s\u1EE5p \u0111\u1ED5 th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n hi\u1EC7u d\u1EE5ng. Ch\u1EC9 \u0111\u1ECBnh d\xF9ng D\u1ECBch Cao Ph\xE2n T\u1EED li\u1EC1u 10 - 15 - 20 ml/kg/gi\u1EDD.`,
        warnings: [
          "T\u1ED5ng li\u1EC1u Dextran 40 kh\xF4ng qu\xE1 30 ml/kg/24h, HES 200 kh\xF4ng qu\xE1 30-50 ml/kg/24h \u0111\u1EC3 tr\xE1nh suy th\u1EADn c\u1EA5p v\xE0 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u.",
          "Khi huy\u1EBFt \u0111\u1ED9ng c\u1EA3i thi\u1EC7n (m\u1EA1ch r\xF5, HA \u1ED5n \u0111\u1ECBnh, n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5-1 ml/kg/h): Gi\u1EA3m CPT 10 \u2192 7.5 \u2192 5 ml/kg/h r\u1ED3i chuy\u1EC3n v\u1EC1 D\u1ECBch tinh th\u1EC3 5 ho\u1EB7c 3 ml/kg/h."
        ]
      };
    }
    if (patient.clinicalResponse === "worsened" && patient.severity === "warning_signs") {
      return {
        branchType: "standard",
        title: "Nh\xE1nh Chi L\u1EA1nh \u1EA8m / Nguy C\u01A1 V\xE0o S\u1ED1c",
        recommendedFluid: "Ringer Lactate ho\u1EB7c NaCl 0.9%",
        rateMlKgH: 10,
        durationHours: 1,
        reasoning: "V\xE3 m\u1ED3 h\xF4i, chi l\u1EA1nh \u1EA9m, m\u1EA1ch nhanh nh\u1ECF nh\u01B0ng HA ch\u01B0a k\u1EB9p. B\xF9 d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng 10 ml/kg/gi\u1EDD trong 1 gi\u1EDD v\xE0 \u0111\xE1nh gi\xE1 l\u1EA1i ngay.",
        warnings: ["\u0110o l\u1EA1i Hct v\xE0 sinh hi\u1EC7u sau 1 gi\u1EDD truy\u1EC1n."]
      };
    }
    return {
      branchType: "standard",
      title: "Ph\xE1c \u0110\u1ED3 B\xF9 D\u1ECBch Chu\u1EA9n H\xF3a Theo B\u1EADc B\u1ED9 Y T\u1EBF",
      recommendedFluid: patient.liverEnzymesAST_ALT && patient.liverEnzymesAST_ALT >= 400 ? "NaCl 0.9% (Kh\xF4ng d\xF9ng Ringer Lactate)" : "Ringer Lactate / NaCl 0.9%",
      rateMlKgH: templatesRate(patient),
      durationHours: 2,
      reasoning: "Huy\u1EBFt \u0111\u1ED9ng theo d\xF5i theo b\u1EADc chu\u1EA9n h\xF3a. \u0110i\u1EC1u d\u01B0\u1EE1ng tu\xE2n th\u1EE7 ki\u1EC3m tra sinh hi\u1EC7u v\xE0 Hct tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9 d\u1ECBch.",
      warnings: ["Gi\xE1m s\xE1t l\u01B0\u1EE3ng n\u01B0\u1EDBc ti\u1EC3u m\u1ED7i gi\u1EDD (\u0111\xEDch \u2265 0.5 - 1.0 ml/kg/h)."]
    };
  }
  function templatesRate(patient) {
    const ageGroup = classifyAgeGroup(patient.ageYears);
    return DENGUE_FLUID_TEMPLATES[patient.severity][ageGroup][0]?.defaultRateMlKgH || 6;
  }
  function calculateBloodProducts(effectiveWeightKg, patient) {
    const curHct = patient.currentHctPercent ?? patient.initialHctPercent ?? 40;
    const inr = patient.inrValue ?? 1;
    const fbg = patient.fibrinogenGL ?? 2.5;
    const plt = patient.plateletsCount ?? 15e4;
    const massiveBleed = !!patient.massiveBleeding;
    const hclDoseMl = `${Math.round(effectiveWeightKg * 5)} - ${Math.round(effectiveWeightKg * 10)} ml`;
    const ffpDoseMl = `${Math.round(effectiveWeightKg * 10)} - ${Math.round(effectiveWeightKg * 20)} ml`;
    const cryoBags = Math.max(1, Math.round(effectiveWeightKg / 6));
    const pltUnits = Math.max(1, Math.round(effectiveWeightKg / 6));
    return [
      {
        id: "hcl",
        productName: "Kh\u1ED1i H\u1ED3ng C\u1EA7u (HCL)",
        indication: "S\u1ED1c kh\xF4ng h\u1ED3i ph\u1EE5c sau b\xF9 d\u1ECBch k\xE8m Hct \u2264 35% HO\u1EB6C gi\u1EA3m > 20% so v\u1EDBi n\u1EC1n, ho\u1EB7c xu\u1EA5t huy\u1EBFt \u1ED3 \u1EA1t.",
        doseFormula: "5 - 10 ml/kg (ho\u1EB7c 1 - 2 \u0111\u01A1n v\u1ECB)",
        calculatedDose: hclDoseMl,
        thresholdMet: massiveBleed || curHct <= 35,
        targetClinical: "\u0110\u01B0a Hct v\u1EC1 m\u1EE9c \u0111\xEDch an to\xE0n 35% - 40%",
        precautions: "B\xF9 d\u1ECBch trong khi ch\u1EDD m\xE1u; theo d\xF5i nguy c\u01A1 ph\xF9 ph\u1ED5i c\u1EA5p khi truy\u1EC1n d\u1ECBch/m\xE1u nhanh."
      },
      {
        id: "ffp",
        productName: "Huy\u1EBFt T\u01B0\u01A1ng T\u01B0\u01A1i \u0110\xF4ng L\u1EA1nh (FFP)",
        indication: "R\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u n\u1EB7ng (INR > 1.5 ho\u1EB7c aPTT > 1.5 l\u1EA7n ch\u1EE9ng) k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng ho\u1EB7c c\u1EA7n ph\u1EABu thu\u1EADt/th\u1EE7 thu\u1EADt x\xE2m l\u1EA5n.",
        doseFormula: "10 - 20 ml/kg",
        calculatedDose: ffpDoseMl,
        thresholdMet: inr > 1.5 || massiveBleed && inr > 1.3,
        targetClinical: "\u0110\u01B0a INR v\u1EC1 < 1.5, ph\u1EE5c h\u1ED3i c\xE1c y\u1EBFu t\u1ED1 \u0111\xF4ng m\xE1u huy\u1EBFt t\u01B0\u01A1ng",
        precautions: "Kh\xF4ng d\xF9ng FFP \u0111\u1EC3 b\xF9 th\u1EC3 t\xEDch \u0111\u01A1n thu\u1EA7n n\u1EBFu kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u."
      },
      {
        id: "cryo",
        productName: "T\u1EE7a L\u1EA1nh (Cryoprecipitate)",
        indication: "Fibrinogen m\xE1u < 1.0 g/L k\xE8m xu\u1EA5t huy\u1EBFt n\u1EB7ng ho\u1EB7c \u0111ang ti\u1EBFn h\xE0nh ph\u1EABu thu\u1EADt kh\u1EA9n c\u1EA5p.",
        doseFormula: "1 t\xFAi / 6 kg c\xE2n n\u1EB7ng (t\u01B0\u01A1ng \u0111\u01B0\u01A1ng 0.15 t\xFAi/kg)",
        calculatedDose: `${cryoBags} t\xFAi`,
        thresholdMet: fbg < 1,
        targetClinical: "N\xE2ng n\u1ED3ng \u0111\u1ED9 Fibrinogen m\xE1u l\xEAn \u2265 1.0 - 1.5 g/L",
        precautions: "Truy\u1EC1n nhanh ngay sau khi r\xE3 \u0111\xF4ng; theo d\xF5i ph\u1EA3n \u1EE9ng d\u1ECB \u1EE9ng."
      },
      {
        id: "platelets",
        productName: "Kh\u1ED1i Ti\u1EC3u C\u1EA7u \u0110\u1EADm \u0110\u1EB7c",
        indication: "Ti\u1EC3u c\u1EA7u < 50.000/mm\xB3 k\xE8m xu\u1EA5t huy\u1EBFt \u0111e d\u1ECDa t\xEDnh m\u1EA1ng (n\xE3o, ti\xEAu h\xF3a \u1ED3 \u1EA1t); HO\u1EB6C Ti\u1EC3u c\u1EA7u < 5.000/mm\xB3 d\xF9 ch\u01B0a xu\u1EA5t huy\u1EBFt l\xE2m s\xE0ng.",
        doseFormula: "1 \u0111\u01A1n v\u1ECB \u0111\u1EADm \u0111\u1EB7c / 5 - 7 kg (ng\u01B0\u1EDDi l\u1EDBn: 1 pool 4-6 \u0111v ho\u1EB7c 1 kh\u1ED1i g\u1EA1n Apheresis)",
        calculatedDose: `${pltUnits} \u0111\u01A1n v\u1ECB \u0111\u1EADm \u0111\u1EB7c`,
        thresholdMet: plt < 5e3 || plt < 5e4 && massiveBleed,
        targetClinical: "C\u1EA7m m\xE1u l\xE2m s\xE0ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng",
        precautions: "KH\xD4NG truy\u1EC1n ti\u1EC3u c\u1EA7u d\u1EF1 ph\xF2ng khi ti\u1EC3u c\u1EA7u > 5.000/mm\xB3 m\xE0 kh\xF4ng c\xF3 xu\u1EA5t huy\u1EBFt n\u1EB7ng (tr\xE1nh nguy c\u01A1 qu\xE1 t\u1EA3i d\u1ECBch v\xE0 ph\u1EA3n \u1EE9ng mi\u1EC5n d\u1ECBch)."
      }
    ];
  }
  function calculateNACProtocol(effectiveWeightKg, astAltVal) {
    const val = astAltVal ?? 40;
    if (val >= 1e3) {
      const p1Mg = Math.round(150 * effectiveWeightKg);
      const p2Mg = Math.round(50 * effectiveWeightKg);
      const p3Mg = Math.round(100 * effectiveWeightKg);
      const p4Mg = Math.round(100 * effectiveWeightKg);
      const phases = [
        {
          phase: 1,
          phaseName: "Pha 1: T\u1EA3i nhanh",
          doseMgKg: 150,
          infusionTimeHours: 1,
          diluent: "Glucose 5% 200ml (ho\u1EB7c 100ml \u1EDF tr\u1EBB nh\u1ECF)",
          totalMg: p1Mg,
          pumpRateMlH: "200 ml/gi\u1EDD"
        },
        {
          phase: 2,
          phaseName: "Pha 2: Duy tr\xEC 1",
          doseMgKg: 50,
          infusionTimeHours: 4,
          diluent: "Glucose 5% 500ml (ho\u1EB7c 250ml \u1EDF tr\u1EBB nh\u1ECF)",
          totalMg: p2Mg,
          pumpRateMlH: "125 ml/gi\u1EDD (tr\u1EBB: 62.5 ml/h)"
        },
        {
          phase: 3,
          phaseName: "Pha 3: Duy tr\xEC 2",
          doseMgKg: 100,
          infusionTimeHours: 16,
          diluent: "Glucose 5% 1000ml (ho\u1EB7c 500ml \u1EDF tr\u1EBB nh\u1ECF)",
          totalMg: p3Mg,
          pumpRateMlH: "62.5 ml/gi\u1EDD (tr\u1EBB: 31.2 ml/h)"
        },
        {
          phase: 4,
          phaseName: "Pha 4: Duy tr\xEC ti\u1EBFp theo",
          doseMgKg: 100,
          infusionTimeHours: 24,
          diluent: "Glucose 5% 1000ml truy\u1EC1n li\xEAn t\u1EE5c cho \u0111\u1EBFn khi men gan gi\u1EA3m v\xE0 INR < 1.5",
          totalMg: p4Mg,
          pumpRateMlH: "41.6 ml/gi\u1EDD"
        }
      ];
      return {
        indicated: true,
        severityLevel: "acute_liver_failure",
        astAltVal: val,
        summary: `T\u1ED4N TH\u01AF\u01A0NG GAN T\u1ED0I C\u1EA4P / SUY GAN (AST/ALT ${val} U/L): Ch\u1EC9 \u0111\u1ECBnh ph\xE1c \u0111\u1ED3 N-Acetylcysteine (NAC) truy\u1EC1n t\u0129nh m\u1EA1ch 4 pha. TUY\u1EC6T \u0110\u1ED0I NG\u1EEANG Ringer Lactate & Paracetamol.`,
        phases,
        precautions: [
          "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng d\xF9ng Ringer Lactate (chuy\u1EC3n sang NaCl 0.9% ho\u1EB7c Acetate Ringer/Plasma-Lyte).",
          "Ng\u1EEBng ngay l\u1EADp t\u1EE9c Paracetamol.",
          "Theo d\xF5i ph\u1EA3n \u1EE9ng d\u1EA1ng ph\u1EA3n v\u1EC7 v\u1EDBi NAC (m\u1EA9n ng\u1EE9a, \u0111\u1ECF da, co th\u1EAFt ph\u1EBF qu\u1EA3n)."
        ]
      };
    }
    if (val >= 400) {
      return {
        indicated: false,
        severityLevel: "severe_hepatitis",
        astAltVal: val,
        summary: `VI\xCAM GAN C\u1EA4P N\u1EB6NG (AST/ALT ${val} U/L): C\u1EA5m d\xF9ng Ringer Lactate (gan suy gi\u1EA3m chuy\u1EC3n h\xF3a Lactate g\xE2y toan m\xE1u lactic). \u0110\u1ED5i sang NaCl 0.9%. Ng\u1EEBng ngay Paracetamol.`,
        phases: [],
        precautions: [
          "Kh\xF4ng d\xF9ng Ringer Lactate. B\u1EAFt bu\u1ED9c d\xF9ng NaCl 0.9%.",
          "C\u1EA5m d\xF9ng Paracetamol. H\u1EA1 s\u1ED1t b\u1EB1ng lau m\xE1t n\xE1ch b\u1EB9n.",
          "Theo d\xF5i INR v\xE0 \u0111\u01B0\u1EDDng huy\u1EBFt mao m\u1EA1ch m\u1ED7i 6-12 gi\u1EDD."
        ]
      };
    }
    if (val >= 120) {
      return {
        indicated: false,
        severityLevel: "mild_moderate",
        astAltVal: val,
        summary: `T\u1ED5n th\u01B0\u01A1ng gan m\u1EE9c \u0111\u1ED9 nh\u1EB9 - v\u1EEBa (AST/ALT ${val} U/L). Ti\u1EBFp t\u1EE5c theo d\xF5i ch\u1EE9c n\u0103ng gan v\xE0 h\u1EA1n ch\u1EBF t\u1ED1i \u0111a thu\u1ED1c \u0111\u1ED9c gan.`,
        phases: [],
        precautions: ["H\u1EA1n ch\u1EBF li\u1EC1u Paracetamol kh\xF4ng qu\xE1 40-50 mg/kg/ng\xE0y \u1EDF tr\u1EBB em ho\u1EB7c kh\xF4ng qu\xE1 2g/ng\xE0y \u1EDF ng\u01B0\u1EDDi l\u1EDBn."]
      };
    }
    return {
      indicated: false,
      severityLevel: "normal",
      astAltVal: val,
      summary: "Ch\u1EE9c n\u0103ng men gan trong gi\u1EDBi h\u1EA1n theo d\xF5i b\xECnh th\u01B0\u1EDDng.",
      phases: [],
      precautions: []
    };
  }
  function calculateVasopressorDoses(effectiveWeightKg) {
    const dopaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
    const dopamin = {
      drugName: "Dopamin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Dopamin (mg) = 3 \xD7 C\xE2n n\u1EB7ng (kg)",
      totalMg: dopaminTotalMg,
      diluentSolution: "Glucose 5% ho\u1EB7c NaCl 0.9% v\u1EEBa \u0111\u1EE7 50ml",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "5 - 10 \xB5g/kg/ph\xFAt (duy tr\xEC t\u1ED1i \u0111a 20 \xB5g/kg/ph\xFAt)",
      recommendedPumpRateMlH: "5 - 10 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "L\u1EF1a ch\u1ECDn \u0111\u1EA7u tay \u1EDF tr\u1EBB em khi s\u1ED1c SXHD t\xE1i s\u1ED1c ho\u1EB7c s\u1ED1c tr\u01A1 d\u1ECBch k\xE8m CVP > 10 cmH2O.",
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
      clinicalIndications: "S\u1ED1c gi\xE3n m\u1EA1ch (HA t\xE2m tr\u01B0\u01A1ng t\u1EE5t s\xE2u, chi \u1EA5m, hi\u1EC7u \xE1p r\u1ED9ng) ho\u1EB7c ng\u01B0\u1EDDi l\u1EDBn s\u1ED1c tr\u01A1 d\u1ECBch truy\u1EC1n.",
      precautions: "B\u1EAFt bu\u1ED9c truy\u1EC1n qua t\u0129nh m\u1EA1ch l\u1EDBn ho\u1EB7c catheter t\u0129nh m\u1EA1ch trung t\xE2m. Nguy c\u01A1 ho\u1EA1i t\u1EED m\xF4 n\u1EB7ng n\u1EBFu ch\u1EC7ch t\u0129nh m\u1EA1ch."
    };
    const dobutaminTotalMg = Math.round(3 * effectiveWeightKg * 10) / 10;
    const dobutamin = {
      drugName: "Dobutamin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Dobutamin (mg) = 3 \xD7 C\xE2n n\u1EB7ng (kg)",
      totalMg: dobutaminTotalMg,
      diluentSolution: "Glucose 5% v\u1EEBa \u0111\u1EE7 50ml",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "3 - 10 \xB5g/kg/ph\xFAt (t\u1ED1i \u0111a 15 \xB5g/kg/ph\xFAt)",
      recommendedPumpRateMlH: "3 - 10 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "Ch\u1EC9 \u0111\u1ECBnh khi suy gi\u1EA3m s\u1EE9c co b\xF3p c\u01A1 tim, CVP cao (> 10-12 cmH2O) m\xE0 huy\u1EBFt \xE1p v\u1EABn k\u1EB9p/t\u1EE5t ho\u1EB7c cung l\u01B0\u1EE3ng tim th\u1EA5p.",
      precautions: "C\xF3 th\u1EC3 g\xE2y t\u1EE5t huy\u1EBFt \xE1p do gi\xE3n m\u1EA1ch n\u1EBFu ch\u01B0a b\xF9 \u0111\u1EE7 th\u1EC3 t\xEDch n\u1ED9i m\u1EA1ch; ph\u1ED1i h\u1EE3p Noradrenalin khi c\xF3 k\xE8m t\u1EE5t HA t\xE2m tr\u01B0\u01A1ng."
    };
    const adrenalinTotalMg = Math.round(0.3 * effectiveWeightKg * 100) / 100;
    const adrenalin = {
      drugName: "Adrenalin",
      patientWeightKg: effectiveWeightKg,
      calculationFormula: "T\u1ED5ng li\u1EC1u Adrenalin (mg) = 0.3 \xD7 C\xE2n n\u1EB7ng (kg)",
      totalMg: adrenalinTotalMg,
      diluentSolution: "Glucose 5% v\u1EEBa \u0111\u1EE7 50ml",
      syringeVolumeMl: 50,
      infusionEquivalent: "T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = Li\u1EC1u 0.1 \xB5g/kg/ph\xFAt",
      standardDoseRange: "0.05 - 0.3 \xB5g/kg/ph\xFAt",
      recommendedPumpRateMlH: "0.5 - 3 ml/gi\u1EDD tr\xEAn b\u01A1m ti\xEAm \u0111i\u1EC7n 50ml",
      clinicalIndications: "S\u1ED1c nguy k\u1ECBch, s\u1ED1c tr\u01A1 v\u1EDBi Dopamin v\xE0 Noradrenalin, ho\u1EB7c c\xF3 k\xE8m nh\u1ECBp tim ch\u1EADm n\u1EB7ng.",
      precautions: "Nguy c\u01A1 lo\u1EA1n nh\u1ECBp tim cao v\xE0 co m\u1EA1ch ngo\u1EA1i vi m\u1EA1nh g\xE2y thi\u1EBFu m\xE1u \u0111\u1EA7u chi."
    };
    return { dopamin, noradrenalin, dobutamin, adrenalin };
  }
  function generateABCSChecklist(patient, effectiveWeightKg) {
    const nahco3Dose = `${Math.round(effectiveWeightKg * 1.5)} - ${Math.round(effectiveWeightKg * 2)} ml (1-2 ml/kg)`;
    const caDose = `${Math.round(effectiveWeightKg * 0.2 * 10) / 10} ml Canxi Clorid 10% (ho\u1EB7c ${Math.round(effectiveWeightKg * 0.5)} ml Canxi Gluconate 10%)`;
    const gluDose = `${Math.round(effectiveWeightKg * 2)} ml Glucose 10%`;
    return {
      acidosis: {
        title: ABCS_CHECKLIST_RULES.acidosis.title,
        criteria: ABCS_CHECKLIST_RULES.acidosis.criteria,
        action: `${ABCS_CHECKLIST_RULES.acidosis.action}. Li\u1EC1u \u01B0\u1EDBc t\xEDnh: ${nahco3Dose} NaHCO\u2083 4.2% truy\u1EC1n t\u0129nh m\u1EA1ch ch\u1EADm trong 30-60 ph\xFAt.`
      },
      bleeding: {
        title: ABCS_CHECKLIST_RULES.bleeding.title,
        criteria: ABCS_CHECKLIST_RULES.bleeding.criteria,
        action: ABCS_CHECKLIST_RULES.bleeding.action
      },
      calcium: {
        title: ABCS_CHECKLIST_RULES.calcium.title,
        criteria: ABCS_CHECKLIST_RULES.calcium.criteria,
        action: `${ABCS_CHECKLIST_RULES.calcium.action}. Li\u1EC1u \u01B0\u1EDBc t\xEDnh: ${caDose} pha lo\xE3ng v\u1EDBi Glucose 5% ti\xEAm TMC 10-15 ph\xFAt.`
      },
      sugar: {
        title: ABCS_CHECKLIST_RULES.sugar.title,
        criteria: ABCS_CHECKLIST_RULES.sugar.criteria,
        action: `${ABCS_CHECKLIST_RULES.sugar.action}. Li\u1EC1u \u01B0\u1EDBc t\xEDnh: ${gluDose} ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm trong 3-5 ph\xFAt.`
      }
    };
  }
  function assessSpecialPatient(patient) {
    const notes = [];
    if (patient.isPregnant) {
      notes.push("S\u1EA3n ph\u1EE5 mang thai: Hct n\u1EC1n pha lo\xE3ng sinh l\xFD (28-40%), Hct > 36-38% \u0111\xE3 l\xE0 c\xF4 \u0111\u1EB7c m\xE1u b\u1EC7nh l\xFD.");
      notes.push("T\u01B0 th\u1EBF: N\u1EB1m nghi\xEAng tr\xE1i 15-30 \u0111\u1ED9 \u0111\u1EC3 gi\u1EA3i \xE1p t\u0129nh m\u1EA1ch ch\u1EE7 d\u01B0\u1EDBi, c\u1EA3i thi\u1EC7n t\u01B0\u1EDBi m\xE1u rau thai.");
      notes.push("CH\u1ED0NG CH\u1EC8 \u0110\u1ECANH can thi\u1EC7p m\u1ED5 l\u1EA5y thai ho\u1EB7c kh\u1EDFi ph\xE1t chuy\u1EC3n d\u1EA1 ch\u1EE7 \u0111\u1ED9ng trong ng\xE0y 3-6 c\u1EE7a b\u1EC7nh (nguy c\u01A1 s\u1ED1c v\xE0 ch\u1EA3y m\xE1u t\u1EED vong).");
    }
    if (patient.hasThalassemia) {
      notes.push("B\u1EC7nh nh\xE2n Thalassemia: Hct n\u1EC1n th\u1EA5p m\u1EA1n t\xEDnh (20-28%). \u0110\u1ECBnh ngh\u0129a c\xF4 \u0111\u1EB7c m\xE1u khi Hct t\u0103ng > 20% so v\u1EDBi Hct n\u1EC1n (kh\xF4ng ch\u1EDD Hct \u0111\u1EA1t 40%).");
      notes.push("Th\u1EADn tr\u1ECDng ph\xF9 ph\u1ED5i c\u1EA5p do c\u01A1 tim \u0111\xE3 gi\xE3n ph\xEC \u0111\u1EA1i; \u01B0u ti\xEAn NaCl 0.9%, h\u1EA1n ch\u1EBF Ringer Lactate n\u1EBFu c\xF3 \u1EE9 s\u1EAFt gan.");
    }
    if (patient.ageYears < 1 || patient.ageMonths !== void 0 && patient.ageMonths < 12) {
      notes.push("Tr\u1EBB nh\u0169 nhi (< 12 th\xE1ng): D\u1EC5 co gi\u1EADt s\u1ED1t cao, d\u1EC5 h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt & h\u1EA1 natri m\xE1u. Gi\xE1m s\xE1t \u0111\u01B0\u1EDDng huy\u1EBFt mao m\u1EA1ch m\u1ED7i 4-6h.");
    }
    return notes;
  }
  function generateDengueCDSSPlan(patient, customDurations) {
    const ageGroup = classifyAgeGroup(patient.ageYears);
    const weightResult = calculateWeightAdjustment(
      patient.ageYears,
      patient.gender,
      patient.actualWeightKg,
      patient.isPregnant,
      patient.pregnancyTrimester
    );
    const effectiveWeight = weightResult.adjustedWeightKg;
    const { rows, totalVolumeMl, totalDurationHours } = calculateFluidSchedule(
      patient,
      effectiveWeight,
      customDurations
    );
    const { dopamin, noradrenalin, dobutamin, adrenalin } = calculateVasopressorDoses(effectiveWeight);
    const bloodProducts = calculateBloodProducts(effectiveWeight, patient);
    const nacProtocol = calculateNACProtocol(effectiveWeight, patient.liverEnzymesAST_ALT);
    const branchDecision = evaluateHctBranch(patient, effectiveWeight);
    const abcsChecklist = generateABCSChecklist(patient, effectiveWeight);
    const specialPatientNotes = assessSpecialPatient(patient);
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
    if (weightResult.isPregnantAdjusted) {
      alerts.push({
        id: "alert_pregnancy_weight",
        level: "warning",
        title: "HI\u1EC6U CH\u1EC8NH C\xC2N N\u1EB6NG \u1EDE PH\u1EE4 N\u1EEE MANG THAI",
        message: weightResult.formulaNote,
        ruleCode: "PREGNANCY_WEIGHT_ADJUST"
      });
    }
    if (patient.isPregnant) {
      alerts.push({
        id: "alert_pregnancy_obstetric",
        level: "danger",
        title: "C\u1EA2NH B\xC1O S\u1EA2N KHOA: C\u1EA4M M\u1ED4 L\u1EA4Y THAI CH\u1EE6 \u0110\u1ED8NG NG\xC0Y 3-6",
        message: "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng can thi\u1EC7p m\u1ED5 l\u1EA5y thai ho\u1EB7c k\xEDch th\xEDch chuy\u1EC3n d\u1EA1 trong giai \u0111o\u1EA1n tho\xE1t huy\u1EBFt t\u01B0\u01A1ng c\u1EA5p (ng\xE0y 3-6) tr\u1EEB tr\u01B0\u1EDDng h\u1EE3p sinh t\u1EED m\u1EB9, v\xEC nguy c\u01A1 xu\u1EA5t huy\u1EBFt v\xE0 s\u1ED1c t\u1EED vong c\u1EF1c cao.",
        ruleCode: "PREGNANCY_OBSTETRIC_CONTRAINDICATION"
      });
    }
    if (patient.hasThalassemia) {
      alerts.push({
        id: "alert_thalassemia",
        level: "warning",
        title: "L\u01AFU \xDD B\u1EC6NH NH\xC2N THALASSEMIA / THI\u1EBEU M\xC1U M\xC3N",
        message: "Ng\u01B0\u1EE1ng c\xF4 \u0111\u1EB7c m\xE1u t\xEDnh khi Hct t\u0103ng > 20% so v\u1EDBi Hct n\u1EC1n c\u1EE7a ch\xEDnh b\u1EC7nh nh\xE2n. C\u1EA9n tr\u1ECDng ph\xF9 ph\u1ED5i c\u1EA5p do gi\u1EA3m ph\xE2n su\u1EA5t t\u1ED1ng m\xE1u.",
        ruleCode: "THALASSEMIA_ALERT"
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
    if (nacProtocol.indicated) {
      alerts.push({
        id: "alert_liver_failure",
        level: "danger",
        title: "T\u1ED4N TH\u01AF\u01A0NG GAN N\u1EB6NG / SUY GAN C\u1EA4P (AST/ALT \u2265 1000 U/L)",
        message: "Kh\u1EDFi \u0111\u1ED9ng ngay ph\xE1c \u0111\u1ED3 N-Acetylcysteine (NAC) \u0111\u01B0\u1EDDng t\u0129nh m\u1EA1ch. C\u1EA4M d\xF9ng Ringer Lactate & Paracetamol. \u0110\u1ED5i sang NaCl 0.9%.",
        ruleCode: "ACUTE_LIVER_FAILURE_NAC"
      });
    } else if (nacProtocol.severityLevel === "severe_hepatitis") {
      alerts.push({
        id: "alert_severe_hepatitis",
        level: "warning",
        title: "C\u1EA2NH B\xC1O VI\xCAM GAN C\u1EA4P N\u1EB6NG (AST/ALT \u2265 400 U/L)",
        message: "Ng\u1EEBng d\xF9ng Ringer Lactate; chuy\u1EC3n sang dung d\u1ECBch NaCl 0.9%. Ng\u1EEBng ngay Paracetamol.",
        ruleCode: "HEPATITIS_AVOID_RL"
      });
    }
    if (branchDecision.branchType === "blood") {
      alerts.push({
        id: "alert_suspect_bleeding",
        level: "danger",
        title: "NGHI NG\u1EDC XU\u1EA4T HUY\u1EBET N\u1ED8I \u1EA8N / TRUY\u1EC0N H\u1ED2NG C\u1EA6U L\u1EAENG",
        message: "B\u1EC7nh nh\xE2n s\u1ED1c kh\xF4ng \u0111\xE1p \u1EE9ng d\u1ECBch k\xE8m Hct t\u1EE5t ho\u1EB7c xu\u1EA5t huy\u1EBFt n\u1EB7ng. B\u1EAFt bu\u1ED9c truy\u1EC1n Kh\u1ED1i H\u1ED3ng C\u1EA7u 5-10 ml/kg. Kh\xF4ng t\u0103ng ti\u1EBFp t\u1ED1c \u0111\u1ED9 d\u1ECBch tinh th\u1EC3.",
        ruleCode: "BLEEDING_TRANSFUSION_BRANCH"
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
      `--- K\u1EBE HO\u1EA0CH B\xD9 D\u1ECACH SXHD DENGUE (CDSS BYT 2023 - Q\u0110 2760/Q\u0110-BYT) [${dateStr}] ---`,
      `B\u1EC7nh nh\xE2n: ${patient.ageYears} tu\u1ED5i, Gi\u1EDBi t\xEDnh: ${patient.gender === "male" ? "Nam" : "N\u1EEF"}`,
      `Ph\xE2n \u0111\u1ED9: ${patient.severity === "warning_signs" ? "SXHD c\xF3 D\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o" : patient.severity === "shock" ? "S\u1ED1c SXHD" : "S\u1ED1c SXHD n\u1EB7ng nguy k\u1ECBch"}`,
      `C\xE2n n\u1EB7ng th\u1EF1c: ${patient.actualWeightKg} kg | C\xE2n n\u1EB7ng chu\u1EA9n: ${weightResult.standardWeightKg} kg | C\xE2n n\u1EB7ng t\xEDnh d\u1ECBch: ${effectiveWeight} kg`,
      ...weightResult.isObese ? [`[L\u01AFU \xDD]: \u0110\xE3 hi\u1EC7u ch\u1EC9nh theo chu\u1EA9n CDC 2014 \u0111\u1EC3 tr\xE1nh qu\xE1 t\u1EA3i tu\u1EA7n ho\xE0n.`] : [],
      ...weightResult.isPregnantAdjusted ? [`[PNCT]: \u0110\xE3 tr\u1EEB c\xE2n n\u1EB7ng thai/\u1ED1i (${weightResult.formulaNote}).`] : [],
      `T\u1ED5ng th\u1EC3 t\xEDch d\u1EF1 ki\u1EBFn: ${totalVolumeMl} ml (${Math.round(totalVolumeMl / effectiveWeight)} ml/kg) trong ${totalDurationHours} gi\u1EDD.`,
      `
B\u1EA2NG C\u1ECCC D\u1ECACH \u0110I\u1EC0U TR\u1ECA:`,
      ...rows.map((r) => `  \u2022 C\u1EEF ${r.stepIndex}: ${r.timeWindow} | T\u1ED1c \u0111\u1ED9 ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} gi\u1ECDt/ph\xFAt) | C\u1EA7n ${r.totalMl} ml (Treo th\xEAm ${r.bottlesToHang} chai 500ml) | T\u1EA1i c\u1ECDc: ${r.totalAtPoleMl} ml`),
      `
NH\xC1NH \u0110I\u1EC0U TR\u1ECA HI\u1EC6N T\u1EA0I: ${branchDecision.title}`,
      `  \u2022 Khuy\u1EBFn c\xE1o: ${branchDecision.recommendedFluid} (${branchDecision.rateMlKgH} ml/kg/h trong ${branchDecision.durationHours}h)`,
      `  \u2022 L\xFD do: ${branchDecision.reasoning}`,
      `
LI\u1EC0U 4 THU\u1ED0C V\u1EACN M\u1EA0CH B\u01A0M TI\xCAM \u0110I\u1EC6N 50ML:`,
      `  \u2022 Dopamin: Pha ${dopamin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 5-10 ml/h).`,
      `  \u2022 Noradrenalin: Pha ${noradrenalin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 0.1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 0.5-2 ml/h).`,
      `  \u2022 Dobutamin: Pha ${dobutamin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 3-10 ml/h).`,
      `  \u2022 Adrenalin: Pha ${adrenalin.totalMg} mg trong 50ml Glucose 5%. T\u1ED1c \u0111\u1ED9 1 ml/h = 0.1 \xB5g/kg/ph\xFAt (Kh\u1EDFi \u0111\u1EA7u 0.5-3 ml/h).`,
      ...nacProtocol.indicated ? [
        `
PH\xC1C \u0110\u1ED2 NAC \u0110I\u1EC0U TR\u1ECA SUY GAN:`,
        ...nacProtocol.phases.map((p) => `  \u2022 ${p.phaseName}: ${p.doseMgKg} mg/kg (${p.totalMg} mg) trong ${p.diluent} truy\u1EC1n ${p.infusionTimeHours}h (T\u1ED1c \u0111\u1ED9: ${p.pumpRateMlH})`)
      ] : [],
      `
B\u1EA2NG KI\u1EC2M ABCS S\u1ED0C K\xC9O D\xC0I / T\xC1I S\u1ED0C:`,
      `  \u2022 A (Acidosis): ${abcsChecklist.acidosis.action}`,
      `  \u2022 B (Bleeding): ${abcsChecklist.bleeding.action}`,
      `  \u2022 C (Calcium): ${abcsChecklist.calcium.action}`,
      `  \u2022 S (Sugar): ${abcsChecklist.sugar.action}`,
      `
\u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N: \u0110o Hct tr\u01B0\u1EDBc m\u1ED7i l\u1EA7n gi\u1EA3m t\u1ED1c \u0111\u1ED9; Duy tr\xEC n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1.0 ml/kg/h; B\xE1o BS ngay n\u1EBFu n\u01B0\u1EDBc ti\u1EC3u < 0.5 ml/kg/h ho\u1EB7c c\xF3 ran \u1EA9m \u1EDF ph\u1ED5i.`
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
      specialPatientNotes,
      alerts,
      nursingInstructions: DENGUE_NURSING_CHECKLIST,
      soapExportText: soapLines.join("\n"),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }

  // src/content/knowledge-vault/cdss/dengue/dengue-ui.ts
  var DengueCDSSController = class {
    container;
    currentPlan = null;
    customDurations = {};
    constructor(containerId) {
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
              <span class="cdss-badge cdss-badge--success"><i class="fa-solid fa-shield-halved"></i> To\xE0n Di\u1EC7n 7 Nh\xE1nh</span>
            </div>
            <h1 class="cdss-title">
              <i class="fa-solid fa-droplet cdss-icon-pulse"></i> 
              CDSS T\xEDnh To\xE1n D\u1ECBch Truy\u1EC1n & Ch\u1ED1ng S\u1ED1c SXHD Dengue
            </h1>
            <p class="cdss-subtitle">
              H\u1EC7 th\u1ED1ng H\u1ED7 tr\u1EE3 Quy\u1EBFt \u0111\u1ECBnh L\xE2m s\xE0ng: T\u1EF1 \u0111\u1ED9ng chu\u1EA9n h\xF3a c\xE2n n\u1EB7ng CDC 2014 & PNCT, \u0111i\u1EC1u ph\u1ED1i c\u1ECDc d\u1ECBch 4 c\u1ED9t \u0111\u1ED9ng h\u1ECDc, \u0111\u1ECBnh h\u01B0\u1EDBng nh\xE1nh CPT/truy\u1EC1n m\xE1u, li\u1EC1u 4 thu\u1ED1c v\u1EADn m\u1EA1ch 50ml, ph\xE1c \u0111\u1ED3 suy gan NAC v\xE0 b\u1EA3ng ki\u1EC3m ABCS.
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
                    <input type="number" id="input-age" min="0.1" max="100" value="8" step="0.5" required class="cdss-input" />
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
                    <input type="number" id="input-weight" min="2" max="150" value="38" step="0.5" required class="cdss-input" />
                    <span class="cdss-input-addon">kg</span>
                  </div>
                  <span class="cdss-input-hint" id="weight-hint-text">VD: B\xE9 8 tu\u1ED5i, n\u1EB7ng 38kg (Th\u1EEBa c\xE2n > 120% chu\u1EA9n)</span>
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

                <!-- KH\u1ED0I \u0110\u1ED0I T\u01AF\u1EE2NG \u0110\u1EB6C BI\u1EC6T -->
                <div class="cdss-section-divider">
                  <span><i class="fa-solid fa-person-breastfeeding"></i> \u0110\u1ED1i T\u01B0\u1EE3ng \u0110\u1EB7c Bi\u1EC7t</span>
                </div>

                <div class="cdss-special-box">
                  <!-- Thai k\u1EF3 (Ch\u1EC9 hi\u1EC7n khi l\xE0 N\u1EEF) -->
                  <div id="wrap-pregnant" class="cdss-checkbox-row" style="display:none;">
                    <label class="cdss-check-label">
                      <input type="checkbox" id="check-pregnant" />
                      <span><strong>Ph\u1EE5 n\u1EEF mang thai (PNCT)</strong></span>
                    </label>
                    <div id="wrap-trimester" class="cdss-inline-select" style="display:none; margin-top:0.4rem;">
                      <label for="select-trimester" style="font-size:0.8rem; color:var(--cdss-muted);">Tam c\xE1 nguy\u1EC7t:</label>
                      <select id="select-trimester" class="cdss-select cdss-select--sm">
                        <option value="1">3 th\xE1ng \u0111\u1EA7u (T1)</option>
                        <option value="2">3 th\xE1ng gi\u1EEFa (T2: -3kg)</option>
                        <option value="3" selected>3 th\xE1ng cu\u1ED1i (T3: -6kg thai/\u1ED1i)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Thalassemia -->
                  <div class="cdss-checkbox-row">
                    <label class="cdss-check-label">
                      <input type="checkbox" id="check-thalassemia" />
                      <span><strong>B\u1EC7nh Thalassemia / Huy\u1EBFt t\xE1n</strong></span>
                    </label>
                  </div>

                  <!-- Hct N\u1EC1n -->
                  <div class="cdss-form-group cdss-mt-2">
                    <label for="input-baseline-hct">Hct N\u1EC1n Sinh L\xFD (%)</label>
                    <input type="number" id="input-baseline-hct" min="15" max="60" value="40" step="1" class="cdss-input" />
                    <span class="cdss-input-hint">N\u1EEF: 38% | Nam: 42% | Thalassemia: 20-28% | PNCT: 32-35%</span>
                  </div>
                </div>

                <!-- KH\u1ED0I C\u1EACN L\xC2M S\xC0NG & R\u1EBC NH\xC1NH -->
                <div class="cdss-section-divider">
                  <span><i class="fa-solid fa-vial-circle-check"></i> C\u1EADn L\xE2m S\xE0ng & R\u1EBD Nh\xE1nh</span>
                </div>

                <div class="cdss-cln-box">
                  <div class="cdss-form-row">
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-current-hct">Hct Hi\u1EC7n T\u1EA1i (%)</label>
                      <input type="number" id="input-current-hct" min="15" max="75" value="42" step="1" class="cdss-input font-bold" />
                    </div>
                    <div class="cdss-form-group cdss-col-6">
                      <label for="select-response">\u0110\xE1p \u1EE8ng L\xE2m S\xE0ng</label>
                      <select id="select-response" class="cdss-select">
                        <option value="improved" selected>\u0110ang \u1ED4n \u0110\u1ECBnh / Ra S\u1ED1c</option>
                        <option value="worsened">X\u1EA5u \u0110i / Chi L\u1EA1nh \u1EA8m</option>
                        <option value="refractory">S\u1ED1c Tr\u01A1 / Kh\xF4ng \u0110\xE1p \u1EE8ng</option>
                      </select>
                    </div>
                  </div>

                  <div class="cdss-form-row">
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-liver-ast">AST / ALT (U/L)</label>
                      <input type="number" id="input-liver-ast" min="10" max="15000" value="35" step="5" class="cdss-input" />
                      <span class="cdss-input-hint">\u2265 400: C\u1EA5m RL | \u2265 1000: NAC</span>
                    </div>
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-platelets">Ti\u1EC3u C\u1EA7u (/mm\xB3)</label>
                      <input type="number" id="input-platelets" min="1000" max="500000" value="85000" step="1000" class="cdss-input" />
                      <span class="cdss-input-hint">&lt; 5.000: B\u1EAFt bu\u1ED9c truy\u1EC1n TC</span>
                    </div>
                  </div>

                  <div class="cdss-form-row">
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-inr">\u0110\xF4ng M\xE1u INR</label>
                      <input type="number" id="input-inr" min="0.8" max="10" value="1.05" step="0.05" class="cdss-input" />
                    </div>
                    <div class="cdss-form-group cdss-col-6">
                      <label for="input-fibrinogen">Fibrinogen (g/L)</label>
                      <input type="number" id="input-fibrinogen" min="0.2" max="6" value="2.6" step="0.1" class="cdss-input" />
                    </div>
                  </div>

                  <div class="cdss-checkbox-row cdss-mt-1">
                    <label class="cdss-check-label cdss-check-label--danger">
                      <input type="checkbox" id="check-bleeding" />
                      <span><strong><i class="fa-solid fa-droplet text-danger"></i> Xu\u1EA5t huy\u1EBFt \u1ED3 \u1EA1t / \u0110e d\u1ECDa t\xEDnh m\u1EA1ng</strong></span>
                    </label>
                  </div>
                </div>

                <!-- Case M\u1EABu Nhanh -->
                <div class="cdss-section-divider">
                  <span><i class="fa-solid fa-wand-magic-sparkles"></i> Ca L\xE2m S\xE0ng M\u1EABu</span>
                </div>

                <div class="cdss-form-actions">
                  <button type="button" id="btn-quick-child" class="cdss-chip-btn">
                    <i class="fa-solid fa-child"></i> 1. Tr\u1EBB 8T B\xE9o Ph\xEC (38kg)
                  </button>
                  <button type="button" id="btn-quick-adult" class="cdss-chip-btn">
                    <i class="fa-solid fa-user"></i> 2. Ng\u01B0\u1EDDi L\u1EDBn S\u1ED1c (55kg)
                  </button>
                  <button type="button" id="btn-quick-severe" class="cdss-chip-btn cdss-chip-btn--danger">
                    <i class="fa-solid fa-bolt"></i> 3. S\u1ED1c Nguy K\u1ECBch (M\u1EA1ch 0 HA 0)
                  </button>
                  <button type="button" id="btn-quick-pregnant" class="cdss-chip-btn cdss-chip-btn--warning">
                    <i class="fa-solid fa-person-pregnant"></i> 4. S\u1EA3n Ph\u1EE5 S\u1ED1c (Thai T3 62kg)
                  </button>
                  <button type="button" id="btn-quick-refractory-cpt" class="cdss-chip-btn cdss-chip-btn--info">
                    <i class="fa-solid fa-network-wired"></i> 5. S\u1ED1c Tr\u01A1 + CPT (Hct 48%)
                  </button>
                  <button type="button" id="btn-quick-liver-failure" class="cdss-chip-btn cdss-chip-btn--danger">
                    <i class="fa-solid fa-triangle-exclamation"></i> 6. Suy Gan C\u1EA5p (AST 1250 U/L)
                  </button>
                </div>
              </form>
            </div>

            <!-- Box Th\xF4ng Tin C\xE2n N\u1EB7ng CDC -->
            <div id="weight-analysis-box" class="cdss-panel cdss-weight-panel">
              <!-- Rendered via updateWeightAnalysis -->
            </div>
          </aside>

          <!-- Right Column: CDSS Results, 4-Column Table, Vasopressors, Blood Products, ABCS -->
          <main class="cdss-content-col">
            <!-- Alert Banner Container -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-wrap"></div>

            <!-- Summary Stat Cards -->
            <div id="cdss-stats-wrap" class="cdss-stats-grid"></div>

            <!-- KH\u1ED0I NH\xC1NH QUY\u1EBET \u0110\u1ECANH L\xC2M S\xC0NG BYT 2023 -->
            <section id="cdss-branch-panel" class="cdss-panel cdss-branch-panel">
              <!-- Rendered via renderBranchDecision -->
            </section>

            <!-- B\u1EA2NG C\u1ECCC D\u1ECACH 4 C\u1ED8T -->
            <section class="cdss-panel cdss-schedule-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-table-list"></i> B\u1EA3ng \u0110i\u1EC1u Ph\u1ED1i C\u1ECDc D\u1ECBch 4 C\u1ED9t Chu\u1EA9n H\xF3a
                  </h2>
                  <p class="cdss-panel-desc">
                    T\u1EF1 \u0111\u1ED9ng t\xEDnh to\xE1n l\u01B0\u1EE3ng d\u1ECBch g\u1ED9p, s\u1ED1 gi\u1ECDt/ph\xFAt, d\u1ECBch d\u01B0 chuy\u1EC3n c\u1EEF v\xE0 s\u1ED1 chai 500ml treo th\xEAm t\u1EA1i c\u1ECDc theo ph\xE1c \u0111\u1ED3 Q\u0110 2760/Q\u0110-BYT.
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

            <!-- KH\u1ED0I CH\u1EC8 \u0110\u1ECANH 4 CH\u1EBE PH\u1EA8M M\xC1U -->
            <section id="cdss-blood-panel" class="cdss-panel cdss-blood-panel">
              <!-- Rendered via renderBloodProducts -->
            </section>

            <!-- KH\u1ED0I V\u1EACN M\u1EA0CH B\u01A0M TI\xCAM \u0110I\u1EC6N 50ML (4 THU\u1ED0C) -->
            <section class="cdss-panel cdss-vasopressor-panel">
              <div class="cdss-panel-header-row">
                <div>
                  <h2 class="cdss-panel-title">
                    <i class="fa-solid fa-syringe"></i> Ph\xE1c \u0110\u1ED3 4 Thu\u1ED1c V\u1EADn M\u1EA1ch B\u01A1m Ti\xEAm \u0110i\u1EC7n 50ml
                  </h2>
                  <p class="cdss-panel-desc">
                    \xC1p d\u1EE5ng khi t\xE1i s\u1ED1c ho\u1EB7c s\u1ED1c tr\u01A1 d\u1ECBch truy\u1EC1n (\u0111\xE3 b\xF9 \u0111\u1EE7 th\u1EC3 t\xEDch n\u1ED9i m\u1EA1ch ho\u1EB7c CVP > 10 cmH\u2082O). Chu\u1EA9n h\xF3a c\xF4ng th\u1EE9c pha 50ml n\u1ED3ng \u0111\u1ED9 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng t\u1ED1c \u0111\u1ED9 b\u01A1m ti\xEAm \u0111i\u1EC7n.
                  </p>
                </div>
              </div>

              <div class="cdss-vasopressor-grid" id="cdss-vaso-grid">
                <!-- 4 Vasopressor Cards -->
              </div>
            </section>

            <!-- KH\u1ED0I X\u1EEC TR\xCD BI\u1EBEN CH\u1EE8NG & B\u1EA2NG KI\u1EC2M ABCS -->
            <section id="cdss-complication-panel" class="cdss-panel cdss-complication-panel">
              <!-- Rendered via renderComplicationsAndABCS -->
            </section>

            <!-- H\u01AF\u1EDANG D\u1EAAN \u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N (HKKK) -->
            <section class="cdss-panel cdss-nursing-panel">
              <h2 class="cdss-panel-title">
                <i class="fa-solid fa-user-nurse"></i> Quy Tr\xECnh \u0110i\u1EC1u D\u01B0\u1EE1ng An To\xE0n & Theo D\xF5i Gi\u1EDD (HKKK)
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
      const genderRadios = document.querySelectorAll('input[name="gender"]');
      genderRadios.forEach((r) => {
        r.addEventListener("change", () => {
          this.updateGenderUI();
          this.recalculate();
        });
      });
      const checkPreg = document.getElementById("check-pregnant");
      if (checkPreg) {
        checkPreg.addEventListener("change", (e) => {
          const isChecked = e.target.checked;
          const wrapTrim = document.getElementById("wrap-trimester");
          if (wrapTrim) wrapTrim.style.display = isChecked ? "block" : "none";
          this.recalculate();
        });
      }
      const checkThal = document.getElementById("check-thalassemia");
      if (checkThal) {
        checkThal.addEventListener("change", (e) => {
          const isChecked = e.target.checked;
          const baseHctInput = document.getElementById("input-baseline-hct");
          if (baseHctInput && isChecked) {
            baseHctInput.value = "24";
          } else if (baseHctInput && !isChecked) {
            baseHctInput.value = "40";
          }
          this.recalculate();
        });
      }
      const btnChild = document.getElementById("btn-quick-child");
      if (btnChild) {
        btnChild.addEventListener("click", () => {
          this.setInputValue("input-age", "8");
          this.setGender("male");
          this.setInputValue("input-weight", "38");
          this.setInputValue("input-severity", "warning_signs");
          this.setInputValue("input-current-hct", "42");
          this.setInputValue("select-response", "improved");
          this.setInputValue("input-liver-ast", "35");
          this.setCheckbox("check-pregnant", false);
          this.setCheckbox("check-thalassemia", false);
          this.setCheckbox("check-bleeding", false);
          this.customDurations = {};
          this.updateGenderUI();
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
          this.setInputValue("input-current-hct", "46");
          this.setInputValue("select-response", "improved");
          this.setInputValue("input-liver-ast", "65");
          this.setCheckbox("check-pregnant", false);
          this.setCheckbox("check-thalassemia", false);
          this.setCheckbox("check-bleeding", false);
          this.customDurations = {};
          this.updateGenderUI();
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
          this.setInputValue("input-current-hct", "49");
          this.setInputValue("select-response", "worsened");
          this.setInputValue("input-liver-ast", "120");
          this.setCheckbox("check-pregnant", false);
          this.setCheckbox("check-thalassemia", false);
          this.setCheckbox("check-bleeding", false);
          this.customDurations = {};
          this.updateGenderUI();
          this.recalculate();
        });
      }
      const btnPreg = document.getElementById("btn-quick-pregnant");
      if (btnPreg) {
        btnPreg.addEventListener("click", () => {
          this.setInputValue("input-age", "26");
          this.setGender("female");
          this.setInputValue("input-weight", "62");
          this.setInputValue("input-severity", "shock");
          this.setInputValue("input-current-hct", "39");
          this.setInputValue("input-baseline-hct", "32");
          this.setInputValue("select-response", "improved");
          this.setCheckbox("check-pregnant", true);
          this.setInputValue("select-trimester", "3");
          this.setCheckbox("check-thalassemia", false);
          this.setCheckbox("check-bleeding", false);
          this.customDurations = {};
          this.updateGenderUI();
          const wrapTrim = document.getElementById("wrap-trimester");
          if (wrapTrim) wrapTrim.style.display = "block";
          this.recalculate();
        });
      }
      const btnRefractory = document.getElementById("btn-quick-refractory-cpt");
      if (btnRefractory) {
        btnRefractory.addEventListener("click", () => {
          this.setInputValue("input-age", "14");
          this.setGender("male");
          this.setInputValue("input-weight", "48");
          this.setInputValue("input-severity", "shock");
          this.setInputValue("input-current-hct", "48");
          this.setInputValue("select-response", "refractory");
          this.setCheckbox("check-bleeding", false);
          this.customDurations = {};
          this.updateGenderUI();
          this.recalculate();
        });
      }
      const btnLiver = document.getElementById("btn-quick-liver-failure");
      if (btnLiver) {
        btnLiver.addEventListener("click", () => {
          this.setInputValue("input-age", "22");
          this.setGender("male");
          this.setInputValue("input-weight", "58");
          this.setInputValue("input-severity", "shock");
          this.setInputValue("input-current-hct", "42");
          this.setInputValue("input-liver-ast", "1250");
          this.setInputValue("input-inr", "1.85");
          this.setInputValue("select-response", "worsened");
          this.customDurations = {};
          this.updateGenderUI();
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
    updateGenderUI() {
      const isFemale = document.querySelector('input[name="gender"]:checked')?.value === "female";
      const wrapPreg = document.getElementById("wrap-pregnant");
      if (wrapPreg) {
        wrapPreg.style.display = isFemale ? "block" : "none";
        if (!isFemale) {
          this.setCheckbox("check-pregnant", false);
          const wrapTrim = document.getElementById("wrap-trimester");
          if (wrapTrim) wrapTrim.style.display = "none";
        }
      }
    }
    setInputValue(id, val) {
      const el = document.getElementById(id);
      if (el) el.value = val;
    }
    setCheckbox(id, checked) {
      const el = document.getElementById(id);
      if (el) el.checked = checked;
    }
    setGender(val) {
      const radio = document.querySelector(`input[name="gender"][value="${val}"]`);
      if (radio) radio.checked = true;
    }
    getFormData() {
      const age = parseFloat(document.getElementById("input-age")?.value) || 8;
      const gender = document.querySelector('input[name="gender"]:checked')?.value || "male";
      const weight = parseFloat(document.getElementById("input-weight")?.value) || 30;
      const severity = document.getElementById("input-severity")?.value || "warning_signs";
      const startTime = document.getElementById("input-starttime")?.value || "08:00";
      const isPregnant = gender === "female" && !!document.getElementById("check-pregnant")?.checked;
      const pregnancyTrimester = parseInt(document.getElementById("select-trimester")?.value || "3", 10);
      const hasThalassemia = !!document.getElementById("check-thalassemia")?.checked;
      const baselineHct = parseFloat(document.getElementById("input-baseline-hct")?.value) || (hasThalassemia ? 24 : gender === "female" ? 38 : 42);
      const currentHct = parseFloat(document.getElementById("input-current-hct")?.value) || 40;
      const clinicalResponse = document.getElementById("select-response")?.value || "improved";
      const liverAST = parseFloat(document.getElementById("input-liver-ast")?.value) || 35;
      const plt = parseFloat(document.getElementById("input-platelets")?.value) || 15e4;
      const inr = parseFloat(document.getElementById("input-inr")?.value) || 1;
      const fbg = parseFloat(document.getElementById("input-fibrinogen")?.value) || 2.5;
      const massiveBleeding = !!document.getElementById("check-bleeding")?.checked;
      return {
        ageYears: age,
        gender,
        actualWeightKg: weight,
        severity,
        startTime,
        isPregnant,
        pregnancyTrimester,
        hasThalassemia,
        baselineHctPercent: baselineHct,
        currentHctPercent: currentHct,
        clinicalResponse,
        liverEnzymesAST_ALT: liverAST,
        plateletsCount: plt,
        inrValue: inr,
        fibrinogenGL: fbg,
        massiveBleeding
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
      this.renderBranchDecision(plan);
      this.renderFluidTable(plan);
      this.renderBloodProducts(plan);
      this.renderVasopressors(plan);
      this.renderComplicationsAndABCS(plan);
      this.renderNursingList(plan);
    }
    renderWeightAnalysis(plan) {
      const box = document.getElementById("weight-analysis-box");
      if (!box) return;
      const { weightResult, ageGroup, patient } = plan;
      const isObese = weightResult.isObese;
      const isPregAdj = weightResult.isPregnantAdjusted;
      box.innerHTML = `
      <div class="cdss-weight-header">
        <span class="cdss-weight-badge ${isObese ? "cdss-badge--danger" : isPregAdj ? "cdss-badge--warning" : "cdss-badge--success"}">
          ${isObese ? '<i class="fa-solid fa-triangle-exclamation"></i> Th\u1EEBa C\xE2n / B\xE9o Ph\xEC' : isPregAdj ? '<i class="fa-solid fa-person-pregnant"></i> Hi\u1EC7u Ch\u1EC9nh Thai K\u1EF3' : '<i class="fa-solid fa-circle-check"></i> C\xE2n N\u1EB7ng Chu\u1EA9n / H\u1EE3p L\xFD'}
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
          <span class="cdss-stat-label">${isPregAdj ? "Tr\u1EEB Thai/\u1ED0i" : "Chu\u1EA9n CDC 2014"}</span>
          <span class="cdss-stat-val text-muted">${isPregAdj ? "- 6 kg" : `${weightResult.standardWeightKg} kg`}</span>
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
      const fluidType = plan.branchDecision.recommendedFluid;
      wrap.innerHTML = `
      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--blue">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">T\u1ED5ng Th\u1EC3 T\xEDch D\u1ECBch G\u1ED9p</span>
          <span class="cdss-card-val">${plan.totalVolumeMl.toLocaleString("vi-VN")} <small>ml</small></span>
          <span class="cdss-card-sub">~ ${mlPerKg} ml/kg (${plan.weightResult.adjustedWeightKg}kg)</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--purple">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">T\u1ED5ng Th\u1EDDi L\u01B0\u1EE3ng D\u1EF1 Ki\u1EBFn</span>
          <span class="cdss-card-val">${plan.totalDurationHours} <small>gi\u1EDD</small></span>
          <span class="cdss-card-sub">${plan.fluidRows.length} b\u1EADc t\u1ED1c \u0111\u1ED9 chu\u1EA9n BYT</span>
        </div>
      </div>

      <div class="cdss-stat-card">
        <div class="cdss-stat-card-icon cdss-stat-card-icon--teal">
          <i class="fa-solid fa-bottle-water"></i>
        </div>
        <div class="cdss-stat-card-data">
          <span class="cdss-card-label">\u01AF\u1EDBc T\xEDnh S\u1ED1 Chai 500ml</span>
          <span class="cdss-card-val">${Math.ceil(plan.totalVolumeMl / 500)} <small>chai</small></span>
          <span class="cdss-card-sub">${fluidType.includes("NaCl") ? "NaCl 0.9%" : "Ringer Lactate"}</span>
        </div>
      </div>
    `;
    }
    renderBranchDecision(plan) {
      const panel = document.getElementById("cdss-branch-panel");
      if (!panel) return;
      const b = plan.branchDecision;
      const isDanger = b.branchType === "blood" || b.branchType === "refractory_shock";
      const isWarning = b.branchType === "cpt";
      panel.innerHTML = `
      <div class="cdss-panel-header-row">
        <div>
          <h2 class="cdss-panel-title">
            <i class="fa-solid fa-code-branch"></i> Nh\xE1nh Quy\u1EBFt \u0110\u1ECBnh L\xE2m S\xE0ng (Ph\u1EE5 L\u1EE5c 10 BYT 2023)
          </h2>
          <p class="cdss-panel-desc">
            Ph\xE2n t\xEDch t\u1EF1 \u0111\u1ED9ng d\u1EF1a tr\xEAn Hct hi\u1EC7n t\u1EA1i (${plan.patient.currentHctPercent ?? 40}%), Hct n\u1EC1n (${plan.patient.baselineHctPercent ?? 40}%), ph\xE2n \u0111\u1ED9 v\xE0 \u0111\xE1p \u1EE9ng b\xF9 d\u1ECBch.
          </p>
        </div>
        <span class="cdss-badge ${isDanger ? "cdss-badge--danger" : isWarning ? "cdss-badge--warning" : "cdss-badge--success"}">
          ${b.branchType.toUpperCase()}
        </span>
      </div>

      <div class="cdss-branch-box ${isDanger ? "cdss-branch-box--danger" : isWarning ? "cdss-branch-box--warning" : "cdss-branch-box--standard"}">
        <div class="cdss-branch-head">
          <div class="cdss-branch-title">
            <i class="fa-solid ${isDanger ? "fa-triangle-exclamation text-danger" : isWarning ? "fa-shuffle text-warning" : "fa-circle-check text-success"}"></i>
            <strong>${b.title}</strong>
          </div>
          <div class="cdss-branch-fluid">
            D\u1ECBch khuy\u1EBFn ngh\u1ECB: <strong class="text-primary">${b.recommendedFluid}</strong>
          </div>
        </div>
        <p class="cdss-branch-reasoning">${b.reasoning}</p>

        ${b.warnings.length > 0 ? `
          <ul class="cdss-branch-warnings">
            ${b.warnings.map((w) => `<li><i class="fa-solid fa-arrow-right"></i> ${w}</li>`).join("")}
          </ul>
        ` : ""}

        <!-- H\u1ED9p h\u01B0\u1EDBng d\u1EABn chuy\u1EC3n \u0111\u1ED5i Cao ph\xE2n t\u1EED v\u1EC1 Tinh th\u1EC3 (Ph\u1EE5 l\u1EE5c 10) -->
        <div class="cdss-cpt-conversion-box">
          <div class="cdss-cpt-conversion-title">
            <i class="fa-solid fa-repeat"></i> Quy T\u1EAFc Chuy\u1EC3n \u0110\u1ED5i Cao Ph\xE2n T\u1EED \u2192 Tinh Th\u1EC3 (Ph\u1EE5 l\u1EE5c 10):
          </div>
          <div class="cdss-cpt-conversion-content">
            \u2022 <strong>\u0110i\u1EC1u ki\u1EC7n:</strong> M\u1EA1ch r\xF5, HA b\xECnh th\u01B0\u1EDDng (hi\u1EC7u \xE1p > 30 mmHg), chi \u1EA5m, CRT &lt; 2s, n\u01B0\u1EDBc ti\u1EC3u \u2265 0.5 - 1.0 ml/kg/h, Hct gi\u1EA3m v\xE0 \u1ED5n \u0111\u1ECBnh.<br>
            \u2022 <strong>B\u1EADc h\u1EA1:</strong> Gi\u1EA3m CPT 10 ml/kg/h (1-2h) \u2192 7.5 ml/kg/h (1-2h) \u2192 5 ml/kg/h (2-3h) \u2192 Chuy\u1EC3n sang D\u1ECBch tinh th\u1EC3 5 ho\u1EB7c 3 ml/kg/h.<br>
            \u2022 <strong>Tr\u1EA7n an to\xE0n:</strong> Dextran 40 \u2264 30 ml/kg/24h | HES 200 \u2264 30-50 ml/kg/24h.
          </div>
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
              <small style="color:var(--cdss-muted);">(D\xE2y 20 gi\u1ECDt/ml)</small>
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
    renderBloodProducts(plan) {
      const panel = document.getElementById("cdss-blood-panel");
      if (!panel) return;
      panel.innerHTML = `
      <div class="cdss-panel-header-row">
        <div>
          <h2 class="cdss-panel-title">
            <i class="fa-solid fa-hand-holding-droplet"></i> Ch\u1EC9 \u0110\u1ECBnh 4 Ch\u1EBF Ph\u1EA9m M\xE1u Chu\u1EA9n B\u1ED9 Y T\u1EBF 2023
          </h2>
          <p class="cdss-panel-desc">
            \xC1p d\u1EE5ng khi c\xF3 bi\u1EBFn ch\u1EE9ng xu\u1EA5t huy\u1EBFt n\u1EB7ng ho\u1EB7c r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u k\xE8m th\u1EA5t b\u1EA1i b\xF9 d\u1ECBch. T\xEDnh li\u1EC1u ch\xEDnh x\xE1c theo c\xE2n n\u1EB7ng hi\u1EC7u ch\u1EC9nh ${plan.weightResult.adjustedWeightKg} kg.
          </p>
        </div>
      </div>

      <div class="cdss-blood-grid">
        ${plan.bloodProducts.map((p) => `
          <div class="cdss-blood-card ${p.thresholdMet ? "cdss-blood-card--active" : ""}">
            <div class="cdss-blood-card-header">
              <div class="cdss-blood-card-title">
                <strong>${p.productName}</strong>
                ${p.thresholdMet ? '<span class="cdss-badge cdss-badge--danger"><i class="fa-solid fa-bell"></i> \u0110\u1EA0T NG\u01AF\u1EE0NG CH\u1EC8 \u0110\u1ECANH</span>' : '<span class="cdss-badge cdss-badge--info">Theo D\xF5i</span>'}
              </div>
            </div>
            <div class="cdss-blood-card-body">
              <div class="cdss-blood-dose">
                Li\u1EC1u t\xEDnh theo th\u1EC3 tr\u1ECDng: <strong class="text-primary font-bold">${p.calculatedDose}</strong>
                <small class="text-muted">(${p.doseFormula})</small>
              </div>
              <div class="cdss-blood-ind">
                <strong>Ch\u1EC9 \u0111\u1ECBnh BYT:</strong> ${p.indication}
              </div>
              <div class="cdss-blood-target">
                <strong>M\u1EE5c ti\xEAu:</strong> ${p.targetClinical}
              </div>
              <div class="cdss-blood-prec">
                <i class="fa-solid fa-circle-exclamation"></i> ${p.precautions}
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    }
    renderVasopressors(plan) {
      const grid = document.getElementById("cdss-vaso-grid");
      if (!grid) return;
      const {
        vasopressorDopamin: d,
        vasopressorNoradrenalin: n,
        vasopressorDobutamin: dob,
        vasopressorAdrenalin: adr
      } = plan;
      const list = [d, n, dob, adr];
      grid.innerHTML = list.map((item, idx) => {
        const isDopamin = item.drugName === "Dopamin";
        const isNor = item.drugName === "Noradrenalin";
        const isDob = item.drugName === "Dobutamin";
        const isAdr = item.drugName === "Adrenalin";
        const tagClass = isDopamin ? "cdss-drug-tag--primary" : isNor ? "cdss-drug-tag--danger" : isDob ? "cdss-drug-tag--warning" : "cdss-drug-tag--purple";
        const badgeText = isNor || isAdr ? "High Alert" : "B\u01A1m Ti\xEAm \u0110i\u1EC7n 50ml";
        const badgeClass = isNor || isAdr ? "cdss-badge--danger" : "cdss-badge--info";
        return `
        <div class="cdss-vaso-card">
          <div class="cdss-vaso-card-header">
            <div class="cdss-vaso-title">
              <span class="cdss-drug-tag ${tagClass}">${item.drugName}</span>
              <span class="cdss-drug-indication">${item.clinicalIndications}</span>
            </div>
            <span class="cdss-badge ${badgeClass}">${badgeText}</span>
          </div>
          <div class="cdss-vaso-body">
            <div class="cdss-vaso-recipe">
              <div class="cdss-recipe-row">
                <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
                <span class="cdss-recipe-val"><strong>${item.totalMg} mg</strong> ${item.drugName} (${item.calculationFormula})</span>
              </div>
              <div class="cdss-recipe-row">
                <span class="cdss-recipe-key">Dung m\xF4i pha:</span>
                <span class="cdss-recipe-val">${item.diluentSolution}</span>
              </div>
              <div class="cdss-recipe-row cdss-recipe-highlight">
                <span class="cdss-recipe-key">T\u01B0\u01A1ng \u0111\u01B0\u01A1ng:</span>
                <span class="cdss-recipe-val"><strong>${item.infusionEquivalent}</strong></span>
              </div>
            </div>
            <div class="cdss-vaso-dosing">
              <div class="cdss-dosing-range">
                Li\u1EC1u khuy\u1EBFn c\xE1o: <strong>${item.standardDoseRange}</strong>
              </div>
              <div class="cdss-pump-rate">
                T\u1ED1c \u0111\u1ED9 b\u01A1m: <strong class="${isNor || isAdr ? "text-danger" : "text-primary"}">${item.recommendedPumpRateMlH}</strong>
              </div>
            </div>
            <p class="cdss-vaso-notes"><i class="fa-solid fa-circle-exclamation"></i> ${item.precautions}</p>
          </div>
        </div>
      `;
      }).join("");
    }
    renderComplicationsAndABCS(plan) {
      const panel = document.getElementById("cdss-complication-panel");
      if (!panel) return;
      const nac = plan.nacProtocol;
      const abcs = plan.abcsChecklist;
      panel.innerHTML = `
      <div class="cdss-panel-header-row">
        <div>
          <h2 class="cdss-panel-title">
            <i class="fa-solid fa-shield-virus"></i> X\u1EED Tr\xED Bi\u1EBFn Ch\u1EE9ng N\u1EB7ng & B\u1EA3ng Ki\u1EC3m ABCS
          </h2>
          <p class="cdss-panel-desc">
            Ph\xE1c \u0111\u1ED3 N-Acetylcysteine (NAC) \u0111\u01B0\u1EDDng t\u0129nh m\u1EA1ch \u0111i\u1EC1u tr\u1ECB suy gan c\u1EA5p v\xE0 quy tr\xECnh ki\u1EC3m so\xE1t ABCS khi t\xE1i s\u1ED1c ho\u1EB7c s\u1ED1c k\xE9o d\xE0i tr\u01A1 d\u1ECBch.
          </p>
        </div>
      </div>

      <!-- KH\u1ED0I PH\xC1C \u0110\u1ED2 NAC SUY GAN C\u1EA4P -->
      <div class="cdss-complication-box ${nac.indicated ? "cdss-complication-box--danger" : ""}">
        <div class="cdss-complication-head">
          <div class="cdss-complication-title">
            <i class="fa-solid fa-liver text-danger"></i>
            <strong>Ph\xE1c \u0110\u1ED3 N-Acetylcysteine (NAC) T\u0129nh M\u1EA1ch \u2014 T\u1ED5n Th\u01B0\u01A1ng Gan C\u1EA5p / Suy Gan</strong>
          </div>
          <span class="cdss-badge ${nac.indicated ? "cdss-badge--danger" : "cdss-badge--info"}">
            ${nac.severityLevel === "acute_liver_failure" ? "SUY GAN C\u1EA4P" : nac.severityLevel === "severe_hepatitis" ? "VI\xCAM GAN N\u1EB6NG" : "CH\u1EE8C N\u0102NG GAN B\xCCNH TH\u01AF\u1EDCNG"}
          </span>
        </div>
        <p class="cdss-complication-summary">${nac.summary}</p>

        ${nac.phases.length > 0 ? `
          <div class="cdss-table-responsive cdss-mt-2">
            <table class="cdss-table cdss-table--sm">
              <thead>
                <tr>
                  <th>Pha</th>
                  <th>Li\u1EC1u mg/kg</th>
                  <th>T\u1ED5ng Li\u1EC1u (mg)</th>
                  <th>Dung M\xF4i & Th\u1EC3 T\xEDch</th>
                  <th>Th\u1EDDi Gian</th>
                  <th>T\u1ED1c \u0110\u1ED9 B\u01A1m Ti\xEAm</th>
                </tr>
              </thead>
              <tbody>
                ${nac.phases.map((p) => `
                  <tr>
                    <td><strong>${p.phaseName}</strong></td>
                    <td>${p.doseMgKg} mg/kg</td>
                    <td><strong class="text-primary">${p.totalMg} mg</strong></td>
                    <td>${p.diluent}</td>
                    <td>${p.infusionTimeHours} gi\u1EDD</td>
                    <td><strong class="text-danger">${p.pumpRateMlH}</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : ""}

        ${nac.precautions.length > 0 ? `
          <ul class="cdss-complication-precautions">
            ${nac.precautions.map((pr) => `<li><i class="fa-solid fa-triangle-exclamation text-warning"></i> ${pr}</li>`).join("")}
          </ul>
        ` : ""}
      </div>

      <!-- KH\u1ED0I B\u1EA2NG KI\u1EC2M ABCS -->
      <div class="cdss-abcs-wrap cdss-mt-3">
        <h3 class="cdss-abcs-header-title">
          <i class="fa-solid fa-list-check"></i> B\u1EA3ng Ki\u1EC3m ABCS Khi S\u1ED1c K\xE9o D\xE0i Ho\u1EB7c T\xE1i S\u1ED1c Tr\u01A1 D\u1ECBch
        </h3>
        <div class="cdss-abcs-grid">
          <!-- A: Acidosis -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--a">A</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.acidosis.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Ti\xEAu chu\u1EA9n:</strong> ${abcs.acidosis.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>X\u1EED tr\xED:</strong> ${abcs.acidosis.action}</div>
            </div>
          </div>

          <!-- B: Bleeding -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--b">B</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.bleeding.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Ti\xEAu chu\u1EA9n:</strong> ${abcs.bleeding.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>X\u1EED tr\xED:</strong> ${abcs.bleeding.action}</div>
            </div>
          </div>

          <!-- C: Calcium -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--c">C</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.calcium.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Ti\xEAu chu\u1EA9n:</strong> ${abcs.calcium.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>X\u1EED tr\xED:</strong> ${abcs.calcium.action}</div>
            </div>
          </div>

          <!-- S: Sugar -->
          <div class="cdss-abcs-card">
            <div class="cdss-abcs-badge cdss-abcs-badge--s">S</div>
            <div class="cdss-abcs-card-content">
              <div class="cdss-abcs-card-title">${abcs.sugar.title}</div>
              <div class="cdss-abcs-card-crit"><strong>Ti\xEAu chu\u1EA9n:</strong> ${abcs.sugar.criteria}</div>
              <div class="cdss-abcs-card-act"><strong>X\u1EED tr\xED:</strong> ${abcs.sugar.action}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- KH\u1ED0I QU\xC1 T\u1EA2I D\u1ECACH & XU\u1EA4T HUY\u1EBET TI\xCAU H\xD3A -->
      <div class="cdss-extra-complications-grid cdss-mt-3">
        <div class="cdss-extra-comp-card">
          <div class="cdss-extra-comp-title">
            <i class="fa-solid fa-water-ladder text-info"></i> Qu\xE1 T\u1EA3i D\u1ECBch & Ph\xF9 Ph\u1ED5i C\u1EA5p (ALI/ARDS)
          </div>
          <p class="cdss-extra-comp-desc">
            \u2022 D\u1EA5u hi\u1EC7u: Th\u1EDF nhanh, SpO2 &lt; 92%, ran \u1EA9m \u0111\xE1y ph\u1ED5i, gan to nhanh \u0111au t\u1EE9c, X-quang ph\u1ED5i m\u1EDD h\xECnh c\xE1nh b\u01B0\u1EDBm.<br>
            \u2022 X\u1EED tr\xED: Gi\u1EA3m t\u1ED1c \u0111\u1ED9 truy\u1EC1n d\u1ECBch v\u1EC1 t\u1ED1c \u0111\u1ED9 t\u1ED1i thi\u1EC3u ho\u1EB7c t\u1EA1m ng\u1EEBng; th\u1EDF oxy qua g\u1ECDng k\xEDnh / CPAP; ti\xEAm <strong>Furosemid 0.5 - 1.0 mg/kg</strong> t\u0129nh m\u1EA1ch ch\u1EADm n\u1EBFu \u0111\xE3 \u0111\u1EE7 th\u1EC3 t\xEDch n\u1ED9i m\u1EA1ch v\xE0 huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh.
          </p>
        </div>
        <div class="cdss-extra-comp-card">
          <div class="cdss-extra-comp-title">
            <i class="fa-solid fa-kit-medical text-danger"></i> Xu\u1EA5t Huy\u1EBFt Ti\xEAu H\xF3a N\u1EB7ng
          </div>
          <p class="cdss-extra-comp-desc">
            \u2022 \u0110\u1EB7t \u1ED1ng th\xF4ng d\u1EA1 d\xE0y gi\u1EA3i \xE1p v\xE0 theo d\xF5i m\xE0u s\u1EAFc d\u1ECBch.<br>
            \u2022 Kh\u1EDFi \u0111\u1ED9ng thu\u1ED1c \u1EE9c ch\u1EBF b\u01A1m proton (PPI): <strong>Omeprazole 80mg ti\xEAm t\u0129nh m\u1EA1ch bolus</strong>, sau \u0111\xF3 truy\u1EC1n li\xEAn t\u1EE5c 8mg/gi\u1EDD ho\u1EB7c 40mg t\u0129nh m\u1EA1ch m\u1ED7i 12 gi\u1EDD.<br>
            \u2022 H\u1ED9i ch\u1EA9n n\u1ED9i soi ti\xEAu h\xF3a can thi\u1EC7p c\u1EA7m m\xE1u kh\u1EA9n c\u1EA5p khi huy\u1EBFt \xE1p t\u1EA1m \u1ED5n \u0111\u1ECBnh.
          </p>
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
        `\u2022 C\xE2n t\xEDnh d\u1ECBch CDC 2014: ${p.weightResult.adjustedWeightKg} kg ${p.weightResult.isObese ? "(HI\u1EC6U CH\u1EC8NH TH\u1EEAA C\xC2N)" : p.weightResult.isPregnantAdjusted ? "(HI\u1EC6U CH\u1EC8NH PNCT)" : ""}`,
        `\u2022 Ph\xE2n \u0111\u1ED9: ${p.patient.severity === "warning_signs" ? "D\u1EA5u hi\u1EC7u c\u1EA3nh b\xE1o" : p.patient.severity === "shock" ? "S\u1ED1c SXHD" : "S\u1ED1c nguy k\u1ECBch"}`,
        `\u2022 Hct \u0111o t\u1EA1i gi\u01B0\u1EDDng: ${p.patient.currentHctPercent ?? 40}% (Hct n\u1EC1n: ${p.patient.baselineHctPercent ?? 40}%) | \u0110\xE1p \u1EE9ng: ${p.patient.clinicalResponse}`,
        `\u2022 Nh\xE1nh \u0111i\u1EC1u tr\u1ECB: ${p.branchDecision.title} (Khuy\u1EBFn ngh\u1ECB: ${p.branchDecision.recommendedFluid})`,
        `\u2022 K\u1EBF ho\u1EA1ch c\u1ECDc d\u1ECBch:`,
        ...p.fluidRows.map((r) => `  - C\u1EEF ${r.stepIndex} (${r.timeWindow}): ${r.rateMlKgH} ml/kg/h (${r.dropsPerMin} gi\u1ECDt/ph\xFAt) | C\u1EA7n ${r.totalMl} ml | Treo th\xEAm: ${r.bottlesToHang} chai | T\u1EA1i c\u1ECDc: ${r.totalAtPoleMl} ml`),
        `\u2022 T\u1ED5ng d\u1ECBch: ${p.totalVolumeMl} ml trong ${p.totalDurationHours} gi\u1EDD.`,
        `\u2022 V\u1EADn m\u1EA1ch khi c\u1EA7n: Dopamin (${p.vasopressorDopamin.totalMg}mg/50ml) | Noradrenalin (${p.vasopressorNoradrenalin.totalMg}mg/50ml) | Dobutamin (${p.vasopressorDobutamin.totalMg}mg/50ml)`,
        ...p.nacProtocol.indicated ? [`\u2022 Ph\xE1c \u0111\u1ED3 NAC: Suy gan c\u1EA5p (AST/ALT ${p.nacProtocol.astAltVal} U/L) - C\u1EA4M Ringer Lactate & Paracetamol.`] : [],
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
  if (typeof window !== "undefined") {
    window.DengueCDSSController = DengueCDSSController;
    window.generateDengueCDSSPlan = generateDengueCDSSPlan;
  }

  // src/content/knowledge-vault/cdss/ecg/ecg-cases.ts
  function createNormalLead(lead) {
    switch (lead) {
      case "I":
        return {
          pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.05, dur: 0.02 },
          rWave: { amp: 1.1, dur: 0.04 },
          sWave: { amp: -0.2, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.35, dur: 0.16, shape: "normal" }
        };
      case "II":
        return {
          pWave: { amp: 0.18, dur: 0.09, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.06, dur: 0.02 },
          rWave: { amp: 1.6, dur: 0.04 },
          sWave: { amp: -0.25, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.45, dur: 0.16, shape: "normal" }
        };
      case "III":
        return {
          pWave: { amp: 0.08, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.08, dur: 0.02 },
          rWave: { amp: 0.8, dur: 0.04 },
          sWave: { amp: -0.3, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.2, dur: 0.16, shape: "normal" }
        };
      case "aVR":
        return {
          pWave: { amp: -0.12, dur: 0.08, shape: "inverted" },
          prSegment: { dur: 0.06 },
          qWave: { amp: 0, dur: 0.01 },
          rWave: { amp: 0.2, dur: 0.03 },
          sWave: { amp: -1.2, dur: 0.04 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: -0.3, dur: 0.16, shape: "inverted" }
        };
      case "aVL":
        return {
          pWave: { amp: 0.08, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.04, dur: 0.02 },
          rWave: { amp: 0.7, dur: 0.04 },
          sWave: { amp: -0.2, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.2, dur: 0.16, shape: "normal" }
        };
      case "aVF":
        return {
          pWave: { amp: 0.14, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.05, dur: 0.02 },
          rWave: { amp: 1.2, dur: 0.04 },
          sWave: { amp: -0.2, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.35, dur: 0.16, shape: "normal" }
        };
      case "V1":
        return {
          pWave: { amp: 0.06, dur: 0.08, shape: "biphasic" },
          prSegment: { dur: 0.06 },
          qWave: { amp: 0, dur: 0.01 },
          rWave: { amp: 0.3, dur: 0.03 },
          sWave: { amp: -1.2, dur: 0.04 },
          stSegment: { elevation: 0.05, slope: "horizontal" },
          tWave: { amp: 0.15, dur: 0.16, shape: "normal" }
        };
      case "V2":
        return {
          pWave: { amp: 0.1, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: 0, dur: 0.01 },
          rWave: { amp: 0.7, dur: 0.03 },
          sWave: { amp: -1.6, dur: 0.04 },
          stSegment: { elevation: 0.08, slope: "horizontal" },
          tWave: { amp: 0.45, dur: 0.16, shape: "normal" }
        };
      case "V3":
        return {
          pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: 0, dur: 0.01 },
          rWave: { amp: 1.2, dur: 0.04 },
          sWave: { amp: -1.2, dur: 0.04 },
          stSegment: { elevation: 0.05, slope: "horizontal" },
          tWave: { amp: 0.55, dur: 0.16, shape: "normal" }
        };
      case "V4":
        return {
          pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.05, dur: 0.02 },
          rWave: { amp: 1.8, dur: 0.04 },
          sWave: { amp: -0.6, dur: 0.03 },
          stSegment: { elevation: 0.02, slope: "horizontal" },
          tWave: { amp: 0.5, dur: 0.16, shape: "normal" }
        };
      case "V5":
        return {
          pWave: { amp: 0.12, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.08, dur: 0.02 },
          rWave: { amp: 1.9, dur: 0.04 },
          sWave: { amp: -0.3, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.45, dur: 0.16, shape: "normal" }
        };
      case "V6":
        return {
          pWave: { amp: 0.1, dur: 0.08, shape: "normal" },
          prSegment: { dur: 0.06 },
          qWave: { amp: -0.06, dur: 0.02 },
          rWave: { amp: 1.4, dur: 0.04 },
          sWave: { amp: -0.2, dur: 0.03 },
          stSegment: { elevation: 0, slope: "horizontal" },
          tWave: { amp: 0.35, dur: 0.16, shape: "normal" }
        };
    }
  }
  function cloneNormalLeads() {
    const leads = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
    const res = {};
    for (const l of leads) {
      res[l] = JSON.parse(JSON.stringify(createNormalLead(l)));
    }
    return res;
  }
  var ECG_CASES = [
    {
      id: "case-stemi-anterior",
      category: "Ischemia",
      title: "NMCT C\u1EA5p Th\xE0nh Tr\u01B0\u1EDBc R\u1ED9ng (Extensive Anterior STEMI)",
      subtitle: "T\u1EAFc \u0111o\u1EA1n g\u1EA7n \u0111\u1ED9ng m\u1EA1ch li\xEAn th\u1EA5t tr\u01B0\u1EDBc (LAD) - Nguy k\u1ECBch",
      severity: "Kh\u1EA9n c\u1EA5p",
      patient: {
        name: "Tr\u1EA7n V\u0103n B\xECnh",
        age: 58,
        gender: "Nam",
        chiefComplaint: "\u0110au ng\u1EF1c d\u1EEF d\u1ED9i ki\u1EC3u b\xF3p ngh\u1EB9t sau x\u01B0\u01A1ng \u1EE9c lan ra vai tr\xE1i v\xE0 h\xE0m",
        clinicalHistory: "B\u1EC7nh nh\xE2n c\xF3 ti\u1EC1n s\u1EED THA 8 n\u0103m, \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng type 2, h\xFAt thu\u1ED1c l\xE1 20 g\xF3i-n\u0103m. \u0110au ng\u1EF1c kh\u1EDFi ph\xE1t l\xFAc 05:30 s\xE1ng khi ngh\u1EC9 ng\u01A1i, k\xE9o d\xE0i >90 ph\xFAt kh\xF4ng \u0111\u1EE1 v\u1EDBi nitrate ng\u1EADm d\u01B0\u1EDBi l\u01B0\u1EE1i, k\xE8m v\xE3 m\u1ED3 h\xF4i l\u1EA1nh v\xE0 bu\u1ED3n n\xF4n.",
        vitals: { bp: "145/95", hr: 96, spo2: 95, temp: 36.8 },
        labs: { k: 4.1, ca: 2.3, mg: 0.9, troponinI: "2.45 ng/mL (T\u0103ng cao)", ckmb: "48 U/L" }
      },
      metrics: {
        heartRate: 96,
        rhythmType: "Nh\u1ECBp xoang \u0111\u1EC1u",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 45,
        prInterval: 160,
        qrsDuration: 90,
        qt: 410,
        qtc: 448
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        leads["V1"].stSegment = { elevation: 0.25, slope: "coved" };
        leads["V1"].tWave = { amp: 0.4, dur: 0.18, shape: "hyperacute" };
        leads["V2"].qWave = { amp: -0.3, dur: 0.04 };
        leads["V2"].rWave = { amp: 0.4, dur: 0.03 };
        leads["V2"].stSegment = { elevation: 0.55, slope: "coved" };
        leads["V2"].tWave = { amp: 0.7, dur: 0.2, shape: "hyperacute" };
        leads["V3"].qWave = { amp: -0.4, dur: 0.04 };
        leads["V3"].rWave = { amp: 0.5, dur: 0.03 };
        leads["V3"].stSegment = { elevation: 0.6, slope: "coved" };
        leads["V3"].tWave = { amp: 0.65, dur: 0.2, shape: "hyperacute" };
        leads["V4"].qWave = { amp: -0.3, dur: 0.03 };
        leads["V4"].stSegment = { elevation: 0.4, slope: "coved" };
        leads["V4"].tWave = { amp: 0.5, dur: 0.18, shape: "hyperacute" };
        leads["V5"].stSegment = { elevation: 0.25, slope: "coved" };
        leads["I"].stSegment = { elevation: 0.2, slope: "coved" };
        leads["aVL"].stSegment = { elevation: 0.25, slope: "coved" };
        leads["III"].stSegment = { elevation: -0.25, slope: "downsloping" };
        leads["III"].tWave = { amp: -0.35, dur: 0.16, shape: "inverted" };
        leads["aVF"].stSegment = { elevation: -0.2, slope: "downsloping" };
        leads["aVF"].tWave = { amp: -0.25, dur: 0.16, shape: "inverted" };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "ST ch\xEAnh l\xEAn \u1EDF DI, aVL (0.2 - 0.25mV); ST ch\xEAnh xu\u1ED1ng \u0111\u1ED1i \u1EE9ng (soi g\u01B0\u01A1ng) s\xE2u \u1EDF DIII, aVF (-0.25mV).",
        chestLeadsSummary: "ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m (coved) r\u1EA5t cao \u1EDF V1-V5 (\u0111\u1EA1t 0.6mV \u1EDF V3); s\xF3ng Q ho\u1EA1i t\u1EED r\u1ED9ng >0.04s xu\u1EA5t hi\u1EC7n \u1EDF V2-V4; s\xF3ng T nh\u1ECDn kh\u1ED5ng l\u1ED3 (hyperacute T)."
      },
      diagnosis: {
        primary: "Nh\u1ED3i m\xE1u c\u01A1 tim c\u1EA5p c\xF3 ST ch\xEAnh l\xEAn th\xE0nh tr\u01B0\u1EDBc r\u1ED9ng (Extensive Anterior STEMI) giai \u0111o\u1EA1n t\u1ED1i c\u1EA5p \u0111\u1EBFn c\u1EA5p",
        culpritVesselOrCause: "\u0110\u1ED9ng m\u1EA1ch li\xEAn th\u1EA5t tr\u01B0\u1EDBc (LAD - Left Anterior Descending artery), t\u1ED5n th\u01B0\u01A1ng \u0111o\u1EA1n g\u1EA7n (proximal LAD)",
        differentials: [
          "Vi\xEAm m\xE0ng ngo\xE0i tim c\u1EA5p (lo\u1EA1i tr\u1EEB v\xEC c\xF3 d\u1EA5u hi\u1EC7u soi g\u01B0\u01A1ng r\xF5 \u1EDF DIII, aVF v\xE0 ST kh\xF4ng ch\xEAnh l\xF5m lan t\u1ECFa)",
          "T\xE1i c\u1EF1c s\u1EDBm l\xE0nh t\xEDnh (lo\u1EA1i tr\u1EEB v\xEC ST ch\xEAnh v\xF2m l\u1ED3i, c\xF3 s\xF3ng Q ho\u1EA1i t\u1EED v\xE0 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng)",
          "Ph\xECnh v\xE1ch th\u1EA5t tr\xE1i (lo\u1EA1i tr\u1EEB v\xEC \u0111au ng\u1EF1c c\u1EA5p m\u1EDBi kh\u1EDFi ph\xE1t v\xE0 men tim t\u0103ng)"
        ],
        keyFindings: [
          "ST ch\xEAnh l\xEAn v\xF2m l\u1ED3i \u2265 2mm t\u1EA1i V1-V4, k\xE8m chuy\u1EC3n \u0111\u1EA1o b\xEAn DI, aVL",
          "H\xECnh \u1EA3nh soi g\u01B0\u01A1ng (reciprocal ST depression) \u0111i\u1EC3n h\xECnh \u1EDF DIII, aVF",
          "S\xF3ng Q ho\u1EA1i t\u1EED b\u1EC7nh l\xFD (>0.04s, >1/4 s\xF3ng R) t\u1EA1i V2, V3",
          "S\xF3ng R b\u1ECB c\u1EAFt c\u1EE5t (poor R wave progression) t\u1EEB V1 \u0111\u1EBFn V4"
        ],
        clinicalNote: "\u0110\xE2y l\xE0 d\u1EA1ng NMCT c\xF3 ti\xEAn l\u01B0\u1EE3ng n\u1EB7ng n\u1EC1 nh\u1EA5t do di\u1EC7n ho\u1EA1i t\u1EED c\u01A1 tim l\u1EDBn, nguy c\u01A1 cao x\u1EA3y ra cho\xE1ng tim, suy tim c\u1EA5p ho\u1EB7c rung th\u1EA5t \u0111\u1ED9t t\u1EED.",
        treatment: [
          "K\xEDch ho\u1EA1t b\xE1o \u0111\u1ED9ng \u0110\u1ECF Can thi\u1EC7p M\u1EA1ch V\xE0nh C\u1EA5p (Code STEMI / Cath-Lab) \u0111\u1EC3 t\xE1i t\u01B0\u1EDBi m\xE1u ngay trong gi\u1EDD v\xE0ng (<90-120 ph\xFAt).",
          "Th\u1EDF oxy n\u1EBFu SpO2 < 90%, thi\u1EBFt l\u1EADp \u0111\u01B0\u1EDDng truy\u1EC1n t\u0129nh m\u1EA1ch v\xE0 monitor theo d\xF5i li\xEAn t\u1EE5c.",
          "Aspirin 300mg nhai ng\u1EADm + Kh\xE1ng P2Y12 (Ticagrelor 180mg ho\u1EB7c Clopidogrel 600mg).",
          "Ch\u1ED1ng \u0111\xF4ng Heparin kh\xF4ng ph\xE2n \u0111o\u1EA1n ho\u1EB7c Enoxaparin.",
          "Morphine t\u0129nh m\u1EA1ch gi\u1EA3m \u0111au n\u1EBFu \u0111au ng\u1EF1c d\u1EEF d\u1ED9i, ki\u1EC3m so\xE1t huy\u1EBFt \xE1p v\xE0 nh\u1ECBp tim c\u1EA9n tr\u1ECDng."
        ],
        confidence: { primary: 98.2, secondaryName: "STEMI tr\u01B0\u1EDBc v\xE1ch", secondaryConfidence: 1.5 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 8: B\u1EC7nh m\u1EA1ch v\xE0nh (Trang 36-51)",
        coreTakeaway: "\u0110\u1ECBnh khu th\xE0nh tr\u01B0\u1EDBc: V1-V2 l\xE0 v\xF9ng v\xE1ch, V2-V5 m\u1EB7t tr\u01B0\u1EDBc, V1-V6 k\xE8m DI, aVL l\xE0 tr\u01B0\u1EDBc r\u1ED9ng do t\u1EAFc LAD. D\u1EA5u hi\u1EC7u soi g\u01B0\u01A1ng \u1EDF DIII, aVF l\xE0 ch\xECa kh\xF3a ph\xE2n bi\u1EC7t v\u1EDBi vi\xEAm m\xE0ng ngo\xE0i tim.",
        pitfallToAvoid: "Kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EA7m ST ch\xEAnh l\xEAn l\u1ED3i c\u1EE7a STEMI v\u1EDBi ST ch\xEAnh l\xEAn l\xF5m c\u1EE7a vi\xEAm m\xE0ng ngo\xE0i tim. Khi c\xF3 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng \u1EDF chuy\u1EC3n \u0111\u1EA1o \u0111\u1ED1i di\u1EC7n, 99% l\xE0 h\u1ED9i ch\u1EE9ng v\xE0nh c\u1EA5p."
      }
    },
    {
      id: "case-stemi-inferior",
      category: "Ischemia",
      title: "NMCT C\u1EA5p Th\xE0nh D\u01B0\u1EDBi (Acute Inferior STEMI)",
      subtitle: "T\u1EAFc \u0111\u1ED9ng m\u1EA1ch v\xE0nh ph\u1EA3i (RCA) - Ch\xFA \xFD nguy c\u01A1 nh\u1ED3i m\xE1u th\u1EA5t ph\u1EA3i \u0111i k\xE8m",
      severity: "Kh\u1EA9n c\u1EA5p",
      patient: {
        name: "Nguy\u1EC5n Th\u1ECB Mai",
        age: 64,
        gender: "N\u1EEF",
        chiefComplaint: "\u0110au t\u1EE9c v\xF9ng th\u01B0\u1EE3ng v\u1ECB v\xE0 sau x\u01B0\u01A1ng \u1EE9c, v\xE3 m\u1ED3 h\xF4i, n\xF4n m\u1EEDa, huy\u1EBFt \xE1p t\u1EE5t",
        clinicalHistory: "B\u1EC7nh nh\xE2n kh\u1EDFi ph\xE1t \u0111au th\u01B0\u1EE3ng v\u1ECB \xE2m \u1EC9 sau \u0111\xF3 t\u1EE9c ngh\u1EB9n ng\u1EF1c lan l\xEAn c\u1ED5. Gia \u0111\xECnh ban \u0111\u1EA7u ngh\u0129 l\xE0 \u0111au d\u1EA1 d\xE0y. Khi v\xE0o vi\u1EC7n b\u1EC7nh nh\xE2n l\u01A1 m\u01A1 nh\u1EB9, huy\u1EBFt \xE1p t\u1EE5t 85/50 mmHg, t\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i.",
        vitals: { bp: "85/50", hr: 52, spo2: 96, temp: 37 },
        labs: { k: 4, ca: 2.2, mg: 0.85, troponinI: "3.1 ng/mL", ckmb: "62 U/L" }
      },
      metrics: {
        heartRate: 52,
        rhythmType: "Nh\u1ECBp xoang ch\u1EADm k\xE8m ngo\u1EA1i t\xE2m thu nh\u0129",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch ph\u1EA3i",
        alphaAngle: 105,
        prInterval: 190,
        qrsDuration: 85,
        qt: 430,
        qtc: 400
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        leads["II"].stSegment = { elevation: 0.3, slope: "coved" };
        leads["II"].tWave = { amp: 0.5, dur: 0.18, shape: "hyperacute" };
        leads["III"].qWave = { amp: -0.3, dur: 0.04 };
        leads["III"].rWave = { amp: 0.6, dur: 0.03 };
        leads["III"].stSegment = { elevation: 0.45, slope: "coved" };
        leads["III"].tWave = { amp: 0.6, dur: 0.2, shape: "hyperacute" };
        leads["aVF"].qWave = { amp: -0.2, dur: 0.03 };
        leads["aVF"].stSegment = { elevation: 0.35, slope: "coved" };
        leads["aVF"].tWave = { amp: 0.45, dur: 0.18, shape: "hyperacute" };
        leads["I"].stSegment = { elevation: -0.2, slope: "downsloping" };
        leads["I"].tWave = { amp: -0.25, dur: 0.16, shape: "inverted" };
        leads["aVL"].stSegment = { elevation: -0.3, slope: "downsloping" };
        leads["aVL"].tWave = { amp: -0.3, dur: 0.16, shape: "inverted" };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m l\u1ED3i \u1EDF DII (0.3mV), DIII (0.45mV) v\xE0 aVF (0.35mV). ST ch\xEAnh l\xEAn \u1EDF DIII l\u1EDBn h\u01A1n DII. ST ch\xEAnh xu\u1ED1ng \u0111\u1ED1i \u1EE9ng r\u1EA5t r\xF5 \u1EDF aVL (-0.3mV) v\xE0 DI.",
        chestLeadsSummary: "Chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim V1-V6 kh\xF4ng c\xF3 ST ch\xEAnh l\xEAn. C\u1EA7n \u0111o th\xEAm V3R, V4R kh\u1EA3o s\xE1t th\u1EA5t ph\u1EA3i v\xE0 V7-V9 th\xE0nh sau."
      },
      diagnosis: {
        primary: "Nh\u1ED3i m\xE1u c\u01A1 tim c\u1EA5p c\xF3 ST ch\xEAnh l\xEAn th\xE0nh d\u01B0\u1EDBi (Inferior STEMI) k\xE8m nghi ng\u1EDD t\u1ED5n th\u01B0\u01A1ng th\u1EA5t ph\u1EA3i",
        culpritVesselOrCause: "\u0110\u1ED9ng m\u1EA1ch v\xE0nh ph\u1EA3i (RCA - Right Coronary Artery), ST ch\xEAnh DIII > DII ch\u1EC9 \u0111i\u1EC3m RCA v\u01B0\u1EE3t tr\u1ED9i",
        differentials: [
          "T\u1EAFc \u0110M m\u0169 tr\xE1i (LCx) - lo\u1EA1i tr\u1EEB v\xEC t\u1ED5n th\u01B0\u01A1ng LCx th\u01B0\u1EDDng ST ch\xEAnh \u1EDF DII > DIII v\xE0 c\xF3 ST ch\xEAnh l\xEAn \u1EDF V5, V6, DI, aVL",
          "Vi\xEAm c\u01A1 tim c\u1EA5p",
          "Thuy\xEAn t\u1EAFc ph\u1ED5i"
        ],
        keyFindings: [
          "ST ch\xEAnh l\xEAn \u1EDF DII, DIII, aVF",
          "M\u1EE9c \u0111\u1ED9 ch\xEAnh DIII > DII k\u1EBFt h\u1EE3p ST ch\xEAnh xu\u1ED1ng \u1EDF DI, aVL",
          "Nh\u1ECBp ch\u1EADm xoang (52 l/p) do thi\u1EBFu m\xE1u nu\xF4i n\xFAt xoang/n\xFAt nh\u0129 th\u1EA5t t\u1EEB nh\xE1nh c\u1EE7a RCA"
        ],
        clinicalNote: "B\u1EC7nh nh\xE2n c\xF3 huy\u1EBFt \xE1p t\u1EE5t (85/50) v\xE0 t\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i. Ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh tuy\u1EC7t \u0111\u1ED1i d\xF9ng Nitrate v\xE0 l\u1EE3i ti\u1EC3u v\xEC s\u1EBD l\xE0m gi\u1EA3m ti\u1EC1n t\u1EA3i tr\u1EA7m tr\u1ECDng g\xE2y t\u1EE5t HA kh\xF4ng h\u1ED3i ph\u1EE5c!",
        treatment: [
          "\u0110o ngay chuy\u1EC3n \u0111\u1EA1o th\u1EA5t ph\u1EA3i V3R, V4R v\xE0 chuy\u1EC3n \u0111\u1EA1o th\xE0nh sau V7, V8, V9.",
          "K\xEDch ho\u1EA1t can thi\u1EC7p m\u1EA1ch v\xE0nh c\u1EA5p c\u1EE9u PCI \u0111\u1EB7t stent RCA.",
          "Truy\u1EC1n d\u1ECBch mu\u1ED1i \u0111\u1EB3ng tr\u01B0\u01A1ng (NaCl 0.9%) \u0111\u1EC3 n\xE2ng ti\u1EC1n t\u1EA3i th\u1EA5t ph\u1EA3i, n\xE2ng HA.",
          "Tr\xE1nh tuy\u1EC7t \u0111\u1ED1i Nitroglycerin, Morphine li\u1EC1u cao, l\u1EE3i ti\u1EC3u v\xE0 thu\u1ED1c \u1EE9c ch\u1EBF beta l\xFAc n\xE0y.",
          "S\u1EB5n s\xE0ng Atropine ho\u1EB7c m\xE1y t\u1EA1o nh\u1ECBp t\u1EA1m th\u1EDDi n\u1EBFu xu\u1EA5t hi\u1EC7n Bloc AV cao \u0111\u1ED9."
        ],
        confidence: { primary: 97.5, secondaryName: "STEMI th\xE0nh d\u01B0\u1EDBi k\xE8m th\u1EA5t ph\u1EA3i", secondaryConfidence: 2 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 8: B\u1EC7nh m\u1EA1ch v\xE0nh (Trang 44, 48-49)",
        coreTakeaway: "\u0110M v\xE0nh ph\u1EA3i (RCA) cung c\u1EA5p 80% m\xE1u cho th\xE0nh d\u01B0\u1EDBi. N\u1EBFu ST ch\xEAnh DIII > DII k\xE8m ST ch\xEAnh xu\u1ED1ng DI, aVL -> 90% do RCA. Lu\xF4n \u0111o V3R, V4R t\xECm nh\u1ED3i m\xE1u th\u1EA5t ph\u1EA3i.",
        pitfallToAvoid: "Ng\u01B0\u1EDDi gi\xE0 \u0111au th\u01B0\u1EE3ng v\u1ECB k\xE8m t\u1EE5t HA ph\u1EA3i l\u1EADp t\u1EE9c \u0111o ECG lo\u1EA1i tr\u1EEB NMCT th\xE0nh d\u01B0\u1EDBi. Kh\xF4ng cho nh\u1EA7m thu\u1ED1c d\u1EA1 d\xE0y ho\u1EB7c cho Nitrate h\u1EA1 HA."
      }
    },
    {
      id: "case-complete-av-block",
      category: "Conduction",
      title: "Bloc Nh\u0129 - Th\u1EA5t Ho\xE0n To\xE0n \u0110\u1ED9 III (Complete 3rd Degree AV Block)",
      subtitle: "Ph\xE2n ly nh\u0129 th\u1EA5t ho\xE0n to\xE0n - Nh\u1ECBp tho\xE1t th\u1EA5t ch\u1EADm 34 l\u1EA7n/ph\xFAt",
      severity: "Nguy k\u1ECBch",
      patient: {
        name: "L\xEA V\u0103n H\xF9ng",
        age: 76,
        gender: "Nam",
        chiefComplaint: "Ng\u1EA5t t\xE1i di\u1EC5n, cho\xE1ng v\xE1ng \u0111\u1ED9t ng\u1ED9t, m\u1EA1ch \u0111\u1EADp r\u1EA5t ch\u1EADm",
        clinicalHistory: "B\u1EC7nh nh\xE2n 76 tu\u1ED5i c\xF3 2 c\u01A1n ng\u1EA5t \u0111\u1ED9t ng\u1ED9t ki\u1EC3u Stokes-Adams trong 24 gi\u1EDD qua. Khi ng\u1EA5t m\u1EB7t t\xE1i nh\u1EE3t, ng\xE3 ra s\xE0n kho\u1EA3ng 20 gi\xE2y r\u1ED3i t\u1EC9nh l\u1EA1i, kh\xF4ng y\u1EBFu li\u1EC7t th\u1EA7n kinh khu tr\xFA.",
        vitals: { bp: "160/60", hr: 34, spo2: 97, temp: 36.5 },
        labs: { k: 4.3, ca: 2.25, mg: 0.95, troponinI: "0.02 ng/mL (b\xECnh th\u01B0\u1EDDng)" }
      },
      metrics: {
        heartRate: 34,
        rhythmType: "Bloc nh\u0129 th\u1EA5t \u0111\u1ED9 III (Ph\xE2n ly nh\u0129 th\u1EA5t ho\xE0n to\xE0n)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch tr\xE1i",
        alphaAngle: -45,
        prInterval: 0,
        // Không cố định
        qrsDuration: 135,
        // QRS rộng do nhịp thoát thất
        qt: 520,
        qtc: 390
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        for (const k of Object.keys(leads)) {
          leads[k].pWave = { amp: 0.22, dur: 0.09, shape: "normal" };
          leads[k].prSegment = { dur: 0.2 };
          leads[k].qrsDuration = 0.14;
          leads[k].rWave = { amp: leads[k].rWave.amp * 1.2, dur: 0.08, notched: true };
          leads[k].sWave = { amp: leads[k].sWave.amp * 1.3, dur: 0.06 };
          leads[k].stSegment = { elevation: -0.05, slope: "downsloping" };
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "S\xF3ng P \u0111i \u0111\u1EC1u \u0111\u1EB7n v\u1EDBi t\u1EA7n s\u1ED1 nh\u0129 ~75 l/p. Ph\u1EE9c b\u1ED9 QRS \u0111i \u0111\u1EC1u \u0111\u1EB7n v\u1EDBi t\u1EA7n s\u1ED1 th\u1EA5t ~34 l/p. Kh\xF4ng c\xF3 s\u1EF1 li\xEAn h\u1EC7 gi\u1EEFa s\xF3ng P v\xE0 QRS (kho\u1EA3ng PR bi\u1EBFn thi\xEAn li\xEAn t\u1EE5c, th\u1EC9nh tho\u1EA3ng P \u0111\xE8 l\xEAn QRS ho\u1EB7c T).",
        chestLeadsSummary: "Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng >0.12s (135ms), h\xECnh th\xE1i d\u1ECB d\u1EA1ng ki\u1EC3u nh\u1ECBp tho\xE1t t\u1EF1 th\u1EA5t (idioventricular escape rhythm)."
      },
      diagnosis: {
        primary: "Bloc Nh\u0129 - Th\u1EA5t ho\xE0n to\xE0n \u0111\u1ED9 III (Third-Degree Atrioventricular Block) v\u1EDBi nh\u1ECBp tho\xE1t th\u1EA5t ch\u1EADm",
        culpritVesselOrCause: "Tho\xE1i h\xF3a h\u1EC7 th\u1ED1ng d\u1EABn truy\u1EC1n (B\u1EC7nh Lenegre / Lev) ho\u1EB7c thi\u1EBFu m\xE1u nu\xF4i n\xFAt AV",
        differentials: [
          "Bloc nh\u0129 th\u1EA5t \u0111\u1ED9 II Mobitz 2 d\u1EABn truy\u1EC1n 2:1 ho\u1EB7c 3:1 (\u1EDF \u0111\xE2y P v\xE0 QRS ph\xE2n ly ho\xE0n to\xE0n \u0111\u1ED9c l\u1EADp)",
          "Nh\u1ECBp ch\u1EADm xoang n\u1EB7ng",
          "Ng\u1ED9 \u0111\u1ED9c thu\u1ED1c ch\u1EB9n beta / ch\u1EB9n calci"
        ],
        keyFindings: [
          "Ph\xE2n ly nh\u0129 th\u1EA5t ho\xE0n to\xE0n (AV dissociation): Nh\u0129 \u0111\u1EADp theo nh\u1ECBp xoang 75 l/p, Th\u1EA5t \u0111\u1EADp theo nh\u1ECBp t\u1EF1 th\u1EA5t 34 l/p",
          "Kho\u1EA3ng P-P \u0111\u1EC1u nhau, kho\u1EA3ng R-R \u0111\u1EC1u nhau nh\u01B0ng kh\xF4ng c\xF3 m\u1ED1i t\u01B0\u01A1ng quan",
          "Kho\u1EA3ng PR ho\xE0n to\xE0n ng\u1EABu nhi\xEAn v\xE0 bi\u1EBFn thi\xEAn",
          "QRS d\xE3n r\u1ED9ng >0.12s do \u1ED5 ph\xE1t nh\u1ECBp n\u1EB1m d\u01B0\u1EDBi ch\u1ED7 ph\xE2n chia b\xF3 His trong t\xE2m th\u1EA5t"
        ],
        clinicalNote: "Nguy c\u01A1 ng\u1EEBng tim v\xF4 t\xE2m thu (asystole) ho\u1EB7c kh\u1EDFi ph\xE1t rung th\u1EA5t/xo\u1EAFn \u0111\u1EC9nh r\u1EA5t cao. H\u1ED9i ch\u1EE9ng Adams-Stokes l\xE0 ch\u1EC9 \u0111\u1ECBnh \u0111\u1EB7t m\xE1y t\u1EA1o nh\u1ECBp tim c\u1EA5p c\u1EE9u!",
        treatment: [
          "\u0110\u1EB7t m\xE1y t\u1EA1o nh\u1ECBp t\u1EA1m th\u1EDDi qua da (Transcutaneous pacing) ho\u1EB7c qua t\u0129nh m\u1EA1ch (Transvenous pacing) ngay l\u1EADp t\u1EE9c.",
          "D\xF9ng Isoproterenol ho\u1EB7c Adrenaline truy\u1EC1n t\u0129nh m\u1EA1ch duy tr\xEC n\u1EBFu ch\u01B0a k\u1ECBp \u0111\u1EB7t m\xE1y t\u1EA1o nh\u1ECBp.",
          "Atropine 0.5 - 1mg TM c\xF3 th\u1EC3 th\u1EED nh\u01B0ng th\u01B0\u1EDDng \xEDt \u0111\xE1p \u1EE9ng khi t\u1ED5n th\u01B0\u01A1ng d\u01B0\u1EDBi n\xFAt AV.",
          "Ch\u1EC9 \u0111\u1ECBnh c\u1EA5y m\xE1y t\u1EA1o nh\u1ECBp v\u0129nh vi\u1EC5n (Permanent Pacemaker - DDD/VVI)."
        ],
        confidence: { primary: 99.1, secondaryName: "Bloc AV cao \u0111\u1ED9", secondaryConfidence: 0.8 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 10: R\u1ED1i lo\u1EA1n nh\u1ECBp tim (Trang 62, 82, 114)",
        coreTakeaway: "Trong BAV \u0111\u1ED9 III: P v\xE0 QRS c\xF3 nh\u1ECBp ri\xEAng r\u1EBD. T\u1EA7n s\u1ED1 nh\u0129 70-80 l/p, t\u1EA7n s\u1ED1 th\u1EA5t 30-40 l/p. D\xF9ng compa \u0111o kho\u1EA3ng PP v\xE0 RR s\u1EBD th\u1EA5y 2 nh\u1ECBp ho\xE0n to\xE0n \u0111\u1ED9c l\u1EADp.",
        pitfallToAvoid: "C\u1EA7n t\xECm k\u1EF9 s\xF3ng P l\u1EABn v\xE0o \u0111o\u1EA1n ST ho\u1EB7c s\xF3ng T b\u1EB1ng c\xE1ch d\xF9ng th\u01B0\u1EDBc compa gi\xF3ng \u0111\u1EC1u kho\u1EA3ng P-P."
      }
    },
    {
      id: "case-afib-rvr",
      category: "Arrhythmia",
      title: "Rung Nh\u0129 \u0110\xE1p \u1EE8ng Th\u1EA5t Nhanh (Atrial Fibrillation with RVR)",
      subtitle: "T\u1EA7n s\u1ED1 th\u1EA5t 148 l/p, ho\xE0n to\xE0n kh\xF4ng \u0111\u1EC1u - Nguy c\u01A1 t\u1EAFc m\u1EA1ch huy\u1EBFt kh\u1ED1i",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "Ho\xE0ng V\u0103n Tu\u1EA5n",
        age: 62,
        gender: "Nam",
        chiefComplaint: "H\u1ED3i h\u1ED9p \u0111\xE1nh tr\u1ED1ng ng\u1EF1c d\u1ED3n d\u1EADp, kh\xF3 th\u1EDF khi g\u1EAFng s\u1EE9c, h\u1EE5t h\u01A1i",
        clinicalHistory: "B\u1EC7nh nh\xE2n c\xF3 ti\u1EC1n s\u1EED THA 10 n\u0103m, h\u1EB9p van 2 l\xE1 nh\u1EB9. Kho\u1EA3ng 4 gi\u1EDD tr\u01B0\u1EDBc th\u1EA5y tim \u0111\u1EADp lo\u1EA1n x\u1EA1 trong l\u1ED3ng ng\u1EF1c, c\u1EA3m gi\xE1c nh\u01B0 tim nh\u1EA3y m\xFAa, hoa m\u1EAFt nh\u1EB9. B\u1EAFt m\u1EA1ch th\u1EA5y nh\u1ECBp \u0111\u1EADp l\xFAc nhanh l\xFAc ch\u1EADm, c\u01B0\u1EDDng \u0111\u1ED9 m\u1EA1ch kh\xF4ng \u0111\u1EC1u.",
        vitals: { bp: "135/85", hr: 148, spo2: 96, temp: 36.6 },
        labs: { k: 4.2, ca: 2.3, mg: 0.9, troponinI: "0.03 ng/mL", bnp: "320 pg/mL" }
      },
      metrics: {
        heartRate: 148,
        rhythmType: "Rung nh\u0129 (Atrial Fibrillation)",
        regularity: "Lo\u1EA1n nh\u1ECBp ho\xE0n to\xE0n",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 30,
        prInterval: 0,
        // Không có sóng P
        qrsDuration: 85,
        qt: 320,
        qtc: 480
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        for (const k of Object.keys(leads)) {
          leads[k].pWave = { amp: 0.03, dur: 0.05, shape: "flat" };
          leads[k].stSegment = { elevation: -0.05, slope: "downsloping" };
        }
        leads["V1"].pWave = { amp: 0.06, dur: 0.04, shape: "biphasic" };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "Kho\u1EA3ng R-R ho\xE0n to\xE0n kh\xF4ng \u0111\u1EC1u. M\u1EA5t ho\xE0n to\xE0n s\xF3ng P c\u1EE7a nh\u1ECBp xoang, thay b\u1EB1ng c\xE1c s\xF3ng f l\u0103n t\u0103n kh\xF4ng \u0111\u1EC1u v\u1EC1 bi\xEAn \u0111\u1ED9 v\xE0 h\xECnh d\u1EA1ng.",
        chestLeadsSummary: "Ph\u1EE9c b\u1ED9 QRS h\u1EB9p (<0.12s). Nh\u1ECBp th\u1EA5t dao \u0111\u1ED9ng t\u1EEB 130 - 165 l/p (trung b\xECnh 148 l/p). Quan s\xE1t s\xF3ng f r\xF5 nh\u1EA5t \u1EDF V1."
      },
      diagnosis: {
        primary: "Rung nh\u0129 k\u1ECBch ph\xE1t c\xF3 \u0111\xE1p \u1EE9ng th\u1EA5t nhanh (Atrial Fibrillation with Rapid Ventricular Response)",
        culpritVesselOrCause: "V\xF2ng vi v\xE0o l\u1EA1i \u0111a \u1ED5 trong bu\u1ED3ng t\xE2m nh\u0129, th\u01B0\u1EDDng kh\u1EDFi ph\xE1t t\u1EEB c\xE1c t\u0129nh m\u1EA1ch ph\u1ED5i",
        differentials: [
          "Cu\u1ED3ng nh\u0129 v\u1EDBi d\u1EABn truy\u1EC1n nh\u0129 th\u1EA5t thay \u0111\u1ED5i (lo\u1EA1i tr\u1EEB v\xEC cu\u1ED3ng nh\u0129 c\xF3 s\xF3ng r\u0103ng c\u01B0a F \u0111\u1EC1u \u0111\u1EB7n \u1EDF DII, DIII, aVF)",
          "Nh\u1ECBp nhanh xoang c\xF3 nhi\u1EC1u ngo\u1EA1i t\xE2m thu nh\u0129",
          "Nh\u1ECBp nhanh nh\u0129 \u0111a \u1ED5 (MAT)"
        ],
        keyFindings: [
          "Nh\u1ECBp th\u1EA5t ho\xE0n to\xE0n kh\xF4ng \u0111\u1EC1u (kho\u1EA3ng RR bi\u1EBFn thi\xEAn b\u1EA5t quy t\u1EAFc)",
          "M\u1EA5t s\xF3ng P, thay b\u1EB1ng s\xF3ng f l\u0103n t\u0103n t\u1EA7n s\u1ED1 350-600 l/p",
          "Ph\u1EE9c b\u1ED9 QRS thanh m\u1EA3nh b\xECnh th\u01B0\u1EDDng (<0.12s)",
          "\u0110\xE1p \u1EE9ng th\u1EA5t nhanh trung b\xECnh >100 l/p (\u1EDF \u0111\xE2y l\xE0 148 l/p)"
        ],
        clinicalNote: "Rung nh\u0129 l\xE0m t\u0103ng nguy c\u01A1 tai bi\u1EBFn m\u1EA1ch m\xE1u n\xE3o do huy\u1EBFt kh\u1ED1i bu\u1ED3ng tim l\xEAn g\u1EA5p 5 l\u1EA7n. C\u1EA7n t\xEDnh thang \u0111i\u1EC3m CHA2DS2-VASc \u0111\u1EC3 ch\u1EC9 \u0111\u1ECBnh kh\xE1ng \u0111\xF4ng.",
        treatment: [
          "Ki\u1EC3m so\xE1t t\u1EA7n s\u1ED1 th\u1EA5t: Thu\u1ED1c ch\u1EB9n beta giao c\u1EA3m (Metoprolol/Bisoprolol) ho\u1EB7c ch\u1EB9n k\xEAnh calci Diltiazem truy\u1EC1n TM.",
          "\u0110\xE1nh gi\xE1 nguy c\u01A1 t\u1EAFc m\u1EA1ch theo thang \u0111i\u1EC3m CHA2DS2-VASc v\xE0 nguy c\u01A1 ch\u1EA3y m\xE1u HAS-BLED.",
          "Kh\xE1ng \u0111\xF4ng \u0111\u01B0\u1EDDng u\u1ED1ng (NOAC/DOAC nh\u01B0 Apixaban, Rivaroxaban ho\u1EB7c Dabigatran).",
          "C\xE2n nh\u1EAFc chuy\u1EC3n nh\u1ECBp (b\u1EB1ng s\u1ED1c \u0111i\u1EC7n \u0111\u1ED3ng b\u1ED9 ho\u1EB7c thu\u1ED1c Amiodarone/Flecainide) n\u1EBFu th\u1EDDi gian kh\u1EDFi ph\xE1t <48h ho\u1EB7c sau khi si\xEAu \xE2m tim qua th\u1EF1c qu\u1EA3n (TEE) lo\u1EA1i tr\u1EEB huy\u1EBFt kh\u1ED1i ti\u1EC3u nh\u0129 tr\xE1i."
        ],
        confidence: { primary: 99.4, secondaryName: "Cu\u1ED3ng nh\u0129 d\u1EABn truy\u1EC1n thay \u0111\u1ED5i", secondaryConfidence: 0.5 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 10: R\u1ED1i lo\u1EA1n nh\u1ECBp tim (Trang 65-66)",
        coreTakeaway: "Rung nh\u0129 \u0111\u1EB7c tr\u01B0ng b\u1EDFi tam ch\u1EE9ng: 1. Kho\u1EA3ng R-R ho\xE0n to\xE0n kh\xF4ng \u0111\u1EC1u; 2. M\u1EA5t s\xF3ng P; 3. Xu\u1EA5t hi\u1EC7n s\xF3ng f l\u0103n t\u0103n t\u1EA7n s\u1ED1 350-600 chu k\u1EF3/ph\xFAt r\xF5 \u1EDF V1, V2, DII.",
        pitfallToAvoid: "\u0110\u1EEBng nh\u1EA7m s\xF3ng f l\u0103n t\u0103n l\u1EDBn \u1EDF V1 v\u1EDBi s\xF3ng F r\u0103ng c\u01B0a c\u1EE7a cu\u1ED3ng nh\u0129. Cu\u1ED3ng nh\u0129 c\xF3 \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n r\u0103ng c\u01B0a li\xEAn t\u1EE5c c\u1EF1c k\u1EF3 \u0111\u1EC1u \u0111\u1EB7n \u1EDF DII, DIII, aVF."
      }
    },
    {
      id: "case-wpw-syndrome",
      category: "Arrhythmia",
      title: "H\u1ED9i Ch\u1EE9ng Wolff - Parkinson - White (WPW Type A)",
      subtitle: "\u0110\u01B0\u1EDDng d\u1EABn truy\u1EC1n ph\u1EE5 B\xF3 Kent nh\u0129 th\u1EA5t tr\xE1i - S\xF3ng Delta d\u01B0\u01A1ng \u1EDF V1",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "\u0110\u1ED7 Minh Khang",
        age: 23,
        gender: "Nam",
        chiefComplaint: "C\u01A1n h\u1ED3i h\u1ED9p tim \u0111\u1EADp nhanh k\u1ECBch ph\xE1t, c\u1EA3m gi\xE1c h\u1EABng ng\u1EF1c khi ch\u01A1i th\u1EC3 thao",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 23 tu\u1ED5i, sinh vi\xEAn \u0111\u1EA1i h\u1ECDc. Th\u1EC9nh tho\u1EA3ng c\xF3 c\u01A1n tim \u0111\u1EADp th\xECnh th\u1ECBch 180-200 l/p kh\u1EDFi ph\xE1t \u0111\u1ED9t ng\u1ED9t v\xE0 k\u1EBFt th\xFAc \u0111\u1ED9t ng\u1ED9t sau v\xE0i ph\xFAt. Kh\xF4ng \u0111au ng\u1EF1c, kh\xF4ng ng\u1EA5t. \u0110i kh\xE1m s\u1EE9c kh\u1ECFe t\xECnh c\u1EDD ph\xE1t hi\u1EC7n \u0111i\u1EC7n tim b\u1EA5t th\u01B0\u1EDDng.",
        vitals: { bp: "120/75", hr: 78, spo2: 99, temp: 36.6 },
        labs: { k: 4.1, ca: 2.3, mg: 0.9, troponinI: "\xC2m t\xEDnh" }
      },
      metrics: {
        heartRate: 78,
        rhythmType: "Nh\u1ECBp xoang k\xE8m ti\u1EC1n k\xEDch th\xEDch th\u1EA5t (WPW)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 30,
        prInterval: 95,
        // PR ngắn < 120ms
        qrsDuration: 130,
        // QRS dãn rộng do sóng delta
        qt: 400,
        qtc: 440
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        for (const k of Object.keys(leads)) {
          leads[k].prSegment = { dur: 0.01 };
          leads[k].pWave = { amp: 0.12, dur: 0.08, shape: "normal" };
        }
        leads["V1"].rWave = { amp: 1.4, dur: 0.07, notched: true };
        leads["V1"].sWave = { amp: -0.2, dur: 0.02 };
        leads["V1"].stSegment = { elevation: -0.1, slope: "downsloping" };
        leads["V1"].tWave = { amp: -0.2, dur: 0.16, shape: "inverted" };
        leads["V2"].rWave = { amp: 2.2, dur: 0.08, notched: true };
        leads["V5"].rWave = { amp: 2.4, dur: 0.08, notched: true };
        leads["I"].rWave = { amp: 1.5, dur: 0.07, notched: true };
        leads["II"].rWave = { amp: 1.8, dur: 0.07, notched: true };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "Kho\u1EA3ng PR ng\u1EAFn r\xF5 r\u1EC7t <0.12s (95ms). Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng (130ms) v\u1EDBi ph\u1EA7n kh\u1EDFi \u0111\u1EA7u thoai tho\u1EA3i c\u1EE7a s\xF3ng Delta.",
        chestLeadsSummary: "S\xF3ng Delta d\u01B0\u01A1ng n\u1ED5i b\u1EADt \u1EDF t\u1EA5t c\u1EA3 c\xE1c chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim V1-V6. S\xF3ng R cao \u01B0u th\u1EBF \u1EDF V1 (Type A, c\u1EA7u n\u1ED1i Kent n\u1EB1m b\xEAn tim tr\xE1i). Bi\u1EBFn \u0111\u1ED5i ST-T th\u1EE9 ph\xE1t tr\xE1i chi\u1EC1u v\u1EDBi QRS."
      },
      diagnosis: {
        primary: "H\u1ED9i ch\u1EE9ng ti\u1EC1n k\xEDch th\xEDch Wolff - Parkinson - White (WPW Type A)",
        culpritVesselOrCause: "C\u1EA7u n\u1ED1i d\u1EABn truy\u1EC1n ph\u1EE5 nh\u0129 th\u1EA5t (B\xF3 Kent - Bundle of Kent) n\u1EB1m \u1EDF tim tr\xE1i",
        differentials: [
          "H\u1ED9i ch\u1EE9ng Lown-Ganong-Levine (LGL) - lo\u1EA1i tr\u1EEB v\xEC LGL c\xF3 PR ng\u1EAFn nh\u01B0ng QRS h\u1EB9p b\xECnh th\u01B0\u1EDDng v\xE0 kh\xF4ng c\xF3 s\xF3ng Delta",
          "Bloc nh\xE1nh ph\u1EA3i (RBBB) - lo\u1EA1i tr\u1EEB v\xEC RBBB c\xF3 PR b\xECnh th\u01B0\u1EDDng v\xE0 c\xF3 d\u1EA1ng rsR' ch\u1EEF M",
          "Ph\xEC \u0111\u1EA1i th\u1EA5t ph\u1EA3i (RVH)"
        ],
        keyFindings: [
          "Kho\u1EA3ng PR ng\u1EAFn < 0.12 gi\xE2y (0.095s)",
          "S\xF3ng Delta thoai tho\u1EA3i \u1EDF s\u01B0\u1EDDn l\xEAn ph\u1EE9c b\u1ED9 QRS",
          "Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng \u2265 0.12 gi\xE2y",
          "S\xF3ng R tr\u1ED9i v\xE0 Delta d\u01B0\u01A1ng t\u1EA1i V1 (Type A)",
          "Thay \u0111\u1ED5i t\xE1i c\u1EF1c ST-T th\u1EE9 ph\xE1t ng\u01B0\u1EE3c chi\u1EC1u s\xF3ng delta"
        ],
        clinicalNote: "N\u1EBFu b\u1EC7nh nh\xE2n WPW b\u1ECB rung nh\u0129 (AF + WPW), xung \u0111\u1ED9ng c\xF3 th\u1EC3 d\u1EABn truy\u1EC1n c\u1EF1c nhanh qua c\u1EA7u Kent xu\u1ED1ng th\u1EA5t (>250-300 l/p) g\xE2y tho\xE1i tri\u1EC3n th\xE0nh Rung th\u1EA5t (VF) \u0111\u1ED9t t\u1EED!",
        treatment: [
          "Ph\u01B0\u01A1ng ph\xE1p tri\u1EC7t \u0111\u1EC3: Th\u0103m d\xF2 \u0111i\u1EC7n sinh l\xFD tim (EPS) v\xE0 tri\u1EC7t \u0111\u1ED1t \u0111\u01B0\u1EDDng d\u1EABn truy\u1EC1n ph\u1EE5 qua \u1ED1ng th\xF4ng b\u1EB1ng s\xF3ng cao t\u1EA7n (RF Catheter Ablation).",
          "N\u1EBFu xu\u1EA5t hi\u1EC7n c\u01A1n nh\u1ECBp nhanh v\xE0o l\u1EA1i nh\u0129 th\u1EA5t (AVRT) QRS h\u1EB9p: nghi\u1EC7m ph\xE1p k\xEDch th\xEDch ph\u1EBF v\u1ECB (Valsalva, xoa xoang c\u1EA3nh) ho\u1EB7c Adenosine TM nhanh.",
          "C\u1EA2NH B\xC1O QUAN TR\u1ECCNG: Ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh d\xF9ng Digoxin, Verapamil, Diltiazem n\u1EBFu c\xF3 Rung nh\u0129 k\xE8m WPW v\xEC c\xE1c thu\u1ED1c n\xE0y \u1EE9c ch\u1EBF n\xFAt AV l\xE0m d\u1ED3n xung \u0111\u1ED9ng qua b\xF3 Kent g\xE2y rung th\u1EA5t."
        ],
        confidence: { primary: 98.7, secondaryName: "WPW Type B", secondaryConfidence: 1 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 6: H\u1ED9i ch\u1EE9ng k\xEDch th\xEDch s\u1EDBm (Trang 30-31)",
        coreTakeaway: "Tam ch\u1EE9ng WPW: 1. PR ng\u1EAFn < 0.12s; 2. S\xF3ng Delta; 3. QRS d\xE3n r\u1ED9ng > 0.11s. Type A: Delta d\u01B0\u01A1ng \u1EDF V1 (c\u1EA7u Kent b\xEAn tr\xE1i); Type B: Delta \xE2m \u1EDF V1 (c\u1EA7u Kent b\xEAn ph\u1EA3i).",
        pitfallToAvoid: "S\xF3ng delta \xE2m \u1EDF chuy\u1EC3n \u0111\u1EA1o d\u01B0\u1EDBi ho\u1EB7c th\xE0nh tr\u01B0\u1EDBc d\u1EC5 b\u1ECB \u0111\u1ECDc nh\u1EA7m th\xE0nh s\xF3ng Q ho\u1EA1i t\u1EED c\u1EE7a nh\u1ED3i m\xE1u c\u01A1 tim (h\xECnh \u1EA3nh gi\u1EA3 nh\u1ED3i m\xE1u). Lu\xF4n ki\u1EC3m tra kho\u1EA3ng PR!"
      }
    },
    {
      id: "case-ventricular-tachycardia",
      category: "Arrhythmia",
      title: "C\u01A1n Nh\u1ECBp Nhanh Th\u1EA5t (Ventricular Tachycardia - VT)",
      subtitle: "\xC1p d\u1EE5ng Thu\u1EADt to\xE1n Brugada ph\xE2n bi\u1EC7t Nh\u1ECBp Nhanh Th\u1EA5t v\u1EDBi SVT QRS R\u1ED9ng",
      severity: "Kh\u1EA9n c\u1EA5p",
      patient: {
        name: "Ph\u1EA1m Qu\u1ED1c D\u0169ng",
        age: 67,
        gender: "Nam",
        chiefComplaint: "H\u1ED3i h\u1ED9p d\u1EEF d\u1ED9i, t\u1EE9c ng\u1EF1c, cho\xE1ng ng\u1EA5t, v\xE3 m\u1ED3 h\xF4i sau nh\u1ED3i m\xE1u c\u01A1 tim c\u0169",
        clinicalHistory: "B\u1EC7nh nh\xE2n c\xF3 ti\u1EC1n s\u1EED NMCT th\xE0nh tr\u01B0\u1EDBc r\u1ED9ng 3 n\u0103m tr\u01B0\u1EDBc, EF 35%. \u0110ang sinh ho\u1EA1t b\xECnh th\u01B0\u1EDDng th\xEC \u0111\u1ED9t ng\u1ED9t xu\u1EA5t hi\u1EC7n c\u01A1n tim \u0111\u1EADp nh\u01B0 tr\u1ED1ng tr\u1EADn, cho\xE1ng v\xE1ng mu\u1ED1n x\u1EC9u, v\xE3 m\u1ED3 h\xF4i \u0111\u1EA7m \u0111\xECa.",
        vitals: { bp: "90/55", hr: 175, spo2: 92, temp: 36.7 },
        labs: { k: 3.8, ca: 2.2, mg: 0.8, troponinI: "0.15 ng/mL" }
      },
      metrics: {
        heartRate: 175,
        rhythmType: "Nh\u1ECBp nhanh th\u1EA5t \u0111\u01A1n d\u1EA1ng (Monomorphic VT)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c v\xF4 \u0111\u1ECBnh (Northwest Axis)",
        alphaAngle: -150,
        prInterval: 0,
        qrsDuration: 165,
        // QRS rất rộng
        qt: 340,
        qtc: 540
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        for (const k of Object.keys(leads)) {
          leads[k].pWave = { amp: 0, dur: 0.01 };
          leads[k].qrsDuration = 0.165;
          leads[k].stSegment = { elevation: -0.15, slope: "downsloping" };
        }
        leads["V1"].rWave = { amp: 0.2, dur: 0.04 };
        leads["V1"].sWave = { amp: -2, dur: 0.12, wide: true };
        leads["V1"].tWave = { amp: 0.5, dur: 0.16, shape: "peaked" };
        leads["V2"].sWave = { amp: -2.4, dur: 0.12, wide: true };
        leads["V3"].sWave = { amp: -2.2, dur: 0.12, wide: true };
        leads["V4"].sWave = { amp: -2, dur: 0.12, wide: true };
        leads["V5"].sWave = { amp: -1.8, dur: 0.12, wide: true };
        leads["V6"].sWave = { amp: -1.6, dur: 0.12, wide: true };
        leads["I"].rWave = { amp: 0.2, dur: 0.03 };
        leads["I"].sWave = { amp: -1.4, dur: 0.12 };
        leads["aVR"].rWave = { amp: 1.5, dur: 0.08 };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "Nh\u1ECBp nhanh \u0111\u1EC1u 175 l/p, QRS d\xE3n r\u1ED9ng d\u1ECB d\u1EA1ng 165ms. Tr\u1EE5c \u0111i\u1EC7n tim v\xF4 \u0111\u1ECBnh (c\u1EF1c T\xE2y B\u1EAFc, R \u01B0u th\u1EBF \u1EDF aVR). C\xF3 d\u1EA5u hi\u1EC7u ph\xE2n ly nh\u0129 th\u1EA5t tho\xE1ng qua.",
        chestLeadsSummary: "\u0110\u1ED3ng d\u1EA1ng \xE2m (Negative Concordance) tr\xEAn to\xE0n b\u1ED9 chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim V1-V6 (kh\xF4ng c\xF3 d\u1EA1ng RS). D\u1EA5u hi\u1EC7u Brugada d\u01B0\u01A1ng t\xEDnh tuy\u1EC7t \u0111\u1ED1i."
      },
      diagnosis: {
        primary: "C\u01A1n nh\u1ECBp nhanh th\u1EA5t \u0111\u01A1n d\u1EA1ng (Monomorphic Ventricular Tachycardia) - Brugada (+)",
        culpritVesselOrCause: "V\xF2ng v\xE0o l\u1EA1i quanh m\xF4 s\u1EB9o nh\u1ED3i m\xE1u c\u01A1 tim c\u0169 th\u1EA5t tr\xE1i",
        differentials: [
          "Nh\u1ECBp nhanh tr\xEAn th\u1EA5t (SVT) k\xE8m d\u1EABn truy\u1EC1n l\u1EC7ch h\u01B0\u1EDBng ho\u1EB7c bloc nh\xE1nh c\xF3 s\u1EB5n",
          "Nh\u1ECBp nhanh qua \u0111\u01B0\u1EDDng d\u1EABn truy\u1EC1n ph\u1EE5 ng\u01B0\u1EE3c chi\u1EC1u (Antidromic AVRT)"
        ],
        keyFindings: [
          "Thu\u1EADt to\xE1n Brugada B\u01B0\u1EDBc 1: V\u1EAFng m\u1EB7t ho\xE0n to\xE0n d\u1EA1ng RS \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim V1-V6 (\u0110\u1ED9 \u0111\u1EB7c hi\u1EC7u 100% cho VT)",
          "\u0110\u1ED3ng d\u1EA1ng \xE2m (Negative concordance) t\u1EEB V1 \u0111\u1EBFn V6",
          "\u0110\u1ED9 r\u1ED9ng QRS > 0.16s (165ms)",
          "S\xF3ng R cao \u0111\u01A1n \u0111\u1ED9c \u1EDF aVR",
          "Tr\u1EE5c v\xF4 \u0111\u1ECBnh (-150\xB0)"
        ],
        clinicalNote: "Huy\u1EBFt \xE1p b\u1EC7nh nh\xE2n 90/55 mmHg, c\xF3 d\u1EA5u hi\u1EC7u gi\u1EA3m t\u01B0\u1EDBi m\xE1u n\xE3o (cho\xE1ng v\xE1ng). \u0110\xE2y l\xE0 t\xECnh hu\u1ED1ng \u0111e d\u1ECDa ng\u1EEBng tu\u1EA7n ho\xE0n chuy\u1EC3n sang rung th\u1EA5t!",
        treatment: [
          "N\u1EBFu c\xF3 r\u1ED1i lo\u1EA1n huy\u1EBFt \u0111\u1ED9ng (t\u1EE5t HA, \u0111au ng\u1EF1c, l\u01A1 m\u01A1, ph\xF9 ph\u1ED5i): S\u1ED0C \u0110I\u1EC6N \u0110\u1ED2NG B\u1ED8 NGAY L\u1EACP T\u1EE8C (Synchronized Cardioversion 100J - 200J).",
          "N\u1EBFu huy\u1EBFt \u0111\u1ED9ng c\xF2n t\u1EA1m \u1ED5n \u0111\u1ECBnh: Amiodarone 150mg ti\xEAm t\u0129nh m\u1EA1ch trong 10 ph\xFAt, sau \u0111\xF3 truy\u1EC1n duy tr\xEC 1mg/ph\xFAt trong 6 gi\u1EDD.",
          "Tr\xE1nh tuy\u1EC7t \u0111\u1ED1i Adenosine, Verapamil, Diltiazem v\xEC c\xF3 th\u1EC3 g\xE2y t\u1EE5t HA tr\u1EE5y m\u1EA1ch t\u1EED vong n\u1EBFu nh\u1EA7m VT th\xE0nh SVT.",
          "Sau khi c\u1EAFt c\u01A1n: \u0110\u1EB7t m\xE1y ph\xE1 rung t\u1EF1 \u0111\u1ED9ng c\u1EA5y \u0111\u01B0\u1EE3c (ICD) d\u1EF1 ph\xF2ng \u0111\u1ED9t t\u1EED do tim."
        ],
        confidence: { primary: 98.9, secondaryName: "SVT d\u1EABn truy\u1EC1n l\u1EC7ch h\u01B0\u1EDBng", secondaryConfidence: 1 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 10: R\u1ED1i lo\u1EA1n nh\u1ECBp nhanh QRS r\u1ED9ng & Ti\xEAu chu\u1EA9n Brugada (Trang 69-74, 90-93)",
        coreTakeaway: "4 b\u01B0\u1EDBc thu\u1EADt to\xE1n Brugada: 1. C\xF3 d\u1EA1ng RS \u1EDF V1-V6 kh\xF4ng? (Kh\xF4ng -> VT); 2. Kho\u1EA3ng RS > 100ms? (C\xF3 -> VT); 3. C\xF3 ph\xE2n ly nh\u0129 th\u1EA5t? (C\xF3 -> VT); 4. Ti\xEAu chu\u1EA9n h\xECnh th\xE1i h\u1ECDc \u1EDF V1 & V6.",
        pitfallToAvoid: "M\u1ECDi c\u01A1n nh\u1ECBp nhanh QRS r\u1ED9ng \u1EDF b\u1EC7nh nh\xE2n l\u1EDBn tu\u1ED5i c\xF3 ti\u1EC1n s\u1EED b\u1EC7nh tim \u0111\u1EC1u ph\u1EA3i coi l\xE0 Nh\u1ECBp nhanh th\u1EA5t cho \u0111\u1EBFn khi c\xF3 b\u1EB1ng ch\u1EE9ng ng\u01B0\u1EE3c l\u1EA1i."
      }
    },
    {
      id: "case-hyperkalemia",
      category: "Electrolyte",
      title: "C\u1EA5p C\u1EE9u T\u0103ng Kali M\xE1u N\u1EB7ng (Severe Hyperkalemia - K+ 7.8 mEq/L)",
      subtitle: "S\xF3ng T cao nh\u1ECDn \u0111\u1ED1i x\u1EE9ng h\u1EB9p, m\u1EA5t s\xF3ng P, QRS d\xE3n r\u1ED9ng h\xECnh sin",
      severity: "Nguy k\u1ECBch",
      patient: {
        name: "Nguy\u1EC5n V\u0103n Ch\xE1nh",
        age: 55,
        gender: "Nam",
        chiefComplaint: "Y\u1EBFu li\u1EC7t t\u1EE9 chi t\u0103ng d\u1EA7n, kh\xF3 th\u1EDF, n\xF3i kh\xF3, bu\u1ED3n n\xF4n",
        clinicalHistory: "B\u1EC7nh nh\xE2n c\xF3 ti\u1EC1n s\u1EED b\u1EC7nh th\u1EADn m\u1EA1n giai \u0111o\u1EA1n cu\u1ED1i (CKD stage 5) \u0111ang l\u1ECDc m\xE1u chu k\u1EF3, b\u1ECF l\u1EE1 2 bu\u1ED5i ch\u1EA1y th\u1EADn do b\u1EADn vi\u1EC7c gia \u0111\xECnh. Xu\u1EA5t hi\u1EC7n c\u1EA3m gi\xE1c t\xEA b\xEC quanh mi\u1EC7ng r\u1ED3i y\u1EBFu d\u1EA7n hai ch\xE2n v\xE0 hai tay.",
        vitals: { bp: "100/60", hr: 48, spo2: 93, temp: 36.4 },
        labs: { k: 7.8, ca: 1.9, mg: 1.2, troponinI: "0.04 ng/mL", bnp: "450 pg/mL" }
      },
      metrics: {
        heartRate: 48,
        rhythmType: "Nh\u1ECBp xoang - th\u1EA5t ch\u1EADm do t\u0103ng Kali m\xE1u (Sinoventricular rhythm)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch tr\xE1i",
        alphaAngle: -40,
        prInterval: 240,
        qrsDuration: 145,
        // QRS dãn rộng nguy hiểm
        qt: 450,
        qtc: 400
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        for (const k of Object.keys(leads)) {
          leads[k].pWave = { amp: 0.02, dur: 0.06, shape: "flat" };
          leads[k].prSegment = { dur: 0.12 };
          leads[k].qrsDuration = 0.145;
          leads[k].rWave = { amp: leads[k].rWave.amp * 0.8, dur: 0.08, notched: true };
          leads[k].sWave = { amp: leads[k].sWave.amp * 1.4, dur: 0.06 };
          leads[k].tWave = { amp: 1.1, dur: 0.14, shape: "peaked" };
        }
        leads["V2"].tWave = { amp: 1.8, dur: 0.14, shape: "peaked" };
        leads["V3"].tWave = { amp: 2, dur: 0.14, shape: "peaked" };
        leads["V4"].tWave = { amp: 1.6, dur: 0.14, shape: "peaked" };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "S\xF3ng P x\u1EB9p g\u1EA7n nh\u01B0 bi\u1EBFn m\u1EA5t ho\xE0n to\xE0n. Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng d\u1ECB d\u1EA1ng 145ms. S\xF3ng T cao nh\u1ECDn \u0111\u1ED1i x\u1EE9ng \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o chi.",
        chestLeadsSummary: "S\xF3ng T kh\u1ED5ng l\u1ED3, cao nh\u1ECDn, \u0111\xE1y h\u1EB9p h\xECnh l\u1EC1u (tented / peaked T waves) r\xF5 nh\u1EA5t \u1EDF V2-V4 (\u0111\u1EA1t 2.0mV). QRS h\xF2a l\u1EABn v\xE0o s\xF3ng T t\u1EA1o xu h\u01B0\u1EDBng s\xF3ng h\xECnh sin (Sine wave pattern) \u0111e d\u1ECDa ng\u1EEBng tim."
      },
      diagnosis: {
        primary: "R\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i: T\u0103ng Kali m\xE1u n\u1EB7ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng (Severe Hyperkalemia)",
        culpritVesselOrCause: "Suy gi\u1EA3m b\xE0i ti\u1EBFt kali qua th\u1EADn \u1EDF b\u1EC7nh nh\xE2n suy th\u1EADn m\u1EA1n b\u1ECF ch\u1EA1y th\u1EADn chu k\u1EF3",
        differentials: [
          "Nh\u1ED3i m\xE1u c\u01A1 tim t\u1ED1i c\u1EA5p v\u1EDBi s\xF3ng T kh\u1ED5ng l\u1ED3 (lo\u1EA1i tr\u1EEB v\xEC T trong NMCT c\xF3 \u0111\xE1y r\u1ED9ng, kh\xF4ng \u0111\u1ED1i x\u1EE9ng v\xE0 c\xF3 ST ch\xEAnh l\u1ED3i khu tr\xFA theo v\xF9ng \u0111\u1ED9ng m\u1EA1ch)",
          "Bloc nh\xE1nh tr\xE1i (LBBB)",
          "T\xE1i c\u1EF1c s\u1EDBm l\xE0nh t\xEDnh"
        ],
        keyFindings: [
          "S\xF3ng T cao, nh\u1ECDn ho\u1EAFt, \u0111\u1ED1i x\u1EE9ng, \u0111\xE1y h\u1EB9p (peaked T) tr\xEAn kh\u1EAFp c\xE1c chuy\u1EC3n \u0111\u1EA1o, r\xF5 nh\u1EA5t \u1EDF V2-V4",
          "S\xF3ng P d\u1EB9t g\u1EA7n nh\u01B0 bi\u1EBFn m\u1EA5t (t\xEA li\u1EC7t c\u01A1 t\xE2m nh\u0129)",
          "Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng >0.12s",
          "Ti\u1EBFn tri\u1EC3n d\u1EA1ng s\xF3ng h\xECnh sin b\xE1o tr\u01B0\u1EDBc rung th\u1EA5t ho\u1EB7c v\xF4 t\xE2m thu"
        ],
        clinicalNote: "Kali 7.8 mEq/L l\xE0 c\u1EA5p c\u1EE9u kh\u1EA9n c\u1EA5p b\u1EADc m\u1ED9t trong y khoa! B\u1EC7nh nh\xE2n c\xF3 th\u1EC3 ng\u1EEBng tim \u0111\u1ED9t ng\u1ED9t trong v\xE0i ph\xFAt n\u1EBFu kh\xF4ng \u1ED5n \u0111\u1ECBnh m\xE0ng t\u1EBF b\xE0o c\u01A1 tim.",
        treatment: [
          "B\u01B0\u1EDBc 1 (\u1ED4n \u0111\u1ECBnh m\xE0ng c\u01A1 tim ngay): Calcium Gluconate 10% 10-20ml ho\u1EB7c Calcium Chloride ti\xEAm TM ch\u1EADm trong 3-5 ph\xFAt (t\xE1c d\u1EE5ng b\u1EA3o v\u1EC7 tim trong 30-60 ph\xFAt).",
          "B\u01B0\u1EDBc 2 (Chuy\u1EC3n d\u1ECBch Kali v\xE0o n\u1ED9i b\xE0o): Truy\u1EC1n dung d\u1ECBch Glucose 20% + Insulin Regular 10 UI t\u0129nh m\u1EA1ch; Kh\xED dung Salbutamol 10-20mg; Natri Bicarbonate 8.4% n\u1EBFu c\xF3 toan m\xE1u.",
          "B\u01B0\u1EDBc 3 (Th\u1EA3i tr\u1EEB Kali kh\u1ECFi c\u01A1 th\u1EC3): Thu\u1ED1c l\u1EE3i ti\u1EC3u quai Furosemide li\u1EC1u cao (n\u1EBFu th\u1EADn c\xF2n b\xE0i ni\u1EC7u), Resonium ho\u1EB7c Lokelma qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a.",
          "B\u01B0\u1EDBc 4: Ch\u1EC9 \u0111\u1ECBnh CH\u1EA0Y TH\u1EACN NH\xC2N T\u1EA0O C\u1EA4P C\u1EE8U (Emergency Hemodialysis) \u0111\u1EC3 l\u1ECDc b\u1ECF kali."
        ],
        confidence: { primary: 99.6, secondaryName: "NMCT t\u1ED1i c\u1EA5p", secondaryConfidence: 0.3 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 12: R\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i - T\u0103ng kali m\xE1u (Trang 89-90, 94)",
        coreTakeaway: "C\xE1c giai \u0111o\u1EA1n bi\u1EBFn thi\xEAn ECG khi Kali t\u0103ng: 1. K+ 5.5-6.5: T cao nh\u1ECDn \u0111\u1ED1i x\u1EE9ng h\u1EB9p; 2. K+ 6.5-7.0: PR k\xE9o d\xE0i, P d\u1EB9t, ST ch\xEAnh xu\u1ED1ng; 3. K+ 7.0-9.0: M\u1EA5t s\xF3ng P, QRS d\xE3n r\u1ED9ng; 4. K+ >9.0: S\xF3ng h\xECnh sin -> Ng\u1EEBng tim.",
        pitfallToAvoid: "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng \u0111\u1EE3i x\xE9t nghi\u1EC7m m\xE1u v\u1EC1 m\u1EDBi x\u1EED tr\xED n\u1EBFu ECG \u0111\xE3 c\xF3 s\xF3ng T nh\u1ECDn ho\u1EAFt k\xE8m QRS d\xE3n tr\xEAn n\u1EC1n b\u1EC7nh nh\xE2n suy th\u1EADn. Ti\xEAm Canxi ngay \u0111\u1EC3 b\u1EA3o v\u1EC7 tim!"
      }
    },
    {
      id: "case-acute-pericarditis",
      category: "Ischemia",
      title: "Vi\xEAm M\xE0ng Ngo\xE0i Tim C\u1EA5p (Acute Pericarditis Giai \u0110o\u1EA1n 1)",
      subtitle: "ST ch\xEAnh l\xEAn l\xF5m lan t\u1ECFa k\xE8m \u0111o\u1EA1n PR ch\xEAnh xu\u1ED1ng - Kh\xF4ng c\xF3 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "V\u0169 H\u1EA3i \u0110\u0103ng",
        age: 32,
        gender: "Nam",
        chiefComplaint: "\u0110au ng\u1EF1c nh\xF3i sau x\u01B0\u01A1ng \u1EE9c t\u0103ng khi h\xEDt s\xE2u, gi\u1EA3m \u0111au r\xF5 r\u1EC7t khi ng\u1ED3i c\xFAi ng\u01B0\u1EDDi ra tr\u01B0\u1EDBc",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam tr\u1EBB tu\u1ED5i, c\xF3 \u0111\u1EE3t s\u1ED1t nh\u1EB9 v\xE0 vi\xEAm \u0111\u01B0\u1EDDng h\xF4 h\u1EA5p tr\xEAn 1 tu\u1EA7n tr\u01B0\u1EDBc. Xu\u1EA5t hi\u1EC7n \u0111au nh\xF3i ng\u1EF1c sau x\u01B0\u01A1ng \u1EE9c 2 ng\xE0y nay, \u0111au d\u1EEF d\u1ED9i khi n\u1EB1m ng\u1EEDa ho\u1EB7c h\xEDt s\xE2u, khi ng\u1ED3i c\xFAi g\u1EADp ng\u01B0\u1EDDi v\u1EC1 ph\xEDa tr\u01B0\u1EDBc th\xEC th\u1EA5y d\u1EC5 ch\u1ECBu h\u01A1n.",
        vitals: { bp: "125/80", hr: 92, spo2: 98, temp: 37.8 },
        labs: { k: 4.2, ca: 2.3, mg: 0.9, troponinI: "0.08 ng/mL (t\u0103ng nh\u1EB9)", ckmb: "18 U/L" }
      },
      metrics: {
        heartRate: 92,
        rhythmType: "Nh\u1ECBp xoang \u0111\u1EC1u",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 50,
        prInterval: 170,
        qrsDuration: 85,
        qt: 370,
        qtc: 450
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const affectedLeads = ["I", "II", "III", "aVF", "V2", "V3", "V4", "V5", "V6"];
        for (const l of affectedLeads) {
          leads[l].prSegment = { dur: 0.07, deviation: -0.08 };
          leads[l].stSegment = { elevation: 0.22, slope: "upsloping" };
          leads[l].tWave = { amp: 0.4, dur: 0.16, shape: "normal" };
        }
        leads["aVR"].prSegment = { dur: 0.07, deviation: 0.08 };
        leads["aVR"].stSegment = { elevation: -0.15, slope: "downsloping" };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "ST ch\xEAnh l\xEAn l\xF5m (h\xECnh l\xF2ng ch\u1EA3o / \u0111\xE1y ch\xE9n cong l\xEAn) lan t\u1ECFa \u1EDF DI, DII, DIII, aVF. \u0110o\u1EA1n PR ch\xEAnh xu\u1ED1ng s\xE2u \u1EDF DII. Chuy\u1EC3n \u0111\u1EA1o aVR c\xF3 h\xECnh \u1EA3nh \u0111\u1ED1i ngh\u1ECBch duy nh\u1EA5t: PR ch\xEAnh l\xEAn v\xE0 ST ch\xEAnh xu\u1ED1ng.",
        chestLeadsSummary: "ST ch\xEAnh l\xEAn d\u1EA1ng l\xF5m lan t\u1ECFa kh\u1EAFp c\xE1c chuy\u1EC3n \u0111\u1EA1o V2-V6 (kh\xF4ng khu tr\xFA theo v\xF9ng c\u1EA5p m\xE1u \u0111\u1ED9ng m\u1EA1ch v\xE0nh). Kh\xF4ng c\xF3 s\xF3ng Q ho\u1EA1i t\u1EED."
      },
      diagnosis: {
        primary: "Vi\xEAm m\xE0ng ngo\xE0i tim c\u1EA5p t\xEDnh giai \u0111o\u1EA1n I (Acute Pericarditis Stage 1)",
        culpritVesselOrCause: "Ph\u1EA3n \u1EE9ng vi\xEAm m\xE0ng ngo\xE0i tim do virus (Coxsackie, Echovirus, Adenovirus)",
        differentials: [
          "Nh\u1ED3i m\xE1u c\u01A1 tim c\u1EA5p (STEMI) - lo\u1EA1i tr\u1EEB v\xEC \u1EDF \u0111\xE2y ST ch\xEAnh l\xF5m lan t\u1ECFa kh\xF4ng theo v\xF9ng \u0111\u1ED9ng m\u1EA1ch v\xE0nh, c\xF3 PR ch\xEAnh xu\u1ED1ng v\xE0 kh\xF4ng c\xF3 ST ch\xEAnh xu\u1ED1ng \u0111\u1ED1i x\u1EE9ng soi g\u01B0\u01A1ng",
          "T\xE1i c\u1EF1c s\u1EDBm l\xE0nh t\xEDnh (BER) - ph\xE2n bi\u1EC7t b\u1EB1ng t\u1EF7 l\u1EC7 ST/T \u1EDF V6 > 0.25 v\xE0 c\xF3 PR ch\xEAnh xu\u1ED1ng",
          "B\xF3c t\xE1ch \u0111\u1ED9ng m\u1EA1ch ch\u1EE7 ng\u1EF1c"
        ],
        keyFindings: [
          "ST ch\xEAnh l\xEAn d\u1EA1ng l\xF5m (concave upward / saddle-shaped) lan t\u1ECFa \u1EDF h\u1EA7u h\u1EBFt c\xE1c chuy\u1EC3n \u0111\u1EA1o",
          "\u0110o\u1EA1n PR ch\xEAnh xu\u1ED1ng d\u01B0\u1EDBi \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n (\u0111\u1EB7c bi\u1EC7t r\xF5 \u1EDF DII, \u0111\u1ED9 nh\u1EA1y 88%)",
          "Chuy\u1EC3n \u0111\u1EA1o aVR c\xF3 ST ch\xEAnh xu\u1ED1ng v\xE0 PR ch\xEAnh l\xEAn",
          "V\u1EAFng m\u1EB7t ho\xE0n to\xE0n h\xECnh \u1EA3nh soi g\u01B0\u01A1ng \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o \u0111\u1ED1i di\u1EC7n"
        ],
        clinicalNote: "\u0110\u1EB7c \u0111i\u1EC3m \u0111au ng\u1EF1c c\u01A1 h\u1ECDc thay \u0111\u1ED5i theo t\u01B0 th\u1EBF (t\u0103ng khi n\u1EB1m, gi\u1EA3m khi ng\u1ED3i c\xFAi ra tr\u01B0\u1EDBc) k\u1EBFt h\u1EE3p ti\u1EBFng c\u1ECD m\xE0ng tim tr\xEAn l\xE2m s\xE0ng l\xE0 ch\xECa kh\xF3a ch\u1EA9n \u0111o\xE1n.",
        treatment: [
          "Ngh\u1EC9 ng\u01A1i t\u1EA1i gi\u01B0\u1EDDng, h\u1EA1n ch\u1EBF v\u1EADn \u0111\u1ED9ng th\u1EC3 l\u1EF1c n\u1EB7ng.",
          "Kh\xE1ng vi\xEAm kh\xF4ng steroid (NSAIDs) li\u1EC1u cao: Ibuprofen 600mg x 3 l\u1EA7n/ng\xE0y ho\u1EB7c Aspirin 750-1000mg x 3 l\u1EA7n/ng\xE0y trong 1-2 tu\u1EA7n.",
          "Ph\u1ED1i h\u1EE3p Colchicine 0.5mg x 1-2 l\u1EA7n/ng\xE0y trong 3 th\xE1ng \u0111\u1EC3 gi\u1EA3m t\u1EF7 l\u1EC7 t\xE1i ph\xE1t.",
          "Tr\xE1nh d\xF9ng Corticosteroid trong \u0111\u1EE3t \u0111\u1EA7u tr\u1EEB khi c\xF3 ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh v\u1EDBi NSAIDs ho\u1EB7c vi\xEAm do b\u1EC7nh t\u1EF1 mi\u1EC5n.",
          "Si\xEAu \xE2m tim theo d\xF5i l\u01B0\u1EE3ng d\u1ECBch m\xE0ng ngo\xE0i tim tr\xE1nh bi\u1EBFn ch\u1EE9ng ch\xE8n \xE9p tim c\u1EA5p (Cardiac Tamponade)."
        ],
        confidence: { primary: 97.8, secondaryName: "T\xE1i c\u1EF1c s\u1EDBm l\xE0nh t\xEDnh", secondaryConfidence: 1.8 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 12: Vi\xEAm m\xE0ng ngo\xE0i tim (Trang 98-99, 119)",
        coreTakeaway: "Vi\xEAm m\xE0ng ngo\xE0i tim Giai \u0111o\u1EA1n I: ST ch\xEAnh l\xEAn l\xF5m lan t\u1ECFa + PR ch\xEAnh xu\u1ED1ng (DII, V2-V6) v\xE0 PR ch\xEAnh l\xEAn \u1EDF aVR. T\u1EF7 l\u1EC7 ST/T > 0.25 \u1EDF V6 g\u1EE3i \xFD vi\xEAm m\xE0ng tim, < 0.25 l\xE0 t\xE1i c\u1EF1c s\u1EDBm.",
        pitfallToAvoid: "\u0110\u1EEBng nh\u1EA7m ST ch\xEAnh l\xEAn c\u1EE7a vi\xEAm m\xE0ng ngo\xE0i tim v\u1EDBi STEMI m\xE0 cho thu\u1ED1c ti\xEAu s\u1EE3i huy\u1EBFt (Thrombolysis) - c\u1EF1c k\u1EF3 nguy hi\u1EC3m c\xF3 th\u1EC3 g\xE2y xu\u1EA5t huy\u1EBFt tr\xE0n m\xE1u khoang m\xE0ng tim!"
      }
    },
    {
      id: "case-pulmonary-embolism",
      category: "Conduction",
      title: "Thuy\xEAn T\u1EAFc Ph\u1ED5i C\u1EA5p (Acute Pulmonary Embolism - PE)",
      subtitle: "D\u1EA5u hi\u1EC7u kinh \u0111i\u1EC3n McGinn-White S1Q3T3 - T\u0103ng \xE1p \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i c\u1EA5p t\xEDnh",
      severity: "Kh\u1EA9n c\u1EA5p",
      patient: {
        name: "Nguy\u1EC5n V\u0103n H\u01B0ng",
        age: 49,
        gender: "Nam",
        chiefComplaint: "Kh\xF3 th\u1EDF d\u1EEF d\u1ED9i \u0111\u1ED9t ng\u1ED9t, \u0111au ng\u1EF1c m\xE0ng ph\u1ED5i b\xEAn ph\u1EA3i, ho ra \xEDt m\xE1u",
        clinicalHistory: "B\u1EC7nh nh\xE2n v\u1EEBa tr\u1EA3i qua ph\u1EABu thu\u1EADt thay kh\u1EDBp h\xE1ng 10 ng\xE0y tr\u01B0\u1EDBc, n\u1EB1m b\u1EA5t \u0111\u1ED9ng nhi\u1EC1u t\u1EA1i gi\u01B0\u1EDDng. S\xE1ng nay khi c\u1ED1 g\u1EAFng \u0111\u1EE9ng d\u1EADy \u0111i v\u1EC7 sinh th\xEC \u0111\u1ED9t ng\u1ED9t kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, th\u1EDF nhanh n\xF4ng, v\xE3 m\u1ED3 h\xF4i, t\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i r\xF5.",
        vitals: { bp: "95/60", hr: 122, spo2: 87, temp: 37.2 },
        labs: { k: 4, ca: 2.2, mg: 0.9, troponinI: "0.12 ng/mL (t\u0103ng nh\u1EB9)", bnp: "480 pg/mL" }
      },
      metrics: {
        heartRate: 122,
        rhythmType: "Nh\u1ECBp nhanh xoang",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch ph\u1EA3i",
        alphaAngle: 110,
        prInterval: 140,
        qrsDuration: 105,
        qt: 330,
        qtc: 470
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        leads["I"].sWave = { amp: -0.85, dur: 0.04, wide: true };
        leads["III"].qWave = { amp: -0.35, dur: 0.03 };
        leads["III"].rWave = { amp: 0.5, dur: 0.03 };
        leads["III"].tWave = { amp: -0.4, dur: 0.16, shape: "inverted" };
        leads["V1"].tWave = { amp: -0.35, dur: 0.16, shape: "inverted" };
        leads["V2"].tWave = { amp: -0.45, dur: 0.16, shape: "inverted" };
        leads["V3"].tWave = { amp: -0.35, dur: 0.16, shape: "inverted" };
        leads["V4"].tWave = { amp: -0.2, dur: 0.16, shape: "inverted" };
        leads["V1"].rPrimeWave = { amp: 0.4, dur: 0.04 };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "Nh\u1ECBp nhanh xoang 122 l/p. D\u1EA5u hi\u1EC7u kinh \u0111i\u1EC3n S1Q3T3: S\xF3ng S s\xE2u \u1EDF DI, s\xF3ng Q xu\u1EA5t hi\u1EC7n \u1EDF DIII k\xE8m s\xF3ng T \u0111\u1EA3o ng\u01B0\u1EE3c \u1EDF DIII. Tr\u1EE5c QRS l\u1EC7ch ph\u1EA3i (+110\xB0).",
        chestLeadsSummary: "D\u1EA5u hi\u1EC7u t\u0103ng g\xE1nh th\u1EA5t ph\u1EA3i c\u1EA5p (RV Strain): S\xF3ng T \xE2m \u0111\u1ED1i x\u1EE9ng s\xE2u \u1EDF V1-V4. D\u1EA1ng bloc nh\xE1nh ph\u1EA3i kh\xF4ng ho\xE0n to\xE0n (rSR' \u1EDF V1). V\xF9ng chuy\u1EC3n ti\u1EBFp xoay sang tr\xE1i."
      },
      diagnosis: {
        primary: "Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i c\u1EA5p t\xEDnh m\u1EE9c \u0111\u1ED9 n\u1EB7ng (Acute Massive/Submassive Pulmonary Embolism)",
        culpritVesselOrCause: "C\u1EE5c huy\u1EBFt kh\u1ED1i t\u0129nh m\u1EA1ch s\xE2u chi d\u01B0\u1EDBi (DVT) di chuy\u1EC3n g\xE2y t\u1EAFc ngh\u1EBDn th\xE2n/nh\xE1nh \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i",
        differentials: [
          "H\u1ED9i ch\u1EE9ng v\xE0nh c\u1EA5p / NMCT th\xE0nh d\u01B0\u1EDBi (ST \u1EDF DIII c\xF3 Q v\xE0 T \xE2m nh\u01B0ng DII, aVF kh\xF4ng c\xF3 ST ch\xEAnh l\xEAn \u0111i\u1EC3n h\xECnh)",
          "Tr\xE0n kh\xED m\xE0ng ph\u1ED5i t\u1EF1 ph\xE1t",
          "\u0110\u1EE3t c\u1EA5p COPD / T\xE2m ph\u1EBF c\u1EA5p"
        ],
        keyFindings: [
          "Nh\u1ECBp nhanh xoang (d\u1EA5u hi\u1EC7u ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a PE)",
          "D\u1EA5u hi\u1EC7u S1Q3T3 (McGinn-White sign)",
          "S\xF3ng T \xE2m \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim ph\u1EA3i V1-V4 (RV Strain)",
          "Tr\u1EE5c \u0111i\u1EC7n tim l\u1EC7ch ph\u1EA3i v\xE0 xu\u1EA5t hi\u1EC7n bloc nh\xE1nh ph\u1EA3i m\u1EDBi xu\u1EA5t hi\u1EC7n"
        ],
        clinicalNote: "Thuy\xEAn t\u1EAFc ph\u1ED5i l\xE0 b\u1EC7nh c\u1EA3nh c\u1EA5p c\u1EE9u c\xF3 t\u1EF7 l\u1EC7 t\u1EED vong cao. Ch\u1EE5p c\u1EAFt l\u1EDBp vi t\xEDnh m\u1EA1ch m\xE1u ph\u1ED5i (CTPA - CT Pulmonary Angiography) l\xE0 ti\xEAu chu\u1EA9n v\xE0ng ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh.",
        treatment: [
          "Th\u1EDF oxy l\u01B0u l\u01B0\u1EE3ng cao qua mask, s\u1EB5n s\xE0ng h\u1ED7 tr\u1EE3 h\xF4 h\u1EA5p.",
          "Kh\xE1ng \u0111\xF4ng l\u1EADp t\u1EE9c: Enoxaparin (LMWH) 1mg/kg m\u1ED7i 12 gi\u1EDD ho\u1EB7c Heparin kh\xF4ng ph\xE2n \u0111o\u1EA1n truy\u1EC1n t\u0129nh m\u1EA1ch.",
          "N\u1EBFu c\xF3 t\u1EE5t huy\u1EBFt \xE1p (PE nguy c\u01A1 cao/s\u1ED1c): Ch\u1EC9 \u0111\u1ECBnh ti\xEAu s\u1EE3i huy\u1EBFt to\xE0n th\xE2n (Alteplase 100mg truy\u1EC1n trong 2 gi\u1EDD) ho\u1EB7c can thi\u1EC7p l\u1EA5y huy\u1EBFt kh\u1ED1i qua catheter.",
          "H\u1ED3i s\u1EE9c d\u1ECBch th\u1EADn tr\u1ECDng, d\xF9ng thu\u1ED1c v\u1EADn m\u1EA1ch Noradrenaline n\u1EBFu t\u1EE5t HA."
        ],
        confidence: { primary: 96.5, secondaryName: "T\xE2m ph\u1EBF c\u1EA5p / RV Strain", secondaryConfidence: 2.8 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 12: B\u1EC7nh \u1EDF ph\u1ED5i - Thuy\xEAn t\u1EAFc ph\u1ED5i (Trang 106, 126)",
        coreTakeaway: "D\u1EA5u hi\u1EC7u S1Q3T3: S\xF3ng S s\xE2u \u1EDF DI, s\xF3ng Q \u1EDF DIII v\xE0 s\xF3ng T \xE2m \u1EDF DIII. T \xE2m \u1EDF V1-V4 ph\u1EA3n \xE1nh bu\u1ED3ng tim ph\u1EA3i b\u1ECB d\xE3n v\xE0 t\u0103ng \xE1p l\u1EF1c c\u1EA5p t\xEDnh.",
        pitfallToAvoid: "Kho\u1EA3ng 20% b\u1EC7nh nh\xE2n thuy\xEAn t\u1EAFc ph\u1ED5i c\xF3 ECG ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng. ECG b\xECnh th\u01B0\u1EDDng kh\xF4ng bao gi\u1EDD lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c thuy\xEAn t\u1EAFc ph\u1ED5i n\u1EBFu l\xE2m s\xE0ng nghi ng\u1EDD cao."
      }
    },
    {
      id: "case-digoxin-toxicity",
      category: "Electrolyte",
      title: "Ng\u1ED9 \u0110\u1ED9c Thu\u1ED1c Tr\u1EE3 Tim Digoxin (Digoxin Toxicity)",
      subtitle: "\u0110o\u1EA1n ST ch\xEAnh xu\u1ED1ng h\xECnh \u0111\xE1y ch\xE9n Salvador Dali, QT ng\u1EAFn, ngo\u1EA1i t\xE2m thu th\u1EA5t nh\u1ECBp \u0111\xF4i",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "B\xF9i Th\u1ECB S\xE1u",
        age: 74,
        gender: "N\u1EEF",
        chiefComplaint: "Bu\u1ED3n n\xF4n, ch\xE1n \u0103n, nh\xECn v\u1EADt th\u1EA5y c\xF3 qu\u1EA7ng s\xE1ng v\xE0ng xanh, m\u1EC7t l\u1EA3",
        clinicalHistory: "B\u1EC7nh nh\xE2n n\u1EEF 74 tu\u1ED5i, suy tim m\u1EA1n v\xE0 rung nh\u0129 \u0111ang \u0111i\u1EC1u tr\u1ECB duy tr\xEC Digoxin 0.25mg/ng\xE0y k\xE8m Furosemide. 3 ng\xE0y nay b\u1EC7nh nh\xE2n \u0103n u\u1ED1ng k\xE9m, m\u1EC7t m\u1ECFi, m\u1EAFt nh\xECn th\u1EA5y h\xE0o quang m\xE0u v\xE0ng (xanthopsia), n\xF4n \xF3i nhi\u1EC1u l\u1EA7n.",
        vitals: { bp: "110/65", hr: 56, spo2: 97, temp: 36.5 },
        labs: { k: 3.1, ca: 2.4, mg: 0.75, troponinI: "0.01 ng/mL", bnp: "510 pg/mL" }
      },
      metrics: {
        heartRate: 56,
        rhythmType: "Rung nh\u0129 \u0111\xE1p \u1EE9ng th\u1EA5t ch\u1EADm k\xE8m ngo\u1EA1i t\xE2m thu th\u1EA5t (PVC) nh\u1ECBp \u0111\xF4i",
        regularity: "Kh\xF4ng \u0111\u1EC1u c\xF3 chu k\u1EF3",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 45,
        prInterval: 0,
        qrsDuration: 90,
        qt: 320,
        qtc: 340
        // QT ngắn
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const leadsScooped = ["I", "II", "aVF", "V4", "V5", "V6"];
        for (const l of leadsScooped) {
          leads[l].stSegment = { elevation: -0.22, slope: "scooped" };
          leads[l].tWave = { amp: 0.15, dur: 0.12, shape: "biphasic" };
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "\u0110o\u1EA1n ST ch\xEAnh xu\u1ED1ng l\xF5m cong m\u1EC1m m\u1EA1i h\xECnh \u0111\xE1y ch\xE9n hay h\xECnh ria m\xE9p c\u1EE7a danh h\u1ECDa Salvador Dali (scooped ST depression) \u1EDF DII, aVF. Kho\u1EA3ng QT ng\u1EAFn.",
        chestLeadsSummary: "H\xECnh \u1EA3nh \u0111\xE1y ch\xE9n r\u1EA5t r\xF5 \u1EDF V4-V6. Xu\u1EA5t hi\u1EC7n ngo\u1EA1i t\xE2m thu th\u1EA5t nh\u1ECBp \u0111\xF4i (Ventricular Bigeminy) xen k\u1EBD nh\u1ECBp c\u01A1 b\u1EA3n."
      },
      diagnosis: {
        primary: "Ng\u1ED9 \u0111\u1ED9c thu\u1ED1c tim m\u1EA1ch Digoxin tr\xEAn n\u1EC1n h\u1EA1 Kali m\xE1u (Digoxin Toxicity with Hypokalemia)",
        culpritVesselOrCause: "Qu\xE1 li\u1EC1u t\xEDch l\u0169y digoxin k\u1EBFt h\u1EE3p gi\u1EA3m thanh th\u1EA3i th\u1EADn v\xE0 h\u1EA1 Kali m\xE1u do thu\u1ED1c l\u1EE3i ti\u1EC3u Furosemide",
        differentials: [
          "Thi\u1EBFu m\xE1u c\u01A1 tim d\u01B0\u1EDBi n\u1ED9i t\xE2m m\u1EA1c (lo\u1EA1i tr\u1EEB v\xEC ST trong thi\u1EBFu m\xE1u th\u01B0\u1EDDng ch\xEAnh xu\u1ED1ng d\u1ED1c xu\u1ED1ng ho\u1EB7c n\u1EB1m ngang, kh\xF4ng c\xF3 h\xECnh \u0111\xE1y ch\xE9n cong m\u1EC1m)",
          "H\u1EA1 kali m\xE1u \u0111\u01A1n thu\u1EA7n (lo\u1EA1i tr\u1EEB v\xEC ng\u1ED9 \u0111\u1ED9c digoxin c\xF3 QT ng\u1EAFn, h\u1EA1 kali c\xF3 QT/QU k\xE9o d\xE0i)"
        ],
        keyFindings: [
          "ST ch\xEAnh xu\u1ED1ng h\xECnh \u0111\xE1y ch\xE9n kinh \u0111i\u1EC3n (Salvador Dali's mustache) \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o c\xF3 R cao (DII, V4-V6)",
          "R\xFAt ng\u1EAFn kho\u1EA3ng QT",
          "R\u1ED1i lo\u1EA1n nh\u1ECBp ph\u1ED1i h\u1EE3p: Nh\u1ECBp ch\u1EADm k\xE8m ngo\u1EA1i t\xE2m thu th\u1EA5t nh\u1ECBp \u0111\xF4i (Ventricular Bigeminy)",
          "S\xF3ng T hai pha ho\u1EB7c ph\u1EB3ng"
        ],
        clinicalNote: "H\u1EA1 Kali m\xE1u l\xE0m t\u0103ng g\u1EAFn k\u1EBFt c\u1EE7a Digoxin v\xE0o th\u1EE5 th\u1EC3 Na+/K+-ATPase c\u1EE7a c\u01A1 tim, bi\u1EBFn li\u1EC1u \u0111i\u1EC1u tr\u1ECB th\xF4ng th\u01B0\u1EDDng th\xE0nh li\u1EC1u g\xE2y \u0111\u1ED9c ch\u1EBFt ng\u01B0\u1EDDi!",
        treatment: [
          "Ng\u1EEBng ngay l\u1EADp t\u1EE9c Digoxin v\xE0 thu\u1ED1c l\u1EE3i ti\u1EC3u l\xE0m m\u1EA5t kali.",
          "B\xF9 Kali t\xEDch c\u1EF1c qua \u0111\u01B0\u1EDDng u\u1ED1ng ho\u1EB7c truy\u1EC1n t\u0129nh m\u1EA1ch \u0111\u1EC3 duy tr\xEC Kali m\xE1u t\u1EEB 4.0 - 4.5 mEq/L.",
          "B\xF9 Magne sulfate t\u0129nh m\u1EA1ch n\u1EBFu c\xF3 h\u1EA1 Magne m\xE1u.",
          "N\u1EBFu c\xF3 r\u1ED1i lo\u1EA1n nh\u1ECBp th\u1EA5t \u0111e d\u1ECDa t\xEDnh m\u1EA1ng ho\u1EB7c t\u0103ng Kali c\u1EA5p t\xEDnh: d\xF9ng kh\xE1ng th\u1EC3 \u0111\u1EB7c hi\u1EC7u kh\xE1ng Digoxin (Digoxin-specific Fab fragments / DigiFab).",
          "Tr\xE1nh s\u1ED1c \u0111i\u1EC7n chuy\u1EC3n nh\u1ECBp tr\u1EEB khi c\u1EF1c k\u1EF3 b\u1EAFt bu\u1ED9c v\xEC d\u1EC5 g\xE2y rung th\u1EA5t tr\u01A1."
        ],
        confidence: { primary: 98.1, secondaryName: "Thi\u1EBFu m\xE1u c\u01A1 tim d\u01B0\u1EDBi n\u1ED9i m\u1EA1c", secondaryConfidence: 1.5 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 12: Ng\u1ED9 \u0111\u1ED9c thu\u1ED1c Digoxin (Trang 95, 115)",
        coreTakeaway: "H\xECnh \u1EA3nh ST h\xECnh \u0111\xE1y ch\xE9n ch\u1EC9 ra hi\u1EC7u l\u1EF1c c\u1EE7a Digoxin; khi xu\u1EA5t hi\u1EC7n k\xE8m ngo\u1EA1i t\xE2m thu th\u1EA5t nh\u1ECBp \u0111\xF4i, bloc nh\u0129 th\u1EA5t ho\u1EB7c nh\u1ECBp nhanh nh\u0129 d\u1EABn truy\u1EC1n 2:1 l\xE0 d\u1EA5u hi\u1EC7u ng\u1ED9 \u0111\u1ED9c Digoxin.",
        pitfallToAvoid: "\u0110\u1EEBng nh\u1EA7m h\xECnh \u1EA3nh \u0111\xE1y ch\xE9n c\u1EE7a Digoxin v\u1EDBi thi\u1EBFu m\xE1u c\u01A1 tim. \u0110\xE1y ch\xE9n cong v\xF5ng m\u1EC1m m\u1EA1i, trong khi thi\u1EBFu m\xE1u c\u01A1 tim ST \u0111i ngang ho\u1EB7c d\u1ED1c xu\u1ED1ng th\u1EB3ng t\u1EAFp."
      }
    },
    {
      id: "case-normal-ecg",
      category: "Normal",
      title: "\u0110i\u1EC7n T\xE2m \u0110\u1ED3 12 Chuy\u1EC3n \u0110\u1EA1o B\xECnh Th\u01B0\u1EDDng (Normal 12-Lead ECG)",
      subtitle: "Nh\u1ECBp xoang \u0111\u1EC1u 72 l/p, tr\u1EE5c trung gian, c\xE1c kho\u1EA3ng v\xE0 \u0111o\u1EA1n chu\u1EA9n m\u1EF1c",
      severity: "\u1ED4n \u0111\u1ECBnh",
      patient: {
        name: "Nguy\u1EC5n Thu H\u01B0\u01A1ng",
        age: 28,
        gender: "N\u1EEF",
        chiefComplaint: "Kh\xE1m s\u1EE9c kh\u1ECFe \u0111\u1ECBnh k\u1EF3 ti\u1EC1n h\xF4n nh\xE2n, kh\xF4ng c\xF3 tri\u1EC7u ch\u1EE9ng tim m\u1EA1ch",
        clinicalHistory: "Ng\u01B0\u1EDDi tr\u1EBB kh\u1ECFe m\u1EA1nh, t\u1EADp th\u1EC3 thao th\u01B0\u1EDDng xuy\xEAn, kh\xF4ng ti\u1EC1n s\u1EED b\u1EC7nh l\xFD tim m\u1EA1ch hay gia \u0111\xECnh c\xF3 ng\u01B0\u1EDDi \u0111\u1ED9t t\u1EED.",
        vitals: { bp: "115/75", hr: 72, spo2: 99, temp: 36.6 },
        labs: { k: 4.2, ca: 2.35, mg: 0.9, troponinI: "\xC2m t\xEDnh" }
      },
      metrics: {
        heartRate: 72,
        rhythmType: "Nh\u1ECBp xoang b\xECnh th\u01B0\u1EDDng",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 55,
        prInterval: 150,
        qrsDuration: 85,
        qt: 380,
        qtc: 416,
        sokolowLyon: 24
        // SV1 (12mm) + RV5 (12mm) = 24mm (<35mm)
      },
      leadsData: cloneNormalLeads(),
      leadsSummary: {
        limbLeadsSummary: "S\xF3ng P d\u01B0\u01A1ng \u1EDF DI, DII, aVF v\xE0 \xE2m \u1EDF aVR. Kho\u1EA3ng PR 150ms c\u1ED1 \u0111\u1ECBnh. Ph\u1EE9c b\u1ED9 QRS thanh m\u1EA3nh 85ms. \u0110o\u1EA1n ST \u0111\u1EB3ng \u0111i\u1EC7n, s\xF3ng T d\u01B0\u01A1ng \u1EDF DI, DII, aVF.",
        chestLeadsSummary: "S\xF3ng R t\u0103ng d\u1EA7n bi\xEAn \u0111\u1ED9 t\u1EEB V1 \u0111\u1EBFn V5, s\xF3ng S gi\u1EA3m d\u1EA7n bi\xEAn \u0111\u1ED9. V\xF9ng chuy\u1EC3n ti\u1EBFp (R/S ~ 1) \u1EDF V3-V4. ST \u0111\u1EB3ng \u0111i\u1EC7n, T d\u01B0\u01A1ng \u1EDF V3-V6."
      },
      diagnosis: {
        primary: "\u0110i\u1EC7n t\xE2m \u0111\u1ED3 12 chuy\u1EC3n \u0111\u1EA1o trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng (Normal Electrocardiogram)",
        culpritVesselOrCause: "H\u1EC7 th\u1ED1ng ph\xE1t nh\u1ECBp v\xE0 d\u1EABn truy\u1EC1n \u0111i\u1EC7n h\u1ECDc tim ho\u1EA1t \u0111\u1ED9ng sinh l\xFD ho\xE0n h\u1EA3o",
        differentials: ["Kh\xF4ng c\xF3 b\u1EC7nh l\xFD"],
        keyFindings: [
          "\u0110\xFAng ti\xEAu chu\u1EA9n nh\u1ECBp xoang: P \u0111\u1ED3ng d\u1EA1ng, P(+) \u1EDF DII, aVF, P(-) \u1EDF aVR, m\u1ED7i P \u0111i k\xE8m 1 QRS",
          "T\u1EA7n s\u1ED1 72 chu k\u1EF3/ph\xFAt (n\u1EB1m trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng 60-100 l/p)",
          "Tr\u1EE5c \u0111i\u1EC7n tim trung gian (+55\xB0)",
          "Th\u1EDDi gian v\xE0 bi\xEAn \u0111\u1ED9 c\xE1c s\xF3ng P, QRS, T, kho\u1EA3ng PR v\xE0 QT trong gi\u1EDBi h\u1EA1n sinh l\xFD"
        ],
        clinicalNote: "\u0110i\u1EC7n t\xE2m \u0111\u1ED3 ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng, kh\xF4ng ghi nh\u1EADn r\u1ED1i lo\u1EA1n nh\u1ECBp, ph\xEC \u0111\u1EA1i bu\u1ED3ng tim hay bi\u1EBFn \u0111\u1ED5i thi\u1EBFu m\xE1u c\u01A1 tim.",
        treatment: ["Ti\u1EBFp t\u1EE5c duy tr\xEC l\u1ED1i s\u1ED1ng l\xE0nh m\u1EA1nh, dinh d\u01B0\u1EE1ng h\u1EE3p l\xFD v\xE0 r\xE8n luy\u1EC7n th\u1EC3 thao."],
        confidence: { primary: 99.8 }
      },
      learningNotes: {
        chapterRef: "Ch\u01B0\u01A1ng 4: C\xE1c b\u01B0\u1EDBc c\u0103n b\u1EA3n \u0111\u1ECDc \u0111i\u1EC7n t\xE2m \u0111\u1ED3 (Trang 12-18, 111-113)",
        coreTakeaway: "10 b\u01B0\u1EDBc chu\u1EA9n m\u1EF1c khi \u0111\u1ECDc b\u1EA5t k\u1EF3 ECG n\xE0o: 1. Nh\u1ECBp -> 2. T\u1EA7n s\u1ED1 -> 3. Tr\u1EE5c & g\xF3c alpha -> 4. S\xF3ng P -> 5. PR -> 6. QRS -> 7. ST -> 8. T -> 9. QT/QTc -> 10. S\xF3ng U.",
        pitfallToAvoid: "Lu\xF4n ki\u1EC3m tra k\u1EF9 thu\u1EADt test 1mV (cao 10mm) v\xE0 t\u1ED1c \u0111\u1ED9 gi\u1EA5y 25mm/s tr\u01B0\u1EDBc khi k\u1EBFt lu\u1EADn \u0111i\u1EC7n tim b\xECnh th\u01B0\u1EDDng."
      }
    },
    {
      id: "case-lbbb",
      category: "Conduction",
      title: "Bloc Nh\xE1nh Tr\xE1i Ho\xE0n To\xE0n (Complete LBBB)",
      subtitle: "QRS d\xE3n r\u1ED9ng 145ms, s\xF3ng R ch\u1EBB \u0111\xF4i h\xECnh ch\u1EEF M \u1EDF DI, aVL, V5, V6; d\u1EA1ng QS s\xE2u \u1EDF V1-V3",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "Tr\u1EA7n V\u0103n H\xF9ng",
        age: 67,
        gender: "Nam",
        chiefComplaint: "M\u1EC7t m\u1ECFi, kh\xF3 th\u1EDF khi g\u1EAFng s\u1EE9c (NYHA II), c\u1EA3m gi\xE1c t\u1EE9c n\u1EB7ng ng\u1EF1c tr\xE1i \xE2m \u1EC9",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 67 tu\u1ED5i, ti\u1EC1n s\u1EED T\u0103ng huy\u1EBFt \xE1p 15 n\u0103m v\xE0 b\u1EC7nh c\u01A1 tim gi\xE3n, \u0111i\u1EC1u tr\u1ECB kh\xF4ng li\xEAn t\u1EE5c. G\u1EA7n \u0111\xE2y m\u1EC7t m\u1ECFi t\u0103ng khi leo c\u1EA7u thang, th\u1EC9nh tho\u1EA3ng c\u1EA3m gi\xE1c h\u1ED3i h\u1ED9p t\u1EE9c ng\u1EF1c.",
        vitals: { bp: "155/90", hr: 75, spo2: 97, temp: 36.7 },
        labs: { k: 4.1, ca: 2.3, mg: 0.85, troponinI: "0.02 ng/mL (b\xECnh th\u01B0\u1EDDng)", bnp: "420 pg/mL" }
      },
      metrics: {
        heartRate: 75,
        rhythmType: "Nh\u1ECBp xoang k\xE8m Bloc nh\xE1nh tr\xE1i ho\xE0n to\xE0n (Complete LBBB)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch tr\xE1i",
        alphaAngle: -25,
        prInterval: 175,
        qrsDuration: 145,
        qt: 420,
        qtc: 470
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const lateralLeads = ["I", "aVL", "V5", "V6"];
        for (const l of lateralLeads) {
          leads[l].qWave = { amp: 0, dur: 0.01 };
          leads[l].rWave = { amp: l === "V5" || l === "V6" ? 2.2 : 1.4, dur: 0.08, notched: true };
          leads[l].sWave = { amp: -0.1, dur: 0.02 };
          leads[l].stSegment = { elevation: -0.15, slope: "downsloping" };
          leads[l].tWave = { amp: -0.38, dur: 0.16, shape: "inverted" };
          leads[l].qrsDuration = 145;
        }
        const septalLeads = ["V1", "V2", "V3"];
        for (const l of septalLeads) {
          leads[l].rWave = { amp: 0.1, dur: 0.02 };
          leads[l].sWave = { amp: l === "V2" ? -2.5 : -2, dur: 0.08, wide: true };
          leads[l].stSegment = { elevation: 0.18, slope: "upsloping" };
          leads[l].tWave = { amp: 0.45, dur: 0.16, shape: "normal" };
          leads[l].qrsDuration = 145;
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "DI, aVL: Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng 145ms, s\xF3ng R ch\u1EBB \u0111\xF4i c\xF3 kh\xEDa h\xECnh ch\u1EEF M (notched R), m\u1EA5t s\xF3ng q v\xE1ch, ST ch\xEAnh xu\u1ED1ng v\xE0 T \xE2m th\u1EE9 ph\xE1t tr\xE1i chi\u1EC1u v\u1EDBi QRS.",
        chestLeadsSummary: "V1-V3: S\xF3ng r c\u1EF1c nh\u1ECF ho\u1EB7c d\u1EA1ng QS r\u1EA5t s\xE2u v\xE0 r\u1ED9ng, ST ch\xEAnh l\xEAn th\u1EE9 ph\xE1t d\u1EA1ng v\xF2m l\u01B0\u1EE3n. V5-V6: S\xF3ng R \u0111\u1EC9nh t\xF9 ch\u1EBB \u0111\xF4i, th\u1EDDi gian nh\xE1nh n\u1ED9i \u0111i\u1EC7n k\xE9o d\xE0i > 60ms."
      },
      diagnosis: {
        primary: "Bloc Nh\xE1nh Tr\xE1i Ho\xE0n To\xE0n (Complete Left Bundle Branch Block - LBBB)",
        culpritVesselOrCause: "T\u1ED5n th\u01B0\u01A1ng nh\xE1nh tr\xE1i b\xF3 His do t\u0103ng huy\u1EBFt \xE1p m\u1EA1n t\xEDnh k\xE9o d\xE0i, x\u01A1 h\xF3a tho\xE1i h\xF3a h\u1EC7 d\u1EABn truy\u1EC1n (b\u1EC7nh Lev/Len\xE8gre) ho\u1EB7c b\u1EC7nh m\u1EA1ch v\xE0nh",
        differentials: [
          "Ph\xEC \u0111\u1EA1i th\u1EA5t tr\xE1i \u0111\u01A1n thu\u1EA7n (QRS th\u01B0\u1EDDng < 120ms, kh\xF4ng m\u1EA5t s\xF3ng q \u1EDF V5-V6)",
          "H\u1ED9i ch\u1EE9ng WPW Type B (c\xF3 s\xF3ng Delta, kho\u1EA3ng PR ng\u1EAFn < 120ms)",
          "Nh\u1ECBp t\u1EF1 th\u1EA5t ch\u1EADm (t\u1EA7n s\u1ED1 th\u01B0\u1EDDng < 40 l/p, ph\xE2n ly nh\u0129 th\u1EA5t)"
        ],
        keyFindings: [
          "QRS d\xE3n r\u1ED9ng \u2265 120ms (th\u1EF1c t\u1EBF 145ms)",
          "S\xF3ng R r\u1ED9ng c\xF3 kh\xEDa ch\u1EBB \u0111\xF4i h\xECnh ch\u1EEF M \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o b\xEAn (DI, aVL, V5, V6)",
          "M\u1EA5t ho\xE0n to\xE0n s\xF3ng q sinh l\xFD \u1EDF DI, V5, V6 do \u0111\u1EA3o ng\u01B0\u1EE3c chi\u1EC1u kh\u1EED c\u1EF1c v\xE1ch li\xEAn th\u1EA5t",
          "D\u1EA1ng rS ho\u1EB7c QS r\u1EA5t s\xE2u v\xE0 r\u1ED9ng \u1EDF V1-V3",
          "Bi\u1EBFn \u0111\u1ED5i ST-T th\u1EE9 ph\xE1t lu\xF4n ng\u01B0\u1EE3c chi\u1EC1u v\u1EDBi ph\u1EE9c b\u1ED9 QRS (ST ch\xEAnh xu\u1ED1ng v\xE0 T \xE2m \u1EDF V5-V6; ST ch\xEAnh l\xEAn nh\u1EB9 \u1EDF V1-V3)"
        ],
        clinicalNote: "Khi xu\u1EA5t hi\u1EC7n LBBB m\u1EDBi ho\u1EB7c nghi ng\u1EDD m\u1EDBi, LBBB che khu\u1EA5t c\xE1c bi\u1EBFn \u0111\u1ED5i ST-T c\u1EE7a nh\u1ED3i m\xE1u c\u01A1 tim. C\u1EA7n \xE1p d\u1EE5ng Ti\xEAu chu\u1EA9n Sgarbossa c\u1EA3i bi\xEAn \u0111\u1EC3 ch\u1EA9n \u0111o\xE1n NMCT c\u1EA5p.",
        treatment: [
          "\u0110\xE1nh gi\xE1 to\xE0n di\u1EC7n b\u1EC7nh tim th\u1EF1c th\u1EC3 n\u1EC1n (Si\xEAu \xE2m tim Doppler m\xE0u, ch\u1EE5p MSCT m\u1EA1ch v\xE0nh n\u1EBFu \u0111au ng\u1EF1c).",
          "Ki\u1EC3m so\xE1t huy\u1EBFt \xE1p t\u1ED1i \u01B0u v\u1EDBi thu\u1ED1c \u1EE9c ch\u1EBF men chuy\u1EC3n (ACEi) / ARB v\xE0 thu\u1ED1c ch\u1EB9n beta.",
          "N\u1EBFu k\xE8m suy tim n\u1EB7ng EF \u2264 35% v\xE0 QRS \u2265 130-150ms: xem x\xE9t ch\u1EC9 \u0111\u1ECBnh li\u1EC7u ph\xE1p t\xE1i \u0111\u1ED3ng b\u1ED9 c\u01A1 tim (CRT-D / CRT-P)."
        ],
        confidence: { primary: 98.6, secondaryName: "Ph\xEC \u0111\u1EA1i th\u1EA5t tr\xE1i c\xF3 r\u1ED1i lo\u1EA1n d\u1EABn truy\u1EC1n", secondaryConfidence: 1.2 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 7: Abnormalities of QRS Complex (Trang 79-81, 95 - H\xECnh 7.10)",
        coreTakeaway: "\u0110\u1EB7c tr\u01B0ng c\u1ED1t l\xF5i c\u1EE7a LBBB: QRS \u2265 120ms, m\u1EA5t s\xF3ng q v\xE1ch, s\xF3ng R ch\u1EBB \u0111\xF4i h\xECnh ch\u1EEF M \u1EDF V5-V6 v\xE0 bi\u1EBFn \u0111\u1ED5i ST-T lu\xF4n ng\u01B0\u1EE3c chi\u1EC1u (discordant) v\u1EDBi ph\u1EE9c b\u1ED9 QRS.",
        pitfallToAvoid: "\u0110\u1EEBng v\u1ED9i ch\u1EA9n \u0111o\xE1n NMCT c\u1EA5p ch\u1EC9 v\xEC th\u1EA5y ST ch\xEAnh l\xEAn \u1EDF V1-V3 trong LBBB, v\xEC \u0111\xE2y l\xE0 ch\xEAnh l\xEAn th\u1EE9 ph\xE1t t\u1EF1 nhi\xEAn (discordant ST elevation). H\xE3y t\xECm ST ch\xEAnh c\xF9ng chi\u1EC1u (concordant) theo ti\xEAu chu\u1EA9n Sgarbossa."
      }
    },
    {
      id: "case-rbbb",
      category: "Conduction",
      title: "Bloc Nh\xE1nh Ph\u1EA3i Ho\xE0n To\xE0n (Complete RBBB)",
      subtitle: "Ph\u1EE9c b\u1ED9 d\u1EA1ng tai th\u1ECF rsR' \u1EDF V1-V2 (QRS 135ms), s\xF3ng S r\u1ED9ng s\xE2u v\xE0 t\xF9 \u1EDF DI, aVL, V5, V6",
      severity: "\u1ED4n \u0111\u1ECBnh",
      patient: {
        name: "L\xEA Ho\xE0ng Nam",
        age: 42,
        gender: "Nam",
        chiefComplaint: "Kh\xE1m s\u1EE9c kh\u1ECFe t\u1ED5ng qu\xE1t \u0111\u1ECBnh k\u1EF3, ho\xE0n to\xE0n kh\xF4ng \u0111au ng\u1EF1c hay kh\xF3 th\u1EDF",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 42 tu\u1ED5i, l\xE0m vi\u1EC7c v\u0103n ph\xF2ng, kh\xF4ng ti\u1EC1n s\u1EED b\u1EC7nh l\xFD tim m\u1EA1ch. Kh\xE1m tim nghe ti\u1EBFng tim T2 t\xE1ch \u0111\xF4i r\u1ED9ng c\u1ED1 \u0111\u1ECBnh nh\u1EB9, kh\xF4ng c\xF3 ti\u1EBFng th\u1ED5i b\u1EC7nh l\xFD.",
        vitals: { bp: "120/78", hr: 70, spo2: 99, temp: 36.5 },
        labs: { k: 4.3, ca: 2.35, mg: 0.9, troponinI: "\xC2m t\xEDnh" }
      },
      metrics: {
        heartRate: 70,
        rhythmType: "Nh\u1ECBp xoang k\xE8m Bloc nh\xE1nh ph\u1EA3i ho\xE0n to\xE0n (Complete RBBB)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c ph\u1EA3i nh\u1EB9",
        alphaAngle: 100,
        prInterval: 160,
        qrsDuration: 135,
        qt: 390,
        qtc: 421
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        leads["V1"].rWave = { amp: 0.35, dur: 0.03 };
        leads["V1"].sWave = { amp: -0.4, dur: 0.03 };
        leads["V1"].rPrimeWave = { amp: 1.4, dur: 0.06 };
        leads["V1"].stSegment = { elevation: -0.08, slope: "downsloping" };
        leads["V1"].tWave = { amp: -0.3, dur: 0.14, shape: "inverted" };
        leads["V1"].qrsDuration = 135;
        leads["V2"].rWave = { amp: 0.5, dur: 0.03 };
        leads["V2"].sWave = { amp: -0.45, dur: 0.03 };
        leads["V2"].rPrimeWave = { amp: 1.25, dur: 0.05 };
        leads["V2"].stSegment = { elevation: -0.05, slope: "downsloping" };
        leads["V2"].tWave = { amp: -0.22, dur: 0.14, shape: "inverted" };
        leads["V2"].qrsDuration = 135;
        const lateralLeads = ["I", "aVL", "V5", "V6"];
        for (const l of lateralLeads) {
          leads[l].sWave = { amp: -0.65, dur: 0.06, wide: true };
          leads[l].qrsDuration = 135;
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "DI, aVL: Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng 135ms v\u1EDBi s\xF3ng S s\xE2u, r\u1ED9ng v\xE0 t\xF9 (slurred S wave). \u0110o\u1EA1n ST v\xE0 s\xF3ng T b\xECnh th\u01B0\u1EDDng.",
        chestLeadsSummary: "V1-V2: D\u1EA1ng s\xF3ng 3 pha kinh \u0111i\u1EC3n rsR' h\xECnh 'tai th\u1ECF' (M-shaped complex), trong \u0111\xF3 \u0111\u1EC9nh R' th\u1EE9 hai cao v\xE0 r\u1ED9ng h\u01A1n s\xF3ng r ban \u0111\u1EA7u. S\xF3ng T \xE2m th\u1EE9 ph\xE1t \u1EDF V1-V2. V5-V6: S\xF3ng S r\u1ED9ng, t\xF9."
      },
      diagnosis: {
        primary: "Bloc Nh\xE1nh Ph\u1EA3i Ho\xE0n To\xE0n (Complete Right Bundle Branch Block - RBBB)",
        culpritVesselOrCause: "D\u1EABn truy\u1EC1n qua nh\xE1nh ph\u1EA3i b\xF3 His b\u1ECB ch\u1EADm tr\u1EC5 ho\u1EB7c ngh\u1EBDn, kh\u1EED c\u1EF1c th\u1EA5t ph\u1EA3i x\u1EA3y ra mu\u1ED9n qua con \u0111\u01B0\u1EDDng c\u01A1 tim th\xF4ng th\u01B0\u1EDDng",
        differentials: [
          "H\u1ED9i ch\u1EE9ng Brugada (c\xF3 ST ch\xEAnh v\xF2m coved \u1EDF V1-V2, kh\xF4ng c\xF3 s\xF3ng S r\u1ED9ng \u1EDF DI, V6)",
          "Ph\xEC \u0111\u1EA1i th\u1EA5t ph\u1EA3i (RVH) (s\xF3ng R \u0111\u01A1n pha cao \u1EDF V1, QRS < 120ms)",
          "H\u1ED9i ch\u1EE9ng Wolff-Parkinson-White Type A (PR ng\u1EAFn, c\xF3 s\xF3ng delta)"
        ],
        keyFindings: [
          "Th\u1EDDi gian ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng \u2265 120ms (th\u1EF1c t\u1EBF 135ms)",
          "D\u1EA1ng s\xF3ng 3 pha rsR' h\xECnh 'tai th\u1ECF' \u1EDF chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim ph\u1EA3i V1, V2",
          "S\xF3ng S r\u1ED9ng v\xE0 t\xF9 (slurred S wave) k\xE9o d\xE0i > 40ms \u1EDF DI, aVL, V5, V6",
          "S\xF3ng T \xE2m th\u1EE9 ph\xE1t ng\u01B0\u1EE3c chi\u1EC1u v\u1EDBi R' \u1EDF V1 v\xE0 V2",
          "Kh\xF4ng l\xE0m bi\u1EBFn d\u1EA1ng giai \u0111o\u1EA1n \u0111\u1EA7u c\u1EE7a ph\u1EE9c b\u1ED9 QRS (v\u1EABn ch\u1EA9n \u0111o\xE1n \u0111\u01B0\u1EE3c NMCT c\u1EA5p)"
        ],
        clinicalNote: "RBBB \u0111\u01A1n \u0111\u1ED9c c\xF3 th\u1EC3 g\u1EB7p \u1EDF ng\u01B0\u1EDDi ho\xE0n to\xE0n kh\u1ECFe m\u1EA1nh m\xE0 kh\xF4ng c\xF3 \xFD ngh\u0129a b\u1EC7nh l\xFD tim m\u1EA1ch nguy hi\u1EC3m. Tuy nhi\xEAn, n\u1EBFu RBBB xu\u1EA5t hi\u1EC7n m\u1EDBi \u0111\u1ED9t ng\u1ED9t, c\u1EA7n t\u1EA7m so\xE1t ngay thuy\xEAn t\u1EAFc ph\u1ED5i c\u1EA5p ho\u1EB7c nh\u1ED3i m\xE1u c\u01A1 tim th\xE0nh tr\u01B0\u1EDBc v\xE1ch.",
        treatment: [
          "N\u1EBFu RBBB \u0111\u01A1n \u0111\u1ED9c \u1EDF ng\u01B0\u1EDDi tr\u1EBB kh\xF4ng tri\u1EC7u ch\u1EE9ng: Kh\xF4ng c\u1EA7n \u0111i\u1EC1u tr\u1ECB \u0111\u1EB7c hi\u1EC7u, tr\u1EA5n an b\u1EC7nh nh\xE2n.",
          "Si\xEAu \xE2m tim lo\u1EA1i tr\u1EEB b\u1EC7nh tim b\u1EA9m sinh k\xEDn \u0111\xE1o nh\u01B0 th\xF4ng li\xEAn nh\u0129 l\u1ED7 th\u1EE9 hai (Ostium secundum ASD).",
          "Theo d\xF5i \u0111\u1ECBnh k\u1EF3 h\xE0ng n\u0103m."
        ],
        confidence: { primary: 99.2 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 7: Abnormalities of QRS Complex (Trang 79-81, 94-96 - H\xECnh 7.9)",
        coreTakeaway: "B\u1ED9 ba d\u1EA5u hi\u1EC7u RBBB: 1. QRS \u2265 120ms; 2. rsR' (tai th\u1ECF) \u1EDF V1-V2; 3. S\xF3ng S r\u1ED9ng t\xF9 \u1EDF DI v\xE0 V6. \u0110i\u1EC3m \u0111\u1EB7c bi\u1EC7t: RBBB kh\xF4ng l\xE0m m\u1EA5t s\xF3ng Q ho\u1EA1i t\u1EED n\xEAn v\u1EABn ch\u1EA9n \u0111o\xE1n \u0111\u01B0\u1EE3c NMCT!",
        pitfallToAvoid: "Ph\xE2n bi\u1EC7t RBBB v\u1EDBi Brugada: Brugada c\xF3 ST ch\xEAnh l\xEAn v\xF2m cao \u0111\u1EB7c th\xF9 \u1EDF V1-V2 v\xE0 ho\xE0n to\xE0n kh\xF4ng c\xF3 s\xF3ng S r\u1ED9ng t\xF9 \u1EDF chuy\u1EC3n \u0111\u1EA1o b\xEAn DI, V6."
      }
    },
    {
      id: "case-lvh-strain",
      category: "Hypertrophy",
      title: "Ph\xEC \u0110\u1EA1i Th\u1EA5t Tr\xE1i K\xE8m T\u0103ng G\xE1nh T\xE2m Thu (LVH with Systolic Strain)",
      subtitle: "Sokolow-Lyon 50mm (>35mm), ST ch\xEAnh xu\u1ED1ng v\xE0 T \xE2m s\xE2u b\u1EA5t \u0111\u1ED1i x\u1EE9ng \u1EDF V5-V6, d\xE0y nh\u0129 tr\xE1i (P mitrale)",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "\u0110\u1ED7 V\u0103n Th\xE0nh",
        age: 62,
        gender: "Nam",
        chiefComplaint: "\u0110au \u0111\u1EA7u v\xF9ng ch\u1EA9m, ch\xF3ng m\u1EB7t, t\u1EE9c ng\u1EF1c tr\xE1i \xE2m \u1EC9 khi lao \u0111\u1ED9ng n\u1EB7ng",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 62 tu\u1ED5i, ti\u1EC1n s\u1EED t\u0103ng huy\u1EBFt \xE1p v\xF4 c\u0103n 12 n\u0103m \u0111i\u1EC1u tr\u1ECB kh\xF4ng \u0111\u1EC1u \u0111\u1EB7n, h\xFAt thu\u1ED1c l\xE1 20 bao-n\u0103m. Huy\u1EBFt \xE1p ph\xF2ng kh\xE1m \u0111o \u0111\u01B0\u1EE3c 185/105 mmHg, m\u1ECFm tim \u0111\u1EADp d\u1ED9i m\u1EA1nh \u1EDF khoang li\xEAn s\u01B0\u1EDDn 6 ngo\xE0i \u0111\u01B0\u1EDDng trung \u0111\xF2n tr\xE1i.",
        vitals: { bp: "185/105", hr: 78, spo2: 98, temp: 36.8 },
        labs: { k: 4.1, ca: 2.38, mg: 0.88, troponinI: "0.01 ng/mL", bnp: "180 pg/mL" }
      },
      metrics: {
        heartRate: 78,
        rhythmType: "Nh\u1ECBp xoang k\xE8m ph\xEC \u0111\u1EA1i th\u1EA5t tr\xE1i v\xE0 d\xE0y nh\u0129 tr\xE1i",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch tr\xE1i",
        alphaAngle: -35,
        prInterval: 180,
        qrsDuration: 105,
        qt: 410,
        qtc: 468,
        sokolowLyon: 50,
        // SV1 (24mm) + RV5 (26mm) = 50mm (> 35mm)
        cornellCriteria: 32
        // RaVL (14mm) + SV3 (18mm) = 32mm (> 28mm ở nam)
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        leads["II"].pWave = { amp: 0.18, dur: 0.12, shape: "bifid" };
        leads["V1"].pWave = { amp: -0.12, dur: 0.1, shape: "biphasic" };
        leads["V1"].rWave = { amp: 0.2, dur: 0.02 };
        leads["V1"].sWave = { amp: -2.4, dur: 0.05 };
        leads["V1"].stSegment = { elevation: 0.08, slope: "upsloping" };
        leads["V2"].sWave = { amp: -2.8, dur: 0.05 };
        leads["V3"].sWave = { amp: -1.8, dur: 0.04 };
        leads["aVL"].rWave = { amp: 1.4, dur: 0.04 };
        leads["aVL"].stSegment = { elevation: -0.12, slope: "downsloping" };
        leads["aVL"].tWave = { amp: -0.25, dur: 0.16, shape: "inverted" };
        leads["V5"].rWave = { amp: 2.6, dur: 0.05 };
        leads["V5"].stSegment = { elevation: -0.2, slope: "downsloping" };
        leads["V5"].tWave = { amp: -0.5, dur: 0.18, shape: "inverted" };
        leads["V6"].rWave = { amp: 2.2, dur: 0.05 };
        leads["V6"].stSegment = { elevation: -0.18, slope: "downsloping" };
        leads["V6"].tWave = { amp: -0.45, dur: 0.18, shape: "inverted" };
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "Tr\u1EE5c QRS l\u1EC7ch tr\xE1i (-35\xB0). S\xF3ng P \u1EDF DII r\u1ED9ng 120ms c\xF3 hai \u0111\u1EC9nh (P mitrale). S\xF3ng R \u1EDF aVL cao 14mm (> 11mm). ST ch\xEAnh xu\u1ED1ng v\xE0 T \xE2m \u1EDF DI, aVL.",
        chestLeadsSummary: "S\xF3ng S c\u1EF1c s\xE2u \u1EDF V1 (24mm) v\xE0 V2 (28mm). S\xF3ng R cao v\xFAt \u1EDF V5 (26mm) v\xE0 V6 (22mm). Ch\u1EC9 s\u1ED1 Sokolow-Lyon = 50mm (ng\u01B0\u1EE1ng b\xECnh th\u01B0\u1EDDng < 35mm). Ki\u1EC3u bi\u1EBFn \u0111\u1ED5i t\u0103ng g\xE1nh th\u1EA5t tr\xE1i (LV Strain) r\xF5 r\u1EC7t v\u1EDBi ST ch\xEAnh d\u1ED1c xu\u1ED1ng v\xE0 T \xE2m s\xE2u b\u1EA5t \u0111\u1ED1i x\u1EE9ng."
      },
      diagnosis: {
        primary: "Ph\xEC \u0110\u1EA1i Th\u1EA5t Tr\xE1i N\u1EB7ng K\xE8m Ki\u1EC3u T\u0103ng G\xE1nh T\xE2m Thu (Severe LVH with Systolic Strain Pattern)",
        culpritVesselOrCause: "Qu\xE1 t\u1EA3i \xE1p l\u1EF1c t\xE2m thu k\xE9o d\xE0i do t\u0103ng huy\u1EBFt \xE1p v\xF4 c\u0103n m\u1EA1n t\xEDnh ch\u01B0a \u0111\u01B0\u1EE3c ki\u1EC3m so\xE1t t\u1ED1t",
        differentials: [
          "B\u1EC7nh c\u01A1 tim ph\xEC \u0111\u1EA1i m\u1ECFm tim (Apical HCM) (th\u01B0\u1EDDng c\xF3 s\xF3ng T \xE2m kh\u1ED5ng l\u1ED3 > 10mm \u0111\u1ED1i x\u1EE9ng)",
          "Thi\u1EBFu m\xE1u c\u01A1 tim d\u01B0\u1EDBi n\u1ED9i m\u1EA1c th\xE0nh b\xEAn (ST ch\xEAnh xu\u1ED1ng \u0111i ngang, T \xE2m \u0111\u1ED1i x\u1EE9ng nh\u1ECDn)",
          "Bloc nh\xE1nh tr\xE1i kh\xF4ng ho\xE0n to\xE0n (QRS th\u01B0\u1EDDng d\xE3n r\u1ED9ng h\u01A1n, kh\xF4ng \u0111\xE1p \u1EE9ng tr\u1ECDn v\u1EB9n ti\xEAu chu\u1EA9n \u0111i\u1EC7n th\u1EBF)"
        ],
        keyFindings: [
          "Ti\xEAu chu\u1EA9n \u0111i\u1EC7n th\u1EBF Sokolow-Lyon: S(V1) + R(V5) = 24 + 26 = 50 mm (ti\xEAu chu\u1EA9n > 35 mm)",
          "Ti\xEAu chu\u1EA9n Cornell: R(aVL) + S(V3) = 14 + 18 = 32 mm (ti\xEAu chu\u1EA9n \u1EDF nam > 28 mm)",
          "Ti\xEAu chu\u1EA9n Framingham: R(aVL) = 14 mm (> 11 mm)",
          "D\u1EA5u hi\u1EC7u qu\xE1 t\u1EA3i t\xE2m thu (Systolic Strain): ST ch\xEAnh xu\u1ED1ng d\u1ED1c xu\u1ED1ng v\xE0 T \xE2m b\u1EA5t \u0111\u1ED1i x\u1EE9ng (s\u01B0\u1EDDn xu\u1ED1ng thoai tho\u1EA3i, s\u01B0\u1EDDn l\xEAn d\u1ED1c \u0111\u1EE9ng) \u1EDF V5, V6, DI, aVL",
          "D\xE0y nh\u0129 tr\xE1i ph\u1ED1i h\u1EE3p (P mitrale): P hai \u0111\u1EC9nh \u1EDF DII v\xE0 pha \xE2m s\xE2u > 1mm\xB2 \u1EDF V1"
        ],
        clinicalNote: "D\u1EA5u hi\u1EC7u qu\xE1 t\u1EA3i t\xE2m thu th\u1EA5t tr\xE1i (LV Strain) tr\xEAn ECG ph\u1EA3n \xE1nh t\xECnh tr\u1EA1ng t\xE1i c\u1EA5u tr\xFAc ph\xEC \u0111\u1EA1i c\u01A1 tim ti\u1EBFn tri\u1EC3n, l\xE0m t\u0103ng g\u1EA5p 3 l\u1EA7n nguy c\u01A1 bi\u1EBFn c\u1ED1 m\u1EA1ch v\xE0nh v\xE0 suy tim.",
        treatment: [
          "H\u1EA1 huy\u1EBFt \xE1p m\u1EE5c ti\xEAu d\u1EA7n v\u1EC1 < 130/80 mmHg b\u1EB1ng thu\u1ED1c \u1EE9c ch\u1EBF men chuy\u1EC3n/ch\u1EB9n th\u1EE5 th\u1EC3 (ACEi/ARB) ph\u1ED1i h\u1EE3p thu\u1ED1c ch\u1EB9n k\xEAnh calci nh\xF3m DHP (Amlodipine).",
          "Si\xEAu \xE2m tim \u0111\u1EC3 \u0111o \u0111\u1ED9 d\xE0y v\xE1ch li\xEAn th\u1EA5t (IVSd), b\u1EC1 d\xE0y th\xE0nh sau th\u1EA5t tr\xE1i (LVPWd) v\xE0 t\xEDnh ch\u1EC9 s\u1ED1 kh\u1ED1i c\u01A1 th\u1EA5t tr\xE1i (LVMI).",
          "Thay \u0111\u1ED5i l\u1ED1i s\u1ED1ng: Gi\u1EA3m mu\u1ED1i (< 5g/ng\xE0y), b\u1ECF thu\u1ED1c l\xE1, gi\u1EA3m c\xE2n v\xE0 t\u1EADp th\u1EC3 d\u1EE5c v\u1EEBa s\u1EE9c."
        ],
        confidence: { primary: 99.1, secondaryName: "B\u1EC7nh tim t\u0103ng huy\u1EBFt \xE1p", secondaryConfidence: 0.9 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 7 & 8: Abnormalities of QRS & T Wave - LVH with Strain (Trang 74-77, 90, 92, 109 - H\xECnh 7.8, H\xECnh 8.7A)",
        coreTakeaway: "Ph\xE2n bi\u1EC7t t\u0103ng g\xE1nh t\xE2m thu (systolic strain - ST ch\xEAnh xu\u1ED1ng d\u1ED1c xu\u1ED1ng, T \xE2m b\u1EA5t \u0111\u1ED1i x\u1EE9ng) v\u1EDBi t\u0103ng g\xE1nh t\xE2m tr\u01B0\u01A1ng (diastolic overload - s\xF3ng q s\xE2u h\u1EB9p \u1EDF V5-V6 \u0111i k\xE8m s\xF3ng T cao nh\u1ECDn).",
        pitfallToAvoid: "Kh\xF4ng n\xEAn ch\u1EC9 d\u1EF1a v\xE0o ti\xEAu chu\u1EA9n \u0111i\u1EC7n th\u1EBF \u0111\u01A1n thu\u1EA7n \u1EDF ng\u01B0\u1EDDi tr\u1EBB ho\u1EB7c v\u1EADn \u0111\u1ED9ng vi\xEAn \u0111i\u1EC1n kinh (th\xE0nh ng\u1EF1c m\u1ECFng, sinh l\xFD). Ph\u1EA3i t\xECm th\xEAm tr\u1EE5c l\u1EC7ch tr\xE1i, d\xE0y nh\u0129 tr\xE1i v\xE0 d\u1EA5u hi\u1EC7u strain."
      }
    },
    {
      id: "case-brugada-type1",
      category: "Channelopathy",
      title: "H\u1ED9i Ch\u1EE9ng Brugada Type 1 (Brugada Syndrome - D\u1EA1ng V\xF2m Coved)",
      subtitle: "ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m coved \u2265 2mm \u1EDF V1-V2 ti\u1EBFp n\u1ED1i T \xE2m \u0111\u1ED1i x\u1EE9ng, nguy c\u01A1 \u0111\u1ED9t t\u1EED \u0111\xEAm (SUDS)",
      severity: "Kh\u1EA9n c\u1EA5p",
      patient: {
        name: "Ph\u1EA1m V\u0103n H\u1EADu",
        age: 34,
        gender: "Nam",
        chiefComplaint: "T\u1EC9nh d\u1EADy sau c\u01A1n ng\u1EA5t x\u1EC9u v\xE0 v\xE3 m\u1ED3 h\xF4i l\xFAc n\u1EEDa \u0111\xEAm, gia \u0111\xECnh ho\u1EA3ng h\u1ED1t \u0111\u01B0a \u0111i c\u1EA5p c\u1EE9u",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 34 tu\u1ED5i, th\u1EC3 tr\u1EA1ng kh\u1ECFe m\u1EA1nh, kh\xF4ng b\u1EC7nh n\u1EC1n. \u0110\xEAm nay sau khi u\u1ED1ng bia v\xE0 c\xF3 s\u1ED1t nh\u1EB9 (37.8\xB0C), b\u1EC7nh nh\xE2n th\u1EDF r\xEAn r\u1EC9 r\u1ED3i ng\u1EA5t \u0111i kho\u1EA3ng 2 ph\xFAt. Khai th\xE1c gia \u0111\xECnh ghi nh\u1EADn c\xF3 ng\u01B0\u1EDDi anh ru\u1ED9t \u0111\u1ED9t t\u1EED trong l\xFAc ng\u1EE7 n\u0103m 29 tu\u1ED5i.",
        vitals: { bp: "115/70", hr: 68, spo2: 98, temp: 37.8 },
        labs: { k: 4.2, ca: 2.3, mg: 0.85, troponinI: "\xC2m t\xEDnh", ckmb: "12 U/L" }
      },
      metrics: {
        heartRate: 68,
        rhythmType: "Nh\u1ECBp xoang k\xE8m h\xECnh \u1EA3nh Brugada Type 1 (Coved-type ST elevation)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 60,
        prInterval: 190,
        qrsDuration: 112,
        qt: 400,
        qtc: 426
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        leads["V1"].rWave = { amp: 0.4, dur: 0.03 };
        leads["V1"].sWave = { amp: -0.3, dur: 0.02 };
        leads["V1"].rPrimeWave = { amp: 0.6, dur: 0.03 };
        leads["V1"].stSegment = { elevation: 0.32, slope: "coved" };
        leads["V1"].tWave = { amp: -0.35, dur: 0.14, shape: "inverted" };
        leads["V1"].qrsDuration = 112;
        leads["V2"].rWave = { amp: 0.6, dur: 0.03 };
        leads["V2"].sWave = { amp: -0.3, dur: 0.02 };
        leads["V2"].rPrimeWave = { amp: 0.7, dur: 0.03 };
        leads["V2"].stSegment = { elevation: 0.26, slope: "coved" };
        leads["V2"].tWave = { amp: -0.3, dur: 0.14, shape: "inverted" };
        leads["V2"].qrsDuration = 112;
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "C\xE1c chuy\u1EC3n \u0111\u1EA1o ngo\u1EA1i bi\xEAn DI, DII, DIII, aVR, aVL, aVF ho\xE0n to\xE0n trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng. Kh\xF4ng c\xF3 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng thi\u1EBFu m\xE1u c\u01A1 tim.",
        chestLeadsSummary: "V1 v\xE0 V2: \u0110o\u1EA1n ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m l\u1ED3i cong (coved-type ST elevation) r\u1EA5t cao (3.2mm \u1EDF V1 v\xE0 2.6mm \u1EDF V2), b\u1EAFt \u0111\u1EA7u t\u1EEB \u0111\u1EC9nh s\xF3ng r' v\xE0 h\u1EA1 d\u1EA7n xu\u1ED1ng n\u1ED1i li\u1EC1n v\xE0o s\xF3ng T \xE2m \u0111\u1ED1i x\u1EE9ng s\xE2u. Kh\xF4ng c\xF3 s\xF3ng S t\xF9 \u1EDF V5-V6."
      },
      diagnosis: {
        primary: "H\u1ED9i Ch\u1EE9ng Brugada Type 1 - D\u1EA1ng V\xF2m \u0110i\u1EC3n H\xECnh (Brugada Syndrome Type 1 Coved Pattern)",
        culpritVesselOrCause: "B\u1EC7nh l\xFD k\xEAnh ion Natri tim (Channelopathy) do \u0111\u1ED9t bi\u1EBFn gen SCN5A di truy\u1EC1n tr\u1ED9i tr\xEAn nhi\u1EC5m s\u1EAFc th\u1EC3 th\u01B0\u1EDDng, g\xE2y r\u1ED1i lo\u1EA1n \u0111i\u1EC7n sinh l\xFD t\xE1i c\u1EF1c th\u1EA5t ph\u1EA3i",
        differentials: [
          "Bloc nh\xE1nh ph\u1EA3i ho\xE0n to\xE0n (RBBB) (c\xF3 s\xF3ng S r\u1ED9ng t\xF9 \u1EDF DI, V6; ST ch\xEAnh xu\u1ED1ng thay v\xEC ch\xEAnh l\xEAn v\xF2m cao)",
          "Nh\u1ED3i m\xE1u c\u01A1 tim c\u1EA5p tr\u01B0\u1EDBc v\xE1ch (ST ch\xEAnh l\xEAn c\xF3 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng \u1EDF DII, DIII, aVF, men tim t\u0103ng)",
          "Vi\xEAm m\xE0ng ngo\xE0i tim c\u1EA5p (ST ch\xEAnh l\xEAn l\xF5m lan t\u1ECFa nhi\u1EC1u chuy\u1EC3n \u0111\u1EA1o, PR ch\xEAnh xu\u1ED1ng)"
        ],
        keyFindings: [
          "\u0110o\u1EA1n ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m (coved ST elevation) \u2265 2 mm (0.2 mV) \u1EDF \u2265 1 chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim ph\u1EA3i (V1, V2)",
          "\u0110o\u1EA1n ST ch\xEAnh l\xEAn ti\u1EBFp n\u1ED1i tr\u1EF1c ti\u1EBFp v\xE0o s\xF3ng T \xE2m \u0111\u1ED1i x\u1EE9ng",
          "D\u1EA1ng gi\u1EA3 bloc nh\xE1nh ph\u1EA3i (pseudo-RBBB / rSr') nh\u01B0ng kh\xF4ng c\xF3 s\xF3ng S r\u1ED9ng \u1EDF DI v\xE0 V6",
          "Ti\u1EC1n s\u1EED ng\u1EA5t ban \u0111\xEAm v\xE0 ti\u1EC1n s\u1EED gia \u0111\xECnh c\xF3 ng\u01B0\u1EDDi th\xE2n \u0111\u1ED9t t\u1EED khi ng\u1EE7 (SUDS)",
          "D\u1EA5u hi\u1EC7u \u0111i\u1EC7n tim c\xF3 th\u1EC3 b\u1ED9c l\u1ED9 r\xF5 h\u01A1n khi b\u1EC7nh nh\xE2n b\u1ECB s\u1ED1t cao ho\u1EB7c d\xF9ng thu\u1ED1c ch\u1EB9n k\xEAnh natri"
        ],
        clinicalNote: "H\u1ED9i ch\u1EE9ng Brugada Type 1 l\xE0 d\u1EA1ng duy nh\u1EA5t c\xF3 gi\xE1 tr\u1ECB ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh \u0111\u1ED9c l\u1EADp. B\u1EC7nh nh\xE2n c\xF3 nguy c\u01A1 cao x\u1EA3y ra c\xE1c c\u01A1n nhanh th\u1EA5t \u0111a h\xECnh v\xE0 rung th\u1EA5t g\xE2y t\u1EED vong trong l\xFAc ng\u1EE7.",
        treatment: [
          "Ch\u1EC9 \u0111\u1ECBnh c\u1EA5y m\xE1y ph\xE1 rung t\u1EF1 \u0111\u1ED9ng (ICD - Implantable Cardioverter Defibrillator) \u0111\u1EC3 d\u1EF1 ph\xF2ng \u0111\u1ED9t t\u1EED ti\xEAn ph\xE1t.",
          "H\u1EA1 s\u1ED1t t\xEDch c\u1EF1c v\xE0 nhanh ch\xF3ng b\u1EB1ng Paracetamol khi c\xF3 s\u1ED1t (s\u1ED1t l\xE0 y\u1EBFu t\u1ED1 k\xEDch ho\u1EA1t lo\u1EA1n nh\u1ECBp \xE1c t\xEDnh).",
          "Tr\xE1nh tuy\u1EC7t \u0111\u1ED1i c\xE1c thu\u1ED1c ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh trong danh s\xE1ch BrugadaDrugs.org (thu\u1ED1c ch\u1ED1ng lo\u1EA1n nh\u1ECBp nh\xF3m IC nh\u01B0 Flecainide, thu\u1ED1c ch\u1ED1ng tr\u1EA7m c\u1EA3m 3 v\xF2ng, r\u01B0\u1EE3u bia).",
          "T\u1EA7m so\xE1t \u0111i\u1EC7n t\xE2m \u0111\u1ED3 v\xE0 x\xE9t nghi\u1EC7m di truy\u1EC1n cho t\u1EA5t c\u1EA3 ng\u01B0\u1EDDi th\xE2n th\u1EBF h\u1EC7 th\u1EE9 nh\u1EA5t trong gia \u0111\xECnh."
        ],
        brugadaAnalysis: "D\u1EA1ng v\xF2m Coved Type 1 kinh \u0111i\u1EC3n \u1EDF V1-V2 (ST ch\xEAnh l\xEAn 3.2mm + T \xE2m). B\u1EC7nh nh\xE2n c\xF3 tri\u1EC7u ch\u1EE9ng ng\u1EA5t v\xE0 ti\u1EC1n s\u1EED gia \u0111\xECnh \u0111\u1ED9t t\u1EED -> Ph\xE2n t\u1EA7ng nguy c\u01A1 R\u1EA4T CAO, ch\u1EC9 \u0111\u1ECBnh c\u1EA5y ICD kh\u1EA9n.",
        confidence: { primary: 98.9, secondaryName: "Brugada Type 2 chuy\u1EC3n d\u1EA1ng", secondaryConfidence: 0.8 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 7: Abnormalities of QRS Complex - The Brugada Syndrome (Trang 82, 97 - H\xECnh 7.11)",
        coreTakeaway: "H\u1ED9i ch\u1EE9ng Brugada l\xE0 b\u1EC7nh l\xFD k\xEAnh ion di truy\u1EC1n. D\u1EA1ng Type 1: ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m (coved) \u2265 2mm theo sau b\u1EDFi T \xE2m \u1EDF V1-V2; kh\xE1c v\u1EDBi RBBB v\xEC kh\xF4ng c\xF3 s\xF3ng S r\u1ED9ng \u1EDF DI, V6.",
        pitfallToAvoid: "\u0110\u1EEBng nh\u1EA7m Brugada Type 1 v\u1EDBi NMCT c\u1EA5p tr\u01B0\u1EDBc v\xE1ch. Brugada kh\xF4ng c\xF3 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng \u1EDF th\xE0nh d\u01B0\u1EDBi, men tim \xE2m t\xEDnh v\xE0 ST ch\xEAnh l\xEAn ch\u1EE7 y\u1EBFu khu tr\xFA \u1EDF V1-V2."
      }
    },
    {
      id: "case-torsades-de-pointes",
      category: "Arrhythmia",
      title: "Xo\u1EAFn \u0110\u1EC9nh (Torsades de Pointes) Tr\xEAn N\u1EC1n H\u1ED9i Ch\u1EE9ng QT K\xE9o D\xE0i",
      subtitle: "QTc k\xE9o d\xE0i 560ms, ngo\u1EA1i t\xE2m thu R-on-T kh\u1EDFi ph\xE1t c\u01A1n nhanh th\u1EA5t \u0111a h\xECnh xo\u1EAFn tr\u1EE5c quanh \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n",
      severity: "Nguy k\u1ECBch",
      patient: {
        name: "Nguy\u1EC5n Th\u1ECB Mai",
        age: 52,
        gender: "N\u1EEF",
        chiefComplaint: "\u0110\u1ED9t ng\u1ED9t ng\u1EA5t x\u1EC9u, co gi\u1EADt ng\u1EAFn 30 gi\xE2y r\u1ED3i t\u1EC9nh l\u1EA1i, th\u1EDF h\u1ED5n h\u1EC3n, ng\u01B0\u1EDDi v\xE3 m\u1ED3 h\xF4i",
        clinicalHistory: "B\u1EC7nh nh\xE2n n\u1EEF 52 tu\u1ED5i \u0111ang \u0111i\u1EC1u tr\u1ECB nhi\u1EC5m tr\xF9ng h\xF4 h\u1EA5p b\u1EB1ng Erythromycin ph\u1ED1i h\u1EE3p v\u1EDBi Ketoconazole (thu\u1ED1c kh\xE1ng n\u1EA5m) v\xE0 Simvastatin. Tr\u01B0\u1EDBc khi ng\u1EA5t c\xF3 c\u1EA3m gi\xE1c tim \u0111\u1EADp h\u1EE5t h\u1EABng d\u1EEF d\u1ED9i. Khi g\u1EAFn monitor t\u1EA1i ph\xF2ng c\u1EA5p c\u1EE9u, ghi nh\u1EADn c\xE1c c\u01A1n nh\u1ECBp nhanh th\u1EA5t t\u1EF1 h\u1EBFt xen k\u1EBD nh\u1ECBp tim ch\u1EADm.",
        vitals: { bp: "85/50", hr: 210, spo2: 92, temp: 37.1 },
        labs: { k: 3.2, ca: 2.1, mg: 0.65, troponinI: "0.03 ng/mL" }
      },
      metrics: {
        heartRate: 210,
        rhythmType: "Nh\u1ECBp nhanh th\u1EA5t \u0111a h\xECnh xo\u1EAFn \u0111\u1EC9nh (Torsades de Pointes) tr\xEAn n\u1EC1n QT k\xE9o d\xE0i",
        regularity: "Kh\xF4ng \u0111\u1EC1u",
        axis: "Tr\u1EE5c bi\u1EBFn thi\xEAn li\xEAn t\u1EE5c",
        alphaAngle: 0,
        prInterval: 0,
        qrsDuration: 160,
        qt: 560,
        qtc: 580
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const leadKeys = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
        for (const l of leadKeys) {
          leads[l].pWave = { amp: 0, dur: 0.01, shape: "flat" };
          leads[l].prSegment = { dur: 0.01 };
          leads[l].qWave = { amp: 0, dur: 0.01 };
          leads[l].rWave = { amp: 1.6, dur: 0.08 };
          leads[l].sWave = { amp: -1.2, dur: 0.08 };
          leads[l].stSegment = { elevation: 0.1, slope: "upsloping" };
          leads[l].tWave = { amp: 0.6, dur: 0.22, shape: "peaked" };
          leads[l].qrsDuration = 160;
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "C\u01A1n nh\u1ECBp nhanh th\u1EA5t \u0111a h\xECnh v\u1EDBi bi\xEAn \u0111\u1ED9 v\xE0 tr\u1EE5c ph\u1EE9c b\u1ED9 QRS thay \u0111\u1ED5i li\xEAn t\u1EE5c, xoay tr\xF2n quanh \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n (twisting of points). Nh\u1ECBp c\u01A1 b\u1EA3n tr\u01B0\u1EDBc c\u01A1n c\xF3 kho\u1EA3ng QTc k\xE9o d\xE0i > 560ms.",
        chestLeadsSummary: "V1-V6: C\xE1c ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng d\u1ECB d\u1EA1ng 160ms, li\xEAn t\u1EE5c \u0111\u1EA3o chi\u1EC1u t\u1EEB d\u01B0\u01A1ng sang \xE2m r\u1ED3i ng\u01B0\u1EE3c l\u1EA1i theo chu k\u1EF3 5-15 nh\u1ECBp, t\u1EA7n s\u1ED1 th\u1EA5t r\u1EA5t nhanh 200-240 chu k\u1EF3/ph\xFAt."
      },
      diagnosis: {
        primary: "Xo\u1EAFn \u0110\u1EC9nh (Torsades de Pointes) Th\u1EE9 Ph\xE1t Do Thu\u1ED1c K\xE9o D\xE0i Kho\u1EA3ng QT v\xE0 H\u1EA1 Magne/Kali M\xE1u",
        culpritVesselOrCause: "T\u01B0\u01A1ng t\xE1c \u1EE9c ch\u1EBF chuy\u1EC3n h\xF3a enzym gan CYP3A4 gi\u1EEFa kh\xE1ng sinh Macrolide (Erythromycin) v\xE0 kh\xE1ng n\u1EA5m Azole l\xE0m t\u0103ng n\u1ED3ng \u0111\u1ED9 thu\u1ED1c, g\xE2y \u1EE9c ch\u1EBF k\xEAnh kali IKr l\xE0m ch\u1EADm t\xE1i c\u1EF1c th\u1EA5t",
        differentials: [
          "Nh\u1ECBp nhanh th\u1EA5t \u0111\u01A1n h\xECnh th\xE1i (Monomorphic VT) (c\xE1c ph\u1EE9c b\u1ED9 QRS c\xF3 c\xF9ng h\xECnh d\u1EA1ng v\xE0 tr\u1EE5c kh\xF4ng \u0111\u1ED5i)",
          "Rung th\u1EA5t (Ventricular Fibrillation) (ho\xE0n to\xE0n h\u1ED7n lo\u1EA1n, v\xF4 t\u1ED5 ch\u1EE9c, kh\xF4ng th\xE0nh chu k\u1EF3 xo\u1EAFn tr\u1EE5c)",
          "Rung nh\u0129 d\u1EABn truy\u1EC1n qua \u0111\u01B0\u1EDDng ph\u1EE5 WPW (nh\u1ECBp ho\xE0n to\xE0n kh\xF4ng \u0111\u1EC1u, t\u1EA7n s\u1ED1 bi\u1EBFn thi\xEAn r\u1EA5t l\u1EDBn)"
        ],
        keyFindings: [
          "C\u01A1n nh\u1ECBp nhanh th\u1EA5t \u0111a h\xECnh th\xE1i v\u1EDBi c\xE1c \u0111\u1EC9nh QRS xo\u1EAFn v\u1EB7n quanh \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n",
          "Kho\u1EA3ng QT/QTc c\u01A1 b\u1EA3n k\xE9o d\xE0i r\xF5 r\u1EC7t (> 500ms, ca n\xE0y 580ms)",
          "Hi\u1EC7n t\u01B0\u1EE3ng R-on-T: Ngo\u1EA1i t\xE2m thu th\u1EA5t kh\u1EDFi ph\xE1t r\u01A1i tr\xFAng s\xF3ng T c\u1EE7a nh\xE1t b\xF3p tr\u01B0\u1EDBc \u0111\xF3",
          "T\u1EA7n s\u1ED1 th\u1EA5t trong c\u01A1n 180 - 250 chu k\u1EF3/ph\xFAt",
          "B\u1EC7nh nh\xE2n c\xF3 s\u1EED d\u1EE5ng c\xE1c thu\u1ED1c k\xE9o d\xE0i QT k\u1EBFt h\u1EE3p h\u1EA1 Kali v\xE0 Magne m\xE1u"
        ],
        clinicalNote: "Torsades de Pointes l\xE0 c\u1EA5p c\u1EE9u t\u1ED1i kh\u1EA9n. C\u01A1n c\xF3 th\u1EC3 t\u1EF1 c\u1EAFt c\u01A1n ng\u1EAFn nh\u01B0ng r\u1EA5t d\u1EC5 tho\xE1i tri\u1EC3n th\xE0nh rung th\u1EA5t (VF) g\xE2y t\u1EED vong t\u1EE9c th\xEC n\u1EBFu kh\xF4ng \u0111\u01B0\u1EE3c b\xF9 Magne v\xE0 c\u1EAFt ngu\u1ED3n k\xEDch ho\u1EA1t.",
        treatment: [
          "Ng\u1EEBng ngay l\u1EADp t\u1EE9c t\u1EA5t c\u1EA3 c\xE1c thu\u1ED1c nghi ng\u1EDD g\xE2y k\xE9o d\xE0i kho\u1EA3ng QT (Erythromycin, Ketoconazole).",
          "Ti\xEAm t\u0129nh m\u1EA1ch ch\u1EADm Magnesium Sulfate 2g (h\xF2a trong 100ml Dextrose 5% truy\u1EC1n trong 10-15 ph\xFAt) - \u0110\xE2y l\xE0 thu\u1ED1c l\u1EF1a ch\u1ECDn h\xE0ng \u0111\u1EA7u b\u1EA5t k\u1EC3 n\u1ED3ng \u0111\u1ED9 Magne m\xE1u b\xECnh th\u01B0\u1EDDng hay gi\u1EA3m!",
          "B\xF9 Kali m\xE1u t\xEDch c\u1EF1c \u0111\u1EC3 duy tr\xEC n\u1ED3ng \u0111\u1ED9 Kali m\xE1u \u1EDF m\u1EE9c cao an to\xE0n: 4.5 - 5.0 mEq/L.",
          "N\u1EBFu nh\u1ECBp tim ch\u1EADm c\u01A1 b\u1EA3n k\xEDch ho\u1EA1t xo\u1EAFn \u0111\u1EC9nh: d\xF9ng Isoproterenol ho\u1EB7c \u0111\u1EB7t m\xE1y t\u1EA1o nh\u1ECBp t\u1EA1m th\u1EDDi v\u01B0\u1EE3t t\u1EA7n s\u1ED1 (Overdrive pacing 90-110 l/p) \u0111\u1EC3 r\xFAt ng\u1EAFn kho\u1EA3ng QT.",
          "N\u1EBFu b\u1EC7nh nh\xE2n t\u1EE5t huy\u1EBFt \xE1p, m\u1EA5t \xFD th\u1EE9c: S\u1ED1c \u0111i\u1EC7n kh\u1EED rung kh\xF4ng \u0111\u1ED3ng b\u1ED9 (Defibrillation) 200J ngay l\u1EADp t\u1EE9c."
        ],
        confidence: { primary: 98.7, secondaryName: "Nh\u1ECBp nhanh th\u1EA5t \u0111a h\xECnh kh\xF4ng k\xE8m QT d\xE0i", secondaryConfidence: 1.1 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 13 & 19: Abnormalities of Q-T Interval & Fast Wide QRS Rhythm (Trang 128, 143, 186-187, 201-202 - H\xECnh 19.2)",
        coreTakeaway: "Torsades de Pointes l\xE0 m\u1ED9t thu\u1EADt ng\u1EEF m\xFAa ballet ti\u1EBFng Ph\xE1p c\xF3 ngh\u0129a l\xE0 'xo\u1EAFn quanh m\u1ED9t \u0111i\u1EC3m'. Ch\xECa kh\xF3a \u0111i\u1EC1u tr\u1ECB: Magnesium Sulfate t\u0129nh m\u1EA1ch l\xE0 th\u1EA7n d\u01B0\u1EE3c c\u1EAFt c\u01A1n!",
        pitfallToAvoid: "Ch\u1ED1ng ch\u1EC9 \u0111\u1ECBnh tuy\u1EC7t \u0111\u1ED1i c\xE1c thu\u1ED1c ch\u1ED1ng lo\u1EA1n nh\u1ECBp nh\xF3m IA (Quinidine, Procainamide) v\xE0 nh\xF3m III (Amiodarone, Sotalol) v\xEC ch\xFAng l\xE0m k\xE9o d\xE0i th\xEAm kho\u1EA3ng QT v\xE0 g\xE2y ng\u1EEBng tim."
      }
    },
    {
      id: "case-aivr",
      category: "Arrhythmia",
      title: "Nh\u1ECBp T\u1EF1 Th\u1EA5t Gia T\u0103ng (Accelerated Idioventricular Rhythm - AIVR)",
      subtitle: "Nh\u1ECBp th\u1EA5t r\u1ED9ng \u0111\u1EC1u 74 l/p, ph\xE2n ly nh\u0129 th\u1EA5t, r\u1ED1i lo\u1EA1n nh\u1ECBp t\xE1i t\u01B0\u1EDBi m\xE1u l\xE0nh t\xEDnh sau can thi\u1EC7p m\u1EA1ch v\xE0nh",
      severity: "\u1ED4n \u0111\u1ECBnh",
      patient: {
        name: "V\u0169 \u0110\xECnh To\xE0n",
        age: 58,
        gender: "Nam",
        chiefComplaint: "\u0110ang n\u1EB1m theo d\xF5i t\u1EA1i ph\xF2ng H\u1ED3i s\u1EE9c Tim m\u1EA1ch (CCU) sau can thi\u1EC7p nong stent \u0111\u1ED9ng m\u1EA1ch v\xE0nh",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 58 tu\u1ED5i, nh\u1EADp vi\u1EC7n v\xEC nh\u1ED3i m\xE1u c\u01A1 tim c\u1EA5p th\xE0nh tr\u01B0\u1EDBc gi\u1EDD th\u1EE9 2. \u0110\xE3 \u0111\u01B0\u1EE3c ch\u1EE5p v\xE0 can thi\u1EC7p \u0111\u1EB7t stent th\xE0nh c\xF4ng t\xE1i th\xF4ng ho\xE0n to\xE0n d\xF2ng ch\u1EA3y TIMI 3 nh\xE1nh LAD. 30 ph\xFAt sau khi v\u1EC1 CCU, monitor theo d\xF5i ph\xE1t hi\u1EC7n nh\u1ECBp chuy\u1EC3n sang ph\u1EE9c b\u1ED9 QRS r\u1ED9ng \u0111\u1EC1u \u0111\u1EB7n nh\u01B0ng huy\u1EBFt \xE1p v\xE0 tri gi\xE1c ho\xE0n to\xE0n \u1ED5n \u0111\u1ECBnh.",
        vitals: { bp: "125/80", hr: 74, spo2: 99, temp: 36.6 },
        labs: { k: 4.4, ca: 2.32, mg: 0.9, troponinI: "\u0110\u1EA1t \u0111\u1EC9nh 45 ng/mL (d\u1EA5u hi\u1EC7u r\u1EEDa tr\xF4i men tim)" }
      },
      metrics: {
        heartRate: 74,
        rhythmType: "Nh\u1ECBp t\u1EF1 th\u1EA5t gia t\u0103ng (AIVR) - D\u1EA5u hi\u1EC7u t\xE1i t\u01B0\u1EDBi m\xE1u m\u1EA1ch v\xE0nh",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c l\u1EC7ch tr\xE1i",
        alphaAngle: -45,
        prInterval: 0,
        // Phân ly nhĩ thất
        qrsDuration: 140,
        qt: 410,
        qtc: 455
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const leadKeys = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
        for (const l of leadKeys) {
          leads[l].pWave = { amp: 0.08, dur: 0.08, shape: "flat" };
          leads[l].prSegment = { dur: 0.02 };
          leads[l].qWave = { amp: 0, dur: 0.01 };
          leads[l].rWave = { amp: l.startsWith("V") ? 1.4 : 1.1, dur: 0.08 };
          leads[l].sWave = { amp: -0.7, dur: 0.06 };
          leads[l].stSegment = { elevation: 0.05, slope: "horizontal" };
          leads[l].tWave = { amp: -0.3, dur: 0.16, shape: "inverted" };
          leads[l].qrsDuration = 140;
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng 140ms, nh\u1ECBp \u0111\u1EC1u 74 chu k\u1EF3/ph\xFAt (nhanh h\u01A1n t\u1EA7n s\u1ED1 t\u1EF1 th\u1EA5t th\xF4ng th\u01B0\u1EDDng 20-40 l/p nh\u01B0ng ch\u1EADm h\u01A1n nh\u1ECBp nhanh th\u1EA5t VT > 100 l/p). Ph\xE2n ly nh\u0129 th\u1EA5t (AV dissociation).",
        chestLeadsSummary: "V1-V6: QRS d\xE3n r\u1ED9ng \u0111\u1ED3ng nh\u1EA5t, s\xF3ng T \u0111\u1EA3o chi\u1EC1u th\u1EE9 ph\xE1t nh\u1EB9. Th\u1EC9nh tho\u1EA3ng xu\u1EA5t hi\u1EC7n c\xE1c nh\xE1t b\xF3p h\u1ED7n h\u1EE3p (fusion beats) khi n\xFAt xoang b\u1EAFt l\u1EA1i nh\u1ECBp tim."
      },
      diagnosis: {
        primary: "Nh\u1ECBp T\u1EF1 Th\u1EA5t Gia T\u0103ng (Accelerated Idioventricular Rhythm - AIVR) / R\u1ED1i Lo\u1EA1n Nh\u1ECBp T\xE1i T\u01B0\u1EDBi M\xE1u (Reperfusion Arrhythmia)",
        culpritVesselOrCause: "D\xF2ng m\xE1u t\xE1i t\u01B0\u1EDBi m\xE1u \u0111\u1ED9t ng\u1ED9t v\xE0o v\xF9ng c\u01A1 tim b\u1ECB thi\u1EBFu m\xE1u nu\xF4i sau can thi\u1EC7p stent m\u1EA1ch v\xE0nh, l\xE0m t\u0103ng t\xEDnh t\u1EF1 \u0111\u1ED9ng c\u1EE7a \u1ED5 ch\u1EE7 nh\u1ECBp th\u1EA5t",
        differentials: [
          "Nh\u1ECBp nhanh th\u1EA5t (Ventricular Tachycardia) (t\u1EA7n s\u1ED1 > 100-120 l/p, th\u01B0\u1EDDng g\xE2y t\u1EE5t huy\u1EBFt \xE1p v\xE0 nguy k\u1ECBch)",
          "Nh\u1ECBp xoang k\xE8m Bloc nh\xE1nh tr\xE1i ho\xE0n to\xE0n (c\xF3 s\xF3ng P \u0111i tr\u01B0\u1EDBc QRS v\u1EDBi kho\u1EA3ng PR c\u1ED1 \u0111\u1ECBnh)",
          "Nh\u1ECBp tho\xE1t b\u1ED9 n\u1ED1i gia t\u0103ng (QRS th\u01B0\u1EDDng thanh m\u1EA3nh < 120ms)"
        ],
        keyFindings: [
          "T\u1EA7n s\u1ED1 th\u1EA5t \u0111\u1EC1u \u0111\u1EB7n trong kho\u1EA3ng 60 \u0111\u1EBFn 100 chu k\u1EF3/ph\xFAt ('Nh\u1ECBp nhanh th\u1EA5t ch\u1EADm')",
          "Ph\u1EE9c b\u1ED9 QRS d\xE3n r\u1ED9ng v\xE0 d\u1ECB d\u1EA1ng (th\u1EDDi gian > 120ms, th\u1EF1c t\u1EBF 140ms)",
          "Ph\xE2n ly nh\u0129 th\u1EA5t (AV dissociation): s\xF3ng P xoang ph\xE1t nh\u1ECBp \u0111\u1ED9c l\u1EADp v\u1EDBi t\u1EA7n s\u1ED1 ch\u1EADm h\u01A1n t\u1EA7n s\u1ED1 th\u1EA5t",
          "C\xF3 s\u1EF1 xu\u1EA5t hi\u1EC7n c\u1EE7a c\xE1c nh\xE1t b\u1EAFt \u0111\u01B0\u1EE3c th\u1EA5t (capture beats) ho\u1EB7c nh\xE1t h\u1ED7n h\u1EE3p (fusion beats)",
          "B\u1ED1i c\u1EA3nh l\xE2m s\xE0ng xu\u1EA5t hi\u1EC7n ngay sau khi t\xE1i th\xF4ng m\u1EA1ch v\xE0nh th\xE0nh c\xF4ng b\u1EB1ng can thi\u1EC7p ho\u1EB7c ti\xEAu s\u1EE3i huy\u1EBFt"
        ],
        clinicalNote: "AIVR \u0111\u01B0\u1EE3c c\xE1c nh\xE0 tim m\u1EA1ch h\u1ECDc g\u1ECDi l\xE0 'r\u1ED1i lo\u1EA1n nh\u1ECBp b\u1EA1n b\xE8' (benign friend): \u0110\xE2y l\xE0 ch\u1EC9 d\u1EA5u l\xE2m s\xE0ng \u0111\xE1ng tin c\u1EADy kh\u1EB3ng \u0111\u1ECBnh m\u1EA1ch v\xE0nh \u0111\xE3 t\xE1i th\xF4ng th\xE0nh c\xF4ng, ti\xEAn l\u01B0\u1EE3ng r\u1EA5t t\u1ED1t v\xE0 th\u01B0\u1EDDng t\u1EF1 k\u1EBFt th\xFAc.",
        treatment: [
          "Gi\u1EEF th\xE1i \u0111\u1ED9 theo d\xF5i s\xE1t (Watchful Waiting), KH\xD4NG d\xF9ng thu\u1ED1c ch\u1ED1ng lo\u1EA1n nh\u1ECBp (Amiodarone hay Lidocaine).",
          "Tr\xE1nh s\u1ED1c \u0111i\u1EC7n chuy\u1EC3n nh\u1ECBp v\xEC \u0111\xE2y kh\xF4ng ph\u1EA3i nh\u1ECBp nhanh th\u1EA5t \xE1c t\xEDnh.",
          "N\u1EBFu t\u1EA7n s\u1ED1 tim ch\u1EADm l\xE0m huy\u1EBFt \xE1p gi\u1EA3m nh\u1EB9 do m\u1EA5t co b\xF3p \u0111\u1ED3ng b\u1ED9 nh\u0129: c\xF3 th\u1EC3 d\xF9ng Atropine 0.5mg ti\xEAm t\u0129nh m\u1EA1ch \u0111\u1EC3 t\u0103ng t\u1EA7n s\u1ED1 xoang v\u01B0\u1EE3t qua t\u1EA7n s\u1ED1 \u1ED5 ngo\u1EA1i v\u1ECB.",
          "Ti\u1EBFp t\u1EE5c duy tr\xEC ph\xE1c \u0111\u1ED3 \u0111i\u1EC1u tr\u1ECB sau nh\u1ED3i m\xE1u c\u01A1 tim (kh\xE1ng k\u1EBFt t\u1EADp ti\u1EC3u c\u1EA7u k\xE9p DAPT, Statin li\u1EC1u cao, ch\u1EB9n beta khi huy\u1EBFt \u0111\u1ED9ng \u1ED5n \u0111\u1ECBnh)."
        ],
        confidence: { primary: 99.4 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 20: Normal Regular Rhythm with Wide QRS (Trang 195-198, 210-213 - H\xECnh 20.1)",
        coreTakeaway: "AIVR (60-100 l/p) l\xE0 d\u1EA5u hi\u1EC7u kinh \u0111i\u1EC3n c\u1EE7a t\xE1i t\u01B0\u1EDBi m\xE1u m\u1EA1ch v\xE0nh. R\u1ED1i lo\u1EA1n nh\u1ECBp n\xE0y mang t\xEDnh l\xE0nh t\xEDnh, tho\xE1ng qua v\xE0 t\u1EF1 bi\u1EBFn m\u1EA5t khi nh\u1ECBp xoang t\u0103ng l\xEAn.",
        pitfallToAvoid: "Sai l\u1EA7m nguy hi\u1EC3m l\xE0 nh\u1EA7m AIVR v\u1EDBi nh\u1ECBp nhanh th\u1EA5t \xE1c t\xEDnh (VT) r\u1ED3i v\u1ED9i v\xE3 ti\xEAm Lidocaine ho\u1EB7c Amiodarone; thu\u1ED1c s\u1EBD \u1EE9c ch\u1EBF \u1ED5 t\u1EF1 th\u1EA5t duy nh\u1EA5t \u0111ang c\u1EE9u s\u1ED1ng b\u1EC7nh nh\xE2n v\xE0 d\u1EABn \u0111\u1EBFn v\xF4 t\xE2m thu (asystole)!"
      }
    },
    {
      id: "case-atrial-flutter",
      category: "Arrhythmia",
      title: "Cu\u1ED3ng Nh\u0129 \u0110i\u1EC3n H\xECnh D\u1EABn Truy\u1EC1n 2:1 (Atrial Flutter with 2:1 AV Conduction)",
      subtitle: "S\xF3ng F h\xECnh r\u0103ng c\u01B0a li\xEAn t\u1EE5c t\u1EA7n s\u1ED1 300 l/p \u1EDF DII, DIII, aVF; nh\u1ECBp th\u1EA5t \u0111\u1EC1u 150 l/p",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "Tr\u1EA7n \u0110\xECnh Tr\u1ECDng",
        age: 68,
        gender: "Nam",
        chiefComplaint: "C\u1EA3m gi\xE1c h\u1ED3i h\u1ED9p, tim \u0111\u1EADp nhanh li\xEAn h\u1ED3i nh\u01B0 \u0111\xE1nh tr\u1ED1ng ng\u1EF1c, m\u1EC7t m\u1ECFi v\xE0 h\u1EE5t h\u01A1i",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 68 tu\u1ED5i, ti\u1EC1n s\u1EED b\u1EC7nh ph\u1ED5i t\u1EAFc ngh\u1EBDn m\u1EA1n t\xEDnh (COPD) 10 n\u0103m v\xE0 suy tim sung huy\u1EBFt. C\u01A1n h\u1ED3i h\u1ED9p xu\u1EA5t hi\u1EC7n \u0111\u1ED9t ng\u1ED9t c\xE1ch nh\u1EADp vi\u1EC7n 4 gi\u1EDD, kh\xF4ng gi\u1EA3m khi ngh\u1EC9 ng\u01A1i.",
        vitals: { bp: "128/82", hr: 150, spo2: 95, temp: 36.8 },
        labs: { k: 4, ca: 2.25, mg: 0.82, troponinI: "0.02 ng/mL" }
      },
      metrics: {
        heartRate: 150,
        rhythmType: "Cu\u1ED3ng nh\u0129 \u0111i\u1EC3n h\xECnh (Atrial Flutter) d\u1EABn truy\u1EC1n nh\u0129-th\u1EA5t 2:1",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 70,
        prInterval: 0,
        qrsDuration: 88,
        qt: 280,
        qtc: 442
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const infLeads = ["II", "III", "aVF"];
        for (const l of infLeads) {
          leads[l].pWave = { amp: -0.25, dur: 0.1, shape: "inverted" };
          leads[l].prSegment = { dur: 0.04, deviation: -0.05 };
          leads[l].rWave = { amp: 1.2, dur: 0.04 };
          leads[l].stSegment = { elevation: 0, slope: "horizontal" };
          leads[l].tWave = { amp: 0.2, dur: 0.12, shape: "normal" };
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "DII, DIII, aVF: Xu\u1EA5t hi\u1EC7n li\xEAn t\u1EE5c c\xE1c s\xF3ng F cu\u1ED3ng nh\u0129 h\xECnh r\u0103ng c\u01B0a s\u1EAFc n\xE9t (saw-tooth waves), t\u1EA7n s\u1ED1 nh\u0129 \u0111\u1EC1u \u0111\u1EB7n 300 chu k\u1EF3/ph\xFAt, kh\xF4ng c\xF3 \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n ph\u1EB3ng gi\u1EEFa c\xE1c s\xF3ng. Nh\u1ECBp th\u1EA5t \u0111\u1EC1u \u0111\u1EB7n 150 l/p do bloc nh\u0129 th\u1EA5t 2:1.",
        chestLeadsSummary: "V1: S\xF3ng F th\u01B0\u1EDDng d\u01B0\u01A1ng nh\xF4 cao. V2-V6: Ph\u1EE9c b\u1ED9 QRS thanh m\u1EA3nh b\xECnh th\u01B0\u1EDDng (88ms). D\u1EABn truy\u1EC1n nh\u0129-th\u1EA5t t\u1EF7 l\u1EC7 c\u1ED1 \u0111\u1ECBnh 2:1."
      },
      diagnosis: {
        primary: "Cu\u1ED3ng Nh\u0129 \u0110i\u1EC3n H\xECnh D\u1EABn Truy\u1EC1n 2:1 (Typical Atrial Flutter with 2:1 AV Conduction)",
        culpritVesselOrCause: "V\xF2ng v\xE0o l\u1EA1i l\u1EDBn (Macro-reentry circuit) quay ng\u01B0\u1EE3c chi\u1EC1u kim \u0111\u1ED3ng h\u1ED3 quanh v\xF2ng van ba l\xE1 v\xE0 eo t\u0129nh m\u1EA1ch ch\u1EE7 d\u01B0\u1EDBi (Cavo-tricuspid isthmus - CTI)",
        differentials: [
          "Nh\u1ECBp nhanh xoang (Sinus Tachycardia) (c\xF3 s\xF3ng P xoang b\xECnh th\u01B0\u1EDDng v\xE0 c\xF3 \u0111o\u1EA1n \u0111\u1EB3ng \u0111i\u1EC7n r\xF5 r\xE0ng)",
          "Nh\u1ECBp nhanh k\u1ECBch ph\xE1t tr\xEAn th\u1EA5t (AVNRT / AVRT) (t\u1EA7n s\u1ED1 th\u01B0\u1EDDng > 160-200 l/p, kh\xF4ng c\xF3 s\xF3ng r\u0103ng c\u01B0a F)",
          "Rung nh\u0129 \u0111\xE1p \u1EE9ng th\u1EA5t nhanh (nh\u1ECBp ho\xE0n to\xE0n kh\xF4ng \u0111\u1EC1u, kh\xF4ng c\xF3 s\xF3ng r\u0103ng c\u01B0a \u0111\u1ED3ng d\u1EA1ng)"
        ],
        keyFindings: [
          "S\xF3ng cu\u1ED3ng nh\u0129 (s\xF3ng F) h\xECnh r\u0103ng c\u01B0a li\xEAn t\u1EE5c, \u0111\u1ED3ng d\u1EA1ng \u1EDF c\xE1c chuy\u1EC3n \u0111\u1EA1o th\xE0nh d\u01B0\u1EDBi (DII, DIII, aVF)",
          "Ho\xE0n to\xE0n kh\xF4ng c\xF3 kho\u1EA3ng \u0111\u1EB3ng \u0111i\u1EC7n ph\u1EB3ng gi\u1EEFa c\xE1c s\xF3ng F",
          "T\u1EA7n s\u1ED1 nh\u0129 (s\xF3ng F) c\u1EF1c nhanh v\xE0 h\u1EB1ng \u0111\u1ECBnh: 250 \u0111\u1EBFn 350 chu k\u1EF3/ph\xFAt (\u0111i\u1EC3n h\xECnh 300 bpm)",
          "T\u1EA7n s\u1ED1 th\u1EA5t b\u1EB1ng ph\xE2n s\u1ED1 ch\u1EB5n c\u1EE7a t\u1EA7n s\u1ED1 nh\u0129: d\u1EABn truy\u1EC1n 2:1 t\u1EA1o nh\u1ECBp th\u1EA5t 150 bpm (ho\u1EB7c 4:1 t\u1EA1o nh\u1ECBp 75 bpm)",
          "Nghi\u1EC7m ph\xE1p xoa xoang c\u1EA3nh l\xE0m ch\u1EADm d\u1EABn truy\u1EC1n n\xFAt AV tho\xE1ng qua, b\u1ED9c l\u1ED9 r\xF5 s\xF3ng r\u0103ng c\u01B0a 4:1"
        ],
        clinicalNote: "B\u1EA5t k\u1EF3 b\u1EC7nh nh\xE2n n\xE0o c\xF3 nh\u1ECBp nhanh \u0111\u1EC1u \u0111\u1EB7n ch\xEDnh x\xE1c 150 chu k\u1EF3/ph\xFAt tr\xEAn l\xE2m s\xE0ng, \u0111i\u1EC1u \u0111\u1EA7u ti\xEAn b\xE1c s\u0129 c\u1EA7n ngh\u0129 \u0111\u1EBFn l\xE0 Cu\u1ED3ng nh\u0129 d\u1EABn truy\u1EC1n 2:1 cho \u0111\u1EBFn khi c\xF3 b\u1EB1ng ch\u1EE9ng ng\u01B0\u1EE3c l\u1EA1i!",
        treatment: [
          "Ki\u1EC3m so\xE1t t\u1EA7n s\u1ED1 th\u1EA5t: D\xF9ng thu\u1ED1c \u1EE9c ch\u1EBF n\xFAt AV nh\u01B0 ch\u1EB9n beta (Metoprolol) ho\u1EB7c ch\u1EB9n k\xEAnh calci Non-DHP (Diltiazem).",
          "Chuy\u1EC3n nh\u1ECBp v\u1EC1 nh\u1ECBp xoang: S\u1ED1c \u0111i\u1EC7n \u0111\u1ED3ng b\u1ED9 (Synchronized Cardioversion) v\u1EDBi m\u1EE9c n\u0103ng l\u01B0\u1EE3ng th\u1EA5p r\u1EA5t hi\u1EC7u qu\u1EA3 (ch\u1EC9 c\u1EA7n 20 - 50 Joules).",
          "Ph\xF2ng ng\u1EEBa \u0111\u1ED9t qu\u1EF5 t\u1EAFc m\u1EA1ch: \u0110\xE1nh gi\xE1 thang \u0111i\u1EC3m CHA2DS2-VASc v\xE0 ch\u1EC9 \u0111\u1ECBnh thu\u1ED1c ch\u1ED1ng \u0111\xF4ng \u0111\u01B0\u1EDDng u\u1ED1ng (NOAC / VKA) t\u01B0\u01A1ng t\u1EF1 rung nh\u0129.",
          "\u0110i\u1EC1u tr\u1ECB tri\u1EC7t \u0111\u1EC3 l\xE2u d\xE0i: Tri\u1EC7t \u0111\u1ED1t \u0111i\u1EC7n sinh l\xFD b\u1EB1ng s\xF3ng radio (RF Ablation) v\xF2ng eo van ba l\xE1 (CTI) v\u1EDBi t\u1EF7 l\u1EC7 th\xE0nh c\xF4ng > 95%."
        ],
        confidence: { primary: 98.8, secondaryName: "Nh\u1ECBp nhanh k\u1ECBch ph\xE1t tr\xEAn th\u1EA5t", secondaryConfidence: 1 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 16: Fast Regular Rhythm with Narrow QRS - Atrial Flutter (Trang 158-159, 173-174 - H\xECnh 16.3)",
        coreTakeaway: "\u0110\u1ECBnh lu\u1EADt l\xE2m s\xE0ng v\xE0ng: Nh\u1ECBp nhanh \u0111\u1EC1u QRS h\u1EB9p 150 l/p -> H\xE3y nghi ng\u1EDD ngay cu\u1ED3ng nh\u0129 2:1! S\xF3ng F h\xECnh r\u0103ng c\u01B0a kh\xF4ng c\xF3 \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n ph\u1EB3ng \u1EDF DII, DIII, aVF.",
        pitfallToAvoid: "M\u1ED9t s\xF3ng F th\u01B0\u1EDDng b\u1ECB v\xF9i l\u1EA5p b\xEAn trong ph\u1EE9c b\u1ED9 QRS ho\u1EB7c s\xF3ng T l\xE0m ta d\u1EC5 nh\xECn l\u1EA7m th\xE0nh nh\u1ECBp xoang 150 l/p. Xoa xoang c\u1EA3nh s\u1EBD l\xE0m b\u1ED9c l\u1ED9 tr\u1ECDn v\u1EB9n c\u1EA3 2 s\xF3ng F!"
      }
    },
    {
      id: "case-severe-hypokalemia",
      category: "Electrolyte",
      title: "H\u1EA1 Kali M\xE1u N\u1EB7ng K\xE8m S\xF3ng U N\u1ED5i R\xF5 - Hi\u1EC7u \u1EE8ng L\u01B0ng L\u1EA1c \u0110\xE0 (Camel-Hump Effect)",
      subtitle: "Kali m\xE1u 2.1 mEq/L, ST ch\xEAnh xu\u1ED1ng, s\xF3ng T d\u1EB9t v\xE0 s\xF3ng U nh\xF4 cao t\u1EA1o h\xECnh \u1EA3nh 2 b\u01B0\u1EDBu l\u1EA1c \u0111\xE0",
      severity: "Kh\u1EA9n c\u1EA5p",
      patient: {
        name: "Nguy\u1EC5n Th\u1ECB Lan",
        age: 45,
        gender: "N\u1EEF",
        chiefComplaint: "Y\u1EBFu li\u1EC7t m\u1EC1m t\u1EE9 chi t\u0103ng d\u1EA7n kh\xF4ng \u0111i l\u1EA1i \u0111\u01B0\u1EE3c, chu\u1ED9t r\xFAt b\u1EAFp ch\xE2n d\u1EEF d\u1ED9i, ch\u01B0\u1EDBng b\u1EE5ng",
        clinicalHistory: "B\u1EC7nh nh\xE2n n\u1EEF 45 tu\u1ED5i, ti\u1EC1n s\u1EED t\u1EF1 mua thu\u1ED1c l\u1EE3i ti\u1EC3u Furosemide u\u1ED1ng gi\u1EA3m c\xE2n li\xEAn t\u1EE5c 2 tu\u1EA7n nay, k\xE8m ti\xEAu ch\u1EA3y ph\xE2n l\u1ECFng 3 ng\xE0y. Kh\xE1m th\u1EA5y c\u01A1 l\u1EF1c hai chi d\u01B0\u1EDBi gi\u1EA3m 2/5, m\u1EA5t ph\u1EA3n x\u1EA1 g\xE2n x\u01B0\u01A1ng, b\u1EE5ng ch\u01B0\u1EDBng h\u01A1i do li\u1EC7t ru\u1ED9t c\u01A1 n\u0103ng.",
        vitals: { bp: "100/60", hr: 62, spo2: 98, temp: 36.7 },
        labs: { k: 2.1, ca: 2.25, mg: 0.68, troponinI: "\xC2m t\xEDnh" }
      },
      metrics: {
        heartRate: 62,
        rhythmType: "Nh\u1ECBp xoang k\xE8m bi\u1EBFn \u0111\u1ED5i h\u1EA1 Kali m\xE1u n\u1EB7ng (S\xF3ng U kh\u1ED5ng l\u1ED3, gi\u1EA3 k\xE9o d\xE0i QT)",
        regularity: "\u0110\u1EC1u",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 45,
        prInterval: 195,
        qrsDuration: 90,
        qt: 360,
        qtc: 366
        // QT thực sự
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const midPrecordial = ["V2", "V3", "V4", "V5", "II"];
        for (const l of midPrecordial) {
          leads[l].stSegment = { elevation: -0.09, slope: "downsloping" };
          leads[l].tWave = { amp: 0.08, dur: 0.12, shape: "flat" };
          leads[l].uWave = { amp: 0.32, dur: 0.14 };
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "DII, aVF: \u0110o\u1EA1n ST ch\xEAnh xu\u1ED1ng nh\u1EB9 (0.8mm). S\xF3ng T ph\u1EB3ng d\u1EB9t v\xE0 s\xF3ng U xu\u1EA5t hi\u1EC7n r\xF5 n\xE9t ph\xEDa sau s\xF3ng T.",
        chestLeadsSummary: "V2, V3, V4: S\xF3ng T h\u1EA1 th\u1EA5p g\u1EA7n nh\u01B0 h\xF2a l\u1EABn v\xE0o \u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n, trong khi s\xF3ng U nh\xF4 cao v\u01B0\u1EE3t tr\u1ED9i (0.32mV) theo ngay sau s\xF3ng T, t\u1EA1o th\xE0nh h\xECnh \u1EA3nh '2 b\u01B0\u1EDBu l\u01B0ng l\u1EA1c \u0111\xE0' (camel-hump pattern). Kho\u1EA3ng Q-U k\xE9o d\xE0i t\u1EA1o c\u1EA3m gi\xE1c gi\u1EA3 k\xE9o d\xE0i QT."
      },
      diagnosis: {
        primary: "H\u1EA1 Kali M\xE1u M\u1EE9c \u0110\u1ED9 N\u1EB7ng (Severe Hypokalemia - K+ 2.1 mEq/L) K\xE8m S\xF3ng U Kh\u1ED5ng L\u1ED3",
        culpritVesselOrCause: "M\u1EA5t kali \u1ED3 \u1EA1t qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a do ti\xEAu ch\u1EA3y c\u1EA5p k\u1EBFt h\u1EE3p l\u1EA1m d\u1EE5ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai l\xE0m t\u0103ng th\u1EA3i kali qua th\u1EADn",
        differentials: [
          "H\u1ED9i ch\u1EE9ng QT k\xE9o d\xE0i b\u1EA9m sinh ho\u1EB7c do thu\u1ED1c (s\xF3ng T th\u1EF1c s\u1EF1 k\xE9o d\xE0i v\xE0 r\u1ED9ng, kh\xF4ng c\xF3 s\xF3ng U ph\xE2n t\xE1ch)",
          "Thi\u1EBFu m\xE1u c\u01A1 tim d\u01B0\u1EDBi n\u1ED9i t\xE2m m\u1EA1c (ST ch\xEAnh xu\u1ED1ng nh\u01B0ng T th\u01B0\u1EDDng \xE2m nh\u1ECDn \u0111\u1ED1i x\u1EE9ng, kh\xF4ng c\xF3 s\xF3ng U n\u1ED5i tr\u1ED9i)",
          "Ng\u1ED9 \u0111\u1ED9c Digoxin (ST h\xECnh \u0111\xE1y ch\xE9n Salvador Dali, QT ng\u1EAFn l\u1EA1i)"
        ],
        keyFindings: [
          "S\xF3ng T d\u1EB9t ho\u1EB7c gi\u1EA3m bi\xEAn \u0111\u1ED9 th\u1EA5p (< 1mm)",
          "S\xF3ng U nh\xF4 cao n\u1ED5i b\u1EADt (bi\xEAn \u0111\u1ED9 > 1mm v\xE0 l\u1EDBn h\u01A1n bi\xEAn \u0111\u1ED9 s\xF3ng T \u0111i tr\u01B0\u1EDBc), r\xF5 nh\u1EA5t \u1EDF V2-V4",
          "Hi\u1EC7u \u1EE9ng 'l\u01B0ng l\u1EA1c \u0111\xE0' (camel-hump effect) do s\xF3ng T d\u1EB9t \u0111\u1EE9ng c\u1EA1nh s\xF3ng U nh\xF4 cao",
          "ST ch\xEAnh xu\u1ED1ng nh\u1EB9 (0.5 - 1.0mm)",
          "Gi\u1EA3 k\xE9o d\xE0i kho\u1EA3ng QT (th\u1EF1c ch\u1EA5t l\xE0 kho\u1EA3ng Q-U \u0111o \u0111\u01B0\u1EE3c l\xEAn \u0111\u1EBFn 560-600ms)"
        ],
        clinicalNote: "H\u1EA1 kali m\xE1u n\u1EB7ng k\xE9o d\xE0i th\u1EDDi gian t\xE1i c\u1EF1c m\xE0ng t\u1EBF b\xE0o c\u01A1 tim, t\u1EA1o \u0111i\u1EC1u ki\u1EC7n thu\u1EADn l\u1EE3i cho c\u01A1 ch\u1EBF v\xF2ng v\xE0o l\u1EA1i v\xE0 kh\u1EDFi ph\xE1t c\xE1c lo\u1EA1n nh\u1ECBp th\u1EA5t ch\u1EBFt ng\u01B0\u1EDDi nh\u01B0 xo\u1EAFn \u0111\u1EC9nh v\xE0 rung th\u1EA5t.",
        treatment: [
          "B\xF9 Kali t\u0129nh m\u1EA1ch kh\u1EA9n tr\u01B0\u01A1ng qua \u0111\u01B0\u1EDDng truy\u1EC1n t\u0129nh m\u1EA1ch trung t\xE2m ho\u1EB7c ngo\u1EA1i vi c\xF3 ki\u1EC3m so\xE1t: KCl truy\u1EC1n t\u1ED1c \u0111\u1ED9 10-20 mEq/gi\u1EDD d\u01B0\u1EDBi theo d\xF5i monitor li\xEAn t\u1EE5c.",
          "\u0110\u1ED3ng th\u1EDDi b\xF9 Magne Sulfate t\u0129nh m\u1EA1ch v\xEC h\u1EA1 Magne m\xE1u lu\xF4n \u0111i k\xE8m v\xE0 c\u1EA3n tr\u1EDF h\u1ED3i ph\u1EE5c n\u1ED3ng \u0111\u1ED9 Kali trong t\u1EBF b\xE0o.",
          "Ng\u1EEBng ngay l\u1EADp t\u1EE9c c\xE1c thu\u1ED1c l\u1EE3i ti\u1EC3u l\xE0m m\u1EA5t kali.",
          "Theo d\xF5i n\u1ED3ng \u0111\u1ED9 Kali m\xE1u m\u1ED7i 2-4 gi\u1EDD cho \u0111\u1EBFn khi \u0111\u1EA1t m\u1EE9c an to\xE0n > 3.5 mEq/L."
        ],
        confidence: { primary: 99, secondaryName: "H\u1ED9i ch\u1EE9ng QT d\xE0i m\u1EAFc ph\u1EA3i", secondaryConfidence: 0.8 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 8 & 9: Abnormalities of T Wave & U Wave - Hypokalemia (Trang 90, 100-101, 105, 115-117, 122-123 - H\xECnh 8.2, H\xECnh 9.1)",
        coreTakeaway: "B\u1ED9 ba bi\u1EBFn \u0111\u1ED5i ECG c\u1EE7a H\u1EA1 Kali m\xE1u: 1. ST ch\xEAnh xu\u1ED1ng; 2. S\xF3ng T d\u1EB9t; 3. S\xF3ng U kh\u1ED5ng l\u1ED3 t\u1EA1o hi\u1EC7u \u1EE9ng 'l\u01B0ng l\u1EA1c \u0111\xE0' (camel-hump) v\xE0 gi\u1EA3 k\xE9o d\xE0i QT.",
        pitfallToAvoid: "\u0110\u1EEBng \u0111o nh\u1EA7m kho\u1EA3ng Q-U th\xE0nh kho\u1EA3ng Q-T k\xE9o d\xE0i. \u0110o ch\xEDnh x\xE1c \u0111i\u1EC3m k\u1EBFt th\xFAc c\u1EE7a s\xF3ng T tr\u01B0\u1EDBc khi s\xF3ng U b\u1EAFt \u0111\u1EA7u s\u1EBD th\u1EA5y kho\u1EA3ng QT th\u1EF1c s\u1EF1 ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng!"
      }
    },
    {
      id: "case-ventricular-fibrillation",
      category: "Arrhythmia",
      title: "Rung Th\u1EA5t S\xF3ng L\u1EDBn (Coarse Ventricular Fibrillation - VF) - Ng\u01B0ng Tu\u1EA7n Ho\xE0n",
      subtitle: "S\xF3ng l\u0103n t\u0103n h\u1ED7n lo\u1EA1n v\xF4 t\u1ED5 ch\u1EE9c > 350 l/p, m\u1EA5t to\xE0n b\u1ED9 c\u1EA5u tr\xFAc P-QRS-T, ng\u01B0ng tu\u1EA7n ho\xE0n \u0111\u1ED9t t\u1EED",
      severity: "Nguy k\u1ECBch",
      patient: {
        name: "Ho\xE0ng V\u0103n Qu\xFD",
        age: 59,
        gender: "Nam",
        chiefComplaint: "\u0110\u1ED9t ng\u1ED9t g\u1ED3ng c\u1EE9ng, tr\u1EE3n m\u1EAFt, m\u1EA5t \xFD th\u1EE9c, ng\u01B0ng th\u1EDF v\xE0 ng\u1EEBng tim t\u1EA1i ph\xF2ng c\u1EA5p c\u1EE9u",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 59 tu\u1ED5i, ti\u1EC1n s\u1EED h\xFAt thu\u1ED1c l\xE1 n\u1EB7ng, v\u1EEBa \u0111\u01B0\u1EE3c \u0111\u01B0a v\xE0o vi\u1EC7n v\xEC c\u01A1n \u0111au th\u1EAFt ng\u1EF1c d\u1EEF d\u1ED9i nh\u01B0 x\xE9 sau x\u01B0\u01A1ng \u1EE9c gi\u1EDD th\u1EE9 1. Trong l\xFAc b\xE1c s\u0129 \u0111ang chu\u1EA9n b\u1ECB \u0111i\u1EC7n tim th\xEC b\u1EC7nh nh\xE2n \u0111\u1ED9t ng\u1ED9t co gi\u1EADt ng\u1EAFn, m\u1EA5t m\u1EA1ch c\u1EA3nh v\xE0 m\u1EA1ch b\u1EB9n, \u0111\u1ED3ng t\u1EED b\u1EAFt \u0111\u1EA7u gi\xE3n.",
        vitals: { bp: "0/0", hr: 0, spo2: 0, temp: 36.5 },
        labs: { k: 4.1, ca: 2.3, mg: 0.85, troponinI: "\u0110ang ch\u1EDD k\u1EBFt qu\u1EA3 kh\u1EA9n" }
      },
      metrics: {
        heartRate: 400,
        rhythmType: "Rung th\u1EA5t s\xF3ng l\u1EDBn (Coarse VF) - Ng\u01B0ng tu\u1EA7n ho\xE0n h\xF4 h\u1EA5p",
        regularity: "Lo\u1EA1n nh\u1ECBp ho\xE0n to\xE0n",
        axis: "V\xF4 \u0111\u1ECBnh",
        alphaAngle: 0,
        prInterval: 0,
        qrsDuration: 0,
        qt: 0,
        qtc: 0
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const leadKeys = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
        for (const l of leadKeys) {
          leads[l].pWave = { amp: 0, dur: 0.01, shape: "flat" };
          leads[l].prSegment = { dur: 0.01 };
          leads[l].qWave = { amp: 0, dur: 0.01 };
          leads[l].rWave = { amp: 0.9, dur: 0.07 };
          leads[l].sWave = { amp: -0.8, dur: 0.07 };
          leads[l].stSegment = { elevation: 0, slope: "horizontal" };
          leads[l].tWave = { amp: 0.1, dur: 0.05, shape: "flat" };
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "M\u1EA5t ho\xE0n to\xE0n m\u1ECDi d\u1EA1ng s\xF3ng \u0111\u1ECBnh h\xECnh P, QRS hay T. Thay th\u1EBF b\u1EB1ng c\xE1c dao \u0111\u1ED9ng \u0111i\u1EC7n h\u1ECDc h\xECnh sin g\u1EE3n s\xF3ng ho\xE0n to\xE0n h\u1ED7n lo\u1EA1n, bi\xEAn \u0111\u1ED9 t\u1EEB 0.5 \u0111\u1EBFn 1.2 mV (rung th\u1EA5t s\xF3ng l\u1EDBn), t\u1EA7n s\u1ED1 > 350-450 chu k\u1EF3/ph\xFAt.",
        chestLeadsSummary: "V1-V6: \u0110\u01B0\u1EDDng c\u01A1 b\u1EA3n li\xEAn t\u1EE5c chao \u0111\u1EA3o d\u1EEF d\u1ED9i, kh\xF4ng th\u1EC3 nh\u1EADn di\u1EC7n \u0111\u01B0\u1EE3c b\u1EA5t k\u1EF3 ph\u1EE9c b\u1ED9 kh\u1EED c\u1EF1c hay t\xE1i c\u1EF1c n\xE0o. T\xE2m th\u1EA5t kh\xF4ng th\u1EC3 b\u01A1m m\xE1u."
      },
      diagnosis: {
        primary: "Rung Th\u1EA5t S\xF3ng L\u1EDBn (Coarse Ventricular Fibrillation - VF) / Ng\u1EEBng Tu\u1EA7n Ho\xE0n \u0110\u1ED9t T\u1EED",
        culpritVesselOrCause: "T\u1EAFc ngh\u1EBDn c\u1EA5p t\xEDnh nh\xE1nh th\xE2n chung (LMCA) ho\u1EB7c \u0111o\u1EA1n g\u1EA7n \u0111\u1ED9ng m\u1EA1ch v\xE0nh LAD g\xE2y thi\u1EBFu m\xE1u c\u01A1 tim t\u1ED1i c\u1EA5p v\xE0 ph\xE2n r\xE3 \u0111i\u1EC7n h\u1ECDc c\u01A1 tim th\xE0nh v\xF4 s\u1ED1 ti\u1EC3u \u0111\u1EA3o k\xEDch th\xEDch \u0111\u1ED9c l\u1EADp",
        differentials: [
          "Cu\u1ED3ng th\u1EA5t (Ventricular Flutter) (s\xF3ng h\xECnh sin \u0111\u1EC1u \u0111\u1EB7n v\xE0 \u0111\u1ED3ng d\u1EA1ng h\u01A1n)",
          "Nhi\u1EC5u \u0111i\u1EC7n c\u01A1 do b\u1EC7nh nh\xE2n run r\u1EA9y (Artifact) (v\u1EABn s\u1EDD th\u1EA5y m\u1EA1ch c\u1EA3nh n\u1EA9y theo nh\u1ECBp)",
          "V\xF4 t\xE2m thu (Asystole) (\u0111\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n ph\u1EB3ng l\xEC, bi\xEAn \u0111\u1ED9 < 0.1mV)"
        ],
        keyFindings: [
          "M\u1EA5t ho\xE0n to\xE0n c\xE1c s\xF3ng P, ph\u1EE9c b\u1ED9 QRS v\xE0 s\xF3ng T c\xF3 th\u1EC3 nh\u1EADn d\u1EA1ng",
          "\u0110\u01B0\u1EDDng \u0111\u1EB3ng \u0111i\u1EC7n chao \u0111\u1EA3o v\u1EDBi c\xE1c s\xF3ng bi\u1EBFn thi\xEAn li\xEAn t\u1EE5c v\u1EC1 bi\xEAn \u0111\u1ED9, th\u1EDDi gian v\xE0 h\xECnh d\u1EA1ng",
          "T\u1EA7n s\u1ED1 dao \u0111\u1ED9ng r\u1EA5t nhanh (> 350 \u0111\u1EBFn 500 chu k\u1EF3/ph\xFAt)",
          "Rung th\u1EA5t s\xF3ng l\u1EDBn (bi\xEAn \u0111\u1ED9 > 0.5 mV) c\xF3 kh\u1EA3 n\u0103ng s\u1ED1c \u0111i\u1EC7n th\xE0nh c\xF4ng cao h\u01A1n rung th\u1EA5t s\xF3ng nh\u1ECF",
          "L\xE2m s\xE0ng ng\u1EEBng tu\u1EA7n ho\xE0n: H\xF4n m\xEA, m\u1EA5t m\u1EA1ch c\u1EA3nh/m\u1EA1ch b\u1EB9n, ng\u1EEBng th\u1EDF"
        ],
        clinicalNote: "Th\u1EDDi gian l\xE0 m\u1EA1ng s\u1ED1ng! C\u1EE9 m\u1ED7i 1 ph\xFAt tr\xEC ho\xE3n s\u1ED1c \u0111i\u1EC7n kh\u1EED rung, t\u1EF7 l\u1EC7 c\u1EE9u s\u1ED1ng b\u1EC7nh nh\xE2n rung th\u1EA5t gi\u1EA3m \u0111i 7-10%. Sau 4 ph\xFAt thi\u1EBFu oxy n\xE3o, t\u1ED5n th\u01B0\u01A1ng th\u1EA7n kinh kh\xF4ng th\u1EC3 ph\u1EE5c h\u1ED3i.",
        treatment: [
          "G\u1ECCI H\u1ED6 TR\u1EE2 B\xC1O \u0110\u1ED8NG \u0110\u1ECE C\u1EA4P C\u1EE8U NG\u1EEANG TIM NGAY L\u1EACP T\u1EE8C (Code Blue).",
          "\xC9p tim ngo\xE0i l\u1ED3ng ng\u1EF1c ch\u1EA5t l\u01B0\u1EE3ng cao ngay l\u1EADp t\u1EE9c: T\u1EA7n s\u1ED1 100-120 l\u1EA7n/ph\xFAt, \u0111\u1ED9 s\xE2u 5-6 cm, t\u1EF7 l\u1EC7 30:2.",
          "S\u1ED0C \u0110I\u1EC6N KH\u1EEC RUNG KH\xD4NG \u0110\u1ED2NG B\u1ED8 (Defibrillation) C\xC0NG S\u1EDAM C\xC0NG T\u1ED0T: M\u1EE9c n\u0103ng l\u01B0\u1EE3ng 200 Joules (m\xE1y hai pha Biphasic) ho\u1EB7c 360 Joules (m\xE1y \u0111\u01A1n pha Monophasic).",
          "Ti\u1EBFp t\u1EE5c CPR ngay trong 2 ph\xFAt sau s\u1ED1c \u0111i\u1EC7n m\xE0 kh\xF4ng d\u1EEBng l\u1EA1i ki\u1EC3m tra m\u1EA1ch.",
          "Thu\u1ED1c v\u1EADn m\u1EA1ch: Adrenaline 1mg ti\xEAm t\u0129nh m\u1EA1ch/trong x\u01B0\u01A1ng m\u1ED7i 3-5 ph\xFAt.",
          "Thu\u1ED1c ch\u1ED1ng lo\u1EA1n nh\u1ECBp: Amiodarone 300mg ti\xEAm t\u0129nh m\u1EA1ch sau c\xFA s\u1ED1c th\u1EE9 3; n\u1EBFu t\xE1i ph\xE1t th\xEAm 150mg."
        ],
        confidence: { primary: 99.9 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 21: Fast Irregular Rhythm with Bizarre QRS - Ventricular Fibrillation (Trang 199-205, 215-220 - H\xECnh 21.2)",
        coreTakeaway: "Rung th\u1EA5t l\xE0 c\u1EA5p c\u1EE9u t\u1ED1i kh\u1EA9n s\u1ED1 1 trong y khoa. S\u1ED1c \u0111i\u1EC7n kh\u1EED rung kh\xF4ng \u0111\u1ED3ng b\u1ED9 k\u1EBFt h\u1EE3p CPR li\xEAn t\u1EE5c trong v\xF2ng 1-3 ph\xFAt \u0111\u1EA7u l\xE0 ch\xECa kh\xF3a duy nh\u1EA5t c\u1EE9u s\u1ED1ng b\u1EC7nh nh\xE2n!",
        pitfallToAvoid: "\u0110\u1EEBng nh\u1EA7m rung th\u1EA5t v\u1EDBi nhi\u1EC5u run c\u01A1 (Artifact). Lu\xF4n ki\u1EC3m tra ngay m\u1EA1ch c\u1EA3nh ho\u1EB7c m\u1EA1ch b\u1EB9n: N\u1EBFu m\u1EA5t m\u1EA1ch -> L\u1EADp t\u1EE9c s\u1ED1c \u0111i\u1EC7n v\xE0 \xE9p tim!"
      }
    },
    {
      id: "case-av-block-mobitz1",
      category: "Conduction",
      title: "Bloc Nh\u0129 Th\u1EA5t \u0110\u1ED9 II Mobitz I - Chu K\u1EF3 Wenckebach (Mobitz Type I AV Block)",
      subtitle: "Kho\u1EA3ng PR d\xE0i d\u1EA7n theo t\u1EEBng nh\xE1t b\xF3p cho \u0111\u1EBFn khi r\u1EDBt 1 ph\u1EE9c b\u1ED9 QRS, nh\u1ECBp ch\u1EADm kh\xF4ng \u0111\u1EC1u c\xF3 chu k\u1EF3",
      severity: "C\u1EA3nh gi\xE1c cao",
      patient: {
        name: "L\xEA V\u0103n Tu\u1EA5n",
        age: 64,
        gender: "Nam",
        chiefComplaint: "C\u1EA3m gi\xE1c th\u1EC9nh tho\u1EA3ng h\u1EE5t h\u1EABng nh\u1ECBp trong l\u1ED3ng ng\u1EF1c, ch\xF3ng m\u1EB7t tho\xE1ng qua khi \u0111\u1EE9ng d\u1EADy",
        clinicalHistory: "B\u1EC7nh nh\xE2n nam 64 tu\u1ED5i, \u0111ang n\u1EB1m \u0111i\u1EC1u tr\u1ECB ng\xE0y th\u1EE9 2 sau nh\u1ED3i m\xE1u c\u01A1 tim c\u1EA5p th\xE0nh d\u01B0\u1EDBi \u0111\xE3 can thi\u1EC7p \u0111\u1EB7t stent RCA. B\u1EC7nh nh\xE2n t\u1EC9nh t\xE1o, ti\u1EBFp x\xFAc t\u1ED1t, huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh 115/70 mmHg, c\u1EA3m th\u1EA5y th\u1EC9nh tho\u1EA3ng tim ng\u01B0ng l\u1EA1i m\u1ED9t nh\u1ECBp.",
        vitals: { bp: "115/70", hr: 58, spo2: 98, temp: 36.6 },
        labs: { k: 4.2, ca: 2.3, mg: 0.85, troponinI: "3.2 ng/mL (gi\u1EA3m d\u1EA7n)" }
      },
      metrics: {
        heartRate: 58,
        rhythmType: "Bloc nh\u0129 th\u1EA5t \u0111\u1ED9 II Mobitz I (Chu k\u1EF3 Wenckebach 4:3)",
        regularity: "Kh\xF4ng \u0111\u1EC1u c\xF3 chu k\u1EF3",
        axis: "Tr\u1EE5c trung gian",
        alphaAngle: 60,
        prInterval: 260,
        // trung bình
        qrsDuration: 90,
        qt: 410,
        qtc: 402
      },
      leadsData: (() => {
        const leads = cloneNormalLeads();
        const leadKeys = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
        for (const l of leadKeys) {
          leads[l].pWave = { amp: 0.14, dur: 0.09, shape: "normal" };
          leads[l].prSegment = { dur: 0.14 };
          leads[l].rWave = { amp: l === "II" ? 1.4 : 1, dur: 0.04 };
          leads[l].stSegment = { elevation: 0, slope: "horizontal" };
          leads[l].tWave = { amp: 0.3, dur: 0.16, shape: "normal" };
          leads[l].qrsDuration = 90;
        }
        return leads;
      })(),
      leadsSummary: {
        limbLeadsSummary: "DII: Kho\u1EA3ng PR d\xE0i d\u1EA7n ra r\xF5 r\u1EC7t qua c\xE1c nh\xE1t b\xF3p k\u1EBF ti\u1EBFp (200ms -> 260ms -> 320ms) cho \u0111\u1EBFn khi c\xF3 m\u1ED9t s\xF3ng P \u0111i \u0111\u01A1n \u0111\u1ED9c ho\xE0n to\xE0n kh\xF4ng c\xF3 ph\u1EE9c b\u1ED9 QRS theo sau (nh\xE1t b\xF3p b\u1ECB r\u1EDBt). Nh\xE1t b\xF3p ngay sau kho\u1EA3ng ngh\u1EC9 c\xF3 kho\u1EA3ng PR ng\u1EAFn nh\u1EA5t (200ms).",
        chestLeadsSummary: "V1-V6: Ph\u1EE9c b\u1ED9 QRS thanh m\u1EA3nh b\xECnh th\u01B0\u1EDDng (90ms) do v\u1ECB tr\xED t\u1EAFc ngh\u1EBDn n\u1EB1m cao t\u1EA1i ngay c\u1EA5u tr\xFAc n\xFAt nh\u0129 th\u1EA5t (AV node)."
      },
      diagnosis: {
        primary: "Bloc Nh\u0129 Th\u1EA5t \u0110\u1ED9 II Mobitz I - Chu K\u1EF3 Wenckebach (Second-Degree AV Block Mobitz Type I)",
        culpritVesselOrCause: "Thi\u1EBFu m\xE1u tho\xE1ng qua ho\u1EB7c t\u0103ng tr\u01B0\u01A1ng l\u1EF1c ph\u1EBF v\u1ECB t\u1EA1i n\xFAt nh\u0129 th\u1EA5t (AV node) sau nh\u1ED3i m\xE1u c\u01A1 tim th\xE0nh d\u01B0\u1EDBi (nh\xE1nh nu\xF4i n\xFAt AV c\u1EE7a \u0110M v\xE0nh ph\u1EA3i RCA)",
        differentials: [
          "Bloc nh\u0129 th\u1EA5t \u0111\u1ED9 II Mobitz II (Kho\u1EA3ng PR c\u1ED1 \u0111\u1ECBnh tr\u01B0\u1EDBc khi r\u1EDBt QRS, QRS th\u01B0\u1EDDng d\xE3n r\u1ED9ng, nguy c\u01A1 cao ti\u1EBFn tri\u1EC3n bloc ho\xE0n to\xE0n)",
          "Ngo\u1EA1i t\xE2m thu nh\u0129 b\u1ECB ngh\u1EBDn (Blocked APC) (s\xF3ng P \u0111\u1EBFn s\u1EDBm, d\u1ECB d\u1EA1ng bi\u1EBFn d\u1EA1ng s\xF3ng T \u0111i tr\u01B0\u1EDBc)",
          "Bloc xoang nh\u0129 \u0111\u1ED9 II (m\u1EA5t c\u1EA3 s\xF3ng P l\u1EABn ph\u1EE9c b\u1ED9 QRS)"
        ],
        keyFindings: [
          "Kho\u1EA3ng PR d\xE0i d\u1EA7n ra qua t\u1EEBng chu k\u1EF3 tim li\xEAn ti\u1EBFp",
          "C\xF3 m\u1ED9t s\xF3ng P kh\xF4ng d\u1EABn truy\u1EC1n \u0111\u01B0\u1EE3c sang t\xE2m th\u1EA5t (r\u1EDBt m\u1ED9t ph\u1EE9c b\u1ED9 QRS)",
          "Sau nh\xE1t r\u1EDBt, kho\u1EA3ng PR c\u1EE7a nh\xE1t k\u1EBF ti\u1EBFp r\xFAt ng\u1EAFn l\u1EA1i v\u1EC1 m\u1EE9c b\xECnh th\u01B0\u1EDDng ho\u1EB7c g\u1EA7n b\xECnh th\u01B0\u1EDDng",
          "Kho\u1EA3ng R-R c\xF3 xu h\u01B0\u1EDBng ng\u1EAFn d\u1EA7n tr\u01B0\u1EDBc khi nh\xE1t r\u1EDBt x\u1EA3y ra",
          "Ph\u1EE9c b\u1ED9 QRS thanh m\u1EA3nh h\u1EB9p (< 100ms) v\xEC v\u1ECB tr\xED t\u1EAFc ngh\u1EBDn x\u1EA3y ra t\u1EA1i t\u1EA7ng n\xFAt nh\u0129 th\u1EA5t"
        ],
        clinicalNote: "Mobitz I (Wenckebach) h\u1EA7u nh\u01B0 lu\xF4n l\xE0 t\u1ED5n th\u01B0\u01A1ng t\u1EA1i n\xFAt AV, c\xF3 ti\xEAn l\u01B0\u1EE3ng t\u1ED1t, mang t\xEDnh t\u1EF1 h\u1ED3i ph\u1EE5c sau v\xE0i ng\xE0y \u0111i\u1EC1u tr\u1ECB NMCT th\xE0nh d\u01B0\u1EDBi, \u0111\xE1p \u1EE9ng r\u1EA5t nh\u1EA1y v\u1EDBi Atropine v\xE0 hi\u1EBFm khi c\u1EA7n \u0111\u1EB7t m\xE1y t\u1EA1o nh\u1ECBp v\u0129nh vi\u1EC5n.",
        treatment: [
          "N\u1EBFu b\u1EC7nh nh\xE2n kh\xF4ng c\xF3 tri\u1EC7u ch\u1EE9ng v\xE0 huy\u1EBFt \xE1p \u1ED5n \u0111\u1ECBnh: Ti\u1EBFp t\u1EE5c theo d\xF5i s\xE1t tr\xEAn monitor ph\xF2ng h\u1ED3i s\u1EE9c tim m\u1EA1ch, kh\xF4ng c\u1EA7n can thi\u1EC7p c\u1EA5p c\u1EE9u.",
          "N\u1EBFu xu\u1EA5t hi\u1EC7n nh\u1ECBp ch\u1EADm c\xF3 tri\u1EC7u ch\u1EE9ng t\u1EE5t huy\u1EBFt \xE1p ho\u1EB7c ch\xF3ng m\u1EB7t: Ti\xEAm t\u0129nh m\u1EA1ch Atropine 0.5 - 1.0 mg (c\xF3 th\u1EC3 l\u1EB7p l\u1EA1i \u0111\u1EBFn t\u1ED5ng li\u1EC1u 3mg).",
          "R\xE0 so\xE1t v\xE0 t\u1EA1m ng\u1EEBng c\xE1c thu\u1ED1c l\xE0m ch\u1EADm d\u1EABn truy\u1EC1n qua n\xFAt AV (thu\u1ED1c ch\u1EB9n beta, ch\u1EB9n calci diltiazem/verapamil, digoxin).",
          "R\u1EA5t hi\u1EBFm khi c\u1EA7n \u0111\u1EB7t m\xE1y t\u1EA1o nh\u1ECBp t\u1EA1m th\u1EDDi tr\u1EEB khi c\xF3 tri\u1EC7u ch\u1EE9ng n\u1EB7ng kh\xF4ng \u0111\xE1p \u1EE9ng Atropine."
        ],
        confidence: { primary: 98.9, secondaryName: "Bloc nh\u0129 th\u1EA5t \u0111\u1ED9 II Mobitz II", secondaryConfidence: 1 }
      },
      learningNotes: {
        chapterRef: "Atul Luthra - Ch\u01B0\u01A1ng 15: Pauses During Regular Rhythm - Second-Degree AV Block Mobitz I (Trang 146-147, 161 - H\xECnh 15.4)",
        coreTakeaway: "Quy lu\u1EADt Wenckebach: PR d\xE0i d\u1EA7n -> R\u1EDBt 1 QRS -> PR nh\xE1t sau ng\u1EAFn l\u1EA1i. T\u1ED5n th\u01B0\u01A1ng t\u1EA1i n\xFAt AV n\xEAn QRS h\u1EB9p, ti\xEAn l\u01B0\u1EE3ng l\xE0nh t\xEDnh h\u01A1n nhi\u1EC1u so v\u1EDBi Mobitz II!",
        pitfallToAvoid: "\u0110\u1EEBng nh\u1EA7m Mobitz I v\u1EDBi Mobitz II. Mobitz II c\xF3 PR c\u1ED1 \u0111\u1ECBnh, v\u1ECB tr\xED block d\u01B0\u1EDBi n\xFAt His-Purkinje n\xEAn QRS th\u01B0\u1EDDng r\u1ED9ng v\xE0 c\xF3 nguy c\u01A1 \u0111\u1ED9t ng\u1ED9t chuy\u1EC3n th\xE0nh bloc nh\u0129 th\u1EA5t ho\xE0n to\xE0n."
      }
    }
  ];
  var CLINICAL_ECG_CASES = ECG_CASES;

  // src/content/knowledge-vault/cdss/ecg/ecg-math.ts
  var LEAD_ANATOMY_MAP = {
    I: {
      lead: "I",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o I (DI)",
      type: "Limb Bipolar",
      region: "Th\xE0nh b\xEAn cao (High Lateral)",
      culpritVessel: "\u0110M M\u0169 (LCx) / Nh\xE1nh ch\xE9o LAD",
      viewAngle: "Tr\u1EE5c 0\xB0 (C\u1EF1c \xE2m: C\u1ED5 tay P, C\u1EF1c d\u01B0\u01A1ng: C\u1ED5 tay T)",
      description: "Kh\u1EA3o s\xE1t m\u1EB7t b\xEAn th\u1EA5t tr\xE1i. B\xECnh th\u01B0\u1EDDng QRS ch\u1EE7 y\u1EBFu d\u01B0\u01A1ng. ST ch\xEAnh l\xEAn g\u1EE3i \xFD NMCT th\xE0nh b\xEAn."
    },
    II: {
      lead: "II",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o II (DII)",
      type: "Limb Bipolar",
      region: "Th\xE0nh d\u01B0\u1EDBi (Inferior Wall)",
      culpritVessel: "\u0110M V\xE0nh Ph\u1EA3i (RCA 85%) / \u0110M M\u0169 (LCx 15%)",
      viewAngle: "Tr\u1EE5c +60\xB0 (D\u1ECDc theo tr\u1EE5c gi\u1EA3i ph\u1EABu bu\u1ED3ng tim)",
      description: "Tr\u1EE5c d\u1EABn truy\u1EC1n song song v\u1EDBi kh\u1EED c\u1EF1c th\u1EA5t. S\xF3ng P v\xE0 QRS r\xF5 nh\u1EA5t, \u0111\u01B0\u1EE3c ch\u1ECDn l\xE0m d\u1EA3i nh\u1ECBp chu\u1EA9n (Rhythm Strip)."
    },
    III: {
      lead: "III",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o III (DIII)",
      type: "Limb Bipolar",
      region: "Th\xE0nh d\u01B0\u1EDBi (Inferior Wall)",
      culpritVessel: "\u0110M V\xE0nh Ph\u1EA3i (RCA - \u0110o\u1EA1n g\u1EA7n ho\u1EB7c gi\u1EEFa)",
      viewAngle: "Tr\u1EE5c +120\xB0 (C\u1EF1c \xE2m: C\u1ED5 tay T, C\u1EF1c d\u01B0\u01A1ng: C\u1ED5 ch\xE2n T)",
      description: "Kh\u1EA3o s\xE1t m\u1EB7t d\u01B0\u1EDBi tim. Khi ST ch\xEAnh \u1EDF DIII > DII g\u1EE3i \xFD m\u1EA1nh t\u1EAFc RCA h\u01A1n l\xE0 LCx."
    },
    aVR: {
      lead: "aVR",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o aVR",
      type: "Limb Unipolar",
      region: "\u0110\xE1y tim / Bu\u1ED3ng nh\u0129-th\u1EA5t ph\u1EA3i (Right Atrium/Basal)",
      culpritVessel: "Th\xE2n chung v\xE0nh tr\xE1i (LMCA) / B\u1EC7nh 3 nh\xE1nh n\u1EB7ng",
      viewAngle: "Tr\u1EE5c -150\xB0 (Nh\xECn ng\u01B0\u1EE3c h\u01B0\u1EDBng v\xE0o l\xF2ng bu\u1ED3ng th\u1EA5t)",
      description: "B\xECnh th\u01B0\u1EDDng P, QRS, T \u0111\u1EC1u \xE2m s\xE2u. ST ch\xEAnh l\xEAn \u2265 1mm \u1EDF aVR l\xE0 d\u1EA5u hi\u1EC7u b\xE1o \u0111\u1ED9ng \u0111\u1ECF \u0111e d\u1ECDa s\u1ED1c tim (t\u1EAFc LMCA)."
    },
    aVL: {
      lead: "aVL",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o aVL",
      type: "Limb Unipolar",
      region: "Th\xE0nh b\xEAn cao (High Lateral)",
      culpritVessel: "\u0110M M\u0169 (LCx) / Nh\xE1nh ch\xE9o (Diagonal LAD)",
      viewAngle: "Tr\u1EE5c -30\xB0 (H\u01B0\u1EDBng v\u1EC1 vai tr\xE1i)",
      description: "C\xF9ng DI quan s\xE1t th\xE0nh b\xEAn cao. S\xF3ng ST ch\xEAnh xu\u1ED1ng \u1EDF aVL l\xE0 h\xECnh \u1EA3nh soi g\u01B0\u01A1ng s\u1EDBm nh\u1EA5t v\xE0 nh\u1EA1y nh\u1EA5t c\u1EE7a NMCT th\xE0nh d\u01B0\u1EDBi."
    },
    aVF: {
      lead: "aVF",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o aVF",
      type: "Limb Unipolar",
      region: "Th\xE0nh d\u01B0\u1EDBi (Inferior Wall)",
      culpritVessel: "\u0110M V\xE0nh Ph\u1EA3i (RCA) / \u0110M M\u0169 (LCx)",
      viewAngle: "Tr\u1EE5c +90\xB0 (H\u01B0\u1EDBng th\u1EB3ng \u0111\u1EE9ng xu\u1ED1ng b\xE0n ch\xE2n)",
      description: "H\u1EE3p c\xF9ng DII v\xE0 DIII th\xE0nh b\u1ED9 ba chuy\u1EC3n \u0111\u1EA1o th\xE0nh d\u01B0\u1EDBi. \u0110o\u1EA1n ST ch\xEAnh l\xEAn b\xE1o hi\u1EC7u NMCT c\u1EA5p th\xE0nh d\u01B0\u1EDBi."
    },
    V1: {
      lead: "V1",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o V1",
      type: "Precordial",
      region: "V\xE1ch li\xEAn th\u1EA5t (Septal) & Th\u1EA5t ph\u1EA3i",
      culpritVessel: "Nh\xE1nh xuy\xEAn v\xE1ch c\u1EE7a \u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD)",
      viewAngle: "Khoang li\xEAn s\u01B0\u1EDDn 4 b\u1EDD ph\u1EA3i x\u01B0\u01A1ng \u1EE9c",
      description: "Nh\xECn tr\u1EF1c ti\u1EBFp th\u1EA5t ph\u1EA3i v\xE0 v\xE1ch ng\u0103n. R nh\u1ECF, S s\xE2u (rS). R cao b\u1EA5t th\u01B0\u1EDDng g\u1EE3i \xFD ph\xEC \u0111\u1EA1i th\u1EA5t ph\u1EA3i ho\u1EB7c Bloc nh\xE1nh ph\u1EA3i (RBBB)."
    },
    V2: {
      lead: "V2",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o V2",
      type: "Precordial",
      region: "V\xE1ch li\xEAn th\u1EA5t (Septal Wall)",
      culpritVessel: "\u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD \u0111o\u1EA1n g\u1EA7n)",
      viewAngle: "Khoang li\xEAn s\u01B0\u1EDDn 4 b\u1EDD tr\xE1i x\u01B0\u01A1ng \u1EE9c",
      description: "Quan s\xE1t v\xE1ch li\xEAn th\u1EA5t. V\xF9ng nh\u1EA1y c\u1EA3m ph\xE1t hi\u1EC7n h\u1ED9i ch\u1EE9ng Brugada (d\u1EA1ng v\xF2m rSr' \u1EDF V1-V2) v\xE0 thi\u1EBFu m\xE1u c\u01A1 tim c\u1EA5p."
    },
    V3: {
      lead: "V3",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o V3",
      type: "Precordial",
      region: "Th\xE0nh tr\u01B0\u1EDBc m\u1ECFm tim (Anterior Wall)",
      culpritVessel: "\u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD \u0111o\u1EA1n gi\u1EEFa)",
      viewAngle: "N\u1EB1m gi\u1EEFa V2 v\xE0 V4 (KLS 5)",
      description: "V\xF9ng chuy\u1EC3n ti\u1EBFp \u0111i\u1EC7n h\u1ECDc. B\xECnh th\u01B0\u1EDDng s\xF3ng R v\xE0 S c\xE2n b\u1EB1ng. ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m \u1EDF V3 l\xE0 d\u1EA5u hi\u1EC7u \u0111i\u1EC3n h\xECnh c\u1EE7a NMCT th\xE0nh tr\u01B0\u1EDBc."
    },
    V4: {
      lead: "V4",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o V4",
      type: "Precordial",
      region: "Th\xE0nh tr\u01B0\u1EDBc m\u1ECFm tim (Anterior / Apical)",
      culpritVessel: "\u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD)",
      viewAngle: "Khoang li\xEAn s\u01B0\u1EDDn 5 tr\xEAn \u0111\u01B0\u1EDDng trung \u0111\xF2n tr\xE1i",
      description: "Nh\xECn v\xE0o m\u1ECFm tim th\u1EA5t tr\xE1i. ST ch\xEAnh l\xEAn k\xE8m s\xF3ng T cao nh\u1ECDn kh\u1ED5ng l\u1ED3 (hyperacute T) b\xE1o hi\u1EC7u t\u1EAFc ngh\u1EBDn c\u1EA5p LAD."
    },
    V5: {
      lead: "V5",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o V5",
      type: "Precordial",
      region: "Th\xE0nh tr\u01B0\u1EDBc - b\xEAn (Anterolateral Wall)",
      culpritVessel: "\u0110M M\u0169 (LCx) / Nh\xE1nh ch\xE9o LAD",
      viewAngle: "Khoang li\xEAn s\u01B0\u1EDDn 5 tr\xEAn \u0111\u01B0\u1EDDng n\xE1ch tr\u01B0\u1EDBc tr\xE1i",
      description: "Quan s\xE1t m\u1EB7t b\xEAn th\u1EA5t tr\xE1i. S\xF3ng R chi\u1EBFm \u01B0u th\u1EBF bi\xEAn \u0111\u1ED9 cao. D\xF9ng trong ti\xEAu chu\u1EA9n Sokolow-Lyon ch\u1EA9n \u0111o\xE1n d\xE0y th\u1EA5t tr\xE1i."
    },
    V6: {
      lead: "V6",
      nameVi: "Chuy\u1EC3n \u0111\u1EA1o V6",
      type: "Precordial",
      region: "Th\xE0nh b\xEAn th\u1EA5t tr\xE1i (Lateral Wall)",
      culpritVessel: "\u0110M M\u0169 (LCx)",
      viewAngle: "Khoang li\xEAn s\u01B0\u1EDDn 5 tr\xEAn \u0111\u01B0\u1EDDng n\xE1ch gi\u1EEFa tr\xE1i",
      description: "Quan s\xE1t ph\u1EA7n b\xEAn xa th\u1EA5t tr\xE1i. QRS d\u01B0\u01A1ng \u0111\u1ED3ng d\u1EA1ng v\u1EDBi DI v\xE0 aVL. S\xF3ng q nh\u1ECF sinh l\xFD th\u01B0\u1EDDng th\u1EA5y do kh\u1EED c\u1EF1c v\xE1ch ng\u0103n."
    }
  };
  var LEAD_FILTER_DEFINITIONS = [
    {
      id: "ALL",
      label: "To\xE0n B\u1ED9 12 Chuy\u1EC3n \u0110\u1EA1o",
      badge: "12 Leads",
      category: "all",
      leads: ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"],
      description: "Bao qu\xE1t to\xE0n di\u1EC7n kh\xF4ng gian 3 chi\u1EC1u c\u1EE7a qu\u1EA3 tim: 6 \u0111\u1EA1o tr\xECnh chi + 6 \u0111\u1EA1o tr\xECnh tr\u01B0\u1EDBc tim.",
      clinicalRelevance: "Kh\u1EA3o s\xE1t to\xE0n b\u1ED9 bu\u1ED3ng tim, nh\u1ECBp, d\u1EABn truy\u1EC1n v\xE0 tr\u1EE5c \u0111i\u1EC7n h\u1ECDc."
    },
    {
      id: "LIMB_BIPOLAR",
      label: "L\u01B0\u1EE1ng C\u1EF1c Chi (I, II, III)",
      badge: "Einthoven (3)",
      category: "technique",
      leads: ["I", "II", "III"],
      description: "Tam gi\xE1c Einthoven \u0111o hi\u1EC7u \u0111i\u1EC7n th\u1EBF gi\u1EEFa 2 chi (DI: Tay P-T, DII: Tay P-Ch\xE2n T, DIII: Tay T-Ch\xE2n T).",
      clinicalRelevance: "Ki\u1EC3m tra \u0111\u1ECBnh lu\u1EADt Einthoven (DII = DI + DIII), x\xE1c \u0111\u1ECBnh tr\u1EE5c QRS m\u1EB7t ph\u1EB3ng tr\xE1n v\xE0 thi\u1EBFu m\xE1u th\xE0nh d\u01B0\u1EDBi."
    },
    {
      id: "LIMB_UNIPOLAR",
      label: "\u0110\u01A1n C\u1EF1c Chi T\u0103ng C\u01B0\u1EDDng",
      badge: "Goldberger (3)",
      category: "technique",
      leads: ["aVR", "aVL", "aVF"],
      description: "H\u1EC7 th\u1ED1ng Goldberger khu\u1EBFch \u0111\u1EA1i 50% bi\xEAn \u0111\u1ED9 so v\u1EDBi \u0111i\u1EC7n c\u1EF1c trung t\xE2m Wilson.",
      clinicalRelevance: "Ph\xE1t hi\u1EC7n t\u1EAFc th\xE2n chung v\xE0nh tr\xE1i (aVR), t\u1ED5n th\u01B0\u01A1ng th\xE0nh b\xEAn (aVL) v\xE0 th\xE0nh d\u01B0\u1EDBi (aVF)."
    },
    {
      id: "LIMB_ALL",
      label: "To\xE0n B\u1ED9 6 Chuy\u1EC3n \u0110\u1EA1o Chi",
      badge: "Limb Leads (6)",
      category: "technique",
      leads: ["I", "II", "III", "aVR", "aVL", "aVF"],
      description: "6 chuy\u1EC3n \u0111\u1EA1o ngo\u1EA1i bi\xEAn n\u1EB1m tr\xEAn m\u1EB7t ph\u1EB3ng \u0111\u1EE9ng tr\xE1n (Frontal Plane).",
      clinicalRelevance: "T\xEDnh to\xE1n ch\xEDnh x\xE1c tr\u1EE5c \u0111i\u1EC7n tim (g\xF3c alpha) tr\xEAn v\xF2ng tr\xF2n Cabrera v\xE0 ph\xE1t hi\u1EC7n s\u1EDBm \u0111\u1EA3o \u0111i\u1EC7n c\u1EF1c chi."
    },
    {
      id: "CHEST_ALL",
      label: "Th\xE0nh Ng\u1EF1c / Tr\u01B0\u1EDBc Tim (V1-V6)",
      badge: "Wilson Precordial (6)",
      category: "technique",
      leads: ["V1", "V2", "V3", "V4", "V5", "V6"],
      description: "6 chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim n\u1EB1m tr\xEAn m\u1EB7t ph\u1EB3ng c\u1EAFt ngang (Horizontal Plane) \xF4m s\xE1t th\xE0nh ng\u1EF1c.",
      clinicalRelevance: "Kh\u1EA3o s\xE1t th\xE0nh tr\u01B0\u1EDBc, v\xE1ch li\xEAn th\u1EA5t, m\u1ECFm tim v\xE0 th\xE0nh b\xEAn. \u0110\xE1nh gi\xE1 s\u1EF1 ti\u1EBFn tri\u1EC3n s\xF3ng R (rS -> qR)."
    },
    {
      id: "INFERIOR",
      label: "V\xF9ng Th\xE0nh D\u01B0\u1EDBi (DII, DIII, aVF)",
      badge: "Th\xE0nh D\u01B0\u1EDBi (3)",
      category: "anatomy",
      leads: ["II", "III", "aVF"],
      coronaryVessel: "\u0110M V\xE0nh Ph\u1EA3i (RCA 85%) / \u0110M M\u0169 (LCx 15%)",
      description: "M\u1EB7t d\u01B0\u1EDBi (ho\xE0nh) c\u1EE7a t\xE2m th\u1EA5t tr\xE1i n\u1EB1m \xE1p l\xEAn c\u01A1 ho\xE0nh.",
      clinicalRelevance: "Ch\u1EA9n \u0111o\xE1n NMCT th\xE0nh d\u01B0\u1EDBi. C\u1EA7n \u0111o th\xEAm V3R-V4R lo\u1EA1i tr\u1EEB NMCT th\u1EA5t ph\u1EA3i tr\u01B0\u1EDBc khi d\xF9ng Nitroglycerin."
    },
    {
      id: "SEPTAL",
      label: "V\xF9ng V\xE1ch Li\xEAn Th\u1EA5t (V1, V2)",
      badge: "V\xE1ch Ng\u0103n (2)",
      category: "anatomy",
      leads: ["V1", "V2"],
      coronaryVessel: "Nh\xE1nh xuy\xEAn v\xE1ch c\u1EE7a \u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD)",
      description: "N\u1EB1m s\xE1t v\xE1ch ng\u0103n 2 bu\u1ED3ng th\u1EA5t v\xE0 m\u1EB7t tr\u01B0\u1EDBc th\u1EA5t ph\u1EA3i.",
      clinicalRelevance: "Nh\u1EADn di\u1EC7n Bloc nh\xE1nh ph\u1EA3i (rSR'), Bloc nh\xE1nh tr\xE1i, h\u1ED9i ch\u1EE9ng Brugada Type 1/2 v\xE0 ho\u1EA1i t\u1EED v\xE1ch."
    },
    {
      id: "ANTERIOR",
      label: "V\xF9ng Th\xE0nh Tr\u01B0\u1EDBc (V3, V4)",
      badge: "Th\xE0nh Tr\u01B0\u1EDBc (2)",
      category: "anatomy",
      leads: ["V3", "V4"],
      coronaryVessel: "\u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD \u0111o\u1EA1n gi\u1EEFa v\xE0 xa)",
      description: "Th\xE0nh tr\u01B0\u1EDBc t\u1EF1 do c\u1EE7a t\xE2m th\u1EA5t tr\xE1i v\xE0 v\xF9ng m\u1ECFm tim.",
      clinicalRelevance: "V\xF9ng c\u01A1 tim d\xE0y nh\u1EA5t c\u1EE7a th\u1EA5t tr\xE1i; NMCT th\xE0nh tr\u01B0\u1EDBc c\xF3 nguy c\u01A1 suy tim c\u1EA5p, r\u1ED1i lo\u1EA1n nh\u1ECBp th\u1EA5t v\xE0 v\u1EE1 tim cao nh\u1EA5t."
    },
    {
      id: "ANTEROSEPTAL",
      label: "Tr\u01B0\u1EDBc - V\xE1ch (V1, V2, V3, V4)",
      badge: "Tr\u01B0\u1EDBc V\xE1ch (4)",
      category: "anatomy",
      leads: ["V1", "V2", "V3", "V4"],
      coronaryVessel: "\u0110M Li\xEAn Th\u1EA5t Tr\u01B0\u1EDBc (LAD)",
      description: "Bao qu\xE1t to\xE0n b\u1ED9 v\xE1ch li\xEAn th\u1EA5t k\xE9o d\xE0i ra th\xE0nh tr\u01B0\u1EDBc th\u1EA5t tr\xE1i.",
      clinicalRelevance: "V\xF9ng gi\u1EA3i ph\u1EABu kinh \u0111i\u1EC3n t\u1ED5n th\u01B0\u01A1ng khi t\u1EAFc \u0110M LAD. ST ch\xEAnh l\xEAn v\xF2m cao k\xE8m m\u1EA5t s\xF3ng R (Poor R progression)."
    },
    {
      id: "LATERAL",
      label: "V\xF9ng Th\xE0nh B\xEAn (DI, aVL, V5, V6)",
      badge: "Th\xE0nh B\xEAn (4)",
      category: "anatomy",
      leads: ["I", "aVL", "V5", "V6"],
      coronaryVessel: "\u0110M M\u0169 (LCx) & Nh\xE1nh ch\xE9o (Diagonal) c\u1EE7a LAD",
      description: "Bao g\u1ED3m th\xE0nh b\xEAn cao (DI, aVL) v\xE0 th\xE0nh b\xEAn th\u1EA5p g\u1EA7n m\u1ECFm tim (V5, V6).",
      clinicalRelevance: "Ch\u1EA9n \u0111o\xE1n NMCT th\xE0nh b\xEAn \u0111\u01A1n thu\u1EA7n ho\u1EB7c ph\u1ED1i h\u1EE3p trong NMCT tr\u01B0\u1EDBc - b\xEAn di\u1EC7n r\u1ED9ng."
    }
  ];
  function generateLeadWaveformPoints(waveData, heartRate, durationSec = 2.5, options = {}) {
    const sampleRate = options.sampleRate || 350;
    const totalSamples = Math.floor(durationSec * sampleRate);
    const rrIntervalSec = 60 / Math.max(25, Math.min(240, heartRate));
    const points = [];
    const mmPerSec = 25;
    const mmPerMv = 10 * (options.voltageScale ?? 1);
    let cycleStartSec = 0.15;
    const cycles = [];
    while (cycleStartSec < durationSec + 1) {
      cycles.push(cycleStartSec);
      let currentRr = rrIntervalSec;
      if (options.rhythmVariance) {
        const jitter = (Math.sin(cycleStartSec * 3.7) + Math.cos(cycleStartSec * 7.1)) * 0.5;
        currentRr = rrIntervalSec * (1 + jitter * options.rhythmVariance);
      }
      cycleStartSec += currentRr;
    }
    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      const xMm = t * mmPerSec;
      let baseline = 0;
      if (options.baselineWander) {
        baseline = Math.sin(t * 0.8) * 0.5 + Math.cos(t * 0.3) * 0.3;
      }
      let vMv = 0;
      for (const cStart of cycles) {
        const dt = t - cStart;
        if (dt >= -0.15 && dt < rrIntervalSec) {
          vMv += calculateCycleVoltage(dt, waveData);
        }
      }
      const microFuzz = Math.sin(i * 1.3) * Math.cos(i * 2.7) * 0.015;
      const finalMv = vMv + baseline + microFuzz;
      const yMm = finalMv * mmPerMv;
      points.push({ x: xMm, y: yMm });
    }
    return points;
  }
  function calculateCycleVoltage(dt, w) {
    let v = 0;
    const pDur = w.pWave.dur || 0.08;
    const pAmp = w.pWave.amp || 0.15;
    if (dt >= 0 && dt < pDur) {
      const norm = dt / pDur;
      if (w.pWave.shape === "bifid") {
        v += pAmp * (Math.sin(norm * Math.PI * 2) * 0.4 + Math.sin(norm * Math.PI) * 0.7);
      } else if (w.pWave.shape === "peaked") {
        v += pAmp * Math.pow(Math.sin(norm * Math.PI), 1.6);
      } else if (w.pWave.shape === "inverted") {
        v -= Math.abs(pAmp) * Math.sin(norm * Math.PI);
      } else if (w.pWave.shape === "flat") {
        v += 0;
      } else {
        v += pAmp * Math.sin(norm * Math.PI);
      }
    }
    const prEnd = (w.pWave.dur || 0.08) + (w.prSegment.dur || 0.08);
    if (dt >= pDur && dt < prEnd && w.prSegment.deviation) {
      v += w.prSegment.deviation;
    }
    const qrsStart = prEnd;
    const qDur = w.qWave.dur || 0.02;
    const rDur = w.rWave.dur || 0.04;
    const sDur = w.sWave.dur || 0.03;
    if (dt >= qrsStart && dt < qrsStart + qDur) {
      const norm = (dt - qrsStart) / qDur;
      v += w.qWave.amp * Math.sin(norm * Math.PI);
    }
    const rStart = qrsStart + qDur;
    if (dt >= rStart && dt < rStart + rDur) {
      const norm = (dt - rStart) / rDur;
      let rVal = w.rWave.amp * Math.sin(norm * Math.PI);
      if (w.rWave.notched) {
        rVal *= 1 - 0.25 * Math.sin(norm * Math.PI * 3);
      }
      v += rVal;
    }
    const sStart = rStart + rDur;
    if (dt >= sStart && dt < sStart + sDur) {
      const norm = (dt - sStart) / sDur;
      v += w.sWave.amp * Math.sin(norm * Math.PI);
    }
    const rPrimeStart = sStart + sDur;
    if (w.rPrimeWave && w.rPrimeWave.amp > 0) {
      const rPrimeDur = w.rPrimeWave.dur || 0.04;
      if (dt >= rPrimeStart && dt < rPrimeStart + rPrimeDur) {
        const norm = (dt - rPrimeStart) / rPrimeDur;
        v += w.rPrimeWave.amp * Math.sin(norm * Math.PI);
      }
    }
    const qrsEnd = rPrimeStart + (w.rPrimeWave?.amp ? w.rPrimeWave.dur || 0.04 : 0);
    const stDur = 0.1;
    if (dt >= qrsEnd && dt < qrsEnd + stDur) {
      const norm = (dt - qrsEnd) / stDur;
      const elev = w.stSegment.elevation;
      if (w.stSegment.slope === "coved") {
        v += elev * Math.cos(norm * (Math.PI / 2));
      } else if (w.stSegment.slope === "scooped") {
        v += elev * Math.sin(norm * Math.PI);
      } else if (w.stSegment.slope === "downsloping") {
        v += elev * (1 - norm * 0.7);
      } else if (w.stSegment.slope === "upsloping") {
        v += elev * (0.3 + norm * 0.7);
      } else {
        v += elev;
      }
    }
    const tStart = qrsEnd + stDur;
    const tDur = w.tWave.dur || 0.16;
    if (dt >= tStart && dt < tStart + tDur) {
      const norm = (dt - tStart) / tDur;
      const tAmp = w.tWave.amp;
      if (w.tWave.shape === "peaked") {
        v += tAmp * Math.pow(Math.sin(norm * Math.PI), 2.2);
      } else if (w.tWave.shape === "inverted") {
        v += -Math.abs(tAmp) * Math.sin(norm * Math.PI);
      } else if (w.tWave.shape === "biphasic") {
        v += tAmp * Math.sin(norm * Math.PI * 2);
      } else if (w.tWave.shape === "hyperacute") {
        v += tAmp * 1.5 * Math.sin(norm * Math.PI);
      } else {
        const skewedNorm = Math.pow(norm, 0.85);
        v += tAmp * Math.sin(skewedNorm * Math.PI);
      }
    }
    const uStart = tStart + tDur + 0.02;
    const uDur = w.uWave?.dur || 0.08;
    if (w.uWave && w.uWave.amp !== 0 && dt >= uStart && dt < uStart + uDur) {
      const norm = (dt - uStart) / uDur;
      v += w.uWave.amp * Math.sin(norm * Math.PI);
    }
    return v;
  }
  function pointsToSvgPath(points, pixelsPerMmX, pixelsPerMmY, originYPx, offsetX = 0, maxPxX) {
    if (points.length === 0) return "";
    let d = "";
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const x = offsetX + p.x * pixelsPerMmX;
      if (maxPxX !== void 0 && x > maxPxX) {
        break;
      }
      const y = originYPx - p.y * pixelsPerMmY;
      if (i === 0) {
        d += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      } else {
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    }
    return d;
  }
  var audioCtx = null;
  function playQrsBeep(pitch = 880, volume = 0.05) {
    if (typeof window === "undefined") return;
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!audioCtx) {
        audioCtx = new AudioCtxClass();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-4, audioCtx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.075);
    } catch {
    }
  }
  function generateCalibrationPulse(pixelsPerMmX, pixelsPerMmY, originYPx, startX = 5) {
    const w = 5 * pixelsPerMmX;
    const h = 10 * pixelsPerMmY;
    const x0 = startX;
    const y0 = originYPx;
    const yTop = originYPx - h;
    return `M ${x0} ${y0} L ${x0 + 2} ${y0} L ${x0 + 2} ${yTop} L ${x0 + w - 2} ${yTop} L ${x0 + w - 2} ${y0} L ${x0 + w} ${y0}`;
  }
  function validateUserManualAnnotations(annotations, waveData, lead, heartRate, caseTitle) {
    if (annotations.length === 0) {
      return {
        overallScore: 0,
        totalAnnotations: 0,
        passedCount: 0,
        feedback: "Ch\u01B0a c\xF3 nh\xE3n s\xF3ng n\xE0o \u0111\u01B0\u1EE3c g\xE1n tr\xEAn chuy\u1EC3n \u0111\u1EA1o " + lead + ". Vui l\xF2ng ch\u1ECDn s\xF3ng (P, Q, R, S, J, T) v\xE0 nh\u1EA5p chu\u1ED9t l\xEAn \u0111\u01B0\u1EDDng bi\u1EC3u di\u1EC5n \u0111i\u1EC7n t\xE2m \u0111\u1ED3.",
        items: [],
        clinicalPearl: "Theo BS Nguy\u1EC5n T\xF4n Kinh Thi: X\xE1c \u0111\u1ECBnh ch\xEDnh x\xE1c s\xF3ng P v\xE0 ph\u1EE9c b\u1ED9 QRS l\xE0 ch\xECa kh\xF3a \u0111\u1EC3 \u0111\u1ECBnh danh m\u1ECDi r\u1ED1i lo\u1EA1n nh\u1ECBp tim.",
        guidanceChapter: "Ch\u01B0\u01A1ng 1 - Nguy\xEAn l\xFD c\xE1c s\xF3ng & kho\u1EA3ng th\u1EDDi gian c\u01A1 b\u1EA3n"
      };
    }
    const pDurMs = (waveData.pWave.dur || 0.08) * 1e3;
    const prSegmentMs = (waveData.prSegment.dur || 0.08) * 1e3;
    const prEndMs = pDurMs + prSegmentMs;
    const qDurMs = (waveData.qWave.dur || 0.02) * 1e3;
    const rDurMs = (waveData.rWave.dur || 0.04) * 1e3;
    const sDurMs = (waveData.sWave.dur || 0.03) * 1e3;
    const stDurMs = 100;
    const tDurMs = (waveData.tWave.dur || 0.16) * 1e3;
    const expectedLandmarks = {
      P: {
        expectedMs: pDurMs * 0.5,
        toleranceMs: 35,
        description: "\u0110\u1EC9nh s\xF3ng P (Kh\u1EED c\u1EF1c hai t\xE2m nh\u0129, \u0111i tr\u01B0\u1EDBc ph\u1EE9c b\u1ED9 QRS)"
      },
      Q: {
        expectedMs: prEndMs + qDurMs * 0.5,
        toleranceMs: 25,
        description: "S\xF3ng \xE2m \u0111\u1EA7u ti\xEAn c\u1EE7a ph\u1EE9c b\u1ED9 QRS (Kh\u1EED c\u1EF1c v\xE1ch li\xEAn th\u1EA5t t\u1EEB tr\xE1i sang ph\u1EA3i)"
      },
      R: {
        expectedMs: prEndMs + qDurMs + rDurMs * 0.5,
        toleranceMs: 30,
        description: "\u0110\u1EC9nh d\u01B0\u01A1ng l\u1EDBn nh\u1EA5t (Kh\u1EED c\u1EF1c t\xE2m th\u1EA5t)"
      },
      S: {
        expectedMs: prEndMs + qDurMs + rDurMs + sDurMs * 0.5,
        toleranceMs: 30,
        description: "S\xF3ng \xE2m theo sau s\xF3ng R (Kh\u1EED c\u1EF1c ph\u1EA7n \u0111\xE1y t\xE2m th\u1EA5t)"
      },
      J: {
        expectedMs: prEndMs + qDurMs + rDurMs + sDurMs,
        toleranceMs: 35,
        description: "\u0110i\u1EC3m J (Giao \u0111i\u1EC3m k\u1EBFt th\xFAc QRS v\xE0 b\u1EAFt \u0111\u1EA7u \u0111o\u1EA1n ST, then ch\u1ED1t ch\u1EA9n \u0111o\xE1n nh\u1ED3i m\xE1u c\u01A1 tim)"
      },
      T: {
        expectedMs: prEndMs + qDurMs + rDurMs + sDurMs + stDurMs + tDurMs * 0.6,
        toleranceMs: 65,
        description: "\u0110\u1EC9nh s\xF3ng T (Giai \u0111o\u1EA1n t\xE1i c\u1EF1c nhanh c\u1EE7a t\xE2m th\u1EA5t)"
      },
      U: {
        expectedMs: prEndMs + qDurMs + rDurMs + sDurMs + stDurMs + tDurMs + 80,
        toleranceMs: 60,
        description: "S\xF3ng U (T\xE1i c\u1EF1c m\u1EA1ng Purkinje ho\u1EB7c c\u01A1 nh\xFA)"
      }
    };
    const validatedItems = [];
    let totalScore = 0;
    let passed = 0;
    for (const ann of annotations) {
      const landmark = expectedLandmarks[ann.waveType];
      if (!landmark) continue;
      const diff = Math.abs(ann.timeMs - landmark.expectedMs);
      let status = "MISPLACED";
      let score = 30;
      let message = "";
      let morphologyEvaluation = "";
      if (diff <= landmark.toleranceMs) {
        status = "EXACT";
        score = 100;
        passed++;
        message = `Ch\xEDnh x\xE1c tuy\u1EC7t \u0111\u1ED1i! V\u1ECB tr\xED t\u1EA1i ${ann.timeMs}ms tr\xF9ng kh\u1EDBp ho\xE0n h\u1EA3o v\u1EDBi ${landmark.description} (l\u1EC7ch ${diff}ms).`;
      } else if (diff <= landmark.toleranceMs * 2.2) {
        status = "CLOSE";
        score = 75;
        passed++;
        message = `Kh\xE1 chu\u1EA9n x\xE1c! V\u1ECB tr\xED t\u1EA1i ${ann.timeMs}ms l\u1EC7ch ${diff}ms so v\u1EDBi \u0111\u1EC9nh l\xFD thuy\u1EBFt (${Math.round(landmark.expectedMs)}ms).`;
      } else {
        status = "MISPLACED";
        score = Math.max(10, 50 - Math.round(diff * 0.2));
        message = `Ch\u01B0a ch\xEDnh x\xE1c: V\u1ECB tr\xED \u0111\u01B0\u1EE3c ch\u1EA5m t\u1EA1i ${ann.timeMs}ms l\u1EC7ch t\u1EDBi ${diff}ms so v\u1EDBi v\u1ECB tr\xED chu\u1EA9n (${Math.round(landmark.expectedMs)}ms). C\xF3 th\u1EC3 b\u1EA1n \u0111ang nh\u1EA7m sang s\xF3ng k\u1EBF ti\u1EBFp.`;
      }
      if (ann.waveType === "R") {
        morphologyEvaluation = `\u0110\u1EA1o tr\xECnh ${lead}: S\xF3ng R cao ${waveData.rWave.amp.toFixed(2)}mV. Tr\u1EE5c kh\u1EED c\u1EF1c b\xECnh th\u01B0\u1EDDng h\u01B0\u1EDBng t\u1EEB \u0111\xE1y \u0111\u1EBFn m\u1ECFm.`;
      } else if (ann.waveType === "P") {
        morphologyEvaluation = `S\xF3ng P th\u1EDDi gian ${pDurMs}ms (< 120ms chu\u1EA9n). Chi\u1EC1u cao ${waveData.pWave.amp.toFixed(2)}mV.`;
      } else if (ann.waveType === "J") {
        const elev = waveData.stSegment.elevation;
        morphologyEvaluation = `\u0110i\u1EC3m J t\u1EA1i ${lead}: \u0110o\u1EA1n ST \u0111ang ${elev > 0 ? `ch\xEAnh l\xEAn +${elev.toFixed(1)}mV` : elev < 0 ? `ch\xEAnh xu\u1ED1ng ${elev.toFixed(1)}mV` : "\u0111\u1EB3ng \u0111i\u1EC7n 0mV"}.`;
      } else if (ann.waveType === "T") {
        morphologyEvaluation = `S\xF3ng T h\xECnh th\xE1i ${waveData.tWave.shape || "b\xECnh th\u01B0\u1EDDng"}, bi\xEAn \u0111\u1ED9 ${waveData.tWave.amp.toFixed(2)}mV.`;
      } else {
        morphologyEvaluation = `${landmark.description}.`;
      }
      totalScore += score;
      validatedItems.push({
        annotationId: ann.id,
        waveType: ann.waveType,
        lead: ann.lead,
        status,
        score,
        actualTimeMs: ann.timeMs,
        expectedTimeMs: Math.round(landmark.expectedMs),
        message,
        morphologyEvaluation
      });
    }
    const overallScore = Math.round(totalScore / annotations.length);
    let feedback = "";
    if (overallScore >= 90) {
      feedback = `Xu\u1EA5t s\u1EAFc (${overallScore}/100)! B\u1EA1n c\xF3 k\u1EF9 n\u0103ng nh\u1EADn di\u1EC7n m\u1ED1c s\xF3ng ECG r\u1EA5t v\u1EEFng v\xE0ng v\xE0 chu\u1EA9n x\xE1c.`;
    } else if (overallScore >= 70) {
      feedback = `T\u1ED1t (${overallScore}/100)! \u0110a s\u1ED1 c\xE1c s\xF3ng c\u01A1 b\u1EA3n (P, R, T) \u0111\xE3 \u0111\u01B0\u1EE3c g\xE1n nh\xE3n \u0111\xFAng v\u1ECB tr\xED. Ch\xFA \xFD tinh ch\u1EC9nh th\xEAm m\u1ED1c \u0111i\u1EC3m J v\xE0 ch\xE2n s\xF3ng Q/S.`;
    } else {
      feedback = `C\u1EA7n r\xE8n luy\u1EC7n th\xEAm (${overallScore}/100). H\xE3y \u0111\u1ED1i chi\u1EBFu l\u1EA1i kho\u1EA3ng th\u1EDDi gian PR (120-200ms) v\xE0 th\u1EDDi gian QRS (< 120ms) \u0111\u1EC3 nh\u1EADn di\u1EC7n \u0111\xFAng v\u1ECB tr\xED t\u1EEBng s\xF3ng.`;
    }
    return {
      overallScore,
      totalAnnotations: annotations.length,
      passedCount: passed,
      feedback,
      items: validatedItems,
      clinicalPearl: `L\u1EDDi khuy\xEAn l\xE2m s\xE0ng (${caseTitle}): Theo t\xE0i li\u1EC7u BS Nguy\u1EC5n T\xF4n Kinh Thi, vi\u1EC7c x\xE1c \u0111\u1ECBnh \u0111i\u1EC3m J (J-point) ngay sau ph\u1EE9c b\u1ED9 QRS l\xE0 m\u1EA5u ch\u1ED1t \u0111\u1EC3 ph\xE2n bi\u1EC7t nh\u1ED3i m\xE1u c\u01A1 tim ST ch\xEAnh l\xEAn (STEMI) v\u1EDBi h\u1ED9i ch\u1EE9ng t\xE1i c\u1EF1c s\u1EDBm l\xE0nh t\xEDnh ho\u1EB7c bloc nh\xE1nh tr\xE1i.`,
      guidanceChapter: "Ch\u01B0\u01A1ng 2 - \u0110\u1ECBnh v\u1ECB \u0111i\u1EC3m J v\xE0 ph\xE2n t\xEDch bi\u1EBFn \u0111\u1ED5i \u0111o\u1EA1n ST-T"
    };
  }

  // src/content/knowledge-vault/cdss/ecg/ecg-canvas-renderer.ts
  var ALL_12_LEADS = [
    "I",
    "II",
    "III",
    "aVR",
    "aVL",
    "aVF",
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6"
  ];
  var EcgCanvasRenderer = class {
    container;
    canvas;
    ctx;
    currentCase;
    options;
    // Caliper & Annotation state
    caliper = {
      active: false,
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0,
      deltaMs: 0,
      deltaBpm: 0,
      deltaMv: 0,
      lead: "All"
    };
    activeWaveAnnotation = null;
    manualAnnotations = [];
    lastValidationReport = null;
    // Live simulation & Audio
    animationFrameId = null;
    sweepProgress = 0;
    // 0.0 to 1.0
    lastBeepTime = 0;
    isDraggingCaliper = false;
    // Pixels to MM scaling (standard 1mm = ~3.78px on 96dpi, configured for crisp rendering)
    PIXELS_PER_MM = 3.7795;
    // ~96 DPI screen standard
    constructor(containerId, initialCase, opts = {}) {
      const el = document.getElementById(containerId);
      if (!el) throw new Error(`Container #${containerId} not found`);
      this.container = el;
      this.currentCase = initialCase;
      this.options = {
        theme: opts.theme || "paper",
        paperSpeed: opts.paperSpeed || 25,
        voltageGain: opts.voltageGain || 1,
        layoutMode: opts.layoutMode || "3x4",
        selectedLead: opts.selectedLead || "II",
        filterMode: opts.filterMode || "ALL",
        showGrid: opts.showGrid !== void 0 ? opts.showGrid : true,
        isLiveMode: opts.isLiveMode || false,
        isAudioMuted: opts.isAudioMuted !== void 0 ? opts.isAudioMuted : true
      };
      this.canvas = document.createElement("canvas");
      this.canvas.className = "ecg-main-canvas";
      this.canvas.style.display = "block";
      this.canvas.style.width = "100%";
      this.canvas.style.cursor = "crosshair";
      this.container.appendChild(this.canvas);
      const context = this.canvas.getContext("2d");
      if (!context) throw new Error("Cannot get 2D context");
      this.ctx = context;
      this.setupEventListeners();
      this.resizeCanvas();
      this.startLoop();
    }
    setCase(newCase) {
      this.currentCase = newCase;
      this.manualAnnotations = [];
      this.lastValidationReport = null;
      this.render();
    }
    setOptions(newOpts) {
      this.options = { ...this.options, ...newOpts };
      this.resizeCanvas();
      this.render();
    }
    getOptions() {
      return { ...this.options };
    }
    toggleLive() {
      this.options.isLiveMode = !this.options.isLiveMode;
      if (!this.options.isLiveMode) {
        this.sweepProgress = 1;
      }
      return this.options.isLiveMode;
    }
    toggleMute() {
      this.options.isAudioMuted = !this.options.isAudioMuted;
      return this.options.isAudioMuted;
    }
    toggleCaliper() {
      this.caliper.active = !this.caliper.active;
      this.activeWaveAnnotation = null;
      this.render();
      return this.caliper.active;
    }
    setAnnotationMode(wave) {
      this.activeWaveAnnotation = wave;
      if (wave) {
        this.caliper.active = false;
      }
      this.render();
    }
    clearAnnotations() {
      this.manualAnnotations = [];
      this.lastValidationReport = null;
      this.render();
    }
    resizeCanvas() {
      const rect = this.container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(700, rect.width || 1e3);
      let height = 650;
      if (this.options.layoutMode === "3x4") height = 580;
      else if (this.options.layoutMode === "6x2") height = 750;
      else if (this.options.layoutMode === "12x1") height = 1400;
      else if (this.options.layoutMode === "single") height = 480;
      this.canvas.width = width * dpr;
      this.canvas.height = height * dpr;
      this.canvas.style.height = `${height}px`;
      this.ctx.resetTransform();
      this.ctx.scale(dpr, dpr);
      this.render();
    }
    setupEventListeners() {
      window.addEventListener("resize", () => this.resizeCanvas());
      this.canvas.addEventListener("mousedown", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (this.caliper.active) {
          this.isDraggingCaliper = true;
          this.caliper.startX = x;
          this.caliper.startY = y;
          this.caliper.endX = x;
          this.caliper.endY = y;
          this.caliper.deltaMs = 0;
          this.caliper.deltaBpm = 0;
          this.caliper.deltaMv = 0;
          this.render();
          return;
        }
        if (this.activeWaveAnnotation) {
          this.placeAnnotation(x, y, this.activeWaveAnnotation);
        }
      });
      this.canvas.addEventListener("mousemove", (e) => {
        if (this.caliper.active && this.isDraggingCaliper) {
          const rect = this.canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          this.caliper.endX = x;
          this.caliper.endY = y;
          const diffX = Math.abs(x - this.caliper.startX);
          const diffY = Math.abs(y - this.caliper.startY);
          const diffXMm = diffX / this.PIXELS_PER_MM;
          const timeSec = diffXMm / this.options.paperSpeed;
          this.caliper.deltaMs = Math.round(timeSec * 1e3);
          this.caliper.deltaBpm = this.caliper.deltaMs > 0 ? Math.round(6e4 / this.caliper.deltaMs) : 0;
          const diffYMm = diffY / this.PIXELS_PER_MM;
          this.caliper.deltaMv = Number((diffYMm / (10 * this.options.voltageGain)).toFixed(2));
          this.render();
        }
      });
      window.addEventListener("mouseup", () => {
        if (this.isDraggingCaliper) {
          this.isDraggingCaliper = false;
          this.render();
        }
      });
    }
    placeAnnotation(x, y, wave) {
      const lead = this.options.selectedLead || "II";
      const pxPerMm = this.PIXELS_PER_MM;
      const timeMs = Math.round(x % 300 / pxPerMm / this.options.paperSpeed * 1e3);
      const voltageMv = Number((y / pxPerMm / (10 * this.options.voltageGain)).toFixed(2));
      const ann = {
        id: "ann_" + Date.now(),
        lead,
        waveType: wave,
        x,
        y,
        timeMs,
        voltageMv,
        createdTime: Date.now()
      };
      this.manualAnnotations.push(ann);
      const leadData = this.currentCase.leadsData[lead];
      this.lastValidationReport = validateUserManualAnnotations(
        this.manualAnnotations.filter((a) => a.lead === lead),
        leadData,
        lead,
        this.currentCase.metrics.heartRate,
        this.currentCase.title
      );
      this.render();
      const event = new CustomEvent("ecg-annotation-update", {
        detail: { report: this.lastValidationReport, annotations: this.manualAnnotations }
      });
      window.dispatchEvent(event);
    }
    startLoop() {
      let lastTime = performance.now();
      const loop = (now) => {
        if (this.options.isLiveMode) {
          const elapsed = now - lastTime;
          const cycleDurationMs = 2500 * (25 / this.options.paperSpeed);
          this.sweepProgress = (this.sweepProgress + elapsed / cycleDurationMs) % 1;
          const rrIntervalMs = 60 / Math.max(30, this.currentCase.metrics.heartRate) * 1e3;
          if (now - this.lastBeepTime >= rrIntervalMs) {
            if (!this.options.isAudioMuted) {
              playQrsBeep(this.currentCase.metrics.heartRate > 100 ? 950 : 840, 0.05);
            }
            this.lastBeepTime = now;
          }
          this.render();
        }
        lastTime = now;
        this.animationFrameId = requestAnimationFrame(loop);
      };
      this.animationFrameId = requestAnimationFrame(loop);
    }
    render() {
      const dpr = window.devicePixelRatio || 1;
      const width = this.canvas.width / dpr;
      const height = this.canvas.height / dpr;
      this.ctx.clearRect(0, 0, width, height);
      this.drawBackground(width, height);
      if (this.options.showGrid) {
        this.drawGrid(width, height);
      }
      if (this.options.layoutMode === "3x4") {
        this.render3x4Layout(width, height);
      } else if (this.options.layoutMode === "6x2") {
        this.render6x2Layout(width, height);
      } else if (this.options.layoutMode === "12x1") {
        this.render12x1Layout(width, height);
      } else {
        this.renderSingleLeadLayout(width, height);
      }
      this.drawAnnotations();
      if (this.caliper.active) {
        this.drawCaliper();
      }
      this.drawFooterTechnicalSpecs(width, height);
    }
    drawBackground(w, h) {
      if (this.options.theme === "monitor") {
        this.ctx.fillStyle = "#021a12";
      } else if (this.options.theme === "amber") {
        this.ctx.fillStyle = "#18181b";
      } else {
        this.ctx.fillStyle = "#fff9fa";
      }
      this.ctx.fillRect(0, 0, w, h);
    }
    drawGrid(w, h) {
      const pxPerMm = this.PIXELS_PER_MM;
      const minorPx = pxPerMm;
      const majorPx = pxPerMm * 5;
      let minorColor = "rgba(244, 114, 182, 0.28)";
      let majorColor = "rgba(236, 72, 153, 0.65)";
      if (this.options.theme === "monitor") {
        minorColor = "rgba(6, 78, 59, 0.4)";
        majorColor = "rgba(16, 185, 129, 0.7)";
      } else if (this.options.theme === "amber") {
        minorColor = "rgba(120, 53, 15, 0.4)";
        majorColor = "rgba(245, 158, 11, 0.7)";
      }
      this.ctx.lineWidth = 0.5;
      this.ctx.strokeStyle = minorColor;
      this.ctx.beginPath();
      for (let x = 0; x <= w; x += minorPx) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += minorPx) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(w, y);
      }
      this.ctx.stroke();
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = majorColor;
      this.ctx.beginPath();
      for (let x = 0; x <= w; x += majorPx) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += majorPx) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(w, y);
      }
      this.ctx.stroke();
    }
    getSignalColor() {
      if (this.options.theme === "monitor") return "#22c55e";
      if (this.options.theme === "amber") return "#f59e0b";
      return "#0f172a";
    }
    /**
     * Layout 3x4: 12 Leads in 4 columns × 3 rows + continuous bottom Rhythm Strip (DII)
     */
    render3x4Layout(w, h) {
      const cols = 4;
      const rows = 3;
      const rhythmHeight = 110;
      const gridHeight = h - rhythmHeight;
      const colWidth = w / cols;
      const rowHeight = gridHeight / rows;
      const layoutGrid = [
        ["I", "aVR", "V1", "V4"],
        ["II", "aVL", "V2", "V5"],
        ["III", "aVF", "V3", "V6"]
      ];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const lead = layoutGrid[r][c];
          const originX = c * colWidth;
          const originY = r * rowHeight + rowHeight * 0.55;
          this.drawSingleLeadSegment(lead, originX, originY, colWidth, rowHeight, 2.5);
        }
      }
      const rhythmOriginY = gridHeight + rhythmHeight * 0.55;
      this.drawSingleLeadSegment("II", 0, rhythmOriginY, w, rhythmHeight, 10, "DII K\xE9o D\xE0i (Continuous Rhythm Strip)");
    }
    /**
     * Layout 6x2: 6 Limb leads on Left, 6 Chest leads on Right
     */
    render6x2Layout(w, h) {
      const colWidth = w / 2;
      const rowHeight = h / 6;
      const limbLeads = ["I", "II", "III", "aVR", "aVL", "aVF"];
      const chestLeads = ["V1", "V2", "V3", "V4", "V5", "V6"];
      limbLeads.forEach((lead, r) => {
        this.drawSingleLeadSegment(lead, 0, r * rowHeight + rowHeight * 0.55, colWidth, rowHeight, 5);
      });
      chestLeads.forEach((lead, r) => {
        this.drawSingleLeadSegment(lead, colWidth, r * rowHeight + rowHeight * 0.55, colWidth, rowHeight, 5);
      });
    }
    /**
     * Layout 12x1: All 12 leads stacked vertically
     */
    render12x1Layout(w, h) {
      const rowHeight = h / 12;
      ALL_12_LEADS.forEach((lead, r) => {
        this.drawSingleLeadSegment(lead, 0, r * rowHeight + rowHeight * 0.55, w, rowHeight, 10);
      });
    }
    /**
     * Layout Single: Magnified single lead
     */
    renderSingleLeadLayout(w, h) {
      const lead = this.options.selectedLead || "II";
      this.drawSingleLeadSegment(lead, 0, h * 0.5, w, h, 10, `Chuy\u1EC3n \u0110\u1EA1o ${lead} (Ph\xF3ng \u0110\u1EA1i Chi Ti\u1EBFt)`);
    }
    drawSingleLeadSegment(lead, originX, originY, width, height, durationSec, customLabel) {
      const leadData = this.currentCase.leadsData[lead];
      if (!leadData) return;
      const pxPerMm = this.PIXELS_PER_MM;
      const signalColor = this.getSignalColor();
      this.ctx.fillStyle = signalColor;
      this.ctx.font = 'bold 12px "JetBrains Mono", monospace';
      this.ctx.fillText(customLabel || lead, originX + 10, originY - height * 0.35);
      const calPulsePath = generateCalibrationPulse(pxPerMm, pxPerMm, originY, originX + 12);
      this.drawSvgPathString(calPulsePath, signalColor, 1.4);
      const wavePoints = generateLeadWaveformPoints(
        leadData,
        this.currentCase.metrics.heartRate,
        durationSec,
        {
          sampleRate: 350,
          voltageScale: this.options.voltageGain,
          rhythmVariance: String(this.currentCase.metrics.regularity).includes("Lo\u1EA1n nh\u1ECBp") ? 0.35 : 0
        }
      );
      let maxPx = void 0;
      if (this.options.isLiveMode) {
        maxPx = originX + width * this.sweepProgress;
      }
      const waveformPath = pointsToSvgPath(
        wavePoints,
        pxPerMm,
        pxPerMm,
        originY,
        originX + 12 + 5 * pxPerMm,
        // Offset after calibration pulse
        maxPx
      );
      this.drawSvgPathString(waveformPath, signalColor, 1.6);
      if (this.options.isLiveMode && maxPx !== void 0 && maxPx >= originX && maxPx <= originX + width) {
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(maxPx, originY - height * 0.45);
        this.ctx.lineTo(maxPx, originY + height * 0.45);
        this.ctx.stroke();
      }
    }
    drawSvgPathString(pathStr, strokeColor, strokeWidth) {
      if (!pathStr) return;
      try {
        const p = new Path2D(pathStr);
        this.ctx.strokeStyle = strokeColor;
        this.ctx.lineWidth = strokeWidth;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.stroke(p);
      } catch {
      }
    }
    drawAnnotations() {
      for (const ann of this.manualAnnotations) {
        this.ctx.fillStyle = "#ef4444";
        this.ctx.beginPath();
        this.ctx.arc(ann.x, ann.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "bold 10px sans-serif";
        this.ctx.fillText(ann.waveType, ann.x - 3, ann.y + 3);
      }
    }
    drawCaliper() {
      const c = this.caliper;
      if (c.startX === c.endX && c.startY === c.endY) return;
      this.ctx.save();
      this.ctx.strokeStyle = "#2563eb";
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.beginPath();
      this.ctx.moveTo(c.startX, 0);
      this.ctx.lineTo(c.startX, this.canvas.height);
      this.ctx.moveTo(c.endX, 0);
      this.ctx.lineTo(c.endX, this.canvas.height);
      this.ctx.stroke();
      const midX = (c.startX + c.endX) / 2;
      const midY = (c.startY + c.endY) / 2;
      const badgeText = `${c.deltaMs} ms | ${c.deltaBpm} bpm | ${c.deltaMv} mV`;
      this.ctx.font = 'bold 12px "JetBrains Mono", monospace';
      const textWidth = this.ctx.measureText(badgeText).width;
      this.ctx.setLineDash([]);
      this.ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      this.ctx.fillRect(midX - textWidth / 2 - 8, midY - 14, textWidth + 16, 26);
      this.ctx.strokeStyle = "#38bdf8";
      this.ctx.strokeRect(midX - textWidth / 2 - 8, midY - 14, textWidth + 16, 26);
      this.ctx.fillStyle = "#38bdf8";
      this.ctx.fillText(badgeText, midX - textWidth / 2, midY + 4);
      this.ctx.restore();
    }
    drawFooterTechnicalSpecs(w, h) {
      this.ctx.fillStyle = this.options.theme === "paper" ? "#64748b" : "#94a3b8";
      this.ctx.font = '11px "JetBrains Mono", monospace';
      const spec = `25 mm/s, 10 mm/mV (Gain: ${this.options.voltageGain}x) | Filter: 0.05-150Hz | CliniPortal ECG High-Fidelity Engine`;
      this.ctx.fillText(spec, 15, h - 10);
    }
    destroy() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
    }
  };

  // src/content/knowledge-vault/cdss/ecg/ecg-ui.ts
  var EcgCDSSController = class {
    container;
    currentCase;
    renderer = null;
    currentTab = "diagnosis";
    constructor(containerId) {
      const el = document.getElementById(containerId);
      if (!el) throw new Error(`Container #${containerId} not found`);
      this.container = el;
      this.currentCase = ECG_CASES[0];
      this.init();
    }
    init() {
      this.renderLayout();
      this.initCanvasRenderer();
      this.attachEventListeners();
      this.updatePatientInfo();
      this.updateDiagnosticPanel();
    }
    renderLayout() {
      this.container.innerHTML = `
      <div class="ecg-cdss-app">
        <!-- Top Toolbar Card -->
        <header class="ecg-top-card">
          <div class="ecg-header-main">
            <div class="ecg-badge-group">
              <span class="ecg-badge ecg-badge--cardio"><i class="fa-solid fa-heart-pulse"></i> CDSS \u0110i\u1EC7n T\xE2m \u0110\u1ED3 12 \u0110\u1EA1o Tr\xECnh</span>
              <span class="ecg-badge ecg-badge--live" id="live-indicator"><i class="fa-solid fa-circle"></i> S\u1EB5n s\xE0ng</span>
              <span class="ecg-badge ecg-badge--secondary" id="case-severity-badge">M\u1EE9c \u0111\u1ED9: ${this.currentCase.severity}</span>
            </div>
            <h1 class="ecg-app-title">
              H\u1EC7 Th\u1ED1ng Ph\xE2n T\xEDch & H\u1ED7 Tr\u1EE3 Ch\u1EA9n \u0110o\xE1n ECG 12 Chuy\u1EC3n \u0110\u1EA1o
            </h1>
          </div>

          <!-- Case Selector & Quick Actions -->
          <div class="ecg-case-selector-wrap">
            <label for="ecg-case-select"><i class="fa-solid fa-folder-open"></i> Th\u01B0 Vi\u1EC7n Ca L\xE2m S\xE0ng:</label>
            <select id="ecg-case-select" class="ecg-select">
              ${ECG_CASES.map((c) => `
                <option value="${c.id}" ${c.id === this.currentCase.id ? "selected" : ""}>
                  [${c.category}] ${c.title} \u2014 ${c.severity}
                </option>
              `).join("")}
            </select>
            <button id="btn-export-soap" class="ecg-btn ecg-btn--primary">
              <i class="fa-solid fa-notes-medical"></i> Ch\xE9p V\xE0o B\u1EC7nh \xC1n
            </button>
          </div>
        </header>

        <!-- Patient Info Card -->
        <section class="ecg-patient-banner" id="ecg-patient-banner">
          <!-- Dynamic Patient Info -->
        </section>

        <!-- Canvas Toolbar (Controls, Caliper, Speed, Theme) -->
        <div class="ecg-canvas-toolbar">
          <div class="ecg-tool-group">
            <button id="btn-toggle-live" class="ecg-tool-btn" title="M\xF4 ph\u1ECFng m\xE1y monitor th\u1EDDi gian th\u1EF1c">
              <i class="fa-solid fa-play"></i> <span>M\xF4 Ph\u1ECFng Monitor</span>
            </button>
            <button id="btn-toggle-audio" class="ecg-tool-btn" title="B\u1EADt/T\u1EAFt \xE2m thanh nh\u1ECBp tim QRS">
              <i class="fa-solid fa-volume-xmark"></i> <span>\xC2m Nh\u1ECBp Tim</span>
            </button>
            <button id="btn-toggle-caliper" class="ecg-tool-btn" title="B\u1EADt th\u01B0\u1EDBc \u0111o Caliper \u0111i\u1EC7n t\u1EED">
              <i class="fa-solid fa-ruler-combined"></i> <span>Th\u01B0\u1EDBc Caliper</span>
            </button>
          </div>

          <div class="ecg-tool-group">
            <span class="ecg-tool-label">B\u1ED1 c\u1EE5c:</span>
            <select id="select-layout" class="ecg-select-sm">
              <option value="3x4" selected>Ti\xEAu chu\u1EA9n 3x4 + DII k\xE9o d\xE0i</option>
              <option value="6x2">6 Chi / 6 Tr\u01B0\u1EDBc tim (6x2)</option>
              <option value="12x1">D\u1ECDc 12 \u0111\u1EA1o tr\xECnh</option>
              <option value="single">Ph\xF3ng \u0111\u1EA1i 1 \u0111\u1EA1o tr\xECnh</option>
            </select>
          </div>

          <div class="ecg-tool-group">
            <span class="ecg-tool-label">Giao di\u1EC7n:</span>
            <select id="select-theme" class="ecg-select-sm">
              <option value="paper" selected>Gi\u1EA5y H\u1ED3ng ECG L\xE2m S\xE0ng</option>
              <option value="monitor">Monitor H\u1ED3i S\u1EE9c (Xanh Neon)</option>
              <option value="amber">Monitor CRT H\u1ED5 Ph\xE1ch</option>
            </select>
          </div>

          <div class="ecg-tool-group">
            <span class="ecg-tool-label">Bi\xEAn \u0111\u1ED9:</span>
            <select id="select-gain" class="ecg-select-sm">
              <option value="0.5">0.5x (5mm/mV)</option>
              <option value="1.0" selected>1.0x (10mm/mV chu\u1EA9n)</option>
              <option value="2.0">2.0x (20mm/mV)</option>
            </select>
          </div>
        </div>

        <!-- Annotation Tools Strip -->
        <div class="ecg-annotation-toolbar">
          <span class="ecg-ann-label"><i class="fa-solid fa-tags"></i> Ch\u1EA5m \u0110i\u1EC3m M\u1ED1c S\xF3ng:</span>
          <div class="ecg-ann-btn-group">
            <button class="ecg-ann-btn" data-wave="P">S\xF3ng P</button>
            <button class="ecg-ann-btn" data-wave="Q">S\xF3ng Q</button>
            <button class="ecg-ann-btn" data-wave="R">\u0110\u1EC9nh R</button>
            <button class="ecg-ann-btn" data-wave="S">S\xF3ng S</button>
            <button class="ecg-ann-btn" data-wave="J">\u0110i\u1EC3m J</button>
            <button class="ecg-ann-btn" data-wave="T">S\xF3ng T</button>
            <button class="ecg-ann-btn" data-wave="U">S\xF3ng U</button>
            <button id="btn-clear-ann" class="ecg-ann-btn ecg-ann-btn--clear" title="X\xF3a to\xE0n b\u1ED9 nh\xE3n \u0111\xE3 ch\u1EA5m">
              <i class="fa-solid fa-trash-can"></i> X\xF3a Nh\xE3n
            </button>
          </div>
        </div>

        <!-- Canvas Container -->
        <div class="ecg-canvas-wrapper" id="ecg-canvas-mount-point">
          <!-- Canvas injected here -->
        </div>

        <!-- Clinical Diagnostic & Evaluation Subsystem -->
        <section class="ecg-diagnostic-section">
          <!-- Navigation Tabs -->
          <div class="ecg-diag-tabs">
            <button class="ecg-tab-btn active" data-tab="diagnosis">
              <i class="fa-solid fa-stethoscope"></i> Ch\u1EA9n \u0110o\xE1n & Khuy\u1EBFn C\xE1o L\xE2m S\xE0ng
            </button>
            <button class="ecg-tab-btn" data-tab="criteria">
              <i class="fa-solid fa-calculator"></i> Th\u01B0\u1EDBc \u0110o Ch\u1EC9 S\u1ED1 & Ti\xEAu Chu\u1EA9n \u0110i\u1EC7n Sinh L\xFD
            </button>
            <button class="ecg-tab-btn" data-tab="anatomy">
              <i class="fa-solid fa-diagram-project"></i> Gi\u1EA3i Ph\u1EABu Chuy\u1EC3n \u0110\u1EA1o & Nh\xE1nh M\u1EA1ch V\xE0nh
            </button>
            <button class="ecg-tab-btn" data-tab="annotation">
              <i class="fa-solid fa-award"></i> Ch\u1EA5m M\u1ED1c S\xF3ng
            </button>
            <button class="ecg-tab-btn" data-tab="guide">
              <i class="fa-solid fa-book-medical"></i> C\u1EA9m Nang 10 B\u01B0\u1EDBc & Kinh \u0110i\u1EC3n ECG
            </button>
          </div>

          <!-- Tab Content Container -->
          <div class="ecg-tab-content" id="ecg-tab-content">
            <!-- Dynamic Tab Content -->
          </div>
        </section>

        <!-- Toast -->
        <div id="ecg-toast" class="ecg-toast" style="display:none;"></div>
      </div>
    `;
    }
    initCanvasRenderer() {
      this.renderer = new EcgCanvasRenderer("ecg-canvas-mount-point", this.currentCase, {
        theme: "paper",
        layoutMode: "3x4",
        paperSpeed: 25,
        voltageGain: 1,
        isLiveMode: false,
        isAudioMuted: true
      });
      window.addEventListener("ecg-annotation-update", (e) => {
        const report = e.detail?.report;
        if (report && this.currentTab === "annotation") {
          this.renderAnnotationTab(report);
        }
      });
    }
    attachEventListeners() {
      const caseSelect = document.getElementById("ecg-case-select");
      if (caseSelect) {
        caseSelect.addEventListener("change", () => {
          const found = ECG_CASES.find((c) => c.id === caseSelect.value);
          if (found) {
            this.currentCase = found;
            this.renderer?.setCase(found);
            this.updatePatientInfo();
            this.updateDiagnosticPanel();
            this.showToast(`\u0110\xE3 t\u1EA3i ca b\u1EC7nh: ${found.title}`);
          }
        });
      }
      const btnLive = document.getElementById("btn-toggle-live");
      if (btnLive) {
        btnLive.addEventListener("click", () => {
          if (!this.renderer) return;
          const isLive = this.renderer.toggleLive();
          btnLive.classList.toggle("active", isLive);
          btnLive.innerHTML = isLive ? `<i class="fa-solid fa-pause"></i> <span>T\u1EA1m D\u1EEBng</span>` : `<i class="fa-solid fa-play"></i> <span>M\xF4 Ph\u1ECFng Monitor</span>`;
          const ind = document.getElementById("live-indicator");
          if (ind) {
            ind.className = `ecg-badge ${isLive ? "ecg-badge--danger" : "ecg-badge--live"}`;
            ind.innerHTML = isLive ? `<i class="fa-solid fa-heartbeat fa-beat"></i> \u0110ANG CH\u1EA0Y MONITOR` : `<i class="fa-solid fa-circle"></i> S\u1EB5n s\xE0ng`;
          }
        });
      }
      const btnAudio = document.getElementById("btn-toggle-audio");
      if (btnAudio) {
        btnAudio.addEventListener("click", () => {
          if (!this.renderer) return;
          const isMuted = this.renderer.toggleMute();
          btnAudio.classList.toggle("active", !isMuted);
          btnAudio.innerHTML = !isMuted ? `<i class="fa-solid fa-volume-high"></i> <span>\xC2m Thanh: B\u1EADt</span>` : `<i class="fa-solid fa-volume-xmark"></i> <span>\xC2m Nh\u1ECBp Tim</span>`;
        });
      }
      const btnCaliper = document.getElementById("btn-toggle-caliper");
      if (btnCaliper) {
        btnCaliper.addEventListener("click", () => {
          if (!this.renderer) return;
          const isActive = this.renderer.toggleCaliper();
          btnCaliper.classList.toggle("active", isActive);
          if (isActive) {
            this.showToast("Th\u01B0\u1EDBc Caliper \u0111\xE3 b\u1EADt: Nh\u1EA5p v\xE0 k\xE9o tr\xEAn gi\u1EA5y ECG \u0111\u1EC3 \u0111o kho\u1EA3ng th\u1EDDi gian v\xE0 bi\xEAn \u0111\u1ED9.");
          }
        });
      }
      const selectLayout = document.getElementById("select-layout");
      if (selectLayout) {
        selectLayout.addEventListener("change", () => {
          this.renderer?.setOptions({ layoutMode: selectLayout.value });
        });
      }
      const selectTheme = document.getElementById("select-theme");
      if (selectTheme) {
        selectTheme.addEventListener("change", () => {
          this.renderer?.setOptions({ theme: selectTheme.value });
        });
      }
      const selectGain = document.getElementById("select-gain");
      if (selectGain) {
        selectGain.addEventListener("change", () => {
          this.renderer?.setOptions({ voltageGain: parseFloat(selectGain.value) });
        });
      }
      const annBtns = document.querySelectorAll(".ecg-ann-btn[data-wave]");
      annBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const wave = btn.getAttribute("data-wave");
          const wasActive = btn.classList.contains("active");
          annBtns.forEach((b) => b.classList.remove("active"));
          if (!wasActive) {
            btn.classList.add("active");
            this.renderer?.setAnnotationMode(wave);
            this.showToast(`\u0110\xE3 k\xEDch ho\u1EA1t ch\u1EBF \u0111\u1ED9 ch\u1EA5m ${wave}: Nh\u1EA5p l\xEAn \u0111\u01B0\u1EDDng bi\u1EC3u di\u1EC5n s\xF3ng.`);
          } else {
            this.renderer?.setAnnotationMode(null);
          }
        });
      });
      const btnClearAnn = document.getElementById("btn-clear-ann");
      if (btnClearAnn) {
        btnClearAnn.addEventListener("click", () => {
          this.renderer?.clearAnnotations();
          annBtns.forEach((b) => b.classList.remove("active"));
          this.showToast("\u0110\xE3 x\xF3a to\xE0n b\u1ED9 nh\xE3n s\xF3ng.");
          if (this.currentTab === "annotation") {
            this.renderAnnotationTab(null);
          }
        });
      }
      const tabBtns = document.querySelectorAll(".ecg-tab-btn");
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          tabBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          this.currentTab = btn.getAttribute("data-tab");
          this.updateDiagnosticPanel();
        });
      });
      const btnExportSoap = document.getElementById("btn-export-soap");
      if (btnExportSoap) {
        btnExportSoap.addEventListener("click", () => this.exportSoapPlan());
      }
    }
    updatePatientInfo() {
      const banner = document.getElementById("ecg-patient-banner");
      if (!banner) return;
      const p = this.currentCase.patient;
      const m = this.currentCase.metrics;
      banner.innerHTML = `
      <div class="ecg-patient-grid">
        <div class="ecg-patient-col-main">
          <div class="ecg-patient-name-row">
            <span class="ecg-patient-name"><i class="fa-solid fa-user-injured"></i> ${p.name}</span>
            <span class="ecg-patient-demog">${p.age} tu\u1ED5i \u2022 ${p.gender}</span>
          </div>
          <p class="ecg-patient-complaint"><strong>L\xFD do v\xE0o vi\u1EC7n:</strong> ${p.chiefComplaint}</p>
          <p class="ecg-patient-history"><strong>B\u1EC7nh s\u1EED:</strong> ${p.clinicalHistory}</p>
        </div>

        <div class="ecg-patient-vitals-col">
          <div class="ecg-vital-item">
            <span class="ecg-vital-label">Huy\u1EBFt \xC1p:</span>
            <span class="ecg-vital-val font-bold">${p.vitals.bp} mmHg</span>
          </div>
          <div class="ecg-vital-item">
            <span class="ecg-vital-label">Nh\u1ECBp Tim (HR):</span>
            <span class="ecg-vital-val font-bold text-danger">${m.heartRate} bpm</span>
          </div>
          <div class="ecg-vital-item">
            <span class="ecg-vital-label">SpO2 / Nhi\u1EC7t:</span>
            <span class="ecg-vital-val">${p.vitals.spo2}% \u2022 ${p.vitals.temp}\xB0C</span>
          </div>
          ${p.labs?.troponinI ? `
            <div class="ecg-vital-item ecg-vital-item--highlight">
              <span class="ecg-vital-label">Troponin I:</span>
              <span class="ecg-vital-val text-danger font-bold">${p.labs.troponinI}</span>
            </div>
          ` : ""}
          ${p.labs?.k ? `
            <div class="ecg-vital-item">
              <span class="ecg-vital-label">K+ m\xE1u:</span>
              <span class="ecg-vital-val">${p.labs.k} mEq/L</span>
            </div>
          ` : ""}
        </div>
      </div>
    `;
      const sevBadge = document.getElementById("case-severity-badge");
      if (sevBadge) {
        sevBadge.textContent = `M\u1EE9c \u0111\u1ED9: ${this.currentCase.severity}`;
        sevBadge.className = `ecg-badge ${this.currentCase.severity === "Kh\u1EA9n c\u1EA5p" || this.currentCase.severity === "Nguy k\u1ECBch" ? "ecg-badge--danger" : "ecg-badge--secondary"}`;
      }
    }
    updateDiagnosticPanel() {
      const wrap = document.getElementById("ecg-tab-content");
      if (!wrap) return;
      if (this.currentTab === "diagnosis") {
        this.renderDiagnosisTab(wrap);
      } else if (this.currentTab === "criteria") {
        this.renderCriteriaTab(wrap);
      } else if (this.currentTab === "anatomy") {
        this.renderAnatomyTab(wrap);
      } else if (this.currentTab === "guide") {
        this.renderGuideTab(wrap);
      } else {
        this.renderAnnotationTab(this.renderer?.lastValidationReport || null);
      }
    }
    renderDiagnosisTab(wrap) {
      const c = this.currentCase;
      const d = c.diagnosis;
      wrap.innerHTML = `
      <div class="ecg-diag-grid">
        <!-- Ch\u1EA9n \u0111o\xE1n then ch\u1ED1t & Nh\xE1nh th\u1EE7 ph\u1EA1m -->
        <div class="ecg-diag-card ecg-diag-card--primary">
          <div class="ecg-diag-card-header">
            <i class="fa-solid fa-file-waveform"></i>
            <h3>K\u1EBFt Lu\u1EADn Ch\u1EA9n \u0110o\xE1n \u0110i\u1EC7n T\xE2m \u0110\u1ED3</h3>
            <span class="ecg-confidence-tag">\u0110\u1ED9 tin c\u1EADy: ${d.confidence.primary}%</span>
          </div>
          <div class="ecg-primary-diagnosis">
            ${d.primary}
          </div>
          ${d.culpritVesselOrCause ? `
            <div class="ecg-culprit-box">
              <i class="fa-solid fa-heart-crack text-danger"></i>
              <div>
                <strong>V\u1ECB tr\xED t\u1ED5n th\u01B0\u01A1ng / Nh\xE1nh th\u1EE7 ph\u1EA1m:</strong>
                <p>${d.culpritVesselOrCause}</p>
              </div>
            </div>
          ` : ""}

          <div class="ecg-key-findings-list">
            <strong>D\u1EA5u hi\u1EC7u then ch\u1ED1t tr\xEAn 12 \u0111\u1EA1o tr\xECnh:</strong>
            <ul>
              ${d.keyFindings.map((f) => `<li><i class="fa-solid fa-circle-check text-primary"></i> <span>${f}</span></li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Ph\xE1c \u0110\u1ED3 X\u1EED Tr\xED Kh\u1EA9n C\u1EA5p & Ch\u1EA9n \u0110o\xE1n Ph\xE2n Bi\u1EC7t -->
        <div class="ecg-diag-card">
          <div class="ecg-diag-card-header">
            <i class="fa-solid fa-truck-medical"></i>
            <h3>H\u01B0\u1EDBng X\u1EED Tr\xED C\u1EA5p C\u1EE9u & Can Thi\u1EC7p</h3>
          </div>
          
          <ol class="ecg-treatment-steps">
            ${d.treatment.map((step, idx) => `
              <li>
                <span class="ecg-step-num">${idx + 1}</span>
                <span class="ecg-step-text">${step}</span>
              </li>
            `).join("")}
          </ol>

          <div class="ecg-differentials-box">
            <strong>Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t c\u1EA7n lo\u1EA1i tr\u1EEB:</strong>
            <p>${d.differentials.join(" \u2022 ")}</p>
          </div>

          <div class="ecg-learning-box">
            <i class="fa-solid fa-graduation-cap"></i>
            <div>
              <strong>\u0110i\u1EC3m c\u1ED1t l\xF5i l\xE2m s\xE0ng:</strong>
              <p>${c.learningNotes.coreTakeaway}</p>
              <small class="text-muted"><i class="fa-solid fa-triangle-exclamation"></i> C\u1EA1m b\u1EABy: ${c.learningNotes.pitfallToAvoid}</small>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    renderCriteriaTab(wrap) {
      const m = this.currentCase.metrics;
      wrap.innerHTML = `
      <div class="ecg-criteria-grid">
        <!-- Th\xF4ng s\u1ED1 \u0111o \u0111\u1EA1c \u0111i\u1EC7n h\u1ECDc -->
        <div class="ecg-criteria-card">
          <h3><i class="fa-solid fa-wave-square"></i> C\xE1c Kho\u1EA3ng Th\u1EDDi Gian \u0110i\u1EC7n H\u1ECDc</h3>
          <table class="ecg-metrics-table">
            <tr>
              <td>Nh\u1ECBp & T\xEDnh ch\u1EA5t:</td>
              <td class="font-bold">${m.rhythmType} (${m.regularity})</td>
            </tr>
            <tr>
              <td>T\u1EA7n s\u1ED1 th\u1EA5t (HR):</td>
              <td class="font-bold text-danger">${m.heartRate} chu k\u1EF3/ph\xFAt</td>
            </tr>
            <tr>
              <td>Tr\u1EE5c \u0111i\u1EC7n tim (G\xF3c \u03B1):</td>
              <td class="font-bold">${m.axis} (${m.alphaAngle}\xB0)</td>
            </tr>
            <tr>
              <td>Kho\u1EA3ng PR:</td>
              <td class="${m.prInterval > 200 ? "text-danger font-bold" : ""}">${m.prInterval} ms (Chu\u1EA9n: 120-200ms)</td>
            </tr>
            <tr>
              <td>\u0110\u1ED9 r\u1ED9ng QRS:</td>
              <td class="${m.qrsDuration > 120 ? "text-danger font-bold" : ""}">${m.qrsDuration} ms (Chu\u1EA9n: &lt;120ms)</td>
            </tr>
            <tr>
              <td>Kho\u1EA3ng QT:</td>
              <td>${m.qt} ms</td>
            </tr>
            <tr>
              <td>QTc (C\xF4ng th\u1EE9c Bazett):</td>
              <td class="${m.qtc > 450 ? "text-danger font-bold" : ""}">${m.qtc} ms (Chu\u1EA9n: &lt;440ms nam, &lt;460ms n\u1EEF)</td>
            </tr>
          </table>
        </div>

        <!-- Thang \u0111i\u1EC3m ph\xEC \u0111\u1EA1i & Ti\xEAu chu\u1EA9n \u0111\u1EB7c bi\u1EC7t -->
        <div class="ecg-criteria-card">
          <h3><i class="fa-solid fa-list-check"></i> Ti\xEAu Chu\u1EA9n Ph\xEC \u0110\u1EA1i & Ti\xEAn L\u01B0\u1EE3ng</h3>
          <div class="ecg-criteria-list">
            <div class="ecg-crit-item">
              <div class="ecg-crit-header">
                <strong>Ch\u1EC9 s\u1ED1 Sokolow-Lyon (D\xE0y th\u1EA5t tr\xE1i):</strong>
                <span class="ecg-crit-val">${m.sokolowLyon !== void 0 ? `${m.sokolowLyon} mm` : "N/A"}</span>
              </div>
              <p class="ecg-crit-desc">SV1 + RV5 (Ng\u01B0\u1EE1ng d\xE0y th\u1EA5t tr\xE1i: \u2265 35 mm \u1EDF ng\u01B0\u1EDDi l\u1EDBn > 35 tu\u1ED5i).</p>
            </div>

            <div class="ecg-crit-item">
              <div class="ecg-crit-header">
                <strong>Ti\xEAu chu\u1EA9n Cornell:</strong>
                <span class="ecg-crit-val">${m.cornellCriteria !== void 0 ? `${m.cornellCriteria} mm` : "N/A"}</span>
              </div>
              <p class="ecg-crit-desc">R aVL + S V3 (&gt; 28 mm \u1EDF nam, &gt; 20 mm \u1EDF n\u1EEF).</p>
            </div>

            <div class="ecg-crit-item">
              <div class="ecg-crit-header">
                <strong>H\u1ED9i ch\u1EE9ng Brugada:</strong>
                <span class="ecg-crit-val">${this.currentCase.diagnosis.brugadaAnalysis || "\xC2m t\xEDnh"}</span>
              </div>
              <p class="ecg-crit-desc">\u0110o\u1EA1n ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m (Type 1) ho\u1EB7c d\u1EA1ng y\xEAn ng\u1EF1a (Type 2) \u2265 2mm \u1EDF V1-V2.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    renderAnatomyTab(wrap) {
      const leads = ["I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
      wrap.innerHTML = `
      <div class="ecg-anatomy-grid">
        ${leads.map((l) => {
        const info = LEAD_ANATOMY_MAP[l];
        return `
            <div class="ecg-lead-anatomy-card">
              <div class="ecg-lead-anatomy-header">
                <span class="ecg-lead-code">${info.lead}</span>
                <span class="ecg-lead-region">${info.region}</span>
              </div>
              <div class="ecg-lead-vessel">
                <i class="fa-solid fa-syringe text-danger"></i> <strong>\u0110M nu\xF4i:</strong> ${info.culpritVessel}
              </div>
              <p class="ecg-lead-desc">${info.description}</p>
            </div>
          `;
      }).join("")}
      </div>
    `;
    }
    renderAnnotationTab(report) {
      const wrap = document.getElementById("ecg-tab-content");
      if (!wrap) return;
      if (!report || report.totalAnnotations === 0) {
        wrap.innerHTML = `
        <div class="ecg-empty-ann-state">
          <i class="fa-solid fa-hand-pointer fa-3x text-muted"></i>
          <h3>Ch\u01B0a c\xF3 m\u1ED1c s\xF3ng n\xE0o \u0111\u01B0\u1EE3c ch\u1EA5m \u0111i\u1EC3m</h3>
          <p>
            Ch\u1ECDn c\xE1c n\xFAt s\xF3ng (P, Q, R, S, J, T, U) \u1EDF thanh c\xF4ng c\u1EE5 ph\xEDa tr\xEAn v\xE0 nh\u1EA5p chu\u1ED9t tr\u1EF1c ti\u1EBFp l\xEAn \u0111\u01B0\u1EDDng bi\u1EC3u di\u1EC5n \u0111i\u1EC7n t\xE2m \u0111\u1ED3 \u0111\u1EC3 h\u1EC7 th\u1ED1ng ch\u1EA5m \u0111i\u1EC3m \u0111\u1ED9 ch\xEDnh x\xE1c.
          </p>
        </div>
      `;
        return;
      }
      wrap.innerHTML = `
      <div class="ecg-ann-report">
        <div class="ecg-ann-summary-card">
          <div class="ecg-ann-score-box">
            <span class="ecg-ann-score">${report.overallScore}</span>
            <span class="ecg-ann-score-label">/ 100 \u0110i\u1EC3m</span>
          </div>
          <div class="ecg-ann-summary-text">
            <h3>K\u1EBFt Qu\u1EA3 Nh\u1EADn Di\u1EC7n S\xF3ng L\xE2m S\xE0ng</h3>
            <p class="ecg-ann-feedback">${report.feedback}</p>
            <p class="ecg-ann-pearl"><i class="fa-solid fa-lightbulb text-warning"></i> ${report.clinicalPearl}</p>
          </div>
        </div>

        <div class="ecg-ann-items-list">
          <h4>Chi Ti\u1EBFt T\u1EEBng V\u1ECB Tr\xED S\xF3ng:</h4>
          ${report.items.map((item) => `
            <div class="ecg-ann-result-row ecg-ann-result-row--${item.status}">
              <div class="ecg-ann-wave-badge">${item.waveType} (${item.lead})</div>
              <div class="ecg-ann-item-desc">
                <strong>${item.message}</strong>
                <p>${item.morphologyEvaluation}</p>
              </div>
              <div class="ecg-ann-item-score font-bold">${item.score}\u0111</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    }
    renderGuideTab(wrap) {
      wrap.innerHTML = `
      <div class="ecg-guide-container">
        <!-- Header Banner -->
        <div class="ecg-guide-banner">
          <div class="ecg-guide-banner-icon">
            <i class="fa-solid fa-book-bookmark"></i>
          </div>
          <div>
            <h3>C\u1EA9m Nang H\u01B0\u1EDBng D\u1EABn \u0110\u1ECDc \u0110i\u1EC7n T\xE2m \u0110\u1ED3 C\u0103n B\u1EA3n & Chuy\xEAn S\xE2u</h3>
            <p>Bi\xEAn so\u1EA1n h\u1EC7 th\u1ED1ng h\xF3a theo chuy\xEAn kh\u1EA3o <strong>"\u0110\u1ECDc \u0110i\u1EC7n T\xE2m \u0110\u1ED3 D\u1EC5 H\u01A1n"</strong> (BS Nguy\u1EC5n T\xF4n Kinh Thi) &amp; gi\xE1o tr\xECnh qu\u1ED1c t\u1EBF kinh \u0111i\u1EC3n <strong>"ECG Made Easy" 4th Edition</strong> (Dr. Atul Luthra).</p>
          </div>
        </div>

        <!-- Guide Subsections Grid -->
        <div class="ecg-guide-grid">
          <!-- 10 Steps System -->
          <div class="ecg-guide-card">
            <div class="ecg-guide-card-header">
              <i class="fa-solid fa-list-check text-primary"></i>
              <h4>1. Quy Tr\xECnh 10 B\u01B0\u1EDBc Ph\xE2n T\xEDch ECG Chu\u1EA9n</h4>
            </div>
            <ol class="ecg-guide-steps-list">
              <li><strong>1. Nh\u1ECBp tim (Rhythm):</strong> Nh\u1ECBp xoang (P \u0111\u1ED3ng d\u1EA1ng, P(+) \u1EDF DI, DII, aVF, P(-) \u1EDF aVR; t\u1EF7 l\u1EC7 P:QRS 1:1) hay lo\u1EA1n nh\u1ECBp (rung nh\u0129, cu\u1ED3ng nh\u0129, nh\u1ECBp nhanh th\u1EA5t, nh\u1ECBp b\u1ED9 n\u1ED1i).</li>
              <li><strong>2. T\u1EA7n s\u1ED1 tim (Rate):</strong> \u0110\u1EC1u: 300 / s\u1ED1 \xF4 l\u1EDBn (ho\u1EB7c 1500 / s\u1ED1 \xF4 nh\u1ECF). Kh\xF4ng \u0111\u1EC1u: \u0110\u1EBFm s\u1ED1 QRS trong 30 \xF4 l\u1EDBn (6 gi\xE2y) nh\xE2n 10.</li>
              <li><strong>3. Tr\u1EE5c \u0111i\u1EC7n tim (Axis):</strong> D\u1EF1a v\xE0o DI v\xE0 aVF: Tr\u1EE5c trung gian (-30\xB0 \u0111\u1EBFn +90\xB0), Tr\u1EE5c tr\xE1i (-30\xB0 \u0111\u1EBFn -90\xB0), Tr\u1EE5c ph\u1EA3i (+90\xB0 \u0111\u1EBFn +180\xB0), V\xF4 \u0111\u1ECBnh.</li>
              <li><strong>4. S\xF3ng P:</strong> Th\u1EDDi gian < 120ms (3 \xF4 nh\u1ECF), Bi\xEAn \u0111\u1ED9 < 2.5mm \u1EDF DII; P ph\u1EBF (cao nh\u1ECDn \u2265 2.5mm do d\xE0y nh\u0129 ph\u1EA3i) vs P nh\u0129 (hai \u0111\u1EC9nh ch\u1EBB > 40ms do d\xE0y nh\u0129 tr\xE1i).</li>
              <li><strong>5. Kho\u1EA3ng PR:</strong> 120 - 200ms (3 - 5 \xF4 nh\u1ECF). PR ng\u1EAFn (< 120ms) g\u1EE3i \xFD h\u1ED9i ch\u1EE9ng k\xEDch th\xEDch s\u1EDBm WPW/LGL; PR d\xE0i (> 200ms) l\xE0 Bloc nh\u0129 th\u1EA5t \u0111\u1ED9 I.</li>
              <li><strong>6. Ph\u1EE9c b\u1ED9 QRS:</strong> R\u1ED9ng khi \u2265 120ms (Bloc nh\xE1nh, nh\u1ECBp th\u1EA5t). \u0110\xE1nh gi\xE1 s\xF3ng Q ho\u1EA1i t\u1EED (> 40ms ho\u1EB7c > 25% R). Ti\xEAu chu\u1EA9n d\xE0y th\u1EA5t Sokolow-Lyon, Cornell.</li>
              <li><strong>7. \u0110o\u1EA1n ST:</strong> \u0110o t\u1EA1i \u0111i\u1EC3m J; ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m (STEMI, Brugada) hay l\xF5m (vi\xEAm m\xE0ng ngo\xE0i tim); ST ch\xEAnh xu\u1ED1ng (thi\u1EBFu m\xE1u d\u01B0\u1EDBi n\u1ED9i t\xE2m m\u1EA1c, ng\u1EA5m Digoxin).</li>
              <li><strong>8. S\xF3ng T:</strong> B\xECnh th\u01B0\u1EDDng c\xF9ng h\u01B0\u1EDBng QRS; T cao nh\u1ECDn \u0111\u1ED1i x\u1EE9ng h\u1EB9p \u0111\xE1y (T\u0103ng Kali m\xE1u); T d\u1EB9t/\xE2m (H\u1EA1 Kali m\xE1u, thi\u1EBFu m\xE1u c\u01A1 tim c\u1EA5p/m\u1EA1n).</li>
              <li><strong>9. Kho\u1EA3ng QT/QTc:</strong> QTc = QT / \u221A(RR); B\xECnh th\u01B0\u1EDDng \u2264 440ms (Nam), \u2264 460ms (N\u1EEF). K\xE9o d\xE0i > 500ms b\xE1o \u0111\u1ED9ng \u0111\u1ECF nguy c\u01A1 b\xF9ng ph\xE1t xo\u1EAFn \u0111\u1EC9nh (Torsades de Pointes).</li>
              <li><strong>10. S\xF3ng U:</strong> B\xECnh th\u01B0\u1EDDng nh\u1ECF < 2mm c\xF9ng chi\u1EC1u s\xF3ng T; N\u1ED5i cao b\u1EA5t th\u01B0\u1EDDng t\u1EA1o hi\u1EC7u \u1EE9ng "l\u01B0ng l\u1EA1c \u0111\xE0" khi Kali m\xE1u h\u1EA1 n\u1EB7ng (< 2.5 mEq/L).</li>
            </ol>
          </div>

          <!-- STEMI Localization & Culprit Vessels -->
          <div class="ecg-guide-card">
            <div class="ecg-guide-card-header">
              <i class="fa-solid fa-heart-pulse text-danger"></i>
              <h4>2. \u0110\u1ECBnh Khu Nh\u1ED3i M\xE1u C\u01A1 Tim & \u0110\u1ED9ng M\u1EA1ch Th\u1EE7 Ph\u1EA1m</h4>
            </div>
            <table class="ecg-guide-table">
              <thead>
                <tr>
                  <th>V\xF9ng gi\u1EA3i ph\u1EABu</th>
                  <th>Chuy\u1EC3n \u0111\u1EA1o ST ch\xEAnh l\xEAn</th>
                  <th>Chuy\u1EC3n \u0111\u1EA1o soi g\u01B0\u01A1ng</th>
                  <th>\u0110\u1ED9ng m\u1EA1ch th\u1EE7 ph\u1EA1m</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Tr\u01B0\u1EDBc r\u1ED9ng</strong></td>
                  <td>V1 \u0111\u1EBFn V6, DI, aVL</td>
                  <td>DII, DIII, aVF</td>
                  <td>LAD \u0111o\u1EA1n g\u1EA7n (Nguy k\u1ECBch)</td>
                </tr>
                <tr>
                  <td><strong>Tr\u01B0\u1EDBc v\xE1ch</strong></td>
                  <td>V1, V2, V3, V4</td>
                  <td>Kh\xF4ng r\xF5 / nh\u1EB9</td>
                  <td>LAD \u0111o\u1EA1n gi\u1EEFa</td>
                </tr>
                <tr>
                  <td><strong>Th\xE0nh d\u01B0\u1EDBi</strong></td>
                  <td>DII, DIII, aVF</td>
                  <td>DI, aVL</td>
                  <td>RCA (85-90%) ho\u1EB7c LCx</td>
                </tr>
                <tr>
                  <td><strong>Th\xE0nh b\xEAn</strong></td>
                  <td>DI, aVL, V5, V6</td>
                  <td>DII, DIII, aVF</td>
                  <td>LCx ho\u1EB7c Nh\xE1nh ch\xE9o Diagonal</td>
                </tr>
                <tr>
                  <td><strong>Th\u1EA5t ph\u1EA3i</strong></td>
                  <td>V3R, V4R (ST\u2191 \u2265 1mm)</td>
                  <td>\u2014</td>
                  <td>\u0110o\u1EA1n g\u1EA7n RCA (Tr\xE1nh Nitroglycerin!)</td>
                </tr>
                <tr>
                  <td><strong>Th\xE0nh sau th\u1EF1c</strong></td>
                  <td>V7, V8, V9 (ST\u2191 \u2265 0.5mm)</td>
                  <td>ST\u2193 V1, V2, V3 (R cao)</td>
                  <td>LCx ho\u1EB7c PDA</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bundle Branch Blocks & Brugada -->
          <div class="ecg-guide-card">
            <div class="ecg-guide-card-header">
              <i class="fa-solid fa-bolt text-warning"></i>
              <h4>3. Bloc Nh\xE1nh & Thu\u1EADt To\xE1n Brugada (VT vs SVT)</h4>
            </div>
            <div class="ecg-guide-block">
              <h5>Bloc Nh\xE1nh Tr\xE1i (LBBB) vs Ph\u1EA3i (RBBB):</h5>
              <ul>
                <li><strong>LBBB:</strong> QRS \u2265 120ms, s\xF3ng R r\u1ED9ng kh\xEDa ch\u1EEF M \u1EDF DI, aVL, V5-V6; d\u1EA1ng QS s\xE2u \u1EDF V1-V3. Lu\xF4n coi LBBB m\u1EDBi xu\u1EA5t hi\u1EC7n l\xE0 t\u01B0\u01A1ng \u0111\u01B0\u01A1ng STEMI!</li>
                <li><strong>RBBB:</strong> QRS \u2265 120ms, d\u1EA1ng tai th\u1ECF rsR' ho\u1EB7c rSR' \u1EDF V1-V2; s\xF3ng S r\u1ED9ng s\xE2u \u1EDF DI, V5-V6.</li>
              </ul>
              <h5 style="margin-top: 0.75rem;">Thu\u1EADt To\xE1n Brugada 4 B\u01B0\u1EDBc (Ph\xE2n bi\u1EC7t VT v\u1EDBi SVT QRS R\u1ED9ng):</h5>
              <ol class="ecg-guide-brugada-steps">
                <li><strong>B\u01B0\u1EDBc 1:</strong> C\xF3 s\u1EF1 v\u1EAFng m\u1EB7t ho\xE0n to\xE0n c\u1EE7a ph\u1EE9c b\u1ED9 RS \u1EDF t\u1EA5t c\u1EA3 c\xE1c chuy\u1EC3n \u0111\u1EA1o V1-V6 kh\xF4ng? \u2192 <em>N\u1EBFu C\xD3: Ch\u1EA9n \u0111o\xE1n Nh\u1ECBp nhanh th\u1EA5t (VT).</em></li>
                <li><strong>B\u01B0\u1EDBc 2:</strong> Kho\u1EA3ng c\xE1ch RS d\xE0i nh\u1EA5t \u1EDF b\u1EA5t k\u1EF3 chuy\u1EC3n \u0111\u1EA1o tr\u01B0\u1EDBc tim n\xE0o c\xF3 > 100ms kh\xF4ng? \u2192 <em>N\u1EBFu C\xD3: Ch\u1EA9n \u0111o\xE1n VT.</em></li>
                <li><strong>B\u01B0\u1EDBc 3:</strong> C\xF3 d\u1EA5u hi\u1EC7u ph\xE2n ly nh\u0129 - th\u1EA5t (AV dissociation, nh\xE1t b\u1EAFt \u0111\u01B0\u1EE3c th\u1EA5t, nh\xE1t h\u1ED7n h\u1EE3p) kh\xF4ng? \u2192 <em>N\u1EBFu C\xD3: Kh\u1EB3ng \u0111\u1ECBnh 100% VT.</em></li>
                <li><strong>B\u01B0\u1EDBc 4:</strong> \u0110\u1EA1t ti\xEAu chu\u1EA9n h\xECnh th\xE1i kinh \u0111i\u1EC3n c\u1EE7a VT \u1EDF c\u1EA3 V1/V2 v\xE0 V6 kh\xF4ng? \u2192 <em>N\u1EBFu C\xD3: VT; N\u1EBFu KH\xD4NG: SVT d\u1EABn truy\u1EC1n l\u1EC7ch h\u01B0\u1EDBng.</em></li>
              </ol>
            </div>
          </div>

          <!-- Electrolytes & Pharmacology -->
          <div class="ecg-guide-card">
            <div class="ecg-guide-card-header">
              <i class="fa-solid fa-flask-vial text-success"></i>
              <h4>4. R\u1ED1i Lo\u1EA1n \u0110i\u1EC7n Gi\u1EA3i & D\u01B0\u1EE3c L\xFD Tim M\u1EA1ch</h4>
            </div>
            <div class="ecg-guide-block">
              <ul>
                <li><strong>T\u0103ng Kali m\xE1u (Hyperkalemia):</strong> K+ > 5.5: S\xF3ng T cao nh\u1ECDn \u0111\u1ED1i x\u1EE9ng h\u1EB9p \u0111\xE1y \u2192 K+ > 6.5: PR k\xE9o d\xE0i, P d\u1EB9t/bi\u1EBFn m\u1EA5t \u2192 K+ > 7.5: QRS d\xE3n r\u1ED9ng h\xF2a v\xE0o s\xF3ng T t\u1EA1o h\xECnh sin (Sine-wave) \u2192 Rung th\u1EA5t / V\xF4 t\xE2m thu. X\u1EED tr\xED ngay Calcium Gluconate 10% \u0111\u1EC3 \u1ED5n \u0111\u1ECBnh m\xE0ng t\u1EBF b\xE0o tim!</li>
                <li><strong>H\u1EA1 Kali m\xE1u (Hypokalemia):</strong> K+ < 3.5: \u0110o\u1EA1n ST ch\xEAnh xu\u1ED1ng, s\xF3ng T d\u1EB9t, s\xF3ng U nh\xF4 cao (h\xECnh \u1EA3nh 2 b\u01B0\u1EDBu l\u1EA1c \u0111\xE0 Camel-hump). Nguy c\u01A1 xo\u1EAFn \u0111\u1EC9nh khi ph\u1ED1i h\u1EE3p thu\u1ED1c ch\u1ED1ng lo\u1EA1n nh\u1ECBp.</li>
                <li><strong>Ng\u1ED9 \u0111\u1ED9c Digoxin:</strong> \u0110o\u1EA1n ST ch\xEAnh xu\u1ED1ng h\xECnh \u0111\xE1y ch\xE9n Salvador Dali (Scooped ST), r\xFAt ng\u1EAFn kho\u1EA3ng QT, r\u1ED1i lo\u1EA1n nh\u1ECBp th\u1EA5t (ngo\u1EA1i t\xE2m thu nh\u1ECBp \u0111\xF4i Bigeminy, nh\u1ECBp nhanh b\u1ED9 n\u1ED1i).</li>
                <li><strong>H\u1ED9i ch\u1EE9ng Brugada:</strong> Type 1: ST ch\xEAnh l\xEAn d\u1EA1ng v\xF2m (coved-type) \u2265 2mm \u1EDF V1-V2 ti\u1EBFp n\u1ED1i b\u1EB1ng T \xE2m \u0111\u1ED1i x\u1EE9ng. R\u1EA5t nguy hi\u1EC3m, nguy c\u01A1 \u0111\u1ED9t t\u1EED ban \u0111\xEAm \u1EDF ng\u01B0\u1EDDi tr\u1EBB (SUDS).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    exportSoapPlan() {
      const c = this.currentCase;
      const p = c.patient;
      const m = c.metrics;
      const d = c.diagnosis;
      const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN");
      const text = [
        `--- B\xC1O C\xC1O \u0110I\u1EC6N T\xC2M \u0110\u1ED2 12 CHUY\u1EC2N \u0110\u1EA0O (CDSS ECG MASTER) [${dateStr}] ---`,
        `B\u1EC7nh nh\xE2n: ${p.name} | ${p.age} tu\u1ED5i (${p.gender})`,
        `L\xFD do kh\xE1m: ${p.chiefComplaint}`,
        `Sinh hi\u1EC7u: HA ${p.vitals.bp} mmHg, M\u1EA1ch ${m.heartRate} bpm, SpO2 ${p.vitals.spo2}%`,
        `
K\u1EBET QU\u1EA2 \u0110O \u0110\u1EA0C \u0110I\u1EC6N H\u1ECCC:`,
        `  \u2022 Nh\u1ECBp: ${m.rhythmType} (${m.regularity}) | T\u1EA7n s\u1ED1: ${m.heartRate} l/p`,
        `  \u2022 Tr\u1EE5c \u0111i\u1EC7n tim: ${m.axis} (${m.alphaAngle}\xB0)`,
        `  \u2022 PR: ${m.prInterval} ms | QRS: ${m.qrsDuration} ms | QTc: ${m.qtc} ms`,
        `
CH\u1EA8N \u0110O\xC1N X\xC1C \u0110\u1ECANH:`,
        `  \u2022 ${d.primary}`,
        ...d.culpritVesselOrCause ? [`  \u2022 Nh\xE1nh th\u1EE7 ph\u1EA1m / Nguy\xEAn nh\xE2n: ${d.culpritVesselOrCause}`] : [],
        `  \u2022 D\u1EA5u hi\u1EC7u ch\xECa kh\xF3a: ${d.keyFindings.join("; ")}`,
        `
K\u1EBE HO\u1EA0CH \u0110I\u1EC0U TR\u1ECA KH\u1EA8N C\u1EA4P (SOAP PLAN):`,
        ...d.treatment.map((t, idx) => `  ${idx + 1}. ${t}`),
        `
Ph\xE2n bi\u1EC7t: ${d.differentials.join(", ")}`
      ].join("\n");
      navigator.clipboard.writeText(text).then(() => {
        this.showToast("\u0110\xE3 sao ch\xE9p k\u1EBFt qu\u1EA3 ECG v\xE0o H\u1ED3 S\u01A1 B\u1EC7nh \xC1n / DocSpace!");
      });
    }
    showToast(msg) {
      const toast = document.getElementById("ecg-toast");
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
  if (typeof window !== "undefined") {
    window.EcgCDSSController = EcgCDSSController;
  }

  // src/content/knowledge-vault/cdss/abg/abg-engine.ts
  var KPA_TO_MMHG = 7.50062;
  var MMHG_TO_KPA = 1 / KPA_TO_MMHG;
  function convertPressureToMmHg(val, unit) {
    return unit === "kPa" ? val * KPA_TO_MMHG : val;
  }
  function convertPressureToKpa(val, unit) {
    return unit === "mmHg" ? val * MMHG_TO_KPA : val;
  }
  function calculateHIon(pH) {
    return Math.round(Math.pow(10, 9 - pH) * 10) / 10;
  }
  function analyzeABG(input) {
    const {
      unit,
      pH,
      pCO2: rawPco2,
      pO2: rawPo2,
      hco3,
      be,
      sao2,
      fio2: rawFio2,
      na,
      k,
      cl,
      lactate,
      glucose,
      albumin,
      patientAge = 40,
      coHb,
      isVenousSample
    } = input;
    const pco2MmHg = convertPressureToMmHg(rawPco2, unit);
    const pao2MmHg = convertPressureToMmHg(rawPo2, unit);
    const pco2Kpa = convertPressureToKpa(rawPco2, unit);
    const pao2Kpa = convertPressureToKpa(rawPo2, unit);
    const fio2Pct = rawFio2 > 1 ? rawFio2 : rawFio2 * 100;
    const fio2Fraction = fio2Pct / 100;
    const hIon = calculateHIon(pH);
    const pao2AlveolarMmHg = fio2Fraction * 713 - pco2MmHg * 1.2;
    const pao2AlveolarKpa = fio2Fraction * 93.8 - pco2Kpa * 1.2;
    const aaGradientMmHg = Math.max(0, pao2AlveolarMmHg - pao2MmHg);
    const aaGradientKpa = Math.max(0, pao2AlveolarKpa - pao2Kpa);
    const expectedAaMmHg = patientAge / 4 + 4;
    const isAaGradientElevated = aaGradientMmHg > Math.max(20, expectedAaMmHg);
    const pfRatio = Math.round(pao2MmHg / fio2Fraction);
    let pfClass = "B\xECnh th\u01B0\u1EDDng (P/F > 400)";
    if (pfRatio < 100) {
      pfClass = "ARDS m\u1EE9c \u0111\u1ED9 N\u1EB7ng (P/F < 100)";
    } else if (pfRatio < 200) {
      pfClass = "ARDS m\u1EE9c \u0111\u1ED9 Trung b\xECnh (P/F 100 - 200)";
    } else if (pfRatio < 300) {
      pfClass = "T\u1ED5n th\u01B0\u01A1ng ph\u1ED5i c\u1EA5p / ARDS Nh\u1EB9 (P/F 200 - 300)";
    } else if (pfRatio < 400) {
      pfClass = "Gi\u1EA3m oxy h\xF3a m\xE1u nh\u1EB9 (P/F 300 - 400)";
    }
    let anionGap;
    let anionGapWithK;
    let isAnionGapHigh = false;
    let correctedAnionGap;
    let deltaRatio;
    let deltaRatioInterpretation;
    if (na !== void 0 && cl !== void 0) {
      anionGap = na - (cl + hco3);
      if (k !== void 0) {
        anionGapWithK = na + k - (cl + hco3);
        isAnionGapHigh = anionGapWithK > 18;
      } else {
        isAnionGapHigh = anionGap > 16;
      }
      if (albumin !== void 0 && albumin < 40) {
        const albGdl = albumin > 10 ? albumin / 10 : albumin;
        correctedAnionGap = (anionGap || 0) + 2.5 * (4 - albGdl);
        if (correctedAnionGap > 16) isAnionGapHigh = true;
      }
      if (isAnionGapHigh && hco3 < 24) {
        const deltaAG = (anionGap || 12) - 12;
        const deltaHCO3 = 24 - hco3;
        if (deltaHCO3 > 0) {
          deltaRatio = Math.round(deltaAG / deltaHCO3 * 100) / 100;
          if (deltaRatio < 0.4) {
            deltaRatioInterpretation = "Toan chuy\u1EC3n h\xF3a t\u0103ng kho\u1EA3ng tr\u1ED1ng Anion k\xE8m toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion b\xECnh th\u01B0\u1EDDng (NAGMA ph\u1ED1i h\u1EE3p).";
          } else if (deltaRatio < 0.8) {
            deltaRatioInterpretation = "Toan chuy\u1EC3n h\xF3a h\u1ED7n h\u1EE3p (HAGMA + NAGMA).";
          } else if (deltaRatio <= 2) {
            deltaRatioInterpretation = "Toan chuy\u1EC3n h\xF3a t\u0103ng kho\u1EA3ng tr\u1ED1ng Anion thu\u1EA7n t\xFAy (HAGMA \u0111\u01A1n thu\u1EA7n nh\u01B0 DKA, Toan lactic).";
          } else {
            deltaRatioInterpretation = "Toan chuy\u1EC3n h\xF3a t\u0103ng AG k\xE8m KI\u1EC0M CHUY\u1EC2N H\xD3A ph\u1ED1i h\u1EE3p (ho\u1EB7c ki\u1EC1m b\xF9 t\u1EEB toan h\xF4 h\u1EA5p m\u1EA1n).";
          }
        }
      }
    }
    const winterMin = Math.round((1.5 * hco3 + 8 - 2) * 10) / 10;
    const winterMax = Math.round((1.5 * hco3 + 8 + 2) * 10) / 10;
    let isPaO2Low = false;
    if (fio2Pct <= 21) {
      isPaO2Low = pao2MmHg < 80;
    } else {
      const diff = fio2Pct - pao2Kpa;
      isPaO2Low = diff > 10 || pfRatio < 300;
    }
    let hypoxaemiaSeverity = "normal";
    if (pao2Kpa < 5.3 || pao2MmHg < 40 || sao2 < 75 || fio2Pct >= 60 && pao2MmHg < 80) {
      hypoxaemiaSeverity = "severe";
    } else if (pao2Kpa <= 7.9 || pao2MmHg < 60 || sao2 < 90) {
      hypoxaemiaSeverity = "moderate";
    } else if (isPaO2Low || pao2Kpa <= 10.6 || pao2MmHg < 80 || sao2 < 95) {
      hypoxaemiaSeverity = "mild";
    }
    const isPaCO2Low = pco2MmHg < 35;
    const isPaCO2High = pco2MmHg > 45;
    const isHCO3Low = hco3 < 22;
    const isHCO3High = hco3 > 28;
    let gasExchangeCategory = "normal";
    let gasExchangeTitle = "Trao \u0111\u1ED5i kh\xED b\xECnh th\u01B0\u1EDDng (Normal Gas Exchange)";
    let gasExchangeDesc = "Ph\xE2n \xE1p oxy v\xE0 th\xF4ng kh\xED ph\u1EBF nang ho\xE0n to\xE0n n\u1EB1m trong gi\u1EDBi h\u1EA1n sinh l\xFD b\xECnh th\u01B0\u1EDDng.";
    let type2Subtype;
    let isHyperventilationPrimary;
    if (isPaO2Low) {
      if (isPaCO2High) {
        gasExchangeCategory = "type2_respiratory_impairment";
        if (isHCO3High) {
          if (pH < 7.35) {
            type2Subtype = "acute_on_chronic";
            gasExchangeTitle = "Suy h\xF4 h\u1EA5p Type 2 C\u1EA5p tr\xEAn n\u1EC1n M\u1EA1n (Acute-on-chronic Type 2 Respiratory Impairment)";
            gasExchangeDesc = "C\xF3 t\xECnh tr\u1EA1ng t\u0103ng CO2 m\u1EA1n t\xEDnh (HCO3- \u0111\xE3 t\u0103ng b\xF9 tr\u1EEB t\u1EEB tr\u01B0\u1EDBc) nh\u01B0ng xu\u1EA5t hi\u1EC7n suy gi\u1EA3m th\xF4ng kh\xED c\u1EA5p t\xEDnh khi\u1EBFn pH t\u1EE5t toan m\xE1u nguy hi\u1EC3m.";
          } else {
            type2Subtype = "chronic";
            gasExchangeTitle = "Suy h\xF4 h\u1EA5p Type 2 M\u1EA1n t\xEDnh (Chronic Type 2 Respiratory Impairment)";
            gasExchangeDesc = "Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang m\u1EA1n t\xEDnh (th\u01B0\u1EDDng g\u1EB7p \u1EDF COPD n\u1EB7ng, h\u1ED9i ch\u1EE9ng b\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED Pickwickian), th\u1EADn \u0111\xE3 b\xF9 tr\u1EEB b\u1EB1ng c\xE1ch gi\u1EEF HCO3- gi\xFAp pH b\xECnh th\u01B0\u1EDDng.";
          }
        } else {
          type2Subtype = "acute";
          gasExchangeTitle = "Suy h\xF4 h\u1EA5p Type 2 C\u1EA5p t\xEDnh (Acute Type 2 Respiratory Impairment / Ventilatory Failure)";
          gasExchangeDesc = "Suy gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang \u0111\u1ED9t ng\u1ED9t (ng\u1ED9 \u0111\u1ED9c thu\u1ED1c \u1EE9c ch\u1EBF h\xF4 h\u1EA5p nh\u01B0 morphin/an th\u1EA7n, ki\u1EC7t c\u01A1, ch\u1EA5n th\u01B0\u01A1ng l\u1ED3ng ng\u1EF1c). Th\u1EADn ch\u01B0a k\u1ECBp b\xF9 tr\u1EEB d\u1EABn t\u1EDBi toan m\xE1u c\u1EA5p.";
        }
      } else {
        gasExchangeCategory = "type1_respiratory_impairment";
        gasExchangeTitle = `Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u) - M\u1EE9c \u0111\u1ED9 ${hypoxaemiaSeverity === "severe" ? "N\u1EB7ng" : hypoxaemiaSeverity === "moderate" ? "Trung b\xECnh" : "Nh\u1EB9"}`;
        gasExchangeDesc = "R\u1ED1i lo\u1EA1n oxy h\xF3a m\xE1u \u0111\u01A1n thu\u1EA7n v\u1EDBi th\xF4ng kh\xED ph\u1EBF nang \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n ho\u1EB7c t\u0103ng (PaCO2 b\xECnh th\u01B0\u1EDDng ho\u1EB7c gi\u1EA3m do th\u1EDF nhanh ph\u1EA3n x\u1EA1). C\u01A1 ch\u1EBF th\u01B0\u1EDDng l\xE0 b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q ho\u1EB7c Shunt.";
      }
    } else {
      if (isPaCO2Low) {
        gasExchangeCategory = "hyperventilation";
        if (isHCO3Low) {
          isHyperventilationPrimary = false;
          gasExchangeTitle = "T\u0103ng th\xF4ng kh\xED th\u1EE9 ph\xE1t b\xF9 tr\u1EEB Toan chuy\u1EC3n h\xF3a (Secondary Hyperventilation)";
          gasExchangeDesc = "B\u1EC7nh nh\xE2n th\u1EDF nhanh s\xE2u (nh\u1ECBp th\u1EDF Kussmaul) \u0111\u1EC3 \u0111\xE0o th\u1EA3i t\u1ED1i \u0111a CO2, gi\xFAp h\u1EA1 acid bay h\u01A1i \u0111\u1EC3 k\xE9o pH v\u1EC1 ph\xEDa b\xECnh th\u01B0\u1EDDng.";
        } else {
          isHyperventilationPrimary = true;
          gasExchangeTitle = "T\u0103ng th\xF4ng kh\xED nguy\xEAn ph\xE1t (Primary Hyperventilation)";
          gasExchangeDesc = "Th\u1EDF nhanh s\xE2u do nguy\xEAn nh\xE2n t\xE2m l\xFD/lo \xE2u (Psychogenic Hyperventilation), \u0111au \u0111\u1EDBn, s\u1ED1t, t\u1ED5n th\u01B0\u01A1ng th\u1EA7n kinh trung \u01B0\u01A1ng, ho\u1EB7c giai \u0111o\u1EA1n r\u1EA5t s\u1EDBm c\u1EE7a thuy\xEAn t\u1EAFc m\u1EA1ch ph\u1ED5i.";
        }
      } else if (isPaCO2High) {
        gasExchangeCategory = "type2_respiratory_impairment";
        gasExchangeTitle = "Suy th\xF4ng kh\xED ph\u1EBF nang (T\u0103ng PaCO2) - Oxy m\xE1u \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3";
        gasExchangeDesc = "B\u1EC7nh nh\xE2n gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang nh\u01B0ng PaO2 b\xECnh th\u01B0\u1EDDng do \u0111ang \u0111\u01B0\u1EE3c th\u1EDF oxy h\u1ED7 tr\u1EE3 li\u1EC1u cao.";
        type2Subtype = isHCO3High ? pH < 7.35 ? "acute_on_chronic" : "chronic" : "acute";
      } else {
        gasExchangeCategory = "normal";
        gasExchangeTitle = "Trao \u0111\u1ED5i kh\xED t\u1EA1i ph\u1ED5i b\xECnh th\u01B0\u1EDDng (Normal Gas Exchange)";
        gasExchangeDesc = "C\u1EA3 PaO2 v\xE0 PaCO2 \u0111\u1EC1u n\u1EB1m trong gi\u1EDBi h\u1EA1n tham chi\u1EBFu chu\u1EA9n.";
      }
    }
    let acidaemiaStatus = "normal";
    if (pH < 7.35) acidaemiaStatus = "acidaemia";
    else if (pH > 7.45) acidaemiaStatus = "alkalaemia";
    let acidBaseCategory = "normal";
    let acidBaseTitle = "Th\u0103ng b\u1EB1ng ki\u1EC1m toan b\xECnh th\u01B0\u1EDDng";
    let acidBaseDesc = "pH m\xE1u v\xE0 c\xE1c ch\u1EA5t \u0111\u1EC7m n\u1EB1m trong kho\u1EA3ng sinh l\xFD.";
    let compensation = "uncompensated";
    let primaryDisorder = "Kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m";
    let compensatoryResponse = "Kh\xF4ng";
    let isMixed = false;
    let mixedDetails;
    if (acidaemiaStatus === "acidaemia") {
      if (isPaCO2High && isHCO3Low) {
        acidBaseCategory = "mixed_acid_base";
        isMixed = true;
        primaryDisorder = "Toan H\xF4 h\u1EA5p PH\u1ED0I H\u1EE2P Toan Chuy\u1EC3n h\xF3a (Mixed Respiratory & Metabolic Acidosis)";
        acidBaseTitle = "Toan H\u1ED7n H\u1EE3p Nguy K\u1ECBch (Toan H\xF4 H\u1EA5p + Toan Chuy\u1EC3n H\xF3a)";
        acidBaseDesc = "D\u1EA1ng r\u1ED1i lo\u1EA1n c\u1EF1c k\u1EF3 nguy hi\u1EC3m: hai qu\xE1 tr\xECnh g\xE2y toan di\u1EC5n ra \u0111\u1ED3ng th\u1EDDi, kh\xF4ng c\xF3 c\u01A1 ch\u1EBF b\xF9 tr\u1EEB, l\xE0m pH t\u1EE5t r\u1EA5t s\xE2u (th\u01B0\u1EDDng g\u1EB7p trong ng\u1EEBng tu\u1EA7n ho\xE0n, ph\xF9 ph\u1ED5i c\u1EA5p ki\u1EC7t s\u1EE9c, s\u1ED1c n\u1EB7ng k\xE8m suy h\xF4 h\u1EA5p).";
        compensation = "mixed";
      } else if (isPaCO2High && !isHCO3Low) {
        primaryDisorder = "Toan h\xF4 h\u1EA5p (Respiratory Acidosis)";
        acidBaseCategory = "respiratory_acidosis";
        if (isHCO3High) {
          compensation = "partially_compensated";
          compensatoryResponse = "Th\u1EADn b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (t\u0103ng t\xE1i h\u1EA5p thu HCO3-)";
          acidBaseTitle = "Toan h\xF4 h\u1EA5p c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Respiratory Acidosis)";
          acidBaseDesc = "PaCO2 t\u0103ng g\xE2y toan m\xE1u; th\u1EADn \u0111\xE3 ph\u1EA3n \u1EE9ng t\u0103ng gi\u1EEF HCO3- nh\u01B0ng ch\u01B0a \u0111\u1EE7 \u0111\u1EC3 \u0111\u01B0a pH v\u1EC1 ng\u01B0\u1EE1ng b\xECnh th\u01B0\u1EDDng.";
        } else {
          compensation = "uncompensated";
          compensatoryResponse = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)";
          acidBaseTitle = "Toan h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Acute Respiratory Acidosis)";
          acidBaseDesc = "PaCO2 t\u0103ng c\u1EA5p t\xEDnh, th\u1EADn ch\u01B0a k\u1ECBp \u0111i\u1EC1u ch\u1EC9nh gi\u1EEF bicarbonate, pH gi\u1EA3m m\u1EA1nh.";
        }
      } else if (isHCO3Low && !isPaCO2High) {
        primaryDisorder = "Toan chuy\u1EC3n h\xF3a (Metabolic Acidosis)";
        acidBaseCategory = "metabolic_acidosis";
        if (isPaCO2Low) {
          compensation = "partially_compensated";
          compensatoryResponse = "Ph\u1ED5i t\u0103ng th\xF4ng kh\xED b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (th\u1EA3i b\u1EDBt CO2)";
          acidBaseTitle = "Toan chuy\u1EC3n h\xF3a c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Metabolic Acidosis)";
          acidBaseDesc = "HCO3- gi\u1EA3m g\xE2y toan m\xE1u; trung t\xE2m h\xF4 h\u1EA5p ph\u1EA3n \u1EE9ng t\u0103ng th\xF4ng kh\xED h\u1EA1 PaCO2 nh\u01B0ng pH v\u1EABn < 7.35.";
        } else {
          compensation = "uncompensated";
          compensatoryResponse = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)";
          acidBaseTitle = "Toan chuy\u1EC3n h\xF3a ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Metabolic Acidosis)";
          acidBaseDesc = "HCO3- gi\u1EA3m nh\u01B0ng PaCO2 ch\u01B0a k\u1ECBp gi\u1EA3m (ho\u1EB7c b\u1EC7nh nh\xE2n b\u1ECB \u1EE9c ch\u1EBF h\xF4 h\u1EA5p/ki\u1EC7t c\u01A1 kh\xF4ng th\u1EDF nhanh \u0111\u01B0\u1EE3c).";
        }
      } else {
        acidBaseCategory = "mixed_acid_base";
        acidBaseTitle = "Toan m\xE1u m\u1EE9c \u0111\u1ED9 nh\u1EB9 (R\u1ED1i lo\u1EA1n ti\u1EC1m \u1EA9n)";
        acidBaseDesc = "pH h\u01A1i th\u1EA5p, c\xE1c th\xF4ng s\u1ED1 \u1EDF gi\u1EDBi h\u1EA1n c\u1EADn b\xECnh th\u01B0\u1EDDng.";
      }
    } else if (acidaemiaStatus === "alkalaemia") {
      if (isPaCO2Low && isHCO3High) {
        acidBaseCategory = "mixed_acid_base";
        isMixed = true;
        primaryDisorder = "Ki\u1EC1m H\xF4 h\u1EA5p PH\u1ED0I H\u1EE2P Ki\u1EC1m Chuy\u1EC3n h\xF3a (Mixed Respiratory & Metabolic Alkalosis)";
        acidBaseTitle = "Ki\u1EC1m H\u1ED7n H\u1EE3p (Ki\u1EC1m H\xF4 H\u1EA5p + Ki\u1EC1m Chuy\u1EC3n H\xF3a)";
        acidBaseDesc = "Hai qu\xE1 tr\xECnh g\xE2y ki\u1EC1m c\xF9ng di\u1EC5n ra (v\xED d\u1EE5: x\u01A1 gan v\u1EEBa t\u0103ng th\xF4ng kh\xED v\u1EEBa d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u h\u1EA1 Kali, ho\u1EB7c n\xF4n \xF3i k\xE8m lo \xE2u \u0111au \u0111\u1EDBn).";
        compensation = "mixed";
      } else if (isPaCO2Low && !isHCO3High) {
        primaryDisorder = "Ki\u1EC1m h\xF4 h\u1EA5p (Respiratory Alkalosis)";
        acidBaseCategory = "respiratory_alkalosis";
        if (isHCO3Low) {
          compensation = "partially_compensated";
          compensatoryResponse = "Th\u1EADn t\u0103ng \u0111\xE0o th\u1EA3i HCO3- b\xF9 tr\u1EEB b\xE1n ph\u1EA7n";
          acidBaseTitle = "Ki\u1EC1m h\xF4 h\u1EA5p c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Respiratory Alkalosis)";
          acidBaseDesc = "PaCO2 gi\u1EA3m do t\u0103ng th\xF4ng kh\xED; th\u1EADn gi\u1EA3m gi\u1EEF HCO3- nh\u01B0ng pH v\u1EABn > 7.45.";
        } else {
          compensation = "uncompensated";
          compensatoryResponse = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)";
          acidBaseTitle = "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Respiratory Alkalosis)";
          acidBaseDesc = "Th\u1EDF nhanh l\xE0m r\u1EEDa tr\xF4i PaCO2 c\u1EA5p t\xEDnh khi\u1EBFn m\xE1u b\u1ECB ki\u1EC1m h\xF3a.";
        }
      } else if (isHCO3High && !isPaCO2Low) {
        primaryDisorder = "Ki\u1EC1m chuy\u1EC3n h\xF3a (Metabolic Alkalosis)";
        acidBaseCategory = "metabolic_alkalosis";
        if (isPaCO2High) {
          compensation = "partially_compensated";
          compensatoryResponse = "Ph\u1ED5i gi\u1EA3m th\xF4ng kh\xED \u0111\u1EC3 gi\u1EEF l\u1EA1i CO2";
          acidBaseTitle = "Ki\u1EC1m chuy\u1EC3n h\xF3a c\xF3 b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (Partially Compensated Metabolic Alkalosis)";
          acidBaseDesc = "HCO3- m\xE1u t\u0103ng cao (do n\xF4n, m\u1EA5t d\u1ECBch d\u1EA1 d\xE0y, l\u1EE3i ti\u1EC3u); ph\u1ED5i b\xF9 tr\u1EEB b\u1EB1ng c\xE1ch gi\u1EA3m th\xF4ng kh\xED nh\u01B0ng pH v\u1EABn > 7.45.";
        } else {
          compensation = "uncompensated";
          compensatoryResponse = "Ch\u01B0a b\xF9 tr\u1EEB (Uncompensated)";
          acidBaseTitle = "Ki\u1EC1m chuy\u1EC3n h\xF3a ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Metabolic Alkalosis)";
          acidBaseDesc = "HCO3- t\u0103ng cao, PaCO2 v\u1EABn trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng.";
        }
      } else {
        acidBaseCategory = "mixed_acid_base";
        acidBaseTitle = "Ki\u1EC1m m\xE1u nh\u1EB9 (R\u1ED1i lo\u1EA1n ti\u1EC1m \u1EA9n)";
        acidBaseDesc = "pH t\u0103ng tr\xEAn 7.45 nh\u01B0ng PaCO2 v\xE0 HCO3- \u1EDF ng\u01B0\u1EE1ng ranh gi\u1EDBi.";
      }
    } else {
      if (isPaCO2Low && isHCO3Low) {
        compensation = "fully_compensated";
        if (pH < 7.4) {
          primaryDisorder = "Toan chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n (ho\u1EB7c Ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n t\xEDnh)";
          acidBaseCategory = "metabolic_acidosis";
          acidBaseTitle = "Toan chuy\u1EC3n h\xF3a B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Metabolic Acidosis)";
          acidBaseDesc = "B\u1EC7nh nh\xE2n c\xF3 toan chuy\u1EC3n h\xF3a nguy\xEAn ph\xE1t nh\u01B0ng ph\u1ED5i \u0111\xE3 b\xF9 tr\u1EEB t\u1ED1i \u0111a \u0111\u01B0a pH v\u1EC1 d\u1EA3i an to\xE0n (7.35 - 7.40). Quy t\u1EAFc: Kh\xF4ng bao gi\u1EDD b\xF9 tr\u1EEB qu\xE1 m\u1EE9c (Overcompensation does not occur).";
        } else {
          primaryDisorder = "Ki\u1EC1m h\xF4 h\u1EA5p b\xF9 tr\u1EEB ho\xE0n to\xE0n";
          acidBaseCategory = "respiratory_alkalosis";
          acidBaseTitle = "Ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n t\xEDnh B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Chronic Respiratory Alkalosis)";
          acidBaseDesc = "T\u0103ng th\xF4ng kh\xED k\xE9o d\xE0i (v\xED d\u1EE5: \u1EDF v\xF9ng n\xFAi cao, thai k\u1EF3) \u0111\u01B0\u1EE3c th\u1EADn b\xF9 tr\u1EEB th\u1EA3i b\u1EDBt HCO3- gi\xFAp pH b\xECnh th\u01B0\u1EDDng (7.40 - 7.45).";
        }
      } else if (isPaCO2High && isHCO3High) {
        compensation = "fully_compensated";
        if (pH < 7.4) {
          primaryDisorder = "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB ho\xE0n to\xE0n";
          acidBaseCategory = "respiratory_acidosis";
          acidBaseTitle = "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Chronic Respiratory Acidosis)";
          acidBaseDesc = "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD, Pickwickian) g\xE2y \u1EE9 CO2; th\u1EADn \u0111\xE3 gi\u1EEF \u0111\u1EE7 bicarbonate \u0111\u1EC3 \u0111\u01B0a pH v\u1EC1 kho\u1EA3ng 7.35 - 7.40.";
        } else {
          primaryDisorder = "Ki\u1EC1m chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n";
          acidBaseCategory = "metabolic_alkalosis";
          acidBaseTitle = "Ki\u1EC1m chuy\u1EC3n h\xF3a B\xF9 tr\u1EEB ho\xE0n to\xE0n (Fully Compensated Metabolic Alkalosis)";
          acidBaseDesc = "Ki\u1EC1m chuy\u1EC3n h\xF3a nguy\xEAn ph\xE1t \u0111\u01B0\u1EE3c ph\u1ED5i b\xF9 tr\u1EEB b\u1EB1ng gi\u1EA3m th\xF4ng kh\xED gi\u1EEF CO2, \u0111\u01B0a pH v\u1EC1 7.40 - 7.45.";
        }
      } else if (isPaCO2High && isHCO3Low || isPaCO2Low && isHCO3High) {
        isMixed = true;
        acidBaseCategory = "mixed_acid_base";
        compensation = "mixed";
        if (isPaCO2Low && isHCO3Low) {
          acidBaseTitle = "R\u1ED1i lo\u1EA1n Toan - Ki\u1EC1m H\u1ED7n H\u1EE3p \u0110\u1ED1i Kh\xE1ng (Mixed Acid-Base Disorder)";
          acidBaseDesc = "\u0110i\u1EC3n h\xECnh l\xE0 ng\u1ED9 \u0111\u1ED9c Aspirin (Salicylate): V\u1EEBa k\xEDch th\xEDch trung t\xE2m h\xF4 h\u1EA5p g\xE2y ki\u1EC1m h\xF4 h\u1EA5p, v\u1EEBa l\xE0 acid h\u1EEFu c\u01A1 g\xE2y toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap.";
        } else {
          acidBaseTitle = "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p: Toan h\xF4 h\u1EA5p m\u1EA1n ph\u1ED1i h\u1EE3p Ki\u1EC1m chuy\u1EC3n h\xF3a";
          acidBaseDesc = "\u0110i\u1EC3n h\xECnh \u1EDF b\u1EC7nh nh\xE2n COPD \u1EE9 CO2 m\u1EA1n t\xEDnh \u0111\u01B0\u1EE3c \u0111i\u1EC1u tr\u1ECB thu\u1ED1c l\u1EE3i ti\u1EC3u quai l\xE0m h\u1EA1 Kali v\xE0 t\u0103ng ki\u1EC1m chuy\u1EC3n h\xF3a.";
        }
      } else {
        acidBaseCategory = "normal";
        acidBaseTitle = "Th\u0103ng b\u1EB1ng Ki\u1EC1m - Toan B\xECnh Th\u01B0\u1EDDng (Normal Acid-Base Balance)";
        acidBaseDesc = "pH, PaCO2 v\xE0 HCO3- \u0111\u1EC1u n\u1EB1m ho\xE0n to\xE0n trong gi\u1EDBi h\u1EA1n tham chi\u1EBFu chu\u1EA9n.";
      }
    }
    const criticalWarnings = [];
    if (isVenousSample) {
      criticalWarnings.push("\u26A0\uFE0F C\u1EA2NH B\xC1O M\u1EAAU M\xC1U T\u0128NH M\u1EA0CH (VBG): N\u1EBFu nghi ng\u1EDD l\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch (m\xE1u s\u1EABm m\xE0u, kh\xF4ng t\u1EF1 \u0111\u1EA9y piston, SaO2 kh\xED m\xE1u th\u1EA5p xa so v\u1EDBi SpO2 k\u1EB9p m\u1EA1ch), KH\xD4NG \u0110\u01AF\u1EE2C d\xF9ng \u0111\u1EC3 \u0111\xE1nh gi\xE1 PaO2/oxy h\xF3a m\xE1u!");
    }
    if (pao2Kpa < 8 || pao2MmHg < 60) {
      criticalWarnings.push('\u{1F6A8} NGUY C\u01A0 T\u1EEC VONG: PaO2 < 60 mmHg (< 8.0 kPa) r\u01A1i v\xE0o "\u0110O\u1EA0N D\u1ED0C" c\u1EE7a \u0111\u01B0\u1EDDng cong ph\xE2n ly Oxyhemoglobin. B\u1EA5t k\u1EF3 s\u1EF1 s\u1EE5t gi\u1EA3m PaO2 n\xE0o ti\u1EBFp theo \u0111\u1EC1u l\xE0m t\u1EE5t d\u1ED1c SaO2 \u0111\u1ED9t ng\u1ED9t g\xE2y thi\u1EBFu oxy m\xF4 tr\u1EA7m tr\u1ECDng!');
    }
    if (pco2MmHg > 45 && gasExchangeCategory === "type2_respiratory_impairment" && pH < 7.25) {
      criticalWarnings.push("\u{1F6A8} C\u1EA4P C\u1EE8U H\xD4 H\u1EA4P: PaCO2 t\u0103ng k\xE8m toan m\xE1u n\u1EB7ng (pH < 7.25) l\xE0 d\u1EA5u hi\u1EC7u ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p (Exhaustion) ho\u1EB7c suy th\xF4ng kh\xED t\u1ED1i c\u1EA5p, c\u1EA7n chu\u1EA9n b\u1ECB h\u1ED7 tr\u1EE3 th\xF4ng kh\xED (BiPAP ho\u1EB7c \u0111\u1EB7t N\u1ED9i kh\xED qu\u1EA3n) ngay l\u1EADp t\u1EE9c!");
    }
    if (pH < 7.25 || hIon > 55) {
      criticalWarnings.push(`\u{1F6A8} TOAN M\xC1U N\u1EB6NG (pH ${pH} / [H+] ${hIon} nmol/L): C\u01A1 ch\u1EBF b\xF9 tr\u1EEB sinh l\xFD \u0111\xE3 c\u1EA1n ki\u1EC7t, nguy c\u01A1 tr\u1EE5y tim m\u1EA1ch, lo\u1EA1n nh\u1ECBp th\u1EA5t ch\u1EBFt ng\u01B0\u1EDDi v\xE0 \u0111\u1EC1 kh\xE1ng catecholamine!`);
    } else if (pH > 7.55) {
      criticalWarnings.push(`\u{1F6A8} KI\u1EC0M M\xC1U N\u1EB6NG (pH ${pH}): T\u0103ng co th\u1EAFt m\u1EA1ch m\xE1u n\xE3o, co gi\u1EADt tetany, gi\u1EA3m t\u01B0\u1EDBi m\xE1u m\u1EA1ch v\xE0nh, h\u1EA1 calci v\xE0 kali m\xE1u \u0111e d\u1ECDa ng\u1EEBng tim!`);
    }
    if (be < -10 || hco3 < 15) {
      criticalWarnings.push(`\u26A0\uFE0F TOAN CHUY\u1EC2N H\xD3A N\u1EB6NG (BE ${be} / HCO3 ${hco3} mmol/L): N\u1EB1m trong c\xE1c h\u1EC7 th\u1ED1ng t\xEDnh \u0111i\u1EC3m nguy k\u1ECBch (APACHE, Glasgow), c\u1EA3nh b\xE1o thi\u1EBFu oxy m\xF4 s\xE2u ho\u1EB7c t\xEDch t\u1EE5 acid chuy\u1EC3n h\xF3a n\u1EB7ng.`);
    }
    if (lactate !== void 0 && lactate > 4) {
      criticalWarnings.push(`\u{1F6A8} TOAN LACTIC N\u1EB6NG (${lactate} mmol/L): Ch\u1EC9 \u0111i\u1EC3m thi\u1EBFu oxy m\xF4 to\xE0n th\u1EC3 / s\u1ED1c nhi\u1EC5m khu\u1EA9n / ho\u1EA1i t\u1EED thi\u1EBFu m\xE1u t\u1EA1ng. T\u1EF7 l\u1EC7 t\u1EED vong l\xEAn t\u1EDBi 30-50% n\u1EBFu kh\xF4ng h\u1ED3i s\u1EE9c k\u1ECBp th\u1EDDi!`);
    }
    if (coHb !== void 0 && coHb > 10) {
      criticalWarnings.push(`\u{1F6A8} NG\u1ED8 \u0110\u1ED8C KH\xCD CO (COHb ${coHb}%): CO \xE1i l\u1EF1c g\u1EA5p 200 l\u1EA7n oxy v\u1EDBi Hemoglobin. M\xE1y \u0111o SpO2 k\u1EB9p ng\xF3n tay v\xE0 gi\xE1 tr\u1ECB PaO2 tr\xEAn m\xE1y kh\xED m\xE1u KH\xD4NG PH\u1EA2N \xC1NH \u0110\xDANG l\u01B0\u1EE3ng oxy m\xF4 th\u1EF1c t\u1EBF! Ch\u1EC9 \u0111\u1ECBnh th\u1EDF Oxy 100% qua mask th\u1EDF l\u1EA1i ngay.`);
    }
    const sixSteps = [
      {
        stepNumber: 1,
        stepName: "B\u01B0\u1EDBc 1: \u0110\xE1nh gi\xE1 l\xE2m s\xE0ng (Review the Patient)",
        title: "B\u1EC7nh s\u1EED, tri gi\xE1c v\xE0 d\u1EA5u hi\u1EC7u sinh t\u1ED3n",
        finding: `Tu\u1ED5i: ${patientAge}, SpO2: ${sao2}%, FiO2: ${fio2Pct}%`,
        detail: "Lu\xF4n \u0111\u1ED1i chi\u1EBFu kh\xED m\xE1u v\u1EDBi b\u1EC7nh c\u1EA3nh th\u1EF1c t\u1EBF: ti\u1EC1n s\u1EED COPD, \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng, ch\u1EA5n th\u01B0\u01A1ng, s\u1ED1c, n\xF4n \xF3i hay s\u1EED d\u1EE5ng thu\u1ED1c an th\u1EA7n/morphin. Kh\xED m\xE1u kh\xF4ng bao gi\u1EDD \u0111\u01B0\u1EE3c t\xE1ch r\u1EDDi kh\u1ECFi ng\u01B0\u1EDDi b\u1EC7nh.",
        status: "info"
      },
      {
        stepNumber: 2,
        stepName: "B\u01B0\u1EDBc 2: Ph\xE2n t\xEDch Oxy h\xF3a m\xE1u (Analyse Oxygenation)",
        title: `PaO2: ${pao2MmHg.toFixed(1)} mmHg (${pao2Kpa.toFixed(1)} kPa) | SaO2: ${sao2}%`,
        finding: isPaO2Low ? `Gi\u1EA3m oxy m\xE1u (${hypoxaemiaSeverity})` : "Oxy h\xF3a m\xE1u b\u1EA3o t\u1ED3n",
        detail: `T\u1EC9 l\u1EC7 P/F = ${pfRatio} (${pfClass}). A-a gradient = ${aaGradientMmHg.toFixed(1)} mmHg (chu\u1EA9n theo tu\u1ED5i: ~${expectedAaMmHg.toFixed(0)} mmHg). ${isAaGradientElevated ? "A-a gradient t\u0103ng: T\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1EBF nang mao m\u1EA1ch ho\u1EB7c b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q." : "A-a gradient b\xECnh th\u01B0\u1EDDng: Gi\u1EA3m oxy do gi\u1EA3m th\xF4ng kh\xED thu\u1EA7n t\xFAy ho\u1EB7c \u0111\u1ED9 cao."}`,
        status: isPaO2Low ? hypoxaemiaSeverity === "severe" ? "danger" : "warning" : "normal"
      },
      {
        stepNumber: 3,
        stepName: "B\u01B0\u1EDBc 3: \u0110\xE1nh gi\xE1 pH m\xE1u (Assess the pH)",
        title: `pH: ${pH} (N\u1ED3ng \u0111\u1ED9 H+: ${hIon} nmol/L)`,
        finding: acidaemiaStatus === "acidaemia" ? "Toan m\xE1u (Acidaemia, pH < 7.35)" : acidaemiaStatus === "alkalaemia" ? "Ki\u1EC1m m\xE1u (Alkalaemia, pH > 7.45)" : "pH trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng (7.35 - 7.45)",
        detail: acidaemiaStatus === "acidaemia" ? "Toan m\xE1u l\xE0m gi\u1EA3m s\u1EE9c co b\xF3p c\u01A1 tim, gi\u1EA3m \u0111\xE1p \u1EE9ng m\u1EA1ch m\xE1u v\u1EDBi catecholamine. N\u1EBFu pH < 7.25 l\xE0 t\xECnh tr\u1EA1ng c\u1EA5p c\u1EE9u kh\u1EA9n." : acidaemiaStatus === "alkalaemia" ? "Ki\u1EC1m m\xE1u g\xE2y co th\u1EAFt m\u1EA1ch m\xE1u n\xE3o, gi\u1EA3m gi\u1EA3i ph\xF3ng oxy cho m\xF4 (l\u1EC7ch tr\xE1i \u0111\u01B0\u1EDDng cong oxyhemoglobin) v\xE0 h\u1EA1 calci ion t\u1EF1 do." : "pH b\xECnh th\u01B0\u1EDDng kh\xF4ng \u0111\u1ED3ng ngh\u0129a v\u1EDBi kh\xF4ng c\xF3 r\u1ED1i lo\u1EA1n: c\xF3 th\u1EC3 l\xE0 r\u1ED1i lo\u1EA1n \u0111\xE3 b\xF9 tr\u1EEB ho\xE0n to\xE0n ho\u1EB7c r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p \u0111\u1ED1i kh\xE1ng.",
        status: acidaemiaStatus === "normal" ? "normal" : "danger"
      },
      {
        stepNumber: 4,
        stepName: "B\u01B0\u1EDBc 4: \u0110\xE1nh gi\xE1 R\u1ED1i lo\u1EA1n H\xF4 h\u1EA5p (Assess Respiratory Disturbance)",
        title: `PaCO2: ${pco2MmHg.toFixed(1)} mmHg (${pco2Kpa.toFixed(1)} kPa)`,
        finding: isPaCO2High ? "T\u0103ng CO2 m\xE1u (Hypercapnia) -> Toan h\xF4 h\u1EA5p" : isPaCO2Low ? "Gi\u1EA3m CO2 m\xE1u (Hypocapnia) -> Ki\u1EC1m h\xF4 h\u1EA5p" : "PaCO2 b\xECnh th\u01B0\u1EDDng (35 - 45 mmHg)",
        detail: isPaCO2High ? "T\u0103ng PaCO2 ch\u1EC9 ra gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang. C\u1EA7n ki\u1EC3m tra xem l\xE0 c\u1EA5p t\xEDnh, m\u1EA1n t\xEDnh (\u1EDF COPD) hay c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n." : isPaCO2Low ? "Gi\u1EA3m PaCO2 do t\u0103ng th\xF4ng kh\xED ph\u1EBF nang. Ph\xE2n bi\u1EC7t t\u0103ng th\xF4ng kh\xED nguy\xEAn ph\xE1t (lo \xE2u, \u0111au) hay th\u1EE9 ph\xE1t b\xF9 tr\u1EEB toan chuy\u1EC3n h\xF3a." : "Th\xF4ng kh\xED ph\u1EBF nang b\xECnh th\u01B0\u1EDDng \u0111\u1ED1i v\u1EDBi t\u1ED1c \u0111\u1ED9 s\u1EA3n sinh CO2.",
        status: isPaCO2High || isPaCO2Low ? "warning" : "normal"
      },
      {
        stepNumber: 5,
        stepName: "B\u01B0\u1EDBc 5: \u0110\xE1nh gi\xE1 R\u1ED1i lo\u1EA1n Chuy\u1EC3n h\xF3a (Assess Metabolic Disturbance)",
        title: `HCO3-: ${hco3} mmol/L | Base Excess (BE): ${be > 0 ? "+" + be : be} mmol/L`,
        finding: isHCO3Low ? "Gi\u1EA3m Bicarbonate / BE \xE2m -> Toan chuy\u1EC3n h\xF3a" : isHCO3High ? "T\u0103ng Bicarbonate / BE d\u01B0\u01A1ng -> Ki\u1EC1m chuy\u1EC3n h\xF3a" : "Bicarbonate & BE trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng",
        detail: isHCO3Low ? `Toan chuy\u1EC3n h\xF3a: C\u1EA7n t\xEDnh Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap) \u0111\u1EC3 ph\xE2n \u0111\u1ECBnh toan t\u0103ng AG (DKA, Lactic, suy th\u1EADn, ng\u1ED9 \u0111\u1ED9c) hay toan AG b\xECnh th\u01B0\u1EDDng (m\u1EA5t qua ti\xEAu h\xF3a, toan \u1ED1ng th\u1EADn). ${anionGap !== void 0 ? `Anion Gap hi\u1EC7n t\u1EA1i = ${anionGap.toFixed(1)} mmol/L (${isAnionGapHigh ? "T\u0102NG" : "B\xCCNH TH\u01AF\u1EDCNG"}).` : ""}` : isHCO3High ? "Ki\u1EC1m chuy\u1EC3n h\xF3a: Th\u01B0\u1EDDng do m\u1EA5t ion H+ qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a (n\xF4n \xF3i, h\xFAt d\u1EA1 d\xE0y), m\u1EA5t qua th\u1EADn (l\u1EE3i ti\u1EC3u quai/thiazide) ho\u1EB7c th\u1EEBa kho\xE1ng corticoid." : "Th\xE0nh ph\u1EA7n \u0111\u1EC7m chuy\u1EC3n h\xF3a duy tr\xEC t\u1ED1t.",
        status: isHCO3Low || isHCO3High ? "warning" : "normal"
      },
      {
        stepNumber: 6,
        stepName: "B\u01B0\u1EDBc 6: X\xE1c \u0111\u1ECBnh B\xF9 tr\u1EEB hay R\u1ED1i lo\u1EA1n H\u1ED7n h\u1EE3p (Compensatory vs Mixed)",
        title: `T\xECnh tr\u1EA1ng b\xF9 tr\u1EEB: ${compensation.toUpperCase()}`,
        finding: acidBaseTitle,
        detail: isMixed ? "T\u1ED3n t\u1EA1i \u0111\u1ED3ng th\u1EDDi t\u1EEB hai r\u1ED1i lo\u1EA1n ti\xEAn ph\xE1t tr\u1EDF l\xEAn (v\xED d\u1EE5: v\u1EEBa toan chuy\u1EC3n h\xF3a v\u1EEBa ki\u1EC1m h\xF4 h\u1EA5p nh\u01B0 trong ng\u1ED9 \u0111\u1ED9c Salicylate, ho\u1EB7c toan h\u1ED7n h\u1EE3p c\u1EF1c n\u1EB7ng trong ng\u1EEBng tim)." : compensation === "fully_compensated" ? `B\xF9 tr\u1EEB ho\xE0n to\xE0n: pH \u0111\xE3 tr\u1EDF l\u1EA1i d\u1EA3i 7.35 - 7.45. X\xE9t m\u1ED1c 7.40 \u0111\u1EC3 bi\u1EBFt g\u1ED1c r\u1ED1i lo\u1EA1n ban \u0111\u1EA7u (pH < 7.40 thi\xEAn toan; pH > 7.40 thi\xEAn ki\u1EC1m). Nh\u1EDB r\u1EB1ng sinh l\xFD kh\xF4ng bao gi\u1EDD b\xF9 qu\xE1 m\u1EE9c.` : compensation === "partially_compensated" ? "B\xF9 tr\u1EEB b\xE1n ph\u1EA7n: C\u01A1 quan \u0111\u1ED1i ngh\u1ECBch \u0111ang n\u1ED7 l\u1EF1c b\xF9 tr\u1EEB nh\u01B0ng pH v\u1EABn c\xF2n l\u1EC7ch kh\u1ECFi kho\u1EA3ng an to\xE0n." : "Ch\u01B0a c\xF3 b\xF9 tr\u1EEB: R\u1ED1i lo\u1EA1n di\u1EC5n ra qu\xE1 c\u1EA5p t\xEDnh khi\u1EBFn c\u01A1 quan \u0111\u1ED1i ngh\u1ECBch ch\u01B0a k\u1ECBp \u0111\xE1p \u1EE9ng.",
        status: isMixed ? "danger" : compensation === "fully_compensated" ? "normal" : "warning"
      }
    ];
    const treatmentProtocols = generateTreatmentGuidance(
      gasExchangeCategory,
      hypoxaemiaSeverity,
      type2Subtype,
      acidBaseCategory,
      compensation,
      pH,
      pao2MmHg,
      pco2MmHg,
      hco3,
      lactate,
      glucose,
      isAnionGapHigh,
      fio2Pct
    );
    return {
      gasExchange: {
        category: gasExchangeCategory,
        title: gasExchangeTitle,
        description: gasExchangeDesc,
        severity: hypoxaemiaSeverity,
        type2Subtype,
        isHyperventilationPrimary,
        isHypoxaemia: isPaO2Low,
        hypoxaemiaSeverity
      },
      acidBase: {
        category: acidBaseCategory,
        title: acidBaseTitle,
        description: acidBaseDesc,
        compensation,
        acidaemiaStatus,
        primaryDisorder,
        compensatoryResponse,
        isMixed,
        mixedDetails
      },
      calculations: {
        hIonNmol: hIon,
        pao2MmHg: Math.round(pao2MmHg * 10) / 10,
        paco2MmHg: Math.round(pco2MmHg * 10) / 10,
        pao2Kpa: Math.round(pao2Kpa * 10) / 10,
        paco2Kpa: Math.round(pco2Kpa * 10) / 10,
        pfRatio,
        pfClass,
        pao2Alveolar: Math.round(pao2AlveolarMmHg * 10) / 10,
        aaGradient: Math.round(aaGradientMmHg * 10) / 10,
        expectedAaGradient: Math.round(expectedAaMmHg * 10) / 10,
        isAaGradientElevated,
        anionGap: anionGap !== void 0 ? Math.round(anionGap * 10) / 10 : void 0,
        anionGapWithK: anionGapWithK !== void 0 ? Math.round(anionGapWithK * 10) / 10 : void 0,
        isAnionGapHigh,
        correctedAnionGap: correctedAnionGap !== void 0 ? Math.round(correctedAnionGap * 10) / 10 : void 0,
        deltaRatio,
        deltaRatioInterpretation,
        expectedPaco2Winter: isHCO3Low ? { min: winterMin, max: winterMax } : void 0
      },
      criticalWarnings,
      sixSteps,
      treatmentProtocols
    };
  }
  function generateTreatmentGuidance(gasCategory, gasSeverity, type2Sub, acidCategory, comp, pH, pao2, pco2, hco3, lactate, glucose, isAGHigh, fio2) {
    let summary = "X\u1EED tr\xED th\u0103ng b\u1EB1ng n\u1ED9i m\xF4i, duy tr\xEC oxy h\xF3a m\xE1u v\xE0 gi\u1EA3i quy\u1EBFt nguy\xEAn nh\xE2n g\u1ED1c r\u1EC5.";
    let oxygenTherapy = "Duy tr\xEC SpO2 m\u1EE5c ti\xEAu 94 - 98% \u1EDF b\u1EC7nh nh\xE2n kh\xF4ng c\xF3 nguy c\u01A1 \u1EE9 th\xE1n kh\xED CO2.";
    let ventilationSupport = "Ch\u01B0a c\xF3 ch\u1EC9 \u0111\u1ECBnh can thi\u1EC7p th\xF4ng kh\xED c\u01A1 h\u1ECDc x\xE2m nh\u1EADp.";
    const underlyingManagement = [];
    let monitoringAdvice = "Theo d\xF5i monitor SpO2 li\xEAn t\u1EE5c, l\xE0m l\u1EA1i ABG sau 30-60 ph\xFAt n\u1EBFu c\xF3 thay \u0111\u1ED5i l\xE2m s\xE0ng.";
    const precautions = [];
    if (gasCategory === "type2_respiratory_impairment") {
      if (type2Sub === "chronic" || type2Sub === "acute_on_chronic") {
        summary = "X\u1EED tr\xED \u0110\u1EE3t c\u1EA5p Suy h\xF4 h\u1EA5p Type 2 tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh (COPD / Pickwickian). Tuy\u1EC7t \u0111\u1ED1i tr\xE1nh th\u1EDF oxy n\u1ED3ng \u0111\u1ED9 cao l\xE0m d\u1EADp t\u1EAFt Hypoxic Drive!";
        oxygenTherapy = "Li\u1EC7u ph\xE1p OXY KI\u1EC2M SO\xC1T n\u1ED3ng \u0111\u1ED9 th\u1EA5p (Controlled Oxygen Therapy): D\xF9ng Mask Venturi 24% - 28% ho\u1EB7c g\u1ECDng m\u0169i 1 - 2 L/ph\xFAt. M\u1EE4C TI\xCAU SpO2 CH\u1EB6T CH\u1EBC: 88% - 92% (tr\xE1nh \u0111\u1EA9y PaO2 l\xEAn qu\xE1 cao l\xE0m m\u1EA5t k\xEDch th\xEDch th\u1EDF)";
        precautions.push("C\u1EA2NH B\xC1O HYPOXIC DRIVE: \u1EDE b\u1EC7nh nh\xE2n \u1EE9 CO2 m\u1EA1n t\xEDnh, th\u1EE5 th\u1EC3 c\u1EA3m nh\u1EADn CO2 \u0111\xE3 tr\u01A1 l\xEC, ph\u1EA3n x\u1EA1 th\u1EDF ph\u1EE5 thu\u1ED9c v\xE0o t\xECnh tr\u1EA1ng thi\u1EBFu oxy m\xE1u. Th\u1EDF oxy qu\xE1 m\u1EE9c (nh\u01B0 mask 60% hay t\xFAi d\u1EF1 tr\u1EEF) s\u1EBD d\u1EADp t\u1EAFt k\xEDch th\xEDch n\xE0y, g\xE2y gi\u1EA3m th\xF4ng kh\xED th\u1EE9 ph\xE1t, PaCO2 v\u1ECDt l\xEAn d\u1EABn \u0111\u1EBFn h\xF4n m\xEA v\xE0 ng\u1EEBng th\u1EDF!");
        if (pH < 7.35 || pco2 > 50) {
          ventilationSupport = "CH\u1EC8 \u0110\u1ECANH TH\xD4NG KH\xCD KH\xD4NG X\xC2M NH\u1EACP (NIV / BiPAP): \u01AFu ti\xEAn h\xE0ng \u0111\u1EA7u cho \u0111\u1EE3t c\u1EA5p COPD c\xF3 toan h\xF4 h\u1EA5p (pH 7.25 - 7.35, PaCO2 t\u0103ng). C\xE0i \u0111\u1EB7t IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, n\xE2ng d\u1EA7n \u0111\u1EC3 gi\u1EA3m c\xF4ng th\u1EDF v\xE0 th\u1EA3i CO2. Chu\u1EA9n b\u1ECB \u0111\u1EB7t N\u1ED9i kh\xED qu\u1EA3n n\u1EBFu ki\u1EC7t c\u01A1 (pH < 7.25, r\u1ED1i lo\u1EA1n tri gi\xE1c).";
        }
        underlyingManagement.push("Kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n t\xE1c d\u1EE5ng ng\u1EAFn: SABA (Salbutamol) + SAMA (Ipratropium).");
        underlyingManagement.push("Corticosteroid \u0111\u01B0\u1EDDng to\xE0n th\xE2n (Prednisolone ho\u1EB7c Methylprednisolone).");
        underlyingManagement.push("Kh\xE1ng sinh n\u1EBFu c\xF3 d\u1EA5u hi\u1EC7u nhi\u1EC5m tr\xF9ng (tam ch\u1EE9ng Anthonisen: t\u0103ng kh\xF3 th\u1EDF, t\u0103ng \u0111\u1EDDm, \u0111\u1EDDm m\u1EE7).");
      } else {
        summary = "X\u1EED tr\xED Suy h\xF4 h\u1EA5p Type 2 C\u1EA5p t\xEDnh (Ng\u1ED9 \u0111\u1ED9c thu\u1ED1c \u1EE9c ch\u1EBF th\u1EA7n kinh, ki\u1EC7t c\u01A1, nh\u01B0\u1EE3c c\u01A1, d\u1ECB v\u1EADt \u0111\u01B0\u1EDDng th\u1EDF).";
        oxygenTherapy = "Cung c\u1EA5p oxy \u0111\u1EE7 \u0111\u1EC3 duy tr\xEC SpO2 > 92%. V\xEC l\xE0 c\u1EA5p t\xEDnh, b\u1EC7nh nh\xE2n KH\xD4NG ph\u1EE5 thu\u1ED9c hypoxic drive, nh\u01B0ng t\u0103ng PaCO2 l\xE0 kh\u1EA9n c\u1EA5p.";
        ventilationSupport = "H\u1ED7 tr\u1EE3 th\xF4ng kh\xED b\xF3ng qua mask (BVM) ngay l\u1EADp t\u1EE9c n\u1EBFu nh\u1ECBp th\u1EDF ch\u1EADm (< 8 l/p) ho\u1EB7c ng\u1EEBng th\u1EDF. S\u1EB5n s\xE0ng \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n v\xE0 th\u1EDF m\xE1y.";
        underlyingManagement.push("N\u1EBFu nghi ng\u1EDD ng\u1ED9 \u0111\u1ED9c Opioid/Morphine (\u0111\u1ED3ng t\u1EED co nh\u1ECF nh\u01B0 \u0111\u1EA7u \u0111inh ghim, th\u1EDF ch\u1EADm): Ti\xEAm t\u0129nh m\u1EA1ch NALOXONE 0.4mg - 2mg, l\u1EB7p l\u1EA1i m\u1ED7i 2-3 ph\xFAt n\u1EBFu ch\u01B0a \u0111\xE1p \u1EE9ng.");
        underlyingManagement.push("N\u1EBFu do ng\u1ED9 \u0111\u1ED9c Benzodiazepine: C\xE2n nh\u1EAFc Flumazenil (th\u1EADn tr\u1ECDng ti\u1EC1n s\u1EED \u0111\u1ED9ng kinh/nghi\u1EC7n m\xE3n).");
        underlyingManagement.push("Gi\u1EA3i ph\xF3ng d\u1ECB v\u1EADt \u0111\u01B0\u1EDDng th\u1EDF n\u1EBFu c\xF3 t\u1EAFc ngh\u1EBDn c\u01A1 h\u1ECDc.");
      }
    } else if (gasCategory === "type1_respiratory_impairment") {
      summary = `X\u1EED tr\xED Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u m\u1EE9c \u0111\u1ED9 ${gasSeverity}). M\u1EE5c ti\xEAu n\xE2ng PaO2 > 60 mmHg (8 kPa) v\xE0 SaO2 > 92%.`;
      if (gasSeverity === "severe") {
        oxygenTherapy = "Oxy l\u01B0u l\u01B0\u1EE3ng cao: Th\u1EDF Mask c\xF3 t\xFAi d\u1EF1 tr\u1EEF kh\xF4ng th\u1EDF l\u1EA1i (Non-rebreather mask) 10 - 15 L/ph\xFAt \u0111\u1EC3 \u0111\u1EA1t FiO2 60% - 90%, ho\u1EB7c h\u1EC7 th\u1ED1ng oxy d\xF2ng cao qua m\u0169i (HFNC).";
        ventilationSupport = "C\xE2n nh\u1EAFc CPAP/NIV ho\u1EB7c \u0111\u1EB7t N\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y x\xE2m nh\u1EADp n\u1EBFu P/F < 150, co k\xE9o c\u01A1 h\xF4 h\u1EA5p ph\u1EE5 d\u1EEF d\u1ED9i ho\u1EB7c toan lactic ti\u1EBFn tri\u1EC3n do ki\u1EC7t s\u1EE9c.";
      } else if (gasSeverity === "moderate") {
        oxygenTherapy = "Th\u1EDF oxy qua Mask \u0111\u01A1n gi\u1EA3n 5 - 10 L/ph\xFAt (FiO2 35 - 50%) ho\u1EB7c g\u1ECDng m\u0169i 3 - 5 L/ph\xFAt.";
      } else {
        oxygenTherapy = "Th\u1EDF oxy g\u1ECDng k\xEDnh m\u0169i (Nasal cannula) 1 - 3 L/ph\xFAt (FiO2 24 - 32%).";
      }
      underlyingManagement.push("T\xECm v\xE0 \u0111i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n V/Q mismatch ho\u1EB7c Shunt: Vi\xEAm ph\u1ED5i (kh\xE1ng sinh), Thuy\xEAn t\u1EAFc ph\u1ED5i (ch\u1ED1ng \u0111\xF4ng kh\u1EA9n), Ph\xF9 ph\u1ED5i c\u1EA5p (l\u1EE3i ti\u1EC3u + d\xE3n m\u1EA1ch), X\u1EB9p ph\u1ED5i / Tr\xE0n kh\xED m\xE0ng ph\u1ED5i (d\u1EABn l\u01B0u ng\u1EF1c).");
      monitoringAdvice = "Theo d\xF5i SpO2 li\xEAn t\u1EE5c b\u1EB1ng pulse oximeter. V\xEC PaCO2 b\xECnh th\u01B0\u1EDDng, oximetry l\xE0 c\xF4ng c\u1EE5 gi\xE1m s\xE1t ti\u1EBFn tri\u1EC3n r\u1EA5t t\u1ED1t m\xE0 kh\xF4ng c\u1EA7n \u0111\xE2m kim \u0111\u1ED9ng m\u1EA1ch li\xEAn t\u1EE5c.";
    } else if (gasCategory === "hyperventilation") {
      summary = "X\u1EED tr\xED H\u1ED9i ch\u1EE9ng T\u0103ng th\xF4ng kh\xED (Hyperventilation Syndrome / R\u1EEDa tr\xF4i CO2).";
      oxygenTherapy = "N\u1EBFu PaO2 b\xECnh th\u01B0\u1EDDng v\xE0 SpO2 99-100%, KH\xD4NG c\u1EA7n th\u1EDF th\xEAm oxy (tr\u1EEB khi c\xF3 h\u1EA1 oxy m\xE1u ti\u1EC1m \u1EA9n nh\u01B0 trong thuy\xEAn t\u1EAFc ph\u1ED5i ban \u0111\u1EA7u).";
      underlyingManagement.push("Tr\u1EA5n an t\xE2m l\xFD b\u1EC7nh nh\xE2n, h\u01B0\u1EDBng d\u1EABn k\u1EF9 thu\u1EADt th\u1EDF ch\u1EADm v\xE0 s\xE2u (diaphragmatic breathing).");
      underlyingManagement.push("Th\u1EDF l\u1EA1i v\xE0o t\xFAi gi\u1EA5y (Paper bag rebreathing) c\xF3 ki\u1EC3m so\xE1t \u0111\u1EC3 h\xEDt l\u1EA1i CO2 t\u1EF1 sinh, gi\xFAp n\xE2ng PaCO2 v\xE0 c\u1EAFt nhanh tri\u1EC7u ch\u1EE9ng t\xEA m\xF4i/co qu\u1EAFp b\xE0n tay (tetany do h\u1EA1 calci ion t\u1EF1 do). Th\u1EADn tr\u1ECDng lo\u1EA1i tr\u1EEB b\u1EC7nh tim ph\u1ED5i c\u1EA5p tr\u01B0\u1EDBc khi \xE1p d\u1EE5ng.");
      underlyingManagement.push("Gi\u1EA3m \u0111au th\u1ECFa \u0111\xE1ng b\u1EB1ng thu\u1ED1c gi\u1EA3m \u0111au \u0111a m\xF4 th\u1EE9c n\u1EBFu t\u0103ng th\xF4ng kh\xED do \u0111au \u0111\u1EDBn d\u1EEF d\u1ED9i sau ch\u1EA5n th\u01B0\u01A1ng.");
    }
    if (acidCategory === "metabolic_acidosis") {
      if (isAGHigh) {
        underlyingManagement.push("TI\u1EBEP C\u1EACN TOAN CHUY\u1EC2N H\xD3A T\u0102NG ANION GAP: X\xE1c \u0111\u1ECBnh nguy\xEAn nh\xE2n theo nh\xF3m GOLDMARK / MUDPILES.");
        if (glucose && glucose > 13.9) {
          underlyingManagement.push("Nghi ng\u1EDD Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA): B\xF9 d\u1ECBch \u0111\u1EB3ng tr\u01B0\u01A1ng NaCl 0.9% 1000ml trong gi\u1EDD \u0111\u1EA7u; Truy\u1EC1n Insulin t\u0129nh m\u1EA1ch li\xEAn t\u1EE5c 0.1 UI/kg/h; B\xF9 Kali ngay khi K+ < 5.2 mmol/L (ch\u1EC9 truy\u1EC1n insulin khi K+ > 3.3). KH\xD4NG d\xF9ng Bicarbonate tr\u1EEB khi pH < 6.9.");
        }
        if (lactate && lactate > 2) {
          underlyingManagement.push("Toan Lactic do gi\u1EA3m t\u01B0\u1EDBi m\xE1u / S\u1ED1c: H\u1ED3i s\u1EE9c d\u1ECBch tinh th\u1EC3 30ml/kg trong 3 gi\u1EDD \u0111\u1EA7u (Surviving Sepsis Campaign bundle); D\xF9ng thu\u1ED1c v\u1EADn m\u1EA1ch (Noradrenaline) duy tr\xEC huy\u1EBFt \xE1p trung b\xECnh MAP >= 65 mmHg; Kh\xE1ng sinh ph\u1ED5 r\u1ED9ng trong gi\u1EDD \u0111\u1EA7u n\u1EBFu nhi\u1EC5m khu\u1EA9n.");
        }
      } else {
        underlyingManagement.push("TI\u1EBEP C\u1EACN TOAN CHUY\u1EC2N H\xD3A ANION GAP B\xCCNH TH\u01AF\u1EDCNG (T\u0103ng Clo m\xE1u): M\u1EA5t Bicarbonate qua ti\xEAu h\xF3a (ti\xEAu ch\u1EA3y c\u1EA5p, r\xF2 ru\u1ED9t) ho\u1EB7c qua th\u1EADn (Toan h\xF3a \u1ED1ng th\u1EADn RTA Type 1, 2, 4). \u0110i\u1EC1u tr\u1ECB b\xF9 d\u1ECBch Ringer Lactate/b\xF9 Bicarbonate \u0111\u01B0\u1EDDng u\u1ED1ng v\xE0 \u0111i\u1EC1u ch\u1EC9nh Kali.");
      }
    } else if (acidCategory === "metabolic_alkalosis") {
      underlyingManagement.push('X\u1EEC TR\xCD KI\u1EC0M CHUY\u1EC2N H\xD3A: Ph\u1EA7n l\u1EDBn l\xE0 th\u1EC3 "\u0110\xE1p \u1EE9ng v\u1EDBi Clo" do n\xF4n \xF3i nhi\u1EC1u, m\u1EA5t d\u1ECBch d\u1EA1 d\xE0y ho\u1EB7c d\xF9ng l\u1EE3i ti\u1EC3u quai.');
      underlyingManagement.push("B\xF9 th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n v\xE0 ion Clo b\u1EB1ng truy\u1EC1n t\u0129nh m\u1EA1ch NaCl 0.9% (gi\xFAp th\u1EADn th\u1EA3i b\u1EDBt HCO3- d\u01B0 th\u1EEBa).");
      underlyingManagement.push("B\xF9 Kali (KCl truy\u1EC1n ho\u1EB7c u\u1ED1ng): Khi thi\u1EBFu Kali, \u1ED1ng l\u01B0\u1EE3n xa th\u1EADn bu\u1ED9c ph\u1EA3i b\xE0i ti\u1EBFt ion H+ \u0111\u1EC3 gi\u1EEF Natri, l\xE0m duy tr\xEC v\xF2ng xo\u1EAFn ki\u1EC1m chuy\u1EC3n h\xF3a.");
      if (type2Sub === "chronic") {
        underlyingManagement.push("L\u01B0u \xFD: B\u1EC7nh nh\xE2n COPD d\xF9ng l\u1EE3i ti\u1EC3u li\u1EC1u cao th\u01B0\u1EDDng b\u1ECB ki\u1EC1m chuy\u1EC3n h\xF3a ch\u1ED3ng l\u1EA5p l\xEAn toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh. C\xE2n nh\u1EAFc d\xF9ng l\u1EE3i ti\u1EC3u gi\u1EEF Kali (Spironolactone) ho\u1EB7c t\u1EA1m ng\u01B0ng furosemide.");
      }
    }
    return {
      summary,
      oxygenTherapy,
      ventilationSupport,
      underlyingManagement,
      monitoringAdvice,
      precautions
    };
  }

  // src/content/knowledge-vault/cdss/abg/abg-cases.ts
  var CLINICAL_CASES = [
    {
      id: 1,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 01 (Hennessey)",
      title: "Vi\xEAm ph\u1ED5i th\xF9y c\u1ED9ng \u0111\u1ED3ng \u1EDF ng\u01B0\u1EDDi tr\u1EBB",
      patientProfile: "Nam 25 tu\u1ED5i, kh\xF4ng ti\u1EC1n s\u1EED b\u1EC7nh l\xFD, s\u1ED1t 2 ng\xE0y, ho \u0111\u1EDDm v\xE0 kh\xF3 th\u1EDF t\u0103ng d\u1EA7n",
      categoryTag: "Suy h\xF4 h\u1EA5p Type 1",
      difficulty: "C\u01A1 b\u1EA3n",
      history: "Nam thanh ni\xEAn 25 tu\u1ED5i, kh\u1ECFe m\u1EA1nh, v\xE0o vi\u1EC7n v\xEC s\u1ED1t 39.3\xB0C, ho kh\u1EA1c \u0111\u1EDDm m\u1EE7 v\xE0 kh\xF3 th\u1EDF ti\u1EBFn tri\u1EC3n 2 ng\xE0y. Kh\xF4ng c\xF3 b\u1EC7nh l\xFD h\xF4 h\u1EA5p tr\u01B0\u1EDBc \u0111\xE2y.",
      examination: {
        vitals: {
          pulse: "104 l\u1EA7n/ph\xFAt",
          rr: "28 l\u1EA7n/ph\xFAt",
          bp: "118/70 mmHg",
          temp: "39.3\xB0C",
          spo2: "89% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "T\u1EC9nh, th\u1EDF nhanh co k\xE9o c\u01A1 li\xEAn s\u01B0\u1EDDn. Rung thanh t\u0103ng, g\xF5 \u0111\u1EE5c, ti\u1EBFng th\u1EDF ph\u1EBF qu\u1EA3n v\xE0 ran n\u1ED5 th\xF4 \u1EDF \u0111\xE1y ph\u1ED5i tr\xE1i ph\xEDa sau."
      },
      abg: {
        unit: "kPa",
        pH: 7.5,
        pCO2: 3.74,
        // 28.1 mmHg
        pO2: 7.68,
        // 57.8 mmHg
        hco3: 23.9,
        be: -0.5,
        sao2: 88.7,
        fio2: 21,
        na: 138,
        k: 3.7,
        cl: 99,
        lactate: 1.2,
        glucose: 5.4,
        patientAge: 25
      },
      questions: [
        "1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED t\u1EA1i ph\u1ED5i c\u1EE7a b\u1EC7nh nh\xE2n?",
        "2. \u0110\xE1nh gi\xE1 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "3. B\u1EC7nh nh\xE2n c\xF3 c\u1EA7n th\u1EDF oxy b\u1ED5 sung kh\xF4ng?",
        "4. M\xE1y \u0111o SpO2 k\u1EB9p ng\xF3n tay c\xF3 ph\u1EA3i l\xE0 c\xF4ng c\u1EE5 theo d\xF5i ph\xF9 h\u1EE3p thay cho ch\u1ECDc kh\xED m\xE1u l\u1EB7p l\u1EA1i kh\xF4ng?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 trung b\xECnh (PaO2 57.8 mmHg / 7.68 kPa < 60 mmHg). C\xF3 t\xECnh tr\u1EA1ng t\u0103ng th\xF4ng kh\xED ph\u1EBF nang (PaCO2 gi\u1EA3m xu\u1ED1ng 28.1 mmHg / 3.74 kPa) do ph\u1EA3n x\u1EA1 th\u1EDF nhanh b\xF9 tr\u1EEB thi\u1EBFu oxy.",
        acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (pH 7.50 t\u0103ng, PaCO2 gi\u1EA3m, HCO3- b\xECnh th\u01B0\u1EDDng 23.9 mmol/L). L\u01B0u \xFD: th\u1EADn c\u1EA7n nhi\u1EC1u ng\xE0y \u0111\u1EC3 b\xF9 tr\u1EEB chuy\u1EC3n h\xF3a n\xEAn trong r\u1ED1i lo\u1EA1n h\xF4 h\u1EA5p c\u1EA5p t\xEDnh, HCO3- v\u1EABn b\xECnh th\u01B0\u1EDDng.",
        differentialDiagnosis: "Vi\xEAm ph\u1ED5i th\xF9y tr\xE1i (Community-acquired pneumonia - CAP). \u0110\xF4ng \u0111\u1EB7c nhu m\xF4 ph\u1ED5i g\xE2y b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng th\xF4ng kh\xED/t\u01B0\u1EDBi m\xE1u (V/Q mismatch) v\xE0 shunt sinh l\xFD.",
        clinicalAction: "Cho th\u1EDF oxy b\u1ED5 sung ngay (g\u1ECDng k\xEDnh m\u0169i 2-4 L/ph\xFAt) \u0111\u1EC3 \u0111\u01B0a PaO2 l\xEAn > 60 mmHg (SpO2 94-98%). Kh\u1EDFi \u0111\u1ED9ng kh\xE1ng sinh \u0111i\u1EC1u tr\u1ECB vi\xEAm ph\u1ED5i theo ph\xE1c \u0111\u1ED3 kinh nghi\u1EC7m. B\xF9 \u0111\u1EE7 n\u01B0\u1EDBc v\xE0 h\u1EA1 s\u1ED1t.",
        physiologicalInsight: "V\xEC PaCO2 kh\xF4ng t\u0103ng m\xE0 gi\u1EA3m (th\xF4ng kh\xED c\xF2n t\u1ED1t), b\u1EC7nh nh\xE2n ho\xE0n to\xE0n kh\xF4ng c\xF3 nguy c\u01A1 \u1EE9 CO2. SpO2 k\u1EB9p ng\xF3n tay l\xE0 ph\u01B0\u01A1ng ti\u1EC7n theo d\xF5i ti\u1EBFn tri\u1EC3n c\u1EF1c k\u1EF3 an to\xE0n v\xE0 hi\u1EC7u qu\u1EA3, tr\xE1nh vi\u1EC7c ph\u1EA3i ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch \u0111au \u0111\u1EDBn nhi\u1EC1u l\u1EA7n."
      }
    },
    {
      id: 2,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 02 (Hennessey)",
      title: "H\u1ED9i ch\u1EE9ng Pickwickian (B\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED)",
      patientProfile: "N\u1EEF 34 tu\u1ED5i, b\xE9o ph\xEC b\u1EC7nh l\xFD (BMI 49), \u0110T\u0110 type 2, l\xE0m x\xE9t nghi\u1EC7m ti\u1EC1n ph\u1EABu c\u1EAFt d\u1EA1 d\xE0y gi\u1EA3m b\xE9o",
      categoryTag: "Suy h\xF4 h\u1EA5p Type 2",
      difficulty: "Trung b\xECnh",
      history: "B\u1EC7nh nh\xE2n n\u1EEF 34 tu\u1ED5i, BMI = 49 kg/m2, kh\xF4ng tri\u1EC7u ch\u1EE9ng h\xF4 h\u1EA5p l\xFAc ngh\u1EC9, \u0111\u01B0\u1EE3c l\xE0m kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch t\u1EA7m so\xE1t ti\u1EC1n ph\u1EABu tr\u01B0\u1EDBc m\u1ED5 bariatric surgery.",
      examination: {
        vitals: {
          pulse: "76 l\u1EA7n/ph\xFAt",
          rr: "14 l\u1EA7n/ph\xFAt",
          bp: "130/80 mmHg",
          temp: "36.8\xB0C",
          spo2: "96% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "Th\u1EC3 tr\u1EA1ng b\xE9o ph\xEC n\u1EB7ng, l\u1ED3ng ng\u1EF1c di \u0111\u1ED9ng k\xE9m theo nh\u1ECBp th\u1EDF. Nghe ph\u1ED5i r\xEC r\xE0o ph\u1EBF nang gi\u1EA3m nh\u1EB9 to\xE0n b\u1ED9, kh\xF4ng ran."
      },
      abg: {
        unit: "kPa",
        pH: 7.35,
        pCO2: 7.3,
        // 54.8 mmHg
        pO2: 9.6,
        // 72.2 mmHg
        hco3: 29,
        be: 3.8,
        sao2: 96,
        fio2: 21,
        na: 134,
        k: 4.7,
        cl: 102,
        lactate: 1,
        glucose: 9,
        patientAge: 34
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Ch\u1EA9n \u0111o\xE1n nguy\xEAn nh\xE2n h\u1EE3p l\xFD nh\u1EA5t?",
        "3. L\xE0m th\u1EBF n\xE0o \u0111\u1EC3 bi\u1EBFt \u0111\xE2y l\xE0 Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB hay Ki\u1EC1m chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB h\xF4 h\u1EA5p?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EA1n t\xEDnh (T\u0103ng CO2 m\u1EA1n t\xEDnh PaCO2 54.8 mmHg / 7.3 kPa do h\u1EA1n ch\u1EBF l\u1ED3ng ng\u1EF1c). Gi\u1EA3m oxy h\xF3a m\xE1u m\u1EE9c \u0111\u1ED9 nh\u1EB9.",
        acidBase: "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB ho\xE0n to\xE0n (Compensated Respiratory Acidosis). pH 7.35 (\u1EDF c\u1EADn d\u01B0\u1EDBi b\xECnh th\u01B0\u1EDDng 7.35-7.40), HCO3- t\u0103ng l\xEAn 29.0 mmol/L.",
        differentialDiagnosis: "H\u1ED9i ch\u1EE9ng b\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED (Obesity-Hypoventilation Syndrome / Pickwickian Syndrome). Kh\u1ED1i l\u01B0\u1EE3ng m\u1EE1 th\xE0nh ng\u1EF1c qu\xE1 l\u1EDBn c\u1EA3n tr\u1EDF gi\xE3n n\u1EDF ph\u1ED5i g\xE2y gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang k\xE9o d\xE0i.",
        clinicalAction: "T\u1EADp v\u1EADt l\xFD tr\u1ECB li\u1EC7u h\xF4 h\u1EA5p, t\u1EA7m so\xE1t ng\u01B0ng th\u1EDF khi ng\u1EE7 (Polysomnography), ch\u1EC9 \u0111\u1ECBnh th\xF4ng kh\xED \xE1p l\u1EF1c d\u01B0\u01A1ng kh\xF4ng x\xE2m nh\u1EADp (CPAP/BiPAP) ban \u0111\xEAm tr\u01B0\u1EDBc v\xE0 sau ph\u1EABu thu\u1EADt.",
        physiologicalInsight: 'Nguy\xEAn t\u1EAFc v\xE0ng: Kh\xF4ng bao gi\u1EDD c\xF3 s\u1EF1 "b\xF9 tr\u1EEB qu\xE1 m\u1EE9c" (Overcompensation does not occur). \u0110i\u1EC3m trung h\xF2a l\xE0 pH 7.40; v\xEC pH th\u1EF1c t\u1EBF l\xE0 7.35 (nghi\xEAng v\u1EC1 toan) n\xEAn r\u1ED1i lo\u1EA1n ti\xEAn ph\xE1t B\u1EAET BU\u1ED8C l\xE0 Toan h\xF4 h\u1EA5p v\xE0 HCO3 t\u0103ng l\xE0 \u0111\xE1p \u1EE9ng b\xF9 tr\u1EEB c\u1EE7a th\u1EADn k\xE9o d\xE0i nhi\u1EC1u tu\u1EA7n.'
      }
    },
    {
      id: 3,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 03 (Hennessey)",
      title: "Thuy\xEAn t\u1EAFc m\u1EA1ch ph\u1ED5i c\u1EA5p (Pulmonary Embolism)",
      patientProfile: "N\u1EEF 24 tu\u1ED5i, sinh vi\xEAn \u0111i\u1EC1u d\u01B0\u1EE1ng, kh\xF3 th\u1EDF \u0111\u1ED9t ng\u1ED9t sau chuy\u1EBFn bay 24 gi\u1EDD t\u1EEB \xDAc v\u1EC1 Anh",
      categoryTag: "C\u1EA5p c\u1EE9u m\u1EA1ch ph\u1ED5i",
      difficulty: "N\xE2ng cao",
      history: "N\u1EEF 24 tu\u1ED5i, kh\xF4ng ti\u1EC1n s\u1EED b\u1EC7nh tim ph\u1ED5i, kh\xF4ng h\xFAt thu\u1ED1c. V\u1EEBa \u0111\xE1p chuy\u1EBFn bay \u0111\u01B0\u1EDDng d\xE0i t\u1EEB \xDAc v\u1EC1 ng\xE0y h\xF4m tr\u01B0\u1EDBc, xu\u1EA5t hi\u1EC7n kh\xF3 th\u1EDF \u0111\u1ED9t ng\u1ED9t, lo l\u1EAFng t\u1ED9t \u0111\u1ED9. Kh\xF4ng \u0111au ng\u1EF1c ki\u1EC3u m\xE0ng ph\u1ED5i, kh\xF4ng ho m\xE1u.",
      examination: {
        vitals: {
          pulse: "88 l\u1EA7n/ph\xFAt",
          rr: "22 l\u1EA7n/ph\xFAt",
          bp: "124/76 mmHg",
          temp: "37.0\xB0C",
          spo2: "95% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "B\u1EC7nh nh\xE2n r\u1EA5t lo l\u1EAFng, h\u1ED1t ho\u1EA3ng. Kh\xE1m ph\u1ED5i ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng, kh\xF4ng ran, kh\xF4ng d\u1EA5u hi\u1EC7u DVT chi d\u01B0\u1EDBi tr\xEAn l\xE2m s\xE0ng. X-quang ng\u1EF1c th\u1EB3ng b\xECnh th\u01B0\u1EDDng."
      },
      abg: {
        unit: "kPa",
        pH: 7.51,
        pCO2: 3.9,
        // 29.3 mmHg
        pO2: 10.3,
        // 77.0 mmHg
        hco3: 25,
        be: 0.7,
        sao2: 93.7,
        fio2: 21,
        na: 141,
        k: 4.3,
        cl: 101,
        lactate: 1,
        glucose: 4.6,
        patientAge: 24
      },
      questions: [
        "1. Ph\xE2n t\xEDch trao \u0111\u1ED5i kh\xED v\xE0 toan ki\u1EC1m?",
        "2. T\xEDnh to\xE1n A-a gradient \u1EDF ca n\xE0y?",
        "3. Ch\u1EA9n \u0111o\xE1n nghi ng\u1EDD h\xE0ng \u0111\u1EA7u l\xE0 g\xEC v\xE0 h\u01B0\u1EDBng x\u1EED tr\xED ti\u1EBFp theo?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 nh\u1EB9 c\xF3 k\xE8m t\u0103ng th\xF4ng kh\xED r\xF5 r\u1EC7t (PaCO2 gi\u1EA3m xu\u1ED1ng 29.3 mmHg). \u1EDE ng\u01B0\u1EDDi tr\u1EBB 24 tu\u1ED5i b\xECnh th\u01B0\u1EDDng, PaO2 ph\u1EA3i \u0111\u1EA1t > 95 mmHg; m\u1EE9c 77 mmHg l\xE0 b\u1EA5t th\u01B0\u1EDDng r\xF5 r\u1EC7t!",
        acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB do th\u1EDF nhanh ph\u1EA3n x\u1EA1.",
        differentialDiagnosis: "Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i (Pulmonary Embolism - PE) th\u1EE9 ph\xE1t sau huy\u1EBFt kh\u1ED1i t\u0129nh m\u1EA1ch s\xE2u do b\u1EA5t \u0111\u1ED9ng tr\xEAn chuy\u1EBFn bay d\xE0i. Ph\xE2n bi\u1EC7t v\u1EDBi c\u01A1n ho\u1EA3ng lo\u1EA1n (Panic attack/Hyperventilation syndrome).",
        clinicalAction: "A-a gradient t\xEDnh \u0111\u01B0\u1EE3c l\xE0 38 mmHg (4.7 kPa), v\u01B0\u1EE3t xa m\u1EE9c b\xECnh th\u01B0\u1EDDng (< 20 mmHg hay < 2.6 kPa). \u0110i\u1EC1u n\xE0y ch\u1EE9ng minh c\xF3 b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q th\u1EF1c t\u1ED5n trong ph\u1ED5i ch\u1EE9 kh\xF4ng ph\u1EA3i ch\u1EC9 l\xE0 lo \xE2u \u0111\u01A1n thu\u1EA7n! Ch\u1EC9 \u0111\u1ECBnh ngay CT m\u1EA1ch m\xE1u ph\u1ED5i c\xF3 c\u1EA3n quang (CTPA) ho\u1EB7c x\xE9t nghi\u1EC7m D-Dimer, kh\u1EDFi \u0111\u1ED9ng ch\u1ED1ng \u0111\xF4ng khi c\xF3 ch\u1EC9 \u0111\u1ECBnh.",
        physiologicalInsight: "M\u1ED9t c\xE1i b\u1EABy ch\u1EBFt ng\u01B0\u1EDDi tr\xEAn l\xE2m s\xE0ng: Nh\xECn SpO2 95% c\xF3 v\u1EBB b\xECnh th\u01B0\u1EDDng, nh\u01B0ng khi b\u1EC7nh nh\xE2n \u0111ang th\u1EDF nhanh (PaCO2 gi\u1EA3m), theo ph\u01B0\u01A1ng tr\xECnh kh\xED ph\u1EBF nang PAO2 ph\u1EA3i t\u0103ng l\xEAn cao. Khi PaO2 th\u1EF1c t\u1EBF kh\xF4ng t\u0103ng t\u01B0\u01A1ng x\u1EE9ng l\xE0m A-a gradient gi\xE3n r\u1ED9ng, \u0111\xF3 l\xE0 b\u1EB1ng ch\u1EE9ng c\u1EE7a t\u1EAFc ngh\u1EBDn gi\u01B0\u1EDDng m\u1EA1ch ph\u1ED5i!"
      }
    },
    {
      id: 4,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 04 (Hennessey)",
      title: "Ng\u1ED9 \u0111\u1ED9c Morphin h\u1EADu ph\u1EABu g\xE2y ng\u1EEBng th\u1EDF",
      patientProfile: "Nam 78 tu\u1ED5i, h\u1EADu ph\u1EABu c\u1EAFt t\xFAi m\u1EADt m\u1EDF, li b\xEC kh\xF3 \u0111\xE1nh th\u1EE9c, \u0111\u1ED3ng t\u1EED co nh\u1ECF",
      categoryTag: "Ng\u1ED9 \u0111\u1ED9c / C\u1EA5p c\u1EE9u",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "C\u1EE5 \xF4ng 78 tu\u1ED5i v\u1EEBa m\u1ED5 h\u1EDF c\u1EAFt t\xFAi m\u1EADt ph\u1EE9c t\u1EA1p. B\u1EC7nh nh\xE2n \u0111\u01B0\u1EE3c ti\xEAm 3 m\u0169i Morphin 10mg trong v\xF2ng v\xE0i gi\u1EDD ngo\xE0i l\u01B0\u1EE3ng morphin do m\xE1y gi\u1EA3m \u0111au PCA cung c\u1EA5p. \u0110i\u1EC1u d\u01B0\u1EE1ng ph\xE1t hi\u1EC7n b\u1EC7nh nh\xE2n li b\xEC, th\u1EDF ng\u1EAFt qu\xE3ng.",
      examination: {
        vitals: {
          pulse: "90 l\u1EA7n/ph\xFAt",
          rr: "5 l\u1EA7n/ph\xFAt",
          bp: "98/64 mmHg",
          temp: "36.2\xB0C",
          spo2: "99% (\u0111ang th\u1EDF oxy 28%)",
          fio2: "28%"
        },
        findings: "H\xF4n m\xEA n\xF4ng, kh\xF4ng \u0111\xE1p \u1EE9ng l\u1EDDi g\u1ECDi, th\u1EDF r\u1EA5t n\xF4ng 5 l\u1EA7n/ph\xFAt. Hai \u0111\u1ED3ng t\u1EED co nh\u1ECF nh\u01B0 \u0111\u1EA7u \u0111inh ghim (pinpoint pupils)."
      },
      abg: {
        unit: "kPa",
        pH: 7.18,
        pCO2: 8.2,
        // 62.0 mmHg
        pO2: 11.76,
        // 87.0 mmHg
        hco3: 22.4,
        be: -1.5,
        sao2: 99.8,
        fio2: 28,
        na: 137,
        k: 4.4,
        cl: 103,
        lactate: 1,
        glucose: 3.9,
        patientAge: 78
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Ch\u1EA9n \u0111o\xE1n nguy\xEAn nh\xE2n?",
        "3. X\u1EED tr\xED c\u1EA5p c\u1EE9u c\u1EE5 th\u1EC3 ngay l\u1EADp t\u1EE9c l\xE0 g\xEC?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 c\u1EA5p t\xEDnh (Suy th\xF4ng kh\xED ph\u1EBF nang c\u1EA5p t\xEDnh do \u1EE9c ch\u1EBF trung t\xE2m h\xF4 h\u1EA5p). PaO2 b\xECnh th\u01B0\u1EDDng gi\u1EA3 t\u1EA1o do \u0111ang th\u1EDF oxy 28%.",
        acidBase: "Toan h\xF4 h\u1EA5p c\u1EA5p t\xEDnh ch\u01B0a b\xF9 tr\u1EEB m\u1EE9c \u0111\u1ED9 n\u1EB7ng (pH 7.18 t\u1EE5t s\xE2u, PaCO2 t\u0103ng cao 62 mmHg, HCO3- b\xECnh th\u01B0\u1EDDng 22.4 mmol/L).",
        differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c qu\xE1 li\u1EC1u Opiate / Morphin h\u1EADu ph\u1EABu (Opioid Toxicity).",
        clinicalAction: "1. Khai th\xF4ng \u0111\u01B0\u1EDDng th\u1EDF, b\xF3p b\xF3ng Ambu qua m\u1EB7t n\u1EA1 ngay l\u1EADp t\u1EE9c. 2. Ti\xEAm t\u0129nh m\u1EA1ch ch\u1EA5t \u0111\u1ED1i kh\xE1ng \u0111\u1EB7c hi\u1EC7u NALOXONE 0.4mg - 0.8mg, l\u1EB7p l\u1EA1i sau m\u1ED7i 2-3 ph\xFAt \u0111\u1EBFn khi nh\u1ECBp th\u1EDF ph\u1EE5c h\u1ED3i. 3. L\u01B0u \xFD: Naloxone c\xF3 th\u1EDDi gian b\xE1n h\u1EE7y ng\u1EAFn h\u01A1n morphin (ch\u1EC9 30-60 ph\xFAt), b\u1EC7nh nh\xE2n c\xF3 th\u1EC3 t\xE1i ng\u1ED9 \u0111\u1ED9c v\xE0 \u1EE9c ch\u1EBF h\xF4 h\u1EA5p tr\u1EDF l\u1EA1i, ph\u1EA3i theo d\xF5i s\xE1t li\xEAn t\u1EE5c trong \u0111\u01A1n v\u1ECB h\u1ED3i t\u1EC9nh/ICU.",
        physiologicalInsight: "D\xF9 SpO2 m\xE1y k\u1EB9p hi\u1EC3n th\u1ECB 99% nh\u1EDD oxy 28%, b\u1EC7nh nh\xE2n \u0111ang \u1EDF b\u1EDD v\u1EF1c t\u1EED vong v\xEC PaCO2 v\u1ECDt l\xEAn g\xE2y toan m\xE1u n\u1EB7ng (pH 7.18). \u0110\xE2y l\xE0 minh ch\u1EE9ng r\xF5 r\u1EC7t cho vi\u1EC7c m\xE1y \u0111o SpO2 ho\xE0n to\xE0n v\xF4 d\u1EE5ng trong \u0111\xE1nh gi\xE1 th\xF4ng kh\xED ph\u1EBF nang!"
      }
    },
    {
      id: 5,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 05 (Hennessey)",
      title: "\u0110\u1EE3t c\u1EA5p COPD: Khi n\xE0o \u0110\u01AF\u1EE2C PH\xC9P cho th\u1EDF oxy?",
      patientProfile: "Nam 75 tu\u1ED5i, ti\u1EC1n s\u1EED COPD n\u1EB7ng nhi\u1EC1u n\u0103m, kh\xF3 th\u1EDF t\u0103ng d\u1EA7n 3 ng\xE0y, th\u1EDF ch\xFAm m\xF4i",
      categoryTag: "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD)",
      difficulty: "C\u01A1 b\u1EA3n",
      history: "C\u1EE5 \xF4ng 75 tu\u1ED5i c\xF3 ti\u1EC1n s\u1EED COPD nhi\u1EC1u n\u0103m. 3 ng\xE0y nay kh\xF3 th\u1EDF nhi\u1EC1u h\u01A1n, kh\u1EA1c \u0111\u1EDDm \u0111\u1EB7c nhi\u1EC1u. Gia \u0111\xECnh \u0111\u01B0a v\xE0o c\u1EA5p c\u1EE9u trong t\xECnh tr\u1EA1ng n\xF3i t\u1EEBng t\u1EEB, v\xE3 m\u1ED3 h\xF4i.",
      examination: {
        vitals: {
          pulse: "120 l\u1EA7n/ph\xFAt",
          rr: "26 l\u1EA7n/ph\xFAt",
          bp: "150/80 mmHg",
          temp: "36.0\xB0C",
          spo2: "81% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "B\u1EC7nh nh\xE2n v\u1EADt v\xE3, co k\xE9o c\u01A1 li\xEAn s\u01B0\u1EDDn, th\u1EDF ch\xFAm m\xF4i. L\u1ED3ng ng\u1EF1c h\xECnh th\xF9ng, r\xEC r\xE0o ph\u1EBF nang gi\u1EA3m to\xE0n di\u1EC7n."
      },
      abg: {
        unit: "kPa",
        pH: 7.4,
        pCO2: 4.9,
        // 36.0 mmHg
        pO2: 5.8,
        // 44.0 mmHg
        hco3: 23,
        be: -1.2,
        sao2: 80,
        fio2: 21,
        na: 137,
        k: 4.1,
        cl: 99,
        lactate: 1,
        glucose: 3.8,
        patientAge: 75
      },
      questions: [
        "1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED v\xE0 toan ki\u1EC1m?",
        "2. C\xF3 n\xEAn cho b\u1EC7nh nh\xE2n n\xE0y th\u1EDF oxy kh\xF4ng, hay ph\u1EA3i ki\xEAng v\xEC s\u1EE3 m\u1EA5t Hypoxic Drive?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 trung b\xECnh-n\u1EB7ng (PaO2 44 mmHg / 5.8 kPa, SaO2 80%). PaCO2 ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (36 mmHg).",
        acidBase: "Th\u0103ng b\u1EB1ng toan ki\u1EC1m b\xECnh th\u01B0\u1EDDng (pH 7.40, HCO3- 23 mmol/L).",
        differentialDiagnosis: "\u0110\u1EE3t c\u1EA5p b\u1EC7nh ph\u1ED5i t\u1EAFc ngh\u1EBDn m\u1EA1n t\xEDnh (AECOPD) - Th\u1EC3 suy h\xF4 h\u1EA5p gi\u1EA3m oxy m\xE1u \u0111\u01A1n thu\u1EA7n (Type 1).",
        clinicalAction: "CHO TH\u1EDE OXY NGAY L\u1EACP T\u1EE8C! M\u1EE5c ti\xEAu SpO2 ban \u0111\u1EA7u 88 - 92% ho\u1EB7c 94% n\u1EBFu theo d\xF5i s\xE1t. D\xF9ng kh\xED dung Salbutamol + Ipratropium, Corticoid to\xE0n th\xE2n.",
        physiologicalInsight: 'B\xE0i h\u1ECDc \u0111\u1EAFt gi\xE1 trong y khoa: R\u1EA5t nhi\u1EC1u b\xE1c s\u0129 v\xE0 \u0111i\u1EC1u d\u01B0\u1EE1ng s\u1EE3 th\u1EDF oxy cho b\u1EC7nh nh\xE2n COPD v\xEC \xE1m \u1EA3nh kh\xE1i ni\u1EC7m "m\u1EA5t Hypoxic Drive". Tuy nhi\xEAn, b\u1EC7nh nh\xE2n n\xE0y c\xF3 PaCO2 b\xECnh th\u01B0\u1EDDng v\xE0 HCO3 b\xECnh th\u01B0\u1EDDng, ngh\u0129a l\xE0 KH\xD4NG H\u1EC0 C\xD3 \u1EE8 CO2 M\u1EA0N T\xCDNH v\xE0 kh\xF4ng h\u1EC1 s\u1ED1ng ph\u1EE5 thu\u1ED9c hypoxic drive! PaO2 44 mmHg r\u01A1i v\xE0o \u0111o\u1EA1n d\u1ED1c \u0111\u1EE9ng c\u1EE7a \u0111\u01B0\u1EDDng cong ph\xE2n ly Hemoglobin; n\u1EBFu nh\u1ECBn th\u1EDF oxy, b\u1EC7nh nh\xE2n s\u1EBD t\u1EED vong v\xEC thi\u1EBFu oxy n\xE3o v\xE0 c\u01A1 tim tr\u01B0\u1EDBc khi k\u1ECBp b\u1ECB \u1EE9 CO2!'
      }
    },
    {
      id: 6,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 06 (Hennessey)",
      title: "Ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p trong \u0111\u1EE3t c\u1EA5p COPD: Th\u1EDF oxy kh\xF4ng \u0111\u1EE7!",
      patientProfile: "B\u1EC7nh nh\xE2n \u1EDF Ca 05 sau 6 gi\u1EDD \u0111i\u1EC1u tr\u1ECB, th\u1EDF ch\u1EADm l\u1EA1i c\xF2n 16 l/p nh\u01B0ng l\xFA l\u1EABn, ki\u1EC7t s\u1EE9c",
      categoryTag: "Suy h\xF4 h\u1EA5p Type 2",
      difficulty: "N\xE2ng cao",
      history: "B\u1EC7nh nh\xE2n Ca 05 \u0111\u01B0\u1EE3c kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n, u\u1ED1ng prednisolone, kh\xE1ng sinh v\xE0 cho th\u1EDF oxy 28% qua mask Venturi. Sau 6 gi\u1EDD, SpO2 ch\u1EC9 l\xEAn \u0111\u01B0\u1EE3c 83%, b\u1EC7nh nh\xE2n ng\xE0y c\xE0ng m\u1EC7t m\u1ECFi v\xE0 l\xFA l\u1EABn.",
      examination: {
        vitals: {
          pulse: "120 l\u1EA7n/ph\xFAt",
          rr: "16 l\u1EA7n/ph\xFAt",
          bp: "120/80 mmHg",
          temp: "36.0\xB0C",
          spo2: "83% (\u0111ang th\u1EDF 28% O2)",
          fio2: "28%"
        },
        findings: "B\u1EC7nh nh\xE2n ki\u1EC7t s\u1EE9c, tri gi\xE1c l\u01A1 m\u01A1 l\u1EABn l\u1ED9n. Nh\u1ECBp th\u1EDF gi\u1EA3m t\u1EEB 26 xu\u1ED1ng 16 l\u1EA7n/ph\xFAt (d\u1EA5u hi\u1EC7u ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p nguy hi\u1EC3m)."
      },
      abg: {
        unit: "kPa",
        pH: 7.29,
        pCO2: 6.9,
        // 52.0 mmHg
        pO2: 6.4,
        // 48.0 mmHg
        hco3: 24,
        be: -0.9,
        sao2: 84,
        fio2: 28,
        na: 137,
        k: 4,
        cl: 99,
        lactate: 1,
        glucose: 4.2,
        patientAge: 75
      },
      questions: [
        "1. M\xF4 t\u1EA3 s\u1EF1 thay \u0111\u1ED5i so v\u1EDBi kh\xED m\xE1u ban \u0111\u1EA7u?",
        "2. C\xF3 n\xEAn c\u1EAFt oxy c\u1EE7a b\u1EC7nh nh\xE2n kh\xF4ng?",
        "3. Bi\u1EC7n ph\xE1p x\u1EED tr\xED can thi\u1EC7p n\xE0o l\xE0 t\u1ED1i \u01B0u l\xFAc n\xE0y?"
      ],
      answers: {
        gasExchange: "Chuy\u1EC3n bi\u1EBFn t\u1EEB Suy h\xF4 h\u1EA5p Type 1 sang Suy h\xF4 h\u1EA5p Type 2 c\u1EA5p t\xEDnh (PaCO2 t\u0103ng t\u1EEB 36 l\xEAn 52 mmHg). Thi\u1EBFu oxy m\xE1u v\u1EABn nghi\xEAm tr\u1ECDng (PaO2 48 mmHg tr\xEAn FiO2 28%).",
        acidBase: "Toan h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (pH 7.29 toan m\xE1u, PaCO2 t\u0103ng cao, HCO3- 24 ch\u01B0a k\u1ECBp b\xF9).",
        differentialDiagnosis: "Ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p (Respiratory Muscle Fatigue / Exhaustion) trong \u0111\u1EE3t c\u1EA5p COPD kh\xE1ng tr\u1ECB thu\u1ED1c gi\xE3n ph\u1EBF qu\u1EA3n.",
        clinicalAction: "KH\xD4NG \u0110\u01AF\u1EE2C C\u1EAET OXY! B\u1EC7nh nh\xE2n \u0111ang thi\u1EBFu oxy m\xE1u n\u1EB7ng (PaO2 48 mmHg). Nguy\xEAn nh\xE2n PaCO2 t\u0103ng kh\xF4ng ph\u1EA3i do m\u1EA5t hypoxic drive m\xE0 l\xE0 do c\xE1c c\u01A1 h\xF4 h\u1EA5p b\u1ECB ki\u1EC7t s\u1EE9c kh\xF4ng c\xF2n s\u1EE9c t\u1ED1ng kh\xED. B\u1EAET BU\u1ED8C KH\u1EDEI \u0110\u1ED8NG TH\xD4NG KH\xCD KH\xD4NG X\xC2M NH\u1EACP (NIV / BiPAP) ngay l\u1EADp t\u1EE9c. N\u1EBFu th\u1EA5t b\u1EA1i v\u1EDBi BiPAP ho\u1EB7c \xFD th\u1EE9c suy gi\u1EA3m th\xEAm -> \u0110\u1EB7t N\u1ED9i kh\xED qu\u1EA3n th\u1EDF m\xE1y.",
        physiologicalInsight: 'Khi m\u1ED9t b\u1EC7nh nh\xE2n suy h\xF4 h\u1EA5p \u0111ang th\u1EDF 26-30 l/p \u0111\u1ED9t ng\u1ED9t "th\u1EDF ch\u1EADm l\u1EA1i" 14-16 l/p m\xE0 SpO2 kh\xF4ng l\xEAn, k\xE8m l\u01A1 m\u01A1, \u0111\xF3 KH\xD4NG PH\u1EA2I l\xE0 b\u1EC7nh nh\xE2n \u0111\u1EE1 kh\xF3 th\u1EDF, m\xE0 l\xE0 c\u01A1 ho\xE0nh v\xE0 c\u01A1 li\xEAn s\u01B0\u1EDDn \u0111\xE3 ho\xE0n to\xE0n ki\u1EC7t s\u1EE9c (Exhaustion). PaCO2 s\u1EBD \u1EE9 \u0111\u1ECDng th\u1EA7n t\u1ED1c g\xE2y toan m\xE1u t\u1EED vong n\u1EBFu kh\xF4ng c\xF3 m\xE1y th\u1EDF g\xE1nh v\xE1c c\xF4ng th\u1EDF!'
      }
    },
    {
      id: 9,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 09 (Hennessey)",
      title: "COPD \u0111\u1EE3t c\u1EA5p \u1EDF ng\u01B0\u1EDDi c\xF3 \u1EE9 CO2 m\u1EA1n: Nguy c\u01A1 Hypoxic Drive",
      patientProfile: "Nam 68 tu\u1ED5i, COPD n\u1EB7ng l\xE2u n\u0103m, kh\xF3 th\u1EDF khi g\u1EAFng s\u1EE9c nh\u1EB9, m\xF4i ch\xFAm",
      categoryTag: "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD)",
      difficulty: "Trung b\xECnh",
      history: "B\u1EC7nh nh\xE2n 68 tu\u1ED5i, ti\u1EC1n s\u1EED COPD n\u1EB7ng, \u0111i b\u1ED9 500m l\xE0 m\u1EC7t, nay kh\xF3 th\u1EDF ngay c\u1EA3 khi m\u1EB7c qu\u1EA7n \xE1o. V\xE0o vi\u1EC7n v\xEC kh\xF3 th\u1EDF t\u0103ng trong 24 gi\u1EDD qua.",
      examination: {
        vitals: {
          pulse: "96 l\u1EA7n/ph\xFAt",
          rr: "24 l\u1EA7n/ph\xFAt",
          bp: "138/82 mmHg",
          temp: "36.5\xB0C",
          spo2: "78% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "T\u1EC9nh t\xE1o, ti\u1EBFp x\xFAc t\u1ED1t, th\u1EDF ch\xFAm m\xF4i, co k\xE9o c\u01A1 h\xF4 h\u1EA5p ph\u1EE5 nh\u1EB9. Nghe ph\u1ED5i r\xEC r\xE0o ph\u1EBF nang gi\u1EA3m, r\u1EA3i r\xE1c ran ng\xE1y."
      },
      abg: {
        unit: "kPa",
        pH: 7.36,
        pCO2: 7.2,
        // 54.1 mmHg
        pO2: 5.3,
        // 40.0 mmHg
        hco3: 30.6,
        be: 4.9,
        sao2: 75.2,
        fio2: 21,
        na: 144,
        k: 3.7,
        cl: 102,
        lactate: 1.2,
        glucose: 4.9,
        patientAge: 68
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Ch\u1EC9 s\u1ED1 n\xE0o \u0111\xE3 thay \u0111\u1ED5i c\u1EA5p t\xEDnh trong 24h qua?",
        "3. Hai ch\u1EC9 s\u1ED1 n\xE0o c\u1EA3nh b\xE1o c\u1EA7n h\u1EBFt s\u1EE9c th\u1EADn tr\u1ECDng khi cho th\u1EDF oxy?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EA1n t\xEDnh (PaCO2 54.1 mmHg t\u0103ng m\u1EA1n) c\xF3 k\xE8m gi\u1EA3m oxy m\xE1u m\u1EE9c \u0111\u1ED9 n\u1EB7ng (PaO2 40 mmHg / 5.3 kPa).",
        acidBase: "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.36 n\u1EB1m trong kho\u1EA3ng b\xECnh th\u01B0\u1EDDng 7.35-7.40, HCO3- t\u0103ng cao 30.6 mmol/L).",
        differentialDiagnosis: "\u0110\u1EE3t c\u1EA5p COPD tr\xEAn n\u1EC1n suy h\xF4 h\u1EA5p m\u1EA1n t\xEDnh t\u0103ng th\xE1n kh\xED.",
        clinicalAction: "Ch\u1EC9 s\u1ED1 thay \u0111\u1ED5i c\u1EA5p t\xEDnh trong 24h l\xE0 PaO2 t\u1EE5t xu\u1ED1ng 40 mmHg (nguy\xEAn nh\xE2n g\xE2y kh\xF3 th\u1EDF d\u1EEF d\u1ED9i). Hai ch\u1EC9 s\u1ED1 c\u1EA3nh b\xE1o th\u1EADn tr\u1ECDng th\u1EDF oxy l\xE0 PaCO2 (7.2 kPa) v\xE0 HCO3- (30.6 mmol/L) ch\u1EE9ng minh b\u1EC7nh nh\xE2n c\xF3 \u1EE9 CO2 m\u1EA1n t\xEDnh v\xE0 C\xD3 NGUY C\u01A0 CAO M\u1EA4T HYPOXIC DRIVE n\u1EBFu th\u1EDF oxy n\u1ED3ng \u0111\u1ED9 cao! D\xF9ng mask Venturi 24% ho\u1EB7c 28%, m\u1EE5c ti\xEAu SpO2 nghi\xEAm ng\u1EB7t 88 - 92%.",
        physiologicalInsight: "Th\u1EADn c\u1EA7n 3-5 ng\xE0y \u0111\u1EC3 t\xEDch l\u0169y HCO3- l\xEAn 30.6 mmol/L nh\u1EB1m k\xE9o pH v\u1EC1 7.36. V\xEC c\u01A1 th\u1EC3 \u0111\xE3 quen s\u1ED1ng chung v\u1EDBi CO2 cao, trung t\xE2m h\xF4 h\u1EA5p \u1EDF h\xE0nh n\xE3o kh\xF4ng c\xF2n nh\u1EA1y c\u1EA3m v\u1EDBi CO2 n\u1EEFa m\xE0 duy tr\xEC nh\u1ECBp th\u1EDF d\u1EF1a v\xE0o th\u1EE5 th\u1EC3 c\u1EA3nh b\xE1o thi\u1EBFu oxy t\u1EA1i xoang c\u1EA3nh (Hypoxic Drive)."
      }
    },
    {
      id: 10,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 10 (Hennessey)",
      title: "H\u1EADu qu\u1EA3 cho th\u1EDF Oxy 60% b\u1EEBa b\xE3i \u1EDF COPD: M\u1EA5t Hypoxic Drive",
      patientProfile: "B\u1EC7nh nh\xE2n \u1EDF Ca 09 sau khi b\u1ECB cho th\u1EDF mask Oxy 60%, 1 gi\u1EDD sau li b\xEC l\u01A1 m\u01A1",
      categoryTag: "B\u1EC7nh ph\u1ED5i m\u1EA1n t\xEDnh (COPD)",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "B\u1EC7nh nh\xE2n Ca 09 \u0111\u01B0\u1EE3c chuy\u1EC3n l\xEAn khoa, \u0111i\u1EC1u d\u01B0\u1EE1ng th\u1EA5y SpO2 th\u1EA5p n\xEAn cho th\u1EDF mask oxy 60%. Sau 1 gi\u1EDD, SpO2 t\u0103ng l\xEAn 96% nh\u01B0ng b\u1EC7nh nh\xE2n tr\u1EDF n\xEAn l\u01A1 m\u01A1, lay g\u1ECDi kh\xF3 th\u1EE9c, kh\xF4ng th\u1EC3 ti\u1EBFp x\xFAc \u0111\u01B0\u1EE3c.",
      examination: {
        vitals: {
          pulse: "88 l\u1EA7n/ph\xFAt",
          rr: "14 l\u1EA7n/ph\xFAt (th\u1EDF r\u1EA5t y\u1EBFu)",
          bp: "132/80 mmHg",
          temp: "36.5\xB0C",
          spo2: "96% (\u0111ang th\u1EDF 60% O2)",
          fio2: "60%"
        },
        findings: "H\xF4n m\xEA n\xF4ng, tay c\xF3 d\u1EA5u hi\u1EC7u run v\u1ED7 (Asterixis / Flapping tremor), m\u1EA1ch n\u1EA3y m\u1EA1nh, da \u1EA5m v\xE3 m\u1ED3 h\xF4i."
      },
      abg: {
        unit: "kPa",
        pH: 7.29,
        pCO2: 8.7,
        // 65.3 mmHg
        pO2: 11.2,
        // 84.0 mmHg
        hco3: 30.3,
        be: 4.7,
        sao2: 96.2,
        fio2: 60,
        na: 144,
        k: 3.6,
        cl: 102,
        lactate: 1.2,
        glucose: 5,
        patientAge: 68
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan hi\u1EC7n t\u1EA1i?",
        "2. Nguy\xEAn nh\xE2n n\xE0o g\xE2y ra s\u1EF1 suy s\u1EE5p tri gi\xE1c \u0111\u1ED9t ng\u1ED9t c\u1EE7a b\u1EC7nh nh\xE2n?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 \u0111\u1EE3t c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh (Acute-on-chronic Type 2 respiratory impairment).",
        acidBase: "Toan h\xF4 h\u1EA5p m\u1EA5t b\xF9 (b\xE1n ph\u1EA7n): pH t\u1EE5t t\u1EEB 7.36 xu\u1ED1ng 7.29, PaCO2 v\u1ECDt t\u1EEB 54 l\xEAn 65.3 mmHg (8.7 kPa).",
        differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c oxy g\xE2y \u1EE9c ch\u1EBF th\xF4ng kh\xED do x\xF3a b\u1ECF Hypoxic Drive (CO2 Narcosis / Hypercapnic Encephalopathy).",
        clinicalAction: "1. Gi\u1EA3m ngay n\u1ED3ng \u0111\u1ED9 oxy xu\u1ED1ng Venturi 28% (m\u1EE5c ti\xEAu SpO2 88-92%). 2. KH\xD4NG \u0110\u01AF\u1EE2C ng\u1EAFt oxy ho\xE0n to\xE0n v\xEC b\u1EC7nh nh\xE2n s\u1EBD t\u1EE5t PaO2 ch\u1EBFt n\xE3o. 3. \u0110\u1EB7t ngay m\xE1y th\u1EDF kh\xF4ng x\xE2m nh\u1EADp BiPAP \u0111\u1EC3 c\u01B0\u1EE1ng b\u1EE9c \u0111\xE0o th\u1EA3i CO2. 4. C\xE2n nh\u1EAFc d\xF9ng thu\u1ED1c k\xEDch th\xEDch h\xF4 h\u1EA5p (Doxapram) n\u1EBFu ch\u01B0a c\xF3 m\xE1y th\u1EDF. S\u1EB5n s\xE0ng \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n n\u1EBFu toan m\xE1u ti\u1EBFp t\u1EE5c x\u1EA5u \u0111i.",
        physiologicalInsight: "Th\u1EDF oxy 60% l\xE0m PaO2 v\u1ECDt l\xEAn 84 mmHg, l\xE0m t\u1EAFt ho\xE0n to\xE0n k\xEDch th\xEDch th\u1EDF \u1EDF th\u1EE5 th\u1EC3 ngo\u1EA1i bi\xEAn. B\u1EC7nh nh\xE2n th\u1EDF ch\u1EADm l\u1EA1i, CO2 kh\xF4ng tho\xE1t \u0111\u01B0\u1EE3c t\xEDch t\u1EE5 d\u1EEF d\u1ED9i t\u1EA1o th\xE0nh H2CO3 l\xE0m toan m\xE1u v\xE0 ng\u1ED9 \u0111\u1ED9c n\xE3o CO2."
      }
    },
    {
      id: 11,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 11 (Hennessey)",
      title: "C\u01A1n hen \xE1c t\xEDnh \u0111e d\u1ECDa t\xEDnh m\u1EA1ng: B\u1EABy PaCO2 b\xECnh th\u01B0\u1EDDng",
      patientProfile: "N\u1EEF 21 tu\u1ED5i, hen ph\u1EBF qu\u1EA3n n\u1EB7ng, n\xF3i t\u1EEBng t\u1EEB, co k\xE9o to\xE0n b\u1ED9 c\u01A1 c\u1ED5 v\xE0 ng\u1EF1c",
      categoryTag: "C\u1EA5p c\u1EE9u \u0111\u01B0\u1EDDng th\u1EDF",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "N\u1EEF 21 tu\u1ED5i, ti\u1EC1n s\u1EED hen n\u1EB7ng t\u1EEBng 2 l\u1EA7n v\xE0o ICU. 6 gi\u1EDD nay l\xEAn c\u01A1n kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, x\u1ECBt Salbutamol kh\xF4ng \u0111\u1EE1. V\xE0o vi\u1EC7n th\u1EDF 30 l/p, ch\u1EC9 n\xF3i \u0111\u01B0\u1EE3c t\u1EEBng t\u1EEB c\u1EE5t ng\u1EE7n.",
      examination: {
        vitals: {
          pulse: "115 l\u1EA7n/ph\xFAt",
          rr: "30 l\u1EA7n/ph\xFAt",
          bp: "120/80 mmHg",
          temp: "37.0\xB0C",
          spo2: "96% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "Co k\xE9o c\u01A1 \u1EE9c \u0111\xF2n ch\u0169m v\xE0 c\u01A1 li\xEAn s\u01B0\u1EDDn d\u1EEF d\u1ED9i. Nghe ph\u1ED5i ran r\xEDt ran ng\xE1y lan t\u1ECFa kh\u1EAFp 2 ph\u1EBF tr\u01B0\u1EDDng. PEF \u0111o \u0111\u01B0\u1EE3c 160 L/ph\xFAt (d\u1EF1 \u0111o\xE1n 400 L/ph\xFAt)."
      },
      abg: {
        unit: "kPa",
        pH: 7.38,
        pCO2: 5.8,
        // 43.5 mmHg
        pO2: 10.2,
        // 76.5 mmHg
        hco3: 24,
        be: -1.3,
        sao2: 96,
        fio2: 21,
        na: 140,
        k: 4,
        cl: 99,
        lactate: 1,
        glucose: 5,
        patientAge: 21
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Ch\u1EC9 s\u1ED1 n\xE0o tr\xEAn kh\xED m\xE1u l\xE0 \u0111\xE1ng lo ng\u1EA1i nh\u1EA5t v\xE0 t\u1EA1i sao?",
        "3. Ph\xE2n lo\u1EA1i m\u1EE9c \u0111\u1ED9 n\u1EB7ng c\u1EE7a c\u01A1n hen n\xE0y?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 1 m\u1EE9c \u0111\u1ED9 nh\u1EB9. PaO2 76.5 mmHg (\u1EDF ng\u01B0\u1EDDi 21 tu\u1ED5i b\xECnh th\u01B0\u1EDDng ph\u1EA3i > 95 mmHg).",
        acidBase: "pH v\xE0 HCO3- b\xECnh th\u01B0\u1EDDng.",
        differentialDiagnosis: "C\u01A1n hen ph\u1EBF qu\u1EA3n n\u1EB7ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng (Life-threatening Asthma Attack).",
        clinicalAction: "CH\u1EC8 S\u1ED0 \u0110\xC1NG S\u1EE2 NH\u1EA4T L\xC0 PaCO2 = 43.5 mmHg (5.8 kPa)! \u1EDE m\u1ED9t ng\u01B0\u1EDDi tr\u1EBB \u0111ang th\u1EDF 30 l\u1EA7n/ph\xFAt v\u1EDBi c\xF4ng th\u1EDF c\u1EF1c l\u1EDBn, PaCO2 \u0110\xC1NG L\u1EBC PH\u1EA2I R\u1EA4T TH\u1EA4P (< 30 mmHg do t\u0103ng th\xF4ng kh\xED). PaCO2 \u1EDF m\u1EE9c b\xECnh th\u01B0\u1EDDng cao ch\u1EE9ng t\u1ECF t\u1EAFc ngh\u1EBDn \u0111\u01B0\u1EDDng th\u1EDF c\u1EF1c k\u1EF3 tr\u1EA7m tr\u1ECDng v\xE0 b\u1EC7nh nh\xE2n B\u1EAET \u0110\u1EA6U KI\u1EC6T C\u01A0! B\xE1o \u0111\u1ED9ng ICU ngay l\u1EADp t\u1EE9c, kh\xED dung li\xEAn t\u1EE5c Salbutamol + Ipratropium, ti\xEAm Hydrocortisone IV, Magnesium sulfate 2g IV truy\u1EC1n 20 ph\xFAt, chu\u1EA9n b\u1ECB s\u1EB5n s\xE0ng \u0111\u1EB7t \u1ED1ng n\u1ED9i kh\xED qu\u1EA3n.",
        physiologicalInsight: 'Trong c\u01A1n hen, "PaCO2 b\xECnh th\u01B0\u1EDDng" l\xE0 m\u1ED9t d\u1EA5u hi\u1EC7u b\xE1o t\u1EED! N\xF3 cho th\u1EA5y b\u1EC7nh nh\xE2n kh\xF4ng c\xF2n \u0111\u1EE7 s\u1EE9c duy tr\xEC th\u1EC3 t\xEDch ph\xFAt \u0111\u1EC3 th\u1EA3i CO2, v\xE0i ph\xFAt sau PaCO2 s\u1EBD v\u1ECDt l\xEAn v\xE0 b\u1EC7nh nh\xE2n s\u1EBD ng\u1EEBng th\u1EDF do ki\u1EC7t c\u01A1 ho\xE0nh.'
      }
    },
    {
      id: 12,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 12 (Hennessey)",
      title: "H\u1ED9i ch\u1EE9ng t\u0103ng th\xF4ng kh\xED do lo \xE2u (Psychogenic Hyperventilation)",
      patientProfile: "N\u1EEF 23 tu\u1ED5i, t\xE9 ng\xE3 \u0111au c\u1ED5 ch\xE2n, ho\u1EA3ng s\u1EE3 kh\xF3c l\xF3c, t\xEA quanh mi\u1EC7ng v\xE0 co qu\u1EAFp b\xE0n tay",
      categoryTag: "T\u0103ng th\xF4ng kh\xED / Th\u1EA7n kinh",
      difficulty: "C\u01A1 b\u1EA3n",
      history: "N\u1EEF 23 tu\u1ED5i b\u1ECB tr\u1EB9o ch\xE2n nh\u1EB9, ch\u1EE5p X-quang b\xECnh th\u01B0\u1EDDng nh\u01B0ng b\u1EC7nh nh\xE2n kh\xF4ng tin, k\xEDch \u0111\u1ED9ng kh\xF3c l\xF3c. \u0110\u1ED9t ng\u1ED9t th\u1EA5y ngh\u1EB9n th\u1EDF, t\u1EE9c ng\u1EF1c, t\xEA b\xEC quanh mi\u1EC7ng v\xE0 ng\xF3n tay co c\u1EE9ng nh\u01B0 b\xE0n tay ng\u01B0\u1EDDi \u0111\u1EE1 \u0111\u1EBB (d\u1EA5u Trousseau).",
      examination: {
        vitals: {
          pulse: "96 l\u1EA7n/ph\xFAt",
          rr: "36 l\u1EA7n/ph\xFAt",
          bp: "130/80 mmHg",
          temp: "36.8\xB0C",
          spo2: "100% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "Th\u1EDF r\u1EA5t nhanh n\xF4ng 36 l\u1EA7n/ph\xFAt. Tim ph\u1ED5i nghe trong, ECG nh\u1ECBp xoang b\xECnh th\u01B0\u1EDDng, PEF b\xECnh th\u01B0\u1EDDng."
      },
      abg: {
        unit: "kPa",
        pH: 7.53,
        pCO2: 3.14,
        // 24.0 mmHg
        pO2: 14.3,
        // 108.0 mmHg
        hco3: 24,
        be: -1.8,
        sao2: 99,
        fio2: 21,
        na: 140,
        k: 3.5,
        cl: 99,
        lactate: 1,
        glucose: 5,
        patientAge: 23
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. B\u1EA5t th\u01B0\u1EDDng x\xE9t nghi\u1EC7m n\xE0o gi\u1EA3i th\xEDch tri\u1EC7u ch\u1EE9ng t\xEA m\xF4i v\xE0 co qu\u1EAFp ng\xF3n tay?",
        "3. Ch\u1EA9n \u0111o\xE1n v\xE0 c\xE1ch x\u1EED tr\xED?"
      ],
      answers: {
        gasExchange: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang nguy\xEAn ph\xE1t (Primary Hyperventilation). PaO2 t\u0103ng cao (108 mmHg), PaCO2 t\u1EE5t s\xE2u (24 mmHg).",
        acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (Uncompensated Respiratory Alkalosis, pH 7.53).",
        differentialDiagnosis: "H\u1ED9i ch\u1EE9ng t\u0103ng th\xF4ng kh\xED do c\u0103n nguy\xEAn t\xE2m l\xFD (Psychogenic Hyperventilation Syndrome / Panic attack).",
        clinicalAction: "Tri\u1EC7u ch\u1EE9ng t\xEA b\xEC co qu\u1EAFp ng\u1ECDn chi l\xE0 do H\u1EA0 CALCI ION H\xD3A M\xC1U (iCa2+ t\u1EE5t xu\u1ED1ng 0.9 mmol/L). Khi m\xE1u b\u1ECB ki\u1EC1m, ion H+ r\u1EDDi kh\u1ECFi albumin t\u1EA1o th\xEAm v\u1ECB tr\xED g\u1EAFn cho Ca2+, l\xE0m gi\u1EA3m n\u1ED3ng \u0111\u1ED9 calci ion t\u1EF1 do trong m\xE1u. X\u1EED tr\xED: Tr\u1EA5n an t\xE2m l\xFD, h\u01B0\u1EDBng d\u1EABn h\xEDt th\u1EDF ch\u1EADm l\u1EA1i, cho th\u1EDF l\u1EA1i v\xE0o t\xFAi gi\u1EA5y \u0111\u1EC3 h\xEDt l\u1EA1i CO2 t\u1EF1 th\xE2n (ch\u1EC9 l\xE0m khi \u0111\xE3 ch\u1EAFc ch\u1EAFn lo\u1EA1i tr\u1EEB b\u1EC7nh l\xFD tim ph\u1ED5i nguy hi\u1EC3m). Kh\xF4ng c\u1EA7n ti\xEAm calci.",
        physiologicalInsight: "Hi\u1EC7n t\u01B0\u1EE3ng r\u1EEDa tr\xF4i CO2 l\xE0m ki\u1EC1m m\xE1u c\u1EA5p t\xEDnh g\xE2y co m\u1EA1ch m\xE1u n\xE3o (d\u1EABn t\u1EDBi hoa m\u1EAFt, ch\xF3ng m\u1EB7t) v\xE0 h\u1EA1 Calci ion h\xF3a g\xE2y k\xEDch th\xEDch th\u1EA7n kinh c\u01A1 (t\xEA m\xF4i, d\u1EA5u Chvostek v\xE0 Trousseau)."
      }
    },
    {
      id: 13,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 13 (Hennessey)",
      title: "Ng\u1ED9 \u0111\u1ED9c kh\xED CO (Carbon Monoxide): C\u1EA1m b\u1EABy SpO2 99%",
      patientProfile: "Nam 40 tu\u1ED5i, \u0111\u01B0\u1EE3c l\xEDnh c\u1EE9u h\u1ECFa c\u1EE9u kh\u1ECFi \u0111\xE1m ch\xE1y nh\xE0 k\xEDn, h\xEDt kh\xF3i 20 ph\xFAt",
      categoryTag: "Ng\u1ED9 \u0111\u1ED9c / C\u1EA5p c\u1EE9u",
      difficulty: "N\xE2ng cao",
      history: "Nam 40 tu\u1ED5i m\u1EAFc k\u1EB9t trong ph\xF2ng k\xEDn \u0111\u1EA7y kh\xF3i \u0111en 20 ph\xFAt. V\xE0o c\u1EA5p c\u1EE9u ng\u01B0\u1EDDi \u0111\u1EA7y b\u1ED3 h\xF3ng, n\xF4n \xF3i, \u0111au \u0111\u1EA7u d\u1EEF d\u1ED9i, l\xFA l\u1EABn tri gi\xE1c.",
      examination: {
        vitals: {
          pulse: "98 l\u1EA7n/ph\xFAt",
          rr: "18 l\u1EA7n/ph\xFAt",
          bp: "125/80 mmHg",
          temp: "37.0\xB0C",
          spo2: "99% (th\u1EDF oxy mask 15L)",
          fio2: "80%"
        },
        findings: "\xDD th\u1EE9c l\xFA l\u1EABn, ni\xEAm m\u1EA1c c\xF3 th\u1EC3 \u0111\u1ECF nh\u01B0 qu\u1EA3 anh \u0111\xE0o (cherry-red). Kh\xF4ng b\u1ECFng da di\u1EC7n r\u1ED9ng."
      },
      abg: {
        unit: "kPa",
        pH: 7.36,
        pCO2: 4.5,
        // 34.0 mmHg
        pO2: 47,
        // 353.0 mmHg
        hco3: 18,
        be: -5.5,
        sao2: 100,
        fio2: 80,
        na: 145,
        k: 3.6,
        cl: 103,
        lactate: 2,
        glucose: 4,
        patientAge: 40,
        coHb: 40
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. Ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh?",
        "3. Ch\u1EC9 s\u1ED1 n\xE0o tr\xEAn k\u1EBFt qu\u1EA3 kh\xED m\xE1u l\xE0 SAI L\u1EC6CH GI\u1EA2 T\u1EA0O (Falsely High)?"
      ],
      answers: {
        gasExchange: "Ph\u1ED5i trao \u0111\u1ED5i kh\xED b\xECnh th\u01B0\u1EDDng \u0111\u1ED1i v\u1EDBi kh\xED th\u1EDF v\xE0o (PaO2 r\u1EA5t cao 353 mmHg tr\xEAn FiO2 80%), nh\u01B0ng m\xF4 th\u1EF1c t\u1EBF b\u1ECB thi\u1EBFu oxy c\u1EF1c \u0111\u1ED9!",
        acidBase: "Toan chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.36, HCO3- gi\u1EA3m 18 mmol/L, PaCO2 gi\u1EA3m nh\u1EB9 34 mmHg b\xF9 tr\u1EEB) do toan lactic t\u1EBF b\xE0o.",
        differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c c\u1EA5p kh\xED Carbon Monoxide (CO Poisoning) - Carboxyhaemoglobin (COHb) 40%.",
        clinicalAction: "CH\u1EC8 S\u1ED0 SaO2 V\xC0 SpO2 L\xC0 SAI L\u1EC6CH GI\u1EA2 T\u1EA0O! M\xE1y \u0111o SpO2 k\u1EB9p ng\xF3n tay v\xE0 thu\u1EADt to\xE1n t\xEDnh SaO2 tr\xEAn m\xE1y kh\xED m\xE1u th\xF4ng th\u01B0\u1EDDng kh\xF4ng ph\xE2n bi\u1EC7t \u0111\u01B0\u1EE3c Oxyhaemoglobin v\xE0 Carboxyhaemoglobin (ch\xFAng h\u1EA5p th\u1EE5 b\u01B0\u1EDBc s\xF3ng g\u1EA7n t\u01B0\u01A1ng \u0111\u01B0\u01A1ng), n\xEAn b\xE1o 99-100% \u1EA3o. Tr\xEAn th\u1EF1c t\u1EBF, 40% Hb \u0111\xE3 b\u1ECB CO chi\u1EBFm gi\u1EEF, oxy kh\xF4ng th\u1EC3 g\u1EAFn k\u1EBFt v\xE0 gi\u1EA3i ph\xF3ng cho m\xF4. X\u1EED tr\xED: Th\u1EDF Oxy 100% qua mask c\xF3 t\xFAi d\u1EF1 tr\u1EEF kh\xF4ng th\u1EDF l\u1EA1i (gi\u1EA3m th\u1EDDi gian b\xE1n h\u1EE7y COHb t\u1EEB 320 ph\xFAt xu\u1ED1ng 80 ph\xFAt). Chuy\u1EC3n \u0111i\u1EC1u tr\u1ECB OXY CAO \xC1P (HBOT) n\u1EBFu COHb > 25%, ph\u1EE5 n\u1EEF mang thai ho\u1EB7c c\xF3 r\u1ED1i lo\u1EA1n \xFD th\u1EE9c.",
        physiologicalInsight: "CO c\xF3 \xE1i l\u1EF1c v\u1EDBi Hemoglobin g\u1EA5p 200 l\u1EA7n Oxy. PaO2 ch\u1EC9 \u0111o l\u01B0\u1EE3ng oxy h\xF2a tan t\u1EF1 do trong huy\u1EBFt t\u01B0\u01A1ng (ch\u1EC9 chi\u1EBFm 1-2% t\u1ED5ng l\u01B0\u1EE3ng oxy m\xE1u), trong khi 98-99% oxy ph\u1EA3i g\u1EAFn v\u1EDBi Hb. B\u1EC7nh nh\xE2n c\xF3 PaO2 353 mmHg nh\u01B0ng c\xE1c t\u1EBF b\xE0o v\u1EABn ch\u1EBFt ng\u1EA1t v\xEC thi\u1EBFu oxy!"
      }
    },
    {
      id: 14,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 14 (Hennessey)",
      title: "Ph\xF9 ph\u1ED5i c\u1EA5p do suy tim tr\xE1i: Toan h\u1ED7n h\u1EE3p nguy k\u1ECBch",
      patientProfile: "Nam 68 tu\u1ED5i, nh\u1ED3i m\xE1u c\u01A1 tim c\u0169 4 tu\u1EA7n, th\u1EE9c gi\u1EA5c n\u1EEDa \u0111\xEAm v\xEC ngh\u1EB9t th\u1EDF d\u1EEF d\u1ED9i",
      categoryTag: "C\u1EA5p c\u1EE9u tim m\u1EA1ch",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "C\u1EE5 \xF4ng 68 tu\u1ED5i, ti\u1EC1n s\u1EED NMCT di\u1EC7n r\u1ED9ng 4 tu\u1EA7n tr\u01B0\u1EDBc. N\u1EEDa \u0111\xEAm th\u1EE9c gi\u1EA5c v\xEC kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, kh\xF4ng n\u1EB1m \u0111\u01B0\u1EE3c, ph\xF9 2 ch\xE2n t\u0103ng d\u1EA7n.",
      examination: {
        vitals: {
          pulse: "128 l\u1EA7n/ph\xFAt",
          rr: "40 l\u1EA7n/ph\xFAt",
          bp: "144/70 mmHg",
          temp: "36.6\xB0C",
          spo2: "91% (th\u1EDF mask t\xFAi 15L)",
          fio2: "80%"
        },
        findings: "V\xE3 m\u1ED3 h\xF4i, t\xEDm t\xE1i, co k\xE9o to\xE0n b\u1ED9 c\u01A1 h\xF4 h\u1EA5p. T\u0129nh m\u1EA1ch c\u1ED5 n\u1ED5i \u0111\u1EBFn g\xF3c h\xE0m, ph\xF9 2 ch\xE2n \u0111\u1EBFn g\u1ED1i. Nghe ph\u1ED5i ran \u1EA9m d\xE2ng l\xEAn nh\u01B0 th\u1EE7y tri\u1EC1u lan \u0111\u1EBFn 2/3 ph\u1EBF tr\u01B0\u1EDDng."
      },
      abg: {
        unit: "kPa",
        pH: 7.21,
        pCO2: 6.12,
        // 46.0 mmHg
        pO2: 9.3,
        // 70.0 mmHg
        hco3: 17.2,
        be: -5.9,
        sao2: 93,
        fio2: 80,
        na: 141,
        k: 3.7,
        cl: 100,
        lactate: 4.9,
        glucose: 8.5,
        patientAge: 68
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Ch\u1EA9n \u0111o\xE1n b\u1EC7nh l\xFD?",
        "3. Nguy\xEAn nh\xE2n g\xE2y ra toan chuy\u1EC3n h\xF3a \u1EDF b\u1EC7nh nh\xE2n n\xE0y?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 k\u1EBFt h\u1EE3p suy gi\u1EA3m oxy m\xE1u c\u1EF1c n\u1EB7ng (PaO2 ch\u1EC9 \u0111\u1EA1t 70 mmHg d\xF9 \u0111ang th\u1EDF oxy mask t\xFAi 15L, t\u01B0\u01A1ng \u0111\u01B0\u01A1ng P/F < 90). PaCO2 b\u1EAFt \u0111\u1EA7u t\u0103ng l\xEAn 46 mmHg.",
        acidBase: "TOAN H\u1ED6N H\u1EE2P NGUY K\u1ECACH (Mixed Respiratory and Metabolic Acidosis). pH 7.21 t\u1EE5t s\xE2u, c\u1EA3 PaCO2 t\u0103ng v\xE0 HCO3- gi\u1EA3m (17.2 mmol/L).",
        differentialDiagnosis: "Ph\xF9 ph\u1ED5i c\u1EA5p huy\u1EBFt \u0111\u1ED9ng (Acute Cardiogenic Pulmonary Oedema) do suy th\u1EA5t tr\xE1i c\u1EA5p m\u1EA5t b\xF9.",
        clinicalAction: "Toan chuy\u1EC3n h\xF3a l\xE0 do TOAN LACTIC N\u1EB6NG (Lactate 4.9 mmol/L) sinh ra t\u1EEB 3 c\u01A1 ch\u1EBF: 1. Thi\u1EBFu oxy m\xF4 to\xE0n th\xE2n; 2. Cung l\u01B0\u1EE3ng tim t\u1EE5t gi\u1EA3m g\xE2y gi\u1EA3m t\u01B0\u1EDBi m\xE1u t\u1EA1ng; 3. C\xE1c c\u01A1 h\xF4 h\u1EA5p ph\u1EA3i l\xE0m vi\u1EC7c c\u1EADt l\u1EF1c t\u1EA1o ra acid lactic. X\u1EED tr\xED: L\u1EE3i ti\u1EC3u Furosemide t\u0129nh m\u1EA1ch, truy\u1EC1n d\xE3n m\u1EA1ch Nitroglycerin/Isoket n\u1EBFu huy\u1EBFt \xE1p cho ph\xE9p, th\u1EDF m\xE1y kh\xF4ng x\xE2m nh\u1EADp CPAP/BiPAP \xE1p l\u1EF1c cao ngay \u0111\u1EC3 t\u1ED1ng d\u1ECBch ra kh\u1ECFi ph\u1EBF nang.",
        physiologicalInsight: "Ph\xF9 ph\u1ED5i c\u1EA5p th\xF4ng th\u01B0\u1EDDng giai \u0111o\u1EA1n \u0111\u1EA7u l\xE0 Suy h\xF4 h\u1EA5p Type 1 k\xE8m ki\u1EC1m h\xF4 h\u1EA5p do th\u1EDF nhanh. Khi PaCO2 t\u0103ng l\xEAn k\xE8m toan lactic, \u0111\xF3 l\xE0 l\xFAc b\u1EC7nh nh\xE2n \u0111\xE3 b\u01B0\u1EDBc v\xE0o giai \u0111o\u1EA1n ki\u1EC7t s\u1EE9c (Exhaustion), c\u1EADn k\u1EC1 ng\u1EEBng th\u1EDF n\u1EBFu kh\xF4ng can thi\u1EC7p m\xE1y th\u1EDF!"
      }
    },
    {
      id: 16,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 16 (Hennessey)",
      title: "Thi\u1EBFu m\xE1u n\u1EB7ng: Th\u1EDF oxy kh\xF4ng gi\u1EA3i quy\u1EBFt \u0111\u01B0\u1EE3c v\u1EA5n \u0111\u1EC1!",
      patientProfile: "N\u1EEF 79 tu\u1ED5i, kh\xF3 th\u1EDF nhi\u1EC1u, m\u1EC7t l\u1EA3, ti\u1EC1n s\u1EED u \u0111\u1EA1i tr\xE0ng ch\u1EA3y m\xE1u r\u1EC9 r\u1EA3 6 th\xE1ng",
      categoryTag: "Huy\u1EBFt h\u1ECDc / Kh\xED m\xE1u",
      difficulty: "Trung b\xECnh",
      history: "C\u1EE5 b\xE0 79 tu\u1ED5i nh\u1EADp vi\u1EC7n ch\u1EDD m\u1ED5 c\u1EAFt u \u0111\u1EA1i tr\xE0ng. B\xE0 than phi\u1EC1n kh\xF3 th\u1EDF d\u1EEF d\u1ED9i, m\u1EC7t m\u1ECFi ki\u1EC7t s\u1EE9c d\xF9 l\u01B0\u1EE3ng m\xE1u m\u1EA5t qua ph\xE2n nh\u1EEFng ng\xE0y g\u1EA7n \u0111\xE2y kh\xF4ng t\u0103ng.",
      examination: {
        vitals: {
          pulse: "100 l\u1EA7n/ph\xFAt",
          rr: "24 l\u1EA7n/ph\xFAt",
          bp: "100/80 mmHg",
          temp: "36.5\xB0C",
          spo2: "100% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "Da ni\xEAm m\u1EA1c nh\u1EE3t nh\u1EA1t nh\u01B0 s\xE1p, l\xF2ng b\xE0n tay tr\u1EAFng b\u1EC7ch. Tim nhanh, ph\u1ED5i ho\xE0n to\xE0n trong tr\u1EBBo kh\xF4ng ran."
      },
      abg: {
        unit: "kPa",
        pH: 7.49,
        pCO2: 3.31,
        // 25.0 mmHg
        pO2: 11.9,
        // 89.0 mmHg
        hco3: 22,
        be: -2,
        sao2: 99.8,
        fio2: 21,
        na: 138,
        k: 3.8,
        cl: 96,
        lactate: 1,
        glucose: 3.9,
        patientAge: 79
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. Nguy\xEAn nh\xE2n th\u1EF1c s\u1EF1 g\xE2y kh\xF3 th\u1EDF \u1EDF b\u1EC7nh nh\xE2n n\xE0y l\xE0 g\xEC?",
        "3. Ph\u01B0\u01A1ng ph\xE1p n\xE0o hi\u1EC7u qu\u1EA3 nh\u1EA5t \u0111\u1EC3 c\u1EA3i thi\u1EC7n l\u01B0\u1EE3ng oxy cung c\u1EA5p cho m\xF4?"
      ],
      answers: {
        gasExchange: "Trao \u0111\u1ED5i kh\xED t\u1EA1i m\xE0ng ph\u1EBF nang mao m\u1EA1ch ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (PaO2 89 mmHg, SaO2 99.8%). C\xF3 t\u0103ng th\xF4ng kh\xED ph\u1EBF nang (PaCO2 25 mmHg).",
        acidBase: "Ki\u1EC1m h\xF4 h\u1EA5p c\u1EA5p t\xEDnh ch\u01B0a b\xF9 tr\u1EEB do th\u1EDF nhanh ph\u1EA3n x\u1EA1.",
        differentialDiagnosis: "Thi\u1EBFu m\xE1u thi\u1EBFu s\u1EAFt n\u1EB7ng (Severe Anemia) v\u1EDBi Hb = 6.8 g/dL.",
        clinicalAction: "TRUY\u1EC0N KH\u1ED0I H\u1ED2NG C\u1EA6U C\u1EA4P C\u1EE8U! Cho th\u1EDF th\xEAm oxy h\u1EA7u nh\u01B0 kh\xF4ng c\xF3 t\xE1c d\u1EE5ng, v\xEC l\u01B0\u1EE3ng Hemoglobin c\xF2n l\u1EA1i \u0111\xE3 b\xE3o h\xF2a 100% oxy (SaO2 99.8%), kh\xF4ng th\u1EC3 mang th\xEAm ph\xE2n t\u1EED oxy n\xE0o n\u1EEFa. C\xF4ng th\u1EE9c t\xEDnh l\u01B0\u1EE3ng oxy trong m\xE1u (CaO2) = (1.34 x Hb x SaO2) + (0.003 x PaO2). Khi Hb gi\u1EA3m m\u1ED9t n\u1EEDa, kh\u1EA3 n\u0103ng v\u1EADn chuy\u1EC3n oxy gi\u1EA3m m\u1ED9t n\u1EEDa! B\xF9 d\u1ECBch c\u1EA7m ch\u1EEBng v\xE0 truy\u1EC1n m\xE1u.",
        physiologicalInsight: "M\u1ED9t b\xE0i h\u1ECDc l\xE2m s\xE0ng c\u01A1 b\u1EA3n: Kh\xED m\xE1u PaO2 v\xE0 SaO2 b\xECnh th\u01B0\u1EDDng KH\xD4NG C\xD3 NGH\u0128A l\xE0 oxy m\xF4 b\xECnh th\u01B0\u1EDDng. N\u1EBFu thi\u1EBFu ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n (Hemoglobin), m\xF4 v\u1EABn b\u1ECB ng\u1EA1t oxy."
      }
    },
    {
      id: 17,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 17 (Hennessey)",
      title: "Nh\u1ED3i m\xE1u m\u1EA1c treo: Toan Lactic \u1EA9n m\xECnh sau \u0111au b\u1EE5ng",
      patientProfile: "N\u1EEF 78 tu\u1ED5i, rung nh\u0129 u\u1ED1ng digoxin/aspirin, \u0111au b\u1EE5ng d\u1EEF d\u1ED9i t\u1EEBng c\u01A1n nh\u01B0ng kh\xE1m b\u1EE5ng m\u1EC1m",
      categoryTag: "C\u1EA5p c\u1EE9u b\u1EE5ng ngo\u1EA1i khoa",
      difficulty: "N\xE2ng cao",
      history: "C\u1EE5 b\xE0 78 tu\u1ED5i, ti\u1EC1n s\u1EED rung nh\u0129, \u0111\u1ED9t ng\u1ED9t \u0111au b\u1EE5ng d\u1EEF d\u1ED9i quanh r\u1ED1n kh\xF4ng lan, kh\xF4ng n\xF4n, kh\xF4ng ti\xEAu ch\u1EA3y. \u0110au qu\u1EB1n qu\u1EA1i nh\u01B0ng kh\xE1m b\u1EE5ng l\u1EA1i m\u1EC1m m\u1EA1i, ch\u1EC9 t\u1EE9c nh\u1EB9 khi \u1EA5n s\xE2u.",
      examination: {
        vitals: {
          pulse: "110 l\u1EA7n/ph\xFAt (lo\u1EA1n nh\u1ECBp ho\xE0n to\xE0n)",
          rr: "24 l\u1EA7n/ph\xFAt",
          bp: "135/75 mmHg",
          temp: "37.1\xB0C",
          spo2: "99% (\u0111ang th\u1EDF oxy mask 10L)",
          fio2: "40%"
        },
        findings: "B\u1EC7nh nh\xE2n \u0111au \u0111\u1EDBn d\u1EEF d\u1ED9i, k\xEAu la kh\xF4ng t\u01B0\u01A1ng x\u1EE9ng v\u1EDBi kh\xE1m b\u1EE5ng (b\u1EE5ng m\u1EC1m, kh\xF4ng ph\u1EA3n \u1EE9ng th\xE0nh b\u1EE5ng, X-quang b\u1EE5ng kh\xF4ng li\u1EC1m h\u01A1i)."
      },
      abg: {
        unit: "kPa",
        pH: 7.28,
        pCO2: 4.39,
        // 33.0 mmHg
        pO2: 28.6,
        // 215.0 mmHg
        hco3: 16.2,
        be: -10.4,
        sao2: 99.8,
        fio2: 40,
        na: 135,
        k: 4.6,
        cl: 96,
        lactate: 3.2,
        glucose: 3.8,
        patientAge: 78
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. Ch\u1EA9n \u0111o\xE1n c\u1EA5p c\u1EE9u ngo\u1EA1i khoa nguy hi\u1EC3m c\u1EA7n ngh\u0129 t\u1EDBi ngay?",
        "3. Ngu\u1ED3n g\u1ED1c sinh ra acid lactic \u1EDF ca b\u1EC7nh n\xE0y l\xE0 t\u1EEB \u0111\xE2u?"
      ],
      answers: {
        gasExchange: "Oxy h\xF3a m\xE1u t\u1ED1t tr\xEAn FiO2 40% (PaO2 215 mmHg). T\u0103ng th\xF4ng kh\xED th\u1EE9 ph\xE1t (PaCO2 33 mmHg) \u0111\u1EC3 b\xF9 tr\u1EEB toan m\xE1u.",
        acidBase: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap b\xF9 tr\u1EEB b\xE1n ph\u1EA7n (pH 7.28, HCO3- 16.2 mmol/L, BE -10.4 mmol/L). Anion Gap = 135 - (96 + 16.2) = 22.8 mmol/L.",
        differentialDiagnosis: "Thi\u1EBFu m\xE1u c\u1EE5c b\u1ED9 m\u1EA1c treo c\u1EA5p / Nh\u1ED3i m\xE1u m\u1EA1c treo (Acute Mesenteric Ischaemia) do huy\u1EBFt kh\u1ED1i t\u1EEB t\xE2m nh\u0129 b\u1EAFn \u0111i.",
        clinicalAction: 'Ngu\u1ED3n acid lactic (3.2 mmol/L) ch\xEDnh l\xE0 QUAI RU\u1ED8T \u0110ANG B\u1ECA THI\u1EBEU M\xC1U HO\u1EA0I T\u1EEC! D\u1EA5u hi\u1EC7u kinh \u0111i\u1EC3n: "\u0110au b\u1EE5ng d\u1EEF d\u1ED9i kh\xF4ng t\u01B0\u01A1ng x\u1EE9ng v\u1EDBi tri\u1EC7u ch\u1EE9ng th\u1EF1c th\u1EC3" k\xE8m toan Lactic m\xE1u \u1EDF b\u1EC7nh nh\xE2n rung nh\u0129 = Nh\u1ED3i m\xE1u m\u1EA1c treo cho t\u1EDBi khi c\xF3 b\u1EB1ng ch\u1EE9ng ng\u01B0\u1EE3c l\u1EA1i. X\u1EED tr\xED: Ch\u1EE5p CT m\u1EA1ch m\xE1u \u1ED5 b\u1EE5ng (CTA b\u1EE5ng) kh\u1EA9n c\u1EA5p v\xE0 h\u1ED9i ch\u1EA9n ph\u1EABu thu\u1EADt ngo\u1EA1i khoa m\u1EDF b\u1EE5ng c\u1EA5p c\u1EE9u ho\u1EB7c can thi\u1EC7p l\u1EA5y huy\u1EBFt kh\u1ED1i.',
        physiologicalInsight: "N\u1EBFu ch\u1EC9 \u0111\u1EE3i \u0111\u1EBFn khi b\u1EE5ng c\xF3 ph\u1EA3n \u1EE9ng th\xE0nh b\u1EE5ng g\u1ED3ng c\u1EE9ng, ru\u1ED9t \u0111\xE3 ho\u1EA1i t\u1EED th\u1EE7ng ho\xE0n to\xE0n v\xE0 t\u1EF7 l\u1EC7 t\u1EED vong > 80%. Kh\xED m\xE1u v\u1EDBi toan lactic l\xE0 manh m\u1ED1i s\u1EDBm duy nh\u1EA5t c\u1EE9u s\u1ED1ng b\u1EC7nh nh\xE2n!"
      }
    },
    {
      id: 18,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 18 (Hennessey)",
      title: "Nhi\u1EC5m toan Ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA) n\u1EB7ng",
      patientProfile: "N\u1EEF 35 tu\u1ED5i, \u0110T\u0110 Type 1, n\xF4n \xF3i b\u1ECF ti\xEAm insulin 3 ng\xE0y, th\u1EDF Kussmaul s\xE2u ng\u1EAFt qu\xE3ng",
      categoryTag: "C\u1EA5p c\u1EE9u n\u1ED9i ti\u1EBFt / Toan chuy\u1EC3n h\xF3a",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "N\u1EEF 35 tu\u1ED5i, ti\u1EC1n s\u1EED \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng Type 1. Ba ng\xE0y nay b\u1ECB s\u1ED1t n\xF4n \xF3i \u0103n u\u1ED1ng k\xE9m, s\u1EE3 h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt n\xEAn t\u1EF1 \xFD ng\u01B0ng ch\xEDch insulin. Ng\u01B0\u1EDDi nh\xE0 ph\xE1t hi\u1EC7n l\u01A1 m\u01A1, mi\u1EC7ng s\u1EF1c m\xF9i t\xE1o ch\xEDn (m\xF9i acetone).",
      examination: {
        vitals: {
          pulse: "130 l\u1EA7n/ph\xFAt",
          rr: "26 l\u1EA7n/ph\xFAt (th\u1EDF s\xE2u Kussmaul)",
          bp: "100/60 mmHg",
          temp: "36.8\xB0C",
          spo2: "99% (th\u1EDF oxy mask 10L)",
          fio2: "60%"
        },
        findings: "Tri gi\xE1c l\u01A1 m\u01A1 (GCS 12 \u0111i\u1EC3m), m\u1EAFt tr\u0169ng, ni\xEAm m\u1EA1c mi\u1EC7ng kh\xF4 kh\u1ED1c, v\xE9o da m\u1EA5t r\u1EA5t ch\u1EADm. Th\u1EDF nhanh s\xE2u ki\u1EC3u Kussmaul."
      },
      abg: {
        unit: "kPa",
        pH: 7.05,
        pCO2: 1.5,
        // 11.0 mmHg
        pO2: 28.4,
        // 187.0 mmHg
        hco3: 6,
        be: -25.2,
        sao2: 99.8,
        fio2: 60,
        na: 141,
        k: 4.6,
        cl: 96,
        lactate: 1,
        glucose: 35,
        // mmol/L (~630 mg/dL)
        patientAge: 35
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. T\xEDnh kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap)?",
        "3. Ch\u1EA9n \u0111o\xE1n x\xE1c \u0111\u1ECBnh v\xE0 c\xE1c tr\u1EE5 c\u1ED9t \u0111i\u1EC1u tr\u1ECB h\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u?"
      ],
      answers: {
        gasExchange: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang th\u1EE9 ph\xE1t t\u1ED1i \u0111a (PaCO2 t\u1EE5t xu\u1ED1ng m\u1EE9c k\u1EF7 l\u1EE5c 11 mmHg / 1.5 kPa). Oxy h\xF3a m\xE1u \u0111\u01B0\u1EE3c b\u1EA3o t\u1ED3n.",
        acidBase: "Toan chuy\u1EC3n h\xF3a t\u0103ng kho\u1EA3ng tr\u1ED1ng Anion c\u1EF1c k\u1EF3 n\u1EB7ng, b\xF9 tr\u1EEB h\xF4 h\u1EA5p b\xE1n ph\u1EA7n (pH 7.05 toan m\xE1u \u0111e d\u1ECDa ng\u1EEBng tim, HCO3- 6.0 mmol/L, BE -25.2 mmol/L). Anion Gap = (141 + 4.6) - (96 + 6.0) = 43.6 mmol/L (chu\u1EA9n 10-18)!",
        differentialDiagnosis: "Nhi\u1EC5m toan Ceton do \u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng m\u1EE9c \u0111\u1ED9 n\u1EB7ng (Severe Diabetic Ketoacidosis - DKA). Tam ch\u1EE9ng: \u0110\u01B0\u1EDDng huy\u1EBFt cao (35 mmol/L), Toan chuy\u1EC3n h\xF3a (pH < 7.3, HCO3 < 15), Ceton m\xE1u/n\u01B0\u1EDBc ti\u1EC3u d\u01B0\u01A1ng t\xEDnh.",
        clinicalAction: "Tr\u1EE5 c\u1ED9t h\u1ED3i s\u1EE9c DKA: 1. B\xF9 d\u1ECBch t\xEDch c\u1EF1c (NaCl 0.9% 1000ml trong gi\u1EDD \u0111\u1EA7u, b\xF9 4-6 l\xEDt trong 24h); 2. Truy\u1EC1n Insulin t\u0129nh m\u1EA1ch li\xEAn t\u1EE5c li\u1EC1u 0.1 UI/kg/gi\u1EDD (ch\u1EC9 b\u1EAFt \u0111\u1EA7u khi K+ > 3.3 mmol/L); 3. Theo d\xF5i s\xE1t v\xE0 b\xF9 Kali li\xEAn t\u1EE5c (khi truy\u1EC1n insulin, K+ s\u1EBD di chuy\u1EC3n \xE0o \u1EA1t v\xE0o n\u1ED9i b\xE0o g\xE2y h\u1EA1 kali t\u1EED vong); 4. C\xE2n nh\u1EAFc truy\u1EC1n Bicarbonate \u0111\u1EB3ng tr\u01B0\u01A1ng 1.4% th\u1EADn tr\u1ECDng v\xEC pH < 6.9-7.1; 5. Khi \u0111\u01B0\u1EDDng huy\u1EBFt h\u1EA1 xu\u1ED1ng < 14 mmol/L, \u0111\u1ED5i d\u1ECBch truy\u1EC1n sang Glucose 5% + NaCl 0.45% \u0111\u1EC3 tr\xE1nh h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt trong khi ti\u1EBFp t\u1EE5c truy\u1EC1n insulin d\u1EADp t\u1EAFt ceton.",
        physiologicalInsight: "B\u1EC7nh nh\xE2n \u0111ang th\u1EDF Kussmaul c\u1EADt l\u1EF1c \u0111\u1EA9y PaCO2 xu\u1ED1ng t\u1EADn 11 mmHg (b\xF9 tr\u1EEB h\xF4 h\u1EA5p g\u1EA7n nh\u01B0 t\u1ED1i \u0111a), nh\u01B0ng l\u01B0\u1EE3ng th\u1EC3 ceton (Acetoacetate, Beta-hydroxybutyrate) qu\xE1 kh\u1ED5ng l\u1ED3 \u0111\xE3 \u0111\xE8 b\u1EB9p ho\xE0n to\xE0n h\u1EC7 \u0111\u1EC7m khi\u1EBFn pH t\u1EE5t xu\u1ED1ng 7.05. N\u1EBFu b\u1EC7nh nh\xE2n m\u1EC7t m\u1ECFi gi\u1EA3m th\u1EDF, pH s\u1EBD r\u01A1i xu\u1ED1ng < 6.8 g\xE2y ng\u1EEBng tim ngay t\u1EE9c kh\u1EAFc."
      }
    },
    {
      id: 20,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 20 (Hennessey)",
      title: "Toan h\xF3a \u1ED1ng th\u1EADn Type 1 (RTA 1): Toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion b\xECnh th\u01B0\u1EDDng",
      patientProfile: "Nam 52 tu\u1ED5i, ti\u1EC1n s\u1EED s\u1ECFi th\u1EADn c\u1EA3n quang t\xE1i ph\xE1t nhi\u1EC1u \u0111\u1EE3t, m\u1EC7t m\u1ECFi u\u1EC3 o\u1EA3i",
      categoryTag: "B\u1EC7nh th\u1EADn / Toan chuy\u1EC3n h\xF3a",
      difficulty: "Trung b\xECnh",
      history: "Nam 52 tu\u1ED5i, kh\xE1m t\u1EA1i khoa ni\u1EC7u v\xEC s\u1ECFi th\u1EADn canxi t\xE1i ph\xE1t nhi\u1EC1u l\u1EA7n. Th\u01B0\u1EDDng xuy\xEAn m\u1EC7t m\u1ECFi, y\u1EBFu c\u01A1 chi d\u01B0\u1EDBi. Kh\xF4ng ti\xEAu ch\u1EA3y, kh\xF4ng d\xF9ng thu\u1ED1c l\u1EE3i ti\u1EC3u.",
      examination: {
        vitals: {
          pulse: "74 l\u1EA7n/ph\xFAt",
          rr: "16 l\u1EA7n/ph\xFAt",
          bp: "120/75 mmHg",
          temp: "36.7\xB0C",
          spo2: "99% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "To\xE0n tr\u1EA1ng b\xECnh th\u01B0\u1EDDng, kh\xF4ng ph\xF9, kh\xE1m b\u1EE5ng kh\xF4ng c\xF3 \u0111i\u1EC3m \u0111au ni\u1EC7u qu\u1EA3n."
      },
      abg: {
        unit: "kPa",
        pH: 7.37,
        pCO2: 4.2,
        // 31.5 mmHg
        pO2: 13.2,
        // 99.0 mmHg
        hco3: 18,
        be: -7,
        sao2: 99,
        fio2: 21,
        na: 137,
        k: 3,
        // Hạ kali máu
        cl: 109,
        // Tăng clo máu
        lactate: 1,
        glucose: 4,
        patientAge: 52
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. T\xEDnh kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap)?",
        "3. Ch\u1EA9n \u0111o\xE1n nguy\xEAn nh\xE2n ph\xF9 h\u1EE3p nh\u1EA5t?"
      ],
      answers: {
        gasExchange: "Trao \u0111\u1ED5i kh\xED b\xECnh th\u01B0\u1EDDng. T\u0103ng th\xF4ng kh\xED nh\u1EB9 (PaCO2 31.5 mmHg) b\xF9 tr\u1EEB cho toan.",
        acidBase: "Toan chuy\u1EC3n h\xF3a kho\u1EA3ng tr\u1ED1ng Anion B\xCCNH TH\u01AF\u1EDCNG b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.37, HCO3- 18.0 mmol/L). Anion Gap = (137 + 3.0) - (109 + 18.0) = 13.0 mmol/L (n\u1EB1m tr\u1ECDn trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng 10-18 mmol/L)!",
        differentialDiagnosis: "Toan h\xF3a \u1ED1ng th\u1EADn xa Type 1 (Distal Renal Tubular Acidosis - Type 1 RTA). \u0110\u1EB7c tr\u01B0ng b\u1EDFi: Toan chuy\u1EC3n h\xF3a t\u0103ng Clo m\xE1u (Hyperchloraemic Metabolic Acidosis), h\u1EA1 Kali m\xE1u (K 3.0 mmol/L) v\xE0 s\u1ECFi th\u1EADn Calci phosphate.",
        clinicalAction: "B\u1ED5 sung Bicarbonate ho\u1EB7c Citrate \u0111\u01B0\u1EDDng u\u1ED1ng (Shohl solution), k\u1EBFt h\u1EE3p b\xF9 Kali (Potassium citrate). Ki\u1EC1m h\xF3a n\u01B0\u1EDBc ti\u1EC3u gi\xFAp h\xF2a tan calci v\xE0 b\u1EA3o t\u1ED3n ch\u1EE9c n\u0103ng th\u1EADn.",
        physiologicalInsight: "Trong Type 1 RTA, \u1ED1ng l\u01B0\u1EE3n xa kh\xF4ng th\u1EC3 b\xE0i ti\u1EBFt ion H+ v\xE0o n\u01B0\u1EDBc ti\u1EC3u. \u0110\u1EC3 t\xE1i h\u1EA5p thu Na+, th\u1EADn bu\u1ED9c ph\u1EA3i b\xE0i ti\u1EBFt K+ (d\u1EABn \u0111\u1EBFn h\u1EA1 Kali) v\xE0 gi\u1EEF l\u1EA1i Cl- (d\u1EABn \u0111\u1EBFn t\u0103ng Clo m\xE1u \u0111\u1EC3 b\u1EA3o to\xE0n t\xEDnh trung h\xF2a \u0111i\u1EC7n t\xEDch). V\xEC Cl- l\xE0 anion \u0111\u01B0\u1EE3c \u0111o tr\u1EF1c ti\u1EBFp trong c\xF4ng th\u1EE9c, Anion Gap ho\xE0n to\xE0n kh\xF4ng t\u0103ng!"
      }
    },
    {
      id: 21,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 21 (Hennessey)",
      title: "Ng\u1ED9 \u0111\u1ED9c Aspirin (Salicylate): R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p kinh \u0111i\u1EC3n",
      patientProfile: "N\u1EEF 18 tu\u1ED5i, u\u1ED1ng qu\xE1 li\u1EC1u thu\u1ED1c gi\u1EA3m \u0111au 5 gi\u1EDD tr\u01B0\u1EDBc, \xF9 tai, bu\u1ED3n n\xF4n, th\u1EDF nhanh s\xE2u",
      categoryTag: "Ng\u1ED9 \u0111\u1ED9c / C\u1EA5p c\u1EE9u",
      difficulty: "N\xE2ng cao",
      history: "Thi\u1EBFu n\u1EEF 18 tu\u1ED5i u\u1ED1ng m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn thu\u1ED1c kh\xF4ng r\xF5 lo\u1EA1i c\xE1ch 5 gi\u1EDD. V\xE0o vi\u1EC7n than bu\u1ED3n n\xF4n v\xE0 nghe th\u1EA5y ti\u1EBFng ve k\xEAu r\xEDu r\xEDt trong tai (\xF9 tai - tinnitus), l\u01A1 m\u01A1 nh\u1EB9.",
      examination: {
        vitals: {
          pulse: "100 l\u1EA7n/ph\xFAt",
          rr: "26 l\u1EA7n/ph\xFAt (th\u1EDF nhanh s\xE2u)",
          bp: "132/100 mmHg",
          temp: "37.6\xB0C",
          spo2: "99% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "B\u1EC7nh nh\xE2n b\u1EE9t r\u1EE9t, th\u1EDF nhanh s\xE2u. Kh\xE1m tim ph\u1ED5i b\xECnh th\u01B0\u1EDDng."
      },
      abg: {
        unit: "kPa",
        pH: 7.41,
        pCO2: 3.01,
        // 22.6 mmHg
        pO2: 14.1,
        // 97.5 mmHg
        hco3: 17.6,
        be: -8.3,
        sao2: 99,
        fio2: 21,
        na: 140,
        k: 3.6,
        cl: 99,
        lactate: 1.4,
        glucose: 5,
        patientAge: 18
      },
      questions: [
        "1. Nh\xECn v\xE0o pH 7.41 b\xECnh th\u01B0\u1EDDng, b\u1EC7nh nh\xE2n c\xF3 r\u1ED1i lo\u1EA1n ki\u1EC1m toan kh\xF4ng?",
        "2. T\xEDnh kho\u1EA3ng tr\u1ED1ng Anion?",
        "3. Ho\u1EA1t ch\u1EA5t g\xE2y ng\u1ED9 \u0111\u1ED9c nhi\u1EC1u kh\u1EA3 n\u0103ng nh\u1EA5t v\xE0 c\u01A1 ch\u1EBF sinh l\xFD b\u1EC7nh?"
      ],
      answers: {
        gasExchange: "T\u0103ng th\xF4ng kh\xED ph\u1EBF nang r\xF5 r\u1EC7t (PaCO2 22.6 mmHg). Oxy h\xF3a m\xE1u b\xECnh th\u01B0\u1EDDng.",
        acidBase: "R\u1ED0I LO\u1EA0N TOAN KI\u1EC0M H\u1ED6N H\u1EE2P: Ki\u1EC1m h\xF4 h\u1EA5p ti\xEAn ph\xE1t PH\u1ED0I H\u1EE2P Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap ti\xEAn ph\xE1t (Mixed Respiratory Alkalosis and High Anion Gap Metabolic Acidosis). pH 7.41 l\xE0 do hai r\u1ED1i lo\u1EA1n \u0111\u1ED1i kh\xE1ng nhau c\xF9ng l\xFAc!",
        differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c c\u1EA5p Salicylate / Aspirin (Aspirin Poisoning). Anion Gap = (140 + 3.6) - (99 + 17.6) = 27 mmol/L (t\u0103ng cao).",
        clinicalAction: "\u0110\u1ECBnh l\u01B0\u1EE3ng n\u1ED3ng \u0111\u1ED9 Salicylate m\xE1u kh\u1EA9n c\u1EA5p. Ph\xE1c \u0111\u1ED3 x\u1EED tr\xED: 1. Ki\u1EC1m h\xF3a n\u01B0\u1EDBc ti\u1EC3u b\u1EB1ng Natri Bicarbonate 8.4% truy\u1EC1n t\u0129nh m\u1EA1ch m\u1EE5c ti\xEAu pH n\u01B0\u1EDBc ti\u1EC3u 7.5 - 8.5 (gi\xFAp ion h\xF3a salicylate ng\u0103n t\xE1i h\u1EA5p thu \u1EDF \u1ED1ng th\u1EADn v\xE0 t\u0103ng b\xE0i ti\u1EBFt); 2. B\xF9 d\u1ECBch v\xE0 theo d\xF5i s\xE1t Kali; 3. Ch\u1EC9 \u0111\u1ECBnh l\u1ECDc m\xE1u th\u1EADn nh\xE2n t\u1EA1o ng\u1EAFt qu\xE3ng (HD) n\u1EBFu n\u1ED3ng \u0111\u1ED9 salicylate > 100 mg/dL ho\u1EB7c toan m\xE1u n\u1EB7ng tr\u01A1, suy th\u1EADn, ph\xF9 ph\u1ED5i.",
        physiologicalInsight: "Aspirin t\xE1c \u0111\u1ED9ng qua 2 c\u01A1 ch\u1EBF \u0111\u1ED9c l\u1EADp: M\u1ED9t m\u1EB7t, Salicylate k\xEDch th\xEDch tr\u1EF1c ti\u1EBFp trung t\xE2m h\xF4 h\u1EA5p \u1EDF h\xE0nh t\u1EE7y g\xE2y th\u1EDF nhanh s\xE2u d\u1EABn \u0111\u1EBFn Ki\u1EC1m h\xF4 h\u1EA5p nguy\xEAn ph\xE1t. M\u1EB7t kh\xE1c, b\u1EA3n th\xE2n Salicylate l\xE0 acid h\u1EEFu c\u01A1, \u0111\u1ED3ng th\u1EDDi \u1EE9c ch\u1EBF chu\u1ED7i h\xF4 h\u1EA5p t\u1EBF b\xE0o (uncoupling oxidative phosphorylation) l\xE0m t\xEDch t\u1EE5 acid lactic v\xE0 acid h\u1EEFu c\u01A1 g\xE2y Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap nguy\xEAn ph\xE1t!"
      }
    },
    {
      id: 22,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 22 (Hennessey)",
      title: "S\u1ED1c nhi\u1EC5m khu\u1EA9n \u0111\u01B0\u1EDDng ni\u1EC7u: Lactate l\xE0 ch\u1EC9 s\u1ED1 s\u1ED1ng c\xF2n",
      patientProfile: "N\u1EEF 64 tu\u1ED5i, s\u1ED1t 39.8\xB0C, m\u1EA1ch 122 sau th\u1EE7 thu\u1EADt can thi\u1EC7p \u0111\u01B0\u1EDDng ti\u1EBFt ni\u1EC7u 48h",
      categoryTag: "S\u1ED1c / Nhi\u1EC5m tr\xF9ng huy\u1EBFt",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "N\u1EEF 64 tu\u1ED5i, sau t\xE1n s\u1ECFi n\u1ED9i soi 48 gi\u1EDD xu\u1EA5t hi\u1EC7n r\xE9t run, s\u1ED1t cao 39.8\xB0C, t\u1EE5t huy\u1EBFt \xE1p d\u1EA7n, n\u01B0\u1EDBc ti\u1EC3u \xEDt trong 4 gi\u1EDD qua.",
      examination: {
        vitals: {
          pulse: "122 l\u1EA7n/ph\xFAt (nhanh xoang)",
          rr: "26 l\u1EA7n/ph\xFAt",
          bp: "100/65 mmHg",
          temp: "39.8\xB0C",
          spo2: "100% (th\u1EDF oxy mask 10L)",
          fio2: "60%"
        },
        findings: "Da \u0111\u1ECF n\xF3ng v\xE3 m\u1ED3 h\xF4i, th\u1EDDi gian \u0111\u1ED5 \u0111\u1EA7y mao m\u1EA1ch (CRT) k\xE9o d\xE0i > 3 gi\xE2y. C-reactive protein v\u1ECDt l\xEAn 267 mg/L."
      },
      abg: {
        unit: "kPa",
        pH: 7.36,
        pCO2: 4.2,
        // 31.5 mmHg
        pO2: 27.1,
        // 203.0 mmHg
        hco3: 17.3,
        be: -6.9,
        sao2: 100,
        fio2: 60,
        na: 140,
        k: 4.1,
        cl: 101,
        lactate: 5.1,
        // Toan lactic nặng!
        glucose: 6.8,
        patientAge: 64
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Gi\xE1 tr\u1ECB n\xE0o tr\xEAn kh\xED m\xE1u mang \xFD ngh\u0129a ti\xEAn l\u01B0\u1EE3ng s\u1ED1ng c\xF2n quan tr\u1ECDng nh\u1EA5t?",
        "3. Ph\xE1c \u0111\u1ED3 x\u1EED tr\xED kh\u1EA9n c\u1EA5p gi\u1EDD \u0111\u1EA7u (Surviving Sepsis Campaign bundle)?"
      ],
      answers: {
        gasExchange: "T\u0103ng th\xF4ng kh\xED th\u1EE9 ph\xE1t b\xF9 tr\u1EEB toan (PaCO2 31.5 mmHg). Oxy h\xF3a m\xE1u \u0111\u1EA1t \u0111\u01B0\u1EE3c nh\u1EDD mask oxy 10L.",
        acidBase: "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap c\xF3 b\xF9 tr\u1EEB h\xF4 h\u1EA5p ho\xE0n to\xE0n (pH 7.36, HCO3- 17.3 mmol/L). Anion Gap = (140 + 4.1) - (101 + 17.3) = 25.8 mmol/L.",
        differentialDiagnosis: "Nhi\u1EC5m khu\u1EA9n huy\u1EBFt / S\u1ED1c nhi\u1EC5m khu\u1EA9n \u0111\u01B0\u1EDDng v\xE0o t\u1EEB h\u1EC7 ti\u1EBFt ni\u1EC7u (Urosepsis).",
        clinicalAction: "CH\u1EC8 S\u1ED0 TI\xCAN L\u01AF\u1EE2NG QUAN TR\u1ECCNG NH\u1EA4T L\xC0 LACTATE = 5.1 mmol/L! D\xF9 huy\u1EBFt \xE1p t\xE2m thu c\xF2n 100 mmHg ch\u01B0a t\u1EE5t s\xE2u, Lactate > 4 mmol/L ch\u1EE9ng minh c\xF3 t\xECnh tr\u1EA1ng thi\u1EBFu m\xE1u nu\xF4i m\xF4 vi tu\u1EA7n ho\xE0n nghi\xEAm tr\u1ECDng (t\u1EF7 l\u1EC7 t\u1EED vong t\u1EDBi 30%). Ph\xE1c \u0111\u1ED3 Sepsis Bundle: 1. C\u1EA5y m\xE1u tr\u01B0\u1EDBc khi d\xF9ng kh\xE1ng sinh; 2. Kh\xE1ng sinh ph\u1ED5 r\u1ED9ng \u0111\u01B0\u1EDDng t\u0129nh m\u1EA1ch trong v\xF2ng 1 gi\u1EDD; 3. B\xF9 d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng 30ml/kg trong 3 gi\u1EDD \u0111\u1EA7u; 4. D\xF9ng v\u1EADn m\u1EA1ch Noradrenaline n\u1EBFu HA trung b\xECnh MAP < 65 mmHg sau b\xF9 d\u1ECBch; 5. \u0110o l\u1EA1i lactate sau 2-4 gi\u1EDD \u0111\u1EC3 \u0111\xE1nh gi\xE1 \u0111\u1ED9 thanh th\u1EA3i.",
        physiologicalInsight: "S\u1EF1 gi\xE3n m\u1EA1ch v\xE0 tho\xE1t qu\u1EA3n do c\u01A1n b\xE3o cytokine l\xE0m s\u1EE5t gi\u1EA3m l\u01B0u l\u01B0\u1EE3ng m\xE1u hi\u1EC7u d\u1EE5ng \u0111\u1EBFn c\xE1c c\u01A1 quan. C\xE1c m\xF4 bu\u1ED9c ph\u1EA3i chuy\u1EC3n sang chuy\u1EC3n h\xF3a k\u1EF5 kh\xED sinh ra acid lactic \xE0o \u1EA1t."
      }
    },
    {
      id: 26,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 26 (Hennessey)",
      title: "N\xF4n \xF3i li\xEAn t\u1EE5c 3 ng\xE0y: Ki\u1EC1m chuy\u1EC3n h\xF3a gi\u1EA3m Clo & Kali",
      patientProfile: "N\u1EEF 35 tu\u1ED5i, n\xF4n \xF3i d\u1EEF d\u1ED9i k\xE9o d\xE0i sau m\u1ED5 tri\u1EC7t s\u1EA3n, kh\xF4ng \u0111\u01B0\u1EE3c truy\u1EC1n d\u1ECBch b\xF9 ph\u1EE5",
      categoryTag: "Ki\u1EC1m chuy\u1EC3n h\xF3a",
      difficulty: "Trung b\xECnh",
      history: "N\u1EEF 35 tu\u1ED5i sau ph\u1EABu thu\u1EADt n\u1ED9i soi tri\u1EC7t s\u1EA3n xu\u1EA5t hi\u1EC7n h\u1ED9i ch\u1EE9ng n\xF4n d\u1EEF d\u1ED9i k\xE9o d\xE0i 3 ng\xE0y. B\u1EA3ng theo d\xF5i d\u1ECBch v\xE0o ra cho th\u1EA5y m\u1EA5t d\u1ECBch l\u1EDBn nh\u01B0ng kh\xF4ng \u0111\u01B0\u1EE3c k\xEA \u0111\u01A1n truy\u1EC1n b\xF9 d\u1ECBch.",
      examination: {
        vitals: {
          pulse: "100 l\u1EA7n/ph\xFAt",
          rr: "10 l\u1EA7n/ph\xFAt (th\u1EDF ch\u1EADm)",
          bp: "160/100 mmHg",
          temp: "36.6\xB0C",
          spo2: "96% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "D\u1EA5u hi\u1EC7u m\u1EA5t n\u01B0\u1EDBc r\xF5: v\xE9o da m\u1EA5t ch\u1EADm, m\xF4i l\u01B0\u1EE1i kh\xF4 kh\u1ED1c. Nh\u1ECBp th\u1EDF ch\u1EADm 10 l/p."
      },
      abg: {
        unit: "kPa",
        pH: 7.44,
        pCO2: 6.4,
        // 48.0 mmHg
        pO2: 11.1,
        // 83.0 mmHg
        hco3: 32,
        be: 4,
        sao2: 96,
        fio2: 21,
        na: 133,
        k: 3,
        // Hạ kali
        cl: 91,
        // Hạ clo
        lactate: 1,
        glucose: 5,
        patientAge: 35
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. B\u1EC7nh nh\xE2n c\xF3 nh\u1EEFng r\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i n\xE0o?",
        "3. Lo\u1EA1i d\u1ECBch truy\u1EC1n n\xE0o s\u1EBD s\u1EEDa ch\u1EEFa tri\u1EC7t \u0111\u1EC3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m n\xE0y?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EE9c \u0111\u1ED9 nh\u1EB9 mang t\xEDnh b\xF9 tr\u1EEB (PaCO2 t\u0103ng l\xEAn 48 mmHg do trung t\xE2m h\xF4 h\u1EA5p h\xE3m nh\u1ECBp th\u1EDF xu\u1ED1ng 10 l/p \u0111\u1EC3 gi\u1EEF CO2). Oxy h\xF3a m\xE1u \u0111\u1EA1t y\xEAu c\u1EA7u.",
        acidBase: "Ki\u1EC1m chuy\u1EC3n h\xF3a b\xF9 tr\u1EEB ho\xE0n to\xE0n (pH 7.44 n\u1EB1m trong gi\u1EDBi h\u1EA1n 7.40-7.45, HCO3- t\u0103ng 32.0 mmol/L).",
        differentialDiagnosis: "Ki\u1EC1m chuy\u1EC3n h\xF3a \u0111\xE1p \u1EE9ng v\u1EDBi Clo (Chloride-responsive metabolic alkalosis) do n\xF4n m\u1EA5t d\u1ECBch v\u1ECB d\u1EA1 d\xE0y (HCl) v\xE0 m\u1EA5t d\u1ECBch \u0111\u1EB3ng tr\u01B0\u01A1ng.",
        clinicalAction: "R\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i: H\u1EA1 Kali (3.0 mmol/L), H\u1EA1 Clo (91 mmol/L), H\u1EA1 Natri nh\u1EB9 (133 mmol/L). D\u1ECACH TRUY\u1EC0N T\u1ED0I \u01AFU \u0110\u1EC2 \u0110I\u1EC0U CH\u1EC8NH: Dung d\u1ECBch Natri Clorid 0.9% (Normal Saline) k\u1EBFt h\u1EE3p b\u1ED5 sung Kali Clorid (KCl). Khi \u0111\u01B0\u1EE3c cung c\u1EA5p \u0111\u1EE7 Cl-, th\u1EADn s\u1EBD ng\u1EEBng gi\u1EEF HCO3- v\xE0 b\xE0i ti\u1EBFt bicarb ra n\u01B0\u1EDBc ti\u1EC3u, \u0111\u01B0a ki\u1EC1m chuy\u1EC3n h\xF3a v\u1EC1 b\xECnh th\u01B0\u1EDDng.",
        physiologicalInsight: "T\u1EA1i sao th\u1EADn kh\xF4ng t\u1EF1 \u0111\xE0o th\u1EA3i HCO3- d\u01B0 th\u1EEBa? V\xEC khi m\u1EA5t n\u01B0\u1EDBc v\xE0 gi\u1EA3m Clo tr\u1EA7m tr\u1ECDng, \u01B0u ti\xEAn s\u1ED1ng c\xF2n c\u1EE7a th\u1EADn l\xE0 gi\u1EEF Natri v\xE0 n\u01B0\u1EDBc. D\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a Aldosterone, Na+ \u0111\u01B0\u1EE3c gi\u1EEF l\u1EA1i \u1EDF \u1ED1ng th\u1EADn b\u1EB1ng c\xE1ch \u0111\xE0o th\u1EA3i K+ ho\u1EB7c H+. V\xEC K+ \u0111\xE3 b\u1ECB c\u1EA1n ki\u1EC7t, th\u1EADn b\u1EAFt bu\u1ED9c ph\u1EA3i th\u1EA3i H+ ra n\u01B0\u1EDBc ti\u1EC3u (ngh\u1ECBch l\xFD toan n\u01B0\u1EDBc ti\u1EC3u trong ki\u1EC1m m\xE1u), l\xE0m t\xECnh tr\u1EA1ng ki\u1EC1m chuy\u1EC3n h\xF3a c\xE0ng b\u1ECB duy tr\xEC!"
      }
    },
    {
      id: 27,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 27 (Hennessey)",
      title: "H\u1EB9p m\xF4n v\u1ECB ph\xEC \u0111\u1EA1i \u1EDF tr\u1EBB s\u01A1 sinh: Ki\u1EC1m chuy\u1EC3n h\xF3a n\u1EB7ng",
      patientProfile: "B\xE9 trai 8 tu\u1EA7n tu\u1ED5i, n\xF4n tr\u1EDB v\u1ECDt ra s\u1EEFa kh\xF4ng c\xF3 d\u1ECBch m\u1EADt, s\u1EDD th\u1EA5y kh\u1ED1i u m\xF4n v\u1ECB",
      categoryTag: "Nhi khoa / Ngo\u1EA1i khoa",
      difficulty: "N\xE2ng cao",
      history: "B\xE9 trai 8 tu\u1EA7n tu\u1ED5i, ti\u1EC1n s\u1EED sinh th\u01B0\u1EDDng \u0111\u1EE7 th\xE1ng. Hai tu\u1EA7n g\u1EA7n \u0111\xE2y n\xF4n tr\u1EDB v\u1ECDt sau m\u1ED7i b\u1EEFa b\xFA, s\u1EE5t c\xE2n nghi\xEAm tr\u1ECDng, kh\xF4ng s\u1ED1t, ph\xE2n \xEDt.",
      examination: {
        vitals: {
          pulse: "150 l\u1EA7n/ph\xFAt",
          rr: "24 l\u1EA7n/ph\xFAt",
          bp: "78/45 mmHg",
          temp: "36.8\xB0C",
          spo2: "99% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "Tr\u1EBB qu\u1EA5y kh\xF3c, suy dinh d\u01B0\u1EE1ng, m\u1EAFt tr\u0169ng, th\xF3p l\xF5m. S\u1EDD th\u1EA5y kh\u1ED1i tr\xF2n ch\u1EAFc k\xEDch th\u01B0\u1EDBc b\u1EB1ng qu\u1EA3 \xF4-liu \u1EDF v\xF9ng th\u01B0\u1EE3ng v\u1ECB."
      },
      abg: {
        unit: "kPa",
        pH: 7.54,
        pCO2: 6.1,
        // 45.8 mmHg
        pO2: 11.2,
        // 80.0 mmHg
        hco3: 37.5,
        be: 14,
        sao2: 99,
        fio2: 21,
        na: 135,
        k: 2.5,
        // Hạ kali máu nặng!
        cl: 86,
        // Hạ clo máu nặng!
        lactate: 1,
        glucose: 5.1,
        patientAge: 0.15
        // 8 tuần
      },
      questions: [
        "1. M\xF4 t\u1EA3 trao \u0111\u1ED5i kh\xED v\xE0 th\u0103ng b\u1EB1ng toan ki\u1EC1m?",
        "2. So v\u1EDBi m\u1EE9c \u0111\u1ED9 ki\u1EC1m m\xE1u n\u1EB7ng (pH 7.54, HCO3 37.5), PaCO2 45.8 mmHg l\xE0 cao hay th\u1EA5p h\u01A1n k\u1EF3 v\u1ECDng?",
        "3. Ch\u1EA9n \u0111o\xE1n v\xE0 nguy\xEAn t\u1EAFc \u0111i\u1EC1u tr\u1ECB ngo\u1EA1i khoa?"
      ],
      answers: {
        gasExchange: "Th\xF4ng kh\xED ph\u1EBF nang b\xF9 tr\u1EEB nh\u1EB9 (PaCO2 45.8 mmHg). Trao \u0111\u1ED5i kh\xED b\u1EA3o t\u1ED3n.",
        acidBase: "Ki\u1EC1m chuy\u1EC3n h\xF3a m\u1EA5t b\xF9 b\xE1n ph\u1EA7n m\u1EE9c \u0111\u1ED9 n\u1EB7ng (pH 7.54, HCO3- v\u1ECDt l\xEAn 37.5 mmol/L, BE +14 mmol/L).",
        differentialDiagnosis: "H\u1EB9p m\xF4n v\u1ECB ph\xEC \u0111\u1EA1i b\u1EA9m sinh (Infantile Hypertrophic Pyloric Stenosis).",
        clinicalAction: "PaCO2 45.8 mmHg l\xE0 TH\u1EA4P H\u01A0N K\u1EF2 V\u1ECCNG b\xF9 tr\u1EEB c\u1EE7a m\u1ED9t ca ki\u1EC1m m\xE1u n\u1EB7ng nh\u01B0 v\u1EADy! L\xFD do: Tr\u1EBB \u0111ang \u0111au \u0111\u1EDBn, m\u1EA5t n\u01B0\u1EDBc v\xE0 qu\u1EA5y kh\xF3c nhi\u1EC1u t\u1EA1o k\xEDch th\xEDch t\u0103ng th\xF4ng kh\xED ph\u1EA3n x\u1EA1, l\xE0m c\xF9n m\xF2n kh\u1EA3 n\u0103ng h\xE3m th\u1EDF gi\u1EEF CO2. NGUY\xCAN T\u1EAEC: TUY\u1EC6T \u0110\u1ED0I KH\xD4NG \u0110\u01AF\u1EE2C M\u1ED4 C\u1EA4P C\u1EE8U KHI CH\u01AFA HI\u1EC6U CH\u1EC8NH TOAN KI\u1EC0M! Tr\u1EBB s\u1EBD b\u1ECB ng\u01B0ng th\u1EDF sau m\u1ED5 d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a thu\u1ED1c m\xEA n\u1EBFu ki\u1EC1m m\xE1u c\xF2n n\u1EB7ng. Ph\u1EA3i nh\u1ECBn b\xFA, truy\u1EC1n d\u1ECBch NaCl 0.9% + Glucose 5% + KCl 20-30 mEq/L cho t\u1EDBi khi Clo > 100, K+ > 3.5 v\xE0 HCO3 < 30 mmol/L m\u1EDBi ti\u1EBFn h\xE0nh ph\u1EABu thu\u1EADt m\u1EDF c\u01A1 m\xF4n v\u1ECB Ramstedt.",
        physiologicalInsight: "V\xEC v\u1ECB tr\xED t\u1EAFc n\u1EB1m \u1EDF m\xF4n v\u1ECB (tr\u01B0\u1EDBc t\xE1 tr\xE0ng), ch\u1EA5t n\xF4n ch\u1EC9 ch\u1EE9a d\u1ECBch v\u1ECB d\u1EA1 d\xE0y gi\xE0u HCl, kh\xF4ng h\u1EC1 c\xF3 d\u1ECBch m\u1EADt t\u1EE5y gi\xE0u ki\u1EC1m HCO3-. To\xE0n b\u1ED9 ion H+ v\xE0 Cl- b\u1ECB t\u1ED1ng s\u1EA1ch ra ngo\xE0i t\u1EA1o n\xEAn b\u1EE9c tranh ki\u1EC1m h\u1EA1 clo kinh \u0111i\u1EC3n."
      }
    },
    {
      id: 29,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 29 (Hennessey)",
      title: "L\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch (VBG): C\u1EA1m b\u1EABy l\xE2m s\xE0ng th\u01B0\u1EDDng g\u1EB7p",
      patientProfile: "S\u1EA3n ph\u1EE5 36 tu\u1ED5i mang thai tu\u1EA7n 34, c\u1EA3m gi\xE1c kh\xF3 th\u1EDF c\u01A1 n\u0103ng, l\xE2m s\xE0ng ho\xE0n to\xE0n kh\u1ECFe m\u1EA1nh",
      categoryTag: "C\u1EA1m b\u1EABy l\xE2m s\xE0ng / VBG",
      difficulty: "C\u01A1 b\u1EA3n",
      history: "S\u1EA3n ph\u1EE5 36 tu\u1ED5i mang thai 34 tu\u1EA7n, than phi\u1EC1n h\u1EE5t h\u01A1i khi leo c\u1EA7u thang. B\xE1c s\u0129 n\u1ED9i tr\xFA l\u1EA5y kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch quay. K\u1EBFt qu\u1EA3 tr\u1EA3 v\u1EC1 khi\u1EBFn c\u1EA3 tua tr\u1EF1c ho\u1EA3ng h\u1ED1t: PaO2 ch\u1EC9 c\xF3 35 mmHg!",
      examination: {
        vitals: {
          pulse: "110 l\u1EA7n/ph\xFAt",
          rr: "20 l\u1EA7n/ph\xFAt",
          bp: "112/70 mmHg",
          temp: "36.6\xB0C",
          spo2: "99% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "S\u1EA3n ph\u1EE5 t\u1EC9nh t\xE1o, da d\u1EBB h\u1ED3ng h\xE0o, n\xF3i chuy\u1EC7n l\u01B0u lo\xE1t, kh\xF4ng c\xF3 b\u1EA5t k\u1EF3 d\u1EA5u hi\u1EC7u suy h\xF4 h\u1EA5p hay co k\xE9o c\u01A1 h\xF4 h\u1EA5p n\xE0o. Kh\xE1m ph\u1ED5i b\xECnh th\u01B0\u1EDDng."
      },
      abg: {
        unit: "kPa",
        pH: 7.45,
        pCO2: 4.9,
        // 37.0 mmHg
        pO2: 4.7,
        // 35.0 mmHg (Tụt dốc thê thảm!)
        hco3: 24,
        be: 2,
        sao2: 74,
        // SaO2 khí máu báo 74%!
        fio2: 21,
        na: 138,
        k: 3.6,
        cl: 104,
        lactate: 1,
        glucose: 5,
        patientAge: 36,
        isVenousSample: true
      },
      questions: [
        "1. K\u1EBFt qu\u1EA3 kh\xED m\xE1u th\u1EC3 hi\u1EC7n b\u1EC7nh l\xFD g\xEC tr\xEAn gi\u1EA5y?",
        "2. \u0110i\u1EC1u g\xEC b\u1EA5t th\u01B0\u1EDDng v\xE0 gi\u1EA3i th\xEDch h\u1EE3p l\xFD nh\u1EA5t cho s\u1EF1 m\xE2u thu\u1EABn n\xE0y?",
        "3. C\xE1c d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt l\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch l\xFAc \u0111\xE2m kim?"
      ],
      answers: {
        gasExchange: "Tr\xEAn gi\u1EA5y t\u1EDD: Th\u1EC3 hi\u1EC7n m\u1ED9t t\xECnh tr\u1EA1ng Suy h\xF4 h\u1EA5p Type 1 c\u1EF1c k\u1EF3 nguy k\u1ECBch (PaO2 35 mmHg, SaO2 74% - \u0111e d\u1ECDa ng\u1EEBng tim). Nh\u01B0ng l\xE2m s\xE0ng b\u1EC7nh nh\xE2n ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng!",
        acidBase: "Th\u0103ng b\u1EB1ng toan ki\u1EC1m b\xECnh th\u01B0\u1EDDng (pH 7.45, HCO3 24).",
        differentialDiagnosis: "M\u1EAAU M\xC1U \u0110\xC3 B\u1ECA CH\u1ECCC NH\u1EA6M V\xC0O T\u0128NH M\u1EA0CH (Venous Blood Gas - VBG) ch\u1EE9 kh\xF4ng ph\u1EA3i m\xE1u \u0111\u1ED9ng m\u1EA1ch!",
        clinicalAction: "KH\xD4NG \u0110\u01AF\u1EE2C HO\u1EA2NG LO\u1EA0N \u0110\u1EB6T N\u1ED8I KH\xCD QU\u1EA2N! S\u1EF1 ch\xEAnh l\u1EC7ch qu\xE1 l\u1EDBn gi\u1EEFa SpO2 m\xE1y k\u1EB9p (99%) v\xE0 SaO2 tr\xEAn m\xE1y kh\xED m\xE1u (74%) \u1EDF b\u1EC7nh nh\xE2n t\u1EC9nh t\xE1o h\u1ED3ng h\xE0o l\xE0 b\u1EB1ng ch\u1EE9ng r\xF5 nh\u1EA5t c\u1EE7a m\u1EABu m\xE1u t\u0129nh m\u1EA1ch. C\u1EA7n l\u1EA5y l\u1EA1i m\u1EABu kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch chu\u1EA9n x\xE1c.",
        physiologicalInsight: "C\xE1c d\u1EA5u hi\u1EC7u nh\u1EADn bi\u1EBFt l\u1EA5y nh\u1EA7m m\xE1u t\u0129nh m\u1EA1ch: 1. M\xE1u s\u1EABm m\xE0u, kh\xF4ng c\xF3 m\xE0u \u0111\u1ECF t\u01B0\u01A1i c\u1EE7a oxyhemoglobin; 2. M\xE1u kh\xF4ng t\u1EF1 \u0111\u1ED9ng \u0111\u1EA9y piston c\u1EE7a xi-lanh l\xEAn theo nh\u1ECBp \u0111\u1EADp m\u1EA1ch n\u1EA3y m\xE0 ng\u01B0\u1EDDi l\u1EA5y ph\u1EA3i k\xE9o piston h\xFAt ra; 3. SaO2 kh\xED m\xE1u th\u1EA5p xa so v\u1EDBi SpO2 ng\xF3n tay."
      }
    },
    {
      id: 30,
      source: "Hennessey & Japp (Made Easy)",
      caseNumberDisplay: "Ca 30 (Hennessey)",
      title: "Kh\xED m\xE1u b\xECnh th\u01B0\u1EDDng KH\xD4NG lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c thuy\xEAn t\u1EAFc ph\u1ED5i!",
      patientProfile: "N\u1EEF 55 tu\u1ED5i, ng\xE0y 4 sau thay kh\u1EDBp g\u1ED1i nh\xE2n t\u1EA1o, \u0111au ng\u1EF1c tr\xE1i \u0111\u1ED9t ng\u1ED9t k\xE8m th\u1EDF nhanh",
      categoryTag: "C\u1EA1m b\u1EABy l\xE2m s\xE0ng / PE",
      difficulty: "N\xE2ng cao",
      history: "N\u1EEF 55 tu\u1ED5i, sau ph\u1EABu thu\u1EADt thay kh\u1EDBp g\u1ED1i 4 ng\xE0y, n\u1EB1m b\u1EA5t \u0111\u1ED9ng t\u1EA1i gi\u01B0\u1EDDng. \u0110\u1ED9t ng\u1ED9t \u0111au ch\xF3i ng\u1EF1c tr\xE1i ki\u1EC3u m\xE0ng ph\u1ED5i, h\u1EE5t h\u01A1i v\xE0 h\u1ED3i h\u1ED9p tim \u0111\u1EADp nhanh.",
      examination: {
        vitals: {
          pulse: "98 l\u1EA7n/ph\xFAt (nhanh xoang)",
          rr: "20 l\u1EA7n/ph\xFAt",
          bp: "160/100 mmHg",
          temp: "36.6\xB0C",
          spo2: "99% (kh\xED tr\u1EDDi)",
          fio2: "21%"
        },
        findings: "Kh\xF4ng s\u1ED1t, kh\xE1m tim ph\u1ED5i kh\xF4ng ph\xE1t hi\u1EC7n b\u1EA5t th\u01B0\u1EDDng. X-quang ng\u1EF1c th\u1EB3ng b\xECnh th\u01B0\u1EDDng, ECG ch\u1EC9 c\xF3 nh\u1ECBp nhanh xoang."
      },
      abg: {
        unit: "kPa",
        pH: 7.43,
        pCO2: 4.9,
        // 37.0 mmHg
        pO2: 12.1,
        // 91.0 mmHg
        hco3: 25.8,
        be: -1.8,
        sao2: 99,
        fio2: 21,
        na: 136,
        k: 3.8,
        cl: 99,
        lactate: 1,
        glucose: 5,
        patientAge: 55
      },
      questions: [
        "1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED v\xE0 toan ki\u1EC1m?",
        "2. T\xEDnh A-a gradient?",
        "3. Kh\xED m\xE1u ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng n\xE0y c\xF3 lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c thuy\xEAn t\u1EAFc ph\u1ED5i kh\xF4ng? C\u1EA7n l\xE0m g\xEC ti\u1EBFp theo?"
      ],
      answers: {
        gasExchange: "Trao \u0111\u1ED5i kh\xED ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (PaO2 91 mmHg / 12.1 kPa, PaCO2 37 mmHg).",
        acidBase: "Th\u0103ng b\u1EB1ng toan ki\u1EC1m b\xECnh th\u01B0\u1EDDng (pH 7.43, HCO3 25.8).",
        differentialDiagnosis: "Thuy\xEAn t\u1EAFc \u0111\u1ED9ng m\u1EA1ch ph\u1ED5i c\u1EA5p t\xEDnh (Pulmonary Embolism) nh\xE1nh nh\u1ECF/v\u1EEBa.",
        clinicalAction: "A-a gradient = 15 mmHg (1.9 kPa) ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng (< 20 mmHg). Tuy nhi\xEAn: KH\xCD M\xC1U \u0110\u1ED8NG M\u1EA0CH B\xCCNH TH\u01AF\u1EDCNG HO\xC0N TO\xC0N KH\xD4NG LO\u1EA0I TR\u1EEA \u0110\u01AF\u1EE2C THUY\xCAN T\u1EAEC PH\u1ED4I! C\xF3 t\u1EDBi 15-20% b\u1EC7nh nh\xE2n thuy\xEAn t\u1EAFc ph\u1ED5i c\xF3 PaO2 v\xE0 A-a gradient ho\xE0n to\xE0n trong gi\u1EDBi h\u1EA1n b\xECnh th\u01B0\u1EDDng. B\u1EC7nh nh\xE2n c\xF3 nguy c\u01A1 cao (sau m\u1ED5 kh\u1EDBp g\u1ED1i b\u1EA5t \u0111\u1ED9ng, \u0111au ng\u1EF1c m\xE0ng ph\u1ED5i c\u1EA5p, nh\u1ECBp nhanh), B\u1EAET BU\u1ED8C ch\u1EE5p CT m\u1EA1ch m\xE1u ph\u1ED5i (CTPA) ho\u1EB7c x\u1EA1 h\xECnh V/Q scan ngay l\u1EADp t\u1EE9c.",
        physiologicalInsight: 'Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch l\xE0 c\xF4ng c\u1EE5 h\u1ED7 tr\u1EE3 \u0111\xE1nh gi\xE1 sinh l\xFD, kh\xF4ng ph\u1EA3i c\xF4ng c\u1EE5 ch\u1EA9n \u0111o\xE1n h\xECnh \u1EA3nh. \u0110\u1EEBng bao gi\u1EDD \u0111\u1EC3 m\u1ED9t k\u1EBFt qu\u1EA3 kh\xED m\xE1u "\u0111\u1EB9p nh\u01B0 tranh" l\xE0m m\u1EDD m\u1EAFt tr\u01B0\u1EDBc m\u1ED9t b\u1EC7nh c\u1EA3nh l\xE2m s\xE0ng nguy hi\u1EC3m!'
      }
    },
    {
      id: 31,
      source: "Pierre & Ranson (Case Study)",
      caseNumberDisplay: "Ca 3.1 (Pierre & Ranson)",
      title: "H\xF4n m\xEA ng\u01B0ng th\u1EDF do b\u01A1m Morphin gi\u1EA3m \u0111au PCA",
      patientProfile: "N\u1EEF 38 tu\u1ED5i, sau c\u1EAFt t\u1EED cung to\xE0n ph\u1EA7n do u x\u01A1, b\u1EA5m m\xE1y gi\u1EA3m \u0111au morphin PCA li\xEAn t\u1EE5c",
      categoryTag: "Suy h\xF4 h\u1EA5p Type 2",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "N\u1EEF 38 tu\u1ED5i sau m\u1ED5 c\u1EAFt t\u1EED cung ng\u1EA3 b\u1EE5ng, than \u0111au nhi\u1EC1u n\xEAn \u0111\u01B0\u1EE3c cho d\xF9ng m\xE1y gi\u1EA3m \u0111au t\u1EF1 ki\u1EC3m so\xE1t (PCA Morphin). M\u1ED9t gi\u1EDD sau, ng\u01B0\u1EDDi ch\u1ED3ng h\u1ED1t ho\u1EA3ng g\u1ECDi v\xEC th\u1EA5y v\u1EE3 ng\u01B0ng th\u1EDF v\xE0 kh\xF4ng tr\u1EA3 l\u1EDDi.",
      examination: {
        vitals: {
          pulse: "102 l\u1EA7n/ph\xFAt",
          rr: "5 l\u1EA7n/ph\xFAt (ng\xE1y to, t\u1EAFc ngh\u1EBDn)",
          bp: "88/42 mmHg",
          temp: "36.6\xB0C",
          spo2: "99% (\u0111ang th\u1EDF oxy g\u1ECDng m\u0169i 2L)",
          fio2: "28%"
        },
        findings: "H\xF4n m\xEA kh\xF4ng \u0111\xE1p \u1EE9ng AVPU = U (Unresponsive). \u0110\u1ED3ng t\u1EED co nh\u1ECF nh\u01B0 \u0111inh ghim. \u0110\u01B0\u1EDDng th\u1EDF ng\xE1y to do t\u1EE5t l\u01B0\u1EE1i."
      },
      abg: {
        unit: "kPa",
        pH: 7.25,
        pCO2: 8.2,
        // 61.5 mmHg
        pO2: 12,
        // 90.0 mmHg
        hco3: 21,
        be: -2,
        sao2: 99,
        fio2: 28,
        na: 138,
        k: 4,
        cl: 102,
        lactate: 1.1,
        glucose: 5.5,
        patientAge: 38
      },
      questions: [
        "1. \u0110\xE1nh gi\xE1 kh\xED m\xE1u theo quy tr\xECnh 6 b\u01B0\u1EDBc chu\u1EA9n?",
        "2. Ti\u1EBFp c\u1EADn ABCDE v\xE0 bi\u1EC7n ph\xE1p c\u1EA5p c\u1EE9u?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 c\u1EA5p t\xEDnh (\u1EE9 tr\u1EC7 CO2 nghi\xEAm tr\u1ECDng PaCO2 61.5 mmHg).",
        acidBase: "Toan h\xF4 h\u1EA5p c\u1EA5p ch\u01B0a b\xF9 tr\u1EEB (pH 7.25 t\u1EE5t s\xE2u, HCO3- 21 mmol/L).",
        differentialDiagnosis: "Ng\u1ED9 \u0111\u1ED9c Morphin h\u1EADu ph\u1EABu g\xE2y \u1EE9c ch\u1EBF h\xF4 h\u1EA5p v\xE0 t\u1EE5t huy\u1EBFt \xE1p.",
        clinicalAction: "Theo ph\xE1c \u0111\u1ED3 ABCDE: A (Airway): \u0110\u1EB7t canule h\u1ECDng mi\u1EC7ng (Guedel) ngay v\xEC t\u1EE5t l\u01B0\u1EE1i t\u1EAFc ngh\u1EBDn; B (Breathing): B\xF3p b\xF3ng Ambu gi\xE0u oxy; C (Circulation): T\u1EE5t HA do morphin gi\u1EA3i ph\xF3ng histamine, truy\u1EC1n d\u1ECBch Hartman; D (Disability): Ti\xEAm t\u0129nh m\u1EA1ch NALOXONE \u0111\u1ED1i kh\xE1ng Opiate; E (Exposure): Ki\u1EC3m tra v\u1EBFt m\u1ED5. Chuy\u1EC3n ICU theo d\xF5i.",
        physiologicalInsight: "S\u1EF1 ph\u1ED1i h\u1EE3p 6 b\u01B0\u1EDBc ti\u1EBFp c\u1EADn c\u1EE7a Pierre & Ranson gi\xFAp nh\u1EADn di\u1EC7n ngay t\u1ED5n th\u01B0\u01A1ng h\xF4 h\u1EA5p nguy\xEAn ph\xE1t khi pH v\xE0 PaCO2 bi\u1EBFn thi\xEAn ng\u01B0\u1EE3c chi\u1EC1u nhau."
      }
    },
    {
      id: 34,
      source: "Pierre & Ranson (Case Study)",
      caseNumberDisplay: "Ca 7.5 (Pierre & Ranson)",
      title: "Toan h\u1ED7n h\u1EE3p c\u1EF1c n\u1EB7ng do v\xF9i l\u1EA5p ch\u1EA5n th\u01B0\u01A1ng ho\u1EA1i t\u1EED chi",
      patientProfile: "N\u1EEF m\u1EA5t t\xEDch 3 ng\xE0y, t\xECm th\u1EA5y b\u1EA5t t\u1EC9nh sau ng\xE3, g\xE3y h\u1EDF c\u1ED5 ch\xE2n ho\u1EA1i t\u1EED thi\u1EBFu m\xE1u",
      categoryTag: "R\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p",
      difficulty: "C\u1EA5p c\u1EE9u",
      history: "B\u1EC7nh nh\xE2n m\u1EA5t t\xEDch 3 ng\xE0y, \u0111\u01B0\u1EE3c ph\xE1t hi\u1EC7n h\xF4n m\xEA t\u1EA1i hi\u1EC7n tr\u01B0\u1EDDng sau tai n\u1EA1n ng\xE3 v\xF9i l\u1EA5p. B\u1EC7nh nh\xE2n \u0111\u01B0\u1EE3c \u0111\u1EB7t n\u1ED9i kh\xED qu\u1EA3n t\u1EA1i hi\u1EC7n tr\u01B0\u1EDDng v\xE0 \u0111\u01B0a th\u1EB3ng v\xE0o ph\xF2ng m\u1ED5 v\xEC b\xE0n ch\xE2n g\xE3y h\u1EDF ho\u1EA1i t\u1EED \u0111en.",
      examination: {
        vitals: {
          pulse: "135 l\u1EA7n/ph\xFAt",
          rr: "12 l\u1EA7n/ph\xFAt (th\u1EDF m\xE1y)",
          bp: "80/50 mmHg",
          temp: "35.0\xB0C",
          spo2: "99% (th\u1EDF oxy 100%)",
          fio2: "100%"
        },
        findings: "H\xF4n m\xEA s\xE2u, h\u1EA1 th\xE2n nhi\u1EC7t. B\xE0n ch\xE2n tr\xE1i t\xEDm \u0111en l\u1EA1nh ng\u1EAFt, s\u01B0ng n\u1EC1 ho\u1EA1i t\u1EED do ch\xE8n \xE9p thi\u1EBFu m\xE1u k\xE9o d\xE0i."
      },
      abg: {
        unit: "kPa",
        pH: 6.9,
        pCO2: 13.2,
        // 99.0 mmHg (Tăng khủng khiếp!)
        pO2: 15,
        // 112.5 mmHg
        hco3: 14,
        be: -7,
        sao2: 99,
        fio2: 100,
        na: 140,
        k: 6.5,
        // Tăng kali máu nguy hiểm do tiêu cơ!
        cl: 98,
        lactate: 8,
        glucose: 7,
        patientAge: 45
      },
      questions: [
        "1. Nh\u1EADn di\u1EC7n d\u1EA1ng r\u1ED1i lo\u1EA1n th\u0103ng b\u1EB1ng ki\u1EC1m toan?",
        "2. Nh\u1EEFng nguy\xEAn nh\xE2n n\xE0o c\xF9ng th\xFAc \u0111\u1EA9y toan m\xE1u \u1EDF ca n\xE0y?"
      ],
      answers: {
        gasExchange: "Suy h\xF4 h\u1EA5p Type 2 m\u1EE9c \u0111\u1ED9 c\u1EF1c k\u1EF3 nghi\xEAm tr\u1ECDng (PaCO2 99 mmHg) do th\xF4ng kh\xED nh\xE2n t\u1EA1o ch\u01B0a \u0111\u1EE7 th\u1EC3 t\xEDch ph\xFAt.",
        acidBase: "TOAN H\u1ED6N H\u1EE2P NGUY K\u1ECACH (Combined / Mixed Acidosis): Toan h\xF4 h\u1EA5p r\u1EA5t n\u1EB7ng (PaCO2 99 mmHg) K\u1EBET H\u1EE2P Toan chuy\u1EC3n h\xF3a r\u1EA5t n\u1EB7ng (HCO3 14 mmol/L, Lactate 8 mmol/L). pH 6.90 l\xE0 m\u1EE9c \u0111e d\u1ECDa t\u1EED vong t\u1EE9c th\xEC!",
        differentialDiagnosis: "H\u1ED9i ch\u1EE9ng v\xF9i l\u1EA5p (Crush syndrome) ho\u1EA1i t\u1EED chi g\xE2y toan lactic v\xE0 ti\xEAu c\u01A1 v\xE2n + Suy th\xF4ng kh\xED ph\u1EBF nang c\u1EA5p t\xEDnh.",
        clinicalAction: "1. T\u0103ng ngay th\u1EC3 t\xEDch ph\xFAt m\xE1y th\u1EDF (t\u0103ng t\u1EA7n s\u1ED1 v\xE0 th\u1EC3 t\xEDch l\u01B0u th\xF4ng Vt) \u0111\u1EC3 \u0111\xE0o th\u1EA3i CO2 h\u1EA1 PaCO2; 2. H\u1ED3i s\u1EE9c s\u1ED1c d\u1ECBch tinh th\u1EC3 t\xEDch c\u1EF1c; 3. C\u1EA5p c\u1EE9u t\u0103ng Kali m\xE1u (K+ 6.5 mmol/L) b\u1EB1ng Canxi clorid/gluconate ti\xEAm TM b\u1EA3o v\u1EC7 tim, truy\u1EC1n Glucose + Insulin; 4. Ph\u1EABu thu\u1EADt c\u1EAFt l\u1ECDc ho\u1EA1i t\u1EED kh\u1EA9n c\u1EA5p ho\u1EB7c c\u1EAFt c\u1EE5t chi; 5. L\u1ECDc m\xE1u li\xEAn t\u1EE5c (CRRT).",
        physiologicalInsight: "Khi c\u1EA3 h\u1EC7 h\xF4 h\u1EA5p (\u1EE9 CO2) v\xE0 h\u1EC7 chuy\u1EC3n h\xF3a (toan lactic v\xE0 acid v\xF4 c\u01A1) c\xF9ng \u0111\u1ED5 d\u1ED3n acid v\xE0o m\xE1u m\xE0 kh\xF4ng c\xF3 h\u1EC7 c\u01A1 quan n\xE0o b\xF9 tr\u1EEB, pH m\xE1u s\u1EBD s\u1EE5p \u0111\u1ED5 d\u01B0\u1EDBi 7.0, l\xE0m t\xEA li\u1EC7t c\xE1c enzym t\u1EBF b\xE0o v\xE0 ng\u1EEBng co b\xF3p c\u01A1 tim."
      }
    }
  ];

  // src/content/knowledge-vault/cdss/abg/abg-protocols.ts
  var CLINICAL_PROTOCOLS = [
    {
      id: "type1-failure",
      title: "X\u1EED tr\xED Suy h\xF4 h\u1EA5p Type 1 (Gi\u1EA3m oxy m\xE1u)",
      subtitle: "Defective Oxygenation with Normal or Low PaCO2",
      category: "H\xF4 h\u1EA5p",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      summary: "\u0110\u1EB7c tr\u01B0ng b\u1EDFi PaO2 gi\u1EA3m (< 60 mmHg hay < 8 kPa) trong khi PaCO2 b\xECnh th\u01B0\u1EDDng ho\u1EB7c gi\u1EA3m do th\u1EDF nhanh ph\u1EA3n x\u1EA1. C\u01A1 ch\u1EBF ch\u1EE7 y\u1EBFu l\xE0 b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng th\xF4ng kh\xED/t\u01B0\u1EDBi m\xE1u (V/Q mismatch) ho\u1EB7c Shunt trong ph\u1ED5i.",
      pathophysiology: "Ph\u1EBF nang b\u1ECB \u0111\xF4ng \u0111\u1EB7c (vi\xEAm ph\u1ED5i), x\u1EB9p ph\u1ED5i, ng\u1EADp d\u1ECBch (ph\xF9 ph\u1ED5i c\u1EA5p, ARDS) ho\u1EB7c t\u1EAFc m\u1EA1ch (thuy\xEAn t\u1EAFc ph\u1ED5i). M\xE1u \u0111i qua c\xE1c v\xF9ng n\xE0y kh\xF4ng nh\u1EADn \u0111\u01B0\u1EE3c oxy nh\u01B0ng v\xF9ng ph\u1EBF nang l\xE0nh t\u0103ng th\xF4ng kh\xED c\xF3 th\u1EC3 \u0111\xE0o th\u1EA3i \u0111\u01B0\u1EE3c CO2, do \u0111\xF3 PaCO2 kh\xF4ng t\u0103ng.",
      diagnosticCriteria: [
        "PaO2 < 60 mmHg (< 8 kPa) ho\u1EB7c SaO2 < 90% tr\xEAn kh\xED tr\u1EDDi",
        "PaCO2 b\xECnh th\u01B0\u1EDDng (35 - 45 mmHg) ho\u1EB7c gi\u1EA3m (< 35 mmHg)",
        "A-a gradient t\u0103ng cao (> 20 mmHg ho\u1EB7c > 2.6 kPa)",
        "T\u1EC9 l\u1EC7 P/F < 300 (ARDS: Nh\u1EB9 200-300, V\u1EEBa 100-200, N\u1EB7ng < 100)"
      ],
      treatmentSteps: [
        {
          title: "1. Li\u1EC7u ph\xE1p Oxy theo b\u1EADc thang (Escalating Oxygen Therapy)",
          description: "B\u1EADc 1: G\u1ECDng k\xEDnh m\u0169i (Nasal prongs) 1 - 6 L/ph\xFAt (FiO2 24 - 44%). B\u1EADc 2: Mask m\u1EB7t \u0111\u01A1n gi\u1EA3n 6 - 10 L/ph\xFAt (FiO2 35 - 50%). B\u1EADc 3: Mask c\xF3 t\xFAi d\u1EF1 tr\u1EEF kh\xF4ng th\u1EDF l\u1EA1i (NRB mask) 10 - 15 L/ph\xFAt (FiO2 60 - 90%). B\u1EADc 4: Oxy d\xF2ng cao qua canule m\u0169i (HFNC) v\u1EDBi l\u01B0u l\u01B0\u1EE3ng t\u1EDBi 60 L/ph\xFAt v\xE0 FiO2 100%. M\u1EE5c ti\xEAu SpO2: 94 - 98%.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "2. Th\xF4ng kh\xED \xE1p l\u1EF1c d\u01B0\u01A1ng (CPAP / NIV)",
          description: "Ch\u1EC9 \u0111\u1ECBnh s\u1EDBm trong Ph\xF9 ph\u1ED5i c\u1EA5p huy\u1EBFt \u0111\u1ED9ng ho\u1EB7c ARDS nh\u1EB9-v\u1EEBa \u0111\u1EC3 m\u1EDF c\xE1c ph\u1EBF nang b\u1ECB x\u1EB9p (recruitment), gi\u1EA3m shunt ph\u1ED5i v\xE0 gi\u1EA3m c\xF4ng th\u1EDF cho b\u1EC7nh nh\xE2n.",
          priority: "Quan tr\u1ECDng"
        },
        {
          title: "3. \u0110i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n g\u1ED1c r\u1EC5",
          description: "Kh\xE1ng sinh s\u1EDBm n\u1EBFu vi\xEAm ph\u1ED5i; Ch\u1ED1ng \u0111\xF4ng n\u1EBFu thuy\xEAn t\u1EAFc ph\u1ED5i; L\u1EE3i ti\u1EC3u quai + gi\xE3n m\u1EA1ch n\u1EBFu ph\xF9 ph\u1ED5i c\u1EA5p do suy tim; D\u1EABn l\u01B0u ng\u1EF1c n\u1EBFu tr\xE0n kh\xED/tr\xE0n d\u1ECBch m\xE0ng ph\u1ED5i.",
          priority: "Quan tr\u1ECDng"
        },
        {
          title: "4. Gi\xE1m s\xE1t kh\xF4ng x\xE2m l\u1EA5n b\u1EB1ng Pulse Oximetry",
          description: "V\xEC PaCO2 b\xECnh th\u01B0\u1EDDng v\xE0 kh\xF4ng c\xF3 nguy c\u01A1 \u1EE9 th\xE1n kh\xED, m\xE1y k\u1EB9p SpO2 ng\xF3n tay l\xE0 ph\u01B0\u01A1ng ti\u1EC7n theo d\xF5i ti\u1EBFn tri\u1EC3n c\u1EF1c k\u1EF3 chu\u1EA9n x\xE1c v\xE0 ti\u1EC7n l\u1EE3i, h\u1EA1n ch\u1EBF ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch l\u1EB7p l\u1EA1i.",
          priority: "Duy tr\xEC"
        }
      ],
      pitfallsAndWarnings: [
        "Khi PaO2 r\u01A1i xu\u1ED1ng d\u01B0\u1EDBi 60 mmHg (8 kPa), b\u1EC7nh nh\xE2n b\u01B0\u1EDBc v\xE0o \u0110O\u1EA0N D\u1ED0C c\u1EE7a \u0111\u01B0\u1EDDng cong Oxyhemoglobin: ch\u1EC9 c\u1EA7n PaO2 gi\u1EA3m th\xEAm m\u1ED9t ch\xFAt x\xEDu l\xE0 SaO2 s\u1EBD t\u1EE5t d\u1ED1c th\u1EA3m h\u1EA1i g\xE2y thi\u1EBFu oxy m\xF4 c\u1EA5p!",
        "N\u1EBFu b\u1EC7nh nh\xE2n th\u1EDF nhanh k\xE9o d\xE0i m\xE0 kh\xF4ng c\u1EA3i thi\u1EC7n, c\u01A1 h\xF4 h\u1EA5p s\u1EBD b\u1ECB ki\u1EC7t s\u1EE9c (Exhaustion), chuy\u1EC3n bi\u1EBFn \u0111\u1ED9t ng\u1ED9t th\xE0nh Suy h\xF4 h\u1EA5p Type 2 v\u1EDBi PaCO2 t\u0103ng v\u1ECDt."
      ],
      sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.3, tr. 20-21; Ch\u01B0\u01A1ng 1.6-1.7, tr. 54-55)"
    },
    {
      id: "type2-copd",
      title: "X\u1EED tr\xED \u0110\u1EE3t c\u1EA5p COPD & Suy h\xF4 h\u1EA5p Type 2 (T\u0103ng CO2 m\xE1u)",
      subtitle: 'Alveolar Hypoventilation & The "Hypoxic Drive" Caution',
      category: "H\xF4 h\u1EA5p",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      summary: "Suy gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang d\u1EABn t\u1EDBi t\xEDch t\u1EE5 acid bay h\u01A1i (CO2). C\u1EA7n ph\xE2n bi\u1EC7t r\xF5: \u0110\u1EE3t c\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n t\xEDnh (c\xF3 t\u0103ng HCO3- t\u1EEB tr\u01B0\u1EDBc) v\u1EDBi C\u1EA5p t\xEDnh \u0111\u01A1n thu\u1EA7n (ng\u1ED9 \u0111\u1ED9c thu\u1ED1c, nh\u01B0\u1EE3c c\u01A1).",
      pathophysiology: "\u1EDE b\u1EC7nh nh\xE2n COPD t\u0103ng CO2 m\u1EA1n t\xEDnh, th\u1EE5 th\u1EC3 trung \u01B0\u01A1ng sensing CO2 b\u1ECB tr\u01A1 h\xF3a. Trung t\xE2m h\xF4 h\u1EA5p duy tr\xEC nh\u1ECBp th\u1EDF nh\u1EDD th\u1EE5 th\u1EC3 xoang c\u1EA3nh c\u1EA3m nh\u1EADn PaO2 th\u1EA5p (Hypoxic drive). Th\u1EDF oxy li\u1EC1u cao b\u1EEBa b\xE3i s\u1EBD l\xE0m m\u1EA5t k\xEDch th\xEDch n\xE0y, g\xE2y gi\u1EA3m th\xF4ng kh\xED v\xE0 h\xF4n m\xEA t\u0103ng CO2 m\xE1u (CO2 Narcosis).",
      diagnosticCriteria: [
        "PaCO2 > 45 mmHg (> 6.0 kPa)",
        "Toan h\xF4 h\u1EA5p c\u1EA5p: pH < 7.35 v\xE0 HCO3- b\xECnh th\u01B0\u1EDDng (ch\u01B0a k\u1ECBp b\xF9)",
        "Toan h\xF4 h\u1EA5p m\u1EA1n: pH 7.35 - 7.40 v\xE0 HCO3- > 28 mmol/L (th\u1EADn \u0111\xE3 b\xF9)",
        "C\u1EA5p tr\xEAn n\u1EC1n m\u1EA1n: pH < 7.35 d\xF9 HCO3- \u0111\xE3 t\u0103ng cao t\u1EEB tr\u01B0\u1EDBc"
      ],
      treatmentSteps: [
        {
          title: "1. Li\u1EC7u ph\xE1p Oxy Ki\u1EC3m so\xE1t ch\u1EB7t ch\u1EBD (Controlled Oxygen Therapy)",
          description: "S\u1EED d\u1EE5ng Mask Venturi c\u1ED1 \u0111\u1ECBnh n\u1ED3ng \u0111\u1ED9 24% ho\u1EB7c 28% (ho\u1EB7c g\u1ECDng m\u0169i 1 - 2 L/ph\xFAt). M\u1EE4C TI\xCAU SpO2 NGHI\xCAM NG\u1EB6T: 88% - 92%. TUY\u1EC6T \u0110\u1ED0I KH\xD4NG d\xF9ng mask t\xFAi 100% tr\u1EEB khi c\xF3 ng\u1EEBng tim!",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "2. Th\xF4ng kh\xED c\u01A1 h\u1ECDc kh\xF4ng x\xE2m nh\u1EADp (BiPAP / NIV)",
          description: "CH\u1EC8 \u0110\u1ECANH V\xC0NG: \u0110\u1EE3t c\u1EA5p COPD c\xF3 toan h\xF4 h\u1EA5p (pH 7.25 - 7.35, PaCO2 > 45 mmHg) c\xF2n t\u1EC9nh h\u1EE3p t\xE1c. B\u1EAFt \u0111\u1EA7u IPAP 10-12 cmH2O, EPAP 4-5 cmH2O, n\xE2ng d\u1EA7n \u0111\u1EC3 h\u1EA1 PaCO2 v\xE0 n\xE2ng pH.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "3. Kh\xED dung gi\xE3n ph\u1EBF qu\u1EA3n & Corticosteroid to\xE0n th\xE2n",
          description: "Salbutamol 2.5 - 5mg + Ipratropium 0.5mg kh\xED dung l\u1EB7p l\u1EA1i. Methylprednisolone 40mg IV ho\u1EB7c Prednisolone 30-40mg u\u1ED1ng 5 ng\xE0y. Kh\xE1ng sinh n\u1EBFu \u0111\u1EDDm m\u1EE7.",
          priority: "Quan tr\u1ECDng"
        },
        {
          title: "4. \u0110\u1EB7t n\u1ED9i kh\xED qu\u1EA3n v\xE0 th\u1EDF m\xE1y x\xE2m nh\u1EADp",
          description: "Ch\u1EC9 \u0111\u1ECBnh khi toan m\xE1u n\u1EB7ng (pH < 7.25), h\xF4n m\xEA li b\xEC, ng\u1EEBng th\u1EDF ho\u1EB7c th\u1EA5t b\u1EA1i v\u1EDBi NIV sau 1 - 2 gi\u1EDD.",
          priority: "Kh\u1EA9n c\u1EA5p"
        }
      ],
      pitfallsAndWarnings: [
        "C\u1EA2NH B\xC1O B\u1ECE OXY: N\u1EBFu b\u1EC7nh nh\xE2n COPD c\xF3 PaCO2 t\u0103ng l\xEAn sau th\u1EDF oxy, KH\xD4NG \u0110\u01AF\u1EE2C ng\u1EAFt h\u1EB3n oxy m\xE0 ph\u1EA3i gi\u1EA3m n\u1ED3ng \u0111\u1ED9 oxy v\xE0 \u0111\u1EB7t m\xE1y th\u1EDF BiPAP ngay! Ng\u1EAFt oxy s\u1EBD g\xE2y t\u1EE5t PaO2 ch\u1EBFt n\xE3o t\u1EE9c th\xEC.",
        "Pulse oximetry KH\xD4NG \u0110O \u0110\u01AF\u1EE2C PaCO2. M\u1ED9t b\u1EC7nh nh\xE2n c\xF3 SpO2 96% v\u1EABn c\xF3 th\u1EC3 \u0111ang b\u1ECB toan h\xF4 h\u1EA5p ch\u1EBFt ng\u01B0\u1EDDi (xem Ca 10)."
      ],
      sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.2, tr. 7; Ch\u01B0\u01A1ng 1.3, tr. 22-23; Ca 5, 6, 9, 10)"
    },
    {
      id: "dka-protocol",
      title: "Ph\xE1c \u0111\u1ED3 X\u1EED tr\xED Nhi\u1EC5m toan Ceton \u0110T\u0110 (DKA)",
      subtitle: "Triad of Hyperglycaemia, Ketosis & High Anion Gap Acidosis",
      category: "Toan chuy\u1EC3n h\xF3a",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      summary: "Bi\u1EBFn ch\u1EE9ng c\u1EA5p t\xEDnh \u0111e d\u1ECDa t\xEDnh m\u1EA1ng do thi\u1EBFu h\u1EE5t insulin tuy\u1EC7t \u0111\u1ED1i. G\xE2y toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap r\u1EA5t n\u1EB7ng, m\u1EA5t n\u01B0\u1EDBc s\xE2u do l\u1EE3i ni\u1EC7u th\u1EA9m th\u1EA5u v\xE0 r\u1ED1i lo\u1EA1n \u0111i\u1EC7n gi\u1EA3i.",
      pathophysiology: "Thi\u1EBFu insulin l\xE0m t\u1EBF b\xE0o kh\xF4ng d\xF9ng \u0111\u01B0\u1EE3c glucose, c\u01A1 th\u1EC3 t\u0103ng d\u1ECB h\xF3a m\u1EE1 gi\u1EA3i ph\xF3ng acid b\xE9o t\u1EF1 do. Gan chuy\u1EC3n h\xF3a acid b\xE9o th\xE0nh th\u1EC3 ceton (Acetoacetate, Beta-hydroxybutyrate) l\xE0m c\u1EA1n ki\u1EC7t d\u1EF1 tr\u1EEF Bicarbonate m\xE1u.",
      diagnosticCriteria: [
        "Toan m\xE1u: pH < 7.30 ho\u1EB7c HCO3- < 15 mmol/L (N\u1EB7ng: pH < 7.1 ho\u1EB7c HCO3- < 5 mmol/L)",
        "T\u0103ng ceton m\xE1u (> 3 mmol/L) ho\u1EB7c ceton n\u01B0\u1EDBc ti\u1EC3u (>= 2+)",
        "\u0110\u01B0\u1EDDng huy\u1EBFt t\u01B0\u01A1ng > 11 mmol/L (> 200 mg/dL) ho\u1EB7c ti\u1EC1n s\u1EED \u0110T\u0110",
        "Kho\u1EA3ng tr\u1ED1ng Anion (Anion Gap) > 16 mmol/L"
      ],
      treatmentSteps: [
        {
          title: "1. B\xF9 d\u1ECBch t\xEDch c\u1EF1c (Fluid Resuscitation)",
          description: "Gi\u1EDD \u0111\u1EA7u ti\xEAn: Truy\u1EC1n 1000 mL NaCl 0.9% t\u0129nh m\u1EA1ch. Gi\u1EDD 2-4: 500 - 1000 mL/h t\xF9y t\xECnh tr\u1EA1ng huy\u1EBFt \u0111\u1ED9ng. T\u1ED5ng l\u01B0\u1EE3ng d\u1ECBch thi\u1EBFu h\u1EE5t th\u01B0\u1EDDng t\u1EEB 5 - 8 l\xEDt.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "2. B\xF9 Kali m\xE1u TR\u01AF\u1EDAC HO\u1EB6C \u0110\u1ED2NG TH\u1EDCI v\u1EDBi Insulin",
          description: "N\u1EBFu K+ < 3.5 mmol/L: TR\xCC HO\xC3N INSULIN, truy\u1EC1n b\xF9 Kali 20 - 40 mEq/h cho t\u1EDBi khi K+ > 3.5. N\u1EBFu K+ 3.5 - 5.5: Pha 20 - 30 mEq Kali v\xE0o m\u1ED7i l\xEDt d\u1ECBch truy\u1EC1n. N\u1EBFu K+ > 5.5: Ch\u01B0a b\xF9 Kali, x\xE9t nghi\u1EC7m l\u1EA1i m\u1ED7i 2 gi\u1EDD.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "3. Truy\u1EC1n Insulin t\xE1c d\u1EE5ng ng\u1EAFn t\u0129nh m\u1EA1ch li\xEAn t\u1EE5c",
          description: "Li\u1EC1u 0.1 UI/kg/gi\u1EDD t\u0129nh m\u1EA1ch (Regular Insulin). M\u1EE5c ti\xEAu h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt 3 - 4 mmol/L/gi\u1EDD (50 - 75 mg/dL/h). Khi \u0111\u01B0\u1EDDng huy\u1EBFt xu\u1ED1ng < 14 mmol/L (250 mg/dL), PH\u1EA2I \u0110\u1ED4I sang d\u1ECBch truy\u1EC1n Glucose 5% + NaCl 0.45% \u0111\u1EC3 ti\u1EBFp t\u1EE5c duy tr\xEC insulin d\u1EADp ceton m\xE0 kh\xF4ng g\xE2y h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "4. Th\u1EADn tr\u1ECDng v\u1EDBi Bicarbonate",
          description: "CH\u1EC8 XEM X\xC9T D\xD9NG BICARBONATE khi pH < 6.90. Pha 100 mmol NaHCO3 v\xE0o 400 mL n\u01B0\u1EDBc c\u1EA5t + 20 mEq KCl truy\u1EC1n trong 2 gi\u1EDD. D\xF9ng bicarb kh\xF4ng \u0111\xFAng ch\u1EC9 \u0111\u1ECBnh l\xE0m t\u0103ng ph\xF9 n\xE3o, h\u1EA1 kali m\xE1u n\u1EB7ng v\xE0 toan d\u1ECBch n\xE3o t\u1EE7y ngh\u1ECBch l\xFD.",
          priority: "Quan tr\u1ECDng"
        }
      ],
      pitfallsAndWarnings: [
        "Trong qu\xE1 tr\xECnh \u0111i\u1EC1u tr\u1ECB DKA, b\u1EC7nh nh\xE2n th\u01B0\u1EDDng chuy\u1EC3n t\u1EEB Toan t\u0103ng Anion Gap sang Toan AG b\xECnh th\u01B0\u1EDDng (Hyperchloraemic Acidosis) do truy\u1EC1n m\u1ED9t l\u01B0\u1EE3ng l\u1EDBn mu\u1ED1i NaCl 0.9% v\xE0 \u0111\xE0o th\u1EA3i ceton qua th\u1EADn. \u0110\xE2y l\xE0 di\u1EC5n ti\u1EBFn l\xE0nh t\xEDnh.",
        "C\u1EA7n theo d\xF5i s\xE1t tri gi\xE1c \u0111\u1EC3 ph\xE1t hi\u1EC7n s\u1EDBm Ph\xF9 n\xE3o (Headache, l\u01A1 m\u01A1, ch\u1EADm nh\u1ECBp tim), \u0111\u1EB7c bi\u1EC7t \u1EDF tr\u1EBB em v\xE0 thanh thi\u1EBFu ni\xEAn."
      ],
      sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.5, tr. 42-43; Ca 18) & JBDS DKA Guidelines"
    },
    {
      id: "lactic-sepsis",
      title: "X\u1EED tr\xED Toan Lactic & S\u1ED1c nhi\u1EC5m khu\u1EA9n (Surviving Sepsis)",
      subtitle: "Tissue Hypoxia, Anaerobic Metabolism & Surviving Sepsis Bundle",
      category: "Toan chuy\u1EC3n h\xF3a",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      summary: "Toan lactic l\xE0 nguy\xEAn nh\xE2n ph\u1ED5 bi\u1EBFn nh\u1EA5t c\u1EE7a toan chuy\u1EC3n h\xF3a \u1EDF b\u1EC7nh nh\xE2n n\u1EB1m vi\u1EC7n, \u0111\u1ECBnh ngh\u0129a khi HCO3- gi\u1EA3m k\xE8m Lactate huy\u1EBFt t\u01B0\u01A1ng > 4 mmol/L. L\xE0 ch\u1EC9 s\u1ED1 v\xE0ng ti\xEAn l\u01B0\u1EE3ng t\u1EED vong.",
      pathophysiology: "Thi\u1EBFu oxy t\u1EBF b\xE0o do t\u1EE5t huy\u1EBFt \xE1p, s\u1ED1c nhi\u1EC5m khu\u1EA9n, gi\u1EA3m t\u01B0\u1EDBi m\xE1u t\u1EA1ng ho\u1EB7c t\u1EAFc m\u1EA1ch khu tr\xFA (nh\u1ED3i m\xE1u ru\u1ED9t). T\u1EBF b\xE0o chuy\u1EC3n sang chu tr\xECnh \u0111\u01B0\u1EDDng ph\xE2n k\u1EF5 kh\xED, sinh ra acid lactic kh\xF4ng h\u1ED3i ph\u1EE5c n\u1EBFu t\u01B0\u1EDBi m\xE1u kh\xF4ng \u0111\u01B0\u1EE3c t\xE1i l\u1EADp.",
      diagnosticCriteria: [
        "Lactate m\xE1u > 2.0 mmol/L (Toan lactic r\xF5: > 4.0 mmol/L)",
        "Toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap (AG > 16-18 mmol/L)",
        "D\u1EA5u hi\u1EC7u gi\u1EA3m t\u01B0\u1EDBi m\xE1u: Huy\u1EBFt \xE1p t\u1EE5t (MAP < 65 mmHg), thi\u1EC3u ni\u1EC7u (< 0.5 mL/kg/h), da n\u1ED5i v\xE2n t\xEDm, CRT > 3s"
      ],
      treatmentSteps: [
        {
          title: "1. G\xF3i x\u1EED tr\xED 1 gi\u1EDD (Hour-1 Surviving Sepsis Bundle)",
          description: "1. \u0110\u1ECBnh l\u01B0\u1EE3ng Lactate m\xE1u ngay; 2. C\u1EA5y m\xE1u tr\u01B0\u1EDBc khi d\xF9ng kh\xE1ng sinh; 3. D\xF9ng kh\xE1ng sinh ph\u1ED5 r\u1ED9ng IV trong v\xF2ng 60 ph\xFAt; 4. B\xF9 nhanh d\u1ECBch tinh th\u1EC3 \u0111\u1EB3ng tr\u01B0\u01A1ng 30 mL/kg \u0111\u1ED1i v\u1EDBi t\u1EE5t huy\u1EBFt \xE1p ho\u1EB7c Lactate >= 4 mmol/L.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "2. Thu\u1ED1c v\u1EADn m\u1EA1ch n\xE2ng huy\u1EBFt \xE1p",
          description: "D\xF9ng Noradrenaline (Norepinephrine) truy\u1EC1n t\u0129nh m\u1EA1ch qua catheter trung t\xE2m, kh\u1EDFi \u0111\u1EA7u 0.05 - 0.1 mcg/kg/ph\xFAt, chu\u1EA9n \u0111\u1ED9 \u0111\u1EC3 duy tr\xEC Huy\u1EBFt \xE1p trung b\xECnh (MAP) >= 65 mmHg.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "3. \u0110o l\u01B0\u1EDDng \u0111\u1ED9 thanh th\u1EA3i Lactate (Lactate Clearance)",
          description: "X\xE9t nghi\u1EC7m l\u1EA1i Lactate m\u1ED7i 2 - 4 gi\u1EDD. M\u1EE5c ti\xEAu gi\u1EA3m \xEDt nh\u1EA5t 10 - 20% n\u1ED3ng \u0111\u1ED9 lactate sau m\u1ED7i 2 gi\u1EDD h\u1ED3i s\u1EE9c l\xE0 d\u1EA5u hi\u1EC7u h\u1ED3i ph\u1EE5c t\u01B0\u1EDBi m\xE1u m\xF4.",
          priority: "Quan tr\u1ECDng"
        }
      ],
      pitfallsAndWarnings: [
        "KH\xD4NG TRUY\u1EC0N NATRI BICARBONATE \u0110\u1EC2 \u0110I\u1EC0U TR\u1ECA TOAN LACTIC (tr\u1EEB khi pH < 7.1)! Bicarbonate l\xE0m d\u1ECBch chuy\u1EC3n \u0111\u01B0\u1EDDng cong oxyhemoglobin sang tr\xE1i khi\u1EBFn t\u1EBF b\xE0o c\xE0ng kh\xF3 nh\u1EADn oxy, \u0111\u1ED3ng th\u1EDDi sinh CO2 n\u1ED9i b\xE0o l\xE0m toan n\u1ED9i b\xE0o n\u1EB7ng n\u1EC1 h\u01A1n.",
        "\u1EDE b\u1EC7nh nh\xE2n \u0111au b\u1EE5ng d\u1EEF d\u1ED9i kh\xE1m b\u1EE5ng m\u1EC1m c\xF3 rung nh\u0129: Lactate t\u0103ng cao g\u1EE3i \xFD ngay Nh\u1ED3i m\xE1u m\u1EA1c treo (Mesenteric Ischemia), ph\u1EA3i ch\u1EE5p CTA b\u1EE5ng c\u1EA5p c\u1EE9u!"
      ],
      sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.5, tr. 40-41; Ca 17, 22) & SSC Guidelines"
    },
    {
      id: "metabolic-alkalosis-vomiting",
      title: "X\u1EED tr\xED Ki\u1EC1m chuy\u1EC3n h\xF3a & M\u1EA5t d\u1ECBch d\u1EA1 d\xE0y (Vomiting)",
      subtitle: "Hypochloremic, Hypokalemic Metabolic Alkalosis",
      category: "Ki\u1EC1m chuy\u1EC3n h\xF3a",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      summary: "R\u1ED1i lo\u1EA1n toan ki\u1EC1m chi\u1EBFm 50% c\xE1c tr\u01B0\u1EDDng h\u1EE3p \u1EDF b\u1EC7nh nh\xE2n ngo\u1EA1i khoa. T\u1EED vong l\xEAn t\u1EDBi 45% khi pH > 7.55 v\xE0 80% khi pH > 7.65.",
      pathophysiology: "N\xF4n \xF3i ho\u1EB7c h\xFAt sonde d\u1EA1 d\xE0y l\xE0m m\u1EA5t acid HCl v\xE0 n\u01B0\u1EDBc. Th\u1EADn m\u1EA5t Clo v\xE0 Kali. \u0110\u1EC3 gi\u1EEF Natri c\u1EE9u v\xE3n th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n, th\u1EADn d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a aldosterone bu\u1ED9c ph\u1EA3i b\xE0i ti\u1EBFt H+ v\xE0o n\u01B0\u1EDBc ti\u1EC3u (Paradoxical aciduria), l\xE0m duy tr\xEC t\xECnh tr\u1EA1ng ki\u1EC1m m\xE1u nghi\xEAm tr\u1ECDng.",
      diagnosticCriteria: [
        "pH > 7.45 (ho\u1EB7c b\xECnh th\u01B0\u1EDDng n\u1EBFu c\xF3 b\xF9 tr\u1EEB m\u1EA1n)",
        "HCO3- > 28 mmol/L v\xE0 Base Excess (BE) > +2 mmol/L",
        "H\u1EA1 Clo m\xE1u (Cl- < 95 mmol/L) v\xE0 H\u1EA1 Kali m\xE1u (K+ < 3.5 mmol/L)"
      ],
      treatmentSteps: [
        {
          title: "1. B\xF9 d\u1ECBch ch\u1EE9a Clo (Chloride Replacement)",
          description: "Truy\u1EC1n t\u0129nh m\u1EA1ch dung d\u1ECBch Natri Clorid 0.9% (Normal Saline). Khi cung c\u1EA5p \u0111\u1EE7 Cl- cho th\u1EADn, th\u1EADn s\u1EBD t\xE1i l\u1EADp kh\u1EA3 n\u0103ng b\xE0i ti\u1EBFt HCO3- d\u01B0 th\u1EEBa ra n\u01B0\u1EDBc ti\u1EC3u.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "2. B\xF9 Kali Clorid (KCl)",
          description: "B\u1ED5 sung KCl 20 - 40 mEq/L d\u1ECBch truy\u1EC1n. B\xF9 \u0111\u1EE7 Kali gi\xFAp t\u1EBF b\xE0o th\u1EADn kh\xF4ng c\xF2n ph\u1EA3i th\u1EA3i H+ \u0111\u1EC3 \u0111\u1ED5i l\u1EA5y Na+, t\u1EEB \u0111\xF3 d\u1EADp t\u1EAFt v\xF2ng xo\u1EAFn duy tr\xEC ki\u1EC1m chuy\u1EC3n h\xF3a.",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "3. \u0110i\u1EC1u ch\u1EC9nh li\u1EC1u l\u1EE3i ti\u1EC3u",
          description: "N\u1EBFu ki\u1EC1m chuy\u1EC3n h\xF3a do d\xF9ng Furosemide li\u1EC1u cao (th\u01B0\u1EDDng g\u1EB7p \u1EDF b\u1EC7nh nh\xE2n COPD k\xE8m suy tim), ph\u1ED1i h\u1EE3p thu\u1ED1c l\u1EE3i ti\u1EC3u gi\u1EEF Kali (Spironolactone) ho\u1EB7c Acetazolamide (Diamox) 250-500mg \u0111\u1EC3 th\u1EADn th\u1EA3i b\u1EDBt bicarbonate.",
          priority: "Quan tr\u1ECDng"
        }
      ],
      pitfallsAndWarnings: [
        "Tuy\u1EC7t \u0111\u1ED1i kh\xF4ng mang tr\u1EBB b\u1ECB h\u1EB9p m\xF4n v\u1ECB ph\xEC \u0111\u1EA1i \u0111i m\u1ED5 c\u1EA5p c\u1EE9u khi ch\u01B0a ch\u1EC9nh xong ki\u1EC1m h\u1EA1 clo h\u1EA1 kali! Tr\u1EBB c\xF3 nguy c\u01A1 ng\u1EEBng th\u1EDF sau m\u1ED5 do \u1EE9c ch\u1EBF trung t\xE2m h\xF4 h\u1EA5p.",
        "Ki\u1EC1m m\xE1u n\u1EB7ng g\xE2y co gi\u1EADt, h\u1EA1 calci ion h\xF3a m\xE1u v\xE0 lo\u1EA1n nh\u1ECBp th\u1EA5t nguy hi\u1EC3m."
      ],
      sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.5, tr. 44-45; Ca 26, 27, 28)"
    },
    {
      id: "abg-technique-pitfalls",
      title: "K\u1EF9 thu\u1EADt l\u1EA5y ABG, Test Allen & Nh\u1EADn bi\u1EBFt Nh\u1EA7m M\xE1u T\u0129nh M\u1EA1ch",
      subtitle: "Arterial Blood Gas Sampling & Pitfall Prevention",
      category: "C\u1EA1m b\u1EABy & Th\u1EE7 thu\u1EADt",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      summary: "Quy tr\xECnh l\u1EA5y m\xE1u \u0111\u1ED9ng m\u1EA1ch chu\u1EA9n y khoa, k\u1EF9 thu\u1EADt test Allen c\u1EA3i bi\xEAn b\u1EA3o v\u1EC7 t\u01B0\u1EDBi m\xE1u b\xE0n tay, v\xE0 c\xE1c b\u1EABy sai s\xF3t khi\u1EBFn k\u1EBFt qu\u1EA3 kh\xED m\xE1u b\u1ECB di\u1EC5n gi\u1EA3i sai l\u1EA7m.",
      pathophysiology: "\u0110\u1ED9ng m\u1EA1ch quay l\xE0 v\u1ECB tr\xED \u01B0u ti\xEAn s\u1ED1 1 v\xEC c\xF3 v\xF2ng cung \u0111\u1ED9ng m\u1EA1ch gan tay n\u1ED1i th\xF4ng v\u1EDBi \u0111\u1ED9ng m\u1EA1ch tr\u1EE5. Ph\u1EA3i \u0111\u1EA3m b\u1EA3o tu\u1EA7n ho\xE0n b\xE0ng h\u1EC7 tr\u01B0\u1EDBc khi ch\xE2m kim \u0111\u1EC3 tr\xE1nh nguy c\u01A1 t\u1EAFc m\u1EA1ch g\xE2y ho\u1EA1i t\u1EED ng\xF3n tay.",
      diagnosticCriteria: [
        "V\u1ECB tr\xED \u01B0u ti\xEAn: 1. \u0110\u1ED9ng m\u1EA1ch quay (c\u1ED5 tay); 2. \u0110\u1ED9ng m\u1EA1ch c\xE1nh tay (n\u1EBFp khu\u1EF7u); 3. \u0110\u1ED9ng m\u1EA1ch \u0111\xF9i (tam gi\xE1c Scarpa)",
        "G\xF3c \u0111\xE2m kim: 45 \u0111\u1ED9 v\u1EDBi \u0111\u1ED9ng m\u1EA1ch quay (ng\u1EEDa c\u1ED5 tay 20-30 \u0111\u1ED9); 90 \u0111\u1ED9 v\u1EDBi \u0111\u1ED9ng m\u1EA1ch \u0111\xF9i",
        "Test Allen c\u1EA3i bi\xEAn: B\xF3p ch\u1EB7t c\u1EA3 2 \u0110M quay v\xE0 tr\u1EE5 -> N\u1EAFm ch\u1EB7t tay 30s cho l\xF2ng b\xE0n tay tr\u1EAFng b\u1EC7ch -> M\u1EDF tay v\xE0 th\u1EA3 \u0110M tr\u1EE5 -> L\xF2ng b\xE0n tay h\u1ED3ng l\u1EA1i trong v\xF2ng 10 gi\xE2y = Test d\u01B0\u01A1ng t\xEDnh (An to\xE0n \u0111\u1EC3 l\u1EA5y m\xE1u)"
      ],
      treatmentSteps: [
        {
          title: "1. Chu\u1EA9n b\u1ECB b\u1EC7nh nh\xE2n & \u0110\u1EA1t tr\u1EA1ng th\xE1i \u1ED5n \u0111\u1ECBnh (Steady State)",
          description: "N\u1EBFu b\u1EC7nh nh\xE2n v\u1EEBa thay \u0111\u1ED5i n\u1ED3ng \u0111\u1ED9 oxy th\u1EDF ho\u1EB7c c\xE0i \u0111\u1EB7t m\xE1y th\u1EDF, PH\u1EA2I CH\u1EDC \xCDT NH\u1EA4T 20 PH\xDAT tr\u01B0\u1EDBc khi l\u1EA5y m\xE1u \u0111\u1EC3 kh\xED m\xE1u \u0111\u1EA1t tr\u1EA1ng th\xE1i c\xE2n b\u1EB1ng sinh l\xFD.",
          priority: "Quan tr\u1ECDng"
        },
        {
          title: "2. K\u1EF9 thu\u1EADt \u0111u\u1ED5i b\u1ECDt kh\xED & Ch\u1ED1ng \u0111\xF4ng Heparin",
          description: "Tr\xE1ng xi-lanh b\u1EB1ng Heparin v\xE0 \u0111\u1EA9y h\u1EBFt thu\u1ED1c th\u1EEBa (d\u01B0 heparin l\xE0m toan m\xE1u gi\u1EA3 t\u1EA1o). Sau khi l\u1EA5y m\xE1u, \u0110U\u1ED4I H\u1EBET B\u1ECCT KH\xCD NGAY L\u1EACP T\u1EE8C v\xE0 \u0111\u1EADy n\u1EAFp k\xEDn (b\u1ECDt kh\xED l\xE0m PaO2 t\u0103ng gi\u1EA3 v\xE0 PaCO2 gi\u1EA3m gi\u1EA3).",
          priority: "Kh\u1EA9n c\u1EA5p"
        },
        {
          title: "3. B\u1EA3o qu\u1EA3n l\u1EA1nh n\u1EBFu v\u1EADn chuy\u1EC3n > 10 ph\xFAt",
          description: "Ph\xE2n t\xEDch kh\xED m\xE1u ngay l\u1EADp t\u1EE9c. N\u1EBFu th\u1EDDi gian v\u1EADn chuy\u1EC3n \u0111\u1EBFn ph\xF2ng x\xE9t nghi\u1EC7m > 10 ph\xFAt, PH\u1EA2I \u0110\u1EB6T B\u01A0M TI\xCAM V\xC0O \u0110\xC1 L\u1EA0NH (Crushed ice) \u0111\u1EC3 l\xE0m ch\u1EADm qu\xE1 tr\xECnh ti\xEAu th\u1EE5 oxy v\xE0 sinh acid c\u1EE7a h\u1ED3ng c\u1EA7u.",
          priority: "Quan tr\u1ECDng"
        },
        {
          title: "4. \u0110\xE8 \xE9p v\u1ECB tr\xED ch\u1ECDc kim \xEDt nh\u1EA5t 5 ph\xFAt",
          description: "\u0110\xE8 \xE9p tr\u1EF1c ti\u1EBFp li\xEAn t\u1EE5c \xEDt nh\u1EA5t 5 ph\xFAt (\xEDt nh\u1EA5t 10-15 ph\xFAt n\u1EBFu b\u1EC7nh nh\xE2n c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u ho\u1EB7c \u0111ang d\xF9ng thu\u1ED1c ch\u1ED1ng \u0111\xF4ng) \u0111\u1EC3 tr\xE1nh kh\u1ED1i m\xE1u t\u1EE5 (Hematoma) v\xE0 ph\xECnh m\u1EA1ch gi\u1EA3.",
          priority: "Kh\u1EA9n c\u1EA5p"
        }
      ],
      pitfallsAndWarnings: [
        "NH\u1EACN DI\u1EC6N L\u1EA4Y NH\u1EA6M M\xC1U T\u0128NH M\u1EA0CH (VBG): M\xE1u m\xE0u \u0111\u1ECF th\u1EABm; kh\xF4ng t\u1EF1 \u0111\u1EA9y piston n\u1EA3y l\xEAn m\xE0 ph\u1EA3i d\xF9ng tay k\xE9o h\xFAt; SaO2 tr\xEAn m\xE1y kh\xED m\xE1u th\u1EA5p xa so v\u1EDBi SpO2 k\u1EB9p ng\xF3n tay. VBG KH\xD4NG TH\u1EC2 D\xD9NG \u0110\u1EC2 \u0110\xC1NH GI\xC1 OXY H\xD3A M\xC1U (PaO2)!",
        "C\u1EA0M B\u1EAAY KH\xCD M\xC1U B\xCCNH TH\u01AF\u1EDCNG TRONG THUY\xCAN T\u1EAEC PH\u1ED4I: 15-20% b\u1EC7nh nh\xE2n thuy\xEAn t\u1EAFc ph\u1ED5i c\u1EA5p c\xF3 kh\xED m\xE1u ho\xE0n to\xE0n b\xECnh th\u01B0\u1EDDng. Kh\xF4ng \u0111\u01B0\u1EE3c lo\u1EA1i tr\u1EEB PE ch\u1EC9 d\u1EF1a v\xE0o kh\xED m\xE1u!"
      ],
      sourceReference: "Arterial Blood Gases Made Easy (Ch\u01B0\u01A1ng 1.6, tr. 48-53; Ch\u01B0\u01A1ng 1.7, tr. 56; Ca 29, 30)"
    }
  ];
  var TREATMENT_PROTOCOLS = CLINICAL_PROTOCOLS.map((cp) => ({
    id: cp.id,
    title: cp.title,
    subtitle: cp.subtitle,
    category: cp.category,
    severityBadge: cp.treatmentSteps.some((s) => s.priority === "Kh\u1EA9n c\u1EA5p") ? "C\u1EA5p c\u1EE9u" : "\u0110i\u1EC1u tr\u1ECB",
    indications: cp.diagnosticCriteria,
    goals: [cp.summary],
    steps: cp.treatmentSteps.map((ts) => ({
      title: ts.title,
      action: ts.description,
      notes: `\u01AFu ti\xEAn: ${ts.priority}`
    })),
    cautions: cp.pitfallsAndWarnings
  }));

  // src/content/knowledge-vault/cdss/abg/abg-glossary.ts
  var ABG_GLOSSARY_TERMS = [
    {
      id: "ph",
      term: "pH",
      fullName: "Potential of Hydrogen - Thang \u0111o \u0111\u1ED9 toan ki\u1EC1m m\xE1u \u0111\u1ED9ng m\u1EA1ch",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "7.35 \u2013 7.45 (Chu\u1EA9n sinh l\xFD t\u1ED1i \u01B0u: 7.40)",
      definition: "Logarit th\u1EADp ph\xE2n \xE2m c\u1EE7a n\u1ED3ng \u0111\u1ED9 ion hydro t\u1EF1 do trong huy\u1EBFt t\u01B0\u01A1ng: pH = -log[H\u207A]. Ph\u1EA3n \xE1nh \u0111\u1ED9 toan (acidaemia khi pH < 7.35) ho\u1EB7c \u0111\u1ED9 ki\u1EC1m (alkalaemia khi pH > 7.45) c\u1EE7a m\xE1u to\xE0n ph\u1EA7n.",
      clinicalSignificance: "pH quy\u1EBFt \u0111\u1ECBnh c\u1EA5u h\xECnh kh\xF4ng gian b\u1EADc 3 c\u1EE7a m\u1ECDi enzym v\xE0 protein trong c\u01A1 th\u1EC3, \u1EA3nh h\u01B0\u1EDFng tr\u1EF1c ti\u1EBFp \u0111\u1EBFn kh\u1EA3 n\u0103ng co b\xF3p c\u01A1 tim v\xE0 t\xEDnh th\u1EA5m m\xE0ng t\u1EBF b\xE0o. pH < 7.20 ho\u1EB7c > 7.60 l\xE0 t\xECnh tr\u1EA1ng \u0111e d\u1ECDa t\xEDnh m\u1EA1ng c\u1EA5p c\u1EE9u.",
      pearlsAndWarnings: "pH b\xECnh th\u01B0\u1EDDng (7.35 \u2013 7.45) KH\xD4NG \u0111\u1ED3ng ngh\u0129a v\u1EDBi vi\u1EC7c kh\xF4ng c\xF3 b\u1EC7nh l\xFD toan ki\u1EC1m! B\u1EC7nh nh\xE2n c\xF3 th\u1EC3 c\xF3 r\u1ED1i lo\u1EA1n toan ki\u1EC1m \u0111\xE3 \u0111\u01B0\u1EE3c b\xF9 tr\u1EEB ho\xE0n to\xE0n, ho\u1EB7c r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p \u0111\u1ED1i kh\xE1ng (v\xED d\u1EE5 toan chuy\u1EC3n h\xF3a n\u1EB7ng ph\u1ED1i h\u1EE3p ki\u1EC1m h\xF4 h\u1EA5p).",
      tags: ["pH", "acidaemia", "alkalaemia", "H+"]
    },
    {
      id: "paco2",
      term: "PaCO\u2082 (ho\u1EB7c pCO\u2082)",
      fullName: "Partial Pressure of Arterial Carbon Dioxide - Ph\xE2n \xE1p kh\xED CO\u2082 trong m\xE1u \u0111\u1ED9ng m\u1EA1ch",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "35 \u2013 45 mmHg (ho\u1EB7c 4.7 \u2013 6.0 kPa)",
      definition: "Ph\xE2n \xE1p ph\u1EA7n kh\xED CO\u2082 h\xF2a tan trong huy\u1EBFt t\u01B0\u01A1ng \u0111\u1ED9ng m\u1EA1ch. Ph\u1EA3n \xE1nh tr\u1EF1c ti\u1EBFp hi\u1EC7u qu\u1EA3 c\u1EE7a th\xF4ng kh\xED ph\u1EBF nang (Alveolar ventilation). CO\u2082 l\xE0 m\u1ED9t acid bay h\u01A1i v\xEC k\u1EBFt h\u1EE3p v\u1EDBi n\u01B0\u1EDBc t\u1EA1o H\u2082CO\u2083.",
      clinicalSignificance: "PaCO\u2082 > 45 mmHg bi\u1EC3u th\u1ECB gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang (Alveolar Hypoventilation), d\u1EABn \u0111\u1EBFn toan h\xF4 h\u1EA5p ho\u1EB7c suy h\xF4 h\u1EA5p Type 2. PaCO\u2082 < 35 mmHg bi\u1EC3u th\u1ECB t\u0103ng th\xF4ng kh\xED ph\u1EBF nang (Hyperventilation), d\u1EABn \u0111\u1EBFn ki\u1EC1m h\xF4 h\u1EA5p.",
      pearlsAndWarnings: "Quy \u0111\u1ED5i nhanh gi\u1EEFa 2 h\u1EC7 \u0111\u01A1n v\u1ECB: 1 kPa \u2248 7.5 mmHg (ho\u1EB7c l\u1EA5y gi\xE1 tr\u1ECB kPa nh\xE2n 7.5). \u1EDE b\u1EC7nh nh\xE2n COPD m\u1EA1n t\xEDnh, t\u0103ng PaCO\u2082 t\u1EEB t\u1EEB \u0111\u01B0\u1EE3c th\u1EADn b\xF9 tr\u1EEB b\u1EB1ng c\xE1ch gi\u1EEF l\u1EA1i HCO\u2083\u207B.",
      tags: ["pCO2", "PaCO2", "acid bay h\u01A1i", "suy h\xF4 h\u1EA5p type 2"]
    },
    {
      id: "pao2",
      term: "PaO\u2082 (ho\u1EB7c pO\u2082)",
      fullName: "Partial Pressure of Arterial Oxygen - Ph\xE2n \xE1p kh\xED Oxy trong m\xE1u \u0111\u1ED9ng m\u1EA1ch",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "80 \u2013 100 mmHg (ho\u1EB7c 11.0 \u2013 14.0 kPa) khi th\u1EDF kh\xED tr\u1EDDi \u1EDF ng\u01B0\u1EDDi tr\u1EBB",
      definition: "\xC1p l\u1EF1c ri\xEAng ph\u1EA7n c\u1EE7a ph\xE2n t\u1EED oxy h\xF2a tan t\u1EF1 do trong huy\u1EBFt t\u01B0\u01A1ng (ch\u1EC9 chi\u1EBFm ~1.5 - 2% t\u1ED5ng l\u01B0\u1EE3ng O\u2082 trong m\xE1u, ph\u1EA7n c\xF2n l\u1EA1i g\u1EAFn v\u1EDBi Hemoglobin). Ph\u1EA3n \xE1nh kh\u1EA3 n\u0103ng khu\u1EBFch t\xE1n oxy qua m\xE0ng ph\u1EBF nang - mao m\u1EA1ch.",
      clinicalSignificance: "PaO\u2082 < 60 mmHg (8 kPa) tr\xEAn kh\xED tr\u1EDDi x\xE1c \u0111\u1ECBnh t\xECnh tr\u1EA1ng suy h\xF4 h\u1EA5p c\u1EA5p (Respiratory Failure) v\xE0 b\u1EAFt \u0111\u1EA7u r\u01A1i v\xE0o \u0111o\u1EA1n d\u1ED1c \u0111\u1EE9ng c\u1EE7a \u0111\u01B0\u1EDDng cong ph\xE2n ly Oxyhemoglobin. C\u1EA7n can thi\u1EC7p li\u1EC7u ph\xE1p oxy kh\u1EA9n c\u1EA5p.",
      pearlsAndWarnings: "PaO\u2082 b\xECnh th\u01B0\u1EDDng gi\u1EA3m d\u1EA7n theo tu\u1ED5i: PaO\u2082 k\u1EF3 v\u1ECDng (mmHg) \u2248 100 - (Tu\u1ED5i / 3). \u0110\xE1nh gi\xE1 PaO\u2082 lu\xF4n b\u1EAFt bu\u1ED9c ph\u1EA3i g\u1EAFn li\u1EC1n v\u1EDBi n\u1ED3ng \u0111\u1ED9 oxy h\xEDt v\xE0o (FiO\u2082). Kh\xF4ng bao gi\u1EDD c\xF3 gi\xE1 tr\u1ECB PaO\u2082 b\xECnh th\u01B0\u1EDDng \u0111\u01A1n l\u1EBB m\xE0 kh\xF4ng bi\u1EBFt FiO\u2082!",
      tags: ["pO2", "PaO2", "suy h\xF4 h\u1EA5p type 1", "oxy h\xF3a m\xE1u"]
    },
    {
      id: "hco3",
      term: "HCO\u2083\u207B (Bicarbonate)",
      fullName: "Standard / Actual Bicarbonate - N\u1ED3ng \u0111\u1ED9 Ion Bicarbonate huy\u1EBFt t\u01B0\u01A1ng",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "22 \u2013 26 mmol/L (ho\u1EB7c mEq/L)",
      definition: "Th\xE0nh ph\u1EA7n baz\u01A1 quan tr\u1ECDng nh\u1EA5t trong h\u1EC7 \u0111\u1EC7m ngo\u1EA1i b\xE0o c\u1EE7a c\u01A1 th\u1EC3, ch\u1ECBu s\u1EF1 \u0111i\u1EC1u h\xF2a ch\u1EADm c\u1EE7a th\u1EADn (qua t\xE1i h\u1EA5p thu \u1EDF \u1ED1ng l\u01B0\u1EE3n g\u1EA7n v\xE0 b\xE0i ti\u1EBFt H\u207A \u1EDF \u1ED1ng l\u01B0\u1EE3n xa).",
      clinicalSignificance: "HCO\u2083\u207B < 22 mmol/L bi\u1EC3u th\u1ECB toan chuy\u1EC3n h\xF3a ho\u1EB7c \u0111\xE1p \u1EE9ng b\xF9 tr\u1EEB c\u1EE7a th\u1EADn trong ki\u1EC1m h\xF4 h\u1EA5p m\u1EA1n. HCO\u2083\u207B > 26 mmol/L bi\u1EC3u th\u1ECB ki\u1EC1m chuy\u1EC3n h\xF3a ho\u1EB7c \u0111\xE1p \u1EE9ng b\xF9 tr\u1EEB c\u1EE7a th\u1EADn trong toan h\xF4 h\u1EA5p m\u1EA1n.",
      pearlsAndWarnings: "Th\u1EADn c\u1EA7n th\u1EDDi gian t\u1EEB 24 \u0111\u1EBFn 72 gi\u1EDD \u0111\u1EC3 \u0111i\u1EC1u ch\u1EC9nh n\u1ED3ng \u0111\u1ED9 HCO\u2083\u207B trong m\xE1u. Do \u0111\xF3 trong toan h\xF4 h\u1EA5p c\u1EA5p (m\u1EDBi x\u1EA3y ra v\xE0i ph\xFAt \u0111\u1EBFn v\xE0i gi\u1EDD), HCO\u2083\u207B g\u1EA7n nh\u01B0 ch\u01B0a k\u1ECBp thay \u0111\u1ED5i!",
      tags: ["HCO3", "Bicarbonate", "\u0111\u1EC7m th\u1EADn", "toan chuy\u1EC3n h\xF3a"]
    },
    {
      id: "be",
      term: "BE (Base Excess / SBE)",
      fullName: "Standard Base Excess - Ki\u1EC1m d\u01B0 chu\u1EA9n h\xF3a",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "-2 \u0111\u1EBFn +2 mmol/L (m\u1EDF r\u1ED9ng -3 \u0111\u1EBFn +3 mmol/L)",
      definition: "L\u01B0\u1EE3ng acid ho\u1EB7c ki\u1EC1m m\u1EA1nh (t\xEDnh b\u1EB1ng mmol/L) c\u1EA7n th\xEAm v\xE0o \u0111\u1EC3 \u0111\u01B0a 1 l\xEDt m\xE1u to\xE0n ph\u1EA7n v\u1EC1 pH chu\u1EA9n 7.40 \u1EDF \u0111i\u1EC1u ki\u1EC7n PaCO\u2082 = 40 mmHg v\xE0 nhi\u1EC7t \u0111\u1ED9 37\xB0C.",
      clinicalSignificance: "BE \xE2m t\xEDnh (< -2 \u0111\u1EBFn -3 mmol/L, c\xF2n g\u1ECDi l\xE0 Base Deficit): Th\xE2m h\u1EE5t ki\u1EC1m, bi\u1EC3u th\u1ECB toan chuy\u1EC3n h\xF3a. BE d\u01B0\u01A1ng t\xEDnh (> +2 \u0111\u1EBFn +3 mmol/L): Th\u1EEBa ki\u1EC1m, bi\u1EC3u th\u1ECB ki\u1EC1m chuy\u1EC3n h\xF3a.",
      pearlsAndWarnings: "Standard Base Excess (SBE) c\xF3 \u01B0u \u0111i\u1EC3m v\u01B0\u1EE3t tr\u1ED9i h\u01A1n HCO\u2083\u207B th\u1EF1c t\u1EBF v\xEC SBE \u0111\xE3 \u0111\u01B0\u1EE3c chu\u1EA9n h\xF3a v\u1EC1 PaCO\u2082 = 40 mmHg, lo\u1EA1i tr\u1EEB \u0111\u01B0\u1EE3c ho\xE0n to\xE0n \u1EA3nh h\u01B0\u1EDFng c\u1EE7a thay \u0111\u1ED5i h\xF4 h\u1EA5p c\u1EA5p t\xEDnh l\xEAn n\u1ED3ng \u0111\u1ED9 ki\u1EC1m.",
      tags: ["BE", "Base Excess", "Base Deficit", "th\xE2m h\u1EE5t ki\u1EC1m"]
    },
    {
      id: "sao2",
      term: "SaO\u2082 (Arterial O\u2082 Saturation)",
      fullName: "Arterial Oxygen Saturation - \u0110\u1ED9 b\xE3o h\xF2a Oxy c\u1EE7a Hemoglobin m\xE1u \u0111\u1ED9ng m\u1EA1ch",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "95% \u2013 98% (tr\xEAn kh\xED tr\u1EDDi \u1EDF ng\u01B0\u1EDDi kh\u1ECFe m\u1EA1nh)",
      definition: "T\u1EF7 l\u1EC7 ph\u1EA7n tr\u0103m c\xE1c v\u1ECB tr\xED g\u1EAFn oxy tr\xEAn ph\xE2n t\u1EED Hemoglobin trong m\xE1u \u0111\u1ED9ng m\u1EA1ch \u0111ang \u0111\u01B0\u1EE3c g\u1EAFn k\u1EBFt v\u1EDBi oxy: SaO\u2082 = [HbO\u2082] / [T\u1ED5ng Hb c\xF3 kh\u1EA3 n\u0103ng g\u1EAFn k\u1EBFt] \xD7 100%.",
      clinicalSignificance: "Quy\u1EBFt \u0111\u1ECBnh tr\u1EF1c ti\u1EBFp \u0111\u1EBFn t\u1ED5ng dung t\xEDch mang oxy c\u1EE7a m\xE1u (CaO\u2082). Khi SaO\u2082 t\u1EE5t d\u01B0\u1EDBi 90%, t\u01B0\u01A1ng \u1EE9ng PaO\u2082 t\u1EE5t d\u01B0\u1EDBi 60 mmHg, m\xF4 c\u01A1 th\u1EC3 r\u01A1i v\xE0o t\xECnh tr\u1EA1ng thi\u1EBFu oxy nghi\xEAm tr\u1ECDng.",
      pearlsAndWarnings: "Kh\xE1c bi\u1EC7t gi\u1EEFa SaO\u2082 (\u0111o tr\u1EF1c ti\u1EBFp b\u1EB1ng m\xE1y ph\xE2n t\xEDch kh\xED m\xE1u qua co-oximetry) v\xE0 SpO\u2082 (\u0111o gi\xE1n ti\u1EBFp qua \u0111\u1EA7u d\xF2 k\u1EB9p m\u1EA1ch n\u1EA3y quang h\u1ECDc). Trong ng\u1ED9 \u0111\u1ED9c CO (Carbon Monoxide), m\xE1y \u0111o SpO\u2082 th\xF4ng th\u01B0\u1EDDng b\u1ECB \u0111\xE1nh l\u1EEBa v\xE0 b\xE1o 99-100% gi\u1EA3 t\u1EA1o!",
      tags: ["SaO2", "SpO2", "b\xE3o h\xF2a oxy", "co-oximetry"]
    },
    {
      id: "fio2",
      term: "FiO\u2082",
      fullName: "Fraction of Inspired Oxygen - Ph\xE2n su\u1EA5t Oxy trong kh\xED h\xEDt v\xE0o",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "0.21 (21%) trong kh\xF4ng kh\xED ph\xF2ng t\u1EF1 nhi\xEAn",
      definition: "T\u1EF7 l\u1EC7 ph\u1EA7n tr\u0103m oxy trong h\u1ED7n h\u1EE3p kh\xED m\xE0 b\u1EC7nh nh\xE2n h\xEDt v\xE0o ph\u1ED5i. Khi th\u1EDF oxy li\u1EC7u ph\xE1p, FiO\u2082 dao \u0111\u1ED9ng t\u1EEB 24% (g\u1ECDng m\u0169i 1 L/ph\xFAt) \u0111\u1EBFn 100% (mask kh\xF4ng th\u1EDF l\u1EA1i c\xF3 b\xF3ng d\u1EF1 tr\u1EEF ho\u1EB7c m\xE1y th\u1EDF).",
      clinicalSignificance: "L\xE0 bi\u1EBFn s\u1ED1 b\u1EAFt bu\u1ED9c ph\u1EA3i ghi nh\u1EADn ch\xEDnh x\xE1c t\u1EA1i th\u1EDDi \u0111i\u1EC3m ch\u1ECDc kh\xED m\xE1u \u0111\u1EC3 t\xEDnh to\xE1n P/F ratio, PaO\u2082 k\u1EF3 v\u1ECDng v\xE0 A-a gradient.",
      pearlsAndWarnings: "Quy t\u1EAFc \u01B0\u1EDBc t\xEDnh nhanh khi th\u1EDF oxy g\u1ECDng m\u0169i (Nasal Cannula): FiO\u2082 \u2248 21% + (L\u01B0u l\u01B0\u1EE3ng l\xEDt/ph\xFAt \xD7 4). V\xED d\u1EE5 2 L/ph\xFAt \u2248 29%; 4 L/ph\xFAt \u2248 37%. V\u1EDBi Mask t\xFAi c\xF3 van m\u1ED9t chi\u1EC1u (Non-rebreather mask 12-15 L/ph\xFAt), FiO\u2082 \u0111\u1EA1t x\u1EA5p x\u1EC9 85-95%.",
      tags: ["FiO2", "n\u1ED3ng \u0111\u1ED9 oxy", "g\u1ECDng m\u0169i", "mask th\u1EDF"]
    },
    {
      id: "anion-gap",
      term: "Anion Gap (AG)",
      fullName: "Serum Anion Gap - Kho\u1EA3ng tr\u1ED1ng Anion huy\u1EBFt t\u01B0\u01A1ng",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "8 \u2013 16 mEq/L (ho\u1EB7c 12 \xB1 4 khi kh\xF4ng t\xEDnh K\u207A)",
      definition: "Ch\xEAnh l\u1EC7ch n\u1ED3ng \u0111\u1ED9 gi\u1EEFa c\xE1c cation \u0111o l\u01B0\u1EDDng \u0111\u01B0\u1EE3c v\xE0 anion \u0111o l\u01B0\u1EDDng \u0111\u01B0\u1EE3c trong huy\u1EBFt t\u01B0\u01A1ng: AG = Na\u207A - (Cl\u207B + HCO\u2083\u207B), ho\u1EB7c AG = (Na\u207A + K\u207A) - (Cl\u207B + HCO\u2083\u207B). Th\u1EC3 hi\u1EC7n n\u1ED3ng \u0111\u1ED9 c\xE1c anion kh\xF4ng \u0111o l\u01B0\u1EDDng \u0111\u01B0\u1EE3c (albumin, phosphate, sulfate, lactate, ketoacids).",
      clinicalSignificance: "D\xF9ng \u0111\u1EC3 ph\xE2n lo\u1EA1i toan chuy\u1EC3n h\xF3a: Toan t\u0103ng AG (> 16-18) do c\xF3 th\xEAm acid c\u1ED1 \u0111\u1ECBnh b\u1EA5t th\u01B0\u1EDDng (DKA, Lactic, suy th\u1EADn, ng\u1ED9 \u0111\u1ED9c c\u1ED3n \u0111\u1ED9c) vs Toan AG b\xECnh th\u01B0\u1EDDng do m\u1EA5t HCO\u2083\u207B b\xF9 b\u1EB1ng Cl\u207B.",
      pearlsAndWarnings: "Albumin l\xE0 ngu\u1ED3n anion kh\xF4ng \u0111o l\u01B0\u1EDDng l\u1EDBn nh\u1EA5t (~75% gi\xE1 tr\u1ECB AG b\xECnh th\u01B0\u1EDDng). Khi b\u1EC7nh nh\xE2n n\u1EB7ng b\u1ECB gi\u1EA3m Albumin m\xE1u, AG th\u1EF1c t\u1EBF s\u1EBD b\u1ECB t\u1EE5t xu\u1ED1ng gi\u1EA3 t\u1EA1o! Ph\u1EA3i hi\u1EC7u ch\u1EC9nh AG theo c\xF4ng th\u1EE9c Figge.",
      tags: ["Anion Gap", "AG", "toan chuy\u1EC3n h\xF3a", "GOLDMARK", "HARDUPS"]
    },
    {
      id: "albumin-corrected-ag",
      term: "Albumin-corrected AG",
      fullName: "Hi\u1EC7u ch\u1EC9nh Anion Gap theo n\u1ED3ng \u0111\u1ED9 Albumin huy\u1EBFt t\u01B0\u01A1ng (C\xF4ng th\u1EE9c Figge)",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "Kho\u1EA3ng tham chi\u1EBFu t\u01B0\u01A1ng t\u1EF1 AG (8 \u2013 16 mEq/L)",
      definition: "C\xF4ng th\u1EE9c hi\u1EC7u ch\u1EC9nh: AG hi\u1EC7u ch\u1EC9nh = AG t\xEDnh to\xE1n + 2.5 \xD7 [4.0 - Albumin (g/dL)] (ho\u1EB7c + 0.25 \xD7 [40 - Albumin g/L]).",
      clinicalSignificance: "\u1EDE b\u1EC7nh nh\xE2n h\u1ED3i s\u1EE9c ICU c\xF3 t\xECnh tr\u1EA1ng suy dinh d\u01B0\u1EE1ng, b\u1ECFng, s\u1ED1c nhi\u1EC5m khu\u1EA9n g\xE2y gi\u1EA3m n\u1EB7ng Albumin (v\xED d\u1EE5 Albumin = 2.0 g/dL), AG \u0111o \u0111\u01B0\u1EE3c c\xF3 th\u1EC3 b\xECnh th\u01B0\u1EDDng nh\u01B0ng th\u1EF1c ch\u1EA5t l\xE0 Toan T\u0102NG Anion Gap nghi\xEAm tr\u1ECDng b\u1ECB che gi\u1EA5u!",
      pearlsAndWarnings: "M\u1ED7i khi Albumin huy\u1EBFt thanh gi\u1EA3m 1.0 g/dL (10 g/L), gi\xE1 tr\u1ECB Anion Gap t\xEDnh to\xE1n s\u1EBD gi\u1EA3m \u0111i kho\u1EA3ng 2.5 mEq/L.",
      tags: ["Albumin", "Figge", "AG hi\u1EC7u ch\u1EC9nh", "ICU"]
    },
    {
      id: "delta-gap",
      term: "Delta Ratio (\u0394AG / \u0394HCO\u2083\u207B)",
      fullName: "T\u1EF7 s\u1ED1 Delta - So s\xE1nh bi\u1EBFn thi\xEAn Anion Gap v\u1EDBi bi\u1EBFn thi\xEAn Bicarbonate",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "1.0 \u2013 1.6 (trong toan t\u0103ng Anion Gap \u0111\u01A1n thu\u1EA7n)",
      definition: "T\u1EF7 s\u1ED1 gi\u1EEFa m\u1EE9c t\u0103ng th\xEAm c\u1EE7a Anion Gap so v\u1EDBi m\u1EE9c gi\u1EA3m \u0111i c\u1EE7a Bicarbonate: Delta Ratio = (AG \u0111o \u0111\u01B0\u1EE3c - 12) / (24 - HCO\u2083\u207B \u0111o \u0111\u01B0\u1EE3c).",
      clinicalSignificance: "\u2022 Delta Ratio < 0.4 - 0.8: C\xF3 TOAN CHUY\u1EC2N H\xD3A AG B\xCCNH TH\u01AF\u1EDCNG (t\u0103ng Cl\u207B) \u0111i k\xE8m (m\u1EA5t th\xEAm bicarb do ti\xEAu ch\u1EA3y ho\u1EB7c suy th\u1EADn).\n\u2022 Delta Ratio 1.0 - 1.6: Toan t\u0103ng AG \u0111\u01A1n thu\u1EA7n (v\xED d\u1EE5 DKA ho\u1EB7c toan Lactic).\n\u2022 Delta Ratio > 1.6 - 2.0: C\xF3 KI\u1EC0M CHUY\u1EC2N H\xD3A ph\u1ED1i h\u1EE3p ng\u1EA5m ng\u1EA7m (bicarbonate cao h\u01A1n d\u1EF1 ki\u1EBFn, v\xED d\u1EE5 n\xF4n \xF3i k\xE8m DKA).",
      pearlsAndWarnings: "Ch\u1EC9 \u0111\u01B0\u1EE3c t\xEDnh Delta Ratio khi \u0111\xE3 x\xE1c \u0111\u1ECBnh b\u1EC7nh nh\xE2n c\xF3 TOAN CHUY\u1EC2N H\xD3A T\u0102NG ANION GAP!",
      tags: ["Delta Ratio", "Delta Gap", "r\u1ED1i lo\u1EA1n h\u1ED7n h\u1EE3p", "che gi\u1EA5u"]
    },
    {
      id: "winters-formula",
      term: "Winter's Formula",
      fullName: "C\xF4ng th\u1EE9c Winter - D\u1EF1 \u0111o\xE1n b\xF9 tr\u1EEB PaCO\u2082 trong Toan Chuy\u1EC3n H\xF3a",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "PaCO\u2082 k\u1EF3 v\u1ECDng = 1.5 \xD7 [HCO\u2083\u207B] + 8 \xB1 2 (mmHg)",
      definition: "C\xF4ng th\u1EE9c chu\u1EA9n x\xE1c \u0111\u1ECBnh m\u1EE9c \u0111\u1ED9 t\u0103ng th\xF4ng kh\xED h\xF4 h\u1EA5p th\xEDch h\u1EE3p c\u1EE7a c\u01A1 th\u1EC3 nh\u1EB1m \u0111\xE1p \u1EE9ng v\u1EDBi t\xECnh tr\u1EA1ng toan chuy\u1EC3n h\xF3a: PaCO\u2082 mong \u0111\u1EE3i = 1.5 \xD7 [HCO\u2083\u207B] + 8 \xB1 2.",
      clinicalSignificance: "\u2022 N\u1EBFu PaCO\u2082 th\u1EF1c t\u1EBF = PaCO\u2082 k\u1EF3 v\u1ECDng: B\xF9 tr\u1EEB h\xF4 h\u1EA5p ph\xF9 h\u1EE3p ho\xE0n to\xE0n.\n\u2022 N\u1EBFu PaCO\u2082 th\u1EF1c t\u1EBF < PaCO\u2082 k\u1EF3 v\u1ECDng: C\xF3 KI\u1EC0M H\xD4 H\u1EA4P ph\u1ED1i h\u1EE3p (th\xF4ng kh\xED qu\xE1 m\u1EE9c).\n\u2022 N\u1EBFu PaCO\u2082 th\u1EF1c t\u1EBF > PaCO\u2082 k\u1EF3 v\u1ECDng: C\xF3 TOAN H\xD4 H\u1EA4P ph\u1ED1i h\u1EE3p (suy ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p nguy hi\u1EC3m).",
      pearlsAndWarnings: "M\u1EE9c b\xF9 tr\u1EEB h\xF4 h\u1EA5p t\u1ED1i \u0111a c\u1EE7a c\u01A1 th\u1EC3 ng\u01B0\u1EDDi b\xECnh th\u01B0\u1EDDng ch\u1EC9 c\xF3 th\u1EC3 h\u1EA1 PaCO\u2082 xu\u1ED1ng \u0111\u1EBFn kho\u1EA3ng 10 - 12 mmHg. Kh\xF4ng th\u1EC3 h\u1EA1 th\u1EA5p h\u01A1n \u0111\u01B0\u1EE3c n\u1EEFa v\xEC c\xF4ng th\u1EDF kh\xF4ng ch\u1ECBu \u0111\u1EF1ng n\u1ED5i.",
      tags: ["Winter", "b\xF9 tr\u1EEB", "toan chuy\u1EC3n h\xF3a", "PaCO2 k\u1EF3 v\u1ECDng"]
    },
    {
      id: "pf-ratio",
      term: "P/F Ratio (PaO\u2082/FiO\u2082)",
      fullName: "Ch\u1EC9 s\u1ED1 Horovitz / P/F Ratio - Ph\xE2n lo\u1EA1i H\u1ED9i ch\u1EE9ng Suy H\xF4 H\u1EA5p C\u1EA5p Ti\u1EBFn Tri\u1EC3n (ARDS)",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "> 400 \u2013 500 mmHg \u1EDF ng\u01B0\u1EDDi b\xECnh th\u01B0\u1EDDng",
      definition: "T\u1EF7 s\u1ED1 gi\u1EEFa ph\xE2n \xE1p oxy \u0111\u1ED9ng m\u1EA1ch (PaO\u2082, t\xEDnh b\u1EB1ng mmHg) chia cho ph\xE2n su\u1EA5t oxy h\xEDt v\xE0o (FiO\u2082, bi\u1EC3u di\u1EC5n d\u01B0\u1EDBi d\u1EA1ng s\u1ED1 th\u1EADp ph\xE2n t\u1EEB 0.21 \u0111\u1EBFn 1.0).",
      clinicalSignificance: "Ti\xEAu chu\u1EA9n Berlin ch\u1EA9n \u0111o\xE1n ph\xE2n \u0111\u1ED9 ARDS (\u1EDF m\u1EE9c PEEP \u2265 5 cmH\u2082O):\n\u2022 P/F 201 \u2013 300: ARDS Nh\u1EB9 (Mild ARDS)\n\u2022 P/F 101 \u2013 200: ARDS Trung b\xECnh (Moderate ARDS)\n\u2022 P/F \u2264 100: ARDS N\u1EB7ng (Severe ARDS - Nguy c\u01A1 t\u1EED vong r\u1EA5t cao)",
      pearlsAndWarnings: "L\u01B0u \xFD m\u1EABu s\u1ED1: N\u1EBFu FiO\u2082 l\xE0 40%, ph\u1EA3i chia cho 0.40 (kh\xF4ng chia cho 40). V\xED d\u1EE5: PaO\u2082 80 mmHg khi th\u1EDF FiO\u2082 40% -> P/F = 80 / 0.40 = 200 (ARDS trung b\xECnh).",
      tags: ["P/F ratio", "Horovitz", "Berlin", "ARDS"]
    },
    {
      id: "aa-gradient",
      term: "A-a Gradient (P(A-a)O\u2082)",
      fullName: "Alveolar-arterial Oxygen Gradient - Ch\xEAnh l\u1EC7ch \xE1p l\u1EF1c Oxy gi\u1EEFa Ph\u1EBF Nang v\xE0 \u0110\u1ED9ng M\u1EA1ch",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "B\xECnh th\u01B0\u1EDDng: 5 \u2013 15 mmHg \u1EDF ng\u01B0\u1EDDi tr\u1EBB. \u01AF\u1EDBc t\xEDnh theo tu\u1ED5i: (Tu\u1ED5i / 4) + 4 mmHg",
      definition: "Hi\u1EC7u s\u1ED1 gi\u1EEFa ph\xE2n \xE1p oxy trong ph\u1EBF nang (P_A_O\u2082) v\xE0 ph\xE2n \xE1p oxy \u0111o \u0111\u01B0\u1EE3c trong m\xE1u \u0111\u1ED9ng m\u1EA1ch (PaO\u2082): P(A-a)O\u2082 = P_A_O\u2082 - PaO\u2082.",
      clinicalSignificance: "Gi\xFAp ph\xE2n bi\u1EC7t nguy\xEAn nh\xE2n g\xE2y gi\u1EA3m oxy m\xE1u:\n\u2022 A-a gradient B\xCCNH TH\u01AF\u1EDCNG: Gi\u1EA3m oxy m\xE1u ho\xE0n to\xE0n do gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang (ng\u1ED9 \u0111\u1ED9c thu\u1ED1c ng\u1EE7, nh\u01B0\u1EE3c c\u01A1) ho\u1EB7c do \u0111\u1ED9 cao (\xE1p su\u1EA5t kh\xED quy\u1EC3n gi\u1EA3m). Ph\u1ED5i ho\xE0n to\xE0n l\xE0nh l\u1EB7n!\n\u2022 A-a gradient T\u0102NG CAO: C\xF3 t\u1ED5n th\u01B0\u01A1ng m\xE0ng ph\u1EBF nang - mao m\u1EA1ch ho\u1EB7c b\u1EA5t t\u01B0\u01A1ng x\u1EE9ng V/Q (Vi\xEAm ph\u1ED5i, ARDS, Ph\xF9 ph\u1ED5i, Thuy\xEAn t\u1EAFc ph\u1ED5i PE).",
      pearlsAndWarnings: "A-a gradient t\u0103ng v\u1ECDt khi th\u1EDF FiO\u2082 cao. Do \u0111\xF3 gi\xE1 tr\u1ECB ch\u1EA9n \u0111o\xE1n ch\xEDnh x\xE1c nh\u1EA5t l\xE0 khi b\u1EC7nh nh\xE2n th\u1EDF kh\xED ph\xF2ng (FiO\u2082 = 21%).",
      tags: ["A-a gradient", "ph\u1EBF nang mao m\u1EA1ch", "thuy\xEAn t\u1EAFc ph\u1ED5i", "V/Q"]
    },
    {
      id: "alveolar-gas-equation",
      term: "Ph\u01B0\u01A1ng Tr\xECnh Kh\xED Ph\u1EBF Nang (P_A_O\u2082)",
      fullName: "Alveolar Gas Equation - Ph\u01B0\u01A1ng tr\xECnh t\xEDnh ph\xE2n \xE1p oxy trong ph\u1EBF nang",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "~100 mmHg khi th\u1EDF kh\xED tr\u1EDDi \u1EDF m\u1EF1c n\u01B0\u1EDBc bi\u1EC3n",
      definition: "P_A_O\u2082 = (P_atm - P_H2O) \xD7 FiO\u2082 - (PaCO\u2082 / R). V\u1EDBi P_atm = 760 mmHg, P_H2O = 47 mmHg, R (th\u01B0\u01A1ng s\u1ED1 h\xF4 h\u1EA5p) \u2248 0.8. Khi th\u1EDF kh\xED ph\xF2ng: P_A_O\u2082 \u2248 150 - (PaCO\u2082 / 0.8).",
      clinicalSignificance: "Cho bi\u1EBFt l\u01B0\u1EE3ng oxy t\u1ED1i \u0111a c\xF3 th\u1EC3 s\u1EB5n s\xE0ng khu\u1EBFch t\xE1n t\u1EEB l\xF2ng ph\u1EBF nang v\xE0o mao m\u1EA1ch ph\u1ED5i. L\xE0 n\u1EC1n t\u1EA3ng b\u1EAFt bu\u1ED9c \u0111\u1EC3 t\xEDnh A-a gradient.",
      pearlsAndWarnings: "Khi PaCO\u2082 t\u0103ng cao (\u1EE9 tr\u1EC7 th\xF4ng kh\xED), theo ph\u01B0\u01A1ng tr\xECnh ph\u1EBF nang, l\u01B0\u1EE3ng CO\u2082 cho\xE1n ch\u1ED7 s\u1EBD \u0111\u1EA9y v\u0103ng O\u2082 ra kh\u1ECFi ph\u1EBF nang, l\xE0m P_A_O\u2082 t\u1EE5t xu\u1ED1ng v\xE0 g\xE2y thi\u1EBFu oxy m\xE1u th\u1EE9 ph\xE1t.",
      tags: ["P_A_O2", "ph\u1EBF nang", "kh\xED tr\u1EDDi", "th\u01B0\u01A1ng s\u1ED1 h\xF4 h\u1EA5p"]
    },
    {
      id: "hypoxic-drive",
      term: "Hypoxic Drive (K\xEDch th\xEDch h\xF4 h\u1EA5p do thi\u1EBFu oxy)",
      fullName: "C\u01A1 ch\u1EBF k\xEDch th\xEDch th\u1EE5 th\u1EC3 ngo\u1EA1i vi do gi\u1EA3m PaO\u2082 \u1EDF b\u1EC7nh nh\xE2n \u1EE9 CO\u2082 m\u1EA1n t\xEDnh",
      category: "Sinh l\xFD h\u1ECDc",
      definition: "\u1EDE ng\u01B0\u1EDDi kh\u1ECFe m\u1EA1nh, \u0111\u1ED9ng l\u1EF1c ch\xEDnh k\xEDch th\xEDch h\xF4 h\u1EA5p l\xE0 PaCO\u2082 t\xE1c \u0111\u1ED9ng l\xEAn th\u1EE5 c\u1EA3m th\u1EC3 h\xF3a h\u1ECDc trung \u01B0\u01A1ng \u1EDF h\xE0nh n\xE3o. \u1EDE b\u1EC7nh nh\xE2n suy h\xF4 h\u1EA5p m\u1EA1n (nh\u01B0 COPD), PaCO\u2082 t\u0103ng cao k\xE9o d\xE0i l\xE0m th\u1EE5 c\u1EA3m th\u1EC3 trung \u01B0\u01A1ng b\u1ECB tr\u01A1 h\xF3a; trung t\xE2m h\xF4 h\u1EA5p l\xFAc n\xE0y ho\xE0n to\xE0n ph\u1EE5 thu\u1ED9c v\xE0o k\xEDch th\xEDch thi\u1EBFu oxy m\xE1u (PaO\u2082 th\u1EA5p) t\u1EEB th\u1EE5 c\u1EA3m th\u1EC3 ngo\u1EA1i vi \u1EDF xoang c\u1EA3nh v\xE0 quai \u0111\u1ED9ng m\u1EA1ch ch\u1EE7.",
      clinicalSignificance: 'N\u1EBFu cung c\u1EA5p oxy li\u1EC1u qu\xE1 cao kh\xF4ng ki\u1EC3m so\xE1t (FiO\u2082 100% ho\u1EB7c th\u1EDF mask t\xFAi), n\u1ED3ng \u0111\u1ED9 PaO\u2082 t\u0103ng v\u1ECDt s\u1EBD tri\u1EC7t ti\xEAu xung \u0111\u1ED9ng th\u1EA7n kinh "Hypoxic drive", khi\u1EBFn b\u1EC7nh nh\xE2n ng\u1EEBng th\u1EDF, \u1EE9 CO\u2082 c\u1EA5p t\xEDnh v\xE0 h\xF4n m\xEA do toan m\xE1u n\xE3o.',
      pearlsAndWarnings: "M\u1EE5c ti\xEAu SpO\u2082 \u1EDF b\u1EC7nh nh\xE2n COPD c\xF3 nguy c\u01A1 suy h\xF4 h\u1EA5p t\u0103ng CO\u2082 m\xE1u l\xE0 88 \u2013 92% (d\xF9ng oxy li\u1EC1u chu\u1EA9n qua van Venturi 24% - 28%), tuy\u1EC7t \u0111\u1ED1i kh\xF4ng cho th\u1EDF oxy d\xF2ng cao kh\xF4ng ki\u1EC3m so\xE1t!",
      tags: ["Hypoxic drive", "COPD", "th\u1EE5 th\u1EC3 h\xF3a h\u1ECDc", "\u1EE9c ch\u1EBF h\xF4 h\u1EA5p"]
    },
    {
      id: "oxyhemoglobin-curve",
      term: "\u0110\u01B0\u1EDDng Cong Ph\xE2n Ly Oxyhemoglobin",
      fullName: "Oxyhemoglobin Dissociation Curve - M\u1ED1i li\xEAn h\u1EC7 S-d\u1EA1ng gi\u1EEFa PaO\u2082 v\xE0 SaO\u2082",
      category: "Sinh l\xFD h\u1ECDc",
      normalRange: "P50 \u2248 26.6 mmHg (\u0111i\u1EC3m SaO\u2082 = 50%)",
      definition: "\u0110\u1ED3 th\u1ECB h\xECnh ch\u1EEF S ph\u1EA3n \xE1nh t\xEDnh ch\u1EA5t g\u1EAFn nh\u1EA3 oxy c\xF3 t\xEDnh t\u01B0\u01A1ng h\u1ED7 (cooperative binding) c\u1EE7a 4 chu\u1ED7i heme tr\xEAn ph\xE2n t\u1EED Hemoglobin.",
      clinicalSignificance: "\u2022 \u0110o\u1EA1n ngang (Plateau): PaO\u2082 t\u1EEB 60 \u0111\u1EBFn 100 mmHg, SaO\u2082 duy tr\xEC cao > 90%. \u0110\xE2y l\xE0 v\xF9ng an to\xE0n d\u1EF1 tr\u1EEF oxy cho c\u01A1 th\u1EC3.\n\u2022 \u0110o\u1EA1n d\u1ED1c \u0111\u1EE9ng (Steep slope): PaO\u2082 < 60 mmHg, ch\u1EC9 c\u1EA7n PaO\u2082 t\u1EE5t nh\u1EB9 m\u1ED9t ch\xFAt l\xE0 SaO\u2082 lao d\u1ED1c th\u1EA3m kh\u1ED1c, \u0111\u01B0a b\u1EC7nh nh\xE2n v\xE0o suy s\u1EE5p thi\u1EBFu oxy m\xF4 t\u1ED1i c\u1EA5p!",
      pearlsAndWarnings: "\u0110i\u1EC3m m\u1ED1c sinh t\u1EED c\u1EA7n ghi nh\u1EDB: PaO\u2082 = 60 mmHg t\u01B0\u01A1ng \u1EE9ng v\u1EDBi SaO\u2082 = 90%. N\u1EBFu SpO\u2082 t\u1EE5t d\u01B0\u1EDBi 90%, b\u1EC7nh nh\xE2n \u0111ang \u1EDF m\xE9p v\u1EF1c th\u1EB3m c\u1EE7a \u0111o\u1EA1n d\u1ED1c \u0111\u1EE9ng!",
      tags: ["\u0110\u01B0\u1EDDng cong oxy", "P50", "SaO2", "PaO2 60"]
    },
    {
      id: "bohr-effect",
      term: "Hi\u1EC7u \u1EE8ng Bohr (L\u1EC7ch \u0110\u01B0\u1EDDng Cong Oxy)",
      fullName: "Bohr Effect - S\u1EF1 d\u1ECBch chuy\u1EC3n \u0111\u01B0\u1EDDng cong ph\xE2n ly Oxyhemoglobin sang Ph\u1EA3i / Tr\xE1i",
      category: "Sinh l\xFD h\u1ECDc",
      definition: "S\u1EF1 thay \u0111\u1ED5i \xE1i l\u1EF1c c\u1EE7a Hemoglobin \u0111\u1ED1i v\u1EDBi Oxy d\u01B0\u1EDBi t\xE1c \u0111\u1ED9ng c\u1EE7a pH, PaCO\u2082, nhi\u1EC7t \u0111\u1ED9 v\xE0 n\u1ED3ng \u0111\u1ED9 2,3-DPG trong h\u1ED3ng c\u1EA7u.",
      clinicalSignificance: "\u2022 L\u1EC7ch PH\u1EA2I (Cadet, face right!): T\u0103ng CO\u2082, Gi\u1EA3m pH (Toan), T\u0103ng 2,3-DPG, T\u0103ng nhi\u1EC7t \u0111\u1ED9 (S\u1ED1t). \xC1i l\u1EF1c Hb v\u1EDBi O\u2082 gi\u1EA3m -> D\u1EC5 d\xE0ng nh\u1EA3 O\u2082 v\xE0o m\xF4 \u0111ang \u0111\xF3i oxy v\xE0 ho\u1EA1t \u0111\u1ED9ng m\u1EA1nh.\n\u2022 L\u1EC7ch TR\xC1I: Gi\u1EA3m CO\u2082, T\u0103ng pH (Ki\u1EC1m), Gi\u1EA3m 2,3-DPG, H\u1EA1 th\xE2n nhi\u1EC7t, Ng\u1ED9 \u0111\u1ED9c CO. \xC1i l\u1EF1c Hb v\u1EDBi O\u2082 t\u0103ng -> Gi\u1EEF ch\u1EB7t O\u2082, m\xF4 b\u1ECB thi\u1EBFu oxy d\xF9 m\xE1u \u0111\u1ECF au.",
      pearlsAndWarnings: "M\u1EB9o ghi nh\u1EDB: L\u1EC7ch PH\u1EA2I g\u1EB7p khi m\xF4 v\u1EADn \u0111\u1ED9ng t\u1ED1i \u0111a (n\xF3ng, toan, nhi\u1EC1u CO\u2082, s\u1ED1t). L\u1EC7ch TR\xC1I g\u1EB7p khi c\u01A1 th\u1EC3 l\u1EA1nh, ki\u1EC1m, h\u1EA1 th\xE2n nhi\u1EC7t.",
      tags: ["Bohr", "l\u1EC7ch ph\u1EA3i", "l\u1EC7ch tr\xE1i", "nh\u1EA3 oxy"]
    },
    {
      id: "goldmark",
      term: "GOLDMARK",
      fullName: "B\u1EA3ng m\xE3 nguy\xEAn nh\xE2n g\xE2y Toan Chuy\u1EC3n H\xF3a T\u0102NG Anion Gap hi\u1EC7n \u0111\u1EA1i",
      category: "B\u1EA3ng m\xE3 l\xE2m s\xE0ng",
      definition: "B\u1EA3ng m\xE3 hi\u1EC7n \u0111\u1EA1i thay th\u1EBF cho MUDPILES truy\u1EC1n th\u1ED1ng \u0111\u1EC3 li\u1EC7t k\xEA c\xE1c nguy\xEAn nh\xE2n g\xE2y toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap (AG > 16-18):",
      clinicalSignificance: "\u2022 G - Glycols: Ethylene glycol (ch\u1EA5t ch\u1ED1ng \u0111\xF4ng xe h\u01A1i), Propylene glycol\n\u2022 O - Oxoproline (5-oxoproline): D\xF9ng Paracetamol li\u1EC1u cao k\xE9o d\xE0i \u1EDF ph\u1EE5 n\u1EEF suy dinh d\u01B0\u1EE1ng\n\u2022 L - L-Lactate: Thi\u1EBFu oxy m\xF4, s\u1ED1c nhi\u1EC5m khu\u1EA9n, co gi\u1EADt, s\u1ED1c tim\n\u2022 D - D-Lactate: H\u1ED9i ch\u1EE9ng ru\u1ED9t ng\u1EAFn, vi khu\u1EA9n l\xEAn men carbohydrate\n\u2022 M - Methanol: C\u1ED3n c\xF4ng nghi\u1EC7p, chuy\u1EC3n h\xF3a th\xE0nh acid formic g\xE2y m\xF9 m\u1EAFt\n\u2022 A - Aspirin: Ng\u1ED9 \u0111\u1ED9c Salicylate (toan CH + ki\u1EC1m h\xF4 h\u1EA5p h\u1ED7n h\u1EE3p)\n\u2022 R - Renal failure: Suy th\u1EADn c\u1EA5p/m\u1EA1n, t\xEDch t\u1EE5 acid h\u1EEFu c\u01A1, phosphate, sulfate\n\u2022 K - Ketoacidosis: Toan ceton \u0111\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA), toan ceton do r\u01B0\u1EE3u, toan do nh\u1ECBn \u0111\xF3i l\xE2u ng\xE0y",
      pearlsAndWarnings: "L-Lactate v\xE0 DKA l\xE0 2 nguy\xEAn nh\xE2n ph\u1ED5 bi\u1EBFn nh\u1EA5t chi\u1EBFm h\u01A1n 80% c\xE1c ca toan t\u0103ng AG trong th\u1EF1c h\xE0nh c\u1EA5p c\u1EE9u v\xE0 ICU.",
      tags: ["GOLDMARK", "MUDPILES", "toan chuy\u1EC3n h\xF3a", "t\u0103ng AG"]
    },
    {
      id: "hardups",
      term: "HARDUPS",
      fullName: "B\u1EA3ng m\xE3 nguy\xEAn nh\xE2n g\xE2y Toan Chuy\u1EC3n H\xF3a Anion Gap B\xCCNH TH\u01AF\u1EDCNG (T\u0103ng Clo m\xE1u)",
      category: "B\u1EA3ng m\xE3 l\xE2m s\xE0ng",
      definition: "Li\u1EC7t k\xEA c\xE1c nguy\xEAn nh\xE2n g\xE2y m\u1EA5t ion Bicarbonate qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a ho\u1EB7c qua th\u1EADn, d\u1EABn \u0111\u1EBFn vi\u1EC7c th\u1EADn gi\u1EEF ion Clorid l\u1EA1i \u0111\u1EC3 trung h\xF2a \u0111i\u1EC7n t\xEDch (Hyperchloraemic Metabolic Acidosis):",
      clinicalSignificance: "\u2022 H - Hyperalimentation: Nu\xF4i d\u01B0\u1EE1ng t\u0129nh m\u1EA1ch ho\xE0n to\xE0n (TPN)\n\u2022 A - Acetazolamide: Thu\u1ED1c \u1EE9c ch\u1EBF men carbonic anhydrase g\xE2y m\u1EA5t HCO\u2083\u207B qua n\u01B0\u1EDBc ti\u1EC3u\n\u2022 R - Renal Tubular Acidosis: Toan h\xF3a \u1ED1ng th\u1EADn Type 1 (xa), Type 2 (g\u1EA7n), Type 4\n\u2022 D - Diarrhoea: Ti\xEAu ch\u1EA3y c\u1EA5p m\u1EA5t d\u1ECBch ru\u1ED9t gi\xE0u bicarbonate\n\u2022 U - Uretero-enterostomy: Ph\u1EABu thu\u1EADt d\u1EABn l\u01B0u ni\u1EC7u qu\u1EA3n v\xE0o \u0111\u1EA1i tr\xE0ng sigma\n\u2022 P - Pancreatic / biliary fistula: R\xF2 d\u1ECBch t\u1EE5y, d\u1EABn l\u01B0u m\u1EADt k\xE9o d\xE0i\n\u2022 S - Saline (0.9% NaCl): Truy\u1EC1n l\u01B0\u1EE3ng l\u1EDBn d\u1ECBch mu\u1ED1i \u0111\u1EB3ng tr\u01B0\u01A1ng ch\u1EE9a n\u1ED3ng \u0111\u1ED9 Cl\u207B cao (154 mmol/L so v\u1EDBi 100 mmol/L trong m\xE1u)",
      pearlsAndWarnings: "Ph\u1ED5 bi\u1EBFn nh\u1EA5t t\u1EA1i ph\xF2ng c\u1EA5p c\u1EE9u l\xE0: Ti\xEAu ch\u1EA3y m\u1EA5t bicarb v\xE0 truy\u1EC1n qu\xE1 nhi\u1EC1u dung d\u1ECBch NaCl 0.9% trong h\u1ED3i s\u1EE9c s\u1ED1c!",
      tags: ["HARDUPS", "toan t\u0103ng clo", "AG b\xECnh th\u01B0\u1EDDng", "ti\xEAu ch\u1EA3y"]
    },
    {
      id: "allens-test",
      term: "Modified Allen's Test",
      fullName: "Nghi\u1EC7m ph\xE1p Allen c\u1EA3i bi\xEAn ki\u1EC3m tra tu\u1EA7n ho\xE0n b\xE0ng h\u1EC7 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5",
      category: "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m",
      normalRange: "M\xE0u h\u1ED3ng tr\u1EDF l\u1EA1i l\xF2ng b\xE0n tay trong v\xF2ng < 5 \u0111\u1EBFn 7 gi\xE2y (D\u01B0\u01A1ng t\xEDnh = An to\xE0n)",
      definition: "K\u1EF9 thu\u1EADt l\xE2m s\xE0ng b\u1EAFt bu\u1ED9c th\u1EF1c hi\u1EC7n tr\u01B0\u1EDBc khi ch\u1ECDc kim l\u1EA5y m\xE1u \u0111\u1ED9ng m\u1EA1ch quay: \xC9p ch\u1EB7t \u0111\u1ED3ng th\u1EDDi c\u1EA3 \u0111\u1ED9ng m\u1EA1ch quay v\xE0 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 cho \u0111\u1EBFn khi l\xF2ng b\xE0n tay tr\u1EAFng b\u1EC7ch, sau \u0111\xF3 bu\xF4ng tay \u0111\xE8 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 v\xE0 quan s\xE1t th\u1EDDi gian t\u01B0\u1EDBi m\xE1u tr\u1EDF l\u1EA1i.",
      clinicalSignificance: "\u0110\u1EA3m b\u1EA3o \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 c\xF3 cung l\u01B0\u1EE3ng b\xE0ng h\u1EC7 t\u1ED1t qua cung gan tay n\xF4ng v\xE0 s\xE2u, ph\xF2ng ng\u1EEBa bi\u1EBFn ch\u1EE9ng ho\u1EA1i t\u1EED ng\xF3n tay n\u1EBFu ch\u1EB3ng may \u0111\u1ED9ng m\u1EA1ch quay b\u1ECB t\u1EAFc huy\u1EBFt kh\u1ED1i ho\u1EB7c co th\u1EAFt k\xE9o d\xE0i sau ch\u1ECDc.",
      pearlsAndWarnings: "N\u1EBFu b\xE0n tay v\u1EABn nh\u1EE3t nh\u1EA1t tr\u1EAFng b\u1EC7ch sau 10 gi\xE2y (nghi\u1EC7m ph\xE1p \xE2m t\xEDnh): TUY\u1EC6T \u0110\u1ED0I KH\xD4NG CH\u1ECCC \u0110\u1ED8NG M\u1EA0CH QUAY \u1EDE TAY \u0110\xD3! Chuy\u1EC3n sang tay \u0111\u1ED1i di\u1EC7n ho\u1EB7c ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch c\xE1nh tay/\u0111\u1ED9ng m\u1EA1ch \u0111\xF9i.",
      tags: ["Allen", "th\u1EE7 thu\u1EADt", "\u0111\u1ED9ng m\u1EA1ch quay", "\u0111\u1ED9ng m\u1EA1ch tr\u1EE5"]
    },
    {
      id: "vbg-vs-abg",
      term: "VBG vs ABG (Kh\xED M\xE1u T\u0129nh M\u1EA1ch vs \u0110\u1ED9ng M\u1EA1ch)",
      fullName: "So s\xE1nh kh\xED m\xE1u t\u0129nh m\u1EA1ch (Venous Blood Gas) v\xE0 kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch (Arterial Blood Gas)",
      category: "K\u1EF9 thu\u1EADt x\xE9t nghi\u1EC7m",
      definition: "VBG l\xE0 x\xE9t nghi\u1EC7m l\u1EA5y m\xE1u t\u1EEB t\u0129nh m\u1EA1ch ngo\u1EA1i vi ho\u1EB7c catheter t\u0129nh m\u1EA1ch trung t\xE2m, \xEDt \u0111au v\xE0 \xEDt nguy c\u01A1 bi\u1EBFn ch\u1EE9ng h\u01A1n ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch.",
      clinicalSignificance: "T\u01B0\u01A1ng quan gi\u1EEFa VBG v\xE0 ABG \u1EDF b\u1EC7nh nh\xE2n huy\u1EBFt \u0111\u1ED9ng \u1ED5n \u0111\u1ECBnh:\n\u2022 pH t\u0129nh m\u1EA1ch th\u1EA5p h\u01A1n \u0111\u1ED9ng m\u1EA1ch kho\u1EA3ng 0.03 \u2013 0.05 \u0111\u01A1n v\u1ECB\n\u2022 PvCO\u2082 cao h\u01A1n PaCO\u2082 kho\u1EA3ng 4 \u2013 6 mmHg\n\u2022 HCO\u2083\u207B t\u0129nh m\u1EA1ch g\u1EA7n t\u01B0\u01A1ng \u0111\u01B0\u01A1ng \u0111\u1ED9ng m\u1EA1ch (ch\xEAnh l\u1EC7ch 1 \u2013 2 mmol/L)\n\u2022 Ch\u1EC9 \u0111\u1ECBnh h\u1EE3p l\xFD c\u1EE7a VBG: \u0110\xE1nh gi\xE1 theo d\xF5i DKA (nhi\u1EC5m toan ceton), lo\u1EA1i tr\u1EEB t\u0103ng CO\u2082 m\xE1u n\u1EBFu PvCO\u2082 < 45 mmHg.",
      pearlsAndWarnings: "TUY\u1EC6T \u0110\u1ED0I KH\xD4NG D\xD9NG VBG \u0110\u1EC2 \u0110\xC1NH GI\xC1 OXY H\xD3A M\xC1U! PvO\u2082 t\u0129nh m\u1EA1ch (~40 mmHg) kh\xF4ng c\xF3 m\u1ED1i t\u01B0\u01A1ng quan \u0111\xE1ng tin c\u1EADy n\xE0o v\u1EDBi PaO\u2082 \u0111\u1ED9ng m\u1EA1ch.",
      tags: ["VBG", "ABG", "kh\xED m\xE1u t\u0129nh m\u1EA1ch", "so s\xE1nh"]
    },
    {
      id: "lactate",
      term: "Lactate M\xE1u (Lactic Acid)",
      fullName: "N\u1ED3ng \u0111\u1ED9 Acid Lactic huy\u1EBFt t\u01B0\u01A1ng - Ch\u1EC9 \u0111i\u1EC3m chuy\u1EC3n h\xF3a k\u1EF5 kh\xED v\xE0 t\u01B0\u1EDBi m\xE1u m\xF4",
      category: "Ch\u1EC9 s\u1ED1 c\u01A1 b\u1EA3n",
      normalRange: "0.5 \u2013 2.0 mmol/L (Ng\u01B0\u1EE1ng nguy c\u01A1 nhi\u1EC5m toan: > 2.0 mmol/L; Toan Lactic n\u1EB7ng: > 4.0 mmol/L)",
      definition: "S\u1EA3n ph\u1EA9m ph\u1EE5 c\u1EE7a qu\xE1 tr\xECnh \u0111\u01B0\u1EDDng ph\xE2n k\u1EF5 kh\xED khi m\xF4 t\u1EBF b\xE0o b\u1ECB thi\u1EBFu oxy, pyruvate chuy\u1EC3n th\xE0nh lactate d\u01B0\u1EDBi t\xE1c d\u1EE5ng c\u1EE7a men LDH.",
      clinicalSignificance: "L\xE0 tr\u1EE5 c\u1ED9t ch\xEDnh trong ph\xE1c \u0111\u1ED3 C\u1EA5p c\u1EE9u S\u1ED1c nhi\u1EC5m khu\u1EA9n (Surviving Sepsis Campaign 1-hour bundle). Lactate > 2.0 mmol/L l\xE0 d\u1EA5u hi\u1EC7u suy gi\u1EA3m t\u01B0\u1EDBi m\xE1u vi tu\u1EA7n ho\xE0n; Lactate > 4.0 mmol/L bi\u1EC3u th\u1ECB nguy c\u01A1 t\u1EED vong r\u1EA5t cao.",
      pearlsAndWarnings: "Lactate t\u0103ng kh\xF4ng ch\u1EC9 do thi\u1EBFu oxy m\xF4 (Type A: s\u1ED1c, thi\u1EBFu m\xE1u, co gi\u1EADt) m\xE0 c\xF2n do suy gi\u1EA3m \u0111\xE0o th\u1EA3i \u1EDF gan ho\u1EB7c thu\u1ED1c (Type B: Metformin, suy gan, ng\u1ED9 \u0111\u1ED9c c\u1ED3n, ung th\u01B0 h\u1EA1ch).",
      tags: ["Lactate", "s\u1ED1c nhi\u1EC5m khu\u1EA9n", "toan lactic", "thi\u1EBFu oxy m\xF4"]
    },
    {
      id: "osmolar-gap",
      term: "Osmolar Gap (Kho\u1EA3ng Tr\u1ED1ng Th\u1EA9m Th\u1EA5u)",
      fullName: "Serum Osmolar Gap - Ch\xEAnh l\u1EC7ch \xE1p su\u1EA5t th\u1EA9m th\u1EA5u \u0111o \u0111\u01B0\u1EE3c v\xE0 t\xEDnh to\xE1n",
      category: "C\xF4ng th\u1EE9c & T\u1EF7 s\u1ED1",
      normalRange: "< 10 mOsm/kg H\u2082O",
      definition: "Hi\u1EC7u s\u1ED1 gi\u1EEFa \xC1p su\u1EA5t th\u1EA9m th\u1EA5u \u0111o b\u1EB1ng m\xE1y \u0111o \u0111i\u1EC3m \u0111\xF4ng v\xE0 \xC1p su\u1EA5t th\u1EA9m th\u1EA5u t\xEDnh to\xE1n: Osmolar Gap = Osm \u0111o \u0111\u01B0\u1EE3c - [2 \xD7 Na\u207A + Glucose (mmol/L) + Ure (mmol/L)].",
      clinicalSignificance: "Osmolar Gap > 10 mOsm/kg \u1EDF b\u1EC7nh nh\xE2n toan chuy\u1EC3n h\xF3a t\u0103ng Anion Gap g\u1EE3i \xFD ng\u1ED9 \u0111\u1ED9c c\xE1c lo\u1EA1i c\u1ED3n \u0111\u1ED9c ngo\u1EA1i sinh: Methanol, Ethylene glycol, Isopropanol.",
      pearlsAndWarnings: "Trong giai \u0111o\u1EA1n mu\u1ED9n c\u1EE7a ng\u1ED9 \u0111\u1ED9c methanol hay ethylene glycol, khi to\xE0n b\u1ED9 c\u1ED3n \u0111\xE3 b\u1ECB oxy h\xF3a th\xE0nh acid (formic acid ho\u1EB7c oxalic acid), Osmolar gap c\xF3 th\u1EC3 tr\u1EDF v\u1EC1 b\xECnh th\u01B0\u1EDDng trong khi Anion Gap t\u0103ng r\u1EA5t cao!",
      tags: ["Osmolar Gap", "\xE1p su\u1EA5t th\u1EA9m th\u1EA5u", "Methanol", "Ethylene glycol"]
    },
    {
      id: "chloride-responsive",
      term: "Ki\u1EC1m Chuy\u1EC3n H\xF3a Nh\u1EA1y Clorid vs Kh\xE1ng Clorid",
      fullName: "Chloride-Responsive vs Chloride-Resistant Metabolic Alkalosis",
      category: "B\u1EA3ng m\xE3 l\xE2m s\xE0ng",
      definition: "Ph\xE2n lo\u1EA1i nguy\xEAn nh\xE2n ki\u1EC1m chuy\u1EC3n h\xF3a d\u1EF1a v\xE0o n\u1ED3ng \u0111\u1ED9 Clorid trong n\u01B0\u1EDBc ti\u1EC3u (Spot Urine Chloride):",
      clinicalSignificance: "\u2022 Nh\u1EA1y c\u1EA3m v\u1EDBi Clorid (U_Cl < 15 \u2013 20 mEq/L): M\u1EA5t d\u1ECBch d\u1EA1 d\xE0y do n\xF4n \xF3i nhi\u1EC1u, h\xFAt sonde d\u1EA1 d\xE0y, s\u1EED d\u1EE5ng thu\u1ED1c l\u1EE3i ti\u1EC3u quai. \u0110i\u1EC1u tr\u1ECB kh\u1ECFi b\u1EB1ng b\xF9 d\u1ECBch NaCl 0.9% v\xE0 KCl.\n\u2022 Kh\xE1ng Clorid (U_Cl > 25 mEq/L): Th\u1EC3 t\xEDch tu\u1EA7n ho\xE0n th\u01B0\u1EDDng t\u0103ng, t\u0103ng huy\u1EBFt \xE1p do th\u1EEBa mineralocorticoid (H\u1ED9i ch\u1EE9ng Conn, Cushing, h\u1EB9p \u0111\u1ED9ng m\u1EA1ch th\u1EADn, d\xF9ng cam th\u1EA3o licorice). Kh\xF4ng \u0111\xE1p \u1EE9ng v\u1EDBi truy\u1EC1n mu\u1ED1i NaCl 0.9%.",
      pearlsAndWarnings: "Trong ki\u1EC1m chuy\u1EC3n h\xF3a do n\xF4n \xF3i, th\u1EADn b\u1ECB m\u1EA5t Kali nghi\xEAm tr\u1ECDng v\xEC c\u01A1 th\u1EC3 c\u1ED1 gi\u1EEF Na\u207A b\u1EB1ng c\xE1ch \u0111\xE0o th\u1EA3i K\u207A v\xE0 H\u207A \u1EDF \u1ED1ng l\u01B0\u1EE3n xa. C\u1EA7n b\xF9 \u0111\u1ED3ng th\u1EDDi c\u1EA3 Kali \u0111\u1EC3 \u0111\u1EA3o ng\u01B0\u1EE3c t\xECnh tr\u1EA1ng ki\u1EC1m m\xE1u.",
      tags: ["ki\u1EC1m chuy\u1EC3n h\xF3a", "nh\u1EA1y clo", "kh\xE1ng clo", "n\xF4n \xF3i"]
    }
  ];
  var ABG_GLOSSARY = ABG_GLOSSARY_TERMS;

  // src/content/knowledge-vault/cdss/abg/abg-ui.ts
  var ABG_PRESETS = [
    {
      name: "B\xECnh th\u01B0\u1EDDng",
      desc: "Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch chu\u1EA9n (Kh\xED ph\xF2ng FiO2 21%)",
      input: { unit: "mmHg", pH: 7.4, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, k: 4, cl: 102, albumin: 40, lactate: 1, patientAge: 35 }
    },
    {
      name: "Toan ceton DKA",
      desc: "\u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng bi\u1EBFn ch\u1EE9ng toan ceton n\u1EB7ng",
      input: { unit: "mmHg", pH: 7.15, pCO2: 20, pO2: 98, hco3: 7, be: -19, sao2: 99, fio2: 21, na: 132, k: 5.2, cl: 96, albumin: 38, glucose: 24.5, lactate: 1.8, patientAge: 28 }
    },
    {
      name: "S\u1ED1c Toan Lactic",
      desc: "S\u1ED1c nhi\u1EC5m khu\u1EA9n suy \u0111a t\u1EA1ng, toan chuy\u1EC3n h\xF3a n\u1EB7ng",
      input: { unit: "mmHg", pH: 7.1, pCO2: 28, pO2: 70, hco3: 9, be: -20, sao2: 91, fio2: 40, na: 138, k: 4.8, cl: 100, albumin: 28, lactate: 8.5, patientAge: 62 }
    },
    {
      name: "\u0110\u1EE3t c\u1EA5p COPD",
      desc: "Toan h\xF4 h\u1EA5p m\u1EA1n t\xEDnh \u0111\u1EE3t c\u1EA5p ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p",
      input: { unit: "mmHg", pH: 7.24, pCO2: 78, pO2: 52, hco3: 33, be: 6, sao2: 83, fio2: 24, na: 139, k: 4.1, cl: 98, albumin: 39, lactate: 1.4, patientAge: 71 }
    },
    {
      name: "Suy h\xF4 h\u1EA5p ARDS",
      desc: "T\u1ED5n th\u01B0\u01A1ng ph\u1ED5i c\u1EA5p gi\u1EA3m oxy m\xE1u n\u1EB7ng (P/F < 150)",
      input: { unit: "mmHg", pH: 7.36, pCO2: 42, pO2: 68, hco3: 23, be: -1, sao2: 92, fio2: 60, na: 140, k: 4, cl: 102, albumin: 30, lactate: 2.1, patientAge: 54 }
    },
    {
      name: "Ki\u1EC1m Chuy\u1EC3n H\xF3a",
      desc: "H\u1EB9p m\xF4n v\u1ECB n\xF4n \xF3i nhi\u1EC1u m\u1EA5t d\u1ECBch & acid HCl",
      input: { unit: "mmHg", pH: 7.55, pCO2: 48, pO2: 90, hco3: 40, be: 14, sao2: 98, fio2: 21, na: 136, k: 2.9, cl: 86, albumin: 42, lactate: 1, patientAge: 45 }
    }
  ];
  var AbgCDSSController = class {
    container;
    currentInput;
    currentTab = "analyzer";
    nomogramPco2 = 40;
    nomogramPh = 7.4;
    activeTree = "gas-exchange";
    activeProcedureSub = "puncture";
    selectedCaseId = null;
    glossaryFilter = "";
    constructor(containerId) {
      const el = document.getElementById(containerId);
      if (!el) throw new Error(`Container #${containerId} not found`);
      this.container = el;
      this.currentInput = { ...ABG_PRESETS[0].input };
      this.init();
    }
    init() {
      this.render();
      this.attachEventListeners();
    }
    render() {
      const result = analyzeABG(this.currentInput);
      this.container.innerHTML = `
      <div class="abg-app-container">
        <!-- Brand / Header Card -->
        <header class="abg-header-card">
          <div class="abg-brand-wrap">
            <div class="abg-brand-icon">
              <i class="fa-solid fa-lungs"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="abg-badge abg-badge--primary"><i class="fa-solid fa-microchip"></i> CDSS L\xE2m S\xE0ng 2.0</span>
                <span class="abg-badge abg-badge--success"><i class="fa-solid fa-circle-check"></i> Chu\u1EA9n EBM 2026</span>
              </div>
              <h1 class="abg-header-title">H\u1EC7 Th\u1ED1ng Ph\xE2n T\xEDch Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch & X\u1EED Tr\xED (ABG Pro)</h1>
              <p class="abg-header-subtitle">
                \u0110\xE1nh gi\xE1 6 b\u01B0\u1EDBc r\u1ED1i lo\u1EA1n toan ki\u1EC1m, t\xEDnh kho\u1EA3ng tr\u1ED1ng Anion Gap hi\u1EC7u ch\u1EC9nh Albumin, Delta-Delta, A-a gradient v\xE0 k\u1EBFt n\u1ED1i quy tr\xECnh b\u1EC7nh \xE1n DocSpace SOAP.
              </p>
            </div>
          </div>

          <div class="abg-header-actions">
            <button id="btn-export-soap" class="abg-btn abg-btn--soap" title="Ch\xE9p k\u1EBFt qu\u1EA3 ph\xE2n t\xEDch theo c\u1EA5u tr\xFAc b\u1EC7nh \xE1n SOAP">
              <i class="fa-solid fa-copy"></i> <span>Ch\xE9p V\xE0o B\u1EC7nh \xC1n SOAP</span>
            </button>
            <button id="btn-reset-normal" class="abg-btn abg-btn--outline" title="\u0110\u1EB7t l\u1EA1i th\xF4ng s\u1ED1 b\xECnh th\u01B0\u1EDDng">
              <i class="fa-solid fa-rotate-left"></i> <span>\u0110\u1EB7t L\u1EA1i</span>
            </button>
          </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="abg-tabs-bar">
          <button class="abg-tab-btn ${this.currentTab === "analyzer" ? "active" : ""}" data-tab="analyzer">
            <i class="fa-solid fa-calculator"></i> 1. M\xE1y T\xEDnh & Ph\xE2n T\xEDch 6 B\u01B0\u1EDBc
          </button>
          <button class="abg-tab-btn ${this.currentTab === "cases" ? "active" : ""}" data-tab="cases">
            <i class="fa-solid fa-folder-open"></i> 2. Th\u01B0 Vi\u1EC7n Ca L\xE2m S\xE0ng (${CLINICAL_CASES.length})
          </button>
          <button class="abg-tab-btn ${this.currentTab === "protocols" ? "active" : ""}" data-tab="protocols">
            <i class="fa-solid fa-notes-medical"></i> 3. Ph\xE1c \u0110\u1ED3 C\u1EA5p C\u1EE9u (${TREATMENT_PROTOCOLS.length})
          </button>
          <button class="abg-tab-btn ${this.currentTab === "glossary" ? "active" : ""}" data-tab="glossary">
            <i class="fa-solid fa-book-medical"></i> 4. Tra C\u1EE9u Thu\u1EADt Ng\u1EEF (${ABG_GLOSSARY.length})
          </button>
          <button class="abg-tab-btn ${this.currentTab === "nomogram" ? "active" : ""}" data-tab="nomogram">
            <i class="fa-solid fa-diagram-project"></i> 5. Nomogram & C\xE2y Quy\u1EBFt \u0110\u1ECBnh
          </button>
          <button class="abg-tab-btn ${this.currentTab === "procedures" ? "active" : ""}" data-tab="procedures">
            <i class="fa-solid fa-syringe"></i> 6. C\u1EA9m Nang & K\u1EF9 Thu\u1EADt L\u1EA5y M\xE1u
          </button>
        </nav>

        <!-- Tab Content View -->
        ${this.renderTabContent(result)}

        <!-- Toast Notification -->
        <div id="abg-toast" class="abg-toast">
          <i class="fa-solid fa-circle-check text-emerald-400"></i>
          <span id="abg-toast-msg">\u0110\xE3 ch\xE9p n\u1ED9i dung v\xE0o khay nh\u1EDB t\u1EA1m!</span>
        </div>
      </div>
    `;
    }
    renderTabContent(result) {
      switch (this.currentTab) {
        case "analyzer":
          return this.renderAnalyzerView(result);
        case "cases":
          return this.renderCasesView();
        case "protocols":
          return this.renderProtocolsView();
        case "glossary":
          return this.renderGlossaryView();
        case "nomogram":
          return this.renderNomogramAndTreesView();
        case "procedures":
          return this.renderProceduresAndPhysiologyView();
        default:
          return "";
      }
    }
    renderAnalyzerView(result) {
      return `
      <!-- Quick Presets -->
      <div class="abg-presets-bar">
        <span class="abg-presets-label"><i class="fa-solid fa-bolt"></i> N\u1EA1p Nhanh Ca M\u1EABu:</span>
        ${ABG_PRESETS.map((p, idx) => `
          <button class="abg-preset-chip" data-preset-idx="${idx}" title="${p.desc}">
            ${p.name}
          </button>
        `).join("")}
      </div>

      <!-- Main Form & Evaluation Grid -->
      <div class="abg-main-grid">
        <!-- Input Form Column -->
        <section class="abg-input-card">
          <div class="abg-card-title">
            <span><i class="fa-solid fa-sliders text-blue-600"></i> Th\xF4ng S\u1ED1 C\u1EADn L\xE2m S\xE0ng</span>
            <span style="font-size: 0.75rem; color: var(--abg-muted); font-weight: 500;">\u0110\u01A1n v\u1ECB: mmHg</span>
          </div>

          <form id="abg-form" onsubmit="return false;">
            <!-- Section 1: Kh\xED m\xE1u c\u1ED1t l\xF5i -->
            <div class="abg-form-section-title">1. Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch (C\u1ED1t l\xF5i)</div>
            <div class="abg-input-grid">
              <div class="abg-field">
                <label for="inp-ph">pH m\xE1u <span class="abg-normal-hint">7.35 - 7.45</span></label>
                <input type="number" step="0.01" id="inp-ph" value="${this.currentInput.pH}" required>
              </div>
              <div class="abg-field">
                <label for="inp-pco2">PaCO2 <span class="abg-normal-hint">35 - 45 mmHg</span></label>
                <input type="number" step="0.1" id="inp-pco2" value="${this.currentInput.pCO2}" required>
              </div>
              <div class="abg-field">
                <label for="inp-po2">PaO2 <span class="abg-normal-hint">80 - 100 mmHg</span></label>
                <input type="number" step="0.1" id="inp-po2" value="${this.currentInput.pO2}" required>
              </div>
              <div class="abg-field">
                <label for="inp-hco3">HCO3- <span class="abg-normal-hint">22 - 26 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-hco3" value="${this.currentInput.hco3}" required>
              </div>
              <div class="abg-field">
                <label for="inp-be">BE (Ki\u1EC1m d\u01B0) <span class="abg-normal-hint">-2 \u0111\u1EBFn +2</span></label>
                <input type="number" step="0.1" id="inp-be" value="${this.currentInput.be}">
              </div>
              <div class="abg-field">
                <label for="inp-sao2">SaO2 (%) <span class="abg-normal-hint">95 - 100%</span></label>
                <input type="number" step="0.1" id="inp-sao2" value="${this.currentInput.sao2}">
              </div>
              <div class="abg-field">
                <label for="inp-fio2">FiO2 (%) <span class="abg-normal-hint">21 - 100%</span></label>
                <input type="number" step="1" id="inp-fio2" value="${this.currentInput.fio2}">
              </div>
              <div class="abg-field">
                <label for="inp-age">Tu\u1ED5i b\u1EC7nh nh\xE2n <span class="abg-normal-hint">N\u0103m</span></label>
                <input type="number" step="1" id="inp-age" value="${this.currentInput.patientAge || 40}">
              </div>
            </div>

            <!-- Section 2: \u0110i\u1EC7n gi\u1EA3i & Chuy\u1EC3n h\xF3a -->
            <div class="abg-form-section-title">2. \u0110i\u1EC7n Gi\u1EA3i \u0110\u1ED3 & Chuy\u1EC3n H\xF3a (T\xEDnh Anion Gap)</div>
            <div class="abg-input-grid">
              <div class="abg-field">
                <label for="inp-na">Na+ <span class="abg-normal-hint">135 - 145 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-na" value="${this.currentInput.na || 140}">
              </div>
              <div class="abg-field">
                <label for="inp-k">K+ <span class="abg-normal-hint">3.5 - 5.0 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-k" value="${this.currentInput.k || 4}">
              </div>
              <div class="abg-field">
                <label for="inp-cl">Cl- <span class="abg-normal-hint">98 - 106 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-cl" value="${this.currentInput.cl || 102}">
              </div>
              <div class="abg-field">
                <label for="inp-alb">Albumin m\xE1u <span class="abg-normal-hint">35 - 50 g/L</span></label>
                <input type="number" step="0.1" id="inp-alb" value="${this.currentInput.albumin || 40}">
              </div>
              <div class="abg-field">
                <label for="inp-lac">Lactate m\xE1u <span class="abg-normal-hint">< 2.0 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-lac" value="${this.currentInput.lactate || 1}">
              </div>
              <div class="abg-field">
                <label for="inp-glu">Glucose m\xE1u <span class="abg-normal-hint">3.9 - 6.4 mmol/L</span></label>
                <input type="number" step="0.1" id="inp-glu" value="${this.currentInput.glucose || 5.5}">
              </div>
            </div>
          </form>
        </section>

        <!-- Evaluation Results Column -->
        <section class="abg-results-wrap">
          <!-- Primary Diagnosis Banner -->
          <div class="abg-diagnosis-banner">
            <div class="abg-diagnosis-badge-row">
              <span class="abg-badge ${result.acidBase.category === "normal" ? "abg-badge--success" : "abg-badge--danger"}">
                <i class="fa-solid fa-heart-pulse"></i> ${result.acidBase.title}
              </span>
              <span class="abg-badge ${result.gasExchange.isHypoxaemia ? "abg-badge--danger" : "abg-badge--success"}">
                <i class="fa-solid fa-wind"></i> ${result.gasExchange.title}
              </span>
              <span class="abg-badge abg-badge--primary">
                ${result.calculations.pfClass}
              </span>
            </div>
            <h2 class="abg-diag-main-title">${result.acidBase.description}</h2>
            <p class="abg-diag-desc">${result.gasExchange.description}</p>
          </div>

          <!-- Critical Alerts if any -->
          ${result.criticalWarnings.length > 0 ? `
            <div class="abg-alerts-card">
              <div class="abg-alerts-title">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>C\u1EA3nh B\xE1o L\xE2m S\xE0ng Nguy K\u1ECBch (${result.criticalWarnings.length})</span>
              </div>
              ${result.criticalWarnings.map((w) => `
                <div class="abg-alert-item">${w}</div>
              `).join("")}
            </div>
          ` : ""}

          <!-- Key Metrics Bento Grid -->
          <div class="abg-metrics-grid">
            <div class="abg-metric-card">
              <span class="abg-metric-label">Toan/Ki\u1EC1m & [H+]</span>
              <span class="abg-metric-val">${result.calculations.hIonNmol} <span style="font-size: 0.8rem; font-weight: normal;">nmol/L</span></span>
              <span class="abg-metric-sub">pH ${this.currentInput.pH} (Chu\u1EA9n: 35-45 nmol/L)</span>
            </div>

            <div class="abg-metric-card">
              <span class="abg-metric-label">T\u1EF7 s\u1ED1 PaO2/FiO2 (P/F)</span>
              <span class="abg-metric-val" style="color: ${result.calculations.pfRatio < 300 ? "#ef4444" : "#10b981"};">
                ${result.calculations.pfRatio}
              </span>
              <span class="abg-metric-sub">${result.calculations.pfClass}</span>
            </div>

            <div class="abg-metric-card">
              <span class="abg-metric-label">Anion Gap & Hi\u1EC7u Ch\u1EC9nh</span>
              <span class="abg-metric-val" style="color: ${result.calculations.isAnionGapHigh ? "#ef4444" : "var(--abg-ink)"};">
                ${result.calculations.anionGap !== void 0 ? result.calculations.anionGap.toFixed(1) : "--"}
                <span style="font-size: 0.8rem; font-weight: normal;">mmol/L</span>
              </span>
              <span class="abg-metric-sub">
                ${result.calculations.correctedAnionGap ? `AG hi\u1EC7u ch\u1EC9nh Albumin: <b>${result.calculations.correctedAnionGap.toFixed(1)}</b>` : "Chu\u1EA9n: 8-16 mmol/L"}
              </span>
            </div>

            <div class="abg-metric-card">
              <span class="abg-metric-label">A-a Gradient & Delta-Delta</span>
              <span class="abg-metric-val">${result.calculations.aaGradient.toFixed(1)} <span style="font-size: 0.8rem; font-weight: normal;">mmHg</span></span>
              <span class="abg-metric-sub">
                ${result.calculations.deltaRatioInterpretation ? `Delta: ${result.calculations.deltaRatio?.toFixed(2)} (${result.calculations.deltaRatioInterpretation})` : `K\u1EF3 v\u1ECDng tu\u1ED5i: < ${result.calculations.expectedAaGradient.toFixed(1)} mmHg`}
              </span>
            </div>
          </div>

          <!-- 6-Step Structured Clinical Interpretation -->
          <div class="abg-six-steps-card">
            <div class="abg-card-title" style="margin-bottom: 1rem;">
              <span><i class="fa-solid fa-list-check text-blue-600"></i> Quy Tr\xECnh 6 B\u01B0\u1EDBc \u0110\u1ECDc Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch</span>
              <span style="font-size: 0.75rem; color: var(--abg-muted);">Hennessey & Japp / Pierre & Ranson</span>
            </div>

            <div class="abg-step-timeline">
              ${result.sixSteps.map((s) => `
                <div class="abg-step-item">
                  <div class="abg-step-num">${s.stepNumber}</div>
                  <div class="abg-step-body">
                    <div class="abg-step-name">${s.title}</div>
                    <div class="abg-step-finding">${s.finding}</div>
                    <div class="abg-step-detail">${s.detail}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Treatment Protocols Card -->
          <div class="abg-six-steps-card" style="border-left: 4px solid #10b981;">
            <div class="abg-card-title" style="margin-bottom: 0.75rem;">
              <span><i class="fa-solid fa-notes-medical text-emerald-600"></i> H\u01B0\u1EDBng D\u1EABn \u0110i\u1EC1u Tr\u1ECB & Th\xF4ng Kh\xED \u0110\u1EC1 Xu\u1EA5t</span>
              <span class="abg-badge abg-badge--success">Bedside Decision</span>
            </div>
            <p style="font-size: 0.88rem; font-weight: 600; color: var(--abg-ink); margin: 0 0 0.5rem;">
              ${result.treatmentProtocols.summary}
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">
              <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
                <div style="font-size: 0.75rem; font-weight: 700; color: var(--abg-primary); text-transform: uppercase;">Li\u1EC7u Ph\xE1p Oxy:</div>
                <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.oxygenTherapy}</div>
              </div>
              <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
                <div style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">H\u1ED7 Tr\u1EE3 Th\xF4ng Kh\xED:</div>
                <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.ventilationSupport}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
    }
    renderCasesView() {
      const selectedCase = this.selectedCaseId ? CLINICAL_CASES.find((c) => c.id === this.selectedCaseId) : CLINICAL_CASES[0];
      return `
      <div class="abg-main-grid" style="grid-template-columns: 380px 1fr;">
        <!-- Cases List -->
        <div class="abg-input-card" style="max-height: 800px; overflow-y: auto;">
          <div class="abg-card-title">
            <span><i class="fa-solid fa-folder-open text-blue-600"></i> Danh M\u1EE5c Ca B\u1EC7nh</span>
            <span class="abg-badge abg-badge--primary">${CLINICAL_CASES.length} ca</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${CLINICAL_CASES.map((c) => `
              <div class="abg-case-item-card ${selectedCase?.id === c.id ? "active" : ""}" data-case-id="${c.id}" style="
                padding: 0.75rem 1rem;
                border-radius: 8px;
                border: 1px solid ${selectedCase?.id === c.id ? "var(--abg-primary)" : "var(--abg-line)"};
                background: ${selectedCase?.id === c.id ? "var(--abg-primary-bg)" : "var(--abg-panel)"};
                cursor: pointer;
                transition: all 0.15s ease;
              ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; font-size: 0.82rem; color: var(--abg-primary);">Ca #${c.id}: ${c.caseNumberDisplay}</span>
                  <span class="abg-badge abg-badge--danger" style="font-size: 0.68rem;">${c.difficulty}</span>
                </div>
                <div style="font-weight: 600; font-size: 0.86rem; color: var(--abg-ink); margin-bottom: 0.2rem;">${c.title}</div>
                <div style="font-size: 0.74rem; color: var(--abg-muted);">${c.patientProfile}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Case Detail -->
        ${selectedCase ? `
          <div class="abg-results-wrap">
            <div class="abg-input-card">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div>
                  <div style="display: flex; gap: 0.4rem; margin-bottom: 0.4rem;">
                    <span class="abg-badge abg-badge--primary">${selectedCase.categoryTag}</span>
                    <span class="abg-badge abg-badge--warning">${selectedCase.difficulty}</span>
                  </div>
                  <h2 style="font-family: var(--abg-font-display); font-size: 1.4rem; margin: 0; color: var(--abg-ink);">
                    ${selectedCase.title}
                  </h2>
                  <p style="font-size: 0.85rem; color: var(--abg-muted); margin: 0.25rem 0 0;">
                    Ngu\u1ED3n: ${selectedCase.source} \xB7 B\u1EC7nh nh\xE2n: ${selectedCase.patientProfile}
                  </p>
                </div>

                <button id="btn-load-case-to-calc" class="abg-btn abg-btn--primary" data-load-case="${selectedCase.id}">
                  <i class="fa-solid fa-calculator"></i> N\u1EA1p V\xE0o M\xE1y T\xEDnh ABG
                </button>
              </div>

              <!-- History & Vitals -->
              <div style="background: var(--abg-bg); padding: 1rem; border-radius: 8px; border: 1px solid var(--abg-line); margin-bottom: 1.25rem;">
                <h4 style="margin: 0 0 0.5rem; font-size: 0.86rem; font-weight: 700; color: var(--abg-ink);">B\u1EC7nh S\u1EED & L\xE2m S\xE0ng:</h4>
                <p style="font-size: 0.85rem; color: var(--abg-ink2); margin: 0 0 0.75rem; line-height: 1.5;">${selectedCase.history}</p>
                
                <h4 style="margin: 0 0 0.35rem; font-size: 0.84rem; font-weight: 700; color: var(--abg-ink);">Kh\xE1m L\xE2m S\xE0ng:</h4>
                <p style="font-size: 0.84rem; color: var(--abg-ink2); margin: 0 0 0.5rem;">${selectedCase.examination.findings}</p>
                
                <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.78rem; font-family: var(--abg-font-mono); color: var(--abg-muted); padding-top: 0.5rem; border-top: 1px dashed var(--abg-line);">
                  ${selectedCase.examination.vitals.pulse ? `<span>M\u1EA1ch: <b>${selectedCase.examination.vitals.pulse}</b></span>` : ""}
                  ${selectedCase.examination.vitals.bp ? `<span>HA: <b>${selectedCase.examination.vitals.bp}</b></span>` : ""}
                  ${selectedCase.examination.vitals.rr ? `<span>Nh\u1ECBp th\u1EDF: <b>${selectedCase.examination.vitals.rr}</b></span>` : ""}
                  ${selectedCase.examination.vitals.spo2 ? `<span>SpO2: <b>${selectedCase.examination.vitals.spo2}</b></span>` : ""}
                  ${selectedCase.examination.vitals.fio2 ? `<span>FiO2: <b>${selectedCase.examination.vitals.fio2}</b></span>` : ""}
                </div>
              </div>

              <!-- ABG Values Strip -->
              <div style="background: var(--abg-primary-bg); border: 1px solid var(--abg-primary-border); border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
                <div style="font-size: 0.78rem; font-weight: 700; color: var(--abg-primary); text-transform: uppercase; margin-bottom: 0.5rem;">
                  K\u1EBFt Qu\u1EA3 Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch:
                </div>
                <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; font-family: var(--abg-font-mono); font-size: 0.95rem;">
                  <span>pH: <b>${selectedCase.abg.pH}</b></span>
                  <span>PaCO2: <b>${selectedCase.abg.pCO2}</b> mmHg</span>
                  <span>PaO2: <b>${selectedCase.abg.pO2}</b> mmHg</span>
                  <span>HCO3-: <b>${selectedCase.abg.hco3}</b> mmol/L</span>
                  <span>BE: <b>${selectedCase.abg.be}</b></span>
                  ${selectedCase.abg.na ? `<span>Na: <b>${selectedCase.abg.na}</b></span>` : ""}
                  ${selectedCase.abg.cl ? `<span>Cl: <b>${selectedCase.abg.cl}</b></span>` : ""}
                  ${selectedCase.abg.lactate ? `<span>Lactate: <b>${selectedCase.abg.lactate}</b></span>` : ""}
                </div>
              </div>

              <!-- Structured Answers / Insights -->
              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <div style="border-left: 3px solid #ef4444; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #ef4444;">1. \u0110\xE1nh gi\xE1 trao \u0111\u1ED5i kh\xED (Gas Exchange):</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.gasExchange}</div>
                </div>
                <div style="border-left: 3px solid #f59e0b; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #d97706;">2. R\u1ED1i lo\u1EA1n toan ki\u1EC1m & B\xF9 tr\u1EEB (Acid-Base Status):</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.acidBase}</div>
                </div>
                <div style="border-left: 3px solid #3b82f6; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #2563eb;">3. Ch\u1EA9n \u0111o\xE1n ph\xE2n bi\u1EC7t & B\u1EC7nh c\u1EA3nh:</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.differentialDiagnosis}</div>
                </div>
                <div style="border-left: 3px solid #10b981; padding-left: 0.85rem;">
                  <div style="font-weight: 700; font-size: 0.84rem; color: #059669;">4. X\u1EED tr\xED l\xE2m s\xE0ng & Bi\u1EC7n ph\xE1p c\u1EA5p c\u1EE9u:</div>
                  <div style="font-size: 0.85rem; color: var(--abg-ink); margin-top: 0.2rem;">${selectedCase.answers.clinicalAction}</div>
                </div>
              </div>
            </div>
          </div>
        ` : ""}
      </div>
    `;
    }
    renderProtocolsView() {
      return `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 1.5rem;">
        ${TREATMENT_PROTOCOLS.map((proto) => `
          <div class="abg-input-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div>
                <span class="abg-badge abg-badge--danger" style="margin-bottom: 0.4rem;">${proto.severityBadge}</span>
                <h3 style="font-family: var(--abg-font-display); font-size: 1.15rem; color: var(--abg-ink); margin: 0 0 0.25rem;">
                  ${proto.title}
                </h3>
                <p style="font-size: 0.8rem; color: var(--abg-muted); margin: 0;">${proto.subtitle}</p>
              </div>
            </div>

            <!-- Steps -->
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.65rem;">
              ${proto.steps.map((step, idx) => `
                <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line-subtle);">
                  <div style="font-weight: 700; font-size: 0.82rem; color: var(--abg-primary); margin-bottom: 0.2rem;">
                    B\u01B0\u1EDBc ${idx + 1}: ${step.title}
                  </div>
                  <div style="font-size: 0.82rem; color: var(--abg-ink);">${step.action}</div>
                  ${step.notes ? `<div style="font-size: 0.75rem; color: var(--abg-muted); margin-top: 0.2rem; font-style: italic;">* ${step.notes}</div>` : ""}
                </div>
              `).join("")}
            </div>

            <!-- Cautions -->
            ${proto.cautions && proto.cautions.length > 0 ? `
              <div style="margin-top: 1rem; padding: 0.75rem; background: var(--abg-amber-bg); border: 1px solid var(--abg-amber-border); border-radius: 8px;">
                <div style="font-size: 0.78rem; font-weight: 700; color: #b45309; margin-bottom: 0.25rem;">L\u01B0u \xFD c\u1EA5m k\u1EF5:</div>
                <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.78rem; color: #92400e;">
                  ${proto.cautions.map((c) => `<li>${c}</li>`).join("")}
                </ul>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    `;
    }
    renderGlossaryView() {
      const filtered = this.glossaryFilter ? ABG_GLOSSARY.filter((g) => g.term.toLowerCase().includes(this.glossaryFilter.toLowerCase()) || g.definition.toLowerCase().includes(this.glossaryFilter.toLowerCase())) : ABG_GLOSSARY;
      return `
      <div class="abg-input-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-family: var(--abg-font-display); font-size: 1.25rem; margin: 0; color: var(--abg-ink);">
              Tra C\u1EE9u B\xE1ch Khoa To\xE0n Th\u01B0 Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch
            </h2>
            <p style="font-size: 0.82rem; color: var(--abg-muted); margin: 0.2rem 0 0;">
              Ch\u1EC9 s\u1ED1 tham chi\u1EBFu, \u0111\u1ECBnh ngh\u0129a sinh l\xFD b\u1EC7nh h\u1ECDc v\xE0 nguy\xEAn nh\xE2n t\u0103ng/gi\u1EA3m th\u01B0\u1EDDng g\u1EB7p.
            </p>
          </div>

          <div style="position: relative; width: 300px;">
            <input type="text" id="inp-glossary-search" placeholder="T\xECm thu\u1EADt ng\u1EEF (v\xED d\u1EE5: Anion Gap, Winter...)" value="${this.glossaryFilter}" style="
              width: 100%;
              padding: 0.5rem 0.85rem;
              border-radius: 8px;
              border: 1px solid var(--abg-line);
              background: var(--abg-bg);
              color: var(--abg-ink);
              font-size: 0.85rem;
            ">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1rem;">
          ${filtered.map((item) => `
            <div style="background: var(--abg-bg); border: 1px solid var(--abg-line); border-radius: 10px; padding: 1.1rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="font-family: var(--abg-font-display); font-size: 1.05rem; font-weight: 700; color: var(--abg-primary); margin: 0;">
                  ${item.term} ${item.symbol ? `<span style="font-size: 0.85rem; color: var(--abg-muted);">(${item.symbol})</span>` : ""}
                </h4>
                <span class="abg-badge abg-badge--primary" style="font-family: var(--abg-font-mono); font-size: 0.72rem;">
                  ${item.normalRange} ${item.unit}
                </span>
              </div>
              <p style="font-size: 0.82rem; color: var(--abg-ink); margin: 0 0 0.6rem; line-height: 1.5;">${item.definition}</p>
              <div style="font-size: 0.78rem; color: var(--abg-muted); border-top: 1px dashed var(--abg-line); padding-top: 0.5rem;">
                <b>\xDD ngh\u0129a:</b> ${item.clinicalSignificance}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    }
    renderNomogramAndTreesView() {
      const currentH = Math.round(Math.pow(10, 9 - this.nomogramPh));
      const approxHco3 = Math.round(24 * this.nomogramPco2 / Math.max(10, currentH));
      let zoneName = "V\xF9ng B\xECnh Th\u01B0\u1EDDng (Normal Buffer Line)";
      let zoneClass = "abg-badge--success";
      if (this.nomogramPh < 7.35 && this.nomogramPco2 > 45) {
        zoneName = "Toan H\xF4 H\u1EA5p (C\u1EA5p t\xEDnh ho\u1EB7c M\u1EA1n t\xEDnh b\xF9 tr\u1EEB)";
        zoneClass = "abg-badge--danger";
      } else if (this.nomogramPh < 7.35 && this.nomogramPco2 <= 45) {
        zoneName = "Toan Chuy\u1EC3n H\xF3a (Metabolic Acidosis)";
        zoneClass = "abg-badge--danger";
      } else if (this.nomogramPh > 7.45 && this.nomogramPco2 < 35) {
        zoneName = "Ki\u1EC1m H\xF4 H\u1EA5p (Respiratory Alkalosis)";
        zoneClass = "abg-badge--primary";
      } else if (this.nomogramPh > 7.45 && this.nomogramPco2 >= 35) {
        zoneName = "Ki\u1EC1m Chuy\u1EC3n H\xF3a (Metabolic Alkalosis)";
        zoneClass = "abg-badge--primary";
      } else if (this.nomogramPh >= 7.35 && this.nomogramPh <= 7.45 && (this.nomogramPco2 < 35 || this.nomogramPco2 > 45)) {
        zoneName = "R\u1ED1i lo\u1EA1n Toan - Ki\u1EC1m H\u1ED7n H\u1EE3p \u0111\xE3 b\xF9 tr\u1EEB ho\xE0n to\xE0n";
        zoneClass = "abg-badge--warning";
      }
      return `
      <div class="abg-knowledge-container">
        <!-- Sub navigation pills -->
        <div class="abg-knowledge-subnav">
          <button class="abg-subnav-pill ${this.activeTree === "gas-exchange" ? "active" : ""}" data-tree="gas-exchange">
            <i class="fa-solid fa-wind"></i> 1. C\xE2y Trao \u0110\u1ED5i Kh\xED (H\xECnh 22)
          </button>
          <button class="abg-subnav-pill ${this.activeTree === "acid-base" ? "active" : ""}" data-tree="acid-base">
            <i class="fa-solid fa-scale-balanced"></i> 2. C\xE2y Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m (H\xECnh 23)
          </button>
          <button class="abg-subnav-pill ${this.activeTree === "anion-gap" ? "active" : ""}" data-tree="anion-gap">
            <i class="fa-solid fa-triangle-exclamation"></i> 3. C\xE2y Ph\xE2n Nh\xE1nh Anion Gap (GOLDMARK)
          </button>
        </div>

        <!-- Interactive Nomogram Card -->
        <section class="abg-nomogram-card">
          <div class="abg-nomogram-header">
            <div>
              <span class="abg-badge abg-badge--primary"><i class="fa-solid fa-chart-line"></i> Nomogram Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m T\u01B0\u01A1ng T\xE1c</span>
              <h3>Bi\u1EC3u \u0110\u1ED3 Siggaard-Andersen & Davenport (H\xECnh 16)</h3>
              <p class="abg-card-desc">K\xE9o con tr\u01B0\u1EE3t \u0111\u1EC3 \u0111\u1ECBnh v\u1ECB t\u1ECDa \u0111\u1ED9 PaCO2 v\xE0 pH m\xE1u, t\u1EF1 \u0111\u1ED9ng t\xEDnh n\u1ED3ng \u0111\u1ED9 [H+] nmol/L v\xE0 HCO3- x\u1EA5p x\u1EC9 theo ph\u01B0\u01A1ng tr\xECnh Henderson-Hasselbalch.</p>
            </div>
            <button id="btn-nomogram-to-analyzer" class="abg-btn abg-btn--primary">
              <i class="fa-solid fa-calculator"></i> N\u1EA1p Sang M\xE1y T\xEDnh 6 B\u01B0\u1EDBc
            </button>
          </div>

          <div class="abg-nomogram-grid">
            <div class="abg-nomogram-sliders">
              <div class="abg-slider-group">
                <div class="abg-slider-label">
                  <span>Ph\xE2n \xE1p PaCO2:</span>
                  <strong id="nomo-val-pco2">${this.nomogramPco2} mmHg</strong>
                </div>
                <input type="range" id="nomo-range-pco2" min="15" max="100" step="1" value="${this.nomogramPco2}">
                <div class="abg-slider-ticks"><span>15 (Gi\u1EA3m s\xE2u)</span><span>40 (Chu\u1EA9n)</span><span>100 (\u1EE8 tr\u1EC7 n\u1EB7ng)</span></div>
              </div>

              <div class="abg-slider-group">
                <div class="abg-slider-label">
                  <span>\u0110\u1ED9 pH M\xE1u:</span>
                  <strong id="nomo-val-ph">${this.nomogramPh.toFixed(2)}</strong>
                </div>
                <input type="range" id="nomo-range-ph" min="6.90" max="7.75" step="0.01" value="${this.nomogramPh}">
                <div class="abg-slider-ticks"><span>6.90 (Toan n\u1EB7ng)</span><span>7.40 (Chu\u1EA9n)</span><span>7.75 (Ki\u1EC1m n\u1EB7ng)</span></div>
              </div>
            </div>

            <div class="abg-nomogram-readout">
              <div class="abg-readout-item">
                <span>N\u1ED3ng \u0111\u1ED9 [H+]:</span>
                <strong id="nomo-readout-h">${currentH} nmol/L</strong>
                <small class="text-muted">B\xECnh th\u01B0\u1EDDng: 35 - 45 nmol/L</small>
              </div>
              <div class="abg-readout-item">
                <span>HCO3- \u01B0\u1EDBc t\xEDnh:</span>
                <strong id="nomo-readout-hco3">${approxHco3} mmol/L</strong>
                <small class="text-muted">24 \xD7 PaCO2 / [H+]</small>
              </div>
              <div class="abg-readout-item" style="grid-column: 1 / -1;">
                <span>Ph\xE2n v\xF9ng ch\u1EA9n \u0111o\xE1n:</span>
                <div id="nomo-zone-badge" class="abg-badge ${zoneClass}" style="margin-top: 0.35rem; display: inline-flex; font-size: 0.88rem; padding: 0.4rem 0.8rem;">
                  ${zoneName}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Decision Tree Display -->
        <section class="abg-tree-card">
          ${this.renderActiveDecisionTree()}
        </section>
      </div>
    `;
    }
    renderActiveDecisionTree() {
      if (this.activeTree === "gas-exchange") {
        return `
        <div class="abg-tree-wrap">
          <div class="abg-tree-header">
            <h4><i class="fa-solid fa-wind text-blue-500"></i> S\u01A1 \u0110\u1ED3 \u0110\xE1nh Gi\xE1 Trao \u0110\u1ED5i Kh\xED Ph\u1ED5i (Arterial Blood Gases Made Easy - Figure 22)</h4>
            <p>Ph\xE2n lo\u1EA1i suy h\xF4 h\u1EA5p d\u1EF1a tr\xEAn ph\xE2n \xE1p PaO2 kh\xED tr\u1EDDi v\xE0 \u0111\xE1p \u1EE9ng \u0111\xE0o th\u1EA3i CO2 c\u1EE7a ph\u1EBF nang.</p>
          </div>

          <div class="abg-tree-flow">
            <div class="abg-tree-node abg-tree-node--root">
              <strong>B\u01AF\u1EDAC 1: Ph\xE2n \xE1p Oxy m\xE1u PaO2 (Kh\xED tr\u1EDDi)</strong>
              <div class="abg-tree-branches">
                <div class="abg-tree-branch">
                  <span class="abg-branch-cond">PaO2 \u2265 80 mmHg</span>
                  <div class="abg-tree-leaf abg-tree-leaf--ok">
                    <strong>Trao \u0111\u1ED5i kh\xED oxy b\xECnh th\u01B0\u1EDDng</strong>
                    <p>Kh\xF4ng c\xF3 suy h\xF4 h\u1EA5p gi\u1EA3m oxy m\xE1u. Ki\u1EC3m tra ti\u1EBFp PaCO2 \u0111\u1EC3 \u0111\xE1nh gi\xE1 th\xF4ng kh\xED ph\u1EBF nang.</p>
                  </div>
                </div>
                <div class="abg-tree-branch">
                  <span class="abg-branch-cond">PaO2 < 60 mmHg (ho\u1EB7c SaO2 < 90%)</span>
                  <div class="abg-tree-leaf abg-tree-leaf--alert">
                    <strong>SUY H\xD4 H\u1EA4P C\u1EA4P (Respiratory Failure)</strong>
                    <p>Kh\u1EA3o s\xE1t ti\u1EBFp ph\xE2n \xE1p PaCO2:</p>
                    <div class="abg-tree-subbranches">
                      <div class="abg-tree-subleaf">
                        <strong>\u2022 PaCO2 \u2264 45 mmHg (B\xECnh th\u01B0\u1EDDng ho\u1EB7c Gi\u1EA3m):</strong>
                        <p><strong>Suy H\xF4 H\u1EA5p Type 1 (Gi\u1EA3m Oxy M\xE1u - Hypoxemic):</strong> B\u1EA5t t\u01B0\u01A1ng x\u1EE9ng Th\xF4ng kh\xED/T\u01B0\u1EDBi m\xE1u (V/Q mismatch), Shunt ph\u1ED5i (Vi\xEAm ph\u1ED5i \u0111\xF4ng \u0111\u1EB7c, ARDS, Ph\xF9 ph\u1ED5i c\u1EA5p, Thuy\xEAn t\u1EAFc ph\u1ED5i). Th\u01B0\u1EDDng \u0111\xE1p \u1EE9ng t\u1ED1t v\u1EDBi li\u1EC7u ph\xE1p oxy.</p>
                      </div>
                      <div class="abg-tree-subleaf">
                        <strong>\u2022 PaCO2 > 45 mmHg (T\u0103ng CO2 m\xE1u):</strong>
                        <p><strong>Suy H\xF4 H\u1EA5p Type 2 (T\u0103ng Th\xE1n Kh\xED - Hypercapnic):</strong> Gi\u1EA3m th\xF4ng kh\xED ph\u1EBF nang to\xE0n b\u1ED9 (Ki\u1EC7t c\u01A1 h\xF4 h\u1EA5p trong \u0110\u1EE3t c\u1EA5p COPD, C\u01A1n hen \xE1c t\xEDnh, B\xE9o ph\xEC gi\u1EA3m th\xF4ng kh\xED Pickwickian, \u1EE8c ch\u1EBF trung t\xE2m h\xF4 h\u1EA5p do Morphin/Seduxen, Nh\u01B0\u1EE3c c\u01A1/GBS). C\u1EA7n h\u1ED7 tr\u1EE3 th\xF4ng kh\xED (NIV BiPAP ho\u1EB7c \u0110\u1EB7t n\u1ED9i kh\xED qu\u1EA3n).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      } else if (this.activeTree === "acid-base") {
        return `
        <div class="abg-tree-wrap">
          <div class="abg-tree-header">
            <h4><i class="fa-solid fa-scale-balanced text-primary"></i> S\u01A1 \u0110\u1ED3 Thu\u1EADt To\xE1n R\u1EBD Nh\xE1nh Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m (Figure 23)</h4>
            <p>H\u1EC7 th\u1ED1ng \u0111\xE1nh gi\xE1 th\u1EE9 t\u1EF1: pH m\xE1u \u2192 Ngu\u1ED3n g\u1ED1c nguy\xEAn ph\xE1t (H\xF4 h\u1EA5p vs Chuy\u1EC3n h\xF3a) \u2192 \u0110\xE1nh gi\xE1 b\xF9 tr\u1EEB.</p>
          </div>

          <div class="abg-tree-flow">
            <div class="abg-tree-grid-2">
              <div class="abg-tree-card-sub">
                <div class="abg-sub-head text-danger"><i class="fa-solid fa-arrow-trend-down"></i> NHI\u1EC4M TOAN (Acidemia: pH < 7.35)</div>
                <ul class="abg-sub-list">
                  <li><strong>PaCO2 > 45 mmHg: Toan H\xF4 H\u1EA5p</strong>
                    <br>\u2022 C\u1EA5p: HCO3- t\u0103ng 1 mmol/L cho m\u1ED7i 10 mmHg PaCO2 t\u0103ng.
                    <br>\u2022 M\u1EA1n: HCO3- t\u0103ng 3.5 - 4 mmol/L cho m\u1ED7i 10 mmHg PaCO2 t\u0103ng (B\xF9 tr\u1EEB th\u1EADn c\u1EA7n 3-5 ng\xE0y).
                  </li>
                  <li><strong>HCO3- < 22 mmol/L: Toan Chuy\u1EC3n H\xF3a</strong>
                    <br>\u2022 Ki\u1EC3m tra b\xF9 tr\u1EEB h\xF4 h\u1EA5p theo C\xF4ng th\u1EE9c Winter: PaCO2 d\u1EF1 \u0111o\xE1n = 1.5 \xD7 [HCO3-] + 8 \xB1 2.
                    <br>\u2022 B\u1EAFt bu\u1ED9c t\xEDnh Kho\u1EA3ng tr\u1ED1ng Anion Gap (AG) hi\u1EC7u ch\u1EC9nh Albumin: AG = Na - (Cl + HCO3).
                  </li>
                </ul>
              </div>

              <div class="abg-tree-card-sub">
                <div class="abg-sub-head text-primary"><i class="fa-solid fa-arrow-trend-up"></i> NHI\u1EC4M KI\u1EC0M (Alkalemia: pH > 7.45)</div>
                <ul class="abg-sub-list">
                  <li><strong>PaCO2 < 35 mmHg: Ki\u1EC1m H\xF4 H\u1EA5p</strong>
                    <br>\u2022 C\u1EA5p (T\u0103ng th\xF4ng kh\xED lo \xE2u, \u0111au, s\u1ED1t, PE giai \u0111o\u1EA1n \u0111\u1EA7u): HCO3- gi\u1EA3m 2 mmol/L m\u1ED7i 10 mmHg PaCO2 gi\u1EA3m.
                    <br>\u2022 M\u1EA1n: HCO3- gi\u1EA3m 4 - 5 mmol/L m\u1ED7i 10 mmHg PaCO2 gi\u1EA3m.
                  </li>
                  <li><strong>HCO3- > 26 mmol/L: Ki\u1EC1m Chuy\u1EC3n H\xF3a</strong>
                    <br>\u2022 B\xF9 tr\u1EEB h\xF4 h\u1EA5p: PaCO2 d\u1EF1 \u0111o\xE1n = 0.7 \xD7 [HCO3-] + 21 \xB1 2 (t\u1ED1i \u0111a PaCO2 ~ 55-60 mmHg).
                    <br>\u2022 \u0110\u1ECBnh l\u01B0\u1EE3ng Clo ni\u1EC7u: \u0110\xE1p \u1EE9ng mu\u1ED1i Clo (N\xF4n \xF3i, d\xF9ng l\u1EE3i ti\u1EC3u) vs Kh\xE1ng mu\u1ED1i Clo (C\u01B0\u1EDDng Aldosterone, Cushing).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
      } else {
        return `
        <div class="abg-tree-wrap">
          <div class="abg-tree-header">
            <h4><i class="fa-solid fa-triangle-exclamation text-amber-500"></i> C\xE2y Ph\xE2n Nh\xE1nh Toan Chuy\u1EC3n H\xF3a & B\u1EA3ng K\xFD T\u1EF1 G\u1EE3i Nh\u1EDB GOLDMARK</h4>
            <p>Anion Gap = [Na+] - ([Cl-] + [HCO3-]). B\xECnh th\u01B0\u1EDDng: 10 - 12 mmol/L (Hi\u1EC7u ch\u1EC9nh: + 2.5 cho m\u1ED7i 10 g/L Albumin gi\u1EA3m d\u01B0\u1EDBi 40 g/L).</p>
          </div>

          <div class="abg-tree-grid-2">
            <div class="abg-tree-card-sub">
              <div class="abg-sub-head text-danger"><i class="fa-solid fa-circle-exclamation"></i> T\u0103ng Anion Gap (High AG > 12) \u2014 Nh\u1EDB "GOLDMARK":</div>
              <ul class="abg-goldmark-list">
                <li><span class="abg-gold-letter">G</span><strong>Glycols:</strong> Ethylene glycol, Propylene glycol (Ng\u1ED9 \u0111\u1ED9c dung d\u1ECBch ch\u1ED1ng \u0111\xF4ng).</li>
                <li><span class="abg-gold-letter">O</span><strong>Oxoproline (5-oxoproline / Pyroglutamic acid):</strong> L\u1EA1m d\u1EE5ng Paracetamol k\xE9o d\xE0i \u1EDF ng\u01B0\u1EDDi suy ki\u1EC7t, ph\u1EE5 n\u1EEF l\u1EDBn tu\u1ED5i.</li>
                <li><span class="abg-gold-letter">L</span><strong>L-Lactate:</strong> Toan Lactic Type A (S\u1ED1c, thi\u1EBFu oxy m\xF4, ng\u1EEBng tim, thi\u1EBFu m\xE1u c\u1EE5c b\u1ED9 ru\u1ED9t) & Type B (Metformin, suy gan, co gi\u1EADt, ung th\u01B0).</li>
                <li><span class="abg-gold-letter">D</span><strong>D-Lactate:</strong> H\u1ED9i ch\u1EE9ng ru\u1ED9t ng\u1EAFn (Short bowel syndrome) do vi khu\u1EA9n \u0111\u01B0\u1EDDng ru\u1ED9t l\xEAn men carbohydrate.</li>
                <li><span class="abg-gold-letter">M</span><strong>Methanol:</strong> R\u01B0\u1EE3u l\u1EADu \u0111\u1ED9c h\u1EA1i, chuy\u1EC3n h\xF3a th\xE0nh Acid Formic g\xE2y m\xF9 l\xF2a v\xE0 ph\xF9 gai th\u1ECB.</li>
                <li><span class="abg-gold-letter">A</span><strong>Aspirin (Salicylate):</strong> G\xE2y toan chuy\u1EC3n h\xF3a AG cao k\xE8m ki\u1EC1m h\xF4 h\u1EA5p h\u1ED7n h\u1EE3p s\u1EDBm.</li>
                <li><span class="abg-gold-letter">R</span><strong>Renal Failure (Uremia):</strong> Suy th\u1EADn c\u1EA5p ho\u1EB7c m\u1EA1n giai \u0111o\u1EA1n n\u1EB7ng gi\u1EA3m b\xE0i ti\u1EBFt ion H+, Sulfat, Phosphat.</li>
                <li><span class="abg-gold-letter">K</span><strong>Ketoacidosis:</strong> Toan Ceton \u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng (DKA), toan ceton do nh\u1ECBn \u0111\xF3i (Starvation), toan ceton do r\u01B0\u1EE3u (AKA).</li>
              </ul>
            </div>

            <div class="abg-tree-card-sub">
              <div class="abg-sub-head text-primary"><i class="fa-solid fa-shield-halved"></i> Anion Gap B\xECnh Th\u01B0\u1EDDng (Normal AG / T\u0103ng Clo M\xE1u):</div>
              <p style="font-size: 0.82rem; color: var(--abg-muted); margin-bottom: 0.5rem;">Khi m\u1EA5t ion Bicarbonate (HCO3-), th\u1EADn t\xE1i h\u1EA5p thu Clo (Cl-) b\xF9 l\u1EA1i \u0111\u1EC3 gi\u1EEF c\xE2n b\u1EB1ng \u0111i\u1EC7n t\xEDch:</p>
              <ul class="abg-sub-list">
                <li><strong>1. M\u1EA5t HCO3- qua \u0111\u01B0\u1EDDng ti\xEAu h\xF3a (M\u1EA5t ki\u1EC1m ngo\xE0i th\u1EADn):</strong>
                  <br>\u2022 Ti\xEAu ch\u1EA3y c\u1EA5p \u1ED3 \u1EA1t (Diarrhea) \u2014 Nguy\xEAn nh\xE2n h\xE0ng \u0111\u1EA7u.
                  <br>\u2022 D\xF2 m\u1EADt, d\xF2 t\u1EE5y, d\xF2 ru\u1ED9t non (M\u1EA5t d\u1ECBch ti\xEAu h\xF3a gi\xE0u HCO3-).
                  <br>\u2022 Ph\u1EABu thu\u1EADt n\u1ED1i ni\u1EC7u qu\u1EA3n v\xE0o \u0111\u1EA1i tr\xE0ng Sigma.
                </li>
                <li><strong>2. M\u1EA5t HCO3- qua th\u1EADn (Toan h\xF3a \u1ED1ng th\u1EADn - RTA):</strong>
                  <br>\u2022 <em>RTA Type 1 (\u1ED0ng xa):</em> Gi\u1EA3m b\xE0i ti\u1EBFt H+ t\u1EA1i \u1ED1ng l\u01B0\u1EE3n xa; pH n\u01B0\u1EDBc ti\u1EC3u lu\xF4n > 5.5, h\u1EA1 Kali m\xE1u, s\u1ECFi calci th\u1EADn.
                  <br>\u2022 <em>RTA Type 2 (\u1ED0ng g\u1EA7n):</em> Gi\u1EA3m t\xE1i h\u1EA5p thu HCO3- t\u1EA1i \u1ED1ng l\u01B0\u1EE3n g\u1EA7n (H\u1ED9i ch\u1EE9ng Fanconi); pH n\u01B0\u1EDBc ti\u1EC3u bi\u1EBFn thi\xEAn.
                  <br>\u2022 <em>RTA Type 4 (Gi\u1EA3m Aldosterone):</em> Thi\u1EBFu h\u1EE5t ho\u1EB7c kh\xE1ng Aldosterone (\u0110\xE1i th\xE1o \u0111\u01B0\u1EDDng bi\u1EBFn ch\u1EE9ng th\u1EADn); KALI M\xC1U T\u0102NG CAO.
                </li>
                <li><strong>3. Do \u0111i\u1EC1u tr\u1ECB y khoa (Iatrogenic):</strong>
                  <br>\u2022 Truy\u1EC1n \u1ED3 \u1EA1t dung d\u1ECBch NaCl 0.9% (Normal Saline g\xE2y toan t\u0103ng clo m\xE1u pha lo\xE3ng).
                  <br>\u2022 D\xF9ng thu\u1ED1c \u1EE9c ch\u1EBF Carbonic Anhydrase (Acetazolamide).
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;
      }
    }
    renderProceduresAndPhysiologyView() {
      return `
      <div class="abg-knowledge-container">
        <!-- Sub navigation pills -->
        <div class="abg-knowledge-subnav">
          <button class="abg-subnav-pill ${this.activeProcedureSub === "puncture" ? "active" : ""}" data-proc="puncture">
            <i class="fa-solid fa-syringe"></i> 1. K\u1EF9 Thu\u1EADt L\u1EA5y M\xE1u \u0110\u1ED9ng M\u1EA1ch
          </button>
          <button class="abg-subnav-pill ${this.activeProcedureSub === "allen" ? "active" : ""}" data-proc="allen">
            <i class="fa-solid fa-hand"></i> 2. Nghi\u1EC7m Ph\xE1p Allen (Test Allen)
          </button>
          <button class="abg-subnav-pill ${this.activeProcedureSub === "vbg" ? "active" : ""}" data-proc="vbg">
            <i class="fa-solid fa-arrows-split-up-and-left"></i> 3. \u0110\u1ED1i Chi\u1EBFu ABG vs VBG
          </button>
          <button class="abg-subnav-pill ${this.activeProcedureSub === "physiology" ? "active" : ""}" data-proc="physiology">
            <i class="fa-solid fa-dna"></i> 4. Sinh L\xFD H\u1ECDc H\u1EC7 \u0110\u1EC7m
          </button>
        </div>

        <section class="abg-proc-card">
          ${this.renderActiveProcedureContent()}
        </section>
      </div>
    `;
    }
    renderActiveProcedureContent() {
      switch (this.activeProcedureSub) {
        case "puncture":
          return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-syringe text-blue-600"></i> Quy Tr\xECnh L\xE2m S\xE0ng L\u1EA5y M\xE1u \u0110\u1ED9ng M\u1EA1ch (Arterial Puncture)</h3>
              <p class="text-muted">Th\u1EE7 thu\u1EADt x\xE2m l\u1EA5n ch\u1EA9n \u0111o\xE1n quan tr\u1ECDng trong h\u1ED3i s\u1EE9c c\u1EA5p c\u1EE9u v\xE0 b\u1EC7nh l\xFD h\xF4 h\u1EA5p.</p>
            </div>

            <div class="abg-proc-grid">
              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-location-dot text-danger"></i> V\u1ECB Tr\xED Ch\u1ECDc \u01AFu Ti\xEAn:</h4>
                <ul>
                  <li><strong>1. \u0110\u1ED9ng m\u1EA1ch quay (Radial Artery - \u01AFu ti\xEAn h\xE0ng \u0111\u1EA7u):</strong> N\xF4ng, d\u1EC5 c\u1ED1 \u0111\u1ECBnh, \xEDt bi\u1EBFn ch\u1EE9ng, c\xF3 cung b\xE0ng h\u1EC7 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 b\u1EA3o v\u1EC7 (ph\u1EA3i l\xE0m Test Allen tr\u01B0\u1EDBc). G\xF3c \u0111\xE2m kim: <strong>45\xB0</strong>.</li>
                  <li><strong>2. \u0110\u1ED9ng m\u1EA1ch c\xE1nh tay (Brachial Artery - L\u1EF1a ch\u1ECDn 2):</strong> N\u1EB1m s\xE2u \u1EDF n\u1EBFp khu\u1EF7u, nguy c\u01A1 t\u1ED5n th\u01B0\u01A1ng d\xE2y th\u1EA7n kinh gi\u1EEFa (Median nerve) v\xE0 b\xE0ng h\u1EC7 k\xE9m h\u01A1n. G\xF3c \u0111\xE2m kim: <strong>60\xB0</strong>.</li>
                  <li><strong>3. \u0110\u1ED9ng m\u1EA1ch \u0111\xF9i (Femoral Artery - L\u1EF1a ch\u1ECDn c\u1EA5p c\u1EE9u):</strong> D\u01B0\u1EDBi d\xE2y ch\u1EB1ng b\u1EB9n 2cm. D\xE0nh cho b\u1EC7nh nh\xE2n ng\u1EEBng tu\u1EA7n ho\xE0n h\xF4 h\u1EA5p ho\u1EB7c t\u1EE5t huy\u1EBFt \xE1p n\u1EB7ng kh\xF4ng b\u1EAFt \u0111\u01B0\u1EE3c m\u1EA1ch ngo\u1EA1i vi. G\xF3c \u0111\xE2m kim: <strong>90\xB0</strong> (vu\xF4ng g\xF3c).</li>
                </ul>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-list-ol text-primary"></i> 5 B\u01B0\u1EDBc Thao T\xE1c Chu\u1EA9n:</h4>
                <ol>
                  <li><strong>Chu\u1EA9n b\u1ECB:</strong> B\u01A1m ti\xEAm chuy\xEAn d\u1EE5ng tr\xE1ng s\u1EB5n Heparin kh\xF4 (Lithium Heparin), kim 23G ho\u1EB7c 25G.</li>
                  <li><strong>S\xE1t khu\u1EA9n & C\u1ED1 \u0111\u1ECBnh:</strong> Ng\u1EEDa c\u1ED5 tay, l\xF3t g\u1EA1c d\u01B0\u1EDBi c\u1ED5 tay g\xF3c 30-45\xB0. S\xE1t khu\u1EA9n c\u1ED3n iod/chlorhexidine. B\u1EAFt r\xF5 m\u1EA1ch \u0111\u1EADp gi\u1EEFa ng\xF3n tr\u1ECF v\xE0 ng\xF3n gi\u1EEFa.</li>
                  <li><strong>\u0110\xE2m kim:</strong> M\u1EB7t v\xE1t kim h\u01B0\u1EDBng l\xEAn tr\xEAn, \u0111\xE2m g\xF3c 45\xB0 ng\u01B0\u1EE3c chi\u1EC1u d\xF2ng m\xE1u cho \u0111\u1EBFn khi m\xE1u \u0111\u1ECF t\u01B0\u01A1i t\u1EF1 \u0111\u1ED9ng \u0111\u1EA9y piston d\xE2ng l\xEAn (kh\xF4ng c\u1EA7n h\xFAt m\u1EA1nh). L\u1EA5y \u0111\u1EE7 1 - 1.5 mL.</li>
                  <li><strong>\u0110u\u1ED5i kh\xED & \u0110\xF3ng n\xFAt:</strong> \u0110\xE2m kim v\xE0o n\xFAt cao su/n\u1EAFp b\u1EA3o v\u1EC7, \u0111\u1EA9y b\u1ECDt kh\xED ra ngo\xE0i ngay l\u1EADp t\u1EE9c (tr\xE1nh PaO2 sai l\u1EC7ch). L\u0103n nh\u1EB9 b\u01A1m ti\xEAm gi\u1EEFa hai l\xF2ng b\xE0n tay \u0111\u1EC3 tr\u1ED9n \u0111\u1EC1u heparin.</li>
                  <li><strong>\xC9p c\u1EA7m m\xE1u:</strong> \u0110\xE8 \xE9p g\u1EA1c ch\u1EB7t t\u1EA1i v\u1ECB tr\xED ch\u1ECDc \xEDt nh\u1EA5t <strong>5 ph\xFAt li\xEAn t\u1EE5c</strong> (10-15 ph\xFAt n\u1EBFu c\xF3 r\u1ED1i lo\u1EA1n \u0111\xF4ng m\xE1u ho\u1EB7c \u0111ang d\xF9ng kh\xE1ng \u0111\xF4ng).</li>
                </ol>
              </div>

              <div class="abg-proc-box" style="grid-column: 1 / -1;">
                <h4><i class="fa-solid fa-triangle-exclamation text-amber-500"></i> C\xE1c C\u1EA1m B\u1EABy Sai S\u1ED1 C\u1EADn L\xE2m S\xE0ng Th\u01B0\u1EDDng G\u1EB7p (Pre-analytical Errors):</h4>
                <div class="abg-table-wrap">
                  <table class="abg-proc-table">
                    <thead>
                      <tr><th>L\u1ED7i ti\u1EC1n x\xE9t nghi\u1EC7m</th><th>C\u01A1 ch\u1EBF t\xE1c \u0111\u1ED9ng</th><th>H\u1EADu qu\u1EA3 sai l\u1EC7ch ch\u1EC9 s\u1ED1</th></tr>
                    </thead>
                    <tbody>
                      <tr><td><strong>L\u1ECDt b\u1ECDt kh\xED trong xilanh</strong></td><td>C\xE2n b\u1EB1ng kh\xED v\u1EDBi kh\xF4ng kh\xED ph\xF2ng (PO2 kh\xED ph\xF2ng ~ 150 mmHg, PCO2 ~ 0 mmHg)</td><td>PaO2 t\u0103ng gi\u1EA3 t\u1EA1o, PaCO2 gi\u1EA3m gi\u1EA3 t\u1EA1o, pH t\u0103ng nh\u1EB9.</td></tr>
                      <tr><td><strong>Ch\u1EADm tr\u1EC5 g\u1EEDi m\u1EABu (> 20 ph\xFAt kh\xF4ng \u01B0\u1EDBp \u0111\xE1)</strong></td><td>B\u1EA1ch c\u1EA7u v\xE0 h\u1ED3ng c\u1EA7u ti\u1EBFp t\u1EE5c ti\xEAu th\u1EE5 oxy v\xE0 chuy\u1EC3n h\xF3a k\u1EF5 kh\xED sinh acid lactic</td><td>PaO2 gi\u1EA3m s\xE2u, PaCO2 t\u0103ng gi\u1EA3 t\u1EA1o, pH gi\u1EA3m (toan gi\u1EA3).</td></tr>
                      <tr><td><strong>Th\u1EEBa Heparin l\u1ECFng trong b\u01A1m</strong></td><td>Dung d\u1ECBch Heparin acid l\xE0m lo\xE3ng m\u1EABu m\xE1u</td><td>pH gi\u1EA3m gi\u1EA3 t\u1EA1o, PaCO2 gi\u1EA3m pha lo\xE3ng, HCO3- gi\u1EA3m.</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `;
        case "allen":
          return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-hand text-primary"></i> Nghi\u1EC7m Ph\xE1p Allen C\u1EA3i Bi\xEAn (Modified Allen's Test)</h3>
              <p class="text-muted">Quy tr\xECnh b\u1EAFt bu\u1ED9c ph\u1EA3i th\u1EF1c hi\u1EC7n tr\u01B0\u1EDBc khi ch\u1ECDc \u0111\u1ED9ng m\u1EA1ch quay \u0111\u1EC3 x\xE1c \u0111\u1ECBnh t\xEDnh to\xE0n v\u1EB9n c\u1EE7a cung b\xE0ng h\u1EC7 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5.</p>
            </div>

            <div class="abg-allen-steps-grid">
              <div class="abg-allen-step">
                <span class="abg-step-badge">B\u01B0\u1EDBc 1</span>
                <strong>\u0110\xE8 \xE9p \u0111\u1ED3ng th\u1EDDi 2 m\u1EA1ch</strong>
                <p>Y\xEAu c\u1EA7u b\u1EC7nh nh\xE2n gi\u01A1 cao tay, n\u1EAFm ch\u1EB7t n\u1EAFm tay l\u1EA1i trong 30 gi\xE2y. B\xE1c s\u0129 d\xF9ng c\xE1c \u0111\u1EA7u ng\xF3n tay \xE9p ch\u1EB7t \u0111\u1ED3ng th\u1EDDi c\u1EA3 \u0111\u1ED9ng m\u1EA1ch quay v\xE0 \u0111\u1ED9ng m\u1EA1ch tr\u1EE5 \u1EDF c\u1ED5 tay.</p>
              </div>

              <div class="abg-allen-step">
                <span class="abg-step-badge">B\u01B0\u1EDBc 2</span>
                <strong>M\u1EDF b\xE0n tay - B\xE0n tay nh\u1EE3t</strong>
                <p>B\u1EC7nh nh\xE2n m\u1EDF b\xE0n tay ra (kh\xF4ng du\u1ED7i qu\xE1 c\u0103ng). L\xF2ng b\xE0n tay v\xE0 c\xE1c \u0111\u1EA7u ng\xF3n tay l\xFAc n\xE0y ph\u1EA3i nh\u1EE3t nh\u1EA1t, t\xE1i tr\u1EAFng do m\u1EA5t ho\xE0n to\xE0n d\xF2ng m\xE1u nu\xF4i d\u01B0\u1EE1ng.</p>
              </div>

              <div class="abg-allen-step">
                <span class="abg-step-badge">B\u01B0\u1EDBc 3</span>
                <strong>Bu\xF4ng \xE1p l\u1EF1c \u0110\u1ED9ng m\u1EA1ch tr\u1EE5</strong>
                <p>B\xE1c s\u0129 th\u1EA3 l\u1ECFng tay \u0111ang \u0111\xE8 \xE9p \u0110\u1ED9ng m\u1EA1ch tr\u1EE5, nh\u01B0ng V\u1EAAN TI\u1EBEP T\u1EE4C \u0110\xC8 CH\u1EB6T \u0110\u1ED9ng m\u1EA1ch quay. Quan s\xE1t th\u1EDDi gian l\xF2ng b\xE0n tay h\u1ED3ng h\xE0o tr\u1EDF l\u1EA1i.</p>
              </div>

              <div class="abg-allen-step abg-allen-step--result">
                <span class="abg-step-badge" style="background: #10b981;">\u0110\xE1nh Gi\xE1 K\u1EBFt Qu\u1EA3</span>
                <p><strong>\u2022 Test Allen D\u01AF\u01A0NG T\xCDNH (B\xECnh th\u01B0\u1EDDng):</strong> L\xF2ng b\xE0n tay h\u1ED3ng tr\u1EDF l\u1EA1i trong v\xF2ng <strong>< 7 - 10 gi\xE2y</strong> \u2192 Cung b\xE0ng h\u1EC7 \u0110M tr\u1EE5 t\u1ED1t, <em>AN TO\xC0N \u0111\u1EC3 ch\u1ECDc \u0110M quay</em>.</p>
                <p><strong>\u2022 Test Allen \xC2M T\xCDNH (B\u1EA5t th\u01B0\u1EDDng):</strong> Sau <strong>> 10 - 14 gi\xE2y</strong> b\xE0n tay v\u1EABn nh\u1EE3t nh\u1EA1t \u2192 Cung b\xE0ng h\u1EC7 t\u1EAFc ngh\u1EBDn ho\u1EB7c k\xE9m ph\xE1t tri\u1EC3n, <em>CH\u1ED0NG CH\u1EC8 \u0110\u1ECANH ch\u1ECDc \u0110M quay tay n\xE0y</em> (nguy c\u01A1 ho\u1EA1i t\u1EED b\xE0n tay n\u1EBFu t\u1EAFc m\u1EA1ch).</p>
              </div>
            </div>
          </div>
        `;
        case "vbg":
          return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-arrows-split-up-and-left text-purple-600"></i> \u0110\u1ED1i Chi\u1EBFu Kh\xED M\xE1u T\u0129nh M\u1EA1ch (VBG) vs \u0110\u1ED9ng M\u1EA1ch (ABG)</h3>
              <p class="text-muted">Khi n\xE0o VBG c\xF3 th\u1EC3 thay th\u1EBF ABG \u0111\u1EC3 gi\u1EA3m \u0111au \u0111\u1EDBn v\xE0 bi\u1EBFn ch\u1EE9ng cho ng\u01B0\u1EDDi b\u1EC7nh?</p>
            </div>

            <div class="abg-table-wrap" style="margin-bottom: 1.5rem;">
              <table class="abg-proc-table">
                <thead>
                  <tr>
                    <th>Ch\u1EC9 s\u1ED1</th>
                    <th>Kh\xED m\xE1u \u0110\u1ED9ng m\u1EA1ch (ABG)</th>
                    <th>Kh\xED m\xE1u T\u0129nh m\u1EA1ch (VBG)</th>
                    <th>M\u1EE9c \u0111\u1ED9 ch\xEAnh l\u1EC7ch (VBG - ABG)</th>
                    <th>\xDD ngh\u0129a l\xE2m s\xE0ng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>pH M\xE1u</strong></td>
                    <td>7.35 - 7.45</td>
                    <td>7.31 - 7.41</td>
                    <td><strong>Th\u1EA5p h\u01A1n 0.03 - 0.05</strong></td>
                    <td>T\u01B0\u01A1ng quan c\u1EF1c cao (r > 0.95). VBG ho\xE0n to\xE0n ph\u1EA3n \xE1nh trung th\u1EF1c t\xECnh tr\u1EA1ng toan ki\u1EC1m m\xE1u.</td>
                  </tr>
                  <tr>
                    <td><strong>PCO2 (mmHg)</strong></td>
                    <td>35 - 45</td>
                    <td>40 - 50</td>
                    <td><strong>Cao h\u01A1n 4 - 6 mmHg</strong></td>
                    <td>N\u1EBFu PvCO2 < 40 mmHg th\xEC ch\u1EAFc ch\u1EAFn PaCO2 kh\xF4ng b\u1ECB \u1EE9 CO2; nh\u01B0ng n\u1EBFu s\u1ED1c n\u1EB7ng, PvCO2 \u1EE9 \u0111\u1ECDng nhi\u1EC1u c\xF3 th\u1EC3 ch\xEAnh l\u1EC7ch l\u1EDBn h\u01A1n.</td>
                  </tr>
                  <tr>
                    <td><strong>HCO3- (mmol/L)</strong></td>
                    <td>22 - 26</td>
                    <td>23 - 27</td>
                    <td><strong>Cao h\u01A1n 1 - 2 mmol/L</strong></td>
                    <td>T\u01B0\u01A1ng quan l\xE2m s\xE0ng ho\xE0n h\u1EA3o, ho\xE0n to\xE0n d\xF9ng \u0111\u01B0\u1EE3c \u0111\u1EC3 t\xEDnh Anion Gap.</td>
                  </tr>
                  <tr>
                    <td><strong>Lactate</strong></td>
                    <td>0.5 - 1.6 mmol/L</td>
                    <td>0.5 - 2.0 mmol/L</td>
                    <td><strong>T\u01B0\u01A1ng \u0111\u01B0\u01A1ng (\xB1 0.2)</strong></td>
                    <td>VBG d\xF9ng r\u1EA5t t\u1ED1t \u0111\u1EC3 t\u1EA7m so\xE1t nhi\u1EC5m toan lactic v\xE0 s\u1ED1c nhi\u1EC5m khu\u1EA9n.</td>
                  </tr>
                  <tr>
                    <td><strong>PO2 (mmHg)</strong></td>
                    <td>80 - 100</td>
                    <td>30 - 40</td>
                    <td><strong>KH\xD4NG C\xD3 T\u01AF\u01A0NG QUAN</strong></td>
                    <td><span class="text-danger">TUY\u1EC6T \u0110\u1ED0I KH\xD4NG D\xD9NG VBG \u0111\u1EC3 \u0111\xE1nh gi\xE1 thi\u1EBFu oxy m\xE1u, t\xEDnh P/F ratio hay A-a gradient!</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="abg-proc-grid">
              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-circle-check text-emerald-600"></i> Tr\u01B0\u1EDDng H\u1EE3p VBG \u0110\u01AF\u1EE2C PH\xC9P Thay Th\u1EBF ABG:</h4>
                <ul>
                  <li>Theo d\xF5i \u0111\xE1p \u1EE9ng \u0111i\u1EC1u tr\u1ECB Toan Ceton \u0110\xE1i Th\xE1o \u0110\u01B0\u1EDDng (DKA) (theo h\u01B0\u1EDBng d\u1EABn ADA).</li>
                  <li>\u0110\xE1nh gi\xE1 b\xF9 d\u1ECBch v\xE0 h\u1EA1 \u0111\u01B0\u1EDDng huy\u1EBFt, theo d\xF5i ion \u0111\u1ED3 Kali, Natri, Clo.</li>
                  <li>T\u1EA7m so\xE1t nhanh t\xECnh tr\u1EA1ng Toan chuy\u1EC3n h\xF3a v\xE0 \u0111o Lactate m\xE1u \u1EDF khoa C\u1EA5p c\u1EE9u.</li>
                  <li>Ng\u1ED9 \u0111\u1ED9c kh\xED CO (Carboxyhemoglobin) ho\u1EB7c Methemoglobinemia (t\u01B0\u01A1ng quan 99% gi\u1EEFa ABG v\xE0 VBG).</li>
                </ul>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-circle-xmark text-danger"></i> Tr\u01B0\u1EDDng H\u1EE3p B\u1EAET BU\u1ED8C Ph\u1EA3i L\u1EA5y Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch (ABG):</h4>
                <ul>
                  <li>B\u1EC7nh nh\xE2n suy h\xF4 h\u1EA5p c\u1EA5p, nghi ng\u1EDD ARDS, vi\xEAm ph\u1ED5i n\u1EB7ng, thuy\xEAn t\u1EAFc ph\u1ED5i.</li>
                  <li>C\u1EA7n t\xEDnh ch\xEDnh x\xE1c ph\xE2n \xE1p Oxy m\xE1u \u0111\u1ED9ng m\u1EA1ch PaO2, ch\u1EC9 s\u1ED1 PaO2/FiO2 v\xE0 A-a gradient.</li>
                  <li>B\u1EC7nh nh\xE2n \u0111ang th\u1EDF m\xE1y c\u1EA7n c\xE0i \u0111\u1EB7t th\xF4ng s\u1ED1 PEEP, FiO2, th\u1EC3 t\xEDch th\xF4ng kh\xED Vt.</li>
                  <li>S\u1ED1c s\xE2u co m\u1EA1ch ngo\u1EA1i vi n\u1EB7ng (khi m\xE1u t\u0129nh m\u1EA1ch ngo\u1EA1i vi b\u1ECB \u1EE9 \u0111\u1ECDng chuy\u1EC3n h\xF3a y\u1EBFm kh\xED c\u1EF1c \u0111\u1ED9).</li>
                </ul>
              </div>
            </div>
          </div>
        `;
        case "physiology":
          return `
          <div class="abg-proc-content">
            <div class="abg-proc-head">
              <h3><i class="fa-solid fa-dna text-indigo-600"></i> Sinh L\xFD H\u1ECDc Th\u0103ng B\u1EB1ng Toan Ki\u1EC1m & Ba Tuy\u1EBFn Ph\xF2ng Th\u1EE7 C\u1EE7a C\u01A1 Th\u1EC3</h3>
              <p class="text-muted">C\u01A1 ch\u1EBF duy tr\xEC n\u1ED3ng \u0111\u1ED9 ion H+ trong kho\u1EA3ng sinh l\xFD h\u1EB9p 35 - 45 nmol/L (pH 7.35 - 7.45).</p>
            </div>

            <div class="abg-proc-grid">
              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-square-root-variable text-primary"></i> 1. Ph\u01B0\u01A1ng Tr\xECnh Henderson - Hasselbalch:</h4>
                <div class="abg-formula-box">
                  <strong>pH = 6.1 + log ( [HCO3-] / (0.03 \xD7 PaCO2) )</strong>
                </div>
                <p style="font-size: 0.83rem; margin-top: 0.5rem;">
                  T\u1EF7 s\u1ED1 chu\u1EA9n [HCO3-] / (0.03 \xD7 PaCO2) = 24 / (0.03 \xD7 40) = 24 / 1.2 = <strong>20 : 1</strong>. Khi t\u1EF7 s\u1ED1 n\xE0y gi\u1EEF v\u1EEFng 20:1, pH m\xE1u s\u1EBD duy tr\xEC ch\xEDnh x\xE1c \u1EDF m\u1EE9c 7.40.
                </p>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-shield-halved text-success"></i> 2. Tuy\u1EBFn Ph\xF2ng Th\u1EE7 1: H\u1EC7 \u0110\u1EC7m H\xF3a H\u1ECDc (V\xE0i Gi\xE2y):</h4>
                <ul>
                  <li><strong>H\u1EC7 \u0111\u1EC7m Bicarbonate (H2CO3 / HCO3-):</strong> H\u1EC7 \u0111\u1EC7m ngo\u1EA1i b\xE0o quan tr\u1ECDng nh\u1EA5t, chi\u1EBFm 65% dung l\u01B0\u1EE3ng \u0111\u1EC7m, m\u1EDF v\xEC CO2 c\xF3 th\u1EC3 \u0111\xE0o th\u1EA3i qua ph\u1ED5i v\xE0 HCO3- \u0111\u01B0\u1EE3c \u0111i\u1EC1u h\xF2a b\u1EDFi th\u1EADn.</li>
                  <li><strong>H\u1EC7 \u0111\u1EC7m Hemoglobin & Protein:</strong> Chi\u1EBFm 30% dung l\u01B0\u1EE3ng \u0111\u1EC7m, \u0111\u1EC7m n\u1ED9i b\xE0o qua c\xE1c g\u1ED1c histidine.</li>
                  <li><strong>H\u1EC7 \u0111\u1EC7m Phosphate (HPO4 2- / H2PO4 -):</strong> \u0110\u1EC7m quan tr\u1ECDng trong d\u1ECBch \u1ED1ng th\u1EADn v\xE0 n\u1ED9i b\xE0o.</li>
                </ul>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-lungs text-blue-600"></i> 3. Tuy\u1EBFn Ph\xF2ng Th\u1EE7 2: \u0110i\u1EC1u H\xF2a H\xF4 H\u1EA5p (V\xE0i Ph\xFAt \u0111\u1EBFn V\xE0i Gi\u1EDD):</h4>
                <p style="font-size: 0.83rem; line-height: 1.5;">
                  C\xE1c th\u1EE5 th\u1EC3 h\xF3a h\u1ECDc (Chemoreceptors) trung \u01B0\u01A1ng \u1EDF h\xE0nh n\xE3o v\xE0 ngo\u1EA1i vi \u1EDF xoang c\u1EA3nh / quai \u0111\u1ED9ng m\u1EA1ch ch\u1EE7 c\u1EF1c k\u1EF3 nh\u1EA1y c\u1EA3m v\u1EDBi pH v\xE0 PaCO2. Khi pH gi\u1EA3m ho\u1EB7c PaCO2 t\u0103ng, trung t\xE2m h\xF4 h\u1EA5p l\u1EADp t\u1EE9c k\xEDch th\xEDch t\u0103ng t\u1EA7n s\u1ED1 v\xE0 bi\xEAn \u0111\u1ED9 th\u1EDF (th\u1EDF nhanh s\xE2u ki\u1EC3u Kussmaul) \u0111\u1EC3 \u0111\xE0o th\u1EA3i CO2, \u0111\u01B0a pH v\u1EC1 g\u1EA7n m\u1EE9c b\xECnh th\u01B0\u1EDDng.
                </p>
              </div>

              <div class="abg-proc-box">
                <h4><i class="fa-solid fa-kidneys text-amber-600"></i> 4. Tuy\u1EBFn Ph\xF2ng Th\u1EE7 3: B\xF9 Tr\u1EEB Th\u1EADn (V\xE0i Ng\xE0y: 3 - 5 Ng\xE0y):</h4>
                <p style="font-size: 0.83rem; line-height: 1.5;">
                  Tuy\u1EBFn b\xF9 tr\u1EEB ch\u1EADm nh\u1EA5t nh\u01B0ng c\xF3 c\xF4ng su\u1EA5t v\xF4 h\u1EA1n:
                  <br>\u2022 T\xE1i h\u1EA5p thu 99.9% l\u01B0\u1EE3ng Bicarbonate l\u1ECDc qua c\u1EA7u th\u1EADn (ch\u1EE7 y\u1EBFu t\u1EA1i \u1ED1ng l\u01B0\u1EE3n g\u1EA7n).
                  <br>\u2022 B\xE0i ti\u1EBFt ion H+ ch\u1EE7 \u0111\u1ED9ng qua b\u01A1m H+-ATPase v\xE0 trao \u0111\u1ED5i Na+/H+ t\u1EA1i \u1ED1ng l\u01B0\u1EE3n xa.
                  <br>\u2022 S\u1EA3n sinh Bicarbonate m\u1EDBi th\xF4ng qua qu\xE1 tr\xECnh t\u1EA1o Amoniac (NH3 + H+ \u2192 NH4+) v\xE0 acid chu\u1EA9n \u0111\u1ED9 \u0111\u01B0\u1EE3c (H2PO4-).
                </p>
              </div>
            </div>
          </div>
        `;
      }
    }
    attachEventListeners() {
      this.container.querySelectorAll(".abg-subnav-pill[data-tree]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tree = e.currentTarget.dataset.tree;
          if (tree) {
            this.activeTree = tree;
            this.render();
            this.attachEventListeners();
          }
        });
      });
      this.container.querySelectorAll(".abg-subnav-pill[data-proc]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const proc = e.currentTarget.dataset.proc;
          if (proc) {
            this.activeProcedureSub = proc;
            this.render();
            this.attachEventListeners();
          }
        });
      });
      const pco2Range = this.container.querySelector("#nomo-range-pco2");
      const phRange = this.container.querySelector("#nomo-range-ph");
      if (pco2Range && phRange) {
        const updateNomogram = () => {
          this.nomogramPco2 = parseInt(pco2Range.value, 10);
          this.nomogramPh = parseFloat(phRange.value);
          const valPco2 = this.container.querySelector("#nomo-val-pco2");
          const valPh = this.container.querySelector("#nomo-val-ph");
          const readH = this.container.querySelector("#nomo-readout-h");
          const readHco3 = this.container.querySelector("#nomo-readout-hco3");
          const zoneBadge = this.container.querySelector("#nomo-zone-badge");
          if (valPco2) valPco2.textContent = `${this.nomogramPco2} mmHg`;
          if (valPh) valPh.textContent = this.nomogramPh.toFixed(2);
          const currentH = Math.round(Math.pow(10, 9 - this.nomogramPh));
          const approxHco3 = Math.round(24 * this.nomogramPco2 / Math.max(10, currentH));
          if (readH) readH.textContent = `${currentH} nmol/L`;
          if (readHco3) readHco3.textContent = `${approxHco3} mmol/L`;
          if (zoneBadge) {
            let name = "V\xF9ng B\xECnh Th\u01B0\u1EDDng (Normal Buffer Line)";
            let cls = "abg-badge abg-badge--success";
            if (this.nomogramPh < 7.35 && this.nomogramPco2 > 45) {
              name = "Toan H\xF4 H\u1EA5p (C\u1EA5p t\xEDnh ho\u1EB7c M\u1EA1n t\xEDnh b\xF9 tr\u1EEB)";
              cls = "abg-badge abg-badge--danger";
            } else if (this.nomogramPh < 7.35 && this.nomogramPco2 <= 45) {
              name = "Toan Chuy\u1EC3n H\xF3a (Metabolic Acidosis)";
              cls = "abg-badge abg-badge--danger";
            } else if (this.nomogramPh > 7.45 && this.nomogramPco2 < 35) {
              name = "Ki\u1EC1m H\xF4 H\u1EA5p (Respiratory Alkalosis)";
              cls = "abg-badge abg-badge--primary";
            } else if (this.nomogramPh > 7.45 && this.nomogramPco2 >= 35) {
              name = "Ki\u1EC1m Chuy\u1EC3n H\xF3a (Metabolic Alkalosis)";
              cls = "abg-badge abg-badge--primary";
            } else if (this.nomogramPh >= 7.35 && this.nomogramPh <= 7.45 && (this.nomogramPco2 < 35 || this.nomogramPco2 > 45)) {
              name = "R\u1ED1i lo\u1EA1n Toan - Ki\u1EC1m H\u1ED7n H\u1EE3p \u0111\xE3 b\xF9 tr\u1EEB ho\xE0n to\xE0n";
              cls = "abg-badge abg-badge--warning";
            }
            zoneBadge.className = cls;
            zoneBadge.textContent = name;
          }
        };
        pco2Range.addEventListener("input", updateNomogram);
        phRange.addEventListener("input", updateNomogram);
      }
      const btnNomoToAnalyzer = this.container.querySelector("#btn-nomogram-to-analyzer");
      if (btnNomoToAnalyzer) {
        btnNomoToAnalyzer.addEventListener("click", () => {
          const currentH = Math.round(Math.pow(10, 9 - this.nomogramPh));
          const approxHco3 = Math.round(24 * this.nomogramPco2 / Math.max(10, currentH));
          this.currentInput.pH = this.nomogramPh;
          this.currentInput.pCO2 = this.nomogramPco2;
          this.currentInput.hco3 = approxHco3;
          this.currentInput.be = Math.round(approxHco3 - 24);
          this.currentTab = "analyzer";
          this.render();
          this.attachEventListeners();
          this.showToast(`\u0110\xE3 chuy\u1EC3n th\xF4ng s\u1ED1 Nomogram (pH ${this.nomogramPh.toFixed(2)}, PaCO2 ${this.nomogramPco2}) sang m\xE1y t\xEDnh!`);
        });
      }
      this.container.querySelectorAll(".abg-tab-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tab = e.currentTarget.dataset.tab;
          if (tab && tab !== this.currentTab) {
            this.currentTab = tab;
            this.render();
            this.attachEventListeners();
          }
        });
      });
      this.container.querySelectorAll(".abg-preset-chip").forEach((chip) => {
        chip.addEventListener("click", (e) => {
          const idx = parseInt(e.currentTarget.dataset.presetIdx || "0", 10);
          this.currentInput = { ...ABG_PRESETS[idx].input };
          this.render();
          this.attachEventListeners();
        });
      });
      const resetBtn = this.container.querySelector("#btn-reset-normal");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          this.currentInput = { ...ABG_PRESETS[0].input };
          this.render();
          this.attachEventListeners();
        });
      }
      const inputs = ["ph", "pco2", "po2", "hco3", "be", "sao2", "fio2", "age", "na", "k", "cl", "alb", "lac", "glu"];
      inputs.forEach((key) => {
        const el = this.container.querySelector(`#inp-${key}`);
        if (el) {
          el.addEventListener("input", () => {
            this.readFormInputs();
            const result = analyzeABG(this.currentInput);
            const resultsCol = this.container.querySelector(".abg-results-wrap");
            if (resultsCol) {
              resultsCol.outerHTML = this.renderAnalyzerResultsOnly(result);
            }
          });
        }
      });
      const loadCaseBtn = this.container.querySelector("#btn-load-case-to-calc");
      if (loadCaseBtn) {
        loadCaseBtn.addEventListener("click", (e) => {
          const caseId = parseInt(e.currentTarget.dataset.loadCase || "1", 10);
          const c = CLINICAL_CASES.find((x) => x.id === caseId);
          if (c) {
            this.currentInput = { ...c.abg };
            this.currentTab = "analyzer";
            this.render();
            this.attachEventListeners();
            this.showToast(`\u0110\xE3 n\u1EA1p th\xF4ng s\u1ED1 Ca #${caseId} v\xE0o m\xE1y t\xEDnh!`);
          }
        });
      }
      this.container.querySelectorAll(".abg-case-item-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          const id = parseInt(e.currentTarget.dataset.caseId || "1", 10);
          this.selectedCaseId = id;
          this.render();
          this.attachEventListeners();
        });
      });
      const glossaryInp = this.container.querySelector("#inp-glossary-search");
      if (glossaryInp) {
        glossaryInp.addEventListener("input", (e) => {
          this.glossaryFilter = e.target.value;
          const glossaryTabContent = this.container.querySelector(".abg-input-card");
          if (glossaryTabContent) {
            this.render();
            this.attachEventListeners();
            const newInp = this.container.querySelector("#inp-glossary-search");
            if (newInp) {
              newInp.focus();
              newInp.setSelectionRange(newInp.value.length, newInp.value.length);
            }
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
    readFormInputs() {
      const getVal = (id, def) => {
        const el = this.container.querySelector(`#inp-${id}`);
        if (!el) return def;
        const v = parseFloat(el.value);
        return isNaN(v) ? def : v;
      };
      this.currentInput = {
        unit: "mmHg",
        pH: getVal("ph", 7.4),
        pCO2: getVal("pco2", 40),
        pO2: getVal("po2", 95),
        hco3: getVal("hco3", 24),
        be: getVal("be", 0),
        sao2: getVal("sao2", 98),
        fio2: getVal("fio2", 21),
        patientAge: getVal("age", 40),
        na: getVal("na", 140),
        k: getVal("k", 4),
        cl: getVal("cl", 102),
        albumin: getVal("alb", 40),
        lactate: getVal("lac", 1),
        glucose: getVal("glu", 5.5)
      };
    }
    renderAnalyzerResultsOnly(result) {
      return `
      <section class="abg-results-wrap">
        <!-- Primary Diagnosis Banner -->
        <div class="abg-diagnosis-banner">
          <div class="abg-diagnosis-badge-row">
            <span class="abg-badge ${result.acidBase.category === "normal" ? "abg-badge--success" : "abg-badge--danger"}">
              <i class="fa-solid fa-heart-pulse"></i> ${result.acidBase.title}
            </span>
            <span class="abg-badge ${result.gasExchange.isHypoxaemia ? "abg-badge--danger" : "abg-badge--success"}">
              <i class="fa-solid fa-wind"></i> ${result.gasExchange.title}
            </span>
            <span class="abg-badge abg-badge--primary">
              ${result.calculations.pfClass}
            </span>
          </div>
          <h2 class="abg-diag-main-title">${result.acidBase.description}</h2>
          <p class="abg-diag-desc">${result.gasExchange.description}</p>
        </div>

        <!-- Critical Alerts if any -->
        ${result.criticalWarnings.length > 0 ? `
          <div class="abg-alerts-card">
            <div class="abg-alerts-title">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>C\u1EA3nh B\xE1o L\xE2m S\xE0ng Nguy K\u1ECBch (${result.criticalWarnings.length})</span>
            </div>
            ${result.criticalWarnings.map((w) => `
              <div class="abg-alert-item">${w}</div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Key Metrics Bento Grid -->
        <div class="abg-metrics-grid">
          <div class="abg-metric-card">
            <span class="abg-metric-label">Toan/Ki\u1EC1m & [H+]</span>
            <span class="abg-metric-val">${result.calculations.hIonNmol} <span style="font-size: 0.8rem; font-weight: normal;">nmol/L</span></span>
            <span class="abg-metric-sub">pH ${this.currentInput.pH} (Chu\u1EA9n: 35-45 nmol/L)</span>
          </div>

          <div class="abg-metric-card">
            <span class="abg-metric-label">T\u1EF7 s\u1ED1 PaO2/FiO2 (P/F)</span>
            <span class="abg-metric-val" style="color: ${result.calculations.pfRatio < 300 ? "#ef4444" : "#10b981"};">
              ${result.calculations.pfRatio}
            </span>
            <span class="abg-metric-sub">${result.calculations.pfClass}</span>
          </div>

          <div class="abg-metric-card">
            <span class="abg-metric-label">Anion Gap & Hi\u1EC7u Ch\u1EC9nh</span>
            <span class="abg-metric-val" style="color: ${result.calculations.isAnionGapHigh ? "#ef4444" : "var(--abg-ink)"};">
              ${result.calculations.anionGap !== void 0 ? result.calculations.anionGap.toFixed(1) : "--"}
              <span style="font-size: 0.8rem; font-weight: normal;">mmol/L</span>
            </span>
            <span class="abg-metric-sub">
              ${result.calculations.correctedAnionGap ? `AG hi\u1EC7u ch\u1EC9nh Albumin: <b>${result.calculations.correctedAnionGap.toFixed(1)}</b>` : "Chu\u1EA9n: 8-16 mmol/L"}
            </span>
          </div>

          <div class="abg-metric-card">
            <span class="abg-metric-label">A-a Gradient & Delta-Delta</span>
            <span class="abg-metric-val">${result.calculations.aaGradient.toFixed(1)} <span style="font-size: 0.8rem; font-weight: normal;">mmHg</span></span>
            <span class="abg-metric-sub">
              ${result.calculations.deltaRatioInterpretation ? `Delta: ${result.calculations.deltaRatio?.toFixed(2)} (${result.calculations.deltaRatioInterpretation})` : `K\u1EF3 v\u1ECDng: < ${result.calculations.expectedAaGradient.toFixed(1)} mmHg`}
            </span>
          </div>
        </div>

        <!-- 6-Step Structured Clinical Interpretation -->
        <div class="abg-six-steps-card">
          <div class="abg-card-title" style="margin-bottom: 1rem;">
            <span><i class="fa-solid fa-list-check text-blue-600"></i> Quy Tr\xECnh 6 B\u01B0\u1EDBc \u0110\u1ECDc Kh\xED M\xE1u \u0110\u1ED9ng M\u1EA1ch</span>
            <span style="font-size: 0.75rem; color: var(--abg-muted);">Hennessey & Japp / Pierre & Ranson</span>
          </div>

          <div class="abg-step-timeline">
            ${result.sixSteps.map((s) => `
              <div class="abg-step-item">
                <div class="abg-step-num">${s.stepNumber}</div>
                <div class="abg-step-body">
                  <div class="abg-step-name">${s.title}</div>
                  <div class="abg-step-finding">${s.finding}</div>
                  <div class="abg-step-detail">${s.detail}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Treatment Protocols Card -->
        <div class="abg-six-steps-card" style="border-left: 4px solid #10b981;">
          <div class="abg-card-title" style="margin-bottom: 0.75rem;">
            <span><i class="fa-solid fa-notes-medical text-emerald-600"></i> H\u01B0\u1EDBng D\u1EABn \u0110i\u1EC1u Tr\u1ECB & Th\xF4ng Kh\xED \u0110\u1EC1 Xu\u1EA5t</span>
            <span class="abg-badge abg-badge--success">Bedside Decision</span>
          </div>
          <p style="font-size: 0.88rem; font-weight: 600; color: var(--abg-ink); margin: 0 0 0.5rem;">
            ${result.treatmentProtocols.summary}
          </p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">
            <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--abg-primary); text-transform: uppercase;">Li\u1EC7u Ph\xE1p Oxy:</div>
              <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.oxygenTherapy}</div>
            </div>
            <div style="background: var(--abg-bg); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--abg-line);">
              <div style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">H\u1ED7 Tr\u1EE3 Th\xF4ng Kh\xED:</div>
              <div style="font-size: 0.82rem; color: var(--abg-ink); margin-top: 0.25rem;">${result.treatmentProtocols.ventilationSupport}</div>
            </div>
          </div>
        </div>
      </section>
    `;
    }
    exportToSoap() {
      const res = analyzeABG(this.currentInput);
      const agStr = res.calculations.anionGap !== void 0 ? res.calculations.anionGap.toFixed(1) : "N/A";
      const corAgStr = res.calculations.correctedAnionGap ? ` (Hi\u1EC7u ch\u1EC9nh Albumin: ${res.calculations.correctedAnionGap.toFixed(1)})` : "";
      const soapText = `[O - C\u1EACN L\xC2M S\xC0NG] Kh\xED m\xE1u \u0111\u1ED9ng m\u1EA1ch (FiO2 ${this.currentInput.fio2}%):
- pH: ${this.currentInput.pH} | PaCO2: ${this.currentInput.pCO2} mmHg | PaO2: ${this.currentInput.pO2} mmHg
- HCO3-: ${this.currentInput.hco3} mmol/L | BE: ${this.currentInput.be} | SaO2: ${this.currentInput.sao2}%
- \u0110i\u1EC7n gi\u1EA3i: Na ${this.currentInput.na || "--"}, K ${this.currentInput.k || "--"}, Cl ${this.currentInput.cl || "--"} | Albumin: ${this.currentInput.albumin || "--"} g/L | Lactate: ${this.currentInput.lactate || "--"} mmol/L
- Ch\u1EC9 s\u1ED1 t\xEDnh to\xE1n: Anion Gap = ${agStr} mmol/L${corAgStr} | PaO2/FiO2 = ${res.calculations.pfRatio} (${res.calculations.pfClass}) | A-a gradient = ${res.calculations.aaGradient.toFixed(1)} mmHg

[A - \u0110\xC1NH GI\xC1 L\xC2M S\xC0NG]
- Toan ki\u1EC1m: ${res.acidBase.description} (${res.acidBase.compensation})
- Trao \u0111\u1ED5i kh\xED: ${res.gasExchange.description}
${res.criticalWarnings.length > 0 ? `- C\u1EA3nh b\xE1o nguy k\u1ECBch: ${res.criticalWarnings.join("; ")}` : ""}

[P - H\u01AF\u1EDANG X\u1EEC TR\xCD]
- Th\xF4ng kh\xED & Oxy: ${res.treatmentProtocols.oxygenTherapy}; ${res.treatmentProtocols.ventilationSupport}
- \u0110i\u1EC1u tr\u1ECB nguy\xEAn nh\xE2n: ${res.treatmentProtocols.summary}
- Theo d\xF5i: ${res.treatmentProtocols.monitoringAdvice}`;
      navigator.clipboard.writeText(soapText).then(() => {
        this.showToast("\u0110\xE3 sao ch\xE9p c\u1EA5u tr\xFAc b\u1EC7nh \xE1n SOAP v\xE0o khay nh\u1EDB t\u1EA1m!");
      }).catch(() => {
        this.showToast("Sao ch\xE9p th\u1EA5t b\u1EA1i! Vui l\xF2ng c\u1EA5p quy\u1EC1n clipboard.");
      });
    }
    showToast(msg) {
      const toast = document.getElementById("abg-toast");
      const toastMsg = document.getElementById("abg-toast-msg");
      if (toast && toastMsg) {
        toastMsg.innerText = msg;
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 3e3);
      }
    }
  };
  if (typeof window !== "undefined") {
    window.AbgCDSSController = AbgCDSSController;
  }

  // src/content/knowledge-vault/cdss/xray/xray-canvas-renderer.ts
  var XRayCanvasRenderer = class {
    canvas;
    ctx;
    offscreenCanvas;
    offscreenCtx;
    W = 600;
    H = 750;
    examType = "chest_pa";
    findings = [];
    activeFindingId = null;
    hoveredFindingId = null;
    state = {
      zoom: 1,
      panX: 0,
      panY: 0,
      brightness: 0,
      contrast: 0,
      inverted: false,
      showOverlay: true
    };
    isDragging = false;
    startDragX = 0;
    startDragY = 0;
    onSelectFindingCallback;
    constructor(canvas) {
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

  // src/content/knowledge-vault/cdss/xray/xray-cases.ts
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

  // src/content/knowledge-vault/cdss/xray/xray-ui.ts
  var XRayCDSSController = class {
    container;
    cases = DEFAULT_CASES;
    currentCase;
    currentTab = "pacs";
    renderer = null;
    activeFindingId = null;
    knowledgeFilter = "";
    constructor(containerId) {
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

  // src/content/knowledge-vault/cdss/index.ts
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
