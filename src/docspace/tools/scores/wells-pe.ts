/**
 * Thang điểm Wells dự đoán Thuyên Tắc Phổi (PE - Pulmonary Embolism)
 * Ref: Wells PS, et al. Thromb Haemost 2000; 83:416-420.
 */

import { BaseCalculator, CalculatorResult } from '../types';

export const wellsPeCalculator: BaseCalculator = {
  id: 'wells-pe',
  name: 'Thang Điểm Wells Đánh Giá Nguy Cơ Thuyên Tắc Phổi (PE)',
  shortName: 'Wells PE',
  specialty: 'emergency',
  specialtyLabel: 'Cấp cứu - Hồi sức',
  description: 'Phân tầng xác suất lâm sàng thuyên tắc phổi (PE) trước xét nghiệm để định hướng chỉ định D-dimer hoặc CTPA ngực có cản quang.',
  icon: 'fa-solid fa-lungs-virus',
  evidenceReference: 'Wells PS, et al. Thromb Haemost 2000 / ESC 2024 PE Guidelines',
  fields: [
    {
      id: 'dvtSymptoms',
      label: 'Triệu chứng lâm sàng của DVT (Sưng, đau bắp chân khi sờ nắn)',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+3.0 điểm)' }, { value: false, label: 'Không (0 điểm)' }],
      helpText: 'Dấu hiệu Homans (+), sưng 1 bên chân chênh lệch > 3cm'
    },
    {
      id: 'peMostLikely',
      label: 'Thuyên tắc phổi (PE) là chẩn đoán khả dĩ nhất hoặc ngang bằng chẩn đoán khác',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+3.0 điểm)' }, { value: false, label: 'Không (0 điểm)' }],
      helpText: 'Không có chẩn đoán thay thế nào giải thích rõ hơn'
    },
    {
      id: 'tachycardia',
      label: 'Nhịp tim nhanh > 100 lần/phút',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+1.5 điểm)' }, { value: false, label: 'Không (0 điểm)' }],
      soapBinding: 'pulse > 100'
    },
    {
      id: 'immobilization',
      label: 'Bất động kéo dài ≥ 3 ngày HOẶC Phẫu thuật lớn trong 4 tuần qua',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+1.5 điểm)' }, { value: false, label: 'Không (0 điểm)' }]
    },
    {
      id: 'priorVte',
      label: 'Tiền sử từng bị DVT hoặc PE',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+1.5 điểm)' }, { value: false, label: 'Không (0 điểm)' }]
    },
    {
      id: 'hemoptysis',
      label: 'Ho ra máu',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+1.0 điểm)' }, { value: false, label: 'Không (0 điểm)' }]
    },
    {
      id: 'malignancy',
      label: 'Ung thư đang hoạt động (Đang điều trị, trong 6 tháng qua hoặc chăm sóc giảm nhẹ)',
      type: 'boolean',
      defaultValue: false,
      options: [{ value: true, label: 'Có (+1.0 điểm)' }, { value: false, label: 'Không (0 điểm)' }]
    }
  ],

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const details: string[] = [];

    if (inputs.dvtSymptoms === true || inputs.dvtSymptoms === 'true') {
      score += 3.0;
      details.push('Triệu chứng lâm sàng DVT (+3.0)');
    }
    if (inputs.peMostLikely === true || inputs.peMostLikely === 'true') {
      score += 3.0;
      details.push('PE là chẩn đoán khả dĩ nhất (+3.0)');
    }
    if (inputs.tachycardia === true || inputs.tachycardia === 'true') {
      score += 1.5;
      details.push('Nhịp tim > 100 l/p (+1.5)');
    }
    if (inputs.immobilization === true || inputs.immobilization === 'true') {
      score += 1.5;
      details.push('Bất động ≥ 3 ngày hoặc phẫu thuật gần đây (+1.5)');
    }
    if (inputs.priorVte === true || inputs.priorVte === 'true') {
      score += 1.5;
      details.push('Tiền sử VTE/PE (+1.5)');
    }
    if (inputs.hemoptysis === true || inputs.hemoptysis === 'true') {
      score += 1.0;
      details.push('Ho ra máu (+1.0)');
    }
    if (inputs.malignancy === true || inputs.malignancy === 'true') {
      score += 1.0;
      details.push('Ung thư đang hoạt động (+1.0)');
    }

    let label = '';
    let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let recommendation = '';

    // Phân tầng 2 mức (Mô hình rút gọn khuyến cáo bởi ESC/AHA):
    // <= 4: PE Không chắc chắn (Unlikely) -> Xét nghiệm D-dimer độ nhạy cao
    // > 4: PE Khả năng cao (Likely) -> Chỉ định CTPA ngay, không chờ D-dimer
    if (score <= 4.0) {
      if (score < 2.0) {
        label = `Wells PE = ${score} điểm — NGUY CƠ THẤP (Xác suất PE ~ 8%)`;
        severity = 'low';
        recommendation = 'PE không khả dĩ (PE Unlikely). Cân nhắc áp dụng tiêu chuẩn loại trừ PERC Rule hoặc làm xét nghiệm D-dimer độ nhạy cao. Nếu D-dimer âm tính (hoặc theo tuổi: Tuổi x 10 ở người >50 tuổi) -> Loại trừ PE an toàn không cần chụp CT.';
      } else {
        label = `Wells PE = ${score} điểm — NGUY CƠ TRUNG BÌNH (Xác suất PE ~ 28%)`;
        severity = 'moderate';
        recommendation = 'PE không khả dĩ (PE Unlikely, Score ≤ 4). Chỉ định xét nghiệm D-dimer. Nếu D-dimer dương tính -> Bắt buộc chụp CT mạch máu phổi (CTPA).';
      }
    } else {
      label = `Wells PE = ${score} điểm — NGUY CƠ CAO (Xác suất PE > 35-65%)`;
      severity = score >= 6.0 ? 'critical' : 'high';
      recommendation = 'PE rất khả dĩ (PE Likely, Score > 4). CHỈ ĐỊNH CHỤP CT MẠCH MÁU PHỔI (CTPA) NGAY LẬP TỨC. Nếu không có chống chỉ định và nguy cơ xuất huyết thấp, cân nhắc khởi đầu thuốc chống đông ngay trong khi chờ chẩn đoán hình ảnh.';
    }

    const textForInsert = `[Thang điểm Wells PE]: ${score} điểm (${label.split('—')[1]?.trim() || ''})\n• Phân tầng: ${label}\n• Khuyến cáo ESC: ${recommendation}`;

    return {
      score,
      maxScore: 12.5,
      label,
      severity,
      recommendation,
      details: details.length > 0 ? details : ['Không có tiêu chuẩn nào được chọn (0 điểm)'],
      textForInsert
    };
  }
};
