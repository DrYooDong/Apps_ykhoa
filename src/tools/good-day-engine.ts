/**
 * CliniPortal 2.0 — Good Day Calculation Engine & Clinical Biorhythms (Chuyên Ngành Nội Khoa)
 * Path: src/tools/good-day-engine.ts
 */

import type {
  DoctorProfile,
  DoctorSpecialty,
  SpecialtyMeta,
  TrucItem,
  TietKhiItem,
  ThanSatItem,
  SaoTuItem,
  GioDetailItem,
  BiorhythmResult,
  ClinicalAdvice,
  ClinicalAdviceItem,
  DiaChiRelationResult,
  QuyNhanLocResult,
  DayScoreEvaluation,
  WeekDaySummary,
  BestClinicalDayResult,
  ShiftEnergyData,
  NapAmElement,
  NapAmDetail,
  MedicalTaskType,
  MedicalTaskConfig,
  MedicalTaskScoreEvaluation,
  GioRankResult
} from './good-day-types';

export const SPECIALTY_METAS: Record<DoctorSpecialty, SpecialtyMeta> = {
  internal_general: {
    id: 'internal_general',
    name: 'Nội Tổng Quát & Ca Bệnh Phức Tạp',
    shortName: 'Nội Tổng Quát',
    icon: '🩺',
    description: 'Ưu tiên tư duy chẩn đoán nhiều tầng, tiếp cận đa bệnh lý đồng mắc và tối ưu hóa phối hợp thuốc.',
    weights: { physical: 0.10, intellectual: 0.50, emotional: 0.15, intuitive: 0.25 }
  },
  internal_cardio: {
    id: 'internal_cardio',
    name: 'Nội Tim Mạch & Huyết Động Học',
    shortName: 'Nội Tim Mạch',
    icon: '❤️',
    description: 'Ưu tiên nhận định biến đổi ECG, siêu âm POCUS huyết động và kiểm soát tứ trụ suy tim / mạch vành.',
    weights: { physical: 0.10, intellectual: 0.45, emotional: 0.15, intuitive: 0.30 }
  },
  internal_resp_icu: {
    id: 'internal_resp_icu',
    name: 'Nội Hô Hấp & Hồi Sức Nội Khoa (ICU)',
    shortName: 'Hô Hấp & ICU Nội',
    icon: '🫁',
    description: 'Ưu tiên phân tích khí máu động mạch, điều chỉnh thông khí cơ học và can thiệp giờ vàng sốc nhiễm khuẩn.',
    weights: { physical: 0.15, intellectual: 0.40, emotional: 0.10, intuitive: 0.35 }
  },
  internal_gi_hepa: {
    id: 'internal_gi_hepa',
    name: 'Nội Tiêu Hóa & Gan Mật',
    shortName: 'Tiêu Hóa & Gan Mật',
    icon: '🧪',
    description: 'Ưu tiên biện luận chức năng gan, phân tầng xuất huyết tiêu hóa và kiểm soát biến chứng xơ gan / viêm tụy cấp.',
    weights: { physical: 0.10, intellectual: 0.50, emotional: 0.15, intuitive: 0.25 }
  },
  internal_endo_nephro: {
    id: 'internal_endo_nephro',
    name: 'Nội Tiết, Chuyển Hóa & Thận Học',
    shortName: 'Nội Tiết & Thận',
    icon: '🩸',
    description: 'Ưu tiên cân bằng điện giải toan kiềm, phác đồ insulin nội viện và hiệu chỉnh dược lý theo eGFR/CrCl.',
    weights: { physical: 0.10, intellectual: 0.55, emotional: 0.15, intuitive: 0.20 }
  },
  internal_neuro_id: {
    id: 'internal_neuro_id',
    name: 'Nội Thần Kinh & Bệnh Truyền Nhiễm',
    shortName: 'Thần Kinh & Nhiễm',
    icon: '🧠',
    description: 'Ưu tiên định vị tổn thương thần kinh khu trú, dược động học kháng sinh màng não và quản lý nhiễm trùng nặng.',
    weights: { physical: 0.10, intellectual: 0.45, emotional: 0.15, intuitive: 0.30 }
  }
};

import {
  CAN,
  CHI,
  NGU_HANH_CAN,
  NGU_HANH_CHI,
  HANH_SINH_KHAC,
  GIO_TIME,
  HOANG_DAO_MAP,
  GIO_THAN_SAT,
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
  const refJDN = 2461089;
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

// ─── TÍNH 28 NHỊ THẬP BÁT TÚ ───────────────────────────────────────────

export function getSaoTu(dateObj: Date, jdn?: number): SaoTuItem {
  const calcJdn = jdn ?? getJDN(dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear());
  const saoTuIdx = ((calcJdn + 12) % 28 + 28) % 28;
  return NHI_THAP_BAT_TU[saoTuIdx] || NHI_THAP_BAT_TU[0]!;
}

// ─── SAO ĐĂNG VIÊN (CHƯƠNG III: HOÁN HUNG THÀNH CÁT) ───────────────────
export function checkSaoDangVien(saoName: string, chiNgay: string): { isDangVien: boolean; bonusScore: number; note: string } {
  const dangVienInfo = SAO_DANG_VIEN_MAP[saoName];
  if (dangVienInfo && dangVienInfo.chiList.includes(chiNgay)) {
    return {
      isDangVien: true,
      bonusScore: dangVienInfo.bonus,
      note: `Sao ${saoName} Đăng Viên tại ${chiNgay}: ${dangVienInfo.meaning} (+${dangVienInfo.bonus}đ)`
    };
  }
  return { isDangVien: false, bonusScore: 0, note: '' };
}

// ─── NẠP ÂM 60 HOA GIÁP & ĐỐI CHIẾU (CHƯƠNG VI) ────────────────────────
export function getNapAm(canChi: string): NapAmDetail {
  if (LUC_THAP_HOA_GIAP_NAP_AM[canChi]) {
    return LUC_THAP_HOA_GIAP_NAP_AM[canChi]!;
  }
  const trimmed = canChi.trim();
  if (LUC_THAP_HOA_GIAP_NAP_AM[trimmed]) {
    return LUC_THAP_HOA_GIAP_NAP_AM[trimmed]!;
  }
  return {
    canChi,
    name: "Lộ Bàng Thổ",
    element: "Thổ",
    meaning: "Nền tảng bình ổn, vững chãi."
  };
}

export function evaluateNapAmRelation(
  napAmDoc: NapAmDetail,
  napAmDay: NapAmDetail
): { score: number; text: string; relationType: 'sinh_nhap' | 'dong_hanh' | 'sinh_xuat' | 'khac_xuat' | 'khac_nhap' } {
  const hDoc = napAmDoc.element;
  const hDay = napAmDay.element;

  // 1. Sinh Nhập: Nạp Âm Ngày tương sinh Nạp Âm Bác Sĩ (Cực Tốt)
  if (HANH_SINH_KHAC.sinh[hDay] === hDoc) {
    return {
      score: 12,
      relationType: 'sinh_nhap',
      text: `Nạp Âm Sinh Nhập (+12đ): ${napAmDay.name} (${hDay}) ngày sinh ${napAmDoc.name} (${hDoc}) tuổi thầy thuốc — Khí tiết tiếp sức, tư duy chẩn đoán sắc bén và điều trị đại hanh thông.`
    };
  }

  // 2. Đồng Khí: Cùng hành Nạp Âm (Khá Tốt)
  if (hDay === hDoc) {
    return {
      score: 6,
      relationType: 'dong_hanh',
      text: `Nạp Âm Đồng Khí (+6đ): Cùng hành ${hDoc} (${napAmDay.name} & ${napAmDoc.name}) — Tương hòa, bình ổn, hỗ trợ tập trung y vụ nội trú.`
    };
  }

  // 3. Sinh Xuất: Nạp Âm Bác Sĩ sinh Nạp Âm Ngày
  if (HANH_SINH_KHAC.sinh[hDoc] === hDay) {
    return {
      score: 2,
      relationType: 'sinh_xuat',
      text: `Nạp Âm Sinh Xuất (+2đ): ${napAmDoc.name} (${hDoc}) sinh ${napAmDay.name} (${hDay}) ngày — Thầy thuốc dốc tâm huyết cho người bệnh, hiệu quả hồi phục tích cực.`
    };
  }

  // 4. Khắc Xuất: Nạp Âm Bác Sĩ khắc Nạp Âm Ngày
  if (HANH_SINH_KHAC.khac[hDoc] === hDay) {
    return {
      score: -4,
      relationType: 'khac_xuat',
      text: `Nạp Âm Khắc Xuất (-4đ): Tuổi (${hDoc}) khắc chế Khí ngày (${hDay}) — Cần chú ý giữ gìn thể lực, tránh căng thẳng kéo dài trong ca trực.`
    };
  }

  // 5. Khắc Nhập: Nạp Âm Ngày khắc Nạp Âm Bác Sĩ
  return {
    score: -10,
    relationType: 'khac_nhap',
    text: `Nạp Âm Khắc Nhập (-10đ): Khí ngày ${napAmDay.name} (${hDay}) tương khắc Tuổi ${napAmDoc.name} (${hDoc}) — Áp lực công việc cao, cẩn trọng rà soát kỹ tương tác thuốc và y lệnh.`
  };
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
        tuLyTuTuyet = { type: 'Tứ Ly', name: `Tứ Ly (Trước ${tk.name})`, score: -12, desc: "Cực điểm chuyển giao Âm Dương, kiêng khởi đầu phác đồ liều cao hoặc sự kiện lớn." };
      } else if (tk.special === 'Tuet') {
        tuLyTuTuyet = { type: 'Tứ Tuyệt', name: `Tứ Tuyệt (Trước ${tk.name})`, score: -8, desc: "Khí tiết cạn kiệt trước mốc Lập, thận trọng y lệnh phức tạp nhiều tương tác." };
      }
    }
  }

  return { tietKhi: closest, tuLyTuTuyet };
}

