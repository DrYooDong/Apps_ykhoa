import { PatientData, CDSSAssessmentResult, ScoreItemBreakdown } from '../types/sepsis';

/**
 * Tính Huyết áp trung bình (Mean Arterial Pressure - MAP)
 * MAP = (1/3 * SBP) + (2/3 * DBP)
 */
export function calculateMAP(sbp: number, dbp: number): number {
  if (!sbp || !dbp) return 0;
  return Math.round(((sbp + 2 * dbp) / 3) * 10) / 10;
}

/**
 * Tính Thang điểm NEWS2 (National Early Warning Score 2)
 * Chuẩn của Royal College of Physicians & NICE NG253
 */
export function calculateNEWS2(patient: PatientData): {
  score: number;
  breakdown: ScoreItemBreakdown[];
  hasSingleParam3: boolean;
  riskCategory: 'very_low' | 'low' | 'medium' | 'high';
} {
  const breakdown: ScoreItemBreakdown[] = [];
  let score = 0;
  let hasSingleParam3 = false;

  // 1. Tần số thở (Respiration Rate)
  const rr = patient.respiratoryRate;
  let rrScore = 0;
  let rrDesc = `${rr} lần/phút (Bình thường: 12-20)`;
  if (rr <= 8) {
    rrScore = 3;
    rrDesc = `${rr} lần/phút (Nguy hiểm: ≤ 8)`;
  } else if (rr >= 9 && rr <= 11) {
    rrScore = 1;
    rrDesc = `${rr} lần/phút (Hơi chậm: 9-11)`;
  } else if (rr >= 12 && rr <= 20) {
    rrScore = 0;
  } else if (rr >= 21 && rr <= 24) {
    rrScore = 2;
    rrDesc = `${rr} lần/phút (Tăng nhẹ-vừa: 21-24)`;
  } else if (rr >= 25) {
    rrScore = 3;
    rrDesc = `${rr} lần/phút (Thở rất nhanh: ≥ 25)`;
  }
  score += rrScore;
  if (rrScore === 3) hasSingleParam3 = true;
  breakdown.push({ name: 'Tần số thở', score: rrScore, description: rrDesc, isRedFlag: rrScore === 3 });

  // 2. Độ bão hòa oxy (SpO2)
  const spo2 = patient.spo2;
  let spo2Score = 0;
  let spo2Desc = `${spo2}%`;

  if (patient.copdOrHypercapnicRisk) {
    // Thang đo 2 (Bệnh nhân có nguy cơ suy hô hấp tăng CO2 máu)
    if (spo2 <= 83) {
      spo2Score = 3;
      spo2Desc = `${spo2}% (Rất thấp: ≤ 83%)`;
    } else if (spo2 >= 84 && spo2 <= 85) {
      spo2Score = 2;
      spo2Desc = `${spo2}% (Thấp: 84-85%)`;
    } else if (spo2 >= 86 && spo2 <= 87) {
      spo2Score = 1;
      spo2Desc = `${spo2}% (Hơi thấp: 86-87%)`;
    } else if (spo2 >= 88 && spo2 <= 92) {
      spo2Score = 0;
      spo2Desc = `${spo2}% (Đạt đích tăng CO2: 88-92%)`;
    } else if (spo2 >= 93 && spo2 <= 94) {
      spo2Score = patient.onSupplementalOxygen ? 1 : 0;
      spo2Desc = `${spo2}% ${patient.onSupplementalOxygen ? '(Cao trên oxy)' : '(Bình thường)'}`;
    } else if (spo2 >= 95 && spo2 <= 96) {
      spo2Score = patient.onSupplementalOxygen ? 2 : 0;
      spo2Desc = `${spo2}% ${patient.onSupplementalOxygen ? '(Quá cao trên oxy)' : '(Bình thường)'}`;
    } else if (spo2 >= 97) {
      spo2Score = patient.onSupplementalOxygen ? 3 : 0;
      spo2Desc = `${spo2}% ${patient.onSupplementalOxygen ? '(Nguy cơ ức chế hô hấp trên oxy)' : '(Bình thường)'}`;
    }
  } else {
    // Thang đo 1 thông thường
    if (spo2 <= 91) {
      spo2Score = 3;
      spo2Desc = `${spo2}% (Rất thấp: ≤ 91%)`;
    } else if (spo2 >= 92 && spo2 <= 93) {
      spo2Score = 2;
      spo2Desc = `${spo2}% (Thấp: 92-93%)`;
    } else if (spo2 >= 94 && spo2 <= 95) {
      spo2Score = 1;
      spo2Desc = `${spo2}% (Hơi thấp: 94-95%)`;
    } else {
      spo2Score = 0;
      spo2Desc = `${spo2}% (Bình thường: ≥ 96%)`;
    }
  }
  score += spo2Score;
  if (spo2Score === 3) hasSingleParam3 = true;
  breakdown.push({ name: 'Độ bão hòa Oxy (SpO2)', score: spo2Score, description: spo2Desc, isRedFlag: spo2Score === 3 });

  // 3. Hỗ trợ Oxy (Air or Oxygen)
  const o2Score = patient.onSupplementalOxygen ? 2 : 0;
  score += o2Score;
  breakdown.push({
    name: 'Liệu pháp Oxy',
    score: o2Score,
    description: patient.onSupplementalOxygen ? `Đang thở oxy hỗ trợ (FiO2 ~${patient.fio2Percent}%)` : 'Thở khí phòng tự nhiên (Khí trời)',
    isRedFlag: false
  });

  // 4. Thân nhiệt (Temperature)
  const temp = patient.temperature;
  let tempScore = 0;
  let tempDesc = `${temp}°C (Bình thường: 36.1 - 38.0°C)`;
  if (temp <= 35.0) {
    tempScore = 3;
    tempDesc = `${temp}°C (Hạ thân nhiệt nặng: ≤ 35.0°C)`;
  } else if (temp >= 35.1 && temp <= 36.0) {
    tempScore = 1;
    tempDesc = `${temp}°C (Hạ thân nhiệt nhẹ: 35.1 - 36.0°C)`;
  } else if (temp >= 36.1 && temp <= 38.0) {
    tempScore = 0;
  } else if (temp >= 38.1 && temp <= 39.0) {
    tempScore = 1;
    tempDesc = `${temp}°C (Sốt nhẹ/vừa: 38.1 - 39.0°C)`;
  } else if (temp >= 39.1) {
    tempScore = 2;
    tempDesc = `${temp}°C (Sốt cao: ≥ 39.1°C)`;
  }
  score += tempScore;
  if (tempScore === 3) hasSingleParam3 = true;
  breakdown.push({ name: 'Thân nhiệt', score: tempScore, description: tempDesc, isRedFlag: tempScore === 3 });

  // 5. Huyết áp tâm thu (Systolic Blood Pressure)
  const sbp = patient.sbp;
  let sbpScore = 0;
  let sbpDesc = `${sbp} mmHg (Bình thường: 111 - 219)`;
  if (sbp <= 90) {
    sbpScore = 3;
    sbpDesc = `${sbp} mmHg (Tụt huyết áp nặng: ≤ 90)`;
  } else if (sbp >= 91 && sbp <= 100) {
    sbpScore = 2;
    sbpDesc = `${sbp} mmHg (Hạ huyết áp: 91 - 100)`;
  } else if (sbp >= 101 && sbp <= 110) {
    sbpScore = 1;
    sbpDesc = `${sbp} mmHg (Huyết áp ranh giới: 101 - 110)`;
  } else if (sbp >= 111 && sbp <= 219) {
    sbpScore = 0;
  } else if (sbp >= 220) {
    sbpScore = 3;
    sbpDesc = `${sbp} mmHg (Tăng huyết áp kịch phát: ≥ 220)`;
  }
  score += sbpScore;
  if (sbpScore === 3) hasSingleParam3 = true;
  breakdown.push({ name: 'Huyết áp tâm thu', score: sbpScore, description: sbpDesc, isRedFlag: sbpScore === 3 });

  // 6. Nhịp tim (Heart Rate)
  const hr = patient.heartRate;
  let hrScore = 0;
  let hrDesc = `${hr} bpm (Bình thường: 51 - 90)`;
  if (hr <= 40) {
    hrScore = 3;
    hrDesc = `${hr} bpm (Nhịp quá chậm: ≤ 40)`;
  } else if (hr >= 41 && hr <= 50) {
    hrScore = 1;
    hrDesc = `${hr} bpm (Nhịp hơi chậm: 41 - 50)`;
  } else if (hr >= 51 && hr <= 90) {
    hrScore = 0;
  } else if (hr >= 91 && hr <= 110) {
    hrScore = 1;
    hrDesc = `${hr} bpm (Nhịp nhanh nhẹ: 91 - 110)`;
  } else if (hr >= 111 && hr <= 130) {
    hrScore = 2;
    hrDesc = `${hr} bpm (Nhịp nhanh vừa: 111 - 130)`;
  } else if (hr >= 131) {
    hrScore = 3;
    hrDesc = `${hr} bpm (Nhịp rất nhanh: ≥ 131)`;
  }
  score += hrScore;
  if (hrScore === 3) hasSingleParam3 = true;
  breakdown.push({ name: 'Nhịp tim', score: hrScore, description: hrDesc, isRedFlag: hrScore === 3 });

  // 7. Mức độ tri giác (Consciousness - Alert, Voice, Pain, Unresponsive)
  let cScore = 0;
  let cDesc = 'Tỉnh táo hoàn toàn (Alert)';
  if (patient.avpu !== 'A' || patient.newAlteredMentalState || patient.gcs < 15) {
    cScore = 3;
    cDesc = `Rối loạn tri giác mới (AVPU: ${patient.avpu}, GCS: ${patient.gcs}/15)`;
  }
  score += cScore;
  if (cScore === 3) hasSingleParam3 = true;
  breakdown.push({ name: 'Ý thức / Tri giác', score: cScore, description: cDesc, isRedFlag: cScore === 3 });

  // Phân tầng nguy cơ theo chuẩn NEWS2 / NICE 2024
  let riskCategory: 'very_low' | 'low' | 'medium' | 'high' = 'very_low';
  if (score >= 7) {
    riskCategory = 'high';
  } else if (score >= 5 || hasSingleParam3) {
    riskCategory = 'medium';
  } else if (score >= 1) {
    riskCategory = 'low';
  } else {
    riskCategory = 'very_low';
  }

  return { score, breakdown, hasSingleParam3, riskCategory };
}

