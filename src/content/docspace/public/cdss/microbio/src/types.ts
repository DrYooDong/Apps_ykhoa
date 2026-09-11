export type Language = 'vi' | 'en';

export type GramReaction = 'gram_positive' | 'gram_negative' | 'acid_fast' | 'variable_or_other';
export type MorphologicalShape = 'cocci' | 'bacilli' | 'coccobacilli' | 'diplococci' | 'branching_filamentous' | 'spiral_curved' | 'curved_rod' | 'spirochete' | 'pleomorphic' | 'yeast' | 'mold' | 'trophozoite_cyst' | 'egg_larva' | 'virion';
export type OxygenRequirement = 'obligate_aerobe' | 'facultative_anaerobe' | 'obligate_anaerobe' | 'microaerophile' | 'capnophile' | 'aerotolerant' | 'aerobe';

export interface Taxonomy {
  domain: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  species: string;
}

export interface ColonyMorphology {
  bloodAgar: string;
  hemolysis: 'alpha' | 'beta' | 'gamma' | 'variable';
  chocolateAgar: string;
  macConkeyAgar: string;
  otherMedia?: string;
  pigment?: string;
  odor?: string;
  elevation?: 'flat' | 'raised' | 'convex' | 'umbilicate' | 'umbonate';
  margin?: 'smooth' | 'rough' | 'filamentous' | 'swarming' | 'irregular' | 'entire' | 'spreading' | 'wavy';
  texture?: 'butyrous' | 'creamy' | 'mucoid' | 'dry' | 'brittle' | 'sticky' | 'smooth' | 'moist' | 'rough' | 'granular' | 'glistening';
}

export interface BiochemicalProfile {
  catalase?: '+' | '-' | 'variable' | string;
  oxidase?: '+' | '-' | 'variable' | string;
  coagulase?: '+' | '-' | 'variable' | string;
  dnase?: '+' | '-' | string;
  indole?: '+' | '-' | 'variable' | string;
  urease?: '+' | '-' | 'variable' | string;
  citrate?: '+' | '-' | 'variable' | string;
  h2s?: '+' | '-' | 'variable' | string;
  lactoseFermentation?: '+' | '-' | 'delayed' | 'variable' | string;
  tsi?: string; // e.g., 'K/A H2S-', 'A/A Gas+'
  lia?: string; // e.g., 'K/K H2S+'
  motility?: '+' | '-' | 'variable' | 'tumbling_25C' | string;
  bileSolubility?: '+' | '-' | string;
  pyr?: '+' | '-' | string;
  mr?: '+' | '-' | string;
  vp?: '+' | '-' | string;
  hippurate?: '+' | '-' | string;
  esculin?: '+' | '-' | 'variable' | string;
  superoxol?: '+' | '-' | 'variable' | string;
  lecithinase?: '+' | '-' | 'variable' | string;
  lipase?: '+' | '-' | 'variable' | string;
  gelatin?: '+' | '-' | 'variable' | string;
  bileEsculin?: '+' | '-' | 'variable' | string;
  otherKeyTests?: string;
}

export interface Pathogen {
  id: string;
  name: string;
  scientificName: string;
  commonName: {
    vi: string;
    en: string;
  };
  taxonomy: Taxonomy;
  gramReaction: GramReaction;
  shape: MorphologicalShape;
  arrangement: string;
  oxygen: OxygenRequirement;
  biosafetyLevel: 1 | 2 | 3 | 4;
  bioterrorCategory?: 'A' | 'B' | 'C';
  directSmearFeatures: {
    vi: string;
    en: string;
  };
  colony: ColonyMorphology;
  biochemicals: BiochemicalProfile;
  virulenceFactors: {
    vi: string[];
    en: string[];
  };
  primaryToxins: string[];
  clinicalSignificance: {
    vi: string;
    en: string;
  };
  recommendedAntibiotics: {
    firstLine: string[];
    alternative: string[];
    intrinsicResistance: string[];
  };
  clsiGroupNotes: {
    groupA: string[];
    groupB?: string[];
    groupC?: string[];
    groupU?: string[];
  };
  diagnosticPitfalls: {
    vi: string;
    en: string;
  };
  svgType: string;
}

export interface FlowchartStep {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  testMethod: string;
  options: {
    label: {
      vi: string;
      en: string;
    };
    nextStepId?: string;
    resultPathogens?: string[];
    conclusion?: {
      vi: string;
      en: string;
    };
  }[];
}

export interface DiagnosticFlowchart {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  category: string;
  description: {
    vi: string;
    en: string;
  };
  initialStepId: string;
  steps: Record<string, FlowchartStep>;
}

export interface ToxinProfile {
  id: string;
  name: string;
  type: 'exotoxin' | 'endotoxin';
  organism: string;
  disease: {
    vi: string;
    en: string;
  };
  mechanism: {
    vi: string;
    en: string;
  };
  targetCell: string;
  clinicalEffect: {
    vi: string;
    en: string;
  };
  lethalityScore: 'Extremely High' | 'High' | 'Moderate' | 'Low';
  heatStability: 'Heat-labile' | 'Heat-stable (100°C)';
}

export interface AntimicrobialClassGuideline {
  class: string;
  target: string;
  mechanism: {
    vi: string;
    en: string;
  };
  examples: string[];
  spectrum: string;
  primaryResistanceMechanism: {
    vi: string;
    en: string;
  };
}

export interface PatientReportData {
  patientName: string;
  patientAge: number | string;
  patientGender: string;
  hospitalId: string;
  department: string;
  physician: string;
  specimenType: string;
  collectionDate: string;
  clinicalDiagnosis: string;
  directSmearFindings: string;
  presumptiveOrganism: string;
  colonyDescription: string;
  biochemicalConfirmation: string;
  antibiogramResults: {
    antibiotic: string;
    micOrZone: string;
    interpretation: string;
    clsiCategory: string;
  }[];
  pathologistNotes: string;
  verifiedBy: string;
  reportDate: string;
}

export interface DifferentialTable {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  headers: string[];
  rows: (string | number)[][];
  notes?: string;
}

export interface KeyTermItem {
  term: string;
  definition?: {
    vi: string;
    en: string;
  };
}

export interface ChapterSummary {
  chapterNumber: number;
  title: {
    vi: string;
    en: string;
  };
  authors?: string;
  relatedPathogens?: string[];
  outline: {
    vi: string[];
    en: string[];
  };
  keyTerms: (string | KeyTermItem)[];
  pointsToRemember: {
    vi: string[];
    en: string[];
  };
  clinicalPearls: {
    vi: string[];
    en: string[];
  };
  tables: DifferentialTable[];
}

export interface ClinicalCaseQuiz {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  type: 'case_in_point' | 'assessment_mcq';
  caseScenario?: {
    vi: string;
    en: string;
  };
  question: {
    vi: string;
    en: string;
  };
  options: {
    id: string;
    text: {
      vi: string;
      en: string;
    };
  }[];
  correctOptionId: string;
  explanation: {
    vi: string;
    en: string;
  };
  clinicalTakeaway: {
    vi: string;
    en: string;
  };
  relatedPathogenId?: string;
}
