/**
 * Glasgow-Blatchford Bleeding Score (GBS)
 * Đánh giá nguy cơ xuất huyết tiêu hóa trên cần can thiệp cấp cứu (Truyền máu, Nội soi, Phẫu thuật)
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { parseVitals } from '../../features/risk-score-calculator';
import { SoapPatientRecord } from '../../types';

export const glasgowBlatchfordCalculator: BaseCalculator = {
  id: 'glasgow-blatchford',
  name: 'Glasgow-Blatchford — Xuất Huyết Tiêu Hóa Trên (GBS)',
  shortName: 'Glasgow-Blatchford',
  specialty: 'gastroenterology',
  specialtyLabel: 'Tiêu hóa - Cấp cứu',
  description: 'Sàng lọc phân tầng nguy cơ ở bệnh nhân xuất huyết tiêu hóa trên trước khi nội soi. Điểm 0-1 có thể điều trị ngoại trú an toàn.',
  icon: 'fa-droplet',
  evidenceReference: 'Blatchford O, Murray WR, Blatchford M. A risk score to predict need for treatment for uppergastrointestinal haemorrhage. Lancet. 2000;356(9238):1318-1321.',
  fields: [
    {
      id: 'bun',
      label: 'Urea Máu (BUN)',
      type: 'select',
      options: [
        { label: 'Urea < 6.5 mmol/L (BUN < 18.2 mg/dL) — 0 điểm', value: '0' },
        { label: 'Urea 6.5 - 7.9 mmol/L (BUN 18.2 - 22.3) — 2 điểm', value: '2' },
        { label: 'Urea 8.0 - 9.9 mmol/L (BUN 22.4 - 27.9) — 3 điểm', value: '3' },
        { label: 'Urea 10.0 - 24.9 mmol/L (BUN 28.0 - 69.9) — 4 điểm', value: '4' },
        { label: 'Urea ≥ 25.0 mmol/L (BUN ≥ 70 mg/dL) — 6 điểm', value: '6' }
      ],
      defaultValue: '0'
    },
    {
      id: 'hgb_gender',
      label: 'Hemoglobin & Giới tính',
      type: 'select',
      options: [
        { label: 'Nam Hb ≥ 13 g/dL HOẶC Nữ Hb ≥ 12 g/dL — 0 điểm', value: '0' },
        { label: 'Nam Hb 12.0 - 12.9 g/dL — 1 điểm', value: '1' },
        { label: 'Nam Hb 10.0 - 11.9 g/dL HOẶC Nữ Hb 10.0 - 11.9 g/dL — 3 điểm', value: '3' },
        { label: 'Nam HOẶC Nữ Hb < 10.0 g/dL — 6 điểm', value: '6' }
      ],
      defaultValue: '0'
    },
    {
      id: 'sbp',
      label: 'Huyết Áp Tâm Thu (SBP)',
      type: 'select',
      options: [
        { label: 'SBP ≥ 110 mmHg — 0 điểm', value: '0' },
        { label: 'SBP 100 - 109 mmHg — 1 điểm', value: '1' },
        { label: 'SBP 90 - 99 mmHg — 2 điểm', value: '2' },
        { label: 'SBP < 90 mmHg (Tụt HA) — 3 điểm', value: '3' }
      ],
      defaultValue: '0'
    },
    {
      id: 'hr',
      label: 'Nhịp Tim (Mạch) ≥ 100 lần/phút',
      type: 'boolean',
      helpText: 'Nhịp nhanh phản ánh tình trạng mất máu bù trừ (+1 điểm)'
    },
    {
      id: 'melena',
      label: 'Đi Cầu Phân Đen (Melena)',
      type: 'boolean',
      helpText: 'Dấu hiệu xuất huyết tiêu hóa trên (+1 điểm)'
    },
    {
      id: 'syncope',
      label: 'Ngất / Choáng váng khi thay đổi tư thế (Syncope)',
      type: 'boolean',
      helpText: 'Giảm tưới máu não do mất thể tích tuần hoàn (+2 điểm)'
    },
    {
      id: 'hepatic',
      label: 'Tiền sử Bệnh Gan Mạn / Xơ Gan',
      type: 'boolean',
      helpText: 'Nghi ngờ vỡ giãn tĩnh mạch thực quản / dạ dày (+2 điểm)'
    },
    {
      id: 'cardiac',
      label: 'Tiền sử Suy Tim / Bệnh Tim Thiếu Máu Cục Bộ',
      type: 'boolean',
      helpText: 'Bệnh lý tim mạch đồng mắc (+2 điểm)'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''} ${patient.aAssessment || ''}`.toLowerCase();
    const vitals = parseVitals(rawText);
    const result: Record<string, any> = {};

    if (vitals.hr && vitals.hr >= 100) result.hr = true;
    if (vitals.sbp) {
      if (vitals.sbp < 90) result.sbp = '3';
      else if (vitals.sbp <= 99) result.sbp = '2';
      else if (vitals.sbp <= 109) result.sbp = '1';
      else result.sbp = '0';
    }

    if (rawText.includes('phân đen') || rawText.includes('melena') || rawText.includes('ỉa phân đen')) {
      result.melena = true;
    }
    if (rawText.includes('ngất') || rawText.includes('choáng') || rawText.includes('syncope')) {
      result.syncope = true;
    }
    if (rawText.includes('xơ gan') || rawText.includes('viêm gan') || rawText.includes('cirrhosis')) {
      result.hepatic = true;
    }
    if (rawText.includes('suy tim') || rawText.includes('heart failure') || rawText.includes('bệnh vành')) {
      result.cardiac = true;
    }

    return result;
  },

  calculate(values: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    const bunPts = Number(values.bun) || 0;
    if (bunPts > 0) {
      score += bunPts;
      details.push(`Urea máu tăng (+${bunPts}đ)`);
    }

    const hgbPts = Number(values.hgb_gender) || 0;
    if (hgbPts > 0) {
      score += hgbPts;
      details.push(`Hemoglobin giảm (+${hgbPts}đ)`);
    }

    const sbpPts = Number(values.sbp) || 0;
    if (sbpPts > 0) {
      score += sbpPts;
      details.push(`Huyết áp tâm thu thấp (+${sbpPts}đ)`);
    }

    if (values.hr) {
      score += 1;
      details.push('Mạch ≥ 100 l/p (+1đ)');
    }
    if (values.melena) {
      score += 1;
      details.push('Đi cầu phân đen (+1đ)');
    }
    if (values.syncope) {
      score += 2;
      details.push('Có ngất/choáng (+2đ)');
    }
    if (values.hepatic) {
      score += 2;
      details.push('Bệnh gan mạn (+2đ)');
    }
    if (values.cardiac) {
      score += 2;
      details.push('Bệnh tim mạch (+2đ)');
    }

    let severity: CalculatorResult['severity'] = 'low';
    let recommendation = '';

    if (score <= 1) {
      severity = 'low';
      recommendation = `Điểm GBS = ${score}: Nguy cơ RẤT THẤP (< 1% cần can thiệp). Có thể cân nhắc điều trị ngoại trú và nội soi theo lịch hẹn an toàn.`;
    } else if (score <= 5) {
      severity = 'moderate';
      recommendation = `Điểm GBS = ${score}: Nguy cơ TRUNG BÌNH. Nhập viện nội trú theo dõi, bù dịch và nội soi dạ dày trong vòng 24 giờ.`;
    } else {
      severity = 'critical';
      recommendation = `Điểm GBS = ${score}: NGUY CƠ CAO (≥ 6 điểm). Bệnh nhân có nguy cơ cao cần truyền máu, can thiệp cầm máu hoặc phẫu thuật cấp cứu. Đặt 2 đường truyền lớn, hồi sức dịch/máu khẩn cấp và nội soi cấp cứu.`;
    }

    const label = `Glasgow-Blatchford = ${score}/23 điểm (${score <= 1 ? 'Nguy cơ thấp' : score <= 5 ? 'Nguy cơ vừa' : 'Nguy cơ cao'})`;
    const textForInsert = `[Glasgow-Blatchford]: ${score}/23 đ (${details.join(', ') || '0đ'}) ➔ ${recommendation}`;

    return {
      score,
      maxScore: 23,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
