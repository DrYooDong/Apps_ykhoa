/**
 * ECG Pro Studio — Clinical Scenario Bank
 * Provides realistic medical cases with virtual patient demographics, vitals, symptoms, context, teaching points, and gold standard diagnosis.
 */

(function () {
  'use strict';

  const SCENARIOS = [
    {
      id: 'stemi_anterior_case',
      title: 'Cấp Cứu Tim Mạch — Đau Ngực Dữ Dội Đột Ngột',
      category: 'Bệnh mạch vành',
      difficulty: 'Trung bình',
      patient: { age: 58, sex: 'Nam', weight: 74, occupation: 'Kỹ sư construction' },
      vitals: { hr: 110, sbp: 85, dbp: 55, spo2: 91, temp: 37.1, rr: 24 },
      symptoms: [
        'Đau vặt ép nghẹt sau xương ức khởi phát 45 phút trước',
        'Vã mồ hôi lạnh toàn thân',
        'Khó thở, hoảng hốt',
        'Lan lên cằm và tay trái'
      ],
      context: 'Bệnh nhân được người nhà đưa vào Cấp cứu sau khi xuất hiện đau ngực dữ dội khi đang bê đồ nặng. Tiền sử Hút thuốc lá 20 bao-năm, Tăng huyết áp 5 năm không điều trị đều.',
      modifiers: ['sinus_tachy', 'stemi_anterior'],
      goldAnswer: 'Nhồi máu cơ tim cấp có ST chênh lên (STEMI) thành Trước Vách (V1-V4) / Nhịp nhanh xoang',
      teachingPoints: [
        'ST chênh lên dạng vòm cao > 2mm ở V1-V4 là dấu hiệu điển hình của tắc ĐM liên thất trước (LAD).',
        'Hình ảnh soi gương: ST chênh xuống ở DII, DIII, aVF.',
        'Nhịp nhanh xoang (110 bpm) và huyết áp tụt (85/55 mmHg) phản ứng với giảm thể tích nhát bóp hoặc dọa Sốc tim.',
        'Quyết định lâm sàng: Kích hoạt quy trình PCI cấp cứu trong vòng 90 phút!'
      ]
    },
    {
      id: 'stemi_inferior_rv_case',
      title: 'Cấp Cứu — Đau Thượng Vị & Tụt Huyết Áp',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      patient: { age: 64, sex: 'Nam', weight: 68, occupation: 'Hưu trí' },
      vitals: { hr: 52, sbp: 80, dbp: 50, spo2: 95, temp: 36.8, rr: 20 },
      symptoms: [
        'Đau thắt thượng vị kèm buồn nôn, nôn mửa 3 lần',
        'Chóng mặt, ngất xỉu tư thế',
        'Da tái lạnh, tĩnh mạch cổ nổi'
      ],
      context: 'Khám cấp cứu vì nhầm đau dạ dày cấp. Tiền sử Đái tháo đường type 2. Thăm khám thấy Tĩnh mạch cổ nổi, phổi trong không ran, HA 80/50 mmHg.',
      modifiers: ['sinus_brady', 'stemi_inferior'],
      goldAnswer: 'STEMI thành Dưới (DII, DIII, aVF) nghi kèm Nhồi máu thất phải / Nhịp chậm xoang',
      teachingPoints: [
        'ST chênh lên ở DII, DIII, aVF (DIII chênh cao hơn DII gợi ý tổn thương ĐM vành Phải - RCA).',
        'Hình ảnh soi gương: ST chênh xuống rõ ở DI và aVL.',
        'Bệnh nhân có triệu chứng Vô niệu/Chóng mặt + Tĩnh mạch cổ nổi + Phổi trong → Tam chứng NMCT Thất Phải.',
        'CHỐNG CHỈ ĐỊNH dùng Nitroglycerin & Thuốc giãn mạch vì nguy cơ tụt HA thảm hại! Cần truyền dịch tối ưu tĩnh mạch.'
      ]
    },
    {
      id: 'af_rvr_case',
      title: 'Khám Nội Tim Mạch — Hồi Hộp Đánh Trống Ngực',
      category: 'Rối loạn nhịp',
      difficulty: 'Dễ',
      patient: { age: 72, sex: 'Nữ', weight: 52, occupation: 'Nội trợ' },
      vitals: { hr: 145, sbp: 130, dbp: 80, spo2: 97, temp: 36.6, rr: 18 },
      symptoms: [
        'Hồi hộp đánh trống ngực dồn dập khởi phát đột ngột 3 giờ',
        'Cảm giác thắt ngực nhẹ khi đi lại',
        'Không khó thở dữ dội'
      ],
      context: 'Khám phòng khám nội tim mạch. Tiền sử Tăng huyết áp 12 năm, Dày thất trái. Nghe tim thấy nhịp tim hoàn toàn không đều, mạch loạn nhịp hoàn toàn.',
      modifiers: ['atrial_fib', 'lvh'],
      goldAnswer: 'Rung Nhĩ đáp ứng thất nhanh (AF with RVR) / Phì đại thất trái (LVH)',
      teachingPoints: [
        'Đặc trưng Rung nhĩ: Mất hoàn toàn sóng P, thay bằng sóng f lăn tăn, khoảng RR hoàn toàn loạn.',
        'Đáp ứng thất nhanh (HR > 100 l/phút) làm giảm thời gian tâm trương bù dịch máu cho mạch vành.',
        'Tiêu chuẩn Sokolow-Lyon (SV1 + RV5 > 35mm) chứng tỏ Dày thất trái do tăng huyết áp mạn.',
        'Chiến lược: Kiểm soát tần số thất (Beta-blocker/Diltiazem) + Đánh giá nguy cơ tắc mạch bằng thang điểm CHA2DS2-VASc.'
      ]
    },
    {
      id: 'hyperkalemia_emergency_case',
      title: 'Cấp Cứu Nội Thận — Vô Niệu & Yếu Cơ Toàn Thân',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      patient: { age: 48, sex: 'Nam', weight: 82, occupation: 'Công nhân' },
      vitals: { hr: 44, sbp: 90, dbp: 55, spo2: 96, temp: 36.4, rr: 20 },
      symptoms: [
        'Bảo không tiểu được 2 ngày qua',
        'Yếu cơ 2 chân lan dần lên tay',
        'Cảm giác tê quanh miệng và đầu ngón tay',
        'Tim đập chậm'
      ],
      context: 'Bệnh nhân Suy thận mạn giai đoạn cuối bỏ chạy thận 1 tuần. Khám thấy phù 2 chân (+), nghe tim nhịp chậm mờ. Kết quả xét nghiệm cấp: K+ = 7.8 mEq/L, Creatinine = 920 umol/L.',
      modifiers: ['sinus_brady', 'hyperkalemia_severe', 'av_block_1'],
      goldAnswer: 'Tăng Kali Máu Nặng (K+ 7.8 mEq/L) / Suy Thận Mạn Giai Đoạn Cuối — Cấp cứu tối khẩn!',
      teachingPoints: [
        'Tăng Kali máu nặng: Sóng P bị xóa xẹp, PR kéo dài, QRS giãn rất rộng dính liền với T thành sóng hình sin.',
        'Nguy cơ tử vong rất cao do Rung thất hoặc Vô tâm thu bất ngờ!',
        'Xử trí cấp cứu theo thứ tự:',
        '  1. Tiêm tĩnh mạch Calcium Gluconate 10% (Bảo vệ màng cơ tim ngay lập tức).',
        '  2. Insulin tĩnh mạch + Glucose 20% / Khí dung Albuterol / Bicarbonate (Chuyển K+ vào nội bào).',
        '  3. Kích hoạt Lọc Máu Cấp Cứu (Hemodialysis) để loại bỏ Kali dư thừa.'
      ]
    },
    {
      id: 'vt_mono_case',
      title: 'Cấp Cứu Hồi Sức — Ngất Đột Ngột & Mạch Nhanh Rộng',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Nâng cao',
      patient: { age: 65, sex: 'Nam', weight: 70, occupation: 'Lái xe' },
      vitals: { hr: 180, sbp: 75, dbp: 40, spo2: 88, temp: 36.9, rr: 26 },
      symptoms: [
        'Đột ngột ngất xỉu 2 phút, tỉnh lại lơ mơ',
        'Đau ngực, vã mồ hôi nhễ nhại',
        'Thở nhanh nông'
      ],
      context: 'Tiền sử Nhồi máu cơ tim cũ 2 năm trước (EF = 30%). Vừa vào phòng cấp cứu liền xuất hiện cơn ngất, bắt mạch quay rất yếu, tần số khoảng 180 l/phút.',
      modifiers: ['vt_mono'],
      goldAnswer: 'Cơn Nhịp Nhanh Thất Đơn Hình (Ventricular Tachycardia - VT) có rối loạn huyết động',
      teachingPoints: [
        'Phức bộ QRS giãn rộng (> 0.14s) đồng dạng, tần số nhanh 180 bpm.',
        'Tiêu chuẩn Brugada/Vereckei: Phân ly nhĩ thất, dạng nhịp thất độc lập.',
        'Huyết áp tụt (75/40 mmHg) + lơ mơ = Nhịp nhanh thất CÓ RỐI LOẠN HUYẾT ĐỘNG.',
        'Xử trí khẩn cấp: SỐC ĐIỆN CHUYỂN NHỊP ĐỒNG BỘ (Synchronized Cardioversion 100-200J) ngay lập tức!'
      ]
    },
    {
      id: 'wellens_case',
      title: 'Phòng Khám — Cơn Đau Thắt Ngực Đã Hết',
      category: 'Bệnh mạch vành',
      difficulty: 'Trung bình',
      patient: { age: 52, sex: 'Nữ', weight: 60, occupation: 'Giáo viên' },
      vitals: { hr: 72, sbp: 125, dbp: 75, spo2: 99, temp: 36.7, rr: 16 },
      symptoms: [
        'Đau ngực kiểu bóp nghẹt 15 phút đêm qua, hiện tại ĐÃ HẾT ĐAU hoàn toàn',
        'Không khó thở, không vã mồ hôi khi vào khám'
      ],
      context: 'Bệnh nhân tự đi khám vì sợ đau tim đêm qua. Hiện tại khám hoàn toàn bình thường, không đau ngực. Troponin T nhạy cao chưa tăng mạnh.',
      modifiers: ['sinus_normal', 'wellens'],
      goldAnswer: 'Hội chứng Wellens Type A/B (Wellens Syndrome) — Cảnh báo Hẹp Nặng Nhánh ĐM Liên Thất Trước (LAD)',
      teachingPoints: [
        'Sóng T 2 pha hoặc âm sâu cân đối ở V2, V3 ở bệnh nhân ĐÃ HẾT ĐAU NGỰC.',
        'Đoạn ST không chênh hoặc chênh rất nhẹ (< 1mm). Không có sóng Q hoại tử.',
        'Ý nghĩa sinh lý bệnh: ĐM LAD bị tắc nghẽn tái thông thoáng chốc. Nguy cơ tiến triển thành STEMI diện rộng trong vài ngày tới là cực kỳ cao.',
        'CẢNH BÁO: CHỐNG CHỈ ĐỊNH THỬ THÁCH GẮNG SỨC! Cần chụp Mạch Vành Qua Da (Coronary Angiography) sớm.'
      ]
    },
    {
      id: 'wpw_case',
      title: 'Cấp Cứu Trẻ — Cơn Tim Đập Nhanh Ở Người Trẻ',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Trung bình',
      patient: { age: 22, sex: 'Nam', weight: 62, occupation: 'Sinh viên' },
      vitals: { hr: 78, sbp: 115, dbp: 70, spo2: 98, temp: 36.8, rr: 16 },
      symptoms: [
        'Thỉnh thoảng có các cơn tim đập dồn dập > 180 lần/phút tự hết',
        'Hiện tại hoàn toàn bình thường không triệu chứng'
      ],
      context: 'Khám sức khỏe tổng quát đại học. Bệnh nhân khỏe mạnh, chơi thể thao tốt.',
      modifiers: ['wpw'],
      goldAnswer: 'Hội chứng Wolff-Parkinson-White (WPW Syndrome) dạng cơ bản',
      teachingPoints: [
        'Tam chứng WPW điển hình:',
        '  1. Khoảng PR ngắn < 0.12s (120ms).',
        '  2. Sóng Delta (độ dốc chèn vào chân sóng R).',
        '  3. Phức bộ QRS giãn rộng nhẹ.',
        'Cơ chế: Xung điện truyền qua đường phụ Kent bỏ qua sự trì hoãn của nút AV.',
        'Nguy cơ: Có thể dẫn tới Nhịp nhanh vào lại nhĩ thất (AVRT) hoặc Rung nhĩ dẫn truyền đường phụ gây Rung thất.'
      ]
    },
    {
      id: 'pericarditis_case',
      title: 'Cấp Cứu — Đau Ngực Thay Đổi Theo Tư Thế',
      category: 'Viêm màng tim',
      difficulty: 'Trung bình',
      patient: { age: 34, sex: 'Nam', weight: 70, occupation: 'Lập trình viên' },
      vitals: { hr: 102, sbp: 120, dbp: 75, spo2: 98, temp: 38.2, rr: 20 },
      symptoms: [
        'Đau ngực nhói sau xương ức 2 ngày qua',
        'Đau TĂNG LÊN KHI NẰM NGHỬA hoặc hít sâu',
        'Đau GIẢM RÕ RỆT KHI NGOẢI NGƯỜI CÚI RA TRƯỚC',
        'Sốt nhẹ 38°C, mệt mỏi'
      ],
      context: 'Bị cảm cúm siêu vi 1 tuần trước. Nghe tim thấy tiếng cọ màng ngoài tim (Pericardial friction rub) ở bờ trái xương ức.',
      modifiers: ['sinus_tachy', 'pericarditis'],
      goldAnswer: 'Viêm Màng Ngoài Tim Cấp (Acute Pericarditis) giai đoạn 1',
      teachingPoints: [
        'ST chênh lên LÕM lan tỏa ở tất cả các chuyển đạo (DI, DII, DIII, aVL, aVF, V2-V6).',
        'PR chênh xuống lan tỏa (đặc biệt ở DII, V5, V6) và PR chênh lên ở aVR.',
        'Phân biệt với STEMI: Viêm màng ngoài tim KHÔNG có hình ảnh soi gương ST chênh xuống (trừ aVR) và không có sóng Q hoại tử.',
        'Phân biệt với Tái cực sớm: Tỷ lệ ST/T > 0.25 ở V6 và không có hình "lưỡi câu".',
        'Điều trị: NSAIDs (Ibuprofen/Aspirin) + Colchicine.'
      ]
    },
    {
      id: 'av_block_2_mobitz1_case',
      title: 'Cấp Cứu Nội — Hồi Hộp & Nhát Tim Bị Hẫng (Mobitz I)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Trung bình',
      patient: { age: 68, sex: 'Nam', weight: 65, occupation: 'Cán bộ hưu trí' },
      vitals: { hr: 54, sbp: 115, dbp: 70, spo2: 96, temp: 36.6, rr: 18 },
      symptoms: [
        'Cảm giác tim đập hẫng nhịp thỉnh thoảng xuất hiện trong ngày',
        'Hoa mắt nhẹ khi đứng dậy đột ngột',
        'Không đau ngực, không khó thở khi nghỉ'
      ],
      context: 'Bệnh nhân khám vì hồi hộp hẫng nhịp. Tiền sử Tăng huyết áp đang dùng Diltiazem. Điện tâm đồ ghi nhận chu kỳ Wenckebach điển hình.',
      modifiers: ['av_block_2_wenckebach'],
      goldAnswer: 'Block Nhĩ - Thất Độ II Mobitz I (Chu kỳ Wenckebach)',
      teachingPoints: [
        'Khoảng PR dài dần qua từng nhịp cho đến khi có 1 sóng P bị ngưng truyền (không tạo được QRS).',
        'Khoảng cách RR giữa các nhịp ngắn dần trước khi bị rụng nhịp.',
        'Vị trí tổn thương thường tại Nút Nhĩ Thất (AV node). Tiên lượng tương đối lành tính, xem xét chỉnh liều thuốc ức chế dẫn truyền.'
      ]
    },
    {
      id: 'av_block_3_complete_case',
      title: 'Cấp Cứu Khẩn — Choáng Váng & Nhịp Tim Rất Chậm (AVB3)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Khó',
      patient: { age: 78, sex: 'Nữ', weight: 50, occupation: 'Làm nông' },
      vitals: { hr: 36, sbp: 90, dbp: 50, spo2: 94, temp: 36.5, rr: 20 },
      symptoms: [
        'Hoa mắt, xỉu lịm 2 lần trong ngày (Tiền ngất Stokes-Adams)',
        'Mệt mỏi toàn thân, bước đi loạng choạng',
        'Nhịp thở chậm, da niêm nhạt'
      ],
      context: 'Người nhà đưa vào viện khẩn vì nhịp tim rất chậm. Khám nghe tim thấy nhịp tim đập chậm đều 36 l/phút, T1 thay đổi biên độ (tiếng đại bác). ECG ghi nhận Phân ly nhĩ thất hoàn toàn.',
      modifiers: ['av_block_3'],
      goldAnswer: 'Block Nhĩ - Thất Hoàn Toàn (Block AV Độ III) — Nhịp thoát thất 36 l/phút',
      teachingPoints: [
        'Mất hoàn toàn liên hệ dẫn truyền giữa Nhĩ và Thất! Sóng P (100 bpm) và QRS (36 bpm) đập độc lập hoàn toàn.',
        'Phức bộ QRS giãn rộng 130ms phản ánh nhịp thoát đến từ tầng Thất (Tự thất).',
        'Chỉ định khẩn cấp: Đặt máy tạo nhịp tim tạm thời (Temporary Pacemaker) & vĩnh viễn!'
      ]
    },
    {
      id: 'lbbb_stemi_mask_case',
      title: 'Cấp Cứu Tim Mạch — Block Nhánh Trái Mới Xuất Hiện',
      category: 'Bệnh mạch vành',
      difficulty: 'Nâng cao',
      patient: { age: 62, sex: 'Nam', weight: 75, occupation: 'Thương gia' },
      vitals: { hr: 98, sbp: 140, dbp: 85, spo2: 95, temp: 36.8, rr: 22 },
      symptoms: [
        'Đau thắt ngực dữ dội sau xương ức 1 giờ qua',
        'Vã mồ hôi lạnh, hoảng hốt',
        'Khó thở khi nằm phẳng'
      ],
      context: 'Đau ngực dữ dội vào Cấp cứu. Điện tâm đồ ghi nhận QRS giãn rộng 150ms dạng Block nhánh Trái hoàn toàn (LBBB) chưa từng ghi nhận trước đây.',
      modifiers: ['lbbb'],
      goldAnswer: 'Block Nhánh Trái Hoàn Toàn (LBBB) Mới Xuất Hiện — Tương đương STEMI Cấp',
      teachingPoints: [
        'Tiêu chuẩn LBBB: QRS ≥ 0.12s, sóng R rộng dạng chữ M ở DI, aVL, V5-V6; QS/rS sâu ở V1-V2.',
        'Khuyến cáo ESC/AHA: LBBB mới xuất hiện kèm triệu chứng đau ngực cấp được coi là TƯƠNG ĐƯƠNG STEMI CẤP!',
        'Áp dụng tiêu chuẩn Sgarbossa để phát hiện NMCT trên nền LBBB. Kích hoạt quy trình PCI cấp cứu.'
      ]
    },
    {
      id: 'aflutter_21_case',
      title: 'Khám Tim Mạch — Tim Đập Nhanh Đều 150 l/phút',
      category: 'Rối loạn nhịp',
      difficulty: 'Trung bình',
      patient: { age: 58, sex: 'Nữ', weight: 55, occupation: 'Buôn bán' },
      vitals: { hr: 150, sbp: 125, dbp: 75, spo2: 97, temp: 36.7, rr: 20 },
      symptoms: [
        'Cảm giác tim đập nhanh dồn dập 4 giờ qua',
        'Hơi mệt ngực khi đi lại',
        'Không ngất, không khó thở dữ dội'
      ],
      context: 'Tiền sử Hẹp van 2 lá mạn tính do thấp. Thăm khám tim thấy tần số tim đập nhanh rất đều 150 l/phút.',
      modifiers: ['atrial_flutter'],
      goldAnswer: 'Cuồng Nhĩ (Atrial Flutter) dẫn truyền AV tỷ lệ 2:1',
      teachingPoints: [
        'Sóng F cuồng nhĩ dạng "răng cưa" (Sawtooth) tần số nhĩ 300 l/phút ở DII, DIII, aVF.',
        'Dẫn truyền AV tỷ lệ 2:1 tạo ra tần số thất 150 bpm vô cùng điển hình!',
        'Khi thấy nhịp nhanh QRS hẹp đều 150 bpm, luôn phải nghĩ tới Cuồng nhĩ 2:1!',
        'Xử trí: Kiểm soát tần số thất hoặc Sốc điện chuyển nhịp / Đốt sóng cao tần rãnh chủ - ba lá (CTI ablation).'
      ]
    },
    {
      id: 'pe_s1q3t3_case',
      title: 'Cấp Cứu Khẩn — Khó Thở Đột Ngột Sau Phẫu Thuật (PE)',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Khó',
      patient: { age: 45, sex: 'Nữ', weight: 65, occupation: 'Kế toán' },
      vitals: { hr: 125, sbp: 95, dbp: 60, spo2: 88, temp: 37.2, rr: 28 },
      symptoms: [
        'Khó thở đột ngột dữ dội',
        'Đau ngực kiểu màng phổi khi hít sâu',
        'Ho húng hắng ra ít vệt máu',
        'SpO2 tụt nhanh'
      ],
      context: 'Bệnh nhân mổ kết hợp xương đùi 5 ngày trước, nằm bất động tại giường. Đột ngột ngột thở khi vừa bước xuống giường. ECG ghi nhận dạng SI-QIII-TIII.',
      modifiers: ['sinus_tachy', 'pe_acute'],
      goldAnswer: 'Thuyên Tắc Phổi Cấp (Acute Pulmonary Embolism - PE) — Dấu hiệu SI-QIII-TIII',
      teachingPoints: [
        'Sóng S sâu ở DI, sóng Q sâu ở DIII, sóng T âm ở DIII (Tam chứng McGinn-White / SI-QIII-TIII).',
        'Nhịp nhanh xoang (125 bpm) là dấu hiệu ECG thường gặp nhất trong Thuyên tắc phổi.',
        'Sóng T âm ở V1-V3 phản ánh gánh nặng thất phải cấp (Right Ventricular Strain).',
        'Kích hoạt chụp CT Angio Động mạch phổi (CTA Phổi) cấp cứu & Thuốc tiêu sợi huyết / Chống đông khẩn!'
      ]
    },
    {
      id: 'svt_avnrt_case',
      title: 'Cấp Cứu — Cơn Tim Đập Nhanh QRS Hẹp Đột Ngột (AVNRT)',
      category: 'Rối loạn nhịp',
      difficulty: 'Dễ',
      patient: { age: 30, sex: 'Nữ', weight: 50, occupation: 'Nhân viên văn phòng' },
      vitals: { hr: 185, sbp: 105, dbp: 65, spo2: 98, temp: 36.6, rr: 22 },
      symptoms: [
        'Tim đập nhanh dồn dập như gõ trống 30 phút qua',
        'Cảm giác hồi hộp, nghẹn cổ',
        'Lo âu vã mồ hôi nhẹ'
      ],
      context: 'Đột ngột xuất hiện khi đang ngồi làm việc. Tiền sử từng có vài cơn tự hết. Thăm khám tim đập nhanh đều 185 l/phút, QRS hẹp.',
      modifiers: ['svt_avnrt'],
      goldAnswer: 'Cơn Nhịp Nhanh Vào Lại Nút Nhĩ Thất (AVNRT / SVT)',
      teachingPoints: [
        'Nhịp nhanh QRS hẹp (< 0.10s) vô cùng đều, tần số 185 bpm. Sóng P xoang biến mất (sóng P âm nằm chìm ngay sau QRS).',
        'Cơ chế: Vòng vào lại tại nút nhĩ thất (AV node reentry).',
        'Xử trí bước 1: Nghiệm pháp Kích thích Dây X (Vagal Maneuvers - Nghiệm pháp Valsalva cải tiến, xoa xoang cảnh).',
        'Nếu không cắt cơn: Tiêm tĩnh mạch nhanh Adenosine 6mg (kèm xả nhanh 20mL Saline).'
      ]
    },
    {
      id: 'vfib_cardiac_arrest_case',
      title: 'Cấp Cứu Tối Khẩn — Ngừng Tuần Hoàn Ngừng Hấp (V-Fib)',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Nâng cao',
      patient: { age: 59, sex: 'Nam', weight: 72, occupation: 'Bảo vệ' },
      vitals: { hr: 0, sbp: 0, dbp: 0, spo2: 0, temp: 36.0, rr: 0 },
      symptoms: [
        'Mất ý thức đột ngột',
        'Ngừng thở hoàn toàn, bão hòa oxy không đo được',
        'Mất mạch bẹn và mạch cảnh'
      ],
      context: 'Bệnh nhân đang ngồi chờ khám tại khoa Cấp cứu thì đột ngột gục xuống ghế, bất tỉnh. Đội CPR phản ứng nhanh lập tức đẩy xe cấp cứu & gắn Monitor điện tim.',
      modifiers: ['vfib'],
      goldAnswer: 'Rung Thất (Ventricular Fibrillation - VF) — Ngừng Tuần Hoàn Cấp Cứu!',
      teachingPoints: [
        'Mất hoàn toàn sóng P, QRS, T! Thay bằng các sóng lăn tăn hỗn loạn không có chu kỳ. Tim hoàn toàn mất khả năng co bóp tống máu.',
        'NGUY CƠ TỬ VONG TRONG VÀI PHÚT NẾU KHÔNG CẤP CỨU!',
        'Quy trình ACLS tối khẩn:',
        '  1. Ép tim liên tục 100-120 lần/phút.',
        '  2. SỐC ĐIỆN KHÔNG ĐỒNG BỘ (Unsynchronized Defibrillation 200J Biphasic) NGAY LẬP TỨC!',
        '  3. Tiêm Adrenaline 1mg IV mỗi 3-5 phút + Amiodarone 300mg IV sau cú sốc thứ 3.'
      ]
    },
    {
      id: 'lvh_hypertension_case',
      title: 'Khám Nội Tim Mạch — Tăng Huyết Áp Mạn Kéo Dài (LVH)',
      category: 'Dày buồng tim',
      difficulty: 'Dễ',
      patient: { age: 65, sex: 'Nam', weight: 78, occupation: 'Hưu trí' },
      vitals: { hr: 78, sbp: 165, dbp: 95, spo2: 98, temp: 36.6, rr: 16 },
      symptoms: [
        'Thỉnh thoảng đau đầu vùng chẩm buổi sáng',
        'Nặng ngực nhẹ khi leo 2 tầng cầu thang',
        'Không ngất, không khó thở kịch phát'
      ],
      context: 'Khám định kỳ. Tiền sử Tăng huyết áp 15 năm uống thuốc không đều. Khám thấy mỏm tim lệch trái hạ sườn VI đường trung đòn.',
      modifiers: ['lvh'],
      goldAnswer: 'Phì Đại Thất Trái kèm Tăng Gánh (LVH with Strain Pattern)',
      teachingPoints: [
        'Tiêu chuẩn Sokolow-Lyon: SV1 + RV5 = 18mm + 24mm = 42mm (> 35mm).',
        'Tiêu chuẩn Cornell: R aVL + S V3 > 28mm ở Nam.',
        'Dấu hiệu Tăng gánh (Strain): ST chênh xuống và T âm ở V5, V6, DI, aVL.',
        'Ý nghĩa: Huyết áp cao mạn tính làm tăng sức cản hệ thống, buộc thất trái phì đại cơ tim để vượt cản. Cần tối ưu thuốc hạ áp (ACEi/ARB).'
      ]
    },
    {
      id: 'pvc_bigeminy_case',
      title: 'Khám Phòng Khám — Cảm Giác Tim Đập Hẫng Liên Tục (Bigeminy)',
      category: 'Rối loạn nhịp',
      difficulty: 'Trung bình',
      patient: { age: 50, sex: 'Nam', weight: 68, occupation: 'Kỹ sư phần mềm' },
      vitals: { hr: 72, sbp: 120, dbp: 75, spo2: 98, temp: 36.7, rr: 16 },
      symptoms: [
        'Cảm giác hẫng ngực, thót tim diễn ra liên tục cả ngày',
        'Căng thẳng mệt mỏi công việc',
        'Uống 4-5 tách cà phê/ngày'
      ],
      context: 'Khám vì triệu chứng khó chịu gây mất ngủ. Nghe tim thấy cứ 1 nhát đập mạnh lại kèm 1 nhát yếu và nghỉ dài.',
      modifiers: ['sinus_normal', 'pvc_bigeminy'],
      goldAnswer: 'Ngoại Tâm Thu Thất Nhịp Đôi (Ventricular Bigeminy)',
      teachingPoints: [
        'Cứ 1 phức bộ QRS bình thường lại đi kèm 1 ngoại tâm thu thất QRS rộng dị dạng (> 0.12s) và nghỉ bù hoàn toàn.',
        'Khoảng ghép (Coupling interval) cố định.',
        'Nguyên nhân thường gặp: Kích thích giao cảm, cà phê, stress, hạ Kali/Magie máu, ngộ độc Digoxin, hoặc bệnh cơ tim.',
        'Xử trí: Giảm cà phê/stress, bù điện giải, xem xét Chẹn Beta (Metoprolol) nếu triệu chứng nhiều.'
      ]
    },
    {
      id: 'hypokalemia_uwave_case',
      title: 'Cấp Cứu Nội — Nôn Ói & Tiêu Chảy Gây Yếu Cơ (Hạ K+)',
      category: 'Rối loạn điện giải',
      difficulty: 'Trung bình',
      patient: { age: 42, sex: 'Nữ', weight: 52, occupation: 'Giáo viên' },
      vitals: { hr: 82, sbp: 100, dbp: 60, spo2: 97, temp: 37.0, rr: 18 },
      symptoms: [
        'Tiêu chảy nôn ói 10 lần/ngày trong 2 ngày qua',
        'Yếu cơ 2 chân không bước nổi',
        'Chuột rút cơ cẳng chân'
      ],
      context: 'Nhập viện vì mất nước nặng do ngộ độc thực phẩm. Điện giải đồ khẩn: K+ = 2.4 mEq/L, Na+ = 132 mEq/L.',
      modifiers: ['hypokalemia'],
      goldAnswer: 'Hạ Kali Máu Nặng (K+ = 2.4 mEq/L) — Sóng U Nổi Bật & ST Chênh Xuống',
      teachingPoints: [
        'Sóng U dương cao ở V2, V3 (biên độ sóng U > sóng T).',
        'Sóng T dẹt hoặc đảo ngược, khoảng QT/QU kéo dài. Đoạn ST chênh xuống nhẹ.',
        'Nguy cơ: Gây loạn nhịp thất nguy hiểm (Xoắn đỉnh, Ngoại tâm thu thất đa ổ).',
        'Xử trí: Bù KCl đường tĩnh mạch chậm (qua máy truyền dịch) kết hợp bù KCl đường uống.'
      ]
    },
    {
      id: 'de_winter_lad_case',
      title: 'Cấp Cứu Tim Mạch — Dấu Hiệu De Winter (Tương đương STEMI LAD)',
      category: 'Bệnh mạch vành',
      difficulty: 'Nâng cao',
      patient: { age: 54, sex: 'Nam', weight: 70, occupation: 'Tiểu thương' },
      vitals: { hr: 105, sbp: 130, dbp: 80, spo2: 96, temp: 36.8, rr: 22 },
      symptoms: [
        'Đau vắt ép nghẹt sau xương ức 40 phút',
        'Vã mồ hôi lạnh, lan ra vai trái',
        'Khó thở nhẹ'
      ],
      context: 'Khám cấp cứu vì đau ngực dữ dội. ECG 12 chuyển đạo ghi nhận ST chênh xuống điểm J kết hợp sóng T cao nhọn đối xứng ở V1-V4.',
      modifiers: ['sinus_tachy', 'de_winter'],
      goldAnswer: 'Dấu Hiệu De Winter (De Winter T waves) — Tương đương STEMI Tắc Nặng ĐM Liên Thất Trước (LAD)',
      teachingPoints: [
        'ST chênh xuống 1-3mm ở điểm J chuyển tiếp sang sóng T cao nhọn đối xứng nổi bật ở V1-V4.',
        'Sóng ST chênh lên nhẹ (0.5-1mm) ở aVR.',
        'Sinh lý bệnh: Tương đương STEMI tắc cấp đoạn gần ĐM LAD (gặp ở 2% ca tắc LAD).',
        'CẨN TRỌNG: Không được nhầm với Thiếu máu dưới nội tâm mạc thông thường! Cần can thiệp PCI cấp cứu khẩn cấp.'
      ]
    },
    {
      id: 'stemi_lateral_lcx_case',
      title: 'Cấp Cứu — Đau Thắt Ngực Thành Bên (DI, aVL, V5-V6)',
      category: 'Bệnh mạch vành',
      difficulty: 'Trung bình',
      patient: { age: 60, sex: 'Nữ', weight: 62, occupation: 'Nội trợ' },
      vitals: { hr: 88, sbp: 135, dbp: 85, spo2: 97, temp: 36.7, rr: 20 },
      symptoms: [
        'Đau thắt ngực nhói lan ra nách và bắp tay trái',
        'Buồn nôn nhẹ, mệt mỏi',
        'Vã mồ hôi vùng trán'
      ],
      context: 'Tiền sử Tăng huyết áp & Rối loạn lipid máu. Đau ngực xuất hiện khi đang làm việc nhà. ECG ghi nhận ST chênh lên ở DI, aVL, V5, V6.',
      modifiers: ['stemi_lateral'],
      goldAnswer: 'Nhồi Máu Cơ Tim Cấp ST Chênh Lên (STEMI) Thành Bên (Tắc ĐM Nhánh Mũ LCx hoặc D1 LAD)',
      teachingPoints: [
        'ST chênh lên ở DI, aVL, V5-V6 (Thành bên cao: DI, aVL; Thành bên thấp: V5, V6).',
        'Hình ảnh soi gương: ST chênh xuống ở DIII, aVF.',
        'Động mạch thủ phạm: Nhánh mũ (LCx) hoặc nhánh chéo thứ nhất (D1 LAD).',
        'Kích hoạt chụp và can thiệp mạch vành PCI cấp cứu.'
      ]
    },
    {
      id: 'stemi_posterior_isolated_case',
      title: 'Cấp Cứu — Nhồi Máu Cơ Tim Thành Sau Ẩn (V1-V3)',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      patient: { age: 66, sex: 'Nam', weight: 72, occupation: 'Hưu trí' },
      vitals: { hr: 76, sbp: 120, dbp: 70, spo2: 98, temp: 36.6, rr: 18 },
      symptoms: [
        'Đau bóp nghẹt sau lưng và giữa ngực 2 giờ qua',
        'Vã mồ hôi nhễ nhại, lo âu',
        'Không khó thở'
      ],
      context: 'Khám cấp cứu. ECG 12 chuyển đạo chuẩn KHÔNG thấy ST chênh lên rõ, nhưng V1-V3 có ST chênh xuống đi ngang, R cao rộng (R/S > 1 ở V2) và T dương thẳng đứng.',
      modifiers: ['stemi_posterior'],
      goldAnswer: 'Nhồi Máu Cơ Tim Cấp ST Chênh Lên (STEMI) Thành Sau Thuần Túy',
      teachingPoints: [
        'Dấu hiệu soi gương ở V1-V3: Sóng R cao rộng (R/S > 1), ST chênh xuống đi ngang, sóng T dương thẳng đứng đứng.',
        'Xác định chẩn đoán bằng cách đo thêm các chuyển đạo thành sau V7, V8, V9 (thấy ST chênh lên ≥ 0.5mm).',
        'Động mạch thủ phạm: ĐM Vành Phải (RCA) hoặc ĐM Nhánh Mũ (LCx).',
        'CẨN TRỌNG: Rất dễ bị bỏ sót nếu chỉ nhìn ST chênh xuống mà nhầm là thiếu máu dưới nội tâm mạc!'
      ]
    },
    {
      id: 'rbbb_lafb_bifascicular_case',
      title: 'Khám Tim Mạch — Block 2 Phân Nhánh (RBBB + LAFB)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Khó',
      patient: { age: 72, sex: 'Nam', weight: 68, occupation: 'Cựu chiến binh' },
      vitals: { hr: 62, sbp: 130, dbp: 80, spo2: 97, temp: 36.6, rr: 18 },
      symptoms: [
        'Cảm giác mệt mỏi, thỉnh thoảng choáng nhẹ khi xoay người',
        'Tiền sử bệnh mạch vành cũ 5 năm'
      ],
      context: 'Khám định kỳ nội tim mạch. ECG ghi nhận QRS = 140ms dạng RBBB ở V1-V2 kết hợp trục lệch trái nghiêm trọng (-50°) dạng LAFB ở DI, aVL.',
      modifiers: ['rbbb', 'lafb'],
      goldAnswer: 'Block Hai Phân Nhánh (Bifascicular Block: RBBB + LAFB) — Nguy cơ tiến triển Block AV Hoàn Toàn',
      teachingPoints: [
        'Phối hợp giữa Block Nhánh Phải (RBBB: rsR\' ở V1) + Block Phân Nhánh Trái Trước (LAFB: Trục lệch trái < -30°, qR ở DI/aVL, rS ở DII/DIII/aVF).',
        'Chỉ còn 1 phân nhánh duy nhất (Phân nhánh trái sau) dẫn truyền điện thế xuống thất!',
        'Cần theo dõi sát ngất / tiền ngất (Stokes-Adams). Nếu kèm PR kéo dài (Block 3 phân nhánh) → Chỉ định đặt máy tạo nhịp tim.'
      ]
    },
    {
      id: 'torsades_de_pointes_case',
      title: 'Cấp Cứu Hồi Sức — Xoắn Đỉnh Do Thuốc / QT Kéo Dài',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Nâng cao',
      patient: { age: 56, sex: 'Nữ', weight: 58, occupation: 'Buôn bán' },
      vitals: { hr: 200, sbp: 70, dbp: 40, spo2: 85, temp: 36.8, rr: 26 },
      symptoms: [
        'Đột ngột ngất xỉu ngưng thở ngắn vài giây',
        'Co giật nhẹ do thiếu máu não diện rộng',
        'Mạch quay nhanh khó bắt'
      ],
      context: 'Đang điều trị phối hợp Amiodarone + Erythromycin. ECG lúc nghỉ trước đó có QTc = 540ms kéo dài. Đột ngột xuất hiện cơn nhịp nhanh thất QRS xoay quanh đường đẳng điện.',
      modifiers: ['vt_torsade'],
      goldAnswer: 'Cơn Xoắn Đỉnh (Torsades de Pointes) trên nền Khoảng QTc Kéo Dài Do Thuốc',
      teachingPoints: [
        'Phức bộ QRS giãn rộng xoay trục liên tục quanh đường đẳng điện với tần số 200-250 bpm.',
        'Xuất hiện trên nền khoảng QT/QTc kéo dài (> 500ms).',
        'Xử trí cấp cứu:',
        '  1. Tiêm tĩnh mạch Magnesium Sulfate 2g IV (Thuốc lựa chọn hàng đầu!).',
        '  2. Ngừng ngay lập tức tất cả các thuốc gây kéo dài QT.',
        '  3. Sốc điện chuyển nhịp nếu huyết áp tụt nặng hoặc biến đổi thành Rung Thất.'
      ]
    },
    {
      id: 'digitalis_toxicity_case',
      title: 'Cấp Cứu Nội — Ngộ Độc Digoxin / ST Đáy Chén',
      category: 'Rối loạn điện giải',
      difficulty: 'Trung bình',
      patient: { age: 75, sex: 'Nữ', weight: 48, occupation: 'Hưu trí' },
      vitals: { hr: 48, sbp: 110, dbp: 65, spo2: 96, temp: 36.5, rr: 18 },
      symptoms: [
        'Nhìn mọi vật có quầng màu vàng xanh (Xanthopsia)',
        'Buồn nôn, nôn mửa, chán ăn 3 ngày qua',
        'Mệt lả, tim đập chậm chập nhịp'
      ],
      context: 'Bệnh nhân suy tim đang dùng Digoxin 0.25mg/ngày kèm suy thận cấp. ECG ghi nhận ST chênh xuống lõm dạng "đáy chén / muỗng bán nguyệt" và nhịp chậm bộ nối.',
      modifiers: ['digitalis_effect', 'junctional'],
      goldAnswer: 'Ngộ Độc Digoxin (Digitalis Toxicity) — ST Chênh Xuống Dạng Đáy Chén & Nhịp Bộ Nối',
      teachingPoints: [
        'Dấu hiệu ngấm Digoxin: ST chênh xuống lõm cong dạng "đáy chén" (Salvador Dali mustache), QT ngắn, PR kéo dài.',
        'Dấu hiệu Ngộ độc Digoxin: Loạn nhịp phức tạp (Nhịp chậm bộ nối, Ngoại tâm thu thất nhịp đôi, Nhịp nhanh nhĩ kèm Block AV).',
        'Xử trí: Ngừng Digoxin, kiểm tra K+ và Mg2+ máu (hạ K+ làm tăng độc tính Digoxin!), dùng kháng thể Digoxin-Fab (Digibind) nếu ngộ độc nặng.'
      ]
    },
    {
      id: 'rvh_cor_pulmonale_case',
      title: 'Khám Hô Hấp — Phì Đại Thất Phải Do Tâm Phế Mạn (RVH)',
      category: 'Dày buồng tim',
      difficulty: 'Trung bình',
      patient: { age: 67, sex: 'Nam', weight: 52, occupation: 'Hút thuốc lá nặng 40 năm' },
      vitals: { hr: 92, sbp: 130, dbp: 85, spo2: 92, temp: 36.8, rr: 22 },
      symptoms: [
        'Khó thở mạn tính tăng dần khi gắng sức',
        'Ho khạc đờm mạn tính',
        'Phù nhẹ 2 mắt cá chân buổi chiều'
      ],
      context: 'Bệnh nhân COPD giai đoạn nặng. Thăm khám thấy Lồng ngực hình thùng, tim lệch phải, tĩnh mạch cổ nổi nhẹ. ECG ghi nhận Trục lệch phải (+120°), R/S > 1 ở V1 và S sâu ở V5-V6.',
      modifiers: ['rvh', 'rae'],
      goldAnswer: 'Phì Đại Thất Phải (RVH) & Lớn Nhĩ Phải (P Phế) do Tâm Phế Mạn (Cor Pulmonale / COPD)',
      teachingPoints: [
        'Trục điện tim lệch phải (> +110°); Tỷ lệ R/S > 1 ở V1 (Sóng R cao ở V1); S sóng sâu ở V5-V6.',
        'Sóng P phế (P pulmonale) cao nhọn > 2.5mm ở DII, DIII, aVF do lớn nhĩ phải.',
        'Cơ chế: Tăng áp lực động mạch phổi mạn tính do COPD làm tăng sức cản dòng máu, buộc thất phải phì đại bù trừ.'
      ]
    },
    {
      id: 'osborn_hypothermia_case',
      title: 'Cấp Cứu — Hạ Thân Nhiệt Nặng & Sóng Osborn',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      patient: { age: 82, sex: 'Nam', weight: 55, occupation: 'Độc thân' },
      vitals: { hr: 42, sbp: 85, dbp: 50, spo2: 93, temp: 31.5, rr: 12 },
      symptoms: [
        'Lơ mơ, phản xạ chậm, nói ngọng',
        'Toàn thân lạnh ngắt, không run rẩy được',
        'Nhịp tim rất chậm'
      ],
      context: 'Được phát hiện té ngã trên sàn nhà lạnh mùa đông trong 18 giờ. Thân nhiệt trung tâm đo hậu môn 31.5°C. ECG ghi nhận sóng Osborn (J wave notch) nhô tròn tại điểm J ở V2-V5.',
      modifiers: ['osborn_wave', 'sinus_brady'],
      goldAnswer: 'Hạ Thân Nhiệt Nặng (Core Temp 31.5°C) — Sóng Osborn (J wave) & Nhịp Chậm Xoang',
      teachingPoints: [
        'Sóng Osborn (J wave): Sóng nhô lên tròn đặc trưng tại điểm nối J giữa QRS và ST, quan sát thấy rõ ở V2-V5.',
        'Kèm nhịp chậm xoang (42 bpm), khoảng PR, QRS, QT kéo dài lan tỏa.',
        'Xử trí: Ủ ấm chủ động trung tâm (truyền dịch ấm, thở oxy ấm, thảm sưởi ấm). Tránh cử động thô bạo vì dễ gây Rung thất.'
      ]
    },
    {
      id: 'pac_supraventricular_ectopy_case',
      title: 'Khám Tim Mạch — Ngoại Tâm Thu Nhĩ Khởi Phát Đột Ngột',
      category: 'Rối loạn nhịp',
      difficulty: 'Dễ',
      patient: { age: 38, sex: 'Nữ', weight: 52, occupation: 'Giáo viên' },
      vitals: { hr: 78, sbp: 115, dbp: 70, spo2: 99, temp: 36.7, rr: 16 },
      symptoms: [
        'Thỉnh thoảng hẫng ngực nhẹ khi suy nghĩ căng thẳng',
        'Cảm giác tim đập nấc nhẹ'
      ],
      context: 'Khám sức khỏe. ECG ghi nhận các sóng P\' đến sớm có hình dạng khác P xoang, khoảng RR ngắn hơn và nghỉ bù không hoàn toàn.',
      modifiers: ['sinus_normal', 'pac'],
      goldAnswer: 'Ngoại Tâm Thu Nhĩ (PACs / Atrial Premature Complexes)',
      teachingPoints: [
        'Sóng P\' đến sớm biến dạng (khác hình dạng sóng P xoang), khoảng PQ có thể thay đổi.',
        'Phức bộ QRS hẹp bình thường (dẫn truyền xuống thất bình thường). Khoảng nghỉ bù không hoàn toàn.',
        'Thường là biến đổi lành tính do căng thẳng, trà/cà phê, rượu bia. Tiên lượng tốt.'
      ]
    },
    {
      id: 'lpfb_isolated_case',
      title: 'Khám Tim Mạch — Block Phân Nhánh Trái Sau (LPFB)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Khó',
      patient: { age: 61, sex: 'Nam', weight: 68, occupation: 'Kỹ sư' },
      vitals: { hr: 74, sbp: 130, dbp: 80, spo2: 98, temp: 36.6, rr: 16 },
      symptoms: [
        'Không có triệu chứng cơ năng rõ rệt',
        'Tình cờ phát hiện khi khám tổng quát'
      ],
      context: 'Không có tiền sử bệnh tim bẩm sinh hay biến dạng lồng ngực. ECG ghi nhận Trục lệch phải (+120°), dạng rS ở DI, aVL và qR ở DII, DIII, aVF.',
      modifiers: ['lpfb'],
      goldAnswer: 'Block Phân Nhánh Trái Sau Đơn Độc (Left Posterior Fascicular Block - LPFB)',
      teachingPoints: [
        'Trục điện tim lệch phải nghiêm trọng (+90° đến +180°).',
        'Dạng rS ở DI, aVL; Dạng qR ở DII, DIII, aVF.',
        'Cần loại trừ các nguyên nhân khác gây trục lệch phải (RVH, Thuyên tắc phổi, COPD, ngực hẹp) trước khi chẩn đoán LPFB!'
      ]
    },
    {
      id: 'brugada_syndrome_case',
      title: 'Cấp Cứu — Hội Chứng Brugada Type 1 (Cảnh Báo Đột Tử)',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Nâng cao',
      patient: { age: 35, sex: 'Nam', weight: 68, occupation: 'Kỹ sư' },
      vitals: { hr: 72, sbp: 120, dbp: 75, spo2: 98, temp: 36.7, rr: 16 },
      symptoms: [
        'Tiền sử ngất 2 lần khi đang ngủ ban đêm',
        'Gia đình có anh trai đột tử trẻ tuổi (30 tuổi) không rõ nguyên nhân'
      ],
      context: 'Khám vì ngất khi ngủ ban đêm. ECG 12 chuyển đạo ghi nhận ST chênh lên dạng vòm (Coved-type) ≥ 2.5mm kết hợp sóng T âm ở V1-V2.',
      modifiers: ['sinus_normal', 'brugada_type1'],
      goldAnswer: 'Hội Chứng Brugada Type 1 (Brugada Syndrome Type 1) — Nguy cơ cao Rung Thất & Đột Tử',
      teachingPoints: [
        'Dạng vòm (Coved-type): ST chênh lên ≥ 2mm dốc xuống nối liền sóng T âm ở V1, V2.',
        'Di truyền trội trên nhiễm sắc thể thường (đột biến gen kênh Natri SCN5A).',
        'Nguy cơ Rung thất & Đột tử trong lúc ngủ (SUNDS - Sudden Unexplained Nocturnal Death Syndrome).',
        'Chỉ định cấy máy phá rung tự động ICD (Implantable Cardioverter Defibrillator)!'
      ]
    },
    {
      id: 'lgl_syndrome_case',
      title: 'Khám Tim Mạch — Hội Chứng Lown-Ganong-Levine (LGL)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Trung bình',
      patient: { age: 28, sex: 'Nữ', weight: 50, occupation: 'Lập trình viên' },
      vitals: { hr: 76, sbp: 115, dbp: 70, spo2: 99, temp: 36.6, rr: 16 },
      symptoms: [
        'Thỉnh thoảng có các cơn tim đập nhanh dồn dập tự hết',
        'Khám sức khỏe công ty'
      ],
      context: 'Tiền sử có cơn hồi hộp. ECG ghi nhận khoảng PR ngắn = 100ms (< 0.12s) nhưng phức bộ QRS hẹp bình thường (80ms) và KHÔNG CÓ sóng Delta.',
      modifiers: ['lgl'],
      goldAnswer: 'Hội Chứng Lown-Ganong-Levine (LGL Syndrome)',
      teachingPoints: [
        'Tam chứng LGL: PR ngắn < 0.12s, QRS hẹp bình thường, KHÔNG CÓ sóng Delta.',
        'Phân biệt với WPW: WPW có sóng Delta và QRS giãn rộng. LGL có QRS hẹp hoàn toàn.',
        'Cơ chế: Xung điện đi qua đường phụ James nối từ nhĩ thẳng tới bó His.',
        'Dễ gây ra các cơn nhịp nhanh vào lại trên thất.'
      ]
    },
    {
      id: 'av_block_2_mobitz2_case',
      title: 'Cấp Cứu Tim Mạch — Block AV Độ II Mobitz II Dẫn Truyền 2:1',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Khó',
      patient: { age: 71, sex: 'Nam', weight: 65, occupation: 'Cán bộ hưu trí' },
      vitals: { hr: 48, sbp: 105, dbp: 60, spo2: 95, temp: 36.5, rr: 18 },
      symptoms: [
        'Choáng váng, xây sẩm mặt mày khi đi lại',
        'Mệt mỏi toàn thân'
      ],
      context: 'Tiền sử nhồi máu cơ tim cũ. Khám nghe tim thấy nhịp chậm đều 48 l/phút. ECG ghi nhận khoảng PR cố định nhưng cứ 2 sóng P lại có 1 sóng P bị block không dẫn được QRS.',
      modifiers: ['av_block_2_mobitz2'],
      goldAnswer: 'Block Nhĩ - Thất Độ II Mobitz II (Dẫn truyền AV tỷ lệ 2:1)',
      teachingPoints: [
        'Khoảng PR của các nhịp dẫn truyền cố định hoàn toàn (không dài dần như Mobitz I!).',
        'Đột ngột có sóng P ngưng truyền không có QRS đi sau.',
        'Tổn thương dưới nút AV (bó His hoặc nhánh His). Tiên lượng xấu, nguy cơ cao chuyển thành Block AV độ III hoàn toàn!',
        'Chỉ định đặt máy tạo nhịp tim.'
      ]
    },
    {
      id: 'prinzmetal_angina_case',
      title: 'Cấp Cứu Đêm — Đau Thắt Ngực Prinzmetal (Co Thắt Mạch Vành)',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      patient: { age: 46, sex: 'Nữ', weight: 54, occupation: 'Doanh nhân' },
      vitals: { hr: 90, sbp: 130, dbp: 80, spo2: 97, temp: 36.8, rr: 18 },
      symptoms: [
        'Đau thắt ngực dữ dội khởi phát lúc 4 giờ sáng khi đang ngủ',
        'Vã mồ hôi, hết đau sau 10 phút'
      ],
      context: 'Đau ngực kịch phát thường xuyên xảy ra vào nửa đêm / sáng sớm khi nghỉ ngơi. ECG ghi nhận lúc lên cơn có ST chênh lên vòm ở V2-V4, khi hết đau ST trở về bình thường hoàn toàn.',
      modifiers: ['prinzmetal_angina'],
      goldAnswer: 'Đau Thắt Ngực Biến Thái Prinzmetal (Prinzmetal / Vasospastic Angina) do Co Thắt Động Mạch Vành',
      teachingPoints: [
        'ST chênh lên thoáng qua trong cơn đau ngực lúc nghỉ ngơi (thường về đêm / sáng sớm).',
        'Sinh lý bệnh: Co thắt cấp tính động mạch vành (Coronary vasospasm) gây thiếu máu cơ tim xuyên thành tạm thời.',
        'Điều trị: Thuốc chẹn kênh Calcium (Amlodipine / Diltiazem) + Nitrate. CHỐNG CHỈ ĐỊNH thuốc chẹn Beta không chọn lọc (như Propranolol) vì làm tăng co thắt mạch vành!'
      ]
    },
    {
      id: 'sah_cerebral_t_waves_case',
      title: 'Cấp Cứu Thần Kinh — Xuất Huyết Dưới Nhện (Cerebral T Waves)',
      category: 'Rối loạn điện giải',
      difficulty: 'Nâng cao',
      patient: { age: 50, sex: 'Nữ', weight: 58, occupation: 'Công chức' },
      vitals: { hr: 58, sbp: 175, dbp: 105, spo2: 96, temp: 37.0, rr: 20 },
      symptoms: [
        'Đau đầu dữ dội như búa bổ đột ngột xuất hiện',
        'Nôn mửa vọt, lơ mơ',
        'Cổ cứng (+)'
      ],
      context: 'Nhập viện vì nghi ngờ đột quỵ xuất huyết não cấp. ECG ghi nhận sóng T âm rất rộng và sâu đối xứng (Cerebral T waves) ở V1-V6 và DI, aVL kèm QTc kéo dài 520ms.',
      modifiers: ['cerebral_t_waves'],
      goldAnswer: 'Sóng T Âm Khổng Lồ Do Não (Cerebral T Waves) / Xuất Huyết Dưới Nhện (SAH)',
      teachingPoints: [
        'Sóng T âm rất rộng, sâu đối xứng (Giant inverted T waves) ở các chuyển đạo trước ngực kèm QTc kéo dài.',
        'Cơ chế: Bão Catecholamine giao cảm do tăng áp lực nội sọ cấp tính (gặp trong Xuất huyết dưới nhện, Xuất huyết brain).',
        'Tránh nhầm lẫn với Thiếu máu cơ tim cấp! Chỉ định chụp CT Scanner Sọ Não khẩn cấp.'
      ]
    },
    {
      id: 'long_qt_congenital_case',
      title: 'Khám Tim Mạch Nhi — Hội Chứng QT Dài Bẩm Sinh (LQTS)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Nâng cao',
      patient: { age: 16, sex: 'Nữ', weight: 45, occupation: 'Học sinh' },
      vitals: { hr: 65, sbp: 110, dbp: 70, spo2: 99, temp: 36.6, rr: 16 },
      symptoms: [
        'Đột ngột ngất xỉu khi giật mình nghe tiếng chuông báo thức hoặc khi bơi lội',
        'Tiền sử ngất nhiều lần'
      ],
      context: 'Đo ECG lúc nghỉ ghi nhận khoảng QTc kéo dài 510ms (Bazett formula), sóng T rộng có khuyết đỉnh.',
      modifiers: ['sinus_normal'],
      goldAnswer: 'Hội Chứng QT Dài Bẩm Sinh (Congenital Long QT Syndrome - LQTS)',
      teachingPoints: [
        'Khoảng QTc kéo dài > 480ms ở Nữ / > 470ms ở Nam.',
        'Nguy cơ cao xuất hiện cơn Xoắn Đỉnh (Torsades de Pointes) khi căng thẳng cảm xúc, giật mình tiếng động hoặc gắng sức bơi lội.',
        'Các thể gen: LQTS1 (ngất khi bơi lội), LQTS2 (ngất do tiếng động mạnh/chuông), LQTS3 (ngất khi ngủ).',
        'Điều trị: Chẹn Beta (Nadolol / Propranolol) + Cấy máy ICD nếu nguy cơ cao.'
      ]
    },
    {
      id: 'hypercalcemia_short_qt_case',
      title: 'Cấp Cứu Ung Bướu — Tăng Calci Máu Nặng / QT Ngắn',
      category: 'Rối loạn điện giải',
      difficulty: 'Trung bình',
      patient: { age: 63, sex: 'Nam', weight: 55, occupation: 'Ung thư phổi di căn xương' },
      vitals: { hr: 78, sbp: 130, dbp: 80, spo2: 95, temp: 37.1, rr: 20 },
      symptoms: [
        'Táo bón nặng, lơ mơ, yếu cơ toàn thân',
        'Uống nhiều nước, tiểu nhiều',
        'Đau xương lan tỏa'
      ],
      context: 'Xét nghiệm Calci toàn phần máu = 3.6 mmol/L (Tăng Calci máu nặng). ECG ghi nhận khoảng QT rút ngắn đặc trưng (280ms) do biến mất đoạn ST.',
      modifiers: ['hypercalcemia'],
      goldAnswer: 'Tăng Calci Máu Nặng (Ca2+ = 3.6 mmol/L) — Rút Ngắn Khoảng QT',
      teachingPoints: [
        'Khoảng QT rút ngắn đặc trưng (< 320ms) do đoạn ST bị ngắn lại hoặc mất hẳn (sóng T bắt đầu ngay sau QRS).',
        'Nguy cơ: Gây loạn nhịp thất hoặc ngưng tim ở thì tâm thu!',
        'Xử trí: Truyền dịch NaCl 0.9% khối lượng lớn + Thuốc lợi tiểu quai (Furosemide) + Bisphosphonate / Calcitonin.'
      ]
    },
    {
      id: 'pvc_multifocal_couplet_case',
      title: 'Cấp Cứu Tim Mạch — Ngoại Tâm Thu Thất Đa Ổ Đi Cặp (Couplets)',
      category: 'Rối loạn nhịp',
      difficulty: 'Khó',
      patient: { age: 64, sex: 'Nam', weight: 68, occupation: 'Hưu trí' },
      vitals: { hr: 85, sbp: 115, dbp: 70, spo2: 96, temp: 36.7, rr: 18 },
      symptoms: [
        'Cảm giác tim đập loạn nhịp, hồi hộp liên tục',
        'Thỉnh thoảng mệt thắt ngực'
      ],
      context: 'Theo dõi monitor Cấp cứu. ECG ghi nhận các ngoại tâm thu thất có 2 dạng QRS khác nhau (đa ổ) xuất hiện thành từng cặp 2 nhát liên tiếp (Couplets).',
      modifiers: ['pvc_isolated'],
      goldAnswer: 'Ngoại Tâm Thu Thất Đa Ổ Đi Cặp (Multifocal PVC Couplets) — Cảnh báo dọa Nhịp Nhanh Thất',
      teachingPoints: [
        'Dạng QRS của ngoại tâm thu thất khác nhau (đa ổ - Multifocal) chứng tỏ có nhiều ổ phát nhịp bất thường ở thất.',
        'Xuất hiện 2 nhát liên tiếp (Couplet) là dấu hiệu cảnh báo cao độ tiến triển thành Nhịp Nhanh Thất (VT) hoặc Rung Thất (VF)!',
        'Xử trí: Đánh giá và bù điện giải (K+, Mg2+), kiểm soát thiếu máu cục bộ cơ tim, dùng thuốc chống loạn nhịp (Amiodarone / Chẹn Beta).'
      ]
    },
    {
      id: 'rae_p_pulmonale_case',
      title: 'Khám Hô Hấp — Lớn Nhĩ Phải (P Phế / RAE)',
      category: 'Dày buồng tim',
      difficulty: 'Dễ',
      patient: { age: 55, sex: 'Nam', weight: 58, occupation: 'Hen suyễn & Tăng áp phổi' },
      vitals: { hr: 88, sbp: 125, dbp: 80, spo2: 94, temp: 36.6, rr: 20 },
      symptoms: [
        'Khó thở khi đi bộ xa',
        'Ho thỉnh thoảng về đêm'
      ],
      context: 'Khám phòng khám hô hấp. ECG ghi nhận sóng P cao nhọn biên độ 3.0mm (> 2.5mm) ở DII, DIII, aVF.',
      modifiers: ['rae'],
      goldAnswer: 'Lớn Nhĩ Phải (P Phế / Right Atrial Enlargement - RAE)',
      teachingPoints: [
        'Sóng P cao nhọn > 2.5mm ở DII, DIII, aVF (P phế / P pulmonale).',
        'Khử cực nhĩ phải chiếm ưu thế tạo ra biên độ sóng P tăng cao ở các chuyển đạo dưới.',
        'Thường gặp trong: Tăng áp động mạch phổi, COPD, Hẹp van 3 lá, Bệnh tim bẩm sinh có luồng thông Phải-Trái.'
      ]
    },
    {
      id: 'lae_p_mitrale_case',
      title: 'Khám Tim Mạch — Lớn Nhĩ Trái (P Hai Lá / LAE)',
      category: 'Dày buồng tim',
      difficulty: 'Dễ',
      patient: { age: 52, sex: 'Nữ', weight: 50, occupation: 'Hẹp Van 2 Lá' },
      vitals: { hr: 75, sbp: 120, dbp: 75, spo2: 97, temp: 36.6, rr: 18 },
      symptoms: [
        'Khó thở nhẹ khi gắng sức',
        'Ho thỉnh thoảng khi nằm'
      ],
      context: 'Siêu âm tim có Hẹp van 2 lá vừa. ECG ghi nhận sóng P rộng 0.14s (> 0.12s) có 2 đỉnh chữ M ở DII và pha âm sóng P ở V1 rộng sâu.',
      modifiers: ['lae'],
      goldAnswer: 'Lớn Nhĩ Trái (P Hai Lá / Left Atrial Enlargement - LAE)',
      teachingPoints: [
        'Sóng P rộng > 0.12s có 2 đỉnh (P hai lá / P mitrale) ở DII (khoảng cách giữa 2 đỉnh > 0.04s).',
        'Pha âm của sóng P ở V1 rộng và sâu > 1mm × 0.04s (Chỉ số Morris).',
        'Cơ chế: Khử cực nhĩ trái bị kéo dài do buồng nhĩ trái bị giãn to. Thường gặp trong Hẹp/Hở van 2 lá, Tăng huyết áp mạn, Suy tim trái.'
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TÌNH HUỐNG MỚI — Nguồn: 150 ECG Problems (Hampton, 4th ed.)
    // ═══════════════════════════════════════════════════════════════

    {
      id: 'sinus_arrhythmia_student_case',
      title: 'Khám Sức Khỏe — Sinh Viên Y Khoa ECG "Bất Thường"',
      category: 'Rối loạn nhịp',
      difficulty: 'Dễ',
      patient: { age: 20, sex: 'Nam', weight: 65, occupation: 'Sinh viên Y khoa' },
      vitals: { hr: 70, sbp: 115, dbp: 70, spo2: 99, temp: 36.6, rr: 14 },
      symptoms: [
        'Không có triệu chứng gì',
        'ECG được ghi trong buổi thực hành lâm sàng',
        'Nhịp tim dao động từ 60-80 l/phút theo chu kỳ thở'
      ],
      context: 'Sinh viên y khoa được ghi ECG trong buổi thực hành tại khoa Tim mạch. Nghe tim hoàn toàn bình thường. Nhịp tim thấy không đều khi đếm mạch. Giáo viên yêu cầu sinh viên tự đọc ECG của chính mình.',
      modifiers: ['sinus_arrhythmia'],
      goldAnswer: 'ECG Bình Thường với Loạn Nhịp Xoang Hô Hấp (Sinus Arrhythmia) — Biến thể sinh lý bình thường',
      teachingPoints: [
        'Loạn nhịp xoang: Khoảng PP/RR thay đổi theo chu kỳ hô hấp — nhanh hơn khi hít vào, chậm hơn khi thở ra.',
        'Hình dạng sóng P hoàn toàn bình thường và đồng nhất (phân biệt với Ngoại tâm thu nhĩ có sóng P biến dạng).',
        'Cơ chế: Tăng trương lực dây X trong thì thở ra làm chậm nhịp. Rất phổ biến ở người trẻ và vận động viên.',
        'Không cần điều trị! Biến mất khi gắng sức. Không nhầm với Hội chứng nút xoang bệnh lý.'
      ]
    },
    {
      id: 'dextrocardia_case',
      title: 'Khám Sức Khỏe Định Kỳ — ECG Đảo Ngược Lạ Kỳ (Dextrocardia)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Trung bình',
      patient: { age: 25, sex: 'Nam', weight: 68, occupation: 'Nhân viên ngân hàng' },
      vitals: { hr: 70, sbp: 120, dbp: 75, spo2: 99, temp: 36.7, rr: 16 },
      symptoms: [
        'Khám sức khỏe định kỳ đi làm',
        'Hoàn toàn khỏe mạnh, không triệu chứng'
      ],
      context: 'Khám sức khỏe định kỳ. ECG ghi nhận hình ảnh rất bất thường: sóng P âm ở DI, trục lệch phải, sóng R ưu thế ở aVR và QRS giảm dần từ V1 sang V6. Nghe tim thấy mỏm tim bên PHẢI lồng ngực.',
      modifiers: ['lpfb'],
      goldAnswer: 'Tim Vị Phải (Dextrocardia) — Tim nằm ở ngực phải thay vì ngực trái bình thường',
      teachingPoints: [
        'Dấu hiệu ECG điển hình của Dextrocardia: Sóng P âm ở DI (đảo cực điện trục), Trục lệch phải mạnh, Sóng R giảm dần từ V1 sang V6 (ngược bình thường).',
        'Sóng R ưu thế ở aVR (thay vì aVL như bình thường).',
        'Loại trừ nguyên nhân kỹ thuật: Đổi chuyển đạo tay phải-trái làm sóng P trở lại dương ở DI. Chest leads V1-V6 không bị ảnh hưởng nếu chỉ đổi chuyển đạo tay.',
        'Nhiều bệnh nhân Dextrocardia sống hoàn toàn bình thường. Siêu âm tim đánh giá xem có kèm tim bẩm sinh (Situs Inversus Totalis) hay không.'
      ]
    },
    {
      id: 'rbbb_asd_case',
      title: 'Khám Nhi Tim Mạch — Tim Thông Liên Nhĩ (ASD) Phát Hiện Tình Cờ',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Trung bình',
      patient: { age: 15, sex: 'Nam', weight: 48, occupation: 'Học sinh' },
      vitals: { hr: 83, sbp: 110, dbp: 65, spo2: 98, temp: 36.8, rr: 16 },
      symptoms: [
        'Không triệu chứng cơ năng, phát hiện tình cờ qua thăm khám',
        'Cha mẹ lo lắng vì nghe tim có tiếng lạ'
      ],
      context: 'Khám nhi vì phát hiện tiếng thổi tim tâm thu ở bờ trái xương ức. Tiếng T2 tách đôi rộng CỐ ĐỊNH không thay đổi theo hô hấp (khác với tách đôi sinh lý). ECG ghi nhận dạng RBBB với trục lệch phải nhẹ, RSR\' ở V1-V3.',
      modifiers: ['rbbb'],
      goldAnswer: 'Block Nhánh Phải (RBBB) do Thông Liên Nhĩ (Atrial Septal Defect - ASD)',
      teachingPoints: [
        'RBBB dạng RSR\' ở V1-V3 với sóng S rộng sâu ở V5-V6 và DI. QRS >= 120ms.',
        'Thông liên nhĩ (ASD): Lỗ thông nối nhĩ phải và nhĩ trái, tăng lưu lượng máu qua phổi, giãn thất phải, dẫn đến RBBB.',
        'Tiếng T2 tách đôi CỐ ĐỊNH (không thay đổi hô hấp) là đặc trưng của ASD — khác với tách đôi sinh lý thay đổi theo hô hấp.',
        'Siêu âm tim với Doppler màu để xác định chẩn đoán. Điều trị: Đóng lỗ thông qua da (catheter "umbrella") hoặc phẫu thuật tim hở.'
      ]
    },
    {
      id: 'poor_r_wave_old_anterior_mi_case',
      title: 'Khám Nội Tim Mạch — Khó Thở & Đau Ngực Gắng Sức Mạn Tính',
      category: 'Bệnh mạch vành',
      difficulty: 'Trung bình',
      patient: { age: 65, sex: 'Nam', weight: 72, occupation: 'Hưu trí' },
      vitals: { hr: 48, sbp: 130, dbp: 80, spo2: 97, temp: 36.6, rr: 16 },
      symptoms: [
        'Khó thở khi leo cầu thang và đi bộ nhanh',
        'Đau ngực kiểu thắt tăng khi gắng sức, nghỉ tự hết',
        'Không nhớ có đau ngực cấp tính nào trong quá khứ'
      ],
      context: 'Khám ngoại trú. ECG ghi nhận nhịp chậm xoang (48 l/phút), sóng R rất nhỏ ở V2-V4 và xuất hiện R bình thường đột ngột ở V5 — "Poor R wave progression". Không có sóng Q rõ ràng.',
      modifiers: ['sinus_brady', 'nstemi'],
      goldAnswer: 'Tiến Triển R Kém (Poor R Wave Progression) — Gợi ý Nhồi Máu Cơ Tim Thành Trước Cũ Im Lặng',
      teachingPoints: [
        '"Poor R wave progression": Sóng R ở V2-V4 rất nhỏ (< 3mm), sau đó đột ngột R bình thường ở V5 — không có sự tăng dần sinh lý.',
        'Không nhất thiết phải có sóng Q hoại tử mới nghĩ đến nhồi máu cũ — tiến triển R kém là dấu hiệu tương đương.',
        'Chẩn đoán phân biệt: Đặt điện cực ngực không đúng vị trí (cần đặt lại), Phì đại thất phải (RBBB), COPD (lồng ngực hình thùng xoay ngược).',
        'Cần: Lặp lại ECG đặt điện cực đúng vị trí. Siêu âm tim + Stress test/Xạ hình cơ tim để khảo sát chức năng và thiếu máu.'
      ]
    },
    {
      id: 'aortic_dissection_mi_case',
      title: 'Cấp Cứu Tim Mạch — Đau Ngực-Lưng Đột Ngột Như Dao Xé',
      category: 'Bệnh mạch vành',
      difficulty: 'Nâng cao',
      patient: { age: 50, sex: 'Nam', weight: 82, occupation: 'Nhân viên văn phòng' },
      vitals: { hr: 88, sbp: 160, dbp: 90, spo2: 95, temp: 36.8, rr: 20 },
      symptoms: [
        'Đau ngực dữ dội NGAY TỨC KHẮC như dao xé từ trước ra sau lưng',
        'Đau lan ra sau lưng và bụng dưới',
        'Huyết áp tay phải 160mmHg, tay trái 140mmHg (chênh 20mmHg)'
      ],
      context: 'Cấp cứu đau ngực-lưng đột ngột. ECG ghi nhận dấu hiệu STEMI thành dưới (ST chênh lên DII, DIII, aVF). X-quang ngực thấy trung thất giãn rộng. Tiền sử tăng huyết áp không điều trị nhiều năm.',
      modifiers: ['sinus_normal', 'stemi_inferior'],
      goldAnswer: 'Phình Tách Động Mạch Chủ (Aortic Dissection) TYPE A Gây Nhồi Máu Cơ Tim Thứ Phát',
      teachingPoints: [
        'Bóc tách ĐM chủ type A có thể lan tới lỗ vào ĐM vành phải (RCA) gây STEMI thành dưới thứ phát — KHÔNG phải STEMI nguyên phát!',
        'Dấu hiệu phân biệt: Đau lan ra LƯNG ngay lập tức (như dao xé), Huyết áp chênh lệch 2 tay > 20mmHg, Trung thất rộng trên Xquang, Tiền sử THA nặng.',
        'TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH Thrombolysis / Heparin liều cao khi nghi bóc tách ĐM chủ — Gây chảy máu ào ạt vào khoang bóc tách gây tử vong!',
        'Chẩn đoán xác định: CT ĐM chủ có cản quang khẩn cấp. Điều trị: Phẫu thuật tim hở khẩn cấp (Type A) hoặc can thiệp nội mạch (Type B).'
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // TÌNH HUỐNG MỚI — Nguồn: International Criteria 2017 (704.full.md)
    // ECG Vận Động Viên: Biến Thể Bình Thường & Bất Thường
    // ═══════════════════════════════════════════════════════════════

    {
      id: 'athlete_sinus_brady_case',
      title: 'Tầm Soát VĐV — Nhịp Chậm Xoang Sinh Lý',
      category: 'Rối loạn nhịp',
      difficulty: 'Dễ',
      patient: { age: 24, sex: 'Nam', weight: 72, occupation: 'Vận động viên chạy marathon chuyên nghiệp' },
      vitals: { hr: 42, sbp: 110, dbp: 65, spo2: 99, temp: 36.5, rr: 12 },
      symptoms: [
        'Không triệu chứng gì bất thường',
        'Tập luyện 6-8 giờ/ngày, 6 ngày/tuần trong 5 năm',
        'Khám tầm soát tim mạch trước mùa thi đấu quốc tế'
      ],
      context: 'Tầm soát tim mạch theo tiêu chuẩn UEFA/IOC. VĐV marathon chuyên nghiệp tập luyện cường độ cao kéo dài. ECG nghỉ ghi nhận nhịp chậm xoang 42 l/phút. Không tiền sử ngất, không gia đình đột tử trẻ. Khi đi bộ nhanh 3 phút, nhịp tim tăng về 80 l/phút bình thường.',
      modifiers: ['sinus_brady'],
      goldAnswer: 'Nhịp Chậm Xoang Sinh Lý ở Vận Động Viên (Athlete\'s Sinus Bradycardia) — Biến thể bình thường',
      teachingPoints: [
        'Theo tiêu chuẩn quốc tế 2017 (BJSM): Nhịp chậm xoang >= 30 bpm ở VĐV khỏe mạnh là BÌNH THƯỜNG sinh lý — không cần khảo sát thêm.',
        'Cơ chế: Tập luyện bền bỉ tăng trương lực dây X mạn tính; thất trái to, thể tích nhát bóp tăng, giảm tần số tim để duy trì cung lượng tim.',
        'Phân biệt với Bệnh nút xoang bệnh lý: VĐV khỏe mạnh nhịp PHẢI tăng bình thường khi gắng sức; không ngất; PR < 400ms; không nhịp ngừng > 3 giây.',
        'Chỉ cần thêm khảo sát khi: HR < 30 bpm, Ngất/tiền ngất, Nhịp ngừng dài bất thường, Không đáp ứng nhịp khi gắng sức.'
      ]
    },
    {
      id: 'early_repolarization_athlete_case',
      title: 'Tầm Soát VĐV — Tái Cực Sớm Lành Tính',
      category: 'Rối loạn nhịp',
      difficulty: 'Dễ',
      patient: { age: 22, sex: 'Nam', weight: 80, occupation: 'Cầu thủ bóng đá chuyên nghiệp' },
      vitals: { hr: 58, sbp: 115, dbp: 65, spo2: 99, temp: 36.6, rr: 14 },
      symptoms: [
        'Không có triệu chứng tim mạch nào',
        'Tập bóng đá chuyên nghiệp 5-6 buổi/tuần',
        'Khám tầm soát tim trước mùa giải'
      ],
      context: 'Tầm soát tim mạch trước mùa giải bóng đá. ECG 12 chuyển đạo: Nhịp chậm 58 bpm, J-point chênh lên 1-2mm kèm ST lõm (concave) và sóng T cao nhọn ở DII, aVF, V4-V6. Điện thế QRS cao đáp ứng tiêu chuẩn Sokolow-Lyon.',
      modifiers: ['sinus_brady', 'lvh'],
      goldAnswer: 'Tim Vận Động Viên (Athlete\'s Heart) — Tái Cực Sớm (Early Repolarization) & Tăng Điện Thế QRS',
      teachingPoints: [
        'Tái cực sớm (Early Repolarization): J-point chênh lên >= 1mm, ST lõm lên (concave), T cao nhọn ở DI/DII/aVF/V4-V6. Gặp ở 45% VĐV da trắng.',
        'Tăng điện thế QRS đơn độc ở VĐV là BÌNH THƯỜNG — phản ánh tăng thể tích thất trái do tập luyện, KHÔNG phải bệnh lý HCM.',
        'LVH lành tính: T thuận chiều cao. LVH bệnh lý: T âm/ST chênh xuống ở V5-V6 (Strain pattern) — cần khảo sát thêm.',
        'Theo tiêu chuẩn QT 2017: Isolated voltage criteria for LVH ở VĐV KHÔNG cần khảo sát nếu KHÔNG có T âm/ST chênh xuống/Q bệnh lý đi kèm.'
      ]
    },
    {
      id: 'junctional_rhythm_athlete_case',
      title: 'Tầm Soát VĐV — Nhịp Bộ Nối Khi Nghỉ',
      category: 'Rối loạn nhịp',
      difficulty: 'Trung bình',
      patient: { age: 28, sex: 'Nam', weight: 75, occupation: 'Vận động viên chèo thuyền' },
      vitals: { hr: 48, sbp: 110, dbp: 65, spo2: 99, temp: 36.7, rr: 14 },
      symptoms: [
        'Không triệu chứng, khám định kỳ bắt buộc',
        'Tập chèo thuyền đua 4-6 giờ/ngày',
        'Không thấy sóng P rõ trên monitor theo dõi'
      ],
      context: 'Tầm soát tim mạch VĐV chuyên nghiệp. ECG ghi nhận nhịp đều 48 bpm, QRS hẹp bình thường. Sóng P không rõ ràng hoặc P âm xuất hiện ngay trước/sau QRS. Sau 3 phút đi bộ nhanh, nhịp tim chuyển về nhịp xoang 82 bpm bình thường.',
      modifiers: ['junctional'],
      goldAnswer: 'Nhịp Bộ Nối Khi Nghỉ (Junctional Escape Rhythm) ở Vận Động Viên — Biến thể sinh lý',
      teachingPoints: [
        'Nhịp bộ nối ở VĐV: QRS hẹp đều (KHÔNG phải VT!), tần số 40-60 bpm. P âm hoặc ẩn — nút AV chủ nhịp thay vì nút xoang.',
        'Cơ chế: Trương lực dây X tăng mạn tính làm nút xoang chậm hơn nút AV — nút AV "thay thế" làm chủ nhịp bù trừ.',
        'Theo tiêu chuẩn 2017: Junctional escape rhythm ở VĐV là BÌNH THƯỜNG khi nhịp tự chuyển về xoang khi gắng sức. Gặp khoảng 8% VĐV thi đấu.',
        'Cần đánh giá thêm nếu: Không chuyển về xoang khi gắng sức, QRS rộng bất thường, Tần số < 35 bpm, Triệu chứng ngất/tiền ngất.'
      ]
    },
    {
      id: 'rbbb_athlete_benign_case',
      title: 'Tầm Soát VĐV — Block Nhánh Phải Không Hoàn Toàn Sinh Lý',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Dễ',
      patient: { age: 20, sex: 'Nam', weight: 85, occupation: 'Vận động viên bơi lội' },
      vitals: { hr: 52, sbp: 115, dbp: 68, spo2: 99, temp: 36.6, rr: 14 },
      symptoms: [
        'Hoàn toàn không triệu chứng',
        'Khám tầm soát trước mùa thi đấu quốc tế',
        'Tập luyện bơi lội 7-8 giờ/ngày'
      ],
      context: 'Tầm soát tim mạch VĐV. ECG ghi nhận dạng rSR\' ở V1 với QRS < 120ms (chưa hoàn toàn), sóng S rộng nhẹ ở DI và V6. Không có ST-T bất thường. Siêu âm tim: Thất phải giãn nhẹ (thể tích tăng sinh lý), chức năng bơm máu hoàn toàn bình thường.',
      modifiers: ['rbbb'],
      goldAnswer: 'Block Nhánh Phải KHÔNG Hoàn Toàn (Incomplete RBBB) ở Vận Động Viên — Biến thể bình thường',
      teachingPoints: [
        'Incomplete RBBB: QRS < 120ms với dạng rSR\' ở V1 và sóng S rộng ở DI/V6.',
        'Theo tiêu chuẩn Quốc tế 2017: Incomplete RBBB là BÌNH THƯỜNG ở VĐV — phản ánh thất phải tái cấu trúc sinh lý (giãn thể tích), không phải bệnh lý dẫn truyền.',
        'Complete RBBB (QRS >= 120ms) ở VĐV cần khảo sát thêm để loại trừ: ASD, ARVC (bệnh cơ tim thất phải dạng sinh loạn nhịp), Brugada.',
        'Cơ chế incomplete RBBB ở VĐV: Thất phải giãn to sinh lý làm thời gian dẫn truyền tăng nhẹ → rSR\' ở V1. Có thể tự hồi phục khi ngừng tập luyện.'
      ]
    },
    {
      id: 'wpw_young_athlete_risk_case',
      title: 'Tầm Soát VĐV — WPW Nguy Cơ Cao Cần Triệt Đốt',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Nâng cao',
      patient: { age: 18, sex: 'Nam', weight: 65, occupation: 'Vận động viên điền kinh' },
      vitals: { hr: 68, sbp: 115, dbp: 70, spo2: 99, temp: 36.8, rr: 16 },
      symptoms: [
        'Tiền sử 2 cơn tim đập nhanh > 200 l/phút tự hết trong 6 tháng qua',
        'Ngất 1 lần khi đang thi chạy 800m',
        'Hiện tại hoàn toàn bình thường khi khám'
      ],
      context: 'VĐV điền kinh trẻ với tiền sử nhịp nhanh và ngất 1 lần khi gắng sức. ECG 12 chuyển đạo ghi nhận PR ngắn 100ms, sóng Delta rõ và QRS giãn rộng 130ms điển hình. Không triệu chứng hiện tại. Cần đánh giá nguy cơ đột tử.',
      modifiers: ['wpw'],
      goldAnswer: 'Hội Chứng WPW ở Vận Động Viên — Nguy Cơ CAO Cần Triệt Đốt Đường Phụ Ngay',
      teachingPoints: [
        'WPW ở VĐV là ECG BẤT THƯỜNG theo tiêu chuẩn Quốc tế 2017 — cần đánh giá điện sinh lý (EPS) bắt buộc.',
        'Cơ chế nguy hiểm: Rung nhĩ dẫn truyền nhanh qua đường phụ Kent (bỏ qua nút AV) → QRS rộng tần số 250-300 bpm → Rung thất → Đột tử!',
        'Yếu tố nguy cơ CAO: (1) Ngất khi gắng sức, (2) Cơn AVRT có triệu chứng, (3) Khoảng RR ngắn nhất < 250ms trong rung nhĩ (EPS).',
        'Chỉ định: Triệt đốt đường phụ qua catheter (RF Catheter Ablation) trước khi cho phép thi đấu. VĐV WPW có triệu chứng PHẢI ngừng thi đấu đến khi được ablation thành công.'
      ]
    },
    {
      id: 'black_athlete_ecg_variant_case',
      title: 'Tầm Soát VĐV — Biến Thể Tái Cực VĐV Da Đen',
      category: 'Rối loạn nhịp',
      difficulty: 'Khó',
      patient: { age: 21, sex: 'Nam', weight: 88, occupation: 'Cầu thủ bóng rổ người Mỹ gốc Phi' },
      vitals: { hr: 55, sbp: 120, dbp: 70, spo2: 99, temp: 36.7, rr: 14 },
      symptoms: [
        'Hoàn toàn không triệu chứng',
        'Tập bóng rổ chuyên nghiệp 5-6 giờ/ngày',
        'Lo lắng vì bị báo "ECG bất thường"'
      ],
      context: 'Tầm soát tim mạch VĐV bóng rổ chuyên nghiệp. ECG: Điện thế QRS cao (Sokolow-Lyon > 40mm), J-point elevation và ST chênh lên dạng vòm (convex/domed) ở V1-V4, tiếp theo là sóng T âm ở V1-V4. Không triệu chứng, không gia đình đột tử. Siêu âm tim: Hoàn toàn bình thường.',
      modifiers: ['sinus_brady', 'rvh'],
      goldAnswer: 'Biến Thể Tái Cực Bình Thường ở VĐV Da Đen (Black Athlete\'s ECG) — Không phải bệnh lý!',
      teachingPoints: [
        'Tiêu chuẩn Quốc tế 2017: T âm ở V1-V4 SAU J-point elevation và ST dạng vòm (convex/domed) ở VĐV da đen là BIẾN THE BINH THUONG — KHÔNG cần khảo sát thêm.',
        'Dịch tễ học: Gặp ở 13% VĐV da đen nam (so với 4% người da đen không tập luyện) — phản ánh đặc điểm tái cực di truyền + thích nghi tập luyện.',
        'Phân biệt với BỆNH LÝ nguy hiểm: T âm KHÔNG có J-elevation đứng trước gợi ý ARVC hoặc HCM. T âm lan rộng V5-V6 cần khảo sát MRI tim.',
        'Nguyên tắc "Seattle 2017": T âm kèm J-elevation + convex ST → Bình thường ở VĐV da đen. T âm đơn thuần không có J-elevation hoặc lan V5-V6 → Cần MRI tim.'
      ]
    },
    {
      id: 'wenckebach_inferior_stemi_case',
      title: 'Cấp Cứu Tim Mạch — STEMI Thành Dưới Kèm Block Wenckebach Lành Tính',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      patient: { age: 70, sex: 'Nam', weight: 68, occupation: 'Cán bộ hưu trí' },
      vitals: { hr: 52, sbp: 100, dbp: 60, spo2: 94, temp: 37.0, rr: 20 },
      symptoms: [
        'Đau thắt ngực dữ dội vùng thượng vị kéo dài 2 giờ',
        'Buồn nôn, nôn mửa, vã mồ hôi lạnh',
        'Tim đập chậm, thỉnh thoảng cảm giác hẫng nhịp'
      ],
      context: 'Cấp cứu đau ngực thượng vị. ECG: ST chênh lên ở DII, DIII, aVF kèm soi gương ST chênh xuống ở DI, aVL. Trên dải nhịp: PR dài dần rồi bị mất một nhịp QRS lặp đi lặp lại (chu kỳ Wenckebach). HR 52 bpm. Troponin đang chờ kết quả.',
      modifiers: ['sinus_brady', 'stemi_inferior', 'av_block_2_wenckebach'],
      goldAnswer: 'STEMI Thành Dưới Cấp Kèm Block AV Độ II Mobitz I (Wenckebach) / Nhịp Chậm Xoang',
      teachingPoints: [
        'Block Wenckebach (Mobitz I) kèm STEMI thành dưới là LÀNH TÍNH — cùng nguồn máu từ RCA cấp cho nút AV và thành dưới thất trái.',
        'Mobitz I vs Mobitz II: Mobitz I: PR dài dần rồi mất 1 QRS — lành tính; Mobitz II: PR cố định rồi đột ngột mất QRS — ác tính, cần pacemaker!',
        'Xử trí STEMI: Ưu tiên PCI cấp cứu ngay lập tức cho STEMI thành dưới. Block Wenckebach thường TỰ PHỤC HỒI sau tái tưới máu — không cần pacemaker ngay.',
        'Monitoring bắt buộc! Có thể tiến triển tạm thời thành Block AV hoàn toàn trong 24-48h đầu — cần sẵn sàng pacemaker tạm thời nếu huyết động xấu.'
      ]
    },
    {
      id: 'hypocalcemia_case',
      title: 'Cấp Cứu Nội Thần Kinh — Co Thắt Bàn Tay & Tê Quanh Miệng',
      category: 'Rối loạn điện giải',
      difficulty: 'Trung bình',
      patient: { age: 42, sex: 'Nữ', weight: 58, occupation: 'Giáo viên' },
      vitals: { hr: 82, sbp: 115, dbp: 75, spo2: 98, temp: 36.8, rr: 18 },
      symptoms: [
        'Tê rần đầu ngón tay và vùng quanh miệng',
        'Co thắt ngón tay dạng "bàn tay người đỡ đẻ" (Trousseau sign)',
        'Tiền sử vừa phẫu thuật cắt toàn bộ tuyến giáp 3 ngày trước'
      ],
      context: 'Bệnh nhân sau mổ tuyến giáp ngày 3 xuất hiện co cứng cơ mặt và tay. Dấu hiệu Chvostek (+) và Trousseau (+). Xét nghiệm Calci toàn phần 1.4 mmol/L (giảm nặng). ECG 12 chuyển đạo ghi nhận khoảng QT kéo dài 510ms.',
      modifiers: ['hypocalcemia'],
      goldAnswer: 'Hạ Calci Máu Cấp Nghi Do Suy Tuyến Cận Giáp Sau Phẫu Thuật — QT Kéo Dài',
      teachingPoints: [
        'Dấu hiệu ECG đặc trưng của Hạ Calci máu: Khoảng QT kéo dài chủ yếu do kéo dài đoạn ST, trong khi sóng T có hình dạng bình thường.',
        'Cơ chế: Calci máu giảm làm chậm quá trình tái cực của tế bào cơ tim (pha 2 điện thế hoạt động bị kéo dài).',
        'Lâm sàng: Nguy cơ xuất hiện Cơn Tetany, co thắt thanh quản dọa thở máy và rối loạn nhịp thất.',
        'Xử trí: Tiêm chậm tĩnh mạch Calcium Gluconate 10% (10-20ml trong 10 phút) dưới sự theo dõi liên tục trên monitor ECG.'
      ]
    },
    {
      id: 'digoxin_toxicity_case',
      title: 'Khám Nội Tim Mạch — Buồn Nôn & Nhìn Mờ Màu Vàng',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      patient: { age: 76, sex: 'Nữ', weight: 45, occupation: 'Hưu trí' },
      vitals: { hr: 54, sbp: 110, dbp: 65, spo2: 96, temp: 36.5, rr: 16 },
      symptoms: [
        'Chán ăn, buồn nôn, nôn mửa liên tục 2 ngày',
        'Cảm giác nhìn mọi vật có quầng sáng màu vàng/xanh',
        'Mệt mỏi, tim đập chậm'
      ],
      context: 'Bệnh nhân suy tim rung nhĩ mạn tính đang điều trị Digoxin 0.25mg/ngày + Furosemide. Gần đây ăn uống kém, chức năng thận suy giảm. Nồng độ Digoxin máu = 3.2 ng/mL (ngưỡng độc > 2.0 ng/mL). ECG ghi nhận ST chênh xuống lõm dạng "đáy chén".',
      modifiers: ['digitalis_effect', 'sinus_brady'],
      goldAnswer: 'Ngộ Độc Digoxin Cấp Trên Nền Suy Thận / Hạ Kali Máu Bù Trừ',
      teachingPoints: [
        'Hình ảnh ECG đặc trưng: ST chênh xuống lõm dạng "đáy chén" / "muỗng bán nguyệt" (Salvador Dali mustache), khoảng QT ngắn, PR kéo dài.',
        'Digoxin làm tăng trương lực phế vị gây nhịp chậm xoang hoặc Block AV, đồng thời tăng tính tự động thất gây NTT thất, nhịp nhanh bộ nối.',
        'Hạ Kali máu (do Furosemide) làm tăng độc tính Digoxin dù nồng độ Digoxin trong máu không quá cao.',
        'Xử trí: Ngừng Digoxin, bù Kali tĩnh mạch duy trì K+ 4.5-5.0 mEq/L, dùng kháng thể kháng Digoxin (DigiFab) nếu có rối loạn nhịp dọa tử vong.'
      ]
    },
    {
      id: 'pe_s1q3t3_case',
      title: 'Cấp Cứu — Khó Thở Đột Ngột Sau Chuyến Bay Dài',
      category: 'Rối loạn nhịp',
      difficulty: 'Khó',
      patient: { age: 55, sex: 'Nam', weight: 92, occupation: 'Doanh nhân' },
      vitals: { hr: 124, sbp: 95, dbp: 60, spo2: 89, temp: 37.2, rr: 28 },
      symptoms: [
        'Khó thở dữ dội khởi phát đột ngột khi vừa bước xuống máy bay (bay 14 tiếng)',
        'Đau ngực kiểu màng phổi (tăng khi hít sâu)',
        'Ho ra máu vết nhẹ, sưng đau bắp chân trái'
      ],
      context: 'Bệnh nhân béo phì vương quốc vừa bay đường dài. Thăm khám: Phổi trong, Bắp chân trái sưng to lệch 3cm so với chân phải. SpO2 89% khí trời. ECG: Nhịp nhanh xoang 124 bpm, S sóng sâu ở DI, Q sâu và T âm ở DIII (Dấu SI-QIII-TIII).',
      modifiers: ['sinus_tachy', 'pe_acute'],
      goldAnswer: 'Thuyên Tắc Phổi Cấp Nguy Cơ Trung Bình - Cao (Acute Pulmonary Embolism) — Dấu Hiệu S1Q3T3',
      teachingPoints: [
        'Dấu hiệu S1Q3T3 (McGinn-White sign): Sóng S sâu ở DI, sóng Q sâu ở DIII, sóng T âm ở DIII — phản ánh gánh nặng thất phải cấp tính (Right Ventricular Strain).',
        'Dấu hiệu ECG phổ biến nhất trong thuyên tắc phổi thực chất là NHỊP NHANH XOANG (> 44% trường hợp).',
        'Các dấu hiệu khác: T âm ở V1-V4 (tái cực thất phải), Block nhánh phải cấp tính (RBBB), trục lệch phải.',
        'Xử trí: Chụp CT dựng hình mạch máu phổi (CTPA) khẩn cấp, khởi đầu ngay Anticoagulant (LMWH/Heparin) hoặc Thuốc tiêu sợi huyết nếu tụt HA (Huyết động thất bại).'
      ]
    },
    {
      id: 'hypothermia_osborn_case',
      title: 'Cấp Cứu — Lơ Mơ & Hạ Thân Nhiệt Ngoài Trời Tuyết',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      patient: { age: 62, sex: 'Nam', weight: 65, occupation: 'Vô gia cư' },
      vitals: { hr: 38, sbp: 85, dbp: 50, spo2: 92, temp: 29.5, rr: 10 },
      symptoms: [
        'Bệnh nhân lơ mơ, trả lời không đúng trọng tâm',
        'Da tái lạnh toàn thân, cơ cứng không run',
        'Thân nhiệt trung tâm đo qua hậu môn: 29.5°C'
      ],
      context: 'Được xe cấp cứu đưa vào sau khi phát hiện nằm gục ngoài trời lạnh đêm đông. Thăm khám nhịp tim rất chậm 38 l/phút. ECG ghi nhận sóng Osborn (sóng J) dạng vai u nổi rõ tại nối QRS-ST ở các chuyển đạo V3-V6.',
      modifiers: ['sinus_brady', 'osborn_wave'],
      goldAnswer: 'Hạ Thân Nhiệt Nặng (Severe Hypothermia 29.5°C) — Sóng Osborn (J-Wave)',
      teachingPoints: [
        'Sóng Osborn (J wave): Là sóng nhô lên dạng gờ hình vòm tại điểm nối QRS và đoạn ST, rõ nhất ở V3-V6 khi thân nhiệt < 32°C.',
        'Biên độ sóng Osborn tỷ lệ thuận với mức độ hạ thân nhiệt.',
        'Biến đổi ECG khác: Nhịp chậm xoang, khoảng PR/QRS/QT kéo dài, nhiễu do cơ run (Muscle tremor artifact), nguy cơ Rung Thất / Vô tâm thu cao.',
        'Xử trí: Cấp cứu ủ ấm chủ động (Ủ ấm từ bên trong: dịch truyền ấm 40°C, thở oxy ấm; Ủ ấm từ bên ngoài). Tránh di chuyển bệnh nhân đột ngột vì có thể kích hoạt Rung thất!'
      ]
    },
    {
      id: 'brugada_type1_case',
      title: 'Cấp Cứu — Ngất Đột Ngột Khi Đang Ngủ Ở Người Trẻ',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Khó',
      patient: { age: 29, sex: 'Nam', weight: 68, occupation: 'Kỹ sư phần mềm' },
      vitals: { hr: 75, sbp: 120, dbp: 75, spo2: 99, temp: 37.0, rr: 16 },
      symptoms: [
        'Người nhà phát hiện ngất, ngáy ngáy khó thở khi đang ngủ lúc 2 giờ sáng',
        'Tỉnh lại sau 3 phút, ngơ ngác không nhớ sự việc',
        'Anh trai ruột đột tử năm 24 tuổi khi đang ngủ'
      ],
      context: 'Bệnh nhân nam trẻ tuổi vào cấp cứu sau cơn ngất đêm. Tiền sử gia đình có người đột tử sớm. Khám lâm sàng và siêu âm tim hoàn toàn bình thường. ECG 12 chuyển đạo: ST chênh lên dạng vòm (coved-type) > 2mm tiếp nối sóng T âm ở V1, V2.',
      modifiers: ['brugada_type1'],
      goldAnswer: 'Hội Chứng Brugada Type 1 — Nguy Cơ Đột Tử Cao Đêm Ngủ (SUNDS)',
      teachingPoints: [
        'Tiêu chuẩn Brugada Type 1: ST chênh lên dạng vòm (coved ST elevation) ≥ 2mm tiếp nối sóng T âm ở V1-V2 (chuyển đạo ngực phải).',
        'Bệnh lý kênh Natri tim di truyền (máy đột biến gen SCN5A) gây rối loạn nhịp thất ác tính (VT/VF) chủ yếu trong lúc ngủ hoặc khi sốt cao.',
        'Phân biệt Type 2/3: Dạng yên ngựa (Saddle-back type) — cần làm nghiệm pháp kích thích bằng thuốc chặn kênh Natri (Ajmaline/Flecainide) để khẳng định.',
        'Xử trí: Đặt Máy Đánh Thức Cấy Vào Cơ Thể (ICD) là phương pháp DUY NHẤT phòng ngừa đột tử cho bệnh nhân Brugada có triệu chứng ngất.'
      ]
    },
    {
      id: 'copd_p_pulmonale_case',
      title: 'Khám Nội Hô Hấp — Khó Thở Mạn Tính & Lồng Ngực Hình Thùng',
      category: 'Dày buồng tim',
      difficulty: 'Dễ',
      patient: { age: 68, sex: 'Nam', weight: 52, occupation: 'Nông dân hưu trí' },
      vitals: { hr: 98, sbp: 135, dbp: 85, spo2: 91, temp: 36.7, rr: 22 },
      symptoms: [
        'Ho đờm mạn tính 10 năm, khó thở tăng dần khi gắng sức nhẹ',
        'Tiền sử thuốc lá 40 bao-năm',
        'Lồng ngực đường kính trước sau tăng (hình thùng)'
      ],
      context: 'Khám định kỳ phòng khám hô hấp. Khám thấy rì rầm phế nang giảm toàn bộ 2 phế trường, tiếng tim mờ xa xăm. ECG: Điện thế thấp ở các chuyển đạo ngoại biên, Trục lệch phải +110°, Sóng P cao nhọn > 2.5mm ở DII, DIII, aVF (P phế).',
      modifiers: ['copd_ecg'],
      goldAnswer: 'Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD) / Tâm Phế Mạn — Dấu Hiệu P Phế (P Pulmonale)',
      teachingPoints: [
        'Sóng P phế (P Pulmonale): Sóng P cao nhọn ≥ 2.5mm ở DII, DIII, aVF do dày/dãn nhĩ phải (tăng áp lực động mạch phổi).',
        'Điện thế thấp (Low voltage): Do lồng ngực ứ khí mạn tính làm tăng điện trở cách điện giữa tim và điện cực da.',
        'Trục QRS lệch phải và tim xoay thuận chiều kim đồng hồ (S sâu kéo dài tới V6) do thất phải phì đại/dãn.',
        'Ý nghĩa: Đánh giá biến chứng Tâm phế mạn ở bệnh nhân bệnh phổi mạn tính.'
      ]
    },
    {
      id: 'subarachnoid_t_wave_case',
      title: 'Cấp Cứu Thần Kinh — Đau Đầu Dữ Dội Như "Sét Đánh" & Hôn Mê',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      patient: { age: 50, sex: 'Nữ', weight: 62, occupation: 'Kế toán' },
      vitals: { hr: 52, sbp: 175, dbp: 105, spo2: 95, temp: 37.4, rr: 16 },
      symptoms: [
        'Đau đầu dữ dội đột ngột chưa từng có trong đời ("Thunderclap headache")',
        'Nôn mửa vòi bộc, gáy cứng (+)',
        'Rối loạn ý thức tiến triển lơ mơ dần'
      ],
      context: 'Bệnh nhân vỡ túi phình động mạch não gây Xuất huyết dưới nhện (SAH). CT Scan sọ não xác định máu ngập khoang dưới nhện. ECG 12 chuyển đạo bất ngờ ghi nhận sóng T âm rất sâu, rộng đối xứng khổng lồ ở V1-V6 và DI, aVL kèm QTc kéo dài 540ms.',
      modifiers: ['sinus_brady', 'cerebral_t_waves'],
      goldAnswer: 'Xuất Huyết Dưới Nhện (Subarachnoid Hemorrhage - SAH) — Dấu Hiệu Sóng T Não (Cerebral T Waves)',
      teachingPoints: [
        'Sóng T não (Cerebral T waves): Sóng T âm rất sâu (giao động > 5mm đến 15mm), rộng đối xứng khổng lồ ở nhiều chuyển đạo trước ngực kèm QTc kéo dài mạnh.',
        'Cơ chế: Bão Catecholamine do kích thích thần kinh giao cảm quá mức từ hệ thần kinh trung ương gây choáng cơ tim độc tố (Neurogenic stunned myocardium).',
        'Chẩn đoán phân biệt quan trọng: Rất dễ nhầm với Nhồi máu cơ tim cấp thành trước! Cần kết hợp lâm sàng thần kinh và CT sọ nội.',
        'Xử trí: Cấp cứu Thần kinh - Phẫu thuật kẹp/can thiệp nội mạch túi phình mạch vỏ não. Không dùng thuốc tiêu sợi huyết hay kháng đông vì nhầm với STEMI!'
      ]
    },
    {
      id: 'sgarbossa_stemi_lbbb_case',
      title: '🚨 Cấp Cứu Tối Khẩn — Đau Ngực Cấp Trên Bệnh Nhân Có Block Nhánh Trái Cũ',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 67, sex: 'Nam', weight: 72, occupation: 'Hưu trí' },
      vitals: { hr: 98, sbp: 105, dbp: 65, spo2: 94, temp: 36.9, rr: 22 },
      symptoms: [
        'Đau thắt ngực dữ dội sau xương ức khởi phát 1 giờ trước khi đang nghỉ ngơi',
        'Vã mồ hôi lạnh, khó thở, lo âu',
        'Tiền sử Block nhánh trái (LBBB) được ghi nhận 2 năm trước'
      ],
      context: 'Bệnh nhân có tiền sử LBBB mạn tính vào cấp cứu vì đau ngực điển hình. ECG 12 chuyển đạo: Dạng LBBB cơ bản nhưng xuất hiện ST chênh lên 2.5mm cùng chiều (concordant) với QRS dương ở DII, V5, V6 (Sgarbossa = 5 điểm).',
      modifiers: ['stemi_lbbb_sgarbossa'],
      goldAnswer: 'Nhồi Máu Cơ Tim Cấp Có ST Chênh Lên (STEMI) Trên Nền Block Nhánh Trái (LBBB) — Tiêu Chuẩn Sgarbossa (+) [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'LBBB mạn tính thường làm ST-T biến đổi trái hướng (discordant) che lấp hình ảnh STEMI.',
        'Tiêu chuẩn Sgarbossa cải tiến chẩn đoán STEMI khi có LBBB:',
        '  1. ST chênh lên đồng hướng (Concordant STE) ≥ 1mm ở chuyển đạo QRS dương (5 điểm - Rất đặc hiệu!).',
        '  2. ST chênh xuống đồng hướng (Concordant STD) ≥ 1mm ở V1-V3 (3 điểm).',
        '  3. ST chênh lên trái hướng quá mức (Excessive discordant STE) ≥ 5mm (2 điểm).',
        'Quyết định: Điểm Sgarbossa ≥ 3 -> Kích hoạt PCI cấp cứu khẩn cấp như STEMI bình thường!'
      ]
    },
    {
      id: 'takotsubo_cardiomyopathy_case',
      title: '⚠️ Cấp Cứu Tim Mạch — Đau Ngực Dọa STEMI Sau Biến Cố Tâm Lý Sốc',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      urgency: 'emergent',
      patient: { age: 68, sex: 'Nữ', weight: 54, occupation: 'Nội trợ' },
      vitals: { hr: 105, sbp: 110, dbp: 70, spo2: 96, temp: 36.8, rr: 20 },
      symptoms: [
        'Đau ngực kiểu thắt nghẹt đột ngột 2 giờ sau khi nhận tin đột ngột mất người thân',
        'Khó thở nhẹ, hồi hộp đánh trống ngực',
        'Không có tiền sử bệnh mạch vành trước đây'
      ],
      context: 'Bệnh nhân nữ cao tuổi vào cấp cứu vì đau ngực cấp sau sốc tâm lý mạnh. ECG: ST chênh lên lồi ở V2-V5 dọa STEMI thành trước. Troponin T tăng nhẹ. Tuy nhiên, Chụp động mạch vành qua da (DSA) cấp cứu ghi nhận: ĐỘNG MẠCH VÀNH HOÀN TOÀN THÔNG THOÁNG! Siêu âm tim: Phình mỏm thất trái (Apical ballooning).',
      modifiers: ['takotsubo'],
      goldAnswer: 'Hội Chứng Bóp Nghẹt Tim Takotsubo (Takotsubo Cardiomyopathy / Stress-Induced Cardiomyopathy) — Phình Mỏm Thất Trái',
      teachingPoints: [
        'Hội chứng Takotsubo (Broken Heart Syndrome): Đau ngực & biến đổi ST-T tương tự STEMI thành trước nhưng ĐỘNG MẠCH VÀNH BÌNH THƯỜNG trên chụp DSA.',
        'Cơ chế: Bão Catecholamine giao cảm đột ngột do căng thẳng tâm lý/thể xác cực độ gây ngộ độc cơ tim và phình vùng mỏm thất trái.',
        'Đặc điểm ECG giai đoạn sau: ST chênh giảm dần, xuất hiện sóng T âm rất sâu đối xứng lan tỏa (V2-V6) và QTc kéo dài.',
        'Tiên lượng: Thường phục hồi hoàn toàn chức năng co bóp thất trái sau 4-8 tuần điều trị nội khoa hỗ trợ (Beta-blocker, ACEi).'
      ]
    },
    {
      id: 'tca_overdose_case',
      title: '🚨 Cấp Cứu Độc Chất — Lơ Mơ, Tụt Huyết Áp Sau Khi Uống Thuốc Quá Liều',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 24, sex: 'Nữ', weight: 50, occupation: 'Sinh viên' },
      vitals: { hr: 125, sbp: 80, dbp: 50, spo2: 95, temp: 37.5, rr: 22 },
      symptoms: [
        'Được bạn phát hiện lơ mơ bên cạnh 2 vỏ chai Amitriptyline rỗng (khoảng 50 viên)',
        'Đồng tử 2 bên dãn 5mm phản xạ ánh sáng chậm, khô miệng, da nóng đỏ',
        'Tụt huyết áp 80/50 mmHg, tim đập nhanh'
      ],
      context: 'Bệnh nhân ngộ độc thuốc chống trầm cảm 3 vòng (TCA Amitriptyline). ECG 12 chuyển đạo ghi nhận: Nhịp nhanh xoang 125 bpm, QRS giãn rộng 145ms, Lệch trục phải +110°, Sóng R muộn ở chuyển đạo aVR cao 4mm (R/S aVR > 0.7).',
      modifiers: ['sinus_tachy', 'tca_toxicity'],
      goldAnswer: 'Ngộ Độc Thuốc Chống Trầm Cảm 3 Vòng TCA (Amitriptyline Overdose) — Dấu Hiệu Chặn Kênh Natri [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'TCA gây 3 tác dụng độc chính: Chặn kênh Natri tim, Chặn receptor Alpha-1 (tụt HA) và Chặn Muscarinic (Hội chứng kháng Cholinergic).',
        'Dấu hiệu ECG đặc hiệu ngộ độc TCA:',
        '  1. Sóng R muộn ở aVR cao ≥ 3mm (hoặc R/S aVR > 0.7) — độ đặc hiệu > 95% cho ngộ độc TCA!',
        '  2. QRS giãn rộng > 100ms (nguy cơ co giật) và QRS > 160ms (nguy cơ cao kích hoạt Cơn nhịp nhanh thất / Co giật).',
        'Xử trí cấp cứu tối khẩn: Tiêm tĩnh mạch Sodium Bicarbonate (NaHCO3 8.4%) 1-2 mEq/kg bolus để kiềm hóa máu (pH 7.45-7.55) và giải độc kênh Natri!'
      ]
    },
    {
      id: 'arvc_epsilon_case',
      title: '🚨 Cấp Cứu — Ngất Đột Ngột Khi Đang Chạy Điền Kinh (Dấu Hiệu Sóng Epsilon)',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 25, sex: 'Nam', weight: 66, occupation: 'Vận động viên điền kinh' },
      vitals: { hr: 88, sbp: 115, dbp: 75, spo2: 98, temp: 37.0, rr: 18 },
      symptoms: [
        'Đột ngột ngất xỉu khi đang chạy được 3000m trong buổi tập',
        'Tỉnh lại sau 2 phút, cảm giác tim đập dồn dập trước khi ngất',
        'Bác ruột đột tử năm 30 tuổi khi đang chơi thể thao'
      ],
      context: 'VĐV trẻ tuổi ngất khi gắng sức. Thăm khám lâm sàng bình thường. ECG 12 chuyển đạo: Sóng T âm ở V1-V3, QRS giãn nhẹ ở V1 (115ms), đặc biệt xuất hiện Sóng Epsilon (sóng khuyết nhỏ dạng vai u ở phần cuối QRS trước khi sang ST) rõ nhất ở V1, V2.',
      modifiers: ['arvc_epsilon'],
      goldAnswer: 'Bệnh Cơ Tim Thất Phải Sinh Loạn Nhịp (ARVC / ARVD) — Dấu Hiệu Sóng Epsilon (Epsilon Wave) [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'Bệnh cơ tim thất phải sinh loạn nhịp (ARVC): Bệnh di truyền thay thế mô cơ tim thất phải bằng mô mỡ-xơ, nguyên nhân hàng đầu gây đột tử ở VĐV trẻ.',
        'Tiêu chuẩn ECG chẩn đoán chính (Major Criteria): Sóng Epsilon (sóng khuyết nhỏ nhấp nhô ở đầu đoạn ST) ở V1-V3.',
        'Tiêu chuẩn khác: Sóng T âm ở V1-V3 (ở người > 14 tuổi), khoảng thời gian kích thích muộn (TAD) > 55ms ở V1-V3.',
        'Nguy cơ: Dễ kích hoạt Cơn nhịp nhanh thất gốc thất phải (LBBB pattern với trục lệch trái) dẫn tới Rung thất.',
        'Chỉ định: Cấm thi đấu thể thao gắng sức + Đặt Máy Đánh Thức Cấy Vào Cơ Thể (ICD).'
      ]
    },
    {
      id: 'isolated_rv_infarction_case',
      title: '🚨 Cấp Cứu Tối Khẩn — Tụt Huyết Áp Thảm Hại Sau Khi Dùng Nitroglycerin',
      category: 'Bệnh mạch vành',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 60, sex: 'Nam', weight: 75, occupation: 'Tài xế' },
      vitals: { hr: 112, sbp: 70, dbp: 40, spo2: 93, temp: 36.6, rr: 24 },
      symptoms: [
        'Đau thắt ngực vùng thượng vị kéo dài 1 giờ',
        'Sau khi được cho ngậm 1 viên Nitroglycerin dưới lưỡi thì đột ngột vã mồ hôi, da tái lạnh, HA tụt thảm hại từ 120/80 xuống 70/40 mmHg',
        'Tĩnh mạch cổ nổi rõ, nghe phổi hoàn toàn trong không có rên'
      ],
      context: 'Bệnh nhân tụt huyết áp nặng sau Nitroglycerin. ECG 12 chuyển đạo tiêu chuẩn chỉ thấy ST chênh lên nhẹ 1mm ở V1 và DIII > DII. Bác sĩ cấp cứu chỉ định đo thêm **Chuyển đạo Thất Phải bên phải ($V_3R - V_6R$)** -> Phát hiện ST chênh lên vòm 2.0mm điển hình ở $V_4R$!',
      modifiers: ['sinus_tachy', 'stemi_rv_isolated'],
      goldAnswer: 'Nhồi Máu Cơ Tim Thất Phải Cấp Đơn Độc (Isolated Right Ventricular Infarction) — ST Chênh Lên Ở $V_4R$ [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'NMCT Thất phải (RV Infarction): Thường đi kèm STEMI thành dưới (tắc RCA), nhưng có thể gặp đơn độc.',
        'Tam chứng lâm sàng kinh điển: Tụt huyết áp + Tĩnh mạch cổ nổi + Phổi trong.',
        'Tiêu chuẩn ECG vàng: ST chênh lên ≥ 1mm ở chuyển đạo $V_4R$ (độ đặc hiệu > 90%). Dấu hiệu gợi ý ở 12 chuyển đạo chuẩn: ST V1 > V2, ST DIII > DII.',
        'CẢNH BÁO TỐI KHẨN: CHỐNG CHỈ ĐỊNH tuyệt đối Nitroglycerin, Morphine, Thuốc lợi tiểu và các thuốc giảm tiền tải vì thất phải phụ thuộc hoàn toàn vào áp lực đổ đầy tâm trương!',
        'Xử trí: Truyền dịch tĩnh mạch Nước muối sinh lý 0.9% tốc độ nhanh (1-2 lít) để nâng tiền tải + PCI cấp cứu khẩn cấp.'
      ]
    },
    {
      id: 'af_wpw_case',
      title: '🚨 Cấp Cứu Tối Khẩn — Tim Đập Loạn Nhịp Rất Nhanh QRS Giãn Rộng Ở Người Trẻ',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 26, sex: 'Nam', weight: 64, occupation: 'Lập trình viên' },
      vitals: { hr: 220, sbp: 85, dbp: 50, spo2: 92, temp: 36.8, rr: 24 },
      symptoms: [
        'Hồi hộp đánh trống ngực dữ dội dồn dập khởi phát đột ngột 30 phút trước',
        'Vã mồ hôi, thắt ngực nhẹ, hoa mắt chóng mặt',
        'Tiền sử có các cơn nhịp nhanh kịch phát'
      ],
      context: 'Bệnh nhân nam trẻ tuổi vào phòng cấp cứu với cơn nhịp nhanh dữ dội. ECG 12 chuyển đạo: Phức bộ QRS giãn rộng (150ms) biến đổi hình thái từ nhát này sang nhát khác, khoảng RR hoàn toàn không đều (Irregularly irregular wide QRS complex) với tần số cực nhanh 220-250 l/phút.',
      modifiers: ['af_wpw'],
      goldAnswer: 'Rung Nhĩ Có Đường Phụ WPW (Pre-excited Atrial Fibrillation - AF with WPW) [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'Rung nhĩ dẫn truyền qua đường phụ Kent (Pre-excited AF): Xung điện nhĩ xả xuống thất trực tiếp qua cầu Kent mà KHÔNG bị nút AV kìm hãm -> Tần số thất có thể lên tới 250-300 l/phút -> Rất dễ biến thành RUNG THẤT ĐỘT TỬ!',
        'Đặc điểm ECG phân biệt với VT: Khoảng RR hoàn toàn không đều + QRS giãn rộng biến dạng thay đổi.',
        'CẢNH BÁO TỐI KHẨN: CHỐNG CHỈ ĐỊNH tuyệt đối Adenosine, Verapamil, Diltiazem, Digoxin và Beta-blocker! Các thuốc này ức chế nút AV sẽ ép toàn bộ xung điện đi qua đường phụ Kent -> Kích hoạt Rung Thất ngay lập tức!',
        'Xử trí: SỐC ĐIỆN CHUYỂN NHỊP ĐỒNG BỘ khẩn cấp (Synchronized Cardioversion 100-200J) hoặc tiêm tĩnh mạch Procainamide / Ibutilide.'
      ]
    },
    {
      id: 'ccb_toxicity_case',
      title: '🚨 Cấp Cứu Độc Chất — Nhịp Tim Rất Chậm 35 bpm & Tụt Huyết Áp Nặng',
      category: 'Rối loạn điện giải',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 52, sex: 'Nữ', weight: 58, occupation: 'Kế toán' },
      vitals: { hr: 35, sbp: 70, dbp: 40, spo2: 94, temp: 36.3, rr: 14 },
      symptoms: [
        'Được người nhà phát hiện lơ mơ, da tái lạnh',
        'Cạnh giường có 1 lọ Verapamil 80mg rỗng (khoảng 30 viên)',
        'Mạch quay bắt chậm nhẹ mờ, huyết áp 70/40 mmHg'
      ],
      context: 'Bệnh nhân ngộ độc thuốc chẹn kênh Calci nhóm Verapamil. Xét nghiệm đường huyết tại giường: 16.5 mmol/L (tăng đường huyết phản ứng do ức chế tiết Insulin từ tế bào đảo tụy). ECG: Nhịp chậm bộ nối 35 bpm, PR kéo dài 240ms, QRS giãn nhẹ 120ms.',
      modifiers: ['ccb_toxicity'],
      goldAnswer: 'Ngộ Độc Thuốc Chẹn Kênh Calci Verapamil Nặng (CCB Toxicity) — Nhịp Chậm Bộ Nối & Tụt HA [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'Ngộ độc CCB (Verapamil/Diltiazem) chế ức chế kênh Calci cơ tim gây nhịp chậm xoang/bộ nối, suy giảm sức co bóp cơ tim và giãn mạch ngoại biên.',
        'Dấu hiệu phân biệt với Ngộ độc Beta-blocker: Ngộ độc CCB thường kèm TĂNG ĐƯỜNG HUYẾT NẶNG (Hyperglycemia) do Calci bị chặn ngăn giải phóng Insulin.',
        'Xử trí cấp cứu:',
        '  1. Tiêm tĩnh mạch Calcium Chloride 10% (1-2g bolus) hoặc Calcium Gluconate.',
        '  2. Liệu pháp Insulin Liều Cao Euglycemia (HIET): Tiêm Insulin Regular 1 unit/kg bolus + truyền duy trì 1-10 units/kg/h kèm Glucose 20% duy trì đường huyết.',
        '  3. Glucagon IV và Vận mạch Norepinephrine / Epinephrine.'
      ]
    },
    {
      id: 'trifascicular_block_case',
      title: '⚠️ Cấp Cứu Tim Mạch — Cơn Ngất Đột Ngột Ở Người Cao Tuổi (Block 3 Nhánh)',
      category: 'Rối loạn dẫn truyền',
      difficulty: 'Khó',
      urgency: 'emergent',
      patient: { age: 78, sex: 'Nam', weight: 65, occupation: 'Cán bộ hưu trí' },
      vitals: { hr: 48, sbp: 110, dbp: 65, spo2: 96, temp: 36.7, rr: 16 },
      symptoms: [
        'Ngất xỉu đột ngột khi đang đi dạo trong công viên',
        'Tỉnh lại sau 1 phút, không nôn mửa, không yếu liệt tay chân',
        'Tiền sử thỉnh thoảng choáng váng 3 tháng qua'
      ],
      context: 'Bệnh nhân cao tuổi ngất chưa rõ nguyên nhân. Khám tim thấy nhịp chậm 48 l/phút. ECG 12 chuyển đạo: PR kéo dài 250ms (Block AV độ I) + QRS giãn rộng 145ms dạng tai thỏ rsR\' ở V1 (Block Nhánh Phải RBBB) + Trục lệch trái -50° (Block Phân Nhánh Trái Trước LAFB).',
      modifiers: ['av_block_1', 'rbbb', 'lafb', 'trifascicular_block'],
      goldAnswer: 'Block 3 Nhánh Dẫn Truyền (Trifascicular Block) Kèm Cơn Ngất Stokes-Adams — Dọa Block AV Hoàn Toàn',
      teachingPoints: [
        'Block 3 nhánh (Trifascicular Block): Sự kết hợp của (1) Block AV độ I, (2) Block Nhánh Phải (RBBB), và (3) Block Phân Nhánh Trái Trước (LAFB) hoặc Trái Sau (LPFB).',
        'Ý nghĩa lâm sàng: Hệ thống dẫn truyền cơ tim bị tổn thương lan tỏa nghiêm trọng 3 nhánh. Nguy cơ tiến triển thành Block AV Hoàn Toàn (Block độ III) bất kỳ lúc nào gây ngất hoặc vô tâm thu.',
        'Quyết định lâm sàng: Bệnh nhân Block 3 nhánh CÓ TRIỆU CHỨNG NGẤT có chỉ định CẤY MÁY TẠO NHỊP TIM (Pacemaker) vĩnh viễn cấp cứu!'
      ]
    },
    {
      id: 'electrical_alternans_tamponade_case',
      title: '🚨 Cấp Cứu Tối Khẩn — Khó Thở Dữ Dội & Điện Thế QRS Biến Thiên (Ép Tim Cấp)',
      category: 'Điện giải & Khác',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 45, sex: 'Nam', weight: 62, occupation: 'Kỹ sư' },
      vitals: { hr: 122, sbp: 85, dbp: 55, spo2: 90, temp: 37.6, rr: 28 },
      symptoms: [
        'Khó thở dữ dội tiến triển nhanh trong 24 giờ, không thể nằm ngửa',
        'Đau ngực âm ỉ, mệt lả',
        'Tĩnh mạch cổ nổi căng to, huyết áp tụt 85/55 mmHg, tiếng tim nghe mờ xa xăm'
      ],
      context: 'Bệnh nhân ung thư phổi tiến triển tràn dịch màng ngoài tim. Khám lâm sàng: Tam chứng Beck (+) (Tụt HA + Tĩnh mạch cổ nổi + Tiếng tim mờ). ECG 12 chuyển đạo: Nhịp nhanh xoang 122 bpm, Điện thế QRS thấp lan tỏa, đặc biệt biên độ phức bộ QRS cao thấp biến thiên luân phiên (Electrical Alternans) qua từng chu kỳ nhịp tim.',
      modifiers: ['sinus_tachy', 'electrical_alternans'],
      goldAnswer: 'Ép Tim Cấp Do Tràn Dịch Màng Ngoài Tim Lượng Nhiều (Cardiac Tamponade) — Dấu Hiệu Điện Thế Biến Thiên (Electrical Alternans) [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'Ép Tim Cấp (Cardiac Tamponade): Dịch màng ngoài tim chèn ép các buồng tim làm suy giảm nghiêm trọng lượng máu đổ về thất trái trong thì tâm trương.',
        'Tam chứng Beck kinh điển: Tụt huyết áp + Tĩnh mạch cổ nổi căng + Tiếng tim mờ xa xăm.',
        'Dấu hiệu ECG đặc hiệu: Điện thế biến thiên (Electrical Alternans) — biên độ QRS thay đổi cao/thấp xen kẽ luân phiên do tim đung đưa tự do trong khoang dịch màng tim.',
        'Xử trí cấp cứu tối khẩn: CHỌC HÚT DỊCH MÀNG NGOÀI TIM GIẢI ÁP (Pericardiocentesis) cấp cứu ngay lập tức dưới sự hướng dẫn của Siêu âm!'
      ]
    },
    {
      id: 'drug_induced_torsades_case',
      title: '🚨 Cấp Cứu — Cơn Ngất Xỉu Do Xoắn Đỉnh Khi Đang Dùng Thuốc Phối Hợp',
      category: 'Cấp cứu loạn nhịp',
      difficulty: 'Khó',
      urgency: 'critical',
      patient: { age: 58, sex: 'Nữ', weight: 60, occupation: 'Giáo viên' },
      vitals: { hr: 75, sbp: 110, dbp: 70, spo2: 97, temp: 37.1, rr: 18 },
      symptoms: [
        'Ngất xỉu ngắn 2 lần trong ngày, tỉnh lại sau 30 giây',
        'Đang điều trị nhiễm trùng phổi bằng Erythromycin + Haloperidol điều trị mất ngủ',
        'Thỉnh thoảng cảm giác tim nhảy chồm lên ngực'
      ],
      context: 'Bệnh nhân dùng phối hợp các thuốc kéo dài khoảng QT. ECG lúc nghỉ: Nhịp xoang 75 bpm, khoảng QTc kéo dài mạnh 560ms. Trên dải nhịp theo dõi: Xuất hiện một ngoại tâm thu thất đến sớm (dấu hiệu R-on-T) ngay lập tức kích hoạt cơn Nhịp nhanh thất đa hình xoay quanh đường đẳng điện (Torsades de Pointes) kéo dài 8 giây rồi tự dứt.',
      modifiers: ['vt_torsade'],
      goldAnswer: 'Nhịp Nhanh Thất Đa Hình Xoắn Đỉnh Do Thuốc (Drug-Induced Torsades de Pointes) — QTc Kéo Dài Nặng [🚨 Cấp Cứu Tối Khẩn]',
      teachingPoints: [
        'Xoắn Đỉnh (Torsades de Pointes): Dạng nhịp nhanh thất đa hình ác tính đặc trưng bởi phức bộ QRS xoay quanh đường đẳng điện, hay xuất hiện trên nền QTc kéo dài (> 500ms).',
        'Cơ chế: Phối hợp Erythromycin (Kháng sinh) + Haloperidol (Kháng Dopamine) gây cộng hưởng chặn kênh Kali IKr làm kéo dài pha tái cực.',
        'Xử trí cấp cứu tối khẩn:',
        '  1. Ngừng ngay lập tức tất cả các thuốc kéo dài QT!',
        '  2. Tiêm tĩnh mạch Magnesium Sulfate 2g bolus trong 1-2 phút (cho dù nồng độ Magnesi máu bình thường!).',
        '  3. Duy trì Kali máu > 4.5 mEq/L và Magnesi máu > 2.0 mmol/L.',
        '  4. Tạo nhịp tim tạm thời tần số cao (Overdrive pacing > 100 bpm) hoặc truyền Isoproterenol để rút ngắn khoảng QT nếu cơn tái phát nhiều lần.'
      ]
    }
  ];

  window.ECGScenarios = {
    SCENARIOS,
    getScenarioById(id) {
      return SCENARIOS.find(s => s.id === id);
    },
    getRandomScenario() {
      const idx = Math.floor(Math.random() * SCENARIOS.length);
      return SCENARIOS[idx];
    }
  };
})();
