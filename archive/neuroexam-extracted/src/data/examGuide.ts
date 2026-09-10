export interface ExamSection {
  id: string;
  title: string;
  shortTitle: string;
  iconName: string;
  badge: string;
  summary: string;
  steps: Array<{
    stepNumber: number;
    name: string;
    technique: string;
    normalFinding: string;
    abnormalFinding: string;
    clinicalSignificance: string;
    visualHint?: string;
  }>;
  pearls: string[];
  pitfalls: string[];
}

export const NEURO_EXAM_GUIDE: ExamSection[] = [
  {
    id: "mental-status",
    title: "1. Đánh Giá Ý Thức & Trạng Thái Tâm Thần",
    shortTitle: "Ý thức & GCS/FOUR",
    iconName: "Brain",
    badge: "Bước 1 - Tối quan trọng",
    summary: "Đánh giá mức độ thức tỉnh (Arousal - do hệ thống lưới kích hoạt thân não RAS đảm nhiệm) và nhận thức (Cognition - do vỏ bán cầu não đảm nhiệm). Trong cấp cứu, sử dụng thang điểm Glasgow (GCS), thang điểm FOUR và quy tắc OMIHAT.",
    steps: [
      {
        stepNumber: 1,
        name: "Đánh giá Thang điểm Glasgow (Glasgow Coma Scale - GCS)",
        technique: "Khám 3 đáp ứng: Mở mắt (1-4 điểm), Lời nói (1-5 điểm), Vận động (1-6 điểm). Tổng từ 3 đến 15 điểm.",
        normalFinding: "GCS 15 điểm: Mở mắt tự nhiên (4), Tiếp xúc định hướng đúng (5), Làm theo y lệnh chính xác (6).",
        abnormalFinding: "GCS ≤ 8 điểm: Hôn mê sâu, mất khả năng bảo vệ đường thở, có chỉ định đặt nội khí quản cấp cứu. Mất đáp ứng vận động hoặc co cứng mất vỏ (3 điểm) / duỗi cứng mất não (2 điểm).",
        clinicalSignificance: "Đánh giá mức độ tri giác và nguy cơ tử vong trong chấn thương sọ não và bệnh lý thần kinh cấp tính.",
        visualHint: "Mắt 4 - Lời 5 - Động 6. Dưới 8 đặt ống bảo vệ đường thở."
      },
      {
        stepNumber: 2,
        name: "Thang điểm FOUR (Full Outline of Unresponsiveness)",
        technique: "Khám 4 thành phần (mỗi mục 0-4 điểm): Mắt (Eyelids), Vận động (Motor), Phản xạ thân não (Brainstem: đồng tử, giác mạc), Nhịp thở (Respiration).",
        normalFinding: "FOUR = 16 điểm. Mắt mở theo dõi y lệnh, giơ ngón tay cái, phản xạ đồng tử & giác mạc nhạy, nhịp thở đều tự nhiên.",
        abnormalFinding: "Điểm ≤ 4: Tiên lượng tổn thương thân não nặng; phát hiện được hội chứng 'khóa trong' (Locked-in syndrome: bệnh nhân tỉnh nhưng chỉ cử động mắt đứng).",
        clinicalSignificance: "Vượt trội hơn GCS ở bệnh nhân đã đặt ống nội khí quản và theo dõi phản xạ thân não sát sao hơn.",
        visualHint: "Khám mắt, vận động, phản xạ thân não (đồng tử/giác mạc) và kiểu thở (Cheyne-Stokes / thở máy)."
      },
      {
        stepNumber: 3,
        name: "Khảo sát nhận thức nhanh bằng quy tắc OMIHAT",
        technique: "Kiểm tra 6 trục: O (Orientation - Định hướng thời gian, không gian, bản thân), M (Memory - Trí nhớ tức thì/ngắn hạn), I (Intellect - Trí tuệ), H (Hallucinations - Ảo giác), A (Affect - Khí sắc/cảm xúc), T (Thought - Tư duy).",
        normalFinding: "Định hướng đúng 3 trục, nhớ lại 3 từ sau 3 phút, không có ảo giác hay hoang tưởng.",
        abnormalFinding: "Mất định hướng thời gian, ảo thị/ảo thanh (gặp trong mê sảng Delirium, ngộ độc, cai rượu DTs).",
        clinicalSignificance: "Phân biệt nhanh giữa Mê sảng (Delirium: khởi phát cấp, dao động) và Sa sút trí tuệ (Dementia: tiến triển mạn tính).",
        visualHint: "Hỏi: Hôm nay là thứ mấy, tháng mấy? Nhắc lại 3 từ quả bóng - cái bàn - cây bút."
      }
    ],
    pearls: [
      "90% chẩn đoán thần kinh dựa vào bệnh sử chi tiết, 10% từ thăm khám lâm sàng.",
      "Ở bệnh nhân hôn mê, luôn kiểm tra đường huyết mao mạch tại giường đầu tiên (loại trừ hạ đường huyết mô phỏng hôn mê).",
      "Đồng tử lệch hướng nhìn sang bên liệt gợi ý tổn thương bán cầu (nhìn về phía bán cầu tổn thương); nếu nhìn về phía co giật gợi ý ổ động kinh kích thích."
    ],
    pitfalls: [
      "Nhầm lẫn giữa lú lẫn/thất ngôn với hôn mê: Bệnh nhân mất ngôn ngữ Wernicke nghe không hiểu lệnh nhưng tri giác thức tỉnh vẫn bình thường.",
      "Bỏ qua tổn thương cột sống cổ ở bệnh nhân hôn mê không rõ nguyên nhân (luôn nẹp cổ cho đến khi chụp CT loại trừ)."
    ]
  },
  {
    id: "cranial-nerves",
    title: "2. Khám 12 Đôi Dây Thần Kinh Sọ (Cranial Nerves II - XII)",
    shortTitle: "12 Dây Thần Kinh Sọ",
    iconName: "Eye",
    badge: "Định vị Thân não & Hộp sọ",
    summary: "Thăm khám có hệ thống từ dây II đến dây XII để định vị chính xác vị trí tổn thương tại bán cầu, cuống não, cầu não, hành não hoặc nền sọ.",
    steps: [
      {
        stepNumber: 1,
        name: "Dây II (Thị thần kinh) - Thị lực, Thị trường, Đồng tử & Phản xạ RAPD",
        technique: "Đo thị lực từng mắt (bảng Snellen / đếm ngón tay). Khám thị trường 4 góc tư đối chiếu. Soi đáy mắt tìm phù gai thị. Làm test đèn pin đảo chiều (Swinging flashlight test) tìm RAPD (Marcus-Gunn pupil).",
        normalFinding: "Thị trường đủ 4 góc, đồng tử đều 2 bên (2-4mm), phản xạ ánh sáng trực tiếp và đồng ứng nhanh, âm tính với RAPD.",
        abnormalFinding: "Bán manh đồng danh (tổn thương sau chéo thị - dải thị hoặc vỏ chẩm). Giãn đồng tử một bên mất phản xạ ánh sáng (chèn ép dây III do thoát vị uncal). RAPD dương tính (viêm thị thần kinh, tắc động mạch võng mạc trung tâm CRAO).",
        clinicalSignificance: "Dấu hiệu sống còn để phát hiện sớm tăng áp lực nội sọ (phù gai thị) và tổn thương trục thị giác.",
        visualHint: "Chiếu đèn pin qua lại giữa 2 mắt: nếu chuyển sang mắt bệnh mà đồng tử nở to ra thay vì co lại -> RAPD dương tính!"
      },
      {
        stepNumber: 2,
        name: "Dây III, IV, VI (Vận nhãn) - Kiểm tra hình chữ 'H' & Sụp mi",
        technique: "Yêu cầu bệnh nhân giữ yên đầu, mắt dõi theo ngón tay di chuyển theo quỹ đạo chữ H (sang trái, sang phải, lên trên, xuống dưới). Quan sát độ mở mi và kích thước đồng tử.",
        normalFinding: "Vận nhãn trơn tru phối hợp 2 mắt, không nhìn đôi (diplopia), không rung giật nhãn cầu (nystagmus), khe mi 2 bên cân đối.",
        abnormalFinding: "Liệt dây III: Mắt hướng ra ngoài và xuống dưới ('Down and Out') kèm sụp mi hoàn toàn. Nếu kèm giãn đồng tử -> CẢNH BÁO vỡ phình mạch động mạch thông sau PCom! Liệt dây VI: Không liếc ngoài được. Liệt dây IV: Nhìn đôi dọc, nghiêng đầu bù trừ.",
        clinicalSignificance: "Phân biệt liệt dây III có tổn thương đồng tử (ngoại khoa cấp - chèn ép bao xơ bên ngoài) vs bảo tồn đồng tử (nội khoa - thiếu máu nuôi lõi do đái tháo đường).",
        visualHint: "Quy tắc vàng: Liệt dây III có giãn đồng tử = CẤP CỨU vỡ phình mạch cho đến khi chụp CTA loại trừ."
      },
      {
        stepNumber: 3,
        name: "Dây V (Sinh ba) & Dây VII (Mặt) - Cảm giác mặt, Nếp nhăn trán & Vận động miệng",
        technique: "Dây V: Chạm nhẹ bông gòn vào 3 vùng V1 (trán), V2 (gò má), V3 (hàm dưới) và thử phản xạ giác mạc. Dây VII: Cho bệnh nhân nhăn trán, nhắm chặt mắt, cười nhe răng, phồng má.",
        normalFinding: "Cảm giác mặt đều 2 bên. Nhăn trán đối xứng, mắt nhắm kín, rãnh mũi má cân xứng, không méo miệng.",
        abnormalFinding: "Liệt mặt trung ương (do đột quỵ bán cầu): Liệt 1/4 mặt dưới, NẾP NHĂN TRÁN VẪN CÒN do trán nhận chi phối hai bán cầu! Liệt mặt ngoại biên (Bell's palsy): Liệt toàn bộ nửa mặt, mất nếp nhăn trán, mắt nhắm không kín (dấu hiệu Charles Bell).",
        clinicalSignificance: "Dấu hiệu phân biệt cốt lõi tại giường giữa Đột quỵ não và Liệt dây VII ngoại biên lành tính.",
        visualHint: "Mất nếp nhăn trán = Ngoại biên (Bell's palsy). Còn nhăn trán mà méo miệng = Trung ương (Đột quỵ bán cầu đối bên)."
      },
      {
        stepNumber: 4,
        name: "Dây VIII, IX, X, XI, XII - Thính lực, Phản xạ nôn, Cơ ức đòn chũm & Lưỡi",
        technique: "Dây VIII: Vê ngón tay hoặc thì thầm 2 tai. Dây IX-X: Đè lưỡi kiểm tra phản xạ nuốt, phản xạ nôn và vị trí lưỡi gà. Dây XI: Nhún vai và quay đầu kháng lực. Dây XII: Thè lưỡi thẳng ra trước.",
        normalFinding: "Lưỡi gà nằm chính giữa, màn hầu nâng đều 2 bên, vai nâng mạnh mẽ, lưỡi thè thẳng trục.",
        abnormalFinding: "Lưỡi gà lệch về bên lành khi phát âm 'A'. Lưỡi thè lệch về bên tổn thương (liệt dây XII hạ thiệt). Nuốt nghẹn, sặc (hội chứng hành não / nhồi máu PICA Wallenberg).",
        clinicalSignificance: "Đánh giá nguy cơ tắc nghẽn đường thở và hít sặc ở bệnh nhân tổn thương thân não.",
        visualHint: "Khi tổn thương nơron vận động dưới dây XII: Thè lưỡi ra sẽ lệch về bên LIỆT."
      }
    ],
    pearls: [
      "Tê mặt cùng bên kèm yếu liệt nửa người đối bên là dấu hiệu tổn thương thân não kinh điển (Crossed signs - Hội chứng giao bên).",
      "Đột ngột nhìn đôi dọc kèm nghiêng đầu thường do liệt dây IV (thần kinh ròng rọc chi phối cơ chéo trên)."
    ],
    pitfalls: [
      "Bỏ sót phù gai thị giai đoạn sớm (cần ít nhất vài giờ đến vài ngày mới phát triển rõ); đồng tử bình thường không loại trừ tăng áp lực nội sọ cấp tính."
    ]
  },
  {
    id: "motor-system",
    title: "3. Khám Hệ Thống Vận Động & Sức Cơ (MRC Scale)",
    shortTitle: "Vận Động & Sức Cơ",
    iconName: "Activity",
    badge: "Đánh giá Bán cầu & Tủy sống",
    summary: "Đánh giá khối cơ, trương lực cơ, dấu hiệu Pronator Drift và sức cơ theo thang điểm Hội đồng Nghiên cứu Y khoa Anh (MRC 0-5) từ đầu đến chân.",
    steps: [
      {
        stepNumber: 1,
        name: "Kiểm tra Dấu hiệu Pronator Drift (Liệt tháp kín đáo)",
        technique: "Bệnh nhân giơ thẳng 2 tay ra trước, lòng bàn tay ngửa lên, nhắm mắt trong 10 giây.",
        normalFinding: "Cả hai tay giữ vững tư thế ngửa trong suốt 10 giây không rơi hạ.",
        abnormalFinding: "Bàn tay sấp dần và hạ xuống chậm rãi (Pronator drift) -> Báo hiệu tổn thương bó tháp (nơron vận động trên UMN) kín đáo bán cầu đối bên.",
        clinicalSignificance: "Rất nhạy để phát hiện liệt nửa người nhẹ trong đột quỵ cấp khi bệnh nhân chưa có yếu cơ rõ rệt.",
        visualHint: "Tay úp sấp và rơi từ từ xuống giường: Dấu hiệu tổn thương bó tháp đối bên."
      },
      {
        stepNumber: 2,
        name: "Đo Sức Cơ theo Thang điểm 5 mức MRC (Head-to-Toe)",
        technique: "Khám đối xứng các nhóm cơ: Cơ delta (dạng vai), Cơ nhị đầu (gập khuỷu), Cơ tam đầu (duỗi khuỷu), Cơ duỗi cổ tay, Lực nắm bàn tay, Cơ gập hông (thắt lưng chậu), Cơ tứ đầu đùi (duỗi gối), Cơ gập mu chân (L5), Cơ gập lòng bàn chân (S1).",
        normalFinding: "Độ 5/5: Sức cơ bình thường chống lại toàn bộ sức cản của người khám.",
        abnormalFinding: "0: Liệt hoàn toàn không co cơ; 1: Co cơ nhẹ nhưng không phát sinh cử động khớp; 2: Cử động được nhưng không thắng được trọng lực; 3: Cử động thắng được trọng lực nhưng không kháng được lực cản; 4: Thắng được một phần lực cản.",
        clinicalSignificance: "Phân bố yếu cơ giúp định vị: Liệt nửa người (Bán cầu / Thân não); Liệt 2 chi dưới (Tủy ngực/thắt lưng); Yếu gốc chi đối xứng (Bệnh cơ hoặc khe tiếp hợp); Yếu ngọn chi (Bệnh lý đa dây thần kinh).",
        visualHint: "0 = Liệt hẳn | 1 = Rung cơ | 2 = Trượt trên giường | 3 = Nhấc lên khỏi giường | 4 = Chống lực cản nhẹ | 5 = Bình thường."
      },
      {
        stepNumber: 3,
        name: "Phân biệt Nơron Vận Động Trên (UMN) vs Nơron Vận Động Dưới (LMN)",
        technique: "Khám trương lực cơ (độ co duỗi thụ động chi thể), phản xạ gân xương, rung giật cơ (fasciculations) và teo cơ.",
        normalFinding: "Trương lực cơ bình thường, không co cứng, không teo cơ.",
        abnormalFinding: "UMN (Trung ương): Tăng trương lực cơ kiểu gấp dao (Spasticity), tăng phản xạ gân xương, dấu Babinski (+). LMN (Ngoại biên): Giảm trương lực cơ (liệt mềm), giảm/mất phản xạ gân xương, teo cơ sớm, có rung giật bó cơ (fasciculations).",
        clinicalSignificance: "Lưu ý: Trong giai đoạn tối cấp của đột quỵ hoặc choáng tủy (Spinal Shock), tổn thương UMN có thể biểu hiện liệt mềm và mất phản xạ tạm thời trước khi chuyển thành co cứng.",
        visualHint: "Bảng đối chiếu UMN vs LMN là trụ cột tư duy của mọi bác sĩ thần kinh."
      }
    ],
    pearls: [
      "Bệnh nhân có yếu cơ gốc chi (khó chải đầu, khó đứng dậy khỏi ghế) thường do bệnh cơ (Myopathy) hoặc nhược cơ (MG), hiếm khi do bệnh đa dây thần kinh.",
      "Dấu hiệu Gowers (bệnh nhân phải dùng 2 tay 'leo' lên đầu gối và đùi để đứng dậy) là dấu hiệu đặc trưng của yếu cơ đai hông."
    ],
    pitfalls: [
      "Nhầm lẫn giữa Mệt mỏi toàn thân (Fatigue) và Yếu cơ thực thụ (True weakness): Mệt mỏi không kèm giảm cơ lực khách quan trên thang điểm MRC."
    ]
  },
  {
    id: "sensory-dermatomes",
    title: "4. Khám Cảm Giác & Bản Đồ Khoanh Da (Dermatomes)",
    shortTitle: "Cảm Giác & Khoanh Da",
    iconName: "Maximize2",
    badge: "Định vị Mức Tủy Sống",
    summary: "Khám cảm giác nông (sờ nhẹ, đau/nhiệt) và cảm giác sâu (vị thế khớp, rung âm thoa). Xác định mức cảm giác cắt ngang (Sensory Level) để định vị tổn thương tủy sống.",
    steps: [
      {
        stepNumber: 1,
        name: "Xác định Mức Cảm Giác (Sensory Level) & Khoanh da cột mốc",
        technique: "Dùng kim đầu tù hoặc găng tay chứa nước đá chà dọc từ dưới chân lên thân mình, yêu cầu bệnh nhân nói thời điểm cảm giác thay đổi từ mất sang bình thường.",
        normalFinding: "Cảm giác đồng đều toàn thân, phân biệt rõ nét kích thích nhọn và tù.",
        abnormalFinding: "Mất cảm giác từ một khoanh da trở xuống: Mức T4 (Ngang núm vú), Mức T10 (Ngang rốn), Mức L1 (Nếp lằn bẹn).",
        clinicalSignificance: "Mức cảm giác cắt ngang chỉ điểm vị trí viêm tủy ngang (Transverse myelitis) hoặc chèn ép tủy sống (Epidural abscess/Neoplasm).",
        visualHint: "T4 = Núm vú | T10 = Rốn | L1 = Bẹn | C6 = Ngón cái | S1 = Gót chân."
      },
      {
        stepNumber: 2,
        name: "Hội chứng Brown-Séquard (Tổn thương nửa tủy)",
        technique: "Khám so sánh cảm giác nông (nhiệt/đau) và cảm giác sâu (vị thế khớp) ở hai bên cơ thể.",
        normalFinding: "Hai bên cơ thể đối xứng hoàn toàn.",
        abnormalFinding: "Mất cảm giác vị thế khớp & vận động cùng bên với tổn thương; Mất cảm giác đau và nhiệt ở bên đối diện (do dải gai thị bắt chéo cách 1-2 khoanh tủy).",
        clinicalSignificance: "Gặp trong chấn thương đâm chém tủy, u ngoài tủy chèn ép nửa bên hoặc xơ cứng rải rác.",
        visualHint: "Cùng bên: Liệt vận động + mất cảm giác sâu. Đối bên: Mất cảm giác nhiệt & đau."
      },
      {
        stepNumber: 3,
        name: "Khám cảm giác vùng Yên Ngựa (Saddle Anesthesia - S2-S5)",
        technique: "Dùng tăm bông kiểm tra cảm giác vùng quanh hậu môn, đáy chậu và mặt trong mông.",
        normalFinding: "Cảm giác nguyên vẹn vùng quanh hậu môn, có phản xạ co thắt hậu môn (Anal wink S2-S4).",
        abnormalFinding: "Mất cảm giác vùng yên ngựa kèm giảm trương lực cơ thắt hậu môn (DRE giảm tone) và bí tiểu.",
        clinicalSignificance: "DẤU HIỆU ĐỎ CẤP CỨU của Hội chứng chùm đuôi ngựa (Cauda Equina Syndrome). Cần mổ giải ép trước 48h.",
        visualHint: "Vùng ngồi trên yên ngựa bị tê mất cảm giác = Cấp cứu tủy khẩn cấp!"
      }
    ],
    pearls: [
      "Tê bì phân bố kiểu 'Đi găng - Đi vớ' (Stocking-glove pattern) là bằng chứng của bệnh lý sợi trục thần kinh ngoại biên xa (ví dụ Đái tháo đường, rượu).",
      "Dấu hiệu Lhermitte: Cảm giác điện giật chạy dọc cột sống xuống tay chân khi cúi gập cổ là chỉ điểm viêm tủy cổ hoặc Multiple Sclerosis."
    ],
    pitfalls: [
      "Mức cảm giác trên lâm sàng thường thấp hơn vị trí tổn thương thực tế trên phim MRI từ 1 đến 2 đốt tủy."
    ]
  },
  {
    id: "reflexes",
    title: "5. Khám Phản Xạ Gân Xương & Dấu Hiệu Bệnh Lý Tháp",
    shortTitle: "Phản Xạ Gân Xương",
    iconName: "Zap",
    badge: "Chẩn đoán Cung Phản Xạ",
    summary: "Đánh giá tính toàn vẹn của cung phản xạ tủy sống từ ngoại vi vào tủy và đến cơ đáp ứng. Đánh giá phản xạ gân xương (0-4+) và dấu hiệu Babinski.",
    steps: [
      {
        stepNumber: 1,
        name: "Phản xạ gân xương sâu (Muscle Stretch Reflexes - MSRs)",
        technique: "Dùng búa phản xạ gõ vào các gân: Cơ nhị đầu (C5-C6), Cơ cánh tay quay (C6), Cơ tam đầu (C7), Gân bánh chè (L4), Gân gót Achilles (S1). Chú ý thư giãn cơ và so sánh 2 bên.",
        normalFinding: "Độ 2+: Đáp ứng co cơ vừa phải, cân đối 2 bên. 1+ đến 3+ có thể chấp nhận nếu đối xứng.",
        abnormalFinding: "0: Mất phản xạ (GBS, tổn thương rễ/dây); 4+: Tăng phản xạ kèm giật rung (Clonus cổ chân > 3 nhịp) -> Tổn thương bó tháp UMN.",
        clinicalSignificance: "Giúp định khu chính xác rễ thần kinh bị chèn ép trong bệnh lý thoát vị đĩa đệm cột sống cổ và thắt lưng.",
        visualHint: "L4 = Gân bánh chè | S1 = Gân gót | C5-C6 = Nhị đầu | C7 = Tam đầu."
      },
      {
        stepNumber: 2,
        name: "Dấu hiệu Babinski & Phản xạ Tháp bệnh lý",
        technique: "Dùng đầu tù vạch dọc bờ ngoài lòng bàn chân từ gót lên trên rồi vòng qua gốc các ngón chân về phía ngón cái.",
        normalFinding: "Đáp ứng gập: Các ngón chân gập xuống.",
        abnormalFinding: "Đáp ứng duỗi (Babinski dương tính): Ngón chân cái duỗi thẳng lên trên, các ngón khác xòe ra hình nan quạt.",
        clinicalSignificance: "Dấu hiệu vàng khẳng định tổn thương nơron vận động trên (Bó tháp) trên người lớn.",
        visualHint: "Ngón cái hất lên trời (Up-going toe) = Tổn thương bó tháp trung ương."
      },
      {
        stepNumber: 3,
        name: "Dấu hiệu Kích thích Màng não (Cổ cứng, Kernig, Brudzinski)",
        technique: "Cổ cứng: Gập thụ động cằm vào ngực. Brudzinski: Khi gập cổ thụ động, bệnh nhân tự động co gập gối và háng. Kernig: Gập đùi 90 độ, nâng cẳng chân lên sẽ đau và kháng cự.",
        normalFinding: "Cằm chạm ngực dễ dàng không đau, chân duỗi thẳng không phản ứng.",
        abnormalFinding: "Cổ cứng đờ không gập được, Brudzinski (+) và Kernig (+) kháng cự đau ở cơ đùi sau.",
        clinicalSignificance: "Khẳng định hội chứng màng não trong Viêm màng não mủ hoặc Xuất huyết dưới nhện (SAH).",
        visualHint: "Gập cổ mà chân co lên = Brudzinski (+). Nâng cẳng chân đau kháng cự = Kernig (+)."
      }
    ],
    pearls: [
      "Mất phản xạ da bụng (T8-T12) và phản xạ da bìu (L1-L2) có thể xuất hiện rất sớm trong tổn thương nón tủy hoặc chùm đuôi ngựa.",
      "Ở người già hoặc đái tháo đường lâu năm, mất phản xạ gân gót 2 bên có thể là biến đổi do tuổi hoặc bệnh thần kinh mạn tính."
    ],
    pitfalls: [
      "Nhầm lẫn phản xạ rút chân tránh đau (Withdrawal) với dấu hiệu Babinski: Babinski đòi hỏi cơ duỗi ngón cái dài co thực thụ."
    ]
  },
  {
    id: "coordination-gait",
    title: "6. Khám Điều Hòa Động Tác, Tiểu Não & Dáng Đi",
    shortTitle: "Tiểu Não & Dáng Đi",
    iconName: "Compass",
    badge: "Phân tích Thăng bằng & Vận động",
    summary: "Khám chức năng phối hợp động tác của tiểu não và các dạng rối loạn dáng đi đặc trưng trong đột quỵ, bệnh Parkinson, tổn thương tủy và bệnh lý thần kinh ngoại biên.",
    steps: [
      {
        stepNumber: 1,
        name: "Khám Rối Loạn Vận Động Tiểu Não (Limb Ataxia)",
        technique: "Nghiệm pháp Ngón tay - Chỉ mũi (Finger-to-nose), Nghiệm pháp Gót - Đầu gối (Heel-to-shin), Nghiệm pháp Lật sấp bàn tay liên tục (Rapid alternating movements).",
        normalFinding: "Ngón tay chỉ trúng đích chuẩn xác, gót chân trượt dọc xương chày mượt mà, lật sấp bàn tay nhịp nhàng.",
        abnormalFinding: "Quá tầm (Dysmetria: trỏ quá đích hoặc run tăng dần khi gần tới đích), Mất đồng vận (Dysdiadochokinesia: lật bàn tay vụng về mất nhịp).",
        clinicalSignificance: "Tổn thương bán cầu tiểu não cùng bên (nhồi máu động mạch tiểu não PICA hoặc AICA, u góc cầu tiểu não).",
        visualHint: "Run tăng dần khi sắp chạm ngón tay người khám = Run chủ ý tiểu não (Intention tremor)."
      },
      {
        stepNumber: 2,
        name: "Nghiệm pháp Romberg & Thử nghiệm Đi nối gót (Tandem Gait)",
        technique: "Romberg: Cho bệnh nhân đứng chụm 2 chân, mở mắt quan sát 10s, sau đó nhắm mắt lại. Đi nối gót: Đi từng bước chạm gót chân trước vào mũi chân sau.",
        normalFinding: "Đứng vững cả khi mở mắt và nhắm mắt. Đi nối gót thẳng hàng không chao đảo.",
        abnormalFinding: "Romberg dương tính: Mở mắt đứng vững nhưng NHẮM MẮT THÌ NGÃ NGAY -> Mất cảm giác sâu (cột sau tủy sống/dây TK). Nếu mở mắt đã đứng không vững -> Thất điều tiểu não (Cerebellar ataxia).",
        clinicalSignificance: "Phân biệt thất điều cảm giác sâu (Sensory ataxia) vs Thất điều tiểu não (Cerebellar ataxia).",
        visualHint: "Nhắm mắt mới ngã = Cảm giác sâu (Romberg +). Mở mắt cũng ngã = Tiểu não."
      },
      {
        stepNumber: 3,
        name: "Nhận diện 6 Dạng Dáng Đi Kinh Điển trong Thần Kinh",
        technique: "Quan sát bệnh nhân đi bộ tự do: chân đế, biên độ bước, độ vung tay, chuyển hướng.",
        normalFinding: "Bước đi uyển chuyển, vung tay cân xứng, chân đế hẹp, quay người nhẹ nhàng.",
        abnormalFinding: "1. Dáng đi phạt cỏ (Hemiparetic): Chân liệt vung vòng cung sang bên, tay co gập áp sát ngực. 2. Dáng đi Parkinson (Festinating): Bước ngắn lê chân, người gập tới trước, mất vung tay. 3. Dáng đi chân rũ (Steppage): Nhấc cao đầu gối để tránh quẹt mũi chân xuống đất (liệt TK Mác). 4. Dáng đi cắt kéo (Spastic): 2 đùi chụm sát cọ vào nhau. 5. Dáng đi lảo đảo (Ataxic): Chân đế rộng như người say rượu.",
        clinicalSignificance: "Nhiều bệnh lý thần kinh có thể nhận diện ngay trong 30 giây đầu tiên khi bệnh nhân bước vào phòng khám.",
        visualHint: "Mỗi dáng đi phản ánh một cơ chế giải phẫu đặc trưng: Vỏ não, Hạch nền, Tủy sống hay Rễ thần kinh."
      }
    ],
    pearls: [
      "Thất điều thân mình (Truncal ataxia - ngồi cũng loạng choạng) định vị tổn thương thùy nhộng tiểu não (Vermis), hay gặp trong ngộ độc rượu hoặc nhồi máu não.",
      "Ở bệnh nhân Parkinson, cử động quay đầu hoặc đi qua cửa hẹp thường làm bệnh nhân bị 'đóng băng' (Freezing of gait)."
    ],
    pitfalls: [
      "Đừng bao giờ để bệnh nhân tự đi hoặc làm test Romberg mà không có người đứng sát sẵn sàng đỡ phòng ngừa té ngã chấn thương."
    ]
  },
  {
    id: "hints-protocol",
    title: "7. Phác Đồ HINTS & Chẩn Đoán Chóng Mặt Cấp (AVS)",
    shortTitle: "Quy Trình HINTS",
    iconName: "ShieldAlert",
    badge: "Đặc trị Chóng mặt & Đột quỵ Thân não",
    summary: "Quy trình 3 bước tại giường HINTS (Head Impulse, Nystagmus, Test of Skew) giúp phân biệt Đột quỵ hố sau với Viêm dây thần kinh tiền đình ở bệnh nhân chóng mặt liên tục (AVS).",
    steps: [
      {
        stepNumber: 1,
        name: "Head Impulse Test (Nghiệm pháp giật đầu Halmagyi)",
        technique: "Bệnh nhân nhìn cố định vào mũi người khám. Người khám xoay nhanh đầu bệnh nhân khoảng 20-30 độ sang một bên rồi quan sát mắt.",
        normalFinding: "Bình thường ở người khỏe và Ở BỆNH NHÂN ĐỘT QUỴ THÂN NÃO: Mắt vẫn giữ nguyên điểm cố định trên mũi người khám không bị lệch.",
        abnormalFinding: "Bất thường (Bắt giật bù trừ - Corrective Saccade): Mắt di chuyển theo đầu rồi giật nhanh một nhịp quay lại nhìn mũi -> Gặp trong Viêm thần kinh tiền đình ngoại biên (bệnh lành tính).",
        clinicalSignificance: "Head Impulse BÌNH THƯỜNG trong hội chứng tiền đình cấp là dấu hiệu BÁO ĐỘNG ĐỘT QUỴ!",
        visualHint: "Mắt bám dính vào mũi (không giật bù trừ) ở người đang chóng mặt dữ dội = Cẩn thận Đột quỵ!"
      },
      {
        stepNumber: 2,
        name: "Nystagmus (Kiểm tra rung giật nhãn cầu khi liếc mắt)",
        technique: "Cho bệnh nhân nhìn thẳng, rồi nhìn lệch sang trái 30 độ, nhìn lệch sang phải 30 độ.",
        normalFinding: "Không có nystagmus (chỉ có vài nhịp sinh lý ở góc nhìn cực đại).",
        abnormalFinding: "Nystagmus đổi hướng theo hướng nhìn (Gaze-evoked direction-changing): Nhìn sang trái giật sang trái, nhìn sang phải giật sang phải -> Dấu hiệu ĐỘT QUỴ TRUNG ƯƠNG. (Nếu là ngoại biên, nystagmus chỉ giật về một hướng duy nhất).",
        clinicalSignificance: "Rung giật nhãn cầu đổi hướng hoặc rung giật dọc/xoay thuần túy là dấu ấn tổn thương thân não/tiểu não.",
        visualHint: "Nystagmus đổi hướng = Chỉ điểm trung ương (Đột quỵ hố sau)."
      },
      {
        stepNumber: 3,
        name: "Test of Skew (Nghiệm pháp che mắt so le kiểm tra lệch trục đứng)",
        technique: "Người khám che một mắt bệnh nhân trong 3 giây rồi nhanh chóng chuyển tay sang che mắt bên kia, quan sát mắt vừa được mở.",
        normalFinding: "Hai mắt giữ nguyên trục ngang, không có cử động chỉnh dọc.",
        abnormalFinding: "Mắt vừa mở di chuyển lên trên hoặc xuống dưới để lấy lại tiêu điểm (Skew deviation - Lệch trục nhãn cầu đứng).",
        clinicalSignificance: "Chỉ điểm tổn thương đường dẫn truyền tiền đình tại thân não (cuống não hoặc cầu não).",
        visualHint: "Mắt nhảy lên/xuống khi đổi tay che = Skew deviation (+) -> Đột quỵ thân não!"
      }
    ],
    pearls: [
      "Quy tắc INFARCT: Impulse Normal, Fast-phase Alternating, Refixation on Cover Test = Đột quỵ nhồi máu não.",
      "HINTS chỉ áp dụng cho bệnh nhân đang có triệu chứng chóng mặt LIÊN TỤC kèm nystagmus (AVS). Không dùng HINTS cho chóng mặt từng cơn ngắn như BPPV."
    ],
    pitfalls: [
      "Quá phụ thuộc vào MRI não trong ngày đầu: MRI có thể âm tính giả tới 19% ở nhồi máu tuần hoàn sau nhỏ, trong khi HINTS do bác sĩ có kinh nghiệm khám có độ nhạy lên đến 100%!"
    ]
  }
];
