/**
 * PHUONG TE DATA STORE - CliniPortal YHCT Module
 * Dữ liệu bài thuốc cổ phương kinh điển với cấu trúc Quân - Thần - Tá - Sứ & Động cơ Gia Giảm
 */

const PHUONG_TE_DATA = [
  {
    id: "luc-vi-dia-hoang-hoan",
    name: "Lục Vị Địa Hoàng Hoàn",
    pinyin: "Liù Wèi Dì Huáng Wán (六味地黄丸)",
    origin: "Tiểu Nhi Dược Chứng Trực Quyết (Tiền Ất)",
    category: "Bổ Âm (Tư Bổ Thận Âm)",
    indications: "Thận âm bất túc, đau lưng mỏi gối, ù tai, triều nhiệt sốt chiều, mồ hôi trộm, di tinh, tiêu khát (đái tháo đường), trẻ em chậm mọc răng.",
    principle: "Tam Bổ Tam Tả (Bổ Thận, Can, Tỳ song song tả nhiệt, thấp, ứ).",
    structure: {
      quan: [{ herbId: "thuc-dia", name: "Thục Địa Hoàng", dosage: "24g", role: "Tư âm bổ thận, ích tinh điền tủy (Đại bổ Thận âm)." }],
      than: [
        { herbId: "son-thu-du", name: "Sơn Thù Du", dosage: "12g", role: "Tư dưỡng Can thận, sáp tinh cố khí." },
        { herbId: "son-duoc", name: "Sơn Dược (Hoài Sơn)", dosage: "12g", role: "Bổ tỳ âm, sáp tinh, kiện tỳ vận hóa." }
      ],
      ta: [
        { herbId: "trach-ta", name: "Trạch Tả", dosage: "9g", role: "Thanh tả Thận hỏa, lợi thủy (Ức chế Thục địa gây nê trệ)." },
        { herbId: "dan-bi", name: "Mẫu Đơn Bì", dosage: "9g", role: "Thanh tả Can hỏa, lương huyết tán ứ (Chế ngự tính ôn của Sơn thù)." },
        { herbId: "phuc-linh", name: "Phục Linh", dosage: "9g", role: "Đạm nhạt thẩm thấp, kiện tỳ lợi thủy (Hỗ trợ Sơn dược kiện tỳ)." }
      ],
      su: []
    },
    modifications: [
      {
        symptom: "Có sốt về chiều nặng, mồ hôi trộm nhiều, nóng trong xương (Âm hư hỏa vượng nặng)",
        add: ["Tri Mẫu (9g)", "Hoàng Bá (9g)"],
        resultName: "Tri Bách Địa Hoàng Hoàn",
        desc: "Tăng cường tác dụng tư âm giáng hỏa tả thực nhiệt."
      },
      {
        symptom: "Kèm mắt mờ, hoa mắt chóng mặt, mắt khô cay (Can Thận Âm Hư)",
        add: ["Kỷ Tử (9g)", "Cúc Hoa (9g)"],
        resultName: "Kỷ Cúc Địa Hoàng Hoàn",
        desc: "Tư bổ can thận, minh mục (làm sáng mắt)."
      },
      {
        symptom: "Kèm ho hắng suyễn, phế khí hư khò khè (Phế Thận Âm Hư)",
        add: ["Mạch Môn (9g)", "Ngũ Vị Tử (6g)"],
        resultName: "Mạch Vị Địa Hoàng Hoàn (Bát Tiên Thọ Thọ Hoàn)",
        desc: "Tư dưỡng phế thận, thu liễm phế khí."
      }
    ]
  },
  {
    id: "tu-quan-tu-thang",
    name: "Tứ Quân Tử Thang",
    pinyin: "Sì Jūn Zǐ Tāng (四君子汤)",
    origin: "Thái Bình Huệ Dân Hoà Tễ Cục Phương",
    category: "Bổ Khí (Kiện Tỳ Ích Khí)",
    indications: "Tỳ vị khí hư, sắc mặt xanh xao vàng vọt, tiếng nói nhỏ yếu, ăn uống kém tiêu, phân sống tiêu chảy, mệt mỏi đoản khí.",
    principle: "Bổ khí kiện tỳ mà tính chất ôn hòa như 4 vị quân tử.",
    structure: {
      quan: [{ herbId: "nhan-sam", name: "Nhân Sâm (hoặc Đảng Sâm)", dosage: "10g", role: "Đại bổ nguyên khí, bổ tỳ ích phế." }],
      than: [{ herbId: "bach-truat", name: "Bạch Truật", dosage: "10g", role: "Đắng ôn táo thấp, kiện tỳ ích khí." }],
      ta: [{ herbId: "phuc-linh", name: "Phục Linh", dosage: "10g", role: "Lợi thủy thẩm thấp, kiện tỳ giúp Nhân sâm & Bạch truật." }],
      su: [{ herbId: "cam-thao", name: "Chích Cam Thảo", dosage: "5g", role: "Bổ khí hòa trung, điều hòa các vị thuốc." }]
    },
    modifications: [
      {
        symptom: "Kèm đờm nhiều, buồn nôn, ngực bụng đầy trệ (Tỳ hư đờm thấp)",
        add: ["Trần Bì (6g)", "Bán Hạ Tế (9g)"],
        resultName: "Lục Quân Tử Thang",
        desc: "Bổ khí kiện tỳ kèm táo thấp hóa đờm."
      },
      {
        symptom: "Kèm đau bụng lạnh, nôn mửa tiêu chảy lạnh chân tay (Tỳ vị hư hàn)",
        add: ["Can Khương (6g)", "Mộc Hương (6g)"],
        resultName: "Hương Sâm Lục Quân Tản",
        desc: "Ôn trung tán hàn, lý khí chỉ thống."
      }
    ]
  },
  {
    id: "tu-vat-thang",
    name: "Tứ Vật Thang",
    pinyin: "Sì Wù Tāng (四物汤)",
    origin: "Tiên Thọ Tiết Thị Hiệu Phương",
    category: "Bổ Huyết (Tư Âm Dưỡng Huyết)",
    indications: "Tâm can huyết hư, sắc mặt nhợt nhạt, hoa mắt chóng mặt, ù tai, móng tay thâm nhạt, kinh nguyệt không đều, bế kinh, đau bụng kinh.",
    principle: "Bổ huyết mà không gây ứ trệ, hoạt huyết mà không làm tổn thương huyết mới.",
    structure: {
      quan: [{ herbId: "thuc-dia", name: "Thục Địa Hoàng", dosage: "15g", role: "Tư âm dưỡng huyết, đại bổ thận tinh." }],
      than: [{ herbId: "duong-quy", name: "Đương Quy", dosage: "12g", role: "Bổ huyết hoạt huyết, điều kinh chỉ thống." }],
      ta: [{ herbId: "bach-thuoc", name: "Bạch Thược", dosage: "12g", role: "Dưỡng huyết liễm âm, nhu can chỉ thống." }],
      su: [{ herbId: "xuyen-khung", name: "Xuyên Khung", dosage: "8g", role: "Hành khí hoạt huyết, khu phong chỉ thống (Dẫn thuốc đi toàn thân)." }]
    },
    modifications: [
      {
        symptom: "Khí hư kèm Huyết hư (Cơ thể suy nhược toàn diện)",
        add: ["Nhân Sâm (10g)", "Bạch Truật (10g)", "Phục Linh (10g)", "Cam Thảo (5g)"],
        resultName: "Bát Trân Thang (Tứ Quân + Tứ Vật)",
        desc: "Song bổ Khí Huyết toàn diện."
      },
      {
        symptom: "Kèm chảy máu xuất huyết, rong kinh rong huyết (Huyết hư có nhiệt)",
        add: ["A Giao (9g)", "Ngải Ye (9g)"],
        resultName: "A Giao Ngải Ye Thang",
        desc: "Dưỡng huyết chỉ huyết, an thai điều kinh."
      }
    ]
  },
  {
    id: "bo-trung-ich-khi-thang",
    name: "Bổ Trung Ích Khí Thang",
    pinyin: "Bǔ Zhōng Yì Qì Tāng (补中益气汤)",
    origin: "Tỳ Vị Luận (Lý Đông Viên)",
    category: "Bổ Khí Thăng Dương",
    indications: "Tỳ vị khí hư hạ hãm, sa tử cung, sa trực tràng, sa dạ dày, tiêu chảy kéo dài, phát sốt do khí hư (khí hư phát nhiệt).",
    principle: "Bổ khí kiện tỳ kết hợp với vị thuốc thăng đề dương khí.",
    structure: {
      quan: [{ herbId: "hoang-ky", name: "Hoàng Kỳ (Chích)", dosage: "18g", role: "Đại bổ tỳ phế khí, thăng dương cố biểu." }],
      than: [
        { herbId: "nhan-sam", name: "Nhân Sâm", dosage: "10g", role: "Bổ khí ích tỳ." },
        { herbId: "bach-truat", name: "Bạch Truật", dosage: "10g", role: "Kiện tỳ táo thấp." },
        { herbId: "cam-thao", name: "Chích Cam Thảo", dosage: "5g", role: "Bổ khí hòa trung." }
      ],
      ta: [
        { herbId: "duong-quy", name: "Đương Quy", dosage: "10g", role: "Dưỡng huyết hòa huyết (Khí sinh Huyết)." },
        { herbId: "tran-bi", name: "Trần Bì", dosage: "6g", role: "Lý khí hòa vị (Ngăn ngừa trệ khí)." }
      ],
      su: [
        { herbId: "thang-ma", name: "Thăng Ma", dosage: "6g", role: "Dẫn thuốc thăng thanh khí của Tỳ Vị." },
        { herbId: "sai-ho", name: "Sài Hồ", dosage: "6g", role: "Dẫn thuốc thăng thanh khí của Can Đảm." }
      ]
    },
    modifications: [
      {
        symptom: "Kèm ho hắng suyễn do phế hư",
        add: ["Ngũ Vị Tử (6g)", "Mạch Môn (9g)"],
        resultName: "Bổ Trung Ích Khí gia Ngũ Vị Mạch Môn",
        desc: "Bổ tỳ ích phế liễm khí."
      }
    ]
  },
  {
    id: "long-dom-ta-can-thang",
    name: "Long Đởm Tả Can Thang",
    pinyin: "LÓng DǍn XImperial Gān Tāng (龙胆泻肝汤)",
    origin: "Y Tông Kim Giám",
    category: "Thanh Nhiệt (Tả Hỏa Can Đảm)",
    indications: "Can đởm thực hỏa bốc lên (đau đầu mắt đỏ, đắng miệng, điếc tai, đau mạn sườn) hoặc Can đởm thấp nhiệt hạ chú (viêm cấp hệ tiết niệu, khí hư hôi ngứa vùng kín, sưng đau tinh hoàn).",
    principle: "Thanh tả Can đởm thực hỏa, thanh lợi Hạ tiêu thấp nhiệt.",
    structure: {
      quan: [{ herbId: "long-dom-thao", name: "Long Đởm Thảo", dosage: "6g", role: "Thanh tả Can đởm thực hỏa, thanh thấp nhiệt hạ tiêu." }],
      than: [
        { herbId: "hoang-lien", name: "Hoàng Liên / Hoàng Cầm", dosage: "9g", role: "Đắng hàn thanh nhiệt táo thấp." },
        { herbId: "chi-tu", name: "Chi Tử (Hạt dành dành)", dosage: "9g", role: "Thanh nhiệt thông lợi tam tiêu." }
      ],
      ta: [
        { herbId: "trach-ta", name: "Trạch Tả", dosage: "12g", role: "Lợi thủy thẩm thấp hạ tiêu." },
        { herbId: "moc-thong", name: "Mộc Thông / Xa Tiền Tử", dosage: "9g", role: "Dẫn nhiệt thấp ra đường tiểu." },
        { herbId: "sinh-dia", name: "Sinh Địa", dosage: "12g", role: "Dưỡng âm lương huyết (Ngăn ngừa đắng hàn tổn âm)." },
        { herbId: "duong-quy", name: "Đương Quy", dosage: "9g", role: "Dưỡng huyết hòa can." }
      ],
      su: [
        { herbId: "sai-ho", name: "Sài Hồ", dosage: "6g", role: "Dẫn thuốc quy kinh Can Đảm." },
        { herbId: "cam-thao", name: "Cam Thảo", dosage: "5g", role: "Điều hòa các vị thuốc." }
      ]
    },
    modifications: [
      {
        symptom: "Kèm đi ngoài táo bón thực nhiệt nặng",
        add: ["Đại Hoàng (9g)"],
        resultName: "Long Đởm Tả Can gia Đại Hoàng",
        desc: "Tăng lực tả hạ thông tiện."
      }
    ]
  }
];
