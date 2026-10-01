/**
 * CliniPortal CDSS — Dengue Data & Knowledge Base (Bộ Y Tế 2023)
 * Path: src/content/knowledge-vault/cdss/dengue/dengue-data.ts
 */

import { Gender } from '../cdss-types';

/**
 * Bảng Cân Nặng Chuẩn CDC 2014 Theo Tuổi & Giới (Phụ lục 9 - QĐ 2760/QĐ-BYT)
 */
export const CDC_STANDARD_WEIGHT: Record<number, { male: number; female: number }> = {
  2:  { male: 13, female: 12 },
  3:  { male: 14, female: 14 },
  4:  { male: 16, female: 16 },
  5:  { male: 18, female: 18 },
  6:  { male: 21, female: 20 },
  7:  { male: 23, female: 23 },
  8:  { male: 26, female: 26 },
  9:  { male: 29, female: 29 },
  10: { male: 32, female: 33 },
  11: { male: 36, female: 37 },
  12: { male: 40, female: 42 },
  13: { male: 45, female: 46 },
  14: { male: 51, female: 49 },
  15: { male: 56, female: 52 },
  16: { male: 61, female: 54 },
};

/**
 * Lấy cân nặng chuẩn theo tuổi và giới tính
 */
export function getCDCStandardWeight(age: number, gender: Gender): number {
  if (age < 2) {
    // Trẻ dưới 2 tuổi: xấp xỉ công thức WHO (hoặc nếu trẻ nhũ nhi: 9kg ở 1 tuổi)
    return gender === 'male' ? 10 : 9.5;
  }
  if (age > 16) {
    return gender === 'male' ? 60 : 50;
  }
  const entry = CDC_STANDARD_WEIGHT[Math.round(age)];
  return entry ? entry[gender] : (gender === 'male' ? 30 : 30);
}

/**
 * Định nghĩa template bậc truyền dịch theo Phân độ và Độ tuổi
 */
export interface FluidStageTemplate {
  stageName: string;
  defaultRateMlKgH: number;
  rateOptions: number[]; // Cho phép chọn linh hoạt
  defaultDurationHours: number;
  durationOptions: number[]; // Số giờ có thể chọn
  hctCheckRequired: boolean;
  notes: string;
}

