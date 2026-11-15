/**
 * CliniPortal 2.0 — Good Day & Chronobiology Data Constants (v3.0)
 * 60% Con Người, Môi Trường & Đời Sống • 40% Bác Sĩ Truyền Nhiễm (Infectious Diseases)
 * Path: src/tools/good-day-data.ts
 */

import type {
  ElementType,
  TrucItem,
  TietKhiItem,
  SaoTuItem,
  NapAmDetail,
  MedicalTaskType,
  MedicalTaskConfig
} from './good-day-types';

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'] as const;
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'] as const;

export const NGU_HANH_CAN: Record<string, ElementType> = {
  Giáp: 'Mộc', Ất: 'Mộc',
  Bính: 'Hỏa', Đinh: 'Hỏa',
  Mậu: 'Thổ', Kỷ: 'Thổ',
  Canh: 'Kim', Tân: 'Kim',
  Nhâm: 'Thủy', Quý: 'Thủy'
};

export const NGU_HANH_CHI: Record<string, ElementType> = {
  Tý: 'Thủy', Hợi: 'Thủy',
  Dần: 'Mộc', Mão: 'Mộc',
  Tỵ: 'Hỏa', Ngọ: 'Hỏa',
  Thân: 'Kim', Dậu: 'Kim',
  Thìn: 'Thổ', Tuất: 'Thổ', Sửu: 'Thổ', Mùi: 'Thổ'
};

export const HANH_SINH_KHAC = {
  sinh: { Kim: 'Thủy', Thủy: 'Mộc', Mộc: 'Hỏa', Hỏa: 'Thổ', Thổ: 'Kim' } as Record<ElementType, ElementType>,
  khac: { Kim: 'Mộc', Mộc: 'Thổ', Thổ: 'Thủy', Thủy: 'Hỏa', Hỏa: 'Kim' } as Record<ElementType, ElementType>
};

export const GIO_TIME: Record<string, string> = {
  Tý: '23h-01h', Sửu: '01h-03h', Dần: '03h-05h', Mão: '05h-07h',
  Thìn: '07h-09h', Tỵ: '09h-11h', Ngọ: '11h-13h', Mùi: '13h-15h',
  Thân: '15h-17h', Dậu: '17h-19h', Tuất: '19h-21h', Hợi: '21h-23h'
};

export const HOANG_DAO_MAP: Record<string, string[]> = {
  Tý: ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
  Ngọ: ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'],
  Sửu: ['Dần', 'Mão', 'Tỵ', 'Thân', 'Tuất', 'Hợi'],
  Mùi: ['Dần', 'Mão', 'Tỵ', 'Thân', 'Tuất', 'Hợi'],
  Dần: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  Thân: ['Tý', 'Sửu', 'Thìn', 'Tỵ', 'Mùi', 'Tuất'],
  Mão: ['Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu', 'Tý'],
  Dậu: ['Dần', 'Mão', 'Ngọ', 'Mùi', 'Dậu', 'Tý'],
  Thìn: ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  Tuất: ['Dần', 'Thìn', 'Tỵ', 'Thân', 'Dậu', 'Hợi'],
  Tỵ: ['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi'],
  Hợi: ['Sửu', 'Thìn', 'Ngọ', 'Mùi', 'Tuất', 'Hợi']
};

export const GIO_THAN_SAT: { name: string; isHoangDao: boolean; meaning: string }[] = [
  { name: 'Thanh Long', isHoangDao: true, meaning: 'Đại Cát: Khởi sự thuận lợi, gặp quý nhân, giao tiếp và hội chẩn suôn sẻ.' },
  { name: 'Minh Đường', isHoangDao: true, meaning: 'Cát Tinh: Đầu óc quang minh, làm việc tập trung, biện luận sáng rõ.' },
  { name: 'Thiên Hình', isHoangDao: false, meaning: 'Hắc Đạo: Dễ tranh luận căng thẳng; cần tiết chế lời nói và kiểm tra kỹ thủ tục.' },
  { name: 'Chu Tước', isHoangDao: false, meaning: 'Hắc Đạo: Cẩn trọng khẩu thiệt, giải thích rõ ràng khi trao đổi với gia đình và người bệnh.' },
  { name: 'Kim Quỹ', isHoangDao: true, meaning: 'Cát Tinh: Tài lộc hanh thông, thuận lợi sắp xếp kế hoạch và rà soát hồ sơ.' },
  { name: 'Bảo Quang', isHoangDao: true, meaning: 'Cát Tinh: Hào quang bình an, tinh thần thư thái, quyết định sáng suốt.' },
  { name: 'Bạch Hổ', isHoangDao: false, meaning: 'Hắc Đạo: Chú ý an toàn đi lại, kiểm soát vô khuẩn và phòng ngừa phơi nhiễm.' },
  { name: 'Ngọc Đường', isHoangDao: true, meaning: 'Đại Cát: Công việc và đời sống hài hòa, gặp nhiều tin vui tích cực.' },
  { name: 'Thiên Lao', isHoangDao: false, meaning: 'Hắc Đạo: Dễ mệt mỏi hoặc bế tắc; tránh đưa ra quyết định vội vàng lúc thiếu ngủ.' },
  { name: 'Huyền Vũ', isHoangDao: false, meaning: 'Hắc Đạo: Đề phòng nhầm lẫn giấy tờ, thất lạc đồ đạc hoặc sai sót sao chép.' },
  { name: 'Tư Mệnh', isHoangDao: true, meaning: 'Cát Tinh: Sinh khí dồi dào, tốt cho sức khỏe, nghỉ ngơi và hồi phục thể lực.' },
  { name: 'Câu Trận', isHoangDao: false, meaning: 'Hắc Đạo: Dễ phát sinh trì trệ hành chính; nên kiểm tra chéo y lệnh 2 lần.' }
];

// Hướng Xuất Hành: Hỷ Thần (Niềm vui/Nhân duyên), Tài Thần (Tài lộc/Thuận lợi), Hắc Thần (Hướng xấu theo Chi)
export const HY_THAN_MAP: Record<string, string> = {
  Giáp: 'Đông Bắc', Kỷ: 'Đông Bắc',
  Ất: 'Tây Bắc', Canh: 'Tây Bắc',
  Bính: 'Tây Nam', Tân: 'Tây Nam',
  Đinh: 'Chính Nam', Nhâm: 'Chính Nam',
  Mậu: 'Đông Nam', Quý: 'Đông Nam'
};

export const TAI_THAN_MAP: Record<string, string> = {
  Giáp: 'Đông Nam', Ất: 'Đông Nam',
  Bính: 'Chính Đông', Đinh: 'Chính Đông',
  Mậu: 'Chính Bắc', Kỷ: 'Chính Nam',
  Canh: 'Tây Nam', Tân: 'Tây Nam',
  Nhâm: 'Chính Tây', Quý: 'Tây Bắc'
};

export const HAC_THAN_MAP: Record<string, string> = {
  Tý: 'Tây Bắc', Sửu: 'Chính Tây', Dần: 'Tây Nam', Mão: 'Chính Nam',
  Thìn: 'Đông Nam', Tỵ: 'Chính Đông', Ngọ: 'Đông Bắc', Mùi: 'Chính Bắc',
  Thân: 'Tây Bắc', Dậu: 'Chính Tây', Tuất: 'Tây Nam', Hợi: 'Chính Nam'
};