// ─── TƯƠNG TÁC ĐỊA CHI CHUYÊN SÂU ────────────────────────────────────

export function kiemTraDiaChi(chiNamDoc: string, chiNgay: string): DiaChiRelationResult {
  const tamHopGroups = [
    ["Thân", "Tý", "Thìn"],
    ["Dần", "Ngọ", "Tuất"],
    ["Tỵ", "Dậu", "Sửu"],
    ["Hợi", "Mão", "Mùi"]
  ];
  let tamHop = { isMatch: false, text: "Không thuộc Tam Hợp", score: 0 };
  for (const grp of tamHopGroups) {
    if (grp.includes(chiNamDoc) && grp.includes(chiNgay) && chiNamDoc !== chiNgay) {
      tamHop = { isMatch: true, text: `Tam Hợp (${chiNamDoc} - ${chiNgay}): Đồng nghiệp hòa thuận, hội chẩn ăn ý (+15đ)`, score: 15 };
      break;
    }
  }

  const lucHopPairs = [
    ["Tý", "Sửu"], ["Dần", "Hợi"], ["Mão", "Tuất"],
    ["Thìn", "Dậu"], ["Tỵ", "Thân"], ["Ngọ", "Mùi"]
  ];
  let lucHop = { isMatch: false, text: "Không thuộc Lục Hợp", score: 0 };
  for (const pair of lucHopPairs) {
    if ((pair[0] === chiNamDoc && pair[1] === chiNgay) || (pair[1] === chiNamDoc && pair[0] === chiNgay)) {
      lucHop = { isMatch: true, text: `Lục Hợp (${chiNamDoc} hợp ${chiNgay}): Mọi sự hanh thông, thân nhân người bệnh tin tưởng (+10đ)`, score: 10 };
      break;
    }
  }

  const lucXungPairs = [
    ["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"],
    ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]
  ];
  let lucXung = { isMatch: false, text: "Không phạm Lục Xung", score: 0 };
  for (const pair of lucXungPairs) {
    if ((pair[0] === chiNamDoc && pair[1] === chiNgay) || (pair[1] === chiNamDoc && pair[0] === chiNgay)) {
      lucXung = { isMatch: true, text: `Lục Xung (${chiNamDoc} xung ${chiNgay}): Trực xung, dễ phát sinh bất đồng chuyên môn (-15đ)`, score: -15 };
      break;
    }
  }

  const lucHaiPairs = [
    ["Tý", "Mùi"], ["Sửu", "Ngọ"], ["Dần", "Tỵ"],
    ["Mão", "Thìn"], ["Thân", "Hợi"], ["Dậu", "Tuất"]
  ];
  let lucHai = { isMatch: false, text: "Không phạm Lục Hại", score: 0 };
  for (const pair of lucHaiPairs) {
    if ((pair[0] === chiNamDoc && pair[1] === chiNgay) || (pair[1] === chiNamDoc && pair[0] === chiNgay)) {
      lucHai = { isMatch: true, text: `Lục Hại (${chiNamDoc} hại ${chiNgay}): Dễ có sự cố giao tiếp, cần giải thích cặn kẽ (-10đ)`, score: -10 };
      break;
    }
  }

  const hinhGroups = [
    ["Dần", "Tỵ", "Thân"],
    ["Sửu", "Tuất", "Mùi"]
  ];
  let tuongHinh = { isMatch: false, text: "Không phạm Tương Hình", score: 0 };
  for (const grp of hinhGroups) {
    if (grp.includes(chiNamDoc) && grp.includes(chiNgay) && chiNamDoc !== chiNgay) {
      tuongHinh = { isMatch: true, text: `Tương Hình (${chiNamDoc} hình ${chiNgay}): Áp lực hành chính, cẩn trọng sai sót (-8đ)`, score: -8 };
      break;
    }
  }
  if (!tuongHinh.isMatch) {
    if ((chiNamDoc === "Tý" && chiNgay === "Mão") || (chiNamDoc === "Mão" && chiNgay === "Tý")) {
      tuongHinh = { isMatch: true, text: `Vô Lễ Chi Hình (Tý - Mão): Cẩn trọng văn hóa giao tiếp khoa phòng (-8đ)`, score: -8 };
    } else if (chiNamDoc === chiNgay && ["Thìn", "Ngọ", "Dậu", "Hợi"].includes(chiNamDoc)) {
      tuongHinh = { isMatch: true, text: `Tự Hình (${chiNamDoc} tự hình): Dễ tự gây áp lực tâm lý cho bản thân (-6đ)`, score: -6 };
    }
  }

  const totalScore = tamHop.score + lucHop.score + lucXung.score + lucHai.score + tuongHinh.score;
  return { tamHop, lucHop, lucXung, lucHai, tuongHinh, totalScore };
}

// ─── THIÊN ẤT QUÝ NHÂN & LỘC THẦN ────────────────────────────────────

export function kiemTraQuyNhanLoc(canNamDoc: string, canNgay: string, chiNgay: string): QuyNhanLocResult {
  const qnList = THIEN_AT_MAP[canNamDoc] || [];
  let thienAt = { isMatch: false, text: "Không gặp Thiên Ất Quý Nhân", score: 0 };
  if (qnList.includes(chiNgay)) {
    thienAt = { isMatch: true, text: `Đắc Thiên Ất Quý Nhân tại ${chiNgay}: Gặp thầy giỏi bạn tốt, ca bệnh khó có hướng xử trí tối ưu (+15đ)`, score: 15 };
  }

  const locChi = LOC_THAN_MAP[canNamDoc];
  let locThan = { isMatch: false, text: "Không gặp Lộc Thần", score: 0 };
  if (locChi === chiNgay) {
    locThan = { isMatch: true, text: `Đắc Lộc Thần tại ${chiNgay}: Y nghiệp phát triển vững bền, công tác điều trị hanh thông (+12đ)`, score: 12 };
  }

  return { thienAt, locThan, totalScore: thienAt.score + locThan.score };
}

// ─── KIỂM TRA THẦN SÁT Y KHOA CHUYÊN SÂU ──────────────────────────────

export function kiemTraThanSat(lunarMonth: number, canNgay: string, chiNgay: string, canNamDoc: string): { list: ThanSatItem[]; score: number } {
  const list: ThanSatItem[] = [];
  let score = 0;

  if (THIEN_DUC_MAP[lunarMonth] === canNgay) {
    list.push({ name: "Thiên Đức", type: "pos", score: 12, desc: "Cát thần tối thượng: Hóa giải tai ương, bệnh nhân nguy kịch chuyển hóa nhẹ." });
    score += 12;
  }

  if (NGUYET_DUC_MAP[lunarMonth] === canNgay) {
    list.push({ name: "Nguyệt Đức", type: "pos", score: 10, desc: "Cát thần phúc đức: Mọi sự bình an, điều hòa sinh khí nội môi." });
    score += 10;
  }

  if (THIEN_Y_MAP[lunarMonth] === chiNgay) {
    list.push({ name: "Thiên Y", type: "pos", score: 15, desc: "Thần Sao Y Dược Cát Tinh: Trị bệnh thần hiệu, dùng thuốc đúng đích, bệnh mau dứt điểm." });
    score += 15;
  }

  if (SINH_KHI_MAP[lunarMonth] === chiNgay) {
    list.push({ name: "Sinh Khí", type: "pos", score: 10, desc: "Sinh khí dồi dào: Thúc đẩy tái tạo tế bào, nâng cao đề kháng tự nhiên." });
    score += 10;
  }

  if (SAT_CHU_MAP[lunarMonth] === chiNgay) {
    list.push({ name: "Sát Chủ Ngày", type: "neg", score: -15, desc: "Đại sát: Thận trọng cao độ khi ra y lệnh liều cao hoặc thuốc độc tính tích lũy." });
    score -= 15;
  }

  if (THO_TU_MAP[lunarMonth] === chiNgay) {
    list.push({ name: "Thọ Tử Ngày", type: "neg", score: -15, desc: "Đại hung: Tránh đổi phác đồ mạo hiểm, chú ý bám sát dấu hiệu sinh hiệu suy sụp." });
    score -= 15;
  }

  const daoChiemList = DAO_CHIEM_SAT_DAYS[lunarMonth] || [];
  if (daoChiemList.includes(chiNgay)) {
    list.push({ name: "Đao Chiêm Sát", type: "neg", score: -8, desc: "Khí tiết phân tán: Kiểm tra kỹ 5 Đúng và tương tác thuốc trước khi phát thuốc." });
    score -= 8;
  }

  const isThapAc = THAP_AC_DAI_BAI.some(item =>
    item.yearCans.includes(canNamDoc) && item.month === lunarMonth && item.dayCanChi === `${canNgay} ${chiNgay}`
  );
  if (isThapAc) {
    list.push({ name: "Thập Ác Đại Bại", type: "neg", score: -18, desc: "Đại hung nhật hạn: Kiêng khởi đầu liệu trình lớn, tập trung duy trì phác đồ an toàn." });
    score -= 18;
  }

  return { list, score };
}

