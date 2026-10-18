import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Target, 
  Syringe, 
  AlertTriangle, 
  ShieldAlert, 
  HeartCrack, 
  Pill, 
  Activity, 
  CheckCircle2, 
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Flame,
  Clock,
  Sparkles
} from 'lucide-react';

interface GuidelineSection {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: {
    subtitle?: string;
    points: string[];
    pearls?: string[];
    reference: string;
  }[];
}

const KNOWLEDGE_SECTIONS: GuidelineSection[] = [
  {
    id: 'targets',
    title: '1. Mục Tiêu & Định Nghĩa Đường Huyết Nội Viện (ADA 2026)',
    category: 'Mục Tiêu & Tiêu Chuẩn',
    summary: 'Ngưỡng chẩn đoán tăng/hạ đường huyết, mục tiêu cho bệnh nhân ICU và Non-ICU theo cập nhật mới nhất.',
    content: [
      {
        subtitle: 'Định nghĩa & Ngưỡng chẩn đoán',
        points: [
          'Tăng đường huyết nội viện: Bất kỳ mức đường huyết nào > 140 mg/dL (> 7.8 mmol/L).',
          'HbA1c lúc nhập viện ≥ 6.5%: Gợi ý bệnh nhân đã mắc đái tháo đường trước khi nhập viện.',
          'Khởi đầu điều trị Insulin: Khuyến cáo bắt đầu khi đường huyết tăng dai dẳng ≥ 180 mg/dL (≥ 10.0 mmol/L) được xác nhận ít nhất 2 lần trong 24 giờ.',
        ],
        reference: 'ADA 2026 Standards of Care (Rec 16.1, 16.4a, 16.4b)',
      },
      {
        subtitle: 'Mục tiêu kiểm soát đường huyết theo khoa phòng',
        points: [
          'Khoa Hồi sức tích cực (ICU) / Bệnh nhân nặng: 140 – 180 mg/dL (7.8 – 10.0 mmol/L). Không nên kiểm soát quá chặt chẽ (80-110 mg/dL) vì làm tăng nguy cơ hạ đường huyết và tử vong (NICE-SUGAR trial).',
          'Khoa Nội / Ngoại thông thường (Non-ICU): 100 – 180 mg/dL (5.6 – 10.0 mmol/L) nếu đạt được an toàn không gây hạ đường huyết.',
          'Mục tiêu nới lỏng (lên đến 250 mg/dL / 13.9 mmol/L): Chấp nhận ở người mắc bệnh nan y tiên lượng sống ngắn, suy thận giai đoạn cuối, người già yếu sa sút trí tuệ hoặc nguy cơ hạ đường huyết cao.',
          'Cảnh báo sớm Flory: ĐH đói < 100 mg/dL (< 5.6 mmol/L) là dấu hiệu dự báo cơn hạ đường huyết trong 24 giờ tiếp theo.',
        ],
        reference: 'ADA 2026 Standards of Care (Rec 16.5a, 16.5b)',
      },
    ],
  },
  {
    id: 'insulin-strategy',
    title: '2. Chiến Lược Dùng Insulin: Basal-Bolus vs Basal Plus',
    category: 'Phác Đồ Insulin',
    summary: 'Nguyên lý chọn phác đồ, công thức tính liều TDD theo cân nặng, và chống chỉ định Sliding-Scale đơn độc.',
    content: [
      {
        subtitle: 'Lựa chọn phác đồ chuẩn',
        points: [
          'Basal-Bolus (Nền - Bữa ăn): Phác đồ chuẩn tối ưu cho bệnh nhân ăn uống đường miệng đầy đủ. Bao gồm: 50% Insulin nền (Basal) + 50% Insulin bữa ăn (Prandial chia 3 bữa) + Liều hiệu chỉnh (Correction).',
          'Basal Plus: Dành cho bệnh nhân nhịn ăn (NPO) hoặc ăn uống kém. Gồm: Insulin nền (50% TDD hoặc 0.2-0.25 ĐV/kg) + Liều hiệu chỉnh khi ĐH cao (không tiêm liều bữa ăn cố định).',
          'Truyền TTM liên tục (VRIII/FRIII): Chỉ định trong ICU, phẫu thuật nhịn ăn kéo dài, toan ceton (DKA) hoặc tăng áp lực thẩm thấu (HHS).',
        ],
        reference: 'ADA 2026 (Rec 16.8, 16.9) & iSTEP-D/VADE',
      },
      {
        subtitle: 'Cách tính tổng liều ngày (TDD) theo thể trạng',
        points: [
          '0.3 ĐV/kg: Người có nguy cơ hạ ĐH cao (Tuổi ≥ 65, suy thận eGFR < 45, gầy BMI < 19, hoặc mới dùng insulin lần đầu).',
          '0.4 ĐV/kg: Bệnh nhân thể trạng trung bình, ĐH nhập viện 140 - 200 mg/dL.',
          '0.5 ĐV/kg: ĐH nhập viện 200 - 300 mg/dL, thể trạng tốt.',
          '0.55 - 0.6 ĐV/kg: Người đề kháng insulin nặng (Béo phì BMI ≥ 30, ĐH > 300 mg/dL hoặc đang dùng Corticoid liều cao).',
        ],
        pearls: [
          'Tẩy chay Sliding Scale đơn độc: Nghiên cứu RABBIT 2 chứng minh Sliding Scale đơn độc làm đường huyết trồi sụt, tăng biến chứng nội viện và kéo dài số ngày nằm viện.',
        ],
        reference: 'RABBIT 2 Trial & TS.BS Trần Quang Nam (BV ĐHYD TP.HCM)',
      },
    ],
  },
  {
    id: 'premixed-insulin',
    title: '3. Phác Đồ Insulin Trộn Sẵn 2 Pha (Premixed Insulin Regimen)',
    category: 'Phác Đồ Insulin',
    summary: 'Chỉ định chọn lọc, ưu nhược điểm, cách phân bổ liều 2/3 - 1/3 và quy tắc điều chỉnh liều chéo sáng/chiều.',
    content: [
      {
        subtitle: 'Chỉ định chọn lọc & Đối tượng phù hợp trong bệnh viện',
        points: [
          'Đối tượng áp dụng: Bệnh nhân ĐTĐ típ 2 nằm ngoài khu vực săn sóc đặc biệt (Non-ICU), đã ổn định lâm sàng và ăn uống đường miệng rất tốt, giờ giấc ăn cố định.',
          'Bệnh nhân trước nhập viện đã quen dùng insulin trộn và kiểm soát tốt: Có thể xem xét duy trì tiếp tục trong đợt nằm viện ngắn không có phẫu thuật phức tạp.',
          'Các chế phẩm phổ biến: Human Premix 70/30 (Mixtard 30, Humulin M3 - gồm 30% Regular + 70% NPH); Analog Premix (NovoMix 30 - 30% Aspart/70% Protamine; Humalog Mix 25 hoặc 50).',
        ],
        reference: 'TS.BS Trần Quang Nam (Khoa Nội tiết BV ĐHYD TP.HCM) & Diabetes Care 2016-2017',
      },
      {
        subtitle: 'Phân bổ liều tiêm & Thời điểm tiêm',
        points: [
          'Phân bổ kinh điển (2 mũi/ngày): Tổng liều ngày (TDD) chia thành 2/3 tổng liều tiêm vào buổi sáng (trước ăn sáng) và 1/3 tổng liều tiêm vào buổi chiều (trước ăn tối).',
          'Thời điểm tiêm: Đối với Analog Premix (NovoMix, Humalog Mix), tiêm ngay trước bữa ăn 0 - 15 phút. Đối với Human Premix (Mixtard 30), bắt buộc tiêm trước bữa ăn 30 phút.',
          'Lưu ý dinh dưỡng: Bệnh nhân BẮT BUỘC phải ăn đủ lượng tinh bột theo giờ cố định để tránh tụt đường huyết do đỉnh tác dụng kép của thuốc.',
        ],
        reference: 'VADE / iSTEP-D & Clement S et al. Diabetes Care',
      },
      {
        subtitle: 'Quy tắc chỉnh liều chéo (Chỉnh liều sáng theo ĐH chiều & ngược lại)',
        points: [
          'Chỉnh liều SÁNG: Căn cứ theo Đường huyết mao mạch TRƯỚC BỮA ĂN CHIỀU (hoặc sau ăn trưa).',
          'Chỉnh liều CHIỀU: Căn cứ theo Đường huyết mao mạch TRƯỚC BỮA ĂN SÁNG hôm sau (Fasting BG).',
          '• Nếu ĐH < 4.4 mmol/L (< 80 mg/dL): Giảm 20% liều tương ứng và xử trí hạ ĐH ngay.',
          '• Nếu ĐH 4.4 – 7.7 mmol/L (81 – 139 mg/dL): ĐẠT MỤC TIÊU - Giữ nguyên liều.',
          '• Nếu ĐH 7.8 – 9.9 mmol/L (140 – 179 mg/dL): Tăng thêm +10% liều.',
          '• Nếu ĐH 10.0 – 13.8 mmol/L (180 – 249 mg/dL): Tăng thêm +20% liều.',
          '• Nếu ĐH > 13.9 mmol/L (≥ 250 mg/dL): Tăng thêm +30% liều và rà soát yếu tố bất thường.',
        ],
        reference: 'TS.BS Trần Quang Nam (slide 38) & Robert J. Rushakoff (Endotext)',
      },
      {
        subtitle: 'Hạn chế & Cảnh báo an toàn của Insulin trộn sẵn nội viện',
        points: [
          'Cố định tỷ lệ, kém linh hoạt: Không điều chỉnh riêng rẽ được thành phần nhanh và thành phần trung gian/nền.',
          'Tăng nguy cơ hạ đường huyết: Nghiên cứu RCT của Bellido V et al. (Diabetes Care 2015) trên BN ĐTĐ típ 2 nội trú cho thấy nhóm tiêm Premixed có tỷ lệ hạ đường huyết cao hơn 50% so với nhóm Basal-Bolus, buộc thử nghiệm phải dừng sớm vì lý do an toàn.',
          'Các đỉnh tác dụng không sinh lý: Thường gây tăng ĐH sau ăn trưa (thiếu insulin cữ trưa), dễ gây hạ ĐH giữa buổi chiều hoặc nửa đêm (1h - 3h sáng do đỉnh kéo dài của liều chiều).',
          'CHỐNG CHỈ ĐỊNH: Bệnh nhân ĐTĐ típ 1, bệnh nhân nhịn ăn (NPO), ăn uống thất thường hoặc chuẩn bị mổ.',
        ],
        pearls: [
          'Khuyến cáo thực hành: Trong bệnh viện, phác đồ Basal-Bolus hoặc Basal Plus luôn là lựa chọn ưu tiên hàng đầu. Chỉ sử dụng Premix ở bệnh nhân ổn định hoàn toàn, ăn uống đều đặn và có kế hoạch duy trì ngoại trú tương tự.',
        ],
        reference: 'Bellido V et al. Diabetes Care 2015;38:2211–2216 & ADA 2026',
      },
    ],
  },
  {
    id: 'hypo-protocol',
    title: '4. Phác Đồ Xử Trí Hạ Đường Huyết (JBDS-IP 01)',
    category: 'Cấp Cứu Lâm Sàng',
    summary: 'Nguyên tắc "Make 4 the floor", quy tắc 15-20g carbohydrate nhanh và lưu ý không bao giờ bỏ insulin nền.',
    content: [
      {
        subtitle: 'Nguyên tắc cốt lõi',
        points: [
          'Định nghĩa: Hạ đường huyết khi ĐH < 4.0 mmol/L (< 70 mg/dL) - nguyên tắc "4.0 is the floor".',
          'Looming Hypoglycaemia (4.0 - 6.0 mmol/L): Nguy cơ hạ đường huyết rình rập ở bệnh nhân đang dùng insulin hoặc sulfonylurea. Cần can thiệp ăn nhẹ hoặc chỉnh giảm liều trước khi tụt dưới 4.0.',
          'Quy tắc 15-20: Cho uống ngay 15-20g đường nhanh (150-200ml nước cam, 3-4 thìa đường, hoặc 5-7 viên dextrose). Thử lại ĐH mao mạch sau 10-15 phút.',
          'Phục hồi: Khi ĐH ≥ 4.0 mmol/L, cho ăn 20g carb chậm (2 chiếc bánh quy, 1 lát sandwich hoặc cữ ăn chính) để nạp lại dự trữ glycogen.',
        ],
        reference: 'JBDS-IP 01 (Revised Jan 2023)',
      },
      {
        subtitle: 'Bệnh nhân hôn mê / Không thể uống',
        points: [
          'Dừng ngay truyền insulin tĩnh mạch nếu đang có.',
          'Truyền tĩnh mạch: 100ml Glucose 20% trong 15 phút HOẶC 200ml Glucose 10% trong 15 phút.',
          'Không có đường truyền TM: Tiêm bắp Glucagon 1mg IM (lưu ý: ít hiệu quả nếu suy dinh dưỡng nặng, xơ gan hoặc hạ ĐH do Sulfonylurea).',
          'Không dùng Glucose 50% ngoại vi: Do ưu trương mạnh gây viêm tĩnh mạch hoại tử mô nếu chệch ven (JBDS chỉ khuyến cáo nồng độ 10% hoặc 20%).',
        ],
        pearls: [
          'QUY TẮC SỐNG CÒN: Tuyệt đối KHÔNG bỏ liều insulin nền tiếp theo sau cơn hạ đường huyết (chỉ xem xét giảm 20% liều). Bỏ insulin nền ở bệnh nhân ĐTĐ típ 1 sẽ kích hoạt toan ceton DKA gây tử vong.',
        ],
        reference: 'JBDS-IP 01 & TREND Diabetes UK',
      },
    ],
  },
  {
    id: 'dka-hhs',
    title: '5. Cấp Cứu Toan Ceton (DKA) & Tăng Áp Lực Thẩm Thấu (HHS)',
    category: 'Cấp Cứu Lâm Sàng',
    summary: 'Chẩn đoán phân biệt, phác đồ bù dịch NaCl 0.9%, kiểm soát Kali và chỉ định truyền Glucose 10%.',
    content: [
      {
        subtitle: 'Phân biệt DKA và HHS',
        points: [
          'DKA: ĐH > 11 mmol/L (hoặc bình thường nếu do SGLT2i), Ceton máu ≥ 3.0 mmol/L, toan chuyển hóa pH < 7.3 hoặc HCO3 < 15 mmol/L.',
          'HHS: ĐH cực cao ≥ 30 mmol/L (≥ 600 mg/dL), ALTT hiệu dụng ≥ 320 mOsm/kg, Ceton máu < 3.0 mmol/L, pH ≥ 7.3.',
          'Bù dịch DKA/HHS: NaCl 0.9% 1000ml trong 1 giờ đầu (500ml nếu tụt HA). Giờ 2-3: 1000ml/2h; Giờ 4-5: 1000ml/2h; Giờ 6-9: 1000ml/4h.',
        ],
        reference: 'JBDS-IP 02 (2023) & JBDS-IP 06 (2022)',
      },
      {
        subtitle: 'Quy tắc bù Kali & Mốc ĐH < 14 mmol/L (< 250 mg/dL)',
        points: [
          'K+ < 3.5 mmol/L: TẠM HOÃN INSULIN, khẩn trương bù Kali trước để phòng ngừng tim.',
          'K+ 3.5 - 5.5 mmol/L: Pha 40 mmol KCl vào mỗi lít dịch truyền.',
          'K+ > 5.5 mmol/L: Không pha Kali, thử lại điện giải mỗi 2 giờ.',
          'Mốc ĐH < 14 mmol/L (< 250 mg/dL): BẮT BUỘC bắt đầu truyền Glucose 10% 125 ml/h song song NaCl 0.9% và giảm tốc độ insulin tĩnh mạch FRIII từ 0.1 xuống 0.05 ĐV/kg/h.',
        ],
        reference: 'JBDS-IP Single Page Pathway for DKA',
      },
    ],
  },
  {
    id: 'special-cases',
    title: '6. Các Tình Huống Lâm Sàng Đặc Thù (Corticoid, Chu Phẫu, Chạy Thận)',
    category: 'Tình Huống Đặc Thù',
    summary: 'Hướng dẫn cụ thể cho bệnh nhân dùng glucocorticoid, chuẩn bị phẫu thuật, chạy thận nhân tạo và lọc màng bụng.',
    content: [
      {
        subtitle: 'Tăng đường huyết do Corticoid (Glucocorticoid)',
        points: [
          'Đặc tính: ĐH tăng vọt từ trưa đến tối, sáng sớm hôm sau ĐH đói gần bình thường.',
          'Xử trí: Ưu tiên Insulin NPH tiêm cùng lúc buổi sáng với steroid (đỉnh 4-6h trùng đỉnh tăng ĐH của prednisolone). Hoặc tăng liều nhanh bữa trưa/tối thêm 20-40%.',
          'Cai liều steroid: Phải chủ động giảm 20-25% liều insulin song song với mỗi nấc hạ liều steroid để tránh tụt đường huyết.',
        ],
        reference: 'JBDS-IP 08 (Jan 2023)',
      },
      {
        subtitle: 'Chu phẫu & Phẫu thuật (Perioperative)',
        points: [
          'SGLT2i: Ngừng trước phẫu thuật 3 - 4 ngày (Ertugliflozin 4 ngày) để tránh toan ceton euglycaemic.',
          'Metformin: Ngừng vào ngày mổ nếu có chụp cản quang hoặc eGFR < 60.',
          'Giảm liều nền tối trước mổ: Tiêm 75 - 80% liều nền thông thường.',
          'Nhịn ăn > 1 bữa: Chỉ định truyền tĩnh mạch VRIII song song dịch truyền cơ chất chứa glucose.',
        ],
        reference: 'CPOC & JBDS-IP 2022',
      },
      {
        subtitle: 'Chạy thận nhân tạo (mHDx) & Lọc màng bụng (PD)',
        points: [
          'Chạy thận nhân tạo: Giảm 25% liều insulin vào ngày lọc máu chu kỳ. Cực tiểu ĐH rơi vào giờ thứ 3 của ca lọc.',
          'Ăn nhẹ trước lọc: Nếu ĐH trước lọc máu < 7.0 mmol/L, cho ăn 20-30g carb chậm đầu ca lọc (tránh nước cam vì thừa Kali).',
          'Lọc màng bụng với Icodextrin: TUYỆT ĐỐI CẤM dùng máy đo que thử men GDH-PQQ vì maltose gây dương tính giả dẫn đến sốc hạ đường huyết tử vong.',
        ],
        reference: 'JBDS-IP 11 (March 2023)',
      },
    ],
  },
  {
    id: 'discharge',
    title: '7. Kế Hoạch Ra Viện & Chuyển Đổi Về Ngoại Trú (JBDS-IP 10)',
    category: 'Kế Hoạch Ra Viện',
    summary: 'Thuật toán điều chỉnh thuốc lúc xuất viện theo HbA1c và quy tắc an toàn bệnh nhân.',
    content: [
      {
        subtitle: 'Thuật toán điều chỉnh thuốc lúc xuất viện (Umpierrez et al.)',
        points: [
          'HbA1c < 7.0%: Quay lại phác đồ điều trị ngoại trú trước nhập viện (thuốc viên hoặc insulin cũ).',
          'HbA1c 7.0% - 9.0%: Phối hợp thuốc viên ngoại trú + 50% liều insulin nền khi nằm viện.',
          'HbA1c > 9.0%: Phối hợp thuốc viên + 80% liều insulin nền nằm viện HOẶC tiếp tục phác đồ Basal-Bolus ngoại trú.',
        ],
        reference: 'Umpierrez GE et al. Diabetes Care 2014 & JBDS-IP 10',
      },
      {
        subtitle: 'Checklist an toàn trước khi xuất viện',
        points: [
          'Cấp phát đủ thuốc và vật tư tiêu hao ít nhất 7 - 14 ngày (bút tiêm, kim lấy thuốc, que thử đường/ceton).',
          'Hướng dẫn kỹ năng sống còn: Nhận biết dấu hiệu hạ đường huyết và quy tắc xử trí cấp cứu 15-20.',
          'Quy tắc ngày ốm (Sick-day rules): Bệnh nhân ĐTĐ típ 1 không được ngưng insulin khi ốm sốt; uống đủ nước và đo ceton máu/nước tiểu.',
          'Hẹn tái khám trong vòng 1 - 2 tuần nếu có thay đổi phác đồ insulin trong đợt nằm viện.',
        ],
        reference: 'JBDS-IP 10 (March 2023) Discharge Planning',
      },
    ],
  },
];

