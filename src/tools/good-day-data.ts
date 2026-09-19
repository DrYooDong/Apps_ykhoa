/**
 * CliniPortal 2.0 — Good Day Calculator Data & Astrological Constants
 * Path: src/tools/good-day-data.ts
 */

import type {
  TrucItem,
  TietKhiItem,
  SaoTuItem,
  NapAmDetail,
  MedicalTaskType,
  MedicalTaskConfig
} from './good-day-types';

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"] as const;

export const NGU_HANH_CAN: Record<string, 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'> = {
  "Giáp": "Mộc", "Ất": "Mộc",
  "Bính": "Hỏa", "Đinh": "Hỏa",
  "Mậu": "Thổ", "Kỷ": "Thổ",
  "Canh": "Kim", "Tân": "Kim",
  "Nhâm": "Thủy", "Quý": "Thủy"
};

export const NGU_HANH_CHI: Record<string, 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'> = {
  "Tý": "Thủy", "Hợi": "Thủy",
  "Dần": "Mộc", "Mão": "Mộc",
  "Tỵ": "Hỏa", "Ngọ": "Hỏa",
  "Thân": "Kim", "Dậu": "Kim",
  "Thìn": "Thổ", "Tuất": "Thổ", "Sửu": "Thổ", "Mùi": "Thổ"
};

