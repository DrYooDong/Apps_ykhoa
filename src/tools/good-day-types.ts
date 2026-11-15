/**
 * CliniPortal 2.0 — Good Day & Chronobiology Types (v3.0)
 * Tỷ trọng: 60% Con Người, Môi Trường & Đời Sống • 40% Bác Sĩ Truyền Nhiễm (Cố định)
 * Path: src/tools/good-day-types.ts
 */

export type ElementType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';
export type NapAmElement = ElementType;

// Cố định danh định chuyên khoa là Bác sĩ Truyền Nhiễm
export type DoctorSpecialty = 'infectious_diseases';

export interface LunarDateInfo {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  jd: number;
  monthLabel: string;
}

export interface NapAmDetail {
  canChi: string;
  name: string;
  element: ElementType;
  meaning: string;
}

export interface BatTuPillars {
  yearCan: string;
  yearChi: string;
  yearFull: string;
  monthCan: string;
  monthChi: string;
  monthFull: string;
  dayCan: string;
  dayChi: string;
  dayFull: string;
  hourCan: string;
  hourChi: string;
  hourFull: string;
  napAmYear: NapAmDetail;
  napAmDay: NapAmDetail;
  napAmHour: NapAmDetail;
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
  hanhMenh: ElementType;
  napAmName: string;
  batTu?: BatTuPillars;
  specialty: DoctorSpecialty;
}

export interface TrucItem {
  name: string;
  type: 'cat' | 'neutral' | 'hung';
  rating: string;
  score: number;
  desc: string;
  lifeHint: string;
}

export interface TietKhiItem {
  index: number;
  name: string;
  sunLon: number;
  score: number;
  icon: string;
  climateDesc: string;
  envImpact: string;
  healthTip: string;
  special?: 'Ly' | 'Tuet';
}

export interface ThanSatItem {
  name: string;
  type: 'pos' | 'neg';
  score: number;
  desc: string;
  scope: 'life' | 'clinical' | 'both';
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
  isCriticalPhysical: boolean;
  isCriticalEmotional: boolean;
  isCriticalIntellectual: boolean;
  totalBioScore: number;
  lifeTips: string[];
  clinicalTips: string[];
}