// 28 NHỊ THẬP BÁT TÚ (Nhân sinh + Truyền Nhiễm cân bằng)
export const NHI_THAP_BAT_TU: SaoTuItem[] = [
  { name: 'Giác', element: 'Mộc', animal: 'Giao', type: 'cat', score: 10, poem: 'Giác tinh tạo tác chủ vinh xương', desc: 'Đại Cát: Giao tế, khởi đầu dự định mới, ký kết và hội chẩn liên khoa đều thuận lợi.' },
  { name: 'Cang', element: 'Kim', animal: 'Long', type: 'hung', score: -8, poem: 'Cang tinh chiếu mệnh chớ vội vàng', desc: 'Sao Hung: Dễ phát sinh bất đồng quan điểm; giữ bình tĩnh khi trao đổi và tránh mạo hiểm.' },
  { name: 'Đê', element: 'Thổ', animal: 'Lạc', type: 'hung', score: -10, poem: 'Đê tinh nhiều việc dễ trắc trở', desc: 'Sao Hung: Nên làm việc quen thuộc, tránh khởi sự lớn hoặc đổi phác đồ đột ngột không cấp bách.' },
  { name: 'Phòng', element: 'Nhật', animal: 'Thỏ', type: 'cat', score: 14, poem: 'Phòng tinh nhật nguyệt sáng soi đường', desc: 'Đại Cát: Gia đạo an vui, tài lộc hanh thông, công việc chuyên môn tiến triển tích cực.' },
  { name: 'Tâm', element: 'Nguyệt', animal: 'Hồ', type: 'hung', score: -12, poem: 'Tâm tinh bất ổn giữ tâm an', desc: 'Sao Hung: Tâm trạng dễ dao động, chú ý chất lượng giấc ngủ và cân bằng áp lực.' },
  { name: 'Vĩ', element: 'Hỏa', animal: 'Hổ', type: 'cat', score: 12, poem: 'Vĩ tinh rạng rỡ phúc lộc đầy', desc: 'Sao Cát: Rất tốt cho gặp gỡ đối tác, giao ban chuyên môn và mở rộng kết nối xã hội.' },
  { name: 'Cơ', element: 'Thủy', animal: 'Báo', type: 'cat', score: 10, poem: 'Cơ tinh học thuật tiến bước nhanh', desc: 'Sao Cát: Thuận lợi học tập, đọc y văn EBM, tổng kết dữ liệu và sắp xếp không gian sống.' },
  { name: 'Đẩu', element: 'Mộc', animal: 'Giải', type: 'cat', score: 15, poem: 'Đẩu tinh đại cát vạn sự thành', desc: 'Thất Tinh Đại Cát: Giải quyết ca khó sáng suốt, tài lộc và công danh cùng khởi sắc.' },
  { name: 'Ngưu', element: 'Kim', animal: 'Ngưu', type: 'hung', score: -8, poem: 'Ngưu tinh chậm nhịp chớ hấp tấp', desc: 'Sao Hung: Tiến độ công việc có thể chậm lại; cần rà soát kỹ giấy tờ và chi tiêu.' },
  { name: 'Nữ', element: 'Thổ', animal: 'Bức', type: 'hung', score: -10, poem: 'Nữ tinh lời nói giữ ôn hòa', desc: 'Sao Hung: Chú trọng cách lắng nghe người thân và bệnh nhân để tránh hiểu lầm.' },
  { name: 'Hư', element: 'Nhật', animal: 'Thử', type: 'hung', score: -12, poem: 'Hư tinh dễ mệt chớ lao tâm', desc: 'Sao Hung: Năng lượng thể chất dễ hao hụt, ưu tiên nghỉ ngơi và bù nước điện giải.' },
  { name: 'Nguy', element: 'Nguyệt', animal: 'Yến', type: 'hung', score: -10, poem: 'Nguy tinh đi đứng cẩn trọng cao', desc: 'Sao Hung: Cẩn thận khi di chuyển, theo dõi sát các dấu hiệu cảnh báo sớm trên lâm sàng.' },
  { name: 'Thất', element: 'Hỏa', animal: 'Trư', type: 'cat', score: 15, poem: 'Thất tinh vượng khí ấm êm nhà', desc: 'Thất Tinh Đại Cát: Sinh khí dồi dào, thuận lợi xây đắp gia đình, sửa sang nhà cửa và điều trị.' },
  { name: 'Bích', element: 'Thủy', animal: 'Du', type: 'cat', score: 15, poem: 'Bích tinh văn chương đức độ cao', desc: 'Thất Tinh Đại Cát: Xuất sắc cho nghiên cứu khoa học, viết lách, thi cử và giảng dạy.' },
  { name: 'Khuê', element: 'Mộc', animal: 'Lang', type: 'hung', score: -10, poem: 'Khuê tinh chớ vội bước đi xa', desc: 'Sao Hung: Hạn chế đi xa nếu không cần thiết, bám sát quy trình an toàn thường quy.' },
  { name: 'Lâu', element: 'Kim', animal: 'Cẩu', type: 'cat', score: 12, poem: 'Lâu tinh phúc lộc đến từ tâm', desc: 'Sao Cát: Rất đẹp cho khai trương, ký kết, hẹn gặp người quan trọng và chăm sóc sức khỏe.' },
  { name: 'Vị', element: 'Thổ', animal: 'Trĩ', type: 'cat', score: 10, poem: 'Vị tinh hòa hợp đắc nhân tâm', desc: 'Sao Cát: Mối quan hệ gia đình, đồng nghiệp và bệnh nhân gắn kết, tin cậy lẫn nhau.' },
  { name: 'Mão', element: 'Nhật', animal: 'Kê', type: 'hung', score: -12, poem: 'Mão tinh tránh chuyện thị phi ngoài', desc: 'Sao Hung: Giữ kín đáo thông tin, tránh tranh luận vô bổ và giữ nhịp sinh hoạt điều độ.' },
  { name: 'Tất', element: 'Nguyệt', animal: 'Ô', type: 'cat', score: 12, poem: 'Tất tinh che chở hóa bình an', desc: 'Sao Cát: Hóa giải trở ngại, tìm ra lời giải cho bài toán khó cả trong đời sống lẫn bệnh phòng.' },
  { name: 'Chủy', element: 'Hỏa', animal: 'Hầu', type: 'hung', score: -8, poem: 'Chủy tinh giữ hòa khí quanh mình', desc: 'Sao Hung: Dễ vướng bận chuyện nhỏ; giao tiếp ngắn gọn, rõ ràng theo trọng tâm.' },
  { name: 'Sâm', element: 'Thủy', animal: 'Viên', type: 'cat', score: 10, poem: 'Sâm tinh thịnh vượng mở tầm nhìn', desc: 'Sao Cát: Tốt cho lập kế hoạch dài hạn, học kỹ năng mới và triển khai dự án chuyên môn.' },
  { name: 'Tỉnh', element: 'Mộc', animal: 'Hãn', type: 'cat', score: 12, poem: 'Tỉnh tinh suối mát dưỡng tinh thần', desc: 'Sao Cát: Tâm trí thanh tĩnh, giải quyết vấn đề tài chính và công việc dứt khoát.' },
  { name: 'Quỷ', element: 'Kim', animal: 'Dương', type: 'hung', score: -15, poem: 'Quỷ tinh thận trọng giữ an toàn', desc: 'Đại Hung: Ngày nên sống chậm, giữ an toàn giao thông, kiểm soát nhiễm khuẩn và chi tiêu.' },
  { name: 'Liễu', element: 'Thổ', animal: 'Chướng', type: 'hung', score: -10, poem: 'Liễu tinh dễ phân tán tập trung', desc: 'Sao Hung: Nên dùng checklist công việc để không bỏ sót việc quan trọng.' },
  { name: 'Tinh', element: 'Nhật', animal: 'Mã', type: 'hung', score: -8, poem: 'Tinh tinh chớ vội quyết định nhanh', desc: 'Sao Hung: Suy nghĩ thấu đáo hai lần trước khi chi tiền lớn hoặc đổi hướng điều trị.' },
  { name: 'Trương', element: 'Nguyệt', animal: 'Lộc', type: 'cat', score: 14, poem: 'Trương tinh rạng rỡ đón tin vui', desc: 'Đại Cát: Gặp gỡ thuận hòa, hợp tác suôn sẻ, hội chẩn và nghiên cứu đạt kết quả cao.' },
  { name: 'Dực', element: 'Hỏa', animal: 'Xà', type: 'cat', score: 15, poem: 'Dực tinh chắp cánh vươn tầm cao', desc: 'Thất Tinh Đại Cát: Cát khí mạnh mẽ cho phát triển bản thân, công việc và xử trí ca phức tạp.' },
  { name: 'Chẩn', element: 'Thủy', animal: 'Dẫn', type: 'cat', score: 12, poem: 'Chẩn tinh an lành mọi nẻo đường', desc: 'Đại Cát: Tốt cho xuất hành, kết nối bạn bè, thăm hỏi và chẩn đoán bệnh lý.' }
];

