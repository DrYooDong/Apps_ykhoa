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
  icd10Code?: string;
  icd10Label?: string;
  management: string;    // Xử trí đã làm
  outcome?: string;      // Kết quả
  lesson?: string;       // Bài học rút ra
  relatedUrl?: string;   // Link tới guideline trong app
  createdAt: string;
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
}

// ─────────────────────────────────────────────
// PERSONAL PROTOCOL (Phase 2)
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
}

export interface ProtocolStep {
  order: number;
  text: string;
  isAlert?: boolean;
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
}

// ─────────────────────────────────────────────
// DOCSPACE STORAGE SNAPSHOT (Export/Import)
// ─────────────────────────────────────────────

export interface DocSpaceSnapshot {
  version: string;       // VD: "1.0"
  exportedAt: string;
  profile: DoctorProfile;
  sbars: SBARRecord[];
  shifts: OnCallShift[];
  cases: CaseRecord[];
  notes: PersonalNote[];
  drugJournal: DrugJournalEntry[];
  protocols: PersonalProtocol[];
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
  phase?: 1 | 2;
}

export const DOCSPACE_VERSION = '1.0';

export const DEFAULT_QUICK_LINKS: QuickLink[] = [
  { id: 'abg',        label: 'ABG Studio',       href: '#/calculators/renal-dg-abg',                                         icon: 'fa-solid fa-lungs',      category: 'calculators',  isPinned: true },
  { id: 'egfr',       label: 'eGFR',             href: '#/calculators/renal-renal-function',                                 icon: 'fa-solid fa-kidney',     category: 'calculators',  isPinned: true },
  { id: 'sepsis',     label: 'Sốc Nhiễm khuẩn', href: '#/ebm/guidelines-kho-guidelines-phac-do-soc-nhiem-khuan-sepsis3', icon: 'fa-solid fa-bacterium',  category: 'ebm',          isPinned: true },
  { id: 'dyspnea',    label: 'Khó thở cấp',     href: '#/approaches/symptoms-than-phien-ho-hap-tim-mach-tc-khotho',        icon: 'fa-solid fa-wind',       category: 'approaches',   isPinned: false },
  { id: 'antibiotic', label: 'Kháng sinh',      href: '#/pharmacology/specialties-dl-khangsinh',                           icon: 'fa-solid fa-pills',      category: 'pharmacology', isPinned: false },
  { id: 'ecg',        label: 'Đọc ECG',          href: '#/skills/can-lam-sang-doc-ecg-co-ban',                              icon: 'fa-solid fa-heart-pulse',category: 'skills',       isPinned: false },
];
