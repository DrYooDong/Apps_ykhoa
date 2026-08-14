/**
 * CHA2DS2-VASc Score
 * Đánh giá nguy cơ thuyên tắc huyết khối (Đột quỵ não) ở bệnh nhân Rung nhĩ không do bệnh van tim
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const cha2ds2VascCalculator: BaseCalculator = {
  id: 'cha2ds2-vasc',
  name: 'CHA₂DS₂-VASc — Đánh giá Nguy cơ Đột quỵ trong Rung Nhĩ',
  shortName: 'CHA₂DS₂-VASc',
  specialty: 'cardiology',
  specialtyLabel: 'Tim mạch',
  description: 'Thang điểm phân tầng nguy cơ tắc mạch hệ thống và hướng dẫn quyết định dùng thuốc chống đông đường uống (NOAC / VKA) ở bệnh nhân rung nhĩ theo ESC / AHA.',
  icon: 'fa-heart-pulse',
  evidenceReference: 'Lip GY, et al. Refining clinical risk stratification in atrial fibrillation: the CHA2DS2-VASc score. Chest. 2010.',
  fields: [
    {
      id: 'chf',
      label: 'C — Suy tim sung huyết / Rối loạn chức năng thất trái (LVEF ≤ 40%)',
      type: 'boolean',
      helpText: 'Dấu hiệu/triệu chứng suy tim hoặc siêu âm tim có EF giảm'
    },
    {
      id: 'hypertension',
      label: 'H — Tăng huyết áp (HA > 140/90 mmHg hoặc đang điều trị thuốc HA)',
      type: 'boolean'
    },
    {
      id: 'age',
      label: 'A₂ — Tuổi',
      type: 'select',
      options: [
        { value: 'under65', label: 'Dưới 65 tuổi (0 điểm)' },
        { value: '65to74', label: '65 - 74 tuổi (+1 điểm)' },
        { value: '75plus', label: 'Từ 75 tuổi trở lên (+2 điểm)' }
      ],
      defaultValue: 'under65',
      soapBinding: 'patient.age'
    },
    {
      id: 'diabetes',
      label: 'D — Đái tháo đường (Đang dùng insulin/thuốc hạ đường huyết hoặc FPG > 7 mmol/L)',
      type: 'boolean'
    },
    {
      id: 'stroke',
      label: 'S₂ — Tiền sử Đột quỵ / Cơn thiếu máu não thoáng qua (TIA) / Tắc mạch hệ thống',
      type: 'boolean',
      helpText: 'Tiêu chuẩn mang lại 2 điểm'
    },
    {
      id: 'vascular',
      label: 'V — Bệnh mạch máu (Tiền sử NMCT, bệnh động mạch ngoại biên, hoặc mảng xơ vữa ĐMC)',
      type: 'boolean'
    },
    {
      id: 'gender',
      label: 'Sc — Giới tính sinh học',
      type: 'select',
      options: [
        { value: 'male', label: 'Nam (0 điểm)' },
        { value: 'female', label: 'Nữ (+1 điểm)' }
      ],
      defaultValue: 'male',
      soapBinding: 'patient.gender'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const age = Number(patient.age) || 0;
    let ageVal = 'under65';
    if (age >= 75) ageVal = '75plus';
    else if (age >= 65) ageVal = '65to74';

    const genderVal = patient.gender === 'nu' ? 'female' : 'male';
    const textAll = `${patient.admissionDiagnosis || ''} ${patient.currentDiagnosis || ''} ${patient.sNotes || ''} ${patient.oNotes || ''}`.toLowerCase();

    return {
      age: ageVal,
      gender: genderVal,
      chf: textAll.includes('suy tim') || textAll.includes('chf') || textAll.includes('heart failure'),
      hypertension: textAll.includes('tăng huyết áp') || textAll.includes('tha') || textAll.includes('hypertension'),
      diabetes: textAll.includes('đái tháo đường') || textAll.includes('đtđ') || textAll.includes('diabetes') || textAll.includes('tiểu đường'),
      stroke: textAll.includes('tai biến') || textAll.includes('đột quỵ') || textAll.includes('tia') || textAll.includes('stroke'),
      vascular: textAll.includes('nhồi máu cơ tim') || textAll.includes('nmct') || textAll.includes('động mạch ngoại') || textAll.includes('pad')
    };
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    if (inputs.chf === true || inputs.chf === 'true') {
      score += 1;
      details.push('C: Suy tim (+1đ)');
    }
    if (inputs.hypertension === true || inputs.hypertension === 'true') {
      score += 1;
      details.push('H: Tăng huyết áp (+1đ)');
    }

    if (inputs.age === '75plus') {
      score += 2;
      details.push('A₂: Tuổi ≥ 75 (+2đ)');
    } else if (inputs.age === '65to74') {
      score += 1;
      details.push('A: Tuổi 65-74 (+1đ)');
    }

    if (inputs.diabetes === true || inputs.diabetes === 'true') {
      score += 1;
      details.push('D: Đái tháo đường (+1đ)');
    }
    if (inputs.stroke === true || inputs.stroke === 'true') {
      score += 2;
      details.push('S₂: Tiền sử Đột quỵ/TIA (+2đ)');
    }
    if (inputs.vascular === true || inputs.vascular === 'true') {
      score += 1;
      details.push('V: Bệnh mạch máu (+1đ)');
    }
    if (inputs.gender === 'female') {
      score += 1;
      details.push('Sc: Nữ giới (+1đ)');
    }

    const isFemale = inputs.gender === 'female';
    const effectiveRiskScore = isFemale ? score - 1 : score;

    let severity: CalculatorResult['severity'] = 'low';
    let recommendation = '';
    let strokeRiskPerYear = '';

    const riskTable: Record<number, string> = {
      0: '0.2%', 1: '0.6%', 2: '2.2%', 3: '3.2%', 4: '4.8%', 5: '7.2%', 6: '9.7%', 7: '11.2%', 8: '12.5%', 9: '15.2%'
    };
    strokeRiskPerYear = riskTable[Math.min(score, 9)] || '> 15%';

    if (effectiveRiskScore === 0) {
      severity = 'low';
      recommendation = 'Nguy cơ thấp (Nam 0đ / Nữ 1đ do giới tính): KHÔNG khuyến cáo dùng thuốc chống đông hoặc thuốc kháng kết tập tiểu cầu (ESC Class III).';
    } else if (effectiveRiskScore === 1) {
      severity = 'moderate';
      recommendation = 'Nguy cơ trung bình (Nam 1đ / Nữ 2đ): NÊN CÂN NHẮC dùng thuốc chống đông đường uống (NOAC/DOAC được ưu tiên hơn kháng vitamin K) sau khi đánh giá nguy cơ xuất huyết (HAS-BLED) và sở thích của BN (ESC Class IIa).';
    } else {
      severity = 'critical';
      recommendation = 'NGUY CƠ CAO (Nam ≥ 2đ / Nữ ≥ 3đ): CHỈ ĐỊNH BẮT BUỘC dùng thuốc chống đông đường uống dài hạn (NOAC như Apixaban, Rivaroxaban, Dabigatran, Edoxaban hoặc VKA nếu có van cơ học/hẹp hai lá vừa-nặng) (ESC Class I).';
    }

    const label = `CHA₂DS₂-VASc = ${score} điểm (Nguy cơ đột quỵ ~${strokeRiskPerYear}/năm)`;
    const textForInsert = `[CHA₂DS₂-VASc]: ${score} điểm (${details.length ? details.join(', ') : '0đ'}) ➔ Nguy cơ đột quỵ ~${strokeRiskPerYear}/năm. ${recommendation}`;

    return {
      score,
      maxScore: 9,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