// 12 TRỰC NGÀY
export const TRUC_LIST: TrucItem[] = [
  { name: 'Kiến', type: 'cat', rating: 'Đại Cát', score: 12, desc: 'Khởi đầu năng lượng mới, gặp gỡ, nhận nhiệm vụ mới.', lifeHint: 'Rất tốt cho xuất hành, bắt đầu thói quen lành mạnh, lên kế hoạch tuần.' },
  { name: 'Trừ', type: 'cat', rating: 'Cát', score: 10, desc: 'Thanh lọc, loại bỏ điều cũ kỹ, giải quyết tồn đọng.', lifeHint: 'Hợp dọn dẹp nhà cửa, cắt bỏ thói quen xấu, thanh toán công nợ, kiểm soát nguồn nhiễm.' },
  { name: 'Mãn', type: 'cat', rating: 'Đại Cát', score: 12, desc: 'Đầy đủ, viên mãn, thu hoạch thành quả.', lifeHint: 'Tốt cho sum họp gia đình, ký kết hợp đồng, tổng kết công việc.' },
  { name: 'Bình', type: 'cat', rating: 'Bình Hòa', score: 8, desc: 'Cân bằng, ổn định, êm ả.', lifeHint: 'Thích hợp duy trì nhịp sinh hoạt điều độ, hòa giải mâu thuẫn, chăm sóc sức khỏe.' },
  { name: 'Định', type: 'cat', rating: 'Đại Cát', score: 15, desc: 'Vững vàng, xác lập mục tiêu, định vị rõ ràng.', lifeHint: 'Rất tốt để chốt kế hoạch dài hạn, bàn chuyện quan trọng với gia đình.' },
  { name: 'Chấp', type: 'neutral', rating: 'Bình Hòa', score: 5, desc: 'Nắm giữ, kiên trì theo đuổi mục tiêu.', lifeHint: 'Làm tốt các việc thường nhật, bảo dưỡng thiết bị, giữ vững kỷ luật cá nhân.' },
  { name: 'Phá', type: 'hung', rating: 'Đại Hung', score: -15, desc: 'Xung phá, dễ đổ vỡ kế hoạch nếu gượng ép.', lifeHint: 'Tránh tranh cãi, tránh mua sắm lớn hoặc bắt đầu việc đại sự; chỉ hợp tháo dỡ đồ cũ.' },
  { name: 'Nguy', type: 'hung', rating: 'Hung', score: -8, desc: 'Tiềm ẩn rủi ro, cần bước đi cẩn trọng.', lifeHint: 'Chú ý an toàn đi lại, không leo trèo cao hay thức quá khuya.' },
  { name: 'Thành', type: 'cat', rating: 'Đại Cát', score: 15, desc: 'Thành tựu, hoàn tất mỹ mãn.', lifeHint: 'Cực tốt cho khai trương, ký kết, xuất viện, nghiệm thu công việc.' },
  { name: 'Thâu', type: 'cat', rating: 'Cát', score: 10, desc: 'Thu nạp, tích lũy tài lộc và tri thức.', lifeHint: 'Tốt cho học tập, cất giữ tài sản, tổng hợp kết quả và thu hồi công nợ.' },
  { name: 'Khai', type: 'cat', rating: 'Đại Cát', score: 15, desc: 'Khai thông, mở mang tầm nhìn và cơ hội.', lifeHint: 'Rất đẹp để xuất hành, gặp gỡ đối tác mới, bắt đầu dự án hoặc khởi động phác đồ.' },
  { name: 'Bế', type: 'hung', rating: 'Hung', score: -10, desc: 'Đóng kín, thu liễm, nghỉ ngơi bảo toàn năng lượng.', lifeHint: 'Nên nghỉ ngơi sớm, đọc sách tại nhà, hạn chế tụ tập đông hoặc quyết định tài chính rủi ro.' }
];

