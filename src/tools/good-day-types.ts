/**
 * CliniPortal 2.0 — Good Day Calculator Types
 * Path: src/tools/good-day-types.ts
 */

export type DoctorSpecialty =
  | 'surgery'           // Ngoại khoa & Phẫu thuật / Can thiệp
  | 'icu_er'            // Hồi sức & Cấp cứu (ICU / CCU / ER)
  | 'internal'          // Nội khoa Điều trị & Ca khó
  | 'psych_onco_peds'   // Tâm thần, Ung bướu, Nhi & CS Giảm nhẹ
  | 'tcm_rehab';        // Y học cổ truyền & Phục hồi chức năng

export interface SpecialtyMeta {
  id: DoctorSpecialty;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  weights: {
    physical: number;
    intellectual: number;
    emotional: number;
    intuitive: number;
  };
}

export interface DoctorProfile {
  name: string;
  gender: 'Nam' | 'Nữ';
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  birthHour: number;
  birthMinute: number;
  canNam: string;
  chiNam: string;
  hanhMenh: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
  specialty?: DoctorSpecialty;
}

export interface TrucItem {
  name: string;
  type: 'cat' | 'neutral' | 'hung';
  rating: string;
  score: number;
  desc: string;
}

export interface TietKhiItem {
  m: number;
  d: number;
  name: string;
  score: number;
  icon: string;
  special?: 'Ly' | 'Tuet';
}

export interface ThanSatItem {
  name: string;
  type: 'pos' | 'neg';
  score: number;
  desc: string;
}

export interface SaoTuItem {
  name: string;
  element: string;
  animal: string;
  type: 'cat' | 'hung';
  score: number;
  poem: string;
  desc: string;
}

export interface GioDetailItem {
  chi: string;
  timeRange: string;
  starName: string;
  isHoangDao: boolean;
  type: 'hoang_dao' | 'hac_dao';
  icon: string;
  meaning: string;
  isCurrent: boolean;
}

export interface BiorhythmResult {
  daysLived: number;
  physical: number;
  emotional: number;
  intellectual: number;
  intuitive: number;
  avgScore: number;
  physBonus: number;
  intBonus: number;
  emoBonus: number;
  intuitBonus: number;
  totalBioScore: number;
  clinicalTips: string[];
}

export interface ClinicalAdviceItem {
  status: 'good' | 'neutral' | 'caution';
  title: string;
  text: string;
}

export interface ClinicalAdvice {
  surgery: ClinicalAdviceItem;
  consultation: ClinicalAdviceItem;
  communication: ClinicalAdviceItem;
  research: ClinicalAdviceItem;
}

export interface DiaChiRelationResult {
  tamHop: { isMatch: boolean; text: string; score: number };
  lucHop: { isMatch: boolean; text: string; score: number };
  lucXung: { isMatch: boolean; text: string; score: number };
  lucHai: { isMatch: boolean; text: string; score: number };
  tuongHinh: { isMatch: boolean; text: string; score: number };
  totalScore: number;
}

export interface QuyNhanLocResult {
  thienAt: { isMatch: boolean; text: string; score: number };
  locThan: { isMatch: boolean; text: string; score: number };
  totalScore: number;
}

// ─── NẠP ÂM 60 HOA GIÁP & SAO ĐĂNG VIÊN ──────────────────────────────────
export type NapAmElement = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

export interface NapAmDetail {
  canChi: string;
  name: string;        // Ví dụ: "Lộ Bàng Thổ", "Hải Trung Kim"...
  element: NapAmElement;
  meaning: string;
}

// ─── ĐÁNH GIÁ VỤ VIỆC Y KHOA CHUYÊN BIỆT (CHƯƠNG II: 83 VỤ) ───────────
export type MedicalTaskType =
  | 'cau_thay'    // VỤ 81: Cầu Thầy Trị Bệnh & Phẫu Thuật
  | 'hot_thuoc'   // VỤ 82: Hốt Thuốc / Bào Chế / Ra Y Lệnh Đầu Tay
  | 'uong_thuoc'  // VỤ 83: Uống Thuốc / Khởi Đầu Liệu Trình / Hóa Trị
  | 'khai_truong' // VỤ 37: Khai Trương Phòng Khám / Tiếp Nhận Thiết Bị Mới
  | 'giao_dich';  // VỤ 39: Ký Kết Hợp Đồng Y Tế / Thầu Thuốc

