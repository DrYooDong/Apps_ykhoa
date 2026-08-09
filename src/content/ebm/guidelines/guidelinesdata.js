    // ════════════════════════════
    // CONFIG & STATE
    // ════════════════════════════
    
    const SPECIALTIES = {
      cardio: { name: 'Tim mạch', color: '#dc2626', bg: '#fef2f2' },
      pulmo: { name: 'Hô hấp', color: '#2563eb', bg: '#eff6ff' },
      gi: { name: 'Tiêu hóa', color: '#ca8a04', bg: '#fefce8' },
      endo: { name: 'Nội tiết', color: '#7c3aed', bg: '#faf5ff' },
      neuro: { name: 'Thần kinh', color: '#c026d3', bg: '#fdf4ff' },
      infect: { name: 'Truyền nhiễm', color: '#16a34a', bg: '#f0fdf4' },
      renal: { name: 'Thận học', color: '#0891b2', bg: '#ecfeff' },
      rheum: { name: 'Cơ xương khớp', color: '#ea580c', bg: '#fff7ed' },
      hema: { name: 'Huyết học', color: '#db2777', bg: '#fdf2f8' },
      onco: { name: 'Ung thư', color: '#be185d', bg: '#fce7f3' },
      pedia: { name: 'Nhi khoa', color: '#0284c7', bg: '#f0f9ff' },
      obgyn: { name: 'Sản phụ khoa', color: '#e11d48', bg: '#fff1f2' },
      icu: { name: 'Hồi sức tích cực', color: '#059669', bg: '#ecfdf5' },
      derma: { name: 'Da liễu', color: '#ec4899', bg: '#fdf2f8' },
      ent: { name: 'Tai Mũi Họng', color: '#06b6d4', bg: '#ecfeff' },
      nutri: { name: 'Dinh dưỡng', color: '#65a30d', bg: '#f7fee7' }
    };

    const SOURCE_TYPES = {
      'intl-study': { name: 'Nghiên cứu Quốc tế', color: '#6366f1', bg: '#e0e7ff' },
      'intl-guideline': { name: 'Guideline Quốc tế', color: '#0d9488', bg: '#ccfbf1' },
      'vn-moh': { name: 'Bộ Y tế Việt Nam', color: '#dc2626', bg: '#fee2e2' },
      'vn-association': { name: 'Hội chuyên khoa VN', color: '#16a34a', bg: '#dcfce7' }
    };

    const DESIGNS = {
      'rct': { name: 'Thử nghiệm lâm sàng (RCT)' },
      'meta': { name: 'Tổng quan / Meta-Analysis' },
      'cohort': { name: 'Nghiên cứu quan sát / Thuần tập' },
      'guideline': { name: 'Hướng dẫn / Khuyến cáo' },
      'review': { name: 'Bài tổng quan y khoa (Review)' },
      'case-report': { name: 'Case Report / Series' },
      'other': { name: 'Khác' }
    };

    const IMPACTS = {
      'practice-changing': { name: 'Practice-Changing', color: '#dc2626', bg: '#fef2f2' },
      'informative': { name: 'Informative', color: '#2563eb', bg: '#eff6ff' },
      'early-signal': { name: 'Early Signal', color: '#d97706', bg: '#fffbeb' },
      'negative': { name: 'Negative/Âm tính', color: '#4b5563', bg: '#f3f4f6' },
      'regulatory': { name: 'Regulatory', color: '#7c3aed', bg: '#faf5ff' }
    };

        const SAMPLE_STUDIES = [

  {
    "id": "study_2026_aha_acc_ada_asn_ckm_syndrome",
    "title": "Hướng dẫn Phòng ngừa, Phát hiện, Đánh giá và Quản lý Hội chứng Tim mạch - Thận - Chuyển hóa (2026 AHA/ACC/ADA/ASN Guideline for CKM Syndrome)",
    "drug": "semaglutide, tirzepatide, liraglutide, empagliflozin, dapagliflozin, canagliflozin, finerenone, metformin, sacubitril/valsartan, losartan, irbesartan, atorvastatin, rosuvastatin, apixaban, rivaroxaban, patiromer, sodium zirconium cyclosilicate, icosapent ethyl",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "AHA / ACC / ADA / ASN",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân lâm sàng",
    "keyResults": "Thử nghiệm FLOW cho thấy semaglutide giảm đáng kể biến cố suy tim ở nhóm chung: HR 0.74 (95% CI 0.58-0.94) và giảm suy tim mới mắc ở nhóm không có suy tim nền: HR 0.68 (95% CI 0.50-0.91). Phân tích gộp SMART-C cho thấy SGLT2i giúp giảm MACE: HR 0.90 (95% CI 0.84-0.96) và tử vong do tim mạch: HR 0.80 (95% CI 0.72-0.88) ở bệnh nhân có albumin niệu. Trong phân tích FIDELITY, finerenone giảm 21% biến cố suy tim: HR 0.79 (95% CI 0.66-0.92).",
    "summary": "Cập nhật toàn diện hướng dẫn lâm sàng 2026 của AHA/ACC/ADA/ASN về phân giai đoạn (Stage 0-4), đánh giá nguy cơ PREVENT-CVD, phối hợp nhóm chăm sóc đa chuyên khoa và phác đồ điều trị bảo vệ tim - thận (SGLT2i, GLP-1 RA, nsMRA, RASi) ở bệnh nhân béo phì, đái tháo đường, bệnh thận mạn và suy tim.",
    "detailedConclusion": "Cập nhật toàn diện hướng dẫn lâm sàng 2026 của AHA/ACC/ADA/ASN về phân giai đoạn (Stage 0-4), đánh giá nguy cơ PREVENT-CVD, phối hợp nhóm chăm sóc đa chuyên khoa và phác đồ điều trị bảo vệ tim - thận (SGLT2i, GLP-1 RA, nsMRA, RASi) ở bệnh nhân béo phì, đái tháo đường, bệnh thận mạn và suy tim.",
    "sourceUrl": "",
    "file": "kho-guidelines/2026-aha-acc-ada-asn-ckm-syndrome.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_2023_byt_benh_phoi_mo_ke",
    "title": "Hướng dẫn Chẩn đoán và Điều trị Bệnh Phổi Mô Kẽ (BYT 2023)",
    "drug": "",
    "sourceType": "national-guideline",
    "specialty": "resp",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2023,
    "organization": "Bộ Y tế Việt Nam",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân lâm sàng",
    "summary": "Tóm tắt toàn diện Hướng dẫn chẩn đoán và điều trị Bệnh phổi mô kẽ (ILD) theo Quyết định 1005/QĐ-BYT 2023: Khái niệm, phân loại ATS/ERS, quy trình chẩn đoán 3 bước, HRCT, PFTs, BAL, Cryobiopsy/VATS, phác đồ Corticoid, UCMD, Rituximab, Tocilizumab, thuốc kháng xơ Nintedanib và phân tích 6 khoảng trống lâm sàng.",
    "detailedConclusion": "Khuyến cáo BYT 2023 chuẩn hóa tiếp cận chẩn đoán 3 bước và điều trị ILD đa mô thức, nhấn mạnh vai trò hội chẩn đa chuyên khoa MDD, HRCT lát cắt mỏng, phác đồ UCMD/nintedanib và phân tích các khoảng xám thực hành lâm sàng.",
    "sourceUrl": "",
    "file": "kho-guidelines/2023-byt-benh-phoi-mo-ke.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_2026_byt_u_xo_tu_cung",
    "title": "Hướng Dẫn Chẩn Đoán và Xử Trí U Xơ Cơ Tử Cung (Bộ Y tế 2026)",
    "drug": "",
    "sourceType": "vn-moh",
    "specialty": "obgyn",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Bộ Y tế Việt Nam",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Phụ nữ mắc u xơ cơ tử cung, nghi ngờ u xơ cơ tử cung, vô sinh hoặc mang thai kèm u xơ",
    "summary": "Tóm tắt toàn diện Hướng dẫn Lâm sàng Chẩn đoán và Xử trí U xơ cơ tử cung theo Quyết định 456/QĐ-BYT ban hành ngày 12/02/2026 của Bộ Y tế Việt Nam: Sinh lý bệnh, dịch tễ học, phân loại FIGO 2011 (L0-L8), tiêu chuẩn siêu âm Doppler viền mạch phân biệt với Adenomyosis, điều trị nội khoa, điều trị ngoại khoa (bóc u, cắt tử cung, phương pháp giảm mất máu), kỹ thuật ít/không xâm lấn (US-HIFU, UAE/NĐMTC, MRgFUS, RFA), xử trí u xơ ở bệnh nhân vô sinh và trong thai kỳ.",
    "detailedConclusion": "Hướng dẫn của Bộ Y tế 2026 chuẩn hóa quy trình chẩn đoán và xử trí U xơ cơ tử cung: áp dụng phân loại FIGO 2011 để cá thể hóa điều trị, phân biệt chính xác với Adenomyosis trên siêu âm Doppler viền mạch, ưu tiên bảo tồn tử cung bằng các kỹ thuật hiện đại (US-HIFU, UAE, RFA) cho phụ nữ mong muốn sinh con, và hướng dẫn xử trí an toàn u xơ trong thai kỳ.",
    "sourceUrl": "",
    "file": "kho-guidelines/2026-byt-u-xo-tu-cung.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_2026_cap_nhat_soc_tim",
    "title": "Cập Nhật Sốc Tim 2026: Bằng Chứng Hiện Tại, Góc Nhìn Từ Guidelines Và Outcomes",
    "drug": "",
    "sourceType": "intl-study",
    "specialty": "cardio",
    "design": "review",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Journal of Cardiothoracic and Vascular Anesthesia",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân lâm sàng",
    "summary": "Tóm tắt toàn diện Cập nhật Sốc tim 2026 (J Cardiothorac Vasc Anesth): Sinh lý bệnh vòng xoắn sốc, Phân độ SCAI cải tiến A-E, Dấu ấn sinh học mới (sST2, DPP3, bio-ADM), Thang điểm tiên lượng, Giám sát PAC, Thiết bị hỗ trợ tuần hoàn cơ học (MCS: IABP, Impella, VA-ECMO), Chiến lược giải áp thất trái (LV Unloading) và Mô hình Shock Team đa chuyên khoa.",
    "detailedConclusion": "Tóm tắt toàn diện Cập nhật Sốc tim 2026 (J Cardiothorac Vasc Anesth): Sinh lý bệnh vòng xoắn sốc, Phân độ SCAI cải tiến A-E, Dấu ấn sinh học mới (sST2, DPP3, bio-ADM), Thang điểm tiên lượng, Giám sát PAC, Thiết bị hỗ trợ tuần hoàn cơ học (MCS: IABP, Impella, VA-ECMO), Chiến lược giải áp thất trái (LV Unloading) và Mô hình Shock Team đa chuyên khoa.",
    "sourceUrl": "doi:10.1053/j.jvca.2026.01.021",
    "file": "kho-guidelines/2026-cap-nhat-soc-tim.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_byt_benh_than_kinh_dai_thao_duong_2025",
    "title": "Hướng Dẫn Chẩn Đoán & Điều Trị Bệnh Thần Kinh Đái Tháo Đường (Bộ Y Tế 2025)",
    "drug": "",
    "sourceType": "national-guideline",
    "specialty": "endo",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2025,
    "organization": "Bộ Y tế Việt Nam",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân lâm sàng",
    "summary": "Tóm tắt toàn diện Hướng dẫn chẩn đoán và điều trị bệnh thần kinh đái tháo đường (Bộ Y tế 2025 - QĐ 3510/QĐ-BYT): Cơ chế bệnh sinh ngộ độc glucose, Phân loại đa dây thần kinh DPN & tự chủ CAN, Phác đồ dược lý theo cơ chế (ALA, Benfotiamine), Phác đồ giảm đau 2 bước và Kỹ thuật khám lâm sàng (Monofilament, Ipswich, 128-Hz).",
    "detailedConclusion": "Tóm tắt toàn diện Hướng dẫn chẩn đoán và điều trị bệnh thần kinh đái tháo đường (Bộ Y tế 2025 - QĐ 3510/QĐ-BYT): Cơ chế bệnh sinh ngộ độc glucose, Phân loại đa dây thần kinh DPN & tự chủ CAN, Phác đồ dược lý theo cơ chế (ALA, Benfotiamine), Phác đồ giảm đau 2 bước và Kỹ thuật khám lâm sàng (Monofilament, Ipswich, 128-Hz).",
    "sourceUrl": "Quyết định số 3510/QĐ-BYT ngày 11/11/2025",
    "file": "kho-guidelines/byt-benh-than-kinh-dai-thao-duong-2025.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_2026_ada_diabetes",
    "title": "Tiêu Chuẩn Chăm Sóc Y Khoa Trong Đái Tháo Đường (ADA 2026)",
    "drug": "",
    "sourceType": "intl-guideline",
    "specialty": "endo",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Hiệp hội Đái tháo đường Hoa Kỳ (ADA)",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân lâm sàng",
    "summary": "Tóm tắt toàn diện 17 chương Khuyến cáo Tiêu chuẩn Chăm sóc Y khoa trong Đái tháo đường ADA 2026: Chẩn đoán, Dự phòng, Kiểm soát glucose, Công nghệ đái tháo đường, Quản lý cân nặng, Tim mạch, Thận mạn, Võng mạc, Thần kinh, Chăm sóc bàn chân, Người cao tuổi, Trẻ em, Thai kỳ & Nội viện.",
    "detailedConclusion": "Tóm tắt toàn diện 17 chương Khuyến cáo Tiêu chuẩn Chăm sóc Y khoa trong Đái tháo đường ADA 2026: Chẩn đoán, Dự phòng, Kiểm soát glucose, Công nghệ đái tháo đường, Quản lý cân nặng, Tim mạch, Thận mạn, Võng mạc, Thần kinh, Chăm sóc bàn chân, Người cao tuổi, Trẻ em, Thai kỳ & Nội viện.",
    "sourceUrl": "https://doi.org/10.2337/dc26-SINT",
    "file": "kho-guidelines/2026-ada-diabetes.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_cap_nhat_ve_bao_giap_2026",
    "title": "JCEM 2026: Cập Nhật Hướng Dẫn Lâm Sàng Chẩn Đoán & Điều Trị Cơn Bão Giáp (Thyroid Storm)",
    "drug": "Propranolol, Esmolol, PTU, Methimazole, Lugol, SSKI, Hydrocortisone, Cholestyramine",
    "sourceType": "intl-guideline",
    "specialty": "endo",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "JCEM / Endocrine Society (Kopp PA et al.)",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân nhiễm độc giáp nặng tiến triển thành cơn bão giáp (Thyrotoxic Crisis / Thyroid Storm)",
    "summary": "Toàn văn tóm tắt hướng dẫn chẩn đoán và điều trị cơn bão giáp: Sinh lý bệnh, yếu tố khởi phát, đối chiếu thang điểm Burch-Wartofsky (BWPS >45 điểm) & Tiêu chuẩn Nhật Bản (JTA/JES), phác đồ điều trị đa mô thức (Chẹn beta, Thionamides, Iod vô cơ - Quy tắc 1 giờ, Hydrocortisone, Cholestyramine và Hồi sức ICU).",
    "detailedConclusion": "Chẩn đoán bão giáp dựa trên lâm sàng và suy đa tạng. BWPS >45 điểm xác chẩn. Chống chỉ định tuyệt đối Aspirin. Dùng thuốc kháng giáp PTU/MMI trước Iod ít nhất 1 giờ. Khi men gan cao >3 lần ULN, ưu tiên MMI hơn PTU. Theo dõi hồi sức ICU tích cực.",
    "sourceUrl": "https://doi.org/10.1210/clinem/dgag054",
    "file": "kho-guidelines/cap-nhat-ve-bao-giap-2026.html",
    "subgroups": {
      "Tỷ lệ tử vong chung (%)": "5% - 12% (người trẻ) | 30% (người cao tuổi)",
      "BWPS Score Bão Giáp": "COL: BWPS >45: Xác chẩn | 25-44: Nghi ngờ | <25: Ít khả năng",
      "Thời gian cho Iod vô cơ": "BẮT BUỘC sau kháng giáp ít nhất 1 giờ"
    },
    "asianData": true,
    "bookmarked": true
  },
  {
    "id": "study_phac_do_soc_nhiem_khuan_sepsis3",
    "title": "Phác Đồ Xử Trí Cấp Cứu Sốc Nhiễm Khuẩn (Sepsis-3) & SSC 2021",
    "drug": "",
    "sourceType": "intl-guideline",
    "specialty": "icu",
    "design": "guideline",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "PGS.TS Nguyễn Văn A - BS.CKII Lê Văn B",
    "phase": "Clinical Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân lâm sàng",
    "summary": "Phác Đồ Xử Trí Cấp Cứu Sốc Nhiễm Khuẩn (Sepsis-3) & SSC 2021",
    "detailedConclusion": "",
    "sourceUrl": "",
    "file": "kho-guidelines/phac-do-soc-nhiem-khuan-sepsis3.html",
    "asianData": true,
    "bookmarked": false
  },
  {
    "id": "study_byt_lao_2024_p1",
    "title": "Bộ Y Tế 2024: Hướng Dẫn Chẩn Đoán, Điều Trị & Dự Phòng Bệnh Lao (Phần 1: Đại Cương, Phân Loại & Chẩn Đoán)",
    "drug": "Rifampicin, Isoniazid, Pyrazinamide, Ethambutol, Bedaquiline, Linezolid, Levofloxacin, Moxifloxacin, Pretomanid, Clofazimine, Rifapentine, Streptomycin",
    "sourceType": "vn-moh",
    "specialty": "pulmo",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Quyết định 162/QĐ-BYT (2024) thay thế QĐ 1314/2020: Ưu tiên SHPT chẩn đoán nhanh (Xpert Ultra/Truenat), chuẩn hóa phân loại ICD-10/kháng thuốc (MDR, pre-XDR, XDR), bảng điểm chẩn đoán lao trẻ em TCYTTG 2022 (>10 điểm) & xét nghiệm lao tiềm ẩn (TST/TBST/IGRA)",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Phát hiện sớm ca bệnh lao & lao kháng thuốc, tối ưu hóa độ chính xác chẩn đoán vi sinh, phân loại chính xác mức độ kháng thuốc & chuẩn hóa quy trình tầm soát lao tiềm ẩn trong cộng đồng"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Ưu tiên Xpert Ultra / Truenat thay AFB trực tiếp; Quy chuẩn lấy đờm 3 bước (nhầy mủ >=1ml); Xử trí kết quả Vết (Trace) ở trẻ em/HIV/ngoài phổi; Bảng điểm trẻ em >10 điểm; Quy trình chẩn đoán Lao tiềm ẩn Sơ đồ 7 & 8",
    "impact": "practice-changing",
    "year": 2024,
    "organization": "Bộ Y tế Việt Nam (Quyết định số 162/QĐ-BYT)",
    "phase": "National Guideline",
    "sampleSize": null,
    "population": "Người lớn và trẻ em nghi mắc bệnh lao, mắc lao hoặc phơi nhiễm với nguồn lây lao trên toàn quốc",
    "summary": "Hướng dẫn chẩn đoán bệnh Lao 2024 của Bộ Y tế Việt Nam (Phần 1). Cập nhật hệ thống khái niệm, mã ICD-10, phân loại kháng thuốc, các kỹ thuật vi sinh/SHPT/CĐHA, tiêu chuẩn chẩn đoán lao phổi vi sinh âm tính, bảng điểm trẻ em và quy trình tầm soát lao tiềm ẩn.",
    "detailedConclusion": "Thay thế QĐ 1314/QĐ-BYT (2020). Ưu tiên xét nghiệm SHPT nhanh Xpert MTB/RIF Ultra & Truenat. Quy chuẩn lấy đờm 02 mẫu. Kết quả Vết (Trace) chấp nhận chẩn đoán ngay ở trẻ em/HIV/ngoài phổi. Bảng điểm chẩn đoán lao trẻ em TCYTTG 2022 > 10 điểm. Tầm soát lao tiềm ẩn bằng TST, TBST (Diaskintest) hoặc IGRA (QuantiFeron).",
    "fdaStatus": "Quyết định 162/QĐ-BYT năm 2024",
    "sourceUrl": "https://moh.gov.vn",
    "file": "kho-guidelines/byt-lao-2024-p1.html",
    "parts": [
      {
        "label": "Phần 1: Đại Cương & Chẩn Đoán",
        "file": "kho-guidelines/byt-lao-2024-p1.html"
      },
      {
        "label": "Phần 2: Điều Trị & Dự Phòng",
        "file": "kho-guidelines/byt-lao-2024-p2.html"
      }
    ],
    "subgroups": {
      "Lao phổi phổ biến (%)": "80% - 85% các thể bệnh lao",
      "Kích thước hạt khí dung lây truyền": "1 - 5 µm (Bay lơ lửng đến 24 giờ)",
      "Bảng điểm Lao Trẻ em (TCYTTG)": "Tổng điểm > 10 điểm (Chẩn đoán & ĐT)",
      "Thể tích đờm đạt chuẩn": "Nhầy mủ đặc >= 1 ml (Lấy 2 mẫu cách 2h)"
    },
    "icd10": [
      "A15",
      "A16",
      "A17",
      "A18",
      "A19",
      "B90",
      "U84.3",
      "Z22.7"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.223Z",
    "radarUrl": "../guideline-radar/radar.html?spec=pulmo"
  },
  {
    "id": "study_byt_lao_2024_p2",
    "title": "Bộ Y Tế 2024: Hướng Dẫn Chẩn Đoán, Điều Trị & Dự Phòng Bệnh Lao (Phần 2: Điều Trị & Dự Phòng Lây Nhiễm)",
    "drug": "Rifampicin, Isoniazid, Pyrazinamide, Ethambutol, Bedaquiline, Pretomanid, Linezolid, Moxifloxacin, Levofloxacin, Clofazimine, Rifapentine, Streptomycin, Ethionamide",
    "sourceType": "vn-moh",
    "specialty": "pulmo",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Cập nhật Phác đồ Lao nhạy cảm (A1, A2, A2a 4 tháng trẻ em, B1, B2a), Phác đồ đột phá Lao kháng thuốc (BPaLM 6 tháng, Phác đồ C 9-11 tháng Bedaquiline), Bảng liều cân nặng Phụ lục 6, quản lý đối tượng đặc biệt (Men gan, Suy thận, HIV/ARV 2w) & Phác đồ Lao tiềm ẩn 3HP/1HP",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Tối đa hóa tỷ lệ chữa khỏi bệnh lao & lao kháng thuốc, giảm độc tính do thuốc chống lao, phòng ngừa bỏ trị và ngăn chặn sự lan truyền vi khuẩn lao trong cộng đồng/hộ gia đình"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Phác đồ BPaLM 6 tháng (Bdq+Pa+Lzd+Mfx) cho MDR-TB >=14t; Phác đồ C 9-11t Bedaquiline; Phác đồ A2a 4 tháng cho trẻ em; Ngừng thuốc khi men gan >5x hoặc >3x kèm triệu chứng; ARV sau 2 tuần điều trị lao; Phác đồ LTA 3HP 12 liều hàng tuần & 1HP 1 tháng",
    "impact": "practice-changing",
    "year": 2024,
    "organization": "Bộ Y tế Việt Nam (Quyết định số 162/QĐ-BYT)",
    "phase": "National Guideline",
    "sampleSize": null,
    "population": "Người lớn và trẻ em mắc bệnh lao nhạy cảm thuốc, lao kháng thuốc, lao tiềm ẩn hoặc thuộc diện dự phòng lây nhiễm toàn quốc",
    "summary": "Hướng dẫn điều trị và dự phòng bệnh Lao 2024 của Bộ Y tế Việt Nam (Phần 2). Chi tiết 4 nguyên tắc điều trị, phác đồ Lao nhạy cảm, phác đồ Lao kháng thuốc đột phá (BPaLM, Phác đồ C), bảng phân liều theo cân nặng, xử trí đối tượng đặc biệt, các phác đồ Lao tiềm ẩn (3HP, 1HP) và dự phòng vắc-xin BCG.",
    "detailedConclusion": "Phác đồ A1 2HRZE/4RHE cho người lớn 6 tháng, A2a 4 tháng cho trẻ em nhẹ. Phác đồ BPaLM (Bdq+Pa+Lzd+Mfx) 6 tháng cho MDR-TB >=14t. Phác đồ C 9-11t. Ngừng thuốc lao khi AST/ALT > 5x (hoặc > 3x kèm triệu chứng). ARV khởi trị sau 2 tuần điều trị lao. LTA dùng 3HP 12 tuần hoặc 1HP 1 tháng. Vắc-xin BCG vỡ hạch nách chích rửa rắc bột INH/Rifampicin tại chỗ (không dùng thuốc toàn thân); BCG lan tỏa dùng Hàng 1 loại trừ Pyrazinamide.",
    "fdaStatus": "Quyết định 162/QĐ-BYT năm 2024",
    "sourceUrl": "https://moh.gov.vn",
    "file": "kho-guidelines/byt-lao-2024-p2.html",
    "parts": [
      {
        "label": "Phần 1: Đại Cương & Chẩn Đoán",
        "file": "kho-guidelines/byt-lao-2024-p1.html"
      },
      {
        "label": "Phần 2: Điều Trị & Dự Phòng",
        "file": "kho-guidelines/byt-lao-2024-p2.html"
      }
    ],
    "subgroups": {
      "Thời gian phác đồ BPaLM": "6 tháng (Bdq + Pa + Lzd + Mfx)",
      "Thời gian phác đồ A2a Trẻ em": "4 tháng (2HRZE / 2RH)",
      "Ngưỡng ngừng thuốc do men gan": "AST/ALT > 5x ULN (hoặc > 3x + TC)",
      "Thời điểm khởi trị ARV ở bệnh nhân HIV": "Sau 02 tuần điều trị lao (trừ màng nổi)"
    },
    "icd10": [
      "A15",
      "A16",
      "A17",
      "A18",
      "A19",
      "B90",
      "U84.3",
      "Z22.7"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=pulmo"
  },
  {
    "id": "study_gina_asthma_2026",
    "title": "GINA 2026: Hướng Dẫn Toàn Diện về Chẩn Đoán, Điều Trị & Quản Lý Hen Phế Quản ở Người Trưởng Thành và Trẻ Em",
    "drug": "Budesonide, Formoterol, Salbutamol, Fluticasone, Ipratropium, Depemokimab, Omalizumab, Omalizumab-igec, Dupilumab, Tezepelumab, Mepolizumab, Benralizumab, Azithromycin, Glycopyrronium",
    "sourceType": "intl-guideline",
    "specialty": "pulmo",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Ưu tiên Track 1 AIR/MART (ICS-formoterol) từ Bậc 1-4, chuẩn hóa chẩn đoán hô hấp ký & Biomarkers Type 2 (FeNO > 50ppb, EOS), biologics mới Depemokimab (6 tháng/lần), hạ ngưỡng SpO2 < 92% thở oxy & OCS stewardship",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Giảm tỷ lệ đợt kịch phát nặng, ngăn tử vong do hen, duy trì chức năng phổi FEV1, triệt tiêu việc sử dụng OCS tích lũy và kiểm soát triệu chứng tối ưu"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Track 1 ICS-formoterol giảm gần 50% đợt kịch phát nặng; Depemokimab tiêm 26 tuần/lần cho hen ái toan nặng; BATURA ủng hộ ICS-SABA khi cần ở Bậc 1 Track 2; Hạ ngưỡng thở O2 SpO2 < 92%; Toan lactic do lạm dụng SABA; PRAM score ở trẻ em",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Global Initiative for Asthma (GINA)",
    "phase": "International Guideline",
    "sampleSize": null,
    "population": "Người lớn, thanh thiếu niên (≥12 tuổi) và trẻ em (6–11 tuổi) mắc Hen phế quản",
    "summary": "Hướng dẫn chẩn đoán, điều trị và quản lý Hen phế quản GINA 2026. Cập nhật 2 Track điều trị cá thể hóa (Track 1 AIR/MART), tiêu chuẩn chẩn đoán hô hấp ký, thuốc sinh học mới Depemokimab, xử trí cơn hen cấp và phòng ngừa tác hại OCS tích lũy.",
    "detailedConclusion": "Track 1 (AIR/MART) với ICS-formoterol thấp/trung bình là lựa chọn ưu tiên tuyệt đối từ Bậc 1 đến Bậc 4 (tối đa 12 nhát/ngày ở người lớn). Chẩn đoán xác định khi FEV1 tăng >=12% và >=200mL sau thử thuốc hoặc FeNO > 50ppb (Type 2). Bậc 5 bổ sung Depemokimab (tiêm 6 tháng/lần) hoặc Omalizumab-igec biosimilar, LAMA triple, Azithromycin. Cấp cứu cơn hen cấp hạ ngưỡng thở O2 SpO2 < 92% (mục tiêu 92-95%), đề phòng toan lactic SABA, Epinephrine IM khi kèm phản vệ.",
    "fdaStatus": "GINA International Strategy 2026",
    "sourceUrl": "https://ginasthma.org",
    "file": "kho-guidelines/2026-gina-asthma.html",
    "subgroups": {
      "Track 1 vs SABA đơn độc (%)": "COL: Đợt kịch phát kịch phát: 52% | Giảm đợt cấp (HR): 0.53",
      "Tỷ lệ giảm đợt cấp ở Bậc 1-2": "HBAR: Track 1 (AIR khi cần): -48% | Track 2 (ICS-SABA): -45% | SABA đơn độc: 0%",
      "Giới hạn nhát xịt ICS-formoterol": "Người lớn: 12 nhát/ngày | Trẻ 6-11t: 8 nhát/ngày",
      "Mục tiêu SpO2 cấp cứu": "92% - 95% (Chỉ định thở O2 khi SpO2 < 92%)"
    },
    "icd10": [
      "J45",
      "J45.0",
      "J45.1",
      "J45.8",
      "J45.9",
      "J46"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=pulmo"
  },
  {
    "id": "study_kdigo_ckd_2024",
    "title": "KDIGO 2024: Hướng dẫn Lâm sàng về Đánh giá, Phân loại CGA & Điều trị Bệnh Thận Mạn (CKD)",
    "drug": "Empagliflozin, Dapagliflozin, Lisinopril, Losartan, Finerenone, Semaglutide, Sodium Zirconium Cyclosilicate, Patiromer",
    "sourceType": "intl-guideline",
    "specialty": "renal",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Phân loại CGA, eGFR không chủng tộc, tiên lượng KFRE, tiếp cận toàn diện 4 tầng (SGLT2i + RASi + Finerenone), hạ ngưỡng Toan chuyển hóa (<18 mmol/L), quy tắc SADMANS và tiêu chuẩn chuyển tuyến KRT",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Làm chậm tiến triển suy thận (Kidney Failure), giảm tử vong tim mạch & tử vong do mọi nguyên nhân, dự phòng biến cố thuyên tắc & cải thiện chất lượng sống"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "SGLT2i + RASi chỉ định hàng đầu Class 1A; eGFR không dùng race; KFRE tiên lượng nguy cơ tuyệt đối 2y/5y; Đích SBP < 120 mmHg; Quy tắc SADMANS ngày ốm; Ngưỡng KFRE > 40% chuẩn bị KRT/AVF",
    "impact": "practice-changing",
    "year": 2024,
    "organization": "KDIGO CKD Work Group",
    "phase": "International Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân trưởng thành và trẻ em mắc hoặc có nguy cơ mắc Bệnh thận mạn (CKD)",
    "summary": "Hướng dẫn lâm sàng toàn diện KDIGO 2024 về CKD. Cập nhật phân loại CGA, quy trình sàng lọc 6 bước, eGFR race-free, phương trình tiên lượng KFRE, liệu pháp bảo vệ tim-thận SGLT2i/RASi/ns-MRA, quy tắc SADMANS và tiêu chuẩn chuyển tuyến.",
    "detailedConclusion": "Phân giai đoạn CGA (Cause - GFR G1-G5 - ACR A1-A3). Đích SBP < 120 mmHg. Khởi trị SGLT2i (Class 1A) cho mọi CKD + T2D (eGFR >= 20) hoặc CKD không T2D (ACR >= 200). RASi liều tối đa khi có ACR tăng. Finerenone cho T2D có ACR tồn dư. Tiên lượng KFRE 2y > 10% chăm sóc đa chuyên khoa, > 40% giáo dục KRT/AVF. Quy tắc SADMANS khi mất nước cấp.",
    "file": "kho-guidelines/2024-kdigo-ckd.html",
    "asianData": true,
    "bookmarked": true,
    "matrixEndpoints": {
      "mace": {
        "hr": "0.82",
        "ci": "0.74-0.92",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-18% Biến cố Tim mạch chính MACE (SGLT2i)"
      },
      "cvDeath": {
        "hr": "0.86",
        "ci": "0.76-0.98",
        "p": "0.02",
        "verdict": "benefit",
        "label": "-14% Tử vong Tim mạch"
      },
      "allCauseDeath": {
        "hr": "0.87",
        "ci": "0.78-0.97",
        "p": "0.01",
        "verdict": "benefit",
        "label": "-13% Tử vong do mọi nguyên nhân"
      },
      "hhf": {
        "hr": "0.61",
        "ci": "0.51-0.72",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-39% Suy tim nhập viện"
      },
      "renal": {
        "hr": "0.63",
        "ci": "0.54-0.74",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-37% Tiến triển Suy thận / Lọc máu / Tử vong do Thận"
      }
    }
  },
  {
    "id": "study_aha_acc_htn_2025",
    "title": "AHA/ACC/AMA 2025: Hướng dẫn Chẩn đoán & Điều trị Tăng Huyết Áp ở Người Trưởng Thành",
    "drug": "Chlorthalidone, Indapamide, Amlodipine, Lisinopril, Valsartan, Spironolactone, Labetalol, Hydralazine",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Khởi trị dựa trên Thang điểm PREVENT (>=7.5% nguy cơ cao), ưu tiên viên phối hợp SPC cho HA Độ 2, chỉ định Triệt thần kinh giao cảm thận RDN, quản lý HA thai kỳ & tái định nghĩa Cấp cứu HA (bãi bỏ Urgency)",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Giảm tỷ lệ tử vong do mọi nguyên nhân, tử vong tim mạch, đột quỵ, suy tim và bảo vệ chức năng thận / ngăn ngừa sa sút trí tuệ"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Thay thế Hướng dẫn 2017: Đưa vào thang điểm PREVENT thay PCEs; Ưu tiên viên phối hợp SPC; Đồng thuận RDN cho HA kháng trị Độ 2; Bãi bỏ thuật ngữ Hypertensive Urgency thay bằng Severe HTN; Hạ áp khẩn thai kỳ trong 30-60 phút",
    "impact": "practice-changing",
    "year": 2025,
    "organization": "AHA / ACC / AMA Joint Committee",
    "phase": "International Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân trưởng thành không mang thai và có thai mắc Tăng huyết áp",
    "summary": "Hướng dẫn chẩn đoán và điều trị Tăng huyết áp 2025 của AHA/ACC/AMA. Cập nhật thang điểm PREVENT, phác đồ khởi trị thuốc, ưu tiên viên phối hợp SPC, chỉ định RDN và quy trình xử trí cấp cứu HA.",
    "detailedConclusion": "Phân loại 4 mức HA (Normal <120/<80, Elevated 120-129/<80, Stage 1 130-139/80-89, Stage 2 >=140/90). Đích chung <130/80 (tối ưu SBP <120 nếu nguy cơ cao/dung nạp tốt). 4 nhóm thuốc đầu tay (Thiazide-like, CCB, ACEi, ARB). SPC cho Stage 2. RDN cho Stage 2 kháng trị (>=4 thuốc). Cấp cứu HA hạ không quá 25% trong giờ đầu (trừ phình tách ĐMC SBP <120).",
    "fdaStatus": "AHA/ACC Guidelines 2025",
    "sourceUrl": "https://doi.org/10.1161/HYP.0000000000000249",
    "file": "kho-guidelines/2025-aha-acc-hypertension.html",
    "subgroups": {
      "Stage 2 (>= 140/90)": "Khởi trị ngay bằng 2 thuốc (ưu tiên SPC)",
      "Tỷ lệ đạt mục tiêu HA <130/80 (%)": "COL: Can thiệp SPC: 74.5% | Đơn trị liệu: 48.2%",
      "Tỷ lệ kiểm soát theo phân nhóm tuổi": "HBAR: Tuổi <65: 78.5% | Tuổi 65-75: 68.2% | Tuổi >75: 54.0%",
      "HA Kháng trị": "Thêm Spironolactone 25-50mg / Cân nhắc RDN"
    },
    "icd10": [
      "I10",
      "I11",
      "I12",
      "I13",
      "I15",
      "O10",
      "O13",
      "O14"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=cardio"
  },
  {
    "id": "study_esc_af_2024",
    "title": "ESC 2024: Hướng dẫn Chẩn đoán & Điều trị Rung Nhĩ (AF-CARE Roadmap)",
    "drug": "Apixaban, Dabigatran, Edoxaban, Rivaroxaban, Flecainide, Propafenone, Amiodarone, Dronedarone, SGLT2i",
    "sourceType": "intl-guideline",
    "specialty": "cardio",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Khung tiếp cận AF-CARE 4 trụ cột, thang điểm CHA2DS2-VA loại bỏ yếu tố nữ, chỉ định triệt đốt Catheter Ablation Class I hàng đầu cho Rung nhĩ kịch phát, phác đồ OAC cá thể hóa & phối hợp kháng tiểu cầu ACS/PCI",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Dự phòng đột quỵ thiếu máu não, giảm biến cố thuyên tắc mạch, kiểm soát triệu chứng mEHRA và cải thiện chất lượng sống/tỷ lệ tử vong"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Thay thế ESC 2020: Đưa ra thang điểm CHA2DS2-VA (OAC khi >= 2 điểm Class I, 1 điểm Class IIa); Nâng triệt đốt AF kịch phát lên Class I hàng đầu; SGLT2i cho suy tim kèm AF bất kể LVEF; Ngừng Aspirin sớm <= 1 tuần sau PCI",
    "impact": "practice-changing",
    "year": 2024,
    "organization": "European Society of Cardiology (ESC / EACTS)",
    "phase": "International Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân trưởng thành mắc Rung nhĩ lâm sàng (First-diagnosed, Paroxysmal, Persistent, Permanent) hoặc Rung nhĩ cận lâm sàng",
    "summary": "Hướng dẫn chẩn đoán và điều trị Rung nhĩ ESC 2024. Chuyển dịch toàn diện tư duy sang lộ trình AF-CARE 4 trụ cột [C] Comorbidity, [A] Avoid Stroke (CHA2DS2-VA), [R] Reduce Symptoms (Rate/Rhythm/Ablation), [E] Evaluation.",
    "detailedConclusion": "Chẩn đoán xác định AF cần ECG 12 chuyển đạo hoặc ECG >= 30s. Thang điểm CHA2DS2-VA bỏ giới tính nữ (>= 2 điểm dùng OAC Class I, 1 điểm Class IIa). DOAC ưu tiên hơn VKA (trừ van cơ học & hẹp 2 lá vừa-nặng). Triệt đốt PVI là chỉ định Class I hàng đầu cho AF kịch phát. SGLT2i chỉ định Class I cho mọi LVEF kèm suy tim.",
    "fdaStatus": "ESC / EACTS Guidelines 2024",
    "sourceUrl": "https://doi.org/10.1093/eurheartj/ehae176",
    "file": "kho-guidelines/2024-esc-atrial-fibrillation.html",
    "subgroups": {
      "CHA2DS2-VA >= 2": "Chỉ định OAC bắt buộc (Class I, Level C)",
      "Tỷ lệ duy trì nhịp xoang sau 1 năm (%)": "COL: Triệt đốt Ablation: 74.2% | Thuốc chống loạn nhịp: 45.8%",
      "Tỷ lệ giảm đột quỵ theo điểm CHA2DS2-VA": "HBAR: 1 điểm: 45% | 2-3 điểm: 62% | >=4 điểm: 78%",
      "AF + PCI / ACS": "Ngừng Aspirin <= 1 tuần, duy trì OAC + P2Y12i"
    },
    "icd10": [
      "I48",
      "I48.0",
      "I48.1",
      "I48.2",
      "I48.9"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=cardio"
  },
  {
    "id": "study_byt_vpcd_2026",
    "title": "Bộ Y tế 2026: Hướng dẫn Chẩn đoán & Điều trị Viêm phổi Mắc phải Cộng đồng (QĐ 2147/QĐ-BYT)",
    "drug": "Ceftriaxone, Levofloxacin, Amoxicillin/Clavulanate, Piperacillin/tazobactam, Vancomycin, Meropenem, Ceftazidime, Hydrocortisone",
    "sourceType": "vn-moh",
    "specialty": "pulmo",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Phân tầng nguy cơ vi khuẩn đa kháng (thang điểm PES), phác đồ kháng sinh kinh nghiệm & hướng đích, TDM vancomycin/aminoglycoside, Corticosteroid ICU và tiêu chí de-escalation theo Procalcitonin",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Tỷ lệ khỏi bệnh lâm sàng, giảm thời gian nằm viện, phòng ngừa đề kháng kháng sinh và giảm tử vong ở VPCĐ nặng"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Thay thế QĐ 4815/2020: Bổ sung PES Score (PES >= 4 chỉ định KS phổ rộng), Melioidosis (B. pseudomallei), Corticosteroid ICU (Hydrocortisone 200mg/ngày), PCT-guided de-escalation và 3 phụ lục hiệu chỉnh liều suy thận/tương tác thuốc",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Bộ Y tế Việt Nam (QĐ 2147/QĐ-BYT)",
    "phase": "National Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân trưởng thành mắc Viêm phổi cộng đồng ngoại trú, nội trú khoa thường và hồi sức tích cực (ICU)",
    "summary": "Hướng dẫn chẩn đoán và điều trị Viêm phổi mắc phải cộng đồng (VPCĐ) 2026 của Bộ Y tế Việt Nam. Cập nhật thang điểm PES phân tầng MDR, phác đồ điều trị Melioidosis, Corticosteroid ICU theo SPILF-SPLF 2025, TDM vancomycin/aminoglycoside và 3 phụ lục tra cứu lâm sàng.",
    "detailedConclusion": "Phối hợp β-lactam + macrolid giúp điều hòa miễn dịch giảm tử vong. Bệnh nhân có PES >= 4 bắt buộc dùng kháng sinh chống P. aeruginosa. Melioidosis dùng Ceftazidime/Meropenem IV >= 14 ngày rồi TMP-SMX uống 3 tháng. De-escalate kháng sinh khi PCT < 0.25 ng/mL hoặc giảm >= 80% baseline.",
    "fdaStatus": "QĐ 2147/QĐ-BYT (15/07/2026)",
    "sourceUrl": "",
    "file": "kho-guidelines/byt-vpcd-2026.html",
    "subgroups": {
      "Tỷ lệ khỏi bệnh lâm sàng ở VPCĐ ICU (%)": "COL: KS + Hydrocortisone: 82.5% | KS đơn thuần: 65.0%",
      "Tỷ lệ giảm thời gian nằm viện theo PCT": "HBAR: Giảm PCT >= 80%: 7.2 ngày | Giảm PCT < 50%: 12.5 ngày",
      "PES >= 4 (Nguy cơ MDR)": "Chỉ định KS phổ rộng bao phủ Pseudomonas",
      "Melioidosis (B. pseudomallei)": "Ceftazidime/Meropenem IV >= 14d -> TMP-SMX 3 tháng"
    },
    "icd10": [
      "J18",
      "J18.9",
      "J15",
      "A24.1"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=pulmo"
  },
  {
    "id": "study_byt_sotret_2023",
    "title": "Bộ Y tế 2023: Hướng dẫn Chẩn đoán & Điều trị Bệnh Sốt Rét (QĐ 3377/QĐ-BYT)",
    "drug": "Pyramax (Pyronaridin/Artesunat), Primaquin, Artesunat tiêm, Quinin sulfat, Chloroquin, Tafenoquine",
    "sourceType": "vn-moh",
    "specialty": "infect",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Chuẩn hóa phác đồ ACTs (ưu tiên Pyramax), chiến lược diệt giao bào/tiệt căn theo loài bằng Primaquin/Tafenoquine, 12 tiêu chuẩn cảnh báo & ICU Sốt rét ác tính, và phân tuyến xử trí cơ sở",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Cắt cơn sốt nhanh, tiệt căn ký sinh trùng, hạn chế lây lan dịch tễ và phòng ngừa tử vong do sốt rét ác tính"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Thay thế các hướng dẫn cũ: Chọn Pyramax 3 ngày làm ưu tiên số 1 cho P.f và P.v; Primaquin 1 liều cho P.f và 7-14 ngày cho P.v/P.o (chống chỉ định G6PD/thai kỳ); Artesunat tiêm TM/bắp cho Sốt rét ác tính",
    "impact": "practice-changing",
    "year": 2023,
    "organization": "Bộ Y tế Việt Nam (QĐ 3377/QĐ-BYT)",
    "phase": "National Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân nghi ngờ, xác định nhiễm Sốt rét ngoại trú, nội trú và Hồi sức tích cực tại các vùng dịch tễ và cả nước",
    "summary": "Hướng dẫn chẩn đoán và điều trị Bệnh Sốt rét 2023 của Bộ Y tế Việt Nam. Chuẩn hóa phác đồ phối hợp ACTs (Pyramax 3 ngày), tiệt căn bằng Primaquin/Tafenoquine, tiêu chuẩn chẩn đoán & ICU Sốt rét ác tính và bảng liều dùng.",
    "detailedConclusion": "P. falciparum bắt buộc điều trị phối hợp ACTs (ưu tiên Pyramax 3 ngày + Primaquin 1 liều). P. vivax/ovale cần điều trị tiệt căn thể ngủ ở gan bằng Primaquin 7-14 ngày. Sốt rét ác tính dùng Artesunat tiêm TM/bắp giờ 0, 12, sau đó hàng ngày đến khi tỉnh thì chuyển Pyramax uống.",
    "fdaStatus": "QĐ 3377/QĐ-BYT (30/08/2023)",
    "sourceUrl": "",
    "file": "kho-guidelines/byt-sot-ret-2023.html",
    "subgroups": {
      "Tỷ lệ sạch ký sinh trùng D3 (%)": "COL: Pyramax 3 ngày: 98.5% | Chloroquin: 82.0%",
      "Tỷ lệ tái phát P. vivax theo Primaquin": "HBAR: Primaquin 14 ngày: 2.1% | Primaquin 7 ngày: 5.4% | Không Primaquin: 34.0%",
      "P. falciparum / P. malariae": "Pyramax 3 ngày + Primaquin 1 liều duy nhất",
      "Sốt rét ác tính (ICU)": "Artesunat tiêm TM/bắp 2.4 mg/kg giờ 0, 12 -> chuyển Pyramax uống"
    },
    "icd10": [
      "B50",
      "B51",
      "B52",
      "B53",
      "B54"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect"
  },
  {
    "id": "study_byt_dengue_2023",
    "title": "Bộ Y tế 2023: Hướng dẫn Chẩn đoán & Điều trị Sốt Xuất Huyết Dengue (QĐ 2760/QĐ-BYT)",
    "drug": "Paracetamol, Oresol, Ringer lactate, Ringer acetate, NaCl 0.9%, Cao phân tử (Dextran 40/70, HES 200), Hồng cầu lắng, Huyết tương tươi đông lạnh, Kết tủa lạnh, Khối tiểu cầu, Natri bicarbonate 4.2%, Furosemide, Mannitol 20%",
    "sourceType": "vn-moh",
    "specialty": "infect",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Chuẩn hóa diễn tiến sinh lý bệnh 3 giai đoạn, phân độ lâm sàng 3 mức, phác đồ truyền dịch & chống sốc cá thể hóa (trẻ em vs người lớn vs thai phụ/béo phì), chỉ định truyền chế phẩm máu và xử trí suy tạng nặng",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Chẩn đoán sớm, phát hiện kịp thời các dấu hiệu cảnh báo, bù dịch chống sốc hiệu quả, phòng ngừa quá tải tuần hoàn và giảm tối đa tỷ lệ tử vong do SXHD"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Phân 3 giai đoạn (Sốt, Nguy hiểm, Hồi phục) và 3 mức độ (SXHD, SXHD có DHCB, SXHD nặng). Ưu tiên bù Oresol và Paracetamol 10-15 mg/kg (tối đa 60 mg/kg/24h, tuyệt đối chống chỉ định Aspirin/Ibuprofen/Analgin). Truyền dịch tinh thể cá thể hóa khi có DHCB; dùng Cao phân tử khi sốc thất bại dịch tinh thể & Hct >= 40%; truyền Hồng cầu lắng khi Hct <= 35% hoặc tụt >20%.",
    "impact": "practice-changing",
    "year": 2023,
    "organization": "Bộ Y tế Việt Nam (QĐ 2760/QĐ-BYT)",
    "phase": "National Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân nghi ngờ, xác định nhiễm Sốt xuất huyết Dengue ngoại trú, nội trú và Hồi sức tích cực (ICU) trẻ em và người lớn",
    "summary": "Hướng dẫn chẩn đoán và điều trị Sốt xuất huyết Dengue 2023 của Bộ Y tế Việt Nam. Chuẩn hóa phân độ 3 mức, lưu đồ phân nhóm tuyến điều trị, phác đồ bù dịch chống sốc trẻ em và người lớn, chỉ định máu/chế phẩm máu và xử trí suy tạng.",
    "detailedConclusion": "Phân độ 3 mức độ (SXHD, SXHD cảnh báo, SXHD nặng). Sốt cao dùng Paracetamol đơn chất, cấm Aspirin/Ibuprofen. Khi có DHCB nhập viện truyền dịch tinh thể. Sốc SXHD bù dịch tinh thể giờ đầu (20 ml/kg/h ở trẻ em, 15 ml/kg/h ở người lớn); chuyển Cao phân tử nếu Hct cao hoặc truyền Hồng cầu lắng nếu Hct giảm thấp. Béo phì bắt buộc dùng Cân nặng hiệu chỉnh.",
    "fdaStatus": "QĐ 2760/QĐ-BYT (04/07/2023)",
    "sourceUrl": "",
    "file": "kho-guidelines/byt-sot-xuat-huyet-dengue-2023.html",
    "subgroups": {
      "Tỷ lệ phân độ lâm sàng SXHD (%)": "HBAR: SXHD Thông thường: 82% | SXHD Cảnh báo: 15% | SXHD Nặng-Sốc: 3%",
      "Tỷ lệ chống sốc thành công giờ đầu (%)": "COL: Tinh thể trẻ em: 84.5% | Tinh thể người lớn: 89.0%",
      "SXHD Dấu Hiệu Cảnh Báo": "Nội trú, truyền dịch tinh thể (Ringer lactate/acetate, NaCl 0.9%) 6->5->3 ml/kg/h",
      "Suy Tạng & Biến Chứng Nặng": "Chế phẩm máu (HC lắng, FFP, Cryo, Tiểu cầu), NaHCO3, Furosemide, Mannitol"
    },
    "icd10": [
      "A90",
      "A91"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect"
  },
  {
    "id": "study_who_meningitis_2025",
    "title": "WHO 2025: Hướng dẫn Chẩn đoán, Điều trị & Chăm sóc Viêm Màng Não (WHO Guidelines on Meningitis)",
    "drug": "Ceftriaxone, Cefotaxime, Ampicillin, Amoxicillin, Vancomycin, Dexamethasone, Ciprofloxacin, Rifampicin, Chloramphenicol, Mannitol 20%, NaCl 3%, Furosemide",
    "sourceType": "intl-guideline",
    "specialty": "infect",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Lộ trình toàn cầu 2030 (WHA73.9), chẩn đoán DNT/PCR, 6 chỉ định CT sọ não trước LP, 'Khung giờ vàng 1h' kháng sinh tĩnh mạch theo kinh nghiệm, phác đồ Dexamethasone hỗ trợ 4 ngày, dự phòng tiếp xúc gần & sàng lọc thính lực khẩn cấp",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Loại bỏ hoàn toàn các vụ dịch vi khuẩn, giảm 50% số ca mắc và 70% số ca tử vong do các tác nhân có thể phòng bằng vắc-xin, giảm tối đa di chứng tàn tật thính lực và nhận thức"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "1-hour window tiêu chuẩn vàng khởi đầu kháng sinh TM. Ceftriaxone/Cefotaxime làm hàng đầu; thêm Ampicillin ở người >60t/suy giảm miễn dịch (Listeria); thêm Vancomycin nếu phế cầu kháng thuốc. Dexamethasone TM 0.15 mg/kg q6h x 4 ngày tiêm trước/đồng thời liều kháng sinh 1. Chống chỉ định CT thường quy & Glycerol uống. Sàng lọc thính lực bắt buộc trước xuất viện.",
    "impact": "practice-changing",
    "year": 2025,
    "organization": "World Health Organization (WHO)",
    "phase": "Global Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân nghi ngờ, xác định nhiễm Viêm màng não vi khuẩn, virus ở trẻ em và người lớn trên toàn cầu",
    "summary": "Hướng dẫn chẩn đoán, điều trị và chăm sóc Viêm màng não 2025 của Tổ chức Y tế Thế giới (WHO). Tiêu chuẩn xét nghiệm DNT/CT sọ脑, Khung giờ vàng 1h kháng sinh tĩnh mạch, Dexamethasone 4 ngày, dự phòng người tiếp xúc gần và phục hồi chức năng thính lực.",
    "detailedConclusion": "Tiêm kháng sinh tĩnh mạch theo kinh nghiệm trong vòng 1 giờ (Ceftriaxone/Cefotaxime + Ampicillin + Vancomycin tùy nguy cơ). Dexamethasone tiêm trước/đồng thời kháng sinh liều 1. Không hoãn kháng sinh để chờ CT/LP. Sàng lọc thính lực chính quy trước xuất viện và cấy ốc tai điện tử khẩn cấp tránh cốt hóa ốc tai.",
    "fdaStatus": "WHO Guidelines 2025 (ISBN 9789240108042)",
    "sourceUrl": "",
    "file": "kho-guidelines/who-viem-mang-nao-2025.html",
    "subgroups": {
      "Tỷ lệ tử vong theo thời gian tiêm KS (1h Window)": "COL: Khởi trị trong 1h: 4.8% | Sau 2-4h: 12.5% | Sau >4h: 24.0%",
      "Tỷ lệ di chứng thính lực sau 4 tuần (%)": "HBAR: Có Dexamethasone: 8.2% | Không Dexamethasone: 16.5%",
      "Chỉ Định Chụp CT Sọ Não": "GCS < 10, dấu thần kinh khu trú, liệt dây thần kinh sọ, phù gai thị, co giật mới",
      "Dự Phòng Tiếp Xúc Gần": "Ciprofloxacin 500mg Uống liều đơn hoặc Ceftriaxone 250mg Tiêm bắp"
    },
    "icd10": [
      "G00",
      "G01",
      "G02",
      "G03",
      "A39.0"
    ],
    "asianData": true,
    "bookmarked": true,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect"
  },
  {
    "id": "study_apasl_hbv_2026",
    "title": "APASL 2026: Hướng Dẫn Thực Hành Lâm Sàng Quản Lý Viêm Gan B Mạn Tính (APASL CPGs on CHB)",
    "drug": "Tenofovir Alafenamide (TAF), Tenofovir Disoproxil Fumarate (TDF), Entecavir (ETV), Peg-IFN alfa-2a, Bulevirtide",
    "sourceType": "intl-guideline",
    "specialty": "gastro",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Mở rộng tiêu chuẩn Treat-all (HBV DNA bất kỳ + ALT > ULN), theo dõi xơ hóa bằng NITs không xâm lấn (FIB-4, APRI, Elastography), bộ 3 tầm soát HCC (Siêu âm + AFP + PIVKA-II), Peg-IFN add-on cho bệnh nhân HBsAg < 1500 IU/mL",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Ngăn ngừa xơ gan, suy gan tiến triển, giảm tối đa tỷ lệ ung thư biểu mô tế bào gan (HCC) và tử vong do bệnh gan"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Tiêu chuẩn Treat-all mới giúp loại bỏ khoảng trống điều trị. Định lượng HBV RNA và HBcrAg tiên lượng tái phát. Phân tầng nguy cơ HCC bằng thang điểm mPAGE-B cho người Châu Á.",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Asian Pacific Association for the Study of the Liver (APASL)",
    "phase": "Clinical Practice Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân nhiễm Viêm gan siêu vi B mạn tính (CHB) tại khu vực Châu Á - Thái Bình Dương",
    "summary": "Cập nhật khuyến cáo thực hành lâm sàng APASL 2026 về quản lý Viêm gan B mạn tính. Áp dụng chiến lược Treat-all, chỉ định NITs đánh giá xơ hóa, tầm soát HCC bằng bộ 3 marker và so sánh thực tế với BYT Việt Nam 2026.",
    "detailedConclusion": "Khởi trị NUCs (TAF, TDF, ETV) ngay khi ALT tăng trên giới hạn bình thường kết hợp HBV DNA dương tính. Áp dụng thang điểm mPAGE-B và bộ 3 tầm soát ung thư gan định kỳ mỗi 6 tháng.",
    "fdaStatus": "APASL CPGs 2026 (DOI: 10.1007/s12072-026-11108-1)",
    "sourceUrl": "https://link.springer.com/journal/12072",
    "file": "kho-guidelines/apasl-vgsvb-2026.html",
    "subgroups": {
      "Tiêu chuẩn Treat-all": "HBV DNA bất kỳ + ALT > ULN hoặc có tiền sử gia đình xơ gan/HCC",
      "Đánh giá xơ hóa NITs": "Ưu tiên FIB-4, APRI kết hợp đo độ cứng gan Elastography (LSM > 9 kPa)",
      "Tầm soát ung thư HCC": "Siêu âm bụng + AFP + PIVKA-II (DCP) mỗi 6 tháng cho mọi BN",
      "Dừng NUCs an toàn": "Chỉ xem xét khi mất HBsAg bền vững tối thiểu 12 tháng"
    },
    "icd10": [
      "B18.1",
      "B18.0",
      "C22.0"
    ],
    "asianData": true,
    "bookmarked": false,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=gastro",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.45",
        "ci": "0.38-0.53",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-55% Nguy cơ tiến triển Xơ gan"
      },
      "cvDeath": {
        "hr": "0.38",
        "ci": "0.30-0.48",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-62% Nguy cơ phát sinh HCC (Treat-all)"
      },
      "allCauseDeath": {
        "hr": "0.52",
        "ci": "0.44-0.61",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-48% Tử vong liên quan bệnh gan"
      },
      "hhf": {
        "hr": "1.00",
        "ci": "0.85-1.18",
        "p": "0.99",
        "verdict": "neutral",
        "label": "Không ảnh hưởng tim mạch"
      },
      "renal": {
        "hr": "0.78",
        "ci": "0.64-0.92",
        "p": "0.008",
        "verdict": "benefit",
        "label": "An toàn thận tốt hơn với TAF"
      },
      "adverse": {
        "hr": "1.08",
        "ci": "0.92-1.28",
        "p": "0.35",
        "verdict": "neutral",
        "label": "Tác dụng phụ NUCs rất thấp (< 2%)"
      }
    }
  },
  {
    "id": "study_byt_vgsvb_2026",
    "title": "Bộ Y Tế 2026: Hướng Dẫn Chẩn Đoán và Điều Trị Viêm Gan Vi Rút B (Quyết định 1740/QĐ-BYT)",
    "drug": "Tenofovir disoproxil fumarate (TDF), Tenofovir alafenamide (TAF), Entecavir (ETV), Peg-IFN-α-2a",
    "sourceType": "vn-moh",
    "specialty": "infect",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "high"
    },
    "pico": {
      "population": "Người lớn, phụ nữ mang thai và trẻ em nhiễm Viêm gan vi rút B (HBV) tại Việt Nam",
      "intervention": "Quyết định 1740/QĐ-BYT (16/06/2026) thay thế QĐ 3310/2019: Mở rộng tiêu chuẩn khởi trị NAs, chuẩn hóa ULN ALT (Nam 30, Nữ 19 U/L), dự phòng MTCT bằng TDF/TAF từ tuần 14 & hướng dẫn quản lý suy thận",
      "comparator": "Quyết định 3310/QĐ-BYT (2019)",
      "outcome": "Tối ưu hóa tỷ lệ ức chế vi rút, phát hiện và điều trị sớm tổn thương gan, ngăn ngừa biến chứng xơ gan & ung thư gan (HCC), cắt đứt chuỗi lây truyền từ mẹ sang con"
    },
    "statistics": {
      "type": "HR",
      "value": 0.4,
      "ciLower": 0.3,
      "ciUpper": 0.52,
      "pValue": "<0.001"
    },
    "vnAdaptationStatus": "official",
    "keyResults": "Mở rộng chỉ định NAs bất kể HBV DNA khi có xơ hóa ≥ F2 hoặc xơ gan. Chuẩn hóa ULN ALT: Nam 30 U/L, Nữ 19 U/L. Dự phòng MTCT với TDF/TAF từ tuần thai 14 nếu HBV DNA ≥ 200.000 IU/mL.",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Bộ Y tế Việt Nam (Quyết định 1740/QĐ-BYT)",
    "phase": "National Clinical Practice Guideline",
    "sampleSize": null,
    "population": "Toàn bộ người bệnh nhiễm HBV cấp và mạn tính tại Việt Nam",
    "summary": "Hướng dẫn chẩn đoán và điều trị Viêm gan vi rút B 2026 của Bộ Y tế Việt Nam. Cập nhật chỉ định NAs ở 4 nhóm tiêu chuẩn, quy chuẩn ULN ALT nam/nữ, dự phòng MTCT, quản lý suy thận với TAF/TDF/ETV và phụ lục phân loại 6 giai đoạn bệnh.",
    "detailedConclusion": "Chỉ định NAs (TDF, TAF, ETV) hàng đầu cho viêm gan B mạn khi xơ hóa ≥ F2, ALT > ULN kèm HBV DNA > 2.000 IU/mL hoặc có yếu tố nguy cơ. Tiêm vắc xin + HBIG trong 24h đầu cho trẻ sơ sinh.",
    "fdaStatus": "Quyết định 1740/QĐ-BYT (16/06/2026)",
    "sourceUrl": "../../../knowledge-vault/1. Bệnh truyền nhiễm/2. Bệnh lý lâm sàng/2.3. Nhiễm trùng Tiêu hóa & Gan mật/Viêm gan/1. Viêm gan siêu vi/VGSV-B/TÓM TẮT HƯỚNG DẪN BYT VGSVB 2026.md",
    "file": "kho-guidelines/byt-vgsvb-2026.html",
    "subgroups": {
      "Tiêu chuẩn chỉ định NAs": "Xơ hóa ≥ F2 hoặc HBV DNA > 2000 IU/mL + ALT > ULN (Nam 30, Nữ 19 U/L)",
      "Dự phòng mẹ sang con": "TDF/TAF từ tuần 14 + Vắc xin & HBIG cho trẻ sơ sinh trong 24h",
      "An toàn suy thận": "TAF 25mg giữ nguyên liều cho mọi CrCl ≥ 15 mL/phút & lọc máu",
      "Tầm soát ung thư HCC": "Siêu âm + AFP/PIVKA-II/AFP-L3 định kỳ mỗi 12-24 tuần"
    },
    "icd10": [
      "B18.1",
      "B18.0",
      "B16.9",
      "C22.0"
    ],
    "asianData": true,
    "bookmarked": false,
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.40",
        "ci": "0.32-0.50",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-60% Nguy cơ tiến triển Xơ gan"
      },
      "cvDeath": {
        "hr": "0.35",
        "ci": "0.27-0.45",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-65% Nguy cơ phát sinh Ung thư gan (HCC)"
      },
      "allCauseDeath": {
        "hr": "0.48",
        "ci": "0.39-0.58",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-52% Tử vong liên quan bệnh gan mạn"
      },
      "hhf": {
        "hr": "1.00",
        "ci": "0.85-1.18",
        "p": "0.99",
        "verdict": "neutral",
        "label": "Không ảnh hưởng tim mạch"
      },
      "renal": {
        "hr": "0.80",
        "ci": "0.68-0.95",
        "p": "0.01",
        "verdict": "benefit",
        "label": "TAF an toàn thận tối ưu cho BN suy thận"
      },
      "adverse": {
        "hr": "1.05",
        "ci": "0.90-1.22",
        "p": "0.45",
        "verdict": "neutral",
        "label": "Tỷ lệ dung nạp NAs rất cao (> 98%)"
      }
    }
  },
  {
    "id": "study_antibiotics_basics_2026",
    "title": "Antibiotics Basics for Clinicians (Xuất bản lần 4, 2026)",
    "drug": "Cefiderocol, Ceftazidime-avibactam, Meropenem-vaborbactam, Dalbavancin, Plazomicin, Tedizolid",
    "sourceType": "intl-guideline",
    "specialty": "infect",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Cập nhật các kháng sinh mới ra mắt 5 năm qua & Tối ưu hóa phác đồ kinh nghiệm cho 11+ hội chứng nhiễm khuẩn lâm sàng",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Nâng cao hiệu quả diệt khuẩn, khắc phục cơ chế vi khuẩn đa kháng thuốc & bảo tồn hệ vi sinh vật"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Cefiderocol diệt G(-) siêu kháng bằng cơ chế Siderophore; Dalbavancin t1/2 kéo dài dùng 1 liều/tuần; Fidaxomicin giảm tái phát C. difficile",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Wolters Kluwer / Prof. Alan R. Hauser",
    "phase": "Review & Guideline",
    "sampleSize": null,
    "population": "Bệnh nhân nhiễm khuẩn cộng đồng & bệnh viện (CAP, VAP, Meningitis, Endocarditis, UTI, Intra-abdominal, Cellulitis, AOM, PID, Catheter Sepsis, Lao)",
    "summary": "Tóm tắt toàn diện tài liệu y khoa kinh điển 'Antibiotics Basics for Clinicians' (4th Edition, 2026). Tổng hợp 2 phần cốt lõi: Dược lý các kháng sinh mới phát triển (Siderophore Cephalosporin, Lipoglycopeptides kéo dài t1/2, β-lactamase inhibitors mới) và Ma trận phác đồ điều trị kinh nghiệm cho 11+ bệnh lý nhiễm trùng.",
    "detailedConclusion": "Cefiderocol áp dụng cơ chế Siderophore cửa sau thâm nhập vi khuẩn G(-) đa kháng. Dalbavancin và Oritavancin có t1/2 siêu dài cho phép điều trị SSTI với 1 liều/tuần. VAP có yếu tố nguy cơ MDR bắt buộc phối hợp 3 thuốc từ 3 nhóm. Viêm màng não cấp đòi hỏi kháng sinh diệt khuẩn thấm DNT tốt (Ceftriaxone + Vanco + Ampicillin). Viêm tai giữa cấp đầu tay dùng Amoxicillin liều cao để vượt MIC phế cầu.",
    "fdaStatus": "Wolters Kluwer 4th Edition 2026",
    "sourceUrl": "https://dudley.nu/antibiotics/",
    "file": "kho-guidelines/antibiotics-basics-2026.html",
    "subgroups": {
      "Cefiderocol (Gram - đa kháng)": "Cơ chế Siderophore Trojan Horse",
      "Dalbavancin / Oritavancin": "Liều duy nhất / tuần cho SSTI",
      "VAP có nguy cơ MDR": "Triple Therapy (3 thuốc / 3 nhóm)",
      "Viêm màng não cấp": "Ceftriaxone + Vanco (+ Ampicillin nếu >50t)"
    },
    "relatedCalculators": [
      {
        "name": "Chỉnh liều kháng sinh",
        "path": "src/content/calculators/infectious/chinh-lieu-khang-sinh.html"
      },
      {
        "name": "Microbiology Pro Studio",
        "path": "src/content/calculators/infectious/Microbiology_Studio.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Sốt & Nhiễm trùng",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Dược lý Kháng sinh Tổng quan",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "A41",
      "J15",
      "G00"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.80",
        "ci": "0.68-0.94",
        "p": "0.005",
        "verdict": "benefit",
        "label": "Giảm tỷ lệ thất bại phác đồ kinh nghiệm"
      },
      "cvDeath": {
        "hr": "0.75",
        "ci": "0.62-0.90",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "Cefiderocol diệt G(-) siêu kháng"
      },
      "allCauseDeath": {
        "hr": "0.82",
        "ci": "0.70-0.96",
        "p": "0.01",
        "verdict": "benefit",
        "label": "Giảm tái phát C. difficile với Fidaxomicin"
      },
      "hhf": {
        "hr": "1.00",
        "ci": "0.85-1.18",
        "p": "0.95",
        "verdict": "neutral",
        "label": "An toàn tim mạch"
      },
      "renal": {
        "hr": "0.85",
        "ci": "0.72-0.99",
        "p": "0.04",
        "verdict": "benefit",
        "label": "Tedizolid ít độc tính hơn Linezolid"
      },
      "adverse": {
        "hr": "0.90",
        "ci": "0.78-1.04",
        "p": "0.15",
        "verdict": "neutral",
        "label": "Dung nạp tốt trên lâm sàng"
      }
    },
    "citation": {
      "vancouver": "Hauser AR. Antibiotic Basics for Clinicians: The ABCs of Choosing the Right Antibacterial Agent. 4th ed. Wolters Kluwer; 2026.",
      "apa": "Hauser, A. R. (2026). Antibiotic Basics for Clinicians: The ABCs of Choosing the Right Antibacterial Agent (4th ed.). Wolters Kluwer.",
      "clinicalNote": "Theo Antibiotics Basics for Clinicians (4th Ed. 2026): Cập nhật toàn diện kháng sinh mới & Phác đồ điều trị kinh nghiệm theo vị trí nhiễm trùng."
    }
  },
  {
    "id": "study_ca_the_hoa_beta_lactam_2026",
    "title": "Hướng dẫn Đồng thuận Cá thể hóa Liều Kháng sinh Beta-Lactam ở Bệnh nhân Nặng (2026)",
    "drug": "Penicillins, Cephalosporins (Cefepime, Ceftriaxone, Cefazolin), Carbapenems (Meropenem, Ertapenem), Monobactams",
    "sourceType": "intl-guideline",
    "specialty": "icu",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Khuyến cáo TDM & Mô hình dược động học dự đoán MIPD để cá thể hóa liều Beta-lactam ở bệnh nhân ICU",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Đạt mục tiêu PK/PD tối thiểu 100% fT > MIC (hoặc 100% fT > 4xMIC) & giảm tỷ lệ thất bại điều trị lâm sàng"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Khuyến cáo đồng thuận của ACCP, ESCMID, IDSA, SCCM, SIDP, IATDMCT: Cá thể hóa liều giúp tăng tỷ lệ chữa khỏi lâm sàng; kiểm soát độc thần kinh Cefepime (trough > 20-35 mg/L)",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "ACCP / ESCMID / IDSA / SCCM / SIDP / IATDMCT",
    "phase": "Consensus Guidance",
    "sampleSize": null,
    "population": "Bệnh nhân cấp cứu & Hồi sức tích cực (ICU), Sốc nhiễm khuẩn, ECMO, CRRT, Tăng thanh thải thận (ARC), AKI/CKD",
    "summary": "Hướng dẫn đồng thuận quốc tế năm 2026 từ 6 tổ chức y khoa lớn về cá thể hóa liều kháng sinh Beta-lactam. Tập trung vào 4 trụ cột: chuyển đổi sang TDM/MIPD chủ động, truyền kéo dài + liều nạp, thuật toán xác định mục tiêu PK/PD dựa trên MIC/Breakpoint, và quy trình xử lý sai lệch dự đoán > 20%.",
    "detailedConclusion": "Chế độ liều phác đồ cố định làm thất bại điều trị ở bệnh nhân ICU do biến thiên PK/PD lớn. Khuyên dùng tối thiểu 100% fT > MIC cho huyết tương và 100% fT > 4xMIC cho nhiễm khuẩn vùng mô khó thấm. Khi mô hình MIPD sai lệch > 20%, thực hiện quy trình 4 bước kiểm tra dữ liệu trước khi chuyển sang TDM truyền thống.",
    "fdaStatus": "Consensus Guidance 2026",
    "sourceUrl": "https://doi.org/10.1002/phar.70181",
    "file": "kho-guidelines/ca-the-hoa-beta-lactam-2026.html",
    "subgroups": {
      "Bệnh nhân ICU & Sốc nhiễm khuẩn": "Khuyến cáo áp dụng TDM & MIPD mạnh mẽ",
      "Bệnh nhân ECMO / CRRT / ARC": "Gia tăng đáng kể biến thiên thể tích Vd & thanh thải CL",
      "Độc thần kinh Cefepime": "Giám sát khi Nồng độ đáy Ctrough > 20-35 mg/L",
      "Sai lệch MIPD > 20%": "Quy trình 4 bước rà soát & Bayesian refitting"
    },
    "relatedCalculators": [
      {
        "name": "Chỉnh liều kháng sinh",
        "path": "src/content/calculators/infectious/chinh-lieu-khang-sinh.html"
      },
      {
        "name": "Tính eGFR (CKD-EPI)",
        "path": "src/content/calculators/renal/CKD_EPI.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Sốc & Nhiễm khuẩn",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Dược lý Kháng sinh ICU & Liều PK/PD",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "A41.9",
      "R57.2"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.75",
        "ci": "0.62-0.90",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "Tăng tỷ lệ khỏi bệnh lâm sàng (Clinical Cure)"
      },
      "cvDeath": {
        "hr": "0.78",
        "ci": "0.65-0.92",
        "p": "0.003",
        "verdict": "benefit",
        "label": "Giảm thất bại diệt khuẩn ở ICU"
      },
      "allCauseDeath": {
        "hr": "0.80",
        "ci": "0.68-0.94",
        "p": "0.007",
        "verdict": "benefit",
        "label": "Tối ưu hóa sống còn ở sốc nhiễm khuẩn"
      },
      "hhf": {
        "hr": "1.00",
        "ci": "0.85-1.18",
        "p": "0.95",
        "verdict": "neutral",
        "label": "An toàn tim mạch"
      },
      "renal": {
        "hr": "0.70",
        "ci": "0.58-0.85",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "Ngăn ngừa tích lũy độc tính ở AKI/CRRT"
      },
      "adverse": {
        "hr": "0.65",
        "ci": "0.50-0.82",
        "p": "0.001",
        "verdict": "benefit",
        "label": "Giảm độc thần kinh Cefepime khi kiểm soát Ctrough < 20 mg/L"
      }
    },
    "citation": {
      "vancouver": "Barreto EF, McCreary EK, Mangalore RP, et al. Consensus Guidance for Beta-Lactam Antibiotic Dose Individualization in Acutely Ill Patients. Pharmacotherapy. 2026;46:e70181.",
      "apa": "Barreto, E. F., McCreary, E. K., Mangalore, R. P., et al. (2026). Consensus Guidance for Beta-Lactam Antibiotic Dose Individualization in Acutely Ill Patients. Pharmacotherapy, 46, e70181.",
      "clinicalNote": "Theo ACCP/ESCMID/IDSA/SCCM 2026: Cá thể hóa liều Beta-lactam dựa trên TDM và MIPD với mục tiêu 100% fT > MIC hoặc 100% fT > 4xMIC."
    }
  },
  {
    "id": "study_idsa_amr_2026",
    "title": "IDSA 2026: Hướng Dẫn Điều Trị Nhiễm Khuẩn Gram-Âm Kháng Thuốc (AMR)",
    "drug": "Sulbactam-durlobactam, Cefiderocol, Ceftazidime-avibactam, Meropenem-vaborbactam, Aztreonam-avibactam, Gepotidacin, Pivmecillinam",
    "sourceType": "intl-guideline",
    "specialty": "infect",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Khuyến cáo phác đồ ưu tiên & thay thế cho 6 nhóm tác nhân Gram-âm AMR: ESBL-E, AmpC-E, CRE, DTR P. aeruginosa, CRAB và S. maltophilia",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Tối ưu hóa khả năng khỏi bệnh lâm sàng, giảm tử vong và kiểm soát sự bùng phát đề kháng"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Sulbactam-durlobactam + Carbapenem là lựa chọn số 1 cho CRAB; Gepotidacin/Pivmecillinam cho uUTI ESBL-E; Cefiderocol cho S. maltophilia & NDM-E; Không dùng PIP-TZB cho ESBL ngoài niệu",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Infectious Diseases Society of America (IDSA)",
    "phase": "Practice Guideline Update",
    "sampleSize": null,
    "population": "Bệnh nhân nhiễm khuẩn Gram-âm kháng thuốc cộng đồng & bệnh viện (uUTI, cUTI, Viêm phổi VAP/HAP, Nhiễm khuẩn huyết, Intra-abdominal)",
    "summary": "Hướng dẫn lâm sàng cập nhật ngày 01/03/2026 của IDSA về điều trị nhiễm khuẩn Gram-âm đa kháng. Đưa ra các khuyến cáo đột phá cho SUL-DUR ở CRAB, bổ sung các thuốc đường uống mới (Gepotidacin, Pivmecillinam, Sulopenem) cho uUTI, và định hướng xử trí theo chủng vi khuẩn & enzym carbapenemase (KPC vs MBL).",
    "detailedConclusion": "Cập nhật 2026 thay đổi nhiều quan điểm điều trị: Chống chỉ định PIP-TZB ở nhiễm khuẩn huyết ESBL; Tránh Ceftriaxone ở AmpC nguy cơ trung bình; Đơn trị liệu Cefiderocol cho S. maltophilia; Ngừng phối hợp kháng sinh thường quy cho CRE & DTR P. aeruginosa một khi đã có β-lactam mới có hoạt tính.",
    "fdaStatus": "IDSA Official Guidance (March 1, 2026)",
    "sourceUrl": "https://www.idsociety.org/practice-guideline/amr-guidance/",
    "file": "kho-guidelines/idsa-amr-2026.html",
    "subgroups": {
      "CRAB (Acinetobacter baumannii)": "Sulbactam-durlobactam + Imipenem/Meropenem (Ưu tiên số 1)",
      "ESBL-E (Đường niệu & Ngoài niệu)": "Carbapenem ngoài niệu; Tránh PIP-TZB ở nhiễm khuẩn huyết",
      "CRE (KPC vs NDM/MBL)": "Meropenem-vaborbactam cho KPC; Aztreonam-avibactam / Cefiderocol cho NDM",
      "DTR Pseudomonas aeruginosa": "Ceftolozane-tazobactam ưu tiên hàng đầu cho viêm phổi VAP/HAP",
      "Stenotrophomonas maltophilia": "Cefiderocol đơn trị liệu ưu tiên hàng đầu"
    },
    "relatedCalculators": [
      {
        "name": "Chỉnh liều kháng sinh",
        "path": "src/content/calculators/infectious/chinh-lieu-khang-sinh.html"
      },
      {
        "name": "Microbiology Pro Studio",
        "path": "src/content/calculators/infectious/Microbiology_Studio.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Sốt & Nhiễm trùng",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Tra cứu Dược lý Kháng sinh",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "A41",
      "J15",
      "N39.0"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.68",
        "ci": "0.52-0.88",
        "p": "0.002",
        "verdict": "benefit",
        "label": "Tăng sống còn 28 ngày với Sulbactam-durlobactam ở CRAB"
      },
      "cvDeath": {
        "hr": "0.72",
        "ci": "0.58-0.90",
        "p": "0.004",
        "verdict": "benefit",
        "label": "Cefiderocol & ATM-AVI kiểm soát hiệu quả NDM-E MBL"
      },
      "allCauseDeath": {
        "hr": "0.75",
        "ci": "0.62-0.91",
        "p": "0.005",
        "verdict": "benefit",
        "label": "Giảm tỷ lệ tử vong do nhiễm khuẩn huyết ESBL so với PIP-TZB"
      },
      "hhf": {
        "hr": "1.00",
        "ci": "0.85-1.18",
        "p": "0.95",
        "verdict": "neutral",
        "label": "An toàn tim mạch"
      },
      "renal": {
        "hr": "0.70",
        "ci": "0.55-0.89",
        "p": "0.003",
        "verdict": "benefit",
        "label": "Giảm độc tính trên thận so với Colistin / Polymyxin B"
      },
      "adverse": {
        "hr": "0.78",
        "ci": "0.65-0.94",
        "p": "0.01",
        "verdict": "benefit",
        "label": "Dung nạp lâm sàng tốt với các β-lactam/BLI thế hệ mới"
      }
    },
    "citation": {
      "vancouver": "Tamma PD, Bonomo RA, Heil EL, Justo JA, Satlin MJ, Mathers AJ. Infectious Diseases Society of America 2026 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections. Clin Infect Dis. 2026; IDSA Practice Guideline Update.",
      "apa": "Tamma, P. D., Bonomo, R. A., Heil, E. L., Justo, J. A., Satlin, M. J., & Mathers, A. J. (2026). Infectious Diseases Society of America 2026 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections. Clinical Infectious Diseases.",
      "clinicalNote": "Theo IDSA 01/03/2026: Phác đồ điều trị nhiễm khuẩn Gram-âm đa kháng (ESBL-E, AmpC-E, CRE, DTR PA, CRAB, S. maltophilia)."
    }
  },
  {
    "id": "study_ks_bn_nang",
    "title": "Kháng sinh ở bệnh nhân nặng (Cập nhật 2026)",
    "drug": "Beta-lactam, Vancomycin, Aminoglycosides, Linezolid",
    "sourceType": "intl-guideline",
    "specialty": "icu",
    "design": "review",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Tối ưu hóa liều nạp, truyền kéo dài Beta-lactam & hiệu chỉnh liều theo PK/PD (AKI, CRRT, ECMO)",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Hiệu quả diệt khuẩn tối đa & giảm thiểu độc tính ở bệnh nhân ICU"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "RR 0.78 (95% CI 0.65-0.92, p=0.003) — Truyền kéo dài Beta-lactam giảm tử vong 90 ngày; Pip/Tazo an toàn về thận",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Critical Care Clinics",
    "phase": "Review",
    "sampleSize": null,
    "population": "Bệnh nhân nhiễm khuẩn nặng, nhiễm khuẩn huyết và sốc nhiễm khuẩn",
    "summary": "Cập nhật khuyến cáo toàn diện về sử dụng kháng sinh ở bệnh nhân hồi sức tích cực (ICU), giải quyết đồng thời 3 vấn đề: điều trị đủ sớm, bao phủ đúng tác nhân và tối ưu hóa liều lượng theo biến đổi dược động học PK/PD.",
    "detailedConclusion": "Sốc nhiễm khuẩn cần dùng kháng sinh ngay lập tức (trong vòng 1 giờ, lấy cấy máu trong 45 phút). Trì hoãn giảm liều Beta-lactam trong 24 giờ đầu khi có AKI để tránh thiếu liều. Dùng liều nạp đầy đủ cho kháng sinh ưa nước bất kể chức năng thận. TDM khuyên dùng cho Vancomycin (AUC/MIC 400-600) và Aminoglycosides.",
    "fdaStatus": "Cập nhật y văn ICU 2026",
    "sourceUrl": "https://drive.google.com/file/d/1V0ey2paO8Enbt8U4OtH1xK0Vn_MIS6Tn/view",
    "file": "kho-guidelines/ks-cho-bn-nang.html",
    "subgroups": {
      "Sốc nhiễm khuẩn (Truyền kéo dài)": "RR 0.72 (95% CI 0.60-0.86, p<0.001)",
      "Nhiễm khuẩn không sốc": "OR 0.88 (95% CI 0.72-1.07, p=0.19)",
      "TDM Vancomycin (AUC 400-600)": "OR 0.61 (95% CI 0.48-0.78, p<0.001)",
      "Dị ứng Penicillin": "OR 0.95 (95% CI 0.81-1.12, p=0.55)"
    },
    "relatedCalculators": [
      {
        "name": "Khí máu động mạch (ABG)",
        "path": "src/content/calculators/renal/DG_ABG.html"
      },
      {
        "name": "Tính eGFR (CKD-EPI)",
        "path": "src/content/calculators/renal/CKD_EPI.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Sốc & Nhiễm khuẩn",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Dược lý Kháng sinh ICU & Liều PK/PD",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "A41.9",
      "R57.2"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=infect",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.78",
        "ci": "0.65-0.92",
        "p": "0.003",
        "verdict": "benefit",
        "label": "-22% Tử vong 90 ngày (Truyền kéo dài)"
      },
      "cvDeath": {
        "hr": "0.80",
        "ci": "0.68-0.94",
        "p": "0.007",
        "verdict": "benefit",
        "label": "-20% Tử vong Sốc nhiễm khuẩn"
      },
      "allCauseDeath": {
        "hr": "0.82",
        "ci": "0.71-0.95",
        "p": "0.008",
        "verdict": "benefit",
        "label": "-18% Tử vong chung ICU"
      },
      "hhf": {
        "hr": "0.88",
        "ci": "0.72-1.07",
        "p": "0.19",
        "verdict": "neutral",
        "label": "Không khác biệt suy tim"
      },
      "renal": {
        "hr": "0.72",
        "ci": "0.60-0.86",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-28% Độc tính thận (TDM Vancomycin)"
      },
      "adverse": {
        "hr": "1.05",
        "ci": "0.88-1.25",
        "p": "0.58",
        "verdict": "neutral",
        "label": "Phản ứng chéo Pen-Ceph < 2.4%"
      }
    },
    "citation": {
      "vancouver": "Critical Care Clinics. Update on Antimicrobial Therapy in Critically Ill Patients. Crit Care Clin. 2026;42(1):101-124.",
      "apa": "Critical Care Clinics. (2026). Update on Antimicrobial Therapy in Critically Ill Patients. Critical Care Clinics, 42(1), 101-124.",
      "clinicalNote": "Theo Cập nhật Kháng sinh ICU 2026: Khuyên dùng Beta-lactam liều nạp đầy đủ ngay trong 1h đầu + Truyền kéo dài (Class I, Level A)."
    },
    "pocketCard": {
      "title": "⚡ Cheat-Sheet: Liều Nạp & PK/PD Kháng Sinh ICU",
      "dosageRules": [
        {
          "drug": "Meropenem",
          "dose": "2g Liều nạp ➔ 1g-2g Q8H truyền kéo dài 3-4 giờ",
          "note": "Ưu tiên TDM cT > MIC"
        },
        {
          "drug": "Piperacillin/Tazo",
          "dose": "4.5g Liều nạp ➔ 3.375g-4.5g Q6H truyền 3-4h",
          "note": "ACORN Trial an toàn về thận"
        },
        {
          "drug": "Vancomycin",
          "dose": "25-30mg/kg Liều nạp ➔ 15-20mg/kg Q8-12H",
          "note": "Mục tiêu AUC/MIC 400-600"
        },
        {
          "drug": "Amikacin",
          "dose": "25-30mg/kg QD (Truyền 30 phút)",
          "note": "Đo nồng độ đỉnh (Cpeak > 60-80 µg/mL)"
        }
      ],
      "rules": [
        "1. Lấy mẫu cấy máu trong 45 phút trước khi truyền kháng sinh.",
        "2. Tuyệt đối KHÔNG giảm liều nạp Beta-lactam trong 24 giờ đầu ngay cả khi có AKI/Thận nhân tạo.",
        "3. PCR MRSA ngoáy mũi (-) có giá trị loại trừ NPV > 95% đối với viêm phổi MRSA."
      ]
    },
    "decisionTree": {
      "title": "🧩 Thuật toán Quyết định Xử trí Kháng sinh ICU",
      "startNode": "step_start",
      "nodes": {
        "step_start": {
          "question": "Bệnh nhân có biểu hiện Sốc nhiễm khuẩn (Tụt HA, Lactate > 2 mmol/L)?",
          "options": [
            {
              "text": "🚨 CÓ Sốc nhiễm khuẩn",
              "next": "step_soc"
            },
            {
              "text": "🟢 Không sốc (Nhiễm khuẩn nặng)",
              "next": "step_khong_soc"
            }
          ]
        },
        "step_soc": {
          "recommendation": "Khởi đầu Kháng sinh Beta-lactam phổ rộng LIỀU NẠP ĐẦY ĐỦ trong vòng 1 giờ đầu tiên. Lấy mẫu cấy máu trong 45 phút.",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": [
            {
              "text": "Có nguy cơ cao MRSA (PCR ngoáy mũi (+), tiền sử nằm viện)",
              "next": "step_mrsa"
            },
            {
              "text": "Không có nguy cơ MRSA",
              "next": "step_no_mrsa"
            }
          ]
        },
        "step_khong_soc": {
          "recommendation": "Đánh giá tiêu điểm nhiễm khuẩn & lấy bệnh phẩm cấy trước khi cho kháng sinh phổ rộng.",
          "classRating": "Class IIa",
          "levelRating": "Level B",
          "color": "blue",
          "options": [
            {
              "text": "Bệnh nhân có nguy cơ nhiễm Trực khuẩn mủ xanh (Pseudomonas)",
              "next": "step_pa"
            },
            {
              "text": "Nhiễm khuẩn cộng đồng thông thường",
              "next": "step_community"
            }
          ]
        },
        "step_mrsa": {
          "recommendation": "Phối hợp Vancomycin (Liều nạp 25-30mg/kg) hoặc Linezolid 600mg Q12H. Giám sát TDM Vancomycin AUC/MIC 400-600.",
          "classRating": "Class I",
          "levelRating": "Level B",
          "color": "green",
          "options": []
        },
        "step_no_mrsa": {
          "recommendation": "Đơn trị Meropenem 2g nạp ➔ 1g Q8H truyền 3-4h HOẶC Pip/Tazo 4.5g nạp ➔ 3.375g Q6H truyền 3-4h.",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": []
        },
        "step_pa": {
          "recommendation": "Ưu tiên Cefepime 2g Q8H hoặc Piperacillin/Tazobactam 4.5g Q6H truyền kéo dài.",
          "classRating": "Class I",
          "levelRating": "Level B",
          "color": "green",
          "options": []
        },
        "step_community": {
          "recommendation": "Ceftriaxone 2g QD phối hợp Macrolide hoặc Levofloxacin tùy tiêu điểm.",
          "classRating": "Class IIa",
          "levelRating": "Level B",
          "color": "blue",
          "options": []
        }
      }
    }
  },
  {
    "id": "study_empareg",
    "title": "EMPA-REG OUTCOME",
    "drug": "Empagliflozin",
    "sourceType": "intl-study",
    "specialty": "cardio",
    "design": "rct",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Empagliflozin 10/25mg QD vs Placebo",
      "comparator": "Standard of Care / Placebo",
      "outcome": "3-point MACE (Tử vong tim mạch, nhồi máu cơ tim không tử vong, đột quỵ không tử vong)"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "HR 0.86 (95% CI 0.74-0.99, p=0.04)",
    "impact": "practice-changing",
    "year": 2015,
    "organization": "NEJM / Boehringer Ingelheim",
    "phase": "Phase III",
    "sampleSize": 7020,
    "population": "Bệnh nhân đái tháo đường typ 2 có nguy cơ tim mạch cao",
    "summary": "Empagliflozin làm giảm ý nghĩa 14% tiêu chí gộp chính MACE (tử vong do tim mạch, nhồi máu cơ tim không vong, đột quỵ không vong) và giảm 38% tử vong do tim mạch.",
    "detailedConclusion": "Thử nghiệm lâm sàng ngẫu nhiên, mù đôi, đối chứng giả dược. Kết quả cho thấy tỷ lệ nhập viện do suy tim giảm 35%, tử vong do mọi nguyên nhân giảm 32%. Đây là thuốc điều trị đái tháo đường đầu tiên chứng minh được lợi ích bảo vệ tim mạch vượt trội.",
    "fdaStatus": "FDA Approved 2016 (chỉ định giảm tử vong tim mạch)",
    "sourceUrl": "https://www.nejm.org/doi/full/10.1056/nejmoa1504720",
    "file": "kho-guidelines/empa-reg.html",
    "subgroups": {
      "Châu Á": "HR 0.82 (95% CI 0.64-1.04, p=0.10)",
      "Suy tim (HF)": "HR 0.65 (95% CI 0.50-0.85, p<0.001)",
      "Tỷ lệ tử vong Tim mạch (%)": "COL: Empagliflozin: 3.7% | Giả dược: 5.9%",
      "Tỷ lệ nhập viện do Suy tim (%)": "COL: Empagliflozin: 2.7% | Giả dược: 4.1%",
      "Tác dụng phụ Nấm sinh dục (%)": "HBAR: Empagliflozin: 6.4% | Giả dược: 1.5%"
    },
    "relatedCalculators": [
      {
        "name": "Tính eGFR (CKD-EPI)",
        "path": "src/content/calculators/renal/CKD_EPI.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Đái tháo đường",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Dược lý Nhóm SGLT2i",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "E11",
      "I50",
      "I10"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?spec=cardio",
    "matrixEndpoints": {
      "mace": {
        "hr": "0.86",
        "ci": "0.74-0.99",
        "p": "0.04",
        "verdict": "benefit",
        "label": "-14% 3-point MACE"
      },
      "cvDeath": {
        "hr": "0.62",
        "ci": "0.49-0.77",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-38% Tử vong Tim mạch"
      },
      "allCauseDeath": {
        "hr": "0.68",
        "ci": "0.57-0.82",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-32% Tử vong mọi nguyên nhân"
      },
      "hhf": {
        "hr": "0.65",
        "ci": "0.50-0.85",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-35% Nhập viện do suy tim"
      },
      "renal": {
        "hr": "0.61",
        "ci": "0.53-0.70",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-39% Tiến triển bệnh thận mạn"
      },
      "adverse": {
        "hr": "4.12",
        "ci": "2.35-7.22",
        "p": "<0.001",
        "verdict": "adverse",
        "label": "+ Nấm đường sinh dục (6.4% vs 1.5%)"
      }
    },
    "citation": {
      "vancouver": "Zinman B, Wanner C, Lachin JM, et al. Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. N Engl J Med. 2015;373(22):2117-2128.",
      "apa": "Zinman, B., Wanner, C., Lachin, J. M., et al. (2015). Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. New England Journal of Medicine, 373(22), 2117-2128.",
      "clinicalNote": "Theo Thử nghiệm EMPA-REG OUTCOME (NEJM 2015): Empagliflozin giảm 38% tử vong tim mạch & giảm 35% nhập viện do suy tim ở bệnh nhân ĐTĐ typ 2 nguy cơ TM cao (Class I, Level A)."
    },
    "pocketCard": {
      "title": "⚡ Cheat-Sheet: Empagliflozin (SGLT2i)",
      "dosageRules": [
        {
          "drug": "Empagliflozin 10mg",
          "dose": "10mg QD uống buổi sáng",
          "note": "Khởi đầu chuẩn cho Suy tim / ĐTĐ typ 2"
        },
        {
          "drug": "Empagliflozin 25mg",
          "dose": "25mg QD uống buổi sáng",
          "note": "Nâng liều kiểm soát đường huyết nếu eGFR tốt"
        }
      ],
      "rules": [
        "1. Kiểm tra eGFR trước khi khởi đầu. An toàn khi eGFR ≥ 20 mL/min/1.73m² (theo KDIGO 2023).",
        "2. Hướng dẫn bệnh nhân vệ sinh cá nhân tránh nhiễm nấm đường sinh dục.",
        "3. Tạm ngưng thuốc 3 ngày trước phẫu thuật lớn để ngừa Ketoacidosis máu đường huyết bình thường (euglycemic DKA)."
      ]
    },
    "decisionTree": {
      "title": "🧩 Thuật toán Đái tháo đường & Nguy cơ Tim mạch",
      "startNode": "step_start",
      "nodes": {
        "step_start": {
          "question": "Bệnh nhân ĐTĐ típ 2 có bệnh tim mạch do xơ vữa (ASCVD), suy tim hoặc bệnh thận mạn?",
          "options": [
            {
              "text": "🚨 CÓ Bệnh tim mạch / Suy tim / Bệnh thận mạn",
              "next": "step_cv_risk"
            },
            {
              "text": "🟢 Không có bệnh tim mạch / nguy cơ thấp",
              "next": "step_low_risk"
            }
          ]
        },
        "step_cv_risk": {
          "recommendation": "Chỉ định ngay SGLT2i (Empagliflozin / Dapagliflozin) ĐỘC LẬP VỚI MỨC HbA1c BAN ĐẦU.",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": [
            {
              "text": "Tiêu điểm chính là Suy tim (HFrEF/HFpEF)",
              "next": "step_hf"
            },
            {
              "text": "Tiêu điểm chính là Bệnh thận mạn (eGFR 20-60)",
              "next": "step_ckd"
            }
          ]
        },
        "step_low_risk": {
          "recommendation": "Khởi đầu Metformin đơn trị + Điều chỉnh lối sống. Đánh giá kiểm soát HbA1c sau 3 tháng.",
          "classRating": "Class I",
          "levelRating": "Level B",
          "color": "blue",
          "options": []
        },
        "step_hf": {
          "recommendation": "Empagliflozin 10mg QD hoặc Dapagliflozin 10mg QD (Ưu tiên bộ tứ trụ cột).",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": []
        },
        "step_ckd": {
          "recommendation": "Empagliflozin 10mg QD giúp làm chậm 39% tốc độ suy giảm eGFR.",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": []
        }
      }
    }
  },
  {
    "id": "study_jrs_copd_2026",
    "title": "The JRS Guideline for the Management of Chronic Obstructive Pulmonary Disease (7th Edition 2026)",
    "drug": "LAMA, LABA, ICS, Dupilumab, Azithromycin, Clarithromycin, Prednisolone",
    "sourceType": "intl-guideline",
    "specialty": "pulmo",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Phân loại 7 Etiotype GOLD 2023, đánh giá Pre-COPD & PRISm, bậc thang LAMA/LABA/Triple, sinh học mới Dupilumab, Macrolide kéo dài, van nội phế quản BLVR và tầm soát tim mạch sau đợt cấp",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Giảm đợt cấp COPD, cải thiện chất lượng cuộc sống (CAT/SGRQ), làm chậm suy giảm FEV1, ngăn ngừa tử vong tim mạch hậu đợt cấp"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "LAMA đơn trị đầu tay (CQ02, Mạnh A); Dupilumab giảm ~30% đợt cấp ở viêm type 2; Prednisolone 0,5mg/kg/ngày x 5-7 ngày trong đợt cấp (CQ21, Mạnh B); NPPV ưu tiên khi suy hô hấp tăng CO2 (CQ22, Yếu B); Tầm soát CVD thường quy sau đợt cấp",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Japanese Respiratory Society (JRS)",
    "phase": "Guidelines 7th Ed",
    "sampleSize": null,
    "population": "Bệnh nhân Bệnh phổi tắc nghẽn mạn tính (COPD) giai đoạn ổn định và đợt cấp tại Nhật Bản và Châu Á",
    "summary": "Ấn bản lần 7 của Hội Hô hấp Nhật Bản (JRS 2026) công bố trực tuyến ngày 14/07/2026. Cập nhật 7 Etiotype GOLD 2023, Nút nhầy CT, Lão hóa tế bào, phân biệt Pre-COPD vs PRISm, Dupilumab (anti-IL-4Rα), Macrolide kéo dài, BLVR và tầm soát tim mạch thường quy sau đợt cấp.",
    "detailedConclusion": "Khởi đầu ổn định: LAMA đơn trị là chọn lựa hàng đầu (CQ02, Mạnh A). Thêm ICS khi có ACO hoặc đợt cấp tái diễn + Eos ≥ 300. Bệnh nhân gầy/cao tuổi dùng ICS cần cảnh giác Viêm phổi & NTM. Dupilumab add-on cho đợt cấp tái diễn dù đã triple therapy. Đợt cấp: Prednisolone 0.5mg/kg/ngày x 5-7 ngày (CQ21, Mạnh B), Kháng sinh chỉ khi có đàm mủ/CRP tăng (CQ19, Mạnh B), NPPV ưu tiên khi suy hô hấp tăng CO2 (CQ22, Yếu B). Bắt buộc tầm soát tim mạch (BNP, ECG, Siêu âm tim) sau xuất viện.",
    "fdaStatus": "Respiratory Investigation 64 (2026) 101482",
    "sourceUrl": "https://www.sciencedirect.com/journal/respiratory-investigation",
    "file": "kho-guidelines/jrs-copd-2026.html",
    "subgroups": {
      "LAMA đơn trị": "CQ02 Khuyến cáo Mạnh, Bằng chứng A (Lựa chọn đầu tay)",
      "Triple Therapy (LAMA+LABA+ICS)": "CQ06 Khuyến cáo Yếu, Bằng chứng A (ACO hoặc Đợt cấp + Eos ≥300)",
      "Dupilumab (anti-IL-4Rα)": "Add-on cho FEV1 30-70%, Eos ≥300, đợt cấp tái diễn dù đã dùng Triple",
      "Macrolide kéo dài": "CQ16 Khuyến cáo Yếu, Bằng chứng B (OR 0.34 giảm đợt cấp; Cần loại trừ Lao tại VN)",
      "Prednisolone đợt cấp": "CQ21 Khuyến cáo Mạnh, Bằng chứng B (0.5 mg/kg/ngày x 5-7 ngày)",
      "NPPV trong đợt cấp": "CQ22 Khuyến cáo Yếu, Bằng chứng B (pH < 7.35, PaCO2 > 45 mmHg)"
    },
    "relatedCalculators": [
      {
        "name": "Thang điểm CAT (COPD)",
        "path": "src/content/calculators/respiratory/CAT_COPD.html"
      },
      {
        "name": "Chỉ số BODE Index",
        "path": "src/content/calculators/respiratory/BODE_Index.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Khó thở mạn",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Phác đồ LAMA + LABA + ICS",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "J44",
      "J44.1",
      "J44.9"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?card=jrs_copd_2026",
    "matrixEndpoints": {
      "mace": {
        "hr": "N/A",
        "ci": "N/A",
        "p": "N/A",
        "verdict": "neutral",
        "label": "Tầm soát tim mạch sau đợt cấp"
      },
      "cvDeath": {
        "hr": "0.76",
        "ci": "0.62-0.92",
        "p": "0.005",
        "verdict": "benefit",
        "label": "Tầm soát BNP/NT-proBNP & ECG giảm biến cố CVD"
      },
      "allCauseDeath": {
        "hr": "0.82",
        "ci": "0.72-0.94",
        "p": "0.004",
        "verdict": "benefit",
        "label": "Cải thiện sống còn dài hạn khi quản lý toàn diện"
      },
      "hhf": {
        "hr": "0.66",
        "ci": "0.55-0.79",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "Dupilumab & Triple therapy giảm 30-34% đợt cấp"
      },
      "renal": {
        "hr": "N/A",
        "ci": "N/A",
        "p": "N/A",
        "verdict": "neutral",
        "label": "N/A"
      },
      "adverse": {
        "hr": "1.45",
        "ci": "1.18-1.78",
        "p": "0.001",
        "verdict": "adverse",
        "label": "ICS tăng nguy cơ Viêm phổi/NTM ở bệnh nhân BMI gầy"
      }
    },
    "citation": {
      "vancouver": "Sugiura H, Fujino N, Shibata Y, Muro S, Matsunaga K, Horita N, Kawayama T. The JRS Guideline for the Management of Chronic Obstructive Pulmonary Disease, 7th edition 2026. Respir Investig. 2026;64(101482).",
      "apa": "Sugiura, H., Fujino, N., Shibata, Y., Muro, S., Matsunaga, K., Horita, N., & Kawayama, T. (2026). The JRS Guideline for the Management of Chronic Obstructive Pulmonary Disease, 7th edition 2026. Respiratory Investigation, 64, 101482.",
      "clinicalNote": "Theo JRS COPD Guideline 2026 (7th Ed): LAMA đơn trị là chọn lựa hàng đầu cho COPD ổn định có triệu chứng (CQ02, Class I). Bắt buộc tầm soát tim mạch (BNP, ECG, Siêu âm tim) sau đợt cấp do nguy cơ biến cố CVD tăng vọt."
    },
    "pocketCard": {
      "title": "⚡ Cheat-Sheet: Guideline JRS COPD 2026 (Ấn Bản 7)",
      "dosageRules": [
        {
          "drug": "Khởi đầu COPD ổn định",
          "dose": "LAMA đơn trị (Tiotropium, Umeclidinium, Glycopyrronium)",
          "note": "Khuyến cáo Mạnh, Bằng chứng A (CQ02)"
        },
        {
          "drug": "Khó thở nhiều / mMRC ≥2",
          "dose": "LAMA + LABA phối hợp bộ đôi",
          "note": "Khuyến cáo Yếu, Bằng chứng A (CQ04)"
        },
        {
          "drug": "Đợt cấp COPD — Prednisolone",
          "dose": "Prednisolone 0,5 mg/kg/ngày uống x 5–7 ngày",
          "note": "Khuyến cáo Mạnh, Bằng chứng B (CQ21)"
        }
      ],
      "rules": [
        "1. LAMA đơn trị là lựa chọn khởi đầu hàng đầu. KHÔNG dùng ICS đơn trị.",
        "2. Corticosteroid toàn thân trong đợt cấp chỉ dùng Prednisolone 0,5mg/kg/ngày trong 5-7 ngày.",
        "3. Bắt buộc tầm soát tim mạch (BNP, ECG, Siêu âm tim) trong các tuần đầu SAU đợt cấp."
      ]
    }
  },
  {
    "id": "study_byt_copd_2026",
    "title": "Hướng dẫn chẩn đoán và điều trị bệnh phổi tắc nghẽn mạn tính (COPD) Bộ Y tế 2026",
    "drug": "LAMA, LABA, ICS, Roflumilast, Azithromycin, Kháng sinh, Morphin",
    "sourceType": "vn-moh",
    "specialty": "pulmo",
    "design": "guideline",
    "grade": {
      "strength": "strong-for",
      "certainty": "moderate"
    },
    "pico": {
      "population": "",
      "intervention": "Phân loại tắc nghẽn GOLD 1-4, phân nhóm điều trị ABE, tiếp cận đợt cấp theo tiêu chuẩn Rome 2022, sử dụng kháng sinh theo nguy cơ Pseudomonas aeruginosa",
      "comparator": "Standard of Care / Placebo",
      "outcome": "Giảm triệu chứng khó thở, giảm tần suất đợt cấp, cá thể hóa điều trị bằng Eosinophil máu và cải thiện tỷ lệ tử vong"
    },
    "statistics": {
      "type": "HR",
      "value": 0.85,
      "ciLower": 0.7,
      "ciUpper": 0.95,
      "pValue": 0.04
    },
    "vnAdaptationStatus": "adapted",
    "oldKeyResults": "Khuyến cáo chính thức của Bộ Y tế Việt Nam ban hành kèm theo Quyết định số 2131/QĐ-BYT ngày 14/07/2026",
    "impact": "practice-changing",
    "year": 2026,
    "organization": "Bộ Y tế Việt Nam",
    "phase": "Guidelines",
    "sampleSize": null,
    "population": "Người bệnh bệnh phổi tắc nghẽn mạn tính (BPTNMT) tại Việt Nam",
    "summary": "Hướng dẫn quốc gia toàn diện nhất và mới nhất của Bộ Y tế Việt Nam về chẩn đoán xác định, phân nhóm điều trị ABE dựa trên GOLD 2026, quản lý đợt cấp bằng tiêu chuẩn Rome 2022 và cá thể hóa điều trị thuốc giãn phế quản, kháng sinh và PHCN.",
    "detailedConclusion": "Chẩn đoán xác định khi FEV1/FVC < 70% sau test giãn phế quản. Phân nhóm điều trị ABE (A: 1 thuốc giãn phế quản, B: LABA+LAMA, E: LABA+LAMA; thêm ICS nếu Eos >= 300). Đợt cấp phân loại theo Rome 2022 (Nhẹ, Trung bình, Nặng). Chỉ định kháng sinh đợt cấp dựa trên triệu chứng Anthonisen và nguy cơ nhiễm P. aeruginosa. Sử dụng Morphin liều thấp kiểm soát khó thở giai đoạn cuối đời.",
    "fdaStatus": "Quyết định số 2131/QĐ-BYT",
    "sourceUrl": "https://kcb.vn/",
    "file": "kho-guidelines/byt-copd-2026.html",
    "subgroups": {
      "Nhóm A": "1 thuốc giãn phế quản (SABA, LABA, LAMA, SAMA)",
      "Nhóm B": "Phối hợp LABA + LAMA duy trì",
      "Nhóm E (Eos < 300)": "LABA + LAMA. Eos < 100 cân nhắc Roflumilast/Azithromycin nếu còn đợt cấp",
      "Nhóm E (Eos ≥ 300)": "LABA + LAMA + ICS (Khuyến cáo mạnh)"
    },
    "relatedCalculators": [
      {
        "name": "Thang điểm CAT (COPD)",
        "path": "src/content/calculators/respiratory/CAT_COPD.html"
      },
      {
        "name": "Chỉ số BODE Index",
        "path": "src/content/calculators/respiratory/BODE_Index.html"
      }
    ],
    "relatedFlowcharts": [
      {
        "name": "Lưu đồ Tiếp cận Khó thở mạn",
        "path": "src/content/approaches/tiep-can.html"
      }
    ],
    "relatedDrugs": [
      {
        "name": "Phác đồ LAMA + LABA + ICS",
        "path": "src/content/pharmacology/duoc-ly.html"
      }
    ],
    "asianData": true,
    "bookmarked": true,
    "icd10": [
      "J44",
      "J44.1",
      "J44.0"
    ],
    "createdAt": "2026-08-09T02:52:47.224Z",
    "radarUrl": "../guideline-radar/radar.html?card=copd_abe_2026",
    "matrixEndpoints": {
      "mace": {
        "hr": "N/A",
        "ci": "N/A",
        "p": "N/A",
        "verdict": "neutral",
        "label": "Tập trung triệu chứng hô hấp"
      },
      "cvDeath": {
        "hr": "0.88",
        "ci": "0.76-1.02",
        "p": "0.09",
        "verdict": "neutral",
        "label": "Xu hướng giảm tử vong hô hấp"
      },
      "allCauseDeath": {
        "hr": "0.84",
        "ci": "0.74-0.95",
        "p": "0.006",
        "verdict": "benefit",
        "label": "-16% Tử vong chung khi dùng Triple Therapy (LABA+LAMA+ICS)"
      },
      "hhf": {
        "hr": "0.71",
        "ci": "0.62-0.81",
        "p": "<0.001",
        "verdict": "benefit",
        "label": "-29% Nhập viện do Đợt cấp COPD"
      },
      "renal": {
        "hr": "N/A",
        "ci": "N/A",
        "p": "N/A",
        "verdict": "neutral",
        "label": "N/A"
      },
      "adverse": {
        "hr": "1.38",
        "ci": "1.12-1.70",
        "p": "0.002",
        "verdict": "adverse",
        "label": "+ Tăng nguy cơ Viêm phổi do ICS (khi Eos < 100)"
      }
    },
    "citation": {
      "vancouver": "Bộ Y tế Việt Nam. Hướng dẫn chẩn đoán và điều trị Bệnh phổi tắc nghẽn mạn tính. Quyết định số 2131/QĐ-BYT. Hà Nội: NXB Y học; 2026.",
      "apa": "Bộ Y tế Việt Nam. (2026). Hướng dẫn chẩn đoán và điều trị Bệnh phổi tắc nghẽn mạn tính (Quyết định 2131/QĐ-BYT). NXB Y học.",
      "clinicalNote": "Theo Hướng dẫn COPD Bộ Y tế 2026: Ưu tiên khởi đầu bộ đôi LABA + LAMA cho Nhóm B & E; chỉ thêm ICS khi Eosinophil máu ≥ 300 tế bào/µL (Class I, Level A)."
    },
    "pocketCard": {
      "title": "⚡ Cheat-Sheet: Phác Đồ Khởi Đầu & Đợt Cấp COPD (BYT 2026)",
      "dosageRules": [
        {
          "drug": "Nhóm A (Nhẹ)",
          "dose": "SABA (Salbutamol) xịt khi cần hoặc LABA/LAMA đơn trị",
          "note": "mMRC 0-1, CAT < 10, 0-1 đợt cấp nhẹ"
        },
        {
          "drug": "Nhóm B (Triệu chứng)",
          "dose": "LABA + LAMA (Tiotropium/Olodaterol hoặc Umeclidinium/Vilanterol)",
          "note": "mMRC ≥ 2, CAT ≥ 10, 0-1 đợt cấp nhẹ"
        },
        {
          "drug": "Nhóm E (Đợt cấp)",
          "dose": "LABA + LAMA (thêm ICS nếu Eos ≥ 300 / 3 thuốc 1 bình hít)",
          "note": "≥ 2 đợt cấp trung bình hoặc ≥ 1 đợt cấp nhập viện"
        }
      ],
      "rules": [
        "1. Chẩn đoán xác định bắt buộc có hô hấp ký: FEV1/FVC < 70% sau test giãn phế quản.",
        "2. Đợt cấp Rome 2022: Nhẹ (chỉ dùng SABA), Trung bình (thêm Kháng sinh/Corticoid uống), Nặng (nhập viện/ICU).",
        "3. Nguy cơ Pseudomonas: Tiền sử phân lập P. aeruginosa, FEV1 < 30%, hoặc dùng kháng sinh rộng rãi trong 90 ngày."
      ]
    },
    "decisionTree": {
      "title": "🧩 Thuật toán Phân Nhóm & Khởi Đầu Điều Trị COPD (BYT 2026)",
      "startNode": "step_start",
      "nodes": {
        "step_start": {
          "question": "Bệnh nhân có tiền sử ≥ 2 đợt cấp trung bình HOẶC ≥ 1 đợt cấp phải nhập viện trong 12 tháng qua?",
          "options": [
            {
              "text": "🚨 CÓ (Thuộc Nhóm E - Nhiều đợt cấp)",
              "next": "step_group_e"
            },
            {
              "text": "🟢 KHÔNG (Chỉ có 0 hoặc 1 đợt cấp không nhập viện)",
              "next": "step_assess_cat"
            }
          ]
        },
        "step_assess_cat": {
          "question": "Đánh giá điểm triệu chứng mMRC hoặc CAT?",
          "options": [
            {
              "text": "mMRC 0-1 hoặc CAT < 10 ➔ Nhóm A",
              "next": "step_group_a"
            },
            {
              "text": "mMRC ≥ 2 hoặc CAT ≥ 10 ➔ Nhóm B",
              "next": "step_group_b"
            }
          ]
        },
        "step_group_a": {
          "recommendation": "Khởi đầu 1 thuốc giãn phế quản (Tùy chọn SABA khi cần hoặc LAMA/LABA duy trì).",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "blue",
          "options": []
        },
        "step_group_b": {
          "recommendation": "Khởi đầu ngay Bộ đôi thuốc giãn phế quản kéo dài LABA + LAMA (Ưu tiên bình hít kết hợp).",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": []
        },
        "step_group_e": {
          "question": "Xét nghiệm Eosinophil máu ngoại vi là bao nhiêu?",
          "options": [
            {
              "text": "Eosinophil ≥ 300 tế bào/µL",
              "next": "step_e_high_eos"
            },
            {
              "text": "Eosinophil < 300 tế bào/µL",
              "next": "step_e_low_eos"
            }
          ]
        },
        "step_e_high_eos": {
          "recommendation": "Chỉ định BỘ BA THUỐC (LABA + LAMA + ICS) ngay từ đầu để giảm đợt cấp & tử vong.",
          "classRating": "Class I",
          "levelRating": "Level A",
          "color": "green",
          "options": []
        },
        "step_e_low_eos": {
          "recommendation": "Khởi đầu LABA + LAMA. Tránh dùng ICS nếu Eos < 100 để ngăn ngừa nguy cơ Viêm phổi.",
          "classRating": "Class I",
          "levelRating": "Level B",
          "color": "orange",
          "options": []
        }
      }
    }
  }
];

    if (typeof window !== 'undefined') {
      window.SAMPLE_STUDIES = SAMPLE_STUDIES;
    }


