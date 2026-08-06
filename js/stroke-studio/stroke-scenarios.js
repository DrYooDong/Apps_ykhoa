/**
 * Neurology & Stroke Scenarios & Preset Dataset
 * CliniPortal - Neurology & Emergency Decision Support System
 */

window.StrokeScenarios = (function () {
  'use strict';

  var SCENARIOS = [
    {
      id: 'rtpa-candidate',
      title: 'Ca 1: Nhồi Máu Cấp Giờ Thứ 2.5 (Ứng Viên rtPA Vàng)',
      badge: 'Cấp Cứu Đột Quỵ',
      badgeClass: 'sc-danger',
      desc: 'Bệnh nhân nam 64 tuổi nhập viện giờ thứ 2.5 sau khi khởi phát đột ngột yếu nửa người phải & nói khó. HA 150/90 mmHg, NIHSS 12 điểm, CT không xuất huyết.',
      data: {
        strokeType: 'ischemic',
        onsetTimeHours: 2.5,
        bodyWeight: 70,
        sbp: 150,
        dbp: 90,
        platelets: 210000,
        inr: 1.1,
        glucose: 115,
        nihssScores: {
          i1a: 0, i1b: 1, i1c: 0, i2: 1, i3: 0, i4: 2,
          i5a: 3, i5b: 0, i6a: 3, i6b: 0, i7: 0, i8: 0,
          i9: 2, i10: 0, i11: 0
        },
        safetyChecklist: {
          hasIchHistory: false,
          hasRecentHeadTrauma: false,
          hasRecentMajorSurgery: false,
          hasGiBleed: false,
          hasLargeInfarct: false,
          isTakingNoac: false
        }
      }
    },
    {
      id: 'evt-candidate',
      title: 'Ca 2: Tắc Mạch Máu Lớn Giờ Thứ 8 (Ứng Viên EVT - DAWN)',
      badge: 'Can Thiệp Nội Mạch',
      badgeClass: 'sc-amber',
      desc: 'Bệnh nhân nữ 68 tuổi ngã quỵ lúc 8 giờ trước. NIHSS 18 điểm, quá cửa sổ rtPA tĩnh mạch 4.5h nhưng còn trong cửa sổ EVT 24h. CTA có tắc ĐM Não giữa M1.',
      data: {
        strokeType: 'ischemic',
        onsetTimeHours: 8.0,
        bodyWeight: 62,
        sbp: 165,
        dbp: 95,
        platelets: 180000,
        inr: 1.2,
        glucose: 125,
        nihssScores: {
          i1a: 1, i1b: 1, i1c: 1, i2: 2, i3: 1, i4: 2,
          i5a: 3, i5b: 0, i6a: 3, i6b: 0, i7: 0, i8: 1,
          i9: 2, i10: 1, i11: 0
        },
        safetyChecklist: {
          hasIchHistory: false,
          hasRecentHeadTrauma: false,
          hasRecentMajorSurgery: false,
          hasGiBleed: false,
          hasLargeInfarct: false,
          isTakingNoac: false
        }
      }
    },
    {
      id: 'high-bp-stroke',
      title: 'Ca 3: Nhồi Máu Cấp HA Cực Cao 195/110 (Cần Hạ HA Khẩn)',
      badge: 'Cạm Bẫy Cấp Cứu',
      badgeClass: 'sc-purple',
      desc: 'Bệnh nhân nam 59 tuổi khởi phát giờ 1.8h. NIHSS 14 điểm. Huyết áp cực cao 195/110 mmHg. Cần hạ HA bằng Labetalol/Nicardipine IV xuống < 185/110 mới được tiêm rtPA.',
      data: {
        strokeType: 'ischemic',
        onsetTimeHours: 1.8,
        bodyWeight: 75,
        sbp: 195,
        dbp: 110,
        platelets: 220000,
        inr: 1.0,
        glucose: 140,
        nihssScores: {
          i1a: 0, i1b: 1, i1c: 1, i2: 1, i3: 0, i4: 2,
          i5a: 3, i5b: 0, i6a: 3, i6b: 0, i7: 0, i8: 1,
          i9: 2, i10: 0, i11: 0
        },
        safetyChecklist: {
          hasIchHistory: false,
          hasRecentHeadTrauma: false,
          hasRecentMajorSurgery: false,
          hasGiBleed: false,
          hasLargeInfarct: false,
          isTakingNoac: false
        }
      }
    },
    {
      id: 'ich-hemorrhage',
      title: 'Ca 4: Xuất Huyết Bán Cầu Não Cấp (ICH Score 3)',
      badge: 'Xuất Huyết Nào',
      badgeClass: 'sc-danger',
      desc: 'Bệnh nhân nam 72 tuổi hôn mê đột ngột GCS 9 điểm. CT Sọ não có khối xuất huyết bao trong phải 45 mL tràn vào não thất IVH. Tiên lượng tử vong 30 ngày 72%.',
      data: {
        strokeType: 'hemorrhagic',
        onsetTimeHours: 3.0,
        bodyWeight: 68,
        sbp: 185,
        dbp: 105,
        gcsScore: 9,
        ichVolume: 45,
        hasIvh: true,
        isInfratentorial: false,
        age: 72,
        nihssScores: {
          i1a: 2, i1b: 2, i1c: 2, i2: 2, i3: 2, i4: 3,
          i5a: 4, i5b: 0, i6a: 4, i6b: 0, i7: 0, i8: 2,
          i9: 3, i10: 2, i11: 1
        }
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
