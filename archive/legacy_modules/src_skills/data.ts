/**
 * CliniPortal — Clinical Skills Cranial Nerves & OSCE Database (TypeScript Module)
 */
import { CranialNerveItem, OsceCase, SkillCategoryMeta } from './types';

export const SKILL_SECTIONS_META: SkillCategoryMeta[] = [
  { id: 'part1-section', name: 'Phần 1: Kỹ năng Khám Lâm Sàng', icon: 'fa-stethoscope', badge: 'Khám', count: 12 },
  { id: 'part2-section', name: 'Phần 2: Hồi Sức Cấp Cứu', icon: 'fa-kit-medical', badge: 'Cấp Cứu', count: 10 },
  { id: 'part3-section', name: 'Phần 3: Thủ Thuật Lâm Sàng', icon: 'fa-syringe', badge: 'Thủ Thuật', count: 15 },
  { id: 'part4-section', name: 'Phần 4: Đọc Cận Lâm Sàng', icon: 'fa-x-ray', badge: 'Cận Lâm Sàng', count: 8 },
  { id: 'part5-section', name: 'Phần 5: Bệnh Án & Giao Tiếp', icon: 'fa-comments', badge: 'Bệnh Án', count: 6 },
  { id: 'part6-section', name: 'Phần 6: Điều Trị & Quản Lý Ca', icon: 'fa-pills', badge: 'Điều Trị', count: 9 }
];

