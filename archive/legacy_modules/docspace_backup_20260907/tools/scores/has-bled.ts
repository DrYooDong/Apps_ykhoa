/**
 * HAS-BLED Score
 * Đánh giá nguy cơ xuất huyết lớn ở bệnh nhân Rung nhĩ dùng thuốc chống đông
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const hasBledCalculator: BaseCalculator = {
  id: 'has-bled',
  name: 'HAS-BLED — Đánh giá Nguy cơ Xuất huyết do Chống đông',
  shortName: 'HAS-BLED',
  specialty: 'cardiology',
  specialtyLabel: 'Tim mạch',
  description: 'Nhận diện các yếu tố nguy cơ xuất huyết có thể điều chỉnh và không thể điều chỉnh ở bệnh nhân rung nhĩ chuẩn bị hoặc đang dùng thuốc chống đông.',
  icon: 'fa-droplet',
  evidenceReference: 'Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation. Chest. 2010.',
  fields: [
    {
      id: 'hypertension',
      label: 'H — Tăng huyết áp không kiểm soát (HA tâm thu > 160 mmHg)',
      type: 'boolean',
      helpText: 'Huyết áp tâm thu tại thời điểm khám hoặc thường xuyên > 160'
    },
    {
      id: 'renal',
      label: 'A (Renal) — Chức năng Thận bất thường (Lọc máu mạn, ghép thận, hoặc Creatinine ≥ 200 µmol/L / 2.26 mg/dL)',
      type: 'boolean'
    },
    {
      id: 'liver',
      label: 'A (Liver) — Chức năng Gan bất thường (Xơ gan, Bilirubin > 2x GHBT kèm AST/ALT > 3x GHBT)',
      type: 'boolean'
    },
    {
      id: 'stroke',
      label: 'S — Tiền sử Đột quỵ (Thiếu máu cục bộ hoặc xuất huyết não)',
      type: 'boolean'
    },
    {
      id: 'bleeding',
      label: 'B — Tiền sử hoặc cơ địa Xuất huyết (Xuất huyết tiêu hóa lớn, thiếu máu nặng, giảm TC)',
      type: 'boolean'
    },
    {
      id: 'labileInr',
      label: 'L — INR dao động / Không ổn định (TTR < 60% ở BN đang dùng kháng vitamin K Warfarin/Sintrom)',
      type: 'boolean'
    },
    {
      id: 'elderly',
      label: 'E — Người cao tuổi (Tuổi > 65)',
      type: 'boolean',
      soapBinding: 'patient.age'
    },
    {
      id: 'drugs',
      label: 'D (Drugs) — Đang dùng đồng thời thuốc Kháng ngưng tập tiểu cầu (Aspirin, Clopidogrel) hoặc NSAID',
      type: 'boolean'
    },
    {
      id: 'alcohol',
      label: 'D (Alcohol) — Lạm dụng rượu bia (≥ 8 đơn vị cồn/tuần)',
      type: 'boolean'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const age = Number(patient.age) || 0;
    const textAll = `${patient.admissionDiagnosis || ''} ${patient.currentDiagnosis || ''} ${patient.sNotes || ''} ${patient.oNotes || ''}`.toLowerCase();

    return {
      elderly: age > 65,
      stroke: textAll.includes('tai biến') || textAll.includes('đột quỵ') || textAll.includes('xuất huyết não'),
      bleeding: textAll.includes('xuất huyết tiêu hóa') || textAll.includes('xhtk') || textAll.includes('loét dạ dày'),
      renal: textAll.includes('suy thận mạn') || textAll.includes('lọc máu') || textAll.includes('chạy thận'),
      liver: textAll.includes('xơ gan') || textAll.includes('viêm gan mạn') || textAll.includes('suy gan'),
      drugs: textAll.includes('aspirin') || textAll.includes('clopidogrel') || textAll.includes('plavix') || textAll.includes('nsaid')
    };
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    if (inputs.hypertension === true || inputs.hypertension === 'true') {
      score++;
      details.push('H: HA không kiểm soát (>160 mmHg) [+1đ]');
    }
    if (inputs.renal === true || inputs.renal === 'true') {
      score++;
      details.push('A: Suy giảm chức năng Thận [+1đ]');
    }
    if (inputs.liver === true || inputs.liver === 'true') {
      score++;
      details.push('A: Suy giảm chức năng Gan [+1đ]');
    }
    if (inputs.stroke === true || inputs.stroke === 'true') {
      score++;
      details.push('S: Tiền sử Đột quỵ [+1đ]');
    }
    if (inputs.bleeding === true || inputs.bleeding === 'true') {
      score++;
      details.push('B: Tiền sử/Cơ địa Xuất huyết [+1đ]');
    }
    if (inputs.labileInr === true || inputs.labileInr === 'true') {
      score++;
      details.push('L: INR dao động / không ổn định [+1đ]');
    }
    if (inputs.elderly === true || inputs.elderly === 'true') {
      score++;
      details.push('E: Tuổi > 65 [+1đ]');
    }
    if (inputs.drugs === true || inputs.drugs === 'true') {
      score++;
      details.push('D: Dùng thuốc kháng TC / NSAID [+1đ]');
    }
    if (inputs.alcohol === true || inputs.alcohol === 'true') {
      score++;
      details.push('D: Lạm dụng rượu bia [+1đ]');
    }

    const isHighRisk = score >= 3;
    const severity: CalculatorResult['severity'] = isHighRisk ? 'critical' : score === 2 ? 'moderate' : 'low';

    const bleedRateTable: Record<number, string> = {
      0: '1.1%', 1: '1.0%', 2: '1.9%', 3: '3.7%', 4: '8.7%', 5: '12.5%'
    };
    const bleedRate = bleedRateTable[Math.min(score, 5)] || '> 12.5%';

    let recommendation = '';
    if (isHighRisk) {
      recommendation = 'NGUY CƠ XUẤT HUYẾT CAO (HAS-BLED ≥ 3 điểm): Không phải là chống chỉ định tuyệt đối dùng chống đông, mà là tín hiệu cần THẬN TRỌNG CAO ĐỘ và TỐI ƯU CÁC YẾU TỐ NGUY CƠ CÓ THỂ THAY ĐỔI ĐƯỢC (Kiểm soát huyết áp chặt chẽ, ngưng NSAID/Aspirin không cần thiết, hạn chế rượu, ưu tiên NOAC thay vì VKA, hẹn tái khám và theo dõi công thức máu/chức năng thận thường xuyên hơn).';
    } else if (score === 2) {
      recommendation = 'Nguy cơ xuất huyết trung bình: Cân nhắc kiểm soát các yếu tố nguy cơ và theo dõi định kỳ.';
    } else {
      recommendation = 'Nguy cơ xuất huyết thấp: Dùng chống đông tương đối an toàn khi có chỉ định theo thang điểm CHA₂DS₂-VASc.';
    }

    const label = `HAS-BLED = ${score}/9 điểm (Nguy cơ xuất huyết lớn ~${bleedRate}/năm)`;
    const textForInsert = `[HAS-BLED]: ${score}/9 điểm (${details.length ? details.join(', ') : '0đ'}) ➔ ${isHighRisk ? '⚠️ NGUY CƠ XUẤT HUYẾT CAO' : 'Nguy cơ xuất huyết thấp/vừa'}. ${recommendation}`;

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
