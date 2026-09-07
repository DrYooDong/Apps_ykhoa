/**
 * qSOFA Score (Quick Sepsis-related Organ Failure Assessment)
 * Tiêu chuẩn đánh giá nhanh suy cơ quan nghi do nhiễm khuẩn huyết tại giường bệnh
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { parseVitals } from '../../features/risk-score-calculator';
import { SoapPatientRecord } from '../../types';

export const qsofaCalculator: BaseCalculator = {
  id: 'qsofa',
  name: 'qSOFA — Sàng lọc Sepsis Cấp cứu',
  shortName: 'qSOFA',
  specialty: 'emergency',
  specialtyLabel: 'Cấp cứu - Hồi sức',
  description: 'Sàng lọc nhanh nguy cơ sốc nhiễm khuẩn và tử vong tại giường bệnh cho bệnh nhân nghi ngờ nhiễm trùng.',
  icon: 'fa-bacterium',
  evidenceReference: 'Singer M, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016.',
  fields: [
    {
      id: 'rr',
      label: 'Tần số thở (Nhịp thở)',
      type: 'number',
      unit: 'lần/phút',
      min: 0,
      max: 80,
      placeholder: 'VD: 24',
      soapBinding: 'parsed_vitals.rr',
      helpText: 'Điểm khi tần số thở ≥ 22 lần/phút'
    },
    {
      id: 'sbp',
      label: 'Huyết áp tâm thu (HA max)',
      type: 'number',
      unit: 'mmHg',
      min: 0,
      max: 300,
      placeholder: 'VD: 95',
      soapBinding: 'parsed_vitals.sbp',
      helpText: 'Điểm khi huyết áp tâm thu ≤ 100 mmHg'
    },
    {
      id: 'alteredMentation',
      label: 'Thay đổi tri giác (GCS < 15, lơ mơ, lú lẫn)',
      type: 'boolean',
      soapBinding: 'parsed_vitals.alteredMentation',
      helpText: 'Điểm khi Glasgow < 15 điểm hoặc có rối loạn ý thức cấp'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''}`;
    const vitals = parseVitals(rawText);
    return {
      rr: vitals.rr,
      sbp: vitals.sbp,
      alteredMentation: vitals.alteredMentation ?? (vitals.gcs ? vitals.gcs < 15 : undefined)
    };
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    const rr = Number(inputs.rr);
    if (!isNaN(rr) && rr >= 22) {
      score++;
      details.push(`Nhịp thở ≥ 22 lần/phút (${rr} l/p) [+1đ]`);
    }

    const sbp = Number(inputs.sbp);
    if (!isNaN(sbp) && sbp > 0 && sbp <= 100) {
      score++;
      details.push(`Huyết áp tâm thu ≤ 100 mmHg (${sbp} mmHg) [+1đ]`);
    }

    if (inputs.alteredMentation === true || inputs.alteredMentation === 'true') {
      score++;
      details.push('Tri giác thay đổi / GCS < 15 [+1đ]');
    }

    const isHighRisk = score >= 2;
    const severity = isHighRisk ? 'critical' : score === 1 ? 'moderate' : 'low';
    
    let recommendation = '';
    if (isHighRisk) {
      recommendation = 'NGUY CƠ CAO SỐC NHIỄM KHUẨN & TỬ VONG: Tiến hành ngay gói Sepsis 1-Hour Bundle (Lactate máu, cấy máu trước kháng sinh, kháng sinh phổ rộng IV, bù dịch 30ml/kg nếu tụt HA). Đánh giá SOFA đầy đủ tại ICU.';
    } else if (score === 1) {
      recommendation = 'Nguy cơ trung bình: Theo dõi sát sinh hiệu mỗi 1-2h, làm thêm xét nghiệm bilan nhiễm trùng (Công thức máu, CRP/Procalcitonin, Khí máu).';
    } else {
      recommendation = 'Nguy cơ thấp: Tiếp tục theo dõi và xử trí theo bệnh cảnh nguyên nhân.';
    }

    const label = `qSOFA = ${score}/3 điểm — ${isHighRisk ? 'NGUY CƠ CAO' : score === 1 ? 'Nguy cơ trung bình' : 'Nguy cơ thấp'}`;
    const textForInsert = `[qSOFA]: ${score}/3 đ (${details.length ? details.join(', ') : 'Không tiêu chí nào'}) ➔ ${isHighRisk ? '⚠️ NGUY CƠ CAO SEPSIS/SỐC NHIỄM KHUẨN' : 'Nguy cơ thấp'}`;

    return {
      score,
      maxScore: 3,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
