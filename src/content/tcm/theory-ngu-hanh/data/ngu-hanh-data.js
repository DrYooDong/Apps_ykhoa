/**
 * NGU HANH DATA STORE - CliniPortal YHCT Module
 * Dữ liệu 5 hành, thuộc tính quy loại, mối quan hệ tương sinh tương khắc và thể bệnh lâm sàng
 */

const NGU_HANH_DATA = {
  elements: {
    wood: {
      id: "wood",
      name: "Mộc",
      symbol: "🌲",
      color: "#10b981",
      colorHl: "#d1fae5",
      darkColor: "#059669",
      tang: "Can",
      phu: "Đảm (Mật)",
      the: "Cân (Gân)",
      khieu: "Mắt",
      chi: "Nộ (Giận dữ)",
      sac: "Xanh",
      vi: "Chua (Toan)",
      mua: "Xuân",
      huong: "Đông",
      khi: "Phong (Gió)",
      nguDuHuyet: [
        { type: "Tỉnh (Mộc)", name: "Đại Đôn (LR1)", loc: "Góc ngoài mống chân cái" },
        { type: "Huỳnh (Hỏa)", name: "Hành Gian (LR2)", loc: "Kẽ ngón chân 1-2" },
        { type: "Du (Thổ)", name: "Thái Xung (LR3)", loc: "Mu chân, sau kẽ ngón 1-2" },
        { type: "Kinh (Kim)", name: "Trung Phong (LR4)", loc: "Trước mắt cá trong" },
        { type: "Hợp (Thủy)", name: "Khúc Tuyền (LR8)", loc: "Đầu trong nếp gấp khoeo" }
      ],
      description: "Mộc đại diện cho sự sinh trưởng, phát triển, vươn cao. Can chủ sơ tiết, tàng huyết, chủ cân, khai khiếu ra mắt."
    },
    fire: {
      id: "fire",
      name: "Hỏa",
      symbol: "🔥",
      color: "#ef4444",
      colorHl: "#fee2e2",
      darkColor: "#dc2626",
      tang: "Tâm & Tâm Bào",
      phu: "Tiểu Trường & Tam Tiêu",
      the: "Mạch (Mạch máu)",
      khieu: "Lưỡi",
      chi: "Hỷ (Mừng rỡ)",
      sac: "Đỏ",
      vi: "Đắng (Khổ)",
      mua: "Hạ (Mùa hè)",
      huong: "Nam",
      khi: "Nhiệt / Thử (Nóng)",
      nguDuHuyet: [
        { type: "Tỉnh (Mộc)", name: "Thiếu Xung (HT9)", loc: "Góc trong mống ngón út" },
        { type: "Huỳnh (Hỏa)", name: "Thiếu Phủ (HT8)", loc: "Lòng bàn tay kẽ ngón 4-5" },
        { type: "Du (Thổ)", name: "Thần Môn (HT7)", loc: "Nếp gấp cổ tay phía ngón út" },
        { type: "Kinh (Kim)", name: "Linh Đạo (HT4)", loc: "Trên nếp cổ tay 1.5 thốn" },
        { type: "Hợp (Thủy)", name: "Thiếu Hải (HT3)", loc: "Đầu trong nếp gấp khuỷu" }
      ],
      description: "Hỏa đại diện cho sức nóng, sự bốc lên, phát sáng. Tâm chủ huyết mạch, tàng thần, khai khiếu ra lưỡi."
    },
    earth: {
      id: "earth",
      name: "Thổ",
      symbol: "⛰️",
      color: "#f59e0b",
      colorHl: "#fef3c7",
      darkColor: "#d97706",
      tang: "Tỳ",
      phu: "Vị (Dạ dày)",
      the: "Cơ thịt (Cơ bắp)",
      khieu: "Miệng (Môi)",
      chi: "Tư (Lo nghĩ)",
      sac: "Vàng",
      vi: "Ngọt (Cam)",
      mua: "Trưởng Hạ (Cuối hạ)",
      huong: "Trung Tâm",
      khi: "Thấp (Ẩm ướt)",
      nguDuHuyet: [
        { type: "Tỉnh (Mộc)", name: "Ẩn Bạch (SP1)", loc: "Góc trong mống chân cái" },
        { type: "Huỳnh (Hỏa)", name: "Đại Đô (SP2)", loc: "Sau khớp ngón chân cái" },
        { type: "Du (Thổ)", name: "Thái Bạch (SP3)", loc: "Thân xương bàn chân 1" },
        { type: "Kinh (Kim)", name: "Thương Khâu (SP5)", loc: "Dưới trước mắt cá trong" },
        { type: "Hợp (Thủy)", name: "Âm Lăng Tuyền (SP9)", loc: "Dưới lồi củ trong xương chày" }
      ],
      description: "Thổ đại diện cho sự nuôi dưỡng, biến hóa, chứa đựng. Tỳ chủ vận hóa thủy cốc, thống huyết, chủ cơ thịt."
    },
    metal: {
      id: "metal",
      name: "Kim",
      symbol: "⚔️",
      color: "#a1a1aa",
      colorHl: "#f4f4f5",
      darkColor: "#71717a",
      tang: "Phế",
      phu: "Đại Trường (Ruột già)",
      the: "Bì mao (Da lông)",
      khieu: "Mũi",
      chi: "Ưu / Bi (Buồn rầu)",
      sac: "Trắng",
      vi: "Cay (Tân)",
      mua: "Thu",
      huong: "Tây",
      khi: "Táo (Hanh khô)",
      nguDuHuyet: [
        { type: "Tỉnh (Mộc)", name: "Thiếu Thương (LU11)", loc: "Góc ngoài mống ngón cái" },
        { type: "Huỳnh (Hỏa)", name: "Ngư Tế (LU10)", loc: "Giữa xương bàn tay 1" },
        { type: "Du (Thổ)", name: "Thái Uyên (LU9)", loc: "Nếp gấp cổ tay phía ngón cái" },
        { type: "Kinh (Kim)", name: "Kinh Cừ (LU8)", loc: "Trên Thái Uyên 1 thốn" },
        { type: "Hợp (Thủy)", name: "Xích Trạch (LU5)", loc: "Nếp gấp khuỷu tay cạnh gân" }
      ],
      description: "Kim đại diện cho sự thanh lọc, thu hái, chấn chỉnh. Phế chủ khí, chủ tuyên phát túc giáng, thông điều thủy đạo."
    },
    water: {
      id: "water",
      name: "Thủy",
      symbol: "💧",
      color: "#3b82f6",
      colorHl: "#dbeafe",
      darkColor: "#2563eb",
      tang: "Thận",
      phu: "Bàng Quang",
      the: "Xương tủy (Cốt)",
      khieu: "Tai & Nhị âm",
      chi: "Kinh / Khủng (Sợ hãi)",
      sac: "Đen",
      vi: "Mặn (Hàm)",
      mua: "Đông",
      huong: "Bắc",
      khi: "Hàn (Lạnh)",
      nguDuHuyet: [
        { type: "Tỉnh (Mộc)", name: "Dũng Tuyền (KI1)", loc: "Lõm 1/3 trước lòng bàn chân" },
        { type: "Huỳnh (Hỏa)", name: "Nhiên Cốc (KI2)", loc: "Dưới củ xương thuyền" },
        { type: "Du (Thổ)", name: "Thái Khê (KI3)", loc: "Giữa mắt cá trong & gân Gót" },
        { type: "Kinh (Kim)", name: "Phục Lưu (KI7)", loc: "Trên Thái Khê 2 thốn" },
        { type: "Hợp (Thủy)", name: "Âm Cốc (KI10)", loc: "Đầu trong nếp gấp khoeo" }
      ],
      description: "Thủy đại diện cho sự mềm mại, chảy xuống, tiềm tàng. Thận tàng tinh, chủ cốt tủy, chủ thủy, nạp khí."
    }
  },

  relations: {
    sheng: [
      { from: "wood", to: "fire", label: "Mộc sinh Hỏa", desc: "Can Mộc sinh Tâm Hỏa (Mộc cháy sinh ra Hỏa, Can tàng huyết nuôi dưỡng Tâm)." },
      { from: "fire", to: "earth", label: "Hỏa sinh Thổ", desc: "Tâm Hỏa sinh Tỳ Thổ (Nhiệt năng Tâm Hỏa ôn dưỡng Tỳ thổ vận hóa)." },
      { from: "earth", to: "metal", label: "Thổ sinh Kim", desc: "Tỳ Thổ sinh Phế Kim (Tỳ vận hóa tinh hoa thủy cốc nuôi dưỡng Phế khí)." },
      { from: "metal", to: "water", label: "Kim sinh Thủy", desc: "Phế Kim sinh Thận Thủy (Phế túc giáng đưa thủy dịch xuống Thận tàng trữ)." },
      { from: "water", to: "wood", label: "Thủy sinh Mộc", desc: "Thận Thủy sinh Can Mộc (Thận tinh tư dưỡng Can huyết, Thủy tư dưỡng Mộc)." }
    ],
    ke: [
      { from: "wood", to: "earth", label: "Mộc khắc Thổ", desc: "Can Mộc khắc Tỳ Thổ (Can khí sơ tiết điều hòa Tỳ vị vận hóa)." },
      { from: "earth", to: "water", label: "Thổ khắc Thủy", desc: "Tỳ Thổ khắc Thận Thủy (Tỳ vận hóa thấp dịch ngăn Thận thủy tràn lan)." },
      { from: "water", to: "fire", label: "Thủy khắc Hỏa", desc: "Thận Thủy khắc Tâm Hỏa (Thận âm chế ngự Tâm hỏa không cho bốc quá cao)." },
      { from: "fire", to: "metal", label: "Hỏa khắc Kim", desc: "Tâm Hỏa khắc Phế Kim (Tâm hỏa ức chế Phế kim không cho thanh giáng quá mức)." },
      { from: "metal", to: "wood", label: "Kim khắc Mộc", desc: "Phế Kim khắc Can Mộc (Phế khí thanh giáng chế ngự Can khí thăng phát quá mức)." }
    ]
  },

  scenarios: [
    {
      id: "can-moc-hoanh-ty",
      title: "Can Mộc Hoành Tỳ (Tương Thừa)",
      type: "Tương Thừa (Khắc quá mức)",
      affected: ["wood", "earth"],
      primary: "wood",
      target: "earth",
      relationType: "overact",
      mechanism: "Can khí uất kết lâu ngày hóa hỏa, cậy mạnh lấn áp (tương thừa) Tỳ Thổ làm Tỳ mất khả năng vận hóa.",
      symptoms: "Đau mạn sườn, căng ngực bụng, dễ nổi giận, chán ăn, ợ chua, nôn mửa, tiêu chảy khi căng thẳng thần kinh.",
      principle: "Sơ Can lý khí, kiện Tỳ hòa Vị (VD: Bài thuốc Tiêu Dao Tản, Sài Hồ Sơ Can Tản).",
      points: "Thái Xung (LR3), Túc Tam Lý (ST36), Tam Âm Giao (SP6), Kỳ Môn (LR14)."
    },
    {
      id: "than-thuy-hu-tam-hoa",
      title: "Thận Thủy Hư - Tâm Hỏa Vượng (Thủy Hỏa Bất Tế)",
      type: "Tương Thừa (Thất dưỡng)",
      affected: ["water", "fire"],
      primary: "water",
      target: "fire",
      relationType: "overact",
      mechanism: "Thận âm suy hư không đưa Thủy lên tư dưỡng Tâm Hỏa, làm Tâm hỏa bốc lên độc tôn (Thủy Hỏa bất tế).",
      symptoms: "Mất ngủ, hay nằm mơ, hồi hộp, bứt rứt, triều nhiệt (nóng sốt về chiều), mồ hôi trộm, ù tai, đau lưng mỏi gối.",
      principle: "Tư âm giáng hỏa, thanh Tâm an thần (VD: Bài thuốc Lục Vị Địa Hoàng Hoàn gia Hoàng Liên, Âm Hư Hỏa Vượng).",
      points: "Thái Khê (KI3), Thần Môn (HT7), Tâm Du (BL15), Thận Du (BL23)."
    },
    {
      id: "ty-tho-hu-phe-kim",
      title: "Tỳ Thổ Hư Không Sinh Phế Kim (Mẫu Bệnh Cập Tử)",
      type: "Mẫu Bệnh Cập Tử (Mẹ yếu con suy)",
      affected: ["earth", "metal"],
      primary: "earth",
      target: "metal",
      relationType: "mother-son",
      mechanism: "Tỳ vị hư yếu lâu ngày (Thổ hư) không vận hóa nuôi dưỡng Phế (Kim), dẫn đến Phế khí cũng suy nhược.",
      symptoms: "Ăn uống kém, mệt mỏi, phân sống, sắc mặt vàng vọt, kèm theo ho suyễn, tiếng nói nhỏ yếu, dễ bị cảm mạo.",
      principle: "Bổ Thổ sinh Kim, Kiện Tỳ ích Phế (VD: Bài thuốc Sâm Linh Bạch Truật Tản, Bổ Trung Ích Khí Tản).",
      points: "Tỳ Du (BL20), Phế Du (BL13), Túc Tam Lý (ST36), Thái Uyên (LU9)."
    },
    {
      id: "can-hoa-pham-phe",
      title: "Can Hỏa Phạm Phế (Mộc Tương Vũ Kim)",
      type: "Tương Vũ (Phản khắc)",
      affected: ["wood", "metal"],
      primary: "wood",
      target: "metal",
      relationType: "insult",
      mechanism: "Can hỏa quá thịnh bốc lên ngược lại lấn áp Phế Kim (Mộc phản khắc Kim), làm Phế mất khả năng thanh giáng.",
      symptoms: "Đau tức ngực sườn khi ho, ho ra máu, mặt đỏ, mắt đỏ, đắng miệng, tính khí nóng nảy.",
      principle: "Thanh Can mẫn Phế, giáng hỏa chỉ khái (VD: Bài thuốc Thanh Táo Cứu Phế Tản, Tả Bạch Tản gia Long Đởm).",
      points: "Hành Gian (LR2), Xích Trạch (LU5), Can Du (BL18), Phế Du (BL13)."
    },
    {
      id: "phe-than-am-hu",
      title: "Phế Thận Âm Hư (Tử Bệnh Cập Mẫu)",
      type: "Tử Bệnh Cập Mẫu (Con bệnh hại mẹ)",
      affected: ["metal", "water"],
      primary: "metal",
      target: "water",
      relationType: "son-mother",
      mechanism: "Phế âm hư lâu ngày tiêu hao Thận âm (Kim không sinh Thủy), dẫn đến cả Phế lẫn Thận đều suy hư.",
      symptoms: "Ho khan ít đờm, gò má đỏ, nóng trong xương, họng khô miệng đắng, di tinh, thắt lưng đau mỏi.",
      principle: "Tư âm nhuận Phế, bổ Thận ích tinh (VD: Bài thuốc Bách Hợp Cố Kim Thang).",
      points: "Thái Uyên (LU9), Thái Khê (KI3), Chiếu Hải (KI6), Phế Du (BL13)."
    }
  ]
};
