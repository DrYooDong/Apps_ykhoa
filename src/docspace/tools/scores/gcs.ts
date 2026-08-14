/**
 * Glasgow Coma Scale (GCS)
 * Đánh giá mức độ rối loạn ý thức và tổn thương não cấp
 */

import { BaseCalculator, CalculatorResult } from '../types';
import { parseVitals } from '../../features/risk-score-calculator';
import { SoapPatientRecord } from '../../types';

export const gcsCalculator: BaseCalculator = {
  id: 'gcs',
  name: 'GCS — Thang điểm Hôn mê Glasgow',
  shortName: 'GCS',
  specialty: 'neurology',
  specialtyLabel: 'Thần kinh - Cấp cứu',
  description: 'Thang điểm tiêu chuẩn vàng lượng giá tri giác dựa trên 3 đáp ứng: Mở mắt (Eye - E), Lời nói (Verbal - V), và Vận động (Motor - M).',
  icon: 'fa-brain',
  evidenceReference: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974.',
  fields: [
    {
      id: 'eye',
      label: 'Đáp ứng Mở mắt (Eye - E)',
      type: 'select',
      options: [
        { value: 4, label: '4 điểm: Mở mắt tự nhiên' },
        { value: 3, label: '3 điểm: Mở mắt khi gọi / nghe tiếng động' },
        { value: 2, label: '2 điểm: Mở mắt khi kích thích đau' },
        { value: 1, label: '1 điểm: Không mở mắt khi kích thích đau' }
      ],
      defaultValue: 4
    },
    {
      id: 'verbal',
      label: 'Đáp ứng Lời nói (Verbal - V)',
      type: 'select',
      options: [
        { value: 5, label: '5 điểm: Trả lời nhanh, đúng, định hướng tốt' },
        { value: 4, label: '4 điểm: Trả lời lẫn lộn, nhầm lẫn định hướng' },
        { value: 3, label: '3 điểm: Nói từ rời rạc, không thành câu có nghĩa' },
        { value: 2, label: '2 điểm: Chỉ phát ra âm thanh vô nghĩa (ú ớ, rên rỉ)' },
        { value: 1, label: '1 điểm: Hoàn toàn không phát âm khi kích thích' }
      ],
      defaultValue: 5
    },
    {
      id: 'motor',
      label: 'Đáp ứng Vận động (Motor - M)',
      type: 'select',
      options: [
        { value: 6, label: '6 điểm: Thực hiện đúng theo y lệnh' },
        { value: 5, label: '5 điểm: Gạt đúng vị trí kích thích đau (định vị đau)' },
        { value: 4, label: '4 điểm: Co tay lại khi đau (rút lui không tự chủ)' },
        { value: 3, label: '3 điểm: Co cứng mất vỏ (gấp chi trên bất thường)' },
        { value: 2, label: '2 điểm: Duỗi cứng mất não (duỗi chi trên và dưới)' },
        { value: 1, label: '1 điểm: Hoàn toàn không đáp ứng vận động (mềm nhũn)' }
      ],
      defaultValue: 6
    }
  ],

  autofillFromPatient(patient: SoapPatientRecord) {
    const rawText = `${patient.oNotes || ''} ${patient.sNotes || ''}`;
    const vitals = parseVitals(rawText);

    if (vitals.gcs !== undefined) {
      const g = vitals.gcs;
      if (g === 15) return { eye: 4, verbal: 5, motor: 6 };
      if (g <= 3) return { eye: 1, verbal: 1, motor: 1 };
      // Ước lượng gần đúng
      if (g >= 13) return { eye: 4, verbal: 4, motor: 6 };
      if (g >= 9) return { eye: 3, verbal: 3, motor: 5 };
      return { eye: 2, verbal: 2, motor: 4 };
    }

    if (vitals.alteredMentation) {
      return { eye: 3, verbal: 4, motor: 5 };
    }

    return { eye: 4, verbal: 5, motor: 6 };
  },

  calculate(inputs: Record<string, any>): CalculatorResult {
    const eye = Number(inputs.eye) || 4;
    const verbal = Number(inputs.verbal) || 5;
    const motor = Number(inputs.motor) || 6;
    const score = eye + verbal + motor;

    const details = [
      `Mở mắt: E${eye}`,
      `Lời nói: V${verbal}`,
      `Vận động: M${motor}`
    ];

    let severity: CalculatorResult['severity'] = 'low';
    let levelText = '';
    let recommendation = '';

    if (score === 15) {
      severity = 'low';
      levelText = 'Tri giác tỉnh táo hoàn toàn (GCS 15đ)';
      recommendation = 'Theo dõi tri giác định kỳ, phát hiện sớm dấu thần kinh khu trú hoặc sụt giảm GCS ≥ 2 điểm.';
    } else if (score >= 13) {
      severity = 'low';
      levelText = 'Rối loạn ý thức / Tổn thương não mức độ NHẸ (GCS 13-14đ)';
      recommendation = 'Theo dõi sát tri giác mỗi 2-4h. Xem xét chỉ định CT-Scanner sọ não theo tiêu chuẩn New Orleans / Canadian CT Head Rule nếu có chấn thương sọ não.';
    } else if (score >= 9) {
      severity = 'moderate';
      levelText = 'Rối loạn ý thức / Tổn thương não mức độ TRUNG BÌNH (GCS 9-12đ)';
      recommendation = 'Chỉ định CT Sọ não khẩn cấp. Nằm đầu cao 30 độ, đảm bảo oxy hóa máu (SpO2 > 94%), chống tụt huyết áp. Chuẩn bị sẵn sàng phương tiện kiểm soát đường thở.';
    } else {
      severity = 'critical';
      levelText = 'HÔN MÊ SÂU / Tổn thương não NẶNG (GCS 3-8đ)';
      recommendation = '⚠️ CHỈ ĐỊNH ĐẶT NỘI KHÍ QUẢN BẢO VỆ ĐƯỜNG THỞ (GCS ≤ 8). Hồi sức cấp cứu thần kinh tích cực, kiểm soát tăng áp lực nội sọ (ICP), CT Sọ não khẩn cấp và hội chẩn Phẫu thuật Thần kinh/ICU.';
    }

    const label = `GCS = ${score}/15 điểm (E${eye}V${verbal}M${motor}) — ${levelText}`;
    const textForInsert = `[GCS]: ${score}/15 điểm (E${eye}V${verbal}M${motor}) ➔ ${levelText}. ${score <= 8 ? '⚠️ Chỉ định đặt NKQ bảo vệ đường thở.' : ''}`;

    return {
      score,
      maxScore: 15,
      label,
      severity,
      recommendation,
      details,
      textForInsert
    };
  }
};
