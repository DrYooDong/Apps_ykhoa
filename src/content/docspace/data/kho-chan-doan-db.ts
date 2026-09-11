/**
 * CliniPortal Kho Chẩn Đoán Database — Generated Automatically
 * Nguồn dữ liệu: knowledge-vault/2.3. Kho chẩn đoán/ (15 Chuyên khoa, 165 Bệnh lý)
 * Tự động tạo bởi: tools/scripts/ingest-kho-chan-doan.mjs
 * Ngày cập nhật: 2026-09-11
 */

import type { DiseaseReactionChainDefinition } from './diagnostic-criteria-database';

export const KHO_CHAN_DOAN_DATABASE: Record<string, DiseaseReactionChainDefinition> = {
  "bong": {
    "icdCode": "T20",
    "icdPrefixes": [
      "T20",
      "T30",
      "T31"
    ],
    "diseaseName": "Bỏng",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bỏng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "bong_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bỏng",
        "description": "bỏng, da liễu - cơ xương khớp, cong thuc parkland",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "bong_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bỏng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "bong_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bỏng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bỏng (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bỏng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bỏng",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Bỏng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bỏng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bỏng",
        "searchKeyword": "bỏng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bỏng",
        "searchKeyword": "bỏng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bỏng",
        "searchKeyword": "bỏng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bỏng",
        "searchKeyword": "bỏng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bỏng",
        "searchKeyword": "bỏng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bỏng",
        "searchKeyword": "bỏng"
      }
    ]
  },
  "chay_ran": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Chấy rận",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Chấy rận.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "chay_ran_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Chấy rận",
        "description": "chấy rận, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "chay_ran_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Chấy rận",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "chay_ran_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Chấy rận",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Chấy rận (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Chấy rận - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Chấy rận",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Chấy rận",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Chấy rận: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Chấy rận",
        "searchKeyword": "chấy rận"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Chấy rận",
        "searchKeyword": "chấy rận"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Chấy rận",
        "searchKeyword": "chấy rận"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Chấy rận",
        "searchKeyword": "chấy rận"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Chấy rận",
        "searchKeyword": "chấy rận"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Chấy rận",
        "searchKeyword": "chấy rận"
      }
    ]
  },
  "ghe": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Ghẻ",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Ghẻ.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "ghe_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Ghẻ",
        "description": "ghẻ, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "ghe_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Ghẻ",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "ghe_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Ghẻ",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Ghẻ (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Ghẻ - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Ghẻ",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Ghẻ",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Ghẻ: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Ghẻ",
        "searchKeyword": "ghẻ"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Ghẻ",
        "searchKeyword": "ghẻ"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Ghẻ",
        "searchKeyword": "ghẻ"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Ghẻ",
        "searchKeyword": "ghẻ"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Ghẻ",
        "searchKeyword": "ghẻ"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Ghẻ",
        "searchKeyword": "ghẻ"
      }
    ]
  },
  "hoai_tu_thuong_bi_nhiem_doc_ten": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hoại tử thượng bì nhiễm độc (TEN)",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hoại tử thượng bì nhiễm độc (TEN).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "hoai_tu_thuong_bi_nhiem_doc_ten_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hoại tử thượng bì nhiễm độc (TEN)",
        "description": "hoại tử thượng bì nhiễm độc (ten), da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "hoai_tu_thuong_bi_nhiem_doc_ten_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hoại tử thượng bì nhiễm độc (TEN)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "hoai_tu_thuong_bi_nhiem_doc_ten_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hoại tử thượng bì nhiễm độc (TEN)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hoại tử thượng bì nhiễm độc (TEN) (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hoại tử thượng bì nhiễm độc (TEN) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hoại tử thượng bì nhiễm độc (TEN)",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Hoại tử thượng bì nhiễm độc (TEN)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hoại tử thượng bì nhiễm độc (TEN): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hoại tử thượng bì nhiễm độc (TEN)",
        "searchKeyword": "hoại tử thượng bì nhiễm độc (ten)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hoại tử thượng bì nhiễm độc (TEN)",
        "searchKeyword": "hoại tử thượng bì nhiễm độc (ten)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hoại tử thượng bì nhiễm độc (TEN)",
        "searchKeyword": "hoại tử thượng bì nhiễm độc (ten)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hoại tử thượng bì nhiễm độc (TEN)",
        "searchKeyword": "hoại tử thượng bì nhiễm độc (ten)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hoại tử thượng bì nhiễm độc (TEN)",
        "searchKeyword": "hoại tử thượng bì nhiễm độc (ten)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hoại tử thượng bì nhiễm độc (TEN)",
        "searchKeyword": "hoại tử thượng bì nhiễm độc (ten)"
      }
    ]
  },
  "hoi_chung_dress": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng DRESS",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng DRESS.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "hoi_chung_dress_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng DRESS",
        "description": "hội chứng dress, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "hoi_chung_dress_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng DRESS",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "hoi_chung_dress_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng DRESS",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng DRESS (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng DRESS - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng DRESS",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Hội chứng DRESS",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng DRESS: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng DRESS",
        "searchKeyword": "hội chứng dress"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng DRESS",
        "searchKeyword": "hội chứng dress"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng DRESS",
        "searchKeyword": "hội chứng dress"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng DRESS",
        "searchKeyword": "hội chứng dress"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng DRESS",
        "searchKeyword": "hội chứng dress"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng DRESS",
        "searchKeyword": "hội chứng dress"
      }
    ]
  },
  "hoi_chung_stevens_johnson_sjs": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Stevens-Johnson (SJS)",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Stevens-Johnson (SJS).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "hoi_chung_stevens_johnson_sjs_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Stevens-Johnson (SJS)",
        "description": "hội chứng stevens-johnson (sjs), da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "hoi_chung_stevens_johnson_sjs_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Stevens-Johnson (SJS)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "hoi_chung_stevens_johnson_sjs_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Stevens-Johnson (SJS)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Stevens-Johnson (SJS) (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Stevens-Johnson (SJS) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Stevens-Johnson (SJS)",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Hội chứng Stevens-Johnson (SJS)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Stevens-Johnson (SJS): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Stevens-Johnson (SJS)",
        "searchKeyword": "hội chứng stevens-johnson (sjs)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Stevens-Johnson (SJS)",
        "searchKeyword": "hội chứng stevens-johnson (sjs)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Stevens-Johnson (SJS)",
        "searchKeyword": "hội chứng stevens-johnson (sjs)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Stevens-Johnson (SJS)",
        "searchKeyword": "hội chứng stevens-johnson (sjs)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Stevens-Johnson (SJS)",
        "searchKeyword": "hội chứng stevens-johnson (sjs)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Stevens-Johnson (SJS)",
        "searchKeyword": "hội chứng stevens-johnson (sjs)"
      }
    ]
  },
  "me_day_urticaria": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Mề đay (Urticaria)",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Mề đay (Urticaria).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "me_day_urticaria_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Mề đay (Urticaria)",
        "description": "mề đay (urticaria), da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "me_day_urticaria_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Mề đay (Urticaria)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "me_day_urticaria_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Mề đay (Urticaria)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Mề đay (Urticaria) (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Mề đay (Urticaria) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Mề đay (Urticaria)",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Mề đay (Urticaria)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Mề đay (Urticaria): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Mề đay (Urticaria)",
        "searchKeyword": "mề đay (urticaria)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Mề đay (Urticaria)",
        "searchKeyword": "mề đay (urticaria)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Mề đay (Urticaria)",
        "searchKeyword": "mề đay (urticaria)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Mề đay (Urticaria)",
        "searchKeyword": "mề đay (urticaria)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Mề đay (Urticaria)",
        "searchKeyword": "mề đay (urticaria)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Mề đay (Urticaria)",
        "searchKeyword": "mề đay (urticaria)"
      }
    ]
  },
  "pemphigoid": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Pemphigoid",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Pemphigoid.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "pemphigoid_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Pemphigoid",
        "description": "pemphigoid, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "pemphigoid_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Pemphigoid",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "pemphigoid_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Pemphigoid",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Pemphigoid (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Pemphigoid - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Pemphigoid",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Pemphigoid",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Pemphigoid: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Pemphigoid",
        "searchKeyword": "pemphigoid"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Pemphigoid",
        "searchKeyword": "pemphigoid"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Pemphigoid",
        "searchKeyword": "pemphigoid"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Pemphigoid",
        "searchKeyword": "pemphigoid"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Pemphigoid",
        "searchKeyword": "pemphigoid"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Pemphigoid",
        "searchKeyword": "pemphigoid"
      }
    ]
  },
  "viem_da_co_dia": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm da cơ địa",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm da cơ địa.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "viem_da_co_dia_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm da cơ địa",
        "description": "viêm da cơ địa, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_da_co_dia_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm da cơ địa",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_da_co_dia_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm da cơ địa",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm da cơ địa (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm da cơ địa - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm da cơ địa",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Viêm da cơ địa",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm da cơ địa: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm da cơ địa",
        "searchKeyword": "viêm da cơ địa"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm da cơ địa",
        "searchKeyword": "viêm da cơ địa"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm da cơ địa",
        "searchKeyword": "viêm da cơ địa"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm da cơ địa",
        "searchKeyword": "viêm da cơ địa"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm da cơ địa",
        "searchKeyword": "viêm da cơ địa"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm da cơ địa",
        "searchKeyword": "viêm da cơ địa"
      }
    ]
  },
  "viem_da_tiep_xuc": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm da tiếp xúc",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm da tiếp xúc.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "viem_da_tiep_xuc_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm da tiếp xúc",
        "description": "viêm da tiếp xúc, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_da_tiep_xuc_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm da tiếp xúc",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_da_tiep_xuc_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm da tiếp xúc",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm da tiếp xúc (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm da tiếp xúc - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm da tiếp xúc",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Viêm da tiếp xúc",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm da tiếp xúc: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm da tiếp xúc",
        "searchKeyword": "viêm da tiếp xúc"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm da tiếp xúc",
        "searchKeyword": "viêm da tiếp xúc"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm da tiếp xúc",
        "searchKeyword": "viêm da tiếp xúc"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm da tiếp xúc",
        "searchKeyword": "viêm da tiếp xúc"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm da tiếp xúc",
        "searchKeyword": "viêm da tiếp xúc"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm da tiếp xúc",
        "searchKeyword": "viêm da tiếp xúc"
      }
    ]
  },
  "viem_mo_te_bao": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm mô tế bào",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm mô tế bào.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "viem_mo_te_bao_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm mô tế bào",
        "description": "viêm mô tế bào, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_mo_te_bao_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm mô tế bào",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_mo_te_bao_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm mô tế bào",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm mô tế bào (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm mô tế bào - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm mô tế bào",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Viêm mô tế bào",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm mô tế bào: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm mô tế bào",
        "searchKeyword": "viêm mô tế bào"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm mô tế bào",
        "searchKeyword": "viêm mô tế bào"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm mô tế bào",
        "searchKeyword": "viêm mô tế bào"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm mô tế bào",
        "searchKeyword": "viêm mô tế bào"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm mô tế bào",
        "searchKeyword": "viêm mô tế bào"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm mô tế bào",
        "searchKeyword": "viêm mô tế bào"
      }
    ]
  },
  "viem_sun_suon_costochondritis": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm sụn sườn (Costochondritis)",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm sụn sườn (Costochondritis).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "viem_sun_suon_costochondritis_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm sụn sườn (Costochondritis)",
        "description": "viêm sụn sườn (costochondritis), da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_sun_suon_costochondritis_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm sụn sườn (Costochondritis)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "viem_sun_suon_costochondritis_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm sụn sườn (Costochondritis)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm sụn sườn (Costochondritis) (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm sụn sườn (Costochondritis) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm sụn sườn (Costochondritis)",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Viêm sụn sườn (Costochondritis)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm sụn sườn (Costochondritis): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm sụn sườn (Costochondritis)",
        "searchKeyword": "viêm sụn sườn (costochondritis)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm sụn sườn (Costochondritis)",
        "searchKeyword": "viêm sụn sườn (costochondritis)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm sụn sườn (Costochondritis)",
        "searchKeyword": "viêm sụn sườn (costochondritis)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm sụn sườn (Costochondritis)",
        "searchKeyword": "viêm sụn sườn (costochondritis)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm sụn sườn (Costochondritis)",
        "searchKeyword": "viêm sụn sườn (costochondritis)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm sụn sườn (Costochondritis)",
        "searchKeyword": "viêm sụn sườn (costochondritis)"
      }
    ]
  },
  "viem_dong_mach_thai_duong": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm động mạch thái dương",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm động mạch thái dương.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "viem_dong_mach_thai_duong_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm động mạch thái dương",
        "description": "viêm động mạch thái dương, tim mạch, da liễu - cơ xương khớp",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "viem_dong_mach_thai_duong_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm động mạch thái dương",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "viem_dong_mach_thai_duong_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm động mạch thái dương",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm động mạch thái dương (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm động mạch thái dương - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm động mạch thái dương",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Viêm động mạch thái dương",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm động mạch thái dương: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm động mạch thái dương",
        "searchKeyword": "viêm động mạch thái dương"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm động mạch thái dương",
        "searchKeyword": "viêm động mạch thái dương"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm động mạch thái dương",
        "searchKeyword": "viêm động mạch thái dương"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm động mạch thái dương",
        "searchKeyword": "viêm động mạch thái dương"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm động mạch thái dương",
        "searchKeyword": "viêm động mạch thái dương"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm động mạch thái dương",
        "searchKeyword": "viêm động mạch thái dương"
      }
    ]
  },
  "vay_nen": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Vảy nến",
    "specialty": "Da liễu - Cơ xương khớp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Vảy nến.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Da liễu - Cơ xương khớp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Da liễu - Cơ xương khớp)"
    },
    "criteria": [
      {
        "id": "vay_nen_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Vảy nến",
        "description": "vảy nến, da liễu - cơ xương khớp",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "vay_nen_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Vảy nến",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      },
      {
        "id": "vay_nen_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Vảy nến",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Da liễu - Cơ xương khớp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Vảy nến (Da liễu - Cơ xương khớp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Vảy nến - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Vảy nến",
          "class": "Thuốc đặc hiệu chuyên khoa Da liễu - Cơ xương khớp",
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
        "name": "Biến chứng cấp tính của Vảy nến",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Vảy nến: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Vảy nến",
        "searchKeyword": "vảy nến"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Vảy nến",
        "searchKeyword": "vảy nến"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Vảy nến",
        "searchKeyword": "vảy nến"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Vảy nến",
        "searchKeyword": "vảy nến"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Vảy nến",
        "searchKeyword": "vảy nến"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Vảy nến",
        "searchKeyword": "vảy nến"
      }
    ]
  },
  "bach_cau_cap_leukemia": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bạch cầu cấp (Leukemia)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bạch cầu cấp (Leukemia).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "bach_cau_cap_leukemia_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bạch cầu cấp (Leukemia)",
        "description": "bạch cầu cấp (leukemia), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "bach_cau_cap_leukemia_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bạch cầu cấp (Leukemia)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "bach_cau_cap_leukemia_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bạch cầu cấp (Leukemia)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bạch cầu cấp (Leukemia) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bạch cầu cấp (Leukemia) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bạch cầu cấp (Leukemia)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Bạch cầu cấp (Leukemia)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bạch cầu cấp (Leukemia): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bạch cầu cấp (Leukemia)",
        "searchKeyword": "bạch cầu cấp (leukemia)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bạch cầu cấp (Leukemia)",
        "searchKeyword": "bạch cầu cấp (leukemia)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bạch cầu cấp (Leukemia)",
        "searchKeyword": "bạch cầu cấp (leukemia)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bạch cầu cấp (Leukemia)",
        "searchKeyword": "bạch cầu cấp (leukemia)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bạch cầu cấp (Leukemia)",
        "searchKeyword": "bạch cầu cấp (leukemia)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bạch cầu cấp (Leukemia)",
        "searchKeyword": "bạch cầu cấp (leukemia)"
      }
    ]
  },
  "benh_hong_cau_hinh_liem": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh hồng cầu hình liềm",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh hồng cầu hình liềm.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "benh_hong_cau_hinh_liem_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh hồng cầu hình liềm",
        "description": "bệnh hồng cầu hình liềm, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_hong_cau_hinh_liem_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh hồng cầu hình liềm",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_hong_cau_hinh_liem_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh hồng cầu hình liềm",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh hồng cầu hình liềm (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh hồng cầu hình liềm - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh hồng cầu hình liềm",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Bệnh hồng cầu hình liềm",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh hồng cầu hình liềm: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh hồng cầu hình liềm",
        "searchKeyword": "bệnh hồng cầu hình liềm"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh hồng cầu hình liềm",
        "searchKeyword": "bệnh hồng cầu hình liềm"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh hồng cầu hình liềm",
        "searchKeyword": "bệnh hồng cầu hình liềm"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh hồng cầu hình liềm",
        "searchKeyword": "bệnh hồng cầu hình liềm"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh hồng cầu hình liềm",
        "searchKeyword": "bệnh hồng cầu hình liềm"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh hồng cầu hình liềm",
        "searchKeyword": "bệnh hồng cầu hình liềm"
      }
    ]
  },
  "benh_still": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Still",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh Still.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "benh_still_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh Still",
        "description": "bệnh still, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_still_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh Still",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_still_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh Still",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Still (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Still - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Still",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Bệnh Still",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Still: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Still",
        "searchKeyword": "bệnh still"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Still",
        "searchKeyword": "bệnh still"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Still",
        "searchKeyword": "bệnh still"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Still",
        "searchKeyword": "bệnh still"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Still",
        "searchKeyword": "bệnh still"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Still",
        "searchKeyword": "bệnh still"
      }
    ]
  },
  "benh_u_hat_sarcoidosis": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh u hạt (Sarcoidosis)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh u hạt (Sarcoidosis).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "benh_u_hat_sarcoidosis_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh u hạt (Sarcoidosis)",
        "description": "bệnh u hạt (sarcoidosis), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_u_hat_sarcoidosis_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh u hạt (Sarcoidosis)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_u_hat_sarcoidosis_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh u hạt (Sarcoidosis)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh u hạt (Sarcoidosis) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh u hạt (Sarcoidosis) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh u hạt (Sarcoidosis)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Bệnh u hạt (Sarcoidosis)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh u hạt (Sarcoidosis): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh u hạt (Sarcoidosis)",
        "searchKeyword": "bệnh u hạt (sarcoidosis)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh u hạt (Sarcoidosis)",
        "searchKeyword": "bệnh u hạt (sarcoidosis)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh u hạt (Sarcoidosis)",
        "searchKeyword": "bệnh u hạt (sarcoidosis)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh u hạt (Sarcoidosis)",
        "searchKeyword": "bệnh u hạt (sarcoidosis)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh u hạt (Sarcoidosis)",
        "searchKeyword": "bệnh u hạt (sarcoidosis)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh u hạt (Sarcoidosis)",
        "searchKeyword": "bệnh u hạt (sarcoidosis)"
      }
    ]
  },
  "benh_von_willebrand": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh von Willebrand",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh von Willebrand.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "benh_von_willebrand_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh von Willebrand",
        "description": "bệnh von willebrand, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_von_willebrand_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh von Willebrand",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "benh_von_willebrand_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh von Willebrand",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh von Willebrand (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh von Willebrand - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh von Willebrand",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Bệnh von Willebrand",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh von Willebrand: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh von Willebrand",
        "searchKeyword": "bệnh von willebrand"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh von Willebrand",
        "searchKeyword": "bệnh von willebrand"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh von Willebrand",
        "searchKeyword": "bệnh von willebrand"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh von Willebrand",
        "searchKeyword": "bệnh von willebrand"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh von Willebrand",
        "searchKeyword": "bệnh von willebrand"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh von Willebrand",
        "searchKeyword": "bệnh von willebrand"
      }
    ]
  },
  "hemophilia": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hemophilia",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hemophilia.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "hemophilia_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hemophilia",
        "description": "hemophilia, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hemophilia_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hemophilia",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hemophilia_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hemophilia",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hemophilia (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hemophilia - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hemophilia",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Hemophilia",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hemophilia: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hemophilia",
        "searchKeyword": "hemophilia"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hemophilia",
        "searchKeyword": "hemophilia"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hemophilia",
        "searchKeyword": "hemophilia"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hemophilia",
        "searchKeyword": "hemophilia"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hemophilia",
        "searchKeyword": "hemophilia"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hemophilia",
        "searchKeyword": "hemophilia"
      }
    ]
  },
  "lupus_ban_do_he_thong_sle": {
    "icdCode": "M32",
    "icdPrefixes": [
      "M32"
    ],
    "diseaseName": "Lupus ban đỏ hệ thống (SLE)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Lupus ban đỏ hệ thống (SLE).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "lupus_ban_do_he_thong_sle_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Lupus ban đỏ hệ thống (SLE)",
        "description": "lupus ban đỏ hệ thống (sle), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "lupus_ban_do_he_thong_sle_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Lupus ban đỏ hệ thống (SLE)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "lupus_ban_do_he_thong_sle_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Lupus ban đỏ hệ thống (SLE)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Lupus ban đỏ hệ thống (SLE) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Lupus ban đỏ hệ thống (SLE) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Lupus ban đỏ hệ thống (SLE)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Lupus ban đỏ hệ thống (SLE)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Lupus ban đỏ hệ thống (SLE): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Lupus ban đỏ hệ thống (SLE)",
        "searchKeyword": "lupus ban đỏ hệ thống (sle)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Lupus ban đỏ hệ thống (SLE)",
        "searchKeyword": "lupus ban đỏ hệ thống (sle)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Lupus ban đỏ hệ thống (SLE)",
        "searchKeyword": "lupus ban đỏ hệ thống (sle)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Lupus ban đỏ hệ thống (SLE)",
        "searchKeyword": "lupus ban đỏ hệ thống (sle)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Lupus ban đỏ hệ thống (SLE)",
        "searchKeyword": "lupus ban đỏ hệ thống (sle)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Lupus ban đỏ hệ thống (SLE)",
        "searchKeyword": "lupus ban đỏ hệ thống (sle)"
      }
    ]
  },
  "ngo_doc_chi": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Ngộ độc chì",
    "specialty": "Huyết học - Truyền máu",
    "severity": "emergency",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Ngộ độc chì.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "ngo_doc_chi_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Ngộ độc chì",
        "description": "ngộ độc chì, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "ngo_doc_chi_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Ngộ độc chì",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "ngo_doc_chi_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Ngộ độc chì",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Ngộ độc chì (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Ngộ độc chì - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Ngộ độc chì",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Ngộ độc chì",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Ngộ độc chì: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Ngộ độc chì",
        "searchKeyword": "ngộ độc chì"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Ngộ độc chì",
        "searchKeyword": "ngộ độc chì"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Ngộ độc chì",
        "searchKeyword": "ngộ độc chì"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Ngộ độc chì",
        "searchKeyword": "ngộ độc chì"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Ngộ độc chì",
        "searchKeyword": "ngộ độc chì"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Ngộ độc chì",
        "searchKeyword": "ngộ độc chì"
      }
    ]
  },
  "suy_tuy": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Suy tủy",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Suy tủy.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "suy_tuy_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Suy tủy",
        "description": "suy tủy, thần kinh, huyết học - ung thư",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "suy_tuy_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Suy tủy",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "suy_tuy_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Suy tủy",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Suy tủy (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Suy tủy - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Suy tủy",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Suy tủy",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Suy tủy: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Suy tủy",
        "searchKeyword": "suy tủy"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Suy tủy",
        "searchKeyword": "suy tủy"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Suy tủy",
        "searchKeyword": "suy tủy"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Suy tủy",
        "searchKeyword": "suy tủy"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Suy tủy",
        "searchKeyword": "suy tủy"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Suy tủy",
        "searchKeyword": "suy tủy"
      }
    ]
  },
  "thalassemia": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thalassemia",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thalassemia.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "thalassemia_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thalassemia",
        "description": "thalassemia, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thalassemia_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thalassemia",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thalassemia_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thalassemia",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thalassemia (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thalassemia - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thalassemia",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Thalassemia",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thalassemia: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thalassemia",
        "searchKeyword": "thalassemia"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thalassemia",
        "searchKeyword": "thalassemia"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thalassemia",
        "searchKeyword": "thalassemia"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thalassemia",
        "searchKeyword": "thalassemia"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thalassemia",
        "searchKeyword": "thalassemia"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thalassemia",
        "searchKeyword": "thalassemia"
      }
    ]
  },
  "thieu_mau_nguyen_bao_sat_sideroblastic": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thiếu máu nguyên bào sắt (sideroblastic)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thiếu máu nguyên bào sắt (sideroblastic).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "thieu_mau_nguyen_bao_sat_sideroblastic_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thiếu máu nguyên bào sắt (sideroblastic)",
        "description": "thiếu máu nguyên bào sắt (sideroblastic), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_nguyen_bao_sat_sideroblastic_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thiếu máu nguyên bào sắt (sideroblastic)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_nguyen_bao_sat_sideroblastic_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thiếu máu nguyên bào sắt (sideroblastic)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu máu nguyên bào sắt (sideroblastic) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu máu nguyên bào sắt (sideroblastic) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu máu nguyên bào sắt (sideroblastic)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Thiếu máu nguyên bào sắt (sideroblastic)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu máu nguyên bào sắt (sideroblastic): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu máu nguyên bào sắt (sideroblastic)",
        "searchKeyword": "thiếu máu nguyên bào sắt (sideroblastic)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu máu nguyên bào sắt (sideroblastic)",
        "searchKeyword": "thiếu máu nguyên bào sắt (sideroblastic)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu máu nguyên bào sắt (sideroblastic)",
        "searchKeyword": "thiếu máu nguyên bào sắt (sideroblastic)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu máu nguyên bào sắt (sideroblastic)",
        "searchKeyword": "thiếu máu nguyên bào sắt (sideroblastic)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu máu nguyên bào sắt (sideroblastic)",
        "searchKeyword": "thiếu máu nguyên bào sắt (sideroblastic)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu máu nguyên bào sắt (sideroblastic)",
        "searchKeyword": "thiếu máu nguyên bào sắt (sideroblastic)"
      }
    ]
  },
  "thieu_mau_thieu_sat": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thiếu máu thiếu sắt",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thiếu máu thiếu sắt.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "thieu_mau_thieu_sat_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thiếu máu thiếu sắt",
        "description": "thiếu máu thiếu sắt, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_thieu_sat_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thiếu máu thiếu sắt",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_thieu_sat_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thiếu máu thiếu sắt",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu máu thiếu sắt (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu máu thiếu sắt - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu máu thiếu sắt",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Thiếu máu thiếu sắt",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu máu thiếu sắt: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu máu thiếu sắt",
        "searchKeyword": "thiếu máu thiếu sắt"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu máu thiếu sắt",
        "searchKeyword": "thiếu máu thiếu sắt"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu máu thiếu sắt",
        "searchKeyword": "thiếu máu thiếu sắt"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu máu thiếu sắt",
        "searchKeyword": "thiếu máu thiếu sắt"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu máu thiếu sắt",
        "searchKeyword": "thiếu máu thiếu sắt"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu máu thiếu sắt",
        "searchKeyword": "thiếu máu thiếu sắt"
      }
    ]
  },
  "thieu_mau_tan_huyet": {
    "icdCode": "D59",
    "icdPrefixes": [
      "D59",
      "D58",
      "D55"
    ],
    "diseaseName": "Thiếu máu tán huyết",
    "specialty": "Huyết học - Truyền máu",
    "severity": "emergency",
    "summary": "Thiếu máu tán huyết là tình trạng đời sống của hồng cầu bị rút ngắn dưới 120 ngày do bị phá hủy sớm trong hoặc ngoài lòng mạch vượt quá khả năng bù trừ của tủy xương. Bộ ba xét nghiệm sinh hóa then chốt để xác định tán huyết gồm: (1) Tăng Bilirubin gián tiếp, (2) Tăng Lactate Dehydrogenase (LDH), và (3) Giảm sút nghiêm trọng Haptoglobin huyết thanh. Phân biệt nguyên nhân dựa vào Hình thái phết máu ngoại biên và Nghiệm pháp Coombs trực tiếp (DAT).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "thieu_mau_tan_huyet_c6"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "thieu_mau_tan_huyet_c1",
        "type": "lab",
        "label": "- \\text{RPI} > 2.0 - 3.0: Tủy xương đáp ứng sinh máu bù trừ thích hợp cho tình trạng tán huyết hoặc mất máu cấp.",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c2",
        "type": "lab",
        "label": "- \\text{RPI} < 2.0: Thiếu máu do giảm sinh tại tủy (Suy tủy, thiếu nguyên liệu sắt/B12, rối loạn sinh tủy MDS).",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c3",
        "type": "lab",
        "label": "1. Câu hỏi: Bộ 3 xét nghiệm sinh hóa máu nào có giá trị khẳng định tình trạng Tăng phá hủy hồng cầu trong thiếu máu tán huyết?",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c4",
        "type": "imaging",
        "label": "- Đáp án: (1) Bilirubin gián tiếp tăng cao, (2) Lactate Dehydrogenase (LDH) tăng vọt, và (3) Haptoglobin huyết thanh giảm sút nặng hoặc mất hoàn toàn.",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c5",
        "type": "lab",
        "label": "2. Câu hỏi: Tại sao Corticosteroid và phẫu thuật Cắt lách lại có hiệu quả điều trị vượt trội trong Thiếu máu tán huyết tự miễn thể ấm (Warm AIHA) nhưng lại hoàn toàn vô hiệu tr",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c6",
        "type": "mandatory",
        "label": "- Đáp án: Vì Warm AIHA do kháng thể IgG gây tán huyết ngoại mạch chủ yếu diễn ra tại Lách (nơi Corticoid ức chế đại thực bào và cắt lách loại bỏ ổ tiêu hủy). Ngược lại tron",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c7",
        "type": "lab",
        "label": "3. Câu hỏi: Hình ảnh \"Mảnh vỡ hồng cầu\" (Schistocytes / Helmet cells) chiếm tỷ lệ > 1\\% trên phết máu ngoại biên là dấu chỉ điểm đặc hiệu cho nhóm bệnh lý nào?",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_tan_huyet_c8",
        "type": "lab",
        "label": "- Đáp án: Thiếu máu tán huyết vi mạch (Microangiopathic Hemolytic Anemia - MAHA), điển hình trong Xuất huyết giảm tiểu cầu huyết khối (TTP), Hội chứng HUS, Đông máu nội mạc",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu máu tán huyết (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu máu tán huyết - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu máu tán huyết",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Thiếu máu tán huyết",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu máu tán huyết: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu máu tán huyết",
        "searchKeyword": "thiếu máu tán huyết"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu máu tán huyết",
        "searchKeyword": "thiếu máu tán huyết"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu máu tán huyết",
        "searchKeyword": "thiếu máu tán huyết"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu máu tán huyết",
        "searchKeyword": "thiếu máu tán huyết"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu máu tán huyết",
        "searchKeyword": "thiếu máu tán huyết"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu máu tán huyết",
        "searchKeyword": "thiếu máu tán huyết"
      }
    ]
  },
  "u_buong_trung": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U buồng trứng",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U buồng trứng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "u_buong_trung_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U buồng trứng",
        "description": "u buồng trứng, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_buong_trung_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U buồng trứng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_buong_trung_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U buồng trứng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U buồng trứng (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U buồng trứng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U buồng trứng",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của U buồng trứng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U buồng trứng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U buồng trứng",
        "searchKeyword": "u buồng trứng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U buồng trứng",
        "searchKeyword": "u buồng trứng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U buồng trứng",
        "searchKeyword": "u buồng trứng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U buồng trứng",
        "searchKeyword": "u buồng trứng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U buồng trứng",
        "searchKeyword": "u buồng trứng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U buồng trứng",
        "searchKeyword": "u buồng trứng"
      }
    ]
  },
  "u_da_day": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U dạ dày",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U dạ dày.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "u_da_day_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U dạ dày",
        "description": "u dạ dày, tiêu hóa - gan mật, huyết học - ung thư",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "u_da_day_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U dạ dày",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "u_da_day_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U dạ dày",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U dạ dày (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U dạ dày - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U dạ dày",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của U dạ dày",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U dạ dày: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U dạ dày",
        "searchKeyword": "u dạ dày"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U dạ dày",
        "searchKeyword": "u dạ dày"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U dạ dày",
        "searchKeyword": "u dạ dày"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U dạ dày",
        "searchKeyword": "u dạ dày"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U dạ dày",
        "searchKeyword": "u dạ dày"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U dạ dày",
        "searchKeyword": "u dạ dày"
      }
    ]
  },
  "u_lympho_lymphoma": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U Lympho (Lymphoma)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U Lympho (Lymphoma).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "u_lympho_lymphoma_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U Lympho (Lymphoma)",
        "description": "u lympho (lymphoma), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_lympho_lymphoma_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U Lympho (Lymphoma)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_lympho_lymphoma_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U Lympho (Lymphoma)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U Lympho (Lymphoma) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U Lympho (Lymphoma) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U Lympho (Lymphoma)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của U Lympho (Lymphoma)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U Lympho (Lymphoma): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U Lympho (Lymphoma)",
        "searchKeyword": "u lympho (lymphoma)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U Lympho (Lymphoma)",
        "searchKeyword": "u lympho (lymphoma)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U Lympho (Lymphoma)",
        "searchKeyword": "u lympho (lymphoma)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U Lympho (Lymphoma)",
        "searchKeyword": "u lympho (lymphoma)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U Lympho (Lymphoma)",
        "searchKeyword": "u lympho (lymphoma)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U Lympho (Lymphoma)",
        "searchKeyword": "u lympho (lymphoma)"
      }
    ]
  },
  "u_manh_trang": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U manh tràng",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U manh tràng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "u_manh_trang_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U manh tràng",
        "description": "u manh tràng, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_manh_trang_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U manh tràng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_manh_trang_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U manh tràng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U manh tràng (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U manh tràng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U manh tràng",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của U manh tràng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U manh tràng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U manh tràng",
        "searchKeyword": "u manh tràng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U manh tràng",
        "searchKeyword": "u manh tràng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U manh tràng",
        "searchKeyword": "u manh tràng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U manh tràng",
        "searchKeyword": "u manh tràng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U manh tràng",
        "searchKeyword": "u manh tràng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U manh tràng",
        "searchKeyword": "u manh tràng"
      }
    ]
  },
  "u_nao": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U não",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U não.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "u_nao_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U não",
        "description": "u não, thần kinh, huyết học - ung thư",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "u_nao_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U não",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "u_nao_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U não",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U não (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U não - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U não",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của U não",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U não: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U não",
        "searchKeyword": "u não"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U não",
        "searchKeyword": "u não"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U não",
        "searchKeyword": "u não"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U não",
        "searchKeyword": "u não"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U não",
        "searchKeyword": "u não"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U não",
        "searchKeyword": "u não"
      }
    ]
  },
  "u_than": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U thận",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U thận.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "u_than_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U thận",
        "description": "u thận, thận - tiết niệu, huyết học - ung thư",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "u_than_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U thận",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "u_than_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U thận",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U thận (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U thận - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U thận",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của U thận",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U thận: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U thận",
        "searchKeyword": "u thận"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U thận",
        "searchKeyword": "u thận"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U thận",
        "searchKeyword": "u thận"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U thận",
        "searchKeyword": "u thận"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U thận",
        "searchKeyword": "u thận"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U thận",
        "searchKeyword": "u thận"
      }
    ]
  },
  "u_dai_trang": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U đại tràng",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U đại tràng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "u_dai_trang_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U đại tràng",
        "description": "u đại tràng, huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_dai_trang_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U đại tràng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "u_dai_trang_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U đại tràng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U đại tràng (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U đại tràng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U đại tràng",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của U đại tràng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U đại tràng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U đại tràng",
        "searchKeyword": "u đại tràng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U đại tràng",
        "searchKeyword": "u đại tràng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U đại tràng",
        "searchKeyword": "u đại tràng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U đại tràng",
        "searchKeyword": "u đại tràng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U đại tràng",
        "searchKeyword": "u đại tràng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U đại tràng",
        "searchKeyword": "u đại tràng"
      }
    ]
  },
  "xuat_huyet_giam_tieu_cau_huyet_khoi_ttp": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Xuất huyết giảm tiểu cầu huyết khối (TTP)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Xuất huyết giảm tiểu cầu huyết khối (TTP).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "xuat_huyet_giam_tieu_cau_huyet_khoi_ttp_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "description": "xuất huyết giảm tiểu cầu huyết khối (ttp), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "xuat_huyet_giam_tieu_cau_huyet_khoi_ttp_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "xuat_huyet_giam_tieu_cau_huyet_khoi_ttp_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xuất huyết giảm tiểu cầu huyết khối (TTP) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Xuất huyết giảm tiểu cầu huyết khối (TTP) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Xuất huyết giảm tiểu cầu huyết khối (TTP)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Xuất huyết giảm tiểu cầu huyết khối (TTP): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu huyết khối (ttp)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu huyết khối (ttp)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu huyết khối (ttp)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu huyết khối (ttp)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu huyết khối (ttp)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Xuất huyết giảm tiểu cầu huyết khối (TTP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu huyết khối (ttp)"
      }
    ]
  },
  "xuat_huyet_giam_tieu_cau_mien_dich_itp": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Xuất huyết giảm tiểu cầu miễn dịch (ITP).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "xuat_huyet_giam_tieu_cau_mien_dich_itp_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "description": "xuất huyết giảm tiểu cầu miễn dịch (itp), huyết học - truyền máu, huyết học - ung thư",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "xuat_huyet_giam_tieu_cau_mien_dich_itp_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "xuat_huyet_giam_tieu_cau_mien_dich_itp_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xuất huyết giảm tiểu cầu miễn dịch (ITP) (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Xuất huyết giảm tiểu cầu miễn dịch (ITP) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Xuất huyết giảm tiểu cầu miễn dịch (ITP): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu miễn dịch (itp)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu miễn dịch (itp)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu miễn dịch (itp)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu miễn dịch (itp)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu miễn dịch (itp)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Xuất huyết giảm tiểu cầu miễn dịch (ITP)",
        "searchKeyword": "xuất huyết giảm tiểu cầu miễn dịch (itp)"
      }
    ]
  },
  "da_u_tuy_xuong": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Đa u tủy xương",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Đa u tủy xương.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "da_u_tuy_xuong_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Đa u tủy xương",
        "description": "đa u tủy xương, thần kinh, huyết học - ung thư",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "da_u_tuy_xuong_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Đa u tủy xương",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "da_u_tuy_xuong_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Đa u tủy xương",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Đa u tủy xương (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Đa u tủy xương - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Đa u tủy xương",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Đa u tủy xương",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Đa u tủy xương: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Đa u tủy xương",
        "searchKeyword": "đa u tủy xương"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Đa u tủy xương",
        "searchKeyword": "đa u tủy xương"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Đa u tủy xương",
        "searchKeyword": "đa u tủy xương"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Đa u tủy xương",
        "searchKeyword": "đa u tủy xương"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Đa u tủy xương",
        "searchKeyword": "đa u tủy xương"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Đa u tủy xương",
        "searchKeyword": "đa u tủy xương"
      }
    ]
  },
  "dong_mau_noi_mach_lan_toa_dic": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Đông máu nội mạch lan tỏa (DIC)",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Đông máu nội mạch lan tỏa (DIC).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "dong_mau_noi_mach_lan_toa_dic_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Đông máu nội mạch lan tỏa (DIC)",
        "description": "đông máu nội mạch lan tỏa (dic), tim mạch, huyết học - ung thư",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dong_mau_noi_mach_lan_toa_dic_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Đông máu nội mạch lan tỏa (DIC)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dong_mau_noi_mach_lan_toa_dic_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Đông máu nội mạch lan tỏa (DIC)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Đông máu nội mạch lan tỏa (DIC) (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Đông máu nội mạch lan tỏa (DIC) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Đông máu nội mạch lan tỏa (DIC)",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Đông máu nội mạch lan tỏa (DIC)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Đông máu nội mạch lan tỏa (DIC): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Đông máu nội mạch lan tỏa (DIC)",
        "searchKeyword": "đông máu nội mạch lan tỏa (dic)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Đông máu nội mạch lan tỏa (DIC)",
        "searchKeyword": "đông máu nội mạch lan tỏa (dic)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Đông máu nội mạch lan tỏa (DIC)",
        "searchKeyword": "đông máu nội mạch lan tỏa (dic)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Đông máu nội mạch lan tỏa (DIC)",
        "searchKeyword": "đông máu nội mạch lan tỏa (dic)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Đông máu nội mạch lan tỏa (DIC)",
        "searchKeyword": "đông máu nội mạch lan tỏa (dic)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Đông máu nội mạch lan tỏa (DIC)",
        "searchKeyword": "đông máu nội mạch lan tỏa (dic)"
      }
    ]
  },
  "benh_lao": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh lao",
    "specialty": "Hô hấp",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh lao.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "benh_lao_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh lao",
        "description": "bệnh lao, hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "benh_lao_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh lao",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "benh_lao_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh lao",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh lao (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh lao - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh lao",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Bệnh lao",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh lao: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh lao",
        "searchKeyword": "bệnh lao"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh lao",
        "searchKeyword": "bệnh lao"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh lao",
        "searchKeyword": "bệnh lao"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh lao",
        "searchKeyword": "bệnh lao"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh lao",
        "searchKeyword": "bệnh lao"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh lao",
        "searchKeyword": "bệnh lao"
      }
    ]
  },
  "copd": {
    "icdCode": "J44",
    "icdPrefixes": [
      "J44"
    ],
    "diseaseName": "COPD",
    "specialty": "Hô hấp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho COPD.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "copd_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của COPD",
        "description": "copd, hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "copd_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định COPD",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "copd_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong COPD",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị COPD (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị COPD - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho COPD",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của COPD",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân COPD: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán COPD",
        "searchKeyword": "copd"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán COPD",
        "searchKeyword": "copd"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng COPD",
        "searchKeyword": "copd"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị COPD",
        "searchKeyword": "copd"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc COPD",
        "searchKeyword": "copd"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng COPD",
        "searchKeyword": "copd"
      }
    ]
  },
  "di_vat_duong_tho": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Dị vật đường thở",
    "specialty": "Hô hấp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Dị vật đường thở.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "di_vat_duong_tho_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Dị vật đường thở",
        "description": "dị vật đường thở, hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "di_vat_duong_tho_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Dị vật đường thở",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "di_vat_duong_tho_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Dị vật đường thở",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Dị vật đường thở (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Dị vật đường thở - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Dị vật đường thở",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Dị vật đường thở",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Dị vật đường thở: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Dị vật đường thở",
        "searchKeyword": "dị vật đường thở"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Dị vật đường thở",
        "searchKeyword": "dị vật đường thở"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Dị vật đường thở",
        "searchKeyword": "dị vật đường thở"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Dị vật đường thở",
        "searchKeyword": "dị vật đường thở"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Dị vật đường thở",
        "searchKeyword": "dị vật đường thở"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Dị vật đường thở",
        "searchKeyword": "dị vật đường thở"
      }
    ]
  },
  "gian_phe_quan": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Giãn phế quản",
    "specialty": "Hô hấp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Giãn phế quản.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "gian_phe_quan_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Giãn phế quản",
        "description": "giãn phế quản, hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "gian_phe_quan_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Giãn phế quản",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "gian_phe_quan_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Giãn phế quản",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Giãn phế quản (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Giãn phế quản - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Giãn phế quản",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Giãn phế quản",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Giãn phế quản: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Giãn phế quản",
        "searchKeyword": "giãn phế quản"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Giãn phế quản",
        "searchKeyword": "giãn phế quản"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Giãn phế quản",
        "searchKeyword": "giãn phế quản"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Giãn phế quản",
        "searchKeyword": "giãn phế quản"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Giãn phế quản",
        "searchKeyword": "giãn phế quản"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Giãn phế quản",
        "searchKeyword": "giãn phế quản"
      }
    ]
  },
  "hen": {
    "icdCode": "J45",
    "icdPrefixes": [
      "J45"
    ],
    "diseaseName": "Hen",
    "specialty": "Hô hấp",
    "severity": "routine",
    "summary": "120 lần/phút ở người lớn), nhịp thở nhanh (>30 lần/phút), co kéo cơ hô hấp phụ (cơ ức đòn chũm, cơ liên sườn), tím tái trung tâm và SpO2 giảm < 90-92%.",
    "goldStandard": "trong Chẩn đoán và Theo dõi",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "hen_c3",
        "hen_c6"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "hen_c1",
        "type": "major",
        "label": "- Hen dị ứng (Allergic asthma): Đây là kiểu hình lâm sàng dễ nhận diện nhất, thường khởi phát từ thời thơ ấu, đi kèm với các bệnh lý cơ địa dị ứng khác như chàm (eczema), vi",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c2",
        "type": "major",
        "label": "- Hen dạng ho (Cough variant asthma): Ở một số bệnh nhân (cả trẻ em và người lớn), triệu chứng duy nhất là ho mạn tính (thường là ho khan về đêm) mà không hề có tiếng khò khè",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c3",
        "type": "mandatory",
        "label": "- Hen kèm béo phì (Asthma with obesity): Biểu hiện bằng các triệu chứng hô hấp nổi rầm rộ, khó thở nhiều khi gắng sức. Tuy nhiên, cơ chế bệnh sinh của nhóm này chủ yếu do tác",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c4",
        "type": "minor",
        "label": "- Hen khởi phát ở người lớn (Adult-onset asthma): Thường gặp ở ==phụ nữ trưởng thành==, ít liên quan đến yếu tố cơ địa dị ứng. Kiểu hình này có khuynh hướng cần liều ICS cao hơ",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c5",
        "type": "minor",
        "label": "- Ứng dụng lâm sàng: Hô hấp ký giúp đánh giá thể tích khí thở ra gắng sức trong giây đầu (FEV1) và tỷ số FEV1/FVC. Để xác định tình trạng giới hạn luồng khí có hồi phục, bệnh n",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c6",
        "type": "mandatory",
        "label": "- Chẩn đoán phân biệt: Sự phục hồi hoàn toàn hoặc bình thường hóa FEV1/FVC sau khi dùng thuốc giãn phế quản rất đặc trưng cho hen, trong khi FEV1/FVC sau giãn phế quản < 0.7 (h",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c7",
        "type": "major",
        "label": "- Ứng dụng lâm sàng: Chẩn đoán hen được ủng hộ nếu PEF tăng \\geq 20% (người lớn) hoặc \\geq 15% (trẻ em) sau test giãn phế quản. Ngoài ra, việc bệnh nhân tự đo PEF 2 lần/ngà",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "hen_c8",
        "type": "lab",
        "label": "- Cơ chế bệnh sinh: Khi đường thở tiếp xúc dị nguyên, hệ miễn dịch phản ứng tạo ra các cytokine tiền viêm như IL-4 và IL-13. Các cytokine này kích hoạt mạnh mẽ men Nitric Oxide",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hen (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hen - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hen",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Hen",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hen: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hen",
        "searchKeyword": "hen"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hen",
        "searchKeyword": "hen"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hen",
        "searchKeyword": "hen"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hen",
        "searchKeyword": "hen"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hen",
        "searchKeyword": "hen"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hen",
        "searchKeyword": "hen"
      }
    ]
  },
  "hoi_chung_goodpasture": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Goodpasture",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Goodpasture.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "hoi_chung_goodpasture_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Goodpasture",
        "description": "hội chứng goodpasture, tim mạch, hô hấp",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_goodpasture_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Goodpasture",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_goodpasture_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Goodpasture",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Goodpasture (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Goodpasture - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Goodpasture",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Hội chứng Goodpasture",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Goodpasture: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Goodpasture",
        "searchKeyword": "hội chứng goodpasture"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Goodpasture",
        "searchKeyword": "hội chứng goodpasture"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Goodpasture",
        "searchKeyword": "hội chứng goodpasture"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Goodpasture",
        "searchKeyword": "hội chứng goodpasture"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Goodpasture",
        "searchKeyword": "hội chứng goodpasture"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Goodpasture",
        "searchKeyword": "hội chứng goodpasture"
      }
    ]
  },
  "hoi_chung_suy_ho_hap_cap_tien_trien_ards": {
    "icdCode": "J80",
    "icdPrefixes": [
      "J80",
      "R09"
    ],
    "diseaseName": "Hội chứng suy hô hấp cấp tiến triển (ARDS)",
    "specialty": "Tim mạch",
    "severity": "emergency",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng suy hô hấp cấp tiến triển (ARDS).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "hoi_chung_suy_ho_hap_cap_tien_trien_ards_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "description": "hội chứng suy hô hấp cấp tiến triển (ards), tim mạch, hô hấp",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_suy_ho_hap_cap_tien_trien_ards_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_suy_ho_hap_cap_tien_trien_ards_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng suy hô hấp cấp tiến triển (ARDS) (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng suy hô hấp cấp tiến triển (ARDS) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng suy hô hấp cấp tiến triển (ARDS)",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng suy hô hấp cấp tiến triển (ARDS): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "searchKeyword": "hội chứng suy hô hấp cấp tiến triển (ards)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "searchKeyword": "hội chứng suy hô hấp cấp tiến triển (ards)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "searchKeyword": "hội chứng suy hô hấp cấp tiến triển (ards)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "searchKeyword": "hội chứng suy hô hấp cấp tiến triển (ards)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "searchKeyword": "hội chứng suy hô hấp cấp tiến triển (ards)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng suy hô hấp cấp tiến triển (ARDS)",
        "searchKeyword": "hội chứng suy hô hấp cấp tiến triển (ards)"
      }
    ]
  },
  "thuyen_tac_phoi_pe": {
    "icdCode": "I26",
    "icdPrefixes": [
      "I26"
    ],
    "diseaseName": "Thuyên tắc phổi (PE)",
    "specialty": "Hô hấp",
    "severity": "emergency",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thuyên tắc phổi (PE).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "thuyen_tac_phoi_pe_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thuyên tắc phổi (PE)",
        "description": "thuyên tắc phổi (pe), tim mạch, hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "thuyen_tac_phoi_pe_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thuyên tắc phổi (PE)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "thuyen_tac_phoi_pe_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thuyên tắc phổi (PE)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thuyên tắc phổi (PE) (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thuyên tắc phổi (PE) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thuyên tắc phổi (PE)",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Thuyên tắc phổi (PE)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thuyên tắc phổi (PE): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thuyên tắc phổi (PE)",
        "searchKeyword": "thuyên tắc phổi (pe)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thuyên tắc phổi (PE)",
        "searchKeyword": "thuyên tắc phổi (pe)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thuyên tắc phổi (PE)",
        "searchKeyword": "thuyên tắc phổi (pe)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thuyên tắc phổi (PE)",
        "searchKeyword": "thuyên tắc phổi (pe)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thuyên tắc phổi (PE)",
        "searchKeyword": "thuyên tắc phổi (pe)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thuyên tắc phổi (PE)",
        "searchKeyword": "thuyên tắc phổi (pe)"
      }
    ]
  },
  "tran_khi_mang_phoi": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Tràn khí màng phổi",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Tràn khí màng phổi.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "tran_khi_mang_phoi_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Tràn khí màng phổi",
        "description": "tràn khí màng phổi, tim mạch, hô hấp",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tran_khi_mang_phoi_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Tràn khí màng phổi",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tran_khi_mang_phoi_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Tràn khí màng phổi",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Tràn khí màng phổi (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Tràn khí màng phổi - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Tràn khí màng phổi",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Tràn khí màng phổi",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Tràn khí màng phổi: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Tràn khí màng phổi",
        "searchKeyword": "tràn khí màng phổi"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Tràn khí màng phổi",
        "searchKeyword": "tràn khí màng phổi"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Tràn khí màng phổi",
        "searchKeyword": "tràn khí màng phổi"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Tràn khí màng phổi",
        "searchKeyword": "tràn khí màng phổi"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Tràn khí màng phổi",
        "searchKeyword": "tràn khí màng phổi"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Tràn khí màng phổi",
        "searchKeyword": "tràn khí màng phổi"
      }
    ]
  },
  "u_hat_wegener": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U hạt Wegener",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U hạt Wegener.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "u_hat_wegener_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U hạt Wegener",
        "description": "u hạt wegener, tim mạch, hô hấp",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "u_hat_wegener_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U hạt Wegener",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "u_hat_wegener_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U hạt Wegener",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U hạt Wegener (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U hạt Wegener - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U hạt Wegener",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của U hạt Wegener",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U hạt Wegener: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U hạt Wegener",
        "searchKeyword": "u hạt wegener"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U hạt Wegener",
        "searchKeyword": "u hạt wegener"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U hạt Wegener",
        "searchKeyword": "u hạt wegener"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U hạt Wegener",
        "searchKeyword": "u hạt wegener"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U hạt Wegener",
        "searchKeyword": "u hạt wegener"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U hạt Wegener",
        "searchKeyword": "u hạt wegener"
      }
    ]
  },
  "viem_phe_quan": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm phế quản",
    "specialty": "Hô hấp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm phế quản.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "viem_phe_quan_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm phế quản",
        "description": "viêm phế quản, hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phe_quan_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm phế quản",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phe_quan_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm phế quản",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm phế quản (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm phế quản - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm phế quản",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Viêm phế quản",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm phế quản: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm phế quản",
        "searchKeyword": "viêm phế quản"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm phế quản",
        "searchKeyword": "viêm phế quản"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm phế quản",
        "searchKeyword": "viêm phế quản"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm phế quản",
        "searchKeyword": "viêm phế quản"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm phế quản",
        "searchKeyword": "viêm phế quản"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm phế quản",
        "searchKeyword": "viêm phế quản"
      }
    ]
  },
  "viem_phoi": {
    "icdCode": "J13",
    "icdPrefixes": [
      "J13",
      "J15",
      "J18"
    ],
    "diseaseName": "Viêm phổi",
    "specialty": "Hô hấp",
    "severity": "urgent",
    "summary": "Viêm phổi mắc phải cộng đồng (Community-Acquired Pneumonia - CAP) là tình trạng nhiễm trùng cấp tính nhu mô phổi xảy ra ở người không nằm viện trong vòng 14 ngày trước đó. Tiêu chuẩn chẩn đoán xác định đòi hỏi sự kết hợp giữa Hội chứng nhiễm trùng hô hấp dưới cấp tính và Hình ảnh tổn thương thâm nhiễm mới trên X-quang hoặc CT ngực. Việc phân tầng độ nặng chuẩn mực qua Thang điểm CURB-65 / PSI và Tiêu chuẩn IDSA/ATS quyết định chính xác nơi điều trị (Ngoại trú, Khoa Nội hay Hồi sức tích cực ICU).",
    "goldStandard": "để chẩn đoán xác định viêm phổi==. - Ứng dụng lâm sàng giá trị nhất của PCT là động học PCT (PCT kinetics) để quyết định xuống thang hoặc ngừng Kháng sinh.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "viem_phoi_c2",
        "viem_phoi_c3",
        "viem_phoi_c6"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "viem_phoi_c1",
        "type": "imaging",
        "label": "- Tiêu chuẩn ngừng kháng sinh: Khi nồng độ \\text{PCT} < 0.25\\ \\mu\\text{g/L} HOẶC giảm \\ge 80\\% so với nồng độ đỉnh kết hợp lâm sàng cải thiện \\to Cho phép ngừng k",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c2",
        "type": "mandatory",
        "label": "1. Câu hỏi: Theo thang điểm CURB-65, bệnh nhân Viêm phổi mắc phải cộng đồng đạt bao nhiêu điểm thì bắt buộc phải nhập viện điều trị?",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c3",
        "type": "mandatory",
        "label": "- Đáp án: Bệnh nhân đạt từ 2 điểm trở lên (tỷ lệ tử vong > 9\\%) bắt buộc phải nhập viện theo dõi và điều trị kháng sinh đường tĩnh mạch (nếu \\ge 3 điểm cân nhắc nhập IC",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c4",
        "type": "lab",
        "label": "2. Câu hỏi: Bệnh nhân viêm phổi có triệu chứng sốt cao kèm mạch chậm tương đối (Dấu hiệu Faget), đau bụng tiêu chảy, lú lẫn và xét nghiệm thấy Hạ Natri máu nặng gợi ý nhiều nhấ",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c5",
        "type": "lab",
        "label": "- Đáp án: Legionella pneumophila (Vi khuẩn gây bệnh Legionnaires). Chẩn đoán xác định nhanh bằng xét nghiệm Tìm kháng nguyên Legionella trong nước tiểu (Urine Antigen",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c6",
        "type": "mandatory",
        "label": "3. Câu hỏi: Hai tiêu chuẩn chính (Major criteria) nào theo Hướng dẫn ATS/IDSA chỉ cần xuất hiện 1 trong 2 là có chỉ định nhập viện thẳng vào Khoa Hồi sức Tích cực (ICU)?",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c7",
        "type": "major",
        "label": "- Đáp án: (1) Suy hô hấp cấp cần thông khí cơ học xâm lấn (đặt ống nội khí quản) VÀ (2) Sốc nhiễm khuẩn cần sử dụng thuốc vận mạch để duy trì huyết áp.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_phoi_c8",
        "type": "imaging",
        "label": "- X-quang ngực thẳng:",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm phổi (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm phổi - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm phổi",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Viêm phổi",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm phổi: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm phổi",
        "searchKeyword": "viêm phổi"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm phổi",
        "searchKeyword": "viêm phổi"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm phổi",
        "searchKeyword": "viêm phổi"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm phổi",
        "searchKeyword": "viêm phổi"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm phổi",
        "searchKeyword": "viêm phổi"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm phổi",
        "searchKeyword": "viêm phổi"
      }
    ]
  },
  "viem_thanh_khi_phe_quan_croup": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm thanh khí phế quản (Croup)",
    "specialty": "Hô hấp",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm thanh khí phế quản (Croup).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Hô hấp",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "viem_thanh_khi_phe_quan_croup_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm thanh khí phế quản (Croup)",
        "description": "viêm thanh khí phế quản (croup), hô hấp",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_thanh_khi_phe_quan_croup_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm thanh khí phế quản (Croup)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "viem_thanh_khi_phe_quan_croup_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm thanh khí phế quản (Croup)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm thanh khí phế quản (Croup) (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm thanh khí phế quản (Croup) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm thanh khí phế quản (Croup)",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Viêm thanh khí phế quản (Croup)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm thanh khí phế quản (Croup): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm thanh khí phế quản (Croup)",
        "searchKeyword": "viêm thanh khí phế quản (croup)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm thanh khí phế quản (Croup)",
        "searchKeyword": "viêm thanh khí phế quản (croup)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm thanh khí phế quản (Croup)",
        "searchKeyword": "viêm thanh khí phế quản (croup)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm thanh khí phế quản (Croup)",
        "searchKeyword": "viêm thanh khí phế quản (croup)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm thanh khí phế quản (Croup)",
        "searchKeyword": "viêm thanh khí phế quản (croup)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm thanh khí phế quản (Croup)",
        "searchKeyword": "viêm thanh khí phế quản (croup)"
      }
    ]
  },
  "chan_doan_dien_giai_khi_mau_dong_mach_abg_interpretation": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
    "specialty": "Tim mạch",
    "severity": "emergency",
    "summary": "pH: 7.35 - 7.45 (Trung bình 7.40). PaCO2: 35 - 45 \\text{ mmHg} (Trung bình 40 \\text{ mmHg}) - Thành phần Hô hấp. HCO3^-: 22 - 26 \\text{ mEq/L} (Trung bình 24 \\text{ mEq/L}) - Thành phần Chuyển hóa. PaO2: 80 - 100 \\text{ mmHg} (ở khí trời). SaO2: 95 - 100\\%. Anion Gap (AG): 8 - 12 \\text{ mEq/L}.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "chan_doan_dien_giai_khi_mau_dong_mach_abg_interpretation_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "description": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation), tim mạch, hồi sức - cấp cứu",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "chan_doan_dien_giai_khi_mau_dong_mach_abg_interpretation_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "chan_doan_dien_giai_khi_mau_dong_mach_abg_interpretation_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation) (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "searchKeyword": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "searchKeyword": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "searchKeyword": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "searchKeyword": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "searchKeyword": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Chẩn đoán & Diễn giải Khí máu động mạch (ABG Interpretation)",
        "searchKeyword": "chẩn đoán & diễn giải khí máu động mạch (abg interpretation)"
      }
    ]
  },
  "chan_doan_xu_tri_soc_nhiem_trung_surviving_sepsis_campaign_2021": {
    "icdCode": "A41",
    "icdPrefixes": [
      "A41"
    ],
    "diseaseName": "Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "emergency",
    "summary": "2.0 \\text{ mmol/L}$ mặc dù đã hồi sức bù đủ dịch.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Truyền nhiễm & Vi sinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "chan_doan_xu_tri_soc_nhiem_trung_surviving_sepsis_campaign_2021_c1",
        "type": "lab",
        "label": "1. Đo nồng độ Lactate máu: Đo lại sau 2 - 4 giờ nếu Lactate ban đầu > 2.0 \\text{ mmol/L} để theo dõi độ thanh thải (Lactate clearance).",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "chan_doan_xu_tri_soc_nhiem_trung_surviving_sepsis_campaign_2021_c2",
        "type": "lab",
        "label": "2. Cấy máu trước khi cho Kháng sinh: Cấy ít nhất 2 bộ chai máu (1 chai hiếu khí, 1 chai kỵ khí). Không làm hoãn khởi đầu Kháng sinh quá 45 phút.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "chan_doan_xu_tri_soc_nhiem_trung_surviving_sepsis_campaign_2021_c3",
        "type": "major",
        "label": "3. Dùng Kháng sinh phổ rộng đường tĩnh mạch: Dùng ngay lập tức trong 1 giờ đầu tiên.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "chan_doan_xu_tri_soc_nhiem_trung_surviving_sepsis_campaign_2021_c4",
        "type": "imaging",
        "label": "4. Bù dịch nhanh: Truyền ngay tối thiểu 30 \\text{ mL/kg} dịch tinh thể đẳng trương (Ringer Lactate hoặc NaCl 0.9%) trong vòng 3 giờ đầu cho bệnh nhân có tụt HA hoặc Lact",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "chan_doan_xu_tri_soc_nhiem_trung_surviving_sepsis_campaign_2021_c5",
        "type": "major",
        "label": "5. Dùng Thuốc Vận mạch: Khởi đầu Norepinephrine ngay trong hoặc sau khi bù dịch nếu MAP < 65 \\text{ mmHg}.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021) (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "searchKeyword": "chẩn đoán & xử trí sốc nhiễm trùng (surviving sepsis campaign 2021)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "searchKeyword": "chẩn đoán & xử trí sốc nhiễm trùng (surviving sepsis campaign 2021)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "searchKeyword": "chẩn đoán & xử trí sốc nhiễm trùng (surviving sepsis campaign 2021)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "searchKeyword": "chẩn đoán & xử trí sốc nhiễm trùng (surviving sepsis campaign 2021)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "searchKeyword": "chẩn đoán & xử trí sốc nhiễm trùng (surviving sepsis campaign 2021)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Chẩn đoán & Xử trí Sốc nhiễm trùng (Surviving Sepsis Campaign 2021)",
        "searchKeyword": "chẩn đoán & xử trí sốc nhiễm trùng (surviving sepsis campaign 2021)"
      }
    ]
  },
  "chan_doan_phan_ve_soc_phan_ve": {
    "icdCode": "T78.2",
    "icdPrefixes": [
      "T78"
    ],
    "diseaseName": "Chẩn đoán Phản vệ & Sốc phản vệ",
    "specialty": "Tim mạch",
    "severity": "emergency",
    "summary": "Sốc phản vệ rất có khả năng xảy ra khi đáp ứng một trong hai tiêu chuẩn sau đây:",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "chan_doan_phan_ve_soc_phan_ve_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Chẩn đoán Phản vệ & Sốc phản vệ",
        "description": "chẩn đoán phản vệ & sốc phản vệ, tim mạch, hồi sức - cấp cứu",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "chan_doan_phan_ve_soc_phan_ve_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Chẩn đoán Phản vệ & Sốc phản vệ",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "chan_doan_phan_ve_soc_phan_ve_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Chẩn đoán Phản vệ & Sốc phản vệ",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Chẩn đoán Phản vệ & Sốc phản vệ (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Chẩn đoán Phản vệ & Sốc phản vệ - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Chẩn đoán Phản vệ & Sốc phản vệ",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Chẩn đoán Phản vệ & Sốc phản vệ",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Chẩn đoán Phản vệ & Sốc phản vệ: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Chẩn đoán Phản vệ & Sốc phản vệ",
        "searchKeyword": "chẩn đoán phản vệ & sốc phản vệ"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Chẩn đoán Phản vệ & Sốc phản vệ",
        "searchKeyword": "chẩn đoán phản vệ & sốc phản vệ"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Chẩn đoán Phản vệ & Sốc phản vệ",
        "searchKeyword": "chẩn đoán phản vệ & sốc phản vệ"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Chẩn đoán Phản vệ & Sốc phản vệ",
        "searchKeyword": "chẩn đoán phản vệ & sốc phản vệ"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Chẩn đoán Phản vệ & Sốc phản vệ",
        "searchKeyword": "chẩn đoán phản vệ & sốc phản vệ"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Chẩn đoán Phản vệ & Sốc phản vệ",
        "searchKeyword": "chẩn đoán phản vệ & sốc phản vệ"
      }
    ]
  },
  "glaucoma_goc_dong_cap": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Glaucoma góc đóng cấp",
    "specialty": "Đại cương",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Glaucoma góc đóng cấp.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Đại cương",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Đại cương)"
    },
    "criteria": [
      {
        "id": "glaucoma_goc_dong_cap_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Glaucoma góc đóng cấp",
        "description": "glaucoma góc đóng cấp, đại cương, mắt - tmh - rhm",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "glaucoma_goc_dong_cap_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Glaucoma góc đóng cấp",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "glaucoma_goc_dong_cap_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Glaucoma góc đóng cấp",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Đại cương"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Glaucoma góc đóng cấp (Đại cương)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Glaucoma góc đóng cấp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Glaucoma góc đóng cấp",
          "class": "Thuốc đặc hiệu chuyên khoa Đại cương",
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
        "name": "Biến chứng cấp tính của Glaucoma góc đóng cấp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Glaucoma góc đóng cấp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Glaucoma góc đóng cấp",
        "searchKeyword": "glaucoma góc đóng cấp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Glaucoma góc đóng cấp",
        "searchKeyword": "glaucoma góc đóng cấp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Glaucoma góc đóng cấp",
        "searchKeyword": "glaucoma góc đóng cấp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Glaucoma góc đóng cấp",
        "searchKeyword": "glaucoma góc đóng cấp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Glaucoma góc đóng cấp",
        "searchKeyword": "glaucoma góc đóng cấp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Glaucoma góc đóng cấp",
        "searchKeyword": "glaucoma góc đóng cấp"
      }
    ]
  },
  "u_day_than_kinh_so_viii": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U dây thần kinh số VIII",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U dây thần kinh số VIII.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "u_day_than_kinh_so_viii_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U dây thần kinh số VIII",
        "description": "u dây thần kinh số viii, thần kinh, mắt - tmh - rhm",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "u_day_than_kinh_so_viii_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U dây thần kinh số VIII",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "u_day_than_kinh_so_viii_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U dây thần kinh số VIII",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U dây thần kinh số VIII (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U dây thần kinh số VIII - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U dây thần kinh số VIII",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của U dây thần kinh số VIII",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U dây thần kinh số VIII: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U dây thần kinh số VIII",
        "searchKeyword": "u dây thần kinh số viii"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U dây thần kinh số VIII",
        "searchKeyword": "u dây thần kinh số viii"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U dây thần kinh số VIII",
        "searchKeyword": "u dây thần kinh số viii"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U dây thần kinh số VIII",
        "searchKeyword": "u dây thần kinh số viii"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U dây thần kinh số VIII",
        "searchKeyword": "u dây thần kinh số viii"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U dây thần kinh số VIII",
        "searchKeyword": "u dây thần kinh số viii"
      }
    ]
  },
  "viem_tai_giua": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm tai giữa",
    "specialty": "Đại cương",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm tai giữa.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Đại cương",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Đại cương)"
    },
    "criteria": [
      {
        "id": "viem_tai_giua_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm tai giữa",
        "description": "viêm tai giữa, đại cương, mắt - tmh - rhm",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "viem_tai_giua_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm tai giữa",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "viem_tai_giua_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm tai giữa",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Đại cương"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm tai giữa (Đại cương)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm tai giữa - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm tai giữa",
          "class": "Thuốc đặc hiệu chuyên khoa Đại cương",
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
        "name": "Biến chứng cấp tính của Viêm tai giữa",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm tai giữa: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm tai giữa",
        "searchKeyword": "viêm tai giữa"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm tai giữa",
        "searchKeyword": "viêm tai giữa"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm tai giữa",
        "searchKeyword": "viêm tai giữa"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm tai giữa",
        "searchKeyword": "viêm tai giữa"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm tai giữa",
        "searchKeyword": "viêm tai giữa"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm tai giữa",
        "searchKeyword": "viêm tai giữa"
      }
    ]
  },
  "viem_xoang_cap": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm xoang cấp",
    "specialty": "Đại cương",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm xoang cấp.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Đại cương",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Đại cương)"
    },
    "criteria": [
      {
        "id": "viem_xoang_cap_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm xoang cấp",
        "description": "viêm xoang cấp, đại cương, mắt - tmh - rhm",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "viem_xoang_cap_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm xoang cấp",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "viem_xoang_cap_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm xoang cấp",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Đại cương"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm xoang cấp (Đại cương)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm xoang cấp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm xoang cấp",
          "class": "Thuốc đặc hiệu chuyên khoa Đại cương",
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
        "name": "Biến chứng cấp tính của Viêm xoang cấp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm xoang cấp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm xoang cấp",
        "searchKeyword": "viêm xoang cấp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm xoang cấp",
        "searchKeyword": "viêm xoang cấp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm xoang cấp",
        "searchKeyword": "viêm xoang cấp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm xoang cấp",
        "searchKeyword": "viêm xoang cấp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm xoang cấp",
        "searchKeyword": "viêm xoang cấp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm xoang cấp",
        "searchKeyword": "viêm xoang cấp"
      }
    ]
  },
  "soi_than_nieu_quan": {
    "icdCode": "N20",
    "icdPrefixes": [
      "N20",
      "N23"
    ],
    "diseaseName": "Sỏi thận, niệu quản",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Sỏi thận, niệu quản.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "soi_than_nieu_quan_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Sỏi thận, niệu quản",
        "description": "sỏi thận, niệu quản, thận - tiết niệu, ngoại khoa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "soi_than_nieu_quan_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Sỏi thận, niệu quản",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "soi_than_nieu_quan_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Sỏi thận, niệu quản",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sỏi thận, niệu quản (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Sỏi thận, niệu quản - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Sỏi thận, niệu quản",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Sỏi thận, niệu quản",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Sỏi thận, niệu quản: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Sỏi thận, niệu quản",
        "searchKeyword": "sỏi thận, niệu quản"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Sỏi thận, niệu quản",
        "searchKeyword": "sỏi thận, niệu quản"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Sỏi thận, niệu quản",
        "searchKeyword": "sỏi thận, niệu quản"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Sỏi thận, niệu quản",
        "searchKeyword": "sỏi thận, niệu quản"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Sỏi thận, niệu quản",
        "searchKeyword": "sỏi thận, niệu quản"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Sỏi thận, niệu quản",
        "searchKeyword": "sỏi thận, niệu quản"
      }
    ]
  },
  "soi_tui_mat": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Sỏi túi mật",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Sỏi túi mật.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "soi_tui_mat_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Sỏi túi mật",
        "description": "sỏi túi mật, tiêu hóa - gan mật, ngoại khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "soi_tui_mat_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Sỏi túi mật",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "soi_tui_mat_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Sỏi túi mật",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sỏi túi mật (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Sỏi túi mật - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Sỏi túi mật",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Sỏi túi mật",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Sỏi túi mật: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Sỏi túi mật",
        "searchKeyword": "sỏi túi mật"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Sỏi túi mật",
        "searchKeyword": "sỏi túi mật"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Sỏi túi mật",
        "searchKeyword": "sỏi túi mật"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Sỏi túi mật",
        "searchKeyword": "sỏi túi mật"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Sỏi túi mật",
        "searchKeyword": "sỏi túi mật"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Sỏi túi mật",
        "searchKeyword": "sỏi túi mật"
      }
    ]
  },
  "soi_ong_mat_chu": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Sỏi ống mật chủ",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Sỏi ống mật chủ.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "soi_ong_mat_chu_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Sỏi ống mật chủ",
        "description": "sỏi ống mật chủ, tiêu hóa - gan mật, ngoại khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "soi_ong_mat_chu_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Sỏi ống mật chủ",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "soi_ong_mat_chu_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Sỏi ống mật chủ",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sỏi ống mật chủ (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Sỏi ống mật chủ - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Sỏi ống mật chủ",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Sỏi ống mật chủ",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Sỏi ống mật chủ: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Sỏi ống mật chủ",
        "searchKeyword": "sỏi ống mật chủ"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Sỏi ống mật chủ",
        "searchKeyword": "sỏi ống mật chủ"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Sỏi ống mật chủ",
        "searchKeyword": "sỏi ống mật chủ"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Sỏi ống mật chủ",
        "searchKeyword": "sỏi ống mật chủ"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Sỏi ống mật chủ",
        "searchKeyword": "sỏi ống mật chủ"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Sỏi ống mật chủ",
        "searchKeyword": "sỏi ống mật chủ"
      }
    ]
  },
  "thieu_mau_cuc_bo_mac_treo": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thiếu máu cục bộ mạc treo",
    "specialty": "Huyết học - Truyền máu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thiếu máu cục bộ mạc treo.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Huyết học - Truyền máu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "thieu_mau_cuc_bo_mac_treo_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thiếu máu cục bộ mạc treo",
        "description": "thiếu máu cục bộ mạc treo, huyết học - truyền máu, ngoại khoa",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_cuc_bo_mac_treo_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thiếu máu cục bộ mạc treo",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "thieu_mau_cuc_bo_mac_treo_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thiếu máu cục bộ mạc treo",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu máu cục bộ mạc treo (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu máu cục bộ mạc treo - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu máu cục bộ mạc treo",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của Thiếu máu cục bộ mạc treo",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu máu cục bộ mạc treo: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu máu cục bộ mạc treo",
        "searchKeyword": "thiếu máu cục bộ mạc treo"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu máu cục bộ mạc treo",
        "searchKeyword": "thiếu máu cục bộ mạc treo"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu máu cục bộ mạc treo",
        "searchKeyword": "thiếu máu cục bộ mạc treo"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu máu cục bộ mạc treo",
        "searchKeyword": "thiếu máu cục bộ mạc treo"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu máu cục bộ mạc treo",
        "searchKeyword": "thiếu máu cục bộ mạc treo"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu máu cục bộ mạc treo",
        "searchKeyword": "thiếu máu cục bộ mạc treo"
      }
    ]
  },
  "thung_tang_rong": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thủng tạng rỗng",
    "specialty": "Đại cương",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thủng tạng rỗng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Đại cương",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Đại cương)"
    },
    "criteria": [
      {
        "id": "thung_tang_rong_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thủng tạng rỗng",
        "description": "thủng tạng rỗng, đại cương, ngoại khoa",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "thung_tang_rong_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thủng tạng rỗng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "thung_tang_rong_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thủng tạng rỗng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Đại cương"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thủng tạng rỗng (Đại cương)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thủng tạng rỗng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thủng tạng rỗng",
          "class": "Thuốc đặc hiệu chuyên khoa Đại cương",
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
        "name": "Biến chứng cấp tính của Thủng tạng rỗng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thủng tạng rỗng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thủng tạng rỗng",
        "searchKeyword": "thủng tạng rỗng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thủng tạng rỗng",
        "searchKeyword": "thủng tạng rỗng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thủng tạng rỗng",
        "searchKeyword": "thủng tạng rỗng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thủng tạng rỗng",
        "searchKeyword": "thủng tạng rỗng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thủng tạng rỗng",
        "searchKeyword": "thủng tạng rỗng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thủng tạng rỗng",
        "searchKeyword": "thủng tạng rỗng"
      }
    ]
  },
  "u_mo_lipoma": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U mỡ (lipoma)",
    "specialty": "Đại cương",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U mỡ (lipoma).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Đại cương",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Đại cương)"
    },
    "criteria": [
      {
        "id": "u_mo_lipoma_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U mỡ (lipoma)",
        "description": "u mỡ (lipoma), đại cương, ngoại khoa",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "u_mo_lipoma_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U mỡ (lipoma)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "u_mo_lipoma_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U mỡ (lipoma)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Đại cương"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U mỡ (lipoma) (Đại cương)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U mỡ (lipoma) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U mỡ (lipoma)",
          "class": "Thuốc đặc hiệu chuyên khoa Đại cương",
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
        "name": "Biến chứng cấp tính của U mỡ (lipoma)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U mỡ (lipoma): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U mỡ (lipoma)",
        "searchKeyword": "u mỡ (lipoma)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U mỡ (lipoma)",
        "searchKeyword": "u mỡ (lipoma)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U mỡ (lipoma)",
        "searchKeyword": "u mỡ (lipoma)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U mỡ (lipoma)",
        "searchKeyword": "u mỡ (lipoma)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U mỡ (lipoma)",
        "searchKeyword": "u mỡ (lipoma)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U mỡ (lipoma)",
        "searchKeyword": "u mỡ (lipoma)"
      }
    ]
  },
  "viem_ruot_thua": {
    "icdCode": "K35",
    "icdPrefixes": [
      "K35"
    ],
    "diseaseName": "Viêm ruột thừa",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm ruột thừa.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "viem_ruot_thua_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm ruột thừa",
        "description": "viêm ruột thừa, tiêu hóa - gan mật, ngoại khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_ruot_thua_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm ruột thừa",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_ruot_thua_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm ruột thừa",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm ruột thừa (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm ruột thừa - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm ruột thừa",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Viêm ruột thừa",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm ruột thừa: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm ruột thừa",
        "searchKeyword": "viêm ruột thừa"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm ruột thừa",
        "searchKeyword": "viêm ruột thừa"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm ruột thừa",
        "searchKeyword": "viêm ruột thừa"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm ruột thừa",
        "searchKeyword": "viêm ruột thừa"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm ruột thừa",
        "searchKeyword": "viêm ruột thừa"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm ruột thừa",
        "searchKeyword": "viêm ruột thừa"
      }
    ]
  },
  "viem_tui_mat_cap": {
    "icdCode": "K81",
    "icdPrefixes": [
      "K81"
    ],
    "diseaseName": "Viêm túi mật cấp",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm túi mật cấp.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "viem_tui_mat_cap_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm túi mật cấp",
        "description": "viêm túi mật cấp, tiêu hóa - gan mật, ngoại khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tui_mat_cap_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm túi mật cấp",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tui_mat_cap_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm túi mật cấp",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm túi mật cấp (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm túi mật cấp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm túi mật cấp",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Viêm túi mật cấp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm túi mật cấp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm túi mật cấp",
        "searchKeyword": "viêm túi mật cấp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm túi mật cấp",
        "searchKeyword": "viêm túi mật cấp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm túi mật cấp",
        "searchKeyword": "viêm túi mật cấp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm túi mật cấp",
        "searchKeyword": "viêm túi mật cấp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm túi mật cấp",
        "searchKeyword": "viêm túi mật cấp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm túi mật cấp",
        "searchKeyword": "viêm túi mật cấp"
      }
    ]
  },
  "viem_tui_thua": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm túi thừa",
    "specialty": "Đại cương",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm túi thừa.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Đại cương",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Đại cương)"
    },
    "criteria": [
      {
        "id": "viem_tui_thua_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm túi thừa",
        "description": "viêm túi thừa, đại cương, ngoại khoa",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "viem_tui_thua_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm túi thừa",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Đại cương"
      },
      {
        "id": "viem_tui_thua_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm túi thừa",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Đại cương"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm túi thừa (Đại cương)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm túi thừa - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm túi thừa",
          "class": "Thuốc đặc hiệu chuyên khoa Đại cương",
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
        "name": "Biến chứng cấp tính của Viêm túi thừa",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm túi thừa: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm túi thừa",
        "searchKeyword": "viêm túi thừa"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm túi thừa",
        "searchKeyword": "viêm túi thừa"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm túi thừa",
        "searchKeyword": "viêm túi thừa"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm túi thừa",
        "searchKeyword": "viêm túi thừa"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm túi thừa",
        "searchKeyword": "viêm túi thừa"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm túi thừa",
        "searchKeyword": "viêm túi thừa"
      }
    ]
  },
  "viem_duong_mat_cap_ascending_cholangitis": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm đường mật cấp (ascending cholangitis)",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm đường mật cấp (ascending cholangitis).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "viem_duong_mat_cap_ascending_cholangitis_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm đường mật cấp (ascending cholangitis)",
        "description": "viêm đường mật cấp (ascending cholangitis), tiêu hóa - gan mật, ngoại khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_duong_mat_cap_ascending_cholangitis_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm đường mật cấp (ascending cholangitis)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_duong_mat_cap_ascending_cholangitis_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm đường mật cấp (ascending cholangitis)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm đường mật cấp (ascending cholangitis) (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm đường mật cấp (ascending cholangitis) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm đường mật cấp (ascending cholangitis)",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Viêm đường mật cấp (ascending cholangitis)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm đường mật cấp (ascending cholangitis): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm đường mật cấp (ascending cholangitis)",
        "searchKeyword": "viêm đường mật cấp (ascending cholangitis)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm đường mật cấp (ascending cholangitis)",
        "searchKeyword": "viêm đường mật cấp (ascending cholangitis)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm đường mật cấp (ascending cholangitis)",
        "searchKeyword": "viêm đường mật cấp (ascending cholangitis)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm đường mật cấp (ascending cholangitis)",
        "searchKeyword": "viêm đường mật cấp (ascending cholangitis)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm đường mật cấp (ascending cholangitis)",
        "searchKeyword": "viêm đường mật cấp (ascending cholangitis)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm đường mật cấp (ascending cholangitis)",
        "searchKeyword": "viêm đường mật cấp (ascending cholangitis)"
      }
    ]
  },
  "ap_xe_ruot_thua": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Áp xe ruột thừa",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Áp xe ruột thừa.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "ap_xe_ruot_thua_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Áp xe ruột thừa",
        "description": "áp xe ruột thừa, tiêu hóa - gan mật, ngoại khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "ap_xe_ruot_thua_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Áp xe ruột thừa",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "ap_xe_ruot_thua_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Áp xe ruột thừa",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Áp xe ruột thừa (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Áp xe ruột thừa - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Áp xe ruột thừa",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Áp xe ruột thừa",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Áp xe ruột thừa: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Áp xe ruột thừa",
        "searchKeyword": "áp xe ruột thừa"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Áp xe ruột thừa",
        "searchKeyword": "áp xe ruột thừa"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Áp xe ruột thừa",
        "searchKeyword": "áp xe ruột thừa"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Áp xe ruột thừa",
        "searchKeyword": "áp xe ruột thừa"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Áp xe ruột thừa",
        "searchKeyword": "áp xe ruột thừa"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Áp xe ruột thừa",
        "searchKeyword": "áp xe ruột thừa"
      }
    ]
  },
  "co_giat_do_sot": {
    "icdCode": "G40",
    "icdPrefixes": [
      "G40",
      "R56"
    ],
    "diseaseName": "Co giật do sốt",
    "specialty": "Nhi khoa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Co giật do sốt.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nhi khoa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nhi khoa)"
    },
    "criteria": [
      {
        "id": "co_giat_do_sot_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Co giật do sốt",
        "description": "co giật do sốt, nhi khoa, dien nao do",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "co_giat_do_sot_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Co giật do sốt",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "co_giat_do_sot_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Co giật do sốt",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nhi khoa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Co giật do sốt (Nhi khoa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Co giật do sốt - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Co giật do sốt",
          "class": "Thuốc đặc hiệu chuyên khoa Nhi khoa",
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
        "name": "Biến chứng cấp tính của Co giật do sốt",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Co giật do sốt: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Co giật do sốt",
        "searchKeyword": "co giật do sốt"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Co giật do sốt",
        "searchKeyword": "co giật do sốt"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Co giật do sốt",
        "searchKeyword": "co giật do sốt"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Co giật do sốt",
        "searchKeyword": "co giật do sốt"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Co giật do sốt",
        "searchKeyword": "co giật do sốt"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Co giật do sốt",
        "searchKeyword": "co giật do sốt"
      }
    ]
  },
  "teo_duong_mat_bam_sinh": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Teo đường mật bẩm sinh",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Teo đường mật bẩm sinh.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "teo_duong_mat_bam_sinh_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Teo đường mật bẩm sinh",
        "description": "teo đường mật bẩm sinh, tiêu hóa - gan mật, nhi khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "teo_duong_mat_bam_sinh_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Teo đường mật bẩm sinh",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "teo_duong_mat_bam_sinh_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Teo đường mật bẩm sinh",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Teo đường mật bẩm sinh (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Teo đường mật bẩm sinh - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Teo đường mật bẩm sinh",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Teo đường mật bẩm sinh",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Teo đường mật bẩm sinh: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Teo đường mật bẩm sinh",
        "searchKeyword": "teo đường mật bẩm sinh"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Teo đường mật bẩm sinh",
        "searchKeyword": "teo đường mật bẩm sinh"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Teo đường mật bẩm sinh",
        "searchKeyword": "teo đường mật bẩm sinh"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Teo đường mật bẩm sinh",
        "searchKeyword": "teo đường mật bẩm sinh"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Teo đường mật bẩm sinh",
        "searchKeyword": "teo đường mật bẩm sinh"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Teo đường mật bẩm sinh",
        "searchKeyword": "teo đường mật bẩm sinh"
      }
    ]
  },
  "thieu_hut_citrin": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thiếu hụt Citrin",
    "specialty": "Nhi khoa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thiếu hụt Citrin.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nhi khoa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nhi khoa)"
    },
    "criteria": [
      {
        "id": "thieu_hut_citrin_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thiếu hụt Citrin",
        "description": "thiếu hụt citrin, nhi khoa",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "thieu_hut_citrin_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thiếu hụt Citrin",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "thieu_hut_citrin_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thiếu hụt Citrin",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nhi khoa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu hụt Citrin (Nhi khoa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu hụt Citrin - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu hụt Citrin",
          "class": "Thuốc đặc hiệu chuyên khoa Nhi khoa",
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
        "name": "Biến chứng cấp tính của Thiếu hụt Citrin",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu hụt Citrin: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu hụt Citrin",
        "searchKeyword": "thiếu hụt citrin"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu hụt Citrin",
        "searchKeyword": "thiếu hụt citrin"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu hụt Citrin",
        "searchKeyword": "thiếu hụt citrin"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu hụt Citrin",
        "searchKeyword": "thiếu hụt citrin"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu hụt Citrin",
        "searchKeyword": "thiếu hụt citrin"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu hụt Citrin",
        "searchKeyword": "thiếu hụt citrin"
      }
    ]
  },
  "thieu_men_g6pd": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thiếu men G6PD",
    "specialty": "Nhi khoa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thiếu men G6PD.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nhi khoa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nhi khoa)"
    },
    "criteria": [
      {
        "id": "thieu_men_g6pd_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thiếu men G6PD",
        "description": "thiếu men g6pd, nhi khoa",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "thieu_men_g6pd_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thiếu men G6PD",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "thieu_men_g6pd_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thiếu men G6PD",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nhi khoa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu men G6PD (Nhi khoa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu men G6PD - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu men G6PD",
          "class": "Thuốc đặc hiệu chuyên khoa Nhi khoa",
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
        "name": "Biến chứng cấp tính của Thiếu men G6PD",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu men G6PD: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu men G6PD",
        "searchKeyword": "thiếu men g6pd"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu men G6PD",
        "searchKeyword": "thiếu men g6pd"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu men G6PD",
        "searchKeyword": "thiếu men g6pd"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu men G6PD",
        "searchKeyword": "thiếu men g6pd"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu men G6PD",
        "searchKeyword": "thiếu men g6pd"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu men G6PD",
        "searchKeyword": "thiếu men g6pd"
      }
    ]
  },
  "vang_da_do_sua_me": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Vàng da do sữa mẹ",
    "specialty": "Nhi khoa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Vàng da do sữa mẹ.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nhi khoa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nhi khoa)"
    },
    "criteria": [
      {
        "id": "vang_da_do_sua_me_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Vàng da do sữa mẹ",
        "description": "vàng da do sữa mẹ, nhi khoa",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "vang_da_do_sua_me_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Vàng da do sữa mẹ",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "vang_da_do_sua_me_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Vàng da do sữa mẹ",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nhi khoa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Vàng da do sữa mẹ (Nhi khoa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Vàng da do sữa mẹ - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Vàng da do sữa mẹ",
          "class": "Thuốc đặc hiệu chuyên khoa Nhi khoa",
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
        "name": "Biến chứng cấp tính của Vàng da do sữa mẹ",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Vàng da do sữa mẹ: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Vàng da do sữa mẹ",
        "searchKeyword": "vàng da do sữa mẹ"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Vàng da do sữa mẹ",
        "searchKeyword": "vàng da do sữa mẹ"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Vàng da do sữa mẹ",
        "searchKeyword": "vàng da do sữa mẹ"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Vàng da do sữa mẹ",
        "searchKeyword": "vàng da do sữa mẹ"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Vàng da do sữa mẹ",
        "searchKeyword": "vàng da do sữa mẹ"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Vàng da do sữa mẹ",
        "searchKeyword": "vàng da do sữa mẹ"
      }
    ]
  },
  "vang_da_nhan": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Vàng da nhân",
    "specialty": "Nhi khoa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Vàng da nhân.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nhi khoa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nhi khoa)"
    },
    "criteria": [
      {
        "id": "vang_da_nhan_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Vàng da nhân",
        "description": "vàng da nhân, nhi khoa",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "vang_da_nhan_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Vàng da nhân",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "vang_da_nhan_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Vàng da nhân",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nhi khoa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Vàng da nhân (Nhi khoa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Vàng da nhân - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Vàng da nhân",
          "class": "Thuốc đặc hiệu chuyên khoa Nhi khoa",
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
        "name": "Biến chứng cấp tính của Vàng da nhân",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Vàng da nhân: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Vàng da nhân",
        "searchKeyword": "vàng da nhân"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Vàng da nhân",
        "searchKeyword": "vàng da nhân"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Vàng da nhân",
        "searchKeyword": "vàng da nhân"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Vàng da nhân",
        "searchKeyword": "vàng da nhân"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Vàng da nhân",
        "searchKeyword": "vàng da nhân"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Vàng da nhân",
        "searchKeyword": "vàng da nhân"
      }
    ]
  },
  "vang_da_sinh_ly": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Vàng da sinh lý",
    "specialty": "Nhi khoa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Vàng da sinh lý.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nhi khoa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nhi khoa)"
    },
    "criteria": [
      {
        "id": "vang_da_sinh_ly_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Vàng da sinh lý",
        "description": "vàng da sinh lý, nhi khoa",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "vang_da_sinh_ly_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Vàng da sinh lý",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nhi khoa"
      },
      {
        "id": "vang_da_sinh_ly_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Vàng da sinh lý",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nhi khoa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Vàng da sinh lý (Nhi khoa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Vàng da sinh lý - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Vàng da sinh lý",
          "class": "Thuốc đặc hiệu chuyên khoa Nhi khoa",
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
        "name": "Biến chứng cấp tính của Vàng da sinh lý",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Vàng da sinh lý: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Vàng da sinh lý",
        "searchKeyword": "vàng da sinh lý"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Vàng da sinh lý",
        "searchKeyword": "vàng da sinh lý"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Vàng da sinh lý",
        "searchKeyword": "vàng da sinh lý"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Vàng da sinh lý",
        "searchKeyword": "vàng da sinh lý"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Vàng da sinh lý",
        "searchKeyword": "vàng da sinh lý"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Vàng da sinh lý",
        "searchKeyword": "vàng da sinh lý"
      }
    ]
  },
  "vang_da_u_mat_tien_trien_co_tinh_gia_dinh_pfic": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Vàng da ứ mật tiến triển có tính gia đình (PFIC).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "vang_da_u_mat_tien_trien_co_tinh_gia_dinh_pfic_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "description": "vàng da ứ mật tiến triển có tính gia đình (pfic), tiêu hóa - gan mật, nhi khoa",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vang_da_u_mat_tien_trien_co_tinh_gia_dinh_pfic_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vang_da_u_mat_tien_trien_co_tinh_gia_dinh_pfic_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Vàng da ứ mật tiến triển có tính gia đình (PFIC) (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Vàng da ứ mật tiến triển có tính gia đình (PFIC) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Vàng da ứ mật tiến triển có tính gia đình (PFIC): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "searchKeyword": "vàng da ứ mật tiến triển có tính gia đình (pfic)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "searchKeyword": "vàng da ứ mật tiến triển có tính gia đình (pfic)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "searchKeyword": "vàng da ứ mật tiến triển có tính gia đình (pfic)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "searchKeyword": "vàng da ứ mật tiến triển có tính gia đình (pfic)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "searchKeyword": "vàng da ứ mật tiến triển có tính gia đình (pfic)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Vàng da ứ mật tiến triển có tính gia đình (PFIC)",
        "searchKeyword": "vàng da ứ mật tiến triển có tính gia đình (pfic)"
      }
    ]
  },
  "benh_cushing_khoi_u_tuyen_yen_tang_tiet_acth": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh Cushing (khối u tuyến yên tăng tiết ACTH).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "benh_cushing_khoi_u_tuyen_yen_tang_tiet_acth_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "description": "bệnh cushing (khối u tuyến yên tăng tiết acth), thận - tiết niệu, nội tiết - chuyển hóa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_cushing_khoi_u_tuyen_yen_tang_tiet_acth_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_cushing_khoi_u_tuyen_yen_tang_tiet_acth_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Cushing (khối u tuyến yên tăng tiết ACTH) (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Cushing (khối u tuyến yên tăng tiết ACTH) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Cushing (khối u tuyến yên tăng tiết ACTH): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "searchKeyword": "bệnh cushing (khối u tuyến yên tăng tiết acth)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "searchKeyword": "bệnh cushing (khối u tuyến yên tăng tiết acth)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "searchKeyword": "bệnh cushing (khối u tuyến yên tăng tiết acth)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "searchKeyword": "bệnh cushing (khối u tuyến yên tăng tiết acth)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "searchKeyword": "bệnh cushing (khối u tuyến yên tăng tiết acth)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Cushing (khối u tuyến yên tăng tiết ACTH)",
        "searchKeyword": "bệnh cushing (khối u tuyến yên tăng tiết acth)"
      }
    ]
  },
  "benh_graves": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Graves",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh Graves.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "benh_graves_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh Graves",
        "description": "bệnh graves, nội tiết - chuyển hóa",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "benh_graves_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh Graves",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "benh_graves_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh Graves",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Graves (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Graves - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Graves",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Bệnh Graves",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Graves: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Graves",
        "searchKeyword": "bệnh graves"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Graves",
        "searchKeyword": "bệnh graves"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Graves",
        "searchKeyword": "bệnh graves"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Graves",
        "searchKeyword": "bệnh graves"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Graves",
        "searchKeyword": "bệnh graves"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Graves",
        "searchKeyword": "bệnh graves"
      }
    ]
  },
  "cuong_giap": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Cường giáp",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Cường giáp.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "cuong_giap_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Cường giáp",
        "description": "cường giáp, nội tiết - chuyển hóa",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "cuong_giap_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Cường giáp",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "cuong_giap_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Cường giáp",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Cường giáp (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Cường giáp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Cường giáp",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Cường giáp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Cường giáp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Cường giáp",
        "searchKeyword": "cường giáp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Cường giáp",
        "searchKeyword": "cường giáp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Cường giáp",
        "searchKeyword": "cường giáp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Cường giáp",
        "searchKeyword": "cường giáp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Cường giáp",
        "searchKeyword": "cường giáp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Cường giáp",
        "searchKeyword": "cường giáp"
      }
    ]
  },
  "hoi_chung_buong_trung_da_nang": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng buồng trứng đa nang",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng buồng trứng đa nang.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "hoi_chung_buong_trung_da_nang_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng buồng trứng đa nang",
        "description": "hội chứng buồng trứng đa nang, nội tiết - chuyển hóa",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "hoi_chung_buong_trung_da_nang_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng buồng trứng đa nang",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "hoi_chung_buong_trung_da_nang_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng buồng trứng đa nang",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng buồng trứng đa nang (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng buồng trứng đa nang - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng buồng trứng đa nang",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Hội chứng buồng trứng đa nang",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng buồng trứng đa nang: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng buồng trứng đa nang",
        "searchKeyword": "hội chứng buồng trứng đa nang"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng buồng trứng đa nang",
        "searchKeyword": "hội chứng buồng trứng đa nang"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng buồng trứng đa nang",
        "searchKeyword": "hội chứng buồng trứng đa nang"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng buồng trứng đa nang",
        "searchKeyword": "hội chứng buồng trứng đa nang"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng buồng trứng đa nang",
        "searchKeyword": "hội chứng buồng trứng đa nang"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng buồng trứng đa nang",
        "searchKeyword": "hội chứng buồng trứng đa nang"
      }
    ]
  },
  "hoi_chung_klinefelter": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Klinefelter",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Klinefelter.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "hoi_chung_klinefelter_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Klinefelter",
        "description": "hội chứng klinefelter, nội tiết - chuyển hóa",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "hoi_chung_klinefelter_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Klinefelter",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "hoi_chung_klinefelter_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Klinefelter",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Klinefelter (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Klinefelter - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Klinefelter",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Hội chứng Klinefelter",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Klinefelter: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Klinefelter",
        "searchKeyword": "hội chứng klinefelter"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Klinefelter",
        "searchKeyword": "hội chứng klinefelter"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Klinefelter",
        "searchKeyword": "hội chứng klinefelter"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Klinefelter",
        "searchKeyword": "hội chứng klinefelter"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Klinefelter",
        "searchKeyword": "hội chứng klinefelter"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Klinefelter",
        "searchKeyword": "hội chứng klinefelter"
      }
    ]
  },
  "insulinoma": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Insulinoma",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Insulinoma.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "insulinoma_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Insulinoma",
        "description": "insulinoma, nội tiết - chuyển hóa",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "insulinoma_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Insulinoma",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "insulinoma_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Insulinoma",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Insulinoma (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Insulinoma - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Insulinoma",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Insulinoma",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Insulinoma: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Insulinoma",
        "searchKeyword": "insulinoma"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Insulinoma",
        "searchKeyword": "insulinoma"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Insulinoma",
        "searchKeyword": "insulinoma"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Insulinoma",
        "searchKeyword": "insulinoma"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Insulinoma",
        "searchKeyword": "insulinoma"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Insulinoma",
        "searchKeyword": "insulinoma"
      }
    ]
  },
  "khoi_u_tiet_acth_lac_cho_ectopic_acth_production": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Khối u tiết ACTH lạc chỗ (Ectopic ACTH production).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "khoi_u_tiet_acth_lac_cho_ectopic_acth_production_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "description": "khối u tiết acth lạc chỗ (ectopic acth production), thận - tiết niệu, nội tiết - chuyển hóa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "khoi_u_tiet_acth_lac_cho_ectopic_acth_production_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "khoi_u_tiet_acth_lac_cho_ectopic_acth_production_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Khối u tiết ACTH lạc chỗ (Ectopic ACTH production) (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Khối u tiết ACTH lạc chỗ (Ectopic ACTH production) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Khối u tiết ACTH lạc chỗ (Ectopic ACTH production): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "searchKeyword": "khối u tiết acth lạc chỗ (ectopic acth production)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "searchKeyword": "khối u tiết acth lạc chỗ (ectopic acth production)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "searchKeyword": "khối u tiết acth lạc chỗ (ectopic acth production)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "searchKeyword": "khối u tiết acth lạc chỗ (ectopic acth production)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "searchKeyword": "khối u tiết acth lạc chỗ (ectopic acth production)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Khối u tiết ACTH lạc chỗ (Ectopic ACTH production)",
        "searchKeyword": "khối u tiết acth lạc chỗ (ectopic acth production)"
      }
    ]
  },
  "suy_giap": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Suy giáp",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "10 mIU/L) đi kèm với fT4 giảm dưới ngưỡng bình thường. Đây là tình trạng tuyến giáp đã tổn thương cấu trúc nặng nề, không còn khả năng đáp ứng với kích thích của tuyến yên.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "suy_giap_c2"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "suy_giap_c1",
        "type": "major",
        "label": "- Triệu chứng: Bệnh nhân thường xuyên có cảm giác sợ lạnh, không dung nạp được lạnh và hạ thân nhiệt.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c2",
        "type": "mandatory",
        "label": "- Cân nặng: Tình trạng tăng cân nhẹ thường xuyên xảy ra, tuy nhiên, điều này chủ yếu là do sự lưu giữ nước và tích tụ dịch tại các mô chứ không phải do tăng khối lượng mỡ. Khi",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c3",
        "type": "major",
        "label": "- Triệu chứng: Bệnh nhân có khuôn mặt phù nề, đặc biệt là bọng quanh mắt, nét mặt vô cảm. Lưỡi to ra do sự lắng đọng chất nền protein, dẫn đến khàn giọng và nói chậm.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c4",
        "type": "minor",
        "label": "- Biến đổi ở da và phần phụ: Da thường dày, khô, bong vảy và lạnh. Tóc khô, thưa, dễ gãy rụng và có thể bị hói đầu.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c5",
        "type": "major",
        "label": "- Caroten huyết: Sự lắng đọng carotene trong lớp biểu bì da giàu lipid (do giảm chuyển hóa carotene thành vitamin A) làm cho da lòng bàn tay và lòng bàn chân có màu vàng cam.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c6",
        "type": "minor",
        "label": "- Thần kinh ngoại biên: Sự lắng đọng các protein và mucopolysaccharide trong các dây chằng xung quanh cổ tay và mắt cá chân có thể gây chèn ép thần kinh, dẫn đến hội chứng ống",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c7",
        "type": "lab",
        "label": "- Hệ cơ: Bệnh nhân thường bị mệt mỏi, yếu cơ, đau cơ, chuột rút và có thể kèm theo tăng nồng độ men cơ (CK, SGOT) trong máu.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "suy_giap_c8",
        "type": "major",
        "label": "- Tâm thần và Nhận thức: Tình trạng thiếu hụt hormone giáp ảnh hưởng nghiêm trọng đến hoạt động của não bộ. Bệnh nhân có biểu hiện chậm chạp, giảm trí nhớ, kém tập trung, giảm",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Suy giáp (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Suy giáp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Suy giáp",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Suy giáp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Suy giáp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Suy giáp",
        "searchKeyword": "suy giáp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Suy giáp",
        "searchKeyword": "suy giáp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Suy giáp",
        "searchKeyword": "suy giáp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Suy giáp",
        "searchKeyword": "suy giáp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Suy giáp",
        "searchKeyword": "suy giáp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Suy giáp",
        "searchKeyword": "suy giáp"
      }
    ]
  },
  "suy_thuong_than": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Suy thượng thận",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Suy thượng thận.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "suy_thuong_than_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Suy thượng thận",
        "description": "suy thượng thận, thận - tiết niệu, nội tiết - chuyển hóa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "suy_thuong_than_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Suy thượng thận",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "suy_thuong_than_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Suy thượng thận",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Suy thượng thận (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Suy thượng thận - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Suy thượng thận",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Suy thượng thận",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Suy thượng thận: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Suy thượng thận",
        "searchKeyword": "suy thượng thận"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Suy thượng thận",
        "searchKeyword": "suy thượng thận"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Suy thượng thận",
        "searchKeyword": "suy thượng thận"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Suy thượng thận",
        "searchKeyword": "suy thượng thận"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Suy thượng thận",
        "searchKeyword": "suy thượng thận"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Suy thượng thận",
        "searchKeyword": "suy thượng thận"
      }
    ]
  },
  "u_tuyen_thuong_than": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U tuyến thượng thận",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U tuyến thượng thận.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "u_tuyen_thuong_than_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U tuyến thượng thận",
        "description": "u tuyến thượng thận, thận - tiết niệu, nội tiết - chuyển hóa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "u_tuyen_thuong_than_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U tuyến thượng thận",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "u_tuyen_thuong_than_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U tuyến thượng thận",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U tuyến thượng thận (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U tuyến thượng thận - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U tuyến thượng thận",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của U tuyến thượng thận",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U tuyến thượng thận: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U tuyến thượng thận",
        "searchKeyword": "u tuyến thượng thận"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U tuyến thượng thận",
        "searchKeyword": "u tuyến thượng thận"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U tuyến thượng thận",
        "searchKeyword": "u tuyến thượng thận"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U tuyến thượng thận",
        "searchKeyword": "u tuyến thượng thận"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U tuyến thượng thận",
        "searchKeyword": "u tuyến thượng thận"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U tuyến thượng thận",
        "searchKeyword": "u tuyến thượng thận"
      }
    ]
  },
  "u_tuy_thuong_than": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "U tủy thượng thận",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho U tủy thượng thận.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "u_tuy_thuong_than_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của U tủy thượng thận",
        "description": "u tủy thượng thận, thận - tiết niệu, nội tiết - chuyển hóa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "u_tuy_thuong_than_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định U tủy thượng thận",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "u_tuy_thuong_than_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong U tủy thượng thận",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị U tủy thượng thận (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị U tủy thượng thận - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho U tủy thượng thận",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của U tủy thượng thận",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân U tủy thượng thận: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán U tủy thượng thận",
        "searchKeyword": "u tủy thượng thận"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán U tủy thượng thận",
        "searchKeyword": "u tủy thượng thận"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng U tủy thượng thận",
        "searchKeyword": "u tủy thượng thận"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị U tủy thượng thận",
        "searchKeyword": "u tủy thượng thận"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc U tủy thượng thận",
        "searchKeyword": "u tủy thượng thận"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng U tủy thượng thận",
        "searchKeyword": "u tủy thượng thận"
      }
    ]
  },
  "viem_tuyen_giap_hashimoto": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm tuyến giáp Hashimoto",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm tuyến giáp Hashimoto.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "viem_tuyen_giap_hashimoto_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm tuyến giáp Hashimoto",
        "description": "viêm tuyến giáp hashimoto, nội tiết - chuyển hóa",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "viem_tuyen_giap_hashimoto_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm tuyến giáp Hashimoto",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "viem_tuyen_giap_hashimoto_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm tuyến giáp Hashimoto",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm tuyến giáp Hashimoto (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm tuyến giáp Hashimoto - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm tuyến giáp Hashimoto",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Viêm tuyến giáp Hashimoto",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm tuyến giáp Hashimoto: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm tuyến giáp Hashimoto",
        "searchKeyword": "viêm tuyến giáp hashimoto"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm tuyến giáp Hashimoto",
        "searchKeyword": "viêm tuyến giáp hashimoto"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm tuyến giáp Hashimoto",
        "searchKeyword": "viêm tuyến giáp hashimoto"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm tuyến giáp Hashimoto",
        "searchKeyword": "viêm tuyến giáp hashimoto"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm tuyến giáp Hashimoto",
        "searchKeyword": "viêm tuyến giáp hashimoto"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm tuyến giáp Hashimoto",
        "searchKeyword": "viêm tuyến giáp hashimoto"
      }
    ]
  },
  "dai_thao_nhat": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Đái tháo nhạt",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Đái tháo nhạt.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "dai_thao_nhat_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Đái tháo nhạt",
        "description": "đái tháo nhạt, thận - tiết niệu, nội tiết - chuyển hóa",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "dai_thao_nhat_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Đái tháo nhạt",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "dai_thao_nhat_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Đái tháo nhạt",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Đái tháo nhạt (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Đái tháo nhạt - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Đái tháo nhạt",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Đái tháo nhạt",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Đái tháo nhạt: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Đái tháo nhạt",
        "searchKeyword": "đái tháo nhạt"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Đái tháo nhạt",
        "searchKeyword": "đái tháo nhạt"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Đái tháo nhạt",
        "searchKeyword": "đái tháo nhạt"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Đái tháo nhạt",
        "searchKeyword": "đái tháo nhạt"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Đái tháo nhạt",
        "searchKeyword": "đái tháo nhạt"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Đái tháo nhạt",
        "searchKeyword": "đái tháo nhạt"
      }
    ]
  },
  "dai_thao_duong": {
    "icdCode": "E11",
    "icdPrefixes": [
      "E11",
      "E10",
      "E14"
    ],
    "diseaseName": "Đái tháo đường",
    "specialty": "Nội tiết - Chuyển hóa",
    "severity": "routine",
    "summary": "Bệnh đái tháo đường (ĐTĐ) được đặc trưng bởi tình trạng tăng glucose huyết mạn tính và có các biểu hiện lâm sàng, cận lâm sàng đa dạng tùy thuộc vào thể bệnh và giai đoạn bệnh.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Nội tiết - Chuyển hóa",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Nội tiết - Chuyển hóa)"
    },
    "criteria": [
      {
        "id": "dai_thao_duong_c1",
        "type": "major",
        "label": "- Triệu chứng kinh điển (4 \"nhiều\"):",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c2",
        "type": "major",
        "label": "1. Tiểu nhiều: Tăng đường huyết vượt quá ngưỡng Thận gây đa niệu thẩm thấu.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c3",
        "type": "major",
        "label": "2. Uống nhiều (Khát nhiều): Do cơ thể bị Mất nước qua nước tiểu.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c4",
        "type": "major",
        "label": "3. Ăn nhiều: Do tế bào bị bỏ đói năng lượng vì thiếu hụt hoặc đề kháng Insulin.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c5",
        "type": "major",
        "label": "4. Sụt cân không rõ nguyên nhân: Thường gặp hơn ở típ 1 hoặc típ 2 giai đoạn muộn khi cơ thể phải đốt cháy mô mỡ và cơ để lấy năng lượng.",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c6",
        "type": "major",
        "label": "- Các biểu hiện khác:",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c7",
        "type": "major",
        "label": "- Triệu chứng của biến chứng thần kinh: Tê bì, dị cảm, cảm giác châm chích, đau dữ dội ở đùi (thường gặp ở nam giới típ 2) hoặc các rối loạn thần kinh tự chủ như hạ huyết áp tư",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      },
      {
        "id": "dai_thao_duong_c8",
        "type": "major",
        "label": "- Phân biệt theo típ: ĐTĐ típ 1 thường khởi phát cấp tính ở người trẻ, BMI thấp và dễ rơi vào tình trạng cấp cứu nhiễm toan ceton (DKA). ĐTĐ típ 2 thường khởi phát ở người trên",
        "sourceGuideline": "Nội tiết - Chuyển hóa"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Đái tháo đường (Nội tiết - Chuyển hóa)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Đái tháo đường - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Đái tháo đường",
          "class": "Thuốc đặc hiệu chuyên khoa Nội tiết - Chuyển hóa",
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
        "name": "Biến chứng cấp tính của Đái tháo đường",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Đái tháo đường: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Đái tháo đường",
        "searchKeyword": "đái tháo đường"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Đái tháo đường",
        "searchKeyword": "đái tháo đường"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Đái tháo đường",
        "searchKeyword": "đái tháo đường"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Đái tháo đường",
        "searchKeyword": "đái tháo đường"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Đái tháo đường",
        "searchKeyword": "đái tháo đường"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Đái tháo đường",
        "searchKeyword": "đái tháo đường"
      }
    ]
  },
  "tien_san_giat": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Tiền sản giật",
    "specialty": "Thận - Tiết niệu",
    "severity": "urgent",
    "summary": "300 mg/24 giờ, hoặc tỷ số protein/creatinine \\ge 0,3 mg/dL, hoặc test nhanh dipstick \\ge 2+. Cơ chế: Tổn thương tế bào nội mô tại Thận (bệnh lý nội mô cầu Thận - glomerular endotheliosis) làm tăng tính thấm của màng lọc cầu thận đối với các phân tử protein lớn.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "tien_san_giat_c1",
        "tien_san_giat_c3"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "tien_san_giat_c1",
        "type": "mandatory",
        "label": "- Tăng huyết áp: Đây là dấu hiệu bắt buộc. Huyết áp tâm thu \\ge 140 mmHg và/hoặc huyết áp tâm trương \\ge 90 mmHg, đo ít nhất 2 lần cách nhau 4 giờ. Tăng huyết áp là hệ quả",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c2",
        "type": "major",
        "label": "- Protein niệu: Sự xuất hiện của protein trong nước tiểu > 300 mg/24 giờ, hoặc tỷ số protein/creatinine \\ge 0,3 mg/dL, hoặc test nhanh dipstick \\ge 2+. Cơ chế: Tổn thương",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c3",
        "type": "mandatory",
        "label": "- Phù: Mặc dù Phù không còn là tiêu chuẩn bắt buộc để chẩn đoán TSG (vì phù sinh lý rất phổ biến khi mang thai), nhưng trên lâm sàng, tình trạng tăng cân quá mức đột ng",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c4",
        "type": "major",
        "label": "- Huyết áp tăng mức độ nặng: Huyết áp tâm thu \\ge 160 mmHg và/hoặc tâm trương \\ge 110 mmHg. Đây là tình trạng khẩn cấp cần dùng thuốc hạ áp ngay lập tức để phòng ngừa đột q",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c5",
        "type": "major",
        "label": "- Triệu chứng Thần kinh - Thị giác:",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c6",
        "type": "major",
        "label": "- Triệu chứng Tiêu hóa - Gan:",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c7",
        "type": "major",
        "label": "- Triệu chứng Hô hấp (Phù Phổi):",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "tien_san_giat_c8",
        "type": "major",
        "label": "- Huyết học và Thận: Giảm Tiểu cầu (<100.000/µL) do Tiểu cầu bị kích hoạt, ngưng tập và tiêu thụ tại các vi mạch bị tổn thương; suy thận (creatinine > 1,1 mg/dL) do co",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Tiền sản giật (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Tiền sản giật - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Tiền sản giật",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Tiền sản giật",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Tiền sản giật: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Tiền sản giật",
        "searchKeyword": "tiền sản giật"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Tiền sản giật",
        "searchKeyword": "tiền sản giật"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Tiền sản giật",
        "searchKeyword": "tiền sản giật"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Tiền sản giật",
        "searchKeyword": "tiền sản giật"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Tiền sản giật",
        "searchKeyword": "tiền sản giật"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Tiền sản giật",
        "searchKeyword": "tiền sản giật"
      }
    ]
  },
  "benh_meniere": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Meniere",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh Meniere.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "benh_meniere_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh Meniere",
        "description": "bệnh meniere, thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_meniere_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh Meniere",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_meniere_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh Meniere",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Meniere (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Meniere - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Meniere",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Bệnh Meniere",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Meniere: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Meniere",
        "searchKeyword": "bệnh meniere"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Meniere",
        "searchKeyword": "bệnh meniere"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Meniere",
        "searchKeyword": "bệnh meniere"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Meniere",
        "searchKeyword": "bệnh meniere"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Meniere",
        "searchKeyword": "bệnh meniere"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Meniere",
        "searchKeyword": "bệnh meniere"
      }
    ]
  },
  "benh_parkinson": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Parkinson",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh Parkinson.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "benh_parkinson_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh Parkinson",
        "description": "bệnh parkinson, thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_parkinson_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh Parkinson",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_parkinson_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh Parkinson",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Parkinson (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Parkinson - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Parkinson",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Bệnh Parkinson",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Parkinson: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Parkinson",
        "searchKeyword": "bệnh parkinson"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Parkinson",
        "searchKeyword": "bệnh parkinson"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Parkinson",
        "searchKeyword": "bệnh parkinson"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Parkinson",
        "searchKeyword": "bệnh parkinson"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Parkinson",
        "searchKeyword": "bệnh parkinson"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Parkinson",
        "searchKeyword": "bệnh parkinson"
      }
    ]
  },
  "chong_mat_tu_the_kich_phat_lanh_tinh_bppv": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Chóng mặt tư thế kịch phát lành tính (BPPV)",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Chóng mặt tư thế kịch phát lành tính (BPPV).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "chong_mat_tu_the_kich_phat_lanh_tinh_bppv_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "description": "chóng mặt tư thế kịch phát lành tính (bppv), thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "chong_mat_tu_the_kich_phat_lanh_tinh_bppv_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "chong_mat_tu_the_kich_phat_lanh_tinh_bppv_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Chóng mặt tư thế kịch phát lành tính (BPPV) (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Chóng mặt tư thế kịch phát lành tính (BPPV) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Chóng mặt tư thế kịch phát lành tính (BPPV)",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Chóng mặt tư thế kịch phát lành tính (BPPV): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "searchKeyword": "chóng mặt tư thế kịch phát lành tính (bppv)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "searchKeyword": "chóng mặt tư thế kịch phát lành tính (bppv)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "searchKeyword": "chóng mặt tư thế kịch phát lành tính (bppv)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "searchKeyword": "chóng mặt tư thế kịch phát lành tính (bppv)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "searchKeyword": "chóng mặt tư thế kịch phát lành tính (bppv)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Chóng mặt tư thế kịch phát lành tính (BPPV)",
        "searchKeyword": "chóng mặt tư thế kịch phát lành tính (bppv)"
      }
    ]
  },
  "con_thieu_mau_nao_cuc_bo_thoang_qua_tia": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Cơn thiếu máu não cục bộ thoáng qua (TIA)",
    "specialty": "Tim mạch",
    "severity": "emergency",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Cơn thiếu máu não cục bộ thoáng qua (TIA).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "con_thieu_mau_nao_cuc_bo_thoang_qua_tia_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "description": "cơn thiếu máu não cục bộ thoáng qua (tia), tim mạch, thần kinh",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "con_thieu_mau_nao_cuc_bo_thoang_qua_tia_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "con_thieu_mau_nao_cuc_bo_thoang_qua_tia_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Cơn thiếu máu não cục bộ thoáng qua (TIA) (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Cơn thiếu máu não cục bộ thoáng qua (TIA) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Cơn thiếu máu não cục bộ thoáng qua (TIA)",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Cơn thiếu máu não cục bộ thoáng qua (TIA): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "searchKeyword": "cơn thiếu máu não cục bộ thoáng qua (tia)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "searchKeyword": "cơn thiếu máu não cục bộ thoáng qua (tia)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "searchKeyword": "cơn thiếu máu não cục bộ thoáng qua (tia)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "searchKeyword": "cơn thiếu máu não cục bộ thoáng qua (tia)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "searchKeyword": "cơn thiếu máu não cục bộ thoáng qua (tia)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Cơn thiếu máu não cục bộ thoáng qua (TIA)",
        "searchKeyword": "cơn thiếu máu não cục bộ thoáng qua (tia)"
      }
    ]
  },
  "migraine_tien_dinh": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Migraine tiền đình",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Migraine tiền đình.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "migraine_tien_dinh_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Migraine tiền đình",
        "description": "migraine tiền đình, thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "migraine_tien_dinh_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Migraine tiền đình",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "migraine_tien_dinh_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Migraine tiền đình",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Migraine tiền đình (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Migraine tiền đình - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Migraine tiền đình",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Migraine tiền đình",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Migraine tiền đình: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Migraine tiền đình",
        "searchKeyword": "migraine tiền đình"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Migraine tiền đình",
        "searchKeyword": "migraine tiền đình"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Migraine tiền đình",
        "searchKeyword": "migraine tiền đình"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Migraine tiền đình",
        "searchKeyword": "migraine tiền đình"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Migraine tiền đình",
        "searchKeyword": "migraine tiền đình"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Migraine tiền đình",
        "searchKeyword": "migraine tiền đình"
      }
    ]
  },
  "migraine": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Migraine",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Migraine.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "migraine_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Migraine",
        "description": "migraine, thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "migraine_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Migraine",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "migraine_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Migraine",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Migraine (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Migraine - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Migraine",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Migraine",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Migraine: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Migraine",
        "searchKeyword": "migraine"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Migraine",
        "searchKeyword": "migraine"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Migraine",
        "searchKeyword": "migraine"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Migraine",
        "searchKeyword": "migraine"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Migraine",
        "searchKeyword": "migraine"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Migraine",
        "searchKeyword": "migraine"
      }
    ]
  },
  "trang_thai_dong_kinh": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Trạng thái động kinh",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Trạng thái động kinh.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "trang_thai_dong_kinh_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Trạng thái động kinh",
        "description": "trạng thái động kinh, thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "trang_thai_dong_kinh_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Trạng thái động kinh",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "trang_thai_dong_kinh_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Trạng thái động kinh",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Trạng thái động kinh (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Trạng thái động kinh - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Trạng thái động kinh",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Trạng thái động kinh",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Trạng thái động kinh: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Trạng thái động kinh",
        "searchKeyword": "trạng thái động kinh"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Trạng thái động kinh",
        "searchKeyword": "trạng thái động kinh"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Trạng thái động kinh",
        "searchKeyword": "trạng thái động kinh"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Trạng thái động kinh",
        "searchKeyword": "trạng thái động kinh"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Trạng thái động kinh",
        "searchKeyword": "trạng thái động kinh"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Trạng thái động kinh",
        "searchKeyword": "trạng thái động kinh"
      }
    ]
  },
  "viem_day_than_kinh_tien_dinh_vestibular_neuritis": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm dây thần kinh tiền đình (vestibular neuritis)",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm dây thần kinh tiền đình (vestibular neuritis).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "viem_day_than_kinh_tien_dinh_vestibular_neuritis_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "description": "viêm dây thần kinh tiền đình (vestibular neuritis), thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_day_than_kinh_tien_dinh_vestibular_neuritis_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_day_than_kinh_tien_dinh_vestibular_neuritis_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm dây thần kinh tiền đình (vestibular neuritis) (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm dây thần kinh tiền đình (vestibular neuritis) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm dây thần kinh tiền đình (vestibular neuritis)",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm dây thần kinh tiền đình (vestibular neuritis): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "searchKeyword": "viêm dây thần kinh tiền đình (vestibular neuritis)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "searchKeyword": "viêm dây thần kinh tiền đình (vestibular neuritis)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "searchKeyword": "viêm dây thần kinh tiền đình (vestibular neuritis)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "searchKeyword": "viêm dây thần kinh tiền đình (vestibular neuritis)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "searchKeyword": "viêm dây thần kinh tiền đình (vestibular neuritis)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm dây thần kinh tiền đình (vestibular neuritis)",
        "searchKeyword": "viêm dây thần kinh tiền đình (vestibular neuritis)"
      }
    ]
  },
  "xuat_huyet_duoi_nhen": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Xuất huyết dưới nhện",
    "specialty": "Tim mạch",
    "severity": "emergency",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Xuất huyết dưới nhện.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "xuat_huyet_duoi_nhen_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Xuất huyết dưới nhện",
        "description": "xuất huyết dưới nhện, tim mạch, thần kinh",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "xuat_huyet_duoi_nhen_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Xuất huyết dưới nhện",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "xuat_huyet_duoi_nhen_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Xuất huyết dưới nhện",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xuất huyết dưới nhện (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Xuất huyết dưới nhện - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Xuất huyết dưới nhện",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Xuất huyết dưới nhện",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Xuất huyết dưới nhện: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Xuất huyết dưới nhện",
        "searchKeyword": "xuất huyết dưới nhện"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Xuất huyết dưới nhện",
        "searchKeyword": "xuất huyết dưới nhện"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Xuất huyết dưới nhện",
        "searchKeyword": "xuất huyết dưới nhện"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Xuất huyết dưới nhện",
        "searchKeyword": "xuất huyết dưới nhện"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Xuất huyết dưới nhện",
        "searchKeyword": "xuất huyết dưới nhện"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Xuất huyết dưới nhện",
        "searchKeyword": "xuất huyết dưới nhện"
      }
    ]
  },
  "dong_kinh": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Động kinh",
    "specialty": "Thần kinh",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Động kinh.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "dong_kinh_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Động kinh",
        "description": "động kinh, thần kinh",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "dong_kinh_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Động kinh",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "dong_kinh_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Động kinh",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Động kinh (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Động kinh - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Động kinh",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Động kinh",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Động kinh: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Động kinh",
        "searchKeyword": "động kinh"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Động kinh",
        "searchKeyword": "động kinh"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Động kinh",
        "searchKeyword": "động kinh"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Động kinh",
        "searchKeyword": "động kinh"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Động kinh",
        "searchKeyword": "động kinh"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Động kinh",
        "searchKeyword": "động kinh"
      }
    ]
  },
  "dot_quy": {
    "icdCode": "I63",
    "icdPrefixes": [
      "I63",
      "I61",
      "I64"
    ],
    "diseaseName": "Đột quỵ",
    "specialty": "Tim mạch",
    "severity": "emergency",
    "summary": "Đột quỵ não là một hội chứng lâm sàng cấp tính phản ánh tình trạng tổn thương khu trú tại Hệ thần kinh trung ương do nguyên nhân mạch máu. Dưới góc độ chuyên khoa sâu, việc tiếp cận lâm sàng không chỉ dừng lại ở việc nhận diện triệu chứng mà phải liên kết chặt chẽ với cơ chế bệnh sinh, vùng giải phẫ...",
    "goldStandard": "cho nhu mô): Xung DWI phát hiện vùng lõi nhồi máu (hạn chế khuếch tán do Phù tế bào) với độ nhạy 99%. - Bất tương xứng DWI-FLAIR (Thời gian): Tổn thương tăng tín hiệu trên DWI nhưng chưa xuất hiện trê",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "dot_quy_c2"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "dot_quy_c1",
        "type": "major",
        "label": "- Triệu chứng điển hình: Người bệnh thường xuất hiện đơn độc hoặc phối hợp các dấu hiệu như liệt nửa người, liệt một chi, mất hoặc giảm cảm giác nửa người, mất thị lực, khiếm k",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c2",
        "type": "mandatory",
        "label": "- Đột quỵ nhẹ và TIA: TIA là tình trạng thiếu máu cục bộ gây triệu chứng khu trú kéo dài dưới 24 giờ và bắt buộc không có tổn thương nhồi máu trên xung DWI của cộng hưởng từ (C",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c3",
        "type": "lab",
        "label": "- Liên hệ bệnh sinh: Sự xuất hiện đột ngột của triệu chứng phản ánh tình trạng sụt giảm lưu lượng máu não (CBF) tức thì, dẫn đến suy giảm chức năng điện sinh lý của tế bào thần",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c4",
        "type": "major",
        "label": "- Triệu chứng toàn phát: Hội chứng tăng áp lực nội sọ (đau đầu, buồn nôn, nôn, rối loạn ý thức) kết hợp với dấu hiệu thần kinh khu trú (liệt nửa người đối diện, liệt",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c5",
        "type": "major",
        "label": "- Lâm sàng theo vị trí giải phẫu:",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c6",
        "type": "lab",
        "label": "- Liên hệ bệnh sinh: Triệu chứng lâm sàng trong ICH là hệ quả của hai yếu tố: (1) Tổn thương nguyên phát do sự phá hủy nhu mô não trực tiếp và sự lan rộng của khối máu tụ (hema",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c7",
        "type": "lab",
        "label": "- Triệu chứng: Đặc trưng kinh điển nhất là cơn \"đau đầu sét đánh\" - đau dữ dội, đột ngột, có cảm giác \"như muốn vỡ tung đầu\" và lan xuống vùng gáy chẩm. Đi kèm là [[Nôn ói|nôn",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "dot_quy_c8",
        "type": "lab",
        "label": "- Liên hệ bệnh sinh: Máu thoát ra khoang dưới nhện đột ngột làm tăng vọt áp lực nội sọ, gây kích ứng màng não sinh ra đau đầu dữ dội và cứng gáy. Áp lực nội sọ tăng tiệm cận áp",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Đột quỵ (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Đột quỵ - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Đột quỵ",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Đột quỵ",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Đột quỵ: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Đột quỵ",
        "searchKeyword": "đột quỵ"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Đột quỵ",
        "searchKeyword": "đột quỵ"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Đột quỵ",
        "searchKeyword": "đột quỵ"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Đột quỵ",
        "searchKeyword": "đột quỵ"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Đột quỵ",
        "searchKeyword": "đột quỵ"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Đột quỵ",
        "searchKeyword": "đột quỵ"
      }
    ]
  },
  "bang_quang_than_kinh_neurogenic_bladder": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bàng quang thần kinh (Neurogenic bladder)",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bàng quang thần kinh (Neurogenic bladder).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "bang_quang_than_kinh_neurogenic_bladder_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bàng quang thần kinh (Neurogenic bladder)",
        "description": "bàng quang thần kinh (neurogenic bladder), thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "bang_quang_than_kinh_neurogenic_bladder_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bàng quang thần kinh (Neurogenic bladder)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "bang_quang_than_kinh_neurogenic_bladder_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bàng quang thần kinh (Neurogenic bladder)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bàng quang thần kinh (Neurogenic bladder) (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bàng quang thần kinh (Neurogenic bladder) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bàng quang thần kinh (Neurogenic bladder)",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Bàng quang thần kinh (Neurogenic bladder)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bàng quang thần kinh (Neurogenic bladder): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bàng quang thần kinh (Neurogenic bladder)",
        "searchKeyword": "bàng quang thần kinh (neurogenic bladder)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bàng quang thần kinh (Neurogenic bladder)",
        "searchKeyword": "bàng quang thần kinh (neurogenic bladder)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bàng quang thần kinh (Neurogenic bladder)",
        "searchKeyword": "bàng quang thần kinh (neurogenic bladder)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bàng quang thần kinh (Neurogenic bladder)",
        "searchKeyword": "bàng quang thần kinh (neurogenic bladder)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bàng quang thần kinh (Neurogenic bladder)",
        "searchKeyword": "bàng quang thần kinh (neurogenic bladder)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bàng quang thần kinh (Neurogenic bladder)",
        "searchKeyword": "bàng quang thần kinh (neurogenic bladder)"
      }
    ]
  },
  "benh_than_iga": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh thận IgA",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh thận IgA.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "benh_than_iga_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh thận IgA",
        "description": "bệnh thận iga, thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_iga_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh thận IgA",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_iga_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh thận IgA",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh thận IgA (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh thận IgA - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh thận IgA",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Bệnh thận IgA",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh thận IgA: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh thận IgA",
        "searchKeyword": "bệnh thận iga"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh thận IgA",
        "searchKeyword": "bệnh thận iga"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh thận IgA",
        "searchKeyword": "bệnh thận iga"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh thận IgA",
        "searchKeyword": "bệnh thận iga"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh thận IgA",
        "searchKeyword": "bệnh thận iga"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh thận IgA",
        "searchKeyword": "bệnh thận iga"
      }
    ]
  },
  "benh_than_man_ckd": {
    "icdCode": "N18",
    "icdPrefixes": [
      "N18"
    ],
    "diseaseName": "Bệnh thận mạn (CKD)",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "11,5 g/dL) do các bằng chứng RCT cho thấy việc cố gắng bình thường hóa Hb không mang lại lợi ích lâm sàng rõ rệt mà lại làm tăng đột biến các nguy cơ lâm sàng như huyết khối và đột quỵ.",
    "goldStandard": "nhưng phức tạp, đắt đỏ và mang tính xâm lấn, do đó chủ yếu được dùng trong nghiên cứu hoặc các tình huống đặc biệt (ví dụ: đánh giá người hiến thận, chỉnh liều thuốc độc tính cao),. Trên lâm sàng, eGF",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "benh_than_man_ckd_c6"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "benh_than_man_ckd_c1",
        "type": "major",
        "label": "- Bệnh thận Đái tháo đường (DKD): Bệnh cảnh lâm sàng thường gặp nhất là sự kết hợp giữa béo phì, hội chứng chuyển hóa và bệnh thận. Bệnh nhân thường có biểu hiện của biến chứng",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c2",
        "type": "lab",
        "label": "- Bệnh thận Đa nang di truyền trội ở người lớn (ADPKD): Thận to dần theo tuổi, sờ thấy khối vùng hố chậu. Khởi phát các cơn đau hông lưng mạn tính (do thận quá to) hoặc đau cấp",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c3",
        "type": "lab",
        "label": "- Bệnh lý Cầu thận nguyên phát (IgA, Lupus, Bệnh cầu thận màng): Lâm sàng nổi bật là hội chứng thận hư (phù to, tiểu ít, nước tiểu nhiều bọt do protein niệu ngưỡng thận hư) hoặ",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c4",
        "type": "lab",
        "label": "- Creatinine huyết thanh (SCr): Là sản phẩm chuyển hóa của cơ xương, được lọc qua cầu thận nhưng cũng bị bài tiết một phần qua ống thận. Nồng độ SCr phụ thuộc mạnh vào khối lượ",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c5",
        "type": "major",
        "label": "- Cystatin C huyết thanh: Là một protein trọng lượng phân tử thấp được sản xuất bởi tất cả các tế bào có nhân, được lọc hoàn toàn qua cầu thận, tái hấp thu và thoái hóa ở ống l",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c6",
        "type": "mandatory",
        "label": "- Công thức kết hợp eGFRcr-cys: KDIGO 2024 khuyến cáo mạnh mẽ việc sử dụng phương trình kết hợp cả Creatinine và Cystatin C (eGFRcr-cys) trong các tình huống mà eGFRcr kém chín",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c7",
        "type": "major",
        "label": "- Cơ chế bệnh sinh: Rào cản lọc cầu thận (đặc biệt là lớp tế bào có chân - podocyte) bình thường ngăn chặn sự rò rỉ của các protein lớn. Khi áp lực nội cầu thận tăng (như trong",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_than_man_ckd_c8",
        "type": "lab",
        "label": "- Ứng dụng lâm sàng: Tỷ số Albumin/Creatinine niệu (UACR) đo trên mẫu nước tiểu bất kỳ (ưu tiên nước tiểu giữa dòng vào sáng sớm) là tiêu chuẩn được khuyến cáo hàng đầu. UACR $",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh thận mạn (CKD) (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh thận mạn (CKD) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh thận mạn (CKD)",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Bệnh thận mạn (CKD)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh thận mạn (CKD): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh thận mạn (CKD)",
        "searchKeyword": "bệnh thận mạn (ckd)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh thận mạn (CKD)",
        "searchKeyword": "bệnh thận mạn (ckd)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh thận mạn (CKD)",
        "searchKeyword": "bệnh thận mạn (ckd)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh thận mạn (CKD)",
        "searchKeyword": "bệnh thận mạn (ckd)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh thận mạn (CKD)",
        "searchKeyword": "bệnh thận mạn (ckd)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh thận mạn (CKD)",
        "searchKeyword": "bệnh thận mạn (ckd)"
      }
    ]
  },
  "benh_ong_than_mo_ke": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh ống thận - mô kẽ",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh ống thận - mô kẽ.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "benh_ong_than_mo_ke_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh ống thận - mô kẽ",
        "description": "bệnh ống thận - mô kẽ, thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_ong_than_mo_ke_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh ống thận - mô kẽ",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "benh_ong_than_mo_ke_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh ống thận - mô kẽ",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh ống thận - mô kẽ (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh ống thận - mô kẽ - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh ống thận - mô kẽ",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Bệnh ống thận - mô kẽ",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh ống thận - mô kẽ: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh ống thận - mô kẽ",
        "searchKeyword": "bệnh ống thận - mô kẽ"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh ống thận - mô kẽ",
        "searchKeyword": "bệnh ống thận - mô kẽ"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh ống thận - mô kẽ",
        "searchKeyword": "bệnh ống thận - mô kẽ"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh ống thận - mô kẽ",
        "searchKeyword": "bệnh ống thận - mô kẽ"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh ống thận - mô kẽ",
        "searchKeyword": "bệnh ống thận - mô kẽ"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh ống thận - mô kẽ",
        "searchKeyword": "bệnh ống thận - mô kẽ"
      }
    ]
  },
  "hoi_chung_alport": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Alport",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Alport.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "hoi_chung_alport_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Alport",
        "description": "hội chứng alport, thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "hoi_chung_alport_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Alport",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "hoi_chung_alport_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Alport",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Alport (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Alport - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Alport",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Hội chứng Alport",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Alport: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Alport",
        "searchKeyword": "hội chứng alport"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Alport",
        "searchKeyword": "hội chứng alport"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Alport",
        "searchKeyword": "hội chứng alport"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Alport",
        "searchKeyword": "hội chứng alport"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Alport",
        "searchKeyword": "hội chứng alport"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Alport",
        "searchKeyword": "hội chứng alport"
      }
    ]
  },
  "hoi_chung_than_hu": {
    "icdCode": "N04",
    "icdPrefixes": [
      "N04"
    ],
    "diseaseName": "Hội chứng thận hư",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng thận hư.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "hoi_chung_than_hu_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng thận hư",
        "description": "hội chứng thận hư, thận - tiết niệu, protein nieu > 3.5g/24h",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "hoi_chung_than_hu_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng thận hư",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "hoi_chung_than_hu_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng thận hư",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng thận hư (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng thận hư - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng thận hư",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Hội chứng thận hư",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng thận hư: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng thận hư",
        "searchKeyword": "hội chứng thận hư"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng thận hư",
        "searchKeyword": "hội chứng thận hư"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng thận hư",
        "searchKeyword": "hội chứng thận hư"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng thận hư",
        "searchKeyword": "hội chứng thận hư"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng thận hư",
        "searchKeyword": "hội chứng thận hư"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng thận hư",
        "searchKeyword": "hội chứng thận hư"
      }
    ]
  },
  "phi_dai_tien_liet_tuyen_bph": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Phì đại tiền liệt tuyến (BPH)",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Phì đại tiền liệt tuyến (BPH).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "phi_dai_tien_liet_tuyen_bph_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Phì đại tiền liệt tuyến (BPH)",
        "description": "phì đại tiền liệt tuyến (bph), thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "phi_dai_tien_liet_tuyen_bph_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Phì đại tiền liệt tuyến (BPH)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "phi_dai_tien_liet_tuyen_bph_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Phì đại tiền liệt tuyến (BPH)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Phì đại tiền liệt tuyến (BPH) (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Phì đại tiền liệt tuyến (BPH) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Phì đại tiền liệt tuyến (BPH)",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Phì đại tiền liệt tuyến (BPH)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Phì đại tiền liệt tuyến (BPH): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Phì đại tiền liệt tuyến (BPH)",
        "searchKeyword": "phì đại tiền liệt tuyến (bph)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Phì đại tiền liệt tuyến (BPH)",
        "searchKeyword": "phì đại tiền liệt tuyến (bph)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Phì đại tiền liệt tuyến (BPH)",
        "searchKeyword": "phì đại tiền liệt tuyến (bph)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Phì đại tiền liệt tuyến (BPH)",
        "searchKeyword": "phì đại tiền liệt tuyến (bph)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Phì đại tiền liệt tuyến (BPH)",
        "searchKeyword": "phì đại tiền liệt tuyến (bph)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Phì đại tiền liệt tuyến (BPH)",
        "searchKeyword": "phì đại tiền liệt tuyến (bph)"
      }
    ]
  },
  "ton_thuong_than_cap_aki": {
    "icdCode": "N17",
    "icdPrefixes": [
      "N17"
    ],
    "diseaseName": "Tổn thương thận cấp (AKI)",
    "specialty": "Thận - Tiết niệu",
    "severity": "urgent",
    "summary": "Table 2 Staging of AKI Stage 1: Serum creatinine 1.5-1.9 times baseline OR \\ge0.3 mg/dl (\\ge26.5 \\mu mol/l) increase. Urine output <0.5 ml/kg/h for 6-12 hours. Stage 2: Serum creatinine 2.0-2.9 times baseline. Urine output <0.5 ml/kg/h for \\ge 12 hours. Stage 3: Serum creatinine 3.0 times baseline OR Increase in serum creatinine to \\ge4.0 mg/dl (\\ge353.6 \\mu mol/l) OR Initiation of renal replacement therapy OR, In patients <18 years, decrease in eGFR to <35 ml/min per 1.73 m^{2}. Urine output <0.3 ml/kg/h for \\ge 24 hours OR Anuria for \\ge12 hours.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "ton_thuong_than_cap_aki_c1",
        "type": "lab",
        "label": "- Bệnh sử: Cần thu thập thông tin về các biến cố gây giảm tưới máu thận (mất máu, Sốc), phơi nhiễm với thuốc có độc tính thận (Kháng sinh aminoglycoside, NSAID, thuốc c",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c2",
        "type": "major",
        "label": "- Khám lâm sàng: Đánh giá tình trạng thể tích dịch (dấu hiệu suy Tim, Phù, hay Mất nước), áp lực tĩnh mạch cảnh, tìm kiếm các ban da, hoặc dấu hiệu [[Nhiễm trùng hu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c3",
        "type": "major",
        "label": "- Hóa sinh nước tiểu (FENa, FEUrea): Tỷ số bài tiết natri (FENa) < 1% và Tỷ số bài tiết ure (FEUrea) < 35% thường gợi ý AKI trước thận, thể hiện đáp ứng tái hấp thu mạnh của ốn",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c4",
        "type": "lab",
        "label": "- Soi cặn lắng nước tiểu (Urine Sediment Microscopy): Khảo sát cặn lắng nước tiểu mang lại giá trị rất lớn để phân biệt các tổn thương nhu mô. Khuyến cáo soi cặn lắng khi nguyê",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c5",
        "type": "major",
        "label": "- Cystatin C: Ít bị ảnh hưởng bởi khối cơ hơn so với SCr, giúp phát hiện sớm sự suy giảm GFR.",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c6",
        "type": "major",
        "label": "- [TIMP-2][IGFBP7]: Là các dấu ấn của tình trạng stress tế bào (cell cycle arrest markers) được đo trong nước tiểu. Sự gia tăng của chúng phản ánh nguy cơ tiến triển thành AKI",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c7",
        "type": "lab",
        "label": "- NGAL, KIM-1, IL-18, L-FABP: Là các dấu ấn của tổn thương cấu trúc tế bào biểu mô ống thận. Việc tăng các biomarker này đi trước SCr có thể cung cấp phân tầng rủi ro, dự đoán",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "ton_thuong_than_cap_aki_c8",
        "type": "imaging",
        "label": "- Siêu âm tại giường (POCUS) và Siêu âm thận: Phải được thực hiện trong quá trình đánh giá ban đầu nhằm loại trừ tắc nghẽn đường tiểu (phát hiện thận ứ nước, sỏi). Đồng thờ",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Tổn thương thận cấp (AKI) (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Tổn thương thận cấp (AKI) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Tổn thương thận cấp (AKI)",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Tổn thương thận cấp (AKI)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Tổn thương thận cấp (AKI): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Tổn thương thận cấp (AKI)",
        "searchKeyword": "tổn thương thận cấp (aki)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Tổn thương thận cấp (AKI)",
        "searchKeyword": "tổn thương thận cấp (aki)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Tổn thương thận cấp (AKI)",
        "searchKeyword": "tổn thương thận cấp (aki)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Tổn thương thận cấp (AKI)",
        "searchKeyword": "tổn thương thận cấp (aki)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Tổn thương thận cấp (AKI)",
        "searchKeyword": "tổn thương thận cấp (aki)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Tổn thương thận cấp (AKI)",
        "searchKeyword": "tổn thương thận cấp (aki)"
      }
    ]
  },
  "viem_bang_quang": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm bàng quang",
    "specialty": "Thận - Tiết niệu",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm bàng quang.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "viem_bang_quang_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm bàng quang",
        "description": "viêm bàng quang, thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "viem_bang_quang_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm bàng quang",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "viem_bang_quang_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm bàng quang",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm bàng quang (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm bàng quang - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm bàng quang",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Viêm bàng quang",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm bàng quang: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm bàng quang",
        "searchKeyword": "viêm bàng quang"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm bàng quang",
        "searchKeyword": "viêm bàng quang"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm bàng quang",
        "searchKeyword": "viêm bàng quang"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm bàng quang",
        "searchKeyword": "viêm bàng quang"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm bàng quang",
        "searchKeyword": "viêm bàng quang"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm bàng quang",
        "searchKeyword": "viêm bàng quang"
      }
    ]
  },
  "viem_cau_than": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm cầu thận",
    "specialty": "Thận - Tiết niệu",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm cầu thận.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "viem_cau_than_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm cầu thận",
        "description": "viêm cầu thận, thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "viem_cau_than_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm cầu thận",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "viem_cau_than_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm cầu thận",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm cầu thận (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm cầu thận - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm cầu thận",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Viêm cầu thận",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm cầu thận: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm cầu thận",
        "searchKeyword": "viêm cầu thận"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm cầu thận",
        "searchKeyword": "viêm cầu thận"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm cầu thận",
        "searchKeyword": "viêm cầu thận"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm cầu thận",
        "searchKeyword": "viêm cầu thận"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm cầu thận",
        "searchKeyword": "viêm cầu thận"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm cầu thận",
        "searchKeyword": "viêm cầu thận"
      }
    ]
  },
  "viem_tuyen_tien_liet": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm tuyến tiền liệt",
    "specialty": "Thận - Tiết niệu",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm tuyến tiền liệt.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thận - Tiết niệu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thận - Tiết niệu)"
    },
    "criteria": [
      {
        "id": "viem_tuyen_tien_liet_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm tuyến tiền liệt",
        "description": "viêm tuyến tiền liệt, thận - tiết niệu",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "viem_tuyen_tien_liet_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm tuyến tiền liệt",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Thận - Tiết niệu"
      },
      {
        "id": "viem_tuyen_tien_liet_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm tuyến tiền liệt",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Thận - Tiết niệu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm tuyến tiền liệt (Thận - Tiết niệu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm tuyến tiền liệt - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm tuyến tiền liệt",
          "class": "Thuốc đặc hiệu chuyên khoa Thận - Tiết niệu",
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
        "name": "Biến chứng cấp tính của Viêm tuyến tiền liệt",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm tuyến tiền liệt: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm tuyến tiền liệt",
        "searchKeyword": "viêm tuyến tiền liệt"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm tuyến tiền liệt",
        "searchKeyword": "viêm tuyến tiền liệt"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm tuyến tiền liệt",
        "searchKeyword": "viêm tuyến tiền liệt"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm tuyến tiền liệt",
        "searchKeyword": "viêm tuyến tiền liệt"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm tuyến tiền liệt",
        "searchKeyword": "viêm tuyến tiền liệt"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm tuyến tiền liệt",
        "searchKeyword": "viêm tuyến tiền liệt"
      }
    ]
  },
  "hoi_chung_vanh_cap": {
    "icdCode": "I20",
    "icdPrefixes": [
      "I20",
      "I21",
      "I24"
    ],
    "diseaseName": "Hội chứng vành cấp",
    "specialty": "Tim mạch",
    "severity": "urgent",
    "summary": "Dưới góc độ chuyên môn, biểu hiện lâm sàng của Hội chứng vành cấp (ACS) là bức tranh đa dạng và phức tạp, bị chi phối bởi vị trí mạch vành bị tắc nghẽn, mức độ thiếu máu cục bộ, và diện tích khối cơ tim bị ảnh hưởng. Việc nhận diện đúng và toàn diện các dấu hiệu lâm sàng là bước đi đầu tiên, quyết đ...",
    "goldStandard": "về mặt chẩn đoán hình thái tổn thương, vừa mở đường cho can thiệp điều trị tái tưới máu (PCI). Việc lựa chọn đường tiếp cận qua động mạch quay hiện nay được khuyến cáo là tiêu chuẩn do giúp giảm thiểu",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "hoi_chung_vanh_cap_c1",
        "type": "major",
        "label": "- Tính chất: Bệnh nhân thường mô tả cơn đau như có cảm giác đè nặng, bóp nghẹt, thắt chặt, đè ép, hoặc bỏng rát ngay vùng sau xương ức.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c2",
        "type": "major",
        "label": "- Thời gian và hoàn cảnh khởi phát: Cơn đau xảy ra ngay cả khi nghỉ ngơi hoặc chỉ vận động nhẹ, thường kéo dài trên 20 phút. Trong nhiều trường hợp, đó là cơn đau thắt ngực mới",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c3",
        "type": "major",
        "label": "- Hướng lan: Đau có thể lan lên cổ, hàm, lan ra một hoặc cả hai vai, cánh tay (thường gặp ở cánh tay trái), hoặc vùng thượng vị và giữa hai xương bả vai.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c4",
        "type": "minor",
        "label": "- Đối tượng nguy cơ: Các triệu chứng không điển hình xuất hiện với tần suất cao hơn đáng kể ở phụ nữ, người cao tuổi, bệnh nhân đái tháo đường, người mắc bệnh Thận mạn tính",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c5",
        "type": "major",
        "label": "- Biểu hiện: Các bệnh nhân này có thể hoàn toàn không có cơn đau ngực. Thay vào đó, họ chỉ biểu hiện bằng khó thở đơn độc, cảm giác mệt mỏi bất thường không rõ nguyên nhân, chó",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c6",
        "type": "lab",
        "label": "- Toàn trạng và Dấu hiệu sinh tồn: Bệnh nhân có thể biểu hiện nhợt nhạt, vã mồ hôi lạnh, hoặc run rẩy, đây thường là các dấu hiệu của phản ứng cường giao cảm do stress hoặc báo",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c7",
        "type": "major",
        "label": "- Khám tim mạch (Nghe tim):",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_cap_c8",
        "type": "major",
        "label": "- Khám phân biệt và Loại trừ:",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng vành cấp (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng vành cấp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng vành cấp",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Hội chứng vành cấp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng vành cấp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng vành cấp",
        "searchKeyword": "hội chứng vành cấp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng vành cấp",
        "searchKeyword": "hội chứng vành cấp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng vành cấp",
        "searchKeyword": "hội chứng vành cấp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng vành cấp",
        "searchKeyword": "hội chứng vành cấp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng vành cấp",
        "searchKeyword": "hội chứng vành cấp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng vành cấp",
        "searchKeyword": "hội chứng vành cấp"
      }
    ]
  },
  "hoi_chung_vanh_man": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng vành mạn",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "5 - 15%): Khuyến cáo tính Điểm vôi hóa động mạch vành (CACS) qua chụp CT không cản quang để phân loại lại nguy cơ, xác định chính xác hơn nhóm bệnh nhân có nguy cơ thực sự thấp (\\le 5%$) để tránh can thiệp thừa.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "hoi_chung_vanh_man_c1",
        "type": "major",
        "label": "- Vị trí và tính chất (1 điểm): Cảm giác thắt chặt, đè nặng, khó chịu vùng sau xương ức, có thể lan lên cổ, hàm, vai hoặc cánh tay.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c2",
        "type": "major",
        "label": "- Yếu tố khởi phát (1 điểm): Tăng lên khi gắng sức thể lực hoặc đối mặt với xúc cảm/căng thẳng tâm lý.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c3",
        "type": "major",
        "label": "- Yếu tố làm giảm (1 điểm): Thuyên giảm nhanh (trong vòng 5 phút) khi nghỉ ngơi hoặc sử dụng thuốc Nitrat ngậm dưới lưỡi.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c4",
        "type": "major",
        "label": "- Độ I: Đau ngực chỉ xuất hiện khi hoạt động thể lực rất mạnh, nhanh hoặc kéo dài.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c5",
        "type": "major",
        "label": "- Độ II: Hạn chế nhẹ hoạt động bình thường (đau khi đi bộ nhanh, leo dốc, sau bữa ăn no, hoặc khi trời lạnh).",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c6",
        "type": "major",
        "label": "- Độ III: Hạn chế đáng kể hoạt động thể lực (khó khăn khi đi bộ 1-2 dãy nhà hoặc leo 1 tầng gác ở tốc độ bình thường).",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c7",
        "type": "major",
        "label": "- Độ IV: Không thể thực hiện bất kỳ hoạt động thể lực nào mà không bị đau ngực, hoặc cơn đau xuất hiện ngay cả khi nghỉ ngơi.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_vanh_man_c8",
        "type": "lab",
        "label": "- Khám lâm sàng: Đo huyết áp, tính chỉ số khối cơ thể (BMI), đánh giá tình trạng thiếu máu. Bác sĩ cần chú ý tìm kiếm các dấu hiệu của bệnh mạch máu ngoại vi (bắt mạch chi dưới",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng vành mạn (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng vành mạn - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng vành mạn",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Hội chứng vành mạn",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng vành mạn: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng vành mạn",
        "searchKeyword": "hội chứng vành mạn"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng vành mạn",
        "searchKeyword": "hội chứng vành mạn"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng vành mạn",
        "searchKeyword": "hội chứng vành mạn"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng vành mạn",
        "searchKeyword": "hội chứng vành mạn"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng vành mạn",
        "searchKeyword": "hội chứng vành mạn"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng vành mạn",
        "searchKeyword": "hội chứng vành mạn"
      }
    ]
  },
  "suy_tim": {
    "icdCode": "I50",
    "icdPrefixes": [
      "I50",
      "I42"
    ],
    "diseaseName": "Suy tim",
    "specialty": "Tim mạch",
    "severity": "urgent",
    "summary": "80-90%) khiến bệnh nhân suy tim phải nhập viện cấp cứu.",
    "goldStandard": "để xác nhận tình trạng tăng áp lực đổ đầy ẩn giấu.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "suy_tim_c1",
        "type": "major",
        "label": "- Sung huyết Phổi (Suy tim trái): Tăng áp lực cuối tâm trương thất trái dẫn đến tăng áp lực mao mạch Phổi, đẩy dịch vào mô kẽ và phế nang.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c2",
        "type": "major",
        "label": "- Sung huyết hệ thống (Suy tim phải/Suy tim toàn bộ): Tăng áp lực thất phải dội ngược về hệ tĩnh mạch chủ.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c3",
        "type": "lab",
        "label": "- Ấm - Khô (Warm & Dry): Bệnh nhân ổn định, tưới máu tốt, không ứ dịch.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c4",
        "type": "lab",
        "label": "- Ấm - Ướt (Warm & Wet): Tưới máu tốt nhưng có sung huyết. Đây là thể lâm sàng phổ biến nhất, đáp ứng tốt với thuốc lợi tiểu và thuốc giãn mạch.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c5",
        "type": "lab",
        "label": "- Lạnh - Khô (Cold & Dry): Giảm tưới máu nhưng không có sung huyết. Thường do giảm thể tích tuần hoàn quá mức (ví dụ: dùng lợi tiểu quá liều).",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c6",
        "type": "lab",
        "label": "- Lạnh - Ướt (Cold & Wet): Vừa sung huyết vừa giảm tưới máu (Sốc tim). Tiên lượng tồi, cần các liệu pháp hồi sức tích cực.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c7",
        "type": "major",
        "label": "- Các giai đoạn tiến triển (ACC/AHA): Khẳng định tính chất tiến triển một chiều của bệnh lý.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "suy_tim_c8",
        "type": "major",
        "label": "- Phân độ NYHA (I đến IV): Đánh giá mức độ hạn chế vận động thể lực do triệu chứng cơ năng (khó thở, mệt). Bệnh nhân ở NYHA I có thể không có triệu chứng khi sinh hoạt bình thư",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Suy tim (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Suy tim - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Suy tim",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Suy tim",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Suy tim: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Suy tim",
        "searchKeyword": "suy tim"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Suy tim",
        "searchKeyword": "suy tim"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Suy tim",
        "searchKeyword": "suy tim"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Suy tim",
        "searchKeyword": "suy tim"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Suy tim",
        "searchKeyword": "suy tim"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Suy tim",
        "searchKeyword": "suy tim"
      }
    ]
  },
  "tang_huyet_ap": {
    "icdCode": "I10",
    "icdPrefixes": [
      "I10",
      "I11",
      "I15"
    ],
    "diseaseName": "Tăng huyết áp",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "30 mg/g hoặc eGFR < 60 ml/phút/1.73m² xác nhận có tổn thương thận mạn tính.",
    "goldStandard": "đánh giá độ cứng động mạch lớn, phản ánh sự lão hóa mạch máu do áp lực. - Chỉ số cổ chân - cánh tay (ABI): ABI < 0.9 là dấu hiệu của bệnh lý động mạch chi dưới.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "tang_huyet_ap_c1",
        "type": "major",
        "label": "- Tăng huyết áp áo choàng trắng (White-coat Hypertension): Huyết áp tăng \\ge 140/90 mmHg khi đo tại phòng khám nhưng bình thường khi đo tại nhà (< 135/85 mmHg) hoặc qua ABPM,",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c2",
        "type": "major",
        "label": "- Tăng huyết áp ẩn giấu (Masked Hypertension): Huyết áp tại phòng khám bình thường (< 140/90 mmHg) nhưng lại tăng cao khi đo ngoài phòng khám,. Kiểu hình này vô cùng nguy hiểm,",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c3",
        "type": "imaging",
        "label": "- Tăng huyết áp ban đêm (Nocturnal Hypertension) và mất trũng huyết áp (Non-dipper): Sinh lý bình thường, huyết áp sẽ giảm 10-20% khi ngủ (dipper). Nếu huyết áp không giảm (<10",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c4",
        "type": "lab",
        "label": "- Tăng huyết áp vọt buổi sáng (Morning Surge): Sự gia tăng đột ngột của huyết áp khi chuyển từ trạng thái ngủ sang thức. Về sinh lý bệnh, đây là thời điểm hệ thần kinh giao cảm",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c5",
        "type": "major",
        "label": "- Hạ huyết áp tư thế (Orthostatic Hypotension): Sụt giảm huyết áp tâm thu \\ge 20 mmHg và/hoặc tâm trương \\ge 10 mmHg trong vòng 1-3 phút sau khi đứng dậy. Triệu chứng lâm s",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c6",
        "type": "lab",
        "label": "- Não và mắt: Bệnh nhân có thể có các đợt thiếu máu não cục bộ thoáng qua (TIA), đột quỵ, suy giảm nhận thức, sa sút trí tuệ hoặc ngất. Khám đáy mắt có thể phát hiện bệnh lý võ",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c7",
        "type": "major",
        "label": "- Tim mạch: Do tim phải co bóp chống lại sức cản ngoại vi tăng cao (afterload), dẫn đến phì đại thất trái (LVH) và suy chức năng tâm trương,. Trên lâm sàng, bệnh nhân than phiề",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "tang_huyet_ap_c8",
        "type": "imaging",
        "label": "- Thận: Tổn thương các tiểu động mạch đến của cầu thận gây xơ hóa cầu thận. Triệu chứng lâm sàng giai đoạn đầu rất nghèo nàn, có thể chỉ là tiểu đêm (nocturia) hoặc tiểu nhiều.",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Tăng huyết áp (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Tăng huyết áp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Tăng huyết áp",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Tăng huyết áp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Tăng huyết áp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Tăng huyết áp",
        "searchKeyword": "tăng huyết áp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Tăng huyết áp",
        "searchKeyword": "tăng huyết áp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Tăng huyết áp",
        "searchKeyword": "tăng huyết áp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Tăng huyết áp",
        "searchKeyword": "tăng huyết áp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Tăng huyết áp",
        "searchKeyword": "tăng huyết áp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Tăng huyết áp",
        "searchKeyword": "tăng huyết áp"
      }
    ]
  },
  "benh_celiac": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh celiac",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh celiac.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "benh_celiac_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh celiac",
        "description": "bệnh celiac, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_celiac_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh celiac",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_celiac_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh celiac",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh celiac (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh celiac - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh celiac",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Bệnh celiac",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh celiac: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh celiac",
        "searchKeyword": "bệnh celiac"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh celiac",
        "searchKeyword": "bệnh celiac"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh celiac",
        "searchKeyword": "bệnh celiac"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh celiac",
        "searchKeyword": "bệnh celiac"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh celiac",
        "searchKeyword": "bệnh celiac"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh celiac",
        "searchKeyword": "bệnh celiac"
      }
    ]
  },
  "benh_wilson": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Wilson",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Bệnh Wilson.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "benh_wilson_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Bệnh Wilson",
        "description": "bệnh wilson, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_wilson_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Bệnh Wilson",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_wilson_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Bệnh Wilson",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Wilson (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Wilson - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Wilson",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Bệnh Wilson",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Wilson: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Wilson",
        "searchKeyword": "bệnh wilson"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Wilson",
        "searchKeyword": "bệnh wilson"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Wilson",
        "searchKeyword": "bệnh wilson"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Wilson",
        "searchKeyword": "bệnh wilson"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Wilson",
        "searchKeyword": "bệnh wilson"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Wilson",
        "searchKeyword": "bệnh wilson"
      }
    ]
  },
  "gerd": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "GERD",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "| Câu hỏi | Không bao giờ | Hiếm khi | Thỉnh thoảng | Thường xuyên | Luôn luôn | | :--- | :--- | :--- | :--- | :--- | :--- | | Bạn có cảm thấy nóng rát? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy dạ dày đầy hơi? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy nặng bụng sau bữa ăn? | 0 | 1 | 2 | 3 | 4 | | Bạn có phải dùng tay xoa vào ngực một cách vô thức? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy mệt, khó chịu sau bữa ăn? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy nóng rát sau bữa ăn? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy khác thường ở họng? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy no trong lúc ăn? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm thấy nghẹn khi nuốt không? | 0 | 1 | 2 | 3 | 4 | | Bạn có thấy dịch đắng trào lên họng không? | 0 | 1 | 2 | 3 | 4 | | Bạn có bị ợ nhiều không? | 0 | 1 | 2 | 3 | 4 | | Bạn có cảm giác nóng rát khi cúi xuống không? | 0 | 1 | 2 | 3 | 4 | Điểm FSSG ≥ 8 có giá trị chẩn đoán GERD với độ nhạy 62%, độ đặc hiệu 59%.",
    "goldStandard": "vì có tỷ lệ âm tính và dương tính giả cao, cũng như hiệu ứng giả dược. - Triệu chứng ngoài thực quản: Không khuyến cáo sử dụng điều trị thử bằng PPI như một xét nghiệm chẩn đoán GERD ở những bệnh nhân",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "gerd_c1",
        "type": "major",
        "label": "- Ợ nóng (Heartburn): Cảm giác nóng rát xuất phát từ vùng thượng vị hoặc sau xương ức, lan ngược lên vùng cổ. Triệu chứng này thường nặng lên sau bữa ăn hoặc khi bệnh nhân nằm",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c2",
        "type": "minor",
        "label": "- Ợ trớ (Regurgitation): Sự trào lên dễ dàng, không cần gắng sức của các chất từ dạ dày (thức ăn, dịch vị) lên vùng hầu họng hoặc miệng, thường kèm theo cảm giác có vị chua hoặ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c3",
        "type": "lab",
        "label": "- Đau ngực không do Tim (Non-cardiac chest pain): Đồng thuận Lyon 2.0 đã bổ sung đau ngực không do Tim vào nhóm triệu chứng điển hình của GERD. Biểu hiện này có thể",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c4",
        "type": "lab",
        "label": "- Hệ hô hấp: Ho mạn tính, khò khè, hen suyễn (lên cơn hoặc đợt cấp hen do trào ngược), xơ hóa Phổi vô căn, viêm Phổi tái phát do hít phải dịch trào ngược [ACG-Clinical-",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c5",
        "type": "lab",
        "label": "- Tai - Mũi - Họng: Viêm thanh quản, khàn giọng, tằng hắng (thường xuyên hắng giọng), cảm giác vướng ở họng (khối cầu ở họng - globus sensation), viêm xoang, viêm tai giữa [ACG",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c6",
        "type": "lab",
        "label": "- Răng miệng: Bào mòn men răng do sự tiếp xúc với axit dịch vị, tăng tiết nước bọt (water brash) [ACG-Clinical-Guideline-for-the-Diagnosis-and-Management-of-Gastroesophageal-Re",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c7",
        "type": "major",
        "label": "- Các triệu chứng tiêu hóa khác: Buồn nôn, đầy hơi, đau vùng thượng vị, chán ăn, khó nuốt. Tuy nhiên, Đau bụng, buồn nôn thường ít có khả năng sinh lý bệnh trực",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "gerd_c8",
        "type": "major",
        "label": "- Ợ hơi (Belching): Mối quan hệ giữa ợ hơi và bệnh trào ngược rất đa dạng, trong đó ợ hơi (cả ợ hơi trên dạ dày và ợ hơi từ dạ dày) có thể là một phần của cơ chế sinh bệnh học",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị GERD (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị GERD - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho GERD",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của GERD",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân GERD: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán GERD",
        "searchKeyword": "gerd"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán GERD",
        "searchKeyword": "gerd"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng GERD",
        "searchKeyword": "gerd"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị GERD",
        "searchKeyword": "gerd"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc GERD",
        "searchKeyword": "gerd"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng GERD",
        "searchKeyword": "gerd"
      }
    ]
  },
  "hoi_chung_alagille": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Alagille",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Alagille.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "hoi_chung_alagille_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Alagille",
        "description": "hội chứng alagille, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "hoi_chung_alagille_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Alagille",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "hoi_chung_alagille_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Alagille",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Alagille (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Alagille - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Alagille",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Hội chứng Alagille",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Alagille: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Alagille",
        "searchKeyword": "hội chứng alagille"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Alagille",
        "searchKeyword": "hội chứng alagille"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Alagille",
        "searchKeyword": "hội chứng alagille"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Alagille",
        "searchKeyword": "hội chứng alagille"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Alagille",
        "searchKeyword": "hội chứng alagille"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Alagille",
        "searchKeyword": "hội chứng alagille"
      }
    ]
  },
  "hoi_chung_budd_chiari_huyet_khoi_tinh_mach_gan": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
    "specialty": "Tim mạch",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tim mạch",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "hoi_chung_budd_chiari_huyet_khoi_tinh_mach_gan_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "description": "hội chứng budd-chiari (huyết khối tĩnh mạch gan), tim mạch, tiêu hóa - gan mật",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_budd_chiari_huyet_khoi_tinh_mach_gan_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "hoi_chung_budd_chiari_huyet_khoi_tinh_mach_gan_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan) (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "searchKeyword": "hội chứng budd-chiari (huyết khối tĩnh mạch gan)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "searchKeyword": "hội chứng budd-chiari (huyết khối tĩnh mạch gan)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "searchKeyword": "hội chứng budd-chiari (huyết khối tĩnh mạch gan)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "searchKeyword": "hội chứng budd-chiari (huyết khối tĩnh mạch gan)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "searchKeyword": "hội chứng budd-chiari (huyết khối tĩnh mạch gan)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Budd-Chiari (Huyết khối tĩnh mạch gan)",
        "searchKeyword": "hội chứng budd-chiari (huyết khối tĩnh mạch gan)"
      }
    ]
  },
  "hoi_chung_gilbert": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng Gilbert",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng Gilbert.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "hoi_chung_gilbert_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng Gilbert",
        "description": "hội chứng gilbert, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "hoi_chung_gilbert_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng Gilbert",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "hoi_chung_gilbert_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng Gilbert",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng Gilbert (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng Gilbert - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng Gilbert",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Hội chứng Gilbert",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng Gilbert: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng Gilbert",
        "searchKeyword": "hội chứng gilbert"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng Gilbert",
        "searchKeyword": "hội chứng gilbert"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng Gilbert",
        "searchKeyword": "hội chứng gilbert"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng Gilbert",
        "searchKeyword": "hội chứng gilbert"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng Gilbert",
        "searchKeyword": "hội chứng gilbert"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng Gilbert",
        "searchKeyword": "hội chứng gilbert"
      }
    ]
  },
  "hoi_chung_ruot_ngan": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Hội chứng ruột ngắn",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Hội chứng ruột ngắn.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "hoi_chung_ruot_ngan_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Hội chứng ruột ngắn",
        "description": "hội chứng ruột ngắn, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "hoi_chung_ruot_ngan_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Hội chứng ruột ngắn",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "hoi_chung_ruot_ngan_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Hội chứng ruột ngắn",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Hội chứng ruột ngắn (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Hội chứng ruột ngắn - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Hội chứng ruột ngắn",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Hội chứng ruột ngắn",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Hội chứng ruột ngắn: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Hội chứng ruột ngắn",
        "searchKeyword": "hội chứng ruột ngắn"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Hội chứng ruột ngắn",
        "searchKeyword": "hội chứng ruột ngắn"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Hội chứng ruột ngắn",
        "searchKeyword": "hội chứng ruột ngắn"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Hội chứng ruột ngắn",
        "searchKeyword": "hội chứng ruột ngắn"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Hội chứng ruột ngắn",
        "searchKeyword": "hội chứng ruột ngắn"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Hội chứng ruột ngắn",
        "searchKeyword": "hội chứng ruột ngắn"
      }
    ]
  },
  "loet_da_day_ta_trang": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Loét dạ dày - tá tràng",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Loét dạ dày - tá tràng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "loet_da_day_ta_trang_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Loét dạ dày - tá tràng",
        "description": "loét dạ dày - tá tràng, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "loet_da_day_ta_trang_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Loét dạ dày - tá tràng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "loet_da_day_ta_trang_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Loét dạ dày - tá tràng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Loét dạ dày - tá tràng (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Loét dạ dày - tá tràng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Loét dạ dày - tá tràng",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Loét dạ dày - tá tràng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Loét dạ dày - tá tràng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Loét dạ dày - tá tràng",
        "searchKeyword": "loét dạ dày - tá tràng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Loét dạ dày - tá tràng",
        "searchKeyword": "loét dạ dày - tá tràng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Loét dạ dày - tá tràng",
        "searchKeyword": "loét dạ dày - tá tràng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Loét dạ dày - tá tràng",
        "searchKeyword": "loét dạ dày - tá tràng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Loét dạ dày - tá tràng",
        "searchKeyword": "loét dạ dày - tá tràng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Loét dạ dày - tá tràng",
        "searchKeyword": "loét dạ dày - tá tràng"
      }
    ]
  },
  "thieu_hut_alpha_1_antitrypsin": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thiếu hụt Alpha-1 antitrypsin",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thiếu hụt Alpha-1 antitrypsin.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "thieu_hut_alpha_1_antitrypsin_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thiếu hụt Alpha-1 antitrypsin",
        "description": "thiếu hụt alpha-1 antitrypsin, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "thieu_hut_alpha_1_antitrypsin_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thiếu hụt Alpha-1 antitrypsin",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "thieu_hut_alpha_1_antitrypsin_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thiếu hụt Alpha-1 antitrypsin",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thiếu hụt Alpha-1 antitrypsin (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thiếu hụt Alpha-1 antitrypsin - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thiếu hụt Alpha-1 antitrypsin",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Thiếu hụt Alpha-1 antitrypsin",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thiếu hụt Alpha-1 antitrypsin: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thiếu hụt Alpha-1 antitrypsin",
        "searchKeyword": "thiếu hụt alpha-1 antitrypsin"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thiếu hụt Alpha-1 antitrypsin",
        "searchKeyword": "thiếu hụt alpha-1 antitrypsin"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thiếu hụt Alpha-1 antitrypsin",
        "searchKeyword": "thiếu hụt alpha-1 antitrypsin"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thiếu hụt Alpha-1 antitrypsin",
        "searchKeyword": "thiếu hụt alpha-1 antitrypsin"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thiếu hụt Alpha-1 antitrypsin",
        "searchKeyword": "thiếu hụt alpha-1 antitrypsin"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thiếu hụt Alpha-1 antitrypsin",
        "searchKeyword": "thiếu hụt alpha-1 antitrypsin"
      }
    ]
  },
  "trao_nguoc_da_day_thuc_quan_gerd": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Trào ngược dạ dày - thực quản (GERD)",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Trào ngược dạ dày - thực quản (GERD).",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "trao_nguoc_da_day_thuc_quan_gerd_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Trào ngược dạ dày - thực quản (GERD)",
        "description": "trào ngược dạ dày - thực quản (gerd), tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "trao_nguoc_da_day_thuc_quan_gerd_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Trào ngược dạ dày - thực quản (GERD)",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "trao_nguoc_da_day_thuc_quan_gerd_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Trào ngược dạ dày - thực quản (GERD)",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Trào ngược dạ dày - thực quản (GERD) (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Trào ngược dạ dày - thực quản (GERD) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Trào ngược dạ dày - thực quản (GERD)",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Trào ngược dạ dày - thực quản (GERD)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Trào ngược dạ dày - thực quản (GERD): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Trào ngược dạ dày - thực quản (GERD)",
        "searchKeyword": "trào ngược dạ dày - thực quản (gerd)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Trào ngược dạ dày - thực quản (GERD)",
        "searchKeyword": "trào ngược dạ dày - thực quản (gerd)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Trào ngược dạ dày - thực quản (GERD)",
        "searchKeyword": "trào ngược dạ dày - thực quản (gerd)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Trào ngược dạ dày - thực quản (GERD)",
        "searchKeyword": "trào ngược dạ dày - thực quản (gerd)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Trào ngược dạ dày - thực quản (GERD)",
        "searchKeyword": "trào ngược dạ dày - thực quản (gerd)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Trào ngược dạ dày - thực quản (GERD)",
        "searchKeyword": "trào ngược dạ dày - thực quản (gerd)"
      }
    ]
  },
  "viem_tuy_cap": {
    "icdCode": "K85.0",
    "icdPrefixes": [
      "K85"
    ],
    "diseaseName": "Viêm tụy cấp",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Viêm tụy cấp (Acute Pancreatitis - AP) là tình trạng viêm vô khuẩn cấp tính của nhu mô tụy do sự tự hoạt hóa sớm của các enzyme tiêu hóa (tiền enzyme Trypsinogen chuyển thành Trypsin ngay trong lòng tuyến tụy). Chẩn đoán xác định dựa vào Bộ 3 Tiêu chuẩn Atlanta 2012 cải biên (Cần \\ge 2/3 tiêu chuẩn). Phân tầng độ nặng chuẩn mực dựa trên Tình trạng suy tạng kéo dài > 48 giờ (Persistent Organ Failure) và các biến chứng hoại tử tụy.",
    "goldStandard": "CHẨN ĐOÁN XÁC ĐỊNH (REVISED ATLANTA CRITERIA 2012)",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "viem_tuy_cap_c1",
        "type": "major",
        "label": "1. Hệ Hô hấp: Tỷ số PaO2 / FiO2 \\le 300 (201-300 = 2\\text{đ}, 101-200 = 3\\text{đ}, \\le 100 = 4\\text{đ}).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c2",
        "type": "lab",
        "label": "2. Hệ Thận: Nồng độ Creatinine máu > 170\\ \\mu\\text{mol/L} (> 1.9\\text{ mg/dL} = 2\\text{đ}, > 3.6\\text{ mg/dL} = 3\\text{đ}, > 4.9\\text{ mg/dL} = 4\\text{đ}).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c3",
        "type": "lab",
        "label": "3. Hệ Tim mạch: Tụt huyết áp không đáp ứng với bù dịch (Huyết áp tâm thu < 90\\text{ mmHg} kèm toan máu \\text{pH} < 7.3 = 2\\text{đ}, \\text{pH} < 7.2 = 3\\text{đ}).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c4",
        "type": "major",
        "label": "- \\text{BISAP } 0 - 2\\text{ điểm}: Nguy cơ tử vong thấp (< 2\\%).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c5",
        "type": "major",
        "label": "- \\text{BISAP } 3 - 5\\text{ điểm}: Nguy cơ tử vong tăng vọt (15 - 22\\%) \\to Chỉ định theo dõi sát tại Đơn vị Hồi sức tích cực (ICU).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c6",
        "type": "major",
        "label": "1. Hồi Sức Dịch Mục Tiêu Cẩn Trọng (Targeted Fluid Resuscitation):",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c7",
        "type": "imaging",
        "label": "- Loại dịch ưu tiên: Dung dịch Ringer Lactate (giúp giảm phản ứng viêm hệ thống và toan chuyển hóa tốt hơn NaCl 0.9%).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_cap_c8",
        "type": "major",
        "label": "- Tốc độ truyền: 1.5 - 3\\text{ mL/kg/giờ} (hoặc 10\\text{ mL/kg} bolus nếu tụt áp). Tránh truyền dịch quá ồ ạt (> 4-5\\text{ L/24h}) theo kết quả thử nghiệm kinh đi",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm tụy cấp (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm tụy cấp - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm tụy cấp",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Viêm tụy cấp",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm tụy cấp: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm tụy cấp",
        "searchKeyword": "viêm tụy cấp"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm tụy cấp",
        "searchKeyword": "viêm tụy cấp"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm tụy cấp",
        "searchKeyword": "viêm tụy cấp"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm tụy cấp",
        "searchKeyword": "viêm tụy cấp"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm tụy cấp",
        "searchKeyword": "viêm tụy cấp"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm tụy cấp",
        "searchKeyword": "viêm tụy cấp"
      }
    ]
  },
  "viem_tuy_man": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm tụy mạn",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Viêm tụy mạn.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "viem_tuy_man_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Viêm tụy mạn",
        "description": "viêm tụy mạn, tiêu hóa - gan mật",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_man_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Viêm tụy mạn",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "viem_tuy_man_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Viêm tụy mạn",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm tụy mạn (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm tụy mạn - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm tụy mạn",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Viêm tụy mạn",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm tụy mạn: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm tụy mạn",
        "searchKeyword": "viêm tụy mạn"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm tụy mạn",
        "searchKeyword": "viêm tụy mạn"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm tụy mạn",
        "searchKeyword": "viêm tụy mạn"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm tụy mạn",
        "searchKeyword": "viêm tụy mạn"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm tụy mạn",
        "searchKeyword": "viêm tụy mạn"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm tụy mạn",
        "searchKeyword": "viêm tụy mạn"
      }
    ]
  },
  "xuat_huyet_tieu_hoa_duoi": {
    "icdCode": "K92.0",
    "icdPrefixes": [
      "K92"
    ],
    "diseaseName": "Xuất huyết tiêu hóa dưới",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Xuất huyết tiêu hóa dưới.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "xuat_huyet_tieu_hoa_duoi_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Xuất huyết tiêu hóa dưới",
        "description": "xuất huyết tiêu hóa dưới, tiêu hóa - gan mật, noi soi da day",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xuat_huyet_tieu_hoa_duoi_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Xuất huyết tiêu hóa dưới",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xuat_huyet_tieu_hoa_duoi_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Xuất huyết tiêu hóa dưới",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xuất huyết tiêu hóa dưới (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Xuất huyết tiêu hóa dưới - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Xuất huyết tiêu hóa dưới",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Xuất huyết tiêu hóa dưới",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Xuất huyết tiêu hóa dưới: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Xuất huyết tiêu hóa dưới",
        "searchKeyword": "xuất huyết tiêu hóa dưới"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Xuất huyết tiêu hóa dưới",
        "searchKeyword": "xuất huyết tiêu hóa dưới"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Xuất huyết tiêu hóa dưới",
        "searchKeyword": "xuất huyết tiêu hóa dưới"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Xuất huyết tiêu hóa dưới",
        "searchKeyword": "xuất huyết tiêu hóa dưới"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Xuất huyết tiêu hóa dưới",
        "searchKeyword": "xuất huyết tiêu hóa dưới"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Xuất huyết tiêu hóa dưới",
        "searchKeyword": "xuất huyết tiêu hóa dưới"
      }
    ]
  },
  "xuat_huyet_tieu_hoa_tren": {
    "icdCode": "K92.0",
    "icdPrefixes": [
      "K92"
    ],
    "diseaseName": "Xuất huyết tiêu hóa trên",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Xuất huyết tiêu hóa trên.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "xuat_huyet_tieu_hoa_tren_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Xuất huyết tiêu hóa trên",
        "description": "xuất huyết tiêu hóa trên, tiêu hóa - gan mật, noi soi da day",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xuat_huyet_tieu_hoa_tren_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Xuất huyết tiêu hóa trên",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xuat_huyet_tieu_hoa_tren_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Xuất huyết tiêu hóa trên",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xuất huyết tiêu hóa trên (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Xuất huyết tiêu hóa trên - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Xuất huyết tiêu hóa trên",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Xuất huyết tiêu hóa trên",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Xuất huyết tiêu hóa trên: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Xuất huyết tiêu hóa trên",
        "searchKeyword": "xuất huyết tiêu hóa trên"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Xuất huyết tiêu hóa trên",
        "searchKeyword": "xuất huyết tiêu hóa trên"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Xuất huyết tiêu hóa trên",
        "searchKeyword": "xuất huyết tiêu hóa trên"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Xuất huyết tiêu hóa trên",
        "searchKeyword": "xuất huyết tiêu hóa trên"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Xuất huyết tiêu hóa trên",
        "searchKeyword": "xuất huyết tiêu hóa trên"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Xuất huyết tiêu hóa trên",
        "searchKeyword": "xuất huyết tiêu hóa trên"
      }
    ]
  },
  "xo_gan": {
    "icdCode": "K74",
    "icdPrefixes": [
      "K74",
      "K70"
    ],
    "diseaseName": "Xơ gan",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "routine",
    "summary": "1). Phosphatase kiềm (ALP) và GGT tăng cao thường gợi ý nguyên nhân ứ mật hoặc do rượu.",
    "goldStandard": "chẩn đoán Viêm phúc mạc nhiễm khuẩn nguyên phát (SBP). Dịch báng nên được cấy trực tiếp vào chai cấy máu tại giường bệnh (10 mL mỗi chai) để tăng tỷ lệ mọc của vi khuẩn. - Đánh giá SAAG (Serum-Ascites",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "xo_gan_c1",
        "type": "major",
        "label": "- Triệu chứng cơ năng: Bệnh nhân thường hoàn toàn không có triệu chứng hoặc chỉ có những biểu hiện mơ hồ như mệt mỏi, chán ăn nhẹ.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c2",
        "type": "lab",
        "label": "- Dấu hiệu thực thể: Bệnh thường được phát hiện tình cờ qua khám sức khỏe định kỳ với gan to, lách to, hoặc qua các xét nghiệm cận lâm sàng thấy men gan (Aminotransferase",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c3",
        "type": "major",
        "label": "- Báng bụng (Ascites): Là biến chứng mất bù thường gặp nhất, làm bụng phình to. Bệnh nhân có thể có gõ đục vùng thấp và dấu hiệu sóng vỗ.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c4",
        "type": "major",
        "label": "- Tuần hoàn bàng hệ:",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c5",
        "type": "major",
        "label": "- Lách to (Splenomegaly): Do sung huyết tĩnh mạch cửa.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c6",
        "type": "lab",
        "label": "- Giãn tĩnh mạch thực quản - dạ dày: Thường không có triệu chứng cho đến khi vỡ, gây Xuất huyết tiêu hóa ồ ạt, nôn ra máu tươi hoặc đi cầu phân đen.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c7",
        "type": "major",
        "label": "- Vàng da, vàng mắt: Xuất hiện khi nồng độ Bilirubin huyết thanh ==vượt quá 3 mg/dL==, phản ánh tình trạng suy giảm chức năng bài tiết của gan.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "xo_gan_c8",
        "type": "major",
        "label": "- Dấu sao mạch (Spider nevi) & Lòng bàn tay son (Palmar erythema):",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Xơ gan (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Xơ gan - Bộ Y Tế & Quốc Tế",
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
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
  "botulism": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Botulism",
    "specialty": "Thần kinh",
    "severity": "urgent",
    "summary": "Bệnh cảnh lâm sàng của Botulism phản ánh trực tiếp cơ chế tác động của độc tố botulinum (BoNT). Độc tố này ức chế giải phóng acetylcholine tại màng tiền synap của các khớp nối thần kinh cơ và các hạch tự chủ ngoại vi. Do BoNT không xâm nhập và tác động lên Hệ thần kinh trung ương như độc tố uốn ván,...",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Thần kinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "botulism_c1",
        "type": "major",
        "label": "- Tiền triệu Tiêu hóa: Thời gian ủ bệnh thường từ 12 đến 36 giờ, nhưng có thể dao động từ 4 giờ đến 8 ngày. Bệnh nhân ban đầu có thể cảm thấy [[Nôn ói|buồn nôn]], khô miệng",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c2",
        "type": "major",
        "label": "- Tiến triển Thần kinh Cơ: Rối loạn chức năng thần kinh sọ khởi phát ở mắt (nhìn mờ do giãn đồng tử, liệt dây thần kinh III, IV hoặc VI). Liệt các dây thần kinh sọ thấp hơn gây",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c3",
        "type": "major",
        "label": "- Biến chứng Hô hấp: Tình trạng yếu cơ sau đó lan xuống chi trên, thân mình và chi dưới. Rối loạn chức năng hô hấp đe dọa tính mạng là hậu quả của sự kết hợp giữa tắc nghẽn đườ",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c4",
        "type": "major",
        "label": "- Rối loạn Thần kinh Tự chủ: Bệnh nhân có thể xuất hiện các triệu chứng rối loạn tiêu hóa, thay đổi nhịp Tim lúc nghỉ, mất đáp ứng huyết động với thay đổi tư thế, hạ thân n",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c5",
        "type": "major",
        "label": "- Lâm sàng: Bệnh cảnh thần kinh hoàn toàn tương tự như thể thực phẩm nhưng thiếu vắng các triệu chứng rối loạn tiêu hóa tiền triệu.",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c6",
        "type": "major",
        "label": "- Đặc điểm Vết thương: Nếu bệnh nhân có Sốt, đó là dấu hiệu của nhiễm trùng vết thương chứ không phải do bản thân độc tố botulinum gây ra. Đáng chú ý, bản thân vết thương t",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c7",
        "type": "major",
        "label": "- Thể hít: Các dấu hiệu và triệu chứng tương tự như khi nuốt phải độc tố. Thời gian ủ bệnh từ 12 giờ đến 3 ngày, với biểu hiện bệnh tối đa vào khoảng 5 ngày sau phơi nhiễm.",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "botulism_c8",
        "type": "major",
        "label": "- Thể do can thiệp y khoa/thẩm mỹ: Rất hiếm gặp, thường xảy ra sau khi tiêm botulinum toxin (Botox) không đúng kỹ thuật, quá liều hoặc dùng chế phẩm không được cấp phép. Triệu",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Botulism (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Botulism - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Botulism",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Botulism",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Botulism: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Botulism",
        "searchKeyword": "botulism"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Botulism",
        "searchKeyword": "botulism"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Botulism",
        "searchKeyword": "botulism"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Botulism",
        "searchKeyword": "botulism"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Botulism",
        "searchKeyword": "botulism"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Botulism",
        "searchKeyword": "botulism"
      }
    ]
  },
  "bach_hau": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bạch hầu",
    "specialty": "Tim mạch",
    "severity": "urgent",
    "summary": "Dưới góc độ lâm sàng, bệnh bạch hầu là một thách thức chẩn đoán trong giai đoạn sớm do các triệu chứng ban đầu rất dễ nhầm lẫn với viêm họng thông thường. Tuy nhiên, nếu không được phát hiện và can thiệp trung hòa độc tố kịp thời, bệnh sẽ tiến triển rất nhanh thành một hội chứng nhiễm trùng - nhiễm ...",
    "goldStandard": "Nuôi cấy là tiêu chuẩn vàng không thể thiếu, không chỉ để định danh mà còn để cung cấp chủng vi khuẩn cho thử nghiệm độc lực và Kháng sinh đồ.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tim mạch)"
    },
    "criteria": [
      {
        "id": "bach_hau_c1",
        "type": "major",
        "label": "- Liên hệ sinh lý bệnh: Tại vị trí vi khuẩn cư trú, ngoại độc tố ức chế quá trình tổng hợp protein của tế bào biểu mô, gây hoại tử mô tại chỗ và kích thích quá trình viêm xuất",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c2",
        "type": "lab",
        "label": "- Biểu hiện lâm sàng: Khoảng 1-2 ngày sau khi khởi phát, các đốm xuất tiết nhỏ màu trắng xám xuất hiện ở họng, sau đó nhanh chóng lan rộng và hòa kết lại thành một lớp màng giả",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c3",
        "type": "major",
        "label": "- Dấu hiệu nhiễm độc: Hạch bạch huyết vùng cổ trước sưng to, đau. Ở những bệnh nhân diễn tiến nặng, tình trạng viêm và Phù nề mô mềm vùng cổ lan rộng tạo ra dấu hiệu \"cổ",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c4",
        "type": "major",
        "label": "- Biểu hiện lâm sàng: Bệnh nhân thay đổi giọng nói, khàn tiếng, ho ông ổng (barking cough) và có tiếng rít thanh quản (stridor) thì hít vào.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c5",
        "type": "minor",
        "label": "- Đánh giá độ nặng: Đây là một cấp cứu đường thở. Sự Phù nề đường hô hấp kết hợp với lớp giả mạc lan rộng có thể gây bít tắc đường thở cấp tính, đặc biệt nguy hiểm ở tr",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c6",
        "type": "major",
        "label": "- Sinh lý bệnh: Độc tố có ái lực rất cao với tế bào cơ tim, gây thoái hóa mỡ và phá hủy vĩnh viễn cả hệ thống co bóp lẫn hệ thống dẫn truyền.",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c7",
        "type": "imaging",
        "label": "- Lâm sàng: Đáng chú ý là viêm cơ tim thường xuất hiện vào tuần thứ 2, khi các triệu chứng tại hầu họng đang có dấu hiệu thuyên giảm và bệnh nhân tưởng chừng đang hồi phục. Bện",
        "sourceGuideline": "Tim mạch"
      },
      {
        "id": "bach_hau_c8",
        "type": "minor",
        "label": "- Sinh lý bệnh: Độc tố gây thoái hóa lớp bao myelin của các rễ thần kinh. Khác với tổn thương cơ tim, tổn thương thần kinh có khả năng phục hồi hoàn toàn sau vài tháng khi lớp",
        "sourceGuideline": "Tim mạch"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bạch hầu (Tim mạch)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bạch hầu - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bạch hầu",
          "class": "Thuốc đặc hiệu chuyên khoa Tim mạch",
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
        "name": "Biến chứng cấp tính của Bạch hầu",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bạch hầu: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bạch hầu",
        "searchKeyword": "bạch hầu"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bạch hầu",
        "searchKeyword": "bạch hầu"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bạch hầu",
        "searchKeyword": "bạch hầu"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bạch hầu",
        "searchKeyword": "bạch hầu"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bạch hầu",
        "searchKeyword": "bạch hầu"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bạch hầu",
        "searchKeyword": "bạch hầu"
      }
    ]
  },
  "benh_dai": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh dại",
    "specialty": "Thần kinh",
    "severity": "urgent",
    "summary": "Quá trình nhiễm virus dại khởi đầu bằng một thời kỳ ủ bệnh có sự dao động rất lớn về mặt thời gian, từ dưới 30 ngày (chiếm 25% trường hợp), 30 đến 90 ngày (50%), cho đến từ 90 ngày đến 1 năm (20%), và cá biệt có khoảng 5% trường hợp ủ bệnh kéo dài trên 1 năm. Sự khác biệt này phụ thuộc rất lớn vào v...",
    "goldStandard": "để chẩn đoán thời gian thực (real-time) ở người là phương pháp nhuộm miễn dịch huỳnh quang trực tiếp (DFA) trên mảnh sinh thiết da gáy toàn lớp. Mảnh sinh thiết cần lấy ở vùng gáy trên đường chân tóc,",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "benh_dai_c5"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "benh_dai_c1",
        "type": "major",
        "label": "- Dấu hiệu lâm sàng chỉ điểm: Một triệu chứng thần kinh cực kỳ có giá trị gợi ý sớm trên lâm sàng là cảm giác dị cảm, đau kiểu thần kinh, hoặc ngứa rát tại vị trí vết thương cũ",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c2",
        "type": "major",
        "label": "- Liên hệ cơ chế bệnh sinh: Tình trạng dị cảm tại chỗ phản ánh trực tiếp quá trình virus dại đang nhân lên và bắt đầu xâm nhập, di chuyển ngược dòng dọc theo các sợi trục của h",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c3",
        "type": "minor",
        "label": "- Chứng sợ nước (Hydrophobia) và sợ gió (Aerophobia): Là những triệu chứng kinh điển và mang tính bản lề của thể dại hung dữ. Bệnh nhân khởi đầu với cảm giác vướng mắc ở họng,",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c4",
        "type": "major",
        "label": "- Rối loạn hành vi và thần kinh thực vật: Bệnh nhân rơi vào trạng thái kích động tột độ, bồn chồn, lú lẫn, hoang tưởng, ảo giác và đôi khi có những hành vi cắn xé, la hét bất t",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c5",
        "type": "mandatory",
        "label": "- Liên hệ cơ chế bệnh sinh: Khác với sự phá hủy mô hoại tử ồ ạt ở nhiều bệnh lý Viêm não virus khác, tổn thương thần kinh trong bệnh dại chủ yếu là do rối loạn chức năng cấ",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c6",
        "type": "major",
        "label": "- Đặc điểm lâm sàng: Bệnh cảnh nổi bật là tình trạng liệt mềm tiến triển dần lên trên (ascending paralysis) tương tự như hội chứng Guillain-Barré, hoặc biểu hiện yếu liệt tứ ch",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c7",
        "type": "major",
        "label": "- Ứng dụng chẩn đoán phân biệt: Trên thực hành, thể dại liệt rất dễ nhầm lẫn với các bệnh lý thần kinh cơ khác. Để phân biệt, viêm tủy cắt ngang (transverse myelitis) thường đi",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "benh_dai_c8",
        "type": "major",
        "label": "- Các thể không điển hình: Trên lâm sàng, đôi khi bác sĩ có thể gặp các bệnh cảnh không xếp vừa vặn vào thể hung dữ hay thể liệt. Bệnh nhân có thể xuất hiện các cử động múa giậ",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh dại (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh dại - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh dại",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Bệnh dại",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh dại: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh dại",
        "searchKeyword": "bệnh dại"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh dại",
        "searchKeyword": "bệnh dại"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh dại",
        "searchKeyword": "bệnh dại"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh dại",
        "searchKeyword": "bệnh dại"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh dại",
        "searchKeyword": "bệnh dại"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh dại",
        "searchKeyword": "bệnh dại"
      }
    ]
  },
  "benh_leptospira_leptospirosis": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh Leptospira (Leptospirosis)",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Bệnh Leptospira (Leptospirosis) là bệnh truyền nhiễm từ động vật sang người do xoắn khuẩn thuộc chi Leptospira gây ra, lây truyền qua tiếp xúc da/niêm mạc với nước hoặc đất bị nhiễm nước tiểu của động vật mang mầm bệnh. Bệnh cảnh lâm sàng biểu hiện đa dạng từ thể nhẹ không vàng da (chiếm khoảng 90% trường hợp) đến thể nặng có vàng da, suy thận cấp, rối loạn đông máu (Hội chứng Weil) và hội chứng xuất huyết phổi nặng (LPHS) với tỷ lệ tử vong vượt quá 50%. Tiêu chuẩn vàng để chẩn đoán xác định là Phản ứng ngưng kết vi thể (Microscopic Agglutination Test - MAT) với hiệu số kháng thể tăng ≥ 4 lần giữa hai mẫu huyết thanh kép hoặc phân lập/cấy được vi khuẩn từ mẫu bệnh phẩm. Việc nhận biết sớm các dấu hiệu gợi ý lâm sàng và khởi trị kháng sinh kịp thời đóng vai trò then chốt nhằm ngăn ngừa biến chứng suy đa cơ quan và giảm thiểu tử vong.",
    "goldStandard": "để chẩn đoán xác định là Phản ứng ngưng kết vi thể (Microscopic Agglutination Test - MAT) với hiệu số kháng thể tăng ≥ 4 lần giữa hai mẫu huyết thanh kép hoặc phân lập/cấy được vi khuẩn từ mẫu bệnh ph",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "benh_leptospira_leptospirosis_c1",
        "type": "lab",
        "label": "- Pha 1 - Pha nhiễm khuẩn (Septicemic phase): Kéo dài 4–7 ngày; vi khuẩn hiện diện trong máu và dịch não tủy. Khởi phát đột ngột với sốt cao, rét run, đau đầu dữ dội và đau cơ.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c2",
        "type": "lab",
        "label": "- Pha 2 - Pha miễn dịch (Immune phase): Kéo dài 4–30 ngày; xuất hiện kháng thể IgM/IgG, vi khuẩn bị xóa khỏi máu nhưng khu trú tại thận và mắt.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c3",
        "type": "major",
        "label": "- Sốt cấp tính và đau đầu: Sốt cao dao động kèm rét run, đau đầu sau hốc mắt dữ dội.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c4",
        "type": "imaging",
        "label": "- Đau cơ đặc trưng (Characteristic Myalgia): Đau và nhạy cảm đau dữ dội ở cơ bắp chân (calf muscle), cơ vùng thắt lưng và cơ bụng. Đau cơ bắp chân là dấu hiệu lâm sàng rất",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c5",
        "type": "major",
        "label": "- Rối loạn tiêu hóa: Buồn nôn, nôn, đau bụng, tiêu chảy và chán ăn.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c6",
        "type": "imaging",
        "label": "- Sung huyết kết mạc (Conjunctival Suffusion / Red Eyes): Mắt đỏ rực hai bên kết mạc nhưng không có tiết dịch mủ. Đây là dấu hiệu thực thể quan trọng, bệnh nhân có cơ địa n",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c7",
        "type": "major",
        "label": "- Ấn đau cơ bắp chân: Cơ bắp chân tăng trương lực và rất đau khi sờ nắn.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_leptospira_leptospirosis_c8",
        "type": "imaging",
        "label": "- Vàng da (Jaundice/Icterus): Xuất hiện ở 5–10% thể nặng (Icteric leptospirosis), kèm gan to và đau.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh Leptospira (Leptospirosis) (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh Leptospira (Leptospirosis) - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh Leptospira (Leptospirosis)",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Bệnh Leptospira (Leptospirosis)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh Leptospira (Leptospirosis): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh Leptospira (Leptospirosis)",
        "searchKeyword": "bệnh leptospira (leptospirosis)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh Leptospira (Leptospirosis)",
        "searchKeyword": "bệnh leptospira (leptospirosis)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh Leptospira (Leptospirosis)",
        "searchKeyword": "bệnh leptospira (leptospirosis)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh Leptospira (Leptospirosis)",
        "searchKeyword": "bệnh leptospira (leptospirosis)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh Leptospira (Leptospirosis)",
        "searchKeyword": "bệnh leptospira (leptospirosis)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh Leptospira (Leptospirosis)",
        "searchKeyword": "bệnh leptospira (leptospirosis)"
      }
    ]
  },
  "benh_than": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh than",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Bệnh than (Anthrax) do trực khuẩn Bacillus anthracis gây ra có biểu hiện lâm sàng phụ thuộc trực tiếp vào con đường xâm nhập của bào tử vi khuẩn vào cơ thể người: qua da, qua đường hô hấp, qua Đường tiêu hóa, hoặc qua đường tiêm chích. Bất kể từ ngõ vào nào, nếu vi khuẩn xâm nhập vào máu gây nhiễm k...",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Truyền nhiễm & Vi sinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "benh_than_c1",
        "type": "major",
        "label": "- Diễn tiến lâm sàng: Sau thời gian ủ bệnh từ ==2 đến 5 ngày==, tổn thương da bắt đầu dưới dạng một sẩn ngứa, sau đó nhanh chóng hình thành các mụn nước chứa dịch trong hoặc dị",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c2",
        "type": "lab",
        "label": "- Liên hệ cơ chế bệnh sinh và thực hành lâm sàng: Đặc điểm lâm sàng then chốt giúp bác sĩ nhận diện bệnh than thể da là tổn thương này hoàn toàn không đau (trừ khi có bội n",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c3",
        "type": "imaging",
        "label": "- Thể tiêm chích (Injection Anthrax): Mới được mô tả gần đây ở những người tiêm chích ma túy (đặc biệt là heroin nhiễm bào tử). Thể bệnh này có diễn tiến lâm sàng hung hãn hơn",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c4",
        "type": "imaging",
        "label": "- Liên hệ cơ chế bệnh sinh: Cần nhấn mạnh rằng bệnh than thể hô hấp thực chất là một bệnh lý tại hạch trung thất (mediastinal process) chứ không phải là tổn thương viêm tại",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c5",
        "type": "major",
        "label": "- Giai đoạn tiền triệu (Prodromal stage): Khởi phát giống cúm với sốt nhẹ, mệt mỏi, đau cơ, ho khan và đôi khi có đau nhẹ vùng trước Tim, thường không có các triệu",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c6",
        "type": "lab",
        "label": "- Giai đoạn tiến triển trung gian (Intermediate progressive stage): Sốt cao, Suy hô hấp, Khó thở, vã mồ hôi nhiều, Đau ngực kiểu màng phổi và lú lẫn. Cấy má",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c7",
        "type": "lab",
        "label": "- Giai đoạn tối cấp (Late fulminant stage): Bệnh nhân rơi vào Suy hô hấp đòi hỏi thở máy, Sốc nhiễm độc do tải lượng vi khuẩn và độc tố khổng lồ trong máu, thường tử vo",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "benh_than_c8",
        "type": "major",
        "label": "- Thể tiền đình họng: Bệnh nhân biểu hiện sưng đau dữ dội vùng hầu họng, khó nuốt, sốt và sưng hạch bạch huyết cổ. Khám lâm sàng có thể thấy loét ở miệng hoặc hầu họng (thường",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh than (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh than - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh than",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Bệnh than",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh than: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh than",
        "searchKeyword": "bệnh than"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh than",
        "searchKeyword": "bệnh than"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh than",
        "searchKeyword": "bệnh than"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh than",
        "searchKeyword": "bệnh than"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh than",
        "searchKeyword": "bệnh than"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh than",
        "searchKeyword": "bệnh than"
      }
    ]
  },
  "benh_ta": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Bệnh tả",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Bệnh tả có phổ biểu hiện lâm sàng rất rộng. Tùy thuộc vào tình trạng miễn dịch có sẵn của ký chủ, bệnh có thể biểu hiện từ tình trạng quần cư mang trùng không triệu chứng (asymptomatic intestinal colonization) ở ruột, cho đến các đợt Tiêu chảy ở mức độ nhẹ, trung bình hoặc tiến triển thành thể bệnh ...",
    "goldStandard": "trong nhiều thập kỷ, phương pháp cấy phân truyền thống hiện nay bộc lộ nhược điểm là có độ nhạy (giới hạn phát hiện) thấp hơn so với các xét nghiệm hiện đại.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "benh_ta_c2"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "benh_ta_c1",
        "type": "imaging",
        "label": "- Đặc điểm phân: Trong những giờ đầu, phân có thể vẫn còn lẫn các chất cặn bã của ruột. Tuy nhiên, khi tình trạng tiêu chảy tiến triển, phân trở nên toàn nước, trong vắt, có lẫ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c2",
        "type": "mandatory",
        "label": "- Liên hệ sinh lý bệnh: Lượng dịch khổng lồ được bài tiết ồ ạt vào lòng ruột (do tác động của độc tố tả kích hoạt bài tiết ion chloride và nước) làm căng giãn ruột, dẫn đến các",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c3",
        "type": "major",
        "label": "- Dấu hiệu mất nước nội bào và gian bào: Bệnh nhân rơi vào trạng thái lờ đờ hoặc không đáp ứng, mắt trũng sâu, và giảm độ đàn hồi của da một cách rõ rệt. Dấu hiệu nếp véo da mấ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c4",
        "type": "lab",
        "label": "- Dấu hiệu giảm tưới máu mô: Da bệnh nhân trở nên lạnh và ẩm ướt. Ở những bệnh nhân mất nước nghiêm trọng, da có thể xuất hiện các mảng lốm đốm (mottled) hoặc sạm đen, phản ánh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c5",
        "type": "major",
        "label": "- Rối loạn điện giải: Sự mất mát khổng lồ kali và canxi qua Đường tiêu hóa dẫn đến các biến chứng như liệt ruột (ileus), đau cơ, co rút cơ (chuột rút) và các [[Co giật|",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c6",
        "type": "lab",
        "label": "- Thận và Thần kinh: Hoại tử ống Thận cấp (acute renal tubular necrosis) gây suy thận cấp, và nhồi máu não (đột quỵ), thường xảy ra phổ biến hơn ở nhóm bệnh nhân cao tu",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c7",
        "type": "major",
        "label": "- Hô hấp: Bệnh nhân có thể mắc viêm Phổi hít (aspiration pneumonia) do hậu quả của tình trạng nôn mửa liên tục.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "benh_ta_c8",
        "type": "lab",
        "label": "- Tính chất đại thể: Dịch Tiêu chảy đặc trưng có tính chất toàn nước (watery), đôi khi xuất hiện dưới dạng nhầy (mucoid) và thỉnh thoảng có thể lẫn máu (tuy nhiên tỷ lệ lẫn",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Bệnh tả (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Bệnh tả - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Bệnh tả",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Bệnh tả",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Bệnh tả: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Bệnh tả",
        "searchKeyword": "bệnh tả"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Bệnh tả",
        "searchKeyword": "bệnh tả"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Bệnh tả",
        "searchKeyword": "bệnh tả"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Bệnh tả",
        "searchKeyword": "bệnh tả"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Bệnh tả",
        "searchKeyword": "bệnh tả"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Bệnh tả",
        "searchKeyword": "bệnh tả"
      }
    ]
  },
  "covid_19": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "COVID-19",
    "specialty": "Hô hấp",
    "severity": "urgent",
    "summary": "50%. Bệnh nhân có dấu hiệu suy hô hấp nặng: thở nhanh > 25-30 lần/phút, co kéo cơ hô hấp phụ, SpO2 < 94% khi thở khí phòng. Thường kèm bứt rứt, mệt lả.",
    "goldStandard": "để chẩn đoán xác định bệnh.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "covid_19_c1",
        "type": "major",
        "label": "- Thời gian ủ bệnh: Dao động từ 2-14 ngày, trung bình từ 4-7 ngày tùy thuộc vào biến chủng (chủng Delta và Omicron thường có thời gian ủ bệnh ngắn hơn).",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c2",
        "type": "major",
        "label": "- Triệu chứng khởi phát: Phần lớn bệnh nhân có triệu chứng nhẹ hoặc không triệu chứng. Các biểu hiện khởi phát mang tính chất của hội chứng nhiễm siêu vi cấp tính:",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c3",
        "type": "major",
        "label": "- Toàn thân và hô hấp trên: Sốt, ho khan, mệt mỏi, đau đầu, đau họng, sổ mũi, ngạt mũi.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c4",
        "type": "major",
        "label": "- Rối loạn giác quan: Mất hoặc giảm vị giác, khứu giác là triệu chứng khá đặc hiệu (đặc biệt ở các chủng cũ và Delta, ít gặp hơn ở chủng Omicron).",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c5",
        "type": "major",
        "label": "- Tiêu hóa: [[Nôn ói|Buồn nôn]], nôn, Tiêu chảy có thể xuất hiện sớm.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c6",
        "type": "major",
        "label": "- Ở trẻ em: Biểu hiện thường nhẹ hơn người lớn. Tuy nhiên, trẻ nhũ nhi có thể biểu hiện bằng bỏ bú, nôn ói, lồng ruột, rối loạn nhịp thở hoặc cơn ngừng thở.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c7",
        "type": "major",
        "label": "- Triệu chứng: Ho tăng lên, Đau ngực, cảm giác ngạt thở.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "covid_19_c8",
        "type": "lab",
        "label": "- Hiện tượng \"Giảm oxy máu thầm lặng\" (Silent Hypoxia): Khoảng 5-10% bệnh nhân có tình trạng SpO2 giảm sâu nhưng biểu hiện thở gắng sức trên lâm sàng lại rất nghèo nàn, bệnh nh",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị COVID-19 (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị COVID-19 - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho COVID-19",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của COVID-19",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân COVID-19: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán COVID-19",
        "searchKeyword": "covid-19"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán COVID-19",
        "searchKeyword": "covid-19"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng COVID-19",
        "searchKeyword": "covid-19"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị COVID-19",
        "searchKeyword": "covid-19"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc COVID-19",
        "searchKeyword": "covid-19"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng COVID-19",
        "searchKeyword": "covid-19"
      }
    ]
  },
  "cum": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Cúm",
    "specialty": "Hô hấp",
    "severity": "urgent",
    "summary": "1.26 (ở trẻ 1-3 tuổi) hoặc > 1.57 (ở trẻ 4-6 tuổi) cảnh báo nguy cơ viêm phổi nặng cần nhập viện ICU.",
    "goldStandard": "để chẩn đoán xác định bệnh và định tuýp/phân tuýp virus (A/H1N1, A/H3N2, Cúm B). - Ứng dụng lâm sàng: Hướng dẫn 2025 nhấn mạnh Multiplex-PCR có khả năng phát hiện đồng thời cúm và các tác nhân hô hấp ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "cum_c1",
        "type": "major",
        "label": "- Sốt và Rét run: Sốt thường cao (có thể lên tới 39-40 độ C), đi kèm với những cơn ớn lạnh, rét run. Sốt thường kéo dài từ 3 đến 5 ngày trong những trường hợp không biến chứng.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c2",
        "type": "major",
        "label": "- Đau nhức cơ bắp (Myalgia): Đây là một trong những triệu chứng nổi bật nhất giúp phân biệt cúm với cảm lạnh thông thường. Bệnh nhân thường đau nhức cơ dữ dội, đặc biệt là ở vù",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c3",
        "type": "minor",
        "label": "- Triệu chứng thần kinh trung ương: Đau đầu là biểu hiện rất nổi bật, bệnh nhân thường có cảm giác đau nhức sau hốc mắt và sợ ánh sáng (photophobia). Kèm theo đó là tình trạng",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c4",
        "type": "minor",
        "label": "- Hô hấp trên và dưới: Giai đoạn đầu, triệu chứng hô hấp có thể nhẹ với biểu hiện khô họng, đau họng, nghẹt mũi hoặc chảy nước mũi, kèm theo cảm giác nóng rát dưới xương ức. Và",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c5",
        "type": "major",
        "label": "- Triệu chứng tiêu hóa: Buồn nôn, nôn mửa, hoặc Đau bụng, Tiêu chảy có thể xảy ra. Trên lâm sàng, các triệu chứng này phổ biến hơn ở trẻ em hoặc ở",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c6",
        "type": "lab",
        "label": "- Viêm Phổi nguyên phát do virus Cúm: Thường xảy ra ở phụ nữ có thai, bệnh nhân suy tim. Bệnh nhân có biểu hiện đau tức ngực, Khó thở tăng dần, ho ra đờm có lẫn máu, kh",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c7",
        "type": "minor",
        "label": "- Viêm phổi thứ phát do vi khuẩn (Bội nhiễm): Đặc trưng lâm sàng là bệnh lý hai pha (biphasic illness). Bệnh nhân cúm dường như đang hồi phục (hết sốt, giảm ho), nhưng sau 4-14",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "cum_c8",
        "type": "lab",
        "label": "- Viêm cơ tim và Suy đa tạng: Virus có thể xâm nhập trực tiếp vào tế bào cơ tim. Khởi đầu bằng các triệu chứng như nhịp tim nhanh bất thường, đánh trống ngực; s",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Cúm (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Cúm - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Cúm",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Cúm",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Cúm: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Cúm",
        "searchKeyword": "cúm"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Cúm",
        "searchKeyword": "cúm"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Cúm",
        "searchKeyword": "cúm"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Cúm",
        "searchKeyword": "cúm"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Cúm",
        "searchKeyword": "cúm"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Cúm",
        "searchKeyword": "cúm"
      }
    ]
  },
  "giang_mai": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Giang mai",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "70%, các xét nghiệm này cho đến nay vẫn chưa được ứng dụng rộng rãi để đánh giá và ước tính tỷ lệ lây truyền giang mai từ mẹ sang con. Hậu quả là, các ước tính về tỷ lệ MTCT hiện tại (từ 2,2% đến 40,9%) chỉ dựa trên các ca có biểu hiện lâm sàng, dẫn đến dữ liệu không chính xác, thiếu đồng nhất và bỏ lọt lượng lớn trẻ mắc bệnh không triệu chứng.",
    "goldStandard": "trong tầm soát và chẩn đoán giang mai. Tổ chức Y tế Thế giới (WHO) khuyến cáo sử dụng một thuật toán chẩn đoán kết hợp giữa hai nhóm xét nghiệm: xét nghiệm không đặc hiệu và xét nghiệm đặc hiệu (theo ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "giang_mai_c7",
        "giang_mai_c8"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "giang_mai_c1",
        "type": "minor",
        "label": "- Giai đoạn không triệu chứng (Giang mai tiềm ẩn): Phần lớn các ca nhiễm giang mai, bao gồm cả phụ nữ mang thai, hoàn toàn không có triệu chứng lâm sàng rõ rệt (asymptomatic),.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c2",
        "type": "major",
        "label": "- Giai đoạn có triệu chứng và Hội chứng loét sinh dục: Khi có triệu chứng, biểu hiện ban đầu thường nằm trong hội chứng loét sinh dục (genital ulcer disease). Vết loét giang ma",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c3",
        "type": "major",
        "label": "- Tiến triển và biến chứng muộn: Dựa trên thời gian, lâm sàng chia bệnh thành giang mai sớm (gồm giang mai sơ phát, thứ phát và tiềm ẩn sớm dưới 2 năm) và giang mai muộn (tiềm",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c4",
        "type": "imaging",
        "label": "- Dấu hiệu lâm sàng ở trẻ: Các triệu chứng điển hình để chẩn đoán lâm sàng bao gồm: tổn thương da niêm mạc (mucocutaneous lesions), viêm mũi xuất tiết hay \"sụt sịt\" (syphilitic",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c5",
        "type": "major",
        "label": "- Tổn thương cơ quan sâu và di chứng: Vi khuẩn có thể tấn công vào hệ thần kinh, Thận, Phổi và mắt. Trẻ nếu không được phát hiện hoặc phát hiện muộn ở giai đoạn nhũ nhi",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c6",
        "type": "major",
        "label": "- Kết cục thai kỳ bất lợi: Bên cạnh giang mai bẩm sinh, nhiễm T. pallidum lâm sàng còn dẫn đến sẩy thai tự nhiên, thai chết lưu, tử vong sớm, sinh non và trẻ nhẹ cân,,.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c7",
        "type": "mandatory",
        "label": "- Cơ chế phá vỡ hàng rào niêm mạc và nguy cơ HIV: Cơ chế sinh bệnh của giang mai tạo ra các tổn thương viêm loét sinh dục. Các vết loét này phá vỡ hàng rào bảo vệ niêm mạc tự n",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "giang_mai_c8",
        "type": "mandatory",
        "label": "- Ứng dụng quản lý thai kỳ: Do cơ chế vượt qua hàng rào nhau thai gây hậu quả khốc liệt nhưng người mẹ lại thường không có triệu chứng, WHO khuyến cáo bắt buộc tầm soát huyết t",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Giang mai (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Giang mai - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Giang mai",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Giang mai",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Giang mai: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Giang mai",
        "searchKeyword": "giang mai"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Giang mai",
        "searchKeyword": "giang mai"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Giang mai",
        "searchKeyword": "giang mai"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Giang mai",
        "searchKeyword": "giang mai"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Giang mai",
        "searchKeyword": "giang mai"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Giang mai",
        "searchKeyword": "giang mai"
      }
    ]
  },
  "hiv_aids": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "HIV_AIDS",
    "specialty": "Huyết học - Truyền máu",
    "severity": "urgent",
    "summary": "1 cm ở \\ge 2 vị trí không liền kề, loại trừ hạch bẹn, kéo dài trên 3-6 tháng),. Lượng tế bào T CD4+ ở giai đoạn này thường \\ge 500 tế bào/μL.",
    "goldStandard": "để chẩn đoán nhiễm HIV cấp tính.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "hiv_aids_c3"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Huyết học - Truyền máu)"
    },
    "criteria": [
      {
        "id": "hiv_aids_c1",
        "type": "minor",
        "label": "- Hội chứng retrovirus cấp tính (Seroconversion illness): Triệu chứng thường nhẹ, không đặc hiệu và tự giới hạn trong khoảng 18 ngày,. Các dấu hiệu lâm sàng theo thứ tự giảm dầ",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c2",
        "type": "major",
        "label": "- Dấu hiệu niêm mạc và thần kinh: Loét da niêm mạc là một đặc điểm đặc trưng, với các vết loét nông, đáy trắng, có quầng đỏ xung quanh, xuất hiện ở miệng, hậu môn, dương vật ho",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c3",
        "type": "mandatory",
        "label": "- Ứng dụng lâm sàng: Ở giai đoạn này, tải lượng virus rất cao và bệnh nhân có khả năng lây nhiễm cực kỳ mạnh. Nếu bệnh nhân có triệu chứng nghi ngờ kèm yếu tố nguy cơ, nhưng xé",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c4",
        "type": "major",
        "label": "- Giai đoạn 1 (Lâm sàng không triệu chứng hoặc hạch to toàn thân): Bệnh nhân thường không có triệu chứng rõ ràng. Dấu hiệu lâm sàng duy nhất có thể là bệnh lý hạch bạch huyết t",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c5",
        "type": "major",
        "label": "- Giai đoạn 2 (Triệu chứng nhẹ): Bệnh nhân bắt đầu sụt cân không rõ nguyên nhân (mức độ trung bình, <10% trọng lượng cơ thể), nhiễm trùng đường hô hấp tái phát, bùng phát Herpe",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c6",
        "type": "lab",
        "label": "- Giai đoạn 3 (Triệu chứng tiến triển): Sụt cân nặng (>10% trọng lượng cơ thể), Tiêu chảy mãn tính hoặc sốt kéo dài trên 1 tháng. Bệnh nhân bị nấm miệng, bạch sản l",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c7",
        "type": "major",
        "label": "- Giai đoạn 4 (AIDS lâm sàng): Hệ miễn dịch sụp đổ hoàn toàn. Bệnh nhân mắc hội chứng suy mòn do HIV (HIV wasting syndrome). Sự bùng phát ồ ạt của các nhiễm trùng cơ hội (OI) v",
        "sourceGuideline": "Huyết học - Truyền máu"
      },
      {
        "id": "hiv_aids_c8",
        "type": "lab",
        "label": "- Hệ Hô hấp: Viêm phổi do Pneumocystis jirovecii (PCP) gây ho khan, Khó thở và viêm phổi. Lao (TB) là nguyên nhân hàng đầu gây nhập viện và tử vong, phát triển mạnh trong",
        "sourceGuideline": "Huyết học - Truyền máu"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị HIV_AIDS (Huyết học - Truyền máu)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị HIV_AIDS - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho HIV_AIDS",
          "class": "Thuốc đặc hiệu chuyên khoa Huyết học - Truyền máu",
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
        "name": "Biến chứng cấp tính của HIV_AIDS",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân HIV_AIDS: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán HIV_AIDS",
        "searchKeyword": "hiv_aids"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán HIV_AIDS",
        "searchKeyword": "hiv_aids"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng HIV_AIDS",
        "searchKeyword": "hiv_aids"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị HIV_AIDS",
        "searchKeyword": "hiv_aids"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc HIV_AIDS",
        "searchKeyword": "hiv_aids"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng HIV_AIDS",
        "searchKeyword": "hiv_aids"
      }
    ]
  },
  "leptospirosis": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Leptospirosis",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "90%. Phương pháp này sử dụng các kháng nguyên xoắn khuẩn sống để phản ứng với huyết thanh bệnh nhân, sau đó soi dưới kính hiển vi nền đen.",
    "goldStandard": "(gold standard) trong chẩn đoán huyết thanh học Leptospirosis, đạt độ nhạy 82%–96% và độ đặc hiệu >90%. Phương pháp này sử dụng các kháng nguyên xoắn khuẩn sống để phản ứng với huyết thanh bệnh nhân, ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "leptospirosis_c1",
        "type": "major",
        "label": "- Triệu chứng cơ năng: Bệnh khởi phát đột ngột với sốt cao liên tục (38°C - 40°C), đau đầu, ớn lạnh, rét run và đau nhức cơ bắp.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c2",
        "type": "imaging",
        "label": "- Triệu chứng thực thể: Hai dấu hiệu đặc trưng và có giá trị gợi ý chẩn đoán nhất trên lâm sàng là đỏ mắt (conjunctival suffusion - sung huyết kết mạc nhưng không có tiết dịc",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c3",
        "type": "major",
        "label": "- Các biểu hiện khác: Bệnh nhân có thể bị Đau bụng, chán ăn, [[Nôn ói|buồn nôn]], nôn, Tiêu chảy, ho và viêm họng. Các dấu hiệu ít gặp hơn bao gồm phát ban dát sẩn",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c4",
        "type": "lab",
        "label": "- Cận lâm sàng ban đầu: Phân tích nước tiểu có thể cho thấy tình trạng tiểu protein nhẹ, tiểu Bạch cầu, có hoặc không có tiểu máu và các trụ trong hoặc trụ hạt. Tỉ lệ tử vo",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c5",
        "type": "lab",
        "label": "- Viêm màng não vô khuẩn (Aseptic meningitis): Đây là biểu hiện đặc trưng nhất của giai đoạn miễn dịch, gặp ở tối đa 80% trường hợp. Bệnh nhân thường có biểu hiện đau đầu d",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c6",
        "type": "major",
        "label": "- Dịch não tủy: Điển hình có hiện tượng pleocytosis (tăng Bạch cầu) ưu thế lympho với số lượng thường dưới 500 tế bào/mm3, protein tăng nhẹ (50 - 100 mg/mL) và nồng độ gluc",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c7",
        "type": "major",
        "label": "- Biến chứng thần kinh nặng: Rất hiếm khi xảy ra các biến chứng nghiêm trọng như Viêm não màng não, liệt nửa người, viêm tủy cắt ngang hay hội chứng Guillain-Barré.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "leptospirosis_c8",
        "type": "major",
        "label": "- Biểu hiện cơ quan khác: Có thể xuất hiện Vàng da, suy Thận, rối loạn nhịp Tim, viêm màng bồ đào (gây đau mắt, sợ ánh sáng). Đặc biệt, triệu chứng Đau bụng tro",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Leptospirosis (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Leptospirosis - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Leptospirosis",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Leptospirosis",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Leptospirosis: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Leptospirosis",
        "searchKeyword": "leptospirosis"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Leptospirosis",
        "searchKeyword": "leptospirosis"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Leptospirosis",
        "searchKeyword": "leptospirosis"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Leptospirosis",
        "searchKeyword": "leptospirosis"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Leptospirosis",
        "searchKeyword": "leptospirosis"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Leptospirosis",
        "searchKeyword": "leptospirosis"
      }
    ]
  },
  "lau": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Lậu",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "98%) và độ đặc hiệu tối thiểu 98% (lý tưởng 100%).",
    "goldStandard": "để chẩn đoán nhiễm trùng, nuôi cấy vi khuẩn lại là tiêu chuẩn vàng mang tính sống còn đối với dịch tễ học và giám sát kháng thuốc. Lậu cầu rất khó nuôi cấy do yêu cầu môi trường giàu dinh dưỡng và điề",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "lau_c8"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "lau_c1",
        "type": "imaging",
        "label": "- Hậu môn - trực tràng (Anorectal): Thường liên quan đến hành vi quan hệ tình dục qua đường hậu môn (đặc biệt ở nhóm MSM) hoặc do cơ chế tự cấy ghép (autoinoculation) dịch tiết",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c2",
        "type": "major",
        "label": "- Hầu họng (Oropharyngeal): Đa số các ca nhiễm lậu hầu họng là không có triệu chứng và có thể tự thanh thải. Tuy nhiên, đây là ổ chứa vi khuẩn quan trọng đóng vai trò \"lò luyện",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c3",
        "type": "imaging",
        "label": "- Mắt (Ocular): Lậu cầu có thể lây nhiễm vào niêm mạc mắt, gây viêm kết mạc (conjunctivitis). Đặc biệt nghiêm trọng là tình trạng viêm kết mạc sơ sinh (ophthalmia neonatorum) ở",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c4",
        "type": "lab",
        "label": "- Biến chứng hệ thống nguy kịch: Mặc dù hiếm gặp, lậu cầu có khả năng xâm nhập vào dòng máu gây ra tình trạng nhiễm trùng lan tỏa (disseminated gonococcal infection). Các biểu",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c5",
        "type": "imaging",
        "label": "- Hiệp đồng với HIV và các STI khác: Lậu cầu gây viêm và tổn thương hàng rào niêm mạc sinh dục và trực tràng. Việc phá vỡ rào cản vật lý này làm tăng đáng kể tính nhạy cảm cũng",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c6",
        "type": "lab",
        "label": "- Sự đánh đổi giữa Quản lý hội chứng (Syndromic Management) và Quản lý kháng thuốc: Ở các khu vực hạn chế nguồn lực, quản lý lậu dựa trên hội chứng (như tiết dịch niệu đạo/âm đ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c7",
        "type": "lab",
        "label": "- Mâu thuẫn trong diễn giải kết quả xét nghiệm sinh học phân tử (NAAT) ngoài sinh dục: Các xét nghiệm khuếch đại axit nucleic (NAAT) có độ nhạy vượt trội và là tiêu chuẩn vàng.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "lau_c8",
        "type": "mandatory",
        "label": "- Tiếp cận hội chứng tiết dịch (Discharge Syndromes): Tại các cơ sở thiếu nguồn lực NAAT, chẩn đoán dựa trên hội chứng viêm niệu đạo (nam) hoặc tiết dịch âm đạo (nữ) vẫn được á",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Lậu (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Lậu - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Lậu",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Lậu",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Lậu: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Lậu",
        "searchKeyword": "lậu"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Lậu",
        "searchKeyword": "lậu"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Lậu",
        "searchKeyword": "lậu"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Lậu",
        "searchKeyword": "lậu"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Lậu",
        "searchKeyword": "lậu"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Lậu",
        "searchKeyword": "lậu"
      }
    ]
  },
  "ly_truc_trung": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Lỵ trực trùng",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Lỵ trực trùng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "ly_truc_trung_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Lỵ trực trùng",
        "description": "lỵ trực trùng, tiêu hóa - gan mật, truyền nhiễm & vi sinh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "ly_truc_trung_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Lỵ trực trùng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "ly_truc_trung_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Lỵ trực trùng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Lỵ trực trùng (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Lỵ trực trùng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Lỵ trực trùng",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Lỵ trực trùng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Lỵ trực trùng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Lỵ trực trùng",
        "searchKeyword": "lỵ trực trùng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Lỵ trực trùng",
        "searchKeyword": "lỵ trực trùng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Lỵ trực trùng",
        "searchKeyword": "lỵ trực trùng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Lỵ trực trùng",
        "searchKeyword": "lỵ trực trùng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Lỵ trực trùng",
        "searchKeyword": "lỵ trực trùng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Lỵ trực trùng",
        "searchKeyword": "lỵ trực trùng"
      }
    ]
  },
  "nhiem_amip": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Nhiễm amip",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Nhiễm amip.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "nhiem_amip_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Nhiễm amip",
        "description": "nhiễm amip, tiêu hóa - gan mật, truyền nhiễm & vi sinh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_amip_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Nhiễm amip",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_amip_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Nhiễm amip",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Nhiễm amip (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Nhiễm amip - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Nhiễm amip",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Nhiễm amip",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Nhiễm amip: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Nhiễm amip",
        "searchKeyword": "nhiễm amip"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Nhiễm amip",
        "searchKeyword": "nhiễm amip"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Nhiễm amip",
        "searchKeyword": "nhiễm amip"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Nhiễm amip",
        "searchKeyword": "nhiễm amip"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Nhiễm amip",
        "searchKeyword": "nhiễm amip"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Nhiễm amip",
        "searchKeyword": "nhiễm amip"
      }
    ]
  },
  "nhiem_clostridioides_difficile": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Nhiễm Clostridioides difficile",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "1,5 lần so với mức cơ bản hoặc ≥1,5 mg/dL), đóng vai trò là những dấu ấn sinh học cực kỳ quan trọng để bác sĩ lâm sàng phân loại bệnh nhân vào ==nhóm CDI mức độ nặng==.",
    "goldStandard": "truyền thống. Kỹ thuật này phát hiện sự hiện diện của độc tố (đặc biệt là Toxin B) gây ra hiệu ứng làm tròn tế bào nuôi cấy. Độ nhạy từ 77% đến 86%, độ đặc hiệu rất cao 97%–99%. - Nuôi cấy Sinh độc tố",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "nhiem_clostridioides_difficile_c5",
        "nhiem_clostridioides_difficile_c7"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "nhiem_clostridioides_difficile_c1",
        "type": "major",
        "label": "- Triệu chứng tiêu hóa và toàn thân đi kèm: Bên cạnh tiêu chảy, bệnh nhân thường biểu hiện Sốt, Đau bụng và mót rặn (tenesmus).",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c2",
        "type": "imaging",
        "label": "- Liên hệ sinh lý bệnh: Tình trạng tiêu chảy xuất tiết là hệ quả trực tiếp của độc tố TcdA và TcdB do C. difficile tiết ra. Hai độc tố này xâm nhập vào tế bào biểu mô niêm mạ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c3",
        "type": "lab",
        "label": "- Đặc điểm hình ảnh học: Bệnh nhân thể tối cấp thường biểu hiện hội chứng bụng ngoại khoa (acute abdomen). Phình đại tràng nhiễm độc được gợi ý khi X-quang cho thấy đại trà",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c4",
        "type": "major",
        "label": "- Biến chứng sâu: Tình trạng viêm hoại tử sâu có thể dẫn đến thủng ruột và viêm phúc mạc cấp tính.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c5",
        "type": "mandatory",
        "label": "- Dấu hiệu cảnh báo nguy cơ tử vong: Bác sĩ lâm sàng bắt buộc phải theo dõi sát số lượng bạch cầu và nồng độ lactate máu hàng ngày như một chỉ số định hướng can thiệp phẫu thuậ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c6",
        "type": "major",
        "label": "- Động học tổn thương: Ở giai đoạn đầu, các tổn thương xuất hiện dưới dạng các mảng (plaques) màu trắng vàng, kích thước 1-2 mm, rải rác trên nền niêm mạc bình thường. Khi bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c7",
        "type": "mandatory",
        "label": "- Phân bố tổn thương: Thông thường toàn bộ đại tràng đều bị ảnh hưởng, nhưng có khoảng 10% bệnh nhân chỉ bị tổn thương ở các đoạn trên mà không có tổn thương tại trực tràng (re",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "nhiem_clostridioides_difficile_c8",
        "type": "imaging",
        "label": "- Tăng Bạch cầu (Leukocytosis): Đây là một đặc điểm rất thường gặp. Bệnh nhân có thể xuất hiện phản ứng giả bạch cầu (leukemoid reaction) với số lượng bạch cầu",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Nhiễm Clostridioides difficile (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Nhiễm Clostridioides difficile - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Nhiễm Clostridioides difficile",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Nhiễm Clostridioides difficile",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Nhiễm Clostridioides difficile: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Nhiễm Clostridioides difficile",
        "searchKeyword": "nhiễm clostridioides difficile"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Nhiễm Clostridioides difficile",
        "searchKeyword": "nhiễm clostridioides difficile"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Nhiễm Clostridioides difficile",
        "searchKeyword": "nhiễm clostridioides difficile"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Nhiễm Clostridioides difficile",
        "searchKeyword": "nhiễm clostridioides difficile"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Nhiễm Clostridioides difficile",
        "searchKeyword": "nhiễm clostridioides difficile"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Nhiễm Clostridioides difficile",
        "searchKeyword": "nhiễm clostridioides difficile"
      }
    ]
  },
  "nhiem_nam_candida": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Nhiễm nấm Candida",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Bệnh lý nhiễm nấm do Candida có phổ biểu hiện vô cùng đa dạng, trải dài từ các tổn thương khu trú trên da và niêm mạc đến các bệnh cảnh nhiễm khuẩn huyết và suy đa tạng nguy hiểm đến tính mạng. Về mặt sinh lý bệnh lâm sàng, có một nguyên lý cốt lõi cần ghi nhớ: Cơ chế bảo vệ miễn dịch của cơ thể chố...",
    "goldStandard": "để chứng minh sự xâm lấn màng nhầy. Tuy nhiên, nếu hình ảnh nội soi thấy mảng trắng điển hình kết hợp với soi tươi phết cạo có sợi nấm, bác sĩ có thể khởi động điều trị ngay mà không bắt buộc chờ kết ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "nhiem_nam_candida_c1",
        "type": "lab",
        "label": "- Soi trực tiếp (Microscopy): Dưới kính hiển vi, Candida là nấm men nảy chồi, kích thước 4–6 \\mum, vách mỏng và bắt màu Gram dương. Trong các mẫu bệnh phẩm mô hoặc dịch, có",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c2",
        "type": "lab",
        "label": "- Nuôi cấy (Culture): Khác với nhiều loại nấm khác, Candida không đòi hỏi môi trường nuôi cấy nấm chuyên biệt. Chúng phát triển rất tốt trên các đĩa thạch thông thường và cha",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c3",
        "type": "lab",
        "label": "- Động học cấy máu tự động: Các hệ thống cấy máu tự động hiện nay thường phát hiện Candida spp. sau khoảng 40 giờ ủ. Tuy nhiên, cần lưu ý một đặc điểm sinh lý học quan trọng:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c4",
        "type": "major",
        "label": "- Thử nghiệm sinh ống mầm (Germ tube test): Đây là thử nghiệm định danh giả định nhanh C. albicans trên lâm sàng. Khi ủ nấm trong huyết thanh, C. albicans có khả năng tạo r",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c5",
        "type": "lab",
        "label": "- Xét nghiệm chuyển hóa và hình thái học: Các loài nấm có thể được phân biệt dựa trên khả năng đồng hóa và lên men carbohydrate, sử dụng nitrate hoặc sản xuất urease. Dải thử n",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c6",
        "type": "major",
        "label": "- Môi trường sinh màu (Chromogenic agar): Khi cấy trên môi trường CHROMagar Candida, các loài sẽ cho màu sắc khác nhau. Ví dụ, loài C. dubliniensis (trước đây hay bị gộp chun",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c7",
        "type": "lab",
        "label": "- Khối phổ (MALDI-TOF MS) và Lai tại chỗ huỳnh quang (PNA FISH): Cho phép định danh loài cực kỳ nhanh chóng và chính xác trực tiếp từ các chai cấy máu vừa báo dương tính.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "nhiem_nam_candida_c8",
        "type": "lab",
        "label": "- Panel Multiplex PCR: Hệ thống FilmArray Blood Culture Identification giúp phát hiện 6 loài Candida gây bệnh phổ biến nhất (C. albicans, C. glabrata, C. auris, C. parapsilo",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Nhiễm nấm Candida (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Nhiễm nấm Candida - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Nhiễm nấm Candida",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Nhiễm nấm Candida",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Nhiễm nấm Candida: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Nhiễm nấm Candida",
        "searchKeyword": "nhiễm nấm candida"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Nhiễm nấm Candida",
        "searchKeyword": "nhiễm nấm candida"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Nhiễm nấm Candida",
        "searchKeyword": "nhiễm nấm candida"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Nhiễm nấm Candida",
        "searchKeyword": "nhiễm nấm candida"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Nhiễm nấm Candida",
        "searchKeyword": "nhiễm nấm candida"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Nhiễm nấm Candida",
        "searchKeyword": "nhiễm nấm candida"
      }
    ]
  },
  "suy_gan_cap_do_nhiem_trung": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Suy gan cấp do nhiễm trùng",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân loại bệnh học y khoa chuẩn EBM cho Suy gan cấp do nhiễm trùng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "suy_gan_cap_do_nhiem_trung_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Suy gan cấp do nhiễm trùng",
        "description": "suy gan cấp do nhiễm trùng, tiêu hóa - gan mật, truyền nhiễm & vi sinh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "suy_gan_cap_do_nhiem_trung_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Suy gan cấp do nhiễm trùng",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "suy_gan_cap_do_nhiem_trung_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Suy gan cấp do nhiễm trùng",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Suy gan cấp do nhiễm trùng (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Suy gan cấp do nhiễm trùng - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Suy gan cấp do nhiễm trùng",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Suy gan cấp do nhiễm trùng",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Suy gan cấp do nhiễm trùng: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Suy gan cấp do nhiễm trùng",
        "searchKeyword": "suy gan cấp do nhiễm trùng"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Suy gan cấp do nhiễm trùng",
        "searchKeyword": "suy gan cấp do nhiễm trùng"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Suy gan cấp do nhiễm trùng",
        "searchKeyword": "suy gan cấp do nhiễm trùng"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Suy gan cấp do nhiễm trùng",
        "searchKeyword": "suy gan cấp do nhiễm trùng"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Suy gan cấp do nhiễm trùng",
        "searchKeyword": "suy gan cấp do nhiễm trùng"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Suy gan cấp do nhiễm trùng",
        "searchKeyword": "suy gan cấp do nhiễm trùng"
      }
    ]
  },
  "suy_gan_cap_tren_nen_man_aclf": {
    "icdCode": "K72.1",
    "icdPrefixes": [
      "K72",
      "K70"
    ],
    "diseaseName": "Suy gan cấp trên nền mạn (ACLF)",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Suy gan cấp trên nền mạn (Acute-on-Chronic Liver Failure - ACLF) là một hội chứng lâm sàng cấp tính phức tạp, đặc trưng bởi sự đợt bùng phát mất bù cấp tính (Acute Decompensation - AD) trên nền bệnh gan mạn tính hoặc xơ gan sẵn có, đi kèm với hội chứng suy đa tạng (Organ Failure - OF) và nguy cơ tử vong ngắn hạn (28 ngày và 90 ngày) cực kỳ cao. Tỷ lệ mắc ACLF ở bệnh nhân xơ gan mất bù nhập viện đạt khoảng 35% trên toàn cầu với tỷ lệ tử vong 90 ngày lên tới 58%. Dấu hiệu gợi ý then chốt là sự xuất hiện đột ngột của vàng da đậm, chướng bụng nhanh, sốt, lơ mơ hoặc rối loạn đông máu nặng sau một yếu tố thúc đẩy (như nhiễm trùng vi khuẩn, đợt bùng phát virus viêm gan B hoặc ngộ độc rượu). Việc chẩn đoán xác định dựa trên các hệ thống bảng điểm suy tạng chuẩn hóa (đặc biệt là thang điểm CLIF-C OF của EASL-CLIF) nhằm phân tầng độ nặng cấp cứu và định hướng hồi sức đa ngành kịp thời.",
    "goldStandard": "& BỘ TIÊU CHÍ CHẨN ĐOÁN XÁC ĐỊNH",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c1",
        "type": "major",
        "label": "- Triệu chứng kinh điển / Dấu hiệu cảnh báo sớm:",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c2",
        "type": "major",
        "label": "- Yếu tố tại gan (Hepatic triggers): Tiền sử uống rượu dồn dập (alcohol binge), ngưng thuốc kháng virus HBV tự ý dẫn đến đợt bùng phát viêm gan B cấp, ngộ độc thuốc gây tổn thư",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c3",
        "type": "lab",
        "label": "- Yếu tố ngoài gan (Extrahepatic triggers): Sốt, ho đờm đục, tiểu buốt dắt, đau bụng tiến triển (gợi ý nhiễm trùng vi khuẩn như SBP, viêm phổi, nhiễm trùng tiểu), xuất huyết ti",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c4",
        "type": "minor",
        "label": "- Các triệu chứng kèm theo và toàn thân:",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c5",
        "type": "major",
        "label": "- Nhìn, sờ, gõ, nghe hoặc các nghiệm pháp khám chuyên khoa đặc hiệu:",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c6",
        "type": "major",
        "label": "- Dấu hiệu cờ đỏ nguy hiểm (Red Flags) báo hiệu nguy cơ tử vong cấp:",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c7",
        "type": "lab",
        "label": "- Đánh giá chức năng gan & Đông máu:",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      },
      {
        "id": "suy_gan_cap_tren_nen_man_aclf_c8",
        "type": "major",
        "label": "- Đánh giá chức năng thận & Điện giải:",
        "sourceGuideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Suy gan cấp trên nền mạn (ACLF) (Truyền nhiễm & Vi sinh)",
      "guideline": "EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis (2018)",
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
          "drugName": "Thuốc điều trị bậc 1 cho Suy gan cấp trên nền mạn (ACLF)",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Suy gan cấp trên nền mạn (ACLF)",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Suy gan cấp trên nền mạn (ACLF): Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Suy gan cấp trên nền mạn (ACLF)",
        "searchKeyword": "suy gan cấp trên nền mạn (aclf)"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Suy gan cấp trên nền mạn (ACLF)",
        "searchKeyword": "suy gan cấp trên nền mạn (aclf)"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Suy gan cấp trên nền mạn (ACLF)",
        "searchKeyword": "suy gan cấp trên nền mạn (aclf)"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Suy gan cấp trên nền mạn (ACLF)",
        "searchKeyword": "suy gan cấp trên nền mạn (aclf)"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Suy gan cấp trên nền mạn (ACLF)",
        "searchKeyword": "suy gan cấp trên nền mạn (aclf)"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Suy gan cấp trên nền mạn (ACLF)",
        "searchKeyword": "suy gan cấp trên nền mạn (aclf)"
      }
    ]
  },
  "sot_mo": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Sốt mò",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Dưới đây là phần phân tích chuyên sâu về các biểu hiện lâm sàng của bệnh Sốt mò (Scrub Typhus), một bệnh lý rickettsia lây truyền qua ấu trùng mò (Orientia tsutsugamushi). Các đặc điểm lâm sàng được diễn giải từ giai đoạn ủ bệnh, triệu chứng cấp tính, cho đến các biến chứng nặng nề nhằm phục vụ cho ...",
    "goldStandard": "(gold standard) trong chẩn đoán huyết thanh học của bệnh sốt mò. Chẩn đoán được xác định chắc chắn khi có sự gia tăng hiệu giá kháng thể IgG lên gấp 4 lần giữa hai mẫu huyết thanh (mẫu giai đoạn cấp t",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "sot_mo_c1",
        "type": "major",
        "label": "- Dấu hiệu đặc thù: Đáng chú ý, mất thính lực (hearing loss) có thể xảy ra ở khoảng 30% bệnh nhân và được xem là một dấu hiệu có giá trị gợi ý bệnh rất cao trên lâm sàng.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c2",
        "type": "major",
        "label": "- Vết loét hoại tử (Eschar / Tâche noire): Đây là tổn thương bệnh lý tại vị trí vết đốt không đau của ấu trùng mò. Vết loét thường bắt đầu hình thành khoảng 2 đến 3 ngày trước",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c3",
        "type": "major",
        "label": "- Phát ban (Rash): Một ban đỏ dạng dát (macular) xuất hiện ở thân mình, sau đó tiến triển thành dát sẩn (maculopapular) và lan rộng ra ngoại vi (phân bố ly tâm). Ban thường xuấ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c4",
        "type": "imaging",
        "label": "- Viêm hạch và Mắt: Bệnh nhân thường có biểu hiện viêm hạch khu vực (sưng và đau) đi kèm với tình trạng xung huyết kết mạc (conjunctival injection).",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c5",
        "type": "major",
        "label": "- Hô hấp: Bệnh nhân có biểu hiện ho, [[Khó thở|thở nhanh]], khó thở và ran ở đáy Phổi. Tình trạng viêm mạch và rò rỉ mao mạch Phổi có thể dẫn đến biến chứng [[Suy h",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c6",
        "type": "major",
        "label": "- Thần kinh trung ương (CNS): Các biểu hiện thần kinh là biến chứng vô cùng nặng nề. Bệnh nhân có thể tiến triển từ lú lẫn, sảng sang trạng thái [[H",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c7",
        "type": "lab",
        "label": "- Thận và Huyết học: Tổn thương viêm nội mạc vi mạch có thể dẫn đến suy Thận cấp và hội chứng đông máu nội mạch rải rác (DIC).",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_mo_c8",
        "type": "minor",
        "label": "- Phụ nữ có thai: Sốt mò trong thai kỳ mang tiên lượng rất xấu. Tình trạng Nhiễm trùng huyết và viêm mạch hệ thống gây sảy thai hoặc thai chết lưu ở khoảng 1/3 số phụ nữ mắ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sốt mò (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Sốt mò - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Sốt mò",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Sốt mò",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Sốt mò: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Sốt mò",
        "searchKeyword": "sốt mò"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Sốt mò",
        "searchKeyword": "sốt mò"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Sốt mò",
        "searchKeyword": "sốt mò"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Sốt mò",
        "searchKeyword": "sốt mò"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Sốt mò",
        "searchKeyword": "sốt mò"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Sốt mò",
        "searchKeyword": "sốt mò"
      }
    ]
  },
  "sot_ret": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Sốt rét",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "routine",
    "summary": "Sốt rét là bệnh truyền nhiễm do ký sinh trùng đơn bào thuộc chi Plasmodium (gồm 5 loài: P. falciparum, P. vivax, P. malariae, P. ovale, P. knowlesi) gây ra thông qua vết đốt của muỗi cái Anopheles. Bệnh gợi ý lâm sàng bởi cơn sốt có tính chu kỳ kết hợp với yếu tố dịch tễ sống hoặc trở về từ vùng sốt rét lưu hành. Tiêu chuẩn vàng để xác định bệnh là phát hiện ký sinh trùng sốt rét trong máu bằng soi lam máu nhuộm Giemsa dưới kính hiển vi. Việc chẩn đoán sớm và loại trừ kịp thời các dấu hiệu cảnh báo sốt rét ác tính đóng vai trò quyết định nhằm ngăn ngừa nguy cơ suy đa cơ quan và tử vong.",
    "goldStandard": "để xác định bệnh là phát hiện ký sinh trùng sốt rét trong máu bằng soi lam máu nhuộm Giemsa dưới kính hiển vi. Việc chẩn đoán sớm và loại trừ kịp thời các dấu hiệu cảnh báo sốt rét ác tính đóng vai tr",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "sot_ret_c1",
        "type": "major",
        "label": "- Cơn sốt rét điển hình: Diễn biến qua 3 giai đoạn nối tiếp có tính chu kỳ:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c2",
        "type": "major",
        "label": "- Chu kỳ sốt tùy loài ký sinh trùng:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c3",
        "type": "major",
        "label": "- Cơn sốt rét không điển hình: Thường gặp ở người nhiễm lần đầu, trẻ em (sốt liên tục, sốt dao động) hoặc người sống lâu trong vùng dịch tễ (ớn lạnh, gai rét, sốt không thành c",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c4",
        "type": "major",
        "label": "- Các triệu chứng toàn thân đi kèm: Đau đầu, mệt mỏi, đau cơ khớp, chán ăn, buồn nôn, nôn mửa, đau rát họng.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c5",
        "type": "major",
        "label": "- Dấu hiệu sinh hiệu: Sốt cao, thở nhanh, mạch nhanh, có thể có tụt huyết áp nhẹ trong cơn sốt.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c6",
        "type": "major",
        "label": "- Khám hệ thống:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c7",
        "type": "major",
        "label": "- Dấu hiệu cờ đỏ nguy hiểm (Red Flags - Dấu hiệu cảnh báo sốt rét ác tính):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_ret_c8",
        "type": "major",
        "label": "1. Rối loạn tri giác nhẹ, thoáng qua: Li bì, cuồng sảng, vật vã, nói sảng, ngủ gà.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sốt rét (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Sốt rét - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Sốt rét",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Sốt rét",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Sốt rét: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Sốt rét",
        "searchKeyword": "sốt rét"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Sốt rét",
        "searchKeyword": "sốt rét"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Sốt rét",
        "searchKeyword": "sốt rét"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Sốt rét",
        "searchKeyword": "sốt rét"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Sốt rét",
        "searchKeyword": "sốt rét"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Sốt rét",
        "searchKeyword": "sốt rét"
      }
    ]
  },
  "sot_xuat_huyet_dengue": {
    "icdCode": "A97",
    "icdPrefixes": [
      "A97"
    ],
    "diseaseName": "Sốt xuất huyết Dengue",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Sốt xuất huyết Dengue (SXHD) là bệnh truyền nhiễm cấp tính do vi rút Dengue (4 typ huyết thanh DEN-1, DEN-2, DEN-3, DEN-4) lây truyền qua muỗi Aedes aegypti. Bệnh đặc trưng bởi sự khởi phát sốt cao đột ngột, hội chứng xuất huyết và tình trạng tăng tính thấm mao mạch gây thoát huyết tương. Tiêu chuẩn vàng chẩn đoán xác định sớm dựa trên xét nghiệm RT-PCR phát hiện ARN vi rút hoặc kháng nguyên NS1 trong 5–7 ngày đầu. Chẩn đoán và phân độ kịp thời (đặc biệt là phát hiện các dấu hiệu cảnh báo) đóng vai trò quyết định tiên lượng nhằm ngăn ngừa biến chứng sốc giảm thể tích, xuất huyết nặng và suy đa tạng.",
    "goldStandard": "chẩn đoán xác định sớm dựa trên xét nghiệm RT-PCR phát hiện ARN vi rút hoặc kháng nguyên NS1 trong 5–7 ngày đầu. Chẩn đoán và phân độ kịp thời (đặc biệt là phát hiện các dấu hiệu cảnh báo) đóng vai tr",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "sot_xuat_huyet_dengue_c1",
        "type": "major",
        "label": "- Triệu chứng cơ năng (Symptoms):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c2",
        "type": "major",
        "label": "- Triệu chứng kinh điển (Giai đoạn sốt): Sốt cao đột ngột, liên tục (39-40^{\\circ}\\text{C}), kéo dài từ 2 đến 7 ngày. Đi kèm nhức đầu nặng, chán ăn, buồn nôn, đau nhức",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c3",
        "type": "major",
        "label": "- Triệu chứng toàn thân & tiêu hóa: Da xung huyết, phát ban dạng sung huyết hoặc hồng ban, mệt mỏi lả, đau bụng dịu hoặc cảm giác khó chịu vùng hạ sườn phải.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c4",
        "type": "major",
        "label": "- Khám thực thể (Physical Examination):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c5",
        "type": "major",
        "label": "- Nghiệm pháp dây thắt (Tourniquet test / Lacet test): Bơm băng quấn huyết áp đến mức trung bình giữa HATT và HATTr trong 5 phút; đọc kết quả ở mặt trước cẳng tay. Nghiệm phá",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c6",
        "type": "lab",
        "label": "- Dấu hiệu xuất huyết da niêm mạc: Chấm xuất huyết rải rác dưới da (mặt trước cẳng chân, cánh tay, bụng), mảng bầm tím nơi tiêm truyền, chảy máu chân răng, chảy máu mũi (cam).",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c7",
        "type": "major",
        "label": "- Dấu hiệu cờ đỏ nguy hiểm (Red Flags / Warning Signs - Giai đoạn nguy hiểm):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "sot_xuat_huyet_dengue_c8",
        "type": "major",
        "label": "- Vật vã, lừ đừ, li bì.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Sốt xuất huyết Dengue (Truyền nhiễm & Vi sinh)",
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
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
  },
  "thuong_han": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thương hàn",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Tài liệu hướng dẫn chẩn đoán và phân tầng lâm sàng theo chứng cứ y khoa cho Thương hàn.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Tiêu hóa - Gan mật",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "thuong_han_c1",
        "type": "major",
        "label": "Triệu chứng lâm sàng cơ năng & thực thể đặc trưng của Thương hàn",
        "description": "thương hàn, tiêu hóa - gan mật, truyền nhiễm & vi sinh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "thuong_han_c2",
        "type": "lab",
        "label": "Xét nghiệm cận lâm sàng & dấu ấn sinh học đặc hiệu hỗ trợ xác định Thương hàn",
        "labThreshold": "Biến đổi trên ngưỡng tham chiếu bình thường",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "thuong_han_c3",
        "type": "imaging",
        "label": "Chẩn đoán hình ảnh học hoặc thăm dò chức năng chuyên sâu trong Thương hàn",
        "description": "Định vị thương tổn và đánh giá mức độ nặng / giai đoạn bệnh",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thương hàn (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thương hàn - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thương hàn",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của Thương hàn",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thương hàn: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thương hàn",
        "searchKeyword": "thương hàn"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thương hàn",
        "searchKeyword": "thương hàn"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thương hàn",
        "searchKeyword": "thương hàn"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thương hàn",
        "searchKeyword": "thương hàn"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thương hàn",
        "searchKeyword": "thương hàn"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thương hàn",
        "searchKeyword": "thương hàn"
      }
    ]
  },
  "thuy_dau": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Thủy đậu",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Bệnh Thủy đậu do Varicella-Zoster Virus (VZV) gây ra, có diễn tiến lâm sàng đặc trưng qua các thời kỳ từ ủ bệnh, tiền triệu cho đến toàn phát với các sang thương da đa hình thái.",
    "goldStandard": "(gold standard) và là phương pháp được ưu tiên nhất hiện nay nhờ độ nhạy và độ đặc hiệu cực cao (có thể lên tới 95-99% và >98.5% tương ứng). Kỹ thuật Real-time PCR phát hiện DNA của VZV có ngưỡng phát",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "thuy_dau_c1",
        "type": "major",
        "label": "- Thời kỳ ủ bệnh: Sau khi VZV xâm nhập qua đường hô hấp và trải qua đợt nhiễm virus huyết tiên phát, thời gian ủ bệnh thường kéo dài từ 10 đến 21 ngày, trung bình là 14 đến 16",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c2",
        "type": "major",
        "label": "- Giai đoạn tiền triệu: Xuất hiện khoảng 1 đến 2 ngày trước khi phát ban. Bệnh nhân thường có biểu hiện sốt nhẹ, mệt mỏi, chán ăn và đau đầu. Đặc điểm lâm sàng quan trọ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c3",
        "type": "imaging",
        "label": "- Tiến triển của tổn thương: Khởi đầu là các dát (macules) màu đỏ hoặc hồng, tiến triển nhanh thành sẩn (papules), sau đó hình thành các mụn nước (vesicles) chứa dịch trong suố",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c4",
        "type": "major",
        "label": "- Vị trí phân bố: Ban thường xuất hiện đầu tiên ở mặt, da đầu và ngực, lưng (vùng trung tâm), sau đó lan dần ra các chi nhưng thường thưa thớt hơn ở vùng ngoại vi (phân bố hướn",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c5",
        "type": "major",
        "label": "- Tổn thương niêm mạc: Các vết loét có thể xuất hiện trên màng nhầy, bao gồm hầu họng, đường hô hấp trên, kết mạc mi mắt, cũng như niêm mạc trực tràng và âm đạo. Các mụn nước t",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c6",
        "type": "major",
        "label": "- Hiện tượng phát ban thành nhiều đợt (Crops of lesions): Do cơ chế nhiễm virus huyết thứ phát (secondary viremia) giải phóng VZV liên tục, các nốt ban mới mọc lên thành nhiều",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c7",
        "type": "major",
        "label": "- Đặc điểm: Nhờ có sẵn một phần miễn dịch, bệnh cảnh thường rất nhẹ, thời gian bệnh ngắn hơn và bệnh nhân ít hoặc không bị sốt,.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "thuy_dau_c8",
        "type": "major",
        "label": "- Sang thương không điển hình: Bệnh nhân thường chỉ có dưới 50 tổn thương da. Đáng chú ý, ban trong thủy đậu đột phá có thể không hình thành mụn nước mà chỉ dừng lại ở dạng dát",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Thủy đậu (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Thủy đậu - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Thủy đậu",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Thủy đậu",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Thủy đậu: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Thủy đậu",
        "searchKeyword": "thủy đậu"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Thủy đậu",
        "searchKeyword": "thủy đậu"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Thủy đậu",
        "searchKeyword": "thủy đậu"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Thủy đậu",
        "searchKeyword": "thủy đậu"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Thủy đậu",
        "searchKeyword": "thủy đậu"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Thủy đậu",
        "searchKeyword": "thủy đậu"
      }
    ]
  },
  "uon_van": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Uốn ván",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "routine",
    "summary": "Chào quý đồng nghiệp, dưới đây là phân tích chuyên sâu về Lâm sàng của bệnh uốn ván (Tetanus), được tiếp cận dưới góc độ liên hệ chặt chẽ giữa cơ chế sinh lý bệnh và thực hành chẩn đoán.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Truyền nhiễm & Vi sinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "uon_van_c1",
        "type": "major",
        "label": "- Ứng dụng tiên lượng: Về mặt lâm sàng, thời kỳ ủ bệnh và thời kỳ khởi phát (khoảng thời gian từ triệu chứng đầu tiên cho đến cơn co giật toàn thể đầu tiên) càng ng",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c2",
        "type": "major",
        "label": "- Dấu hiệu co cứng cơ kinh điển: Bệnh thường khởi phát với tình trạng khít hàm (trismus/lockjaw - do tăng trương lực cơ cắn) và vẻ mặt nhăn nhở/cười mỉm đặc trưng (risus sardon",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c3",
        "type": "major",
        "label": "- Tiến triển: Bệnh tiến triển theo mô hình lan từ trên xuống dưới (descending pattern). Các cơn co giật toàn thể có thể tạo ra tư thế co cứng mất vỏ (decorticate) h",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c4",
        "type": "major",
        "label": "- Liên hệ cơ chế bệnh sinh: Tình trạng co cứng và co giật phản ánh việc độc tố tetanospasmin di chuyển ngược dòng dọc theo sợi trục thần kinh vào Hệ thần kinh trung ương, t",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c5",
        "type": "imaging",
        "label": "- Rối loạn thần kinh thực vật (Autonomic Dysfunction): Một biến chứng lâm sàng cực kỳ phức tạp trong uốn ván toàn thể là trạng thái cường giao cảm (hypersympathetic state). Bện",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c6",
        "type": "major",
        "label": "- Dấu hiệu lâm sàng: Tổn thương thường biểu hiện dưới dạng tổn thương neuron vận động dưới, gây yếu liệt dây thần kinh mặt (liệt mặt) và đôi khi ảnh hưởng đến cả các cơ vận nhã",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c7",
        "type": "major",
        "label": "- Tiên lượng: Uốn ván thể đầu có tỷ lệ tử vong được báo cáo từ 15% đến 30%.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "uon_van_c8",
        "type": "major",
        "label": "- Biểu hiện sớm: Trẻ sơ sinh thường khởi phát với tình trạng yếu ớt toàn thân, bỏ bú hoặc không thể bú.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Uốn ván (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Uốn ván - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Uốn ván",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Uốn ván",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Uốn ván: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Uốn ván",
        "searchKeyword": "uốn ván"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Uốn ván",
        "searchKeyword": "uốn ván"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Uốn ván",
        "searchKeyword": "uốn ván"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Uốn ván",
        "searchKeyword": "uốn ván"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Uốn ván",
        "searchKeyword": "uốn ván"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Uốn ván",
        "searchKeyword": "uốn ván"
      }
    ]
  },
  "vgsv_b": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "VGSV-B",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Thời kỳ ủ bệnh của viêm gan vi rút B (HBV) kéo dài trung bình từ 60 đến 90 ngày, nhưng có thể dao động trong khoảng từ 28 đến 160 ngày,. Đặc điểm nổi bật của giai đoạn cấp tính là sự đa dạng trong biểu hiện lâm sàng, phụ thuộc rất lớn vào độ tuổi và tình trạng miễn dịch của người bệnh.",
    "goldStandard": "nhưng xâm lấn. Chỉ được chỉ định khi các phương pháp không xâm lấn cho kết quả mâu thuẫn, hoặc cần chẩn đoán phân biệt với các bệnh lý gan khác (như bệnh gan nhiễm mỡ, viêm gan tự miễn).",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "vgsv_b_c7"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "vgsv_b_c1",
        "type": "major",
        "label": "- Thể không triệu chứng (Asymptomatic): Chiếm tỷ lệ lớn, khoảng 50-70% người lớn mắc viêm gan B cấp không có bất kỳ triệu chứng lâm sàng nào. Ở trẻ em dưới 5 tuổi, đặc biệt là",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c2",
        "type": "major",
        "label": "- Thể có triệu chứng (Symptomatic): Khoảng 30-50% người lớn và trẻ lớn (trên 5 tuổi) sẽ có các biểu hiện lâm sàng rõ rệt của một đợt viêm gan cấp,.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c3",
        "type": "lab",
        "label": "- Thể tối cấp (Fulminant Hepatitis): Dù hiếm gặp (khoảng 0.1% đến 2% số ca cấp tính), đây là một tình trạng cấp cứu nội khoa với tỷ lệ tử vong rất cao,. Bệnh nhân diễn tiến nha",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c4",
        "type": "lab",
        "label": "- Giai đoạn ổn định (Không triệu chứng): Đa số bệnh nhân viêm gan B mạn tính không có bất kỳ triệu chứng lâm sàng nào và cảm thấy hoàn toàn khỏe mạnh trong nhiều thập kỷ,,. Tro",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c5",
        "type": "major",
        "label": "- Đợt bùng phát viêm gan B (Hepatitis Flare / Exacerbation): Xảy ra khi hệ miễn dịch đột ngột tăng cường tấn công các tế bào gan nhiễm vi rút hoặc khi vi rút tái hoạt đ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c6",
        "type": "major",
        "label": "- Suy gan mạn và Xơ gan (Advanced Liver Disease): Khi bệnh tiến triển đến xơ gan, đặc biệt là xơ gan mất bù, người bệnh sẽ xuất hiện các hội chứng suy tế bào gan và tăn",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c7",
        "type": "mandatory",
        "label": "- Men gan (AST và ALT): Đây là các enzyme nội bào, phản ánh tình trạng tổn thương và hoại tử tế bào gan. ALT đặc hiệu cho gan hơn do chủ yếu hiện diện trong bào tương",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_b_c8",
        "type": "lab",
        "label": "- Chức năng tổng hợp và đông máu (Albumin, PT/INR): Albumin phản ánh chức năng tổng hợp mạn tính. Đặc biệt, thời gian Prothrombin (PT) hoặc chỉ số INR là yếu tố tiên lượng cực",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị VGSV-B (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị VGSV-B - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho VGSV-B",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của VGSV-B",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân VGSV-B: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán VGSV-B",
        "searchKeyword": "vgsv-b"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán VGSV-B",
        "searchKeyword": "vgsv-b"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng VGSV-B",
        "searchKeyword": "vgsv-b"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị VGSV-B",
        "searchKeyword": "vgsv-b"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc VGSV-B",
        "searchKeyword": "vgsv-b"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng VGSV-B",
        "searchKeyword": "vgsv-b"
      }
    ]
  },
  "vgsv_c": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "VGSV-C",
    "specialty": "Tiêu hóa - Gan mật",
    "severity": "urgent",
    "summary": "Viêm gan C cấp tính là giai đoạn nhiễm trùng xảy ra trong vòng 6 tháng đầu tiên kể từ khi phơi nhiễm với vi rút viêm gan C (HCV). Đặc trưng lâm sàng lớn nhất của giai đoạn này là sự im lặng.",
    "goldStandard": "để khẳng định tình trạng hiện nhiễm HCV (viremia). ARN của vi rút xuất hiện rất sớm trong máu, chỉ vài ngày (từ 7 đến 28 ngày) sau phơi nhiễm. - Ứng dụng lâm sàng: Xét nghiệm định lượng HCV RNA được s",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Tiêu hóa - Gan mật)"
    },
    "criteria": [
      {
        "id": "vgsv_c_c1",
        "type": "lab",
        "label": "- Thể không triệu chứng: Phần lớn các trường hợp nhiễm HCV cấp tính hoàn toàn không có triệu chứng lâm sàng rõ ràng. Bệnh thường chỉ được tình cờ phát hiện thông qua xét nghiệm",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c2",
        "type": "minor",
        "label": "- Thể có triệu chứng: Chỉ một tỷ lệ nhỏ bệnh nhân có các biểu hiện không đặc hiệu như mệt mỏi, chán ăn, [[Nôn ói|buồn nôn]], đau nhẹ vùng hạ sườn phải, [[Sốt|sốt nhẹ]]",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c3",
        "type": "lab",
        "label": "- Động học vi rút và Men gan: Mặc dù ít triệu chứng, men gan (AST, ALT) thường tăng cao trong giai đoạn cấp tính. HCV RNA có thể được phát hiện trong máu rất sớm, chỉ vài ngày",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c4",
        "type": "major",
        "label": "- Giai đoạn chưa biến chứng: Đa số người bệnh không có triệu chứng lâm sàng trong nhiều năm. Một số ít phàn nàn về tình trạng suy nhược, mệt mỏi mạn tính, chán ăn, khó tiêu hoặ",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c5",
        "type": "major",
        "label": "- Tiến triển xơ hóa và Xơ gan: Quá trình viêm hoại tử liên tục kích hoạt sinh xơ (fibrogenesis). Khoảng 15-30% bệnh nhân sẽ tiến triển thành xơ gan trong vòng 20 năm. Khi chuyể",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c6",
        "type": "major",
        "label": "- Ung thư biểu mô tế bào gan (HCC): HCV có thể gây ung thư gan trực tiếp thông qua thay đổi biểu hiện gen tế bào chủ hoặc gián tiếp qua quá trình xơ hóa.",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c7",
        "type": "lab",
        "label": "- Rối loạn Miễn dịch và Mạch máu:",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      },
      {
        "id": "vgsv_c_c8",
        "type": "lab",
        "label": "- Viêm mạch do Cryoglobulin máu hỗn hợp (Mixed Cryoglobulinemia): Là biến chứng điển hình nhất, do sự lắng đọng các phức hợp miễn dịch trong mạch máu, gây ban Xuất huyết (p",
        "sourceGuideline": "Tiêu hóa - Gan mật"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị VGSV-C (Tiêu hóa - Gan mật)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị VGSV-C - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho VGSV-C",
          "class": "Thuốc đặc hiệu chuyên khoa Tiêu hóa - Gan mật",
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
        "name": "Biến chứng cấp tính của VGSV-C",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân VGSV-C: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán VGSV-C",
        "searchKeyword": "vgsv-c"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán VGSV-C",
        "searchKeyword": "vgsv-c"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng VGSV-C",
        "searchKeyword": "vgsv-c"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị VGSV-C",
        "searchKeyword": "vgsv-c"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc VGSV-C",
        "searchKeyword": "vgsv-c"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng VGSV-C",
        "searchKeyword": "vgsv-c"
      }
    ]
  },
  "viem_gan_vi_rut_b": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm gan vi-rút B",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "routine",
    "summary": "Viêm gan vi-rút B (HBV) là bệnh truyền nhiễm phổ biến do vi-rút HBV thuộc họ Hepadnaviridae gây ra, lây truyền chính qua đường máu, quan hệ tình dục và từ mẹ sang con. Bệnh được xác định mạn tính khi kháng nguyên bề mặt HBsAg tồn tại duy trì kéo dài ≥ 6 tháng. Chẩn đoán xác định dựa vào sự hiện diện của HBsAg và/hoặc HBV DNA trong máu, kết hợp đánh giá mức độ tổn thương hoại tử viêm gan (ALT/AST) và xơ hóa gan (FibroScan, APRI, FIB-4). Sàng lọc và chẩn đoán sớm có ý nghĩa sống còn để can thiệp điều trị kịp thời, ngăn ngừa tiến triển thành xơ gan mất bù, suy gan cấp và ung thư biểu mô tế bào gan (HCC).",
    "goldStandard": "& BỘ TIÊU CHÍ CHẨN ĐOÁN XÁC ĐỊNH",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "viem_gan_vi_rut_b_c1",
        "type": "major",
        "label": "- Triệu chứng cơ năng (Symptoms):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c2",
        "type": "major",
        "label": "- Triệu chứng kinh điển / Dấu hiệu cảnh báo sớm:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c3",
        "type": "minor",
        "label": "- Các triệu chứng kèm theo và toàn thân: Đau mỏi khớp, phát ban ngoài gan (sẩn ngứa, viêm mạch), sụt cân nhẹ, mệt mỏi kéo dài không rõ nguyên nhân.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c4",
        "type": "major",
        "label": "- Khám thực thể (Physical Examination):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c5",
        "type": "major",
        "label": "- Nhìn, sờ, gõ, nghe & Dấu hiệu thực thể:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c6",
        "type": "major",
        "label": "- Dấu hiệu cờ đỏ nguy hiểm (Red Flags) báo hiệu biến chứng cấp / Viêm gan thể tối cấp:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c7",
        "type": "major",
        "label": "- Viêm gan B thể tối cấp (Fulminant Hepatitis B): Xuất hiện suy gan cấp nghiêm trọng trong vài tuần sau vàng da với 3 đặc điểm:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_b_c8",
        "type": "major",
        "label": "1. Bệnh não gan (thay đổi tri giác, lơ mơ, ngủ gà, hành vi bất thường, hôn mê gan).",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm gan vi-rút B (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm gan vi-rút B - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm gan vi-rút B",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Viêm gan vi-rút B",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm gan vi-rút B: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm gan vi-rút B",
        "searchKeyword": "viêm gan vi-rút b"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm gan vi-rút B",
        "searchKeyword": "viêm gan vi-rút b"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm gan vi-rút B",
        "searchKeyword": "viêm gan vi-rút b"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm gan vi-rút B",
        "searchKeyword": "viêm gan vi-rút b"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm gan vi-rút B",
        "searchKeyword": "viêm gan vi-rút b"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm gan vi-rút B",
        "searchKeyword": "viêm gan vi-rút b"
      }
    ]
  },
  "viem_gan_vi_rut_c": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Viêm gan vi-rút C",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "routine",
    "summary": "Viêm gan vi-rút C (HCV) là bệnh truyền nhiễm nguy hiểm do vi-rút sợi đơn RNA thuộc họ Flaviviridae gây ra, lây truyền chủ yếu qua đường máu, ngoài ra còn qua đường tình dục và từ mẹ sang con. Bệnh có diễn tiến lâm sàng cực kỳ âm thầm; phần lớn người nhiễm không có triệu chứng rõ rệt cho đến khi phát triển các biến chứng nghiêm trọng như xơ gan hoặc ung thư biểu mô tế bào gan (HCC). Chẩn đoán xác định nhiễm HCV hiện hành dựa vào xét nghiệm huyết thanh học Anti-HCV kết hợp với xét nghiệm khẳng định vi-rút học (HCV RNA hoặc kháng nguyên lõi HCVcAg). Tiêu chuẩn vàng vi-rút học là tải lượng HCV RNA trên ngưỡng phát hiện; đồng thời việc đánh giá giai đoạn xơ hóa gan bằng các phương pháp không xâm lấn (FibroScan, APRI, FIB-4) có vai trò quyết định trong việc phân tầng nguy cơ và lập kế hoạch điều trị diệt vi-rút bằng phác đồ DAA.",
    "goldStandard": "vi-rút học là tải lượng HCV RNA trên ngưỡng phát hiện; đồng thời việc đánh giá giai đoạn xơ hóa gan bằng các phương pháp không xâm lấn (FibroScan, APRI, FIB-4) có vai trò quyết định trong việc phân tầ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "viem_gan_vi_rut_c_c1",
        "type": "major",
        "label": "- Triệu chứng cơ năng (Symptoms):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c2",
        "type": "major",
        "label": "- Triệu chứng kinh điển / Dấu hiệu cảnh báo sớm:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c3",
        "type": "minor",
        "label": "- Các triệu chứng kèm theo và biểu hiện ngoài gan (Extrahepatic Manifestations):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c4",
        "type": "major",
        "label": "- Khám thực thể (Physical Examination):",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c5",
        "type": "major",
        "label": "- Nhìn, sờ, gõ, nghe & Dấu hiệu thực thể:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c6",
        "type": "major",
        "label": "- Dấu hiệu cờ đỏ nguy hiểm (Red Flags) báo hiệu biến chứng cấp / Xơ gan mất bù:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c7",
        "type": "lab",
        "label": "- Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản: Nôn ra máu đỏ tươi, đi cầu phân đen như bã cà phê, tụt huyết áp, mạch nhanh nhỏ.",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "viem_gan_vi_rut_c_c8",
        "type": "major",
        "label": "- Hội chứng não - gan (Hepatic Encephalopathy): Lơ mơ, rối loạn giấc ngủ (ngủ ngày thức đêm), thay đổi tính cách, mất định hướng, run vỗ cánh (Flapping tremor).",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm gan vi-rút C (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm gan vi-rút C - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm gan vi-rút C",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Viêm gan vi-rút C",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm gan vi-rút C: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm gan vi-rút C",
        "searchKeyword": "viêm gan vi-rút c"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm gan vi-rút C",
        "searchKeyword": "viêm gan vi-rút c"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm gan vi-rút C",
        "searchKeyword": "viêm gan vi-rút c"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm gan vi-rút C",
        "searchKeyword": "viêm gan vi-rút c"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm gan vi-rút C",
        "searchKeyword": "viêm gan vi-rút c"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm gan vi-rút C",
        "searchKeyword": "viêm gan vi-rút c"
      }
    ]
  },
  "viem_mang_nao": {
    "icdCode": "G00",
    "icdPrefixes": [
      "G00"
    ],
    "diseaseName": "Viêm màng não",
    "specialty": "Thần kinh",
    "severity": "urgent",
    "summary": "Viêm màng não (Meningitis) là tình trạng viêm cấp hoặc mạn tính của màng nhện, màng mềm và khoang dưới nhện bao quanh não bộ và tủy sống. Tổ hợp dấu hiệu cờ đỏ (Red flag combination) bao gồm sốt, đau đầu, cứng gáy và thay đổi tri giác/nhận thức là manh mối lâm sàng then chốt gợi ý bệnh. Chọc dò tủy sống (LP) kết hợp xét nghiệm dịch não tủy (DNT) là phương tiện cốt lõi để xác định hội chứng viêm màng não, trong đó nuôi cấy DNT và kháng sinh đồ duy trì vai trò tiêu chuẩn vàng để định danh vi khuẩn. Việc chẩn đoán sớm và điều trị cấp cứu trong vòng 1 giờ đầu có ý nghĩa sống còn nhằm giảm tỷ lệ tử vong và biến chứng thần kinh vĩnh viễn.",
    "goldStandard": "để định danh vi khuẩn. Việc chẩn đoán sớm và điều trị cấp cứu trong vòng 1 giờ đầu có ý nghĩa sống còn nhằm giảm tỷ lệ tử vong và biến chứng thần kinh vĩnh viễn.",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "viem_mang_nao_c1",
        "type": "major",
        "label": "- Đau đầu (Headache): Đau đầu dữ dội, lan tỏa, liên tục, tăng lên khi ánh sáng chiếu vào hoặc khi ho, rặn. Đau đầu xuất hiện ở khoảng 87% người lớn nhưng khó khai báo ở trẻ sơ",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c2",
        "type": "major",
        "label": "- Sốt (Fever): Sốt cao đột ngột (từ \\ge 38,0^\\circ\\text{C} trở lên), có thể kèm rét run. Sốt xuất hiện ở 77–97% bệnh nhân nhưng ít gặp hơn ở trẻ sơ sinh và người cao tuổi.",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c3",
        "type": "major",
        "label": "- Sợ ánh sáng (Photophobia) & Tăng cảm giác đau (Hyperacusis): Người bệnh khó chịu tột độ khi tiếp xúc với ánh sáng hoặc tiếng động.",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c4",
        "type": "major",
        "label": "- Nôn mửa / Nausea: Nôn vọt không liên quan đến bữa ăn, gặp ở 55–74% trường hợp do tình trạng tăng áp lực nội sọ.",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c5",
        "type": "minor",
        "label": "- Ở trẻ sơ sinh & trẻ nhỏ: Triệu chứng cơ năng thường không đặc hiệu gồm bỏ bú / giảm bú, khóc yếu hoặc tiếng khóc thét cao giọng, lờ đờ, quấy khóc kích thích.",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c6",
        "type": "lab",
        "label": "- Khám dấu hiệu kích thích màng não (Meningeal Irritation Signs):",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c7",
        "type": "major",
        "label": "- Dấu cứng gáy (Neck Stiffness / Nuchal Rigidity): Bệnh nhân khó khăn hoặc đau đớn khi gập cằm chủ động/thụ động chạm vào ngực. Cứng gáy xuất hiện ở 31–83% người lớn nhưng rất",
        "sourceGuideline": "Thần kinh"
      },
      {
        "id": "viem_mang_nao_c8",
        "type": "major",
        "label": "- Dấu Kernig: Bệnh nhân nằm ngửa, đùi gập 90° vào bụng; khi mở rộng cẳng chân thụ động sẽ gặp trở lực hoặc gây đau co cứng cơ khoeo chân bên đối diện.",
        "sourceGuideline": "Thần kinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm màng não (Thần kinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Viêm màng não - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm màng não",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Viêm màng não",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm màng não: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm màng não",
        "searchKeyword": "viêm màng não"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm màng não",
        "searchKeyword": "viêm màng não"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm màng não",
        "searchKeyword": "viêm màng não"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm màng não",
        "searchKeyword": "viêm màng não"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm màng não",
        "searchKeyword": "viêm màng não"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm màng não",
        "searchKeyword": "viêm màng não"
      }
    ]
  },
  "viem_nao": {
    "icdCode": "G04.9",
    "icdPrefixes": [
      "G04",
      "G05"
    ],
    "diseaseName": "Viêm não",
    "specialty": "Thần kinh",
    "severity": "urgent",
    "summary": "Viêm não (Encephalitis) là hội chứng tổn thương nhu mô não do tình trạng viêm gây ra bởi nguyên nhân nhiễm trùng (chủ yếu là virus như Herpes simplex virus - HSV, Japanese encephalitis virus - JEV) hoặc trung gian miễn dịch (viêm não tự miễn như kháng NMDAR). Bệnh lý biểu hiện đặc trưng bởi sự thay đổi trạng thái tâm thần/tri giác kéo dài ≥ 24 giờ kèm theo sốt, co giật, rối loạn hành vi, rối loạn vận động hoặc các dấu hiệu thần kinh khu trú. Tiêu chuẩn vàng để chẩn đoán xác định căn nguyên là xét nghiệm PCR/mNGS dịch nãotủy đối với vi sinh vật và xét nghiệm kháng thể tự miễn đặc hiệu (CBA/IIF) trong dịch nãotủy. Việc nhận diện sớm và phân loại chính xác thể bệnh đóng vai trò tiên quyết nhằm điều trị trúng đích, giảm tỷ lệ tử vong và hạn chế tối đa di chứng thần kinh – tâm thần lâu dài.",
    "goldStandard": "để chẩn đoán xác định căn nguyên là xét nghiệm PCR/mNGS dịch nãotủy đối với vi sinh vật và xét nghiệm kháng thể tự miễn đặc hiệu (CBA/IIF) trong dịch nãotủy. Việc nhận diện sớm và phân loại chính xác ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Thần kinh)"
    },
    "criteria": [
      {
        "id": "viem_nao_c1",
        "type": "major",
        "label": "- Khởi phát & Tiền triệu (Prodromal phase):",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c2",
        "type": "major",
        "label": "- Triệu chứng tâm thần & Nhận thức (Psychiatric & Cognitive Symptoms):",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c3",
        "type": "major",
        "label": "- Rối loạn giấc ngủ: Mất ngủ trầm trọng, thức giấc nhiều lần trong đêm hoặc ngủ gà.",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c4",
        "type": "major",
        "label": "- Rối loạn tri giác & Ý thức: Thay đổi mức độ ý thức từ lơ mơ, ngủ gà, li bì cho đến hôn mê sâu (đánh giá theo thang điểm Glasgow - GCS).",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c5",
        "type": "major",
        "label": "- Co giật & Động kinh (Seizures): Các cơn co giật cục bộ hoặc toàn thể hóa, có thể tiến triển thành trạng thái động kinh (Status Epilepticus) dai dẳng kháng trị.",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c6",
        "type": "lab",
        "label": "- Rối loạn vận động (Movement Disorders):",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c7",
        "type": "major",
        "label": "- Dấu hiệu thần kinh khu trú & Màng não:",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      },
      {
        "id": "viem_nao_c8",
        "type": "major",
        "label": "- Phân tích Dịch não tủy (CSF Analysis):",
        "sourceGuideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Viêm não (Thần kinh)",
      "guideline": "International Encephalitis Consortium (IEC) Guidelines (Venkatesan et al., 2013)",
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
          "drugName": "Thuốc điều trị bậc 1 cho Viêm não",
          "class": "Thuốc đặc hiệu chuyên khoa Thần kinh",
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
        "name": "Biến chứng cấp tính của Viêm não",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Viêm não: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Viêm não",
        "searchKeyword": "viêm não"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Viêm não",
        "searchKeyword": "viêm não"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Viêm não",
        "searchKeyword": "viêm não"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Viêm não",
        "searchKeyword": "viêm não"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Viêm não",
        "searchKeyword": "viêm não"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Viêm não",
        "searchKeyword": "viêm não"
      }
    ]
  },
  "zona": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Zona",
    "specialty": "Truyền nhiễm & Vi sinh",
    "severity": "urgent",
    "summary": "Dưới góc độ lâm sàng và bệnh học truyền nhiễm, biểu hiện của bệnh Zona (Herpes Zoster) phản ánh trực tiếp cơ chế tái hoạt động của vi-rút Varicella-Zoster (VZV) từ các hạch thần kinh, di chuyển xuôi dòng sợi trục và gây tổn thương tại vùng da chi phối tương ứng.",
    "goldStandard": "Tiêu chuẩn vàng xác định dựa trên cận lâm sàng đặc hiệu, mô bệnh học hoặc khuyến cáo chuyên khoa Truyền nhiễm & Vi sinh",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "zona_c5"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Truyền nhiễm & Vi sinh)"
    },
    "criteria": [
      {
        "id": "zona_c1",
        "type": "major",
        "label": "- Tiền triệu (Prodrome): Sự nhân lên của vi-rút và tình trạng viêm dây thần kinh cấp tính gây ra triệu chứng ==đau== dọc theo tiết đoạn thần kinh (khoanh da) bị ảnh hưởng, thườ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c2",
        "type": "major",
        "label": "- Đặc điểm ban da:",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c3",
        "type": "major",
        "label": "- Động học tổn thương: Ở người có miễn dịch bình thường, các tổn thương mới tiếp tục hình thành trong 3 đến 5 ngày, tổng thời gian bệnh kéo dài 10 đến 15 ngày, và có thể mất đế",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c4",
        "type": "lab",
        "label": "- Zoster sine herpete: Đây là một biến thể lâm sàng đặc biệt khi bệnh nhân ==chỉ có biểu hiện đau theo tiết đoạn thần kinh nhưng hoàn toàn không nổi ban ngoài da==; việc chẩn đ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c5",
        "type": "mandatory",
        "label": "- Zona mắt (Herpes Zoster Ophthalmicus): Xảy ra khi tổn thương liên quan đến nhánh 1 hoặc nhánh 2 của dây thần kinh sinh ba (dây V). Đây là tình trạng đe dọa thị lực nghiêm trọ",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c6",
        "type": "major",
        "label": "- Tổn thương niêm mạc miệng: Nếu liên quan đến nhánh hàm trên hoặc hàm dưới của dây V, các tổn thương có thể xuất hiện bên trong khoang miệng như ở vòm miệng, hố amidan, sàn mi",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c7",
        "type": "major",
        "label": "- Hội chứng Ramsay Hunt: Xảy ra do VZV tái hoạt động tại hạch gối (geniculate ganglion) của dây thần kinh số VII. Hội chứng này đặc trưng bởi tam chứng: đau và nổi mụn nước ở ố",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      },
      {
        "id": "zona_c8",
        "type": "major",
        "label": "- Đặc điểm lâm sàng: Đau có thể mang tính chất liên tục ở khoanh da bị ảnh hưởng hoặc xuất hiện dưới dạng các cơn đau nhói đâm xuyên từng cơn. Tình trạng đau thường tồi tệ hơn",
        "sourceGuideline": "Truyền nhiễm & Vi sinh"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Zona (Truyền nhiễm & Vi sinh)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Zona - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Zona",
          "class": "Thuốc đặc hiệu chuyên khoa Truyền nhiễm & Vi sinh",
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
        "name": "Biến chứng cấp tính của Zona",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Zona: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Zona",
        "searchKeyword": "zona"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Zona",
        "searchKeyword": "zona"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Zona",
        "searchKeyword": "zona"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Zona",
        "searchKeyword": "zona"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Zona",
        "searchKeyword": "zona"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Zona",
        "searchKeyword": "zona"
      }
    ]
  },
  "ap_xe_gan": {
    "icdCode": "R69",
    "icdPrefixes": [
      "R69"
    ],
    "diseaseName": "Áp xe gan",
    "specialty": "Hô hấp",
    "severity": "urgent",
    "summary": "28 mg/dL) là những yếu tố dự báo tử vong độc lập ở bệnh nhân áp xe gan sinh mủ, với tỷ số chênh (Odds ratios) lần lượt lên tới 13 và 14.",
    "goldStandard": "để khảo sát các tổn thương phức tạp. Thuốc cản quang tĩnh mạch là yếu tố bắt buộc để tối ưu hóa hình ảnh ở 2/3 số bệnh nhân. CT Scan còn thể hiện ưu thế tuyệt đối trong việc hướng dẫn các thủ thuật dẫ",
    "criteriaRule": {
      "minMajorRequired": 1,
      "minMinorRequired": 1,
      "mandatoryIds": [
        "ap_xe_gan_c2",
        "ap_xe_gan_c8"
      ],
      "ruleDescription": "Chẩn đoán xác định khi thỏa mãn các tiêu chuẩn lâm sàng kết hợp cận lâm sàng chuyên khoa (Hô hấp)"
    },
    "criteria": [
      {
        "id": "ap_xe_gan_c1",
        "type": "imaging",
        "label": "- [[Siêu âm|Siêu âm bụng]] (Ultrasonography): Đây là phương tiện chẩn đoán hình ảnh lựa chọn ban đầu, đặc biệt ở bệnh nhân nghi ngờ có bệnh lý đường mật kèm theo hoặc những",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c2",
        "type": "mandatory",
        "label": "- Cắt lớp vi tính (CT Scan) có cản quang: Có độ nhạy vượt trội (đạt xấp xỉ 95%) và là tiêu chuẩn vàng để khảo sát các tổn thương phức tạp. Thuốc cản quang tĩnh mạch là yếu",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c3",
        "type": "imaging",
        "label": "- Cộng hưởng từ (MRI): Hiếm khi được yêu cầu thường quy trong chẩn đoán áp xe. Tuy nhiên, MRI vượt trội hơn CT trong việc phân biệt áp xe Gan với các tổn thương gan",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c4",
        "type": "major",
        "label": "- Huyết học: Tăng Bạch cầu (Leukocytosis) xuất hiện ở phần lớn bệnh nhân (68% đến 88% số ca), với số lượng bạch cầu trung bình thường từ 15.000 đến 17.000/mm³.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c5",
        "type": "lab",
        "label": "- Sinh hóa gan: Tăng nồng độ Phosphatase kiềm (Alkaline phosphatase) là bất thường chức năng gan phổ biến nhất, gặp ở khoảng 2/3 số bệnh nhân. Các men gan khác (ALT, AST) v",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c6",
        "type": "lab",
        "label": "- Dấu ấn viêm: Nồng độ Procalcitonin (PCT) máu thường tăng cao.",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c7",
        "type": "lab",
        "label": "- Giá trị tiên lượng (Prognostic markers): Một phân tích đa biến cho thấy tình trạng thiếu máu (Hemoglobin < 10 g/dL) và tình trạng suy giảm chức năng Thận (BUN > 28 mg/dL)",
        "sourceGuideline": "Hô hấp"
      },
      {
        "id": "ap_xe_gan_c8",
        "type": "mandatory",
        "label": "- Cấy máu (Blood Cultures): ==Khoảng 50%== bệnh nhân áp xe gan sinh mủ có cấy máu dương tính. Bắt buộc phải cấy máu nhiều bộ (cả hiếu khí và kỵ khí) trước khi bắt đầu [[Kháng s",
        "sourceGuideline": "Hô hấp"
      }
    ],
    "protocol": {
      "title": "Phác đồ Tiếp cận & Điều trị Áp xe gan (Hô hấp)",
      "guideline": "Hướng dẫn Chẩn đoán & Điều trị Áp xe gan - Bộ Y Tế & Quốc Tế",
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
          "drugName": "Thuốc điều trị bậc 1 cho Áp xe gan",
          "class": "Thuốc đặc hiệu chuyên khoa Hô hấp",
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
        "name": "Biến chứng cấp tính của Áp xe gan",
        "timeframe": "acute_24h",
        "warningSigns": "Diễn tiến nặng đột ngột, suy hô hấp, rối loạn huyết động hoặc thay đổi tri giác",
        "preventiveAction": "Phát hiện sớm dấu hiệu cảnh báo và xử trí cấp cứu theo phác đồ",
        "onCallAlertText": "Báo động biến chứng cấp trên bệnh nhân Áp xe gan: Kiểm tra sinh hiệu và báo bác sĩ trực ngay"
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
        "articleTitle": "Tiếp cận chẩn đoán Áp xe gan",
        "searchKeyword": "áp xe gan"
      },
      {
        "khoCode": "CD",
        "khoName": "Kho Tiêu Chuẩn CĐ",
        "articleTitle": "Tiêu chuẩn chẩn đoán Áp xe gan",
        "searchKeyword": "áp xe gan"
      },
      {
        "khoCode": "CLS",
        "khoName": "Kho Cận Lâm Sàng",
        "articleTitle": "Xét nghiệm & Cận lâm sàng Áp xe gan",
        "searchKeyword": "áp xe gan"
      },
      {
        "khoCode": "PDDT",
        "khoName": "Kho Phác Đồ",
        "articleTitle": "Phác đồ điều trị Áp xe gan",
        "searchKeyword": "áp xe gan"
      },
      {
        "khoCode": "DUOC",
        "khoName": "Kho Dược",
        "articleTitle": "Dược thư & Sử dụng thuốc Áp xe gan",
        "searchKeyword": "áp xe gan"
      },
      {
        "khoCode": "BC",
        "khoName": "Kho Biến Chứng",
        "articleTitle": "Biến chứng & Tiên lượng Áp xe gan",
        "searchKeyword": "áp xe gan"
      }
    ]
  }
};

export const KHO_CHAN_DOAN_KEYS = Object.keys(KHO_CHAN_DOAN_DATABASE);
