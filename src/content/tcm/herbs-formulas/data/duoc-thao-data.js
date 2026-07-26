/**
 * DUOC THAO DATABASE - CliniPortal YHCT Module
 * Cơ sở dữ liệu 30+ vị thuốc Đông y kinh điển với thuộc tính Tính vị, Quy kinh, Công năng, Cấm kỵ & Tương kỵ
 */

const DUOC_THAO_DATA = [
  {
    id: "nhan-sam",
    name: "Nhân Sâm",
    pinyin: "Rén Shēn (人参)",
    latin: "Panax ginseng C. A. Mey.",
    category: "Bổ Khí",
    nature: "Ôn",
    taste: ["Ngọt", "Hơi Đắng"],
    meridians: ["Tỳ", "Phế", "Tâm"],
    actions: "Đại bổ nguyên khí, bổ tỳ ích phế, sinh tân chỉ khát, an thần ích trí.",
    indications: "Cơ thể suy nhược sau bệnh nặng, phế khí hư suyễn ho, tỳ khí hư tiêu chảy, tiêu khát, mất ngủ, choáng tụt huyết áp.",
    dosage: "3 - 10g (sắc uống riêng hoặc hầm dạng thang).",
    contraindications: "Không dùng cho người có thực tà (đang cảm sốt), âm hư hỏa vượng, hoặc tăng huyết áp kịch phát.",
    interactions: {
      phan: ["Lê Lô (Phản Lê Lô)"],
      uy: ["Ngũ Linh Chi (Úy Ngũ Linh Chi)"],
      kieng: "Tránh ăn củ cải, uống trà đậm cùng lúc làm giảm tác dụng bổ khí."
    },
    commonFormulas: ["Tứ Quân Tử Thang", "Bổ Trung Ích Khí Thang", "Độc Sâm Thang", "Tái Tạo Tản"],
    icon: "🌿"
  },
  {
    id: "hoang-ky",
    name: "Hoàng Kỳ",
    pinyin: "Huáng Qí (黄芪)",
    latin: "Astragalus membranaceus (Fisch.) Bge.",
    category: "Bổ Khí",
    nature: "Ôn",
    taste: ["Ngọt"],
    meridians: ["Tỳ", "Phế"],
    actions: "Bổ khí thăng dương, ích vệ cố biểu, lợi niệu tiêu thũng, bài nùng sinh cơ.",
    indications: "Tỳ vị khí hư gây mệt mỏi, sa tử cung, sa trực tràng, tự hãn (mồ hôi trộm), phù thũng do khí hư, mụn nhọt khó lành.",
    dosage: "10 - 30g (có thể dùng liều cao 60g trong bài Bổ Dương Hoàn Ngũ Thang).",
    contraindications: "Không dùng cho trường hợp biểu thực âm hư hỏa vượng, mụn nhọt độc khí đang thịnh.",
    interactions: {
      phan: [],
      uy: ["Bổ Cốt Chỉ"],
      kieng: "Tránh dùng khi có thực nhiệt nhiệt độc."
    },
    commonFormulas: ["Bổ Trung Ích Khí Thang", "Ngọc Bình Phong Tản", "Bổ Dương Hoàn Ngũ Thang"],
    icon: "🌱"
  },
  {
    id: "bach-truat",
    name: "Bạch Truật",
    pinyin: "Bái Zhú (白术)",
    latin: "Atractylodes macrocephala Koidz.",
    category: "Bổ Khí - Kiện Tỳ",
    nature: "Ôn",
    taste: ["Ngọt", "Đắng"],
    meridians: ["Tỳ", "Vị"],
    actions: "Kiện tỳ ích khí, táo thấp lợi thủy, chỉ hãn, an thai.",
    indications: "Tỳ vị hư yếu, ăn kém, tiêu chảy, thủy thũng, mồ hôi trộm, động thai đau lưng nôn mửa.",
    dosage: "6 - 15g.",
    contraindications: "Thận trọng khi âm hư hỏa vượng, tân dịch hao tổn hanh khô.",
    interactions: {
      phan: [],
      uy: ["Đào Nốt"],
      kieng: "Kiêng ăn cá độc, tỏi."
    },
    commonFormulas: ["Tứ Quân Tử Thang", "Quy Tỳ Thang", "Sâm Linh Bạch Truật Tản"],
    icon: "🌾"
  },
  {
    id: "cam-thao",
    name: "Cam Thảo",
    pinyin: "Gān Cǎo (甘草)",
    latin: "Glycyrrhiza uralensis Fisch.",
    category: "Bổ Khí - Điều Hòa",
    nature: "Bình",
    taste: ["Ngọt"],
    meridians: ["Tâm", "Phế", "Tỳ", "Vị"],
    actions: "Bổ tỳ ích khí, nhuận phế chỉ khái, hoãn cấp chỉ thống, giải độc, điều hòa các vị thuốc (Quân Thần Tá Sứ).",
    indications: "Tỳ vị hư nhược, ho hắng đờm nhiều, co thắt đau bụng, ngộ độc thức ăn/thuốc.",
    dosage: "3 - 10g.",
    contraindications: "Không dùng kéo dài liều cao cho người phù thũng, tăng huyết áp, tích nước.",
    interactions: {
      phan: ["Đại Kích", "Nguyên Hoa", "Hải Tảo", "Cam Toại (Thập bát phản)"],
      uy: [],
      kieng: "Tránh dùng chung 4 vị trên."
    },
    commonFormulas: ["Sài Hồ Sơ Can Tản", "Cát Cánh Thang", "Thang Thiếu Âm"],
    icon: "🪵"
  },
  {
    id: "thuc-dia",
    name: "Thục Địa Hoàng",
    pinyin: "Shú Dì Huáng (熟地黄)",
    latin: "Rehmannia glutinosa Libosch.",
    category: "Bổ Huyết - Tư Âm",
    nature: "Hơi Ôn",
    taste: ["Ngọt"],
    meridians: ["Can", "Thận"],
    actions: "Tư âm bổ huyết, ích tinh điền tủy.",
    indications: "Huyết hư sắc mặt xanh xao, kinh nguyệt không đều, thắt lưng mỏi gối, ù tai, triều nhiệt, di tinh, tiểu đường (tiêu khát).",
    dosage: "10 - 30g.",
    contraindications: "Tỳ vị hư hàn, hay tiêu chảy, đờm trệ ngực đầy.",
    interactions: {
      phan: [],
      uy: ["La Bặc Tử (Hạt củ cải - làm giảm tác dụng bổ)"],
      kieng: "Tránh ăn hành, tỏi, củ cải khi uống thục địa."
    },
    commonFormulas: ["Tứ Vật Thang", "Lục Vị Địa Hoàng Hoàn", "Quy Thận Hoàn"],
    icon: "🫚"
  },
  {
    id: "duong-quy",
    name: "Đương Quy",
    pinyin: "Dāng Guī (当归)",
    latin: "Angelica sinensis (Oliv.) Diels",
    category: "Bổ Huyết",
    nature: "Ôn",
    taste: ["Ngọt", "Cay"],
    meridians: ["Can", "Tâm", "Tỳ"],
    actions: "Bổ huyết hoạt huyết, điều kinh chỉ thống, nhuận tràng thông tiện.",
    indications: "Huyết hư đau đầu chóng mặt, kinh nguyệt không đều, bế kinh, đau bụng kinh, chấn thương sưng đau, táo bón do huyết hư.",
    dosage: "6 - 15g.",
    contraindications: "Tỳ hư tiêu chảy, thấp nhiệt ứ trệ.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Thận trọng khi dùng cùng thuốc chống đông Tây y."
    },
    commonFormulas: ["Tứ Vật Thang", "Đương Quy Bổ Huyết Thang", "Đương Quy Tứ Nghịch Thang"],
    icon: "🍁"
  },
  {
    id: "bach-thuoc",
    name: "Bạch Thược",
    pinyin: "Bái Sháo (白芍)",
    latin: "Paeonia lactiflora Pall.",
    category: "Bổ Huyết - Dưỡng Âm",
    nature: "Hơi Hàn",
    taste: ["Chua", "Đắng"],
    meridians: ["Can", "Tỳ"],
    actions: "Dưỡng huyết điều kinh, liễm âm chỉ hãn, nhu mô tả can, hoãn cấp chỉ thống.",
    indications: "Kinh nguyệt không đều, tự hãn, mồ hôi trộm, đau hạ sườn, co thắt đau bụng chân tay.",
    dosage: "6 - 15g.",
    contraindications: "Tỳ vị hư hàn tiêu chảy.",
    interactions: {
      phan: ["Lê Lô (Phản Lê Lô)"],
      uy: [],
      kieng: "Tránh dùng cùng Lê Lô."
    },
    commonFormulas: ["Tứ Vật Thang", "Tiêu Dao Tản", "Bạch Thược Cam Thảo Thang"],
    icon: "🌸"
  },
  {
    id: "xuyen-khung",
    name: "Xuyên Khung",
    pinyin: "Chuān Xiōng (川芎)",
    latin: "Ligusticum chuanxiong Hort.",
    category: "Hoạt Huyết - Lý Khí",
    nature: "Ôn",
    taste: ["Cay"],
    meridians: ["Can", "Đảm", "Tâm Bào"],
    actions: "Hoạt huyết hành khí, khu phong chỉ thống (Thánh dược trị đau đầu).",
    indications: "Đau đầu do phong hàn/phong nhiệt, đau bụng kinh, kinh nguyệt không đều, ứ huyết chấn thương, đau ngực sườn.",
    dosage: "3 - 10g.",
    contraindications: "Âm hư hỏa vượng, xuất huyết, phụ nữ mang thai.",
    interactions: {
      phan: [],
      uy: ["Hoàng Liên", "Hoàng Cầm"],
      kieng: "Tránh dùng khi chảy máu cấp."
    },
    commonFormulas: ["Tứ Vật Thang", "Xuyên Khung Trà Điều Tản", "Bổ Dương Hoàn Ngũ Thang"],
    icon: "🫚"
  },
  {
    id: "ky-tu",
    name: "Kỷ Tử (Câu Kỷ Tử)",
    pinyin: "Gǒu Qǐ Zǐ (枸杞子)",
    latin: "Lycium barbarum L.",
    category: "Bổ Âm - Bổ Thận Can",
    nature: "Bình",
    taste: ["Ngọt"],
    meridians: ["Can", "Thận", "Phế"],
    actions: "Tư bổ can thận, ích tinh huyết, minh mục (sáng mắt), nhuận phế.",
    indications: "Can thận âm hư gây đau lưng mỏi gối, chóng mặt ù tai, mắt mờ, ho khan, tiêu khát.",
    dosage: "6 - 15g.",
    contraindications: "Tỳ vị hư hàn tiêu chảy, đang sốt viêm nhiễm cấp tính.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Không dùng quá liều khi tiêu chảy."
    },
    commonFormulas: ["Kỷ Cúc Địa Hoàng Hoàn", "Tả Quy Hoàn", "Hữu Quy Hoàn"],
    icon: "🍒"
  },
  {
    id: "son-thu-du",
    name: "Sơn Thù Du",
    pinyin: "Shān Zhū Yú (山茱萸)",
    latin: "Cornus officinalis Sieb. et Zucc.",
    category: "Cố Sáp - Bổ Can Thận",
    nature: "Hơi Ôn",
    taste: ["Chua", "A"],
    meridians: ["Can", "Thận"],
    actions: "Bổ ích can thận, thu liễm cố sáp, chỉ hãn cố thoát.",
    indications: "Di tinh, tiểu đêm nhiều lần, mồ hôi trộm, kinh nguyệt ra nhiều, đau lưng ù tai.",
    dosage: "6 - 12g.",
    contraindications: "Mệnh môn hỏa vượng, tiểu tiện buốt dắt.",
    interactions: {
      phan: [],
      uy: ["Phòng Phong", "Phòng Kỷ"],
      kieng: "Tránh dùng khi có thực nhiệt."
    },
    commonFormulas: ["Lục Vị Địa Hoàng Hoàn", "Hữu Quy Hoàn"],
    icon: "🔴"
  },
  {
    id: "son-duoc",
    name: "Sơn Dược (Hoài Sơn)",
    pinyin: "Shān Yào (山药)",
    latin: "Dioscorea oppositifolia L.",
    category: "Bổ Khí - Kiện Tỳ",
    nature: "Bình",
    taste: ["Ngọt"],
    meridians: ["Tỳ", "Phế", "Thận"],
    actions: "Bổ tỳ dưỡng vị, sinh tân ích phế, bổ thận sáp tinh.",
    indications: "Tỳ hư ăn kém tiêu chảy, phế hư ho suyễn, thận hư di tinh đái dầm, tiêu khát.",
    dosage: "15 - 30g.",
    contraindications: "Thực tích tích trệ đờm thấp.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Không dùng khi bị đầy bụng táo bón do tích trệ."
    },
    commonFormulas: ["Lục Vị Địa Hoàng Hoàn", "Sâm Linh Bạch Truật Tản"],
    icon: "🥔"
  },
  {
    id: "phuc-linh",
    name: "Phục Linh",
    pinyin: "Fú Líng (茯苓)",
    latin: "Poria cocos (Schwein.) Wolf",
    category: "Lợi Thủy Thẩm Thấp",
    nature: "Bình",
    taste: ["Ngọt", "Nhạt"],
    meridians: ["Tâm", "Tỳ", "Thận"],
    actions: "Lợi thủy thẩm thấp, kiện tỳ, ninh tâm an thần.",
    indications: "Phù thũng, tiểu tiện khó, tỳ hư đờm ẩm, hồi hộp mất ngủ.",
    dosage: "10 - 15g.",
    contraindications: "Tiểu nhiều do hư hàn.",
    interactions: {
      phan: [],
      uy: ["Tần Giao"],
      kieng: "Tránh dùng cùng thuốc lợi tiểu quá đà."
    },
    commonFormulas: ["Tứ Quân Tử Thang", "Lục Vị Địa Hoàng Hoàn", "Ngũ Linh Tản"],
    icon: "🧄"
  },
  {
    id: "trach-ta",
    name: "Trạch Tả",
    pinyin: "Zé Xiè (泽泻)",
    latin: "Alisma plantago-aquatica L.",
    category: "Lợi Thủy Thẩm Thấp",
    nature: "Hàn",
    taste: ["Ngọt", "Nhạt"],
    meridians: ["Thận", "Bàng Quang"],
    actions: "Lợi thủy thẩm thấp, thanh nhiệt hạ tiêu.",
    indications: "Phù thũng, tiểu buốt, tiêu chảy do thấp nhiệt, chóng mặt do đờm ẩm.",
    dosage: "6 - 12g.",
    contraindications: "Thận hư hoạt tinh, không có thấp nhiệt.",
    interactions: {
      phan: [],
      uy: ["Hải Tảo"],
      kieng: "Không dùng kéo dài liều cao."
    },
    commonFormulas: ["Lục Vị Địa Hoàng Hoàn", "Ngũ Linh Tản"],
    icon: "💧"
  },
  {
    id: "dan-bi",
    name: "Mẫu Đơn Bì (Đan Bì)",
    pinyin: "Mǔ Dān Pí (牡丹皮)",
    latin: "Paeonia suffruticosa Andr.",
    category: "Thanh Nhiệt Lương Huyết",
    nature: "Hơi Hàn",
    taste: ["Cay", "Đắng"],
    meridians: ["Tâm", "Can", "Thận"],
    actions: "Thanh nhiệt lương huyết, hoạt huyết tán ứ.",
    indications: "Nhiệt nhập doanh huyết, phát ban, triều nhiệt sốt chiều, bế kinh đau bụng kinh, mụn nhọt.",
    dosage: "6 - 12g.",
    contraindications: "Phụ nữ mang thai, kinh nguyệt ra nhiều.",
    interactions: {
      phan: [],
      uy: ["Thỏ Ty Tử"],
      kieng: "Tránh dùng khi tỳ vị hư hàn."
    },
    commonFormulas: ["Lục Vị Địa Hoàng Hoàn", "Quế Chi Phục Linh Hoàn"],
    icon: "🌺"
  },
  {
    id: "que-chi",
    name: "Quế Chi",
    pinyin: "Guì Zhī (桂枝)",
    latin: "Cinnamomum cassia Presl",
    category: "Giải Biểu - Phát Phản",
    nature: "Ôn",
    taste: ["Cay", "Ngọt"],
    meridians: ["Tâm", "Phế", "Bàng Quang"],
    actions: "Phát hãn giải cơ, ôn thông kinh mạch, trợ dương hóa khí.",
    indications: "Cảm mạo phong hàn, đau khớp xương do lạnh, kinh nguyệt không đều do hàn ngưng, phù thũng.",
    dosage: "3 - 10g.",
    contraindications: "Sốt cao nhiệt chứng, âm hư hỏa vượng, phụ nữ có thai.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Tránh dùng khi có xuất huyết."
    },
    commonFormulas: ["Quế Chi Thang", "Quế Chi Phục Linh Hoàn", "Ma Hoàng Thang"],
    icon: "🍂"
  },
  {
    id: "ma-hoang",
    name: "Ma Hoàng",
    pinyin: "MÁ HuÁng (麻黄)",
    latin: "Ephedra sinica Stapf",
    category: "Giải Biểu - Phát Hãn",
    nature: "Ôn",
    taste: ["Cay", "Hơi Đắng"],
    meridians: ["Phế", "Bàng Quang"],
    actions: "Phát hãn giải biểu, tuyên phế bình suyễn, lợi thủy tiêu thũng.",
    indications: "Cảm mạo phong hàn không mồ hôi, ho suyễn khí cấp, phù thũng do phong thủy.",
    dosage: "2 - 9g.",
    contraindications: "Tự hãn (mồ hôi trộm), tăng huyết áp, mất ngủ, suy tim.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Thận trọng khi dùng cùng thuốc kích thích giao cảm Tây y (Ephedrine)."
    },
    commonFormulas: ["Ma Hoàng Thang", "Tiểu Thanh Long Thang", "Ma Thang gia Thạch Cao"],
    icon: "🌾"
  },
  {
    id: "cat-can",
    name: "Cát Cánh",
    pinyin: "JiÉ GĚng (桔梗)",
    latin: "Platycodon grandiflorum (Jacq.) A. DC.",
    category: "Hóa Đờm Chỉ Khái",
    nature: "Bình",
    taste: ["Đắng", "Cay"],
    meridians: ["Phế"],
    actions: "Tuyên phế khứ đờm, lợi yết khai âm, bài nùng (dẫn thuốc lên Thượng tiêu).",
    indications: "Ho đờm nhiều, sưng đau họng, mất tiếng, áp xe phổi (phế ung).",
    dosage: "3 - 10g.",
    contraindications: "Ho ra máu âm hư, khí trệ thượng tiêu.",
    interactions: {
      phan: [],
      uy: ["Bạch Cập"],
      kieng: "Kiêng ăn thịt lợn khi uống cát cánh."
    },
    commonFormulas: ["Cát Cánh Thang", "Sâm Suốt Thang"],
    icon: "🔔"
  },
  {
    id: "bac-ha",
    name: "Bạc Hà",
    pinyin: "BÒ He (薄荷)",
    latin: "Mentha haplocalyx Briq.",
    category: "Phát Tán Phong Nhiệt",
    nature: "Lương (Mát)",
    taste: ["Cay"],
    meridians: ["Phế", "Can"],
    actions: "Tán phong nhiệt, thanh đầu mục, lợi yết thấu chẩn, sơ can giải uất.",
    indications: "Cảm mạo phong nhiệt, đau đầu sốt họng, ban chẩn mới phát, can khí uất kết.",
    dosage: "3 - 6g (cho sau khi sắc gần xong).",
    contraindications: "Tự hãn mồ hôi nhiều, âm hư sốt họng.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Tránh sắc quá lâu làm bay hơi tinh dầu."
    },
    commonFormulas: ["Ngân Kiều Tản", "Tiêu Dao Tản"],
    icon: "🍃"
  },
  {
    id: "hoang-lien",
    name: "Hoàng Liên",
    pinyin: "HuÁng LiÁn (黄连)",
    latin: "Coptis chinensis Franch.",
    category: "Thanh Nhiệt Táo Thấp",
    nature: "Hàn",
    taste: ["Rất Đắng"],
    meridians: ["Tâm", "Vị", "Can", "Đại Trường"],
    actions: "Thanh nhiệt táo thấp, tả hỏa giải độc (Thánh dược thanh Tâm hỏa).",
    indications: "Sốt cao tâm phiền mất ngủ, nôn ra máu, lỵ đống thấp nhiệt, mụn nhọt độc trùng.",
    dosage: "2 - 5g.",
    contraindications: "Tỳ vị hư hàn tiêu chảy, âm hư tân dịch hao.",
    interactions: {
      phan: [],
      uy: ["Huyền Sâm"],
      kieng: "Tránh dùng kéo dài gây hại tỳ vị."
    },
    commonFormulas: ["Hoàng Liên Giải Độc Thang", "Giao Thái Hoàn"],
    icon: "🌱"
  },
  {
    id: "long-dom-thao",
    name: "Long Đởm Thảo",
    pinyin: "LÓng DǍn CǍo (龙胆草)",
    latin: "Gentiana scabra Bge.",
    category: "Thanh Nhiệt Táo Thấp",
    nature: "Hàn",
    taste: ["Đắng"],
    meridians: ["Can", "Đảm"],
    actions: "Thanh can hỏa, tả can đởm thấp nhiệt.",
    indications: "Sốt cao co giật, mắt đỏ tai ứ mủ, đau mạn sườn, viêm gan mật, khí hư ngứa vùng kín.",
    dosage: "3 - 6g.",
    contraindications: "Tỳ vị hư hàn, tổn thương tân dịch.",
    interactions: {
      phan: [],
      uy: [],
      kieng: "Không dùng cho người yếu dạ dày."
    },
    commonFormulas: ["Long Đởm Tả Can Thang"],
    icon: "🌿"
  },
  {
    id: "le-lo",
    name: "Lê Lô (Độc Dược)",
    pinyin: "LÍ LÚ (藜芦)",
    latin: "Veratrum nigrum L.",
    category: "Thuốc Độc - Thổ Thần",
    nature: "Hàn (Có Độc)",
    taste: ["Đắng", "Cay"],
    meridians: ["Phế", "Vị"],
    actions: "Gây nôn (thổ nùng đờm), sát trùng ngoài da.",
    indications: "Đờm dãi tắc nghẽn cổ họng cấp tính, hắc ách mụn nhọt.",
    dosage: "0.3 - 0.9g (rất cẩn trọng).",
    contraindications: "Cực kỳ độc! Phụ nữ có thai, người yếu mệt tuyệt đối cấm.",
    interactions: {
      phan: ["Nhân Sâm", "Bạch Thược", "Đảng Sâm", "Huyền Sâm", "Sa Sâm (Thập bát phản - Phản Lê Lô)"],
      uy: [],
      kieng: "TUYỆT ĐỐI KHÔNG PHỐI HỢP CÁC VỊ BỔ SÂM VỚI LÊ LÔ."
    },
    commonFormulas: ["Lê Lô Tản"],
    icon: "⚠️"
  },
  {
    id: "ngu-linh-chi",
    name: "Ngũ Linh Chi",
    pinyin: "WǓ LÍng ZhĪ (五灵脂)",
    latin: "Trogopterus xanthipes Milne-Edwards",
    category: "Hoạt Huyết Chỉ Thống",
    nature: "Ôn",
    taste: ["Ngọt", "Đắng"],
    meridians: ["Can"],
    actions: "Thông kinh chỉ thống, hoạt huyết tán ứ.",
    indications: "Đau bụng kinh, bế kinh, đau thượng vị do huyết ứ, sản hậu đau dạ con.",
    dosage: "5 - 10g.",
    contraindications: "Phụ nữ có thai, không có huyết ứ.",
    interactions: {
      phan: [],
      uy: ["Nhân Sâm (Úy Nhân Sâm)"],
      kieng: "TRÁNH DÙNG CÙNG NHÂN SÂM."
    },
    commonFormulas: ["Thất Tiếu Tản"],
    icon: "💊"
  }
];

