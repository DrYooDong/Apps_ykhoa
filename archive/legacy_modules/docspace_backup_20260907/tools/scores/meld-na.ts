/**
 * MELD-Na Score (Model for End-Stage Liver Disease with Sodium)
 * Tiên lượng tỷ lệ tử vong 90 ngày ở bệnh nhân Xơ gan & Xếp hàng ghép gan (OPTN / UNOS)
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const meldNaCalculator: BaseCalculator = {
  id: 'meld-na',
  name: 'MELD-Na — Tiên Lượng Xơ Gan & Bệnh Gan Giai Đoạn Cuối',
  shortName: 'MELD-Na',
  specialty: 'gastroenterology',
  specialtyLabel: 'Tiêu hóa - Gan mật',
  description: 'Tính điểm MELD kết hợp Natri máu (MELD-Na 2016) theo chuẩn UNOS để đánh giá độ nặng suy tế bào gan và tiên lượng sống còn 90 ngày.',
  icon: 'fa-shield-heart',
  evidenceReference: 'Kim WR, et al. Hyponatremia and mortality among patients on the list for liver transplantation. N Engl J Med. 2008;359(10):1018-1026.',
  fields: [
    {
      id: 'bilirubin',
      label: 'Bilirubin Toàn Phần (mg/dL)',
      type: 'number',
      step: 0.1,
      min: 1.0,
      max: 50.0,
      defaultValue: 1.2,
      helpText: 'Nhập theo mg/dL (Nếu là µmol/L: chia cho 17.1). Giá trị tối thiểu tính toán là 1.0 mg/dL.'
    },
    {
      id: 'inr',
      label: 'INR (Tỷ lệ Prothrombin)',
      type: 'number',
      step: 0.05,
      min: 1.0,
      max: 15.0,
      defaultValue: 1.1,
      helpText: 'Giá trị tối thiểu tính toán là 1.0.'
    },
    {
      id: 'creatinine',
      label: 'Creatinine Huyết Thanh (mg/dL)',
      type: 'number',
      step: 0.1,
      min: 1.0,
      max: 4.0,
      defaultValue: 1.0,
      helpText: 'Nhập theo mg/dL (Nếu là µmol/L: chia cho 88.4). Tối thiểu 1.0, tối đa 4.0 mg/dL.'
    },
    {
      id: 'sodium',
      label: 'Natri Máu - Na+ (mmol/L)',
      type: 'number',
      step: 1,
      min: 120,
      max: 145,
      defaultValue: 138,
      helpText: 'Khoảng giới hạn tính toán: 120 - 135 mmol/L (Nếu > 135 mmol/L thì gán bằng 135).'
    },
    {
      id: 'dialysis',
      label: 'Chạy thận nhân tạo / Lọc máu ≥ 2 lần trong 7 ngày qua',
      type: 'boolean',
      helpText: 'Nếu có lọc máu, Creatinine sẽ tự động được gán bằng giá trị trần 4.0 mg/dL.'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''}`.toLowerCase();
    const result: Record<string, any> = {};

    if (rawText.includes('lọc máu') || rawText.includes('thẩm tách') || rawText.includes('hd ')) {
      result.dialysis = true;
    }
    return result;
  },

  calculate(values: Record<string, any>): CalculatorResult {
    let bili = Number(values.bilirubin) || 1.0;
    let inr = Number(values.inr) || 1.0;
    let cr = Number(values.creatinine) || 1.0;
    let na = Number(values.sodium) || 135;
    const isDialysis = Boolean(values.dialysis);

    if (isDialysis) cr = 4.0;

    // Giới hạn giá trị chuẩn OPTN
    if (bili < 1.0) bili = 1.0;
    if (inr < 1.0) inr = 1.0;
    if (cr < 1.0) cr = 1.0;
    if (cr > 4.0) cr = 4.0;

    if (na < 120) na = 120;
    if (na > 135) na = 135;

    // Công thức MELD gốc
    const rawMeld = 9.57 * Math.log(cr) + 3.78 * Math.log(bili) + 11.2 * Math.log(inr) + 6.43;
    let meldScore = Math.round(rawMeld);
    if (meldScore < 6) meldScore = 6;
    if (meldScore > 40) meldScore = 40;

    // Công thức MELD-Na (UNOS 2016)
    let meldNa = meldScore;
    if (meldScore > 11) {
      meldNa = meldScore + 1.32 * (137 - na) - (0.033 * meldScore * (137 - na));
      meldNa = Math.round(meldNa);
    }
    if (meldNa < 6) meldNa = 6;
    if (meldNa > 40) meldNa = 40;

    let mortalityRate = '';
    let severity: CalculatorResult['severity'] = 'low';

    if (meldNa <= 9) {
      mortalityRate = '1.9%';
      severity = 'low';
    } else if (meldNa <= 19) {
      mortalityRate = '6.0%';
      severity = 'moderate';
    } else if (meldNa <= 29) {
      mortalityRate = '19.6%';
      severity = 'high';
    } else if (meldNa <= 39) {
      mortalityRate = '52.6%';
      severity = 'critical';
    } else {
      mortalityRate = '71.3% - 100%';
      severity = 'critical';
    }

    const recommendation = `Điểm MELD-Na = ${meldNa} (Tử vong 90 ngày: ~${mortalityRate}). ${
      meldNa >= 15 ? 'Bệnh nhân có chỉ định xếp hàng hội chẩn Ghép gan (MELD ≥ 15).' : 'Chức năng gan còn bù, điều trị nội khoa bảo tồn.'
    }`;

    const details: string[] = [
      `Bilirubin: ${bili} mg/dL`,
      `INR: ${inr}`,
      `Creatinine: ${cr} mg/dL ${isDialysis ? '(Đang lọc máu)' : ''}`,
      `Natri máu: ${na} mmol/L`,
      `MELD gốc: ${meldScore} đ ➔ MELD-Na: ${meldNa} đ`
    ];

    const label = `MELD-Na = ${meldNa} điểm (Tử vong 90 ngày ~${mortalityRate})`;
    const textForInsert = `[MELD-Na]: ${meldNa} đ (MELD gốc: ${meldScore} đ, Tử vong 90 ngày ~${mortalityRate}) ➔ ${recommendation}`;

    return {
      score: meldNa,
      maxScore: 40,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
