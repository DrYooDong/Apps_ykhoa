import { ClinicalFormState, LabsState, VitalsState } from '../types.ts';

export type SimulationStage = 'stage1_initial' | 'stage2_labs' | 'stage3_decisions' | 'stage4_debrief';

export interface DemographicsVariant {
  id: string;
  label: string;
  age: number;
  gender: 'nam' | 'nu';
  weightKg: number;
  occupation?: string;
}

export interface ComorbidityVariant {
  id: string;
  label: string;
  description: string;
  riskFlag: 'fluid_overload' | 'bleeding' | 'acidosis' | 'none';
  cautionNotes: string[];
}

export interface DynamicVitalsVariant {
  id: string;
  statusLabel: string;
  vitals: VitalsState;
  hemodynamicState: 'stable' | 'warning' | 'compensated_shock' | 'decompensated_shock';
}

export interface LabPerturbationVariant {
  id: string;
  statusLabel: string;
  labs: LabsState;
  additionalLabs: Record<string, string>;
  bleedingFlag?: boolean;
}

export interface TreatmentResponseVariant {
  id: string;
  label: string;
  vitalsAfter1h: string;
  urineOutput: string;
  clinicalOutcome: string;
}

export interface OsceOption {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number; // Điểm đạt được (0-25)
  rationale: string; // Giải thích lý do đúng/sai
  penaltyNote?: string;
}

export interface OsceQuestionItem {
  id: string;
  pillar: 'history_exam' | 'labs_workup' | 'diagnosis_staging' | 'management_safety';
  pillarTitle: string;
  pillarWeight: number; // 25 điểm
  prompt: string;
  options: OsceOption[];
}

export interface ClinicalPearlItem {
  title: string;
  context: string; // Bối cảnh
  action: string;  // Hành động
  mechanism: string; // Cơ chế sinh lý bệnh
}

export interface CognitivePitfallItem {
  biasName: string;
  biasType: 'anchoring' | 'premature_closure' | 'framing' | 'availability' | 'confirmation';
  warningText: string;
  remedyAction: string;
}

export interface SimulationBranch {
  branchId: string;
  branchTitle: string;
  branchBadge: string;
  branchDescription: string;
  targetAudience: string;
  
  // 6 Tham số kết hợp
  demographics: DemographicsVariant;
  comorbidity: ComorbidityVariant;
  timelineDay: number;
  vitalsVariant: DynamicVitalsVariant;
  labVariant: LabPerturbationVariant;
  treatmentResponse: TreatmentResponseVariant;

  // Initial clinical story presentation
  chiefComplaint: string;
  historyOfPresentIllness: string;
  physicalExamSummary: string;

  // OSCE Challenge questions tailored to this branch
  questions: OsceQuestionItem[];

  // Expert Debrief & Lessons
  clinicalPearls: ClinicalPearlItem[];
  cognitivePitfalls: CognitivePitfallItem[];
  ebmReferences: string[];
}

export interface SimulationCaseBlueprint {
  blueprintId: string;
  diseaseId: string;
  diseaseName: string;
  icdCode: string;
  title: string;
  summary: string;
  learningObjectives: string[];
  branches: SimulationBranch[];
}

export interface SimulationUserAnswers {
  selectedOptionIds: Record<string, string>; // questionId -> optionId
}

export interface OsceScoreResult {
  totalScore: number; // 0 - 100
  passed: boolean; // >= 70
  pillarScores: Record<string, { earned: number; max: number; passed: boolean }>;
  feedbackList: Array<{
    questionId: string;
    pillarTitle: string;
    isCorrect: boolean;
    earnedScore: number;
    userOptionText: string;
    rationale: string;
  }>;
}
