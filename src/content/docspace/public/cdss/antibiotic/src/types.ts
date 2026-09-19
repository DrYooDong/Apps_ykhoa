export type Language = 'vi' | 'en';

export type Gender = 'm' | 'f';

export type RenalCategory = 'normal' | 'mild' | 'moderate' | 'severe' | 'esrd' | 'arc';

export type DialysisMode = 'none' | 'hd' | 'crrt' | 'capd';

export interface PatientState {
  scr: number; // in current unit (typically umol/L, e.g. 90, or mg/dL e.g. 1.0)
  scrUnit: 'umol' | 'mgdl';
  age: number;
  gender: Gender;
  weight: number; // TBW in kg
  height: number | null; // in cm
  dialysis: DialysisMode;
  // Consultation record metadata
  patientName?: string;
  patientId?: string;
  department?: string;
  diagnosis?: string;
  clinicalIndication?: string;
}

export interface CalculatedRenalMetrics {
  scrUmol: number;
  scrMgdl: number;
  crcl: number;
  ibw: number | null;
  adjBw: number | null;
  bmi: number | null;
  usedWeight: number;
  usedWeightType: string;
  renalCategory: RenalCategory;
  categoryLabelVi: string;
  categoryLabelEn: string;
  isArc: boolean; // Augmented renal clearance CrCl > 130
}

export type AwareCategory = 'Access' | 'Watch' | 'Reserve';

export interface AntibioticItem {
  id: string;
  name: string;
  nameEn?: string;
  group: string;
  groupEn: string;
  route: string;
  aliases: string[];
  forms?: string;
  indications: string[];
  indicationsEn: string[];
  needsHeight?: boolean;
  hasLoadingDose?: boolean;
  primaryTargetBacteria?: string;
  mechanismSummaryVi?: string;
  mechanismSummaryEn?: string;
  awareCategory?: AwareCategory;
  whoAdultDose?: string;
  whoPediatricDose?: string;
}

export interface WhoDiseaseGuideline {
  id: string;
  chapterNumber: number;
  nameVi: string;
  nameEn: string;
  category: 'primary_care' | 'hospital' | 'reserve';
  categoryLabelVi: string;
  categoryLabelEn: string;
  definitionVi: string;
  definitionEn: string;
  commonPathogens: {
    viral?: string[];
    bacterial?: string[];
    other?: string[];
  };
  clinicalPresentationVi: string;
  clinicalPresentationEn: string;
  nonAntibioticCareVi?: string;
  nonAntibioticCareEn?: string;
  firstLineAdult: string;
  firstLinePediatric: string;
  secondLineAdult?: string;
  secondLinePediatric?: string;
  durationVi: string;
  durationEn: string;
  clinicalNotesVi?: string;
  clinicalNotesEn?: string;
  redFlagsVi?: string[];
  redFlagsEn?: string[];
  awareClasses: {
    firstLine: AwareCategory[];
    secondLine?: AwareCategory[];
  };
}

export interface DosingScenario {
  key: string;
  label: string;
  labelEn?: string;
  def: boolean;
}

export interface RenalTableRow {
  label: string;
  thr: number;
  op: 'gt' | 'gte';
  doses: Record<string, string | { label: string; dose: string }[]>;
  hero?: Record<string, string | { label: string; dose: string }[]>;
  note?: string;
  noteEn?: string;
}

export interface InfusionOrder {
  vol: number; // mL
  time: number; // minutes
  solvent?: string;
}

export type InteractionSeverity = 'major' | 'moderate' | 'minor';

export interface DrugInteraction {
  id: string;
  antibioticIds: string[]; // which antibiotics trigger this interaction
  interactingDrugVi: string;
  interactingDrugEn: string;
  interactingGroupVi: string;
  interactingGroupEn: string;
  severity: InteractionSeverity;
  clinicalEffectVi: string;
  clinicalEffectEn: string;
  mechanismVi: string;
  mechanismEn: string;
  managementVi: string;
  managementEn: string;
  referenceSource?: string;
}

export interface AmrRecord {
  orgIndex: number;
  specIndex: number;
  susceptibilityPct: number;
  sampleCount: number;
  variantIndex?: number;
}