export const HANH_SINH_KHAC = {
  sinh: { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" } as Record<string, string>,
  khac: { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" } as Record<string, string>
};

export const GIO_TIME: Record<string, string> = {
  "Tý": "23h-01h", "Sửu": "01h-03h", "Dần": "03h-05h", "Mão": "05h-07h",
  "Thìn": "07h-09h", "Tỵ": "09h-11h", "Ngọ": "11h-13h", "Mùi": "13h-15h",
  "Thân": "15h-17h", "Dậu": "17h-19h", "Tuất": "19h-21h", "Hợi": "21h-23h"
};

export const HOANG_DAO_MAP: Record<string, string[]> = {
  "Tý": ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"],
  "Ngọ": ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"],
  "Sửu": ["Dần", "Mão", "Tỵ", "Thân", "Tuất", "Hợi"],
  "Mùi": ["Dần", "Mão", "Tỵ", "Thân", "Tuất", "Hợi"],
  "Dần": ["Tý", "Sửu", "Thìn", "Tỵ", "Mùi", "Tuất"],
  "Thân": ["Tý", "Sửu", "Thìn", "Tỵ", "Mùi", "Tuất"],
  "Mão": ["Dần", "Mão", "Ngọ", "Mùi", "Dậu", "Tý"],
  "Dậu": ["Dần", "Mão", "Ngọ", "Mùi", "Dậu", "Tý"],
  "Thìn": ["Dần", "Thìn", "Tỵ", "Thân", "Dậu", "Hợi"],
  "Tuất": ["Dần", "Thìn", "Tỵ", "Thân", "Dậu", "Hợi"],
  "Tỵ": ["Sửu", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"],
  "Hợi": ["Sửu", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"]
};

// 12 Thần Sát của 12 Giờ
export const GIO_THAN_SAT: { name: string; isHoangDao: boolean; meaning: string }[] = [
  { name: "Thanh Long", isHoangDao: true, meaning: "Đại Cát: Khởi sự may mắn, quý nhân phù trợ" },
  { name: "Minh Đường", isHoangDao: true, meaning: "Cát Tinh: Mọi sự hanh thông, sáng suốt" },
  { name: "Thiên Hình", isHoangDao: false, meaning: "Hắc Đạo: Dễ xảy ra tranh chấp, kiêng mổ mạo hiểm" },
  { name: "Chu Tước", isHoangDao: false, meaning: "Hắc Đạo: Cẩn trọng lời ăn tiếng nói, tránh hiểu lầm" },
  { name: "Kim Quỹ", isHoangDao: true, meaning: "Cát Tinh: Phúc lộc dồi dào, thuận lợi tài chính y vụ" },
  { name: "Kim Đường (Bảo Quang)", isHoangDao: true, meaning: "Cát Tinh: Hào quang rạng rỡ, chẩn đoán chính xác" },
  { name: "Bạch Hổ", isHoangDao: false, meaning: "Hắc Đạo: Hung thần, chú ý chống nhiễm trùng" },
  { name: "Ngọc Đường", isHoangDao: true, meaning: "Đại Cát: Y thuật thăng hoa, chuyển biến tốt" },
  { name: "Thiên Lao", isHoangDao: false, meaning: "Hắc Đạo: Bế tắc, kiêng can thiệp xâm lấn" },
  { name: "Nguyên Vũ (Huyền Vũ)", isHoangDao: false, meaning: "Hắc Đạo: Đề phòng sơ suất hành chính" },
  { name: "Tư Mệnh", isHoangDao: true, meaning: "Cát Tinh: Tăng cường sinh khí, hồi sức tốt" },
  { name: "Câu Trận", isHoangDao: false, meaning: "Hắc Đạo: Trở ngại, cần kiểm tra chéo 2 lần" }
];

// 28 NHỊ THẬP BÁT TÚ
export const NHI_THAP_BAT_TU: SaoTuItem[] = [
  { name: "Giác", element: "Mộc", animal: "Giao", type: "cat", score: 10, poem: "Giác tinh tọa chiếu vinh hoa", desc: "Sao Đại Cát: Đỗ đạt, hanh thông y vụ, hội chẩn thuận lợi, khởi công phẫu thuật tốt." },
  { name: "Cang", element: "Kim", animal: "Long", type: "hung", score: -8, poem: "Cang tinh chiếu đến mưu sự khó", desc: "Sao Hung: Cẩn trọng tranh chấp, kiêng can thiệp đại phẫu mạo hiểm." },
  { name: "Đê", element: "Thổ", animal: "Lạc", type: "hung", score: -10, poem: "Đê tinh phát tác lắm gian truân", desc: "Sao Hung: Kiêng khởi sự lớn, chú ý rà soát cẩn thận liều lượng dược lâm sàng." },
  { name: "Phòng", element: "Nhật", animal: "Thỏ", type: "cat", score: 14, poem: "Phòng tinh đắc vị nhật nguyệt minh", desc: "Sao Đại Cát: Nhật Thần quang minh, mọi ca mổ và điều trị phục hồi đều thuận lợi." },
  { name: "Tâm", element: "Nguyệt", animal: "Hồ", type: "hung", score: -12, poem: "Tâm tinh bất lợi chớ chủ quan", desc: "Sao Hung: Nguy cơ bất ổn tâm lý và biến cố tim mạch ở người bệnh." },
  { name: "Vĩ", element: "Hỏa", animal: "Hổ", type: "cat", score: 12, poem: "Vĩ tinh rạng rỡ đắc tài lộc", desc: "Sao Cát: Phẫu thuật, thủ thuật và giao ban chuyên môn đạt kết quả mỹ mãn." },
  { name: "Cơ", element: "Thủy", animal: "Báo", type: "cat", score: 10, poem: "Cơ tinh chiếu rọi tiến bộ nhanh", desc: "Sao Cát: Thuận lợi học tập, nghiên cứu EBM, ứng dụng công nghệ y tế mới." },
  { name: "Đẩu", element: "Mộc", animal: "Giải", type: "cat", score: 15, poem: "Đẩu tinh đại cát vạn sự thành", desc: "Thất Tinh Đại Cát: Chẩn đoán chính xác, hồi sức thành công ngoạn mục." },
  { name: "Ngưu", element: "Kim", animal: "Ngưu", type: "hung", score: -8, poem: "Ngưu tinh trắc trở chậm tiến độ", desc: "Sao Hung: Đề phòng nhầm lẫn hành chính, cần kiểm tra đối chiếu hồ sơ 2 lần." },
  { name: "Nữ", element: "Thổ", animal: "Bức", type: "hung", score: -10, poem: "Nữ tinh tranh đoạt phải đề phòng", desc: "Sao Hung: Chú ý quan hệ giao tiếp với thân nhân người bệnh, giữ bình tĩnh." },
  { name: "Hư", element: "Nhật", animal: "Thử", type: "hung", score: -12, poem: "Hư tinh hư hao hao tổn thần", desc: "Sao Hung: Cơ thể dễ mệt mỏi, cần nghỉ ngơi đủ giấc giữa các ca trực cấp cứu." },
  { name: "Nguy", element: "Nguyệt", animal: "Yến", type: "hung", score: -10, poem: "Nguy tinh nguy hiểm rình rập quanh", desc: "Sao Hung: Cẩn trọng biến chứng chu phẫu, theo dõi sát sinh hiệu." },
  { name: "Thất", element: "Hỏa", animal: "Trư", type: "cat", score: 15, poem: "Thất tinh đại cát vượng sinh khí", desc: "Thất Tinh Đại Cát: Năng lượng điều trị đỉnh cao, người bệnh phục hồi tích cực." },
  { name: "Bích", element: "Thủy", animal: "Du", type: "cat", score: 15, poem: "Bích tinh văn chương y thuật cao", desc: "Thất Tinh Đại Cát: Xuất bản bài báo y học, bảo vệ luận án, nghiệm thu phác đồ." },
  { name: "Khuê", element: "Mộc", animal: "Lang", type: "hung", score: -10, poem: "Khuê tinh xung sát chớ khinh nhờn", desc: "Sao Hung: Hạn chế can thiệp xâm lấn nếu không cấp bách, giữ vững quy chuẩn." },
  { name: "Lâu", element: "Kim", animal: "Cẩu", type: "cat", score: 12, poem: "Lâu tinh phát phúc hưng thịnh thay", desc: "Sao Cát: Khai trương phòng khám, tiếp nhận thiết bị y khoa mới rất thuận lợi." },
  { name: "Vị", element: "Thổ", animal: "Trĩ", type: "cat", score: 10, poem: "Vị tinh hòa hợp đắc nhân tâm", desc: "Sao Cát: Thầy thuốc và người bệnh thấu hiểu, tuân thủ phác đồ điều trị tốt." },
  { name: "Mão", element: "Nhật", animal: "Kê", type: "hung", score: -12, poem: "Mão tinh mặt trời tối tăm mờ", desc: "Sao Hung: Tránh xung đột truyền thông, tập trung kiểm soát chất lượng chuyên môn." },
  { name: "Tất", element: "Nguyệt", animal: "Ô", type: "cat", score: 12, poem: "Tất tinh che chở giải tai ương", desc: "Sao Cát: Hóa giải ca khó, bệnh nhân nguy kịch chuyển biến tích cực." },
  { name: "Chủy", element: "Hỏa", animal: "Hầu", type: "hung", score: -8, poem: "Chủy tinh tranh cãi lắm ưu phiền", desc: "Sao Hung: Giữ gìn hòa khí đồng nghiệp, giao ban súc tích rõ ràng." },
  { name: "Sâm", element: "Thủy", animal: "Viên", type: "cat", score: 10, poem: "Sâm tinh đại thịnh vượng cơ đồ", desc: "Sao Cát: Phát triển kỹ thuật mới, chuyển giao công nghệ điều trị thành công." },
  { name: "Tỉnh", element: "Mộc", animal: "Hãn", type: "cat", score: 12, poem: "Tỉnh tinh nguồn suối mát trong lành", desc: "Sao Cát: Tâm lý vững vàng, phẫu thuật khéo léo, xử lý cấp cứu dứt khoát." },
  { name: "Quỷ", element: "Kim", animal: "Dương", type: "hung", score: -15, poem: "Quỷ tinh tai họa phải kiêng dè", desc: "Sao Đại Hung: Tuyệt đối kiêng mổ phiên nguy cơ cao, tập trung kiểm soát nhiễm khuẩn." },
  { name: "Liễu", element: "Thổ", animal: "Chướng", type: "hung", score: -10, poem: "Liễu tinh trôi dạt khó định hình", desc: "Sao Hung: Dễ phân tâm khi chẩn đoán, cần đối chiếu guideline EBM chuẩn." },
  { name: "Tinh", element: "Nhật", animal: "Mã", type: "hung", score: -8, poem: "Tinh tinh vội vã dễ sai lầm", desc: "Sao Hung: Tránh hấp tấp ra y lệnh, kiểm tra kỹ tiền sử dị ứng thuốc." },
  { name: "Trương", element: "Nguyệt", animal: "Lộc", type: "cat", score: 14, poem: "Trương tinh rạng rỡ đón vinh quang", desc: "Sao Đại Cát: Nghiên cứu y học xuất sắc, hội chẩn liên chuyên khoa đồng thuận cao." },
  { name: "Dực", element: "Hỏa", animal: "Xà", type: "cat", score: 15, poem: "Dực tinh chắp cánh bay cao xa", desc: "Thất Tinh Đại Cát: Thời điểm vàng cho các ca can thiệp chuyên sâu, mổ phức tạp." },
  { name: "Chẩn", element: "Thủy", animal: "Dẫn", type: "cat", score: 12, poem: "Chẩn tinh trị bệnh cứu nhân sinh", desc: "Sao Đại Cát Y Khoa: Mang nghĩa chẩn đoán & điều trị hanh thông, y thuật thăng hoa." }
];

// 12 TRỰC NGÀY
export const TRUC_LIST: TrucItem[] = [
  { name: "Kiến", type: "cat", rating: "Đại Cát", score: 12, desc: "Khởi tạo, đại cát cho mổ xẻ, ký kết hợp đồng, mở phòng khám." },
  { name: "Trừ", type: "cat", rating: "Cát", score: 10, desc: "Xóa bỏ cái cũ, giải độc, điều trị dứt điểm, tẩy uế phòng mổ." },
  { name: "Mãn", type: "cat", rating: "Đại Cát", score: 12, desc: "Tròn đầy, sung túc, thích hợp thu hoạch, hội chẩn hoàn tất." },
  { name: "Bình", type: "cat", rating: "Bình Hòa", score: 8, desc: "Bình ổn, cân bằng, thích hợp khám định kỳ, điều hòa y lệnh." },
  { name: "Định", type: "cat", rating: "Đại Cát", score: 15, desc: "An định, định vị chẩn đoán, phẫu thuật chương trình rất tốt." },
  { name: "Chấp", type: "neutral", rating: "Bình Hòa", score: 5, desc: "Nắm giữ, kiên trì phác đồ, thích hợp tái khám." },
  { name: "Phá", type: "hung", rating: "Đại Hung", score: -15, desc: "Nguyệt Phá xung đột, kiêng phẫu thuật lớn & thủ thuật nguy cơ." },
  { name: "Nguy", type: "hung", rating: "Hung", score: -8, desc: "Nguy hiểm, ẩn số cao, cẩn trọng khi ra y lệnh liều cao." },
  { name: "Thành", type: "cat", rating: "Đại Cát", score: 15, desc: "Thành công, vẹn toàn, thích hợp xuất viện, nghiệm thu dự án." },
  { name: "Thâu", type: "cat", rating: "Cát", score: 10, desc: "Thu hoạch kết quả, tổng kết bệnh án, nghiệm thu EBM." },
  { name: "Khai", type: "cat", rating: "Đại Cát", score: 15, desc: "Thông suốt, khai trương, áp dụng phác đồ/kỹ thuật mới." },
  { name: "Bế", type: "hung", rating: "Hung", score: -10, desc: "Bế tắc, kiêng khởi công, kiêng can thiệp xâm lấn mới." }
];

// 24 TIẾT KHÍ
export const TIET_KHI_LIST: TietKhiItem[] = [
  { m: 1, d: 6, name: "Tiểu Hàn", score: 2, icon: "❄️" },
  { m: 1, d: 20, name: "Đại Hàn", score: 2, icon: "🧊" },
  { m: 2, d: 4, name: "Lập Xuân", score: 6, icon: "🌱", special: "Tuet" },
  { m: 2, d: 19, name: "Vũ Thủy", score: 4, icon: "🌧️" },
  { m: 3, d: 6, name: "Kinh Trập", score: 4, icon: "⚡" },
  { m: 3, d: 21, name: "Xuân Phân", score: 8, icon: "☯️", special: "Ly" },
  { m: 4, d: 5, name: "Thanh Minh", score: 5, icon: "🍃" },
  { m: 4, d: 20, name: "Cốc Vũ", score: 4, icon: "🌾" },
  { m: 5, d: 5, name: "Lập Hạ", score: 6, icon: "☀️", special: "Tuet" },
  { m: 5, d: 21, name: "Tiểu Mãn", score: 4, icon: "🌼" },
  { m: 6, d: 6, name: "Mang Chủng", score: 4, icon: "🌻" },
  { m: 6, d: 21, name: "Hạ Chí", score: 8, icon: "🔥", special: "Ly" },
  { m: 7, d: 7, name: "Thử Thử", score: 2, icon: "🌡️" },
  { m: 7, d: 23, name: "Đại Thử", score: 2, icon: "💥" },
  { m: 8, d: 7, name: "Lập Thu", score: 6, icon: "🍂", special: "Tuet" },
  { m: 8, d: 23, name: "Xử Thử", score: 4, icon: "🌤️" },
  { m: 9, d: 7, name: "Bạch Lộ", score: 4, icon: "🌫️" },
  { m: 9, d: 23, name: "Thu Phân", score: 8, icon: "☯️", special: "Ly" },
  { m: 10, d: 8, name: "Hàn Lộ", score: 4, icon: "💧" },
  { m: 10, d: 23, name: "Sương Giáng", score: 3, icon: "❄️" },
  { m: 11, d: 7, name: "Lập Đông", score: 6, icon: "☃️", special: "Tuet" },
  { m: 11, d: 22, name: "Tiểu Tuyết", score: 3, icon: "🌨️" },
  { m: 12, d: 7, name: "Đại Tuyết", score: 2, icon: "🏔️" },
  { m: 12, d: 21, name: "Đông Chí", score: 8, icon: "🌙", special: "Ly" }
];

export const THIEN_DUC_MAP: Record<number, string> = {
  1: "Đinh", 2: "Thân", 3: "Nhâm", 4: "Tân", 5: "Hợi", 6: "Giáp",
  7: "Quý", 8: "Dần", 9: "Bính", 10: "Ất", 11: "Tỵ", 12: "Canh"
};

export const NGUYET_DUC_MAP: Record<number, string> = {
  1: "Bính", 5: "Bính", 9: "Bính",
  2: "Giáp", 6: "Giáp", 10: "Giáp",
  3: "Nhâm", 7: "Nhâm", 11: "Nhâm",
  4: "Canh", 8: "Canh", 12: "Canh"
};

export const THIEN_AT_MAP: Record<string, string[]> = {
  "Giáp": ["Sửu", "Mùi"],
  "Mậu": ["Sửu", "Mùi"],
  "Canh": ["Dần", "Ngọ"],
  "Ất": ["Tý", "Thân"],
  "Kỷ": ["Tý", "Thân"],
  "Bính": ["Hợi", "Dậu"],
  "Đinh": ["Hợi", "Dậu"],
  "Tân": ["Dần", "Ngọ"],
  "Nhâm": ["Mão", "Tỵ"],
  "Quý": ["Mão", "Tỵ"]
};

export const LOC_THAN_MAP: Record<string, string> = {
  "Giáp": "Dần", "Ất": "Mão", "Bính": "Tỵ", "Mậu": "Tỵ",
  "Đinh": "Ngọ", "Kỷ": "Ngọ", "Canh": "Thân", "Tân": "Dậu",
  "Nhâm": "Hợi", "Quý": "Tý"
};

export const PROFILE_KEY = 'cliniportal_doctor_full_profile';

// ─── 60 HOA GIÁP NẠP ÂM (CHƯƠNG VI) ───────────────────────────────────
export const LUC_THAP_HOA_GIAP_NAP_AM: Record<string, NapAmDetail> = {
  "Giáp Tý": { canChi: "Giáp Tý", name: "Hải Trung Kim", element: "Kim", meaning: "Vàng trong đáy biển sâu — Tinh túy, lắng đọng, kín đáo." },
  "Ất Sửu": { canChi: "Ất Sửu", name: "Hải Trung Kim", element: "Kim", meaning: "Vàng trong biển — Bền bỉ, vững chắc, tiềm ẩn nội lực." },
  "Bính Dần": { canChi: "Bính Dần", name: "Lư Trung Hỏa", element: "Hỏa", meaning: "Lửa trong lò — Nhiệt huyết bùng cháy, sinh khí sung mãn." },
  "Đinh Mão": { canChi: "Đinh Mão", name: "Lư Trung Hỏa", element: "Hỏa", meaning: "Lửa trong lò — Sưởi ấm vạn vật, tinh thần quyết liệt." },
  "Mậu Thìn": { canChi: "Mậu Thìn", name: "Đại Lâm Mộc", element: "Mộc", meaning: "Gỗ rừng già — Vững vàng che chở, uy dũng, thâm sâu." },
  "Kỷ Tỵ": { canChi: "Kỷ Tỵ", name: "Đại Lâm Mộc", element: "Mộc", meaning: "Gỗ rừng già — Rợp bóng mát, sức sống dẻo dai phi thường." },
  "Canh Ngọ": { canChi: "Canh Ngọ", name: "Lộ Bàng Thổ", element: "Thổ", meaning: "Đất ven đường — Vững chãi làm đường cho vạn sự hanh thông." },
  "Tân Mùi": { canChi: "Tân Mùi", name: "Lộ Bàng Thổ", element: "Thổ", meaning: "Đất ven đường — Nền tảng bình ổn, độ lượng, bao dung." },
  "Nhâm Thân": { canChi: "Nhâm Thân", name: "Kiếm Phong Kim", element: "Kim", meaning: "Vàng mũi kiếm — Bén nhọn, dứt khoát, quyết đoán chuẩn xác." },
  "Quý Dậu": { canChi: "Quý Dậu", name: "Kiếm Phong Kim", element: "Kim", meaning: "Vàng mũi kiếm — Sắc sảo, chuẩn xác từng đường dao mũi chỉ." },
  "Giáp Tuất": { canChi: "Giáp Tuất", name: "Sơn Đầu Hỏa", element: "Hỏa", meaning: "Lửa trên đỉnh núi — Tỏa sáng từ tầm cao, dẫn dắt chỉ hướng." },
  "Ất Hợi": { canChi: "Ất Hợi", name: "Sơn Đầu Hỏa", element: "Hỏa", meaning: "Lửa trên đỉnh núi — Quang minh rực rỡ, tinh thần tiên phong." },
  "Bính Tý": { canChi: "Bính Tý", name: "Giản Hạ Thủy", element: "Thủy", meaning: "Nước dưới khe — Uyển chuyển luồn lách, tinh tế, nhu thuận." },
  "Đinh Sửu": { canChi: "Đinh Sửu", name: "Giản Hạ Thủy", element: "Thủy", meaning: "Nước dưới khe — Trong trẻo, nuôi dưỡng sinh linh, điềm đạm." },
  "Mậu Dần": { canChi: "Mậu Dần", name: "Thành Đầu Thổ", element: "Thổ", meaning: "Đất trên mặt thành — Thành lũy kiên cố, phòng ngự vững vàng." },
  "Kỷ Mão": { canChi: "Kỷ Mão", name: "Thành Đầu Thổ", element: "Thổ", meaning: "Đất trên mặt thành — Giữ gìn trật tự, chống đỡ hiểm nguy." },
  "Canh Thìn": { canChi: "Canh Thìn", name: "Bạch Lạp Kim", element: "Kim", meaning: "Vàng sáp ong — Thanh khiết, đã loại bỏ tạp chất, sáng rõ." },
  "Tân Tỵ": { canChi: "Tân Tỵ", name: "Bạch Lạp Kim", element: "Kim", meaning: "Vàng sáp ong — Khéo léo, tinh vi, thẩm mỹ cao." },
  "Nhâm Ngọ": { canChi: "Nhâm Ngọ", name: "Dương Liễu Mộc", element: "Mộc", meaning: "Gỗ cây liễu — Mềm dẻo trước bão táp, linh hoạt ứng biến." },
  "Quý Mùi": { canChi: "Quý Mùi", name: "Dương Liễu Mộc", element: "Mộc", meaning: "Gỗ cây liễu — Nhu thắng cương, thích nghi nhanh với nghịch cảnh." },
  "Giáp Thân": { canChi: "Giáp Thân", name: "Tuyền Trung Thủy", element: "Thủy", meaning: "Nước trong suối nguồn — Mạch sống tuôn trào không cạn." },
  "Ất Dậu": { canChi: "Ất Dậu", name: "Tuyền Trung Thủy", element: "Thủy", meaning: "Nước trong suối nguồn — Tinh khiết vô ngần, trị lành thương tổn." },
  "Bính Tuất": { canChi: "Bính Tuất", name: "Ốc Thượng Thổ", element: "Thổ", meaning: "Đất mái ngói — Che mưa chắn gió, an cư lạc nghiệp." },
  "Đinh Hợi": { canChi: "Đinh Hợi", name: "Ốc Thượng Thổ", element: "Thổ", meaning: "Đất mái ngói — Bảo vệ bình yên cho người bệnh và gia quyến." },
  "Mậu Tý": { canChi: "Mậu Tý", name: "Tích Lịch Hỏa", element: "Hỏa", meaning: "Lửa sấm sét — Quyết liệt chớp nhoáng, phá tan bóng tối bệnh tật." },
  "Kỷ Sửu": { canChi: "Kỷ Sửu", name: "Tích Lịch Hỏa", element: "Hỏa", meaning: "Lửa sấm sét — Sức bật phi thường trong các ca cấp cứu giờ vàng." },
  "Canh Dần": { canChi: "Canh Dần", name: "Tùng Bách Mộc", element: "Mộc", meaning: "Gỗ tùng bách — Bất khuất giữa mùa đông tuyết giá, kiên cường." },
  "Tân Mão": { canChi: "Tân Mão", name: "Tùng Bách Mộc", element: "Mộc", meaning: "Gỗ tùng bách — Sức sống trường thọ, phục hồi vững chắc." },
  "Nhâm Thìn": { canChi: "Nhâm Thìn", name: "Trường Lưu Thủy", element: "Thủy", meaning: "Nước chảy thành dòng lớn — Lưu thông mạch máu, vô tận dạt dào." },
  "Quý Tỵ": { canChi: "Quý Tỵ", name: "Trường Lưu Thủy", element: "Thủy", meaning: "Nước chảy sông dài — Hướng về biển lớn, trí tuệ bao la." },
  "Giáp Ngọ": { canChi: "Giáp Ngọ", name: "Sa Trung Kim", element: "Kim", meaning: "Vàng trong cát — Cần đãi lọc kiên nhẫn, giá trị bền lâu." },
  "Ất Mùi": { canChi: "Ất Mùi", name: "Sa Trung Kim", element: "Kim", meaning: "Vàng trong cát — Khiêm nhường mà quý giá, tài đức vẹn toàn." },
  "Bính Thân": { canChi: "Bính Thân", name: "Sơn Hạ Hỏa", element: "Hỏa", meaning: "Lửa dưới chân núi — Ấm áp, tích tụ sinh lực, kiên định." },
  "Đinh Dậu": { canChi: "Đinh Dậu", name: "Sơn Hạ Hỏa", element: "Hỏa", meaning: "Lửa dưới chân núi — Ánh sáng bền bỉ, xua tan âm hàn." },
  "Mậu Tuất": { canChi: "Mậu Tuất", name: "Bình Địa Mộc", element: "Mộc", meaning: "Gỗ đồng bằng — Dễ sinh sôi nảy nở, thân thiện, hòa đồng." },
  "Kỷ Hợi": { canChi: "Kỷ Hợi", name: "Bình Địa Mộc", element: "Mộc", meaning: "Gỗ đồng bằng — Đâm chồi nảy lộc, người bệnh mau lại sức." },
  "Canh Tý": { canChi: "Canh Tý", name: "Bích Thượng Thổ", element: "Thổ", meaning: "Đất trên vách tường — Vững chãi bao che, ngăn ngừa biến chứng." },
  "Tân Sửu": { canChi: "Tân Sửu", name: "Bích Thượng Thổ", element: "Thổ", meaning: "Đất trên vách tường — Điểm tựa an tâm cho thân nhân người bệnh." },
  "Nhâm Dần": { canChi: "Nhâm Dần", name: "Kim Bạc Kim", element: "Kim", meaning: "Vàng mạ bạc — Sáng loáng trang nghiêm, thẩm mỹ tinh tế." },
  "Quý Mão": { canChi: "Quý Mão", name: "Kim Bạc Kim", element: "Kim", meaning: "Vàng mạ bạc — Tinh hoa nghệ thuật phẫu thuật và y thuật." },
  "Giáp Thìn": { canChi: "Giáp Thìn", name: "Phúc Đăng Hỏa", element: "Hỏa", meaning: "Lửa ngọn đèn dầu — Soi tỏ chẩn đoán trong màn sương bí ẩn." },
  "Ất Tỵ": { canChi: "Ất Tỵ", name: "Phúc Đăng Hỏa", element: "Hỏa", meaning: "Lửa ngọn đèn dầu — Thắp sáng hy vọng cho các ca bệnh hiểm nghèo." },
  "Bính Ngọ": { canChi: "Bính Ngọ", name: "Thiên Hà Thủy", element: "Thủy", meaning: "Nước mưa trên trời — Mưa móc cứu vớt sinh linh, giải hạn cứu khổ." },
  "Đinh Mùi": { canChi: "Đinh Mùi", name: "Thiên Hà Thủy", element: "Thủy", meaning: "Nước mưa trên trời — Mát lành tâm can, giải độc thanh nhiệt." },
  "Mậu Thân": { canChi: "Mậu Thân", name: "Đại Trạch Thổ", element: "Thổ", meaning: "Đất đầm lầy phù sa — Màu mỡ trù phú, dinh dưỡng dồi dào." },
  "Kỷ Dậu": { canChi: "Kỷ Dậu", name: "Đại Trạch Thổ", element: "Thổ", meaning: "Đất cồn bãi màu mỡ — Khả năng tái tạo và lành thương nhanh chóng." },
  "Canh Tuất": { canChi: "Canh Tuất", name: "Thoa Xuyến Kim", element: "Kim", meaning: "Vàng trang sức trâm cài — Tinh xảo tuyệt mỹ, khéo léo." },
  "Tân Hợi": { canChi: "Tân Hợi", name: "Thoa Xuyến Kim", element: "Kim", meaning: "Vàng trang sức — Bàn tay phẫu thuật viên vi phẫu điêu luyện." },
  "Nhâm Tý": { canChi: "Nhâm Tý", name: "Tang Đố Mộc", element: "Mộc", meaning: "Gỗ cây dâu tằm — Vị thuốc quý, trị phong trừ tà, dưỡng huyết." },
  "Quý Sửu": { canChi: "Quý Sửu", name: "Tang Đố Mộc", element: "Mộc", meaning: "Gỗ cây dâu tằm — Thích ứng trị liệu Y học cổ truyền xuất sắc." },
  "Giáp Dần": { canChi: "Giáp Dần", name: "Đại Khê Thủy", element: "Thủy", meaning: "Nước khe lớn — Năng lượng cuồn cuộn, tẩy sạch cặn bã độc chất." },
  "Ất Mão": { canChi: "Ất Mão", name: "Đại Khê Thủy", element: "Thủy", meaning: "Nước khe lớn — Điều hòa dịch thể, cân bằng nội môi tối ưu." },
  "Bính Thìn": { canChi: "Bính Thìn", name: "Sa Trung Thổ", element: "Thổ", meaning: "Đất pha cát — Tơi xốp thuận lợi cho rễ đâm sâu, dung hòa đa phương diện." },
  "Đinh Tỵ": { canChi: "Đinh Tỵ", name: "Sa Trung Thổ", element: "Thổ", meaning: "Đất phù sa bãi cát — Bồi đắp sinh lực sau cơn bạo bệnh." },
  "Mậu Ngọ": { canChi: "Mậu Ngọ", name: "Thiên Thượng Hỏa", element: "Hỏa", meaning: "Lửa trên trời (Thái Dương) — Chiếu rọi quang minh khắp thế gian." },
  "Kỷ Mùi": { canChi: "Kỷ Mùi", name: "Thiên Thượng Hỏa", element: "Hỏa", meaning: "Lửa trên trời — Hóa giải mọi u ám, tiêu trừ vi khuẩn dịch bệnh." },
  "Canh Thân": { canChi: "Canh Thân", name: "Thạch Lựu Mộc", element: "Mộc", meaning: "Gỗ cây thạch lựu — Quả sai hạt mẩy, sức sống dồi dào sinh sôi." },
  "Tân Dậu": { canChi: "Tân Dậu", name: "Thạch Lựu Mộc", element: "Mộc", meaning: "Gỗ cây thạch lựu — Cứng cáp, đề kháng cao trước mầm bệnh." },
  "Nhâm Tuất": { canChi: "Nhâm Tuất", name: "Đại Hải Thủy", element: "Thủy", meaning: "Nước biển lớn — Bao la dung nạp trăm sông, tầm nhìn bao quát." },
  "Quý Hợi": { canChi: "Quý Hợi", name: "Đại Hải Thủy", element: "Thủy", meaning: "Nước đại dương — Điểm kết thúc và khởi nguồn của chu kỳ sinh mệnh mới." }
};

// ─── MA TRẬN SAO ĐĂNG VIÊN (CHƯƠNG III: 28 NHỊ THẬP BÁT TÚ) ─────────────
// Sao dù là Hung hay Bình khi gặp đúng Địa Chi sẽ Đăng Viên biến Hung thành Cát!
export const SAO_DANG_VIEN_MAP: Record<string, { chiList: string[]; bonus: number; meaning: string }> = {
  "Giác": { chiList: ["Dần"], bonus: 12, meaning: "Đăng Viên tại Dần: Được ngôi cao cả, vạn sự hanh thông, y nghiệp thăng hoa." },
  "Cang": { chiList: ["Thìn"], bonus: 8, meaning: "Đăng Viên tại Thìn: Hoán Hung thành Cát, mưu sự chu toàn, phẫu thuật an ổn." },
  "Đê": { chiList: ["Thìn"], bonus: 18, meaning: "Đăng Viên Đỉnh Cao tại Thìn: Vốn là Hung tinh nhưng gặp Thìn hóa Thần Tinh, trăm việc đại lợi." },
  "Phòng": { chiList: ["Mão", "Dậu"], bonus: 10, meaning: "Đăng Viên tại Mão/Dậu: Nhật nguyệt quang minh, phục hồi thần tốc." },
  "Tâm": { chiList: ["Dần"], bonus: 6, meaning: "Đăng Viên tại Dần: Tạm hóa giải hung sát, thuận lợi cho thủ thuật nhỏ." },
  "Vĩ": { chiList: ["Dần", "Ngọ", "Tuất"], bonus: 12, meaning: "Đăng Viên Tam Hợp Hỏa (nhất là Ngọ): Hiển đạt rạng rỡ, phẫu thuật mỹ mãn." },
  "Cơ": { chiList: ["Thìn"], bonus: 8, meaning: "Đăng Viên tại Thìn: Khởi sắc nghiên cứu, ứng dụng kỹ thuật mới tốt." },
  "Đẩu": { chiList: ["Sửu", "Tỵ", "Dậu"], bonus: 12, meaning: "Đăng Viên tại Sửu: Thất tinh đắc vị, chẩn đoán đột phá, hồi sức thành công." },
  "Ngưu": { chiList: ["Ngọ", "Tuất"], bonus: 10, meaning: "Đăng Viên tại Ngọ: Xóa hung đắc cát, công tác hành chính y vụ rõ ràng." },
  "Nữ": { chiList: ["Hợi"], bonus: 6, meaning: "Đăng Viên tại Hợi: Giảm bớt tranh đoạt, giao tiếp người nhà hòa nhã." },
  "Hư": { chiList: ["Tý"], bonus: 8, meaning: "Đăng Viên tại Tý: Hóa giải mệt mỏi, ca trực tỉnh táo." },
  "Nguy": { chiList: ["Sửu", "Dậu"], bonus: 10, meaning: "Đăng Viên tại Sửu/Dậu: Tạo tác sự việc quý hiển, kiểm soát tốt rủi ro chu phẫu." },
  "Thất": { chiList: ["Dần", "Ngọ", "Tuất"], bonus: 12, meaning: "Đăng Viên tại Ngọ: Sinh khí tột đỉnh, người bệnh qua cơn hiểm nghèo." },
  "Bích": { chiList: ["Hợi"], bonus: 10, meaning: "Đăng Viên tại Hợi: Văn chương y thuật trác việt, nghiệm thu đề tài EBM." },
  "Khuê": { chiList: ["Thân"], bonus: 10, meaning: "Đăng Viên tại Thân: Tiến thân danh, khởi xướng phác đồ mới." },
  "Lâu": { chiList: ["Dậu"], bonus: 10, meaning: "Đăng Viên tại Dậu: Phúc lộc tăng tiến, khai trương phòng khám đại cát." },
  "Vị": { chiList: ["Tuất"], bonus: 8, meaning: "Đăng Viên tại Tuất: Đắc nhân tâm, thầy thuốc và người bệnh thấu hiểu." },
  "Mão": { chiList: ["Mão"], bonus: 8, meaning: "Đăng Viên tại Mão: Mặt trời xua mây mù, chẩn đoán sáng suốt." },
  "Tất": { chiList: ["Thân"], bonus: 15, meaning: "Đăng Viên tại Thân: Trăng treo đầu núi, cưới gả chôn cất và trị bệnh ĐẠI KIẾT." },
  "Chủy": { chiList: ["Dậu"], bonus: 8, meaning: "Đăng Viên tại Dậu: Khởi động thăng tiến, hòa giải hiểu lầm." },
  "Sâm": { chiList: ["Tuất"], bonus: 12, meaning: "Đăng Viên tại Tuất: Phó nhiệm may mắn, cầu công danh y khoa hiển hách." },
  "Tỉnh": { chiList: ["Tý"], bonus: 12, meaning: "Đăng Viên tại Tý: Thừa kế tước phong, tâm lý mổ xẻ dứt khoát." },
  "Quỷ": { chiList: ["Tý", "Thân"], bonus: 6, meaning: "Tạm hóa giải hung tính, giữ chuẩn mực an toàn cao độ." },
  "Liễu": { chiList: ["Ngọ"], bonus: 8, meaning: "Đăng Viên tại Ngọ: Định hình phác đồ, tránh phân tâm chẩn đoán." },
  "Tinh": { chiList: ["Dần"], bonus: 8, meaning: "Đăng Viên tại Dần: Điềm tĩnh ra y lệnh, kiểm soát tương tác thuốc tốt." },
  "Trương": { chiList: ["Mùi"], bonus: 12, meaning: "Đăng Viên tại Mùi: Vinh quang học thuật, hội chẩn đa chuyên khoa đồng thuận." },
  "Dực": { chiList: ["Thân"], bonus: 14, meaning: "Đăng Viên tại Thân: Đôi cánh đại bàng, ca mổ phức tạp thành công." },
  "Chẩn": { chiList: ["Tỵ"], bonus: 12, meaning: "Đăng Viên tại Tỵ: Y thuật thăng hoa, chẩn đoán chính xác." }
};

// ─── THIÊN CAN NGŨ HỢP & XUNG PHÁ (CHƯƠNG V) ─────────────────────────
export const THIEN_CAN_HOP_HOA: Record<string, { partner: string; resultHanh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' }> = {
  "Giáp": { partner: "Kỷ", resultHanh: "Thổ" },
  "Kỷ": { partner: "Giáp", resultHanh: "Thổ" },
  "Ất": { partner: "Canh", resultHanh: "Kim" },
  "Canh": { partner: "Ất", resultHanh: "Kim" },
  "Bính": { partner: "Tân", resultHanh: "Thủy" },
  "Tân": { partner: "Bính", resultHanh: "Thủy" },
  "Đinh": { partner: "Nhâm", resultHanh: "Mộc" },
  "Nhâm": { partner: "Đinh", resultHanh: "Mộc" },
  "Mậu": { partner: "Quý", resultHanh: "Hỏa" },
  "Quý": { partner: "Mậu", resultHanh: "Hỏa" }
};

export const THIEN_CAN_XUNG_PHA: Record<string, string[]> = {
  "Giáp": ["Canh", "Mậu"],
  "Ất": ["Tân", "Kỷ"],
  "Bính": ["Nhâm", "Canh"],
  "Đinh": ["Quý", "Tân"],
  "Mậu": ["Giáp", "Nhâm"],
  "Kỷ": ["Ất", "Quý"],
  "Canh": ["Bính", "Giáp"],
  "Tân": ["Đinh", "Ất"],
  "Nhâm": ["Mậu", "Bính"],
  "Quý": ["Kỷ", "Đinh"]
};

// ─── THẦN SÁT Y KHOA CHUYÊN SÂU (CHƯƠNG VIII) ───────────────────────────
// Thiên Y (Cát thần hộ trì trị bệnh mau lành) tính theo Tháng Âm lịch
export const THIEN_Y_MAP: Record<number, string> = {
  1: "Sửu", 2: "Dần", 3: "Mão", 4: "Thìn", 5: "Tỵ", 6: "Ngọ",
  7: "Mùi", 8: "Thân", 9: "Dậu", 10: "Tuất", 11: "Hợi", 12: "Tý"
};

// Sinh Khí (Cát thần dồi dào sinh lực phục hồi) tính theo Tháng Âm lịch
export const SINH_KHI_MAP: Record<number, string> = {
  1: "Tý", 2: "Sửu", 3: "Dần", 4: "Mão", 5: "Thìn", 6: "Tỵ",
  7: "Ngọ", 8: "Mùi", 9: "Thân", 10: "Dậu", 11: "Tuất", 12: "Hợi"
};

// Sát Chủ Ngày (Đại hung kỵ khởi sự) tính theo Tháng Âm lịch
export const SAT_CHU_MAP: Record<number, string> = {
  1: "Tỵ", 2: "Tý", 3: "Mùi", 4: "Mão", 5: "Thân", 6: "Tuất",
  7: "Sửu", 8: "Hợi", 9: "Ngọ", 10: "Dậu", 11: "Dần", 12: "Thìn"
};

// Thọ Tử Ngày (Đại sát kỵ mổ xẻ nguy kịch) tính theo Tháng Âm lịch
export const THO_TU_MAP: Record<number, string> = {
  1: "Tuất", 2: "Thìn", 3: "Hợi", 4: "Tỵ", 5: "Tý", 6: "Ngọ",
  7: "Sửu", 8: "Mùi", 9: "Dần", 10: "Thân", 11: "Mão", 12: "Dậu"
};

// Đao Chiêm Sát (Sát khí kim khí, kỵ phẫu thuật dao kéo) tính theo Chi ngày
export const DAO_CHIEM_SAT_DAYS: Record<number, string[]> = {
  1: ["Tý", "Hợi"], 2: ["Dần", "Mão"], 3: ["Tỵ", "Ngọ"], 4: ["Thân", "Dậu"],
  5: ["Thìn", "Tuất"], 6: ["Sửu", "Mùi"], 7: ["Tý", "Hợi"], 8: ["Dần", "Mão"],
  9: ["Tỵ", "Ngọ"], 10: ["Thân", "Dậu"], 11: ["Thìn", "Tuất"], 12: ["Sửu", "Mùi"]
};

// Thập Ác Đại Bại (Năm + Tháng + Ngày)
export const THAP_AC_DAI_BAI: { yearCans: string[]; month: number; dayCanChi: string }[] = [
  { yearCans: ["Giáp", "Kỷ"], month: 3, dayCanChi: "Mậu Tuất" },
  { yearCans: ["Giáp", "Kỷ"], month: 7, dayCanChi: "Quý Hợi" },
  { yearCans: ["Giáp", "Kỷ"], month: 10, dayCanChi: "Bính Thân" },
  { yearCans: ["Giáp", "Kỷ"], month: 11, dayCanChi: "Đinh Hợi" },
  { yearCans: ["Ất", "Canh"], month: 4, dayCanChi: "Nhâm Thân" },
  { yearCans: ["Ất", "Canh"], month: 9, dayCanChi: "Ất Tỵ" },
  { yearCans: ["Bính", "Tân"], month: 3, dayCanChi: "Tân Tỵ" },
  { yearCans: ["Bính", "Tân"], month: 9, dayCanChi: "Canh Thìn" },
  { yearCans: ["Bính", "Tân"], month: 10, dayCanChi: "Giáp Thìn" },
  { yearCans: ["Mậu", "Quý"], month: 6, dayCanChi: "Kỷ Sửu" }
];

// ─── CẤU HÌNH CHI TIẾT 83 VỤ Y TẾ & KHỞI SỰ (CHƯƠNG II) ───────────────
export const MEDICAL_TASKS_CONFIG: Record<MedicalTaskType, MedicalTaskConfig> = {
  cau_thay: {
    id: "cau_thay",
    vuNumber: 81,
    title: "Vụ 81: Cầu Thầy Trị Bệnh & Lên Lịch Phẫu Thuật",
    shortTitle: "Trị Bệnh & Phẫu Thuật",
    description: "Thời điểm vàng rước thầy chữa bệnh, khởi động can thiệp ngoại khoa; giúp bệnh mau thuyên giảm, lành thương nhanh.",
    specialDays: ["Kỷ Dậu", "Bính Thìn", "Nhâm Thìn"],
    baseDays: [
      "Kỷ Dậu", "Bính Thìn", "Nhâm Thìn",
      "Giáp Tý", "Ất Sửu", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Nhâm Thân",
      "Quý Dậu", "Ất Hợi", "Bính Tý", "Đinh Sửu", "Mậu Dần", "Giáp Thân",
      "Bính Tuất", "Canh Dần", "Tân Mão", "Ất Mùi", "Bính Ngọ", "Tân Hợi"
    ],
    hapTruc: ["Chấp", "Trừ", "Thành", "Khai"],
    kyTruc: ["Phá", "Nguy", "Bế"],
    hapThanSat: ["Thiên Y", "Sinh Khí", "Phổ Hộ", "Yếu An", "Thần Tại", "Thiên Đức", "Nguyệt Đức"],
    kyThanSat: ["Sát Chủ", "Thọ Tử", "Đao Chiêm Sát", "Nguyệt Phá"],
    specialNotes: [
      "Gặp 3 ngày tối thượng Kỷ Dậu, Bính Thìn, Nhâm Thìn là Đại Cát: Bệnh nặng chuyển hóa nhẹ, trị mau lành.",
      "Phẫu thuật viên lưu ý tránh ngày phạm Đao Chiêm Sát và Thọ Tử để phòng ngừa tai biến mất máu chu phẫu."
    ]
  },
  hot_thuoc: {
    id: "hot_thuoc",
    vuNumber: 82,
    title: "Vụ 82: Hốt Thuốc / Bào Chế / Ra Y Lệnh Bậc Cao",
    shortTitle: "Hốt Thuốc & Bào Chế",
    description: "Thích hợp hiệp nhiều vị thuốc bào chế tể lớn, nhập kho dược liệu hoặc ngày đầu tiên thầy thuốc ra toa hành nghề.",
    baseDays: [
      "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Nhâm Thân", "Ất Hợi", "Mậu Dần",
      "Giáp Thân", "Bính Tuất", "Tân Mão", "Ất Mùi", "Bính Ngọ", "Tân Hợi", "Kỷ Mùi"
    ],
    hapTruc: ["Trừ", "Phá", "Khai"],
    kyTruc: ["Bế", "Nguy"],
    hapThanSat: ["Thiên Y", "Sinh Khí", "Thiên Ân", "Vượng Nhật"],
    kyThanSat: ["Sát Chủ", "Không Vong", "Thọ Tử"],
    specialNotes: [
      "Trực Trừ và Trực Khai giúp trừ khứ tà khí và phát huy tối đa dược tính kháng sinh / hóa chất điều trị."
    ]
  },
  uong_thuoc: {
    id: "uong_thuoc",
    vuNumber: 83,
    title: "Vụ 83: Uống Thuốc / Khởi Đầu Liệu Trình / Hóa Trị",
    shortTitle: "Uống Thuốc & Liệu Trình",
    description: "Chọn ngày uống liều thuốc đầu tiên của đợt trị liệu dài ngày, chu kỳ hóa trị mới hoặc phục hồi chức năng sau mổ.",
    baseDays: [
      "Ất Sửu", "Nhâm Thân", "Quý Dậu", "Ất Hợi", "Bính Tý", "Đinh Sửu",
      "Giáp Thân", "Bính Tuất", "Kỷ Sửu", "Nhâm Thìn", "Quý Tỵ", "Giáp Ngọ",
      "Bính Thân", "Đinh Dậu", "Mậu Tuất", "Kỷ Hợi", "Canh Tý", "Tân Sửu",
      "Mậu Thân", "Kỷ Dậu", "Tân Dậu"
    ],
    hapTruc: ["Trừ", "Phá", "Khai"],
    kyTruc: ["Mãn"],
    hapThanSat: ["Thiên Y", "Sinh Khí", "Thiên Đức", "Nguyệt Đức"],
    kyThanSat: ["Nguyệt Kỵ", "Tam Nương", "Thọ Tử"],
    genderRules: {
      maleKyTruc: ["Trừ"],
      femaleKyTruc: ["Thâu"]
    },
    specialNotes: [
      "Kỵ ngày có Trực Mãn và các ngày Mùi.",
      "Quy tắc Âm Dương Giới Tính: Nam bệnh nhân kỵ khởi đầu vào Trực Trừ, Nữ bệnh nhân kỵ khởi đầu vào Trực Thâu."
    ]
  },
  khai_truong: {
    id: "khai_truong",
    vuNumber: 37,
    title: "Vụ 37: Khai Trương Phòng Khám / Tiếp Nhận Máy Y Khoa",
    shortTitle: "Khai Trương & Nhập Máy",
    description: "Mở cửa phòng khám, khai trương trung tâm y tế, nhập kho máy xét nghiệm/C-Arm, cất trữ vật tư quý giá.",
    baseDays: [
      "Giáp Tý", "Ất Sửu", "Bính Dần", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi",
      "Giáp Tuất", "Ất Hợi", "Bính Tý", "Đinh Sửu", "Nhâm Ngọ", "Quý Mùi"
    ],
    hapTruc: ["Mãn", "Thành", "Khai"],
    kyTruc: ["Phá", "Bế"],
    hapThanSat: ["Lộc Thần", "Thiên Đức", "Nguyệt Đức", "Ngũ Phú", "Đại Hồng Sa"],
    kyThanSat: ["Sát Chủ", "Không Vong", "Thập Ác Đại Bại"],
    specialNotes: [
      "Nên chọn ngày hội tụ Lộc Thần và Trực Thành để y vụ phát đạt, đông bệnh nhân tin tưởng."
    ]
  },
  giao_dich: {
    id: "giao_dich",
    vuNumber: 39,
    title: "Vụ 39: Ký Kết Hợp Đồng Y Tế / Thầu Dược / Giao Dịch",
    shortTitle: "Ký Kết & Thầu Thuốc",
    description: "Làm tờ giao kèo, ký hợp đồng cung ứng dược phẩm - vật tư tiêu hao, ký biên bản nghiệm thu đề tài.",
    baseDays: [
      "Tân Mùi", "Bính Tý", "Đinh Sửu", "Nhâm Ngọ", "Quý Mùi", "Giáp Thân",
      "Tân Mão", "Nhâm Thìn", "Ất Mùi", "Canh Tý", "Quý Mão", "Đinh Mùi",
      "Mậu Thân", "Nhâm Tý", "Giáp Dần", "Ất Mão", "Kỷ Mùi", "Tân Dậu"
    ],
    hapTruc: ["Chấp", "Thành"],
    kyTruc: ["Phá", "Nguy"],
    hapThanSat: ["Thiên Đức", "Nguyệt Đức", "Kiết Khánh"],
    kyThanSat: ["Trường Đoản Tinh", "Không Vong"],
    specialNotes: [
      "Rất kỵ các ngày Trường Đoản Tinh trong tháng (Tháng 1 kỵ mùng 7, 21; Tháng 2 kỵ mùng 4, 19...)."
    ]
  }
};


export const CLINICAL_PEARLS = [
  { topic: "Điện Giải", title: "Tăng Kali Máu & Biến Đổi ECG", text: "Sóng T cao nhọn đối xứng là dấu hiệu sớm nhất. Khi QRS giãn rộng hoặc mất sóng P, chỉ định Canxi Gluconate 10% ngay để ổn định màng cơ tim!" },
  { topic: "Kháng Sinh", title: "Quy Tắc Vàng Dùng Vancomycin", text: "Luôn lấy nồng độ đáy (trough level) ngay trước liều thứ 4. Mục tiêu AUC/MIC 400-600 để tối ưu diệt khuẩn và ngừa độc thận." },
  { topic: "Cấp Cứu", title: "Sốc Phản Vệ — Adrenaline Là Số 1", text: "Tiêm bắp Adrenaline 1:1000 (0.5mg ở người lớn) ngay mặt trước ngoài đùi. Không được trì hoãn vì kháng histamin hay corticoid!" },
  { topic: "Tim Mạch", title: "Phân Biệt Rung Nhĩ Nhanh vs Cuồng Nhĩ", text: "Nếu tần số thất đều chằn chặn 150 l/p, luôn nghĩ đến Cuồng nhĩ dẫn truyền 2:1 trước khi kết luận nhịp nhanh xoang." },
  { topic: "Hô Hấp", title: "Cơn Hen Phế Quản Ác Tính", text: "Dấu hiệu 'Lồng ngực im lặng' (Silent Chest) và khí máu có PaCO2 bình thường/tăng là báo động kiệt sức cơ hô hấp sắp ngừng thở!" }
];

export function getDailyClinicalPearl(dateObj: Date = new Date()): { topic: string; title: string; text: string } {
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return CLINICAL_PEARLS[dayOfYear % CLINICAL_PEARLS.length] || CLINICAL_PEARLS[0]!;
}
