/**
 * CliniPortal CDSS — Core Type Definitions
 * Path: src/content/knowledge-vault/cdss/cdss-types.ts
 */

export type CDSSCategory = 
  | 'infectious'      // Truyền nhiễm & Vi sinh
  | 'cardiology'      // Tim mạch
  | 'resuscitation'   // Hồi sức Cấp cứu
  | 'respiratory'     // Hô hấp & Khí máu động mạch
  | 'radiology'       // Chẩn đoán hình ảnh X-Quang
  | 'pediatrics'      // Nhi khoa
  | 'nephrology'      // Thận - Tiết niệu
  | 'pharmacology';   // Dược lý lâm sàng

export interface CDSSModuleMeta {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  shortDesc: string;
  category: CDSSCategory;
  categoryName: string;
  version: string;
  updatedAt: string;
  author: string;
  guidelineSource: string;
  icd10?: string[];
  icon: string;
  badge?: string;
  isStandalone: boolean;
  standaloneUrl: string;
}

// -------------------------------------------------------------
// DENGUE CDSS SPECIFIC TYPES
// -------------------------------------------------------------

export type DengueAgeGroup = 'adult' | 'adolescent' | 'child'; // >=16 | 13-15 | <13
export type DengueSeverity = 'warning_signs' | 'shock' | 'severe_shock';
export type Gender = 'male' | 'female';

export interface DenguePatientInput {
  ageYears: number;
  gender: Gender;
  actualWeightKg: number;
  heightCm?: number;
  severity: DengueSeverity;
  initialHctPercent?: number;
  baselineHctPercent?: number;
  startTime?: string; // HH:mm format, e.g. "08:00"
  hasComorbidities?: {
    heartFailure?: boolean;
    chronicKidneyDisease?: boolean;
    thalassemia?: boolean;
    pregnancy?: boolean;
    liverDisease?: boolean;
  };
}

export interface WeightCalculationResult {
  actualWeightKg: number;
  standardWeightKg: number;
  isObese: boolean;
  ratioToStandard: number; // e.g. 1.25 for 125%
  adjustedWeightKg: number;
  formulaNote: string;
  warningText?: string;
}

export interface FluidScheduleRow {
  stepIndex: number;
  stageName: string;
  durationHours: number;
  rateMlKgH: number;
  dropsPerMin: number;
  totalMl: number;
  timeWindow: string; // e.g. "08:00 - 10:00"
  existingFluidMl: number;
  bottlesToHang: number;
  bottleType: '500ml' | '250ml';
  totalAtPoleMl: number;
  monitoringNotes: string;
  hctCheckRequired: boolean;
}

export interface VasopressorDoseInfo {
  drugName: 'Dopamin' | 'Noradrenalin';
  patientWeightKg: number;
  calculationFormula: string;
  totalMg: number;
  diluentSolution: string;
  syringeVolumeMl: number;
  infusionEquivalent: string; // e.g. "1 ml/h = 1 µg/kg/phút"
  standardDoseRange: string;
  recommendedPumpRateMlH: string; // e.g. "5 - 10 ml/h"
  clinicalIndications: string;
  precautions: string;
}

export interface CDSSAlertItem {
  id: string;
  level: 'info' | 'warning' | 'danger' | 'success';
  title: string;
  message: string;
  ruleCode: string;
}

export interface DengueCDSSPlan {
  patient: DenguePatientInput;
  ageGroup: DengueAgeGroup;
  weightResult: WeightCalculationResult;
  fluidRows: FluidScheduleRow[];
  totalVolumeMl: number;
  totalDurationHours: number;
  vasopressorDopamin: VasopressorDoseInfo;
  vasopressorNoradrenalin: VasopressorDoseInfo;
  alerts: CDSSAlertItem[];
  nursingInstructions: string[];
  soapExportText: string;
  createdAt: string;
}

declare global {
  interface Window {
    dengueData?: any;
    ecgData?: any;
    ecgCanvas?: any;
    xrayData?: any;
    xrayViewer?: any;
  }
}

