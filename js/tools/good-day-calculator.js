/**
 * CliniPortal — Good Day & Clinical Astrological Intelligence Calculator (ADVANCED CLINICAL VERSION)
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

  // 24 TIẾT KHÍ (Bảng mốc ngày Dương lịch xấp xỉ)
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

  // BẢNG MÃ THIÊN ĐỨC & NGUYỆT ĐỨC THEO THÁNG ÂM LỊCH
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

  const PROFILE_KEY = 'cliniportal_doctor_full_profile';

  // --- TÍNH JULIAN DAY & CAN CHI ---
  function getJDN(day, month, year) {
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  }

  function getCanChiYear(year) {
    const canIdx = (year - 4) % 10;
    const chiIdx = (year - 4) % 12;
    return {
      can: CAN[(canIdx + 10) % 10],
      chi: CHI[(chiIdx + 12) % 12],
      full: `${CAN[(canIdx + 10) % 10]} ${CHI[(chiIdx + 12) % 12]}`
    };
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
      hanh: NGU_HANH_CAN[can],
      jdn
    };
  }

  function getApproxLunarDate(dateObj) {
    const jdn = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
    const refJDN = 2461089; // 2026-02-17 (Mùng 1/1 âm Bính Ngọ 2026)
    const diffDays = jdn - refJDN;
    const synodicMonth = 29.530588853;
    
    let cycle = diffDays / synodicMonth;
    let monthOffset = Math.floor(cycle);
    let dayInMonth = Math.floor((cycle - monthOffset) * synodicMonth) + 1;
    if (dayInMonth > 30) dayInMonth = 30;
    if (dayInMonth < 1) dayInMonth = 1;

    let lunarMonth = ((1 + monthOffset) % 12);
    if (lunarMonth <= 0) lunarMonth += 12;

    return { day: dayInMonth, month: lunarMonth };
  }

  // --- TÍNH TRỰC NGÀY (12 TRỰC) ---
  function getTrucNgay(lunarMonth, chiNgay) {
    // Tháng âm n: Chi Kiến là Chi của Tháng.
    // Month 1 = Dần (idx 2), Month 2 = Mão (idx 3)...
    const monthChiIdx = (lunarMonth + 1) % 12; // Month 1 -> idx 2 (Dần)
    const dayChiIdx = CHI.indexOf(chiNgay);
    const trucIdx = (dayChiIdx - monthChiIdx + 12) % 12;
    return TRUC_LIST[trucIdx] || TRUC_LIST[0];
  }

  // --- TÍNH TIẾT KHÍ & TỨ LY TỨ TUYỆT ---
  function getTietKhiInfo(dateObj) {
    const m = dateObj.getMonth() + 1;
    const d = dateObj.getDate();

    let closest = TIET_KHI_LIST[0];
    let minDiff = 999;

    for (let tk of TIET_KHI_LIST) {
      let monthDiff = Math.abs(tk.m - m);
      let dayDiff = Math.abs(tk.d - d);
      let diff = monthDiff * 30 + dayDiff;
      if (diff < minDiff) {
        minDiff = diff;
        closest = tk;
      }
    }

    // Kiểm tra Tứ Ly / Tứ Tuyệt (Ngày sát trước các mốc phân/chí hoặc lập)
    let tuLyTuTuyet = null;
    const tomorrow = new Date(dateObj.getTime() + 86400000);
    const tm = tomorrow.getMonth() + 1;
    const td = tomorrow.getDate();

    for (let tk of TIET_KHI_LIST) {
      if (tk.m === tm && tk.d === td) {
        if (tk.special === 'Ly') {
          tuLyTuTuyet = { type: 'Tứ Ly', name: `Tứ Ly (Truớc ${tk.name})`, score: -12, desc: "Cực điểm chuyển giao Âm Dương, kiên đại phẫu hoặc sự kiện lớn." };
        } else if (tk.special === 'Tuet') {
          tuLyTuTuyet = { type: 'Tứ Tuyệt', name: `Tứ Tuyệt (Trước ${tk.name})`, score: -8, desc: "Khí tiết cạn kiệt trước mốc Lập, thận trọng y lệnh phức tạp." };
        }
      }
    }

    return {
      tietKhi: closest,
      tuLyTuTuyet
    };
  }

  // --- TÍNH THẦN SÁT (THIÊN ĐỨC, NGUYỆT ĐỨC, NGUYỆT PHÁ, KHÔNG VONG) ---
  function kiemTraThanSat(lunarMonth, canNgay, chiNgay) {
    let list = [];
    let score = 0;

    // 1. Thiên Đức
    const thienDuc = THIEN_DUC_MAP[lunarMonth];
    if (thienDuc === canNgay || thienDuc === chiNgay) {
      list.push({ name: "Thiên Đức Giai Thần", type: "pos", score: 10, desc: "Thần cát hộ trì, giải trừ hung rủi, y khoa may mắn." });
      score += 10;
    }

    // 2. Nguyệt Đức
    const nguyetDuc = NGUYET_DUC_MAP[lunarMonth];
    if (nguyetDuc === canNgay) {
      list.push({ name: "Nguyệt Đức Tinh", type: "pos", score: 8, desc: "Đón nhận cát khí, minh mẫn chẩn đoán." });
      score += 8;
    }

    // 3. Nguyệt Phá (Chi ngày xung Chi tháng)
    const monthChiIdx = (lunarMonth + 1) % 12;
    const dayChiIdx = CHI.indexOf(chiNgay);
    if ((dayChiIdx - monthChiIdx + 12) % 12 === 6) {
      list.push({ name: "Nguyệt Phá Thần Sát", type: "neg", score: -15, desc: "Xung khắc bản tháng, kiêng ca phẫu thuật nguy cơ cao." });
      score -= 15;
    }

    // 4. Không Vong (Lục Giáp Không Vong)
    const canIdx = CAN.indexOf(canNgay);
    const chiIdx = CHI.indexOf(chiNgay);
    const khongVong1 = CHI[(chiIdx - canIdx + 10 + 12) % 12];
    const khongVong2 = CHI[(chiIdx - canIdx + 11 + 12) % 12];
    if (chiNgay === khongVong1 || chiNgay === khongVong2) {
      list.push({ name: "Không Vong Nhật", type: "neg", score: -10, desc: "Lực cản bất ngờ, cần rà soát lại kết quả xét nghiệm." });
      score -= 10;
    }

    return { list, score };
  }

  // --- TÍNH BIORHYTHMS (NHỊP SINH HỌC Y KHOA CHI TIẾT) ---
  function calculateBiorhythms(birthDate, targetDate) {
    const diffMs = targetDate.getTime() - birthDate.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 100);
    const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 100);
    const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 100);

    const avg = Math.round((physical + emotional + intellectual) / 3);

    // Điểm thưởng / phạt từng kênh chuyên môn y khoa
    let physBonus = 0, intBonus = 0, emoBonus = 0;
    let clinicalTips = [];

    if (physical >= 50) {
      physBonus = 4;
      clinicalTips.push("💪 Thể lực vượt trội (+" + physical + "%): Rất phù hợp ca phẫu thuật kéo dài, ca trực đêm hay cấp cứu liên tục.");
    } else if (physical <= -50) {
      physBonus = -3;
      clinicalTips.push("⚠️ Thể lực suy giảm (" + physical + "%): Tránh thức đêm quá sức, chú ý nghỉ ngơi giữa ca.");
    }

    if (intellectual >= 50) {
      intBonus = 4;
      clinicalTips.push("🧠 Trí tuệ sáng suốt (+" + intellectual + "%): Thích hợp nghiên cứu EBM, chẩn đoán ca bệnh khó, đọc ECG/CT phức tạp.");
    } else if (intellectual <= -50) {
      intBonus = -3;
      clinicalTips.push("⚠️ Trí tuệ ở vùng trũng (" + intellectual + "%): Hãy kiểm tra lại y lệnh & liều thuốc 2 lần trước khi duyệt.");
    }

    if (emotional >= 50) {
      emoBonus = 3;
      clinicalTips.push("❤️ Cảm xúc ổn định (+" + emotional + "%): Rất tốt để giải thích bệnh trình cho người nhà, tư vấn ca nặng.");
    } else if (emotional <= -50) {
      emoBonus = -2;
      clinicalTips.push("⚠️ Cảm xúc nhạy cảm (" + emotional + "%): Giữ bình tĩnh, tránh xung đột truyền thông y tế.");
    }

    const totalBioScore = physBonus + intBonus + emoBonus;

    return {
      daysLived: days,
      physical,
      emotional,
      intellectual,
      avgScore: avg,
      physBonus,
      intBonus,
      emoBonus,
      totalBioScore,
      clinicalTips
    };
  }

  // --- TÍNH TỬ VI NHẬT HẠN ---
  function calculateTieuHan(chiNamSinh, yearTarget, gender) {
    let khoiCung = 0;
    if (["Dần", "Ngọ", "Tuất"].includes(chiNamSinh)) khoiCung = 4;
    else if (["Thân", "Tý", "Thìn"].includes(chiNamSinh)) khoiCung = 10;
    else if (["Tỵ", "Dậu", "Sửu"].includes(chiNamSinh)) khoiCung = 7;
    else if (["Hợi", "Mão", "Mùi"].includes(chiNamSinh)) khoiCung = 1;

    const age = yearTarget - 2000 + 1;
    const buocDem = (age - 1) % 12;
    return gender === 'Nam' ? (khoiCung + buocDem) % 12 : (khoiCung - buocDem + 12) % 12;
  }

  // --- THUẬT TOÁN ĐÁNH GIÁ CHỈ SỐ NGÀY TỐT ---
  function kiemTraLucXung(chiNamSinh, chiNgay) {
    if (!chiNamSinh) return { isXung: false, text: "Bình thường", score: 0 };
    const cacCapXung = [
      ["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"],
      ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]
    ];
    for (let cap of cacCapXung) {
      if ((cap[0] === chiNamSinh && cap[1] === chiNgay) || (cap[1] === chiNamSinh && cap[0] === chiNgay)) {
        return { isXung: true, text: `Phạm Lục Xung (${chiNgay} xung tuổi ${chiNamSinh})`, score: -20 };
      }
    }
    return { isXung: false, text: "Không phạm Lục Xung", score: 0 };
  }

  function soSanhCanChiNgay(canNgay, chiNgay) {
    const hanhCan = NGU_HANH_CAN[canNgay];
    const hanhChi = NGU_HANH_CHI[chiNgay];

    if (HANH_SINH_KHAC.sinh[hanhCan] === hanhChi) {
      return { level: 1, text: "Bảo Nhật (Can sinh Chi - Rất tốt)", score: 20 };
    } else if (HANH_SINH_KHAC.sinh[hanhChi] === hanhCan) {
      return { level: 2, text: "Thoa Nhật (Chi sinh Can - Khá tốt)", score: 10 };
    } else if (hanhCan === hanhChi) {
      return { level: 3, text: "Bát Chuyên (Đồng khí)", score: 5 };
    } else if (HANH_SINH_KHAC.khac[hanhChi] === hanhCan) {
      return { level: 4, text: "Chế Nhật (Chi khắc Can - Thận trọng)", score: -10 };
    } else if (HANH_SINH_KHAC.khac[hanhCan] === hanhChi) {
      return { level: 5, text: "Phạt Nhật (Can khắc Chi - Xấu)", score: -20 };
    }
    return { level: 3, text: "Bình hòa", score: 0 };
  }

  function soSanhCan(canNgay, canNamSinh) {
    const hanhNgay = NGU_HANH_CAN[canNgay];
    const hanhNamSinh = NGU_HANH_CAN[canNamSinh];

    if (!hanhNamSinh) return { level: 3, text: "Bình hòa", score: 30 };

    if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhNamSinh) {
      return { level: 1, text: "Can ngày sinh cho Can tuổi (Rất tốt)", score: 60 };
    } else if (HANH_SINH_KHAC.sinh[hanhNamSinh] === hanhNgay) {
      return { level: 2, text: "Can tuổi sinh Can ngày (Khá tốt)", score: 45 };
    } else if (hanhNgay === hanhNamSinh) {
      return { level: 3, text: "Can ngày đồng hành Can tuổi", score: 30 };
    } else if (HANH_SINH_KHAC.khac[hanhNamSinh] === hanhNgay) {
      return { level: 4, text: "Can tuổi khắc Can ngày", score: 15 };
    } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhNamSinh) {
      return { level: 5, text: "Can ngày khắc Can tuổi", score: 0 };
    }
    return { level: 3, text: "Bình hòa", score: 30 };
  }

  function congTruNguHanh(hanhNgay, hanhMenh) {
    let point = 0;
    let detail = [];
    if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhMenh) {
      point += 10;
      detail.push("Hành ngày tương sinh Bản Mệnh (+10đ)");
    } else if (hanhNgay === hanhMenh) {
      point += 5;
      detail.push("Hành ngày đồng hành Bản Mệnh (+5đ)");
    }
    return { point, detail };
  }

  function kiemTraNgayXauTotAmLich(ngayAmLich, canNgay, chiNgay) {
    const tamNuong = [3, 7, 13, 18, 22, 27];
    const tamCuong = [8, 18, 28];
    const nguyetKy = [5, 14, 23];
    const lucNhamCat = [6, 16, 26];

    let errors = [];
    let bonuses = [];
    let penalty = 0;
    let bonusPoint = 0;

    // Hung
    if (tamNuong.includes(ngayAmLich)) {
      errors.push("Phạm ngày Tam Nương (-20đ)");
      penalty += 20;
    }
    if (tamCuong.includes(ngayAmLich)) {
      errors.push("Phạm ngày Tam Cường (-15đ)");
      penalty += 15;
    }
    if (nguyetKy.includes(ngayAmLich)) {
      errors.push("Phạm ngày Nguyệt Kỵ (-15đ)");
      penalty += 15;
    }
    if (ngayAmLich === 1) {
      errors.push("Mùng 1 đầu tháng (Sóc) (-5đ)");
      penalty += 5;
    }
    if (canNgay === "Quý" && chiNgay === "Hợi") {
      errors.push("Ngày Quý Hợi (Cùng Cực) (-20đ)");
      penalty += 20;
    }

    // Cát
    if (ngayAmLich === 15) {
      bonuses.push("Ngày Vọng (Trăng tròn đại cát) (+5đ)");
      bonusPoint += 5;
    }
    if (lucNhamCat.includes(ngayAmLich)) {
      bonuses.push("Ngày Lục Nhâm Cát (Tốc Hỷ / Đại An) (+5đ)");
      bonusPoint += 5;
    }

    return { errors, bonuses, penalty, bonusPoint };
  }

  // --- LƯU TRỮ PROFILE ĐẦY ĐỦ CỦA BÁC SĨ ---
  function getDoctorProfile() {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      name: "Bác sĩ Nguyễn Văn A",
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
    const canChi = getCanChiYear(profile.birthYear || 1990);
    const updated = {
      name: profile.name || "Bác sĩ",
      gender: profile.gender || "Nam",
      birthDay: parseInt(profile.birthDay, 10) || 15,
      birthMonth: parseInt(profile.birthMonth, 10) || 8,
      birthYear: parseInt(profile.birthYear, 10) || 1990,
      birthHour: parseInt(profile.birthHour, 10) || 8,
      birthMinute: parseInt(profile.birthMinute, 10) || 0,
      canNam: canChi.can,
      chiNam: canChi.chi,
      hanhMenh: profile.hanhMenh || "Thổ"
    };
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {}
    return updated;
  }

  // --- EVALUATE DAY SCORE (ADVANCED FULL PERSONALIZATION) ---
  function evaluateDayScore(dateObj = new Date()) {
    const doc = getDoctorProfile();
    const canChiDay = getCanChiDay(dateObj);
    const lunar = getApproxLunarDate(dateObj);

    // 1. Core Can-Chi
    const b1 = soSanhCan(canChiDay.can, doc.canNam);
    const b2_base = 20; // Base score
    const canChiNgayScore = soSanhCanChiNgay(canChiDay.can, canChiDay.chi);
    const lucXung = kiemTraLucXung(doc.chiNam, canChiDay.chi);
    const b3 = congTruNguHanh(canChiDay.hanh, doc.hanhMenh);
    const b4 = kiemTraNgayXauTotAmLich(lunar.day, canChiDay.can, canChiDay.chi);

    // 2. Trực Ngày
    const trucNgay = getTrucNgay(lunar.month, canChiDay.chi);

    // 3. Tiết Khí & Tứ Ly Tứ Tuyệt
    const tietKhiInfo = getTietKhiInfo(dateObj);

    // 4. Thần Sát
    const thanSat = kiemTraThanSat(lunar.month, canChiDay.can, canChiDay.chi);

    // 5. Biorhythms
    const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
    const bio = calculateBiorhythms(birthDate, dateObj);

    // Tính tổng raw score
    let rawTotal = b1.score + b2_base + b3.point + canChiNgayScore.score + lucXung.score 
                 - b4.penalty + b4.bonusPoint 
                 + trucNgay.score + tietKhiInfo.tietKhi.score 
                 + (tietKhiInfo.tuLyTuTuyet ? tietKhiInfo.tuLyTuTuyet.score : 0)
                 + thanSat.score + bio.totalBioScore;

    // Chuẩn hóa 0-100 (Max lý thuyết ~130, Min ~-50)
    let total = Math.round(Math.min(100, Math.max(0, rawTotal)));

    let rating = "Bình Hòa";
    let badgeClass = "day-rating-neutral";
    let icon = "⚖️";
    let summaryText = "Ngày cân bằng, mọi công việc diễn ra thuận lợi theo đúng quy trình.";

    if (total >= 82) {
      rating = "Đại Cát";
      badgeClass = "day-rating-great";
      icon = "🌟";
      summaryText = "Thời điểm vàng cho các ca phẫu thuật quan trọng, chuyển giao kỹ thuật & hội chẩn EBM.";
    } else if (total >= 65) {
      rating = "Cát Lành";
      badgeClass = "day-rating-good";
      icon = "✨";
      summaryText = "Khí tiết thuận lợi, năng lượng làm việc và chẩn đoán đạt hiệu suất cao.";
    } else if (total >= 45) {
      rating = "Bình Hòa";
      badgeClass = "day-rating-neutral";
      icon = "⚖️";
      summaryText = "Trạng thái ổn định, thích hợp tái khám, hoàn thiện ghi chú y lệnh & học tập.";
    } else if (total >= 25) {
      rating = "Thận Trọng";
      badgeClass = "day-rating-warn";
      icon = "⚠️";
      summaryText = "Có yếu tố xung nhẹ hoặc thiên tiết cản trở, hãy rà soát kỹ liều thuốc & y lệnh.";
    } else {
      rating = "Đại Hung";
      badgeClass = "day-rating-bad";
      icon = "⛔";
      summaryText = "Phạm nhiều Thần Sát / Lục Xung lớn, kiêng khởi sự mới, chú ý kiềm chế căng thẳng.";
    }

    const hoangDaoList = HOANG_DAO_MAP[canChiDay.chi] || [];
    const hoangDaoHours = hoangDaoList.map(chi => `${chi} (${GIO_TIME[chi]})`);

    return {
      total,
      rawTotal,
      rating,
      icon,
      badgeClass,
      summaryText,
      dateObj,
      lunarDay: lunar.day,
      lunarMonth: lunar.month,
      canChiDay: canChiDay.full,
      canNgay: canChiDay.can,
      chiNgay: canChiDay.chi,
      hanhNgay: canChiDay.hanh,
      docProfile: doc,
      b1,
      canChiNgayScore,
      lucXung,
      b3,
      b4,
      trucNgay,
      tietKhiInfo,
      thanSat,
      bio,
      hoangDaoHours
    };
  }

  global.GoodDayCalculator = {
    evaluateDayScore,
    getDoctorProfile,
    saveDoctorProfile,
    getCanChiYear,
    calculateBiorhythms,
    getTrucNgay,
    getTietKhiInfo,
    kiemTraThanSat
  };

})(typeof window !== 'undefined' ? window : global);

