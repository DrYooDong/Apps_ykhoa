/**
 * DocSpace — Cardiovascular Risk & Lipid Studio (TypeScript)
 * SCORE2, ASCVD 10 Năm, Đồng Hồ Bán Nguyệt Gauge SVG & Thanh Mô Phỏng Đáp Ứng Statin
 */

export interface CardioRiskPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  values: CardioRiskInputs;
}

export interface CardioRiskInputs {
  age: number;
  gender: 'male' | 'female';
  isSmoker: boolean;
  systolicBp: number;
  totalCholesterolMmol: number;
  hdlCholesterolMmol: number;
  ldlCholesterolMmol: number;
  hasDiabetes: boolean;
  hasCvdHistory: boolean;
  hasCkd: boolean;
}

export interface CardioRiskResult {
  score2Percentage: number;
  riskCategory: 'low' | 'moderate' | 'high' | 'very_high';
  riskCategoryLabel: string;
  riskColor: string;
  targetLdlMmol: number;
  targetLdlMgDl: number;
  currentLdlGapMmol: number;
  statinRegimenRecommendation: string;
  clinicalSummary: string;
  treatmentSteps: string[];
}

export const CARDIO_PRESETS: CardioRiskPreset[] = [
  {
    id: 'post_stemi',
    name: 'Sau Can Thiệp Mạch Vành / STEMI (ASCVD)',
    badge: 'Nguy Cơ Cực Kỳ Cao',
    badgeColor: '#dc2626',
    description: 'Nam 58 tuổi tiền sử đặt Stent mạch vành, LDL-C 3.8 mmol/L. Đích kiểm soát gắt gao < 1.4 mmol/L.',
    values: { age: 58, gender: 'male', isSmoker: true, systolicBp: 135, totalCholesterolMmol: 5.8, hdlCholesterolMmol: 1.0, ldlCholesterolMmol: 3.8, hasDiabetes: false, hasCvdHistory: true, hasCkd: false },
  },
  {
    id: 'dm_ckd',
    name: 'Đái Tháo Đường Có Tổn Thương Thận (CKD)',
    badge: 'Nguy Cơ Rất Cao',
    badgeColor: '#ef4444',
    description: 'Nữ 64 tuổi ĐTĐ Type 2 trên 10 năm kèm eGFR 48 mL/p. Đích LDL-C < 1.4 mmol/L và giảm ≥ 50%.',
    values: { age: 64, gender: 'female', isSmoker: false, systolicBp: 145, totalCholesterolMmol: 6.2, hdlCholesterolMmol: 1.1, ldlCholesterolMmol: 4.1, hasDiabetes: true, hasCvdHistory: false, hasCkd: true },
  },
  {
    id: 'smoker_htn',
    name: 'Tăng Huyết Áp + Hút Thuốc Lá Nhiều Năm',
    badge: 'Nguy Cơ Cao (SCORE2 > 8%)',
    badgeColor: '#f59e0b',
    description: 'Nam 52 tuổi hút thuốc 1 gói/ngày, HA 155 mmHg, LDL-C 3.6 mmol/L. Cần dùng Statin cường độ cao.',
    values: { age: 52, gender: 'male', isSmoker: true, systolicBp: 155, totalCholesterolMmol: 5.9, hdlCholesterolMmol: 0.9, ldlCholesterolMmol: 3.6, hasDiabetes: false, hasCvdHistory: false, hasCkd: false },
  },
  {
    id: 'young_checkup',
    name: 'Người Trẻ Khám Sức Khỏe Định Kỳ',
    badge: 'Nguy Cơ Thấp (SCORE2 < 2%)',
    badgeColor: '#10b981',
    description: 'Nữ 32 tuổi không hút thuốc, không ĐTĐ, HA 115 mmHg, LDL-C 2.8 mmol/L. Ưu tiên lối sống lành mạnh.',
    values: { age: 32, gender: 'female', isSmoker: false, systolicBp: 115, totalCholesterolMmol: 4.5, hdlCholesterolMmol: 1.4, ldlCholesterolMmol: 2.8, hasDiabetes: false, hasCvdHistory: false, hasCkd: false },
  },
];