/**
 * Tính Thang điểm LP-NEWS (Lactate & Procalcitonin integrated into NEWS)
 * Nghiên cứu Das et al. 2024 (AUROC = 0.966 đối với dự đoán tử vong 14 ngày)
 */
export function calculateLPNEWS(newsScore: number, lactate?: number, pct?: number): {
  score: number;
  breakdown: ScoreItemBreakdown[];
  riskTier: 'low' | 'moderate' | 'high' | 'critical';
  predictedMortalityText: string;
} {
  const breakdown: ScoreItemBreakdown[] = [
    { name: 'Điểm NEWS2 cơ bản', score: newsScore, description: `Tổng điểm sinh hiệu: ${newsScore} điểm` }
  ];
  let totalScore = newsScore;

  // Điểm Lactate
  let lacScore = 0;
  let lacDesc = 'Chưa có xét nghiệm Lactate (tính 0đ)';
  if (lactate !== undefined && lactate !== null) {
    if (lactate < 2.0) {
      lacScore = 0;
      lacDesc = `${lactate} mmol/L (< 2.0 mmol/L: 0 điểm)`;
    } else if (lactate >= 2.0 && lactate <= 4.0) {
      lacScore = 1;
      lacDesc = `${lactate} mmol/L (2.0 - 4.0 mmol/L: +1 điểm)`;
    } else {
      lacScore = 2;
      lacDesc = `${lactate} mmol/L (> 4.0 mmol/L: +2 điểm - Tăng cao nghiêm trọng)`;
    }
  }
  totalScore += lacScore;
  breakdown.push({ name: 'Lactate máu động mạch/tĩnh mạch', score: lacScore, description: lacDesc, isRedFlag: lacScore >= 2 });

  // Điểm Procalcitonin (PCT)
  let pctScore = 0;
  let pctDesc = 'Chưa có xét nghiệm PCT (tính 0đ)';
  if (pct !== undefined && pct !== null) {
    if (pct < 2.0) {
      pctScore = 0;
      pctDesc = `${pct} ng/mL (< 2.0 ng/mL: 0 điểm)`;
    } else if (pct >= 2.0 && pct <= 7.0) {
      pctScore = 1;
      pctDesc = `${pct} ng/mL (2.0 - 7.0 ng/mL: +1 điểm)`;
    } else if (pct > 7.0 && pct <= 15.0) {
      pctScore = 2;
      pctDesc = `${pct} ng/mL (7.0 - 15.0 ng/mL: +2 điểm)`;
    } else {
      pctScore = 3;
      pctDesc = `${pct} ng/mL (> 15.0 ng/mL: +3 điểm - Bão hòa phản ứng vi khuẩn)`;
    }
  }
  totalScore += pctScore;
  breakdown.push({ name: 'Serum Procalcitonin (PCT)', score: pctScore, description: pctDesc, isRedFlag: pctScore >= 2 });

  let riskTier: 'low' | 'moderate' | 'high' | 'critical' = 'low';
  let predictedMortalityText = '';

  if (totalScore > 16) {
    riskTier = 'critical';
    predictedMortalityText = 'Điểm LP-NEWS > 16: Nguy cơ tử vong 14 ngày cực kỳ cao (~100% trong nhóm nghiên cứu Das 2024). Cần hồi sức cấp cứu tối khẩn cấp!';
  } else if (totalScore >= 11) {
    riskTier = 'high';
    predictedMortalityText = 'Điểm LP-NEWS ≥ 11 (Ngưỡng cắt tối ưu nghiên cứu, Độ nhạy 96.9%, Độ đặc hiệu 88.5%, AUROC 0.966): Tiên lượng tử vong 14 ngày tăng đột biến.';
  } else if (totalScore >= 7) {
    riskTier = 'moderate';
    predictedMortalityText = 'Điểm LP-NEWS 7-10: Nguy cơ tiến triển xấu trung bình. Cần theo dõi sát và tối ưu hóa điều trị.';
  } else {
    riskTier = 'low';
    predictedMortalityText = 'Điểm LP-NEWS < 7: Nguy cơ tử vong sớm thấp, theo dõi đáp ứng điều trị tiêu chuẩn.';
  }

  return { score: totalScore, breakdown, riskTier, predictedMortalityText };
}

/**
 * Tính Thang điểm qSOFA (Quick SOFA) - Sepsis-3 (Seymour et al. 2016)
 * Thang điểm tham khảo lịch sử. SSC 2021 & NICE NG253 khuyến cáo KHÔNG dùng đơn độc để sàng lọc vì độ nhạy thấp (24-50%).
 */
export function calculateQSOFA(patient: PatientData): {
  score: number;
  breakdown: ScoreItemBreakdown[];
  criteriaMet: string[];
  isHighRisk: boolean;
} {
  const breakdown: ScoreItemBreakdown[] = [];
  const criteriaMet: string[] = [];
  let score = 0;

  // 1. Tần số thở ≥ 22
  const rrMet = patient.respiratoryRate >= 22;
  if (rrMet) {
    score += 1;
    criteriaMet.push(`Thở ${patient.respiratoryRate} l/p (≥ 22)`);
  }
  breakdown.push({
    name: 'Tần số thở ≥ 22 lần/phút',
    score: rrMet ? 1 : 0,
    description: `${patient.respiratoryRate} lần/phút (${rrMet ? 'Đạt tiêu chuẩn' : 'Bình thường'})`
  });

  // 2. Rối loạn tri giác (GCS < 15 hoặc không Alert)
  const gcsMet = patient.gcs < 15 || patient.newAlteredMentalState || patient.avpu !== 'A';
  if (gcsMet) {
    score += 1;
    criteriaMet.push(`Tri giác biến đổi (GCS ${patient.gcs}/15)`);
  }
  breakdown.push({
    name: 'Biến đổi tri giác (GCS < 15 / AVPU)',
    score: gcsMet ? 1 : 0,
    description: `GCS ${patient.gcs}/15 (${gcsMet ? 'Đạt tiêu chuẩn' : 'Bình thường'})`
  });

  // 3. Huyết áp tâm thu ≤ 100 mmHg
  const sbpMet = patient.sbp <= 100;
  if (sbpMet) {
    score += 1;
    criteriaMet.push(`HATT ${patient.sbp} mmHg (≤ 100)`);
  }
  breakdown.push({
    name: 'Huyết áp tâm thu ≤ 100 mmHg',
    score: sbpMet ? 1 : 0,
    description: `${patient.sbp} mmHg (${sbpMet ? 'Đạt tiêu chuẩn' : 'Bình thường'})`
  });

  return {
    score,
    breakdown,
    criteriaMet,
    isHighRisk: score >= 2
  };
}

/**
 * Tính Thang điểm SIRS (Systemic Inflammatory Response Syndrome - Bone et al. 1992)
 * Thang điểm cũ mang tính chất tham khảo lịch sử, SSC 2021 & NICE khuyến cáo KHÔNG dùng đơn độc.
 */