export const DENGUE_FLUID_TEMPLATES = {
  // 1. Dấu hiệu cảnh báo
  warning_signs: {
    child: [
      {
        stageName: 'Cữ 1: Bù dịch ban đầu (Trẻ em)',
        defaultRateMlKgH: 6,
        rateOptions: [6, 7],
        defaultDurationHours: 2,
        durationOptions: [1, 2, 3],
        hctCheckRequired: true,
        notes: 'Đo lại Hct sau 2 giờ. Nếu Hct giảm và lâm sàng cải thiện -> chuyển Cữ 2.'
      },
      {
        stageName: 'Cữ 2: Giảm tốc độ bậc 1',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 3,
        durationOptions: [2, 3, 4],
        hctCheckRequired: true,
        notes: 'Đánh giá sinh hiệu, lượng nước tiểu và Hct trước khi quyết định giảm tiếp.'
      },
      {
        stageName: 'Cữ 3: Giảm tốc độ bậc 2',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 5, 6],
        hctCheckRequired: false,
        notes: 'Duy trì nước tiểu ≥ 1 ml/kg/h. Theo dõi sát tri giác.'
      },
      {
        stageName: 'Cữ 4: Giảm tốc độ duy trì & Cai dịch',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 6,
        durationOptions: [4, 6, 8, 12, 18],
        hctCheckRequired: true,
        notes: 'Cân nhắc ngưng dịch khi bệnh nhân ăn uống được, mạch HA ổn định, hết sốt ≥ 48h.'
      }
    ],
    adolescent: [
      {
        stageName: 'Cữ 1: Khởi đầu (Thiếu niên 13-15 tuổi)',
        defaultRateMlKgH: 6,
        rateOptions: [6, 7],
        defaultDurationHours: 1,
        durationOptions: [1, 1.5, 2],
        hctCheckRequired: true,
        notes: 'Thời gian mỗi nấc tốc độ bằng 1/2 trẻ em nhằm tránh thừa dịch quá tải.'
      },
      {
        stageName: 'Cữ 2: Giảm tốc độ nấc 1',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 1.5,
        durationOptions: [1, 1.5, 2],
        hctCheckRequired: true,
        notes: 'Kiểm tra mạch, HA và SpO2.'
      },
      {
        stageName: 'Cữ 3: Giảm tốc độ nấc 2',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 2,
        durationOptions: [2, 3],
        hctCheckRequired: false,
        notes: 'Theo dõi nước tiểu, phát hiện sớm dấu hiệu tái sốc.'
      },
      {
        stageName: 'Cữ 4: Duy trì & Ngưng dịch',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [2, 4, 6],
        hctCheckRequired: true,
        notes: 'Hết sốt, hồi phục thể tích nội mạch, cai truyền tĩnh mạch sớm.'
      }
    ],
    adult: [
      {
        stageName: 'Cữ 1: Bù ban đầu (Người lớn ≥ 16 tuổi)',
        defaultRateMlKgH: 6,
        rateOptions: [6],
        defaultDurationHours: 2,
        durationOptions: [1, 2, 3],
        hctCheckRequired: true,
        notes: 'Theo dõi Hct, SpO2 và tiếng thở ở phổi (ran ẩm đáy phổi).'
      },
      {
        stageName: 'Cữ 2: Giảm tốc độ bậc 1',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 3,
        durationOptions: [2, 3, 4],
        hctCheckRequired: true,
        notes: 'Theo dõi đáp ứng tri giác và nước tiểu.'
      },
      {
        stageName: 'Cữ 3: Duy trì & Cai dịch',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: true,
        notes: 'Ngưng dịch khi lâm sàng ổn định, khuyến khích bù nước điện giải đường uống.'
      }
    ]
  },

  // 2. Sốc SXHD (Còn bù)
  shock: {
    child: [
      {
        stageName: 'Cữ 1: Tải dịch chống sốc giờ đầu (20 ml/kg/h)',
        defaultRateMlKgH: 20,
        rateOptions: [15, 20],
        defaultDurationHours: 1,
        durationOptions: [1],
        hctCheckRequired: true,
        notes: 'Dịch tinh thể Ringer Lactate/NaCl 0.9%. Đánh giá lại mạch, HA và Hct ngay sau 1 giờ.'
      },
      {
        stageName: 'Cữ 2: Ra sốc - Giảm xuống 10 ml/kg/h',
        defaultRateMlKgH: 10,
        rateOptions: [10],
        defaultDurationHours: 1,
        durationOptions: [1, 2],
        hctCheckRequired: true,
        notes: 'Nếu không ra sốc hoặc Hct tăng cao -> hội chẩn đổi Cao phân tử.'
      },
      {
        stageName: 'Cữ 3: Tiếp tục giảm xuống 7.5 ml/kg/h',
        defaultRateMlKgH: 7.5,
        rateOptions: [7.5],
        defaultDurationHours: 2,
        durationOptions: [1, 2],
        hctCheckRequired: false,
        notes: 'Duy trì tư thế nằm ngang, ủ ấm.'
      },
      {
        stageName: 'Cữ 4: Giảm xuống 5 ml/kg/h',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 4,
        durationOptions: [2, 4],
        hctCheckRequired: true,
        notes: 'Kiểm tra Hct mỗi 2-4h.'
      },
      {
        stageName: 'Cữ 5: Giảm xuống 3 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: false,
        notes: 'Duy trì nước tiểu ≥ 0.5 - 1 ml/kg/h.'
      },
      {
        stageName: 'Cữ 6: Duy trì 1.5 ml/kg/h & Cai dịch',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 6,
        durationOptions: [4, 6, 8, 12],
        hctCheckRequired: true,
        notes: 'Tổng thời gian truyền dịch chống sốc thường không quá 24 - 48 giờ.'
      }
    ],
    adolescent: [
      {
        stageName: 'Cữ 1: Tải nhanh chống sốc (15-20 ml/kg/h)',
        defaultRateMlKgH: 15,
        rateOptions: [15, 20],
        defaultDurationHours: 1,
        durationOptions: [1],
        hctCheckRequired: true,
        notes: 'Theo dõi sát Hct và sinh hiệu sau 1 giờ.'
      },
      {
        stageName: 'Cữ 2: Giảm xuống 10 ml/kg/h',
        defaultRateMlKgH: 10,
        rateOptions: [10],
        defaultDurationHours: 1,
        durationOptions: [1],
        hctCheckRequired: true,
        notes: 'Kiểm tra xem ra sốc hay tái sốc.'
      },
      {
        stageName: 'Cữ 3: Giảm xuống 5 ml/kg/h',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 2,
        durationOptions: [2, 3],
        hctCheckRequired: false,
        notes: 'Rút ngắn thời gian mỗi nấc phòng ngừa quá tải.'
      },
      {
        stageName: 'Cữ 4: Giảm xuống 3 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 2,
        durationOptions: [2, 3],
        hctCheckRequired: true,
        notes: 'Đánh giá tri giác và nước tiểu.'
      },
      {
        stageName: 'Cữ 5: Duy trì 1.5 ml/kg/h & Cai dịch',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: true,
        notes: 'Chuẩn bị ngưng dịch an toàn.'
      }
    ],
    adult: [
      {
        stageName: 'Cữ 1: Tải dịch chống sốc người lớn (15 ml/kg/h)',
        defaultRateMlKgH: 15,
        rateOptions: [15],
        defaultDurationHours: 1,
        durationOptions: [1],
        hctCheckRequired: true,
        notes: 'Bù dịch tinh thể đẳng trương. Đo Hct ngay kết thúc 1 giờ.'
      },
      {
        stageName: 'Cữ 2: Ra sốc - Giảm xuống 10 ml/kg/h',
        defaultRateMlKgH: 10,
        rateOptions: [10],
        defaultDurationHours: 1,
        durationOptions: [1, 2],
        hctCheckRequired: true,
        notes: 'Đánh giá mạch, huyết áp, nước tiểu.'
      },
      {
        stageName: 'Cữ 3: Giảm xuống 5 ml/kg/h',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 2,
        durationOptions: [2, 3],
        hctCheckRequired: false,
        notes: 'Lắng nghe ran phổi, đề phòng phù phổi cấp.'
      },
      {
        stageName: 'Cữ 4: Giảm xuống 3 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 3,
        durationOptions: [2, 3, 4],
        hctCheckRequired: true,
        notes: 'Kiểm tra Hct.'
      },
      {
        stageName: 'Cữ 5: Duy trì 1.5 ml/kg/h',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: true,
        notes: 'Giảm dần và ngừng truyền dịch.'
      }
    ]
  },

  // 3. Sốc SXHD Nặng / Nguy kịch (Mạch 0, HA 0)
  severe_shock: {
    child: [
      {
        stageName: 'Cữ 1: Bơm trực tiếp tĩnh mạch 15-20 ml/kg trong 15 phút',
        defaultRateMlKgH: 60, // Tương đương 15ml/kg trong 15 phút (0.25h)
        rateOptions: [60, 80],
        defaultDurationHours: 0.25,
        durationOptions: [0.25],
        hctCheckRequired: true,
        notes: 'Dùng bơm tiêm hoặc túi ép truyền nhanh trực tiếp. Lập 2 đường truyền tĩnh mạch lớn.'
      },
      {
        stageName: 'Cữ 2: Nếu ra sốc -> Giảm xuống 10 ml/kg/h',
        defaultRateMlKgH: 10,
        rateOptions: [10],
        defaultDurationHours: 1,
        durationOptions: [1, 2],
        hctCheckRequired: true,
        notes: 'Nếu KHÔNG ra sốc hoặc Hct tăng: đổi ngay sang Dịch Cao Phân Tử (Dextran 40/HES 200) 10-15 ml/kg/h.'
      },
      {
        stageName: 'Cữ 3: Giảm xuống 7.5 ml/kg/h',
        defaultRateMlKgH: 7.5,
        rateOptions: [7.5],
        defaultDurationHours: 2,
        durationOptions: [1, 2],
        hctCheckRequired: false,
        notes: 'Theo dõi liên tục SpO2, ECG, CVP nếu có chỉ định.'
      },
      {
        stageName: 'Cữ 4: Giảm xuống 5 ml/kg/h',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 3,
        durationOptions: [2, 3, 4],
        hctCheckRequired: true,
        notes: 'Đánh giá dấu hiệu hồi phục tưới máu mô.'
      },
      {
        stageName: 'Cữ 5: Giảm 3 -> 1.5 ml/kg/h & Cai dịch',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 4,
        durationOptions: [3, 4],
        hctCheckRequired: true,
        notes: 'Chuyển dần sang duy trì 1.5 ml/kg/h khi huyết động hoàn toàn ổn định.'
      }
    ],
    adolescent: [
      {
        stageName: 'Cữ 1: Bơm trực tiếp tĩnh mạch 15-20 ml/kg trong 15 phút',
        defaultRateMlKgH: 60,
        rateOptions: [60, 80],
        defaultDurationHours: 0.25,
        durationOptions: [0.25],
        hctCheckRequired: true,
        notes: 'Khẩn trương lập đường truyền lớn, đo Hct tại giường.'
      },
      {
        stageName: 'Cữ 2: Dịch tinh thể hoặc Cao phân tử 10 ml/kg/h',
        defaultRateMlKgH: 10,
        rateOptions: [10],
        defaultDurationHours: 1,
        durationOptions: [1],
        hctCheckRequired: true,
        notes: 'Đánh giá đáp ứng sau 1 giờ.'
      },
      {
        stageName: 'Cữ 3: Giảm xuống 5 ml/kg/h',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 2,
        durationOptions: [1, 2],
        hctCheckRequired: false,
        notes: 'Theo dõi sát nước tiểu và áp lực tĩnh mạch trung tâm.'
      },
      {
        stageName: 'Cữ 4: Duy trì 3 -> 1.5 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 3,
        durationOptions: [2, 3],
        hctCheckRequired: true,
        notes: 'Cai dịch sớm, tránh quá tải tái hấp thu.'
      }
    ],
    adult: [
      {
        stageName: 'Cữ 1: Bơm trực tiếp 15 ml/kg trong 15 phút',
        defaultRateMlKgH: 60,
        rateOptions: [60],
        defaultDurationHours: 0.25,
        durationOptions: [0.25],
        hctCheckRequired: true,
        notes: 'Bơm nhanh tĩnh mạch qua kim 18G hoặc truyền dưới áp lực túi ép.'
      },
      {
        stageName: 'Cữ 2: Ra sốc -> Duy trì 10 ml/kg/h',
        defaultRateMlKgH: 10,
        rateOptions: [10],
        defaultDurationHours: 1,
        durationOptions: [1],
        hctCheckRequired: true,
        notes: 'Nếu sốc trơ: đổi sang Cao phân tử 10-15 ml/kg/h hoặc phối hợp vận mạch.'
      },
      {
        stageName: 'Cữ 3: Giảm xuống 5 ml/kg/h',
        defaultRateMlKgH: 5,
        rateOptions: [5],
        defaultDurationHours: 2,
        durationOptions: [2, 3],
        hctCheckRequired: false,
        notes: 'Khám đáy phổi tìm ran ẩm.'
      },
      {
        stageName: 'Cữ 4: Duy trì 3 -> 1.5 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 4,
        durationOptions: [3, 4],
        hctCheckRequired: true,
        notes: 'Đưa về tốc độ an toàn và ngưng dịch.'
      }
    ]
  }
};

