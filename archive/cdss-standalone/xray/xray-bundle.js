// public/cdss/xray/xray-cases.ts
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

// public/cdss/xray/xray-canvas-renderer.ts
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

// public/cdss/xray/xray-ui.ts
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
export {
  XRayCDSSController
};