export interface MedicalTaskConfig {
  id: MedicalTaskType;
  vuNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  specialDays?: string[];     // 3 Ngày Tối Thượng (ví dụ: Kỷ Dậu, Bính Thìn, Nhâm Thìn trong Vụ 81)
  baseDays: string[];        // Các ngày tốt căn bản của vụ
  hapTruc: string[];
  kyTruc?: string[];
  hapThanSat?: string[];
  kyThanSat?: string[];
  genderRules?: {
    maleKyTruc?: string[];
    femaleKyTruc?: string[];
  };
  specialNotes: string[];
}

export interface MedicalTaskScoreEvaluation {
  task: MedicalTaskConfig;
  isSpecialDay: boolean;
  isBaseDay: boolean;
  baseScore: number;
  saoScore: number;
  saoNote: string;
  trucScore: number;
  trucNote: string;
  thanSatScore: number;
  thanSatNote: string;
  totalScore: number;
  recommendation: 'rat_tot' | 'tot' | 'binh_thuong' | 'khong_nen';
  advice: string;
}

// ─── PHÂN HẠNG 9 BẬC GIỜ KHỞI SỰ (CHƯƠNG VII) ───────────────────────────
export interface GioRankResult {
  chi: string;
  can: string;
  fullCanChi: string;
  timeRange: string;
  starName: string;
  isHoangDao: boolean;
  napAm: string;
  napAmElement: NapAmElement;
  rank: number; // 1 -> 9
  rankTitle: string; // 'Hạng Nhất' -> 'Hạng Chín'
  badgeClass: string;
  goodFactors: string[];
  badFactors: string[];
  clinicalNote: string;
}

export interface DayScoreEvaluation {
  total: number;
  rawTotal: number;
  rating: string;
  icon: string;
  badgeClass: string;
  summaryText: string;
  dateObj: Date;
  dateKey: string;
  formattedDate: string;
  lunarDay: number;
  lunarMonth: number;
  canChiDay: string;
  canNgay: string;
  chiNgay: string;
  hanhNgay: string;
  docProfile: DoctorProfile;
  b1: { level: number; text: string; score: number };
  canChiNgayScore: { level: number; text: string; score: number };
  diaChiRelations: DiaChiRelationResult;
  quyNhanLoc: QuyNhanLocResult;
  b3: { point: number; detail: string[] };
  b4: { errors: string[]; bonuses: string[]; penalty: number; bonusPoint: number };
  saoTu: SaoTuItem;
  saoTuDangVien: { isDangVien: boolean; bonusScore: number; note: string };
  trucNgay: TrucItem;
  tietKhiInfo: {
    tietKhi: TietKhiItem;
    tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null;
  };
  thanSat: { list: ThanSatItem[]; score: number };
  bio: BiorhythmResult;
  advice: ClinicalAdvice;
  hoangDaoHours: string[];
  gioTimeline: GioDetailItem[];
  // Bổ sung chuyên sâu theo sách:
  napAmDay: NapAmDetail;
  napAmDoc: NapAmDetail;
  napAmRelation: { score: number; text: string; relationType: 'sinh_nhap' | 'dong_hanh' | 'sinh_xuat' | 'khac_xuat' | 'khac_nhap' };
  medicalTasks: Record<MedicalTaskType, MedicalTaskScoreEvaluation>;
  gioRanks: GioRankResult[];
}

export interface WeekDaySummary {
  date: Date;
  dateKey: string;
  dayOfWeek: string;
  dateFormatted: string;
  lunarFormatted: string;
  canChi: string;
  saoTu: string;
  truc: string;
  score: number;
  rating: string;
  badgeClass: string;
  icon: string;
  isToday: boolean;
  isBestDay: boolean;
  evalData: DayScoreEvaluation;
}

export interface BestClinicalDayResult {
  rank: number;
  purpose: 'surgery' | 'clinic' | 'ebm' | 'consultation' | 'med_cau_thay' | 'med_hot_thuoc' | 'med_uong_thuoc';
  purposeName: string;
  evalData: DayScoreEvaluation;
  matchReasons: string[];
  score: number;
}

export interface ShiftEnergyData {
  energyPercent: number;
  statusText: string;
  statusClass: string;
  icon: string;
  circadianPhase: string;
  peakHours: string;
  fatigueWarning: string | null;
  caffeineTip: string;
  safetyChecklist: string[];
}