// ─── TÍNH NHỊP SINH HỌC BIORHYTHMS (CHUYÊN KHOA NỘI KHOA) ─────────────

export function calculateBiorhythms(
  birthDate: Date,
  targetDate: Date = new Date(),
  specialty: DoctorSpecialty = 'internal_general'
): BiorhythmResult {
  const diffTime = targetDate.getTime() - birthDate.getTime();
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 100);
  const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 100);
  const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 100);
  const intuitive = Math.round(Math.sin((2 * Math.PI * days) / 38) * 100);

  const meta = SPECIALTY_METAS[specialty] || SPECIALTY_METAS.internal_general;
  const w = meta.weights;
  const weightedBio = physical * w.physical + intellectual * w.intellectual + emotional * w.emotional + intuitive * w.intuitive;
  const avg = Math.round(weightedBio);

  let physBonus = 0;
  let intBonus = 0;
  let emoBonus = 0;
  let intuitBonus = 0;
  const clinicalTips: string[] = [];

  // Trí tuệ (Intellectual) — Trọng số cốt lõi số 1 của Bác sĩ Nội khoa (40-55%)
  if (intellectual >= 40) {
    intBonus = 5;
    clinicalTips.push(`🧠 Trí tuệ sáng suốt đỉnh cao (+${intellectual}%): Tư duy chẩn đoán nhiều tầng mạch lạc, phân tích cận lâm sàng sắc bén và tối ưu hóa phối hợp thuốc.`);
  } else if (intellectual <= -40) {
    intBonus = -4;
    clinicalTips.push(`⚠️ Trí tuệ vùng trũng sinh học (${intellectual}%): Thận trọng đọc kỹ lại kết quả xét nghiệm, kiểm tra chéo liều thuốc theo eGFR trước khi ký y lệnh.`);
  } else {
    clinicalTips.push(`🧠 Trí tuệ ổn định (${intellectual}%): Tiến hành thăm khám, đi buồng và rà soát phác đồ điều trị thường quy vững vàng.`);
  }

  // Trực giác lâm sàng (Intuitive) — Nhận diện suy sụp sớm và ca khó (20-35%)
  if (intuitive >= 30) {
    intuitBonus = 4;
    clinicalTips.push(`🎯 Trực giác lâm sàng nhạy bén (+${intuitive}%): Nhận diện sớm dấu hiệu suy sụp sinh hiệu âm thầm, phát hiện triệu chứng không điển hình.`);
  } else if (intuitive <= -30) {
    intuitBonus = -3;
    clinicalTips.push(`⚠️ Trực giác trầm lắng (${intuitive}%): Hãy bám sát triệt để các thang điểm định lượng (NEWS2, Glasgow, SOFA, Child-Pugh) thay vì cảm tính.`);
  }

  // Cảm xúc & Giao tiếp (Emotional) — Thấu cảm bệnh mạn tính & gia đình (15%)
  if (emotional >= 35) {
    emoBonus = 3;
    clinicalTips.push(`❤️ Năng lượng thấu cảm dồi dào (+${emotional}%): Rất thuận lợi giải thích tiên lượng cho gia đình, nâng cao tỷ lệ tuân thủ điều trị của bệnh nhân mạn.`);
  } else if (emotional <= -35) {
    emoBonus = -2;
    clinicalTips.push(`⚠️ Nguy cơ căng thẳng cảm xúc (${emotional}%): Cần giữ tâm thái điềm tĩnh, tuân thủ mô hình SPIKES khi thông báo tin xấu.`);
  }

  // Thể lực (Physical) — Sức bền đi buồng & trực ca (10-15%)
  if (physical >= 40) {
    physBonus = 2;
    clinicalTips.push(`💪 Thể lực sung mãn (+${physical}%): Duy trì sức bền đi buồng nội trú đông và sự tập trung suốt ca trực đêm.`);
  } else if (physical <= -40) {
    physBonus = -2;
    clinicalTips.push(`⚠️ Thể lực mệt mỏi (${physical}%): Chú ý uống đủ nước, tranh thủ chợp mắt ngắn (Power Nap) khi khoa phòng ổn định.`);
  }

  // Khuyến nghị chuyên biệt theo phân hệ Nội khoa
  if (specialty === 'internal_cardio') {
    clinicalTips.push(`❤️ Chuyên khoa Tim Mạch: Ưu tiên rà soát tương tác thuốc chống đông / kháng kết tập tiểu cầu kép và cân bằng dịch vào ra.`);
  } else if (specialty === 'internal_resp_icu') {
    clinicalTips.push(`🫁 Chuyên khoa Hô Hấp & ICU: Luôn theo dõi sát tỷ lệ PaO2/FiO2, áp lực đường thở đỉnh và cân bằng toan kiềm trên ABG.`);
  } else if (specialty === 'internal_endo_nephro') {
    clinicalTips.push(`🩸 Chuyên khoa Nội Tiết & Thận: Kiểm tra kỹ kali máu và tốc độ lọc cầu thận (eGFR) trước khi dùng thuốc hạ áp nhóm RAASi hoặc SGLT2i.`);
  } else if (specialty === 'internal_gi_hepa') {
    clinicalTips.push(`🧪 Chuyên khoa Tiêu Hóa & Gan: Dự phòng xuất huyết tiêu hóa do stress ở bệnh nhân nặng và kiểm soát chặt bilan đông máu PT/INR.`);
  } else if (specialty === 'internal_neuro_id') {
    clinicalTips.push(`🧠 Chuyên khoa Thần Kinh & Nhiễm: Đánh giá thang điểm NIHSS / GCS thường quy và tối ưu liều kháng sinh qua hàng rào máu não.`);
  }

  const weightedBonus = Math.round(weightedBio / 25);
  const totalBioScore = weightedBonus + physBonus + intBonus + emoBonus + intuitBonus;

  return {
    daysLived: days,
    physical,
    emotional,
    intellectual,
    intuitive,
    avgScore: avg,
    physBonus,
    intBonus,
    emoBonus,
    intuitBonus,
    totalBioScore,
    clinicalTips
  };
}

// ─── TIMELINE 12 GIỜ HOÀNG ĐẠO REAL-TIME ──────────────────────────────

export function calculateGioTimeline(chiNgay: string, currentHour: number = new Date().getHours()): GioDetailItem[] {
  const hoangDaoList = HOANG_DAO_MAP[chiNgay] || [];
  const dayChiIdx = CHI.indexOf(chiNgay as any);
  const startOffset = (dayChiIdx * 2) % 12;

  return CHI.map((chi, idx) => {
    const starIdx = (idx + startOffset) % 12;
    const star = GIO_THAN_SAT[starIdx] || GIO_THAN_SAT[0]!;
    const isHoangDao = hoangDaoList.includes(chi);

    let isCurrent = false;
    if (idx === 0) {
      isCurrent = currentHour >= 23 || currentHour < 1;
    } else {
      const startH = idx * 2 - 1;
      const endH = idx * 2 + 1;
      isCurrent = currentHour >= startH && currentHour < endH;
    }

    return {
      chi,
      timeRange: GIO_TIME[chi] || '',
      starName: star.name,
      isHoangDao,
      type: isHoangDao ? 'hoang_dao' : 'hac_dao',
      icon: isHoangDao ? '🌟' : '🌑',
      meaning: star.meaning,
      isCurrent
    };
  });
}

