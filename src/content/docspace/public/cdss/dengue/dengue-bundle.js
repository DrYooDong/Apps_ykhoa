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

// src/content/knowledge-vault/cdss/dengue/dengue-engine.ts
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
export {
  DengueCDSSController
};
