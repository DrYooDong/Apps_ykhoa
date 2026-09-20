/**
 * CliniPortal Kho Chẩn Đoán Database — Generated Automatically
 * Nguồn dữ liệu: knowledge-vault/2.3. Kho chẩn đoán/ (15 Chuyên khoa, 2 Bệnh lý)
 * Tự động tạo bởi: tools/scripts/ingest-kho-chan-doan.mjs
 * Ngày cập nhật: 2026-09-20
 */

import type { DiseaseReactionChainDefinition } from './diagnostic-criteria-database';

export const KHO_CHAN_DOAN_DATABASE: Record<string, DiseaseReactionChainDefinition> = {
  "xo_gan": {
    "icdCode": "K74",
    "icdPrefixes": [
      "K74",
      "K70",
      "K71",
      "B18"
    ],
    "diseaseName": "Xơ gan",
    "specialty": "Tiêu hóa",
    "severity": "routine",
    "summary": "Xơ gan (Liver Cirrhosis) đại diện cho giai đoạn tiến triển muộn của bệnh lý gan mạn tính, được đặc trưng bởi quá trình xơ hóa lan rộng (giai đoạn F4 Metavir), sự xuất hiện các nốt tái sinh làm đảo lộn cấu trúc nhu mô và vi tuần hoàn gan. Trong danh pháp lâm sàng hiện đại, xơ gan còn bù được gọi là Bệnh gan mạn tiến triển nâng cao còn bù (cACLD). Bệnh tiến triển âm thầm cho đến khi xuất hiện các biến cố mất bù (cổ trướng, vỡ giãn tĩnh mạch thực quản, bệnh脑gan, vàng da, suy thận HRS-AKI). Việc chẩn đoán sớm dựa trên chỉ số sinh hóa không xâm lấn (APRI, FIB-4), đo độ đàn hồi gan (FibroScan) và tiêu chuẩn Baveno VII giúp phân tầng nguy cơ Tăng áp lực tĩnh mạch cửa có ý nghĩa lâm sàng (CSPH), từ đó can thiệp dự phòng kịp thời để ngăn ngừa biến cố tử vong.",
    "goldStandard": "& BỘ TIÊU CHÍ PHÂN ĐỘ LÂM SÀNG (SEVERITY STAGING)",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa)"
    },
    "criteria": [
      {
        "id": "xo_gan_c1",
        "type": "major",
        "label": "- Biểu hiện lâm sàng: Phần lớn người bệnh nhiễm vi rút viêm gan B/C hoặc mắc bệnh gan mạn không có triệu chứng lâm sàng rõ rệt trong nhiều năm. Bệnh nhân có thể mệt mỏi nhẹ, ch",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c2",
        "type": "major",
        "label": "- Sao mạch (Spider angiomas) tập trung vùng ngực, cổ, mặt.",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c3",
        "type": "major",
        "label": "- Ban đỏ lòng bàn tay (Palmar erythema).",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c4",
        "type": "major",
        "label": "- Gan to nhẹ hoặc teo thô, lách to độ I–II do tăng áp cửa âm thầm.",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c5",
        "type": "major",
        "label": "- Đặc điểm huyết động: Độ chênh áp lực tĩnh mạch cửa (HVPG) trong khoảng 5–9 mmHg hoặc 10–12 mmHg chưa gây biến cố lâm sàng rõ rệt.",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c6",
        "type": "major",
        "label": "1. Cổ trướng (Ascites): Xuất hiện ở khoảng 50% bệnh nhân trong vòng 10 năm, gõ đục vùng thấp, bụng chướng dịch tự do.",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c7",
        "type": "lab",
        "label": "2. Xuất huyết tiêu hóa do Vỡ giãn Tĩnh mạch Thực quản - Dạ dày (Acute Variceal Bleeding - AVB): Nôn ra máu tươi, máu cục hoặc đi tiêu phân đen nhão bốc mùi hôi khắm do tăng áp",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      },
      {
        "id": "xo_gan_c8",
        "type": "major",
        "label": "3. Bệnh Não Gan (Hepatic Encephalopathy - HE): Rối loạn nhịp sinh học, lơ mơ, thay đổi tính cách, mất định hướng, dấu vỗ cánh (Asterixis) dương tính rõ.",
        "sourceGuideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xơ gan (Tiêu hóa)",
      "guideline": "Quyết định 2855/QĐ-BYT (2024) Hướng dẫn Chẩn đoán Điều trị Viêm gan C",
      "targetGoals": [
        "Kiểm soát triệu chứng cấp tính & ổn định sinh hiệu",
        "Điều trị căn nguyên đặc hiệu & ngăn ngừa biến chứng",
        "Đánh giá đáp ứng điều trị và theo dõi dài hạn"
      ],
      "initialManagement": [
        "Đánh giá toàn diện sinh hiệu, tri giác và các dấu hiệu cảnh báo đỏ (Red Flags)",
        "Thiết lập đường truyền tĩnh mạch và lấy mẫu xét nghiệm chẩn đoán ban đầu",
        "Phân tầng độ nặng và quyết định hướng xử trí (ngoại trú / nhập viện / hồi sức tích cực)"
      ],
      "firstLineDrugs": [
        {
          "drugName": "Thuốc điều trị bậc 1 cho Xơ gan",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa",
          "route": "Uống / Tiêm truyền",
          "dosage": "Theo cân nặng và chức năng gan thận",
          "frequency": "Theo phác đồ chuẩn",
          "instructions": "Sử dụng theo đúng chỉ định chuyên khoa, theo dõi sát tác dụng phụ",
          "isFirstLine": true
        }
      ],
      "secondLineDrugs": [],
      "supportiveCare": [
        "Theo dõi sát dấu hiệu sinh tồn và diễn tiến lâm sàng",
        "Bù đủ dịch, cân bằng điện giải và dinh dưỡng hợp lý",
        "Tái khám định kỳ hoặc hội chẩn đa chuyên khoa khi không đáp ứng"
      ]
    },
    "complications": [
      {
        "name": "Biến chứng cấp tính của Xơ gan",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Xơ gan: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
      },
      {
        "name": "Di chứng hoặc biến chứng mạn tính",
        "timeframe": "chronic",
        "warningSigns": "Suy giảm chức năng cơ quan đích kéo dài",
        "preventiveAction": "Điều trị duy trì và tái khám theo dõi định kỳ",
        "onCallAlertText": "Theo dõi tiến triển mạn tính và tuân thủ điều trị"
      }
    ],
    "monitoringLabs": [
      "Công thức máu toàn phần (CBC)",
      "Sinh hóa máu: Chức năng gan (AST, ALT), Chức năng thận (Creatinine, Urea)",
      "Điện giải đồ (Na, K, Cl)",
      "Các dấu ấn chuyên khoa đặc hiệu theo dõi đáp ứng điều trị"
    ],
    "vaultPathways": [
      {
        "khoCode": "TC",
        "khoName": "Kho Lâm Sàng",
        "articleTitle": "Tiếp cận chẩn đoán Xơ gan",
        "searchKeyword": "xơ gan"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Xơ gan",
        "searchKeyword": "xơ gan"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Xơ gan",
        "searchKeyword": "xơ gan"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Xơ gan",
        "searchKeyword": "xơ gan"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Xơ gan",
        "searchKeyword": "xơ gan"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Xơ gan",
        "searchKeyword": "xơ gan"
      }
    ]
  },
  "sot_xuat_huyet_dengue": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Sốt xuất huyết Dengue",
    "specialty": "Truyền nhiễm",
    "severity": "urgent",
    "summary": "Sốt xuất huyết Dengue (Dengue Hemorrhagic Fever - DHF / DENV) là bệnh truyền nhiễm cấp tính do vi rút Dengue (4 typ huyết thanh DEN-1, DEN-2, DEN-3, DEN-4) gây ra, lây truyền trung gian qua muỗi Aedes aegypti. Diễn tiến bệnh mang tính động và biến đổi nhanh chóng qua 3 giai đoạn: Sốt cấp tính (N1–N3), Nguy hiểm (N4–N7 với hiện tượng tăng thấm mao mạch gây thoát huyết tương, cô đặc máu, giảm tiểu cầu dốc đứng, nguy cơ sốc giảm thể tích DSS, xuất huyết tạng nặng và suy đa tạng) và Hồi phục (N7–N10 với sự tái hấp thu dịch). Tiêu chuẩn vàng chẩn đoán căn nguyên dựa trên phát hiện kháng nguyên NS1, RT-PCR DENV trong 5 ngày đầu hoặc xét nghiệm biến đổi động thái kháng thể IgM/IgG từ ngày thứ 5. Việc phân độ lâm sàng chính xác tại từng thời điểm là yếu tố quyết định tiên lượng và chỉ định tuyến điều trị.",
    "goldStandard": "chẩn đoán căn nguyên dựa trên phát hiện kháng nguyên NS1, RT-PCR DENV trong 5 ngày đầu hoặc xét nghiệm biến đổi động thái kháng thể IgM/IgG từ ngày thứ 5. Việc phân độ lâm sàng chính xác tại từng thời",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm)"
    },
    "criteria": [
      {
        "id": "sot_xuat_huyet_dengue_c1",
        "type": "major",
        "label": "- Triệu chứng cơ năng: Sốt cao đột ngột, liên tục 39.0–40.5 °C, khó hạ sốt bằng các thuốc hạ sốt thông thường. Nhức đầu dữ dội, đau sau hốc mắt, đau cơ, đau khớp toàn thân, chá",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c2",
        "type": "lab",
        "label": "- Triệu chứng thực thể: Da xung huyết, phát ban dạng chấm xuất huyết dưới da, chảy máu chân răng hoặc chảy máu mũi nhẹ. Nghiệm pháp dây thắt (Lacet test) thường dương tính (+).",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c3",
        "type": "major",
        "label": "- Hiện tượng thoát huyết tương (Plasma Leakage) do tăng tính thấm mao mạch (kéo dài 24–48 giờ):",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c4",
        "type": "lab",
        "label": "- Xuất huyết nặng: Xuất huyết tiêu hóa (nôn ra máu, tiêu phân đen/tiêu máu tươi), chảy máu âm đạo ồ ạt, chảy máu mũi nặng, xuất huyết trong cơ và nội tạng.",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c5",
        "type": "major",
        "label": "- Suy tạng nặng: Tổn thương gan nặng (AST/ALT \\ge 1000 U/L), suy thận cấp, rối loạn tri giác (thể não), viêm cơ tim/suy tim cấp.",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c6",
        "type": "major",
        "label": "- Đánh giá tri giác: Thang điểm AVPU (Alert, Voice, Pain, Unresponsive) hoặc GCS. Phát hiện sớm trạng thái lừ đừ, bứt rứt hoặc hôn mê.",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c7",
        "type": "lab",
        "label": "- Tưới máu ngoại vi: Sờ nhiệt độ chi (chân tay ấm hay lạnh ẩm), đo thời gian đổ đầy mao mạch (Capillary Refill Time - CRT). CRT bình thường \\le 2 giây; CRT > 2–3 giây p",
        "sourceGuideline": "Truyền nhiễm"
      },
      {
        "id": "sot_xuat_huyet_dengue_c8",
        "type": "major",
        "label": "- Sinh hiệu:",
        "sourceGuideline": "Truyền nhiễm"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sốt xuất huyết Dengue (Truyền nhiễm)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Sốt xuất huyết Dengue - Bộ Y Tế & Quốc Tế",
      "targetGoals": [
        "Kiểm soát triệu chứng cấp tính & ổn định sinh hiệu",
        "Điều trị căn nguyên đặc hiệu & ngăn ngừa biến chứng",
        "Đánh giá đáp ứng điều trị và theo dõi dài hạn"
      ],
      "initialManagement": [
        "Đánh giá toàn diện sinh hiệu, tri giác và các dấu hiệu cảnh báo đỏ (Red Flags)",
        "Thiết lập đường truyền tĩnh mạch và lấy mẫu xét nghiệm chẩn đoán ban đầu",
        "Phân tầng độ nặng và quyết định hướng xử trí (ngoại trú / nhập viện / hồi sức tích cực)"
      ],
      "firstLineDrugs": [
        {
          "drugName": "Thuốc điều trị bậc 1 cho Sốt xuất huyết Dengue",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm",
          "route": "Uống / Tiêm truyền",
          "dosage": "Theo cân nặng và chức năng gan thận",
          "frequency": "Theo phác đồ chuẩn",
          "instructions": "Sử dụng theo đúng chỉ định chuyên khoa, theo dõi sát tác dụng phụ",
          "isFirstLine": true
        }
      ],
      "secondLineDrugs": [],
      "supportiveCare": [
        "Theo dõi sát dấu hiệu sinh tồn và diễn tiến lâm sàng",
        "Bù đủ dịch, cân bằng điện giải và dinh dưỡng hợp lý",
        "Tái khám định kỳ hoặc hội chẩn đa chuyên khoa khi không đáp ứng"
      ]
    },
    "complications": [
      {
        "name": "Biến chứng cấp tính của Sốt xuất huyết Dengue",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Sốt xuất huyết Dengue: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
      },
      {
        "name": "Di chứng hoặc biến chứng mạn tính",
        "timeframe": "chronic",
        "warningSigns": "Suy giảm chức năng cơ quan đích kéo dài",
        "preventiveAction": "Điều trị duy trì và tái khám theo dõi định kỳ",
        "onCallAlertText": "Theo dõi tiến triển mạn tính và tuân thủ điều trị"
      }
    ],
    "monitoringLabs": [
      "Công thức máu toàn phần (CBC)",
      "Sinh hóa máu: Chức năng gan (AST, ALT), Chức năng thận (Creatinine, Urea)",
      "Điện giải đồ (Na, K, Cl)",
      "Các dấu ấn chuyên khoa đặc hiệu theo dõi đáp ứng điều trị"
    ],
    "vaultPathways": [
      {
        "khoCode": "TC",
        "khoName": "Kho Lâm Sàng",
        "articleTitle": "Tiếp cận chẩn đoán Sốt xuất huyết Dengue",
        "searchKeyword": "sốt xuất huyết dengue"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Sốt xuất huyết Dengue",
        "searchKeyword": "sốt xuất huyết dengue"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Sốt xuất huyết Dengue",
        "searchKeyword": "sốt xuất huyết dengue"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Sốt xuất huyết Dengue",
        "searchKeyword": "sốt xuất huyết dengue"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Sốt xuất huyết Dengue",
        "searchKeyword": "sốt xuất huyết dengue"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Sốt xuất huyết Dengue",
        "searchKeyword": "sốt xuất huyết dengue"
      }
    ]
  }
};

export const KHO_CHAN_DOAN_KEYS = Object.keys(KHO_CHAN_DOAN_DATABASE);
