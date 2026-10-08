/**
 * CliniPortal 2.0 — Good Day Calculator Data & Astrological Constants (Nội Khoa Chuyên Biệt)
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
  { name: "Thanh Long", isHoangDao: true, meaning: "Đại Cát: Khởi sự may mắn, quý nhân tương trợ ca bệnh khó" },
  { name: "Minh Đường", isHoangDao: true, meaning: "Cát Tinh: Mọi sự hanh thông, tư duy chẩn đoán sắc bén" },
  { name: "Thiên Hình", isHoangDao: false, meaning: "Hắc Đạo: Dễ tranh chấp quan điểm, thận trọng khi đổi phác đồ" },
  { name: "Chu Tước", isHoangDao: false, meaning: "Hắc Đạo: Cẩn trọng lời ăn tiếng nói, giải thích kỹ cho thân nhân" },
  { name: "Kim Quỹ", isHoangDao: true, meaning: "Cát Tinh: Phúc lộc dồi dào, thuận lợi phân tích hồ sơ bệnh án" },
  { name: "Kim Đường (Bảo Quang)", isHoangDao: true, meaning: "Cát Tinh: Hào quang rạng rỡ, biện luận chẩn đoán chính xác" },
  { name: "Bạch Hổ", isHoangDao: false, meaning: "Hắc Đạo: Hung thần, chú ý kiểm soát nhiễm khuẩn nội viện" },
  { name: "Ngọc Đường", isHoangDao: true, meaning: "Đại Cát: Y thuật thăng hoa, chuyển biến lâm sàng tích cực" },
  { name: "Thiên Lao", isHoangDao: false, meaning: "Hắc Đạo: Bế tắc tư duy, tránh ra y lệnh vội vã lúc mệt mỏi" },
  { name: "Nguyên Vũ (Huyền Vũ)", isHoangDao: false, meaning: "Hắc Đạo: Đề phòng sơ suất ghi chép bệnh án & toa thuốc" },
  { name: "Tư Mệnh", isHoangDao: true, meaning: "Cát Tinh: Tăng cường sinh khí, hồi phục tốt cho bệnh nhân nặng" },
  { name: "Câu Trận", isHoangDao: false, meaning: "Hắc Đạo: Trở ngại, cần kiểm tra chéo tương tác thuốc 2 lần" }
];

// 28 NHỊ THẬP BÁT TÚ (Chuẩn hóa ngôn ngữ Nội khoa)
export const NHI_THAP_BAT_TU: SaoTuItem[] = [
  { name: "Giác", element: "Mộc", animal: "Giao", type: "cat", score: 10, poem: "Giác tinh tọa chiếu vinh hoa", desc: "Sao Đại Cát: Đỗ đạt, hanh thông y vụ, hội chẩn liên khoa thuận lợi, khởi đầu liệu trình tốt." },
  { name: "Cang", element: "Kim", animal: "Long", type: "hung", score: -8, poem: "Cang tinh chiếu đến mưu sự khó", desc: "Sao Hung: Cẩn trọng tranh cãi chẩn đoán, kiêng đổi thuốc mạo hiểm chưa đủ bằng chứng." },
  { name: "Đê", element: "Thổ", animal: "Lạc", type: "hung", score: -10, poem: "Đê tinh phát tác lắm gian truân", desc: "Sao Hung: Kiêng khởi sự phức tạp, chú ý rà soát liều lượng dược lâm sàng theo eGFR." },
  { name: "Phòng", element: "Nhật", animal: "Thỏ", type: "cat", score: 14, poem: "Phòng tinh đắc vị nhật nguyệt minh", desc: "Sao Đại Cát: Nhật Thần quang minh, mọi phác đồ phối hợp thuốc và hồi phục đều thuận lợi." },
  { name: "Tâm", element: "Nguyệt", animal: "Hồ", type: "hung", score: -12, poem: "Tâm tinh bất lợi chớ chủ quan", desc: "Sao Hung: Nguy cơ bất ổn tâm lý và biến cố tim mạch ở người bệnh mạn tính." },
  { name: "Vĩ", element: "Hỏa", animal: "Hổ", type: "cat", score: 12, poem: "Vĩ tinh rạng rỡ đắc tài lộc", desc: "Sao Cát: Thăm dò chức năng và giao ban chuyên môn đạt kết quả mỹ mãn." },
  { name: "Cơ", element: "Thủy", animal: "Báo", type: "cat", score: 10, poem: "Cơ tinh chiếu rọi tiến bộ nhanh", desc: "Sao Cát: Thuận lợi học tập, nghiên cứu EBM, ứng dụng công nghệ chẩn đoán mới." },
  { name: "Đẩu", element: "Mộc", animal: "Giải", type: "cat", score: 15, poem: "Đẩu tinh đại cát vạn sự thành", desc: "Thất Tinh Đại Cát: Chẩn đoán ca khó chính xác, hồi sức nội khoa thành công ngoạn mục." },
  { name: "Ngưu", element: "Kim", animal: "Ngưu", type: "hung", score: -8, poem: "Ngưu tinh trắc trở chậm tiến độ", desc: "Sao Hung: Đề phòng nhầm lẫn hành chính, cần kiểm tra đối chiếu hồ sơ 2 lần." },
  { name: "Nữ", element: "Thổ", animal: "Bức", type: "hung", score: -10, poem: "Nữ tinh tranh đoạt phải đề phòng", desc: "Sao Hung: Chú ý kỹ năng giao tiếp với thân nhân người bệnh, giữ vững bình tĩnh." },
  { name: "Hư", element: "Nhật", animal: "Thử", type: "hung", score: -12, poem: "Hư tinh hư hao hao tổn thần", desc: "Sao Hung: Cơ thể dễ mệt mỏi, cần nghỉ ngơi đủ giấc giữa các ca trực nội trú căng thẳng." },
  { name: "Nguy", element: "Nguyệt", animal: "Yến", type: "hung", score: -10, poem: "Nguy tinh nguy hiểm rình rập quanh", desc: "Sao Hung: Cẩn trọng suy sụp sinh hiệu âm thầm, theo dõi sát MEWS/NEWS2." },
  { name: "Thất", element: "Hỏa", animal: "Trư", type: "cat", score: 15, poem: "Thất tinh đại cát vượng sinh khí", desc: "Thất Tinh Đại Cát: Năng lượng điều trị đỉnh cao, người bệnh phục hồi chức năng tạng tích cực." },
  { name: "Bích", element: "Thủy", animal: "Du", type: "cat", score: 15, poem: "Bích tinh văn chương y thuật cao", desc: "Thất Tinh Đại Cát: Xuất bản bài báo y học, bảo vệ luận án, nghiệm thu phác đồ nội khoa." },
  { name: "Khuê", element: "Mộc", animal: "Lang", type: "hung", score: -10, poem: "Khuê tinh xung sát chớ khinh nhờn", desc: "Sao Hung: Hạn chế can thiệp xâm lấn nếu không cấp bách, bám sát protocol điều trị nội." },
  { name: "Lâu", element: "Kim", animal: "Cẩu", type: "cat", score: 12, poem: "Lâu tinh phát phúc hưng thịnh thay", desc: "Sao Cát: Khai trương phòng khám, triển khai máy đo chức năng hô hấp/ECG rất thuận lợi." },
  { name: "Vị", element: "Thổ", animal: "Trĩ", type: "cat", score: 10, poem: "Vị tinh hòa hợp đắc nhân tâm", desc: "Sao Cát: Bác sĩ và người bệnh thấu hiểu, tuân thủ phác đồ điều trị mạn tính tốt." },
  { name: "Mão", element: "Nhật", animal: "Kê", type: "hung", score: -12, poem: "Mão tinh mặt trời tối tăm mờ", desc: "Sao Hung: Tránh xung đột truyền thông, tập trung kiểm soát chất lượng chuyên môn." },
  { name: "Tất", element: "Nguyệt", animal: "Ô", type: "cat", score: 12, poem: "Tất tinh che chở giải tai ương", desc: "Sao Cát: Hóa giải ca khó, bệnh nhân suy tạng chuyển biến tích cực rõ rệt." },
  { name: "Chủy", element: "Hỏa", animal: "Hầu", type: "hung", score: -8, poem: "Chủy tinh tranh cãi lắm ưu phiền", desc: "Sao Hung: Giữ gìn hòa khí đồng nghiệp, giao ban súc tích rõ ràng theo chuẩn SBAR." },
  { name: "Sâm", element: "Thủy", animal: "Viên", type: "cat", score: 10, poem: "Sâm tinh đại thịnh vượng cơ đồ", desc: "Sao Cát: Phát triển kỹ thuật mới, chuyển giao phác đồ điều trị đích thành công." },
  { name: "Tỉnh", element: "Mộc", animal: "Hãn", type: "cat", score: 12, poem: "Tỉnh tinh nguồn suối mát trong lành", desc: "Sao Cát: Tâm lý vững vàng, tư duy dược lý nhạy bén, xử lý cấp cứu nội dứt khoát." },
  { name: "Quỷ", element: "Kim", animal: "Dương", type: "hung", score: -15, poem: "Quỷ tinh tai họa phải kiêng dè", desc: "Sao Đại Hung: Tuyệt đối kiêng đổi phác đồ mạo hiểm liều cao, kiểm soát chặt tác dụng phụ." },
  { name: "Liễu", element: "Thổ", animal: "Chướng", type: "hung", score: -10, poem: "Liễu tinh trôi dạt khó định hình", desc: "Sao Hung: Dễ phân tâm khi chẩn đoán, cần đối chiếu guideline EBM chuẩn quốc tế." },
  { name: "Tinh", element: "Nhật", animal: "Mã", type: "hung", score: -8, poem: "Tinh tinh vội vã dễ sai lầm", desc: "Sao Hung: Tránh hấp tấp ra y lệnh, kiểm tra kỹ tiền sử dị ứng thuốc và tương tác DDI." },
  { name: "Trương", element: "Nguyệt", animal: "Lộc", type: "cat", score: 14, poem: "Trương tinh rạng rỡ đón vinh quang", desc: "Sao Đại Cát: Nghiên cứu y học xuất sắc, hội chẩn liên chuyên khoa nội đạt đồng thuận cao." },
  { name: "Dực", element: "Hỏa", animal: "Xà", type: "cat", score: 15, poem: "Dực tinh chắp cánh bay cao xa", desc: "Thất Tinh Đại Cát: Thời điểm vàng cho các ca bệnh phức tạp đa cơ quan, điều trị ngoạn mục." },
  { name: "Chẩn", element: "Thủy", animal: "Dẫn", type: "cat", score: 12, poem: "Chẩn tinh trị bệnh cứu nhân sinh", desc: "Sao Đại Cát Y Khoa: Mang nghĩa chẩn đoán & điều trị hanh thông, y thuật thăng hoa." }
];

// 12 TRỰC NGÀY (Chuẩn hóa Nội khoa)
export const TRUC_LIST: TrucItem[] = [
  { name: "Kiến", type: "cat", rating: "Đại Cát", score: 12, desc: "Khởi tạo phác đồ mới, tiếp nhận ca bệnh nội khoa phức tạp, mở phòng khám." },
  { name: "Trừ", type: "cat", rating: "Cát", score: 10, desc: "Thải trừ độc chất, giải toan, kiểm soát đợt cấp, điều chỉnh giảm liều an toàn." },
  { name: "Mãn", type: "cat", rating: "Đại Cát", score: 12, desc: "Viên mãn, phục hồi hoàn toàn chức năng tạng, hội chẩn kết luận thành công." },
  { name: "Bình", type: "cat", rating: "Bình Hòa", score: 8, desc: "Bình ổn huyết động, thích hợp tái khám định kỳ, điều hòa y lệnh thuốc." },
  { name: "Định", type: "cat", rating: "Đại Cát", score: 15, desc: "Định vị chẩn đoán xác định, kiểm soát bệnh mạn tính, kế hoạch điều trị vững chắc." },
  { name: "Chấp", type: "neutral", rating: "Bình Hòa", score: 5, desc: "Nắm giữ, kiên trì theo dõi đáp ứng phác đồ, thích hợp hẹn tái khám." },
  { name: "Phá", type: "hung", rating: "Đại Hung", score: -15, desc: "Nguyệt Phá xung đột, kiêng đổi thuốc mạo hiểm, thận trọng tác dụng phụ thuốc tích lũy." },
  { name: "Nguy", type: "hung", rating: "Hung", score: -8, desc: "Nguy cơ tiềm ẩn, cẩn trọng khi ra y lệnh liều cao thuốc có khoảng trị liệu hẹp." },
  { name: "Thành", type: "cat", rating: "Đại Cát", score: 15, desc: "Thành công trọn vẹn, thời điểm rất tốt đánh giá xuất viện, nghiệm thu đề tài." },
  { name: "Thâu", type: "cat", rating: "Cát", score: 10, desc: "Thu hoạch kết quả xét nghiệm, tổng kết bệnh án, nghiệm thu bằng chứng EBM." },
  { name: "Khai", type: "cat", rating: "Đại Cát", score: 15, desc: "Khai thông khí huyết, triển khai phác đồ thuốc sinh học mới, khai trương cơ sở." },
  { name: "Bế", type: "hung", rating: "Hung", score: -10, desc: "Bế tắc chuyển hóa, kiêng khởi đầu đột ngột thuốc độc tính cao, duy trì phác đồ an toàn." }
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
  "Quý Dậu": { canChi: "Quý Dậu", name: "Kiếm Phong Kim", element: "Kim", meaning: "Vàng mũi kiếm — Sắc sảo, tư duy phân tích nhạy bén." },
  "Giáp Tuất": { canChi: "Giáp Tuất", name: "Sơn Đầu Hỏa", element: "Hỏa", meaning: "Lửa trên đỉnh núi — Tỏa sáng từ tầm cao, dẫn dắt chỉ hướng." },
  "Ất Hợi": { canChi: "Ất Hợi", name: "Sơn Đầu Hỏa", element: "Hỏa", meaning: "Lửa trên đỉnh núi — Quang minh rực rỡ, tinh thần tiên phong." },
  "Bính Tý": { canChi: "Bính Tý", name: "Giản Hạ Thủy", element: "Thủy", meaning: "Nước dưới khe — Uyển chuyển luồn lách, tinh tế, nhu thuận." },
  "Đinh Sửu": { canChi: "Đinh Sửu", name: "Giản Hạ Thủy", element: "Thủy", meaning: "Nước dưới khe — Trong trẻo, nuôi dưỡng sinh linh, điềm đạm." },
  "Mậu Dần": { canChi: "Mậu Dần", name: "Thành Đầu Thổ", element: "Thổ", meaning: "Đất trên mặt thành — Thành lũy kiên cố, phòng ngự vững vàng." },
  "Kỷ Mão": { canChi: "Kỷ Mão", name: "Thành Đầu Thổ", element: "Thổ", meaning: "Đất trên mặt thành — Giữ gìn trật tự, chống đỡ hiểm nguy." },
  "Canh Thìn": { canChi: "Canh Thìn", name: "Bạch Lạp Kim", element: "Kim", meaning: "Vàng sáp ong — Thanh khiết, đã loại bỏ tạp chất, sáng rõ." },
  "Tân Tỵ": { canChi: "Tân Tỵ", name: "Bạch Lạp Kim", element: "Kim", meaning: "Vàng sáp ong — Khéo léo, tinh vi, chuẩn mực cao." },
  "Nhâm Ngọ": { canChi: "Nhâm Ngọ", name: "Dương Liễu Mộc", element: "Mộc", meaning: "Gỗ cây liễu — Mềm dẻo trước bão táp, linh hoạt ứng biến." },
  "Quý Mùi": { canChi: "Quý Mùi", name: "Dương Liễu Mộc", element: "Mộc", meaning: "Gỗ cây liễu — Nhu thắng cương, thích nghi nhanh với nghịch cảnh." },
  "Giáp Thân": { canChi: "Giáp Thân", name: "Tuyền Trung Thủy", element: "Thủy", meaning: "Nước trong suối nguồn — Mạch sống tuôn trào không cạn." },
  "Ất Dậu": { canChi: "Ất Dậu", name: "Tuyền Trung Thủy", element: "Thủy", meaning: "Nước trong suối nguồn — Tinh khiết vô ngần, nuôi dưỡng cơ thể." },
  "Bính Tuất": { canChi: "Bính Tuất", name: "Ốc Thượng Thổ", element: "Thổ", meaning: "Đất mái ngói — Che mưa chắn gió, an cư lạc nghiệp." },
  "Đinh Hợi": { canChi: "Đinh Hợi", name: "Ốc Thượng Thổ", element: "Thổ", meaning: "Đất mái ngói — Bảo vệ bình yên cho người bệnh và gia quyến." },
  "Mậu Tý": { canChi: "Mậu Tý", name: "Tích Lịch Hỏa", element: "Hỏa", meaning: "Lửa sấm sét — Quyết liệt chớp nhoáng, phá tan bóng tối bệnh tật." },
  "Kỷ Sửu": { canChi: "Kỷ Sửu", name: "Tích Lịch Hỏa", element: "Hỏa", meaning: "Lửa sấm sét — Sức bật phi thường trong các ca cấp cứu giờ vàng." },
  "Canh Dần": { canChi: "Canh Dần", name: "Tùng Bách Mộc", element: "Mộc", meaning: "Gỗ tùng bách — Bất khuất giữa mùa đông tuyết giá, kiên cường." },
  "Tân Mão": { canChi: "Tân Mão", name: "Tùng Bách Mộc", element: "Mộc", meaning: "Gỗ tùng bách — Sức sống trường thọ, phục hồi vững chắc." },
  "Nhâm Thìn": { canChi: "Nhâm Thìn", name: "Trường Lưu Thủy", element: "Thủy", meaning: "Nước chảy thành dòng lớn — Lưu thông huyết mạch, vô tận dạt dào." },
  "Quý Tỵ": { canChi: "Quý Tỵ", name: "Trường Lưu Thủy", element: "Thủy", meaning: "Nước chảy sông dài — Hướng về biển lớn, trí tuệ bao la." },
  "Giáp Ngọ": { canChi: "Giáp Ngọ", name: "Sa Trung Kim", element: "Kim", meaning: "Vàng trong cát — Cần đãi lọc kiên nhẫn, giá trị bền lâu." },
  "Ất Mùi": { canChi: "Ất Mùi", name: "Sa Trung Kim", element: "Kim", meaning: "Vàng trong cát — Khiêm nhường mà quý giá, y đức vẹn toàn." },
  "Bính Thân": { canChi: "Bính Thân", name: "Sơn Hạ Hỏa", element: "Hỏa", meaning: "Lửa dưới chân núi — Ấm áp, tích tụ sinh lực, kiên định." },
  "Đinh Dậu": { canChi: "Đinh Dậu", name: "Sơn Hạ Hỏa", element: "Hỏa", meaning: "Lửa dưới chân núi — Ánh sáng bền bỉ, xua tan u ám." },
  "Mậu Tuất": { canChi: "Mậu Tuất", name: "Bình Địa Mộc", element: "Mộc", meaning: "Gỗ đồng bằng — Dễ sinh sôi nảy nở, thân thiện, hòa đồng." },
  "Kỷ Hợi": { canChi: "Kỷ Hợi", name: "Bình Địa Mộc", element: "Mộc", meaning: "Gỗ đồng bằng — Đâm chồi nảy lộc, người bệnh mau lại sức." },
  "Canh Tý": { canChi: "Canh Tý", name: "Bích Thượng Thổ", element: "Thổ", meaning: "Đất trên vách tường — Vững chãi bao che, ngăn ngừa biến chứng." },
  "Tân Sửu": { canChi: "Tân Sửu", name: "Bích Thượng Thổ", element: "Thổ", meaning: "Đất trên vách tường — Điểm tựa an tâm cho thân nhân người bệnh." },
  "Nhâm Dần": { canChi: "Nhâm Dần", name: "Kim Bạc Kim", element: "Kim", meaning: "Vàng mạ bạc — Sáng loáng trang nghiêm, thẩm mỹ tinh tế." },
  "Quý Mão": { canChi: "Quý Mão", name: "Kim Bạc Kim", element: "Kim", meaning: "Vàng mạ bạc — Tinh hoa của nghệ thuật chẩn đoán và y thuật." },
  "Giáp Thìn": { canChi: "Giáp Thìn", name: "Phúc Đăng Hỏa", element: "Hỏa", meaning: "Lửa ngọn đèn dầu — Soi tỏ chẩn đoán trong màn sương triệu chứng." },
  "Ất Tỵ": { canChi: "Ất Tỵ", name: "Phúc Đăng Hỏa", element: "Hỏa", meaning: "Lửa ngọn đèn dầu — Thắp sáng hy vọng cho các ca bệnh mạn tính nặng." },
  "Bính Ngọ": { canChi: "Bính Ngọ", name: "Thiên Hà Thủy", element: "Thủy", meaning: "Nước mưa trên trời — Mưa móc cứu vớt sinh linh, giải tỏa cơn bệnh." },
  "Đinh Mùi": { canChi: "Đinh Mùi", name: "Thiên Hà Thủy", element: "Thủy", meaning: "Nước mưa trên trời — Mát lành tâm can, giải độc thanh nhiệt." },
  "Mậu Thân": { canChi: "Mậu Thân", name: "Đại Trạch Thổ", element: "Thổ", meaning: "Đất đầm lầy phù sa — Màu mỡ trù phú, dinh dưỡng nội môi dồi dào." },
  "Kỷ Dậu": { canChi: "Kỷ Dậu", name: "Đại Trạch Thổ", element: "Thổ", meaning: "Đất cồn bãi màu mỡ — Khả năng tái tạo tế bào và phục hồi nhanh chóng." },
  "Canh Tuất": { canChi: "Canh Tuất", name: "Thoa Xuyến Kim", element: "Kim", meaning: "Vàng trang sức trâm cài — Tinh xảo tuyệt mỹ, khéo léo." },
  "Tân Hợi": { canChi: "Tân Hợi", name: "Thoa Xuyến Kim", element: "Kim", meaning: "Vàng trang sức — Bàn tay thăm khám lâm sàng nhẹ nhàng, chuẩn mực." },
  "Nhâm Tý": { canChi: "Nhâm Tý", name: "Tang Đố Mộc", element: "Mộc", meaning: "Gỗ cây dâu tằm — Vị thuốc quý, trị phong trừ tà, dưỡng huyết." },
  "Quý Sửu": { canChi: "Quý Sửu", name: "Tang Đố Mộc", element: "Mộc", meaning: "Gỗ cây dâu tằm — Điều hòa chuyển hóa nội môi xuất sắc." },
  "Giáp Dần": { canChi: "Giáp Dần", name: "Đại Khê Thủy", element: "Thủy", meaning: "Nước khe lớn — Năng lượng cuồn cuộn, tẩy sạch cặn bã độc chất." },
  "Ất Mão": { canChi: "Ất Mão", name: "Đại Khê Thủy", element: "Thủy", meaning: "Nước khe lớn — Điều hòa dịch thể, cân bằng toan kiềm tối ưu." },
  "Bính Thìn": { canChi: "Bính Thìn", name: "Sa Trung Thổ", element: "Thổ", meaning: "Đất pha cát — Tơi xốp thuận lợi cho rễ đâm sâu, dung hòa đa bệnh lý." },
  "Đinh Tỵ": { canChi: "Đinh Tỵ", name: "Sa Trung Thổ", element: "Thổ", meaning: "Đất phù sa bãi cát — Bồi đắp sinh lực sau cơn bạo bệnh." },
  "Mậu Ngọ": { canChi: "Mậu Ngọ", name: "Thiên Thượng Hỏa", element: "Hỏa", meaning: "Lửa trên trời (Thái Dương) — Chiếu rọi quang minh khắp thế gian." },
  "Kỷ Mùi": { canChi: "Kỷ Mùi", name: "Thiên Thượng Hỏa", element: "Hỏa", meaning: "Lửa trên trời — Hóa giải mọi u ám, tiêu trừ độc tố bệnh tật." },
  "Canh Thân": { canChi: "Canh Thân", name: "Thạch Lựu Mộc", element: "Mộc", meaning: "Gỗ cây thạch lựu — Quả sai hạt mẩy, sức sống dồi dào sinh sôi." },
  "Tân Dậu": { canChi: "Tân Dậu", name: "Thạch Lựu Mộc", element: "Mộc", meaning: "Gỗ cây thạch lựu — Cứng cáp, đề kháng cao trước vi khuẩn kháng thuốc." },
  "Nhâm Tuất": { canChi: "Nhâm Tuất", name: "Đại Hải Thủy", element: "Thủy", meaning: "Nước biển lớn — Bao la dung nạp trăm sông, tầm nhìn bao quát toàn diện." },
  "Quý Hợi": { canChi: "Quý Hợi", name: "Đại Hải Thủy", element: "Thủy", meaning: "Nước đại dương — Điểm kết thúc và khởi nguồn của chu kỳ sinh mệnh mới." }
};

// ─── MA TRẬN SAO ĐĂNG VIÊN (CHƯƠNG III: 28 NHỊ THẬP BÁT TÚ) ─────────────
export const SAO_DANG_VIEN_MAP: Record<string, { chiList: string[]; bonus: number; meaning: string }> = {
  "Giác": { chiList: ["Dần"], bonus: 12, meaning: "Đăng Viên tại Dần: Được ngôi cao cả, vạn sự hanh thông, y nghiệp thăng hoa." },
  "Cang": { chiList: ["Thìn"], bonus: 8, meaning: "Đăng Viên tại Thìn: Hoán Hung thành Cát, mưu sự chu toàn, chẩn đoán an ổn." },
  "Đê": { chiList: ["Thìn"], bonus: 18, meaning: "Đăng Viên Đỉnh Cao tại Thìn: Vốn là Hung tinh nhưng gặp Thìn hóa Thần Tinh, trăm việc đại lợi." },
  "Phòng": { chiList: ["Mão", "Dậu"], bonus: 10, meaning: "Đăng Viên tại Mão/Dậu: Nhật nguyệt quang minh, người bệnh hồi phục tích cực." },
  "Tâm": { chiList: ["Dần"], bonus: 6, meaning: "Đăng Viên tại Dần: Tạm hóa giải hung sát, thuận lợi cho thăm dò chức năng." },
  "Vĩ": { chiList: ["Dần", "Ngọ", "Tuất"], bonus: 12, meaning: "Đăng Viên Tam Hợp Hỏa: Hiển đạt rạng rỡ, phác đồ điều trị mỹ mãn." },
  "Cơ": { chiList: ["Thìn"], bonus: 8, meaning: "Đăng Viên tại Thìn: Khởi sắc nghiên cứu, ứng dụng guideline mới rất tốt." },
  "Đẩu": { chiList: ["Sửu", "Tỵ", "Dậu"], bonus: 12, meaning: "Đăng Viên tại Sửu: Thất tinh đắc vị, chẩn đoán đột phá, hồi sức thành công." },
  "Ngưu": { chiList: ["Ngọ", "Tuất"], bonus: 10, meaning: "Đăng Viên tại Ngọ: Xóa hung đắc cát, công tác hồ sơ bệnh án rõ ràng." },
  "Nữ": { chiList: ["Hợi"], bonus: 6, meaning: "Đăng Viên tại Hợi: Giảm bớt tranh cãi, giao tiếp người nhà hòa nhã." },
  "Hư": { chiList: ["Tý"], bonus: 8, meaning: "Đăng Viên tại Tý: Hóa giải mệt mỏi, ca trực đêm tỉnh táo." },
  "Nguy": { chiList: ["Sửu", "Dậu"], bonus: 10, meaning: "Đăng Viên tại Sửu/Dậu: Tạo tác sự việc quý hiển, kiểm soát tốt rủi ro điều trị." },
  "Thất": { chiList: ["Dần", "Ngọ", "Tuất"], bonus: 12, meaning: "Đăng Viên tại Ngọ: Sinh khí tột đỉnh, người bệnh qua cơn nguy kịch." },
  "Bích": { chiList: ["Hợi"], bonus: 10, meaning: "Đăng Viên tại Hợi: Văn chương y thuật trác việt, nghiệm thu đề tài EBM." },
  "Khuê": { chiList: ["Thân"], bonus: 10, meaning: "Đăng Viên tại Thân: Tiến thân danh, khởi xướng phác đồ mới." },
  "Lâu": { chiList: ["Dậu"], bonus: 10, meaning: "Đăng Viên tại Dậu: Phúc lộc tăng tiến, khai trương phòng khám nội đại cát." },
  "Vị": { chiList: ["Tuất"], bonus: 8, meaning: "Đăng Viên tại Tuất: Đắc nhân tâm, thầy thuốc và người bệnh thấu hiểu." },
  "Mão": { chiList: ["Mão"], bonus: 8, meaning: "Đăng Viên tại Mão: Mặt trời xua mây mù, chẩn đoán sáng suốt." },
  "Tất": { chiList: ["Thân"], bonus: 15, meaning: "Đăng Viên tại Thân: Trăng treo đầu núi, trị bệnh cứu người ĐẠI KIẾT." },
  "Chủy": { chiList: ["Dậu"], bonus: 8, meaning: "Đăng Viên tại Dậu: Khởi động thăng tiến, đồng thuận phác đồ." },
  "Sâm": { chiList: ["Tuất"], bonus: 12, meaning: "Đăng Viên tại Tuất: Phó nhiệm may mắn, cầu công danh y khoa hiển hách." },
  "Tỉnh": { chiList: ["Tý"], bonus: 12, meaning: "Đăng Viên tại Tý: Thừa kế tước phong, tâm lý ra y lệnh dứt khoát." },
  "Quỷ": { chiList: ["Tý", "Thân"], bonus: 6, meaning: "Tạm hóa giải hung tính, giữ chuẩn mực an toàn kê đơn cao độ." },
  "Liễu": { chiList: ["Ngọ"], bonus: 8, meaning: "Đăng Viên tại Ngọ: Định hình phác đồ, tránh phân tâm chẩn đoán." },
  "Tinh": { chiList: ["Dần"], bonus: 8, meaning: "Đăng Viên tại Dần: Điềm tĩnh ra y lệnh, kiểm soát tương tác thuốc tốt." },
  "Trương": { chiList: ["Mùi"], bonus: 12, meaning: "Đăng Viên tại Mùi: Vinh quang học thuật, hội chẩn đa chuyên khoa đồng thuận." },
  "Dực": { chiList: ["Thân"], bonus: 14, meaning: "Đăng Viên tại Thân: Đôi cánh đại bàng, ca bệnh phức tạp hồi phục thành công." },
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
export const THIEN_Y_MAP: Record<number, string> = {
  1: "Sửu", 2: "Dần", 3: "Mão", 4: "Thìn", 5: "Tỵ", 6: "Ngọ",
  7: "Mùi", 8: "Thân", 9: "Dậu", 10: "Tuất", 11: "Hợi", 12: "Tý"
};

export const SINH_KHI_MAP: Record<number, string> = {
  1: "Tý", 2: "Sửu", 3: "Dần", 4: "Mão", 5: "Thìn", 6: "Tỵ",
  7: "Ngọ", 8: "Mùi", 9: "Thân", 10: "Dậu", 11: "Tuất", 12: "Hợi"
};

export const SAT_CHU_MAP: Record<number, string> = {
  1: "Tỵ", 2: "Tý", 3: "Mùi", 4: "Mão", 5: "Thân", 6: "Tuất",
  7: "Sửu", 8: "Hợi", 9: "Ngọ", 10: "Dậu", 11: "Dần", 12: "Thìn"
};

export const THO_TU_MAP: Record<number, string> = {
  1: "Tuất", 2: "Thìn", 3: "Hợi", 4: "Tỵ", 5: "Tý", 6: "Ngọ",
  7: "Sửu", 8: "Mùi", 9: "Dần", 10: "Thân", 11: "Mão", 12: "Dậu"
};

// Ngày bất lợi tâm trí, thận trọng ra y lệnh liều hẹp
export const DAO_CHIEM_SAT_DAYS: Record<number, string[]> = {
  1: ["Tý", "Hợi"], 2: ["Dần", "Mão"], 3: ["Tỵ", "Ngọ"], 4: ["Thân", "Dậu"],
  5: ["Thìn", "Tuất"], 6: ["Sửu", "Mùi"], 7: ["Tý", "Hợi"], 8: ["Dần", "Mão"],
  9: ["Tỵ", "Ngọ"], 10: ["Thân", "Dậu"], 11: ["Thìn", "Tuất"], 12: ["Sửu", "Mùi"]
};

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

// ─── CẤU HÌNH CHI TIẾT 5 TÁC VỤ LÂM SÀNG NỘI KHOA (CHƯƠNG II: 83 VỤ) ───
export const MEDICAL_TASKS_CONFIG: Record<MedicalTaskType, MedicalTaskConfig> = {
  kham_chandoan: {
    id: "kham_chandoan",
    vuNumber: 81,
    title: "Vụ 81: Tiếp Nhận Khám & Biện Luận Ca Khó Nội Khoa",
    shortTitle: "Chẩn Đoán Ca Khó",
    description: "Thời điểm vàng tiếp nhận người bệnh nặng, kết nối triệu chứng đa hệ cơ quan, tìm kiếm căn nguyên bệnh lý tiềm ẩn và lập chiến lược chẩn đoán.",
    specialDays: ["Kỷ Dậu", "Bính Thìn", "Nhâm Thìn"],
    baseDays: [
      "Kỷ Dậu", "Bính Thìn", "Nhâm Thìn",
      "Giáp Tý", "Ất Sửu", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Nhâm Thân",
      "Quý Dậu", "Ất Hợi", "Bính Tý", "Đinh Sửu", "Mậu Dần", "Giáp Thân",
      "Bính Tuất", "Canh Dần", "Tân Mão", "Ất Mùi", "Bính Ngọ", "Tân Hợi"
    ],
    hapTruc: ["Chấp", "Trừ", "Thành", "Khai", "Định"],
    kyTruc: ["Phá", "Nguy", "Bế"],
    hapThanSat: ["Thiên Y", "Sinh Khí", "Phổ Hộ", "Yếu An", "Thần Tại", "Thiên Đức", "Nguyệt Đức"],
    kyThanSat: ["Sát Chủ", "Thọ Tử", "Nguyệt Phá"],
    specialNotes: [
      "Gặp 3 ngày tối thượng Kỷ Dậu, Bính Thìn, Nhâm Thìn là Đại Cát: Biện luận sáng tỏ, ca khó sớm tìm ra chẩn đoán xác định.",
      "Bác sĩ Nội khoa lưu ý kiểm tra chéo các xét nghiệm cận lâm sàng không tương xứng triệu chứng lâm sàng."
    ]
  },
  khoi_phacdo: {
    id: "khoi_phacdo",
    vuNumber: 82,
    title: "Vụ 82: Khởi Đầu Phác Đồ Điều Trị / Dược Trị Liệu Bậc Cao",
    shortTitle: "Khởi Đầu Phác Đồ",
    description: "Thời điểm thích hợp khởi động liệu pháp kháng sinh đích, thuốc hạ áp, insulin nội viện, thuốc sinh học hoặc corticoid liều cao.",
    baseDays: [
      "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Nhâm Thân", "Ất Hợi", "Mậu Dần",
      "Giáp Thân", "Bính Tuất", "Tân Mão", "Ất Mùi", "Bính Ngọ", "Tân Hợi", "Kỷ Mùi"
    ],
    hapTruc: ["Trừ", "Phá", "Khai", "Thành"],
    kyTruc: ["Bế", "Nguy"],
    hapThanSat: ["Thiên Y", "Sinh Khí", "Thiên Ân", "Vượng Nhật"],
    kyThanSat: ["Sát Chủ", "Không Vong", "Thọ Tử"],
    specialNotes: [
      "Trực Trừ và Trực Khai giúp trừ khứ căn nguyên và tối ưu hóa diện tích dưới đường cong nồng độ-thời gian (AUC) của dược phẩm."
    ]
  },
  chinh_lieu_xuatvien: {
    id: "chinh_lieu_xuatvien",
    vuNumber: 83,
    title: "Vụ 83: Hiệu Chỉnh Liều, Rà Soát Tương Tác & Xuất Viện An Toàn",
    shortTitle: "Hiệu Chỉnh Liều & Xuất Viện",
    description: "Rà soát chức năng thận (eGFR/CrCl), giải trừ tương tác thuốc (DDI), chuyển đổi thuốc uống (step-down) và lập kế hoạch xuất viện an toàn.",
    baseDays: [
      "Ất Sửu", "Nhâm Thân", "Quý Dậu", "Ất Hợi", "Bính Tý", "Đinh Sửu",
      "Giáp Thân", "Bính Tuất", "Kỷ Sửu", "Nhâm Thìn", "Quý Tỵ", "Giáp Ngọ",
      "Bính Thân", "Đinh Dậu", "Mậu Tuất", "Kỷ Hợi", "Canh Tý", "Tân Sửu",
      "Mậu Thân", "Kỷ Dậu", "Tân Dậu"
    ],
    hapTruc: ["Trừ", "Thành", "Khai", "Bình"],
    kyTruc: ["Mãn", "Bế"],
    hapThanSat: ["Thiên Y", "Sinh Khí", "Thiên Đức", "Nguyệt Đức"],
    kyThanSat: ["Nguyệt Kỵ", "Tam Nương", "Thọ Tử"],
    genderRules: {
      maleKyTruc: ["Trừ"],
      femaleKyTruc: ["Thâu"]
    },
    specialNotes: [
      "Kiểm tra kỹ ngưỡng an toàn điều trị của thuốc có khoảng trị liệu hẹp (Digoxin, Theophylline, Phenytoin, Kháng đông VKA/DOAC).",
      "Đánh giá tiêu chuẩn sẵn sàng xuất viện (Discharge Criteria) sau 48-72h điều trị ổn định."
    ]
  },
  khai_truong_kthuat: {
    id: "khai_truong_kthuat",
    vuNumber: 37,
    title: "Vụ 37: Khai Trương Phòng Khám Nội Khoa / Triển Khai Thăm Dò Chức Năng",
    shortTitle: "Khai Trương & Thăm Dò",
    description: "Mở phòng khám chuyên khoa nội, triển khai đo chức năng hô hấp, siêu âm tim tại giường (POCUS), Holter huyết áp hoặc nội soi chẩn đoán.",
    baseDays: [
      "Giáp Tý", "Ất Sửu", "Bính Dần", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi",
      "Giáp Tuất", "Ất Hợi", "Bính Tý", "Đinh Sửu", "Nhâm Ngọ", "Quý Mùi"
    ],
    hapTruc: ["Mãn", "Thành", "Khai"],
    kyTruc: ["Phá", "Bế"],
    hapThanSat: ["Lộc Thần", "Thiên Đức", "Nguyệt Đức", "Ngũ Phú", "Đại Hồng Sa"],
    kyThanSat: ["Sát Chủ", "Không Vong", "Thập Ác Đại Bại"],
    specialNotes: [
      "Hội tụ Lộc Thần và Trực Thành: Dịch vụ thăm dò chức năng chuẩn xác, y nghiệp phát triển bền vững."
    ]
  },
  hoi_chan_ebm: {
    id: "hoi_chan_ebm",
    vuNumber: 39,
    title: "Vụ 39: Hội Chẩn Ca Bệnh Liên Chuyên Khoa & Nghiên Cứu EBM",
    shortTitle: "Hội Chẩn & Báo Cáo EBM",
    description: "Tổ chức hội chẩn đa chuyên khoa (MDT), sinh hoạt khoa học Grand Rounds, nghiệm thu đề tài EBM hoặc xuất bản nghiên cứu y học.",
    baseDays: [
      "Tân Mùi", "Bính Tý", "Đinh Sửu", "Nhâm Ngọ", "Quý Mùi", "Giáp Thân",
      "Tân Mão", "Nhâm Thìn", "Ất Mùi", "Canh Tý", "Quý Mão", "Đinh Mùi",
      "Mậu Thân", "Nhâm Tý", "Giáp Dần", "Ất Mão", "Kỷ Mùi", "Tân Dậu"
    ],
    hapTruc: ["Chấp", "Thành", "Thâu"],
    kyTruc: ["Phá", "Nguy"],
    hapThanSat: ["Thiên Đức", "Nguyệt Đức", "Kiết Khánh"],
    kyThanSat: ["Trường Đoản Tinh", "Không Vong"],
    specialNotes: [
      "Thích hợp liên kết chứng cứ từ các thử nghiệm lâm sàng ngẫu nhiên có nhóm chứng (RCTs) để thống nhất hướng xử trí tối ưu."
    ]
  }
};

// ─── KHO CLINICAL PEARLS NỘI KHOA CHUẨN EBM 2026 ──────────────────────────
export const CLINICAL_PEARLS = [
  { 
    topic: "Nội Tiết & Cấp Cứu", 
    title: "Cấp Cứu Toan Ceton (DKA): Bù Kali Trước Khi Truyền Insulin", 
    text: "Nếu K+ máu < 3.3 mEq/L, tuyệt đối KHÔNG tiêm/truyền insulin ngay! Bù Kali trước để tránh kéo Kali vào nội bào gây loạn nhịp thất chết người (ADA 2026)." 
  },
  { 
    topic: "Nội Tim Mạch", 
    title: "Tứ Trụ Điều Trị Suy Tim Phân Suất Tống Máu Giảm (HFrEF)", 
    text: "Khởi động sớm và tăng dần liều 4 nhóm thuốc trụ cột: ARNI/ACEi, Chẹn Beta giao cảm, MRA (Spironolactone) và thuốc ức chế SGLT2 (Dapa/Empagliflozin) giúp giảm 60% tử vong (ESC 2026)." 
  },
  { 
    topic: "Nội Hô Hấp", 
    title: "COPD Đợt Cấp Có Tăng CO2 Máu: Đích SpO2 88 - 92%", 
    text: "Thở oxy liều quá cao làm mất kích thích thông khí do giảm oxy mô, dẫn đến ứ CO2 nặng và hôn mê toan hô hấp. Luôn duy trì SpO2 mục tiêu 88–92% (GOLD 2026)." 
  },
  { 
    topic: "Nội Thận & Điện Giải", 
    title: "Hạ Natri Máu Mạn Tính: Tốc Độ Nâng Natri An Toàn", 
    text: "Không nâng Natri máu quá 8–10 mmol/L trong 24 giờ đầu để phòng ngừa biến chứng Hội chứng hủy myelin cầu não thẩm thấu (ODS) không hồi phục." 
  },
  { 
    topic: "Nội Tiêu Hóa", 
    title: "Chọc Tháo Dịch Báng Lớn (> 5L) & Bù Albumin Phòng PICD", 
    text: "Khi chọc tháo dịch báng > 5 lít ở bệnh nhân xơ gan, bắt buộc bù 8g Albumin ưu trương (20%) cho mỗi lít dịch hút ra để ngừa suy thận cấp và rối loạn tuần hoàn sau chọc (EASL 2026)." 
  },
  { 
    topic: "Dược Lâm Sàng", 
    title: "Kháng Sinh Diệt Khuẩn Phụ Thuộc Thời Gian vs Nồng Độ", 
    text: "Beta-lactam phụ thuộc %fT > MIC (nên truyền kéo dài 3-4 giờ), trong khi Aminoglycoside phụ thuộc Cmax/MIC (dùng liều duy nhất trong ngày để tối ưu diệt khuẩn và giảm độc thận)." 
  },
  { 
    topic: "Nội Truyền Nhiễm", 
    title: "Sốc Nhiễm Khuẩn: Dịch Truyền Tinh Thể Trong 3 Giờ Đầu", 
    text: "Hồi sức dịch ban đầu tối thiểu 30 mL/kg dịch tinh thể đẳng trương trong 3 giờ đầu khi có tụt HA hoặc Lactate ≥ 4 mmol/L; ưu tiên dung dịch cân bằng (Balanced Crystalloids - SSC 2026)." 
  }
];

export function getDailyClinicalPearl(dateObj: Date = new Date()): { topic: string; title: string; text: string } {
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return CLINICAL_PEARLS[dayOfYear % CLINICAL_PEARLS.length] || CLINICAL_PEARLS[0]!;
}
