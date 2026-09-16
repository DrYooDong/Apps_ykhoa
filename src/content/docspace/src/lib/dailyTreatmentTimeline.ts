/**
 * Daily Treatment Timeline Module — DocSpace Step 4 Protocol
 * Lộ trình điều trị chi tiết từng ngày, gom nhóm các ngày có điều trị tương tự thành các giai đoạn lâm sàng EBM
 */

export interface TreatmentItem {
  category: string;
  content: string;
  isHighlighted?: boolean;
}

export interface MonitoringItem {
  metric: string;
  frequency: string;
  target?: string;
}

export interface DailyTreatmentPhase {
  id: string;
  dayRange: string;
  phaseName: string;
  clinicalGoal: string;
  treatments: TreatmentItem[];
  monitoring: MonitoringItem[];
  cautionsAndDischarge: {
    cautions: string[];
    triageOrDischargeCriteria?: string;
  };
}

/**
 * Trích xuất lộ trình điều trị chi tiết từng ngày theo bệnh học
 */
export function getDailyTreatmentTimeline(
  diseaseId: string,
  diseaseName: string,
  _activeSeverityGrade?: any,
  phacDo?: any
): DailyTreatmentPhase[] {
  const idLower = diseaseId.toLowerCase();
  const nameLower = diseaseName.toLowerCase();

  // 1. SỐT XUẤT HUYẾT DENGUE
  if (idLower.includes('dengue') || nameLower.includes('dengue') || nameLower.includes('sốt xuất huyết')) {
    return [
      {
        id: 'dengue_phase_1',
        dayRange: 'Ngày 1 - 3',
        phaseName: 'Giai đoạn Sốt cấp tính (Febrile Phase)',
        clinicalGoal: 'Hạ sốt an toàn, bù nước điện giải sớm đường uống, kiểm soát thân nhiệt và phát hiện cơ địa nguy cơ cao.',
        treatments: [
          {
            category: 'Hạ sốt',
            content: 'Paracetamol đơn chất 10 - 15 mg/kg/lần khi sốt >= 38.5°C, cách mỗi 4-6h. Tối đa 60 mg/kg/24h (người lớn tối đa 3g/ngày).',
            isHighlighted: true,
          },
          {
            category: 'Dịch truyền / Bù nước',
            content: 'Bù nước điện giải đường uống sớm: Dung dịch Oresol pha chuẩn 1500 - 2500 mL/ngày, nước hoa quả (cam, dừa), nước cháo muối. KHÔNG truyền dịch tĩnh mạch bừa bãi khi người bệnh còn uống được.',
          },
          {
            category: 'Dinh dưỡng & Nghỉ ngơi',
            content: 'Nghỉ ngơi tuyệt đối tại giường, ăn thức ăn lỏng mềm dễ tiêu, tránh thức ăn/nước uống có màu đỏ, đen, nâu để tránh nhầm với xuất huyết tiêu hóa.',
          },
        ],
        monitoring: [
          { metric: 'Thân nhiệt & Tri giác', frequency: 'Mỗi 4 giờ', target: 'Hạ sốt an toàn, tỉnh táo' },
          { metric: 'Công thức máu (Hct, Tiểu cầu, Bạch cầu)', frequency: 'Mỗi 24 giờ', target: 'Hct cơ bản, theo dõi tiểu cầu' },
          { metric: 'Lượng nước tiểu 24h', frequency: 'Mỗi 4-6 giờ', target: 'Đảm bảo >= 1.0 mL/kg/h' },
          { metric: 'Kháng nguyên NS1 Ag', frequency: 'Làm 1 lần (Ngày 1-5)', target: 'Khẳng định căn nguyên Dengue' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH: Aspirin, Ibuprofen, Diclofenac và các NSAIDs khác vì gây xuất huyết tiêu hóa nặng và toan máu.',
            'KHÔNG dùng Corticoid, KHÔNG dùng kháng sinh khi chưa có bằng chứng đồng nhiễm khuẩn.',
            'CẤM cạo gió, cắt lễ, giác hơi gây xuất huyết khó cầm dưới da.',
          ],
          triageOrDischargeCriteria: 'Tái khám định kỳ mỗi ngày tại phòng khám; Dặn dò người bệnh và thân nhân 7 Dấu hiệu cảnh báo nguy hiểm.',
        },
      },
      {
        id: 'dengue_phase_2',
        dayRange: 'Ngày 4 - 6',
        phaseName: 'Giai đoạn Nguy hiểm & Thoát huyết tương (Critical Phase)',
        clinicalGoal: 'Nhận diện sớm Dấu hiệu cảnh báo (DHCB) và Sốc Dengue; Hồi sức dịch tĩnh mạch nấc bậc thang kịp thời; Kiểm soát Hct 38-42% và MAP >= 65 mmHg.',
        treatments: [
          {
            category: 'Dịch truyền bậc thang (Nếu có DHCB)',
            content: 'Ringer Lactate / Acetate bậc thang: 6-7 mL/kg/h (1-3h) -> 5 mL/kg/h (2-4h) -> 3 mL/kg/h (2-4h) -> 1.5 mL/kg/h rồi ngưng. Đánh giá Hct trước và sau mỗi nấc dịch.',
            isHighlighted: true,
          },
          {
            category: 'Hồi sức chống Sốc (Nếu có Sốc)',
            content: 'Xả Ringer Lactate 15-20 mL/kg/h trong 1h đầu. Nếu không ra sốc hoặc Hct còn cao -> chuyển Dung dịch cao phân tử (Dextran 40 / HES 6% 200/0.5) 10-15 mL/kg/h.',
            isHighlighted: true,
          },
          {
            category: 'Hô hấp & Cấp cứu',
            content: 'Thở oxy qua gọng kính 2-4 L/p nếu SpO2 < 95% hoặc thở nhanh co kéo; Đặt đường truyền TM lớn (G18-G20).',
          },
        ],
        monitoring: [
          { metric: 'Sinh hiệu, Mạch, HA, Hiệu áp', frequency: 'Mỗi 15-30p (sốc) hoặc 1-2h (DHCB)', target: 'Hiệu áp > 20 mmHg (an toàn >= 30), M rõ' },
          { metric: 'Hematocrit (Hct)', frequency: 'Trước & sau mỗi nấc dịch (1-2h)', target: 'Hct giảm ổn định về 38-42%' },
          { metric: 'Siêu âm bụng / ngực', frequency: 'Mỗi 12-24 giờ', target: 'Đánh giá tràn dịch màng phổi, báng bụng' },
          { metric: 'Nước tiểu qua thông Foley', frequency: 'Mỗi 1 giờ', target: 'Duy trì >= 0.5 - 1.0 mL/kg/h' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Cảnh giác khi nhiệt độ hạ đột ngột nhưng người bệnh mệt lả, li bì -> Đây là thời điểm bắt đầu vào Sốc.',
            'Tổng thời gian truyền dịch tĩnh mạch thường KHÔNG quá 24-48 giờ.',
            'Không truyền tiểu cầu dự phòng nếu Tiểu cầu > 50 G/L và không có xuất huyết nặng trên lâm sàng.',
          ],
          triageOrDischargeCriteria: 'Nhập viện 100% tại Khoa Truyền nhiễm hoặc Hồi sức tích cực (ICU); Không điều trị ngoại trú trong giai đoạn này.',
        },
      },
      {
        id: 'dengue_phase_3',
        dayRange: 'Ngày 7 - 10',
        phaseName: 'Giai đoạn Hồi phục & Tái hấp thu (Recovery Phase)',
        clinicalGoal: 'Ngăn ngừa biến chứng quá tải dịch / Phù phổi cấp do tái hấp thu dịch; Đánh giá tiêu chuẩn xuất viện an toàn.',
        treatments: [
          {
            category: 'Dịch truyền',
            content: 'NGƯNG truyền dịch tĩnh mạch hoàn toàn khi lâm sàng ổn định, người bệnh uống được và tiểu tốt.',
            isHighlighted: true,
          },
          {
            category: 'Dinh dưỡng',
            content: 'Cho ăn cháo, súp lỏng giàu dinh dưỡng, uống nước lọc hoặc nước hoa quả theo nhu cầu tự nhiên.',
          },
          {
            category: 'Xử trí quá tải (nếu có)',
            content: 'Nếu có dấu hiệu thở nhanh, ran ẩm đáy phổi, SpO2 giảm do quá tải dịch: Ngưng dịch ngay, thở oxy, cân nhắc Furosemide 1 mg/kg IV chậm khi huyết động ổn định.',
          },
        ],
        monitoring: [
          { metric: 'Công thức máu (Hct, Tiểu cầu)', frequency: 'Mỗi 24 giờ', target: 'Tiểu cầu tăng dần (> 50 G/L), Hct ổn định' },
          { metric: 'Dấu hiệu sinh tồn', frequency: 'Mỗi 8-12 giờ', target: 'Mạch chậm dần (nhịp chậm hồi phục), HA ổn định' },
          { metric: 'Ban hồi phục (Convalescent Rash)', frequency: 'Quan sát hàng ngày', target: 'Ban đỏ viền trắng đảo da bình thường' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Hiện tượng tái hấp thu dịch ồ ạt từ khoang màng phổi/bụng vào lòng mạch -> Rất dễ gây phù phổi cấp nếu tiếp tục truyền dịch.',
            'Hiện tượng nhịp tim chậm sinh lý (Vagotonic bradycardia) trong giai đoạn hồi phục là lành tính, không cần can thiệp Atropine nếu HA bình thường.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn ra viện: Hết sốt >= 48h không dùng thuốc hạ sốt, tỉnh táo, ăn ngon miệng, huyết động ổn định, tiểu nhiều, Tiểu cầu > 50 G/L và Hct bình thường.',
        },
      },
    ];
  }

  // 2. SỐT RÉT (MALARIA)
  if (idLower.includes('sot_ret') || nameLower.includes('sốt rét') || nameLower.includes('malaria')) {
    return [
      {
        id: 'malaria_phase_1',
        dayRange: 'Ngày 1',
        phaseName: 'Giai đoạn Khởi đầu & Cắt cơn sốt cấp (Initial Phase)',
        clinicalGoal: 'Cắt nhanh cơn sốt cấp tính, tiêu diệt thể vô tính KSTSR trong máu; Nếu ác tính: Cứu sống, kiểm soát toan máu và hạ đường huyết.',
        treatments: [
          {
            category: 'Thuốc diệt KSTSR (Không biến chứng)',
            content: 'CV Artecan (Dihydroartemisinin 40mg + Piperaquine 320mg): Người lớn uống 4 viên liều ngày 1 (chia 2 lần cách nhau 6-8h, sau ăn).',
            isHighlighted: true,
          },
          {
            category: 'Thuốc tiêm cấp cứu (Nếu Sốt rét ác tính)',
            content: 'Artesunat tiêm tĩnh mạch hoặc tiêm bắp: 2.4 mg/kg tại thời điểm 0h và 12h. Hòa tan bột với 1ml NaHCO3 5% rồi pha với 5ml NaCl 0.9%.',
            isHighlighted: true,
          },
          {
            category: 'Hạ sốt & Hỗ trợ',
            content: 'Paracetamol 500mg uống khi sốt >= 38.5°C; Truyền Glucose 10-20% dự phòng và điều trị hạ đường huyết.',
          },
        ],
        monitoring: [
          { metric: 'Lam máu nhuộm Giemsa', frequency: 'Mỗi 12-24 giờ', target: 'Đếm mật độ KSTSR thể vô tính' },
          { metric: 'Đường huyết mao mạch', frequency: 'Mỗi 4-6 giờ', target: 'Duy trì Glucose >= 4.0 mmol/L' },
          { metric: 'Tri giác, Mạch, HA, Nhịp thở', frequency: 'Mỗi 2-4 giờ', target: 'Phát hiện sớm thể não / toan máu' },
          { metric: 'Nước tiểu 24h & Màu sắc', frequency: 'Liên tục', target: 'Loại trừ tiểu huyết cầu tố (đái huyết sắc tố)' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Hạ đường huyết là biến chứng cực kỳ nguy hiểm và âm thầm ở bệnh nhân sốt rét nặng (đặc biệt khi dùng Quinin).',
            'Truyền dịch vừa đủ duy trì huyết động, tránh truyền dịch ồ ạt gây phù phổi cấp thể sốt rét.',
          ],
          triageOrDischargeCriteria: 'Thể thông thường điều trị theo dõi nội trú/ngoại trú chặt chẽ; Thể ác tính bắt buộc nằm ICU/Hồi sức.',
        },
      },
      {
        id: 'malaria_phase_2',
        dayRange: 'Ngày 2 - 3',
        phaseName: 'Giai đoạn Tấn công duy trì & Đánh giá đáp ứng (Maintenance Phase)',
        clinicalGoal: 'Quét sạch hoàn toàn thể vô tính KSTSR trong máu, cắt sốt dứt điểm và phục hồi sinh hiệu.',
        treatments: [
          {
            category: 'Thuốc diệt KSTSR',
            content: 'CV Artecan: Ngày 2 uống 4 viên (1 lần), Ngày 3 uống 4 viên (1 lần); Hoặc tiếp tục Artesunat TM 2.4 mg/kg/24h đến khi uống được thì chuyển sang phác đồ ACT 3 ngày.',
            isHighlighted: true,
          },
          {
            category: 'Bù dịch & Dinh dưỡng',
            content: 'Ăn uống bồi dưỡng, uống nhiều nước; Bù sắt và acid folic nếu có thiếu máu kèm theo.',
          },
        ],
        monitoring: [
          { metric: 'Lam máu Giemsa ngày 3', frequency: 'Ngày thứ 3', target: 'Mật độ KSTSR giảm >= 75% hoặc âm tính' },
          { metric: 'Công thức máu, Men gan, Creatinine', frequency: 'Mỗi 48 giờ', target: 'Đánh giá phục hồi tạng' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Nếu sau 48-72h mật độ KSTSR không giảm hoặc tăng lên -> Báo động sốt rét kháng thuốc, hội chẩn đổi phác đồ bậc 2 ngay.',
          ],
          triageOrDischargeCriteria: 'Bệnh nhân cắt sốt, tỉnh táo, ăn uống được, lam máu sạch KSTSR thể vô tính.',
        },
      },
      {
        id: 'malaria_phase_3',
        dayRange: 'Ngày 4 - 14',
        phaseName: 'Giai đoạn Diệt thể giao bào & Thể ngủ ở gan (Anti-relapse Phase)',
        clinicalGoal: 'Diệt thể giao bào chống lây lan dịch tễ (P. falciparum) và diệt thể ngủ trong gan chống tái phát xa (P. vivax / P. ovale).',
        treatments: [
          {
            category: 'Diệt thể giao bào P. falciparum',
            content: 'Primaquine liều duy nhất 0.25 mg base/kg uống vào ngày thứ 4 của đợt điều trị.',
            isHighlighted: true,
          },
          {
            category: 'Diệt thể ngủ P. vivax / P. ovale',
            content: 'Primaquine 0.25 mg base/kg/ngày x 14 ngày liên tục sau khi đã hoàn thành đợt thuốc 3 ngày đầu (phải kiểm tra G6PD trước khi dùng).',
            isHighlighted: true,
          },
        ],
        monitoring: [
          { metric: 'Màu sắc nước tiểu hàng ngày', frequency: 'Mỗi ngày', target: 'Phát hiện sớm đái huyết sắc tố do tan máu' },
          { metric: 'Công thức máu (Hb, Hct)', frequency: 'Sau 7 và 14 ngày', target: 'Đảm bảo không tụt Hb do thuốc' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH Primaquine cho: Phụ nữ có thai, trẻ em dưới 6 tháng tuổi và người thiếu men G6PD nặng.',
            'Dặn người bệnh nếu thấy nước tiểu chuyển màu nâu đỏ hoặc đen như nước vối phải ngừng thuốc và tái khám ngay.',
          ],
          triageOrDischargeCriteria: 'Hoàn thành đợt điều trị nội trú, chuyển ngoại trú uống đủ 14 ngày Primaquine kèm sổ theo dõi dịch tễ.',
        },
      },
    ];
  }

  // 3. VIÊM PHỔI MẮC PHẢI CỘNG ĐỒNG (CAP)
  if (idLower.includes('phoi') || nameLower.includes('phổi') || nameLower.includes('pneumonia')) {
    return [
      {
        id: 'cap_phase_1',
        dayRange: 'Ngày 1 (Giờ 0 - 24)',
        phaseName: 'Giai đoạn Giờ vàng & Kháng sinh ban đầu (Initial Golden Hours)',
        clinicalGoal: 'Khởi động kháng sinh đích sớm trong <= 4h; Đảm bảo thông khí và oxy hóa máu SpO2 >= 95%; Cấy đờm/máu trước liều KS đầu.',
        treatments: [
          {
            category: 'Kháng sinh bậc 1',
            content: 'Nội trú: Ceftriaxone 1-2g IV/ngày phối hợp Azithromycin 500mg PO/ngày (hoặc Amox/Clav 1.2g IV x 3 lần/ngày). Ngoại trú: Amox/Clav 1g (875/125mg) x 2 lần/ngày PO.',
            isHighlighted: true,
          },
          {
            category: 'Hô hấp & Oxy',
            content: 'Thở oxy qua gọng mũi 2-4 L/p nếu SpO2 < 95% (mục tiêu 94-98%; 88-92% nếu có COPD nền). Khí dung giãn phế quản Salbutamol nếu có co thắt.',
          },
          {
            category: 'Hạ sốt & Bù dịch',
            content: 'Paracetamol 500mg uống khi sốt >= 38.5°C; Bù dịch NaCl 0.9% hoặc Ringer Lactate duy trì đường truyền.',
          },
        ],
        monitoring: [
          { metric: 'SpO2, Nhịp thở, Co kéo cơ hô hấp', frequency: 'Mỗi 2-4 giờ', target: 'SpO2 >= 95%, nhịp thở <= 22 l/p' },
          { metric: 'X-quang ngực thẳng & CTM, CRP', frequency: 'Tại thời điểm nhập viện', target: 'Đánh giá thâm nhiễm, BC, CRP cơ bản' },
          { metric: 'Phân tầng CURB-65', frequency: 'Đánh giá lúc tiếp nhận', target: 'Xác định điều trị ngoại trú, nội trú hay ICU' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Lấy mẫu đờm và cấy máu trước khi tiêm liều kháng sinh đầu tiên nhưng không được làm chậm trễ KS quá 4 giờ.',
            'Cảnh giác biến chứng suy hô hấp cấp tiến triển / ARDS trong 24 giờ đầu.',
          ],
          triageOrDischargeCriteria: 'CURB-65: 0-1 (Ngoại trú); 2 (Nội trú khoa thường); >= 3 (Cân nhắc ICU).',
        },
      },
      {
        id: 'cap_phase_2',
        dayRange: 'Ngày 2 - 3 (48 - 72h)',
        phaseName: 'Giai đoạn Đánh giá đáp ứng lâm sàng (Response Evaluation)',
        clinicalGoal: 'Đánh giá đáp ứng kháng sinh (cắt sốt, giảm khó thở, bạch cầu giảm); Tránh đổi kháng sinh vội vàng nếu lâm sàng đang cải thiện.',
        treatments: [
          {
            category: 'Kháng sinh',
            content: 'Tiếp tục phác đồ kháng sinh ban đầu. Nếu hết sốt > 24h, sinh hiệu ổn định và uống được -> Cân nhắc chuyển sang kháng sinh đường uống (Step-down switch).',
            isHighlighted: true,
          },
          {
            category: 'Vật lý trị liệu hô hấp',
            content: 'Vỗ rung dẫn lưu tư thế, tập ho có kiểm soát, khuyến khích bệnh nhân ngồi dậy vận động nhẹ để làm sạch dịch phế quản.',
          },
        ],
        monitoring: [
          { metric: 'Nhiệt độ, Mạch, HA, Nhịp thở', frequency: 'Mỗi 6-8 giờ', target: 'Hạ thân nhiệt về bình thường' },
          { metric: 'Xét nghiệm kiểm tra: CTM, CRP/PCT', frequency: 'Sau 48-72 giờ', target: 'Bạch cầu và CRP giảm >= 50%' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Nếu sau 72h sốt dai dẳng hoặc xấu đi -> Chụp lại X-quang ngực, siêu âm màng phổi loại trừ biến chứng tràn dịch mủ cận viêm, áp xe hóa hoặc kháng thuốc.',
          ],
          triageOrDischargeCriteria: 'Khi đạt tiêu chuẩn ổn định lâm sàng (Hết sốt, Mạch < 100, NT < 24, SpO2 >= 95%), chuẩn bị chuyển về ngoại trú.',
        },
      },
      {
        id: 'cap_phase_3',
        dayRange: 'Ngày 4 - 7',
        phaseName: 'Giai đoạn Hoàn tất liệu trình & Xuất viện (Discharge & Recovery)',
        clinicalGoal: 'Hoàn thành đủ liệu trình kháng sinh 5-7 ngày; Phục hồi chức năng hô hấp; Tiêu chuẩn ra viện an toàn.',
        treatments: [
          {
            category: 'Kháng sinh uống',
            content: 'Uống đủ liệu trình kháng sinh ngoại trú (Amox/Clav hoặc Levofloxacin) tổng cộng 5-7 ngày.',
            isHighlighted: true,
          },
          {
            category: 'Phòng ngừa',
            content: 'Tư vấn tiêm phòng vaccine phế cầu (PCV13/PPSV23) và cúm mùa hàng năm; Tư vấn cai thuốc lá.',
          },
        ],
        monitoring: [
          { metric: 'Khám lâm sàng toàn diện', frequency: 'Trước khi xuất viện', target: 'Phổi sạch hoặc ran giảm rõ rệt' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Tổn thương hình ảnh học trên X-quang phổi có thể thoái lui chậm hơn lâm sàng từ 4-8 tuần.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn xuất viện: Nhiệt độ bình thường >= 48h, ăn uống được, có khả năng tự dùng thuốc tại nhà. Hẹn tái khám sau 1-2 tuần.',
        },
      },
    ];
  }

  // 4. BỆNH LÝ CHUNG (DEFAULT TIMELINE TRÍCH XUẤT TỪ PHACDO)
  const defaultMed = phacDo?.thuoc?.[0] ? `${phacDo.thuoc[0][0]}: ${phacDo.thuoc[0][1]} (${phacDo.thuoc[0][2]})` : 'Áp dụng thuốc điều trị chính theo phác đồ';
  const defaultStep = phacDo?.tuyen?.[0] || 'Kiểm soát đường thở, hô hấp và tuần hoàn ban đầu';

  return [
    {
      id: 'general_phase_1',
      dayRange: 'Ngày 1 - 2',
      phaseName: 'Giai đoạn Khởi đầu & Cấp tính (Acute Initiation)',
      clinicalGoal: 'Ổn định huyết động, kiểm soát triệu chứng cấp tính và khởi động điều trị đích theo phác đồ bậc 1.',
      treatments: [
        {
          category: 'Can thiệp ưu tiên',
          content: defaultStep,
          isHighlighted: true,
        },
        {
          category: 'Thuốc điều trị bậc 1',
          content: defaultMed,
          isHighlighted: true,
        },
        {
          category: 'Chăm sóc & Dịch truyền',
          content: 'Nghỉ ngơi tại giường, thiết lập đường truyền tĩnh mạch duy trì nếu có chỉ định; Điều trị triệu chứng (giảm đau, hạ sốt).',
        },
      ],
      monitoring: [
        { metric: 'Dấu hiệu sinh tồn (Mạch, HA, SpO2, Thở)', frequency: 'Mỗi 2-4 giờ', target: 'Sinh hiệu trong giới hạn an toàn' },
        { metric: 'Xét nghiệm ban đầu', frequency: 'Tại thời điểm tiếp nhận', target: 'Đánh giá chức năng gan, thận, điện giải' },
      ],
      cautionsAndDischarge: {
        cautions: [
          'Thận trọng với cơ địa người cao tuổi, phụ nữ có thai hoặc có bệnh lý suy tim, suy thận nền.',
          'Báo bác sĩ ngay khi sinh hiệu dao động bất thường hoặc xuất hiện dấu hiệu cảnh báo.',
        ],
        triageOrDischargeCriteria: 'Theo dõi sát tại khoa điều trị, chưa có chỉ định xuất viện trong giai đoạn cấp.',
      },
    },
    {
      id: 'general_phase_2',
      dayRange: 'Ngày 3 - 5',
      phaseName: 'Giai đoạn Tấn công duy trì & Đánh giá đáp ứng (Maintenance & Response)',
      clinicalGoal: 'Tối ưu hóa liều điều trị theo đáp ứng lâm sàng; Bắt đầu giảm dần can thiệp xâm lấn và chuyển sang đường uống.',
      treatments: [
        {
          category: 'Thuốc duy trì',
          content: 'Tiếp tục phác đồ thuốc đã chỉ định; Cân nhắc chuyển sang thuốc đường uống khi người bệnh dung nạp tốt.',
          isHighlighted: true,
        },
        {
          category: 'Dinh dưỡng & Vận động',
          content: 'Khuyến khích ăn uống dinh dưỡng đường miệng; Bắt đầu ngồi dậy và vận động nhẹ nhàng tại giường.',
        },
      ],
      monitoring: [
        { metric: 'Sinh hiệu & Khám lâm sàng', frequency: 'Mỗi 8-12 giờ', target: 'Các triệu chứng cơ năng cải thiện rõ rệt' },
        { metric: 'Xét nghiệm cận lâm sàng kiểm tra', frequency: 'Sau 48-72 giờ', target: 'Các chỉ số bất thường có xu hướng thoái lui' },
      ],
      cautionsAndDischarge: {
        cautions: [
          'Đánh giá tương tác thuốc và tác dụng phụ của các thuốc đang dùng.',
        ],
        triageOrDischargeCriteria: 'Nếu đáp ứng kém hoặc xấu đi: Hội chẩn chuyên khoa hoặc nâng bậc điều trị theo phác đồ.',
      },
    },
    {
      id: 'general_phase_3',
      dayRange: 'Ngày 6 trở đi',
      phaseName: 'Giai đoạn Hồi phục & Kế hoạch xuất viện (Recovery & Discharge)',
      clinicalGoal: 'Đảm bảo đạt tiêu chuẩn xuất viện an toàn; Thiết lập đơn thuốc ngoại trú và hướng dẫn phòng ngừa tái phát.',
      treatments: [
        {
          category: 'Đơn thuốc ngoại trú',
          content: 'Chuyển toàn bộ sang thuốc uống điều trị duy trì tại nhà theo đơn xuất viện.',
          isHighlighted: true,
        },
        {
          category: 'Phục hồi & Dặn dò',
          content: 'Hướng dẫn chế độ ăn uống, sinh hoạt, tập luyện phục hồi và hẹn lịch tái khám định kỳ.',
        },
      ],
      monitoring: [
        { metric: 'Khám tổng quát trước ra viện', frequency: 'Ngày xuất viện', target: 'Đạt đầy đủ tiêu chuẩn ra viện an toàn' },
      ],
      cautionsAndDischarge: {
        cautions: [
          'Dặn dò các dấu hiệu đỏ (Red Flags) cần quay lại viện cấp cứu ngay lập tức.',
        ],
        triageOrDischargeCriteria: 'Tiêu chuẩn xuất viện: Sinh hiệu ổn định >= 48h, hết triệu chứng cấp tính, tự sinh hoạt bình thường.',
      },
    },
  ];
}
