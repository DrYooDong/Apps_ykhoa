/**
 * CliniPortal - Symptom Matrix Knowledge Base & Diagnostic Engine Data
 * Contains clinical mapping of symptoms, red flags, differential diagnoses, Gap Analysis,
 * Weighted Bayesian specificity scores, and 5-axis disease profiles for Radar Charting.
 */

// 5-Axis Disease Profiles for Radar Charting & Bayesian Scoring
const diseaseProfiles = {
    "Nhồi máu cơ tim cấp (STEMI hoặc NSTEMI)": {
        acuity: 10, severity: 10, prevalence: 8, treatability: 9,
        specificWeights: { daunguc: 0.95, khotho: 0.6, hoihop: 0.5, vãmồhôi: 0.8 }
    },
    "Phình bóc tách động mạch chủ ngực cấp tính": {
        acuity: 10, severity: 10, prevalence: 3, treatability: 6,
        specificWeights: { daunguc: 0.98, daulung: 0.7, chongmat: 0.6 }
    },
    "Thuyên tắc động mạch phổi cấp diện rộng": {
        acuity: 10, severity: 10, prevalence: 5, treatability: 7,
        specificWeights: { khotho: 0.9, daunguc: 0.8, horamau: 0.7, hoihop: 0.6 }
    },
    "Tràn khí màng phổi áp lực gây chèn ép tim cấp": {
        acuity: 10, severity: 9, prevalence: 4, treatability: 9,
        specificWeights: { khotho: 0.9, daunguc: 0.85, khokhe: 0.5 }
    },
    "Cơn hen phế quản ác tính đe dọa tính mạng": {
        acuity: 9, severity: 9, prevalence: 7, treatability: 9,
        specificWeights: { khokhe: 0.95, khotho: 0.9, ho: 0.7 }
    },
    "Phù phổi cấp huyết động (do suy tim trái cấp)": {
        acuity: 9, severity: 9, prevalence: 7, treatability: 8,
        specificWeights: { khotho: 0.95, phu: 0.7, ho: 0.6 }
    },
    "Phản vệ mức độ nặng / Phù mạch (Quincke)": {
        acuity: 10, severity: 10, prevalence: 5, treatability: 9,
        specificWeights: { nguada: 0.9, khotho: 0.9, phu: 0.8, khokhe: 0.7 }
    },
    "Nhiễm khuẩn huyết (Sepsis) / Sốc nhiễm khuẩn": {
        acuity: 10, severity: 10, prevalence: 7, treatability: 8,
        specificWeights: { sot: 0.85, roiloanythuc: 0.8, tieuchay: 0.4 }
    },
    "Viêm màng não mủ / Viêm não cấp": {
        acuity: 10, severity: 10, prevalence: 4, treatability: 8,
        specificWeights: { daudau: 0.9, sot: 0.85, cogiat: 0.8, roiloanythuc: 0.85 }
    },
    "Xuất huyết dưới nhện (SAH) / Đột quỵ": {
        acuity: 10, severity: 10, prevalence: 5, treatability: 7,
        specificWeights: { daudau: 0.98, roiloanythuc: 0.85, cogiat: 0.7, chongmat: 0.7 }
    },
    "Thủng tạng rỗng (viêm phúc mạc toàn thể)": {
        acuity: 10, severity: 10, prevalence: 5, treatability: 8,
        specificWeights: { daubung: 0.98, buonnon: 0.7, sot: 0.6 }
    },
    "Thai ngoài tử cung vỡ": {
        acuity: 10, severity: 10, prevalence: 4, treatability: 9,
        specificWeights: { daubung: 0.95, chongmat: 0.8, tieumau: 0.3 }
    },
    "Viêm ruột thừa cấp / Viêm tụy cấp nặng": {
        acuity: 8, severity: 8, prevalence: 9, treatability: 9,
        specificWeights: { daubung: 0.9, buonnon: 0.8, sot: 0.7 }
    },
    "Nhiễm trùng đường mật cấp": {
        acuity: 9, severity: 9, prevalence: 6, treatability: 8,
        specificWeights: { vangda: 0.95, sot: 0.9, daubung: 0.85 }
    },
    "Vỡ tĩnh mạch trướng thực quản / tâm phình vị": {
        acuity: 10, severity: 10, prevalence: 5, treatability: 7,
        specificWeights: { xuathuyettieuhoa: 0.98, chongmat: 0.8, thieumau: 0.8 }
    },
    "Sốt xuất huyết Dengue nặng thoát huyết tương": {
        acuity: 9, severity: 9, prevalence: 8, treatability: 8,
        specificWeights: { sot: 0.95, thieumau: 0.7, daubung: 0.6 }
    },
    "Hội chứng chùm đuôi ngựa (Cauda Equina)": {
        acuity: 9, severity: 9, prevalence: 2, treatability: 7,
        specificWeights: { daulung: 0.95, tieubuot: 0.8 }
    },
    "Huyết khối tĩnh mạch sâu chi dưới (DVT)": {
        acuity: 7, severity: 7, prevalence: 6, treatability: 8,
        specificWeights: { phu: 0.9, daulung: 0.3 }
    }
};

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
      ],
      gapAnalysis: {
        questions: [
          "Sốt khởi phát từ khi nào? Có cơn lạnh run (rigor) không?",
          "Tiền sử dịch tễ 14 ngày qua (vùng muỗi cắn, du lịch, tiếp xúc F0)?",
          "Có triệu chứng định khu: đau đầu, ho, đau bụng, tiểu buốt?"
        ],
        exam: [
          "Dấu màng não: Cứng cổ, Kernig, Brudzinski",
          "Dấu hiệu shock: Mạch nhanh nhỏ, CRT > 2s, huyết áp tụt/kẹt",
          "Khám da niêm: Ban xuất huyết, chấm xuất huyết, mảng hoại tử"
        ],
        labs: [
          "Công thức máu STAT (WBC, Neutro %, PLT)",
          "CRP / Procalcitonin (Đánh giá mức độ nhiễm trùng)",
          "Cấy máu 2 vị trí + Cấy nước tiểu / Cấy đờm",
          "Test nhanh Dengue NS1 / Plasmodium (Sốt rét)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Vị trí đau chính ở đâu (hố chậu T/P, thượng vị, hạ sườn)?",
          "Tính chất đau (liên tục hay quặn từng cơn, lan đi đâu)?",
          "Tiền sử phẫu thuật bụng, trễ kinh (ở nữ), dùng thuốc giảm đau NSAID?"
        ],
        exam: [
          "Phản ứng thành bụng / Cảm ứng phúc mạc (Dấu hiệu bụng ngoại khoa)",
          "Gõ đục vùng thấp (dịch bụng), gõ vang (chướng hơi tắc ruột)",
          "Thăm trực tràng / âm đạo (nếu nghi ngờ Thai ngoài vỡ / Trĩ nghẹt)"
        ],
        labs: [
          "Siêu âm bụng tổng quát STAT",
          "X-quang bụng không sửa sửa / CT-scan bụng",
          "Amylase / Lipase máu (Nghi ngờ Viêm tụy cấp)",
          "Beta-hCG nước tiểu (bắt buộc ở nữ tuổi sinh đẻ)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Khó thở khởi phát đột ngột (tính bằng phút) hay tiến triển dần?",
          "Khó thở thì hít vào (thanh quản) hay thở ra (phế quản)?",
          "Tiền sử tim mạch, COPD, hen, hoặc bất động kéo dài (PE)?"
        ],
        exam: [
          "Đo SpO2, tần số thở, quan sát kiểu thở & cơ hô hấp phụ",
          "Nghe phổi: Rần rít, rần ngáy, rần ẩm 2 đáy phổi, rì rào phế nang",
          "Dấu hiệu suy tim: Tĩnh mạch cổ nổi, phản hồi gan tĩnh mạch cổ, phù chân"
        ],
        labs: [
          "Khí máu động mạch (ABG) STAT",
          "X-quang ngực thẳng tại giường (CXR)",
          "ECG 12 chuyển đạo + NT-proBNP / Troponin",
          "D-Dimer (nếu nghi ngờ Thuyên tắc phổi PE)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Kiểu đau: Đè nặng đè ép (mạch vạch) hay xé ngực (bóc tách ĐMC) hay Đâm buốt khi hít sâu (màng phổi)?",
          "Đau lan ra vai trái, hàm, hay lan thẳng ra sau lưng?",
          "Có yếu tố nguy cơ: Tăng HA, ĐTĐ, hút thuốc, xơ vữa mạch?"
        ],
        exam: [
          "Đo Huyết áp 2 TAY (xem có lệch nhau > 20 mmHg)",
          "Nghe tim: Tiếng T3, T4, tiếng cọ màng ngoài tim, âm thổi mới",
          "Nghe phổi: Giảm rì rào phế nang 1 bên (Tràn khí màng phổi)"
        ],
        labs: [
          "ECG 12 chuyển đạo STAT trong vòng 10 phút đầu",
          "Troponin T/I hs (Serial 0h - 1h/3h)",
          "X-quang ngực (kiểm tra trung thất rộng / tràn khí)",
          "CT-angiogram ngực (khi nghi ngờ Bóc tách ĐMC hoặc PE)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Vàng da kèm phân bạc màu, nước tiểu sậm màu (tắc mật) không?",
          "Có kèm sốt rét run (nhiễm trùng đường mật) hay đau bụng không?",
          "Tiền sử uống rượu, dùng thuốc (Paracetamol, Đông y), truyền máu?"
        ],
        exam: [
          "Tìm Tam chứng Charcot (Đau sườn P + Sốt + Vàng da) / Ngũ chứng Reynolds",
          "Sờ gan, túi mật (Dấu hiệu Courvoisier - túi mật căng to không đau)",
          "Dấu suy tế bào gan: Nhện mạch, bàn tay son, báng bụng, run vẫy (Asterixis)"
        ],
        labs: [
          "Bilirubin toàn phần, trực tiếp, gián tiếp STAT",
          "Men gan (AST, ALT, GGT, ALP), Prothrombin Time (PT/INR)",
          "Siêu âm bụng / MRCP (Đánh giá giãn đường mật trong/ngoài gan)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Phù toàn thân (mặt, mắt, chân) hay phù cục bộ 1 bên chân?",
          "Phù kèm tiểu ít, tiểu có bọt hay khó thở khi nằm phẳng?",
          "Có dùng thuốc mới gần đây (NSAID, Amlodipine, Kháng sinh)?"
        ],
        exam: [
          "Khám tính chất phù: Phù mềm ấn lõm hay phù cứng, có đối xứng?",
          "Đo vòng cẳng chân 2 bên (lệch > 3cm gợi ý DVT)",
          "Khám dấu hiệu quá tải thể tích: Tĩnh mạch cổ nổi, rần ẩm phổi, phản hồi gan TMC"
        ],
        labs: [
          "Tổng phân tích nước tiểu (Protein niệu, Hồng cầu niệu)",
          "Albumin máu, Ure/Creatinine máu, Điện giải đồ",
          "Siêu âm Doppler mạch máu chi dưới (nếu nghi ngờ DVT)",
          "NT-proBNP & Siêu âm tim (nếu nghi ngờ Suy tim)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Ước tính lượng máu ho ra (vài vệt máu vs khạc ra đầy cốc)?",
          "Tiền sử lao phổi, hút thuốc lá nhiều năm, sụt cân đêm?",
          "Có triệu chứng báo trước: Bứt rứt, nóng sau xương ức, vị kim loại ở miệng?"
        ],
        exam: [
          "Đánh giá đường thở (Airway) & nguy cơ nghẹt thở STAT",
          "Nghe phổi tìm vị trí tổn thương (rần ẩm 1 bên phổi)",
          "Khám họng & mũi loại trừ máu từ tai mũi họng chảy xuống"
        ],
        labs: [
          "Công thức máu, Nhóm máu, Đông máu toàn bộ (PT, aPTT, Fibrinogen)",
          "X-quang ngực thẳng & CT-scan ngực ngực có dựng hình mạch máu",
          "Soi đờm tìm AFB / GeneXpert lao",
          "Nội soi phế quản cấp cứu (nếu ho máu sét đánh)"
        ]
      }
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
        "Tăng áp lực nội sọ (U nội sọ, Xuất huyết)",
        "Ốm nghén / Thai kỳ",
        "Nhồi máu cơ tim cấp (đặc biệt thành dưới)"
      ],
      gapAnalysis: {
        questions: [
          "Nôn ra thức ăn cũ, dịch mật, máu hay dịch bã cà phê?",
          "Nôn vọt (gợi ý tăng áp lực nội sọ) hay nôn sau ăn?",
          "Có đau đầu dữ dội, nhìn đôi hay trễ kinh không?"
        ],
        exam: [
          "Khám bụng: Dấu hiệu vỗ óc sách (hẹp môn vị), quai ruột nổi, âm ruột tăng/mất",
          "Khám thần kinh: Phù gai thị, cổ cứng, dấu thần kinh khu trú",
          "Đánh giá mức độ mất nước: Mắt trũng, niêm mạc khô, véo da"
        ],
        labs: [
          "Điện giải đồ (K+, Na+, Cl-), Ure/Creatinine",
          "Amylase/Lipase, Men gan",
          "X-quang bụng đứng không sửa sửa / CT Scanner",
          "ECG 12 chuyển đạo (loại trừ Nhồi máu cơ tim thành dưới)"
        ]
      }
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
        "Viêm màng não mủ / Viêm não cấp",
        "Viêm động mạch thái dương",
        "Tăng áp lực nội sọ (U nội sọ, Xuất huyết)",
        "Migraine",
        "Đau đầu căng cơ / Đau đầu chùm"
      ],
      gapAnalysis: {
        questions: [
          "Đau đạt đỉnh dữ dội trong bao lâu (vài giây = Sét đánh = SAH)?",
          "Đau một bên đập theo nhịp mạch kèm nôn (Migraine) hay đau như vòng đai siết?",
          "Có yếu tố khởi phát: Ho, rặn, gắng sức hay thay đổi tư thế?"
        ],
        exam: [
          "Dấu màng não (Cứng cổ, Kernig) & Nhiệt độ cơ thể",
          "Khám 12 dây thần kinh sọ, vận động, cảm giác, phản xạ",
          "Soi đáy mắt tìm Phù gai thị (Tăng áp lực nội sọ)",
          "Bắt mạch động mạch thái dương (nghi ngờ Viêm ĐM thái dương ở người > 50t)"
        ],
        labs: [
          "CT-scan sọ não KHÔNG tiêm thuốc tương phản STAT",
          "Chọc dò tủy sống (nếu nghi ngờ Viêm màng não hoặc CT âm tính nhưng nghi SAH)",
          "Tốc độ lắng máu ESR / CRP (nếu nghi Viêm ĐM thái dương)"
        ]
      }
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
        "Xuất huyết dưới nhện (SAH) / Đột quỵ",
        "Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "Viêm dây thần kinh tiền đình",
        "Bệnh Meniere",
        "Hạ huyết áp tư thế",
        "Rối loạn nhịp tim / Suy tim"
      ],
      gapAnalysis: {
        questions: [
          "Cảm giác xoay tròn (tiền đình) hay ảo giác bồng bềnh/choáng váng?",
          "Chóng mặt khi thay đổi tư thế đầu (BPPV) hay kéo dài liên tục?",
          "Có kèm giảm thính lực, ù tai (Meniere/U dây VIII) không?"
        ],
        exam: [
          "Nghiệm pháp HINTS (Head Impulse, Nystagmus, Test of Skew - phân biệt TW vs Ngoại biên)",
          "Nghiệm pháp Dix-Hallpike (Chẩn đoán BPPV)",
          "Đo Huyết áp tư thế (Nằm vs Đứng sau 3 phút)"
        ],
        labs: [
          "MRI sọ não + Hố sau (loại trừ Đột quỵ thân quần/tiểu não)",
          "ECG / Holter ECG 24h",
          "Đo thính lực đồ"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Tiểu máu đầu dòng, cuối dòng hay toàn dòng?",
          "Có kèm đau quặn thận, sốt rét run hay tiểu buốt rát?",
          "Tiền sử hút thuốc lá, tiếp xúc hóa chất nhuộm (U bàng quang), dùng thuốc kháng đông?"
        ],
        exam: [
          "Khám điểm đau niệu quản, Rung thận (Dấu hiệu Giordani)",
          "Thăm trực tràng (TR) đánh giá Tuyến tiền liệt ở nam",
          "Khám hạ vị tìm cầu bàng quang"
        ],
        labs: [
          "Tổng phân tích nước tiểu & Soi cặn Addis (tìm Trụ hồng cầu = Viêm cầu thận)",
          "Siêu âm hệ tiết niệu STAT",
          "CT-Scan hệ tiết niệu có dựng hình (CT Urography)",
          "Nội soi bàng quang (đặc biệt nếu tiểu máu không đau ở người > 40t)"
        ]
      }
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
        "Hội chứng chùm đuôi ngựa (Cauda Equina)",
        "Phình bóc tách động mạch chủ ngực cấp tính",
        "Áp xe ngoài màng cứng / Viêm tủy xương"
      ],
      gapAnalysis: {
        questions: [
          "Đau lan xuống chân theo đường đi dây thần kinh tọa không?",
          "Có rối loạn cơ vòng: Bí tiểu, đại tiểu tiện không tự chủ, tê vùng tầng sinh môn?",
          "Tiền sử K (vú, phổi, tiền liệt tuyến), sốt, dùng Corticoid kéo dài?"
        ],
        exam: [
          "Nghiệm pháp Lasegue (Straight Leg Raise - SLR) kiểm tra chèn ép rễ",
          "Khám cảm giác vùng yên ngựa (Perineal sensation) & Sức cơ 2 chân",
          "Bắt mạch chậu, mạch bẹn, mạch mu chân 2 bên"
        ],
        labs: [
          "MRI cột sống thắt lưng STAT (nếu có dấu hiệu Chùm đuôi ngựa)",
          "X-quang cột sống thắt lưng thẳng/nghiêng",
          "Siêu âm bụng / CT Scanner bụng (loại trừ Phình ĐMC bụng)",
          "VS, CRP, Phốt phatase kiềm"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Cảm giác tim đập nhanh đều hay không đều, bỏ nhịp?",
          "Cơn khởi phát và kết thúc đột ngột hay từ từ?",
          "Có dùng cafein, rượu, thuốc giảm cân, thuốc xịt hen gần đây?"
        ],
        exam: [
          "Nghe tim: Tần số, nhịp điệu (đều vs loạn nhịp hoàn toàn), âm thổi van tim",
          "Khám tuyến giáp (Bướu cổ, mắt lồi, run tay)",
          "Khám dấu hiệu thiếu máu da niêm"
        ],
        labs: [
          "ECG 12 chuyển đạo STAT (tìm Rung nhĩ, SVT, VT, QT kéo dài, WPW)",
          "Holter ECG 24-48h (nếu ECG lúc nghỉ bình thường)",
          "Hormone tuyến giáp (TSH, FT4), Điện giải đồ (K+, Mg2+)"
        ]
      }
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
        "Thuyên tắc động mạch phổi cấp diện rộng",
        "Lao phổi",
        "Cơn hen phế quản ác tính đe dọa tính mạng",
        "Hội chứng chảy dịch mũi sau (Postnasal drip)",
        "Trào ngược dạ dày thực quản (GERD)",
        "Tác dụng phụ của thuốc (Ưc chế men chuyển - ACEI)"
      ],
      gapAnalysis: {
        questions: [
          "Ho kéo dài bao lâu (< 3 tuần = Cấp tính, > 8 tuần = Mạn tính)?",
          "Ho đờm mủ xanh/vàng (nhiễm trùng) hay ho khô?",
          "Đang dùng thuốc huyết áp nhóm ƯCMC (Enalapril, Perindopril) không?"
        ],
        exam: [
          "Nghe phổi: Rần nổ/rần ẩm khu trú (Viêm phổi), rần rít/ngáy (Hen/COPD)",
          "Khám Mũi họng (tìm chảy dịch thành sau họng)",
          "Gõ phổi (đục = đông đặc/dịch màng phổi; vang = tràn khí/khí phế thũng)"
        ],
        labs: [
          "X-quang ngực thẳng (CXR)",
          "Công thức máu, CRP",
          "Soi/Cấy đờm, PCR Lao / GeneXpert",
          "Hô hấp ký (Đo chức năng thông khí phổi)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Số lần đi tiêu/ngày? Phân tóe nước hay phân lẫn nhầy máu?",
          "Tiền sử ăn uống đồ lạ, du lịch gần đây, dùng kháng sinh?",
          "Có kèm nôn mửa, đau quặn bụng hay sốt không?"
        ],
        exam: [
          "Đánh giá mất nước: Mắt trũng, nếp véo da mất chậm, khát nước, hạ HA tư thế",
          "Khám bụng: Ấn đau khu trú hay lan tỏa, âm ruột tăng tống xuất"
        ],
        labs: [
          "Soi phân tìm Hồng cầu, Bạch cầu, Ký sinh trùng",
          "Cấy phân (Salmonella, Shigella, Campylobacter)",
          "Test Độc tố Clostridium difficile A/B (nếu có tiền sử dùng kháng sinh)",
          "Điện giải đồ, Ure/Creatinine"
        ]
      }
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
        "Vỡ tĩnh mạch trướng thực quản / tâm phình vị",
        "Loét dạ dày - tá tràng (Do H. pylori, NSAIDs)",
        "Hội chứng Mallory-Weiss (Rách niêm mạc do nôn ói nhiều)",
        "Viêm dạ dày ăn mòn",
        "Khối u ác tính dạ dày",
        "Rò động mạch chủ - ruột (Aortoenteric fistula)"
      ],
      gapAnalysis: {
        questions: [
          "Nôn máu đỏ tươi, máu cục hay dịch bã cà phê? Phân đen tanh như hắc ín?",
          "Tiền sử viêm loét dạ dày, uống rượu bia nhiều, bệnh gan mạn?",
          "Có dùng thuốc NSAID, Aspirin, Kháng đông gần đây?"
        ],
        exam: [
          "Đánh giá Huyết động STAT (Mạch, Huyết áp tư thế)",
          "Tìm hội chứng Tăng áp tĩnh mạch cửa & Xơ gan (Báng bụng, Sao mạch, Tuần hoàn bàng hệ)",
          "Thăm trực tràng (TR) xác nhận tính chất phân đen/máu"
        ],
        labs: [
          "Công thức máu STAT (Hct/Hb serial mỗi 2-4h), Nhóm máu & Phản ứng chéo",
          "Đông máu toàn bộ (PT, INR, Platelets)",
          "Nội soi tiêu hóa trên cấp cứu (nội soi can thiệp cầm máu trong 12-24h)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Thiếu máu xuất hiện từ từ hay đột ngột kèm mệt mỏi/hoa mắt?",
          "Tiền sử kinh nguyệt (rong kinh), đi tiêu phân đen, trĩ?",
          "Gia đình có ai bị thiếu máu di truyền (Thalassemia) không?"
        ],
        exam: [
          "Khám niêm mạc mắt, lòng bàn tay, nướu răng",
          "Tìm dấu xuất huyết dưới da (mảng bầm, chấm xuất huyết), khám lách to",
          "Nghe tim (âm thổi tâm thu do dòng máu phụt nhanh)"
        ],
        labs: [
          "Tổng phân tích tế bào máu & Chỉ số Hồng cầu (MCV, MCH, RDW)",
          "Hồng cầu lưới (Reticulocyte count)",
          "Ferritin, Sắt huyết thanh, TIBC",
          "Huyết đồ (Fettis) & Điện di Huyết sắc tố"
        ]
      }
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
        "Viêm màng não mủ / Viêm não cấp",
        "Xuất huyết dưới nhện (SAH) / Đột quỵ",
        "Hội chứng cai rượu / Ngộ độc thuốc",
        "Ngất có co giật (Convulsive syncope)"
      ],
      gapAnalysis: {
        questions: [
          "Thời gian cơn giật bao nhiêu phút? Có tự ngưng không?",
          "Mô tả cơn: Giật 2 bên hay cục bộ, có mất ý thức, trợn mắt, sùi bọt oanh?",
          "Giai đoạn sau cơn (Post-ictal): Có lú lẫn, ngủ gà, yếu nửa người (Liệt Todd) không?"
        ],
        exam: [
          "Đường huyết mao mạch tại giường STAT",
          "Đánh giá Dấu hiệu màng não, Dấu thần kinh khu trú",
          "Khám tổn thương thứ phát: Cắn lưỡi, chấn thương đầu/vai do ngã"
        ],
        labs: [
          "Đường huyết, Điện giải đồ (Na+, K+, Ca2+, Mg2+)",
          "CT-Scan / MRI sọ nổi",
          "Điện não đồ (EEG)",
          "Chọc dò tủy sống (nếu có sốt/cứng cổ nghi nhiễm trùng)"
        ]
      }
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
        "Xuất huyết dưới nhện (SAH) / Đột quỵ",
        "Viêm màng não mủ / Viêm não cấp",
        "Bệnh não thiếu oxy sau ngưng tuần hoàn"
      ],
      gapAnalysis: {
        questions: [
          "Lúc phát hiện bệnh nhân thế nào? Diễn tiến đột ngột hay từ từ?",
          "Tiền sử ĐTĐ (hạ đường huyết), xơ gan, suy thận, trầm cảm (uống thuốc quá liều)?",
          "Có vỏ thuốc trống, chai rượu, hoặc bếp than xung quanh không?"
        ],
        exam: [
          "Đánh giá GCS (Glasgow Coma Scale) & Phản xạ đồng tử STAT",
          "Đường huyết mao mạch khẩn",
          "Khám dấu màng nổi, kiểu thở (Cheyne-Stokes, Kussmaul), mùi hơi thở (mùi xeton, mùi uremia, mùi gan)"
        ],
        labs: [
          "Đường huyết, Khí máu động mạch, Điện giải đồ",
          "CT-Scan sọ não STAT",
          "Xét nghiệm Độc chất (Toxicology screen) trong máu/nước tiểu",
          "Cấy máu, Chọc dò tủy sống"
        ]
      }
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
        "Xơ gan mất bù giai đoạn cuối",
        "Ung thư di căn phúc mạc",
        "Suy tim cấp mất bù / Phù phổi cấp",
        "Bệnh lao màng bụng (TB)",
        "Hội chứng thận hư cấp",
        "Viêm tụy cấp / Viêm tụy mạn"
      ],
      gapAnalysis: {
        questions: [
          "Bụng to nhanh hay từ từ? Có kèm phù 2 chân, vàng da?",
          "Tiền sử viêm gan B/C, uống rượu, suy tim, K?",
          "Có đau bụng, sốt, tiêu chảy (nghi ngờ SBP) không?"
        ],
        exam: [
          "Khám báng bụng: Gõ đục vùng thấp, Dấu sóng vỗ",
          "Khám lách to, tuần hoàn bàng hệ kiểu tĩnh mạch cửa",
          "Tĩnh mạch cổ nổi (nghi do Suy tim/Viêm màng ngoài tim)"
        ],
        labs: [
          "Chọc dò dịch báng xét nghiệm: SAAG (Serum-Ascites Albumin Gradient), Tế bào, Protein, Cấy dịch",
          "Siêu âm bụng tổng quát & Doppler tĩnh mạch cửa",
          "Chức năng gan (AST, ALT, Bilirubin, Albumin, PT/INR)"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Nuốt khó với thức ăn đặc trước rồi mới tới thức ăn lỏng (cơ học/u) hay khó cả 2 ngay từ đầu (thần kinh cơ)?",
          "Có kèm sụt cân nhanh, ho khi nuốt, khàn tiếng?",
          "Tiền sử trào ngược lâu năm, hút thuốc, uống rượu?"
        ],
        exam: [
          "Khám vùng cổ: Tìm hạch cổ (Hạch Virchow), bướu cổ",
          "Khám dây thần kinh IX, X, XII (vận động màn hầu, lưỡi)"
        ],
        labs: [
          "Nội soi thực quản - dạ dày (EGD) có sinh thiết",
          "Chụp X-quang thực quản có cản quang barium",
          "Đo áp lực thực quản (Esophageal Manometry)"
        ]
      }
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
        "Tắc ruột cơ học hoặc xoắn ruột",
        "Táo bón do thuốc (Opioid, Kháng cholinergic, Canxi)",
        "Suy giáp / Tăng canxi máu / Đái tháo đường",
        "Hội chứng ruột kích thích thể táo (IBS-C)",
        "Nứt kẽ hậu môn / Trĩ huyết khối"
      ],
      gapAnalysis: {
        questions: [
          "Mới xuất hiện hay đã mạn tính từ nhỏ?",
          "Phân dẹt nhỏ như phân dê, có lẫn máu đỏ tươi không?",
          "Có sụt cân, tiền sử gia đình bị Polyp / Ung thư đại tràng?"
        ],
        exam: [
          "Thăm trực tràng bằng tay (DRE) STAT: Đánh giá cơ thắt, phân kẹt, u trực tràng",
          "Khám bụng: Tìm quai ruột nổi, khối u bụng"
        ],
        labs: [
          "Nội soi đại trực tràng toàn bộ (Colonoscopy)",
          "X-quang bụng đứng không chuẩn bị",
          "TSH, Canxi máu, Đường huyết"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Tiểu rắt, tiểu gấp, tiểu đêm bao nhiêu lần?",
          "Có dịch mủ miệng sáo, tiền sử quan hệ tình dục không an toàn?",
          "Có kèm sốt cao rét run, đau thắt lưng (Viêm đài bể thận) không?"
        ],
        exam: [
          "Khám điểm đau niệu quản, dấu Rung thận",
          "Khám hạ vị tìm cầu bàng quang",
          "Thăm trực tràng (TR) ở nam nghi Viêm/Phì đại tuyến tiền liệt"
        ],
        labs: [
          "Tổng phân tích nước tiểu (Bạch cầu, Nitrite, Hồng cầu)",
          "Soi/Cấy nước tiểu & Kháng sinh đồ",
          "Siêu âm hệ tiết niệu & Đo thể tích nước tiểu tồn lưu"
        ]
      }
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
        "Cơn hen phế quản ác tính đe dọa tính mạng",
        "Viêm tiểu phế quản cấp (RSV ở trẻ nhũ nhi)",
        "Viêm thanh khí phế quản (Croup)",
        "Dị vật đường thở lớn hoặc phản vệ mức độ nặng",
        "Hội chứng cử động dây thanh nghịch thường (PVCM)",
        "Đợt cấp COPD suy hô hấp cấp mất bù"
      ],
      gapAnalysis: {
        questions: [
          "Khò khè xảy ra theo cơn hay liên tục? Có nặng về đêm/rạng sáng?",
          "Tiền sử dị ứng, hen gia đình, hút thuốc lá?",
          "Trẻ nhỏ bị sặc hạt đậu/đồ chơi trước đó không?"
        ],
        exam: [
          "Nghe phổi: Tiếng rần rít, rần ngáy 2 phế trường (Hen/COPD) hay khu trú 1 bên (Dị vật)",
          "Quan sát lồng ngực: Tìm Dấu lồng ngực im lặng (rất nguy hiểm)"
        ],
        labs: [
          "Đo SpO2 & Khí máu động mạch (ABG)",
          "X-quang ngực thẳng & Nghiêng",
          "Hô hấp ký có thử thuốc giãn phế quản"
        ]
      }
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
        "Phản vệ mức độ nặng / Phù mạch (Quincke)",
        "Suy thận mạn (Uremia) / Xơ gan ứ mật nguyên phát",
        "Đa hồng cầu nguyên phát (Ngứa dữ dội sau tắm nước nóng)",
        "U Lympho Hodgkin / Bệnh huyết học ác tính",
        "Cường giáp / Đái tháo đường"
      ],
      gapAnalysis: {
        questions: [
          "Ngứa toàn thân hay khu trú? Ngứa nhiều về đêm (Ghẻ) hay sau tắm nước nóng (Đa hồng cầu)?",
          "Có dùng thuốc mới, mỹ phẩm, ăn hải sản gần đây?",
          "Có kèm sụt cân, sốt về chiều, nổi hạch cổ/nách?"
        ],
        exam: [
          "Khám da toàn thân: Sang thương nguyên phát (Sẩn, mụn nước, mề đay) vs Thứ phát (dấu gãi)",
          "Khám luống ghẻ ở kẽ tay, nếp lằn chỉ cổ tay",
          "Khám hạch ngoại biên, gan lách"
        ],
        labs: [
          "Công thức máu (Eosinophil, Hematocrit), Sinh hóa (Ure, Creatinine, Bilirubin, Men gan)",
          "Hormone tuyến giáp TSH",
          "Soi da tìm ký sinh trùng / Nấm"
        ]
      }
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
        "Xuất huyết dưới nhện (SAH) / Đột quỵ",
        "Cường giáp / U tủy thượng thận"
      ],
      gapAnalysis: {
        questions: [
          "Bệnh nhân có Đái tháo đường đang dùng Insulin hoặc thuốc viên (Gliclazide, Glibenclamide)?",
          "Bữa ăn gần nhất lúc mấy giờ? Có bỏ bữa hay vận động quá sức không?",
          "Tiền sử uống rượu bia nhiều mà không ăn?"
        ],
        exam: [
          "Đường huyết mao mạch (BGM) tại giường STAT (Đường huyết < 3.9 mmol/L)",
          "Khám dấu hiệu vã mồ hôi, da lạnh ẩm, nhịp tim nhanh",
          "Khám thần kinh: Ý thức, dấu thần kinh khu trú"
        ],
        labs: [
          "Đường huyết mao mạch & Đường huyết tĩnh mạch STAT",
          "Insulin & C-peptide máu (nếu nghi Insulinoma)",
          "Chức năng gan, thận"
        ]
      }
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
      ],
      gapAnalysis: {
        questions: [
          "Khối xuất hiện bao lâu? Có to nhanh, di động theo nhịp nuốt (bướu giáp) không?",
          "Có kèm khàn tiếng, nuốt vướng, sốt về chiều, sụt cân?",
          "Tiền sử chiếu xạ vùng cổ, nhiễm trùng TMH gần đây?"
        ],
        exam: [
          "Sờ khối ở cổ: Vị trí (tam giác cổ trước/sau), mật độ (mềm, chắc, cứng), di động khi nuốt/nhe lưỡi",
          "Khám tuyến giáp & các nhóm hạch cổ (I đến VI)",
          "Khám tai mũi họng toàn diện"
        ],
        labs: [
          "Siêu âm vùng cổ & Tuyến giáp",
          "Chọc hút tế bào bằng kim nhỏ (FNA)",
          "CT-Scan / MRI vùng cổ",
          "Chức năng tuyến giáp (TSH, FT4)"
        ]
      }
    }
};
