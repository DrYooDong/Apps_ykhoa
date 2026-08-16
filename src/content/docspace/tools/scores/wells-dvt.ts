/**
 * Wells' Criteria for Deep Vein Thrombosis (DVT)
 * Đánh giá xác suất lâm sàng Huyết khối tĩnh mạch sâu chi dưới
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { SoapPatientRecord } from '../../types';

export const wellsDvtCalculator: BaseCalculator = {
  id: 'wells-dvt',
  name: "Wells' Criteria — Huyết Khối Tĩnh Mạch Sâu (DVT)",
  shortName: 'Wells DVT',
  specialty: 'cardiology',
  specialtyLabel: 'Tim mạch - Huyết học',
  description: 'Phân tầng xác suất lâm sàng DVT chi dưới để quyết định làm D-dimer hay Siêu âm Doppler mạch máu chi dưới.',
  icon: 'fa-shoe-prints',
  evidenceReference: 'Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235.',
  fields: [
    {
      id: 'active_cancer',
      label: 'Ung thư thể hoạt động (đang điều trị hoặc trong vòng 6 tháng qua)',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'paralysis_immobilization',
      label: 'Bại liệt, liệt nhẹ hoặc vừa bất động chân bằng bột/nẹp',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'bedridden_surgery',
      label: 'Nằm liệt giường > 3 ngày HOẶC đại phẫu thuật trong vòng 12 tuần',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'localized_tenderness',
      label: 'Đau chói dọc theo phân bố của hệ tĩnh mạch sâu chi dưới',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'entire_leg_swollen',
      label: 'Toàn bộ một bên chân bị sưng to',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'calf_swelling',
      label: 'Bắp chân sưng to > 3 cm so với chân không đau (đo dưới lồi củ chày 10cm)',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'pitting_edema',
      label: 'Phù ấn lõm chỉ ở bên chân bị đau',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'collateral_veins',
      label: 'Tĩnh mạch nông bàng hệ dãn nở (không phải dãn TM vô căn)',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'previous_dvt',
      label: 'Tiền sử đã từng bị DVT trước đây có bằng chứng',
      type: 'boolean',
      helpText: '+1 điểm'
    },
    {
      id: 'alternative_diagnosis',
      label: 'Có chẩn đoán khác khả dĩ ít nhất ngang bằng hoặc hơn DVT',
      type: 'boolean',
      helpText: 'TRỪ 2 ĐIỂM (-2 điểm)'
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''} ${patient.aAssessment || ''}`.toLowerCase();
    const result: Record<string, any> = {};

    if (rawText.includes('ung thư') || rawText.includes('cancer') || rawText.includes('k ')) result.active_cancer = true;
    if (rawText.includes('sưng chân') || rawText.includes('phù 1 chân') || rawText.includes('lệch')) result.calf_swelling = true;
    if (rawText.includes('phù ấn lõm') || rawText.includes('pitting edema')) result.pitting_edema = true;
    if (rawText.includes('dvt') || rawText.includes('huyết khối tĩnh mạch')) result.previous_dvt = true;

    return result;
  },

  calculate(values: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    if (values.active_cancer) {
      score += 1;
      details.push('Ung thư hoạt động (+1đ)');
    }
    if (values.paralysis_immobilization) {
      score += 1;
      details.push('Liệt/Bất động chân (+1đ)');
    }
    if (values.bedridden_surgery) {
      score += 1;
      details.push('Nằm bất động > 3 ngày / Phẫu thuật (+1đ)');
    }
    if (values.localized_tenderness) {
      score += 1;
      details.push('Đau chói dọc đường đi TM sâu (+1đ)');
    }
    if (values.entire_leg_swollen) {
      score += 1;
      details.push('Sưng toàn bộ một chân (+1đ)');
    }
    if (values.calf_swelling) {
      score += 1;
      details.push('Bắp chân sưng > 3cm (+1đ)');
    }
    if (values.pitting_edema) {
      score += 1;
      details.push('Phù ấn lõm 1 bên (+1đ)');
    }
    if (values.collateral_veins) {
      score += 1;
      details.push('Tuần hoàn bàng hệ nông (+1đ)');
    }
    if (values.previous_dvt) {
      score += 1;
      details.push('Tiền sử DVT (+1đ)');
    }
    if (values.alternative_diagnosis) {
      score -= 2;
      details.push('Có chẩn đoán khác khả dĩ (-2đ)');
    }

    let severity: CalculatorResult['severity'] = 'low';
    let recommendation = '';

    if (score < 2) {
      severity = 'low';
      recommendation = `Xác suất DVT THẤP / KHÔNG NGHĨ ĐẾN DVT (< 6%). Chỉ định xét nghiệm D-dimer. Nếu D-dimer âm tính (< 500 ng/mL FEU) ➔ Loại trừ DVT an toàn, không cần siêu âm Doppler.`;
    } else {
      severity = 'high';
      recommendation = `Xác suất DVT CAO / NGHĨ NHIỀU ĐẾN DVT (≥ 28-75%). CHỈ ĐỊNH SIÊU ÂM DOPPLER MẠCH MÁU CHI DƯỚI KHẨN. Cân nhắc dùng kháng đông Enoxaparin/DOAC sớm.`;
    }

    const label = `Wells DVT = ${score} điểm (${score < 2 ? 'Xác suất thấp' : 'Xác suất cao - Cần siêu âm'})`;
    const textForInsert = `[Wells DVT]: ${score} đ (${details.join(', ') || '0đ'}) ➔ ${recommendation}`;

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
