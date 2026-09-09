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
        stageName: 'Cữ 3: Giảm xuống 6 ml/kg/h (Phác đồ BYT 2023)',
        defaultRateMlKgH: 6,
        rateOptions: [6],
        defaultDurationHours: 2,
        durationOptions: [2],
        hctCheckRequired: true,
        notes: 'Nấc chuẩn hóa 6 ml/kg/h theo QĐ 2760/QĐ-BYT. Kiểm tra Hct, SpO2, mạch, HA.'
      },
      {
        stageName: 'Cữ 4: Giảm xuống 3 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 3,
        durationOptions: [2, 3, 4],
        hctCheckRequired: false,
        notes: 'Lắng nghe ran phổi, duy trì nước tiểu ≥ 0.5 ml/kg/h.'
      },
      {
        stageName: 'Cữ 5: Duy trì 1.5 ml/kg/h & Cai dịch',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: true,
        notes: 'Giảm dần và ngừng truyền dịch sau 24-48 giờ.'
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
        stageName: 'Cữ 4: Giảm xuống 3 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 2,
        durationOptions: [2, 3],
        hctCheckRequired: true,
        notes: 'Cai dịch sớm, tránh quá tải tái hấp thu.'
      },
      {
        stageName: 'Cữ 5: Duy trì 1.5 ml/kg/h & Cai dịch an toàn',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: true,
        notes: 'Duy trì nước tiểu ≥ 0.5 - 1 ml/kg/h trước khi ngưng hẳn dịch truyền.'
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
        stageName: 'Cữ 4: Giảm xuống 3 ml/kg/h',
        defaultRateMlKgH: 3,
        rateOptions: [3],
        defaultDurationHours: 3,
        durationOptions: [2, 3, 4],
        hctCheckRequired: true,
        notes: 'Theo dõi nước tiểu và áp lực tĩnh mạch.'
      },
      {
        stageName: 'Cữ 5: Duy trì 1.5 ml/kg/h & Cai dịch an toàn',
        defaultRateMlKgH: 1.5,
        rateOptions: [1.5],
        defaultDurationHours: 4,
        durationOptions: [3, 4, 6],
        hctCheckRequired: true,
        notes: 'Đưa về tốc độ an toàn và ngưng dịch sau 24-48 giờ.'
      }
    ]
  }
};

/**
 * QUY TẮC RẼ NHÁNH ĐIỀU TRỊ SXHD (Phụ lục 10 & Sơ đồ QĐ 2760/QĐ-BYT)
 */
export const DENGUE_BRANCH_RULES = {
  // Nhánh tái sốc / chi lạnh ẩm
  cold_extremities: {
    name: 'Chi Lạnh Ẩm / Mạch Nhanh Nhỏ',
    condition: 'Bệnh nhân có biểu hiện vã mồ hôi, chi lạnh ẩm, CRT > 2s, mạch nhanh nhỏ nhưng HA chưa kẹp',
    action: 'Truyền dịch tinh thể (Ringer Lactate / NaCl 0.9%) tốc độ 10 ml/kg/giờ trong 1 giờ.',
    targetHctCheck: true
  },
  // Nhánh sốc thất bại với dịch tinh thể + Hct cao
  shock_failed_high_hct: {
    name: 'Không Đáp Ứng Tinh Thể + Hct Tăng Cao (≥ 40% hoặc tăng so với nền)',
    condition: 'Sau 1-2h bù tinh thể liều cao mà mạch nhanh, HA kẹp/tụt và Hct vẫn tăng cao',
    action: 'Chuyển ngay sang Dịch Cao Phân Tử (Dextran 40 10% hoặc HES 200 6%) liều 10 - 15 - 20 ml/kg/giờ trong 1 giờ.',
    precautions: 'Tổng lượng Dextran 40 không quá 30 ml/kg/24h, HES 200 không quá 30-50 ml/kg/24h để tránh suy thận cấp và rối loạn đông máu.'
  },
  // Nhánh sốc thất bại với dịch tinh thể + Hct tụt
  shock_failed_low_hct: {
    name: 'Không Đáp Ứng Tinh Thể + Hct Giảm Nhanh (≤ 35% hoặc giảm > 20% so với nền)',
    condition: 'Sau bù dịch mà sốc không cải thiện, nhưng Hct giảm nhanh đột ngột',
    action: 'Nghi ngờ xuất huyết nội tạng tiềm ẩn (tiêu hóa, ổ bụng, phúc mạc). Hội chẩn khẩn truyền Khối Hồng Cầu 5 - 10 ml/kg. Không tăng tiếp tốc độ tinh thể/CPT.',
    targetHct: '35 - 40%'
  },
  // Điều kiện chuyển đổi Cao phân tử về Dịch tinh thể (Phụ lục 10)
  cpt_to_crystalloid: {
    name: 'Điều Kiện Chuyển Đổi Cao Phân Tử → Tinh Thể',
    criteria: [
      'Mạch rõ, tần số tim trở về bình thường theo tuổi',
      'Huyết áp bình thường, hiệu áp > 30 mmHg',
      'Chi ấm, thời gian đổ đầy mao mạch CRT < 2 giây',
      'Lượng nước tiểu ≥ 0.5 - 1.0 ml/kg/giờ',
      'Hct giảm và ổn định'
    ],
    stepDownProtocol: 'Giảm CPT: 10 ml/kg/h (1-2h) → 7.5 ml/kg/h (1-2h) → 5 ml/kg/h (2-3h) → Chuyển sang Dịch tinh thể 5 hoặc 3 ml/kg/h.'
  }
};

