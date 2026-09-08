/**
 * CliniPortal CDSS — Arterial Blood Gas (ABG Pro) Type Definitions
 * Path: src/content/knowledge-vault/cdss/abg/abg-types.ts
 */

export type PressureUnit = 'mmHg' | 'kPa';

export interface ABGInput {
  unit: PressureUnit;
  pH: number;
  pCO2: number;
  pO2: number;
  hco3: number;
  be: number;
  sao2: number;
  fio2: number; // e.g. 21 for 21% (0.21)
  na?: number;
  k?: number;
  cl?: number;
  lactate?: number;
  glucose?: number;
  albumin?: number;
  patientAge?: number;
  coHb?: number;
  isVenousSample?: boolean;
}

export type GasExchangeCategory = 
  | 'normal' 
  | 'type1_respiratory_impairment' 
  | 'type2_respiratory_impairment' 
  | 'hyperventilation';

export type GasExchangeSeverity = 'normal' | 'mild' | 'moderate' | 'severe';

export type Type2Subtype = 'acute' | 'chronic' | 'acute_on_chronic';

export type AcidBaseCategory = 
  | 'normal'
  | 'respiratory_acidosis'
  | 'respiratory_alkalosis'
  | 'metabolic_acidosis'
  | 'metabolic_alkalosis'
  | 'mixed_acid_base';

export type CompensationStatus = 
  | 'uncompensated' 
  | 'partially_compensated' 
  | 'fully_compensated' 
  | 'mixed';

export interface StepEvaluation {
  stepNumber: number;
  stepName: string;
  title: string;
  finding: string;
  detail: string;
  status: 'normal' | 'warning' | 'danger' | 'info';
}

export interface ABGAnalysisResult {
  // Gas exchange (Trục 1)
  gasExchange: {
    category: GasExchangeCategory;
    title: string;
    description: string;
    severity: GasExchangeSeverity;
    type2Subtype?: Type2Subtype;
    isHyperventilationPrimary?: boolean;
    isHypoxaemia: boolean;
    hypoxaemiaSeverity: GasExchangeSeverity;
  };
  
  // Acid-Base status (Trục 2)
  acidBase: {
    category: AcidBaseCategory;
    title: string;
    description: string;
    compensation: CompensationStatus;
    acidaemiaStatus: 'acidaemia' | 'alkalaemia' | 'normal';
    primaryDisorder: string;
    compensatoryResponse: string;
    isMixed: boolean;
    mixedDetails?: string;
  };

  // Calculations
  calculations: {
    hIonNmol: number;
    pao2MmHg: number;
    paco2MmHg: number;
    pao2Kpa: number;
    paco2Kpa: number;
    pfRatio: number;
    pfClass: string;
    pao2Alveolar: number; // PAO2
    aaGradient: number; // A-a gradient
    expectedAaGradient: number;
    isAaGradientElevated: boolean;
    anionGap?: number;
    anionGapWithK?: number;
    isAnionGapHigh?: boolean;
    correctedAnionGap?: number;
    deltaRatio?: number;
    deltaRatioInterpretation?: string;
    expectedPaco2Winter?: { min: number; max: number };
  };

  // Warning flags
  criticalWarnings: string[];

  // 6-step interpretation
  sixSteps: StepEvaluation[];

  // Clinical Recommendations & Treatment
  treatmentProtocols: {
    summary: string;
    oxygenTherapy: string;
    ventilationSupport: string;
    underlyingManagement: string[];
    monitoringAdvice: string;
    precautions: string[];
  };
}

export interface ClinicalCase {
  id: number;
  source: string;
  caseNumberDisplay: string;
  title: string;
  patientProfile: string;
  categoryTag: string;
  difficulty: 'Cơ bản' | 'Trung bình' | 'Nâng cao' | 'Cấp cứu';
  history: string;
  examination: {
    vitals: {
      pulse?: string;
      rr?: string;
      bp?: string;
      temp?: string;
      spo2?: string;
      fio2?: string;
      glucose?: string;
    };
    findings: string;
  };
  abg: ABGInput;
  questions: string[];
  answers: {
    gasExchange: string;
    acidBase: string;
    differentialDiagnosis: string;
    clinicalAction: string;
    physiologicalInsight: string;
  };
}

export interface TreatmentProtocol {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  severityBadge: string;
  indications: string[];
  goals: string[];
  steps: {
    title: string;
    action: string;
    notes?: string;
  }[];
  cautions: string[];
}

export interface GlossaryItem {
  id: string;
  term: string;
  symbol: string;
  normalRange: string;
  unit: string;
  definition: string;
  clinicalSignificance: string;
  highCauses: string[];
  lowCauses: string[];
}
