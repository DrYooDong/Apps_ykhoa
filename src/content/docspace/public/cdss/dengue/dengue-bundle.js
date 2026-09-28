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
var CLINICAL_SAMPLE_CASES = [
  {
    id: "child-obese",
    icon: "fa-solid fa-child",
    label: "B\xE9 8T B\xE9o Ph\xEC (38kg)",
    tag: "CDC 2014",
    input: {
      ageYears: 8,
      gender: "male",
      actualWeightKg: 38,
      severity: "warning_signs"
    },
    clinicalHighlight: "Tr\u1EBB b\xE9o ph\xEC > 120% chu\u1EA9n: T\u1EF1 \u0111\u1ED9ng d\xF9ng chu\u1EA9n CDC 2014 (26kg) tr\xE1nh ph\xF9 ph\u1ED5i c\u1EA5p."
  },
  {
    id: "child-shock",
    icon: "fa-solid fa-heart-pulse",
    label: "B\xE9 G\xE1i 5T S\u1ED1c (16kg)",
    tag: "S\u1ED1c C\xF2n B\xF9",
    input: {
      ageYears: 5,
      gender: "female",
      actualWeightKg: 16,
      severity: "shock"
    },
    clinicalHighlight: "Tr\u1EBB nh\u1ECF s\u1ED1c c\xF2n b\xF9: Ch\u1ED1ng s\u1ED1c 15 ml/kg/h c\u1EEF 1, theo d\xF5i s\xE1t sinh hi\u1EC7u v\xE0 Hct."
  },
  {
    id: "teen-female",
    icon: "fa-solid fa-person",
    label: "Thi\u1EBFu N\u1EEF 14T (49kg)",
    tag: "D\u1EA5u Hi\u1EC7u C\u1EA3nh B\xE1o",
    input: {
      ageYears: 14,
      gender: "female",
      actualWeightKg: 49,
      severity: "warning_signs"
    },
    clinicalHighlight: "Thi\u1EBFu ni\xEAn n\u1EEF (13-15 tu\u1ED5i): B\xF9 d\u1ECBch b\u1EADc ri\xEAng, chu\u1EA9n b\u1ECB 6 ml/kg/h trong 2h."
  },
  {
    id: "adult-male",
    icon: "fa-solid fa-user-doctor",
    label: "Nam 28T S\u1ED1c (55kg)",
    tag: "Ng\u01B0\u1EDDi L\u1EDBn S\u1ED1c",
    input: {
      ageYears: 28,
      gender: "male",
      actualWeightKg: 55,
      severity: "shock"
    },
    clinicalHighlight: "Ng\u01B0\u1EDDi l\u1EDBn th\u1EC3 tr\u1EA1ng chu\u1EA9n s\u1ED1c c\xF2n b\xF9: B\xF9 d\u1ECBch 15 ml/kg/h r\u1ED3i gi\u1EA3m b\u1EADc 10 ml/kg/h."
  },
  {
    id: "adult-severe-shock",
    icon: "fa-solid fa-bolt",
    label: "N\u1EEF 35T S\u1ED1c N\u1EB7ng (62kg)",
    tag: "M\u1EA1ch 0 - HA 0",
    isDanger: true,
    input: {
      ageYears: 35,
      gender: "female",
      actualWeightKg: 62,
      severity: "severe_shock"
    },
    clinicalHighlight: "S\u1ED1c nguy k\u1ECBch kh\u1EA9n c\u1EA5p: B\u01A1m d\u1ECBch 20 ml/kg/h si\xEAu t\u1ED1c + chu\u1EA9n b\u1ECB Noradrenalin b\u01A1m ti\xEAm \u0111i\u1EC7n."
  }
];
var DengueCDSSController = class {
  constructor(containerId) {
    this.currentPlan = null;
    this.customDurations = {};
    this.activeCaseId = "child-obese";
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
        <!-- TOP CLINICAL TOOLBAR (Header) -->
        <header class="cdss-top-bar">
          <div class="cdss-bar-branding">
            <div class="cdss-icon-badge">
              <i class="fa-solid fa-droplet"></i>
            </div>
            <div class="cdss-brand-titles">
              <h1 class="cdss-brand-title">
                CDSS T\xEDnh D\u1ECBch Truy\u1EC1n & Ch\u1ED1ng S\u1ED1c SXHD Dengue
                <span class="cdss-brand-badge">Q\u0110 2760/BYT 2023</span>
              </h1>
              <div class="cdss-brand-subtitle">
                <span><i class="fa-solid fa-scale-balanced"></i> Chu\u1EA9n CDC 2014</span>
                <span><i class="fa-solid fa-table-columns"></i> C\u1ECDc d\u1ECBch 4 c\u1ED9t</span>
                <span><i class="fa-solid fa-syringe"></i> V\u1EADn m\u1EA1ch B\u01A1m ti\xEAm 50ml</span>
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
            <button id="btn-print" class="cdss-action-btn cdss-action-btn--icon-only" title="In phi\u1EBFu y l\u1EC7nh c\u1ECDc d\u1ECBch">
              <i class="fa-solid fa-print"></i>
            </button>
            <button id="btn-reset-durations" class="cdss-action-btn cdss-action-btn--icon-only" title="Kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng chu\u1EA9n B\u1ED9 Y T\u1EBF">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
          </div>
        </header>

        <!-- 5 CLINICAL SAMPLE CASES QUICK-SELECT BAR -->
        <div class="cdss-cases-bar">
          <div class="cdss-cases-label">
            <i class="fa-solid fa-wand-magic-sparkles"></i> 5 Ca M\u1EABu:
          </div>
          <div class="cdss-cases-list" id="cdss-cases-list">
            ${CLINICAL_SAMPLE_CASES.map((c) => `
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

        <!-- MAIN GRID LAYOUT -->
        <div class="cdss-main-grid">
          <!-- LEFT COLUMN: PATIENT FORM & WEIGHT ANALYZER -->
          <aside class="cdss-left-col">
            <!-- Patient Input Parameters Card -->
            <div class="cdss-card">
              <div class="cdss-card-header">
                <h2 class="cdss-card-title">
                  <i class="fa-solid fa-user-injured"></i> Th\xF4ng Tin & Ph\xE2n T\u1EA7ng
                </h2>
                <span id="case-status-indicator" class="cdss-brand-badge" style="display:none;"></span>
              </div>

              <form id="dengue-input-form">
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

                <!-- Ph\xE2n \u0111\u1ED9 l\xE2m s\xE0ng -->
                <div class="cdss-form-group">
                  <label class="cdss-form-label" for="input-severity">Ph\xE2n \u0110\u1ED9 L\xE2m S\xE0ng SXHD</label>
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

            <!-- CDC 2014 Weight Analysis Card -->
            <div id="weight-analysis-box">
              <!-- Dynamically populated via renderWeightAnalysis -->
            </div>
          </aside>

          <!-- RIGHT COLUMN: CDSS OUTPUT, SCHEDULE & PROTOCOLS -->
          <main class="cdss-right-col">
            <!-- Dynamic Alert Banners -->
            <div id="cdss-alerts-wrap" class="cdss-alerts-container"></div>

            <!-- Summary KPI Bento Grid -->
            <div id="cdss-stats-wrap" class="cdss-kpi-grid"></div>

            <!-- VISUAL FLUID TIMELINE -->
            <div class="cdss-timeline-card">
              <div class="cdss-timeline-header">
                <span class="cdss-timeline-title">
                  <i class="fa-solid fa-chart-gantt"></i> Ti\u1EBFn Tr\xECnh B\u1EADc D\u1ECBch Truy\u1EC1n Theo Gi\u1EDD
                </span>
                <span id="timeline-duration-badge" class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">
                  <!-- Hours -->
                </span>
              </div>
              <div class="cdss-timeline-track" id="cdss-timeline-track">
                <!-- Dynamic timeline segments -->
              </div>
              <div class="cdss-timeline-ticks" id="cdss-timeline-ticks">
                <!-- Dynamic timeline ticks -->
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
                      <th style="width: 22%;">C\u1ED9t 1: M\u1ED1c Gi\u1EDD & Th\u1EDDi L\u01B0\u1EE3ng</th>
                      <th style="width: 28%;">C\u1ED9t 2: T\u1ED1c \u0110\u1ED9 & L\u01B0\u1EE3ng D\u1ECBch C\u1EA7n</th>
                      <th style="width: 26%;">C\u1ED9t 3: D\u1ECBch C\xF3 S\u1EB5n / Treo Th\xEAm</th>
                      <th style="width: 24%;">C\u1ED9t 4: T\u1ED5ng C\u1ECDc & Gi\xE1m S\xE1t</th>
                    </tr>
                  </thead>
                  <tbody id="cdss-fluid-tbody">
                    <!-- Dynamic Rows -->
                  </tbody>
                </table>
              </div>

              <!-- Mobile Responsive Fluid Cards Stack -->
              <div class="cdss-fluid-cards-stack" id="cdss-fluid-cards-stack">
                <!-- Dynamic Mobile Cards -->
              </div>
            </section>

            <!-- ACCORDION: THU\u1ED0C V\u1EACN M\u1EA0CH B\u01A0M TI\xCAM \u0110I\u1EC6N 50ML -->
            <section class="cdss-accordion" id="accordion-vaso">
              <button type="button" class="cdss-accordion-trigger" id="trigger-vaso">
                <div class="cdss-accordion-title-wrap">
                  <i class="fa-solid fa-syringe cdss-accordion-icon"></i>
                  <div>
                    <h3 class="cdss-accordion-title">Ph\xE1c \u0110\u1ED3 Thu\u1ED1c V\u1EADn M\u1EA1ch B\u01A1m Ti\xEAm \u0110i\u1EC7n 50ml</h3>
                    <div class="cdss-accordion-subtitle">C\xF4ng th\u1EE9c pha Dopamin & Noradrenalin chu\u1EA9n h\xF3a theo kg (T\u1ED1c \u0111\u1ED9 1 ml/h = 1 ho\u1EB7c 0.1 \xB5g/kg/ph\xFAt)</div>
                  </div>
                </div>
                <div class="cdss-accordion-right">
                  <span id="vaso-alert-badge" class="cdss-brand-badge" style="display:none;"></span>
                  <i class="fa-solid fa-chevron-down cdss-accordion-chevron"></i>
                </div>
              </button>
              <div class="cdss-accordion-content">
                <div class="cdss-vaso-grid" id="cdss-vaso-grid">
                  <!-- Dopamin & Noradrenalin Cards -->
                </div>
              </div>
            </section>

            <!-- ACCORDION: \u0110I\u1EC0U D\u01AF\u1EE0NG AN TO\xC0N & THEO D\xD5I GI\u1EDC -->
            <section class="cdss-accordion" id="accordion-nursing">
              <button type="button" class="cdss-accordion-trigger" id="trigger-nursing">
                <div class="cdss-accordion-title-wrap">
                  <i class="fa-solid fa-user-nurse cdss-accordion-icon" style="color:var(--cdss-success);"></i>
                  <div>
                    <h3 class="cdss-accordion-title">Quy Tr\xECnh \u0110i\u1EC1u D\u01B0\u1EE1ng An To\xE0n & Theo D\xF5i Gi\u1EDD</h3>
                    <div class="cdss-accordion-subtitle">Ki\u1EC3m so\xE1t d\u1EA5u hi\u1EC7u qu\xE1 t\u1EA3i, \u0111\xEDch n\u01B0\u1EDBc ti\u1EC3u, th\u1EDDi \u0111i\u1EC3m \u0111o l\u1EA1i Hct t\u1EA1i gi\u01B0\u1EDDng</div>
                  </div>
                </div>
                <div class="cdss-accordion-right">
                  <i class="fa-solid fa-chevron-down cdss-accordion-chevron"></i>
                </div>
              </button>
              <div class="cdss-accordion-content">
                <ul class="cdss-nursing-list" id="cdss-nursing-list">
                  <!-- Dynamic Nursing Items -->
                </ul>
              </div>
            </section>
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
    this.setupAccordion("accordion-vaso", "trigger-vaso");
    this.setupAccordion("accordion-nursing", "trigger-nursing");
    const btnReset1 = document.getElementById("btn-reset-durations");
    const btnReset2 = document.getElementById("btn-reset-durations-sub");
    const handleReset = () => {
      this.customDurations = {};
      this.recalculate();
      this.showToast("\u0110\xE3 kh\xF4i ph\u1EE5c th\u1EDDi l\u01B0\u1EE3ng c\u1EEF chu\u1EA9n theo B\u1ED9 Y T\u1EBF!");
    };
    if (btnReset1) btnReset1.addEventListener("click", handleReset);
    if (btnReset2) btnReset2.addEventListener("click", handleReset);
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
  setupAccordion(sectionId, triggerId) {
    const sec = document.getElementById(sectionId);
    const trig = document.getElementById(triggerId);
    if (sec && trig) {
      trig.addEventListener("click", () => {
        sec.classList.toggle("open");
      });
    }
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
    const ind = document.getElementById("case-status-indicator");
    if (ind) {
      ind.textContent = sample.label;
      ind.style.display = "inline-block";
    }
    this.recalculate();
    this.showToast(`\u0110\xE3 \xE1p d\u1EE5ng: ${sample.label}`);
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
    this.renderTimeline(plan);
    this.renderFluidSchedule(plan);
    this.renderVasopressors(plan);
    this.renderNursingList(plan);
    this.updateMobileStickyBar(plan);
    this.renderPrintSheet(plan);
    const vasoSec = document.getElementById("accordion-vaso");
    const vasoBadge = document.getElementById("vaso-alert-badge");
    if (vasoSec) {
      if (plan.patient.severity === "shock" || plan.patient.severity === "severe_shock") {
        vasoSec.classList.add("open");
        if (vasoBadge) {
          vasoBadge.textContent = "Kh\u1EDFi \u0111\u1ED9ng khi s\u1ED1c tr\u01A1 d\u1ECBch";
          vasoBadge.style.display = "inline-block";
        }
      } else {
        if (vasoBadge) vasoBadge.style.display = "none";
      }
    }
  }
  renderWeightAnalysis(plan) {
    const box = document.getElementById("weight-analysis-box");
    if (!box) return;
    const { weightResult, ageGroup } = plan;
    const isObese = weightResult.isObese;
    const ageGroupLabel = ageGroup === "child" ? "Tr\u1EBB em (< 13 tu\u1ED5i)" : ageGroup === "adolescent" ? "Thi\u1EBFu ni\xEAn (13-15T)" : "Ng\u01B0\u1EDDi l\u1EDBn (\u2265 16T)";
    box.innerHTML = `
      <div class="cdss-card cdss-weight-box">
        <div class="cdss-weight-tags-row">
          <span class="cdss-weight-status-badge ${isObese ? "cdss-weight-status-badge--obese" : "cdss-weight-status-badge--normal"}">
            <i class="fa-solid ${isObese ? "fa-triangle-exclamation" : "fa-circle-check"}"></i>
            ${isObese ? "Th\u1EEBa C\xE2n / B\xE9o Ph\xEC (> 120% Chu\u1EA9n)" : "Th\u1EC3 Tr\u1EA1ng H\u1EE3p L\xFD"}
          </span>
          <span style="font-size:0.72rem; font-weight:600; color:var(--cdss-text-muted);">
            ${ageGroupLabel}
          </span>
        </div>

        <div class="cdss-weight-grid">
          <div class="cdss-wcell">
            <span class="cdss-wcell-label">Th\u1EF1c T\u1EBF</span>
            <span class="cdss-wcell-val ${isObese ? "text-danger" : ""}">${weightResult.actualWeightKg} <small>kg</small></span>
          </div>
          <div class="cdss-wcell">
            <span class="cdss-wcell-label">CDC 2014</span>
            <span class="cdss-wcell-val" style="color:var(--cdss-text-muted);">${weightResult.standardWeightKg} <small>kg</small></span>
          </div>
          <div class="cdss-wcell cdss-wcell--highlight">
            <span class="cdss-wcell-label">C\xE2n T\xEDnh D\u1ECBch</span>
            <span class="cdss-wcell-val">${weightResult.adjustedWeightKg} <small>kg</small></span>
          </div>
        </div>

        <div class="cdss-weight-note">
          <i class="fa-solid fa-circle-info"></i>
          <div>${weightResult.formulaNote}</div>
        </div>
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
  renderStats(plan) {
    const wrap = document.getElementById("cdss-stats-wrap");
    if (!wrap) return;
    const mlPerKg = Math.round(plan.totalVolumeMl / plan.weightResult.adjustedWeightKg);
    const bottles500 = Math.ceil(plan.totalVolumeMl / 500);
    wrap.innerHTML = `
      <div class="cdss-kpi-card">
        <div class="cdss-kpi-icon cdss-kpi-icon--blue">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <div class="cdss-kpi-content">
          <span class="cdss-kpi-label">T\u1ED5ng Th\u1EC3 T\xEDch D\u1ECBch G\u1ED9p</span>
          <span class="cdss-kpi-value">${plan.totalVolumeMl.toLocaleString("vi-VN")} <small>ml</small></span>
          <span class="cdss-kpi-sub">~ ${mlPerKg} ml/kg c\xE2n t\xEDnh d\u1ECBch</span>
        </div>
      </div>

      <div class="cdss-kpi-card">
        <div class="cdss-kpi-icon cdss-kpi-icon--purple">
          <i class="fa-solid fa-hourglass-half"></i>
        </div>
        <div class="cdss-kpi-content">
          <span class="cdss-kpi-label">T\u1ED5ng Th\u1EDDi L\u01B0\u1EE3ng D\u1EF1 Ki\u1EBFn</span>
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
    `;
  }
  renderTimeline(plan) {
    const track = document.getElementById("cdss-timeline-track");
    const ticks = document.getElementById("cdss-timeline-ticks");
    const durationBadge = document.getElementById("timeline-duration-badge");
    if (!track || !ticks) return;
    if (durationBadge) {
      durationBadge.textContent = `${plan.totalDurationHours} Gi\u1EDD Truy\u1EC1n`;
    }
    const totalHours = plan.totalDurationHours || 1;
    const colors = ["cdss-seg-1", "cdss-seg-2", "cdss-seg-3", "cdss-seg-4", "cdss-seg-5"];
    track.innerHTML = plan.fluidRows.map((r, idx) => {
      const pct = Math.max(12, Math.round(r.durationHours / totalHours * 100));
      const colClass = colors[idx % colors.length];
      return `
        <div class="cdss-timeline-segment ${colClass}" style="flex: ${r.durationHours};" title="C\u1EEF ${r.stepIndex}: ${r.rateMlKgH} ml/kg/h (${r.durationHours}h) - C\u1EA7n ${r.totalMl} ml">
          <span>${r.rateMlKgH} ml/kg/h</span>
          <small>C\u1EEF ${r.stepIndex} (${r.durationHours}h)</small>
        </div>
      `;
    }).join("");
    const startH = plan.fluidRows[0]?.timeWindow.split(" - ")[0] || "08:00";
    const endH = plan.fluidRows[plan.fluidRows.length - 1]?.timeWindow.split(" - ")[1]?.split(" ")[0] || "24h";
    ticks.innerHTML = `
      <span><i class="fa-regular fa-clock"></i> Kh\u1EDFi \u0111\u1EA7u: <strong>${startH}</strong></span>
      <span>${plan.fluidRows.length} giai \u0111o\u1EA1n b\xF9 d\u1ECBch li\xEAn t\u1EE5c</span>
      <span>K\u1EBFt th\xFAc: <strong>${endH}</strong></span>
    `;
  }
  renderFluidSchedule(plan) {
    const tbody = document.getElementById("cdss-fluid-tbody");
    const mobileStack = document.getElementById("cdss-fluid-cards-stack");
    if (!tbody || !mobileStack) return;
    const ageGroup = plan.ageGroup;
    const tpls = DENGUE_FLUID_TEMPLATES[plan.patient.severity][ageGroup];
    tbody.innerHTML = plan.fluidRows.map((r, idx) => {
      const tpl = tpls[idx];
      const durationOptions = tpl?.durationOptions || [r.durationHours];
      const optionsHtml = durationOptions.map((dur) => `
        <option value="${dur}" ${dur === r.durationHours ? "selected" : ""}>${dur} gi\u1EDD</option>
      `).join("");
      return `
        <tr>
          <!-- C\u1ED8T 1: M\u1ED0C GI\u1EDC & TH\u1EDCI L\u01AF\u1EE2NG -->
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

          <!-- C\u1ED8T 2: T\u1ED0C \u0110\u1ED8 & L\u01AF\u1EE2NG D\u1ECACH -->
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

          <!-- C\u1ED8T 3: D\u1ECACH C\xD3 S\u1EB4N / TREO TH\xCAM -->
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

          <!-- C\u1ED8T 4: T\u1ED4NG C\u1ECCC & GI\xC1M S\xC1T -->
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
    }).join("");
    mobileStack.innerHTML = plan.fluidRows.map((r, idx) => {
      const tpl = tpls[idx];
      const durationOptions = tpl?.durationOptions || [r.durationHours];
      const optionsHtml = durationOptions.map((dur) => `
        <option value="${dur}" ${dur === r.durationHours ? "selected" : ""}>${dur}h</option>
      `).join("");
      return `
        <div class="cdss-fluid-mobile-card">
          <div class="cdss-fcard-top">
            <div class="cdss-fcard-badge-wrap">
              <span class="cdss-step-badge">C\u1EEF ${r.stepIndex}</span>
              <span class="cdss-fcard-time">${r.timeWindow}</span>
            </div>
            <div class="cdss-duration-picker">
              <select class="cdss-duration-select" data-row-idx="${idx}">
                ${optionsHtml}
              </select>
            </div>
          </div>

          <div style="font-size:0.78rem; font-weight:600; color:var(--cdss-text-muted);">
            ${r.stageName}
          </div>

          <div class="cdss-fcard-metrics-grid">
            <div class="cdss-fcard-metric">
              <div class="cdss-fcard-metric-label">T\u1ED1c \u0110\u1ED9 B\xF9</div>
              <div class="cdss-fcard-metric-val" style="color:var(--cdss-primary);">
                ${r.rateMlKgH} <small>ml/kg/h</small>
              </div>
              <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:2px;">
                ~ <strong>${r.dropsPerMin}</strong> gi\u1ECDt/ph\xFAt
              </div>
            </div>

            <div class="cdss-fcard-metric">
              <div class="cdss-fcard-metric-label">L\u01B0\u1EE3ng D\u1ECBch C\u1EA7n</div>
              <div class="cdss-fcard-metric-val">
                ${r.totalMl.toLocaleString("vi-VN")} <small>ml</small>
              </div>
              <div style="font-size:0.75rem; color:var(--cdss-text-muted); margin-top:2px;">
                Treo th\xEAm: <strong>${r.bottlesToHang}</strong> chai 500ml
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; border-top:1px solid var(--cdss-border-subtle); padding-top:0.5rem;">
            <span>T\u1ED5ng c\xF3 tr\xEAn c\u1ECDc: <strong>${r.totalAtPoleMl} ml</strong></span>
            ${r.hctCheckRequired ? `
              <span class="cdss-hct-pill" style="margin:0;">
                <i class="fa-solid fa-vial"></i> \u0110o l\u1EA1i Hct
              </span>
            ` : ""}
          </div>

          <div class="cdss-monitor-tip" style="font-size:0.74rem;">
            ${r.monitoringNotes}
          </div>
        </div>
      `;
    }).join("");
    const attachSelects = (container) => {
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
    };
    attachSelects(tbody);
    attachSelects(mobileStack);
  }
  renderVasopressors(plan) {
    const grid = document.getElementById("cdss-vaso-grid");
    if (!grid) return;
    const { vasopressorDopamin: d, vasopressorNoradrenalin: n } = plan;
    grid.innerHTML = `
      <!-- Card Dopamin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div>
            <div class="cdss-drug-name cdss-drug-name--primary">Dopamin</div>
            <div class="cdss-drug-indication">L\u1EF1a ch\u1ECDn \u0111\u1EA7u tay \u1EDF tr\u1EBB em</div>
          </div>
          <span class="cdss-brand-badge" style="background:var(--cdss-primary-light); color:var(--cdss-primary); border-color:var(--cdss-primary);">
            B\u01A1m Ti\xEAm 50ml
          </span>
        </div>

        <div class="cdss-recipe-box">
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
            <span><strong>${d.totalMg} mg</strong> Dopamin (3 \xD7 ${d.patientWeightKg} kg)</span>
          </div>
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">Dung m\xF4i pha:</span>
            <span>Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
          </div>
          <div class="cdss-recipe-row cdss-recipe-highlight text-primary">
            <span>T\u01B0\u01A1ng \u0111\u01B0\u01A1ng li\u1EC1u:</span>
            <span>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 1 \xB5g/kg/ph\xFAt</span>
          </div>
        </div>

        <div class="cdss-dosing-strip">
          <div>
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Li\u1EC1u Khuy\u1EBFn C\xE1o</div>
            <strong>${d.standardDoseRange}</strong>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">T\u1ED1c \u0110\u1ED9 B\u01A1m Ti\xEAm</div>
            <strong style="color:var(--cdss-primary); font-size:1.05rem;">${d.recommendedPumpRateMlH}</strong>
          </div>
        </div>

        <p class="cdss-vaso-warning">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${d.precautions}</span>
        </p>
      </div>

      <!-- Card Noradrenalin -->
      <div class="cdss-vaso-card">
        <div class="cdss-vaso-card-header">
          <div>
            <div class="cdss-drug-name cdss-drug-name--danger">Noradrenalin</div>
            <div class="cdss-drug-indication">S\u1ED1c gi\xE3n m\u1EA1ch / T\u1EE5t HA t\xE2m tr\u01B0\u01A1ng / Ng\u01B0\u1EDDi l\u1EDBn</div>
          </div>
          <span class="cdss-brand-badge">High Alert</span>
        </div>

        <div class="cdss-recipe-box">
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">C\xF4ng th\u1EE9c pha:</span>
            <span><strong>${n.totalMg} mg</strong> Noradrenalin (0.3 \xD7 ${n.patientWeightKg} kg)</span>
          </div>
          <div class="cdss-recipe-row">
            <span class="cdss-recipe-key">Dung m\xF4i pha:</span>
            <span>Glucose 5% v\u1EEBa \u0111\u1EE7 <strong>50 ml</strong></span>
          </div>
          <div class="cdss-recipe-row cdss-recipe-highlight text-danger">
            <span>T\u01B0\u01A1ng \u0111\u01B0\u01A1ng li\u1EC1u:</span>
            <span>T\u1ED1c \u0111\u1ED9 1 ml/gi\u1EDD = 0.1 \xB5g/kg/ph\xFAt</span>
          </div>
        </div>

        <div class="cdss-dosing-strip">
          <div>
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">Li\u1EC1u Kh\u1EDFi \u0110\u1EA7u</div>
            <strong>${n.standardDoseRange}</strong>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.7rem; color:var(--cdss-text-muted); text-transform:uppercase;">T\u1ED1c \u0110\u1ED9 B\u01A1m Ti\xEAm</div>
            <strong style="color:var(--cdss-danger); font-size:1.05rem;">${n.recommendedPumpRateMlH}</strong>
          </div>
        </div>

        <p class="cdss-vaso-warning">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${n.precautions}</span>
        </p>
      </div>
    `;
  }
  renderNursingList(plan) {
    const list = document.getElementById("cdss-nursing-list");
    if (!list) return;
    list.innerHTML = plan.nursingInstructions.map((item) => `
      <li class="cdss-nursing-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${item}</span>
      </li>
    `).join("");
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
    const { patient, weightResult, fluidRows, totalVolumeMl, totalDurationHours, vasopressorDopamin: d, vasopressorNoradrenalin: n } = plan;
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
            <div style="font-weight:bold; text-transform:uppercase;">KHOA C\u1EA4P C\u1EE8U / TRUY\u1EC0N NHI\u1EC4M</div>
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
          <h1 class="cdss-print-main-title">PHI\u1EBEU Y L\u1EC6NH & THEO D\xD5I TRUY\u1EC0N D\u1ECACH SXHD DENGUE</h1>
          <div class="cdss-print-sub-title">(Theo H\u01B0\u1EDBng d\u1EABn Ch\u1EA9n \u0111o\xE1n & \u0110i\u1EC1u tr\u1ECB S\u1ED1t Xu\u1EA5t Huy\u1EBFt Dengue \u2014 Quy\u1EBFt \u0111\u1ECBnh 2760/Q\u0110-BYT 2023)</div>
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
            <span>Gi\u1EDD b\u1EAFt \u0111\u1EA7u truy\u1EC1n: <strong>${patient.startTime || "08:00"}</strong></span>
          </div>
        </div>

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
export {
  DengueCDSSController
};