export const CRANIAL_NERVES_DATA: Record<string, CranialNerveItem> = {
  cn1: {
    title: "CN I - Dây Khứu Giác (Olfactory Nerve)",
    type: "Cảm giác thuần túy (Khứu giác - Ngửi)",
    exam: "Yêu cầu bệnh nhân nhắm mắt, dùng ngón tay bịt một bên lỗ mũi. Đưa các chất có mùi quen thuộc không kích thích (như trà, cà phê, vỏ cam) lại gần bên mũi mở, yêu cầu bệnh nhân nhận biết mùi. Lặp lại với bên đối diện.",
    patho: "Mất khứu giác (anosmia) một hoặc hai bên. Thường gặp trong chấn thương sọ não (gãy mảnh sàng xương bướm), u màng não tầng trước sọ, hoặc sau viêm nhiễm virus đường hô hấp."
  },
  cn2: {
    title: "CN II - Dây Thị Giác (Optic Nerve)",
    type: "Cảm giác thuần túy (Thị giác - Nhìn)",
    exam: "Đánh giá 3 phần: (1) Thị lực (đọc bảng Snellen hoặc đếm ngón tay); (2) Thị trường (nghiệm pháp đối chiếu tay thầy thuốc ở 4 góc phần tư); (3) Soi đáy mắt đánh giá gai thị và khám phản xạ đồng tử hướng tâm.",
    patho: "Giảm hoặc mất thị lực, khiếm khuyết thị trường (bán manh thái dương trong u tuyến yên, bán manh đồng danh), phù gai thị (tăng áp lực nội sọ) hoặc teo gai thị."
  },
  cn3: {
    title: "CN III - Dây Vận Nhãn (Oculomotor Nerve)",
    type: "Vận động & Đối giao cảm (Vận nhãn, co đồng tử)",
    exam: "Yêu cầu bệnh nhân liếc mắt theo ngón tay thầy thuốc di chuyển hình chữ H (đánh giá các cơ thẳng trong, thẳng trên, thẳng dưới và chéo dưới). Kiểm tra phản xạ đồng tử với ánh sáng (trực tiếp và đồng cảm). Quan sát độ mở khe mi.",
    patho: "Sụp mi cùng bên, lác ngoài (mắt lệch ra ngoài và hơi xuống dưới), giãn đồng tử cùng bên, mất phản xạ ánh sáng. Bệnh nhân nhìn đôi (diplopia)."
  },
  cn4: {
    title: "CN IV - Dây Ròng Rọc (Trochlear Nerve)",
    type: "Vận động thuần túy (Cơ chéo trên nhãn cầu)",
    exam: "Yêu cầu bệnh nhân nhìn xuống dưới và hướng vào trong (nhìn về phía đầu mũi).",
    patho: "Không thể đưa nhãn cầu xuống dưới và vào trong. Bệnh nhân bị nhìn đôi khi đi xuống cầu thang, thường có xu hướng nghiêng đầu sang bên lành để bù trừ."
  },
  cn5: {
    title: "CN V - Dây Tam Ba (Trigeminal Nerve)",
    type: "Hỗn hợp (Cảm giác mặt, vận động cơ nhai)",
    exam: "(1) Cảm giác: Thử cảm giác nông (đau, sờ) ở 3 nhánh V1, V2, V3 trên mặt; (2) Vận động: Yêu cầu bệnh nhân cắn chặt răng, sờ cơ cắn và cơ thái dương; (3) Khám phản xạ giác mạc (chạm nhẹ bông gòn vào giác mạc).",
    patho: "Tê bì, mất cảm giác vùng mặt cùng bên; yếu cơ nhai (khi há miệng hàm lệch về bên liệt); mất phản xạ giác mạc. Đau dây thần kinh số V kịch phát."
  },
  cn6: {
    title: "CN VI - Dây Vận Nhãn Ngoài (Abducens Nerve)",
    type: "Vận động thuần túy (Cơ thẳng ngoài nhãn cầu)",
    exam: "Yêu cầu bệnh nhân liếc mắt ra phía ngoài (về phía tai) hai bên.",
    patho: "Lác trong (mắt lệch vào trong hướng sống mũi), không liếc mắt ra ngoài được. Gây nhìn đôi khi nhìn về phía bên liệt."
  },
  cn7: {
    title: "CN VII - Dây Mặt (Facial Nerve)",
    type: "Hỗn hợp (Vận động cơ mặt, vị giác 2/3 trước lưỡi)",
    exam: "Quan sát mặt lúc nghỉ và yêu cầu bệnh nhân nhăn trán, nhắm chặt mắt, phồng má, nhe răng, huýt sáo. Đánh giá sự cân đối nhân trung và khe mi.",
    patho: "Liệt mặt ngoại biên (Bell's palsy): Liệt toàn bộ nửa mặt cùng bên, mất nếp nhăn trán, mắt nhắm không kín (dấu Bell+); Liệt mặt trung ương: Chỉ liệt 1/4 dưới mặt đối bên tổn thương, vẫn nhăn trán được."
  },
  cn8: {
    title: "CN VIII - Dây Tiền Đình Ốc Tai (Vestibulocochlear)",
    type: "Cảm giác thuần túy (Thính giác và thăng bằng)",
    exam: "(1) Nhánh ốc tai (nghe): Thử nghe tiếng cọ ngón tay hoặc làm nghiệm pháp Weber, Rinne bằng âm thoa; (2) Nhánh tiền đình: Nghiệm pháp Romberg (đứng nhắm mắt), tìm rung giật nhãn cầu (nystagmus).",
    patho: "Ù tai, điếc tiếp nhận (tổn thương nhánh ốc tai); Chóng mặt, rung giật nhãn cầu, đi loạng choạng, Romberg dương tính (tổn thương nhánh tiền đình)."
  },
  cn9: {
    title: "CN IX - Dây Thiệt Hầu (Glossopharyngeal)",
    type: "Hỗn hợp (Cảm giác hầu, vị giác 1/3 sau lưỡi)",
    exam: "Thường khám chung với dây X. Há miệng nói 'A' quan sát lưỡi gà và sự nâng của màn hầu. Thử vị giác ở 1/3 sau lưỡi nếu cần thiết. Đánh giá phản xạ nôn.",
    patho: "Giảm cảm giác họng cùng bên, giảm phản xạ nôn, lưỡi gà lệch về bên lành khi nói 'A'. Nuốt sặc nhẹ."
  },
  cn10: {
    title: "CN X - Dây Phế Vị (Vagus Nerve)",
    type: "Hỗn hợp (Vận động hầu họng, phế vị đối giao cảm)",
    exam: "Đánh giá giọng nói (có khàn tiếng hay giọng mũi không), đánh giá phản xạ nuốt thức ăn đặc/lỏng, quan sát chuyển động lưỡi gà khi bệnh nhân nói 'A'. Khám phản xạ nôn.",
    patho: "Nuốt sặc, nghẹn đặc, khàn tiếng (liệt dây thanh âm), lưỡi gà lệch về bên lành, mất phản xạ nuốt và phản xạ nôn bên liệt."
  },
  cn11: {
    title: "CN XI - Dây Phụ (Accessory Nerve)",
    type: "Vận động thuần túy (Cơ ức đòn chũm và cơ thang)",
    exam: "Yêu cầu bệnh nhân nhún vai chống lại sức cản của thầy thuốc (đánh giá cơ thang). Yêu cầu bệnh nhân quay đầu sang một bên chống lại sức cản (đánh giá cơ ức đòn chũm đối bên).",
    patho: "Bả vai bên liệt xệ xuống, yếu cơ nhún vai cùng bên tổn thương; yếu cơ quay đầu sang bên đối diện. Teo cơ thang và cơ ức đòn chũm."
  },
  cn12: {
    title: "CN XII - Dây Dưới Lưỡi (Hypoglossal Nerve)",
    type: "Vận động thuần túy (Các cơ nội và ngoại nội tại của lưỡi)",
    exam: "Yêu cầu bệnh nhân thè lưỡi thẳng ra ngoài. Quan sát độ thẳng, tình trạng teo lưỡi hay rung giật sợi cơ. Yêu cầu bệnh nhân đẩy lưỡi vào trong má chống lại sức cản bên ngoài.",
    patho: "Lưỡi thè ra bị lệch về phía bên liệt (bên tổn thương). Lâu ngày xuất hiện teo nửa lưỡi và rung giật sợi cơ ở bên liệt."
  }
};

