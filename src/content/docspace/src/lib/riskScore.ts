import { AnalysisResult, ClinicalFormState, LabsState, VitalsState } from '../types.ts';

export interface ScoreItem {
  parameter: string;
  value: string;
  points: number;
  reason: string;
  category: 'vital' | 'lab' | 'clinical';
}

export type UrgencyLevelCode = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ClinicalRiskScore {
  totalScore: number;
  vitalScore: number;
  clinicalScore: number;
  level: 1 | 2 | 3 | 4;
  levelCode: UrgencyLevelCode;
  levelName: string;
  badgeLabel: string;
  urgencyText: string;
  monitoringFrequency: string;
  clinicalAction: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    hex: string;
    gradient: string;
  };
  breakdown: ScoreItem[];
}

/**
 * Calculates Clinical Risk Score based on NEWS2 (National Early Warning Score)
 * combined with acute clinical symptom markers and laboratory red flags.
 */
export function calculateClinicalRiskScore(
  vitals?: VitalsState,
  labs?: LabsState,
  results?: AnalysisResult[],
  form?: ClinicalFormState
): ClinicalRiskScore {
  const breakdown: ScoreItem[] = [];
  let vitalScore = 0;
  let clinicalScore = 0;

  if (vitals) {
    // 1. Respiratory Rate (Nhịp thở - l/phút)
    const rr = parseFloat(vitals.vTho);
    if (!isNaN(rr)) {
      if (rr <= 8) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Nhịp thở',
          value: `${rr} l/p`,
          points: 3,
          reason: 'Thở quá chậm (Bradypnea) ≤ 8 l/p',
          category: 'vital',
        });
      } else if (rr >= 9 && rr <= 11) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'Nhịp thở',
          value: `${rr} l/p`,
          points: 1,
          reason: 'Nhịp thở chậm 9–11 l/p',
          category: 'vital',
        });
      } else if (rr >= 21 && rr <= 24) {
        vitalScore += 2;
        breakdown.push({
          parameter: 'Nhịp thở',
          value: `${rr} l/p`,
          points: 2,
          reason: 'Thở nhanh (Tachypnea) 21–24 l/p',
          category: 'vital',
        });
      } else if (rr >= 25) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Nhịp thở',
          value: `${rr} l/p`,
          points: 3,
          reason: 'Suy hô hấp cấp / Thở rất nhanh ≥ 25 l/p',
          category: 'vital',
        });
      }
    }

    // 2. SpO2 (Độ bão hòa oxy - %)
    const spo2 = parseFloat(vitals.vSpo2);
    if (!isNaN(spo2)) {
      if (spo2 <= 91) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'SpO₂',
          value: `${spo2}%`,
          points: 3,
          reason: 'Hạ oxy máu nặng ≤ 91%',
          category: 'vital',
        });
      } else if (spo2 >= 92 && spo2 <= 93) {
        vitalScore += 2;
        breakdown.push({
          parameter: 'SpO₂',
          value: `${spo2}%`,
          points: 2,
          reason: 'Thiếu oxy máu 92–93%',
          category: 'vital',
        });
      } else if (spo2 >= 94 && spo2 <= 95) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'SpO₂',
          value: `${spo2}%`,
          points: 1,
          reason: 'Giảm nhẹ oxy 94–95%',
          category: 'vital',
        });
      }
    }

    // 3. Systolic Blood Pressure (Huyết áp tâm thu - mmHg)
    const sbp = parseFloat(vitals.vHATT);
    if (!isNaN(sbp)) {
      if (sbp <= 90) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Huyết áp tâm thu',
          value: `${sbp} mmHg`,
          points: 3,
          reason: 'Tụt huyết áp / Nguy cơ sốc ≤ 90 mmHg',
          category: 'vital',
        });
      } else if (sbp >= 91 && sbp <= 100) {
        vitalScore += 2;
        breakdown.push({
          parameter: 'Huyết áp tâm thu',
          value: `${sbp} mmHg`,
          points: 2,
          reason: 'Hạ huyết áp 91–100 mmHg',
          category: 'vital',
        });
      } else if (sbp >= 101 && sbp <= 110) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'Huyết áp tâm thu',
          value: `${sbp} mmHg`,
          points: 1,
          reason: 'Huyết áp giới hạn thấp 101–110 mmHg',
          category: 'vital',
        });
      } else if (sbp >= 180 && sbp < 220) {
        vitalScore += 2;
        breakdown.push({
          parameter: 'Huyết áp tâm thu',
          value: `${sbp} mmHg`,
          points: 2,
          reason: 'Tăng huyết áp độ 2–3 (≥ 180 mmHg)',
          category: 'vital',
        });
      } else if (sbp >= 220) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Huyết áp tâm thu',
          value: `${sbp} mmHg`,
          points: 3,
          reason: 'Cơn tăng huyết áp khẩn cấp ≥ 220 mmHg',
          category: 'vital',
        });
      }
    }

    // 4. Heart Rate / Pulse (Mạch - l/phút)
    const hr = parseFloat(vitals.vMach);
    if (!isNaN(hr)) {
      if (hr <= 40) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Mạch',
          value: `${hr} l/p`,
          points: 3,
          reason: 'Nhịp tim chậm nguy hiểm ≤ 40 l/p',
          category: 'vital',
        });
      } else if (hr >= 41 && hr <= 50) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'Mạch',
          value: `${hr} l/p`,
          points: 1,
          reason: 'Nhịp tim chậm 41–50 l/p',
          category: 'vital',
        });
      } else if (hr >= 91 && hr <= 110) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'Mạch',
          value: `${hr} l/p`,
          points: 1,
          reason: 'Nhịp tim nhanh nhẹ 91–110 l/p',
          category: 'vital',
        });
      } else if (hr >= 111 && hr <= 130) {
        vitalScore += 2;
        breakdown.push({
          parameter: 'Mạch',
          value: `${hr} l/p`,
          points: 2,
          reason: 'Nhịp tim nhanh 111–130 l/p',
          category: 'vital',
        });
      } else if (hr >= 131) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Mạch',
          value: `${hr} l/p`,
          points: 3,
          reason: 'Nhịp tim nhanh nguy kịch ≥ 131 l/p',
          category: 'vital',
        });
      }
    }

    // 5. Temperature (Thân nhiệt - °C)
    const temp = parseFloat(vitals.vNhiet);
    if (!isNaN(temp)) {
      if (temp <= 35.0) {
        vitalScore += 3;
        breakdown.push({
          parameter: 'Nhiệt độ',
          value: `${temp}°C`,
          points: 3,
          reason: 'Hạ thân nhiệt nặng ≤ 35.0°C',
          category: 'vital',
        });
      } else if (temp >= 35.1 && temp <= 36.0) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'Nhiệt độ',
          value: `${temp}°C`,
          points: 1,
          reason: 'Hạ thân nhiệt nhẹ 35.1–36.0°C',
          category: 'vital',
        });
      } else if (temp >= 38.1 && temp <= 39.0) {
        vitalScore += 1;
        breakdown.push({
          parameter: 'Nhiệt độ',
          value: `${temp}°C`,
          points: 1,
          reason: 'Sốt nhẹ / vừa 38.1–39.0°C',
          category: 'vital',
        });
      } else if (temp >= 39.1) {
        vitalScore += 2;
        breakdown.push({
          parameter: 'Nhiệt độ',
          value: `${temp}°C`,
          points: 2,
          reason: 'Sốt cao ≥ 39.1°C',
          category: 'vital',
        });
      }
    }
  }

  // 6. Laboratory Red Flags
  if (labs) {
    const trop = parseFloat(labs.lTrop);
    if (!isNaN(trop) && trop >= 0.04) {
      clinicalScore += 3;
      breakdown.push({
        parameter: 'Men tim Troponin',
        value: `${trop} ng/mL`,
        points: 3,
        reason: 'Tăng men tim nghi hoại tử tế bào cơ tim',
        category: 'lab',
      });
    }

    const bc = parseFloat(labs.lBC);
    if (!isNaN(bc) && (bc >= 15 || bc <= 3.5)) {
      clinicalScore += 2;
      breakdown.push({
        parameter: 'Bạch cầu',
        value: `${bc} G/L`,
        points: 2,
        reason: bc >= 15 ? 'Bạch cầu tăng cao (Phản ứng viêm/nhiễm trùng)' : 'Giảm bạch cầu nặng',
        category: 'lab',
      });
    }

    const glu = parseFloat(labs.lGlu);
    if (!isNaN(glu) && (glu >= 16.7 || glu <= 3.0)) {
      clinicalScore += 2;
      breakdown.push({
        parameter: 'Đường huyết',
        value: `${glu} mmol/L`,
        points: 2,
        reason: glu >= 16.7 ? 'Đường huyết tăng cao (Nguy cơ toan ceton/HHS)' : 'Hạ đường huyết nguy hiểm',
        category: 'lab',
      });
    }
  }

  // 7. Clinical Symptoms & Disease Emergency Tags
  if (results && results.length > 0) {
    const topResult = results[0];
    if (topResult.b.baoDong && topResult.pct >= 30) {
      clinicalScore += 2;
      breakdown.push({
        parameter: 'Bệnh lý cảnh báo',
        value: topResult.b.ten,
        points: 2,
        reason: 'Chẩn đoán sơ bộ thuộc nhóm Cấp cứu / Báo động đỏ',
        category: 'clinical',
      });
    }

    // Check specific critical symptoms in top matches
    const hasSTElevation = topResult.matched.some((m) => m.tc.id === 'st_chenh');
    if (hasSTElevation && !breakdown.some((b) => b.parameter === 'ECG ST')) {
      clinicalScore += 2;
      breakdown.push({
        parameter: 'ECG',
        value: 'ST chênh lên',
        points: 2,
        reason: 'Thiếu máu cơ tim xuyên thành cấp tính',
        category: 'clinical',
      });
    }

    const hasPeritoneal = topResult.matched.some((m) => m.tc.id === 'blumberg' || m.tc.id === 'bung_cung');
    if (hasPeritoneal && !breakdown.some((b) => b.parameter === 'Dấu màng bụng')) {
      clinicalScore += 2;
      breakdown.push({
        parameter: 'Khám bụng',
        value: 'Bụng gồng cứng / Blumberg (+)',
        points: 2,
        reason: 'Hội chứng viêm phúc mạc / Bụng ngoại khoa khẩn',
        category: 'clinical',
      });
    }
  }

  const totalScore = vitalScore + clinicalScore;

  // Determine Urgency Level based on NEWS2 protocol & Critical Triggers
  // Any single vital parameter with 3 points automatically triggers at least HIGH risk.
  const hasSevereSingleVital = breakdown.some((b) => b.category === 'vital' && b.points >= 3);

  let level: 1 | 2 | 3 | 4 = 1;
  let levelCode: UrgencyLevelCode = 'LOW';
  let levelName = 'Mức 1: Nguy cơ Thấp';
  let badgeLabel = 'NGUY CƠ THẤP';
  let urgencyText = 'Bệnh nhân ổn định / Theo dõi thường quy';
  let monitoringFrequency = 'Theo dõi sinh hiệu tối thiểu mỗi 4–6 giờ';
  let clinicalAction = 'Tiếp tục điều trị theo phác đồ thường quy, thăm dò cận lâm sàng theo hẹn.';
  let color = {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-900',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    hex: '#059669',
    gradient: 'from-emerald-500 to-teal-600',
  };

  if (totalScore >= 7 || (totalScore >= 5 && hasSevereSingleVital)) {
    level = 4;
    levelCode = 'CRITICAL';
    levelName = 'Mức 4: Nguy kịch / Cấp cứu khẩn';
    badgeLabel = 'BÁO ĐỘNG ĐỎ · CẤP CỨU KHẨN';
    urgencyText = 'NGUY KỊCH - Đe dọa tính mạng tức thời';
    monitoringFrequency = 'Theo dõi liên tục trên Monitor đa thông số';
    clinicalAction =
      'Kích hoạt Báo động đỏ nội viện (Code Red), kiểm soát đường thở và huyết động, chuyển ngay phòng Cấp cứu / ICU.';
    color = {
      bg: 'bg-rose-50',
      border: 'border-rose-400',
      text: 'text-rose-950',
      badgeBg: 'bg-rose-600',
      badgeText: 'text-white',
      hex: '#e11d48',
      gradient: 'from-rose-600 to-red-700',
    };
  } else if (totalScore >= 5 || hasSevereSingleVital) {
    level = 3;
    levelCode = 'HIGH';
    levelName = 'Mức 3: Nguy cơ Cao';
    badgeLabel = 'NGUY CƠ CAO';
    urgencyText = 'Nguy cơ diễn tiến suy tạng cấp tính';
    monitoringFrequency = 'Theo dõi sinh hiệu mỗi 30–60 phút';
    clinicalAction =
      'Bác sĩ chuyên khoa thăm khám ngay lập tức, chuẩn bị phương tiện hồi sức tích cực và xét nghiệm cấp cứu.';
    color = {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-950',
      badgeBg: 'bg-orange-600',
      badgeText: 'text-white',
      hex: '#ea580c',
      gradient: 'from-orange-500 to-amber-600',
    };
  } else if (totalScore >= 3) {
    level = 2;
    levelCode = 'MEDIUM';
    levelName = 'Mức 2: Nguy cơ Trung bình';
    badgeLabel = 'NGUY CƠ TRUNG BÌNH';
    urgencyText = 'Cần theo dõi sát / Nguy cơ chuyển nặng';
    monitoringFrequency = 'Theo dõi sinh hiệu mỗi 1–2 giờ';
    clinicalAction =
      'Bác sĩ điều trị đánh giá lại lâm sàng, can thiệp điều dưỡng tích cực và rà soát kết quả cận lâm sàng.';
    color = {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-white',
      hex: '#d97706',
      gradient: 'from-amber-500 to-yellow-600',
    };
  }

  return {
    totalScore,
    vitalScore,
    clinicalScore,
    level,
    levelCode,
    levelName,
    badgeLabel,
    urgencyText,
    monitoringFrequency,
    clinicalAction,
    color,
    breakdown,
  };
}

