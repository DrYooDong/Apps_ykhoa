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
export {
  XRayCDSSController
};
