"use strict";
var EcgCDSS = (() => {
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

  // src/content/knowledge-vault/cdss/ecg/ecg-ui.ts
  var ecg_ui_exports = {};
  __export(ecg_ui_exports, {
    EcgCDSSController: () => EcgCDSSController
  });

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
  return __toCommonJS(ecg_ui_exports);
})();
