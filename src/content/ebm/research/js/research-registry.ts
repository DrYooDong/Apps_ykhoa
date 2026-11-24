/**
 * CliniPortal 2.0 — CliniResearch Studio Static Registry
 * Path: src/content/ebm/research/js/research-registry.ts
 *
 * AUTO-GENERATED FROM MDX FRONTMATTER (Single Source of Truth)
 * Total Research Studies: 27
 * DO NOT EDIT MANUALLY — Run: npm run sync:research
 */

import type { ResearchStudyRecord } from './research-types';

export const KHO_RESEARCH_STATIC: ResearchStudyRecord[] = [
  {
    "id": "2026-icu-ca-the-hoa-beta-lactam",
    "slug": "2026-icu-ca-the-hoa-beta-lactam",
    "code": "GDL-2026-ICU-CA-THE-HOA-BETA-LACTAM",
    "title": "Cá thể hóa Liều Beta-lactam và Phối hợp Kháng sinh theo Hướng dẫn IDSA/ESCMID",
    "titleEn": "Personalized Beta-Lactam Dosing Strategies in the ICU",
    "journal": "Lancet Infect Dis",
    "organization": "ESCMID / ESICM",
    "year": 2026,
    "sourceUrl": "https://doi.org/10.1002/phar.70181",
    "file": "2026-icu-ca-the-hoa-beta-lactam.mdx",
    "specialty": "icu",
    "specialty2": "infect",
    "conditionKey": "sepsis",
    "problemLabels": [
      "prolonged-infusion-betalactam",
      "tdm-pkpd",
      "augmented-renal-clearance"
    ],
    "icd10": [
      "A41",
      "Z16"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "icu-sepsis-septic-shock"
    ],
    "population": "Bệnh nhân cấp cứu & Hồi sức tích cực (ICU), Sốc nhiễm khuẩn, ECMO, CRRT, Tăng thanh thải thận (ARC), AKI/CKD",
    "interventionClass": "antimicrobial-pkpd",
    "drug": "Penicillins, Cephalosporins (Cefepime, Ceftriaxone, Cefazolin), Carbapenems (Meropenem, Ertapenem), Monobactams",
    "intervention": "Phối hợp Colistin, Meropenem, Ceftazidime/Avibactam, Piperacillin/Tazobactam liều cá thể hóa",
    "comparatorType": "intermittent-bolus",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Kiểm soát nhiễm khuẩn đa kháng (CRKP, CRAB, CRPA)",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "primaryMetric": {
      "measure": "RR",
      "effectEstimate": 0.86,
      "ciLower": 0.78,
      "ciUpper": 0.95,
      "rawDiffText": "Truyền kéo dài vs Bolus ngắt quãng giảm tử vong 90 ngày ở Sepsis nặng",
      "pValue": "0.004"
    },
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "khang-sinh",
      "beta-lactam",
      "pk-pd-icu",
      "sepsis"
    ],
    "tags": [
      "ICU Critical Care",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Tối ưu phác đồ kháng sinh chống vi khuẩn Gram âm đa kháng đường ruột và không lên men tại khoa hồi sức.",
    "detailedConclusion": "Kết hợp TDM và phương pháp truyền liên tục để đạt nồng độ mục tiêu không gây độc thận.",
    "description": "Hướng dẫn đồng thuận quốc tế 2026 (ACCP/ESCMID/IDSA/SCCM) về cá thể hóa liều kháng sinh Beta-lactam ở bệnh nhân nặng: TDM, mô hình MIPD, xử lý chênh lệch nồng độ và thuật toán mục tiêu PK/PD.",
    "keyRecommendations": [
      "Khuyên dùng mục tiêu tối thiểu 100% fT > MIC (huyết tương) hoặc 100% fT > 4xMIC (mô khó thấm/viêm màng não) kết hợp liều nạp & truyền kéo dài.",
      "Áp dụng mô hình PK quần thể (MIPD) chủ động ngay từ đầu thay vì chỉ TDM thụ động phản ứng để chọn liều tối ưu cho từng cá thể.",
      "Quy trình 4 bước xử lý khi dự đoán mô hình sai lệch > 20% & theo dõi sát độc thần kinh (Cefepime Ctrough > 20-35 mg/L).",
      "Theo dõi sát đáp ứng điều trị, kiểm tra an toàn dùng thuốc và phòng ngừa biến chứng lâm sàng."
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Bệnh nhân ICU & Sốc nhiễm khuẩn": "Khuyến cáo áp dụng TDM & MIPD mạnh mẽ",
      "Bệnh nhân ECMO / CRRT / ARC": "Gia tăng đáng kể biến thiên thể tích Vd & thanh thải CL",
      "Độc thần kinh Cefepime": "Giám sát khi Nồng độ đáy Ctrough > 20-35 mg/L",
      "Sai lệch MIPD > 20%": "Quy trình 4 bước rà soát & Bayesian refitting"
    },
    "sections": [
      {
        "id": "sec-overview",
        "number": 1,
        "title": "Tổng Quan &amp; Cơ Sở",
        "icon": "fa-solid fa-globe"
      },
      {
        "id": "sec-definitions",
        "number": 2,
        "title": "Bảng Định Nghĩa",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-outcomes",
        "number": 3,
        "title": "Kết Cục &amp; An Toàn",
        "icon": "fa-solid fa-shield-virus"
      },
      {
        "id": "sec-targets",
        "number": 4,
        "title": "Đối Tượng Chỉ Định",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-stakeholders",
        "number": 5,
        "title": "Đội Ngũ &amp; Mẫu XN",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-mipd-discordance",
        "number": 6,
        "title": "Xử Lý Sai Lệch MIPD",
        "icon": "fa-solid fa-book-bookmark"
      },
      {
        "id": "sec-pkpd-algorithm",
        "number": 7,
        "title": "Thuật Toán PK/PD &amp; MIC",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-free-conc",
        "number": 8,
        "title": "Nồng Độ Tự Do &amp; Bệnh Nhi",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-citation",
        "number": 9,
        "title": "Trích Dẫn AMA",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-chest-toan-chuyen-hoa",
    "slug": "2026-chest-toan-chuyen-hoa",
    "code": "STU-2026-CHEST-TOAN-CHUYEN-HOA",
    "trialAcronym": "BICAR-ICU Synthesis",
    "title": "CHEST 2026: Liệu Pháp Natri Bicarbonate & Quản Lý Toan Chuyển Hóa Nặng Tại Khoa Hồi Sức Tích Cực (ICU)",
    "titleEn": "CHEST 2026: Sodium Bicarbonate Therapy for Patients With Severe Metabolic Acidaemia in the Intensive Care Unit",
    "journal": "Chest",
    "organization": "American College of Chest Physicians (CHEST)",
    "year": 2026,
    "sourceUrl": "https://www.chestcc.org/article/S2949-7884(26)00038-9/fulltext",
    "file": "2026-chest-toan-chuyen-hoa.mdx",
    "specialty": "icu",
    "specialty2": "renal",
    "conditionKey": "metabolic-acidosis",
    "problemLabels": [
      "severe-metabolic-acidemia",
      "aki-kdigo-2-3",
      "sodium-bicarbonate-iv"
    ],
    "icd10": [
      "E87.2",
      "R57.2",
      "N17"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": 4553,
    "asianData": false,
    "populationTags": [
      "icu-acidemia-ph-le-7.20",
      "septic-aki"
    ],
    "population": "Bệnh nhân trong tình trạng nguy kịch tại khoa hồi sức tích cực (ICU) có toan chuyển hóa máu nặng (pH < 7.20, HCO3- < 20 mEq/L), đặc biệt là nhóm có kèm theo tổn thương thận cấp (AKI).",
    "interventionClass": "fluid-electrolyte-acidbase",
    "drug": "Sodium bicarbonate, Tris hydroxymethyl aminomethane, Carbicarb, Calcium chloride, Calcium gluconate, Rasburicase, Fomepizole, N-acetylcysteine, Insulin, Thiamine, Glucose",
    "intervention": "Chiến lược quản lý toàn diện toan chuyển hóa nặng (pH < 7.20) tại ICU: Quy trình đánh giá hệ thống 5 bước (Bối cảnh lâm sàng, Anion Gap hiệu chỉnh albumin, Bù trừ hô hấp theo công thức Winters, Delta Ratio, Xét nghiệm đặc hiệu); Lưu đồ phân nhánh chỉ định Lọc máu cấp cứu (Urgent RRT) vs Natri Bicarbonate 4.2%; Động học cung cấp kiềm đệm (Buffer delivery) đối chiếu giữa các chế phẩm NaHCO3 và các phương thức RRT (CRRT 47.6 mEq/h, IHD 1920 mEq/h); Tổng hợp chứng cứ từ 8 thử nghiệm ngẫu nhiên lớn gồm BICAR-ICU 1 (giảm tử vong và RRT ở phân nhóm AKI), BICAR-ICU 2 (giảm 50% nhu cầu can thiệp RRT), SODa-BIC (tăng số giờ không dùng vận mạch); Nhận diện 5 bệnh cảnh chống chỉ định / tránh dùng NaHCO3 (DKA, TLS, Hạ Ca2+ ion hóa, Hạ K+ máu, Phù phổi cấp quá tải thể tích vô niệu); Chiến lược cài đặt máy thở bảo vệ phổi tránh tổn thương phổi do máy thở (VILI) từ tăng thông khí phút quá mức.",
    "comparatorType": "standard-of-care",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Đánh giá tính an toàn và hiệu quả của liệu pháp Natri Bicarbonate tĩnh mạch trong việc nâng đỡ huyết động, giảm nhu cầu can thiệp lọc máu cấp cứu (RRT) và tối ưu hóa kết cục lâm sàng ở bệnh nhân nguy kịch có toan chuyển hóa nặng tại ICU.",
    "outcomeDirection": "mixed-coprimary",
    "impactVerdict": "practice-changing",
    "keyResults": "Truyền Natri Bicarbonate 4.2% duy trì đích pH động mạch ≥ 7.30 giúp giảm 50% nhu cầu can thiệp lọc máu RRT (BICAR-ICU 2) và giảm tử vong ở phân nhóm AKI (BICAR-ICU 1) | Chỉ định lọc máu cấp cứu (Urgent RRT) bắt buộc khi có tăng kali máu đe dọa hoặc phù phổi cấp quá tải thể tích kèm vô niệu | Bắt buộc bù canxi ion hóa và kali máu trước khi truyền kiềm | Tuyệt đối tránh dùng NaHCO3 trong toan ceton đái tháo đường và hội chứng ly giải u | Tránh tăng thông khí phút thô bạo trên máy thở vì làm tăng công suất cơ học gây VILI.",
    "primaryMetric": {
      "measure": "RR",
      "effectEstimate": 0.76,
      "ciLower": 0.6,
      "ciUpper": 0.96,
      "rawDiffText": "Phân nhóm AKI KDIGO 2–3: Giảm tử vong 28 ngày & giảm nhu cầu RRT",
      "pValue": "0.017"
    },
    "robOverall": "low",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "toan-chuyen-hoa",
      "bicarbonate",
      "aki-icu",
      "loc-mau"
    ],
    "tags": [
      "CHEST",
      "2026",
      "Toan chuyển hóa",
      "Metabolic Acidosis",
      "Natri Bicarbonate",
      "BICAR-ICU",
      "RRT",
      "Hồi sức tích cực",
      "Thận học",
      "Evidence-Based Medicine"
    ],
    "summary": "Bài tổng quan lâm sàng chuyên sâu trên tạp chí CHEST (2026) của GS. Boris Jung và cộng sự: Cập nhật toàn diện sinh lý bệnh toan kiềm, quy trình 5 bước, lưu đồ chỉ định lọc máu cấp cứu vs NaHCO3 4.2%, động học bù kiềm và thực chứng từ các thử nghiệm ngẫu nhiên quy mô lớn BICAR-ICU 1 & 2.",
    "detailedConclusion": "Bác sĩ hồi sức tiếp cận toan chuyển hóa nặng (pH < 7.20) bằng cách đánh giá và xử trí đồng thời. Ưu tiên lọc máu cấp cứu nếu có tăng kali đe dọa hoặc quá tải dịch. Ở bệnh nhân có AKI không quá tải, truyền NaHCO3 4.2% duy trì pH ≥ 7.30 như một liệu pháp tạm thời giúp giảm 50% can thiệp RRT. Bắt buộc kiểm tra Ca2+ ion hóa và K+ trước khi truyền kiềm, và luôn tuân thủ thông khí bảo vệ phổi tránh tổn thương VILI.",
    "description": "Bài tổng quan lâm sàng chuyên sâu trên tạp chí CHEST (2026) thuộc chuyên mục Shock: How I Do It về liệu pháp Natri Bicarbonate tĩnh mạch trong toan chuyển hóa nặng (pH < 7.20) tại ICU. Phân tích sinh lý bệnh, quy trình đánh giá 5 bước, lưu đồ chỉ định lọc máu cấp cứu (Urgent RRT) vs Natri Bicarbonate 4.2%, động học cung cấp kiềm đệm, bằng chứng thực nghiệm từ các thử nghiệm ngẫu nhiên quy mô lớn BICAR-ICU 1 & 2 và SODa-BIC, 5 tình huống lâm sàng chống chỉ định hoặc cần tránh dùng, và chiến lược cài đặt thông khí phút bảo vệ phổi tránh tổn thương VILI.",
    "keyRecommendations": [
      "Đánh giá và xử trí toan chuyển hóa nặng (pH < 7.20) phải tiến hành đồng thời: Phân tích bối cảnh lâm sàng, đo Anion Gap hiệu chỉnh albumin, đánh giá bù trừ hô hấp (công thức Winters) và Delta Gap.",
      "Chỉ định lọc máu cấp cứu (Urgent RRT) ngay lập tức nếu bệnh nhân có tăng kali máu đe dọa tính mạng HOẶC có chống chỉ định quá tải thể tích (phù phổi cấp, suy tim ứ huyết, vô niệu).",
      "Sử dụng Natri Bicarbonate 4.2% như một liệu pháp tạm thời (temporizing strategy) để nâng và duy trì pH động mạch > 7.30 ở bệnh nhân có tổn thương thận cấp (AKI), giúp giảm 50% nhu cầu can thiệp lọc máu (BICAR-ICU 2).",
      "Tuyệt đối không truyền Natri Bicarbonate trong toan ceton đái tháo đường (DKA) và hội chứng ly giải u (TLS); bắt buộc bù canxi ion hóa và kali máu đầy đủ trước khi truyền kiềm.",
      "Không cố gắng bình thường hóa pH bằng cách tăng thông khí phút quá mức trên máy thở vì làm tăng công suất cơ học (mechanical power) gây tổn thương phổi do máy thở (VILI); ưu tiên chiến lược thông khí bảo vệ phổi."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-tongquan-bicanh",
        "number": 1,
        "title": "Bối Cảnh Lâm Sàng & Định Nghĩa Toan Nặng",
        "icon": "fa-solid fa-notes-medical"
      },
      {
        "id": "sec-sinhly-ca-benh",
        "number": 2,
        "title": "Phân Tích Ca Lâm Sàng & Sinh Lý Bệnh Acid-Base",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-quytrinh-5buoc",
        "number": 3,
        "title": "Quy Trình Đánh Giá Hệ Thống 5 Bước",
        "icon": "fa-solid fa-list-check"
      },
      {
        "id": "sec-luodo-figure1",
        "number": 4,
        "title": "Lưu Đồ Tiếp Cận Điều Trị (Figure 1)",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-donghoc-bu-kiem",
        "number": 5,
        "title": "Động Học Bù Kiềm: NaHCO3 vs Lọc Máu (RRT)",
        "icon": "fa-solid fa-flask-vial"
      },
      {
        "id": "sec-thucchung-rct",
        "number": 6,
        "title": "Thực Chứng Lâm Sàng: BICAR-ICU 1, 2 & SODa-BIC",
        "icon": "fa-solid fa-chart-line"
      },
      {
        "id": "sec-bang-tonghop-rct",
        "number": 7,
        "title": "Bảng Đối Chiếu 8 Thử Nghiệm Ngẫu Nhiên (Table 3)",
        "icon": "fa-solid fa-table-list"
      },
      {
        "id": "sec-chong-chi-dinh",
        "number": 8,
        "title": "5 Bệnh Cảnh Chống Chỉ Định / Tránh Dùng NaHCO3",
        "icon": "fa-solid fa-ban"
      },
      {
        "id": "sec-thong-khi-phut",
        "number": 9,
        "title": "Chiến Lược Cài Đặt Máy Thở & Nguy Cơ VILI",
        "icon": "fa-solid fa-lungs"
      },
      {
        "id": "sec-khuyen-cao-thuc-hanh",
        "number": 10,
        "title": "Khuyến Cáo Thực Hành Lâm Sàng & Quy Trình ICU",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-citation",
        "number": 11,
        "title": "Tài Liệu Tham Khảo Chuẩn AMA",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-09-04"
  },
  {
    "id": "2026-diagnostics-lao-thai-ky",
    "slug": "2026-diagnostics-lao-thai-ky",
    "code": "GDL-2026-DIAGNOSTICS-LAO-THAI-KY",
    "title": "Diagnostics 2026: Quản Lý Bệnh Lao Trong Thai Kỳ — Chẩn Đoán, Phác Đồ Hàng 1, MDR-TB & Chăm Sóc Chu Sinh",
    "titleEn": "Tuberculosis in Pregnancy: An Updated Narrative Review (Diagnostics 2026)",
    "journal": "Diagnostics (Basel)",
    "organization": "Diagnostics / WHO EBM",
    "year": 2026,
    "file": "2026-diagnostics-lao-thai-ky.mdx",
    "specialty": "infect",
    "conditionKey": "tb",
    "problemLabels": [
      "tb-in-pregnancy",
      "mdr-tb-perinatal",
      "maternal-fetal-outcomes"
    ],
    "icd10": [
      "A15",
      "A16",
      "O98.0",
      "P37.0"
    ],
    "design": "clinical-review",
    "phase": "Narrative Review / EBM Guidelines",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "pregnant-postpartum",
      "active-or-latent-tb"
    ],
    "population": "Phụ nữ mang thai, phụ nữ sau sinh (postpartum), trẻ sơ sinh có phơi nhiễm hoặc mắc bệnh lao (TB, MDR-TB, đồng nhiễm TB/HIV).",
    "interventionClass": "antimicrobial-pkpd",
    "drug": "Isoniazid, Rifampicin, Pyrazinamide, Ethambutol, Pyridoxine (Vitamin B6), Levofloxacin, Bedaquiline, Linezolid",
    "intervention": "Tầm soát hệ thống 4 triệu chứng ở mỗi lần khám thai; chẩn đoán bằng GeneXpert MTB/RIF Ultra và X-quang ngực chắn chì bảo vệ bụng; khởi trị ngay phác đồ 6 tháng 2HRZE/4HR kết hợp Vitamin B6; điều trị MDR-TB bằng phác đồ toàn đường uống nhóm A (Fluoroquinolones, Bedaquiline, Linezolid), tuyệt đối chống chỉ định Aminoglycosides và Ethionamide; quản lý lao bẩm sinh theo tiêu chuẩn Cantwell và dự phòng sơ sinh bằng H+R.",
    "comparatorType": "standard-of-care",
    "primaryEndpointCategory": "organ-protection",
    "primaryEndpoint": "Tổng quan toàn diện các bằng chứng EBM cập nhật nhất về dịch tễ học, biến chứng mẹ - thai, phương thức chẩn đoán tích hợp, phác đồ điều trị lao nhạy cảm và lao kháng thuốc, đồng nhiễm HIV, lao sơ sinh và chăm sóc hậu sản.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "Điều trị thành công 88% với phác đồ chuẩn 6 tháng 2HRZE/4HR ở thai phụ | Giảm tử vong chu sinh (lao hoạt động chưa điều trị làm tăng OR = 4,2 tử vong chu sinh, OR = 9,0 sảy thai) | Phác đồ uống MDR-TB đạt 72,2% thành công (Alene et al.).",
    "robOverall": "not-applicable",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "lao-thai-ky",
      "khang-sinh",
      "an-toan-thai-nhi"
    ],
    "tags": [
      "Lao thai kỳ",
      "Tuberculosis in Pregnancy",
      "Diagnostics 2026",
      "MDR-TB",
      "GeneXpert",
      "Lao bẩm sinh",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Tổng quan EBM 2026 trên tạp chí Diagnostics cung cấp hướng dẫn thực hành toàn diện về quản lý bệnh lao trong thai kỳ. Nhấn mạnh việc tầm soát 4 triệu chứng tại mỗi lần khám thai, không trì hoãn điều trị lao hoạt động bằng phác đồ chuẩn 6 tháng 2HRZE/4HR có bổ sung Pyridoxine (B6), áp dụng phác đồ toàn đường uống cho MDR-TB và kiểm soát chặt chẽ lao bẩm sinh theo tiêu chuẩn Cantwell.",
    "detailedConclusion": "Không bao giờ trì hoãn điều trị lao hoạt động trong thai kỳ vì nguy cơ tử vong mẹ và chu sinh vượt trội hoàn toàn so với độc tính thuốc. Phác đồ chuẩn 6 tháng 2HRZE/4HR an toàn và đạt tỷ lệ khỏi bệnh 88%, bắt buộc bổ sung Pyridoxine 25-50 mg/ngày phòng độc thần kinh và Vitamin K gần ngày sinh phòng băng huyết. Đối với MDR-TB, ưu tiên phác đồ hoàn toàn đường uống nhóm A (Levofloxacin/Moxifloxacin, Bedaquiline, Linezolid) kéo dài 18-24 tháng; chống chỉ định tuyệt đối Aminoglycosides (Amikacin/Streptomycin - gây điếc thai nhi) và Ethionamide (dị tật bẩm sinh). Trẻ sơ sinh sinh từ mẹ mắc lao hoạt động cần được đánh giá tiêu chuẩn Cantwell; nếu khỏe mạnh, uống dự phòng INH + Rifampicin trong 3 tháng trước khi làm TST tiêm BCG; chống chỉ định BCG cho thai phụ và trẻ nghi ngờ nhiễm HIV. Cho con bú an toàn khi mẹ dùng thuốc hàng 1 và đã điều trị đủ 2 tuần.",
    "description": "Tổng quan cập nhật EBM 2026 trên tạp chí Diagnostics về bệnh lao trong thai kỳ: dịch tễ học, biến chứng mẹ - thai, thuật toán chẩn đoán tích hợp 6 bước, phác đồ hàng 1, quản lý lao kháng thuốc MDR-TB, đồng nhiễm HIV, lao ngoài phổi, lao bẩm sinh và chăm sóc chu sinh.",
    "keyRecommendations": [
      "Tầm soát hệ thống 4 triệu chứng (ho, sốt, ra mồ hôi đêm, sụt cân/không tăng cân thai kỳ) ở mỗi lần khám thai tại vùng gánh nặng cao.",
      "Không trì hoãn điều trị lao hoạt động: Phác đồ chuẩn 6 tháng 2HRZE/4HR đạt tỷ lệ khỏi bệnh 88%; bắt buộc bổ sung Pyridoxine (Vitamin B6).",
      "MDR-TB thai kỳ: Ưu tiên phác đồ hoàn toàn đường uống (All-oral) nhóm A (Levofloxacin/Moxifloxacin, Bedaquiline, Linezolid); CHỐNG CHỈ ĐỊNH Aminoglycosides và Ethionamide.",
      "Lao bẩm sinh & Sơ sinh: Áp dụng tiêu chuẩn Cantwell, điều trị 4 thuốc 6 tháng; dự phòng INH + Rifampicin 3 tháng cho trẻ phơi nhiễm; chống chỉ định BCG cho thai phụ và trẻ nghi ngờ HIV."
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Biến chứng mẹ - thai (Sobhy et al.)": "HBAR: Tăng tử vong chu sinh (OR): 4.2% | Tăng sảy thai / thai lưu (OR): 9.0% | Tăng nguy cơ sinh non (OR): 1.7% | Bệnh tật chung người mẹ (OR): 3.0%",
      "Hiệu quả phác đồ lâm sàng": "HBAR: Tỷ lệ khỏi bệnh phác đồ chuẩn 2HRZE/4HR: 88.0% | Tỷ lệ thành công phác đồ MDR-TB thai kỳ: 72.2% | Kết cục thai kỳ thuận lợi trong MDR-TB: 72.3%",
      "Khuyến cáo an toàn thai kỳ": "HBAR: Phác đồ chuẩn hàng 1 (2HRZE/4HR + B6): 100.0% | Tránh Aminoglycosides & Ethionamide: 100.0% | X-quang chắn chì an toàn: 100.0%"
    },
    "sections": [
      {
        "id": "sec-dichte",
        "number": 1,
        "title": "Dịch tễ học & Phương pháp tổng quan",
        "icon": "fa-solid fa-globe"
      },
      {
        "id": "sec-sinhbenh-nguyco",
        "number": 2,
        "title": "Sinh bệnh học & Biến chứng Mẹ - Thai",
        "icon": "fa-solid fa-person-pregnant"
      },
      {
        "id": "sec-chandoan",
        "number": 3,
        "title": "Phương thức chẩn đoán & Hình ảnh học",
        "icon": "fa-solid fa-microscope"
      },
      {
        "id": "sec-luodo-chandoan",
        "number": 4,
        "title": "Lưu đồ thuật toán chẩn đoán tích hợp",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-dieutri-hang1",
        "number": 5,
        "title": "Phác đồ điều trị hàng 1 & An toàn thuốc",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-mdr-hiv",
        "number": 6,
        "title": "Lao đa kháng thuốc (MDR-TB) & Đồng nhiễm HIV",
        "icon": "fa-solid fa-shield-virus"
      },
      {
        "id": "sec-sosinh-hauphu",
        "number": 7,
        "title": "Lao ngoài phổi, Sơ sinh & Hậu sản",
        "icon": "fa-solid fa-baby"
      },
      {
        "id": "sec-ebm-gaps",
        "number": 8,
        "title": "Khuyến cáo thực hành & Khoảng trống nghiên cứu",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-09-17"
  },
  {
    "id": "2026-lancet-hiv-hepatitis-coinfection",
    "slug": "2026-lancet-hiv-hepatitis-coinfection",
    "code": "GDL-2026-LANCET-HIV-HEPATITIS",
    "title": "Đồng Nhiễm HIV Và Virus Viêm Gan: Hiện Tại, Tương Lai Và Chiến Lược Quản Lý Toàn Diện",
    "titleEn": "The present and future of HIV and viral hepatitis co-infection",
    "journal": "Lancet HIV",
    "organization": "Lancet HIV / ESCMID",
    "year": 2026,
    "file": "2026-lancet-hiv-hepatitis-coinfection.mdx",
    "specialty": "infect",
    "specialty2": "gi",
    "conditionKey": "hiv-hepatitis-coinfection",
    "problemLabels": [
      "hiv-hbv-hcv-hdv",
      "tenofovir-sparing-flare-risk",
      "bulevirtide-daa"
    ],
    "icd10": [
      "B20",
      "B18.1",
      "B18.2",
      "B18.0",
      "B15",
      "B17.2"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": false,
    "populationTags": [
      "people-living-with-hiv",
      "viral-hepatitis-coinfection"
    ],
    "population": "Bệnh nhân nhiễm HIV đồng nhiễm hoặc có nguy cơ đồng nhiễm virus viêm gan (HBV, HCV, HDV, HAV, HEV)",
    "interventionClass": "hepatology-portal",
    "drug": "Tenofovir disoproxil fumarate (TDF), Tenofovir alafenamide (TAF), Lamivudine (3TC), Emtricitabine (FTC), Bulevirtide, PegIFN-alpha, Bepirovirsen, Sofosbuvir/Velpatasvir, Glecaprevir/Pibrentasvir, Heplisav-B (HepB-CpG)",
    "intervention": "Tầm soát hệ thống, tiêm vắc xin HepB-CpG, phác đồ ART chứa Tenofovir cho HBV, DAA pangenotypic cho HCV, Bulevirtide cho HDV, quản lý dịch HAV/HEV",
    "comparatorType": "standard-art",
    "primaryEndpointCategory": "organ-protection",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "robOverall": "not-applicable",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "hiv",
      "viem-gan-virus",
      "dong-nhiem"
    ],
    "tags": [
      "Lancet HIV",
      "2026",
      "Truyền nhiễm",
      "Tiêu hóa - Gan mật",
      "Đồng nhiễm HIV và Viêm gan",
      "HBV",
      "HCV",
      "HDV",
      "HAV",
      "HEV",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "description": "Tổng quan hệ thống Lancet HIV 2026 về dịch tễ, cơ chế bệnh sinh, chiến lược ART tách Tenofovir, nguy cơ bùng phát HBV, điều trị HCV DAA, bulevirtide HDV và vắc xin",
    "keyRecommendations": [
      "Bệnh nhân HIV đồng nhiễm HBV (HBsAg dương tính) bắt buộc duy trì phác đồ ART chứa TDF hoặc TAF; tuyệt đối không dùng 3TC/FTC đơn độc làm hoạt chất kháng HBV duy nhất.",
      "Tầm soát kỹ serology HBV (HBsAg, anti-HBc, anti-HBs) trước khi chuyển sang phác đồ ART không Tenofovir; theo dõi chặt chẽ transaminase và HBV DNA để phát hiện sớm bùng phát HBV.",
      "Khởi trị ngay liệu pháp DAA pangenotypic (Sofosbuvir/Velpatasvir 12 tuần hoặc Glecaprevir/Pibrentasvir 8–12 tuần) cho tất cả bệnh nhân đồng nhiễm HIV/HCV.",
      "Ưu tiên sử dụng vắc xin HepB-CpG (Heplisav-B 20 µg, 2 liều vào tháng 0 và 1) cho người nhiễm HIV để đạt tỷ lệ đáp ứng bảo vệ huyết thanh cao vượt trội (99.4%)."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "1. Đại Cương & Bối Cảnh Dịch Tễ Học Đồng Nhiễm HIV - Virus Viêm Gan",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "2. Đồng Nhiễm HIV-HBV: Quản Lý Phác Đồ ART Và Nguy Cơ Bùng Phát HBV Khi Tách Tenofovir",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "3. Hướng Tới Chữa Khỏi HBV & Quản Lý Đồng Nhiễm Viêm Gan Delta (HDV)",
        "icon": "fa-solid fa-vial-virus"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "4. Đồng Nhiễm HIV-HCV: Vi Mô Loại Trừ, Điều Trị DAA & Tái Nhiễm",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "5. Viêm Gan A (HAV) & Viêm Gan E (HEV): Bùng Phát Dịch Và Ca Bệnh Tản Mạn",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "6. Tiêm Chủng Vắc Xin, Kế Hoạch Theo Dõi & Trích Dẫn Y Văn Chuẩn AMA",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-11-04"
  },
  {
    "id": "2026-icm-namsap-ards",
    "slug": "2026-icm-namsap-ards",
    "code": "GDL-2026-ICM-NAMSAP-ARDS",
    "trialAcronym": "PROSEVA & Prone ARDS",
    "title": "ICM 2026: Thông khí Nằm sấp và Chiến lược Bảo vệ Phổi trong ARDS Nặng",
    "titleEn": "Prone Positioning and Lung-Protective Ventilation in Moderate-to-Severe ARDS",
    "journal": "Intensive Care Med",
    "organization": "European Society of Intensive Care Medicine (ESICM)",
    "year": 2026,
    "file": "2026-icm-namsap-ards.mdx",
    "specialty": "icu",
    "specialty2": "pulmo",
    "conditionKey": "ards",
    "problemLabels": [
      "moderate-severe-ards",
      "prone-positioning",
      "ventilator-induced-lung-injury"
    ],
    "icd10": [
      "J80",
      "J96.0"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "icu-mechanically-ventilated",
      "pf-ratio-lt-150"
    ],
    "population": "Bệnh nhân suy hô hấp cấp tiến triển (ARDS) mức độ trung bình đến nặng (PaO2/FiO2 < 150 mmHg) đang thở máy xâm lấn, hoặc bệnh nhân tự thở bị suy hô hấp cấp giảm oxy máu cần hỗ trợ hô hấp không xâm lấn.",
    "interventionClass": "respiratory-support",
    "drug": "Thuốc giãn cơ (NMBAs), Thuốc an thần, Oxy",
    "intervention": "Thông khí nằm sấp ≥ 16 giờ/ngày, thể tích khí lưu thông thấp (Vt 4-6 ml/kg PBW), Pplat < 30 cmH2O, Driving pressure < 14 cmH2O",
    "comparatorType": "supine-ventilation",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Giảm tỷ lệ tử vong 28 ngày và 90 ngày ở bệnh nhân ARDS có PaO2/FiO2 < 150",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "primaryMetric": {
      "measure": "HR",
      "effectEstimate": 0.39,
      "ciLower": 0.25,
      "ciUpper": 0.63,
      "rawDiffText": "PROSEVA Tử vong 28 ngày: 16.0% vs 32.8%",
      "pValue": "<0.001",
      "nnt": 6
    },
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "ards",
      "thong-khi-nam-sap",
      "hoi-suc-ho-hap"
    ],
    "tags": [
      "ICM",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Can thiệp nằm sấp sớm giúp đồng đều thông khí - tưới máu phổi, mở các phế nang xẹp vùng lưng và cải thiện sống còn rõ rệt.",
    "detailedConclusion": "Bắt đầu nằm sấp sớm trong vòng 24-48 giờ đầu ở ARDS từ vừa đến nặng có chỉ định.",
    "description": "Tổng quan khuyến cáo y khoa 2026 trên tạp chí Intensive Care Medicine (ICM) về Tư Thế Nằm Sấp Trong ARDS: Cơ chế sinh lý, Thử nghiệm PROSEVA, Thử nghiệm Meta-trial Nằm sấp thức tỉnh (APP) & Phác đồ quy chuẩn lâm sàng.",
    "keyRecommendations": [
      "PaO2/FiO2 < 150, PEEP ≥ 5 cmH2O. Nằm sấp sớm, duy trì ≥ 16 giờ/ngày (Khuyến cáo mạnh).",
      "Bệnh nhân chưa đặt ETT thở HFNC. Mục tiêu > 8 – 10 giờ/ngày. Giảm thất bại điều trị từ 44% &rarr; 33%.",
      "Tối ưu tương hợp V/Q, huy động phế nang lưng, hạn chế VILI / PSILI & giảm hậu tải thất phải.",
      "Theo dõi sát đáp ứng điều trị, kiểm tra an toàn dùng thuốc và phòng ngừa biến chứng lâm sàng."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Bệnh nhân Thở máy (Đặt ETT)",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Lịch sử &amp; PROSEVA Trial",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Nằm sấp Thức tỉnh (APP)",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Quy trình Thực hành &amp; Theo dõi",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Thử nghiệm Đang diễn ra",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-jcrc-cai-thuoc-van-mach",
    "slug": "2026-jcrc-cai-thuoc-van-mach",
    "code": "GDL-2026-JCRC-CAI-VAN-MACH",
    "title": "JCRC 2026: Trình Tự & Phương Pháp Cai Thuốc Vận Mạch Trong Sốc Nhiễm Khuẩn — Phân Tích Sai Lệch Phương Pháp Luận & Khung Tiếp Cận Theo Kiểu Hình",
    "titleEn": "Vasopressor Weaning in Septic Shock: Why the Field Has Been Asking the Wrong Question (Zaidi et al., JCRC 2026/2027)",
    "journal": "J Crit Care",
    "organization": "Journal of Critical Care (JCRC) / SSC",
    "year": 2026,
    "file": "2026-jcrc-cai-thuoc-van-mach.mdx",
    "specialty": "icu",
    "specialty2": "infect",
    "conditionKey": "sepsis",
    "problemLabels": [
      "vasopressor-weaning-order",
      "norepinephrine-vs-vasopressin",
      "immortal-time-bias"
    ],
    "icd10": [
      "R57.2",
      "A41.9",
      "I50.9"
    ],
    "design": "systematic-review",
    "centerScope": "multicenter-intl",
    "sampleSize": 2500,
    "asianData": false,
    "populationTags": [
      "septic-shock-recovering",
      "dual-vasopressor"
    ],
    "population": "Bệnh nhân sốc nhiễm khuẩn trong giai đoạn phục hồi đang được điều trị đồng thời bằng Norepinephrine và Vasopressin.",
    "interventionClass": "vasopressor-hemodynamics",
    "drug": "Norepinephrine, Vasopressin, Corticosteroids, Hydrocortisone",
    "intervention": "Tổng quan hệ thống và phân tích đột phá về trình tự và phương pháp cai thuốc vận mạch trong hồi phục sốc nhiễm khuẩn: Giải mã nghịch lý giữa 2 RCTs (ủng hộ VP-first) vs 11 nghiên cứu quan sát (ủng hộ NE-first); Nhận diện 3 sai lệch phương pháp luận cốt lõi: (1) Sai lệch định nghĩa tụt huyết áp do hành vi bác sĩ (clinician-behavior artifact) bắt nguồn từ khoảng liều rộng của NE (0.01-1.0 µg/kg/phút) vs trần liều cứng của AVP (0.03-0.04 U/phút); (2) Phương pháp ngừng thuốc (giảm liều tiệm tiến vs dừng đột ngột) mang tính quyết định hơn trình tự: phân nhóm dừng đột ngột lệch về NE-first (OR = 0.22) do sập huyết động, trong khi phân nhóm giảm liều tiệm tiến trong RCTs đảo chiều ủng hộ VP-first (OR = 4.04); (3) Tương tác nội tiết qua trục V3-ACTH-cortisol: ngừng AVP đột ngột gây cú sập kép ở người không dùng steroid, trong khi hydrocortisone ngoại sinh trung hòa hoàn toàn hiệu ứng này (Wu 2020); Đề xuất Khung cai thuốc hướng dẫn bởi kiểu hình lâm sàng (Phenotype-guided weaning framework): Phân nhóm suy tim EF ≤ 40% ưu tiên cai Vasopressin trước (VP-first, giảm 6 ngày ICU, giảm 5 ngày thở máy, giảm tái dùng vận mạch aOR 0.20 theo Taylor 2022); Phân nhóm có thiếu hụt Vasopressin (Copeptin thấp) bắt buộc giảm liều tiệm tiến; Phân nhóm dùng steroid đồng thời linh hoạt cả hai trình tự; Đề xuất thiết kế thử nghiệm giai thừa 2x2 (400 BN) với tiêu chí chính là thời gian đạt trạng thái ngừng vận mạch bền vững ≥ 6 giờ.",
    "comparatorType": "active-control",
    "primaryEndpointCategory": "severity-prognosis",
    "primaryEndpoint": "Giải mã mâu thuẫn y văn về trình tự cai vận mạch, chứng minh vai trò quyết định của phương pháp giảm liều tiệm tiến Vasopressin, và xác lập khung tiếp cận cá thể hóa theo kiểu hình chức năng tim (EF ≤ 40%), dấu ấn hormone (Copeptin) và tình trạng dùng Corticosteroid đồng thời.",
    "outcomeDirection": "neutral-null",
    "impactVerdict": "practice-informing",
    "keyResults": "Phương pháp ngừng thuốc (giảm liều tiệm tiến vs ngừng đột ngột) mang tính quyết định hơn trình tự cai | Ngừng đột ngột Vasopressin gây cú sốc huyết động do rơi vào khoảng trống thiếu hụt hormone nội sinh | Phân nhóm EF ≤ 40%: Cai Vasopressin trước (VP-first) vượt trội rõ rệt (giảm nằm ICU từ 15 xuống 9 ngày, p = 0.01; giảm thở máy từ 11 xuống 6 ngày, p = 0.029; aOR tái dùng vận mạch 0.20) | Hydrocortisone ngoại sinh trung hòa sự sụp đổ của trục V3-ACTH-cortisol, cho phép linh hoạt chọn trình tự cai | Sai lệch hành vi bác sĩ giải thích toàn bộ sự mâu thuẫn giữa RCTs và nghiên cứu quan sát.",
    "robOverall": "high",
    "gradeCertainty": "low",
    "fragilityIndex": null,
    "topicTags": [
      "thuoc-van-mach",
      "soc-nhiem-khuan",
      "sai-lech-phuong-phap"
    ],
    "tags": [
      "JCRC",
      "Surviving Sepsis Campaign",
      "2026",
      "Sốc nhiễm khuẩn",
      "Thuốc vận mạch",
      "Norepinephrine",
      "Vasopressin",
      "Evidence-Based Medicine"
    ],
    "summary": "Tổng quan hệ thống và phân tích đột phá trên Journal of Critical Care (2026/2027) của TS. Syed Arsalan Akhter Zaidi và cộng sự: Giải mã cuộc tranh luận kéo dài 15 năm về trình tự cai Norepinephrine vs Vasopressin trong sốc nhiễm khuẩn, làm rõ sai lệch định nghĩa do hành vi người thầy thuốc, chứng minh vai trò sống còn của phương pháp giảm liều tiệm tiến và đề xuất mô hình cai thuốc theo kiểu hình lâm sàng (EF, Copeptin, Corticosteroid).",
    "detailedConclusion": "Bác sĩ hồi sức tiếp cận cai vận mạch ở bệnh nhân hồi phục sốc nhiễm khuẩn (ổn định ≥ 6h, lactate ≤ 2.0 mmol/L): Siêu âm tim tại giường đánh giá LVEF. Nếu EF ≤ 40%: Khuyến cáo cai Vasopressin trước (VP-first) bằng phương pháp giảm liều tiệm tiến để bảo vệ lực co bóp tim qua thụ thể β₁ của Norepinephrine. Bất kể trình tự nào, TUYỆT ĐỐI KHÔNG ngừng Vasopressin đột ngột mà phải giảm liều tiệm tiến (0.03 → 0.02 → 0.01 → 0 U/phút mỗi 2h) để vượt qua khoảng trống thiếu hụt hormone nội sinh. Nếu không dùng Corticosteroid ngoại sinh, ưu tiên cai NE trước để duy trì kích thích bài tiết cortisol nội sinh qua trục V3-ACTH.",
    "description": "Tổng quan hệ thống và phân tích đột phá trên JCRC (2026/2027) của Syed Arsalan Akhter Zaidi: Giải mã nghịch lý cai Norepinephrine trước (NE-first) vs Vasopressin trước (VP-first), sai lệch hành vi bác sĩ (clinician-behavior artifact), vai trò cốt lõi của giảm liều tiệm tiến (titrated tapering), tương tác trục V3-ACTH-cortisol và mô hình cai thuốc theo kiểu hình EF, Copeptin và Corticosteroid.",
    "keyRecommendations": [
      "Không có một trình tự cai thuốc duy nhất tối ưu cho mọi bệnh nhân; phương pháp ngừng thuốc (giảm liều tiệm tiến vs ngừng đột ngột) mang tính quyết định hơn trình tự.",
      "Ở bệnh nhân có suy giảm chức năng thất trái (EF ≤ 40%), khuyến cáo cai Vasopressin trước (VP-first) để duy trì hỗ trợ co bóp cơ tim qua thụ thể β₁ từ Norepinephrine và tránh tăng hậu tải đơn độc.",
      "Tuyệt đối không ngừng Vasopressin đột ngột vì gây sập huyết động do khoảng trống thiếu hụt hormone nội sinh; bắt buộc giảm liều tiệm tiến (titrated taper: giảm 25% mỗi 1–2 giờ).",
      "Ở bệnh nhân không dùng kèm Corticosteroid ngoại sinh, ưu tiên cai Norepinephrine trước (NE-first) để bảo tồn sự kích thích bài tiết cortisol nội sinh qua trục V₃-ACTH.",
      "Nghiên cứu tương lai cần áp dụng thiết kế giai thừa 2×2 với tiêu chí chính là thời gian đạt trạng thái ngừng vận mạch bền vững (≥ 6 giờ) nhằm triệt tiêu sai lệch do hành vi điều chỉnh liều."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Tổng Quan & Nghịch Lý Lâm Sàng Cai Vận Mạch",
        "icon": "fa-solid fa-scale-unbalanced"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Dược Lý Học & Động Học Phân Rã (Figure 1)",
        "icon": "fa-solid fa-chart-line"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Sai Lệch Định Nghĩa Do Hành Vi Bác Sĩ (Figure 2)",
        "icon": "fa-solid fa-user-doctor"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phương Pháp Ngừng Thuốc Là Quyết Định (Figure 4)",
        "icon": "fa-solid fa-square-poll-vertical"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Khung Tiếp Cận Hướng Dẫn Bởi Kiểu Hình (Figure 3)",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Thiết Kế Thử Nghiệm Giai Thừa 2×2 (Table 2)",
        "icon": "fa-solid fa-table-cells"
      },
      {
        "id": "sec-7",
        "number": 7,
        "title": "Khuyến Cáo EBM & Phác Đồ Giảm Liều Tiệm Tiến",
        "icon": "fa-solid fa-clipboard-check"
      },
      {
        "id": "sec-8",
        "number": 8,
        "title": "Công Cụ CDSS Phân Tầng Cai Thuốc Tại Giường",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-9",
        "number": 9,
        "title": "Tài Liệu Tham Khảo EBM Chuẩn AMA",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-09-04"
  },
  {
    "id": "2026-icu-khang-sinh-cho-bn-nang",
    "slug": "2026-icu-khang-sinh-cho-bn-nang",
    "code": "GDL-2026-ICU-KHANG-SINH-CHO-BN-NANG",
    "title": "Kháng Sinh Cho Bệnh Nhân Nặng (ICU) — Tối Ưu Hóa PK/PD & Phác Đồ Lâm Sàng 2026",
    "titleEn": "Antimicrobial Optimization in Critically Ill Patients: PK/PD Principles and Regimens (2026)",
    "journal": "Crit Care Clin",
    "organization": "Critical Care Clinics",
    "year": 2026,
    "sourceUrl": "https://drive.google.com/file/d/1V0ey2paO8Enbt8U4OtH1xK0Vn_MIS6Tn/view?ts=6a58efa8",
    "file": "2026-icu-khang-sinh-cho-bn-nang.mdx",
    "specialty": "icu",
    "specialty2": "infect",
    "conditionKey": "sepsis",
    "problemLabels": [
      "empiric-icu-antibiotics",
      "crrt-ecmo-dosing",
      "de-escalation"
    ],
    "icd10": [
      "Z29.2",
      "A49.9"
    ],
    "design": "clinical-review",
    "phase": "Comprehensive Expert Review / Clinical Guideline",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "icu-critically-ill",
      "crrt-ecmo"
    ],
    "population": "Bệnh nhân hồi sức tích cực (ICU) bị nhiễm trùng nặng, nhiễm khuẩn huyết, sốc nhiễm khuẩn hoặc nhiễm vi khuẩn đa kháng (MDR/XDR).",
    "interventionClass": "antimicrobial-pkpd",
    "drug": "Meropenem, Piperacillin/Tazobactam, Cefepime, Vancomycin, Colistin, Ceftazidime/Avibactam, Amikacin",
    "intervention": "Tối ưu hóa liều kháng sinh dựa trên các biến đổi sinh lý bệnh ICU: tăng thể tích phân bố (Vd lớn do rò mao mạch, bù dịch), tăng thanh thải thận (ARC - CrCl > 130 mL/phút) hoặc suy thận/CRRT; chiến lược truyền kéo dài (Extended Infusion 3-4 giờ) hoặc truyền liên tục (Continuous Infusion 24h) cho kháng sinh phụ thuộc thời gian Beta-lactam nhằm đạt đích %T > 4-5x MIC = 100%; giám sát nồng độ thuốc trong máu (TDM) cho Vancomycin (AUC/MIC 400-600) và Aminoglycosides; phác đồ kinh nghiệm xuống thang sớm theo kết quả vi sinh.",
    "comparatorType": "standard-dosing",
    "primaryEndpointCategory": "clinical-recovery",
    "primaryEndpoint": "Đạt đích dược động học / dược lực học (PK/PD) tối đa, nâng cao tỷ lệ diệt khuẩn lâm sàng, giảm nguy cơ chọn lọc chủng vi khuẩn kháng thuốc và hạ thấp tỷ lệ tử vong sốc nhiễm khuẩn tại ICU.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "Truyền liên tục Beta-lactam (MERCY & BLING trials) giảm tỷ lệ tử vong nội viện và cải thiện khỏi bệnh lâm sàng ở bệnh nhân sốc | Bỏ qua liều nạp ban đầu làm chậm đạt nồng độ điều trị đến 48 giờ ở 70% bệnh nhân ICU | TDM Vancomycin dựa trên AUC giảm 50% độc tính trên thận so với theo dõi đáy nồng độ Trough cổ điển.",
    "robOverall": "not-applicable",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "khang-sinh",
      "pk-pd-icu",
      "crrt-ecmo"
    ],
    "tags": [
      "ICU Critical Care",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Tài liệu tổng quan lâm sàng chuyên sâu trên Critical Care Clinics 2026 cung cấp hướng dẫn toàn diện về tối ưu hóa kháng sinh cho bệnh nhân nặng. Làm rõ các bẫy điều trị thường gặp khi dùng liều chuẩn nhà sản xuất trên bệnh nhân ICU bị thay đổi huyết động sâu sắc, quy chuẩn hóa liều nạp ban đầu (Loading Dose) và quy trình truyền kéo dài cho các kháng sinh kháng trực khuẩn mủ xanh và Carbapenem.",
    "detailedConclusion": "Ở bệnh nhân nặng, liều đầu tiên LUÔN LÀ LIỀU NẠP ĐẦY ĐỦ (Full Loading Dose) không được giảm theo chức năng thận, vì mục tiêu quan trọng nhất là nhanh chóng đạt nồng độ diệt khuẩn trong mô. Đối với Beta-lactam (Meropenem, Piperacillin-Tazobactam), khuyến cáo mạnh mẽ áp dụng phương pháp truyền kéo dài (truyền trong 3-4 giờ mỗi cữ) hoặc truyền liên tục để tối ưu hóa thời gian nồng độ tự do vượt MIC (%fT > MIC). Với Vancomycin, bắt buộc chuyển sang theo dõi AUC24/MIC (đích 400–600 mg.h/L) để vừa đạt hiệu quả diệt khuẩn tụ cầu MRSA vừa hạn chế tối đa suy thận cấp.",
    "description": "Khuyến cáo và cập nhật mới nhất 2026 về tối ưu hóa kháng sinh cho bệnh nhân nặng (ICU): thời điểm dùng thuốc, lựa chọn phác đồ theo ổ nhiễm, dược động học PK/PD và tối ưu hóa liều - dựa trên Critical Care Clinics 2026.",
    "keyRecommendations": [
      "Sốc nhiễm khuẩn: không được trì hoãn. Mỗi giờ trì hoãn làm tăng tỷ lệ tử vong. Nghi nhiễm khuẩn nhưng chưa có sốc: có thể dành thời gian xác định chẩn đoán.",
      "Lựa chọn kháng sinh theo ổ nhiễm, hội chứng lâm sàng và đánh giá nguy cơ vi khuẩn đa kháng. Không phổ rộng thường quy — điều trị quá mức cũng có thể gây hại.",
      "Bệnh nặng thay đổi toàn bộ dược động học (PK/PD). Cần liều nạp, truyền kéo dài và theo dõi TDM để đạt mục tiêu nồng độ — tránh thiếu liều hoặc tích lũy độc tính.",
      "Theo dõi sát đáp ứng điều trị, kiểm tra an toàn dùng thuốc và phòng ngừa biến chứng lâm sàng."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-timing",
        "number": 1,
        "title": "Thời điểm",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-risk",
        "number": 2,
        "title": "Vi khuẩn đa kháng",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-regimen",
        "number": 3,
        "title": "Phác đồ ổ nhiễm",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-updates",
        "number": 4,
        "title": "Điểm mới 2026",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-pkpd",
        "number": 5,
        "title": "PK/PD",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-dose",
        "number": 6,
        "title": "Liều dùng",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-conclusion",
        "number": 7,
        "title": "Tóm tắt 21 điểm",
        "icon": "fa-solid fa-notes-medical"
      },
      {
        "id": "sec-citation",
        "number": 8,
        "title": "Trích dẫn",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-nature-reviews-mrsa",
    "slug": "2026-nature-reviews-mrsa",
    "code": "GDL-2026-NATURE-REVIEWS-MRSA",
    "title": "Nature Reviews 2026: Tụ Cầu Vàng Kháng Methicillin (MRSA) — Dịch Tễ, Cơ Chế, Động Học Cư Trú & Phác Đồ",
    "titleEn": "Methicillin-resistant Staphylococcus aureus (Nature Reviews Disease Primers 2026)",
    "journal": "Nat Med",
    "organization": "Nature Reviews Disease Primers",
    "year": 2026,
    "sourceUrl": "https://drive.google.com/file/d/1poV_aAWS3TDiIH4bNayALeazfel6rbhy/view?usp=sharing",
    "file": "2026-nature-reviews-mrsa.mdx",
    "specialty": "infect",
    "conditionKey": "amr-mrsa",
    "problemLabels": [
      "mrsa-bacteremia",
      "vancomycin-vs-daptomycin",
      "decolonization"
    ],
    "icd10": [
      "A41.02",
      "B95.62",
      "Z16.24"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "hospital-community-mrsa"
    ],
    "population": "Người trưởng thành và trẻ em bị nhiễm trùng da và mô mềm (SSTI), nhiễm khuẩn huyết (BSI), viêm phổi hoại tử, viêm nội tâm mạc nhiễm khuẩn hoặc viêm xương tủy (osteoarticular) do tụ cầu vàng kháng methicillin (MRSA).",
    "interventionClass": "antimicrobial-pkpd",
    "drug": "Vancomycin, Daptomycin, Ceftaroline, Ceftobiprole, Linezolid, Tedizolid, Dalbavancin, Telavancin, Oritavancin, Fosfomycin, Doxycycline, Minocycline, Clindamycin, Omadacycline, Trimethoprim-sulfamethoxazole, Delafloxacin, Rifampin, Fusidic acid, Gentamicin",
    "intervention": "TDM Vancomycin (AUC/MIC 400-600), Daptomycin (8-10 mg/kg, chống chỉ định viêm phổi), Linezolid (ưu tiên viêm phổi hoại tử), Ceftaroline/Ceftobiprole (gắn PBP2a), Rạch dẫn lưu áp-xe, Khử trùng Mupirocin + Chlorhexidine",
    "comparatorType": "active-control",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Diệt khuẩn làm sạch cấy máu, giảm tỷ lệ tử vong do sốc nhiễm khuẩn/viêm phổi hoại tử, ngăn ngừa biến chứng viêm nội tâm mạc và kiểm soát lây truyền bệnh viện",
    "outcomeDirection": "non-inferior",
    "impactVerdict": "practice-informing",
    "keyResults": "HBAR: Tử vong toàn cầu: >130.000 ca/năm | Giảm BSI Mỹ: 74% (2005-2016) | Đích Vanco: AUC/MIC 400-600 | Rút ngắn PCR: 1.7 ngày | Kháng Daptomycin BSI: 39% nếu không kiểm soát nguồn | Giảm lây REDUCE-MRSA: HR 0.63",
    "robOverall": "not-applicable",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "mrsa",
      "khang-sinh",
      "de-khang-khang-sinh"
    ],
    "tags": [
      "Nature Reviews",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Bài tổng quan đỉnh cao của Nature Reviews Disease Primers 2026 về MRSA: Dịch tễ học toàn cầu, cơ chế đề kháng PBP2a và các biến thể BORSA/MOD-SA/OS-MRSA, động học cư trú tại hốc mũi và ruột, cơ chế né tránh miễn dịch Trojan Horse trong bạch cầu, phác đồ điều trị kháng sinh tối ưu và chiến lược kiểm soát nhiễm khuẩn.",
    "detailedConclusion": "Chẩn đoán nhanh bằng Real-time PCR và đĩa Cefoxitin; cá thể hóa kháng sinh theo hội chứng (ưu tiên Linezolid cho viêm phổi, Daptomycin cho nhiễm khuẩn huyết, Vancomycin TDM AUC/MIC 400-600); bắt buộc rạch dẫn lưu áp-xe và rút bỏ catheter nhiễm trùng.",
    "description": "Tóm tắt Nature Reviews Disease Primers 2026: Tổng quan toàn diện về Tụ cầu vàng kháng Methicillin (MRSA) — Dịch tễ học, cơ chế kháng thuốc sinh học phân tử, động học cư trú, sinh lý bệnh học xâm lấn sâu, chẩn đoán cận lâm sàng và phác đồ điều trị kháng sinh.",
    "keyRecommendations": [
      "Cơ chế đề kháng Methicillin của S. aureus (MRSA) do gen mecA/mecC mã hóa protein gắn penicillin PBP2a có ái lực cực thấp với hầu hết kháng sinh nhóm beta-lactam.",
      "Vancomycin: Tối ưu hóa liều dựa trên hướng dẫn AUC24/MIC đạt 400 - 600 mg·h/L; theo dõi TDM bằng mô hình Bayes để tối ưu hiệu quả và giảm độc thận.",
      "Kháng sinh thay thế cho nhiễm trùng MRSA nặng: Daptomycin liều cao (8-10 mg/kg/ngày) cho vãng khuẩn huyết/viêm nội tâm mạc, Ceftaroline (hoạt tính trên PBP2a), và Linezolid cho viêm phổi MRSA.",
      "Kiểm soát ổ nhiễm khuẩn triệt để (Source control): Rút bỏ ngay catheter tĩnh mạch nhiễm trùng, dẫn lưu mủ áp xe và phẫu thuật cắt lọc mô hoại tử."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-epidemiology",
        "number": 1,
        "title": "Đại Cương &amp; Dịch Tễ",
        "icon": "fa-solid fa-globe"
      },
      {
        "id": "sec-resistance",
        "number": 2,
        "title": "Cơ Chế Kháng Thuốc",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-colonization",
        "number": 3,
        "title": "Động Học Cư Trú",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-pathophysiology",
        "number": 4,
        "title": "Sinh Lý Bệnh Xâm Lấn",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-diagnosis",
        "number": 5,
        "title": "Quy Trình Chẩn Đoán",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-treatment",
        "number": 6,
        "title": "Phác Đồ Điều Trị &amp; Phòng Ngừa",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-algorithm",
        "number": 7,
        "title": "Lưu Đồ Xử Trí",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-nejm-ngat",
    "slug": "2026-nejm-ngat",
    "code": "GDL-2026-NEJM-NGAT",
    "title": "NEJM 2026: Tiếp cận và Phân tầng Nguy cơ Ngất (Syncope) tại Cấp cứu",
    "titleEn": "Evaluation and Management of Syncope in the Emergency Department",
    "journal": "N Engl J Med",
    "organization": "NEJM Review Article",
    "year": 2026,
    "file": "2026-nejm-ngat.mdx",
    "specialty": "cardio",
    "conditionKey": "syncope",
    "problemLabels": [
      "ed-syncope-risk-stratification",
      "cardiac-vs-reflex-syncope",
      "canadian-syncope-risk-score"
    ],
    "icd10": [
      "R55",
      "I45",
      "I49"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": false,
    "populationTags": [
      "ed-syncope-adults"
    ],
    "population": "Bệnh nhân ở mọi lứa tuổi gặp phải tình trạng mất ý thức tạm thời nghi ngờ do ngất hoặc có các đợt té ngã không rõ nguyên nhân (đặc biệt là người cao tuổi).",
    "interventionClass": "biomarker-diagnostics",
    "drug": "Fludrocortisone, Midodrine, Droxidopa, Atomoxetine, Pyridostigmine, Octreotide",
    "intervention": "Phân tầng nguy cơ cao (Red flags ECG/lâm sàng), siêu âm tim, theo dõi Holter, nghiệm pháp bàn nghiêng",
    "comparatorType": "unstructured-admission",
    "primaryEndpointCategory": "diagnostic-performance",
    "primaryEndpoint": "Phát hiện nguyên nhân tim mạch đe dọa tính mạng (loạn nhịp, hẹp van nặng, bệnh cơ tim)",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "robOverall": "not-applicable",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "ngat-syncope",
      "phan-tang-cap-cuu",
      "tim-mach"
    ],
    "tags": [
      "NEJM",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Quy trình tiếp cận ngất tại khoa cấp cứu: Phân biệt ngất do phản xạ, hạ HA tư thế và ngất do nguyên nhân tim mạch; tiêu chí chỉ định nhập viện an toàn.",
    "detailedConclusion": "Bệnh nhân có cờ đỏ tim mạch hoặc bất thường ECG cần nhập viện theo dõi telemetry và làm siêu âm tim khẩn.",
    "description": "Tóm tắt bài báo tổng quan NEJM 2026 về Ngất (Syncope) của Giáo sư Rose Anne Kenny: Sinh lý bệnh, Phân loại, Thuật toán Đánh giá ban đầu, Bảng điểm Sheldon, Chẩn đoán phân biệt & Phác đồ điều trị mới.",
    "keyRecommendations": [
      "Ngất phản xạ (Reflex), Hạ huyết áp tư thế (OH) & Ngất do tim (Cardiac).",
      "Ngất do tim có tử vong 1 năm tới 18–33% (so với 6% ở nhóm khác).",
      "Cardioneural Ablation, Pacemaker 2 buồng & Thuốc co mạch Midodrine / Fludrocortisone.",
      "Theo dõi sát đáp ứng điều trị, kiểm tra an toàn dùng thuốc và phòng ngừa biến chứng lâm sàng."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Sinh lý & Phân loại",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Đánh giá ban đầu (Class I)",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Đặc điểm gợi ý & Chẩn đoán phân biệt",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phân tầng nguy cơ",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Cận lâm sàng bổ sung",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Phác đồ điều trị & So sánh Guideline",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-lww-khang-sinh-co-ban",
    "slug": "2026-lww-khang-sinh-co-ban",
    "code": "GDL-2026-LWW-KHANG-SINH-CO-BAN",
    "title": "Nguyên lý Sử dụng Kháng sinh Hợp lý và Cơ chế Đề kháng Vi sinh",
    "titleEn": "Principles of Antimicrobial Therapy and Resistance Mechanisms",
    "journal": "Lancet Infect Dis",
    "organization": "LWW Medical Pharmacology Series",
    "year": 2026,
    "sourceUrl": "https://dudley.nu/antibiotics/",
    "file": "2026-lww-khang-sinh-co-ban.mdx",
    "specialty": "infect",
    "conditionKey": "amr-mrsa",
    "problemLabels": [
      "antimicrobial-mechanisms",
      "resistance-mechanisms",
      "stewardship"
    ],
    "icd10": [
      "Z16",
      "A41"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "bacterial-infections"
    ],
    "population": "Bệnh nhân nhiễm khuẩn cộng đồng & bệnh viện (CAP, VAP, Meningitis, Endocarditis, UTI, Intra-abdominal, Cellulitis, AOM, PID, Catheter Sepsis, Lao)",
    "interventionClass": "antimicrobial-pkpd",
    "drug": "Cefiderocol, Ceftazidime-avibactam, Meropenem-vaborbactam, Dalbavancin, Plazomicin, Tedizolid",
    "intervention": "Phân nhóm kháng sinh diệt khuẩn vs kìm khuẩn, phụ thuộc thời gian (T > MIC) vs phụ thuộc nồng độ (Cmax/MIC, AUC/MIC), quản lý kháng sinh (AMS)",
    "comparatorType": "standard-of-care",
    "primaryEndpointCategory": "clinical-recovery",
    "primaryEndpoint": "Tối ưu hiệu quả diệt khuẩn và làm chậm sự phát triển của vi khuẩn đa kháng",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "confirmatory",
    "robOverall": "not-applicable",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "khang-sinh",
      "de-khang-khang-sinh",
      "pk-pd-icu"
    ],
    "tags": [
      "LWW",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Cẩm nang tra cứu phổ kháng khuẩn của các nhóm kháng sinh chính: Penicillin, Cephalosporin thế hệ 1-5, Carbapenem, Aminoglycoside, Macrolide, Fluoroquinolone.",
    "detailedConclusion": "Áp dụng nguyên tắc 5R trong sử dụng kháng sinh: Đúng bệnh, đúng thuốc, đúng liều, đúng đường dùng, và đúng thời gian.",
    "description": "Tóm tắt toàn diện nghiên cứu &amp; sách Antibiotics Basics for Clinicians (Xuất bản lần 4, 2026 - Alan R. Hauser): Cập nhật kháng sinh mới &amp; Phác đồ điều trị kinh nghiệm các hội chứng nhiễm khuẩn lâm sàng.",
    "keyRecommendations": [
      "Cefiderocol (Siderophore), Ceftazidime-avibactam, Meropenem-vaborbactam, Plazomicin, Omadacycline, Delafloxacin, Tedizolid.",
      "Dalbavancin & Oritavancin dùng liều 1 lần/tuần cho nhiễm khuẩn da-mô mềm phức tạp, Oritavancin diệt cả VRE.",
      "Khuyến cáo tối ưu cho CAP, VAP, Viêm màng não, Viêm nội tâm mạc, UTI, Nhiễm khuẩn ổ bụng, Viêm mô tế bào, AOM, PID, Catheter Sepsis.",
      "Phác đồ 5 thuốc cho Lao đa kháng (Bedaquiline, Pretomanid, Delamanid); Fidaxomicin bảo tồn hệ vi sinh đường ruột."
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Cefiderocol (Gram - đa kháng)": "Cơ chế Siderophore Trojan Horse",
      "Dalbavancin / Oritavancin": "Liều duy nhất / tuần cho SSTI",
      "VAP có nguy cơ MDR": "Triple Therapy (3 thuốc / 3 nhóm)",
      "Viêm màng não cấp": "Ceftriaxone + Vanco (+ Ampicillin nếu >50t)"
    },
    "sections": [
      {
        "id": "sec-new-drugs",
        "number": 1,
        "title": "Kháng sinh mới 5 năm qua",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-empiric-regimens",
        "number": 2,
        "title": "Phác đồ CAP / VAP / UTI...",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-rescue",
        "number": 3,
        "title": "Colistin &amp; Cơ chế đặc biệt",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-ijmpr-dengue-serum-sodium-hyponatremia",
    "slug": "2026-ijmpr-dengue-serum-sodium-hyponatremia",
    "code": "STD-2026-IJMPR-DENGUE-SODIUM",
    "title": "Nồng Độ Natri Máu Trong Sốt Xuất Huyết Dengue & Mối Tương Quan Với Mức Độ Nặng, Biến Chứng & Tử Vong",
    "titleEn": "Study on Serum Sodium Levels in Dengue Fever in a Tertiary Care Centre",
    "journal": "International Journal of Medical and Pharmaceutical Research (IJMPR)",
    "organization": "Malla Reddy Institute of Medical Sciences",
    "year": 2026,
    "file": "2026-ijmpr-dengue-serum-sodium-hyponatremia.mdx",
    "specialty": "infect",
    "specialty2": "icu",
    "conditionKey": "dengue-fever",
    "problemLabels": [
      "dengue-electrolytes",
      "hyponatremia",
      "severe-dengue-prognosis"
    ],
    "icd10": [
      "A90",
      "A91",
      "E87.1"
    ],
    "design": "prospective-cohort",
    "centerScope": "single-center",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "hospitalized-dengue",
      "asian-cohort"
    ],
    "population": "Bệnh nhân người lớn (> 18 tuổi) nhập viện điều trị nội trú do mắc sốt xuất huyết Dengue (DF, DHF, DSS) tại trung tâm y tế tuyến cuối",
    "interventionClass": "fluid-electrolyte-acidbase",
    "drug": "Dung dịch ưu trương NaCl 3%, Dung dịch đẳng trương NaCl 0.9%, Ringer Lactate, Dung dịch bù điện giải đường uống (ORS), Furosemide",
    "intervention": "Xét nghiệm nồng độ Natri máu định kỳ lúc nhập viện và ngày thứ 3; phân tầng mức độ hạ Natri máu, phát hiện sớm nguy cơ chuyển nặng và can thiệp bù điện giải kịp thời",
    "comparatorType": "severity-strata",
    "primaryEndpointCategory": "severity-prognosis",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "robOverall": "some-concerns",
    "gradeCertainty": "low",
    "fragilityIndex": null,
    "topicTags": [
      "dengue",
      "ha-natri-mau",
      "roi-loan-dien-giai",
      "tien-luong"
    ],
    "tags": [
      "IJMPR",
      "2026",
      "Truyền nhiễm",
      "Sốt xuất huyết Dengue",
      "Hạ Natri máu",
      "Rối loạn điện giải",
      "Evidence-Based Medicine"
    ],
    "description": "Nghiên cứu cắt ngang trên 50 bệnh nhân Dengue tại Ấn Độ xác định tỷ lệ hạ Natri máu đạt 64% (trung bình 126.1 mEq/L), liên quan chặt chẽ với biến chứng (p = 0.005), mức độ nặng (p < 0.001) và tử vong (p < 0.001).",
    "keyRecommendations": [
      "Hạ Natri máu (Serum Sodium < 135 mEq/L) là rối loạn điện giải phổ biến nhất ở bệnh nhân Dengue nhập viện, chiếm tỷ lệ tới 64% với nồng độ trung bình 126.1 ± 16.1 mEq/L.",
      "Mức độ hạ Natri máu có tương quan thuận rõ rệt với mức độ nặng của Dengue (p < 0.001): 100% bệnh nhân hạ Natri máu nặng (< 125 mEq/L) gặp biến chứng lâm sàng (xuất huyết, thần kinh, hô hấp, gan mật).",
      "Toàn bộ các ca tử vong trong nghiên cứu (6%, 3/50 ca) đều xảy ra ở nhóm có hạ Natri máu nặng; nồng độ Natri máu giảm là chỉ số tiên lượng độc lập cho tỷ lệ tử vong (p < 0.001).",
      "Khuyến cáo xét nghiệm nồng độ Natri máu thường quy lúc nhập viện và ngày thứ 3 nằm viện cho tất cả bệnh nhân Dengue để sàng lọc sớm đối tượng nguy cơ cao và can thiệp bù điện giải đúng lúc."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Bối Cảnh, Mục Tiêu Nghiên Cứu & Dịch Tễ Rối Loạn Điện Giải Trong Dengue",
        "icon": "fa-solid fa-microscope"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Thiết Kế Nghiên Cứu, Tiêu Chuẩn Chọn Bệnh & Phương Pháp Định Lượng Natri Máu",
        "icon": "fa-solid fa-vial-circle-check"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Kết Quả: Đặc Điểm Dịch Tễ, Huyết Thanh Học & Tần Suất Hạ Natri Máu",
        "icon": "fa-solid fa-chart-pie"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Tương Quan Giữa Mức Độ Hạ Natri Máu Mẫu Với Biến Chứng, Độ Nặng & Tử Vong",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Bàn Luận Bệnh Sinh, Thẩm Định Phương Pháp & Ý Nghĩa Thực Hành Lâm Sàng",
        "icon": "fa-solid fa-brain"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Kế Hoạch Theo Dõi, Tiên Lượng & Trích Dẫn Y Văn Chuẩn AMA",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-10-26"
  },
  {
    "id": "2026-nutrients-probiotics-phytonutrients-gut-barrier",
    "slug": "2026-nutrients-probiotics-phytonutrients-gut-barrier",
    "code": "GDL-2026-NUTRIENTS-PROBIOTICS-PHYTO",
    "title": "Nutrients 2026: Tác Động Của Phối Hợp Men Vi Sinh & Dưỡng Chất Thực Vật Lên Đi Tiêu, Hàng Rào Ruột Và Hệ Vi Sinh",
    "titleEn": "Effects of Probiotic–Phytonutrient Blends on Defecation, Intestinal Barrier Function, and Gut Microbiota: A Randomized, Placebo-Controlled Trial (Hwang et al., Nutrients 2026)",
    "journal": "Nutrients",
    "organization": "Nutrients",
    "year": 2026,
    "file": "2026-nutrients-probiotics-phytonutrients-gut-barrier.mdx",
    "specialty": "nutri",
    "conditionKey": "gut-health",
    "problemLabels": [
      "gut-barrier-integrity",
      "bowel-regularity",
      "microbiome"
    ],
    "icd10": [
      "K59.0",
      "K58",
      "K52.9",
      "E66"
    ],
    "design": "rct",
    "phase": "Phase II/III",
    "blinding": "double-blind",
    "centerScope": "single-center",
    "hypothesisType": "superiority",
    "sampleSize": 60,
    "followUpDuration": "8 tuần",
    "asianData": true,
    "populationTags": [
      "adults",
      "functional-gi-symptoms"
    ],
    "population": "Người trưởng thành khỏe mạnh có chỉ số BMI ≤ 29.9 kg/m2, không có bệnh tiêu hóa mạn tính hoặc sử dụng kháng sinh trong vòng 3 tháng trước đó.",
    "interventionClass": "nutrition-microbiome",
    "drug": "PBP1, PBP2, Lacticaseibacillus rhamnosus HEM648 (Lacticaseibacillus rhamnosus Nutrilite 648™), Lacticaseibacillus paracasei HEM272 (Lacticaseibacillus paracasei Nutrilite 272™), Bifidobacterium animalis subsp. lactis IDCC 4301, Lacticaseibacillus rhamnosus IDCC 3201, Lactobacillus acidophilus IDCC 3302, Bột rễ bồ công anh, Phức hợp bioflavonoid cam quýt",
    "intervention": "Thử nghiệm lâm sàng ngẫu nhiên, mù đôi, đối chứng giả dược trên 60 người trưởng thành (BMI ≤ 29.9 kg/m²): So sánh 8 tuần can thiệp giữa PBP1 (2 chủng L. rhamnosus HEM648 + L. paracasei HEM272 liều 3 tỷ CFU + rễ bồ công anh & bioflavonoid), PBP2 (5 chủng phối hợp liều 10 tỷ CFU + rễ bồ công anh & bioflavonoid), và Giả dược (tinh bột ngô).",
    "comparatorType": "placebo",
    "primaryEndpointCategory": "clinical-recovery",
    "primaryEndpoint": "Đánh giá thói quen đi tiêu (BSFS), tổng nồng độ và các phân đoạn SCFAs (Butyrate, Acetate), Zonulin phân (theo phân nhóm BMI), các chất chuyển hóa Tryptophan (Indole, IAA, ILA, IPA) và hệ vi sinh vật 16S rRNA.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "hypothesis-generating",
    "keyResults": "Tăng tỷ lệ phân bình thường (BSFS type 3–5) ròng +13.96% ở PBP1 (p = 0.0151) và +12.22% ở PBP2 (p = 0.0226) sau 8 tuần | Giảm phân tiêu chảy từ tuần 4 ở PBP2 (p = 0.0468) | Giảm độ khẩn cấp đi tiêu sau ăn ở PBP1 (p = 0.0029) | Butyrate phân tăng mạnh từ 9.47 lên 12.42 µg/g ở PBP1 (p < 0.05) và từ 8.82 lên 12.86 µg/g ở PBP2 (p < 0.01 vs Placebo) | Zonulin phân giảm mạnh ở người thừa cân (25 ≤ BMI < 30) (-155.62 ng/g ở PBP1 và -95.55 ng/g ở PBP2, p < 0.05 vs Placebo) | Tryptophan giảm song hành cùng Indole tăng mạnh (tương quan tuyến tính R² = 0.4611, p = 0.0054 ở PBP2) | Tương quan nghịch giữa Indole và Zonulin (R² = 0.2776, p = 0.0298) | Bảo tồn Alpha diversity và định cư chọn lọc Lactobacillaceae, Gordonibacter, Prevotella, Oscillibacter, Muribaculaceae.",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "probiotics",
      "hang-rao-ruot",
      "he-vi-sinh"
    ],
    "tags": [
      "Nutrients",
      "2026",
      "Men vi sinh (Probiotics)",
      "Dưỡng chất thực vật (Phytonutrients)",
      "Hàng rào ruột (Gut Barrier)",
      "Zonulin & Butyrate",
      "Trục Ruột - Vi sinh",
      "Evidence-Based Medicine"
    ],
    "summary": "Thử nghiệm lâm sàng mù đôi (Nutrients 2026): Bổ sung công thức phối hợp men vi sinh (2-5 chủng) và dưỡng chất thực vật (rễ bồ công anh, bioflavonoid) trong 8 tuần giúp tăng tỷ lệ phân thành khuôn chuẩn (+12% đến +14%), kích hoạt lên men tăng vọt Butyrate đại tràng (p < 0.01), giảm rõ rệt Zonulin phân ở người thừa cân (p < 0.05), đồng thời tối ưu hóa con đường Tryptophan → Indole củng cố tính toàn vẹn hàng rào ruột.",
    "detailedConclusion": "Bác sĩ lâm sàng & Chuyên gia dinh dưỡng: Phối hợp probiotic cùng dưỡng chất thực vật (phytonutrients) mang lại hiệu quả hiệp đồng synbiotic đa mục tiêu vượt trội. Đặc biệt khuyến nghị chỉ định cho người thừa cân (BMI 25–30 kg/m²) có nguy cơ rò rỉ ruột và người có rối loạn đi tiêu chức năng (phân không khuôn, tiêu chảy nhẹ, mót rặn sau ăn) nhằm tăng cường Butyrate nuôi đại tràng, giảm Zonulin và kích hoạt con đường Indole-AhR kháng viêm biểu mô.",
    "description": "Thử nghiệm lâm sàng mù đôi ngẫu nhiên (Nutrients 2026): Phối hợp Probiotics (2-5 chủng) và Phytonutrients (bột rễ bồ công anh, bioflavonoid cam quýt) giúp cải thiện tính chất phân, tăng nồng độ Butyrate đại tràng, giảm Zonulin phân ở người thừa cân và kích hoạt con đường chuyển hóa Tryptophan-Indole bảo vệ hàng rào ruột.",
    "keyRecommendations": [
      "Phối hợp Probiotic và Phytonutrients (bột rễ bồ công anh, bioflavonoid cam quýt) giúp tăng tỷ lệ phân bình thường (BSFS type 3–5) ròng +13.96% ở nhóm 2 chủng PBP1 (p = 0.0151) và +12.22% ở nhóm 5 chủng PBP2 (p = 0.0226) sau 8 tuần, giảm có ý nghĩa tỷ lệ phân tiêu chảy từ tuần thứ 4.",
      "Kích hoạt mạnh mẽ quá trình lên men carbohydrate sinh Butyrate: Nồng độ Butyrate phân tăng từ 9.47 lên 12.42 µg/g ở nhóm PBP1 (p < 0.05) và từ 8.82 lên 12.86 µg/g ở nhóm PBP2 (p < 0.01 so với giả dược), cung cấp năng lượng nuôi dưỡng tế bào biểu mô đại tràng và củng cố liên kết chặt.",
      "Hiệu ứng bảo vệ hàng rào ruột phụ thuộc BMI nền: Ở phân nhóm người thừa cân (25.0 ≤ BMI < 30.0 kg/m²), nồng độ Zonulin phân sụt giảm mạnh mẽ (-155.62 ng/g ở PBP1 và -95.55 ng/g ở PBP2, p < 0.05 so với giả dược), thắt chặt liên kết biểu mô và ngăn ngừa hội chứng rò rỉ ruột (Leaky Gut).",
      "Tái lập con đường chuyển hóa Tryptophan → Indole: Tăng sản sinh Indole phân kết hợp sụt giảm Tryptophan tự do (tương quan tuyến tính nghịch rất mạnh R² = 0.4611, p = 0.0054 ở nhóm PBP2), kích hoạt thụ thể AhR/PXR thúc đẩy tiết chất nhầy mucin và kháng viêm niêm mạc.",
      "Bảo tồn tính bền vững sinh thái ruột: Chỉ số đa dạng vi sinh Alpha diversity không bị xáo trộn thô bạo, đồng thời thúc đẩy định cư chọn lọc các taxon vi khuẩn có lợi (Lactobacillaceae, Prevotella, Oscillibacter, Muribaculaceae, Gordonibacter)."
    ],
    "clinicalPearls": [
      "Hiệp đồng Probiotic (L. rhamnosus, L. paracasei, Bifidobacterium) và Phytonutrient (rễ bồ công anh, bioflavonoid cam quýt) tăng tỷ lệ phân thành khuôn chuẩn BSFS 3–5 ròng +12% đến +14%, giảm tiêu chảy/phân lỏng ngay từ tuần thứ 4.",
      "Bổ sung PBP kích hoạt mạnh mẽ con đường lên men tạo Butyrate (tăng từ 8.8–9.4 lên 12.4–12.8 µg/g, p < 0.01), cung cấp nguồn nhiên liệu then chốt củng cố liên kết chặt và tăng tiết chất nhầy biểu mô đại tràng.",
      "Hiệu ứng phục hồi hàng rào ruột thể hiện tính phân tầng theo thể trạng: Ở người thừa cân (25.0 ≤ BMI < 30.0 kg/m²), nồng độ Zonulin phân giảm mạnh (-155.62 ng/g ở PBP1 và -95.55 ng/g ở PBP2, p < 0.05), sửa chữa hội chứng rò rỉ ruột (Leaky Gut).",
      "Tái thiết lập con đường chuyển hóa Tryptophan → Indole (R² = 0.4611, p = 0.0054 ở nhóm PBP2), cung cấp phối tử kích hoạt thụ thể AhR giúp tăng cường sulfo-hóa mucin và điều hòa miễn dịch kháng viêm niêm mạc.",
      "Can thiệp đạt độ an toàn và dung nạp tuyệt đối, duy trì 100% tính ổn định của độ đa dạng vi sinh Alpha diversity, không gây xáo trộn hệ vi khuẩn bản địa."
    ],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Cơ Chế Sinh Lý Học Trục Vi Sinh - Hàng Rào Ruột & Dưỡng Chất Thực Vật",
        "icon": "fa-solid fa-dna"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Thiết Kế Thử Nghiệm Lâm Sàng, Đạo Đức & Tiêu Chuẩn Tuyển Chọn (Fig 1 CONSORT)",
        "icon": "fa-solid fa-clipboard-check"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Cấu Trúc Bào Chế Can Thiệp: PBP1 (2 Chủng) vs PBP2 (5 Chủng) & Giả Dược",
        "icon": "fa-solid fa-capsules"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Đặc Điểm Nhân Trắc Học & Lâm Sàng Nền Người Tham Gia (Table 1)",
        "icon": "fa-solid fa-users"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Động Học Cải Thiện Tính Chất Phân & Thói Quen Đi Tiêu BSFS (Table 2)",
        "icon": "fa-solid fa-notes-medical"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Triệu Chứng Tiêu Hóa Lâm Sàng, Độ Khẩn Cấp Đi Tiêu & Chất Lượng Cuộc Sống (QoL)",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-7",
        "number": 7,
        "title": "Động Học Axit Béo Chuỗi Ngắn (SCFAs) & Nồng Độ Butyrate Nuôi Đại Tràng (Fig 4)",
        "icon": "fa-solid fa-chart-simple"
      },
      {
        "id": "sec-8",
        "number": 8,
        "title": "Động Học Zonulin Phân & Hiệu Hóa Hàng Rào Ruột Phụ Thuộc BMI Nền (Fig 5)",
        "icon": "fa-solid fa-shield-halved"
      },
      {
        "id": "sec-9",
        "number": 9,
        "title": "Kích Hoạt Con Đường Chuyển Hóa Tryptophan Thành Indole Qua Thụ Thể AhR (Fig 6)",
        "icon": "fa-solid fa-arrows-split-up-and-left"
      },
      {
        "id": "sec-10",
        "number": 10,
        "title": "Biến Đổi Cấu Trúc Hệ Vi Sinh Vật Ruột & Định Cư Chọn Lọc Taxon Có Lợi (Fig 7)",
        "icon": "fa-solid fa-bacterium"
      },
      {
        "id": "sec-11",
        "number": 11,
        "title": "Tương Quan Tuyến Tính Giữa Chuyển Hóa Tryptophan - Indole & Zonulin Hàng Rào Ruột (Fig 8)",
        "icon": "fa-solid fa-link"
      },
      {
        "id": "sec-12",
        "number": 12,
        "title": "Thảo Luận Hiệp Đồng Sinh Học Probiotics-Phytonutrients, Hạn Chế Nghiên Cứu & Khuyến Nghị Thực Hành",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-13",
        "number": 13,
        "title": "Tài Liệu Tham Khảo Chuẩn AMA",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-09-06"
  },
  {
    "id": "2026-nejm-staree-atorvastatin-elderly",
    "slug": "2026-nejm-staree-atorvastatin-elderly",
    "code": "GDL-2026-NEJM-STAREE-ATORVASTATIN-ELDERLY",
    "trialAcronym": "STAREE",
    "title": "STAREE: Atorvastatin 40 mg Dự Phòng Cấp 1 Ở Người Cao Tuổi (≥ 70 Tuổi) – NEJM 2026",
    "titleEn": "Atorvastatin, Cardiovascular Events, and Disability-free Survival in Older Adults: The STAREE Randomized Controlled Trial (Zoungas et al., N Engl J Med 2026)",
    "journal": "N Engl J Med",
    "organization": "NEJM",
    "year": 2026,
    "nctId": "NCT04026217",
    "file": "2026-nejm-staree-atorvastatin-elderly.mdx",
    "specialty": "cardio",
    "conditionKey": "dyslipidemia",
    "problemLabels": [
      "primary-prevention",
      "older-adults-70plus",
      "disability-free-survival"
    ],
    "icd10": [
      "E78",
      "E78.0",
      "I25.1",
      "I21",
      "I63",
      "F03"
    ],
    "design": "rct",
    "phase": "Phase IV Pragmatic",
    "blinding": "double-blind",
    "centerScope": "multicenter-intl",
    "hypothesisType": "superiority",
    "sampleSize": 9971,
    "followUpDuration": "5.9 năm",
    "asianData": false,
    "populationTags": [
      "elderly-70plus",
      "community-dwelling",
      "no-prior-cvd"
    ],
    "population": "Người cao tuổi sống tại cộng đồng từ 70 tuổi trở lên, sống độc lập và không có tiền sử bệnh lý tim mạch, đái tháo đường hoặc sa sút trí tuệ.",
    "interventionClass": "statin",
    "drug": "Atorvastatin",
    "intervention": "Thử nghiệm lâm sàng ngẫu nhiên, mù đôi, đối chứng giả dược STAREE trên 9,971 người từ 70 tuổi trở lên sống tại cộng đồng không có bệnh tim mạch, đái tháo đường hoặc sa sút trí tuệ trước đó: Can thiệp Atorvastatin 40 mg một lần mỗi ngày so với giả dược trong thời gian theo dõi trung vị 5.9 năm.",
    "comparatorType": "placebo",
    "primaryEndpointCategory": "mace",
    "primaryEndpoint": "Hai tiêu chí đánh giá chính kép: (1) Biến cố tim mạch chính (tử vong tim mạch, nhồi máu cơ tim không tử vong, đột quỵ không tử vong, tái thông mạch vành); và (2) Sống sót không tàn tật (tử vong mọi nguyên nhân, sa sút trí tuệ, hoặc tàn tật thể chất dai dẳng).",
    "outcomeDirection": "mixed-coprimary",
    "impactVerdict": "practice-informing",
    "keyResults": "Atorvastatin giảm 30% biến cố tim mạch chính (HR 0.70; 95% CI 0.61–0.82; P < 0.001; NNT = 37 trong 5.9 năm), giảm 43% nhồi máu cơ tim (HR 0.57) và giảm 43% tái thông mạch vành (HR 0.57) | KHÔNG cải thiện sống sót không tàn tật (HR 0.94; 95% CI 0.84–1.05; P = 0.25) | KHÔNG giảm tử vong tim mạch (HR 1.00; 74 ca mỗi nhóm) | Không ảnh hưởng nguy cơ sa sút trí tuệ (HR 1.03) | Tăng có ý nghĩa biến cố gan mật (3.3% vs 0.9%) và đái tháo đường mới (4.0% vs 2.7%).",
    "primaryMetric": {
      "measure": "HR",
      "effectEstimate": 0.7,
      "ciLower": 0.61,
      "ciUpper": 0.82,
      "rawDiffText": "MACE: HR 0.70 (0.61–0.82) | Sống không tàn tật: HR 0.94 (0.84–1.05, p=0.25)",
      "pValue": "<0.001",
      "nnt": 37
    },
    "safetyHighlight": "Tăng biến cố gan mật (3.3% vs 0.9%) và ĐTĐ mới khởi phát (4.0% vs 2.7%); không tăng sa sút trí tuệ",
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
    "topicTags": [
      "statin",
      "du-phong-tien-phat",
      "lao-khoa",
      "ket-cuc-kep"
    ],
    "tags": [
      "NEJM",
      "2026",
      "Tim mạch",
      "Statin",
      "Atorvastatin",
      "Người cao tuổi",
      "Dự phòng cấp 1",
      "STAREE",
      "Evidence-Based Medicine"
    ],
    "summary": "Thử nghiệm lâm sàng mù đôi STAREE (NEJM 2026) trên 9,971 người ≥ 70 tuổi khỏe mạnh: Atorvastatin 40 mg/ngày giảm 30% biến cố tim mạch chính (HR 0.70, P < 0.001, NNT = 37) và 43% nhồi máu cơ tim, nhưng KHÔNG kéo dài sống sót không tàn tật (HR 0.94, P = 0.25), không giảm tử vong chung hay sa sút trí tuệ, đồng thời tăng biến cố gan và đái tháo đường mới.",
    "detailedConclusion": "Bác sĩ lâm sàng khi tiếp cận người cao tuổi (≥ 70 tuổi) chưa có tiền sử tim mạch: Cần phân biệt rõ giữa dự phòng cấp 2 (bắt buộc dùng statin) và dự phòng cấp 1. Đối với dự phòng cấp 1, không kê statin ồ ạt cho mọi người già. Cần cá thể hóa: Nam giới có nhiều yếu tố nguy cơ tim mạch, LDL-C cao (> 140 mg/dL) hoặc HDL-C thấp (< 50 mg/dL) hưởng lợi nhiều nhất từ Atorvastatin. Cân nhắc kỹ hoặc trì hoãn ở nữ giới nguy cơ thấp, người gầy (BMI < 25), suy yếu hoặc đa dược trị vì statin không cải thiện sống sót không tàn tật, không giảm tử vong và làm tăng nguy cơ đái tháo đường cũng như tổn thương gan nhẹ.",
    "description": "Thử nghiệm lâm sàng mù đôi đối chứng giả dược STAREE (NEJM 2026) trên 9,971 người từ 70 tuổi trở lên khỏe mạnh: Atorvastatin 40 mg/ngày làm giảm 30% biến cố tim mạch chính (HR 0.70; P<0.001; NNT=37) và 43% nhồi máu cơ tim, nhưng KHÔNG kéo dài thời gian sống sót không tàn tật (HR 0.94; P=0.25), không giảm tử vong tim mạch hay sa sút trí tuệ, đồng thời làm tăng có ý nghĩa các biến cố gan mật và đái tháo đường mới khởi phát.",
    "keyRecommendations": [
      "Giảm ý nghĩa 30% nguy cơ biến cố tim mạch chính (HR 0.70; 95% CI 0.61–0.82; P < 0.001; NNT = 37 trong 5.9 năm theo dõi).",
      "Giảm sâu 43% nguy cơ nhồi máu cơ tim (HR 0.57; 95% CI 0.43–0.75) và giảm 43% nhu cầu tái thông mạch vành (HR 0.57; 95% CI 0.45–0.72).",
      "KHÔNG cải thiện Sống sót không tàn tật (Disability-free survival) (HR 0.94; 95% CI 0.84–1.05; P = 0.25).",
      "KHÔNG giảm tỷ lệ tử vong do nguyên nhân tim mạch (HR 1.00; 95% CI 0.72–1.37; 74 ca ở mỗi nhóm) hay sa sút trí tuệ (HR 1.03; 95% CI 0.87–1.21).",
      "Gia tăng có ý nghĩa biến cố gan mật (3.3% vs 0.9%), đái tháo đường mới khởi phát (4.0% vs 2.7%) và tỷ lệ phải ngừng thuốc (7.2% vs 6.1%)."
    ],
    "clinicalPearls": [
      "Statin liều cao (Atorvastatin 40 mg) ở người cao tuổi khỏe mạnh (≥ 70 tuổi) giảm 30% MACE và 43% nhồi máu cơ tim, nhưng không kéo dài sống sót không tàn tật (HR 0.94) do > 80% ca tử vong là vì nguyên nhân ngoài tim mạch.",
      "Nam giới và người có LDL-C nền > 139 mg/dL hoặc HDL-C < 53 mg/dL hưởng lợi bảo vệ tim mạch mạnh nhất; ở nữ giới và người thể trạng gầy (BMI < 25), lợi ích giảm biến cố không đạt ý nghĩa thống kê.",
      "Atorvastatin không làm gia tăng nguy cơ sa sút trí tuệ (HR 1.03) hay rối loạn thần kinh, nhưng làm tăng gấp 3.7 lần biến cố gan mật (3.3% vs 0.9%) và tăng gần 50% nguy cơ đái tháo đường mới phát (4.0% vs 2.7%).",
      "Phân biệt rõ: Dự phòng cấp 2 (đã có ASCVD) bắt buộc dùng statin theo Class I; còn dự phòng cấp 1 ở người ≥ 70 tuổi cần áp dụng chia sẻ quyết định (Shared Decision Making) dựa trên tuổi thọ kỳ vọng và gánh nặng đa dược trị."
    ],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Bối Cảnh, Sinh Lý & Khung PICO",
        "icon": "fa-solid fa-book-medical"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Đặc Điểm Nền Quần Thể Nghiên Cứu (Table 1)",
        "icon": "fa-solid fa-users"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Hiệu Quả Hạ Lipid & Hai Tiêu Chí Chính Kép (Figure 1)",
        "icon": "fa-solid fa-chart-line"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Kết Quả Tiêu Chí Chính & Phụ Toàn Diện (Table 2)",
        "icon": "fa-solid fa-table-list"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Phân Tích Phân Nhóm Chuyên Sâu (Chuyển Đổi Figure 2)",
        "icon": "fa-solid fa-chart-pie"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Hồ Sơ An Toàn & Biến Cố Bất Lợi Đặc Biệt (Table 3)",
        "icon": "fa-solid fa-shield-halved"
      },
      {
        "id": "sec-7",
        "number": 7,
        "title": "Ý Nghĩa Thực Hành Lâm Sàng & Chia Sẻ Quyết Định",
        "icon": "fa-solid fa-user-doctor"
      },
      {
        "id": "sec-8",
        "number": 8,
        "title": "Tài Liệu Tham Khảo Chuẩn AMA",
        "icon": "fa-solid fa-bookmark"
      }
    ],
    "updatedAt": "2026-09-06"
  },
  {
    "id": "2026-dash-diet-hypertension",
    "slug": "2026-dash-diet-hypertension",
    "code": "GDL-2026-DASH-DIET-HYPERTENSION",
    "trialAcronym": "DASH-SODIUM Synthesis",
    "title": "Tổng quan Chế độ ăn DASH và Can thiệp Lối sống trong Kiểm soát Huyết áp",
    "titleEn": "DASH Dietary Pattern and Lifestyle Modifications for Blood Pressure Control",
    "journal": "Circulation",
    "organization": "AHA / NHLBI",
    "year": 2026,
    "file": "2026-dash-diet-hypertension.mdx",
    "specialty": "cardio",
    "conditionKey": "hypertension",
    "problemLabels": [
      "blood-pressure-reduction",
      "sodium-restriction",
      "lifestyle-therapy"
    ],
    "icd10": [
      "I10",
      "E66"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": false,
    "populationTags": [
      "prehypertension-stage1-htn",
      "adults"
    ],
    "population": "Người trưởng thành bị tiền tăng huyết áp, tăng huyết áp hoặc có các yếu tố nguy cơ tim mạch đồng mắc (như béo phì, đái tháo đường típ 2, rối loạn lipid máu).",
    "interventionClass": "nutrition-microbiome",
    "drug": "Kali, Magiê, Canxi, Natri",
    "intervention": "Chế độ ăn giàu rau quả, kali, giảm natri (< 2300mg/ngày, tối ưu < 1500mg/ngày), hạn chế rượu bia",
    "comparatorType": "control-western-diet",
    "primaryEndpointCategory": "metabolic-control",
    "primaryEndpoint": "Mức giảm HA tâm thu và tâm trương",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "tang-huyet-ap",
      "che-do-an-dash",
      "giam-muoi"
    ],
    "tags": [
      "AHA / NHLBI",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Chế độ ăn DASH kết hợp giảm muối giúp giảm huyết áp tâm thu 8-14 mmHg, tương đương hiệu quả của 1 loại thuốc hạ áp đơn trị liệu.",
    "detailedConclusion": "Khuyến cáo áp dụng cho mọi giai đoạn THA và tiền THA.",
    "description": "Tóm tắt Guideline Chế độ ăn DASH (Dietary Approaches to Stop Hypertension): Cơ chế sinh lý học mạch máu - thận, bảng khẩu phần khuyến nghị, bằng chứng DASH & DASH-Sodium, so sánh với Địa Trung Hải, bệnh lý đồng mắc và mô hình liên chuyên khoa.",
    "keyRecommendations": [
      "Chế độ ăn DASH (Dietary Approaches to Stop Hypertension) chứng minh hiệu quả giảm 8 - 14 mmHg huyết áp tâm thu ở người tăng huyết áp.",
      "Cắt giảm lượng muối Natri ăn vào: Ngưỡng tối ưu < 1.500 mg/ngày (tương đương ~2/3 thìa cà phê muối ăn) giúp khuếch đại tác dụng hạ áp.",
      "Tăng cường thực phẩm giàu Kali (4.700 mg/ngày), Magie và Canxi thông qua rau củ tươi, trái cây, các loại hạt đậu và ngũ cốc nguyên hạt.",
      "Hạn chế tối đa chất béo bão hòa, thịt đỏ nhiều mỡ, đồ uống có đường và kết hợp kiểm soát cân nặng thể lực thường xuyên."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-overview",
        "number": 1,
        "title": "Tổng quan & Sinh lý",
        "icon": "fa-solid fa-globe"
      },
      {
        "id": "sec-servings",
        "number": 2,
        "title": "Khẩu phần (Table 1)",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-trials",
        "number": 3,
        "title": "Cơ chế & Thử nghiệm (Fig 1)",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-compare",
        "number": 4,
        "title": "DASH vs. Địa Trung Hải (Table 2)",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-comorbidities",
        "number": 5,
        "title": "Bệnh đồng mắc & Hiểu lầm",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-interprofessional",
        "number": 6,
        "title": "Nhóm Liên Chuyên Khoa (Fig 2)",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2026-mbm-tongquan-ards",
    "slug": "2026-mbm-tongquan-ards",
    "code": "GDL-2026-MBM-TONGQUAN-ARDS",
    "title": "Tổng quan Tiếp cận Chẩn đoán và Điều trị Suy hô hấp Cấp tiến triển (ARDS)",
    "titleEn": "Clinical Review: Diagnosis and Modern Phenotyping of ARDS",
    "journal": "Am J Respir Crit Care Med",
    "organization": "ATS / ESICM Review",
    "year": 2026,
    "file": "2026-mbm-tongquan-ards.mdx",
    "specialty": "icu",
    "specialty2": "pulmo",
    "conditionKey": "ards",
    "problemLabels": [
      "ards-global-definition",
      "lung-protective-ventilation",
      "peep-titration"
    ],
    "icd10": [
      "J80"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "icu-ards-patients"
    ],
    "population": "Bệnh nhân mắc hội chứng suy hô hấp cấp tiến triển (ARDS) ở cả người lớn, trẻ em và trẻ sơ sinh.",
    "interventionClass": "respiratory-support",
    "drug": "Oxy, Dexamethasone, Methylprednisolone, Hydrocortisone, Cisatracurium, Simvastatin, Anakinra, Tocilizumab, Reparixin, Acetaminophen, Recombinant human thrombomodulin, Ribociclib, Palbociclib, Dipyridamole",
    "intervention": "Định nghĩa Berlin cải biên (Global Definition), phân biệt ARDS dưới kiểu hình viêm cao (Hyperinflammatory) vs viêm thấp",
    "comparatorType": "conventional-ventilation",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Tối ưu hóa phác đồ điều trị dịch và PEEP",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "confirmatory",
    "robOverall": "not-applicable",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "ards",
      "hoi-suc-ho-hap",
      "ards-network"
    ],
    "tags": [
      "MBM",
      "2026",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Cung cấp cơ sở sinh lý bệnh, vai trò thuốc giãn cơ ngắn ngày, huy động phế nang và ECMO VV trong ARDS kháng trị.",
    "detailedConclusion": "Kiểm soát hạn chế dịch (Conservative fluid strategy) sau khi đã hồi sức sốc ổn định.",
    "description": "Tổng quan Y khoa 2026 trên tạp chí Molecular Biomedicine về ARDS: Định nghĩa Toàn cầu 2023, Phân loại Kiểu hình Clinicomolecular & Omics, Thử nghiệm Tế bào gốc MSCs, Treatable Traits và Y học Cá thể hóa.",
    "keyRecommendations": [
      "Low VT (4-8 mL/kg) + Pplat < 30 cmH2O. Tối ưu Driving Pressure (Pplat - PEEP) giảm tối đa VILI.",
      "Chấp nhận SpO2/FiO2 (≤97%), Siêu âm phổi (LUS) & ARDS không đặt ETT thở HFNO (≥30 L/phút).",
      "Phân loại kiểu hình Viêm mạnh (Hyper-) vs Viêm nhẹ (Hypo-), Proteomics C1-C3, Tế bào MSCs & Đích phân tử mới.",
      "Theo dõi sát đáp ứng điều trị, kiểm tra an toàn dùng thuốc và phòng ngừa biến chứng lâm sàng."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Sinh lý can thiệp Hô hấp",
        "icon": "fa-solid fa-syringe"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Định nghĩa Toàn cầu 2023",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phân loại Kiểu hình &amp; Omics",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Liệu pháp Tế bào gốc (MSCs)",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Treatable Traits &amp; Y học Cá thể hóa",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2025-curropinneurol-viral-encephalitis-update",
    "slug": "2025-curropinneurol-viral-encephalitis-update",
    "code": "GDL-2025-CON-VIRAL-ENCEPHALITIS",
    "title": "Cập Nhật Bệnh Sinh & Chiến Lược Điều Trị Viêm Não Virus 2025: Tổng Quan Y Văn Current Opinion in Neurology",
    "titleEn": "Viral Encephalitis – Update on Pathogenesis and Treatment",
    "journal": "Current Opinion in Neurology",
    "organization": "University of Liverpool / Curr Opin Neurol",
    "year": 2025,
    "file": "2025-curropinneurol-viral-encephalitis-update.mdx",
    "specialty": "neuro",
    "specialty2": "infect",
    "conditionKey": "viral-encephalitis",
    "problemLabels": [
      "hsv-encephalitis",
      "arboviral-encephalitis",
      "metagenomic-ngs"
    ],
    "icd10": [
      "G04.9",
      "G05.1",
      "B00.4",
      "B02.0"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": false,
    "populationTags": [
      "acute-encephalitis-syndrome"
    ],
    "population": "Bệnh nhân nghi ngờ hoặc xác định viêm não do virus cấp tính, bao gồm HSV, VZV, Enteroviruses và Arboviruses",
    "interventionClass": "neuro-critical-care",
    "drug": "Aciclovir, Valaciclovir, Dexamethasone, Intravenous Immunoglobulin (IVIG), Ganciclovir, Foscarnet, Doxycycline",
    "intervention": "Khởi trị Aciclovir IV khẩn cấp (< 6–24 giờ), cá thể hóa liều Aciclovir theo cân nặng (15 mg/kg cho bệnh nhân < 57 kg), đánh giá liệu pháp Corticosteroid hỗ trợ (kết quả thử nghiệm DexEnceph) và tầm soát viêm não tự miễn thứ phát post-HSV",
    "comparatorType": "standard-of-care",
    "primaryEndpointCategory": "organ-protection",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "robOverall": "not-applicable",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "viem-nao-virus",
      "than-kinh",
      "chan-doan-phan-tu"
    ],
    "tags": [
      "Current Opinion in Neurology",
      "2025",
      "Thần kinh",
      "Truyền nhiễm",
      "Viêm não virus",
      "Aciclovir",
      "Pathogenesis",
      "Evidence-Based Medicine"
    ],
    "description": "Bài tổng quan y văn bản lề năm 2025 công bố trên Current Opinion in Neurology cập nhật toàn diện bệnh sinh, con đường chọc phá hàng rào máu não, yếu tố di truyền ký chủ, tối ưu hóa dược lý Aciclovir IV và triển vọng liệu pháp miễn dịch đích.",
    "keyRecommendations": [
      "Virus là nguyên nhân hàng đầu gây viêm não nhiễm trùng (chiếm ~70% các trường hợp xác định căn nguyên vi sinh), trong đó Herpes Simplex Virus type 1 (HSV-1) là tác nhân rải rác phổ biến nhất (10–20% tổng số ca bệnh).",
      "Khởi trị Aciclovir IV 10 mg/kg mỗi 8 giờ trong vòng 6–24 giờ nhập viện giúp làm giảm đáng kể tỷ lệ tử vong và biến chứng thần kinh; cân nhắc nâng liều lên 15 mg/kg mỗi 8 giờ ở bệnh nhân có thể trạng nhẹ cân (< 57 kg) dưới sự theo dõi sát chức năng thận.",
      "Kết quả sơ bộ từ Thử nghiệm lâm sàng ngẫu nhiên DexEnceph (12/2024) cho thấy việc phối hợp Dexamethasone hỗ trợ trong viêm não HSV không làm gia tăng tử vong hay kéo dài sự tồn tại của virus trong DNT, mở ra hướng đi cho các liệu pháp ức chế miễn dịch có mục tiêu.",
      "Cần tầm soát tự kháng thể anti-NMDA receptor trong DNT khi bệnh nhân có biểu hiện tái phát triệu chứng thần kinh hoặc tâm thần trong vòng vài tuần đến vài tháng sau khi đã điều trị khỏi viêm não HSV cấp (gặp ở 27% bệnh nhân)."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Dịch Tễ Học, Phân Loại & Các Tác Nhân Virus Thường Gặp",
        "icon": "fa-solid fa-earth-americas"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Cơ Chế Xâm Nhập Thần Kinh, Hàng Rào Máu Não & Di Truyền Ký Chủ",
        "icon": "fa-solid fa-shield-virus"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Bệnh Sinh Tổn Thương Nhu Mô Não, Phù Não & Co Giật",
        "icon": "fa-solid fa-brain"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Tối Ưu Hóa Phác Đồ Aciclovir IV & Cập Nhật Thử Nghiệm Thuốc Kháng Virus",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Liệu Pháp Kháng Viêm Dexamethasone, IVIG, Dự Phòng Vắc-xin & Quản Lý Dài Hạn",
        "icon": "fa-solid fa-syringe"
      }
    ],
    "updatedAt": "2026-10-30"
  },
  {
    "id": "2025-cureus-statin-cvd-outcomes",
    "slug": "2025-cureus-statin-cvd-outcomes",
    "code": "GDL-2025-CUREUS-STATIN-CVD-OUTCOMES",
    "trialAcronym": "STATIN-CVD META",
    "title": "Cureus 2025: Đánh Giá Tác Động Của Liệu Pháp Statin Trên Kết Cục Lâm Sàng Ở Bệnh Nhân Có Nguy Cơ Tim Mạch — Phân Tích Hệ Thống & Phân Tích Gộp",
    "titleEn": "Effect of Statin Therapy on Clinical Outcomes in Patients With Cardiovascular Risks: A Systematic Review and Meta-Analysis (Ghani Khan et al., Cureus 2025)",
    "journal": "Cureus",
    "organization": "Cureus",
    "year": 2025,
    "file": "2025-cureus-statin-cvd-outcomes.mdx",
    "specialty": "cardio",
    "conditionKey": "dyslipidemia",
    "problemLabels": [
      "primary-prevention",
      "secondary-prevention",
      "cvd-risk-reduction"
    ],
    "icd10": [
      "E78",
      "E78.0",
      "I25.1",
      "I21",
      "I50",
      "I63"
    ],
    "design": "meta-analysis",
    "blinding": "mixed",
    "centerScope": "multicenter-intl",
    "hypothesisType": "superiority",
    "sampleSize": 506813,
    "asianData": true,
    "populationTags": [
      "high-cvd-risk",
      "adults-pooled"
    ],
    "population": "Người trưởng thành (tuổi trung vị 69.4 ± 8.6 tuổi, 96.9% nam giới) có các yếu tố nguy cơ tim mạch hoặc bệnh tim mạch đã xác định (bao gồm suy tim, bệnh mạch vành, đái tháo đường, tăng huyết áp, suy thận mạn).",
    "interventionClass": "statin",
    "drug": "Statins, Atorvastatin, Pitavastatin, Rosuvastatin, Simvastatin, Pravastatin, Lovastatin",
    "intervention": "Phân tích hệ thống và phân tích gộp (PRISMA 2009) trên 506,813 bệnh nhân từ 7 nghiên cứu (118,491 người dùng statin vs 388,322 người nhóm chứng) nhằm đánh giá toàn diện tác động của statin trên 4 kết cục: tử vong mọi nguyên nhân, MACE, tử vong tim mạch và tái nhập viện do tim mạch.",
    "comparatorType": "placebo-or-standard",
    "primaryEndpointCategory": "mace",
    "primaryEndpoint": "Đánh giá định lượng tác động của statin đối với: Tử vong do mọi nguyên nhân, Biến cố tim mạch chính (MACE), Tử vong do nguyên nhân tim mạch và Tái nhập viện do tim mạch.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "confirmatory",
    "keyResults": "Statin giảm 40% tử vong do mọi nguyên nhân (RR 0.60; 95% CI 0.43–0.83; P = 0.002; I² = 91%) | Giảm 21% biến cố tim mạch chính MACE với tính đồng nhất cao (RR 0.79; 95% CI 0.71–0.87; P < 0.00001; I² = 27%) | Xu hướng giảm 26% tử vong tim mạch (RR 0.74; 95% CI 0.53–1.02; P = 0.07; I² = 90%) | Hoàn toàn KHÔNG làm giảm tái nhập viện do tim mạch (RR 0.97; 95% CI 0.83–1.13; P = 0.68; I² = 0%).",
    "primaryMetric": {
      "measure": "RR",
      "effectEstimate": 0.75,
      "ciLower": 0.7,
      "ciUpper": 0.81,
      "pValue": "<0.001"
    },
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "statin",
      "meta-analysis",
      "du-phong-tim-mach"
    ],
    "tags": [
      "Cureus",
      "2025",
      "Tim mạch",
      "Statin",
      "Meta-Analysis",
      "MACE",
      "Tử vong tim mạch",
      "Tái nhập viện",
      "Evidence-Based Medicine"
    ],
    "summary": "Phân tích gộp trên 506,813 bệnh nhân (Cureus 2025): Statin giúp giảm 40% tử vong mọi nguyên nhân (RR 0.60; P = 0.002) và giảm 21% MACE (RR 0.79; P < 0.00001), xu hướng giảm 26% tử vong tim mạch (RR 0.74; P = 0.07), nhưng hoàn toàn KHÔNG làm giảm tỷ lệ tái nhập viện tim mạch (RR 0.97; P = 0.68; I² = 0%).",
    "detailedConclusion": "Bác sĩ lâm sàng: Cần duy trì chỉ định statin mạnh mẽ để đạt lợi ích sống còn (giảm 40% tử vong chung) và ngăn ngừa nhồi máu/đột quỵ (giảm 21% MACE). Tuy nhiên, không thể kỳ vọng một viên statin đơn độc sẽ ngăn ngừa được tái nhập viện vì tái nhập viện bị chi phối bởi các bệnh lý đồng mắc phức tạp (suy tim mất bù, đái tháo đường, suy thận mạn) và sự suy giảm tuân thủ thuốc trong đời thực. Cần phối hợp quản lý bệnh mạn tính đa chuyên khoa và ưu tiên viên kết hợp cố định liều (Polypill) để cải thiện tuân thủ.",
    "description": "Phân tích hệ thống và phân tích gộp trên 506,813 bệnh nhân từ 7 nghiên cứu (Cureus 2025): Liệu pháp statin giúp giảm 40% nguy cơ tử vong do mọi nguyên nhân (RR 0.60; P=0.002) và giảm 21% biến cố tim mạch chính MACE (RR 0.79; P<0.00001), có xu hướng giảm 26% tử vong tim mạch (RR 0.74; P=0.07), nhưng hoàn toàn KHÔNG làm giảm tỷ lệ tái nhập viện do tim mạch (RR 0.97; P=0.68; I²=0%).",
    "keyRecommendations": [
      "Khẳng định lợi ích sống còn vượt trội: Liệu pháp statin giúp giảm 40% nguy cơ tử vong do mọi nguyên nhân ở bệnh nhân có nguy cơ tim mạch (RR 0.60; 95% CI 0.43–0.83; P = 0.002).",
      "Hiệu quả bảo vệ mạch máu ổn định và nhất quán cao: Giảm 21% nguy cơ xảy ra biến cố tim mạch chính MACE (RR 0.79; 95% CI 0.71–0.87; P < 0.00001; I² = 27%).",
      "Xu hướng giảm rõ rệt 26% tử vong do nguyên nhân tim mạch (RR 0.74; 95% CI 0.53–1.02; P = 0.07), dù chưa đạt ngưỡng ý nghĩa thống kê do khoảng tin cậy đi qua 1.0.",
      "Statin hoàn toàn KHÔNG làm giảm tỷ lệ tái nhập viện do tim mạch (RR 0.97; 95% CI 0.83–1.13; P = 0.68; I² = 0%), đòi hỏi chiến lược quản lý bệnh đồng mắc và tối ưu hóa tuân thủ."
    ],
    "clinicalPearls": [
      "Hiệu ứng pleiotropic ngoài lipid của statin (kháng viêm giảm hs-CRP, kích hoạt eNOS tăng tiết NO nội mạc, ổn định mảng bám tăng bề dày vỏ xơ, chống oxy hóa và ức chế tiểu cầu) đóng vai trò sống còn trong việc giảm tử vong và MACE.",
      "Sự thất bại của statin trong việc giảm tái nhập viện (RR 0.97) xuất phát từ gánh nặng bệnh đồng mắc (suy tim mất bù, đái tháo đường, suy thận mạn), rào cản tuân thủ thuốc thực tế và tiêu chuẩn nhập viện khác nhau giữa các cơ sở y tế.",
      "Mức độ không đồng nhất I² đối với MACE rất thấp (27%) và tái nhập viện là 0%, chứng minh tính đồng thuận cao về hiệu quả phòng ngừa biến cố xơ vữa nhưng giới hạn đối với nhu cầu nhập viện.",
      "Cảnh giác với khoảng trống dữ liệu giới tính: 96.9% dân số nghiên cứu gộp là nam giới (do chi phối bởi nghiên cứu cựu chiến binh Mỹ Orkaby 384k ca), đòi hỏi thận trọng khi suy diễn trực tiếp cho nữ giới."
    ],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Tổng Quan, Dược Lý & Mục Tiêu Nghiên Cứu",
        "icon": "fa-solid fa-book-medical"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Phương Pháp & Lưu Đồ PRISMA 2009 (Figure 1)",
        "icon": "fa-solid fa-filter"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Đặc Điểm 7 Nghiên Cứu & Quần Thể 506K BN (Tables 1 & 2)",
        "icon": "fa-solid fa-users"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Kết Quả Định Lượng & 4 Biểu Đồ Forest Plot",
        "icon": "fa-solid fa-chart-line"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Cơ Chế Sinh Lý Bệnh & 4 Tác Động Pleiotropic",
        "icon": "fa-solid fa-dna"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Giải Mã Sự Thất Bại Trên Tiêu Chí Tái Nhập Viện",
        "icon": "fa-solid fa-hospital-user"
      },
      {
        "id": "sec-7",
        "number": 7,
        "title": "Chất Lượng Thiết Kế, Hạn Chế & Ý Nghĩa Thực Hành",
        "icon": "fa-solid fa-user-doctor"
      },
      {
        "id": "sec-8",
        "number": 8,
        "title": "Tài Liệu Tham Khảo Chuẩn AMA",
        "icon": "fa-solid fa-bookmark"
      }
    ],
    "updatedAt": "2026-09-06"
  },
  {
    "id": "2025-lancet-tetanus",
    "slug": "2025-lancet-tetanus",
    "code": "GDL-2025-LANCET-TETANUS",
    "title": "Tổng Quan Bệnh Uốn Ván: Chẩn Đoán Lâm Sàng, Phác Đồ Điều Trị Cấp Cứu, Kiểm Soát Co Thắt & Rối Loạn Thần Kinh Thực Vật",
    "titleEn": "Tetanus: Recognition and Management",
    "journal": "Lancet Infect Dis. 2025;25(11):e645-e657",
    "organization": "Lancet Infectious Diseases / OUCRU / UCLH",
    "year": 2025,
    "file": "2025-lancet-tetanus.mdx",
    "specialty": "infect",
    "specialty2": "icu",
    "conditionKey": "tetanus",
    "problemLabels": [
      "generalized-tetanus",
      "autonomic-dysfunction",
      "intrathecal-antitoxin",
      "magnesium-sulfate"
    ],
    "icd10": [
      "A35",
      "A33",
      "A34"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "severe-tetanus-icu",
      "asian-cohort"
    ],
    "population": "Bệnh nhân phơi nhiễm hoặc mắc bệnh uốn ván (toàn thân, đầu-mặt-cổ, cục bộ, sơ sinh)",
    "interventionClass": "neuro-critical-care",
    "drug": "Metronidazole, Penicillin G, Huyết thanh kháng uốn ván (hTIG / Equine Antitoxin / IVIg), Benzodiazepines (Diazepam, Midazolam), Magnesium sulphate, Labetalol, Fentanyl",
    "intervention": "Xử trí phẫu thuật lọc bỏ mô tử tử, kháng sinh diệt C. tetani, trung hòa độc tố bằng hTIG/equine antitoxin, mở khí quản cấp cứu, kiểm soát co thắt bằng Benzodiazepine/NMB và kiểm soát rối loạn thần kinh thực vật bằng Magnesium sulphate/Labetalol",
    "comparatorType": "standard-of-care",
    "primaryEndpointCategory": "mortality",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "uon-van",
      "oucru-viet-nam",
      "roi-loan-than-kinh-thuc-vat"
    ],
    "tags": [
      "Lancet",
      "2025",
      "Truyền nhiễm",
      "Uốn Ván",
      "Hồi sức tích cực",
      "TeNT"
    ],
    "description": "Bài tổng quan y văn toàn diện trên Lancet Infect Dis (2025) về dịch tễ, sinh lý bệnh độc tố TeNT, tiêu chuẩn chẩn đoán lâm sàng, phác đồ điều trị hồi sức tích cực uốn ván và tiên lượng.",
    "keyRecommendations": [
      "Xử trí vết thương & Kháng sinh: Phẫu thuật lọc bỏ sạch mô hoại tử và sử dụng Metronidazole (ưu tiên hơn Penicillin G) đường uống/tĩnh mạch trong 7–10 ngày để cắt đứt nguồn sản sinh độc tố C. tetani.",
      "Trung hòa độc tố TeNT: Tiêm tiêm bắp/tĩnh mạch Huyết thanh kháng uốn ván từ người (hTIG) hoặc từ ngựa (Equine Antitoxin) ngay lập tức; Tuyệt đối KHÔNG chỉ định tiêm qua đường tủy sống (Intrathecal) do không mang lại lợi ích lâm sàng.",
      "Bảo vệ đường thở & Kiểm soát co thắt: Khoảng 50% bệnh nhân uốn ván toàn thân cần thông khí nhân tạo; ưu tiên mở khí quản sớm (Primary Tracheostomy). Dùng Benzodiazepine (Diazepam > 1 mg/kg/ngày hoặc Midazolam) phối hợp thuốc phong bế thần kinh cơ (NMB) khi co thắt kháng trị.",
      "Kiểm soát rối loạn thần kinh thực vật (ANSD): Sử dụng Magnesium sulphate truyền tĩnh mạch liên tục duy trì nồng độ huyết thanh 2–4 mmol/L phối hợp thuốc chẹn giao cảm ngắn hạn (Labetalol) và Opioid (Fentanyl/Morphine)."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Định Nghĩa, Dịch Tễ & Sinh Lý Bệnh Độc Tố Uốn Ván (TeNT)",
        "icon": "fa-solid fa-virus"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Biểu Hiện Lâm Sàng, Phân Loại Ablett & Chẩn Đoán Phân Biệt",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phác Đồ Điều Trị Tổng Thể, Kháng Sinh & Huyết Thanh Kháng Độc Tố",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Lưu Đồ Thuật Toán Hồi Sức Tích Cực (Kiểm Soát Co Thắt & Thần Kinh Thực Vật)",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Các Hình Thái Lâm Sàng Đặc Biệt & Biến Chứng Nặng Trong ICU",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Tiên Lượng, Kế Hoạch Phục Hồi Chức Năng & Tài Liệu Tham Khảo",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-10-25"
  },
  {
    "id": "2024-systemic-antibiotic-ssti",
    "slug": "2024-systemic-antibiotic-ssti",
    "code": "REV-2024-JDVI-SSTI-ANTIBIOTIC",
    "title": "JDVI 2024: Nghiên Cứu Tổng Quan Lựa Chọn Kháng Sinh Hệ Thống Trong Nhiễm Trùng Da & Mô Mềm (SSTI)",
    "titleEn": "Systemic Antibiotic Selection in Skin and Soft Tissue Infections (Journal of General - Procedural Dermatology & Venereology Indonesia 2024)",
    "journal": "Journal of General - Procedural Dermatology & Venereology Indonesia (JDVI)",
    "organization": "Universitas Indonesia / RSUPN Dr. Cipto Mangunkusumo",
    "year": 2024,
    "file": "2024-systemic-antibiotic-ssti.mdx",
    "specialty": "infect",
    "specialty2": "derma",
    "conditionKey": "ssti",
    "problemLabels": [
      "purulent-ssti",
      "non-purulent-cellulitis",
      "mrsa-coverage"
    ],
    "icd10": [
      "L03",
      "L03.9",
      "L02",
      "L02.9",
      "L01",
      "L08.9",
      "M72.6"
    ],
    "design": "systematic-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "adults-pediatrics",
      "ssti-outpatient-inpatient"
    ],
    "population": "Bệnh nhân ở mọi lứa tuổi bị nhiễm trùng da và mô mềm cấp tính hoặc tái phát, bao gồm cả các đối tượng suy giảm miễn dịch hoặc có bệnh nền phức tạp.",
    "interventionClass": "antimicrobial-pkpd",
    "drug": "Amoxicillin-clavulanate, Cephalexin, Clindamycin, Penicillin, Cefadroxil, Erythromycin, Doxycycline, Trimethoprim-sulfamethoxazole, Vancomycin, Cefazolin, Ampicillin-sulbactam, Nafcillin, Piperacillin-tazobactam, Imipenem, Meropenem, Ertapenem, Cefotaxime, Metronidazole, Gentamicin, Ceftriaxone, Oxacillin",
    "intervention": "Đánh giá định tính kê đơn kháng sinh bằng Lưu đồ Gyssens (Nhóm I đến VI); Phân loại WHO AWaRe; Nhận diện các yếu tố nguy cơ HA-MRSA vs CA-MRSA và cảnh báo tiền sử dùng Quinolone làm tăng nguy cơ MRSA; Phân tầng lâm sàng theo IDSA sửa đổi, FDA ABSSSI (diện tích ≥ 75 cm²) và Thang điểm Eron Class 1-4; Phác đồ điều trị bệnh da mủ, viêm mô tế bào 5 ngày và các cấp cứu da liễu đe dọa tính mạng (Viêm cân mạc hoại tử 4 type, Sốc độc tố TSS, Bong vảy da do tụ cầu SSSS).",
    "comparatorType": "active-control",
    "primaryEndpointCategory": "clinical-recovery",
    "primaryEndpoint": "Chuẩn hóa quy trình lựa chọn kháng sinh hệ thống theo bằng chứng, kiểm soát định tính chất lượng kê đơn kháng sinh, tối ưu hóa điều trị SSTI và ngăn chặn sự phát tán của vi khuẩn đa kháng AMR/MRSA.",
    "outcomeDirection": "non-inferior",
    "impactVerdict": "practice-informing",
    "keyResults": "Tỷ lệ MRSA nội trú lên tới 47% | Tiền sử Quinolone trong 1 năm tăng nguy cơ nhiễm MRSA | Lưu đồ Gyssens tối ưu hóa sử dụng kháng sinh định tính | Áp dụng chuẩn điều trị 5 ngày cho viêm mô tế bào | Clindamycin triệt tiêu độc tố siêu kháng nguyên trong NF type 2, TSS và SSSS.",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "khang-sinh",
      "nhiem-trung-da-mo-mem",
      "mrsa"
    ],
    "tags": [
      "JDVI",
      "2024",
      "SSTI",
      "Kháng sinh hệ thống",
      "MRSA",
      "Lưu đồ Gyssens",
      "WHO AWaRe",
      "Thang điểm Eron",
      "Viêm cân mạc hoại tử",
      "TSS",
      "SSSS",
      "Evidence-Based Medicine"
    ],
    "summary": "Tổng quan lâm sàng toàn diện công bố tháng 12/2024 trên JDVI: Tích hợp Lưu đồ Gyssens I-VI trực quan hóa, phân loại WHO AWaRe, các hệ thống phân tầng Eron & ABSSSI, nhận diện nguy cơ MRSA liên quan đến quinolone và phác đồ điều trị chi tiết từ bệnh da mủ đến viêm cân mạc hoại tử và hội chứng sốc độc tố.",
    "detailedConclusion": "Bác sĩ lâm sàng áp dụng Lưu đồ Gyssens để đánh giá chất lượng kê đơn. Khai thác tiền sử dùng Quinolone để cảnh giác MRSA. Tuân thủ 5 ngày điều trị cho viêm mô tế bào. Phối hợp Clindamycin kháng độc tố trong các cấp cứu da liễu hoại tử.",
    "description": "Tổng quan y khoa chuyên sâu công bố tháng 12/2024 trên Tạp chí Da liễu & Phong liễu học Thực hành Indonesia (JDVI): Dịch tễ học đề kháng AMR & MRSA châu Á; Khung phân loại WHO AWaRe; Lưu đồ Gyssens đánh giá định tính kê đơn kháng sinh chuẩn Editorial; Thang điểm Eron & Tiêu chuẩn FDA ABSSSI; Bảng nguy cơ HA-MRSA vs CA-MRSA; Phác đồ bệnh da mủ, viêm mô tế bào 5 ngày và các cấp cứu da liễu đe dọa tính mạng (Viêm cân mạc hoại tử 4 type, Sốc độc tố TSS, Bong vảy da SSSS).",
    "keyRecommendations": [
      "Đánh giá chất lượng kê đơn kháng sinh bằng Lưu đồ Gyssens: Áp dụng lưu đồ chuẩn 6 nhóm (Gyssens I đến VI) để kiểm soát định tính tính hợp lý về chỉ định, liều lượng, khoảng cách, đường dùng, thời gian và lựa chọn kháng sinh phổ hẹp tối ưu.",
      "Cảnh báo dịch tễ MRSA và mối liên quan với kháng sinh Quinolone: Tỷ lệ MRSA nội trú lên tới 47% tại bệnh viện đại học tuyến trung ương; nghiên cứu xác định tiền sử sử dụng kháng sinh nhóm quinolone trong vòng 1 năm là yếu tố nguy cơ độc lập gây nhiễm trùng SSTI do MRSA.",
      "Áp dụng hệ thống phân tầng đa chiều (IDSA sửa đổi, FDA ABSSSI ≥ 75 cm², Thang điểm Eron 1 - 4): Hỗ trợ quyết định chính xác thời điểm điều trị ngoại trú đường uống vs nhập viện truyền tĩnh mạch vs can thiệp ngoại khoa cấp cứu.",
      "Thời gian điều trị chuẩn 5 ngày cho viêm mô tế bào không biến chứng: Tuân thủ phác đồ rút ngắn 5 ngày; hạn chế dùng kháng sinh hệ thống cho nhọt/áp xe nhẹ khu trú chỉ cần rạch dẫn lưu (I&D) và bôi mỡ axit fusidic 2%.",
      "Phối hợp Clindamycin ức chế độc tố trong các cấp cứu da liễu tối khẩn: Bắt buộc phối hợp Clindamycin với kháng sinh diệt khuẩn trong viêm cân mạc hoại tử do liên cầu A (Type 2), hoại tử cơ Clostridium, hội chứng sốc độc tố (TSS) và hội chứng bong vảy da do tụ cầu (SSSS) để triệt tiêu sinh độc tố tại ribosom."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-tong-quan-amr-aware",
        "number": 1,
        "title": "Bối Cảnh Toàn Cầu, Gánh Nặng MRSA & Hệ Thống Phân Loại AWaRe Của WHO",
        "icon": "fa-solid fa-earth-americas"
      },
      {
        "id": "sec-luu-do-gyssens",
        "number": 2,
        "title": "Đánh Giá Chất Lượng Kê Đơn Bằng Lưu Đồ Gyssens (Figure 1 & Code Trực Quan)",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-phan-loai-muc-do-nang",
        "number": 3,
        "title": "Hệ Thống Phân Loại SSTI: IDSA Sửa Đổi (Table 1), FDA ABSSSI & Thang Điểm Eron",
        "icon": "fa-solid fa-layer-group"
      },
      {
        "id": "sec-yeu-to-nguy-co-mrsa",
        "number": 4,
        "title": "Bảng Yếu Tố Nguy Cơ HA-MRSA vs CA-MRSA (Table 2) & Cảnh Báo Quinolone",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-phac-do-benh-da-mu",
        "number": 5,
        "title": "Quản Lý Bệnh Da Mủ (Chốc Lở, Nhọt, Hậu Bối, Viêm Bạch Huyết)",
        "icon": "fa-solid fa-syringe"
      },
      {
        "id": "sec-viem-mo-te-bao-hong-ban",
        "number": 6,
        "title": "Viêm Mô Tế Bào & Hồng Ban: Phác Đồ 5 Ngày & Dự Phòng Tái Phát",
        "icon": "fa-solid fa-hand-dots"
      },
      {
        "id": "sec-cap-cuu-hoai-tu-tss-ssss",
        "number": 7,
        "title": "Cấp Cứu Da Liễu: Viêm Cân Mạc Hoại Tử (4 Type), TSS & Hội Chứng SSSS",
        "icon": "fa-solid fa-biohazard"
      },
      {
        "id": "sec-nguoi-cao-tuoi-cheat-sheet-mcq",
        "number": 8,
        "title": "SSTI Ở Người Cao Tuổi, Cheat-Sheet Lâm Sàng & 5 Câu Hỏi Tự Lượng Giá",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-09-03"
  },
  {
    "id": "2023-nejm-cape-cod-hydrocortisone-severe-cap",
    "slug": "2023-nejm-cape-cod-hydrocortisone-severe-cap",
    "code": "GDL-2023-NEJM-CAPE-COD-HYDROCORTISONE-SEVERE-CAP",
    "trialAcronym": "CAPE COD",
    "title": "CAPE COD: Thử nghiệm Lâm sàng Hydrocortisone trong Viêm Phổi Mắc Phải Cộng Đồng Nặng (SCAP)",
    "titleEn": "Hydrocortisone in Severe Community-Acquired Pneumonia (CAPE COD Trial)",
    "journal": "N Engl J Med",
    "organization": "Mạng lưới Nghiên cứu CRICS-TriGGERSep (Pháp) / NEJM",
    "year": 2023,
    "doi": "10.1056/NEJMoa2215145",
    "nctId": "NCT02517489",
    "file": "2023-nejm-cape-cod-hydrocortisone-severe-cap.mdx",
    "specialty": "pulmo",
    "specialty2": "icu",
    "conditionKey": "pneumonia",
    "problemLabels": [
      "severe-cap",
      "icu-respiratory-failure",
      "mortality-28d"
    ],
    "icd10": [
      "J18.9",
      "J18.0",
      "J96.0"
    ],
    "design": "rct",
    "phase": "Phase III",
    "blinding": "double-blind",
    "centerScope": "multicenter-national",
    "hypothesisType": "superiority",
    "sampleSize": 795,
    "followUpDuration": "28 ngày",
    "asianData": false,
    "populationTags": [
      "icu-adults",
      "severe-cap-non-septic-shock"
    ],
    "population": "Bệnh nhân trưởng thành nhập khoa hồi sức tích cực (ICU) do viêm phổi cộng đồng nặng (đáp ứng tiêu chuẩn thở máy xâm nhập/không xâm nhập, oxy dòng cao hoặc mặt nạ túi dự trữ), loại trừ các trường hợp có sốc nhiễm trùng kèm theo.",
    "interventionClass": "systemic-corticosteroid",
    "drug": "Hydrocortisone, Insulin",
    "intervention": "Hydrocortisone 200 mg/ngày truyền tĩnh mạch liên tục trong 4 ngày đầu -> giảm liều 8-14 ngày vs Placebo trên nền điều trị chuẩn tại ICU",
    "comparatorType": "placebo",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Tử vong do mọi nguyên nhân ở ngày thứ 28 (Day 28 all-cause mortality)",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "keyResults": "Giảm 5.6% tử vong ngày 28 (6.2% vs 11.9%, P=0.006); giảm 41% đặt nội khí quản (HR 0.59); giảm 41% khởi đầu dùng vận mạch (HR 0.59); an toàn không tăng nhiễm trùng bệnh viện hay xuất huyết tiêu hóa.",
    "primaryMetric": {
      "measure": "RR",
      "interventionRate": "6.2% (25/400)",
      "controlRate": "11.9% (47/395)",
      "effectEstimate": 0.53,
      "ciLower": 0.33,
      "ciUpper": 0.84,
      "rawDiffText": "ARR -5.6% (95% CI -9.6% đến -1.7%)",
      "pValue": "0.006",
      "nnt": 18
    },
    "safetyHighlight": "Tăng nhu cầu Insulin nội viện; không tăng nhiễm trùng bệnh viện hoặc xuất huyết tiêu hóa",
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": 7,
    "fundingSource": "public-academic",
    "topicTags": [
      "corticoid-icu",
      "viem-phoi-nang",
      "giam-dat-nkq"
    ],
    "tags": [
      "NEJM",
      "2023",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Thử nghiệm pha 3 ngẫu nhiên mù đôi bản lề chứng minh liệu pháp hydrocortisone truyền liên tục sớm (bắt đầu < 15 giờ sau nhập ICU) giúp cải thiện rõ rệt sống còn ở bệnh nhân SCAP nặng nhập ICU không có sốc nhiễm trùng ban đầu.",
    "detailedConclusion": "Chỉ định Hydrocortisone 200 mg/ngày truyền liên tục sớm cho bệnh nhân SCAP nhập ICU có PaO2/FiO2 < 300 hoặc PSI > 130 không có sốc nhiễm trùng hay cúm để giảm tử vong và giảm nguy cơ đặt ống thở máy.",
    "description": "CAPE COD (NEJM 2023) — Thử nghiệm lâm sàng Pha 3 bản lề về Hydrocortisone trong Viêm phổi mắc phải cộng đồng nặng (SCAP) nhập ICU: Giảm 5.6% tử vong ngày 28 (P=0.006), giảm 41% đặt nội khí quản và giảm 41% nhu cầu vận mạch.",
    "keyRecommendations": [
      "Khác biệt tuyệt đối tử vong ngày 28 (6.2% vs 11.9%, P = 0.006)",
      "Giảm 41% nguy cơ đặt nội khí quản ở BN chưa thở máy ban đầu",
      "Giảm 41% nguy cơ phải khởi đầu dùng thêm thuốc vận mạch",
      "Thời gian vàng khởi đầu Hydrocortisone 200mg/ngày sau nhập ICU"
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Kết cục lâm sàng chính tại ngày thứ 28": "Hydrocortisone: Tử vong 6.2%, Đặt nội khí quản 18.0%, Dùng thuốc vận mạch 15.3% | Giả dược: Tử vong 11.9%, Đặt nội khí quản 29.5%, Dùng thuốc vận mạch 25.0%",
      "Tần suất các biến cố an toàn và tác dụng phụ": "COL: Nhiễm trùng bệnh viện (Hydrocortisone): 9.8% | Nhiễm trùng bệnh viện (Giả dược): 11.1% | Xuất huyết tiêu hóa (Hydrocortisone): 2.2% | Xuất huyết tiêu hóa (Giả dược): 3.3%",
      "Liều lượng insulin trung vị sử dụng trong tuần đầu (UI/ngày)": "COL: Nhóm Hydrocortisone: 35.5% | Nhóm Giả dược: 20.5%"
    },
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Bối Cảnh & PICO",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Tiêu Chuẩn & Sàng Lọc",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phác Đồ Hydrocortisone",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Kết Quả & Forest Plot",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Tính An Toàn & Tích Lũy",
        "icon": "fa-solid fa-shield-virus"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Bàn Luận & Bài Học",
        "icon": "fa-solid fa-book-bookmark"
      },
      {
        "id": "sec-7",
        "number": 7,
        "title": "Bedside SCAP Calculator",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2021-diagnostics-cbc-sepsis",
    "slug": "2021-diagnostics-cbc-sepsis",
    "code": "GDL-2021-DIAGNOSTICS-CBC-SEPSIS",
    "title": "Diagnostics 2021: Giá Trị Của Tổng Phân Tích Tế Bào Máu (CBC) & Dữ Liệu Quần Thể Tế Bào Nâng Cao (CPD) Trong Chẩn Đoán & Tiên Lượng Nhiễm Trùng Huyết",
    "titleEn": "The Value of a Complete Blood Count (CBC) for Sepsis Diagnosis and Prognosis (Diagnostics 2021)",
    "journal": "Diagnostics. 2021;11(10):1881. doi:10.3390/diagnostics11101881",
    "organization": "Diagnostics / MDPI",
    "year": 2021,
    "doi": "10.3390/diagnostics11101881",
    "file": "2021-diagnostics-cbc-sepsis.mdx",
    "specialty": "infect",
    "specialty2": "icu",
    "conditionKey": "sepsis",
    "problemLabels": [
      "early-sepsis-detection",
      "cbc-cell-population-data",
      "mdw-nlr"
    ],
    "icd10": [
      "A41.9",
      "R65.2",
      "R65.21"
    ],
    "design": "diagnostic-accuracy",
    "phase": "Systematic & Critical Appraisal Review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "ed-icu-suspected-sepsis"
    ],
    "population": "Bệnh nhân người trưởng thành nghi ngờ hoặc xác định mắc Nhiễm trùng huyết (Sepsis) và Sốc nhiễm trùng (Septic Shock) tại khoa Cấp cứu (ED) và Hồi sức tích cực (ICU).",
    "interventionClass": "biomarker-diagnostics",
    "drug": "Kháng sinh phổ rộng giờ đầu (Hour-1 Bundle), Dịch truyền tinh thể, Vận mạch (Norepinephrine), Khối hồng cầu lắng (khi Hb < 7.0 g/dL)",
    "intervention": "Khai thác CBC và CPD làm hệ thống cảnh báo sớm tuyến một; sử dụng MDW (Early Sepsis Indicator, FDA approved) tại ED với NPV rất cao để loại trừ sepsis; kết hợp RDW > 15%, NLR (cut-off 4.36-23.8) và giảm lympho kéo dài (≤ 0.6 × 10³/µL ở Ngày 4) để tiên lượng tử vong 28 ngày; theo dõi động học tiểu cầu và chỉ số DNI sau 72h tại ICU.",
    "comparatorType": "procalcitonin-crp",
    "primaryEndpointCategory": "diagnostic-performance",
    "primaryEndpoint": "Đánh giá toàn diện giá trị chẩn đoán sớm, phân tầng tiên lượng tử vong và theo dõi động học đáp ứng điều trị của các thông số CBC cơ bản và CPD nâng cao so với các dấu ấn sinh hóa cổ điển (CRP, PCT) và cấy máu.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "MDW được FDA phê duyệt là Early Sepsis Indicator tại ED với NPV rất cao | Giảm lympho tuyệt đối ≤ 0.6 × 10³/µL ở Ngày 4 tiên lượng độc lập tử vong 28 ngày (Drewry et al.) | RDW > 15% là yếu tố dự báo độc lập tử vong ICU | NLR tương quan chặt với SOFA/APACHE II (meta-analysis 14 nghiên cứu, n = 11,564) | DNI tăng sau 72h cảnh báo thất bại kháng sinh.",
    "robOverall": "not-applicable",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "dau-an-sinh-hoc",
      "cbc-cpd",
      "sepsis",
      "nlr-mlr"
    ],
    "tags": [
      "Diagnostics 2021",
      "Sepsis",
      "Complete Blood Count",
      "Cell Population Data",
      "MDW",
      "NLR",
      "RDW",
      "Tiểu cầu",
      "Biomarkers",
      "Evidence-Based Medicine"
    ],
    "summary": "Tổng quan y học chứng cứ trên tạp chí Diagnostics hệ thống hóa vai trò của CBC và CPD trong Sepsis: cơ chế bão cytokine 2 giai đoạn, giá trị của từng dòng bạch cầu/hồng cầu/tiểu cầu, các tỷ số phức hợp (NLR, PC/MPV), dấu ấn CPD thế hệ mới (MDW, MNV, MMV, DNI, IPF), ma trận đối chiếu với CRP/PCT/cấy máu và thuật toán cây quyết định lâm sàng tích hợp từ ED đến ICU.",
    "detailedConclusion": "Công thức máu là công cụ cảnh báo sớm tuyến một nhanh nhất và kinh tế nhất trong sepsis. Tại ED, MDW cho phép loại trừ sepsis an toàn và NLR/RDW giúp phân tầng nguy cơ khẩn cấp để kích hoạt Sepsis Hour-1 Bundle trước khi có kết quả cấy máu. Tại ICU, động học phục hồi tiểu cầu, động học DNI sau 72 giờ và hiện tượng giảm lympho kéo dài ở Ngày 4 cung cấp thông tin tiên lượng sống còn then chốt.",
    "description": "Tổng quan y học chứng cứ chuyên sâu về giá trị lâm sàng của Tổng phân tích tế bào máu cơ bản (Basic CBC) và Dữ liệu quần thể tế bào nâng cao (CPD: MDW, MNV, MMV, DNI, IPF) trong phát hiện sớm, phân tầng nguy cơ và theo dõi động học điều trị Sepsis tại ED và ICU.",
    "keyRecommendations": [
      "Khai thác CBC và CPD làm hệ thống cảnh báo sớm tuyến một (First-Line Early Warning System) tại ED; trả kết quả trong vài phút, chi phí cực thấp, kích hoạt Sepsis Hour-1 Bundle trước khi có kết quả cấy máu.",
      "MDW (Monocyte Distribution Width / ESId) đã được US FDA phê duyệt là dấu ấn sinh học cảnh báo sớm sepsis tại khoa Cấp cứu với giá trị dự báo âm tính (NPV) rất cao giúp loại trừ sepsis tin cậy.",
      "Giảm lympho kéo dài (số lượng lympho tuyệt đối ≤ 0.6 × 10³ tế bào/µL ở Ngày 4) và RDW > 15% là hai yếu tố độc lập dự báo tăng nguy cơ tử vong 28 ngày do suy giảm miễn dịch muộn.",
      "Động học tiểu cầu và chỉ số DNI (Delta Neutrophil Index): Theo dõi chặt chẽ tại ICU; DNI tăng liên tục sau 72h cảnh báo thất bại điều trị, trong khi DNI trở về bình thường sau 6–10 ngày xác nhận điều trị hiệu quả."
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Hiệu năng chẩn đoán dấu ấn sinh học": "HBAR: MDW loại trừ sớm tại ED (NPV cao): 95.0% | NLR dự báo tử vong độc lập (Meta n=11,564): 90.0% | RDW > 15% tiên lượng tử vong ICU: 85.0% | Giảm lympho Ngày 4 tiên lượng tử vong 28 ngày: 88.0%",
      "So sánh chi phí & thời gian trả kết quả": "HBAR: Thời gian trả kết quả CBC/CPD (Vài phút): 100.0% | Thời gian trả kết quả CRP/PCT (1-2 giờ): 50.0% | Thời gian trả kết quả Cấy máu (24-72 giờ): 15.0%",
      "Động học điều trị tại ICU": "HBAR: DNI bình thường sau 6-10 ngày (Điều trị thành công): 92.0% | DNI tăng sau 72h (Thất bại điều trị): 85.0% | Phục hồi số lượng tiểu cầu (Tiên lượng sống còn): 88.0%"
    },
    "sections": [
      {
        "id": "sec-tongquan",
        "number": 1,
        "title": "Thông Tin Nghiên Cứu & Tóm Tắt Một Câu",
        "icon": "fa-solid fa-file-contract"
      },
      {
        "id": "sec-lichsu",
        "number": 2,
        "title": "Tiến Trình Lịch Sử Định Nghĩa Sepsis",
        "icon": "fa-solid fa-timeline"
      },
      {
        "id": "sec-sinhbenh-cytokine",
        "number": 3,
        "title": "Đáp Ứng Miễn Dịch & Bão Cytokine 2 Giai Đoạn",
        "icon": "fa-solid fa-shield-virus"
      },
      {
        "id": "sec-dong-bachcau",
        "number": 4,
        "title": "Giải Phẫu Dòng Bạch Cầu (WBC Subsets)",
        "icon": "fa-solid fa-microscope"
      },
      {
        "id": "sec-dong-hongcau-rdw",
        "number": 5,
        "title": "Dòng Hồng Cầu, Thiếu Máu & Chỉ Số RDW",
        "icon": "fa-solid fa-droplet"
      },
      {
        "id": "sec-dong-tieucau-sofa",
        "number": 6,
        "title": "Dòng Tiểu Cầu & Động Học Điểm SOFA",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-tyle-cbc",
        "number": 7,
        "title": "Các Tỷ Lệ Công Thức Máu (NLR, PC/MPV, PLR)",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-cpd-mdw",
        "number": 8,
        "title": "Dữ Liệu Quần Thể Tế Bào Nâng Cao (CPD & MDW)",
        "icon": "fa-solid fa-dna"
      },
      {
        "id": "sec-ca-lamsang-proscons",
        "number": 9,
        "title": "Mô Phỏng Ca Lâm Sàng & Ma Trận Ưu / Nhược Điểm",
        "icon": "fa-solid fa-clipboard-user"
      },
      {
        "id": "sec-bang-tonghop-table1",
        "number": 10,
        "title": "Bảng Tổng Hợp Giá Trị Ứng Dụng Lâm Sàng",
        "icon": "fa-solid fa-table-list"
      },
      {
        "id": "sec-doi-chieu-biomarkers",
        "number": 11,
        "title": "Đối Chiếu CBC/CPD Với Dấu Ấn Sinh Hóa & Cấy Máu",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-phan-tich-da-chieu",
        "number": 12,
        "title": "Phân Tích So Sánh Đa Chiều Chuyên Sâu",
        "icon": "fa-solid fa-chart-pie"
      },
      {
        "id": "sec-phan-tang-khoa",
        "number": 13,
        "title": "Phân Tầng Lâm Sàng Theo Tuyến (ED vs ICU)",
        "icon": "fa-solid fa-hospital-user"
      },
      {
        "id": "sec-luodo-thuat-toan",
        "number": 14,
        "title": "Lưu Đồ Thuật Toán Xử Trí Tích Hợp CBC & CPD",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-rob-appraisal",
        "number": 15,
        "title": "Thẩm Định Sai Lệch, Đồng Thuận & Hạn Chế",
        "icon": "fa-solid fa-shield-halved"
      },
      {
        "id": "sec-phan-quyet-thamkhao",
        "number": 16,
        "title": "Phán Quyết Lâm Sàng & Tài Liệu Tham Khảo AMA",
        "icon": "fa-solid fa-gavel"
      }
    ],
    "updatedAt": "2026-10-10"
  },
  {
    "id": "2020-nutrients-lowcarb-vs-lowfat",
    "slug": "2020-nutrients-lowcarb-vs-lowfat",
    "code": "GDL-2020-NUTRIENTS-LOWCARB-VS-LOWFAT",
    "trialAcronym": "LOWCARB-LOWFAT META",
    "title": "Nghiên cứu So sánh Chế độ ăn Low-Carb vs Low-Fat trong Giảm cân và Kiểm soát Chuyển hóa",
    "titleEn": "Effects of Low-Carbohydrate vs Low-Fat Diets on Metabolic Parameters and Weight Loss",
    "journal": "Nat Med",
    "organization": "Nutrients Meta-Analysis",
    "year": 2020,
    "file": "2020-nutrients-lowcarb-vs-lowfat.mdx",
    "specialty": "nutri",
    "conditionKey": "obesity",
    "problemLabels": [
      "weight-loss",
      "cardiometabolic-markers",
      "dietary-comparison"
    ],
    "icd10": [
      "E66",
      "E11"
    ],
    "design": "meta-analysis",
    "centerScope": "multicenter-intl",
    "hypothesisType": "superiority",
    "sampleSize": 6499,
    "followUpDuration": "6–24 tháng",
    "asianData": false,
    "populationTags": [
      "overweight-obesity",
      "metabolic-syndrome"
    ],
    "population": "Người trưởng thành (độ tuổi trung bình từ 33 đến 58 tuổi, BMI trung bình từ 22 đến 43.6 kg/m2) tham gia các nghiên cứu RCT so sánh chế độ ăn, không mắc kèm các bệnh lý mạn tính nghiêm trọng (đái tháo đường, ung thư, COPD, hoặc bệnh tim mạch sẵn có).",
    "interventionClass": "nutrition-microbiome",
    "drug": "Chế độ ăn ít carbohydrate, Chế độ ăn ít chất béo",
    "intervention": "Chế độ ăn giảm Carbohydrate (< 50-130g/ngày) vs Giảm chất béo (< 30% tổng năng lượng)",
    "comparatorType": "active-control",
    "primaryEndpointCategory": "metabolic-control",
    "primaryEndpoint": "Mức giảm cân nặng, HbA1c, Triglyceride và cải thiện nhạy cảm Insulin",
    "outcomeDirection": "mixed-coprimary",
    "impactVerdict": "practice-informing",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "dinh-duong-chuyen-hoa",
      "low-carb",
      "giam-can"
    ],
    "tags": [
      "NUTRIENTS",
      "2020",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Chế độ ăn Low-Carb cho thấy ưu thế vượt trội trong 6 tháng đầu về giảm cân nhanh và kiểm soát đường huyết sau ăn, sau 12 tháng phụ thuộc chủ yếu vào mức độ tuân thủ năng lượng nạp vào.",
    "detailedConclusion": "Cá thể hóa chế độ ăn dựa trên sự ưa thích và khả năng duy trì lâu dài của bệnh nhân.",
    "description": "Tổng quan hệ thống & Phân tích gộp 38 RCTs (6.499 người): Tác động của Chế độ ăn Ít Carbohydrate (&lt;40%) vs. Ít Chất béo (&lt;30%) lên Giảm cân và Bộ mỡ máu (LDL, HDL, Triglycerides, Cholesterol toàn phần) cùng Chiến lược cá thể hóa dinh dưỡng lâm sàng.",
    "keyRecommendations": [
      "Chế độ ăn Low-Carb (LCD) giúp giảm HbA1c và đường huyết lúc đói vượt trội trong 6 tháng đầu so với Low-Fat.",
      "Cải thiện mạnh mẽ bilan lipid: Giảm Triglycerides và tăng HDL-Cholesterol đáng kể ở nhóm ăn giảm Carbonhydrate.",
      "Tối ưu hóa nguồn đạm và chất béo: Ưu tiên chất béo không bão hòa đơn/đa từ thực vật và cá (Địa Trung Hải) thay vì chất béo bão hòa từ động vật.",
      "Hiệu quả giảm cân dài hạn (> 12 tháng) tương đương giữa Low-Carb và Low-Fat; tính kiên định và tuân thủ là yếu tố quyết định thành công."
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Biến động cân nặng theo thời gian (Thấp hơn biểu thị có lợi cho Low-Carb)": "HBAR: 1-3 tháng: -0.93% | 3-6 tháng: -1.47% | 6-12 tháng: -1.30% | Trên 12 tháng: 0.83%",
      "Thay đổi các chỉ số Lipid lúc 6-12 tháng (Quy đổi tuyệt đối sang tỷ lệ %)": "HBAR: Giảm Triglyceride (Có lợi): 10.0% | Tăng HDL-C (Có lợi): 5.0% | Tăng LDL-C (Bất lợi): 7.0% | Tăng Cholesterol toàn phần (Bất lợi): 10.0%",
      "Mức độ phân bổ nguy cơ sai lệch (Risk of Bias)": "COL: Nguy cơ thấp: 21.0% | Một số lo ngại: 58.0% | Nguy cơ cao: 21.0%"
    },
    "sections": [
      {
        "id": "sec-definitions",
        "number": 1,
        "title": "Tiêu chuẩn & PRISMA (Fig 1)",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-weight",
        "number": 2,
        "title": "Giảm Cân Sinh Lý (Fig 2)",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-lipids",
        "number": 3,
        "title": "Động Học Lipid Máu (Fig 3)",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-mechanisms",
        "number": 4,
        "title": "Cơ Chế Chuyển Hóa",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-rob",
        "number": 5,
        "title": "Chất Lượng & RoB (Fig 4)",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-tailored",
        "number": 6,
        "title": "Cá Thể Hóa Lâm Sàng",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2020-cureus-dengue-electrolyte-imbalance",
    "slug": "2020-cureus-dengue-electrolyte-imbalance",
    "code": "STD-2020-CUREUS-DENGUE-ELECTROLYTES",
    "title": "Rối Loạn Điện Giải Lúc Nhập Viện Không Dự Báo Thời Gian Nằm Viện Và Tử Vong Ở Bệnh Nhân Dengue",
    "titleEn": "Electrolyte Imbalance at Admission Does Not Predict the Length of Stay or Mortality in Dengue-Infected Patients",
    "journal": "Cureus",
    "organization": "Aga Khan University Hospital",
    "year": 2020,
    "file": "2020-cureus-dengue-electrolyte-imbalance.mdx",
    "specialty": "infect",
    "specialty2": "icu",
    "conditionKey": "dengue-fever",
    "problemLabels": [
      "dengue-electrolytes",
      "hyponatremia",
      "length-of-stay",
      "mortality"
    ],
    "icd10": [
      "A90",
      "A91",
      "E87.1",
      "E87.6"
    ],
    "design": "retrospective-cohort",
    "centerScope": "single-center",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "hospitalized-dengue",
      "asian-cohort"
    ],
    "population": "Bệnh nhân người lớn (≥ 18 tuổi) nhập viện do mắc sốt xuất huyết Dengue xác định bằng NS1 Ag hoặc IgM (+)",
    "interventionClass": "fluid-electrolyte-acidbase",
    "drug": "Dung dịch tinh thể đẳng trương (0.9% NaCl), Ringer Lactate, Bù điện giải Natri/Kali, Insulin, Troponin T/I test",
    "intervention": "Đánh giá rối loạn điện giải (hạ Natri < 135 mEq/L, hạ Kali < 3.5 mEq/L), Troponin, Creatinine lúc nhập viện và phân tích tương quan đa biến với thời gian nằm viện ≥ 3 ngày và tử vong",
    "comparatorType": "normal-electrolytes",
    "primaryEndpointCategory": "severity-prognosis",
    "outcomeDirection": "neutral-null",
    "impactVerdict": "hypothesis-generating",
    "robOverall": "some-concerns",
    "gradeCertainty": "low",
    "fragilityIndex": null,
    "topicTags": [
      "dengue",
      "ha-natri-mau",
      "roi-loan-dien-giai",
      "ket-qua-am-tinh"
    ],
    "tags": [
      "Cureus",
      "2020",
      "Truyền nhiễm",
      "Sốt xuất huyết Dengue",
      "Rối loạn điện giải",
      "Hạ Natri máu",
      "Hạ Kali máu",
      "Evidence-Based Medicine"
    ],
    "description": "Nghiên cứu quan sát trên 1.008 bệnh nhân Dengue tại Pakistan chứng minh hạ Natri (29.3%) và hạ Kali (23.2%) lúc nhập viện không liên quan độc lập đến thời gian nằm viện hay tử vong, trong khi Troponin cao (aOR 5.74), Creatinine tăng (aOR 14.74) và Đái tháo đường (aOR 4.36) là các chỉ số tiên lượng nặng then chốt.",
    "keyRecommendations": [
      "Rối loạn điện giải lúc nhập viện (Hạ Natri máu 29.3%, Hạ Kali máu 23.2%) không phải là yếu tố dự báo độc lập về kéo dài thời gian nằm viện (≥ 3 ngày) hoặc tử vong ở bệnh nhân Dengue người lớn (p > 0.05), do hiệu quả của việc điều chỉnh dịch truyền và điện giải sớm.",
      "Nồng độ Troponin máu tăng (> 0.04 ng/mL) lúc nhập viện là yếu tố tiên lượng độc lập mạnh mẽ cho việc kéo dài thời gian nằm viện trên 3 ngày (aOR = 5.74; 95% CI: 2.34–14.11, p < 0.001), phản ảnh tình trạng tổn thương cơ tim do Dengue.",
      "Nồng độ Creatinine máu tăng (> 1.3 mg/dL) lúc nhập viện gia tăng nguy cơ tử vong trong bệnh viện gấp 14.7 lần (aOR = 14.74; 95% CI: 4.19–51.85, p < 0.001), khẳng định tổn thương thận cấp (AKI) là biến chứng đe dọa tính mạng hàng đầu.",
      "Tiền sử Đái tháo đường (DM) làm tăng nguy cơ tử vong trong bệnh viện lên 4.36 lần (aOR = 4.36; 95% CI: 1.21–15.74, p = 0.024), đòi hỏi chiến lược theo dõi huyết động và kiểm soát đường huyết chặt chẽ ở nhóm bệnh nhân có bệnh nền này."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Bối Cảnh Nghiên Cứu, Thiết Kế PICO & Tần Suất Rối Loạn Điện Giải",
        "icon": "fa-solid fa-microscope"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Đặc Điểm Nhân Khẩu Học, Lâm Sàng & Xét Nghiệm Lúc Nhập Viện (N = 1,008)",
        "icon": "fa-solid fa-vial-circle-check"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phân Tích Đa Biến Dự Báo Thời Gian Nằm Viện Kéo Dài (LOS ≥ 3 Ngày)",
        "icon": "fa-solid fa-clock"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phân Tích Đa Biến Yếu Tố Tiên Lượng Tử Vong Trong Bệnh Viện",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Bàn Luận Bệnh Sinh, Thẩm Định Thang Điểm RoB & Trích Dẫn Y Văn Chuẩn AMA",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-10-26"
  },
  {
    "id": "2018-fukui-refractory-ascites-management",
    "slug": "2018-fukui-refractory-ascites-management",
    "code": "GDL-2018-DOVE-REFRACTORY-ASCITES",
    "title": "Quản Lý Cổ Trướng Kháng Trị Trong Xơ Gan: Thách Thức & Giải Pháp Cập Nhật",
    "titleEn": "Management of Refractory Cirrhotic Ascites: Challenges and Solutions",
    "journal": "Hepatic Medicine: Evidence and Research",
    "organization": "Nara Medical University & Dove Medical Press",
    "year": 2018,
    "file": "2018-fukui-refractory-ascites-management.mdx",
    "specialty": "gi",
    "specialty2": "icu",
    "conditionKey": "refractory-ascites",
    "problemLabels": [
      "cirrhosis-refractory-ascites",
      "lvp-albumin",
      "tips-vs-paracentesis",
      "tolvaptan"
    ],
    "icd10": [
      "R18",
      "K70.3",
      "K74.6"
    ],
    "design": "clinical-review",
    "centerScope": "multicenter-intl",
    "sampleSize": null,
    "asianData": true,
    "populationTags": [
      "decompensated-cirrhosis",
      "asian-cohort"
    ],
    "population": "Bệnh nhân xơ gan tiến triển có biến chứng cổ trướng trơ / cổ trướng kháng trị (diuretic-resistant & diuretic-intractable ascites)",
    "interventionClass": "hepatology-portal",
    "drug": "Spironolactone, Furosemide, Albumin, Midodrine, Clonidine, Terlipressin, Tolvaptan, Propranolol, Rifaximin, Norfloxacin",
    "intervention": "Rút dịch ổ bụng lượng lớn (LVP) + Albumin, TIPS phủ ePTFE, CART, alfapump, PVS, Co mạch (Midodrine, Terlipressin), V2 antagonist (Tolvaptan), điều chỉnh gut dysbiosis",
    "comparatorType": "diuretics-alone",
    "primaryEndpointCategory": "organ-protection",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "robOverall": "not-applicable",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "xo-gan",
      "co-truong-khang-tri",
      "albumin-tips"
    ],
    "tags": [
      "Dovepress",
      "2018",
      "Tiêu hóa - Gan mật",
      "Cổ trướng kháng trị",
      "Xơ gan mất bù",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "description": "Tổng quan hệ thống y văn về tiêu chuẩn chẩn đoán, sinh lý bệnh và chiến lược đa mô thức trong quản lý cổ trướng kháng trị do xơ gan.",
    "keyRecommendations": [
      "Thực hiện Rút dịch ổ bụng lượng lớn (LVP) kết hợp truyền Albumin tĩnh mạch (8 g/L dịch rút ra đối với LVP > 5 L) là lựa chọn can thiệp hàng đầu (First-line) để giảm áp lực ổ bụng và cải thiện hô hấp.",
      "Chỉ định Đặt xông thông tĩnh mạch cửa - tĩnh mạch chủ qua da (TIPS) bằng stent phủ ePTFE (8–10 mm) cho bệnh nhân cần LVP > 2–3 lần/tháng nhằm nâng cao tỷ lệ sống không cần ghép gan (LT-free survival).",
      "Cân nhắc phối hợp thuốc co mạch hệ thống (Midodrine 7.5 mg × 3 lần/ngày p.o.) hoặc Clonidine để tăng thể tích tuần hoàn hiệu dụng và khôi phục độ nhạy cảm với thuốc lợi tiểu trước khi can thiệp thủ thuật.",
      "Tạm ngưng hoặc hạ liều Thuốc chẹn beta không chọn lọc (NSBBs như Propranolol) khi xuất hiện Huyết áp tâm thu < 90 mmHg, Natri máu < 130 mEq/L hoặc Tổn thương thận cấp (AKI) theo Khung Cửa Sổ (Window Hypothesis)."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Định Nghĩa, Dịch Tễ & Sinh Lý Bệnh Cổ Trướng Kháng Trị",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Tiêu Chuẩn Chẩn Đoán, Phân Loại & Thang Điểm Lượng Giá",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Chiến Lược Điều Trị Dược Lý & Tối Ưu Hóa Thuốc Hệ Thống",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Lưu Đồ Thuật Toán Can Thiệp Thủ Thuật & LVP / TIPS / CART",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Biến Chứng Nguy Kịch, Rối Loạn Vi Khuẩn Ruột & Dân Số Đặc Biệt",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Ma Trận Bằng Chứng GRADE, Tiên Lượng & Tài Liệu Tham Khảo",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-10-24"
  },
  {
    "id": "2017-infection-nlr-mlr-fever",
    "slug": "2017-infection-nlr-mlr-fever",
    "code": "STUDY-2017-INFECTION-NLR-MLR",
    "title": "Infection 2017: Vai Trò Của Tỷ Lệ Neutrophil/Lympho (NLR) & Monocyte/Lympho (MLR) Trong Chẩn Đoán Phân Biệt Sốt Do Nhiễm Trùng & Không Nhiễm Trùng",
    "titleEn": "Role of neutrophil to lymphocyte and monocyte to lymphocyte ratios in the diagnosis of bacterial infection in patients with fever",
    "journal": "Infection. 2017;45(3):299-307. doi:10.1007/s15010-016-0972-1",
    "organization": "Infection / Haukeland University Hospital",
    "year": 2017,
    "doi": "10.1007/s15010-016-0972-1",
    "file": "2017-infection-nlr-mlr-fever.mdx",
    "specialty": "infect",
    "specialty2": "icu",
    "conditionKey": "sepsis",
    "problemLabels": [
      "acute-fever-triage",
      "nlr-mlr-biomarker",
      "bacterial-vs-noninfectious"
    ],
    "icd10": [
      "R50.9",
      "A41.9",
      "B34.9"
    ],
    "design": "diagnostic-accuracy",
    "phase": "Prospective Observational Cohort Study",
    "centerScope": "single-center",
    "sampleSize": null,
    "asianData": false,
    "populationTags": [
      "hospitalized-fever",
      "ed-adults"
    ],
    "population": "299 bệnh nhân người lớn nhập viện vì sốt chưa rõ nguyên nhân tại Bệnh viện Đại học Haukeland, Bergen, Na Uy.",
    "interventionClass": "biomarker-diagnostics",
    "drug": "NLR (Neutrophil-to-Lymphocyte Ratio), MLR (Monocyte-to-Lymphocyte Ratio), Complete Blood Count",
    "intervention": "Trích xuất và tính toán tỷ số NLR và MLR từ công thức máu cơ bản lúc nhập viện để phân biệt nhiễm vi khuẩn, nhiễm vi rút và bệnh phi nhiễm trùng ở bệnh nhân sốt.",
    "comparatorType": "crp-wbc-standard",
    "primaryEndpointCategory": "diagnostic-performance",
    "primaryEndpoint": "Độ chính xác chẩn đoán nhiễm khuẩn (AUROC), phát hiện nhiễm trùng huyết (septicemia) và tương tác với thời gian sốt trước nhập viện (< 7 ngày).",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "NLR vi khuẩn median 7.94 vs không nhiễm trùng 3.78 vs vi rút 0.63 (p < 0.001) | Septicemia có NLR vọt lên 15.69 vs 8.42 ở sốt < 7 ngày (p = 0.006) trong khi WBC (p = 0.559) và CRP (p = 0.615) thất bại hoàn toàn | Giảm lympho bào máu cấp tính (median 0.7 vs 1.3 × 10⁹/L, p < 0.001) là cơ chế cốt lõi | AUC NLR = 0.708, MLR = 0.688.",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "topicTags": [
      "dau-an-sinh-hoc",
      "nlr-mlr",
      "chan-doan-sot",
      "sepsis"
    ],
    "tags": [
      "Infection 2017",
      "NLR",
      "MLR",
      "Sốt Chưa Rõ Nguyên Nhân",
      "Nhiễm Khuẩn Huyết",
      "Sepsis",
      "Công Thức Máu",
      "Evidence-Based Medicine"
    ],
    "summary": "Nghiên cứu của Nilssen và cộng sự (Infection 2017) chứng minh NLR và MLR từ công thức máu thông thường phân biệt hiệu quả nhiễm vi khuẩn với nhiễm vi rút và phi nhiễm trùng. Đặc biệt, NLR nhận diện nhạy bén bệnh nhân nhiễm trùng huyết (septicemia) ở giai đoạn sốt < 7 ngày khi cả tổng bạch cầu (WBC) và CRP đều hoàn toàn thất bại.",
    "detailedConclusion": "Không bao giờ được phép chỉ nhìn vào WBC hay CRP đơn thuần khi tiếp cận bệnh nhân sốt cấp tính. Tỷ lệ NLR > 13–15 ở bệnh nhân sốt < 7 ngày là cờ đỏ báo động nhiễm trùng huyết cần cấy máu và dùng kháng sinh sớm; trong khi NLR < 1.0 và MLR < 0.20 gợi ý mạnh mẽ căn nguyên vi rút để tránh lạm dụng kháng sinh.",
    "description": "Nghiên cứu quan sát trên 299 bệnh nhân sốt nhập viện tại Đại học Haukeland (Na Uy): NLR và MLR phân biệt vượt trội nhiễm khuẩn vs nhiễm vi rút/phi nhiễm trùng, đặc biệt NLR nhận diện nhạy bén nhiễm trùng huyết (septicemia) khi tổng bạch cầu (WBC) và CRP hoàn toàn thất bại.",
    "keyRecommendations": [
      "NLR và MLR ở nhóm nhiễm khuẩn cao hơn rõ rệt so với không nhiễm trùng (NLR trung vị 7.94 vs 3.78, p < 0.001; MLR 0.70 vs 0.35, p < 0.001); nhóm vi rút giảm sâu nhất (NLR 0.63, MLR 0.14).",
      "NLR nhận diện nhiễm trùng huyết (septicemia) vượt trội với trung vị 15.69 vs 8.42 (p = 0.006), trong khi tổng bạch cầu (WBC 11.4 vs 13.1, p = 0.559) và CRP (125.5 vs 135.0, p = 0.615) hoàn toàn thất bại không phân biệt được.",
      "Cơ chế cốt lõi là tình trạng giảm lympho bào máu ngoại vi nghiêm trọng trong nhiễm trùng huyết (Lymphocytes trung vị 0.7 vs 1.3 × 10⁹/L, p < 0.001).",
      "Thời gian sốt < 7 ngày trước nhập viện có sức mạnh dự báo cao nhất; tương tác có ý nghĩa thống kê giữa NLR/MLR và thời gian sốt (p = 0.005 cho NLR, p = 0.001 cho MLR)."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-tongquan",
        "number": 1,
        "title": "Thông Tin Nghiên Cứu, Tóm Tắt Một Câu & Khung PICO",
        "icon": "fa-solid fa-file-contract"
      },
      {
        "id": "sec-sinhly-benhsinh",
        "number": 2,
        "title": "Cơ Sở Sinh Lý & Miễn Dịch Học Đáp Ứng Tế Bào Máu",
        "icon": "fa-solid fa-microscope"
      },
      {
        "id": "sec-diem-nghen",
        "number": 3,
        "title": "Bối Cảnh Y Học & Ma Trận Điểm Nghẽn Lâm Sàng",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-thietke-mau",
        "number": 4,
        "title": "Thiết Kế Mẫu, Thu Thập Dữ Liệu & Phân Tích Thống Kê",
        "icon": "fa-solid fa-flask-vial"
      },
      {
        "id": "sec-so-sanh-nlr-mlr",
        "number": 5,
        "title": "So Sánh NLR & MLR Giữa Các Nhóm Bệnh Lý (Table 1)",
        "icon": "fa-solid fa-chart-simple"
      },
      {
        "id": "sec-tuong-quan-fig1",
        "number": 6,
        "title": "Mối Tương Quan NLR - MLR & Biểu Đồ Phân Tán (Figure 1)",
        "icon": "fa-solid fa-chart-line"
      },
      {
        "id": "sec-thoi-gian-sot",
        "number": 7,
        "title": "Tác Động Của Thời Gian Sốt & Cửa Sổ < 7 Ngày (Table 2)",
        "icon": "fa-solid fa-clock"
      },
      {
        "id": "sec-septicemia-table3",
        "number": 8,
        "title": "Khả Năng Nhận Diện Nhiễm Trùng Huyết Vượt Trội (Table 3)",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-hoi-quy-nlr",
        "number": 9,
        "title": "Mô Hình Hồi Quy Đa Thức Đa Biến Của NLR (Table 4)",
        "icon": "fa-solid fa-calculator"
      },
      {
        "id": "sec-hoi-quy-mlr",
        "number": 10,
        "title": "Mô Hình Hồi Quy Đa Thức Đa Biến Của MLR (Table 5)",
        "icon": "fa-solid fa-square-root-variable"
      },
      {
        "id": "sec-xac-suat-fig23",
        "number": 11,
        "title": "Đồ Thị Dự Báo Xác Suất Lâm Sàng (Figures 2 & 3)",
        "icon": "fa-solid fa-chart-area"
      },
      {
        "id": "sec-roc-fig4",
        "number": 12,
        "title": "Phân Tích Đường Cong ROC & Diện Tích AUC (Figure 4)",
        "icon": "fa-solid fa-chart-pie"
      },
      {
        "id": "sec-doi-chieu-gurol",
        "number": 13,
        "title": "Đối Chiếu Nghiên Cứu Quốc Tế & Ngưỡng Cắt Gürol et al.",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-luodo-thuat-toan",
        "number": 14,
        "title": "Lưu Đồ Cây Quyết Định Xử Trí Kháng Sinh Ban Đầu",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-rob-appraisal",
        "number": 15,
        "title": "Thẩm Định Phương Pháp Luận & Hạn Chế Thừa Nhận",
        "icon": "fa-solid fa-shield-halved"
      },
      {
        "id": "sec-phan-quyet-pearls",
        "number": 16,
        "title": "Phán Quyết Lâm Sàng, Hạt Ngọc Thực Chiến & Y Văn AMA",
        "icon": "fa-solid fa-gavel"
      }
    ],
    "updatedAt": "2026-10-10"
  },
  {
    "id": "2015-nejm-empareg-outcome",
    "slug": "2015-nejm-empareg-outcome",
    "code": "GDL-2015-NEJM-EMPAREG-OUTCOME",
    "trialAcronym": "EMPA-REG OUTCOME",
    "title": "EMPA-REG OUTCOME: Thử nghiệm lâm sàng Empagliflozin trên biến cố tim mạch ở BN ĐTĐ típ 2",
    "titleEn": "Empagliflozin, Cardiovascular Outcomes, and Mortality in Type 2 Diabetes",
    "journal": "N Engl J Med",
    "organization": "Boehringer Ingelheim & Eli Lilly / NEJM",
    "year": 2015,
    "doi": "10.1056/NEJMoa1504720",
    "nctId": "NCT01131676",
    "sourceUrl": "https://www.nejm.org/doi/pdf/10.1056/NEJMoa1504720",
    "file": "2015-nejm-empareg-outcome.mdx",
    "specialty": "cardio",
    "conditionKey": "heart-failure",
    "problemLabels": [
      "t2dm-ascvd",
      "cardiovascular-mortality",
      "heart-failure-hospitalization"
    ],
    "icd10": [
      "E11",
      "I50",
      "I25"
    ],
    "design": "rct",
    "phase": "Phase III",
    "blinding": "double-blind",
    "centerScope": "multicenter-intl",
    "hypothesisType": "superiority",
    "sampleSize": 7020,
    "followUpDuration": "3.1 năm",
    "asianData": true,
    "populationTags": [
      "t2dm",
      "established-ascvd",
      "adults"
    ],
    "population": "Bệnh nhân trưởng thành (≥18 tuổi) bị đái tháo đường típ 2, có chỉ số khối cơ thể (BMI) ≤ 45, mức lọc cầu thận ước tính (eGFR) ≥ 30 mL/phút/1.73 m² và có bệnh lý tim mạch ổn định đã được xác định.",
    "interventionClass": "sglt2i",
    "drug": "Empagliflozin",
    "intervention": "Empagliflozin 10mg hoặc 25mg/ngày vs Placebo trên nền điều trị chuẩn",
    "comparatorType": "placebo",
    "primaryEndpointCategory": "mace",
    "primaryEndpoint": "3-point MACE (Tử vong do tim mạch, nhồi máu cơ tim không tử vong, đột quỵ không tử vong)",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "keyResults": "Giảm 14% 3-point MACE (HR 0.86, p=0.04), giảm 38% tử vong tim mạch (HR 0.62, p<0.001), giảm 35% nhập viện vì suy tim (HR 0.65, p=0.002).",
    "primaryMetric": {
      "measure": "HR",
      "interventionRate": "10.5% (490/4687)",
      "controlRate": "12.1% (282/2333)",
      "effectEstimate": 0.86,
      "ciLower": 0.74,
      "ciUpper": 0.99,
      "pValue": "0.04",
      "nnt": 62
    },
    "safetyHighlight": "Tăng nhiễm nấm sinh dục; không tăng hạ đường huyết hay DKA có ý nghĩa ở liều chuẩn",
    "robOverall": "low",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "fundingSource": "industry-pharma",
    "topicTags": [
      "sglt2i",
      "bao-ve-tim-than",
      "du-phong-thu-phat"
    ],
    "tags": [
      "NEJM",
      "2015",
      "Khuyến cáo lâm sàng",
      "Evidence-Based Medicine"
    ],
    "summary": "Cột mốc lịch sử mở ra kỷ nguyên SGLT2i trong bảo vệ tim mạch - thận bất kể tình trạng kiểm soát đường huyết.",
    "detailedConclusion": "SGLT2i là trụ cột bắt buộc ở bệnh nhân ĐTĐ típ 2 kèm bệnh tim mạch xơ vữa hoặc suy tim nhằm giảm tử vong và nhập viện.",
    "description": "EMPA-REG OUTCOME (NEJM 2015) — Nghiên cứu RCT landmark về Empagliflozin ở bệnh nhân đái tháo đường tuýp 2 có nguy cơ tim mạch cao: HR 0.86 (3-point MACE), giảm 38% tử vong tim mạch, 35% nhập viện suy tim và 32% tử vong mọi nguyên nhân.",
    "keyRecommendations": [
      "Empagliflozin làm giảm 14% tiêu chí chính 3-point MACE (HR 0.86; 95% CI 0.74–0.99; P = 0.04 cho tính vượt trội).",
      "Giảm ngoạn mục 38% tử vong do nguyên nhân tim mạch (HR 0.62; 95% CI 0.49–0.77; P < 0.001; NNT = 46 sau 3.1 năm).",
      "Giảm 35% nguy cơ nhập viện do suy tim (HR 0.65; 95% CI 0.50–0.85; P = 0.002; NNT = 71) xuất hiện rất sớm sau khởi trị.",
      "Giảm 32% tử vong do mọi nguyên nhân (HR 0.68; 95% CI 0.57–0.82; P < 0.001; NNT = 39) với hồ sơ an toàn tốt."
    ],
    "clinicalPearls": [],
    "subgroups": {
      "Tử vong do tim mạch": "COL: Nhóm Can thiệp: 3.7% | Nhóm Placebo: 5.9% (HR 0.62, 95% CI 0.49-0.77, p<0.001)",
      "Nhập viện do suy tim": "HBAR: Nhóm Can thiệp: 2.7% | Nhóm Placebo: 4.1% (HR 0.65, 95% CI 0.50-0.85, p=0.002)",
      "Tử vong do mọi nguyên nhân": "COL: Nhóm Can thiệp: 5.7% | Nhóm Placebo: 8.3% (HR 0.68, 95% CI 0.57-0.82, p<0.001)"
    },
    "sections": [
      {
        "id": "sec-pico",
        "number": 1,
        "title": "PICO &amp; Thiết kế",
        "icon": "fa-solid fa-stethoscope"
      },
      {
        "id": "sec-mechanism",
        "number": 2,
        "title": "Cơ chế Sinh lý SGLT2i",
        "icon": "fa-solid fa-vials"
      },
      {
        "id": "sec-primary",
        "number": 3,
        "title": "Kết cục Tim mạch (Fig 1 &amp; Tab 1)",
        "icon": "fa-solid fa-pills"
      },
      {
        "id": "sec-subgroup",
        "number": 4,
        "title": "Phân tích Phân nhóm (Fig 2)",
        "icon": "fa-solid fa-heart-pulse"
      },
      {
        "id": "sec-hba1c",
        "number": 5,
        "title": "Diễn tiến HbA1c (Fig 3)",
        "icon": "fa-solid fa-triangle-exclamation"
      },
      {
        "id": "sec-safety",
        "number": 6,
        "title": "An toàn &amp; Biến cố (Tab 2)",
        "icon": "fa-solid fa-shield-virus"
      },
      {
        "id": "sec-citation",
        "number": 7,
        "title": "Trích dẫn &amp; Liên kết",
        "icon": "fa-solid fa-book-bookmark"
      }
    ],
    "updatedAt": "2026-08-28"
  },
  {
    "id": "2014-ajr-nang-gan",
    "slug": "2014-ajr-nang-gan",
    "code": "REV-2014-AJR-CYSTIC-HEPATIC-LESIONS",
    "title": "AJR 2014: Tổng Quan & Tiếp Cận Chẩn Đoán Hệ Thống Tổn Thương Nang Gan (Cystic Hepatic Lesions)",
    "titleEn": "Cystic Hepatic Lesions: A Review and an Algorithmic Approach (American Journal of Roentgenology)",
    "journal": "American Journal of Roentgenology (AJR)",
    "organization": "American Journal of Roentgenology (AJR)",
    "year": 2014,
    "sourceUrl": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5504840/pdf/13017_2017_Article_141.pdf",
    "file": "2014-ajr-nang-gan.mdx",
    "specialty": "gi",
    "conditionKey": "cystic-hepatic-lesions",
    "problemLabels": [
      "hepatic-cyst-differential",
      "ct-mri-ultrasound-features",
      "biliary-cystadenoma"
    ],
    "icd10": [
      "K76.8",
      "K76.9",
      "Q44.6",
      "K75.0",
      "B67.0",
      "D13.4",
      "C22.0",
      "C22.1"
    ],
    "design": "diagnostic-accuracy",
    "centerScope": "multicenter-intl",
    "sampleSize": 4553,
    "asianData": false,
    "populationTags": [
      "incidental-or-symptomatic-liver-cyst"
    ],
    "population": "Bệnh nhân có các tổn thương dạng nang ở gan phát hiện tình cờ hoặc qua các biểu hiện triệu chứng lâm sàng.",
    "interventionClass": "biomarker-diagnostics",
    "drug": "Sclerotherapy agents, Metronidazole, Antiparasitic agents, Antifungal agents, Gadoxetate disodium, Gadolinium",
    "intervention": "Phân loại hệ thống 4 nhóm sinh bệnh học (Phát triển bẩm sinh, Viêm nhiễm trùng, Tân sản, Chấn thương/can thiệp); Chi tiết 14 thực thể nang gan; Tích hợp 16 hình ảnh ca lâm sàng thực tế và sơ đồ thuật toán tiếp cận phân tầng (Fig. 16); Nhận diện các dấu hiệu hình ảnh kinh điển: Dấu hiệu chấm trung tâm (Central dot sign trong Bệnh Caroli), Dấu hiệu mục tiêu kép (Double-target sign trong Áp xe vi khuẩn), Nang con ngoại vi (Daughter cysts trong Nang sán chó), Mắt bò (Bull's eye trong Vi áp xe nấm), Mô đệm kiểu buồng trứng (BCA/BCAC) và Ung thư biểu mô tế bào gan thể nang (Cystic HCC) trên nền gan xơ.",
    "comparatorType": "histopathology-gold-standard",
    "primaryEndpointCategory": "diagnostic-performance",
    "primaryEndpoint": "Thiết lập lưu đồ thuật toán chẩn đoán hệ thống phân tầng tổn thương nang gan dựa trên số lượng, hình thái cấu trúc (đơn thuần vs phức tạp) và tính chất ngấm thuốc để định hướng xử trí ngoại khoa và can thiệp chính xác.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "keyResults": "Nang đơn thuần và PLD chẩn đoán tự tin bằng siêu âm | Bệnh Caroli khẳng định bằng Central dot sign | Áp xe vi khuẩn có Double-target sign | Nang sán chó có Daughter cysts | U tuyến nang đường mật (BCA) hóa ác 20% cần cắt trọn u | Cystic HCC có thành phần đặc ngấm thuốc động mạch và thải thuốc tĩnh mạch | Lưu đồ Fig. 16 phân tầng logic 100% ca nang gan.",
    "robOverall": "not-applicable",
    "gradeCertainty": "high",
    "fragilityIndex": null,
    "topicTags": [
      "chan-doan-hinh-anh",
      "nang-gan",
      "gan-mat"
    ],
    "tags": [
      "AJR",
      "2014",
      "Nang gan",
      "Cystic liver lesions",
      "Caroli",
      "Áp xe gan",
      "Nang sán chó",
      "BCA",
      "BCAC",
      "Cystic HCC",
      "Chẩn đoán hình ảnh",
      "Evidence-Based Medicine"
    ],
    "summary": "Nghiên cứu tổng quan y khoa kinh điển của AJR (Borhani et al., 2014): Tích hợp 16 hình ảnh phim chụp CT/MRI/Siêu âm thực tế, bảng phân loại 14 bệnh lý gan mật và tái hiện trực quan lưu đồ thuật toán phân tầng (Fig. 16) chuẩn chuyên ngành y khoa.",
    "detailedConclusion": "Bác sĩ chẩn đoán hình ảnh và ngoại tiêu hóa tiếp cận nang gan theo 3 bước: đếm số lượng tổn thương, đánh giá cấu trúc nang (đơn thuần hay phức tạp) và tìm kiếm thành phần ngấm thuốc. Chỉ định cắt trọn u cho BCA/BCAC; phân biệt Cystic HCC trên nền gan xơ với áp xe gan.",
    "description": "Tổng quan y khoa kinh điển và lưu đồ tiếp cận chẩn đoán hệ thống các tổn thương dạng nang ở gan công bố trên American Journal of Roentgenology (AJR 2014): Phân loại sinh bệnh học 4 nhóm lớn (Phát triển, Viêm, Tân sản, Chấn thương/can thiệp); Chi tiết 14 thực thể bệnh lý gan mật; Tích hợp đầy đủ 16 hình ảnh phim chụp CT/MRI/Siêu âm thực tế; Tái hiện trực quan lưu đồ thuật toán phân tầng (Fig. 16); Nhận diện các dấu hiệu hình ảnh kinh điển (Central dot sign, Double-target, Daughter cysts, Bull's eye, Ovarian-type stroma) và các tổn thương giả nang cần phân biệt.",
    "keyRecommendations": [
      "Phân loại tiếp cận hệ thống dựa trên 3 tiêu chí cốt lõi: Số lượng tổn thương (1-10 nang vs > 10 nang), Cấu trúc hình thái (Đơn thuần vs Phức tạp: thành dày, vách ngăn, nốt sùi) và Sự hiện diện của thành phần ngấm thuốc mạch máu sau tiêm.",
      "Tổn thương phát triển bẩm sinh: Nang đơn thuần và bệnh gan đa nang (PLD) chẩn đoán tự tin bằng siêu âm; Bệnh Caroli nhận diện bằng 'Dấu hiệu chấm trung tâm' (Central dot sign - nhánh tĩnh mạch cửa chạy xuyên tâm nang); Hamartoma đường mật (von Meyenburg) là vô số nang nhỏ < 15mm không thông với đường mật.",
      "Tổn thương viêm & nhiễm trùng: Áp xe vi khuẩn thể hiện 'Dấu hiệu mục tiêu kép' (Double-target sign) viền phù nề quanh thành áp xe; Áp xe amip thường đơn độc thùy phải, kích thước > 10cm cần dẫn lưu; Nang sán chó (Hydatid cyst) đặc trưng bởi các nang con ở ngoại vi và vôi hóa viền; Vi áp xe nấm (Candida) có dấu hiệu 'Mắt bò' (Bull's eye) hoặc 'Bánh xe trong bánh xe'.",
      "Tổn thương tân sản dạng nang nguy hiểm: U tuyến nang đường mật (BCA - 90% ở nữ trung niên, chứa mô đệm buồng trứng) và Ung thư tuyến nang (BCAC - nốt sùi ngấm thuốc mạnh) bắt buộc phẫu thuật cắt trọn khối u; Thể nang hoại tử của ung thư biểu mô tế bào gan (Cystic HCC) dễ nhầm với áp xe gan; Nang di căn từ u nội tiết (NET), GIST hoặc ung thư biểu mô tuyến nhầy.",
      "Nhận diện nghịch lý hình ảnh và các tổn thương giả nang: Sarcoma phôi thai chưa biệt hóa (UES) ở trẻ em có nghịch lý 'dạng nang trên CT/MRI nhưng là u đặc trên siêu âm'; Phình mạch giả gan (Pseudoaneurysm) chẩn đoán bằng dấu hiệu dòng xoáy âm dương (Yin-yang sign) trên siêu âm Doppler màu."
    ],
    "clinicalPearls": [],
    "sections": [
      {
        "id": "sec-dat-van-de-phan-loai",
        "number": 1,
        "title": "Đặt Vấn Đề, Nguyên Tắc Tiếp Cận Hình Ảnh & Bảng Tổng Quan 14 Bệnh Lý (Table 1)",
        "icon": "fa-solid fa-list-check"
      },
      {
        "id": "sec-ton-thuong-phat-trien",
        "number": 2,
        "title": "Nhóm Tổn Thương Phát Triển: Nang Đơn Thuần, Hamartoma, Caroli, PLD & Nang Ruột Trước (Fig 1-5)",
        "icon": "fa-solid fa-dna"
      },
      {
        "id": "sec-ton-thuong-viem-nhiem",
        "number": 3,
        "title": "Nhóm Tổn Thương Viêm & Nhiễm Trùng: Áp Xe Vi Khuẩn, Amip, Nang Sán Chó & Nấm (Fig 6-9)",
        "icon": "fa-solid fa-bacterium"
      },
      {
        "id": "sec-chan-thuong-va-sau-mo",
        "number": 4,
        "title": "Tổn Thương Do Chấn Thương Hoặc Can Thiệp: Biloma, Seroma, Hematoma & Nang Giả Tụy (Fig 14)",
        "icon": "fa-solid fa-user-injured"
      },
      {
        "id": "sec-luu-do-thuat-toan-fig16",
        "number": 5,
        "title": "Lưu Đồ Thuật Toán Chẩn Đoán Phân Tầng Hệ Thống (Fig. 16) - Thiết Kế Trực Quan",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-ton-thuong-tan-san",
        "number": 6,
        "title": "Nhóm Tổn Thương Tân Sản: U Tuyến Nang (BCA/BCAC), Cystic HCC & Di Căn Nang (Fig 10-12)",
        "icon": "fa-solid fa-ribbon"
      },
      {
        "id": "sec-ton-thuong-khac-va-gia-nang",
        "number": 7,
        "title": "Nhóm Tổn Thương Khác & Giả Nang: Nang Quanh Mật, UES Trẻ Em, Phình Mạch Giả (Fig 13, 15)",
        "icon": "fa-solid fa-clone"
      },
      {
        "id": "sec-cheat-sheet-mcq",
        "number": 8,
        "title": "Cheat-Sheet Dấu Hiệu Hình Ảnh Mấu Chốt, 5 Câu Hỏi Trắc Nghiệm & Tài Liệu AMA",
        "icon": "fa-solid fa-book-medical"
      }
    ],
    "updatedAt": "2026-09-03"
  }
];

export const KHO_RESEARCH_SLUG_SET: Set<string> = new Set(
  KHO_RESEARCH_STATIC.map((item) => item.slug)
);

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__CLINIPORTAL_RESEARCH_SLUGS__ = KHO_RESEARCH_SLUG_SET;
}
