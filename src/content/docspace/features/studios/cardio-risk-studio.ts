/**
 * DocSpace — Cardiovascular Risk & Lipid Studio (TypeScript)
 * Đánh Giá Nguy Cơ Tim Mạch 10 Năm (SCORE2 / ASCVD) & Phân Tầng Đích LDL-C (ESC/AHA)
 */

export interface CardioRiskInputs {
  age: number;
  gender: 'male' | 'female';
  isSmoker: boolean;
  systolicBp: number;       // mmHg
  totalCholesterolMmol: number; // mmol/L
  hdlCholesterolMmol: number;   // mmol/L
  ldlCholesterolMmol: number;   // mmol/L
  hasDiabetes: boolean;
  hasCvdHistory: boolean;   // Đã có tiền sử Nhồi máu cơ tim, đột quỵ, can thiệp mạch vành
  hasCkd: boolean;          // Có bệnh thận mạn eGFR < 60
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

  // 1. Phân tầng nguy cơ tự động nếu có bệnh cảnh đặc biệt (ESC 2021/2023)
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
    // Ước tính SCORE2 đơn giản hóa theo độ tuổi, giới, hút thuốc, HA và Cholesterol
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

  // 2. Xác định Mục tiêu LDL-C theo ESC / AHA
  let targetLdlMmol = 3.0;
  let targetLdlMgDl = 116;
  let statinRegimen = '';
  const treatmentSteps: string[] = [];

  if (riskCategory === 'very_high') {
    targetLdlMmol = 1.4;
    targetLdlMgDl = 55;
    statinRegimen = 'Statin Cường Độ Cao (High-Intensity Statin): Atorvastatin 40 - 80mg hoặc Rosuvastatin 20 - 40mg.';
    treatmentSteps.push('Mục tiêu 1: Giảm LDL-C < 1.4 mmol/L (< 55 mg/dL) VÀ giảm ≥ 50% so với mức nền ban đầu.');
    treatmentSteps.push('Mục tiêu 2: Nếu chưa đạt đích sau 4 - 6 tuần dùng Statin liều tối đa dung nạp, PHỐI HỢP THÊM Ezetimibe 10mg/ngày.');
    treatmentSteps.push('Mục tiêu 3: Nếu vẫn chưa đạt đích ở nhóm nguy cơ cực kỳ cao, phối hợp thêm thuốc ức chế PCSK9 (Evolocumab / Alirocumab).');
  } else if (riskCategory === 'high') {
    targetLdlMmol = 1.8;
    targetLdlMgDl = 70;
    statinRegimen = 'Statin Cường Độ Cao đến Trung Bình: Atorvastatin 20 - 40mg hoặc Rosuvastatin 10 - 20mg.';
    treatmentSteps.push('Mục tiêu: Giảm LDL-C < 1.8 mmol/L (< 70 mg/dL) VÀ giảm ≥ 50% so với mức nền.');
    treatmentSteps.push('Phối hợp Ezetimibe nếu không dung nạp Statin liều cao.');
  } else if (riskCategory === 'moderate') {
    targetLdlMmol = 2.6;
    targetLdlMgDl = 100;
    statinRegimen = 'Statin Cường Độ Trung Bình: Atorvastatin 10 - 20mg, Rosuvastatin 5 - 10mg hoặc Simvastatin 20 - 40mg.';
    treatmentSteps.push('Mục tiêu: Giảm LDL-C < 2.6 mmol/L (< 100 mg/dL). Thay đổi lối sống và chế độ ăn giảm mỡ bão hòa.');
  } else {
    targetLdlMmol = 3.0;
    targetLdlMgDl = 116;
    statinRegimen = 'Ưu tiên thay đổi lối sống: Vận động thể lực ≥ 150 phút/tuần, kiểm soát cân nặng, ngưng hút thuốc lá.';
    treatmentSteps.push('Mục tiêu: Giảm LDL-C < 3.0 mmol/L (< 116 mg/dL). Đánh giá lại nguy cơ mỗi 1 - 2 năm.');
  }

  const currentLdlGapMmol = Math.round(Math.max(0, ldlCholesterolMmol - targetLdlMmol) * 100) / 100;

  // Clinical Summary
  let summary = `[Cardio Risk & Lipid Report]\n• Phân tầng: ${riskCategoryLabel} (SCORE2 ước tính: ~${score2Est}%)`;
  summary += `\n• LDL-C Hiện tại: ${ldlCholesterolMmol} mmol/L ➔ Đích Khuyến nghị: < ${targetLdlMmol} mmol/L (< ${targetLdlMgDl} mg/dL)`;
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