// ─── MA TRẬN 9 BẬC GIỜ KHỞI SỰ NỘI KHOA (CHƯƠNG VII) ─────────────────
export function calculateGioRanks9Bậc(
  canNgay: string,
  chiNgay: string,
  doc: DoctorProfile
): GioRankResult[] {
  const hoangDaoList = HOANG_DAO_MAP[chiNgay] || [];
  const dayChiIdx = CHI.indexOf(chiNgay as any);
  const startOffset = (dayChiIdx * 2) % 12;

  const START_CAN_HOUR: Record<string, number> = {
    "Giáp": 0, "Kỷ": 0,
    "Ất": 2, "Canh": 2,
    "Bính": 4, "Tân": 4,
    "Đinh": 6, "Nhâm": 6,
    "Mậu": 8, "Quý": 8
  };
  const startCanIdx = START_CAN_HOUR[canNgay] ?? 0;
  const docCan = doc.canNam;
  const docChi = doc.chiNam;
  const napAmDoc = getNapAm(`${docCan} ${docChi}`);

  return CHI.map((chi, idx) => {
    const starIdx = (idx + startOffset) % 12;
    const star = GIO_THAN_SAT[starIdx] || GIO_THAN_SAT[0]!;
    const isHoangDao = hoangDaoList.includes(chi);

    const hourCanIdx = (startCanIdx + idx) % 10;
    const hourCan = CAN[hourCanIdx]!;
    const fullCanChi = `${hourCan} ${chi}`;
    const napAmHour = getNapAm(fullCanChi);

    const goodFactors: string[] = [];
    const badFactors: string[] = [];

    // 1. So Can Giờ vs Can Bác Sĩ
    if (THIEN_CAN_HOP_HOA[hourCan]?.partner === docCan) {
      goodFactors.push(`Can ngũ hợp (${hourCan} hợp ${docCan})`);
    } else if (THIEN_CAN_XUNG_PHA[hourCan]?.includes(docCan)) {
      badFactors.push(`Can xung khắc (${hourCan} phá ${docCan})`);
    }

    // 2. So Chi Giờ vs Chi Bác Sĩ
    const lucHopPairs = [
      ["Tý", "Sửu"], ["Dần", "Hợi"], ["Mão", "Tuất"],
      ["Thìn", "Dậu"], ["Tỵ", "Thân"], ["Ngọ", "Mùi"]
    ];
    if (lucHopPairs.some(p => (p[0] === chi && p[1] === docChi) || (p[1] === chi && p[0] === docChi))) {
      goodFactors.push(`Chi lục hợp (${chi} hợp ${docChi})`);
    }

    const tamHopGroups = [
      ["Thân", "Tý", "Thìn"], ["Dần", "Ngọ", "Tuất"],
      ["Tỵ", "Dậu", "Sửu"], ["Hợi", "Mão", "Mùi"]
    ];
    if (tamHopGroups.some(g => g.includes(chi) && g.includes(docChi) && chi !== docChi)) {
      goodFactors.push(`Chi tam hợp (${chi} - ${docChi})`);
    }

    const lucXungPairs = [
      ["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"],
      ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]
    ];
    if (lucXungPairs.some(p => (p[0] === chi && p[1] === docChi) || (p[1] === chi && p[0] === docChi))) {
      badFactors.push(`Chi trực xung (${chi} xung ${docChi})`);
    }

    const lucHaiPairs = [
      ["Tý", "Mùi"], ["Sửu", "Ngọ"], ["Dần", "Tỵ"],
      ["Mão", "Thìn"], ["Thân", "Hợi"], ["Dậu", "Tuất"]
    ];
    if (lucHaiPairs.some(p => (p[0] === chi && p[1] === docChi) || (p[1] === chi && p[0] === docChi))) {
      badFactors.push(`Chi lục hại (${chi} hại ${docChi})`);
    }

    // 3. So Nạp Âm Giờ vs Nạp Âm Bác Sĩ
    if (HANH_SINH_KHAC.sinh[napAmHour.element] === napAmDoc.element) {
      goodFactors.push(`Nạp âm giờ sinh Tuổi (${napAmHour.element} sinh ${napAmDoc.element})`);
    } else if (HANH_SINH_KHAC.sinh[napAmDoc.element] === napAmHour.element) {
      goodFactors.push(`Tuổi sinh Nạp âm giờ (${napAmDoc.element} sinh ${napAmHour.element})`);
    } else if (napAmHour.element === napAmDoc.element) {
      goodFactors.push(`Nạp âm đồng khí (${napAmHour.element})`);
    } else if (HANH_SINH_KHAC.khac[napAmHour.element] === napAmDoc.element) {
      badFactors.push(`Nạp âm giờ khắc Tuổi (${napAmHour.element} khắc ${napAmDoc.element})`);
    }

    const nGood = goodFactors.length;
    const nBad = badFactors.length;

    let rank = 5;
    let rankTitle = 'Hạng Năm (Tạm Dùng)';
    let badgeClass = 'gio-rank-neutral';
    let clinicalNote = 'Khung giờ bình hòa: Tiến hành đi buồng, khám bệnh và xử trí y lệnh thường quy.';

    if (nGood >= 3 && nBad === 0) {
      rank = 1;
      rankTitle = 'Hạng Nhất (Rất Nên Dùng)';
      badgeClass = 'gio-rank-great';
      clinicalNote = 'Khung giờ hoàng kim: Cực kỳ đại cát tiếp nhận ca khó, quyết định phác đồ đầu tay, hội chẩn liên viện hoặc giao ban ca trực.';
    } else if (nGood >= 2 && nBad === 0) {
      rank = 2;
      rankTitle = 'Hạng Nhì (Nên Dùng)';
      badgeClass = 'gio-rank-great';
      clinicalNote = 'Khung giờ rất tốt: Thích hợp hiệu chỉnh phác đồ phức tạp, thực hiện thăm dò chức năng chuyên sâu, ra y lệnh liều cao.';
    } else if (nGood >= 1 && nBad === 0) {
      rank = 3;
      rankTitle = 'Hạng Ba (Khá Nên Dùng)';
      badgeClass = 'gio-rank-good';
      clinicalNote = 'Khung giờ thuận lợi, tư duy sáng suốt, xử lý y lệnh nội trú nhịp nhàng.';
    } else if (nGood >= 2 && nBad === 1) {
      rank = 4;
      rankTitle = 'Hạng Tư (Khá Nên Dùng)';
      badgeClass = 'gio-rank-good';
      clinicalNote = 'Được nhiều hơn mất; chỉ cần rà soát lại tương tác thuốc và chức năng gan thận trước khi ký duyệt.';
    } else if (nGood === 1 && nBad === 1) {
      rank = 5;
      rankTitle = 'Hạng Năm (Tạm Dùng)';
      badgeClass = 'gio-rank-neutral';
      clinicalNote = 'Trạng thái cân bằng, y lệnh thường quy và đi buồng thực hiện ổn định.';
    } else if (nGood === 0 && nBad === 1) {
      rank = 6;
      rankTitle = 'Hạng Sáu (Chẳng Nên Dùng)';
      badgeClass = 'gio-rank-warn';
      clinicalNote = 'Có lực cản nhẹ; thận trọng khi xử trí các tình huống cấp bách, tránh hấp tấp.';
    } else if (nGood === 1 && nBad >= 2) {
      rank = 7;
      rankTitle = 'Hạng Bảy (Chẳng Nên Dùng)';
      badgeClass = 'gio-rank-warn';
      clinicalNote = 'Khắc nhiều hơn hợp; nếu là thay đổi phác đồ lớn nên cân nhắc dời sang khung giờ kế tiếp nếu ca không khẩn.';
    } else if (nGood === 0 && nBad === 2) {
      rank = 8;
      rankTitle = 'Hạng Tám (Quyết Không Dùng)';
      badgeClass = 'gio-rank-bad';
      clinicalNote = 'Phạm 2 cách xấu; không nên đổi thuốc mạo hiểm, cẩn trọng sai sót hành chính toa thuốc.';
    } else if (nBad >= 3) {
      rank = 9;
      rankTitle = 'Hạng Chín (Tuyệt Đối Chẳng Dùng)';
      badgeClass = 'gio-rank-bad';
      clinicalNote = 'Phạm đại xung khắc; chỉ can thiệp khi cấp cứu sinh mạng tối khẩn, bám sát hỗ trợ nhóm trực.';
    }

    return {
      chi,
      can: hourCan,
      fullCanChi,
      timeRange: GIO_TIME[chi] || '',
      starName: star.name,
      isHoangDao,
      napAm: napAmHour.name,
      napAmElement: napAmHour.element,
      rank,
      rankTitle,
      badgeClass,
      goodFactors,
      badFactors,
      clinicalNote
    };
  });
}

