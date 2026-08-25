/**
 * Ascites Diagnostic Scenarios & Preset Dataset
 * CliniPortal - Gastroenterology & Emergency Decision Support System
 */

window.AscitesScenarios = (function () {
  'use strict';

  var SCENARIOS = [
    {
      id: 'cirrhosis-sbp',
      title: 'Ca 1: Xơ Gan Biến Chứng SBP (Cấp Cứu)',
      badge: 'Cấp Cứu Tiêu Hóa',
      badgeClass: 'sc-danger',
      desc: 'Bệnh nhân nam 58 tuổi tiền sử Xơ gan Child-Pugh C do rượu nhập viện vì sốt nhẹ và đau bụng âm ỉ 2 ngày. SAAG 2.1 g/dL, ANC 1350/μL, cấy vi khuẩn E. coli.',
      data: {
        serumAlbumin: 3.2,
        ascitesAlbumin: 1.1,
        albuminUnit: 'g/dL',
        ascitesProtein: 1.2,
        proteinUnit: 'g/dL',
        wbc: 1800,
        neutrophilPct: 75,
        glucose: 85,
        glucoseUnit: 'mg/dL',
        ldh: 140,
        serumLdhUln: 200,
        ada: 12,
        amylase: 35,
        bilirubinRatio: 0.4,
        cytology: 'negative',
        culture: 'monomicrobial',
        bodyWeight: 60,
        paracentesisVolume: 3
      }
    },
    {
      id: 'chf-ascites',
      title: 'Ca 2: Tràn Dịch Màng Bụng Do Suy Tim',
      badge: 'Nội Tim Mạch',
      badgeClass: 'sc-amber',
      desc: 'Bệnh nhân nữ 65 tuổi có tiền sử Suy tim sung huyết NYHA III. Khám báng bụng tự do lượng vừa, tĩnh mạch cổ nổi. SAAG 1.8 g/dL nhưng Protein dịch báng cao (3.2 g/dL).',
      data: {
        serumAlbumin: 3.6,
        ascitesAlbumin: 1.8,
        albuminUnit: 'g/dL',
        ascitesProtein: 3.2,
        proteinUnit: 'g/dL',
        wbc: 450,
        neutrophilPct: 20,
        glucose: 98,
        glucoseUnit: 'mg/dL',
        ldh: 180,
        serumLdhUln: 200,
        ada: 10,
        amylase: 40,
        bilirubinRatio: 0.3,
        cytology: 'negative',
        culture: 'negative',
        bodyWeight: 55,
        paracentesisVolume: 2
      }
    },
    {
      id: 'tb-peritonitis',
      title: 'Ca 3: Lao Màng Bụng Ở Bệnh Nhân Trẻ',
      badge: 'Nội Khoa Lao',
      badgeClass: 'sc-teal',
      desc: 'Bệnh nhân nam 32 tuổi ho khô, sốt nhẹ về chiều và bụng to dần trong 3 tuần. SAAG 0.7 g/dL (Thấp), Protein 4.8 g/dL, ADA 54 U/L.',
      data: {
        serumAlbumin: 3.5,
        ascitesAlbumin: 2.8,
        albuminUnit: 'g/dL',
        ascitesProtein: 4.8,
        proteinUnit: 'g/dL',
        wbc: 1200,
        neutrophilPct: 15,
        glucose: 72,
        glucoseUnit: 'mg/dL',
        ldh: 310,
        serumLdhUln: 200,
        ada: 54,
        amylase: 45,
        bilirubinRatio: 0.5,
        cytology: 'negative',
        culture: 'negative',
        bodyWeight: 58,
        paracentesisVolume: 3
      }
    },
    {
      id: 'carcinomatosis',
      title: 'Ca 4: Ung Thư Màng Bụng Di Căn',
      badge: 'Ung Bướu',
      badgeClass: 'sc-purple',
      desc: 'Bệnh nhân nữ 60 tuổi chẩn đoán Ung thư Buồng trứng di căn màng bụng. Báng bụng lượng nhiều tái phát nhanh. SAAG 0.6 g/dL, Cytology (+).',
      data: {
        serumAlbumin: 3.3,
        ascitesAlbumin: 2.7,
        albuminUnit: 'g/dL',
        ascitesProtein: 4.2,
        proteinUnit: 'g/dL',
        wbc: 850,
        neutrophilPct: 30,
        glucose: 80,
        glucoseUnit: 'mg/dL',
        ldh: 420,
        serumLdhUln: 200,
        ada: 14,
        amylase: 50,
        bilirubinRatio: 0.4,
        cytology: 'positive',
        culture: 'negative',
        bodyWeight: 52,
        paracentesisVolume: 6
      }
    },
    {
      id: 'secondary-peritonitis',
      title: 'Ca 5: Viêm Phúc Mạc Thứ Phát (Thủng Tạng Rỗng)',
      badge: 'Ngoại Tiêu Hóa',
      badgeClass: 'sc-danger',
      desc: 'Bệnh nhân nam 50 tuổi đau bụng dữ dội đột ngột, bụng cứng như gỗ. ANC 3200/μL, thỏa 3/3 tiêu chuẩn Runyon (Protein 2.2 g/dL, Glucose 28 mg/dL, LDH 480 U/L), cấy đa vi khuẩn.',
      data: {
        serumAlbumin: 3.1,
        ascitesAlbumin: 1.2,
        albuminUnit: 'g/dL',
        ascitesProtein: 2.2,
        proteinUnit: 'g/dL',
        wbc: 4200,
        neutrophilPct: 85,
        glucose: 28,
        glucoseUnit: 'mg/dL',
        ldh: 480,
        serumLdhUln: 200,
        ada: 16,
        amylase: 120,
        bilirubinRatio: 0.8,
        cytology: 'negative',
        culture: 'polymicrobial',
        bodyWeight: 65,
        paracentesisVolume: 2
      }
    }
  ];

  function getScenarios() {
    return SCENARIOS;
  }

  function getScenarioById(id) {
    for (var i = 0; i < SCENARIOS.length; i++) {
      if (SCENARIOS[i].id === id) return SCENARIOS[i];
    }
    return null;
  }

  return {
    getScenarios: getScenarios,
    getScenarioById: getScenarioById
  };
})();