// Thập Bát Phản & Thập Cửu Úy Reference Data
const INTERACTION_RULES = {
  thapBatPhan: [
    { rule: "Cam Thảo phản Đại Kích, Nguyên Hoa, Hải Tảo, Cam Toại", warning: "Dùng chung gây ngộ độc nặng, nôn mửa, rối loạn nhịp tim." },
    { rule: "Lê Lô phản Nhân Sâm, Sa Sâm, Đan Sâm, Huyền Sâm, Khổ Sâm, Tế Tân, Bạch Thược", warning: "Dùng chung sinh độc tính nguy hiểm tính mạng." },
    { rule: "Ô Đầu / Phụ Tử phản Bối Mẫu, Qua Lâu, Bán Hạ, Bạch Liễm, Bạch Cập", warning: "Tăng mạnh độc tính aconitine." }
  ],
  thapCuuUy: [
    { rule: "Lưu Huỳnh úy Phác Tiêu", warning: "Giảm tác dụng và sinh độc." },
    { rule: "Thủy Ngân úy Thạch Tín", warning: "Độc tính cực cao." },
    { rule: "Lang Độc úy Mật Đà Tăng", warning: "Hại tạng phủ." },
    { rule: "Ba Đậu úy Thất Lý", warning: "Gây tổn thương dạ dày ruột." },
    { rule: "Đinh Hương úy Uất Kim", warning: "Làm mất tính năng lý khí." },
    { rule: "Nhân Sâm úy Ngũ Linh Chi", warning: "Làm triệt tiêu tác dụng đại bổ nguyên khí của Nhân sâm." },
    { rule: "Nhục Quế úy Xích Thạch Chi", warning: "Làm mất tính ôn nhiệt." }
  ]
};