export function calculateSIRS(patient: PatientData): {
  score: number;
  criteriaMet: string[];
  isPositive: boolean;
  breakdown: ScoreItemBreakdown[];
} {
  const breakdown: ScoreItemBreakdown[] = [];
  const criteriaMet: string[] = [];
  let score = 0;

  // 1. Thân nhiệt > 38°C hoặc < 36°C
  const tempMet = patient.temperature > 38.0 || patient.temperature < 36.0;
  if (tempMet) {
    score += 1;
    criteriaMet.push(`T° ${patient.temperature}°C (>38°C hoặc <36°C)`);
  }
  breakdown.push({
    name: 'Thân nhiệt (T° > 38°C hoặc < 36°C)',
    score: tempMet ? 1 : 0,
    description: `${patient.temperature}°C (${tempMet ? 'Dương tính' : 'Bình thường'})`
  });

  // 2. Nhịp tim > 90 bpm
  const hrMet = patient.heartRate > 90;
  if (hrMet) {
    score += 1;
    criteriaMet.push(`Mạch ${patient.heartRate} bpm (>90 bpm)`);
  }
  breakdown.push({
    name: 'Nhịp tim (> 90 lần/phút)',
    score: hrMet ? 1 : 0,
    description: `${patient.heartRate} lần/phút (${hrMet ? 'Dương tính' : 'Bình thường'})`
  });

  // 3. Tần số thở > 20 l/p (hoặc PaCO2 < 32 mmHg)
  const rrMet = patient.respiratoryRate > 20;
  if (rrMet) {
    score += 1;
    criteriaMet.push(`Thở ${patient.respiratoryRate} l/p (>20 l/p)`);
  }
  breakdown.push({
    name: 'Tần số thở (> 20 lần/phút)',
    score: rrMet ? 1 : 0,
    description: `${patient.respiratoryRate} lần/phút (${rrMet ? 'Dương tính' : 'Bình thường'})`
  });

  // 4. Bạch cầu (WBC) > 12 G/L hoặc < 4 G/L
  const wbc = patient.wbc;
  const wbcMet = wbc !== undefined && (wbc > 12.0 || wbc < 4.0);
  if (wbcMet) {
    score += 1;
    criteriaMet.push(`Bạch cầu WBC ${wbc} G/L (>12 hoặc <4 G/L)`);
  }
  breakdown.push({
    name: 'Bạch cầu WBC (> 12 G/L hoặc < 4 G/L)',
    score: wbcMet ? 1 : 0,
    description: wbc !== undefined ? `WBC ${wbc} G/L (${wbcMet ? 'Dương tính' : 'Bình thường'})` : 'Chưa có xét nghiệm WBC (0đ)'
  });

  return {
    score,
    criteriaMet,
    isPositive: score >= 2,
    breakdown
  };
}

/**
 * Tính Thang điểm SOFA (Sequential Organ Failure Assessment) đầy đủ - Sepsis-3
 */
export function calculateSOFA(patient: PatientData): {
  score: number;
  breakdown: ScoreItemBreakdown[];
} {
  const breakdown: ScoreItemBreakdown[] = [];
  let score = 0;

  // 1. Hô hấp (Respiration: PaO2/FiO2 hoặc SpO2/FiO2)
  let respScore = 0;
  let respDesc = '';
  const fio2Dec = (patient.fio2Percent || 21) / 100;
  const pao2 = patient.pao2;
  const pafi = pao2 ? pao2 / fio2Dec : null;
  const spofi = (patient.spo2 / fio2Dec);

  if (pafi !== null) {
    if (pafi >= 400) respScore = 0;
    else if (pafi >= 300) respScore = 1;
    else if (pafi >= 200) respScore = 2;
    else if (pafi >= 100 && (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation)) respScore = 3;
    else if (pafi < 100 && (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation)) respScore = 4;
    else respScore = 2;
    respDesc = `PaO2/FiO2 = ${Math.round(pafi)} mmHg`;
  } else {
    // Proxy bằng SpO2/FiO2 khi không có khí máu động mạch
    if (spofi >= 302) respScore = 0;
    else if (spofi >= 221) respScore = 1;
    else if (spofi >= 142) respScore = 2;
    else if (spofi >= 67 && (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation)) respScore = 3;
    else if (patient.invasiveMechanicalVentilation || patient.nonInvasiveVentilation) respScore = 4;
    else respScore = 2;
    respDesc = `SpO2/FiO2 tương đương ~${Math.round(spofi)}`;
  }
  score += respScore;
  breakdown.push({ name: 'Hô hấp (PaO2/FiO2)', score: respScore, description: respDesc });

  // 2. Đông máu (Coagulation: Tiểu cầu x10^3/µL)
  let coagScore = 0;
  let coagDesc = 'Tiểu cầu bình thường';
  if (patient.platelets !== undefined && patient.platelets !== null) {
    const plts = patient.platelets;
    if (plts >= 150) coagScore = 0;
    else if (plts >= 100) coagScore = 1;
    else if (plts >= 50) coagScore = 2;
    else if (plts >= 20) coagScore = 3;
    else coagScore = 4;
    coagDesc = `Tiểu cầu: ${plts} x10³/µL`;
  }
  score += coagScore;
  breakdown.push({ name: 'Đông máu (Tiểu cầu)', score: coagScore, description: coagDesc });

  // 3. Gan (Liver: Bilirubin µmol/L)
  let liverScore = 0;
  let liverDesc = 'Bilirubin bình thường';
  if (patient.bilirubinUmolL !== undefined && patient.bilirubinUmolL !== null) {
    const bili = patient.bilirubinUmolL;
    if (bili < 20) liverScore = 0;
    else if (bili <= 32) liverScore = 1;
    else if (bili <= 101) liverScore = 2;
    else if (bili <= 204) liverScore = 3;
    else liverScore = 4;
    liverDesc = `Bilirubin: ${bili} µmol/L (~${(bili / 17.1).toFixed(1)} mg/dL)`;
  }
  score += liverScore;
  breakdown.push({ name: 'Gan (Bilirubin)', score: liverScore, description: liverDesc });

  // 4. Tim mạch (Cardiovascular: MAP & Vận mạch)
  let cvScore = 0;
  let cvDesc = '';
  const map = calculateMAP(patient.sbp, patient.dbp);
  const vaso = patient.vasoactiveUsed;
  const hasHighVaso = vaso.norepinephrine || vaso.epinephrine || (vaso.dopamine && patient.vasoactiveMedCount >= 2);

  if (hasHighVaso) {
    cvScore = 4; // Liều vận mạch cao/kết hợp
    cvDesc = 'Đang dùng Norepinephrine/Epinephrine liều duy trì hoặc đa vận mạch';
  } else if (vaso.dopamine || vaso.dobutamine || patient.vasoactiveMedCount === 1) {
    cvScore = 2;
    cvDesc = 'Đang dùng Dopamine hoặc Dobutamine liều hỗ trợ';
  } else if (map < 70) {
    cvScore = 1;
    cvDesc = `Huyết áp trung bình MAP ${map} mmHg (< 70 mmHg)`;
  } else {
    cvScore = 0;
    cvDesc = `Huyết áp trung bình MAP ${map} mmHg (≥ 70 mmHg)`;
  }
  score += cvScore;
  breakdown.push({ name: 'Tim mạch & Huyết động', score: cvScore, description: cvDesc });

  // 5. Thần kinh (Central Nervous System: GCS)
  let cnsScore = 0;
  const gcs = patient.gcs || 15;
  if (gcs >= 15) cnsScore = 0;
  else if (gcs >= 13) cnsScore = 1;
  else if (gcs >= 10) cnsScore = 2;
  else if (gcs >= 6) cnsScore = 3;
  else cnsScore = 4;
  score += cnsScore;
  breakdown.push({ name: 'Thần kinh (Glasgow)', score: cnsScore, description: `Thang điểm GCS: ${gcs}/15` });

  // 6. Thận (Renal: Creatinine & Lượng nước tiểu)
  let renalScore = 0;
  let renalDesc = 'Creatinine bình thường';
  const creat = patient.creatinineUmolL;
  if (creat !== undefined && creat !== null) {
    if (creat < 110) renalScore = 0;
    else if (creat <= 170) renalScore = 1;
    else if (creat <= 299) renalScore = 2;
    else if (creat <= 440) renalScore = 3;
    else renalScore = 4;
    renalDesc = `Creatinine: ${creat} µmol/L (~${(creat / 88.4).toFixed(1)} mg/dL)`;
  } else if (patient.urineOutputStatus === 'not_over_18h') {
    renalScore = 3;
    renalDesc = 'Vô niệu kéo dài > 18 giờ';
  }
  score += renalScore;
  breakdown.push({ name: 'Thận (Creatinine / Nước tiểu)', score: renalScore, description: renalDesc });

  return { score, breakdown };
}

/**
 * Tiêu chuẩn Phoenix Pediatric Sepsis 2024 (JAMA 2024)
 * Áp dụng cho trẻ em < 18 tuổi (loại trừ sơ sinh non tháng <37 tuần)
 */
