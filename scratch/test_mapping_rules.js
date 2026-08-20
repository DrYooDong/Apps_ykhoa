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

// Map từng id -> { conditionKey, icd10: [...] }
const mappingRules = {
  // 1. Sepsis / ICU
  'guideline_2016_sepsis_3_consensus': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'] },
  'guideline_2018_tokyo_guidelines_tg18': { conditionKey: 'biliary-tract', icd10: ['K81', 'K81.0', 'K83.0', 'K80'] },
  'guideline_2020_byt_bach_hau_2957': { conditionKey: 'diphtheria', icd10: ['A36', 'A36.0', 'A36.9'] },
  'guideline_2020_byt_quan_ly_khang_sinh_5631': { conditionKey: 'ams-resistance', icd10: ['Z16', 'U82', 'U83', 'A49.02'] },
  'guideline_2020_jsge_peptic_ulcer_disease': { conditionKey: 'gerd-peptic', icd10: ['K25', 'K26', 'K27', 'K21'] },
  'guideline_2021_acg_ibs': { conditionKey: 'ibd', icd10: ['K58', 'K58.0', 'K58.9', 'K50', 'K51'] },
  'guideline_2021_acg_ugib': { conditionKey: 'ugib', icd10: ['K92.2', 'K92.0', 'I85.0', 'K25.0'] },
  'guideline_2021_aga_nafld_lifestyle': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  'guideline_2021_baveno_vii_portal_hypertension': { conditionKey: 'cirrhosis', icd10: ['K74', 'K70.3', 'I85', 'K76.6'] },
  'guideline_2021_byt_dieu_tri_hiv_aids_5968': { conditionKey: 'hiv-aids', icd10: ['B20', 'B24', 'Z21'] },
  'guideline_2021_byt_nhiem_nam_xam_lan_3429': { conditionKey: 'invasive-fungal', icd10: ['B49', 'B44', 'B37.7'] },
  'guideline_2021_ssc_soc_nhiem_khuan_sepsis3': { conditionKey: 'icu', icd10: ['A41', 'A41.9', 'R65.2', 'R57.2'] },
  'guideline_2022_easl_corticosteroid_viem_gan_ruou': { conditionKey: 'cirrhosis', icd10: ['K70.1', 'K70.3', 'K74'] },
  'guideline_2022_kdigo_aki_crrt': { conditionKey: 'aki', icd10: ['N17', 'N17.0', 'N17.9'] },
  'guideline_2022_vnha_tang_huyet_ap': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  'guideline_2023_ada_dai_thao_duong': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  'guideline_2023_byt_sot_ret_2699': { conditionKey: 'malaria', icd10: ['B50', 'B51', 'B52', 'B54'] },
  'guideline_2023_byt_sot_xuat_huyet_dengue_2760': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91'] },
  'guideline_2023_byt_tay_chan_mieng_2545': { conditionKey: 'hfmd', icd10: ['B08.4'] },
  'guideline_2023_byt_viem_gan_b_3310': { conditionKey: 'hepatitis-b', icd10: ['B18.0', 'B18.1', 'B16'] },
  'guideline_2023_byt_viem_gan_c_2065': { conditionKey: 'hepatitis-c', icd10: ['B18.2', 'B17.1'] },
  'guideline_2023_esc_acute_coronary_syndromes': { conditionKey: 'cad', icd10: ['I21', 'I20', 'I25', 'I22'] },
  'guideline_2023_esc_cardiomyopathies': { conditionKey: 'heart-failure', icd10: ['I42', 'I50', 'I50.9'] },
  'guideline_2023_esc_dai_thao_duong_tim_mach': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'I25', 'I50', 'E11.2'] },
  'guideline_2023_esc_endocarditis': { conditionKey: 'valvular-heart', icd10: ['I33', 'I33.0', 'I38'] },
  'guideline_2023_gold_copd': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  'guideline_2023_kdigo_ckd': { conditionKey: 'ckd', icd10: ['N18', 'N18.3', 'N18.5', 'N18.9'] },
  'guideline_2023_vnha_suy_tim': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  'guideline_2024_ada_dai_thao_duong': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  'guideline_2024_aasld_masld_practice_guidance': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  'guideline_2024_byt_chuan_bi_noi_soi_dai_trang': { conditionKey: 'solid-cancers', icd10: ['Z12.1', 'K63.5', 'C18'] },
  'guideline_2024_byt_hoi_suc_so_sinh_725': { conditionKey: 'icu', icd10: ['P21', 'P21.9', 'P29.0'] },
  'guideline_2024_byt_soi_142': { conditionKey: 'measles', icd10: ['B05', 'B05.9'] },
  'guideline_2024_byt_u_xo_tu_cung_321': { conditionKey: 'uterine-fibroids', icd10: ['D25', 'D25.9', 'N92.0'] },
  'guideline_2024_byt_viem_phoi_benh_vien_vap_726': { conditionKey: 'pneumonia', icd10: ['J15', 'J18', 'J18.9'] },
  'guideline_2024_byt_viem_phoi_cong_dong_727': { conditionKey: 'pneumonia', icd10: ['J18', 'J15', 'J13', 'J18.9'] },
  'guideline_2024_easl_masld_guideline': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  'guideline_2024_esc_af': { conditionKey: 'af', icd10: ['I48', 'I48.0', 'I48.9'] },
  'guideline_2024_esc_bp_htn': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  'guideline_2024_esc_chronic_coronary_syndromes': { conditionKey: 'cad', icd10: ['I25', 'I20', 'I25.1'] },
  'guideline_2024_esc_dong_mach_ngoai_bien_paod': { conditionKey: 'cad', icd10: ['I73.9', 'I70.2', 'I77.1'] },
  'guideline_2024_esc_valvular_heart_disease': { conditionKey: 'valvular-heart', icd10: ['I34', 'I35', 'I05', 'I08'] },
  'guideline_2024_gina_asthma': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  'guideline_2024_gold_copd': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  'guideline_2024_kdigo_anemia_ckd': { conditionKey: 'ckd', icd10: ['N18', 'D63.1', 'N18.9'] },
  'guideline_2024_kdigo_ckd': { conditionKey: 'ckd', icd10: ['N18', 'N18.3', 'N18.5', 'N18.9'] },
  'guideline_2024_kdigo_lupus_nephritis': { conditionKey: 'lupus-sle', icd10: ['M32.1', 'N08.5', 'M32'] },
  'guideline_2024_vnha_af': { conditionKey: 'af', icd10: ['I48', 'I48.0', 'I48.9'] },
  'guideline_2024_vnha_beo_phi_tim_mach': { conditionKey: 'obesity', icd10: ['E66', 'E66.0', 'I25', 'I50'] },
  'guideline_2024_vnha_cad_ccs': { conditionKey: 'cad', icd10: ['I25', 'I20', 'I25.1'] },
  'guideline_2024_vnha_suy_tim': { conditionKey: 'heart-failure', icd10: ['I50', 'I50.1', 'I50.9'] },
  'guideline_2024_vnha_tang_huyet_ap': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  'guideline_2025_ada_dai_thao_duong': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  'guideline_2025_apch_tang_huyet_ap_chau_a': { conditionKey: 'hypertension', icd10: ['I10', 'I11', 'I15'] },
  'guideline_2025_byt_cum_mua_568': { conditionKey: 'flu', icd10: ['J09', 'J10', 'J11'] },
  'guideline_2025_gold_copd': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  'guideline_2025_who_meningitis': { conditionKey: 'meningitis', icd10: ['G00', 'G01', 'G02', 'G03', 'A39'] },
  'guideline_2026_ada_standards_of_care': { conditionKey: 'diabetes-t2d', icd10: ['E11', 'E11.9', 'E11.2'] },
  'guideline_2026_byt_copd_cap_nhat': { conditionKey: 'copd', icd10: ['J44', 'J44.0', 'J44.1', 'J44.9'] },
  'guideline_2026_gina_asthma': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },

  // Studies / Trials
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
  'study_2023_danicopan_voyager_pnh': { conditionKey: 'solid-cancers', icd10: ['D59.5'] },
  'study_2024_air_supra_albuterol_budesonide': { conditionKey: 'asthma', icd10: ['J45', 'J45.0', 'J45.9'] },
  'study_2024_clarify_hd_viltolarsen': { conditionKey: 'neuro-emergencies', icd10: ['G71.0'] },
  'study_2024_dengue_takeda_vaccine_lancet': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91', 'Z24.6'] },
  'study_2024_flow_semaglutide_ckd': { conditionKey: 'ckd', icd10: ['N18', 'E11.2', 'N18.3'] },
  'study_2024_marburg_who_surveillance': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.3', 'A98'] },
  'study_2024_nipah_lancet_infect_dis': { conditionKey: 'hemorrhagic-fever', icd10: ['A98.8', 'B08'] },
  'study_2024_resmetirom_nash_mafld': { conditionKey: 'masld-mash', icd10: ['K76.0', 'K75.8'] },
  'study_2024_sunflower_laparoscopic_cholecystectomy': { conditionKey: 'biliary-tract', icd10: ['K80', 'K81'] },
  'study_2025_dengue_takeda_public_health': { conditionKey: 'hemorrhagic-fever', icd10: ['A90', 'A91', 'Z24.6'] },
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

let unmappedCount = 0;
guidelines.forEach(g => {
  if (!mappingRules[g.id]) {
    console.log('UNMAPPED GUIDELINE:', g.id, g.title);
    unmappedCount++;
  }
});

console.log('Total unmapped:', unmappedCount);
console.log('Total mapped rules:', Object.keys(mappingRules).length);