/**
 * CHỈ ĐỊNH & LIỀU CHẾ PHẨM MÁU TRONG SXHD (QĐ 2760/QĐ-BYT 2023)
 */
export const BLOOD_PRODUCT_PROTOCOLS = {
  red_blood_cells: {
    id: 'hcl',
    name: 'Khối Hồng Cầu (HCL)',
    indications: [
      'Sốc không hồi phục sau bù dịch kèm Hct giảm nhanh > 20% so với trước bù dịch hoặc Hct ≤ 35%',
      'Xuất huyết tiêu hóa hoặc nội tạng ồ ạt (dù Hct lúc đầu có thể chưa giảm do cô đặc máu)'
    ],
    dosePerKg: '5 - 10 ml/kg (người lớn: 1-2 đơn vị 250-350ml)',
    target: 'Duy trì Hct đạt 35% - 40%',
    precautions: 'Bù dịch trong khi chờ máu; theo dõi nguy cơ phù phổi cấp khi truyền nhanh trên nền quá tải dịch.'
  },
  fresh_frozen_plasma: {
    id: 'ffp',
    name: 'Huyết Tương Tươi Đông Lạnh (FFP)',
    indications: [
      'Rối loạn đông máu nặng: INR > 1.5 hoặc aPTT kéo dài > 1.5 lần chứng kèm xuất huyết nặng đang tiến triển',
      'Cần phẫu thuật hoặc can thiệp thủ thuật xâm lấn khẩn cấp'
    ],
    dosePerKg: '10 - 20 ml/kg',
    target: 'Đưa INR về < 1.5 và aPTT về < 1.5 lần chứng',
    precautions: 'Không dùng FFP để bù thể tích đơn thuần nếu không có rối loạn đông máu hoặc xuất huyết.'
  },
  cryoprecipitate: {
    id: 'cryo',
    name: 'Tủa Lạnh (Cryoprecipitate)',
    indications: [
      'Fibrinogen máu < 1.0 g/L (100 mg/dL) kèm xuất huyết đe dọa tính mạng hoặc đang phẫu thuật'
    ],
    dosePerKg: '1 túi / 6 kg cân nặng (tương đương 0.15 túi/kg; người lớn: 6 - 10 túi)',
    target: 'Nâng Fibrinogen lên ≥ 1.0 - 1.5 g/L',
    precautions: 'Truyền nhanh ngay sau khi rã đông.'
  },
  platelets: {
    id: 'platelets',
    name: 'Khối Tiểu Cầu',
    indications: [
      'Tiểu cầu < 50.000/mm³ kèm xuất huyết nặng đe dọa tính mạng (não, tiêu hóa ồ ạt)',
      'Tiểu cầu < 5.000/mm³ dù chưa có biểu hiện xuất huyết lâm sàng',
      'Cần phẫu thuật cấp cứu và tiểu cầu < 50.000/mm³'
    ],
    dosePerKg: 'Tiểu cầu đậm đặc 1 đơn vị / 5 - 7 kg (người lớn: 1 pool 4-6 đơn vị hoặc 1 khối gạn tách máy Apheresis)',
    target: 'Cầm máu lâm sàng (không truyền tiểu cầu để phòng ngừa nếu không có chỉ định trên)',
    precautions: 'Không truyền tiểu cầu dự phòng khi tiểu cầu > 5.000/mm³ không xuất huyết (tránh nguy cơ sốc phản vệ, quá tải thể tích và ứ đọng miễn dịch).'
  }
};

