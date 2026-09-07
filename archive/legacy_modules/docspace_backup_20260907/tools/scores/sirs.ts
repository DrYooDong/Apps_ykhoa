/**
 * SIRS Criteria (Systemic Inflammatory Response Syndrome)
 * Hội chứng đáp ứng viêm toàn thân
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { parseVitals } from '../../features/risk-score-calculator';
import { SoapPatientRecord } from '../../types';

export const sirsCalculator: BaseCalculator = {
  id: 'sirs',
  name: 'SIRS — Hội chứng Đáp ứng Viêm Toàn thân',
  shortName: 'SIRS',
  specialty: 'emergency',
  specialtyLabel: 'Cấp cứu - Hồi sức',
  description: 'Xác định tình trạng đáp ứng viêm hệ thống khi thỏa mãn ≥ 2 tiêu chuẩn. Kết hợp với ổ nhiễm trùng nghi ngờ để chẩn đoán Sepsis truyền thống.',
  icon: 'fa-fire-flame-curved',
  evidenceReference: 'Bone RC, et al. Definitions for sepsis and organ failure and guidelines for the use of innovative therapies in sepsis. Chest. 1992.',
  fields: [
    {
      id: 'temp',
      label: 'Thân nhiệt',
      type: 'select',
      options: [
        { value: 'normal', label: 'Bình thường (36.0°C - 38.0°C)' },
        { value: 'abnormal', label: 'Sốt > 38.0°C hoặc Hạ thân nhiệt < 36.0°C', points: 1 }
      ],
      defaultValue: 'normal',
      soapBinding: 'parsed_vitals.temp'
    },
    {
      id: 'hr',
      label: 'Tần số tim (Mạch)',
      type: 'select',
      options: [
        { value: 'normal', label: 'Mạch ≤ 90 lần/phút' },
        { value: 'high', label: 'Nhịp nhanh > 90 lần/phút', points: 1 }
      ],
      defaultValue: 'normal',
      soapBinding: 'parsed_vitals.hr'
    },
    {
      id: 'rr',
      label: 'Tần số thở / PaCO2',
      type: 'select',
      options: [
        { value: 'normal', label: 'Nhịp thở ≤ 20 l/p và PaCO2 bình thường' },
        { value: 'high', label: 'Nhịp thở > 20 l/p HOẶC PaCO2 < 32 mmHg', points: 1 }
      ],
      defaultValue: 'normal',
      soapBinding: 'parsed_vitals.rr'
    },
    {
      id: 'wbc',
      label: 'Số lượng Bạch cầu (WBC) / Dạng non',
      type: 'select',
      options: [
        { value: 'normal', label: 'WBC 4.0 - 12.0 G/L' },
        { value: 'abnormal', label: 'WBC > 12.0 G/L HOẶC < 4.0 G/L HOẶC > 10% tế bào non (Band forms)', points: 1 }
      ],
      defaultValue: 'normal',
      soapBinding: 'parsed_vitals.wbc'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''}`;
    const vitals = parseVitals(rawText);

    let temp = 'normal';
    if (vitals.temp !== undefined && (vitals.temp > 38.0 || vitals.temp < 36.0)) {
      temp = 'abnormal';
    }

    let hr = 'normal';
    if (vitals.hr !== undefined && vitals.hr > 90) {
      hr = 'high';
    }

    let rr = 'normal';
    if (vitals.rr !== undefined && vitals.rr > 20) {
      rr = 'high';
    }

    let wbc = 'normal';
    if (vitals.wbc !== undefined && (vitals.wbc > 12 || vitals.wbc < 4)) {
      wbc = 'abnormal';
    }

    return { temp, hr, rr, wbc };
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    if (inputs.temp === 'abnormal') {
      score++;
      details.push('Thân nhiệt > 38°C hoặc < 36°C [+1đ]');
    }
    if (inputs.hr === 'high') {
      score++;
      details.push('Mạch > 90 lần/phút [+1đ]');
    }
    if (inputs.rr === 'high') {
      score++;
      details.push('Nhịp thở > 20 l/p hoặc PaCO2 < 32 mmHg [+1đ]');
    }
    if (inputs.wbc === 'abnormal') {
      score++;
      details.push('Bạch cầu > 12 G/L hoặc < 4 G/L hoặc > 10% dạng non [+1đ]');
    }

    const isPositive = score >= 2;
    const severity: CalculatorResult['severity'] = score >= 3 ? 'critical' : isPositive ? 'moderate' : 'low';

    let recommendation = '';
    if (isPositive) {
      recommendation = 'DƯƠNG TÍNH VỚI SIRS: Nếu có bằng chứng hoặc nghi ngờ ổ nhiễm khuẩn, bệnh nhân thỏa tiêu chuẩn Sepsis (theo đồng thuận cũ). Khẩn trương tìm tiêu điểm nhiễm trùng, bù dịch, cấy vi sinh và dùng kháng sinh sớm.';
    } else {
      recommendation = 'Âm tính với SIRS (< 2 tiêu chuẩn). Tiếp tục theo dõi lâm sàng.';
    }

    const label = `SIRS = ${score}/4 tiêu chuẩn — ${isPositive ? 'DƯƠNG TÍNH' : 'Âm tính'}`;
    const textForInsert = `[SIRS]: ${score}/4 tiêu chuẩn (${details.length ? details.join(', ') : 'Không có'}) ➔ ${isPositive ? 'Dương tính với Đáp ứng viêm hệ thống (SIRS)' : 'Âm tính'}`;

    return {
      score,
      maxScore: 4,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
