/**
 * Cirrhosis Scenarios — Ca lâm sàng mẫu cho Cirrhosis Studio
 * CliniPortal Studio Module
 */
(function (global) {
  'use strict';

  const CIRRHOSIS_SCENARIOS = [
    {
      id: 'compensated',
      title: '🟢 Ca 1: Xơ Gan Còn Bù (Child A)',
      badge: 'Còn bù',
      badgeClass: 'badge-success',
      desc: 'Bệnh nhân nam 54 tuổi, tiền sử Viêm gan B mạn, tái khám định kỳ. Không cổ trướng, không bệnh não gan.',
      data: {
        age: 54,
        gender: 'male',
        bili: 1.4,
        biliUnit: 'mg/dL',
        alb: 3.8,
        albUnit: 'g/dL',
        inr: 1.2,
        cr: 0.9,
        crUnit: 'mg/dL',
        sodium: 139,
        dialysis: 0,
        ast: 65,
        alt: 50,
        plt: 120,
        ascites: 1, // Không
        encephalopathy: 1, // Không
        chk_varbleed: false,
        chk_sbp: false,
        chk_hrs: false,
        chk_jaundice: false,
        chk_fever: false,
        chk_confusion: false,
        chk_hypotension: false
      }
    },
    {
      id: 'mild_decomp',
      title: '🟡 Ca 2: Xơ Gan Mất Bù Nhẹ (Child B)',
      badge: 'Mất bù nhẹ-vừa',
      badgeClass: 'badge-warning',
      desc: 'Bệnh nhân nữ 62 tuổi, xơ gan do rượu, nhập viện vì báng bụng (cổ trướng) mức độ vừa, đáp ứng tốt với Spironolactone.',
      data: {
        age: 62,
        gender: 'female',
        bili: 2.6,
        biliUnit: 'mg/dL',
        alb: 3.1,
        albUnit: 'g/dL',
        inr: 1.6,
        cr: 1.2,
        crUnit: 'mg/dL',
        sodium: 134,
        dialysis: 0,
        ast: 95,
        alt: 42,
        plt: 85,
        ascites: 2, // Nhẹ/Vừa
        encephalopathy: 1, // Không
        chk_varbleed: false,
        chk_sbp: false,
        chk_hrs: false,
        chk_jaundice: false,
        chk_fever: false,
        chk_confusion: false,
        chk_hypotension: false
      }
    },
    {
      id: 'severe_decomp',
      title: '🔴 Ca 3: Xơ Gan Nặng + XHTH Cấp + AKI (Child C)',
      badge: 'Mất bù nặng - Red Alert',
      badgeClass: 'badge-danger',
      desc: 'Bệnh nhân nam 58 tuổi, nhập viện cấp cứu vì nôn máu tươi do vỡ tĩnh mạch thực quản, báng bụng nhiều và lơ mơ (HE Grade II).',
      data: {
        age: 58,
        gender: 'male',
        bili: 4.8,
        biliUnit: 'mg/dL',
        alb: 2.3,
        albUnit: 'g/dL',
        inr: 2.4,
        cr: 2.2,
        crUnit: 'mg/dL',
        sodium: 129,
        dialysis: 0,
        ast: 140,
        alt: 75,
        plt: 52,
        ascites: 3, // Nhiều
        encephalopathy: 2, // Grade I-II
        chk_varbleed: true,
        chk_sbp: false,
        chk_hrs: true,
        chk_jaundice: true,
        chk_fever: false,
        chk_confusion: true,
        chk_hypotension: true
      }
    },
    {
      id: 'fibrosis_eval',
      title: '🔍 Ca 4: Viêm Gan B Mạn Nghi Xơ Hóa F3-F4',
      badge: 'Tầm soát Xơ hóa',
      badgeClass: 'badge-info',
      desc: 'Bệnh nhân nam 48 tuổi, HBV-DNA dương tính, men gan tăng dai dẳng, chưa có triệu chứng xơ gan rõ trên lâm sàng.',
      data: {
        age: 48,
        gender: 'male',
        bili: 1.2,
        biliUnit: 'mg/dL',
        alb: 4.1,
        albUnit: 'g/dL',
        inr: 1.1,
        cr: 0.8,
        crUnit: 'mg/dL',
        sodium: 140,
        dialysis: 0,
        ast: 110,
        alt: 95,
        plt: 98,
        ascites: 1,
        encephalopathy: 1,
        chk_varbleed: false,
        chk_sbp: false,
        chk_hrs: false,
        chk_jaundice: false,
        chk_fever: false,
        chk_confusion: false,
        chk_hypotension: false
      }
    },
    {
      id: 'dialysis_meld',
      title: '🏥 Ca 5: Xơ Gan Nặng Đang Chạy Thận Nhân Tạo',
      badge: 'Lọc máu - MELD High',
      badgeClass: 'badge-danger',
      desc: 'Bệnh nhân nữ 65 tuổi, xơ gan Child C, suy thận mạn giai đoạn cuối đang chạy thận nhân tạo định kỳ 3 lần/tuần.',
      data: {
        age: 65,
        gender: 'female',
        bili: 5.2,
        biliUnit: 'mg/dL',
        alb: 2.5,
        albUnit: 'g/dL',
        inr: 2.8,
        cr: 4.5,
        crUnit: 'mg/dL',
        sodium: 131,
        dialysis: 1, // Có lọc máu
        ast: 88,
        alt: 45,
        plt: 60,
        ascites: 3,
        encephalopathy: 2,
        chk_varbleed: false,
        chk_sbp: false,
        chk_hrs: true,
        chk_jaundice: true,
        chk_fever: false,
        chk_confusion: false,
        chk_hypotension: false
      }
    }
  ];

  global.CIRRHOSIS_SCENARIOS = CIRRHOSIS_SCENARIOS;
})(typeof window !== 'undefined' ? window : this);
