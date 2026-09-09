"use strict";
var DengueCDSS = (() => {
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

  // dengue-ui.ts
  var dengue_ui_exports = {};
  __export(dengue_ui_exports, {
    DengueCDSSController: () => DengueCDSSController,
    generateDengueCDSSPlan: () => generateDengueCDSSPlan
  });

  // dengue-data.ts
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

  // dengue-engine.ts
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

  // dengue-ui.ts
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
  return __toCommonJS(dengue_ui_exports);
})();
