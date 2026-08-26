/**
 * CliniPortal 2.0 — Good Day Calculator Data & Astrological Constants
 * Path: src/tools/good-day-data.ts
 */

import type { TrucItem, TietKhiItem, SaoTuItem } from './good-day-types';

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