// ─── ĐÁNH GIÁ 5 TÁC VỤ LÂM SÀNG NỘI KHOA (CHƯƠNG II: 83 VỤ) ───────────
export function evaluateMedicalTasks(
  dateObj: Date,
  canNgay: string,
  chiNgay: string,
  trucNgay: TrucItem,
  saoTu: SaoTuItem,
  thanSatList: ThanSatItem[],
  doc: DoctorProfile,
  lunarDay: number,
  lunarMonth: number
): Record<MedicalTaskType, MedicalTaskScoreEvaluation> {
  const fullCanChi = `${canNgay} ${chiNgay}`;
  const results: Partial<Record<MedicalTaskType, MedicalTaskScoreEvaluation>> = {};

  const taskKeys: MedicalTaskType[] = [
    'kham_chandoan',
    'khoi_phacdo',
    'chinh_lieu_xuatvien',
    'khai_truong_kthuat',
    'hoi_chan_ebm'
  ];

  for (const key of taskKeys) {
    const cfg = MEDICAL_TASKS_CONFIG[key];
    const isSpecialDay = !!cfg.specialDays?.includes(fullCanChi);
    const isBaseDay = cfg.baseDays.includes(fullCanChi);

    let baseScore = isSpecialDay ? 8 : (isBaseDay ? 5 : 3);

    // 1. Sao Score
    let saoScore = 0;
    let saoNote = '';
    const dangVien = checkSaoDangVien(saoTu.name, chiNgay);
    if (dangVien.isDangVien) {
      saoScore += 2;
      saoNote = `Sao ${saoTu.name} Đăng Viên (+2đ): Khí tiết rạng rỡ, hoán hung hóa kiết.`;
    } else if (saoTu.type === 'cat') {
      saoScore += 1;
      saoNote = `Gặp Kiết Tú ${saoTu.name} (+1đ): Cát khí trợ lực.`;
    } else {
      saoScore -= 1;
      saoNote = `Gặp Hung Tú ${saoTu.name} (-1đ): Cần kiểm soát rủi ro.`;
    }

    // 2. Trực Score
    let trucScore = 0;
    let trucNote = '';
    if (cfg.hapTruc.includes(trucNgay.name)) {
      trucScore += 2;
      trucNote = `Trực ${trucNgay.name} Hạp Vụ (+2đ): Khởi đầu thuận lợi.`;
    } else if (cfg.kyTruc?.includes(trucNgay.name)) {
      trucScore -= 2;
      trucNote = `Trực ${trucNgay.name} Kỵ Vụ (-2đ): Kiêng kỵ theo quy tắc cổ truyền.`;
    }

    if (cfg.genderRules) {
      if (doc.gender === 'Nam' && cfg.genderRules.maleKyTruc?.includes(trucNgay.name)) {
        trucScore -= 1;
        trucNote += ' (Nam nhân phạm kỵ Trực Trừ -1đ)';
      } else if (doc.gender === 'Nữ' && cfg.genderRules.femaleKyTruc?.includes(trucNgay.name)) {
        trucScore -= 1;
        trucNote += ' (Nữ nhân phạm kỵ Trực Thâu -1đ)';
      }
    }

    // 3. Thần Sát Score
    let thanSatScore = 0;
    const thanNotes: string[] = [];
    for (const ts of thanSatList) {
      if (cfg.hapThanSat?.includes(ts.name) || (ts.type === 'pos' && cfg.hapThanSat?.some(h => ts.name.includes(h)))) {
        thanSatScore += 1;
        thanNotes.push(`Đắc ${ts.name} (+1đ)`);
      }
      if (cfg.kyThanSat?.includes(ts.name) || (ts.type === 'neg' && cfg.kyThanSat?.some(k => ts.name.includes(k)))) {
        thanSatScore -= 2;
        thanNotes.push(`Phạm ${ts.name} (-2đ)`);
      }
    }
    const thanSatNote = thanNotes.length > 0 ? thanNotes.join(', ') : 'Thần sát bình hòa';

    const totalScore = Math.max(0, baseScore + saoScore + trucScore + thanSatScore);

    let recommendation: 'rat_tot' | 'tot' | 'binh_thuong' | 'khong_nen' = 'binh_thuong';
    let advice = '';

    if (totalScore >= 8 || isSpecialDay) {
      recommendation = 'rat_tot';
      advice = isSpecialDay
        ? `🌟 Ngày Tối Thượng ${fullCanChi} cho ${cfg.shortTitle}: Đại cát đại lợi, biện luận hanh thông, người bệnh mau hồi phục.`
        : `Thời điểm rất tốt (${totalScore}đ): Hội tụ nhiều yếu tố hạp vụ, rất nên tiến hành.`;
    } else if (totalScore >= 6) {
      recommendation = 'tot';
      advice = `Ngày thuận lợi (${totalScore}đ): Thích hợp khởi động, mọi việc diễn ra suôn sẻ.`;
    } else if (totalScore >= 4) {
      recommendation = 'binh_thuong';
      advice = `Ngày ổn định (${totalScore}đ): Thực hiện theo đúng quy trình thường quy tiêu chuẩn.`;
    } else {
      recommendation = 'khong_nen';
      advice = `Khí tiết chưa thuận (${totalScore}đ): Nếu là thay đổi phác đồ lớn không cấp bách, nên cân nhắc chọn ngày cát lợi hơn.`;
    }

    results[key] = {
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
  }

  return results as Record<MedicalTaskType, MedicalTaskScoreEvaluation>;
}

// ─── ĐÁNH GIÁ 4 TRỤ CỘT HÀNH ĐỘNG LÂM SÀNG NỘI KHOA ───────────────────

export function evaluateClinicalAdvice(
  totalScore: number,
  truc: TrucItem,
  saoTu: SaoTuItem,
  bio: BiorhythmResult,
  diaChi: DiaChiRelationResult,
  specialty: DoctorSpecialty = 'internal_general'
): ClinicalAdvice {
  const isGreatDay = totalScore >= 65 && ['Định', 'Thành', 'Khai', 'Kiến'].includes(truc.name) && saoTu.type === 'cat';
  const isCautionDay = truc.type === 'hung' || saoTu.type === 'hung' || diaChi.lucXung.isMatch;

  let diagnosis: ClinicalAdviceItem;
  let pharmacotherapy: ClinicalAdviceItem;
  let communication: ClinicalAdviceItem;
  let evidence: ClinicalAdviceItem;

  // 1. Trụ Cột: Chẩn Đoán & Biện Luận Ca Khó (Diagnostic Workup)
  if (isGreatDay && bio.intellectual >= 20) {
    diagnosis = {
      status: 'good',
      title: 'Chẩn Đoán Phân Biệt & Ca Khó',
      text: 'Tư duy sắc sảo, liên kết triệu chứng đa cơ quan mạch lạc; thời điểm vàng tìm ra căn nguyên ẩn giấu của ca bệnh khó.'
    };
  } else if (isCautionDay || bio.intellectual <= -35) {
    diagnosis = {
      status: 'caution',
      title: 'Chẩn Đoán Phân Biệt & Ca Khó',
      text: 'Cẩn trọng bẫy thiên lệch nhận thức (Anchoring Bias); rà soát kỹ chẩn đoán phân biệt và đối chiếu xét nghiệm bất thường.'
    };
  } else {
    diagnosis = {
      status: 'neutral',
      title: 'Chẩn Đoán Phân Biệt & Ca Khó',
      text: 'Phân tích cận lâm sàng và triệu chứng theo quy trình tiếp cận chuẩn, theo dõi sát diễn biến lâm sàng.'
    };
  }

  // 2. Trụ Cột: Dược Trị Liệu & Tối Ưu Y Lệnh (Pharmacotherapy)
  if (isGreatDay && bio.intuitive >= 15) {
    pharmacotherapy = {
      status: 'good',
      title: 'Dược Trị Liệu & Tối Ưu Phác Đồ',
      text: 'Thời điểm rất thuận lợi khởi động phác đồ kháng sinh đích, thuốc hạ áp mới, thuốc sinh học hoặc hiệu chỉnh insulin.'
    };
  } else if (isCautionDay) {
    pharmacotherapy = {
      status: 'caution',
      title: 'Dược Trị Liệu & Tối Ưu Phác Đồ',
      text: 'Kiểm tra chéo chức năng thận (eGFR), gan và tương tác thuốc (DDI) trước khi tăng liều các thuốc có khoảng trị liệu hẹp.'
    };
  } else {
    pharmacotherapy = {
      status: 'neutral',
      title: 'Dược Trị Liệu & Tối Ưu Phác Đồ',
      text: 'Duy trì y lệnh thuốc theo protocol hiện tại, đánh giá đáp ứng sau 48–72 giờ điều trị.'
    };
  }

  // 3. Trụ Cột: Giao Tiếp Bệnh Mạn & Tiên Lượng (Communication)
  if (bio.emotional >= 20 && !diaChi.lucHai.isMatch) {
    communication = {
      status: 'good',
      title: 'Giao Tiếp & Tư Vấn Bệnh Mạn',
      text: 'Năng lượng thấu cảm dồi dào, giải thích cặn kẽ cơ chế bệnh và kế hoạch dùng thuốc, người bệnh tin tưởng và tuân thủ cao.'
    };
  } else if (diaChi.lucHai.isMatch || bio.emotional <= -30) {
    communication = {
      status: 'caution',
      title: 'Giao Tiếp & Tư Vấn Bệnh Mạn',
      text: 'Nguy cơ hiểu lầm thông tin; cần giải thích ngắn gọn, từ tốn, ghi chép biên bản hội chẩn rõ ràng và có điều dưỡng chứng kiến.'
    };
  } else {
    communication = {
      status: 'neutral',
      title: 'Giao Tiếp & Tư Vấn Bệnh Mạn',
      text: 'Hướng dẫn kỹ toa thuốc điều trị, dặn dò các dấu hiệu cảnh báo đỏ cần tái khám ngay.'
    };
  }

  // 4. Trụ Cột: Tra Cứu EBM & Sinh Hoạt Khoa Phòng (Evidence & Grand Rounds)
  if (saoTu.name === 'Bích' || saoTu.name === 'Đẩu' || bio.intellectual >= 30) {
    evidence = {
      status: 'good',
      title: 'Tra Cứu EBM & Hội Chẩn Liên Khoa',
      text: 'Thời điểm rất tốt cập nhật thử nghiệm RCTs mới, sinh hoạt khoa học Grand Rounds và bảo vệ phác đồ trên bằng chứng EBM.'
    };
  } else {
    evidence = {
      status: 'neutral',
      title: 'Tra Cứu EBM & Hội Chẩn Liên Khoa',
      text: 'Duy trì rà soát các khuyến cáo chuyên khoa (AHA/ACC, ESC, GOLD, ADA, KDIGO) áp dụng cho ca lâm sàng.'
    };
  }

  return { diagnosis, pharmacotherapy, communication, evidence };
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
    hanhMenh: "Thổ",
    specialty: "internal_general"
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
    hanhMenh: (profile.hanhMenh as any) || "Thổ",
    specialty: (profile.specialty as DoctorSpecialty) || "internal_general"
  };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

// ─── ĐÁNH GIÁ CHỈ SỐ NGÀY TỔNG HỢP NỘI KHOA ───────────────────────────

export function evaluateDayScore(dateObj: Date = new Date(), customDoc?: DoctorProfile): DayScoreEvaluation {
  const doc = customDoc || getDoctorProfile();
  const specialty = doc.specialty || 'internal_general';
  const canChiDay = getCanChiDay(dateObj);
  const lunar = getApproxLunarDate(dateObj);

  // 1. So sánh Can Ngày vs Can Tuổi
  const hanhNgay = NGU_HANH_CAN[canChiDay.can] || 'Thổ';
  const hanhNamSinh = NGU_HANH_CAN[doc.canNam] || 'Thổ';
  let b1 = { level: 3, text: "Bình hòa", score: 25 };
  if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhNamSinh) {
    b1 = { level: 1, text: "Can ngày sinh Can tuổi (Rất tốt)", score: 40 };
  } else if (HANH_SINH_KHAC.sinh[hanhNamSinh] === hanhNgay) {
    b1 = { level: 2, text: "Can tuổi sinh Can ngày (Khá tốt)", score: 32 };
  } else if (hanhNgay === hanhNamSinh) {
    b1 = { level: 3, text: "Can ngày đồng hành Can tuổi", score: 25 };
  } else if (HANH_SINH_KHAC.khac[hanhNamSinh] === hanhNgay) {
    b1 = { level: 4, text: "Can tuổi khắc Can ngày", score: 15 };
  } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhNamSinh) {
    b1 = { level: 5, text: "Can ngày khắc Can tuổi", score: 5 };
  }

  // 2. Can Chi Ngày
  const hanhChi = NGU_HANH_CHI[canChiDay.chi] || 'Thổ';
  let canChiNgayScore = { level: 3, text: "Bình hòa", score: 0 };
  if (HANH_SINH_KHAC.sinh[hanhNgay] === hanhChi) {
    canChiNgayScore = { level: 1, text: "Bảo Nhật (Can sinh Chi - Cát)", score: 12 };
  } else if (HANH_SINH_KHAC.sinh[hanhChi] === hanhNgay) {
    canChiNgayScore = { level: 2, text: "Thoa Nhật (Chi sinh Can - Khá)", score: 8 };
  } else if (hanhNgay === hanhChi) {
    canChiNgayScore = { level: 3, text: "Bát Chuyên (Đồng khí)", score: 4 };
  } else if (HANH_SINH_KHAC.khac[hanhChi] === hanhNgay) {
    canChiNgayScore = { level: 4, text: "Chế Nhật (Chi khắc Can - Thận trọng)", score: -8 };
  } else if (HANH_SINH_KHAC.khac[hanhNgay] === hanhChi) {
    canChiNgayScore = { level: 5, text: "Phạt Nhật (Can khắc Chi - Xấu)", score: -12 };
  }

  // 3. Tương tác Địa Chi Bác Sĩ vs Ngày
  const diaChiRelations = kiemTraDiaChi(doc.chiNam, canChiDay.chi);

  // 4. Thiên Ất Quý Nhân & Lộc Thần
  const quyNhanLoc = kiemTraQuyNhanLoc(doc.canNam, canChiDay.can, canChiDay.chi);

  // 5. Ngũ Hành Bản Mệnh
  let b3Point = 0;
  const b3Detail: string[] = [];
  if (HANH_SINH_KHAC.sinh[hanhNgay] === doc.hanhMenh) {
    b3Point += 8;
    b3Detail.push("Hành ngày tương sinh Bản Mệnh (+8đ)");
  } else if (hanhNgay === doc.hanhMenh) {
    b3Point += 4;
    b3Detail.push("Hành ngày đồng hành Bản Mệnh (+4đ)");
  }

  // 6. Ngày Kỵ / Cát Âm Lịch
  const tamNuong = [3, 7, 13, 18, 22, 27];
  const tamCuong = [8, 18, 28];
  const nguyetKy = [5, 14, 23];
  const lucNhamCat = [6, 16, 26];
  const b4Errors: string[] = [];
  const b4Bonuses: string[] = [];
  let b4Penalty = 0;
  let b4BonusPoint = 0;

  if (tamNuong.includes(lunar.day)) { b4Errors.push("Phạm ngày Tam Nương (-15đ)"); b4Penalty += 15; }
  if (tamCuong.includes(lunar.day)) { b4Errors.push("Phạm ngày Tam Cường (-10đ)"); b4Penalty += 10; }
  if (nguyetKy.includes(lunar.day)) { b4Errors.push("Phạm ngày Nguyệt Kỵ (-12đ)"); b4Penalty += 12; }
  if (lunar.day === 1) { b4Errors.push("Mùng 1 đầu tháng (Sóc) (-4đ)"); b4Penalty += 4; }
  if (canChiDay.can === "Quý" && canChiDay.chi === "Hợi") { b4Errors.push("Ngày Quý Hợi (Cùng Cực) (-15đ)"); b4Penalty += 15; }
  if (lunar.day === 15) { b4Bonuses.push("Ngày Vọng (Trăng tròn đại cát) (+4đ)"); b4BonusPoint += 4; }
  if (lucNhamCat.includes(lunar.day)) { b4Bonuses.push("Ngày Lục Nhâm Cát (+5đ)"); b4BonusPoint += 5; }

  // 7. Nhị Thập Bát Tú & Sao Đăng Viên
  const saoTu = getSaoTu(dateObj, canChiDay.jdn);
  const saoTuDangVien = checkSaoDangVien(saoTu.name, canChiDay.chi);

  // 8. Trực Ngày, Tiết Khí, Thần Sát Y Khoa Chuyên Sâu
  const trucNgay = getTrucNgay(lunar.month, canChiDay.chi);
  const tietKhiInfo = getTietKhiInfo(dateObj);
  const thanSat = kiemTraThanSat(lunar.month, canChiDay.can, canChiDay.chi, doc.canNam);

  // 9. Nạp Âm 60 Hoa Giáp Đối Chiếu
  const napAmDay = getNapAm(canChiDay.full);
  const napAmDoc = getNapAm(`${doc.canNam} ${doc.chiNam}`);
  const napAmRelation = evaluateNapAmRelation(napAmDoc, napAmDay);

  // 10. Biorhythms 4 Trục Nội Khoa Chuyên Sâu
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const bio = calculateBiorhythms(birthDate, dateObj, specialty);

  // Tổng hợp điểm chuẩn hóa
  const basePoint = 20;
  const rawTotal = basePoint + b1.score + canChiNgayScore.score
                 + diaChiRelations.totalScore + quyNhanLoc.totalScore
                 + b3Point - b4Penalty + b4BonusPoint
                 + saoTu.score + saoTuDangVien.bonusScore
                 + trucNgay.score + tietKhiInfo.tietKhi.score
                 + (tietKhiInfo.tuLyTuTuyet ? tietKhiInfo.tuLyTuTuyet.score : 0)
                 + thanSat.score + bio.totalBioScore
                 + napAmRelation.score;

  const total = Math.round(Math.min(100, Math.max(0, rawTotal)));

  let rating = "Bình Hòa";
  let badgeClass = "day-rating-neutral";
  let icon = "⚖️";
  let summaryText = "Ngày cân bằng, mọi công việc lâm sàng nội trú diễn ra theo đúng protocol chuẩn.";

  if (total >= 82) {
    rating = "Đại Cát";
    badgeClass = "day-rating-great";
    icon = "🌟";
    summaryText = `Đại cát hanh thông (${saoTu.name} Tinh${saoTuDangVien.isDangVien ? ' Đăng Viên' : ''} & Trực ${trucNgay.name}): Thời điểm vàng cho các quyết định điều trị phức tạp, tiếp nhận ca khó & hội chẩn EBM.`;
  } else if (total >= 65) {
    rating = "Cát Lành";
    badgeClass = "day-rating-good";
    icon = "✨";
    summaryText = `Khí tiết thuận hòa (${saoTu.name} Tinh): Năng lượng làm việc và độ tập trung chẩn đoán nội khoa đạt hiệu suất cao.`;
  } else if (total >= 45) {
    rating = "Bình Hòa";
    badgeClass = "day-rating-neutral";
    icon = "⚖️";
    summaryText = `Trạng thái ổn định: Thích hợp tái khám, ra y lệnh định kỳ, rà soát hồ sơ & sinh hoạt chuyên đề EBM.`;
  } else if (total >= 25) {
    rating = "Thận Trọng";
    badgeClass = "day-rating-warn";
    icon = "⚠️";
    summaryText = `Có yếu tố khắc nhẹ hoặc khí tiết phân tán: Chú ý rà soát kỹ bảng kiểm an toàn thuốc và chức năng tạng.`;
  } else {
    rating = "Đại Hung";
    badgeClass = "day-rating-bad";
    icon = "⛔";
    summaryText = `Phạm nhiều hung tinh / Lục xung: Thận trọng cao độ, kiểm tra chéo y lệnh thuốc 2 lần trước khi ký duyệt.`;
  }

  const advice = evaluateClinicalAdvice(total, trucNgay, saoTu, bio, diaChiRelations, specialty);
  const hoangDaoList = HOANG_DAO_MAP[canChiDay.chi] || [];
  const hoangDaoHours = hoangDaoList.map(chi => `${chi} (${GIO_TIME[chi] || ''})`);
  const gioTimeline = calculateGioTimeline(canChiDay.chi, dateObj.getHours());

  const gioRanks = calculateGioRanks9Bậc(canChiDay.can, canChiDay.chi, doc);
  const medicalTasks = evaluateMedicalTasks(
    dateObj,
    canChiDay.can,
    canChiDay.chi,
    trucNgay,
    saoTu,
    thanSat.list,
    doc,
    lunar.day,
    lunar.month
  );

  const dateKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  const formattedDate = dateObj.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });

  return {
    total,
    rawTotal,
    rating,
    icon,
    badgeClass,
    summaryText,
    dateObj,
    dateKey,
    formattedDate,
    lunarDay: lunar.day,
    lunarMonth: lunar.month,
    canChiDay: canChiDay.full,
    canNgay: canChiDay.can,
    chiNgay: canChiDay.chi,
    hanhNgay,
    docProfile: doc,
    b1,
    canChiNgayScore,
    diaChiRelations,
    quyNhanLoc,
    b3: { point: b3Point, detail: b3Detail },
    b4: { errors: b4Errors, bonuses: b4Bonuses, penalty: b4Penalty, bonusPoint: b4BonusPoint },
    saoTu,
    saoTuDangVien,
    trucNgay,
    tietKhiInfo,
    thanSat,
    bio,
    advice,
    hoangDaoHours,
    gioTimeline,
    napAmDay,
    napAmDoc,
    napAmRelation,
    medicalTasks,
    gioRanks
  };
}

