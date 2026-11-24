/**
 * CliniPortal 2.0 — One-Time Surgical Migration: Studies from Guidelines -> Research Vault
 * Path: src/content/ebm/research/tools/migrate_studies_from_gdl.js
 *
 * Moves 27 pure research/study MDX files + their referenced images out of
 * src/content/ebm/guidelines/kho-guidelines/ into src/content/ebm/research/kho-nghien-cuu/,
 * enriches YAML frontmatter with the 7-Axis Shared Label Schema, and preserves 100% body content.
 */

const fs = require('fs');
const path = require('path');

const GDL_DIR = path.resolve(__dirname, '../../guidelines/kho-guidelines');
const GDL_IMG_DIR = path.join(GDL_DIR, 'images');
const RES_DIR = path.resolve(__dirname, '../kho-nghien-cuu');
const RES_IMG_DIR = path.join(RES_DIR, 'images');

const STUDY_ENRICHMENTS = {
  '2015-nejm-empareg-outcome': {
    trialAcronym: 'EMPA-REG OUTCOME',
    doi: '10.1056/NEJMoa1504720',
    nctId: 'NCT01131676',
    conditionKey: 'heart-failure',
    problemLabels: ['t2dm-ascvd', 'cardiovascular-mortality', 'heart-failure-hospitalization'],
    design: 'rct',
    phase: 'Phase III',
    blinding: 'double-blind',
    centerScope: 'multicenter-intl',
    hypothesisType: 'superiority',
    followUpDuration: '3.1 năm',
    populationTags: ['t2dm', 'established-ascvd', 'adults'],
    interventionClass: 'sglt2i',
    comparatorType: 'placebo',
    primaryEndpointCategory: 'mace',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'high',
    fundingSource: 'industry-pharma',
    topicTags: ['sglt2i', 'bao-ve-tim-than', 'du-phong-thu-phat'],
    primaryMetric: {
      measure: 'HR',
      interventionRate: '10.5% (490/4687)',
      controlRate: '12.1% (282/2333)',
      effectEstimate: 0.86,
      ciLower: 0.74,
      ciUpper: 0.99,
      pValue: '0.04',
      nnt: 62
    },
    safetyHighlight: 'Tăng nhiễm nấm sinh dục; không tăng hạ đường huyết hay DKA có ý nghĩa ở liều chuẩn'
  },
  '2026-nejm-staree-atorvastatin-elderly': {
    trialAcronym: 'STAREE',
    nctId: 'NCT04026217',
    conditionKey: 'dyslipidemia',
    problemLabels: ['primary-prevention', 'older-adults-70plus', 'disability-free-survival'],
    design: 'rct',
    phase: 'Phase IV Pragmatic',
    blinding: 'double-blind',
    centerScope: 'multicenter-intl',
    hypothesisType: 'superiority',
    followUpDuration: '5.9 năm',
    populationTags: ['elderly-70plus', 'community-dwelling', 'no-prior-cvd'],
    interventionClass: 'statin',
    comparatorType: 'placebo',
    primaryEndpointCategory: 'mace',
    outcomeDirection: 'mixed-coprimary',
    impactVerdict: 'practice-informing',
    robOverall: 'low',
    gradeCertainty: 'high',
    fundingSource: 'public-academic',
    topicTags: ['statin', 'du-phong-tien-phat', 'lao-khoa', 'ket-cuc-kep'],
    primaryMetric: {
      measure: 'HR',
      effectEstimate: 0.70,
      ciLower: 0.61,
      ciUpper: 0.82,
      rawDiffText: 'MACE: HR 0.70 (0.61–0.82) | Sống không tàn tật: HR 0.94 (0.84–1.05, p=0.25)',
      pValue: '<0.001',
      nnt: 37
    },
    safetyHighlight: 'Tăng biến cố gan mật (3.3% vs 0.9%) và ĐTĐ mới khởi phát (4.0% vs 2.7%); không tăng sa sút trí tuệ'
  },
  '2023-nejm-cape-cod-hydrocortisone-severe-cap': {
    trialAcronym: 'CAPE COD',
    doi: '10.1056/NEJMoa2215145',
    nctId: 'NCT02517489',
    conditionKey: 'pneumonia',
    problemLabels: ['severe-cap', 'icu-respiratory-failure', 'mortality-28d'],
    design: 'rct',
    phase: 'Phase III',
    blinding: 'double-blind',
    centerScope: 'multicenter-national',
    hypothesisType: 'superiority',
    followUpDuration: '28 ngày',
    populationTags: ['icu-adults', 'severe-cap-non-septic-shock'],
    interventionClass: 'systemic-corticosteroid',
    comparatorType: 'placebo',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'high',
    fragilityIndex: 7,
    fundingSource: 'public-academic',
    topicTags: ['corticoid-icu', 'viem-phoi-nang', 'giam-dat-nkq'],
    primaryMetric: {
      measure: 'RR',
      interventionRate: '6.2% (25/400)',
      controlRate: '11.9% (47/395)',
      effectEstimate: 0.53,
      ciLower: 0.33,
      ciUpper: 0.84,
      rawDiffText: 'ARR -5.6% (95% CI -9.6% đến -1.7%)',
      pValue: '0.006',
      nnt: 18
    },
    safetyHighlight: 'Tăng nhu cầu Insulin nội viện; không tăng nhiễm trùng bệnh viện hoặc xuất huyết tiêu hóa'
  },
  '2026-nutrients-probiotics-phytonutrients-gut-barrier': {
    conditionKey: 'gut-health',
    problemLabels: ['gut-barrier-integrity', 'bowel-regularity', 'microbiome'],
    design: 'rct',
    phase: 'Phase II/III',
    blinding: 'double-blind',
    centerScope: 'single-center',
    hypothesisType: 'superiority',
    followUpDuration: '8 tuần',
    populationTags: ['adults', 'functional-gi-symptoms'],
    interventionClass: 'nutrition-microbiome',
    comparatorType: 'placebo',
    primaryEndpointCategory: 'clinical-recovery',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'hypothesis-generating',
    robOverall: 'some-concerns',
    gradeCertainty: 'moderate',
    topicTags: ['probiotics', 'hang-rao-ruot', 'he-vi-sinh']
  },
  '2025-cureus-statin-cvd-outcomes': {
    trialAcronym: 'STATIN-CVD META',
    conditionKey: 'dyslipidemia',
    problemLabels: ['primary-prevention', 'secondary-prevention', 'cvd-risk-reduction'],
    design: 'meta-analysis',
    blinding: 'mixed',
    centerScope: 'multicenter-intl',
    hypothesisType: 'superiority',
    populationTags: ['high-cvd-risk', 'adults-pooled'],
    interventionClass: 'statin',
    comparatorType: 'placebo-or-standard',
    primaryEndpointCategory: 'mace',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'confirmatory',
    robOverall: 'some-concerns',
    gradeCertainty: 'moderate',
    topicTags: ['statin', 'meta-analysis', 'du-phong-tim-mach'],
    primaryMetric: {
      measure: 'RR',
      effectEstimate: 0.75,
      ciLower: 0.70,
      ciUpper: 0.81,
      pValue: '<0.001'
    }
  },
  '2020-nutrients-lowcarb-vs-lowfat': {
    trialAcronym: 'LOWCARB-LOWFAT META',
    conditionKey: 'obesity',
    problemLabels: ['weight-loss', 'cardiometabolic-markers', 'dietary-comparison'],
    design: 'meta-analysis',
    centerScope: 'multicenter-intl',
    hypothesisType: 'superiority',
    followUpDuration: '6–24 tháng',
    populationTags: ['overweight-obesity', 'metabolic-syndrome'],
    interventionClass: 'nutrition-microbiome',
    comparatorType: 'active-control',
    primaryEndpointCategory: 'metabolic-control',
    outcomeDirection: 'mixed-coprimary',
    impactVerdict: 'practice-informing',
    robOverall: 'some-concerns',
    gradeCertainty: 'moderate',
    topicTags: ['dinh-duong-chuyen-hoa', 'low-carb', 'giam-can']
  },
  '2024-systemic-antibiotic-ssti': {
    conditionKey: 'ssti',
    problemLabels: ['purulent-ssti', 'non-purulent-cellulitis', 'mrsa-coverage'],
    design: 'systematic-review',
    centerScope: 'multicenter-intl',
    populationTags: ['adults-pediatrics', 'ssti-outpatient-inpatient'],
    interventionClass: 'antimicrobial-pkpd',
    comparatorType: 'active-control',
    primaryEndpointCategory: 'clinical-recovery',
    outcomeDirection: 'non-inferior',
    impactVerdict: 'practice-informing',
    robOverall: 'some-concerns',
    gradeCertainty: 'moderate',
    topicTags: ['khang-sinh', 'nhiem-trung-da-mo-mem', 'mrsa']
  },
  '2026-ijmpr-dengue-serum-sodium-hyponatremia': {
    conditionKey: 'dengue-fever',
    problemLabels: ['dengue-electrolytes', 'hyponatremia', 'severe-dengue-prognosis'],
    design: 'prospective-cohort',
    centerScope: 'single-center',
    populationTags: ['hospitalized-dengue', 'asian-cohort'],
    interventionClass: 'fluid-electrolyte-acidbase',
    comparatorType: 'severity-strata',
    primaryEndpointCategory: 'severity-prognosis',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'some-concerns',
    gradeCertainty: 'low',
    asianData: true,
    topicTags: ['dengue', 'ha-natri-mau', 'roi-loan-dien-giai', 'tien-luong']
  },
  '2020-cureus-dengue-electrolyte-imbalance': {
    conditionKey: 'dengue-fever',
    problemLabels: ['dengue-electrolytes', 'hyponatremia', 'length-of-stay', 'mortality'],
    design: 'retrospective-cohort',
    centerScope: 'single-center',
    populationTags: ['hospitalized-dengue', 'asian-cohort'],
    interventionClass: 'fluid-electrolyte-acidbase',
    comparatorType: 'normal-electrolytes',
    primaryEndpointCategory: 'severity-prognosis',
    outcomeDirection: 'neutral-null',
    impactVerdict: 'hypothesis-generating',
    robOverall: 'some-concerns',
    gradeCertainty: 'low',
    asianData: true,
    topicTags: ['dengue', 'ha-natri-mau', 'roi-loan-dien-giai', 'ket-qua-am-tinh']
  },
  '2017-infection-nlr-mlr-fever': {
    doi: '10.1007/s15010-016-0972-1',
    conditionKey: 'sepsis',
    problemLabels: ['acute-fever-triage', 'nlr-mlr-biomarker', 'bacterial-vs-noninfectious'],
    design: 'diagnostic-accuracy',
    centerScope: 'single-center',
    populationTags: ['hospitalized-fever', 'ed-adults'],
    interventionClass: 'biomarker-diagnostics',
    comparatorType: 'crp-wbc-standard',
    primaryEndpointCategory: 'diagnostic-performance',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'some-concerns',
    gradeCertainty: 'moderate',
    topicTags: ['dau-an-sinh-hoc', 'nlr-mlr', 'chan-doan-sot', 'sepsis']
  },
  '2021-diagnostics-cbc-sepsis': {
    doi: '10.3390/diagnostics11101881',
    conditionKey: 'sepsis',
    problemLabels: ['early-sepsis-detection', 'cbc-cell-population-data', 'mdw-nlr'],
    design: 'diagnostic-accuracy',
    centerScope: 'multicenter-intl',
    populationTags: ['ed-icu-suspected-sepsis'],
    interventionClass: 'biomarker-diagnostics',
    comparatorType: 'procalcitonin-crp',
    primaryEndpointCategory: 'diagnostic-performance',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'not-applicable',
    gradeCertainty: 'moderate',
    topicTags: ['dau-an-sinh-hoc', 'cbc-cpd', 'sepsis', 'nlr-mlr']
  },
  '2026-chest-toan-chuyen-hoa': {
    trialAcronym: 'BICAR-ICU Synthesis',
    conditionKey: 'metabolic-acidosis',
    problemLabels: ['severe-metabolic-acidemia', 'aki-kdigo-2-3', 'sodium-bicarbonate-iv'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['icu-acidemia-ph-le-7.20', 'septic-aki'],
    interventionClass: 'fluid-electrolyte-acidbase',
    comparatorType: 'standard-of-care',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'mixed-coprimary',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'moderate',
    topicTags: ['toan-chuyen-hoa', 'bicarbonate', 'aki-icu', 'loc-mau'],
    primaryMetric: {
      measure: 'RR',
      effectEstimate: 0.76,
      ciLower: 0.60,
      ciUpper: 0.96,
      rawDiffText: 'Phân nhóm AKI KDIGO 2–3: Giảm tử vong 28 ngày & giảm nhu cầu RRT',
      pValue: '0.017'
    }
  },
  '2026-dash-diet-hypertension': {
    trialAcronym: 'DASH-SODIUM Synthesis',
    conditionKey: 'hypertension',
    problemLabels: ['blood-pressure-reduction', 'sodium-restriction', 'lifestyle-therapy'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['prehypertension-stage1-htn', 'adults'],
    interventionClass: 'nutrition-microbiome',
    comparatorType: 'control-western-diet',
    primaryEndpointCategory: 'metabolic-control',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'high',
    topicTags: ['tang-huyet-ap', 'che-do-an-dash', 'giam-muoi']
  },
  '2026-diagnostics-lao-thai-ky': {
    conditionKey: 'tb',
    problemLabels: ['tb-in-pregnancy', 'mdr-tb-perinatal', 'maternal-fetal-outcomes'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['pregnant-postpartum', 'active-or-latent-tb'],
    interventionClass: 'antimicrobial-pkpd',
    comparatorType: 'standard-of-care',
    primaryEndpointCategory: 'organ-protection',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'not-applicable',
    gradeCertainty: 'moderate',
    topicTags: ['lao-thai-ky', 'khang-sinh', 'an-toan-thai-nhi']
  },
  '2026-icm-namsap-ards': {
    trialAcronym: 'PROSEVA & Prone ARDS',
    conditionKey: 'ards',
    problemLabels: ['moderate-severe-ards', 'prone-positioning', 'ventilator-induced-lung-injury'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['icu-mechanically-ventilated', 'pf-ratio-lt-150'],
    interventionClass: 'respiratory-support',
    comparatorType: 'supine-ventilation',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'high',
    topicTags: ['ards', 'thong-khi-nam-sap', 'hoi-suc-ho-hap'],
    primaryMetric: {
      measure: 'HR',
      effectEstimate: 0.39,
      ciLower: 0.25,
      ciUpper: 0.63,
      rawDiffText: 'PROSEVA Tử vong 28 ngày: 16.0% vs 32.8%',
      pValue: '<0.001',
      nnt: 6
    }
  },
  '2026-icu-ca-the-hoa-beta-lactam': {
    conditionKey: 'sepsis',
    problemLabels: ['prolonged-infusion-betalactam', 'tdm-pkpd', 'augmented-renal-clearance'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['icu-sepsis-septic-shock'],
    interventionClass: 'antimicrobial-pkpd',
    comparatorType: 'intermittent-bolus',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'high',
    topicTags: ['khang-sinh', 'beta-lactam', 'pk-pd-icu', 'sepsis'],
    primaryMetric: {
      measure: 'RR',
      effectEstimate: 0.86,
      ciLower: 0.78,
      ciUpper: 0.95,
      rawDiffText: 'Truyền kéo dài vs Bolus ngắt quãng giảm tử vong 90 ngày ở Sepsis nặng',
      pValue: '0.004'
    }
  },
  '2026-icu-khang-sinh-cho-bn-nang': {
    conditionKey: 'sepsis',
    problemLabels: ['empiric-icu-antibiotics', 'crrt-ecmo-dosing', 'de-escalation'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['icu-critically-ill', 'crrt-ecmo'],
    interventionClass: 'antimicrobial-pkpd',
    comparatorType: 'standard-dosing',
    primaryEndpointCategory: 'clinical-recovery',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'not-applicable',
    gradeCertainty: 'moderate',
    topicTags: ['khang-sinh', 'pk-pd-icu', 'crrt-ecmo']
  },
  '2026-jcrc-cai-thuoc-van-mach': {
    conditionKey: 'sepsis',
    problemLabels: ['vasopressor-weaning-order', 'norepinephrine-vs-vasopressin', 'immortal-time-bias'],
    design: 'systematic-review',
    centerScope: 'multicenter-intl',
    populationTags: ['septic-shock-recovering', 'dual-vasopressor'],
    interventionClass: 'vasopressor-hemodynamics',
    comparatorType: 'active-control',
    primaryEndpointCategory: 'severity-prognosis',
    outcomeDirection: 'neutral-null',
    impactVerdict: 'practice-informing',
    robOverall: 'high',
    gradeCertainty: 'low',
    topicTags: ['thuoc-van-mach', 'soc-nhiem-khuan', 'sai-lech-phuong-phap']
  },
  '2026-lww-khang-sinh-co-ban': {
    conditionKey: 'amr-mrsa',
    problemLabels: ['antimicrobial-mechanisms', 'resistance-mechanisms', 'stewardship'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['bacterial-infections'],
    interventionClass: 'antimicrobial-pkpd',
    comparatorType: 'standard-of-care',
    primaryEndpointCategory: 'clinical-recovery',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'confirmatory',
    robOverall: 'not-applicable',
    gradeCertainty: 'high',
    topicTags: ['khang-sinh', 'de-khang-khang-sinh', 'pk-pd-icu']
  },
  '2026-mbm-tongquan-ards': {
    conditionKey: 'ards',
    problemLabels: ['ards-global-definition', 'lung-protective-ventilation', 'peep-titration'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['icu-ards-patients'],
    interventionClass: 'respiratory-support',
    comparatorType: 'conventional-ventilation',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'confirmatory',
    robOverall: 'not-applicable',
    gradeCertainty: 'high',
    topicTags: ['ards', 'hoi-suc-ho-hap', 'ards-network']
  },
  '2026-nature-reviews-mrsa': {
    conditionKey: 'amr-mrsa',
    problemLabels: ['mrsa-bacteremia', 'vancomycin-vs-daptomycin', ' decolonization'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['hospital-community-mrsa'],
    interventionClass: 'antimicrobial-pkpd',
    comparatorType: 'active-control',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'practice-informing' ? 'non-inferior' : 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'not-applicable',
    gradeCertainty: 'high',
    topicTags: ['mrsa', 'khang-sinh', 'de-khang-khang-sinh']
  },
  '2026-nejm-ngat': {
    conditionKey: 'syncope',
    problemLabels: ['ed-syncope-risk-stratification', 'cardiac-vs-reflex-syncope', 'canadian-syncope-risk-score'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['ed-syncope-adults'],
    interventionClass: 'biomarker-diagnostics',
    comparatorType: 'unstructured-admission',
    primaryEndpointCategory: 'diagnostic-performance',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'not-applicable',
    gradeCertainty: 'high',
    topicTags: ['ngat-syncope', 'phan-tang-cap-cuu', 'tim-mach']
  },
  '2025-curropinneurol-viral-encephalitis-update': {
    conditionKey: 'viral-encephalitis',
    problemLabels: ['hsv-encephalitis', 'arboviral-encephalitis', 'metagenomic-ngs'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['acute-encephalitis-syndrome'],
    interventionClass: 'neuro-critical-care',
    comparatorType: 'standard-of-care',
    primaryEndpointCategory: 'organ-protection',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'not-applicable',
    gradeCertainty: 'moderate',
    topicTags: ['viem-nao-virus', 'than-kinh', 'chan-doan-phan-tu']
  },
  '2025-lancet-tetanus': {
    conditionKey: 'tetanus',
    problemLabels: ['generalized-tetanus', 'autonomic-dysfunction', 'intrathecal-antitoxin', 'magnesium-sulfate'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['severe-tetanus-icu', 'asian-cohort'],
    interventionClass: 'neuro-critical-care',
    comparatorType: 'standard-of-care',
    primaryEndpointCategory: 'mortality',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'low',
    gradeCertainty: 'high',
    asianData: true,
    topicTags: ['uon-van', 'oucru-viet-nam', 'roi-loan-than-kinh-thuc-vat']
  },
  '2018-fukui-refractory-ascites-management': {
    conditionKey: 'refractory-ascites',
    problemLabels: ['cirrhosis-refractory-ascites', 'lvp-albumin', 'tips-vs-paracentesis', 'tolvaptan'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['decompensated-cirrhosis', 'asian-cohort'],
    interventionClass: 'hepatology-portal',
    comparatorType: 'diuretics-alone',
    primaryEndpointCategory: 'organ-protection',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-informing',
    robOverall: 'not-applicable',
    gradeCertainty: 'moderate',
    asianData: true,
    topicTags: ['xo-gan', 'co-truong-khang-tri', 'albumin-tips']
  },
  '2014-ajr-nang-gan': {
    conditionKey: 'cystic-hepatic-lesions',
    problemLabels: ['hepatic-cyst-differential', 'ct-mri-ultrasound-features', 'biliary-cystadenoma'],
    design: 'diagnostic-accuracy',
    centerScope: 'multicenter-intl',
    populationTags: ['incidental-or-symptomatic-liver-cyst'],
    interventionClass: 'biomarker-diagnostics',
    comparatorType: 'histopathology-gold-standard',
    primaryEndpointCategory: 'diagnostic-performance',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'not-applicable',
    gradeCertainty: 'high',
    topicTags: ['chan-doan-hinh-anh', 'nang-gan', 'gan-mat']
  },
  '2026-lancet-hiv-hepatitis-coinfection': {
    conditionKey: 'hiv-hepatitis-coinfection',
    problemLabels: ['hiv-hbv-hcv-hdv', 'tenofovir-sparing-flare-risk', 'bulevirtide-daa'],
    design: 'clinical-review',
    centerScope: 'multicenter-intl',
    populationTags: ['people-living-with-hiv', 'viral-hepatitis-coinfection'],
    interventionClass: 'hepatology-portal',
    comparatorType: 'standard-art',
    primaryEndpointCategory: 'organ-protection',
    outcomeDirection: 'positive-superior',
    impactVerdict: 'practice-changing',
    robOverall: 'not-applicable',
    gradeCertainty: 'high',
    topicTags: ['hiv', 'viem-gan-virus', 'dong-nhiem']
  }
};

function serializeYamlValue(val, indent = '') {
  if (Array.isArray(val)) {
    return JSON.stringify(val);
  }
  if (val && typeof val === 'object') {
    const subLines = Object.entries(val)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => {
        const formatted = typeof v === 'number' || typeof v === 'boolean' ? String(v) : JSON.stringify(String(v));
        return `${indent}  ${k}: ${formatted}`;
      });
    return `\n${subLines.join('\n')}`;
  }
  if (typeof val === 'number' || typeof val === 'boolean') return String(val);
  return JSON.stringify(String(val));
}

function injectOrReplaceFrontmatterFields(rawContent, extraFields) {
  const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n[\s\S]*)$/);
  if (!fmMatch) return rawContent;

  let fmBody = fmMatch[1];
  let mdxBody = fmMatch[2];

  // Ensure category: "research"
  if (/^category:\s*.+$/m.test(fmBody)) {
    fmBody = fmBody.replace(/^category:\s*.+$/m, 'category: "research"');
  } else {
    fmBody += '\ncategory: "research"';
  }

  for (const [key, val] of Object.entries(extraFields)) {
    if (val === undefined) continue;
    const serialized = serializeYamlValue(val);
    const singleLineRe = new RegExp(`^${key}:\\s*[^\\r\\n]+$`, 'm');
    if (singleLineRe.test(fmBody) && typeof val !== 'object') {
      fmBody = fmBody.replace(singleLineRe, `${key}: ${serialized}`);
    } else if (!new RegExp(`^${key}:`, 'm').test(fmBody)) {
      fmBody += `\n${key}: ${serialized}`;
    }
  }

  // Update back-links inside MDX body to point to CliniResearch Studio
  mdxBody = mdxBody
    .replace(/#\/ebm\/kho-guidelines/g, '#/ebm/research')
    .replace(/\/ebm\/kho-guidelines/g, '/ebm/kho-nghien-cuu')
    .replace(/Quay lại Kho Guidelines/g, 'Quay lại Kho Nghiên Cứu')
    .replace(/src=["']kho-guidelines\/images\//g, 'src="./images/');

  return `---\n${fmBody}\n---${mdxBody}`;
}

function runMigration() {
  fs.mkdirSync(RES_DIR, { recursive: true });
  fs.mkdirSync(RES_IMG_DIR, { recursive: true });

  const targetSlugs = Object.keys(STUDY_ENRICHMENTS);

  // Collect remaining guideline files so we know if any image is shared
  const remainingGdlFiles = fs
    .readdirSync(GDL_DIR)
    .filter((f) => f.endsWith('.mdx') && !targetSlugs.includes(f.replace(/\.mdx$/, '')));
  const sharedImageText = remainingGdlFiles
    .map((f) => fs.readFileSync(path.join(GDL_DIR, f), 'utf8'))
    .join('\n');

  let movedCount = 0;
  let movedImages = 0;

  for (const slug of targetSlugs) {
    const fileName = `${slug}.mdx`;
    const srcFile = path.join(GDL_DIR, fileName);
    const destFile = path.join(RES_DIR, fileName);

    // Support re-running idempotently if already moved
    const activeSource = fs.existsSync(srcFile) ? srcFile : fs.existsSync(destFile) ? destFile : null;
    if (!activeSource) {
      console.warn(`[Migrate] Skipping missing file: ${fileName}`);
      continue;
    }

    const raw = fs.readFileSync(activeSource, 'utf8');

    // Find referenced images
    const imgMatches = [...raw.matchAll(/(?:\.\/|kho-guidelines\/)?images\/([a-zA-Z0-9_.-]+\.(?:png|jpg|jpeg|svg|webp|gif))/gi)];
    for (const m of imgMatches) {
      const imgName = m[1];
      const srcImg = path.join(GDL_IMG_DIR, imgName);
      const destImg = path.join(RES_IMG_DIR, imgName);
      if (fs.existsSync(srcImg)) {
        if (sharedImageText.includes(imgName)) {
          fs.copyFileSync(srcImg, destImg);
        } else {
          fs.renameSync(srcImg, destImg);
        }
        movedImages++;
      }
    }

    const enriched = injectOrReplaceFrontmatterFields(raw, STUDY_ENRICHMENTS[slug]);
    fs.writeFileSync(destFile, enriched, 'utf8');

    if (activeSource === srcFile && fs.existsSync(srcFile)) {
      fs.unlinkSync(srcFile);
    }
    movedCount++;
  }

  console.log(`[Migrate] Successfully migrated & enriched ${movedCount} research MDX files and ${movedImages} images.`);
}

runMigration();