export const OSCE_CASES: OsceCase[] = [
  {
    id: "B1", difficulty: "basic",
    category: "Tim mạch", title: "Khám bệnh nhân đau ngực",
    patient: "Nguyễn Văn A, 65 tuổi, Nam",
    vitals: "Mạch 110 l/p, HA 160/90, Nhịp thở 22, SpO₂ 96%",
    scenario: "Bệnh nhân vào viện vì đau tức ngực trái lan ra tay trái, kéo dài 30 phút không đỡ. Bệnh nhân vã mồ hôi. Bạn có 8 phút để thực hiện khám tim mạch lâm sàng (nhìn, sờ, gõ, nghe) và đề xuất cận lâm sàng ban đầu.",
    duration: 8 * 60,
    checklist: [
      { text: "Chào hỏi, giới thiệu bản thân và giải thích thủ thuật", pts: 1, critical: false },
      { text: "Rửa tay / sát khuẩn tay nhanh", pts: 1, critical: false },
      { text: "Bộc lộ vùng ngực đúng cách, giữ kín đáo", pts: 1, critical: false },
      { text: "NHÌN: Tuần hoàn bàng hệ, sẹo mổ cũ, mỏm tim đập", pts: 2, critical: false },
      { text: "SỜ: Mỏm tim, rung miêu, dấu Harzer", pts: 2, critical: false },
      { text: "NGHE: Tim tại 4 ổ van cơ bản (ĐMC, ĐMP, 2 lá, 3 lá)", pts: 3, critical: true },
      { text: "Đo huyết áp cả 2 tay", pts: 1, critical: false },
      { text: "Đề xuất ECG 12 chuyển đạo + Men tim (Troponin) ngay", pts: 2, critical: true }
    ],
    keyPoints: [
      "Đau ngực cấp kèm vã mồ hôi → phải nghĩ STEMI trước tiên",
      "ECG + Troponin phải được thực hiện trong 10 phút đầu",
      "Nghe tim 4 ổ van: Aortic (KLS 2 phải) → Pulmonic (KLS 2 trái) → Tricuspid (bờ trái xương ức) → Mitral (mỏm tim)"
    ]
  },
  {
    id: "B2", difficulty: "basic",
    category: "Hô hấp", title: "Bệnh nhân khó thở cấp",
    patient: "Trần Thị B, 45 tuổi, Nữ",
    vitals: "Mạch 120 l/p, HA 130/80, SpO₂ 88%, Nhịp thở 28",
    scenario: "Bệnh nhân có tiền sử hen phế quản, vào viện vì khó thở dữ dội, khò khè nghe rõ từ xa. Bạn có 8 phút để thực hiện khám hô hấp, đánh giá mức độ nặng và xử trí ban đầu.",
    duration: 8 * 60,
    checklist: [
      { text: "Chào hỏi nhanh, gọi hỗ trợ điều dưỡng", pts: 1, critical: false },
      { text: "Đo SpO₂ và cho thở oxy ngay (mục tiêu ≥ 94%)", pts: 2, critical: true },
      { text: "Quan sát nhịp thở, tư thế (chống 3 chân?), co kéo cơ hô hấp phụ", pts: 2, critical: false },
      { text: "Gõ phổi đánh giá ứ khí / tràn dịch / tràn khí", pts: 1, critical: false },
      { text: "Nghe phổi 2 bên: ran rít, ran ngáy, rì rào phế nang giảm?", pts: 3, critical: true },
      { text: "Đánh giá mức độ nặng (nói được câu đầy đủ? Kích thích?)", pts: 1, critical: false },
      { text: "Chỉ định phun khí dung Salbutamol 5mg ngay", pts: 2, critical: true }
    ],
    keyPoints: [
      "SpO₂ < 92% = hen nặng, cần xử trí tích cực",
      "Không nghe được ran rít (silent chest) = cơn hen nguy kịch, không phải cải thiện",
      "Salbutamol 5mg phun khí dung, có thể lặp lại mỗi 20 phút × 3 lần trong giờ đầu"
    ]
  }
];
