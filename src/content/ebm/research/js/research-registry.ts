/**
 * CliniPortal 2.0 — CliniResearch Studio Static Registry
 * Path: src/content/ebm/research/js/research-registry.ts
 *
 * AUTO-GENERATED FROM MDX FRONTMATTER (Single Source of Truth)
 * Total Research Studies: 3
 * DO NOT EDIT MANUALLY — Run: npm run sync:research
 */

import type { ResearchStudyRecord } from './research-types';

export const KHO_RESEARCH_STATIC: ResearchStudyRecord[] = [
  {
    "id": "2024-scirep-crp-pct-saa-bioscore-trauma-sepsis",
    "slug": "2024-scirep-crp-pct-saa-bioscore-trauma-sepsis",
    "code": "STUDY-2024-SCIREP-BIOSCORE-SEPSIS",
    "trialAcronym": "BIOSCORE TRAUMA",
    "title": "Scientific Reports 2024: Bảng Chỉ Dấu Sinh Học Đa Thông Số CRP, PCT & SAA (Bioscore) Dự Báo Sớm Nhiễm Khuẩn Huyết Sau Chấn Thương Nặng",
    "titleEn": "A biomarker panel of C-reactive protein, procalcitonin and serum amyloid A is a predictor of sepsis in severe trauma patients",
    "authors": "M. Li, Y. J. Qin, X. L. Zhang, C. H. Zhang, R. J. Ci, W. Chen, D. Z. Hu, S. M. Dong",
    "journal": "Sci Rep",
    "organization": "Scientific Reports / Third Hospital of Hebei Medical University (Trung Quốc)",
    "year": 2024,
    "doi": "10.1038/s41598-024-51414-y",
    "sourceUrl": "https://doi.org/10.1038/s41598-024-51414-y",
    "file": "2024-scirep-crp-pct-saa-bioscore-trauma-sepsis.mdx",
    "specialty": "icu",
    "specialty2": "infect",
    "conditionKey": "sepsis",
    "problemLabels": [
      "post-traumatic-sepsis",
      "multimarker-bioscore",
      "sterile-sirs-vs-sepsis",
      "bacterial-vs-noninfectious",
      "mortality"
    ],
    "icd10": [
      "A41.9",
      "T07",
      "R65.20"
    ],
    "design": "diagnostic-accuracy",
    "phase": "Prospective Observational Diagnostic Cohort",
    "blinding": "open-label",
    "centerScope": "single-center",
    "hypothesisType": "diagnostic-discrimination",
    "sampleSize": 100,
    "followUpDuration": "16 tháng thu tuyển (08/2021–11/2022) • Lấy máu 8 giờ sáng hằng ngày (5 mốc cắt ngang)",
    "asianData": true,
    "populationTags": [
      "icu-adults",
      "severe-trauma",
      "asian-cohort",
      "adults"
    ],
    "population": "100 bệnh nhân đa chấn thương nặng người lớn (≥ 18 tuổi, ISS ≥ 16) nhập Khoa Hồi sức Tích cực Cấp cứu (EICU) Bệnh viện Số 3, Đại học Y Hà Bắc (Trung Quốc); loại trừ thai kỳ, dùng corticoid/ức chế miễn dịch mạn, ngưng tuần hoàn và DNR. Gồm 52 ca nhiễm khuẩn huyết xác nhận vi khuẩn theo Sepsis-3 và 48 ca đối chứng.",
    "interventionClass": "biomarker-diagnostics",
    "drug": "Bioscore (SAA + CRP + PCT), Interleukin-6 (IL-6), POCT Immunofluorescence / ELISA",
    "intervention": "Định lượng đồng thời huyết tương 4 chỉ dấu (SAA, CRP, PCT, IL-6) bằng miễn dịch huỳnh quang khô/ELISA tại 5 mốc cắt ngang và xây dựng thuật toán đa biến Bioscore = -4.760 + 0.007 × SAA + 0.004 × CRP + 0.102 × PCT (chuyển đổi xác suất logistic, ngưỡng cắt 0.28).",
    "comparatorType": "crp-wbc-standard",
    "primaryEndpointCategory": "diagnostic-performance",
    "primaryEndpoint": "Hiệu năng phân định chẩn đoán sớm nhiễm khuẩn huyết sau chấn thương (ROC AUC, độ nhạy, độ đặc hiệu) và giá trị dự báo độc lập trong hồi quy đa biến (so với từng chỉ dấu đơn lẻ CRP, PCT, SAA, IL-6 và thang điểm ISS, SOFA, APACHE II).",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "Bioscore (SAA + CRP + PCT) đạt AUC 0.89 (95% CI 0.82–0.95; P < 0.001), cut-off 0.28 cho độ nhạy 77% & độ đặc hiệu 90% — vượt trội hoàn toàn từng chỉ dấu đơn lẻ: CRP (AUC 0.82; cut-off 270.84 mg/L; Sens 71% / Spec 90%), PCT (AUC 0.77; cut-off 7.27 ng/mL; Sens 60% / Spec 92%), SAA (AUC 0.75; cut-off 319.70 mg/L; Sens 79% / Spec 73%) và IL-6 (AUC 0.75; bị loại ở đa biến P = 0.238) | 3 yếu tố nguy cơ độc lập duy nhất: Bioscore (OR 3.067; P = 0.021), ISS (OR 1.265; P = 0.004), SOFA (OR 1.184; P = 0.043) | Tử vong nhóm nhiễm khuẩn huyết cao gấp > 2.3 lần (44.2% vs 18.8%; P = 0.006).",
    "primaryMetric": {
      "measure": "AUC",
      "interventionRate": "Bioscore AUC 0.89 (Sens 77% / Spec 90%)",
      "controlRate": "Đơn lẻ: CRP 0.82 • PCT 0.77 • SAA 0.75 • IL-6 0.75",
      "rawDiffText": "AUC Bioscore = 0.89 (95% CI 0.82–0.95; P < 0.001) | aOR Bioscore = 3.067 (95% CI 1.187–7.925; P = 0.021)",
      "pValue": "< 0.001"
    },
    "safetyHighlight": "Cỡ mẫu đơn trung tâm nhỏ (N = 100), phân tích trên 5 mốc cắt ngang cố định và chưa có quần thể thẩm định ngoài; chỉ áp dụng cho quần thể nhiễm khuẩn huyết sau chấn thương nặng (ISS ≥ 16), không tự động ngoại suy sang sepsis nội khoa hay hậu phẫu chương trình.",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
    "topicTags": [
      "dau-an-sinh-hoc",
      "sepsis",
      "da-chan-thuong",
      "bioscore-saa-crp-pct",
      "poct-icu"
    ],
    "tags": [
      "Sci Rep",
      "2024",
      "Bioscore",
      "CRP",
      "PCT",
      "SAA",
      "IL-6",
      "Polytrauma",
      "Sepsis-3",
      "EICU",
      "POCT",
      "Evidence-Based Medicine"
    ],
    "summary": "Nghiên cứu quan sát tiến cứu trên 100 bệnh nhân đa chấn thương nặng (ISS ≥ 16) tại EICU chứng minh mô hình đa chỉ dấu Bioscore (phối hợp SAA, CRP và PCT) đạt AUC 0.89 (độ nhạy 77%, độ đặc hiệu 90% tại ngưỡng 0.28), vượt trội rõ rệt so với từng chỉ dấu đơn lẻ. Trong hồi quy đa biến toàn diện, chỉ có 3 yếu tố dự báo độc lập nhiễm khuẩn huyết sau chấn thương là Bioscore (OR 3.067), ISS (OR 1.265) và SOFA (OR 1.184).",
    "detailedConclusion": "Ở bệnh nhân đa chấn thương nặng (ISS ≥ 16) xuất hiện sốt và đáp ứng viêm tại EICU, không nên dựa vào một chỉ dấu đơn lẻ để phân định SIRS vô khuẩn hay nhiễm khuẩn huyết. Thang điểm phối hợp Bioscore (SAA + CRP + PCT; cut-off 0.28; AUC 0.89; Spec 90%) kết hợp đánh giá ISS và SOFA tạo bằng chứng tin cậy giúp kích hoạt sớm gói điều trị nhiễm khuẩn huyết và kháng sinh phổ rộng mà không chờ 48–72 giờ cấy máu, đồng thời mở ra hướng triển khai POCT trả kết quả trong 30–60 phút tại giường.",
    "description": "Phân tích chuyên sâu nghiên cứu của Li et al. (Scientific Reports 2024, N = 100): Mô hình đa chỉ dấu Bioscore phối hợp SAA + CRP + PCT đạt AUC 0.89 (độ đặc hiệu 90%, OR 3.067) giúp phân biệt sớm nhiễm khuẩn huyết sau đa chấn thương nặng với SIRS vô khuẩn tại EICU.",
    "keyRecommendations": [
      "Mô hình đa chỉ dấu Bioscore = -4.760 + 0.007 × SAA + 0.004 × CRP + 0.102 × PCT (chuyển đổi xác suất logistic, ngưỡng cắt 0.28) đạt AUC 0.89 (95% CI 0.82–0.95; P < 0.001), độ nhạy 77% và độ đặc hiệu 90% trong dự báo sớm nhiễm khuẩn huyết sau chấn thương nặng.",
      "Ba chỉ dấu tạo sức mạnh hiệp đồng bổ trợ: SAA tăng rất nhanh và đạt độ nhạy đơn lẻ cao nhất (79%, cut-off 319.70 mg/L), CRP đạt AUC đơn lẻ cao nhất (0.82, cut-off 270.84 mg/L) và PCT đạt độ đặc hiệu cao nhất (92%, cut-off 7.27 ng/mL); trong khi IL-6 mất ý nghĩa thống kê ở mô hình đa biến (P = 0.238).",
      "Hồi quy logistic đa biến toàn diện xác nhận đúng 3 yếu tố dự báo độc lập: Bioscore (OR 3.067; P = 0.021), ISS (OR 1.265; P = 0.004) và SOFA (OR 1.184; P = 0.043) — chứng minh SOFA vượt trội APACHE II trong tiên lượng sepsis ở quần thể chấn thương.",
      "Nhiễm khuẩn huyết sau đa chấn thương làm tăng vọt tử vong EICU (44.2% vs 18.8%; P = 0.006) và kéo dài gấp gần đôi thời gian nằm ICU (21.0 vs 11.5 ngày; P = 0.002), với ổ nhiễm phổ biến nhất là đường hô hấp (35%) và dòng máu (23%)."
    ],
    "clinicalPearls": [
      "Không tồn tại 'viên đạn thần kỳ' (magic bullet) đơn lẻ ở bệnh nhân đa chấn thương vì bản thân dập mô và tụ máu đã đẩy CRP/PCT tăng nền; phối hợp 3 trục sinh học SAA (nhạy sớm) + CRP (pha cấp toàn thân) + PCT (đặc hiệu vi khuẩn) giúp phá vỡ vùng xám sterile SIRS vs Sepsis.",
      "Nhớ bước chuyển đổi logistic khi tính Bioscore tại giường: giá trị tuyến tính Raw Score = -4.760 + 0.007(SAA) + 0.004(CRP) + 0.102(PCT) phải quy đổi sang xác suất P = 1 / (1 + e^(-Raw Score)) rồi mới đối chiếu với ngưỡng cắt 0.28.",
      "Khi Bioscore > 0.28 ở bệnh nhân đa chấn thương nặng tại EICU, phổ kháng sinh kinh nghiệm cần bao phủ ngay trực khuẩn Gram âm đường hô hấp và tụ cầu (K. pneumoniae, P. aeruginosa, A. baumannii, S. aureus, E. coli) thay vì chờ 48–72 giờ cấy vi sinh.",
      "Ranh giới ngoại suy chặt chẽ: Công thức Bioscore xây dựng trên đoàn hệ đơn trung tâm N = 100 bệnh nhân đa chấn thương (ISS ≥ 16), chưa có thẩm định ngoài và không áp dụng tự động cho nhiễm khuẩn huyết nội khoa hay hậu phẫu chương trình."
    ],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Phần 1: Tình Huống & Ca Lâm Sàng Thực Hành",
        "icon": "fa-solid fa-user-doctor"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Phần 2.I: Bối Cảnh & Thách Thức Sinh Lý Bệnh",
        "icon": "fa-solid fa-book-medical"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phần 2.II: Thiết Kế, Quần Thể & Khung PICO",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phần 2.III: Hiệu Năng Chỉ Dấu & Thuật Toán Bioscore",
        "icon": "fa-solid fa-chart-column"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Phần 2.IV: Phản Biện Học Thuật & Thẩm Định RoB",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Phần 3: Kết Luận & Giải Quyết Ca Lâm Sàng",
        "icon": "fa-solid fa-gavel"
      }
    ],
    "updatedAt": "2026-11-28"
  },
  {
    "id": "2023-nejm-cape-cod-hydrocortisone-severe-cap",
    "slug": "2023-nejm-cape-cod-hydrocortisone-severe-cap",
    "code": "GDL-2023-NEJM-CAPE-COD-HYDROCORTISONE-SEVERE-CAP",
    "trialAcronym": "CAPE COD",
    "title": "CAPE COD (NEJM 2023): Hydrocortisone Truyền Liên Tục Sớm Trong Viêm Phổi Mắc Phải Cộng Đồng Nặng (sCAP) Tại ICU",
    "titleEn": "Hydrocortisone in Severe Community-Acquired Pneumonia (CAPE COD Trial)",
    "authors": "Pierre-François Dequin, Ferhat Meziani, Jean-Pierre Quenot, et al. (CRICS-TriGGERSep Network)",
    "journal": "N Engl J Med",
    "organization": "Mạng lưới Nghiên cứu CRICS-TriGGERSep (Pháp) / NEJM",
    "year": 2023,
    "doi": "10.1056/NEJMoa2215145",
    "nctId": "NCT02517489",
    "sourceUrl": "https://doi.org/10.1056/NEJMoa2215145",
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
    "followUpDuration": "28 ngày & 90 ngày",
    "asianData": false,
    "populationTags": [
      "icu-adults",
      "severe-cap-non-septic-shock"
    ],
    "population": "795 bệnh nhân người lớn (≥ 18 tuổi) nhập 31 trung tâm ICU tại Pháp do viêm phổi mắc phải cộng đồng nặng (sCAP) đạt ≥ 1/4 tiêu chuẩn độ nặng (thở máy PEEP ≥ 5, HFNC PaO2/FiO2 < 300 & FiO2 ≥ 50%, mặt nạ túi dự trữ PaO2/FiO2 < 300, hoặc PSI > 130 Class V), loại trừ sốc nhiễm trùng ban đầu và viêm phổi do cúm.",
    "interventionClass": "systemic-corticosteroid",
    "drug": "Hydrocortisone, Insulin",
    "intervention": "Hydrocortisone 200 mg/ngày truyền tĩnh mạch liên tục (8.3 mg/giờ) khởi đầu trong 24 giờ đầu (trung vị 15.3 giờ sau nhập ICU), đánh giá lại vào ngày thứ 4 để điều trị tổng 8 hoặc 14 ngày kèm giảm liều dần (tapering).",
    "comparatorType": "placebo",
    "primaryEndpointCategory": "mortality",
    "primaryEndpoint": "Tử vong do mọi nguyên nhân tại ngày thứ 28 (Day-28 all-cause mortality)",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-changing",
    "keyResults": "Giảm tuyệt đối 5.6% tử vong ngày 28 (6.2% vs 11.9%; 95% CI -9.6 đến -1.7; P = 0.006; RRR ~49%; NNT = 18) và duy trì đến ngày 90 (9.3% vs 14.7%; ARR -5.4%) | Giảm 41% nguy cơ đặt nội khí quản (18.0% vs 29.5%; HR 0.59) | Giảm 41% nguy cơ khởi đầu vận mạch (15.3% vs 25.0%; HR 0.59) | Rút ngắn nằm ICU (HR 1.33) | Không tăng nhiễm trùng bệnh viện (9.8% vs 11.1%) hay xuất huyết tiêu hóa (2.2% vs 3.3%), chỉ tăng nhu cầu Insulin tuần đầu (35.5 vs 20.5 UI/ngày; P < 0.001).",
    "primaryMetric": {
      "measure": "RR",
      "interventionRate": "6.2% (25/400)",
      "controlRate": "11.9% (47/395)",
      "effectEstimate": 0.53,
      "ciLower": 0.33,
      "ciUpper": 0.84,
      "rawDiffText": "ARR -5.6% (95% CI -9.6% đến -1.7%) | Đặt NKQ: HR 0.59 | Vận mạch: HR 0.59",
      "pValue": "0.006",
      "nnt": 18
    },
    "safetyHighlight": "Tăng đường huyết cần liều Insulin cao hơn trong 7 ngày đầu (trung vị 35.5 vs 20.5 UI/ngày; P < 0.001); không làm tăng nhiễm trùng bệnh viện (P = 0.54) hay xuất huyết tiêu hóa (P = 0.38).",
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
      "CAPE COD",
      "Hydrocortisone",
      "sCAP",
      "ICU",
      "Corticosteroid",
      "Evidence-Based Medicine"
    ],
    "summary": "Thử nghiệm pha 3 ngẫu nhiên mù đôi bản lề tại 31 ICU Pháp (N = 795) chứng minh Hydrocortisone 200 mg/ngày truyền tĩnh mạch liên tục khởi đầu sớm (trung vị 15.3 giờ sau nhập ICU) giúp giảm mạnh tử vong ngày 28 (6.2% vs 11.9%, P = 0.006), giảm 41% đặt nội khí quản và 41% tiến triển sốc cần vận mạch ở bệnh nhân sCAP chưa có sốc nhiễm trùng hay cúm.",
    "detailedConclusion": "Thiết lập chuẩn mực điều trị mới tại ICU: Khởi đầu ngay Hydrocortisone 200 mg/24 giờ truyền tĩnh mạch liên tục trong 24 giờ đầu cho bệnh nhân sCAP nặng (PaO2/FiO2 < 300 trên HFNC/thở máy hoặc PSI > 130) chưa có sốc nhiễm trùng và không phải viêm phổi cúm; đánh giá lại ngày thứ 4 để hoàn tất liệu trình 8 hoặc 14 ngày kèm giảm liều dần và chủ động kiểm soát đường huyết bằng Insulin.",
    "description": "CAPE COD (NEJM 2023) — Thử nghiệm Pha 3 mù đôi trên 795 bệnh nhân sCAP tại 31 ICU Pháp: Hydrocortisone 200 mg/ngày truyền liên tục sớm giảm 5.6% tử vong ngày 28 (P = 0.006), giảm 41% đặt nội khí quản và 41% nhu cầu vận mạch.",
    "keyRecommendations": [
      "Khởi đầu sớm Hydrocortisone tĩnh mạch truyền liên tục 200 mg/24 giờ (8.3 mg/giờ) trong vòng 24 giờ đầu ở bệnh nhân sCAP nhập ICU chưa có sốc nhiễm trùng giúp giảm tuyệt đối 5.6% tử vong ngày 28 (6.2% vs 11.9%; P = 0.006; NNT = 18).",
      "Lợi ích bảo vệ bền vững đến ngày 90 (9.3% vs 14.7%; ARR -5.4%), giảm 41% nguy cơ phải đặt nội khí quản (HR 0.59; 95% CI 0.40–0.86) và giảm 41% nguy cơ khởi đầu thuốc vận mạch (HR 0.59; 95% CI 0.43–0.82).",
      "Đánh giá đáp ứng lâm sàng vào ngày thứ 4 để chọn tổng thời gian điều trị 8 ngày (cải thiện tốt) hoặc 14 ngày (cải thiện chậm) kèm phác đồ giảm liều dần (tapering) nhằm tránh dội ngược viêm.",
      "Hồ sơ an toàn rất cao (không tăng nhiễm trùng bệnh viện hay xuất huyết tiêu hóa), nhưng bắt buộc chủ động thiết lập phác đồ Insulin kiểm soát tăng đường huyết trong 7 ngày đầu (liều trung vị 35.5 vs 20.5 UI/ngày; P < 0.001)."
    ],
    "clinicalPearls": [
      "Bí quyết vượt trội của CAPE COD nằm ở 4 trụ cột: cân bằng Glucocorticoid/Mineralocorticoid của Hydrocortisone truyền liên tục 200 mg/ngày, cửa sổ vàng < 15 giờ sau nhập ICU, loại trừ sốc nhiễm trùng ban đầu và tỷ lệ nữ giới 30.6%.",
      "Truyền tĩnh mạch liên tục (8.3 mg/giờ) ổn định nồng độ huyết tương, giảm dao động đỉnh đường huyết cấp tính và hạn chế hiện tượng dội ngược viêm (inflammatory rebound) so với tiêm bolus ngắt quãng.",
      "Tuyệt đối không tự động ngoại suy sang viêm phổi do Virus Cúm (Influenza) vì nhóm này bị loại trừ khỏi thử nghiệm do lo ngại nguy cơ bất lợi của corticosteroid.",
      "Thận trọng khi đánh giá hiệu quả tuyệt đối: Tỷ lệ tử vong nhóm giả dược thực tế (11.9%) thấp hơn nhiều so với giả định cỡ mẫu ban đầu (27%), và 44.9% ca không phân lập được căn nguyên vi sinh."
    ],
    "subgroups": {
      "Kết cục lâm sàng chính tại ngày thứ 28": "Hydrocortisone: Tử vong 6.2%, Đặt nội khí quản 18.0%, Dùng thuốc vận mạch 15.3% | Giả dược: Tử vong 11.9%, Đặt nội khí quản 29.5%, Dùng thuốc vận mạch 25.0%",
      "Tần suất các biến cố an toàn và tác dụng phụ": "COL: Nhiễm trùng bệnh viện (Hydrocortisone): 9.8% | Nhiễm trùng bệnh viện (Giả dược): 11.1% | Xuất huyết tiêu hóa (Hydrocortisone): 2.2% | Xuất huyết tiêu hóa (Giả dược): 3.3%",
      "Liều lượng insulin trung vị sử dụng trong tuần đầu (UI/ngày)": "COL: Nhóm Hydrocortisone: 35.5% | Nhóm Giả dược: 20.5%"
    },
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Phần 1: Tình Huống & Ca Lâm Sàng Thực Hành",
        "icon": "fa-solid fa-user-doctor"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Phần 2.I: Bối Cảnh Khoa Học & Giả Thuyết",
        "icon": "fa-solid fa-book-medical"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phần 2.II: Thiết Kế, Phác Đồ & Khung PICO",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phần 2.III: Kết Quả Hiệu Quả & Hồ Sơ An Toàn",
        "icon": "fa-solid fa-chart-column"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Phần 2.IV: Bình Luận Phản Biện & Thẩm Định RoB",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Phần 3: Kết Luận & Giải Quyết Ca Lâm Sàng",
        "icon": "fa-solid fa-gavel"
      }
    ],
    "updatedAt": "2026-11-28"
  },
  {
    "id": "2017-infection-nlr-mlr-fever",
    "slug": "2017-infection-nlr-mlr-fever",
    "code": "STUDY-2017-INFECTION-NLR-MLR",
    "trialAcronym": "NLR-MLR FEVER",
    "title": "Infection 2017: Vai Trò Của Tỷ Số Neutrophil/Lymphocyte (NLR) & Monocyte/Lymphocyte (MLR) Trong Chẩn Đoán Nhiễm Khuẩn Ở Bệnh Nhân Sốt",
    "titleEn": "Role of neutrophil to lymphocyte and monocyte to lymphocyte ratios in the diagnosis of bacterial infection in patients with fever",
    "authors": "S. S. Nilssen, R. Mo, G. E. Eide, A. Naess, H. Sjursen",
    "journal": "Infection",
    "organization": "Infection / Haukeland University Hospital (Bergen, Na Uy)",
    "year": 2017,
    "doi": "10.1007/s15010-016-0972-1",
    "sourceUrl": "https://doi.org/10.1007/s15010-016-0972-1",
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
    "phase": "Retrospective Observational Cohort (Prospective Diagnostic Follow-up)",
    "blinding": "open-label",
    "centerScope": "single-center",
    "hypothesisType": "diagnostic-discrimination",
    "sampleSize": 299,
    "followUpDuration": "Nhập viện đến chẩn đoán xác định (sốt < 7 ngày vs 7–21 ngày)",
    "asianData": false,
    "populationTags": [
      "hospitalized-fever",
      "ed-adults"
    ],
    "population": "299 bệnh nhân nhập viện vì sốt chưa rõ nguyên nhân tại Bệnh viện Đại học Haukeland (Bergen, Na Uy, 2001–2004), loại trừ bệnh bạch cầu cấp (leukemia), giữ lại 26 bệnh nhân suy giảm miễn dịch (24 ghép tạng/tủy, 2 HIV).",
    "interventionClass": "biomarker-diagnostics",
    "drug": "NLR (Neutrophil-to-Lymphocyte Ratio), MLR (Monocyte-to-Lymphocyte Ratio), Complete Blood Count",
    "intervention": "Tính toán tỷ số NLR và MLR từ công thức máu ngoại vi tự động lúc nhập viện (Cell-Dyn 4000, Advia 120) để phân biệt nhiễm khuẩn, nhiễm virus và sốt phi nhiễm trùng, đồng thời đánh giá tương tác theo thời gian sốt trước nhập viện (< 7 ngày vs 7–21 ngày).",
    "comparatorType": "crp-wbc-standard",
    "primaryEndpointCategory": "diagnostic-performance",
    "primaryEndpoint": "Hiệu năng phân biệt nhiễm khuẩn (ROC AUC), phát hiện sớm nhiễm trùng huyết (septicemia) so với WBC/Neutrophils/CRP truyền thống và ảnh hưởng của thời gian sốt trước nhập viện.",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "NLR nhiễm khuẩn trung vị 7.94 (IQR 4.47–15.02) vs không nhiễm trùng 3.78 (p < 0.001) vs virus 0.63 (p = 0.010) | MLR nhiễm khuẩn 0.70 vs không nhiễm trùng 0.35 (p < 0.001) vs virus 0.14 (p = 0.005) | Sốt cấp < 7 ngày: Septicemia (n = 18) có NLR vọt lên 15.69 (p = 0.006) trong khi WBC (p = 0.559), Neutrophils (p = 0.677) và CRP (p = 0.615) thất bại hoàn toàn | Cơ chế cốt lõi: giảm lympho nghiêm trọng (0.7 vs 1.3 × 10⁹/L; p < 0.001) | AUC NLR = 0.708, MLR = 0.688.",
    "primaryMetric": {
      "measure": "AUC",
      "interventionRate": "NLR Septicemia (<7d): 15.69",
      "controlRate": "Nhiễm khuẩn khác: 7.88–8.18",
      "rawDiffText": "AUC NLR = 0.708 | AUC MLR = 0.688 | Septicemia (<7d): NLR 15.69 (p = 0.006) vs WBC/CRP thất bại (p > 0.55)",
      "pValue": "0.006"
    },
    "safetyHighlight": "Độ đặc hiệu tổng thể ở mức trung bình (AUC ~0.69–0.71) do chồng lấp với bệnh tự miễn/ung thư và hiệu lực suy giảm rõ khi sốt kéo dài ≥ 7 ngày; cần phiên giải chặt chẽ theo mốc thời gian sốt.",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
    "topicTags": [
      "dau-an-sinh-hoc",
      "nlr-mlr",
      "chan-doan-sot",
      "sepsis"
    ],
    "tags": [
      "Infection",
      "2017",
      "NLR",
      "MLR",
      "Sốt Cấp Tính",
      "Nhiễm Trùng Huyết",
      "Sepsis",
      "Công Thức Máu",
      "Evidence-Based Medicine"
    ],
    "summary": "Nghiên cứu quan sát trên 299 bệnh nhân sốt nhập viện tại Đại học Haukeland (Na Uy) chứng minh NLR và MLR phân biệt có ý nghĩa nhiễm khuẩn với nhiễm virus và nguyên nhân phi nhiễm trùng. Đặc biệt ở bệnh nhân sốt cấp < 7 ngày, NLR phát hiện xuất sắc nhiễm trùng huyết (trung vị 15.69, p = 0.006) nhờ bắt trọn tín hiệu giảm lympho (0.7 vs 1.3 × 10⁹/L), trong khi WBC, bạch cầu trung tính và CRP hoàn toàn thất bại.",
    "detailedConclusion": "Ở bệnh nhân sốt cấp tính (< 7 ngày) có WBC và CRP nằm ở vùng xám, không bao giờ chỉ dừng lại ở hai chỉ số này. Giá trị NLR tăng vọt (đặc biệt ≥ 13–15, thúc đẩy bởi giảm lympho bào sâu) là cờ đỏ chỉ điểm nhiễm trùng huyết/nhiễm khuẩn nặng cần cấy máu khẩn và khởi đầu kháng sinh phổ rộng tĩnh mạch ngay lập tức; luôn phiên giải gắn liền thời gian sốt và bệnh cảnh lâm sàng tổng thể.",
    "description": "Phân tích chuyên sâu nghiên cứu của Nilssen et al. (Infection 2017, N = 299): Tỷ số NLR & MLR từ công thức máu cơ bản phân biệt nhiễm khuẩn vs virus/phi nhiễm trùng và phát hiện vượt trội nhiễm trùng huyết (NLR 15.69) khi WBC và CRP thất bại.",
    "keyRecommendations": [
      "Tỷ số NLR và MLR ở nhóm nhiễm khuẩn cao vượt trội so với nhóm không nhiễm trùng (NLR 7.94 vs 3.78, p < 0.001; MLR 0.70 vs 0.35, p < 0.001) và nhóm nhiễm virus (NLR 0.63, p = 0.010; MLR 0.14, p = 0.005).",
      "Với bệnh nhân sốt cấp tính (< 7 ngày), NLR tăng vọt (trung vị 15.69 ở nhóm nhiễm trùng huyết; p = 0.006) vượt xa khả năng phân biệt của WBC (p = 0.559), Neutrophils (p = 0.677) và CRP (p = 0.615).",
      "Cơ chế then chốt tạo nên sức mạnh của NLR là tình trạng giảm bạch cầu lympho nghiêm trọng (lymphopenia: trung vị 0.7 vs 1.3 × 10⁹/L; p < 0.001) phản ánh stress miễn dịch/chết tế bào theo chương trình trong nhiễm trùng nặng.",
      "Bắt buộc phiên giải NLR và MLR theo thời gian khởi phát sốt: hiệu năng đạt tối ưu trong tuần đầu (< 7 ngày) và suy giảm có ý nghĩa khi sốt kéo dài 7–21 ngày (NLR 8.43 vs 4.33, p = 0.005; MLR 0.71 vs 0.41, p = 0.001)."
    ],
    "clinicalPearls": [
      "NLR và MLR là hai chỉ số '0 đồng' chiết xuất ngay từ công thức máu ngoại vi tại mọi tuyến y tế, giúp giải tỏa vùng xám khi WBC tăng nhẹ và CRP ở ngưỡng trung gian.",
      "Đừng bao giờ bỏ sót cột Lymphocytes trên tờ công thức máu: chính sự sụt giảm sâu lympho (< 0.7 × 10⁹/L) mới là động lực đẩy NLR vượt ngưỡng 15 trong nhiễm trùng huyết sớm.",
      "Do tương quan nội tại rất mạnh giữa NLR và MLR (Spearman's rho = 0.78, p < 0.001), trong thực hành lâm sàng và mô hình hồi quy chỉ nên dùng độc lập từng chỉ số (ưu tiên NLR vì AUC nhỉnh hơn: 0.708 vs 0.688).",
      "Hiệu năng phân loại chung ở mức khá (AUC ~0.69–0.71) và có chồng lấp với bệnh tự miễn/ác tính, do đó NLR/MLR là công cụ bổ trợ phân tầng nguy cơ chứ không thay thế khám lâm sàng và cấy máu."
    ],
    "sections": [
      {
        "id": "sec-1",
        "number": 1,
        "title": "Phần 1: Tình Huống & Ca Lâm Sàng Thực Hành",
        "icon": "fa-solid fa-user-doctor"
      },
      {
        "id": "sec-2",
        "number": 2,
        "title": "Phần 2.I: Bối Cảnh & Đặt Vấn Đề Nghiên Cứu",
        "icon": "fa-solid fa-book-medical"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phần 2.II: Thiết Kế, Quần Thể & Khung PICO",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phần 2.III: Kết Quả Cốt Lõi & So Sánh Sinh Học",
        "icon": "fa-solid fa-chart-column"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Phần 2.IV: Phản Biện Học Thuật & Thẩm Định RoB",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Phần 3: Kết Luận & Giải Quyết Ca Lâm Sàng",
        "icon": "fa-solid fa-gavel"
      }
    ],
    "updatedAt": "2026-11-28"
  }
];

export const KHO_RESEARCH_SLUG_SET: Set<string> = new Set(
  KHO_RESEARCH_STATIC.map((item) => item.slug)
);

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__CLINIPORTAL_RESEARCH_SLUGS__ = KHO_RESEARCH_SLUG_SET;
}