// ─── TÍNH TOÁN DỰ BÁO 7 NGÀY ──────────────────────────────────────────

export function getWeekEvaluation(startDate: Date = new Date(), customDoc?: DoctorProfile): WeekDaySummary[] {
  const doc = customDoc || getDoctorProfile();
  const weekList: WeekDaySummary[] = [];
  const todayKey = new Date().toDateString();

  let highestScore = -1;
  let bestIndex = 0;

  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate.getTime() + i * 86400000);
    const evalData = evaluateDayScore(d, doc);
    const dayOfWeek = d.toLocaleDateString('vi-VN', { weekday: 'short' });
    const dateFormatted = `${d.getDate()}/${d.getMonth() + 1}`;
    const lunarFormatted = `${evalData.lunarDay}/${evalData.lunarMonth} Âm`;

    if (evalData.total > highestScore) {
      highestScore = evalData.total;
      bestIndex = i;
    }

    weekList.push({
      date: d,
      dateKey: evalData.dateKey,
      dayOfWeek,
      dateFormatted,
      lunarFormatted,
      canChi: evalData.canChiDay,
      saoTu: evalData.saoTu.name,
      truc: evalData.trucNgay.name,
      score: evalData.total,
      rating: evalData.rating,
      badgeClass: evalData.badgeClass,
      icon: evalData.icon,
      isToday: d.toDateString() === todayKey,
      isBestDay: false,
      evalData
    });
  }

  if (weekList[bestIndex]) {
    weekList[bestIndex]!.isBestDay = true;
  }

  return weekList;
}

