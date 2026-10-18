export type TabType = 'examination' | 'approach' | 'history-taking';

export type BodySystem = 
  | 'cardiovascular'
  | 'respiratory'
  | 'gastrointestinal'
  | 'neurological'
  | 'musculoskeletal'
  | 'heent'
  | 'general';

export interface AmbiguousTerm {
  patientTerm: string;
  commonUnderlyingProblems: string[];
  usefulDistinguishingFeatures: string[];
  macleodTip: string;
}

export interface SystematicEnquiryItem {
  system: string;
  systemVi: string;
  questions: string[];
  cardinalSymptoms: {
    symptom: string;
    clinicalClue: string;
  }[];
}

export interface ChallengingScenario {
  scenario: string;
  description: string;
  suggestedApproaches: string[];
  macleodPearl: string;
}

export interface ExamStep {
  phase: string;
  technique: string;
  techniqueDetails: string[];
  normalFindings: string;
  abnormalFindings: string[];
  clinicalSignificance: string;
  residentPearls?: string[];
}

export interface ExamModule {
  id: string;
  system: BodySystem;
  title: string;
  subtitle: string;
  overview: string;
  anatomyPhysiologyPoints: string[];
  equipmentNeeded: string[];
  steps: ExamStep[];
  highYieldPoints: string[];
  specialSigns: {
    name: string;
    description: string;
    indicates: string;
    clinicalPearl: string;
  }[];
  references: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  condition?: string;
  subtext?: string;
  options: {
    label: string;
    targetId?: string;
    diagnosis?: string;
    severity?: 'urgent' | 'warning' | 'routine';
    keyTests?: string[];
  }[];
}

export interface DiagnosticAlgorithm {
  title: string;
  summary: string;
  startingPoint: string;
  nodes: DecisionNode[];
}

export interface ApproachTopic {
  id: string;
  title: string;
  englishTitle: string;
  system: BodySystem;
  urgencyLevel: 'Emergency' | 'Urgent' | 'Routine';
  definition: string;
  pathophysiology: string;
  redFlags: string[];
  keyHistoryQuestions: {
    dimension: string; // SOCRATES / OPQRST
    question: string;
    clinicalMeaning: string;
  }[];
  physicalExamFocus: {
    step: string;
    finding: string;
    meaning: string;
  }[];
  differentialDiagnosis: {
    category: string;
    diseases: {
      name: string;
      distinguishingFeatures: string;
      initialInvestigation: string;
      priority: 'cannot-miss' | 'common' | 'less-common';
    }[];
  }[];
  algorithm: DiagnosticAlgorithm;
  residentClinicalPearls: string[];
}

export interface PersonalNote {
  id: string;
  topicId: string;
  topicTitle: string;
  topicType: 'exam' | 'approach';
  title: string;
  content: string;
  tags: string[];
  clinicalCaseExample?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResidentBookmark {
  id: string; // topicId
  type: 'exam' | 'approach';
  title: string;
  system: BodySystem;
  addedAt: string;
  isMastered: boolean;
}
