/**
 * CliniPortal 2.0 — Chronobiology, Astronomical Lunar & Infectious Diseases Engine (v3.0)
 * - Lịch Âm Thiên Văn Việt Nam chuẩn UTC+7 (Hồ Ngọc Đức): Sóc, Nhuận, 24 Tiết Khí theo kinh độ Mặt Trời
 * - Tự động lập Bát Tự Tứ Trụ (Năm - Tháng - Ngày - Giờ) & Nạp Âm 60 Hoa Giáp
 * - Tỷ trọng 60/40: 60% Con Người, Môi Trường & Đời Sống (0–60đ) • 40% Bác Sĩ Truyền Nhiễm (0–40đ)
 * Path: src/tools/good-day-engine.ts
 */

import type {
  ElementType,
  LunarDateInfo,
  NapAmDetail,
  BatTuPillars,
  DoctorProfile,
  TrucItem,
  TietKhiItem,
  ThanSatItem,
  SaoTuItem,
  GioDetailItem,
  BiorhythmResult,
  ClinicalAdviceItem,
  DiaChiRelationResult,
  QuyNhanLocResult,
  MedicalTaskType,
  MedicalTaskScoreEvaluation,
  GioRankResult,
  ScoreBreakdownFactor,
  DirectionGuide,
  HumanEnvironmentEval,
  InfectiousClinicalEval,
  DayScoreEvaluation,
  WeekDaySummary,
  FinderPurpose,
  BestClinicalDayResult,
  ShiftEnergyData
} from './good-day-types';

import {
  CAN,
  CHI,
  NGU_HANH_CAN,
  NGU_HANH_CHI,
  HANH_SINH_KHAC,
  GIO_TIME,
  HOANG_DAO_MAP,
  GIO_THAN_SAT,
  HY_THAN_MAP,
  TAI_THAN_MAP,
  HAC_THAN_MAP,
  NHI_THAP_BAT_TU,
  TRUC_LIST,
  TIET_KHI_LIST,
  THIEN_DUC_MAP,
  NGUYET_DUC_MAP,
  THIEN_AT_MAP,
  LOC_THAN_MAP,
  PROFILE_KEY,
  LUC_THAP_HOA_GIAP_NAP_AM,
  SAO_DANG_VIEN_MAP,
  THIEN_CAN_HOP_HOA,
  THIEN_CAN_XUNG_PHA,
  THIEN_Y_MAP,
  SINH_KHI_MAP,
  SAT_CHU_MAP,
  THO_TU_MAP,
  DAO_CHIEM_SAT_DAYS,
  THAP_AC_DAI_BAI,
  MEDICAL_TASKS_CONFIG
} from './good-day-data';

const PI = Math.PI;
const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(max, val));