// ─── BỘ TÌM NGÀY ĐẸP LÂM SÀNG NỘI KHOA (CLINICAL DATE FINDER) ─────────

export function findBestClinicalDays(
  purpose: 'diagnosis' | 'pharmacotherapy' | 'discharge' | 'ebm' | 'clinic' = 'diagnosis',
  daysAhead: number = 30,
  customDoc?: DoctorProfile
): BestClinicalDayResult[] {
  const doc = customDoc || getDoctorProfile();
  const today = new Date();
  const scoredDays: { evalData: DayScoreEvaluation; matchScore: number; matchReasons: string[] }[] = [];

  const purposeNames: Record<string, string> = {
    diagnosis: "Tiếp Nhận & Chẩn Đoán Ca Khó Nội Khoa",
    pharmacotherapy: "Khởi Đầu Phác Đồ Trị Liệu / Thuốc Mới",
    discharge: "Đánh Giá Xuất Viện An Toàn & Xuống Thang",
    ebm: "Hội Chẩn Liên Khoa & Báo Cáo EBM",
    clinic: "Khai Trương Phòng Khám / Thăm Dò Chức Năng"
  };

  for (let i = 0; i < daysAhead; i++) {
    const d = new Date(today.getTime() + i * 86400000);
    const evalData = evaluateDayScore(d, doc);
    let matchScore = evalData.total;
    const matchReasons: string[] = [];

    if (purpose === 'diagnosis') {
      const taskEval = evalData.medicalTasks.kham_chandoan;
      matchScore += taskEval.totalScore * 3;
      if (taskEval.isSpecialDay) {
        matchScore += 30;
        matchReasons.push(`🌟 Ngày Tối Thượng ${evalData.canChiDay} (Vụ 81: Khám & Biện Luận Ca Khó)`);
      }
      if (evalData.bio.intellectual >= 30) {
        matchScore += 12;
        matchReasons.push(`Trí tuệ sáng suốt đỉnh cao (${evalData.bio.intellectual}%)`);
      }
      if (evalData.bio.intuitive >= 25) {
        matchScore += 8;
        matchReasons.push(`Trực giác lâm sàng nhạy bén (${evalData.bio.intuitive}%)`);
      }
      if (evalData.saoTu.type === 'cat') {
        matchReasons.push(`Sao ${evalData.saoTu.name} Tinh (Cát tinh trợ lực)`);
      }
    } else if (purpose === 'pharmacotherapy') {
      const taskEval = evalData.medicalTasks.khoi_phacdo;
      matchScore += taskEval.totalScore * 3;
      if (['Trừ', 'Khai', 'Thành'].includes(evalData.trucNgay.name)) {
        matchScore += 15;
        matchReasons.push(`Trực ${evalData.trucNgay.name} (Hạp khởi đầu phác đồ)`);
      }
      if (evalData.bio.intellectual >= 20) {
        matchScore += 10;
        matchReasons.push(`Tư duy dược lý an toàn (${evalData.bio.intellectual}%)`);
      }
      if (taskEval.thanSatScore > 0) {
        matchReasons.push(taskEval.thanSatNote);
      }
    } else if (purpose === 'discharge') {
      const taskEval = evalData.medicalTasks.chinh_lieu_xuatvien;
      matchScore += taskEval.totalScore * 3;
      if (['Thành', 'Bình', 'Trừ'].includes(evalData.trucNgay.name)) {
        matchScore += 15;
        matchReasons.push(`Trực ${evalData.trucNgay.name} (An định, thích hợp ra viện)`);
      }
      if (evalData.bio.emotional >= 20) {
        matchScore += 10;
        matchReasons.push(`Giao tiếp thân nhân chu đáo (${evalData.bio.emotional}%)`);
      }
    } else if (purpose === 'ebm') {
      const taskEval = evalData.medicalTasks.hoi_chan_ebm;
      matchScore += taskEval.totalScore * 3;
      if (['Bích', 'Trương', 'Đẩu', 'Cơ'].includes(evalData.saoTu.name)) {
        matchScore += 20;
        matchReasons.push(`Sao ${evalData.saoTu.name} (Văn chương y thuật & nghiên cứu đỗ đạt)`);
      }
      if (evalData.diaChiRelations.tamHop.isMatch) {
        matchScore += 15;
        matchReasons.push("Tam Hợp Cát Tinh (Đồng nghiệp & chuyên gia đồng thuận cao)");
      }
    } else if (purpose === 'clinic') {
      const taskEval = evalData.medicalTasks.khai_truong_kthuat;
      matchScore += taskEval.totalScore * 3;
      if (evalData.quyNhanLoc.locThan.isMatch) {
        matchScore += 20;
        matchReasons.push("Đắc Lộc Thần (Y nghiệp hưng vượng, người bệnh tin tưởng)");
      }
      if (['Khai', 'Thành', 'Mãn'].includes(evalData.trucNgay.name)) {
        matchScore += 15;
        matchReasons.push(`Trực ${evalData.trucNgay.name} (Khai trương đại cát)`);
      }
    }

    scoredDays.push({ evalData, matchScore, matchReasons });
  }

  scoredDays.sort((a, b) => b.matchScore - a.matchScore);
  const top5 = scoredDays.slice(0, 5);

  return top5.map((item, idx) => ({
    rank: idx + 1,
    purpose,
    purposeName: purposeNames[purpose] || "Lâm sàng Nội khoa",
    evalData: item.evalData,
    matchReasons: item.matchReasons,
    score: item.evalData.total
  }));
}