/**
 * ====================================================================
 * PEWS (PEDIATRIC EARLY WARNING SCORE) - CẢNH BÁO SỚM NHI KHOA
 * Chuẩn hóa theo Brighton PEWS & Hội đồng Hồi sức Cấp cứu Nhi khoa
 * ====================================================================
 */

export interface PewsDomainScore {
  domain: 'behavior' | 'cardiovascular' | 'respiratory' | 'therapy';
  title: string;
  points: number;
  finding: string;
  reason: string;
}

export interface PewsScoreResult {
  totalScore: number;
  isPediatric: boolean;
  ageYears: number;
  level: 1 | 2 | 3 | 4;
  levelName: string;
  badgeLabel: string;
  urgencyText: string;
  monitoringFrequency: string;
  clinicalAction: string;
  escalationProtocol: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    hex: string;
    gradient: string;
  };
  domains: PewsDomainScore[];
  breakdown: ScoreItem[];
}

export function calculatePewsScore(
  vitals?: VitalsState,
  labs?: LabsState,
  form?: ClinicalFormState,
  selectedIds?: Set<string>
): PewsScoreResult {
  const ageYears = form?.tuoi ? parseInt(form.tuoi, 10) : 10;
  const isPediatric = !isNaN(ageYears) && ageYears < 16 && ageYears >= 0;

  const domains: PewsDomainScore[] = [];
  const breakdown: ScoreItem[] = [];

  // 1. BEHAVIOR (Tri giác & Hành vi tương tác của trẻ)
  let behaviorPoints = 0;
  let behaviorFinding = 'Tỉnh táo, chơi ngoan, bú/ăn tốt, tương tác bình thường với cha mẹ';
  let behaviorReason = 'Tri giác bình thường (0 điểm)';

  const hasComa = selectedIds?.has('hon_me') || selectedIds?.has('gcs_giam');
  const hasLethargy = selectedIds?.has('li_bi') || selectedIds?.has('lo_mo');
  const hasIrritability = selectedIds?.has('but_rut') || selectedIds?.has('quay_khoc');

  if (hasComa) {
    behaviorPoints = 3;
    behaviorFinding = 'Hôn mê hoặc chỉ đáp ứng với kích thích đau / Giảm trương lực cơ mềm nhẽo';
    behaviorReason = 'Rối loạn tri giác nguy kịch';
  } else if (hasLethargy) {
    behaviorPoints = 2;
    behaviorFinding = 'Li bì, bứt rứt khó dỗ, ngủ lơ mơ khó đánh thức';
    behaviorReason = 'Ức chế tri giác hoặc bứt rứt nhiều';
  } else if (hasIrritability) {
    behaviorPoints = 1;
    behaviorFinding = 'Ngủ nhiều nhưng dễ đánh thức, bứt rứt nhẹ, dỗ nín được';
    behaviorReason = 'Bứt rứt nhẹ hoặc ngủ nhiều';
  }

  domains.push({
    domain: 'behavior',
    title: 'Hành vi & Tri giác',
    points: behaviorPoints,
    finding: behaviorFinding,
    reason: behaviorReason,
  });

  if (behaviorPoints > 0) {
    breakdown.push({
      parameter: 'PEWS: Tri giác & Hành vi',
      value: behaviorFinding,
      points: behaviorPoints,
      reason: behaviorReason,
      category: 'clinical',
    });
  }

  // 2. CARDIOVASCULAR (Tuần hoàn, Mạch & Thời gian đầy mao mạch CRT)
  let cvPoints = 0;
  let cvFinding = 'Da niêm hồng hào, thời gian đầy mao mạch CRT < 2 giây, mạch đều';
  let cvReason = 'Tuần hoàn ổn định (0 điểm)';

  const hr = vitals?.vMach ? parseFloat(vitals.vMach) : NaN;
  const hasShockSigns =
    selectedIds?.has('tay_chan_lanh') ||
    selectedIds?.has('mach_nhanh_nho') ||
    selectedIds?.has('mach_khong_bat_duoc');

  // Ngưỡng mạch theo lứa tuổi Nhi khoa
  let hrUpperNormal = 130;
  let hrCriticalHigh = 160;
  let hrCriticalLow = 60;
  if (ageYears < 1) {
    hrUpperNormal = 160;
    hrCriticalHigh = 180;
    hrCriticalLow = 90;
  } else if (ageYears <= 5) {
    hrUpperNormal = 140;
    hrCriticalHigh = 160;
    hrCriticalLow = 70;
  } else if (ageYears <= 12) {
    hrUpperNormal = 120;
    hrCriticalHigh = 140;
    hrCriticalLow = 60;
  } else {
    hrUpperNormal = 100;
    hrCriticalHigh = 130;
    hrCriticalLow = 50;
  }

  if (hasShockSigns || (!isNaN(hr) && (hr >= hrCriticalHigh || hr <= hrCriticalLow))) {
    cvPoints = 3;
    cvFinding = hasShockSigns
      ? 'Chi lạnh, mạch nhanh nhỏ/khó bắt, CRT ≥ 4s (Dấu hiệu sốc)'
      : `Mạch bất thường nguy kịch: ${hr} l/p (CRT ≥ 4s / Tái xám nặng)`;
    cvReason = 'Suy tuần hoàn nặng / Nguy cơ sốc mất bù';
  } else if (!isNaN(hr) && hr > hrUpperNormal + 20) {
    cvPoints = 2;
    cvFinding = `Da tái xám / nổi bông, CRT 3s, Mạch nhanh rõ: ${hr} l/p`;
    cvReason = 'Nhịp tim nhanh > 20 nhịp so với ngưỡng tuổi';
  } else if (!isNaN(hr) && hr > hrUpperNormal) {
    cvPoints = 1;
    cvFinding = `Da tái nhẹ, CRT 2s, Mạch nhanh nhẹ: ${hr} l/p`;
    cvReason = 'Nhịp tim nhanh nhẹ so với tuổi';
  }

  domains.push({
    domain: 'cardiovascular',
    title: 'Tuần hoàn & Mạch',
    points: cvPoints,
    finding: cvFinding,
    reason: cvReason,
  });

  if (cvPoints > 0) {
    breakdown.push({
      parameter: 'PEWS: Tuần hoàn',
      value: cvFinding,
      points: cvPoints,
      reason: cvReason,
      category: 'vital',
    });
  }

  // 3. RESPIRATORY (Hô hấp, Nhịp thở, Co kéo cơ hô hấp & SpO2)
  let respPoints = 0;
  let respFinding = 'Thở êm đều theo tuổi, không co kéo hõm ức/lồng ngực, SpO₂ ≥ 95%';
  let respReason = 'Hô hấp bình thường (0 điểm)';

  const rr = vitals?.vTho ? parseFloat(vitals.vTho) : NaN;
  const spo2 = vitals?.vSpo2 ? parseFloat(vitals.vSpo2) : NaN;
  const hasGrunting = selectedIds?.has('tho_ren') || selectedIds?.has('tho_rit');
  const hasRetractions = selectedIds?.has('co_keo') || selectedIds?.has('rut_lom_nguc');

  // Ngưỡng thở theo lứa tuổi Nhi khoa
  let rrUpperNormal = 28;
  if (ageYears < 1) rrUpperNormal = 45;
  else if (ageYears <= 5) rrUpperNormal = 35;
  else if (ageYears <= 12) rrUpperNormal = 25;
  else rrUpperNormal = 20;

  if (hasGrunting || (!isNaN(spo2) && spo2 < 90) || (!isNaN(rr) && rr >= rrUpperNormal + 25)) {
    respPoints = 3;
    respFinding = hasGrunting
      ? 'Thở rên (grunting), co kéo rất nặng, SpO₂ giảm sâu hoặc kiệt sức hô hấp'
      : `Thở rất nhanh (${rr} l/p), SpO₂ ${!isNaN(spo2) ? spo2 + '%' : '<90%'}, co kéo cơ hô hấp nặng`;
    respReason = 'Suy hô hấp nặng đe dọa ngừng thở';
  } else if (hasRetractions || (!isNaN(spo2) && spo2 <= 93) || (!isNaN(rr) && rr >= rrUpperNormal + 15)) {
    respPoints = 2;
    respFinding = `Thở nhanh (${!isNaN(rr) ? rr + ' l/p' : 'vừa'}), rút lõm ngực / phập phồng cánh mũi, SpO₂ ${!isNaN(spo2) ? spo2 + '%' : '90-93%'}`;
    respReason = 'Khó thở vừa, co kéo cơ hô hấp rõ';
  } else if ((!isNaN(spo2) && spo2 <= 95) || (!isNaN(rr) && rr > rrUpperNormal)) {
    respPoints = 1;
    respFinding = `Thở nhanh nhẹ (${!isNaN(rr) ? rr + ' l/p' : 'nhẹ'}), co kéo nhẹ hõm ức, SpO₂ ${!isNaN(spo2) ? spo2 + '%' : '94-95%'}`;
    respReason = 'Thở nhanh nhẹ so với lứa tuổi';
  }

  domains.push({
    domain: 'respiratory',
    title: 'Hô hấp & Nhịp thở',
    points: respPoints,
    finding: respFinding,
    reason: respReason,
  });

  if (respPoints > 0) {
    breakdown.push({
      parameter: 'PEWS: Hô hấp',
      value: respFinding,
      points: respPoints,
      reason: respReason,
      category: 'vital',
    });
  }

  // 4. THERAPY (Liệu pháp hỗ trợ: Khí dung hoặc Thở oxy liên tục)
  let therapyPoints = 0;
  if (selectedIds?.has('khi_dung') || selectedIds?.has('tho_oxy')) {
    therapyPoints = 2;
    domains.push({
      domain: 'therapy',
      title: 'Hỗ trợ hô hấp',
      points: 2,
      finding: 'Đang thở oxy hỗ trợ hoặc khí dung dãn phế quản liên tục',
      reason: 'Cần can thiệp hỗ trợ thông khí tích cực (+2 điểm)',
    });
    breakdown.push({
      parameter: 'PEWS: Liệu pháp hỗ trợ',
      value: 'Khí dung / Thở oxy',
      points: 2,
      reason: 'Thở oxy hoặc khí dung liên tục',
      category: 'clinical',
    });
  }

  const totalScore = behaviorPoints + cvPoints + respPoints + therapyPoints;

  // Phân tầng nguy cơ PEWS
  let level: 1 | 2 | 3 | 4 = 1;
  let levelName = 'Mức 1: Nguy cơ Thấp (PEWS 0–2)';
  let badgeLabel = 'NGUY CƠ THẤP · NHI KHOA';
  let urgencyText = 'Trẻ ổn định, đáp ứng điều trị thông thường';
  let monitoringFrequency = 'Đo sinh hiệu & đánh giá PEWS tối thiểu mỗi 4–6 giờ';
  let clinicalAction = 'Tiếp tục theo dõi tại buồng bệnh thường quy, đảm bảo đủ nước và dinh dưỡng.';
  let escalationProtocol = 'Điều dưỡng theo dõi thường quy. Báo bác sĩ nếu PEWS tăng ≥ 1 điểm.';
  let color = {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    text: 'text-emerald-900',
    badgeBg: 'bg-emerald-600',
    badgeText: 'text-white',
    hex: '#059669',
    gradient: 'from-emerald-500 to-teal-600',
  };

  if (totalScore >= 7 || behaviorPoints === 3 || cvPoints === 3 || respPoints === 3) {
    level = 4;
    levelName = 'Mức 4: Nguy kịch Nhi (PEWS ≥ 7 hoặc 1 tiêu chí 3đ)';
    badgeLabel = 'BÁO ĐỘNG ĐỎ NHI · CODE BLUE';
    urgencyText = 'NGUY KỊCH - Nguy cơ ngừng tim/thở tức thời';
    monitoringFrequency = 'Theo dõi liên tục trên Monitor sơ sinh/nhi';
    clinicalAction =
      'Kích hoạt Báo động đỏ Cấp cứu Nhi (Code Blue Nhi / MET). Đội Cấp cứu Nhi có mặt tại giường trong vòng 5 phút. Chuẩn bị chuyển ngay Khoa Hồi sức tích cực Nhi (PICU).';
    escalationProtocol =
      'Bác sĩ Cấp cứu Nhi / Hồi sức Nhi tiếp nhận ngay lập tức, can thiệp đường thở nâng cao, thiết lập đường truyền nội tủy (IO) hoặc CVC nếu thất bại tiêm tĩnh mạch ngoại biên.';
    color = {
      bg: 'bg-rose-50',
      border: 'border-rose-400',
      text: 'text-rose-950',
      badgeBg: 'bg-rose-600',
      badgeText: 'text-white',
      hex: '#e11d48',
      gradient: 'from-rose-600 to-red-700',
    };
  } else if (totalScore >= 5) {
    level = 3;
    levelName = 'Mức 3: Nguy cơ Cao (PEWS 5–6)';
    badgeLabel = 'NGUY CƠ CAO · CẦN BÁC SĨ NHI';
    urgencyText = 'Trẻ diễn tiến nặng nhanh, nguy cơ suy tạng';
    monitoringFrequency = 'Theo dõi sinh hiệu sát mỗi 30–60 phút';
    clinicalAction =
      'Báo ngay Bác sĩ chuyên khoa Nhi hoặc Bác sĩ trực Cấp cứu khám tại giường trong vòng 15–30 phút. Chuẩn bị giường hồi sức Nhi.';
    escalationProtocol =
      'Bác sĩ Nhi khám lại toàn diện, chỉ định xét nghiệm cấp cứu (khí máu, CTM, lactate, đường huyết mao mạch) và xem xét hội chẩn Hồi sức Nhi.';
    color = {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      text: 'text-orange-950',
      badgeBg: 'bg-orange-600',
      badgeText: 'text-white',
      hex: '#ea580c',
      gradient: 'from-orange-500 to-amber-600',
    };
  } else if (totalScore >= 3) {
    level = 2;
    levelName = 'Mức 2: Nguy cơ Trung bình (PEWS 3–4)';
    badgeLabel = 'NGUY CƠ TRUNG BÌNH · CẦN THEO DÕI';
    urgencyText = 'Cần theo dõi sát, nguy cơ chuyển nặng';
    monitoringFrequency = 'Đo sinh hiệu & đánh giá lại PEWS mỗi 1–2 giờ';
    clinicalAction =
      'Điều dưỡng phụ trách báo Bác sĩ điều trị. Bác sĩ đánh giá lại lâm sàng trong vòng 60 phút và điều chỉnh y lệnh.';
    escalationProtocol =
      'Điều dưỡng tăng tần suất theo dõi. Thông báo người nhà chú ý các dấu hiệu cảnh báo (thở nhanh, quấy khóc, tay chân lạnh).';
    color = {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-white',
      hex: '#d97706',
      gradient: 'from-amber-500 to-yellow-600',
    };
  }

  return {
    totalScore,
    isPediatric,
    ageYears,
    level,
    levelName,
    badgeLabel,
    urgencyText,
    monitoringFrequency,
    clinicalAction,
    escalationProtocol,
    color,
    domains,
    breakdown,
  };
}

