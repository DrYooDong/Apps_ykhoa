/**
 * CliniPortal — Dược lý Lâm sàng
 * Cơ sở dữ liệu thuốc (Drug Database)
 *
 * Cấu trúc mỗi thuốc:
 *   id, name, brandNames, drugClass, category, routes,
 *   pregnancyCategory, blackBoxWarning,
 *   indications[], dosage{standardAdult, maxDaily, pediatric, renalNote},
 *   adverseEffects[], contraindications[]
 *
 * Phiên bản: 1.1.0  |  Cập nhật: 2026-07-27
 * KHÔNG dùng import/export — khai báo window.DRUGS_DB để tương thích file:///
 */

window.DRUGS_DB = [

  /* ══════════════════════════════════════════════
     NHÓM: KHÁNG SINH
  ══════════════════════════════════════════════ */

  {
    id: "amox_clav",
    name: "Amoxicillin / Clavulanate",
    brandNames: ["Augmentin", "Clavulin", "Amoksiklav"],
    drugClass: "Kháng sinh (Penicillin + β-lactamase inhibitor)",
    category: "Kháng sinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "B",
    blackBoxWarning: null,
    indications: [
      "Nhiễm khuẩn hô hấp trên và dưới (viêm phổi, viêm xoang, viêm họng)",
      "Viêm tai giữa cấp tính",
      "Nhiễm khuẩn da và mô mềm",
      "Nhiễm khuẩn đường tiết niệu không biến chứng",
      "Nhiễm khuẩn răng miệng"
    ],
    dosage: {
      standardAdult: "875/125 mg PO mỗi 12h, hoặc 500/125 mg PO mỗi 8h",
      maxDaily: "2000 mg/ngày (tính theo Amoxicillin)",
      pediatric: "25–45 mg/kg/ngày chia 2 lần (theo thành phần Amoxicillin)",
      renalNote: "CrCl < 30 mL/min: dùng 500/125 mg mỗi 12h. Không dùng viên 875 mg khi CrCl < 30."
    },
    adverseEffects: [
      "Tiêu chảy (phổ biến nhất, do thay đổi hệ vi khuẩn đường ruột)",
      "Buồn nôn, nôn ói",
      "Phát ban da, mày đay",
      "Tăng men gan thoáng qua",
      "Viêm đại tràng giả mạc (C. difficile — hiếm gặp)",
      "Sốc phản vệ (rất hiếm, cần cảnh giác)"
    ],
    contraindications: [
      "Tiền sử dị ứng nặng với Penicillin hoặc Cephalosporin",
      "Tiền sử vàng da / tổn thương gan do Amoxicillin/Clavulanate",
      "Thận trọng ở bệnh nhân suy thận nặng (cần chỉnh liều)"
    ]
  },

  {
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    brandNames: ["Cipro", "Ciprobay", "Ciflox"],
    drugClass: "Kháng sinh nhóm Fluoroquinolone (thế hệ 2)",
    category: "Kháng sinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "C",
    blackBoxWarning: "Nguy cơ viêm gân và đứt gân Achilles (đặc biệt ở bệnh nhân > 60 tuổi hoặc dùng corticosteroid), bệnh thần kinh ngoại biên không hồi phục, và làm trầm trọng bệnh Nhược cơ (Myasthenia gravis). Xem xét lợi ích/nguy cơ trước khi chỉ định.",
    indications: [
      "Nhiễm khuẩn tiết niệu phức tạp và viêm thận bể thận",
      "Tiêu chảy nhiễm khuẩn do Salmonella, Shigella, E. coli",
      "Viêm tuyến tiền liệt vi khuẩn cấp và mạn tính",
      "Nhiễm khuẩn hô hấp dưới (khi vi khuẩn nhạy cảm, đặc biệt Pseudomonas)",
      "Nhiễm khuẩn xương khớp, da và mô mềm",
      "Dự phòng và điều trị bệnh than (Anthrax)"
    ],
    dosage: {
      standardAdult: "PO: 500–750 mg mỗi 12h. IV: 400 mg mỗi 8–12h",
      maxDaily: "1500 mg/ngày (PO)",
      pediatric: "Tránh dùng thường quy. Nếu cần thiết: 10–20 mg/kg mỗi 12h (tối đa 750 mg/liều)",
      renalNote: "CrCl 30–50: 250–500 mg mỗi 12h. CrCl 5–29: 250–500 mg mỗi 18–24h."
    },
    adverseEffects: [
      "Đau gân và viêm gân Achilles (nguy cơ đứt gân)",
      "Bệnh thần kinh ngoại biên (tê bì, đau — có thể không hồi phục)",
      "Kéo dài khoảng QT trên EKG",
      "Tiêu chảy, buồn nôn, đau bụng",
      "Nhạy cảm ánh sáng (photosensitivity)",
      "Rối loạn thần kinh trung ương: chóng mặt, đau đầu, hiếm gặp động kinh"
    ],
    contraindications: [
      "Tiền sử viêm gân / đứt gân do Fluoroquinolone",
      "Dùng đồng thời với Tizanidine",
      "Bệnh nhược cơ (Myasthenia gravis)",
      "Trẻ em và thanh thiếu niên (tránh thường quy)",
      "Phụ nữ có thai và cho con bú"
    ]
  },

  {
    id: "azithromycin",
    name: "Azithromycin",
    brandNames: ["Zithromax", "Azadose", "Azithro"],
    drugClass: "Kháng sinh nhóm Macrolide (thế hệ 2)",
    category: "Kháng sinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "B",
    blackBoxWarning: null,
    indications: [
      "Viêm phổi cộng đồng (Community-acquired pneumonia — CAP), đặc biệt do vi khuẩn không điển hình",
      "Viêm họng, viêm amidan do Streptococcus (khi dị ứng Penicillin)",
      "Nhiễm khuẩn da và mô mềm không biến chứng",
      "Viêm niệu đạo / cổ tử cung do Chlamydia trachomatis",
      "Viêm tai giữa ở trẻ em",
      "Dự phòng MAC (Mycobacterium avium complex) ở bệnh nhân HIV/AIDS"
    ],
    dosage: {
      standardAdult: "PO: 500 mg ngày 1, sau đó 250 mg mỗi ngày x 4 ngày (Z-pack). Hoặc 500 mg/ngày x 3 ngày. IV: 500 mg/ngày",
      maxDaily: "500 mg/ngày",
      pediatric: "10 mg/kg ngày 1 (tối đa 500 mg), sau đó 5 mg/kg/ngày (tối đa 250 mg) x 4 ngày",
      renalNote: "Không cần chỉnh liều ở suy thận nhẹ–trung bình. Thận trọng khi CrCl < 10 mL/min."
    },
    adverseEffects: [
      "Buồn nôn, đau bụng, tiêu chảy (thường nhẹ)",
      "Kéo dài khoảng QT (nguy cơ xoắn đỉnh — Torsades de Pointes)",
      "Tăng men gan, vàng da ứ mật (hiếm)",
      "Ù tai, giảm thính lực tạm thời (khi dùng liều cao kéo dài)",
      "Phản ứng dị ứng da"
    ],
    contraindications: [
      "Tiền sử dị ứng với Macrolide (Azithromycin, Erythromycin, Clarithromycin)",
      "Khoảng QTc kéo dài hoặc loạn nhịp tim nặng",
      "Hạ kali / hạ magie máu chưa được điều chỉnh",
      "Dùng đồng thời thuốc kéo dài QT (Amiodarone, Haloperidol...)",
      "Suy gan nặng"
    ]
  },

  {
    id: "ceftriaxone",
    name: "Ceftriaxone",
    brandNames: ["Rocephin", "Triaxone", "Ceftri"],
    drugClass: "Kháng sinh Cephalosporin thế hệ 3",
    category: "Kháng sinh",
    routes: ["IV", "IM"],
    pregnancyCategory: "B",
    blackBoxWarning: null,
    indications: [
      "Viêm phổi cộng đồng nặng và viêm phổi bệnh viện (phối hợp)",
      "Nhiễm khuẩn huyết (Sepsis) và sốc nhiễm khuẩn",
      "Viêm màng não do vi khuẩn (Meningitis)",
      "Nhiễm khuẩn tiết niệu phức tạp và viêm thận bể thận",
      "Lậu (Gonorrhea) — liều đơn IM",
      "Nhiễm khuẩn ổ bụng, da và mô mềm",
      "Dự phòng phẫu thuật (1 g IV trước mổ)"
    ],
    dosage: {
      standardAdult: "1–2 g IV/IM mỗi 12–24h tùy mức độ nhiễm khuẩn. Viêm màng não: 2 g IV mỗi 12h",
      maxDaily: "4 g/ngày",
      pediatric: "50–100 mg/kg/ngày IV/IM, chia 1–2 lần. Viêm màng não: 100 mg/kg/ngày (tối đa 4 g)",
      renalNote: "Không cần chỉnh liều khi suy thận đơn thuần. Thận trọng khi suy thận + suy gan đồng thời."
    },
    adverseEffects: [
      "Tiêu chảy, buồn nôn (thường nhẹ)",
      "Phản ứng tại chỗ tiêm (đau, sưng, phlebitis khi IV)",
      "Phát ban da, mày đay",
      "Tăng men gan thoáng qua",
      "Sỏi mật giả (biliary sludge) khi dùng liều cao kéo dài",
      "Sốc phản vệ (hiếm — khoảng 0.02%)"
    ],
    contraindications: [
      "Tiền sử dị ứng nặng với Cephalosporin (phản ứng chéo ~1–2% với Penicillin)",
      "Trẻ sơ sinh vàng da tăng bilirubin máu (Ceftriaxone cạnh tranh vị trí gắn albumin)",
      "KHÔNG pha chung với dung dịch có Calci (kể cả NaCl Lactate Ringer) do nguy cơ kết tủa"
    ]
  },

  {
    id: "vancomycin",
    name: "Vancomycin",
    brandNames: ["Vancocin", "Vanco"],
    drugClass: "Kháng sinh Glycopeptide",
    category: "Kháng sinh",
    routes: ["IV", "PO"],
    pregnancyCategory: "C",
    blackBoxWarning: "Nguy cơ độc thận (nephrotoxicity) và độc tai (ototoxicity) nghiêm trọng, đặc biệt khi nồng độ đáy (trough) > 20 mg/L hoặc phối hợp với thuốc độc thận. Bắt buộc theo dõi nồng độ thuốc trong máu (TDM) và chức năng thận.",
    indications: [
      "Nhiễm khuẩn do MRSA (Staphylococcus aureus kháng Methicillin) — chỉ định hàng đầu",
      "Viêm màng não do vi khuẩn kháng Penicillin (phối hợp)",
      "Nhiễm khuẩn huyết nặng do gram dương khi thất bại với Penicillin",
      "Viêm đại tràng do C. difficile (PO — không hấp thu toàn thân)",
      "Dự phòng viêm nội tâm mạc ở bệnh nhân dị ứng Penicillin"
    ],
    dosage: {
      standardAdult: "15–20 mg/kg IV mỗi 8–12h (dựa theo trọng lượng thực). Truyền chậm ≥ 60 phút. C. diff (PO): 125 mg mỗi 6h x 10 ngày",
      maxDaily: "60 mg/kg/ngày (IV). Liều đơn tối đa 3 g",
      pediatric: "10–15 mg/kg IV mỗi 6h (trẻ em). Sơ sinh: tùy tuổi thai và cân nặng",
      renalNote: "Điều chỉnh liều theo CrCl và TDM. AUC/MIC mục tiêu: 400–600 mg·h/L. Theo dõi sát khi CrCl < 50 mL/min."
    },
    adverseEffects: [
      "Hội chứng 'Red Man' (đỏ bừng mặt-cổ khi truyền quá nhanh — không phải dị ứng thật)",
      "Độc thận (nephrotoxicity): tăng creatinine, thiểu niệu",
      "Độc tai (ototoxicity): ù tai, giảm thính lực (khi nồng độ cao)",
      "Viêm tĩnh mạch tại chỗ truyền",
      "Giảm bạch cầu trung tính (neutropenia — khi dùng kéo dài)"
    ],
    contraindications: [
      "Tiền sử dị ứng nghiêm trọng với Vancomycin",
      "Tránh phối hợp với thuốc độc thận khác (Aminoglycoside, NSAID, Cisplatin) nếu không cần thiết",
      "Không truyền Vancomycin nhanh hơn 10 mg/phút"
    ]
  },

  {
    id: "metronidazole",
    name: "Metronidazole",
    brandNames: ["Flagyl", "Metrogyl", "Klion"],
    drugClass: "Kháng sinh / Kháng ký sinh trùng nhóm Nitroimidazole",
    category: "Kháng sinh",
    routes: ["PO", "IV", "Tại chỗ"],
    pregnancyCategory: "B",
    blackBoxWarning: "Metronidazole được chứng minh gây ung thư ở chuột và chuột bạch. Tránh dùng không cần thiết. Chỉ sử dụng khi có chỉ định rõ ràng.",
    indications: [
      "Nhiễm khuẩn kỵ khí (Anaerobic infections): ổ bụng, khung chậu, não",
      "Viêm đại tràng giả mạc do C. difficile (nhẹ–trung bình)",
      "Viêm âm đạo do Trichomonas và Bacterial vaginosis",
      "Bệnh amip (Amebiasis): amip ruột và áp xe amip gan",
      "Nhiễm Giardia lamblia",
      "Phối hợp điều trị H. pylori (phác đồ ba/bốn thuốc)"
    ],
    dosage: {
      standardAdult: "PO: 500 mg mỗi 8h hoặc 250 mg mỗi 6h. IV: 500 mg mỗi 6–8h (truyền trong 30–60 phút). C. diff nhẹ: 500 mg PO mỗi 8h x 10–14 ngày",
      maxDaily: "4000 mg/ngày",
      pediatric: "7.5 mg/kg PO/IV mỗi 8h (tối đa 500 mg/liều)",
      renalNote: "Không cần chỉnh liều thường quy. Thận trọng khi suy thận nặng và lọc máu (chất chuyển hóa tích lũy)."
    },
    adverseEffects: [
      "Vị kim loại trong miệng (metallic taste) — rất phổ biến",
      "Buồn nôn, chán ăn, đau bụng",
      "Viêm thần kinh ngoại biên (khi dùng liều cao kéo dài)",
      "Phản ứng giống Disulfiram khi uống rượu (đỏ bừng, nôn, nhịp tim nhanh)",
      "Độc thần kinh trung ương: chóng mặt, đau đầu, hiếm gặp động kinh",
      "Nước tiểu màu nâu sẫm (vô hại)"
    ],
    contraindications: [
      "Tam cá nguyệt đầu của thai kỳ (tránh dùng)",
      "Uống rượu trong và 48h sau khi dùng thuốc",
      "Dùng đồng thời Disulfiram",
      "Tiền sử động kinh hoặc bệnh lý thần kinh nặng (thận trọng)"
    ]
  },

  {
    id: "doxycycline",
    name: "Doxycycline",
    brandNames: ["Vibramycin", "Doxypalu", "Tolexine"],
    drugClass: "Kháng sinh nhóm Tetracycline (thế hệ 2)",
    category: "Kháng sinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "D",
    blackBoxWarning: null,
    indications: [
      "Nhiễm khuẩn không điển hình: Chlamydia, Mycoplasma, Rickettsiae",
      "Viêm phổi cộng đồng nhẹ–trung bình (vi khuẩn nhạy cảm)",
      "Bệnh Lyme (giai đoạn sớm và muộn)",
      "Mụn trứng cá viêm (acne vulgaris) mức độ vừa–nặng",
      "Dự phòng sốt rét (Malaria prophylaxis)",
      "Bệnh than (Anthrax) và dịch hạch (Plague)",
      "STI: lậu, giang mai (khi dị ứng Penicillin), Chlamydia"
    ],
    dosage: {
      standardAdult: "100 mg PO/IV mỗi 12h (ngày 1: 200 mg liều nạp). Mụn trứng cá/dự phòng sốt rét: 100 mg/ngày",
      maxDaily: "300 mg/ngày (nhiễm khuẩn nặng)",
      pediatric: "Trẻ > 8 tuổi: 2.2 mg/kg PO/IV mỗi 12h. Tuyệt đối tránh dùng cho trẻ ≤ 8 tuổi",
      renalNote: "Không cần chỉnh liều đáng kể (thải chủ yếu qua phân). An toàn hơn các Tetracycline khác trong suy thận."
    },
    adverseEffects: [
      "Kích ứng thực quản và dạ dày (uống với đầy đủ nước, không nằm ngay sau khi uống)",
      "Nhạy cảm ánh sáng (photosensitivity) — dùng kem chống nắng khi ra ngoài",
      "Buồn nôn, tiêu chảy",
      "Loạn khuẩn âm đạo (superinfection) khi dùng kéo dài",
      "Vàng răng và ức chế phát triển xương (trẻ em ≤ 8 tuổi và thai nhi)"
    ],
    contraindications: [
      "Trẻ em ≤ 8 tuổi (gây vàng răng vĩnh viễn và ức chế xương)",
      "Phụ nữ có thai và cho con bú (thai kỳ phân loại D)",
      "Tránh phối hợp với Antacid/sữa/sắt/kẽm — giảm hấp thu đáng kể"
    ]
  },

  {
    id: "meropenem",
    name: "Meropenem",
    brandNames: ["Meronem", "Merrem", "Merocel"],
    drugClass: "Kháng sinh Carbapenem",
    category: "Kháng sinh",
    routes: ["IV"],
    pregnancyCategory: "B",
    blackBoxWarning: null,
    indications: [
      "Nhiễm khuẩn nặng do vi khuẩn gram âm kháng thuốc (ESBL, Pseudomonas)",
      "Nhiễm khuẩn ổ bụng phức tạp (phối hợp Metronidazole nếu cần)",
      "Viêm màng não do vi khuẩn gram âm",
      "Nhiễm khuẩn huyết (Sepsis) khi nghi ngờ đa kháng",
      "Nhiễm khuẩn bệnh viện: viêm phổi thở máy (VAP), nhiễm khuẩn đường tiết niệu",
      "Cơn bão kháng sinh cuối — kháng sinh dự phòng cho bệnh nhân suy giảm miễn dịch"
    ],
    dosage: {
      standardAdult: "0.5–1 g IV mỗi 8h (truyền trong 15–30 phút). Nhiễm khuẩn nặng / màng não: 2 g IV mỗi 8h",
      maxDaily: "6 g/ngày",
      pediatric: "10–40 mg/kg IV mỗi 8h (tối đa 2 g/liều tùy chỉ định)",
      renalNote: "CrCl 26–50: 1 g mỗi 12h. CrCl 10–25: 500 mg mỗi 12h. CrCl < 10: 500 mg mỗi 24h. Bổ sung liều sau HD."
    },
    adverseEffects: [
      "Buồn nôn, tiêu chảy, đau bụng",
      "Tăng men gan (ALT, AST)",
      "Phát ban da, phản ứng tại chỗ truyền",
      "Ngưỡng động kinh giảm (ít hơn Imipenem nhưng cần lưu ý)",
      "Bội nhiễm nấm hoặc C. difficile khi dùng kéo dài",
      "Sốc phản vệ (hiếm)"
    ],
    contraindications: [
      "Tiền sử dị ứng nặng với Carbapenem (phản ứng chéo ~1% với Penicillin)",
      "Phối hợp với Valproate / Valproic acid (làm giảm nồng độ Valproate nghiêm trọng — cơn động kinh!)",
      "Không dùng đường uống (bioavailability gần 0%)"
    ]
  },

  /* ══════════════════════════════════════════════
     NHÓM: TIM MẠCH
  ══════════════════════════════════════════════ */

  {
    id: "metoprolol_succ",
    name: "Metoprolol Succinate ER",
    brandNames: ["Toprol-XL", "Betaloc ZOK"],
    drugClass: "Chẹn beta-1 chọn lọc (Cardioselective β-blocker)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "C",
    blackBoxWarning: "Tránh ngừng thuốc đột ngột. Có thể gây bùng phát cơn đau thắt ngực, nhồi máu cơ tim, hoặc rối loạn nhịp nguy hiểm. Cần giảm liều dần trong ít nhất 1–2 tuần.",
    indications: [
      "Tăng huyết áp (đơn trị liệu hoặc phối hợp)",
      "Bệnh động mạch vành, đau thắt ngực ổn định",
      "Suy tim mạn tính có giảm EF (HFrEF) — khởi đầu liều thấp",
      "Kiểm soát tần số thất trong rung nhĩ / cuồng nhĩ",
      "Dự phòng sau nhồi máu cơ tim"
    ],
    dosage: {
      standardAdult: "25–100 mg PO 1 lần/ngày (uống nguyên viên, không nghiền)",
      maxDaily: "200 mg/ngày",
      pediatric: "1 mg/kg PO 1 lần/ngày (liều khởi đầu)",
      renalNote: "Không cần chỉnh liều ở bệnh nhân suy thận."
    },
    adverseEffects: [
      "Chậm nhịp tim (Bradycardia)",
      "Hạ huyết áp",
      "Mệt mỏi, chóng mặt (đặc biệt lúc đầu điều trị)",
      "Lạnh đầu chi, tê bì",
      "Rối loạn giấc ngủ, ác mộng",
      "Co thắt phế quản (ở liều cao hoặc bệnh nhân hen)"
    ],
    contraindications: [
      "Nhịp chậm xoang < 45 bpm hoặc Block AV độ II/III",
      "Sốc tim (Cardiogenic shock)",
      "Suy tim mất bù cấp tính",
      "Hen phế quản nặng hoặc COPD nặng",
      "Hội chứng suy nút xoang (không có máy tạo nhịp)"
    ]
  },

  {
    id: "verapamil",
    name: "Verapamil Hydrochloride",
    brandNames: ["Isoptin", "Calan", "Verelan"],
    drugClass: "Chẹn kênh Canxi Non-Dihydropyridine (Non-DHP CCB)",
    category: "Tim mạch",
    routes: ["PO", "IV"],
    pregnancyCategory: "C",
    blackBoxWarning: null,
    indications: [
      "Cơn tim nhanh trên thất (PSVT) — cắt cơn bằng IV",
      "Kiểm soát tần số thất trong rung nhĩ / cuồng nhĩ mạn tính",
      "Tăng huyết áp (đặc biệt khi kết hợp đau thắt ngực)",
      "Đau thắt ngực do co thắt mạch vành (Prinzmetal)",
      "Đau nửa đầu dự phòng (off-label)"
    ],
    dosage: {
      standardAdult: "PO: 80–120 mg 3 lần/ngày. IV: 2.5–5 mg tiêm chậm trong 2 phút (có thể lặp 5–10 mg sau 15–30 phút)",
      maxDaily: "480 mg/ngày (PO)",
      pediatric: "0.1–0.2 mg/kg IV tiêm chậm, theo dõi sát EKG",
      renalNote: "CrCl < 10 mL/min: giảm 25–50% liều tiêu chuẩn."
    },
    adverseEffects: [
      "Táo bón nặng (phổ biến nhất)",
      "Chậm nhịp tim, Block AV",
      "Hạ huyết áp",
      "Phù ngoại vi",
      "Bùng phát suy tim (ở bệnh nhân EF thấp)",
      "Tăng nồng độ Digoxin khi dùng chung"
    ],
    contraindications: [
      "Suy tim tâm thu EF thấp (HFrEF) — chống chỉ định tuyệt đối",
      "Block AV độ II/III (không có máy tạo nhịp)",
      "Hội chứng WPW kèm rung nhĩ",
      "Hạ huyết áp nặng (HATT < 90 mmHg)",
      "KHÔNG phối hợp IV với beta-blocker IV"
    ]
  },

  {
    id: "amlodipine",
    name: "Amlodipine Besylate",
    brandNames: ["Norvasc", "Amlor", "Amlodipin"],
    drugClass: "Chẹn kênh Canxi Dihydropyridine (DHP CCB)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "C",
    blackBoxWarning: null,
    indications: [
      "Tăng huyết áp (đơn trị liệu hoặc phối hợp — ưu tiên trong guideline)",
      "Đau thắt ngực ổn định mạn tính",
      "Đau thắt ngực do co thắt mạch vành (Vasospastic angina)",
      "Phối hợp với statin trong hội chứng chuyển hóa"
    ],
    dosage: {
      standardAdult: "5–10 mg PO 1 lần/ngày (khởi đầu 5 mg, tăng sau 7–14 ngày nếu cần)",
      maxDaily: "10 mg/ngày",
      pediatric: "6–17 tuổi: 2.5–5 mg PO 1 lần/ngày",
      renalNote: "Không cần chỉnh liều — thải qua gan chủ yếu. An toàn trong suy thận."
    },
    adverseEffects: [
      "Phù mắt cá chân (ankle edema) — phổ biến nhất (~10%), do giãn mạch",
      "Đỏ bừng mặt (flushing), cảm giác nóng",
      "Nhức đầu, chóng mặt",
      "Nhịp tim nhanh phản xạ (khi khởi đầu liều cao)",
      "Bướu lợi (gingival hyperplasia) khi dùng kéo dài"
    ],
    contraindications: [
      "Tình trạng sốc tim",
      "Hạ huyết áp nặng (HATT < 90 mmHg) lúc khởi đầu",
      "Thận trọng ở bệnh nhân suy gan nặng (cần giảm liều bắt đầu)"
    ]
  },

  {
    id: "lisinopril",
    name: "Lisinopril",
    brandNames: ["Prinivil", "Zestril", "Linopril"],
    drugClass: "Thuốc ức chế men chuyển Angiotensin (ACE Inhibitor)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "D",
    blackBoxWarning: "Gây dị dạng thai nhi nghiêm trọng (thai kỳ phân loại D từ tam cá nguyệt 2–3): thiểu ối, suy thận thai nhi, tử vong sơ sinh. NGỪNG thuốc ngay khi phát hiện có thai.",
    indications: [
      "Tăng huyết áp (first-line trong phần lớn bệnh nhân, đặc biệt ĐTĐ có protein niệu)",
      "Suy tim mạn tính (HFrEF) — giảm tử vong và tái nhập viện",
      "Sau nhồi máu cơ tim cấp (khởi đầu sớm trong 24h đầu)",
      "Bệnh thận đái tháo đường (Diabetic nephropathy) — bảo vệ thận"
    ],
    dosage: {
      standardAdult: "THA: 10–40 mg PO 1 lần/ngày. Suy tim: khởi đầu 2.5–5 mg, tăng đến 20–40 mg/ngày",
      maxDaily: "80 mg/ngày",
      pediatric: "6–16 tuổi: 0.07 mg/kg PO 1 lần/ngày (tối đa 5 mg/ngày khởi đầu)",
      renalNote: "CrCl 10–30: khởi đầu 2.5–5 mg/ngày. CrCl < 10: 2.5 mg/ngày. Theo dõi kali và creatinine sát."
    },
    adverseEffects: [
      "Ho khan dai dẳng (~15% bệnh nhân — do tích lũy Bradykinin)",
      "Tăng kali máu (Hyperkalemia), đặc biệt khi phối hợp K-sparing diuretic",
      "Hạ huyết áp liều đầu (first-dose hypotension)",
      "Suy thận cấp (khi hẹp ĐM thận hai bên hoặc giảm thể tích)",
      "Phù mạch (Angioedema) — nguy hiểm, ngừng thuốc và điều trị khẩn"
    ],
    contraindications: [
      "Phụ nữ có thai (tam cá nguyệt 2–3) — phân loại D",
      "Tiền sử phù mạch do ACEi",
      "Hẹp động mạch thận hai bên",
      "Tăng kali máu > 5.5 mEq/L",
      "KHÔNG phối hợp với Aliskiren ở bệnh nhân ĐTĐ hoặc suy thận"
    ]
  },

  {
    id: "atorvastatin",
    name: "Atorvastatin Calcium",
    brandNames: ["Lipitor", "Torvast", "Sortis"],
    drugClass: "Thuốc ức chế HMG-CoA reductase (Statin)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "X",
    blackBoxWarning: null,
    indications: [
      "Tăng cholesterol máu (Hypercholesterolemia) nguyên phát",
      "Phòng ngừa tim mạch thứ phát sau NMCT, đột quỵ (high-intensity statin)",
      "Phòng ngừa tim mạch nguyên phát ở bệnh nhân nguy cơ cao (ĐTĐ, THA + yếu tố nguy cơ)",
      "Tăng lipid máu hỗn hợp",
      "Bệnh tim gia đình (Familial hypercholesterolemia)"
    ],
    dosage: {
      standardAdult: "Khởi đầu 10–20 mg PO 1 lần/ngày (buổi tối). Nguy cơ cao: 40–80 mg/ngày (high-intensity)",
      maxDaily: "80 mg/ngày",
      pediatric: "10–17 tuổi (tăng lipid gia đình): 10–20 mg/ngày",
      renalNote: "Không cần chỉnh liều — chuyển hóa gan hoàn toàn. An toàn trong suy thận."
    },
    adverseEffects: [
      "Đau cơ (Myalgia) — phổ biến nhất (~5–10%)",
      "Bệnh cơ (Myopathy) và hiếm gặp tiêu cơ vân (Rhabdomyolysis)",
      "Tăng men gan (ALT, AST) — thường tự giới hạn",
      "Tăng đường huyết nhẹ (nguy cơ khởi phát ĐTĐ type 2 tăng 10–13%)",
      "Đau đầu, rối loạn tiêu hóa"
    ],
    contraindications: [
      "Phụ nữ có thai và cho con bú (phân loại X)",
      "Bệnh gan tiến triển hoặc tăng men gan dai dẳng không giải thích được",
      "Dùng đồng thời với một số thuốc ức chế CYP3A4 mạnh (Itraconazole, Clarithromycin — tăng nguy cơ tiêu cơ vân)"
    ]
  },

  {
    id: "furosemide",
    name: "Furosemide",
    brandNames: ["Lasix", "Frusemide", "Diuver"],
    drugClass: "Thuốc lợi tiểu quai (Loop diuretic)",
    category: "Tim mạch",
    routes: ["PO", "IV", "IM"],
    pregnancyCategory: "C",
    blackBoxWarning: "Furosemide là thuốc lợi tiểu mạnh. Liều quá cao có thể gây mất nước nghiêm trọng, rối loạn điện giải (hạ kali, natri, magie), và tụt huyết áp. Cần theo dõi điện giải và cân bằng dịch chặt chẽ.",
    indications: [
      "Phù trong suy tim sung huyết (CHF) — first-line giảm tải thể tích",
      "Phù do xơ gan và hội chứng thận hư",
      "Phù phổi cấp — IV khẩn cấp",
      "Tăng huyết áp khó kiểm soát (phối hợp)",
      "Tăng canxi máu (Hypercalcemia) cấp",
      "Suy thận cấp với tình trạng ứ dịch"
    ],
    dosage: {
      standardAdult: "PO: 20–80 mg 1–2 lần/ngày. IV: 20–40 mg tiêm chậm. Phù phổi cấp: 40–80 mg IV bolus",
      maxDaily: "600 mg/ngày (PO). IV liều cao: đến 1000 mg/ngày trong theo dõi sát",
      pediatric: "1–2 mg/kg PO/IV mỗi 6–12h (tối đa 6 mg/kg/ngày)",
      renalNote: "Có thể cần tăng liều trong suy thận (kháng thuốc lợi tiểu). CrCl < 30: cần liều cao hơn thường quy."
    },
    adverseEffects: [
      "Hạ kali máu (Hypokalemia) — phổ biến nhất, cần bổ sung Kali",
      "Hạ magie, natri máu",
      "Mất nước và hạ huyết áp tư thế",
      "Độc tai (ototoxicity): ù tai, giảm thính lực (khi liều cao IV nhanh)",
      "Tăng acid uric máu (gout)",
      "Tăng đường huyết, tăng lipid máu nhẹ"
    ],
    contraindications: [
      "Vô niệu (do nguyên nhân tắc nghẽn cơ học)",
      "Mất nước nặng / Hạ thể tích tuần hoàn",
      "Hạ kali / hạ natri máu nặng chưa được điều chỉnh",
      "Thận trọng khi phối hợp Aminoglycoside (cộng hưởng độc tai)"
    ]
  },

  {
    id: "warfarin",
    name: "Warfarin Sodium",
    brandNames: ["Coumadin", "Jantoven", "Sintrom"],
    drugClass: "Thuốc kháng đông đường uống nhóm Vitamin K Antagonist (VKA)",
    category: "Tim mạch",
    routes: ["PO"],
    pregnancyCategory: "X",
    blackBoxWarning: "Nguy cơ chảy máu nghiêm trọng và tử vong. Chảy máu có thể xảy ra ở bất kỳ cơ quan nào. BẮT BUỘC theo dõi INR thường xuyên và điều chỉnh liều chính xác. Nhiều thuốc và thức ăn tương tác làm thay đổi INR.",
    indications: [
      "Phòng ngừa và điều trị huyết khối tĩnh mạch sâu (DVT) và thuyên tắc phổi (PE)",
      "Phòng ngừa đột quỵ trong rung nhĩ không do bệnh van tim",
      "Dự phòng thuyên tắc huyết khối sau thay van tim cơ học",
      "Hội chứng kháng Phospholipid (APS)",
      "Dự phòng nhồi máu cơ tim tái phát ở bệnh nhân nguy cơ cao"
    ],
    dosage: {
      standardAdult: "2–10 mg PO 1 lần/ngày (buổi tối). Liều dựa vào INR mục tiêu (thường 2–3). KHÔNG tự ý điều chỉnh",
      maxDaily: "Tùy INR mục tiêu — không có liều tối đa cố định",
      pediatric: "0.05–0.34 mg/kg/ngày tùy INR. Rất phức tạp, cần chuyên gia",
      renalNote: "Không cần chỉnh liều, nhưng suy thận tăng nguy cơ chảy máu — theo dõi INR sát hơn."
    },
    adverseEffects: [
      "Chảy máu (mọi mức độ): từ bầm tím nhẹ đến xuất huyết nội tạng đe dọa tính mạng",
      "Hoại tử da (Skin necrosis) — hiếm, xảy ra sớm trong điều trị",
      "Hội chứng ngón chân tím (Purple toe syndrome)",
      "Rụng tóc tạm thời",
      "Tương tác thuốc và thức ăn rất nhiều (vitamin K, alcohol, hàng trăm thuốc)"
    ],
    contraindications: [
      "Phụ nữ có thai — gây dị dạng thai (Phân loại X)",
      "Chảy máu nội tạng đang diễn ra",
      "Giảm tiểu cầu do Heparin (HIT) — không áp dụng",
      "Phẫu thuật hoặc thủ thuật xâm lấn ngay (cần bridging therapy)",
      "Bệnh nhân không thể theo dõi INR hoặc không tuân thủ điều trị"
    ]
  },

  {
    id: "digoxin",
    name: "Digoxin",
    brandNames: ["Lanoxin", "Digoxine Nativelle"],
    drugClass: "Glycoside tim (Cardiac Glycoside)",
    category: "Tim mạch",
    routes: ["PO", "IV"],
    pregnancyCategory: "C",
    blackBoxWarning: null,
    indications: [
      "Suy tim mạn tính (HFrEF) — giảm nhập viện, cải thiện triệu chứng (không giảm tử vong)",
      "Kiểm soát tần số thất trong rung nhĩ mạn tính",
      "Điều trị và dự phòng tái phát một số rối loạn nhịp nhanh trên thất"
    ],
    dosage: {
      standardAdult: "Duy trì: 0.125–0.25 mg PO 1 lần/ngày. IV: 0.25–0.5 mg (liều nạp), sau đó 0.125–0.25 mg mỗi 6–8h trong 24h đầu",
      maxDaily: "0.5 mg/ngày",
      pediatric: "Liều rất phức tạp, tùy tuổi và cân nặng — tham khảo chuyên khoa",
      renalNote: "QUAN TRỌNG: Digoxin thải qua thận. CrCl < 50: giảm liều 50%. Cần theo dõi nồng độ máu (0.5–0.9 ng/mL)."
    },
    adverseEffects: [
      "Độc tính Digoxin (Digoxin toxicity): buồn nôn, nôn, nhìn màu vàng-xanh, rối loạn nhịp tim",
      "Chậm nhịp tim, Block AV",
      "Rối loạn nhịp nguy hiểm (khi ngộ độc): VT, VF",
      "Giảm thị giác, nhìn đôi",
      "Gynecomastia (vú to ở nam giới) khi dùng dài hạn"
    ],
    contraindications: [
      "Block AV độ II/III (không có máy tạo nhịp)",
      "Hội chứng WPW kèm rung nhĩ (nguy cơ dẫn truyền phụ nhanh)",
      "Hạ kali máu chưa điều chỉnh (tăng độc tính Digoxin)",
      "Ngộ độc Digoxin đang xảy ra",
      "Thận trọng khi phối hợp Verapamil / Amiodarone (tăng nồng độ Digoxin)"
    ]
  },

  /* ══════════════════════════════════════════════
     NHÓM: GIẢM ĐAU / KHÁNG VIÊM
  ══════════════════════════════════════════════ */

  {
    id: "paracetamol",
    name: "Paracetamol (Acetaminophen)",
    brandNames: ["Panadol", "Efferalgan", "Tylenol", "Hapacol"],
    drugClass: "Giảm đau – Hạ sốt (Non-opioid Analgesic/Antipyretic)",
    category: "Giảm đau",
    routes: ["PO", "IV", "PR"],
    pregnancyCategory: "B",
    blackBoxWarning: "Nguy cơ ngộ độc gan nghiêm trọng (Hepatotoxicity) khi tổng liều vượt quá 4 g/ngày, hoặc khi dùng đồng thời nhiều chế phẩm chứa Paracetamol, hoặc ở người nghiện rượu.",
    indications: [
      "Hạ sốt (mọi lứa tuổi, kể cả trẻ em và phụ nữ mang thai)",
      "Giảm đau nhẹ đến trung bình: đau đầu, đau răng, đau cơ, đau khớp",
      "Giảm đau sau phẫu thuật (phối hợp multimodal analgesia)",
      "Đau lưng cấp và mạn tính"
    ],
    dosage: {
      standardAdult: "500–1000 mg PO/IV mỗi 4–6h khi cần",
      maxDaily: "4000 mg/ngày (người khỏe mạnh); 2000–3000 mg/ngày (nghiện rượu, bệnh gan, cao tuổi)",
      pediatric: "10–15 mg/kg PO/PR mỗi 4–6h (tối đa 5 lần/ngày)",
      renalNote: "CrCl 10–50 mL/min: mỗi 6h. CrCl < 10 mL/min: mỗi 8h."
    },
    adverseEffects: [
      "Tăng men gan nhẹ thoáng qua (liều điều trị kéo dài)",
      "Phát ban da, mày đay (hiếm)",
      "Hội chứng Stevens-Johnson (cực kỳ hiếm)",
      "Hoại tử gan cấp khi quá liều (nguyên nhân hàng đầu gây suy gan cấp)"
    ],
    contraindications: [
      "Suy gan nặng hoặc bệnh gan tiến triển",
      "Quá mẫn với Paracetamol",
      "Thận trọng khi phối hợp Warfarin kéo dài (tăng INR)"
    ]
  },

  {
    id: "ibuprofen",
    name: "Ibuprofen",
    brandNames: ["Advil", "Nurofen", "Brufen", "Ibugesic"],
    drugClass: "Thuốc kháng viêm không steroid (NSAID) — Ức chế COX-1 & COX-2",
    category: "Giảm đau",
    routes: ["PO", "IV", "Tại chỗ"],
    pregnancyCategory: "C",
    blackBoxWarning: "Nguy cơ biến cố tim mạch nghiêm trọng (nhồi máu cơ tim, đột quỵ) và xuất huyết tiêu hóa đe dọa tính mạng. Nguy cơ tăng khi dùng liều cao, kéo dài, hoặc bệnh nhân có bệnh tim mạch. CHỐNG CHỈ ĐỊNH sau phẫu thuật bắc cầu mạch vành (CABG).",
    indications: [
      "Giảm đau và hạ sốt nhẹ–trung bình",
      "Viêm khớp dạng thấp và thoái hóa khớp (triệu chứng)",
      "Đau thống kinh nguyên phát (Dysmenorrhea) — first-line",
      "Đau đầu, đau sau chấn thương cơ xương",
      "Đau sau nhổ răng, đau cơ"
    ],
    dosage: {
      standardAdult: "200–800 mg PO mỗi 6–8h (uống kèm thức ăn hoặc sữa)",
      maxDaily: "3200 mg/ngày (kê đơn). OTC: tối đa 1200 mg/ngày",
      pediatric: "5–10 mg/kg PO mỗi 6–8h (tối đa 40 mg/kg/ngày)",
      renalNote: "Tránh dùng khi CrCl < 30 mL/min. NSAID gây co mạch thận → suy thận cấp."
    },
    adverseEffects: [
      "Loét dạ dày và xuất huyết tiêu hóa (nguy cơ tăng với liều cao, tuổi cao, tiền sử loét)",
      "Suy thận cấp (đặc biệt ở bệnh nhân có nguy cơ: suy tim, xơ gan, mất nước)",
      "Biến cố tim mạch: tăng nguy cơ NMCT và đột quỵ",
      "Tăng huyết áp, giữ muối–nước, phù",
      "Phản ứng dị ứng: phát ban, hen (NSAID-exacerbated respiratory disease)",
      "Ức chế kết tập tiểu cầu (tạm thời, hồi phục)"
    ],
    contraindications: [
      "Phẫu thuật bắc cầu mạch vành (CABG) — perioperative",
      "Bệnh nhân loét dạ dày đang hoạt động hoặc xuất huyết tiêu hóa",
      "Suy thận nặng (CrCl < 30 mL/min)",
      "Suy tim mất bù",
      "Tam cá nguyệt 3 của thai kỳ (đóng sớm ống động mạch)",
      "Tiền sử phản ứng nặng với Aspirin hoặc NSAID"
    ]
  },

  {
    id: "morphine",
    name: "Morphine Sulfate",
    brandNames: ["MSContin", "Sevredol", "Morphinе"],
    drugClass: "Opioid giảm đau mạnh (Strong Opioid Analgesic) — Agonist receptor μ",
    category: "Giảm đau",
    routes: ["PO", "IV", "IM", "SC"],
    pregnancyCategory: "C",
    blackBoxWarning: "Nguy cơ suy hô hấp đe dọa tính mạng, phụ thuộc, lạm dụng và nghiện. Chỉ kê đơn khi cơn đau đủ nặng không đáp ứng với giảm đau không opioid. Theo dõi sát hô hấp sau khi dùng. Không phối hợp với benzodiazepine trừ khi thật sự cần thiết.",
    indications: [
      "Đau nặng cấp tính: sau chấn thương, sau phẫu thuật lớn",
      "Đau nặng mạn tính do ung thư (WHO Step 3)",
      "Đau ngực trong nhồi máu cơ tim cấp (giảm lo lắng và giảm tiêu thụ oxy cơ tim)",
      "Phù phổi cấp (giảm tiền tải và giảm lo lắng)",
      "Chăm sóc giảm nhẹ (Palliative care)"
    ],
    dosage: {
      standardAdult: "IV/IM: 2.5–5 mg mỗi 3–4h. PO (nhanh): 10–30 mg mỗi 4h. PO (chậm/SR): 15–60 mg mỗi 8–12h",
      maxDaily: "Không có liều tối đa tuyệt đối — dựa trên đáp ứng và tác dụng phụ",
      pediatric: "IV: 0.05–0.1 mg/kg mỗi 2–4h (theo dõi hô hấp sát). Nân sinh: tránh dùng",
      renalNote: "Tích lũy chất chuyển hóa hoạt tính (Morphine-6-glucuronide) trong suy thận → giảm liều và tăng khoảng cách liều. Xem xét chuyển sang Fentanyl."
    },
    adverseEffects: [
      "Suy hô hấp (nguy hiểm nhất, đặc biệt ở người cao tuổi và liều đầu)",
      "Buồn nôn, nôn (thường gặp khi bắt đầu dùng)",
      "Táo bón (gần như toàn bộ bệnh nhân — cần dự phòng ngay)",
      "An thần, ngủ gà",
      "Hạ huyết áp, nhịp tim chậm",
      "Co đồng tử (Miosis)",
      "Ngứa (do giải phóng Histamine — khi IV)",
      "Lệ thuộc thể chất và tâm lý"
    ],
    contraindications: [
      "Suy hô hấp cấp (không có hỗ trợ thở)",
      "Hen phế quản cấp",
      "Liệt hồi tràng (Paralytic ileus)",
      "Nghi ngờ bụng ngoại khoa cấp (che lấp triệu chứng)",
      "Phối hợp với MAOI (nguy cơ hội chứng Serotonin)"
    ]
  },

  {
    id: "prednisolone",
    name: "Prednisolone",
    brandNames: ["Medrol (Methylprednisolone)", "Solone", "Delta-Cortef"],
    drugClass: "Corticosteroid toàn thân (Glucocorticoid)",
    category: "Giảm đau",
    routes: ["PO", "IV", "IM"],
    pregnancyCategory: "C",
    blackBoxWarning: null,
    indications: [
      "Đợt cấp hen phế quản và COPD",
      "Bệnh lý dị ứng nặng và phản ứng phản vệ (phối hợp Epinephrine)",
      "Viêm khớp dạng thấp và các bệnh tự miễn (SLE, viêm mạch)",
      "Bệnh viêm ruột (Crohn, viêm loét đại tràng) đợt cấp",
      "Hội chứng thận hư đáp ứng steroid",
      "Chống thải ghép tạng",
      "Viêm não và phù não do u"
    ],
    dosage: {
      standardAdult: "Dải liều rộng: 5–60 mg/ngày PO. Hen cấp: 40–60 mg PO 1 lần/ngày x 5–7 ngày. Methylprednisolone IV: 1–2 mg/kg/ngày (đợt cấp nặng)",
      maxDaily: "Tùy chỉ định — không có liều cố định",
      pediatric: "1–2 mg/kg/ngày PO (tối đa 40–60 mg/ngày tùy chỉ định)",
      renalNote: "Không cần chỉnh liều. Thận trọng do giữ muối nước và tăng tải thể tích."
    },
    adverseEffects: [
      "Tăng đường huyết (đặc biệt ở bệnh nhân ĐTĐ)",
      "Loãng xương khi dùng dài hạn (cần bổ sung Canxi + Vitamin D)",
      "Hội chứng Cushing (khi dùng kéo dài): mặt tròn, béo phì trung tâm, rạn da",
      "Ức chế miễn dịch → nguy cơ nhiễm khuẩn cơ hội",
      "Loét dạ dày (khi phối hợp NSAID)",
      "Tăng huyết áp, phù, giữ muối nước",
      "Suy thượng thận nếu ngừng thuốc đột ngột sau dùng kéo dài"
    ],
    contraindications: [
      "Nhiễm nấm toàn thân đang điều trị",
      "Nhiễm virus herpes nặng (Varicella, HSV) chưa điều trị",
      "Vắc-xin sống (trong thời gian dùng corticoid liều cao)",
      "KHÔNG ngừng đột ngột khi dùng > 2 tuần (nguy cơ suy thượng thận)"
    ]
  },

  /* ══════════════════════════════════════════════
     NHÓM: NỘI TIẾT / CHUYỂN HÓA / TIÊU HÓA
  ══════════════════════════════════════════════ */

  {
    id: "metformin",
    name: "Metformin Hydrochloride",
    brandNames: ["Glucophage", "Glumetza", "Fortamet", "Diafat"],
    drugClass: "Thuốc hạ đường huyết nhóm Biguanide",
    category: "Nội tiết",
    routes: ["PO"],
    pregnancyCategory: "B",
    blackBoxWarning: "Nguy cơ nhiễm toan lactic (Lactic acidosis) — hiếm nhưng có thể tử vong. Nguy cơ tăng khi: suy thận (eGFR < 30), suy gan, suy tim, đói, dùng thuốc cản quang (tạm dừng 48h trước–sau).",
    indications: [
      "Đái tháo đường type 2 — first-line theo mọi hướng dẫn quốc tế",
      "Hội chứng buồng trứng đa nang (PCOS) — off-label, cải thiện kháng insulin",
      "Dự phòng ĐTĐ type 2 ở người tiền ĐTĐ nguy cơ cao",
      "Đái tháo đường thai kỳ (GDM) khi không dùng Insulin được"
    ],
    dosage: {
      standardAdult: "Khởi đầu 500 mg PO 2 lần/ngày (bữa sáng và tối). Tăng dần mỗi 1–2 tuần. Dạng phóng thích kéo dài (XR): 500–2000 mg 1 lần/ngày",
      maxDaily: "2550 mg/ngày (thường dùng 2000 mg/ngày)",
      pediatric: "≥ 10 tuổi: 500–850 mg PO 2 lần/ngày (tối đa 2000 mg/ngày)",
      renalNote: "eGFR 30–45: cân nhắc giảm liều, không khởi đầu mới. eGFR < 30: CHỐNG CHỈ ĐỊNH. eGFR < 45: tránh dùng nếu có thể."
    },
    adverseEffects: [
      "Rối loạn tiêu hóa (buồn nôn, đau bụng, tiêu chảy) — phổ biến khi bắt đầu, giảm dần",
      "Giảm hấp thu Vitamin B12 khi dùng dài hạn (kiểm tra định kỳ)",
      "Nhiễm toan lactic (rất hiếm, < 0.03 ca/1000 bệnh nhân-năm)",
      "Vị kim loại trong miệng",
      "KHÔNG gây hạ đường huyết khi dùng đơn độc"
    ],
    contraindications: [
      "eGFR < 30 mL/min/1.73m² (suy thận nặng)",
      "Suy gan nặng",
      "Nhiễm toan lactic tiền sử",
      "Tạm dừng 48h trước và sau thủ thuật có thuốc cản quang iodine",
      "Tình trạng thiếu oxy mô: suy hô hấp, suy tim mất bù, sốc"
    ]
  },

  {
    id: "levothyroxine",
    name: "Levothyroxine Sodium (L-T4)",
    brandNames: ["Synthroid", "Euthyrox", "Eltroxin"],
    drugClass: "Hormone tuyến giáp tổng hợp (Synthetic Thyroid Hormone — T4)",
    category: "Nội tiết",
    routes: ["PO", "IV"],
    pregnancyCategory: "A",
    blackBoxWarning: "Không sử dụng Levothyroxine để điều trị béo phì hoặc giảm cân. Liều cao gây biến chứng tim mạch nặng, kể cả tử vong ở bệnh nhân có bệnh tim.",
    indications: [
      "Suy giáp (Hypothyroidism) nguyên phát và thứ phát — liệu pháp thay thế hormone",
      "Sau phẫu thuật cắt toàn bộ tuyến giáp (thyroidectomy)",
      "Sau điều trị Iodine phóng xạ (I-131)",
      "Suy giáp bẩm sinh (cần điều trị sớm để phòng ngừa thiểu năng trí tuệ)",
      "Ức chế TSH trong ung thư tuyến giáp biệt hóa (liều cao hơn bình thường)"
    ],
    dosage: {
      standardAdult: "Suy giáp: 1.6 mcg/kg/ngày PO 1 lần (uống lúc đói, 30–60 phút trước bữa sáng). Cao tuổi/bệnh tim: khởi đầu 25–50 mcg/ngày, tăng chậm",
      maxDaily: "Tùy TSH mục tiêu — thường 100–200 mcg/ngày",
      pediatric: "Sơ sinh: 10–15 mcg/kg/ngày. Theo tuổi — điều chỉnh theo TSH và FT4",
      renalNote: "Không cần chỉnh liều. Theo dõi TSH là chính."
    },
    adverseEffects: [
      "Nhịp tim nhanh, đánh trống ngực (khi liều quá cao)",
      "Run tay, lo lắng, khó ngủ",
      "Sút cân không mong muốn",
      "Tăng tiết mồ hôi, không chịu nóng",
      "Mất xương (Osteoporosis) khi TSH bị ức chế quá mức kéo dài",
      "Cơn đau thắt ngực hoặc loạn nhịp ở bệnh nhân có bệnh tim (khi tăng liều quá nhanh)"
    ],
    contraindications: [
      "Cường giáp chưa điều trị (Untreated thyrotoxicosis)",
      "Nhồi máu cơ tim cấp (chống chỉ định tương đối — tham khảo chuyên gia)",
      "Tránh uống cùng Antacid, Calcium, Iron, Cholestyramine (giảm hấp thu đáng kể — cách ít nhất 4h)"
    ]
  },

  {
    id: "omeprazole",
    name: "Omeprazole",
    brandNames: ["Prilosec", "Losec", "Lomac", "Omez"],
    drugClass: "Thuốc ức chế bơm proton (Proton Pump Inhibitor — PPI)",
    category: "Tiêu hóa",
    routes: ["PO", "IV"],
    pregnancyCategory: "C",
    blackBoxWarning: null,
    indications: [
      "Loét dạ dày – tá tràng (H. pylori và không do H. pylori)",
      "Bệnh trào ngược dạ dày – thực quản (GERD)",
      "Hội chứng Zollinger-Ellison (liều cao)",
      "Dự phòng loét do NSAID ở bệnh nhân nguy cơ cao",
      "Phối hợp phác đồ diệt H. pylori (3 hoặc 4 thuốc)",
      "Chảy máu tiêu hóa trên cấp (IV liều cao)"
    ],
    dosage: {
      standardAdult: "20–40 mg PO 1 lần/ngày (30 phút trước bữa ăn sáng). GERD: 20 mg/ngày. Loét: 20–40 mg/ngày. IV chảy máu: 80 mg bolus + 8 mg/h truyền liên tục 72h",
      maxDaily: "120 mg/ngày (Zollinger-Ellison)",
      pediatric: "1–16 tuổi: 0.5–1 mg/kg/ngày (tối đa 20–40 mg/ngày)",
      renalNote: "Không cần chỉnh liều. Chuyển hóa hoàn toàn qua gan."
    },
    adverseEffects: [
      "Đau đầu, tiêu chảy, táo bón, buồn nôn (thường nhẹ)",
      "Hạ magie máu (Hypomagnesemia) khi dùng > 1 năm",
      "Giảm hấp thu Canxi, B12, Sắt khi dùng kéo dài",
      "Tăng nguy cơ viêm phổi và nhiễm C. difficile (tranh cãi)",
      "Suy thận cấp do viêm ống thận kẽ (Acute interstitial nephritis — hiếm)",
      "Gãy xương hông, cột sống (khi dùng > 1 năm liều cao)"
    ],
    contraindications: [
      "Phối hợp với Clopidogrel (giảm hiệu quả chống kết tập tiểu cầu — dùng Pantoprazole thay thế)",
      "Quá mẫn với Benzimidazole",
      "Không nên dùng kéo dài không kiểm soát mà không có chỉ định rõ ràng"
    ]
  },

  /* ══════════════════════════════════════════════
     NHÓM: THẦN KINH / CẤP CỨU
  ══════════════════════════════════════════════ */

  {
    id: "diazepam",
    name: "Diazepam",
    brandNames: ["Valium", "Seduxen", "Stesolid"],
    drugClass: "Benzodiazepin (Benzodiazepine) — Agonist GABA-A",
    category: "Thần kinh",
    routes: ["PO", "IV", "IM", "PR"],
    pregnancyCategory: "D",
    blackBoxWarning: "Phối hợp với opioid hoặc các thuốc ức chế TKTƯ khác có thể gây suy hô hấp sâu, hôn mê và tử vong. Dùng dài hạn gây lệ thuộc thể chất và tâm lý. Ngừng đột ngột có thể gây hội chứng cai nghiêm trọng (co giật, ảo giác).",
    indications: [
      "Cơn động kinh cấp và trạng thái động kinh liên tục (Status epilepticus) — IV",
      "An thần trước thủ thuật (Procedural sedation)",
      "Lo âu cấp và rối loạn lo âu (ngắn hạn)",
      "Co cứng cơ do chấn thương, uốn ván (tetanus)",
      "Hội chứng cai rượu (Alcohol withdrawal syndrome)",
      "Tiền mê trước gây mê toàn thân"
    ],
    dosage: {
      standardAdult: "Lo âu: 2–10 mg PO 2–4 lần/ngày. Động kinh cấp: 5–10 mg IV, lặp lại sau 10–15 phút nếu cần. Cai rượu: 10 mg mỗi 6–8h đầu, giảm dần",
      maxDaily: "40 mg/ngày (PO). IV: không vượt 5 mg/phút",
      pediatric: "Động kinh: 0.2–0.5 mg/kg IV (tối đa 10 mg). PR: 0.5 mg/kg. Lặp lại sau 5–10 phút nếu cần",
      renalNote: "Không cần chỉnh liều chính thức. Thận trọng ở suy gan (chuyển hóa chậm, tích lũy)."
    },
    adverseEffects: [
      "An thần, ngủ gà quá mức",
      "Suy hô hấp (nguy cơ cao khi IV nhanh hoặc phối hợp opioid)",
      "Mất điều phối (Ataxia), lú lẫn",
      "Lệ thuộc thuốc và hội chứng cai khi ngừng đột ngột",
      "Nghịch lý kích thích (paradoxical excitement) ở trẻ em và cao tuổi",
      "Phlebitis và đau tại chỗ tiêm (do dung môi propylene glycol)"
    ],
    contraindications: [
      "Suy hô hấp nặng không có hỗ trợ thở",
      "Suy gan nặng",
      "Glaucoma góc đóng cấp tính",
      "Phụ nữ có thai (tam cá nguyệt 1) và cho con bú",
      "Không phối hợp với opioid trừ khi cần thiết và có phương tiện hồi sức"
    ]
  },

  {
    id: "phenytoin",
    name: "Phenytoin / Fosphenytoin",
    brandNames: ["Dilantin", "Cerebyx (Fosphenytoin)", "Epanutin"],
    drugClass: "Thuốc chống động kinh nhóm Hydantoin — Ức chế kênh Na⁺",
    category: "Thần kinh",
    routes: ["PO", "IV"],
    pregnancyCategory: "D",
    blackBoxWarning: "Tốc độ truyền IV không vượt 50 mg/phút (Phenytoin) hoặc 150 mg PE/phút (Fosphenytoin). Truyền quá nhanh gây hạ huyết áp, loạn nhịp, ngừng tim. Phải theo dõi EKG và huyết áp liên tục trong khi truyền.",
    indications: [
      "Điều trị và dự phòng động kinh cục bộ và toàn thể (không phải cơn vắng ý thức)",
      "Trạng thái động kinh liên tục (Status epilepticus) — IV khi Benzodiazepine thất bại",
      "Dự phòng động kinh sau phẫu thuật thần kinh",
      "Đau dây thần kinh sinh ba (Trigeminal neuralgia — off-label)"
    ],
    dosage: {
      standardAdult: "PO duy trì: 4–6 mg/kg/ngày, chia 1–3 lần. IV (nạp): 15–20 mg/kg, tốc độ ≤ 50 mg/phút (Phenytoin) hoặc ≤ 150 mg PE/phút (Fosphenytoin)",
      maxDaily: "600 mg/ngày",
      pediatric: "PO: 4–8 mg/kg/ngày chia 2 lần. IV: 15–20 mg/kg liều nạp",
      renalNote: "Protein binding giảm trong suy thận → nồng độ tự do tăng mặc dù tổng nồng độ bình thường. Dùng Free Phenytoin để theo dõi."
    },
    adverseEffects: [
      "Rung giật nhãn cầu (Nystagmus) — thường thấy nhất khi quá liều",
      "Mất điều phối (Ataxia), chóng mặt",
      "Phình to lợi (Gingival hyperplasia) khi dùng dài hạn",
      "Phát ban da (Drug Rash) — 5–10%, có thể tiến triển thành SJS/TEN",
      "Độc gan (Hepatotoxicity)",
      "Loãng xương khi dùng dài hạn (giảm Vitamin D)",
      "Hạ huyết áp và loạn nhịp (khi IV quá nhanh)"
    ],
    contraindications: [
      "Block xoang nhĩ, Block AV độ II/III",
      "Bradycardia xoang nặng",
      "KHÔNG pha Phenytoin trong dung dịch Dextrose (kết tủa)",
      "Phụ nữ có thai (phân loại D — gây dị dạng hở hàm ếch, tim bẩm sinh)"
    ]
  },

  {
    id: "ondansetron",
    name: "Ondansetron",
    brandNames: ["Zofran", "Emeset", "Zantron"],
    drugClass: "Thuốc chống nôn nhóm Đối kháng Serotonin 5-HT₃",
    category: "Tiêu hóa",
    routes: ["PO", "IV", "IM"],
    pregnancyCategory: "B",
    blackBoxWarning: null,
    indications: [
      "Phòng ngừa và điều trị buồn nôn – nôn do hóa trị liệu (Chemotherapy-induced nausea/vomiting — CINV)",
      "Phòng ngừa buồn nôn – nôn sau phẫu thuật (Post-operative nausea/vomiting — PONV)",
      "Buồn nôn – nôn sau xạ trị",
      "Nôn không kiểm soát trong thai kỳ (Hyperemesis gravidarum — off-label)"
    ],
    dosage: {
      standardAdult: "PO/IV: 4–8 mg trước khi hóa trị (30 phút). PONV: 4 mg IV/IM trước khi kết thúc gây mê. Lặp lại mỗi 8h nếu cần",
      maxDaily: "32 mg/ngày (IV). 24 mg/ngày (PO) — hạn chế IV cao liều do nguy cơ QT",
      pediatric: "≥ 4 tuổi: 0.1–0.15 mg/kg IV trước hóa trị. Tối đa 4 mg/liều",
      renalNote: "Không cần chỉnh liều trong suy thận."
    },
    adverseEffects: [
      "Đau đầu (phổ biến nhất)",
      "Táo bón",
      "Kéo dài khoảng QT (nguy cơ tăng ở liều cao IV > 32 mg)",
      "Tăng transaminase gan thoáng qua",
      "Hội chứng serotonin (khi phối hợp thuốc serotonergic — hiếm)",
      "Phản ứng dị ứng"
    ],
    contraindications: [
      "Tiền sử QTc kéo dài bẩm sinh (Congenital Long QT syndrome)",
      "Hạ kali / hạ magie máu chưa điều chỉnh",
      "Dùng đồng thời Apomorphine (hạ huyết áp nặng)",
      "IV > 32 mg/lần (tăng nguy cơ QT kéo dài và arrhythmia)"
    ]
  }

]; // end window.DRUGS_DB