// ─── LỊCH THÁNG HEATMAP (30-DAY MATRIX) ────────────────────────────────

export function getMonthEvaluation(
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth() + 1,
  customDoc?: DoctorProfile
): DayScoreEvaluation[] {
  const doc = customDoc || getDoctorProfile();
  const daysInMonth = new Date(year, month, 0).getDate();
  const result: DayScoreEvaluation[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month - 1, d);
    result.push(evaluateDayScore(dateObj, doc));
  }

  return result;
}

// ─── XUẤT FILE LỊCH ICAL (.ICS) & SAO CHÉP TÓM TẮT BÁO CÁO ────────────

export function generateICSContent(evalData: DayScoreEvaluation): string {
  const d = evalData.dateObj;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dtStr = `${year}${month}${day}`;

  const hdText = evalData.hoangDaoHours.slice(0, 4).join(', ');
  const desc = `Điểm số Nội khoa: ${evalData.total}/100 (${evalData.rating})\\nCan Chi: ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})\\nSao: ${evalData.saoTu.name} • Trực: ${evalData.trucNgay.name}\\nGiờ Hoàng Đạo: ${hdText}\\n\\nKhuyến nghị Nội khoa: ${evalData.summaryText}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CliniPortal//Internal Medicine Clinical Date Intelligence//VI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:cliniportal-internal-${evalData.dateKey}@cliniportal.vn`,
    `DTSTAMP:${dtStr}T080000Z`,
    `DTSTART;VALUE=DATE:${dtStr}`,
    `DTEND;VALUE=DATE:${dtStr}`,
    `SUMMARY:🌟 [Ngày Tốt Nội Khoa ${evalData.total}đ] ${evalData.canChiDay} - ${evalData.rating}`,
    `DESCRIPTION:${desc}`,
    "STATUS:CONFIRMED",
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

export function downloadICSFile(evalData: DayScoreEvaluation): void {
  const content = generateICSContent(evalData);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `NgayTot_NoiKhoa_${evalData.dateKey}_CliniPortal.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyDaySummaryText(evalData: DayScoreEvaluation): string {
  const hdText = evalData.hoangDaoHours.join(' • ');
  const text = `🌟 [CLINIPORTAL NỘI KHOA] PHÂN TÍCH CHỈ SỐ NGÀY TỐT\n📅 Ngày: ${evalData.formattedDate}\n☯️ Bát tự: ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})\n🎯 Điểm sẵn sàng Nội khoa: ${evalData.total}/100 — ${evalData.rating} ${evalData.icon}\n✨ Nhị thập bát tú: Sao ${evalData.saoTu.name} (${evalData.saoTu.desc})\n📜 12 Trực: Trực ${evalData.trucNgay.name} (${evalData.trucNgay.desc})\n⏰ Giờ Hoàng Đạo: ${hdText}\n💡 Kế hoạch lâm sàng Nội khoa: ${evalData.summaryText}`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
  return text;
}

// ─── WIDGET NĂNG LƯỢNG CA TRỰC NỘI KHOA & CIRCADIAN ───────────────────

export function calculateShiftEnergy(dateObj: Date = new Date()): ShiftEnergyData {
  const h = dateObj.getHours();
  const doc = getDoctorProfile();
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const bio = calculateBiorhythms(birthDate, dateObj, doc.specialty);

  let circVal = 75;
  let phase = "Ban ngày — Bình ổn";
  let peak = "08:30 - 11:30";
  let fatigue: string | null = null;
  let caffeine = "Bổ sung đủ nước (500ml), hạn chế caffeine sau 16:00.";

  if (h >= 8 && h < 12) {
    circVal = 92;
    phase = "Đỉnh Cao Buổi Sáng (Peak Focus)";
    peak = "08:30 - 11:30 (Khung giờ vàng đi buồng, hội chẩn & phân tích ca khó)";
    caffeine = "1 tách trà xanh hoặc cà phê sáng giúp tối ưu tư duy chẩn đoán.";
  } else if (h >= 12 && h < 14) {
    circVal = 62;
    phase = "Trầm Lắng Giữa Ngày (Post-Lunch Dip)";
    peak = "14:30 - 17:00";
    fatigue = "Sinh lý buồn ngủ tự nhiên sau ăn trưa, nên nghỉ ngơi 15-20 phút.";
    caffeine = "Tránh uống cà phê đặc ngay sau ăn, ưu tiên đi dạo nhẹ.";
  } else if (h >= 14 && h < 18) {
    circVal = 85;
    phase = "Hưng Phấn Chiều (Afternoon Surge)";
    peak = "15:00 - 17:30 (Thích hợp khám phòng khám nội & giao ban ca trực)";
    caffeine = "Uống nước ấm, vận động co giãn cơ bắp cổ vai gáy.";
  } else if (h >= 18 && h < 22) {
    circVal = 70;
    phase = "Ca Trực Tối (Evening Shift)";
    peak = "19:00 - 21:00 (Tiếp nhận phân loại & rà soát y lệnh cấp cứu)";
    caffeine = "Uống nước lọc, không dùng nước tăng lực kích thích mạnh.";
  } else {
    circVal = 50;
    phase = "Ca Đêm Sâu (Night Shift Window)";
    peak = "Duy trì trạng thái tỉnh táo an toàn";
    fatigue = "Khung giờ 02:00 - 05:00 là điểm đáy sinh học, chú ý kiểm tra chéo y lệnh cấp cứu.";
    caffeine = "Chợp mắt ngắn 15 phút (Power Nap) khi khoa phòng yên tĩnh.";
  }

  const bioMod = (bio.physical + bio.intellectual) / 10;
  const energyPercent = Math.min(99, Math.max(35, Math.round(circVal + bioMod)));

  let statusText = "Sung Sức";
  let statusClass = "high";
  let icon = "⚡";
  if (energyPercent >= 85) {
    statusText = "Sung Sức";
    statusClass = "high";
    icon = "⚡";
  } else if (energyPercent >= 70) {
    statusText = "Sẵn Sàng";
    statusClass = "high";
    icon = "🔋";
  } else if (energyPercent >= 55) {
    statusText = "Vừa Phải";
    statusClass = "med";
    icon = "☕";
  } else {
    statusText = "Cần Nghỉ";
    statusClass = "low";
    icon = "🛌";
  }

  const safetyChecklist = [
    "✅ Kiểm tra định danh người bệnh (Họ tên + Năm sinh)",
    "✅ Rà soát chức năng thận (eGFR) & dị ứng trước khi ký y lệnh",
    "✅ Đối chiếu thuốc 5 Đúng & giải trừ tương tác thuốc (DDI)",
    "✅ Bàn giao ca trực nội trú chuẩn mực theo mô hình SBAR"
  ];

  return {
    energyPercent,
    statusText,
    statusClass,
    icon,
    circadianPhase: phase,
    peakHours: peak,
    fatigueWarning: fatigue,
    caffeineTip: caffeine,
    safetyChecklist
  };
}
