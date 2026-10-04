/**
 * CliniPortal MedLens — Core Disease Knowledge Base
 * Đồng bộ hóa từ 29 Enriched CDSS Databases & Diagnostic Criteria Database
 */
import { Benh } from '../types.ts';

export const CORE_DISEASES: Benh[] = [
  {
    "id": "aclf",
    "ten": "Suy gan cấp trên nền mạn (Acute-on-Chronic Liver Failure - ACLF)",
    "tenNgan": "ACLF",
    "icd": "K72.1",
    "nhom": "Toàn thân",
    "baoDong": true,
    "ghiChuBaoDong": "Suy gan cấp trên nền mạn (ACLF) là hội chứng lâm sàng cấp tính phức tạp, xuất hiện trên bệnh nhân có bệnh gan mạn tính tiến triển hoặc xơ gan (còn bù hoặc mất b...",
    "tomTat": "Suy gan cấp trên nền mạn (ACLF) là hội chứng lâm sàng cấp tính phức tạp, xuất hiện trên bệnh nhân có bệnh gan mạn tính tiến triển hoặc xơ gan (còn bù hoặc mất bù). Bệnh đặc trưng bởi sự xuất hiện đợt mất bù cấp tính kèm suy đa tạng (tổn thương tạng tại gan và ngoài gan) và phản ứng viêm hệ thống bùng phát mạnh mẽ, dẫn đến nguy cơ tử vong ngắn hạn rất cao trong vòng 28 đến 90 ngày (lên tới 50% - 80%). Tại Châu Á và Việt Nam, đợt bùng phát vi rút viêm gan B (HBV reactivation) là yếu tố khởi phát hàng đầu, bên cạnh các nhiễm trùng vi khuẩn (SBP, nhiễm trùng huyết) và rượu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tieu_chuan_nen_benh_gan_man",
        4.5,
        "dt"
      ],
      [
        "tieu_chuan_dot_mat_bu_cap",
        4.5,
        "dt"
      ],
      [
        "suy_than_cap_clif_of",
        3.5,
        "dt"
      ],
      [
        "suy_gan_clif_of",
        3.5,
        "dt"
      ],
      [
        "suy_nao_clif_of",
        3.5,
        "dt"
      ],
      [
        "suy_dong_mau_clif_of",
        3.5,
        "dt"
      ],
      [
        "suy_tuan_hoan_clif_of",
        3.5,
        "dt"
      ],
      [
        "suy_ho_hap_clif_of",
        3.5,
        "dt"
      ],
      [
        "yeu_to_khoi_phat_hbv",
        2,
        "ht"
      ],
      [
        "nhiem_trung_khoi_phat",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "h_pylori",
    "ten": "Nhiễm Helicobacter pylori (H. pylori Infection)",
    "tenNgan": "Nhiễm H. pylori",
    "icd": "B98.0",
    "nhom": "Tiêu hóa",
    "baoDong": false,
    "ghiChuBaoDong": "Helicobacter pylori là vi khuẩn Gram âm vi hiếu khí, cư trú tại lớp nhầy niêm mạc dạ dày và là căn nguyên hàng đầu gây viêm dạ dày mạn, loét dạ dày - tá tràng, ...",
    "tomTat": "Helicobacter pylori là vi khuẩn Gram âm vi hiếu khí, cư trú tại lớp nhầy niêm mạc dạ dày và là căn nguyên hàng đầu gây viêm dạ dày mạn, loét dạ dày - tá tràng, MALT lymphoma và ung thư biểu mô dạ dày. Tại Việt Nam, tỷ lệ nhiễm trong cộng đồng dao động từ 30% đến 70%, đồng thời tình trạng đề kháng kháng sinh gia tăng nghiêm trọng (kháng Clarithromycin 81.3%, Levofloxacin 53.6%), đòi hỏi chiến lược chẩn đoán chính xác và phác đồ tiệt trừ cá thể hóa 14 ngày.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hp_mand_lab_confirmation",
        4.5,
        "dt"
      ],
      [
        "hp_major_epigastric_pain",
        3.5,
        "dt"
      ],
      [
        "hp_major_endoscopic_lesion",
        3.5,
        "dt"
      ],
      [
        "hp_lab_ubt",
        2,
        "ht"
      ],
      [
        "hp_lab_stool_ag",
        2,
        "ht"
      ],
      [
        "hp_lab_clo_test",
        2,
        "ht"
      ],
      [
        "hp_lab_pcr_ngs",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "hach_to_nguoilon_hivaids",
    "ten": "Hạch to ở người lớn trong bệnh cảnh HIV/AIDS (Lymphadenopathy in HIV/AIDS & Persistent Generalized Lymphadenopathy - PGL)",
    "tenNgan": "Hạch to HIV/AIDS",
    "icd": "R59.9",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Hạch to ở người nhiễm HIV/AIDS là biểu hiện lâm sàng đa dạng và phổ biến, có thể xuất hiện ở mọi giai đoạn của bệnh. Nguyên nhân hạch to được chia thành 3 nhóm ...",
    "tomTat": "Hạch to ở người nhiễm HIV/AIDS là biểu hiện lâm sàng đa dạng và phổ biến, có thể xuất hiện ở mọi giai đoạn của bệnh. Nguyên nhân hạch to được chia thành 3 nhóm chính: (1) Bệnh lý hạch toàn thân dai dẳng do HIV (Persistent Generalized Lymphadenopathy - PGL) ở Giai đoạn lâm sàng 1 (sưng hạch ≥ 2 vị trí ngoài bẹn kéo dài > 3 tháng không rõ nguyên nhân khác); (2) Các Nhiễm trùng cơ hội (NTCH) chiếm đa số các trường hợp hạch to có triệu chứng, đứng đầu là Lao hạch (M. tuberculosis), Nấm Talaromyces marneffei lan tỏa, Nấm Cryptococcus neoformans, Histoplasma capsulatum, Phức hợp Mycobacterium avium (MAC), Tụ cầu vàng (S. aureus), Giang mai và Nocardia; (3) Các bệnh lý ác tính liên quan đến HIV như U lympho Không Hodgkin (Non-Hodgkin Lymphoma - NHL) và Kaposi Sarcoma (KS). Ngoài ra, sự xuất hiện sưng hạch hóa mủ bùng phát sau khi điều trị ARV 2–12 tuần gợi ý Hội chứng Viêm phục hồi miễn dịch (IRIS).",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "lymphadenopathy_hiv_definition_and_cd4",
        4.5,
        "dt"
      ],
      [
        "pgl_evidence",
        3.5,
        "dt"
      ],
      [
        "tb_lymphadenitis_evidence",
        3.5,
        "dt"
      ],
      [
        "fungal_bacterial_lymphadenopathy",
        3.5,
        "dt"
      ],
      [
        "malignant_lymphadenopathy_biopsy",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "hiv",
    "ten": "Nhiễm HIV/AIDS (Human Immunodeficiency Virus / Acquired Immunodeficiency Syndrome)",
    "tenNgan": "HIV/AIDS",
    "icd": "B20",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Nhiễm vi rút suy giảm miễn dịch ở người (HIV) dẫn đến phá hủy tiến triển tế bào T-CD4, đưa đến hội chứng suy giảm miễn dịch mắc phải (AIDS). Bệnh nhân đối mặt v...",
    "tomTat": "Nhiễm vi rút suy giảm miễn dịch ở người (HIV) dẫn đến phá hủy tiến triển tế bào T-CD4, đưa đến hội chứng suy giảm miễn dịch mắc phải (AIDS). Bệnh nhân đối mặt với nguy cơ cao mắc các nhiễm trùng cơ hội đe dọa tính mạng (Lao, Viêm màng não Cryptococcus, PCP, Talaromycosis) và các khối u liên quan (Kaposi Sarcoma, Lymphoma). Điều trị bằng thuốc kháng vi rút (ARV) ngay khi chẩn đoán giúp ức chế tải lượng vi rút dưới ngưỡng phát hiện, phục hồi miễn dịch và đạt trạng thái K=K (Không phát hiện = Không lây truyền).",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hiv_gold_serology_or_pcr",
        4.5,
        "dt"
      ],
      [
        "hiv_cd4_count_quant",
        2,
        "ht"
      ],
      [
        "hiv_viral_load_quant",
        2,
        "ht"
      ],
      [
        "hiv_clinical_stage_3_4",
        3.5,
        "dt"
      ],
      [
        "hiv_risk_epidemiology",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "leptospira",
    "ten": "Nhiễm Leptospira (Leptospirosis / Bệnh Weil / Sốt xoắn trùng)",
    "tenNgan": "Leptospira",
    "icd": "A27",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Nhiễm Leptospira (Leptospirosis) là bệnh truyền nhiễm cấp tính do xoắn trùng Leptospira interrogans lây truyền từ động vật sang người qua nguồn nước, đất hoặc b...",
    "tomTat": "Nhiễm Leptospira (Leptospirosis) là bệnh truyền nhiễm cấp tính do xoắn trùng Leptospira interrogans lây truyền từ động vật sang người qua nguồn nước, đất hoặc bùn lầy bị nhiễm nước tiểu động vật mang mầm bệnh (đặc biệt là chuột, gia súc). Diễn tiến bệnh điển hình gồm 2 pha: pha nhiễm trùng huyết (N1–N7) sốt cao cấp tính, đau cơ bắp chân dữ dội, sung huyết kết mạc không mủ; và pha miễn dịch (N8–N14) có thể bùng phát tổn thương đa tạng nghiêm trọng. Thể nặng nhất là Hội chứng Weil (kết hợp suy thận cấp vô niệu, vàng da nhân và xuất huyết da niêm) cùng Hội chứng Xuất huyết phổi cấp (SPHS/ARDS) có tỷ lệ tử vong cao từ 10% đến hơn 50%. Chẩn đoán sớm và điều trị kháng sinh diệt căn nguyên ngay trong 7 ngày đầu là chìa khóa sống còn giúp cải thiện tiên lượng.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "lep_mandatory_fever_exposure",
        4.5,
        "dt"
      ],
      [
        "lep_major_calf_tenderness",
        3.5,
        "dt"
      ],
      [
        "lep_major_conjunctival_suffusion",
        3.5,
        "dt"
      ],
      [
        "lep_major_renal_jaundice",
        3.5,
        "dt"
      ],
      [
        "lep_minor_hemorrhage",
        2,
        "gy"
      ],
      [
        "lep_lab_mat_gold",
        2,
        "ht"
      ],
      [
        "lep_lab_pcr",
        2,
        "ht"
      ],
      [
        "lep_lab_igm_rapid",
        2,
        "ht"
      ],
      [
        "lep_imaging_chest",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "nt_cohoi",
    "ten": "Nhiễm trùng cơ hội trong bệnh cảnh HIV/AIDS (Opportunistic Infections in HIV/AIDS & Advanced HIV Disease - AHD)",
    "tenNgan": "NT cơ hội / HIV",
    "icd": "B20",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Nhiễm trùng cơ hội (NTCH) là nguyên nhân tử vong hàng đầu ở người nhiễm HIV tiến triển (CD4 < 200 cells/mm³ hoặc Giai đoạn lâm sàng 3, 4 theo WHO). Các tác nhân...",
    "tomTat": "Nhiễm trùng cơ hội (NTCH) là nguyên nhân tử vong hàng đầu ở người nhiễm HIV tiến triển (CD4 < 200 cells/mm³ hoặc Giai đoạn lâm sàng 3, 4 theo WHO). Các tác nhân NTCH phổ biến và nguy hiểm nhất tại Việt Nam bao gồm Vi khuẩn Lao (M. tuberculosis - 46.7%), Nấm Talaromyces marneffei (29.2%), Viêm phổi do Pneumocystis jirovecii (PCP - 20.5%), Cytomegalovirus (CMV - 10.3%), Viêm màng não do Cryptococcus neoformans (2.6%), Toxoplasma não (5.6%) và Phức hợp Mycobacterium avium (MAC - 1.0%). Việc áp dụng Gói can thiệp Bệnh HIV tiến triển (AHD Package) gồm Sàng lọc nhanh (LF-LAM, CrAg), Điều trị dự phòng (Co-trimoxazole, 3HP/6H, Fluconazole) và Khởi động ARV đúng thời điểm là chiến lược sống còn để giảm tỷ lệ tử vong.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "ahd_cd4_under_200_or_stage_3_4",
        4.5,
        "dt"
      ],
      [
        "oi_tb_evidence",
        3.5,
        "dt"
      ],
      [
        "oi_talaromycosis_evidence",
        3.5,
        "dt"
      ],
      [
        "oi_pcp_evidence",
        3.5,
        "dt"
      ],
      [
        "oi_cryptococcus_crag",
        2,
        "ht"
      ],
      [
        "oi_chest_imaging_patterns",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "nt_tieu_duoi",
    "ten": "Nhiễm trùng đường tiết niệu dưới / Viêm bàng quang cấp (Lower Urinary Tract Infection / Localized UTI / Acute Cystitis)",
    "tenNgan": "NTT dưới / Bàng quang",
    "icd": "N30.0",
    "nhom": "Tiết niệu",
    "baoDong": false,
    "ghiChuBaoDong": "Nhiễm trùng đường tiết niệu dưới (Lower UTI), điển hình là Viêm bàng quang cấp (Acute Cystitis), là tình trạng viêm vi trùng khu trú tại niêm mạc bàng quang và ...",
    "tomTat": "Nhiễm trùng đường tiết niệu dưới (Lower UTI), điển hình là Viêm bàng quang cấp (Acute Cystitis), là tình trạng viêm vi trùng khu trú tại niêm mạc bàng quang và niệu đạo mà không có biểu hiện xâm lấn mô nhu mô hay đáp ứng viêm toàn thân. Theo phân loại EAU Guidelines 2025/2026, bệnh được xếp vào nhóm Nhiễm trùng tiết niệu tại chỗ (Localized UTI), đặc trưng bởi tam chứng kích thích đường niệu dưới: tiểu buốt (dysuria), tiểu rắt/nhiều lần (frequency), tiểu gấp (urgency) và đau tức vùng trên xương mu (suprapubic pain), hoàn toàn KHÔNG có sốt, ớn lạnh hay đau hông lưng. Căn nguyên chính do Escherichia coli (75–95%). Chẩn đoán chủ yếu dựa vào lâm sàng và xét nghiệm que thử nước tiểu (bạch cầu niệu, nitrite); cấy nước tiểu chỉ chỉ định trong các trường hợp đặc biệt. Điều trị ưu tiên sử dụng kháng sinh niệu đầu tay (Nitrofurantoin, Fosfomycin trometamol, Pivmecillinam, Nitroxoline) hoặc liệu pháp phi kháng sinh (BNO 1045, D-mannose, Oestrogen đặt âm đạo); tuyệt đối tránh lạm dụng Fluoroquinolones và Aminopenicillins nhằm thực thi chương trình quản lý kháng sinh (Antimicrobial Stewardship) và hạn chế collateral damage.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "localized_uti_symptom_triad",
        4.5,
        "dt"
      ],
      [
        "localized_uti_pyuria_leukocyte",
        3.5,
        "dt"
      ],
      [
        "localized_uti_nitrite",
        3.5,
        "dt"
      ],
      [
        "localized_uti_urine_culture",
        2,
        "ht"
      ],
      [
        "localized_uti_no_vaginitis",
        4.5,
        "dt"
      ],
      [
        "localized_uti_ultrasound_normal",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "nt_tieu_tren",
    "ten": "Nhiễm trùng đường tiết niệu trên / Viêm thận bể thận cấp (Upper Urinary Tract Infection / Acute Pyelonephritis / Systemic UTI)",
    "tenNgan": "NTT trên / Bể thận",
    "icd": "N10",
    "nhom": "Tiết niệu",
    "baoDong": false,
    "ghiChuBaoDong": "Nhiễm trùng đường tiết niệu trên (Upper UTI), chủ yếu thể hiện dưới dạng Viêm thận bể thận cấp (Acute Pyelonephritis), là tình trạng vi khuẩn xâm nhập và gây vi...",
    "tomTat": "Nhiễm trùng đường tiết niệu trên (Upper UTI), chủ yếu thể hiện dưới dạng Viêm thận bể thận cấp (Acute Pyelonephritis), là tình trạng vi khuẩn xâm nhập và gây viêm nhiễm cấp tính ở nhu mô thận và hệ thống đài bể thận. Theo phân loại EAU 2025/2026, Upper UTI được xếp vào nhóm Nhiễm trùng tiết niệu toàn thân (Systemic UTI), đặc trưng bởi hội chứng nhiễm trùng toàn thân (sốt cao, ớn lạnh, mệt lả) kết hợp đau hông lưng/vùng góc sườn sống (CVA tenderness) và triệu chứng kích thích bàng quang. Căn nguyên hàng đầu là Escherichia coli (75–95%). Chẩn đoán xác định dựa vào tổng phân tích nước tiểu, cấy nước tiểu định lượng và chẩn đoán hình ảnh. Điều trị bắt buộc dùng kháng sinh có nồng độ cao trong nhu mô thận và huyết thanh (Fluoroquinolones, Cephalosporins thế hệ 3, Carbapenems); tuyệt đối chống chỉ định các thuốc chỉ đạt nồng độ niệu bàng quang như Nitrofurantoin, Fosfomycin đơn liều và Pivmecillinam.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "upper_uti_clinical_triad",
        4.5,
        "dt"
      ],
      [
        "upper_uti_pyuria_nitrite",
        3.5,
        "dt"
      ],
      [
        "upper_uti_urine_culture",
        3.5,
        "dt"
      ],
      [
        "upper_uti_inflammatory_markers",
        2,
        "ht"
      ],
      [
        "upper_uti_blood_culture",
        2,
        "ht"
      ],
      [
        "upper_uti_ultrasound",
        2,
        "ht"
      ],
      [
        "upper_uti_ct_scan",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "nt_tieuhoa",
    "ten": "Nhiễm trùng tiêu hóa (Infectious Gastroenteritis / Acute Infectious Diarrhea)",
    "tenNgan": "NT tiêu hóa",
    "icd": "A09",
    "nhom": "Tiêu hóa",
    "baoDong": false,
    "ghiChuBaoDong": "Nhiễm trùng tiêu hóa (viêm dạ dày ruột nhiễm trùng) là tình trạng nhiễm trùng cấp tính đường tiêu hóa do các tác nhân vi khuẩn (Salmonella, Shigella, Campylobac...",
    "tomTat": "Nhiễm trùng tiêu hóa (viêm dạ dày ruột nhiễm trùng) là tình trạng nhiễm trùng cấp tính đường tiêu hóa do các tác nhân vi khuẩn (Salmonella, Shigella, Campylobacter, E. coli, Vibrio cholerae, C. difficile), vi rút (Rotavirus, Norovirus) hoặc ký sinh trùng gây ra. Biểu hiện lâm sàng đặc trưng bao gồm tiêu chảy cấp (phân lỏng hoặc phân nước bất thường ≥ 3 lần/24h), đau quặn bụng, nôn ói, sốt và phân có thể có nhầy máu. Diễn tiến nguy hiểm nhất là tình trạng mất nước cấp, rối loạn điện giải, toan chuyển hóa và sốc giảm thể tích hoặc sốc nhiễm trùng. Can thiệp cốt lõi bao gồm bồi hoàn nước điện giải khẩn cấp bằng Oresol áp lực thẩm thấu giảm (ORS) hoặc dịch truyền tĩnh mạch, bổ sung kẽm/probiotic hỗ trợ, và chỉ định kháng sinh hợp lý khi có bằng chứng vi khuẩn xâm lấn hoặc độc tố.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "ntth_diarrhea_acute_loose",
        4.5,
        "dt"
      ],
      [
        "ntth_fever_cramps_vomiting",
        3.5,
        "dt"
      ],
      [
        "ntth_dysentery_bloody_stool",
        3.5,
        "dt"
      ],
      [
        "ntth_epi_exposure_history",
        3.5,
        "dt"
      ],
      [
        "ntth_lab_cbc_electrolytes",
        2,
        "ht"
      ],
      [
        "ntth_lab_stool_microbiology",
        2,
        "ht"
      ],
      [
        "ntth_lab_cdiff_toxin",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "sot_keodai_nguoilon_hivaids",
    "ten": "Sốt kéo dài ở người lớn trong bệnh cảnh HIV/AIDS (Fever of Unknown Origin in HIV/AIDS Patients)",
    "tenNgan": "Sốt kéo dài / HIV",
    "icd": "R50.9",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Sốt kéo dài (Fever of Unknown Origin - FUO) ở người lớn nhiễm HIV/AIDS được xác định khi nhiệt độ cơ thể ≥ 38.3°C (hoặc > 38.5°C) kéo dài trên 14 đến 21 ngày mà...",
    "tomTat": "Sốt kéo dài (Fever of Unknown Origin - FUO) ở người lớn nhiễm HIV/AIDS được xác định khi nhiệt độ cơ thể ≥ 38.3°C (hoặc > 38.5°C) kéo dài trên 14 đến 21 ngày mà chưa tìm được nguyên nhân sau các xét nghiệm cơ bản. Đây là thách thức lâm sàng phức tạp, phản ánh tình trạng suy giảm miễn dịch nặng (trung vị CD4 là 19 cells/mm³, 88.6% có CD4 < 100 cells/mm³). Căn nguyên nhiễm trùng cơ hội (NTCH) chiếm ưu thế tuyệt đối (93.3%), trong đó Lao (M. tuberculosis) là nguyên nhân hàng đầu (46.7%), tiếp theo là Nấm Talaromyces marneffei (29.2%), Viêm phổi PCP (20.5%), Viêm phổi vi khuẩn (11.3%), Nhiễm trùng huyết (10.3%), Cytomegalovirus (10.3%), Toxoplasma (5.6%), Cryptococcus (2.6%) và MAC (1.0%). Căn nguyên không nhiễm trùng chiếm 3.6% (Hội chứng thực bào máu HLH 2.1%, U lympho Non-Hodgkin 1.5%). Đáng chú ý, 46.2% bệnh nhân đồng nhiễm từ 2 đến 3 tác nhân cùng lúc.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "fuo_hiv_definition_and_cd4",
        4.5,
        "dt"
      ],
      [
        "fuo_tb_evidence",
        3.5,
        "dt"
      ],
      [
        "fuo_talaromyces_evidence",
        3.5,
        "dt"
      ],
      [
        "fuo_pcp_and_sepsis",
        3.5,
        "dt"
      ],
      [
        "fuo_cd4_under_50_quant",
        2,
        "ht"
      ],
      [
        "fuo_non_infectious_biopsy",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "sot_ret",
    "ten": "Sốt rét (Malaria)",
    "tenNgan": "Sốt rét",
    "icd": "B54",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh truyền nhiễm do ký sinh trùng Plasmodium (P. falciparum, P. vivax, P. malariae, P. ovale, P. knowlesi) gây nên, lây truyền chủ yếu qua muỗi Anopheles. Biểu...",
    "tomTat": "Bệnh truyền nhiễm do ký sinh trùng Plasmodium (P. falciparum, P. vivax, P. malariae, P. ovale, P. knowlesi) gây nên, lây truyền chủ yếu qua muỗi Anopheles. Biểu hiện lâm sàng đặc trưng là cơn sốt rét chu kỳ (rét run - sốt cao - vã mồ hôi). Sốt rét do P. falciparum hoặc nhiễm phối hợp có thể tiến triển nhanh thành Sốt rét ác tính gây tổn thương đa tạng (hôn mê, suy hô hấp, suy thận, sốc, thiếu máu nặng, toan chuyển hóa) với tỷ lệ tử vong rất cao nếu không được hồi sức cấp cứu và dùng thuốc đặc trị kịp thời.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "sot_ret_fever_epi",
        4.5,
        "dt"
      ],
      [
        "sot_ret_paroxysm",
        3.5,
        "dt"
      ],
      [
        "sot_ret_clinical_signs",
        3.5,
        "dt"
      ],
      [
        "sot_ret_lab_giemsa",
        2,
        "ht"
      ],
      [
        "sot_ret_lab_rdt",
        2,
        "ht"
      ],
      [
        "sot_ret_lab_pcr",
        2,
        "ht"
      ],
      [
        "sot_ret_lab_severe_cutoffs",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "sot_xuat_huyet_dengue",
    "ten": "Sốt xuất huyết Dengue",
    "tenNgan": "SXH Dengue",
    "icd": "A97",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Sốt xuất huyết Dengue (SXHD) là bệnh truyền nhiễm cấp tính do virus Dengue (4 typ huyết thanh DEN-1, DEN-2, DEN-3, DEN-4) gây nên qua trung gian muỗi vằn Aedes ...",
    "tomTat": "Sốt xuất huyết Dengue (SXHD) là bệnh truyền nhiễm cấp tính do virus Dengue (4 typ huyết thanh DEN-1, DEN-2, DEN-3, DEN-4) gây nên qua trung gian muỗi vằn Aedes aegypti. Bệnh khởi phát đột ngột và diễn biến qua 3 giai đoạn: giai đoạn sốt, giai đoạn nguy hiểm (thường từ ngày thứ 3 đến ngày thứ 7 của bệnh, đặc trưng bởi tình trạng tăng tính thấm thành mạch gây thoát huyết tương, cô đặc máu, giảm tiểu cầu) và giai đoạn hồi phục. Bệnh được phân làm 3 mức độ theo Quyết định 2760/QĐ-BYT (2023) của Bộ Y tế: Sốt xuất huyết Dengue, Sốt xuất huyết Dengue có dấu hiệu cảnh báo, và Sốt xuất huyết Dengue nặng.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_sot_cao_dot_ngot_duoi_7_ngay",
        4.5,
        "dt"
      ],
      [
        "tc_trieu_chung_lam_sang_sxhd",
        4,
        "dt"
      ],
      [
        "tc_can_lam_sang_dengue_ns1_pcr",
        4.5,
        "dt"
      ],
      [
        "tc_can_lam_sang_huyet_thanh_igm",
        3,
        "dt"
      ],
      [
        "tc_dau_hieu_canh_bao",
        4.8,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Ringer Lactate",
          "15-20 mL/kg/h truyền xả cấp cứu khi sốc, hạ dần 10-7.5-5-3 mL/kg/h",
          "Dịch tinh thể đẳng trương"
        ],
        [
          "Paracetamol",
          "10-15 mg/kg mỗi 4-6h (không quá 60mg/kg/ngày)",
          "Hạ sốt an toàn, CHỐNG CHỈ ĐỊNH Aspirin/NSAID"
        ],
        [
          "Dextran 40 / HES 130/0.4",
          "10-15 mL/kg/h",
          "Dịch cao phân tử khi sốc kéo dài hoặc Hct tiếp tục tăng sau bù dịch tinh thể"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "thuy_dau",
    "ten": "Bệnh Thủy đậu (Varicella / Chickenpox)",
    "tenNgan": "Thủy đậu",
    "icd": "B01",
    "nhom": "Truyền nhiễm",
    "baoDong": false,
    "ghiChuBaoDong": "Thủy đậu là bệnh truyền nhiễm cấp tính do Varicella Zoster Virus (VZV) thuộc họ Herpesviridae gây nên, lây truyền qua đường hô hấp hoặc tiếp xúc trực tiếp với d...",
    "tomTat": "Thủy đậu là bệnh truyền nhiễm cấp tính do Varicella Zoster Virus (VZV) thuộc họ Herpesviridae gây nên, lây truyền qua đường hô hấp hoặc tiếp xúc trực tiếp với dịch phỏng nước. Bệnh đặc trưng bởi sốt nhẹ/vừa, mệt mỏi và phát ban phỏng nước tiến triển qua nhiều lứa tuổi rải rác toàn thân. Mặc dù đa số lành tính ở trẻ em khỏe mạnh, bệnh có thể tiến triển nặng dạng xuất huyết, hoại tử mô hoặc gây biến chứng đe dọa tính mạng (viêm phổi, viêm não, nhiễm khuẩn huyết) ở người lớn, phụ nữ mang thai và bệnh nhân suy giảm miễn dịch.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_ban_phong_nuoc_nhieu_lua_tuoi",
        5,
        "dt"
      ],
      [
        "tc_yeu_to_dich_te_tiep_xuc_thuy_dau",
        3.5,
        "dt"
      ],
      [
        "tc_pcr_vzv_dich_not_phong_duong_tinh",
        4.5,
        "dt"
      ],
      [
        "tc_lam_tzanck_te_bao_khong_lo_da_nhan",
        3,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Acyclovir",
          "Người lớn 800mg x 5 lần/ngày uống trong 7 ngày (hoặc Valacyclovir 1000mg x 3 lần/ngày)",
          "Kháng virus đặc hiệu khởi đầu trong 24-72h đầu"
        ],
        [
          "Paracetamol",
          "500-1000mg mỗi 6h khi sốt đau",
          "Hạ sốt, tuyệt đối tránh Aspirin (Hội chứng Reye)"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "tieu_chay_man_nguoilon_hivaids",
    "ten": "Tiêu chảy mạn tính ở người lớn trong bệnh cảnh HIV/AIDS (Chronic Diarrhea in HIV/AIDS Patients)",
    "tenNgan": "Tiêu chảy mạn / HIV",
    "icd": "A09.9",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Tiêu chảy mạn tính ở người nhiễm HIV/AIDS được xác định khi đi phân lỏng hoặc nát ≥ 3 lần/ngày kéo dài trên 14 ngày (hoặc > 1 tháng theo phân loại Giai đoạn lâm...",
    "tomTat": "Tiêu chảy mạn tính ở người nhiễm HIV/AIDS được xác định khi đi phân lỏng hoặc nát ≥ 3 lần/ngày kéo dài trên 14 ngày (hoặc > 1 tháng theo phân loại Giai đoạn lâm sàng 3 & 4 của WHO). Đây là biểu hiện đường tiêu hóa phổ biến và nghiêm trọng, xuất hiện ở 40–80% bệnh nhân HIV tiến triển (đặc biệt khi CD4 < 100–200 cells/mm³). Căn nguyên rất đa dạng bao gồm: (1) Ký sinh trùng/Đơn bào: Cryptosporidium parvum, Cystoisospora belli (Isospora), Microsporidia, Giardia lamblia, Entamoeba histolytica, Strongyloides stercoralis; (2) Vi khuẩn: Salmonella spp., Shigella spp., Campylobacter jejuni, Clostridioides difficile, E. coli; (3) Mycobacteria: M. tuberculosis (Lao ruột/ổ bụng), Phức hợp Mycobacterium avium (MAC); (4) Vi rút: Cytomegalovirus (CMV đại tràng/dạ dày-ruột), Herpes simplex virus (HSV), Bệnh lý ruột do chính vi rút HIV (HIV Enteropathy); (5) Nấm & U ác tính: Talaromyces marneffei, Kaposi Sarcoma ruột, Non-Hodgkin Lymphoma ruột. Tiêu chảy mạn tính dẫn đến mất nước, rối loạn điện giải nặng (hạ Kali máu, hạ Magie máu), suy thận cấp trước thận và Hội chứng suy mòn do HIV (HIV Wasting Syndrome).",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "chronic_diarrhea_definition_and_hiv",
        4.5,
        "dt"
      ],
      [
        "protozoan_parasite_evidence",
        3.5,
        "dt"
      ],
      [
        "bacterial_mycobacterial_evidence",
        3.5,
        "dt"
      ],
      [
        "viral_fungal_neoplastic_evidence",
        3.5,
        "dt"
      ],
      [
        "cd4_under_100_quant",
        2,
        "ht"
      ],
      [
        "endoscopy_biopsy_evidence",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "vgsv_B",
    "ten": "Viêm gan vi rút B (Chronic / Acute Viral Hepatitis B)",
    "tenNgan": "Viêm gan B",
    "icd": "B18.1",
    "nhom": "Truyền nhiễm",
    "baoDong": false,
    "ghiChuBaoDong": "Viêm gan vi rút B là bệnh truyền nhiễm phổ biến toàn cầu do vi rút viêm gan B (HBV) gây ra, lây truyền qua đường máu, quan hệ tình dục và từ mẹ sang con. Bệnh d...",
    "tomTat": "Viêm gan vi rút B là bệnh truyền nhiễm phổ biến toàn cầu do vi rút viêm gan B (HBV) gây ra, lây truyền qua đường máu, quan hệ tình dục và từ mẹ sang con. Bệnh diễn tiến qua các giai đoạn từ nhiễm HBV mạn (dung nạp miễn dịch / thể không hoạt động) đến viêm gan B mạn hoạt động, xơ hóa gan tiến triển, xơ gan mất bù và ung thư biểu mô tế bào gan (HCC). Đợt bùng phát viêm gan B mạn hoặc viêm gan B thể tối cấp có nguy cơ suy gan nặng và tử vong cao.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hbv_hbsag_pos",
        4.5,
        "dt"
      ],
      [
        "hbv_dna_quant",
        2,
        "ht"
      ],
      [
        "hbv_alt_elevation",
        2,
        "ht"
      ],
      [
        "hbv_hbeag_status",
        2,
        "ht"
      ],
      [
        "hbv_fibroscan_f2",
        2,
        "ht"
      ],
      [
        "hbv_cirrhosis_f4",
        2,
        "ht"
      ],
      [
        "hbv_risk_factors",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "vgsv_C",
    "ten": "Viêm gan vi rút C (Chronic / Acute Viral Hepatitis C)",
    "tenNgan": "Viêm gan C",
    "icd": "B18.2",
    "nhom": "Truyền nhiễm",
    "baoDong": false,
    "ghiChuBaoDong": "Viêm gan vi rút C là bệnh truyền nhiễm do vi rút viêm gan C (HCV) gây ra, lây truyền chủ yếu qua đường máu, ngoài ra còn qua đường tình dục và từ mẹ sang con. B...",
    "tomTat": "Viêm gan vi rút C là bệnh truyền nhiễm do vi rút viêm gan C (HCV) gây ra, lây truyền chủ yếu qua đường máu, ngoài ra còn qua đường tình dục và từ mẹ sang con. Bệnh có đặc tính diễn tiến thầm lặng, với 70–80% trường hợp cấp tính chuyển thành mạn tính. Viêm gan C mạn tính gây tổn thương hoại tử tế bào gan kéo dài, tiến triển xơ hóa gan, xơ gan (còn bù và mất bù) cùng nguy cơ cao phát triển ung thư biểu mô tế bào gan (HCC). Hiện nay bệnh có thể chữa khỏi hoàn toàn bằng các phác đồ thuốc kháng vi rút tác động trực tiếp (DAA).",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hcv_anti_hcv_pos",
        4.5,
        "dt"
      ],
      [
        "hcv_active_infection",
        4.5,
        "dt"
      ],
      [
        "hcv_alt_elevation",
        2,
        "ht"
      ],
      [
        "hcv_fibroscan_apri",
        2,
        "ht"
      ],
      [
        "hcv_risk_exposure",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_phoi_benh_vien",
    "ten": "Viêm phổi bệnh viện & Viêm phổi liên quan đến thở máy (HAP / VAP)",
    "tenNgan": "VPBV / VAP",
    "icd": "J18.9",
    "nhom": "Hô hấp",
    "baoDong": true,
    "ghiChuBaoDong": "Viêm phổi bệnh viện (HAP) xuất hiện sau khi nhập viện ≥ 48 giờ và Viêm phổi liên quan đến thở máy (VAP) xuất hiện sau đặt ống nội khí quản ≥ 48 giờ. Đây là nhiễ...",
    "tomTat": "Viêm phổi bệnh viện (HAP) xuất hiện sau khi nhập viện ≥ 48 giờ và Viêm phổi liên quan đến thở máy (VAP) xuất hiện sau đặt ống nội khí quản ≥ 48 giờ. Đây là nhiễm khuẩn bệnh viện hàng đầu tại ICU với tỷ lệ tử vong cao từ 33 - 50%, chủ yếu do các chủng vi khuẩn Gram âm đa kháng (Acinetobacter baumannii, Pseudomonas aeruginosa, Klebsiella pneumoniae ESBL/CRE) và tụ cầu vàng kháng methicillin (MRSA). Chiến lược điều trị đòi hỏi khởi đầu kháng sinh kinh nghiệm phổ rộng liều tối ưu theo dược động học/dược lực học (PK/PD) trong 1 giờ đầu, phối hợp kháng sinh diệt khuẩn và điều chỉnh xuống thang sớm theo kết quả kháng sinh đồ.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hap_time_onset_48h",
        4.5,
        "dt"
      ],
      [
        "hap_radiology_new_infiltrate",
        4.5,
        "dt"
      ],
      [
        "hap_fever_thermal_instability",
        3.5,
        "dt"
      ],
      [
        "hap_purulent_sputum",
        3.5,
        "dt"
      ],
      [
        "hap_leukocytosis_leukopenia",
        2,
        "ht"
      ],
      [
        "hap_hypoxemia_pao2_fio2",
        2,
        "ht"
      ],
      [
        "hap_procalcitonin_elevated",
        2,
        "ht"
      ],
      [
        "hap_microbiology_culture_gold",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Amoxicillin/Clavulanate",
          "1000/62.5 mg x 2 viên uống 2 lần/ngày",
          "Ngoại trú không biến chứng"
        ],
        [
          "Ceftriaxone + Azithromycin",
          "Ceftriaxone 2g/ngày IV + Azithromycin 500mg/ngày IV/PO",
          "Nhập viện điều trị nội trú tiêu chuẩn"
        ],
        [
          "Piperacillin/Tazobactam + Vancomycin",
          "Pip/Tazo 4.5g q6h IV + Vancomycin 15-20mg/kg q8-12h TDM",
          "HAP/VAP nguy cơ nhiễm Pseudomonas & MRSA"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_phoi_cong_dong",
    "ten": "Viêm phổi mắc phải cộng đồng ở người lớn (Community-Acquired Pneumonia - CAP)",
    "tenNgan": "VPCD / CAP",
    "icd": "J18",
    "nhom": "Hô hấp",
    "baoDong": false,
    "ghiChuBaoDong": "Viêm phổi mắc phải cộng đồng (VPMPCĐ) là tình trạng nhiễm trùng cấp tính nhu mô phổi xảy ra ở ngoài bệnh viện. Bệnh khởi phát với sốt, ho khạc đờm mủ, đau ngực ...",
    "tomTat": "Viêm phổi mắc phải cộng đồng (VPMPCĐ) là tình trạng nhiễm trùng cấp tính nhu mô phổi xảy ra ở ngoài bệnh viện. Bệnh khởi phát với sốt, ho khạc đờm mủ, đau ngực màng phổi và hội chứng đông đặc phổi. Mức độ nặng biến thiên từ nhẹ điều trị ngoại trú đến rất nặng gây suy hô hấp cấp, sốc nhiễm khuẩn và tử vong.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "cap_mand_cxr_infiltrate",
        4.5,
        "dt"
      ],
      [
        "cap_maj_fever_cough",
        3.5,
        "dt"
      ],
      [
        "cap_maj_consolidation_signs",
        3.5,
        "dt"
      ],
      [
        "cap_lab_wbc_elevated",
        2,
        "ht"
      ],
      [
        "cap_lab_crp_pct_high",
        2,
        "ht"
      ],
      [
        "cap_imaging_multilobar",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Amoxicillin/Clavulanate",
          "1000/62.5 mg x 2 viên uống 2 lần/ngày",
          "Ngoại trú không biến chứng"
        ],
        [
          "Ceftriaxone + Azithromycin",
          "Ceftriaxone 2g/ngày IV + Azithromycin 500mg/ngày IV/PO",
          "Nhập viện điều trị nội trú tiêu chuẩn"
        ],
        [
          "Piperacillin/Tazobactam + Vancomycin",
          "Pip/Tazo 4.5g q6h IV + Vancomycin 15-20mg/kg q8-12h TDM",
          "HAP/VAP nguy cơ nhiễm Pseudomonas & MRSA"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_phoi_do_virus",
    "ten": "Viêm phổi do virus (Viral Pneumonia / Severe Viral Pneumonia - SVP)",
    "tenNgan": "VP do virus",
    "icd": "J12.9",
    "nhom": "Hô hấp",
    "baoDong": true,
    "ghiChuBaoDong": "Viêm phổi do virus là tình trạng nhiễm trùng cấp tính nhu mô phổi do các tác nhân vi rút đường hô hấp (Cúm A/B, RSV, SARS-CoV-2, Adenovirus, Parainfluenza, HMPV...",
    "tomTat": "Viêm phổi do virus là tình trạng nhiễm trùng cấp tính nhu mô phổi do các tác nhân vi rút đường hô hấp (Cúm A/B, RSV, SARS-CoV-2, Adenovirus, Parainfluenza, HMPV, Rhinovirus), đặc trưng bởi tổn thương phế nang - mô kẽ, thâm nhiễm dạng kính mờ/nốt lưới ngoại vi hai bên phổi và nguy cơ tiến triển nhanh thành Hội chứng suy hô hấp cấp tiến triển (ARDS), sốc nhiễm trùng và bội nhiễm vi khuẩn thứ phát. Bệnh lây truyền qua giọt bắn và không khí, có tỷ lệ tử vong cao ở người cao tuổi, trẻ em dưới 2 tuổi, thai phụ và bệnh nhân có bệnh nền mạn tính.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "vp_virus_time_onset",
        4.5,
        "dt"
      ],
      [
        "vp_virus_radiology_infiltrate",
        4.5,
        "dt"
      ],
      [
        "vp_virus_fever_chills",
        3.5,
        "dt"
      ],
      [
        "vp_virus_hypoxemia",
        3.5,
        "dt"
      ],
      [
        "vp_virus_leukocytes_normal_low",
        2,
        "ht"
      ],
      [
        "vp_virus_pcr_gold",
        2,
        "ht"
      ],
      [
        "vp_virus_procalcitonin_low",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Amoxicillin/Clavulanate",
          "1000/62.5 mg x 2 viên uống 2 lần/ngày",
          "Ngoại trú không biến chứng"
        ],
        [
          "Ceftriaxone + Azithromycin",
          "Ceftriaxone 2g/ngày IV + Azithromycin 500mg/ngày IV/PO",
          "Nhập viện điều trị nội trú tiêu chuẩn"
        ],
        [
          "Piperacillin/Tazobactam + Vancomycin",
          "Pip/Tazo 4.5g q6h IV + Vancomycin 15-20mg/kg q8-12h TDM",
          "HAP/VAP nguy cơ nhiễm Pseudomonas & MRSA"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "vmn_nam",
    "ten": "Viêm màng não do nấm (Fungal Meningitis / Cryptococcal Meningitis)",
    "tenNgan": "VMN nấm",
    "icd": "G02.1",
    "nhom": "Thần kinh",
    "baoDong": false,
    "ghiChuBaoDong": "Viêm màng não do nấm (Fungal Meningitis) là tình trạng nhiễm trùng tiến triển bán cấp hoặc mạn tính nguy hiểm tính mạng của màng não và khoang dưới nhện, gây ra...",
    "tomTat": "Viêm màng não do nấm (Fungal Meningitis) là tình trạng nhiễm trùng tiến triển bán cấp hoặc mạn tính nguy hiểm tính mạng của màng não và khoang dưới nhện, gây ra bởi các loài nấm cơ hội hoặc nấm lưỡng hình. Căn nguyên hàng đầu toàn cầu là Cryptococcus neoformans (chiếm > 80-90% trường hợp, đặc biệt ở bệnh nhân nhiễm HIV/AIDS có CD4 < 100 tế bào/mm3) và Cryptococcus gattii (thường gặp ở người không nhiễm HIV/miễn dịch bình thường). Các căn nguyên nấm khác bao gồm Candida spp. (gặp sau phẫu thuật thần kinh, đặt dẫn lưu não thất EVD), Aspergillus spp., Histoplasma capsulatum, Coccidioides spp. và Exserohilum. Bệnh diễn tiến âm thầm từ vài ngày đến nhiều tuần với triệu chứng hội chứng màng não không điển hình (đau đầu dai dẳng tăng dần, sốt nhẹ hoặc không sốt, cổ cứng mức độ vừa) kèm theo các dấu hiệu tăng áp lực nội sọ nặng (nôn vọt, nhìn đôi do liệt dây VI, giảm thị lực, lơ mơ). Chẩn đoán xác định dựa trên biến đổi DNT (áp lực mở tăng rất cao > 200-300 mmH2O, DNT trong hoặc vàng chanh, tăng nhẹ bạch cầu ưu thế Lympho, Glucose DNT giảm dốc < 2.2 mmol/L, Protein tăng) phối hợp test nhanh kháng nguyên nấm Cryptococcus (CrAg LFA), nhuộm mực tàu, cấy DNT hoặc xét nghiệm 1,3-beta-D-glucan. Điều trị tuân thủ nghiêm ngặt 3 giai đoạn (Tấn công - Củng cố - Duy trì) với phác đồ phối hợp Liposomal Amphotericin B, Flucytosine và Fluconazole, kết hợp bắt buộc xả DNT giải áp hàng ngày để kiểm soát áp lực nội sọ.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "vmn_nam_lam_sang_ho_chung_mang_nao",
        4.5,
        "dt"
      ],
      [
        "vmn_nam_lam_sang_co_dia_nguy_co",
        3.5,
        "dt"
      ],
      [
        "vmn_nam_dnt_bien_doi",
        3.5,
        "dt"
      ],
      [
        "vmn_nam_cls_crag_lfa_gold",
        2,
        "ht"
      ],
      [
        "vmn_nam_cls_nhuom_muc_tau_cay",
        2,
        "ht"
      ],
      [
        "vmn_nam_hinh_anh_mri_so_nao",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "vmn_sv",
    "ten": "Viêm màng não do vi rút (Viral Meningitis / Aseptic Meningitis)",
    "tenNgan": "VMN virus",
    "icd": "A87",
    "nhom": "Thần kinh",
    "baoDong": false,
    "ghiChuBaoDong": "Viêm màng não do vi rút (Viral Meningitis hoặc Aseptic Meningitis) là tình trạng nhiễm trùng cấp tính màng não do các vi rút hướng thần kinh gây ra, đặc trưng b...",
    "tomTat": "Viêm màng não do vi rút (Viral Meningitis hoặc Aseptic Meningitis) là tình trạng nhiễm trùng cấp tính màng não do các vi rút hướng thần kinh gây ra, đặc trưng bởi sự xâm nhập của bạch cầu đơn nhân (Lymphocyte) vào khoang dưới nhện. Nguyên nhân phổ biến nhất là các vi rút Enteroviruses (Coxsackievirus, Echovirus, Parechovirus, chiếm 40-80% các trường hợp xác định căn nguyên), tiếp theo là Herpes simplex virus type 2 (HSV-2, nguyên nhân hàng đầu ở người trẻ và phụ nữ), Varicella-zoster virus (VZV, phổ biến ở người cao tuổi hoặc suy giảm miễn dịch), Arboviruses (Dengue, West Nile, TBEV), EBV, CMV, Mumps và HIV giai đoạn sơ nhiễm. Bệnh biểu hiện bằng tam chứng màng não cấp tính (sốt, đau đầu dữ dội, cứng gáy, sợ ánh sáng/nhạy cảm âm thanh), nhưng tri giác thường tỉnh táo (GCS 15) và ít khi có dấu thần kinh khu trú. Chẩn đoán xác định dựa trên biến đổi dịch tễ, lâm sàng và chẩn đoán cận lâm sàng qua chọc dò tủy sống (DNT trong, tăng bạch cầu mức độ vừa ưu thế Lympho, glucose DNT bình thường, protein tăng nhẹ và lactate DNT bình thường) kết hợp xét nghiệm sinh học phân tử Real-time PCR DNT (đơn mồi hoặc đa mồi BioFire ME Panel). Diễn tiến bệnh phần lớn lành tính, tự giới hạn; điều trị cốt lõi là bù dịch, hạ sốt, giảm đau và ngừng ngay kháng sinh/Corticoid không cần thiết, kết hợp Acyclovir tĩnh mạch đặc hiệu cho các trường hợp do HSV-1/2, VZV hoặc bệnh nhân suy giảm miễn dịch.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "vmn_vr_lam_sang_tam_chung",
        4.5,
        "dt"
      ],
      [
        "vmn_vr_lam_sang_tien_trieu",
        3.5,
        "dt"
      ],
      [
        "vmn_vr_dnt_thiet_yeu",
        3.5,
        "dt"
      ],
      [
        "vmn_vr_cls_pcr_gold",
        2,
        "ht"
      ],
      [
        "vmn_vr_cls_serology_pcr",
        2,
        "ht"
      ],
      [
        "vmn_vr_hinh_anh_hoc_mri",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "vmn_vk",
    "ten": "Viêm màng não do vi khuẩn (Acute Bacterial Meningitis - ABM)",
    "tenNgan": "VMN vi khuẩn",
    "icd": "G00",
    "nhom": "Thần kinh",
    "baoDong": true,
    "ghiChuBaoDong": "Viêm màng não do vi khuẩn (Acute Bacterial Meningitis - ABM) là tình trạng nhiễm trùng cấp tính tính mạng của màng nhện, khoang dưới nhện và màng mềm bao bọc nã...",
    "tomTat": "Viêm màng não do vi khuẩn (Acute Bacterial Meningitis - ABM) là tình trạng nhiễm trùng cấp tính tính mạng của màng nhện, khoang dưới nhện và màng mềm bao bọc não bộ và tủy sống, đòi hỏi cấp cứu y khoa trì hoãn điều trị dẫn đến tử vong hoặc di chứng nặng nề. Bệnh biểu hiện kinh điển bằng hội chứng màng não cấp tính (sốt, đau đầu dữ dội, cứng gáy, rối loạn tri giác), tiến triển nhanh tới tăng áp lực nội sọ, tụt kẹt não, co giật và sốc nhiễm khuẩn. Nguyên nhân thường gặp nhất ở người lớn và trẻ em trên 1 tháng tuổi là Streptococcus pneumoniae (Phế cầu), Neisseria meningitidis (Não mô cầu), Haemophilus influenzae type b và Listeria monocytogenes. Chẩn đoán dựa trên biến đổi dịch tễ, lâm sàng và chẩn đoán xác định qua chọc dò tủy sống (DNT đục, tăng bạch cầu đa nhân trung tính, protein tăng cao, glucose giảm dốc) kết hợp nuôi cấy/PCR vi sinh. Can thiệp cốt lõi là dùng kháng sinh tĩnh mạch phổ rộng liều cao trong vòng 1 giờ vàng kể từ khi tiếp nhận phối hợp Dexamethasone sớm.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "vmn_vk_lam_sang_ho_chung_mang_nao",
        4.5,
        "dt"
      ],
      [
        "vmn_vk_lam_sang_ban_xuat_huyet",
        3.5,
        "dt"
      ],
      [
        "vmn_vk_dnt_bien_doi",
        3.5,
        "dt"
      ],
      [
        "vmn_vk_cls_dinh_luong_lactate",
        2,
        "ht"
      ],
      [
        "vmn_vk_cls_vi_sinh_gold",
        2,
        "ht"
      ],
      [
        "vmn_vk_hinh_anh_hoc_ct",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "xo_gan_con_bu",
    "ten": "Xơ gan còn bù (Compensated Cirrhosis)",
    "tenNgan": "Xơ gan còn bù",
    "icd": "K74.6",
    "nhom": "Tiêu hóa",
    "baoDong": false,
    "ghiChuBaoDong": "Xơ gan còn bù (Compensated Cirrhosis) là giai đoạn xơ gan tiến triển (Metavir F4) nhưng chức năng tổng hợp và chuyển hóa của gan còn được bảo tồn tốt, chưa xuất...",
    "tomTat": "Xơ gan còn bù (Compensated Cirrhosis) là giai đoạn xơ gan tiến triển (Metavir F4) nhưng chức năng tổng hợp và chuyển hóa của gan còn được bảo tồn tốt, chưa xuất hiện các biến cố mất bù nặng trên lâm sàng như cổ trướng, xuất huyết do vỡ giãn tĩnh mạch thực quản - dạ dày, bệnh脑 gan hay vàng da nặng. Chẩn đoán xác định dựa trên kết hợp các phương pháp không xâm lấn (FibroScan ≥ 12.5 kPa, APRI > 1.0, FIB-4 > 3.25) hoặc sinh thiết gan F4, kèm điểm phân loại Child-Pugh A (5 - 6 điểm). Mục tiêu điều trị cốt lõi là kiểm soát triệt để nguyên nhân gốc rễ (dùng NAs cho HBV, DAA cho HCV, ngưng rượu 100%), kiểm soát tăng áp lực tĩnh mạch cửa có ý nghĩa lâm sàng (CSPH) bằng thuốc chẹn beta không chọn lọc (Carvedilol), và tầm soát định kỳ ung thư biểu mô tế bào gan (HCC) mỗi 6 tháng để ngăn ngừa chuyển sang xơ gan mất bù.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tieu_chuan_xo_hoa_f4_khong_xam_lan",
        4.5,
        "dt"
      ],
      [
        "tieu_chuan_child_pugh_a",
        4.5,
        "dt"
      ],
      [
        "tieu_chuan_khong_bien_co_mat_bu",
        3.5,
        "dt"
      ],
      [
        "tieu_chuan_tang_ap_cua_csph",
        3.5,
        "dt"
      ],
      [
        "tieu_chuan_sieu_am_doppler_gan",
        2,
        "ht"
      ],
      [
        "tieu_chuan_noi_soi_tmeq",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Spironolactone",
          "100 mg/ngày uống buổi sáng, phối hợp Furosemide",
          "Kháng Aldosterone điều trị cổ trướng"
        ],
        [
          "Furosemide",
          "40 mg/ngày uống (duy trì tỷ lệ Spironolactone : Furosemide = 100 : 40)",
          "Lợi tiểu quai phối hợp"
        ],
        [
          "Octreotide / Terlipressin",
          "Octreotide bolus 50 µg rồi truyền 50 µg/h",
          "Giảm áp lực tĩnh mạch cửa khi xuất huyết tiêu hóa do vỡ giãn TMTQ"
        ],
        [
          "Ceftriaxone",
          "1g/ngày IV trong 5-7 ngày",
          "Dự phòng nhiễm trùng dịch báng (SBP) ở bệnh nhân XHTH"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "xo_gan_mat_bu",
    "ten": "Xơ gan mất bù (Decompensated Cirrhosis)",
    "tenNgan": "Xơ gan mất bù",
    "icd": "K74.6",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Xơ gan mất bù (Decompensated Cirrhosis) là giai đoạn tiến triển muộn nguy kịch của bệnh gan mạn tính, đặc trưng bởi sự xuất hiện rầm rộ của ít nhất 01 biến cố m...",
    "tomTat": "Xơ gan mất bù (Decompensated Cirrhosis) là giai đoạn tiến triển muộn nguy kịch của bệnh gan mạn tính, đặc trưng bởi sự xuất hiện rầm rộ của ít nhất 01 biến cố mất bù trên lâm sàng: Cổ trướng (phổ biến nhất, chiếm 50-60%), Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản - dạ dày, Bệnh não gan hoặc Vàng da nặng. Bệnh phản ánh tình trạng suy giảm nghiêm trọng chức năng tổng hợp/chuyển hóa của gan (Child-Pugh B/C, MELD > 15) kết hợp với Tăng áp lực tĩnh mạch cửa có ý nghĩa lâm sàng nặng (CSPH, HVPG ≥ 10 mmHg) và phản ứng viêm hệ thống mạn tính. Xơ gan mất bù làm giảm đáng kể thời gian sống còn (tỷ lệ tử vong 1 năm tới 20-40%), đòi hỏi phải nhập viện điều trị tích cực, khống chế biến chứng khẩn cấp, bù Albumin, điều trị nguyên nhân gốc rễ để hướng tới phục hồi chức năng gan (Recompensation) hoặc chuẩn bị ghép gan.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tieu_chuan_nen_xo_gan_f4",
        4.5,
        "dt"
      ],
      [
        "tieu_chuan_xuat_hien_bien_co_mat_bu",
        4.5,
        "dt"
      ],
      [
        "tieu_chuan_suy_gan_child_pugh_bc",
        3.5,
        "dt"
      ],
      [
        "tieu_chuan_tang_ap_cua_csph_nang",
        3.5,
        "dt"
      ],
      [
        "tieu_chuan_dich_co_truong_saag_cao",
        2,
        "ht"
      ],
      [
        "tieu_chuan_sieu_am_doppler_mat_bu",
        2,
        "ht"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Spironolactone",
          "100 mg/ngày uống buổi sáng, phối hợp Furosemide",
          "Kháng Aldosterone điều trị cổ trướng"
        ],
        [
          "Furosemide",
          "40 mg/ngày uống (duy trì tỷ lệ Spironolactone : Furosemide = 100 : 40)",
          "Lợi tiểu quai phối hợp"
        ],
        [
          "Octreotide / Terlipressin",
          "Octreotide bolus 50 µg rồi truyền 50 µg/h",
          "Giảm áp lực tĩnh mạch cửa khi xuất huyết tiêu hóa do vỡ giãn TMTQ"
        ],
        [
          "Ceftriaxone",
          "1g/ngày IV trong 5-7 ngày",
          "Dự phòng nhiễm trùng dịch báng (SBP) ở bệnh nhân XHTH"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "phan_ve",
    "ten": "Phản vệ",
    "tenNgan": "Phản vệ",
    "icd": "T78.2",
    "nhom": "Da niêm",
    "baoDong": true,
    "ghiChuBaoDong": "Phản vệ là một phản ứng dị ứng cấp tính, có thể xuất hiện ngay lập tức từ vài giây, vài phút đến vài giờ sau khi cơ thể tiếp xúc với dị nguyên, gây ra các bệnh ...",
    "tomTat": "Phản vệ là một phản ứng dị ứng cấp tính, có thể xuất hiện ngay lập tức từ vài giây, vài phút đến vài giờ sau khi cơ thể tiếp xúc với dị nguyên, gây ra các bệnh cảnh lâm sàng đa dạng và có thể nghiêm trọng dẫn đến tử vong nhanh chóng. Sốc phản vệ là mức độ nặng nhất của phản vệ do đột ngột giãn toàn bộ hệ thống mạch và co thắt phế quản.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_goi_y_phan_ve",
        5,
        "dt"
      ],
      [
        "tc_benh_canh_1",
        5,
        "dt"
      ],
      [
        "tc_benh_canh_2",
        4.5,
        "dt"
      ],
      [
        "tc_benh_canh_3",
        5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Adrenaline (Epinephrine) 1mg/1ml",
          "Tiêm bắp mặt trước ngoài đùi ngay lập tức: Người lớn 1/2 ống (0.5ml), trẻ em 1/5 - 1/3 ống",
          "Thuốc cấp cứu hàng đầu, tiêm bắp STAT không chần chừ"
        ],
        [
          "Methylprednisolone",
          "1-2 mg/kg IV hoặc Diphenhydramine 25-50mg IV",
          "Dự phòng phản vệ pha 2 muộn (sau khi đã tiêm Adrenaline)"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_gan_cap_do_thuoc_khang_lao",
    "ten": "Viêm gan cấp do thuốc kháng lao",
    "tenNgan": "Viêm gan do thuốc lao",
    "icd": "K71.6",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Viêm gan cấp do thuốc kháng lao (Anti-TB Drug-Induced Liver Injury - ATLI/DILI) là biến cố bất lợi nghiêm trọng hàng đầu do các thuốc lao hàng 1 (đặc biệt là Is...",
    "tomTat": "Viêm gan cấp do thuốc kháng lao (Anti-TB Drug-Induced Liver Injury - ATLI/DILI) là biến cố bất lợi nghiêm trọng hàng đầu do các thuốc lao hàng 1 (đặc biệt là Isoniazid, Rifampicin, Pyrazinamide) gây ra. Cơ chế tổn thương do hoại tử tế bào gan trực tiếp hoặc do phản ứng chuyển hóa qua trung gian miễn dịch. Bệnh diễn tiến đa dạng từ tăng men gan thoáng qua không triệu chứng đến viêm gan cấp, vàng da ứ mật và suy gan cấp nguy hiểm tính mạng.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_phoi_nhiem_thuoc_lao",
        5,
        "dt"
      ],
      [
        "tc_tang_men_gan_truc_tiep",
        5,
        "dt"
      ],
      [
        "tc_tang_bilirubin_mau",
        4.5,
        "dt"
      ],
      [
        "tc_trieu_chung_nhiem_doc_gan",
        4,
        "dt"
      ],
      [
        "tc_roi_loan_dong_mau_suy_gan",
        4.5,
        "dt"
      ],
      [
        "tc_loai_tru_viem_gan_khac",
        3,
        "loaitru"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_gan_sieu_vi_b",
    "ten": "Viêm gan vi rút B cấp",
    "tenNgan": "VGB cấp",
    "icd": "B16",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Viêm gan vi rút B cấp là tình trạng nhiễm mới vi rút viêm gan B (HBV) diễn tiến dưới 6 tháng. Đa số người trưởng thành (> 90-95%) có thể tự hồi phục và thanh th...",
    "tomTat": "Viêm gan vi rút B cấp là tình trạng nhiễm mới vi rút viêm gan B (HBV) diễn tiến dưới 6 tháng. Đa số người trưởng thành (> 90-95%) có thể tự hồi phục và thanh thải HBsAg hoàn toàn. Tuy nhiên, một số trường hợp có thể diễn tiến nặng (suy gan cấp, bệnh não gan, INR > 1.5, Bilirubin > 3 mg/dL) hoặc thể tối cấp với tỷ lệ tử vong rất cao (> 70%), đòi hỏi phải khởi động thuốc kháng vi rút (NAs) kịp thời hoặc hội chẩn ghép gan.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_anti_hbc_igm_duong_tinh",
        5,
        "dt"
      ],
      [
        "tc_hbsag_duong_tinh",
        4.5,
        "dt"
      ],
      [
        "tc_men_gan_ast_alt_tang_cao",
        4,
        "dt"
      ],
      [
        "tc_tien_su_phoi_nhiem_hbv",
        3.5,
        "dt"
      ],
      [
        "tc_hoi_chung_viem_gan_cap",
        3,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_gan_sieu_vi_c",
    "ten": "Viêm gan vi rút C",
    "tenNgan": "VGC",
    "icd": "B18.2",
    "nhom": "Truyền nhiễm",
    "baoDong": false,
    "ghiChuBaoDong": "Viêm gan vi rút C là bệnh truyền nhiễm do vi rút viêm gan C (HCV - cấu trúc sợi đơn RNA thuộc họ Flaviviridae, gồm 6 kiểu gen) gây ra, lây truyền chủ yếu qua đư...",
    "tomTat": "Viêm gan vi rút C là bệnh truyền nhiễm do vi rút viêm gan C (HCV - cấu trúc sợi đơn RNA thuộc họ Flaviviridae, gồm 6 kiểu gen) gây ra, lây truyền chủ yếu qua đường máu, ngoài ra còn lây qua đường tình dục và từ mẹ sang con [4]. Tại Việt Nam, kiểu gen 1 và 6 phổ biến nhất [4]. Phần lớn người nhiễm không có triệu chứng lâm sàng rầm rộ cho đến khi tiến triển thành xơ gan hoặc ung thư biểu mô tế bào gan (HCC) [5]. Mục tiêu điều trị cốt lõi là loại trừ vi rút ra khỏi cơ thể, đạt đáp ứng vi rút bền vững ở tuần thứ 12 sau khi kết thúc điều trị (SVR12) bằng các phác đồ kháng vi rút trực tiếp (DAA) [6].",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_anti_hcv_duong_tinh",
        5,
        "dt"
      ],
      [
        "tc_hcv_rna_duong_tinh",
        5,
        "dt"
      ],
      [
        "tc_hcvcag_duong_tinh",
        4.5,
        "dt"
      ],
      [
        "tc_chuyen_dao_huyet_thanh_anti_hcv",
        4,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Điều trị căn nguyên đặc hiệu",
          "Theo kháng sinh đồ hoặc phác đồ hướng dẫn chuyên khoa",
          "Bậc 1"
        ],
        [
          "Điều trị hỗ trợ & triệu chứng",
          "Bù nước điện giải, hạ sốt giảm đau, cân bằng toan kiềm",
          "Bậc 2"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "xo_gan",
    "ten": "Xơ gan & Tăng áp lực tĩnh mạch cửa",
    "tenNgan": "Xơ gan / Tăng áp cửa",
    "icd": "K74.6",
    "nhom": "Tiêu hóa",
    "baoDong": false,
    "ghiChuBaoDong": "Xơ gan là giai đoạn tiến triển muộn của xơ hóa gan lan rộng dẫn đến đảo lộn cấu trúc nhu mô gan và hình thành các nốt tái tạo. Xơ gan còn bù (Compensated Advanc...",
    "tomTat": "Xơ gan là giai đoạn tiến triển muộn của xơ hóa gan lan rộng dẫn đến đảo lộn cấu trúc nhu mô gan và hình thành các nốt tái tạo. Xơ gan còn bù (Compensated Advanced Chronic Liver Disease - cACLD) theo đồng thuận Baveno VI/VII là giai đoạn người bệnh chưa xuất hiện các biến chứng mất bù lâm sàng (cổ trướng, xuất huyết do vỡ giãn tĩnh mạch thực quản, bệnh não gan, vàng da). Việc phân tầng tiến triển lâm sàng ở xơ gan còn bù dựa trên sự có mặt của Tăng áp lực tĩnh mạch cửa có ý nghĩa lâm sàng (CSPH) và Giãn tĩnh mạch thực quản (GEV): Giai đoạn 1 (Không GEV, không cổ trướng) và Giai đoạn 2 (Có GEV, không cổ trướng, chưa từng xuất huyết).",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "tc_xac_nhan_xo_gan_f4",
        5,
        "dt"
      ],
      [
        "tc_chi_so_sinh_hoa_khong_xam_lan",
        4,
        "dt"
      ],
      [
        "tc_hinh_anh_hoc_tang_ap_cua",
        4,
        "dt"
      ],
      [
        "tc_noi_soi_tam_soat_gev",
        4,
        "dt"
      ],
      [
        "tc_chuc_nang_gan_child_pugh_a",
        3,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến y tế ban đầu (Trạm y tế / Phòng khám)",
        "Bệnh viện Quận/Huyện (Hạng 2-3)",
        "Bệnh viện Tỉnh / Trung ương (Hạng 1-ĐB)"
      ],
      "thuoc": [
        [
          "Spironolactone",
          "100 mg/ngày uống buổi sáng, phối hợp Furosemide",
          "Kháng Aldosterone điều trị cổ trướng"
        ],
        [
          "Furosemide",
          "40 mg/ngày uống (duy trì tỷ lệ Spironolactone : Furosemide = 100 : 40)",
          "Lợi tiểu quai phối hợp"
        ],
        [
          "Octreotide / Terlipressin",
          "Octreotide bolus 50 µg rồi truyền 50 µg/h",
          "Giảm áp lực tĩnh mạch cửa khi xuất huyết tiêu hóa do vỡ giãn TMTQ"
        ],
        [
          "Ceftriaxone",
          "1g/ngày IV trong 5-7 ngày",
          "Dự phòng nhiễm trùng dịch báng (SBP) ở bệnh nhân XHTH"
        ]
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu mỗi 2-4h",
        "Theo dõi tri giác và lượng nước tiểu"
      ],
      "luuY": [
        "Tuân thủ nghiêm ngặt phác đồ Bộ Y Tế, theo dõi sát sinh hiệu và báo động đỏ."
      ],
      "nguon": [
        "Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_phoi",
    "ten": "Viêm Phổi Mắc Phải Cộng Đồng (CAP)",
    "tenNgan": "VPCD / CAP",
    "icd": "J18.9",
    "nhom": "Hô hấp",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Hô Hấp / Nhiễm Khuẩn.",
    "tomTat": "Viêm Phổi Mắc Phải Cộng Đồng (CAP) — Mã ICD-10: J18.9. Chuyên khoa Hô Hấp / Nhiễm Khuẩn.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "cap_img",
        3.5,
        "dt"
      ],
      [
        "cap_fever",
        3.5,
        "dt"
      ],
      [
        "cap_cough",
        3.5,
        "dt"
      ],
      [
        "cap_rales",
        3.5,
        "dt"
      ],
      [
        "cap_leuko",
        3.5,
        "dt"
      ],
      [
        "cap_crp",
        3.5,
        "dt"
      ],
      [
        "cap_hypox",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "thuyen_tac_phoi",
    "ten": "Thuyên Tắc Động Mạch Phổi Cấp (PE)",
    "tenNgan": "Thuyên tắc phổi",
    "icd": "I26.9",
    "nhom": "Tim mạch",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tim Mạch / Cấp Cứu / Hồi Sức.",
    "tomTat": "Thuyên Tắc Động Mạch Phổi Cấp (PE) — Mã ICD-10: I26.9. Chuyên khoa Tim Mạch / Cấp Cứu / Hồi Sức.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "pe_ctpa_or_ddimer",
        3.5,
        "dt"
      ],
      [
        "pe_dyspnea",
        3.5,
        "dt"
      ],
      [
        "pe_pleuritic_pain",
        3.5,
        "dt"
      ],
      [
        "pe_dvt_signs",
        3.5,
        "dt"
      ],
      [
        "pe_tachycardia",
        3.5,
        "dt"
      ],
      [
        "pe_hemoptysis",
        3.5,
        "dt"
      ],
      [
        "pe_ecg_s1q3t3",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "suy_than",
    "ten": "Tổn Thương Thận Cấp (AKI) / Bệnh Thận Mạn (CKD)",
    "tenNgan": "AKI / CKD",
    "icd": "N18.9",
    "nhom": "Tiết niệu",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Thận - Lọc Máu.",
    "tomTat": "Tổn Thương Thận Cấp (AKI) / Bệnh Thận Mạn (CKD) — Mã ICD-10: N18.9. Chuyên khoa Thận - Lọc Máu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "kdigo_creat_or_egfr",
        3.5,
        "dt"
      ],
      [
        "aki_oliguria",
        3.5,
        "dt"
      ],
      [
        "ckd_uacr",
        3.5,
        "dt"
      ],
      [
        "ckd_us_atrophy",
        3.5,
        "dt"
      ],
      [
        "aki_electrolyte",
        3.5,
        "dt"
      ],
      [
        "ckd_anemia",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_tuy_cap",
    "ten": "Viêm Tụy Cấp (Acute Pancreatitis)",
    "tenNgan": "Viêm tụy cấp",
    "icd": "K85.9",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tiêu Hóa - Cấp Cứu.",
    "tomTat": "Viêm Tụy Cấp (Acute Pancreatitis) — Mã ICD-10: K85.9. Chuyên khoa Tiêu Hóa - Cấp Cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "ap_pain",
        3.5,
        "dt"
      ],
      [
        "ap_enzymes",
        3.5,
        "dt"
      ],
      [
        "ap_imaging",
        3.5,
        "dt"
      ],
      [
        "ap_etiology_stone",
        3.5,
        "dt"
      ],
      [
        "ap_etiology_triglyceride",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "dai_thao_duong",
    "ten": "Đái Tháo Đường Típ 2 / Típ 1 & Biến Chứng Cấp",
    "tenNgan": "Đái tháo đường",
    "icd": "E11.9",
    "nhom": "Nội tiết",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Nội Tiết - Chuyển Hóa.",
    "tomTat": "Đái Tháo Đường Típ 2 / Típ 1 & Biến Chứng Cấp — Mã ICD-10: E11.9. Chuyên khoa Nội Tiết - Chuyển Hóa.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "dm_fpg",
        3.5,
        "dt"
      ],
      [
        "dm_hba1c",
        3.5,
        "dt"
      ],
      [
        "dm_ogtt",
        3.5,
        "dt"
      ],
      [
        "dm_random_symptoms",
        3.5,
        "dt"
      ],
      [
        "dm_dka_signs",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "tang_huyet_ap",
    "ten": "Tăng Huyết Áp Vô Căn / Cơn THA Cấp Cứu",
    "tenNgan": "Tăng huyết áp",
    "icd": "I10",
    "nhom": "Tim mạch",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tim Mạch.",
    "tomTat": "Tăng Huyết Áp Vô Căn / Cơn THA Cấp Cứu — Mã ICD-10: I10. Chuyên khoa Tim Mạch.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "htn_clinic_bp",
        3.5,
        "dt"
      ],
      [
        "htn_abpm",
        3.5,
        "dt"
      ],
      [
        "htn_emergency_tod",
        3.5,
        "dt"
      ],
      [
        "htn_lvh",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "suy_tim",
    "ten": "Suy Tim Cấp / Mạn Tính (HFrEF / HFpEF)",
    "tenNgan": "Suy tim",
    "icd": "I50.9",
    "nhom": "Tim mạch",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tim Mạch.",
    "tomTat": "Suy Tim Cấp / Mạn Tính (HFrEF / HFpEF) — Mã ICD-10: I50.9. Chuyên khoa Tim Mạch.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hf_echo_or_bnp",
        3.5,
        "dt"
      ],
      [
        "hf_dyspnea_orthopnea",
        3.5,
        "dt"
      ],
      [
        "hf_jvd",
        3.5,
        "dt"
      ],
      [
        "hf_rales",
        3.5,
        "dt"
      ],
      [
        "hf_s3",
        3.5,
        "dt"
      ],
      [
        "hf_edema",
        3.5,
        "dt"
      ],
      [
        "hf_cardiomegaly",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "dot_quy_nao",
    "ten": "Đột Quỵ Não Cấp (Nhồi Máu Não / Xuất Huyết Não)",
    "tenNgan": "Đột quỵ não",
    "icd": "I63.9",
    "nhom": "Thần kinh",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Thần Kinh - Cấp Cứu.",
    "tomTat": "Đột Quỵ Não Cấp (Nhồi Máu Não / Xuất Huyết Não) — Mã ICD-10: I63.9. Chuyên khoa Thần Kinh - Cấp Cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "stroke_imaging",
        3.5,
        "dt"
      ],
      [
        "stroke_fast_face",
        3.5,
        "dt"
      ],
      [
        "stroke_fast_arm",
        3.5,
        "dt"
      ],
      [
        "stroke_fast_speech",
        3.5,
        "dt"
      ],
      [
        "stroke_time",
        3.5,
        "dt"
      ],
      [
        "stroke_nihss",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "hoi_chung_vanh_cap",
    "ten": "Hội chứng vành cấp / Nhồi máu cơ tim (ACS/STEMI/NSTEMI)",
    "tenNgan": "HCVC / NMCT",
    "icd": "I21.9",
    "nhom": "Tim mạch",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tim mạch can thiệp & Cấp cứu.",
    "tomTat": "Hội chứng vành cấp / Nhồi máu cơ tim (ACS/STEMI/NSTEMI) — Mã ICD-10: I21.9. Chuyên khoa Tim mạch can thiệp & Cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "acs_crit_1",
        3.5,
        "dt"
      ],
      [
        "acs_crit_2",
        3.5,
        "dt"
      ],
      [
        "acs_crit_3",
        3.5,
        "dt"
      ],
      [
        "acs_crit_4",
        3.5,
        "dt"
      ],
      [
        "acs_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "copd",
    "ten": "Bệnh phổi tắc nghẽn mạn tính (COPD - Đợt cấp & Mạn)",
    "tenNgan": "COPD",
    "icd": "J44.9",
    "nhom": "Hô hấp",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Hô hấp & Hồi sức cấp cứu.",
    "tomTat": "Bệnh phổi tắc nghẽn mạn tính (COPD - Đợt cấp & Mạn) — Mã ICD-10: J44.9. Chuyên khoa Hô hấp & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "copd_crit_1",
        3.5,
        "dt"
      ],
      [
        "copd_crit_2",
        3.5,
        "dt"
      ],
      [
        "copd_crit_3",
        3.5,
        "dt"
      ],
      [
        "copd_crit_4",
        3.5,
        "dt"
      ],
      [
        "copd_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "hen_phe_quan",
    "ten": "Hen phế quản (Asthma - Cơn cấp & Kiểm soát GINA)",
    "tenNgan": "Hen phế quản",
    "icd": "J45.9",
    "nhom": "Hô hấp",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Hô hấp & Dị ứng lâm sàng.",
    "tomTat": "Hen phế quản (Asthma - Cơn cấp & Kiểm soát GINA) — Mã ICD-10: J45.9. Chuyên khoa Hô hấp & Dị ứng lâm sàng.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "asthma_crit_1",
        3.5,
        "dt"
      ],
      [
        "asthma_crit_2",
        3.5,
        "dt"
      ],
      [
        "asthma_crit_3",
        3.5,
        "dt"
      ],
      [
        "asthma_crit_4",
        3.5,
        "dt"
      ],
      [
        "asthma_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "soc_nhiem_khuan",
    "ten": "Sốc nhiễm khuẩn & Nhiễm khuẩn huyết (Sepsis-3)",
    "tenNgan": "Sốc nhiễm khuẩn",
    "icd": "A41.9",
    "nhom": "Truyền nhiễm",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Hồi sức cấp cứu & Truyền nhiễm.",
    "tomTat": "Sốc nhiễm khuẩn & Nhiễm khuẩn huyết (Sepsis-3) — Mã ICD-10: A41.9. Chuyên khoa Hồi sức cấp cứu & Truyền nhiễm.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "sepsis_crit_1",
        3.5,
        "dt"
      ],
      [
        "sepsis_crit_2",
        3.5,
        "dt"
      ],
      [
        "sepsis_crit_3",
        3.5,
        "dt"
      ],
      [
        "sepsis_crit_4",
        3.5,
        "dt"
      ],
      [
        "sepsis_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "xuat_huyet_tieu_hoa_tren",
    "ten": "Xuất huyết tiêu hóa trên (UGIB - Loét & Vỡ Giãn TMTQ)",
    "tenNgan": "XHTH trên",
    "icd": "K92.2",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tiêu hóa & Hồi sức cấp cứu.",
    "tomTat": "Xuất huyết tiêu hóa trên (UGIB - Loét & Vỡ Giãn TMTQ) — Mã ICD-10: K92.2. Chuyên khoa Tiêu hóa & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "ugib_crit_1",
        3.5,
        "dt"
      ],
      [
        "ugib_crit_2",
        3.5,
        "dt"
      ],
      [
        "ugib_crit_3",
        3.5,
        "dt"
      ],
      [
        "ugib_crit_4",
        3.5,
        "dt"
      ],
      [
        "ugib_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "nhiem_toan_ceton_dka",
    "ten": "Nhiễm toan Ceton do ĐTĐ (DKA) & Tăng ALTT (HHS)",
    "tenNgan": "DKA / HHS",
    "icd": "E10.1",
    "nhom": "Nội tiết",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "tomTat": "Nhiễm toan Ceton do ĐTĐ (DKA) & Tăng ALTT (HHS) — Mã ICD-10: E10.1. Chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "dka_crit_1",
        3.5,
        "dt"
      ],
      [
        "dka_crit_2",
        3.5,
        "dt"
      ],
      [
        "dka_crit_3",
        3.5,
        "dt"
      ],
      [
        "dka_crit_4",
        3.5,
        "dt"
      ],
      [
        "dka_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "con_bao_giap",
    "ten": "Cơn bão giáp & Nhiễm độc giáp cấp (Thyroid Storm)",
    "tenNgan": "Bão giáp",
    "icd": "E05.9",
    "nhom": "Nội tiết",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "tomTat": "Cơn bão giáp & Nhiễm độc giáp cấp (Thyroid Storm) — Mã ICD-10: E05.9. Chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "storm_crit_1",
        3.5,
        "dt"
      ],
      [
        "storm_crit_2",
        3.5,
        "dt"
      ],
      [
        "storm_crit_3",
        3.5,
        "dt"
      ],
      [
        "storm_crit_4",
        3.5,
        "dt"
      ],
      [
        "storm_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "suy_thuong_than_cap",
    "ten": "Suy thượng thận cấp (Adrenal Crisis / Acute Adrenal Insufficiency)",
    "tenNgan": "Suy thượng thận cấp",
    "icd": "E27.2",
    "nhom": "Nội tiết",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "tomTat": "Suy thượng thận cấp (Adrenal Crisis / Acute Adrenal Insufficiency) — Mã ICD-10: E27.2. Chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "adrenal_crit_1",
        3.5,
        "dt"
      ],
      [
        "adrenal_crit_2",
        3.5,
        "dt"
      ],
      [
        "adrenal_crit_3",
        3.5,
        "dt"
      ],
      [
        "adrenal_crit_4",
        3.5,
        "dt"
      ],
      [
        "adrenal_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_ruot_thua_cap",
    "ten": "Viêm ruột thừa cấp (Acute Appendicitis)",
    "tenNgan": "Viêm ruột thừa",
    "icd": "K35.8",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Ngoại tiêu hóa & Cấp cứu.",
    "tomTat": "Viêm ruột thừa cấp (Acute Appendicitis) — Mã ICD-10: K35.8. Chuyên khoa Ngoại tiêu hóa & Cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "app_crit_1",
        3.5,
        "dt"
      ],
      [
        "app_crit_2",
        3.5,
        "dt"
      ],
      [
        "app_crit_3",
        3.5,
        "dt"
      ],
      [
        "app_crit_4",
        3.5,
        "dt"
      ],
      [
        "app_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_tui_mat_cap",
    "ten": "Sỏi mật & Viêm túi mật cấp (Acute Cholecystitis)",
    "tenNgan": "Viêm túi mật cấp",
    "icd": "K80.0",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Ngoại tiêu hóa & Gan mật.",
    "tomTat": "Sỏi mật & Viêm túi mật cấp (Acute Cholecystitis) — Mã ICD-10: K80.0. Chuyên khoa Ngoại tiêu hóa & Gan mật.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "chole_crit_1",
        3.5,
        "dt"
      ],
      [
        "chole_crit_2",
        3.5,
        "dt"
      ],
      [
        "chole_crit_3",
        3.5,
        "dt"
      ],
      [
        "chole_crit_4",
        3.5,
        "dt"
      ],
      [
        "chole_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "nhiem_trung_tiet_nieu",
    "ten": "Nhiễm trùng đường tiết niệu & Viêm đài bể thận (UTI / Pyelonephritis)",
    "tenNgan": "NT tiết niệu / Bể thận",
    "icd": "N39.0",
    "nhom": "Tiết niệu",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Thận - Tiết niệu & Truyền nhiễm.",
    "tomTat": "Nhiễm trùng đường tiết niệu & Viêm đài bể thận (UTI / Pyelonephritis) — Mã ICD-10: N39.0. Chuyên khoa Thận - Tiết niệu & Truyền nhiễm.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "uti_crit_1",
        3.5,
        "dt"
      ],
      [
        "uti_crit_2",
        3.5,
        "dt"
      ],
      [
        "uti_crit_3",
        3.5,
        "dt"
      ],
      [
        "uti_crit_4",
        3.5,
        "dt"
      ],
      [
        "uti_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "rung_nhi",
    "ten": "Rung nhĩ & Loạn nhịp nhanh (Atrial Fibrillation - AFib)",
    "tenNgan": "Rung nhĩ",
    "icd": "I48.9",
    "nhom": "Tim mạch",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tim mạch lâm sàng & Loạn nhịp.",
    "tomTat": "Rung nhĩ & Loạn nhịp nhanh (Atrial Fibrillation - AFib) — Mã ICD-10: I48.9. Chuyên khoa Tim mạch lâm sàng & Loạn nhịp.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "afib_crit_1",
        3.5,
        "dt"
      ],
      [
        "afib_crit_2",
        3.5,
        "dt"
      ],
      [
        "afib_crit_3",
        3.5,
        "dt"
      ],
      [
        "afib_crit_4",
        3.5,
        "dt"
      ],
      [
        "afib_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "ha_natri_mau",
    "ten": "Hạ Natri máu & Rối loạn điện giải (Hyponatremia / SIADH)",
    "tenNgan": "Hạ Natri máu",
    "icd": "E87.1",
    "nhom": "Tiết niệu",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Thận - Lọc máu & Hồi sức cấp cứu.",
    "tomTat": "Hạ Natri máu & Rối loạn điện giải (Hyponatremia / SIADH) — Mã ICD-10: E87.1. Chuyên khoa Thận - Lọc máu & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hypo_na_1",
        3.5,
        "dt"
      ],
      [
        "hypo_na_2",
        3.5,
        "dt"
      ],
      [
        "hypo_na_3",
        3.5,
        "dt"
      ],
      [
        "hypo_na_4",
        3.5,
        "dt"
      ],
      [
        "hypo_na_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "viem_loet_da_day_hp",
    "ten": "Viêm loét dạ dày tá tràng & Nhiễm H. Pylori (PUD)",
    "tenNgan": "Loét DD-TT / HP",
    "icd": "K25.9",
    "nhom": "Tiêu hóa",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Tiêu hóa & Nội khoa tổng quát.",
    "tomTat": "Viêm loét dạ dày tá tràng & Nhiễm H. Pylori (PUD) — Mã ICD-10: K25.9. Chuyên khoa Tiêu hóa & Nội khoa tổng quát.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "pud_crit_1",
        3.5,
        "dt"
      ],
      [
        "pud_crit_2",
        3.5,
        "dt"
      ],
      [
        "pud_crit_3",
        3.5,
        "dt"
      ],
      [
        "pud_crit_4",
        3.5,
        "dt"
      ],
      [
        "pud_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "soc_phan_ve",
    "ten": "Sốc phản vệ & Phản ứng phản vệ (Anaphylaxis)",
    "tenNgan": "Sốc phản vệ",
    "icd": "T78.2",
    "nhom": "Da niêm",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Dị ứng - Miễn dịch & Cấp cứu.",
    "tomTat": "Sốc phản vệ & Phản ứng phản vệ (Anaphylaxis) — Mã ICD-10: T78.2. Chuyên khoa Dị ứng - Miễn dịch & Cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "anaph_crit_1",
        3.5,
        "dt"
      ],
      [
        "anaph_crit_2",
        3.5,
        "dt"
      ],
      [
        "anaph_crit_3",
        3.5,
        "dt"
      ],
      [
        "anaph_crit_4",
        3.5,
        "dt"
      ],
      [
        "anaph_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "tran_dich_tran_khi_mang_phoi",
    "ten": "Tràn dịch & Tràn khí màng phổi cấp (Effusion / Pneumothorax)",
    "tenNgan": "TD / TK màng phổi",
    "icd": "J90",
    "nhom": "Hô hấp",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Hô hấp & Ngoại lồng ngực.",
    "tomTat": "Tràn dịch & Tràn khí màng phổi cấp (Effusion / Pneumothorax) — Mã ICD-10: J90. Chuyên khoa Hô hấp & Ngoại lồng ngực.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "pleural_crit_1",
        3.5,
        "dt"
      ],
      [
        "pleural_crit_2",
        3.5,
        "dt"
      ],
      [
        "pleural_crit_3",
        3.5,
        "dt"
      ],
      [
        "pleural_crit_4",
        3.5,
        "dt"
      ],
      [
        "pleural_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "soi_than_con_dau_quan_than",
    "ten": "Sỏi thận & Cơn đau quặn thận (Renal Colic / Urolithiasis)",
    "tenNgan": "Sỏi thận / Đau quặn",
    "icd": "N20.0",
    "nhom": "Tiết niệu",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Thận - Tiết niệu & Ngoại niệu.",
    "tomTat": "Sỏi thận & Cơn đau quặn thận (Renal Colic / Urolithiasis) — Mã ICD-10: N20.0. Chuyên khoa Thận - Tiết niệu & Ngoại niệu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "colic_crit_1",
        3.5,
        "dt"
      ],
      [
        "colic_crit_2",
        3.5,
        "dt"
      ],
      [
        "colic_crit_3",
        3.5,
        "dt"
      ],
      [
        "colic_crit_4",
        3.5,
        "dt"
      ],
      [
        "colic_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "hoi_chung_than_hu",
    "ten": "Hội chứng thận hư nguyên phát / thứ phát (Nephrotic Syndrome)",
    "tenNgan": "Hội chứng thận hư",
    "icd": "N04.9",
    "nhom": "Tiết niệu",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Thận học & Miễn dịch lâm sàng.",
    "tomTat": "Hội chứng thận hư nguyên phát / thứ phát (Nephrotic Syndrome) — Mã ICD-10: N04.9. Chuyên khoa Thận học & Miễn dịch lâm sàng.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "neph_crit_1",
        3.5,
        "dt"
      ],
      [
        "neph_crit_2",
        3.5,
        "dt"
      ],
      [
        "neph_crit_3",
        3.5,
        "dt"
      ],
      [
        "neph_crit_4",
        3.5,
        "dt"
      ],
      [
        "neph_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  },
  {
    "id": "ha_duong_huyet_cap",
    "ten": "Hạ đường huyết cấp & Hôn mê hạ đường huyết (Hypoglycemia)",
    "tenNgan": "Hạ đường huyết",
    "icd": "E16.2",
    "nhom": "Nội tiết",
    "baoDong": true,
    "ghiChuBaoDong": "Bệnh cảnh cấp cứu cần theo dõi sát tại chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "tomTat": "Hạ đường huyết cấp & Hôn mê hạ đường huyết (Hypoglycemia) — Mã ICD-10: E16.2. Chuyên khoa Nội tiết & Hồi sức cấp cứu.",
    "danSo": {
      "gioiTinh": "any",
      "tuoiMin": null,
      "tuoiMax": null
    },
    "dd": [
      [
        "hypogly_crit_1",
        3.5,
        "dt"
      ],
      [
        "hypogly_crit_2",
        3.5,
        "dt"
      ],
      [
        "hypogly_crit_3",
        3.5,
        "dt"
      ],
      [
        "hypogly_crit_4",
        3.5,
        "dt"
      ],
      [
        "hypogly_crit_5",
        3.5,
        "dt"
      ]
    ],
    "phacDo": {
      "tuyen": [
        "Tuyến cơ sở",
        "Bệnh viện Quận/Huyện",
        "Bệnh viện Chuyên khoa"
      ],
      "thuoc": [
        [
          "Phác đồ chuẩn Bộ Y Tế",
          "Theo hướng dẫn chuyên khoa",
          "Bậc 1"
        ]
      ],
      "luuY": [
        ""
      ],
      "theoDoi": [
        "Theo dõi sát sinh hiệu, tri giác và lượng nước tiểu",
        "Đánh giá đáp ứng lâm sàng sau 24-48 giờ"
      ],
      "nguon": [
        "Hướng dẫn Chẩn đoán & Điều trị - Bộ Y Tế Việt Nam"
      ]
    }
  }
];
