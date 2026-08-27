/**
 * CliniPortal 2.0 — Good Day Calculation Engine & Biorhythms Algorithm
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
  ShiftEnergyData
} from './good-day-types';

export const SPECIALTY_METAS: Record<DoctorSpecialty, SpecialtyMeta> = {
  surgery: {
    id: 'surgery',
    name: 'Ngoại khoa & Phẫu thuật / Can thiệp',
    shortName: 'Ngoại khoa & PT',
    icon: '🔪',
    description: 'Ưu tiên thể lực bền bỉ, độ vững vàng của bàn tay và an toàn chu phẫu.',
    weights: { physical: 0.50, intellectual: 0.20, emotional: 0.10, intuitive: 0.20 }
  },
  icu_er: {
    id: 'icu_er',
    name: 'Hồi sức & Cấp cứu (ICU / CCU / ER)',
    shortName: 'Hồi sức & Cấp cứu',
    icon: '⚡',
    description: 'Ưu tiên trực giác lâm sàng nhạy bén, phản xạ xử trí giờ vàng và kiểm soát sốc.',
    weights: { physical: 0.25, intellectual: 0.25, emotional: 0.15, intuitive: 0.35 }
  },
  internal: {
    id: 'internal',
    name: 'Nội khoa Điều trị & Ca khó',
    shortName: 'Nội khoa Điều trị',
    icon: '🧠',
    description: 'Ưu tiên tư duy chẩn đoán nhiều tầng, tối ưu hóa phối hợp thuốc và hội chẩn EBM.',
    weights: { physical: 0.15, intellectual: 0.50, emotional: 0.15, intuitive: 0.20 }
  },
  psych_onco_peds: {
    id: 'psych_onco_peds',
    name: 'Tâm thần, Ung bướu, Nhi & CS Giảm nhẹ',
    shortName: 'Tâm thần / Ung bướu / Nhi',
    icon: '💬',
    description: 'Ưu tiên năng lượng thấu cảm, kỹ năng giao tiếp mô hình SPIKES và tâm lý trị liệu.',
    weights: { physical: 0.10, intellectual: 0.20, emotional: 0.55, intuitive: 0.15 }
  },
  tcm_rehab: {
    id: 'tcm_rehab',
    name: 'Y học cổ truyền & Phục hồi chức năng',
    shortName: 'YHCT & PHCN',
    icon: '🌿',
    description: 'Ưu tiên hòa hợp khí tiết 24 tiết khí, khai huyệt Tý-Ngọ Lưu Chú và vận động trị liệu.',
    weights: { physical: 0.35, intellectual: 0.20, emotional: 0.15, intuitive: 0.30 }
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
  PROFILE_KEY
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
      tamHop = { isMatch: true, text: `Tam Hợp Cát Tinh (${chiNamDoc} - ${chiNgay}): Quý nhân đồng hành, hanh thông`, score: 15 };
      break;
    }
  }

  const lucHopPairs = [
    ["Tý", "Sửu"], ["Dần", "Hợi"], ["Mão", "Tuất"],
    ["Thìn", "Dậu"], ["Tỵ", "Thân"], ["Ngọ", "Mùi"]
  ];
  let lucHop = { isMatch: false, text: "Không phạm Lục Hợp", score: 0 };
  for (const p of lucHopPairs) {
    if ((p[0] === chiNamDoc && p[1] === chiNgay) || (p[1] === chiNamDoc && p[0] === chiNgay)) {
      lucHop = { isMatch: true, text: `Lục Hợp Hài Hòa (${chiNamDoc} hợp ${chiNgay}): Thầy thuốc - Bệnh nhân tâm đầu ý hợp`, score: 10 };
      break;
    }
  }

  const lucXungPairs = [
    ["Tý", "Ngọ"], ["Sửu", "Mùi"], ["Dần", "Thân"],
    ["Mão", "Dậu"], ["Thìn", "Tuất"], ["Tỵ", "Hợi"]
  ];
  let lucXung = { isMatch: false, text: "Không phạm Lục Xung", score: 0 };
  for (const p of lucXungPairs) {
    if ((p[0] === chiNamDoc && p[1] === chiNgay) || (p[1] === chiNamDoc && p[0] === chiNgay)) {
      lucXung = { isMatch: true, text: `Phạm Lục Xung (${chiNgay} xung tuổi ${chiNamDoc}): Cẩn trọng áp lực ca mổ & ca trực`, score: -18 };
      break;
    }
  }

  const lucHaiPairs = [
    ["Tý", "Mùi"], ["Sửu", "Ngọ"], ["Dần", "Tỵ"],
    ["Mão", "Thìn"], ["Thân", "Hợi"], ["Dậu", "Tuất"]
  ];
  let lucHai = { isMatch: false, text: "Không phạm Lục Hại", score: 0 };
  for (const p of lucHaiPairs) {
    if ((p[0] === chiNamDoc && p[1] === chiNgay) || (p[1] === chiNamDoc && p[0] === chiNgay)) {
      lucHai = { isMatch: true, text: `Phạm Lục Hại (${chiNgay} hại ${chiNamDoc}): Cẩn trọng giao tiếp, tránh hiểu lầm người nhà`, score: -10 };
      break;
    }
  }

  let tuongHinh = { isMatch: false, text: "Không phạm Tương Hình", score: 0 };
  if ((chiNamDoc === "Tý" && chiNgay === "Mão") || (chiNamDoc === "Mão" && chiNgay === "Tý")) {
    tuongHinh = { isMatch: true, text: `Phạm Vô Lễ Hình (${chiNamDoc} - ${chiNgay}): Giữ chuẩn mực giao tiếp y khoa`, score: -8 };
  } else if ((chiNamDoc === chiNgay) && ["Thìn", "Ngọ", "Dậu", "Hợi"].includes(chiNamDoc)) {
    tuongHinh = { isMatch: true, text: `Phạm Tự Hình (${chiNamDoc} phùng ${chiNgay}): Tránh tự gây áp lực tâm lý quá mức`, score: -8 };
  }

  const totalScore = tamHop.score + lucHop.score + lucXung.score + lucHai.score + tuongHinh.score;
  return { tamHop, lucHop, lucXung, lucHai, tuongHinh, totalScore };
}

// ─── THIÊN ẤT QUÝ NHÂN & LỘC THẦN ────────────────────────────────────

export function kiemTraQuyNhanLoc(canNamDoc: string, canNgay: string, chiNgay: string): QuyNhanLocResult {
  const quyNhanList = THIEN_AT_MAP[canNamDoc] || [];
  let thienAt = { isMatch: false, text: "Không phùng Quý Nhân", score: 0 };
  if (quyNhanList.includes(chiNgay)) {
    thienAt = { isMatch: true, text: `Thiên Ất Quý Nhân Giáng Lâm: Hội chẩn ca khó gặp quý nhân hỗ trợ, đồng nghiệp tận tâm`, score: 12 };
  }

  const locChi = LOC_THAN_MAP[canNamDoc];
  let locThan = { isMatch: false, text: "Không phùng Lộc Thần", score: 0 };
  if (locChi === chiNgay) {
    locThan = { isMatch: true, text: `Lộc Thần Tọa Chiêu: Thuận lợi nghiệm thu đề tài EBM, ký kết công tác, tài lộc y vụ`, score: 8 };
  }

  return { thienAt, locThan, totalScore: thienAt.score + locThan.score };
}

// ─── THẦN SÁT ─────────────────────────────────────────────────────────

export function kiemTraThanSat(lunarMonth: number, canNgay: string, chiNgay: string): { list: ThanSatItem[]; score: number } {
  const list: ThanSatItem[] = [];
  let score = 0;

  const thienDuc = THIEN_DUC_MAP[lunarMonth];
  if (thienDuc === canNgay || thienDuc === chiNgay) {
    list.push({ name: "Thiên Đức Cát Thần", type: "pos", score: 10, desc: "Thần cát hộ trì, giải trừ hung rủi, y khoa may mắn." });
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

// ─── BIORHYTHMS 4 TRỤC ────────────────────────────────────────────────

// ─── BIORHYTHMS 4 TRỤC ĐỘNG THEO CHUYÊN KHOA LÂM SÀNG ─────────────────

export function calculateBiorhythms(
  birthDate: Date,
  targetDate: Date,
  specialty: DoctorSpecialty = 'surgery'
): BiorhythmResult {
  const diffMs = targetDate.getTime() - birthDate.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const physical = Math.round(Math.sin((2 * Math.PI * days) / 23) * 100);
  const emotional = Math.round(Math.sin((2 * Math.PI * days) / 28) * 100);
  const intellectual = Math.round(Math.sin((2 * Math.PI * days) / 33) * 100);
  const intuitive = Math.round(Math.sin((2 * Math.PI * days) / 38) * 100);

  const avg = Math.round((physical + emotional + intellectual + intuitive) / 4);
  const meta = SPECIALTY_METAS[specialty] || SPECIALTY_METAS.surgery;
  const weights = meta.weights;

  // Tính điểm trọng số sinh học cá thể hóa theo chuyên khoa (-100 đến +100)
  const weightedBio = Math.round(
    physical * weights.physical +
    intellectual * weights.intellectual +
    emotional * weights.emotional +
    intuitive * weights.intuitive
  );

  let physBonus = 0, intBonus = 0, emoBonus = 0, intuitBonus = 0;
  const clinicalTips: string[] = [];

  // Nhánh chuyên môn theo từng chuyên khoa
  if (specialty === 'surgery') {
    if (physical >= 40) {
      physBonus = 4;
      clinicalTips.push(`💪 Thể lực sung mãn (+${physical}%): Bàn tay ổn định, sức bền cơ học cao cho ca mổ kéo dài và vi phẫu.`);
    } else if (physical <= -40) {
      physBonus = -3;
      clinicalTips.push(`⚠️ Thể lực suy giảm (${physical}%): Dễ mỏi cơ vùng vai cổ; chú ý rà soát bảng kiểm WHO và nghỉ ngắn giữa các thì mổ.`);
    }
    if (intuitive >= 30) {
      intuitBonus = 2;
      clinicalTips.push(`🎯 Phản xạ phẫu trường nhạy bén (+${intuitive}%): Dự liệu tốt các biến thể giải phẫu và kiểm soát chảy máu nhanh.`);
    }
  } else if (specialty === 'icu_er') {
    if (intuitive >= 30) {
      intuitBonus = 4;
      clinicalTips.push(`⚡ Trực giác lâm sàng nhạy bén (+${intuitive}%): Nhận diện sớm dấu hiệu sốc ẩn, quyết định cấp cứu giờ vàng chuẩn xác.`);
    } else if (intuitive <= -30) {
      intuitBonus = -3;
      clinicalTips.push(`⚠️ Trực giác trầm lắng (${intuitive}%): Hãy bám sát thông số monitor, khí máu động mạch và lactate máu.`);
    }
    if (physical >= 40) {
      physBonus = 3;
      clinicalTips.push(`💪 Năng lượng ca trực dồi dào (+${physical}%): Duy trì phản xạ nhanh trong ca trực đêm và hồi sinh tim phổi (CPR).`);
    }
  } else if (specialty === 'internal') {
    if (intellectual >= 40) {
      intBonus = 4;
      clinicalTips.push(`🧠 Trí tuệ sáng suốt (+${intellectual}%): Phân tích chẩn đoán phân biệt nhiều tầng mạch lạc, tối ưu hóa phối hợp thuốc.`);
    } else if (intellectual <= -40) {
      intBonus = -3;
      clinicalTips.push(`⚠️ Nhận thức vùng trũng (${intellectual}%): Kiểm tra chéo tương tác dược lý, chức năng gan thận trước khi ký y lệnh.`);
    }
    if (intuitive >= 30) {
      intuitBonus = 2;
      clinicalTips.push(`🎯 Liên kết triệu chứng nhanh (+${intuitive}%): Nhạy bén phát hiện các biểu hiện lâm sàng không điển hình.`);
    }
  } else if (specialty === 'psych_onco_peds') {
    if (emotional >= 40) {
      emoBonus = 4;
      clinicalTips.push(`❤️ Năng lượng thấu cảm dồi dào (+${emotional}%): Rất thuận lợi tư vấn bệnh nhân nặng, áp dụng trọn vẹn mô hình SPIKES.`);
    } else if (emotional <= -40) {
      emoBonus = -3;
      clinicalTips.push(`⚠️ Nguy cơ kiệt sức thấu cảm (${emotional}%): Cần giữ tâm thế điềm tĩnh, tránh bị cuốn vào phản ứng tiêu cực của thân nhân.`);
    }
    if (intellectual >= 30) {
      intBonus = 2;
      clinicalTips.push(`🧠 Phân tầng tiên lượng chính xác (+${intellectual}%): Định hướng phác đồ đa mô thức và chăm sóc nâng đỡ phù hợp.`);
    }
  } else if (specialty === 'tcm_rehab') {
    if (physical >= 35) {
      physBonus = 3;
      clinicalTips.push(`💪 Thể lực vững vàng (+${physical}%): Trợ lực tốt cho người bệnh tập phục hồi chức năng và xoa bóp trị liệu.`);
    }
    if (intuitive >= 35) {
      intuitBonus = 3;
      clinicalTips.push(`🌿 Cảm thụ khí huyết tinh tế (+${intuitive}%): Đắc khí chuẩn xác khi châm kim, điều phối huyệt vị theo Tý Ngọ Lưu Chú.`);
    }
  }

  // Bonus chung từ điểm trọng số tổng hợp
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
  
  // Vị trí sao khởi đầu của 12 giờ dựa trên Chi Ngày
  const dayChiIdx = CHI.indexOf(chiNgay as any);
  const startOffset = (dayChiIdx * 2) % 12;

  return CHI.map((chi, idx) => {
    const starIdx = (idx + startOffset) % 12;
    const star = GIO_THAN_SAT[starIdx] || GIO_THAN_SAT[0]!;
    const isHoangDao = hoangDaoList.includes(chi);

    // Xác định khung giờ hiện tại
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

// ─── ĐÁNH GIÁ KHUYẾN NGHỊ HÀNH ĐỘNG LÂM SÀNG THEO CHUYÊN KHOA ──────────

export function evaluateClinicalAdvice(
  totalScore: number,
  truc: TrucItem,
  saoTu: SaoTuItem,
  bio: BiorhythmResult,
  diaChi: DiaChiRelationResult,
  specialty: DoctorSpecialty = 'surgery'
): ClinicalAdvice {
  const isGreatDay = totalScore >= 65 && ['Định', 'Thành', 'Khai', 'Kiến'].includes(truc.name) && saoTu.type === 'cat';
  const isCautionDay = truc.type === 'hung' || saoTu.type === 'hung' || diaChi.lucXung.isMatch;

  let surgery: ClinicalAdviceItem;
  let consultation: ClinicalAdviceItem;
  let communication: ClinicalAdviceItem;
  let research: ClinicalAdviceItem;

  switch (specialty) {
    case 'surgery':
      // 1. Ngoại khoa & Can thiệp
      if (isGreatDay && bio.physical >= 0) {
        surgery = { status: 'good', title: 'Phẫu thuật & Can thiệp', text: 'Thời điểm rất tốt cho phẫu thuật chương trình lớn, mổ nội soi phức tạp; bàn tay vững vàng.' };
      } else if (isCautionDay || bio.physical <= -40) {
        surgery = { status: 'caution', title: 'Phẫu thuật & Can thiệp', text: 'Thận trọng với ca mổ rủi ro cao; rà soát kỹ bảng kiểm chu phẫu (WHO checklist) và dự phòng mất máu.' };
      } else {
        surgery = { status: 'neutral', title: 'Phẫu thuật & Can thiệp', text: 'Tiến hành phẫu thuật và thủ thuật theo đúng quy chuẩn an toàn thường quy.' };
      }

      if (totalScore >= 60 && (bio.intellectual >= 20 || diaChi.tamHop.isMatch)) {
        consultation = { status: 'good', title: 'Hội chẩn Chu phẫu & Ca khó', text: 'Phối hợp nhịp nhàng với Gây mê hồi sức, thống nhất chiến lược phẫu thuật tối ưu.' };
      } else {
        consultation = { status: 'neutral', title: 'Hội chẩn Chu phẫu & Ca khó', text: 'Rà soát kỹ bilan tiền phẫu, dự kiến trước các tình huống bất ngờ trong mổ.' };
      }

      if (bio.emotional >= 20 && !diaChi.lucHai.isMatch) {
        communication = { status: 'good', title: 'Tư vấn & Cam kết Mổ', text: 'Giải thích cặn kẽ lợi ích - rủi ro, người nhà an tâm và đồng thuận cao trước mổ.' };
      } else {
        communication = { status: 'caution', title: 'Tư vấn & Cam kết Mổ', text: 'Nêu rõ ràng văn bản cam kết phẫu thuật, tránh dùng từ ngữ gây hiểu lầm về tiên lượng.' };
      }

      if (saoTu.name === 'Bích' || saoTu.name === 'Đẩu' || bio.intellectual >= 30) {
        research = { status: 'good', title: 'Kỹ thuật Mổ & Guideline', text: 'Thuận lợi cập nhật video phẫu thuật quốc tế và hoàn thiện báo cáo ca lâm sàng.' };
      } else {
        research = { status: 'neutral', title: 'Kỹ thuật Mổ & Guideline', text: 'Duy trì rà soát lại các guideline ngoại khoa và phác đồ kháng sinh dự phòng.' };
      }
      break;

    case 'icu_er':
      // 2. Hồi sức & Cấp cứu
      if (isGreatDay && bio.intuitive >= 0) {
        surgery = { status: 'good', title: 'Thủ thuật Hồi sức Cấp cứu', text: 'Thuận lợi đặt Catheter tĩnh mạch trung tâm, mở khí quản, chọc hút dịch màng phổi cấp cứu.' };
      } else if (isCautionDay || bio.physical <= -40) {
        surgery = { status: 'caution', title: 'Thủ thuật Hồi sức Cấp cứu', text: 'Chuẩn bị sẵn phương án hỗ trợ khi đặt nội khí quản khó; kiểm tra kỹ siêu âm tại giường.' };
      } else {
        surgery = { status: 'neutral', title: 'Thủ thuật Hồi sức Cấp cứu', text: 'Thực hiện thủ thuật hồi sức theo đúng checklist an toàn buồng cấp cứu.' };
      }

      if (totalScore >= 60 && (bio.intuitive >= 20 || bio.intellectual >= 20)) {
        consultation = { status: 'good', title: 'Quyết định Giờ Vàng', text: 'Trực giác lâm sàng nhạy bén, nhận diện sớm sốc nhiễm khuẩn và điều chỉnh máy thở chuẩn xác.' };
      } else {
        consultation = { status: 'neutral', title: 'Quyết định Giờ Vàng', text: 'Bám sát chỉ số monitor, theo dõi sát diễn biến lactate máu và cân bằng dịch.' };
      }

      if (bio.emotional >= 20 && !diaChi.lucHai.isMatch) {
        communication = { status: 'good', title: 'Báo động & Tư vấn Nguy kịch', text: 'Tâm thái điềm tĩnh giúp trấn an người nhà trong tình huống khẩn cấp tại phòng cấp cứu.' };
      } else {
        communication = { status: 'caution', title: 'Báo động & Tư vấn Nguy kịch', text: 'Báo cáo trung thực diễn biến xấu, giải thích ngắn gọn súc tích và có chứng kiến ca trực.' };
      }

      if (bio.intellectual >= 30) {
        research = { status: 'good', title: 'Phác đồ Sepsis & EBM Hồi sức', text: 'Cập nhật nhanh phác đồ Surviving Sepsis Campaign và chiến lược ARDS mới.' };
      } else {
        research = { status: 'neutral', title: 'Phác đồ Sepsis & EBM Hồi sức', text: 'Ôn lại các thuật toán hồi sinh tim phổi nâng cao (ACLS/PALS).' };
      }
      break;

    case 'internal':
      // 3. Nội khoa Điều trị
      if (isGreatDay && bio.physical >= 0) {
        surgery = { status: 'good', title: 'Thăm dò & Thủ thuật Nội', text: 'Thời điểm thích hợp chọc dò tủy sống, sinh thiết thận, nội soi tiêu hóa can thiệp.' };
      } else if (isCautionDay) {
        surgery = { status: 'caution', title: 'Thăm dò & Thủ thuật Nội', text: 'Kiểm tra kỹ đông máu toàn bộ trước khi chọc hút dịch hoặc can thiệp xâm lấn.' };
      } else {
        surgery = { status: 'neutral', title: 'Thăm dò & Thủ thuật Nội', text: 'Thực hiện các thủ thuật thăm dò chức năng theo kế hoạch điều trị.' };
      }

      if (totalScore >= 60 && (bio.intellectual >= 20 || diaChi.tamHop.isMatch)) {
        consultation = { status: 'good', title: 'Chẩn đoán Phân biệt & Ca khó', text: 'Tư duy sắc sảo, liên kết triệu chứng đa cơ quan, hội chẩn liên chuyên khoa đạt đột phá.' };
      } else if (bio.intellectual <= -40) {
        consultation = { status: 'caution', title: 'Chẩn đoán Phân biệt & Ca khó', text: 'Cần tra cứu kỹ UpToDate và đối chiếu guideline trước khi đổi phác đồ bậc hai.' };
      } else {
        consultation = { status: 'neutral', title: 'Chẩn đoán Phân biệt & Ca khó', text: 'Phân tích kỹ các xét nghiệm cận lâm sàng và đáp ứng điều trị nội khoa.' };
      }

      if (bio.emotional >= 20 && !diaChi.lucHai.isMatch) {
        communication = { status: 'good', title: 'Tư vấn Điều trị Mạn tính', text: 'Giải thích thấu đáo cơ chế bệnh, nâng cao tỷ lệ tuân thủ thuốc và chế độ ăn của người bệnh.' };
      } else {
        communication = { status: 'neutral', title: 'Tư vấn Điều trị Mạn tính', text: 'Hướng dẫn kỹ toa thuốc xuất viện, dặn dò dấu hiệu cần tái khám ngay.' };
      }

      if (saoTu.name === 'Bích' || saoTu.name === 'Đẩu' || bio.intellectual >= 30) {
        research = { status: 'good', title: 'Tra cứu Dược lý & EBM', text: 'Nắm bắt nhanh các nghiên cứu RCT mới, cập nhật tương tác thuốc và liều suy thận.' };
      } else {
        research = { status: 'neutral', title: 'Tra cứu Dược lý & EBM', text: 'Duy trì đọc các bài điểm báo y học tổng quan trong chuyên khoa.' };
      }
      break;

    case 'psych_onco_peds':
      // 4. Tâm thần, Ung bướu, Nhi & CS Giảm nhẹ
      if (isGreatDay) {
        surgery = { status: 'good', title: 'Liệu pháp Chuyên sâu & Hóa trị', text: 'Thuận lợi khởi động chu kỳ hóa trị mới, áp dụng liệu pháp tâm lý nhận thức hành vi (CBT).' };
      } else if (isCautionDay) {
        surgery = { status: 'caution', title: 'Liệu pháp Chuyên sâu & Hóa trị', text: 'Theo dõi sát tác dụng phụ hạ bạch cầu, phản ứng tiêm truyền và tác dụng không mong muốn.' };
      } else {
        surgery = { status: 'neutral', title: 'Liệu pháp Chuyên sâu & Hóa trị', text: 'Duy trì liệu trình điều trị theo phác đồ nâng đỡ tiêu chuẩn.' };
      }

      if (totalScore >= 60 && bio.intellectual >= 20) {
        consultation = { status: 'good', title: 'Phân tầng TNM & Hội chẩn MDT', text: 'Đồng thuận cao trong hội đồng đa chuyên khoa ung bướu (MDT) và đánh giá tâm lý toàn diện.' };
      } else {
        consultation = { status: 'neutral', title: 'Phân tầng TNM & Hội chẩn MDT', text: 'Đánh giá lại thang điểm đau, chỉ số thể trạng ECOG/Karnofsky của người bệnh.' };
      }

      if (bio.emotional >= 20 && !diaChi.lucHai.isMatch) {
        communication = { status: 'good', title: 'Thấu cảm & SPIKES Báo Tin', text: 'Năng lượng thấu cảm tuyệt vời; truyền đạt tin xấu đầy nhân văn, dỗ dành bệnh nhi hợp tác.' };
      } else {
        communication = { status: 'caution', title: 'Thấu cảm & SPIKES Báo Tin', text: 'Tuân thủ nghiêm ngặt 6 bước mô hình SPIKES; kiên nhẫn lắng nghe, tránh phản ứng cảm xúc.' };
      }

      if (bio.intellectual >= 30) {
        research = { status: 'good', title: 'Guideline NCCN & Giảm nhẹ WHO', text: 'Cập nhật tiến bộ thuốc đích/miễn dịch mới và phác đồ kiểm soát đau đa tầng.' };
      } else {
        research = { status: 'neutral', title: 'Guideline NCCN & Giảm nhẹ WHO', text: 'Rà soát tài liệu hướng dẫn tâm lý lâm sàng và chăm sóc giai đoạn cuối.' };
      }
      break;

    case 'tcm_rehab':
      // 5. Y học cổ truyền & Phục hồi chức năng
      if (isGreatDay) {
        surgery = { status: 'good', title: 'Khai huyệt & Thủ thuật YHCT', text: 'Thời điểm đắc khí cao, châm cứu theo Tý Ngọ Lưu Chú, cấy chỉ và nắn chỉnh đạt hiệu quả tối ưu.' };
      } else if (isCautionDay) {
        surgery = { status: 'caution', title: 'Khai huyệt & Thủ thuật YHCT', text: 'Thao tác nhẹ nhàng, tránh châm cứu gắng sức vào ngày khí tiết suy thoái.' };
      } else {
        surgery = { status: 'neutral', title: 'Khai huyệt & Thủ thuật YHCT', text: 'Tiến hành châm cứu, cứu ngải và tập vật lý trị liệu theo liệu trình.' };
      }

      if (totalScore >= 60 && bio.intuitive >= 20) {
        consultation = { status: 'good', title: 'Biện chứng Luận trị & Phục hồi', text: 'Vọng văn vấn thiết chuẩn xác, phân định rõ hàn nhiệt hư thực, lập mục tiêu PHCN rõ ràng.' };
      } else {
        consultation = { status: 'neutral', title: 'Biện chứng Luận trị & Phục hồi', text: 'Đánh giá lại tầm vận động khớp (ROM) và tiến độ phục hồi chức năng của người bệnh.' };
      }

      if (bio.emotional >= 20) {
        communication = { status: 'good', title: 'Tư vấn Dưỡng sinh & Vận động', text: 'Truyền cảm hứng tập luyện phục hồi, hướng dẫn người bệnh an tâm dưỡng sinh điều hòa thân tâm.' };
      } else {
        communication = { status: 'neutral', title: 'Tư vấn Dưỡng sinh & Vận động', text: 'Dặn dò kỹ bài tập tại nhà và phòng tránh tư thế xấu gây tái phát chấn thương.' };
      }

      if (bio.intellectual >= 30) {
        research = { status: 'good', title: 'Y văn Kinh điển & EBM Phục hồi', text: 'Kết hợp tinh hoa y học cổ truyền với bằng chứng khoa học phục hồi chức năng hiện đại.' };
      } else {
        research = { status: 'neutral', title: 'Y văn Kinh điển & EBM Phục hồi', text: 'Đọc lại các bài thuốc cổ phương và phác đồ tập PHCN chuẩn.' };
      }
      break;
  }

  return { surgery, consultation, communication, research };
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
    specialty: "surgery"
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
    specialty: (profile.specialty as DoctorSpecialty) || "surgery"
  };
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

// ─── ĐÁNH GIÁ CHỈ SỐ NGÀY TỔNG HỢP ─────────────────────────────────────

export function evaluateDayScore(dateObj: Date = new Date(), customDoc?: DoctorProfile): DayScoreEvaluation {
  const doc = customDoc || getDoctorProfile();
  const specialty = doc.specialty || 'surgery';
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

  // 7. Nhị Thập Bát Tú, Trực Ngày, Tiết Khí, Thần Sát & Biorhythms
  const saoTu = getSaoTu(dateObj, canChiDay.jdn);
  const trucNgay = getTrucNgay(lunar.month, canChiDay.chi);
  const tietKhiInfo = getTietKhiInfo(dateObj);
  const thanSat = kiemTraThanSat(lunar.month, canChiDay.can, canChiDay.chi);
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const bio = calculateBiorhythms(birthDate, dateObj, specialty);

  // Tổng hợp điểm chuẩn hóa
  const basePoint = 20;
  const rawTotal = basePoint + b1.score + canChiNgayScore.score
                 + diaChiRelations.totalScore + quyNhanLoc.totalScore
                 + b3Point - b4Penalty + b4BonusPoint
                 + saoTu.score + trucNgay.score + tietKhiInfo.tietKhi.score
                 + (tietKhiInfo.tuLyTuTuyet ? tietKhiInfo.tuLyTuTuyet.score : 0)
                 + thanSat.score + bio.totalBioScore;

  const total = Math.round(Math.min(100, Math.max(0, rawTotal)));

  let rating = "Bình Hòa";
  let badgeClass = "day-rating-neutral";
  let icon = "⚖️";
  let summaryText = "Ngày cân bằng, mọi công việc lâm sàng diễn ra theo đúng quy trình chuẩn.";

  if (total >= 82) {
    rating = "Đại Cát";
    badgeClass = "day-rating-great";
    icon = "🌟";
    summaryText = `Đại cát hanh thông (${saoTu.name} Tinh & Trực ${trucNgay.name}): Thời điểm vàng cho các quyết định điều trị & hội chẩn EBM.`;
  } else if (total >= 65) {
    rating = "Cát Lành";
    badgeClass = "day-rating-good";
    icon = "✨";
    summaryText = `Khí tiết thuận hòa (${saoTu.name} Tinh): Năng lượng làm việc và độ tập trung chẩn đoán đạt hiệu suất cao.`;
  } else if (total >= 45) {
    rating = "Bình Hòa";
    badgeClass = "day-rating-neutral";
    icon = "⚖️";
    summaryText = `Trạng thái ổn định: Thích hợp tái khám, ra y lệnh định kỳ, rà soát hồ sơ & học tập EBM.`;
  } else if (total >= 25) {
    rating = "Thận Trọng";
    badgeClass = "day-rating-warn";
    icon = "⚠️";
    summaryText = `Có yếu tố khắc nhẹ hoặc khí tiết phân tán: Chú ý rà soát kỹ bảng kiểm an toàn và liều thuốc.`;
  } else {
    rating = "Đại Hung";
    badgeClass = "day-rating-bad";
    icon = "⛔";
    summaryText = `Phạm nhiều hung tinh / Lục xung: Thận trọng cao độ, kiểm tra chéo y lệnh 2 lần trước khi duyệt.`;
  }

  const advice = evaluateClinicalAdvice(total, trucNgay, saoTu, bio, diaChiRelations, specialty);
  const hoangDaoList = HOANG_DAO_MAP[canChiDay.chi] || [];
  const hoangDaoHours = hoangDaoList.map(chi => `${chi} (${GIO_TIME[chi] || ''})`);
  const gioTimeline = calculateGioTimeline(canChiDay.chi, dateObj.getHours());

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
    trucNgay,
    tietKhiInfo,
    thanSat,
    bio,
    advice,
    hoangDaoHours,
    gioTimeline
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

// ─── BỘ TÌM NGÀY ĐẸP Y KHOA (CLINICAL DATE FINDER) ────────────────────

export function findBestClinicalDays(
  purpose: 'surgery' | 'clinic' | 'ebm' | 'consultation' = 'surgery',
  daysAhead: number = 30,
  customDoc?: DoctorProfile
): BestClinicalDayResult[] {
  const doc = customDoc || getDoctorProfile();
  const today = new Date();
  const scoredDays: { evalData: DayScoreEvaluation; matchScore: number; matchReasons: string[] }[] = [];

  const purposeNames: Record<string, string> = {
    surgery: "Phẫu Thuật & Thủ Thuật Can Thiệp",
    clinic: "Khai Trương Phòng Khám / Tiếp Nhận Máy Mới",
    ebm: "Báo Cáo EBM & Nghiệm Thu Đề Tài",
    consultation: "Hội Chẩn Ca Khó & Ký Kết Hợp Đồng"
  };

  for (let i = 0; i < daysAhead; i++) {
    const d = new Date(today.getTime() + i * 86400000);
    const evalData = evaluateDayScore(d, doc);
    let matchScore = evalData.total;
    const matchReasons: string[] = [];

    if (purpose === 'surgery') {
      if (['Định', 'Thành', 'Khai', 'Kiến'].includes(evalData.trucNgay.name)) {
        matchScore += 15;
        matchReasons.push(`Trực ${evalData.trucNgay.name} (Đại cát khởi tạo & an định)`);
      }
      if (evalData.saoTu.type === 'cat') {
        matchScore += 10;
        matchReasons.push(`Sao ${evalData.saoTu.name} Tinh (Cát tinh hộ trì)`);
      }
      if (evalData.bio.physical >= 30) {
        matchScore += 8;
        matchReasons.push(`Biorhythm Thể lực sung sức (${evalData.bio.physical}%)`);
      }
      if (evalData.bio.intuitive >= 30) {
        matchScore += 8;
        matchReasons.push(`Trực giác lâm sàng nhạy bén (${evalData.bio.intuitive}%)`);
      }
    } else if (purpose === 'clinic') {
      if (evalData.quyNhanLoc.locThan.isMatch) {
        matchScore += 20;
        matchReasons.push("Đắc Lộc Thần (Tài lộc & y vụ thịnh vượng)");
      }
      if (['Khai', 'Kiến', 'Mãn'].includes(evalData.trucNgay.name)) {
        matchScore += 15;
        matchReasons.push(`Trực ${evalData.trucNgay.name} (Khai mở hanh thông)`);
      }
      if (evalData.thanSat.score > 0) {
        matchScore += 10;
        matchReasons.push("Được Thiên Đức / Nguyệt Đức chiếu rọi");
      }
    } else if (purpose === 'ebm') {
      if (['Bích', 'Trương', 'Đẩu', 'Cơ'].includes(evalData.saoTu.name)) {
        matchScore += 20;
        matchReasons.push(`Sao ${evalData.saoTu.name} (Văn chương y thuật & nghiên cứu đỗ đạt)`);
      }
      if (['Thâu', 'Thành', 'Mãn'].includes(evalData.trucNgay.name)) {
        matchScore += 15;
        matchReasons.push(`Trực ${evalData.trucNgay.name} (Nghiệm thu kết quả tốt đẹp)`);
      }
      if (evalData.bio.intellectual >= 30) {
        matchScore += 10;
        matchReasons.push(`Trí tuệ minh mẫn (${evalData.bio.intellectual}%)`);
      }
    } else if (purpose === 'consultation') {
      if (evalData.diaChiRelations.tamHop.isMatch) {
        matchScore += 20;
        matchReasons.push("Tam Hợp Cát Tinh (Đồng nghiệp & chuyên gia đồng lòng)");
      }
      if (evalData.quyNhanLoc.thienAt.isMatch) {
        matchScore += 15;
        matchReasons.push("Thiên Ất Quý Nhân (Gặp quý nhân tương trợ ca khó)");
      }
      if (evalData.diaChiRelations.lucHop.isMatch) {
        matchScore += 10;
        matchReasons.push("Lục Hợp hòa thuận, bệnh nhân tin tưởng");
      }
    }

    scoredDays.push({ evalData, matchScore, matchReasons });
  }

  // Sắp xếp điểm giảm dần và lấy Top 5
  scoredDays.sort((a, b) => b.matchScore - a.matchScore);
  const top5 = scoredDays.slice(0, 5);

  return top5.map((item, idx) => ({
    rank: idx + 1,
    purpose,
    purposeName: purposeNames[purpose] || "Lâm sàng",
    evalData: item.evalData,
    matchReasons: item.matchReasons,
    score: item.evalData.total
  }));
}

// ─── LỊCH THÁNG HEATMAP (30-DAY MATRIX) ────────────────────────────────

export function getMonthEvaluation(year: number = new Date().getFullYear(), month: number = new Date().getMonth() + 1, customDoc?: DoctorProfile): DayScoreEvaluation[] {
  const doc = customDoc || getDoctorProfile();
  const daysInMonth = new Date(year, month, 0).getDate();
  const result: DayScoreEvaluation[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month - 1, d);
    result.push(evaluateDayScore(dateObj, doc));
  }

  return result;
}

// ─── XUẤT FILE LỊCH ICAL (.ICS) & SAO CHÉP TÓM TẮT ────────────────────

export function generateICSContent(evalData: DayScoreEvaluation): string {
  const d = evalData.dateObj;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dtStr = `${year}${month}${day}`;

  const hdText = evalData.hoangDaoHours.slice(0, 4).join(', ');
  const desc = `Điểm số: ${evalData.total}/100 (${evalData.rating})\\nCan Chi: ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})\\nSao: ${evalData.saoTu.name} • Trực: ${evalData.trucNgay.name}\\nGiờ Hoàng Đạo: ${hdText}\\n\\nKhuyến nghị: ${evalData.summaryText}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CliniPortal//Clinical Date Intelligence//VI",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:cliniportal-${evalData.dateKey}@cliniportal.vn`,
    `DTSTAMP:${dtStr}T080000Z`,
    `DTSTART;VALUE=DATE:${dtStr}`,
    `DTEND;VALUE=DATE:${dtStr}`,
    `SUMMARY:🌟 [Ngày Tốt ${evalData.total}đ] ${evalData.canChiDay} - ${evalData.rating}`,
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
  link.setAttribute('download', `NgayTot_${evalData.dateKey}_CliniPortal.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyDaySummaryText(evalData: DayScoreEvaluation): string {
  const hdText = evalData.hoangDaoHours.join(' • ');
  const text = `🌟 [CLINIPORTAL] PHÂN TÍCH CHỈ SỐ NGÀY TỐT\n📅 Ngày: ${evalData.formattedDate}\n☯️ Bát tự: ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})\n🎯 Điểm số: ${evalData.total}/100 — ${evalData.rating} ${evalData.icon}\n✨ Nhị thập bát tú: Sao ${evalData.saoTu.name} (${evalData.saoTu.desc})\n📜 12 Trực: Trực ${evalData.trucNgay.name} (${evalData.trucNgay.desc})\n⏰ Giờ Hoàng Đạo: ${hdText}\n💡 Gợi ý y vụ: ${evalData.summaryText}`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
  return text;
}

// ─── WIDGET NĂNG LƯỢNG CA TRỰC & CIRCADIAN ─────────────────────────────

export function calculateShiftEnergy(dateObj: Date = new Date()): ShiftEnergyData {
  const h = dateObj.getHours();
  const doc = getDoctorProfile();
  const birthDate = new Date(doc.birthYear, doc.birthMonth - 1, doc.birthDay);
  const bio = calculateBiorhythms(birthDate, dateObj);

  let circVal = 75;
  let phase = "Ban ngày — Bình ổn";
  let peak = "08:30 - 11:30";
  let fatigue: string | null = null;
  let caffeine = "Bổ sung đủ nước (500ml), hạn chế caffeine sau 16:00.";

  if (h >= 8 && h < 12) {
    circVal = 92;
    phase = "Đỉnh Cao Buổi Sáng (Peak Focus)";
    peak = "08:30 - 11:30 (Khung giờ vàng phẫu thuật & đọc kết quả khó)";
    caffeine = "1 tách trà xanh hoặc cà phê sáng giúp tối ưu phản xạ.";
  } else if (h >= 12 && h < 14) {
    circVal = 62;
    phase = "Trầm Lắng Giữa Ngày (Post-Lunch Dip)";
    peak = "14:30 - 17:00";
    fatigue = "Sinh lý buồn ngủ tự nhiên sau ăn trưa, nên nghỉ ngơi 15-20 phút.";
    caffeine = "Tránh uống cà phê đặc ngay sau ăn, ưu tiên đi dạo nhẹ.";
  } else if (h >= 14 && h < 18) {
    circVal = 85;
    phase = "Hưng Phấn Chiều (Afternoon Surge)";
    peak = "15:00 - 17:30 (Thích hợp khám phòng khám & giao ban ca)";
    caffeine = "Uống nước ấm, vận động co giãn cơ bắp cổ vai gáy.";
  } else if (h >= 18 && h < 22) {
    circVal = 70;
    phase = "Ca Trực Tối (Evening Shift)";
    peak = "19:00 - 21:00 (Tiếp nhận phân loại cấp cứu)";
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
    "✅ Đối chiếu thuốc 5 Đúng (Đúng thuốc, liều, đường dùng, giờ, bệnh nhân)",
    "✅ Ghi nhận sinh hiệu cảnh báo sớm (MEWS / NEWS2)",
    "✅ Tuân thủ bàn giao ca trực chuẩn SBAR"
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
