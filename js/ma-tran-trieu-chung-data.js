/**
 * CliniPortal - Symptom Matrix Knowledge Base (symptomData)
 * Contains clinical mapping of symptoms, red flags, and differential diagnoses.
 */
const symptomData = {
    sot: {
      id: 'sot',
      name: "Sốt",
      icon: "fa-temperature-high",
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
        "Sốt rét ác tính thể não",
        "Nhiễm trùng đường mật cấp",
        "Viêm ruột thừa cấp"
      ]
    },
    daubung: {
      id: 'daubung',
      name: "Đau bụng",
      icon: "fa-stomach",
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
        "Thai ngoài tử cung vỡ",
        "Nhiễm trùng đường mật cấp"
      ]
    },
    khotho: {
      id: 'khotho',
      name: "Khó thở",
      icon: "fa-lungs",
      redFlags: [
        "Thở rít (Stridor) gợi ý tắc nghẽn đường thở trên",
        "Co kéo mạnh cơ hô hấp phụ, rút lõm hõm ức",
        "Tím tái đầu chi, niêm mạc, SpO2 < 90% khi thở khí trời",
        "Không thể nói hết câu ngắn, phải ngồi dậy để thở",
        "Rối loạn nhịp thở (thở quá chậm < 10 hoặc Cheyne-Stokes)"
      ],
      diffDiags: [
        "Cơn hen phế quản ác tính đe dọa tính mạng",
        "Đợt cấp COPD suy hô hấp cấp mất bù",
        "Phù phổi cấp huyết động (do suy tim trái cấp)",
        "Dị vật đường thở lớn hoặc phản vệ mức độ nặng",
        "Nhiễm khuẩn huyết (Sepsis) / Sốc nhiễm khuẩn"
      ]
    },
    daunguc: {
      id: 'daunguc',
      name: "Đau ngực",
      icon: "fa-heart-pulse",
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
        "Tràn khí màng phổi áp lực gây chèn ép tim cấp",
        "Viêm màng ngoài tim cấp"
      ]
    },
    vangda: {
      id: 'vangda',
      name: "Vàng da",
      icon: "fa-person-dots-from-line",
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
        "U đường mật hoặc U đầu tụy chèn ép",
        "Xơ gan mất bù giai đoạn cuối",
        "Nhiễm khuẩn huyết (Sepsis) / Sốc nhiễm khuẩn"
      ]
    },
    phu: {
      id: 'phu',
      name: "Phù",
      icon: "fa-droplet",
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
        "Hội chứng thận hư cấp hoặc đợt cấp suy thận mạn",
        "Xơ gan mất bù giai đoạn cuối"
      ]
    },
    horamau: {
      id: 'horamau',
      name: "Ho ra máu",
      icon: "fa-lungs-virus",
      redFlags: [
        "Khạc máu lượng lớn (> 600mL/24h hoặc > 100mL/lần)",
        "Suy hô hấp cấp (thở nhanh, tím tái, SpO2 giảm)",
        "Nguy cơ ngạt thở do máu lấp đầy đường thở"
      ],
      diffDiags: [
        "Lao phổi",
        "Giãn phế quản",
        "Ung thư phế quản nguyên phát",
        "Thuyên tắc động mạch phổi (PE)",
        "Áp xe phổi / Viêm phổi hoại tử",
        "Hội chứng phổi - thận (Goodpasture, Wegener)"
      ]
    },
    buonnon: {
      id: 'buonnon',
      name: "Nôn ói",
      icon: "fa-face-dizzy",
      redFlags: [
        "Kèm thay đổi ý thức hoặc hôn mê (nguy cơ hít sặc)",
        "Nôn ra máu hoặc dịch bã cà phê",
        "Đau bụng dữ dội, chướng bụng, bí trung đại tiện (Tắc ruột)",
        "Huyết động không ổn định (sốc, mạch nhanh, tụt huyết áp)"
      ],
      diffDiags: [
        "Viêm dạ dày ruột cấp (Nhiễm trùng)",
        "Tắc ruột / Hẹp môn vị",
        "Viêm tụy cấp / Viêm đường mật",
        "Tăng áp lực nội sọ (U não, Xuất huyết)",
        "Ốm nghén / Thai kỳ",
        "Nhồi máu cơ tim cấp (đặc biệt thành dưới)"
      ]
    },
    daudau: {
      id: 'daudau',
      name: "Đau đầu",
      icon: "fa-head-side-virus",
      redFlags: [
        "Đau đầu sét đánh (đột ngột, dữ dội nhất trong đời)",
        "Khởi phát mới ở người > 50 tuổi",
        "Kèm sốt, cứng gáy hoặc dấu thần kinh khu trú",
        "Mất ý thức, lú lẫn, phù gai thị"
      ],
      diffDiags: [
        "Xuất huyết dưới nhện (SAH) / Đột quỵ",
        "Viêm màng não / Viêm màng não mủ",
        "Viêm động mạch thái dương",
        "U nội sọ / Khối choán chỗ",
        "Migraine",
        "Đau đầu căng cơ / Đau đầu chùm"
      ]
    },
    chongmat: {
      id: 'chongmat',
      name: "Chóng mặt",
      icon: "fa-person-falling",
      redFlags: [
        "Kèm đau đầu hoặc đau cổ dữ dội mới khởi phát",
        "Có dấu thần kinh khu trú (thất ngôn, nhìn đôi, yếu liệt)",
        "Mất thăng bằng nặng (không thể tự đi lại hoặc ngồi)",
        "Âm thổi ở tim, hạ huyết áp, rối loạn nhịp tim chậm/nhanh"
      ],
      diffDiags: [
        "Đột quỵ / TIA hệ sống - nền",
        "Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "Viêm dây thần kinh tiền đình",
        "Bệnh Meniere",
        "Hạ huyết áp tư thế",
        "Rối loạn nhịp tim / Suy tim"
      ]
    },
    tieumau: {
      id: 'tieumau',
      name: "Tiểu máu",
      icon: "fa-droplet",
      redFlags: [
        "Tiểu máu đại thể không đau ở người lớn tuổi",
        "Bí tiểu cấp do cục máu đông lớn chặn đường tiểu",
        "Tụt huyết áp hoặc nhịp tim nhanh lúc nghỉ (mất máu)",
        "Máu ở miệng sáo sau chấn thương (đứt niệu đạo)"
      ],
      diffDiags: [
        "Viêm bàng quang / Viêm đài bể thận",
        "Sỏi thận, niệu quản / Sỏi bàng quang",
        "Ung thư bàng quang / Ung thư tế bào thận (RCC)",
        "Viêm cầu thận / Bệnh thận IgA / Hội chứng Alport",
        "Phì đại tiền liệt tuyến (BPH)",
        "Rối loạn đông máu / Quá liều thuốc kháng đông"
      ]
    },
    daulung: {
      id: 'daulung',
      name: "Đau lưng",
      icon: "fa-bone",
      redFlags: [
        "Bí tiểu, yếu hai chân, mất cảm giác yên ngựa (Hội chứng chùm đuôi ngựa)",
        "Đau lưng dữ dội, sờ thấy khối đập đập ở bụng (Phình ĐMC)",
        "Sốt, lạnh run, tiền sử tiêm chích (Nhiễm trùng cột sống)",
        "Sụt cân, tuổi > 50, đau nhiều về đêm (Ung thư di căn)"
      ],
      diffDiags: [
        "Thoái hóa cột sống / Căng cơ",
        "Thoát vị đĩa đệm (Chèn ép rễ)",
        "Hẹp ống sống thắt lưng",
        "Gãy lún đốt sống do loãng xương",
        "Viêm cột sống dính khớp",
        "Phình động mạch chủ bụng (AAA)",
        "Áp xe ngoài màng cứng / Viêm tủy xương"
      ]
    },
    hoihop: {
      id: 'hoihop',
      name: "Hồi hộp / Đánh trống ngực",
      icon: "fa-bolt",
      redFlags: [
        "Kèm ngất hoặc rối loạn ý thức (Nguy cơ ngưng tim)",
        "Kèm đau ngực hoặc khởi phát khi gắng sức",
        "Tụt huyết áp, vã mồ hôi lạnh (Dấu hiệu sốc)",
        "Tiền sử gia đình đột tử do bệnh tim"
      ],
      diffDiags: [
        "Ngoại tâm thu (PACs/PVCs)",
        "Rung nhĩ (AF) / Cuồng nhĩ",
        "Nhịp nhanh trên thất (SVT) / Nhịp nhanh thất (VT)",
        "Cường giáp (Thyrotoxicosis)",
        "Rối loạn lo âu / Cơn hoảng sợ (Panic attacks)",
        "Bệnh van tim (Sa van hai lá) / Suy tim",
        "Sử dụng chất kích thích (Caffeine, Rượu, Ma túy)"
      ]
    },
    ho: {
      id: 'ho',
      name: "Ho",
      icon: "fa-head-side-cough",
      redFlags: [
        "Nhịp thở > 30 l/p, SpO2 < 92% (Suy hô hấp)",
        "Ho ra máu lượng nhiều đe dọa nghẹt thở",
        "Khò khè lồng ngực im lặng (Silent chest)",
        "Sốt cao > 38.5°C kèm nhịp tim nhanh và đau ngực"
      ],
      diffDiags: [
        "Viêm phổi (CAP) / Viêm phế quản cấp",
        "Thuyên tắc động mạch phổi (PE)",
        "Lao phổi / Ung thư phổi",
        "Cơn hen phế quản / Đợt cấp COPD",
        "Hội chứng chảy dịch mũi sau (Postnasal drip)",
        "Trào ngược dạ dày thực quản (GERD)",
        "Tác dụng phụ của thuốc (Ưc chế men chuyển - ACEI)"
      ]
    },
    tieuchay: {
      id: 'tieuchay',
      name: "Tiêu chảy",
      icon: "fa-poop",
      redFlags: [
        "Tiêu phân có máu hoặc chất nhầy (Hội chứng lỵ)",
        "Sốt cao ≥ 38.5°C",
        "Đi tiêu ≥ 6 lần/ngày kéo dài > 48h",
        "Dấu hiệu mất nước nặng (Hạ huyết áp, tim nhanh)",
        "Tiền sử dùng kháng sinh gần đây (Nguy cơ C. difficile)"
      ],
      diffDiags: [
        "Viêm dạ dày ruột cấp do virus (Norovirus, Rotavirus)",
        "Ngộ độc thực phẩm do độc tố (S. aureus, B. cereus)",
        "Viêm ruột do vi khuẩn xâm lấn (Shigella, Salmonella, Campylobacter)",
        "Viêm ruột do kháng sinh (Clostridium difficile)",
        "Nhiễm ký sinh trùng (Giardia, Amip)",
        "Hội chứng ruột kích thích (IBS) / Bệnh lý viêm ruột (IBD)"
      ]
    },
    xuathuyettieuhoa: {
      id: 'xuathuyettieuhoa',
      name: "Nôn máu / Phân đen",
      icon: "fa-syringe",
      redFlags: [
        "Huyết động không ổn định (Sốc, hạ huyết áp tư thế)",
        "Nôn ra máu ồ ạt liên tục",
        "Kèm thay đổi tri giác (Hôn mê gan, nguy cơ hít sặc)",
        "Có dấu hiệu xơ gan (Báng bụng, tuần hoàn bàng hệ, vàng da)"
      ],
      diffDiags: [
        "Loét dạ dày - tá tràng (Do H. pylori, NSAIDs)",
        "Vỡ tĩnh mạch trướng thực quản / tâm phình vị",
        "Hội chứng Mallory-Weiss (Rách niêm mạc do nôn ói nhiều)",
        "Viêm dạ dày ăn mòn",
        "Khối u ác tính dạ dày",
        "Rò động mạch chủ - ruột (Aortoenteric fistula)"
      ]
    },
    thieumau: {
      id: 'thieumau',
      name: "Da niêm nhợt (Thiếu máu)",
      icon: "fa-vial-virus",
      redFlags: [
        "Hạ huyết áp, nhịp tim nhanh (Mất máu cấp tính)",
        "Đau thắt ngực, suy tim sung huyết hoặc ngất",
        "Kèm mảng bầm tím, xuất huyết (Bệnh lý giảm 3 dòng/Tủy xương)",
        "Vàng da, sậm màu nước tiểu (Cơn tan máu cấp)"
      ],
      diffDiags: [
        "Thiếu máu thiếu sắt (Do xuất huyết tiêu hóa, rong kinh)",
        "Thiếu máu nguyên bào khổng lồ (Thiếu Vitamin B12 / Folate)",
        "Bệnh lý mạn tính (Nhiễm trùng, Ung thư, Suy thận)",
        "Bệnh huyết sắc tố (Thalassemia, Hồng cầu hình liềm)",
        "Tan máu (Tự miễn, TTP/DIC, Nhiễm ký sinh trùng Sốt rét)",
        "Suy tủy xương / Rối loạn sinh tủy"
      ]
    },
    cogiat: {
      id: 'cogiat',
      name: "Co giật / Động kinh",
      icon: "fa-brain",
      redFlags: [
        "Cơn kéo dài > 5 phút (Trạng thái động kinh đe dọa tính mạng)",
        "Co giật kèm sốt cao, cứng cổ (Gợi ý Viêm màng não/não)",
        "Kèm chấn thương đầu hoặc tổn thương thần kinh khu trú",
        "Cắn trúng cạnh lưỡi sâu / Tiểu không tự chủ trong cơn"
      ],
      diffDiags: [
        "Bệnh Động kinh (Cơn toàn thể hoặc cục bộ)",
        "Co giật do rối loạn chuyển hóa (Hạ đường huyết, Hạ Natri)",
        "Viêm màng não mủ / Viêm não / Áp xe não",
        "Đột quỵ nhồi máu / Xuất huyết não",
        "Hội chứng cai rượu / Ngộ độc thuốc",
        "Ngất có co giật (Convulsive syncope)"
      ]
    },
    roiloanythuc: {
      id: 'roiloanythuc',
      name: "Rối loạn ý thức / Hôn mê",
      icon: "fa-bed-pulse",
      redFlags: [
        "Thang điểm Glasgow ≤ 8 điểm (Hôn mê nặng)",
        "Hạ huyết áp, nhịp tim nhanh (Sốc nhiễm trùng / Mất máu)",
        "Sốt kèm ban xuất huyết / Cổ cứng (Viêm màng não)",
        "Đồng tử giãn bất thường / Bất đối xứng / Mất phản xạ thân não"
      ],
      diffDiags: [
        "Sảng (Delirium) do nhiễm trùng / Rối loạn chuyển hóa",
        "Ngộ độc thuốc / Rượu / Opioid / CO",
        "Hạ đường huyết / Bệnh não gan / Uremia",
        "Đột quỵ / Tụ máu dưới/ngoài màng cứng",
        "Viêm màng não / Áp xe não",
        "Bệnh não thiếu oxy sau ngưng tuần hoàn"
      ]
    },
    bangbung: {
      id: 'bangbung',
      name: "Báng bụng (Cổ trướng)",
      icon: "fa-weight-scale",
      redFlags: [
        "Sốt, đau bụng, phản ứng dội (Viêm phúc mạc nhiễm khuẩn SBP)",
        "Báng bụng căng cứng kèm suy hô hấp / Thiểu niệu (Chèn ép khoang bụng)",
        "Khối đập theo nhịp mạch ở bụng (Phình ĐMC vỡ)",
        "Vàng da nặng kèm chảy máu da niêm (Suy gan cấp)"
      ],
      diffDiags: [
        "Xơ gan mất bù / Tăng áp lực tĩnh mạch cửa",
        "Ung thư di căn phúc mạc",
        "Suy tim phải / Viêm màng ngoài tim co thắt",
        "Bệnh lao màng bụng (TB)",
        "Hội chứng thận hư cấp",
        "Viêm tụy cấp / Viêm tụy mạn"
      ]
    },
    nuotkho: {
      id: 'nuotkho',
      name: "Nuốt khó / Nghẹn",
      icon: "fa-utensils",
      redFlags: [
        "Nuốt khó cấp tính không thể nuốt cả nước bọt (Chảy nước dãi)",
        "Nghẹt thở, thở rít (Tắc nghẽn đường thở)",
        "Nuốt khó tiến triển nhanh + sụt cân ở người > 50 tuổi (Ung thư)",
        "Sặc/trào ngược lên mũi kèm sốt (Viêm phổi hít)"
      ],
      diffDiags: [
        "Ung thư thực quản / Ung thư vùng tâm vị",
        "Hẹp thực quản do loét trào ngược (GERD)",
        "Co thắt tâm vị (Achalasia)",
        "Đột quỵ / Bệnh lý thần kinh cơ (Nhược cơ, Parkinson)",
        "Dị vật thực quản / Kẹt thức ăn",
        "Túi thừa Zenker / Bướu cổ lớn"
      ]
    },
    taobon: {
      id: 'taobon',
      name: "Táo bón / Thay đổi thói quen đi tiêu",
      icon: "fa-toilet-paper",
      redFlags: [
        "Táo bón cấp tính kèm nôn ói, chướng bụng, bí trung đại tiện (Tắc ruột)",
        "Thay đổi thói quen đi tiêu mới khởi phát ở người > 50 tuổi",
        "Phân dẹt nhỏ dính máu / Sụt cân không rõ nguyên nhân (Ung thư)",
        "Đau hậu môn dữ dội khi đi tiêu (Nứt kẽ hậu môn, trĩ nghẹt)"
      ],
      diffDiags: [
        "Ung thư đại trực tràng / Bệnh túi thừa",
        "Tắc ruột cơ học / Xoắn ruột",
        "Táo bón do thuốc (Opioid, Kháng cholinergic, Canxi)",
        "Suy giáp / Tăng canxi máu / Đái tháo đường",
        "Hội chứng ruột kích thích thể táo (IBS-C)",
        "Nứt kẽ hậu môn / Trĩ huyết khối"
      ]
    },
    tieubuot: {
      id: 'tieubuot',
      name: "Tiểu buốt / Tiểu lắt nhắt",
      icon: "fa-toilet",
      redFlags: [
        "Bí tiểu cấp đau tức hạ vị (Cầu bàng quang dương tính)",
        "Sốt cao, lạnh run, đau hông lưng (Viêm đài bể thận / Sốc)",
        "Bí tiểu kèm mất cảm giác yên ngựa / Yếu hai chân (Hội chứng chùm đuôi ngựa)",
        "Máu ở miệng sáo sau chấn thương khung chậu"
      ],
      diffDiags: [
        "Viêm bàng quang cấp / Viêm niệu đạo (UTI / STD)",
        "Viêm tuyến tiền liệt cấp (Acute Prostatitis)",
        "Phì đại tuyến tiền liệt lành tính (BPH)",
        "Sỏi bàng quang / Sỏi niệu đạo",
        "Bàng quang thần kinh (Neurogenic bladder)",
        "Đái tháo đường / Đái tháo nhạt (Tiểu nhiều)"
      ]
    },
    khokhe: {
      id: 'khokhe',
      name: "Khò khè",
      icon: "fa-wind",
      redFlags: [
        "Lồng ngực im lặng (Silent chest - Cơn hen đe dọa ngừng thở)",
        "SpO2 < 90%, tím tái, co kéo mạnh cơ hô hấp phụ",
        "Thở rít thì hít vào kèm khàn tiếng (Khó thở thanh quản)",
        "Khò khè khu trú 1 bên phổi khởi phát đột ngột (Dị vật)"
      ],
      diffDiags: [
        "Cơn hen phế quản cấp",
        "Viêm tiểu phế quản cấp (RSV ở trẻ nhũ nhi)",
        "Viêm thanh khí phế quản (Croup)",
        "Dị vật đường thở lớn",
        "Hội chứng cử động dây thanh nghịch thường (PVCM)",
        "Đợt cấp COPD / Phù phổi cấp"
      ]
    },
    nguada: {
      id: 'nguada',
      name: "Ngứa da",
      icon: "fa-hand",
      redFlags: [
        "Ngứa kèm mề đay, khó thở, thở rít, sưng môi/mặt (Phản vệ cấp)",
        "Ngứa toàn thân kéo dài không có sang thương da (Bệnh lý hệ thống / Ác tính)",
        "Ngứa dữ dội kèm vàng da sậm màu nước tiểu (Ứ mật / Xơ gan)"
      ],
      diffDiags: [
        "Bệnh ghẻ / Chấy rận / Nấm da",
        "Mề đay / Viêm da tiếp xúc / Viêm da cơ địa",
        "Suy thận mạn (Uremia) / Xơ gan ứ mật nguyên phát",
        "Đa hồng cầu nguyên phát (Ngứa dữ dội sau tắm nước nóng)",
        "U Lympho Hodgkin / Bệnh huyết học ác tính",
        "Cường giáp / Đái tháo đường"
      ]
    },
    haduonghuyet: {
      id: 'haduonghuyet',
      name: "Hạ đường huyết / Tay run",
      icon: "fa-cubes-stacked",
      redFlags: [
        "Rối loạn ý thức, lơ mơ, hôn mê sâu (GCS giảm)",
        "Co giật toàn thể hoặc có dấu thần kinh khu trú giả đột quỵ",
        "Vã mồ hôi đầm đìa, nhịp tim nhanh, hạ thân nhiệt"
      ],
      diffDiags: [
        "Hạ đường huyết do Quá liều Insulin / Sulfonylurea",
        "Hạ đường huyết do nhịn ăn / Nhập viện / Suy gan",
        "U tế bào tiết Insulin (Insulinoma)",
        "Cơn hoảng sợ (Panic attack) / Rối loạn lo âu",
        "Đột quỵ / TIA thiếu máu não",
        "Cường giáp / U tủy thượng thận"
      ]
    },
    khoioco: {
      id: 'khoioco',
      name: "Khối u / Khối ở cổ",
      icon: "fa-dna",
      redFlags: [
        "Khối cổ hẹp chắc, dính cố định, phát triển nhanh",
        "Kèm nuốt khó, khàn tiếng kéo dài > 3 tuần hoặc ho ra máu",
        "Khối ở cổ kèm sốt cao, sưng đỏ đau ngạt thở (Áp xe khoang sâu)",
        "Hạch cổ to kèm sụt cân, sốt về chiều, vã mồ hôi đêm"
      ],
      diffDiags: [
        "Bướu cổ / Nhân giáp / Ung thư tuyến giáp",
        "Hạch viêm do nhiễm trùng tai mũi họng",
        "U Lympho Hodgkin / Di căn ung thư đầu mặt cổ",
        "U nang giáp lưỡi / Nang khe mang",
        "Áp xe vùng cổ / Lao hạch cổ",
        "Túi thừa Zenker / U tuyến nước bọt"
      ]
    }
};
