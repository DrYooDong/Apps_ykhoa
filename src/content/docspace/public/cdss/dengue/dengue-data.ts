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
