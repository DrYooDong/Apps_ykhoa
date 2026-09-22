export type Gender = 'male' | 'female';

export type PatientType = 'adult' | 'pediatric' | 'neonatal';

export type ClinicalSetting = 'ward' | 'icu';

export type RenalStatus = 
  | 'normal_or_ckd' 
  | 'intermittent_hd' 
  | 'crrt' 
  | 'sled';

export type InfusionMethod = 'intermittent' | 'continuous';

export type ScrUnit = 'umol_L' | 'mg_dL';

export interface PatientProfile {
  id: string;
  name: string;
  age: number; // in years (or months if pediatric, weeks if neonatal)
  ageUnit: 'years' | 'months' | 'weeks';
  gender: Gender;
  weight: number; // kg
  height: number; // cm
  scrValue: number; // in current unit
  scrUnit: ScrUnit;
  patientType: PatientType;
  clinicalSetting: ClinicalSetting;
  renalStatus: RenalStatus;
  hdDialyzerPermeability?: 'high' | 'low';
  hdTiming?: 'after_dialysis' | 'intradialytic';
  indication: 'severe_mrsa' | 'non_severe' | 'cns_infection';
  mic: number; // mg/L (default 1.0)
  concomitantNephrotoxins: string[];
}

export interface RenalCalculations {
  bmi: number;
  bmiClassification: string;
  ibw: number;
  abw: number;
  crcl: number; // ml/min (Cockcroft-Gault)
  crclUsedWeight: 'TBW' | 'IBW' | 'ABW';
  egfrCkdEpi: number; // ml/min/1.73m2
  scrMgDl: number;
  scrUmolL: number;
}

export interface InitialDosingResult {
  loadingDoseMg: number;
  loadingDoseMgPerKg: number;
  loadingInfusionMinutes: number;
  loadingNote: string;
  
  maintenanceMethod: InfusionMethod;
  maintenanceDoseMg: number;
  maintenanceIntervalHours: number; // e.g., 8, 12, 24, 48
  dailyMaintenanceMg: number;
  maintenanceInfusionMinutes: number;
  continuousRateMgPerHour?: number;
  recommendationSource: string;
  dosingRationale: string;
  safetyCautions: string[];
}

export interface TdmInput {
  regimenType: InfusionMethod;
  currentDoseMg: number;
  currentIntervalHours: number;
  infusionDurationHours: number;
  
  // Intermittent approach: 'bayesian_single' (ASHP 2020 preferred) or 'two_point' (Sawchuk-Zaske / Pai 2014)
  intermittentMethod?: 'bayesian_single' | 'two_point';

  // For Bayesian 1-sample method (in first 24-48h or at steady-state)
  singleConcentration?: number; // mg/L
  singleSampleType?: 'trough' | 'random'; // trough or random/any sample
  singleSampleHoursAfterDose?: number; // hours from start of dose
  singleDoseNumber?: number; // 1, 2, 3, 4 (steady state)

  // For 2-point intermittent (Peak - Trough)
  peakConcentration?: number; // mg/L (1-2h post-infusion)
  peakTimeAfterEndHours?: number; // hours after end of infusion
  troughConcentration?: number; // mg/L (pre-dose)
  troughTimeBeforeNextHours?: number; // hours before next dose
  
  // For continuous
  steadyStateConcentration?: number; // mg/L
}

export interface TdmEvaluationResult {
  auc24: number;
  auc24TargetMin: number;
  auc24TargetMax: number;
  targetAttainment: 'subtherapeutic' | 'target' | 'supratherapeutic';
  kel?: number; // 1/h
  halfLifeHours?: number; // h
  cMaxEstimated?: number;
  cMinEstimated?: number;
  clEstimated?: number; // Individual clearance (L/h)
  vdEstimated?: number; // Individual volume of distribution (L)
  popCl?: number; // Population clearance prior (L/h)
  popVd?: number; // Population Vd prior (L)
  estimationMethod?: 'bayesian_single' | 'two_point' | 'continuous_css';
  adjustedDoseRecommendation: string;
  suggestedDoseMg?: number;
  suggestedIntervalHours?: number;
  suggestedContinuousRateMgH?: number;
  predictedAuc24?: number;
  clinicalNote: string;
}