/**
 * QUY TẮC ĐỐI TƯỢNG ĐẶC BIỆT (QĐ 2760/QĐ-BYT 2023)
 */
export const SPECIAL_PATIENT_RULES = {
  pregnancy: {
    name: 'Phụ Nữ Mang Thai (PNCT)',
    baselineHct: '28% - 40% (sinh lý pha loãng máu lúc mang thai)',
    hemoconcentrationThreshold: 'Hct > 36% - 38% đã là cô đặc máu bệnh lý',
    weightCorrection: '3 tháng cuối thai kỳ: Trừ bớt 5 - 8 kg cân nặng thai + ối + dịch ngoại bào để tính liều dịch, tránh phù phổi cấp.',
    posture: 'Nằm nghiêng trái 15 - 30 độ để giải áp tĩnh mạch chủ dưới, cải thiện tuần hoàn nhau thai.',
    contraindication: 'CHỐNG CHỈ ĐỊNH mổ lấy thai hoặc khởi phát chuyển dạ chủ động trong giai đoạn thoát huyết tương cấp (ngày 3-6) nếu không có chỉ định sinh tử vì nguy cơ xuất huyết và sốc tử vong cực cao.'
  },
  thalassemia: {
    name: 'Bệnh Nhân Thalassemia / Huyết Tán Mãn',
    baselineHct: '20% - 28% (thiếu máu nền mạn tính)',
    hemoconcentrationThreshold: 'Hct tăng > 20% so với Hct nền của chính bệnh nhân (VD: nền 22% -> Hct 27% đã là cô đặc máu nặng)',
    fluidCaution: 'Cơ tim bệnh nhân Thalassemia thường đã quá tải sắt và giãn buồng tim, rất dễ phù phổi cấp khi truyền dịch nhanh. Cân nhắc đo CVP sớm.',
    fluidType: 'Ưu tiên NaCl 0.9%, thận trọng khi dùng Ringer Lactate nếu có ứ sắt gây suy gan kèm theo.'
  },
  infant: {
    name: 'Trẻ Nhũ Nhi (< 12 Tháng Tuổi)',
    baselineHct: '30% - 35%',
    risks: 'Dễ co giật do sốt cao, dễ hạ đường huyết, dễ hạ natri máu do bù nước không đúng cách.',
    monitoring: 'Đo đường huyết mao mạch mỗi 4-6 giờ. Bù Glucose 10% ngay nếu đường huyết < 4.0 mmol/L (70 mg/dL).'
  }
};

/**
 * PHÁC ĐỒ TỔN THƯƠNG GAN CẤP & N-ACETYLCYSTEINE (NAC) TRONG SXHD
 */
