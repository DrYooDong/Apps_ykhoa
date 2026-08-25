/**
 * Emergency Metabolic & Dialysis Crisis Preset Scenarios
 * CliniPortal Design System
 */

(function (global) {
  'use strict';

  const MetabolicScenarios = [
    {
      id: 'sc1_dka_hyperkalemia',
      title: '🚨 Ca 1: Toan Ceton DKA Nặng + Tăng Kali Máu EKG T Nhọn',
      desc: 'Nam 32 tuổi, DKA nặng, pH 7.10, HCO3 8 mEq/L, K+ 6.8 mmol/L, EKG sóng T nhọn cao dọa độc tính tim.',
      badgeClass: 'sc-danger',
      data: {
        ph: 7.10,
        paco2: 24,
        hco3: 8,
        na: 136,
        cl: 98,
        albumin: 4.0,
        lactate: 2.1,
        weight: 65,
        k: 6.8,
        ekgPattern: 'peaked_t',
        hasCvc: true,
        hasSeizures: false,
        hasComa: false,
        hasIcpSign: false,
        hasAki: true,
        isKetoacidosis: true,
        aeiou_a: true,
        aeiou_e: true,
        aeiou_i: false,
        aeiou_o: false,
        aeiou_u: false,
        isHemodynamicallyUnstable: false
      }
    },
    {
      id: 'sc2_hyponatremia_seizure',
      title: '🚨 Ca 2: Hạ Natri Máu Cấp 112 mmol/L Co Giật & Hôn Mê',
      desc: 'Nữ 58 tuổi, Uống nước quá liều, Na 112 mmol/L, đang co giật toàn thể & hôn mê sâu.',
      badgeClass: 'sc-purple',
      data: {
        ph: 7.38,
        paco2: 38,
        hco3: 23,
        na: 112,
        cl: 80,
        albumin: 4.0,
        lactate: 1.2,
        weight: 55,
        k: 3.8,
        ekgPattern: 'normal',
        hasCvc: false,
        hasSeizures: true,
        hasComa: true,
        hasIcpSign: true,
        hasAki: false,
        isKetoacidosis: false,
        aeiou_a: false,
        aeiou_e: false,
        aeiou_i: false,
        aeiou_o: false,
        aeiou_u: false,
        isHemodynamicallyUnstable: false
      }
    },
    {
      id: 'sc3_septic_shock_crrt',
      title: '🚨 Ca 3: Sốc Nhiễm Khuẩn Toan Lactic Nặng pH 7.05 + AKI',
      desc: 'Nam 68 tuổi, Sốc nhiễm khuẩn phổi, pH 7.05, Lactate 11 mmol/L, AKI Vô niệu, Tụt HA phụ thuộc Norepinephrine.',
      badgeClass: 'sc-danger',
      data: {
        ph: 7.05,
        paco2: 28,
        hco3: 9,
        na: 138,
        cl: 102,
        albumin: 2.8,
        lactate: 11.0,
        weight: 70,
        k: 6.2,
        ekgPattern: 'pr_long',
        hasCvc: true,
        hasSeizures: false,
        hasComa: false,
        hasIcpSign: false,
        hasAki: true,
        isKetoacidosis: false,
        aeiou_a: true,
        aeiou_e: true,
        aeiou_i: false,
        aeiou_o: true,
        aeiou_u: false,
        isHemodynamicallyUnstable: true
      }
    },
    {
      id: 'sc4_methanol_dialysis',
      title: '🧪 Ca 4: Ngộ Độc Methanol + HAGMA Nặng (Chỉ Định Lọc Máu Khẩn)',
      desc: 'Nam 45 tuổi, Uống rượu trắng ngộ độc Methanol, Anion Gap 28, Nhìn mờ & Toan nặng pH 7.08.',
      badgeClass: 'sc-amber',
      data: {
        ph: 7.08,
        paco2: 20,
        hco3: 6,
        na: 140,
        cl: 100,
        albumin: 4.0,
        lactate: 2.5,
        weight: 60,
        k: 5.2,
        ekgPattern: 'normal',
        hasCvc: true,
        hasSeizures: false,
        hasComa: true,
        hasIcpSign: false,
        hasAki: true,
        isKetoacidosis: false,
        aeiou_a: true,
        aeiou_e: false,
        aeiou_i: true,
        aeiou_o: false,
        aeiou_u: false,
        isHemodynamicallyUnstable: false
      }
    },
    {
      id: 'sc5_rhabdo_sine_wave',
      title: '🚨 Ca 5: Tiêu Cơ Vân Cấp + Tăng Kali Sóng Hình Sin EKG 7.4 mmol/L',
      desc: 'Nam 28 tuổi, vùi lấp chấn thương cơ bắp, K+ 7.4 mmol/L, EKG chuyển dạng Sóng hình sin Sine-Wave cấp cứu.',
      badgeClass: 'sc-danger',
      data: {
        ph: 7.18,
        paco2: 30,
        hco3: 11,
        na: 135,
        cl: 96,
        albumin: 3.5,
        lactate: 4.2,
        weight: 75,
        k: 7.4,
        ekgPattern: 'sine_wave',
        hasCvc: true,
        hasSeizures: false,
        hasComa: false,
        hasIcpSign: false,
        hasAki: true,
        isKetoacidosis: false,
        aeiou_a: true,
        aeiou_e: true,
        aeiou_i: false,
        aeiou_o: false,
        aeiou_u: true,
        isHemodynamicallyUnstable: true
      }
    }
  ];

  global.MetabolicScenarios = MetabolicScenarios;
})(typeof window !== 'undefined' ? window : this);
