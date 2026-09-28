/**
 * CDSS Inpatient Diabetes Management Types & Constants
 * Grounded in ADA 2026, JBDS-IP 2022-2026, and VADE/iSTEP-D protocols
 */

export type DiabetesType = 'T2D' | 'T1D' | 'STRESS' | 'NEW_ONSET' | 'SECONDARY';
export type WardType = 'NON_ICU' | 'ICU';
export type DietType = 'ORAL_FULL' | 'ORAL_POOR' | 'NPO' | 'ENTERAL_TUBE' | 'TPN';
export type InsulinRegimenType = 'BASAL_BOLUS' | 'BASAL_PLUS' | 'PREMIX' | 'VRIII';
export type GlucoseUnit = 'mg_dl' | 'mmol_l';

export interface PatientData {
  id: string;
  patientName: string;
  age: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  diabetesType: DiabetesType;
  wardType: WardType;
  dietType: DietType;
  currentGlucose: number; // in current selected unit
  unit: GlucoseUnit;
  fastingGlucose?: number; // for basal titration
  hba1c?: number; // in %
  egfr?: number; // ml/min/1.73m2
  creatinine?: number; // umol/L
  potassium?: number; // mmol/L
  bloodKetones?: number; // mmol/L
  venousPh?: number;
  bicarbonate?: number; // mmol/L
  sodium?: number; // mmol/L
  chloride?: number; // mmol/L
  urea?: number; // mmol/L
  
  // Clinical flags
  isTakingSteroids: boolean;
  steroidType?: 'prednisolone' | 'dexamethasone' | 'hydrocortisone' | 'methylprednisolone';
  steroidDoseMg?: number;
  steroidSchedule?: 'morning_once' | 'multiple_daily';
  
  isScheduledSurgery: boolean;
  surgeryFastingExpectedMeals?: 'one_meal' | 'more_than_one';
  
  isOnDialysis: boolean;
  dialysisType?: 'hemodialysis' | 'peritoneal';
  isDialysisDay?: boolean;
  pdFluidType?: 'glucose_based' | 'icodextrin' | 'amino_acid';

  currentOralMeds: string[]; // ['metformin', 'gliclazide', 'dapagliflozin', etc.]
  isPriorInsulinTreated: boolean;
  priorHomeTdd?: number;

  // IV to SC transition data
  isOnIVInsulin: boolean;
  ivRateLast6hAvg?: number; // units/hr

  // Regimen preference option (User selectable)
  userPreferredRegimen?: InsulinRegimenType;
  premixPreDinnerGlucose?: number; // for premix morning dose titration
}

export interface InsulinCalculationResult {
  tddEstimated: number; // Total Daily Dose (Units)
  dosePerKgFactor: number;
  calculationMethod: 'WEIGHT_BASED' | 'IV_CONVERSION' | 'HOME_DOSE_REDUCTION';
  rationale: string;
  
  // Regimen breakdown
  regimenType: InsulinRegimenType;
  basalDose: number;
  basalTiming: string;
  basalDrugSuggestion: string;
  
  prandialDoseTotal: number;
  prandialBreakfast: number;
  prandialLunch: number;
  prandialDinner: number;
  prandialDrugSuggestion: string;

  // Premixed Insulin Breakdown (2-phase biphasic: 70/30, 50/50, 75/25)
  premixDosing?: {
    morningDose: number; // 2/3 TDD
    eveningDose: number; // 1/3 TDD (hoặc 1/2 - 1/2)
    morningTiming: string;
    eveningTiming: string;
    premixDrugs: string;
    titrationRule: {
      morningTitrationBasedOn: string;
      eveningTitrationBasedOn: string;
      scaleTable: {
        glucoseDesc: string;
        bgMinMmol: number;
        bgMaxMmol: number;
        bgMinMgDl: number;
        bgMaxMgDl: number;
        doseAdjustmentPercent: number; // -20%, 0, +10%, +20%, +30%
        note: string;
      }[];
    };
  };
  
  // Correction scale table
  correctionScale: {
    rangeDesc: string;
    bgMinMgDl: number;
    bgMaxMgDl: number;
    bgMinMmol: number;
    bgMaxMmol: number;
    sensitiveDose: number;
    usualDose: number;
    resistantDose: number;
  }[];
  patientSensitivityCategory: 'SENSITIVE' | 'USUAL' | 'RESISTANT';
  recommendedCorrectionColumn: string;

  // Next morning basal titration recommendation
  basalTitrationGuidance?: {
    currentFasting: number;
    adjustmentUnits: number;
    actionText: string;
    alertSeverity: 'success' | 'info' | 'warning' | 'danger';
  };
}

export interface ClinicalAlert {
  id: string;
  category: 'HYPO' | 'DKA_HHS' | 'OAD_SAFETY' | 'SURGERY' | 'STEROID' | 'DIALYSIS' | 'GENERAL';
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  actionGuideline: string;
  citation: string;
}

export interface HypoProtocolDetails {
  severityLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LOOMING';
  algorithmPathway: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  definition: string;
  immediateAction: string[];
  retestInstructions: string;
  recoveryStep: string;
  criticalNotes: string[];
}
