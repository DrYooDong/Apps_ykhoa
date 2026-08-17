/**
 * CliniPortal — Good Day & Clinical Astrological Intelligence Calculator (ADVANCED CLINICAL VERSION 2.0)
 * Pure Vanilla ES6 JS - Zero external dependencies
 */
(function (global) {
  'use strict';

  // --- HẰNG SỐ VÀ DỮ LIỆU CƠ BẢN ---
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

  const NGU_HANH_CAN = {
    "Giáp": "Mộc", "Ất": "Mộc",
    "Bính": "Hỏa", "Đinh": "Hỏa",
    "Mậu": "Thổ", "Kỷ": "Thổ",
    "Canh": "Kim", "Tân": "Kim",
    "Nhâm": "Thủy", "Quý": "Thủy"
  };

  const NGU_HANH_CHI = {
    "Tý": "Thủy", "Hợi": "Thủy",
    "Dần": "Mộc", "Mão": "Mộc",
    "Tỵ": "Hỏa", "Ngọ": "Hỏa",
    "Thân": "Kim", "Dậu": "Kim",
    "Thìn": "Thổ", "Tuất": "Thổ", "Sửu": "Thổ", "Mùi": "Thổ"
  };

  const HANH_SINH_KHAC = {
    sinh: { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" },
    khac: { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" }
  };

  const GIO_TIME = {
    "Tý": "23h-01h", "Sửu": "01h-03h", "Dần": "03h-05h", "Mão": "05h-07h",
    "Thìn": "07h-09h", "Tỵ": "09h-11h", "Ngọ": "11h-13h", "Mùi": "13h-15h",
    "Thân": "15h-17h", "Dậu": "17h-19h", "Tuất": "19h-21h", "Hợi": "21h-23h"
  };

  const HOANG_DAO_MAP = {
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

  const GIO_THAN_SAT = [
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
  const NHI_THAP_BAT_TU = [
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
  const TRUC_LIST = [
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
  const TIET_KHI_LIST = [
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

  const THIEN_DUC_MAP = {
    1: "Đinh", 2: "Thân", 3: "Nhâm", 4: "Tân", 5: "Hợi", 6: "Giáp",
    7: "Quý", 8: "Dần", 9: "Bính", 10: "Ất", 11: "Tỵ", 12: "Canh"
  };

  const NGUYET_DUC_MAP = {
    1: "Bính", 5: "Bính", 9: "Bính",
    2: "Giáp", 6: "Giáp", 10: "Giáp",
    3: "Nhâm", 7: "Nhâm", 11: "Nhâm",
    4: "Canh", 8: "Canh", 12: "Canh"
  };

  const THIEN_AT_MAP = {
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

  const LOC_THAN_MAP = {
    "Giáp": "Dần", "Ất": "Mão", "Bính": "Tỵ", "Mậu": "Tỵ",
    "Đinh": "Ngọ", "Kỷ": "Ngọ", "Canh": "Thân", "Tân": "Dậu",
    "Nhâm": "Hợi", "Quý": "Tý"
  };

  const PROFILE_KEY = 'cliniportal_doctor_full_profile';

  function getJDN(day, month, year) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function getCanChiYear(year) {
    const canIdx = (year - 4) % 10;
    const chiIdx = (year - 4) % 12;
    const can = CAN[(canIdx + 10) % 10];
    const chi = CHI[(chiIdx + 12) % 12];
    return { can, chi, full: `${can} ${chi}` };
  }

  function getCanChiDay(dateObj) {
    const jdn = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
    const canIdx = (jdn + 9) % 10;
    const chiIdx = (jdn + 1) % 12;
    const can = CAN[canIdx];
    const chi = CHI[chiIdx];
    return {
      can,
      chi,
      full: `${can} ${chi}`,
      hanh: NGU_HANH_CAN[can] || 'Thổ',
      jdn
    };
  }

  function getApproxLunarDate(dateObj) {
    const jdn = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
    const refJDN = 2461089;
    const diffDays = jdn - refJDN;
    const synodicMonth = 29.530588853;

    const cycle = diffDays / synodicMonth;
    const monthOffset = Math.floor(cycle);
    let dayInMonth = Math.floor((cycle - monthOffset) * synodicMonth) + 1;
    if (dayInMonth > 30) dayInMonth = 30;
    if (dayInMonth < 1) dayInMonth = 1;

    let lunarMonth = ((1 + monthOffset) % 12);
    if (lunarMonth <= 0) lunarMonth += 12;

    return { day: dayInMonth, month: lunarMonth };
  }

  function getSaoTu(dateObj, jdn) {
    const calcJdn = jdn !== undefined ? jdn : getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
    const saoTuIdx = ((calcJdn + 12) % 28 + 28) % 28;
    return NHI_THAP_BAT_TU[saoTuIdx] || NHI_THAP_BAT_TU[0];
  }

  function getTrucNgay(lunarMonth, chiNgay) {
    const monthChiIdx = (lunarMonth + 1) % 12;
    const dayChiIdx = CHI.indexOf(chiNgay);
    const trucIdx = (dayChiIdx - monthChiIdx + 12) % 12;
    return TRUC_LIST[trucIdx] || TRUC_LIST[0];
  }

  function getTietKhiInfo(dateObj) {
    const m = dateObj.getMonth() + 1;
    const d = dateObj.getDate();

    let closest = TIET_KHI_LIST[0];
    let minDiff = 999;

    for (const tk of TIET_KHI_LIST) {
      const monthDiff = Math.abs(tk.m - m);
      const dayDiff = Math.abs(tk.d - d);
      const diff = monthDiff * 30 + dayDiff;
      if (diff < minDiff) {
        minDiff = diff;
        closest = tk;
      }
    }

    let tuLyTuTuyet = null;
    const tomorrow = new Date(dateObj.getTime() + 86400000);
    const tm = tomorrow.getMonth() + 1;
    const td = tomorrow.getDate();

    for (const tk of TIET_KHI_LIST) {
      if (tk.m === tm && tk.d === td) {
        if (tk.special === 'Ly') {
          tuLyTuTuyet = { type: 'Tứ Ly', name: `Tứ Ly (Trước ${tk.name})`, score: -12, desc: "Cực điểm chuyển giao Âm Dương, kiêng đại phẫu hoặc sự kiện lớn." };
        } else if (tk.special === 'Tuet') {
          tuLyTuTuyet = { type: 'Tứ Tuyệt', name: `Tứ Tuyệt (Trước ${tk.name})`, score: -8, desc: "Khí tiết cạn kiệt trước mốc Lập, thận trọng y lệnh phức tạp." };
        }
      }
    }

    return { tietKhi: closest, tuLyTuTuyet };
  }

  function kiemTraDiaChi(chiNamDoc, chiNgay) {
    const tamHopGroups = [
      ["Thân", "Tý", "Thìn"],
      ["Dần", "Ngọ", "Tuất"],
      ["Tỵ", "Dậu", "Sửu"],
      ["Hợi", "Mão", "Mùi"]
    ];
    let tamHop = { isMatch: false, text: "Không thuộc Tam Hợp", score: 0 };
    for (const grp of tamHopGroups) {
      if (grp.includes(chiNamDoc) && grp.includes(chiNgay) && chiNamDoc !== chiNgay) {
        tamHop = { isMatch: true, text: `Tam Hợp Cát Tinh (${chiNamDoc} - ${chiNgay}): Quý nhân đồng hành, hanh thông`, score: 15 };
        break;
      }
    }

    const lucHopPairs = [
      ["Tý", "Sửu"], ["Dần", "Hợi"], ["Mão", "Tuất"],
      ["Thìn", "Dậu"], ["Tỵ", "Thân"], ["Ngọ", "Mùi"]
    ];
    let lucHop = { isMatch: false, text: "Không phạm Lục Hợp", score: 0 };
    for (const p of lucHopPairs) {
      if ((p[0] === chiNamDoc && p[1] === chiNgay) || (p[1] === chiNamDoc && p[0] === chiNgay)) {
        lucHop = { isMatch: true, text: `Lục Hợp Hài Hòa (${chiNamDoc} hợp ${chiNgay}): Thầy thuốc - Bệnh nhân tâm đầu ý hợp`, score: 10 };
        break;
      }
    }

    const lucXungPairs = [
      ["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"],
      ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]
    ];
    let lucXung = { isMatch: false, text: "Không phạm Lục Xung", score: 0 };
    for (const p of lucXungPairs) {
      if ((p[0] === chiNamDoc && p[1] === chiNgay) || (p[1] === chiNamDoc && p[0] === chiNgay)) {
        lucXung = { isMatch: true, text: `Phạm Lục Xung (${chiNgay} xung tuổi ${chiNamDoc}): Cẩn trọng áp lực ca mổ & ca trực`, score: -18 };
        break;
      }
    }

    const lucHaiPairs = [
      ["Tý", "Mùi"], ["Sửu", "Ngọ"], ["Dần", "Tỵ"],
      ["Mão", "Thìn"], ["Thân", "Hợi"], ["Dậu", "Tuất"]
    ];
    let lucHai = { isMatch: false, text: "Không phạm Lục Hại", score: 0 };
    for (const p of lucHaiPairs) {
      if ((p[0] === chiNamDoc && p[1] === chiNgay) || (p[1] === chiNamDoc && p[0] === chiNgay)) {
        lucHai = { isMatch: true, text: `Phạm Lục Hại (${chiNgay} hại ${chiNamDoc}): Cẩn trọng giao tiếp, tránh hiểu lầm người nhà`, score: -10 };
        break;
      }
    }

    let tuongHinh = { isMatch: false, text: "Không phạm Tương Hình", score: 0 };
    if ((chiNamDoc === "Tý" && chiNgay === "Mão") || (chiNamDoc === "Mão" && chiNgay === "Tý")) {
      tuongHinh = { isMatch: true, text: `Phạm Vô Lễ Hình (${chiNamDoc} - ${chiNgay}): Giữ chuẩn mực giao tiếp y khoa`, score: -8 };
    } else if ((chiNamDoc === chiNgay) && ["Thìn", "Ngọ", "Dậu", "Hợi"].includes(chiNamDoc)) {
      tuongHinh = { isMatch: true, text: `Phạm Tự Hình (${chiNamDoc} phùng ${chiNgay}): Tránh tự gây áp lực tâm lý quá mức`, score: -8 };
    }

    const totalScore = tamHop.score + lucHop.score + lucXung.score + lucHai.score + tuongHinh.score;
    return { tamHop, lucHop, lucXung, lucHai, tuongHinh, totalScore };
  }

  function kiemTraQuyNhanLoc(canNamDoc, canNgay, chiNgay) {
    const quyNhanList = THIEN_AT_MAP[canNamDoc] || [];
    let thienAt = { isMatch: false, text: "Không phùng Quý Nhân", score: 0 };
    if (quyNhanList.includes(chiNgay)) {
      thienAt = { isMatch: true, text: `Thiên Ất Quý Nhân Giáng Lâm: Hội chẩn ca khó gặp quý nhân hỗ trợ, đồng nghiệp tận tâm`, score: 12 };
    }

    const locChi = LOC_THAN_MAP[canNamDoc];
    let locThan = { isMatch: false, text: "Không phùng Lộc Thần", score: 0 };
    if (locChi === chiNgay) {
      locThan = { isMatch: true, text: `Lộc Thần Tọa Chiêu: Thuận lợi nghiệm thu đề tài EBM, ký kết công tác, tài lộc y vụ`, score: 8 };
    }

    return { thienAt, locThan, totalScore: thienAt.score + locThan.score };
  }

  function kiemTraThanSat(lunarMonth, canNgay, chiNgay) {
    const list = [];
    let score = 0;

    const thienDuc = THIEN_DUC_MAP[lunarMonth];
    if (thienDuc === canNgay || thienDuc === chiNgay) {
      list.push({ name: "Thiên Đức Cát Thần", type: "pos", score: 10, desc: "Thần cát hộ trì, giải trừ hung rủi, y khoa may mắn." });
      score += 10;
    }

    const nguyetDuc = NGUYET_DUC_MAP[lunarMonth];
    if (nguyetDuc === canNgay) {
      list.push({ name: "Nguyệt Đức Tinh", type: "pos", score: 8, desc: "Đón nhận cát khí, minh mẫn chẩn đoán." });
      score += 8;
    }

    const monthChiIdx = (lunarMonth + 1) % 12;
    const dayChiIdx = CHI.indexOf(chiNgay);
    if ((dayChiIdx - monthChiIdx + 12) % 12 === 6) {
      list.push({ name: "Nguyệt Phá Thần Sát", type: "neg", score: -15, desc: "Xung khắc bản tháng, kiêng ca phẫu thuật nguy cơ cao." });
      score -= 15;
    }

    const canIdx = CAN.indexOf(canNgay);
    const khongVong1 = CHI[(dayChiIdx - canIdx + 10 + 12) % 12];
    const khongVong2 = CHI[(dayChiIdx - canIdx + 11 + 12) % 12];
    if (chiNgay === khongVong1 || chiNgay === khongVong2) {
      list.push({ name: "Không Vong Nhật", type: "neg", score: -10, desc: "Lực cản bất ngờ, cần rà soát lại kết quả xét nghiệm." });
      score -= 10;
    }

    return { list, score };
  }

  function calculateBiorhythms(birthDate, targetDate) {
    const diffMs = targetDate.getTime() - birthDate.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 100);
    const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 100);
    const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 100);
    const intuitive = Math.round(Math.sin((2 * Math.PI * days) / 38) * 100);

    const avg = Math.round((physical + emotional + intellectual + intuitive) / 4);

    let physBonus = 0, intBonus = 0, emoBonus = 0, intuitBonus = 0;
    const clinicalTips = [];

    if (physical >= 50) {
      physBonus = 3;
      clinicalTips.push(`💪 Thể lực sung mãn (+${physical}%): Phù hợp ca mổ kéo dài, ca trực đêm hay cấp cứu liên tục.`);
    } else if (physical <= -50) {
      physBonus = -2;
      clinicalTips.push(`⚠️ Thể lực suy giảm (${physical}%): Tránh thức khuya quá sức, tranh thủ nghỉ ngắn giữa ca.`);
    }

    if (intellectual >= 50) {
      intBonus = 3;
      clinicalTips.push(`🧠 Trí tuệ sáng suốt (+${intellectual}%): Thích hợp nghiên cứu EBM, chẩn đoán ca bệnh khó, phân tích ECG/CT.`);
    } else if (intellectual <= -50) {
      intBonus = -2;
      clinicalTips.push(`⚠️ Trí tuệ vùng trũng (${intellectual}%): Kiểm tra lại y lệnh & liều thuốc kháng sinh 2 lần trước khi duyệt.`);
    }

    if (emotional >= 50) {
      emoBonus = 2;
      clinicalTips.push(`❤️ Cảm xúc ổn định (+${emotional}%): Rất tốt để tư vấn bệnh nặng, giải thích người nhà với sự thấu cảm cao.`);
    } else if (emotional <= -50) {
      emoBonus = -2;
      clinicalTips.push(`⚠️ Cảm xúc nhạy cảm (${emotional}%): Giữ bình tĩnh, tránh xung đột truyền thông y tế.`);
    }

    if (intuitive >= 50) {
      intuitBonus = 3;
      clinicalTips.push(`🎯 Trực giác lâm sàng nhạy bén (+${intuitive}%): Linh cảm chẩn đoán sớm triệu chứng trở nặng, phản xạ cấp cứu nhạy.`);
    } else if (intuitive <= -50) {
      intuitBonus = -2;
      clinicalTips.push(`⚠️ Trực giác trầm lắng (${intuitive}%): Hãy bám sát cận lâm sàng & EBM, không nên dựa vào cảm tính.`);
    }

    return {
      daysLived: days,
      physical,
      emotional,
      intellectual,
      intuitive,
      avgScore: avg,
      physBonus,
      intBonus,
      emoBonus,
      intuitBonus,
      totalBioScore: physBonus + intBonus + emoBonus + intuitBonus,
      clinicalTips
    };
  }

  function calculateGioTimeline(chiNgay, currentHour) {
    const calcHour = currentHour !== undefined ? currentHour : new Date().getHours();
    const hoangDaoList = HOANG_DAO_MAP[chiNgay] || [];
    const dayChiIdx = CHI.indexOf(chiNgay);
    const startOffset = (dayChiIdx * 2) % 12;

    return CHI.map((chi, idx) => {
      const starIdx = (idx + startOffset) % 12;
      const star = GIO_THAN_SAT[starIdx] || GIO_THAN_SAT[0];
      const isHoangDao = hoangDaoList.includes(chi);

      let isCurrent = false;
      if (idx === 0) {
        isCurrent = calcHour >= 23 || calcHour < 1;
      } else {
        const startH = idx * 2 - 1;
        const endH = idx * 2 + 1;
        isCurrent = calcHour >= startH && calcHour < endH;
      }

      return {
        chi,
        timeRange: GIO_TIME[chi] || '',
        starName: star.name,
        isHoangDao,
        type: isHoangDao ? 'hoang_dao' : 'hac_dao',
        icon: isHoangDao ? '🌟' : '🌑',
        meaning: star.meaning,
        isCurrent
      };
    });
  }

  function evaluateClinicalAdvice(totalScore, truc, saoTu, bio, diaChi) {
    let surgery;
    if (totalScore >= 65 && ['Định', 'Thành', 'Khai', 'Kiến'].includes(truc.name) && saoTu.type === 'cat' && bio.physical >= 0) {
      surgery = { status: 'good', title: 'Phẫu thuật & Thủ thuật', text: 'Thời điểm rất tốt cho phẫu thuật chương trình và can thiệp xâm lấn.' };
    } else if (truc.type === 'hung' || saoTu.type === 'hung' || diaChi.lucXung.isMatch || bio.physical <= -50) {
      surgery = { status: 'caution', title: 'Phẫu thuật & Thủ thuật', text: 'Thận trọng với ca mổ nguy cơ cao; rà soát kỹ bảng kiểm chu phẫu (WHO checklist).' };
    } else {
      surgery = { status: 'neutral', title: 'Phẫu thuật & Thủ thuật', text: 'Mọi thủ thuật tiến hành bình thường theo đúng quy chuẩn an toàn.' };
    }

    let consultation;
    if (totalScore >= 60 && (bio.intellectual >= 20 || bio.intuitive >= 20 || diaChi.tamHop.isMatch)) {
      consultation = { status: 'good', title: 'Hội chẩn & Ca khó', text: 'Minh mẫn chẩn đoán, quý nhân trợ lực, hội chẩn liên chuyên khoa đạt đồng thuận cao.' };
    } else if (bio.intellectual <= -50) {
      consultation = { status: 'caution', title: 'Hội chẩn & Ca khó', text: 'Nên tham vấn thêm ý kiến bác sĩ tiền bối hoặc đối chiếu guideline EBM.' };
    } else {
      consultation = { status: 'neutral', title: 'Hội chẩn & Ca khó', text: 'Hội chẩn ổn định, phân tích kỹ các chỉ số cận lâm sàng.' };
    }

    let communication;
    if (bio.emotional >= 20 && !diaChi.lucHai.isMatch) {
      communication = { status: 'good', title: 'Giao tiếp & Tư vấn', text: 'Tâm thái thấu cảm, giải thích bệnh trình rõ ràng, thân nhân tin tưởng.' };
    } else if (diaChi.lucHai.isMatch || bio.emotional <= -40) {
      communication = { status: 'caution', title: 'Giao tiếp & Tư vấn', text: 'Cẩn trọng lời nói, áp dụng mô hình SPIKES khi báo tin xấu, tránh tranh luận.' };
    } else {
      communication = { status: 'neutral', title: 'Giao tiếp & Tư vấn', text: 'Giao tiếp bình thường, tuân thủ nguyên tắc y đức chuẩn.' };
    }

    let research;
    if (saoTu.name === 'Bích' || saoTu.name === 'Đẩu' || saoTu.name === 'Trương' || bio.intellectual >= 30) {
      research = { status: 'good', title: 'Nghiên cứu & Học tập', text: 'Tiếp thu EBM nhanh, thuận lợi viết báo cáo khoa học và cập nhật phác đồ mới.' };
    } else {
      research = { status: 'neutral', title: 'Nghiên cứu & Học tập', text: 'Duy trì đọc bài báo tổng quan và ôn lại ca lâm sàng hay.' };
    }

    return { surgery, consultation, communication, research };
  }

  function getDoctorProfile() {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Bác sĩ",
      gender: "Nam",
      birthDay: 15,
      birthMonth: 8,
      birthYear: 1990,
      birthHour: 8,
      birthMinute: 30,
      canNam: "Canh",
      chiNam: "Ngọ",
      hanhMenh: "Thổ"
    };
  }

  function saveDoctorProfile(profile) {
    const year = profile.birthYear || 1990;
    const canChi = getCanChiYear(year);
    const updated = {
      name: profile.name || "Bác sĩ",
      gender: profile.gender || "Nam",
      birthDay: Number(profile.birthDay) || 15,
      birthMonth: Number(profile.birthMonth) || 8,
      birthYear: year,
      birthHour: Number(profile.birthHour) || 8,
      birthMinute: Number(profile.birthMinute) || 0,
      canNam: canChi.can,
      chiNam: canChi.chi,
      hanhMenh: profile.hanhMenh || "Thổ"
    };
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  }

  function evaluateDayScore(dateObj = new Date(), customDoc) {
    const doc = customDoc || getDoctorProfile();
    const canChiDay = getCanChiDay(dateObj);
    const lunar = getApproxLunarDate(dateObj);

    const hanhNgay = NGU_HANH_CAN[canChiDay.can] || 'Thổ';
    const hanhNamSinh = NGU_HANH_CAN[doc.canNam] || 'Thổ';
    let b1 = { level: 3, text: "Bình hòa", score: 25 };
    if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhNamSinh) {
      b1 = { level: 1, text: "Can ngày sinh Can tuổi (Rất tốt)", score: 40 };
    } else if (HANH_SINH_KHAC.sinh[hanhNamSinh] === hanhNgay) {
      b1 = { level: 2, text: "Can tuổi sinh Can ngày (Khá tốt)", score: 32 };
    } else if (hanhNgay === hanhNamSinh) {
      b1 = { level: 3, text: "Can ngày đồng hành Can tuổi", score: 25 };
    } else if (HANH_SINH_KHAC.khac[hanhNamSinh] === hanhNgay) {
      b1 = { level: 4, text: "Can tuổi khắc Can ngày", score: 15 };
    } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhNamSinh) {
      b1 = { level: 5, text: "Can ngày khắc Can tuổi", score: 5 };
    }

    const hanhChi = NGU_HANH_CHI[canChiDay.chi] || 'Thổ';
    let canChiNgayScore = { level: 3, text: "Bình hòa", score: 0 };
    if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhChi) {
      canChiNgayScore = { level: 1, text: "Bảo Nhật (Can sinh Chi - Cát)", score: 12 };
    } else if (HANH_SINH_KHAC.sinh[hanhChi] === hanhNgay) {
      canChiNgayScore = { level: 2, text: "Thoa Nhật (Chi sinh Can - Khá)", score: 8 };
    } else if (hanhNgay === hanhChi) {
      canChiNgayScore = { level: 3, text: "Bát Chuyên (Đồng khí)", score: 4 };
    } else if (HANH_SINH_KHAC.khac[hanhChi] === hanhNgay) {
      canChiNgayScore = { level: 4, text: "Chế Nhật (Chi khắc Can - Thận trọng)", score: -8 };
    } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhChi) {
      canChiNgayScore = { level: 5, text: "Phạt Nhật (Can khắc Chi - Xấu)", score: -12 };
    }

    const diaChiRelations = kiemTraDiaChi(doc.chiNam, canChiDay.chi);
    const quyNhanLoc = kiemTraQuyNhanLoc(doc.canNam, canChiDay.can, canChiDay.chi);

    let b3Point = 0;
    const b3Detail = [];
    if (HANH_SINH_KHAC.sinh[hanhNgay] === doc.hanhMenh) {
      b3Point += 8;
      b3Detail.push("Hành ngày tương sinh Bản Mệnh (+8đ)");
    } else if (hanhNgay === doc.hanhMenh) {
      b3Point += 4;
      b3Detail.push("Hành ngày đồng hành Bản Mệnh (+4đ)");
    }

    const tamNuong = [3, 7, 13, 18, 22, 27];
    const tamCuong = [8, 18, 28];
    const nguyetKy = [5, 14, 23];
    const lucNhamCat = [6, 16, 26];
    const b4Errors = [];
    const b4Bonuses = [];
    let b4Penalty = 0;
    let b4BonusPoint = 0;

    if (tamNuong.includes(lunar.day)) { b4Errors.push("Phạm ngày Tam Nương (-15đ)"); b4Penalty += 15; }
    if (tamCuong.includes(lunar.day)) { b4Errors.push("Phạm ngày Tam Cường (-10đ)"); b4Penalty += 10; }
    if (nguyetKy.includes(lunar.day)) { b4Errors.push("Phạm ngày Nguyệt Kỵ (-12đ)"); b4Penalty += 12; }
    if (lunar.day === 1) { b4Errors.push("Mùng 1 đầu tháng (Sóc) (-4đ)"); b4Penalty += 4; }
    if (canChiDay.can === "Quý" && canChiDay.chi === "Hợi") { b4Errors.push("Ngày Quý Hợi (Cùng Cực) (-15đ)"); b4Penalty += 15; }
    if (lunar.day === 15) { b4Bonuses.push("Ngày Vọng (Trăng tròn đại cát) (+4đ)"); b4BonusPoint += 4; }
    if (lucNhamCat.includes(lunar.day)) { b4Bonuses.push("Ngày Lục Nhâm Cát (+5đ)"); b4BonusPoint += 5; }

    const saoTu = getSaoTu(dateObj, canChiDay.jdn);
    const trucNgay = getTrucNgay(lunar.month, canChiDay.chi);
    const tietKhiInfo = getTietKhiInfo(dateObj);
    const thanSat = kiemTraThanSat(lunar.month, canChiDay.can, canChiDay.chi);
    const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
    const bio = calculateBiorhythms(birthDate, dateObj);

    const basePoint = 20;
    const rawTotal = basePoint + b1.score + canChiNgayScore.score
                   + diaChiRelations.totalScore + quyNhanLoc.totalScore
                   + b3Point - b4Penalty + b4BonusPoint
                   + saoTu.score + trucNgay.score + tietKhiInfo.tietKhi.score
                   + (tietKhiInfo.tuLyTuTuyet ? tietKhiInfo.tuLyTuTuyet.score : 0)
                   + thanSat.score + bio.totalBioScore;

    const total = Math.round(Math.min(100, Math.max(0, rawTotal)));

    let rating = "Bình Hòa";
    let badgeClass = "day-rating-neutral";
    let icon = "⚖️";
    let summaryText = "Ngày cân bằng, mọi công việc lâm sàng diễn ra theo đúng quy trình chuẩn.";

    if (total >= 82) {
      rating = "Đại Cát";
      badgeClass = "day-rating-great";
      icon = "🌟";
      summaryText = `Đại cát hanh thông (${saoTu.name} Tinh & Trực ${trucNgay.name}): Thời điểm vàng phẫu thuật chương trình & hội chẩn EBM.`;
    } else if (total >= 65) {
      rating = "Cát Lành";
      badgeClass = "day-rating-good";
      icon = "✨";
      summaryText = `Khí tiết thuận hòa (${saoTu.name} Tinh): Năng lượng làm việc và độ tập trung chẩn đoán đạt hiệu suất cao.`;
    } else if (total >= 45) {
      rating = "Bình Hòa";
      badgeClass = "day-rating-neutral";
      icon = "⚖️";
      summaryText = `Trạng thái ổn định: Thích hợp tái khám, ra y lệnh định kỳ, rà soát hồ sơ & học tập EBM.`;
    } else if (total >= 25) {
      rating = "Thận Trọng";
      badgeClass = "day-rating-warn";
      icon = "⚠️";
      summaryText = `Có yếu tố khắc nhẹ hoặc khí tiết phân tán: Chú ý rà soát kỹ bảng kiểm an toàn và liều thuốc.`;
    } else {
      rating = "Đại Hung";
      badgeClass = "day-rating-bad";
      icon = "⛔";
      summaryText = `Phạm nhiều hung tinh / Lục xung: Kiêng mổ phiên nguy cơ cao, kiểm tra chéo y lệnh 2 lần.`;
    }

    const advice = evaluateClinicalAdvice(total, trucNgay, saoTu, bio, diaChiRelations);
    const hoangDaoList = HOANG_DAO_MAP[canChiDay.chi] || [];
    const hoangDaoHours = hoangDaoList.map(chi => `${chi} (${GIO_TIME[chi] || ''})`);
    const gioTimeline = calculateGioTimeline(canChiDay.chi, dateObj.getHours());

    const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    const formattedDate = dateObj.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

    return {
      total,
      rawTotal,
      rating,
      icon,
      badgeClass,
      summaryText,
      dateObj,
      dateKey,
      formattedDate,
      lunarDay: lunar.day,
      lunarMonth: lunar.month,
      canChiDay: canChiDay.full,
      canNgay: canChiDay.can,
      chiNgay: canChiDay.chi,
      hanhNgay,
      docProfile: doc,
      b1,
      canChiNgayScore,
      diaChiRelations,
      quyNhanLoc,
      b3: { point: b3Point, detail: b3Detail },
      b4: { errors: b4Errors, bonuses: b4Bonuses, penalty: b4Penalty, bonusPoint: b4BonusPoint },
      saoTu,
      trucNgay,
      tietKhiInfo,
      thanSat,
      bio,
      advice,
      hoangDaoHours,
      gioTimeline
    };
  }

  function getWeekEvaluation(startDate = new Date(), customDoc) {
    const doc = customDoc || getDoctorProfile();
    const weekList = [];
    const todayKey = new Date().toDateString();

    let highestScore = -1;
    let bestIndex = 0;

    for (let i = 0; i < 7; i++) {
      const d = new Date(startDate.getTime() + i * 86400000);
      const evalData = evaluateDayScore(d, doc);
      const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'short' });
      const dateFormatted = `${d.getDate()}/${d.getMonth() + 1}`;
      const lunarFormatted = `${evalData.lunarDay}/${evalData.lunarMonth} Âm`;

      if (evalData.total > highestScore) {
        highestScore = evalData.total;
        bestIndex = i;
      }

      weekList.push({
        date: d,
        dateKey: evalData.dateKey,
        dayOfWeek,
        dateFormatted,
        lunarFormatted,
        canChi: evalData.canChiDay,
        saoTu: evalData.saoTu.name,
        truc: evalData.trucNgay.name,
        score: evalData.total,
        rating: evalData.rating,
        badgeClass: evalData.badgeClass,
        icon: evalData.icon,
        isToday: d.toDateString() === todayKey,
        isBestDay: false,
        evalData
      });
    }

    if (weekList[bestIndex]) {
      weekList[bestIndex].isBestDay = true;
    }

    return weekList;
  }

  function findBestClinicalDays(purpose = 'surgery', daysAhead = 30, customDoc) {
    const doc = customDoc || getDoctorProfile();
    const today = new Date();
    const scoredDays = [];

    const purposeNames = {
      surgery: "Phẫu Thuật & Thủ Thuật Can Thiệp",
      clinic: "Khai Trương Phòng Khám / Tiếp Nhận Máy Mới",
      ebm: "Báo Cáo EBM & Nghiệm Thu Đề Tài",
      consultation: "Hội Chẩn Ca Khó & Ký Kết Hợp Đồng"
    };

    for (let i = 0; i < daysAhead; i++) {
      const d = new Date(today.getTime() + i * 86400000);
      const evalData = evaluateDayScore(d, doc);
      let matchScore = evalData.total;
      const matchReasons = [];

      if (purpose === 'surgery') {
        if (['Định', 'Thành', 'Khai', 'Kiến'].includes(evalData.trucNgay.name)) {
          matchScore += 15;
          matchReasons.push(`Trực ${evalData.trucNgay.name} (Đại cát khởi tạo & an định)`);
        }
        if (evalData.saoTu.type === 'cat') {
          matchScore += 10;
          matchReasons.push(`Sao ${evalData.saoTu.name} Tinh (Cát tinh hộ trì)`);
        }
        if (evalData.bio.physical >= 30) {
          matchScore += 8;
          matchReasons.push(`Biorhythm Thể lực sung sức (${evalData.bio.physical}%)`);
        }
        if (evalData.bio.intuitive >= 30) {
          matchScore += 8;
          matchReasons.push(`Trực giác lâm sàng nhạy bén (${evalData.bio.intuitive}%)`);
        }
      } else if (purpose === 'clinic') {
        if (evalData.quyNhanLoc.locThan.isMatch) {
          matchScore += 20;
          matchReasons.push("Đắc Lộc Thần (Tài lộc & y vụ thịnh vượng)");
        }
        if (['Khai', 'Kiến', 'Mãn'].includes(evalData.trucNgay.name)) {
          matchScore += 15;
          matchReasons.push(`Trực ${evalData.trucNgay.name} (Khai mở hanh thông)`);
        }
        if (evalData.thanSat.score > 0) {
          matchScore += 10;
          matchReasons.push("Được Thiên Đức / Nguyệt Đức chiếu rọi");
        }
      } else if (purpose === 'ebm') {
        if (['Bích', 'Trương', 'Đẩu', 'Cơ'].includes(evalData.saoTu.name)) {
          matchScore += 20;
          matchReasons.push(`Sao ${evalData.saoTu.name} (Văn chương y thuật & nghiên cứu đỗ đạt)`);
        }
        if (['Thâu', 'Thành', 'Mãn'].includes(evalData.trucNgay.name)) {
          matchScore += 15;
          matchReasons.push(`Trực ${evalData.trucNgay.name} (Nghiệm thu kết quả tốt đẹp)`);
        }
        if (evalData.bio.intellectual >= 30) {
          matchScore += 10;
          matchReasons.push(`Trí tuệ minh mẫn (${evalData.bio.intellectual}%)`);
        }
      } else if (purpose === 'consultation') {
        if (evalData.diaChiRelations.tamHop.isMatch) {
          matchScore += 20;
          matchReasons.push("Tam Hợp Cát Tinh (Đồng nghiệp & chuyên gia đồng lòng)");
        }
        if (evalData.quyNhanLoc.thienAt.isMatch) {
          matchScore += 15;
          matchReasons.push("Thiên Ất Quý Nhân (Gặp quý nhân tương trợ ca khó)");
        }
        if (evalData.diaChiRelations.lucHop.isMatch) {
          matchScore += 10;
          matchReasons.push("Lục Hợp hòa thuận, bệnh nhân tin tưởng");
        }
      }

      scoredDays.push({ evalData, matchScore, matchReasons });
    }

    scoredDays.sort((a, b) => b.matchScore - a.matchScore);
    const top5 = scoredDays.slice(0, 5);

    return top5.map((item, idx) => ({
      rank: idx + 1,
      purpose,
      purposeName: purposeNames[purpose] || "Lâm sàng",
      evalData: item.evalData,
      matchReasons: item.matchReasons,
      score: item.evalData.total
    }));
  }

  function getMonthEvaluation(year = new Date().getFullYear(), month = new Date().getMonth() + 1, customDoc) {
    const doc = customDoc || getDoctorProfile();
    const daysInMonth = new Date(year, month, 0).getDate();
    const result = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month - 1, d);
      result.push(evaluateDayScore(dateObj, doc));
    }

    return result;
  }

  function generateICSContent(evalData) {
    const d = evalData.dateObj;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dtStr = `${year}${month}${day}`;

    const hdText = evalData.hoangDaoHours.slice(0, 4).join(', ');
    const desc = `Điểm số: ${evalData.total}/100 (${evalData.rating})\\nCan Chi: ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})\\nSao: ${evalData.saoTu.name} • Trực: ${evalData.trucNgay.name}\\nGiờ Hoàng Đạo: ${hdText}\\n\\nKhuyến nghị: ${evalData.summaryText}`;

    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//CliniPortal//Clinical Date Intelligence//VI",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:cliniportal-${evalData.dateKey}@cliniportal.vn`,
      `DTSTAMP:${dtStr}T080000Z`,
      `DTSTART;VALUE=DATE:${dtStr}`,
      `DTEND;VALUE=DATE:${dtStr}`,
      `SUMMARY:🌟 [Ngày Tốt ${evalData.total}đ] ${evalData.canChiDay} - ${evalData.rating}`,
      `DESCRIPTION:${desc}`,
      "STATUS:CONFIRMED",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function downloadICSFile(evalData) {
    const content = generateICSContent(evalData);
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NgayTot_${evalData.dateKey}_CliniPortal.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function copyDaySummaryText(evalData) {
    const hdText = evalData.hoangDaoHours.join(' • ');
    const text = `🌟 [CLINIPORTAL] PHÂN TÍCH CHỈ SỐ NGÀY TỐT\n📅 Ngày: ${evalData.formattedDate}\n☯️ Bát tự: ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})\n🎯 Điểm số: ${evalData.total}/100 — ${evalData.rating} ${evalData.icon}\n✨ Nhị thập bát tú: Sao ${evalData.saoTu.name} (${evalData.saoTu.desc})\n📜 12 Trực: Trực ${evalData.trucNgay.name} (${evalData.trucNgay.desc})\n⏰ Giờ Hoàng Đạo: ${hdText}\n💡 Gợi ý y vụ: ${evalData.summaryText}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    return text;
  }

  function calculateShiftEnergy(dateObj = new Date()) {
    const h = dateObj.getHours();
    const doc = getDoctorProfile();
    const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
    const bio = calculateBiorhythms(birthDate, dateObj);

    let circVal = 75;
    let phase = "Ban ngày — Bình ổn";
    let peak = "08:30 - 11:30";
    let fatigue = null;
    let caffeine = "Bổ sung đủ nước (500ml), hạn chế caffeine sau 16:00.";

    if (h >= 8 && h < 12) {
      circVal = 92;
      phase = "Đỉnh Cao Buổi Sáng (Peak Focus)";
      peak = "08:30 - 11:30 (Khung giờ vàng phẫu thuật & đọc kết quả khó)";
      caffeine = "1 tách trà xanh hoặc cà phê sáng giúp tối ưu phản xạ.";
    } else if (h >= 12 && h < 14) {
      circVal = 62;
      phase = "Trầm Lắng Giữa Ngày (Post-Lunch Dip)";
      peak = "14:30 - 17:00";
      fatigue = "Sinh lý buồn ngủ tự nhiên sau ăn trưa, nên nghỉ ngơi 15-20 phút.";
      caffeine = "Tránh uống cà phê đặc ngay sau ăn, ưu tiên đi dạo nhẹ.";
    } else if (h >= 14 && h < 18) {
      circVal = 85;
      phase = "Hưng Phấn Chiều (Afternoon Surge)";
      peak = "15:00 - 17:30 (Thích hợp khám phòng khám & giao ban ca)";
      caffeine = "Uống nước ấm, vận động co giãn cơ bắp cổ vai gáy.";
    } else if (h >= 18 && h < 22) {
      circVal = 70;
      phase = "Ca Trực Tối (Evening Shift)";
      peak = "19:00 - 21:00 (Tiếp nhận phân loại cấp cứu)";
      caffeine = "Uống nước lọc, không dùng nước tăng lực kích thích mạnh.";
    } else {
      circVal = 50;
      phase = "Ca Đêm Sâu (Night Shift Window)";
      peak = "Duy trì trạng thái tỉnh táo an toàn";
      fatigue = "Khung giờ 02:00 - 05:00 là điểm đáy sinh học, chú ý kiểm tra chéo y lệnh cấp cứu.";
      caffeine = "Chợp mắt ngắn 15 phút (Power Nap) khi khoa phòng yên tĩnh.";
    }

    const bioMod = (bio.physical + bio.intellectual) / 10;
    const energyPercent = Math.min(99, Math.max(35, Math.round(circVal + bioMod)));

    let statusText = "Sung Sức";
    let icon = "⚡";
    if (energyPercent >= 85) {
      statusText = "Sung Sức";
      icon = "⚡";
    } else if (energyPercent >= 70) {
      statusText = "Sẵn Sàng";
      icon = "🔋";
    } else if (energyPercent >= 55) {
      statusText = "Vừa Phải";
      icon = "☕";
    } else {
      statusText = "Cần Nghỉ";
      icon = "🛌";
    }

    const safetyChecklist = [
      "✅ Kiểm tra định danh người bệnh (Họ tên + Năm sinh)",
      "✅ Đối chiếu thuốc 5 Đúng (Đúng thuốc, liều, đường dùng, giờ, bệnh nhân)",
      "✅ Ghi nhận sinh hiệu cảnh báo sớm (MEWS / NEWS2)",
      "✅ Tuân thủ bàn giao ca trực chuẩn SBAR"
    ];

    return {
      energyPercent,
      statusText,
      icon,
      circadianPhase: phase,
      peakHours: peak,
      fatigueWarning: fatigue,
      caffeineTip: caffeine,
      safetyChecklist
    };
  }

  const CLINICAL_PEARLS = [
    { topic: "Điện Giải", title: "Tăng Kali Máu & Biến Đổi ECG", text: "Sóng T cao nhọn đối xứng là dấu hiệu sớm nhất. Khi QRS giãn rộng hoặc mất sóng P, chỉ định Canxi Gluconate 10% ngay để ổn định màng cơ tim!" },
    { topic: "Kháng Sinh", title: "Quy Tắc Vàng Dùng Vancomycin", text: "Luôn lấy nồng độ đáy (trough level) ngay trước liều thứ 4. Mục tiêu AUC/MIC 400-600 để tối ưu diệt khuẩn và ngừa độc thận." },
    { topic: "Cấp Cứu", title: "Sốc Phản Vệ — Adrenaline Là Số 1", text: "Tiêm bắp Adrenaline 1:1000 (0.5mg ở người lớn) ngay mặt trước ngoài đùi. Không được trì hoãn vì kháng histamin hay corticoid!" },
    { topic: "Tim Mạch", title: "Phân Biệt Rung Nhĩ Nhanh vs Cuồng Nhĩ", text: "Nếu tần số thất đều chằn chặn 150 l/p, luôn nghĩ đến Cuồng nhĩ dẫn truyền 2:1 trước khi kết luận nhịp nhanh xoang." },
    { topic: "Hô Hấp", title: "Cơn Hen Phế Quản Ác Tính", text: "Dấu hiệu 'Lồng ngực im lặng' (Silent Chest) và khí máu có PaCO2 bình thường/tăng là báo động kiệt sức cơ hô hấp sắp ngừng thở!" }
  ];

  function getDailyClinicalPearl(dateObj = new Date()) {
    const jdn = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
    const idx = jdn % CLINICAL_PEARLS.length;
    return CLINICAL_PEARLS[idx] || CLINICAL_PEARLS[0];
  }

  function updateDayScoreBadge(now = new Date()) {
    const scoreBtn = document.getElementById('heroDayScoreBtn');
    const valEl = document.getElementById('heroDayScoreVal');
    const textEl = document.getElementById('heroDayScoreText');
    const iconEl = document.getElementById('heroDayScoreIcon');
    if (!scoreBtn || !valEl || !textEl) return;

    const evalData = evaluateDayScore(now);
    valEl.textContent = `${evalData.total}/100`;
    textEl.textContent = evalData.rating;
    if (iconEl) iconEl.textContent = evalData.icon;

    scoreBtn.className = `hero-day-score-badge ${evalData.badgeClass}`;
    scoreBtn.setAttribute('data-score', String(evalData.total));
  }

  function updateHeroEnergyBadge(now = new Date()) {
    const energyBtn = document.getElementById('heroEnergyScoreBtn');
    const valEl = document.getElementById('heroEnergyScoreVal');
    const textEl = document.getElementById('heroEnergyScoreText');
    const iconEl = document.getElementById('heroEnergyScoreIcon');
    if (!energyBtn || !valEl || !textEl) return;

    const energy = calculateShiftEnergy(now);
    valEl.textContent = `${energy.energyPercent}%`;
    textEl.textContent = energy.statusText;
    if (iconEl) iconEl.textContent = energy.icon;
  }

  function openDayScoreModal(targetDate = new Date(), activeTab = 'day') {
    const evalData = evaluateDayScore(targetDate);
    const weekData = getWeekEvaluation(new Date());
    const doc = evalData.docProfile;

    const currentYear = targetDate.getFullYear();
    const currentMonth = targetDate.getMonth() + 1;
    const monthData = getMonthEvaluation(currentYear, currentMonth, doc);
    const bestSurgeryDays = findBestClinicalDays('surgery', 30, doc);

    const existing = document.getElementById('dayScoreModalOverlay');
    if (existing) existing.remove();

    const truc = evalData.trucNgay;
    const tiet = evalData.tietKhiInfo;
    const than = evalData.thanSat;
    const sao = evalData.saoTu;
    const diaChi = evalData.diaChiRelations;
    const quyNhan = evalData.quyNhanLoc;

    const modalHtml = `
      <div class="day-score-modal-overlay" id="dayScoreModalOverlay" style="position: fixed; inset: 0; background: rgba(15,23,42,0.72); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 0.75rem;">
        <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1.15rem; width: 100%; max-width: 860px; max-height: 94vh; overflow-y: auto; box-shadow: 0 25px 40px -5px rgba(0,0,0,0.35); padding: 1.4rem; display: flex; flex-direction: column;">
          
          <div class="modal-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.75rem;">
            <div>
              <span style="font-size: 0.72rem; font-weight: 800; color: var(--color-primary, #0284c7); text-transform: uppercase; letter-spacing: 0.06em;">☯ THUẬT TOÁN Y KHOA & CÁT HUNG NHẬT HẠN</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0.15rem 0 0 0; color: var(--color-text, #0f172a);">Chỉ Số Ngày Tốt & Hoạch Định Lịch Trình Y Khoa</h3>
            </div>
            <button class="modal-close-btn" id="closeDayScoreModal" style="background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1;" title="Đóng">&times;</button>
          </div>

          <div class="modal-tab-bar" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.15rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.5rem;">
            <button type="button" class="score-tab-btn" id="tabBtnDay" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'day' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'day' ? '#fff' : 'var(--color-text, #334155)'};">
              📅 Chi Tiết Ngày
            </button>
            <button type="button" class="score-tab-btn" id="tabBtnWeek" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'week' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'week' ? '#fff' : 'var(--color-text, #334155)'};">
              📊 Dự Báo 7 Ngày
            </button>
            <button type="button" class="score-tab-btn" id="tabBtnFinder" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'finder' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'finder' ? '#fff' : 'var(--color-text, #334155)'};">
              🎯 Tìm Ngày Đẹp Y Khoa
            </button>
            <button type="button" class="score-tab-btn" id="tabBtnMonth" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'month' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'month' ? '#fff' : 'var(--color-text, #334155)'};">
              🗓️ Lịch Tháng Heatmap
            </button>
            <button type="button" class="score-tab-btn" id="tabBtnProfile" style="padding: 0.45rem 0.8rem; border-radius: 0.5rem; font-size: 0.82rem; font-weight: 700; border: none; cursor: pointer; background: ${activeTab === 'profile' ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)'}; color: ${activeTab === 'profile' ? '#fff' : 'var(--color-text, #334155)'}; margin-left: auto;">
              ⚙️ Hồ Sơ Bác Sĩ
            </button>
          </div>

          <!-- TAB 1: CHI TIẾT NGÀY -->
          <div id="tabContentDay" style="display: ${activeTab === 'day' ? 'flex' : 'none'}; flex-direction: column; gap: 1.15rem;">
            <div class="score-summary-banner ${evalData.badgeClass}" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.85rem; border: 1px solid var(--color-border, #e2e8f0);">
              <div class="score-gauge-wrap" style="position: relative; width: 84px; height: 84px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <svg style="width: 100%; height: 100%; transform: rotate(-90deg);" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-border, #e2e8f0)" stroke-width="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-primary, #0284c7)" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="${264 - (264 * evalData.total) / 100}" stroke-linecap="round" />
                </svg>
                <div style="position: absolute; text-align: center;">
                  <span style="font-size: 1.35rem; font-weight: 800; color: var(--color-text, #0f172a);">${evalData.total}</span>
                  <span style="font-size: 0.65rem; color: var(--color-text-muted, #64748b); display: block; margin-top: -3px;">/100</span>
                </div>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 0.35rem;">
                  <div style="display: flex; align-items: center; gap: 0.4rem;">
                    <span style="font-size: 0.8rem; font-weight: 700; padding: 0.2rem 0.65rem; border-radius: 1rem; background: var(--color-primary, #0284c7); color: #fff;">
                      ${evalData.icon} ${evalData.rating}
                    </span>
                    <span style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Sao <strong>${sao.name}</strong> (${sao.type === 'cat' ? '✨ Cát' : '⚠️ Hung'}) • Trực <strong>${truc.name}</strong></span>
                  </div>
                  <div style="display: flex; gap: 0.35rem;">
                    <button type="button" id="btnExportICS" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 700; border-radius: 0.35rem; border: 1px solid var(--color-primary, #0284c7); background: rgba(2,132,199,0.1); color: var(--color-primary, #0284c7); cursor: pointer;">
                      📅 Xuất iCal
                    </button>
                    <button type="button" id="btnCopySummary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 700; border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                      📋 Sao chép
                    </button>
                  </div>
                </div>
                <h4 style="margin: 0 0 0.25rem 0; font-size: 1.1rem; font-weight: 800; color: var(--color-text, #0f172a);">
                  ${evalData.formattedDate} — Ngày ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})
                </h4>
                <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.45;">${evalData.summaryText}</p>
                <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--color-text, #0f172a); display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;">
                  <span>👨‍⚕️ <strong>${doc.name || 'Bác sĩ'}</strong> (${doc.gender || 'Nam'}) — Tuổi ${doc.canNam} ${doc.chiNam} (Mệnh ${doc.hanhMenh})</span>
                  ${quyNhan.thienAt.isMatch ? `<span style="background: rgba(16,185,129,0.15); color: #059669; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700;">🌟 Thiên Ất Quý Nhân</span>` : ''}
                  ${diaChi.tamHop.isMatch ? `<span style="background: rgba(2,132,199,0.15); color: #0284c7; padding: 0.1rem 0.4rem; border-radius: 4px; font-weight: 700;">✨ Tam Hợp Cát</span>` : ''}
                </div>
              </div>
            </div>

            <!-- 4 Khuyến Nghị Hành Động Lâm Sàng -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 0.65rem;">
              <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.surgery.status === 'good' ? '#059669' : (evalData.advice.surgery.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem;">
                  🔪 ${evalData.advice.surgery.title}
                </div>
                <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.surgery.text}</p>
              </div>
              <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.consultation.status === 'good' ? '#059669' : 'var(--color-text, #0f172a)'}; margin-bottom: 0.2rem;">
                  🔬 ${evalData.advice.consultation.title}
                </div>
                <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.consultation.text}</p>
              </div>
              <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.communication.status === 'good' ? '#059669' : (evalData.advice.communication.status === 'caution' ? '#d97706' : 'var(--color-text, #0f172a)')}; margin-bottom: 0.2rem;">
                  💬 ${evalData.advice.communication.title}
                </div>
                <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.communication.text}</p>
              </div>
              <div style="padding: 0.75rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.8rem; font-weight: 700; color: ${evalData.advice.research.status === 'good' ? '#059669' : 'var(--color-text, #0f172a)'}; margin-bottom: 0.2rem;">
                  📚 ${evalData.advice.research.title}
                </div>
                <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">${evalData.advice.research.text}</p>
              </div>
            </div>

            <!-- Timeline 12 Khung Giờ Real-Time -->
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.85rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                <span><i class="fa-solid fa-clock-rotate-left" style="color: var(--color-primary, #0284c7);"></i> Timeline 12 Khung Giờ & Thần Sát (Cát/Hắc Đạo):</span>
                <span style="font-size: 0.72rem; color: #10b981; font-weight: 700;">🟢 Khung giờ phát sáng = Giờ hiện tại</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(125px, 1fr)); gap: 0.4rem;">
                ${evalData.gioTimeline.map(g => `
                  <div style="padding: 0.4rem 0.5rem; border-radius: 0.4rem; border: 1px solid ${g.isCurrent ? '#10b981' : 'var(--color-border, #e2e8f0)'}; background: ${g.isCurrent ? 'rgba(16,185,129,0.12)' : (g.isHoangDao ? 'rgba(2,132,199,0.05)' : 'var(--color-surface, #fff)')}; position: relative; ${g.isCurrent ? 'box-shadow: 0 0 0 2px rgba(16,185,129,0.4);' : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 0.75rem; font-weight: 800; color: var(--color-text, #0f172a);">Giờ ${g.chi}</span>
                      <span style="font-size: 0.65rem; font-weight: 700; color: ${g.isHoangDao ? '#059669' : '#94a3b8'};">${g.isHoangDao ? '🌟 Hoàng Đạo' : '🌑 Hắc Đạo'}</span>
                    </div>
                    <div style="font-size: 0.68rem; color: var(--color-text-muted, #64748b);">${g.timeRange}</div>
                    <div style="font-size: 0.7rem; font-weight: 700; color: ${g.isHoangDao ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; margin-top: 0.15rem;" title="${g.meaning}">
                      ${g.starName}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Bát Tự & 28 Sao Tú & Tiết Khí -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem;">
              <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">NHỊ THẬP BÁT TÚ</span>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">
                  Sao ${sao.name} (${sao.element} ${sao.animal}) — ${sao.type === 'cat' ? '<span style="color:#10b981;">Cát Tinh</span>' : '<span style="color:#ef4444;">Hung Tinh</span>'}
                </div>
                <p style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.35;">${sao.desc}</p>
              </div>
              <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">12 TRỰC NGÀY</span>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">Trực ${truc.name} (${truc.rating})</div>
                <p style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.35;">${truc.desc}</p>
              </div>
              <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
                <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">TIẾT KHÍ KHÍ HẬU</span>
                <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">${tiet.tietKhi.icon} Tiết ${tiet.tietKhi.name}</div>
                <p style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.35;">Cát khí mùa: +${tiet.tietKhi.score}đ ${tiet.tuLyTuTuyet ? ` | <strong style="color:#ef4444;">⚠️ ${tiet.tuLyTuTuyet.name}</strong>` : ''}</p>
              </div>
            </div>

            <!-- Biorhythms 4 Trục -->
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-weight: 800; font-size: 0.85rem; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                <span><i class="fa-solid fa-heart-pulse" style="color: #ef4444;"></i> Nhịp Sinh Học 4 Trục (${evalData.bio.daysLived} ngày tuổi):</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">TB: ${evalData.bio.avgScore}%</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; text-align: center;">
                <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                  <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">💪 Thể lực</div>
                  <div style="font-weight: 800; font-size: 0.95rem; color: #10b981;">${evalData.bio.physical}%</div>
                </div>
                <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                  <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">🧠 Trí tuệ</div>
                  <div style="font-weight: 800; font-size: 0.95rem; color: #8b5cf6;">${evalData.bio.intellectual}%</div>
                </div>
                <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                  <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">❤️ Cảm xúc</div>
                  <div style="font-weight: 800; font-size: 0.95rem; color: #0284c7;">${evalData.bio.emotional}%</div>
                </div>
                <div style="padding: 0.4rem 0.2rem; background: var(--color-surface, #fff); border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0);">
                  <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">🎯 Trực giác</div>
                  <div style="font-weight: 800; font-size: 0.95rem; color: #f59e0b;">${evalData.bio.intuitive}%</div>
                </div>
              </div>
              ${evalData.bio.clinicalTips.length > 0 ? `
                <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--color-text, #0f172a);">
                  ${evalData.bio.clinicalTips.map(tip => `<div style="margin-top: 0.2rem;">${tip}</div>`).join('')}
                </div>
              ` : ''}
            </div>

          </div>

          <!-- TAB 2: DỰ BÁO 7 NGÀY -->
          <div id="tabContentWeek" style="display: ${activeTab === 'week' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
            <div style="padding: 0.75rem 1rem; background: rgba(2,132,199,0.08); border-radius: 0.6rem; border: 1px solid rgba(2,132,199,0.25); display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span style="font-weight: 800; font-size: 0.9rem; color: var(--color-primary, #0284c7);">📊 DỰ BÁO NHẬT HẠN 7 NGÀY LIÊN TIẾP</span>
                <p style="margin: 0.15rem 0 0 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b);">Click vào bất kỳ thẻ ngày nào bên dưới để mở phân tích chi tiết cho ngày đó.</p>
              </div>
            </div>

            <div class="week-forecast-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 0.5rem;">
              ${weekData.map((item) => `
                <div class="week-forecast-card ${item.badgeClass} ${item.isToday ? 'is-today' : ''} ${item.isBestDay ? 'is-best-day' : ''}" 
                     data-date-str="${item.date.toISOString()}"
                     style="padding: 0.75rem 0.5rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid ${item.isToday ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; cursor: pointer; text-align: center; position: relative; transition: all 0.2s ease;">
                  
                  ${item.isBestDay ? `<span style="position: absolute; top: -8px; right: -4px; background: #f59e0b; color: #fff; font-size: 0.6rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">🌟 TỐT NHẤT</span>` : ''}
                  ${item.isToday ? `<span style="position: absolute; top: -8px; left: -4px; background: var(--color-primary, #0284c7); color: #fff; font-size: 0.6rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 10px;">HÔM NAY</span>` : ''}

                  <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">${item.dayOfWeek}</div>
                  <div style="font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0.1rem 0;">${item.dateFormatted}</div>
                  <div style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">${item.lunarFormatted}</div>
                  
                  <div style="margin: 0.5rem 0 0.3rem 0; font-size: 1.25rem; font-weight: 900; color: var(--color-text, #0f172a);">
                    ${item.score}<span style="font-size: 0.65rem; font-weight: 600; color: var(--color-text-muted, #64748b);">/100</span>
                  </div>
                  
                  <div style="font-size: 0.72rem; font-weight: 700; padding: 0.15rem 0.3rem; border-radius: 4px; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${item.icon} ${item.rating}
                  </div>

                  <div style="margin-top: 0.4rem; font-size: 0.68rem; color: var(--color-text-muted, #64748b); line-height: 1.2;">
                    <div>${item.canChi}</div>
                    <div>Sao <strong>${item.saoTu}</strong> • Trực <strong>${item.truc}</strong></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TAB 3: BỘ TÌM NGÀY ĐẸP Y KHOA -->
          <div id="tabContentFinder" style="display: ${activeTab === 'finder' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
            <div style="padding: 1rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.6rem; border: 1px solid var(--color-border, #e2e8f0);">
              <label style="font-weight: 800; font-size: 0.9rem; display: block; margin-bottom: 0.5rem; color: var(--color-primary, #0284c7);">
                🎯 Chọn Mục Đích Cần Tìm Ngày Đẹp (Quét 30 Ngày Tới):
              </label>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;" id="purposeSelectorWrap">
                <button type="button" class="purpose-filter-btn active" data-purpose="surgery" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-primary, #0284c7); background: var(--color-primary, #0284c7); color: #fff; cursor: pointer;">
                  🔪 Phẫu Thuật & Mổ Phiên
                </button>
                <button type="button" class="purpose-filter-btn" data-purpose="clinic" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                  🏥 Khai Trương / Tiếp Nhận Máy
                </button>
                <button type="button" class="purpose-filter-btn" data-purpose="ebm" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                  🎓 Báo Cáo EBM & Luận Án
                </button>
                <button type="button" class="purpose-filter-btn" data-purpose="consultation" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; font-weight: 700; border-radius: 0.4rem; border: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); color: var(--color-text, #334155); cursor: pointer;">
                  🤝 Hội Chẩn & Ký Hợp Đồng
                </button>
              </div>
            </div>

            <div id="bestDaysContainer" style="display: flex; flex-direction: column; gap: 0.65rem;">
              ${bestSurgeryDays.map((item) => `
                <div class="week-forecast-card ${item.evalData.badgeClass}" 
                     data-date-str="${item.evalData.dateObj.toISOString()}"
                     style="padding: 0.85rem 1rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; gap: 1rem; cursor: pointer;">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.4rem; font-weight: 900; color: ${item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#94a3b8' : '#b45309')};">
                      #${item.rank}
                    </span>
                    <div>
                      <h4 style="margin: 0 0 0.15rem 0; font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
                        ${item.evalData.formattedDate} — Ngày ${item.evalData.canChiDay}
                      </h4>
                      <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">
                        ${item.matchReasons.join(' • ')}
                      </div>
                    </div>
                  </div>
                  <div style="text-align: right; flex-shrink: 0;">
                    <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-text, #0f172a);">${item.evalData.total}đ</div>
                    <span style="font-size: 0.72rem; font-weight: 700; color: #059669;">${item.evalData.icon} ${item.evalData.rating}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TAB 4: LỊCH THÁNG HEATMAP -->
          <div id="tabContentMonth" style="display: ${activeTab === 'month' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 800; font-size: 0.95rem; color: var(--color-text, #0f172a);">
                🗓️ Tháng ${currentMonth} Năm ${currentYear} (Toàn Cảnh Nhật Hạn)
              </span>
              <div style="display: flex; gap: 0.5rem; font-size: 0.72rem; font-weight: 700;">
                <span style="color: #059669;">🟢 Đại Cát (≥82)</span>
                <span style="color: #0284c7;">🔵 Cát Lành (≥65)</span>
                <span style="color: #64748b;">⚪ Bình Hòa (≥45)</span>
                <span style="color: #d97706;">🟠 Thận Trọng</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.35rem;">
              ${['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(w => `
                <div style="font-size: 0.72rem; font-weight: 800; color: var(--color-text-muted, #64748b); text-align: center; padding: 0.2rem 0;">${w}</div>
              `).join('')}
              ${monthData.map(d => {
                const dayNum = d.dateObj.getDate();
                const isToday = d.dateObj.toDateString() === new Date().toDateString();
                return `
                  <div class="week-forecast-card ${d.badgeClass} ${isToday ? 'is-today' : ''}" 
                       data-date-str="${d.dateObj.toISOString()}"
                       style="padding: 0.4rem 0.2rem; border-radius: 0.4rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid ${isToday ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; cursor: pointer; text-align: center;">
                    <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text, #0f172a);">${dayNum}</div>
                    <div style="font-size: 0.65rem; color: var(--color-text-muted, #64748b);">${d.lunarDay}/${d.lunarMonth}</div>
                    <div style="font-size: 0.75rem; font-weight: 800; color: ${d.total >= 82 ? '#059669' : (d.total >= 65 ? '#0284c7' : (d.total >= 45 ? '#64748b' : '#d97706'))}; margin-top: 0.1rem;">
                      ${d.total}đ
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- TAB 5: HỒ SƠ BÁC SĨ -->
          <div id="tabContentProfile" style="display: ${activeTab === 'profile' ? 'flex' : 'none'}; flex-direction: column; gap: 1rem;">
            <div style="padding: 1rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.6rem;">
              <label style="font-weight: 800; font-size: 0.9rem; display: block; margin-bottom: 0.6rem; color: var(--color-primary, #0284c7);">
                ⚙️ Cấu Hình Thông Tin Bác Sĩ (Cá Nhân Hóa Bát Tự & Biorhythms):
              </label>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.65rem;">
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Họ tên:</span>
                  <input type="text" id="inputDocName" value="${doc.name || 'Bác sĩ'}" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                </div>
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Giới tính:</span>
                  <select id="selectDocGender" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                    <option value="Nam" ${doc.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                    <option value="Nữ" ${doc.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                  </select>
                </div>
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Năm sinh:</span>
                  <input type="number" id="inputDocYear" value="${doc.birthYear || 1990}" min="1930" max="2030" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                </div>
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Tháng sinh:</span>
                  <input type="number" id="inputDocMonth" value="${doc.birthMonth || 8}" min="1" max="12" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                </div>
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Ngày sinh:</span>
                  <input type="number" id="inputDocDay" value="${doc.birthDay || 15}" min="1" max="31" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                </div>
                <div>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Bản mệnh:</span>
                  <select id="selectDocHanhMenh" style="width: 100%; padding: 0.4rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; background: var(--color-surface, #fff); color: var(--color-text, #0f172a);">
                    <option value="Kim" ${doc.hanhMenh === 'Kim' ? 'selected' : ''}>Mệnh Kim ⚙️</option>
                    <option value="Mộc" ${doc.hanhMenh === 'Mộc' ? 'selected' : ''}>Mệnh Mộc 🌿</option>
                    <option value="Thủy" ${doc.hanhMenh === 'Thủy' ? 'selected' : ''}>Mệnh Thủy 🌊</option>
                    <option value="Hỏa" ${doc.hanhMenh === 'Hỏa' ? 'selected' : ''}>Mệnh Hỏa 🔥</option>
                    <option value="Thổ" ${doc.hanhMenh === 'Thổ' ? 'selected' : ''}>Mệnh Thổ 🏔️</option>
                  </select>
                </div>
              </div>
              <div style="margin-top: 1rem; text-align: right;">
                <button type="button" id="btnSaveDocProfile" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.5rem 1.2rem; font-size: 0.85rem; font-weight: 700; border-radius: 0.4rem; cursor: pointer;">
                  💾 Lưu Hồ Sơ & Cập Nhật Điểm
                </button>
              </div>
            </div>
          </div>

          <div class="modal-card-footer" style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);">28 Sao Tú, Tam Hợp, Quý Nhân, Timeline 12 Giờ & Biorhythms 4 Trục</span>
            <button class="btn btn-primary" id="btnCloseDayScoreModalBottom" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.45rem 1.1rem; border-radius: 0.4rem; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
              Đóng
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById('dayScoreModalOverlay');
    const closeBtn = document.getElementById('closeDayScoreModal');
    const closeBottom = document.getElementById('btnCloseDayScoreModalBottom');
    
    const tabBtnDay = document.getElementById('tabBtnDay');
    const tabBtnWeek = document.getElementById('tabBtnWeek');
    const tabBtnFinder = document.getElementById('tabBtnFinder');
    const tabBtnMonth = document.getElementById('tabBtnMonth');
    const tabBtnProfile = document.getElementById('tabBtnProfile');

    const tabContentDay = document.getElementById('tabContentDay');
    const tabContentWeek = document.getElementById('tabContentWeek');
    const tabContentFinder = document.getElementById('tabContentFinder');
    const tabContentMonth = document.getElementById('tabContentMonth');
    const tabContentProfile = document.getElementById('tabContentProfile');

    const btnExportICS = document.getElementById('btnExportICS');
    const btnCopySummary = document.getElementById('btnCopySummary');
    const btnSaveProfile = document.getElementById('btnSaveDocProfile');

    const closeModal = () => { if (overlay) overlay.remove(); };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBottom) closeBottom.addEventListener('click', closeModal);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    if (btnExportICS) btnExportICS.addEventListener('click', () => downloadICSFile(evalData));
    if (btnCopySummary) {
      btnCopySummary.addEventListener('click', () => {
        copyDaySummaryText(evalData);
        btnCopySummary.textContent = "✅ Đã chép!";
        setTimeout(() => { btnCopySummary.textContent = "📋 Sao chép"; }, 2000);
      });
    }

    const switchTab = (tab) => {
      if (tabContentDay) tabContentDay.style.display = tab === 'day' ? 'flex' : 'none';
      if (tabContentWeek) tabContentWeek.style.display = tab === 'week' ? 'flex' : 'none';
      if (tabContentFinder) tabContentFinder.style.display = tab === 'finder' ? 'flex' : 'none';
      if (tabContentMonth) tabContentMonth.style.display = tab === 'month' ? 'flex' : 'none';
      if (tabContentProfile) tabContentProfile.style.display = tab === 'profile' ? 'flex' : 'none';

      const setBtnStyle = (btn, isActive) => {
        if (!btn) return;
        btn.style.background = isActive ? 'var(--color-primary, #0284c7)' : 'var(--color-surface-offset, #f1f5f9)';
        btn.style.color = isActive ? '#fff' : 'var(--color-text, #334155)';
      };

      setBtnStyle(tabBtnDay, tab === 'day');
      setBtnStyle(tabBtnWeek, tab === 'week');
      setBtnStyle(tabBtnFinder, tab === 'finder');
      setBtnStyle(tabBtnMonth, tab === 'month');
      setBtnStyle(tabBtnProfile, tab === 'profile');
    };

    if (tabBtnDay) tabBtnDay.addEventListener('click', () => switchTab('day'));
    if (tabBtnWeek) tabBtnWeek.addEventListener('click', () => switchTab('week'));
    if (tabBtnFinder) tabBtnFinder.addEventListener('click', () => switchTab('finder'));
    if (tabBtnMonth) tabBtnMonth.addEventListener('click', () => switchTab('month'));
    if (tabBtnProfile) tabBtnProfile.addEventListener('click', () => switchTab('profile'));

    const purposeBtns = overlay ? overlay.querySelectorAll('.purpose-filter-btn') : [];
    const bestDaysContainer = document.getElementById('bestDaysContainer');
    purposeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        purposeBtns.forEach(b => {
          b.style.background = 'var(--color-surface, #fff)';
          b.style.color = 'var(--color-text, #334155)';
          b.style.borderColor = 'var(--color-border, #e2e8f0)';
        });
        btn.style.background = 'var(--color-primary, #0284c7)';
        btn.style.color = '#fff';
        btn.style.borderColor = 'var(--color-primary, #0284c7)';

        const p = btn.getAttribute('data-purpose');
        const found = findBestClinicalDays(p, 30, doc);

        if (bestDaysContainer) {
          bestDaysContainer.innerHTML = found.map(item => `
            <div class="week-forecast-card ${item.evalData.badgeClass}" 
                 data-date-str="${item.evalData.dateObj.toISOString()}"
                 style="padding: 0.85rem 1rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; gap: 1rem; cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.4rem; font-weight: 900; color: ${item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#94a3b8' : '#b45309')};">
                  #${item.rank}
                </span>
                <div>
                  <h4 style="margin: 0 0 0.15rem 0; font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
                    ${item.evalData.formattedDate} — Ngày ${item.evalData.canChiDay}
                  </h4>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">
                    ${item.matchReasons.join(' • ')}
                  </div>
                </div>
              </div>
              <div style="text-align: right; flex-shrink: 0;">
                <div style="font-size: 1.25rem; font-weight: 900; color: var(--color-text, #0f172a);">${item.evalData.total}đ</div>
                <span style="font-size: 0.72rem; font-weight: 700; color: #059669;">${item.evalData.icon} ${item.evalData.rating}</span>
              </div>
            </div>
          `).join('');

          bestDaysContainer.querySelectorAll('.week-forecast-card').forEach(card => {
            card.addEventListener('click', () => {
              const dateStr = card.getAttribute('data-date-str');
              if (dateStr) {
                closeModal();
                openDayScoreModal(new Date(dateStr), 'day');
              }
            });
          });
        }
      });
    });

    const allCards = overlay ? overlay.querySelectorAll('.week-forecast-card') : [];
    allCards.forEach(card => {
      card.addEventListener('click', () => {
        const dateStr = card.getAttribute('data-date-str');
        if (dateStr) {
          closeModal();
          openDayScoreModal(new Date(dateStr), 'day');
        }
      });
    });

    if (btnSaveProfile) {
      btnSaveProfile.addEventListener('click', () => {
        const name = document.getElementById('inputDocName') ? document.getElementById('inputDocName').value.trim() : 'Bác sĩ';
        const gender = document.getElementById('selectDocGender') ? document.getElementById('selectDocGender').value : 'Nam';
        const birthYear = parseInt(document.getElementById('inputDocYear') ? document.getElementById('inputDocYear').value : 1990, 10);
        const birthMonth = parseInt(document.getElementById('inputDocMonth') ? document.getElementById('inputDocMonth').value : 8, 10);
        const birthDay = parseInt(document.getElementById('inputDocDay') ? document.getElementById('inputDocDay').value : 15, 10);
        const hanhMenh = document.getElementById('selectDocHanhMenh') ? document.getElementById('selectDocHanhMenh').value : 'Thổ';

        saveDoctorProfile({ name, gender, birthYear, birthMonth, birthDay, hanhMenh });
        closeModal();
        updateDayScoreBadge();
        updateHeroEnergyBadge();
        openDayScoreModal(targetDate, 'day');
      });
    }
  }

  function openEnergyModal() {
    const now = new Date();
    const energy = calculateShiftEnergy(now);
    const pearl = getDailyClinicalPearl(now);

    const existing = document.getElementById('energyModalOverlay');
    if (existing) existing.remove();

    const modalHtml = `
      <div class="day-score-modal-overlay" id="energyModalOverlay" style="position: fixed; inset: 0; background: rgba(15,23,42,0.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;">
        <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1.1rem; width: 100%; max-width: 640px; max-height: 90vh; overflow-y: auto; box-shadow: 0 25px 35px -5px rgba(0,0,0,0.3); padding: 1.4rem; display: flex; flex-direction: column; gap: 1.1rem;">
          
          <div class="modal-card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.75rem;">
            <div>
              <span style="font-size: 0.72rem; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.06em;">⚡ CHỈ SỐ SẴN SÀNG LÂM SÀNG & CA TRỰC</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0.15rem 0 0 0; color: var(--color-text, #0f172a);">
                Mức Năng Lượng & Nhịp Sinh Học Circadian
              </h3>
            </div>
            <button class="modal-close-btn" id="closeEnergyModal" style="background: none; border: none; font-size: 1.8rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1;" title="Đóng">&times;</button>
          </div>

          <div style="display: flex; align-items: center; gap: 1.25rem; padding: 1.1rem; background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(2,132,199,0.08)); border-radius: 0.85rem; border: 1px solid rgba(245,158,11,0.25);">
            <div style="font-size: 2.75rem; text-align: center; line-height: 1;">
              ${energy.icon}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.4rem; font-weight: 900; color: #d97706;">${energy.energyPercent}%</span>
                <span style="font-size: 0.85rem; font-weight: 800; padding: 0.15rem 0.6rem; border-radius: 1rem; background: #f59e0b; color: #fff;">${energy.statusText}</span>
              </div>
              <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text, #0f172a); margin-top: 0.2rem;">
                Pha Sinh Học: ${energy.circadianPhase}
              </div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); margin-top: 0.15rem;">
                🎯 Khung giờ vàng tập trung: <strong>${energy.peakHours}</strong>
              </div>
            </div>
          </div>

          ${energy.fatigueWarning ? `
            <div style="padding: 0.75rem 1rem; border-radius: 0.6rem; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25); font-size: 0.82rem; color: #dc2626; display: flex; align-items: center; gap: 0.5rem;">
              <span>⚠️</span> <span>${energy.fatigueWarning}</span>
            </div>
          ` : ''}

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.35rem;">
                ☕ Khuyến Nghị Nạp Năng Lượng:
              </div>
              <p style="margin: 0; font-size: 0.78rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${energy.caffeineTip}</p>
            </div>
            <div style="padding: 0.85rem; border-radius: 0.6rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <div style="font-size: 0.8rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.35rem;">
                📋 Bảng Kiểm An Toàn Ca Trực:
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); line-height: 1.35;">
                ${energy.safetyChecklist.map(item => `<div>${item}</div>`).join('')}
              </div>
            </div>
          </div>

          <div style="padding: 1rem; border-radius: 0.75rem; background: linear-gradient(135deg, rgba(2,132,199,0.08), rgba(99,102,241,0.08)); border: 1px solid rgba(2,132,199,0.3);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.35rem;">
              <span style="font-size: 0.72rem; font-weight: 800; color: var(--color-primary, #0284c7); text-transform: uppercase;">
                💡 CLINICAL PEARL TRONG NGÀY [${pearl.topic}]
              </span>
              <span style="font-size: 0.7rem; color: var(--color-text-muted, #64748b);">EBM Chuẩn 30s</span>
            </div>
            <h4 style="margin: 0 0 0.25rem 0; font-size: 0.95rem; font-weight: 800; color: var(--color-text, #0f172a);">
              ${pearl.title}
            </h4>
            <p style="margin: 0; font-size: 0.82rem; color: var(--color-text, #334155); line-height: 1.45;">
              ${pearl.text}
            </p>
          </div>

          <div style="text-align: right; border-top: 1px solid var(--color-border, #e2e8f0); padding-top: 0.75rem;">
            <button class="btn btn-primary" id="btnCloseEnergyModalBottom" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.45rem 1.1rem; border-radius: 0.4rem; cursor: pointer; font-size: 0.85rem; font-weight: 700;">
              Đóng
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const overlay = document.getElementById('energyModalOverlay');
    const closeBtn = document.getElementById('closeEnergyModal');
    const closeBottom = document.getElementById('btnCloseEnergyModalBottom');

    const closeModal = () => { if (overlay) overlay.remove(); };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBottom) closeBottom.addEventListener('click', closeModal);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }
  }

  function initGoodDayCalculator() {
    updateDayScoreBadge();
    updateHeroEnergyBadge();

    const heroDayBtn = document.getElementById('heroDayScoreBtn');
    if (heroDayBtn) {
      heroDayBtn.style.cursor = 'pointer';
      heroDayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openDayScoreModal(new Date(), 'day');
      });
    }

    const heroEnergyBtn = document.getElementById('heroEnergyScoreBtn');
    if (heroEnergyBtn) {
      heroEnergyBtn.style.cursor = 'pointer';
      heroEnergyBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openEnergyModal();
      });
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGoodDayCalculator);
    } else {
      initGoodDayCalculator();
    }
  }

  global.GoodDayCalculator = {
    evaluateDayScore,
    getWeekEvaluation,
    findBestClinicalDays,
    getMonthEvaluation,
    generateICSContent,
    downloadICSFile,
    copyDaySummaryText,
    calculateShiftEnergy,
    getDailyClinicalPearl,
    getDoctorProfile,
    saveDoctorProfile,
    getCanChiYear,
    getSaoTu,
    calculateBiorhythms,
    getTrucNgay,
    getTietKhiInfo,
    calculateGioTimeline,
    kiemTraThanSat,
    kiemTraDiaChi,
    kiemTraQuyNhanLoc,
    updateDayScoreBadge,
    updateHeroEnergyBadge,
    openDayScoreModal,
    openEnergyModal,
    initGoodDayCalculator
  };

})(typeof window !== 'undefined' ? window : this);
