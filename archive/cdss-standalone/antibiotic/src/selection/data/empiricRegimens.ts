import { EmpiricRegimen } from '../types';

/**
 * Empiric Antibiotic Regimens stratified by Population, Infection Site, Risk Group & Pathogen Risk
 * Source: BV Bệnh Nhiệt Đới (File 3: Hướng dẫn sử dụng kháng sinh 2026, P.4-13)
 */
export const EMPIRIC_REGIMENS: EmpiricRegimen[] = [
  // ==========================================
  // 1. ADULT - RESPIRATORY (VIÊM PHỔI NGƯỜI LỚN) (P.8-9)
  // ==========================================
  {
    id: 'adult_resp_group1',
    site: 'respiratory',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Viêm phổi - Nhóm 1 (Ít nguy cơ vi khuẩn đa kháng)',
    titleEn: 'Adult Pneumonia - Group 1 (Low MDR Risk)',
    drugs: [
      {
        drugId: 'amox_clav',
        nameVi: 'Amoxicillin/Clavulanate',
        nameEn: 'Amoxicillin/Clavulanate',
        standardDoseVi: '1g IV q8h hoặc 875/125mg PO q12h',
        hasDosingCalculator: true
      },
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '1 - 2g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'azithromycin',
        nameVi: 'Azithromycin (phối hợp phủ VK không điển hình)',
        nameEn: 'Azithromycin (combo atypical)',
        standardDoseVi: '500mg IV/PO ngày 1, sau đó 250mg mỗi 24 giờ (hoặc 500mg q24h)',
        hasDosingCalculator: true
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin (đơn trị thay thế)',
        nameEn: 'Levofloxacin monotherapy',
        standardDoseVi: '750mg IV/PO mỗi 24 giờ (hoặc 500mg q12h)',
        hasDosingCalculator: true
      },
      {
        drugId: 'moxifloxacin',
        nameVi: 'Moxifloxacin (đơn trị thay thế)',
        nameEn: 'Moxifloxacin monotherapy',
        standardDoseVi: '400mg IV/PO mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    combinationRulesVi: [
      'Phối hợp Ceftriaxone hoặc Amox-clav + Azithromycin khi nghi ngờ vi khuẩn không điển hình.',
      'Hoặc dùng đơn trị liệu FQ hô hấp (Levofloxacin / Moxifloxacin).',
      'Cân nhắc phối hợp Oseltamivir khi nghi ngờ cúm đồng nhiễm trong mùa dịch.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 8 }
  },
  {
    id: 'adult_resp_group2_mrsa',
    site: 'respiratory',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'mrsa',
    titleVi: 'Viêm phổi - Nhóm 2 + Nguy cơ MRSA',
    titleEn: 'Adult Pneumonia - Group 2 + MRSA Risk',
    drugs: [
      {
        drugId: 'vancomycin',
        nameVi: 'Vancomycin',
        nameEn: 'Vancomycin',
        standardDoseVi: 'Liều nạp 25 - 30 mg/kg, sau đó 15 - 20 mg/kg q8-12h (theo dõi TDM)',
        hasDosingCalculator: true
      },
      {
        drugId: 'teicoplanin',
        nameVi: 'Teicoplanin',
        nameEn: 'Teicoplanin',
        standardDoseVi: 'Liều nạp 6 mg/kg (hoặc 800mg) q12h x 3 liều, sau đó 6 mg/kg/ngày',
        hasDosingCalculator: true
      },
      {
        drugId: 'linezolid',
        nameVi: 'Linezolid',
        nameEn: 'Linezolid',
        standardDoseVi: '600mg IV/PO mỗi 12 giờ',
        hasDosingCalculator: true
      }
    ],
    combinationRulesVi: [
      'Bắt buộc phối hợp thuốc chống MRSA với kháng sinh phổ Gram (-) nếu bệnh nhân có nguy cơ phối hợp cả 2 nhóm vi khuẩn.'
    ],
    cautionVi: [
      'Daptomycin KHÔNG được sử dụng trong viêm phổi vì bị surfactant phế nang bất hoạt!'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 9 }
  },
  {
    id: 'adult_resp_group2_esbl',
    site: 'respiratory',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'esbl',
    titleVi: 'Viêm phổi - Nhóm 2 + Nguy cơ Enterobacterales sinh ESBL',
    titleEn: 'Adult Pneumonia - Group 2 + ESBL Risk',
    drugs: [
      {
        drugId: 'piperacillin_tazo',
        nameVi: 'Piperacillin/Tazobactam',
        nameEn: 'Piperacillin/Tazobactam',
        standardDoseVi: '4.5g IV mỗi 6 giờ truyền kéo dài 3 - 4 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'ertapenem',
        nameVi: 'Ertapenem',
        nameEn: 'Ertapenem',
        standardDoseVi: '1g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'imipenem',
        nameVi: 'Imipenem/Cilastatin',
        nameEn: 'Imipenem/Cilastatin',
        standardDoseVi: '500mg IV q6h hoặc 1g IV q8h truyền kéo dài 3 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'meropenem',
        nameVi: 'Meropenem',
        nameEn: 'Meropenem',
        standardDoseVi: '1g - 2g IV mỗi 8 giờ truyền kéo dài 3 - 4 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 9 }
  },
  {
    id: 'adult_resp_group2_pseudo_acineto',
    site: 'respiratory',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'pseudo_acineto',
    titleVi: 'Viêm phổi - Nhóm 2 + Nguy cơ Pseudomonas / Acinetobacter đa kháng',
    titleEn: 'Adult Pneumonia - Group 2 + Pseudomonas/Acinetobacter Risk',
    drugs: [
      {
        drugId: 'piperacillin_tazo',
        nameVi: 'Piperacillin/Tazobactam',
        nameEn: 'Piperacillin/Tazobactam',
        standardDoseVi: '4.5g IV mỗi 6 giờ truyền kéo dài 3 - 4 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'cefo_sulbactam_11',
        nameVi: 'Cefoperazone/Sulbactam liều cao',
        nameEn: 'Cefoperazone/Sulbactam high-dose',
        standardDoseVi: '2g - 4g IV mỗi 8 - 12 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'ceftazidim',
        nameVi: 'Ceftazidime',
        nameEn: 'Ceftazidime',
        standardDoseVi: '2g IV mỗi 8 giờ truyền kéo dài',
        hasDosingCalculator: true
      },
      {
        drugId: 'cefepim',
        nameVi: 'Cefepime',
        nameEn: 'Cefepime',
        standardDoseVi: '2g IV mỗi 8 giờ truyền kéo dài 3 - 4 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'meropenem',
        nameVi: 'Meropenem liều cao',
        nameEn: 'Meropenem high-dose',
        standardDoseVi: '2g IV mỗi 8 giờ truyền kéo dài ≥ 3 - 4 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin (phối hợp)',
        nameEn: 'Amikacin (combo)',
        standardDoseVi: '15 - 20 mg/kg IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'colistin',
        nameVi: 'Colistin (khi nghi ngờ vi khuẩn siêu kháng)',
        nameEn: 'Colistin (CMS)',
        standardDoseVi: 'Nạp 300mg CBA (9M UI), duy trì 150-180mg CBA q12h',
        hasDosingCalculator: true
      }
    ],
    combinationRulesVi: [
      'Phối hợp 1 Beta-lactam chống trực khuẩn mủ xanh (Pip-taz / Cefepime / Meropenem) + 1 Aminoglycoside (Amikacin / Tobramycin).',
      'Nếu có nguy cơ cả ESBL và Acineto/Pseudo, luôn ưu tiên nhóm kháng sinh diệt Acineto/Pseudo.',
      'Cân nhắc phối hợp thêm Colistin nếu tỷ lệ vi khuẩn kháng Carbapenem tại khoa phòng cao.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 9 }
  },

  // ==========================================
  // 2. ADULT - SEPSIS / NHIỄM KHUẨN HUYẾT (P.12-13)
  // ==========================================
  {
    id: 'adult_sepsis_resp_group1',
    site: 'sepsis',
    sepsisSource: 'respiratory',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn huyết từ ổ Hô hấp - Nhóm 1',
    titleEn: 'Adult Sepsis from Respiratory - Group 1',
    drugs: [
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone ± Azithromycin',
        nameEn: 'Ceftriaxone ± Azithromycin',
        standardDoseVi: '2g IV mỗi 24 giờ + Azithromycin 500mg IV/PO q24h',
        hasDosingCalculator: true
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin',
        nameEn: 'Levofloxacin',
        standardDoseVi: '750mg IV mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 13 }
  },
  {
    id: 'adult_sepsis_gi_group1',
    site: 'sepsis',
    sepsisSource: 'gastrointestinal',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn huyết từ ổ Tiêu hóa - Nhóm 1',
    titleEn: 'Adult Sepsis from GI - Group 1',
    drugs: [
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '2g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin (phối hợp)',
        nameEn: 'Levofloxacin',
        standardDoseVi: '500mg - 750mg IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin / Gentamicin (phối hợp)',
        nameEn: 'Amikacin / Gentamicin',
        standardDoseVi: 'Amikacin 15-20 mg/kg q24h',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 13 }
  },
  {
    id: 'adult_sepsis_skin_group1',
    site: 'sepsis',
    sepsisSource: 'skin_soft_tissue',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn huyết từ ổ Da & mô mềm - Nhóm 1',
    titleEn: 'Adult Sepsis from Skin/Soft Tissue - Group 1',
    drugs: [
      {
        nameVi: 'Oxacillin',
        nameEn: 'Oxacillin',
        standardDoseVi: '2g IV mỗi 4 giờ',
        hasDosingCalculator: false
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin / Moxifloxacin (phối hợp)',
        nameEn: 'Levofloxacin / Moxifloxacin',
        standardDoseVi: 'Levofloxacin 750mg q24h',
        hasDosingCalculator: true
      },
      {
        drugId: 'clindamycin',
        nameVi: 'Clindamycin ± Metronidazole (khi nghi ngờ kỵ khí)',
        nameEn: 'Clindamycin ± Metronidazole',
        standardDoseVi: 'Clindamycin 600-900mg IV q8h',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 13 }
  },
  {
    id: 'adult_sepsis_urinary_group1',
    site: 'sepsis',
    sepsisSource: 'urinary',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn huyết từ ổ Tiết niệu - Nhóm 1',
    titleEn: 'Adult Sepsis from Urinary - Group 1',
    drugs: [
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '2g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin (phối hợp)',
        nameEn: 'Amikacin',
        standardDoseVi: '15 - 20 mg/kg IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin',
        nameEn: 'Levofloxacin',
        standardDoseVi: '750mg IV mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 13 }
  },
  {
    id: 'adult_sepsis_group2_all_sources',
    site: 'sepsis',
    population: 'adult',
    riskGroup: 'group_2',
    titleVi: 'Nhiễm khuẩn huyết - Nhóm 2 (Nguy cơ cao vi khuẩn đa kháng)',
    titleEn: 'Adult Sepsis - Group 2 (High MDR Risk)',
    drugs: [
      {
        drugId: 'meropenem',
        nameVi: 'Meropenem liều cao (phủ ESBL / Trực khuẩn Gram -)',
        nameEn: 'Meropenem high-dose',
        standardDoseVi: '1g - 2g IV mỗi 8 giờ truyền kéo dài 3 - 4 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'imipenem',
        nameVi: 'Imipenem/Cilastatin',
        nameEn: 'Imipenem/Cilastatin',
        standardDoseVi: '1g IV mỗi 8 giờ truyền kéo dài 3 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'piperacillin_tazo',
        nameVi: 'Piperacillin/Tazobactam',
        nameEn: 'Piperacillin/Tazobactam',
        standardDoseVi: '4.5g IV mỗi 6 giờ truyền kéo dài',
        hasDosingCalculator: true
      },
      {
        drugId: 'vancomycin',
        nameVi: 'Vancomycin (khi có nguy cơ MRSA)',
        nameEn: 'Vancomycin (if MRSA risk)',
        standardDoseVi: 'Nạp 25 - 30 mg/kg, sau đó 15 - 20 mg/kg q8-12h',
        hasDosingCalculator: true
      },
      {
        drugId: 'teicoplanin',
        nameVi: 'Teicoplanin (thay thế Vancomycin)',
        nameEn: 'Teicoplanin',
        standardDoseVi: 'Nạp 6 mg/kg q12h x 3 liều, sau đó 6 mg/kg/ngày',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin (phối hợp chống sốc / giảm BC hạt)',
        nameEn: 'Amikacin (combo)',
        standardDoseVi: '15 - 20 mg/kg IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'colistin',
        nameVi: 'Colistin (khi nghi ngờ Acineto/Pseudo siêu kháng)',
        nameEn: 'Colistin (CMS)',
        standardDoseVi: 'Nạp 300mg CBA, duy trì 150-180mg CBA q12h',
        hasDosingCalculator: true
      }
    ],
    combinationRulesVi: [
      'Nhiễm khuẩn huyết nặng / Sốc nhiễm khuẩn: KS bắt buộc truyền trong GIỜ ĐẦU TIÊN.',
      'Phối hợp phủ đồng thời vi khuẩn Gram (+) và Gram (-) nếu có nguy cơ cả hai (ví dụ Meropenem + Vancomycin).',
      'Nếu có nguy cơ Acinetobacter/Pseudomonas, ưu tiên Meropenem liều cao/Cefo-sulbactam + Amikacin ± Colistin.'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 13 }
  },

  // ==========================================
  // 3. ADULT - SKIN & SOFT TISSUE (DA & MÔ MỀM) (P.9-10)
  // ==========================================
  {
    id: 'adult_ssti_group1',
    site: 'skin_soft_tissue',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn Da và Mô mềm - Nhóm 1',
    titleEn: 'Adult Skin/Soft Tissue - Group 1',
    drugs: [
      {
        drugId: 'cefazolin',
        nameVi: 'Cefazolin (Cephalosporin thế hệ 1)',
        nameEn: 'Cefazolin',
        standardDoseVi: '1g - 2g IV mỗi 8 giờ',
        hasDosingCalculator: true
      },
      {
        nameVi: 'Oxacillin',
        nameEn: 'Oxacillin',
        standardDoseVi: '1g - 2g IV mỗi 4 - 6 giờ',
        hasDosingCalculator: false
      },
      {
        drugId: 'clindamycin',
        nameVi: 'Clindamycin',
        nameEn: 'Clindamycin',
        standardDoseVi: '600mg IV mỗi 8 giờ hoặc 300-450mg PO q8h',
        hasDosingCalculator: true
      },
      {
        drugId: 'tmp_smx',
        nameVi: 'Co-trimoxazole (TMP-SMX)',
        nameEn: 'Co-trimoxazole',
        standardDoseVi: '2 viên 480mg PO mỗi 12 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '1g - 2g IV mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    combinationRulesVi: [
      'Tùy tính chất sang thương và nguồn lây, có thể phối hợp thêm: (1) Metronidazol (nghi ngờ vi khuẩn kỵ khí), (2) Doxycyclin (nhiễm trùng tiếp xúc nước bẩn/Vibrio/rickettsia), (3) Levofloxacin (nghi ngờ vi khuẩn Gram âm).'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 10 }
  },
  {
    id: 'adult_ssti_group2_mrsa',
    site: 'skin_soft_tissue',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'mrsa',
    titleVi: 'Nhiễm khuẩn Da và Mô mềm - Nhóm 2 + Nguy cơ MRSA',
    titleEn: 'Adult SSTI - Group 2 + MRSA Risk',
    drugs: [
      {
        drugId: 'vancomycin',
        nameVi: 'Vancomycin',
        nameEn: 'Vancomycin',
        standardDoseVi: 'Nạp 25 - 30 mg/kg, sau đó 15 - 20 mg/kg q8-12h',
        hasDosingCalculator: true
      },
      {
        drugId: 'daptomycin',
        nameVi: 'Daptomycin (rất hiệu quả trong SSTI)',
        nameEn: 'Daptomycin',
        standardDoseVi: '6 - 8 mg/kg IV mỗi 24 giờ (có thể đến 10 mg/kg nếu nặng)',
        hasDosingCalculator: true
      },
      {
        drugId: 'teicoplanin',
        nameVi: 'Teicoplanin',
        nameEn: 'Teicoplanin',
        standardDoseVi: '6 mg/kg q12h x 3 liều, sau đó 6 mg/kg/ngày',
        hasDosingCalculator: true
      },
      {
        drugId: 'linezolid',
        nameVi: 'Linezolid',
        nameEn: 'Linezolid',
        standardDoseVi: '600mg IV/PO mỗi 12 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'tmp_smx',
        nameVi: 'Co-trimoxazole (TMP-SMX uống khi nhẹ/xuống thang)',
        nameEn: 'Co-trimoxazole',
        standardDoseVi: '2 - 3 viên 480mg PO mỗi 12 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 10 }
  },
  {
    id: 'adult_ssti_group2_pseudo',
    site: 'skin_soft_tissue',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'pseudo_acineto',
    titleVi: 'Nhiễm khuẩn Da và Mô mềm - Nhóm 2 + Nguy cơ Pseudomonas',
    titleEn: 'Adult SSTI - Group 2 + Pseudomonas Risk',
    drugs: [
      {
        drugId: 'piperacillin_tazo',
        nameVi: 'Piperacillin/Tazobactam',
        nameEn: 'Piperacillin/Tazobactam',
        standardDoseVi: '4.5g IV mỗi 6 giờ truyền kéo dài',
        hasDosingCalculator: true
      },
      {
        drugId: 'ceftazidim',
        nameVi: 'Ceftazidime',
        nameEn: 'Ceftazidime',
        standardDoseVi: '2g IV mỗi 8 giờ truyền kéo dài',
        hasDosingCalculator: true
      },
      {
        drugId: 'ciprofloxacin',
        nameVi: 'Ciprofloxacin',
        nameEn: 'Ciprofloxacin',
        standardDoseVi: '400mg IV q8-12h hoặc 750mg PO q12h',
        hasDosingCalculator: true
      },
      {
        drugId: 'levofloxacin',
        nameVi: 'Levofloxacin',
        nameEn: 'Levofloxacin',
        standardDoseVi: '750mg IV/PO mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'tobramycin',
        nameVi: 'Tobramycin / Amikacin (phối hợp)',
        nameEn: 'Tobramycin / Amikacin',
        standardDoseVi: 'Tobramycin 5-7 mg/kg q24h; Amikacin 15-20 mg/kg q24h',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 10 }
  },

  // ==========================================
  // 4. ADULT - URINARY TRACT / TIẾT NIỆU (P.10-11)
  // ==========================================
  {
    id: 'adult_uti_group1',
    site: 'urinary',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn Tiết niệu - Nhóm 1 (Ít nguy cơ VKĐK)',
    titleEn: 'Adult UTI - Group 1 (Low MDR Risk)',
    drugs: [
      {
        drugId: 'fosfomycin',
        nameVi: 'Fosfomycin uống (chỉ cho viêm bàng quang cấp E. coli)',
        nameEn: 'Fosfomycin PO',
        standardDoseVi: 'Gói 3g pha nước uống 1 liều duy nhất',
        hasDosingCalculator: true
      },
      {
        nameVi: 'Nitrofurantoin (viêm bàng quang cấp)',
        nameEn: 'Nitrofurantoin',
        standardDoseVi: '100mg PO mỗi 12 giờ x 5 ngày',
        hasDosingCalculator: false
      },
      {
        drugId: 'amox_clav',
        nameVi: 'Amoxicillin/Clavulanate',
        nameEn: 'Amoxicillin/Clavulanate',
        standardDoseVi: '1g IV q8h hoặc 875/125mg PO q12h',
        hasDosingCalculator: true
      },
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone (viêm đài bể thận / sốt)',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '1g - 2g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin (viêm đài bể thận cấp có nhiễm độc)',
        nameEn: 'Amikacin',
        standardDoseVi: '15 mg/kg IV mỗi 24 giờ',
        hasDosingCalculator: true
      }
    ],
    cautionVi: [
      'Không dùng Fosfomycin uống hoặc Nitrofurantoin cho Viêm đài bể thận hoặc Nhiễm khuẩn huyết do không đạt nồng độ trong nhu mô thận và máu!'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 11 }
  },
  {
    id: 'adult_uti_group2_esbl',
    site: 'urinary',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'esbl',
    titleVi: 'Nhiễm khuẩn Tiết niệu - Nhóm 2 + Nguy cơ ESBL',
    titleEn: 'Adult UTI - Group 2 + ESBL Risk',
    drugs: [
      {
        drugId: 'ertapenem',
        nameVi: 'Ertapenem (lựa chọn ưu tiên)',
        nameEn: 'Ertapenem',
        standardDoseVi: '1g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'meropenem',
        nameVi: 'Meropenem (khi bệnh nặng / sốc)',
        nameEn: 'Meropenem',
        standardDoseVi: '1g IV mỗi 8 giờ truyền kéo dài 3 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin',
        nameEn: 'Amikacin',
        standardDoseVi: '15 - 20 mg/kg IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'fosfomycin',
        nameVi: 'Fosfomycin IV (nếu có)',
        nameEn: 'Fosfomycin IV',
        standardDoseVi: '4g - 8g IV mỗi 8 giờ truyền kéo dài',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 11 }
  },
  {
    id: 'adult_uti_group2_enterococcus',
    site: 'urinary',
    population: 'adult',
    riskGroup: 'group_2',
    specificRisk: 'enterococcus',
    titleVi: 'Nhiễm khuẩn Tiết niệu - Nhóm 2 + Nguy cơ Enterococcus',
    titleEn: 'Adult UTI - Group 2 + Enterococcus Risk',
    drugs: [
      {
        drugId: 'amox_clav',
        nameVi: 'Amoxicillin/Clavulanate / Ampicillin',
        nameEn: 'Amox/Clav or Ampicillin',
        standardDoseVi: 'Ampicillin 2g IV q4-6h nếu còn nhạy',
        hasDosingCalculator: true
      },
      {
        drugId: 'vancomycin',
        nameVi: 'Vancomycin (khi kháng Ampicillin)',
        nameEn: 'Vancomycin',
        standardDoseVi: '15 - 20 mg/kg IV q8-12h',
        hasDosingCalculator: true
      },
      {
        drugId: 'teicoplanin',
        nameVi: 'Teicoplanin',
        nameEn: 'Teicoplanin',
        standardDoseVi: '6 mg/kg q12h x 3 liều, sau đó 6 mg/kg/ngày',
        hasDosingCalculator: true
      },
      {
        drugId: 'linezolid',
        nameVi: 'Linezolid (khi nghi ngờ VRE - đề kháng Vancomycin)',
        nameEn: 'Linezolid (if VRE)',
        standardDoseVi: '600mg IV/PO mỗi 12 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 11 }
  },

  // ==========================================
  // 5. ADULT - ASCITIC FLUID / PERITONEAL / DỊCH BÁNG (P.11-12)
  // ==========================================
  {
    id: 'adult_peritoneal_group1',
    site: 'peritoneal',
    population: 'adult',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn Dịch báng (SBP) - Nhóm 1',
    titleEn: 'Adult SBP / Ascitic Infection - Group 1',
    drugs: [
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone (lựa chọn hàng đầu)',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '2g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'cefotaxim',
        nameVi: 'Cefotaxime',
        nameEn: 'Cefotaxime',
        standardDoseVi: '2g IV mỗi 8 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 12 }
  },
  {
    id: 'adult_peritoneal_group2',
    site: 'peritoneal',
    population: 'adult',
    riskGroup: 'group_2',
    titleVi: 'Nhiễm khuẩn Dịch báng (SBP) - Nhóm 2 (Nguy cơ VKĐK / Đã dùng KS phòng ngừa)',
    titleEn: 'Adult SBP - Group 2 (High MDR Risk)',
    drugs: [
      {
        drugId: 'ertapenem',
        nameVi: 'Ertapenem',
        nameEn: 'Ertapenem',
        standardDoseVi: '1g IV mỗi 24 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'piperacillin_tazo',
        nameVi: 'Piperacillin/Tazobactam',
        nameEn: 'Piperacillin/Tazobactam',
        standardDoseVi: '4.5g IV mỗi 6 giờ',
        hasDosingCalculator: true
      },
      {
        drugId: 'meropenem',
        nameVi: 'Meropenem (khi suy gan cấp trên mạn CLIF-SOFA ≥ 12 hoặc sốc)',
        nameEn: 'Meropenem',
        standardDoseVi: '1g IV mỗi 8 giờ truyền kéo dài 3 giờ',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 12 }
  },

  // ==========================================
  // 6. PEDIATRIC - TRẺ EM (P.4-8)
  // ==========================================
  {
    id: 'peds_resp_group1',
    site: 'respiratory',
    population: 'pediatric',
    riskGroup: 'group_1',
    titleVi: 'Viêm phổi Trẻ em - Nhóm 1 (Ít nguy cơ VKĐK)',
    titleEn: 'Pediatric Pneumonia - Group 1',
    drugs: [
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '50 - 100 mg/kg/ngày IV chia 1 - 2 lần (tối đa 2g/ngày)',
        hasDosingCalculator: true
      },
      {
        drugId: 'cefotaxim',
        nameVi: 'Cefotaxime',
        nameEn: 'Cefotaxime',
        standardDoseVi: '100 - 150 mg/kg/ngày IV chia 3 - 4 lần',
        hasDosingCalculator: true
      },
      {
        drugId: 'amox_clav',
        nameVi: 'Amoxicillin/Clavulanate',
        nameEn: 'Amoxicillin/Clavulanate',
        standardDoseVi: '80 - 90 mg/kg/ngày (tính theo amox) PO chia 2 lần',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 4 }
  },
  {
    id: 'peds_sepsis_group1',
    site: 'sepsis',
    population: 'pediatric',
    riskGroup: 'group_1',
    titleVi: 'Nhiễm khuẩn huyết Trẻ em - Nhóm 1',
    titleEn: 'Pediatric Sepsis - Group 1',
    drugs: [
      {
        drugId: 'ceftriaxon',
        nameVi: 'Ceftriaxone',
        nameEn: 'Ceftriaxone',
        standardDoseVi: '100 mg/kg/ngày IV 1 lần (tối đa 2g)',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin / Gentamicin (phối hợp)',
        nameEn: 'Amikacin / Gentamicin',
        standardDoseVi: 'Amikacin 15-20 mg/kg/ngày IV; Gentamicin 5-7.5 mg/kg/ngày',
        hasDosingCalculator: true
      }
    ],
    combinationRulesVi: [
      'Trẻ ≤ 3 tháng: phối hợp thêm Ampicillin (150-200 mg/kg/ngày) để phòng Listeria monocytogenes.',
      'Nghi ngờ viêm màng não mủ hoặc phế cầu/tụ cầu: phối hợp thêm Vancomycin (60 mg/kg/ngày chia 4 lần).',
      'Chưa loại trừ vi khuẩn kỵ khí hoặc sốc độc tố do Streptococcus: phối hợp Clindamycin (30-40 mg/kg/ngày chia 3-4 lần).'
    ],
    source: { doc: 'BVBND_HDSDKS', page: 6 }
  },
  {
    id: 'peds_sepsis_group2',
    site: 'sepsis',
    population: 'pediatric',
    riskGroup: 'group_2',
    titleVi: 'Nhiễm khuẩn huyết Trẻ em - Nhóm 2 (Nguy cơ cao VKĐK)',
    titleEn: 'Pediatric Sepsis - Group 2 (High MDR Risk)',
    drugs: [
      {
        drugId: 'meropenem',
        nameVi: 'Meropenem',
        nameEn: 'Meropenem',
        standardDoseVi: '60 - 120 mg/kg/ngày IV chia 3 lần (20-40 mg/kg q8h, tối đa 2g q8h)',
        hasDosingCalculator: true
      },
      {
        drugId: 'imipenem',
        nameVi: 'Imipenem/Cilastatin',
        nameEn: 'Imipenem/Cilastatin',
        standardDoseVi: '60 - 100 mg/kg/ngày IV chia 4 lần (15-25 mg/kg q6h)',
        hasDosingCalculator: true
      },
      {
        drugId: 'piperacillin_tazo',
        nameVi: 'Piperacillin/Tazobactam',
        nameEn: 'Piperacillin/Tazobactam',
        standardDoseVi: '300 mg/kg/ngày IV chia 3 - 4 lần (100 mg/kg q8h)',
        hasDosingCalculator: true
      },
      {
        drugId: 'vancomycin',
        nameVi: 'Vancomycin (khi có nguy cơ MRSA / phế cầu kháng)',
        nameEn: 'Vancomycin',
        standardDoseVi: '60 mg/kg/ngày chia 4 lần (15 mg/kg q6h)',
        hasDosingCalculator: true
      },
      {
        drugId: 'amikacin',
        nameVi: 'Amikacin (phối hợp)',
        nameEn: 'Amikacin',
        standardDoseVi: '15 - 20 mg/kg/ngày IV chia 1 lần',
        hasDosingCalculator: true
      },
      {
        drugId: 'colistin',
        nameVi: 'Colistin (khi nghi ngờ vi khuẩn siêu kháng)',
        nameEn: 'Colistin',
        standardDoseVi: '75.000 - 150.000 UI/kg/ngày chia 3 lần',
        hasDosingCalculator: true
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 6 }
  }
];

export function findEmpiricRegimens(
  site: string,
  population: string,
  riskGroup: string,
  sepsisSource?: string,
  specificRisks: string[] = []
): EmpiricRegimen[] {
  return EMPIRIC_REGIMENS.filter(reg => {
    if (reg.population !== population) return false;
    if (reg.site !== site) return false;
    if (reg.riskGroup !== riskGroup) return false;
    if (site === 'sepsis' && sepsisSource && reg.sepsisSource && reg.sepsisSource !== sepsisSource) {
      return false;
    }
    if (riskGroup === 'group_2') {
      if (reg.specificRisk && !specificRisks.includes(reg.specificRisk)) {
        return false;
      }
    }
    return true;
  });
}
