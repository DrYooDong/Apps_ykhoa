/**
 * DocSpace v2 — Unified Schema & Data Contracts (100% Offline Medical Education Workbench)
 * Hợp đồng kiểu dữ liệu chuẩn hóa cho toàn bộ 3 không gian: Workbench, Unified Library, OSCE Lab
 */

import {
  ClinicalFormState,
  EpidemiologyContext,
  LabsState,
  ProblemStatementEntry,
  SoapClinicalExperience,
  VitalsState,
} from '../types.ts';

export type DocSpaceMode = 'practice' | 'teaching' | 'author';
export type DocSpacePrimaryView = 'workbench' | 'library' | 'osce';
export type WorkbenchPanelTab = 'problems' | 'reasoning' | 'protocol';

/**
 * Chế độ Mở dần (Progressive Case Reveal) phục vụ Tự học & Giảng dạy:
 * 1: Hành chính + Lý do vào viện + Sinh hiệu ban đầu
 * 2: + Khám thực thể + Tiền căn + Bối cảnh Dịch tễ
 * 3: + Kết quả Cận lâm sàng
 * 4: Mở toàn bộ + Đáp án Chuyên gia (A-P & Bẫy lâm sàng)
 */
export type ProgressiveRevealStage = 1 | 2 | 3 | 4;

export interface OrderSandboxItem {
  id: string;
  drugName: string;
  drugKey?: string;
  dose: string;
  route: string;
  frequency: string;
  category: 'fluid' | 'antimicrobial' | 'symptomatic' | 'specific' | 'monitoring' | 'custom';
  checked: boolean;
  note?: string;
}

export interface ClinicalCaseSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  /** Nếu nạp từ 1 ca SOAP trong Thư viện */
  sourceSoapId?: string;
  sourceSoapSpecialty?: string;
  /** Bật chế độ học mở dần (ẩn đáp án A-P cho tới chặng 4) */
  progressiveMode: boolean;
  revealStage: ProgressiveRevealStage;

  // Dữ kiện bệnh nhân
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  epiContext: EpidemiologyContext;
  selectedSymptoms: string[];
  negatedSymptoms: string[];

  // Tương tác học tập của người dùng
  userProblems: ProblemStatementEntry[];
  hasCheckedProblems: boolean;
  selectedDiseaseId: string | null;
  activeBranchId: string | null;
  debiasingCheckedIds: string[];
  orderItems: OrderSandboxItem[];
  learnerNotes: string;
}

// ─── TRIAGE & PANIC LABS ────────────────────────────────────────────────────

export interface PanicLabAlert {
  labField: keyof LabsState;
  labName: string;
  value: number;
  unit: string;
  severity: 'panic' | 'abnormal';
  direction: 'high' | 'low';
  clinicalMeaning: string;
}

export interface TriageSummaryV2 {
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  urgencyLabel: string;
  news2Score: number;
  qsofaScore: number;
  pewsScore: number | null;
  isPediatric: boolean;
  mapValue: number | null;
  shockIndex: number | null;
  esiLevel: 1 | 2 | 3 | 4 | 5;
  redFlags: string[];
  panicLabs: PanicLabAlert[];
}

// ─── INFORMATION GAIN & COGNITIVE DEBIASING ─────────────────────────────────

export interface DiscriminatingPrompt {
  symptomId: string;
  label: string;
  category: 'question' | 'exam' | 'lab';
  favorsDiseaseName: string;
  favorsDiseaseId: string;
  discriminatingWeight: number;
  rationale: string;
}

export interface CognitiveBiasCheckItem {
  id: string;
  biasName: string;
  biasType: 'anchoring' | 'premature_closure' | 'availability' | 'confirmation' | 'red_flag_blindness';
  prompt: string;
  contextualWarning: string;
}

export interface InfoGainReport {
  top1Name: string;
  top2Name: string | null;
  nextBestQuestions: DiscriminatingPrompt[];
  nextBestTests: DiscriminatingPrompt[];
  debiasingChecklist: CognitiveBiasCheckItem[];
}

// ─── DOSING & ORDER SAFETY SENTINEL ─────────────────────────────────────────

export interface SafetyAlertItem {
  id: string;
  severity: 'contraindicated' | 'major' | 'moderate';
  type: 'ddi' | 'renal' | 'hepatic' | 'disease_contraindication' | 'warning';
  drugInvolved: string;
  title: string;
  mechanism: string;
  recommendation: string;
}

export interface PatientDosingMetrics {
  weightKg: number | null;
  heightCm: number | null;
  bmi: number | null;
  ibwKg: number | null;
  adjBwKg: number | null;
  eGfr: number | null;
  ckdStage: string | null;
}

export interface OrderSafetyReport {
  metrics: PatientDosingMetrics;
  alerts: SafetyAlertItem[];
  safeCount: number;
  dangerCount: number;
}

// ─── UNIFIED OSCE SCENARIO (BLUEPRINT + AUTO-ADAPTED SOAP) ──────────────────

export type OscePillarKey =
  | 'history_exam'
  | 'labs_workup'
  | 'diagnosis_staging'
  | 'management_safety';

export interface UnifiedOsceOption {
  id: string;
  text: string;
  isCorrect: boolean;
  score: number; // 0..25
  rationale: string;
  penaltyNote?: string;
}

export interface UnifiedOsceQuestion {
  id: string;
  stage: 1 | 2 | 3;
  pillar: OscePillarKey;
  pillarTitle: string;
  prompt: string;
  options: UnifiedOsceOption[];
}

export interface UnifiedOsceScenario {
  id: string;
  sourceType: 'parametric-blueprint' | 'soap-adapted';
  sourceSoapId?: string;
  specialty: string;
  difficulty: 'Y4' | 'Y6' | 'NoiTru';
  title: string;
  subtitle: string;
  badgeText: string;
  icdCode?: string;

  // Progressive Clinical Data
  demographicsText: string;
  chiefComplaint: string;
  historyText: string;
  vitalsSummary: string;
  physicalExamText: string;
  labsAndImagingText: string;

  // Questions (4 pillars = 100 pts)
  questions: UnifiedOsceQuestion[];

  // Debriefing
  primaryDiagnosisAnswer: string;
  clinicalPearls: Array<{ title: string; detail: string }>;
  cognitivePitfalls: Array<{ biasName: string; warning: string; remedy: string }>;
  ebmReferences: string[];
}

// ─── LOCAL OFFLINE MASTERY TRACKER ──────────────────────────────────────────

export interface OsceAttemptRecord {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  specialty: string;
  completedAt: string;
  totalScore: number;
  maxScore: number;
  pillarScores: Record<OscePillarKey, number>;
  missedQuestionPrompts: Array<{
    prompt: string;
    chosenText: string;
    correctText: string;
    rationale: string;
  }>;
}

export interface TeachingModeState {
  projectorFontScale: 'normal' | 'large' | 'xlarge';
  maskedColumns: {
    s: boolean;
    o: boolean;
    a: boolean;
    p: boolean;
  };
  timerSecondsLeft: number;
  timerRunning: boolean;
  timerPresetMinutes: number;
}

/** Tiện ích kiểm tra nhanh xem ca SOAP có đáp án đầy đủ cho học tập hay không */
export function getSoapEducationalLevel(soap: SoapClinicalExperience): 'Y4' | 'Y6' | 'NoiTru' {
  const diff = soap.difficultyRating ?? 3;
  if (diff <= 2) return 'Y4';
  if (diff === 3) return 'Y6';
  return 'NoiTru';
}
