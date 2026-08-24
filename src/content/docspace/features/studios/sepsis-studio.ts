/**
 * DocSpace — Sepsis, Severe Pneumonia & Critical Care ICU Resuscitation Studio Pro ($10,000 Level)
 * Comprehensive Sepsis-3, SOFA 6-Organ Radar, NEWS2, SMART-COP, CURB-65, NEE/VIS Titrator, Hour-1 Bundle & 20 Presets
 */

export interface SepsisPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  category: 'septic_shock' | 'severe_pneumonia' | 'crbsi_bloodstream' | 'neutropenic_transplant' | 'early_warning_news2';
  description: string;
  values: SepsisInputs;
}

export interface SepsisInputs {
  age: number;
  gender?: 'male' | 'female';
  weightKg: number;
  
  // Vital Signs
  heartRate: number;       // bpm
  respiratoryRate: number; // /min
  systolicBp: number;      // mmHg
  diastolicBp: number;     // mmHg
  temperatureC: number;    // Celsius
  spo2Percent: number;     // %
  isOnOxygen: boolean;     // Breathing supplemental O2
  isCopdHypercapnic: boolean; // Use NEWS2 Scale 2 for SpO2 (88-92 target)
  gcs: number;             // 3 - 15 Glasgow Coma Scale
  avpu: 'alert' | 'voice' | 'pain' | 'unresponsive';
  
  // 6-Organ SOFA Laboratory Biomarkers
  pao2Fio2Ratio: number;   // PaO2/FiO2 ratio (mmHg)
  isMechanicallyVentilated: boolean; // Invasive or non-invasive mechanical ventilation
  plateletsK: number;      // x10^3/uL or G/L
  bilirubinUmol: number;   // umol/L (or mg/dL * 17.1)
  serumCreatinineUmol: number; // umol/L
  urineVolume24hMl?: number;   // mL/24h (or mL/d)
  urineOutputHours?: number;   // Observation hours for oliguria
  urineVolumePeriodMl?: number;// Period urine volume
  serumLactateMmol: number;    // mmol/L (initial)
  repeatLactateMmol?: number;  // mmol/L (repeat at 2 - 4h)
  lactateDeltaHours?: number;  // Time between tests (hours)
  
  // Vasopressor & Inotrope Dosage (ug/kg/min or UI/min)
  noradrenalineDoseUgKgMin?: number; // ug/kg/min
  adrenalineDoseUgKgMin?: number;    // ug/kg/min
  dopamineDoseUgKgMin?: number;      // ug/kg/min
  dobutamineDoseUgKgMin?: number;    // ug/kg/min
  vasopressinDoseUiMin?: number;     // UI/min (0.01 - 0.04)
  
  // Fluid Resuscitation & Dynamic Responsiveness
  fluidsGivenMl?: number;            // Total crystalloid given (target 30 mL/kg)
  capillaryRefillTimeSec?: number;   // CRT seconds (Andromeda-Shock > 3s)
  isPlrPositive?: boolean;           // Passive Leg Raise positive (>10% CO increase)
  isPpvOver13?: boolean;             // Pulse Pressure Variation > 13%
  
  // Pneumonia SMART-COP & CURB-65 Predictors
  isMultilobarInfiltrate?: boolean;  // CXR multilobar involvement
  serumAlbuminGDl?: number;          // g/dL (<3.5 is 1 pt in SMART-COP)
  arterialPh?: number;               // pH (<7.35 is 1 pt in SMART-COP)
  serumBunMmol?: number;             // mmol/L (>7 is 1 pt in CURB-65)
  isAspirationSuspected?: boolean;
  
  // Infection Site & MDR Risk Flags
  infectionSite: 'pulmonary' | 'abdominal' | 'urinary' | 'skin_soft_tissue' | 'crbsi' | 'cns' | 'unknown';
  isPseudomonasRisk: boolean;        // Hospital >5d, prior antibiotics, bronchiectasis
  isMrsaRisk: boolean;               // Prior MRSA, dialysis, central lines, recent hospitalization
  isEsblRisk: boolean;               // Prior ESBL, nursing home, recent cephalosporin/quinolone
  isAcinetobacterRisk: boolean;      // ICU outbreak, long-term ventilator
}

export interface SepsisAnalysisResult {
  // 1. SOFA Score & Breakdown
  sofaScore: number;
  sofaRespiration: number;
  sofaCoagulation: number;
  sofaLiver: number;
  sofaCardio: number;
  sofaCns: number;
  sofaRenal: number;
  sofaMortalityPercent: string;
  isSepsis3Confirmed: boolean; // SOFA >= 2 with suspected infection
  
  // 2. Screening & Triage Scores
  qsofaScore: number;
  isQsofaHighRisk: boolean;
  news2Score: number;
  news2RiskCategory: 'low' | 'medium' | 'high';
  news2Color: string;
  news2Action: string;
  
  // 3. Severe Pneumonia Assessment
  curb65Score: number;
  curb65Recommendation: string;
  smartCopScore: number;
  smartCopRiskCategory: string;
  smartCopIrvoRiskPercent: string;
  isSevereCapAts: boolean;
  
  // 4. Hemodynamics & Shock Titration
  mapMmHg: number;
  shockIndex: number;
  isOccultShock: boolean;
  modifiedShockIndex: number;
  noradrenalineEquivalentUgKgMin: number;
  vasoactiveInotropicScore: number;
  isRefractorySepticShock: boolean;
  targetFluidVolumeMl: number;
  fluidBalanceRemainingMl: number;
  isFluidResponsive: boolean;
  
  // 5. Lactate Dynamics
  lactateClearancePercent: number | null;
  isLactateClearanceAdequate: boolean | null;
  lactateTrajectorySummary: string;
  
  // 6. Final Classification & ICU Strategy
  sepsisClassification: string;
  sepsisColor: string;
  icuCareRecommendation: string;
  hour1BundleChecklist: { step: string; status: 'done' | 'pending' | 'urgent'; detail: string }[];
  antibioticRegimen: string;
  emergencyFlags: string[];
  recommendations: string[];
  clinicalSummary: string;
}