/**
 * Hướng Dẫn Điều Dưỡng An Toàn (HKKK) & Bảng Kiểm
 */
export const DENGUE_NURSING_CHECKLIST = [
  'Đo sinh hiệu (Mạch, HA, Nhịp thở, SpO2) và kiểm tra tri giác trước mỗi lần giảm tốc độ truyền.',
  'Đo Hct tại giường trước và sau mỗi đợt tăng/giảm tốc độ dịch hoặc khi bệnh nhân bứt rứt, vã mồ hôi, chi lạnh.',
  'Đặt sonde tiểu theo dõi lượng nước tiểu mỗi giờ ở bệnh nhân sốc; báo bác sĩ ngay nếu nước tiểu < 0.5 ml/kg/h.',
  'Kiểm tra định kỳ dịch dư trong chai trước khi treo thêm chai mới; ghi rõ số ml dịch hiện tại vào hồ sơ.',
  'Lắng nghe phổi tìm ran ẩm, phát hiện sớm phù phổi cấp (khó thở, bọt hồng, SpO2 tụt, gan to nhanh đau tức).',
  'Tuyệt đối cấm tiêm bắp, dùng Aspirin, Ibuprofen và các thuốc NSAIDs.',
  'Bàn giao cữ rõ ràng: Dùng nút "Sao Chép Bảng Bàn Giao Cữ" trên CDSS để dán vào phiếu theo dõi giao ban.'
];