export function calculatePhoenixPediatric(patient: PatientData): {
  score: number;
  cvScore: number;
  breakdown: ScoreItemBreakdown[];
  isSepsis: boolean;
  isSepticShock: boolean;
} {
  const breakdown: ScoreItemBreakdown[] = [];
  let totalScore = 0;

  // 1. Respiratory (0 - 3 điểm)
  let respScore = 0;
  let respDesc = 'Hô hấp bình thường';
  const fio2Dec = (patient.fio2Percent || 21) / 100;
  const pafi = patient.pao2 ? patient.pao2 / fio2Dec : null;
  const spofi = (patient.spo2 / fio2Dec);

  if (patient.invasiveMechanicalVentilation) {
    if ((pafi !== null && pafi < 100) || spofi < 148) {
      respScore = 3;
      respDesc = 'Thở máy xâm lấn (IMV) với PaO2:FiO2 < 100 hoặc SpO2:FiO2 < 148';
    } else if ((pafi !== null && pafi <= 200) || spofi <= 220) {
      respScore = 2;
      respDesc = 'Thở máy xâm lấn (IMV) với PaO2:FiO2 100-200 hoặc SpO2:FiO2 148-220';
    } else {
      respScore = 1;
      respDesc = 'Thở máy xâm lấn (IMV) duy trì trao đổi khí';
    }
  } else if (patient.onSupplementalOxygen || patient.nonInvasiveVentilation) {
    if ((pafi !== null && pafi < 400) || spofi < 292) {
      respScore = 1;
      respDesc = 'Hỗ trợ oxy/NIV/HFNC với PaO2:FiO2 < 400 hoặc SpO2:FiO2 < 292';
    }
  }
  totalScore += respScore;
  breakdown.push({ name: 'Phoenix Hô hấp (0-3đ)', score: respScore, description: respDesc });

  // 2. Cardiovascular (0 - 6 điểm: Vận mạch + Lactate + Huyết áp MAP theo lứa tuổi)
  let cvScore = 0;
  const cvDetails: string[] = [];

  // Vận mạch: 1 thuốc = 1đ, >=2 thuốc = 2đ (tối đa 2đ phần này)
  if (patient.vasoactiveMedCount >= 2) {
    cvScore += 2;
    cvDetails.push('≥ 2 loại thuốc vận mạch (+2đ)');
  } else if (patient.vasoactiveMedCount === 1) {
    cvScore += 1;
    cvDetails.push('1 loại thuốc vận mạch (+1đ)');
  }

  // Lactate: 5 - 10.9 mmol/L = 1đ, >= 11 mmol/L = 2đ
  const lac = patient.lactateInitial;
  if (lac !== undefined && lac !== null) {
    if (lac >= 11.0) {
      cvScore += 2;
      cvDetails.push(`Lactate ≥ 11 mmol/L (${lac} mmol/L: +2đ)`);
    } else if (lac >= 5.0) {
      cvScore += 1;
      cvDetails.push(`Lactate 5.0 - 10.9 mmol/L (${lac} mmol/L: +1đ)`);
    }
  }

  // Huyết áp MAP theo tuổi (Bảng Phoenix JAMA 2024)
  const map = calculateMAP(patient.sbp, patient.dbp);
  const ageY = patient.ageYears;
  const ageM = patient.ageMonths !== undefined ? patient.ageMonths : ageY * 12;
  let bpScore = 0;

  if (ageM < 1) {
    if (map < 17) bpScore = 2;
    else if (map <= 30) bpScore = 1;
  } else if (ageM >= 1 && ageM < 12) {
    if (map < 25) bpScore = 2;
    else if (map <= 38) bpScore = 1;
  } else if (ageY >= 1 && ageY < 2) {
    if (map < 31) bpScore = 2;
    else if (map <= 43) bpScore = 1;
  } else if (ageY >= 2 && ageY < 5) {
    if (map < 32) bpScore = 2;
    else if (map <= 44) bpScore = 1;
  } else if (ageY >= 5 && ageY < 12) {
    if (map < 36) bpScore = 2;
    else if (map <= 48) bpScore = 1;
  } else {
    // 12 đến 17 tuổi
    if (map < 38) bpScore = 2;
    else if (map <= 51) bpScore = 1;
  }

  if (bpScore > 0) {
    cvScore += bpScore;
    cvDetails.push(`MAP ${map} mmHg tụt theo tuổi (+${bpScore}đ)`);
  }

  if (cvScore > 6) cvScore = 6;
  totalScore += cvScore;
  breakdown.push({
    name: 'Phoenix Tim mạch (0-6đ)',
    score: cvScore,
    description: cvDetails.length > 0 ? cvDetails.join('; ') : `MAP ${map} mmHg bình thường, không vận mạch/lactate cao`,
    isRedFlag: cvScore >= 1
  });

  // 3. Coagulation (0 - 2 điểm: 1đ mỗi tiêu chí, max 2)
  let coagScore = 0;
  const coagDetails: string[] = [];
  if (patient.platelets && patient.platelets < 100) {
    coagScore++;
    coagDetails.push(`Tiểu cầu < 100k (${patient.platelets}k)`);
  }
  if (patient.inr && patient.inr > 1.3) {
    coagScore++;
    coagDetails.push(`INR > 1.3 (${patient.inr})`);
  }
  if (patient.dDimerMgL && patient.dDimerMgL > 2.0) {
    coagScore++;
    coagDetails.push(`D-dimer > 2.0 mg/L (${patient.dDimerMgL})`);
  }
  if (patient.fibrinogenMgDl && patient.fibrinogenMgDl < 100) {
    coagScore++;
    coagDetails.push(`Fibrinogen < 100 mg/dL (${patient.fibrinogenMgDl})`);
  }
  if (coagScore > 2) coagScore = 2;
  totalScore += coagScore;
  breakdown.push({
    name: 'Phoenix Đông máu (0-2đ)',
    score: coagScore,
    description: coagDetails.length > 0 ? coagDetails.join(', ') : 'Đông máu trong giới hạn bình thường'
  });

  // 4. Neurological (0 - 2 điểm)
  let neuroScore = 0;
  let neuroDesc = 'Thần kinh bình thường';
  if (patient.bilateralFixedPupils) {
    neuroScore = 2;
    neuroDesc = 'Đồng tử giãn cố định cả hai bên (2đ)';
  } else if (patient.gcs <= 10) {
    neuroScore = 1;
    neuroDesc = `Thang điểm GCS ≤ 10 (${patient.gcs}/15: 1đ)`;
  }
  totalScore += neuroScore;
  breakdown.push({ name: 'Phoenix Thần kinh (0-2đ)', score: neuroScore, description: neuroDesc, isRedFlag: neuroScore >= 1 });

  const isSepsis = patient.suspectedInfection && totalScore >= 2;
  const isSepticShock = isSepsis && cvScore >= 1;

  return {
    score: totalScore,
    cvScore,
    breakdown,
    isSepsis,
    isSepticShock
  };
}

/**
 * Tiêu chuẩn Sepsis Sản Khoa (Maternal / Obstetric Sepsis - Fetal I+D Barcelona)
 * Hiệu chỉnh sinh lý thai kỳ và hậu sản
 */
export function calculateObstetricScores(patient: PatientData): {
  qsofaScore: number;
  qsofaBreakdown: ScoreItemBreakdown[];
  isHighSuspicion: boolean;
  sofaScore: number;
  sofaBreakdown: ScoreItemBreakdown[];
  isSepsis: boolean;
  isSepticShock: boolean;
} {
  // 1. Obstetric q-SOFA (HATT < 90, Thở ≥ 25, Tri giác không tỉnh)
  const qsofaBreakdown: ScoreItemBreakdown[] = [];
  let qScore = 0;

  const sbpMet = patient.sbp < 90;
  if (sbpMet) qScore++;
  qsofaBreakdown.push({ name: 'HATT < 90 mmHg', score: sbpMet ? 1 : 0, description: `${patient.sbp} mmHg` });

  const rrMet = patient.respiratoryRate >= 25;
  if (rrMet) qScore++;
  qsofaBreakdown.push({ name: 'Tần số thở ≥ 25 lần/phút', score: rrMet ? 1 : 0, description: `${patient.respiratoryRate} lần/phút` });

  const mentalMet = patient.newAlteredMentalState || patient.avpu !== 'A' || patient.gcs < 15;
  if (mentalMet) qScore++;
  qsofaBreakdown.push({ name: 'Tri giác biến đổi (Not Alert)', score: mentalMet ? 1 : 0, description: mentalMet ? 'Ý thức thay đổi' : 'Tỉnh táo' });

  const isHighSuspicion = qScore >= 2;

  // 2. Obstetric SOFA Score (0 - 2 điểm mỗi cơ quan, ngưỡng cắt Sepsis ≥ 2)
  const sofaBreakdown: ScoreItemBreakdown[] = [];
  let sScore = 0;

  // Hô hấp PaO2/FiO2
  const fio2Dec = (patient.fio2Percent || 21) / 100;
  const pafi = patient.pao2 ? patient.pao2 / fio2Dec : (patient.spo2 / fio2Dec);
  let respPts = 0;
  if (pafi < 300) respPts = 2;
  else if (pafi < 400) respPts = 1;
  sScore += respPts;
  sofaBreakdown.push({ name: 'Hô hấp (PaO2/FiO2)', score: respPts, description: `Tỷ số ~${Math.round(pafi)}` });

  // Tiểu cầu
  let pltsPts = 0;
  if (patient.platelets) {
    if (patient.platelets < 100) pltsPts = 2;
    else if (patient.platelets < 150) pltsPts = 1;
  }
  sScore += pltsPts;
  sofaBreakdown.push({ name: 'Đông máu (Tiểu cầu)', score: pltsPts, description: `${patient.platelets || 'Chưa XN'} x10³/µL` });

  // Bilirubin
  let biliPts = 0;
  if (patient.bilirubinUmolL) {
    if (patient.bilirubinUmolL > 32) biliPts = 2;
    else if (patient.bilirubinUmolL >= 20) biliPts = 1;
  }
  sScore += biliPts;
  sofaBreakdown.push({ name: 'Gan (Bilirubin)', score: biliPts, description: `${patient.bilirubinUmolL || 'Chưa XN'} µmol/L` });

  // Tim mạch MAP
  const map = calculateMAP(patient.sbp, patient.dbp);
  let cvPts = 0;
  if (patient.vasoactiveMedCount > 0) cvPts = 2;
  else if (map < 70) cvPts = 1;
  sScore += cvPts;
  sofaBreakdown.push({ name: 'Tim mạch (MAP & Vận mạch)', score: cvPts, description: `MAP ${map} mmHg, Vận mạch: ${patient.vasoactiveMedCount > 0 ? 'Có' : 'Không'}` });

  // Thần kinh
  let neuroPts = 0;
  if (patient.avpu === 'P' || patient.avpu === 'U' || patient.gcs < 10) neuroPts = 2;
  else if (patient.avpu === 'V' || patient.gcs < 15) neuroPts = 1;
  sScore += neuroPts;
  sofaBreakdown.push({ name: 'Thần kinh (Ý thức)', score: neuroPts, description: `AVPU ${patient.avpu}, GCS ${patient.gcs}/15` });

  // Thận Creatinine
  let renalPts = 0;
  if (patient.creatinineUmolL) {
    if (patient.creatinineUmolL > 120) renalPts = 2;
    else if (patient.creatinineUmolL >= 90) renalPts = 1;
  }
  sScore += renalPts;
  sofaBreakdown.push({ name: 'Thận (Creatinine thai kỳ)', score: renalPts, description: `${patient.creatinineUmolL || 'Chưa XN'} µmol/L (ngưỡng thai kỳ > 90 µmol/L)` });

  const isSepsis = patient.suspectedInfection && sScore >= 2;
  const isSepticShock = isSepsis && patient.vasoactiveMedCount > 0 && (patient.lactateInitial ? patient.lactateInitial >= 2.0 : false);

  return {
    qsofaScore: qScore,
    qsofaBreakdown,
    isHighSuspicion,
    sofaScore: sScore,
    sofaBreakdown,
    isSepsis,
    isSepticShock
  };
}

