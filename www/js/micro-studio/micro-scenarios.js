/**
 * micro-scenarios.js — Microbiology Pro Studio
 * Ngân hàng ca lâm sàng & hình ảnh vi sinh cấp cứu chuẩn.
 */

const MICRO_SCENARIOS = [
  {
    id: "sc_mrsa_bacteremia",
    title: "Nhiễm Khuẩn Huyết Tụ Cầu Vàng Kháng Methicillin (MRSA)",
    category: "Gram dương",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 62 tuổi — Sốt cao rét run, rét run 39.5°C, có catheter tĩnh mạch trung tâm 7 ngày",
      hr: "128 bpm",
      bp: "90/60 mmHg (Tụt HA nhẹ)",
      spo2: "94% (Khí trời)",
      temp: "39.5 °C",
      rr: "26 lần/phút",
      gcs: "14 điểm",
      description: "Bệnh nhân sốt cao sau đặt CVC, vùng chân catheter sưng đỏ có mủ. Cấy máu báo dương tính sau 14 giờ.",
      specimen: "Máu & Mủ chân Catheter",
      symptoms: [
        "Nhuộm Gram: Cầu khuẩn Gram dương (Tím) xếp thành chùm hình chùm nho (Clusters)",
        "Nhiều bạch cầu đa nhân trung tính (PMN) trong vi trường",
        "Thạch máu: Tụ cầu màu vàng kim, tan máu β (Beta-hemolysis)",
        "Sinh hóa: Catalase (+), Coagulase (+)",
        "Kháng sinh đồ: Kháng Oxacillin/Cefoxitin (MRSA) → Nhạy Vancomycin & Linezolid"
      ]
    },
    micro: {
      gram: "gram_pos_cocci_clusters",
      morphology: "Cầu khuẩn Gram (+) xếp chùm",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "blood_agar_beta",
      catalase: "positive",
      coagulase: "positive",
      oxidase: "negative",
      lactose: "none",
      organismId: "S. aureus (MRSA)"
    }
  },
  {
    id: "sc_pneumococcal_pneumonia",
    title: "Viêm Phổi Cấu Khuẩn Phế Cầu (Streptococcus pneumoniae)",
    category: "Gram dương",
    difficulty: "Trung bình",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 58 tuổi — Đau ngực màng phổi, ho đàm rỉ sắt, sốt cao",
      hr: "112 bpm",
      bp: "115/70 mmHg",
      spo2: "90% (Khí trời)",
      temp: "39.1 °C",
      rr: "28 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân viêm phổi thùy dưới phải, đàm đặc màu rỉ sắt.",
      specimen: "Đàm đục",
      symptoms: [
        "Nhuộm Gram: Song cầu khuẩn Gram dương hình ngọn giáo (Lancet-shaped diplococci), có vỏ quầng sáng",
        "Nhiều PMN và tế bào phế quản",
        "Thạch máu: Tan máu α (Alpha-hemolysis - vòng màu xanh lục)",
        "Sinh hóa: Catalase (−), Nhạy Optochin (Optochin S), Nổ trong muối mật",
        "Lựa chọn KS: Ceftriaxone / Amoxicillin-Clavulanate"
      ]
    },
    micro: {
      gram: "gram_pos_diplococci_lancet",
      morphology: "Song cầu Gram (+) ngọn giáo",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "blood_agar_alpha",
      catalase: "negative",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "S. pneumoniae"
    }
  },
  {
    id: "sc_esbl_uti",
    title: "Nhiễm Khuẩn Tiết Niệu E. coli Tiết ESBL",
    category: "Gram âm",
    difficulty: "Nâng cao",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nữ, 68 tuổi — Sốt rết run, đau hông lưng phải, tiểu buốt rắt 4 ngày",
      hr: "105 bpm",
      bp: "110/65 mmHg",
      spo2: "96% (Khí trời)",
      temp: "38.8 °C",
      rr: "22 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân tiểu đục, rung thận (+). Soi tươi nước tiểu nhiều bạch cầu và trực khuẩn Gram âm.",
      specimen: "Nước tiểu giữa dòng",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram âm (Hồng/Đỏ) mảnh đứng rải rác",
        "Thạch MacConkey: Khuẩn lạc màu hồng đậm (Lactose fermenter +)",
        "Sinh hóa: Oxidase (−), Indole (+), Citrate (−)",
        "Kháng sinh đồ: Tiết ESBL (Kháng Cephalosporin thế hệ 3/4) → Nhạy Meropenem & Ertapenem"
      ]
    },
    micro: {
      gram: "gram_neg_rods",
      morphology: "Trực khuẩn Gram (−)",
      stainType: "gram",
      density: "moderate",
      pmn: "high",
      culturePlate: "macconkey_lactose_pos",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "positive",
      organismId: "E. coli (ESBL+)"
    }
  },
  {
    id: "sc_meningococcal_meningitis",
    title: "Viêm Màng Não Mủ Do Lậu Cầu / Não Mô Cầu (Neisseria meningitidis)",
    category: "Gram âm",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 19 tuổi — Sốt cao đột ngột, đau đầu dữ dội, cổ cứng, tử ban hình sao",
      hr: "135 bpm",
      bp: "85/50 mmHg (Tụt HA)",
      spo2: "92% (Khí trời)",
      temp: "40.0 °C",
      rr: "30 lần/phút",
      gcs: "12 điểm (Lơ mơ)",
      description: "Bệnh nhân sinh hoạt ký túc xá, xuất hiện tử ban hoại tử hình sao dưới da, dấu Kernig (+), Brudzinski (+).",
      specimen: "Dịch não tủy (DNT đục)",
      symptoms: [
        "Nhuộm Gram DNT: Song cầu khuẩn Gram âm hình hạt cà phê nằm NỘI BÀO bạch cầu PMN",
        "Thạch Chocolate: Mọc khuẩn lạc xám đục trong môi trường CO2 5%",
        "Sinh hóa: Oxidase (+), Maltose (+)",
        "Y lệnh khẩn cấp: Tiêm ngay Ceftriaxone 2g IV + Dexamethasone"
      ]
    },
    micro: {
      gram: "gram_neg_diplococci_intracellular",
      morphology: "Song cầu Gram (−) hạt cà phê nội bào",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "chocolate_agar",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "positive",
      lactose: "none",
      organismId: "N. meningitidis"
    }
  },
  {
    id: "sc_pseudomonas_burn_wound",
    title: "Nhiễm Khuẩn Vết Thương Bỏng Do Trực Khuẩn Mủ Xanh (P. aeruginosa)",
    category: "Gram âm",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 45 tuổi — Bỏng diện tích 30% thân mình, ngày thứ 6 dịch mủ xanh mùi ngọt nhẹ",
      hr: "118 bpm",
      bp: "105/65 mmHg",
      spo2: "95%",
      temp: "38.6 °C",
      rr: "24 lần/phút",
      gcs: "15 điểm",
      description: "Vết thương bỏng rỉ dịch mủ màu xanh lục nhạt, phát mùi thơm ngọt nhẹ đặc trưng của sắc tố Pyocyanin.",
      specimen: "Mủ vết thương",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram âm nhỏ mảnh rải rác",
        "Thạch MacConkey: Khuẩn lạc không màu (Lactose non-fermenter −), sắc tố xanh Pyocyanin",
        "Sinh hóa: Oxidase (+), Hiếu khí tuyệt đối",
        "Kháng sinh đồ: Kháng Ampicillin/Ceftriaxone → Nhạy Cefepime, Piperacillin/Tazobactam, Meropenem"
      ]
    },
    micro: {
      gram: "gram_neg_rods",
      morphology: "Trực khuẩn Gram (−) mủ xanh",
      stainType: "gram",
      density: "heavy",
      pmn: "moderate",
      culturePlate: "macconkey_lactose_neg_green",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "positive",
      lactose: "negative",
      organismId: "P. aeruginosa"
    }
  },
  {
    id: "sc_tb_acid_fast",
    title: "Lao Phổi Soi Đàm AFB (+)",
    category: "Vi khuẩn đặc biệt",
    difficulty: "Trung bình",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nam, 48 tuổi — Ho kéo dài > 3 tuần, ho máu nhẹ, sốt nhẹ về chiều, sụt 7kg",
      hr: "88 bpm",
      bp: "110/70 mmHg",
      spo2: "96%",
      temp: "37.6 °C",
      rr: "20 lần/phút",
      gcs: "15 điểm",
      description: "Phim X-quang hang lao đỉnh phổi phải. Tiêu bản nhuộm Ziehl-Neelsen soi kính hiển vi.",
      specimen: "Đàm sáng sớm",
      symptoms: [
        "Nhuộm Ziehl-Neelsen (AFB): Trực khuẩn kháng cồn kháng acid màu đỏ hồng nhạt bám trên nền xanh methylene",
        "Trực khuẩn mảnh, hơi cong, xếp đơn độc hoặc thành đám nhỏ",
        "Chỉ định: Xét nghiệm GeneXpert MTB/RIF phát hiện gen kháng Rifampicin"
      ]
    },
    micro: {
      gram: "afb_red_rods",
      morphology: "Trực khuẩn AFB kháng acid (Đỏ)",
      stainType: "ziehl_neelsen",
      density: "moderate",
      pmn: "low",
      culturePlate: "lowenstein_jensen",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "M. tuberculosis"
    }
  },
  {
    id: "sc_candida_fungemia",
    title: "Nhiễm Nấm Huyết Candida albicans",
    category: "Vi nấm",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nữ, 72 tuổi — Nằm ICU 14 ngày, nuôi dưỡng tĩnh mạch toàn phần (TPN), sốt không giảm sau 5 ngày kháng sinh phổ rộng",
      hr: "120 bpm",
      bp: "95/60 mmHg",
      spo2: "93%",
      temp: "38.9 °C",
      rr: "25 lần/phút",
      gcs: "13 điểm",
      description: "Cấy máu báo mọc nấm men. Soi tươi và nhuộm Gram ghi nhận nấm men nảy chồi.",
      specimen: "Máu ngoại vi",
      symptoms: [
        "Nhuộm Gram: Tế bào nấm men Gram dương lớn (Tím đậm), nảy chồi (Budding yeast cells) & sợi nấm giả (Pseudohyphae)",
        "Test Germ Tube (Ống mầm) (+): Mọc ống mầm trong huyết thanh người sau 3 giờ ở 37°C",
        "Điều trị: Fluconazole / Caspofungin / Amphotericin B"
      ]
    },
    micro: {
      gram: "yeast_budding",
      morphology: "Nấm men nảy chồi Gram (+)",
      stainType: "gram",
      density: "moderate",
      pmn: "moderate",
      culturePlate: "sabouraud_agar",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Candida albicans"
    }
  },
  {
    id: "sc_strep_pharyngitis",
    title: "Viêm Họng Mủ Do Liên Cầu Nhóm A (S. pyogenes)",
    category: "Gram dương",
    difficulty: "Trung bình",
    badgeColor: "#10b981",
    patient: {
      demographics: "Nữ, 14 tuổi — Sốt cao 38.8°C, đau họng dữ dội, nuốt đau, sưng hạch cổ",
      hr: "102 bpm",
      bp: "110/70 mmHg",
      spo2: "98%",
      temp: "38.8 °C",
      rr: "20 lần/phút",
      gcs: "15 điểm",
      description: "Khám họng thấy Amydal sưng to, phủ lớp bựa mủ màu trắng đục. Hạch góc hàm sưng đau.",
      specimen: "Phết họng",
      symptoms: [
        "Nhuộm Gram: Cầu khuẩn Gram dương (Tím) xếp thành chuỗi dài (Chains)",
        "Thạch máu: Tan máu β (Beta-hemolysis) tạo vòng trong suốt rộng xung quanh khuẩn lạc",
        "Sinh hóa: Catalase (−), Nhạy Bacitracin (A-disc +), Pyrrolidonyl Arylamidase (PYR +)",
        "Lựa chọn điều trị: Penicillin V / Amoxicillin 10 ngày (Phòng ngừa Thấp tim cấp)"
      ]
    },
    micro: {
      gram: "gram_pos_cocci_chains",
      morphology: "Cầu khuẩn Gram (+) xếp chuỗi",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "blood_agar_beta",
      catalase: "negative",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "S. pyogenes (Group A)"
    }
  },
  {
    id: "sc_gas_gangrene",
    title: "Hoại Thư Khí Do Trực Khuẩn Yếm Khí (Clostridium perfringens)",
    category: "Gram dương",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 35 tuổi — Tai nạn giao thông dập nát đùi phải, nhiễm trùng hoại tử sau 36h",
      hr: "135 bpm",
      bp: "82/50 mmHg (Sốc nhiễm trùng)",
      spo2: "91%",
      temp: "39.4 °C",
      rr: "32 lần/phút",
      gcs: "13 điểm",
      description: "Vết thương đùi sưng nát, rỉ dịch thối hôi bẩn, sờ có dấu lép bép khí dưới da (crepitus).",
      specimen: "Dịch mủ hoại tử vết thương",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram dương lớn, hình hộp vuông, có bào tử hình oval (Spore-forming)",
        "Thạch máu kỵ khí: Vòng tan máu kép đặc trưng (Double-zone beta hemolysis)",
        "Sinh hóa: Kỵ khí tuyệt đối, Catalase (−), Lecithinase (+)",
        "Xử trí khẩn cấp: Phẫu thuật cắt lọc mô hoại tử rộng + Penicillin G liều cao + Clindamycin"
      ]
    },
    micro: {
      gram: "gram_pos_spore_rods",
      morphology: "Trực khuẩn Gram (+) bào tử kỵ khí",
      stainType: "gram",
      density: "heavy",
      pmn: "moderate",
      culturePlate: "blood_agar_beta",
      catalase: "negative",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Clostridium perfringens"
    }
  },
  {
    id: "sc_klebsiella_pneumonia",
    title: "Viêm Phổi Nhầy Do Klebsiella pneumoniae (Friedländer)",
    category: "Gram âm",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 65 tuổi — Nghiện rượu mạn tính, sốt cao rét run, ho đàm dính máu như mứt dâu",
      hr: "122 bpm",
      bp: "100/60 mmHg",
      spo2: "88% (Khí trời)",
      temp: "39.3 °C",
      rr: "30 lần/phút",
      gcs: "14 điểm",
      description: "Bệnh nhân ho khạc đàm rất dính đốm máu đục (Current-jelly sputum). Phim X-quang đông đặc thùy trên phổi phải ép xẹp rãnh liên thùy.",
      specimen: "Đàm",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram âm ngắn, vỏ bao capsule dày nhầy",
        "Thạch MacConkey: Khuẩn lạc màu hồng dạng nhầy dẻo kéo thành sợi (Mucoid Lac+ String test (+))",
        "Sinh hóa: Oxidase (−), Indole (−), Citrate (+), Urease (+)",
        "Điều trị: Ceftriaxone / Cefepime / Meropenem"
      ]
    },
    micro: {
      gram: "gram_neg_rods",
      morphology: "Trực khuẩn Gram (−) vỏ nhầy",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "macconkey_lactose_pos",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "positive",
      organismId: "K. pneumoniae (Mucoid)"
    }
  },
  {
    id: "sc_cholera_diarrhea",
    title: "Bệnh Tả Cấp Tính (Vibrio cholerae)",
    category: "Gram âm",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 40 tuổi — Đi lỏng ồ ạt > 20 lần/ngày dạng nước vo gạo, nôn mửa, mất nước nặng",
      hr: "140 bpm (Mạch nhanh nhỏ)",
      bp: "70/40 mmHg (Sốc mất nước)",
      spo2: "95%",
      temp: "36.2 °C (Hạ nhiệt độ)",
      rr: "28 lần/phút",
      gcs: "13 điểm",
      description: "Bệnh nhân nôn và tiêu chảy liên tục nước vo gạo mùi tanh nhẹ, da nhăn nheo (Bàn tay người giặt vải), mắt trũng sâu.",
      specimen: "Phân nước vo gạo",
      symptoms: [
        "Soi tươi / Nhuộm Gram: Phẩy khuẩn Gram âm (Curved comma-shaped rods) di động bắn tên cực nhanh",
        "Thạch TCBS (Thạch mật-muối-sucrose): Mọc khuẩn lạc màu vàng chanh (Sucrose +)",
        "Sinh hóa: Oxidase (+), String test (+)",
        "Xử trí tối khẩn: Truyền dịch Ringer Lactate bù thể tích tốc độ nhanh + Doxycycline 300mg 1 liều"
      ]
    },
    micro: {
      gram: "gram_neg_vibrio_comma",
      morphology: "Phẩy khuẩn Gram (−) dấu phẩy",
      stainType: "gram",
      density: "heavy",
      pmn: "low",
      culturePlate: "macconkey_lactose_neg_green",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "positive",
      lactose: "none",
      organismId: "Vibrio cholerae"
    }
  },
  {
    id: "sc_cryptococcal_meningitis",
    title: "Viêm Màng Não Nấm Cryptococcus ở Bệnh Nhân HIV/AIDS",
    category: "Vi nấm",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 32 tuổi — Tiền sử HIV CD4 45 tế bào/µL, đau đầu âm ỉ tăng dần 3 tuần, sợ ánh sáng",
      hr: "95 bpm",
      bp: "115/75 mmHg",
      spo2: "97%",
      temp: "37.9 °C",
      rr: "20 lần/phút",
      gcs: "14 điểm",
      description: "Bệnh nhân đau đầu dữ dội, mờ mắt, áp lực mở DNT tăng cao > 300 mmH2O.",
      specimen: "Dịch não tủy (DNT trong)",
      symptoms: [
        "Soi nhuộm Mực Tàu (India Ink): Tế bào nấm men tròn nảy chồi với quầng sáng bao Polysaccharide rộng nổi bật trên nền đen",
        "Test Latex Ag Cryptococcus DNT (+)",
        "Thạch Sabouraud: Mọc khuẩn lạc nấm men màu kem mịn",
        "Phác đồ điều trị: Amphotericin B + Flucytosine 2 tuần, sau đó duy trì Fluconazole 400mg"
      ]
    },
    micro: {
      gram: "india_ink_cryptococcus",
      morphology: "Nấm men vỏ quầng sáng (India Ink)",
      stainType: "india_ink",
      density: "moderate",
      pmn: "low",
      culturePlate: "sabouraud_agar",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Cryptococcus neoformans"
    }
  },
  {
    id: "sc_listeria_meningitis",
    title: "Viêm Màng Não Trẻ Sơ Sinh / Phụ Nữ Mang Thai (Listeria monocytogenes)",
    category: "Gram dương",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nữ, 28 tuổi (Mang thai tuần 32) — Sốt giả cúm, đau đầu, cổ cứng, gồng giật nhẹ",
      hr: "115 bpm",
      bp: "110/70 mmHg",
      spo2: "96%",
      temp: "38.9 °C",
      rr: "24 lần/phút",
      gcs: "14 điểm",
      description: "Bệnh nhân ăn phô mai tươi không tiệt trùng 5 ngày trước. DNT đục nhẹ, bạch cầu tăng.",
      specimen: "Dịch脑tủy & Máu",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram dương nhỏ ngắn (Coccobacilli) rải rác",
        "Kỹ thuật soi tươi: Di động kiểu nhào lộn (Tumbling motility) ở 25°C",
        "Sinh hóa: Catalase (+), Tan máu β nhẹ, CAMP test (+)",
        "Lưu ý điều trị: Dùng Ampicillin + Gentamicin (Cephalosporin hoàn toàn KHÔNG TÁC DỤNG với Listeria)"
      ]
    },
    micro: {
      gram: "gram_pos_spore_rods",
      morphology: "Trực khuẩn Gram (+) nhỏ ngắn",
      stainType: "gram",
      density: "moderate",
      pmn: "high",
      culturePlate: "blood_agar_beta",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Listeria monocytogenes"
    }
  },
  {
    id: "sc_haemophilus_meningitis",
    title: "Viêm Màng Não Mủ Trẻ Em Do Haemophilus influenzae (Hib)",
    category: "Gram âm",
    difficulty: "Nâng cao",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Bé trai, 2 tuổi — Chưa tiêm ngừa vắc-xin Hib, sốt cao 39.8°C, bỏ bú, thóp phồng",
      hr: "155 bpm",
      bp: "88/50 mmHg",
      spo2: "94%",
      temp: "39.8 °C",
      rr: "38 lần/phút",
      gcs: "12 điểm (Lơ mơ)",
      description: "Bé quấy khóc dữ dội, thóp trước phồng căng, cổ cứng. DNT đục như nước vôi.",
      specimen: "Dịch não tủy",
      symptoms: [
        "Nhuộm Gram DNT: Cầu trực khuẩn Gram âm rất nhỏ (Small Gram-negative coccobacilli) đa hình thái",
        "Thạch Chocolate: Mọc khuẩn lạc xám mịn trong CO2 5%; Hiện tượng vệ tinh (Satellite phenomenon) quanh S. aureus trên thạch máu",
        "Sinh hóa: Yêu cầu yếu tố X (Hemin) & V (NAD)",
        "Điều trị: Ceftriaxone 100mg/kg/ngày IV + Dexamethasone"
      ]
    },
    micro: {
      gram: "gram_neg_coccobacilli",
      morphology: "Cầu trực khuẩn Gram (−) nhỏ",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "chocolate_agar",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "positive",
      lactose: "none",
      organismId: "H. influenzae (Hib)"
    }
  },
  {
    id: "sc_acinetobacter_vap",
    title: "Viêm Phổi Thở Máy CRAB (Acinetobacter baumannii Kháng Carbapenem)",
    category: "Gram âm",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 70 tuổi — Thở máy xâm nhập ngày 10 ICU, đàm ống nội khí quản tăng đục nhiều, sốt cao",
      hr: "125 bpm",
      bp: "95/60 mmHg",
      spo2: "90% (FiO2 60%, PEEP 10)",
      temp: "39.2 °C",
      rr: "28 lần/phút",
      gcs: "Sedated",
      description: "Phim X-quang ngực thâm nhiễm phế nang lan tỏa 2 bên. Cấy dịch nội khí quản mọc A. baumannii.",
      specimen: "Dịch hút nội khí quản (ETA)",
      symptoms: [
        "Nhuộm Gram: Cầu trực khuẩn Gram âm xếp đôi chắc (Gram-negative coccobacilli in pairs)",
        "Thạch MacConkey: Khuẩn lạc màu ngà/trắng (Lactose non-fermenter −)",
        "Sinh hóa: Oxidase (−), Catalase (+), Hiếu khí bắt buộc, Đa kháng siêu vi khuẩn",
        "Kháng sinh đồ: Kháng Carbapenem (CRAB) → Phác đồ phối hợp Colistin + Ampicillin/Sulbactam liều cao"
      ]
    },
    micro: {
      gram: "gram_neg_coccobacilli",
      morphology: "Cầu trực khuẩn Gram (−) xếp đôi",
      stainType: "gram",
      density: "heavy",
      pmn: "high",
      culturePlate: "macconkey_lactose_neg_green",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "negative",
      organismId: "A. baumannii (CRAB)"
    }
  },
  {
    id: "sc_cdiff_colitis",
    title: "Viêm Ruột Giả Mạc Do Kháng Sinh (Clostridioides difficile)",
    category: "Gram dương",
    difficulty: "Nâng cao",
    badgeColor: "#f59e0b",
    patient: {
      demographics: "Nữ, 76 tuổi — Tiêu chảy nước thối tanh 8-12 lần/ngày sau đợt dùng Clindamycin 14 ngày",
      hr: "108 bpm",
      bp: "105/65 mmHg",
      spo2: "96%",
      temp: "38.5 °C",
      rr: "22 lần/phút",
      gcs: "15 điểm",
      description: "Bệnh nhân quặn bụng dữ dội, đi lỏng nhầy hôi thối. Nội soi đại tràng thấy mảng giả mạc (Pseudomembranes) vàng đục.",
      specimen: "Phân lỏng",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram dương kỵ khí tạo bào tử oval",
        "Xét nghiệm Độc tố: EIA Toxin A/B (+) trong phân & PCR gen tcdB (+)",
        "Sinh hóa: Kỵ khí tuyệt đối",
        "Lưu ý y lệnh: Ngừng ngay kháng sinh gây bệnh + Dùng Fidaxomicin hoặc Vancomycin ĐƯỜNG UỐNG (Không tiêm IV)"
      ]
    },
    micro: {
      gram: "gram_pos_spore_rods",
      morphology: "Trực khuẩn Gram (+) bào tử C. diff",
      stainType: "gram",
      density: "moderate",
      pmn: "moderate",
      culturePlate: "blood_agar_beta",
      catalase: "negative",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Clostridioides difficile"
    }
  },
  {
    id: "sc_bacillus_anthrax",
    title: "Bệnh Than Thể Da (Bacillus anthracis Cutaneous Anthrax)",
    category: "Gram dương",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 42 tuổi — Nông dân mổ thịt gia súc ốm, xuất hiện mụn mủ hoại tử màu đen ở cẳng tay",
      hr: "100 bpm",
      bp: "120/75 mmHg",
      spo2: "98%",
      temp: "38.2 °C",
      rr: "20 lần/phút",
      gcs: "15 điểm",
      description: "Vết tổn thương da có vảy hoại tử đen trung tâm (Mụn thâm đen - Black eschar) kèm phù nề cứng xung quanh không đau.",
      specimen: "Dịch mụn mủ vết thương da",
      symptoms: [
        "Nhuộm Gram: Trực khuẩn Gram dương rất lớn, hai đầu vuông xếp thành chuỗi hình đốt tre (Bamboo-stick appearance)",
        "Thạch máu: Mọc khuẩn lạc hình đầu sứa (Medusa-head colonies), KHÔNG tan máu (Non-hemolytic $\\gamma$)",
        "Sinh hóa: Hiếu khí / Kỵ khí tùy tiện, Không di động (Non-motile)",
        "Xử trí: Ciprofloxacin 500mg uống x 2 lần/ngày x 60 ngày + Khai báo dịch tễ khẩn"
      ]
    },
    micro: {
      gram: "gram_pos_bamboo_rods",
      morphology: "Trực khuẩn Gram (+) đốt tre (Anthrax)",
      stainType: "gram",
      density: "heavy",
      pmn: "moderate",
      culturePlate: "blood_agar_alpha",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Bacillus anthracis"
    }
  },
  {
    id: "sc_aspergillus_pneumonia",
    title: "Viêm Phổi Nấm Mốc Xâm Lấn (Aspergillus fumigatus)",
    category: "Vi nấm",
    difficulty: "Khẩn cấp",
    badgeColor: "#ef4444",
    patient: {
      demographics: "Nam, 50 tuổi — Ghép tủy xương ngày +45, bạch cầu hạt giảm nặng (ANC < 100/µL), ho hoại tử sốt ho ra máu",
      hr: "118 bpm",
      bp: "110/65 mmHg",
      spo2: "91% (Khí trời)",
      temp: "39.0 °C",
      rr: "26 lần/phút",
      gcs: "15 điểm",
      description: "HRCT ngực có dấu hiệu Quầng sáng (Halo sign) & Nhồi máu phổi. Soi tươi dịch rửa phế quản BAL bộc lộ sợi nấm mốc.",
      specimen: "Dịch rửa phế quản phế nang (BAL)",
      symptoms: [
        "Soi tươi / Nhuộm LPCB / Calcofluor White: Sợi nấm tơ có vách ngăn (Septate hyphae) phân nhánh góc nhọn 45° lưỡng phân (Dichotomous branching)",
        "Test Galactomannan DNT / Huyết thanh (+)",
        "Thạch Sabouraud: Mọc nấm mốc màu xanh xám bọt biển",
        "Xử trí: Voriconazole IV (Lựa chọn số 1) hoặc Amphotericin B dạng Liposome"
      ]
    },
    micro: {
      gram: "aspergillus_hyphae_45",
      morphology: "Sợi nấm mốc phân nhánh 45°",
      stainType: "gram",
      density: "heavy",
      pmn: "low",
      culturePlate: "sabouraud_agar",
      catalase: "positive",
      coagulase: "negative",
      oxidase: "negative",
      lactose: "none",
      organismId: "Aspergillus fumigatus"
    }
  }
];


