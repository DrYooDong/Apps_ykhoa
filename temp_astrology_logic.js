// ============================================
// NỘI TÂM — Dữ liệu & Logic Tử Vi / Ngày Tốt
// ============================================

window.AstrologyLogic = (function() {
  'use strict';

  // --- Hằng số cơ bản ---
  const CUNG = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = CUNG; // Chi giống hệt Cung trên địa bàn

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

  const CHI_TO_QUAI = {
    "Tý": { quai: "Khảm", hanh: "Thủy", mau: "Đen" },
    "Sửu": { quai: "Cấn", hanh: "Mộc", mau: "Xanh" },
    "Dần": { quai: "Cấn", hanh: "Mộc", mau: "Xanh" },
    "Mão": { quai: "Chấn", hanh: "Mộc", mau: "Xanh" },
    "Thìn": { quai: "Tốn", hanh: "Hỏa", mau: "Đỏ" },
    "Tỵ": { quai: "Tốn", hanh: "Hỏa", mau: "Đỏ" },
    "Ngọ": { quai: "Ly", hanh: "Hỏa", mau: "Đỏ" },
    "Mùi": { quai: "Khôn", hanh: "Kim", mau: "Trắng" },
    "Thân": { quai: "Khôn", hanh: "Kim", mau: "Trắng" },
    "Dậu": { quai: "Đoài", hanh: "Kim", mau: "Trắng" },
    "Tuất": { quai: "Càn", hanh: "Thủy", mau: "Đen" },
    "Hợi": { quai: "Càn", hanh: "Thủy", mau: "Đen" }
  };

  const NGU_HANH_AM_DUONG = {
    "Mộc": { amDuong: ["Dương", "Âm"] }, // Giáp (Dương), Ất (Âm) - simplifies to checking Can index % 2
    // just map index: chẵn là Dương, lẻ là Âm.
  };

  const HanhSinhKhac = {
    sinh: { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" },
    khac: { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" }
  };

  function getAmDuongCan(canStr) {
    const idx = CAN.indexOf(canStr);
    if (idx === -1) return "Dương"; // fallback
    return idx % 2 === 0 ? "Dương" : "Âm";
  }

  // Tiện ích đếm trên 12 cung (0-11)
  function demThuan(cungBatDau, buocDem) {
    return (cungBatDau + buocDem) % 12;
  }
  function demNghich(cungBatDau, buocDem) {
    return (cungBatDau - buocDem % 12 + 12) % 12;
  }

  // --- Logic Tử Vi ---

  // 1. Tính Tiểu hạn
  // Tuổi Dần, Ngọ, Tuất: khởi Thìn (4).
  // Tuổi Thân, Tý, Thìn: khởi Tuất (10).
  // Tuổi Tỵ, Dậu, Sửu: khởi Mùi (7).
  // Tuổi Hợi, Mão, Mùi: khởi Sửu (1).
  function tinhTieuHan(chiNamSinh, namXem, gioiTinh) {
    let khoiCung = 0;
    if (["Dần", "Ngọ", "Tuất"].includes(chiNamSinh)) khoiCung = 4; // Thìn
    else if (["Thân", "Tý", "Thìn"].includes(chiNamSinh)) khoiCung = 10; // Tuất
    else if (["Tỵ", "Dậu", "Sửu"].includes(chiNamSinh)) khoiCung = 7; // Mùi
    else if (["Hợi", "Mão", "Mùi"].includes(chiNamSinh)) khoiCung = 1; // Sửu

    // Nam thuận, Nữ nghịch. Đếm từ tuổi 1 đến tuổi xem.
    // Nếu tuổi xem là 1, thì Tiểu hạn ở đúng cung khởi điểm.
    // Cách đếm: số bước = (namXem - 1). (Giả sử namXem là tuổi âm lịch)
    // Ở đây ta đơn giản hóa: namXem là số tuổi âm lịch của năm đó.
    const buocDem = namXem - 1;
    if (gioiTinh === "Nam") {
      return demThuan(khoiCung, buocDem);
    } else {
      return demNghich(khoiCung, buocDem);
    }
  }

  // 2. Tính Nguyệt hạn
  function tinhNguyetHan(cungTieuHan, thangSinh, gioSinhIdx, thangXem) {
    // Từ cung Tiểu hạn (coi là tháng 1), đếm nghịch đến tháng sinh
    // Tháng sinh: tháng 1 -> bước đếm = 0, tháng n -> bước đếm = n - 1
    const buocNghich = thangSinh - 1;
    const cungDung1 = demNghich(cungTieuHan, buocNghich);

    // Tại cung dừng lại, coi là giờ Tý (0), đếm thuận đến giờ sinh
    // Giờ Tý (0), Sửu (1)...
    const cungDung2 = demThuan(cungDung1, gioSinhIdx);
    
    // Cung dừng lại cuối cùng chính là tháng Giêng (tháng 1).
    const cungThangGieng = cungDung2;

    // Đếm thuận đến tháng xem
    const buocThuan = thangXem - 1;
    return demThuan(cungThangGieng, buocThuan);
  }

  // 3. Tính Nhật hạn
  function tinhNhatHan(cungNguyetHan, ngayXem) {
    // Cung nguyệt hạn là mùng 1. Đếm thuận đến ngày xem.
    const buocThuan = ngayXem - 1;
    return demThuan(cungNguyetHan, buocThuan);
  }

  // --- Logic Ngày Tốt ---
  function kiemTraLucXung(chiNamSinh, chiNgay) {
    if (!chiNamSinh) return { isXung: false, text: "Chưa xác định tuổi", score: 0 };
    const cacCapXung = [
      ["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"],
      ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]
    ];
    for (let cap of cacCapXung) {
      if ((cap[0] === chiNamSinh && cap[1] === chiNgay) || (cap[1] === chiNamSinh && cap[0] === chiNgay)) {
        return { isXung: true, text: `Ngày ${chiNgay} xung trực diện với tuổi ${chiNamSinh} (Đại Hung)`, score: -20 };
      }
    }
    return { isXung: false, text: "Không phạm Lục Xung", score: 0 };
  }

  function soSanhCanChiNgay(canNgay, chiNgay) {
    const hanhCan = NGU_HANH_CAN[canNgay];
    const hanhChi = NGU_HANH_CHI[chiNgay];

    if (HanhSinhKhac.sinh[hanhCan] === hanhChi) {
      return { level: 1, text: `Đại Cát: Bảo nhật (Can sinh Chi)`, score: 20 };
    } else if (HanhSinhKhac.sinh[hanhChi] === hanhCan) {
      return { level: 2, text: `Tiểu Cát: Thoa nhật (Chi sinh Can)`, score: 10 };
    } else if (hanhCan === hanhChi) {
      return { level: 3, text: `Bát chuyên: Đồng khí đồng hành`, score: 5 };
    } else if (HanhSinhKhac.khac[hanhChi] === hanhCan) {
      return { level: 4, text: `Tiểu Hung: Chế nhật (Chi khắc Can)`, score: -10 };
    } else if (HanhSinhKhac.khac[hanhCan] === hanhChi) {
      return { level: 5, text: `Đại Hung: Phạt nhật (Can khắc Chi)`, score: -20 };
    }
    return { level: 3, text: "Bình hòa", score: 0 };
  }

  function soSanhCan(canNgay, canNamSinh) {
    const hanhNgay = NGU_HANH_CAN[canNgay];
    const hanhNamSinh = NGU_HANH_CAN[canNamSinh];

    if (HanhSinhKhac.sinh[hanhNgay] === hanhNamSinh) {
      return { level: 1, text: "Mức 1 (Rất Tốt): Can ngày sinh cho Can năm sinh", score: 60 };
    } else if (HanhSinhKhac.sinh[hanhNamSinh] === hanhNgay) {
      return { level: 2, text: "Mức 2 (Khá Tốt): Can năm sinh sinh cho Can ngày", score: 45 };
    } else if (hanhNgay === hanhNamSinh) {
      return { level: 3, text: "Mức 3 (Bình hòa): Can ngày đồng hành với Can năm sinh", score: 30 };
    } else if (HanhSinhKhac.khac[hanhNamSinh] === hanhNgay) {
      return { level: 4, text: "Mức 4 (Xấu Vừa): Can năm sinh khắc Can ngày", score: 15 };
    } else if (HanhSinhKhac.khac[hanhNgay] === hanhNamSinh) {
      return { level: 5, text: "Mức 5 (Rất Xấu): Can ngày khắc Can năm sinh", score: 0 };
    }
    return { level: 3, text: "Không xác định", score: 30 };
  }

  function congTruNguHanh(hanhNgay, hanhMenh, amDuongNgay, amDuongMenh) {
    let point = 0;
    let detail = [];
    if (HanhSinhKhac.sinh[hanhNgay] === hanhMenh) {
      point += 10;
      detail.push("Hành ngày sinh Bản Mệnh (+10đ)");
    }
    if (hanhNgay === hanhMenh && amDuongNgay === amDuongMenh) {
      point += 5; // Cùng âm dương
      detail.push("Hành ngày và Bản Mệnh cùng Âm/Dương (+5đ)");
    }
    return { point, detail };
  }

  function kiemTraNgayXau(ngayAmLich, canNgay, chiNgay) {
    const tamNuong = [3, 7, 13, 18, 22, 27];
    const tamCuong = [8, 18, 28];
    const nguyetKy = [5, 14, 23];
    let isXau = false;
    let errors = [];
    let penalty = 0;

    if (tamNuong.includes(ngayAmLich)) {
      isXau = true;
      errors.push("Phạm ngày Tam Nương (trừ 20 điểm)");
      penalty += 20;
    }
    if (tamCuong.includes(ngayAmLich)) {
      isXau = true;
      errors.push("Phạm ngày Tam Cường (trừ 15 điểm)");
      penalty += 15;
    }
    if (nguyetKy.includes(ngayAmLich)) {
      isXau = true;
      errors.push("Phạm ngày Nguyệt Kỵ (trừ 15 điểm)");
      penalty += 15;
    }
    if (ngayAmLich === 1) {
      isXau = true;
      errors.push("Ngày mùng 1 đầu tháng (Sóc) (trừ 10 điểm)");
      penalty += 10;
    }
    if (canNgay === "Quý" && chiNgay === "Hợi") {
      isXau = true;
      errors.push("Ngày Cùng, Cực - Quý Hợi (trừ 20 điểm)");
      penalty += 20;
    }

    return { isXau, errors, penalty };
  }

  const GIO_TIME = {
    "Tý": "23h-1h", "Sửu": "1h-3h", "Dần": "3h-5h", "Mão": "5h-7h",
    "Thìn": "7h-9h", "Tỵ": "9h-11h", "Ngọ": "11h-13h", "Mùi": "13h-15h",
    "Thân": "15h-17h", "Dậu": "17h-19h", "Tuất": "19h-21h", "Hợi": "21h-23h"
  };

  function formatGio(chiList) {
    return chiList.map(chi => `${chi} (${GIO_TIME[chi]})`);
  }

  function tinhGioHoangDao(chiNgay) {
    // Lục đạo hoàng đạo theo ngày (Thanh Long, Minh Đường, Kim Quỹ, Thiên Đức, Ngọc Đường, Tư Mệnh)
    let hd = [];
    if (["Tý", "Ngọ"].includes(chiNgay)) hd = ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"];
    else if (["Sửu", "Mùi"].includes(chiNgay)) hd = ["Dần", "Mão", "Tỵ", "Thân", "Tuất", "Hợi"];
    else if (["Dần", "Thân"].includes(chiNgay)) hd = ["Tý", "Sửu", "Thìn", "Tỵ", "Mùi", "Tuất"];
    else if (["Mão", "Dậu"].includes(chiNgay)) hd = ["Dần", "Mão", "Ngọ", "Mùi", "Dậu", "Tý"];
    else if (["Thìn", "Tuất"].includes(chiNgay)) hd = ["Dần", "Thìn", "Tỵ", "Thân", "Dậu", "Hợi"];
    else if (["Tỵ", "Hợi"].includes(chiNgay)) hd = ["Sửu", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"];
    return formatGio(hd);
  }

  function tinhGioXau(canNgay, thangAmLich) {
    let khongVong = [];
    let satChu = [];

    if (["Giáp", "Kỷ"].includes(canNgay)) { khongVong = ["Thân", "Dậu"]; satChu = ["Ngọ"]; }
    else if (["Ất", "Canh"].includes(canNgay)) { khongVong = ["Ngọ", "Mùi"]; satChu = ["Thìn"]; }
    else if (["Bính", "Tân"].includes(canNgay)) { khongVong = ["Dần", "Mão"]; satChu = ["Hợi"]; }

    let satChuThang = "";
    if ([1, 7].includes(thangAmLich)) satChuThang = "Tỵ";
    else if ([2, 8].includes(thangAmLich)) satChuThang = "Tý";
    else if ([3, 9].includes(thangAmLich)) satChuThang = "Thân";
    else if ([4, 10].includes(thangAmLich)) satChuThang = "Thìn";
    else if ([5, 11].includes(thangAmLich)) satChuThang = "Dậu";
    else if ([6, 12].includes(thangAmLich)) satChuThang = "Sửu";

    if (satChuThang && !satChu.includes(satChuThang)) {
      satChu.push(satChuThang);
    }

    return { 
      khongVong: formatGio(khongVong), 
      satChu: formatGio(satChu) 
    };
  }

  function tinhMauSac(hanhMenh, canNgay, chiNgay) {
    const COLORS = {
      "Kim": ["Trắng", "Bạc", "Xám"],
      "Mộc": ["Xanh lá", "Xanh lục"],
      "Thủy": ["Đen", "Xanh dương"],
      "Hỏa": ["Đỏ", "Cam", "Tím", "Hồng"],
      "Thổ": ["Vàng", "Nâu đất"]
    };

    const hanhNgay = NGU_HANH_CAN[canNgay];
    const quaiNgay = CHI_TO_QUAI[chiNgay];
    
    let hanhApLuc = [];
    if (HanhSinhKhac.khac[hanhNgay] === hanhMenh) hanhApLuc.push(hanhNgay);
    if (HanhSinhKhac.khac[quaiNgay.hanh] === hanhMenh) hanhApLuc.push(quaiNgay.hanh);

    let tot = new Set();
    let xau = new Set();
    let lyDo = "";

    const hanhSinhMenh = Object.keys(HanhSinhKhac.sinh).find(k => HanhSinhKhac.sinh[k] === hanhMenh);

    if (hanhApLuc.length > 0) {
      COLORS[hanhSinhMenh].forEach(m => tot.add(m));
      COLORS[hanhMenh].forEach(m => tot.add(m));
      
      hanhApLuc.forEach(h => {
         COLORS[h].forEach(m => xau.add(m));
      });
      lyDo = `Ngày có yếu tố hành ${[...new Set(hanhApLuc)].join(', ')} khắc Bản Mệnh ${hanhMenh}. Nên ưu tiên dùng màu ${hanhSinhMenh} để hóa giải (Dụng ${hanhSinhMenh} sinh ${hanhMenh}). Tránh màu thuộc ${[...new Set(hanhApLuc)].join(', ')}.`;
    } else {
      COLORS[hanhMenh].forEach(m => tot.add(m));
      COLORS[hanhSinhMenh].forEach(m => tot.add(m));
      
      const hanhKhacMenh = Object.keys(HanhSinhKhac.khac).find(k => HanhSinhKhac.khac[k] === hanhMenh);
      COLORS[hanhKhacMenh].forEach(m => xau.add(m));
      
      lyDo = `Ngày sinh trợ/tỷ hòa với Bản Mệnh. Ưu tiên dùng màu Bản mệnh (${hanhMenh}) hoặc màu sinh trợ (${hanhSinhMenh}) để tăng cường vượng khí.`;
    }

    lyDo += `<br><span style="font-size: 0.9em; color: var(--text-muted);">* Ghi chú Bát Quái: Chi ${chiNgay} thuộc quái ${quaiNgay.quai} - hành ${quaiNgay.hanh}, màu đặc trưng là ${quaiNgay.mau}.</span>`;

    return {
      tot: Array.from(tot),
      xau: Array.from(xau),
      lyDo: lyDo
    };
  }

  const HEALTH_STARS_DICT = [
    { sao: "Thiên Khôi, Kình Dương", boPhan: "Đầu", canhBao: "Cẩn thận vùng đầu, tránh va đập mạnh khi làm việc hay chơi thể thao.", type: "risk" },
    { sao: "Thái Dương, Hóa Kỵ", boPhan: "Mắt", canhBao: "Thị lực giảm sút, mỏi mắt, dễ bị đau mắt. Hãy hạn chế nhìn màn hình quá lâu.", type: "risk" },
    { sao: "Tuế Phá, Thiên Khốc", boPhan: "Răng", canhBao: "Cảnh báo đau răng, hư răng. Hạn chế đồ ngọt và đồ quá cứng.", type: "risk" },
    { sao: "Phượng Các, Sát Tinh", boPhan: "Tai Mũi Họng", canhBao: "Dễ bị viêm họng, đau mũi, ù tai do thay đổi thời tiết.", type: "risk" },
    { sao: "Thiên Đồng, Tiểu Hao", boPhan: "Tiêu hóa", canhBao: "Hệ tiêu hóa hôm nay rất nhạy cảm. Cẩn thận nguy cơ đau bụng, trúng thực, tránh ăn hàng quán vỉa hè.", type: "risk" },
    { sao: "Bạch Hổ, Sát Tinh", boPhan: "Xương Khớp, Máu Huyết", canhBao: "Dễ bị nhức mỏi xương khớp, áp huyết dao động. Hãy tránh vận động quá sức.", type: "risk" },
    { sao: "Thiên Mã, Tuần Triệt", boPhan: "Chân Tay", canhBao: "Cẩn thận di chuyển, nguy cơ té ngã, thương tích tay chân.", type: "risk" },
    { sao: "Tang Môn, Thiên Khốc", boPhan: "Tinh thần", canhBao: "Trạng thái thể lực hôm nay ở mức [Thấp]. Năng lượng vũ trụ khiến bạn dễ cảm thấy uể oải, suy nhược. Đừng ép bản thân làm việc quá sức.", type: "mental" },
    { sao: "Bệnh Phù", boPhan: "Hệ miễn dịch", canhBao: "Người mỏi mệt, dễ cảm lạnh, sổ mũi, nhức đầu. Nên giữ ấm cơ thể.", type: "mental" },
    { sao: "Thiên Y, Ân Quang", boPhan: "Khám bệnh", canhBao: "Nếu dạo này bạn đang thấy mệt mỏi, hôm nay là ngày tuyệt vời để đi khám bệnh. Báo hiệu bạn sẽ gặp được bác sĩ giỏi, kê đúng thuốc, mau lành bệnh.", type: "heal" }
  ];

  function tinhTrangSucKhoeCucBo(dateObj, canNamSinh) {
    if (!dateObj) return null;
    const seedStr = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}-${canNamSinh}`;
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
      hash = (hash << 5) - hash + seedStr.charCodeAt(i);
      hash = hash & hash;
    }
    hash = Math.abs(hash);
    
    // Pick 1-2 items from HEALTH_STARS_DICT
    const index1 = hash % HEALTH_STARS_DICT.length;
    const item1 = HEALTH_STARS_DICT[index1];
    
    let result = {
      items: [item1],
      mentalLevel: item1.type === 'mental' ? 'Thấp' : (hash % 2 === 0 ? 'Trung bình' : 'Tốt'),
    };
    
    // Add a chance for a second item if it's different
    if (hash % 3 === 0) {
      const index2 = (hash + 5) % HEALTH_STARS_DICT.length;
      if (index1 !== index2) {
        result.items.push(HEALTH_STARS_DICT[index2]);
      }
    }
    
    return result;
  }

  function chamDiemNgayTot(params) {
    // params = { canNamSinh, chiNamSinh, canNgay, chiNgay, hanhMenh, hanhNgay, ngayAmLich, thangAmLich }
    const b1 = soSanhCan(params.canNgay, params.canNamSinh);
    
    // Bước 2: Nhật Hạn cát hung (Mocked for now since real calculation requires full chart generation)
    // Tạm thời cho điểm trung bình: 25/40.
    const b2_score = 25; 
    
    // Yếu tố Can Chi của Ngày (Sự giao thoa)
    const canChiNgayScore = soSanhCanChiNgay(params.canNgay, params.chiNgay);
    
    // Lục Xung Can Chi
    const lucXung = kiemTraLucXung(params.chiNamSinh, params.chiNgay);
    
    const amDuongNgay = getAmDuongCan(params.canNgay);
    const amDuongMenh = "Dương"; // Tạm giả định, có thể nâng cấp thêm

    const b3 = congTruNguHanh(params.hanhNgay, params.hanhMenh, amDuongNgay, amDuongMenh);
    
    const b4 = kiemTraNgayXau(params.ngayAmLich, params.canNgay, params.chiNgay);
    
    const gioXau = tinhGioXau(params.canNgay, params.thangAmLich);
    const gioHoangDao = tinhGioHoangDao(params.chiNgay);

    let total = b1.score + b2_score + b3.point - b4.penalty + canChiNgayScore.score + lucXung.score;
    if (total > 100) total = 100;
    if (total < 0) total = 0;

    let danhGia = "Bình thường";
    if (total >= 80) danhGia = "Rất Tốt";
    else if (total >= 60) danhGia = "Tốt";
    else if (total >= 40) danhGia = "Bình hòa";
    else if (total >= 20) danhGia = "Xấu";
    else danhGia = "Rất Xấu";

    const mauSac = tinhMauSac(params.hanhMenh, params.canNgay, params.chiNgay);
    const sucKhoe = tinhLoiKhuyenSucKhoe(params.hanhMenh, params.hanhNgay, params.thangAmLich);
    
    const troLySucKhoe = tinhTrangSucKhoeCucBo(params.dateObj, params.canNamSinh);

    return {
      total,
      danhGia,
      b1,
      b2_score,
      canChiNgayScore,
      lucXung,
      b3,
      b4,
      gioXau,
      gioHoangDao,
      mauSac,
      sucKhoe,
      troLySucKhoe
    };
  }

  // Cầu nối dùng lunar-javascript (lunar.js)
  function tinhDiemNgayDuongLich(dateObj, userCan, userMenh, userChi) {
    if (typeof Lunar === 'undefined') {
      console.warn("Thư viện lunar-javascript chưa được tải!");
      return null;
    }
    const lunar = Lunar.fromDate(dateObj);
    const ngayAmLich = lunar.getDay();
    const thangAmLich = lunar.getMonth();
    
    const canNgayIdx = lunar.getDayGanIndex(); // 0-9 tương ứng Giáp - Quý
    const canNgay = CAN[canNgayIdx];
    
    const chiNgayIdx = lunar.getDayZhiIndex(); // 0-11 tương ứng Tý - Hợi
    const chiNgay = CHI[chiNgayIdx];
    
    const hanhNgay = NGU_HANH_CAN[canNgay];

    return chamDiemNgayTot({
      canNamSinh: userCan,
      chiNamSinh: userChi,
      hanhMenh: userMenh,
      ngayAmLich: ngayAmLich,
      thangAmLich: Math.abs(thangAmLich), // có thể có tháng nhuận bị âm
      canNgay: canNgay,
      chiNgay: chiNgay,
      hanhNgay: hanhNgay,
      dateObj: dateObj
    });
  }

  // --- Logic Mới (Phong thủy & Bát Quái) ---
  
  function tinhMenhTuCanChi(can, chi) {
    const canValue = {
      "Giáp": 1, "Ất": 1, "Bính": 2, "Đinh": 2, "Mậu": 3, "Kỷ": 3, "Canh": 4, "Tân": 4, "Nhâm": 5, "Quý": 5
    }[can] || 1;
    
    let chiValue = 0;
    if (["Tý", "Sửu", "Ngọ", "Mùi"].includes(chi)) chiValue = 0;
    else if (["Dần", "Mão", "Thân", "Dậu"].includes(chi)) chiValue = 1;
    else if (["Thìn", "Tỵ", "Tuất", "Hợi"].includes(chi)) chiValue = 2;
    
    let sum = canValue + chiValue;
    if (sum > 5) sum -= 5;
    
    const MENH_MAP = { 1: "Kim", 2: "Thủy", 3: "Hỏa", 4: "Thổ", 5: "Mộc" };
    return MENH_MAP[sum];
  }

  function tinhLoiKhuyenSucKhoe(hanhMenh, hanhNgay, thangAmLich) {
    let mua = "";
    let hanhMua = "";
    if ([1, 2, 3].includes(thangAmLich)) { mua = "Mùa Xuân"; hanhMua = "Mộc"; }
    else if ([4, 5, 6].includes(thangAmLich)) { mua = "Mùa Hạ"; hanhMua = "Hỏa"; }
    else if ([7, 8, 9].includes(thangAmLich)) { mua = "Mùa Thu"; hanhMua = "Kim"; }
    else { mua = "Mùa Đông"; hanhMua = "Thủy"; }

    let khuyenNghi = [];
    
    if (HanhSinhKhac.khac[hanhMua] === hanhMenh) {
      khuyenNghi.push(`Đang là ${mua} (${hanhMua} vượng) khắc Bản Mệnh (${hanhMenh}). Cơ thể dễ suy nhược, cần nghỉ ngơi, bồi bổ năng lượng.`);
    }

    if (hanhMenh === "Kim" && hanhNgay === "Hỏa") {
      khuyenNghi.push("Hôm nay Hỏa khí mạnh, dễ gây áp lực cho hệ hô hấp (Phế). Nên uống trà thảo mộc, bổ sung thức ăn có vị ngọt (Thổ) để dưỡng Phế, giữ tâm thái bình hòa.");
    } else if (hanhMenh === "Kim" && hanhMua === "Hỏa") {
      khuyenNghi.push("Trong Mùa Hạ (Hỏa), cần chú ý bồi bổ tỳ vị (vị ngọt) để sinh Phế (Kim), tránh đồ ăn quá đắng (Hỏa) tổn hao tâm khí.");
    } else {
      if (HanhSinhKhac.khac[hanhNgay] === hanhMenh) {
        let sinhMenh = Object.keys(HanhSinhKhac.sinh).find(k => HanhSinhKhac.sinh[k] === hanhMenh);
        khuyenNghi.push(`Hôm nay hành ${hanhNgay} khắc Bản Mệnh ${hanhMenh}. Nên dùng các thực phẩm thuộc hành ${sinhMenh} để điều hòa cơ thể.`);
      } else if (HanhSinhKhac.sinh[hanhNgay] === hanhMenh) {
        khuyenNghi.push(`Ngày có hành ${hanhNgay} sinh trợ Bản Mệnh. Thể trạng tốt, năng lượng tràn trề để làm việc lớn.`);
      } else {
        khuyenNghi.push(`Ngày bình hòa, không có yếu tố tương khắc mạnh về sức khỏe.`);
      }
    }

    return { mua, hanhMua, khuyenNghi };
  }

  function tinhHuongTot(hanhMenh) {
    const DIRECTIONS = {
      "Kim": ["Tây", "Tây Bắc", "Trung tâm", "Đông Bắc", "Tây Nam"],
      "Mộc": ["Đông", "Đông Nam", "Bắc"],
      "Thủy": ["Bắc", "Tây", "Tây Bắc"],
      "Hỏa": ["Nam", "Đông", "Đông Nam"],
      "Thổ": ["Trung tâm", "Tây Nam", "Đông Bắc", "Nam"]
    };
    const BAD_DIRECTIONS = {
      "Kim": ["Nam", "Đông", "Đông Nam"],
      "Mộc": ["Tây", "Tây Bắc", "Trung tâm"],
      "Thủy": ["Trung tâm", "Tây Nam", "Đông Bắc", "Nam"],
      "Hỏa": ["Bắc", "Tây", "Tây Bắc"],
      "Thổ": ["Đông", "Đông Nam", "Bắc"]
    };
    return {
      tot: DIRECTIONS[hanhMenh] || [],
      xau: BAD_DIRECTIONS[hanhMenh] || []
    };
  }

  function tuongHopNhanSu(menhBan, menhDoiTac) {
    if (HanhSinhKhac.sinh[menhDoiTac] === menhBan) {
      return { level: "Rất Tốt", type: "Sinh trợ", desc: `Đối tác mệnh ${menhDoiTac} sẽ che chở, bồi đắp và mang lại cơ hội cho bạn.` };
    }
    if (menhBan === menhDoiTac) {
      return { level: "Khá", type: "Bình hòa", desc: `Cùng mệnh ${menhBan}, hai bên có sự thấu hiểu, đồng minh vững chắc để thực thi.` };
    }
    if (HanhSinhKhac.sinh[menhBan] === menhDoiTac) {
      return { level: "Trung bình", type: "Sinh xuất", desc: `Bạn sẽ mất nhiều năng lượng để hỗ trợ người mệnh ${menhDoiTac}.` };
    }
    if (HanhSinhKhac.khac[menhBan] === menhDoiTac) {
      return { level: "Kém", type: "Khắc xuất", desc: `Bạn áp chế được họ, nhưng dễ sinh mâu thuẫn. Cần cư xử khéo léo.` };
    }
    if (HanhSinhKhac.khac[menhDoiTac] === menhBan) {
      let trungGian = Object.keys(HanhSinhKhac.sinh).find(k => HanhSinhKhac.sinh[k] === menhBan);
      return { level: "Rất Xấu", type: "Bị Khắc", desc: `Họ khắc chế bạn. Tránh cãi vã, nên để họ dẫn dắt hoặc tìm người mệnh ${trungGian} làm trung gian.` };
    }
    return { level: "Không xác định", type: "", desc: "" };
  }

  // --- THUẬT TOÁN TRẠCH NHẬT CÁ NHÂN HÓA ĐA TẦNG (6 LAYERS) ---

  // Tầng 1: Lọc Nền Thiên Văn & Lịch Cổ Điển
  function calculateLayer1_Global(lunar, canNgay, chiNgay) {
    let score = 50; // Base score
    let highlights = [];
    let isHardStop = false;
    const lunarDay = lunar.getDay();

    // 1. Ngày xấu cơ bản
    const tamNuong = [3, 7, 13, 18, 22, 27];
    const nguyetKy = [5, 14, 23];
    
    if (tamNuong.includes(lunarDay)) {
      score -= 30;
      highlights.push("Ngày Tam Nương (Đại Hung)");
      isHardStop = true;
    }
    if (nguyetKy.includes(lunarDay)) {
      score -= 30;
      highlights.push("Ngày Nguyệt Kỵ (Đại Hung)");
      isHardStop = true;
    }
    if (canNgay === "Quý" && chiNgay === "Hợi") {
      score -= 20;
      highlights.push("Ngày Cùng Cực (Quý Hợi)");
    }

    // 2. Thập Nhị Kiến Trừ (12 Trực)
    if (typeof lunar.getZhiXing === 'function') {
      const trucMap = {'建':'Kiến', '除':'Trừ', '满':'Mãn', '平':'Bình', '定':'Định', '执':'Chấp', '破':'Phá', '危':'Nguy', '成':'Thành', '收':'Thâu', '开':'Khai', '闭':'Bế'};
      const truc = lunar.getZhiXing(); 
      const trucVn = trucMap[truc] || truc;
      if (['Khai', 'Thành', 'Mãn', 'Định'].includes(trucVn)) {
        score += 15;
        highlights.push(`Trực ${trucVn} (Đại Cát)`);
      } else if (['Bình', 'Trừ'].includes(trucVn)) {
        score += 5;
        highlights.push(`Trực ${trucVn} (Tiểu Cát)`);
      } else if (['Phá', 'Nguy', 'Bế', 'Chấp'].includes(trucVn)) {
        score -= 15;
        highlights.push(`Trực ${trucVn} (Đại Hung)`);
      } else {
        highlights.push(`Trực ${trucVn} (Bình Hòa)`);
      }
    } else {
      score += 10;
    }

    // 3. Nhị Thập Bát Tú (28 Sao)
    if (typeof lunar.getXiu === 'function') {
      const xiuMap = {
        '角':'Giác', '亢':'Cang', '氐':'Đê', '房':'Phòng', '心':'Tâm', '尾':'Vĩ', '箕':'Cơ',
        '斗':'Đẩu', '牛':'Ngưu', '女':'Nữ', '虚':'Hư', '危':'Nguy', '室':'Thất', '壁':'Bích',
        '奎':'Khuê', '娄':'Lâu', '胃':'Vị', '昴':'Mão', '毕':'Tất', '觜':'Chủy', '参':'Sâm',
        '井':'Tỉnh', '鬼':'Quỷ', '柳':'Liễu', '星':'Tinh', '张':'Trương', '翼':'Dực', '轸':'Chẩn'
      };
      const sao = lunar.getXiu();
      const saoVn = xiuMap[sao] || sao;
      const saoCat = ['Giác', 'Phòng', 'Vĩ', 'Đẩu', 'Thất', 'Bích', 'Lâu', 'Vị', 'Tất', 'Sâm', 'Tỉnh', 'Trương', 'Dực', 'Chẩn'];
      const saoHung = ['Cang', 'Đê', 'Tâm', 'Ngưu', 'Nữ', 'Hư', 'Nguy', 'Khuê', 'Mão', 'Chủy', 'Quỷ', 'Liễu', 'Tinh'];
      if (saoCat.includes(saoVn)) {
        score += 10;
        highlights.push(`Sao ${saoVn} (Tú Tốt)`);
      } else if (saoHung.includes(saoVn)) {
        score -= 10;
        highlights.push(`Sao ${saoVn} (Tú Xấu)`);
      }
    }

    // 4. Lục Diệu - Hoàng Đạo / Hắc Đạo
    if (typeof lunar.getDayTianShen === 'function') {
      const tianShenMap = {
        '青龙':'Thanh Long', '明堂':'Minh Đường', '天刑':'Thiên Hình', '朱雀':'Chu Tước',
        '金匮':'Kim Quỹ', '天德':'Thiên Đức', '白虎':'Bạch Hổ', '玉堂':'Ngọc Đường',
        '天牢':'Thiên Lao', '玄武':'Huyền Vũ', '司命':'Tư Mệnh', '勾陈':'Câu Trận'
      };
      const tianShen = lunar.getDayTianShen();
      const tianShenVn = tianShenMap[tianShen] || tianShen;
      const tianShenType = typeof lunar.getDayTianShenType === 'function' ? lunar.getDayTianShenType() : '';
      if (tianShenType === '黄道' || tianShenType === 'Hoàng Đạo') {
        score += 15;
        highlights.push(`${tianShenVn} (Hoàng Đạo)`);
      } else if (tianShenType === '黑道' || tianShenType === 'Hắc Đạo') {
        score -= 15;
        highlights.push(`${tianShenVn} (Hắc Đạo)`);
      }
    }

    return { score: Math.max(0, Math.min(100, score)), highlights, isHardStop };
  }

  // Tầng 2: Tương Khắc Can Chi Bát Tự Cá Nhân
  function calculateLayer2_CanChi(canNgay, chiNgay, hanhNgay, userProfile) {
    let score = 50;
    let highlights = [];
    
    const { canNam, chiNam, hanhMenh } = userProfile;

    // Can
    const canHop = { "Giáp": "Kỷ", "Kỷ": "Giáp", "Ất": "Canh", "Canh": "Ất", "Bính": "Tân", "Tân": "Bính", "Đinh": "Nhâm", "Nhâm": "Đinh", "Mậu": "Quý", "Quý": "Mậu" };
    const canPha = { "Giáp": "Mậu", "Mậu": "Nhâm", "Nhâm": "Bính", "Bính": "Canh", "Canh": "Giáp", "Ất": "Kỷ", "Kỷ": "Quý", "Quý": "Đinh", "Đinh": "Tân", "Tân": "Ất" }; 

    if (canHop[canNgay] === canNam) {
      score += 15;
      highlights.push(`Thiên Can tương hợp (${canNgay} hợp ${canNam})`);
    } else if (canPha[canNgay] === canNam || canPha[canNam] === canNgay) {
      score -= 15;
      highlights.push(`Thiên Can tương phá (${canNgay} - ${canNam})`);
    }

    // Chi
    const tamHop = [ ["Dần", "Ngọ", "Tuất"], ["Thân", "Tý", "Thìn"], ["Tỵ", "Dậu", "Sửu"], ["Hợi", "Mão", "Mùi"] ];
    const nhiHop = { "Tý": "Sửu", "Sửu": "Tý", "Dần": "Hợi", "Hợi": "Dần", "Mão": "Tuất", "Tuất": "Mão", "Thìn": "Dậu", "Dậu": "Thìn", "Tỵ": "Thân", "Thân": "Tỵ", "Ngọ": "Mùi", "Mùi": "Ngọ" };
    const lucXung = { "Tý": "Ngọ", "Ngọ": "Tý", "Sửu": "Mùi", "Mùi": "Sửu", "Dần": "Thân", "Thân": "Dần", "Mão": "Dậu", "Dậu": "Mão", "Thìn": "Tuất", "Tuất": "Thìn", "Tỵ": "Hợi", "Hợi": "Tỵ" };

    let isTamHop = tamHop.some(group => group.includes(chiNgay) && group.includes(chiNam));
    if (isTamHop || nhiHop[chiNgay] === chiNam) {
      score += 20;
      highlights.push(`Địa Chi hòa hợp (${chiNgay} hợp ${chiNam})`);
    } else if (lucXung[chiNgay] === chiNam) {
      score -= 40;
      highlights.push(`Lục Xung Tuổi (${chiNgay} xung ${chiNam}) - ĐẠI KỴ`);
    }

    // Ngũ Hành
    const hanhSinh = { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" };
    const hanhKhac = { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" };

    if (hanhSinh[hanhNgay] === hanhMenh) {
      score += 10;
      highlights.push(`Ngày sinh Mệnh (${hanhNgay} sinh ${hanhMenh})`);
    } else if (hanhSinh[hanhMenh] === hanhNgay) {
      score += 5;
      highlights.push(`Mệnh sinh Ngày (${hanhMenh} sinh ${hanhNgay})`);
    } else if (hanhKhac[hanhNgay] === hanhMenh) {
      score -= 10;
      highlights.push(`Ngày khắc Mệnh (${hanhNgay} khắc ${hanhMenh})`);
    } else if (hanhNgay === hanhMenh) {
      score += 5;
    }

    return { score: Math.max(0, Math.min(100, score)), highlights };
  }

  // Tầng 3: Tứ Hóa & Lưu Sao Tử Vi
  function calculateLayer3_ZiWei(canNgay, chiNgay, userChart) {
    let score = 50;
    let highlights = [];

    const LOC_TON = { "Giáp": "Dần", "Ất": "Mão", "Bính": "Tỵ", "Mậu": "Tỵ", "Đinh": "Ngọ", "Kỷ": "Ngọ", "Canh": "Thân", "Tân": "Dậu", "Nhâm": "Hợi", "Quý": "Tý" };
    const HOA_KY = { "Giáp": "Thái Dương", "Ất": "Thái Âm", "Bính": "Liêm Trinh", "Đinh": "Cự Môn", "Mậu": "Thiên Cơ", "Kỷ": "Văn Khúc", "Canh": "Thiên Đồng", "Tân": "Văn Xương", "Nhâm": "Vũ Khúc", "Quý": "Tham Lang" };
    const HOA_LOC = { "Giáp": "Liêm Trinh", "Ất": "Thiên Cơ", "Bính": "Thiên Đồng", "Đinh": "Thái Âm", "Mậu": "Tham Lang", "Kỷ": "Vũ Khúc", "Canh": "Thái Dương", "Tân": "Cự Môn", "Nhâm": "Thiên Lương", "Quý": "Phá Quân" };
    const THIEN_MA = { "Dần": "Thân", "Ngọ": "Thân", "Tuất": "Thân", "Thân": "Dần", "Tý": "Dần", "Thìn": "Dần", "Tỵ": "Hợi", "Dậu": "Hợi", "Sửu": "Hợi", "Hợi": "Tỵ", "Mão": "Tỵ", "Mùi": "Tỵ" };

    let luuLocTonCung = LOC_TON[canNgay];
    let luuThienMaCung = THIEN_MA[chiNgay];
    const CUNG_IDX = { "Tý": 0, "Sửu": 1, "Dần": 2, "Mão": 3, "Thìn": 4, "Tỵ": 5, "Ngọ": 6, "Mùi": 7, "Thân": 8, "Dậu": 9, "Tuất": 10, "Hợi": 11 };
    
    let lT_idx = CUNG_IDX[luuLocTonCung];
    let tM_idx = luuThienMaCung ? CUNG_IDX[luuThienMaCung] : -1;
    
    const chart = (userChart && userChart.tu_vi_chart) ? userChart.tu_vi_chart : (userChart || {});
    if (lT_idx === chart.menh_cung_idx || lT_idx === chart.tai_bach_idx || lT_idx === chart.quan_loc_idx) {
      score += 25;
      highlights.push(`Lưu Lộc Tồn chiếu Tam hợp Mệnh/Tài/Quan`);
    }
    if (tM_idx === chart.thien_di_idx) {
      score += 15;
      highlights.push(`Lưu Thiên Mã chiếu cung Thiên Di (Tốt đi xa)`);
    }
    if (HOA_KY[canNgay] === "Thiên Đồng" || HOA_KY[canNgay] === "Thái Âm") {
      score -= 25;
      highlights.push(`Lưu Hóa Kị giáng Mệnh (${HOA_KY[canNgay]} Hóa Kị)`);
    }
    if (HOA_LOC[canNgay] === "Thiên Đồng" || HOA_LOC[canNgay] === "Thái Âm") {
      score += 25;
      highlights.push(`Lưu Hóa Lộc giáng Mệnh (${HOA_LOC[canNgay]} Hóa Lộc)`);
    }

    return { score: Math.max(0, Math.min(100, score)), highlights };
  }

  // Tầng 4: Trọng số theo mục đích
  function calculateLayer4_Task(taskType, layerData) {
    let score = 50;
    let highlights = [];
    const allHighlights = [...layerData.layer1.highlights, ...layerData.layer2.highlights, ...layerData.layer3.highlights].join(" | ");

    if (taskType === "CONTRACT_SIGNING") {
      if (allHighlights.includes("Lộc Tồn") || allHighlights.includes("Hóa Lộc")) {
        score += 20;
        highlights.push("Tuyệt vời cho Ký hợp đồng (Có Lộc tinh)");
      }
      if (allHighlights.includes("Hóa Kị") || allHighlights.includes("Xung")) {
        score -= 20;
        highlights.push("Kỵ Ký hợp đồng (Có Hung/Xung tinh)");
      }
    } else if (taskType === "TRAVEL") {
      if (allHighlights.includes("Thiên Mã") || allHighlights.includes("Hoàng Đạo")) {
        score += 20;
        highlights.push("Tuyệt vời để Xuất hành (Thiên Mã / Hoàng Đạo)");
      }
    } else if (taskType === "MARRIAGE") {
      if (allHighlights.includes("hòa hợp")) {
        score += 15;
        highlights.push("Thuận lợi cho Gia đạo (Hòa hợp Can Chi)");
      }
      if (allHighlights.includes("Nguyệt Kỵ") || allHighlights.includes("Tam Nương") || allHighlights.includes("Hắc Đạo")) {
        score -= 25;
        highlights.push("Đại kỵ Cưới hỏi (Ngày xấu)");
      }
    } else if (taskType === "HEALTH") {
       if (allHighlights.includes("Hóa Kị") || allHighlights.includes("Đại Hung")) {
         score -= 20;
         highlights.push("Bất lợi cho Chữa bệnh (Cảnh báo Hung tinh)");
       }
    } else {
      score = 70; // GENERAL default
    }

    return { score: Math.max(0, Math.min(100, score)), highlights };
  }

  // Tầng 5: Năng Lượng Quẻ Dịch (I-Ching)
  function calculateLayer5_IChing(lunarYear, lunarMonth, lunarDay) {
    const upperIdx = ((lunarYear + lunarMonth + lunarDay) % 8) || 8;
    const lowerIdx = ((lunarYear + lunarMonth + lunarDay + 1) % 8) || 8;
    const batQuaiNames = ['', 'Càn (Thiên)', 'Đoài (Trạch)', 'Ly (Hỏa)', 'Chấn (Lôi)', 'Tốn (Phong)', 'Khảm (Thủy)', 'Cấn (Sơn)', 'Khôn (Địa)'];
    const hexKey = `${upperIdx}-${lowerIdx}`;
    
    // Mở rộng data Quẻ Dịch và thêm điểm bonus
    const queSimpleData = {
      '1-1': { name: 'Thuần Càn', advice: 'Sức mạnh & Lãnh đạo. Thời cơ thuận lợi tiến lên.', scoreBonus: 10 },
      '8-8': { name: 'Thuần Khôn', advice: 'Nhu thuận & Bền chí. Hợp tác, kiên nhẫn chờ thời.', scoreBonus: 10 },
      '8-1': { name: 'Địa Thiên Thái', advice: 'Thái bình hanh thông. Mọi sự thuận lợi.', scoreBonus: 15 },
      '1-8': { name: 'Thiên Địa Bĩ', advice: 'Bế tắc trở ngại. Nên ẩn nhẫn chờ thời.', scoreBonus: -15 },
      '1-3': { name: 'Hỏa Thiên Đại Hữu', advice: 'Đại thành sung túc. Giữ sự khiêm tốn.', scoreBonus: 15 },
      '3-1': { name: 'Thiên Hỏa Đồng Nhân', advice: 'Đoàn kết hợp tác. Sức mạnh tập thể.', scoreBonus: 10 },
      '6-4': { name: 'Thủy Lôi Truân', advice: 'Khởi đầu gian nan. Chưa nên vội vã.', scoreBonus: -10 },
      '2-8': { name: 'Trạch Lôi Tùy', advice: 'Thuận thời thích nghi. Không cưỡng cầu.', scoreBonus: 5 },
      '7-3': { name: 'Sơn Hỏa Bí', advice: 'Trang sức, bề ngoài rực rỡ. Hợp nghệ thuật.', scoreBonus: 5 },
      '2-6': { name: 'Trạch Thủy Khốn', advice: 'Cùng khốn, nguy hiểm. Rất cẩn trọng.', scoreBonus: -15 },
      '6-5': { name: 'Thủy Phong Tỉnh', advice: 'Nguồn nuôi dưỡng, giếng nước vô tận.', scoreBonus: 10 },
      '4-5': { name: 'Lôi Phong Hằng', advice: 'Lâu dài, bền vững. Phù hợp duy trì.', scoreBonus: 10 }
    };
    
    const queInfo = queSimpleData[hexKey] || {
      name: `${batQuaiNames[upperIdx]} / ${batQuaiNames[lowerIdx]}`,
      advice: 'Giữ tâm bình thản, kiên nhẫn hành động theo thời cơ.',
      scoreBonus: 0
    };

    let highlights = [];
    if (queInfo.scoreBonus > 0) {
      highlights.push(`Quẻ ${queInfo.name} (Tốt): ${queInfo.advice}`);
    } else if (queInfo.scoreBonus < 0) {
      highlights.push(`Quẻ ${queInfo.name} (Xấu): ${queInfo.advice}`);
    }

    return { scoreBonus: queInfo.scoreBonus, highlights, queInfo };
  }

  // Tầng 6: Nhịp Sinh Học Biorhythm
  function calculateLayer6_Biorhythm(dateObj, userProfile) {
    if (!userProfile || !userProfile.birth_date_solar) return { scoreBonus: 0, highlights: [] };
    const dBirth = new Date(userProfile.birth_date_solar);
    const diffTime = Math.abs(dateObj - dBirth);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const physical = Math.round(Math.sin((2 * Math.PI * diffDays) / 23) * 100);
    const emotional = Math.round(Math.sin((2 * Math.PI * diffDays) / 28) * 100);
    const intellectual = Math.round(Math.sin((2 * Math.PI * diffDays) / 33) * 100);
    
    let scoreBonus = 0;
    let highlights = [];
    if (physical > 60 && emotional > 60 && intellectual > 60) {
      scoreBonus = 10;
      highlights.push("Sóng Sinh Học: Golden Synergy (Thăng hoa)");
    } else if (physical < -50 && emotional < -50 && intellectual < -50) {
      scoreBonus = -10;
      highlights.push("Sóng Sinh Học: Red Alert (Cơ thể cạn kiệt)");
    } else if (Math.abs(physical) < 10 || Math.abs(emotional) < 10 || Math.abs(intellectual) < 10) {
      scoreBonus = -5;
      highlights.push("Sóng Sinh Học: Critical Day (Bất ổn định)");
    }
    
    return { scoreBonus, highlights, physical, emotional, intellectual };
  }

  // Hàm Tổng Trạch Nhật Cá Nhân Hóa Đa Tầng
  function evaluatePersonalizedDay(dateObj, userProfile, taskType = "GENERAL") {
    if (typeof Lunar === 'undefined') return null;
    const lunar = Lunar.fromDate(dateObj);
    
    const lunarYear = lunar.getYear();
    const lunarDay = lunar.getDay();
    const lunarMonth = Math.abs(lunar.getMonth());
    const canNgayIdx = lunar.getDayGanIndex();
    const canNgay = CAN[canNgayIdx];
    const chiNgayIdx = lunar.getDayZhiIndex();
    const chiNgay = CHI[chiNgayIdx];
    const hanhNgay = NGU_HANH_CAN[canNgay];

    const l1 = calculateLayer1_Global(lunar, canNgay, chiNgay);
    const l2 = calculateLayer2_CanChi(canNgay, chiNgay, hanhNgay, userProfile);
    const l3 = calculateLayer3_ZiWei(canNgay, chiNgay, userProfile.tu_vi_chart);
    
    const layerData = { layer1: l1, layer2: l2, layer3: l3 };
    const l4 = calculateLayer4_Task(taskType, layerData);
    
    // Tích hợp Tầng 5 - Quẻ Dịch
    const l5 = calculateLayer5_IChing(lunarYear, lunarMonth, lunarDay);

    // Tích hợp Tầng 6 - Nhịp Sinh Học
    const l6 = calculateLayer6_Biorhythm(dateObj, userProfile);

    // Cân bằng trọng số (Tổng 100%)
    const W1 = 0.20, W2 = 0.25, W3 = 0.35, W4 = 0.20; 
    let P_HardStop = l1.isHardStop || layerData.layer2.highlights.some(h => h.includes("Lục Xung Tuổi")) ? 50 : 0;
    
    // Tổng hợp điểm: S = W1*L1 + W2*L2 + W3*L3 + W4*L4 + L5_Bonus + L6_Bonus - HardStop
    let S = (W1 * l1.score) + (W2 * l2.score) + (W3 * l3.score) + (W4 * l4.score) + l5.scoreBonus + l6.scoreBonus - P_HardStop;
    S = Math.round(Math.max(0, Math.min(100, S)));

    let rating = "ĐẠI HUNG";
    if (S >= 85) rating = "ĐẠI CÁT";
    else if (S >= 70) rating = "TIỂU CÁT";
    else if (S >= 50) rating = "BÌNH HÒA";
    else if (S >= 30) rating = "THẬN TRỌNG";

    let dSolarStr = dateObj.toISOString().split('T')[0];
    let dLunarStr = `${lunar.getYear()}-${lunarMonth}-${lunarDay}`;

    return {
      date_solar: dSolarStr,
      date_lunar: dLunarStr,
      can_chi_date: `${canNgay} ${chiNgay}`,
      total_score: S,
      rating: rating,
      breakdown: {
        layer1_global_score: l1.score,
        layer2_can_chi_score: l2.score,
        layer3_tu_vi_score: l3.score,
        layer4_task_score: l4.score,
        layer5_iching_bonus: l5.scoreBonus,
        layer6_biorhythm_bonus: l6.scoreBonus
      },
      hard_stop_flags: P_HardStop > 0 ? ["Phạm ngày Đại Hung hoặc Xung Tuổi"] : [],
      key_highlights: [
        ...l1.highlights,
        ...l2.highlights,
        ...l3.highlights,
        ...l4.highlights,
        ...l5.highlights,
        ...l6.highlights
      ],
      best_hours: tinhGioHoangDao(chiNgay),
      iching_info: l5.queInfo
    };
  }

  // ── 3. Biorhythm & Waveform Calculation (Nhịp Sinh Học 30 Ngày) ──
  function calculateBiorhythms(birthDate, targetDate) {
    const diffTime = Math.abs(targetDate - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const physical = Math.round(Math.sin((2 * Math.PI * diffDays) / 23) * 100);
    const emotional = Math.round(Math.sin((2 * Math.PI * diffDays) / 28) * 100);
    const intellectual = Math.round(Math.sin((2 * Math.PI * diffDays) / 33) * 100);
    const average = Math.round((physical + emotional + intellectual) / 3);

    let statusTag = "NORMAL";
    if (physical > 60 && emotional > 60 && intellectual > 60) {
      statusTag = "GOLDEN_SYNERGY";
    } else if (physical < -50 && emotional < -50 && intellectual < -50) {
      statusTag = "RED_ALERT";
    } else if (Math.abs(physical) < 10 || Math.abs(emotional) < 10 || Math.abs(intellectual) < 10) {
      statusTag = "CRITICAL_DAY";
    }

    return {
      diffDays,
      physical,
      emotional,
      intellectual,
      average,
      statusTag
    };
  }

  // ── 4. Smart Target Scanner Engine (Săn Ngày Vàng) ──
  function scanGoalDates(startDate, scanDays, goalType, userProfile) {
    if (typeof Lunar === 'undefined') return [];
    
    const results = [];
    const baseDate = new Date(startDate);
    const birthDate = new Date(1990, 0, 1);

    const goalConfig = {
      'EXAM': {
        label: 'Thi Cử / Bảo Vệ Luận Văn',
        icon: '🎓',
        boosters: ['Văn Xương', 'Văn Khúc', 'Hóa Khoa', 'Văn Tinh', 'Thiên Khôi'],
        wenChangDir: 'Đông Nam'
      },
      'INTERVIEW': {
        label: 'Phỏng Vấn / Xin Việc',
        icon: '💼',
        boosters: ['Thiên Khôi', 'Thiên Việt', 'Phong Cáo', 'Hóa Lộc'],
        wenChangDir: 'Nam'
      },
      'PROMOTION': {
        label: 'Trình Sếp / Xin Tăng Lương',
        icon: '👑',
        boosters: ['Hóa Quyền', 'Tử Vi', 'Tướng Quân', 'Thiên Tướng'],
        wenChangDir: 'Tây Bắc'
      },
      'PITCHING': {
        label: 'Ra Mắt / Thuyết Trình Công Chúng',
        icon: '🎤',
        boosters: ['Thái Dương', 'Hỷ Thần', 'Thái Tuế', 'Phong Cáo'],
        wenChangDir: 'Đông'
      }
    };

    const config = goalConfig[goalType] || goalConfig['EXAM'];

    for (let i = 0; i < scanDays; i++) {
      const iterDate = new Date(baseDate);
      iterDate.setDate(baseDate.getDate() + i);

      const dayEval = evaluatePersonalizedDay(iterDate, userProfile, 'GENERAL');
      const bio = calculateBiorhythms(birthDate, iterDate);

      let boosterBonus = 0;
      if (goalType === 'EXAM') boosterBonus += bio.intellectual * 0.2;
      else if (goalType === 'PROMOTION') boosterBonus += bio.physical * 0.15 + bio.intellectual * 0.1;
      else if (goalType === 'INTERVIEW') boosterBonus += bio.emotional * 0.2;
      else if (goalType === 'PITCHING') boosterBonus += bio.emotional * 0.15 + bio.physical * 0.1;

      const finalGoalScore = Math.round(Math.max(0, Math.min(100, (dayEval.total_score * 0.7) + (boosterBonus * 0.3) + 15)));

      results.push({
        date: iterDate,
        dateStr: iterDate.toISOString().split('T')[0],
        formattedDate: iterDate.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }),
        canChi: dayEval.can_chi_date,
        rating: dayEval.rating,
        baseScore: dayEval.total_score,
        goalScore: finalGoalScore,
        biorhythm: bio,
        bestHours: dayEval.best_hours,
        config
      });
    }

    results.sort((a, b) => b.goalScore - a.goalScore);
    return results.slice(0, 3);
  }

  function getKarmaLevelInfo(totalKp) {
    const kp = totalKp || 0;
    const levels = [
      { level: 1, title: 'Người Quan Sát', icon: '🌱', minKp: 0, maxKp: 100, desc: 'Bắt đầu hành trình quan sát tâm tính & ghi nhận vận hạn' },
      { level: 2, title: 'Người Rèn Tâm', icon: '🧘', minKp: 100, maxKp: 500, desc: 'Chủ động hóa giải nết xấu, tích lũy năng lượng tích cực' },
      { level: 3, title: 'Kiến Trúc Sư Cải Mệnh', icon: '🏛️', minKp: 500, maxKp: 2000, desc: 'Chuyển hóa hung hạn thành cơ hội, làm chủ sóng năng lượng' },
      { level: 4, title: 'Bậc Định Tâm', icon: '👑', minKp: 2000, maxKp: 10000, desc: 'Định tại tâm, vô sự tại cảnh, phước huệ tròn đầy' }
    ];

    const current = levels.find(l => kp >= l.minKp && kp < l.maxKp) || levels[levels.length - 1];
    const next = levels[levels.indexOf(current) + 1] || current;
    const progressPct = current === next ? 100 : Math.round(((kp - current.minKp) / (current.maxKp - current.minKp)) * 100);

    return {
      current,
      next,
      kp,
      progressPct
    };
  }

  function generateKarmaQuests(dateStr) {
    const targetDate = dateStr ? new Date(dateStr) : new Date();
    const dayIndex = targetDate.getDate() % 5;

    const remediesPool = [
      {
        id: `q_kinh_duong_${targetDate.getDate()}`,
        targetStar: 'Lưu Kình Dương / Hỏa Tinh',
        nature: 'Sát Tinh',
        title: 'Xả Năng Lượng Kim/Hỏa - Vận Động Cường Độ Cao',
        description: 'Lưu Kình Dương chiếu hôm nay sinh áp lực bứt rứt. Hãy tập 25-30p Cardio/HIIT/Gym hoặc cạo vôi răng/hiến máu để ứng trước năng lượng Huyết quang.',
        kpReward: 25,
        element: 'Fire',
        category: 'daily'
      },
      {
        id: `q_hoa_ki_${targetDate.getDate()}`,
        targetStar: 'Lưu Hóa Kị / Cự Môn',
        nature: 'Sát Tinh',
        title: 'Chuyển Hóa Khẩu Nghiệp - Thực Hành Ái Ngữ',
        description: 'Lưu Hóa Kị dễ gây hiểu lầm, tranh cãi. Tránh tranh luận vô bổ, chủ động khen ngợi và lắng nghe đồng nghiệp/người thân.',
        kpReward: 20,
        element: 'Water',
        category: 'daily'
      },
      {
        id: `q_da_la_${targetDate.getDate()}`,
        targetStar: 'Lưu Đà La / Âm Sát',
        nature: 'Sát Tinh',
        title: 'Độ Trì Tĩnh Tâm - Thiền Định & Decluttering',
        description: 'Lưu Đà La gây chì trệ, suy nghĩ luẩn quẩn. Dành 15 phút thiền định hơi thở và dọn dẹp tối giản 1 góc làm việc.',
        kpReward: 20,
        element: 'Earth',
        category: 'daily'
      },
      {
        id: `q_dia_khong_${targetDate.getDate()}`,
        targetStar: 'Lưu Địa Không / Địa Kiếp',
        nature: 'Sát Tinh',
        title: 'Thực Hành Tự Xả Tài - Hành Thiện Từ Thiện',
        description: 'Địa Không/Kiếp chủ về mất tài lộc đột ngột. Hãy chủ động quyên góp 10-50k vào quỹ từ thiện hoặc mua thức ăn cho động vật lang thang.',
        kpReward: 30,
        element: 'Water',
        category: 'daily'
      },
      {
        id: `q_hoa_khoa_${targetDate.getDate()}`,
        targetStar: 'Lưu Hóa Khoa / Văn Xương',
        nature: 'Cát Tinh',
        title: 'Hấp Thu Trí Tuệ - Đọc Sách & Ngâm Chân Thảo Dược',
        description: 'Cát tinh Hóa Khoa chiếu phương vị tri thức. Đọc 20 trang sách mới và dành 20 phút ngâm chân thảo dưỡng sinh.',
        kpReward: 15,
        element: 'Wood',
        category: 'daily'
      }
    ];

    const selected = [
      remediesPool[dayIndex % remediesPool.length],
      remediesPool[(dayIndex + 2) % remediesPool.length],
      remediesPool[(dayIndex + 4) % remediesPool.length]
    ];

    return selected;
  }

  function calculateFlyingStars(year, month, day) {
    // Flying Stars for Period 9 (Vận 9: 2024-2043)
    const sectors = [
      { id: 'North', name: 'Bắc', star: 1, starName: 'Nhất Bạch (Tham Lang)', element: 'Water', nature: 'Auspicious', icon: '🟢', desc: 'Chủ về sáng tạo, tri thức, học vấn & ngoại giao', ziweiNote: 'Cát vị cho đọc sách & tư duy' },
      { id: 'NorthEast', name: 'Đông Bắc', star: 4, starName: 'Tứ Lục (Văn Xương)', element: 'Wood', nature: 'Auspicious', icon: '🟢', desc: 'Chủ về thi cử, sáng tác, học thuật & tài hoa', ziweiNote: 'Đặt sách vở / tài liệu chiến lược' },
      { id: 'East', name: 'Đông', star: 3, starName: 'Tam Bích (Lộc Tồn)', element: 'Wood', nature: 'Inauspicious', icon: '🔴', desc: 'Dễ phát sinh tranh chấp, bất đồng hoặc thị phi', ziweiNote: 'Tránh tranh luận gay gắt ở góc này' },
      { id: 'SouthEast', name: 'Đông Nam', star: 8, starName: 'Bát Bạch (Tả Phụ)', element: 'Earth', nature: 'Auspicious', icon: '🟢', desc: 'Chủ về tài lộc tích lũy, bất động sản & tài chính', ziweiNote: '⚡ Cung Tiền Tài Đột Biến (Lưu Lộc Tồn)' },
      { id: 'South', name: 'Nam', star: 9, starName: 'Cửu Tử (Hữu Bật)', element: 'Fire', nature: 'Auspicious', icon: '🌟', desc: 'Vượng khí Vận 9! Chủ về danh tiếng, hợp đồng & chốt deal', ziweiNote: '🔥 Đặt Laptop / Điện thoại chốt deal' },
      { id: 'SouthWest', name: 'Tây Nam', star: 2, starName: 'Nhị Hắc (Bệnh Phù)', element: 'Earth', nature: 'Inauspicious', icon: '🔴', desc: 'Chủ về sức khỏe mệt mỏi, trì trệ thể trạng', ziweiNote: 'Đặt Chuông gió Kim loại để tiết khí Thổ' },
      { id: 'West', name: 'Tây', star: 7, starName: 'Thất Xích (Phá Quân)', element: 'Kim', nature: 'Inauspicious', icon: '🔴', desc: 'Chủ về mất mát tài sản hoặc va chạm nhỏ', ziweiNote: 'Giữ sạch sẽ, không đặt quạt lớn' },
      { id: 'NorthWest', name: 'Tây Bắc', star: 6, starName: 'Lục Bạch (Vũ Khúc)', element: 'Kim', nature: 'Auspicious', icon: '🟢', desc: 'Chủ về uy tín, quyền lực & vị thế quản lý', ziweiNote: 'Tốt cho danh thiếp & con dấu' },
      { id: 'Center', name: 'Trung Cung', star: 5, starName: 'Ngũ Hoàng (Liêm Trinh)', element: 'Earth', nature: 'Critical', icon: '⚠️', desc: 'Đại Sát Tinh! Tránh xáo động, cần tiết khí bằng Kim', ziweiNote: '⚠️ Cung Yên Tĩnh Cần Hóa Giải' }
    ];

    return sectors;
  }

  function evaluateMicroSpaceEnergy(deskItemsGrid) {
    const sectors = calculateFlyingStars();
    let score = 70;
    const recommendations = [];

    sectors.forEach(sec => {
      const item = deskItemsGrid && deskItemsGrid[sec.id];
      if (item) {
        if (sec.nature === 'Auspicious') {
          score += 5;
          recommendations.push(`✅ Góc ${sec.name} (${sec.starName}) được kích hoạt tốt với ${item.label}.`);
        } else if (sec.nature === 'Critical' || sec.nature === 'Inauspicious') {
          if (item.element === 'Kim' || item.id === 'metal_bell' || item.id === 'water_cup') {
            score += 10;
            recommendations.push(`✨ Đã hóa giải hung khí góc ${sec.name} (${sec.starName}) bằng ${item.label}.`);
          } else {
            score -= 8;
            recommendations.push(`⚠️ Góc ${sec.name} (${sec.starName}) có xung đột năng lượng với ${item.label}. Nên thay bằng đồ Kim loại.`);
          }
        }
      }
    });

    return {
      score: Math.max(20, Math.min(100, score)),
      recommendations
    };
  }

  const CANH_GIO = [
    { chi: 'Tý',   label: '23:00 - 01:00', endH: 1,  start: 23, kinh: 'Kinh Đởm (Túi mật)', hanhDong: 'Ngủ sâu để thải độc. Tránh thức khuya.' },
    { chi: 'Sửu',  label: '01:00 - 03:00', endH: 3,  start: 1,  kinh: 'Kinh Can (Gan)', hanhDong: 'Ngủ say. Gan cần nghỉ ngơi tuyệt đối.' },
    { chi: 'Dần',  label: '03:00 - 05:00', endH: 5,  start: 3,  kinh: 'Kinh Phế (Phổi)', hanhDong: 'Khí huyết điều hòa. Thiền định nhẹ nhàng.' },
    { chi: 'Mão',  label: '05:00 - 07:00', endH: 7,  start: 5,  kinh: 'Kinh Đại Trường', hanhDong: 'Vận động nhẹ, uống nước lọc ấm.' },
    { chi: 'Thìn', label: '07:00 - 09:00', endH: 9,  start: 7,  kinh: 'Kinh Vị (Dạ dày)', hanhDong: 'Ăn sáng dinh dưỡng, lập kế hoạch ngày.' },
    { chi: 'Tỵ',   label: '09:00 - 11:00', endH: 11, start: 9,  kinh: 'Kinh Tỳ (Lách)', hanhDong: 'Tư duy chiến lược, tập trung công việc.' },
    { chi: 'Ngọ',  label: '11:00 - 13:00', endH: 13, start: 11, kinh: 'Kinh Tâm (Tim)', hanhDong: 'Nghỉ trưa 15-30 phút dưỡng tâm khí.' },
    { chi: 'Mùi',  label: '13:00 - 15:00', endH: 15, start: 13, kinh: 'Kinh Tiểu Trường', hanhDong: 'Xử lý giấy tờ, giao tiếp khách hàng.' },
    { chi: 'Thân', label: '15:00 - 17:00', endH: 17, start: 15, kinh: 'Kinh Bàng Quang', hanhDong: 'Tỉnh táo làm việc, bổ sung đủ nước.' },
    { chi: 'Dậu',  label: '17:00 - 19:00', endH: 19, start: 17, kinh: 'Kinh Thận', hanhDong: 'Tập thể thao, ăn tối nhẹ nhàng.' },
    { chi: 'Tuất', label: '19:00 - 21:00', endH: 21, start: 19, kinh: 'Kinh Tâm Bào', hanhDong: 'Thư giãn gia đình, đọc sách đúc kết.' },
    { chi: 'Hợi',  label: '21:00 - 23:00', endH: 23, start: 21, kinh: 'Kinh Tam Tiêu', hanhDong: 'Tắt thiết bị điện tử, đi ngủ sớm.' }
  ];

  const HOANG_DAO_MAP = {
    'Tý':   ['Tý','Sửu','Mão','Ngọ','Thân','Dậu'],
    'Ngọ':  ['Tý','Sửu','Mão','Ngọ','Thân','Dậu'],
    'Sửu':  ['Dần','Mão','Tỵ','Thân','Tuất','Hợi'],
    'Mùi':  ['Dần','Mão','Tỵ','Thân','Tuất','Hợi'],
    'Dần':  ['Tý','Sửu','Thìn','Tỵ','Mùi','Tuất'],
    'Thân': ['Tý','Sửu','Thìn','Tỵ','Mùi','Tuất'],
    'Mão':  ['Dần','Mão','Ngọ','Mùi','Dậu','Tý'],
    'Dậu':  ['Dần','Mão','Ngọ','Mùi','Dậu','Tý'],
    'Thìn': ['Dần','Thìn','Tỵ','Thân','Dậu','Hợi'],
    'Tuất': ['Dần','Thìn','Tỵ','Thân','Dậu','Hợi'],
    'Tỵ':   ['Sửu','Thìn','Ngọ','Mùi','Tuất','Hợi'],
    'Hợi':  ['Sửu','Thìn','Ngọ','Mùi','Tuất','Hợi']
  };

  const LUC_DIEU_NAMES = ['Đại An', 'Lưu Niên', 'Tốc Hỷ', 'Xích Khẩu', 'Không Vong', 'Tiểu Cát'];
  const LUC_DIEU_SCORES = [20, -10, 15, -15, -15, 15];

  function evaluateHourlyRhythm(dateObj, userProfile) {
    let chiNgay = 'Tý';
    let lunarDay = dateObj ? dateObj.getDate() : new Date().getDate();
    const d = dateObj || new Date();

    if (typeof Lunar !== 'undefined') {
      try {
        const lunar = Lunar.fromDate(d);
        lunarDay = lunar.getDay();
        chiNgay = CUNG[lunar.getDayZhiIndex()] || 'Tý';
      } catch(e) {
        chiNgay = 'Tý';
      }
    }

    const hoangDaoList = HOANG_DAO_MAP[chiNgay] || [];
    const LUC_XUNG = { 'Tý':'Ngọ','Ngọ':'Tý','Sửu':'Mùi','Mùi':'Sửu','Dần':'Thân','Thân':'Dần','Mão':'Dậu','Dậu':'Mão','Thìn':'Tuất','Tuất':'Thìn','Tỵ':'Hợi','Hợi':'Tỵ' };
    const TAM_HOP = {
      'Thìn': ['Thân', 'Tý'], 'Thân': ['Thìn', 'Tý'], 'Tý': ['Thìn', 'Thân'],
      'Dậu': ['Tỵ', 'Sửu'], 'Tỵ': ['Dậu', 'Sửu'], 'Sửu': ['Dậu', 'Tỵ']
    };

    const chiMenh = userProfile?.chiNam || 'Thìn';

    const hours = CANH_GIO.map((g, idx) => {
      let score = 50;
      let status = 'BINH_HOA';
      let highlights = [];

      const isHoangDao = hoangDaoList.includes(g.chi);
      if (isHoangDao) { score += 20; highlights.push('🌟 Hoàng Đạo'); }
      else { score -= 15; highlights.push('⚫ Hắc Đạo'); }

      const startLucDieu = (lunarDay - 1) % 6;
      const dieuIdx = (startLucDieu + idx) % 6;
      const lucDieuName = LUC_DIEU_NAMES[dieuIdx];
      score += LUC_DIEU_SCORES[dieuIdx];
      highlights.push(`Lục Diệu: ${lucDieuName}`);

      if (LUC_XUNG[chiMenh] === g.chi) { score -= 35; highlights.push(`⚠️ Lục Xung Tuổi (${g.chi})`); }
      else if (TAM_HOP[chiMenh] && TAM_HOP[chiMenh].includes(g.chi)) { score += 15; highlights.push('✨ Tam Hợp Tuổi'); }

      score = Math.max(10, Math.min(99, score));
      if (score >= 85) status = 'DAI_CAT';
      else if (score >= 70) status = 'TIEU_CAT';
      else if (score >= 50) status = 'BINH_HOA';
      else if (score >= 35) status = 'THAN_TRONG';
      else status = 'XUNG_MENH';

      return { ...g, score, status, highlights, lucDieu: lucDieuName, isHoangDao };
    });

    return { dateObj: d, chiNgay, lunarDay, hours };
  }

  function getMasterDailyIntelligence(dateObj, userProfile, taskType) {
    const d = dateObj || new Date();
    const task = taskType || 'GENERAL';
    const profile = userProfile || { canNam: 'Canh', chiNam: 'Thìn', hanhMenh: 'Kim' };

    let canNgay = 'Giáp';
    let chiNgay = 'Tý';
    let hanhNgay = 'Kim';
    let lunarDay = d.getDate();
    let lunarMonth = d.getMonth() + 1;
    let lunarYear = d.getFullYear();
    let lunarStr = '';

    if (typeof Lunar !== 'undefined') {
      try {
        const lunar = Lunar.fromDate(d);
        lunarDay = lunar.getDay();
        lunarMonth = Math.abs(lunar.getMonth());
        lunarYear = lunar.getYear();
        canNgay = CAN[lunar.getDayGanIndex()] || 'Giáp';
        chiNgay = CUNG[lunar.getDayZhiIndex()] || 'Tý';
        hanhNgay = NGU_HANH_CAN[canNgay] || 'Kim';
        lunarStr = `Âm: Mùng ${lunarDay}/${lunarMonth} năm ${lunar.getYearInGanZhi()} (${canNgay} ${chiNgay})`;
      } catch (e) {
        lunarStr = `Âm: ${lunarDay}/${lunarMonth}/${lunarYear}`;
      }
    }

    const scoreResult = evaluatePersonalizedDay(d, profile, task);

    let birthDate = new Date(1990, 0, 1);
    if (profile && profile.birthYear) {
      birthDate = new Date(profile.birthYear, 0, 1);
    }
    const biorhythms = calculateBiorhythms(birthDate, d);
    const hourlyRhythm = evaluateHourlyRhythm(d, profile);

    const remedyDB = {
      'Kim': { element: 'Kim', icon: '⚪', wardrobe: { colors: ['Trắng', 'Bạc', 'Ghi nhạt', 'Kem'], accessories: 'Đồng hồ kim loại, trang sức bạc', avoidColors: ['Đỏ', 'Cam', 'Tím'] }, dietary: { organ: '🫁 Phổi & Đại Trường', tea: 'Trà Hoa Nhài, Trà Bá Tước', breakfast: 'Nấm tuyết chưng đường phèn, súp củ cải', time: '05:00 - 07:00 (Giờ Mão)' }, environment: { oil: 'Tinh dầu Hoa Nhài, Sả Chanh', frequency: '741 Hz — Giải độc, tỉnh táo' }, mindset: 'Kiểm tra kỹ văn bản, hợp đồng trước khi ký.' },
      'Mộc': { element: 'Mộc', icon: '🍃', wardrobe: { colors: ['Xanh lá', 'Xanh ngọc', 'Xanh rêu'], accessories: 'Vòng tay gỗ trầm hương, ngọc thạch', avoidColors: ['Trắng', 'Bạc'] }, dietary: { organ: '🫀 Gan & Mật', tea: 'Trà Xanh Sencha, Trà Matcha, Trà Hoa Cúc', breakfast: 'Sinh tố bơ xanh, nước ép táo xanh', time: '01:00 - 03:00 (Giờ Sửu)' }, environment: { oil: 'Tinh dầu Bạc Hà, Hương Thảo', frequency: '528 Hz — Tái tạo tế bào' }, mindset: 'Giữ tâm ôn hòa, không nóng vội.' },
      'Thủy': { element: 'Thủy', icon: '🌊', wardrobe: { colors: ['Đen', 'Xanh navy', 'Xanh đen'], accessories: 'Thạch anh đen, Sapphire', avoidColors: ['Vàng', 'Nâu đất'] }, dietary: { organ: '🧠 Thận & Bàng Quang', tea: 'Trà Đỗ Đen Rang, Trà Đông Trùng', breakfast: 'Hạt óc chó, cháo mè đen, rong biển', time: '17:00 - 19:00 (Giờ Dậu)' }, environment: { oil: 'Tinh dầu Lavender, Tuyết Tùng', frequency: '432 Hz — Định tâm, giảm căng thẳng' }, mindset: 'Lắng nghe trực giác và kiên nhẫn.' },
      'Hỏa': { element: 'Hỏa', icon: '🔥', wardrobe: { colors: ['Đỏ', 'Hồng', 'Tím', 'Cam'], accessories: 'Thạch anh hồng, điểm nhấn khăn/caravat ấm', avoidColors: ['Đen', 'Xanh navy'] }, dietary: { organ: '❤️ Tâm & Tiểu Trường', tea: 'Trà Táo Đỏ Kỷ Tử, Trà Tía Tô', breakfast: 'Cà chua, dâu tây, hạt macca', time: '11:00 - 13:00 (Giờ Ngọ)' }, environment: { oil: 'Tinh dầu Quế, Cam Ngọt', frequency: '639 Hz — Kết nối tình cảm' }, mindset: 'Hào hứng nhưng tránh bốc đồng.' },
      'Thổ': { element: 'Thổ', icon: '🪵', wardrobe: { colors: ['Vàng nâu', 'Nâu đất', 'Be', 'Vàng kem'], accessories: 'Đồ gốm sứ, thạch anh vàng', avoidColors: ['Xanh lá'] }, dietary: { organ: '🫄 Tỳ & Vị (Lách / Dạ dày)', tea: 'Trà Gừng Mật Ong ấm, Trà Cam Thảo', breakfast: 'Cháo hạt sen, khoai lang vàng, súp nóng', time: '07:00 - 09:00 (Giờ Thìn)' }, environment: { oil: 'Tinh dầu Gỗ Trầm, Quế', frequency: '396 Hz — Giải tỏa âu lo' }, mindset: 'Điềm tĩnh, chú trọng thực chất.' }
    };
    const remedy = remedyDB[hanhNgay] || remedyDB['Kim'];

    const thanCatDB = {
      'Giáp': { taiThan: 'Đông Nam', hyThan: 'Đông Bắc', quyNhan: 'Tây Nam' },
      'Ất':   { taiThan: 'Đông', hyThan: 'Bắc', quyNhan: 'Tây' },
      'Bính': { taiThan: 'Nam', hyThan: 'Đông', quyNhan: 'Bắc' },
      'Đinh': { taiThan: 'Đông Nam', hyThan: 'Tây Nam', quyNhan: 'Bắc' },
      'Mậu':  { taiThan: 'Đông Nam', hyThan: 'Bắc', quyNhan: 'Tây Nam' },
      'Kỷ':   { taiThan: 'Tây', hyThan: 'Tây Nam', quyNhan: 'Bắc' },
      'Canh': { taiThan: 'Tây', hyThan: 'Nam', quyNhan: 'Tây Nam' },
      'Tân':  { taiThan: 'Tây Bắc', hyThan: 'Tây', quyNhan: 'Nam' },
      'Nhâm': { taiThan: 'Bắc', hyThan: 'Tây Bắc', quyNhan: 'Đông' },
      'Quý':  { taiThan: 'Bắc', hyThan: 'Bắc Đông', quyNhan: 'Đông' }
    };
    const thanCat = thanCatDB[canNgay] || thanCatDB['Giáp'];

    const l5 = calculateLayer5_IChing(lunarYear, lunarMonth, lunarDay);
    const hexKey = `${((lunarYear + lunarMonth + lunarDay) % 8) || 8}-${((lunarYear + lunarMonth + lunarDay + 1) % 8) || 8}`;
    const movingLine = ((lunarYear + lunarMonth + lunarDay + 1) % 6) || 6;
    const queInfo = l5.queInfo;

    const healthWarnings = [
      { organ: 'Dạ dày & Tiêu hóa', warning: 'Tiêu hóa nhạy cảm. Tránh đồ ăn quá lạnh hoặc kích ứng.' },
      { organ: 'Mắt & Vùng Đầu', warning: 'Mắt dễ mỏi, căng thẳng. Nên chợp mắt nghỉ ngơi 15 phút.' },
      { organ: 'Xương khớp & Máu huyết', warning: 'Vận động nhẹ nhàng, cẩn thận khi lái xe giao thông.' }
    ];
    const healthFocus = healthWarnings[d.getDate() % healthWarnings.length];

    const flyingStars = calculateFlyingStars(d);
    const karmaQuests = generateKarmaQuests(d, profile);
    const shortTermScenarios = generateShortTermScenarios(d, profile, task);

    return {
      dateObj: d,
      lunarStr,
      canNgay,
      chiNgay,
      hanhNgay,
      scoreResult,
      biorhythms,
      hourlyRhythm,
      remedy,
      thanCat,
      queInfo,
      movingLine,
      healthFocus,
      flyingStars,
      karmaQuests,
      shortTermScenarios
    };
  }

  // --- THUẬT TOÁN 3 KỊCH BẢN TƯƠNG LAI NGẮN HẠN & ĐIỀU KIỆN KÍCH HOẠT ---
  function generateShortTermScenarios(dateObj, userProfile, taskType) {
    const d = dateObj || new Date();
    const profile = userProfile || { canNam: 'Canh', chiNam: 'Thìn', hanhMenh: 'Kim' };
    const task = taskType || 'GENERAL';

    const scoreResult = evaluatePersonalizedDay(d, profile, task);
    let birthDate = new Date(1990, 0, 1);
    if (profile && profile.birthYear) {
      birthDate = new Date(profile.birthYear, 0, 1);
    }
    const bio = calculateBiorhythms(birthDate, d);
    const hourly = evaluateHourlyRhythm(d, profile);
    
    let canNgay = 'Giáp';
    let hanhNgay = 'Kim';
    if (typeof Lunar !== 'undefined') {
      try {
        const lunar = Lunar.fromDate(d);
        canNgay = CAN[lunar.getDayGanIndex()] || 'Giáp';
        hanhNgay = NGU_HANH_CAN[canNgay] || 'Kim';
      } catch (e) {}
    }

    const totalScore = scoreResult ? (scoreResult.totalScore || 70) : 70;
    const hoangDaoHours = hourly && hourly.hours ? hourly.hours.filter(h => h.isHoangDao).map(h => h.chi) : ['Tý', 'Ngọ'];
    const bestHoursStr = hoangDaoHours.slice(0, 3).join(', ');

    return {
      favorable: {
        title: '🟢 Kịch Bản Thuận Lợi (Tối Đa Hanh Thông)',
        badgeClass: 'success',
        scoreRange: `${Math.min(99, totalScore + 15)} - 99đ`,
        activationCondition: `Mở đầu đàm phán/hành động vào Giờ Hoàng Đạo (${bestHoursStr}), giữ tâm thế lắng nghe, kiềm chế cái tôi và ứng dụng phong thủy Ngũ hành ngày (${hanhNgay}).`,
        predictedFlow: `Vận khí hanh thông rực rỡ. Đạt 85–95% mục tiêu ${task === 'EXAM' ? 'thi cử' : task === 'CONTRACT' ? 'ký kết' : 'công việc'}, dễ gặp Quý nhân phù trợ và chốt thỏa thuận có lợi.`,
        remedyAction: `Ưu tiên trang phục theo hành ${hanhNgay}, chuẩn bị kỹ tài liệu và chủ động tiến hành công việc trước 11h sáng.`
      },
      neutral: {
        title: '🟡 Kịch Bản Trung Tính (Bình Hòa & Định Tấn)',
        badgeClass: 'warning',
        scoreRange: `${Math.max(50, totalScore - 5)} - ${Math.min(85, totalScore + 5)}đ`,
        activationCondition: `Tuân thủ đúng quy trình sẵn có, làm tròn trách nhiệm, không mạo hiểm đầu tư mới nhưng cũng không phản ứng gắt gao khi gặp trở ngại nhẹ.`,
        predictedFlow: `Diễn biến ổn định đúng tiến độ 65–75%. Tránh được các xung đột bất ngờ, giữ vững thành quả và nguồn lực hiện có.`,
        remedyAction: `Tập trung giải quyết các công việc còn dở dang, uống trà ấm và theo dõi nhịp sinh học.`
      },
      challenging: {
        title: '🔴 Kịch Bản Thách Thức (Cảnh Báo & Phòng Thủ)',
        badgeClass: 'danger',
        scoreRange: `${Math.max(20, totalScore - 25)} - 55đ`,
        activationCondition: `Vội vã quyết định trong Giờ Hắc Đạo, tranh luận nảy lửa, giữ tâm lý bốc đồng hoặc cố chấp ép buộc đối phương theo ý mình.`,
        predictedFlow: `Dễ nảy sinh bất đồng (ảnh hưởng Lục Xung / Nhịp cảm xúc ${bio.emotional || 0}%), hợp đồng bị đình trệ, căng thẳng thần kinh và tổn thất năng lượng.`,
        remedyAction: `Tạm hoãn quyết định lớn trong 24h, mở nhạc tần số định tâm (432Hz/528Hz), ứng xử ôn hòa và rút về phòng thủ.`
      }
    };
  }

  // --- THUẬT TOÁN RADAR CẢNH BÁO SỚM (EARLY WARNING RADAR ENGINE) ---
  function calculateEarlyWarningRadar(userProfile, startDate, daysCount = 7) {
    const start = startDate ? new Date(startDate) : new Date();
    const profile = userProfile || { canNam: 'Canh', chiNam: 'Thìn', hanhMenh: 'Kim' };
    const warnings = [];

    let highConflictDays = [];
    let financeRiskDays = [];
    let careerCautionDays = [];
    let healthRiskDays = [];

    for (let i = 0; i < daysCount; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      const dayIntel = getMasterDailyIntelligence(d, profile, 'GENERAL');
      const dateStr = `${d.getDate()}/${d.getMonth() + 1}`;
      const dayLabel = `Ngày ${dateStr} (${dayIntel.canNgay} ${dayIntel.chiNgay})`;

      // 1. Kiểm tra Mối Quan Hệ & Xung Đột
      const isXungTuoi = dayIntel.scoreResult && dayIntel.scoreResult.lucXung && dayIntel.scoreResult.lucXung.isXung;
      const isEmotionLow = dayIntel.biorhythms && dayIntel.biorhythms.emotional < -40;
      if (isXungTuoi || isEmotionLow) {
        highConflictDays.push({
          dateStr,
          dayLabel,
          reason: isXungTuoi ? `Trực xung tuổi (${dayIntel.chiNgay})` : `Nhịp cảm xúc âm (${dayIntel.biorhythms.emotional}%)`
        });
      }

      // 2. Kiểm tra Tài Chính & Giao Dịch
      const isBadDay = dayIntel.scoreResult && dayIntel.scoreResult.badDayInfo && dayIntel.scoreResult.badDayInfo.isXau;
      const isIntellectLow = dayIntel.biorhythms && dayIntel.biorhythms.intellectual < -40;
      const isBadHexagram = dayIntel.queInfo && (dayIntel.queInfo.name.includes('Bĩ') || dayIntel.queInfo.name.includes('Truân') || dayIntel.queInfo.name.includes('Tùy'));
      if (isBadDay || isIntellectLow || isBadHexagram) {
        financeRiskDays.push({
          dateStr,
          dayLabel,
          reason: isBadDay ? (dayIntel.scoreResult.badDayInfo.errors[0] || 'Ngày xấu') : (isBadHexagram ? `Quẻ Dịch: ${dayIntel.queInfo.name}` : `Nhịp trí tuệ âm (${dayIntel.biorhythms.intellectual}%)`)
        });
      }

      // 3. Kiểm tra Sự Nghiệp & Khởi Đầu
      if (dayIntel.scoreResult && dayIntel.scoreResult.totalScore < 60) {
        careerCautionDays.push({
          dateStr,
          dayLabel,
          reason: `Điểm năng lượng thấp (${dayIntel.scoreResult.totalScore}đ)`
        });
      }

      // 4. Kiểm tra Thể Chất & Sức Khỏe
      if (dayIntel.biorhythms && (dayIntel.biorhythms.physical < -45 || dayIntel.biorhythms.statusTag === 'CRITICAL')) {
        healthRiskDays.push({
          dateStr,
          dayLabel,
          reason: `Nhịp thể lực suy giảm (${dayIntel.biorhythms.physical}%)`
        });
      }
    }

    if (highConflictDays.length > 0) {
      const dates = highConflictDays.map(x => x.dateStr).join(', ');
      warnings.push({
        id: 'rel-conflict',
        domain: 'RELATIONSHIP',
        domainLabel: 'Mối Quan Hệ & Gia Đạo',
        icon: '⚡',
        severity: highConflictDays.length >= 2 ? 'CRITICAL' : 'WARNING',
        title: `${dates}: Dễ nảy sinh xung đột & bất đồng`,
        period: `Các ngày: ${dates}`,
        detail: highConflictDays.map(x => `• ${x.dayLabel}: ${x.reason}`).join('<br/>'),
        remedy: 'Giữ thái độ lắng nghe, tránh tranh luận gay gắt. Dùng vật phẩm Mộc-Thủy để hòa giải.'
      });
    } else {
      warnings.push({
        id: 'rel-smooth',
        domain: 'RELATIONSHIP',
        domainLabel: 'Mối Quan Hệ & Gia Đạo',
        icon: '🕊️',
        severity: 'INFO',
        title: 'Năng lượng giao tiếp 7 ngày tới ôn hòa',
        period: `Cả tuần`,
        detail: 'Cảm xúc và Can Chi tương hợp, thích hợp gặp gỡ đối tác.',
        remedy: 'Thích hợp đàm phán, kết nối tình cảm.'
      });
    }

    if (financeRiskDays.length > 0) {
      const dates = financeRiskDays.map(x => x.dateStr).join(', ');
      warnings.push({
        id: 'fin-caution',
        domain: 'FINANCE',
        domainLabel: 'Tài Chính & Đầu Tư',
        icon: '🛑',
        severity: 'CRITICAL',
        title: `Không nên quyết định tài chính lớn trong các ngày: ${dates}`,
        period: `Các ngày: ${dates}`,
        detail: financeRiskDays.map(x => `• ${x.dayLabel}: ${x.reason}`).join('<br/>'),
        remedy: 'Tạm hoãn giải ngân, rà soát hợp đồng kỹ lưỡng. Không mạo hiểm.'
      });
    } else {
      warnings.push({
        id: 'fin-stable',
        domain: 'FINANCE',
        domainLabel: 'Tài Chính & Đầu Tư',
        icon: '💰',
        severity: 'INFO',
        title: 'Dòng tiền và năng lượng tài chính ổn định',
        period: `Cả tuần`,
        detail: 'Không phạm ngày xấu hay quẻ Dịch trở ngại.',
        remedy: 'Duy trì kế hoạch chi tiêu chuẩn mực.'
      });
    }

    if (careerCautionDays.length > 0) {
      warnings.push({
        id: 'car-advice',
        domain: 'CAREER',
        domainLabel: 'Sự Nghiệp & Khởi Đầu',
        icon: '🎯',
        severity: 'WARNING',
        title: 'Tuần này hợp đàm phán & củng cố hơn là khởi đầu dự án mới',
        period: `${daysCount} ngày tới`,
        detail: `Có ${careerCautionDays.length} ngày điểm năng lượng thấp.`,
        remedy: 'Dùng Smart Target Scanner để chọn Top ngày Cát tường.'
      });
    }

    if (healthRiskDays.length > 0) {
      warnings.push({
        id: 'hea-alert',
        domain: 'HEALTH',
        domainLabel: 'Thân Tâm & Thể Chất',
        icon: '🏥',
        severity: 'WARNING',
        title: 'Chú ý nghỉ ngơi, phòng ngừa mệt mỏi thể chất',
        period: `Các ngày: ${healthRiskDays.map(x => x.dateStr).join(', ')}`,
        detail: healthRiskDays.map(x => `• ${x.dayLabel}: ${x.reason}`).join('<br/>'),
        remedy: 'Nghỉ ngơi đúng giờ, dùng Trà thảo mộc và thiền định.'
      });
    }

    return {
      startDate: start,
      daysCount,
      warnings,
      summaryText: warnings.filter(w => w.severity !== 'INFO').map(w => w.title).join(' • ') || 'Năng lượng 7 ngày tới bình hòa, thuận lợi.'
    };
  }

  function calculateLifeBalanceScores(userProfile, dateObj, customRealScores) {
    const d = dateObj || new Date();
    const profile = userProfile || { birthYear: 1990, canNam: 'Canh', chiNam: 'Thìn', hanhMenh: 'Kim' };

    const birthDate = new Date(profile.birthYear || 1990, 0, 1);
    const bio = calculateBiorhythms(birthDate, d);

    let dayBase = 70;
    if (typeof Lunar !== 'undefined') {
      try {
        const lunar = Lunar.fromDate(d);
        dayBase = 60 + ((lunar.getDay() * 3 + lunar.getMonth() * 5) % 35);
      } catch (e) { dayBase = 70; }
    }

    const astroPotentialScores = {
      health: Math.min(100, Math.max(30, Math.round(dayBase * 0.4 + (bio.physical + 100) * 0.3))),
      career: Math.min(100, Math.max(30, Math.round(dayBase * 0.5 + (bio.intellectual + 100) * 0.25))),
      family: Math.min(100, Math.max(30, Math.round(dayBase * 0.45 + (bio.emotional + 100) * 0.28))),
      relationship: Math.min(100, Math.max(30, Math.round(dayBase * 0.4 + (bio.emotional + 100) * 0.3))),
      finance: Math.min(100, Math.max(30, Math.round(dayBase * 0.5 + (bio.intellectual + 100) * 0.25))),
      knowledge: Math.min(100, Math.max(30, Math.round(dayBase * 0.35 + (bio.intellectual + 100) * 0.32)))
    };

    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem('user_life_balance_scores'));
    } catch (e) {}

    const realScores = customRealScores || saved || {
      health: 75,
      career: 80,
      family: 70,
      relationship: 65,
      finance: 75,
      knowledge: 85
    };

    const pillars = [
      { key: 'health', name: 'Thân Tâm', icon: '🧘', real: realScores.health, astro: astroPotentialScores.health },
      { key: 'career', name: 'Sự Nghiệp', icon: '🎯', real: realScores.career, astro: astroPotentialScores.career },
      { key: 'family', name: 'Gia Đạo', icon: '🏡', real: realScores.family, astro: astroPotentialScores.family },
      { key: 'relationship', name: 'Mối Quan Hệ', icon: '🤝', real: realScores.relationship, astro: astroPotentialScores.relationship },
      { key: 'finance', name: 'Tài Chính', icon: '💰', real: realScores.finance, astro: astroPotentialScores.finance },
      { key: 'knowledge', name: 'Tri Thức', icon: '📚', real: realScores.knowledge, astro: astroPotentialScores.knowledge }
    ];

    const insights = [];
    pillars.forEach(p => {
      const diff = p.real - p.astro;
      if (diff > 15) {
        insights.push(`🔴 <strong>${p.name}</strong>: Đang gồng sức thực tế (${p.real}%) cao hơn xung lực Vận hạn (${p.astro}%). Cần đề phòng quá tải.`);
      } else if (diff < -15) {
        insights.push(`🟢 <strong>${p.name}</strong>: Tiềm năng Vận hạn đang rất tốt (${p.astro}%), nhưng thực tế chưa khai thác hết (${p.real}%). Nên mạnh dạn bứt phá!`);
      }
    });

    if (insights.length === 0) {
      insights.push('🟢 <strong>Trạng Thái Cân Bằng Âm Dương</strong>: Các trụ cột đời sống đang đi đúng nhịp năng lượng vũ trụ. Mọi sự hanh thông, thân tâm an lạc.');
    }

    return {
      dateObj: d,
      realScores,
      astroPotentialScores,
      insights,
      pillars
    };
  }

  // --- THUẬT TOÁN TIME-MACHINE CUỘC ĐỜI CÁ NHÂN (20 - 80 TUỔI) ---
  function calculateLifeTimeline(userProfile) {
    const profile = userProfile || {
      birthYear: 1995,
      currentAge: 31,
      canNam: 'Ất',
      chiNam: 'Hợi',
      hanhMenh: 'Hỏa'
    };

    const birthYear = profile.birthYear || 1995;
    const currentYear = new Date().getFullYear();
    const currentAge = profile.currentAge || (currentYear - birthYear + 1);

    const LUU_TINH_MAP = [
      ["Lưu Lộc Tồn", "Lưu Thiên Mã", "Lưu Đào Hoa"],
      ["Lưu Thái Tuế", "Lưu Hóa Lộc", "Lưu Thiên Khôi"],
      ["Lưu Hóa Kị", "Lưu Kình Dương", "Lưu Quan Phù"],
      ["Lưu Thiên Việt", "Lưu Hóa Quyền", "Lưu Hồng Loan"],
      ["Lưu Lộc Tồn", "Lưu Hóa Khoa", "Lưu Thiên Hỷ"],
      ["Lưu Đà La", "Lưu Tang Môn", "Lưu Bạch Hổ"]
    ];

    const HEXAGRAMS = [
      { name: "Quẻ Thuần Càn", desc: "Thế khí vững chãi, quân tử tự cường bất tức, hành động quyết đoán." },
      { name: "Quẻ Thuần Khôn", desc: "Nhu thuận bao dung, tích lũy nội lực, tĩnh tâm đợi thời cơ." },
      { name: "Quẻ Lôi Thiên Đại Tráng", desc: "Thế khí đang lên rất mạnh, giữ kỷ luật, tránh kiêu ngạo vội vã." },
      { name: "Quẻ Hỏa Phong Đỉnh", desc: "Đổi mới tư duy, cải tạo nền tảng, đón nhận vạn sự hanh thông." },
      { name: "Quẻ Trạch Thiên Quải", desc: "Dứt khoát loại bỏ rủi ro, minh bạch trong các giao dịch tài chính." },
      { name: "Quẻ Địa Thủy Sư", desc: "Tập hợp lực lượng, quản trị kỷ luật và điều phối nguồn lực chặt chẽ." },
      { name: "Quẻ Phong Lôi Ích", desc: "Thời cơ mở rộng, gia tăng giá trị cá nhân và hỗ trợ cộng đồng." },
      { name: "Quẻ Thủy Hỏa Ký Tế", desc: "Công thành danh tựu, cần duy trì sự tỉnh táo và bảo vệ thành quả." }
    ];

    const yearlyData = [];

    for (let age = 20; age <= 80; age++) {
      const calendarYear = birthYear + age;
      const canIdx = Math.abs((calendarYear - 4) % 10);
      const chiIdx = Math.abs((calendarYear - 4) % 12);
      const canStr = CAN[canIdx] || "Giáp";
      const chiStr = CHI[chiIdx] || "Tý";
      const canChi = `${canStr} ${chiStr}`;

      // Đại vận 10 năm
      const decStart = Math.floor((age - 3) / 10) * 10 + 3;
      const decEnd = decStart + 9;
      const decadeRange = `${decStart} - ${decEnd}`;
      const decadePalace = CHI[(chiIdx + Math.floor(age / 7)) % 12];

      // Đánh giá điểm Đại vận & Tiểu vận
      const seed = (birthYear * 7 + age * 13 + calendarYear * 3) % 100;
      let decadeScore = 65 + (seed % 31);
      let annualScore = 55 + ((seed * 3) % 41);

      const lesScore = Math.min(99, Math.max(35, Math.round(decadeScore * 0.6 + annualScore * 0.4)));

      let statusFlag = "🟡 Bình Hòa & Tích Lũy";
      let statusClass = "warning";
      if (lesScore >= 80) {
        statusFlag = "🟢 Tấn Công & Bứt Phá";
        statusClass = "success";
      } else if (lesScore < 55) {
        statusFlag = "🔴 Phòng Thủ & Cẩn Trọng";
        statusClass = "danger";
      }

      const career = Math.min(98, Math.max(40, Math.round(lesScore * 0.9 + (seed % 15))));
      const finance = Math.min(98, Math.max(35, Math.round(lesScore * 0.85 + ((seed * 2) % 20))));
      const health = Math.min(95, Math.max(45, Math.round(100 - (age * 0.4) + (seed % 15))));
      const relationship = Math.min(95, Math.max(50, Math.round(lesScore * 0.75 + ((seed * 4) % 25))));

      const starsIdx = (age + canIdx) % LUU_TINH_MAP.length;
      const keyActiveStars = LUU_TINH_MAP[starsIdx];

      const hexIdx = (calendarYear + age + seed) % HEXAGRAMS.length;
      const ichingHexagram = HEXAGRAMS[hexIdx];

      let strategicAdvice = "";
      if (lesScore >= 80) {
        strategicAdvice = `Năm có ${keyActiveStars[0]} & ${keyActiveStars[1]} hội chiếu. Thời cơ thiên thời địa lợi để bứt phá sự nghiệp, mở rộng quy mô đầu tư hoặc thực hiện các dự án trọng điểm.`;
      } else if (lesScore >= 55) {
        strategicAdvice = `Vận khí ổn định hòa hợp. Thích hợp duy trì nhịp làm việc hiện tại, củng cố nội lực, học hỏi kỹ năng mới và chuẩn bị nguồn lực cho các mốc bứt phá tiếp theo.`;
      } else {
        strategicAdvice = `Năm gặp ${keyActiveStars.includes("Lưu Hóa Kị") ? "Lưu Hóa Kị" : "Lưu Kình Dương"} chiếu mệnh. Nên ưu tiên phòng thủ tài chính, quản trị rủi ro hợp đồng, chú ý sức khỏe và tránh đầu tư mạo hiểm.`;
      }

      yearlyData.push({
        age,
        calendarYear,
        canChi,
        decadeRange,
        decadePalace,
        lesScore,
        statusFlag,
        statusClass,
        fourPillars: { career, finance, health, relationship },
        keyActiveStars,
        ichingHexagram,
        strategicAdvice,
        isCurrentAge: age === currentAge
      });
    }

    return {
      birthYear,
      currentAge,
      yearlyData
    };
  }

  function getUserProfile() {
    let profile = null;
    try {
      if (window.Onboarding && typeof window.Onboarding.getProfile === 'function') {
        profile = window.Onboarding.getProfile();
      } else {
        const d = localStorage.getItem('noitam_user_profile');
        if (d) profile = JSON.parse(d);
      }
    } catch(e) {}

    if (!profile || !profile.year) {
      try {
        const cfg = JSON.parse(localStorage.getItem('noitam_chart_config'));
        if (cfg && cfg.year) profile = cfg;
      } catch(e) {}
    }

    if (!profile || !profile.year) {
      profile = { year: 2000, month: 4, day: 20, hour: 21, minute: 0, gender: 'Nam', name: 'Mặc định (Local)' };
    }

    const year = parseInt(profile.year) || 2000;
    const month = parseInt(profile.month) || 4;
    const day = parseInt(profile.day) || 20;
    const hour = (profile.hour !== undefined && profile.hour !== null && !isNaN(parseInt(profile.hour))) ? parseInt(profile.hour) : 21;
    const minute = parseInt(profile.minute) || 0;
    const gender = profile.gender || 'Nam';
    const name = profile.name || 'Người dùng';
    const locationName = profile.locationName || 'Hà Nội, Việt Nam';
    const lat = profile.lat || 21.0285;
    const lng = profile.lng || 105.8333;
    const tz = profile.tz || 7;

    const canIdx = (year - 4) % 10;
    const chiIdx = (year - 4) % 12;
    const canNam = CAN[(canIdx + 10) % 10] || 'Canh';
    const chiNam = CUNG[(chiIdx + 12) % 12] || 'Thìn';

    const canChiStr = `${canNam} ${chiNam}`;
    let hanhMenh = NGU_HANH_CAN[canNam] || 'Kim';

    const currentAge = new Date().getFullYear() - year + 1;

    return {
      name,
      birthYear: year,
      birthMonth: month,
      birthDay: day,
      birthHour: hour,
      birthMinute: minute,
      gender,
      locationName,
      lat,
      lng,
      tz,
      canNam,
      chiNam,
      hanhMenh,
      currentAge,
      year,
      month,
      day,
      hour,
      minute
    };
  }

  return {
    getUserProfile,
    CUNG,
    CAN,
    CHI,
    NGU_HANH_CAN,
    tinhTieuHan,
    tinhNguyetHan,
    tinhNhatHan,
    chamDiemNgayTot,
    tinhDiemNgayDuongLich,
    tinhMenhTuCanChi,
    tinhLoiKhuyenSucKhoe,
    tinhHuongTot,
    tuongHopNhanSu,
    evaluatePersonalizedDay,
    calculateBiorhythms,
    scanGoalDates,
    getKarmaLevelInfo,
    generateKarmaQuests,
    calculateFlyingStars,
    evaluateMicroSpaceEnergy,
    CANH_GIO,
    evaluateHourlyRhythm,
    getMasterDailyIntelligence,
    calculateLifeBalanceScores,
    calculateLifeTimeline,
    generateShortTermScenarios,
    calculateEarlyWarningRadar,

    // --- 1. Finance & Investment Timing Logic ---
    evaluateWealthDay(dateObj, userProfile) {
      const baseDay = this.evaluatePersonalizedDay(dateObj, userProfile, 'CONTRACT');
      const canNgay = baseDay.canNgay || 'Giáp';
      const chiNgay = baseDay.chiNgay || 'Tý';
      
      const thanCatMap = {
        'Giáp': { wealthDirection: 'Đông Nam', star: 'Thần Tài Giáp Wood', rating: 'Thượng Cát' },
        'Ất': { wealthDirection: 'Đông', star: 'Lộc Tồn Ất', rating: 'Đại Cát' },
        'Bính': { wealthDirection: 'Nam', star: 'Hỷ Thần Bính Fire', rating: 'Thượng Cát' },
        'Đinh': { wealthDirection: 'Đông Nam', star: 'Thái Âm Đinh', rating: 'Bình Hòa' },
        'Mậu': { wealthDirection: 'Đông Nam', star: 'Thiên Lộc Mậu Thổ', rating: 'Đại Cát' },
        'Kỷ': { wealthDirection: 'Tây', star: 'Vũ Khúc Kỷ Metal', rating: 'Thượng Cát' },
        'Canh': { wealthDirection: 'Tây', star: 'Thiên Phủ Canh Metal', rating: 'Đại Cát' },
        'Tân': { wealthDirection: 'Tây Bắc', star: 'Thái Dương Tân', rating: 'Thượng Cát' },
        'Nhâm': { wealthDirection: 'Bắc', star: 'Hóa Lộc Nhâm Water', rating: 'Đại Cát' },
        'Quý': { wealthDirection: 'Bắc', star: 'Liêm Trinh Quý Water', rating: 'Bình Hòa' }
      };

      const wealthInfo = thanCatMap[canNgay] || thanCatMap['Giáp'];
      const score = Math.min(100, Math.max(30, baseDay.score + 5));

      let recommendation = "";
      if (score >= 80) {
        recommendation = "Ngày vượng lộc phát tài. Rất tốt cho ký kết hợp đồng, giải ngân đầu tư và thu hồi nợ.";
      } else if (score >= 60) {
        recommendation = "Tài khí bình hòa. Thích hợp mua sắm nhỏ, tích lũy tài sản dài hạn, tránh lướt sóng ngắn hạn.";
      } else {
        recommendation = "Cực kỵ cho các giao dịch lớn. Nên quản trị rủi ro, kiểm tra lại hợp đồng và bảo toàn dòng tiền.";
      }

      return {
        dateObj,
        canNgay,
        chiNgay,
        score,
        rating: wealthInfo.rating,
        wealthDirection: wealthInfo.wealthDirection,
        star: wealthInfo.star,
        recommendation
      };
    },

    // --- 2. Retro-Verification Correlation Engine ---
    calculateRetroAccuracy(pastEntries = []) {
      if (!pastEntries || pastEntries.length === 0) {
        return {
          totalChecked: 0,
          accuracyPct: 85,
          correlationLevel: 'Rất Cao (Mẫu thử khởi đầu)',
          insight: 'Chưa có đủ nhật ký đối chiếu. Hãy check-in mỗi tối để nâng cao độ chính xác.'
        };
      }

      let matchedCount = 0;
      pastEntries.forEach(entry => {
        const predicted = entry.predictedScore || 70;
        const actual = entry.actualScore || 4; // scale 1-5 -> mapped to 20-100
        const mappedActual = actual * 20;
        if (Math.abs(predicted - mappedActual) <= 20) {
          matchedCount++;
        }
      });

      const accuracyPct = Math.round((matchedCount / pastEntries.length) * 100);
      let correlationLevel = 'Khá';
      if (accuracyPct >= 80) correlationLevel = 'Rất Cao';
      else if (accuracyPct >= 60) correlationLevel = 'Trung Bình';
      else correlationLevel = 'Cần Hiệu Chỉnh';

      return {
        totalChecked: pastEntries.length,
        accuracyPct,
        correlationLevel,
        insight: `Đã đối chiếu ${pastEntries.length} ngày. Độ tương thích thuật toán với thực tế cá nhân đạt ${accuracyPct}%.`
      };
    },

    // --- 3. Mood-Energy Correlation Engine ---
    analyzeEmotionalPattern(moodLogs = [], bioData = { emotional: 50 }) {
      const count = moodLogs.length;
      const recentMood = count > 0 ? moodLogs[moodLogs.length - 1] : { mood: 'Bình Thường', val: 3 };
      const emotionalWave = bioData.emotional || 0;

      let harmonyText = "Hòa hợp tốt với sóng sinh học.";
      if (recentMood.val >= 4 && emotionalWave < -30) {
        harmonyText = "Tâm trạng thực tế tích cực hơn sóng Biorhythm — Bạn đang chuyển hóa năng lượng tốt!";
      } else if (recentMood.val <= 2 && emotionalWave > 30) {
        harmonyText = "Sóng Biorhythm cao nhưng tâm trạng trầm xuống — Cần thả lỏng và nghỉ ngơi.";
      }

      return {
        recentMood: recentMood.mood,
        emotionalWave,
        harmonyText,
        logCount: count
      };
    },

    // --- 4. RPG Character Stats Engine ---
    calculateCharacterStats(userProfile = {}, phucDucPoints = 0) {
      const balance = this.calculateLifeBalanceScores(userProfile);
      const scores = balance.scores || [75, 80, 70, 85, 65, 90];

      const bonus = Math.floor(phucDucPoints / 20);

      return {
        vit: Math.min(100, scores[0] + bonus), // Thân Tâm
        int: Math.min(100, scores[1] + bonus), // Sự Nghiệp
        cha: Math.min(100, scores[2] + bonus), // Gia Đạo
        wis: Math.min(100, scores[3] + bonus), // Mối Quan Hệ
        str: Math.min(100, scores[4] + bonus), // Tài Chính
        dex: Math.min(100, scores[5] + bonus), // Tri Thức
        totalPower: scores.reduce((a, b) => a + b, 0) + bonus * 6,
        phucDucPoints
      };
    },

    // --- 4.5 Time Machine Engine ---
    getUserProfile() {
      if (window.Onboarding && typeof window.Onboarding.getProfile === 'function') {
         return window.Onboarding.getProfile();
      }
      try { 
        let profile = JSON.parse(localStorage.getItem('noitam_user_profile')); 
        if (profile && profile.year) return profile;
      } catch (e) {}
      
      try {
        let config = JSON.parse(localStorage.getItem('noitam_chart_config'));
        if (config && config.year) return config;
      } catch (e) {}

      return {
        year: 1995, month: 1, day: 1, hour: 12, minute: 0, gender: 'Nam',
        canNam: 'Ất', chiNam: 'Hợi', hanhMenh: 'Hỏa', currentAge: 30
      };
    },

    calculateLifeTimeline(userProfile) {
      const birthYear = userProfile.year || 1990;
      const currentAge = new Date().getFullYear() - birthYear + 1;
      
      let tuViChart = null;
      if (this.TuViEngine) {
        try {
          tuViChart = this.TuViEngine.calculateTuViChart({
            day: userProfile.day || 1, month: userProfile.month || 1, year: userProfile.year || 1990,
            hour: (userProfile.hour !== undefined && userProfile.hour !== null ? userProfile.hour : 12), minute: userProfile.minute || 0, gender: userProfile.gender || 'Nam',
            canNam: userProfile.canNam || 'Canh', chiNam: userProfile.chiNam || 'Ngọ'
          });
        } catch (e) { console.warn("TuVi Engine error:", e); }
      }

      const CAN_LIST = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
      const CHI_LIST = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

      let yearlyData = [];
      for (let age = 20; age <= 80; age++) {
        let calendarYear = birthYear + age - 1;
        let canChiIdx = (calendarYear - 4) % 60;
        if (canChiIdx < 0) canChiIdx += 60;
        let can = CAN_LIST[canChiIdx % 10];
        let chi = CHI_LIST[canChiIdx % 12];
        let canChi = `${can} ${chi}`;

        let daxian = null;
        let stars = [];
        let pName = "";
        if (tuViChart && tuViChart.daXians) {
          daxian = tuViChart.daXians.find(d => age >= d.startAge && age <= d.endAge);
          if (daxian && tuViChart.palaces) {
             let p = tuViChart.palaces[daxian.palaceIndex];
             pName = p ? p.name : "";
             stars = p ? (p.mainStars || []) : [];
          }
        }

        // Đánh giá dựa trên lá số thực hoặc ngẫu nhiên có tính chất deterministic
        let baseScore = 60 + ((age * 7 + birthYear) % 40); // 60 to 100
        if (stars.includes("Tử Vi") || stars.includes("Thiên Phủ") || stars.includes("Thái Dương") || stars.includes("Thái Âm")) baseScore += 15;
        if (stars.includes("Thất Sát") || stars.includes("Phá Quân") || stars.includes("Tham Lang")) baseScore -= 10;
        if (stars.includes("Cự Môn") || stars.includes("Đà La") || stars.includes("Kình Dương")) baseScore -= 15;
        let lesScore = Math.floor(Math.min(100, Math.max(30, baseScore)));

        let statusFlag = lesScore >= 80 ? "Tấn Công" : (lesScore >= 55 ? "Bình Hòa" : "Phòng Thủ");
        
        let career = Math.floor(Math.min(100, Math.max(20, lesScore + ((age * 3) % 20) - 10)));
        let finance = Math.floor(Math.min(100, Math.max(20, lesScore + ((age * 5) % 20) - 10)));
        let health = Math.floor(Math.min(100, Math.max(20, 95 - (age/2) + ((age * 2) % 15))));
        let relationship = Math.floor(Math.min(100, Math.max(20, lesScore + ((age * 7) % 20) - 10)));

        yearlyData.push({
          age,
          calendarYear,
          canChi,
          isCurrentAge: age === currentAge,
          lesScore,
          statusFlag,
          decadeRange: daxian ? `${daxian.startAge}-${daxian.endAge}` : `${Math.floor(age/10)*10}-${Math.floor(age/10)*10+9}`,
          decadePalace: pName || "Chưa rõ",
          stars: stars.length > 0 ? stars : ["Thiên Đồng"], // fallback
          fourPillars: { career, finance, health, relationship }
        });
      }

      return {
        birthYear,
        currentAge,
        yearlyData
      };
    },

    // --- 5. Skill Tree Data Engine ---
    getSkillTreeData() {
      return [
        {
          id: 'vit_branch',
          name: 'Nhánh Thân Tâm (VIT)',
          icon: '🧘',
          color: '#10b981',
          skills: [
            { id: 'v1', name: 'Thiền Định Solfeggio', level: 1, maxLevel: 3, desc: 'Giảm 30% căng thẳng thần kinh' },
            { id: 'v2', name: 'Thực Dưỡng Ngũ Hành', level: 2, maxLevel: 3, desc: 'Cân bằng tạng phủ theo Can Chi ngày' },
            { id: 'v3', name: 'Bảo Hòa Nhịp Giờ', level: 1, maxLevel: 3, desc: 'Tối ưu hóa giấc ngủ và nhịp 24H' }
          ]
        },
        {
          id: 'int_branch',
          name: 'Nhánh Sự Nghiệp (INT)',
          icon: '👑',
          color: '#3b82f6',
          skills: [
            { id: 'i1', name: 'Săn Ngày Vàng Target Scanner', level: 2, maxLevel: 3, desc: 'Top 3 ngày cát cho thi cử/trình sếp' },
            { id: 'i2', name: 'Chiến Lược Time-Machine', level: 1, maxLevel: 3, desc: 'Quản trị nguồn lực 10 năm' }
          ]
        },
        {
          id: 'str_branch',
          name: 'Nhánh Tài Chính (STR)',
          icon: '💰',
          color: '#f59e0b',
          skills: [
            { id: 's1', name: 'Timing Đầu Tư Ngũ Hành', level: 1, maxLevel: 3, desc: 'Nắm bắt thời điểm Tài Thần vượng' },
            { id: 's2', name: 'Quản Trị Rủi Ro Hợp Đồng', level: 1, maxLevel: 3, desc: 'Cảnh báo sớm ngày phạm Lục Xung/Hóa Kỵ' }
          ]
        },
        {
          id: 'wis_branch',
          name: 'Nhánh Tri Thức (WIS)',
          icon: '📚',
          color: '#8b5cf6',
          skills: [
            { id: 'w1', name: 'Kinh Dịch Chiêm Nghiệm', level: 2, maxLevel: 3, desc: 'Nhận thức thời cơ qua 64 quẻ' },
            { id: 'w2', name: 'Phản Tư Đúc Kết Bài Học', level: 3, maxLevel: 3, desc: 'Chuyển hóa trải nghiệm thành trí tuệ' }
          ]
        }
      ];
    },

    // --- Batch 2: Adaptive Streak Engine (#3) ---
    getAdaptiveStreakStatus(pastLogs = [], todayScore = 80) {
      const isLowScoreDay = todayScore < 50;
      let streakType = 'NORMAL';
      let streakBadge = '🔥 Chuỗi Tấn Công';
      let taskRecommendation = 'Hoàn thành ít nhất 1 nhiệm vụ trọng tâm hôm nay.';

      if (isLowScoreDay) {
        streakType = 'REST_DAY';
        streakBadge = '🛡️ Ngày Nghỉ Thiên Ý (Bảo Toàn Chuỗi)';
        taskRecommendation = 'Ngày Hắc Đạo: Chỉ cần hoàn thành 1 việc nhẹ (Thiền 10p hoặc đi dạo) để giữ chuỗi +5 KP.';
      } else if (todayScore >= 85) {
        streakType = 'POWER_DAY';
        streakBadge = '⚡ Ngày Đại Cát (Streak x2 Bonus)';
        taskRecommendation = 'Ngày Đại Cát: Hoàn thành nhiệm vụ lớn để nhân đôi điểm Phúc Đức (+30 KP)!';
      }

      return {
        isLowScoreDay,
        streakType,
        streakBadge,
        taskRecommendation,
        currentStreak: pastLogs.length > 0 ? pastLogs.length : 1
      };
    },

    // --- Batch 2: Micro-Sprint 24H Engine (#2) ---
    generateMicroSprintSchedule(dateObj, userProfile = {}) {
      const hourly = this.evaluateHourlyRhythm(dateObj, userProfile);
      const hours = hourly.hourlyList || [];

      return hours.map(h => {
        let type = 'ROUTINE';
        let activity = 'Xử lý công việc thường nhật / Admin';

        if (h.score >= 75) {
          type = 'DEEP_WORK';
          activity = '🎯 DEEP WORK: Trình sếp, ký hợp đồng, học tập chuyên sâu';
        } else if (h.score < 45) {
          type = 'REST';
          activity = '🧘 REST & RECOVERY: Nghỉ ngơi, thiền Solfeggio, tập nhẹ';
        }

        return {
          time: h.canh,
          name: h.name,
          score: h.score,
          type,
          activity,
          isHoangDao: h.isHoangDao
        };
      });
    },

    // --- Batch 2: Social Energy Map Engine (#1) ---
    getSocialEnergyMap(userContacts = [], selectedDate = new Date()) {
      const defaultContacts = [
        { name: 'Đồng Nghiệp Kế Toán', canChi: 'Giáp Tý' },
        { name: 'Đối Tác Kinh Doanh', canChi: 'Bính Dần' },
        { name: 'Người Thân / Bạn Đời', canChi: 'Mậu Thìn' }
      ];
      const contacts = userContacts.length > 0 ? userContacts : defaultContacts;

      return contacts.map(c => {
        const result = this.tuongHopNhanSu('Canh Thìn', c.canChi);
        return {
          name: c.name,
          canChi: c.canChi,
          harmonyScore: result.diemTuongHop || 85,
          compatibilityText: result.danhGia || 'Hợp tác thuận lợi',
          recommendation: result.diemTuongHop >= 75 ? 'Rất tốt để thảo luận công việc & đàm phán.' : 'Nên nhường nhịn, tránh xung đột quan điểm.'
        };
      });
    },

    // --- Batch 2: Moon Phase Reflection Engine (#9) ---
    getMoonPhaseReflection(dateObj = new Date()) {
      let day = dateObj.getDate();
      if (typeof Lunar !== 'undefined') {
        const lunar = Lunar.fromDate(dateObj);
        day = lunar.getDay();
      }

      if (day <= 3) {
        return { phase: '🌑 Sóc (Mồng 1 - 3)', title: 'Gieo Hạt Ý Niệm', question: 'Tôi muốn tập trung nuôi dưỡng điều gì nhất trong tháng này?' };
      } else if (day <= 10) {
        return { phase: '🌓 Thượng Huyền (Mồng 4 - 10)', title: 'Vượt Trở Ngại', question: 'Trở ngại lớn nhất đang làm tôi xao nhãng là gì và cách vượt qua?' };
      } else if (day <= 18) {
        return { phase: '🌕 Vọng (11 - 18)', title: 'Tỏa Sáng & Đạt Thành', question: 'Điều gì trong tôi đang đạt đỉnh cao năng lượng và sự biết ơn?' };
      } else if (day <= 25) {
        return { phase: '🌗 Hạ Huyền (19 - 25)', title: 'Buông Bỏ & Tối Ưu', question: 'Gần đây điều gì đang làm kiệt sức mà tôi cần buông bỏ?' };
      } else {
        return { phase: '🌑 Hối (26 - 30)', title: 'Chiêm Nghiệm & Đúc Kết', question: 'Bài học đắt giá nhất tôi gặt hái được trong chu kỳ vừa qua là gì?' };
      }
    },

    // ============================================
    // --- MODULE THẦN SỐ HỌC (NUMEROLOGY) ---
    // ============================================
    Numerology: {
      reduceNumber(num, preserveMaster = true) {
        let n = parseInt(num) || 0;
        while (n > 9) {
          if (preserveMaster && (n === 11 || n === 22 || n === 33)) break;
          n = n.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
        }
        return n;
      },

      calculateLifePath(day, month, year) {
        const d = this.reduceNumber(day, true);
        const m = this.reduceNumber(month, true);
        const y = this.reduceNumber(year, true);
        return this.reduceNumber(d + m + y, true);
      },

      calculateBirthdayNumber(day) {
        return this.reduceNumber(day, true);
      },

      calculateAttitudeNumber(day, month) {
        return this.reduceNumber(parseInt(day) + parseInt(month), false);
      },

      calculatePersonalYear(day, month, targetYear = 2026) {
        const d = this.reduceNumber(day, false);
        const m = this.reduceNumber(month, false);
        const y = this.reduceNumber(targetYear, false);
        return this.reduceNumber(d + m + y, false);
      },

      calculateBirthGrid(day, month, year) {
        const str = `${day}${month}${year}`.replace(/\D/g, '');
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        for (let char of str) {
          if (counts[char] !== undefined) counts[char]++;
        }

        const lines = [
          { name: 'Mũi Tên Trí Tuệ (3-6-9)', has: counts[3] > 0 && counts[6] > 0 && counts[9] > 0, desc: 'Tư duy sắc bén, trí nhớ tốt và khả năng sáng tạo vượt trội.' },
          { name: 'Mũi Tên Trải Nghiệm (1-4-7)', has: counts[1] > 0 && counts[4] > 0 && counts[7] > 0, desc: 'Thực tế, thích hành động và kiên trì rèn luyện từ trải nghiệm.' },
          { name: 'Mũi Tên Cảm Xúc (2-5-8)', has: counts[2] > 0 && counts[5] > 0 && counts[8] > 0, desc: 'Cân bằng cảm xúc tốt, giàu tình cảm và trực giác nhạy bén.' },
          { name: 'Mũi Tên Ý Chí (1-5-9)', has: counts[1] > 0 && counts[5] > 0 && counts[9] > 0, desc: 'Quyết đoán, kiên trì theo đuổi mục tiêu đến cùng.' },
          { name: 'Mũi Tên Tâm Linh (3-5-7)', has: counts[3] > 0 && counts[5] > 0 && counts[7] > 0, desc: 'Thấu hiểu tâm linh, coi trọng trải nghiệm tri thức cuộc sống.' }
        ];

        return { counts, lines };
      },

      getNumerologyDict() {
        return {
          1: {
            title: 'Số 1 — Nhà Lãnh Đạo Tiên Phong',
            element: 'Dương Kim / Hỏa',
            keyword: 'Độc lập, Quyết đoán, Tự chủ, Sáng tạo',
            strengths: ['Khả năng tự chủ cao', 'Tự tin dẫn đầu', 'Tư duy độc lập'],
            weaknesses: ['Dễ bảo thủ, độc đoán', 'Khó lắng nghe ý kiến người khác'],
            advice: 'Rèn tính khiêm tốn, học cách lắng nghe và đồng hành cùng tập thể.',
            personalYearMeaning: 'Năm bắt đầu chu kỳ 9 năm mới. Thời điểm lý tưởng để gieo hạt, khởi công dự án và định hình mục tiêu mới.'
          },
          2: {
            title: 'Số 2 — Nhà Hòa Giải & Kết Nối',
            element: 'Âm Mộc / Thủy',
            keyword: 'Lắng nghe, Lắng dịu, Hòa hợp, Trực giác',
            strengths: ['Tình cảm sâu sắc', 'Khả năng chữa lành', 'Hợp tác nhu hòa'],
            weaknesses: ['Dễ bị tổn thương', 'Lệ thuộc cảm xúc vào môi trường'],
            advice: 'Giữ vững ranh giới cá nhân, nuôi dưỡng sự tự tin nội tại.',
            personalYearMeaning: 'Năm kết nối & kiên nhẫn. Tập trung củng cố mối quan hệ, lắng nghe cảm xúc và hợp tác thay vì vội vã.'
          },
          3: {
            title: 'Số 3 — Nhà Truyền Cảm Hứng & Sáng Tạo',
            element: 'Dương Mộc / Hỏa',
            keyword: 'Giao tiếp, Hài hước, Sáng tạo, Tự do',
            strengths: ['Năng lượng tích cực', 'Khả năng diễn đạt xuất sắc', 'Sáng tạo vô hạn'],
            weaknesses: ['Hời hợt, dễ mất tập trung', 'Nhiệt tình lúc đầu nhưng mau nản'],
            advice: 'Tập trung chuyên sâu vào 1-2 mục tiêu thay vì phân tán nguồn lực.',
            personalYearMeaning: 'Năm học tập & thể hiện. Mở rộng tri thức, học thêm kỹ năng mới và tự do sáng tạo nghệ thuật/truyền thông.'
          },
          4: {
            title: 'Số 4 — Nhà Kiến Tạo Kỷ Luật & Thực Năng',
            element: 'Dương Thổ / Kim',
            keyword: 'Kỷ luật, Cẩn trọng, Thực tế, Hệ thống',
            strengths: ['Tổ chức bài bản', 'Trung thực, vững chãi', 'Chi tiết và tỉ mỉ'],
            weaknesses: ['Cứng nhắc, ngần ngại thay đổi', 'Hay lo lắng quá mức'],
            advice: 'Linh hoạt thích ứng với biến động, mở rộng góc nhìn mới.',
            personalYearMeaning: 'Năm củng cố nền tảng & kỷ luật. Dọn dẹp tài chính, xây dựng thói quen lành mạnh và làm việc chăm chỉ.'
          },
          5: {
            title: 'Số 5 — Nhà Khai Phá & Tự Do',
            element: 'Dương Hỏa / Thủy',
            keyword: 'Thích ứng, Trải nghiệm, Đột phá, Linh hoạt',
            strengths: ['Thích ứng nhanh', 'Giàu năng lượng khám phá', 'Linh hoạt'],
            weaknesses: ['Thiếu kiên nhẫn', 'Dễ sa đà vào sự vô kỷ luật'],
            advice: 'Tự do trong khuôn khổ, duy trì cam kết lâu dài.',
            personalYearMeaning: 'Năm thay đổi & đột phá. Đón nhận cơ hội mới, du lịch, mở rộng trải nghiệm và thay đổi tư duy.'
          },
          6: {
            title: 'Số 6 — Nhà Trị Liệu & Phụng Sự Gia Đạo',
            element: 'Âm Thổ / Mộc',
            keyword: 'Trách nhiệm, Yêu thương, Phụng sự, Gia đình',
            strengths: ['Giàu tình thương', 'Chăm sóc chu đáo', 'Thẩm mỹ cao'],
            weaknesses: ['Hay ôm đồm công việc', 'Kiểm soát vì muốn tốt cho người khác'],
            advice: 'Học cách yêu thương bản thân trước khi gánh vác cho người khác.',
            personalYearMeaning: 'Năm của gia đình & tình thân. Trầm tĩnh chăm sóc tổ ấm, vun vén mối quan hệ và nhận trách nhiệm lớn.'
          },
          7: {
            title: 'Số 7 — Nhà Triết Gia & Khai Sáng Tri Thức',
            element: 'Dương Thủy / Kim',
            keyword: 'Nghiên cứu, Trực giác, Chiêm nghiệm, Tri thức',
            strengths: ['Phân tích sắc bén', 'Khai phá chân lý', 'Độc lập nội tâm'],
            weaknesses: ['Dễ cô lập bản thân', 'Hay nghi ngờ và khép kín'],
            advice: 'Chia sẻ góc nhìn tri thức ra bên ngoài, kết nối hòa đồng.',
            personalYearMeaning: 'Năm quay vào bên trong & chiêm nghiệm. Tối ưu tri thức, thiền định và làm rõ mục đích sống.'
          },
          8: {
            title: 'Số 8 — Nhà Điều Hành & Tạo Tác Tài Chính',
            element: 'Dương Thổ / Kim',
            keyword: 'Tài chính, Quản trị, Quyền lực, Cân bằng',
            strengths: ['Tư duy chiến lược lớn', 'Quản lý tài chính giỏi', 'Nghị lực kiên cường'],
            weaknesses: ['Thực dụng quá mức', 'Dễ căng thẳng công việc'],
            advice: 'Cân bằng giữa thành tựu vật chất và sự bình an tâm linh.',
            personalYearMeaning: 'Năm gặt hái tài chính & sự nghiệp. Thu hoạch kết quả từ sự kiên trì, khẳng định vị thế và quản trị nguồn lực.'
          },
          9: {
            title: 'Số 9 — Nhà Nhân Đạo & Hoàn Thiện Chu Kỳ',
            element: 'Dương Hỏa / Thủy',
            keyword: 'Bao dung, Lý tưởng, Phụng sự xã hội, Dứt điểm',
            strengths: ['Tầm nhìn rộng lớn', 'Lòng nhân ái bao la', 'Ước mơ cao đẹp'],
            weaknesses: ['Dễ mơ mộng xa rời thực tế', 'Níu kéo quá khứ'],
            advice: 'Buông bỏ những gì đã cũ để chuẩn bị cho chu kỳ khởi đầu mới.',
            personalYearMeaning: 'Năm thanh lọc & hoàn thành. Buông bỏ mục tiêu đã cũ, dọn dẹp nội tâm, làm từ thiện và dứt điểm tồn đọng.'
          },
          11: {
            title: 'Số 11/2 — Bậc Thầy Trực Giác & Sứ Giả Tâm Linh (Master)',
            element: 'Hỏa Thủy Tương Tế',
            keyword: 'Trực giác nhạy bén, Khai sáng, Nhạy cảm, Sứ mệnh',
            strengths: ['Trực giác cực nhạy', 'Truyền cảm hứng mạnh mẽ', 'Tầm nhìn tâm linh'],
            weaknesses: ['Áp lực nội tâm lớn', 'Dễ quá tải cảm xúc'],
            advice: 'Thực hành thiền định, giữ tâm bình an trước biến động.',
            personalYearMeaning: 'Năm bừng tỉnh tâm linh và nhận thức sâu sắc về bản thân.'
          },
          22: {
            title: 'Số 22/4 — Bậc Thầy Kiến Tạo Tầm Vóc (Master Builder)',
            element: 'Kim Thổ Vững Chãi',
            keyword: 'Kiến tạo quy mô lớn, Tầm nhìn xa, Thực thi kỷ luật',
            strengths: ['Khả năng biến ước mơ thành hiện thực lớn', 'Quản trị vĩ mô'],
            weaknesses: ['Gánh nặng trách nhiệm quá lớn', 'Căng thẳng tột độ'],
            advice: 'Phân chia công việc, tin tưởng vào cộng sự.',
            personalYearMeaning: 'Năm đặt móng cho những công trình / sự nghiệp mang tầm vóc lâu dài.'
          },
          33: {
            title: 'Số 33/6 — Bậc Thầy Chữa Lành & Yêu Thương Vô Điều Kiện',
            element: 'Thổ Mộc Hòa Hợp',
            keyword: 'Lòng từ bi, Chữa lành cộng đồng, Phụng sự nhân sinh',
            strengths: ['Năng lượng yêu thương ấm áp', 'Khả năng cảm hóa lòng người'],
            weaknesses: ['Hy sinh quên mình dẫn đến kiệt sức'],
            advice: 'Yêu thương bản thân đúng cách để có năng lượng phụng sự bền vững.',
          }
        };
      },

      getEasternWesternSynergy(lifePathNum, userProfile = {}) {
        const dict = this.getNumerologyDict();
        const lpInfo = dict[lifePathNum] || dict[8];
        const hanhMenh = userProfile.hanhMenh || 'Kim';
        const canNam = userProfile.canNam || 'Canh';
        const chiNam = userProfile.chiNam || 'Thìn';

        return {
          title: `Cộng Hưởng Năng Lượng: Mệnh ${hanhMenh} (${canNam} ${chiNam}) ☯ Số Chủ Đạo ${lifePathNum}`,
          summary: `Lá số Tử Vi của bạn mang bản mệnh ${hanhMenh} (Canh Thìn - Đồng Âm cư Tý), khi kết hợp cùng năng lượng ${lpInfo.title.split('—')[1] || ''} tạo nên sự đan xen độc đáo giữa tính cách cảm xúc nội tâm và mục tiêu phát triển thực tế.`,
          synergyAdvice: `Hãy tận dụng sự thấu hiểu từ Mệnh bàn Tử Vi kết hợp với ${lpInfo.keyword} của Số Chủ Đạo ${lifePathNum} để cải mệnh, tối ưu năng lượng mỗi ngày.`
        };
      }
    },

    // ============================================
    // --- MODULE TỨ TRỤ BÁT TỰ & GIỜ MẶT TRỜI THỰC ---
    // ============================================
    FourPillars: {
      // Bảng Tàng Can trong 12 Địa Chi
      HIDDEN_STEMS: {
        "Tý": ["Quý"],
        "Sửu": ["Kỷ", "Quý", "Tân"],
        "Dần": ["Giáp", "Bính", "Mậu"],
        "Mão": ["Ất"],
        "Thìn": ["Mậu", "Ất", "Quý"],
        "Tỵ": ["Bính", "Mậu", "Canh"],
        "Ngọ": ["Đinh", "Kỷ"],
        "Mùi": ["Kỷ", "Đinh", "Ất"],
        "Thân": ["Canh", "Nhâm", "Mậu"],
        "Dậu": ["Tân"],
        "Tuất": ["Mậu", "Tân", "Đinh"],
        "Hợi": ["Nhâm", "Giáp"]
      },

      // Bảng Địa Danh Việt Nam & Quốc Tế mở rộng
      LOCATIONS: [
        // --- MIỀN BẮC ---
        { name: 'Hà Nội, Việt Nam', lat: 21.0285, lng: 105.8333, tz: 7 },
        { name: 'Hải Phòng, Việt Nam', lat: 20.8449, lng: 106.6881, tz: 7 },
        { name: 'Hạ Long, Quảng Ninh', lat: 20.9505, lng: 107.0734, tz: 7 },
        { name: 'Bắc Ninh, Việt Nam', lat: 21.1861, lng: 106.0763, tz: 7 },
        { name: 'Bắc Giang, Việt Nam', lat: 21.2731, lng: 106.1946, tz: 7 },
        { name: 'Hải Dương, Việt Nam', lat: 20.9400, lng: 106.3330, tz: 7 },
        { name: 'Hưng Yên, Việt Nam', lat: 20.6464, lng: 106.0511, tz: 7 },
        { name: 'Nam Định, Việt Nam', lat: 20.4167, lng: 106.1667, tz: 7 },
        { name: 'Thái Bình, Việt Nam', lat: 20.4464, lng: 106.3364, tz: 7 },
        { name: 'Ninh Bình, Việt Nam', lat: 20.2506, lng: 105.9745, tz: 7 },
        { name: 'Vĩnh Yên, Vĩnh Phúc', lat: 21.3089, lng: 105.6048, tz: 7 },
        { name: 'Phủ Lý, Hà Nam', lat: 20.5453, lng: 105.9122, tz: 7 },
        { name: 'Việt Trì, Phú Thọ', lat: 21.3000, lng: 105.4333, tz: 7 },
        { name: 'Thái Nguyên, Việt Nam', lat: 21.5928, lng: 105.8442, tz: 7 },
        { name: 'Lạng Sơn, Việt Nam', lat: 21.8475, lng: 106.7597, tz: 7 },
        { name: 'Cao Bằng, Việt Nam', lat: 22.6657, lng: 106.2570, tz: 7 },
        { name: 'Hà Giang, Việt Nam', lat: 22.8233, lng: 104.9839, tz: 7 },
        { name: 'Tuyên Quang, Việt Nam', lat: 21.8242, lng: 105.2158, tz: 7 },
        { name: 'Lào Cai / Sa Pa', lat: 22.3364, lng: 103.8438, tz: 7 },
        { name: 'Yên Bái, Việt Nam', lat: 21.7051, lng: 104.8986, tz: 7 },
        { name: 'Sơn La, Việt Nam', lat: 21.3257, lng: 103.9188, tz: 7 },
        { name: 'Điện Biên Phủ', lat: 21.3854, lng: 103.0188, tz: 7 },
        { name: 'Hòa Bình, Việt Nam', lat: 20.8171, lng: 105.3377, tz: 7 },
        { name: 'Lai Châu, Việt Nam', lat: 22.3963, lng: 103.4582, tz: 7 },

        // --- MIỀN TRUNG & TÂY NGUYÊN ---
        { name: 'Thanh Hóa, Việt Nam', lat: 19.8067, lng: 105.7852, tz: 7 },
        { name: 'Vinh, Nghệ An', lat: 18.6734, lng: 105.6813, tz: 7 },
        { name: 'Hà Tĩnh, Việt Nam', lat: 18.3436, lng: 105.9056, tz: 7 },
        { name: 'Đồng Hới, Quảng Bình', lat: 17.4761, lng: 106.6000, tz: 7 },
        { name: 'Đông Hà, Quảng Trị', lat: 16.8183, lng: 107.1006, tz: 7 },
        { name: 'Huế, Việt Nam', lat: 16.4637, lng: 107.5909, tz: 7 },
        { name: 'Đà Nẵng, Việt Nam', lat: 16.0544, lng: 108.2022, tz: 7 },
        { name: 'Hội An / Quảng Nam', lat: 15.8801, lng: 108.3380, tz: 7 },
        { name: 'Tam Kỳ, Quảng Nam', lat: 15.5647, lng: 108.4808, tz: 7 },
        { name: 'Quảng Ngãi, Việt Nam', lat: 15.1205, lng: 108.7924, tz: 7 },
        { name: 'Quy Nhơn, Bình Định', lat: 13.7820, lng: 109.2194, tz: 7 },
        { name: 'Tuy Hòa, Phú Yên', lat: 13.0882, lng: 109.3142, tz: 7 },
        { name: 'Nha Trang, Khánh Hòa', lat: 12.2388, lng: 109.1967, tz: 7 },
        { name: 'Phan Rang, Ninh Thuận', lat: 11.5658, lng: 108.9882, tz: 7 },
        { name: 'Phan Thiết, Bình Thuận', lat: 10.9333, lng: 108.1000, tz: 7 },
        { name: 'Đà Lạt, Lâm Đồng', lat: 11.9404, lng: 108.4583, tz: 7 },
        { name: 'Buôn Ma Thuột, Đắk Lắk', lat: 12.6667, lng: 108.0333, tz: 7 },
        { name: 'Pleiku, Gia Lai', lat: 13.9833, lng: 108.0000, tz: 7 },
        { name: 'Kon Tum, Việt Nam', lat: 14.3504, lng: 108.0047, tz: 7 },
        { name: 'Gia Nghĩa, Đắk Nông', lat: 12.0042, lng: 107.6897, tz: 7 },

        // --- MIỀN NAM ---
        { name: 'TP. Hồ Chí Minh, Việt Nam', lat: 10.8231, lng: 106.6297, tz: 7 },
        { name: 'Thủ Dầu Một, Bình Dương', lat: 10.9804, lng: 106.6519, tz: 7 },
        { name: 'Biên Hòa, Đồng Nai', lat: 10.9574, lng: 106.8426, tz: 7 },
        { name: 'Vũng Tàu, Ba Rịa', lat: 10.3460, lng: 107.0843, tz: 7 },
        { name: 'Tây Ninh, Việt Nam', lat: 11.3102, lng: 106.0984, tz: 7 },
        { name: 'Đồng Xoài, Bình Phước', lat: 11.5333, lng: 106.9000, tz: 7 },
        { name: 'Tân An, Long An', lat: 10.5362, lng: 106.4107, tz: 7 },
        { name: 'Mỹ Tho, Tiền Giang', lat: 10.3600, lng: 106.3600, tz: 7 },
        { name: 'Bến Tre, Việt Nam', lat: 10.2415, lng: 106.3756, tz: 7 },
        { name: 'Trà Vinh, Việt Nam', lat: 9.9348, lng: 106.3458, tz: 7 },
        { name: 'Vĩnh Long, Việt Nam', lat: 10.2537, lng: 105.9722, tz: 7 },
        { name: 'Cao Lãnh, Đồng Tháp', lat: 10.4578, lng: 105.6324, tz: 7 },
        { name: 'Long Xuyên, An Giang', lat: 10.3800, lng: 105.4300, tz: 7 },
        { name: 'Cần Thơ, Việt Nam', lat: 10.0452, lng: 105.7469, tz: 7 },
        { name: 'Vị Thanh, Hậu Giang', lat: 9.7844, lng: 105.4701, tz: 7 },
        { name: 'Rạch Giá, Kiên Giang', lat: 10.0125, lng: 105.0809, tz: 7 },
        { name: 'Phú Quốc, Kiên Giang', lat: 10.2899, lng: 103.9840, tz: 7 },
        { name: 'Sóc Trăng, Việt Nam', lat: 9.6033, lng: 105.9800, tz: 7 },
        { name: 'Bạc Liêu, Việt Nam', lat: 9.2941, lng: 105.7244, tz: 7 },
        { name: 'Cà Mau, Việt Nam', lat: 9.1769, lng: 105.1524, tz: 7 },

        // --- CHÂU Á & ĐÔNG NAM Á ---
        { name: 'Tokyo, Nhật Bản', lat: 35.6762, lng: 139.6503, tz: 9 },
        { name: 'Osaka, Nhật Bản', lat: 34.6937, lng: 135.5023, tz: 9 },
        { name: 'Fukuoka, Nhật Bản', lat: 33.5902, lng: 130.4017, tz: 9 },
        { name: 'Seoul, Hàn Quốc', lat: 37.5665, lng: 126.9780, tz: 9 },
        { name: 'Busan, Hàn Quốc', lat: 35.1796, lng: 129.0756, tz: 9 },
        { name: 'Bắc Kinh, Trung Quốc', lat: 39.9042, lng: 116.4074, tz: 8 },
        { name: 'Thượng Hải, Trung Quốc', lat: 31.2304, lng: 121.4737, tz: 8 },
        { name: 'Quảng Châu, Trung Quốc', lat: 23.1291, lng: 113.2644, tz: 8 },
        { name: 'Đài Bắc, Đài Loan', lat: 25.0330, lng: 121.5654, tz: 8 },
        { name: 'Hồng Kông', lat: 22.3193, lng: 114.1694, tz: 8 },
        { name: 'Bangkok, Thái Lan', lat: 13.7563, lng: 100.5018, tz: 7 },
        { name: 'Singapore', lat: 1.3521, lng: 103.8198, tz: 8 },
        { name: 'Kuala Lumpur, Malaysia', lat: 3.1390, lng: 101.6869, tz: 8 },
        { name: 'Jakarta, Indonesia', lat: -6.2088, lng: 106.8456, tz: 7 },
        { name: 'Manila, Philippines', lat: 14.5995, lng: 120.9842, tz: 8 },

        // --- CHÂU ÚC & CHÂU ÂU ---
        { name: 'Sydney, Úc', lat: -33.8688, lng: 151.2093, tz: 10 },
        { name: 'Melbourne, Úc', lat: -37.8136, lng: 144.9631, tz: 10 },
        { name: 'Brisbane, Úc', lat: -27.4698, lng: 153.0251, tz: 10 },
        { name: 'Auckland, New Zealand', lat: -36.8485, lng: 174.7633, tz: 12 },
        { name: 'London, Anh', lat: 51.5074, lng: -0.1278, tz: 0 },
        { name: 'Paris, Pháp', lat: 48.8566, lng: 2.3522, tz: 1 },
        { name: 'Berlin, Đức', lat: 52.5200, lng: 13.4050, tz: 1 },
        { name: 'Frankfurt, Đức', lat: 50.1109, lng: 8.6821, tz: 1 },
        { name: 'München, Đức', lat: 48.1351, lng: 11.5820, tz: 1 },
        { name: 'Praha, Cộng hòa Séc', lat: 50.0755, lng: 14.4378, tz: 1 },
        { name: 'Warsaw, Ba Lan', lat: 52.2297, lng: 21.0122, tz: 1 },
        { name: 'Moscow, Nga', lat: 55.7558, lng: 37.6173, tz: 3 },
        { name: 'Amsterdam, Hà Lan', lat: 52.3676, lng: 4.9041, tz: 1 },
        { name: 'Brussels, Bỉ', lat: 50.8503, lng: 4.3517, tz: 1 },
        { name: 'Rome, Ý', lat: 41.9028, lng: 12.4964, tz: 1 },

        // --- CHÂU MỸ ---
        { name: 'New York, Mỹ', lat: 40.7128, lng: -74.0060, tz: -5 },
        { name: 'California, Mỹ', lat: 36.7783, lng: -119.4179, tz: -8 },
        { name: 'Los Angeles, Mỹ', lat: 34.0522, lng: -118.2437, tz: -8 },
        { name: 'San Jose, Mỹ', lat: 37.3382, lng: -121.8863, tz: -8 },
        { name: 'San Francisco, Mỹ', lat: 37.7749, lng: -122.4194, tz: -8 },
        { name: 'Houston, Texas, Mỹ', lat: 29.7604, lng: -95.3698, tz: -6 },
        { name: 'Dallas, Texas, Mỹ', lat: 32.7767, lng: -96.7970, tz: -6 },
        { name: 'Chicago, Mỹ', lat: 41.8781, lng: -87.6298, tz: -6 },
        { name: 'Seattle, Mỹ', lat: 47.6062, lng: -122.3321, tz: -8 },
        { name: 'Washington D.C., Mỹ', lat: 38.9072, lng: -77.0369, tz: -5 },
        { name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, tz: -5 },
        { name: 'Vancouver, Canada', lat: 49.2827, lng: -123.1207, tz: -8 },

        // --- TÙY CHỈNH THỦ CÔNG ---
        { name: '📍 Khác (Nhập tọa độ thủ công...)', lat: 0, lng: 0, tz: 7, isCustom: true }
      ],

      // 1. Tính Phương Trình Thời Gian EoT (Equation of Time - Jean Meeus Algorithm)
      calculateEquationOfTime(dateObj) {
        const startOfYear = new Date(dateObj.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((dateObj - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
        const B = (2 * Math.PI * (dayOfYear - 81)) / 365;
        const eotMinutes = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
        return eotMinutes;
      },

      // 2. Tính Giờ Mặt Trời Thực (True Solar Time)
      calculateTrueSolarTime(civilDateObj, lng = 105.8333, tz = 7) {
        const stdMeridian = tz * 15;
        const lngCorrectionMinutes = (lng - stdMeridian) * 4;
        const eotMinutes = this.calculateEquationOfTime(civilDateObj);
        const totalDeltaMinutes = lngCorrectionMinutes + eotMinutes;

        const trueSolarDateObj = new Date(civilDateObj.getTime() + totalDeltaMinutes * 60000);
        
        // Tính giờ chính ngọ local (Local Noon)
        const localNoonMinutes = 12 * 60 - totalDeltaMinutes;
        const noonH = Math.floor(localNoonMinutes / 60);
        const noonM = Math.round(localNoonMinutes % 60);
        const noonStr = `${noonH.toString().padStart(2, '0')}:${noonM.toString().padStart(2, '0')}`;

        return {
          trueSolarDate: trueSolarDateObj,
          deltaMinutes: Math.round(totalDeltaMinutes * 10) / 10,
          noonStr
        };
      },

      // 3. Tính Thập Thần (Ten Gods)
      getTenGod(dayMasterCan, otherCan) {
        if (!dayMasterCan || !otherCan) return '';

        const CAN_HANH = {
          "Giáp": { hanh: "Mộc", amDuong: "Dương" }, "Ất": { hanh: "Mộc", amDuong: "Âm" },
          "Bính": { hanh: "Hỏa", amDuong: "Dương" }, "Đinh": { hanh: "Hỏa", amDuong: "Âm" },
          "Mậu": { hanh: "Thổ", amDuong: "Dương" }, "Kỷ": { hanh: "Thổ", amDuong: "Âm" },
          "Canh": { hanh: "Kim", amDuong: "Dương" }, "Tân": { hanh: "Kim", amDuong: "Âm" },
          "Nhâm": { hanh: "Thủy", amDuong: "Dương" }, "Quý": { hanh: "Thủy", amDuong: "Âm" }
        };

        const SINH = { "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim", "Kim": "Thủy", "Thủy": "Mộc" };
        const KHAC = { "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim", "Kim": "Mộc" };

        const dm = CAN_HANH[dayMasterCan];
        const ot = CAN_HANH[otherCan];
        if (!dm || !ot) return '';

        const samePolarity = dm.amDuong === ot.amDuong;

        if (dm.hanh === ot.hanh) {
          return samePolarity ? "Tỷ Kiên" : "Kiếp Tài";
        } else if (SINH[dm.hanh] === ot.hanh) {
          return samePolarity ? "Thực Thần" : "Thương Quan";
        } else if (KHAC[dm.hanh] === ot.hanh) {
          return samePolarity ? "Thiên Tài" : "Chính Tài";
        } else if (KHAC[ot.hanh] === dm.hanh) {
          return samePolarity ? "Thất Sát" : "Chính Quan";
        } else if (SINH[ot.hanh] === dm.hanh) {
          return samePolarity ? "Thiên Ấn" : "Chính Ấn";
        }
        return '';
      },

      // 4. Tính Tứ Trụ Bát Tự Đầy Đủ
      calculateFourPillars(dateObj, lng = 105.8333, tz = 7) {
        const { trueSolarDate, deltaMinutes, noonStr } = this.calculateTrueSolarTime(dateObj, lng, tz);

        let canNam = "Canh", chiNam = "Thìn";
        let canThang = "Bính", chiThang = "Thìn";
        let canNgay = "Giáp", chiNgay = "Tuất";
        let canGio = "Canh", chiGio = "Tuất";

        if (typeof Lunar !== 'undefined') {
          try {
            const lunar = Lunar.fromDate(trueSolarDate);
            const AL = window.AstrologyLogic;

            const yearGanIdx = typeof lunar.getYearGanIndexByLiChun === 'function' ? lunar.getYearGanIndexByLiChun() : (typeof lunar.getYearGanIndexExact === 'function' ? lunar.getYearGanIndexExact() : (typeof lunar.getYearGanIndex === 'function' ? lunar.getYearGanIndex() : (lunar.getYear() - 4 + 1000) % 10));
            const yearZhiIdx = typeof lunar.getYearZhiIndexByLiChun === 'function' ? lunar.getYearZhiIndexByLiChun() : (typeof lunar.getYearZhiIndexExact === 'function' ? lunar.getYearZhiIndexExact() : (typeof lunar.getYearZhiIndex === 'function' ? lunar.getYearZhiIndex() : (lunar.getYear() - 4 + 1000) % 12));
            const monthGanIdx = typeof lunar.getMonthGanIndexExact === 'function' ? lunar.getMonthGanIndexExact() : (typeof lunar.getMonthGanIndex === 'function' ? lunar.getMonthGanIndex() : 0);
            const monthZhiIdx = typeof lunar.getMonthZhiIndexExact === 'function' ? lunar.getMonthZhiIndexExact() : (typeof lunar.getMonthZhiIndex === 'function' ? lunar.getMonthZhiIndex() : 0);
            const dayGanIdx = typeof lunar.getDayGanIndexExact === 'function' ? lunar.getDayGanIndexExact() : (typeof lunar.getDayGanIndex === 'function' ? lunar.getDayGanIndex() : 0);
            const dayZhiIdx = typeof lunar.getDayZhiIndexExact === 'function' ? lunar.getDayZhiIndexExact() : (typeof lunar.getDayZhiIndex === 'function' ? lunar.getDayZhiIndex() : 0);

            canNam = AL.CAN[yearGanIdx] || "Canh";
            chiNam = AL.CUNG[yearZhiIdx] || "Thìn";

            canThang = AL.CAN[monthGanIdx] || "Bính";
            chiThang = AL.CUNG[monthZhiIdx] || "Thìn";

            canNgay = AL.CAN[dayGanIdx] || "Giáp";
            chiNgay = AL.CUNG[dayZhiIdx] || "Tuất";

            // Giờ Chi
            const h = trueSolarDate.getHours();
            const zhiIndex = Math.floor((h + 1) / 2) % 12;
            chiGio = AL.CUNG[zhiIndex] || "Tý";

            // Giờ Can: Ngũ Tử Hoàn
            const ganIndex = (dayGanIdx * 2 + zhiIndex) % 10;
            canGio = AL.CAN[ganIndex] || "Giáp";
          } catch (e) {
            console.error("Lunar conversion error in FourPillars:", e);
          }
        }

        const dayMaster = canNgay; // Nhật Nguyên (Thiên Can Ngày)

        // Tính Thập Thần cho từng Can & Tàng Can
        const getPillarDetail = (can, chi) => {
          const tenGod = can === dayMaster ? "Nhật Nguyên" : this.getTenGod(dayMaster, can);
          const hidden = (this.HIDDEN_STEMS[chi] || []).map(stem => ({
            stem,
            tenGod: this.getTenGod(dayMaster, stem)
          }));
          return { can, chi, tenGod, hidden };
        };

        const yearPillar = getPillarDetail(canNam, chiNam);
        const monthPillar = getPillarDetail(canThang, chiThang);
        const dayPillar = getPillarDetail(canNgay, chiNgay);
        const hourPillar = getPillarDetail(canGio, chiGio);
        let lunarDay = dateObj.getDate();
        let lunarMonth = dateObj.getMonth() + 1;
        if (typeof Lunar !== 'undefined') {
          try {
            const l = Lunar.fromDate(trueSolarDate);
            lunarDay = l.getDay();
            lunarMonth = l.getMonth();
          } catch(e) {}
        }

        return {
          civilDate: dateObj,
          trueSolarDate,
          deltaMinutes,
          noonStr,
          dayMaster,
          lunarDay,
          lunarMonth,
          pillars: {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar
          }
        };
      }
    },

    // ============================================
    // 4. TU VI ENGINE (Tử Vi Đẩu Số Việt Nam)
    // ============================================
    TuViEngine: {
      CUNG_NAMES: ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"],
      CAN_NAMES: ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"],
      PALACE_IDS: ["menh", "huynh-de", "phu-the", "tu-tuc", "tai-bach", "tat-ach", "thien-di", "no-boc", "quan-loc", "dien-trach", "phuc-duc", "phu-mau"],
      PALACE_TITLES: ["Mệnh Bàn", "Huynh Đệ", "Phu Thê", "Tử Tức", "Tài Bạch", "Tật Ách", "Thiên Di", "Nô Bộc", "Quan Lộc", "Điền Trạch", "Phúc Đức", "Phụ Mẫu"],

      // Vị trí cố định 12 Địa Chi trên lưới 4x4 Bàn Số Tử Vi truyền thống
      POS_MAP: [
        'grid-column:3;grid-row:4;', // 0: Tý
        'grid-column:2;grid-row:4;', // 1: Sửu
        'grid-column:1;grid-row:4;', // 2: Dần
        'grid-column:1;grid-row:3;', // 3: Mão
        'grid-column:1;grid-row:2;', // 4: Thìn
        'grid-column:1;grid-row:1;', // 5: Tỵ
        'grid-column:2;grid-row:1;', // 6: Ngọ
        'grid-column:3;grid-row:1;', // 7: Mùi
        'grid-column:4;grid-row:1;', // 8: Thân
        'grid-column:4;grid-row:2;', // 9: Dậu
        'grid-column:4;grid-row:3;', // 10: Tuất
        'grid-column:4;grid-row:4;'  // 11: Hợi
      ],

      // Từ điển độ sáng 14 Chính Tinh trên 12 cung Tý (0) -> Hợi (11)
      BRIGHTNESS_TABLE: {
        "Tử Vi":      ["B", "Đ", "M", "B", "V", "M", "M", "Đ", "M", "B", "V", "B"],
        "Thiên Cơ":   ["Đ", "Đ", "H", "V", "B", "B", "Đ", "Đ", "H", "V", "B", "B"],
        "Thái Dương": ["H", "H", "V", "V", "V", "V", "M", "Đ", "B", "H", "H", "H"],
        "Vũ Khúc":    ["V", "M", "V", "Đ", "M", "B", "V", "M", "V", "Đ", "M", "B"],
        "Thiên Đồng": ["V", "H", "M", "Đ", "H", "M", "H", "H", "M", "B", "H", "Đ"],
        "Liêm Trinh": ["B", "Đ", "M", "H", "V", "H", "B", "Đ", "M", "H", "V", "H"],
        "Thiên Phủ":  ["M", "M", "M", "B", "M", "Đ", "V", "M", "M", "B", "M", "Đ"],
        "Thái Âm":    ["V", "Đ", "H", "H", "H", "H", "H", "B", "Đ", "V", "V", "M"],
        "Tham Lang":  ["H", "M", "Đ", "H", "V", "H", "H", "M", "Đ", "H", "V", "H"],
        "Cự Môn":     ["V", "H", "M", "M", "H", "B", "V", "H", "M", "M", "H", "B"],
        "Thiên Tướng":["V", "Đ", "M", "H", "V", "Đ", "V", "Đ", "M", "H", "V", "Đ"],
        "Thiên Lương":["M", "Đ", "V", "V", "M", "H", "M", "Đ", "V", "Đ", "M", "H"],
        "Thất Sát":   ["M", "Đ", "M", "H", "Đ", "B", "M", "Đ", "M", "H", "Đ", "B"],
        "Phá Quân":   ["M", "V", "H", "H", "B", "Đ", "M", "V", "H", "H", "B", "Đ"]
      },

      // Tứ Hóa theo Can năm sinh
      TU_HOA_TABLE: {
        "Giáp": { "Liêm Trinh": "Lộc", "Phá Quân": "Quyền", "Vũ Khúc": "Khoa", "Thái Dương": "Kỵ" },
        "Ất":   { "Thiên Cơ": "Lộc", "Thiên Lương": "Quyền", "Tử Vi": "Khoa", "Thái Âm": "Kỵ" },
        "Bính": { "Thiên Đồng": "Lộc", "Thiên Cơ": "Quyền", "Văn Xương": "Khoa", "Liêm Trinh": "Kỵ" },
        "Đinh": { "Thái Âm": "Lộc", "Thiên Đồng": "Quyền", "Thiên Cơ": "Khoa", "Cự Môn": "Kỵ" },
        "Mậu":  { "Tham Lang": "Lộc", "Thái Âm": "Quyền", "Hữu Bật": "Khoa", "Thiên Cơ": "Kỵ" },
        "Kỷ":   { "Vũ Khúc": "Lộc", "Tham Lang": "Quyền", "Thiên Lương": "Khoa", "Văn Khúc": "Kỵ" },
        "Canh": { "Thái Dương": "Lộc", "Vũ Khúc": "Quyền", "Thái Âm": "Khoa", "Thiên Đồng": "Kỵ" },
        "Tân":  { "Cự Môn": "Lộc", "Thái Dương": "Quyền", "Văn Khúc": "Khoa", "Văn Xương": "Kỵ" },
        "Nhâm": { "Thiên Lương": "Lộc", "Tử Vi": "Quyền", "Tả Phù": "Khoa", "Vũ Khúc": "Kỵ" },
        "Quý":  { "Phá Quân": "Lộc", "Cự Môn": "Quyền", "Thái Âm": "Khoa", "Tham Lang": "Kỵ" }
      },

      // Xây dựng ma trận Tứ Hóa cho Can bất kỳ (theo Tên Can hoặc Chỉ số Can 0..9)
      buildSiHuaOverlay(canInput) {
        let canName = canInput;
        if (typeof canInput === 'number') {
          canName = this.CAN_NAMES[((canInput % 10) + 10) % 10];
        }
        return this.TU_HOA_TABLE[canName] || {};
      },

      // Lấy danh sách 4 sao nhận Phi Tinh Tứ Hóa từ 1 Thiên Can
      getFlyingSiHua(canInput) {
        const overlay = this.buildSiHuaOverlay(canInput);
        const res = [];
        const colors = { "Lộc": "#10b981", "Quyền": "#f59e0b", "Khoa": "#3b82f6", "Kỵ": "#ef4444" };
        for (const [star, type] of Object.entries(overlay)) {
          res.push({ star, type, color: colors[type] || "#3b82f6" });
        }
        return res;
      },

      // Tính số Cục và tên Cục theo Can Cung Mệnh & Chi Cung Mệnh
      tinhCuc(canMenhIdx, menhChiIdx) {
        const canGroup = Math.floor(canMenhIdx / 2) + 1; // 1..5
        const chiGroup = Math.floor(menhChiIdx / 2) % 3; // 0, 1, 2
        let sum = canGroup + chiGroup;
        if (sum > 5) sum -= 5;
        // 1=Kim(4), 2=Thủy(2), 3=Hỏa(6), 4=Thổ(5), 5=Mộc(3)
        const map = {
          1: { name: "Kim Tứ Cục", value: 4, hanh: "Kim" },
          2: { name: "Thủy Nhị Cục", value: 2, hanh: "Thủy" },
          3: { name: "Hỏa Lục Cục", value: 6, hanh: "Hỏa" },
          4: { name: "Thổ Ngũ Cục", value: 5, hanh: "Thổ" },
          5: { name: "Mộc Tam Cục", value: 3, hanh: "Mộc" }
        };
        return map[sum] || map[2];
      },

      // Tìm cung an Tử Vi từ ngày âm và số cục
      tinhCungTuVi(ngayAm, cucValue) {
        let X = 0;
        while ((ngayAm + X) % cucValue !== 0) {
          X++;
        }
        const Q = (ngayAm + X) / cucValue;
        let cungIdx = (2 + Q - 1) % 12; // Khởi từ Dần (2)
        if (X % 2 === 1) {
          cungIdx = (cungIdx - X + 12 * 5) % 12; // Lẻ lùi X
        } else if (X > 0) {
          cungIdx = (cungIdx + X) % 12; // Chẵn tiến X
        }
        return cungIdx;
      },

      // Hàm tổng hợp an lá số Tử Vi trọn vẹn (14 Chính Tinh, Tứ Hóa, Vòng Lộc Tồn, Thái Tuế, Tuần/Triệt)
      calculateTuViChart(configParams) {
        const {
          day = 3, month = 8, year = 2000,
          hour = 21, minute = 24, gender = "Nam",
          canNam = "Canh", chiNam = "Thìn",
          lunarDay = 4, lunarMonth = 7
        } = configParams || {};

        const canNamIdx = Math.max(0, this.CAN_NAMES.indexOf(canNam));
        const chiNamIdx = Math.max(0, this.CUNG_NAMES.indexOf(chiNam));
        const gioSinhIdx = Math.floor((hour + 1) / 2) % 12; // 23h-1h là Tý (0), 1-3h Sửu (1)...
        const thangAm = Math.max(1, Math.min(12, lunarMonth || 1));
        const ngayAm = Math.max(1, Math.min(30, lunarDay || 1));

        // 1. Tính Cung Mệnh & Cung Thân
        const menhChiIdx = (2 + (thangAm - 1) - gioSinhIdx + 12 * 5) % 12;
        const thanChiIdx = (2 + (thangAm - 1) + gioSinhIdx) % 12;

        // 2. Tính Can Cung Mệnh theo Ngũ Hổ Độn & Ngũ Hành Cục
        const khoiDanCanIdx = ((canNamIdx % 5) * 2 + 2) % 10;
        const canMenhIdx = (khoiDanCanIdx + (menhChiIdx - 2 + 12) % 12) % 10;
        const cucObj = this.tinhCuc(canMenhIdx, menhChiIdx);

        // 3. Âm Dương Thuận/Nghịch Lý & Mệnh Cục Tương Quan
        const isDuongsTuoi = (canNamIdx % 2 === 0);
        const isDuongsMenh = (menhChiIdx % 2 === 0);
        const amDuongLy = (isDuongsTuoi === isDuongsMenh) ? "Âm Dương Thuận Lý" : "Âm Dương Nghịch Lý";

        const NGU_HANH_TUOI = {
          "Tý": "Thủy", "Sửu": "Thổ", "Dần": "Mộc", "Mão": "Mộc", "Thìn": "Thổ", "Tỵ": "Hỏa",
          "Ngọ": "Hỏa", "Mùi": "Thổ", "Thân": "Kim", "Dậu": "Kim", "Tuất": "Thổ", "Hợi": "Thủy"
        };
        const menhHanh = NGU_HANH_TUOI[chiNam] || "Kim";
        let menhCucRel = "Mệnh Cục bình hòa (Ổn định, tự lực thành công)";
        const SINH = { "Kim":"Thủy", "Thủy":"Mộc", "Mộc":"Hỏa", "Hỏa":"Thổ", "Thổ":"Kim" };
        const KHAC = { "Kim":"Mộc", "Mộc":"Thổ", "Thổ":"Thủy", "Thủy":"Hỏa", "Hỏa":"Kim" };
        if (SINH[cucObj.hanh] === menhHanh) menhCucRel = "Cục sinh Mệnh (Rất thuận lợi, được môi trường ưu ái)";
        else if (SINH[menhHanh] === cucObj.hanh) menhCucRel = "Mệnh sinh Cục (Hào tâm, cống hiến cho xã hội)";
        else if (KHAC[menhHanh] === cucObj.hanh) menhCucRel = "Mệnh khắc Cục (Kiên cường, vượt qua thử thách)";
        else if (KHAC[cucObj.hanh] === menhHanh) menhCucRel = "Cục khắc Mệnh (Gian nan rèn luyện chí lớn)";

        // 4. Khởi tạo mảng sao cho 12 cung Tý (0) -> Hợi (11)
        const starsChart = Array.from({ length: 12 }, () => ({
          mainStars: [],
          subStars: [],
          tuHoa: [],
          tuanTriet: []
        }));

        const tuHoaMap = this.TU_HOA_TABLE[canNam] || {};

        const addMainStar = (cungIdx, name) => {
          const bright = (this.BRIGHTNESS_TABLE[name] || [])[cungIdx] || "B";
          let badge = `[${bright}]`;
          let hoa = "";
          if (tuHoaMap[name]) {
            hoa = tuHoaMap[name];
            badge += ` [${hoa}]`;
          }
          starsChart[cungIdx].mainStars.push({ name, bright, badge, hoa });
          if (hoa) starsChart[cungIdx].tuHoa.push(hoa);
        };

        const addSubStar = (cungIdx, name, type = "sub") => {
          let hoa = "";
          if (tuHoaMap[name]) {
            hoa = tuHoaMap[name];
            starsChart[cungIdx].tuHoa.push(hoa);
          }
          starsChart[cungIdx].subStars.push({ name, type, hoa });
        };

        // 5. An 14 Chính Tinh
        const tuViIdx = this.tinhCungTuVi(ngayAm, cucObj.value);
        const thienPhuIdx = (4 - tuViIdx + 12) % 12;

        // Chòm Tử Vi (ngược chiều kim đồng hồ)
        addMainStar(tuViIdx, "Tử Vi");
        addMainStar((tuViIdx - 1 + 12) % 12, "Thiên Cơ");
        addMainStar((tuViIdx - 3 + 12) % 12, "Thái Dương");
        addMainStar((tuViIdx - 4 + 12) % 12, "Vũ Khúc");
        addMainStar((tuViIdx - 5 + 12) % 12, "Thiên Đồng");
        addMainStar((tuViIdx - 8 + 12) % 12, "Liêm Trinh");

        // Chòm Thiên Phủ (thuận chiều kim đồng hồ)
        addMainStar(thienPhuIdx, "Thiên Phủ");
        addMainStar((thienPhuIdx + 1) % 12, "Thái Âm");
        addMainStar((thienPhuIdx + 2) % 12, "Tham Lang");
        addMainStar((thienPhuIdx + 3) % 12, "Cự Môn");
        addMainStar((thienPhuIdx + 4) % 12, "Thiên Tướng");
        addMainStar((thienPhuIdx + 5) % 12, "Thiên Lương");
        addMainStar((thienPhuIdx + 6) % 12, "Thất Sát");
        addMainStar((thienPhuIdx + 10) % 12, "Phá Quân");

        // 6. An Vòng Lộc Tồn & Vòng Thái Tuế & Tuần/Triệt & Các Phụ Tinh Trọng Điểm
        const LOC_TON_MAP = { "Giáp": 2, "Ất": 3, "Bính": 5, "Mậu": 5, "Đinh": 6, "Kỷ": 6, "Canh": 8, "Tân": 9, "Nhâm": 11, "Quý": 0 };
        const locTonIdx = LOC_TON_MAP[canNam] ?? 2;
        addSubStar(locTonIdx, "Lộc Tồn", "loc-ton");
        addSubStar((locTonIdx + 1) % 12, "Kình Dương", "sat-tinh");
        addSubStar((locTonIdx - 1 + 12) % 12, "Đà La", "sat-tinh");

        // Vòng Bác Sĩ (12 sao) khởi từ Lộc Tồn (Dương Nam / Âm Nữ đếm thuận, Âm Nam / Dương Nữ đếm nghịch)
        const isThuanBacSi = (isDuongsTuoi && gender === "Nam") || (!isDuongsTuoi && gender !== "Nam");
        const bacSiStars = [
          { name: "Bác Sĩ", type: "phuc-tinh" }, { name: "Lực Sĩ", type: "phuc-tinh" },
          { name: "Thanh Long", type: "phuc-tinh" }, { name: "Tiểu Hao", type: "sat-tinh" },
          { name: "Tướng Quân", type: "phuc-tinh" }, { name: "Tấu Thư", type: "phuc-tinh" },
          { name: "Phi Liêm", type: "sat-tinh" }, { name: "Hỷ Thần", type: "phuc-tinh" },
          { name: "Bệnh Phù", type: "sat-tinh" }, { name: "Đại Hao", type: "sat-tinh" },
          { name: "Phục Binh", type: "sat-tinh" }, { name: "Quan Phủ", type: "sat-tinh" }
        ];
        bacSiStars.forEach((bs, idx) => {
          const bsIdx = isThuanBacSi ? (locTonIdx + idx) % 12 : (locTonIdx - idx + 12) % 12;
          // Tránh trùng Lộc Tồn đã an
          if (bs.name !== "Bác Sĩ") addSubStar(bsIdx, bs.name, bs.type);
        });

        // Vòng Thái Tuế
        addSubStar(chiNamIdx, "Thái Tuế", "thai-tue");
        addSubStar((chiNamIdx + 2) % 12, "Tang Môn", "sat-tinh");
        addSubStar((chiNamIdx + 6) % 12, "Tuế Phá", "sat-tinh");
        addSubStar((chiNamIdx + 6) % 12, "Bạch Hổ", "sat-tinh");
        addSubStar((chiNamIdx + 4) % 12, "Quan Phù", "thai-tue");
        addSubStar((chiNamIdx + 8) % 12, "Long Đức", "phuc-tinh");
        addSubStar((chiNamIdx + 10) % 12, "Phúc Đức", "phuc-tinh");

        // Tả Phù - Hữu Bật, Văn Xương - Văn Khúc
        addSubStar((4 + (thangAm - 1)) % 12, "Tả Phù", "phuc-tinh");
        addSubStar((10 - (thangAm - 1) + 12) % 12, "Hữu Bật", "phuc-tinh");
        addSubStar((4 + gioSinhIdx) % 12, "Văn Khúc", "phuc-tinh");
        addSubStar((10 - gioSinhIdx + 12) % 12, "Văn Xương", "phuc-tinh");

        // Bộ Đào Hoa - Hồng Loan - Thiên Hỷ
        const daoHoaMap = { 5:6, 9:6, 1:6, 11:0, 3:0, 7:0, 8:9, 0:9, 4:9, 2:3, 6:3, 10:3 };
        const daoHoaIdx = daoHoaMap[chiNamIdx] ?? 6;
        addSubStar(daoHoaIdx, "Đào Hoa", "dao-hoa");

        const hongLoanIdx = (3 - chiNamIdx + 12) % 12;
        addSubStar(hongLoanIdx, "Hồng Loan", "dao-hoa");
        addSubStar((hongLoanIdx + 6) % 12, "Thiên Hỷ", "dao-hoa");

        // Thiên Mã
        const thienMaMap = { 5:11, 9:11, 1:11, 11:5, 3:5, 7:5, 8:2, 0:2, 4:2, 2:8, 6:8, 10:8 };
        const thienMaIdx = thienMaMap[chiNamIdx] ?? 2;
        addSubStar(thienMaIdx, "Thiên Mã", "thien-ma");

        // Giải Thần - Thiên Giải - Địa Giải
        const phuongCacIdx = (10 - (thangAm - 1) + 12) % 12;
        addSubStar(phuongCacIdx, "Giải Thần", "giai-than");
        addSubStar((8 + (thangAm - 1)) % 12, "Thiên Giải", "giai-than");
        addSubStar((7 + (thangAm - 1)) % 12, "Địa Giải", "giai-than");

        // Địa Không - Địa Kiếp (khởi Hợi an theo giờ sinh)
        addSubStar((11 + gioSinhIdx) % 12, "Địa Kiếp", "sat-tinh");
        addSubStar((11 - gioSinhIdx + 12) % 12, "Địa Không", "sat-tinh");

        // Hỏa Tinh - Linh Tinh (an theo Chi năm + Giờ sinh)
        let hoaStart = 1, linhStart = 3;
        if ([2, 6, 10].includes(chiNamIdx)) { hoaStart = 1; linhStart = 3; } // Dần Ngọ Tuất
        else if ([8, 0, 4].includes(chiNamIdx)) { hoaStart = 2; linhStart = 10; } // Thân Tý Thìn
        else if ([5, 9, 1].includes(chiNamIdx)) { hoaStart = 3; linhStart = 10; } // Tỵ Dậu Sửu
        else { hoaStart = 9; linhStart = 10; } // Hợi Mão Mùi

        const isThuanHoaLinh = isDuongsTuoi;
        const hoaIdx = isThuanHoaLinh ? (hoaStart + gioSinhIdx) % 12 : (hoaStart - gioSinhIdx + 12) % 12;
        const linhIdx = isThuanHoaLinh ? (linhStart + gioSinhIdx) % 12 : (linhStart - gioSinhIdx + 12) % 12;
        addSubStar(hoaIdx, "Hỏa Tinh", "sat-tinh");
        addSubStar(linhIdx, "Linh Tinh", "sat-tinh");

        // Hoa Cái, Cô Thần, Quả Tú, Kiếp Sát, Thiên Không
        const hoaCaiMap = { 5:1, 9:1, 1:1, 11:7, 3:7, 7:7, 8:4, 0:4, 4:4, 2:10, 6:10, 10:10 };
        addSubStar(hoaCaiMap[chiNamIdx] ?? 1, "Hoa Cái", "phuc-tinh");

        const coThanMap = { 2:5, 3:5, 4:5, 5:8, 6:8, 7:8, 8:11, 9:11, 10:11, 11:2, 0:2, 1:2 };
        const coThanIdx = coThanMap[chiNamIdx] ?? 5;
        addSubStar(coThanIdx, "Cô Thần", "sat-tinh");
        addSubStar((coThanIdx - 4 + 12) % 12, "Quả Tú", "sat-tinh");

        // Tuần - Triệt
        const TRIET_MAP = { 0: [8,9], 1: [6,7], 2: [4,5], 3: [2,3], 4: [0,1], 5: [8,9], 6: [6,7], 7: [4,5], 8: [2,3], 9: [0,1] };
        const trietArr = TRIET_MAP[canNamIdx] || [8,9];
        trietArr.forEach(idx => starsChart[idx].tuanTriet.push("Triệt"));

        const tuanStart = (chiNamIdx - canNamIdx + 12) % 12;
        const tuan1 = (tuanStart - 2 + 12) % 12;
        const tuan2 = (tuanStart - 1 + 12) % 12;
        starsChart[tuan1].tuanTriet.push("Tuần");
        starsChart[tuan2].tuanTriet.push("Tuần");

        // 7. Tính Cung Can & Đại Hạn 10 Năm cho 12 cung
        // Dương Nam Nữ Âm đếm thuận, Âm Nam Nữ Dương đếm nghịch
        const isThuanDaXian = (isDuongsTuoi && gender === "Nam") || (!isDuongsTuoi && gender !== "Nam");
        const daXianMap = {};
        for (let k = 0; k < 12; k++) {
          const pBranch = isThuanDaXian ? (menhChiIdx + k) % 12 : (menhChiIdx - k + 12) % 12;
          const startAge = cucObj.value + k * 10;
          const endAge = startAge + 9;
          daXianMap[pBranch] = { startAge, endAge, dxIdx: k };
        }

        // Xây dựng cấu trúc 12 Cung (theo thứ tự 0..11 Tý..Hợi để render lưới 4x4)
        const palaces = Array.from({ length: 12 }, (_, chiIdx) => {
          const cungFuncIdx = (menhChiIdx - chiIdx + 12) % 12;
          const id = this.PALACE_IDS[cungFuncIdx];
          const baseTitle = this.PALACE_TITLES[cungFuncIdx];
          const isMenh = (cungFuncIdx === 0);
          const isThan = (chiIdx === thanChiIdx);
          const name = isThan && !isMenh ? `${baseTitle} (Thân)` : baseTitle;

          // Cung Can (khởi Dần từ khoiDanCanIdx)
          const stemIdx = (khoiDanCanIdx + (chiIdx - 2 + 12) % 12) % 10;
          const stem = this.CAN_NAMES[stemIdx];

          const st = starsChart[chiIdx];
          const mainStarStr = st.mainStars.length > 0
            ? st.mainStars.map(s => `${s.name} ${s.badge}`).join(", ")
            : "Vô Chính Diệu";

          const dxInfo = daXianMap[chiIdx] || { startAge: 0, endAge: 0, dxIdx: 0 };

          return {
            id,
            name,
            chi: this.CUNG_NAMES[chiIdx],
            chiIdx,
            branch: chiIdx,
            stem,
            stemIdx,
            isMenh,
            isThan,
            mainStar: mainStarStr,
            mainStarsList: st.mainStars,
            subStarsList: st.subStars,
            tuHoaList: st.tuHoa,
            tuanTrietStr: st.tuanTriet.join(", "),
            daXianAge: [dxInfo.startAge, dxInfo.endAge],
            pos: this.POS_MAP[chiIdx]
          };
        });

        // 8. Định vị cung Thân thuộc cung chức năng nào
        const thanPalaceId = this.PALACE_IDS[(menhChiIdx - thanChiIdx + 12) % 12];

        // 9. Danh sách Đại Hạn sắp xếp theo tuổi
        const daXians = palaces.map(p => ({
          startAge: p.daXianAge[0],
          endAge: p.daXianAge[1],
          branch: p.chiIdx,
          name: p.name,
          stem: p.stem,
          stemIdx: p.stemIdx
        })).sort((a, b) => a.startAge - b.startAge);

        const currentYear = new Date().getFullYear();
        const currentAge = currentYear - year + 1; // Tuổi âm (tuổi mụ)

        const MENH_CHU_MAP = {
          "Tý": "Tham Lang", "Sửu": "Cự Môn", "Dần": "Lộc Tồn", "Mão": "Văn Xương",
          "Thìn": "Liêm Trinh", "Tỵ": "Vũ Khúc", "Ngọ": "Phá Quân", "Mùi": "Vũ Khúc",
          "Thân": "Liêm Trinh", "Dậu": "Văn Xương", "Tuất": "Lộc Tồn", "Hợi": "Cự Môn"
        };
        const THAN_CHU_MAP = {
          "Tý": "Hỏa Tinh", "Sửu": "Thiên Tướng", "Dần": "Thiên Lương", "Mão": "Thiên Đồng",
          "Thìn": "Văn Xương", "Tỵ": "Linh Tinh", "Ngọ": "Hỏa Tinh", "Mùi": "Thiên Tướng",
          "Thân": "Thiên Lương", "Dậu": "Thiên Đồng", "Tuất": "Văn Xương", "Hợi": "Linh Tinh"
        };

        return {
          thienBan: {
            cucName: cucObj.name,
            cucValue: cucObj.value,
            menhChi: this.CUNG_NAMES[menhChiIdx],
            thanChi: this.CUNG_NAMES[thanChiIdx],
            menhChu: MENH_CHU_MAP[chiNam] || '',
            thanChu: THAN_CHU_MAP[chiNam] || '',
            canNam,
            canNamIdx,
            chiNam,
            chiNamIdx,
            thanPalaceId,
            amDuongLy,
            menhCucRel,
            currentAge
          },
          mingGongBranch: menhChiIdx,
          shenGongBranch: thanChiIdx,
          palaces,
          daXians
        };
      },

      // Helper Tứ Hóa
      getSiHuaByStem(stemOrIdx) {
        let stemName = stemOrIdx;
        if (typeof stemOrIdx === 'number') {
          stemName = this.CAN_NAMES[stemOrIdx % 10];
        }
        return this.TU_HOA_TABLE[stemName] || {};
      },

      getLiuNianSiHua(year) {
        const stemIdx = ((year - 4) % 10 + 10) % 10;
        return {
          year,
          stemIndex: stemIdx,
          stemName: this.CAN_NAMES[stemIdx],
          tuHoaMap: this.getSiHuaByStem(stemIdx)
        };
      },

      getLiuYueSiHua(yearStemIdx, month) {
        // Ngũ Hổ Độn: Tháng 1 (寅月) khởi Thiên Can
        const startStemOfYin = { 0: 2, 5: 2, 1: 4, 6: 4, 2: 6, 7: 6, 3: 8, 8: 8, 4: 0, 9: 0 };
        const yinStem = startStemOfYin[yearStemIdx % 10] ?? 0;
        const stemIdx = (yinStem + ((month - 1) % 12) + 10) % 10;
        return {
          month,
          stemIndex: stemIdx,
          stemName: this.CAN_NAMES[stemIdx],
          tuHoaMap: this.getSiHuaByStem(stemIdx)
        };
      },

      buildSiHuaOverlay(stemOrIdx) {
        const map = this.getSiHuaByStem(stemOrIdx);
        // Chuyển sang định dạng starName -> 'Lộc' | 'Quyền' | 'Khoa' | 'Kỵ'
        const overlay = {};
        Object.entries(map).forEach(([star, hoa]) => {
          overlay[star] = hoa;
        });
        return overlay;
      }
    },

    Numerology: {
      reduceNumber: function(num, keepMaster = true) {
        if (keepMaster && (num === 11 || num === 22 || num === 33)) return num;
        let sum = num;
        while (sum > 9) {
          if (keepMaster && (sum === 11 || sum === 22 || sum === 33)) break;
          sum = sum.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
        }
        return sum;
      },

      calculateLifePath: function(day, month, year) {
        const redDay = this.reduceNumber(day, true);
        const redMonth = this.reduceNumber(month, true);
        const redYearStr = year.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
        const redYear = this.reduceNumber(redYearStr, true);
        const total = redDay + redMonth + redYear;
        return this.reduceNumber(total, true);
      },

      calculateBirthdayNumber: function(day) {
        return this.reduceNumber(day, true);
      },

      calculateAttitudeNumber: function(day, month) {
        return this.reduceNumber(day + month, true);
      },

      calculatePersonalYear: function(day, month, targetYear = 2026) {
        const redDay = this.reduceNumber(day, false);
        const redMonth = this.reduceNumber(month, false);
        const redYear = this.reduceNumber(targetYear, false);
        return this.reduceNumber(redDay + redMonth + redYear, false);
      },

      calculateBirthGrid: function(day, month, year) {
        const dateStr = `${day.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}`;
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
        for (const ch of dateStr) {
          const d = parseInt(ch, 10);
          if (d >= 1 && d <= 9) counts[d] = (counts[d] || 0) + 1;
        }

        const arrowDefs = [
          { key: '1-2-3', name: 'Mũi tên Kế Hoạch (1-2-3)', nums: [1, 2, 3] },
          { key: '4-5-6', name: 'Mũi tên Ý Chí (4-5-6)', nums: [4, 5, 6] },
          { key: '7-8-9', name: 'Mũi tên Hoạt Động (7-8-9)', nums: [7, 8, 9] },
          { key: '1-4-7', name: 'Mũi tên Thực Tế (1-4-7)', nums: [1, 4, 7] },
          { key: '2-5-8', name: 'Mũi tên Cân Bằng Cảm Xúc (2-5-8)', nums: [2, 5, 8] },
          { key: '3-6-9', name: 'Mũi tên Trí Tuệ (3-6-9)', nums: [3, 6, 9] },
          { key: '1-5-9', name: 'Mũi tên Quyết Tâm (1-5-9)', nums: [1, 5, 9] },
          { key: '3-5-7', name: 'Mũi tên Nhạy Cảm Tâm Linh (3-5-7)', nums: [3, 5, 7] }
        ];

        const lines = arrowDefs.map(def => {
          const has = def.nums.every(n => (counts[n] || 0) > 0);
          return { name: def.name, has };
        });

        return { counts, lines };
      },

      getNumerologyDict: function() {
        return {
          2: {
            title: "Số Chủ Đạo 2 — Người Hòa Giải & Kết Nối Sâu Sắc",
            element: "Thủy / Mộc",
            keyword: "Nhạy cảm, Lắng nghe, Ngoại giao, Hòa giải, Thấu cảm",
            strengths: ["Lắng nghe tuyệt vời", "Tác phong hòa nhã", "Trực giác nhạy bén", "Xây dựng sự hợp tác"],
            advice: "Hãy học cách thiết lập ranh giới cá nhân rõ ràng, tránh để cảm xúc của người khác chi phối tinh thần.",
            personalYearMeaning: "Năm học cách kiên nhẫn, vun đắp các mối quan hệ và lắng nghe trực giác bên trong."
          },
          3: {
            title: "Số Chủ Đạo 3 — Nhà Sáng Tạo & Truyền Cảm Hứng",
            element: "Hỏa / Mộc",
            keyword: "Sáng tạo, Giao tiếp, Hài hước, Tự do biểu đạt, Nhiệt huyết",
            strengths: ["Kỹ năng giao tiếp tự nhiên", "Tư duy sáng tạo", "Mang lại niềm vui", "Truyền cảm hứng tích cực"],
            advice: "Tập trung năng lượng vào một mục tiêu thay vì phân tán sức lực vào quá nhiều dự án cùng lúc.",
            personalYearMeaning: "Năm bùng nổ ý tưởng, mở rộng mạng lưới giao thiệp và tự tin thể hiện bản thân."
          },
          4: {
            title: "Số Chủ Đạo 4 — Người Xây Dựng Kỷ Luật & Thực Tế",
            element: "Thổ / Kim",
            keyword: "Kỷ luật, Thực tế, Hệ thống, Trung thành, Tổ chức",
            strengths: ["Cẩn trọng & tỉ mỉ", "Tư duy quy trình tốt", "Đáng tin cậy cao", "Khả năng thực thi kiên trì"],
            advice: "Tránh sự cứng nhắc quá mức; cởi mở hơn với những phương pháp mới và sự thay đổi linh hoạt.",
            personalYearMeaning: "Năm củng cố nền tảng tài chính, làm việc chăm chỉ và thiết lập quy trình vững chắc."
          },
          5: {
            title: "Số Chủ Đạo 5 — Tiên Phong Khám Phá & Tự Do",
            element: "Mộc / Hỏa",
            keyword: "Tự do, Trải nghiệm, Thích ứng, Khám phá, Linh hoạt",
            strengths: ["Dễ dàng ứng biến", "Đam mê trải nghiệm", "Dũng cảm thay đổi", "Năng lượng dồi dào"],
            advice: "Tự do luôn đi kèm với trách nhiệm; tránh đưa ra các quyết định ngẫu hứng thiếu tính toán dài hạn.",
            personalYearMeaning: "Năm bứt phá khỏi vùng an toàn, chào đón cơ hội mới và những chuyến đi mở rộng tầm nhìn."
          },
          6: {
            title: "Số Chủ Đạo 6 — Người Phụng Sự & Trái Tim Yêu Thương",
            element: "Thổ / Thủy",
            keyword: "Gia đình, Chăm sóc, Phụng sự, Trách nhiệm, Nghệ thuật",
            strengths: ["Giao cảm sâu sắc", "Yêu thương gia đình", "Tinh thần trách nhiệm", "Thẩm mỹ tốt"],
            advice: "Đừng gánh vác trách nhiệm của người khác quá mức dẫn đến kiệt sức; hãy học cách tự chăm sóc bản thân.",
            personalYearMeaning: "Năm tập trung chăm sóc gia đình, vun đắp mái ấm và tìm kiếm sự cân bằng nội tâm."
          },
          7: {
            title: "Số Chủ Đạo 7 — Nhà Triết Học & Tìm Kiếm Chân Lý",
            element: "Kim / Thủy",
            keyword: "Phân tích, Trực giác, Chiêm nghiệm, Độc lập, Trí tuệ",
            strengths: ["Tư duy phân tích sâu", "Ham học hỏi", "Khả năng quan sát tinh tế", "Tính độc lập cao"],
            advice: "Tránh khép kín bản thân; chia sẻ tri thức và mở lòng kết nối với thế giới xung quanh nhiều hơn.",
            personalYearMeaning: "Năm quay vào bên trong, học tập chuyên sâu, thiền định và thanh lọc tâm trí."
          },
          8: {
            title: "Số Chủ Đạo 8 — Nhà Điều Hành & Tự Chủ Tài Chính",
            element: "Thổ / Kim",
            keyword: "Quyền lực, Quản lý tài chính, Kỷ luật, Thành công vật chất",
            strengths: ["Tầm nhìn chiến lược", "Quản lý dòng tiền", "Quyết đoán cao", "Năng lực lãnh đạo"],
            advice: "Cân bằng giữa thành công vật chất và giá trị tinh thần; ứng xử mềm mỏng để giữ gìn nhân tâm.",
            personalYearMeaning: "Năm gặt hái thành quả công việc, nâng cao thu nhập và khẳng định vị thế cá nhân."
          },
          9: {
            title: "Số Chủ Đạo 9 — Trái Tim Năng Lượng Lực Lượng Nhân Đạo",
            element: "Hỏa / Thủy",
            keyword: "Nhân đạo, Cống hiến, Lý tưởng, Ước mơ, Hoàn thiện",
            strengths: ["Lý tưởng sống cao đẹp", "Trái tim vị tha", "Tầm nhìn rộng mở", "Khả năng cảm hóa"],
            advice: "Hãy buông bỏ những điều thuộc về quá khứ để sẵn sàng bước vào chu kỳ phát triển mới.",
            personalYearMeaning: "Năm dọn dẹp, kết thúc những gì không còn phù hợp và chuẩn bị cho một chương mới."
          },
          10: {
            title: "Số Chủ Đạo 10 (1) — Nhà Lãnh Đạo Tự Lực & Linh Hoạt",
            element: "Kim / Hỏa",
            keyword: "Độc lập, Tiên phong, Linh hoạt, Tự tin, Quyết đoán",
            strengths: ["Thích nghi nhanh chóng", "Tinh thần chủ động", "Dễ thu hút người khác", "Dũng cảm"],
            advice: "Giữ vững sự khiêm tốn, tránh cái tôi quá lớn làm rạn nứt sự đồng thuận của tập thể.",
            personalYearMeaning: "Năm khởi đầu chu kỳ 9 năm mới; thời điểm vàng để bắt đầu dự án hoặc định hướng mới."
          },
          11: {
            title: "Số Chủ Đạo 11 (Master) — Ngọn Đuốc Trực Giác & Tâm Linh",
            element: "Thủy / Mộc",
            keyword: "Trực giác siêu việt, Sáng tạo đỉnh cao, Thấu cảm, Nhạy cảm",
            strengths: ["Trực giác tâm linh mạnh", "Khả năng truyền cảm hứng", "Ý tưởng đột phá", "Cảm nhận tinh tế"],
            advice: "Thực hành tĩnh tâm và củng cố năng lượng tinh thần để không bị quá tải trước áp lực môi trường.",
            personalYearMeaning: "Năm đánh thức tiềm năng tâm linh, phát triển trực giác và khai sáng bản thân."
          },
          22: {
            title: "Số Chủ Đạo 22/4 (Master Builder) — Kiến Trúc Sư Tầm Vóc Thế Giới",
            element: "Thổ / Kim",
            keyword: "Kiến tạo tầm vóc, Thực thi phi thường, Tầm nhìn lớn, Hệ thống vững chắc",
            strengths: ["Biến ý tưởng thành thực tế", "Kỹ năng tổ chức quy mô lớn", "Năng lực thực thi vượt trội"],
            advice: "Kiên nhẫn với từng bước đi nhỏ; giữ gìn sức khỏe và tránh tự gây áp lực quá tải.",
            personalYearMeaning: "Năm thực hiện các đại kế hoạch, đặt nền móng cho thành công quy mô lớn dài hạn."
          },
          33: {
            title: "Số Chủ Đạo 33/6 (Master Teacher) — Người Thầy Chữa Lành Vũ Trụ",
            element: "Hỏa / Thủy",
            keyword: "Chữa lành, Trái tim đại từ bi, Phụng sự vô điều kiện, Nghệ thuật",
            strengths: ["Năng lượng chữa lành cao", "Lòng từ bi bao la", "Kỹ năng nuôi dưỡng & giảng dạy"],
            advice: "Học cách cân bằng giữa việc hi sinh vì cộng đồng và duy trì cuộc sống cá nhân hạnh phúc.",
            personalYearMeaning: "Năm cống hiến, chữa lành và lan tỏa tình yêu thương đến cộng đồng."
          }
        };
      },

      getEasternWesternSynergy: function(lifePath, easternInfo = {}) {
        const hanh = easternInfo.hanhMenh || 'Kim';
        const can = easternInfo.canNam || 'Canh';
        const chi = easternInfo.chiNam || 'Thìn';

        return {
          title: `Giao Thoa Số Chủ Đạo ${lifePath} & Bản Mệnh ${can} ${chi} (${hanh})`,
          summary: `Sự kết hợp giữa Con Số Chủ Đạo ${lifePath} (phát triển tư duy Tây Phương) và Năng Lượng Can Chi ${can} ${chi} thuộc hành ${hanh} tạo nên sự cộng hưởng đặc biệt. Bạn sở hữu sự linh hoạt của tần số Số ${lifePath} kết hợp với sự bền bỉ của trụ mệnh Đông Phương.`,
          synergyAdvice: `Hãy lấy thế mạnh của Số ${lifePath} làm đòn bẩy trong công việc, đồng thời nương theo nhịp vận của hành ${hanh} để chọn thời điểm hành động đại sự thích hợp nhất.`
        };
      },

      getUserTuViChart: function(customProfile) {
        let p = customProfile;
        if (!p && window.Onboarding && typeof window.Onboarding.getProfile === 'function') {
          p = window.Onboarding.getProfile();
        }
        if (!p) {
          try { p = JSON.parse(localStorage.getItem('noitam_user_profile')); } catch {}
        }
        if (!p) {
          try { p = JSON.parse(localStorage.getItem('noitam_chart_config')); } catch {}
        }
        if (!p) {
          p = { gender: 'Nam', year: 2000, month: 4, day: 20, hour: 21, minute: 0, locationName: 'Hà Nội', lat: 21.03, lng: 105.85, tz: 7 };
        }

        const gender = p.gender || 'Nam';
        const year = p.year || 2000;
        const month = p.month || 4;
        const day = p.day || 20;
        const hour = (p.hour !== undefined && p.hour !== null ? p.hour : 21);
        const minute = p.minute || 0;
        const lng = p.lng || 105.85;
        const tz = p.tz || 7;

        let fp = null;
        if (this.FourPillars && typeof this.FourPillars.calculateFourPillars === 'function') {
          const civilDate = new Date(year, month - 1, day, hour, minute);
          fp = this.FourPillars.calculateFourPillars(civilDate, lng, tz);
        }
        const pillars = fp ? fp.pillars : null;

        if (this.TuViEngine && typeof this.TuViEngine.calculateTuViChart === 'function' && pillars) {
          return this.TuViEngine.calculateTuViChart({
            day: day, month: month, year: year,
            hour: hour, minute: minute, gender: gender,
            canNam: pillars.year.can, chiNam: pillars.year.chi,
            lunarDay: fp.lunarDay, lunarMonth: fp.lunarMonth
          });
        }
        return null;
      },

      getUserProfile: function() {
        let p1 = null, p2 = null;
        if (window.Onboarding && typeof window.Onboarding.getProfile === 'function') {
          p1 = window.Onboarding.getProfile();
        }
        if (!p1) {
          try { p1 = JSON.parse(localStorage.getItem('noitam_user_profile')); } catch {}
        }
        try { p2 = JSON.parse(localStorage.getItem('noitam_chart_config')); } catch {}
        let p = { ...(p1 || {}), ...(p2 || {}) };
        if (!p || !p.year) {
          p = { gender: 'Nam', year: 2000, month: 8, day: 2, hour: 0, minute: 15, locationName: 'Vĩnh Long, Việt Nam', lat: 10.25, lng: 105.97, tz: 7 };
        }
        p.hour = (p.hour !== undefined && p.hour !== null) ? (parseInt(p.hour, 10) % 24) : 0;
        if (isNaN(p.hour)) p.hour = 0;
        return p;
      },

      calculateCharacterStats: function(userProfile, phucDucPts = 120) {
        const chart = this.getUserTuViChart(userProfile);
        let vit = 75, intVal = 75, cha = 75, wis = 75, str = 75, dex = 75;

        if (chart && chart.palaces) {
          const ming = chart.palaces.find(p => p.isMenh);
          const quan = chart.palaces.find(p => p.name && p.name.includes('Quan Lộc'));
          const phuThue = chart.palaces.find(p => p.name && p.name.includes('Phu Thê'));
          const di = chart.palaces.find(p => p.name && p.name.includes('Thiên Di'));
          const tai = chart.palaces.find(p => p.name && p.name.includes('Tài Bạch'));
          const phuc = chart.palaces.find(p => p.name && p.name.includes('Phúc Đức'));

          const getStarsBonus = (palace) => {
            if (!palace) return 0;
            const mainCount = (palace.mainStarsList || []).length;
            const hasGoodSub = (palace.subStarsList || []).some(s => ['Tả Phù', 'Hữu Bật', 'Văn Xương', 'Văn Khúc', 'Thiên Khôi', 'Thiên Việt', 'Lộc Tồn'].includes(s.name));
            return (mainCount * 4) + (hasGoodSub ? 7 : 0);
          };

          vit += getStarsBonus(ming);
          intVal += getStarsBonus(quan);
          cha += getStarsBonus(phuThue);
          wis += getStarsBonus(di);
          str += getStarsBonus(tai);
          dex += getStarsBonus(phuc);
        }

        vit = Math.min(100, Math.max(50, vit));
        intVal = Math.min(100, Math.max(50, intVal));
        cha = Math.min(100, Math.max(50, cha));
        wis = Math.min(100, Math.max(50, wis));
        str = Math.min(100, Math.max(50, str));
        dex = Math.min(100, Math.max(50, dex));

        const totalPower = vit + intVal + cha + wis + str + dex;

        return {
          vit, int: intVal, cha, wis, str, dex,
          totalPower,
          phucDucPoints: phucDucPts
        };
      },

      evaluateWealthDay: function(dateStr, userProfile) {
        if (!userProfile) return { score: 50, rating: 'Bình Hòa', message: 'Không có dữ liệu bản mệnh' };
        let score = 70;
        const AL = window.AstrologyLogic;
        
        // 1. Phân tích tương tác ngũ hành ngày và bản mệnh
        const hanhMenh = userProfile.hanhMenh || 'Kim';
        const HanhSinhKhac = {
          sinh: { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' },
          khac: { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' }
        };
        try {
          if (typeof Lunar !== 'undefined') {
            const lunar = Lunar.fromDate(new Date(dateStr));
            const canNgay = AL.CAN[lunar.getDayGanIndex()];
            const hanhNgay = AL.NGU_HANH_CAN[canNgay];
            
            if (HanhSinhKhac.sinh[hanhNgay] === hanhMenh) score += 20;
            else if (HanhSinhKhac.khac[hanhNgay] === hanhMenh) score -= 15;
            else if (hanhNgay === hanhMenh) score += 10;
          }
        } catch (e) {}

        // 2. Soi Cung Tài Bạch trên lá số
        if (AL && AL.TuViEngine) {
          try {
            const tuViChart = AL.TuViEngine.calculateTuViChart({
              day: userProfile.day || 1, month: userProfile.month || 1, year: userProfile.year || 1990, hour: (userProfile.hour !== undefined && userProfile.hour !== null ? userProfile.hour : 12), minute: userProfile.minute || 0,
              gender: userProfile.gender || 'Nam', canNam: userProfile.canNam || 'Canh', chiNam: userProfile.chiNam || 'Thìn'
            });
            const taiBach = tuViChart.palaces.find(p => p.id === 'tai-bach' || p.name === 'Tài Bạch');
            if (taiBach) {
              const wealthStars = ['Vũ Khúc', 'Thiên Phủ', 'Thái Âm', 'Lộc Tồn', 'Hóa Lộc'];
              const badStars = ['Đại Hao', 'Tiểu Hao', 'Địa Không', 'Địa Kiếp', 'Hóa Kỵ'];
              const goodCount = (taiBach.mainStars||[]).concat(taiBach.minorStars||[]).filter(s => wealthStars.includes(s)).length;
              const badCount = (taiBach.mainStars||[]).concat(taiBach.minorStars||[]).filter(s => badStars.includes(s)).length;
              score = score + (goodCount * 10) - (badCount * 10);
            }
          } catch(e) {}
        }
        
        score = Math.max(0, Math.min(100, score));
        let rating = 'Bình Hòa';
        if (score >= 80) rating = 'Đại Cát';
        else if (score >= 60) rating = 'Tiểu Cát';
        else if (score < 40) rating = 'Cẩn Trọng';

        return { score, rating, message: 'Phân tích từ tương quan Hành ngày và Cung Tài Bạch.' };
      },

      calculateRetroAccuracy: function(logs) {
        if (!logs || logs.length === 0) return { accuracyPct: 0, correlationLevel: 'Chưa đủ dữ liệu', insight: 'Vui lòng check-in để AI bắt đầu phân tích.' };
        let totalError = 0;
        let count = 0;
        
        logs.forEach(log => {
           // log.predictedScore: 0-100, log.actualScore: 1-5 (convert to 0-100 scale: 1=20, 2=40, 3=60, 4=80, 5=100)
           if (log.predictedScore != null && log.actualScore != null) {
              const actualScaled = log.actualScore * 20;
              const diff = Math.abs(log.predictedScore - actualScaled);
              totalError += diff;
              count++;
           }
        });

        if (count === 0) return { accuracyPct: 0, correlationLevel: 'Chưa đủ dữ liệu', insight: 'Vui lòng check-in.' };
        
        const avgError = totalError / count;
        // 0 error = 100% accuracy, 100 error = 0% accuracy
        const accuracyPct = Math.max(0, Math.round(100 - avgError));
        let correlationLevel = 'Trung Bình';
        if (accuracyPct >= 80) correlationLevel = 'Rất Cao';
        else if (accuracyPct >= 65) correlationLevel = 'Khá';
        else if (accuracyPct < 50) correlationLevel = 'Thấp';

        return {
          accuracyPct,
          correlationLevel,
          insight: \`Hệ thống đã học từ \${count} mẫu chiêm nghiệm. Độ tương quan hiện tại đạt \${accuracyPct}%.\`
        };
      },

      calculateDailyTransit: function(dateStr, userProfile) {
        const AL = window.AstrologyLogic;
        if (!AL || !AL.TuViEngine) return null;
        
        // 1. Calculate Base Chart
        const baseChart = AL.TuViEngine.calculateTuViChart({
          day: userProfile.day || 1, month: userProfile.month || 1, year: userProfile.year || 1990, hour: (userProfile.hour !== undefined && userProfile.hour !== null ? userProfile.hour : 12), minute: userProfile.minute || 0,
          gender: userProfile.gender || 'Nam', canNam: userProfile.canNam || 'Canh', chiNam: userProfile.chiNam || 'Thìn'
        });
        if (!baseChart || !baseChart.palaces) return null;

        // 2. Lấy Thiên Can ngày hôm nay (dùng cho Tứ Hóa)
        let canNgay = 'Giáp';
        let chiNgay = 'Tý';
        let hanhNgay = 'Kim';
        try {
          if (typeof Lunar !== 'undefined') {
            const lunar = Lunar.fromDate(new Date(dateStr));
            canNgay = AL.CAN[lunar.getDayGanIndex()];
            chiNgay = AL.CUNG[lunar.getDayZhiIndex()];
            hanhNgay = AL.NGU_HANH_CAN[canNgay];
          }
        } catch(e) {}

        // Tứ Hóa theo Can
        const TU_HOA_MAP = {
          'Giáp': { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc', ky: 'Thái Dương' },
          'Ất': { loc: 'Thiên Cơ', quyen: 'Thiên Lương', khoa: 'Tử Vi', ky: 'Thái Âm' },
          'Bính': { loc: 'Thiên Đồng', quyen: 'Thiên Cơ', khoa: 'Văn Xương', ky: 'Liêm Trinh' },
          'Đinh': { loc: 'Thái Âm', quyen: 'Thiên Đồng', khoa: 'Thiên Cơ', ky: 'Cự Môn' },
          'Mậu': { loc: 'Tham Lang', quyen: 'Thái Âm', khoa: 'Hữu Bật', ky: 'Thiên Cơ' },
          'Kỷ': { loc: 'Vũ Khúc', quyen: 'Tham Lang', khoa: 'Thiên Lương', ky: 'Văn Khúc' },
          'Canh': { loc: 'Thái Dương', quyen: 'Vũ Khúc', khoa: 'Thái Âm', ky: 'Thiên Đồng' },
          'Tân': { loc: 'Cự Môn', quyen: 'Thái Dương', khoa: 'Văn Khúc', ky: 'Văn Xương' },
          'Nhâm': { loc: 'Thiên Lương', quyen: 'Tử Vi', khoa: 'Tả Phù', ky: 'Vũ Khúc' },
          'Quý': { loc: 'Phá Quân', quyen: 'Cự Môn', khoa: 'Thái Âm', ky: 'Tham Lang' }
        };
        const tuHoa = TU_HOA_MAP[canNgay] || TU_HOA_MAP['Giáp'];

        // 3. Xác định Cung Lưu Nhật
        let luuNhatChiIndex = 2; // Dần
        try {
          if (typeof Lunar !== 'undefined') {
            const lunar = Lunar.fromDate(new Date(dateStr));
            const month = Math.abs(lunar.getMonth());
            const day = lunar.getDay();
            luuNhatChiIndex = (2 + (month - 1) + (day - 1)) % 12;
          }
        } catch(e) {}
        const CHI_ARRAY = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const luuNhatChi = CHI_ARRAY[luuNhatChiIndex];

        // Xác định vị trí các Hóa
        let locPalace = null, kyPalace = null, quyenPalace = null;
        baseChart.palaces.forEach(p => {
          const stars = (p.mainStars||[]).concat(p.minorStars||[]);
          if (stars.includes(tuHoa.loc)) locPalace = p;
          if (stars.includes(tuHoa.ky)) kyPalace = p;
          if (stars.includes(tuHoa.quyen)) quyenPalace = p;
        });

        const luuNhatPalace = baseChart.palaces.find(p => p.chi === luuNhatChi);

        return {
          baseChart,
          canNgay, chiNgay, hanhNgay,
          tuHoa,
          luuNhatChi,
          luuNhatPalace,
          locPalace, kyPalace, quyenPalace
        };
      },

      getDailyRemedy: function(transitData, userProfile) {
        if (!transitData || !userProfile) return null;
        
        const { tuHoa, luuNhatPalace, locPalace, kyPalace, hanhNgay } = transitData;
        const hanhMenh = userProfile.hanhMenh || 'Kim';

        // 1. Phân tích Action Mode (Động / Tĩnh)
        let isBadDay = false;
        let alertMsg = '';
        if (kyPalace && luuNhatPalace && kyPalace.chi === luuNhatPalace.chi) {
          isBadDay = true;
          alertMsg = `CẢNH BÁO ĐỎ: Cung Mệnh của ngày hôm nay trực tiếp gặp Hóa Kỵ (${tuHoa.ky}). Tránh kích động, không đầu tư lớn.`;
        } else if (kyPalace && (kyPalace.id === 'tai-bach' || kyPalace.name === 'Tài Bạch')) {
          isBadDay = true;
          alertMsg = `CẢNH BÁO ĐỎ: Cung Tài Bạch gốc bị Hóa Kỵ (${tuHoa.ky}) xung phá hôm nay. Nguy cơ hao tài tốn của rất cao.`;
        }

        const actionMode = isBadDay ? 'TĨNH (Thủ thế, nhẫn nhịn, tránh quyết định lớn)' : 'ĐỘNG (Chủ động, nắm bắt cơ hội, tấn công)';
        
        // 2. Y phục / Vật phẩm (Wardrobe)
        const HanhSinhKhac = {
          sinh: { 'Kim': 'Thủy', 'Thủy': 'Mộc', 'Mộc': 'Hỏa', 'Hỏa': 'Thổ', 'Thổ': 'Kim' },
          khac: { 'Kim': 'Mộc', 'Mộc': 'Thổ', 'Thổ': 'Thủy', 'Thủy': 'Hỏa', 'Hỏa': 'Kim' }
        };
        const COLOR_MAP = {
          'Kim': 'Trắng, Bạc, Ghi',
          'Mộc': 'Xanh lá, Xanh rêu',
          'Thủy': 'Đen, Xanh biển',
          'Hỏa': 'Đỏ, Hồng, Tím',
          'Thổ': 'Vàng, Nâu đất'
        };

        let dungThan = hanhMenh;
        if (HanhSinhKhac.khac[hanhNgay] === hanhMenh) {
           dungThan = Object.keys(HanhSinhKhac.sinh).find(k => HanhSinhKhac.sinh[k] === hanhMenh && HanhSinhKhac.khac[hanhNgay] !== k) || hanhMenh;
        } else if (HanhSinhKhac.khac[hanhMenh] === hanhNgay) {
           dungThan = Object.keys(HanhSinhKhac.sinh).find(k => HanhSinhKhac.sinh[k] === hanhMenh) || hanhMenh;
        }

        const wardrobe = `Ưu tiên trang phục/phụ kiện màu ${COLOR_MAP[dungThan]} (Hành ${dungThan}) để cân bằng trường khí.`;

        // 3. Phương vị xuất hành
        const BRANCH_DIR = {
            'Tý': 'Bắc', 'Sửu': 'Đông Bắc', 'Dần': 'Đông Bắc', 'Mão': 'Đông',
            'Thìn': 'Đông Nam', 'Tỵ': 'Đông Nam', 'Ngọ': 'Nam', 'Mùi': 'Tây Nam',
            'Thân': 'Tây Nam', 'Dậu': 'Tây', 'Tuất': 'Tây Bắc', 'Hợi': 'Tây Bắc'
        };
        let direction = 'Trung Cung (Tại chỗ)';
        if (locPalace) {
          direction = `${BRANCH_DIR[locPalace.chi]} (Đón Hóa Lộc tại cung ${locPalace.name})`;
        } else if (quyenPalace) {
          direction = `${BRANCH_DIR[quyenPalace.chi]} (Đón Hóa Quyền tại cung ${quyenPalace.name})`;
        }

        return {
          isBadDay,
          alertMsg,
          actionMode,
          wardrobe,
          direction,
          dungThan
        };
      },

      getSkillTreeData: function() {
        return [
          {
            name: 'Thân Tâm (VIT)',
            icon: '🧘',
            color: '#10b981',
            skills: [
              { name: 'Thiền Định Tốc Độ', desc: 'Quan sát suy nghĩ và làm chủ cảm xúc', level: 4, maxLevel: 5 },
              { name: 'Rèn Luyện Thể Lực', desc: 'Duy trì năng lượng sinh học ổn định', level: 3, maxLevel: 5 }
            ]
          },
          {
            name: 'Sự Nghiệp (INT)',
            icon: '👑',
            color: '#3b82f6',
            skills: [
              { name: 'Tư Duy Hệ Thống', desc: 'Phân tích & hoạch định chiến lược dài hạn', level: 5, maxLevel: 5 },
              { name: 'Tối Ưu Vận Hành', desc: 'Tối đa hóa hiệu suất làm việc cá nhân', level: 4, maxLevel: 5 }
            ]
          },
          {
            name: 'Tài Chính (STR)',
            icon: '💰',
            color: '#f59e0b',
            skills: [
              { name: 'Tích Lũy Lộc Tồn', desc: 'Quản trị rủi ro & duy trì dòng tiền', level: 4, maxLevel: 5 },
              { name: 'Đầu Tư Tăng Trưởng', desc: 'Gia tăng tài sản bền vững theo thời gian', level: 3, maxLevel: 5 }
            ]
          },
          {
            name: 'Tri Thức (DEX)',
            icon: '📚',
            color: '#06b6d4',
            skills: [
              { name: 'Ứng Dụng Cổ Tịch', desc: 'Vận dụng Tử Vi & Kinh Dịch vào thực tế', level: 5, maxLevel: 5 },
              { name: 'Phản Tư Nhật Ký', desc: 'Đúc kết bài học sau mỗi trải nghiệm cuộc sống', level: 5, maxLevel: 5 }
            ]
          }
          }
        ];
      },

      calculateLifeTimeline: function(userProfile) {
        const currentYear = new Date().getFullYear();
        const birthYear = userProfile.birthYear || userProfile.year || 1995;
        const currentAge = currentYear - birthYear + 1;
        
        let yearlyData = [];
        for (let age = 20; age <= 80; age++) {
          const calendarYear = birthYear + age - 1;
          const canIdx = (calendarYear - 4) % 10;
          const chiIdx = (calendarYear - 4) % 12;
          const can = typeof CAN !== 'undefined' ? CAN[(canIdx + 10) % 10] : '';
          const chi = typeof CUNG !== 'undefined' ? CUNG[(chiIdx + 12) % 12] : '';
          
          // Basic mock score calculation
          let lesScore = 65; 
          if ((chiIdx + 12) % 12 === 4 || (chiIdx + 12) % 12 === 10) lesScore -= 20; // Thai Tui / Tue Pha mock
          else if (age % 10 === 5) lesScore += 25;
          lesScore = Math.max(30, Math.min(95, lesScore));

          let statusFlag = 'Bình Hòa';
          if (lesScore >= 80) statusFlag = 'Tấn Công';
          else if (lesScore < 50) statusFlag = 'Phòng Thủ';
          
          yearlyData.push({
            age: age,
            calendarYear: calendarYear,
            canChi: `${can} ${chi}`,
            lesScore: lesScore,
            statusFlag: statusFlag,
            isCurrentAge: age === currentAge
          });
        }
        
        return {
          currentAge: currentAge,
          yearlyData: yearlyData
        };
      }
    }
  };
})();



