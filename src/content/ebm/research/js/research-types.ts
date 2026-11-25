/**
 * CliniPortal 2.0 — CliniResearch Studio Type Definitions (Atomic Label Decomposition & 7-Axis Schema)
 * Path: src/content/ebm/research/js/research-types.ts
 */

export type ResearchDesignType =
  | 'rct'
  | 'meta-analysis'
  | 'systematic-review'
  | 'prospective-cohort'
  | 'retrospective-cohort'
  | 'case-control'
  | 'cross-sectional'
  | 'diagnostic-accuracy'
  | 'clinical-review';

export type OutcomeDirectionType =
  | 'positive-superior'
  | 'non-inferior'
  | 'neutral-null'
  | 'harm-negative'
  | 'mixed-coprimary';

export type ImpactVerdictType =
  | 'practice-changing'
  | 'practice-informing'
  | 'confirmatory'
  | 'hypothesis-generating';

export type RobLevelType = 'low' | 'some-concerns' | 'high' | 'not-applicable';
export type GradeCertaintyType = 'high' | 'moderate' | 'low' | 'very-low';

export type LabelTone = 'indigo' | 'emerald' | 'teal' | 'amber' | 'rose' | 'violet' | 'slate';

export type AtomicLabelAxis =
  | 'condition'
  | 'population'
  | 'design'
  | 'intervention'
  | 'comparator'
  | 'endpoint'
  | 'outcome'
  | 'quality'
  | 'topic';

export type FilterableFacetKey =
  | 'specialty'
  | 'conditionKey'
  | 'problemLabel'
  | 'populationTag'
  | 'design'
  | 'comparatorType'
  | 'interventionClass'
  | 'endpointCategory'
  | 'outcomeDirection'
  | 'impactVerdict'
  | 'robOverall'
  | 'gradeCertainty'
  | 'fundingSource'
  | 'yearPeriod'
  | 'topicTag';

export interface ResearchAtomicLabel {
  /** Stable composite key: `${axis}:${value}` */
  key: string;
  axis: AtomicLabelAxis;
  axisTitle: string;
  axisShort: string;
  facetKey: FilterableFacetKey;
  value: string;
  label: string;
  icon: string;
  tone: LabelTone;
  isPrimary?: boolean;
}

export interface LabelOverlapReport {
  similarityPercent: number;
  sharedLabels: ResearchAtomicLabel[];
  divergentAxes: Array<{
    axis: AtomicLabelAxis;
    axisTitle: string;
    valuesByStudy: Array<{
      studyId: string;
      studyLabel: string;
      labels: ResearchAtomicLabel[];
    }>;
  }>;
}

export interface ResearchPrimaryMetric {
  measure?: string; // HR | RR | OR | aOR | ARR | AUC | WMD | MD | Prevalence
  interventionRate?: string;
  controlRate?: string;
  effectEstimate?: number | null;
  ciLower?: number | null;
  ciUpper?: number | null;
  rawDiffText?: string;
  pValue?: string;
  nnt?: number | null;
  nnh?: number | null;
}

export interface ResearchSectionItem {
  id: string;
  number?: number;
  title: string;
  icon?: string;
}

export interface ResearchStudyRecord {
  id: string;
  slug: string;
  code?: string;
  trialAcronym?: string;
  title: string;
  titleEn?: string;
  authors?: string;
  journal: string;
  organization?: string;
  year: number;
  doi?: string;
  pmid?: string;
  nctId?: string;
  sourceUrl?: string;
  file: string;

  // Axis 1: Clinical Problem & Condition Labels
  specialty: string;
  specialty2?: string;
  conditionKey: string;
  problemLabels: string[];
  icd10: string[];

  // Axis 2: Study Design & Methodological Labels
  design: ResearchDesignType | string;
  phase?: string;
  blinding?: string;
  centerScope?: string;
  hypothesisType?: string;
  sampleSize?: number | null;
  followUpDuration?: string;
  asianData?: boolean;

  // Axis 3: Structured PICO Labels
  populationTags: string[];
  population?: string;
  interventionClass: string;
  drug?: string;
  intervention?: string;
  comparatorType?: string;
  comparatorDetail?: string;
  primaryEndpointCategory: string;
  primaryEndpoint?: string;

  // Axis 4: Outcome Direction & Quantitative Metrics
  outcomeDirection: OutcomeDirectionType | string;
  impactVerdict: ImpactVerdictType | string;
  keyResults?: string;
  primaryMetric?: ResearchPrimaryMetric;
  safetyHighlight?: string;

  // Axis 5: Critical Appraisal & Quality Labels
  robOverall: RobLevelType | string;
  gradeCertainty: GradeCertaintyType | string;
  fragilityIndex?: number | null;
  fundingSource?: string;

  // Axis 6: Custom Topic Clusters
  topicTags: string[];
  tags: string[];

  // Axis 7: Synthesis Content & Sections
  summary?: string;
  detailedConclusion?: string;
  description?: string;
  keyRecommendations?: string[];
  clinicalPearls?: string[];
  subgroups?: Record<string, string>;
  sections?: ResearchSectionItem[];
  updatedAt?: string;

  // User Local State
  bookmarked?: boolean;
  personalNote?: string;
}

export interface ResearchFilterState {
  search: string;
  specialty: string | null;
  conditionKey: string | null;
  problemLabel: string | null;
  populationTag: string | null;
  design: string | null;
  comparatorType: string | null;
  outcomeDirection: string | null;
  impactVerdict: string | null;
  interventionClass: string | null;
  endpointCategory: string | null;
  robOverall: string | null;
  gradeCertainty: string | null;
  fundingSource: string | null;
  yearPeriod: string | null;
  topicTag: string | null;
  asianOnly: boolean;
  savedOnly: boolean;
}

export type ResearchSortKey = 'year-desc' | 'sample-desc' | 'if-desc' | 'grade-desc';
export type ResearchViewMode = 'cards' | 'matrix';
export type ResearchCompareTab = 'matrix' | 'labels' | 'forest' | 'timeline' | 'discordance';
export type CompareMatrixGroupKey =
  | 'identity'
  | 'condition'
  | 'design'
  | 'pico'
  | 'quant'
  | 'appraisal'
  | 'clinical';

export interface LabelClusterGroup {
  clusterKey: string;
  axisLabel: string;
  axis: AtomicLabelAxis;
  title: string;
  badgeText: string;
  studies: ResearchStudyRecord[];
  hasDiscordance: boolean;
}

export interface IndexedLabelSummary {
  label: ResearchAtomicLabel;
  studies: ResearchStudyRecord[];
  hasDiscordance: boolean;
  positiveCount: number;
  neutralOrHarmCount: number;
}
