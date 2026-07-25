/**
 * micro-criteria.js — Microbiology Pro Studio
 * Cây nhận diện vi khuẩn (Decision Tree), Phản ứng sinh hóa & Bảng Antibiogram S/I/R.
 */

const MICRO_CRITERIA = {
  // 1. Antibiogram Data Profiles
  antibiogramData: {
    "S. aureus (MRSA)": [
      { drug: "Oxacillin / Cefoxitin", status: "R", class: "resistant", note: "Kháng tất cả Beta-lactam ngoại trừ Ceftaroline" },
      { drug: "Vancomycin", status: "S", class: "susceptible", note: "Lựa chọn hàng đầu cho MRSA" },
      { drug: "Linezolid", status: "S", class: "susceptible", note: "Thay thế nếu dị ứng hoặc độc tính thận" },
      { drug: "Clindamycin", status: "S/R", class: "intermediate", note: "Cần test D-test kiểm tra kháng cảm ứng" },
      { drug: "Trimethoprim/Sulfamethoxazole", status: "S", class: "susceptible", note: "Lựa chọn đường uống" }
    ],
    "S. pneumoniae": [
      { drug: "Penicillin G / Amoxicillin", status: "S", class: "susceptible", note: "Nhạy cảm cao nếu MIC < 0.06 µg/mL" },
      { drug: "Ceftriaxone", status: "S", class: "susceptible", note: "Lựa chọn đầu tay cho viêm phổi / VMN" },
      { drug: "Levofloxacin", status: "S", class: "susceptible", note: "Fluoroquinolone hô hấp" },
      { drug: "Vancomycin", status: "S", class: "susceptible", note: "Dùng khi nghi kháng Penicillin cao" }
    ],
    "E. coli (ESBL+)": [
      { drug: "Ampicillin", status: "R", class: "resistant", note: "Kháng tự nhiên / Tiết Beta-lactamase" },
      { drug: "Ceftriaxone / Cefotaxime", status: "R", class: "resistant", note: "Kháng do gen ESBL" },
      { drug: "Cefepime", status: "R", class: "resistant", note: "Bị thủy phân bởi ESBL" },
      { drug: "Piperacillin/Tazobactam", status: "S/I", class: "intermediate", note: "Cân nhắc trong nhiễm khuẩn niệu nhẹ" },
      { drug: "Meropenem / Ertapenem", status: "S", class: "susceptible", note: "Lựa chọn ưu tiên hàng đầu cho ESBL+" },
      { drug: "Amikacin", status: "S", class: "susceptible", note: "Aminoglycoside nhạy cảm" }
    ],
    "N. meningitidis": [
      { drug: "Ceftriaxone", status: "S", class: "susceptible", note: "Lựa chọn khẩn cấp số 1 cho VMN" },
      { drug: "Penicillin G", status: "S", class: "susceptible", note: "Vẫn còn nhạy ở đa số chủng" },
      { drug: "Rifampicin", status: "S", class: "susceptible", note: "Dự phòng cho người tiếp xúc gần" }
    ],
    "P. aeruginosa": [
      { drug: "Ceftriaxone", status: "R", class: "resistant", note: "Kháng tự nhiên (Intrinsic resistance)" },
      { drug: "Cefepime", status: "S", class: "susceptible", note: "Cephalosporin kháng Trực khuẩn mủ xanh" },
      { drug: "Piperacillin/Tazobactam", status: "S", class: "susceptible", note: "Antipseudomonal Penicillin" },
      { drug: "Meropenem", status: "S", class: "susceptible", note: "Carbapenem kháng P. aeruginosa" },
      { drug: "Ciprofloxacin", status: "S", class: "susceptible", note: "Fluoroquinolone đường uống" }
    ],
    "M. tuberculosis": [
      { drug: "Isoniazid (H)", status: "S", class: "susceptible", note: "Phác đồ hàng 1 (2RHZE/4RH)" },
      { drug: "Rifampicin (R)", status: "S", class: "susceptible", note: "Phác đồ hàng 1" },
      { drug: "Pyrazinamide (Z)", status: "S", class: "susceptible", note: "Phác đồ hàng 1" },
      { drug: "Ethambutol (E)", status: "S", class: "susceptible", note: "Phác đồ hàng 1" }
    ],
    "Candida albicans": [
      { drug: "Fluconazole", status: "S", class: "susceptible", note: "Lựa chọn hàng đầu cho Candida albicans" },
      { drug: "Caspofungin / Micafungin", status: "S", class: "susceptible", note: "Echinocandin cho nấm huyết / BN nặng" },
      { drug: "Amphotericin B", status: "S", class: "susceptible", note: "Kháng nấm phổ rộng" }
    ],
    "S. pyogenes (Group A)": [
      { drug: "Penicillin V / Ampicillin", status: "S", class: "susceptible", note: "Nhạy cảm 100% với Penicillin" },
      { drug: "Amoxicillin", status: "S", class: "susceptible", note: "Lựa chọn uống chuẩn cho viêm họng" },
      { drug: "Erythromycin / Azithromycin", status: "S/R", class: "intermediate", note: "Tỷ lệ kháng macrolide đang gia tăng" },
      { drug: "Clindamycin", status: "S", class: "susceptible", note: "Ức chế độc tố Streptococcal Pyrogenic Exotoxin" }
    ],
    "Clostridium perfringens": [
      { drug: "Penicillin G", status: "S", class: "susceptible", note: "Lựa chọn hàng đầu cho hoại thư khí" },
      { drug: "Clindamycin", status: "S", class: "susceptible", note: "Phối hợp ngắt sản xuất α-toxin" },
      { drug: "Metronidazole", status: "S", class: "susceptible", note: "Kháng sinh kỵ khí hiệu quả cao" }
    ],
    "K. pneumoniae (Mucoid)": [
      { drug: "Ampicillin", status: "R", class: "resistant", note: "Kháng tự nhiên" },
      { drug: "Ceftriaxone", status: "S", class: "susceptible", note: "Nếu chưa tiết ESBL / KPC" },
      { drug: "Meropenem", status: "S", class: "susceptible", note: "Dùng cho nhiễm trùng nặng / ESBL" },
      { drug: "Levofloxacin", status: "S", class: "susceptible", note: "Fluoroquinolone nhạy cảm" }
    ],
    "Vibrio cholerae": [
      { drug: "Doxycycline", status: "S", class: "susceptible", note: "Lựa chọn hàng đầu 1 liều duy nhất 300mg" },
      { drug: "Azithromycin", status: "S", class: "susceptible", note: "Ưu tiên cho phụ nữ mang thai & trẻ nhỏ" },
      { drug: "Ciprofloxacin", status: "S", class: "susceptible", note: "Thay thế hiệu quả" }
    ],
    "Cryptococcus neoformans": [
      { drug: "Amphotericin B + Flucytosine", status: "S", class: "susceptible", note: "Phác đồ tấn công VMN nấm (Induction)" },
      { drug: "Fluconazole", status: "S", class: "susceptible", note: "Phác đồ củng cố & duy trì (400mg/ngày)" }
    ],
    "Listeria monocytogenes": [
      { drug: "Ampicillin / Penicillin G", status: "S", class: "susceptible", note: "Lựa chọn số 1 (Cephalosporin KHÔNG TÁC DỤNG)" },
      { drug: "Gentamicin", status: "S", class: "susceptible", note: "Phối hợp hiệp đồng diệt khuẩn" },
      { drug: "Trimethoprim/Sulfamethoxazole", status: "S", class: "susceptible", note: "Thay thế nếu dị ứng Penicillin" }
    ],
    "H. influenzae (Hib)": [
      { drug: "Ampicillin", status: "S/R", class: "intermediate", note: "Kém hiệu quả nếu tiết TEM-1 Beta-lactamase" },
      { drug: "Ceftriaxone / Cefotaxime", status: "S", class: "susceptible", note: "Lựa chọn ưu tiên hàng đầu cho VMN mủ" },
      { drug: "Amoxicillin/Clavulanate", status: "S", class: "susceptible", note: "Ưu tiên đường uống" }
    ],
    "A. baumannii (CRAB)": [
      { drug: "Meropenem / Imipenem", status: "R", class: "resistant", note: "Kháng Carbapenem (CRAB)" },
      { drug: "Colistin (Polymyxin E)", status: "S", class: "susceptible", note: "Kháng sinh cứu cánh (Last-resort)" },
      { drug: "Sulbactam (Ampicillin/Sulbactam)", status: "S/I", class: "intermediate", note: "Liều cao Sulbactam có độc tính trên A. baumannii" },
      { drug: "Tigecycline", status: "S", class: "susceptible", note: "Không dùng cho nhiễm trùng huyết" }
    ],
    "Clostridioides difficile": [
      { drug: "Fidaxomicin", status: "S", class: "susceptible", note: "Lựa chọn hàng đầu giảm tái phát" },
      { drug: "Vancomycin (Đường UỐNG)", status: "S", class: "susceptible", note: "Bắt buộc đường uống (không tiêm IV)" },
      { drug: "Metronidazole (Đường UỐNG)", status: "S", class: "susceptible", note: "Dùng cho ca viêm ruột giả mạc nhẹ" }
    ],
    "Bacillus anthracis": [
      { drug: "Ciprofloxacin", status: "S", class: "susceptible", note: "Lựa chọn điều trị & dự phòng Bệnh Than" },
      { drug: "Doxycycline", status: "S", class: "susceptible", note: "Lựa chọn đường uống hiệu quả" },
      { drug: "Penicillin G", status: "S", class: "susceptible", note: "Nếu chủng nhạy cảm" }
    ],
    "Aspergillus fumigatus": [
      { drug: "Voriconazole", status: "S", class: "susceptible", note: "Lựa chọn hàng đầu cho Aspergillus xâm lấn" },
      { drug: "Isavuconazole / Posaconazole", status: "S", class: "susceptible", note: "Triazole thế hệ mới" },
      { drug: "Amphotericin B Dạng Liposome", status: "S", class: "susceptible", note: "Thay thế nếu kháng / độc tính" }
    ]
  },

  // 2. Build Decision Tree Steps
  evaluateDecisionTree(microData) {
    const steps = [];

    // Step 1: Stain & Gram Reaction
    if (microData.stainType === "ziehl_neelsen") {
      steps.push({
        title: "Bước 1: Nhuộm Ziehl-Neelsen (AFB)",
        val: "Trực khuẩn ĐỎ kháng Acid (AFB +)",
        note: "Gợi ý vi khuẩn họ Mycobacterium."
      });
    } else if (microData.gram.includes("gram_pos")) {
      steps.push({
        title: "Bước 1: Nhuộm Gram",
        val: "🟣 Vi khuẩn Gram DƯƠNG (Tím)",
        note: "Vách Peptidoglycan dày giữ phức hợp tím Gentian-Iốt."
      });
    } else if (microData.gram.includes("gram_neg")) {
      steps.push({
        title: "Bước 1: Nhuộm Gram",
        val: "🔴 Vi khuẩn Gram ÂM (Hồng/Đỏ)",
        note: "Vách mỏng bị cồn tẩy màu, bắt màu thuốc nhuộm nền Safranin."
      });
    } else {
      steps.push({
        title: "Bước 1: Nhuộm Gram / Soi Tươi",
        val: "🔮 Tế bào Nấm Men (Gram + lớn)",
        note: "Kích thước 4-8 µm, nảy chồi hoặc tạo sợi nấm giả."
      });
    }

    // Step 2: Morphology
    steps.push({
      title: "Bước 2: Hình Thái Học Kính Hiển Vi",
      val: microData.morphology,
      note: `Bạch cầu PMN: ${microData.pmn === 'high' ? 'Nhiều (Phản ứng viêm cấp mạnh)' : 'Trung bình/Ít'}`
    });

    // Step 3: Biochemical & Culture Characteristics
    const bioList = [];
    if (microData.catalase) bioList.push(`Catalase (${microData.catalase === 'positive' ? '+' : '−'})`);
    if (microData.coagulase) bioList.push(`Coagulase (${microData.coagulase === 'positive' ? '+' : '−'})`);
    if (microData.oxidase) bioList.push(`Oxidase (${microData.oxidase === 'positive' ? '+' : '−'})`);
    if (microData.lactose && microData.lactose !== 'none') bioList.push(`Lactose (${microData.lactose === 'positive' ? '+' : '−'})`);

    steps.push({
      title: "Bước 3: Phản Ứng Sinh Hóa Key",
      val: bioList.join(' | ') || "Sinh hóa đặc hiệu",
      note: `Đĩa cấy: ${microData.culturePlate}`
    });

    // Step 4: Final Identification
    steps.push({
      title: "Bước 4: Định Danh Tác Nhân",
      val: `🦠 ${microData.organismId}`,
      note: "Xác định chủng tác nhân gây bệnh chính."
    });

    return steps;
  }
};
