/**
 * Pleural Effusion Scenarios & Quiz Dataset
 * CliniPortal - Respiratory & Emergency Decision Support System
 */

window.PleuralScenarios = (function () {
  'use strict';

  var SCENARIOS = [
    {
      id: 'chf-pseudo-exudate',
      title: 'Ca 1: Suy Tim Dùng Lợi Tiểu (Pseudo-Exudate)',
      badge: 'Cạm Bẫy Lâm Sàng',
      badgeClass: 'sc-amber',
      desc: 'Bệnh nhân 68 tuổi có tiền sử Suy tim sung huyết (EF 35%) đang dùng Furosemide liều cao. X-quang có tràn dịch màng phổi phải. Tiêu chuẩn Light tính ra Dịch tiết nhưng SEAG giúp cứu giải.',
      data: {
        pfProtein: 3.4,
        serumProtein: 6.2,
        proteinUnit: 'g/dL',
        pfLdh: 145,
        serumLdh: 210,
        serumLdhUln: 200,
        pfAlbumin: 2.1,
        serumAlbumin: 3.8,
        albuminUnit: 'g/dL',
        isDiureticOrChf: true,
        pfAda: 12,
        pfGlucose: 95,
        glucoseUnit: 'mg/dL',
        pfPh: 7.42,
        pfTriglycerides: 45,
        triglycerideUnit: 'mg/dL',
        pfCholesterol: 65,
        cholesterolUnit: 'mg/dL',
        pfAmylase: 35,
        serumAmylase: 40,
        neutrophilPct: 25,
        lymphocytePct: 65,
        eosinophilPct: 2,
        rbc: 5000,
        grossAppearance: 'serous',
        cytology: 'negative',
        gramAfb: 'negative'
      }
    },
    {
      id: 'complicated-parapneumonic',
      title: 'Ca 2: Viêm Phổi Tràn Dịch Phức Tạp (Chỉ Định Dẫn Lưu)',
      badge: 'Cấp Cứu Hô Hấp',
      badgeClass: 'sc-danger',
      desc: 'Bệnh nhân nam 54 tuổi sốt cao, ho đờm mủ, đau ngực màng phổi. Sốt ngày 5, X-quang phổi có thâm nhiễm thùy dưới phải kèm tràn dịch. pH dịch MP 7.05, Glucose 32 mg/dL.',
      data: {
        pfProtein: 4.6,
        serumProtein: 6.8,
        proteinUnit: 'g/dL',
        pfLdh: 1480,
        serumLdh: 260,
        serumLdhUln: 200,
        pfAlbumin: 2.8,
        serumAlbumin: 3.6,
        albuminUnit: 'g/dL',
        isDiureticOrChf: false,
        pfAda: 28,
        pfGlucose: 32,
        glucoseUnit: 'mg/dL',
        pfPh: 7.05,
        pfTriglycerides: 38,
        triglycerideUnit: 'mg/dL',
        pfCholesterol: 72,
        cholesterolUnit: 'mg/dL',
        pfAmylase: 60,
        serumAmylase: 50,
        neutrophilPct: 88,
        lymphocytePct: 8,
        eosinophilPct: 1,
        rbc: 12000,
        grossAppearance: 'turbid',
        cytology: 'negative',
        gramAfb: 'gram_positive'
      }
    },
    {
      id: 'tb-pleurisy',
      title: 'Ca 3: Lao Màng Phổi Ở Bệnh Nhân Trẻ',
      badge: 'Nội Khoa Lao',
      badgeClass: 'sc-teal',
      desc: 'Bệnh nhân nam 26 tuổi, ho khô, sốt nhẹ về chiều và sút cân 3kg trong 1 tháng. Dịch màng phổi màu vàng chanh, ADA 72 U/L, Lymphocyte chiếm 86%.',
      data: {
        pfProtein: 5.4,
        serumProtein: 7.1,
        proteinUnit: 'g/dL',
        pfLdh: 480,
        serumLdh: 210,
        serumLdhUln: 200,
        pfAlbumin: 3.1,
        serumAlbumin: 4.0,
        albuminUnit: 'g/dL',
        isDiureticOrChf: false,
        pfAda: 72,
        pfGlucose: 78,
        glucoseUnit: 'mg/dL',
        pfPh: 7.36,
        pfTriglycerides: 42,
        triglycerideUnit: 'mg/dL',
        pfCholesterol: 85,
        cholesterolUnit: 'mg/dL',
        pfAmylase: 42,
        serumAmylase: 45,
        neutrophilPct: 10,
        lymphocytePct: 86,
        eosinophilPct: 2,
        rbc: 8000,
        grossAppearance: 'serous',
        cytology: 'negative',
        gramAfb: 'negative'
      }
    },
    {
      id: 'malignant-effusion',
      title: 'Ca 4: Tràn Dịch Màng Phổi Ung Thư Di Căn',
      badge: 'Ung Bướu',
      badgeClass: 'sc-purple',
      desc: 'Bệnh nhân nữ 62 tuổi có tiền sử Ung thư Phế quản dạng tuyến (Adenocarcinoma). Tràn dịch màng phổi lượng nhiều tái phát nhanh. Dịch màu đỏ máu, Cytology (+).',
      data: {
        pfProtein: 4.8,
        serumProtein: 6.6,
        proteinUnit: 'g/dL',
        pfLdh: 620,
        serumLdh: 230,
        serumLdhUln: 200,
        pfAlbumin: 2.6,
        serumAlbumin: 3.5,
        albuminUnit: 'g/dL',
        isDiureticOrChf: false,
        pfAda: 18,
        pfGlucose: 68,
        glucoseUnit: 'mg/dL',
        pfPh: 7.32,
        pfTriglycerides: 50,
        triglycerideUnit: 'mg/dL',
        pfCholesterol: 92,
        cholesterolUnit: 'mg/dL',
        pfAmylase: 48,
        serumAmylase: 52,
        neutrophilPct: 20,
        lymphocytePct: 70,
        eosinophilPct: 5,
        rbc: 185000,
        grossAppearance: 'hemorrhagic',
        cytology: 'positive',
        gramAfb: 'negative'
      }
    },
    {
      id: 'chylothorax',
      title: 'Ca 5: Tràn Dịch Dưỡng Chấp (Chylothorax)',
      badge: 'Bệnh Lý Hiếm',
      badgeClass: 'sc-amber',
      desc: 'Bệnh nhân nam 45 tuổi sau phẫu thuật cắt u trung thất 2 tuần xuất hiện khó thở. Chọc dò dịch màng phổi đục như sữa, Triglyceride 340 mg/dL.',
      data: {
        pfProtein: 3.9,
        serumProtein: 6.4,
        proteinUnit: 'g/dL',
        pfLdh: 210,
        serumLdh: 190,
        serumLdhUln: 200,
        pfAlbumin: 2.4,
        serumAlbumin: 3.6,
        albuminUnit: 'g/dL',
        isDiureticOrChf: false,
        pfAda: 14,
        pfGlucose: 90,
        glucoseUnit: 'mg/dL',
        pfPh: 7.45,
        pfTriglycerides: 340,
        triglycerideUnit: 'mg/dL',
        pfCholesterol: 98,
        cholesterolUnit: 'mg/dL',
        pfAmylase: 30,
        serumAmylase: 35,
        neutrophilPct: 15,
        lymphocytePct: 78,
        eosinophilPct: 2,
        rbc: 3000,
        grossAppearance: 'milky',
        cytology: 'negative',
        gramAfb: 'negative'
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
