/**
 * Cardiogenic Shock & ACS Interventional Pro Engine
 * Core EBM Logic for Emergency & Cardiac ICU
 * CliniPortal Design System
 */

(function (global) {
  'use strict';

  const CardiogenicEngine = {
    /**
     * Calculate SCAI Shock Stage (Stage A to E)
     */
    calculateScaiStage(data) {
      const sbp = parseFloat(data.sbp) || 120;
      const hr = parseFloat(data.hr) || 80;
      const lactate = parseFloat(data.lactate) || 1.0;
      const numVasopressors = parseInt(data.numVasopressors, 10) || 0;
      const isCardiacArrest = !!data.isCardiacArrest;
      const hasMechanicalSupport = !!data.hasMechanicalSupport;
      const hasHypoperfusion = lactate > 2.0 || !!data.hasColdExtremities || !!data.hasOliguria;

      let stage = 'Stage A (At Risk)';
      let badgeClass = 'badge-success';
      let description = 'Bệnh nhân có nguy cơ Sốc tim (Nhồi máu cơ thể diện rộng) nhưng sinh hiệu và tưới máu mô ổn định.';
      let mortality = '< 5%';

      if (isCardiacArrest || numVasopressors >= 3) {
        stage = 'Stage E (Extremis)';
        badgeClass = 'badge-danger';
        description = '🚨 THẤT BẠI HỒI SỨC / NGUY CƠ TỬ VONG CỰC CAO (Ngừng tuần hoàn / Sốc trơ với 3 vận mạch).';
        mortality = '> 65%';
      } else if (numVasopressors >= 2 || hasMechanicalSupport || (numVasopressors === 1 && hasHypoperfusion && sbp < 80)) {
        stage = 'Stage D (Deteriorating)';
        badgeClass = 'badge-danger';
        description = '🔴 SỐC TIM DIỄN TIẾN XẤU (Không đáp ứng với 1 vận mạch đơn thuần, cần phối hợp >= 2 vận mạch/tăng co bóp).';
        mortality = '40 - 60%';
      } else if ((sbp < 90 || hr > 100) && hasHypoperfusion && numVasopressors >= 1) {
        stage = 'Stage C (Classic)';
        badgeClass = 'badge-warning';
        description = '🟠 SỐC TIM ĐIỂN HÌNH (Tụt HA + Giảm tưới máu cơ quan, đáp ứng với 1 vận mạch/tăng co bóp).';
        mortality = '20 - 40%';
      } else if (sbp < 90 || hr > 100 || lactate > 2.0) {
        stage = 'Stage B (Beginning)';
        badgeClass = 'badge-info';
        description = '🟡 SỐC TIM KHỞI PHÁT (Tụt HA / Nhịp nhanh nhưng tưới máu cơ quan còn bù).';
        mortality = '10 - 20%';
      }

      return {
        stage, badgeClass, description, mortality
      };
    },

    /**
     * TIMI Risk Score for STEMI
     */
    calculateTimiStemi(data) {
      const age = parseFloat(data.age) || 60;
      const sbp = parseFloat(data.sbp) || 120;
      const hr = parseFloat(data.hr) || 80;
      const weight = parseFloat(data.weight) || 65;
      const killip = parseInt(data.killip, 10) || 1;
      const isAnteriorStemi = !!data.isAnteriorStemi;
      const timeToPci = parseFloat(data.timeToPci) || 2.0;

      let score = 0;
      if (age >= 75) score += 3;
      else if (age >= 65) score += 2;

      if (sbp < 100) score += 3;
      if (hr > 100) score += 2;
      if (killip >= 2) score += 2;
      if (weight < 67) score += 1;
      if (isAnteriorStemi) score += 1;
      if (timeToPci > 4.0) score += 1;

      // 30-day mortality mapping
      let mortality30d = '0.8%';
      if (score === 1) mortality30d = '1.6%';
      else if (score === 2) mortality30d = '2.2%';
      else if (score === 3) mortality30d = '4.4%';
      else if (score === 4) mortality30d = '7.3%';
      else if (score === 5) mortality30d = '12.4%';
      else if (score === 6) mortality30d = '16.1%';
      else if (score === 7) mortality30d = '23.4%';
      else if (score >= 8) mortality30d = '> 30.0%';

      return { score, mortality30d };
    },

    /**
     * Inotrope & Vasopressor Titration Pump Calculator
     */
    calculateInotropes(data) {
      const weight = parseFloat(data.weight) || 60;
      const sbp = parseFloat(data.sbp) || 90;

      // 1. Norepinephrine Titration (4 mg/50 mL)
      // Speed mL/h = (Dose mcg/kg/min * Weight kg * 60 min) / 80 mcg/mL
      const neDose = sbp < 90 ? 0.1 : 0.05; // mcg/kg/min
      const neSpeed = ((neDose * weight * 60) / 80).toFixed(1);

      // 2. Dobutamine Titration (250 mg/50 mL)
      // Speed mL/h = (Dose mcg/kg/min * Weight kg * 60 min) / 5000 mcg/mL
      const dobuDose = 5.0; // mcg/kg/min
      const dobuSpeed = ((dobuDose * weight * 60) / 5000).toFixed(1);

      // 3. Epinephrine Titration (1 mg/50 mL)
      // Speed mL/h = (Dose mcg/kg/min * Weight kg * 60 min) / 20 mcg/mL
      const epiDose = 0.05; // mcg/kg/min
      const epiSpeed = ((epiDose * weight * 60) / 20).toFixed(1);

      let recommendation = 'Dobutamine 5 mcg/kg/min là lựa chọn hàng đầu cho Sốc tim có SBP >= 90 mmHg.';
      if (sbp < 90) {
        recommendation = '🔴 SBP < 90 mmHg: Khởi đầu Norepinephrine (0.05-0.1 mcg/kg/min) Nâng SBP >= 90 mmHg trước khi phối hợp Dobutamine!';
      }

      return {
        neDose, neSpeed, dobuDose, dobuSpeed, epiDose, epiSpeed, recommendation
      };
    },

    /**
     * Mechanical Circulatory Support (MCS) Trigger Evaluation
     */
    evaluateMcsTriggers(data) {
      const scaiStage = data.scaiStage || 'Stage A';
      const hasVsrOrMr = !!data.hasVsrOrMr; // Mechanical complication
      const lactate = parseFloat(data.lactate) || 1.0;
      const numVasopressors = parseInt(data.numVasopressors, 10) || 0;

      let iabpIndicated = false;
      let impellaEcmosIndicated = false;
      let summary = 'Chưa có chỉ định đặt Hỗ trợ tuần hoàn cơ học (MCS).';

      if (hasVsrOrMr) {
        iabpIndicated = true;
        summary = '🔴 CHỈ ĐỊNH IABP CẤP CỨU (Bơm bóng đối xung ĐM chủ): Có biến chứng cơ học Nhồi máu cơ tim (Rách vách liên thất VSR / Hở van 2 lá cấp do đứt cơ nhú).';
      }

      if (scaiStage.includes('Stage D') || scaiStage.includes('Stage E') || (numVasopressors >= 2 && lactate > 4.0)) {
        impellaEcmosIndicated = true;
        summary = '🚨 CHỈ ĐỊNH VẬN HÀNH IMPELLA / VA-ECMO CẤP CỨU: Sốc tim trơ SCAI Stage D/E (Giảm tưới máu nặng kháng trị với 2 vận mạch).';
      }

      return { iabpIndicated, impellaEcmosIndicated, summary };
    }
  };

  global.CardiogenicEngine = CardiogenicEngine;
})(typeof window !== 'undefined' ? window : this);