// 24 TIẾT KHÍ CHUẨN KINH ĐỘ MẶT TRỜI (0° = Xuân Phân, mỗi tiết 15°)
export const TIET_KHI_LIST: TietKhiItem[] = [
  { index: 0, name: 'Xuân Phân', sunLon: 0, score: 8, icon: '☯️', special: 'Ly', climateDesc: 'Ngày đêm dài bằng nhau, tiết trời ôn hòa nhưng dễ có mưa phùn ẩm.', envImpact: 'Độ ẩm không khí tăng cao tạo điều kiện cho nấm mốc và virus hô hấp.', healthTip: 'Giữ nhà cửa thông thoáng, phơi nắng đồ dùng và cân bằng âm dương giấc ngủ.' },
  { index: 1, name: 'Thanh Minh', sunLon: 15, score: 6, icon: '🍃', climateDesc: 'Khí trời trong sáng, ấm dần, cây cối đâm chồi nảy lộc.', envImpact: 'Phấn hoa và bụi mịn tăng nhẹ; thời điểm tốt để dạo bộ ngoài trời.', healthTip: 'Mở cửa đón nắng sáng, vận động ngoài trời 30 phút và đề phòng dị ứng mùa xuân.' },
  { index: 2, name: 'Cốc Vũ', sunLon: 30, score: 4, icon: '🌾', climateDesc: 'Mưa xuân nuôi dưỡng ngũ cốc, độ ẩm cao vào sáng sớm.', envImpact: 'Thấp nhiệt giao mùa dễ làm khớp mỏi và muỗi bắt đầu sinh sôi.', healthTip: 'Chú ý dọn nước đọng quanh nhà phòng lăng quăng/Sốt xuất huyết sớm.' },
  { index: 3, name: 'Lập Hạ', sunLon: 45, score: 6, icon: '☀️', special: 'Tuet', climateDesc: 'Bắt đầu mùa hè, nền nhiệt tăng rõ rệt, nắng gắt hơn về trưa.', envImpact: 'Nhiệt độ tăng thúc đẩy vi khuẩn đường tiêu hóa phát triển nhanh trong thực phẩm.', healthTip: 'Uống đủ 2–2.5L nước/ngày, ăn chín uống sôi và tránh thay đổi nhiệt độ phòng điều hòa đột ngột.' },
  { index: 4, name: 'Tiểu Mãn', sunLon: 60, score: 4, icon: '🌼', climateDesc: 'Nắng ấm xen mưa rào đầu mùa, không khí oi bức hơn.', envImpact: 'Xen kẽ nắng mưa tạo ổ nước đọng cho véc-tơ truyền bệnh.', healthTip: 'Ngủ trưa ngắn 15–20 phút để dưỡng tâm, bổ sung rau xanh giải nhiệt.' },
  { index: 5, name: 'Mang Chủng', sunLon: 75, score: 4, icon: '🌻', climateDesc: 'Mưa dông mùa hạ và nắng nóng đan xen liên tục.', envImpact: 'Độ ẩm nhiệt cao dễ gây bùng phát bệnh ngoài da và nhiễm trùng tiêu hóa.', healthTip: 'Vệ sinh cá nhân sạch sẽ, giữ không gian làm việc khô ráo thoáng mát.' },
  { index: 6, name: 'Hạ Chí', sunLon: 90, score: 8, icon: '🔥', special: 'Ly', climateDesc: 'Ban ngày dài nhất năm, dương khí cực thịnh, nắng nóng đỉnh điểm.', envImpact: 'Nguy cơ kiệt sức do nắng nóng (Heat stress) và mất nước điện giải.', healthTip: 'Hạn chế hoạt động ngoài trời 11h–15h, bù điện giải đầy đủ và tránh đồ uống quá lạnh.' },
  { index: 7, name: 'Tiểu Thử', sunLon: 105, score: 3, icon: '🌡️', climateDesc: 'Nóng ẩm tích tụ, đêm thường oi bức khó ngủ sâu.', envImpact: 'Mật độ muỗi Aedes và bệnh truyền qua thực phẩm đạt mức cao.', healthTip: 'Giữ tâm thái thư giãn, tránh cáu gắt; chú ý kiểm tra thực phẩm bảo quản lạnh.' },
  { index: 8, name: 'Đại Thử', sunLon: 120, score: 2, icon: '💥', climateDesc: 'Đỉnh điểm nắng nóng mùa hè kèm mưa bão bất chợt.', envImpact: 'Thời tiết khắc nghiệt dễ gây mệt mỏi mạn tính và suy giảm miễn dịch tạm thời.', healthTip: 'Ưu tiên làm việc cường độ cao vào sáng sớm, tăng cường nghỉ ngơi phục hồi.' },
  { index: 9, name: 'Lập Thu', sunLon: 135, score: 6, icon: '🍂', special: 'Tuet', climateDesc: 'Bắt đầu chuyển mùa sang thu, sáng tối dịu mát nhưng trưa còn hanh nắng.', envImpact: 'Chênh lệch nhiệt độ ngày - đêm lớn kích thích niêm mạc hô hấp.', healthTip: 'Chú ý giữ ấm cổ họng sáng sớm, uống nước ấm bảo vệ phế khí.' },
  { index: 10, name: 'Xử Thử', sunLon: 150, score: 4, icon: '🌤️', climateDesc: 'Nắng gắt rút dần, bầu trời quang đãng và dễ chịu hơn.', envImpact: 'Môi trường mát mẻ thuận lợi cho tái tạo năng lượng và thể dục ngoài trời.', healthTip: 'Duy trì thói quen đi ngủ trước 23h để cơ thể thích nghi nhịp thu.' },
  { index: 11, name: 'Bạch Lộ', sunLon: 165, score: 4, icon: '🌫️', climateDesc: 'Sương đêm đọng nhiều, không khí bắt đầu se lạnh về khuya.', envImpact: 'Mùa cao điểm Sốt xuất huyết Dengue & bệnh đường hô hấp sau mưa.', healthTip: 'Đóng cửa sổ tránh gió lùa ban đêm, giữ ấm bàn chân khi trực đêm.' },
  { index: 12, name: 'Thu Phân', sunLon: 180, score: 8, icon: '☯️', special: 'Ly', climateDesc: 'Ngày đêm cân bằng, khí hậu mát lành và khô ráo dần.', envImpact: 'Độ ẩm giảm nhẹ tạo cảm giác dễ chịu, tinh thần minh mẫn.', healthTip: 'Dưỡng ẩm da và niêm mạc mũi họng, tận dụng tiết trời đẹp để cân bằng công việc - gia đình.' },
  { index: 13, name: 'Hàn Lộ', sunLon: 195, score: 4, icon: '💧', climateDesc: 'Sương lạnh rõ hơn, khí hậu chuyển hanh khô và mát sâu.', envImpact: 'Virus cúm mùa và RSV bắt đầu gia tăng lưu hành.', healthTip: 'Uống đủ nước ấm, tăng cường vitamin C từ trái cây tươi.' },
  { index: 14, name: 'Sương Giáng', sunLon: 210, score: 4, icon: '❄️', climateDesc: 'Cuối thu chuyển đông, gió mùa về khiến nhiệt độ giảm nhanh.', envImpact: 'Co mạch ngoại biên và dễ khởi phát đợt cấp bệnh hô hấp mạn tính.', healthTip: 'Chuẩn bị áo ấm khi ra ngoài sáng sớm hoặc tan ca trực muộn.' },
  { index: 15, name: 'Lập Đông', sunLon: 225, score: 6, icon: '☃️', special: 'Tuet', climateDesc: 'Chính thức bước vào mùa đông, dương khí thu liễm vào trong.', envImpact: 'Không khí lạnh khô làm giảm sức đề kháng niêm mạc đường thở.', healthTip: 'Ngủ đủ giấc, ăn thực phẩm ấm bụng giàu dinh dưỡng và giữ ấm vùng cổ lưng.' },
  { index: 16, name: 'Tiểu Tuyết', sunLon: 240, score: 4, icon: '🌨️', climateDesc: 'Trời rét nhẹ hoặc âm u nhiều ngày, ánh nắng mặt trời ít đi.', envImpact: 'Thiếu ánh nắng tự nhiên dễ gây chùng xuống tâm trạng (Seasonal dip).', healthTip: 'Tăng ánh sáng ấm trong phòng làm việc, vận động tại chỗ giữa các phiên làm việc.' },
  { index: 17, name: 'Đại Tuyết', sunLon: 255, score: 3, icon: '🏔️', climateDesc: 'Gió lạnh tăng cường, không khí rét sâu và khô.', envImpact: 'Nguy cơ tăng huyết áp mùa lạnh và nhiễm trùng hô hấp cộng đồng.', healthTip: 'Tránh tắm nước lạnh khuya, kiểm tra thông gió an toàn trong phòng kín.' },
  { index: 18, name: 'Đông Chí', sunLon: 270, score: 8, icon: '🌙', special: 'Ly', climateDesc: 'Đêm dài nhất năm, cực điểm âm khí nhưng dương khí bắt đầu nảy mầm trở lại.', envImpact: 'Thời điểm thiên nhiên chuyển mình, thích hợp tĩnh dưỡng và sum họp ấm áp.', healthTip: 'Dành thời gian ấm áp bên gia đình, tránh làm việc quá sức về đêm.' },
  { index: 19, name: 'Tiểu Hàn', sunLon: 285, score: 3, icon: '❄️', climateDesc: 'Trời rét đậm, độ ẩm thấp hoặc mưa phùn lạnh giá.', envImpact: 'Dễ gây cứng khớp buổi sáng và lây lan virus đường hô hấp trong không gian kín.', healthTip: 'Khởi động nhẹ 5 phút sau khi thức dậy, rửa tay thường xuyên.' },
  { index: 20, name: 'Đại Hàn', sunLon: 300, score: 3, icon: '🧊', climateDesc: 'Đỉnh điểm lạnh cuối đông chuẩn bị giao sang mùa xuân.', envImpact: 'Áp lực chuyển mùa lên hệ tim mạch và hô hấp ở người lớn tuổi.', healthTip: 'Giữ ấm cơ thể trọn vẹn, chuẩn bị dọn dẹp làm mới không gian sống đón xuân.' },
  { index: 21, name: 'Lập Xuân', sunLon: 315, score: 7, icon: '🌱', special: 'Tuet', climateDesc: 'Khởi đầu vòng tuần hoàn mới, gió xuân ấm áp thổi về.', envImpact: 'Sinh khí vạn vật hồi sinh, tinh thần phấn chấn nhưng thời tiết hay thay đổi đột ngột.', healthTip: 'Lập kế hoạch mục tiêu năm mới, mở rộng kết nối tích cực và vận động nhẹ.' },
  { index: 22, name: 'Vũ Thủy', sunLon: 330, score: 5, icon: '🌧️', climateDesc: 'Mưa xuân lất phất, không khí ẩm dịu.', envImpact: 'Ẩm ướt dễ sinh nấm mốc trong tủ đồ và tường nhà.', healthTip: 'Chú ý hút ẩm không gian sống và giữ khô ráo giày dép, quần áo.' },
  { index: 23, name: 'Kinh Trập', sunLon: 345, score: 5, icon: '⚡', climateDesc: 'Sấm xuân đánh thức vạn vật, nhiệt độ tăng nhanh và có gió mùa.', envImpact: 'Côn trùng và véc-tơ sinh học bắt đầu hoạt động mạnh trở lại.', healthTip: 'Vệ sinh môi trường xung quanh nhà, ăn uống thanh đạm hỗ trợ gan mật.' }
];

export const THIEN_DUC_MAP: Record<number, string> = {
  1: 'Đinh', 2: 'Thân', 3: 'Nhâm', 4: 'Tân', 5: 'Hợi', 6: 'Giáp',
  7: 'Quý', 8: 'Dần', 9: 'Bính', 10: 'Ất', 11: 'Tỵ', 12: 'Canh'
};

export const NGUYET_DUC_MAP: Record<number, string> = {
  1: 'Bính', 5: 'Bính', 9: 'Bính',
  2: 'Giáp', 6: 'Giáp', 10: 'Giáp',
  3: 'Nhâm', 7: 'Nhâm', 11: 'Nhâm',
  4: 'Canh', 8: 'Canh', 12: 'Canh'
};

export const THIEN_AT_MAP: Record<string, string[]> = {
  Giáp: ['Sửu', 'Mùi'], Mậu: ['Sửu', 'Mùi'],
  Canh: ['Dần', 'Ngọ'], Tân: ['Dần', 'Ngọ'],
  Ất: ['Tý', 'Thân'], Kỷ: ['Tý', 'Thân'],
  Bính: ['Hợi', 'Dậu'], Đinh: ['Hợi', 'Dậu'],
  Nhâm: ['Mão', 'Tỵ'], Quý: ['Mão', 'Tỵ']
};

export const LOC_THAN_MAP: Record<string, string> = {
  Giáp: 'Dần', Ất: 'Mão', Bính: 'Tỵ', Mậu: 'Tỵ',
  Đinh: 'Ngọ', Kỷ: 'Ngọ', Canh: 'Thân', Tân: 'Dậu',
  Nhâm: 'Hợi', Quý: 'Tý'
};

export const PROFILE_KEY = 'cliniportal_doctor_full_profile_v3';

