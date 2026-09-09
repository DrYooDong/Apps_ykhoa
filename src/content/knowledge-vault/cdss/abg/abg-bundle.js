"use strict";
var AbgCDSS = (() => {
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

  // src/content/knowledge-vault/cdss/abg/abg-ui.ts
  var abg_ui_exports = {};
  __export(abg_ui_exports, {
    ABG_PRESETS: () => ABG_PRESETS,
    AbgCDSSController: () => AbgCDSSController
  });

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
  return __toCommonJS(abg_ui_exports);
})();