export const LIVER_INJURY_PROTOCOL = {
  tiers: [
    {
      level: 'mild_moderate',
      astAltRange: '120 - 400 U/L',
      desc: 'Tổn thương gan nhẹ đến vừa',
      fluidAdvice: 'Có thể dùng Ringer Lactate nếu chức năng gan còn bù và không toan máu.'
    },
    {
      level: 'severe_hepatitis',
      astAltRange: '400 - 1000 U/L',
      desc: 'Viêm gan cấp nặng',
      fluidAdvice: 'NGỪNG DÙNG Ringer Lactate (chuyển sang NaCl 0.9% hoặc Acetate Ringer/Plasma-Lyte). Ngừng ngay Paracetamol.'
    },
    {
      level: 'acute_liver_failure',
      astAltRange: '≥ 1000 U/L hoặc kèm rối loạn đông máu (INR > 1.5) / Bệnh não gan',
      desc: 'Tổn thương gan tối cấp / Suy gan cấp',
      fluidAdvice: 'Tuyệt đối không dùng Ringer Lactate. Chỉ định phác đồ N-Acetylcysteine (NAC) truyền tĩnh mạch.'
    }
  ],
  nacProtocol: {
    name: 'Phác Đồ N-Acetylcysteine (NAC) Tĩnh Mạch Điều Trị Suy Gan SXHD',
    phases: [
      {
        phase: 1,
        name: 'Pha 1: Tải nhanh',
        doseMgKg: 150,
        durationHours: 1,
        diluent: 'Glucose 5% 200ml (hoặc 100ml ở trẻ em)'
      },
      {
        phase: 2,
        name: 'Pha 2: Duy trì 1',
        doseMgKg: 50,
        durationHours: 4,
        diluent: 'Glucose 5% 500ml (hoặc 250ml ở trẻ em)'
      },
      {
        phase: 3,
        name: 'Pha 3: Duy trì 2',
        doseMgKg: 100,
        durationHours: 16,
        diluent: 'Glucose 5% 1000ml (hoặc 500ml ở trẻ em)'
      },
      {
        phase: 4,
        name: 'Pha 4: Duy trì tiếp theo (nếu chưa hồi phục)',
        doseMgKg: 100,
        durationHours: 24,
        diluent: 'Glucose 5% 1000ml truyền liên tục cho đến khi men gan giảm và INR < 1.5'
      }
    ],
    precautions: 'Theo dõi phản ứng phản vệ/dị ứng với NAC (phát ban, co thắt phế quản); xử trí bằng kháng histamin nếu có biểu hiện.'
  }
};

/**
 * 4 PHÁC ĐỒ THUỐC VẬN MẠCH BƠM TIÊM ĐIỆN 50ML (QĐ 2760/QĐ-BYT)
 */
export const DENGUE_VASOPRESSOR_PROTOCOLS = {
  dopamin: {
    drugName: 'Dopamin' as const,
    syringeVolumeMl: 50,
    diluent: 'Glucose 5%',
    weightMultiplier: 3, // 3 * P (kg) mg
    infusionEquivalent: 'Tốc độ 1 ml/giờ = 1 µg/kg/phút',
    standardDoseRange: '5 - 10 µg/kg/phút (tối đa 20 µg/kg/phút)',
    indications: 'Lựa chọn đầu tay ở trẻ em khi sốc kéo dài hoặc tái sốc đã bù đủ dịch.',
    precautions: 'Gây nhịp nhanh xoang; tăng nhu cầu oxy cơ tim.'
  },
  noradrenalin: {
    drugName: 'Noradrenalin' as const,
    syringeVolumeMl: 50,
    diluent: 'Glucose 5%',
    weightMultiplier: 0.3, // 0.3 * P (kg) mg
    infusionEquivalent: 'Tốc độ 1 ml/giờ = 0.1 µg/kg/phút',
    standardDoseRange: '0.05 - 0.5 µg/kg/phút (khởi đầu 0.1 µg/kg/phút)',
    indications: 'Sốc giãn mạch (chi ấm, HA tâm trương tụt sâu, áp lực tưới máu kém) hoặc người lớn sốc trơ dịch.',
    precautions: 'Bắt buộc truyền qua catheter tĩnh mạch trung tâm hoặc tĩnh mạch lớn, tránh hoại tử mô khi thoát mạch.'
  },
  dobutamin: {
    drugName: 'Dobutamin' as const,
    syringeVolumeMl: 50,
    diluent: 'Glucose 5%',
    weightMultiplier: 3, // 3 * P (kg) mg
    infusionEquivalent: 'Tốc độ 1 ml/giờ = 1 µg/kg/phút',
    standardDoseRange: '3 - 10 µg/kg/phút (tối đa 15 µg/kg/phút)',
    indications: 'Suy giảm chức năng cơ tim, CVP cao (> 10-12 cmH₂O), áp lực tĩnh mạch cao kèm HA kẹp, cung lượng tim thấp.',
    precautions: 'Có thể gây tụt huyết áp nếu chưa bù đủ thể tích dịch; cần phối hợp Noradrenalin nếu có kèm tụt HA tâm trương.'
  },
  adrenalin: {
    drugName: 'Adrenalin' as const,
    syringeVolumeMl: 50,
    diluent: 'Glucose 5%',
    weightMultiplier: 0.3, // 0.3 * P (kg) mg
    infusionEquivalent: 'Tốc độ 1 ml/giờ = 0.1 µg/kg/phút',
    standardDoseRange: '0.05 - 0.3 µg/kg/phút',
    indications: 'Sốc nguy kịch, sốc trơ với Dopamin và Noradrenalin, hoặc có kèm nhịp tim chậm nghiêm trọng.',
    precautions: 'Nguy cơ loạn nhịp tim cao, co mạch ngoại vi mạnh gây thiếu máu đầu chi.'
  }
};