/**
 * =========================================================================
 * PHÁC ĐỒ XỬ TRÍ KHI BỆNH NHÂN KHÔNG ĐÁP ỨNG / SỐC TRƠ / BIẾN CHỨNG
 * Chuẩn hóa 100% theo Quyết định số 2760/QĐ-BYT (04/07/2023)
 * =========================================================================
 */

export interface RefractoryScenarioDef {
  id: string;
  code: string;
  name: string;
  tag: string;
  badgeClass: string;
  triggerCriteria: string;
  mechanism: string;
  primaryAction: string;
  keyOrders: string[];
  monitoringSteps: string[];
  precautions: string[];
  appendixRef: string;
}

export const DENGUE_REFRACTORY_SCENARIOS: Record<string, RefractoryScenarioDef> = {
  // 1. Không đáp ứng + Hct cao ≥ 40% (Thất thoát huyết tương ồ ạt)
  hct_high_cpt: {
    id: 'hct_high_cpt',
    code: 'CPT_ESCALATION',
    name: 'Không Đáp Ứng + Hct Còn Cao ≥ 40% (Thất Thoát Huyết Tương Tiến Triển)',
    tag: 'Chuyển Cao Phân Tử',
    badgeClass: 'danger',
    triggerCriteria: 'Sau bù dịch tinh thể giờ đầu nhưng mạch còn nhanh nhỏ, HA còn kẹt ≤ 20 mmHg hoặc tụt, Hct ≥ 40% hoặc không giảm.',
    mechanism: 'Thất thoát huyết tương nặng qua hàng rào nội mô mao mạch; dịch tinh thể nhanh chóng thoát ra khoang thứ ba gây ứ dịch màng bụng/màng phổi mà không giữ được thể tích nội mạch.',
    primaryAction: 'Chuyển sang dung dịch Cao Phân Tử (Dextran 40, Dextran 70 hoặc 6% HES 200). Trẻ em: 10 - 20 ml/kg/h x 1h; Người lớn: 10 - 15 ml/kg/h x 1h.',
    keyOrders: [
      'Trẻ em: Cao phân tử (Dextran 40 / 6% HES 200) 10 - 20 ml/kg/h truyền tĩnh mạch trong 1 giờ. Nếu cải thiện -> giảm dần 10 -> 7.5 -> 5 ml/kg/h.',
      'Người lớn: Cao phân tử 10 - 15 ml/kg/h truyền tĩnh mạch trong 1 giờ. Nếu cải thiện -> chuyển điện giải RL/NaCl 0.9% 10 -> 6 -> 3 -> 1.5 ml/kg/h.',
      'Nếu không cải thiện lâm sàng sau CPT lần 1: Lặp lại CPT 10 - 20 ml/kg/h (trẻ em) hoặc 10 ml/kg/h (người lớn) trong 1 giờ.',
      'Nếu vẫn không ra sốc sau 2 lần CPT: Kích hoạt ngay Lưu đồ Sốc Thất Bại Bù Dịch (Phụ lục 18).'
    ],
    monitoringSteps: [
      'Đo lại Hct tại giường sau mỗi giờ truyền CPT.',
      'Theo dõi sinh hiệu (Mạch, HA, SpO2) mỗi 15 - 30 phút.',
      'Ghi nhận lượng nước tiểu mỗi giờ (đích ≥ 0.5 - 1 ml/kg/h).',
      'Cảnh báo giới hạn tổng liều CPT: Không vượt quá 60 ml/kg để tránh suy thận cấp và rối loạn đông máu.'
    ],
    precautions: [
      'Khi tổng liều CPT ≥ 60 ml/kg mà còn sốc: Hội chẩn chuyển sang truyền Albumin 5% hoặc 10% (trang 20 QĐ 2760).',
      'Nếu không có Dextran 40/HES 200, có thể thay bằng HES 130 hoặc Gelatin nhưng khả năng giữ thể tích kém hơn, cần theo dõi sát.'
    ],
    appendixRef: 'Phụ lục 8, 11, 12, 16.1, 16.2 & Trang 15, 28 QĐ 2760'
  },

  // 2. Không đáp ứng + Hct giảm nhanh > 20% hoặc Hct ≤ 35% (Xuất huyết nội ẩn)
  occult_bleeding: {
    id: 'occult_bleeding',
    code: 'OCCULT_BLEEDING',
    name: 'Không Đáp Ứng + Hct Giảm Nhanh > 20% hoặc Hct ≤ 35% (Nghi Xuất Huyết Nội Ẩn)',
    tag: 'Truyền Máu Khẩn Cấp',
    badgeClass: 'danger',
    triggerCriteria: 'Sốc thất bại bù dịch ≥ 40-60 ml/kg kèm Hct giảm đột ngột > 20% so với ban đầu hoặc Hct ≤ 35% (ở người lớn Hct < 35%), hoặc đang có xuất huyết ồ ạt.',
    mechanism: 'Mất máu cấp do xuất huyết tiêu hóa ẩn (dạ dày, ruột non), xuất huyết phủ tạng hoặc tụ máu cơ sau mạc treo kết hợp giảm tiểu cầu nặng và rối loạn đông máu tiêu thụ.',
    primaryAction: 'Thăm khám tìm ổ xuất huyết nội, truyền Hồng Cầu Lắng khẩn cấp, song song duy trì CPT 10 ml/kg/h trong lúc chờ máu.',
    keyOrders: [
      'Hồng cầu lắng 5 - 10 ml/kg (hoặc Máu toàn phần 10 - 20 ml/kg lấy < 7 ngày) truyền tĩnh mạch trong 1 - 2 giờ. Mục tiêu Hct duy trì 35 - 40%.',
      'Song song: Truyền Cao phân tử 10 ml/kg/h để nâng huyết áp chống sốc trong khi chờ lĩnh máu.',
      'Huyết tương tươi đông lạnh (HTĐL) 10 - 20 ml/kg/2-4h: Khi PT hoặc aPTT > 1.5 lần chứng kèm xuất huyết nặng hoặc chuẩn bị thủ thuật.',
      'Kết tủa lạnh 1 túi / 6 kg (chứa 150mg Fibrinogen): Khi xuất huyết nặng kèm Fibrinogen < 1 g/L.',
      'Tiểu cầu đậm đặc: 1 đơn vị / 5 kg (hoặc 1 đv gạn tách / 10 kg) khi TC < 50.000/mm³ kèm xuất huyết nặng hoặc TC < 5.000/mm³.',
      'Omeprazole 1 mg/kg IV chậm (người lớn: Bolus 80mg TM, sau đó 40mg mỗi 12h) nếu nghi ngờ loét dạ dày - tá tràng.',
      'Vitamin K1 1 mg/kg tĩnh mạch chậm (tối đa 20 mg/ngày) nếu có tổn thương gan nặng.'
    ],
    monitoringSteps: [
      'Thăm trực tràng tìm phân đen / máu; đặt sonde dạ dày qua đường MIỆNG (không đặt đường mũi do dễ chảy máu cuống mũi).',
      'Đo lại Hct sau 1 giờ truyền máu và CPT.',
      'Theo dõi sát dấu hiệu sinh tồn 15 phút/lần cho đến khi huyết áp ổn định.',
      'Băng ép tại chỗ mọi vị trí chảy máu tiêm chích; nhét bấc mũi tẩm Adrenalin nếu chảy máu mũi nặng.'
    ],
    precautions: [
      'Tuyệt đối không chọc tĩnh mạch cổ hay tĩnh mạch dưới đòn (nguy cơ tụ máu trung thất tử vong).',
      'Hạn chế tối đa tiêm bắp; lấy máu xét nghiệm tại tĩnh mạch chi và ép chặt điểm tiêm 1-2 phút.'
    ],
    appendixRef: 'Phụ lục 17 & Trang 16, 22-23, 29-30 QĐ 2760'
  },

  // 3. Sốc thất bại bù dịch / Sốc kéo dài / Tái sốc ≥ 2 lần (Lưu đồ Phụ lục 18)
  refractory_shock: {
    id: 'refractory_shock',
    code: 'REFRACTORY_SHOCK',
    name: 'Sốc Thất Bại Bù Dịch / Sốc Kéo Dài / Tái Sốc ≥ 2 Lần (Lưu Đồ Phụ Lục 18)',
    tag: 'Đo CVP & Vận Mạch',
    badgeClass: 'danger',
    triggerCriteria: 'Bù dịch CPT ≥ 60-100 ml/kg nhưng huyết động vẫn không ổn định, tái sốc nhiều lần, toan chuyển hóa tiến triển.',
    mechanism: 'Suy tuần hoàn phức tạp kết hợp: sốc giảm thể tích kéo dài, toan máu nặng ức chế cơ tim, suy chức năng co bóp cơ tim do viêm cơ tim Dengue và giảm kháng lực mạch hệ thống.',
    primaryAction: 'Hội chẩn khẩn cấp chuyên gia SXHD. Đặt catheter đo CVP qua tĩnh mạch nền khuỷu tay (Seldinger cải tiến), đo HAĐMXL, làm khí máu động mạch, điều trị gói ABCS và xử trí theo mức CVP.',
    keyOrders: [
      'Đo CVP & HAĐMXL: Đặt tĩnh mạch nền khuỷu tay (không dùng TM cảnh/dưới đòn). Siêu âm IVC đánh giá xẹp/căng.',
      'Test dịch: Truyền Cao phân tử 5 ml/kg trong 30 phút.',
      'Nếu CVP ≤ 15 cmH2O (hoặc IVC xẹp): Tiếp tục truyền CPT 10 - 20 ml/kg/h. Nếu tổng CPT ≥ 60 ml/kg kèm Albumin < 2.5 g/dL -> Chỉ định bù Albumin 5% hoặc 10%.',
      'Nếu CVP > 15 cmH2O (hoặc IVC căng to suốt chu kỳ thở):',
      '  • Co bóp cơ tim bình thường: Ngưng dịch nếu quá tải, dùng Dobutamin 3 - 10 µg/kg/phút.',
      '  • Co bóp cơ tim giảm: Truyền Dopamin 5 - 10 µg/kg/phút; nếu quá tải ngưng dịch + Dobutamin 3 - 10 µg/kg/phút.',
      '  • Nếu còn sốc kèm giảm co bóp cơ tim: Phối hợp Adrenalin 0.05 - 0.3 µg/kg/phút.',
      '  • Nếu giảm kháng lực mạch hệ thống (HA tâm trương tụt, sốc ấm): Phối hợp Noradrenalin 0.05 - 1 µg/kg/phút.',
      'Gói hồi sức ABCS bắt buộc: A (Bicarbonate 4.2% nếu pH < 7.35), B (Máu & chế phẩm), C (Calci clorua 10% nếu Ca++ < 1.0 mmol/L), S (Dextrose 30% nếu Glucose < 40 mg/dL).'
    ],
    monitoringSteps: [
      'Theo dõi liên tục monitor: ECG, SpO2, HAĐMXL, CVP.',
      'Đo ScvO2 (khí máu tĩnh mạch trung tâm): Mục tiêu duy trì ScvO2 ≥ 70%.',
      'Lactate máu động mạch mỗi 2 - 4 giờ (mục tiêu giảm < 2 mmol/L).',
      'Kiểm tra men tim Troponin I, CK-MB, siêu âm tim tại giường tìm tràn dịch màng tim / viêm cơ tim.'
    ],
    precautions: [
      'Công thức tính liều Albumin (g): [Nồng độ Albumin cần đạt (g/dL) - Nồng độ hiện tại (g/dL)] × 0.8 × Cân nặng (kg).',
      'Cách pha Albumin 5%: 1 lọ 20% 50ml + 150ml NaCl 0.9% = 200ml Albumin 5%.',
      'Cách pha Albumin 10%: 1 lọ 20% 50ml + 50ml NaCl 0.9% = 100ml Albumin 10%.'
    ],
    appendixRef: 'Phụ lục 12, 13, 15, 18 & Trang 16, 20-21, 28-29 QĐ 2760'
  },

  // 4. Biến chứng Dư dịch / Quá tải tuần hoàn / Phù phổi cấp
  fluid_overload: {
    id: 'fluid_overload',
    code: 'FLUID_OVERLOAD',
    name: 'Biến Chứng Dư Dịch / Quá Tải Tuần Hoàn / Phù Phổi Cấp',
    tag: 'Ngưng Dịch & Lợi Tiểu',
    badgeClass: 'warning',
    triggerCriteria: 'Đột ngột ho, khó thở, thở nhanh, co kéo, SpO2 < 92%, ran ẩm nổ dâng nhanh ở hai đáy phổi, khạc bọt hồng, tĩnh mạch cổ nổi, gan to đau, CVP > 15 cmH2O.',
    mechanism: 'Quá tải thể tích tuần hoàn do bù dịch tốc độ cao kéo dài kết hợp hiện tượng tái hấp thu dịch từ khoang kẽ vào lòng mạch ở ngày thứ 6 - 7 của bệnh.',
    primaryAction: 'NGƯNG NGAY DỊCH TRUYỀN TĨNH MẠCH. Cho bệnh nhân nằm đầu cao 30 - 45°, thở oxy gọng kính -> thở NCPAP hoặc thở máy, dùng Furosemide và Dobutamin.',
    keyOrders: [
      'NGƯNG TRUYỀN DỊCH TĨNH MẠCH NGAY LẬP TỨC.',
      'Tư thế: Nằm đầu cao 30 - 45°.',
      'Hỗ trợ hô hấp: Thở oxy qua canulla 2 - 5 L/phút -> Thở NCPAP áp lực 4 - 6 cmH2O, FiO2 40-60%, tăng dần đến 10 cmH2O và FiO2 80-100% nếu không cải thiện.',
      'Furosemide 0.5 - 1 mg/kg tiêm tĩnh mạch chậm, có thể lặp lại sau 1 giờ nếu tình trạng huyết động cho phép (Huyết áp ổn định).',
      'Dobutamin 5 - 10 µg/kg/phút truyền tĩnh mạch để tăng co bóp cơ tim, giảm áp lực mao mạch phổi bít.',
      'Chọc hút - dẫn lưu màng bụng giải áp khi: Suy hô hấp thất bại với NCPAP + tràn dịch màng bụng lượng nhiều chèn ép cơ hoành và áp lực ổ bụng (áp lực bàng quang) > 27 cmH2O.',
      'Chọc hút màng phổi giải áp: Khi tràn dịch màng phổi lượng nhiều mờ > 1/2 phế trường chèn ép phổi gây suy hô hấp nặng (lưu ý chỉnh đông máu trước chọc).'
    ],
    monitoringSteps: [
      'SpO2 liên tục, khí máu động mạch đánh giá PaO2/FiO2 (ARDS).',
      'X-quang ngực thẳng tại giường đánh giá phù phổi mờ hình cánh bướm / tràn dịch màng phổi.',
      'Theo dõi lượng nước tiểu mỗi 30 - 60 phút sau dùng Furosemide.',
      'Đo áp lực bàng quang qua sonde tiểu gián tiếp đo áp lực ổ bụng.'
    ],
    precautions: [
      'Không dùng Furosemide khi huyết áp còn tụt hoặc bệnh nhân còn đang sốc giảm thể tích chưa ra sốc.',
      'Trong giai đoạn tái hấp thu (N6 - N7), Hct thường bị pha loãng giảm sinh lý; không nhầm lẫn với mất máu nếu chi ấm, mạch chậm rõ, HA bình thường.'
    ],
    appendixRef: 'Phụ lục 7, 20 & Trang 21, 26-28 QĐ 2760'
  },

  // 5. Biến chứng Tổn thương gan nặng & Suy gan cấp (Phụ lục 26)
  acute_liver_failure: {
    id: 'acute_liver_failure',
    code: 'ACUTE_LIVER_FAILURE',
    name: 'Biến Chứng Tổn Thương Gan Nặng & Suy Gan Cấp (Phụ Lục 26)',
    tag: 'Phác Đồ NAC & Lọc Máu',
    badgeClass: 'danger',
    triggerCriteria: 'AST hoặc ALT ≥ 1000 U/L, hoặc kèm bệnh não gan độ I-IV, INR ≥ 1.5, hoặc MELD score ≥ 15.',
    mechanism: 'Vi rút Dengue tấn công trực tiếp tế bào gan và phản ứng miễn dịch viêm cytokine bão hòa gây hoại tử nhu mô gan diện rộng, kèm thiếu máu cục bộ trong sốc kéo dài.',
    primaryAction: 'TUYỆT ĐỐI TRÁNH DÙNG RINGER LACTATE VÀ PARACETAMOL. Dùng dung dịch NaCl 0.9% hoặc Ringer Acetate. Khởi động phác đồ truyền N-Acetylcysteine (NAC) 4 pha.',
    keyOrders: [
      'Chống chỉ định tuyệt đối: Ringer Lactate (gan suy không chuyển hóa được lactate gây toan lactic nặng) và Paracetamol.',
      'Dịch thay thế: NaCl 0.9% hoặc Ringer Acetate, Dextrosaline. Hạn chế tối đa dùng HES.',
      'Phác đồ N-Acetylcysteine (NAC) truyền tĩnh mạch:',
      '  • Pha 1 (Tấn công): 150 mg/kg truyền trong 1 giờ (pha Glucose 5% 200ml).',
      '  • Pha 2: 50 mg/kg truyền trong 4 giờ tiếp theo (pha Glucose 5% 500ml).',
      '  • Pha 3: 100 mg/kg truyền trong 16 giờ tiếp theo (pha Glucose 5% 1000ml).',
      '  • Pha 4: Duy trì 6.25 mg/kg/giờ liên tục trong 48 - 72 giờ.',
      'Điều trị bệnh não gan: Lactulose 15 - 30ml uống hoặc thụt tháo; Kháng sinh Metronidazol 500mg q8h hoặc Rifaximin.',
      'Vitamin K1 1 mg/kg TM chậm (tối đa 20 mg/ngày). Truyền huyết tương đông lạnh nếu có rối loạn đông máu / chảy máu.',
      'Xem xét Thay huyết tương (TPE) thể tích cao và Lọc máu liên tục (CVVHDF) khi thất bại điều trị nội sau 24 - 48 giờ hoặc có kèm tổn thương thận cấp, Bilirubin ≥ 200 µmol/L, INR ≥ 2.5, NH3 ≥ 150 mmol/L, Lactate ≥ 5.'
    ],
    monitoringSteps: [
      'Đông máu toàn bộ (PT, INR, aPTT, Fibrinogen), men gan, Bilirubin, Amoniac máu (NH3), Lactate mỗi 6 - 12 giờ.',
      'Đường huyết mao mạch mỗi 2 - 4 giờ (nguy cơ hạ đường huyết nghiêm trọng do mất dự trữ glycogen).',
      'Khám tri giác định kỳ phát hiện dấu hiệu phù não và tăng áp lực nội sọ.'
    ],
    precautions: [
      'Lưu ý nguy cơ phản ứng phản vệ khi tiêm truyền N-Acetylcysteine; không dùng cho bệnh nhân thiếu men G6PD.',
      'Hạn chế dịch truyền 2/3 - 3/4 nhu cầu cơ bản khi không còn sốc để tránh phù não và suy tim.'
    ],
    appendixRef: 'Phụ lục 26 & Trang 24-25, 30-31 QĐ 2760'
  },

  // 6. Sốt xuất huyết Thể Não & Tăng Áp Lực Nội Sọ
  encephalopathy_icp: {
    id: 'encephalopathy_icp',
    code: 'ENCEPHALOPATHY_ICP',
    name: 'Sốt Xuất Huyết Thể Não & Tăng Áp Lực Nội Sọ',
    tag: 'Chống Phù Não & Co Giật',
    badgeClass: 'danger',
    triggerCriteria: 'Rối loạn tri giác (GCS giảm), co giật, dấu thần kinh khu trú, tam chứng Cushing (mạch chậm, HA cao, thở bất thường), phù gai thị.',
    mechanism: 'Phù não thứ phát do tăng tính thấm thành mạch não, độc tố thần kinh của suy gan, toan chuyển hóa nặng, xuất huyết vi mạch não hoặc viêm não Dengue.',
    primaryAction: 'Nằm đầu cao 30°, thở oxy hoặc đặt nội khí quản thở máy tăng thông khí (mục tiêu PaCO2 30-35 mmHg), chống phù não bằng Mannitol 20% và NaCl 3%, cắt cơn co giật.',
    keyOrders: [
      'Tư thế: Nằm đầu cao 30° chính giữa cổ (không gập hoặc nghiêng cổ làm nghẽn hồi lưu tĩnh mạch cảnh).',
      'Chống phù não: Mannitol 20% liều 0.5 g/kg truyền tĩnh mạch nhanh trong 30 phút, lặp lại mỗi 8 giờ.',
      'Có thể phối hợp xen kẽ Natri Clorua 3% liều 4 ml/kg truyền nhanh 30 phút, lặp lại mỗi 8 giờ.',
      'Cắt cơn co giật: Diazepam 0.2 mg/kg tiêm tĩnh mạch chậm (hoặc bơm hậu môn 0.5 mg/kg). Lặp lại liều 2 sau 10 phút (tối đa 3 liều). Nếu thất bại: Phenobarbital 10 - 20 mg/kg truyền TM trong 15 - 30 phút.',
      'Đặt nội khí quản bảo vệ đường thở và thở máy kiểm soát áp lực: Tăng thông khí giữ PaCO2 từ 30 - 35 mmHg.',
      'Điều trị hạ đường huyết khẩn cấp: Dextrose 30% 1 - 2 ml/kg TM chậm (trẻ < 1 tuổi: Dextrose 10% 2 ml/kg).'
    ],
    monitoringSteps: [
      'Đánh giá phản xạ đồng tử, thang điểm Glasgow (hoặc thang điểm AVPU) mỗi 1 - 2 giờ.',
      'Khí máu động mạch kiểm soát PaCO2 và thăng bằng kiềm toan.',
      'Theo dõi điện giải đồ máu (Na+, K+, Cl-) và áp lực thẩm thấu máu (Osmolality).'
    ],
    precautions: [
      'Không dùng Mannitol khi bệnh nhân đang tụt huyết áp hoặc sốc chưa ổn định.',
      'Tránh hạ đường huyết và hạ Natri máu vì làm nặng thêm tình trạng phù não.'
    ],
    appendixRef: 'Trang 25-26, 31-32 QĐ 2760'
  }
};

export const DENGUE_NON_RESPONSE_SCENARIOS = {
  ...DENGUE_REFRACTORY_SCENARIOS,
  cpt_escalation: DENGUE_REFRACTORY_SCENARIOS.hct_high_cpt
};

