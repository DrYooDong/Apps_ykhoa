/**
 * Thang điểm Child-Pugh đánh giá mức độ nặng của Xơ gan (A, B, C)
 * Ref: Pugh RN, et al. Br J Surg 1973; 60:646-649.
 */

import { BaseCalculator, CalculatorResult } from '../types';

export const childPughCalculator: BaseCalculator = {
  id: 'child-pugh',
  name: 'Thang Điểm Child-Pugh Đánh Giá Mức Độ Xơ Gan (Class A, B, C)',
  shortName: 'Child-Pugh Xơ Gan',
  specialty: 'gastroenterology',
  specialtyLabel: 'Tiêu hóa - Gan mật',
  description: 'Đánh giá mức độ suy giảm chức năng gan, phân loại Child-Pugh A, B, C để tiên lượng tử vong và định hướng chỉ định phẫu thuật / ghép gan.',
  icon: 'fa-solid fa-virus',
  evidenceReference: 'Pugh RN, et al. British Journal of Surgery 1973 / AASLD & EASL Cirrhosis Guidelines',
  fields: [
    {
      id: 'totalBilirubin',
      label: 'Bilirubin toàn phần (Total Bilirubin)',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: '< 2.0 mg/dL (< 34 µmol/L) — [1 điểm]' },
        { value: '2', label: '2.0 - 3.0 mg/dL (34 - 50 µmol/L) — [2 điểm]' },
        { value: '3', label: '> 3.0 mg/dL (> 50 µmol/L) — [3 điểm]' }
      ]
    },
    {
      id: 'serumAlbumin',
      label: 'Albumin huyết thanh',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: '> 3.5 g/dL (> 35 g/L) — [1 điểm]' },
        { value: '2', label: '2.8 - 3.5 g/dL (28 - 35 g/L) — [2 điểm]' },
        { value: '3', label: '< 2.8 g/dL (< 28 g/L) — [3 điểm]' }
      ]
    },
    {
      id: 'inr',
      label: 'Tỷ số INR (hoặc Thời gian Prothrombin kéo dài)',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: 'INR < 1.7 (PT kéo dài < 4s) — [1 điểm]' },
        { value: '2', label: 'INR 1.7 - 2.3 (PT kéo dài 4 - 6s) — [2 điểm]' },
        { value: '3', label: 'INR > 2.3 (PT kéo dài > 6s) — [3 điểm]' }
      ]
    },
    {
      id: 'ascites',
      label: 'Mức độ Cổ trướng (Báng bụng)',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: 'Không có báng bụng — [1 điểm]' },
        { value: '2', label: 'Ít / Vừa (Đáp ứng với thuốc lợi tiểu) — [2 điểm]' },
        { value: '3', label: 'Nhiều / Báng trơ (Cần chọc tháo thường xuyên) — [3 điểm]' }
      ]
    },
    {
      id: 'encephalopathy',
      label: 'Bệnh não gan (Hepatic Encephalopathy)',
      type: 'select',
      defaultValue: '1',
      options: [
        { value: '1', label: 'Không có — [1 điểm]' },
        { value: '2', label: 'Độ 1 - 2 (Rối loạn giấc ngủ, lẫn lộn nhẹ, vỗ cánh +) — [2 điểm]' },
        { value: '3', label: 'Độ 3 - 4 (U ám, lú lẫn nặng, hôn mê gan) — [3 điểm]' }
      ]
    }
  ],

  calculate(inputs: Record<string, any>): CalculatorResult {
    const bili = parseInt(inputs.totalBilirubin) || 1;
    const alb = parseInt(inputs.serumAlbumin) || 1;
    const inr = parseInt(inputs.inr) || 1;
    const asc = parseInt(inputs.ascites) || 1;
    const enc = parseInt(inputs.encephalopathy) || 1;

    const score = bili + alb + inr + asc + enc;

    let childClass = '';
    let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let recommendation = '';
    let survival = '';

    if (score <= 6) {
      childClass = 'Child-Pugh A (Xơ gan còn bù tốt)';
      severity = 'low';
      survival = 'Tỷ lệ sống còn 1 năm ~ 100%, 2 năm ~ 85%. Tỷ lệ tử vong chu phẫu ổ bụng ~ 10%.';
      recommendation = 'Duy trì điều trị nguyên nhân nền (thuốc kháng virus viêm gan B/C, cai rượu). Tầm soát ung thư tế bào gan (HCC) mỗi 6 tháng bằng siêu âm bụng + AFP. Nội soi thực quản dạ dày tầm soát giãn tĩnh mạch.';
    } else if (score <= 9) {
      childClass = 'Child-Pugh B (Xơ gan mất bù đáng kể)';
      severity = 'moderate';
      survival = 'Tỷ lệ sống còn 1 năm ~ 80%, 2 năm ~ 60%. Tỷ lệ tử vong chu phẫu ~ 30%.';
      recommendation = 'Xem xét chỉ định đưa vào danh sách chờ Ghép Gan (Liver Transplantation). Tối ưu hóa điều trị lợi tiểu (Spironolactone + Furosemide), phòng ngừa xuất huyết tiêu hóa do vỡ giãn tĩnh mạch (chẹn Beta không chọn lọc như Propranolol/Carvedilol).';
    } else {
      childClass = 'Child-Pugh C (Xơ gan mất bù giai đoạn nặng)';
      severity = 'critical';
      survival = 'Tỷ lệ sống còn 1 năm ~ 45%, 2 năm ~ 35%. Tỷ lệ tử vong chu phẫu rất cao (~ 70-80%).';
      recommendation = 'Ưu tiên hàng đầu cho Ghép Gan khẩn cấp nếu có chỉ định. Điều trị tích cực các biến chứng: Chọc tháo báng bụng kèm truyền Albumin (8g cho mỗi lít dịch tháo > 5L), dùng Lactulose và Rifaximin phòng ngừa hôn mê gan tái phát.';
    }

    const details = [
      `Bilirubin: ${bili} điểm | Albumin: ${alb} điểm | INR: ${inr} điểm`,
      `Cổ trướng: ${asc} điểm | Bệnh não gan: ${enc} điểm`,
      `Tiên lượng sống còn: ${survival}`
    ];

    const textForInsert = `[Thang điểm Child-Pugh]: ${score} điểm (${childClass})\n• Tiên lượng: ${survival}\n• Khuyến cáo AASLD/EASL: ${recommendation}`;

    return {
      score,
      maxScore: 15,
      label: `Child-Pugh = ${score} điểm — ${childClass}`,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
