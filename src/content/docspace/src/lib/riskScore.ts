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
