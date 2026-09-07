/**
 * Thang điểm NIHSS (National Institutes of Health Stroke Scale)
 * Đánh giá mức độ khiếm khuyết thần kinh trong Đột quỵ thiếu máu não cấp
 * Ref: Brott T, et al. Stroke 1989; 20:864-870.
 */

import { BaseCalculator, CalculatorResult } from '../types';

export const nihssCalculator: BaseCalculator = {
  id: 'nihss',
  name: 'Thang Điểm NIHSS Đánh Giá Mức Độ Đột Quỵ Não Cấp',
  shortName: 'NIHSS (Đột Quỵ)',
  specialty: 'neurology',
  specialtyLabel: 'Thần kinh',
  description: 'Thang điểm 11 mục chuẩn hóa quốc tế đánh giá mức độ tổn thương thần kinh, chỉ định tiêu sợi huyết (rTPA) và can thiệp lấy huyết khối cơ học (EVT).',
  icon: 'fa-solid fa-brain',
  evidenceReference: 'AHA/ASA 2024 Acute Ischemic Stroke Guidelines / Brott T et al. Stroke 1989',
  fields: [
    {
      id: 'loc',
      label: '1a. Ý thức / Tri giác',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Tỉnh táo hoàn toàn, đáp ứng nhạy bén' },
        { value: '1', label: '1: Ngủ gà nhưng dễ đánh thức bằng lời nói/kích thích nhẹ' },
        { value: '2', label: '2: U ám, cần kích thích lặp lại hoặc kích thích đau' },
        { value: '3', label: '3: Hôn mê, chỉ có phản xạ tủy hoặc không đáp ứng' }
      ]
    },
    {
      id: 'locQuestions',
      label: '1b. Câu hỏi ý thức (Tháng hiện tại, Tuổi của BN)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Trả lời đúng cả 2 câu' },
        { value: '1', label: '1: Trả lời đúng 1 câu (hoặc mất ngôn ngữ, đặt NKQ)' },
        { value: '2', label: '2: Không trả lời đúng câu nào (hoặc hôn mê)' }
      ]
    },
    {
      id: 'locCommands',
      label: '1c. Thực hiện y lệnh (Nhắm/mở mắt, Nắm/buông tay)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Thực hiện đúng cả 2 y lệnh' },
        { value: '1', label: '1: Thực hiện đúng 1 y lệnh' },
        { value: '2', label: '2: Không thực hiện đúng y lệnh nào' }
      ]
    },
    {
      id: 'gaze',
      label: '2. Vận nhãn (Liếc mắt nhìn ngang)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Bình thường' },
        { value: '1', label: '1: Liệt một phần vận nhãn' },
        { value: '2', label: '2: Liệt hoàn toàn hoặc lệch hướng cưỡng bức' }
      ]
    },
    {
      id: 'visual',
      label: '3. Thị trường (Khám thị trường từng bên)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Không mất thị trường' },
        { value: '1', label: '1: Bán manh một phần' },
        { value: '2', label: '2: Bán manh đồng danh hoàn toàn' },
        { value: '3', label: '3: Mù 2 bên (Bán manh cả 2 mắt)' }
      ]
    },
    {
      id: 'facialPalsy',
      label: '4. Liệt mặt (Frowning, cười, nhăn mặt)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Vận động cơ mặt cân đối' },
        { value: '1', label: '1: Liệt nhẹ (mờ rãnh mũi má, lệch nhẹ khi cười)' },
        { value: '2', label: '2: Liệt phần dưới cơ mặt hoàn toàn hoặc gần hoàn toàn' },
        { value: '3', label: '3: Liệt mặt hoàn toàn một hoặc hai bên (cả trên và dưới)' }
      ]
    },
    {
      id: 'motorArmLeft',
      label: '5a. Vận động Tay Trái (Giơ tay 90° ngồi hoặc 45° nằm trong 10 giây)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Giữ nguyên 10 giây không rơi' },
        { value: '1', label: '1: Rơi nhẹ (rơi trước 10s nhưng không chạm giường)' },
        { value: '2', label: '2: Có gắng sức chống trọng lực nhưng rơi chạm giường' },
        { value: '3', label: '3: Không chống được trọng lực, chỉ co cơ nhẹ' },
        { value: '4', label: '4: Không có cử động nào (Liệt hoàn toàn)' }
      ]
    },
    {
      id: 'motorArmRight',
      label: '5b. Vận động Tay Phải (Giơ tay trong 10 giây)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Giữ nguyên 10 giây' },
        { value: '1', label: '1: Rơi nhẹ trước 10 giây' },
        { value: '2', label: '2: Rơi chạm giường trước 10s' },
        { value: '3', label: '3: Không chống được trọng lực' },
        { value: '4', label: '4: Liệt hoàn toàn không cử động' }
      ]
    },
    {
      id: 'motorLegLeft',
      label: '6a. Vận động Chân Trái (Nâng chân 30° nằm trong 5 giây)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Giữ nguyên 5 giây không rơi' },
        { value: '1', label: '1: Rơi nhẹ trước 5 giây' },
        { value: '2', label: '2: Rơi chạm giường trước 5 giây' },
        { value: '3', label: '3: Không chống được trọng lực' },
        { value: '4', label: '4: Liệt hoàn toàn không cử động' }
      ]
    },
    {
      id: 'motorLegRight',
      label: '6b. Vận động Chân Phải (Nâng chân trong 5 giây)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Giữ nguyên 5 giây' },
        { value: '1', label: '1: Rơi nhẹ trước 5 giây' },
        { value: '2', label: '2: Rơi chạm giường trước 5 giây' },
        { value: '3', label: '3: Không chống được trọng lực' },
        { value: '4', label: '4: Liệt hoàn toàn không cử động' }
      ]
    },
    {
      id: 'ataxia',
      label: '7. Thất điều chi (Ngón tay chỉ mũi, gót chân vuốt cẳng chân)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Không thất điều' },
        { value: '1', label: '1: Thất điều ở 1 chi' },
        { value: '2', label: '2: Thất điều ở 2 chi' }
      ]
    },
    {
      id: 'sensory',
      label: '8. Cảm giác (Châm kim đánh giá cảm giác đau)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Bình thường' },
        { value: '1', label: '1: Giảm cảm giác nhẹ đến vừa' },
        { value: '2', label: '2: Mất cảm giác hoàn toàn một bên' }
      ]
    },
    {
      id: 'language',
      label: '9. Ngôn ngữ (Mô tả tranh, gọi tên đồ vật, đọc câu chuẩn)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Không mất ngôn ngữ, nói lưu loát' },
        { value: '1', label: '1: Mất ngôn ngữ nhẹ đến vừa' },
        { value: '2', label: '2: Mất ngôn ngữ nặng (khó hiểu hoặc khó diễn đạt)' },
        { value: '3', label: '3: Câm hoàn toàn hoặc mất ngôn ngữ toàn bộ' }
      ]
    },
    {
      id: 'dysarthria',
      label: '10. Loạn vận ngôn / Nói đớ (Đọc danh sách từ chuẩn)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Phát âm rõ ràng' },
        { value: '1', label: '1: Nói đớ nhẹ đến vừa (người nghe vẫn hiểu được)' },
        { value: '2', label: '2: Nói đớ nặng (người nghe không hiểu được hoặc câm)' }
      ]
    },
    {
      id: 'extinction',
      label: '11. Thờ ơ nửa người / Không chú ý (Extinction / Neglect)',
      type: 'select',
      defaultValue: '0',
      options: [
        { value: '0', label: '0: Bình thường' },
        { value: '1', label: '1: Thờ ơ một giác quan (thị giác hoặc xúc giác)' },
        { value: '2', label: '2: Thờ ơ sâu sắc nhiều giác quan (không nhận ra nửa người)' }
      ]
    }
  ],

  calculate(inputs: Record<string, any>): CalculatorResult {
    let score = 0;
    const fieldKeys = [
      'loc', 'locQuestions', 'locCommands', 'gaze', 'visual',
      'facialPalsy', 'motorArmLeft', 'motorArmRight', 'motorLegLeft',
      'motorLegRight', 'ataxia', 'sensory', 'language', 'dysarthria', 'extinction'
    ];

    fieldKeys.forEach(k => {
      score += parseInt(inputs[k]) || 0;
    });

    let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
    let label = '';
    let recommendation = '';

    if (score === 0) {
      label = `NIHSS = 0 điểm — Không phát hiện khiếm khuyết thần kinh`;
      severity = 'low';
      recommendation = 'Theo dõi sát diễn tiến. Nếu nghi ngờ TIA hoặc đột quỵ nhẹ, chụp MRI sọ não khuếch tán (DWI) để loại trừ ổ nhồi máu nhỏ.';
    } else if (score <= 4) {
      label = `NIHSS = ${score} điểm — Đột quỵ nhẹ (Minor Stroke)`;
      severity = 'low';
      recommendation = 'Xem xét chỉ định Thuốc tiêu sợi huyết đường tĩnh mạch (Alteplase / Tenecteplase) nếu trong cửa sổ < 4.5 giờ và có triệu chứng gây tàn phế. Phối hợp DAPT sớm (Aspirin + Clopidogrel) trong 21 ngày cho đột quỵ nhẹ không tiêu sợi huyết (POINT/CHANCE Trial).';
    } else if (score <= 15) {
      label = `NIHSS = ${score} điểm — Đột quỵ mức độ trung bình (Moderate Stroke)`;
      severity = 'moderate';
      recommendation = 'BÁO ĐỘNG ĐỘT QUỴ CẤP (Code Stroke). Chỉ định tiêu sợi huyết đường tĩnh mạch rTPA ngay nếu trong 4.5 giờ từ khi khởi phát. Khảo sát mạch máu não (CTA/MRA) tìm tắc mạch lớn (LVO) đoạn gốc MCA-M1/ICA để can thiệp lấy huyết khối cơ học (EVT) trong 6-24 giờ.';
    } else if (score <= 20) {
      label = `NIHSS = ${score} điểm — Đột quỵ mức độ nặng (Moderate to Severe Stroke)`;
      severity = 'high';
      recommendation = 'Khả năng cao tắc mạch lớn (LVO). Tiến hành song song tiêu sợi huyết IV rTPA và chuyển phòng Cathlab can thiệp lấy huyết khối cơ học (EVT) khẩn cấp.';
    } else {
      label = `NIHSS = ${score} điểm — Đột quỵ mức độ rất nặng (Severe Stroke)`;
      severity = 'critical';
      recommendation = 'Nguy cơ phù não ác tính và chuyển dạng xuất huyết rất cao. Hồi sức thần kinh tích cực, bảo vệ đường thở, kiểm soát huyết áp và hội chẩn ngoại thần kinh xem xét phẫu thuật mở sọ giải áp.';
    }

    const details = [
      `Tổng điểm NIHSS: ${score} / 42 điểm`,
      `Phân loại mức độ: ${label.split('—')[1]?.trim() || ''}`,
      `Khuyến cáo: ${recommendation}`
    ];

    const textForInsert = `[Thang điểm NIHSS]: ${score} điểm (${label.split('—')[1]?.trim() || ''})\n• Phân loại: ${label}\n• Xử trí cấp cứu: ${recommendation}`;

    return {
      score,
      maxScore: 42,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
