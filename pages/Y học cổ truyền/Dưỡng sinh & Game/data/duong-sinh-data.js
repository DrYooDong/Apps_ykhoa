/**
 * DUONG SINH DATA STORE - CliniPortal YHCT Module
 * Dữ liệu 24 Tiết Khí Dưỡng Sinh, 9 Thể Chất YHCT và Bộ trắc nghiệm phân tích thể chất
 */

const DUONG_SINH_DATA = {
  solarTerms: [
    { name: "Lập Xuân", time: "04/02 - 18/02", element: "Mộc", focus: "Dưỡng Can, phát tán phong hàn", diet: "Nên ăn tỏi tây, hành lá, rau hẹ. Tránh ăn đồ chua quá đà.", point: "Thái Xung (LR3)" },
    { name: "Vũ Thủy", time: "19/02 - 05/03", element: "Mộc", focus: "Kiện Tỳ trừ thấp, tư dưỡng phế âm", diet: "Nên ăn cháo khoai môn, táo đỏ, hoài sơn.", point: "Túc Tam Lý (ST36)" },
    { name: "Kinh Trập", time: "06/03 - 20/03", element: "Mộc", focus: "Thanh Can mẫn Phế, ngừa ho mùa xuân", diet: "Nên ăn lê hấp đường phèn, rau má, ngó sen.", point: "Xích Trạch (LU5)" },
    { name: "Xuân Phân", time: "21/03 - 04/04", element: "Mộc - Thổ", focus: "Cân bằng âm dương, điều hòa Tỳ Can", diet: "Ăn đồ luộc thanh nhẹ, rau mầm, trà hoa cúc.", point: "Tam Âm Giao (SP6)" },
    { name: "Thanh Minh", time: "05/04 - 19/04", element: "Mộc", focus: "Nhu can dưỡng huyết, thông khí huyết", diet: "Nên uống trà táo đỏ kỷ tử, ăn rau ngót.", point: "Hành Gian (LR2)" },
    { name: "Cốc Vũ", time: "20/04 - 04/05", element: "Mộc - Thổ", focus: "Trừ thấp kiện tỳ, chuẩn bị sang hè", diet: "Nên ăn đậu đỏ, hạt ý dĩ, củ sen.", point: "Âm Lăng Tuyền (SP9)" },
    { name: "Lập Hạ", time: "05/05 - 20/05", element: "Hỏa", focus: "Dưỡng Tâm hỏa, thanh nhiệt trừ phiền", diet: "Nên ăn đỗ đen, dưa hấu, chè hạt sen.", point: "Thần Môn (HT7)" },
    { name: "Tiểu Mãn", time: "21/05 - 05/06", element: "Hỏa", focus: "Thanh nhiệt lợi thấp, bảo vệ da", diet: "Nên ăn dưa chuột, bí đao, rau má.", point: "Khúc Trì (LI11)" },
    { name: "Mang Chủng", time: "06/06 - 20/06", element: "Hỏa", focus: "Bổ khí sinh tân, ngừa trúng nắng", diet: "Nên uống nước chanh đường muối, trà sâm.", point: "Nội Quan (PC6)" },
    { name: "Hạ Chí", time: "21/06 - 06/07", element: "Hỏa", focus: "Dưỡng âm phòng hỏa vượng (Dương cực sinh Âm)", diet: "Nên ăn mướp đắng, canh rau muống dầm sấu.", point: "Thiếu Hải (HT3)" },
    { name: "Tiểu Thử", time: "07/07 - 22/07", element: "Thổ (Trưởng Hạ)", focus: "Thanh nhiệt giải thử, kiện tỳ hóa thấp", diet: "Nên ăn cháo đậu xanh, chè củ sắn.", point: "Tỳ Du (BL20)" },
    { name: "Đại Thử", time: "23/07 - 07/08", element: "Thổ (Trưởng Hạ)", focus: "Bảo vệ tỳ vị trước cái nóng ẩm cực điểm", diet: "Nên uống nước dừa, ăn mướp đắng hấp thịt.", point: "Túc Tam Lý (ST36)" },
    { name: "Lập Thu", time: "08/08 - 22/08", element: "Kim", focus: "Nhuận Phế dưỡng âm, tránh táo nhiệt", diet: "Nên ăn củ cải trắng, củ sen, ngó sen.", point: "Thái Uyên (LU9)" },
    { name: "Xử Thử", time: "23/08 - 06/09", element: "Kim", focus: "Thanh táo nhuận phế, bổ âm", diet: "Nên ăn nho, quả hồng, mật ong hòa nước ấm.", point: "Chiếu Hải (KI6)" },
    { name: "Thu Phân", time: "23/09 - 07/10", element: "Kim", focus: "Cân bằng âm dương mùa thu, nhuận phế", diet: "Nên ăn cháo hạt sen ngó sen, nấm tuyết.", point: "Phế Du (BL13)" },
    { name: "Lập Đông", time: "07/11 - 21/11", element: "Thủy", focus: "Bổ Thận tàng tinh, giữ ấm cơ thể", diet: "Nên ăn thịt dê, đuôi bò, hạt óc chó, thục địa.", point: "Thái Khê (KI3)" },
    { name: "Đông Chí", time: "21/12 - 04/01", element: "Thủy", focus: "Dưỡng dương tàng tinh (Âm cực sinh Dương)", diet: "Nên ăn canh gừng tỏi, cháo đậu đỏ, hầm gà.", point: "Dũng Tuyền (KI1)" }
  ],

  constitutions: [
    {
      id: "khic-hu",
      name: "Thể Khí Hư",
      desc: "Hơi thở ngắn, nói nhỏ, dễ mệt mỏi khi vận động, mồ hôi trộm, dễ bị cảm.",
      advice: "Nên ăn Nhân Sâm, Hoàng Kỳ, Hoài Sơn, hạt sen, thịt gà. Tránh ăn đồ sống lạnh.",
      points: "Túc Tam Lý (ST36), Bổ Trung Ích Khí, Khí Hải (CV6)."
    },
    {
      id: "duong-hu",
      name: "Thể Dương Hư",
      desc: "Sợ lạnh, tay chân lạnh ngắt, thích uống nước ấm, đi tiểu đêm nhiều, phân sống.",
      advice: "Nên ăn gừng, quế, thịt dê, tôm, hẹ, hạt tiêu. Tránh uống nước đá dưa hấu.",
      points: "Mệnh Môn (GV4), Quan Nguyên (CV4), Dũng Tuyền (KI1)."
    },
    {
      id: "am-hu",
      name: "Thể Âm Hư",
      desc: "Nóng lòng bàn tay bàn chân, họng khô miệng đắng, hay bứt rứt, phân khô táo.",
      advice: "Nên ăn Kỷ Tử, nấm tuyết, thịt vịt, củ sen, yến sào. Tránh đồ cay nóng chiên rán.",
      points: "Thái Khê (KI3), Tam Âm Giao (SP6), Chiếu Hải (KI6)."
    },
    {
      id: "dam-thap",
      name: "Thể Đàm Thấp",
      desc: "Người đà đẫn, bụng to mỡ thừa, miệng dính nhớt, đờm nhiều, cảm giác nặng nề.",
      advice: "Nên ăn ý dĩ, đậu đỏ, củ cải, trà trần bì. Tránh đồ ngọt, sữa, thịt mỡ.",
      points: "Phong Long (ST40), Âm Lăng Tuyền (SP9), Tỳ Du (BL20)."
    },
    {
      id: "binh-hoa",
      name: "Thể Bình Hòa",
      desc: "Thân hình cân đối, sắc mặt hồng hào, tinh thần minh mẫn, ăn ngủ ngon.",
      advice: "Duy trì chế độ ăn uống điều độ, tập luyện nhẹ nhàng.",
      points: "Túc Tam Lý (ST36) định kỳ dưỡng sinh."
    }
  ],

  quiz: [
    { q: "Bạn có hay bị mệt mỏi, thở ngắn, nói nhỏ và dễ bị cảm mạo không?", type: "khic-hu" },
    { q: "Tay chân bạn có hay bị lạnh ngắt, sợ gió lạnh và thích uống nước ấm không?", type: "duong-hu" },
    { q: "Lòng bàn tay bàn chân bạn có hay bị nóng rát, họng khô, bứt rứt mồ hôi trộm không?", type: "am-hu" },
    { q: "Bạn có cảm giác thân thể nặng nề, bụng to, miệng dính trệ và hay có đờm không?", type: "dam-thap" },
    { q: "Sức khỏe bạn bình thường, ăn ngủ ngon, da dẻ hồng hào không có triệu chứng gì đặc biệt?", type: "binh-hoa" }
  ]
};
