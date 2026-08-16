/**
 * Insulin Dosing & Sliding Scale Clinical Calculator
 * Phác đồ Khởi đầu & Hiệu chỉnh Insulin Nội trú (Basal-Bolus & Sliding Scale)
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const insulinSlidingScaleCalculator: BaseCalculator = {
  id: 'insulin-sliding-scale',
  name: 'Tính Liều Insulin Nội Trú (Basal-Bolus & Sliding Scale)',
  shortName: 'Phác đồ Insulin',
  specialty: 'emergency',
  specialtyLabel: 'Nội tiết & Chuyển hóa',
  description: 'Tính toán Tổng liều Insulin hàng ngày (TDD), phân bổ Basal-Bolus 50/50 và Phác đồ tiêm hiệu chỉnh theo thang trượt (Sliding Scale) cho bệnh nhân nội trú.',
  icon: 'fa-solid fa-syringe',
  evidenceReference: 'ADA Standards of Care in Hospital Diabetes 2024; Endocrine Society Clinical Practice Guideline.',
  fields: [
    {
      id: 'weight',
      label: 'Cân nặng',
      type: 'number',
      unit: 'kg',
      min: 20,
      max: 200,
      step: 0.5,
      placeholder: 'VD: 60 kg'
    },
    {
      id: 'patientType',
      label: 'Thể trạng & Mức độ nhạy cảm Insulin',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { value: 'sensitive', label: 'Nhạy cảm cao (0.3 - 0.4 UI/kg) — Người già, Suy thận eGFR < 45, Gầy yếu, Ăn kém' },
        { value: 'standard', label: 'Tiêu chuẩn (0.4 - 0.5 UI/kg) — Bệnh nhân đái tháo đường typ 2 ổn định' },
        { value: 'resistant', label: 'Kháng Insulin nặng (0.6 - 0.8+ UI/kg) — Béo phì BMI > 30, Nhiễm trùng nặng, Dùng Corticoid' }
      ]
    },
    {
      id: 'currentGlucose',
      label: 'Đường huyết mao mạch hiện tại (nếu cần xử trí cấp)',
      type: 'number',
      unit: 'mg/dL (hoặc mmol/L)',
      min: 20,
      max: 1000,
      step: 1,
      placeholder: 'VD: 240 mg/dL hoặc 13.3 mmol/L'
    },
    {
      id: 'glucoseUnit',
      label: 'Đơn vị đường huyết',
      type: 'select',
      defaultValue: 'mgdl',
      options: [
        { value: 'mgdl', label: 'mg/dL' },
        { value: 'mmol', label: 'mmol/L' }
      ]
    },
    {
      id: 'regimenType',
      label: 'Chế độ phác đồ áp dụng',
      type: 'select',
      defaultValue: 'basal_bolus',
      options: [
        { value: 'basal_bolus', label: 'Basal - Bolus chuẩn (50% Nền + 50% Ăn 3 bữa)' },
        { value: 'basal_plus', label: 'Basal Plus (Nền + 1 mũi hiệu chỉnh bữa ăn lớn nhất)' },
        { value: 'sliding_scale_only', label: 'Sliding Scale tạm thời (chỉ dùng ngắn hạn khi chưa chỉnh liều nền)' }
      ]
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord): Partial<Record<string, any>> {
    const autofill: Record<string, any> = {};
    if (patient.weight) autofill.weight = patient.weight;
    return autofill;
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    const weight = parseFloat(inputs.weight) || 60;
    const patientType = inputs.patientType || 'standard';
    const regimenType = inputs.regimenType || 'basal_bolus';
    let glucose = parseFloat(inputs.currentGlucose);
    const gUnit = inputs.glucoseUnit || 'mgdl';

    if (!isNaN(glucose) && gUnit === 'mmol') {
      glucose = glucose * 18; // convert to mg/dL
    }

    // 1. Tính Tổng liều Insulin hàng ngày (TDD - Total Daily Dose)
    let tddMultiplier = 0.4;
    let typeLabel = 'Tiêu chuẩn (0.4 UI/kg)';
    if (patientType === 'sensitive') {
      tddMultiplier = 0.3;
      typeLabel = 'Nhạy cảm / Suy thận / Người già (0.3 UI/kg)';
    } else if (patientType === 'resistant') {
      tddMultiplier = 0.6;
      typeLabel = 'Kháng Insulin / Béo phì / Dùng Corticoid (0.6 UI/kg)';
    }

    const tdd = Math.round(weight * tddMultiplier);
    const basalTotal = Math.round(tdd * 0.5);
    const prandialTotal = tdd - basalTotal;
    const bolusPerMeal = Math.round((prandialTotal / 3) * 10) / 10;

    const details: string[] = [];
    details.push(`Thể trạng: ${typeLabel} | Cân nặng: ${weight} kg`);
    details.push(`Tổng liều ngày TDD = ${tdd} UI/ngày (${tddMultiplier} UI/kg)`);
    details.push(`----------------------------------------`);
    details.push(`• Insulin Nền (Basal - Glargine/Detemir/Degludec/NPH): ${basalTotal} UI (tiêm 1 lần trước ngủ hoặc cố định giờ)`);
    details.push(`• Insulin Bữa ăn (Prandial - Lispro/Aspart/Regular): ${prandialTotal} UI/ngày ➔ ~${Math.round(bolusPerMeal)} UI trước mỗi bữa (Sáng - Trưa - Tối)`);

    // Sliding Scale Protocol
    details.push(`----------------------------------------`);
    details.push(`📋 Phác đồ tiêm hiệu chỉnh (Correction / Sliding Scale theo đường huyết trước ăn):`);
    details.push(`  < 70 mg/dL (< 3.9 mmol/L): Xử trí hạ đường huyết (Uống 15g đường, hoãn tiêm)`);
    details.push(`  70 - 140 mg/dL (3.9 - 7.8 mmol/L): Không cần thêm liều hiệu chỉnh (+0 UI)`);
    details.push(`  141 - 180 mg/dL (7.9 - 10.0 mmol/L): Thêm +1 UI (${patientType === 'resistant' ? '+2 UI' : '+1 UI'})`);
    details.push(`  181 - 220 mg/dL (10.1 - 12.2 mmol/L): Thêm +2 UI (${patientType === 'resistant' ? '+4 UI' : '+2 UI'})`);
    details.push(`  221 - 260 mg/dL (12.3 - 14.4 mmol/L): Thêm +3 UI (${patientType === 'resistant' ? '+6 UI' : '+3 UI'})`);
    details.push(`  261 - 300 mg/dL (14.5 - 16.6 mmol/L): Thêm +4 UI (${patientType === 'resistant' ? '+8 UI' : '+4 UI'})`);
    details.push(`  > 300 mg/dL (> 16.6 mmol/L): Thêm +5 UI (${patientType === 'resistant' ? '+10 UI' : '+5 UI'}), kiểm tra Ceton máu/niệu`);

    let currentCorrectionAdvice = '';
    if (!isNaN(glucose)) {
      let addUnits = 0;
      if (glucose > 300) addUnits = patientType === 'resistant' ? 10 : 5;
      else if (glucose >= 261) addUnits = patientType === 'resistant' ? 8 : 4;
      else if (glucose >= 221) addUnits = patientType === 'resistant' ? 6 : 3;
      else if (glucose >= 181) addUnits = patientType === 'resistant' ? 4 : 2;
      else if (glucose >= 141) addUnits = patientType === 'resistant' ? 2 : 1;

      currentCorrectionAdvice = `Đường huyết hiện tại ${glucose.toFixed(0)} mg/dL (${(glucose/18).toFixed(1)} mmol/L) ➔ Cần tiêm bổ sung +${addUnits} UI Insulin tác dụng nhanh.`;
      details.push(`⚠️ HIỆN TẠI: ${currentCorrectionAdvice}`);
    }

    const isHighGlucose = !isNaN(glucose) && glucose >= 250;
    const severity = isHighGlucose ? 'high' : 'low';
    const label = `TDD = ${tdd} UI/ngày (Nền: ${basalTotal} UI + Bữa ăn: ${Math.round(bolusPerMeal)} UI x 3 bữa)`;

    return {
      label,
      severity,
      recommendation: `Mục tiêu đường huyết nội trú: Trước ăn 100 - 140 mg/dL, sau ăn < 180 mg/dL. Tránh dùng Sliding Scale đơn độc kéo dài. Tăng/giảm liều nền 10-20% mỗi 24-48h dựa theo đường huyết đói buổi sáng.`,
      details,
      textForInsert: `[Phác đồ Insulin Basal-Bolus]: TDD ${tdd} UI (Nền Glargine ${basalTotal} UI tiêm 21h; Nhanh Aspart ${Math.round(bolusPerMeal)} UI x 3 bữa trước ăn 15p). Kèm thang trượt hiệu chỉnh.`
    };
  }
};
