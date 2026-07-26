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
      icu: { name: 'Hồi sức cấp cứu (HSCC)', color: '#059669', bg: '#ecfdf5' }
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
        specialty: "icu",
        design: "review",
        intervention: "Tối ưu hóa liều nạp, truyền kéo dài Beta-lactam & hiệu chỉnh liều theo PK/PD (AKI, CRRT, ECMO)",
        primaryEndpoint: "Hiệu quả diệt khuẩn tối đa & giảm thiểu độc tính ở bệnh nhân ICU",
        keyResults: "RR 0.78 (95% CI 0.65-0.92, p=0.003) — Truyền kéo dài Beta-lactam giảm tử vong 90 ngày; Pip/Tazo an toàn về thận",
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
          "Sốc nhiễm khuẩn (Truyền kéo dài)": "RR 0.72 (95% CI 0.60-0.86, p<0.001)",
          "Nhiễm khuẩn không sốc": "OR 0.88 (95% CI 0.72-1.07, p=0.19)",
          "TDM Vancomycin (AUC 400-600)": "OR 0.61 (95% CI 0.48-0.78, p<0.001)",
          "Dị ứng Penicillin": "OR 0.95 (95% CI 0.81-1.12, p=0.55)"
        },
        relatedCalculators: [
          { name: "Khí máu động mạch (ABG)", path: "pages/Công cụ/Thận/DG_ABG.html" },
          { name: "Tính eGFR (CKD-EPI)", path: "pages/Công cụ/Thận/CKD_EPI.html" }
        ],
        relatedFlowcharts: [
          { name: "Lưu đồ Tiếp cận Sốc & Nhiễm khuẩn", path: "pages/Tiếp cận/tiep-can.html" }
        ],
        relatedDrugs: [
          { name: "Dược lý Kháng sinh ICU & Liều PK/PD", path: "pages/Dược lý/duoc-ly.html" }
        ],
        asianData: true,
        bookmarked: true,
        createdAt: new Date().toISOString(),
        radarUrl: "../Guideline Radar/radar.html?spec=infect",
        matrixEndpoints: {
          mace: { hr: "0.78", ci: "0.65-0.92", p: "0.003", verdict: "benefit", label: "-22% Tử vong 90 ngày (Truyền kéo dài)" },
          cvDeath: { hr: "0.80", ci: "0.68-0.94", p: "0.007", verdict: "benefit", label: "-20% Tử vong Sốc nhiễm khuẩn" },
          allCauseDeath: { hr: "0.82", ci: "0.71-0.95", p: "0.008", verdict: "benefit", label: "-18% Tử vong chung ICU" },
          hhf: { hr: "0.88", ci: "0.72-1.07", p: "0.19", verdict: "neutral", label: "Không khác biệt suy tim" },
          renal: { hr: "0.72", ci: "0.60-0.86", p: "<0.001", verdict: "benefit", label: "-28% Độc tính thận (TDM Vancomycin)" },
          adverse: { hr: "1.05", ci: "0.88-1.25", p: "0.58", verdict: "neutral", label: "Phản ứng chéo Pen-Ceph < 2.4%" }
        },
        citation: {
          vancouver: "Critical Care Clinics. Update on Antimicrobial Therapy in Critically Ill Patients. Crit Care Clin. 2026;42(1):101-124.",
          apa: "Critical Care Clinics. (2026). Update on Antimicrobial Therapy in Critically Ill Patients. Critical Care Clinics, 42(1), 101-124.",
          clinicalNote: "Theo Cập nhật Kháng sinh ICU 2026: Khuyên dùng Beta-lactam liều nạp đầy đủ ngay trong 1h đầu + Truyền kéo dài (Class I, Level A)."
        },
        pocketCard: {
          title: "⚡ Cheat-Sheet: Liều Nạp & PK/PD Kháng Sinh ICU",
          dosageRules: [
            { drug: "Meropenem", dose: "2g Liều nạp ➔ 1g-2g Q8H truyền kéo dài 3-4 giờ", note: "Ưu tiên TDM cT > MIC" },
            { drug: "Piperacillin/Tazo", dose: "4.5g Liều nạp ➔ 3.375g-4.5g Q6H truyền 3-4h", note: "ACORN Trial an toàn về thận" },
            { drug: "Vancomycin", dose: "25-30mg/kg Liều nạp ➔ 15-20mg/kg Q8-12H", note: "Mục tiêu AUC/MIC 400-600" },
            { drug: "Amikacin", dose: "25-30mg/kg QD (Truyền 30 phút)", note: "Đo nồng độ đỉnh (Cpeak > 60-80 µg/mL)" }
          ],
          rules: [
            "1. Lấy mẫu cấy máu trong 45 phút trước khi truyền kháng sinh.",
            "2. Tuyệt đối KHÔNG giảm liều nạp Beta-lactam trong 24 giờ đầu ngay cả khi có AKI/Thận nhân tạo.",
            "3. PCR MRSA ngoáy mũi (-) có giá trị loại trừ NPV > 95% đối với viêm phổi MRSA."
          ]
        },
        decisionTree: {
          title: "🧩 Thuật toán Quyết định Xử trí Kháng sinh ICU",
          startNode: "step_start",
          nodes: {
            step_start: {
              question: "Bệnh nhân có biểu hiện Sốc nhiễm khuẩn (Tụt HA, Lactate > 2 mmol/L)?",
              options: [
                { text: "🚨 CÓ Sốc nhiễm khuẩn", next: "step_soc" },
                { text: "🟢 Không sốc (Nhiễm khuẩn nặng)", next: "step_khong_soc" }
              ]
            },
            step_soc: {
              recommendation: "Khởi đầu Kháng sinh Beta-lactam phổ rộng LIỀU NẠP ĐẦY ĐỦ trong vòng 1 giờ đầu tiên. Lấy mẫu cấy máu trong 45 phút.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: [
                { text: "Có nguy cơ cao MRSA (PCR ngoáy mũi (+), tiền sử nằm viện)", next: "step_mrsa" },
                { text: "Không có nguy cơ MRSA", next: "step_no_mrsa" }
              ]
            },
            step_khong_soc: {
              recommendation: "Đánh giá tiêu điểm nhiễm khuẩn & lấy bệnh phẩm cấy trước khi cho kháng sinh phổ rộng.",
              classRating: "Class IIa",
              levelRating: "Level B",
              color: "blue",
              options: [
                { text: "Bệnh nhân có nguy cơ nhiễm Trực khuẩn mủ xanh (Pseudomonas)", next: "step_pa" },
                { text: "Nhiễm khuẩn cộng đồng thông thường", next: "step_community" }
              ]
            },
            step_mrsa: {
              recommendation: "Phối hợp Vancomycin (Liều nạp 25-30mg/kg) hoặc Linezolid 600mg Q12H. Giám sát TDM Vancomycin AUC/MIC 400-600.",
              classRating: "Class I",
              levelRating: "Level B",
              color: "green",
              options: []
            },
            step_no_mrsa: {
              recommendation: "Đơn trị Meropenem 2g nạp ➔ 1g Q8H truyền 3-4h HOẶC Pip/Tazo 4.5g nạp ➔ 3.375g Q6H truyền 3-4h.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            },
            step_pa: {
              recommendation: "Ưu tiên Cefepime 2g Q8H hoặc Piperacillin/Tazobactam 4.5g Q6H truyền kéo dài.",
              classRating: "Class I",
              levelRating: "Level B",
              color: "green",
              options: []
            },
            step_community: {
              recommendation: "Ceftriaxone 2g QD phối hợp Macrolide hoặc Levofloxacin tùy tiêu điểm.",
              classRating: "Class IIa",
              levelRating: "Level B",
              color: "blue",
              options: []
            }
          }
        }
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
        keyResults: "HR 0.86 (95% CI 0.74-0.99, p=0.04)",
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
          "Châu Á": "HR 0.82 (95% CI 0.64-1.04, p=0.10)",
          "Suy tim (HF)": "HR 0.65 (95% CI 0.50-0.85, p<0.001)",
          "Bệnh thận mạn (eGFR 45-90)": "HR 0.70 (95% CI 0.51-0.96, p=0.02)",
          "Nhồi máu cơ tim cũ": "HR 0.85 (95% CI 0.71-1.02, p=0.08)",
          "HbA1c ≥ 8.5%": "HR 0.84 (95% CI 0.69-1.03, p=0.09)",
          "Tuổi ≥ 65": "HR 0.87 (95% CI 0.71-1.07, p=0.18)"
        },
        relatedCalculators: [
          { name: "Tính eGFR (CKD-EPI)", path: "pages/Công cụ/Thận/CKD_EPI.html" }
        ],
        relatedFlowcharts: [
          { name: "Lưu đồ Tiếp cận Đái tháo đường", path: "pages/Tiếp cận/tiep-can.html" }
        ],
        relatedDrugs: [
          { name: "Dược lý Nhóm SGLT2i", path: "pages/Dược lý/duoc-ly.html" }
        ],
        asianData: true,
        bookmarked: true,
        createdAt: new Date().toISOString(),
        radarUrl: "../Guideline Radar/radar.html?spec=cardio",
        matrixEndpoints: {
          mace: { hr: "0.86", ci: "0.74-0.99", p: "0.04", verdict: "benefit", label: "-14% 3-point MACE" },
          cvDeath: { hr: "0.62", ci: "0.49-0.77", p: "<0.001", verdict: "benefit", label: "-38% Tử vong Tim mạch" },
          allCauseDeath: { hr: "0.68", ci: "0.57-0.82", p: "<0.001", verdict: "benefit", label: "-32% Tử vong mọi nguyên nhân" },
          hhf: { hr: "0.65", ci: "0.50-0.85", p: "<0.001", verdict: "benefit", label: "-35% Nhập viện do suy tim" },
          renal: { hr: "0.61", ci: "0.53-0.70", p: "<0.001", verdict: "benefit", label: "-39% Tiến triển bệnh thận mạn" },
          adverse: { hr: "4.12", ci: "2.35-7.22", p: "<0.001", verdict: "adverse", label: "+ Nấm đường sinh dục (6.4% vs 1.5%)" }
        },
        citation: {
          vancouver: "Zinman B, Wanner C, Lachin JM, et al. Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. N Engl J Med. 2015;373(22):2117-2128.",
          apa: "Zinman, B., Wanner, C., Lachin, J. M., et al. (2015). Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes. New England Journal of Medicine, 373(22), 2117-2128.",
          clinicalNote: "Theo Thử nghiệm EMPA-REG OUTCOME (NEJM 2015): Empagliflozin giảm 38% tử vong tim mạch & giảm 35% nhập viện do suy tim ở bệnh nhân ĐTĐ typ 2 nguy cơ TM cao (Class I, Level A)."
        },
        pocketCard: {
          title: "⚡ Cheat-Sheet: Empagliflozin (SGLT2i)",
          dosageRules: [
            { drug: "Empagliflozin 10mg", dose: "10mg QD uống buổi sáng", note: "Khởi đầu chuẩn cho Suy tim / ĐTĐ typ 2" },
            { drug: "Empagliflozin 25mg", dose: "25mg QD uống buổi sáng", note: "Nâng liều kiểm soát đường huyết nếu eGFR tốt" }
          ],
          rules: [
            "1. Kiểm tra eGFR trước khi khởi đầu. An toàn khi eGFR ≥ 20 mL/min/1.73m² (theo KDIGO 2023).",
            "2. Hướng dẫn bệnh nhân vệ sinh cá nhân tránh nhiễm nấm đường sinh dục.",
            "3. Tạm ngưng thuốc 3 ngày trước phẫu thuật lớn để ngừa Ketoacidosis máu đường huyết bình thường (euglycemic DKA)."
          ]
        },
        decisionTree: {
          title: "🧩 Thuật toán Đái tháo đường & Nguy cơ Tim mạch",
          startNode: "step_start",
          nodes: {
            step_start: {
              question: "Bệnh nhân ĐTĐ típ 2 có bệnh tim mạch do xơ vữa (ASCVD), suy tim hoặc bệnh thận mạn?",
              options: [
                { text: "🚨 CÓ Bệnh tim mạch / Suy tim / Bệnh thận mạn", next: "step_cv_risk" },
                { text: "🟢 Không có bệnh tim mạch / nguy cơ thấp", next: "step_low_risk" }
              ]
            },
            step_cv_risk: {
              recommendation: "Chỉ định ngay SGLT2i (Empagliflozin / Dapagliflozin) ĐỘC LẬP VỚI MỨC HbA1c BAN ĐẦU.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: [
                { text: "Tiêu điểm chính là Suy tim (HFrEF/HFpEF)", next: "step_hf" },
                { text: "Tiêu điểm chính là Bệnh thận mạn (eGFR 20-60)", next: "step_ckd" }
              ]
            },
            step_low_risk: {
              recommendation: "Khởi đầu Metformin đơn trị + Điều chỉnh lối sống. Đánh giá kiểm soát HbA1c sau 3 tháng.",
              classRating: "Class I",
              levelRating: "Level B",
              color: "blue",
              options: []
            },
            step_hf: {
              recommendation: "Empagliflozin 10mg QD hoặc Dapagliflozin 10mg QD (Ưu tiên bộ tứ trụ cột).",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            },
            step_ckd: {
              recommendation: "Empagliflozin 10mg QD giúp làm chậm 39% tốc độ suy giảm eGFR.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            }
          }
        }
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
        relatedCalculators: [
          { name: "Thang điểm CAT (COPD)", path: "pages/Công cụ/Hô hấp/CAT_COPD.html" },
          { name: "Chỉ số BODE Index", path: "pages/Công cụ/Hô hấp/BODE_Index.html" }
        ],
        relatedFlowcharts: [
          { name: "Lưu đồ Tiếp cận Khó thở mạn", path: "pages/Tiếp cận/tiep-can.html" }
        ],
        relatedDrugs: [
          { name: "Phác đồ LAMA + LABA + ICS", path: "pages/Dược lý/duoc-ly.html" }
        ],
        asianData: true,
        bookmarked: true,
        createdAt: new Date().toISOString(),
        radarUrl: "../Guideline Radar/radar.html?card=copd_abe_2026",
        matrixEndpoints: {
          mace: { hr: "N/A", ci: "N/A", p: "N/A", verdict: "neutral", label: "Tập trung triệu chứng hô hấp" },
          cvDeath: { hr: "0.88", ci: "0.76-1.02", p: "0.09", verdict: "neutral", label: "Xu hướng giảm tử vong hô hấp" },
          allCauseDeath: { hr: "0.84", ci: "0.74-0.95", p: "0.006", verdict: "benefit", label: "-16% Tử vong chung khi dùng Triple Therapy (LABA+LAMA+ICS)" },
          hhf: { hr: "0.71", ci: "0.62-0.81", p: "<0.001", verdict: "benefit", label: "-29% Nhập viện do Đợt cấp COPD" },
          renal: { hr: "N/A", ci: "N/A", p: "N/A", verdict: "neutral", label: "N/A" },
          adverse: { hr: "1.38", ci: "1.12-1.70", p: "0.002", verdict: "adverse", label: "+ Tăng nguy cơ Viêm phổi do ICS (khi Eos < 100)" }
        },
        citation: {
          vancouver: "Bộ Y tế Việt Nam. Hướng dẫn chẩn đoán và điều trị Bệnh phổi tắc nghẽn mạn tính. Quyết định số 2131/QĐ-BYT. Hà Nội: NXB Y học; 2026.",
          apa: "Bộ Y tế Việt Nam. (2026). Hướng dẫn chẩn đoán và điều trị Bệnh phổi tắc nghẽn mạn tính (Quyết định 2131/QĐ-BYT). NXB Y học.",
          clinicalNote: "Theo Hướng dẫn COPD Bộ Y tế 2026: Ưu tiên khởi đầu bộ đôi LABA + LAMA cho Nhóm B & E; chỉ thêm ICS khi Eosinophil máu ≥ 300 tế bào/µL (Class I, Level A)."
        },
        pocketCard: {
          title: "⚡ Cheat-Sheet: Phác Đồ Khởi Đầu & Đợt Cấp COPD (BYT 2026)",
          dosageRules: [
            { drug: "Nhóm A (Nhẹ)", dose: "SABA (Salbutamol) xịt khi cần hoặc LABA/LAMA đơn trị", note: "mMRC 0-1, CAT < 10, 0-1 đợt cấp nhẹ" },
            { drug: "Nhóm B (Triệu chứng)", dose: "LABA + LAMA (Tiotropium/Olodaterol hoặc Umeclidinium/Vilanterol)", note: "mMRC ≥ 2, CAT ≥ 10, 0-1 đợt cấp nhẹ" },
            { drug: "Nhóm E (Đợt cấp)", dose: "LABA + LAMA (thêm ICS nếu Eos ≥ 300 / 3 thuốc 1 bình hít)", note: "≥ 2 đợt cấp trung bình hoặc ≥ 1 đợt cấp nhập viện" }
          ],
          rules: [
            "1. Chẩn đoán xác định bắt buộc có hô hấp ký: FEV1/FVC < 70% sau test giãn phế quản.",
            "2. Đợt cấp Rome 2022: Nhẹ (chỉ dùng SABA), Trung bình (thêm Kháng sinh/Corticoid uống), Nặng (nhập viện/ICU).",
            "3. Nguy cơ Pseudomonas: Tiền sử phân lập P. aeruginosa, FEV1 < 30%, hoặc dùng kháng sinh rộng rãi trong 90 ngày."
          ]
        },
        decisionTree: {
          title: "🧩 Thuật toán Phân Nhóm & Khởi Đầu Điều Trị COPD (BYT 2026)",
          startNode: "step_start",
          nodes: {
            step_start: {
              question: "Bệnh nhân có tiền sử ≥ 2 đợt cấp trung bình HOẶC ≥ 1 đợt cấp phải nhập viện trong 12 tháng qua?",
              options: [
                { text: "🚨 CÓ (Thuộc Nhóm E - Nhiều đợt cấp)", next: "step_group_e" },
                { text: "🟢 KHÔNG (Chỉ có 0 hoặc 1 đợt cấp không nhập viện)", next: "step_assess_cat" }
              ]
            },
            step_assess_cat: {
              question: "Đánh giá điểm triệu chứng mMRC hoặc CAT?",
              options: [
                { text: "mMRC 0-1 hoặc CAT < 10 ➔ Nhóm A", next: "step_group_a" },
                { text: "mMRC ≥ 2 hoặc CAT ≥ 10 ➔ Nhóm B", next: "step_group_b" }
              ]
            },
            step_group_a: {
              recommendation: "Khởi đầu 1 thuốc giãn phế quản (Tùy chọn SABA khi cần hoặc LAMA/LABA duy trì).",
              classRating: "Class I",
              levelRating: "Level A",
              color: "blue",
              options: []
            },
            step_group_b: {
              recommendation: "Khởi đầu ngay Bộ đôi thuốc giãn phế quản kéo dài LABA + LAMA (Ưu tiên bình hít kết hợp).",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            },
            step_group_e: {
              question: "Xét nghiệm Eosinophil máu ngoại vi là bao nhiêu?",
              options: [
                { text: "Eosinophil ≥ 300 tế bào/µL", next: "step_e_high_eos" },
                { text: "Eosinophil < 300 tế bào/µL", next: "step_e_low_eos" }
              ]
            },
            step_e_high_eos: {
              recommendation: "Chỉ định BỘ BA THUỐC (LABA + LAMA + ICS) ngay từ đầu để giảm đợt cấp & tử vong.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            },
            step_e_low_eos: {
              recommendation: "Khởi đầu LABA + LAMA. Tránh dùng ICS nếu Eos < 100 để ngăn ngừa nguy cơ Viêm phổi.",
              classRating: "Class I",
              levelRating: "Level B",
              color: "orange",
              options: []
            }
          }
        }
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
        relatedCalculators: [
          { name: "Tính eGFR (CKD-EPI)", path: "pages/Công cụ/Thận/CKD_EPI.html" }
        ],
        relatedFlowcharts: [
          { name: "Lưu đồ Tiếp cận Suy tim", path: "pages/Tiếp cận/tiep-can.html" }
        ],
        relatedDrugs: [
          { name: "Dược lý Thuốc Tim mạch & Suy tim", path: "pages/Dược lý/duoc-ly.html" }
        ],
        asianData: true,
        bookmarked: false,
        createdAt: new Date().toISOString(),
        radarUrl: "../Guideline Radar/radar.html?spec=cardio",
        matrixEndpoints: {
          mace: { hr: "0.80", ci: "0.71-0.89", p: "<0.001", verdict: "benefit", label: "-20% Tiêu chí gộp Tử vong TM / HHF" },
          cvDeath: { hr: "0.80", ci: "0.71-0.89", p: "<0.001", verdict: "benefit", label: "-20% Tử vong do tim mạch" },
          allCauseDeath: { hr: "0.84", ci: "0.76-0.93", p: "<0.001", verdict: "benefit", label: "-16% Tử vong do mọi nguyên nhân" },
          hhf: { hr: "0.74", ci: "0.66-0.83", p: "<0.001", verdict: "benefit", label: "-26% Nhập viện do suy tim" },
          renal: { hr: "0.70", ci: "0.58-0.85", p: "<0.001", verdict: "benefit", label: "Bảo vệ chức năng thận mạn" },
          adverse: { hr: "1.10", ci: "0.92-1.31", p: "0.31", verdict: "neutral", label: "Hạ áp nhẹ khi dùng ARNI" }
        },
        citation: {
          vancouver: "Hội Tim mạch học Quốc gia Việt Nam. Khuyến cáo chẩn đoán và điều trị suy tim cấp và mạn. Tạp chí Tim mạch học Việt Nam. 2023;(105):12-58.",
          apa: "Hội Tim mạch học Quốc gia Việt Nam. (2023). Khuyến cáo chẩn đoán và điều trị suy tim cấp và mạn. Tạp chí Tim mạch học Việt Nam, (105), 12-58.",
          clinicalNote: "Theo Khuyến cáo Suy tim VNHA 2023: Khởi đầu Bộ Tứ Trụ Cột (ARNI + BB + MRA + SGLT2i) cho tất cả BN HFrEF càng sớm càng tốt (Class I, Level A)."
        },
        pocketCard: {
          title: "⚡ Cheat-Sheet: Bộ Tứ Trụ Cột Điều Trị HFrEF (VNHA 2023)",
          dosageRules: [
            { drug: "ARNI (Sacubitril/Valsartan)", dose: "Khởi đầu 50mg BID ➔ Đích 200mg BID", note: "Ngưng ACEi trước 36h nếu chuyển sang ARNI" },
            { drug: "Chẹn Beta (Bisoprolol / Carvedilol)", dose: "Bisoprolol 1.25mg QD ➔ Đích 10mg QD", note: "Chỉ dùng khi suy tim mạn ổn định" },
            { drug: "Kháng MRA (Spironolactone)", dose: "12.5mg-25mg QD ➔ Đích 25-50mg QD", note: "Theo dõi K+ máu & eGFR" },
            { drug: "SGLT2i (Dapa / Empa 10mg)", dose: "10mg QD (Không cần chỉnh liều)", note: "Dùng cho cả EF giảm và EF bảo tồn" }
          ],
          rules: [
            "1. Khởi động đồng thời hoặc nối tiếp nhanh chóng 4 trụ cột trong vòng 4 tuần.",
            "2. Đánh giá chỉ số EF bằng Siêu âm tim (EF ≤ 40% = HFrEF; EF 41-49% = HFmrEF; EF ≥ 50% = HFpEF).",
            "3. Lợi tiểu quai (Furosemide) chỉ dùng khi có triệu chứng ứ huyết, giảm liều khi khô."
          ]
        },
        decisionTree: {
          title: "🧩 Thuật toán Phân loại & Chỉ định Trụ cột Suy tim",
          startNode: "step_start",
          nodes: {
            step_start: {
              question: "Phân suất tống máu thất trái (LVEF) trên siêu âm tim là bao nhiêu?",
              options: [
                { text: "LVEF ≤ 40% (Suy tim EF giảm - HFrEF)", next: "step_hfref" },
                { text: "LVEF 41-49% (HFmrEF) hoặc ≥ 50% (HFpEF)", next: "step_hfpef" }
              ]
            },
            step_hfref: {
              recommendation: "Chỉ định BỘ TỨ TRỤ CỘT: 1. ARNI (hoặc ACEi/ARB) + 2. Chẹn beta + 3. MRA + 4. SGLT2i.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            },
            step_hfpef: {
              recommendation: "Chỉ định SGLT2i (Empagliflozin / Dapagliflozin) để giảm nguy cơ nhập viện do suy tim + Lợi tiểu khi ứ huyết.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            }
          }
        }
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
        relatedCalculators: [
          { name: "Tính eGFR (CKD-EPI)", path: "pages/Công cụ/Thận/CKD_EPI.html" }
        ],
        relatedFlowcharts: [
          { name: "Lưu đồ Tiếp cận Đái tháo đường", path: "pages/Tiếp cận/tiep-can.html" }
        ],
        relatedDrugs: [
          { name: "Dược lý Thuốc Đái tháo đường", path: "pages/Dược lý/duoc-ly.html" }
        ],
        asianData: true,
        bookmarked: false,
        createdAt: new Date().toISOString(),
        radarUrl: "../Guideline Radar/radar.html?spec=endo",
        matrixEndpoints: {
          mace: { hr: "0.88", ci: "0.80-0.97", p: "0.01", verdict: "benefit", label: "-12% MACE khi phối hợp SGLT2i/GLP-1 RA" },
          cvDeath: { hr: "0.85", ci: "0.75-0.96", p: "0.009", verdict: "benefit", label: "-15% Tử vong tim mạch" },
          allCauseDeath: { hr: "0.88", ci: "0.79-0.98", p: "0.02", verdict: "benefit", label: "-12% Tử vong chung" },
          hhf: { hr: "0.68", ci: "0.59-0.78", p: "<0.001", verdict: "benefit", label: "-32% Nhập viện suy tim" },
          renal: { hr: "0.65", ci: "0.56-0.76", p: "<0.001", verdict: "benefit", label: "-35% Bảo vệ thận" },
          adverse: { hr: "1.02", ci: "0.89-1.18", p: "0.72", verdict: "neutral", label: "Nguy cơ hạ đường huyết thấp khi không dùng SU" }
        },
        citation: {
          vancouver: "Bộ Y tế Việt Nam. Hướng dẫn chẩn đoán và điều trị Đái tháo đường típ 2. Quyết định số 4800/QĐ-BYT. Hà Nội; 2020.",
          apa: "Bộ Y tế Việt Nam. (2020). Hướng dẫn chẩn đoán và điều trị Đái tháo đường típ 2 (Quyết định 4800/QĐ-BYT).",
          clinicalNote: "Theo Hướng dẫn ĐTĐ typ 2 Bộ Y tế 2020: Ưu tiên chọn SGLT2i / GLP-1 RA độc lập với HbA1c ở BN có ASCVD, Suy tim hoặc Bệnh thận mạn."
        },
        pocketCard: {
          title: "⚡ Cheat-Sheet: Mục Tiêu & Lựa Chọn Thuốc ĐTĐ Typ 2 (BYT)",
          dosageRules: [
            { drug: "Metformin", dose: "500mg-1000mg BID (Tối đa 2000mg/ngày)", note: "Khởi đầu chuẩn nếu eGFR ≥ 45" },
            { drug: "SGLT2i (Empa/Dapa)", dose: "10mg QD", note: "Ưu tiên khi có Suy tim, Bệnh thận mạn, ASCVD" },
            { drug: "DPP-4i (Sitagliptin/Linagliptin)", dose: "50mg-100mg QD / Linagliptin 5mg QD", note: "Linagliptin không cần chỉnh liều thận" }
          ],
          rules: [
            "1. Mục tiêu HbA1c chung < 7.0%. Cá thể hóa < 6.5% ở người trẻ, < 7.5-8.0% ở người cao tuổi/nhiều bệnh nền.",
            "2. Thắt chặt kiểm soát Huyết áp (< 130/80 mmHg) và Lipid máu (LDL-c < 1.8 mmol/L nếu nguy cơ cao)."
          ]
        },
        decisionTree: {
          title: "🧩 Thuật toán Chọn Thuốc Hạ Đường Huyết Ban Đầu",
          startNode: "step_start",
          nodes: {
            step_start: {
              question: "Bệnh nhân có ASCVD (Nhồi máu cơ tim, Đột quỵ), Suy tim hoặc eGFR < 60 mL/min?",
              options: [
                { text: "🚨 CÓ bệnh đồng mắc nguy cơ cao", next: "step_high" },
                { text: "🟢 Không có bệnh đồng mắc nguy cơ cao", next: "step_standard" }
              ]
            },
            step_high: {
              recommendation: "Chỉ định SGLT2i hoặc GLP-1 RA độc lập với HbA1c ban đầu.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "green",
              options: []
            },
            step_standard: {
              recommendation: "Khởi đầu Metformin 500mg-1000mg/ngày + Điều chỉnh lối sống.",
              classRating: "Class I",
              levelRating: "Level A",
              color: "blue",
              options: []
            }
          }
        }
      }
    ];

    if (typeof window !== 'undefined') {
      window.SAMPLE_STUDIES = SAMPLE_STUDIES;
    }