/**
 * Đánh giá Phân tầng nguy cơ theo Hướng dẫn NICE NG253 (2024 / 2026)
 * Áp dụng cho cả môi trường Cấp cứu / Bệnh viện và Cơ sở Y tế / Cộng đồng
 */
export function evaluateNICERisk(patient: PatientData, newsResult: { score: number; hasSingleParam3: boolean }): {
  riskCategory: 'low' | 'medium' | 'high';
  highRiskCriteria: string[];
  mediumRiskCriteria: string[];
  maxAntibioticDelayHours: number;
} {
  const highRiskCriteria: string[] = [];
  const mediumRiskCriteria: string[] = [];

  // Tiêu chí Bệnh viện cấp cứu (Dựa trên NEWS2 và Dấu hiệu cảnh báo đỏ lâm sàng)
  if (patient.setting === 'acute_hospital' || patient.setting === 'emergency_ambulance' || patient.setting === 'icu') {
    if (newsResult.score >= 7) {
      highRiskCriteria.push(`Điểm NEWS2 ≥ 7 (${newsResult.score} điểm)`);
    } else if (newsResult.score >= 5) {
      mediumRiskCriteria.push(`Điểm NEWS2 từ 5 - 6 (${newsResult.score} điểm)`);
    }

    if (newsResult.hasSingleParam3) {
      mediumRiskCriteria.push('Có 1 thông số sinh hiệu đạt mức báo động 3 điểm (Cần Bác sĩ FY2+ đánh giá khẩn)');
    }

    // Các dấu hiệu lâm sàng đỏ (NICE 1.6.3 & 1.6.4)
    if (patient.mottledOrAshen) highRiskCriteria.push('Da vân đá hoặc tái xám (Mottled / Ashen skin)');
    if (patient.cyanosis) highRiskCriteria.push('Tím tái môi, da hoặc lưỡi (Cyanosis)');
    if (patient.nonBlanchingRash) highRiskCriteria.push('Ban xuất huyết không biến mất khi đè ép (Petechial / Purpuric rash)');
    if (patient.lactateInitial && patient.lactateInitial > 2.0) highRiskCriteria.push(`Bằng chứng giảm tưới máu mô: Lactate > 2.0 mmol/L (${patient.lactateInitial} mmol/L)`);
    if (patient.urineOutputStatus === 'not_over_18h') highRiskCriteria.push('Vô niệu kéo dài > 18 giờ');
  } else {
    // Tiêu chí Y tế cơ sở / Cộng đồng (Table 1 NICE NG253)
    // High-risk
    if (patient.newAlteredMentalState) highRiskCriteria.push('Bằng chứng khách quan về rối loạn tâm thần / lú lẫn mới');
    if (patient.respiratoryRate >= 25) highRiskCriteria.push(`Tần số thở ≥ 25 lần/phút (${patient.respiratoryRate})`);
    if (patient.onSupplementalOxygen && patient.fio2Percent >= 40) highRiskCriteria.push('Nhu cầu oxy mới ≥ 40% FiO2 để duy trì Sat > 92%');
    if (patient.sbp <= 90) highRiskCriteria.push(`Huyết áp tâm thu ≤ 90 mmHg (${patient.sbp} mmHg)`);
    if (patient.heartRate > 130) highRiskCriteria.push(`Nhịp tim > 130 lần/phút (${patient.heartRate} bpm)`);
    if (patient.urineOutputStatus === 'not_over_18h') highRiskCriteria.push('Không tiểu trong 18 giờ qua');
    if (patient.mottledOrAshen) highRiskCriteria.push('Da vân đá hoặc tái xám');
    if (patient.cyanosis) highRiskCriteria.push('Tím tái môi, da, lưỡi');
    if (patient.nonBlanchingRash) highRiskCriteria.push('Ban xuất huyết không mất khi căng da');

    // Medium-risk
    if (patient.communicationDifficulty) mediumRiskCriteria.push('Khó khăn giao tiếp / Sa sút trí tuệ / Thiểu năng');
    if (patient.hasImmunosuppression) mediumRiskCriteria.push('Hệ miễn dịch suy giảm (Hóa trị, thuốc ức chế MD, corticoid)');
    if (patient.hasRecentSurgery) mediumRiskCriteria.push('Chấn thương, phẫu thuật hoặc can thiệp xâm lấn trong 6 tuần');
    if (patient.respiratoryRate >= 21 && patient.respiratoryRate <= 24) mediumRiskCriteria.push(`Tần số thở 21-24 lần/phút (${patient.respiratoryRate})`);
    if (patient.sbp >= 91 && patient.sbp <= 100) mediumRiskCriteria.push(`Huyết áp tâm thu 91-100 mmHg (${patient.sbp} mmHg)`);
    if (patient.heartRate >= 91 && patient.heartRate <= 130) mediumRiskCriteria.push(`Nhịp tim 91-130 lần/phút (${patient.heartRate} bpm)`);
    if (patient.urineOutputStatus === 'not_12_18h') mediumRiskCriteria.push('Không tiểu trong 12 - 18 giờ qua');
    if (patient.temperature < 36.0) mediumRiskCriteria.push(`Thân nhiệt hạ < 36.0°C (${patient.temperature}°C)`);
  }

  let riskCategory: 'low' | 'medium' | 'high' = 'low';
  let maxAntibioticDelayHours = 6;

  if (highRiskCriteria.length > 0) {
    riskCategory = 'high';
    maxAntibioticDelayHours = 1; // Kháng sinh trong vòng 1 giờ (Golden Hour)
  } else if (mediumRiskCriteria.length > 0) {
    riskCategory = 'medium';
    maxAntibioticDelayHours = 3; // Tối đa 3 giờ để làm rõ chẩn đoán vi sinh và nguồn nhiễm
  } else {
    riskCategory = 'low';
    maxAntibioticDelayHours = 6;
  }

  return {
    riskCategory,
    highRiskCriteria,
    mediumRiskCriteria,
    maxAntibioticDelayHours
  };
}

/**
 * Động học Lactate: Tính % thanh thải Lactate sau 6 giờ
 * Meta-analysis Gautam et al. 2026:
 * Thanh thải ≥ 10% trong 6h giảm tử vong đáng kể (OR = 0.52); ≥ 20% giảm mạnh hơn (OR = 0.47)
 */
