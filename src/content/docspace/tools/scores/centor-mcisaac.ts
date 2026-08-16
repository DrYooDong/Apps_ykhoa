/**
 * Centor (McIsaac) Score for Streptococcal Pharyngitis
 * Đánh giá xác suất Viêm họng do Liên cầu khuẩn tan huyết Beta nhóm A (GABHS) & Chỉ định Kháng sinh
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { parseVitals } from '../../features/risk-score-calculator';
import { SoapPatientRecord } from '../../types';

export const centorMcisaacCalculator: BaseCalculator = {
  id: 'centor-mcisaac',
  name: 'Centor (McIsaac) — Viêm Họng Do Liên Cầu Nhóm A',
  shortName: 'Centor / McIsaac',
  specialty: 'emergency',
  specialtyLabel: 'Cấp cứu - Nhi khoa - Truyền nhiễm',
  description: 'Thang điểm lâm sàng định hướng có nên dùng kháng sinh hay làm test nhanh (RADT) ở bệnh nhân đau họng cấp.',
  icon: 'fa-virus-covid',
  evidenceReference: 'McIsaac WJ, et al. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ. 1998;158(1):75-83.',
  fields: [
    {
      id: 'age',
      label: 'Độ Tuổi Bệnh Nhân',
      type: 'select',
      options: [
        { label: '3 - 14 tuổi (+1 điểm)', value: '1' },
        { label: '15 - 44 tuổi (0 điểm)', value: '0' },
        { label: '≥ 45 tuổi (-1 điểm)', value: '-1' }
      ],
      defaultValue: '0'
    },
    {
      id: 'tonsil_exudate',
      label: 'Amydal sưng to hoặc có mủ / chất tiết (Exudate)',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'tender_nodes',
      label: 'Hạch cổ trước sưng to và đau (Tender anterior cervical lymphadenopathy)',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'fever',
      label: 'Sốt > 38°C (hoặc tiền sử sốt cao)',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'no_cough',
      label: 'KHÔNG CÓ TRIỆU CHỨNG HO (Absence of cough)',
      type: 'boolean',
      helpText: '+1 điểm (Ho nhiều thường gợi ý nhiễm virus)'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''}`.toLowerCase();
    const vitals = parseVitals(rawText);
    const age = Number(patient.age) || 0;
    const result: Record<string, any> = {};

    if (age >= 3 && age <= 14) result.age = '1';
    else if (age >= 45) result.age = '-1';
    else result.age = '0';

    if (vitals.temp && vitals.temp >= 38.0) result.fever = true;
    if (rawText.includes('mủ') || rawText.includes('khuyết amydal') || rawText.includes('chất tiết')) result.tonsil_exudate = true;
    if (rawText.includes('hạch cổ') || rawText.includes('hạch góc hàm')) result.tender_nodes = true;
    if (!rawText.includes('ho ') && !rawText.includes('ho khan') && !rawText.includes('ho đờm')) result.no_cough = true;

    return result;
  },

  calculate(values: Record<string, any>): CalculatorResult {
    let score = Number(values.age) || 0;
    const details: string[] = [];

    if (values.age === '1') details.push('Tuổi 3-14 (+1đ)');
    if (values.age === '-1') details.push('Tuổi ≥ 45 (-1đ)');
    if (values.tonsil_exudate) {
      score += 1;
      details.push('Amydal có mủ/tiết dịch (+1đ)');
    }
    if (values.tender_nodes) {
      score += 1;
      details.push('Hạch cổ trước sưng đau (+1đ)');
    }
    if (values.fever) {
      score += 1;
      details.push('Sốt > 38°C (+1đ)');
    }
    if (values.no_cough) {
      score += 1;
      details.push('Không có triệu chứng ho (+1đ)');
    }

    let severity: CalculatorResult['severity'] = 'low';
    let recommendation = '';
    let probability = '';

    if (score <= 1) {
      probability = '1% - 10%';
      severity = 'low';
      recommendation = `Xác suất nhiễm liên cầu khuẩn rất thấp (~${probability}). KHÔNG CẦN DÙNG KHÁNG SINH, không cần làm test nhanh. Chỉ điều trị triệu chứng.`;
    } else if (score === 2 || score === 3) {
      probability = score === 2 ? '11% - 17%' : '28% - 35%';
      severity = 'moderate';
      recommendation = `Xác suất nhiễm liên cầu trung bình (~${probability}). Khuyến cáo làm test nhanh RADT hoặc cấy dịch họng. Chỉ dùng kháng sinh nếu test dương tính.`;
    } else {
      probability = '51% - 53%';
      severity = 'high';
      recommendation = `Xác suất nhiễm liên cầu cao (~${probability}). Chỉ định dùng kháng sinh kinh nghiệm (Amoxicillin 500mg PO TID x 10 ngày hoặc Penicillin V) để phòng ngừa biến chứng Thấp tim.`;
    }

    const label = `Centor / McIsaac = ${score} điểm (Xác suất GABHS: ~${probability})`;
    const textForInsert = `[Centor / McIsaac]: ${score} đ (${details.join(', ') || '0đ'}) ➔ ${recommendation}`;

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
