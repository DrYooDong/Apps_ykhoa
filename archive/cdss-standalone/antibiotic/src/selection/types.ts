/**
 * Type definitions for CDSS Antibiotic Selection & Clinical Decision Support
 * Based on BV Bệnh Nhiệt Đới (2026) & Quyết định 5631/QĐ-BYT (2020)
 */

export type Population = 'adult' | 'pediatric';

export type InfectionSite = 
  | 'respiratory'       // Viêm phổi (CAP, HAP, VAP)
  | 'sepsis'            // Nhiễm khuẩn huyết
  | 'skin_soft_tissue'  // Da & mô mềm (SSTI)
  | 'urinary'           // Nhiễm trùng tiết niệu (UTI)
  | 'peritoneal'        // Nhiễm trùng dịch báng / Viêm màng bụng
  | 'gastrointestinal'  // Tiêu hóa / Ổ bụng
  | 'cns';              // Thần kinh trung ương (Viêm màng não...)

export type SepsisSource = 
  | 'respiratory'
  | 'gastrointestinal'
  | 'skin_soft_tissue'
  | 'peritoneal'
  | 'urinary';

export type RiskGroup = 'group_1' | 'group_2';

export interface SourceRef {
  doc: string;    // 'BVBND_LuuDo' (File 1) | 'BVBND_PhanNhom' (File 2) | 'BVBND_HDSDKS' (File 3) | 'BYT_5631' (File 4)
  page: number | number[];
  note?: string;
}

export interface RiskFactorItem {
  id: string;
  labelVi: string;
  labelEn: string;
  category: 'general' | 'mrsa' | 'esbl' | 'pseudo_acineto' | 'enterococcus' | 'candida';
  noteVi?: string;
  noteEn?: string;
  source: SourceRef;
}

export interface SeverityAssessment {
  scoreType: 'sofa' | 'psofa' | 'clif_sofa';
  scoreValue: number;
  isHighSeverity: boolean; // SOFA >= 2, pSOFA >= 8, CLIF-SOFA >= 12
  customDetails?: Record<string, boolean | number>;
}

export type SpecificPathogenRisk = 
  | 'mrsa'
  | 'esbl'
  | 'pseudo_acineto'
  | 'enterococcus'
  | 'candida';

export interface RiskClassificationResult {
  group: RiskGroup;
  groupLabelVi: string;
  groupLabelEn: string;
  generalRiskCount: number;
  isHighSeverity: boolean;
  severityScoreType: string;
  severityScoreValue: number;
  activeGeneralFactors: string[];
  activeSpecificRisks: SpecificPathogenRisk[];
  rationalesVi: string[];
  rationalesEn: string[];
  source: SourceRef;
}

export interface DrugChoiceItem {
  drugId?: string; // id map vào ANTIBIOTICS (nếu có trong module liều)
  nameVi: string;
  nameEn: string;
  standardDoseVi?: string;
  route?: string;
  isPrimary?: boolean;
  isAlternative?: boolean;
  hasDosingCalculator: boolean; // true nếu có trong ANTIBIOTICS hiện có
  infusionNoteVi?: string;
}

export interface EmpiricRegimen {
  id: string;
  site: InfectionSite;
  sepsisSource?: SepsisSource;
  population: Population;
  riskGroup: RiskGroup;
  specificRisk?: SpecificPathogenRisk;
  titleVi: string;
  titleEn: string;
  drugs: DrugChoiceItem[];
  combinationRulesVi?: string[];
  combinationRulesEn?: string[];
  cautionVi?: string[];
  cautionEn?: string[];
  source: SourceRef;
}

export interface AntibiogramItem {
  organismName: string;
  sampleCount: number;
  pctOfIsolates: number;
  sensitivities: Array<{
    antibioticName: string;
    sensitivityPct: number;
    resistantPct?: number;
  }>;
  notableResistance?: string;
}

export interface AntibiogramDataset {
  site: InfectionSite;
  population: Population;
  period: string; // e.g. "01/2024 - 12/2024"
  sampleTotal: number;
  organisms: AntibiogramItem[];
  source: SourceRef;
}

// 48-72h Evaluation types
export type ClinicalResponseStatus = 'improved' | 'not_improved' | 'worsened';
export type CultureStatus = 'pending' | 'negative' | 'positive';
export type SusceptibilityStatus = 'sensitive' | 'resistant' | 'intermediate';

export interface ReassessmentEvaluation {
  actionType: 'continue' | 'de_escalate' | 'switch_by_ast' | 'consult';
  actionTitleVi: string;
  actionTitleEn: string;
  recommendationsVi: string[];
  recommendationsEn: string[];
  stopChecklistEligible: boolean;
  ivToPoEligible: boolean;
  source: SourceRef;
}

// Targeted MDR Pathways
export type MdrPathogenCategory = 'cre' | 'dtr_pseudo' | 'crab' | 's_maltophilia';

export interface MdrTargetedPathway {
  category: MdrPathogenCategory;
  titleVi: string;
  titleEn: string;
  definitionVi: string;
  firstLineDrugs: DrugChoiceItem[];
  combinationRegimens: DrugChoiceItem[][];
  alternativeDrugs: DrugChoiceItem[];
  contraindicationsVi?: string[];
  clinicalNotesVi: string[];
  dosingTable?: Array<{
    drugName: string;
    doseVi: string;
    route: string;
  }>;
  source: SourceRef;
}

// NHSN-CDC Diagnostic Criteria
export interface NhsnCriteriaSection {
  id: string;
  titleVi: string;
  site: InfectionSite;
  population: Population;
  requiredCriteriaCount: number;
  criteria: Array<{
    id: string;
    textVi: string;
    isClinical?: boolean;
    isImaging?: boolean;
    isLab?: boolean;
    isMicrobiology?: boolean;
  }>;
  source: SourceRef;
}

// Stop Antibiotic Criteria Checklist
export interface StopCriteriaChecklist {
  minDurationDays: number;
  trialReference: string;
  clinicalCriteria: Array<{
    id: string;
    labelVi: string;
    met: boolean;
  }>;
  labCriteria: Array<{
    id: string;
    labelVi: string;
    met: boolean;
  }>;
}

// IV to PO Switch Criteria
export interface IvToPoEvaluation {
  isEligible: boolean;
  blockingReasonsVi: string[];
  suggestedPoDrugs: Array<{
    ivName: string;
    poName: string;
    poDoseVi: string;
    groupIndex: 1 | 2 | 3 | 4;
    bioavailabilityVi: string;
  }>;
}

// Selection Wizard State
export interface SelectionWizardState {
  currentStep: 1 | 2 | 3 | 4 | 5;
  indicationConfirmed: boolean;
  nhsnCheckedIds: string[];
  population: Population;
  site: InfectionSite;
  sepsisSource?: SepsisSource;
  checkedGeneralRiskIds: string[];
  sofaScore: number;
  psofaScore: number;
  clifSofaScore: number;
  isChronicLiverDisease: boolean;
  checkedSpecificRisks: SpecificPathogenRisk[];
  selectedRegimenId?: string;
  selectedDrugForDosing?: string;
  
  // Reassessment at 48-72h
  clinicalResponse: ClinicalResponseStatus;
  cultureStatus: CultureStatus;
  susceptibilityStatus: SusceptibilityStatus;
  identifiedMdrType?: MdrPathogenCategory;
  creGenotype?: 'kpc' | 'oxa_48' | 'mbl';
  checkedStopCriteriaIds: string[];
  checkedIvToPoCriteriaIds: string[];
  daysOnAntibiotic: number;
}