export function analyzeCardioRisk(inputs: CardioRiskInputs): CardioRiskResult {
  const {
    age,
    gender,
    isSmoker,
    systolicBp,
    totalCholesterolMmol,
    hdlCholesterolMmol,
    ldlCholesterolMmol,
    hasDiabetes,
    hasCvdHistory,
    hasCkd,
  } = inputs;

  const isMale = gender === 'male';

  let riskCategory: 'low' | 'moderate' | 'high' | 'very_high' = 'low';
  let riskCategoryLabel = 'Nguy cơ Thấp (Low Risk)';
  let riskColor = '#10b981';
  let score2Est = 3;

  if (hasCvdHistory) {
    riskCategory = 'very_high';
    riskCategoryLabel = 'Nguy cơ CỰC KỲ CAO (Very High Risk — Đã có Bệnh tim mạch xơ vữa ASCVD)';
    riskColor = '#dc2626';
    score2Est = 25;
  } else if (hasCkd || (hasDiabetes && age >= 50)) {
    riskCategory = 'very_high';
    riskCategoryLabel = 'Nguy cơ RẤT CAO (Very High Risk — ĐTĐ có tổn thương cơ quan đích hoặc CKD)';
    riskColor = '#ef4444';
    score2Est = 18;
  } else if (hasDiabetes) {
    riskCategory = 'high';
    riskCategoryLabel = 'Nguy cơ CAO (High Risk — Đái tháo đường không biến chứng)';
    riskColor = '#f59e0b';
    score2Est = 12;
  } else {
    let baseScore = isMale ? 4 : 2;
    if (age >= 60) baseScore += 5;
    else if (age >= 50) baseScore += 3;
    if (isSmoker) baseScore += 4;
    if (systolicBp >= 160) baseScore += 4;
    else if (systolicBp >= 140) baseScore += 2;
    if (totalCholesterolMmol >= 6.5) baseScore += 3;
    else if (totalCholesterolMmol >= 5.2) baseScore += 1;
    if (hdlCholesterolMmol < 1.0) baseScore += 2;

    score2Est = Math.min(35, Math.max(1, baseScore));

    if (score2Est >= 10) {
      riskCategory = 'very_high';
      riskCategoryLabel = 'Nguy cơ RẤT CAO (SCORE2 ≥ 10%)';
      riskColor = '#ef4444';
    } else if (score2Est >= 5) {
      riskCategory = 'high';
      riskCategoryLabel = 'Nguy cơ CAO (SCORE2 5 - 9%)';
      riskColor = '#f59e0b';
    } else if (score2Est >= 2) {
      riskCategory = 'moderate';
      riskCategoryLabel = 'Nguy cơ TRUNG BÌNH (SCORE2 2 - 4%)';
      riskColor = '#0284c7';
    } else {
      riskCategory = 'low';
      riskCategoryLabel = 'Nguy cơ THẤP (SCORE2 < 2%)';
      riskColor = '#10b981';
    }
  }

  let targetLdlMmol = 3.0;
  let targetLdlMgDl = 116;
  let statinRegimen = '';
  const treatmentSteps: string[] = [];

  if (riskCategory === 'very_high') {
    targetLdlMmol = 1.4;
    targetLdlMgDl = 55;
    statinRegimen = 'Statin Cường Độ Cao: Atorvastatin 40 - 80mg hoặc Rosuvastatin 20 - 40mg ± Ezetimibe 10mg.';
    treatmentSteps.push('Mục tiêu 1: Giảm LDL-C < 1.4 mmol/L (< 55 mg/dL) VÀ giảm ≥ 50% so với mức nền.');
    treatmentSteps.push('Mục tiêu 2: Phối hợp ngay Ezetimibe 10mg nếu sau 4-6 tuần Statin chưa đạt đích.');
    treatmentSteps.push('Mục tiêu 3: Cân nhắc thuốc ức chế PCSK9 nếu vẫn thất bại với Statin + Ezetimibe.');
  } else if (riskCategory === 'high') {
    targetLdlMmol = 1.8;
    targetLdlMgDl = 70;
    statinRegimen = 'Statin Cường Độ Cao hoặc Trung Bình: Atorvastatin 20 - 40mg hoặc Rosuvastatin 10 - 20mg.';
    treatmentSteps.push('Mục tiêu: Giảm LDL-C < 1.8 mmol/L (< 70 mg/dL) VÀ giảm ≥ 50% so với mức nền.');
  } else if (riskCategory === 'moderate') {
    targetLdlMmol = 2.6;
    targetLdlMgDl = 100;
    statinRegimen = 'Statin Cường Độ Trung Bình: Atorvastatin 10 - 20mg, Rosuvastatin 5 - 10mg.';
    treatmentSteps.push('Mục tiêu: Giảm LDL-C < 2.6 mmol/L (< 100 mg/dL). Thay đổi lối sống lành mạnh.');
  } else {
    targetLdlMmol = 3.0;
    targetLdlMgDl = 116;
    statinRegimen = 'Ưu tiên thay đổi lối sống: Vận động thể lực ≥ 150 phút/tuần, cai thuốc lá.';
    treatmentSteps.push('Mục tiêu: Giảm LDL-C < 3.0 mmol/L (< 116 mg/dL).');
  }

  const currentLdlGapMmol = Math.round(Math.max(0, ldlCholesterolMmol - targetLdlMmol) * 100) / 100;

  // Clinical Summary
  let summary = `[Cardio Risk & Lipid Report]\n• Phân tầng: ${riskCategoryLabel} (SCORE2 ước tính: ~${score2Est}%)`;
  summary += `\n• LDL-C Hiện tại: ${ldlCholesterolMmol} mmol/L ➔ Đích: < ${targetLdlMmol} mmol/L (< ${targetLdlMgDl} mg/dL)`;
  summary += `\n• Khoảng cách cần hạ thêm: ${currentLdlGapMmol > 0 ? `Cần hạ thêm ${currentLdlGapMmol} mmol/L` : 'ĐÃ ĐẠT MỤC TIÊU'}`;
  summary += `\n• Phác đồ khuyến nghị: ${statinRegimen}`;

  return {
    score2Percentage: score2Est,
    riskCategory,
    riskCategoryLabel,
    riskColor,
    targetLdlMmol,
    targetLdlMgDl,
    currentLdlGapMmol,
    statinRegimenRecommendation: statinRegimen,
    clinicalSummary: summary,
    treatmentSteps,
  };
}