/**
 * BẢNG KIỂM XỬ TRÍ ABCS TRONG SỐC SXHD KÉO DÀI / TÁI SỐC (QĐ 2760/QĐ-BYT)
 */
export const ABCS_CHECKLIST_RULES = {
  acidosis: {
    title: 'A — Acidosis (Toan Chuyển Hóa)',
    criteria: 'Khí máu động mạch: pH < 7.15 hoặc HCO₃⁻ < 10 mmol/L kèm sốc kéo dài trơ với dịch truyền',
    action: 'Bù Natri Bicarbonat 4.2% (hoặc 8.4% pha loãng) theo công thức: Lượng NaHCO₃ 4.2% (ml) = BE × Cân nặng (kg) × 0.3 (hoặc 1-2 ml/kg truyền chậm trong 30-60 phút).'
  },
  bleeding: {
    title: 'B — Bleeding (Xuất Huyết Ẩn)',
    criteria: 'Hct tụt đột ngột sau bù dịch (giảm > 20% hoặc ≤ 35%) trong khi mạch nhanh, HA vẫn kẹp hoặc tụt',
    action: 'Nghi ngờ xuất huyết nội tạng tiềm ẩn (dạ dày, ổ bụng, tụ máu thành bụng). Hội chẩn khẩn truyền Khối Hồng Cầu 5-10 ml/kg, đặt sonde dạ dày, nội soi cầm máu khi huyết động cho phép.'
  },
  calcium: {
    title: 'C — Calcium (Hạ Canxi Máu)',
    criteria: 'Canxi ion hóa (Ca²⁺) < 1.0 mmol/L (thường gặp khi truyền máu hoặc toan chuyển hóa nặng làm giảm co bóp cơ tim)',
    action: 'Tiêm Canxi Clorid 10% 0.2 ml/kg (hoặc Canxi Gluconate 10% 0.5-1 ml/kg) pha loãng với Glucose 5% tiêm tĩnh mạch chậm trong 10-15 phút dưới theo dõi monitor nhịp tim.'
  },
  sugar: {
    title: 'S — Sugar (Hạ Đường Huyết)',
    criteria: 'Đường huyết mao mạch < 4.0 mmol/L (< 70 mg/dL)',
    action: 'Bolus Glucose 10% 2 ml/kg tiêm tĩnh mạch chậm trong 3-5 phút, sau đó duy trì truyền dịch chứa Glucose 5% hoặc 10% để giữ đường huyết 5 - 8 mmol/L.'
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
  'Bàn giao cữ rõ ràng: Dùng nút "Sao Chép Bảng Bàn Giao Cữ" trên CDSS để dán vào phiếu theo dõi giao ban.',
  'Siêu âm tại giường (POCUS) đánh giá đường kính và độ xẹp tĩnh mạch chủ dưới (IVC) để hướng dẫn bù dịch và tránh phù phổi cấp.',
  'Xác nhận loại dịch truyền: Không dùng Ringer Lactate khi bệnh nhân có tổn thương gan cấp nặng (AST/ALT ≥ 400 U/L hoặc suy gan); đổi ngay sang NaCl 0.9%.',
  'Xuất huyết tiêu hóa: Đặt sonde dạ dày kiểm tra dịch, dùng PPI liều cao (Omeprazole 80mg bolus tĩnh mạch rồi 8mg/giờ hoặc 40mg TM mỗi 12 giờ).'
];
