/**
 * CURB-65 Score (Confusion, Urea, Respiratory rate, Blood pressure, Age >= 65)
 * Đánh giá mức độ nặng và phân tầng nguy cơ tử vong ở bệnh nhân Viêm phổi mắc phải cộng đồng (CAP)
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { parseVitals } from '../../features/risk-score-calculator';
import { SoapPatientRecord } from '../../types';

export const curb65Calculator: BaseCalculator = {
  id: 'curb65',
  name: 'CURB-65 — Phân tầng Nguy cơ Viêm phổi Cộng đồng',
  shortName: 'CURB-65',
  specialty: 'respiratory',
  specialtyLabel: 'Hô hấp - Cấp cứu',
  description: 'Thang điểm tiên lượng tỷ lệ tử vong 30 ngày và định hướng nơi điều trị (Ngoại trú, Nội trú, hay ICU) cho viêm phổi cộng đồng.',
  icon: 'fa-lungs',
  evidenceReference: 'Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003.',
  fields: [
    {
      id: 'confusion',
      label: 'C — Confusion (Lú lẫn, tri giác suy giảm, điểm trí nhớ giảm)',
      type: 'boolean',
      soapBinding: 'parsed_vitals.alteredMentation',
      helpText: 'Rối loạn định hướng không gian/thời gian mới xuất hiện'
    },
    {
      id: 'urea',
      label: 'U — Urea máu > 7 mmol/L (hoặc BUN > 19 mg/dL)',
      type: 'boolean',
      soapBinding: 'parsed_vitals.urea_check',
      helpText: 'Tăng ure huyết thanh do giảm tưới máu hoặc suy thận cấp kèm theo'
    },
    {
      id: 'rr',
      label: 'R — Nhịp thở ≥ 30 lần/phút',
      type: 'boolean',
      soapBinding: 'parsed_vitals.rr_check',
      helpText: 'Thở nhanh phản ánh tình trạng suy hô hấp'
    },
    {
      id: 'bp',
      label: 'B — Huyết áp (HA tâm thu < 90 mmHg HOẶC HA tâm trương ≤ 60 mmHg)',
      type: 'boolean',
      soapBinding: 'parsed_vitals.bp_check',
      helpText: 'Tụt huyết áp gợi ý tình trạng sốc / đáp ứng viêm hệ thống nặng'
    },
    {
      id: 'age65',
      label: '65 — Tuổi ≥ 65',
      type: 'boolean',
      soapBinding: 'patient.age',
      helpText: 'Bệnh nhân từ 65 tuổi trở lên'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''}`;
    const vitals = parseVitals(rawText);
    const age = Number(patient.age) || 0;

    return {
      confusion: vitals.alteredMentation ?? false,
      urea: vitals.urea !== undefined ? vitals.urea > 7 : undefined,
      rr: vitals.rr !== undefined ? vitals.rr >= 30 : undefined,
      bp: (vitals.sbp !== undefined && vitals.sbp < 90) || (vitals.dbp !== undefined && vitals.dbp <= 60),
      age65: age >= 65
    };
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    if (inputs.confusion === true || inputs.confusion === 'true') {
      score++;
      details.push('C: Lú lẫn / Rối loạn ý thức [+1đ]');
    }
    if (inputs.urea === true || inputs.urea === 'true') {
      score++;
      details.push('U: Urea > 7 mmol/L [+1đ]');
    }
    if (inputs.rr === true || inputs.rr === 'true') {
      score++;
      details.push('R: Nhịp thở ≥ 30 l/p [+1đ]');
    }
    if (inputs.bp === true || inputs.bp === 'true') {
      score++;
      details.push('B: Huyết áp thấp (HA max < 90 hoặc min ≤ 60) [+1đ]');
    }
    if (inputs.age65 === true || inputs.age65 === 'true') {
      score++;
      details.push('65: Tuổi ≥ 65 [+1đ]');
    }

    let severity: CalculatorResult['severity'] = 'low';
    let placeOfCare = '';
    let mortality = '';

    if (score === 0 || score === 1) {
      severity = 'low';
      placeOfCare = 'Cân nhắc điều trị NGOẠI TRÚ an toàn (Tỷ lệ tử vong thấp ~1.5%).';
      mortality = '< 3%';
    } else if (score === 2) {
      severity = 'moderate';
      placeOfCare = 'Khuyến cáo NHẬP VIỆN điều trị nội trú ngắn hạn hoặc theo dõi sát tại khoa Cấp cứu / Lưu bệnh (Tử vong ~9.2%).';
      mortality = '9.2%';
    } else {
      severity = 'critical';
      placeOfCare = 'VIÊM PHỔI NẶNG (Tử vong 22 - 30%): Nhập viện điều trị nội trú khẩn cấp, cân nhắc chuyển ICU/Hồi sức nếu có sốc hoặc cần hỗ trợ hô hấp.';
      mortality = score === 3 ? '14.5%' : score === 4 ? '40%' : '50%';
    }

    const label = `CURB-65 = ${score}/5 điểm (Tử vong ước tính ~${mortality})`;
    const recommendation = `${placeOfCare} Kết hợp đánh giá SpO2, X-quang phổi diện rộng và các bệnh lý nền đi kèm.`;
    const textForInsert = `[CURB-65]: ${score}/5 đ (${details.length ? details.join(', ') : '0 điểm'}) ➔ ${placeOfCare}`;

    return {
      score,
      maxScore: 5,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