export interface ClinicalAdviceItem {
  status: 'good' | 'neutral' | 'caution';
  title: string;
  text: string;
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

// ─── 5 TÁC VỤ LÂM SÀNG TRUYỀN NHIỄM (40% CHUYÊN MÔN) ───────────────────────
export type MedicalTaskType =
  | 'bien_luan_fuo'      // Sốt CRNN (FUO) & Ca Nhiễm Trùng Phức Tạp
  | 'toi_uu_khang_sinh'  // Khởi Đầu & Tối Ưu Kháng Sinh (AMS / PK-PD)
  | 'kiem_soat_o_nhiem'  // Kiểm Soát Ổ Nhiễm (Source Control) & Thủ Thuật
  | 'xuat_vien_opat'     // Xuất Viện, Chuyển Đường Uống (IV-to-PO) & Ngoại Trú
  | 'hoi_chan_dich_te';  // Hội Chẩn Liên Khoa, Cảnh Giác Dịch Tễ & EBM

export interface MedicalTaskConfig {
  id: MedicalTaskType;
  vuNumber: number;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  specialDays?: string[];
  baseDays: string[];
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

// ─── PHÂN HẠNG 9 BẬC GIỜ KHỞI SỰ ─────────────────────────────────────────
export interface GioRankResult {
  chi: string;
  can: string;
  fullCanChi: string;
  timeRange: string;
  starName: string;
  isHoangDao: boolean;
  napAm: string;
  napAmElement: ElementType;
  rank: number; // 1 -> 9
  rankTitle: string;
  badgeClass: string;
  goodFactors: string[];
  badFactors: string[];
  lifeNote: string;
  clinicalNote: string;
}

export interface ScoreBreakdownFactor {
  id: string;
  pillar: 'human_env' | 'clinical_id';
  label: string;
  delta: number;
  tone: 'pos' | 'neg' | 'neutral';
  detail: string;
}

export interface DirectionGuide {
  hyThan: string;
  taiThan: string;
  hacThan: string;
  travelTip: string;
}

// ─── ĐÁNH GIÁ 60% CON NGƯỜI, MÔI TRƯỜNG & ĐỜI SỐNG (TỐI ĐA 60Đ) ─────────
export interface HumanEnvironmentEval {
  score: number;        // 0..60
  maxScore: 60;
  percent: number;      // 0..100
  rating: string;
  climate: {
    tietKhi: TietKhiItem;
    tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null;
    ecoNote: string;
  };
  directions: DirectionGuide;
  pillars: {
    bodyAndSpace: ClinicalAdviceItem;   // Sức khỏe thể chất & Không gian sống
    relationships: ClinicalAdviceItem;  // Giao tiếp, Gia đạo & Đồng nghiệp
    lifeAndFinance: ClinicalAdviceItem; // Công việc đời thường, Tài chính & Học tập
  };
  doList: string[];
  avoidList: string[];
}

// ─── ĐÁNH GIÁ 40% NGHỀ BÁC SĨ TRUYỀN NHIỄM (TỐI ĐA 40Đ) ──────────────────
export interface InfectiousClinicalEval {
  score: number;        // 0..40
  maxScore: 40;
  percent: number;      // 0..100
  rating: string;
  tasks: Record<MedicalTaskType, MedicalTaskScoreEvaluation>;
  pillars: {
    fuoAndSepsis: ClinicalAdviceItem;   // Biện luận Sốt CRNN & Sepsis
    amsStewardship: ClinicalAdviceItem; // Quản lý Kháng sinh (AMS & PK/PD)
    sourceControl: ClinicalAdviceItem;  // Kiểm soát Ổ nhiễm & Thủ thuật
    ipcAndEbm: ClinicalAdviceItem;      // Phòng chống Nhiễm khuẩn & EBM
  };
  idShiftFocus: string;
}

export interface DayScoreEvaluation {
  total: number;          // 0..100 (humanEnv.score + clinicalID.score)
  rawTotal: number;
  rating: string;
  icon: string;
  badgeClass: string;
  summaryText: string;
  dateObj: Date;
  dateKey: string;
  formattedDate: string;
  lunar: LunarDateInfo;
  lunarDay: number;
  lunarMonth: number;
  canChiYear: string;
  canChiMonth: string;
  canChiDay: string;
  canNgay: string;
  chiNgay: string;
  hanhNgay: ElementType;
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
  napAmDay: NapAmDetail;
  napAmDoc: NapAmDetail;
  napAmRelation: {
    score: number;
    text: string;
    relationType: 'sinh_nhap' | 'dong_hanh' | 'sinh_xuat' | 'khac_xuat' | 'khac_nhap';
  };
  humanEnv: HumanEnvironmentEval;
  clinicalID: InfectiousClinicalEval;
  breakdown: ScoreBreakdownFactor[];
  hoangDaoHours: string[];
  gioTimeline: GioDetailItem[];
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
  humanScore: number;
  clinicalScore: number;
  rating: string;
  badgeClass: string;
  icon: string;
  isToday: boolean;
  isBestDay: boolean;
  evalData: DayScoreEvaluation;
}

export type FinderPurpose =
  | 'life_balance'      // 60%: Đời sống, Gia đạo, Sức khỏe & Nghỉ dưỡng
  | 'travel_meeting'    // 60%: Xuất hành, Ký kết, Gặp gỡ & Tài lộc
  | 'fuo_diagnosis'     // 40%: Biện luận Sốt CRNN (FUO) & Ca khó
  | 'ams_therapy'       // 40%: Khởi & Tối ưu Kháng sinh (AMS / PK-PD)
  | 'source_control'    // 40%: Kiểm soát Ổ nhiễm & Thủ thuật (LP/Dẫn lưu)
  | 'ebm_rounds';       // 40%: Hội chẩn Đa chuyên khoa & Báo cáo EBM

export interface BestClinicalDayResult {
  rank: number;
  purpose: FinderPurpose;
  purposeName: string;
  evalData: DayScoreEvaluation;
  matchReasons: string[];
  score: number;
}

export interface ShiftEnergyData {
  shiftName: string;
  shiftRemainingText: string;
  energyPercent: number;
  statusText: string;
  statusClass: 'high' | 'med' | 'low';
  icon: string;
  circadianPhase: string;
  peakHours: string;
  fatigueWarning: string | null;
  caffeineTip: string;
  safetyChecklist: string[];
}
