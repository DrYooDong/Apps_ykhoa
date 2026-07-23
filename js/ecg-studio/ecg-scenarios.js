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
