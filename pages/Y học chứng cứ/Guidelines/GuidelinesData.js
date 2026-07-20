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
      onco: { name: 'Ung thư', color: '#be185d', bg: '#fce7f3' }
    };

    const SOURCE_TYPES = {
      'intl-study': { name: 'Nghiên cứu Quốc tế', color: '#6366f1', bg: '#e0e7ff' },
      'intl-guideline': { name: 'Guideline Quốc tế', color: '#0d9488', bg: '#ccfbf1' },
      'vn-moh': { name: 'Bộ Y tế Việt Nam', color: '#dc2626', bg: '#fee2e2' },
      'vn-doh': { name: 'Sở Y tế Việt Nam', color: '#ea580c', bg: '#ffedd5' },
      'vn-association': { name: 'Hội chuyên khoa VN', color: '#16a34a', bg: '#dcfce7' }
    };

    const DESIGNS = {
      'rct': { name: 'Thử nghiệm lâm sàng (RCT)' },
      'meta': { name: 'Tổng quan / Meta-Analysis' },
      'cohort': { name: 'Nghiên cứu quan sát / Thuần tập' },
      'guideline': { name: 'Hướng dẫn / Khuyến cáo' },
      'review': { name: 'Bài tổng quan y khoa (Review)' },
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
        id: "study_ks_bn_nang",
        title: "Kháng sinh ở bệnh nhân nặng (Cập nhật 2026)",
        drug: "Beta-lactam, Vancomycin, Aminoglycosides, Linezolid",
        sourceType: "intl-guideline",
        specialty: "infect",
        design: "review",
        intervention: "Tối ưu hóa liều nạp, truyền kéo dài Beta-lactam & hiệu chỉnh liều theo PK/PD (AKI, CRRT, ECMO)",
        primaryEndpoint: "Hiệu quả diệt khuẩn tối đa & giảm thiểu độc tính ở bệnh nhân ICU",
        keyResults: "Truyền kéo dài Beta-lactam giảm tử vong 90 ngày; ACORN trial xác nhận Pip/Tazo an toàn về thận",
        impact: "practice-changing",
        year: 2026,
        organization: "Critical Care Clinics",
        phase: "Review",
        sampleSize: null,
        population: "Bệnh nhân nhiễm khuẩn nặng, nhiễm khuẩn huyết và sốc nhiễm khuẩn",
        summary: "Cập nhật khuyến cáo toàn diện về sử dụng kháng sinh ở bệnh nhân hồi sức tích cực (ICU), giải quyết đồng thời 3 vấn đề: điều trị đủ sớm, bao phủ đúng tác nhân và tối ưu hóa liều lượng theo biến đổi dược động học PK/PD.",
        detailedConclusion: "Sốc nhiễm khuẩn cần dùng kháng sinh ngay lập tức (trong vòng 1 giờ, lấy cấy máu trong 45 phút). Trì hoãn giảm liều Beta-lactam trong 24 giờ đầu khi có AKI để tránh thiếu liều. Dùng liều nạp đầy đủ cho kháng sinh ưa nước bất kể chức năng thận. TDM khuyên dùng cho Vancomycin (AUC/MIC 400-600) và Aminoglycosides.",
        fdaStatus: "Cập nhật y văn ICU 2026",
        sourceUrl: "https://drive.google.com/file/d/1V0ey2paO8Enbt8U4OtH1xK0Vn_MIS6Tn/view",
        file: "Kho Guidelines/ks-cho-bn-nang.html",
        subgroups: {
          "Sốc nhiễm khuẩn": "Dùng kháng sinh ngay lập tức (mỗi giờ chậm trễ tăng tử vong)",
          "Nhiễm khuẩn không sốc": "Đánh giá kỹ lưỡng trước khi quyết định dùng phổ rộng",
          "PCR MRSA ngoáy mũi": "Giá trị tiên đoán âm >95% giúp loại trừ viêm phổi MRSA",
          "Dị ứng Penicillin": "Tỷ lệ dị ứng thật chỉ 1-3%, phản ứng chéo với Ceph thế hệ 3 chỉ 2.4%"
        },
        asianData: true,
        bookmarked: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "study_empareg",
        title: "EMPA-REG OUTCOME",
        drug: "Empagliflozin",
        sourceType: "intl-study",
        specialty: "cardio",
        design: "rct",
        intervention: "Empagliflozin 10/25mg QD vs Placebo",
        primaryEndpoint: "3-point MACE (Tử vong tim mạch, nhồi máu cơ tim không tử vong, đột quỵ không tử vong)",
        keyResults: "HR 0.86 (95% CI 0.74-0.99); p=0.04",
        impact: "practice-changing",
        year: 2015,
        organization: "NEJM / Boehringer Ingelheim",
        phase: "Phase III",
        sampleSize: 7020,
        population: "Bệnh nhân đái tháo đường typ 2 có nguy cơ tim mạch cao",
        summary: "Empagliflozin làm giảm ý nghĩa 14% tiêu chí gộp chính MACE (tử vong do tim mạch, nhồi máu cơ tim không vong, đột quỵ không vong) và giảm 38% tử vong do tim mạch.",
        detailedConclusion: "Thử nghiệm lâm sàng ngẫu nhiên, mù đôi, đối chứng giả dược. Kết quả cho thấy tỷ lệ nhập viện do suy tim giảm 35%, tử vong do mọi nguyên nhân giảm 32%. Đây là thuốc điều trị đái tháo đường đầu tiên chứng minh được lợi ích bảo vệ tim mạch vượt trội.",
        fdaStatus: "FDA Approved 2016 (chỉ định giảm tử vong tim mạch)",
        sourceUrl: "https://www.nejm.org/doi/full/10.1056/nejmoa1504720",
        file: "Kho Guidelines/empa-reg.html",
        subgroups: {
          "Châu Á": "HR 0.82 (95% CI 0.64-1.04)",
          "Suy tim (HF)": "HR 0.65 (95% CI 0.50-0.85)",
          "Bệnh thận mạn (eGFR 45-90)": "HR 0.70 (95% CI 0.51-0.96)",
          "Nhồi máu cơ tim cũ": "HR 0.85 (95% CI 0.71-1.02)",
          "HbA1c ≥ 8.5%": "HR 0.84 (95% CI 0.69-1.03)",
          "Tuổi ≥ 65": "HR 0.87 (95% CI 0.71-1.07)"
        },
        asianData: true,
        bookmarked: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "study_byt_copd_2026",
        title: "Hướng dẫn chẩn đoán và điều trị bệnh phổi tắc nghẽn mạn tính (COPD) Bộ Y tế 2026",
        drug: "LAMA, LABA, ICS, Roflumilast, Azithromycin, Kháng sinh, Morphin",
        sourceType: "vn-moh",
        specialty: "pulmo",
        design: "guideline",
        intervention: "Phân loại tắc nghẽn GOLD 1-4, phân nhóm điều trị ABE, tiếp cận đợt cấp theo tiêu chuẩn Rome 2022, sử dụng kháng sinh theo nguy cơ Pseudomonas aeruginosa",
        primaryEndpoint: "Giảm triệu chứng khó thở, giảm tần suất đợt cấp, cá thể hóa điều trị bằng Eosinophil máu và cải thiện tỷ lệ tử vong",
        keyResults: "Khuyến cáo chính thức của Bộ Y tế Việt Nam ban hành kèm theo Quyết định số 2131/QĐ-BYT ngày 14/07/2026",
        impact: "practice-changing",
        year: 2026,
        organization: "Bộ Y tế Việt Nam",
        phase: "Guidelines",
        sampleSize: null,
        population: "Người bệnh bệnh phổi tắc nghẽn mạn tính (BPTNMT) tại Việt Nam",
        summary: "Hướng dẫn quốc gia toàn diện nhất và mới nhất của Bộ Y tế Việt Nam về chẩn đoán xác định, phân nhóm điều trị ABE dựa trên GOLD 2026, quản lý đợt cấp bằng tiêu chuẩn Rome 2022 và cá thể hóa điều trị thuốc giãn phế quản, kháng sinh và PHCN.",
        detailedConclusion: "Chẩn đoán xác định khi FEV1/FVC < 70% sau test giãn phế quản. Phân nhóm điều trị ABE (A: 1 thuốc giãn phế quản, B: LABA+LAMA, E: LABA+LAMA; thêm ICS nếu Eos >= 300). Đợt cấp phân loại theo Rome 2022 (Nhẹ, Trung bình, Nặng). Chỉ định kháng sinh đợt cấp dựa trên triệu chứng Anthonisen và nguy cơ nhiễm P. aeruginosa. Sử dụng Morphin liều thấp kiểm soát khó thở giai đoạn cuối đời.",
        fdaStatus: "Quyết định số 2131/QĐ-BYT",
        sourceUrl: "https://kcb.vn/",
        file: "Kho Guidelines/byt-copd-2026.html",
        subgroups: {
          "Nhóm A": "1 thuốc giãn phế quản (SABA, LABA, LAMA, SAMA)",
          "Nhóm B": "Phối hợp LABA + LAMA duy trì",
          "Nhóm E (Eos < 300)": "LABA + LAMA. Eos < 100 cân nhắc Roflumilast/Azithromycin nếu còn đợt cấp",
          "Nhóm E (Eos ≥ 300)": "LABA + LAMA + ICS (Khuyến cáo mạnh)"
        },
        asianData: true,
        bookmarked: true,
        createdAt: new Date().toISOString()
      },
      {
        id: "study_vnha2023",
        title: "Khuyến cáo chẩn đoán & điều trị suy tim cấp và mạn VNHA/VCS 2023",
        drug: "ARNI, SGLT2i, Chẹn Beta, MRA",
        sourceType: "vn-association",
        specialty: "cardio",
        design: "guideline",
        intervention: "Bộ tứ trụ cột (ARNI/ACEi/ARB, Chẹn Beta, Kháng Aldosterone, SGLT2i) vs Điều trị chuẩn cũ",
        primaryEndpoint: "Cải thiện tử vong tim mạch và giảm nhập viện do suy tim",
        keyResults: "Khuyến cáo mức chỉ định Class I (Bằng chứng A)",
        impact: "practice-changing",
        year: 2023,
        organization: "Hội Tim Mạch Học Quốc Gia Việt Nam",
        phase: "Guidelines",
        sampleSize: null,
        population: "Bệnh nhân suy tim cấp hoặc mạn tính tại Việt Nam",
        summary: "Cập nhật khuyến cáo điều trị suy tim theo bộ tứ trụ cột (ARNI/ACEi/ARB, Chẹn beta, Kháng aldosterone, SGLT2i) phù hợp với thực hành lâm sàng tại Việt Nam.",
        detailedConclusion: "Phân độ khuyến cáo Class I cho điều trị suy tim phân suất tống máu giảm (HFrEF) với bộ tứ trụ cột. ARNI được ưu tiên chỉ định thay thế ACEi/ARB để cải thiện tử vong và nhập viện do suy tim.",
        fdaStatus: "Khuyến cáo Class I - VNHA 2023",
        sourceUrl: "https://vnha.org.vn/",
        file: "",
        asianData: true,
        bookmarked: false,
        createdAt: new Date().toISOString()
      },
      {
        id: "study_byt2020",
        title: "Hướng dẫn chẩn đoán và điều trị đái tháo đường típ 2 - Bộ Y tế",
        drug: "Metformin, SGLT2i, GLP-1 RA, DPP-4i, SU, Insulin",
        sourceType: "vn-moh",
        specialty: "endo",
        design: "guideline",
        intervention: "Cá thể hóa phác đồ kết hợp Metformin, SGLT2i, GLP-1 RA dựa trên nguy cơ tim mạch",
        primaryEndpoint: "Kiểm soát HbA1c và bảo vệ tim mạch/thận",
        keyResults: "Phác đồ ưu tiên hàng đầu cho bệnh nhân kèm suy tim, bệnh thận mạn",
        impact: "practice-changing",
        year: 2020,
        organization: "Bộ Y tế Việt Nam",
        phase: "Guidelines",
        sampleSize: null,
        population: "Bệnh nhân đái tháo đường típ 2 tại Việt Nam",
        summary: "Phác đồ điều trị ĐTĐ típ 2 cập nhật của Bộ Y tế Việt Nam, cá thể hóa điều trị dựa trên bệnh lý tim mạch do xơ vữa, suy tim hoặc bệnh thận mạn kèm theo.",
        detailedConclusion: "Ưu tiên lựa chọn SGLT2i hoặc GLP-1 RA độc lập với mức HbA1c ở bệnh nhân ĐTĐ típ 2 kèm bệnh tim mạch do xơ vữa, suy tim hoặc bệnh thận mạn để bảo vệ tim mạch và thận.",
        fdaStatus: "Quyết định số 4800/QĐ-BYT",
        sourceUrl: "https://kcb.vn/",
        file: "",
        asianData: true,
        bookmarked: false,
        createdAt: new Date().toISOString()
      }
    ];

