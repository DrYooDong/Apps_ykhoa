/**
 * CliniPortal — Clinical Approaches Data & Red Flags (TypeScript Module)
 */
import { RedFlagCard, SymptomMatrixItem, ApproachSectionMeta } from './types';

export const APPROACH_SECTIONS: ApproachSectionMeta[] = [
  { id: 'part1-section', name: 'Phần 1: Hồi Sức & Cấp Cứu Ban Đầu', icon: 'fa-truck-medical', color: '#dc2626' },
  { id: 'part2-section', name: 'Phần 2: Tiếp Cận Theo Triệu Chứng', icon: 'fa-clipboard-user', color: '#2563eb' },
  { id: 'part3-section', name: 'Phần 3: Tiếp Cận Cận Lâm Sàng & Hình Ảnh Học', icon: 'fa-microscope', color: '#0d9488' },
  { id: 'part4-section', name: 'Phần 4: Phác Đồ Tiếp Cận Bệnh Lý & Can Thiệp', icon: 'fa-disease', color: '#7c3aed' }
];

export const RED_FLAGS_CARDS: RedFlagCard[] = [
  {
    id: "rf-1",
    category: "Sốt",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Sốt",
    question: "Các dấu hiệu Red Flags nguy kịch bắt buộc loại trừ ngay ở bệnh nhân Sốt?",
    answer: "1. Cổ cứng / Dấu màng não<br>2. Tụt huyết áp / Sốc nhiễm trùng<br>3. Ban xuất huyết hoại tử dạng sao (Nhiễm não mô cầu)<br>4. Suy giảm miễn dịch nặng / Tế bào T CD4 < 200.",
    explanation: "Bệnh nhân có Red Flags Sốt cần được chọc dò dịch não tủy, cấy máu và dùng kháng sinh phổ rộng liều đầu trong vòng 1 giờ."
  },
  {
    id: "rf-2",
    category: "Đau ngực",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Đau Ngực",
    question: "4 nguyên nhân đau ngực đe dọa tính mạng (4 Big Red Flags) cần loại trừ khẩn cấp?",
    answer: "1. Hội chứng mạch vành cấp (STEMI/NSTEMI)<br>2. Bóc tách động mạch chủ ngực<br>3. Thuyên tắc động mạch phổi cấp<br>4. Tràn khí màng phổi áp lực.",
    explanation: "Làm ngay ECG 12 chuyển đạo, Troponin T/I siêu nhạy và X-quang ngực thẳng tại giường."
  },
  {
    id: "rf-3",
    category: "Khó thở",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Khó Thở",
    question: "Dấu hiệu cảnh báo suy hô hấp nguy kịch trong Khó Thở cấp tính?",
    answer: "1. Thở ngáp / Phổi câm (Silent chest trong hen)<br>2. SpO₂ < 90% dù thở oxy hỗ trợ<br>3. Rối loạn tri giác / Vật vã lơ mơ<br>4. Co kéo cơ hô hấp phụ mức độ nặng.",
    explanation: "Cần chuẩn bị ngay dụng cụ đặt nội khí quản và thông khí nhân tạo xâm nhập."
  },
  {
    id: "rf-4",
    category: "Đau bụng",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Đau Bụng",
    question: "Các dấu hiệu Red Flags gợi ý Ngoại khoa / Viêm phúc mạc trong Đau Bụng?",
    answer: "1. Bụng cứng như gỗ / Phản ứng thành bụng (+)<br>2. Phản ứng dội Blumberg (+)<br>3. Nôn ra máu hoặc đi cầu phân đen như bã cà phê<br>4. Khối u bụng đập theo nhịp tim (Phình ĐMC bụng).",
    explanation: "Mời hội chẩn Ngoại khoa khẩn và thực hiện Siêu âm FAST / CT Bụng có thuốc."
  },
  {
    id: "rf-5",
    category: "Đau đầu",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Đau Đầu",
    question: "Quy tắc SNOOP4 đánh giá Red Flags Đau Đầu gồm những yếu tố nào?",
    answer: "S: Systemic symptoms (Sốt, sụt cân) | N: Neurologic deficits (Thần kinh khu trú) | O: Onset sudden (Búa bổ) | O: Older (>50 tuổi) | P: Pattern change (Thay đổi tính chất).",
    explanation: "Đau đầu xuất hiện đột ngột như búa bổ gợi ý Xuất huyết dưới nhện (SAH) do vỡ túi cùng phình động mạch não."
  },
  {
    id: "rf-6",
    category: "Ngất",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Ngất (Syncope)",
    question: "Các dấu hiệu Red Flags gợi ý Ngất do nguyên nhân Tim Mạch nguy hiểm?",
    answer: "1. Ngất khi đang gắng sức hoặc khi nằm<br>2. Tiền sử gia đình có người đột tử trẻ tuổi<br>3. Ngực có tiếng thổi tâm thu / hẹp van ĐMC<br>4. ECG bất thường (QT kéo dài, Brugada, WPW, block AV).",
    explanation: "Ngất do tim mạch có tỷ lệ tử vong cao trong 1 năm nếu không được chẩn đoán và đặt máy tạo nhịp / ICD kịp thời."
  },
  {
    id: "rf-7",
    category: "Chóng mặt",
    topicName: "🚩 Dấu Hiệu Cảnh Báo Đỏ: Chóng Mặt (HINTS Exam)",
    question: "Thao tác HINTS phân biệt Đột quỵ tiểu não/thân não với Viêm thần kinh tiền đình ngoại biên?",
    answer: "H: Head Impulse bình thường (không có saccade điều chỉnh)<br>N: Nystagmus đổi hướng theo hướng nhìn<br>T: Test of Skew (Lệch trục nhãn cầu thẳng đứng dương tính).",
    explanation: "Bất kỳ dấu hiệu nào trong bộ ba HINTS gợi ý trung ương = Khẩn cấp chụp MRI sọ não khuếch tán DWI."
  }
];

