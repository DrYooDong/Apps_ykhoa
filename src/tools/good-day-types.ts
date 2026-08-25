/**
 * CliniPortal 2.0 — Good Day Calculator Types
 * Path: src/tools/good-day-types.ts
 */

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
  purpose: 'surgery' | 'clinic' | 'ebm' | 'consultation';
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

// ─── HẰNG SỐ & DỮ LIỆU CƠ BẢN ──────────────────────────────────────────
