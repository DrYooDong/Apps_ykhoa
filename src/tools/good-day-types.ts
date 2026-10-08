/**
 * CliniPortal 2.0 — Good Day Calculator Types (Chuyên ngành Nội khoa)
 * Path: src/tools/good-day-types.ts
 */

export type DoctorSpecialty =
  | 'internal_general'      // Nội Tổng Quát & Ca Bệnh Phức Tạp / Đa Bệnh Lý
  | 'internal_cardio'       // Nội Tim Mạch & Huyết Động Học
  | 'internal_resp_icu'     // Nội Hô Hấp & Hồi Sức Tích Cực Nội Khoa
  | 'internal_gi_hepa'      // Nội Tiêu Hóa & Gan Mật
  | 'internal_endo_nephro'  // Nội Tiết, Chuyển Hóa & Thận Học
  | 'internal_neuro_id';    // Nội Thần Kinh & Bệnh Truyền Nhiễm

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
  diagnosis: ClinicalAdviceItem;        // Chẩn đoán & Biện luận Ca khó Nội khoa
  pharmacotherapy: ClinicalAdviceItem;  // Dược trị liệu & Tối ưu hóa Y lệnh thuốc
  communication: ClinicalAdviceItem;    // Giao tiếp Bệnh mạn & Giải thích Tiên lượng
  evidence: ClinicalAdviceItem;         // Tra cứu EBM & Sinh hoạt Khoa phòng
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

// ─── ĐÁNH GIÁ VỤ VIỆC Y KHOA NỘI KHOA CHUYÊN BIỆT (CHƯƠNG II: 83 VỤ) ───────────
export type MedicalTaskType =
  | 'kham_chandoan'        // VỤ 81: Khám & Biện Luận Ca Khó Nội Khoa
  | 'khoi_phacdo'          // VỤ 82: Khởi Đầu Phác Đồ Điều Trị / Dược Trị Liệu Bậc Cao
  | 'chinh_lieu_xuatvien'  // VỤ 83: Hiệu Chỉnh Liều, Rà Soát Tương Tác & Xuất Viện An Toàn
  | 'khai_truong_kthuat'   // VỤ 37: Khai Trương Phòng Khám Nội Khoa / Triển Khai Thăm Dò Chức Năng
  | 'hoi_chan_ebm';        // VỤ 39: Hội Chẩn Ca Bệnh Liên Chuyên Khoa & Nghiên Cứu EBM

export interface MedicalTaskConfig {
  id: MedicalTaskType;
  vuNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  specialDays?: string[];     // Ngày Tối Thượng y học cổ truyền
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
  // Bổ sung chuyên sâu:
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
  purpose: 'diagnosis' | 'pharmacotherapy' | 'discharge' | 'ebm' | 'clinic';
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