// ─── 60 HOA GIÁP NẠP ÂM ───────────────────────────────────────────────────
export const LUC_THAP_HOA_GIAP_NAP_AM: Record<string, NapAmDetail> = {
  'Giáp Tý': { canChi: 'Giáp Tý', name: 'Hải Trung Kim', element: 'Kim', meaning: 'Vàng dưới đáy biển — Nội lực sâu lắng, bền bỉ và kín đáo.' },
  'Ất Sửu': { canChi: 'Ất Sửu', name: 'Hải Trung Kim', element: 'Kim', meaning: 'Vàng trong biển — Kiên định, vững vàng và giàu chiều sâu.' },
  'Bính Dần': { canChi: 'Bính Dần', name: 'Lư Trung Hỏa', element: 'Hỏa', meaning: 'Lửa trong lò — Nhiệt huyết mạnh mẽ, sinh khí bùng cháy.' },
  'Đinh Mão': { canChi: 'Đinh Mão', name: 'Lư Trung Hỏa', element: 'Hỏa', meaning: 'Lửa trong lò — Ấm áp, quyết đoán và tận tụy.' },
  'Mậu Thìn': { canChi: 'Mậu Thìn', name: 'Đại Lâm Mộc', element: 'Mộc', meaning: 'Gỗ rừng già — Vững chãi che chở, tầm nhìn bao quát.' },
  'Kỷ Tỵ': { canChi: 'Kỷ Tỵ', name: 'Đại Lâm Mộc', element: 'Mộc', meaning: 'Gỗ rừng già — Sức sống dẻo dai, nâng đỡ xung quanh.' },
  'Canh Ngọ': { canChi: 'Canh Ngọ', name: 'Lộ Bàng Thổ', element: 'Thổ', meaning: 'Đất ven đường — Nền tảng vững chắc, thẳng thắn, bao dung.' },
  'Tân Mùi': { canChi: 'Tân Mùi', name: 'Lộ Bàng Thổ', element: 'Thổ', meaning: 'Đất ven đường — Bình ổn, độ lượng và đáng tin cậy.' },
  'Nhâm Thân': { canChi: 'Nhâm Thân', name: 'Kiếm Phong Kim', element: 'Kim', meaning: 'Vàng mũi kiếm — Sắc bén, dứt khoát và tư duy phân tích chuẩn.' },
  'Quý Dậu': { canChi: 'Quý Dậu', name: 'Kiếm Phong Kim', element: 'Kim', meaning: 'Vàng mũi kiếm — Nhạy bén, tinh tế và minh bạch.' },
  'Giáp Tuất': { canChi: 'Giáp Tuất', name: 'Sơn Đầu Hỏa', element: 'Hỏa', meaning: 'Lửa trên đỉnh núi — Tỏa sáng dẫn đường từ tầm cao.' },
  'Ất Hợi': { canChi: 'Ất Hợi', name: 'Sơn Đầu Hỏa', element: 'Hỏa', meaning: 'Lửa trên đỉnh núi — Quang minh, tiên phong và giàu năng lượng.' },
  'Bính Tý': { canChi: 'Bính Tý', name: 'Giản Hạ Thủy', element: 'Thủy', meaning: 'Nước dưới khe — Tinh tế, uyển chuyển và sâu sắc.' },
  'Đinh Sửu': { canChi: 'Đinh Sửu', name: 'Giản Hạ Thủy', element: 'Thủy', meaning: 'Nước dưới khe — Điềm đạm, mát lành và nuôi dưỡng.' },
  'Mậu Dần': { canChi: 'Mậu Dần', name: 'Thành Đầu Thổ', element: 'Thổ', meaning: 'Đất trên mặt thành — Kiên cố, che chắn và giữ vững nguyên tắc.' },
  'Kỷ Mão': { canChi: 'Kỷ Mão', name: 'Thành Đầu Thổ', element: 'Thổ', meaning: 'Đất trên mặt thành — Bảo vệ bình an, trật tự và bền vững.' },
  'Canh Thìn': { canChi: 'Canh Thìn', name: 'Bạch Lạp Kim', element: 'Kim', meaning: 'Vàng sáp ong — Thanh khiết, minh bạch và chuẩn mực.' },
  'Tân Tỵ': { canChi: 'Tân Tỵ', name: 'Bạch Lạp Kim', element: 'Kim', meaning: 'Vàng sáp ong — Tinh xảo, khéo léo và cẩn trọng.' },
  'Nhâm Ngọ': { canChi: 'Nhâm Ngọ', name: 'Dương Liễu Mộc', element: 'Mộc', meaning: 'Gỗ cây liễu — Linh hoạt ứng biến, mềm dẻo trước áp lực.' },
  'Quý Mùi': { canChi: 'Quý Mùi', name: 'Dương Liễu Mộc', element: 'Mộc', meaning: 'Gỗ cây liễu — Nhu thắng cương, thấu cảm và thích nghi nhanh.' },
  'Giáp Thân': { canChi: 'Giáp Thân', name: 'Tuyền Trung Thủy', element: 'Thủy', meaning: 'Nước trong suối nguồn — Mạch sống tươi mới, tuôn chảy không ngừng.' },
  'Ất Dậu': { canChi: 'Ất Dậu', name: 'Tuyền Trung Thủy', element: 'Thủy', meaning: 'Nước trong suối nguồn — Trong trẻo, phục hồi và chữa lành.' },
  'Bính Tuất': { canChi: 'Bính Tuất', name: 'Ốc Thượng Thổ', element: 'Thổ', meaning: 'Đất mái ngói — Che mưa chắn gió, bảo vệ gia đạo bình yên.' },
  'Đinh Hợi': { canChi: 'Đinh Hợi', name: 'Ốc Thượng Thổ', element: 'Thổ', meaning: 'Đất mái ngói — An yên, chu toàn và vững vàng.' },
  'Mậu Tý': { canChi: 'Mậu Tý', name: 'Tích Lịch Hỏa', element: 'Hỏa', meaning: 'Lửa sấm sét — Nhanh nhạy, quyết đoán trong khoảnh khắc quyết định.' },
  'Kỷ Sửu': { canChi: 'Kỷ Sửu', name: 'Tích Lịch Hỏa', element: 'Hỏa', meaning: 'Lửa sấm sét — Sức bật mạnh mẽ, phá tan bế tắc.' },
  'Canh Dần': { canChi: 'Canh Dần', name: 'Tùng Bách Mộc', element: 'Mộc', meaning: 'Gỗ tùng bách — Kiên cường vượt thử thách, vững tâm bền chí.' },
  'Tân Mão': { canChi: 'Tân Mão', name: 'Tùng Bách Mộc', element: 'Mộc', meaning: 'Gỗ tùng bách — Sức sống trường tồn, ổn định lâu dài.' },
  'Nhâm Thìn': { canChi: 'Nhâm Thìn', name: 'Trường Lưu Thủy', element: 'Thủy', meaning: 'Nước sông lớn — Lưu thông hanh thông, tầm nhìn rộng mở.' },
  'Quý Tỵ': { canChi: 'Quý Tỵ', name: 'Trường Lưu Thủy', element: 'Thủy', meaning: 'Nước sông dài — Trí tuệ bao la, kết nối bền chặt.' },
  'Giáp Ngọ': { canChi: 'Giáp Ngọ', name: 'Sa Trung Kim', element: 'Kim', meaning: 'Vàng trong cát — Giá trị bền lâu, cần sự kiên nhẫn tinh lọc.' },
  'Ất Mùi': { canChi: 'Ất Mùi', name: 'Sa Trung Kim', element: 'Kim', meaning: 'Vàng trong cát — Khiêm nhường mà quý giá, y đức sáng.' },
  'Bính Thân': { canChi: 'Bính Thân', name: 'Sơn Hạ Hỏa', element: 'Hỏa', meaning: 'Lửa dưới chân núi — Ấm áp bền bỉ, tích tụ nội lực.' },
  'Đinh Dậu': { canChi: 'Đinh Dậu', name: 'Sơn Hạ Hỏa', element: 'Hỏa', meaning: 'Lửa dưới chân núi — Ánh sáng ổn định, xua tan u ám.' },
  'Mậu Tuất': { canChi: 'Mậu Tuất', name: 'Bình Địa Mộc', element: 'Mộc', meaning: 'Gỗ đồng bằng — Dễ hòa đồng, thân thiện và lan tỏa thiện cảm.' },
  'Kỷ Hợi': { canChi: 'Kỷ Hợi', name: 'Bình Địa Mộc', element: 'Mộc', meaning: 'Gỗ đồng bằng — Sinh sôi phát triển, thuận hòa nhân duyên.' },
  'Canh Tý': { canChi: 'Canh Tý', name: 'Bích Thượng Thổ', element: 'Thổ', meaning: 'Đất trên vách tường — Điểm tựa vững chãi, bảo vệ an toàn.' },
  'Tân Sửu': { canChi: 'Tân Sửu', name: 'Bích Thượng Thổ', element: 'Thổ', meaning: 'Đất trên vách tường — An tâm, kiên trì và trách nhiệm.' },
  'Nhâm Dần': { canChi: 'Nhâm Dần', name: 'Kim Bạc Kim', element: 'Kim', meaning: 'Vàng mạ bạc — Sáng sủa, chỉn chu và tinh tế.' },
  'Quý Mão': { canChi: 'Quý Mão', name: 'Kim Bạc Kim', element: 'Kim', meaning: 'Vàng mạ bạc — Chuẩn mực cao, nghệ thuật giao tiếp khéo léo.' },
  'Giáp Thìn': { canChi: 'Giáp Thìn', name: 'Phúc Đăng Hỏa', element: 'Hỏa', meaning: 'Lửa ngọn đèn — Soi tỏ chi tiết ẩn giấu giữa màn sương.' },
  'Ất Tỵ': { canChi: 'Ất Tỵ', name: 'Phúc Đăng Hỏa', element: 'Hỏa', meaning: 'Lửa ngọn đèn — Thắp sáng hy vọng và sự ấm áp.' },
  'Bính Ngọ': { canChi: 'Bính Ngọ', name: 'Thiên Hà Thủy', element: 'Thủy', meaning: 'Nước mưa trên trời — Mát lành, giải tỏa căng thẳng và chữa lành.' },
  'Đinh Mùi': { canChi: 'Đinh Mùi', name: 'Thiên Hà Thủy', element: 'Thủy', meaning: 'Nước mưa trên trời — Thanh lọc tâm trí, nuôi dưỡng vạn vật.' },
  'Mậu Thân': { canChi: 'Mậu Thân', name: 'Đại Trạch Thổ', element: 'Thổ', meaning: 'Đất đầm phù sa — Màu mỡ, trù phú và bao dung.' },
  'Kỷ Dậu': { canChi: 'Kỷ Dậu', name: 'Đại Trạch Thổ', element: 'Thổ', meaning: 'Đất cồn bãi — Khả năng tái tạo và phục hồi dồi dào.' },
  'Canh Tuất': { canChi: 'Canh Tuất', name: 'Thoa Xuyến Kim', element: 'Kim', meaning: 'Vàng trang sức — Tinh xảo, khéo léo và chuẩn xác.' },
  'Tân Hợi': { canChi: 'Tân Hợi', name: 'Thoa Xuyến Kim', element: 'Kim', meaning: 'Vàng trang sức — Nhẹ nhàng, lịch thiệp và đáng mến.' },
  'Nhâm Tý': { canChi: 'Nhâm Tý', name: 'Tang Đố Mộc', element: 'Mộc', meaning: 'Gỗ cây dâu — Vị thuốc quý, dưỡng huyết và điều hòa.' },
  'Quý Sửu': { canChi: 'Quý Sửu', name: 'Tang Đố Mộc', element: 'Mộc', meaning: 'Gỗ cây dâu — Chăm chỉ, thực tế và cân bằng tốt.' },
  'Giáp Dần': { canChi: 'Giáp Dần', name: 'Đại Khê Thủy', element: 'Thủy', meaning: 'Nước khe lớn — Năng lượng cuộn chảy, thanh lọc cặn bã.' },
  'Ất Mão': { canChi: 'Ất Mão', name: 'Đại Khê Thủy', element: 'Thủy', meaning: 'Nước khe lớn — Điều hòa cân bằng, linh hoạt cao.' },
  'Bính Thìn': { canChi: 'Bính Thìn', name: 'Sa Trung Thổ', element: 'Thổ', meaning: 'Đất pha cát — Tơi xốp, dung hòa nhiều yếu tố đa dạng.' },
  'Đinh Tỵ': { canChi: 'Đinh Tỵ', name: 'Sa Trung Thổ', element: 'Thổ', meaning: 'Đất phù sa — Bồi đắp sinh lực, phục hồi bền bỉ.' },
  'Mậu Ngọ': { canChi: 'Mậu Ngọ', name: 'Thiên Thượng Hỏa', element: 'Hỏa', meaning: 'Lửa Thái Dương — Quang minh chính đại, chiếu rọi khắp nơi.' },
  'Kỷ Mùi': { canChi: 'Kỷ Mùi', name: 'Thiên Thượng Hỏa', element: 'Hỏa', meaning: 'Lửa trên trời — Rực rỡ, ấm áp và lan tỏa tích cực.' },
  'Canh Thân': { canChi: 'Canh Thân', name: 'Thạch Lựu Mộc', element: 'Mộc', meaning: 'Gỗ cây thạch lựu — Kiên cường, sức sống mạnh mẽ.' },
  'Tân Dậu': { canChi: 'Tân Dậu', name: 'Thạch Lựu Mộc', element: 'Mộc', meaning: 'Gỗ cây thạch lựu — Vững vàng trước nghịch cảnh và áp lực.' },
  'Nhâm Tuất': { canChi: 'Nhâm Tuất', name: 'Đại Hải Thủy', element: 'Thủy', meaning: 'Nước đại dương — Bao la dung nạp, tầm nhìn chiến lược.' },
  'Quý Hợi': { canChi: 'Quý Hợi', name: 'Đại Hải Thủy', element: 'Thủy', meaning: 'Nước biển lớn — Chiều sâu trí tuệ, khép cũ mở mới.' }
};