function formatDateKey(dateObj: Date): string {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateVN(dateObj: Date): string {
  const d = String(dateObj.getDate()).padStart(2, '0');
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}/${dateObj.getFullYear()}`;
}

function formatDayOfWeekVN(dateObj: Date): string {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return days[dateObj.getDay()] || 'Chủ Nhật';
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. LỊCH ÂM THIÊN VĂN VIỆT NAM (UTC+7) — HỒ NGỌC ĐỨC ALGORITHM
// ═══════════════════════════════════════════════════════════════════════════

export function getJDN(dd: number, mm: number, yy: number): number {
  const a = Math.floor((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd =
    dd +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;
  if (jd < 2299161) {
    jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
  }
  return jd;
}

function jdToDate(jd: number): { day: number; month: number; year: number } {
  let a: number, b: number, c: number;
  if (jd > 2299160) {
    a = jd + 32044;
    b = Math.floor((4 * a + 3) / 146097);
    c = a - Math.floor((b * 146097) / 4);
  } else {
    b = 0;
    c = jd + 32082;
  }
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = b * 100 + d - 4800 + Math.floor(m / 10);
  return { day, month, year };
}

function newMoon(k: number): number {
  const T = k / 1236.85;
  const T2 = T * T;
  const T3 = T2 * T;
  const dr = PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 += 0.001 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat =
    T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return Jd1 + C1 - deltat;
}

function getNewMoonDay(k: number, timeZone = 7): number {
  return Math.floor(newMoon(k) + 0.5 + timeZone / 24);
}

function sunLongitudeDeg(jdn: number): number {
  const T = (jdn - 2451545.0) / 36525;
  const T2 = T * T;
  const dr = PI / 180;
  const M = 357.5291 + 35999.0503 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.9146 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.00029 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L -= PI * 2 * Math.floor(L / (PI * 2));
  return (L * 180) / PI;
}

function getSunLongitudeSector(dayNumber: number, timeZone = 7): number {
  const deg = sunLongitudeDeg(dayNumber - 0.5 - timeZone / 24);
  return Math.floor(deg / 30);
}

function getLunarMonth11(yy: number, timeZone = 7): number {
  const off = getJDN(31, 12, yy) - 2415021;
  const k = Math.floor(off / 29.530588853);
  let nm = getNewMoonDay(k, timeZone);
  const sunLong = getSunLongitudeSector(nm, timeZone);
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone);
  }
  return nm;
}

function getLeapMonthOffset(a11: number, timeZone = 7): number {
  const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0;
  let i = 1;
  let arc = getSunLongitudeSector(getNewMoonDay(k + i, timeZone), timeZone);
  do {
    last = arc;
    i++;
    arc = getSunLongitudeSector(getNewMoonDay(k + i, timeZone), timeZone);
  } while (arc !== last && i < 14);
  return i - 1;
}

export function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone = 7): LunarDateInfo {
  const dayNumber = getJDN(dd, mm, yy);
  const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = getNewMoonDay(k + 1, timeZone);
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone);
  }
  let a11 = getLunarMonth11(yy, timeZone);
  let b11 = a11;
  let lunarYear: number;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = getLunarMonth11(yy - 1, timeZone);
  } else {
    lunarYear = yy + 1;
    b11 = getLunarMonth11(yy + 1, timeZone);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = Math.floor((monthStart - a11) / 29);
  let lunarLeap = false;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) {
        lunarLeap = true;
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth -= 12;
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1;
  }

  const monthNames = [
    '',
    'Giêng',
    'Hai',
    'Ba',
    'Tư',
    'Năm',
    'Sáu',
    'Bảy',
    'Tám',
    'Chín',
    'Mười',
    'Một',
    'Chạp'
  ];
  const mLabel = monthNames[lunarMonth] || String(lunarMonth);
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    isLeap: lunarLeap,
    jd: dayNumber,
    monthLabel: lunarLeap ? `Tháng ${mLabel} (Nhuận)` : `Tháng ${mLabel}`
  };
}

export function convertLunar2Solar(
  lunarDay: number,
  lunarMonth: number,
  lunarYear: number,
  lunarLeap: boolean,
  timeZone = 7
): { day: number; month: number; year: number } {
  let a11: number, b11: number;
  if (lunarMonth < 11) {
    a11 = getLunarMonth11(lunarYear - 1, timeZone);
    b11 = getLunarMonth11(lunarYear, timeZone);
  } else {
    a11 = getLunarMonth11(lunarYear, timeZone);
    b11 = getLunarMonth11(lunarYear + 1, timeZone);
  }
  let off = lunarMonth - 11;
  if (off < 0) off += 12;
  if (b11 - a11 > 365) {
    const leapOff = getLeapMonthOffset(a11, timeZone);
    let leapMonth = leapOff - 2;
    if (leapMonth < 0) leapMonth += 12;
    if (lunarLeap && lunarMonth !== leapMonth) {
      return { day: 0, month: 0, year: 0 };
    } else if (lunarLeap || off >= leapOff) {
      off += 1;
    }
  }
  const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
  const monthStart = getNewMoonDay(k + off, timeZone);
  return jdToDate(monthStart + lunarDay - 1);
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. CAN CHI, NẠP ÂM 60 HOA GIÁP & TỰ ĐỘNG LẬP BÁT TỰ TỨ TRỤ
// ═══════════════════════════════════════════════════════════════════════════

export function getCanChiYear(lunarYear: number): { can: string; chi: string; full: string } {
  const can = CAN[(lunarYear + 6) % 10] || 'Giáp';
  const chi = CHI[(lunarYear + 8) % 12] || 'Tý';
  return { can, chi, full: `${can} ${chi}` };
}

export function getCanChiMonth(
  lunarMonth: number,
  yearCan: string
): { can: string; chi: string; full: string } {
  const yearCanIdx = CAN.indexOf(yearCan as (typeof CAN)[number]);
  const startMonthCanIdx = ((yearCanIdx % 5) * 2 + 2) % 10; // Dần (tháng 1 Âm)
  const canIdx = (startMonthCanIdx + lunarMonth - 1) % 10;
  const chiIdx = (lunarMonth + 1) % 12; // Tháng 1 = Dần (idx 2)
  const can = CAN[canIdx] || 'Bính';
  const chi = CHI[chiIdx] || 'Dần';
  return { can, chi, full: `${can} ${chi}` };
}

export function getCanChiDay(dateObj: Date): { can: string; chi: string; full: string; jd: number } {
  const jd = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
  const can = CAN[(jd + 9) % 10] || 'Giáp';
  const chi = CHI[(jd + 1) % 12] || 'Tý';
  return { can, chi, full: `${can} ${chi}`, jd };
}

export function getHourChiIndexFromHour(hour24: number): number {
  const h = ((hour24 % 24) + 24) % 24;
  if (h === 23 || h === 0) return 0; // Tý
  return Math.floor((h + 1) / 2);
}

export function getCanChiHour(dayCan: string, hour24: number): { can: string; chi: string; full: string } {
  const dayCanIdx = Math.max(0, CAN.indexOf(dayCan as (typeof CAN)[number]));
  const chiIdx = getHourChiIndexFromHour(hour24);
  const tyCanIdx = (dayCanIdx % 5) * 2;
  const canIdx = (tyCanIdx + chiIdx) % 10;
  const can = CAN[canIdx] || 'Giáp';
  const chi = CHI[chiIdx] || 'Tý';
  return { can, chi, full: `${can} ${chi}` };
}

export function getNapAm(canChi: string): NapAmDetail {
  return (
    LUC_THAP_HOA_GIAP_NAP_AM[canChi] || {
      canChi,
      name: 'Bình Địa Mộc',
      element: 'Mộc',
      meaning: 'Cân bằng, ổn định và phát triển hài hòa.'
    }
  );
}

export function getBatTuFourPillars(dateObj: Date, hour24?: number): BatTuPillars {
  const hr = typeof hour24 === 'number' ? hour24 : dateObj.getHours();
  const lunar = convertSolar2Lunar(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear(), 7);
  const yearCC = getCanChiYear(lunar.year);
  const monthCC = getCanChiMonth(lunar.month, yearCC.can);
  const dayCC = getCanChiDay(dateObj);
  const hourCC = getCanChiHour(dayCC.can, hr);

  return {
    yearCan: yearCC.can,
    yearChi: yearCC.chi,
    yearFull: yearCC.full,
    monthCan: monthCC.can,
    monthChi: monthCC.chi,
    monthFull: monthCC.full,
    dayCan: dayCC.can,
    dayChi: dayCC.chi,
    dayFull: dayCC.full,
    hourCan: hourCC.can,
    hourChi: hourCC.chi,
    hourFull: hourCC.full,
    napAmYear: getNapAm(yearCC.full),
    napAmDay: getNapAm(dayCC.full),
    napAmHour: getNapAm(hourCC.full)
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. 24 TIẾT KHÍ CHUẨN KINH ĐỘ MẶT TRỜI & TỨ LY / TỨ TUYỆT
// ═══════════════════════════════════════════════════════════════════════════

export function getTietKhiInfo(dateObj: Date): {
  tietKhi: TietKhiItem;
  tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null;
} {
  const jdToday = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
  // Kinh độ mặt trời lúc 12h trưa UTC+7
  const lonToday = sunLongitudeDeg(jdToday - 0.5 + 5 / 24);
  const lonTomorrow = sunLongitudeDeg(jdToday + 0.5 + 5 / 24);

  const sectorIndex = Math.floor(((lonToday % 360) + 360) % 360 / 15) % 24;
  const tietKhi = TIET_KHI_LIST[sectorIndex] || TIET_KHI_LIST[0]!;

  const sectorTomorrow = Math.floor(((lonTomorrow % 360) + 360) % 360 / 15) % 24;
  let tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null = null;

  if (sectorTomorrow !== sectorIndex) {
    const nextTk = TIET_KHI_LIST[sectorTomorrow];
    if (nextTk?.special === 'Ly') {
      tuLyTuTuyet = {
        type: 'Tứ Ly',
        name: `Tiền ${nextTk.name}`,
        score: -4,
        desc: `Ngày chuyển giao trước tiết ${nextTk.name} (Tứ Ly): Khí trời phân tách, ưu tiên nhịp sống ổn định, tránh quyết định lớn đột ngột.`
      };
    } else if (nextTk?.special === 'Tuet') {
      tuLyTuTuyet = {
        type: 'Tứ Tuyệt',
        name: `Tiền ${nextTk.name}`,
        score: -6,
        desc: `Ngày chuyển giao trước tiết ${nextTk.name} (Tứ Tuyệt): Khí hậu giao mùa rõ rệt, giữ ấm/điều hòa thân nhiệt và tránh khởi sự mạo hiểm.`
      };
    }
  }

  return { tietKhi, tuLyTuTuyet };
}

export function getDirectionsGuide(canNgay: string, chiNgay: string): DirectionGuide {
  const hyThan = HY_THAN_MAP[canNgay] || 'Đông Nam';
  const taiThan = TAI_THAN_MAP[canNgay] || 'Chính Đông';
  const hacThan = HAC_THAN_MAP[chiNgay] || 'Tây Bắc';
  return {
    hyThan,
    taiThan,
    hacThan,
    travelTip: `Ưu tiên xuất hành hoặc bố trí góc làm việc hướng ${hyThan} (Hỷ Thần) / ${taiThan} (Tài Thần); tránh hướng ${hacThan} (Hắc Thần) khi đi xa.`
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. HỒ SƠ BÁC SĨ TRUYỀN NHIỄM & TỰ ĐỘNG TÍNH BÁT TỰ
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_BIRTH = {
  name: 'BS. Nguyễn Phúc',
  gender: 'Nam' as const,
  birthDay: 15,
  birthMonth: 8,
  birthYear: 1995,
  birthHour: 8,
  birthMinute: 30
};

function enrichProfile(raw: Partial<DoctorProfile>): DoctorProfile {
  const birthDay = clamp(Number(raw.birthDay) || DEFAULT_BIRTH.birthDay, 1, 31);
  const birthMonth = clamp(Number(raw.birthMonth) || DEFAULT_BIRTH.birthMonth, 1, 12);
  const birthYear = clamp(Number(raw.birthYear) || DEFAULT_BIRTH.birthYear, 1940, 2025);
  const birthHour = clamp(Number(raw.birthHour ?? DEFAULT_BIRTH.birthHour), 0, 23);
  const birthMinute = clamp(Number(raw.birthMinute ?? DEFAULT_BIRTH.birthMinute), 0, 59);

  const safeDay = Math.min(birthDay, new Date(birthYear, birthMonth, 0).getDate());
  const birthDate = new Date(birthYear, birthMonth - 1, safeDay, birthHour, birthMinute);
  const batTu = getBatTuFourPillars(birthDate, birthHour);

  return {
    name: (raw.name || DEFAULT_BIRTH.name).trim() || DEFAULT_BIRTH.name,
    gender: raw.gender === 'Nữ' ? 'Nữ' : 'Nam',
    birthDay: safeDay,
    birthMonth,
    birthYear,
    birthHour,
    birthMinute,
    canNam: batTu.yearCan,
    chiNam: batTu.yearChi,
    hanhMenh: batTu.napAmYear.element,
    napAmName: batTu.napAmYear.name,
    batTu,
    specialty: 'infectious_diseases'
  };
}

export function getDoctorProfile(): DoctorProfile {
  try {
    const rawStr = localStorage.getItem(PROFILE_KEY);
    if (rawStr) {
      const parsed = JSON.parse(rawStr) as Partial<DoctorProfile>;
      return enrichProfile(parsed);
    }
  } catch {
    // Fallback to default
  }
  return enrichProfile(DEFAULT_BIRTH);
}

export function saveDoctorProfile(partial: Partial<DoctorProfile>): DoctorProfile {
  const current = getDoctorProfile();
  const merged = enrichProfile({ ...current, ...partial, specialty: 'infectious_diseases' });
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
  } catch {
    // Ignore storage quota errors
  }
  return merged;
}

// ═══════════════════════════════════════════════════════════════════════════
// 5. NHỊP SINH HỌC (BIORHYTHM) & TƯƠNG TÁC CAN CHI - NẠP ÂM
// ═══════════════════════════════════════════════════════════════════════════

export function calculateBiorhythms(birthDate: Date, targetDate: Date = new Date()): BiorhythmResult {
  const tTarget = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
  const tBirth = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()).getTime();
  const daysLived = Math.max(1, Math.round((tTarget - tBirth) / 86400000));

  const sinPct = (period: number): number => Math.round(Math.sin((2 * PI * daysLived) / period) * 100);
  const physical = sinPct(23);
  const emotional = sinPct(28);
  const intellectual = sinPct(33);
  const intuitive = sinPct(38);
  const avgScore = Math.round((physical + emotional + intellectual + intuitive) / 4);

  const isCritical = (period: number): boolean => Math.abs(Math.sin((2 * PI * daysLived) / period)) < 0.14;
  const isCriticalPhysical = isCritical(23);
  const isCriticalEmotional = isCritical(28);
  const isCriticalIntellectual = isCritical(33);

  let bioScore = Math.round((avgScore / 100) * 8);
  if (isCriticalPhysical) bioScore -= 2;
  if (isCriticalEmotional) bioScore -= 1;
  if (isCriticalIntellectual) bioScore -= 2;

  const lifeTips: string[] = [];
  const clinicalTips: string[] = [];

  if (physical >= 40) lifeTips.push(`Thể chất +${physical}%: Sung sức, phù hợp vận động thể thao và đi lại ngoài trời.`);
  else if (physical <= -40) lifeTips.push(`Thể chất ${physical}%: Giảm cường độ vận động nặng, ưu tiên ngủ đủ giấc.`);
  else lifeTips.push(`Thể chất ${physical}%: Duy trì nhịp vận động điều độ 20–30 phút.`);

  if (emotional >= 40) lifeTips.push(`Cảm xúc +${emotional}%: Tinh thần lạc quan, gắn kết tốt với gia đình và đồng nghiệp.`);
  else if (emotional <= -40) lifeTips.push(`Cảm xúc ${emotional}%: Giữ nhịp thở chậm, tránh phản ứng nóng vội khi giao tiếp.`);

  if (intellectual >= 40) clinicalTips.push(`Trí tuệ +${intellectual}%: Rất bén nhạy để biện luận ca FUO phức tạp và đọc EBM.`);
  else if (intellectual <= -40) clinicalTips.push(`Trí tuệ ${intellectual}%: Dùng checklist y lệnh và kiểm tra chéo liều kháng sinh theo eGFR.`);

  if (isCriticalPhysical || isCriticalIntellectual) {
    clinicalTips.push('Ngày giao pha sinh học: Kiểm tra kép chống chỉ định thủ thuật xâm lấn (LP, dẫn lưu).');
  } else if (clinicalTips.length === 0) {
    clinicalTips.push('Nhịp trí tuệ - trực giác ổn định cho đi buồng Truyền Nhiễm và hội chẩn liên khoa.');
  }

  return {
    daysLived,
    physical,
    emotional,
    intellectual,
    intuitive,
    avgScore,
    isCriticalPhysical,
    isCriticalEmotional,
    isCriticalIntellectual,
    totalBioScore: clamp(bioScore, -8, 8),
    lifeTips,
    clinicalTips
  };
}

function evaluateNapAmRelation(
  napAmDay: NapAmDetail,
  napAmDoc: NapAmDetail
): DayScoreEvaluation['napAmRelation'] {
  const eDay = napAmDay.element;
  const eDoc = napAmDoc.element;

  if (eDay === eDoc) {
    return {
      score: 6,
      relationType: 'dong_hanh',
      text: `Đồng Hành (${eDay} – ${eDoc}): Tương trợ hòa hợp, tinh thần ổn định.`
    };
  }
  if (HANH_SINH_KHAC.sinh[eDay] === eDoc) {
    return {
      score: 9,
      relationType: 'sinh_nhap',
      text: `Ngày Sinh Bản Mệnh (${eDay} sinh ${eDoc}): Đắc thiên thời, nâng đỡ sức khỏe & công việc.`
    };
  }
  if (HANH_SINH_KHAC.sinh[eDoc] === eDay) {
    return {
      score: 3,
      relationType: 'sinh_xuat',
      text: `Bản Mệnh Sinh Xuất (${eDoc} sinh ${eDay}): Cống hiến năng lượng nhiều, nhớ nghỉ ngơi bù sức.`
    };
  }
  if (HANH_SINH_KHAC.khac[eDoc] === eDay) {
    return {
      score: 1,
      relationType: 'khac_xuat',
      text: `Bản Mệnh Khắc Ngày (${eDoc} khắc ${eDay}): Chủ động kiểm soát được tình huống nhưng hơi hao tâm.`
    };
  }
  return {
    score: -6,
    relationType: 'khac_nhap',
    text: `Ngày Khắc Bản Mệnh (${eDay} khắc ${eDoc}): Tránh ôm đồm việc nặng, chú trọng an toàn và giữ nhịp chậm.`
  };
}

function evaluateDiaChiRelation(chiDoc: string, chiDay: string): DiaChiRelationResult {
  const tamHopGroups = [
    ['Thân', 'Tý', 'Thìn'],
    ['Dần', 'Ngọ', 'Tuất'],
    ['Hợi', 'Mão', 'Mùi'],
    ['Tỵ', 'Dậu', 'Sửu']
  ];
  const lucHopPairs: [string, string][] = [
    ['Tý', 'Sửu'],
    ['Dần', 'Hợi'],
    ['Mão', 'Tuất'],
    ['Thìn', 'Dậu'],
    ['Tỵ', 'Thân'],
    ['Ngọ', 'Mùi']
  ];
  const lucXungPairs: [string, string][] = [
    ['Tý', 'Ngọ'],
    ['Sửu', 'Mùi'],
    ['Dần', 'Thân'],
    ['Mão', 'Dậu'],
    ['Thìn', 'Tuất'],
    ['Tỵ', 'Hợi']
  ];
  const lucHaiPairs: [string, string][] = [
    ['Tý', 'Mùi'],
    ['Sửu', 'Ngọ'],
    ['Dần', 'Tỵ'],
    ['Mão', 'Thìn'],
    ['Thân', 'Hợi'],
    ['Dậu', 'Tuất']
  ];

  const hasPair = (pairs: [string, string][]) =>
    pairs.some(([a, b]) => (a === chiDoc && b === chiDay) || (a === chiDay && b === chiDoc));

  const isTamHop = chiDoc !== chiDay && tamHopGroups.some((g) => g.includes(chiDoc) && g.includes(chiDay));
  const isLucHop = hasPair(lucHopPairs);
  const isLucXung = hasPair(lucXungPairs);
  const isLucHai = hasPair(lucHaiPairs);
  const isTuHinh = ['Thìn', 'Ngọ', 'Dậu', 'Hợi'].includes(chiDoc) && chiDoc === chiDay;

  const tamHopScore = isTamHop ? 6 : 0;
  const lucHopScore = isLucHop ? 5 : 0;
  const lucXungScore = isLucXung ? -7 : 0;
  const lucHaiScore = isLucHai ? -4 : 0;
  const hinhScore = isTuHinh ? -3 : 0;

  return {
    tamHop: { isMatch: isTamHop, text: isTamHop ? `Tam Hợp ${chiDoc}–${chiDay}` : 'Không', score: tamHopScore },
    lucHop: { isMatch: isLucHop, text: isLucHop ? `Lục Hợp ${chiDoc}–${chiDay}` : 'Không', score: lucHopScore },
    lucXung: { isMatch: isLucXung, text: isLucXung ? `Lục Xung ${chiDoc}–${chiDay}` : 'Không', score: lucXungScore },
    lucHai: { isMatch: isLucHai, text: isLucHai ? `Lục Hại ${chiDoc}–${chiDay}` : 'Không', score: lucHaiScore },
    tuongHinh: { isMatch: isTuHinh, text: isTuHinh ? `Tự Hình ${chiDoc}` : 'Không', score: hinhScore },
    totalScore: tamHopScore + lucHopScore + lucXungScore + lucHaiScore + hinhScore
  };
}

function evaluateQuyNhanLoc(canDoc: string, chiDay: string): QuyNhanLocResult {
  const isThienAt = (THIEN_AT_MAP[canDoc] || []).includes(chiDay);
  const isLocThan = LOC_THAN_MAP[canDoc] === chiDay;
  return {
    thienAt: {
      isMatch: isThienAt,
      text: isThienAt ? `Thiên Ất Quý Nhân (${chiDay}): Có người trợ lực` : 'Không',
      score: isThienAt ? 5 : 0
    },
    locThan: {
      isMatch: isLocThan,
      text: isLocThan ? `Lộc Thần (${chiDay}): Tài lộc & thuận lợi` : 'Không',
      score: isLocThan ? 4 : 0
    },
    totalScore: (isThienAt ? 5 : 0) + (isLocThan ? 4 : 0)
  };
}

function evaluateThanSat(
  lunarMonth: number,
  canNgay: string,
  chiNgay: string,
  canChiDay: string,
  canNamDoc: string
): { list: ThanSatItem[]; score: number; lifeDelta: number; clinicalDelta: number } {
  const list: ThanSatItem[] = [];
  if (THIEN_Y_MAP[lunarMonth] === chiNgay) {
    list.push({
      name: 'Thiên Y',
      type: 'pos',
      score: 7,
      scope: 'clinical',
      desc: 'Cát tinh y học: Khám chữa bệnh, hội chẩn và lựa chọn phác đồ chuẩn xác.'
    });
  }
  if (SINH_KHI_MAP[lunarMonth] === chiNgay) {
    list.push({
      name: 'Sinh Khí',
      type: 'pos',
      score: 6,
      scope: 'both',
      desc: 'Sinh khí dồi dào: Phục hồi thể lực nhanh, thuận lợi cả đời sống lẫn điều trị.'
    });
  }
  if (THIEN_DUC_MAP[lunarMonth] === canNgay || THIEN_DUC_MAP[lunarMonth] === chiNgay) {
    list.push({
      name: 'Thiên Đức',
      type: 'pos',
      score: 7,
      scope: 'both',
      desc: 'Phúc đức bảo hộ: Gặp hung hóa cát, giao tiếp đồng thuận, xuất hành bình an.'
    });
  }
  if (NGUYET_DUC_MAP[lunarMonth] === canNgay) {
    list.push({
      name: 'Nguyệt Đức',
      type: 'pos',
      score: 6,
      scope: 'both',
      desc: 'Nguyệt Đức chiếu mệnh: Hóa giải trắc trở, tăng uy tín chuyên môn.'
    });
  }
  if (SAT_CHU_MAP[lunarMonth] === chiNgay) {
    list.push({
      name: 'Sát Chủ',
      type: 'neg',
      score: -8,
      scope: 'clinical',
      desc: 'Cảnh báo rủi ro thủ thuật xâm lấn không cấp cứu; rà soát vô khuẩn cực kỹ.'
    });
  }
  if (THO_TU_MAP[lunarMonth] === chiNgay) {
    list.push({
      name: 'Thọ Tử',
      type: 'neg',
      score: -8,
      scope: 'both',
      desc: 'Hung tinh: Tránh khởi sự trọng đại hay làm thủ thuật mạo hiểm.'
    });
  }
  if ((DAO_CHIEM_SAT_DAYS[lunarMonth] || []).includes(chiNgay)) {
    list.push({
      name: 'Đao Chiêm Sát',
      type: 'neg',
      score: -6,
      scope: 'clinical',
      desc: 'Thận trọng khi cầm kim chọc dò tủy sống (LP), dẫn lưu áp xe và vật sắc nhọn.'
    });
  }
  const isThapAc = THAP_AC_DAI_BAI.some(
    (item) => item.month === lunarMonth && item.dayCanChi === canChiDay && item.yearCans.includes(canNamDoc)
  );
  if (isThapAc) {
    list.push({
      name: 'Thập Ác Đại Bại',
      type: 'neg',
      score: -7,
      scope: 'life',
      desc: 'Hạn chế quyết định tài chính lớn, giữ an toàn giao thông và sinh hoạt.'
    });
  }

  let score = 0;
  let lifeDelta = 0;
  let clinicalDelta = 0;
  list.forEach((item) => {
    score += item.score;
    if (item.scope === 'life') lifeDelta += item.score;
    else if (item.scope === 'clinical') clinicalDelta += item.score;
    else {
      lifeDelta += Math.round(item.score * 0.6);
      clinicalDelta += Math.round(item.score * 0.4);
    }
  });
  return { list, score, lifeDelta, clinicalDelta };
}

function getSaoTuByJDN(jd: number): SaoTuItem {
  const idx = (jd + 11) % 28;
  return NHI_THAP_BAT_TU[idx] || NHI_THAP_BAT_TU[0]!;
}

function getTrucByMonthAndDay(lunarMonth: number, chiNgay: string): TrucItem {
  const monthChiIdx = (lunarMonth + 1) % 12; // Tháng 1 = Dần (2)
  const dayChiIdx = Math.max(0, CHI.indexOf(chiNgay as (typeof CHI)[number]));
  const trucIdx = (dayChiIdx - monthChiIdx + 12) % 12;
  return TRUC_LIST[trucIdx] || TRUC_LIST[0]!;
}

// ═══════════════════════════════════════════════════════════════════════════
// 6. ĐÁNH GIÁ 5 TÁC VỤ BÁC SĨ TRUYỀN NHIỄM & 12 CANH GIỜ 9 BẬC
// ═══════════════════════════════════════════════════════════════════════════

function evaluateInfectiousTasks(
  canChiDay: string,
  saoTu: SaoTuItem,
  trucNgay: TrucItem,
  thanSatList: ThanSatItem[],
  gender: 'Nam' | 'Nữ',
  bio: BiorhythmResult
): Record<MedicalTaskType, MedicalTaskScoreEvaluation> {
  const results = {} as Record<MedicalTaskType, MedicalTaskScoreEvaluation>;
  const tsNames = thanSatList.map((t) => t.name);

  (Object.keys(MEDICAL_TASKS_CONFIG) as MedicalTaskType[]).forEach((taskId) => {
    const cfg = MEDICAL_TASKS_CONFIG[taskId];
    const isSpecialDay = Boolean(cfg.specialDays?.includes(canChiDay));
    const isBaseDay = cfg.baseDays.includes(canChiDay);
    const baseScore = isSpecialDay ? 22 : isBaseDay ? 14 : 6;

    const saoScore = Math.round(saoTu.score * 0.7);
    const saoNote = `Sao ${saoTu.name} (${saoTu.type === 'cat' ? 'Cát' : 'Hung'})`;

    let trucScore = 0;
    let trucNote = `Trực ${trucNgay.name}`;
    if (cfg.hapTruc.includes(trucNgay.name)) {
      trucScore = 10;
      trucNote = `Hợp Trực ${trucNgay.name}`;
    } else if (cfg.kyTruc?.includes(trucNgay.name)) {
      trucScore = -10;
      trucNote = `Kỵ Trực ${trucNgay.name}`;
    }
    if (cfg.genderRules) {
      if (gender === 'Nam' && cfg.genderRules.maleKyTruc?.includes(trucNgay.name)) {
        trucScore -= 4;
        trucNote += ' (Nam thận trọng)';
      } else if (gender === 'Nữ' && cfg.genderRules.femaleKyTruc?.includes(trucNgay.name)) {
        trucScore -= 4;
        trucNote += ' (Nữ thận trọng)';
      }
    }

    let thanSatScore = 0;
    const matchedPos = (cfg.hapThanSat || []).filter((n) => tsNames.includes(n));
    const matchedNeg = (cfg.kyThanSat || []).filter((n) => tsNames.includes(n));
    thanSatScore += matchedPos.length * 6 - matchedNeg.length * 8;
    const thanSatNote =
      matchedPos.length > 0
        ? `Cát tinh: ${matchedPos.join(', ')}`
        : matchedNeg.length > 0
          ? `Lưu ý: ${matchedNeg.join(', ')}`
          : 'Thần sát bình hòa';

    const bioBonus = Math.round(bio.intellectual * 0.05);
    const totalScore = clamp(48 + baseScore + saoScore + trucScore + thanSatScore + bioBonus, 18, 98);

    let recommendation: MedicalTaskScoreEvaluation['recommendation'] = 'binh_thuong';
    if (totalScore >= 80) recommendation = 'rat_tot';
    else if (totalScore >= 64) recommendation = 'tot';
    else if (totalScore < 45) recommendation = 'khong_nen';

    const noteBase = cfg.specialNotes[0] || cfg.description;
    const advice =
      recommendation === 'rat_tot'
        ? `Rất thuận lợi triển khai. ${noteBase}`
        : recommendation === 'tot'
          ? `Khả quan, làm theo quy trình chuẩn. ${noteBase}`
          : recommendation === 'binh_thuong'
            ? `Bình hòa — chú ý kiểm tra chéo y lệnh. ${noteBase}`
            : `Cẩn trọng cao: chỉ làm khi có chỉ định cấp cứu/bắt buộc và kiểm tra 2 lớp. ${noteBase}`;

    results[taskId] = {
      task: cfg,
      isSpecialDay,
      isBaseDay,
      baseScore,
      saoScore,
      saoNote,
      trucScore,
      trucNote,
      thanSatScore,
      thanSatNote,
      totalScore,
      recommendation,
      advice
    };
  });

  return results;
}

function buildGioTimelineAndRanks(
  chiDay: string,
  canDay: string,
  napAmDoc: NapAmDetail,
  dateObj: Date
): { gioTimeline: GioDetailItem[]; gioRanks: GioRankResult[]; hoangDaoHours: string[] } {
  const hdList = HOANG_DAO_MAP[chiDay] || ['Tý', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'];
  const startThanhLongMap: Record<string, number> = {
    Dần: 0,
    Thân: 0,
    Mão: 2,
    Dậu: 2,
    Thìn: 4,
    Tuất: 4,
    Tỵ: 6,
    Hợi: 6,
    Ngọ: 8,
    Tý: 8,
    Sửu: 10,
    Mùi: 10
  };
  const offset = startThanhLongMap[chiDay] ?? 0;
  const now = new Date();
  const isToday = formatDateKey(now) === formatDateKey(dateObj);
  const currentChiIdx = isToday ? getHourChiIndexFromHour(now.getHours()) : -1;

  const gioTimeline: GioDetailItem[] = [];
  const gioRanks: GioRankResult[] = [];
  const hoangDaoHours: string[] = [];

  CHI.forEach((chiHour, idx) => {
    const tsIdx = (idx - offset + 12) % 12;
    const star = GIO_THAN_SAT[tsIdx] || GIO_THAN_SAT[0]!;
    const isHoangDao = hdList.includes(chiHour);
    const timeRange = GIO_TIME[chiHour] || '00h-02h';
    const hourCC = getCanChiHour(canDay, idx === 0 ? 0 : idx * 2 - 1);
    const napAmH = getNapAm(hourCC.full);

    if (isHoangDao) hoangDaoHours.push(`${chiHour} (${timeRange})`);

    gioTimeline.push({
      chi: chiHour,
      timeRange,
      starName: star.name,
      isHoangDao,
      type: isHoangDao ? 'hoang_dao' : 'hac_dao',
      icon: isHoangDao ? '✨' : '🌑',
      meaning: star.meaning,
      isCurrent: idx === currentChiIdx
    });

    const goodFactors: string[] = [];
    const badFactors: string[] = [];
    let pts = 50;

    if (isHoangDao) {
      pts += 22;
      goodFactors.push(`Hoàng Đạo (${star.name})`);
    } else {
      pts -= 16;
      badFactors.push(`Hắc Đạo (${star.name})`);
    }

    if (HANH_SINH_KHAC.sinh[napAmH.element] === napAmDoc.element) {
      pts += 12;
      goodFactors.push(`Nạp Âm Giờ sinh Mệnh`);
    } else if (napAmH.element === napAmDoc.element) {
      pts += 8;
      goodFactors.push(`Nạp Âm Đồng Hành`);
    } else if (HANH_SINH_KHAC.khac[napAmH.element] === napAmDoc.element) {
      pts -= 10;
      badFactors.push(`Nạp Âm Giờ khắc Mệnh`);
    }

    const dcRel = evaluateDiaChiRelation(napAmDoc.canChi.split(' ')[1] || 'Tý', chiHour);
    if (dcRel.tamHop.isMatch || dcRel.lucHop.isMatch) {
      pts += 10;
      goodFactors.push(dcRel.tamHop.isMatch ? 'Tam Hợp Tuổi' : 'Lục Hợp Tuổi');
    }
    if (dcRel.lucXung.isMatch) {
      pts -= 12;
      badFactors.push('Xung Tuổi');
    }

    // Phân hạng 1..9 (1 = Thượng Thượng Cát, 9 = Đại Hung)
    let rank = 5;
    if (pts >= 88) rank = 1;
    else if (pts >= 78) rank = 2;
    else if (pts >= 70) rank = 3;
    else if (pts >= 62) rank = 4;
    else if (pts >= 52) rank = 5;
    else if (pts >= 44) rank = 6;
    else if (pts >= 36) rank = 7;
    else if (pts >= 28) rank = 8;
    else rank = 9;

    const rankTitles: Record<number, { title: string; badge: string }> = {
      1: { title: 'Bậc 1 • Đại Cát Đỉnh Cao', badge: 'rank-1' },
      2: { title: 'Bậc 2 • Thượng Cát', badge: 'rank-2' },
      3: { title: 'Bậc 3 • Cát Lợi', badge: 'rank-3' },
      4: { title: 'Bậc 4 • Khá Thuận Lợi', badge: 'rank-4' },
      5: { title: 'Bậc 5 • Bình Hòa', badge: 'rank-5' },
      6: { title: 'Bậc 6 • Hơi Chậm Nhịp', badge: 'rank-6' },
      7: { title: 'Bậc 7 • Cẩn Trọng', badge: 'rank-7' },
      8: { title: 'Bậc 8 • Hạn Chế Khởi Sự', badge: 'rank-8' },
      9: { title: 'Bậc 9 • Đại Kỵ / Nghỉ Ngơi', badge: 'rank-9' }
    };
    const rMeta = rankTitles[rank] || rankTitles[5]!;

    let lifeNote = '';
    let clinicalNote = '';
    if (idx <= 1 || idx >= 11) {
      lifeNote = isHoangDao
        ? 'Đêm thanh tĩnh: rất tốt để phục hồi giấc ngủ sâu hoặc thu xếp tâm trí yên bình.'
        : 'Khung giờ khuya: giữ ấm, hạn chế di chuyển đường dài và tắt màn hình xanh sớm.';
      clinicalNote =
        rank <= 4
          ? 'Trực đêm đầu óc vẫn sáng; theo dõi sát dấu hiệu cảnh báo Sepsis / qSOFA và sốt xuất huyết tái sốc.'
          : 'Khung giờ mệt sinh học: dùng checklist liều nạp kháng sinh và kiểm tra chéo y lệnh 2 lần.';
    } else if (idx >= 3 && idx <= 5) {
      lifeNote = isHoangDao
        ? 'Buổi sáng vượng khí: cực tốt cho xuất hành, thể dục đón nắng và trao đổi việc quan trọng.'
        : 'Khởi đầu chậm rãi, ăn sáng đủ chất và rà soát lịch hẹn trước khi ra khỏi nhà.';
      clinicalNote =
        rank <= 4
          ? 'Khung giờ vàng giao ban Truyền Nhiễm, đi buồng biện luận ca FUO và xét xuống thang kháng sinh.'
          : 'Hoàn tất cấy máu, đọc kết quả vi sinh thường quy và rà soát eGFR chỉnh liều.';
    } else if (idx >= 6 && idx <= 8) {
      lifeNote = isHoangDao
        ? 'Buổi chiều hanh thông: thuận lợi gặp gỡ bạn bè, ký kết giấy tờ và giải quyết tài chính.'
        : 'Tránh tranh luận căng thẳng lúc đầu giờ chiều; dành 15 phút chợp mắt tái tạo năng lượng.';
      clinicalNote =
        rank <= 4
          ? 'Thuận lợi tiến hành thủ thuật Kiểm soát ổ nhiễm (chọc dò LP, dẫn lưu, rút catheter) & hội chẩn.'
          : 'Ưu tiên hoàn thiện hồ sơ xuất viện OPAT, tư vấn bệnh nhân và cập nhật y văn EBM.';
    } else {
      lifeNote = isHoangDao
        ? 'Buổi tối đầm ấm: rất đẹp để quây quần bên gia đình, đọc sách hoặc lên kế hoạch ngày mai.'
        : 'Thư giãn nhẹ nhàng, tránh quyết định mua sắm lớn hoặc thức khuya quá 23h.';
      clinicalNote =
        rank <= 4
          ? 'Bàn giao ca trực mạch lạc (SBAR), kiểm tra lại kết quả cấy máu chiều và liều kháng sinh đêm.'
          : 'Kiểm soát nhiễm khuẩn tay, hoàn thành ghi chép bệnh án sạch sẽ và bảo toàn thể lực trực.';
    }

    gioRanks.push({
      chi: chiHour,
      can: hourCC.can,
      fullCanChi: hourCC.full,
      timeRange,
      starName: star.name,
      isHoangDao,
      napAm: napAmH.name,
      napAmElement: napAmH.element,
      rank,
      rankTitle: rMeta.title,
      badgeClass: rMeta.badge,
      goodFactors,
      badFactors,
      lifeNote,
      clinicalNote
    });
  });

  return { gioTimeline, gioRanks, hoangDaoHours };
}

// ═══════════════════════════════════════════════════════════════════════════
// 7. HÀM ĐÁNH GIÁ NGÀY TỔNG HỢP (60% CON NGƯỜI/MÔI TRƯỜNG • 40% TRUYỀN NHIỄM)
// ═══════════════════════════════════════════════════════════════════════════

export function evaluateDayScore(
  dateObj: Date = new Date(),
  customDoc?: DoctorProfile
): DayScoreEvaluation {
  const doc = customDoc ? enrichProfile(customDoc) : getDoctorProfile();
  const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 9, 0, 0);
  const lunar = convertSolar2Lunar(
    targetDate.getDate(),
    targetDate.getMonth() + 1,
    targetDate.getFullYear(),
    7
  );

  const yearCC = getCanChiYear(lunar.year);
  const monthCC = getCanChiMonth(lunar.month, yearCC.can);
  const dayCC = getCanChiDay(targetDate);
  const hanhNgay = NGU_HANH_CAN[dayCC.can] || 'Mộc';

  const napAmDay = getNapAm(dayCC.full);
  const napAmDoc = doc.batTu?.napAmYear || getNapAm(`${doc.canNam} ${doc.chiNam}`);
  const napAmRelation = evaluateNapAmRelation(napAmDay, napAmDoc);

  const diaChiRelations = evaluateDiaChiRelation(doc.chiNam, dayCC.chi);
  const quyNhanLoc = evaluateQuyNhanLoc(doc.canNam, dayCC.chi);

  const canHop = THIEN_CAN_HOP_HOA[doc.canNam]?.partner === dayCC.can;
  const canXung = (THIEN_CAN_XUNG_PHA[doc.canNam] || []).includes(dayCC.can);
  const canScore = canHop ? 5 : canXung ? -5 : 0;

  const saoTu = getSaoTuByJDN(dayCC.jd);
  const dangVienCfg = SAO_DANG_VIEN_MAP[saoTu.name];
  const isDangVien = Boolean(dangVienCfg?.chiList.includes(dayCC.chi));
  const saoTuDangVien = {
    isDangVien,
    bonusScore: isDangVien ? Math.round((dangVienCfg?.bonus || 8) * 0.5) : 0,
    note: isDangVien ? dangVienCfg!.meaning : 'Không phạm/đắc Đăng Viên'
  };

  const trucNgay = getTrucByMonthAndDay(lunar.month, dayCC.chi);
  const tietKhiInfo = getTietKhiInfo(targetDate);
  const thanSatEval = evaluateThanSat(lunar.month, dayCC.can, dayCC.chi, dayCC.full, doc.canNam);

  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const bio = calculateBiorhythms(birthDate, targetDate);

  const { gioTimeline, gioRanks, hoangDaoHours } = buildGioTimelineAndRanks(
    dayCC.chi,
    dayCC.can,
    napAmDoc,
    targetDate
  );

  const tasks = evaluateInfectiousTasks(
    dayCC.full,
    saoTu,
    trucNgay,
    thanSatEval.list,
    doc.gender,
    bio
  );

  // ── TÍNH ĐIỂM PHẦN 1: 60% CON NGƯỜI, MÔI TRƯỜNG & ĐỜI SỐNG (MAX 60đ) ──
  const breakdown: ScoreBreakdownFactor[] = [];
  let humanRaw = 34; // Baseline trung tính

  // 1. Nạp Âm Bản Mệnh
  humanRaw += Math.round(napAmRelation.score * 0.7);
  breakdown.push({
    id: 'nap_am',
    pillar: 'human_env',
    label: `Nạp Âm (${napAmDay.name})`,
    delta: Math.round(napAmRelation.score * 0.7),
    tone: napAmRelation.score > 2 ? 'pos' : napAmRelation.score < 0 ? 'neg' : 'neutral',
    detail: napAmRelation.text
  });

  // 2. Địa Chi & Thiên Can & Quý Nhân
  const canChiDelta = diaChiRelations.totalScore + quyNhanLoc.totalScore + canScore;
  humanRaw += canChiDelta;
  if (canChiDelta !== 0) {
    const parts: string[] = [];
    if (diaChiRelations.tamHop.isMatch) parts.push(diaChiRelations.tamHop.text);
    if (diaChiRelations.lucHop.isMatch) parts.push(diaChiRelations.lucHop.text);
    if (diaChiRelations.lucXung.isMatch) parts.push(diaChiRelations.lucXung.text);
    if (quyNhanLoc.thienAt.isMatch) parts.push('Thiên Ất Quý Nhân');
    if (quyNhanLoc.locThan.isMatch) parts.push('Lộc Thần');
    if (canHop) parts.push('Thiên Can Hợp Hóa');
    if (canXung) parts.push('Thiên Can Xung Khắc');
    breakdown.push({
      id: 'can_chi',
      pillar: 'human_env',
      label: parts[0] || `Can Chi (${dayCC.full})`,
      delta: canChiDelta,
      tone: canChiDelta > 0 ? 'pos' : 'neg',
      detail: parts.join(' • ')
    });
  }

  // 3. Nhịp Sinh Học (Con người)
  const bioLifeDelta = bio.totalBioScore;
  humanRaw += bioLifeDelta;
  breakdown.push({
    id: 'bio_life',
    pillar: 'human_env',
    label: `Nhịp Sinh Học (${bio.avgScore >= 0 ? '+' : ''}${bio.avgScore}%)`,
    delta: bioLifeDelta,
    tone: bioLifeDelta > 1 ? 'pos' : bioLifeDelta < -1 ? 'neg' : 'neutral',
    detail: `Thể chất ${bio.physical}% • Cảm xúc ${bio.emotional}% • Trí tuệ ${bio.intellectual}%`
  });

  // 4. Khí hậu 24 Tiết Khí & Tứ Ly/Tứ Tuyệt (Môi trường)
  const envDelta = Math.round(tietKhiInfo.tietKhi.score * 0.6) + (tietKhiInfo.tuLyTuTuyet?.score || 0);
  humanRaw += envDelta;
  breakdown.push({
    id: 'climate_env',
    pillar: 'human_env',
    label: `Tiết ${tietKhiInfo.tietKhi.name}${tietKhiInfo.tuLyTuTuyet ? ` (${tietKhiInfo.tuLyTuTuyet.type})` : ''}`,
    delta: envDelta,
    tone: envDelta >= 3 ? 'pos' : envDelta < 0 ? 'neg' : 'neutral',
    detail: tietKhiInfo.tuLyTuTuyet ? tietKhiInfo.tuLyTuTuyet.desc : tietKhiInfo.tietKhi.climateDesc
  });

  // 5. Trực Ngày & Sao Tú (60% ảnh hưởng đời sống)
  const trucLifeDelta = Math.round(trucNgay.score * 0.45);
  const saoLifeDelta = Math.round(saoTu.score * 0.35) + saoTuDangVien.bonusScore;
  humanRaw += trucLifeDelta + saoLifeDelta + thanSatEval.lifeDelta;
  breakdown.push({
    id: 'truc_sao_life',
    pillar: 'human_env',
    label: `Trực ${trucNgay.name} • Sao ${saoTu.name}`,
    delta: trucLifeDelta + saoLifeDelta + thanSatEval.lifeDelta,
    tone: trucLifeDelta + saoLifeDelta >= 0 ? 'pos' : 'neg',
    detail: `${trucNgay.lifeHint} ${saoTu.desc}`
  });

  const humanScore = clamp(Math.round(humanRaw), 8, 60);
  const humanPct = Math.round((humanScore / 60) * 100);

  // ── TÍNH ĐIỂM PHẦN 2: 40% BÁC SĨ TRUYỀN NHIỄM (MAX 40đ) ──────────────
  const taskArr = Object.values(tasks);
  const avgTaskScore = taskArr.reduce((acc, t) => acc + t.totalScore, 0) / Math.max(1, taskArr.length);
  // Map avgTaskScore (~30..92) -> baseline ~16..34
  let clinicalRaw = Math.round(((avgTaskScore - 20) / 75) * 20) + 14;
  clinicalRaw += thanSatEval.clinicalDelta;
  const bioClinicalDelta = Math.round(((bio.intellectual + bio.intuitive) / 200) * 4);
  clinicalRaw += bioClinicalDelta;

  const clinicalScore = clamp(Math.round(clinicalRaw), 6, 40);
  const clinicalPct = Math.round((clinicalScore / 40) * 100);

  breakdown.push({
    id: 'id_tasks',
    pillar: 'clinical_id',
    label: `5 Tác Vụ Truyền Nhiễm (${Math.round(avgTaskScore)}đ TB)`,
    delta: clinicalScore - 24,
    tone: clinicalScore >= 28 ? 'pos' : clinicalScore < 20 ? 'neg' : 'neutral',
    detail: `FUO ${tasks.bien_luan_fuo.totalScore}đ • AMS ${tasks.toi_uu_khang_sinh.totalScore}đ • Source Control ${tasks.kiem_soat_o_nhiem.totalScore}đ`
  });

  if (thanSatEval.clinicalDelta !== 0) {
    const posNames = thanSatEval.list.filter((t) => t.type === 'pos').map((t) => t.name);
    const negNames = thanSatEval.list.filter((t) => t.type === 'neg').map((t) => t.name);
    breakdown.push({
      id: 'id_thansat',
      pillar: 'clinical_id',
      label: thanSatEval.clinicalDelta > 0 ? `Cát Tinh Y Khoa (${posNames.join(', ')})` : `Cảnh Báo Y Khoa (${negNames.join(', ')})`,
      delta: thanSatEval.clinicalDelta,
      tone: thanSatEval.clinicalDelta > 0 ? 'pos' : 'neg',
      detail:
        thanSatEval.list.find((t) => t.scope === 'clinical' || t.scope === 'both')?.desc ||
        'Yếu tố thời khắc lâm sàng.'
    });
  }

  // ── TỔNG ĐIỂM 0–100 ──────────────────────────────────────────────────────
  const total = clamp(humanScore + clinicalScore, 0, 100);

  let rating = 'Bình Hòa';
  let icon = '🌤️';
  let badgeClass = 'score-avg';
  if (total >= 82) {
    rating = 'Đại Cát — Rất Thuận Lợi';
    icon = '🌟';
    badgeClass = 'score-high';
  } else if (total >= 70) {
    rating = 'Cát Lợi — Khả Quan';
    icon = '✨';
    badgeClass = 'score-good';
  } else if (total >= 55) {
    rating = 'Bình Hòa — Ổn Định';
    icon = '🌤️';
    badgeClass = 'score-avg';
  } else {
    rating = 'Cẩn Trọng — Ưu Tiên An Toàn';
    icon = '🛡️';
    badgeClass = 'score-low';
  }

  const directions = getDirectionsGuide(dayCC.can, dayCC.chi);

  const doList: string[] = [];
  const avoidList: string[] = [];
  if (trucNgay.type === 'cat') doList.push(`Trực ${trucNgay.name}: ${trucNgay.lifeHint}`);
  else avoidList.push(`Trực ${trucNgay.name}: ${trucNgay.lifeHint}`);

  if (saoTu.type === 'cat') doList.push(`Sao ${saoTu.name}: ${saoTu.desc}`);
  else avoidList.push(`Sao ${saoTu.name}: ${saoTu.desc}`);

  doList.push(`Xuất hành hướng ${directions.hyThan} (Hỷ Thần) hoặc ${directions.taiThan} (Tài Thần).`);
  avoidList.push(`Hạn chế đi xa khởi sự hướng ${directions.hacThan} (Hắc Thần).`);
  if (bio.isCriticalPhysical || bio.isCriticalEmotional) {
    avoidList.push('Ngày giao pha sinh học: tránh thức khuya hoặc quyết định cảm tính.');
  } else {
    doList.push(tietKhiInfo.tietKhi.healthTip);
  }

  const humanEnv: HumanEnvironmentEval = {
    score: humanScore,
    maxScore: 60,
    percent: humanPct,
    rating: humanPct >= 75 ? 'Vượng Khí' : humanPct >= 58 ? 'Hài Hòa' : 'Cần Dưỡng Sức',
    climate: {
      tietKhi: tietKhiInfo.tietKhi,
      tuLyTuTuyet: tietKhiInfo.tuLyTuTuyet,
      ecoNote: `${tietKhiInfo.tietKhi.envImpact} ${tietKhiInfo.tietKhi.healthTip}`
    },
    directions,
    pillars: {
      bodyAndSpace: {
        status: bio.physical >= 15 && !bio.isCriticalPhysical ? 'good' : bio.physical <= -25 ? 'caution' : 'neutral',
        title: 'Thể Chất & Không Gian Sống',
        text: `${bio.lifeTips[0] || ''} ${tietKhiInfo.tietKhi.healthTip}`
      },
      relationships: {
        status: diaChiRelations.totalScore >= 0 && !canXung ? 'good' : 'caution',
        title: 'Gia Đạo, Giao Tiếp & Đồng Nghiệp',
        text:
          diaChiRelations.totalScore > 0 || canHop
            ? 'Nhân duyên hòa hợp, thuận lợi trò chuyện sâu với người thân và tạo đồng thuận nhóm.'
            : canXung || diaChiRelations.lucXung.isMatch
              ? 'Có xung nhẹ về giao tiếp: lắng nghe trọn vẹn trước khi phản hồi để giữ hòa khí.'
              : 'Mối quan hệ êm ả, phù hợp chia sẻ hỏi thăm gia đình và giữ kết nối tích cực.'
      },
      lifeAndFinance: {
        status: quyNhanLoc.totalScore > 0 || saoTu.score >= 10 ? 'good' : saoTu.score <= -10 ? 'caution' : 'neutral',
        title: 'Đời Sống, Di Chuyển & Tài Chính',
        text: `${directions.travelTip} ${
          saoTu.score >= 10
            ? 'Thuận lợi lập kế hoạch tài chính, học kỹ năng mới và sắp xếp việc nhà.'
            : 'Chi tiêu theo kế hoạch, tránh mua sắm bốc đồng.'
        }`
      }
    },
    doList,
    avoidList
  };

  const clinicalID: InfectiousClinicalEval = {
    score: clinicalScore,
    maxScore: 40,
    percent: clinicalPct,
    rating: clinicalPct >= 75 ? 'Sáng Suốt Lâm Sàng' : clinicalPct >= 58 ? 'Ổn Định Ca Trực' : 'Tăng Cường Checklist',
    tasks,
    pillars: {
      fuoAndSepsis: {
        status: tasks.bien_luan_fuo.totalScore >= 72 ? 'good' : tasks.bien_luan_fuo.totalScore < 50 ? 'caution' : 'neutral',
        title: 'Biện Luận Sốt CRNN (FUO) & Sepsis',
        text: tasks.bien_luan_fuo.advice
      },
      amsStewardship: {
        status: tasks.toi_uu_khang_sinh.totalScore >= 72 ? 'good' : tasks.toi_uu_khang_sinh.totalScore < 50 ? 'caution' : 'neutral',
        title: 'Quản Lý Kháng Sinh (AMS & PK/PD)',
        text: tasks.toi_uu_khang_sinh.advice
      },
      sourceControl: {
        status: tasks.kiem_soat_o_nhiem.totalScore >= 72 ? 'good' : tasks.kiem_soat_o_nhiem.totalScore < 50 ? 'caution' : 'neutral',
        title: 'Kiểm Soát Ổ Nhiễm & Thủ Thuật',
        text: tasks.kiem_soat_o_nhiem.advice
      },
      ipcAndEbm: {
        status: tasks.hoi_chan_dich_te.totalScore >= 72 ? 'good' : tasks.hoi_chan_dich_te.totalScore < 50 ? 'caution' : 'neutral',
        title: 'Cảnh Giác Dịch Tễ, IPC & EBM',
        text: tasks.hoi_chan_dich_te.advice
      }
    },
    idShiftFocus:
      clinicalPct >= 75
        ? 'Trọng tâm Truyền Nhiễm: Thuận lợi giải mã ca FUO khó, hội chẩn đa chuyên khoa và tối ưu phổ kháng sinh.'
        : clinicalPct >= 58
          ? 'Trọng tâm Truyền Nhiễm: Bám sát thời gian vàng cấy máu - liều nạp Sepsis và rà soát eGFR.'
          : 'Trọng tâm Truyền Nhiễm: Bật cảnh giác kép với thủ thuật xâm lấn (LP/dẫn lưu), kiểm tra DDI và vệ sinh tay vô khuẩn.'
  };

  const summaryText = `Ngày ${dayCC.full} (${lunar.day}/${lunar.month} Âm): Đời sống & Môi trường ${humanScore}/60đ • Truyền Nhiễm ${clinicalScore}/40đ — Tổng ${total}/100đ (${rating}).`;

  return {
    total,
    rawTotal: humanRaw + clinicalRaw,
    rating,
    icon,
    badgeClass,
    summaryText,
    dateObj: targetDate,
    dateKey: formatDateKey(targetDate),
    formattedDate: formatDateVN(targetDate),
    lunar,
    lunarDay: lunar.day,
    lunarMonth: lunar.month,
    canChiYear: yearCC.full,
    canChiMonth: monthCC.full,
    canChiDay: dayCC.full,
    canNgay: dayCC.can,
    chiNgay: dayCC.chi,
    hanhNgay,
    docProfile: doc,
    b1: { level: humanPct >= 70 ? 1 : 2, text: napAmRelation.text, score: napAmRelation.score },
    canChiNgayScore: { level: canChiDelta >= 0 ? 1 : 2, text: `${dayCC.full} (${napAmDay.name})`, score: canChiDelta },
    diaChiRelations,
    quyNhanLoc,
    b3: { point: Math.round(avgTaskScore), detail: taskArr.map((t) => `${t.task.shortTitle}: ${t.totalScore}đ`) },
    b4: {
      errors: thanSatEval.list.filter((t) => t.type === 'neg').map((t) => t.name),
      bonuses: thanSatEval.list.filter((t) => t.type === 'pos').map((t) => t.name),
      penalty: thanSatEval.list.filter((t) => t.type === 'neg').reduce((s, t) => s + t.score, 0),
      bonusPoint: thanSatEval.list.filter((t) => t.type === 'pos').reduce((s, t) => s + t.score, 0)
    },
    saoTu,
    saoTuDangVien,
    trucNgay,
    tietKhiInfo,
    thanSat: { list: thanSatEval.list, score: thanSatEval.score },
    bio,
    napAmDay,
    napAmDoc,
    napAmRelation,
    humanEnv,
    clinicalID,
    breakdown,
    hoangDaoHours,
    gioTimeline,
    gioRanks
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 8. DỰ BÁO 7 NGÀY, LỊCH THÁNG 30 NGÀY & BỘ TÌM NGÀY ĐẸP (6 MỤC ĐÍCH)
// ═══════════════════════════════════════════════════════════════════════════

export function getWeekEvaluation(
  startDate: Date = new Date(),
  customDoc?: DoctorProfile
): WeekDaySummary[] {
  const doc = customDoc ? enrichProfile(customDoc) : getDoctorProfile();
  const todayKey = formatDateKey(new Date());
  const list: WeekDaySummary[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const ev = evaluateDayScore(d, doc);
    list.push({
      date: d,
      dateKey: ev.dateKey,
      dayOfWeek: formatDayOfWeekVN(d),
      dateFormatted: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
      lunarFormatted: `${ev.lunarDay}/${ev.lunarMonth}${ev.lunar.isLeap ? 'N' : ''}`,
      canChi: ev.canChiDay,
      saoTu: ev.saoTu.name,
      truc: ev.trucNgay.name,
      score: ev.total,
      humanScore: ev.humanEnv.score,
      clinicalScore: ev.clinicalID.score,
      rating: ev.rating,
      badgeClass: ev.badgeClass,
      icon: ev.icon,
      isToday: ev.dateKey === todayKey,
      isBestDay: false,
      evalData: ev
    });
  }

  let bestIdx = 0;
  list.forEach((item, i) => {
    if (item.score > (list[bestIdx]?.score ?? -1)) bestIdx = i;
  });
  if (list[bestIdx]) list[bestIdx]!.isBestDay = true;
  return list;
}

export function getMonthEvaluation(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1,
  customDoc?: DoctorProfile
): DayScoreEvaluation[] {
  const doc = customDoc ? enrichProfile(customDoc) : getDoctorProfile();
  const daysInMonth = new Date(year, month, 0).getDate();
  const results: DayScoreEvaluation[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    results.push(evaluateDayScore(new Date(year, month - 1, d), doc));
  }
  return results;
}

const PURPOSE_LABELS: Record<FinderPurpose, string> = {
  life_balance: 'Đời Sống, Gia Đạo & Nghỉ Dưỡng (60%)',
  travel_meeting: 'Xuất Hành, Ký Kết & Gặp Gỡ (60%)',
  fuo_diagnosis: 'Biện Luận Sốt CRNN (FUO) & Ca Khó (40%)',
  ams_therapy: 'Khởi & Tối Ưu Kháng Sinh AMS/PK-PD (40%)',
  source_control: 'Kiểm Soát Ổ Nhiễm & Thủ Thuật LP (40%)',
  ebm_rounds: 'Hội Chẩn Liên Khoa & Báo Cáo EBM (40%)'
};

export function findBestClinicalDays(
  purpose: FinderPurpose = 'life_balance',
  daysAhead = 30,
  customDoc?: DoctorProfile
): BestClinicalDayResult[] {
  const doc = customDoc ? enrichProfile(customDoc) : getDoctorProfile();
  const today = new Date();
  const candidates: BestClinicalDayResult[] = [];

  for (let i = 0; i < daysAhead; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const ev = evaluateDayScore(d, doc);
    let score = ev.total;
    const reasons: string[] = [];

    if (purpose === 'life_balance') {
      score = Math.round(ev.humanEnv.percent * 0.75 + ev.total * 0.25);
      reasons.push(`Con người & Đời sống ${ev.humanEnv.score}/60đ`);
      if (ev.napAmRelation.score >= 6) reasons.push('Nạp Âm tương trợ bản mệnh');
      if (ev.bio.emotional >= 25) reasons.push(`Cảm xúc +${ev.bio.emotional}%`);
    } else if (purpose === 'travel_meeting') {
      const hasThienAt = ev.quyNhanLoc.thienAt.isMatch;
      score = Math.round(ev.humanEnv.percent * 0.65 + (hasThienAt ? 14 : 0) + ev.saoTu.score * 0.8 + ev.total * 0.2);
      reasons.push(`Hỷ Thần: ${ev.humanEnv.directions.hyThan} • Tài Thần: ${ev.humanEnv.directions.taiThan}`);
      if (hasThienAt) reasons.push('Có Thiên Ất Quý Nhân trợ lực');
      if (['Khai', 'Thành', 'Định', 'Kiến'].includes(ev.trucNgay.name)) reasons.push(`Trực ${ev.trucNgay.name} vượng xuất hành`);
    } else if (purpose === 'fuo_diagnosis') {
      const task = ev.clinicalID.tasks.bien_luan_fuo;
      score = Math.round(task.totalScore * 0.7 + ev.total * 0.3);
      reasons.push(`Điểm biện luận FUO: ${task.totalScore}đ`);
      reasons.push(task.trucNote);
      if (ev.bio.intellectual >= 20) reasons.push(`Trí tuệ +${ev.bio.intellectual}%`);
    } else if (purpose === 'ams_therapy') {
      const task = ev.clinicalID.tasks.toi_uu_khang_sinh;
      score = Math.round(task.totalScore * 0.7 + ev.total * 0.3);
      reasons.push(`Điểm tối ưu AMS: ${task.totalScore}đ`);
      reasons.push(task.thanSatNote);
    } else if (purpose === 'source_control') {
      const task = ev.clinicalID.tasks.kiem_soat_o_nhiem;
      score = Math.round(task.totalScore * 0.75 + ev.total * 0.25);
      reasons.push(`Điểm Source Control / LP: ${task.totalScore}đ`);
      if (ev.b4.errors.length === 0) reasons.push('Không phạm Đao Chiêm Sát / Sát Chủ');
    } else if (purpose === 'ebm_rounds') {
      const task = ev.clinicalID.tasks.hoi_chan_dich_te;
      score = Math.round(task.totalScore * 0.65 + ev.clinicalID.percent * 0.35);
      reasons.push(`Hội chẩn & EBM: ${task.totalScore}đ`);
      reasons.push(`Sao ${ev.saoTu.name} • Trực ${ev.trucNgay.name}`);
    }

    candidates.push({
      rank: 0,
      purpose,
      purposeName: PURPOSE_LABELS[purpose],
      evalData: ev,
      matchReasons: reasons.slice(0, 3),
      score: clamp(score, 10, 99)
    });
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, 5).map((item, idx) => ({ ...item, rank: idx + 1 }));
}

// ═══════════════════════════════════════════════════════════════════════════
// 9. NĂNG LƯỢNG CA TRỰC & NHỊP SINH HỌC CIRCADIAN (SINGLE SOURCE OF TRUTH)
// ═══════════════════════════════════════════════════════════════════════════

export function calculateShiftEnergy(dateObj: Date = new Date()): ShiftEnergyData {
  const h = dateObj.getHours();
  const m = dateObj.getMinutes();
  const totalMin = h * 60 + m;

  let shiftName = 'Ca Hành Chính Sáng';
  let endMin = 17 * 60;
  let circadianPhase = 'Đỉnh Tỉnh Táo Sinh Học';
  let peakHours = '08:30 – 11:30 & 14:30 – 16:30';
  let energyPercent = 85;
  let fatigueWarning: string | null = null;
  let caffeineTip = 'Có thể dùng 1 ly cà phê/trà nhẹ trước 14h00 để không ảnh hưởng giấc ngủ đêm.';
  let safetyChecklist: string[] = [];

  if (h >= 7 && h < 12) {
    shiftName = 'Ca Sáng • Giao Ban & Đi Buồng';
    endMin = 12 * 60;
    energyPercent = h < 9 ? 84 : 92;
    circadianPhase = 'Cortisol & Tỉnh Táo Đạt Đỉnh';
    caffeineTip = 'Uống 250ml nước lọc khi thức dậy; cà phê phù hợp nhất từ 09:00–10:30.';
    safetyChecklist = [
      'Rà soát kết quả cấy máu/vi sinh sáng & dấu hiệu nặng Sốt xuất huyết/Sepsis.',
      'Chỉnh liều kháng sinh theo eGFR mới và đánh giá xuống thang IV-to-PO.'
    ];
  } else if (h >= 12 && h < 17) {
    shiftName = 'Ca Chiều • Hội Chẩn & Thủ Thuật';
    endMin = 17 * 60;
    const postLunchDip = h === 13 || (h === 14 && m < 30);
    energyPercent = postLunchDip ? 68 : 82;
    circadianPhase = postLunchDip ? 'Trũng Sinh Học Sau Trưa (Post-Lunch Dip)' : 'Phục Hồi Tập Trung Chiều';
    fatigueWarning = postLunchDip
      ? 'Độ tỉnh táo giảm nhẹ 13:00–14:30: kiểm tra kỹ đơn vị liều thuốc và chống chỉ định thủ thuật.'
      : null;
    caffeineTip = h >= 15 ? 'Hạn chế caffeine sau 15:00 để bảo vệ giấc ngủ sâu tối nay.' : 'Uống đủ nước, nghỉ mắt 5 phút sau mỗi 50 phút đọc hồ sơ.';
    safetyChecklist = [
      'Hoàn tất thủ thuật Source Control / chọc dò tủy sống trong khung giờ ánh sáng tốt.',
      'Chốt danh sách bệnh nhân đủ điều kiện xuất viện hoặc OPAT.'
    ];
  } else if (h >= 17 && h < 22) {
    shiftName = 'Ca Trực Tối • Bàn Giao & Theo Dõi';
    endMin = 22 * 60;
    energyPercent = h < 20 ? 74 : 64;
    circadianPhase = 'Chuyển Pha Melatonin Chiều Tối';
    caffeineTip = 'Tránh caffeine buổi tối; ưu tiên nước ấm hoặc trái cây nhẹ để giữ tỉnh táo dịu.';
    safetyChecklist = [
      'Rà soát y lệnh kháng sinh cữ đêm và các ca nguy cơ sốc nhiễm khuẩn.',
      'Ghi chú ngắn gọn diễn biến sốt - mạch - huyết áp vào bảng bàn giao SBAR.'
    ];
  } else {
    shiftName = 'Ca Trực Đêm Khuya';
    endMin = h >= 22 ? 31 * 60 : 7 * 60; // đến 07:00 sáng hôm sau
    const currentAdjusted = h >= 22 ? totalMin : totalMin + 24 * 60;
    const remMinRaw = Math.max(0, endMin - currentAdjusted);
    const remH = Math.floor(remMinRaw / 60);
    const remM = remMinRaw % 60;
    const isWindowOfDeath = h >= 2 && h <= 5;
    energyPercent = isWindowOfDeath ? 44 : 56;
    circadianPhase = isWindowOfDeath ? 'Đáy Sinh Học Đêm (02:00 – 05:00)' : 'Pha Duy Trì Đêm';
    fatigueWarning = isWindowOfDeath
      ? 'Khung 02:00–05:00 dễ nhầm số thập phân liều thuốc: bắt buộc kiểm tra kép (Double-check) trước khi ký y lệnh.'
      : 'Giữ nhịp hít thở sâu và tranh thủ chợp mắt luân phiên 20 phút nếu phòng bệnh ổn định.';
    caffeineTip = 'Không dùng caffeine nếu sắp tan ca lúc 07:00 để ngủ bù hiệu quả.';
    safetyChecklist = [
      'Double-check liều Vancomycin / Aminoglycoside / Meropenem và tốc độ truyền.',
      'Theo dõi sát SpO2, lactat, nước tiểu ở bệnh nhân Sepsis nặng.'
    ];

    const statusClassNight: ShiftEnergyData['statusClass'] =
      energyPercent >= 75 ? 'high' : energyPercent >= 55 ? 'med' : 'low';
    return {
      shiftName,
      shiftRemainingText: `Còn ${remH}h ${remM}p`,
      energyPercent,
      statusText: isWindowOfDeath ? 'Cảnh Giác Đáy Đêm' : 'Duy Trì Tỉnh Táo',
      statusClass: statusClassNight,
      icon: '🌙',
      circadianPhase,
      peakHours,
      fatigueWarning,
      caffeineTip,
      safetyChecklist
    };
  }

  const rem = Math.max(0, endMin - totalMin);
  const remH = Math.floor(rem / 60);
  const remM = rem % 60;
  const statusClass: ShiftEnergyData['statusClass'] =
    energyPercent >= 75 ? 'high' : energyPercent >= 55 ? 'med' : 'low';

  return {
    shiftName,
    shiftRemainingText: `Còn ${remH}h ${remM}p`,
    energyPercent,
    statusText: energyPercent >= 75 ? 'Sung Sức' : energyPercent >= 55 ? 'Ổn Định' : 'Cần Nghỉ Ngơi',
    statusClass,
    icon: energyPercent >= 75 ? '⚡' : energyPercent >= 55 ? '🔋' : '🛌',
    circadianPhase,
    peakHours,
    fatigueWarning,
    caffeineTip,
    safetyChecklist
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 10. XUẤT LỊCH .ICS & TÓM TẮT SBAR / ĐỜI SỐNG
// ═══════════════════════════════════════════════════════════════════════════

export function copyDaySummaryText(evalData: DayScoreEvaluation): string {
  const bestHours = evalData.gioRanks
    .filter((g) => g.rank <= 3)
    .slice(0, 3)
    .map((g) => `${g.chi} (${g.timeRange})`)
    .join(', ');

  return [
    `📅 BÁO CÁO NHỊP SINH HỌC & LÂM SÀNG TRUYỀN NHIỄM — ${evalData.formattedDate}`,
    `• Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth}${evalData.lunar.isLeap ? ' (Nhuận)' : ''} (${evalData.canChiDay}) • Tiết ${evalData.tietKhiInfo.tietKhi.name}`,
    `• Bác sĩ: ${evalData.docProfile.name} (${evalData.docProfile.canNam} ${evalData.docProfile.chiNam} — ${evalData.docProfile.napAmName})`,
    `• TỔNG ĐIỂM: ${evalData.total}/100 (${evalData.rating})`,
    `  ├─ Con người, Môi trường & Đời sống (60%): ${evalData.humanEnv.score}/60đ`,
    `  └─ Chuyên môn Truyền Nhiễm (40%): ${evalData.clinicalID.score}/40đ`,
    `• Hướng cát: Hỷ Thần ${evalData.humanEnv.directions.hyThan} | Tài Thần ${evalData.humanEnv.directions.taiThan} (Tránh ${evalData.humanEnv.directions.hacThan})`,
    `• Giờ tốt ưu tiên: ${bestHours || evalData.hoangDaoHours.slice(0, 3).join(', ')}`,
    `• Tác vụ Truyền Nhiễm nổi bật: FUO ${evalData.clinicalID.tasks.bien_luan_fuo.totalScore}đ | AMS ${evalData.clinicalID.tasks.toi_uu_khang_sinh.totalScore}đ | Source Control ${evalData.clinicalID.tasks.kiem_soat_o_nhiem.totalScore}đ`,
    `• Trọng tâm: ${evalData.clinicalID.idShiftFocus}`
  ].join('\n');
}

export function generateICSContent(evalData: DayScoreEvaluation): string {
  const y = evalData.dateObj.getFullYear();
  const m = String(evalData.dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(evalData.dateObj.getDate()).padStart(2, '0');
  const dt = `${y}${m}${d}`;
  const desc = copyDaySummaryText(evalData).replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CliniPortal//Chronobiology ID v3.0//VI',
    'BEGIN:VEVENT',
    `UID:cliniportal-${dt}@cliniportal.local`,
    `DTSTART;VALUE=DATE:${dt}`,
    `DTEND;VALUE=DATE:${dt}`,
    `SUMMARY:CliniPortal ${evalData.total}/100 — ${evalData.canChiDay} (Âm ${evalData.lunarDay}/${evalData.lunarMonth})`,
    `DESCRIPTION:${desc}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadICSFile(evalData: DayScoreEvaluation): void {
  const content = generateICSContent(evalData);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cliniportal-nhip-ngay-${evalData.dateKey}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
