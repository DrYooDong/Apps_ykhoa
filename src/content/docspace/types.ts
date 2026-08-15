/**
 * DocSpace — Type Definitions
 * Không gian Riêng của Bác sĩ · CliniPortal Module 8
 */

// ─────────────────────────────────────────────
// DOCTOR PROFILE
// ─────────────────────────────────────────────

export interface DoctorProfile {
  id: string;           // VD: "NguyenVanA_BV108" — tự đặt, là khóa localStorage
  displayName: string;  // VD: "BS. Nguyễn Văn A"
  specialty?: string;   // VD: "Nội tổng quát", "ICU", "Nhi"
  createdAt: string;    // ISO string
  lastActiveAt: string; // ISO string
  quickLinks: QuickLink[];
  aiSettings?: AISettings;
  syncSettings?: SyncSettings;
}

export type SyncProvider = 'couchdb' | 'webdav' | 'none';
export type SyncState = 'disabled' | 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

export interface SyncSettings {
  enabled: boolean;
  provider: SyncProvider;
  remoteUrl: string;        // VD: "https://my-couchdb.example.com/docspace_db"
  dbName: string;           // VD: "docspace_doctor_db"
  username?: string;
  password?: string;
  passphrase?: string;      // Dùng cho E2EE Mã hóa AES-GCM 256-bit
  isE2eeEnabled: boolean;
  autoSync: boolean;        // Tự động sync định kỳ
  autoSyncIntervalSec: number; // Ví dụ: 30s
}

export interface SyncStatusInfo {
  state: SyncState;
  lastSyncedAt?: string;
  docsSyncedCount: number;
  errorMessage?: string;
}

export type AIProvider = 'groq' | 'gemini' | 'openrouter' | 'sambanova' | 'custom';

export interface AISettings {
  enabled: boolean;
  provider?: AIProvider;
  endpoint: string;
  model: string;
  apiKey?: string;
  labModeEnabled?: boolean;

  // Multi-Provider Fallback Engine
  fallbackEnabled?: boolean;
  secondaryProvider?: AIProvider;
  secondaryEndpoint?: string;
  secondaryModel?: string;
  secondaryApiKey?: string;
  // Gemini Dedicated Engine
  geminiApiKey?: string;
  geminiModel?: string;
}

export interface QuickLink {
  id: string;
  label: string;        // VD: "ABG Studio"
  href: string;         // VD: "#/calculators/abg-studio"
  icon: string;         // FontAwesome class: "fa-solid fa-lungs"
  category: string;     // VD: "calculators", "approaches"
  isPinned: boolean;
}

// ─────────────────────────────────────────────
// REGULATORY & LEGAL SHIELD (Phase 3)
// ─────────────────────────────────────────────

export interface AuditTrail {
  timestamp: string;          // ISO time
  action: 'create' | 'update' | 'lock';
  snapshotHash: string;       // SHA-256
}

// ─────────────────────────────────────────────
// SBAR
// ─────────────────────────────────────────────

export interface SBARRecord {
  id: string;           // UUID
  doctorId: string;
  title: string;        // VD: "BN suy hô hấp phòng 5"
  situation: string;    // S — Tình huống
  background: string;   // B — Bối cảnh
  assessment: string;   // A — Đánh giá
  recommendation: string; // R — Đề xuất
  createdAt: string;
  updatedAt: string;
  isDraft: boolean;
  
  // Phase 3: Legal Shield
  auditLogs?: AuditTrail[];
  isLocked?: boolean;   // Đã ký số & khóa (không thể sửa)
  isTampered?: boolean; // Bị chỉnh sửa lậu ngoài ứng dụng
  deletedAt?: string;
  versions?: { timestamp: string; content: string }[]; // Lịch sử sinh SBAR (tối đa 5 bản)
}

// ─────────────────────────────────────────────
// ON-CALL PATIENT LIST (Danh sách Trực)
// ─────────────────────────────────────────────

export interface OnCallShift {
  id: string;
  doctorId: string;
  date: string;         // VD: "2026-07-27"
  unit: string;         // VD: "Phòng Nội 3", "ICU"
  patients: OnCallPatient[];
  notes?: string;       // Ghi chú tổng ca trực
  createdAt: string;
  closedAt?: string;    // Undefined nếu ca đang diễn ra
}

export interface OnCallPatient {
  id: string;           // UUID
  bed: string;          // Số giường: VD: "G.12", "ICU-3"
  diagnosis: string;    // Chẩn đoán tóm tắt
  note: string;         // Ghi chú xử trí, diễn biến
  flag?: PatientFlag;   // Mức độ ưu tiên
  addedAt: string;
  updatedAt: string;
}

