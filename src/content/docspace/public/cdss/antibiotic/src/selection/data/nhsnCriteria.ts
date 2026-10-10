import { NhsnCriteriaSection } from '../types';

/**
 * NHSN-CDC 2019 Diagnostic Criteria for Infection Syndromes
 * Source: BV Bệnh Nhiệt Đới - Phụ lục Bảng kiểm chẩn đoán nhiễm trùng theo NHSN-CDC 2019 (File 1, P.5-23)
 */
export const NHSN_CRITERIA_SECTIONS: NhsnCriteriaSection[] = [
  {
    id: 'nhsn_pneumonia_adult',
    titleVi: 'Viêm phổi lâm sàng (Người lớn & Người cao tuổi > 70 tuổi)',
    site: 'respiratory',
    population: 'adult',
    requiredCriteriaCount: 3,
    criteria: [
      {
        id: 'pneu_fever_wbc',
        textVi: 'Sốt (> 38.0°C) HOẶC Hạ thân nhiệt (< 36.0°C) HOẶC Bạch cầu tăng (> 12.000/mm³) / Bạch cầu giảm (≤ 4.000/mm³)',
        isClinical: true
      },
      {
        id: 'pneu_elderly_altered_mental',
        textVi: 'Bệnh nhân > 70 tuổi: Rối loạn tri giác mới xuất hiện mà không do nguyên nhân thần kinh khác',
        isClinical: true
      },
      {
        id: 'pneu_sputum_purulent',
        textVi: 'Mới khởi phát có đàm mủ, hoặc thay đổi tính chất đàm, hoặc tăng tiết dịch hô hấp, tăng nhu cầu hút đàm',
        isClinical: true
      },
      {
        id: 'pneu_cough_dyspnea',
        textVi: 'Mới khởi phát hoặc làm nặng thêm triệu chứng ho, khó thở hoặc thở nhanh',
        isClinical: true
      },
      {
        id: 'pneu_rales',
        textVi: 'Khám phổi nghe ran nổ hoặc ran ẩm khu trú mới xuất hiện',
        isClinical: true
      },
      {
        id: 'pneu_hypoxia',
        textVi: 'Giảm trao đổi khí: SpO₂ giảm, PaO₂/FiO₂ < 240, tăng nhu cầu oxy hoặc thông khí nhân tạo',
        isClinical: true
      },
      {
        id: 'pneu_xray',
        textVi: 'Bằng chứng hình ảnh học: X-quang phổi có thâm nhiễm mới, tổn thương đông đặc hoặc mức nước hơi',
        isImaging: true
      }
    ],
    source: { doc: 'BVBND_LuuDo', page: 5 }
  },

  {
    id: 'nhsn_vap_vae',
    titleVi: 'Biến cố liên quan thở máy & Viêm phổi thở máy (VAE / VAP)',
    site: 'respiratory',
    population: 'adult',
    requiredCriteriaCount: 3,
    criteria: [
      {
        id: 'vae_vac',
        textVi: 'VAC (Ventilator-Associated Condition): Có giai đoạn thở máy ổn định ≥ 2 ngày, sau đó tăng FiO₂ ≥ 0.20 HOẶC tăng PEEP ≥ 3 cmH₂O kéo dài ≥ 2 ngày',
        isClinical: true
      },
      {
        id: 'vae_ivac',
        textVi: 'IVAC: Thỏa VAC + Thân nhiệt > 38°C hoặc < 36°C HOẶC Bạch cầu ≥ 12.000 hoặc ≤ 4.000 + Bắt đầu kháng sinh mới dùng ≥ 4 ngày',
        isClinical: true
      },
      {
        id: 'vae_pvap_micro',
        textVi: 'PVAP (Vi sinh): Thỏa IVAC + Cấy vi sinh định lượng: Dịch hút NKQ ≥ 10⁵ CFU/mL HOẶC BAL ≥ 10⁴ CFU/mL HOẶC Dịch chải có bảo vệ (PSB) ≥ 10³ CFU/mL',
        isMicrobiology: true
      },
      {
        id: 'vae_pvap_purulence',
        textVi: 'PVAP (Tế bào học): Đàm mủ có ≥ 25 bạch cầu đa nhân và ≤ 10 tế bào biểu mô trên vi trường phóng đại thấp (lpf x100)',
        isMicrobiology: true
      }
    ],
    source: { doc: 'BVBND_LuuDo', page: 8 }
  },

  {
    id: 'nhsn_ssti',
    titleVi: 'Nhiễm trùng Da & Mô mềm (SSTI & Loét tì đè)',
    site: 'skin_soft_tissue',
    population: 'adult',
    requiredCriteriaCount: 2,
    criteria: [
      {
        id: 'ssti_purulence',
        textVi: 'Sang thương da có mủ, chảy mủ, mụn mủ hoặc nhọt',
        isClinical: true
      },
      {
        id: 'ssti_cardinal_signs',
        textVi: 'Có ít nhất 2 trong 4 dấu hiệu tại chỗ: Sưng nề, Nóng, Đỏ da, Đau hoặc căng tức tại chỗ',
        isClinical: true
      },
      {
        id: 'ssti_microbiology',
        textVi: 'Vi sinh vật phân lập từ chọc hút hoặc dẫn lưu dịch ổ mủ / sinh thiết rìa sang thương',
        isMicrobiology: true
      }
    ],
    source: { doc: 'BVBND_LuuDo', page: 10 }
  },

  {
    id: 'nhsn_uti',
    titleVi: 'Nhiễm trùng đường Tiết niệu (UTI & CAUTI)',
    site: 'urinary',
    population: 'adult',
    requiredCriteriaCount: 2,
    criteria: [
      {
        id: 'uti_fever',
        textVi: 'Sốt (> 38.0°C) hoặc cảm giác ớn lạnh',
        isClinical: true
      },
      {
        id: 'uti_dysuria_frequency',
        textVi: 'Tiểu buốt, tiểu rắt, tiểu gấp, tiểu nhiều lần hoặc đau hạ vị / đau góc sườn lưng',
        isClinical: true
      },
      {
        id: 'uti_pyuria',
        textVi: 'Tổng phân tích nước tiểu: Bạch cầu nước tiểu (+), Nitrate (+), hoặc soi cặn lắng ≥ 10 BC/vi trường',
        isLab: true
      },
      {
        id: 'uti_culture',
        textVi: 'Cấy nước tiểu dương tính ≥ 10⁵ CFU/mL (hoặc ≥ 10³ CFU/mL nếu có sonde tiểu / nam giới)',
        isMicrobiology: true
      }
    ],
    source: { doc: 'BVBND_LuuDo', page: 11 }
  },

  {
    id: 'nhsn_sbp_peritoneal',
    titleVi: 'Viêm phúc mạc nguyên phát do vi khuẩn (SBP / Nhiễm khuẩn dịch báng)',
    site: 'peritoneal',
    population: 'adult',
    requiredCriteriaCount: 2,
    criteria: [
      {
        id: 'sbp_fever_pain',
        textVi: 'Sốt (> 38.0°C) HOẶC Đau bụng âm ỉ/khu trú HOẶC Bụng chướng tăng nhanh',
        isClinical: true
      },
      {
        id: 'sbp_encephalopathy',
        textVi: 'Hôn mê gan / Bệnh não gan xuất hiện mới hoặc diễn tiến xấu đi không rõ nguyên nhân',
        isClinical: true
      },
      {
        id: 'sbp_pmn_count',
        textVi: 'Chọc dò dịch báng: Bạch cầu đa nhân (PMN) trong dịch báng ≥ 250 tế bào/mm³ (hoặc ≥ 0.25 x 10⁹/L)',
        isLab: true
      },
      {
        id: 'sbp_culture',
        textVi: 'Cấy dịch báng vào chai cấy máu dương tính với vi khuẩn',
        isMicrobiology: true
      }
    ],
    source: { doc: 'BVBND_LuuDo', page: 12 }
  },

  {
    id: 'nhsn_cns_meningitis',
    titleVi: 'Nhiễm trùng Hệ Thần kinh Trung ương (Viêm màng não mủ / Áp xe não)',
    site: 'cns',
    population: 'adult',
    requiredCriteriaCount: 2,
    criteria: [
      {
        id: 'cns_meningeal_signs',
        textVi: 'Tam chứng màng não: Sốt (> 38°C) + Đau đầu dữ dội + Dấu màng não (Cổ gượng, Kernig (+), Brudzinski (+))',
        isClinical: true
      },
      {
        id: 'cns_altered_consciousness',
        textVi: 'Rối loạn tri giác (lơ mơ, mê), co giật hoặc dấu thần kinh khu trú',
        isClinical: true
      },
      {
        id: 'cns_csf_abnormal',
        textVi: 'Dịch não tủy (DNT): Đục hoặc áp lực tăng, tăng bạch cầu đa nhân, protein tăng, đường DNT/máu < 0.4',
        isLab: true
      },
      {
        id: 'cns_gram_pcr_culture',
        textVi: 'Nhuộm Gram DNT thấy vi khuẩn HOẶC cấy DNT / cấy máu dương tính HOẶC PCR DNT dương tính',
        isMicrobiology: true
      }
    ],
    source: { doc: 'BVBND_LuuDo', page: 22 }
  }
];

export function getNhsnCriteriaForSite(site: string): NhsnCriteriaSection | undefined {
  return NHSN_CRITERIA_SECTIONS.find(sec => sec.site === site);
}