export const SAO_DANG_VIEN_MAP: Record<string, { chiList: string[]; bonus: number; meaning: string }> = {
  Giác: { chiList: ['Dần'], bonus: 10, meaning: 'Đăng Viên tại Dần: Cát khí thăng hoa, mọi việc hanh thông.' },
  Cang: { chiList: ['Thìn'], bonus: 8, meaning: 'Đăng Viên tại Thìn: Hoán Hung thành Cát, công việc an ổn.' },
  Đê: { chiList: ['Thìn'], bonus: 14, meaning: 'Đăng Viên tại Thìn: Hung tinh hóa Thần Tinh, đại lợi.' },
  Phòng: { chiList: ['Mão', 'Dậu'], bonus: 10, meaning: 'Đăng Viên tại Mão/Dậu: Nhật nguyệt quang minh, gia đạo và điều trị đều tốt.' },
  Tâm: { chiList: ['Dần'], bonus: 6, meaning: 'Đăng Viên tại Dần: Giảm hung sát, ổn định tâm lý.' },
  Vĩ: { chiList: ['Dần', 'Ngọ', 'Tuất'], bonus: 10, meaning: 'Đăng Viên Tam Hợp Hỏa: Rạng rỡ công danh và giao tiếp.' },
  Cơ: { chiList: ['Thìn'], bonus: 8, meaning: 'Đăng Viên tại Thìn: Học thuật và nghiên cứu khởi sắc.' },
  Đẩu: { chiList: ['Sửu', 'Tỵ', 'Dậu'], bonus: 10, meaning: 'Đăng Viên tại Sửu: Chẩn đoán sáng suốt, tài lộc vượng.' },
  Ngưu: { chiList: ['Ngọ', 'Tuất'], bonus: 8, meaning: 'Đăng Viên tại Ngọ: Xóa hung đắc cát, công việc trôi chảy.' },
  Nữ: { chiList: ['Hợi'], bonus: 6, meaning: 'Đăng Viên tại Hợi: Giao tiếp hòa nhã, bớt tranh cãi.' },
  Hư: { chiList: ['Tý'], bonus: 8, meaning: 'Đăng Viên tại Tý: Bù đắp sinh lực, tinh thần tỉnh táo.' },
  Nguy: { chiList: ['Sửu', 'Dậu'], bonus: 8, meaning: 'Đăng Viên tại Sửu/Dậu: Kiểm soát tốt rủi ro.' },
  Thất: { chiList: ['Dần', 'Ngọ', 'Tuất'], bonus: 10, meaning: 'Đăng Viên tại Ngọ: Sinh khí dồi dào, phục hồi nhanh.' },
  Bích: { chiList: ['Hợi'], bonus: 10, meaning: 'Đăng Viên tại Hợi: Văn chương, học thuật và EBM xuất sắc.' },
  Khuê: { chiList: ['Thân'], bonus: 8, meaning: 'Đăng Viên tại Thân: Khởi sắc dự án mới.' },
  Lâu: { chiList: ['Dậu'], bonus: 10, meaning: 'Đăng Viên tại Dậu: Phúc lộc tăng tiến, gặp gỡ thuận lợi.' },
  Vị: { chiList: ['Tuất'], bonus: 8, meaning: 'Đăng Viên tại Tuất: Đắc nhân tâm, gắn kết gia đình - đồng nghiệp.' },
  Mão: { chiList: ['Mão'], bonus: 8, meaning: 'Đăng Viên tại Mão: Xua tan mây mù, nhìn rõ bản chất vấn đề.' },
  Tất: { chiList: ['Thân'], bonus: 12, meaning: 'Đăng Viên tại Thân: Trị bệnh cứu người đại cát.' },
  Chủy: { chiList: ['Dậu'], bonus: 6, meaning: 'Đăng Viên tại Dậu: Dễ đạt đồng thuận.' },
  Sâm: { chiList: ['Tuất'], bonus: 10, meaning: 'Đăng Viên tại Tuất: Công danh sự nghiệp thuận lợi.' },
  Tỉnh: { chiList: ['Tý'], bonus: 10, meaning: 'Đăng Viên tại Tý: Quyết đoán sáng suốt, xử trí dứt khoát.' },
  Quỷ: { chiList: ['Tý', 'Thân'], bonus: 6, meaning: 'Tạm hóa giải hung tính, giữ an toàn là trên hết.' },
  Liễu: { chiList: ['Ngọ'], bonus: 8, meaning: 'Đăng Viên tại Ngọ: Giữ vững định hướng, tránh phân tâm.' },
  Tinh: { chiList: ['Dần'], bonus: 8, meaning: 'Đăng Viên tại Dần: Điềm tĩnh xử lý việc khó.' },
  Trương: { chiList: ['Mùi'], bonus: 10, meaning: 'Đăng Viên tại Mùi: Đồng thuận cao khi hợp tác và hội chẩn.' },
  Dực: { chiList: ['Thân'], bonus: 12, meaning: 'Đăng Viên tại Thân: Vượt trở ngại ngoạn mục.' },
  Chẩn: { chiList: ['Tỵ'], bonus: 10, meaning: 'Đăng Viên tại Tỵ: Chẩn đoán và xuất hành hanh thông.' }
};

