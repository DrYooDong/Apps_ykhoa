/**
 * THIET CHAN DATA STORE - CliniPortal YHCT Module
 * Dữ liệu phân vùng lưỡi, đặc điểm chất lưỡi, rêu lưỡi, hình thể và ngân hàng câu hỏi Quiz Thiệt Chẩn
 */

const THIET_CHAN_DATA = {
  zones: {
    tip: {
      id: "tip",
      name: "Đầu Lưỡi",
      organs: "Tâm & Phế (Thượng Tiêu)",
      desc: "Phản ánh tình trạng khí huyết và nhiệt năng của Tâm và Phế.",
      pathologies: [
        { condition: "Đầu lưỡi đỏ rực", meaning: "Tâm hỏa thượng viêm (Nóng trong tim, mất ngủ, nhiệt miệng)." },
        { condition: "Đầu lưỡi có điểm nổi mụn đỏ", meaning: "Phế nhiệt hoặc Tâm nhiệt cực thịnh." }
      ]
    },
    center: {
      id: "center",
      name: "Giữa Lưỡi",
      organs: "Tỳ & Vị (Trung Tiêu)",
      desc: "Phản ánh chức năng vận hóa thủy cốc và khí vị của Tỳ Dạ Dày.",
      pathologies: [
        { condition: "Giữa lưỡi rêu vàng dày dính", meaning: "Tỳ Vị thấp nhiệt, tích trệ thức ăn." },
        { condition: "Giữa lưỡi rêu bóc/nứt nẻ", meaning: "Vị âm hư, Vị khí suy kiệt." }
      ]
    },
    sides: {
      id: "sides",
      name: "Hai Bên Mép Lưỡi",
      organs: "Can & Đảm (Trung / Hạ Tiêu)",
      desc: "Phản ánh sự sơ tiết can khí và tình trạng đởm hỏa.",
      pathologies: [
        { condition: "Hai bên mép lưỡi đỏ rực / có nốt tím", meaning: "Can hỏa bốc cao, Can khí uất kết gây huyết ứ." },
        { condition: "Hai bên rêu vàng dính", meaning: "Can Đảm thấp nhiệt (Viêm gan, viêm túi mật)." }
      ]
    },
    root: {
      id: "root",
      name: "Gốc Lưỡi",
      organs: "Thận, Bàng Quang & Đại Trường (Hạ Tiêu)",
      desc: "Phản ánh tình trạng Thận tinh, Thận âm/dương và đường đại tiểu tiện.",
      pathologies: [
        { condition: "Gốc lưỡi rêu đen dính dày", meaning: "Hạ tiêu thấp nhiệt, thực nhiệt kiệt bộc." },
        { condition: "Gốc lưỡi rêu trắng trơn không rêu", meaning: "Thận dương hư hàn, tinh huyết suy." }
      ]
    }
  },

  colors: [
    {
      id: "binh-thuong",
      name: "Hồng Nhạt (Bình Thường)",
      hex: "#f87171",
      meaning: "Khí huyết đầy đủ, Tỳ vị hòa hợp (Thiệt hồng đạm, rêu trắng mỏng).",
      syndromes: "Cơ thể khỏe mạnh."
    },
    {
      id: "nhat",
      name: "Lưỡi Nhạt (Nhạt Bế)",
      hex: "#fca5a5",
      meaning: "Khí huyết hư suy, Tỳ vị hư hàn, Dương khí bất túc không đưa huyết lên nuôi dưỡng lưỡi.",
      syndromes: "Khí huyết hư, Tỳ dương hư, Thận dương hư."
    },
    {
      id: "do",
      name: "Lưỡi Đỏ (Thiệt Hồng)",
      hex: "#ef4444",
      meaning: "Nhiệt chứng (Thực nhiệt hoặc Âm hư hỏa vượng). Huyết gặp nhiệt di chuyển nhanh làm lưỡi đỏ.",
      syndromes: "Lý nhiệt chứng, Âm hư nội nhiệt."
    },
    {
      id: "giang",
      name: "Lưỡi Đỏ Thẫm (Thiệt Giáng)",
      hex: "#b91c1c",
      meaning: "Nhiệt nhập doanh huyết, sốt cao mất nước nặng hoặc Âm kiệt trầm trọng.",
      syndromes: "Nhiệt nhập doanh huyết (Bệnh ôn nhiệt), Âm hư hỏa vượng nặng."
    },
    {
      id: "tim",
      name: "Lưỡi Tím (Thiệt Tử)",
      hex: "#7e22ce",
      meaning: "Huyết ứ, khí trệ kéo dài, hoặc Nhiệt cực sinh ứ, Hàn ngưng huyết trệ.",
      syndromes: "Huyết ứ chứng, Trệ khí, Hàn ngưng trệ."
    }
  ],

  coats: [
    {
      id: "trang-mong",
      name: "Rêu Trắng Mỏng",
      hex: "#f8fafc",
      meaning: "Rêu lưỡi bình thường hoặc bệnh ở giai đoạn Biểu chứng, Phong hàn mới phát.",
      syndromes: "Bình thường, Biểu hàn chứng."
    },
    {
      id: "vang-day",
      name: "Rêu Vàng Dày",
      hex: "#eab308",
      meaning: "Bệnh đã vào Lý, hóa nhiệt, Thấp nhiệt hoặc Tích trệ thức ăn ở dạ dày ruột.",
      syndromes: "Lý nhiệt, Thấp nhiệt nội đọng, Thực tích."
    },
    {
      id: "den-kho",
      name: "Rêu Đen Khô",
      hex: "#1e293b",
      meaning: "Nhiệt cực thịnh làm thiêu đốt tân dịch kiệt quệ, hoặc Hàn cực化 nhiệt.",
      syndromes: "Nhiệt thịnh hại âm nặng, Độc nhiệt."
    },
    {
      id: "boc",
      name: "Rêu Bóc / Bản Đồ",
      hex: "#fb7185",
      meaning: "Vị âm bị tổn thương nặng, Vị khí suy kiệt không sinh ra rêu lưỡi.",
      syndromes: "Vị âm hư, Vị khí suy."
    }
  ],

  shapes: [
    {
      id: "phu-to",
      name: "Phù To Có Hằn Răng",
      desc: "Thân lưỡi to béo, hai bên có vết răng đè lên.",
      meaning: "Tỳ hư không vận hóa được thủy thấp, đờm ẩm tích tụ bên trong.",
      syndromes: "Tỳ hư thấp thịnh, Thủy thũng."
    },
    {
      id: "gay-mong",
      name: "Gầy Thon Nhỏ",
      desc: "Thân lưỡi nhỏ mỏng hơn bình thường.",
      meaning: "Khí huyết suy nhược hoặc Âm dịch bị hao tổn lâu ngày.",
      syndromes: "Khí huyết hư, Âm hư dịch hao."
    },
    {
      id: "nut-ne",
      name: "Nứt Nẻ (Thiệt Nứt)",
      desc: "Mặt lưỡi có các đường nứt dọc ngang.",
      meaning: "Nhiệt thịnh thiêu đốt tân dịch hoặc Thận âm suy hư không tư dưỡng mặt lưỡi.",
      syndromes: "Âm hư hỏa vượng, Thận âm hư."
    }
  ],

  quiz: [
    {
      id: 1,
      question: "Bệnh nhân nam 45 tuổi, chất lưỡi nhạt, thân lưỡi phù to có hằn vết răng, rêu lưỡi trắng trơn. Chẩn đoán thể bệnh phù hợp nhất?",
      options: [
        "Tỳ hư thấp thịnh",
        "Tâm hỏa thượng viêm",
        "Can hỏa bốc cao",
        "Nhiệt nhập doanh huyết"
      ],
      correct: 0,
      explanation: "Lưỡi nhạt + thân lưỡi phù to có hằn răng + rêu trắng trơn là dấu hiệu điển hình của Tỳ vị khí hư không vận hóa được thủy thấp."
    },
    {
      id: 2,
      question: "Đầu lưỡi đỏ rực kèm nổi nhiều mụn đỏ nhỏ, rêu lưỡi vàng mỏng, bệnh nhân hay mất ngủ, nhiệt miệng. Vùng lưỡi này phản ánh tạng nào bị nhiệt?",
      options: [
        "Tạng Thận",
        "Tạng Tâm",
        "Tạng Tỳ",
        "Tạng Can"
      ],
      correct: 1,
      explanation: "Đầu lưỡi thuộc vùng phản ánh tạng Tâm & Phế. Đầu lưỡi đỏ rực + mất ngủ nhiệt miệng là biểu hiện của Tâm hỏa thượng viêm."
    },
    {
      id: 3,
      question: "Chất lưỡi đỏ thẫm (Giáng), rêu lưỡi khô đen là biểu hiện của chứng bệnh gì?",
      options: [
        "Phong hàn xâm nhập biểu",
        "Nhiệt cực thịnh thiêu đốt tân dịch / Nhiệt nhập doanh huyết",
        "Thận dương hư hàn",
        "Tỳ vị khí hư"
      ],
      correct: 1,
      explanation: "Thiệt giáng (đỏ thẫm) + rêu đen khô cho thấy nhiệt độc cực thịnh đã đi sâu vào phần Doanh/Huyết và làm kiệt tân dịch."
    },
    {
      id: 4,
      question: "Mặt lưỡi có vết tím mảng hoặc nốt tím lấm chấm (điểm ứ huyết) thường chỉ ra hội chứng bệnh nào?",
      options: [
        "Huyết ứ trệ",
        "Tỳ khí hư",
        "Đờm thấp",
        "Phong nhiệt"
      ],
      correct: 0,
      explanation: "Điểm/mảng tím trên chất lưỡi là dấu hiệu trực quan của Huyết ứ trệ trong lòng mạch."
    },
    {
      id: 5,
      question: "Rêu lưỡi bị bóc từng mảng (rêu bản đồ) hoặc mất hẳn rêu lưỡi thể hiện tình trạng tạng phủ nào?",
      options: [
        "Vị âm hư / Vị khí suy kiệt",
        "Can khí uất kết",
        "Phế khí hư",
        "Thận dương vượng"
      ],
      correct: 0,
      explanation: "Rêu lưỡi do Vị khí chưng bốc thủy cốc sinh ra. Rêu lưỡi bóc lột mất rêu phản ánh Vị âm hư tổn hoặc Vị khí suy kiệt."
    }
  ]
};