/**
 * ====================================================================
 * ESI (EMERGENCY SEVERITY INDEX - PHÂN TẦNG CẤP CỨU 5 CẤP ĐỘ)
 * Chuẩn vàng phân loại bệnh nhân tại Khoa Cấp cứu (ED) BV Việt Nam & Quốc tế
 * ====================================================================
 */

export interface EsiScoreResult {
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  levelCode: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LEVEL_4' | 'LEVEL_5';
  badgeLabel: string;
  triageCategory: string;
  timeToPhysician: string;
  targetArea: string;
  criteriaMet: string[];
  predictedResources: {
    count: number;
    resourceList: string[];
    details: string;
  };
  dangerVitals: string[];
  clinicalAction: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    hex: string;
    gradient: string;
  };
}

export function calculateEsiTriage(
  vitals?: VitalsState,
  labs?: LabsState,
  results?: AnalysisResult[],
  form?: ClinicalFormState,
  selectedIds?: Set<string>
): EsiScoreResult {
  const criteriaMet: string[] = [];
  const dangerVitals: string[] = [];

  // Parse vitals
  const hr = vitals?.vMach ? parseFloat(vitals.vMach) : NaN;
  const rr = vitals?.vTho ? parseFloat(vitals.vTho) : NaN;
  const sbp = vitals?.vHATT ? parseFloat(vitals.vHATT) : NaN;
  const spo2 = vitals?.vSpo2 ? parseFloat(vitals.vSpo2) : NaN;
  const temp = vitals?.vNhiet ? parseFloat(vitals.vNhiet) : NaN;

  // Kiểm tra sinh hiệu nguy hiểm (Danger zone vitals)
  if (!isNaN(hr) && (hr > 120 || hr < 50)) dangerVitals.push(`Mạch: ${hr} l/p (Nguy hiểm: >120 hoặc <50)`);
  if (!isNaN(rr) && (rr > 24 || rr < 10)) dangerVitals.push(`Nhịp thở: ${rr} l/p (Nguy hiểm: >24 hoặc <10)`);
  if (!isNaN(spo2) && spo2 < 92) dangerVitals.push(`SpO₂: ${spo2}% (Hạ oxy máu < 92%)`);
  if (!isNaN(sbp) && (sbp < 90 || sbp >= 200)) dangerVitals.push(`Huyết áp tâm thu: ${sbp} mmHg (Tụt <90 hoặc Cơn THA ≥200)`);
  if (!isNaN(temp) && temp > 40.0) dangerVitals.push(`Sốt cực cao: ${temp}°C`);

  // BƯỚC A: Cần can thiệp duy trì sự sống ngay lập tức? (ESI Level 1)
  const isArrest = selectedIds?.has('ngung_tim') || selectedIds?.has('ngung_tho');
  const isDeepComa = selectedIds?.has('hon_me') || (selectedIds?.has('gcs_giam') && (sbp < 80 || spo2 < 85));
  const isSevereShock = (!isNaN(sbp) && sbp < 70) || selectedIds?.has('mach_khong_bat_duoc');
  const isSevereIntubationNeeded = (!isNaN(spo2) && spo2 < 82) || selectedIds?.has('tho_ngat');

  if (isArrest || isDeepComa || isSevereShock || isSevereIntubationNeeded) {
    if (isArrest) criteriaMet.push('Ngừng tuần hoàn hô hấp / Cần hồi sức tim phổi ngay');
    if (isDeepComa) criteriaMet.push('Hôn mê sâu / Không có khả năng bảo vệ đường thở');
    if (isSevereShock) criteriaMet.push('Sốc trụy mạch nặng / Không bắt được mạch hoặc HA < 70 mmHg');
    if (isSevereIntubationNeeded) criteriaMet.push('Suy hô hấp nguy kịch cần đặt NKQ khẩn');

    return {
      level: 1,
      levelCode: 'LEVEL_1',
      levelName: 'ESI Mức 1: Hồi sức khẩn (Resuscitation)',
      badgeLabel: 'ESI MỨC 1 · HỒI SỨC CẤP CỨU',
      triageCategory: 'Nguy kịch đe dọa tính mạng tức thời',
      timeToPhysician: 'Ngay lập tức (0 phút)',
      targetArea: 'Phòng Hồi sức Cấp cứu (Resus Room / Red Zone)',
      criteriaMet,
      predictedResources: {
        count: 5,
        resourceList: [
          'Kiểm soát đường thở nâng cao / Đặt NKQ',
          'Truyền dịch & vận mạch hồi sức',
          'Monitor theo dõi huyết động xâm lấn',
          'Xét nghiệm cấp cứu tại giường (POCT)',
          'Khí máu động mạch & X-quang tại giường',
        ],
        details: 'Can thiệp đa tài nguyên hồi sức chuyên sâu.',
      },
      dangerVitals,
      clinicalAction:
        'Chuyển thẳng buồng Hồi sức (Red Zone). Bác sĩ cấp cứu & kíp trực can thiệp ngay lập tức: kiểm soát đường thở, hồi sức tim phổi tuần hoàn, thiết lập đường truyền lớn/CVC.',
      color: {
        bg: 'bg-rose-50',
        border: 'border-rose-500',
        text: 'text-rose-950',
        badgeBg: 'bg-rose-600',
        badgeText: 'text-white',
        hex: '#e11d48',
        gradient: 'from-rose-600 to-red-700',
      },
    };
  }

  // BƯỚC B: Tình huống nguy cơ cao? Lú lẫn/ngủ gà? Đau dữ dội? (ESI Level 2)
  const hasChestPainSTEMI =
    (selectedIds?.has('dau_nguc') || selectedIds?.has('dau_nguc_lan')) &&
    (selectedIds?.has('st_chenh') || (labs?.lTrop && parseFloat(labs.lTrop) >= 0.04));
  const hasPeritonealSigns = selectedIds?.has('bung_cung') || selectedIds?.has('blumberg');
  const hasSevereBleeding = selectedIds?.has('xuat_huyet_tieu_hoa') || selectedIds?.has('tieu_phan_den_o_at');
  const hasAlteredMental = selectedIds?.has('lu_lan') || selectedIds?.has('lo_mo') || selectedIds?.has('yeu_nua_nguoi');
  const hasSeverePain = selectedIds?.has('dau_du_doi') || selectedIds?.has('con_dau_quan_than');
  const isHighRiskVitals = dangerVitals.length >= 2;

  if (
    hasChestPainSTEMI ||
    hasPeritonealSigns ||
    hasSevereBleeding ||
    hasAlteredMental ||
    hasSeverePain ||
    isHighRiskVitals ||
    (results && results[0]?.b.baoDong && dangerVitals.length >= 1)
  ) {
    if (hasChestPainSTEMI) criteriaMet.push('Hội chứng vành cấp nghi STEMI / Tăng Troponin cấp');
    if (hasPeritonealSigns) criteriaMet.push('Dấu hiệu viêm phúc mạc / Bụng ngoại khoa khẩn');
    if (hasSevereBleeding) criteriaMet.push('Xuất huyết cấp tính nguy cơ tụt huyết áp');
    if (hasAlteredMental) criteriaMet.push('Biến đổi tri giác cấp tính / Nghi ngờ đột quỵ não');
    if (hasSeverePain) criteriaMet.push('Đau cấp tính mức độ dữ dội (VAS ≥ 7/10)');
    if (isHighRiskVitals) criteriaMet.push(`Nhiều thông số sinh hiệu nguy hiểm: ${dangerVitals.join('; ')}`);

    return {
      level: 2,
      levelCode: 'LEVEL_2',
      levelName: 'ESI Mức 2: Cấp cứu khẩn (Emergent / High Risk)',
      badgeLabel: 'ESI MỨC 2 · CẤP CỨU KHẨN',
      triageCategory: 'Tình huống nguy cơ cao hoặc biến đổi sinh hiệu nghiêm trọng',
      timeToPhysician: 'Trong vòng 10–15 phút',
      targetArea: 'Khu vực Cấp cứu ưu tiên (Orange Zone)',
      criteriaMet,
      predictedResources: {
        count: 3,
        resourceList: [
          'Xét nghiệm máu cấp cứu (CTM, Sinh hóa, Đông máu, Men tim)',
          'Thiết lập đường truyền tĩnh mạch & truyền dịch',
          'Chẩn đoán hình ảnh khẩn (ECG, X-quang, Siêu âm Fast, CT-scan)',
        ],
        details: 'Cần can thiệp nhanh để phòng ngừa tổn thương tạng thứ phát.',
      },
      dangerVitals,
      clinicalAction:
        'Chuyển ngay giường Cấp cứu có gắn Monitor. Bác sĩ cấp cứu khám trong vòng 10–15 phút. Thiết lập đường truyền IV, lấy máu xét nghiệm khẩn, làm ECG 12 chuyển đạo ngay lập tức.',
      color: {
        bg: 'bg-orange-50',
        border: 'border-orange-400',
        text: 'text-orange-950',
        badgeBg: 'bg-orange-600',
        badgeText: 'text-white',
        hex: '#ea580c',
        gradient: 'from-orange-500 to-amber-600',
      },
    };
  }

  // BƯỚC C & D: Đánh giá số lượng tài nguyên y tế cần dùng (Resources Needed)
  const resourceList: string[] = [];

  // 1. Xét nghiệm máu / nước tiểu
  if (
    form?.text.cls.trim() ||
    labs?.lBC ||
    labs?.lHct ||
    labs?.lTC ||
    labs?.lGlu ||
    selectedIds?.has('sot') ||
    selectedIds?.has('ns1_dengue')
  ) {
    resourceList.push('Xét nghiệm máu / Vi sinh (CTM, NS1, Men gan, Sinh hóa)');
  }

  // 2. Chẩn đoán hình ảnh (X-quang, Siêu âm, CT)
  if (
    selectedIds?.has('kho_tho') ||
    selectedIds?.has('dau_bung') ||
    selectedIds?.has('chan_thuong') ||
    form?.text.cls.toLowerCase().includes('x-quang') ||
    form?.text.cls.toLowerCase().includes('siêu âm')
  ) {
    resourceList.push('Chẩn đoán hình ảnh (X-quang ngực, Siêu âm ổ bụng)');
  }

  // 3. Dịch truyền tĩnh mạch
  if (
    selectedIds?.has('non_nhieu') ||
    selectedIds?.has('tieu_chay') ||
    selectedIds?.has('sot_cao_27') ||
    (!isNaN(temp) && temp >= 38.5)
  ) {
    resourceList.push('Dịch truyền tĩnh mạch / Bù nước điện giải đường tiêm');
  }

  // 4. Thuốc tiêm / truyền tĩnh mạch hoặc bắp
  if (
    selectedIds?.has('dau_bung') ||
    selectedIds?.has('non_oi') ||
    selectedIds?.has('con_co_that')
  ) {
    resourceList.push('Thuốc tiêm tĩnh mạch / bắp (Giảm đau, chống nôn, kháng sinh tiêm)');
  }

  const resourceCount = resourceList.length;

  // Nếu có sinh hiệu ở ngưỡng nguy hiểm đơn độc thì cân nhắc nâng lên Level 2 hoặc Level 3
  if (dangerVitals.length >= 1 && resourceCount >= 1) {
    criteriaMet.push(`Có 1 sinh hiệu bất thường: ${dangerVitals[0]}`);
  }

  if (resourceCount >= 2) {
    // ESI Level 3: Khẩn cấp (Cần ≥ 2 tài nguyên)
    criteriaMet.push(`Dự kiến cần ${resourceCount} nhóm tài nguyên y tế (Xét nghiệm + Hình ảnh/Dịch truyền)`);
    return {
      level: 3,
      levelCode: 'LEVEL_3',
      levelName: 'ESI Mức 3: Khẩn cấp (Urgent - Cần ≥ 2 tài nguyên)',
      badgeLabel: 'ESI MỨC 3 · KHẨN CẤP',
      triageCategory: 'Cần nhiều tài nguyên chẩn đoán và điều trị, sinh hiệu chưa nguy kịch',
      timeToPhysician: 'Trong vòng 30–60 phút',
      targetArea: 'Khu vực Cấp cứu trung bình (Yellow Zone)',
      criteriaMet,
      predictedResources: {
        count: resourceCount,
        resourceList,
        details: 'Bệnh nhân cần phối hợp nhiều kỹ thuật thăm dò cận lâm sàng và truyền dịch/thuốc tiêm.',
      },
      dangerVitals,
      clinicalAction:
        'Phân buồng bệnh Cấp cứu (Yellow Zone). Bác sĩ thăm khám trong vòng 30–60 phút. Cho y lệnh xét nghiệm máu, siêu âm/X-quang và thiết lập đường truyền nếu cần.',
      color: {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-950',
        badgeBg: 'bg-amber-500',
        badgeText: 'text-white',
        hex: '#d97706',
        gradient: 'from-amber-500 to-yellow-600',
      },
    };
  } else if (resourceCount === 1) {
    // ESI Level 4: Bán khẩn (Cần đúng 1 tài nguyên)
    criteriaMet.push('Dự kiến chỉ cần 1 tài nguyên y tế duy nhất');
    return {
      level: 4,
      levelCode: 'LEVEL_4',
      levelName: 'ESI Mức 4: Bán khẩn (Less Urgent - Cần 1 tài nguyên)',
      badgeLabel: 'ESI MỨC 4 · BÁN KHẨN',
      triageCategory: 'Bệnh nhẹ đến trung bình, chỉ cần 1 thăm dò đơn giản',
      timeToPhysician: 'Trong vòng 60–120 phút',
      targetArea: 'Khu Khám Cấp cứu nhẹ / Phòng tiểu phẫu (Green Zone)',
      criteriaMet,
      predictedResources: {
        count: 1,
        resourceList,
        details: 'Chỉ cần một tài nguyên (ví dụ 1 xét nghiệm máu hoặc 1 phim X-quang đơn thuần).',
      },
      dangerVitals,
      clinicalAction:
        'Hướng dẫn người bệnh tại khu vực chờ khám phân loại (Green Zone). Thăm khám trong vòng 1–2 giờ, chỉ định thăm dò đơn lẻ và kê đơn điều trị.',
      color: {
        bg: 'bg-blue-50',
        border: 'border-blue-300',
        text: 'text-blue-950',
        badgeBg: 'bg-blue-600',
        badgeText: 'text-white',
        hex: '#2563eb',
        gradient: 'from-blue-500 to-indigo-600',
      },
    };
  } else {
    // ESI Level 5: Không khẩn cấp (0 tài nguyên)
    criteriaMet.push('Không cần sử dụng tài nguyên can thiệp chuyên sâu (Khám lâm sàng & tư vấn)');
    return {
      level: 5,
      levelCode: 'LEVEL_5',
      levelName: 'ESI Mức 5: Không khẩn cấp (Non-urgent - 0 tài nguyên)',
      badgeLabel: 'ESI MỨC 5 · KHÔNG KHẨN CẤP',
      triageCategory: 'Khám kiểm tra lâm sàng, đơn thuốc ngoại trú, tư vấn',
      timeToPhysician: 'Có thể chờ 120–240 phút',
      targetArea: 'Phòng khám Ngoại trú / Khu tư vấn y tế (Blue Zone)',
      criteriaMet,
      predictedResources: {
        count: 0,
        resourceList: ['Khám lâm sàng', 'Đơn thuốc uống ngoại trú', 'Hướng dẫn theo dõi tại nhà'],
        details: 'Không cần tài nguyên cấp cứu chuyên sâu.',
      },
      dangerVitals,
      clinicalAction:
        'Thăm khám lâm sàng thường quy khi các bệnh nhân nặng hơn đã được giải quyết. Hướng dẫn chăm sóc, kê đơn thuốc ngoại trú hoặc chuyển khám chuyên khoa hẹn giờ.',
      color: {
        bg: 'bg-slate-50',
        border: 'border-slate-300',
        text: 'text-slate-800',
        badgeBg: 'bg-slate-600',
        badgeText: 'text-white',
        hex: '#475569',
        gradient: 'from-slate-600 to-slate-700',
      },
    };
  }
}