export const THIEN_CAN_HOP_HOA: Record<string, { partner: string; resultHanh: ElementType }> = {
  Giáp: { partner: 'Kỷ', resultHanh: 'Thổ' },
  Kỷ: { partner: 'Giáp', resultHanh: 'Thổ' },
  Ất: { partner: 'Canh', resultHanh: 'Kim' },
  Canh: { partner: 'Ất', resultHanh: 'Kim' },
  Bính: { partner: 'Tân', resultHanh: 'Thủy' },
  Tân: { partner: 'Bính', resultHanh: 'Thủy' },
  Đinh: { partner: 'Nhâm', resultHanh: 'Mộc' },
  Nhâm: { partner: 'Đinh', resultHanh: 'Mộc' },
  Mậu: { partner: 'Quý', resultHanh: 'Hỏa' },
  Quý: { partner: 'Mậu', resultHanh: 'Hỏa' }
};

export const THIEN_CAN_XUNG_PHA: Record<string, string[]> = {
  Giáp: ['Canh', 'Mậu'], Ất: ['Tân', 'Kỷ'], Bính: ['Nhâm', 'Canh'],
  Đinh: ['Quý', 'Tân'], Mậu: ['Giáp', 'Nhâm'], Kỷ: ['Ất', 'Quý'],
  Canh: ['Bính', 'Giáp'], Tân: ['Đinh', 'Ất'], Nhâm: ['Mậu', 'Bính'],
  Quý: ['Kỷ', 'Đinh']
};

// Thần Sát
export const THIEN_Y_MAP: Record<number, string> = {
  1: 'Sửu', 2: 'Dần', 3: 'Mão', 4: 'Thìn', 5: 'Tỵ', 6: 'Ngọ',
  7: 'Mùi', 8: 'Thân', 9: 'Dậu', 10: 'Tuất', 11: 'Hợi', 12: 'Tý'
};

export const SINH_KHI_MAP: Record<number, string> = {
  1: 'Tý', 2: 'Sửu', 3: 'Dần', 4: 'Mão', 5: 'Thìn', 6: 'Tỵ',
  7: 'Ngọ', 8: 'Mùi', 9: 'Thân', 10: 'Dậu', 11: 'Tuất', 12: 'Hợi'
};

export const SAT_CHU_MAP: Record<number, string> = {
  1: 'Tỵ', 2: 'Tý', 3: 'Mùi', 4: 'Mão', 5: 'Thân', 6: 'Tuất',
  7: 'Sửu', 8: 'Hợi', 9: 'Ngọ', 10: 'Dậu', 11: 'Dần', 12: 'Thìn'
};

export const THO_TU_MAP: Record<number, string> = {
  1: 'Tuất', 2: 'Thìn', 3: 'Hợi', 4: 'Tỵ', 5: 'Tý', 6: 'Ngọ',
  7: 'Sửu', 8: 'Mùi', 9: 'Dần', 10: 'Thân', 11: 'Mão', 12: 'Dậu'
};

export const DAO_CHIEM_SAT_DAYS: Record<number, string[]> = {
  1: ['Tý', 'Hợi'], 2: ['Dần', 'Mão'], 3: ['Tỵ', 'Ngọ'], 4: ['Thân', 'Dậu'],
  5: ['Thìn', 'Tuất'], 6: ['Sửu', 'Mùi'], 7: ['Tý', 'Hợi'], 8: ['Dần', 'Mão'],
  9: ['Tỵ', 'Ngọ'], 10: ['Thân', 'Dậu'], 11: ['Thìn', 'Tuất'], 12: ['Sửu', 'Mùi']
};

export const THAP_AC_DAI_BAI: { yearCans: string[]; month: number; dayCanChi: string }[] = [
  { yearCans: ['Giáp', 'Kỷ'], month: 3, dayCanChi: 'Mậu Tuất' },
  { yearCans: ['Giáp', 'Kỷ'], month: 7, dayCanChi: 'Quý Hợi' },
  { yearCans: ['Giáp', 'Kỷ'], month: 10, dayCanChi: 'Bính Thân' },
  { yearCans: ['Giáp', 'Kỷ'], month: 11, dayCanChi: 'Đinh Hợi' },
  { yearCans: ['Ất', 'Canh'], month: 4, dayCanChi: 'Nhâm Thân' },
  { yearCans: ['Ất', 'Canh'], month: 9, dayCanChi: 'Ất Tỵ' },
  { yearCans: ['Bính', 'Tân'], month: 3, dayCanChi: 'Tân Tỵ' },
  { yearCans: ['Bính', 'Tân'], month: 9, dayCanChi: 'Canh Thìn' },
  { yearCans: ['Bính', 'Tân'], month: 10, dayCanChi: 'Giáp Thìn' },
  { yearCans: ['Mậu', 'Quý'], month: 6, dayCanChi: 'Kỷ Sửu' }
];