export const SYMPTOM_MATRIX_DATA: Record<string, SymptomMatrixItem> = {
  sot: {
    redFlags: [
      "Co giật hoặc rối loạn tri giác (lơ mơ, hôn mê)",
      "Cứng cổ, sợ ánh sáng (gợi ý kích thích màng não)",
      "Phát ban xuất huyết hình bản đồ hoặc chấm nốt",
      "Tụt huyết áp, mạch nhanh, thiểu niệu (dấu hiệu Sốc)",
      "Sốt cao liên tục > 40°C không đáp ứng hạ sốt"
    ],
    diffDiags: [
      "Nhiễm khuẩn huyết (Sepsis) / Sốc nhiễm khuẩn",
      "Viêm màng não mủ / Viêm não cấp",
      "Sốt xuất huyết Dengue nặng thoát huyết tương",
      "Sốt rét ác tính thể não (nếu có yếu tố dịch tễ)"
    ],
    actionText: "Mở lưu đồ tiếp cận Sốt",
    actionUrl: "symptoms/systemic-symptoms/fever/tc-sot.html"
  },
  daubung: {
    redFlags: [
      "Đau bụng dữ dội, đột ngột như dao đâm",
      "Đề kháng thành bụng hoặc cảm ứng phúc mạc",
      "Nôn mửa liên tục kèm bí trung đại tiện (tắc ruột)",
      "Huyết động không ổn định hoặc tụt huyết áp",
      "Đau lan sau lưng kèm vã mồ hôi (phình động mạch, viêm tụy)"
    ],
    diffDiags: [
      "Thủng tạng rỗng (viêm phúc mạc toàn thể)",
      "Viêm ruột thừa cấp / Viêm tụy cấp nặng",
      "Tắc ruột cơ học hoặc xoắn ruột",
      "Thai ngoài tử cung vỡ (ở nữ độ tuổi sinh sản)"
    ],
    actionText: "Mở lưu đồ tiếp cận Đau bụng",
    actionUrl: "symptoms/gastro-symptoms/abdominal-pain/tc-daubung.html"
  },
  khotho: {
    redFlags: [
      "Thở rít (Stridor) gợi ý tắc nghẽn đường thở trên",
      "Co kéo mạnh cơ hô hấp phụ, rút lõm hõm ức",
      "Tím tái đầu chi, niêm mạc, SpO2 < 90% khi thở khí trời",
      "Không thể nói hết câu ngắn, phải ngồi dậy để thở",
      "Rối loạn nhịp thở (thở quá chậm < 10 lần/phút hoặc Cheyne-Stokes)"
    ],
    diffDiags: [
      "Cơn hen phế quản ác tính đe dọa tính mạng",
      "Đợt cấp COPD suy hô hấp cấp mất bù",
      "Phù phổi cấp huyết động (do suy tim trái cấp)",
      "Dị vật đường thở lớn hoặc phản vệ mức độ nặng"
    ],
    actionText: "Mở lưu đồ tiếp cận Khó thở",
    actionUrl: "symptoms/than-phien-ho-hap-tim-mach/tc-khotho.html"
  },
  daunguc: {
    redFlags: [
      "Đau dữ dội khởi phát đột ngột, đau như xé ngực lan sau lưng",
      "Vã mồ hôi lạnh, khó thở, cảm giác đè nặng bóp nghẹt",
      "Huyết áp lệch nhau > 20 mmHg giữa hai tay",
      "Ngất hoặc tiền ngất, mạch chậm hoặc quá nhanh",
      "Tụt huyết áp (HA tâm thu < 90 mmHg)"
    ],
    diffDiags: [
      "Nhồi máu cơ tim cấp (STEMI hoặc NSTEMI)",
      "Phình bóc tách động mạch chủ ngực cấp tính",
      "Thuyên tắc động mạch phổi cấp diện rộng",
      "Tràn khí màng phổi áp lực gây chèn ép tim cấp"
    ],
    actionText: "Mở lưu đồ tiếp cận Đau ngực",
    actionUrl: "symptoms/than-phien-ho-hap-tim-mach/tc-daunguc.html"
  },
  vangda: {
    redFlags: [
      "Đau hạ sườn phải dữ dội kèm sốt cao rét run (Charcot)",
      "Rối loạn tri giác, kích động, lơ mơ (Bệnh não gan)",
      "Rối loạn đông máu nặng (xuất huyết da niêm, chảy máu chân răng)",
      "Thiếu niệu, vô niệu (Hội chứng gan thận cấp)",
      "Suy kiệt nặng, sụt cân nhanh kèm sờ thấy khối u bụng"
    ],
    diffDiags: [
      "Nhiễm trùng đường mật cấp do sỏi kẹt cổ túi mật",
      "Viêm gan cấp bùng phát (do virus hoặc độc chất, paracetamol)",
      "U đường mật (Cholangiocarcinoma) hoặc U đầu tụy chèn ép",
      "Xơ gan mất bù giai đoạn cuối"
    ],
    actionText: "Mở lưu đồ tiếp cận Vàng da",
    actionUrl: "symptoms/systemic-symptoms/tc-vangda.html"
  },
  phu: {
    redFlags: [
      "Phù cấp tính khởi phát nhanh kèm khó thở dữ dội",
      "Phù nề thanh quản, môi, lưỡi kèm ngứa/ban đỏ sau dùng thuốc",
      "Phù kèm theo tăng huyết áp rất cao và thiểu niệu/vô niệu",
      "Phù một bên chi dưới kèm nóng đỏ, đau nhức bắp chân"
    ],
    diffDiags: [
      "Phản vệ mức độ nặng / Phù mạch (Quincke)",
      "Suy tim cấp mất bù / Phù phổi cấp",
      "Huyết khối tĩnh mạch sâu chi dưới (DVT)",
      "Hội chứng thận hư cấp hoặc đợt cấp suy thận mạn"
    ],
    actionText: "Mở lưu đồ tiếp cận Phù",
    actionUrl: "symptoms/systemic-symptoms/tc-phu.html"
  }
};
