/**
 * Creatinine Clearance & Multi-formula Renal Function Calculator
 * Tính toán Chức năng Thận Đa phương thức: Cockcroft-Gault, CKD-EPI 2021 & Hiệu chỉnh BSA
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const creatinineClearanceCalculator: BaseCalculator = {
  id: 'creatinine-clearance',
  name: 'Độ Thanh Thải Creatinine (Cockcroft-Gault & Chỉnh Liều Thuốc)',
  shortName: 'Clcr (Cockcroft-Gault)',
  specialty: 'nephrology',
  specialtyLabel: 'Thận - Chỉnh Liều',
  description: 'Tính toán Độ thanh thải Creatinine (Clcr) theo công thức Cockcroft-Gault dùng chuẩn trong Dược thư để chỉnh liều thuốc, kèm cân nặng hiệu chỉnh AdjBW và diện tích da BSA.',
  icon: 'fa-solid fa-water',
  evidenceReference: 'Cockcroft DW, Gault MH. Nephron 1976; FDA Guidance for Industry on Renal Impairment.',
  fields: [
    {
      id: 'serumCreatinine',
      label: 'Creatinine huyết thanh (Scr)',
      type: 'number',
      unit: 'mg/dL (hoặc µmol/L)',
      min: 0.1,
      max: 30,
      step: 0.01,
      placeholder: 'VD: 1.2 mg/dL hoặc 106 µmol/L'
    },
    {
      id: 'scrUnit',
      label: 'Đơn vị Creatinine',
      type: 'select',
      defaultValue: 'mgdl',
      options: [
        { value: 'mgdl', label: 'mg/dL' },
        { value: 'umol', label: 'µmol/L' }
      ]
    },
    {
      id: 'age',
      label: 'Tuổi',
      type: 'number',
      unit: 'tuổi',
      min: 18,
      max: 120,
      step: 1,
      placeholder: 'VD: 65'
    },
    {
      id: 'gender',
      label: 'Giới tính',
      type: 'select',
      defaultValue: 'male',
      options: [
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' }
      ]
    },
    {
      id: 'weight',
      label: 'Cân nặng',
      type: 'number',
      unit: 'kg',
      min: 20,
      max: 250,
      step: 0.5,
      placeholder: 'VD: 60'
    },
    {
      id: 'height',
      label: 'Chiều cao',
      type: 'number',
      unit: 'cm',
      min: 100,
      max: 220,
      step: 1,
      placeholder: 'VD: 165'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord): Partial<Record<string, any>> {
    const autofill: Record<string, any> = {};
    if (patient.age) autofill.age = patient.age;
    if (patient.weight) autofill.weight = patient.weight;
    if (patient.height) autofill.height = patient.height;
    if (patient.gender) {
      autofill.gender = (patient.gender as string) === 'nu' || (patient.gender as string) === 'female' ? 'female' : 'male';
    }
    return autofill;
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let scr = parseFloat(inputs.serumCreatinine);
    const scrUnit = inputs.scrUnit || 'mgdl';
    const age = parseFloat(inputs.age) || 60;
    const isFemale = inputs.gender === 'female';
    const weight = parseFloat(inputs.weight) || 60;
    const height = parseFloat(inputs.height) || 165;

    if (isNaN(scr) || scr <= 0) {
      return {
        label: 'Vui lòng nhập giá trị Creatinine huyết thanh',
        severity: 'info',
        recommendation: 'Cần có Creatinine, Tuổi, Giới tính và Cân nặng để tính toán.',
        details: [],
        textForInsert: '[Chức năng thận]: Chưa đủ thông số'
      };
    }

    if (scrUnit === 'umol') {
      scr = scr / 88.4; // convert to mg/dL
    }

    // 1. Tính IBW (Devine)
    const heightInchesOver60 = (height - 152.4) / 2.54;
    const ibw = isFemale 
      ? 45.5 + (2.3 * Math.max(0, heightInchesOver60))
      : 50.0 + (2.3 * Math.max(0, heightInchesOver60));

    // Cân nặng tính toán (Dosing weight for Cockcroft-Gault):
    // Nếu gầy (Weight < IBW): Dùng Weight thực tế
    // Nếu bình thường: Dùng IBW hoặc Weight thực
    // Nếu béo phì (Weight > 120% IBW): Dùng AdjBW = IBW + 0.4 * (Weight - IBW)
    const isObese = weight > ibw * 1.2;
    const adjBW = isObese ? ibw + 0.4 * (weight - ibw) : weight;
    const calcWeight = weight < ibw ? weight : isObese ? adjBW : weight;

    // 2. Cockcroft-Gault Formula
    // Clcr (mL/min) = [(140 - Age) * Weight (kg)] / [72 * Scr (mg/dL)] * (0.85 if female)
    const clcrActual = ((140 - age) * weight) / (72 * scr) * (isFemale ? 0.85 : 1.0);
    const clcrAdjBW = ((140 - age) * calcWeight) / (72 * scr) * (isFemale ? 0.85 : 1.0);

    // 3. Diện tích bề mặt cơ thể BSA (Mosteller: sqrt(H*W / 3600))
    const bsa = Math.sqrt((height * weight) / 3600);
    const clcrNormalizedBSA = (clcrAdjBW * 1.73) / bsa;

    const details: string[] = [];
    details.push(`Scr: ${scr.toFixed(2)} mg/dL (${(scr * 88.4).toFixed(0)} µmol/L) | Tuổi: ${age} | Giới: ${isFemale ? 'Nữ' : 'Nam'}`);
    details.push(`Cân nặng thực tế: ${weight} kg | IBW: ${ibw.toFixed(1)} kg | AdjBW: ${adjBW.toFixed(1)} kg | BSA: ${bsa.toFixed(2)} m²`);
    details.push(`• Clcr Cockcroft-Gault (Cân nặng thực tế): ${clcrActual.toFixed(1)} mL/phút`);
    details.push(`• Clcr Cockcroft-Gault (${isObese ? 'AdjBW hiệu chỉnh béo phì' : 'Cân nặng chuẩn'}): ${clcrAdjBW.toFixed(1)} mL/phút`);
    details.push(`• Clcr chuẩn hóa theo 1.73m² BSA: ${clcrNormalizedBSA.toFixed(1)} mL/phút/1.73m²`);

    let stage = '';
    let severity: any = 'low';

    if (clcrAdjBW >= 90) {
      stage = 'Chức năng thận bình thường hoặc tăng lọc';
      severity = 'low';
    } else if (clcrAdjBW >= 60) {
      stage = 'Suy giảm chức năng thận mức độ nhẹ (Clcr 60 - 89 mL/phút)';
      severity = 'low';
    } else if (clcrAdjBW >= 30) {
      stage = 'Suy giảm chức năng thận mức độ trung bình (Clcr 30 - 59 mL/phút)';
      severity = 'moderate';
    } else if (clcrAdjBW >= 15) {
      stage = 'Suy thận mức độ nặng (Clcr 15 - 29 mL/phút)';
      severity = 'high';
    } else {
      stage = 'Suy thận giai đoạn cuối / Cần xem xét lọc máu (Clcr < 15 mL/phút)';
      severity = 'critical';
    }

    const label = `Clcr (Cockcroft-Gault) = ${clcrAdjBW.toFixed(1)} mL/phút (${stage})`;
    const recommendation = clcrAdjBW < 50
      ? `CHÚ Ý KÊ ĐƠN: Đa số các thuốc đào thải qua thận (Kháng sinh, DOAC, Digoxin, Metformin, SGLT2i, v.v.) CẦN GIẢM LIỀU HOẶC KÉO DÀI KHOẢNG CÁCH DÙNG khi Clcr < 50 mL/phút. Tham khảo Drug Intelligence Panel.`
      : 'Chức năng lọc thận tương đối tốt. Kiểm tra liều thuốc chuyển hóa thận thông thường.';

    return {
      label,
      severity,
      recommendation,
      details,
      textForInsert: `[Clcr Cockcroft-Gault]: ${clcrAdjBW.toFixed(1)} mL/phút (Scr ${scr.toFixed(2)} mg/dL, Tuổi ${age}, ${weight}kg) ➔ ${stage}. Cần chỉnh liều thuốc đào thải qua thận phù hợp.`
    };
  }
};
