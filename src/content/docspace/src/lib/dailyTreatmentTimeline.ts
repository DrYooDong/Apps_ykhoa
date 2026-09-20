/**
 * Daily Treatment Timeline Module — DocSpace Step 4 Protocol
 * Lộ trình điều trị chi tiết từng ngày, gom nhóm các ngày có điều trị tương tự thành các giai đoạn lâm sàng EBM
 * Chuẩn hóa 3 cột: Giai đoạn & Mục tiêu + Y lệnh + Theo dõi: Lâm sàng (LS) & Cận lâm sàng (CLS)
 * Tách biệt Lưu ý & CCĐ và Tiêu chuẩn ra viện / chuyển tầng để đưa vào Mục 6
 * Văn phong súc tích, chuẩn ký hiệu và viết tắt y khoa thực chiến
 */

export interface TreatmentItem {
  category: string;
  content: string;
  isHighlighted?: boolean;
}

export interface MonitoringItem {
  type: 'LS' | 'CLS';
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

export type DailyTimelinePhase = DailyTreatmentPhase;

/**
 * Trích xuất lộ trình điều trị chi tiết từng ngày theo bệnh học
 */
export function getDailyTreatmentTimeline(
  diseaseId: string,
  diseaseName: string,
  _activeSeverityGrade?: any,
  phacDo?: any
): DailyTreatmentPhase[] {
  // Ưu tiên nạp trực tiếp timelinePhases nếu đã được cấu hình trong phacDo hoặc enriched JSON
  if (phacDo?.timelinePhases && Array.isArray(phacDo.timelinePhases) && phacDo.timelinePhases.length > 0) {
    return phacDo.timelinePhases;
  }
  if (phacDo?.protocol?.timelinePhases && Array.isArray(phacDo.protocol.timelinePhases) && phacDo.protocol.timelinePhases.length > 0) {
    return phacDo.protocol.timelinePhases;
  }

  const idLower = (diseaseId || '').toLowerCase();
  const nameLower = (diseaseName || '').toLowerCase();

  // 1. SỐT XUẤT HUYẾT DENGUE (SXHD)
  if (idLower.includes('dengue') || nameLower.includes('dengue') || nameLower.includes('sốt xuất huyết')) {
    return [
      {
        id: 'dengue_phase_1',
        dayRange: 'N1 - N3',
        phaseName: 'Giai đoạn Sốt cấp tính (Febrile Phase)',
        clinicalGoal: 'Hạ sốt an toàn, bù nước-điện giải sớm PO, KS thân nhiệt, phát hiện sớm cơ địa nguy cơ cao.',
        treatments: [
          {
            category: 'Hạ sốt',
            content: 'Paracetamol 10-15 mg/kg khi T° ≥ 38.5°C, q4-6h (max 60 mg/kg/24h, NL max 3g/d).',
            isHighlighted: true,
          },
          {
            category: 'Bù dịch PO',
            content: 'Oresol pha chuẩn 1500-2500 mL/d + nước hoa quả/cháo muối. KTTM khi còn uống được.',
          },
          {
            category: 'Chăm sóc',
            content: 'Nghỉ ngơi tại giường, ăn lỏng dễ tiêu. Tránh thức ăn/nước uống màu đỏ, nâu, đen (tránh nhầm XHTH).',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'T° & Tri giác', frequency: 'q4h', target: 'Hạ sốt an toàn, tỉnh táo' },
          { type: 'LS', metric: 'Nước tiểu 24h', frequency: 'q4-6h', target: 'Đảm bảo ≥ 1.0 mL/kg/h' },
          { type: 'CLS', metric: 'CTM (Hct, TC, BC)', frequency: 'q24h', target: 'Hct nền, theo dõi TC' },
          { type: 'CLS', metric: 'NS1 Ag (ELISA/Test nhanh)', frequency: '1 lần (N1-N5)', target: 'Xác định căn nguyên Dengue' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'CCĐ TUYỆT ĐỐI: Aspirin, Ibuprofen & các NSAIDs (nguy cơ XHTH nặng, toan máu).',
            'KHÔNG dùng Corticoid; KHÔNG dùng KS khi chưa có bằng chứng đồng nhiễm khuẩn.',
            'CẤM cạo gió, cắt lễ, giác hơi (nguy cơ xuất huyết khó cầm).',
          ],
          triageOrDischargeCriteria: 'Tái khám q24h tại PK; Dặn dò người bệnh & thân nhân theo dõi sát 7 DHCB nguy hiểm.',
        },
      },
      {
        id: 'dengue_phase_2',
        dayRange: 'N4 - N6',
        phaseName: 'Giai đoạn Nguy hiểm & Thoát huyết tương (Critical Phase)',
        clinicalGoal: 'Phát hiện sớm DHCB & Sốc Dengue; Hồi sức dịch TTM nấc thang; Duy trì Hct 38-42%, MAP ≥ 65 mmHg.',
        treatments: [
          {
            category: 'Dịch truyền bậc thang (Có DHCB)',
            content: 'RL / RA bậc thang: 6-7 mL/kg/h (1-3h) → 5 mL/kg/h (2-4h) → 3 mL/kg/h (2-4h) → 1.5 mL/kg/h rồi ngưng. ĐG Hct trước & sau mỗi nấc dịch.',
            isHighlighted: true,
          },
          {
            category: 'Hồi sức chống Sốc (Nếu vào Sốc)',
            content: 'RL xả nhanh 15-20 mL/kg/h (1h đầu). K ra sốc/Hct tăng → CPT (Dextran 40 / HES 6% 200/0.5) 10-15 mL/kg/h.',
            isHighlighted: true,
          },
          {
            category: 'Hô hấp & Cấp cứu',
            content: 'O2 gọng kính 2-4 L/p nếu SpO2 < 95% hoặc thở co kéo. Lập 1-2 ĐTTM lớn (G18-G20). Đặt thông tiểu theo dõi.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Sinh hiệu, M, HA, Hiệu áp', frequency: 'q15-30p (Sốc) / q1-2h (DHCB)', target: 'Hiệu áp > 20 mmHg (an toàn ≥ 30), M rõ' },
          { type: 'LS', metric: 'Nước tiểu qua thông Foley', frequency: 'q1h', target: 'Duy trì ≥ 0.5 - 1.0 mL/kg/h' },
          { type: 'CLS', metric: 'Hematocrit (Hct)', frequency: 'Trước & sau mỗi nấc dịch (q1-2h)', target: 'Hct giảm ổn định về 38-42%' },
          { type: 'CLS', metric: 'Siêu âm ngực / bụng', frequency: 'q12-24h', target: 'ĐG tràn dịch màng phổi, báng bụng' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Cảnh giác khi T° hạ đột ngột nhưng mệt lả, li bì, tay chân lạnh → Thời điểm bắt đầu vào Sốc.',
            'Tổng thời gian truyền dịch TM thường KHÔNG quá 24-48 giờ.',
            'K truyền TC dự phòng nếu TC > 50 G/L và không có xuất huyết nặng trên LS.',
          ],
          triageOrDischargeCriteria: 'Nhập viện 100% tại Khoa Truyền nhiễm hoặc ICU; Tuyệt đối không điều trị ngoại trú.',
        },
      },
      {
        id: 'dengue_phase_3',
        dayRange: 'N7 - N10',
        phaseName: 'Giai đoạn Hồi phục & Tái hấp thu (Recovery Phase)',
        clinicalGoal: 'Ngăn ngừa biến chứng quá tải dịch / Phù phổi cấp do tái hấp thu; Đánh giá tiêu chuẩn xuất viện.',
        treatments: [
          {
            category: 'Dịch truyền',
            content: 'NGƯNG TTM hoàn toàn khi LS ổn định, uống được và tiểu tốt.',
            isHighlighted: true,
          },
          {
            category: 'Dinh dưỡng',
            content: 'Ăn cháo, súp giàu dinh dưỡng; Uống nước lọc/nước quả theo nhu cầu tự nhiên.',
          },
          {
            category: 'Xử trí quá tải dịch (nếu có)',
            content: 'Nếu thở nhanh, ran ẩm đáy phổi, SpO2 tụt do quá tải: Ngưng dịch ngay, thở O2, Furosemide 1 mg/kg IV chậm khi huyết động ổn định.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Dấu hiệu sinh tồn', frequency: 'q8-12h', target: 'M chậm dần (nhịp chậm hồi phục), HA ổn' },
          { type: 'LS', metric: 'Ban hồi phục (Convalescent Rash)', frequency: 'Quan sát hàng ngày', target: 'Ban đỏ viền trắng đảo da bình thường' },
          { type: 'CLS', metric: 'CTM (Hct, Tiểu cầu)', frequency: 'q24h', target: 'TC tăng dần (> 50 G/L), Hct ổn định' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Hiện tượng tái hấp thu dịch ồ ạt từ khoang màng phổi/bụng vào lòng mạch → Nguy cơ phù phổi cấp nếu tiếp tục truyền dịch.',
            'Nhịp tim chậm sinh lý giai đoạn hồi phục là lành tính, không can thiệp Atropine nếu HA bình thường.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn ra viện: Hết sốt ≥ 48h K dùng hạ sốt, tỉnh táo, ăn ngon, huyết động ổn định, tiểu nhiều, TC > 50 G/L & Hct bình thường.',
        },
      },
    ];
  }

  // 2. VIÊM MÀNG NÃO (BACTERIAL / VIRAL MENINGITIS)
  if (
    idLower.includes('mang_nao') ||
    idLower.includes('meningitis') ||
    nameLower.includes('màng não') ||
    nameLower.includes('meningitis')
  ) {
    return [
      {
        id: 'meningitis_phase_1',
        dayRange: 'N1 - N2',
        phaseName: 'Giai đoạn Cấp tính & Giờ vàng Hồi sức (Acute Golden Hours)',
        clinicalGoal: 'KS thấm qua HBRN sớm trong ≤ 1h; Dexamethasone trước liều KS đầu; Kiểm soát ALNS và chống phù não.',
        treatments: [
          {
            category: 'Kháng sinh kinh nghiệm',
            content: 'Ceftriaxone 2g IV q12h (hoặc Cefotaxime 2g IV q4-6h) + Vancomycin 15-20 mg/kg IV q8-12h (trough 15-20 mcg/mL). Thêm Ampicillin 2g IV q4h nếu > 50t hoặc SGMD (Listeria).',
            isHighlighted: true,
          },
          {
            category: 'Corticoid chống viêm',
            content: 'Dexamethasone 10mg IV (0.15 mg/kg) tiêm trước 15-20p hoặc cùng lúc với liều KS đầu, lặp lại q6h x 4 ngày.',
            isHighlighted: true,
          },
          {
            category: 'Hồi sức & Chống phù não',
            content: 'Kê đầu cao 30°; Mannitol 20% 0.5-1 g/kg IV nhanh 15-30p nếu có tam chứng Cushing hoặc phù gai thị. Hạn chế dịch (2/3 nhu cầu nếu có SIADH).',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Tri giác (GCS/AVPU) & Đồng tử', frequency: 'q1-2h', target: 'Phát hiện sớm tụt kẹt não, co giật' },
          { type: 'LS', metric: 'Hội chứng màng não & Tam chứng Cushing', frequency: 'q2-4h', target: 'M, HA, Nhịp thở, cứng gáy' },
          { type: 'CLS', metric: 'Xét nghiệm DNT toàn diện', frequency: 'Ngay khi tiếp nhận', target: 'Soi Gram, PCR mầm bệnh, cấy, đạm/đường' },
          { type: 'CLS', metric: 'Cấy máu 2 vị trí & CTM, CRP, PCT', frequency: 'Trước liều KS đầu', target: 'Khẳng định căn nguyên nhiễm khuẩn huyết' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'TUYỆT ĐỐI KHÔNG trì hoãn tiêm KS quá 60 phút để chờ chụp CT hoặc chọc dò DNT.',
            'CCĐ chọc dò DNT khi: Nhiễm trùng tại vị trí chọc, rối loạn đông máu nặng (INR > 1.5, TC < 50 G/L), tụt kẹt não đe dọa.',
            'Cách ly giọt bắn đường hô hấp trong 24h đầu nếu nghi Não mô cầu (N. meningitidis).',
          ],
          triageOrDischargeCriteria: 'Bắt buộc điều trị nội trú tại ICU hoặc Khoa Hồi sức / Nhiễm; Không điều trị ngoại trú giai đoạn cấp.',
        },
      },
      {
        id: 'meningitis_phase_2',
        dayRange: 'N3 - N7',
        phaseName: 'Giai đoạn Đích vi sinh & Củng cố (Microbial Targeted Phase)',
        clinicalGoal: 'Điều chỉnh KS đích theo KSĐ và PCR DNT; Ngưng Dexamethasone sau 4 ngày; Đánh giá đáp ứng lâm sàng & thần kinh.',
        treatments: [
          {
            category: 'Kháng sinh đích',
            content: 'Xuống thang theo KSĐ: Phế cầu nhạy Penicillin → Penicillin G / Ceftriaxone đơn độc; Não mô cầu → Ceftriaxone / Penicillin G; Ngưng Vancomycin nếu cấy âm tính.',
            isHighlighted: true,
          },
          {
            category: 'Phục hồi chức năng',
            content: 'Dinh dưỡng đường ruột sớm qua sonde dạ dày nếu hôn mê; Tập xoay trở chống loét tì đè q2h; Vật lý trị liệu hô hấp.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Dấu hiệu thần kinh định vị & Co giật', frequency: 'q6-8h', target: 'Phát hiện liệt dây sọ, tắc mạch não' },
          { type: 'CLS', metric: 'Chọc DNT kiểm tra (nếu đáp ứng chậm)', frequency: 'Sau 48-72h', target: 'DNT trong dần, tế bào & protein thoái lui' },
          { type: 'CLS', metric: 'CT/MRI não (nếu tri giác xấu đi)', frequency: 'Khi có chỉ định', target: 'Loại trừ ổ tụ mủ dưới màng cứng, não úng thủy' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Nếu sau 48h sốt dai dẳng hoặc tri giác không cải thiện → Chụp CT/MRI sọ não khẩn loại trừ tụ mủ dưới màng cứng hoặc viêm tắc xoang tĩnh mạch.',
          ],
          triageOrDischargeCriteria: 'Chuyển tầng khoa thường khi: GCS 15đ, cắt sốt > 48h, hết co giật, huyết động ổn định.',
        },
      },
      {
        id: 'meningitis_phase_3',
        dayRange: 'N8 - N14 (đến N21)',
        phaseName: 'Giai đoạn Hoàn tất liệu trình & Đánh giá di chứng (Completion Phase)',
        clinicalGoal: 'Hoàn thành đủ đợt KS tĩnh mạch (Não mô cầu 7d, Phế cầu 10-14d, Listeria 21d); Đánh giá thính lực & di chứng vận động.',
        treatments: [
          {
            category: 'Kháng sinh hoàn tất',
            content: 'Duy trì đủ số ngày KS tĩnh mạch theo đúng chủng vi khuẩn gây bệnh; Tuyệt đối không chuyển KS uống.',
            isHighlighted: true,
          },
          {
            category: 'Đánh giá chuyên khoa',
            content: 'Khám thính lực đồ tầm soát điếc sau viêm màng não (đặc biệt ở trẻ em); Khám mắt đánh giá teo gai thị.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Khám thần kinh toàn diện', frequency: 'Trước xuất viện', target: 'Không di chứng vận động hoặc thính lực' },
          { type: 'CLS', metric: 'CTM, CRP, DNT (nếu cần)', frequency: 'Trước kết thúc KS', target: 'Các chỉ số viêm về hoàn toàn bình thường' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Theo dõi nguy cơ điếc tiếp nhận thứ phát sau viêm màng não phế cầu, cần đo thính lực trước khi xuất viện.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn ra viện: Hoàn thành đủ liệu trình KS, hết sốt ≥ 3 ngày, tri giác tỉnh táo hoàn toàn, ăn uống tự chủ, không dấu màng não.',
        },
      },
    ];
  }

  // 3. THỦY ĐẬU (VARICELLA / CHICKENPOX)
  if (
    idLower.includes('thuy_dau') ||
    idLower.includes('thuy-dau') ||
    idLower.includes('varicella') ||
    idLower.includes('chickenpox') ||
    nameLower.includes('thủy đậu') ||
    nameLower.includes('varicella') ||
    nameLower.includes('chickenpox') ||
    nameLower.includes('vzv')
  ) {
    return [
      {
        id: 'varicella_phase_1',
        dayRange: 'N1 - N3',
        phaseName: 'Giai đoạn Phát ban mụn nước cấp (Eruptive Phase)',
        clinicalGoal: 'Ức chế virus VZV trong ≤ 24-72h đầu; Hạ sốt an toàn; Chống ngứa, chăm sóc da chống bội nhiễm tụ cầu/liên cầu.',
        treatments: [
          {
            category: 'Kháng virus đặc hiệu',
            content: 'Acyclovir 800mg PO x 5 lần/d (cách mỗi 4h) x 7 ngày (khởi động sớm ≤ 72h). Trẻ em: 20 mg/kg/lần (max 800mg) x 4 lần/d. Nếu thể nặng/SGMD: Acyclovir 10-15 mg/kg IV q8h.',
            isHighlighted: true,
          },
          {
            category: 'Hạ sốt an toàn',
            content: 'Paracetamol 10-15 mg/kg PO khi T° ≥ 38.5°C q4-6h (max 60 mg/kg/24h).',
          },
          {
            category: 'Chống ngứa & Chăm sóc da',
            content: 'Loratadine 10mg PO qd (hoặc Cetirizine 10mg PO qd); Chấm Xanh Methylen 1% lên nốt mụn nước vỡ; Vệ sinh da nhẹ nhàng, cắt ngắn móng tay.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Hình thái nốt đậu & Bội nhiễm da', frequency: 'q12h', target: 'Mụn nước trong, không có quầng đỏ lan rộng' },
          { type: 'LS', metric: 'Hô hấp & SpO2', frequency: 'q8h', target: 'Phát hiện sớm viêm phổi thủy đậu (ho, thở nhanh)' },
          { type: 'CLS', metric: 'CTM & Men gan (AST, ALT)', frequency: 'Lúc nhập viện', target: 'BC bình thường/tăng nhẹ, men gan cơ bản' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'CCĐ TUYỆT ĐỐI Aspirin ở trẻ bị thủy đậu vì nguy cơ Hội chứng Reye tử vong cao.',
            'KHÔNG dùng Corticoid toàn thân vì làm bùng phát nhiễm trùng VZV lan tỏa đe dọa sinh mạng.',
            'Cách ly phòng riêng thoáng khí cho đến khi TOÀN BỘ nốt đậu đóng vảy khô hoàn toàn.',
          ],
          triageOrDischargeCriteria: 'Thể nhẹ điều trị ngoại trú cách ly tại nhà; Nhập viện ngay nếu: Phụ nữ mang thai, SGMD, trẻ sơ sinh, hoặc có sốt cao kèm khó thở/lơ mơ.',
        },
      },
      {
        id: 'varicella_phase_2',
        dayRange: 'N4 - N7',
        phaseName: 'Giai đoạn Đóng vảy & Phòng ngừa bội nhiễm (Crusting Phase)',
        clinicalGoal: 'Uống đủ 7 ngày Acyclovir; Phát hiện và điều trị kịp thời bội nhiễm da hoặc biến chứng viêm tiểu não.',
        treatments: [
          {
            category: 'Kháng virus duy trì',
            content: 'Tiếp tục Acyclovir đủ liệu trình 7 ngày liên tục.',
            isHighlighted: true,
          },
          {
            category: 'Kháng sinh bội nhiễm (nếu có)',
            content: 'Nếu nốt mụn có mủ đục: Bôi Axit Fusidic (Fucidin) tại chỗ; Nếu bội nhiễm lan tỏa: Thêm Amox/Clav 1g PO bid hoặc Cefuroxime 500mg PO bid.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Tỷ lệ nốt đóng vảy khô', frequency: 'Hàng ngày', target: 'Nốt đậu khô dần, không mọc thêm mụn mới' },
          { type: 'LS', metric: 'Khám dáng đi & Thần kinh', frequency: 'q24h', target: 'Loại trừ viêm tiểu não hậu thủy đậu (thất điều, run)' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Không gãi, cào xước làm vỡ nốt đậu sớm gây nhiễm trùng sâu và để lại sẹo lõm vĩnh viễn.',
          ],
          triageOrDischargeCriteria: 'Bệnh nhân hết sốt, các nốt đậu cũ đã se miệng đóng mày, không xuất hiện tổn thương mới trong 48h.',
        },
      },
      {
        id: 'varicella_phase_3',
        dayRange: 'N8 trở đi',
        phaseName: 'Giai đoạn Hồi phục & Kết thúc cách ly (Recovery & Discharge)',
        clinicalGoal: 'Bong vảy hoàn toàn; Chăm sóc liền sẹo; Kết thúc thời gian cách ly dịch tễ an toàn.',
        treatments: [
          {
            category: 'Chăm sóc da',
            content: 'Bôi kem dưỡng ẩm, kem mờ sẹo; Tránh ánh nắng mặt trời trực tiếp lên vùng da non.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Khám da toàn thân trước ra viện', frequency: 'Ngày kết thúc', target: '100% nốt đậu đã đóng vảy khô hoặc bong' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Người bệnh chỉ hết lây lan khi tất cả các nốt mụn nước đã khô và đóng mày hoàn toàn.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn kết thúc cách ly & ra viện: 100% tổn thương da đã đóng mày khô, hết sốt ≥ 72h, sinh hoạt bình thường.',
        },
      },
    ];
  }

  // 4. VIÊM GAN SIÊU VI B (HEPATITIS B - HBV)
  if (
    idLower.includes('viem_gan_b') ||
    idLower.includes('viem-gan-vi-rut-b') ||
    idLower.includes('vgsv_b') ||
    idLower.includes('hbv') ||
    (idLower.includes('gan') && idLower.includes('b')) ||
    nameLower.includes('viêm gan b') ||
    nameLower.includes('viêm gan siêu vi b') ||
    (nameLower.includes('viêm gan') && (nameLower.includes(' b') || nameLower.includes('vi rút b'))) ||
    nameLower.includes('hepatitis b')
  ) {
    return [
      {
        id: 'hbv_phase_1',
        dayRange: 'Tuần 1 - 2 (Đợt bùng phát cấp)',
        phaseName: 'Giai đoạn Cấp tính & Khởi động NUCs (Acute Flare Phase)',
        clinicalGoal: 'Ức chế nhân lên HBV nhanh; Đánh giá suy chức năng gan (Bilirubin, INR); Dự phòng / xử trí bệnh não gan.',
        treatments: [
          {
            category: 'Thuốc kháng virus NUCs',
            content: 'Tenofovir Alafenamide (TAF) 25mg PO qd (ưu tiên nếu > 60t, suy thận nhẹ/loãng xương); Hoặc TDF 300mg PO qd; Hoặc Entecavir (ETV) 0.5mg PO qd (uống lúc đói cách bữa ăn 2h).',
            isHighlighted: true,
          },
          {
            category: 'Hỗ trợ tế bào gan',
            content: 'L-Ornithine L-Aspartate (LOLA) truyền hoặc uống; Bổ sung Vitamin K1 10mg tiêm bắp nếu INR kéo dài > 1.3.',
          },
          {
            category: 'Chế độ ăn & Nghỉ ngơi',
            content: 'Nghỉ ngơi tuyệt đối tại giường; Ăn lỏng dễ tiêu, giàu đạm thực vật, chia nhiều bữa nhỏ; Kiêng rượu bia 100%.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Vàng da, vàng mắt & Tri giác', frequency: 'Hàng ngày', target: 'Loại trừ tiền hôn mê gan (Flapping tremor)' },
          { type: 'CLS', metric: 'ALT, AST, Bilirubin TP/TT', frequency: 'q3-5d', target: 'Theo dõi đỉnh men gan và tốc độ thoái lui' },
          { type: 'CLS', metric: 'Đông máu toàn bộ (PT, INR)', frequency: 'q3d', target: 'INR < 1.3 (chỉ số sống còn suy gan cấp)' },
          { type: 'CLS', metric: 'Tải lượng HBV-DNA & HBeAg', frequency: 'Baseline', target: 'Đánh giá mức độ nhân lên của virus' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'TUYỆT ĐỐI KHÔNG tự ý ngưng NUCs đột ngột vì có thể kích hoạt đợt viêm gan bùng phát kịch phát tử vong.',
            'Cảnh giác suy gan tối cấp khi INR > 1.5 kèm Bilirubin tăng vọt và rối loạn tri giác → Hội chẩn ghép gan khẩn.',
            'Tránh dùng các thuốc gây độc gan (Paracetamol > 2g/d, NSAIDs, thuốc nam/thuốc bắc không rõ nguồn gốc).',
          ],
          triageOrDischargeCriteria: 'Nhập viện theo dõi nội trú khi: ALT > 10 lần GHBT, Bilirubin > 5 mg/dL hoặc INR > 1.3; Chuyển ICU nếu có bệnh não gan.',
        },
      },
      {
        id: 'hbv_phase_2',
        dayRange: 'Tháng 1 - 3',
        phaseName: 'Giai đoạn Tấn công duy trì & Đánh giá đáp ứng (Response Evaluation)',
        clinicalGoal: 'Bình thường hóa men gan; Tải lượng HBV-DNA giảm ≥ 2 log10 sau 3 tháng; Cải thiện thể trạng.',
        treatments: [
          {
            category: 'Thuốc NUCs duy trì',
            content: 'Uống thuốc kháng virus đều đặn vào 1 giờ cố định mỗi ngày, đảm bảo tuân thủ điều trị tuyệt đối.',
            isHighlighted: true,
          },
          {
            category: 'Lối sống & Dinh dưỡng',
            content: 'Tăng cường rau xanh, trái cây; Tập thể dục nhẹ nhàng khi men gan về < 2 lần GHBT; Tư vấn tiêm phòng Viêm gan A.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Mức độ mệt mỏi & Ăn uống', frequency: 'Mỗi lần tái khám', target: 'Ăn ngon miệng, hết mệt mỏi' },
          { type: 'CLS', metric: 'Men gan AST, ALT & Creatinine/eGFR', frequency: 'q1 tháng', target: 'ALT/AST giảm ổn định về bình thường' },
          { type: 'CLS', metric: 'Đo tải lượng HBV-DNA (Tháng 3)', frequency: 'Sau 3 tháng', target: 'HBV-DNA giảm > 2 log hoặc dưới ngưỡng' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Theo dõi chức năng thận (Creatinine, eGFR) và Phosphat máu định kỳ khi dùng TDF kéo dài.',
          ],
          triageOrDischargeCriteria: 'Chuyển về quản lý ngoại trú tại PK chuyên khoa khi: Hết vàng da, men gan giảm > 50%, INR bình thường, ăn uống tự chủ.',
        },
      },
      {
        id: 'hbv_phase_3',
        dayRange: 'Dài hạn (q6 tháng)',
        phaseName: 'Giai đoạn Duy trì dài hạn & Tầm soát HCC (HCC Surveillance)',
        clinicalGoal: 'Duy trì HBV-DNA dưới ngưỡng phát hiện; Tầm soát sớm ung thư biểu mô tế bào gan (HCC).',
        treatments: [
          {
            category: 'Thuốc ức chế virus dài hạn',
            content: 'Tiếp tục NUCs liên tục (hầu hết điều trị nhiều năm hoặc suốt đời); Tư vấn tầm soát HBsAg cho người thân (vợ/chồng, con).',
            isHighlighted: true,
          },
        ],
        monitoring: [
          { type: 'CLS', metric: 'Siêu âm bụng + AFP (Alpha-fetoprotein)', frequency: 'q6 tháng', target: 'Tầm soát sớm khối u gan (HCC)' },
          { type: 'CLS', metric: 'HBV-DNA & HBeAg / Anti-HBe', frequency: 'q6-12 tháng', target: 'Duy trì dưới ngưỡng, chuyển đảo HBeAg' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Bệnh nhân xơ gan hoặc có nguy cơ cao vẫn phải tầm soát HCC bằng Siêu âm + AFP mỗi 6 tháng dù HBV-DNA đã âm tính.',
          ],
          triageOrDischargeCriteria: 'Quản lý ngoại trú định kỳ tại Phòng khám Viêm gan; Cấp thuốc NUCs theo chương trình BHYT.',
        },
      },
    ];
  }

  // 5. VIÊM GAN SIÊU VI C (HEPATITIS C - HCV)
  if (
    idLower.includes('viem_gan_c') ||
    idLower.includes('viem-gan-vi-rut-c') ||
    idLower.includes('vgsv_c') ||
    idLower.includes('hcv') ||
    (idLower.includes('gan') && idLower.includes('c')) ||
    nameLower.includes('viêm gan c') ||
    nameLower.includes('viêm gan siêu vi c') ||
    (nameLower.includes('viêm gan') && (nameLower.includes(' c') || nameLower.includes('vi rút c'))) ||
    nameLower.includes('hepatitis c')
  ) {
    return [
      {
        id: 'hcv_phase_1',
        dayRange: 'Tuần 1 - 4',
        phaseName: 'Giai đoạn Khởi đầu Phác đồ DAA Pan-genotypic (DAA Induction)',
        clinicalGoal: 'Khởi động DAA thế hệ mới pangenotypic (khỏi > 95-98%); Rà soát tương tác thuốc (DDI); Sàng lọc bùng phát HBV.',
        treatments: [
          {
            category: 'Phác đồ DAA Pan-genotypic',
            content: 'Sofosbuvir/Velpatasvir (400/100mg): 1 viên PO qd x 12 tuần (uống cùng hoặc không cùng thức ăn); Hoặc Glecaprevir/Pibrentasvir (100/40mg): 3 viên PO qd kèm thức ăn x 8 tuần (chưa xơ gan).',
            isHighlighted: true,
          },
          {
            category: 'Điều chỉnh DDI',
            content: 'Rà soát tương tác: Tránh dùng chung PPI (nếu cần: uống DAA trước PPI 4h); CCĐ phối hợp Amiodarone, Carbamazepine, St. John\'s Wort.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Khám dung nạp thuốc & Tri giác', frequency: 'Tuần 2 & Tuần 4', target: 'Dung nạp tốt, không buồn nôn, đau đầu' },
          { type: 'CLS', metric: 'HCV-RNA Baseline & Men gan AST/ALT', frequency: 'Thời điểm bắt đầu', target: 'Xác định nồng độ virus nền' },
          { type: 'CLS', metric: 'Sàng lọc HBsAg, Anti-HBc, Anti-HIV', frequency: 'Trước liều DAA đầu', target: 'Loại trừ nguy cơ bùng phát HBV' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'CCĐ TUYỆT ĐỐI phối hợp Sofosbuvir với Amiodarone vì nguy cơ chậm nhịp tim nặng gây ngừng tim.',
            'Thận trọng tương tác PPI (Omeprazole, Pantoprazole) làm giảm mạnh hấp thu Velpatasvir.',
            'Bắt buộc kiểm tra HBsAg vì HCV bị tiêu diệt có thể làm bùng phát viêm gan B đồng nhiễm.',
          ],
          triageOrDischargeCriteria: 'Điều trị ngoại trú 100% đối với thể thông thường; Tái khám định kỳ nhận thuốc DAA hàng tháng.',
        },
      },
      {
        id: 'hcv_phase_2',
        dayRange: 'Tuần 5 - 12',
        phaseName: 'Giai đoạn Tấn công duy trì & Hoàn tất liệu trình DAA (Consolidation Phase)',
        clinicalGoal: 'Duy trì tuân thủ thuốc 100%; Đạt đáp ứng virus hoàn toàn cuối đợt điều trị (EOTR).',
        treatments: [
          {
            category: 'Thuốc DAA duy trì',
            content: 'Uống DAA đúng giờ mỗi ngày, tuyệt đối không quên liều hoặc tự ý ngưng thuốc giữa chừng.',
            isHighlighted: true,
          },
        ],
        monitoring: [
          { type: 'CLS', metric: 'AST, ALT, Creatinine máu', frequency: 'Tuần thứ 4 & Tuần 12', target: 'Men gan trở về giới hạn bình thường' },
          { type: 'CLS', metric: 'HCV-RNA cuối đợt điều trị (Tuần 12)', frequency: 'Thời điểm kết thúc thuốc', target: 'HCV-RNA âm tính dưới ngưỡng phát hiện' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Dặn dò người bệnh không uống rượu bia và không dùng các thuốc nam độc cho gan.',
          ],
          triageOrDischargeCriteria: 'Hoàn thành đủ 8 hoặc 12 tuần DAA; Chuyển sang giai đoạn chờ xét nghiệm khẳng định SVR12.',
        },
      },
      {
        id: 'hcv_phase_3',
        dayRange: 'Sau ngưng DAA 12 tuần',
        phaseName: 'Giai đoạn Đánh giá Khỏi bệnh Bền vững (SVR12 Evaluation)',
        clinicalGoal: 'Khẳng định khỏi bệnh hoàn toàn (SVR12); Kế hoạch tầm soát HCC nếu có xơ hóa gan F3-F4.',
        treatments: [
          {
            category: 'Tư vấn phòng ngừa tái nhiễm',
            content: 'HCV không tạo miễn dịch suốt đời; Dặn dò tránh nguy cơ tái nhiễm (quan hệ an toàn, không xăm mình/tiêm chích chung).',
          },
        ],
        monitoring: [
          { type: 'CLS', metric: 'HCV-RNA đo tải lượng (Mốc SVR12)', frequency: 'Sau kết thúc DAA 12 tuần', target: 'HCV-RNA không phát hiện → KHỎI BỆNH' },
          { type: 'CLS', metric: 'Siêu âm gan + AFP (Nếu có xơ hóa F3-F4)', frequency: 'q6 tháng suốt đời', target: 'Tầm soát HCC dù đã sạch virus' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Bệnh nhân có xơ gan F4 vẫn phải tầm soát HCC định kỳ mỗi 6 tháng suốt đời dù đã đạt SVR12.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn khỏi bệnh hoàn toàn: Đạt SVR12 (HCV-RNA âm tính sau 12 tuần ngưng DAA); Kết thúc phác đồ.',
        },
      },
    ];
  }

  // 6. SỐT RÉT (MALARIA)
  if (
    idLower.includes('sot_ret') ||
    idLower.includes('sot-ret') ||
    idLower.includes('malaria') ||
    nameLower.includes('sốt rét') ||
    nameLower.includes('malaria') ||
    nameLower.includes('plasmodium')
  ) {
    return [
      {
        id: 'malaria_phase_1',
        dayRange: 'N1',
        phaseName: 'Giai đoạn Khởi đầu & Cắt cơn sốt cấp (Initial Phase)',
        clinicalGoal: 'Cắt nhanh cơn sốt cấp, diệt thể vô tính KSTSR; Nếu ác tính: Cấp cứu chống toan máu & hạ ĐH.',
        treatments: [
          {
            category: 'Thuốc diệt KSTSR (Thể thường)',
            content: 'CV Artecan (DHA 40mg + PPQ 320mg): NL uống 4 viên liều N1 (chia 2 lần cách nhau 6-8h, sau ăn).',
            isHighlighted: true,
          },
          {
            category: 'Thuốc tiêm cấp cứu (Ác tính)',
            content: 'Artesunat IV/IM: 2.4 mg/kg tại thời điểm 0h và 12h (hòa tan bột với 1ml NaHCO3 5% + 5ml NaCl 0.9%).',
            isHighlighted: true,
          },
          {
            category: 'Hỗ trợ',
            content: 'Paracetamol 500mg PO khi T° ≥ 38.5°C; Truyền Glucose 10-20% dự phòng & điều trị hạ đường huyết.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Tri giác, M, HA, Nhịp thở', frequency: 'q2-4h', target: 'Phát hiện sớm thể não / toan máu' },
          { type: 'LS', metric: 'Nước tiểu & Màu sắc', frequency: 'Liên tục', target: 'Loại trừ đái huyết sắc tố' },
          { type: 'CLS', metric: 'Đường huyết mao mạch', frequency: 'q4-6h', target: 'Duy trì Glucose ≥ 4.0 mmol/L' },
          { type: 'CLS', metric: 'Lam máu nhuộm Giemsa', frequency: 'q12-24h', target: 'Đếm mật độ KSTSR thể vô tính' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Hạ đường huyết là biến chứng cực kỳ nguy hiểm, âm thầm ở sốt rét nặng (đặc biệt khi dùng Quinin).',
            'Truyền dịch vừa đủ duy trì huyết động, tránh truyền dịch ồ ạt gây phù phổi cấp thể sốt rét.',
          ],
          triageOrDischargeCriteria: 'Thể thông thường theo dõi nội/ngoại trú chặt chẽ; Thể ác tính bắt buộc nằm ICU.',
        },
      },
      {
        id: 'malaria_phase_2',
        dayRange: 'N2 - N3',
        phaseName: 'Giai đoạn Tấn công duy trì & Đánh giá đáp ứng (Maintenance Phase)',
        clinicalGoal: 'Quét sạch thể vô tính KSTSR trong máu, cắt sốt dứt điểm, phục hồi chức năng tạng.',
        treatments: [
          {
            category: 'Thuốc diệt KSTSR',
            content: 'CV Artecan: N2 uống 4 viên (1 lần), N3 uống 4 viên (1 lần); Hoặc Artesunat IV 2.4 mg/kg/d đến khi uống được thì chuyển ACT 3 ngày.',
            isHighlighted: true,
          },
          {
            category: 'Dinh dưỡng & Bù dịch',
            content: 'Ăn uống bồi dưỡng, uống nhiều nước; Bù sắt & acid folic nếu có thiếu máu kèm theo.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Sinh hiệu & Cắt cơn sốt', frequency: 'q6-8h', target: 'Hết sốt, tri giác phục hồi tốt' },
          { type: 'CLS', metric: 'Lam máu Giemsa N3', frequency: 'Ngày thứ 3', target: 'Mật độ KSTSR giảm ≥ 75% hoặc âm tính' },
          { type: 'CLS', metric: 'CTM, Men gan, Creatinine', frequency: 'q48h', target: 'Đánh giá phục hồi tạng' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Nếu sau 48-72h mật độ KSTSR không giảm hoặc tăng → Báo động sốt rét kháng thuốc, hội chẩn đổi phác đồ bậc 2 ngay.',
          ],
          triageOrDischargeCriteria: 'Cắt sốt, tỉnh táo, ăn uống được, lam máu sạch KSTSR thể vô tính.',
        },
      },
      {
        id: 'malaria_phase_3',
        dayRange: 'N4 - N14',
        phaseName: 'Giai đoạn Diệt thể giao bào & Thể ngủ ở gan (Anti-relapse Phase)',
        clinicalGoal: 'Diệt thể giao bào chống lây lan dịch tễ (P. falciparum); Diệt thể ngủ trong gan chống tái phát (P. vivax/ovale).',
        treatments: [
          {
            category: 'Diệt thể giao bào (P. falciparum)',
            content: 'Primaquine liều duy nhất 0.25 mg base/kg PO vào ngày thứ 4 của đợt điều trị.',
            isHighlighted: true,
          },
          {
            category: 'Diệt thể ngủ (P. vivax / ovale)',
            content: 'Primaquine 0.25 mg base/kg/d x 14 ngày liên tục sau khi hết đợt thuốc 3 ngày (kiểm tra G6PD trước dùng).',
            isHighlighted: true,
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Màu sắc nước tiểu hàng ngày', frequency: 'Hàng ngày', target: 'Phát hiện sớm đái huyết sắc tố do tan máu' },
          { type: 'CLS', metric: 'CTM (Hb, Hct)', frequency: 'Sau 7 & 14 ngày', target: 'Đảm bảo không tụt Hb do thuốc' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'CCĐ TUYỆT ĐỐI Primaquine: Phụ nữ có thai, trẻ < 6 tháng tuổi và người thiếu men G6PD nặng.',
            'Dặn người bệnh nếu nước tiểu chuyển màu nâu đỏ hoặc đen như nước vối phải ngừng thuốc và tái khám ngay.',
          ],
          triageOrDischargeCriteria: 'Hoàn thành đợt điều trị nội trú, chuyển ngoại trú uống đủ 14 ngày Primaquine kèm sổ theo dõi dịch tễ.',
        },
      },
    ];
  }

  // 7. LEPTOSPIRA (XOẮN KHUẨN LEPTOSPIROSIS / HỘI CHỨNG WEIL)
  if (
    idLower.includes('leptospira') ||
    idLower.includes('lepto') ||
    nameLower.includes('leptospira') ||
    nameLower.includes('xoắn khuẩn') ||
    nameLower.includes('weil')
  ) {
    return [
      {
        id: 'lepto_phase_1',
        dayRange: 'N1 - N3',
        phaseName: 'Giai đoạn Nhiễm khuẩn huyết & Đau cơ cấp (Septicemic Phase)',
        clinicalGoal: 'Khởi động KS diệt xoắn khuẩn sớm trong ≤ 7 ngày đầu; Bù dịch duy trì tưới máu thận phòng AKI; Giảm đau cơ.',
        treatments: [
          {
            category: 'Kháng sinh đặc hiệu',
            content: 'Thể nặng/Nội trú: Ceftriaxone 1-2g IV qd (hoặc Benzylpenicillin 1.5 triệu UI IV q6h) x 7 ngày. Thể nhẹ/Ngoại trú: Doxycycline 100mg PO bid (uống no) x 7 ngày (hoặc Amoxicillin 500mg PO tid).',
            isHighlighted: true,
          },
          {
            category: 'Bù dịch & Điện giải',
            content: 'Truyền NaCl 0.9% hoặc RL duy trì thể tích tuần hoàn, kích thích bài niệu phòng suy thận cấp trước thận.',
          },
          {
            category: 'Hạ sốt & Giảm đau cơ',
            content: 'Paracetamol 500mg PO khi T° ≥ 38.5°C hoặc đau cơ nhiều; Tránh dùng NSAIDs.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Đau cơ (bắp chân, đùi, lưng) & Xung huyết kết mạc', frequency: 'q8h', target: 'Đánh giá thoái lui đau cơ và đỏ mắt' },
          { type: 'LS', metric: 'Nước tiểu & Màu sắc', frequency: 'q4-6h', target: 'Đảm bảo nước tiểu ≥ 0.8-1.0 mL/kg/h' },
          { type: 'CLS', metric: 'CTM, Creatinine, Urea, Điện giải', frequency: 'q24h', target: 'Phát hiện sớm tổn thương thận cấp (AKI)' },
          { type: 'CLS', metric: 'Huyết thanh học Leptospira (IgM / MAT / PCR)', frequency: 'Lúc nhập viện', target: 'Xác định căn nguyên xoắn khuẩn' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Cảnh giác phản ứng Jarisch-Herxheimer (sốt cao, rét run, tụt HA) trong vài giờ đầu sau liều KS đầu tiên.',
            'CCĐ Doxycycline cho phụ nữ mang thai và trẻ em dưới 8 tuổi (gây vàng răng vĩnh viễn và chậm phát triển xương).',
            'TUYỆT ĐỐI TRÁNH dùng NSAIDs vì nguy cơ rất cao thúc đẩy suy thận cấp và xuất huyết.',
          ],
          triageOrDischargeCriteria: 'Thể nhẹ điều trị ngoại trú; Nhập viện nội trú ngay nếu có vàng da, thiểu niệu, ho ra máu hoặc lơ mơ.',
        },
      },
      {
        id: 'lepto_phase_2',
        dayRange: 'N4 - N7',
        phaseName: 'Giai đoạn Miễn dịch & Hội chứng Weil (Immune / Toxic Phase)',
        clinicalGoal: 'Kiểm soát tam chứng Weil (Vàng da đậm + Suy thận cấp + Xuất huyết phổi/tiêu hóa); Chống toan máu, tăng K+ và suy hô hấp.',
        treatments: [
          {
            category: 'Kháng sinh duy trì',
            content: 'Tiếp tục Ceftriaxone 1-2g/d hoặc Penicillin G đủ 7 ngày liên tục.',
            isHighlighted: true,
          },
          {
            category: 'Hồi sức suy thận cấp (AKI)',
            content: 'Bù dịch theo áp lực tĩnh mạch trung tâm hoặc siêu âm IVC; Nếu thiểu niệu/vô niệu hoặc toan hóa máu/tăng Kali → Chỉ định lọc máu ngắt quãng (IHD) hoặc CRRT sớm.',
            isHighlighted: true,
          },
          {
            category: 'Hô hấp & Xuất huyết',
            content: 'Thở O2 gọng kính hoặc HFNC; Đặt nội khí quản thở máy PEEP sớm nếu có xuất huyết phế nang lan tỏa (ho ra máu sét đánh).',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Nước tiểu qua ống thông Foley', frequency: 'q1h', target: 'Duy trì ≥ 0.5 mL/kg/h' },
          { type: 'LS', metric: 'Nhịp thở, SpO2, Ran phổi, Ho ra máu', frequency: 'q2-4h', target: 'Phát hiện sớm hội chứng xuất huyết phổi' },
          { type: 'CLS', metric: 'Khí máu động mạch & Điện giải (K+, Na+)', frequency: 'q6-12h', target: 'Kiểm soát toan chuyển hóa và tăng Kali' },
          { type: 'CLS', metric: 'Bilirubin TP/TT & Men gan AST, ALT', frequency: 'q24-48h', target: 'Theo dõi phân ly Bilirubin tăng vọt / men gan tăng vừa' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Tổn thương phổi trong Leptospira tiến triển cực nhanh từ ho máu nhẹ đến suy hô hấp cấp ARDS tử vong trong vài giờ.',
            'Cần hội chẩn Thận nhân tạo / Lọc máu sớm trước khi xảy ra biến chứng tăng Kali máu đe dọa ngừng tim.',
          ],
          triageOrDischargeCriteria: 'Thể nặng bắt buộc nằm ICU/Hồi sức tích cực; Chưa có chỉ định xuất viện trong giai đoạn này.',
        },
      },
      {
        id: 'lepto_phase_3',
        dayRange: 'N8 trở đi',
        phaseName: 'Giai đoạn Hồi phục & Phục hồi chức năng thận (Convalescent Phase)',
        clinicalGoal: 'Quản lý giai đoạn đa niệu phục hồi chức năng thận; Bù nước điện giải tương ứng; Phục hồi chức năng gan.',
        treatments: [
          {
            category: 'Bù dịch đa niệu',
            content: 'Bù dịch và điện giải (đặc biệt bù Kali, Natri) theo lượng nước tiểu thực tế hàng ngày, tránh hạ Kali máu do đa niệu.',
            isHighlighted: true,
          },
          {
            category: 'Dinh dưỡng phục hồi',
            content: 'Chế độ ăn giàu đạm, giàu năng lượng; Bổ sung vitamin nhóm B, C.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Cân bằng xuất nhập dịch 24h & Sinh hiệu', frequency: 'Hàng ngày', target: 'Cân bằng dịch ổn định, huyết động tốt' },
          { type: 'CLS', metric: 'Creatinine, Urea & Điện giải đồ', frequency: 'q48h', target: 'Creatinine hồi phục về giới hạn bình thường' },
          { type: 'CLS', metric: 'Bilirubin máu & Tổng phân tích nước tiểu', frequency: 'Trước ra viện', target: 'Vàng da thoái lui, protein niệu âm tính' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Hạ Kali máu nặng trong pha tiểu nhiều có thể gây loạn nhịp tim và liệt ruột cơ năng.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn ra viện: Hết sốt ≥ 3 ngày, nước tiểu ổn định tự chủ (> 1.5 L/d), Creatinine và điện giải về bình thường, ăn uống ngon miệng.',
        },
      },
    ];
  }

  // 8. VIÊM PHỔI MẮC PHẢI CỘNG ĐỒNG (CAP)
  if (idLower.includes('phoi') || nameLower.includes('phổi') || nameLower.includes('pneumonia')) {
    return [
      {
        id: 'cap_phase_1',
        dayRange: 'N1 (0 - 24h)',
        phaseName: 'Giai đoạn Giờ vàng & Kháng sinh ban đầu (Initial Golden Hours)',
        clinicalGoal: 'Khởi động KS đích sớm trong ≤ 4h; Đảm bảo thông khí SpO2 ≥ 95%; Cấy đờm/máu trước liều KS đầu.',
        treatments: [
          {
            category: 'Kháng sinh bậc 1',
            content: 'Nội trú: Ceftriaxone 1-2g IV/d + Azithromycin 500mg PO/d (hoặc Amox/Clav 1.2g IV q8h). Ngoại trú: Amox/Clav 1g (875/125mg) bid PO.',
            isHighlighted: true,
          },
          {
            category: 'Hô hấp & Oxy',
            content: 'O2 gọng mũi 2-4 L/p nếu SpO2 < 95% (mục tiêu 94-98%; 88-92% nếu có COPD). Khí dung Salbutamol nếu co thắt.',
          },
          {
            category: 'Hạ sốt & Bù dịch',
            content: 'Paracetamol 500mg PO khi T° ≥ 38.5°C; Bù dịch NaCl 0.9% hoặc RL duy trì đường truyền.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'SpO2, Nhịp thở, Co kéo cơ hô hấp', frequency: 'q2-4h', target: 'SpO2 ≥ 95%, NT ≤ 22 l/p' },
          { type: 'LS', metric: 'Phân tầng CURB-65', frequency: 'Lúc tiếp nhận', target: 'Xác định ngoại trú, nội trú hay ICU' },
          { type: 'CLS', metric: 'X-quang ngực thẳng & CTM, CRP', frequency: 'Lúc nhập viện', target: 'Đánh giá thâm nhiễm, BC, CRP nền' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Lấy mẫu đờm & cấy máu trước liều KS đầu tiên nhưng không được chậm trễ KS quá 4 giờ.',
            'Cảnh giác biến chứng suy hô hấp cấp tiến triển / ARDS trong 24 giờ đầu.',
          ],
          triageOrDischargeCriteria: 'CURB-65: 0-1 (Ngoại trú); 2 (Nội trú khoa thường); ≥ 3 (Cân nhắc ICU).',
        },
      },
      {
        id: 'cap_phase_2',
        dayRange: 'N2 - N3 (48 - 72h)',
        phaseName: 'Giai đoạn Đánh giá đáp ứng lâm sàng (Response Evaluation)',
        clinicalGoal: 'Đánh giá đáp ứng KS (cắt sốt, giảm khó thở, BC giảm); Tránh đổi KS vội vàng nếu LS đang cải thiện.',
        treatments: [
          {
            category: 'Kháng sinh',
            content: 'Tiếp tục phác đồ KS ban đầu. Nếu hết sốt > 24h, sinh hiệu ổn và uống được → Chuyển sang KS đường uống (Step-down switch).',
            isHighlighted: true,
          },
          {
            category: 'Vật lý trị liệu',
            content: 'Vỗ rung dẫn lưu tư thế, tập ho có kiểm soát, vận động nhẹ tại giường để làm sạch đờm.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'T°, M, HA, Nhịp thở', frequency: 'q6-8h', target: 'Hạ thân nhiệt về bình thường' },
          { type: 'CLS', metric: 'Xét nghiệm kiểm tra: CTM, CRP/PCT', frequency: 'Sau 48-72h', target: 'Bạch cầu & CRP giảm ≥ 50%' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Nếu sau 72h sốt dai dẳng hoặc xấu đi → Chụp lại X-quang, siêu âm màng phổi loại trừ tràn dịch mủ cận viêm, áp xe hoặc kháng thuốc.',
          ],
          triageOrDischargeCriteria: 'Khi đạt tiêu chuẩn ổn định LS (Hết sốt, M < 100, NT < 24, SpO2 ≥ 95%), chuẩn bị chuyển về ngoại trú.',
        },
      },
      {
        id: 'cap_phase_3',
        dayRange: 'N4 - N7',
        phaseName: 'Giai đoạn Hoàn tất liệu trình & Xuất viện (Discharge & Recovery)',
        clinicalGoal: 'Hoàn thành đủ liệu trình KS 5-7 ngày; Phục hồi chức năng hô hấp; Tiêu chuẩn ra viện an toàn.',
        treatments: [
          {
            category: 'Kháng sinh PO',
            content: 'Uống đủ liệu trình KS ngoại trú (Amox/Clav hoặc Levofloxacin) tổng cộng 5-7 ngày.',
            isHighlighted: true,
          },
          {
            category: 'Phòng ngừa',
            content: 'Tư vấn tiêm phòng vaccine phế cầu (PCV13/PPSV23) & cúm mùa hàng năm; Cai thuốc lá.',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Khám lâm sàng hô hấp', frequency: 'Trước xuất viện', target: 'Phổi sạch hoặc ran giảm rõ rệt' },
        ],
        cautionsAndDischarge: {
          cautions: [
            'Tổn thương hình ảnh học trên X-quang phổi có thể thoái lui chậm hơn lâm sàng từ 4-8 tuần.',
          ],
          triageOrDischargeCriteria: 'Tiêu chuẩn xuất viện: T° bình thường ≥ 48h, ăn uống được, có khả năng tự dùng thuốc tại nhà. Tái khám sau 1-2 tuần.',
        },
      },
    ];
  }

  // 9. BỆNH LÝ CHUNG (DEFAULT TIMELINE TRÍCH XUẤT TỪ PHACDO)
  const defaultMed = phacDo?.thuoc?.[0] ? `${phacDo.thuoc[0][0]}: ${phacDo.thuoc[0][1]} (${phacDo.thuoc[0][2]})` : 'Áp dụng thuốc điều trị chính theo phác đồ';
  const defaultStep = phacDo?.tuyen?.[0] || 'Kiểm soát đường thở, hô hấp và tuần hoàn ban đầu';

  return [
    {
      id: 'general_phase_1',
      dayRange: 'N1 - N2',
      phaseName: 'Giai đoạn Khởi đầu & Cấp tính (Acute Initiation)',
      clinicalGoal: 'Ổn định huyết động, kiểm soát triệu chứng cấp tính, khởi động điều trị đích theo phác đồ bậc 1.',
      treatments: [
        {
          category: 'Can thiệp ưu tiên',
          content: defaultStep,
          isHighlighted: true,
        },
        {
          category: 'Thuốc bậc 1',
          content: defaultMed,
          isHighlighted: true,
        },
        {
          category: 'Chăm sóc & Dịch',
          content: 'Nghỉ tại giường, lập đường truyền TM duy trì; Điều trị triệu chứng (giảm đau, hạ sốt).',
        },
      ],
      monitoring: [
        { type: 'LS', metric: 'Dấu hiệu sinh tồn (M, HA, SpO2, NT)', frequency: 'q2-4h', target: 'Sinh hiệu trong giới hạn an toàn' },
        { type: 'CLS', metric: 'Xét nghiệm ban đầu', frequency: 'Lúc tiếp nhận', target: 'Chức năng gan, thận, điện giải nền' },
      ],
      cautionsAndDischarge: {
        cautions: [
          'Thận trọng cơ địa cao tuổi, phụ nữ có thai hoặc suy tim, suy thận nền.',
          'Báo bác sĩ ngay khi sinh hiệu dao động bất thường hoặc xuất hiện dấu hiệu cảnh báo.',
        ],
        triageOrDischargeCriteria: 'Theo dõi sát tại khoa điều trị, chưa có chỉ định xuất viện trong giai đoạn cấp.',
      },
    },
    {
      id: 'general_phase_2',
      dayRange: 'N3 - N5',
      phaseName: 'Giai đoạn Tấn công duy trì & Đánh giá đáp ứng (Maintenance & Response)',
      clinicalGoal: 'Tối ưu hóa liều điều trị theo đáp ứng LS; Giảm dần can thiệp xâm lấn, chuyển sang đường uống.',
      treatments: [
        {
          category: 'Thuốc duy trì',
          content: 'Tiếp tục phác đồ; Cân nhắc chuyển sang thuốc PO khi người bệnh dung nạp tốt.',
          isHighlighted: true,
        },
        {
          category: 'Dinh dưỡng & Vận động',
          content: 'Ăn uống dinh dưỡng đường miệng; Ngồi dậy và vận động nhẹ nhàng tại giường.',
        },
      ],
      monitoring: [
        { type: 'LS', metric: 'Sinh hiệu & Khám lâm sàng', frequency: 'q8-12h', target: 'Triệu chứng cơ năng cải thiện rõ' },
        { type: 'CLS', metric: 'Xét nghiệm CLS kiểm tra', frequency: 'Sau 48-72h', target: 'Chỉ số bất thường có xu hướng thoái lui' },
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
      dayRange: 'N6 trở đi',
      phaseName: 'Giai đoạn Hồi phục & Kế hoạch xuất viện (Recovery & Discharge)',
      clinicalGoal: 'Đảm bảo đạt tiêu chuẩn xuất viện an toàn; Thiết lập đơn thuốc ngoại trú & hướng dẫn phòng tái phát.',
      treatments: [
        {
          category: 'Đơn ngoại trú',
          content: 'Chuyển toàn bộ sang thuốc PO điều trị duy trì tại nhà theo đơn xuất viện.',
          isHighlighted: true,
        },
        {
          category: 'Phục hồi & Dặn dò',
          content: 'Hướng dẫn chế độ ăn uống, sinh hoạt, phục hồi và hẹn lịch tái khám định kỳ.',
        },
      ],
      monitoring: [
        { type: 'LS', metric: 'Khám tổng quát trước ra viện', frequency: 'Ngày xuất viện', target: 'Đạt đầy đủ tiêu chuẩn ra viện an toàn' },
      ],
      cautionsAndDischarge: {
        cautions: [
          'Dặn dò các dấu hiệu đỏ (Red Flags) cần quay lại viện cấp cứu ngay lập tức.',
        ],
        triageOrDischargeCriteria: 'Tiêu chuẩn xuất viện: Sinh hiệu ổn định ≥ 48h, hết triệu chứng cấp, tự sinh hoạt bình thường.',
      },
    },
  ];
}
