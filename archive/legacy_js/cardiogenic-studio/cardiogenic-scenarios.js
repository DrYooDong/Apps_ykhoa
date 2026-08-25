/**
 * Cardiogenic Shock & ACS Interventional Preset Scenarios
 * CliniPortal Design System
 */

(function (global) {
  'use strict';

  const CardiogenicScenarios = [
    {
      id: 'sc1_classic_cardiogenic',
      title: '🚨 Ca 1: Sốc Tim Điển Hình SCAI Stage C (STEMI Trước Rộng)',
      desc: 'Nam 65 tuổi, STEMI thành trước, SBP 82 mmHg, HR 115 bpm, Lactate 3.2 mmol/L, Vô niệu, đang dùng 1 vận mạch.',
      badgeClass: 'sc-danger',
      data: {
        age: 65,
        weight: 68,
        sbp: 82,
        hr: 115,
        lactate: 3.2,
        numVasopressors: 1,
        killip: 3,
        timeToPci: 2.0,
        isAnteriorStemi: true,
        hasColdExtremities: true,
        hasOliguria: true,
        isCardiacArrest: false,
        hasMechanicalSupport: false,
        hasVsrOrMr: false
      }
    },
    {
      id: 'sc2_refractory_ecmo',
      title: '🚨 Ca 2: Sốc Tim Trơ SCAI Stage D (Chỉ Định VA-ECMO / Impella)',
      desc: 'Nữ 58 tuổi, Viêm cơ tim cấp / STEMI thất bại, SBP 70 mmHg, Lactate 6.8 mmol/L, trơ với 2 vận mạch liều cao.',
      badgeClass: 'sc-danger',
      data: {
        age: 58,
        weight: 55,
        sbp: 70,
        hr: 130,
        lactate: 6.8,
        numVasopressors: 2,
        killip: 4,
        timeToPci: 5.0,
        isAnteriorStemi: true,
        hasColdExtremities: true,
        hasOliguria: true,
        isCardiacArrest: false,
        hasMechanicalSupport: false,
        hasVsrOrMr: false
      }
    },
    {
      id: 'sc3_mechanical_vsr_iabp',
      title: '🔴 Ca 3: Rách Vách Liên Thất VSR (Chỉ Định Bơm Bóng IABP Cấp Cứu)',
      desc: 'Nam 70 tuổi, STEMI ngày 3 xuất hiện Âm thổi tâm thu ở tim, SBP 85 mmHg, Echo có Rách vách liên thất VSR.',
      badgeClass: 'sc-amber',
      data: {
        age: 70,
        weight: 62,
        sbp: 85,
        hr: 105,
        lactate: 2.8,
        numVasopressors: 1,
        killip: 3,
        timeToPci: 12.0,
        isAnteriorStemi: true,
        hasColdExtremities: true,
        hasOliguria: false,
        isCardiacArrest: false,
        hasMechanicalSupport: false,
        hasVsrOrMr: true
      }
    },
    {
      id: 'sc4_beginning_stage_b',
      title: '🟡 Ca 4: Sốc Tim Khởi Phát SCAI Stage B (HA Tụt Nhẹ 88 mmHg)',
      desc: 'Nam 60 tuổi, NSTEMI, SBP 88 mmHg, HR 102 bpm, Lactate 1.6 mmol/L, tưới máu mô còn tốt.',
      badgeClass: 'sc-purple',
      data: {
        age: 60,
        weight: 72,
        sbp: 88,
        hr: 102,
        lactate: 1.6,
        numVasopressors: 0,
        killip: 2,
        timeToPci: 1.5,
        isAnteriorStemi: false,
        hasColdExtremities: false,
        hasOliguria: false,
        isCardiacArrest: false,
        hasMechanicalSupport: false,
        hasVsrOrMr: false
      }
    },
    {
      id: 'sc5_extremis_post_arrest',
      title: '🚨 Ca 5: Sốc Tim Sau Ngừng Tuần Hoàn SCAI Stage E',
      desc: 'Nam 52 tuổi, Ngừng tim ROSC sau 25 phút CPR, SBP 65 mmHg, Lactate 12.0 mmol/L, phụ thuộc 3 vận mạch.',
      badgeClass: 'sc-danger',
      data: {
        age: 52,
        weight: 75,
        sbp: 65,
        hr: 140,
        lactate: 12.0,
        numVasopressors: 3,
        killip: 4,
        timeToPci: 6.0,
        isAnteriorStemi: true,
        hasColdExtremities: true,
        hasOliguria: true,
        isCardiacArrest: true,
        hasMechanicalSupport: false,
        hasVsrOrMr: false
      }
    }
  ];

  global.CardiogenicScenarios = CardiogenicScenarios;
})(typeof window !== 'undefined' ? window : this);
