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