/**
 * Render Đồng Hồ Bán Nguyệt SCORE2 Gauge SVG
 */
export function renderScore2GaugeSvg(score2Percent: number): string {
  const w = 360;
  const h = 200;
  const cx = w / 2;
  const cy = 160;
  const r = 120;

  const clamped = Math.max(0, Math.min(30, score2Percent));
  const angleDeg = 180 - (clamped / 30) * 180;
  const rad = (angleDeg * Math.PI) / 180;

  const needleX = cx + (r - 20) * Math.cos(rad);
  const needleY = cy - (r - 20) * Math.sin(rad);

  const getPt = (val: number, radius: number) => {
    const a = (180 - (Math.max(0, Math.min(30, val)) / 30) * 180) * (Math.PI / 180);
    return { x: cx + radius * Math.cos(a), y: cy - radius * Math.sin(a) };
  };

  return `
    <svg class="dsp-svg-chart" viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <!-- Score2 Arcs -->
      <!-- Low (<2%) -->
      <path d="M ${getPt(0, r).x} ${getPt(0, r).y} A ${r} ${r} 0 0 1 ${getPt(2, r).x} ${getPt(2, r).y} L ${getPt(2, r - 25).x} ${getPt(2, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(0, r - 25).x} ${getPt(0, r - 25).y} Z" fill="#10b981" />
      
      <!-- Moderate (2-5%) -->
      <path d="M ${getPt(2, r).x} ${getPt(2, r).y} A ${r} ${r} 0 0 1 ${getPt(5, r).x} ${getPt(5, r).y} L ${getPt(5, r - 25).x} ${getPt(5, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(2, r - 25).x} ${getPt(2, r - 25).y} Z" fill="#0284c7" />

      <!-- High (5-10%) -->
      <path d="M ${getPt(5, r).x} ${getPt(5, r).y} A ${r} ${r} 0 0 1 ${getPt(10, r).x} ${getPt(10, r).y} L ${getPt(10, r - 25).x} ${getPt(10, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(5, r - 25).x} ${getPt(5, r - 25).y} Z" fill="#f59e0b" />

      <!-- Very High (10-30%) -->
      <path d="M ${getPt(10, r).x} ${getPt(10, r).y} A ${r} ${r} 0 0 1 ${getPt(30, r).x} ${getPt(30, r).y} L ${getPt(30, r - 25).x} ${getPt(30, r - 25).y} A ${r - 25} ${r - 25} 0 0 0 ${getPt(10, r - 25).x} ${getPt(10, r - 25).y} Z" fill="#dc2626" />

      <!-- Labels -->
      <text x="${getPt(1, r - 35).x}" y="${getPt(1, r - 35).y}" fill="#10b981" font-size="8" font-weight="700">Thấp</text>
      <text x="${getPt(3.5, r - 35).x}" y="${getPt(3.5, r - 35).y}" fill="#0284c7" font-size="8" font-weight="700">TB</text>
      <text x="${getPt(7.5, r - 35).x}" y="${getPt(7.5, r - 35).y}" fill="#f59e0b" font-size="8" font-weight="700">Cao</text>
      <text x="${getPt(20, r - 35).x}" y="${getPt(20, r - 35).y}" fill="#dc2626" font-size="8" font-weight="700">Rất Cao</text>

      <!-- Needle -->
      <line x1="${cx}" y1="${cy}" x2="${needleX}" y2="${needleY}" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="${cx}" cy="${cy}" r="6" fill="#0f172a" stroke="#ffffff" stroke-width="2" />

      <!-- Value Display -->
      <text x="${cx}" y="${cy + 25}" fill="var(--color-text)" font-size="15" font-weight="900" text-anchor="middle">SCORE2: ~${score2Percent}%</text>
    </svg>
  `;
}