export function calculateLactateClearance(initial?: number, repeat6h?: number): {
  clearancePercent?: number;
  evaluation: 'adequate' | 'suboptimal' | 'poor' | 'na';
  details: string;
} {
  if (initial === undefined || repeat6h === undefined || initial === 0) {
    return {
      evaluation: 'na',
      details: 'Cần ít nhất 2 thời điểm đo Lactate (Ban đầu và sau 2-6 giờ) để đánh giá động học thanh thải dịch.'
    };
  }

  const clearance = Math.round(((initial - repeat6h) / initial) * 100 * 10) / 10;

  if (clearance >= 20) {
    return {
      clearancePercent: clearance,
      evaluation: 'adequate',
      details: `Thanh thải Lactate đạt ${clearance}% (≥ 20%): Đáp ứng hồi sức dịch và tưới máu mô rất tốt (OR tử vong = 0.47).`
    };
  } else if (clearance >= 10) {
    return {
      clearancePercent: clearance,
      evaluation: 'adequate',
      details: `Thanh thải Lactate đạt ${clearance}% (≥ 10%): Đạt mục tiêu hồi sức ban đầu (OR tử vong = 0.52).`
    };
  } else if (clearance > 0) {
    return {
      clearancePercent: clearance,
      evaluation: 'suboptimal',
      details: `Thanh thải Lactate chỉ đạt ${clearance}% (< 10%): Chưa đạt mục tiêu đào thải. Cần đánh giá lại tình trạng tưới máu, đáp ứng bù dịch và cân nhắc thuốc vận mạch.`
    };
  } else {
    return {
      clearancePercent: clearance,
      evaluation: 'poor',
      details: `Lactate tăng thêm (+${Math.abs(clearance)}%) từ ${initial} lên ${repeat6h} mmol/L: Thiếu oxy mô và rối loạn chuyển hóa kỵ khí đang tăng nặng! Báo động đỏ hồi sức.`
    };
  }
}

/**
 * Tính Tỷ số Neutrophil / Lymphocyte (NLR)
 * Nghiên cứu Demni et al. 2026:
 * Ngưỡng cắt NLR ≥ 6 có độ nhạy 92%, độ đặc hiệu 68%, NPV 97% dự báo tử vong 72h và sốc nhiễm khuẩn.
 */
export function calculateNLR(neutrophils?: number, lymphocytes?: number): {
  nlr?: number;
  riskLevel: 'normal' | 'elevated' | 'high';
  details: string;
} {
  if (neutrophils === undefined || lymphocytes === undefined || lymphocytes === 0) {
    return {
      riskLevel: 'normal',
      details: 'Chưa đủ số liệu Neutrophil và Lymphocyte trong công thức máu.'
    };
  }

  const nlr = Math.round((neutrophils / lymphocytes) * 10) / 10;

  if (nlr >= 6.0) {
    return {
      nlr,
      riskLevel: 'high',
      details: `NLR = ${nlr} (≥ 6.0): Giá trị tiên lượng độc lập nguy cơ tử vong sớm trong 72 giờ (Độ nhạy 92%, NPV 97%) và nguy cơ cao tiến triển Sốc nhiễm khuẩn.`
    };
  } else if (nlr >= 3.0) {
    return {
      nlr,
      riskLevel: 'elevated',
      details: `NLR = ${nlr} (3.0 - 5.9): Tăng phản ứng viêm hệ thống, theo dõi sát diễn tiến công thức máu.`
    };
  } else {
    return {
      nlr,
      riskLevel: 'normal',
      details: `NLR = ${nlr} (< 3.0): Tỷ số trong giới hạn an toàn.`
    };
  }
}

/**
 * Bộ xử lý Trung tâm CDSS (Clinical Decision Support Engine)
 * Tích hợp toàn bộ các hướng dẫn lâm sàng & bằng chứng từ các tài liệu được cung cấp
 */
