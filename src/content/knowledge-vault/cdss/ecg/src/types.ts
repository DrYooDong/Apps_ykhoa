export type LeadName =
  | "I"
  | "II"
  | "III"
  | "aVR"
  | "aVL"
  | "aVF"
  | "V1"
  | "V2"
  | "V3"
  | "V4"
  | "V5"
  | "V6";

export interface WaveComponent {
  amplitude: number; // in mV (positive or negative)
  duration: number; // in seconds
}

export interface LeadWaveData {
  pWave: { amp: number; dur: number; shape?: "normal" | "peaked" | "bifid" | "inverted" | "flat" | "biphasic" };
  prSegment: { dur: number; deviation?: number };
  qWave: { amp: number; dur: number }; // negative value for amplitude
  rWave: { amp: number; dur: number; notched?: boolean };
  sWave: { amp: number; dur: number; wide?: boolean }; // negative value
  rPrimeWave?: { amp: number; dur: number }; // for RSR' patterns (RBBB)
  stSegment: { elevation: number; slope: "horizontal" | "upsloping" | "downsloping" | "coved" | "scooped" };
  tWave: { amp: number; dur: number; shape?: "normal" | "peaked" | "inverted" | "biphasic" | "hyperacute" | "flat" };
  uWave?: { amp: number; dur: number };
  qrsDuration?: number;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: "Nam" | "Nữ";
  chiefComplaint: string;
  clinicalHistory: string;
  vitals: {
    bp: string; // e.g. "130/80"
    hr: number; // bpm
    spo2: number; // %
    temp: number; // Celsius
  };
  labs?: {
    k?: number; // mEq/L
    ca?: number; // mmol/L
    mg?: number; // mmol/L
    troponinI?: string; // ng/mL
    ckmb?: string; // U/L
    bnp?: string; // pg/mL
  };
}

export interface EcgMetrics {
  heartRate: number; // bpm
  rhythmType: string;
  regularity: "Đều" | "Không đều" | "Không đều có chu kỳ" | "Loạn nhịp hoàn toàn";
  axis: string;
  alphaAngle: number; // in degrees (-180 to +180)
  prInterval: number; // ms
  qrsDuration: number; // ms
  qt: number; // ms
  qtc: number; // ms (calculated Bazett)
  qtcFridericia?: number; // ms
  sokolowLyon?: number; // mm (SV1 + RV5)
  cornellCriteria?: number; // mm (RaVL + SV3)
}

export interface EcgCase {
  id: string;
  category: "Ischemia" | "Arrhythmia" | "Conduction" | "Electrolyte" | "Hypertrophy" | "Normal" | "Pediatric" | "Channelopathy";
  title: string;
  subtitle: string;
  severity: "Khẩn cấp" | "Nguy kịch" | "Cảnh giác cao" | "Ổn định";
  patient: PatientInfo;
  metrics: EcgMetrics;
  leadsData: Record<LeadName, LeadWaveData>;
  leadsSummary: {
    limbLeadsSummary: string;
    chestLeadsSummary: string;
  };
  diagnosis: {
    primary: string;
    culpritVesselOrCause?: string;
    differentials: string[];
    keyFindings: string[];
    clinicalNote: string;
    treatment: string[];
    brugadaAnalysis?: string;
    confidence: {
      primary: number; // percentage
      secondaryName?: string;
      secondaryConfidence?: number;
    };
  };
  learningNotes: {
    chapterRef: string; // reference to BS Nguyễn Tôn Kinh Thi handbook
    coreTakeaway: string;
    pitfallToAvoid: string;
  };
}

export interface CaliperMeasurement {
  active: boolean;
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  deltaMs: number;
  deltaBpm: number;
  deltaMv: number;
  lead: LeadName | "All";
}

export interface AiAnalysisResult {
  summary?: string;
  rhythm?: string;
  heartRate?: number;
  axis?: string;
  morphologyNotes?: {
    pWave?: string;
    prInterval?: string;
    qrsComplex?: string;
    stSegment?: string;
    tWave?: string;
    qtInterval?: string;
  };
  primaryDiagnosis?: string;
  culpritVesselOrEtiology?: string;
  differentialDiagnosis?: string[];
  brugadaOrSpecialCriteria?: string;
  clinicalRiskLevel?: string;
  urgentActionPlan?: string[];
  medicalExplanation?: string;
  deepLearningConfidence?: {
    primary?: number;
    rhythmClass?: string;
    featuresDetected?: string[];
  };
}

export type LeadFilterMode =
  | "ALL" // Toàn bộ 12 chuyển đạo
  | "LIMB_BIPOLAR" // Lưỡng cực chi (I, II, III) - Einthoven
  | "LIMB_UNIPOLAR" // Đơn cực chi tăng cường (aVR, aVL, aVF) - Goldberger
  | "LIMB_ALL" // Tất cả 6 chuyển đạo chi (I, II, III, aVR, aVL, aVF)
  | "CHEST_ALL" // 6 Chuyển đạo trước tim / thành ngực (V1 - V6) - Wilson
  | "INFERIOR" // Thành dưới: II, III, aVF (RCA/LCx)
  | "SEPTAL" // Vách liên thất: V1, V2 (LAD Septal)
  | "ANTERIOR" // Thành trước: V3, V4 (LAD)
  | "LATERAL" // Thành bên: I, aVL, V5, V6 (LCx/LAD Diag)
  | "ANTEROSEPTAL" // Vách & Trước: V1 - V4
  | "CUSTOM"; // Tùy chọn riêng lẻ từng chuyển đạo

export type EcgDisplayTheme = "paper" | "clinic" | "night" | "monitor" | "amber";

export interface LeadAnatomyInfo {
  lead: LeadName;
  nameVi: string;
  type: "Limb Bipolar" | "Limb Unipolar" | "Precordial";
  region: string;
  culpritVessel: string;
  viewAngle: string;
  description: string;
}

export type WaveType = "P" | "Q" | "R" | "S" | "J" | "T" | "U";

export interface ManualAnnotation {
  id: string;
  lead: LeadName;
  waveType: WaveType;
  x: number; // coordinate relative to lead viewBox
  y: number;
  timeMs: number; // approximate relative time within cycle
  voltageMv: number;
  note?: string;
  createdTime: number;
}

export interface AnnotationValidationItem {
  annotationId: string;
  waveType: WaveType;
  lead: LeadName;
  status: "EXACT" | "CLOSE" | "MISPLACED";
  score: number; // 0 - 100
  actualTimeMs: number;
  expectedTimeMs: number;
  message: string;
  morphologyEvaluation: string;
}

export interface AnnotationValidationReport {
  overallScore: number;
  totalAnnotations: number;
  passedCount: number;
  feedback: string;
  items: AnnotationValidationItem[];
  clinicalPearl: string;
  guidanceChapter: string;
}
