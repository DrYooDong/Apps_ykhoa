/**
 * MACH CHAN DATA STORE - CliniPortal YHCT Module
 * Dữ liệu 28 loại mạch tượng Đông y kinh điển, vị trí Thốn - Quan - Xích và thông số sóng mạch
 */

const MACH_CHAN_DATA = {
  positions: {
    left: {
      name: "Tay Trái (Tả Thủ)",
      cun: "Thốn: Tạng Tâm & Tiểu Trường",
      guan: "Quan: Tạng Can & Phủ Đảm",
      chi: "Xích: Tạng Thận (Âm) & Bàng Quang"
    },
    right: {
      name: "Tay Phải (Hữu Thủ)",
      cun: "Thốn: Tạng Phế & Đại Trường",
      guan: "Quan: Tạng Tỳ & Phủ Vị",
      chi: "Xích: Thận Dương (Mệnh Môn)"
    }
  },

  pressures: {
    phu: { label: "Cử (Ấn Nhẹ)", desc: "Ngón tay vừa chạm nhẹ vào da đã thấy mạch đập rõ." },
    trung: { label: "Tầm (Ấn Vừa)", desc: "Ngón tay đè lực trung bình giữa da và xương." },
    tram: { label: "Án (Ấn Nặng)", desc: "Ngón tay đè sâu sát tận xương mới cảm nhận được mạch đập." }
  },

  pulses: [
    {
      id: "phu",
      name: "Mạch Phù",
      pinyin: "FÚ MÀI (浮脉)",
      group: "Mạch Nông (Cử)",
      depth: "phu",
      speedBpm: 75,
      amplitude: 1.2,
      sharpness: 1.0,
      desc: "Ấn nhẹ tay đã thấy đập rõ rệt, ấn nặng tay xuống thì yếu dần.",
      syndromes: "Biểu chứng (Cảm mạo phong hàn / phong nhiệt mới phát). Phù mà hư là Biểu hư, Phù mà thực là Biểu thực.",
      westCorr: "Tăng lưu lượng máu ngoại vi nhẹ giai đoạn đầu nhiễm trùng / sốt cấp tính."
    },
    {
      id: "tram",
      name: "Mạch Trầm",
      pinyin: "CHÉN MÀI (沉脉)",
      group: "Mạch Sâu (Án)",
      depth: "tram",
      speedBpm: 70,
      amplitude: 0.8,
      sharpness: 0.9,
      desc: "Ấn nhẹ tay không thấy đập, ấn nặng sát tận xương mới thấy đập rõ.",
      syndromes: "Lý chứng. Trầm thực là Lý thực, Trầm hư là Lý hư.",
      westCorr: "Giảm tưới máu ngoại vi, co mạch sâu hoặc suy giảm thể tích tuần hoàn."
    },
    {
      id: "tri",
      name: "Mạch Trì",
      pinyin: "CHÍ MÀI (迟脉)",
      group: "Mạch Chậm",
      depth: "trung",
      speedBpm: 50,
      amplitude: 1.0,
      sharpness: 0.8,
      desc: "Nhịp đập chậm chạp, dưới 60 nhịp/phút (một hơi thở đập dưới 4 nhịp).",
      syndromes: "Hàn chứng. Trì thực là Hàn thực tích trệ, Trì hư là Dương khí hư hàn.",
      westCorr: "Nhịp tim chậm xoang (Sinus Bradycardia), bloc dẫn truyền tim."
    },
    {
      id: "sac",
      name: "Mạch Sác",
      pinyin: "SHÙ MÀI (数脉)",
      group: "Mạch Nhanh",
      depth: "trung",
      speedBpm: 105,
      amplitude: 1.1,
      sharpness: 1.2,
      desc: "Nhịp đập nhanh dồn dập, trên 90 nhịp/phút (một hơi thở đập 5-6 nhịp).",
      syndromes: "Nhiệt chứng. Sác thực là Thực nhiệt, Sác hư là Âm hư nội nhiệt.",
      westCorr: "Nhịp tim nhanh xoang (Sinus Tachycardia), nhiễm trùng sốt cao, nhiễm độc giáp."
    },
    {
      id: "huyen",
      name: "Mạch Huyền",
      pinyin: "XIÁN MÀI (弦脉)",
      group: "Mạch Căng",
      depth: "trung",
      speedBpm: 80,
      amplitude: 1.4,
      sharpness: 1.8,
      desc: "Ấn vào ngón tay thấy căng dài và cứng như gảy dây đàn violin.",
      syndromes: "Bệnh lý Can Đảm, Đau nhức dữ dội, Đờm ẩm tích trệ.",
      westCorr: "Tăng sức cản mạch máu ngoại vi, Tăng huyết áp (Hypertension), xơ cứng động mạch."
    },
    {
      id: "hoat",
      name: "Mạch Hoạt",
      pinyin: "HUÓ MÀI (滑脉)",
      group: "Mạch Trơn",
      depth: "trung",
      speedBpm: 85,
      amplitude: 1.3,
      sharpness: 0.6,
      desc: "Nhịp đập trơn tru linh hoạt, cuồn cuộn như hạt ngọc lăn trên đĩa sứ.",
      syndromes: "Đờm ẩm tích trệ, Thực tích (bội thực), Mang thai (Phụ nữ có thai mạch Hoạt là bình thường).",
      westCorr: "Tăng thể tích tâm thu, tăng tuần hoàn tử cung rau thai thời kỳ mang thai."
    },
    {
      id: "sap",
      name: "Mạch Sáp",
      pinyin: "SÈ MÀI (涩脉)",
      group: "Mạch Rít",
      depth: "trung",
      speedBpm: 65,
      amplitude: 0.6,
      sharpness: 1.5,
      desc: "Nhịp đập rít ráo không trơn tru, đi lại khó khăn như dao cạo nhẹ vỏ tre.",
      syndromes: "Huyết ứ trệ, Tinh huyết suy hao, Trệ khí.",
      westCorr: "Tăng độ nhớt máu (Hyperviscosity), thiếu máu cục bộ, vữa xơ động mạch hẹp lòng mạch."
    },
    {
      id: "te",
      name: "Mạch Tế (Mạch Tiếu)",
      pinyin: "XÌ MÀI (细脉)",
      group: "Mạch Nhỏ",
      depth: "tram",
      speedBpm: 82,
      amplitude: 0.5,
      sharpness: 0.7,
      desc: "Đường mạch nhỏ lăn tăn như sợi chỉ mảnh nhưng vẫn cảm nhận rõ dưới ngón tay.",
      syndromes: "Khí huyết hư suy, Âm hư tổn, Thấp chứng.",
      westCorr: "Thiếu máu (Anemia), hạ huyết áp, giảm thể tích lòng mạch."
    },
    {
      id: "dai",
      name: "Mạch Đại",
      pinyin: "DÀ MÀI (大脉)",
      group: "Mạch Lớn",
      depth: "phu",
      speedBpm: 85,
      amplitude: 1.8,
      sharpness: 1.1,
      desc: "Đường mạch đập to béo rộng rãi vượt bình thường.",
      syndromes: "Thực nhiệt bệnh tiến triển hoặc Khí hư độc tôn.",
      westCorr: "Tăng áp lực xung huyết động mạch."
    },
    {
      id: "nhu",
      name: "Mạch Nhu",
      pinyin: "RÚ MÀI (濡脉)",
      group: "Mạch Mềm Mỏng",
      depth: "phu",
      speedBpm: 75,
      amplitude: 0.7,
      sharpness: 0.4,
      desc: "Mạch phù mà nhỏ mềm mại như bông trôi trên nước, ấn nhẹ thấy, ấn nặng mất ngay.",
      syndromes: "Khí huyết hư suy, Thấp chứng nội đọng.",
      westCorr: "Hạ huyết áp tư thế, suy nhược cơ thể."
    },
    {
      id: "hong",
      name: "Mạch Hồng",
      pinyin: "HÓNG MÀI (洪脉)",
      group: "Mạch Cuồn Cuộn",
      depth: "phu",
      speedBpm: 95,
      amplitude: 1.9,
      sharpness: 1.3,
      desc: "Mạch đập cực to dồn dập như sóng biển dâng cao rồi rút nhanh xuống.",
      syndromes: "Khí phân thực nhiệt cực thịnh (Sốt cao mùa hè).",
      westCorr: "Sốt cao nhiễm trùng nặng, tăng động tuần hoàn (Hyperdynamic circulation)."
    },
    {
      id: "ket",
      name: "Mạch Kết",
      pinyin: "JIÉ MÀI (结脉)",
      group: "Mạch Ngưng Nhịp",
      depth: "trung",
      speedBpm: 55,
      amplitude: 0.9,
      sharpness: 1.0,
      desc: "Nhịp đập chậm chạp có lúc tự nhiên dừng một nhịp rồi đập tiếp (nghỉ không quy luật).",
      syndromes: "Âm thịnh huyết ứ, Khí trệ đờm đọng, Tâm khí hư.",
      westCorr: "Ngoại tâm thu nhịp chậm (Bradyarrhythmia with extrasystole)."
    },
    {
      id: "xuc",
      name: "Mạch Xúc",
      pinyin: "CÙ MÀI (促脉)",
      group: "Mạch Ngưng Nhịp Nhanh",
      depth: "trung",
      speedBpm: 100,
      amplitude: 1.2,
      sharpness: 1.1,
      desc: "Nhịp đập rất nhanh nhưng thỉnh thoảng ngưng ngắt một nhịp đột ngột.",
      syndromes: "Dương nhiệt thịnh cực, Thực nhiệt tích trệ, Huyết ứ trệ.",
      westCorr: "Cuồng nhĩ / Rung nhĩ đáp ứng thất nhanh (Atrial Fibrillation with RVR)."
    }
  ]
};