export type PatientFlag = 'critical' | 'watch' | 'stable';

// ─────────────────────────────────────────────
// CASE LOGGER
// ─────────────────────────────────────────────

export interface CaseRecord {
  id: string;
  doctorId: string;
  date: string;
  context: CaseContext;  // Bối cảnh gặp ca
  chiefComplaint: string;
  objective?: string;    // Khám lâm sàng & Cận lâm sàng (Vitals / Labs)
  icd10Code?: string;
  icd10Label?: string;
  diagnosisText?: string; // Phase 6: Chuỗi chẩn đoán tự do
  management: string;    // Xử trí đã làm
  outcome?: string;      // Kết quả
  lesson?: string;       // Bài học rút ra
  relatedUrl?: string;   // Link tới guideline trong app
  createdAt: string;
  
  // Phase 3: Legal Shield
  auditLogs?: AuditTrail[];
  isLocked?: boolean;
  isTampered?: boolean;
  deletedAt?: string;
}

export type CaseContext = 'duty' | 'opd' | 'clinic' | 'consult' | 'other';

// ─────────────────────────────────────────────
// DRUG INTERACTION JOURNAL (Phase 2)
// ─────────────────────────────────────────────

export interface DrugJournalEntry {
  id: string;
  doctorId: string;
  drugs: string[];       // Danh sách tên thuốc trong phác đồ
  indication: string;    // Chỉ định
  dose?: string;
  duration?: string;
  interactions?: string; // Tương tác cần lưu ý (free text)
  rating: 1 | 2 | 3 | 4 | 5;
  clinicalNote: string;
  createdAt: string;
  deletedAt?: string;
}

// ─────────────────────────────────────────────
// LIVING PROTOCOL ENGINE (Phase 3) & PERSONAL PROTOCOL (Phase 2)
// ─────────────────────────────────────────────

export interface PersonalProtocol {
  id: string;
  doctorId: string;
  title: string;
  specialty?: string;
  steps: ProtocolStep[];
  warnings?: string[];
  references?: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface ProtocolStep {
  order: number;
  text: string;
  isAlert?: boolean;
}

export type ProtocolNodeType = 'lookup' | 'branch' | 'result' | 'action';

export interface BranchPath {
  condition: string; // VD: 'gte_50', 'lt_10'
  label: string;
  go_to: string;
}

export interface LivingProtocolNode {
  id: string;
  type: ProtocolNodeType;
  label: string;
  
  // Dành cho 'lookup'
  lookup_var?: string | null;
  formula_static?: string; // VD: 'weight_x_25'
  unit?: string;
  note?: string;

  // Dành cho 'branch'
  branch_var?: string;
  branches?: BranchPath[];

  // Dành cho 'result'
  lookup_table?: Record<string, string>; // VD: { "weight_40_59": "600-750 mg" }
}

export interface LivingProtocol {
  id: string;
  title: string;
  inputs: string[];
  steps: LivingProtocolNode[];
}

// ─────────────────────────────────────────────
// PERSONAL NOTEPAD (Phase 2)
// ─────────────────────────────────────────────

export interface PersonalNote {
  id: string;
  doctorId: string;
  title: string;
  content: string;
  tags: string[];
  sourceUrl?: string;
  sourceTitle?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// ─────────────────────────────────────────────
// SIMULATION SANDBOX (Phase 3)
// ─────────────────────────────────────────────

export interface SimulationSession {
  id: string;
  doctorId: string;
  sourceId?: { type: 'sbar' | 'oncall' | 'custom', id: string };
  patientContext: {
    age?: number;
    weight?: number;
    egfr?: number;
    comorbidities: string[];
    currentMeds: string[];
    labs: Record<string, string>;
  };
  proposedRegimen: {
    drugName: string;
    dose: string;
    route: string;
  }[];
  simulationResult?: SimulationResult;
  createdAt: string;
}

export interface SimulationResult {
  interactions: { severity: 'high'|'mod'|'low', description: string }[];
  clinicalWarnings: string[]; 
  outcomePrediction: string;  
  safetyScore: number;        
}

// ─────────────────────────────────────────────
// CLINICAL TOOLS & CALCULATOR SESSIONS (Phase 3)
// ─────────────────────────────────────────────

export interface CalculatorSession {
  id: string;
  calculatorId: string;
  calculatorName: string;
  patientId?: string;
  inputs: Record<string, any>;
  result: {
    score?: number;
    maxScore?: number;
    label: string;
    severity: 'low' | 'moderate' | 'high' | 'critical' | 'info';
    textForInsert: string;
  };
  calculatedAt: string;
}

// ─────────────────────────────────────────────
// SOAP DIGITAL WARD NOTEBOOK
// ─────────────────────────────────────────────

export interface SoapPrescriptionItem {
  id: string;
  name: string;        // Tên thuốc (từ drug-picker)
  dosage: string;      // Hàm lượng / Liều 1 lần (VD: 500mg)
  route: string;       // Đường dùng (Uống, Tiêm...)
  frequency: string;   // Tần suất (VD: Sáng 1 - Chiều 1)
  quantity: string;    // Số lượng (VD: 10 viên)
  instructions: string;// Lời dặn (VD: Uống sau ăn)
}

export interface SoapDailyLog {
  id: string;
  date: string;            // YYYY-MM-DD
  dayOfIllness: number;    // N1, N2, N3...
  sNotes: string;
  oNotes: string;
  aAssessment: string;
  icd10Code?: string;
  icd10Label?: string;
  pPlan: string;
  prescriptions?: SoapPrescriptionItem[];
  clsOrders: { id: string; name: string; isDone: boolean }[];
  clsResults: { id: string; text: string; alertLevel: 'normal' | 'low' | 'high' | 'critical' }[];
  isEmrEntered: boolean;
  soapStatus: 'chua_lam' | 'da_lam';
  createdAt?: string;
  updatedAt?: string;
}

export interface SoapPatientRecord {
  id: string;
  demographicId?: string;   // Liên kết với PatientDemographics (OpenEMR Feature)
  patientCode: string;      // G01, G02...
  fullName: string;
  age: number;
  gender: 'nam' | 'nu' | 'khac';
  bedNumber: string;
  medicalRecordNo: string;
  admissionDiagnosis: string;
  currentDiagnosis?: string;
  
