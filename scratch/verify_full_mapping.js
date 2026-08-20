const fs = require('fs');

function parseCSV(text) {
  const lines = [];
  let row = [];
  let inQuotes = false;
  let curVal = '';
  
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const nextC = text[i+1];
    if (c === '"') {
      if (inQuotes && nextC === '"') {
        curVal += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(curVal);
      curVal = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && nextC === '\n') i++;
      row.push(curVal);
      curVal = '';
      if (row.length > 0 && row.some(x => x.trim().length > 0)) {
        lines.push(row);
      }
      row = [];
    } else {
      curVal += c;
    }
  }
  if (curVal.length > 0 || row.length > 0) {
    row.push(curVal);
    lines.push(row);
  }
  return lines;
}

const guideContent = fs.readFileSync('knowledge-vault/_resources/data/clinical_guidelines_rows.csv', 'utf8');
const guideRows = parseCSV(guideContent);
const guideHeader = guideRows[0];
const guidelines = guideRows.slice(1).map(r => {
  const obj = {};
  guideHeader.forEach((h, i) => obj[h.trim()] = r[i]);
  return obj;
});

// Map hoàn chỉnh 115 dòng guideline
const fullMapping = {
  // 1. guideline_2016_sepsis_3_consensus
  'guideline_2016_sepsis_3_consensus': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'] },
  // 2. guideline_2018_tokyo_guidelines_tg18
  'guideline_2018_tokyo_guidelines_tg18': { conditionKey: 'biliary-tract', icd10: ['K81', 'K81.0', 'K83.0', 'K80'] },
  // 3. guideline_2020_byt_bach_hau_2957
  'guideline_2020_byt_bach_hau_2957': { conditionKey: 'diphtheria', icd10: ['A36', 'A36.0', 'A36.9'] },
  // 4. guideline_2020_byt_quan_ly_khang_sinh_5631
  'guideline_2020_byt_quan_ly_khang_sinh_5631': { conditionKey: 'ams-resistance', icd10: ['Z16', 'U82', 'U83', 'A49.02'] },
  // 5. guideline_2020_jsge_peptic_ulcer_disease
  'guideline_2020_jsge_peptic_ulcer_disease': { conditionKey: 'gerd-peptic', icd10: ['K25', 'K26', 'K27', 'K21'] },
  // 6. guideline_2021_acg_ibs
  'guideline_2021_acg_ibs': { conditionKey: 'ibd', icd10: ['K58', 'K58.0', 'K58.9', 'K50', 'K51'] },
  // 7. guideline_2021_acg_ugib
  'guideline_2021_acg_ugib': { conditionKey: 'ugib', icd10: ['K92.2', 'K92.0', 'I85.0', 'K25.0'] },
  // 8. guideline_2021_aga_nafld_lifestyle
  'guideline_2021_aga_nafld_lifestyle': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  // 9. guideline_2021_baveno_vii_portal_hypertension
  'guideline_2021_baveno_vii_portal_hypertension': { conditionKey: 'cirrhosis', icd10: ['K74', 'K70.3', 'I85', 'K76.6'] },
  // 10. guideline_2021_byt_dieu_tri_hiv_aids_5968
  'guideline_2021_byt_dieu_tri_hiv_aids_5968': { conditionKey: 'hiv-aids', icd10: ['B20', 'B24', 'Z21'] },
  // 11. guideline_2021_byt_nhiem_nam_xam_lan_3429
  'guideline_2021_byt_nhiem_nam_xam_lan_3429': { conditionKey: 'invasive-fungal', icd10: ['B49', 'B44', 'B37.7'] },
  // 12. guideline_2021_ssc_soc_nhiem_khuan_sepsis3
  'guideline_2021_ssc_soc_nhiem_khuan_sepsis3': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'] },
  // 13. guideline_2022_easl_corticosteroid_viem_gan_ruou
  'guideline_2022_easl_corticosteroid_viem_gan_ruou': { conditionKey: 'cirrhosis', icd10: ['K70.1', 'K70.3', 'K74'] },
  // 14. guideline_2022_kdigo_aki_crrt
  'guideline_2022_kdigo_aki_crrt': { conditionKey: 'aki', icd10: ['N17', 'N17.0', 'N17.9'] },
  // 15. guideline_2022_vnha_tang_huyet_ap
  'guideline_2022_vnha_tang_huyet_ap': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  // 16. guideline_2023_ada_dai_thao_duong
  'guideline_2023_ada_dai_thao_duong': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  // 17. guideline_2023_byt_sot_ret_2699
  'guideline_2023_byt_sot_ret_2699': { conditionKey: 'malaria', icd10: ['B50', 'B51', 'B52', 'B54'] },
  // 18. guideline_2023_byt_sot_xuat_huyet_dengue_2760
  'guideline_2023_byt_sot_xuat_huyet_dengue_2760': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91'] },
  // 19. guideline_2023_byt_tay_chan_mieng_2545
  'guideline_2023_byt_tay_chan_mieng_2545': { conditionKey: 'hfmd', icd10: ['B08.4'] },
  // 20. guideline_2023_byt_viem_gan_b_3310
  'guideline_2023_byt_viem_gan_b_3310': { conditionKey: 'hepatitis-b', icd10: ['B18.0', 'B18.1', 'B16'] },
  // 21. guideline_2023_byt_viem_gan_c_2065
  'guideline_2023_byt_viem_gan_c_2065': { conditionKey: 'hepatitis-c', icd10: ['B18.2', 'B17.1'] },
  // 22. guideline_2023_esc_acute_coronary_syndromes
  'guideline_2023_esc_acute_coronary_syndromes': { conditionKey: 'cad', icd10: ['I21', 'I20', 'I25', 'I22'] },
  // 23. guideline_2023_esc_cardiomyopathies
  'guideline_2023_esc_cardiomyopathies': { conditionKey: 'heart-failure', icd10: ['I42', 'I50', 'I50.9'] },
  // 24. guideline_2023_esc_dai_thao_duong_tim_mach
  'guideline_2023_esc_dai_thao_duong_tim_mach': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'I25', 'I50', 'E11.2'] },
  // 25. guideline_2023_esc_endocarditis
  'guideline_2023_esc_endocarditis': { conditionKey: 'valvular-heart', icd10: ['I33', 'I33.0', 'I38'] },
  // 26. guideline_2023_gold_copd
  'guideline_2023_gold_copd': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  // 27. guideline_2023_kdigo_ckd
  'guideline_2023_kdigo_ckd': { conditionKey: 'ckd', icd10: ['N18', 'N18.3', 'N18.5', 'N18.9'] },
  // 28. guideline_2023_vnha_suy_tim
  'guideline_2023_vnha_suy_tim': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  // 29. guideline_2024_ada_dai_thao_duong
  'guideline_2024_ada_dai_thao_duong': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  // 30. guideline_2024_aasld_masld_practice_guidance
  'guideline_2024_aasld_masld_practice_guidance': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  // 31. guideline_2024_byt_chuan_bi_noi_soi_dai_trang
  'guideline_2024_byt_chuan_bi_noi_soi_dai_trang': { conditionKey: 'solid-cancers', icd10: ['Z12.1', 'K63.5', 'C18'] },
  // 32. guideline_2024_byt_hoi_suc_so_sinh_725
  'guideline_2024_byt_hoi_suc_so_sinh_725': { conditionKey: 'icu', icd10: ['P21', 'P21.9', 'P29.0'] },
  // 33. guideline_2024_byt_soi_142
  'guideline_2024_byt_soi_142': { conditionKey: 'measles', icd10: ['B05', 'B05.9'] },
  // 34. guideline_2024_byt_u_xo_tu_cung_321
  'guideline_2024_byt_u_xo_tu_cung_321': { conditionKey: 'uterine-fibroids', icd10: ['D25', 'D25.9', 'N92.0'] },
  // 35. guideline_2024_byt_viem_phoi_benh_vien_vap_726
  'guideline_2024_byt_viem_phoi_benh_vien_vap_726': { conditionKey: 'pneumonia', icd10: ['J15', 'J18', 'J18.9'] },
  // 36. guideline_2024_byt_viem_phoi_cong_dong_727
  'guideline_2024_byt_viem_phoi_cong_dong_727': { conditionKey: 'pneumonia', icd10: ['J18', 'J15', 'J13', 'J18.9'] },
  // 37. guideline_2024_easl_masld_guideline
  'guideline_2024_easl_masld_guideline': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  // 38. guideline_2024_esc_af
  'guideline_2024_esc_af': { conditionKey: 'af', icd10: ['I48', 'I48.0', 'I48.9'] },
  // 39. guideline_2024_esc_bp_htn
  'guideline_2024_esc_bp_htn': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  // 40. guideline_2024_esc_chronic_coronary_syndromes
  'guideline_2024_esc_chronic_coronary_syndromes': { conditionKey: 'cad', icd10: ['I25', 'I20', 'I25.1'] },
  // 41. guideline_2024_esc_dong_mach_ngoai_bien_paod
  'guideline_2024_esc_dong_mach_ngoai_bien_paod': { conditionKey: 'cad', icd10: ['I73.9', 'I70.2', 'I77.1'] },
  // 42. guideline_2024_esc_valvular_heart_disease
  'guideline_2024_esc_valvular_heart_disease': { conditionKey: 'valvular-heart', icd10: ['I34', 'I35', 'I05', 'I08'] },
  // 43. guideline_2024_gina_asthma
  'guideline_2024_gina_asthma': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  // 44. guideline_2024_gold_copd
  'guideline_2024_gold_copd': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  // 45. guideline_2024_kdigo_anemia_ckd
  'guideline_2024_kdigo_anemia_ckd': { conditionKey: 'ckd', icd10: ['N18', 'D63.1', 'N18.9'] },
  // 46. guideline_2024_kdigo_ckd
  'guideline_2024_kdigo_ckd': { conditionKey: 'ckd', icd10: ['N18', 'N18.3', 'N18.5', 'N18.9'] },
  // 47. guideline_2024_kdigo_lupus_nephritis
  'guideline_2024_kdigo_lupus_nephritis': { conditionKey: 'lupus-sle', icd10: ['M32.1', 'N08.5', 'M32'] },
  // 48. guideline_2024_nice_meningitis_ng240
  'guideline_2024_nice_meningitis_ng240': { conditionKey: 'meningitis', icd10: ['G00', 'G01', 'G02', 'G03', 'A39'] },
  // 49. guideline_2024_vnha_af
  'guideline_2024_vnha_af': { conditionKey: 'af', icd10: ['I48', 'I48.0', 'I48.9'] },
  // 50. guideline_2024_vnha_beo_phi_tim_mach
  'guideline_2024_vnha_beo_phi_tim_mach': { conditionKey: 'obesity', icd10: ['E66', 'E66.0', 'I25', 'I50'] },
  // 51. guideline_2024_vnha_cad_ccs
  'guideline_2024_vnha_cad_ccs': { conditionKey: 'cad', icd10: ['I25', 'I20', 'I25.1'] },
  // 52. guideline_2024_vnha_suy_tim
  'guideline_2024_vnha_suy_tim': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  // 53. guideline_2024_vnha_tang_huyet_ap
  'guideline_2024_vnha_tang_huyet_ap': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  // 54. guideline_2025_ada_dai_thao_duong
  'guideline_2025_ada_dai_thao_duong': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  // 55. guideline_2025_aha_acc_hypertension
  'guideline_2025_aha_acc_hypertension': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  // 56. guideline_2025_apch_tang_huyet_ap_chau_a
  'guideline_2025_apch_tang_huyet_ap_chau_a': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  // 57. guideline_2025_bsg_ibd_moran
  'guideline_2025_bsg_ibd_moran': { conditionKey: 'ibd', icd10: ['K50', 'K51', 'K52.9'] },
  // 58. guideline_2025_byt_benh_soi_1019
  'guideline_2025_byt_benh_soi_1019': { conditionKey: 'measles', icd10: ['B05', 'B05.9'] },
  // 59. guideline_2025_byt_benh_than_kinh_dtd
  'guideline_2025_byt_benh_than_kinh_dtd': { conditionKey: 'diabetes-t2d', icd10: ['E11.4', 'G63.2', 'E11'] },
  // 60. guideline_2025_byt_cum_mua_568
  'guideline_2025_byt_cum_mua_568': { conditionKey: 'flu', icd10: ['J09', 'J10', 'J11'] },
  // 61. guideline_2025_byt_cum_mua_1840
  'guideline_2025_byt_cum_mua_1840': { conditionKey: 'flu', icd10: ['J09', 'J10', 'J11'] },
  // 62. guideline_2025_dash_diet_hypertension_statpearls
  'guideline_2025_dash_diet_hypertension_statpearls': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'E66'] },
  // 63. guideline_2025_gold_copd
  'guideline_2025_gold_copd': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  // 64. guideline_2025_iap_acute_pancreatitis
  'guideline_2025_iap_acute_pancreatitis': { conditionKey: 'biliary-tract', icd10: ['K85', 'K85.9', 'K80.0'] },
  // 65. guideline_2025_who_meningitis
  'guideline_2025_who_meningitis': { conditionKey: 'meningitis', icd10: ['G00', 'G01', 'G02', 'G03', 'A39'] },
  // 66. guideline_2026_ada_standards_of_care
  'guideline_2026_ada_standards_of_care': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  // 67. guideline_2026_aha_acc_ada_asn_ckm_syndrome
  'guideline_2026_aha_acc_ada_asn_ckm_syndrome': { conditionKey: 'heart-failure', icd10: ['E11', 'N18', 'I50', 'I25'] },
  // 68. guideline_2026_apasl_chronic_hepatitis_b
  'guideline_2026_apasl_chronic_hepatitis_b': { conditionKey: 'hepatitis-b', icd10: ['B18.0', 'B18.1', 'B16'] },
  // 69. guideline_2026_byt_chi_dinh_nhap_vien_79
  'guideline_2026_byt_chi_dinh_nhap_vien_79': { conditionKey: 'icu', icd10: ['Z03', 'R65.2', 'A41'] },
  // 70. guideline_2026_byt_copd_cap_nhat
  'guideline_2026_byt_copd_cap_nhat': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  // 71. guideline_2026_byt_ebola_1505
  'guideline_2026_byt_ebola_1505': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.4', 'A98'] },
  // 72. guideline_2026_byt_u_xo_co_tu_cung_456
  'guideline_2026_byt_u_xo_co_tu_cung_456': { conditionKey: 'uterine-fibroids', icd10: ['D25', 'D25.9', 'N92.0'] },
  // 73. guideline_2026_byt_viem_phoi_cong_dong
  'guideline_2026_byt_viem_phoi_cong_dong': { conditionKey: 'pneumonia', icd10: ['J18', 'J15', 'J13', 'J18.9'] },
  // 74. guideline_2026_byt_virus_hanta_2372
  'guideline_2026_byt_virus_hanta_2372': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.5', 'J12.8', 'N08.0'] },
  // 75. guideline_2026_byt_virus_nipah
  'guideline_2026_byt_virus_nipah': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.8', 'B08', 'G04.8'] },
  // 76. guideline_2026_gina_asthma
  'guideline_2026_gina_asthma': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  // 77. guideline_2026_jsge_jsh_masld
  'guideline_2026_jsge_jsh_masld': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  // 78. guideline_2026_ssc_sepsis_shock_prescott
  'guideline_2026_ssc_sepsis_shock_prescott': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'] },
  // 79. guideline_2026_surviving_sepsis_pediatric
  'guideline_2026_surviving_sepsis_pediatric': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'] },
  // 80. guideline_2026_who_dementia_risk_reduction
  'guideline_2026_who_dementia_risk_reduction': { conditionKey: 'stroke', icd10: ['F03', 'G30', 'F01'] },
  // 81. guideline_acc_antihypertensive_pregnancy_2026
  'guideline_acc_antihypertensive_pregnancy_2026': { conditionKey: 'hypertension', icd10: ['O14', 'O13', 'I10'] },
  // 82. guideline_byt_hbv_2026
  'guideline_byt_hbv_2026': { conditionKey: 'hepatitis-b', icd10: ['B18.0', 'B18.1', 'B16'] },
  // 83. guideline_byt_lao_2024
  'guideline_byt_lao_2024': { conditionKey: 'tb', icd10: ['A15', 'A16', 'A19'] },
  // 84. guideline_erc_2021
  'guideline_erc_2021': { conditionKey: 'cardiogenic-shock', icd10: ['I46', 'I46.9', 'R09.2'] },
  // 85. guideline_hyperkalemia_vuna_vnaccemt_2026
  'guideline_hyperkalemia_vuna_vnaccemt_2026': { conditionKey: 'ckd', icd10: ['E87.5', 'N18', 'N17'] },
  // 86. guideline_idsa_amr_2026
  'guideline_idsa_amr_2026': { conditionKey: 'ams-resistance', icd10: ['Z16', 'U82', 'U83', 'A49.02'] },
  // 87. guideline_issva_2018
  'guideline_issva_2018': { conditionKey: 'hemangioma', icd10: ['D18', 'D18.0', 'Q28'] },
  // 88. guideline_jrs_copd_2th_2026
  'guideline_jrs_copd_2th_2026': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },

  // Studies
  'study_1': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  'study_2': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  'study_3': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'I25'] },
  'study_4': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'I25'] },
  'study_5': { conditionKey: 'ckd', icd10: ['N18', 'N18.3', 'E11.2'] },
  'study_6': { conditionKey: 'ckd', icd10: ['N18', 'N18.3', 'E11.2'] },
  'study_7': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  'study_8': { conditionKey: 'af', icd10: ['I48', 'I48.0', 'I48.9'] },
  'study_9': { conditionKey: 'af', icd10: ['I48', 'I48.0', 'I48.9'] },
  'study_10': { conditionKey: 'cad', icd10: ['I25', 'I20', 'I21'] },
  'study_11': { conditionKey: 'dyslipidemia', icd10: ['E78', 'E78.0', 'I25'] },
  'study_12': { conditionKey: 'dyslipidemia', icd10: ['E78', 'E78.0', 'I25'] },
  'study_13': { conditionKey: 'obesity', icd10: ['E66', 'E66.0', 'E66.9'] },
  'study_14': { conditionKey: 'obesity', icd10: ['E66', 'E66.0', 'E66.9'] },
  'study_15': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1'] },
  'study_16': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1'] },
  'study_17': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  'study_18': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  'study_19': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2'] },
  'study_20': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2'] },
  'study_21': { conditionKey: 'stroke', icd10: ['I63', 'I63.9', 'G45'] },
  'study_22': { conditionKey: 'stroke', icd10: ['I63', 'I63.9', 'G45'] },
  'study_1783608849340_ft8geb9jd': { conditionKey: 'ams-resistance', icd10: ['A41.01', 'A41.02', 'A49.02'] },
  'study_1783615193671_10j8695hy': { conditionKey: 'cirrhosis', icd10: ['K70', 'K70.3', 'K74'] },
  'study_1783645774879_tvow6fzc6': { conditionKey: 'tb', icd10: ['A15', 'O99.8', 'A16'] },
  'study_1783647198144_47alsfrq9': { conditionKey: 'solid-cancers', icd10: ['C53', 'Z12.4'] },
  'study_1783647960484_ct1gj3c7f': { conditionKey: 'osteoporosis', icd10: ['M81', 'E55.9', 'M80'] },
  'study_1783874294993_yjz84uitu': { conditionKey: 'cad', icd10: ['I25', 'I50', 'I10'] },
  'study_1784102700625_ai6idq5dz': { conditionKey: 'pneumonia', icd10: ['J15.6', 'J18', 'J15'] },
  'study_1784201252511_jcbmlv86w': { conditionKey: 'hypertension', icd10: ['I10', 'I15'] },
  'study_1784205417171_l1erx437u': { conditionKey: 'af', icd10: ['I48', 'I49', 'R00.2'] },
  'study_1784259671473_7cc1ujoru': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'Z16'] },
  'study_2009_nejm_macronutrient_diets': { conditionKey: 'clinical-nutrition', icd10: ['E66', 'E66.0', 'E88.81'] },
  'study_2015_empareg_outcome_zinman': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'I25', 'I50'] },
  'study_2020_hpd_weight_loss': { conditionKey: 'clinical-nutrition', icd10: ['E66', 'E66.0'] },
  'study_2020_low_carb_vs_low_fat_chawla': { conditionKey: 'clinical-nutrition', icd10: ['E66', 'E78', 'E11'] },
  'study_2023_cape_cod_hydrocortisone_pneumonia': { conditionKey: 'pneumonia', icd10: ['J18', 'J18.9', 'A41'] },
  'study_2023_danicopan_voyager_pnh': { conditionKey: 'solid-cancers', icd10: ['D59.5'] },
  'study_2023_wolbachia_yogyakarta': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91'] },
  'study_2024_air_supra_albuterol_budesonide': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  'study_2024_clarify_hd_viltolarsen': { conditionKey: 'neuro-emergencies', icd10: ['G71.0'] },
  'study_2024_dengue_takeda_vaccine_lancet': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91', 'Z24.6'] },
  'study_2024_flow_semaglutide_ckd': { conditionKey: 'ckd', icd10: ['N18', 'E11.2', 'N18.3'] },
  'study_2024_marburg_who_surveillance': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.3', 'A98'] },
  'study_2024_nipah_lancet_infect_dis': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.8', 'B08'] },
  'study_2024_resmetirom_nash_mafld': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  'study_2024_sunflower_laparoscopic_cholecystectomy': { conditionKey: 'biliary-tract', icd10: ['K80', 'K81'] },
  'study_2025_circulating_lncrnas_severe_dengue': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91'] },
  'study_2025_dengue_takeda_public_health': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91', 'Z24.6'] },
  'study_2025_efficacy_public_health_impact_takeda_dengue_vaccine': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91', 'Z24.6'] },
  'study_2025_glp1_nutrition_interventions': { conditionKey: 'clinical-nutrition', icd10: ['E66', 'E46', 'E88.81'] },
  'study_2025_il10_profiles_dengue_vietnam': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91'] },
  'study_2026_ards_molecular_biomedicine_tan': { conditionKey: 'ards', icd10: ['J80', 'R09.2', 'A41'] },
  'study_2026_bp_management_neurologic_emergencies_wagstaff': { conditionKey: 'neuro-emergencies', icd10: ['I61', 'I60', 'I63', 'I10'] },
  'study_2026_fob_sputum_negative_tb_chauda': { conditionKey: 'tb', icd10: ['A15', 'A16', 'A15.0'] },
  'study_2026_logical_trial_cardiac_arrest': { conditionKey: 'cardiogenic-shock', icd10: ['I46', 'I46.9', 'R09.2'] },
  'study_2026_med_diet_secondary_prevention': { conditionKey: 'cad', icd10: ['I25', 'I20', 'E78'] },
  'study_2026_mrsa_nature_reviews': { conditionKey: 'ams-resistance', icd10: ['A49.02', 'U82', 'A41.02'] },
  'study_2026_nutrition_critically_ill_patel': { conditionKey: 'clinical-nutrition', icd10: ['E46', 'E43', 'E44', 'Z51.8'] },
  'study_2026_plant_based_diets_alblaji': { conditionKey: 'clinical-nutrition', icd10: ['E66', 'E78', 'E11', 'I25'] },
  'study_2026_predict_aedh_trial': { conditionKey: 'neuro-emergencies', icd10: ['S06.4', 'S06', 'I62.1'] },
  'study_2026_prone_positioning_ards': { conditionKey: 'ards', icd10: ['J80', 'R09.2', 'A41'] },
  'study_2026_sodium_bicarbonate_severe_acidemia_icu': { conditionKey: 'icu', icd10: ['E87.2', 'A41', 'R65.2'] },
  'study_2026_syncope_nejm': { conditionKey: 'syncope', icd10: ['R55', 'I95.1', 'I49'] },
  'study_2026_years_active_cancer': { conditionKey: 'vte-pe', icd10: ['I26', 'I26.9', 'C80'] },
  'study_ada_diabetes_2026': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  'study_ai_cap_108_2026': { conditionKey: 'pneumonia', icd10: ['J18', 'J15', 'J18.9'] },
  'study_antibiotics_basics_2026': { conditionKey: 'ams-resistance', icd10: ['Z16', 'U82', 'A49.02', 'A41'] },
  'study_bb_ccb_interaction_2026': { conditionKey: 'hypertension', icd10: ['I10', 'I50', 'I48'] },
  'study_byt_copd_2026': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  'study_byt2020': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  'study_ca_the_hoa_beta_lactam_2026': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R57.2'] },
  'study_cavernous_hemangioma_tongue_2024': { conditionKey: 'hemangioma', icd10: ['D18.0', 'D18', 'K14.8'] },
  'study_crrt_ai_choray_2026': { conditionKey: 'aki', icd10: ['N17', 'N17.0', 'N17.9', 'Z99.2'] },
  'study_gina_asthma_2026': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  'study_kopp_thyroid_storm_2026': { conditionKey: 'thyroid', icd10: ['E05.5', 'E05', 'E05.0'] },
  'study_mental_health_qol_cancer_2026': { conditionKey: 'solid-cancers', icd10: ['C80', 'F41.9', 'Z51.5'] },
  'study_mews_a9_bachmai_2026': { conditionKey: 'icu', icd10: ['R65.2', 'A41', 'R57.2'] },
  'study_oral_hemangiomas_2026': { conditionKey: 'hemangioma', icd10: ['D18.0', 'D18', 'K13.7'] },
  'study_panditray_adult_hemangioma_2018': { conditionKey: 'hemangioma', icd10: ['D18.0', 'D18'] },
  'study_schadler_petechiae_2022': { conditionKey: 'epilepsy', icd10: ['G40', 'G40.9', 'R23.3'] },
  'study_shekhar_cardiogenic_shock_2026': { conditionKey: 'cardiogenic-shock', icd10: ['R57.0', 'I50', 'I21'] },
  'study_sot_xuat_huyet_dengue_2023': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91'] },
  'study_who_meningitis_2025': { conditionKey: 'meningitis', icd10: ['G00', 'G01', 'G02', 'G03', 'A39'] }
};

console.log('Target guidelines count:', guidelines.length);
let missing = 0;
guidelines.forEach((g, idx) => {
  if (!fullMapping[g.id]) {
    console.log(`[MISSING] index ${idx+1}: ${g.id} -> ${g.title}`);
    missing++;
  }
});

console.log('Total mapped rules:', Object.keys(fullMapping).length);
console.log('Total unmapped in 115:', missing);

if (missing === 0) {
  console.log('✅ ALL 115 GUIDELINES ARE 100% COVERED BY MAPPING RULES!');
}
