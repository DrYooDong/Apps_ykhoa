/**
 * CliniPortal 2.0 — Good Day & Clinical Astrological Intelligence Calculator (TypeScript Version)
 * Path: src/tools/good-day-calculator.ts
 * Tính toán Chỉ số Ngày Tốt, Tử vi Bát tự, 12 Trực, 24 Tiết Khí, Thần Sát & Nhịp sinh học (Biorhythms) Bác sĩ.
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

export interface BiorhythmResult {
  daysLived: number;
  physical: number;
  emotional: number;
  intellectual: number;
  avgScore: number;
  physBonus: number;
  intBonus: number;
  emoBonus: number;
  totalBioScore: number;
  clinicalTips: string[];
}

export interface DayScoreEvaluation {
  total: number;
  rawTotal: number;
  rating: string;
  icon: string;
  badgeClass: string;
  summaryText: string;
  dateObj: Date;
  lunarDay: number;
  lunarMonth: number;
  canChiDay: string;
  canNgay: string;
  chiNgay: string;
  hanhNgay: string;
  docProfile: DoctorProfile;
  b1: { level: number; text: string; score: number };
  canChiNgayScore: { level: number; text: string; score: number };
  lucXung: { isXung: boolean; text: string; score: number };
  b3: { point: number; detail: string[] };
  b4: { errors: string[]; bonuses: string[]; penalty: number; bonusPoint: number };
  trucNgay: TrucItem;
  tietKhiInfo: {
    tietKhi: TietKhiItem;
    tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null;
  };
  thanSat: { list: ThanSatItem[]; score: number };
  bio: BiorhythmResult;
  hoangDaoHours: string[];
}

// ─── HẰNG SỐ & DỮ LIỆU CƠ BẢN ──────────────────────────────────────────

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"] as const;

export const NGU_HANH_CAN: Record<string, 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'> = {
  "Giáp": "Mộc", "Ất": "Mộc",
  "Bính": "Hỏa", "Đinh": "Hỏa",
  "Mậu": "Thổ", "Kỷ": "Thổ",
  "Canh": "Kim", "Tân": "Kim",
  "Nhâm": "Thủy", "Quý": "Thủy"
};

export const NGU_HANH_CHI: Record<string, 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ'> = {
  "Tý": "Thủy", "Hợi": "Thủy",
  "Dần": "Mộc", "Mão": "Mộc",
  "Tỵ": "Hỏa", "Ngọ": "Hỏa",
  "Thân": "Kim", "Dậu": "Kim",
  "Thìn": "Thổ", "Tuất": "Thổ", "Sửu": "Thổ", "Mùi": "Thổ"
};

export const HANH_SINH_KHAC = {
  sinh: { "Kim": "Thủy", "Thủy": "Mộc", "Mộc": "Hỏa", "Hỏa": "Thổ", "Thổ": "Kim" } as Record<string, string>,
  khac: { "Kim": "Mộc", "Mộc": "Thổ", "Thổ": "Thủy", "Thủy": "Hỏa", "Hỏa": "Kim" } as Record<string, string>
};

export const GIO_TIME: Record<string, string> = {
  "Tý": "23h-01h", "Sửu": "01h-03h", "Dần": "03h-05h", "Mão": "05h-07h",
  "Thìn": "07h-09h", "Tỵ": "09h-11h", "Ngọ": "11h-13h", "Mùi": "13h-15h",
  "Thân": "15h-17h", "Dậu": "17h-19h", "Tuất": "19h-21h", "Hợi": "21h-23h"
};

export const HOANG_DAO_MAP: Record<string, string[]> = {
  "Tý": ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"],
  "Ngọ": ["Tý", "Sửu", "Mão", "Ngọ", "Thân", "Dậu"],
  "Sửu": ["Dần", "Mão", "Tỵ", "Thân", "Tuất", "Hợi"],
  "Mùi": ["Dần", "Mão", "Tỵ", "Thân", "Tuất", "Hợi"],
  "Dần": ["Tý", "Sửu", "Thìn", "Tỵ", "Mùi", "Tuất"],
  "Thân": ["Tý", "Sửu", "Thìn", "Tỵ", "Mùi", "Tuất"],
  "Mão": ["Dần", "Mão", "Ngọ", "Mùi", "Dậu", "Tý"],
  "Dậu": ["Dần", "Mão", "Ngọ", "Mùi", "Dậu", "Tý"],
  "Thìn": ["Dần", "Thìn", "Tỵ", "Thân", "Dậu", "Hợi"],
  "Tuất": ["Dần", "Thìn", "Tỵ", "Thân", "Dậu", "Hợi"],
  "Tỵ": ["Sửu", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"],
  "Hợi": ["Sửu", "Thìn", "Ngọ", "Mùi", "Tuất", "Hợi"]
};

// 12 TRỰC NGÀY
export const TRUC_LIST: TrucItem[] = [
  { name: "Kiến", type: "cat", rating: "Đại Cát", score: 12, desc: "Khởi tạo, đại cát cho mổ xẻ, ký kết hợp đồng, mở phòng khám." },
  { name: "Trừ", type: "cat", rating: "Cát", score: 10, desc: "Xóa bỏ cái cũ, giải độc, điều trị dứt điểm, tẩy uế phòng mổ." },
  { name: "Mãn", type: "cat", rating: "Đại Cát", score: 12, desc: "Tròn đầy, sung túc, thích hợp thu hoạch, hội chẩn hoàn tất." },
  { name: "Bình", type: "cat", rating: "Bình Hòa", score: 8, desc: "Bình ổn, cân bằng, thích hợp khám định kỳ, điều hòa y lệnh." },
  { name: "Định", type: "cat", rating: "Đại Cát", score: 15, desc: "An định, định vị chẩn đoán, phẫu thuật chương trình rất tốt." },
  { name: "Chấp", type: "neutral", rating: "Bình Hòa", score: 5, desc: "Nắm giữ, kiên trì phác đồ, thích hợp tái khám." },
  { name: "Phá", type: "hung", rating: "Đại Hung", score: -15, desc: "Nguyệt Phá xung đột, kiêng phẫu thuật lớn & thủ thuật nguy cơ." },
  { name: "Nguy", type: "hung", rating: "Hung", score: -8, desc: "Nguy hiểm, ẩn số cao, cẩn trọng khi ra y lệnh liều cao." },
  { name: "Thành", type: "cat", rating: "Đại Cát", score: 15, desc: "Thành công, vẹn toàn, thích hợp xuất viện, nghiệm thu dự án." },
  { name: "Thâu", type: "cat", rating: "Cát", score: 10, desc: "Thu hoạch kết quả, tổng kết bệnh án, nghiệm thu EBM." },
  { name: "Khai", type: "cat", rating: "Đại Cát", score: 15, desc: "Thông suốt, khai trương, áp dụng phác đồ/kỹ thuật mới." },
  { name: "Bế", type: "hung", rating: "Hung", score: -10, desc: "Bế tắc, kiêng khởi công, kiêng can thiệp xâm lấn mới." }
];

// 24 TIẾT KHÍ
export const TIET_KHI_LIST: TietKhiItem[] = [
  { m: 1, d: 6, name: "Tiểu Hàn", score: 2, icon: "❄️" },
  { m: 1, d: 20, name: "Đại Hàn", score: 2, icon: "🧊" },
  { m: 2, d: 4, name: "Lập Xuân", score: 6, icon: "🌱", special: "Tuet" },
  { m: 2, d: 19, name: "Vũ Thủy", score: 4, icon: "🌧️" },
  { m: 3, d: 6, name: "Kinh Trập", score: 4, icon: "⚡" },
  { m: 3, d: 21, name: "Xuân Phân", score: 8, icon: "☯️", special: "Ly" },
  { m: 4, d: 5, name: "Thanh Minh", score: 5, icon: "🍃" },
  { m: 4, d: 20, name: "Cốc Vũ", score: 4, icon: "🌾" },
  { m: 5, d: 5, name: "Lập Hạ", score: 6, icon: "☀️", special: "Tuet" },
  { m: 5, d: 21, name: "Tiểu Mãn", score: 4, icon: "🌼" },
  { m: 6, d: 6, name: "Mang Chủng", score: 4, icon: "🌻" },
  { m: 6, d: 21, name: "Hạ Chí", score: 8, icon: "🔥", special: "Ly" },
  { m: 7, d: 7, name: "Thử Thử", score: 2, icon: "🌡️" },
  { m: 7, d: 23, name: "Đại Thử", score: 2, icon: "💥" },
  { m: 8, d: 7, name: "Lập Thu", score: 6, icon: "🍂", special: "Tuet" },
  { m: 8, d: 23, name: "Xử Thử", score: 4, icon: "🌤️" },
  { m: 9, d: 7, name: "Bạch Lộ", score: 4, icon: "🌫️" },
  { m: 9, d: 23, name: "Thu Phân", score: 8, icon: "☯️", special: "Ly" },
  { m: 10, d: 8, name: "Hàn Lộ", score: 4, icon: "💧" },
  { m: 10, d: 23, name: "Sương Giáng", score: 3, icon: "❄️" },
  { m: 11, d: 7, name: "Lập Đông", score: 6, icon: "☃️", special: "Tuet" },
  { m: 11, d: 22, name: "Tiểu Tuyết", score: 3, icon: "🌨️" },
  { m: 12, d: 7, name: "Đại Tuyết", score: 2, icon: "🏔️" },
  { m: 12, d: 21, name: "Đông Chí", score: 8, icon: "🌙", special: "Ly" }
];

export const THIEN_DUC_MAP: Record<number, string> = {
  1: "Đinh", 2: "Thân", 3: "Nhâm", 4: "Tân", 5: "Hợi", 6: "Giáp",
  7: "Quý", 8: "Dần", 9: "Bính", 10: "Ất", 11: "Tỵ", 12: "Canh"
};

export const NGUYET_DUC_MAP: Record<number, string> = {
  1: "Bính", 5: "Bính", 9: "Bính",
  2: "Giáp", 6: "Giáp", 10: "Giáp",
  3: "Nhâm", 7: "Nhâm", 11: "Nhâm",
  4: "Canh", 8: "Canh", 12: "Canh"
};

const PROFILE_KEY = 'cliniportal_doctor_full_profile';

// ─── TÍNH JULIAN DAY & CAN CHI ─────────────────────────────────────────

export function getJDN(day: number, month: number, year: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

export function getCanChiYear(year: number): { can: string; chi: string; full: string } {
  const canIdx = (year - 4) % 10;
  const chiIdx = (year - 4) % 12;
  const can = CAN[(canIdx + 10) % 10]!;
  const chi = CHI[(chiIdx + 12) % 12]!;
  return { can, chi, full: `${can} ${chi}` };
}

export function getCanChiDay(dateObj: Date): { can: string; chi: string; full: string; hanh: string; jdn: number } {
  const jdn = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
  const canIdx = (jdn + 9) % 10;
  const chiIdx = (jdn + 1) % 12;
  const can = CAN[canIdx]!;
  const chi = CHI[chiIdx]!;
  return {
    can,
    chi,
    full: `${can} ${chi}`,
    hanh: NGU_HANH_CAN[can] || 'Thổ',
    jdn
  };
}

export function getApproxLunarDate(dateObj: Date): { day: number; month: number } {
  const jdn = getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
  const refJDN = 2461089; // 2026-02-17 (Mùng 1/1 âm Bính Ngọ 2026)
  const diffDays = jdn - refJDN;
  const synodicMonth = 29.530588853;

  const cycle = diffDays / synodicMonth;
  const monthOffset = Math.floor(cycle);
  let dayInMonth = Math.floor((cycle - monthOffset) * synodicMonth) + 1;
  if (dayInMonth > 30) dayInMonth = 30;
  if (dayInMonth < 1) dayInMonth = 1;

  let lunarMonth = ((1 + monthOffset) % 12);
  if (lunarMonth <= 0) lunarMonth += 12;

  return { day: dayInMonth, month: lunarMonth };
}

// ─── TÍNH TRỰC & TIẾT KHÍ ──────────────────────────────────────────────

export function getTrucNgay(lunarMonth: number, chiNgay: string): TrucItem {
  const monthChiIdx = (lunarMonth + 1) % 12;
  const dayChiIdx = CHI.indexOf(chiNgay as any);
  const trucIdx = (dayChiIdx - monthChiIdx + 12) % 12;
  return TRUC_LIST[trucIdx] || TRUC_LIST[0]!;
}

export function getTietKhiInfo(dateObj: Date): {
  tietKhi: TietKhiItem;
  tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null;
} {
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();

  let closest = TIET_KHI_LIST[0]!;
  let minDiff = 999;

  for (const tk of TIET_KHI_LIST) {
    const monthDiff = Math.abs(tk.m - m);
    const dayDiff = Math.abs(tk.d - d);
    const diff = monthDiff * 30 + dayDiff;
    if (diff < minDiff) {
      minDiff = diff;
      closest = tk;
    }
  }

  let tuLyTuTuyet: { type: string; name: string; score: number; desc: string } | null = null;
  const tomorrow = new Date(dateObj.getTime() + 86400000);
  const tm = tomorrow.getMonth() + 1;
  const td = tomorrow.getDate();

  for (const tk of TIET_KHI_LIST) {
    if (tk.m === tm && tk.d === td) {
      if (tk.special === 'Ly') {
        tuLyTuTuyet = { type: 'Tứ Ly', name: `Tứ Ly (Trước ${tk.name})`, score: -12, desc: "Cực điểm chuyển giao Âm Dương, kiêng đại phẫu hoặc sự kiện lớn." };
      } else if (tk.special === 'Tuet') {
        tuLyTuTuyet = { type: 'Tứ Tuyệt', name: `Tứ Tuyệt (Trước ${tk.name})`, score: -8, desc: "Khí tiết cạn kiệt trước mốc Lập, thận trọng y lệnh phức tạp." };
      }
    }
  }

  return { tietKhi: closest, tuLyTuTuyet };
}

// ─── THẦN SÁT & BIORHYTHMS ────────────────────────────────────────────

export function kiemTraThanSat(lunarMonth: number, canNgay: string, chiNgay: string): { list: ThanSatItem[]; score: number } {
  const list: ThanSatItem[] = [];
  let score = 0;

  const thienDuc = THIEN_DUC_MAP[lunarMonth];
  if (thienDuc === canNgay || thienDuc === chiNgay) {
    list.push({ name: "Thiên Đức Giai Thần", type: "pos", score: 10, desc: "Thần cát hộ trì, giải trừ hung rủi, y khoa may mắn." });
    score += 10;
  }

  const nguyetDuc = NGUYET_DUC_MAP[lunarMonth];
  if (nguyetDuc === canNgay) {
    list.push({ name: "Nguyệt Đức Tinh", type: "pos", score: 8, desc: "Đón nhận cát khí, minh mẫn chẩn đoán." });
    score += 8;
  }

  const monthChiIdx = (lunarMonth + 1) % 12;
  const dayChiIdx = CHI.indexOf(chiNgay as any);
  if ((dayChiIdx - monthChiIdx + 12) % 12 === 6) {
    list.push({ name: "Nguyệt Phá Thần Sát", type: "neg", score: -15, desc: "Xung khắc bản tháng, kiêng ca phẫu thuật nguy cơ cao." });
    score -= 15;
  }

  const canIdx = CAN.indexOf(canNgay as any);
  const khongVong1 = CHI[(dayChiIdx - canIdx + 10 + 12) % 12];
  const khongVong2 = CHI[(dayChiIdx - canIdx + 11 + 12) % 12];
  if (chiNgay === khongVong1 || chiNgay === khongVong2) {
    list.push({ name: "Không Vong Nhật", type: "neg", score: -10, desc: "Lực cản bất ngờ, cần rà soát lại kết quả xét nghiệm." });
    score -= 10;
  }

  return { list, score };
}

export function calculateBiorhythms(birthDate: Date, targetDate: Date): BiorhythmResult {
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 100);
  const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 100);
  const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 100);
  const avg = Math.round((physical + emotional + intellectual) / 3);

  let physBonus = 0, intBonus = 0, emoBonus = 0;
  const clinicalTips: string[] = [];

  if (physical >= 50) {
    physBonus = 4;
    clinicalTips.push(`💪 Thể lực vượt trội (+${physical}%): Rất phù hợp ca phẫu thuật kéo dài, ca trực đêm hay cấp cứu liên tục.`);
  } else if (physical <= -50) {
    physBonus = -3;
    clinicalTips.push(`⚠️ Thể lực suy giảm (${physical}%): Tránh thức đêm quá sức, chú ý nghỉ ngơi giữa ca.`);
  }

  if (intellectual >= 50) {
    intBonus = 4;
    clinicalTips.push(`🧠 Trí tuệ sáng suốt (+${intellectual}%): Thích hợp nghiên cứu EBM, chẩn đoán ca bệnh khó, đọc ECG/CT phức tạp.`);
  } else if (intellectual <= -50) {
    intBonus = -3;
    clinicalTips.push(`⚠️ Trí tuệ ở vùng trũng (${intellectual}%): Hãy kiểm tra lại y lệnh & liều thuốc 2 lần trước khi duyệt.`);
  }

  if (emotional >= 50) {
    emoBonus = 3;
    clinicalTips.push(`❤️ Cảm xúc ổn định (+${emotional}%): Rất tốt để giải thích bệnh trình cho người nhà, tư vấn ca nặng.`);
  } else if (emotional <= -50) {
    emoBonus = -2;
    clinicalTips.push(`⚠️ Cảm xúc nhạy cảm (${emotional}%): Giữ bình tĩnh, tránh xung đột truyền thông y tế.`);
  }

  return {
    daysLived: days,
    physical,
    emotional,
    intellectual,
    avgScore: avg,
    physBonus,
    intBonus,
    emoBonus,
    totalBioScore: physBonus + intBonus + emoBonus,
    clinicalTips
  };
}

// ─── DOCTOR PROFILE STORAGE ───────────────────────────────────────────

export function getDoctorProfile(): DoctorProfile {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    name: "Bác sĩ",
    gender: "Nam",
    birthDay: 15,
    birthMonth: 8,
    birthYear: 1990,
    birthHour: 8,
    birthMinute: 30,
    canNam: "Canh",
    chiNam: "Ngọ",
    hanhMenh: "Thổ"
  };
}

export function saveDoctorProfile(profile: Partial<DoctorProfile>): DoctorProfile {
  const year = profile.birthYear || 1990;
  const canChi = getCanChiYear(year);
  const updated: DoctorProfile = {
    name: profile.name || "Bác sĩ",
    gender: profile.gender || "Nam",
    birthDay: Number(profile.birthDay) || 15,
    birthMonth: Number(profile.birthMonth) || 8,
    birthYear: year,
    birthHour: Number(profile.birthHour) || 8,
    birthMinute: Number(profile.birthMinute) || 0,
    canNam: canChi.can,
    chiNam: canChi.chi,
    hanhMenh: (profile.hanhMenh as any) || "Thổ"
  };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

// ─── ĐÁNH GIÁ CHỈ SỐ NGÀY ─────────────────────────────────────────────

export function evaluateDayScore(dateObj: Date = new Date()): DayScoreEvaluation {
  const doc = getDoctorProfile();
  const canChiDay = getCanChiDay(dateObj);
  const lunar = getApproxLunarDate(dateObj);

  // 1. So sánh Can Ngày vs Can Tuổi
  const hanhNgay = NGU_HANH_CAN[canChiDay.can] || 'Thổ';
  const hanhNamSinh = NGU_HANH_CAN[doc.canNam] || 'Thổ';
  let b1 = { level: 3, text: "Bình hòa", score: 30 };
  if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhNamSinh) {
    b1 = { level: 1, text: "Can ngày sinh cho Can tuổi (Rất tốt)", score: 60 };
  } else if (HANH_SINH_KHAC.sinh[hanhNamSinh] === hanhNgay) {
    b1 = { level: 2, text: "Can tuổi sinh Can ngày (Khá tốt)", score: 45 };
  } else if (hanhNgay === hanhNamSinh) {
    b1 = { level: 3, text: "Can ngày đồng hành Can tuổi", score: 30 };
  } else if (HANH_SINH_KHAC.khac[hanhNamSinh] === hanhNgay) {
    b1 = { level: 4, text: "Can tuổi khắc Can ngày", score: 15 };
  } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhNamSinh) {
    b1 = { level: 5, text: "Can ngày khắc Can tuổi", score: 0 };
  }

  // 2. Can Chi Ngày
  const hanhChi = NGU_HANH_CHI[canChiDay.chi] || 'Thổ';
  let canChiNgayScore = { level: 3, text: "Bình hòa", score: 0 };
  if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhChi) {
    canChiNgayScore = { level: 1, text: "Bảo Nhật (Can sinh Chi - Rất tốt)", score: 20 };
  } else if (HANH_SINH_KHAC.sinh[hanhChi] === hanhNgay) {
    canChiNgayScore = { level: 2, text: "Thoa Nhật (Chi sinh Can - Khá tốt)", score: 10 };
  } else if (hanhNgay === hanhChi) {
    canChiNgayScore = { level: 3, text: "Bát Chuyên (Đồng khí)", score: 5 };
  } else if (HANH_SINH_KHAC.khac[hanhChi] === hanhNgay) {
    canChiNgayScore = { level: 4, text: "Chế Nhật (Chi khắc Can - Thận trọng)", score: -10 };
  } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhChi) {
    canChiNgayScore = { level: 5, text: "Phạt Nhật (Can khắc Chi - Xấu)", score: -20 };
  }

  // 3. Lục Xung
  const cacCapXung = [["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"], ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]];
  let lucXung = { isXung: false, text: "Không phạm Lục Xung", score: 0 };
  for (const cap of cacCapXung) {
    if ((cap[0] === doc.chiNam && cap[1] === canChiDay.chi) || (cap[1] === doc.chiNam && cap[0] === canChiDay.chi)) {
      lucXung = { isXung: true, text: `Phạm Lục Xung (${canChiDay.chi} xung tuổi ${doc.chiNam})`, score: -20 };
      break;
    }
  }

  // 4. Ngũ Hành Bản Mệnh
  let b3Point = 0;
  const b3Detail: string[] = [];
  if (HANH_SINH_KHAC.sinh[hanhNgay] === doc.hanhMenh) {
    b3Point += 10;
    b3Detail.push("Hành ngày tương sinh Bản Mệnh (+10đ)");
  } else if (hanhNgay === doc.hanhMenh) {
    b3Point += 5;
    b3Detail.push("Hành ngày đồng hành Bản Mệnh (+5đ)");
  }

  // 5. Ngày Xấu Tốt Âm Lịch
  const tamNuong = [3, 7, 13, 18, 22, 27];
  const tamCuong = [8, 18, 28];
  const nguyetKy = [5, 14, 23];
  const lucNhamCat = [6, 16, 26];
  const b4Errors: string[] = [];
  const b4Bonuses: string[] = [];
  let b4Penalty = 0;
  let b4BonusPoint = 0;

  if (tamNuong.includes(lunar.day)) { b4Errors.push("Phạm ngày Tam Nương (-20đ)"); b4Penalty += 20; }
  if (tamCuong.includes(lunar.day)) { b4Errors.push("Phạm ngày Tam Cường (-15đ)"); b4Penalty += 15; }
  if (nguyetKy.includes(lunar.day)) { b4Errors.push("Phạm ngày Nguyệt Kỵ (-15đ)"); b4Penalty += 15; }
  if (lunar.day === 1) { b4Errors.push("Mùng 1 đầu tháng (Sóc) (-5đ)"); b4Penalty += 5; }
  if (canChiDay.can === "Quý" && canChiDay.chi === "Hợi") { b4Errors.push("Ngày Quý Hợi (Cùng Cực) (-20đ)"); b4Penalty += 20; }
  if (lunar.day === 15) { b4Bonuses.push("Ngày Vọng (Trăng tròn đại cát) (+5đ)"); b4BonusPoint += 5; }
  if (lucNhamCat.includes(lunar.day)) { b4Bonuses.push("Ngày Lục Nhâm Cát (Tốc Hỷ / Đại An) (+5đ)"); b4BonusPoint += 5; }

  // 6. Trực Ngày, Tiết Khí, Thần Sát & Biorhythms
  const trucNgay = getTrucNgay(lunar.month, canChiDay.chi);
  const tietKhiInfo = getTietKhiInfo(dateObj);
  const thanSat = kiemTraThanSat(lunar.month, canChiDay.can, canChiDay.chi);
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const bio = calculateBiorhythms(birthDate, dateObj);

  const rawTotal = b1.score + 20 + b3Point + canChiNgayScore.score + lucXung.score
                 - b4Penalty + b4BonusPoint
                 + trucNgay.score + tietKhiInfo.tietKhi.score
                 + (tietKhiInfo.tuLyTuTuyet ? tietKhiInfo.tuLyTuTuyet.score : 0)
                 + thanSat.score + bio.totalBioScore;

  const total = Math.round(Math.min(100, Math.max(0, rawTotal)));

  let rating = "Bình Hòa";
  let badgeClass = "day-rating-neutral";
  let icon = "⚖️";
  let summaryText = "Ngày cân bằng, mọi công việc diễn ra thuận lợi theo đúng quy trình.";

  if (total >= 82) {
    rating = "Đại Cát";
    badgeClass = "day-rating-great";
    icon = "🌟";
    summaryText = "Thời điểm vàng cho các ca phẫu thuật quan trọng, chuyển giao kỹ thuật & hội chẩn EBM.";
  } else if (total >= 65) {
    rating = "Cát Lành";
    badgeClass = "day-rating-good";
    icon = "✨";
    summaryText = "Khí tiết thuận lợi, năng lượng làm việc và chẩn đoán đạt hiệu suất cao.";
  } else if (total >= 45) {
    rating = "Bình Hòa";
    badgeClass = "day-rating-neutral";
    icon = "⚖️";
    summaryText = "Trạng thái ổn định, thích hợp tái khám, hoàn thiện ghi chú y lệnh & học tập.";
  } else if (total >= 25) {
    rating = "Thận Trọng";
    badgeClass = "day-rating-warn";
    icon = "⚠️";
    summaryText = "Có yếu tố xung nhẹ hoặc thiên tiết cản trở, hãy rà soát kỹ liều thuốc & y lệnh.";
  } else {
    rating = "Đại Hung";
    badgeClass = "day-rating-bad";
    icon = "⛔";
    summaryText = "Phạm nhiều Thần Sát / Lục Xung lớn, kiêng khởi sự mới, chú ý kiềm chế căng thẳng.";
  }

  const hoangDaoList = HOANG_DAO_MAP[canChiDay.chi] || [];
  const hoangDaoHours = hoangDaoList.map(chi => `${chi} (${GIO_TIME[chi] || ''})`);

  return {
    total,
    rawTotal,
    rating,
    icon,
    badgeClass,
    summaryText,
    dateObj,
    lunarDay: lunar.day,
    lunarMonth: lunar.month,
    canChiDay: canChiDay.full,
    canNgay: canChiDay.can,
    chiNgay: canChiDay.chi,
    hanhNgay,
    docProfile: doc,
    b1,
    canChiNgayScore,
    lucXung,
    b3: { point: b3Point, detail: b3Detail },
    b4: { errors: b4Errors, bonuses: b4Bonuses, penalty: b4Penalty, bonusPoint: b4BonusPoint },
    trucNgay,
    tietKhiInfo,
    thanSat,
    bio,
    hoangDaoHours
  };
}

// ─── UI BADGE & MODAL RENDERER ────────────────────────────────────────

export function updateDayScoreBadge(now: Date = new Date()): void {
  const scoreBtn = document.getElementById('heroDayScoreBtn');
  const valEl = document.getElementById('heroDayScoreVal');
  const textEl = document.getElementById('heroDayScoreText');
  const iconEl = document.getElementById('heroDayScoreIcon');
  if (!scoreBtn || !valEl || !textEl) return;

  const evalData = evaluateDayScore(now);
  valEl.textContent = `${evalData.total}/100`;
  textEl.textContent = evalData.rating;
  if (iconEl) iconEl.textContent = evalData.icon;

  scoreBtn.className = `hero-day-score-badge ${evalData.badgeClass}`;
  scoreBtn.setAttribute('data-score', String(evalData.total));
}

export function openDayScoreModal(): void {
  const evalData = evaluateDayScore(new Date());
  const doc = evalData.docProfile;

  const existing = document.getElementById('dayScoreModalOverlay');
  if (existing) existing.remove();

  const truc = evalData.trucNgay;
  const tiet = evalData.tietKhiInfo;
  const than = evalData.thanSat;

  const modalHtml = `
    <div class="day-score-modal-overlay" id="dayScoreModalOverlay" style="position: fixed; inset: 0; background: rgba(15,23,42,0.65); backdrop-filter: blur(6px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem;">
      <div class="day-score-modal-card animate-pop-in" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 1rem; width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); padding: 1.5rem;">
        
        <div class="modal-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 0.75rem;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary, #0284c7); text-transform: uppercase; letter-spacing: 0.05em;">☯ CHI TIẾT CHỈ SỐ NGÀY TỐT</span>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin: 0.25rem 0 0 0; color: var(--color-text, #0f172a);">Phân Tích Nhật Hạn & Cát Hung Lâm Sàng</h3>
          </div>
          <button class="modal-close-btn" id="closeDayScoreModal" style="background: none; border: none; font-size: 1.75rem; cursor: pointer; color: var(--color-text-muted, #64748b); line-height: 1;">&times;</button>
        </div>

        <div class="modal-card-body" style="display: flex; flex-direction: column; gap: 1.25rem;">
          
          <!-- Top Score Summary Banner -->
          <div class="score-summary-banner ${evalData.badgeClass}" style="display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; background: var(--color-surface-offset, #f8fafc); border-radius: 0.75rem; border: 1px solid var(--color-border, #e2e8f0);">
            <div class="score-gauge-wrap" style="position: relative; width: 80px; height: 80px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <svg style="width: 100%; height: 100%; transform: rotate(-90deg);" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-border, #e2e8f0)" stroke-width="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-primary, #0284c7)" stroke-width="8" stroke-dasharray="264" stroke-dashoffset="${264 - (264 * evalData.total) / 100}" stroke-linecap="round" />
              </svg>
              <div style="position: absolute; text-align: center;">
                <span style="font-size: 1.25rem; font-weight: 800; color: var(--color-text, #0f172a);">${evalData.total}</span>
                <span style="font-size: 0.65rem; color: var(--color-text-muted, #64748b); display: block;">/100</span>
              </div>
            </div>
            <div>
              <div style="display: inline-block; font-size: 0.8rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 1rem; background: var(--color-primary, #0284c7); color: #fff; margin-bottom: 0.35rem;">
                ${evalData.icon} ${evalData.rating}
              </div>
              <h4 style="margin: 0 0 0.25rem 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a);">Ngày ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted, #64748b); line-height: 1.4;">${evalData.summaryText}</p>
              <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--color-text, #0f172a); display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem;">
                <span>👨‍⚕️ <strong>${doc.name || 'Bác sĩ'}</strong> (${doc.gender || 'Nam'}) — Tuổi ${doc.canNam} ${doc.chiNam} — Mệnh ${doc.hanhMenh}</span>
                <button type="button" id="btnEditDocAge" style="background: none; border: 1px solid var(--color-primary, #0284c7); color: var(--color-primary, #0284c7); padding: 0.15rem 0.5rem; border-radius: 0.35rem; font-size: 0.75rem; cursor: pointer;">⚙️ Sửa Hồ Sơ</button>
              </div>
            </div>
          </div>

          <!-- Form Đổi Hồ Sơ Sinh -->
          <div id="docAgeEditBox" style="display: none; padding: 1rem; background: var(--color-surface, #fff); border: 1px dashed var(--color-primary, #0284c7); border-radius: 0.5rem;">
            <label style="font-weight: 700; font-size: 0.85rem; display: block; margin-bottom: 0.5rem; color: var(--color-primary, #0284c7);">⚙️ Cấu Hình Hồ Sơ Bác Sĩ (Cá nhân hóa điểm số):</label>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.5rem;">
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Tên bác sĩ:</span>
                <input type="text" id="inputDocName" value="${doc.name || 'Bác sĩ'}" style="width: 100%; padding: 0.35rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.25rem;">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Giới tính:</span>
                <select id="selectDocGender" style="width: 100%; padding: 0.35rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.25rem;">
                  <option value="Nam" ${doc.gender === 'Nam' ? 'selected' : ''}>Nam</option>
                  <option value="Nữ" ${doc.gender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                </select>
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Năm sinh:</span>
                <input type="number" id="inputDocYear" value="${doc.birthYear || 1990}" min="1930" max="2030" style="width: 100%; padding: 0.35rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.25rem;">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Tháng sinh:</span>
                <input type="number" id="inputDocMonth" value="${doc.birthMonth || 8}" min="1" max="12" style="width: 100%; padding: 0.35rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.25rem;">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Ngày sinh:</span>
                <input type="number" id="inputDocDay" value="${doc.birthDay || 15}" min="1" max="31" style="width: 100%; padding: 0.35rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.25rem;">
              </div>
              <div>
                <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Bản mệnh:</span>
                <select id="selectDocHanhMenh" style="width: 100%; padding: 0.35rem; font-size: 0.85rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.25rem;">
                  <option value="Kim" ${doc.hanhMenh === 'Kim' ? 'selected' : ''}>Mệnh Kim ⚙️</option>
                  <option value="Mộc" ${doc.hanhMenh === 'Mộc' ? 'selected' : ''}>Mệnh Mộc 🌿</option>
                  <option value="Thủy" ${doc.hanhMenh === 'Thủy' ? 'selected' : ''}>Mệnh Thủy 🌊</option>
                  <option value="Hỏa" ${doc.hanhMenh === 'Hỏa' ? 'selected' : ''}>Mệnh Hỏa 🔥</option>
                  <option value="Thổ" ${doc.hanhMenh === 'Thổ' ? 'selected' : ''}>Mệnh Thổ 🏔️</option>
                </select>
              </div>
            </div>
            <div style="margin-top: 0.75rem; text-align: right;">
              <button type="button" id="btnSaveDocAge" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.4rem 0.9rem; font-size: 0.85rem; font-weight: 600; border-radius: 0.35rem; cursor: pointer;">
                💾 Lưu Hồ Sơ & Tính Lại
              </button>
            </div>
          </div>

          <!-- Trực Ngày & Tiết Khí -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
            <div style="padding: 0.85rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">TRỰC NGÀY</span>
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">Trực ${truc.name} (${truc.rating})</div>
              <p style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0;">${truc.desc}</p>
            </div>
            <div style="padding: 0.85rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted, #64748b); text-transform: uppercase;">TIẾT KHÍ</span>
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-text, #0f172a); margin: 0.2rem 0;">${tiet.tietKhi.icon} Tiết ${tiet.tietKhi.name}</div>
              <p style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0;">Cát khí mùa: +${tiet.tietKhi.score}đ ${tiet.tuLyTuTuyet ? ` | <span style="color:#ef4444; font-weight:700;">⚠️ ${tiet.tuLyTuTuyet.name}</span>` : ''}</p>
            </div>
          </div>

          <!-- Biorhythms -->
          <div style="padding: 0.85rem; border-radius: 0.5rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0);">
            <div style="font-weight: 700; font-size: 0.875rem; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;">
              <i class="fa-solid fa-heart-pulse" style="color: #ef4444;"></i> Nhịp Sinh Học Hôm Nay (${evalData.bio.daysLived} ngày tuổi):
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; text-align: center;">
              <div style="padding: 0.4rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">💪 Thể lực</div>
                <div style="font-weight: 800; font-size: 1rem; color: #10b981;">${evalData.bio.physical}%</div>
              </div>
              <div style="padding: 0.4rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">🧠 Trí tuệ</div>
                <div style="font-weight: 800; font-size: 1rem; color: #8b5cf6;">${evalData.bio.intellectual}%</div>
              </div>
              <div style="padding: 0.4rem; background: var(--color-surface, #fff); border-radius: 0.35rem; border: 1px solid var(--color-border, #e2e8f0);">
                <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">❤️ Cảm xúc</div>
                <div style="font-weight: 800; font-size: 1rem; color: #0284c7;">${evalData.bio.emotional}%</div>
              </div>
            </div>
            ${evalData.bio.clinicalTips.length > 0 ? `
              <div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--color-text, #0f172a);">
                ${evalData.bio.clinicalTips.map(tip => `<div style="margin-top: 0.2rem;">${tip}</div>`).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Giờ Hoàng Đạo -->
          <div>
            <h5 style="font-size: 0.875rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0;">
              <i class="fa-solid fa-sun" style="color: #f59e0b;"></i> Các Giờ Hoàng Đạo Trong Ngày:
            </h5>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${evalData.hoangDaoHours.map(h => `
                <span style="font-size: 0.78rem; font-weight: 600; padding: 0.25rem 0.55rem; background: var(--color-surface-offset, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.35rem; color: var(--color-text, #0f172a);">
                  <i class="fa-regular fa-clock" style="color: var(--color-primary, #0284c7);"></i> ${h}
                </span>
              `).join('')}
            </div>
          </div>

        </div>

        <div class="modal-card-footer" style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Tử vi Bát tự, 12 Trực, 24 Tiết Khí & Biorhythm y khoa</span>
          <button class="btn btn-primary" id="btnCloseDayScoreModalBottom" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 0.45rem 1rem; border-radius: 0.35rem; cursor: pointer; font-size: 0.85rem; font-weight: 600;">
            Đóng
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const overlay = document.getElementById('dayScoreModalOverlay');
  const closeBtn = document.getElementById('closeDayScoreModal');
  const closeBottom = document.getElementById('btnCloseDayScoreModalBottom');
  const btnEditAge = document.getElementById('btnEditDocAge');
  const editBox = document.getElementById('docAgeEditBox');
  const btnSaveAge = document.getElementById('btnSaveDocAge');

  const closeModal = () => overlay && overlay.remove();
  closeBtn?.addEventListener('click', closeModal);
  closeBottom?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  btnEditAge?.addEventListener('click', () => {
    if (editBox) editBox.style.display = editBox.style.display === 'none' ? 'block' : 'none';
  });

  btnSaveAge?.addEventListener('click', () => {
    const name = (document.getElementById('inputDocName') as HTMLInputElement)?.value.trim();
    const gender = (document.getElementById('selectDocGender') as HTMLSelectElement)?.value as any;
    const birthYear = parseInt((document.getElementById('inputDocYear') as HTMLInputElement)?.value, 10);
    const birthMonth = parseInt((document.getElementById('inputDocMonth') as HTMLInputElement)?.value, 10);
    const birthDay = parseInt((document.getElementById('inputDocDay') as HTMLInputElement)?.value, 10);
    const hanhMenh = (document.getElementById('selectDocHanhMenh') as HTMLSelectElement)?.value as any;

    saveDoctorProfile({ name, gender, birthYear, birthMonth, birthDay, hanhMenh });
    closeModal();
    updateDayScoreBadge();
    openDayScoreModal();
  });
}

export function initGoodDayCalculator(): void {
  updateDayScoreBadge();

  // Lắng nghe click vào nút badge trên Hero Banner
  const heroBtn = document.getElementById('heroDayScoreBtn');
  if (heroBtn) {
    heroBtn.style.cursor = 'pointer';
    heroBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDayScoreModal();
    });
  }
}

// Auto init
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initGoodDayCalculator());
  } else {
    initGoodDayCalculator();
  }
}

// Expose to window for backward compatibility
if (typeof window !== 'undefined') {
  (window as any).GoodDayCalculator = {
    evaluateDayScore,
    getDoctorProfile,
    saveDoctorProfile,
    getCanChiYear,
    calculateBiorhythms,
    getTrucNgay,
    getTietKhiInfo,
    kiemTraThanSat,
    updateDayScoreBadge,
    openDayScoreModal,
    initGoodDayCalculator
  };
}