  // Daily logs history (Diễn tiến theo ngày)
  activeDate?: string;      // YYYY-MM-DD đang xem
  dailyLogs?: SoapDailyLog[];

  // Current active date SOAP fields
  isEmrEntered: boolean;
  soapStatus: 'chua_lam' | 'da_lam';
  dayOfIllness: number;
  sNotes: string;
  oNotes: string;
  aAssessment: string;
  icd10Code?: string;
  icd10Label?: string;
  pPlan: string;
  prescriptions?: SoapPrescriptionItem[];
  clsOrders: { id: string; name: string; isDone: boolean }[];
  clsResults: { id: string; text: string; alertLevel: 'normal' | 'low' | 'high' | 'critical' }[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

// ─────────────────────────────────────────────
// PATIENT DEMOGRAPHICS (OpenEMR Feature)
// ─────────────────────────────────────────────

export interface AllergyEntry {
  id: string;
  allergen: string;       // Tác nhân dị ứng (Thuốc, Thức ăn...)
  severity: 'low' | 'mod' | 'high' | 'critical';
  reaction: string;       // Biểu hiện (Nổi mề đay, Sốc phản vệ...)
  notedDate: string;
}

export interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'discontinued';
}

export interface PatientDemographic {
  id: string;             // UUID
  doctorId: string;       // Owner
  medicalRecordNo: string; // Mã hồ sơ / Mã BN
  fullName: string;
  dob?: string;           // YYYY-MM-DD
  gender: 'nam' | 'nu' | 'khac';
  phone?: string;
  address?: string;
  
  // Medical History (OpenEMR Issues/History)
  history: {
    medical: string[];
    surgical: string[];
    family: string[];
    social: string[];     // Thói quen: Rượu, Thuốc lá...
  };
  
  // Allergies (OpenEMR Allergies)
  allergies: AllergyEntry[];

