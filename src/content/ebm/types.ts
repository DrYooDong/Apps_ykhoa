/**
 * CliniPortal — EBM & Guidelines Type Definitions
 */

export interface SpecialtyMeta {
  name: string;
  color: string;
  bg: string;
}

export interface SourceTypeMeta {
  name: string;
  color: string;
  bg: string;
}

export interface DesignMeta {
  name: string;
}

export interface ImpactMeta {
  name: string;
  color: string;
  bg: string;
}

export interface ClinicalConditionMeta {
  id: string;
  name: string;
  icd10: string[];
  color: string;
  bg: string;
}

export interface JournalMetric {
  name: string;
  journal: string;
  aliases: string[];
  if: number | null;
  quartile: string;
  sjr: number | null;
  snip: number | null;
  hIndex: number | null;
  category: string;
  publisher: string;
  issn: string;
}

export interface EbmGuideline {
  id: string;
  title: string;
  organization: string;
  year: number;
  specialty: string;
  sourceType: string;
  design: string;
  impact: string;
  conditionId?: string;
  keyPoints: string[];
  recommendationGrade?: string;
  evidenceLevel?: string;
  infographicPath?: string;
  originalUrl?: string;
  tags: string[];
}

export interface PicoOutcome {
  name: string;
  category: 'primary' | 'secondary' | 'composite' | 'surrogate' | 'safety';
  metric: 'HR' | 'RR' | 'OR' | 'MD' | 'SMD' | 'RD';
  val: number;
  low: number;
  high: number;
}

export interface PicoQuestion {
  p: string;
  i: string;
  c: string;
  outcomes: PicoOutcome[];
}

export interface EbmTable2x2 {
  a: number; // Intervention Event
  b: number; // Intervention Non-Event
  c: number; // Control Event
  d: number; // Control Non-Event
}

export interface EbmCalculationResult {
  eer: number; // Experimental Event Rate (a / (a + b))
  cer: number; // Control Event Rate (c / (c + d))
  arr: number; // Absolute Risk Reduction (|CER - EER|)
  rrr: number; // Relative Risk Reduction (ARR / CER)
  rr: number;  // Relative Risk (EER / CER)
  or: number;  // Odds Ratio ((a*d)/(b*c))
  nnt: number; // Number Needed to Treat (1 / ARR)
  sens?: number; // Sensitivity (a / (a + c))
  spec?: number; // Specificity (d / (b + d))
  ppv?: number;  // Positive Predictive Value (a / (a + b))
  npv?: number;  // Negative Predictive Value (d / (c + d))
  lrPos?: number; // Positive Likelihood Ratio (Sens / (1 - Spec))
  lrNeg?: number; // Negative Likelihood Ratio ((1 - Sens) / Spec)
}

export interface ForestPlotStudy {
  study: string;
  year: number;
  sampleSize: number;
  effect: number;
  ciLower: number;
  ciUpper: number;
  weight: number;
}

export interface RadarUpdateItem {
  id: string;
  title: string;
  organization: string;
  year: number;
  specialty: string;
  oldRecommendation: string;
  newRecommendation: string;
  evidenceLevel: string;
  landmarkTrial?: string;
  clinicalImpact: string;
  tags: string[];
}

export interface StatQuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
