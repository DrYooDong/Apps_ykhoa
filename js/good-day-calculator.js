/**
 * CliniPortal — Good Day & Clinical Astrological Intelligence Calculator (FULL PROFILE VERSION)
 * Ported & adapted from DrYooDong/App_Canhan (astrology_logic.js & test_astro.js)
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
      hanh: NGU_HANH_CAN[can]
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

  // --- TÍNH BIORHYTHMS (NHỊP SINH HỌC Y KHOA từ Ngày/Tháng/Năm Sinh) ---
  function calculateBiorhythms(birthDate, targetDate) {
    const diffMs = targetDate.getTime() - birthDate.getTime();
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 100);
    const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 100);
    const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 100);

    const avg = Math.round((physical + emotional + intellectual) / 3);

    return {
      daysLived: days,
      physical,
      emotional,
      intellectual,
      avgScore: avg
    };
  }

  // --- TÍNH TỬ VI NHẬT HẠN (từ Giờ sinh, Tháng sinh, Giới tính & Ngày xem) ---
  function calculateTieuHan(chiNamSinh, yearTarget, gender) {
    let khoiCung = 0; // Tý=0, Sửu=1...
    if (["Dần", "Ngọ", "Tuất"].includes(chiNamSinh)) khoiCung = 4; // Thìn
    else if (["Thân", "Tý", "Thìn"].includes(chiNamSinh)) khoiCung = 10; // Tuất
    else if (["Tỵ", "Dậu", "Sửu"].includes(chiNamSinh)) khoiCung = 7; // Mùi
    else if (["Hợi", "Mão", "Mùi"].includes(chiNamSinh)) khoiCung = 1; // Sửu

    const age = yearTarget - 2000 + 1; // Mốc đếm tuổi mụ
    const buocDem = (age - 1) % 12;
    return gender === 'Nam' ? (khoiCung + buocDem) % 12 : (khoiCung - buocDem + 12) % 12;
  }

  // --- THUẬT TOÁN ĐÁNH GIÁ CHỈ SỐ NGÀY TỐT (CÁ NHÂN HÓA TOÀN DIỆN) ---
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

  function kiemTraNgayXau(ngayAmLich, canNgay, chiNgay) {
    const tamNuong = [3, 7, 13, 18, 22, 27];
    const tamCuong = [8, 18, 28];
    const nguyetKy = [5, 14, 23];
    let errors = [];
    let penalty = 0;

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
      errors.push("Mùng 1 đầu tháng (Sóc) (-10đ)");
      penalty += 10;
    }
    if (canNgay === "Quý" && chiNgay === "Hợi") {
      errors.push("Ngày Quý Hợi (Cùng Cực) (-20đ)");
      penalty += 20;
    }

    return { errors, penalty };
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

  // --- EVALUATE DAY SCORE (FULL PERSONALIZATION) ---
  function evaluateDayScore(dateObj = new Date()) {
    const doc = getDoctorProfile();
    const canChiDay = getCanChiDay(dateObj);
    const lunar = getApproxLunarDate(dateObj);

    // 1. Can Tuổi vs Can Ngày
    const b1 = soSanhCan(canChiDay.can, doc.canNam);
    const b2_base = 25; // Base score
    const canChiNgayScore = soSanhCanChiNgay(canChiDay.can, canChiDay.chi);
    const lucXung = kiemTraLucXung(doc.chiNam, canChiDay.chi);
    const b3 = congTruNguHanh(canChiDay.hanh, doc.hanhMenh);
    const b4 = kiemTraNgayXau(lunar.day, canChiDay.can, canChiDay.chi);

    // 2. Tính Nhịp Sinh Học Y Khoa (Biorhythms) từ Ngày/Tháng/Năm Sinh
    const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
    const bio = calculateBiorhythms(birthDate, dateObj);

    // Thưởng/Trừ dựa trên Nhịp sinh học cảm xúc & thể lực (+-5đ)
    let bioBonus = 0;
    if (bio.avgScore > 40) bioBonus = 5;
    else if (bio.avgScore < -40) bioBonus = -5;

    let total = b1.score + b2_base + b3.point + canChiNgayScore.score + lucXung.score - b4.penalty + bioBonus;
    if (total > 100) total = 100;
    if (total < 0) total = 0;

    let rating = "Bình Hòa";
    let badgeClass = "day-rating-neutral";
    let icon = "⚖️";

    if (total >= 80) {
      rating = "Rất Tốt";
      badgeClass = "day-rating-great";
      icon = "🌟";
    } else if (total >= 60) {
      rating = "Tốt";
      badgeClass = "day-rating-good";
      icon = "✨";
    } else if (total >= 40) {
      rating = "Bình Hòa";
      badgeClass = "day-rating-neutral";
      icon = "⚖️";
    } else if (total >= 20) {
      rating = "Thận Trọng";
      badgeClass = "day-rating-warn";
      icon = "⚠️";
    } else {
      rating = "Đại Hung";
      badgeClass = "day-rating-bad";
      icon = "⛔";
    }

    const hoangDaoList = HOANG_DAO_MAP[canChiDay.chi] || [];
    const hoangDaoHours = hoangDaoList.map(chi => `${chi} (${GIO_TIME[chi]})`);

    return {
      total,
      rating,
      icon,
      badgeClass,
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
      bio,
      hoangDaoHours
    };
  }

  global.GoodDayCalculator = {
    evaluateDayScore,
    getDoctorProfile,
    saveDoctorProfile,
    getCanChiYear,
    calculateBiorhythms
  };

})(window);
