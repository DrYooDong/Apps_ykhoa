/**
 * YHCT QUIZ ARENA DATA STORE - CliniPortal YHCT Module
 * Ngân hàng 40+ câu hỏi game hóa chia 4 đấu trường: Thiệt Chẩn, Mạch Chẩn, Dược Thảo & Phương Tễ
 */

const YHCT_QUIZ_DATA = {
  modes: [
    { id: "thiet_chan", name: "👅 Thiệt Chẩn Arena", icon: "👅", desc: "Thách thức nhận diện chất lưỡi, rêu lưỡi & thể bệnh." },
    { id: "mach_chan", name: "🧘 Mạch Chẩn Arena", icon: "🧘", desc: "Đoán mạch tượng qua mô tả cảm giác ngón tay & dạng sóng." },
    { id: "duoc_thao", name: "🍵 Dược Thảo & Thập Bát Phản", icon: "🍵", desc: "Tính vị quy kinh & cảnh báo tương kỵ độc hại." },
    { id: "phuong_te", name: "📜 Phương Tễ Quân-Thần-Tá-Sứ", icon: "📜", desc: "Xẻ bài thuốc cổ phương & kỹ năng gia giảm." }
  ],

  questions: {
    thiet_chan: [
      {
        id: "tc1",
        q: "Lưỡi nhạt, phù to có hằn vết răng hai bên, rêu trắng trơn là biểu hiện của thể bệnh nào?",
        options: ["Tỳ hư thấp thịnh", "Can hỏa thượng viêm", "Nhiệt nhập doanh huyết", "Thận âm hư hỏa vượng"],
        answer: 0,
        explanation: "Lưỡi nhạt + phù to có vết răng + rêu trắng trơn phản ánh Tỳ vị khí hư không vận hóa được thủy thấp."
      },
      {
        id: "tc2",
        q: "Đầu lưỡi đỏ rực kèm nổi nhiều mụn đỏ nhỏ phản ánh tạng nào đang có thực nhiệt bốc lên?",
        options: ["Tạng Thận", "Tạng Tâm", "Tạng Tỳ", "Tạng Phế"],
        answer: 1,
        explanation: "Đầu lưỡi thuộc vùng phản ánh Tâm & Phế. Đầu lưỡi đỏ rực là biểu hiện Tâm hỏa thượng viêm."
      },
      {
        id: "tc3",
        q: "Chất lưỡi đỏ thẫm (Giáng), rêu lưỡi khô đen thể hiện tình trạng nào dưới đây?",
        options: ["Phong hàn mới xâm nhập", "Nhiệt nhập doanh huyết / Độc nhiệt kiệt tân dịch", "Tỳ vị hư hàn", "Khí huyết bất túc"],
        answer: 1,
        explanation: "Thiệt giáng (đỏ thẫm) + rêu đen khô cho thấy nhiệt độc cực thịnh đã đi sâu vào phần Doanh/Huyết."
      },
      {
        id: "tc4",
        q: "Mặt lưỡi có các vết tím mảng hoặc lấm chấm điểm tím (điểm ứ huyết) chỉ ra điều gì?",
        options: ["Huyết ứ trệ trong lòng mạch", "Thấp nhiệt tích tụ", "Khí hư không thăng", "Can phong nội động"],
        answer: 0,
        explanation: "Điểm hoặc mảng tím trên chất lưỡi là dấu hiệu trực quan của Huyết ứ trệ."
      },
      {
        id: "tc5",
        q: "Mặt lưỡi bị bóc rêu từng mảng (rêu bản đồ) phản ánh sự tổn thương của tạng phủ nào?",
        options: ["Vị âm hư / Vị khí suy kiệt", "Can huyết hư", "Phế âm hư", "Thận dương hư"],
        answer: 0,
        explanation: "Rêu lưỡi do Vị khí chưng bốc sinh ra. Rêu bị bóc mảng thể hiện Vị âm hư hoặc Vị khí suy tổn."
      }
    ],

    mach_chan: [
      {
        id: "mc1",
        q: "Ấn nhẹ ngón tay đã thấy đập rõ rệt, ấn nặng tay xuống thì yếu dần là đặc điểm của mạch nào?",
        options: ["Mạch Phù", "Mạch Trầm", "Mạch Trì", "Mạch Sác"],
        answer: 0,
        explanation: "Mạch Phù nảy rõ ở mức Cử (ấn nhẹ), ấn nặng xuống yếu dần, thường gặp ở Biểu chứng."
      },
      {
        id: "mc2",
        q: "Mạch đập căng dài và cứng như gảy dây đàn violin là đặc trưng của loại mạch nào?",
        options: ["Mạch Hoạt", "Mạch Huyền", "Mạch Sáp", "Mạch Tế"],
        answer: 1,
        explanation: "Mạch Huyền căng cứng như dây đàn, chủ về bệnh lý Can Đảm, đau nhức dữ dội hoặc Tăng huyết áp."
      },
      {
        id: "mc3",
        q: "Mạch đập trơn tru linh hoạt, cuồn cuộn như hạt ngọc lăn trên đĩa sứ chỉ ra tình trạng gì?",
        options: ["Đờm ẩm tích trệ / Thực tích hoặc Phụ nữ mang thai", "Âm hư hỏa vượng", "Khí huyết suy kiệt", "Hàn ngưng trệ"],
        answer: 0,
        explanation: "Mạch Hoạt trơn tru như hạt ngọc lăn đĩa, gặp trong Đờm ẩm tích trệ, thực tích hoặc phụ nữ có thai."
      },
      {
        id: "mc4",
        q: "Vị trí xem mạch 'Thốn' bên tay trái (Tả thủ) phản ánh tình trạng của tạng phủ nào?",
        options: ["Tâm & Tiểu Trường", "Can & Đảm", "Thận & Bàng Quang", "Phế & Đại Trường"],
        answer: 0,
        explanation: "Thốn tay trái xem Tâm & Tiểu trường; Quan tay trái xem Can & Đảm; Xích tay trái xem Thận Âm."
      },
      {
        id: "mc5",
        q: "Mạch đập chậm chạp dưới 60 nhịp/phút (một hơi thở đập dưới 4 nhịp) được gọi là mạch gì?",
        options: ["Mạch Sác", "Mạch Trì", "Mạch Hồng", "Mạch Xúc"],
        answer: 1,
        explanation: "Mạch Trì đập chậm chạp (<60 bpm), chủ về Hàn chứng."
      }
    ],

    duoc_thao: [
      {
        id: "dt1",
        q: "Quy luật Thập Bát Phản cấm tuyệt đối phối hợp Nhân Sâm với vị thuốc nào dưới đây?",
        options: ["Lê Lô", "Cam Thảo", "Hoàng Kỳ", "Đương Quy"],
        answer: 0,
        explanation: "Thập Bát Phản quy định: Lê Lô phản Nhân sâm, Sa sâm, Đan sâm, Huyền sâm, Khổ sâm, Bạch thược."
      },
      {
        id: "dt2",
        q: "Vị thuốc Cam Thảo nằm trong quy luật Thập Bát Phản chống lại 4 vị thuốc nào?",
        options: ["Đại Kích, Nguyên Hoa, Hải Tảo, Cam Toại", "Lê Lô, Ngũ Linh Chi, Ba Đậu, Lưu Huỳnh", "Hoàng Liên, Hoàng Cầm, Hoàng Bá, Long Đởm", "Quế Chi, Ma Hoàng, Bạc Hà, Cát Cánh"],
        answer: 0,
        explanation: "Cam Thảo phản Đại Kích, Nguyên Hoa, Hải Tảo, Cam Toại. Dùng chung gây độc tính nặng."
      },
      {
        id: "dt3",
        q: "Vị thuốc nào dưới đây có tính Ôn, vị Ngọt, quy kinh Tỳ Phế, có công năng 'Đại bổ nguyên khí'?",
        options: ["Hoàng Kỳ", "Nhân Sâm", "Bạch Truật", "Thục Địa"],
        answer: 1,
        explanation: "Nhân Sâm là đại bổ nguyên khí, đứng đầu các vị thuốc bổ khí trong Đông y."
      },
      {
        id: "dt4",
        q: "Quy luật Thập Cửu Úy cảnh báo vị thuốc Nhân Sâm kỵ với vị thuốc nào?",
        options: ["Ngũ Linh Chi", "Bạch Thược", "Trạch Tả", "Mẫu Đơn Bì"],
        answer: 0,
        explanation: "Nhân Sâm úy Ngũ Linh Chi (Phối hợp làm mất tác dụng đại bổ nguyên khí của Nhân sâm)."
      }
    ],

    phuong_te: [
      {
        id: "pt1",
        q: "Trong bài thuốc Lục Vị Địa Hoàng Hoàn, vị thuốc nào giữ vai trò 'Vị Quân' (chủ trị chính)?",
        options: ["Thục Địa Hoàng", "Sơn Thù Du", "Sơn Dược", "Trạch Tả"],
        answer: 0,
        explanation: "Thục Địa Hoàng liều cao nhất (24g) giữ vai trò Vị Quân tư âm bổ thận ích tinh điền tủy."
      },
      {
        id: "pt2",
        q: "Bài thuốc Tứ Quân Tử Thang bao gồm 4 vị thuốc bổ khí nào?",
        options: ["Nhân Sâm, Bạch Truật, Phục Linh, Cam Thảo", "Thục Địa, Đương Quy, Bạch Thược, Xuyên Khung", "Hoàng Kỳ, Đương Quy, Thăng Ma, Sài Hồ", "Lương Khương, Can Khương, Mộc Hương, Bán Hạ"],
        answer: 0,
        explanation: "Tứ Quân Tử Thang gồm: Sâm, Truật, Linh, Thảo - Bài thuốc gốc bổ tỳ ích khí."
      },
      {
        id: "pt3",
        q: "Khi bài thuốc Lục Vị Địa Hoàng Hoàn gia thêm Tri Mẫu & Hoàng Bá thì tạo thành bài thuốc nào?",
        options: ["Tri Bách Địa Hoàng Hoàn", "Kỷ Cúc Địa Hoàng Hoàn", "Mạch Vị Địa Hoàng Hoàn", "Quế Phụ Địa Hoàng Hoàn"],
        answer: 0,
        explanation: "Lục Vị + Tri Mẫu + Hoàng Bá = Tri Bách Địa Hoàng Hoàn (Chuyên trị Âm hư hỏa vượng nặng, nóng trong xương)."
      },
      {
        id: "pt4",
        q: "Bài thuốc Tứ Vật Thang (Thục Địa, Đương Quy, Bạch Thược, Xuyên Khung) là bài thuốc gốc trị chứng bệnh gì?",
        options: ["Huyết Hư Chứng", "Khí Hư Chứng", "Thấp Nhiệt Chứng", "Hàn Thực Chứng"],
        answer: 0,
        explanation: "Tứ Vật Thang là bài thuốc kinh điển đứng đầu về Bổ huyết tư âm dưỡng huyết."
      }
    ]
  }
};