// ─── 5 TÁC VỤ CHUYÊN BIỆT BÁC SĨ TRUYỀN NHIỄM (40%) ──────────────────────
export const MEDICAL_TASKS_CONFIG: Record<MedicalTaskType, MedicalTaskConfig> = {
  bien_luan_fuo: {
    id: 'bien_luan_fuo',
    vuNumber: 81,
    title: 'Biện Luận Sốt CRNN (FUO) & Ca Nhiễm Trùng Khó',
    shortTitle: 'Sốt CRNN (FUO) & Ca Khó',
    icon: '🌡️',
    description: 'Tiếp nhận ca sốt kéo dài chưa rõ nguyên nhân, liên kết yếu tố dịch tễ - vi sinh - hình ảnh học tìm căn nguyên ẩn.',
    specialDays: ['Kỷ Dậu', 'Bính Thìn', 'Nhâm Thìn'],
    baseDays: [
      'Kỷ Dậu', 'Bính Thìn', 'Nhâm Thìn',
      'Giáp Tý', 'Ất Sửu', 'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Nhâm Thân',
      'Quý Dậu', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu', 'Mậu Dần', 'Giáp Thân',
      'Bính Tuất', 'Canh Dần', 'Tân Mão', 'Ất Mùi', 'Bính Ngọ', 'Tân Hợi'
    ],
    hapTruc: ['Chấp', 'Trừ', 'Thành', 'Khai', 'Định'],
    kyTruc: ['Phá', 'Nguy', 'Bế'],
    hapThanSat: ['Thiên Y', 'Sinh Khí', 'Thiên Đức', 'Nguyệt Đức'],
    kyThanSat: ['Sát Chủ', 'Thọ Tử'],
    specialNotes: [
      'Đối chiếu kỹ tam giác dịch tễ, tiền sử phơi nhiễm động vật/du lịch và các xét nghiệm vi sinh âm tính giả.'
    ]
  },
  toi_uu_khang_sinh: {
    id: 'toi_uu_khang_sinh',
    vuNumber: 82,
    title: 'Khởi Đầu & Tối Ưu Kháng Sinh (AMS / PK-PD)',
    shortTitle: 'Tối Ưu Kháng Sinh (AMS)',
    icon: '💊',
    description: 'Chọn kháng sinh kinh nghiệm trúng đích, liều nạp sepsis, truyền kéo dài Beta-lactam và chỉnh liều theo eGFR.',
    baseDays: [
      'Mậu Thìn', 'Kỷ Tỵ', 'Canh Ngọ', 'Nhâm Thân', 'Ất Hợi', 'Mậu Dần',
      'Giáp Thân', 'Bính Tuất', 'Tân Mão', 'Ất Mùi', 'Bính Ngọ', 'Tân Hợi', 'Kỷ Mùi'
    ],
    hapTruc: ['Trừ', 'Khai', 'Thành'],
    kyTruc: ['Bế', 'Nguy'],
    hapThanSat: ['Thiên Y', 'Sinh Khí'],
    kyThanSat: ['Sát Chủ', 'Thọ Tử', 'Đao Chiêm Sát'],
    specialNotes: [
      'Lấy cấy máu 2 bộ trước khi khởi động kháng sinh (trừ sốc nhiễm khuẩn tối khẩn không trì hoãn > 1h).'
    ]
  },
  kiem_soat_o_nhiem: {
    id: 'kiem_soat_o_nhiem',
    vuNumber: 37,
    title: 'Kiểm Soát Ổ Nhiễm (Source Control) & Thủ Thuật',
    shortTitle: 'Source Control & Thủ Thuật',
    icon: '🩺',
    description: 'Chọc dịch não tủy (LP), dẫn lưu ổ áp xe, rút/thay catheter nhiễm trùng và đánh giá vô khuẩn.',
    baseDays: [
      'Giáp Tý', 'Ất Sửu', 'Bính Dần', 'Kỷ Tỵ', 'Canh Ngọ', 'Tân Mùi',
      'Giáp Tuất', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu', 'Nhâm Ngọ', 'Quý Mùi'
    ],
    hapTruc: ['Trừ', 'Mãn', 'Thành', 'Khai'],
    kyTruc: ['Phá', 'Bế', 'Nguy'],
    hapThanSat: ['Thiên Y', 'Thiên Đức', 'Nguyệt Đức'],
    kyThanSat: ['Sát Chủ', 'Thọ Tử', 'Đao Chiêm Sát', 'Thập Ác Đại Bại'],
    specialNotes: [
      'Kiểm tra chống chỉ định (tiểu cầu, INR, phù gai thị/tăng áp lực nội sọ) trước khi chọc dò tủy sống.'
    ]
  },
  xuat_vien_opat: {
    id: 'xuat_vien_opat',
    vuNumber: 83,
    title: 'Xuất Viện, Xuống Thang IV-to-PO & Quản Lý Ngoại Trú',
    shortTitle: 'Xuất Viện & IV-to-PO',
    icon: '📋',
    description: 'Chuyển kháng sinh đường uống sinh khả dụng cao, đánh giá xuất viện an toàn, quản lý HBV/HCV/HIV ngoại trú.',
    baseDays: [
      'Ất Sửu', 'Nhâm Thân', 'Quý Dậu', 'Ất Hợi', 'Bính Tý', 'Đinh Sửu',
      'Giáp Thân', 'Bính Tuất', 'Kỷ Sửu', 'Nhâm Thìn', 'Quý Tỵ', 'Giáp Ngọ',
      'Bính Thân', 'Đinh Dậu', 'Mậu Tuất', 'Kỷ Hợi', 'Canh Tý', 'Tân Sửu',
      'Mậu Thân', 'Kỷ Dậu', 'Tân Dậu'
    ],
    hapTruc: ['Trừ', 'Thành', 'Khai', 'Bình'],
    kyTruc: ['Mãn', 'Bế'],
    hapThanSat: ['Thiên Y', 'Sinh Khí', 'Thiên Đức', 'Nguyệt Đức'],
    kyThanSat: ['Thọ Tử'],
    genderRules: {
      maleKyTruc: ['Trừ'],
      femaleKyTruc: ['Thâu']
    },
    specialNotes: [
      'Đảm bảo bệnh nhân hết sốt ≥ 48h, sinh hiệu ổn định, dung nạp đường uống và có lịch tái khám xét nghiệm.'
    ]
  },
  hoi_chan_dich_te: {
    id: 'hoi_chan_dich_te',
    vuNumber: 39,
    title: 'Hội Chẩn Liên Khoa, Cảnh Giác Dịch Tễ & EBM',
    shortTitle: 'Hội Chẩn, Dịch Tễ & EBM',
    icon: '🦠',
    description: 'Hội chẩn Sepsis/ICU, giám sát nhiễm khuẩn bệnh viện (IPC), cập nhật khuyến cáo IDSA/WHO và nghiên cứu.',
    baseDays: [
      'Tân Mùi', 'Bính Tý', 'Đinh Sửu', 'Nhâm Ngọ', 'Quý Mùi', 'Giáp Thân',
      'Tân Mão', 'Nhâm Thìn', 'Ất Mùi', 'Canh Tý', 'Quý Mão', 'Đinh Mùi',
      'Mậu Thân', 'Nhâm Tý', 'Giáp Dần', 'Ất Mão', 'Kỷ Mùi', 'Tân Dậu'
    ],
    hapTruc: ['Chấp', 'Thành', 'Thâu'],
    kyTruc: ['Phá', 'Nguy'],
    hapThanSat: ['Thiên Đức', 'Nguyệt Đức'],
    kyThanSat: ['Sát Chủ'],
    specialNotes: [
      'Rà soát biểu đồ kháng sinh đồ vi sinh khoa phòng và tuân thủ cách ly dự phòng lây truyền qua đường giọt bắn/tiếp xúc.'
    ]
  }
};

export const CLINICAL_PEARLS = [
  {
    topic: 'Truyền Nhiễm • Sốc Nhiễm Khuẩn',
    title: 'Liều Nạp & Truyền Kéo Dài Beta-lactam Trong Sepsis',
    text: 'Sốc nhiễm khuẩn làm tăng thể tích phân bố (Vd) và tăng thanh thải thận (ARC). Luôn dùng liều nạp đầy đủ không chỉnh giảm liều đầu theo eGFR, sau đó truyền kéo dài 3–4h để tối ưu %fT > MIC (SSC 2026).'
  },
  {
    topic: 'Truyền Nhiễm • Viêm Màng Não',
    title: 'Dexamethasone Trước Hoặc Cùng Lúc Với Liều Kháng Sinh Đầu',
    text: 'Với nghi ngờ viêm màng não mủ do phế cầu ở người lớn, dùng Dexamethasone 0.15 mg/kg IV q6h ngay trước hoặc cùng lúc liều kháng sinh đầu tiên giúp giảm đáp ứng viêm khoang dưới nhện và giảm tử vong.'
  },
  {
    topic: 'Truyền Nhiễm • Nhiễm Khuẩn Huyết',
    title: 'Cấy Máu Dương Tính Với Staphylococcus aureus',
    text: 'Mọi ca nhiễm khuẩn huyết do S. aureus đều bắt buộc tìm ổ di căn, làm siêu âm tim loại trừ viêm nội tâm mạc nhiễm khuẩn và cấy máu kiểm tra lại mỗi 48–72h đến khi âm tính (IDSA).'
  },
  {
    topic: 'Truyền Nhiễm • Sốt Xuất Huyết Dengue',
    title: 'Giai Đoạn Hết Sốt (Ngày 4–6) Là Lúc Nguy Hiểm Nhất',
    text: 'Bệnh nhân hết sốt nhưng tiểu cầu giảm nhanh, Hct tăng ≥ 20%, đau tức vùng gan hoặc tràn dịch màng phổi/bụng là dấu hiệu thoát huyết tương giai đoạn nguy hiểm — cần theo dõi sát sinh hiệu mỗi 2–4 giờ.'
  },
  {
    topic: 'Truyền Nhiễm • Sốt CRNN (FUO)',
    title: 'Nguyên Tắc Source Control Trước Khi Đổi Kháng Sinh Mạnh Hơn',
    text: 'Sốt kéo dài không đáp ứng kháng sinh phổ rộng thường không phải do thiếu thuốc mạnh hơn, mà do chưa dẫn lưu ổ áp xe, chưa rút catheter nhiễm khuẩn hoặc sốt không do nhiễm trùng (bệnh tự miễn/ác tính/thuốc).'
  },
  {
    topic: 'Truyền Nhiễm • Quản Lý Kháng Sinh',
    title: 'Xuống Thang Kháng Sinh (De-escalation) Sau 48–72 Giờ',
    text: 'Ngay khi có kết quả định danh và kháng sinh đồ, thu hẹp phổ kháng sinh càng sớm càng tốt để giảm áp lực chọn lọc vi khuẩn đa kháng (MDR) và độc tính trên thận - gan.'
  }
];

export function getDailyClinicalPearl(dateObj: Date = new Date()): { topic: string; title: string; text: string } {
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / 86400000);
  return CLINICAL_PEARLS[Math.abs(dayOfYear) % CLINICAL_PEARLS.length] || CLINICAL_PEARLS[0]!;
}