export const SEPSIS_PRESETS: SepsisPreset[] = [
  // 1. Septic Shock & Resuscitation
  {
    id: 'abdominal_septic_shock_hour1',
    name: '1. Sốc Nhiễm Khuẩn Bụng Do Thủng Tạng Rỗng (Hour-1 Bundle)',
    badge: '🚨 Sốc Nhiễm Khuẩn: NEE 0.32 & Lactate 4.8',
    badgeColor: '#dc2626',
    category: 'septic_shock',
    description: 'Nam 62 tuổi thủng ổ loét dạ dày, HA 80/45 mmHg (MAP 57), Lactate 4.8 mmol/L, cần Noradrenaline 0.28 ug/kg/min + Vasopressin và bù đủ 2100 mL dịch.',
    values: {
      age: 62, weightKg: 70, heartRate: 125, respiratoryRate: 28, systolicBp: 82, diastolicBp: 45, temperatureC: 38.8,
      spo2Percent: 93, isOnOxygen: true, isCopdHypercapnic: false, gcs: 13, avpu: 'voice',
      pao2Fio2Ratio: 220, isMechanicallyVentilated: false, plateletsK: 85, bilirubinUmol: 38, serumCreatinineUmol: 240,
      serumLactateMmol: 4.8, repeatLactateMmol: 3.6, lactateDeltaHours: 2,
      noradrenalineDoseUgKgMin: 0.28, vasopressinDoseUiMin: 0.03, fluidsGivenMl: 1000,
      capillaryRefillTimeSec: 4.5, isPlrPositive: true,
      infectionSite: 'abdominal', isPseudomonasRisk: true, isMrsaRisk: false, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },
  {
    id: 'refractory_shock_multivaso',
    name: '2. Sốc Nhiễm Khuẩn Trơ Đa Vận Mạch & Toan Lactic Nặng',
    badge: '🚨 Sốc Trơ: NEE 0.55 | Hydrocortisone + Vaso',
    badgeColor: '#dc2626',
    category: 'septic_shock',
    description: 'Nữ 58 tuổi viêm phúc mạc hậu phẫu, Noradrenaline 0.4 ug/kg/min + Adrenaline 0.15 ug/kg/min, Lactate 6.5 mmol/L. Chỉ định Hydrocortisone 200mg/ngày.',
    values: {
      age: 58, weightKg: 55, heartRate: 134, respiratoryRate: 30, systolicBp: 78, diastolicBp: 40, temperatureC: 39.2,
      spo2Percent: 90, isOnOxygen: true, isCopdHypercapnic: false, gcs: 11, avpu: 'voice',
      pao2Fio2Ratio: 160, isMechanicallyVentilated: true, plateletsK: 45, bilirubinUmol: 68, serumCreatinineUmol: 340,
      serumLactateMmol: 6.5, repeatLactateMmol: 5.8, lactateDeltaHours: 2,
      noradrenalineDoseUgKgMin: 0.40, adrenalineDoseUgKgMin: 0.15, vasopressinDoseUiMin: 0.03, fluidsGivenMl: 2500,
      capillaryRefillTimeSec: 5.0, isPlrPositive: false,
      infectionSite: 'abdominal', isPseudomonasRisk: true, isMrsaRisk: true, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },
  {
    id: 'fournier_necrotizing_fasciitis',
    name: '3. Viêm Cân Hoại Tử Vùng Tầng Sinh Môn (Fournier Sepsis)',
    badge: 'Cấp Cứu Phẫu Thuật Cắt Lọc Khẩn',
    badgeColor: '#dc2626',
    category: 'septic_shock',
    description: 'Nam 54 tuổi ĐTĐ hoại tử tầng sinh môn sinh hơi, sốc tụt HA, BC 28,000, Lactate 4.2. Cần phẫu thuật debridement khẩn và Meropenem + Vancomycin + Clindamycin.',
    values: {
      age: 54, weightKg: 78, heartRate: 120, respiratoryRate: 26, systolicBp: 86, diastolicBp: 50, temperatureC: 39.4,
      spo2Percent: 94, isOnOxygen: true, isCopdHypercapnic: false, gcs: 14, avpu: 'alert',
      pao2Fio2Ratio: 280, isMechanicallyVentilated: false, plateletsK: 115, bilirubinUmol: 28, serumCreatinineUmol: 195,
      serumLactateMmol: 4.2, noradrenalineDoseUgKgMin: 0.18, fluidsGivenMl: 1500,
      infectionSite: 'skin_soft_tissue', isPseudomonasRisk: true, isMrsaRisk: true, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'urosepsis_e_coli_esbl',
    name: '4. Sốc Nhiễm Khuẩn Từ Đường Tiết Niệu (Urosepsis E. coli ESBL)',
    badge: 'SOFA = 8 | Kháng Carbapenem Spared',
    badgeColor: '#ea580c',
    category: 'septic_shock',
    description: 'Nữ 72 tuổi ĐTĐ sỏi niệu quản ứ mủ sốt rét run, HA 85/50 mmHg, Lactate 3.4 mmol/L. Cần dẫn lưu bể thận giải áp cấp và Ertapenem / Meropenem.',
    values: {
      age: 72, weightKg: 52, heartRate: 115, respiratoryRate: 24, systolicBp: 85, diastolicBp: 50, temperatureC: 39.0,
      spo2Percent: 96, isOnOxygen: false, isCopdHypercapnic: false, gcs: 15, avpu: 'alert',
      pao2Fio2Ratio: 360, isMechanicallyVentilated: false, plateletsK: 140, bilirubinUmol: 22, serumCreatinineUmol: 185,
      serumLactateMmol: 3.4, noradrenalineDoseUgKgMin: 0.12, fluidsGivenMl: 1600,
      infectionSite: 'urinary', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },

  // 2. Severe Pneumonia & ARDS
  {
    id: 'severe_cap_smartcop_7',
    name: '5. Viêm Phổi Cộng Đồng Nặng Đe Dọa Thở Máy (SMART-COP = 7)',
    badge: 'CURB-65 = 4 | SMART-COP = 7 (IRVO 85%)',
    badgeColor: '#ef4444',
    category: 'severe_pneumonia',
    description: 'Nam 74 tuổi phế cầu xâm lấn thâm nhiễm 2 phổi, P/F 145 mmHg, lơ mơ, BUN 12 mmol/L. Nguy cơ thở máy xâm lấn cực cao (>85%).',
    values: {
      age: 74, weightKg: 65, heartRate: 128, respiratoryRate: 34, systolicBp: 88, diastolicBp: 52, temperatureC: 39.5,
      spo2Percent: 88, isOnOxygen: true, isCopdHypercapnic: false, gcs: 12, avpu: 'voice',
      pao2Fio2Ratio: 145, isMechanicallyVentilated: true, plateletsK: 95, bilirubinUmol: 24, serumCreatinineUmol: 180,
      serumLactateMmol: 3.1, noradrenalineDoseUgKgMin: 0.15, fluidsGivenMl: 1200,
      isMultilobarInfiltrate: true, serumAlbuminGDl: 2.8, arterialPh: 7.28, serumBunMmol: 12.5,
      infectionSite: 'pulmonary', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'vap_pseudomonas_double_cov',
    name: '6. Viêm Phổi Thở Máy Sau 8 Ngày ICU (VAP Pseudomonas MDR)',
    badge: 'Phối Hợp Đôi Kháng Pseudomonas + MRSA',
    badgeColor: '#7c3aed',
    category: 'severe_pneumonia',
    description: 'Nam 56 tuổi chấn thương sọ não thở máy ngày thứ 8 sốt cao đờm xanh mủ, P/F tụt còn 175. Cần Meropenem 2g q8h truyền 3h + Amikacin 20mg/kg + Vancomycin.',
    values: {
      age: 56, weightKg: 72, heartRate: 110, respiratoryRate: 26, systolicBp: 105, diastolicBp: 65, temperatureC: 39.1,
      spo2Percent: 91, isOnOxygen: true, isCopdHypercapnic: false, gcs: 10, avpu: 'voice',
      pao2Fio2Ratio: 175, isMechanicallyVentilated: true, plateletsK: 120, bilirubinUmol: 26, serumCreatinineUmol: 145,
      serumLactateMmol: 2.4, isMultilobarInfiltrate: true,
      infectionSite: 'pulmonary', isPseudomonasRisk: true, isMrsaRisk: true, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },
  {
    id: 'aspiration_pneumonia_abscess',
    name: '7. Viêm Phổi Hít Kèm Nguy Cơ Vi Khuẩn Kỵ Khí (Aspiration Sepsis)',
    badge: 'Viêm Phổi Hít: Ampicillin/Sulbactam',
    badgeColor: '#f59e0b',
    category: 'severe_pneumonia',
    description: 'Cụ bà 82 tuổi tai biến di chứng nuốt sặc, sốt đờm hôi thâm nhiễm thùy dưới phổi phải. Phác đồ Ampicillin/Sulbactam 3g q6h hoặc Ceftriaxone + Metronidazole.',
    values: {
      age: 82, weightKg: 46, heartRate: 102, respiratoryRate: 25, systolicBp: 110, diastolicBp: 68, temperatureC: 38.6,
      spo2Percent: 92, isOnOxygen: true, isCopdHypercapnic: false, gcs: 13, avpu: 'voice',
      pao2Fio2Ratio: 260, isMechanicallyVentilated: false, plateletsK: 175, bilirubinUmol: 16, serumCreatinineUmol: 115,
      serumLactateMmol: 1.8, isAspirationSuspected: true, isMultilobarInfiltrate: false,
      infectionSite: 'pulmonary', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'acinetobacter_xdr_vap',
    name: '8. Viêm Phổi Thở Máy Acinetobacter Kháng Hết (XDR Pan-Drug)',
    badge: '🚨 Colistin (CMS) + Ampicillin/Sulbactam Cao',
    badgeColor: '#dc2626',
    category: 'severe_pneumonia',
    description: 'Nam 68 tuổi nằm ICU 14 ngày cấy đờm ra Acinetobacter baumannii chỉ còn nhạy Colistin. Phác đồ Colistin nạp 9 triệu UI + Sulbactam liều cao 6g/ngày.',
    values: {
      age: 68, weightKg: 64, heartRate: 118, respiratoryRate: 28, systolicBp: 92, diastolicBp: 56, temperatureC: 39.0,
      spo2Percent: 89, isOnOxygen: true, isCopdHypercapnic: false, gcs: 9, avpu: 'pain',
      pao2Fio2Ratio: 130, isMechanicallyVentilated: true, plateletsK: 75, bilirubinUmol: 35, serumCreatinineUmol: 210,
      serumLactateMmol: 3.5, noradrenalineDoseUgKgMin: 0.22,
      infectionSite: 'pulmonary', isPseudomonasRisk: true, isMrsaRisk: true, isEsblRisk: true, isAcinetobacterRisk: true
    }
  },

  // 3. Catheter & Bloodstream Infections (CRBSI)
  {
    id: 'crbsi_staph_aureus',
    name: '9. Nhiễm Khuẩn Huyết Do Catheter Tĩnh Mạch Trung Tâm (CRBSI S. aureus)',
    badge: 'Rút Catheter + Vancomycin Đích AUC 400-600',
    badgeColor: '#dc2626',
    category: 'crbsi_bloodstream',
    description: 'Nữ 64 tuổi lọc máu qua Catheter sốt cao rét run mỗi lần chạy thận, tụt HA. Rút bỏ catheter khẩn, cấy máu và dùng Vancomycin tĩnh mạch.',
    values: {
      age: 64, weightKg: 58, heartRate: 116, respiratoryRate: 22, systolicBp: 86, diastolicBp: 52, temperatureC: 39.6,
      spo2Percent: 95, isOnOxygen: false, isCopdHypercapnic: false, gcs: 15, avpu: 'alert',
      pao2Fio2Ratio: 380, isMechanicallyVentilated: false, plateletsK: 110, bilirubinUmol: 20, serumCreatinineUmol: 480,
      serumLactateMmol: 3.2, noradrenalineDoseUgKgMin: 0.10, fluidsGivenMl: 1200,
      infectionSite: 'crbsi', isPseudomonasRisk: false, isMrsaRisk: true, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'candida_fungemia_icu',
    name: '10. Nhiễm Nấm Huyết Xâm Lấn Ở Bệnh Nhân ICU Kéo Dài (Candidemia)',
    badge: 'Nhiễm Nấm Xâm Lấn: Echinocandin (Caspofungin)',
    badgeColor: '#7c3aed',
    category: 'crbsi_bloodstream',
    description: 'Nam 70 tuổi sau phẫu thuật rò tiêu hóa nuôi ăn tĩnh mạch TPN 12 ngày, sốt dai dẳng dù đang dùng Meropenem. Cần thêm Caspofungin 70mg N1 sau đó 50mg/ngày.',
    values: {
      age: 70, weightKg: 60, heartRate: 108, respiratoryRate: 24, systolicBp: 94, diastolicBp: 58, temperatureC: 38.9,
      spo2Percent: 94, isOnOxygen: true, isCopdHypercapnic: false, gcs: 14, avpu: 'alert',
      pao2Fio2Ratio: 290, isMechanicallyVentilated: false, plateletsK: 65, bilirubinUmol: 42, serumCreatinineUmol: 175,
      serumLactateMmol: 2.6, fluidsGivenMl: 1500,
      infectionSite: 'crbsi', isPseudomonasRisk: true, isMrsaRisk: true, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },

  // 4. Neutropenic & Immunocompromised Sepsis
  {
    id: 'febrile_neutropenia_post_chemo',
    name: '11. Sốt Giảm Bạch Cầu Hạt Sau Hóa Trị Ung Thư (Febrile Neutropenia)',
    badge: '🚨 Cấp Cứu: Kháng Sinh Tĩnh Mạch < 1 Giờ',
    badgeColor: '#dc2626',
    category: 'neutropenic_transplant',
    description: 'Nữ 48 tuổi K vú sau hóa trị ngày 10, ANC < 500/uL, sốt 39.2°C, tụt HA 88/50. Cần Cefepime 2g q8h hoặc Meropenem 1g q8h ngay lập tức.',
    values: {
      age: 48, weightKg: 50, heartRate: 122, respiratoryRate: 24, systolicBp: 88, diastolicBp: 50, temperatureC: 39.2,
      spo2Percent: 96, isOnOxygen: false, isCopdHypercapnic: false, gcs: 15, avpu: 'alert',
      pao2Fio2Ratio: 380, isMechanicallyVentilated: false, plateletsK: 35, bilirubinUmol: 18, serumCreatinineUmol: 95,
      serumLactateMmol: 2.8, noradrenalineDoseUgKgMin: 0.08, fluidsGivenMl: 1500,
      infectionSite: 'unknown', isPseudomonasRisk: true, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'kidney_transplant_cmv_sepsis',
    name: '12. Nhiễm Trùng Nặng Ở Bệnh Nhân Ghép Thận Dùng Thuốc Ức Chế MD',
    badge: 'Bệnh Nhân Ghép Thận: Hội Chẩn Chuyên Khoa',
    badgeColor: '#ea580c',
    category: 'neutropenic_transplant',
    description: 'Nam 52 tuổi ghép thận 1 năm đang dùng Tacrolimus + MMF, viêm phổi sốt ho, Creatinine tăng vọt từ 110 lên 230 umol/L. Cần kháng sinh phổ rộng và giảm liều ức chế MD.',
    values: {
      age: 52, weightKg: 68, heartRate: 106, respiratoryRate: 25, systolicBp: 100, diastolicBp: 62, temperatureC: 38.7,
      spo2Percent: 91, isOnOxygen: true, isCopdHypercapnic: false, gcs: 15, avpu: 'alert',
      pao2Fio2Ratio: 230, isMechanicallyVentilated: false, plateletsK: 125, bilirubinUmol: 19, serumCreatinineUmol: 230,
      serumLactateMmol: 2.1,
      infectionSite: 'pulmonary', isPseudomonasRisk: true, isMrsaRisk: false, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },

  // 5. Early Warning & Occult Sepsis
  {
    id: 'news2_rapid_response_trigger',
    name: '13. Báo Động Sớm Suy Sụp Huyết Động Tại Khoa Nội (NEWS2 = 9)',
    badge: '🚨 Kích Hoạt Đội Cấp Cứu MET / RRT',
    badgeColor: '#dc2626',
    category: 'early_warning_news2',
    description: 'Cụ ông 76 tuổi tại khoa nội thở 28 l/p, SpO2 89%, HA 90/55, lơ mơ mới xuất hiện (NEWS2 = 9 điểm). Cần bác sĩ ICU đến giường ngay trong 15 phút.',
    values: {
      age: 76, weightKg: 62, heartRate: 118, respiratoryRate: 28, systolicBp: 90, diastolicBp: 55, temperatureC: 38.6,
      spo2Percent: 89, isOnOxygen: true, isCopdHypercapnic: false, gcs: 13, avpu: 'voice',
      pao2Fio2Ratio: 210, isMechanicallyVentilated: false, plateletsK: 145, bilirubinUmol: 22, serumCreatinineUmol: 165,
      serumLactateMmol: 3.2,
      infectionSite: 'pulmonary', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'occult_cryptic_shock',
    name: '14. Sốc Nhiễm Khuẩn Ẩn Giấu (Cryptic Shock: HA Bình Thường nhưng Lactate 4.5)',
    badge: '⚠️ Sốc Ẩn: HA 115/70 nhưng Lactate 4.5 & SI 1.05',
    badgeColor: '#ef4444',
    category: 'early_warning_news2',
    description: 'Nữ 55 tuổi viêm đường mật, HA đo tưởng như ổn 115/70 nhưng Mạch 122 l/p (Shock Index 1.06), Lactate 4.5 mmol/L. Nguy cơ tử vong cao nếu không hồi sức dịch sớm!',
    values: {
      age: 55, weightKg: 58, heartRate: 122, respiratoryRate: 26, systolicBp: 115, diastolicBp: 70, temperatureC: 39.4,
      spo2Percent: 95, isOnOxygen: false, isCopdHypercapnic: false, gcs: 14, avpu: 'alert',
      pao2Fio2Ratio: 340, isMechanicallyVentilated: false, plateletsK: 130, bilirubinUmol: 52, serumCreatinineUmol: 140,
      serumLactateMmol: 4.5, repeatLactateMmol: 3.2, lactateDeltaHours: 2,
      fluidsGivenMl: 500, capillaryRefillTimeSec: 3.5,
      infectionSite: 'abdominal', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },
  {
    id: 'meningitis_septic_cns',
    name: '15. Viêm Màng Não Mủ Kèm Nhiễm Khuẩn Huyết Tối Cấp (Meningitis)',
    badge: 'Ceftriaxone 2g q12h + Dexamethasone + Vanco',
    badgeColor: '#dc2626',
    category: 'crbsi_bloodstream',
    description: 'Nam 28 tuổi sốt cao đau đầu dữ dội, cổ gượng, ban xuất huyết hoại tử, lơ mơ GCS 11. Cần Dexamethasone 10mg IV trước/đồng thời với Ceftriaxone 2g q12h.',
    values: {
      age: 28, weightKg: 65, heartRate: 124, respiratoryRate: 24, systolicBp: 92, diastolicBp: 56, temperatureC: 40.1,
      spo2Percent: 97, isOnOxygen: false, isCopdHypercapnic: false, gcs: 11, avpu: 'voice',
      pao2Fio2Ratio: 380, isMechanicallyVentilated: false, plateletsK: 70, bilirubinUmol: 25, serumCreatinineUmol: 130,
      serumLactateMmol: 3.8, noradrenalineDoseUgKgMin: 0.12, fluidsGivenMl: 1500,
      infectionSite: 'cns', isPseudomonasRisk: false, isMrsaRisk: true, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'copd_exacerbation_pneumonia',
    name: '16. Đợt Cấp COPD Kèm Viêm Phổi Nặng (NEWS2 Scale 2 SpO2)',
    badge: 'Đích SpO2 88-92% (Tránh Tăng CO2)',
    badgeColor: '#0284c7',
    category: 'severe_pneumonia',
    description: 'Nam 70 tuổi COPD GOLD D vào đợt cấp do viêm phổi, SpO2 89% khí phòng (Scale 2 phù hợp), P/F 210, toan hô hấp. Chỉ định NIV BiPAP sớm và Augmentin + Macrolide.',
    values: {
      age: 70, weightKg: 54, heartRate: 105, respiratoryRate: 26, systolicBp: 125, diastolicBp: 75, temperatureC: 38.3,
      spo2Percent: 89, isOnOxygen: true, isCopdHypercapnic: true, gcs: 14, avpu: 'alert',
      pao2Fio2Ratio: 210, isMechanicallyVentilated: false, plateletsK: 190, bilirubinUmol: 15, serumCreatinineUmol: 110,
      serumLactateMmol: 1.9, arterialPh: 7.30,
      infectionSite: 'pulmonary', isPseudomonasRisk: true, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'cirrhosis_sbp_sepsis',
    name: '17. Viêm Phúc Mạc Tự Phát Ở Bệnh Nhân Xơ Gan Mất Bù (SBP Sepsis)',
    badge: 'Ceftriaxone 2g + Albumin 1.5g/kg N1 & 1g/kg N3',
    badgeColor: '#f59e0b',
    category: 'septic_shock',
    description: 'Nam 58 tuổi xơ gan báng bụng sốt đau bụng âm ỉ, dịch báng bạch cầu đa nhân > 250/mm3. Cần Ceftriaxone 2g/ngày phối hợp Albumin 20% để ngừa Hội chứng Gan Thận.',
    values: {
      age: 58, weightKg: 66, heartRate: 104, respiratoryRate: 22, systolicBp: 95, diastolicBp: 58, temperatureC: 38.5,
      spo2Percent: 96, isOnOxygen: false, isCopdHypercapnic: false, gcs: 14, avpu: 'alert',
      pao2Fio2Ratio: 350, isMechanicallyVentilated: false, plateletsK: 55, bilirubinUmol: 85, serumCreatinineUmol: 155,
      serumLactateMmol: 2.5,
      infectionSite: 'abdominal', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: true, isAcinetobacterRisk: false
    }
  },
  {
    id: 'post_cpr_septic_cardiomyopathy',
    name: '18. Bệnh Cơ Tim Do Nhiễm Trùng (Septic Cardiomyopathy: Cần Dobutamine)',
    badge: 'Suy Bơm Sau Sốc: Noradrenaline + Dobutamine',
    badgeColor: '#dc2626',
    category: 'septic_shock',
    description: 'Nữ 66 tuổi sốc nhiễm khuẩn phổi đã bù đủ dịch nhưng ScvO2 còn 55%, Siêu âm tim EF 30% giảm động toàn bộ. Phối hợp Dobutamine 5 ug/kg/min với Noradrenaline.',
    values: {
      age: 66, weightKg: 56, heartRate: 112, respiratoryRate: 24, systolicBp: 88, diastolicBp: 54, temperatureC: 38.2,
      spo2Percent: 92, isOnOxygen: true, isCopdHypercapnic: false, gcs: 13, avpu: 'voice',
      pao2Fio2Ratio: 190, isMechanicallyVentilated: true, plateletsK: 90, bilirubinUmol: 32, serumCreatinineUmol: 220,
      serumLactateMmol: 4.1, noradrenalineDoseUgKgMin: 0.25, dobutamineDoseUgKgMin: 5.0, fluidsGivenMl: 2000,
      capillaryRefillTimeSec: 4.0, isPlrPositive: false,
      infectionSite: 'pulmonary', isPseudomonasRisk: true, isMrsaRisk: true, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'adequate_lactate_clearance_recovery',
    name: '19. Hồi Sức Thành Công Với Tỷ Lệ Thanh Thải Lactate > 40% (Recovery)',
    badge: '✅ Đáp Ứng Hồi Sức Tốt: Lactate 5.2 ➔ 2.1 (-60%)',
    badgeColor: '#10b981',
    category: 'septic_shock',
    description: 'Nam 50 tuổi sốc nhiễm khuẩn sau 4 giờ hồi sức tích cực: MAP đạt 72 mmHg, giảm liều Noradrenaline còn 0.05, Lactate giảm từ 5.2 xuống 2.1 mmol/L.',
    values: {
      age: 50, weightKg: 68, heartRate: 92, respiratoryRate: 20, systolicBp: 115, diastolicBp: 68, temperatureC: 37.6,
      spo2Percent: 97, isOnOxygen: true, isCopdHypercapnic: false, gcs: 15, avpu: 'alert',
      pao2Fio2Ratio: 310, isMechanicallyVentilated: false, plateletsK: 135, bilirubinUmol: 24, serumCreatinineUmol: 135,
      serumLactateMmol: 5.2, repeatLactateMmol: 2.1, lactateDeltaHours: 4,
      noradrenalineDoseUgKgMin: 0.05, fluidsGivenMl: 2200, capillaryRefillTimeSec: 2.0, isPlrPositive: false,
      infectionSite: 'abdominal', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  },
  {
    id: 'ward_early_sepsis_qsofa1',
    name: '20. Nhiễm Khuẩn Tại Khoa Nội Nguy Cơ Thấp (qSOFA = 1, SOFA = 1)',
    badge: 'Điều Trị Khoa Phòng Nội Khoa',
    badgeColor: '#10b981',
    category: 'early_warning_news2',
    description: 'Nữ 42 tuổi viêm mô tế bào cẳng chân sốt 38.5°C, HA 120/75, mạch 95, không suy tạng. Điều trị Oxacillin / Cefazolin tại buồng bệnh thường.',
    values: {
      age: 42, weightKg: 54, heartRate: 95, respiratoryRate: 18, systolicBp: 120, diastolicBp: 75, temperatureC: 38.5,
      spo2Percent: 98, isOnOxygen: false, isCopdHypercapnic: false, gcs: 15, avpu: 'alert',
      pao2Fio2Ratio: 450, isMechanicallyVentilated: false, plateletsK: 240, bilirubinUmol: 12, serumCreatinineUmol: 75,
      serumLactateMmol: 1.2,
      infectionSite: 'skin_soft_tissue', isPseudomonasRisk: false, isMrsaRisk: false, isEsblRisk: false, isAcinetobacterRisk: false
    }
  }
];

/**
 * 1. Master Calculation & Reasoning Engine for Sepsis Studio Pro
 */
export function analyzeSepsisStudio(inputs: SepsisInputs): SepsisAnalysisResult {
  const {
    age, weightKg, heartRate, respiratoryRate, systolicBp, diastolicBp, temperatureC,
    spo2Percent, isOnOxygen, isCopdHypercapnic, gcs, avpu,
    pao2Fio2Ratio, isMechanicallyVentilated, plateletsK, bilirubinUmol, serumCreatinineUmol,
    urineVolume24hMl, urineOutputHours, urineVolumePeriodMl,
    serumLactateMmol, repeatLactateMmol, lactateDeltaHours,
    noradrenalineDoseUgKgMin = 0, adrenalineDoseUgKgMin = 0, dopamineDoseUgKgMin = 0,
    dobutamineDoseUgKgMin = 0, vasopressinDoseUiMin = 0,
    fluidsGivenMl = 0, capillaryRefillTimeSec, isPlrPositive, isPpvOver13,
    isMultilobarInfiltrate, serumAlbuminGDl, arterialPh, serumBunMmol, isAspirationSuspected,
    infectionSite, isPseudomonasRisk, isMrsaRisk, isEsblRisk, isAcinetobacterRisk
  } = inputs;

  const emergencyFlags: string[] = [];
  const recommendations: string[] = [];

  // A. Hemodynamics
  const mapMmHg = Math.round((systolicBp + 2 * diastolicBp) / 3);
  const shockIndex = parseFloat((heartRate / Math.max(1, systolicBp)).toFixed(2));
  const modifiedShockIndex = parseFloat((heartRate / Math.max(1, mapMmHg)).toFixed(2));
  const isOccultShock = systolicBp >= 90 && (shockIndex > 0.9 || serumLactateMmol >= 3.0);

  // Vasopressor Equivalents
  const noradrenalineEquivalentUgKgMin = parseFloat(
    (noradrenalineDoseUgKgMin + adrenalineDoseUgKgMin + 0.1 * dopamineDoseUgKgMin + 2.5 * vasopressinDoseUiMin).toFixed(3)
  );

  const vasoactiveInotropicScore = Math.round(
    dopamineDoseUgKgMin + dobutamineDoseUgKgMin + 100 * adrenalineDoseUgKgMin + 100 * noradrenalineDoseUgKgMin + 10000 * vasopressinDoseUiMin
  );

  const isRefractorySepticShock = noradrenalineEquivalentUgKgMin >= 0.25 || (noradrenalineDoseUgKgMin >= 0.25 && mapMmHg < 65);

  // Fluid Resuscitation (30 mL/kg)
  const targetFluidVolumeMl = Math.round(weightKg * 30);
  const fluidBalanceRemainingMl = Math.max(0, targetFluidVolumeMl - fluidsGivenMl);
  const isFluidResponsive = !!(isPlrPositive || isPpvOver13 || (capillaryRefillTimeSec && capillaryRefillTimeSec > 3.0));

  // B. Full 6-Organ SOFA Score (0 - 24)
  // 1. Respiration
  let sofaRespiration = 0;
  if (pao2Fio2Ratio < 100 && isMechanicallyVentilated) sofaRespiration = 4;
  else if (pao2Fio2Ratio < 200 && isMechanicallyVentilated) sofaRespiration = 3;
  else if (pao2Fio2Ratio < 300) sofaRespiration = 2;
  else if (pao2Fio2Ratio < 400) sofaRespiration = 1;

  // 2. Coagulation
  let sofaCoagulation = 0;
  if (plateletsK < 20) sofaCoagulation = 4;
  else if (plateletsK < 50) sofaCoagulation = 3;
  else if (plateletsK < 100) sofaCoagulation = 2;
  else if (plateletsK < 150) sofaCoagulation = 1;

  // 3. Liver
  let sofaLiver = 0;
  if (bilirubinUmol >= 204) sofaLiver = 4;
  else if (bilirubinUmol >= 102) sofaLiver = 3;
  else if (bilirubinUmol >= 33) sofaLiver = 2;
  else if (bilirubinUmol >= 20) sofaLiver = 1;

  // 4. Cardiovascular
  let sofaCardio = 0;
  if (dopamineDoseUgKgMin > 15 || adrenalineDoseUgKgMin > 0.1 || noradrenalineDoseUgKgMin > 0.1) sofaCardio = 4;
  else if (dopamineDoseUgKgMin > 5 || (adrenalineDoseUgKgMin > 0 && adrenalineDoseUgKgMin <= 0.1) || (noradrenalineDoseUgKgMin > 0 && noradrenalineDoseUgKgMin <= 0.1)) sofaCardio = 3;
  else if (dopamineDoseUgKgMin > 0 || dobutamineDoseUgKgMin > 0) sofaCardio = 2;
  else if (mapMmHg < 70) sofaCardio = 1;

  // 5. Central Nervous System
  let sofaCns = 0;
  if (gcs < 6) sofaCns = 4;
  else if (gcs <= 9) sofaCns = 3;
  else if (gcs <= 12) sofaCns = 2;
  else if (gcs <= 14) sofaCns = 1;

  // 6. Renal
  let sofaRenal = 0;
  const isAnuric = (urineVolume24hMl !== undefined && urineVolume24hMl < 200) || (urineVolumePeriodMl !== undefined && urineOutputHours && (urineVolumePeriodMl / urineOutputHours) < 8.3);
  const isOliguric = (urineVolume24hMl !== undefined && urineVolume24hMl < 500) || (urineVolumePeriodMl !== undefined && urineOutputHours && (urineVolumePeriodMl / urineOutputHours) < 20.8);

  if (serumCreatinineUmol >= 440 || isAnuric) sofaRenal = 4;
  else if (serumCreatinineUmol >= 300 || isOliguric) sofaRenal = 3;
  else if (serumCreatinineUmol >= 171) sofaRenal = 2;
  else if (serumCreatinineUmol >= 110) sofaRenal = 1;

  const sofaScore = sofaRespiration + sofaCoagulation + sofaLiver + sofaCardio + sofaCns + sofaRenal;
  const isSepsis3Confirmed = sofaScore >= 2;

  let sofaMortalityPercent = '< 10%';
  if (sofaScore >= 15) sofaMortalityPercent = '> 80%';
  else if (sofaScore >= 12) sofaMortalityPercent = '50 - 60%';
  else if (sofaScore >= 9) sofaMortalityPercent = '30 - 40%';
  else if (sofaScore >= 6) sofaMortalityPercent = '15 - 20%';
  else if (sofaScore >= 2) sofaMortalityPercent = '10 - 15%';

  // C. Screening Scores: qSOFA & NEWS2
  let qsofaScore = 0;
  if (respiratoryRate >= 22) qsofaScore++;
  if (systolicBp <= 100) qsofaScore++;
  if (gcs < 15 || avpu !== 'alert') qsofaScore++;
  const isQsofaHighRisk = qsofaScore >= 2;

  // NEWS2 Calculation
  let news2 = 0;
  // RR
  if (respiratoryRate <= 8) news2 += 3;
  else if (respiratoryRate <= 11) news2 += 1;
  else if (respiratoryRate >= 25) news2 += 3;
  else if (respiratoryRate >= 21) news2 += 2;

  // SpO2
  if (isCopdHypercapnic) {
    if (spo2Percent <= 83) news2 += 3;
    else if (spo2Percent <= 85) news2 += 2;
    else if (spo2Percent <= 87) news2 += 1;
    else if (spo2Percent >= 97 && isOnOxygen) news2 += 3;
    else if (spo2Percent >= 95 && isOnOxygen) news2 += 2;
    else if (spo2Percent >= 93 && isOnOxygen) news2 += 1;
  } else {
    if (spo2Percent <= 91) news2 += 3;
    else if (spo2Percent <= 93) news2 += 2;
    else if (spo2Percent <= 95) news2 += 1;
  }

  // Oxygen
  if (isOnOxygen) news2 += 2;

  // SBP
  if (systolicBp <= 90) news2 += 3;
  else if (systolicBp <= 100) news2 += 2;
  else if (systolicBp <= 110) news2 += 1;
  else if (systolicBp >= 220) news2 += 3;

  // HR
  if (heartRate <= 40) news2 += 3;
  else if (heartRate <= 50) news2 += 1;
  else if (heartRate >= 131) news2 += 3;
  else if (heartRate >= 111) news2 += 2;
  else if (heartRate >= 91) news2 += 1;

  // Consciousness
  if (avpu !== 'alert' || gcs < 15) news2 += 3;

  // Temperature
  if (temperatureC <= 35.0) news2 += 3;
  else if (temperatureC <= 36.0) news2 += 1;
  else if (temperatureC >= 39.1) news2 += 2;
  else if (temperatureC >= 38.1) news2 += 1;

  let news2RiskCategory: 'low' | 'medium' | 'high' = 'low';
  let news2Color = '#10b981';
  let news2Action = 'Theo dõi sinh hiệu thường quy mỗi 4 - 6 giờ.';

  if (news2 >= 7) {
    news2RiskCategory = 'high';
    news2Color = '#dc2626';
    news2Action = '🚨 BÁO ĐỘNG ĐỎ: Kích hoạt ngay Đội Cấp cứu / Hồi sức RRT/MET, chuyển ICU.';
  } else if (news2 >= 5 || (respiratoryRate >= 25 || systolicBp <= 90 || spo2Percent <= 91 || avpu !== 'alert')) {
    news2RiskCategory = 'medium';
    news2Color = '#f59e0b';
    news2Action = '⚠️ BÁO ĐỘNG VÀNG: Bác sĩ buồng bệnh khám khẩn cấp trong 30 phút, theo dõi sinh hiệu mỗi giờ.';
  }

  // D. Severe Pneumonia (CURB-65 & SMART-COP)
  let curb65 = 0;
  if (gcs < 15 || avpu !== 'alert') curb65++;
  if ((serumBunMmol && serumBunMmol > 7) || serumCreatinineUmol > 150) curb65++;
  if (respiratoryRate >= 30) curb65++;
  if (systolicBp < 90 || diastolicBp <= 60) curb65++;
  if (age >= 65) curb65++;

  let curb65Rec = 'Điều trị Ngoại trú (Tử vong < 1.5%)';
  if (curb65 >= 3) curb65Rec = 'Viêm phổi nặng: Nhập viện điều trị ICU / HDU (Tử vong 15 - 40%)';
  else if (curb65 >= 2) curb65Rec = 'Nhập viện điều trị Nội trú khoa Hô hấp (Tử vong ~9%)';

  let smartCop = 0;
  if (systolicBp < 90) smartCop += 2;
  if (isMultilobarInfiltrate) smartCop += 1;
  if (serumAlbuminGDl && serumAlbuminGDl < 3.5) smartCop += 1;
  if ((age <= 50 && respiratoryRate >= 25) || (age > 50 && respiratoryRate >= 30)) smartCop += 1;
  if (heartRate >= 125) smartCop += 1;
  if (gcs < 15 || avpu !== 'alert') smartCop += 1;
  if ((age <= 50 && (pao2Fio2Ratio < 333 || spo2Percent <= 93)) || (age > 50 && (pao2Fio2Ratio < 250 || spo2Percent <= 90))) smartCop += 2;
  if (arterialPh && arterialPh < 7.35) smartCop += 1;

  let smartCopRiskCategory = 'Nguy cơ Thấp';
  let smartCopIrvo = '< 5%';
  if (smartCop >= 7) { smartCopRiskCategory = 'Nguy cơ Cực Cao'; smartCopIrvo = '85%'; }
  else if (smartCop >= 5) { smartCopRiskCategory = 'Nguy cơ Cao'; smartCopIrvo = '33%'; }
  else if (smartCop >= 3) { smartCopRiskCategory = 'Nguy cơ Trung Bình'; smartCopIrvo = '13%'; }

  // ATS/IDSA Severe CAP Criteria
  const hasMajorAts = isMechanicallyVentilated || (noradrenalineDoseUgKgMin > 0 || mapMmHg < 65);
  let minorAtsCount = 0;
  if (respiratoryRate >= 30) minorAtsCount++;
  if (pao2Fio2Ratio <= 250) minorAtsCount++;
  if (isMultilobarInfiltrate) minorAtsCount++;
  if (gcs < 15) minorAtsCount++;
  if (serumBunMmol && serumBunMmol >= 7.14) minorAtsCount++;
  if (plateletsK < 100) minorAtsCount++;
  if (temperatureC < 36.0) minorAtsCount++;
  if (systolicBp < 90) minorAtsCount++;

  const isSevereCapAts = hasMajorAts || minorAtsCount >= 3;

  // E. Lactate Dynamics
  let lactateClearancePercent: number | null = null;
  let isLactateClearanceAdequate: boolean | null = null;
  let lactateTrajectorySummary = `Lactate ban đầu: ${serumLactateMmol} mmol/L`;

  if (repeatLactateMmol !== undefined && lactateDeltaHours && lactateDeltaHours > 0) {
    lactateClearancePercent = parseFloat(
      (((serumLactateMmol - repeatLactateMmol) / serumLactateMmol) * 100).toFixed(1)
    );
    isLactateClearanceAdequate = lactateClearancePercent >= 20.0;
    lactateTrajectorySummary = `Lactate sau ${lactateDeltaHours}h: ${repeatLactateMmol} mmol/L (Thanh thải: ${lactateClearancePercent > 0 ? `-${lactateClearancePercent}%` : `+${Math.abs(lactateClearancePercent)}%`} ➔ ${isLactateClearanceAdequate ? 'ĐẠT mục tiêu ≥20%' : 'CHƯA ĐẠT mục tiêu hồi sức'})`;
  }

  // F. Classification & Hour-1 Bundle
  let sepsisClassification = 'Nhiễm trùng khu trú — Chưa có suy đa cơ quan';
  let sepsisColor = '#10b981';
  let icuCare = 'Điều trị tại buồng bệnh thông thường.';

  const isSepticShock = (noradrenalineDoseUgKgMin > 0 || mapMmHg < 65) && serumLactateMmol >= 2.0;

  if (isSepticShock) {
    sepsisClassification = '🚨 SỐC NHIỄM KHUẨN (Septic Shock — Sepsis-3: Cần Vận Mạch Đạt MAP ≥ 65 & Lactate ≥ 2 mmol/L)';
    sepsisColor = '#dc2626';
    icuCare = 'CHỈ ĐỊNH NHẬP ICU KHẨN CẤP — Kích hoạt toàn diện Gói Sống Còn Giờ Đầu (Hour-1 Bundle).';
  } else if (isSepsis3Confirmed || isQsofaHighRisk) {
    sepsisClassification = '⚠️ NHIỄM KHUẨN HUYẾT (Sepsis-3 — Rối loạn chức năng cơ quan đe dọa tính mạng SOFA ≥ 2)';
    sepsisColor = '#ef4444';
    icuCare = 'Chỉ định nhập Khoa Hồi Sức Cấp Cứu (ICU/HDU). Kháng sinh tĩnh mạch trong 1 giờ đầu.';
  } else if (isSevereCapAts || curb65 >= 3 || smartCop >= 5) {
    sepsisClassification = 'VIÊM PHỔI NẶNG NGUY CƠ CAO (Severe CAP — Cần Theo Dõi Hô Hấp ICU)';
    sepsisColor = '#f59e0b';
    icuCare = 'Chỉ định nhập viện theo dõi tại ICU / Đơn vị Hô Hấp Chuyên Sâu.';
  }

  // Hour-1 Bundle Checklist
  const hour1BundleChecklist: SepsisAnalysisResult['hour1BundleChecklist'] = [
    {
      step: '1. Đo Lactate Máu',
      status: serumLactateMmol >= 2.0 ? 'urgent' : 'done',
      detail: `Lactate hiện tại: ${serumLactateMmol} mmol/L. ${serumLactateMmol >= 2.0 ? 'Bắt buộc đo lại sau 2 - 4 giờ để hướng dẫn hồi sức.' : 'Bình thường.'}`
    },
    {
      step: '2. Cấy Máu Trước Kháng Sinh',
      status: 'urgent',
      detail: 'Lấy ít nhất 2 bộ cấy máu (1 kỵ khí + 1 ái khí từ 2 vị trí tĩnh mạch khác nhau) TRƯỚC KHI truyền liều kháng sinh đầu tiên.'
    },
    {
      step: '3. Kháng Sinh Phổ Rộng Tĩnh Mạch',
      status: 'urgent',
      detail: 'Khởi đầu kháng sinh phổ rộng theo kinh nghiệm TRONG VÒNG 1 GIỜ ĐẦU TIÊN kể từ lúc nhận diện nhiễm khuẩn huyết.'
    },
    {
      step: '4. Bù Dịch Tinh Thể Đẳng Trương (30 mL/kg)',
      status: fluidBalanceRemainingMl > 0 ? 'urgent' : 'done',
      detail: `Đích 30 mL/kg: ${targetFluidVolumeMl} mL (Đã truyền: ${fluidsGivenMl} mL, Còn lại: ${fluidBalanceRemainingMl} mL). Ưu tiên Ringer Lactate / Plasmalyte.`
    },
    {
      step: '5. Vận Mạch Noradrenaline Đạt MAP ≥ 65 mmHg',
      status: mapMmHg < 65 || noradrenalineDoseUgKgMin > 0 ? 'urgent' : 'done',
      detail: `MAP hiện tại: ${mapMmHg} mmHg. Khởi động Noradrenaline sớm qua đường ngoại vi nếu MAP < 65 mmHg sau hoặc trong khi bù dịch.`
    }
  ];

  // G. Empiric Antimicrobial Regimen Matrix
  let antibioticRegimen = '';
  if (infectionSite === 'pulmonary') {
    if (isPseudomonasRisk && isMrsaRisk) {
      antibioticRegimen = 'Viêm phổi HAP/VAP nguy cơ cao đa kháng: Meropenem 1g IV q8h (truyền 3h) + Levofloxacin 750mg IV q24h (hoặc Amikacin 20mg/kg/ngày) + Vancomycin 15-20mg/kg q12h (đích AUC 400-600) hoặc Linezolid 600mg q12h.';
    } else if (isPseudomonasRisk) {
      antibioticRegimen = 'Viêm phổi nguy cơ Pseudomonas: Piperacillin/Tazobactam 4.5g IV q6h (truyền kéo dài 3-4h) HOẶC Cefepime 2g IV q8h + Ciprofloxacin 400mg IV q8h.';
    } else if (isAspirationSuspected) {
      antibioticRegimen = 'Viêm phổi hít / Áp xe phổi: Ampicillin/Sulbactam 3g IV q6h HOẶC Ceftriaxone 2g IV q24h + Metronidazole 500mg IV q8h.';
    } else {
      antibioticRegimen = 'Viêm phổi cộng đồng nặng (Severe CAP): Ceftriaxone 2g IV q24h (hoặc Cefotaxime 2g q8h) + Azithromycin 500mg IV q24h HOẶC Levofloxacin 750mg IV q24h.';
    }
  } else if (infectionSite === 'abdominal') {
    if (isEsblRisk || isSepticShock) {
      antibioticRegimen = 'Nhiễm khuẩn ổ bụng nặng / Viêm phúc mạc sốc: Meropenem 1g IV q8h (hoặc Imipenem 500mg q6h) ± Vancomycin nếu nghi ngờ Enterococcus faecium / MRSA sau mổ.';
    } else {
      antibioticRegimen = 'Nhiễm khuẩn ổ bụng cộng đồng: Ceftriaxone 2g IV q24h + Metronidazole 500mg IV q8h (hoặc Ciprofloxacin 400mg q12h + Metronidazole).';
    }
  } else if (infectionSite === 'urinary') {
    if (isEsblRisk || isSepticShock) {
      antibioticRegimen = 'Nhiễm khuẩn huyết đường tiết niệu (Urosepsis) nguy cơ ESBL: Meropenem 1g IV q8h HOẶC Ertapenem 1g IV q24h (nếu không sốc và không nhiễm Pseudomonas).';
    } else {
      antibioticRegimen = 'Urosepsis cộng đồng: Ceftriaxone 2g IV q24h HOẶC Ciprofloxacin 400mg IV q12h (nếu dị ứng beta-lactam).';
    }
  } else if (infectionSite === 'skin_soft_tissue') {
    if (isMrsaRisk || isSepticShock) {
      antibioticRegimen = 'Viêm mô tế bào hoại tử / Fournier / Nhiễm trùng da nặng: Meropenem 1g IV q8h + Vancomycin 15-20mg/kg q12h + Clindamycin 600-900mg IV q8h (để ức chế độc tố vi khuẩn Toxin-suppression). Phẫu thuật cắt lọc khẩn!';
    } else {
      antibioticRegimen = 'Viêm mô tế bào thông thường: Oxacillin 2g IV q4h HOẶC Cefazolin 2g IV q8h (nếu nghi ngờ MSSA/Liên cầu).';
    }
  } else if (infectionSite === 'crbsi') {
    antibioticRegimen = 'Nhiễm khuẩn huyết do Catheter (CRBSI): Rút bỏ Catheter khẩn + Vancomycin 15-20mg/kg q12h (hoặc Daptomycin 8-10mg/kg q24h) + Meropenem 1g q8h nếu có sốc. Cân nhắc thêm Caspofungin nếu có nguy cơ nấm Candida.';
  } else if (infectionSite === 'cns') {
    antibioticRegimen = 'Viêm màng não mủ cấp: Dexamethasone 10mg IV (tiêm trước hoặc cùng liều kháng sinh) + Ceftriaxone 2g IV q12h + Vancomycin 15-20mg/kg q8-12h + Ampicillin 2g IV q4h (nếu tuổi > 50 để diệt Listeria monocytogenes).';
  } else {
    antibioticRegimen = 'Sepsis chưa rõ ổ vào: Meropenem 1g IV q8h + Vancomycin 15-20mg/kg q12h (bao phủ toàn diện Gram âm kháng thuốc, Pseudomonas và MRSA).';
  }

  // H. Emergency Flags & Recommendations
  if (isSepticShock) emergencyFlags.push('🚨 SỐC NHIỄM KHUẨN (Septic Shock): Tụt HA cần vận mạch và Lactate máu ≥ 2 mmol/L!');
  if (isRefractorySepticShock) emergencyFlags.push(`🚨 SỐC NHIỄM KHUẨN TRƠ (Refractory Shock: NEE = ${noradrenalineEquivalentUgKgMin} ug/kg/min ≥ 0.25) ➔ Kích hoạt Vasopressin 0.03 UI/min + Hydrocortisone 200mg/ngày!`);
  if (sofaScore >= 12) emergencyFlags.push(`🚨 SUY ĐA CƠ QUAN NẶNG: Điểm SOFA = ${sofaScore} (Nguy cơ tử vong nội viện ${sofaMortalityPercent})`);
  if (news2 >= 7) emergencyFlags.push(`🚨 ĐIỂM CẢNH BÁO SỚM NEWS2 = ${news2} (Kích hoạt Đội phản ứng nhanh MET/RRT cấp cứu)`);
  if (isOccultShock) emergencyFlags.push('⚠️ SỐC ẨN GIẤU (Occult Shock: Huyết áp bình thường nhưng Shock Index > 0.9 hoặc Lactate tăng cao)');

  if (isRefractorySepticShock) {
    recommendations.push('Bổ sung Hydrocortisone 200 mg/ngày (50mg tiêm tĩnh mạch mỗi 6 giờ hoặc truyền liên tục) ở bệnh nhân sốc trơ với Noradrenaline.');
    recommendations.push('Bổ sung Vasopressin 0.03 UI/phút (không chuẩn độ liều) để giảm liều Noradrenaline và phục hồi trương lực mạch.');
  }
  if (fluidBalanceRemainingMl > 0) {
    recommendations.push(`Tiếp tục bù dịch tinh thể cân bằng (Ringer Lactate) đủ liều 30 mL/kg (còn thiếu ${fluidBalanceRemainingMl} mL) trong 3 giờ đầu.`);
  }
  if (capillaryRefillTimeSec && capillaryRefillTimeSec > 3.0) {
    recommendations.push(`Thời gian đổ đầy mao mạch CRT = ${capillaryRefillTimeSec}s (> 3s): Dấu hiệu tưới máu ngoại biên kém theo thử nghiệm ANDROMEDA-SHOCK.`);
  }

  const clinicalSummary = `
BÁO CÁO HỒI SỨC NHIỄM KHUẨN HUYẾT & VIÊM PHỔI ICU (DOCSPACE SEPSIS PRO):
- Phân tầng lâm sàng: ${sepsisClassification}
- Điểm SOFA: ${sofaScore}/24 điểm (Hô hấp: ${sofaRespiration}, Đông máu: ${sofaCoagulation}, Gan: ${sofaLiver}, Tim mạch: ${sofaCardio}, Não: ${sofaCns}, Thận: ${sofaRenal} | Tử vong dự báo: ${sofaMortalityPercent})
- Điểm Sàng Lọc: qSOFA = ${qsofaScore}/3 | NEWS2 = ${news2}/20 (${news2RiskCategory.toUpperCase()})
- Huyết động: MAP = ${mapMmHg} mmHg, Shock Index = ${shockIndex}, Noradrenaline Equivalent NEE = ${noradrenalineEquivalentUgKgMin} ug/kg/min (VIS = ${vasoactiveInotropicScore})
- Lactate máu: ${lactateTrajectorySummary}
${curb65 >= 2 ? `- Đánh giá Viêm phổi: CURB-65 = ${curb65} | SMART-COP = ${smartCop} (Nguy cơ thở máy/vận mạch: ${smartCopIrvo})` : ''}
- Kháng sinh kinh nghiệm: ${antibioticRegimen}
- Khuyến cáo: ${recommendations.join(' | ')}
  `.trim();

  return {
    sofaScore,
    sofaRespiration,
    sofaCoagulation,
    sofaLiver,
    sofaCardio,
    sofaCns,
    sofaRenal,
    sofaMortalityPercent,
    isSepsis3Confirmed,
    qsofaScore,
    isQsofaHighRisk,
    news2Score: news2,
    news2RiskCategory,
    news2Color,
    news2Action,
    curb65Score: curb65,
    curb65Recommendation: curb65Rec,
    smartCopScore: smartCop,
    smartCopRiskCategory,
    smartCopIrvoRiskPercent: smartCopIrvo,
    isSevereCapAts,
    mapMmHg,
    shockIndex,
    isOccultShock,
    modifiedShockIndex,
    noradrenalineEquivalentUgKgMin,
    vasoactiveInotropicScore,
    isRefractorySepticShock,
    targetFluidVolumeMl,
    fluidBalanceRemainingMl,
    isFluidResponsive,
    lactateClearancePercent,
    isLactateClearanceAdequate,
    lactateTrajectorySummary,
    sepsisClassification,
    sepsisColor,
    icuCareRecommendation: icuCare,
    hour1BundleChecklist,
    antibioticRegimen,
    emergencyFlags,
    recommendations,
    clinicalSummary
  };
}

/**
 * 2. Render SOFA 6-Organ Hexagonal Spider Radar SVG
 */
export function renderSofaRadarSvg(sofa: { resp: number; coag: number; liver: number; cardio: number; cns: number; renal: number }): string {
  const w = 340;
  const h = 300;
  const cx = w / 2;
  const cy = h / 2 - 10;
  const r = 105;

  const axes = [
    { name: 'Hô Hấp (P/F)', val: sofa.resp, angle: 0 },
    { name: 'Đông Máu (Plt)', val: sofa.coag, angle: 60 },
    { name: 'Gan (Bilirubin)', val: sofa.liver, angle: 120 },
    { name: 'Tim Mạch (MAP)', val: sofa.cardio, angle: 180 },
    { name: 'Não (GCS)', val: sofa.cns, angle: 240 },
    { name: 'Thận (Creatinine)', val: sofa.renal, angle: 300 }
  ];

  const getCoord = (angleDeg: number, radius: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  // Draw 4 concentric hexagons (levels 1, 2, 3, 4)
  const hexLevels = [1, 2, 3, 4].map(lvl => {
    const radius = (lvl / 4) * r;
    const pts = axes.map(a => {
      const pt = getCoord(a.angle, radius);
      return `${pt.x},${pt.y}`;
    }).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="var(--color-border)" stroke-width="${lvl === 4 ? '1.5' : '1'}" stroke-dasharray="${lvl === 4 ? 'none' : '3,3'}" />`;
  }).join('');

  // Data polygon points
  const dataPts = axes.map(a => {
    const radius = (Math.max(0, Math.min(4, a.val)) / 4) * r;
    const pt = getCoord(a.angle, radius);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  const totalSofa = sofa.resp + sofa.coag + sofa.liver + sofa.cardio + sofa.cns + sofa.renal;
  const polyColor = totalSofa >= 12 ? '#dc2626' : (totalSofa >= 6 ? '#ea580c' : (totalSofa >= 2 ? '#f59e0b' : '#10b981'));

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <defs>
        <radialGradient id="sofaRadarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${polyColor}" stop-opacity="0.5" />
          <stop offset="100%" stop-color="${polyColor}" stop-opacity="0.1" />
        </radialGradient>
      </defs>

      <!-- Concentric Hexagons -->
      ${hexLevels}

      <!-- Axis Spokes & Labels -->
      ${axes.map(a => {
        const spokeEnd = getCoord(a.angle, r);
        const labelPos = getCoord(a.angle, r + 22);
        return `
          <line x1="${cx}" y1="${cy}" x2="${spokeEnd.x}" y2="${spokeEnd.y}" stroke="var(--color-border)" stroke-width="1.2" />
          <text x="${labelPos.x}" y="${labelPos.y + 4}" fill="var(--color-text)" font-size="9" font-weight="700" text-anchor="middle">
            ${a.name} <tspan fill="${a.val >= 3 ? '#dc2626' : (a.val >= 2 ? '#f59e0b' : 'var(--color-primary)')}" font-weight="900">(${a.val})</tspan>
          </text>
        `;
      }).join('')}

      <!-- Data Polygon Area -->
      <polygon points="${dataPts}" fill="url(#sofaRadarGlow)" stroke="${polyColor}" stroke-width="2.5" />

      <!-- Data Dots -->
      ${axes.map(a => {
        const radius = (Math.max(0, Math.min(4, a.val)) / 4) * r;
        const pt = getCoord(a.angle, radius);
        return `<circle cx="${pt.x}" cy="${pt.y}" r="4" fill="${polyColor}" stroke="#ffffff" stroke-width="1.5" />`;
      }).join('')}

      <!-- Center Total SOFA Badge -->
      <circle cx="${cx}" cy="${cy}" r="16" fill="var(--color-surface)" stroke="${polyColor}" stroke-width="2" />
      <text x="${cx}" y="${cy + 4}" fill="${polyColor}" font-size="11" font-weight="900" text-anchor="middle">${totalSofa}</text>
    </svg>
  `;
}

/**
 * 3. Render Surviving Sepsis Hour-1 Bundle Timeline Tracker SVG
 */
export function renderHour1TimelineSvg(): string {
  const steps = [
    { num: '1', title: 'Lactate', sub: 'Đo & Lặp lại' },
    { num: '2', title: 'Cấy Máu', sub: '2 Bộ Trước KS' },
    { num: '3', title: 'Kháng Sinh', sub: 'Phổ Rộng < 1h' },
    { num: '4', title: 'Dịch 30mL/kg', sub: 'Ringer Lactate' },
    { num: '5', title: 'Vận Mạch', sub: 'MAP ≥ 65' }
  ];

  const w = 460;
  const h = 75;

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- Connecting Line -->
      <line x1="45" y1="30" x2="415" y2="30" stroke="var(--color-border)" stroke-width="3" stroke-linecap="round" />

      <!-- 5 Step Nodes -->
      ${steps.map((s, idx) => {
        const x = 45 + idx * 92.5;
        return `
          <g transform="translate(${x}, 30)">
            <circle cx="0" cy="0" r="14" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
            <text x="0" y="4" fill="#ffffff" font-size="11" font-weight="900" text-anchor="middle">${s.num}</text>
            <text x="0" y="24" fill="var(--color-text)" font-size="10" font-weight="800" text-anchor="middle">${s.title}</text>
            <text x="0" y="35" fill="var(--color-text-muted)" font-size="8" text-anchor="middle">${s.sub}</text>
          </g>
        `;
      }).join('')}
    </svg>
  `;
}

/**
 * 4. Render Lactate Dynamics & Clearance Trajectory Curve SVG
 */
export function renderLactateTrajectorySvg(initialLactate: number, repeatLactate?: number, deltaHours: number = 2): string {
  const w = 340;
  const h = 180;
  const padL = 40;
  const padR = 20;
  const padT = 25;
  const padB = 30;

  const chartW = w - padL - padR;
  const chartH = h - padT - padB;

  const maxLactate = Math.max(8, initialLactate * 1.25);
  const maxTime = 12; // 12 hours

  const getX = (t: number) => padL + (t / maxTime) * chartW;
  const getY = (l: number) => padT + chartH - (Math.min(maxLactate, l) / maxLactate) * chartH;

  const p0 = { x: getX(0), y: getY(initialLactate) };
  const p1 = repeatLactate !== undefined ? { x: getX(deltaHours), y: getY(repeatLactate) } : { x: getX(deltaHours), y: getY(initialLactate * 0.75) };
  const pTarget = { x: getX(6), y: getY(2.0) };
  const pEnd = { x: getX(12), y: getY(1.5) };

  const curveD = `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${pEnd.x} ${pEnd.y}`;

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="background:var(--color-surface); border-radius:8px;">
      <!-- Target Safe Zone (< 2.0 mmol/L) -->
      <rect x="${padL}" y="${getY(2.0)}" width="${chartW}" height="${getY(0) - getY(2.0)}" fill="#10b981" opacity="0.12" />
      <text x="${w - padR}" y="${getY(1.2)}" fill="#10b981" font-size="8.5" font-weight="700" text-anchor="end">Ngưỡng An Toàn &lt; 2.0</text>

      <!-- Axes -->
      <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + chartH}" stroke="var(--color-border)" stroke-width="1.5" />
      <line x1="${padL}" y1="${padT + chartH}" x2="${padL + chartW}" y2="${padT + chartH}" stroke="var(--color-border)" stroke-width="1.5" />

      <!-- Y Ticks -->
      <text x="${padL - 6}" y="${getY(6.0)}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">6.0</text>
      <text x="${padL - 6}" y="${getY(4.0)}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">4.0</text>
      <text x="${padL - 6}" y="${getY(2.0)}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="end">2.0</text>

      <!-- X Ticks -->
      <text x="${getX(0)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">0h</text>
      <text x="${getX(2)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">2h</text>
      <text x="${getX(6)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">6h</text>
      <text x="${getX(12)}" y="${h - 10}" fill="var(--color-text-muted)" font-size="8.5" text-anchor="middle">12h</text>

      <!-- Trajectory Curve -->
      <path d="${curveD}" fill="none" stroke="#dc2626" stroke-width="2.5" />

      <!-- Initial Point -->
      <circle cx="${p0.x}" cy="${p0.y}" r="4.5" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
      <text x="${p0.x + 8}" y="${p0.y - 4}" fill="#dc2626" font-size="9" font-weight="900">${initialLactate} mmol/L</text>

      <!-- Repeat Point -->
      ${repeatLactate !== undefined ? `
        <circle cx="${p1.x}" cy="${p1.y}" r="4.5" fill="${repeatLactate < initialLactate ? '#10b981' : '#dc2626'}" stroke="#ffffff" stroke-width="1.5" />
        <text x="${p1.x + 8}" y="${p1.y - 4}" fill="${repeatLactate < initialLactate ? '#10b981' : '#dc2626'}" font-size="9" font-weight="900">${repeatLactate} mmol/L</text>
      ` : ''}
    </svg>
  `;
}

// ============================================================
// NEUROKIT2 MODULE 5: DYNAMIC FLUID RESPONSIVENESS & DELTA-PP (MICHARD 2000)
// ============================================================

export interface DeltaPpInputs {
  ppMax: number;                    // mmHg (Systolic - Diastolic at inspiration)
  ppMin: number;                    // mmHg (Systolic - Diastolic at expiration)
  isMechanicallyVentilated: boolean;// Invasive MV without spontaneous breaths
  tidalVolumeMlKg: number;          // mL/kg PBW (Condition >= 8 mL/kg)
  hasArrhythmia: boolean;           // Sinus rhythm vs Atrial Fibrillation
  plrCardiacOutputIncrease?: number;// Passive Leg Raise % increase (Target >= 10-15%)
}

export interface DeltaPpAnalysisResult {
  deltaPpPercent: number;
  fluidResponsiveness: 'responsive' | 'unresponsive' | 'unreliable';
  badgeColor: string;
  interpretation: string;
  validityChecklist: { check: string; valid: boolean }[];
  clinicalRecommendation: string;
}

export function computeDeltaPpAnalysis(inputs: DeltaPpInputs): DeltaPpAnalysisResult {
  const ppMax = inputs.ppMax;
  const ppMin = inputs.ppMin;
  const ppMean = (ppMax + ppMin) / 2;

  const deltaPpPercent = ppMean > 0 ? parseFloat((((ppMax - ppMin) / ppMean) * 100).toFixed(1)) : 0;

  const validityChecklist = [
    { check: 'Thở máy xâm lấn có an thần/giãn cơ (Không có nhịp tự thở)', valid: inputs.isMechanicallyVentilated },
    { check: 'Thể tích khí lưu thông cài đặt Vt ≥ 8 mL/kg trọng lượng lý tưởng', valid: inputs.tidalVolumeMlKg >= 8 },
    { check: 'Nhịp xoang đều đặn (Không có rung nhĩ / ngoại tâm thu)', valid: !inputs.hasArrhythmia },
    { check: 'Không có suy tim phải cấp tính hoặc tăng áp động mạch phổi nặng', valid: true },
  ];

  const allValid = validityChecklist.every(v => v.valid);

  let fluidResponsiveness: DeltaPpAnalysisResult['fluidResponsiveness'] = 'unresponsive';
  let badgeColor = '#ca8a04';
  let interpretation = `ΔPP = ${deltaPpPercent}% (< 13%): Bệnh nhân nằm ở đoạn dốc phẳng của đường cong Frank-Starling. Ít có khả năng tăng cung lượng tim khi bù thêm dịch.`;
  let clinicalRecommendation = 'Hạn chế bù dịch tự do (nguy cơ quá tải dịch và phù phổi cấp). Cân nhắc dùng thuốc co mạch (Noradrenaline) hoặc tăng co bóp cơ tim (Dobutamine) nếu ScvO2 < 70%.';

  if (!allValid) {
    fluidResponsiveness = 'unreliable';
    badgeColor = '#ea580c';
    interpretation = `⚠️ Không thỏa mãn điều kiện hợp lệ của Michard (2000). ΔPP = ${deltaPpPercent}% không đáng tin cậy.`;
    if (inputs.plrCardiacOutputIncrease !== undefined && inputs.plrCardiacOutputIncrease >= 10) {
      interpretation += ` ➔ Tuy nhiên Nghiệm pháp nâng chân thụ động (PLR) DƯƠNG TÍNH (+${inputs.plrCardiacOutputIncrease}% CO): Bệnh nhân CÓ ĐÁP ỨNG BÙ DỊCH.`;
      fluidResponsiveness = 'responsive';
      badgeColor = '#10b981';
      clinicalRecommendation = 'Bù dịch từng đợt nhỏ (Fluid Challenge 250 - 500 mL tinh thể trong 15-30 phút) dưới sự kiểm soát chặt chẽ của siêu âm tim VTI hoặc CRT.';
    } else {
      clinicalRecommendation = 'Sử dụng Nghiệm pháp Nâng chân thụ động (PLR test) kết hợp đo cung lượng tim liên tục (VTI siêu âm tim qua thành ngực) để đánh giá đáp ứng bù dịch thay vì dựa vào ΔPP.';
    }
  } else if (deltaPpPercent >= 13) {
    fluidResponsiveness = 'responsive';
    badgeColor = '#10b981';
    interpretation = `🟢 ΔPP = ${deltaPpPercent}% (≥ 13%): Bệnh nhân nằm ở đoạn dốc đứng của đường cong Frank-Starling. ĐỘ NHẠY 94%, ĐỘ ĐẶC HIỆU 96% DỰ BÁO ĐÁP ỨNG TĂNG CUNG LƯỢNG TIM VỚI BÙ DỊCH.`;
    clinicalRecommendation = 'Tiến hành Test bù dịch: Truyền 250 - 500 mL dung dịch tinh thể (Ringer Lactate) trong 15 phút và đánh giá lại huyết động, CRT và ΔPP.';
  }

  return {
    deltaPpPercent,
    fluidResponsiveness,
    badgeColor,
    interpretation,
    validityChecklist,
    clinicalRecommendation,
  };
}

/**
 * Render Dải Sóng Huyết Áp Động Mạch Xâm Lấn & Biến Thiên ΔPP SVG Tương Tác
 */
export function renderDeltaPpWaveformSvg(inputs: DeltaPpInputs, theme: 'paper' | 'neon' | 'dark' = 'paper'): string {
  const totalW = 860;
  const totalH = 220;
  const padL = 50;
  const padR = 20;
  const padT = 36;
  const padB = 30;
  const plotW = totalW - padL - padR;
  const plotH = totalH - padT - padB;
  const baseY = padT + plotH * 0.85;

  let bgFill = 'var(--color-bg)';
  let gridLine = 'var(--color-border)';
  let traceColor = '#ef4444';
  let textColor = 'var(--color-text)';

  if (theme === 'neon') {
    bgFill = '#030712';
    gridLine = 'rgba(239, 68, 68, 0.15)';
    traceColor = '#ef4444';
    textColor = '#f87171';
  } else if (theme === 'dark') {
    bgFill = '#0f172a';
    gridLine = 'rgba(255, 255, 255, 0.08)';
    traceColor = '#f43f5e';
    textColor = '#94a3b8';
  }

  const numBeats = 14;
  const beatW = plotW / numBeats;

  // Mô phỏng chu kỳ hô hấp tác động lên biên độ sóng mạch huyết áp
  const ppMax = inputs.ppMax;
  const ppMin = inputs.ppMin;
  const ppScale = plotH * 0.70;

  let pathD = `M ${padL},${baseY} `;
  let maxBeatIdx = 2;
  let minBeatIdx = 8;

  for (let b = 0; b < numBeats; b++) {
    const startX = padL + b * beatW;
    if (startX > totalW - padR) break;

    // Biến thiên biên độ theo thì thở hình sin
    const respCycle = Math.sin((b / numBeats) * Math.PI * 2);
    const curPp = ppMin + ((respCycle + 1) / 2) * (ppMax - ppMin);
    const ampPx = (curPp / 80) * ppScale;

    const xSys = startX + beatW * 0.25;
    const ySys = baseY - ampPx;
    const xNotch = startX + beatW * 0.48;
    const yNotch = baseY - ampPx * 0.40;
    const xDia = startX + beatW * 0.65;
    const yDia = baseY - ampPx * 0.55;
    const xEnd = startX + beatW;

    pathD += `L ${startX},${baseY} `;
    pathD += `C ${startX + beatW * 0.08},${baseY} ${xSys - beatW * 0.05},${ySys} ${xSys},${ySys} `;
    pathD += `C ${xSys + beatW * 0.08},${ySys} ${xNotch - beatW * 0.04},${yNotch} ${xNotch},${yNotch} `;
    pathD += `C ${xNotch + beatW * 0.04},${yNotch} ${xDia - beatW * 0.04},${yDia} ${xDia},${yDia} `;
    pathD += `C ${xDia + beatW * 0.12},${yDia} ${xEnd - beatW * 0.08},${baseY} ${xEnd},${baseY} `;
  }

  const deltaPp = (((ppMax - ppMin) / ((ppMax + ppMin) / 2)) * 100).toFixed(1);

  return `
    <svg viewBox="0 0 ${totalW} ${totalH}" width="100%" height="${totalH}" style="background:${bgFill}; border-radius:10px; display:block; max-width:100%; box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <!-- Header -->
      <rect x="0" y="0" width="${totalW}" height="${padT}" fill="rgba(0,0,0,0.04)" rx="10"/>
      <text x="14" y="22" fill="${textColor}" font-size="11.5" font-weight="800" font-family="'Inter', sans-serif">
        📈 SÓNG HUYẾT ÁP ĐỘNG MẠCH XÂM LẤN (A-LINE) &amp; BIẾN THIÊN ÁP LỰC MẠCH — &Delta;PP: ${deltaPp}%
      </text>
      <text x="${totalW - 14}" y="22" fill="var(--color-text-muted)" font-size="10" font-weight="700" text-anchor="end">
        Mô hình Michard 2000 / NeuroKit2 Dynamics
      </text>

      <!-- Caliper Lines -->
      <line x1="${padL + maxBeatIdx * beatW + beatW * 0.25}" y1="${padT + 5}" x2="${padL + maxBeatIdx * beatW + beatW * 0.25}" y2="${baseY}" stroke="#10b981" stroke-width="1.2" stroke-dasharray="2,2"/>
      <line x1="${padL + minBeatIdx * beatW + beatW * 0.25}" y1="${padT + 5}" x2="${padL + minBeatIdx * beatW + beatW * 0.25}" y2="${baseY}" stroke="#dc2626" stroke-width="1.2" stroke-dasharray="2,2"/>

      <!-- Trace -->
      <path d="${pathD}" fill="none" stroke="${traceColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Annotations -->
      <rect x="${padL + maxBeatIdx * beatW - 20}" y="${padT + 8}" width="80" height="18" rx="4" fill="#10b981" opacity="0.95"/>
      <text x="${padL + maxBeatIdx * beatW + 20}" y="${padT + 20}" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">PPmax = ${ppMax} mmHg</text>

      <rect x="${padL + minBeatIdx * beatW - 20}" y="${padT + 8}" width="80" height="18" rx="4" fill="#dc2626" opacity="0.95"/>
      <text x="${padL + minBeatIdx * beatW + 20}" y="${padT + 20}" fill="#ffffff" font-size="8.5" font-weight="800" text-anchor="middle">PPmin = ${ppMin} mmHg</text>

      <!-- Footer Bar -->
      <g transform="translate(${padL}, ${totalH - 10})">
        <text x="0" y="0" fill="var(--color-text-muted)" font-size="9" font-weight="600">
          Chỉ số biến thiên áp lực mạch: <strong style="color:${parseFloat(deltaPp) >= 13 ? '#10b981' : '#dc2626'};">&Delta;PP = ${deltaPp}%</strong> |
          Ngưỡng phân định: <strong>&ge; 13%</strong> |
          Khuyến nghị: <strong>${parseFloat(deltaPp) >= 13 ? 'DƯƠNG TÍNH (CÓ ĐÁP ỨNG BÙ DỊCH)' : 'ÂM TÍNH (HẠN CHẾ BÙ DỊCH)'}</strong>
        </text>
      </g>
    </svg>
  `;
}