  // Medications (e-Prescribing)
  medications?: MedicationEntry[];
  
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface VitalsRecord {
  id: string;
  patientId: string;
  doctorId: string;
  timestamp: string;      // ISO Date
  hr?: number;            // Mạch (Heart Rate)
  bpSys?: number;         // Huyết áp tâm thu
  bpDia?: number;         // Huyết áp tâm trương
  rr?: number;            // Nhịp thở
  temp?: number;          // Nhiệt độ
  spo2?: number;          // SpO2
  weight?: number;        // Cân nặng (kg)
  height?: number;        // Chiều cao (cm)
  bmi?: number;
  notes?: string;
}

// ─────────────────────────────────────────────
// DOCSPACE STORAGE SNAPSHOT (Export/Import)
// ─────────────────────────────────────────────

export interface DocSpaceSnapshot {
  version: string;       // VD: "1.0"
  exportedAt: string;
  profile: DoctorProfile;
  patients?: PatientDemographic[]; // OpenEMR Integration
  vitals?: VitalsRecord[];         // OpenEMR Integration
  sbars: SBARRecord[];
  shifts: OnCallShift[];
  cases: CaseRecord[];
  notes: PersonalNote[];
  drugJournal: DrugJournalEntry[];
  protocols: PersonalProtocol[];
  livingProtocols?: LivingProtocol[]; // Phase 3
  simulations?: SimulationSession[];  // Phase 3
}

// ─────────────────────────────────────────────
// CLINICAL BRIDGE (Phase 3)
// ─────────────────────────────────────────────

export interface PatientContext {
  id?: string;
  name?: string;
  age?: number;
  weight?: number;
  height?: number;
  egfr?: number;
  scr?: number;
  na?: number;
  comorbidities?: string[];
  currentMeds?: string[];
}

export interface ClinicalSession {
  source: {
    module: 'oncall' | 'sbar' | 'sandbox' | 'case';
    id: string; // ID của OnCall Patient hoặc SBAR
  };
  patient: PatientContext;
  timestamp: string;
}

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

export interface DocSpaceNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;        // Số lượng items (VD: 3 SBARs)
  phase?: 1 | 2 | 3;
}

export const DOCSPACE_VERSION = '1.0';

export const DEFAULT_QUICK_LINKS: QuickLink[] = [
  { id: 'abg',        label: 'ABG Studio',       href: '#/calculators/renal-dg-abg',                                         icon: 'fa-solid fa-lungs',      category: 'calculators',  isPinned: true },
  { id: 'egfr',       label: 'eGFR',             href: '#/calculators/renal-renal-function',                                 icon: 'fa-solid fa-kidney',     category: 'calculators',  isPinned: true },
  { id: 'sepsis',     label: 'Sốc Nhiễm khuẩn', href: '#/ebm/guidelines-kho-guidelines-phac-do-soc-nhiem-khuan-sepsis3', icon: 'fa-solid fa-bacterium',  category: 'ebm',          isPinned: true },
  { id: 'dyspnea',    label: 'Khó thở cấp',     href: '#/approaches/symptoms-than-phien-ho-hap-tim-mach-tc-khotho',        icon: 'fa-solid fa-wind',       category: 'approaches',   isPinned: false },
  { id: 'antibiotic', label: 'Kháng sinh',      href: '#/pharmacology/tools-tra-cuu-thuoc',                           icon: 'fa-solid fa-pills',      category: 'pharmacology', isPinned: false },
  { id: 'ecg',        label: 'Đọc ECG',          href: '#/skills/can-lam-sang-doc-ecg-co-ban',                              icon: 'fa-solid fa-heart-pulse',category: 'skills',       isPinned: false },
];

// ─────────────────────────────────────────────
// AI INSIGHTS & PRACTICE ANALYTICS (Cluster 5)
// ─────────────────────────────────────────────

export interface DiagnosisStatItem {
  name: string;
  count: number;
  percentage: number;
  icd10?: string;
  color: string;
}

export interface ContextDistributionItem {
  context: CaseContext | string;
  label: string;
  count: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface ActivityDayLog {
  date: string;
  dayName: string;
  soapCount: number;
  sbarCount: number;
  caseCount: number;
  hasDuty: boolean;
  totalActivities: number;
}

export interface BurnoutEvaluation {
  level: 'low' | 'moderate' | 'high';
  score: number; // 0 - 100
  title: string;
  badgeClass: string;
  color: string;
  reasons: string[];
  recommendations: string[];
  metrics: {
    shiftsThisWeek: number;
    soapsThisWeek: number;
    avgSoapWordCount: number;
    criticalPatientsCount: number;
  };
}

export interface PracticeAnalyticsData {
  totalEncounters: number;
  totalSoaps: number;
  totalSbars: number;
  totalCases: number;
  totalShifts: number;
  sbarRatio: number; // Percentage
  topDiagnoses: DiagnosisStatItem[];
  contextDistribution: ContextDistributionItem[];
  activityLogs7Days: ActivityDayLog[];
  weeklyDutyStreak: number;
  burnout: BurnoutEvaluation;
}

export interface WeeklySummaryRecord {
  id: string;
  doctorId: string;
  weekRange: string; // VD: "08/08 - 14/08/2026"
  createdAt: string;
  summaryText: string;
  burnoutScore: number;
  burnoutLevel: 'low' | 'moderate' | 'high';
  highlights: string[];
  metricsSnapshot: {
    shiftsCount: number;
    soapsCount: number;
    casesCount: number;
    sbarsCount: number;
    topDiagnosesNames: string[];
  };
}