export const GuidelinesTab: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string>('targets');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSections = KNOWLEDGE_SECTIONS.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Knowledge Header Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cẩm Nang Kiến Thức Lâm Sàng CDSS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Hướng Dẫn & Phác Đồ Điều Trị Đái Tháo Đường Nội Viện
          </h2>
          <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
            Hệ thống hóa toàn bộ các khuyến cáo lâm sàng thực hành từ <strong>ADA Standards of Care 2026</strong>, 
            bộ hướng dẫn của <strong>JBDS-IP (Joint British Diabetes Societies)</strong>, 
            và giáo trình điều trị nội viện của <strong>TS.BS Trần Quang Nam (Khoa Nội tiết BV ĐHYD TP.HCM)</strong>.
          </p>
        </div>
        <Sparkles className="absolute -bottom-6 -right-6 w-40 h-40 text-white/5 pointer-events-none" />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm kiến thức: mục tiêu ĐH, DKA, Basal-Bolus, Corticoid, chạy thận, cấp cứu hạ ĐH..."
          className="w-full pl-4 pr-10 py-3 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <BookOpen className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
      </div>

      {/* Accordion Sections List */}
      <div className="space-y-4">
        {filteredSections.map((section) => {
          const isExpanded = expandedSection === section.id;
          return (
            <div
              key={section.id}
              className={`rounded-2xl border transition overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-slate-800/90 border-teal-500/50 shadow-md ring-1 ring-teal-500/20'
                  : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setExpandedSection(isExpanded ? '' : section.id)}
                className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      {section.category}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {section.summary}
                  </p>
                </div>
                <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 mt-1 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-6">
                  {section.content.map((block, idx) => (
                    <div key={idx} className="space-y-3">
                      {block.subtitle && (
                        <h4 className="text-xs sm:text-sm font-bold text-teal-700 dark:text-teal-300 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                          <span>{block.subtitle}</span>
                        </h4>
                      )}

                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-2">
                        {block.points.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>

                      {block.pearls && (
                        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                          <span className="font-bold flex items-center space-x-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Điểm then chốt lâm sàng (Clinical Pearl):</span>
                          </span>
                          {block.pearls.map((prl, prIdx) => (
                            <p key={prIdx} className="leading-relaxed font-medium">{prl}</p>
                          ))}
                        </div>
                      )}

                      <div className="text-[11px] text-slate-400 pt-1">
                        <em>Nguồn tài liệu: {block.reference}</em>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
