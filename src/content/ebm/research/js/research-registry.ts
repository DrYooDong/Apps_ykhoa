/**
 * CliniPortal 2.0 — CliniResearch Studio Static Registry
 * Path: src/content/ebm/research/js/research-registry.ts
 *
 * AUTO-GENERATED FROM MDX FRONTMATTER (Single Source of Truth)
 * Total Research Studies: 10
 * DO NOT EDIT MANUALLY — Run: npm run sync:research
 */

import type { ResearchStudyRecord } from './research-types';

export const KHO_RESEARCH_STATIC: ResearchStudyRecord[] = [
  {
    "id": "2026-ijmpr-dengue-serum-sodium-hyponatremia",
    "slug": "2026-ijmpr-dengue-serum-sodium-hyponatremia",
    "code": "STD-2026-IJMPR-DENGUE-SODIUM",
    "trialAcronym": "DENGUE-NA IJMPR",
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
    "sampleSize": 50,
    "followUpDuration": "Nhập viện – Ngày 3",
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
    "primaryEndpoint": "Tần suất hạ Natri máu (< 135 mEq/L) và tương quan với độ nặng Dengue, biến chứng lâm sàng và tử vong",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "Hạ Natri máu chiếm 64% (trung bình 126.1 ± 16.1 mEq/L); 100% nhóm hạ Natri nặng (< 125 mEq/L) gặp biến chứng (p = 0.005); toàn bộ tử vong (6%, 3/50 ca) nằm ở nhóm hạ Natri nặng (p < 0.001).",
    "primaryMetric": {
      "measure": "Prevalence",
      "interventionRate": "64% (Na < 135 mEq/L)",
      "controlRate": "36% (Na bình thường)",
      "rawDiffText": "100% biến chứng ở nhóm Na < 125 mEq/L (p = 0.005) | Tử vong 6% (3/50 ca, p < 0.001)",
      "pValue": "<0.001"
    },
    "safetyHighlight": "Nguy cơ quá tải dịch hoặc hội chứng hủy myelin thẩm thấu nếu bù NaCl 3% quá nhanh trong giai đoạn thoát huyết tương",
    "robOverall": "some-concerns",
    "gradeCertainty": "low",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
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
    "summary": "Nghiên cứu trên 50 bệnh nhân Dengue người lớn nhập viện tại Ấn Độ (IJMPR 2026): Hạ Natri máu xuất hiện ở 64% ca và tương quan mạnh với biến chứng (p = 0.005), mức độ nặng (p < 0.001) và tử vong (p < 0.001).",
    "detailedConclusion": "Xét nghiệm Natri máu lúc nhập viện và ngày thứ 3 giúp nhận diện nhóm Dengue nguy cơ cao (đặc biệt khi Na < 125 mEq/L); thận trọng khi khái quát hóa do cỡ mẫu nhỏ (N = 50) và thiết kế đơn trung tâm.",
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
    "trialAcronym": "PBP-GUT RCT",
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
    "primaryMetric": {
      "measure": "ARR",
      "interventionRate": "BSFS 3–5 +13.96% (PBP1) / +12.22% (PBP2)",
      "controlRate": "Placebo",
      "rawDiffText": "BSFS 3–5 tăng +13.96% (p=0.0151) | Butyrate tăng p<0.01 | Zonulin giảm -155.62 ng/g ở BMI 25–30",
      "pValue": "0.0151"
    },
    "safetyHighlight": "Dung nạp tốt, không biến cố bất lợi nghiêm trọng; bảo tồn Alpha diversity hệ vi sinh bản địa",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "fundingSource": "industry-pharma",
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
    "id": "2026-ihi-tak003-dengue-vaccine-prisma",
    "slug": "2026-ihi-tak003-dengue-vaccine-prisma",
    "code": "STD-2026-IHI-TAK003-PRISMA",
    "trialAcronym": "TAK-003 PRISMA SR",
    "title": "TAK-003 Phòng Sốt Xuất Huyết Dengue: Hiệu Lực Dài Hạn, Tiêm Đồng Thời & An Toàn Thực Tế (Tổng Quan Hệ Thống PRISMA 2026)",
    "titleEn": "TAK-003 Dengue Vaccine Efficacy and Safety: A Systematic Literature Review Using PRISMA",
    "authors": "Galih Muchlis Hermawan, Syuharul Qomar, Iga Putri Imansari",
    "journal": "Indonesian Health Issue",
    "organization": "Indonesian Health Issue (PRISMA Systematic Review)",
    "year": 2026,
    "file": "2026-ihi-tak003-dengue-vaccine-prisma.mdx",
    "specialty": "infect",
    "specialty2": "pedia",
    "conditionKey": "dengue-fever",
    "problemLabels": [
      "dengue-vaccination",
      "vaccine-coadministration",
      "post-marketing-safety"
    ],
    "icd10": [
      "A90",
      "A91",
      "Z25.8"
    ],
    "design": "systematic-review",
    "phase": "Systematic Review (4 RCTs Pha 3 + 1 Post-Marketing)",
    "blinding": "mixed-design",
    "centerScope": "multicenter-intl",
    "hypothesisType": "qualitative-synthesis",
    "sampleSize": 134881,
    "followUpDuration": "4.5 năm (TIDES) & giám sát hậu lưu hành",
    "asianData": true,
    "populationTags": [
      "pediatric-adolescent",
      "adults",
      "endemic-population",
      "seropositive-and-seronegative"
    ],
    "population": "Tổng hợp 5 nghiên cứu Scopus Q1 gồm trẻ em và thanh thiếu niên 4–16 tuổi tại 8 quốc gia vùng dịch tễ (TIDES, N = 20.099), thanh thiếu niên 9 đến dưới 15 tuổi (N = 614), người lớn 18–60 tuổi (N = 1.823) và quần thể giám sát thực tế 4–102 tuổi tại Argentina (156.676 liều trên 112.345 cá thể).",
    "interventionClass": "vaccine-immunization",
    "drug": "Vắc-xin sốt xuất huyết sống giảm độc lực tứ giá TAK-003 (phác đồ 2 liều, khung di truyền DENV-2)",
    "intervention": "Tiêm vắc-xin TAK-003 đơn độc hoặc tiêm đồng thời (co-administration) với vắc-xin Viêm gan A (HAV) hoặc 9vHPV, đánh giá hiệu lực dài hạn, tính miễn dịch, tính tương đồng lô sản xuất và hồ sơ an toàn thực tế.",
    "comparatorType": "placebo-and-active-coadmin",
    "primaryEndpointCategory": "vaccine-efficacy-safety",
    "primaryEndpoint": "Hiệu lực bảo vệ tích lũy chống SXHD xác nhận vi-rút (VCD), hiệu lực phòng nhập viện do Dengue, đáp ứng miễn dịch khi tiêm đồng thời và tần suất biến cố bất lợi sau tiêm chủng (AEFI).",
    "outcomeDirection": "positive-superior",
    "impactVerdict": "practice-informing",
    "keyResults": "TIDES (4,5 năm, N = 20.099): VE phòng VCD đạt 61,2% và VE phòng nhập viện đạt 84,1%; tiêm đồng thời HAV (98,7% vs 97,1%) và 9vHPV (DENV ≥ 99,6%) không gây can thiệp miễn dịch; giám sát thực tế 156.676 liều ghi nhận AEFI thấp 1,9/1.000 liều (95,1% nhẹ/tự khỏi).",
    "primaryMetric": {
      "measure": "VE",
      "interventionRate": "VE nhập viện 84,1% | VE VCD 61,2%",
      "controlRate": "AEFI thực tế: 1,9 / 1.000 liều (95,1% nhẹ)",
      "rawDiffText": "Phòng nhập viện 84,1% (TIDES 4,5 năm) • Không cần tầm soát serostatus tiền tiêm chủng • An toàn tiêm đồng thời HAV & 9vHPV",
      "pValue": "Q1 Qualitative Synthesis"
    },
    "safetyHighlight": "Tần suất AEFI hậu lưu hành chỉ 1,9/1.000 liều (95,1% nhẹ/không nghiêm trọng: phát ban, đau cơ, nhức đầu sau liều 1); chưa ghi nhận tín hiệu nguy cơ an toàn mới. Lưu ý hiệu lực phòng DENV-3 ở nhóm seronegative chưa đạt ý nghĩa thống kê.",
    "robOverall": "low",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
    "topicTags": [
      "dengue",
      "vac-xin-dengue",
      "tiem-dong-thoi",
      "an-toan-aefi",
      "tong-quan-prisma"
    ],
    "tags": [
      "PRISMA",
      "2026",
      "TAK-003",
      "Sốt xuất huyết Dengue",
      "Vắc-xin",
      "Tiêm đồng thời",
      "AEFI",
      "Evidence-Based Medicine"
    ],
    "summary": "Tổng quan hệ thống theo chuẩn PRISMA từ 1.011 bản ghi chọn lọc 5 công trình Scopus Q1 (4 RCT Pha 3 và 1 nghiên cứu giám sát hậu lưu hành trên 156.676 liều) khẳng định vắc-xin TAK-003 đạt hiệu lực phòng nhập viện cao (84,1% sau 4,5 năm), tương thích miễn dịch khi tiêm đồng thời HAV/9vHPV và có hồ sơ an toàn thực tế thuận lợi (AEFI 1,9/1.000 liều).",
    "detailedConclusion": "Có thể chỉ định TAK-003 cho trẻ sống tại vùng lưu hành SXHD mà không cần bắt buộc xét nghiệm tầm soát serostatus ban đầu, và có thể tiêm đồng thời với 9vHPV tại vị trí khác nhau. Tuy nhiên cần tư vấn rõ với gia đình rằng ở người chưa rõ tiền sử nhiễm DENV (seronegative), hiệu lực bảo vệ ưu thế trên DENV-1 và DENV-2 (DENV-3 chưa đạt ý nghĩa thống kê), do đó vẫn phải duy trì biện pháp phòng tránh muỗi đốt.",
    "description": "Báo cáo phân tích và bình duyệt học thuật lâm sàng tổng quan hệ thống PRISMA (Hermawan et al., 2026) về vắc-xin SXHD TAK-003: VE phòng nhập viện 84,1%, không cần thử huyết thanh trước tiêm, an toàn tiêm đồng thời 9vHPV/HAV và AEFI thực tế 1,9/1.000 liều.",
    "keyRecommendations": [
      "Không cần bắt buộc xét nghiệm tầm soát tình trạng huyết thanh (baseline serostatus screening) trước khi chỉ định vắc-xin TAK-003.",
      "Hiệu lực bảo vệ dài hạn (4,5 năm, TIDES) chống nhập viện do SXHD đạt 84,1% và chống VCD chung đạt 61,2%; nhóm seropositive bảo vệ cả 4 tuýp, nhóm seronegative ưu thế trên DENV-1 và DENV-2.",
      "TAK-003 tương thích miễn dịch cao khi tiêm đồng thời với vắc-xin 9vHPV (DENV ≥ 99,6%) hoặc vắc-xin Viêm gan A (HAV 98,7% vs 97,1%) mà không gây can thiệp miễn dịch.",
      "Giám sát hậu lưu hành trên 156.676 liều (Argentina) xác nhận hồ sơ an toàn thực tế tốt với tỷ lệ AEFI chỉ 1,9/1.000 liều (95,1% nhẹ và tự khỏi, chủ yếu sau liều 1)."
    ],
    "clinicalPearls": [
      "Khác với vắc-xin thế hệ đầu CYD-TDV (bắt buộc thử huyết thanh tiền tiêm chủng do tăng nguy cơ SXHD nặng ở người seronegative), TAK-003 được xây dựng trên khung DENV-2 và có thể triển khai mà không cần sàng lọc huyết thanh nền.",
      "Giá trị lâm sàng nổi trội nhất của TAK-003 là giảm gánh nặng nhập viện (VE 84,1%), cao hơn rõ rệt so với hiệu lực phòng nhiễm vi-rút có triệu chứng chung (VE 61,2%).",
      "Khi tư vấn cho đối tượng chưa rõ tiền sử nhiễm DENV, cần nêu minh bạch khoảng trống hiệu lực trên DENV-3 ở nhóm seronegative để gia đình không chủ quan bỏ qua phòng chống muỗi đốt.",
      "Tổng hợp định tính theo cấu trúc chủ đề thay vì phân tích gộp (meta-analysis) là lựa chọn phương pháp luận chính xác khi dữ liệu có tính không đồng nhất lớn về thiết kế và tiêu chí đánh giá."
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
        "title": "Phần 2.I: Đặt Vấn Đề & Bối Cảnh Nghiên Cứu",
        "icon": "fa-solid fa-book-medical"
      },
      {
        "id": "sec-3",
        "number": 3,
        "title": "Phần 2.II: Phương Pháp Luận & Sơ Đồ PRISMA",
        "icon": "fa-solid fa-diagram-project"
      },
      {
        "id": "sec-4",
        "number": 4,
        "title": "Phần 2.III: Kết Quả Tổng Hợp & Phân Tích Chủ Đề",
        "icon": "fa-solid fa-chart-column"
      },
      {
        "id": "sec-5",
        "number": 5,
        "title": "Phần 2.IV: Phản Biện Học Thuật & RoB",
        "icon": "fa-solid fa-scale-balanced"
      },
      {
        "id": "sec-6",
        "number": 6,
        "title": "Phần 3: Kết Luận & Giải Quyết Ca Lâm Sàng",
        "icon": "fa-solid fa-gavel"
      }
    ],
    "updatedAt": "2026-11-25"
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
    "followUpDuration": "Đa nghiên cứu (1–10 năm)",
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
      "effectEstimate": 0.79,
      "ciLower": 0.71,
      "ciUpper": 0.87,
      "rawDiffText": "MACE: RR 0.79 (0.71–0.87, I²=27%) | Tử vong chung: RR 0.60 (0.43–0.83) | Tái nhập viện: RR 0.97 (p=0.68)",
      "pValue": "<0.00001"
    },
    "safetyHighlight": "96.9% dân số gộp là nam giới (chi phối bởi cohort cựu chiến binh Mỹ); không giảm tái nhập viện tim mạch (RR 0.97)",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
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
    "id": "2020-nutrients-lowcarb-vs-lowfat",
    "slug": "2020-nutrients-lowcarb-vs-lowfat",
    "code": "GDL-2020-NUTRIENTS-LOWCARB-VS-LOWFAT",
    "trialAcronym": "LOWCARB-LOWFAT META",
    "title": "Nghiên cứu So sánh Chế độ ăn Low-Carb vs Low-Fat trong Giảm cân và Kiểm soát Chuyển hóa",
    "titleEn": "Effects of Low-Carbohydrate vs Low-Fat Diets on Metabolic Parameters and Weight Loss",
    "journal": "Nutrients",
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
    "keyResults": "Low-Carb giảm cân nhỉnh hơn -1.00 kg (WMD, 38 RCTs) và cải thiện Triglyceride (-10%), HDL-C (+5%) trong 6–12 tháng đầu, nhưng làm tăng LDL-C (+7%) và hiệu quả giảm cân > 12 tháng tương đương Low-Fat.",
    "primaryMetric": {
      "measure": "WMD",
      "interventionRate": "Low-Carb (< 40% kcal)",
      "controlRate": "Low-Fat (< 30% kcal)",
      "rawDiffText": "WMD cân nặng -1.00 kg (38 RCTs, N=6,499) | TG giảm 10%, HDL tăng 5%, LDL tăng 7%",
      "pValue": "<0.05"
    },
    "safetyHighlight": "Chế độ ăn Low-Carb giàu chất béo bão hòa động vật làm tăng LDL-C (+7%) và Cholesterol toàn phần (+10%)",
    "robOverall": "some-concerns",
    "gradeCertainty": "moderate",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
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
    "trialAcronym": "DENGUE-ELEC AKUH",
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
    "sampleSize": 1008,
    "followUpDuration": "Nội trú (LOS ≥ 3 ngày)",
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
    "primaryEndpoint": "Thời gian nằm viện kéo dài (LOS ≥ 3 ngày) và tử vong trong bệnh viện theo phân tích hồi quy đa biến",
    "outcomeDirection": "neutral-null",
    "impactVerdict": "hypothesis-generating",
    "keyResults": "Hạ Natri (29.3%) và hạ Kali (23.2%) lúc nhập viện KHÔNG dự báo độc lập LOS ≥ 3 ngày hay tử vong (p > 0.05) | Yếu tố dự báo tử vong độc lập: Creatinine > 1.3 mg/dL (aOR 14.74; 95% CI 4.19–51.85; p < 0.001), ĐTĐ (aOR 4.36; p = 0.024) | Dự báo LOS ≥ 3 ngày: Troponin > 0.04 ng/mL (aOR 5.74; p < 0.001).",
    "primaryMetric": {
      "measure": "aOR (NS)",
      "interventionRate": "Na < 135: 29.3% | K < 3.5: 23.2%",
      "controlRate": "Điện giải bình thường",
      "rawDiffText": "Điện giải vs LOS/Tử vong: p > 0.05 (NS) | Creatinine > 1.3 -> Tử vong: aOR 14.74 (4.19–51.85)",
      "pValue": ">0.05"
    },
    "safetyHighlight": "Tổn thương thận cấp (Creatinine > 1.3 mg/dL) và tổn thương cơ tim (Troponin > 0.04 ng/mL) là tín hiệu đỏ tiên lượng tử vong và nằm viện kéo dài",
    "robOverall": "some-concerns",
    "gradeCertainty": "low",
    "fragilityIndex": null,
    "fundingSource": "public-academic",
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
    "summary": "Đoàn hệ hồi cứu 1,008 bệnh nhân Dengue tại Pakistan (Cureus 2020): Hạ Natri và hạ Kali lúc nhập viện không dự báo độc lập nằm viện kéo dài hay tử vong (p > 0.05); tổn thương thận cấp (aOR 14.74), Troponin tăng (aOR 5.74) và ĐTĐ (aOR 4.36) mới là yếu tố tiên lượng then chốt.",
    "detailedConclusion": "Khi được bù dịch và hiệu chỉnh điện giải sớm nội viện, hạ Natri/Kali nhẹ lúc nhập viện không tự thân làm tăng tử vong; ưu tiên theo dõi sát Creatinine (AKI), Troponin cơ tim và bệnh nền ĐTĐ.",
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
    "id": "2017-infection-nlr-mlr-fever",
    "slug": "2017-infection-nlr-mlr-fever",
    "code": "STUDY-2017-INFECTION-NLR-MLR",
    "trialAcronym": "NLR-MLR FEVER",
    "title": "Infection 2017: Vai Trò Của Tỷ Lệ Neutrophil/Lympho (NLR) & Monocyte/Lympho (MLR) Trong Chẩn Đoán Phân Biệt Sốt Do Nhiễm Trùng & Không Nhiễm Trùng",
    "titleEn": "Role of neutrophil to lymphocyte and monocyte to lymphocyte ratios in the diagnosis of bacterial infection in patients with fever",
    "journal": "Infection",
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
    "sampleSize": 299,
    "followUpDuration": "Nhập viện cấp cứu (sốt < 7 ngày vs ≥ 7 ngày)",
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
    "primaryMetric": {
      "measure": "AUC",
      "interventionRate": "NLR Septicemia: 15.69",
      "controlRate": "Nhiễm khuẩn khác: 8.42",
      "rawDiffText": "AUC NLR = 0.708 | AUC MLR = 0.688 | Septicemia (<7d): NLR 15.69 vs 8.42 (p = 0.006)",
      "pValue": "0.006"
    },
    "safetyHighlight": "Độ chính xác NLR/MLR suy giảm ở bệnh nhân sốt kéo dài ≥ 7 ngày hoặc dùng corticoid/suy giảm miễn dịch",
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
  }
];

export const KHO_RESEARCH_SLUG_SET: Set<string> = new Set(
  KHO_RESEARCH_STATIC.map((item) => item.slug)
);

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__CLINIPORTAL_RESEARCH_SLUGS__ = KHO_RESEARCH_SLUG_SET;
}