export function evaluatePatientCDSS(patient: PatientData): CDSSAssessmentResult {
  const map = calculateMAP(patient.sbp, patient.dbp);
  const news2 = calculateNEWS2(patient);
  const lpNews = calculateLPNEWS(news2.score, patient.lactateInitial, patient.procalcitonin);
  const qsofa = calculateQSOFA(patient);
  const sirs = calculateSIRS(patient);
  const sofa = calculateSOFA(patient);
  const nice = evaluateNICERisk(patient, news2);
  const lactateKinetics = calculateLactateClearance(patient.lactateInitial, patient.lactateRepeat6h);
  const nlrCalc = calculateNLR(patient.neutrophilCount, patient.lymphocyteCount);

  // Đánh giá riêng cho Nhi khoa nếu bệnh nhân < 18 tuổi
  let phoenixRes: ReturnType<typeof calculatePhoenixPediatric> | undefined = undefined;
  if (patient.patientType === 'pediatric' || patient.ageYears < 18) {
    phoenixRes = calculatePhoenixPediatric(patient);
  }

  // Đánh giá riêng cho Sản khoa nếu thai phụ hoặc hậu sản
  let obstetricRes: ReturnType<typeof calculateObstetricScores> | undefined = undefined;
  if (patient.patientType === 'maternal' || patient.pregnancyWeek || patient.isPostpartum) {
    obstetricRes = calculateObstetricScores(patient);
  }

  // Xác định Chẩn đoán Chính & Độ khẩn cấp
  let primaryDiagnosis: CDSSAssessmentResult['primaryDiagnosis'] = 'no_sepsis';
  let urgencyLevel: CDSSAssessmentResult['urgencyLevel'] = 'routine';
  let isSepsis3 = false;
  let isSepticShock3 = false;

  if (patient.patientType === 'pediatric' && phoenixRes) {
    if (phoenixRes.isSepticShock) {
      primaryDiagnosis = 'septic_shock';
      urgencyLevel = 'emergency';
    } else if (phoenixRes.isSepsis) {
      primaryDiagnosis = 'confirmed_sepsis';
      urgencyLevel = 'urgent';
    } else if (patient.suspectedInfection) {
      primaryDiagnosis = 'uncomplicated_infection';
      urgencyLevel = 'routine';
    }
  } else if (patient.patientType === 'maternal' && obstetricRes) {
    if (obstetricRes.isSepticShock) {
      primaryDiagnosis = 'septic_shock';
      urgencyLevel = 'emergency';
    } else if (obstetricRes.isSepsis) {
      primaryDiagnosis = 'confirmed_sepsis';
      urgencyLevel = 'urgent';
    } else if (obstetricRes.isHighSuspicion) {
      primaryDiagnosis = 'suspected_sepsis';
      urgencyLevel = 'urgent';
    } else if (patient.suspectedInfection) {
      primaryDiagnosis = 'uncomplicated_infection';
      urgencyLevel = 'routine';
    }
  } else {
    // Người lớn Sepsis-3
    const deltaSofa = sofa.score; // Giả định baseline = 0 nếu không có suy cơ quan mạn trước đó
    isSepsis3 = patient.suspectedInfection && deltaSofa >= 2;
    isSepticShock3 = isSepsis3 && patient.vasoactiveMedCount > 0 && (patient.lactateInitial ? patient.lactateInitial > 2.0 : false);

    if (isSepticShock3) {
      primaryDiagnosis = 'septic_shock';
      urgencyLevel = 'emergency';
    } else if (isSepsis3) {
      primaryDiagnosis = 'confirmed_sepsis';
      urgencyLevel = 'emergency';
    } else if (patient.suspectedInfection && nice.riskCategory === 'high') {
      primaryDiagnosis = 'suspected_sepsis';
      urgencyLevel = 'emergency';
    } else if (patient.suspectedInfection && (nice.riskCategory === 'medium' || qsofa.isHighRisk)) {
      primaryDiagnosis = 'suspected_sepsis';
      urgencyLevel = 'urgent';
    } else if (patient.suspectedInfection) {
      primaryDiagnosis = 'uncomplicated_infection';
      urgencyLevel = 'routine';
    } else {
      primaryDiagnosis = 'no_sepsis';
      urgencyLevel = 'routine';
    }
  }

  // Tóm tắt kết luận lâm sàng
  let summarySentence = '';
  if (primaryDiagnosis === 'septic_shock') {
    summarySentence = 'CẢNH BÁO ĐỎ: Bệnh nhân thỏa tiêu chuẩn SỐC NHIỄM KHUẨN (Septic Shock) với tụt huyết áp cần thuốc vận mạch và tăng Lactate máu. Nguy cơ tử vong rất cao (> 40%), cần can thiệp "Giờ Vàng" ngay lập tức!';
  } else if (primaryDiagnosis === 'confirmed_sepsis') {
    summarySentence = 'XÁC NHẬN NHIỄM KHUẨN HUYẾT (Sepsis): Có bằng chứng rối loạn chức năng cơ quan đe dọa tính mạng (SOFA ≥ 2 / Phoenix ≥ 2 / Obs SOFA ≥ 2). Khởi động phác đồ cấp cứu Sepsis.';
  } else if (primaryDiagnosis === 'suspected_sepsis') {
    summarySentence = 'NGHI NGỜ CAO NHIỄM KHUẨN HUYẾT: Bệnh nhân có nguy cơ cao theo tiêu chí NICE NG253 hoặc NEWS2/qSOFA. Cần bác sĩ khám khẩn cấp, lấy xét nghiệm vi sinh và chuẩn bị điều trị theo khung giờ.';
  } else if (primaryDiagnosis === 'uncomplicated_infection') {
    summarySentence = 'Nhiễm khuẩn tại chỗ / Chưa có bằng chứng suy cơ quan đe dọa tính mạng. Tiếp tục theo dõi sát thang điểm cảnh báo sớm NEWS2 định kỳ.';
  } else {
    summarySentence = 'Chưa ghi nhận bằng chứng nhiễm trùng hoặc nguy cơ sepsis tại thời điểm đánh giá.';
  }

  // Tạo Kế hoạch Hành động Lâm sàng theo các Guidelines (NICE 2024/2026, SSC 2021, Fetal I+D, Das 2024, Unic-Stojanovic 2026)
  const antibioticRegimen: string[] = [];
  let antibioticTiming = '';
  let fluidResuscitation = '';
  let vasopressorStrategy = '';
  const escalationAndConsult: string[] = [];
  let monitoringFrequency = '';
  const microbiologySteps: string[] = [];
  let sourceControlNotes = '';

  // 1. Kháng sinh (Antibiotic Strategy)
  if (primaryDiagnosis === 'no_sepsis') {
    antibioticTiming = 'Hiện tại KHÔNG CÓ CHỈ ĐỊNH sử dụng kháng sinh. Tiếp tục theo dõi lâm sàng và các dấu hiệu cảnh báo sớm.';
    antibioticRegimen.push('Chưa có chỉ định kháng sinh (Chưa phát hiện ổ nhiễm hoặc hội chứng nhiễm trùng).');
  } else if (primaryDiagnosis === 'septic_shock' || primaryDiagnosis === 'confirmed_sepsis' || nice.riskCategory === 'high') {
    antibioticTiming = 'DÙNG KHÁNG SINH PHỔ RỘNG TĨNH MẠCH TRONG VÒNG 1 GIỜ ("Giờ vàng" / Hour-1 Bundle). Mỗi giờ chậm trễ làm tăng tỷ lệ tử vong 7 - 8%.';
  } else if (nice.riskCategory === 'medium') {
    antibioticTiming = 'Đánh giá khẩn và khởi đầu kháng sinh trong vòng 3 GIỜ nếu nguyên nhân nhiễm khuẩn vẫn còn nghi ngờ sau các bước thăm dò nhanh.';
  } else {
    antibioticTiming = 'Trì hoãn kháng sinh tối đa 6 giờ để thu thập bằng chứng chẩn đoán xác định tác nhân, tránh lạm dụng kháng sinh phổ rộng.';
  }

  // Khuyến cáo kháng sinh theo ổ nhiễm & Bằng chứng T2MR / Cấy máu
  if (primaryDiagnosis !== 'no_sepsis') {
    if (patient.rapidMolecularT2Done && patient.rapidMolecularResult === 'positive' && patient.rapidMolecularPathogen) {
      const genes = patient.rapidMolecularResistanceGenes || [];
      antibioticRegimen.push(`T2Bacteria phát hiện nhanh: ${patient.rapidMolecularPathogen} (Tiết kiệm > 100 giờ so với cấy máu thường).`);
      if (genes.includes('blaKPC') || genes.includes('blaOXA-48')) {
        antibioticRegimen.push('Phát hiện gen Carbapenemase (KPC / OXA-48): Đổi sang Ceftazidime / Avibactam (có thể kết hợp Aztreonam nếu có Metallo-β-lactamase NDM/VIM).');
      } else if (genes.includes('blaCTX-M')) {
        antibioticRegimen.push('Phát hiện gen ESBL (CTX-M): Ưu tiên dùng nhóm Carbapenem (Meropenem 1-2g mỗi 8h truyền kéo dài) hoặc Ceftolozane/Tazobactam.');
      }
    } else {
      // Phác đồ kinh nghiệm ban đầu
      if (patient.patientType === 'maternal') {
        antibioticRegimen.push('Sản khoa: Meropenem 1g TTM q8h (truyền kéo dài 3-4h) + Daptomycin 10mg/kg (hoặc Linezolid 600mg q12h).');
        if (patient.hasImmunosuppression) {
          antibioticRegimen.push('Nếu dị ứng Penicillin: Phối hợp Aztreonam + Amikacin hoặc Fosfomycin để bao phủ vi khuẩn Gr(-).');
        }
      } else if (patient.patientType === 'pediatric') {
        if (patient.ageYears >= 16) {
          antibioticRegimen.push('Thanh thiếu niên 16-18 tuổi (NICE NG253): Ceftriaxone 80 mg/kg tiêm 1 lần/ngày (tối đa 4g/ngày).');
        } else {
          antibioticRegimen.push('Nhi khoa: Ceftriaxone hoặc Cefotaxime phối hợp Vancomycin nếu nghi ngờ tụ cầu kháng Methicillin (MRSA).');
        }
      } else {
        // Người lớn
        if (patient.infectionSource === 'respiratory') {
          antibioticRegimen.push('Hô hấp (Viêm phổi nặng/Sepsis): Piperacillin/Tazobactam 4.5g TTM q6h (truyền kéo dài 3-4h) HOẶC Cefepime 2g q8h, phối hợp Macrolide hoặc Levofloxacin.');
        } else if (patient.infectionSource === 'urinary') {
          antibioticRegimen.push('Tiết niệu: Ceftriaxone 2g/ngày hoặc Meropenem 1g q8h nếu có yếu tố nguy cơ vi khuẩn sinh ESBL.');
        } else if (patient.infectionSource === 'abdominal') {
          antibioticRegimen.push('Ổ bụng: Piperacillin/Tazobactam hoặc Meropenem + Metronidazole nếu cần bảo vệ vi khuẩn kỵ khí sâu.');
        } else {
          antibioticRegimen.push('Nhiễm trùng chưa rõ nguồn: Meropenem 1-2g q8h (truyền kéo dài) + Vancomycin 15-20 mg/kg (nếu có nguy cơ cao MRSA).');
        }
      }
    }
  }

  // 2. Hồi sức Dịch (Fluid Resuscitation)
  if (primaryDiagnosis === 'no_sepsis') {
    fluidResuscitation = 'Chưa có chỉ định hồi sức dịch cấp cứu. Duy trì nhu cầu dịch cơ bản sinh lý bình thường.';
  } else if (patient.patientType === 'maternal') {
    fluidResuscitation = patient.isPostpartum
      ? 'Hậu sản: Bolus ban đầu 30 mL/kg dung dịch tinh thể đẳng trương (Ringer Lactate / Hartmann) trong 3 giờ đầu. Tránh quá tải tuần hoàn.'
      : 'Thai kỳ: Bắt đầu thận trọng hơn với bolus 20 mL/kg dung dịch tinh thể đẳng trương trong 3 giờ đầu, do nguy cơ phù phổi cấp ở phụ nữ mang thai tăng cao.';
  } else if (patient.patientType === 'pediatric') {
    fluidResuscitation = 'Nhi khoa: Bolus 10 - 20 mL/kg dung dịch tinh thể cân bằng trong 30 - 60 phút, đánh giá kỹ dấu hiệu quá tải dịch (gan to, ran ẩm phổi) trước mỗi liều lặp lại.';
  } else {
    // Người lớn theo NICE 2024/2026 và SSC 2021
    if (patient.setting === 'acute_hospital' || patient.setting === 'community_custodial') {
      fluidResuscitation = 'Khuyến cáo NICE NG253 (2025/2026): Bắt đầu bolus 250 mL dung dịch tinh thể cân bằng (Hartmann / Ringer Lactate) trong 10 - 15 phút. Có thể lặp lại từng liều 250 mL đến tối đa 1,000 mL. Bắt buộc đánh giá lại lâm sàng và SpO2 sau mỗi liều. Nếu sau 1,000 mL chưa cải thiện huyết áp/tri giác, phải hội chẩn Bác sĩ cấp cao (ST3+) hoặc ICU.';
    } else {
      fluidResuscitation = 'Theo SSC 2021: Truyền ít nhất 30 mL/kg dung dịch tinh thể cân bằng (Balanced Crystalloid) trong 3 giờ đầu đối với giảm tưới máu hoặc sốc nhiễm khuẩn. Hướng dẫn bù dịch tiếp theo bằng các biện pháp động học (test nâng chân thụ động PLR, biến thiên thể tích nhát bóp SVV) và thời gian phục hồi màu da mao mạch (CRT ≤ 2s).';
    }
  }

  // 3. Vận mạch & Huyết động (Vasopressor Strategy)
  if (primaryDiagnosis === 'septic_shock' || map < 65) {
    vasopressorStrategy = 'Norepinephrine là thuốc vận mạch lựa chọn hàng đầu (First-line). Đích duy trì Huyết áp trung bình MAP ≥ 65 mmHg. Theo SSC 2021 và NICE 2025: có thể khởi động truyền qua đường ngoại biên tạm thời (tĩnh mạch lớn vùng khuỷu tay trở lên) trong khi chuẩn bị đặt Catheter tĩnh mạch trung tâm (CVC) để tránh chậm trễ. Nếu liều Norepinephrine đạt 0.25 - 0.5 mcg/kg/phút mà MAP chưa đạt, phối hợp thêm Vasopressin 0.03 đv/phút thay vì tăng liều cao Norepinephrine. Thêm Dobutamine nếu có bằng chứng rối loạn chức năng cơ tim/cung lượng tim thấp.';
  } else {
    vasopressorStrategy = 'Hiện tại chưa cần dùng thuốc vận mạch. Theo dõi sát huyết áp động mạch và duy trì MAP ≥ 65 mmHg.';
  }

  // 4. Hội chẩn & Bậc thang Chăm sóc
  if (primaryDiagnosis === 'septic_shock') {
    escalationAndConsult.push('Báo động Đội Hồi sức Tích cực (ICU / MET Team) tiếp nhận bệnh nhân khẩn cấp (khuyến cáo nhập ICU trong vòng 6 giờ).');
    escalationAndConsult.push('Bác sĩ cấp cao (Senior decision maker ST3+ / Bác sĩ CKII Hồi sức) phải trực tiếp có mặt tại giường bệnh.');
  } else if (nice.riskCategory === 'high') {
    escalationAndConsult.push('Yêu cầu Bác sĩ có năng lực hồi sức cấp cứu (FY2 trở lên) đánh giá trực tiếp ngay tại giường bệnh.');
    escalationAndConsult.push('Hội chẩn Bác sĩ cấp cao (ST3+) nếu bệnh nhân không cải thiện trong vòng 1 giờ sau can thiệp ban đầu.');
  } else if (news2.hasSingleParam3) {
    escalationAndConsult.push('Cảnh báo Red Flag (1 thông số 3 điểm): Bác sĩ FY2+ đánh giá khẩn cấp để xác định nguy cơ suy cơ quan tiềm ẩn do nhiễm khuẩn.');
  } else if (primaryDiagnosis === 'no_sepsis') {
    escalationAndConsult.push('Theo dõi sinh hiệu định kỳ theo quy trình thường quy của khoa phòng.');
  }

  // 5. Tần suất theo dõi (NICE & AoMRC 2024/2026)
  if (nice.riskCategory === 'high' || primaryDiagnosis === 'septic_shock') {
    monitoringFrequency = 'Đo lại sinh hiệu & tính điểm NEWS2 mỗi 30 PHÚT. Đánh giá lại liên tục đáp ứng tưới máu mô (CRT, tri giác, nước tiểu).';
  } else if (nice.riskCategory === 'medium') {
    monitoringFrequency = 'Đo lại sinh hiệu & tính điểm NEWS2 mỗi 1 GIỜ. Đánh giá lại kết quả Lactate tĩnh mạch trong vòng 1 giờ.';
  } else {
    monitoringFrequency = 'Đo lại sinh hiệu & điểm NEWS2 mỗi 4 - 6 GIỜ hoặc theo quy trình chăm sóc nội trú thông thường.';
  }

  // 6. Vi sinh & Cận lâm sàng (Microbiology & Molecular Diagnostics)
  if (primaryDiagnosis !== 'no_sepsis') {
    microbiologySteps.push('Cấy máu: Lấy ít nhất 2 bộ cấy máu (hiếu khí & kỵ khí) từ 2 vị trí khác nhau TRƯỚC KHI TIÊM KHÁNG SINH, không để việc lấy máu làm chậm trễ kháng sinh > 45 phút.');
    if (patient.infectionSource === 'urinary') {
      microbiologySteps.push('Vi sinh đường niệu: Lấy mẫu nước tiểu giữa dòng (MSU) hoặc qua ống thông niệu vô khuẩn mới để soi tươi vi khuẩn/bạch cầu, tổng phân tích nước tiểu và cấy vi sinh làm kháng sinh đồ trước khi dùng kháng sinh.');
    }
    microbiologySteps.push('Xét nghiệm máu tĩnh mạch khẩn: Khí máu (Lactate, Glucose), Tổng phân tích tế bào máu, CRP, Chức năng thận (Urea, Creatinine), Gan (Bilirubin, Men gan), Đông máu (INR, D-dimer, Fibrinogen).');
    microbiologySteps.push('Khuyến cáo NICE 2026: Cân nhắc xét nghiệm Procalcitonin (PCT) ở nhóm nguy cơ trung bình và cao để hướng dẫn phân tầng nguy cơ và quyết định dừng kháng sinh an toàn.');
    microbiologySteps.push('Ứng dụng chẩn đoán phân tử nhanh (T2Bacteria / T2Resistance Panel): Cho kết quả trực tiếp từ máu toàn phần trong vòng 3-5 giờ đối với vi khuẩn ESKAPE (K. pneumoniae, P. aeruginosa, A. baumannii) và gen kháng carbapenem, giúp chuyển kháng sinh trúng đích sớm hơn > 100 giờ.');
  } else {
    microbiologySteps.push('Chưa có chỉ định cấy máu hoặc chẩn đoán phân tử khẩn. Theo dõi các xét nghiệm thường quy.');
  }

  // 7. Kiểm soát ổ nhiễm trùng (Source Control - SSC & NICE)
  if (primaryDiagnosis === 'no_sepsis') {
    sourceControlNotes = 'Chưa phát hiện ổ nhiễm khuẩn cần can thiệp ngoại khoa hay thủ thuật xâm lấn.';
  } else if (patient.infectionSource === 'urinary') {
    sourceControlNotes = 'Nhiễm trùng đường niệu (Urosepsis): Siêu âm hệ tiết niệu khẩn cấp loại trừ ứ mủ bể thận hoặc bế tắc do sỏi niệu quản. Nếu có bế tắc cơ học kèm nhiễm trùng, BẮT BUỘC can thiệp giải áp khẩn (đặt ống thông JJ niệu quản hoặc dẫn lưu bể thận qua da PCN) trong vòng 6 - 12 giờ (SSC 2021 & EAU 2024 Guidelines). Rút hoặc thay catheter niệu nếu bệnh nhân đang đặt ống thông lưu.';
  } else {
    sourceControlNotes = 'Tìm và kiểm soát triệt để ổ nhiễm khuẩn trong vòng 6 - 12 giờ (Dẫn lưu áp xe, phẫu thuật cắt lọc mô hoại tử, rút ngay catheter tĩnh mạch nghi nhiễm khuẩn sau khi đã thiết lập đường truyền mới, siêu âm/CT bụng tiểu khung nếu chưa rõ nguồn).';
  }

  return {
    sofaScore: sofa.score,
    sofaBreakdown: sofa.breakdown,
    deltaSofa: sofa.score,
    qsofaScore: qsofa.score,
    qsofaBreakdown: qsofa.breakdown,
    qsofaCriteriaMet: qsofa.criteriaMet,
    isQsofaPositive: qsofa.isHighRisk,
    isSepsis3,
    isSepticShock3,

    sirsScore: sirs.score,
    sirsCriteriaMet: sirs.criteriaMet,
    isSirsPositive: sirs.isPositive,

    news2Score: news2.score,
    news2Breakdown: news2.breakdown,
    news2RiskCategory: news2.riskCategory,
    hasSingleParam3RedFlag: news2.hasSingleParam3,

    lpNewsScore: lpNews.score,
    lpNewsBreakdown: lpNews.breakdown,
    lpNewsMortalityRiskTier: lpNews.riskTier,
    lpNewsPredictedMortalityText: lpNews.predictedMortalityText,

    niceRiskCategory: nice.riskCategory,
    niceHighRiskCriteriaMet: nice.highRiskCriteria,
    niceMediumRiskCriteriaMet: nice.mediumRiskCriteria,
    niceAntibioticMaxDelayHours: nice.maxAntibioticDelayHours,

    phoenixScore: phoenixRes?.score,
    phoenixBreakdown: phoenixRes?.breakdown,
    phoenixCardiovascularScore: phoenixRes?.cvScore,
    isPhoenixSepsis: phoenixRes?.isSepsis,
    isPhoenixSepticShock: phoenixRes?.isSepticShock,

    obstetricQsofaScore: obstetricRes?.qsofaScore,
    obstetricQsofaBreakdown: obstetricRes?.qsofaBreakdown,
    obstetricSofaScore: obstetricRes?.sofaScore,
    obstetricSofaBreakdown: obstetricRes?.sofaBreakdown,
    isObstetricSepsis: obstetricRes?.isSepsis,
    isObstetricSepticShock: obstetricRes?.isSepticShock,

    calculatedMap: map,
    calculatedNlr: nlrCalc.nlr,
    nlrRiskLevel: nlrCalc.riskLevel,
    lactateClearancePercent: lactateKinetics.clearancePercent,
    lactateClearanceEvaluation: lactateKinetics.evaluation,
    pctEvaluation: patient.procalcitonin ? `${patient.procalcitonin} ng/mL (${patient.procalcitonin >= 2.0 ? 'Nguy cơ cao nhiễm khuẩn huyết do vi khuẩn' : 'Mức thấp/chưa điển hình'})` : undefined,
    crpEvaluation: patient.crp ? `${patient.crp} mg/L (${patient.crp > 100 ? 'Viêm hệ thống cấp tính nặng' : 'Tăng mức độ vừa'})` : undefined,

    primaryDiagnosis,
    urgencyLevel,
    summarySentence,

    actions: {
      antibioticTiming,
      antibioticRegimen,
      fluidResuscitation,
      vasopressorStrategy,
      escalationAndConsult,
      monitoringFrequency,
      microbiologySteps,
      sourceControlNotes
    }
  };
}
