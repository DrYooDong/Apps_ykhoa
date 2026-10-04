import {
  PatientData,
  InsulinCalculationResult,
  ClinicalAlert,
  HypoProtocolDetails,
  GlucoseUnit,
  InsulinRegimenType,
} from '../types/cdss';

// Unit conversion helpers
export const mgDlToMmolL = (mgDl: number): number => {
  return Number((mgDl / 18.018).toFixed(1));
};

export const mmolLToMgDl = (mmolL: number): number => {
  return Math.round(mmolL * 18.018);
};

export const normalizeToMgDl = (val: number, unit: GlucoseUnit): number => {
  if (unit === 'mmol_l') {
    return mmolLToMgDl(val);
  }
  return val;
};

export const normalizeToMmolL = (val: number, unit: GlucoseUnit): number => {
  if (unit === 'mg_dl') {
    return mgDlToMmolL(val);
  }
  return val;
};

export const formatGlucose = (val: number, currentUnit: GlucoseUnit, targetUnit: GlucoseUnit): string => {
  if (currentUnit === targetUnit) {
    return `${val} ${targetUnit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}`;
  }
  if (targetUnit === 'mmol_l') {
    return `${mgDlToMmolL(val)} mmol/L`;
  }
  return `${mmolLToMgDl(val)} mg/dL`;
};

// BMI Calculation
export const calculateBMI = (weightKg: number, heightCm: number): number => {
  if (!weightKg || !heightCm) return 0;
  const hMeters = heightCm / 100;
  return Number((weightKg / (hMeters * hMeters)).toFixed(1));
};

// Calculate effective osmolality: 2*Na + Glucose (in mmol/L)
export const calculateEffectiveOsmolality = (sodiumMmol: number, glucoseMmol: number): number => {
  return Number((2 * sodiumMmol + glucoseMmol).toFixed(1));
};

// Calculate total osmolality: 2*Na + Glucose + Urea (in mmol/L)
export const calculateTotalOsmolality = (sodiumMmol: number, glucoseMmol: number, ureaMmol: number): number => {
  return Number((2 * sodiumMmol + glucoseMmol + ureaMmol).toFixed(1));
};

// Corrected Sodium (Katz formula: Na + 0.016 * (Glucose_mgdL - 100))
export const calculateCorrectedSodium = (sodiumMmol: number, glucoseMmol: number): number => {
  const glucoseMgDl = glucoseMmol * 18.018;
  if (glucoseMgDl <= 100) return sodiumMmol;
  return Number((sodiumMmol + 0.016 * (glucoseMgDl - 100)).toFixed(1));
};

// Calculate Anion Gap: (Na + K) - (Cl + HCO3)
export const calculateAnionGap = (na: number, k: number, cl: number, hco3: number): number => {
  return Number(((na + k) - (cl + hco3)).toFixed(1));
};

/**
 * Insulin Dose Engine
 * Follows ADA 2026, JBDS-IP, and VADE/iSTEP-D protocols
 */
export const calculateInsulinPlan = (patient: PatientData): InsulinCalculationResult => {
  const currentGlucoseMgDl = normalizeToMgDl(patient.currentGlucose, patient.unit);
  const bmi = calculateBMI(patient.weightKg, patient.heightCm);

  let dosePerKg = 0.4; // Default starting point
  let factorExplanation = '';
  let tddEstimated = 0;
  let calculationMethod: 'WEIGHT_BASED' | 'IV_CONVERSION' | 'HOME_DOSE_REDUCTION' = 'WEIGHT_BASED';

  // Check IV conversion first if on IV insulin
  if (patient.isOnIVInsulin && patient.ivRateLast6hAvg && patient.ivRateLast6hAvg > 0) {
    calculationMethod = 'IV_CONVERSION';
    const total24hIV = patient.ivRateLast6hAvg * 24;
    // 60-80% of 24h total IV (average 70-80%)
    const reductionPercent = 0.75;
    tddEstimated = Math.round(total24hIV * reductionPercent);
    factorExplanation = `Chuyển từ truyền tĩnh mạch liên tục (VRIII/FRIII): Trung bình ${patient.ivRateLast6hAvg.toFixed(1)} ĐV/giờ x 24h = ${total24hIV.toFixed(1)} ĐV. Lấy 75% tổng liều 24h qua (${tddEstimated} ĐV) để trừ hao giải phóng độc tính glucose (JBDS-IP & ĐHYD).`;
    const safeWeight = (patient.weightKg && patient.weightKg > 0) ? patient.weightKg : 60;
    dosePerKg = Number((tddEstimated / safeWeight).toFixed(2));
  } else if (patient.isPriorInsulinTreated && patient.priorHomeTdd && patient.priorHomeTdd > 0) {
    calculationMethod = 'HOME_DOSE_REDUCTION';
    // Reduce home insulin by 20-25% upon hospital admission due to reduced oral intake/inactivity
    tddEstimated = Math.round(patient.priorHomeTdd * 0.8);
    factorExplanation = `Căn cứ theo tổng liều insulin ngoại trú trước nhập viện (${patient.priorHomeTdd} ĐV/ngày), giảm 20% khi nhập viện = ${tddEstimated} ĐV/ngày để phòng ngừa hạ đường huyết (iSTEP-D / VADE).`;
    const safeWeight = (patient.weightKg && patient.weightKg > 0) ? patient.weightKg : 60;
    dosePerKg = Number((tddEstimated / safeWeight).toFixed(2));
  } else {
    // Weight-based calculation
    calculationMethod = 'WEIGHT_BASED';
    const hasHypoRisk =
      patient.age >= 65 ||
      (patient.egfr && patient.egfr < 45) ||
      (patient.creatinine && patient.creatinine > 140) ||
      patient.isOnDialysis ||
      bmi < 19 ||
      !patient.isPriorInsulinTreated;

    const hasSevereResistant =
      (patient.isTakingSteroids && (patient.steroidDoseMg || 0) >= 15) ||
      bmi >= 32 ||
      currentGlucoseMgDl >= 300;

    if (hasHypoRisk) {
      dosePerKg = 0.3;
      factorExplanation = `0.3 ĐV/kg: Nhóm có nguy cơ hạ đường huyết cao (Tuổi ${patient.age} ≥ 65, suy giảm chức năng thận eGFR/Creatinine, gầy hoặc chưa từng dùng insulin trước đây).`;
    } else if (hasSevereResistant) {
      dosePerKg = 0.55;
      factorExplanation = `0.55 ĐV/kg: Nhóm có khả năng đề kháng insulin cao (Béo phì BMI ${bmi} hoặc đang dùng Corticoid liều cao hoặc ĐH nhập viện ≥ 300 mg/dL).`;
    } else if (currentGlucoseMgDl >= 200) {
      dosePerKg = 0.5;
      factorExplanation = `0.5 ĐV/kg: Đường huyết nhập viện cao (200 - 300 mg/dL), thể trạng trung bình.`;
    } else {
      dosePerKg = 0.4;
      factorExplanation = `0.4 ĐV/kg: Đường huyết nhập viện 140 - 200 mg/dL, không có nguy cơ suy kiệt hay suy giảm chức năng thận nặng.`;
    }

    // Dialysis day adjustment note
    if (patient.isOnDialysis && patient.isDialysisDay) {
      dosePerKg = Number((dosePerKg * 0.75).toFixed(2));
      factorExplanation += ` [Đã giảm 25% liều do hôm nay là ngày chạy thận nhân tạo mHDx theo khuyến cáo JBDS-IP 11].`;
    }

    tddEstimated = Math.max(0, Math.round((patient.weightKg || 0) * dosePerKg));
  }

  // Determine Regimen Type
  let regimenType: InsulinRegimenType = patient.userPreferredRegimen || 'BASAL_BOLUS';
  if (!patient.userPreferredRegimen) {
    if (patient.dietType === 'NPO' || patient.dietType === 'ORAL_POOR') {
      regimenType = 'BASAL_PLUS';
    } else if (patient.wardType === 'ICU') {
      regimenType = 'VRIII';
    }
  }

  // Calculate Distribution
  let basalDose = 0;
  let prandialTotal = 0;
  let basalTiming = 'Tiêm dưới da 1 lần/ngày cố định (21:00 hoặc 07:00 sáng)';
  let basalDrugSuggestion = 'Insulin Glargine U100 (Lantus), Degludec (Tresiba) hoặc Detemir (Levemir)';
  let prandialDrugSuggestion = 'Insulin nhanh/analog: Aspart (NovoRapid), Lispro (Humalog), Glulisine (Apidra) - tiêm ngay trước bữa ăn (0-15 phút)';

  // Premix dosing object
  const premixMorning = Math.round(tddEstimated * (2 / 3));
  const premixEvening = tddEstimated - premixMorning;
  const premixDosing = {
    morningDose: premixMorning,
    eveningDose: premixEvening,
    morningTiming: 'Trước ăn sáng 0-15 phút (Analog Premix) hoặc 30 phút (Human Premix)',
    eveningTiming: 'Trước ăn tối 0-15 phút (Analog Premix) hoặc 30 phút (Human Premix)',
    premixDrugs: 'Mixtard 30 (Human 30/70), Novomix 30 (Aspart 30/70), Humalog Mix 25/50 (Lispro)',
    titrationRule: {
      morningTitrationBasedOn: 'Chỉnh liều SÁNG theo Đường huyết trước ăn CHIỀU (hoặc sau ăn trưa)',
      eveningTitrationBasedOn: 'Chỉnh liều CHIỀU theo Đường huyết trước ăn SÁNG hôm sau (Fasting BG)',
      scaleTable: [
        {
          glucoseDesc: 'Dưới 80 mg/dL (< 4.4 mmol/L)',
          bgMinMmol: 0,
          bgMaxMmol: 4.3,
          bgMinMgDl: 0,
          bgMaxMgDl: 79,
          doseAdjustmentPercent: -20,
          note: 'Hạ ĐH: Giảm 20% liều tương ứng và xử trí cấp cứu',
        },
        {
          glucoseDesc: '81 - 139 mg/dL (4.4 - 7.7 mmol/L)',
          bgMinMmol: 4.4,
          bgMaxMmol: 7.7,
          bgMinMgDl: 80,
          bgMaxMgDl: 139,
          doseAdjustmentPercent: 0,
          note: 'ĐẠT MỤC TIÊU: Giữ nguyên liều',
        },
        {
          glucoseDesc: '140 - 179 mg/dL (7.8 - 9.9 mmol/L)',
          bgMinMmol: 7.8,
          bgMaxMmol: 9.9,
          bgMinMgDl: 140,
          bgMaxMgDl: 179,
          doseAdjustmentPercent: 10,
          note: 'Tăng nhẹ: Tăng thêm +10% liều',
        },
        {
          glucoseDesc: '180 - 249 mg/dL (10.0 - 13.8 mmol/L)',
          bgMinMmol: 10.0,
          bgMaxMmol: 13.8,
          bgMinMgDl: 180,
          bgMaxMgDl: 249,
          doseAdjustmentPercent: 20,
          note: 'Tăng trung bình: Tăng thêm +20% liều',
        },
        {
          glucoseDesc: '≥ 250 mg/dL (≥ 13.9 mmol/L)',
          bgMinMmol: 13.9,
          bgMaxMmol: 99.9,
          bgMinMgDl: 250,
          bgMaxMgDl: 999,
          doseAdjustmentPercent: 30,
          note: 'Tăng cao: Tăng thêm +30% liều và tìm nguyên nhân',
        },
      ],
    },
  };

  if (regimenType === 'BASAL_BOLUS') {
    basalDose = Math.round(tddEstimated * 0.5);
    prandialTotal = tddEstimated - basalDose;
  } else if (regimenType === 'BASAL_PLUS') {
    basalDose = Math.round(tddEstimated * 0.5);
    prandialTotal = 0;
    basalTiming = 'Tiêm 1 lần/ngày lúc 21:00. BẮT BUỘC duy trì nền ngay cả khi nhịn ăn NPO (đặc biệt ĐTĐ típ 1).';
  } else if (regimenType === 'PREMIX') {
    basalDose = premixMorning; // Represent morning dose in summary
    prandialTotal = premixEvening; // Represent evening dose in summary
    basalTiming = 'Cữ Sáng: 2/3 tổng liều (trước ăn sáng); Cữ Chiều: 1/3 tổng liều (trước ăn tối)';
    basalDrugSuggestion = 'Insulin trộn sẵn 2 pha (Novomix 30, Mixtard 30, Humalog Mix 25/50)';
  } else {
    basalDose = Math.round(tddEstimated * 0.5);
    prandialTotal = tddEstimated - basalDose;
  }

  // Split Prandial into 3 meals
  const prandialBreakfast = Math.round(prandialTotal / 3);
  const prandialLunch = Math.round(prandialTotal / 3);
  const prandialDinner = prandialTotal - prandialBreakfast - prandialLunch;

  // Determine Sensitivity Scale Category
  let patientSensitivityCategory: 'SENSITIVE' | 'USUAL' | 'RESISTANT' = 'USUAL';
  if (tddEstimated < 40 || patient.age >= 70 || (patient.egfr && patient.egfr < 45) || patient.dietType === 'ORAL_POOR') {
    patientSensitivityCategory = 'SENSITIVE';
  } else if (tddEstimated > 80 || (patient.isTakingSteroids && (patient.steroidDoseMg || 0) >= 20) || bmi >= 30) {
    patientSensitivityCategory = 'RESISTANT';
  }

  const recommendedCorrectionColumn =
    patientSensitivityCategory === 'SENSITIVE'
      ? 'Cột 1: Nhạy cảm Insulin (Ăn kém, cao tuổi, suy thận/gan, TDD < 40 ĐV)'
      : patientSensitivityCategory === 'RESISTANT'
      ? 'Cột 3: Đề kháng Insulin (Dùng Corticoid, béo phì, TDD > 80 ĐV)'
      : 'Cột 2: Thông thường (Ăn hết suất ăn, TDD 40 - 80 ĐV)';

  // Correction table based on TS.BS Trần Quang Nam (slide 34) & Endotext
  const correctionScale = [
    {
      rangeDesc: 'Dưới 80 mg/dL (< 4.4 mmol/L)',
      bgMinMgDl: 0,
      bgMaxMgDl: 79,
      bgMinMmol: 0,
      bgMaxMmol: 4.3,
      sensitiveDose: -1,
      usualDose: -1,
      resistantDose: -2,
    },
    {
      rangeDesc: '81 - 139 mg/dL (4.5 - 7.7 mmol/L)',
      bgMinMgDl: 80,
      bgMaxMgDl: 139,
      bgMinMmol: 4.4,
      bgMaxMmol: 7.7,
      sensitiveDose: 0,
      usualDose: 0,
      resistantDose: 0,
    },
    {
      rangeDesc: '140 - 159 mg/dL (7.8 - 8.8 mmol/L)',
      bgMinMgDl: 140,
      bgMaxMgDl: 159,
      bgMinMmol: 7.8,
      bgMaxMmol: 8.8,
      sensitiveDose: 0,
      usualDose: 1,
      resistantDose: 1,
    },
    {
      rangeDesc: '160 - 200 mg/dL (8.9 - 11.0 mmol/L)',
      bgMinMgDl: 160,
      bgMaxMgDl: 200,
      bgMinMmol: 8.9,
      bgMaxMmol: 11.0,
      sensitiveDose: 1,
      usualDose: 1,
      resistantDose: 2,
    },
    {
      rangeDesc: '201 - 249 mg/dL (11.1 - 13.9 mmol/L)',
      bgMinMgDl: 201,
      bgMaxMgDl: 249,
      bgMinMmol: 11.1,
      bgMaxMmol: 13.9,
      sensitiveDose: 2,
      usualDose: 3,
      resistantDose: 4,
    },
    {
      rangeDesc: '250 - 299 mg/dL (14.0 - 16.6 mmol/L)',
      bgMinMgDl: 250,
      bgMaxMgDl: 299,
      bgMinMmol: 14.0,
      bgMaxMmol: 16.6,
      sensitiveDose: 3,
      usualDose: 5,
      resistantDose: 7,
    },
    {
      rangeDesc: '300 - 349 mg/dL (16.7 - 19.4 mmol/L)',
      bgMinMgDl: 300,
      bgMaxMgDl: 349,
      bgMinMmol: 16.7,
      bgMaxMmol: 19.4,
      sensitiveDose: 4,
      usualDose: 7,
      resistantDose: 10,
    },
    {
      rangeDesc: '≥ 350 mg/dL (≥ 19.5 mmol/L)',
      bgMinMgDl: 350,
      bgMaxMgDl: 999,
      bgMinMmol: 19.5,
      bgMaxMmol: 99.9,
      sensitiveDose: 5,
      usualDose: 8,
      resistantDose: 12,
    },
  ];

  // Basal Titration evaluation (if fasting glucose provided)
  let basalTitrationGuidance = undefined;
  if (patient.fastingGlucose !== undefined && patient.fastingGlucose > 0) {
    const fbgMgDl = normalizeToMgDl(patient.fastingGlucose, patient.unit);
    if (fbgMgDl < 70) {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: -Math.max(2, Math.round(basalDose * 0.2)),
        actionText: `HẠ ĐƯỜNG HUYẾT ĐÓI (<70 mg/dL): Giảm ngay 20% liều nền (-${Math.max(2, Math.round(basalDose * 0.2))} ĐV) và kích hoạt phác đồ xử trí hạ ĐH ngay!`,
        alertSeverity: 'danger' as const,
      };
    } else if (fbgMgDl < 100) {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: -2,
        actionText: `ĐH đói 70 - 99 mg/dL: Dự báo nguy cơ hạ ĐH trong 24h tiếp theo (Flory et al.). Xem xét giảm 10-20% liều nền (-2 ĐV) hoặc ăn thêm bữa phụ đêm.`,
        alertSeverity: 'warning' as const,
      };
    } else if (fbgMgDl <= 140) {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: 0,
        actionText: `ĐH đói 100 - 140 mg/dL: ĐẠT MỤC TIÊU KIỂM SOÁT. Giữ nguyên liều insulin nền hiện tại.`,
        alertSeverity: 'success' as const,
      };
    } else if (fbgMgDl <= 160) {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: +2,
        actionText: `ĐH đói 141 - 160 mg/dL (7.9 - 8.9 mmol/L): Tăng liều insulin nền thêm +2 ĐV.`,
        alertSeverity: 'info' as const,
      };
    } else if (fbgMgDl <= 180) {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: +4,
        actionText: `ĐH đói 161 - 180 mg/dL (9.0 - 10.0 mmol/L): Tăng liều insulin nền thêm +4 ĐV.`,
        alertSeverity: 'warning' as const,
      };
    } else if (fbgMgDl <= 200) {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: +6,
        actionText: `ĐH đói 181 - 200 mg/dL (10.1 - 11.0 mmol/L): Tăng liều insulin nền thêm +6 ĐV.`,
        alertSeverity: 'warning' as const,
      };
    } else {
      basalTitrationGuidance = {
        currentFasting: fbgMgDl,
        adjustmentUnits: +8,
        actionText: `ĐH đói > 200 mg/dL (> 11.1 mmol/L): Tăng liều insulin nền thêm +8 ĐV và tìm yếu tố thúc đẩy (nhiễm trùng, corticoid).`,
        alertSeverity: 'danger' as const,
      };
    }
  }

  return {
    tddEstimated,
    dosePerKgFactor: dosePerKg,
    calculationMethod,
    rationale: factorExplanation,
    regimenType,
    basalDose,
    basalTiming,
    basalDrugSuggestion,
    prandialDoseTotal: prandialTotal,
    prandialBreakfast,
    prandialLunch,
    prandialDinner,
    prandialDrugSuggestion,
    correctionScale,
    patientSensitivityCategory,
    recommendedCorrectionColumn,
    basalTitrationGuidance,
    premixDosing,
  };
};

/**
 * Clinical Alerts Engine
 * Analyzes patient parameters and generates warnings based on clinical guidelines
 */
export const evaluateClinicalAlerts = (patient: PatientData): ClinicalAlert[] => {
  const alerts: ClinicalAlert[] = [];
  const currentGlucoseMgDl = normalizeToMgDl(patient.currentGlucose, patient.unit);
  const currentGlucoseMmol = normalizeToMmolL(patient.currentGlucose, patient.unit);

  // 1. Hypoglycemia Alerts ("Make 4 the floor")
  if (currentGlucoseMmol < 3.0 || currentGlucoseMgDl < 54) {
    alerts.push({
      id: 'hypo-level-2-3',
      category: 'HYPO',
      level: 'CRITICAL',
      title: 'HẠ ĐƯỜNG HUYẾT MỨC ĐỘ 2 / NGUY CƠ NẶNG (ĐH < 54 mg/dL / < 3.0 mmol/L)',
      message: `Đường huyết hiện tại là ${currentGlucoseMmol} mmol/L (${currentGlucoseMgDl} mg/dL). Đây là mức nguy hiểm có thể gây suy giảm nhận thức, co giật, rối loạn nhịp tim và tử vong.`,
      actionGuideline: 'XỬ TRÍ KHẨN: Dừng ngay mọi truyền insulin nếu có. Bệnh nhân tỉnh nuốt được: 15-20g đường nhanh (nước ép trái cây 150-200ml, 3-4 thìa đường). Bệnh nhân hôn mê/lú lẫn: Tiêm TM 100ml Glucose 20% hoặc 200ml Glucose 10% trong 15 phút (hoặc Glucagon 1mg TB). Thử lại ĐH mao mạch sau 10-15 phút. TUYỆT ĐỐI KHÔNG BỎ LIỀU INSULIN NỀN TIẾP THEO!',
      citation: 'JBDS-IP 01 (2023) & ADA 2026 Inpatient Guidelines',
    });
  } else if (currentGlucoseMmol < 4.0 || currentGlucoseMgDl < 70) {
    alerts.push({
      id: 'hypo-level-1',
      category: 'HYPO',
      level: 'CRITICAL',
      title: 'HẠ ĐƯỜNG HUYẾT MỨC ĐỘ 1 (ĐH < 70 mg/dL / < 4.0 mmol/L) - "4.0 IS THE FLOOR"',
      message: `Đường huyết đo được là ${currentGlucoseMmol} mmol/L (${currentGlucoseMgDl} mg/dL). Mốc 4.0 mmol/L là ngưỡng an toàn tuyệt đối nội viện.`,
      actionGuideline: 'Quy tắc 15-20: Cho uống ngay 15-20g carbohydrate hấp thu nhanh (5-7 viên glucose, 150ml nước hoa quả). Thử lại ĐH sau 15 phút. Khi ĐH > 4.0 mmol/L, cho ăn thêm 20g carbohydrate tác dụng chậm (bánh quy, bánh mì, sữa). Rà soát lại nguyên nhân và giảm liều insulin nền/bolus 20%.',
      citation: 'JBDS-IP 01 (Revised Jan 2023) & Diabetes UK',
    });
  } else if (currentGlucoseMmol >= 4.0 && currentGlucoseMmol <= 6.0) {
    alerts.push({
      id: 'looming-hypo',
      category: 'HYPO',
      level: 'WARNING',
      title: 'CẢNH BÁO NGUY CƠ HẠ ĐƯỜNG HUYẾT RÌNH RẬP (Looming Hypoglycaemia: 4.0 - 6.0 mmol/L)',
      message: `Đường huyết hiện tại nằm trong khoảng 4.0 - 6.0 mmol/L (72 - 108 mg/dL) ở bệnh nhân đang dùng insulin hoặc thuốc kích thích tiết insulin (Sulfonylurea).`,
      actionGuideline: 'Chủ động can thiệp phòng ngừa: Nếu bệnh nhân nhịn ăn hoặc sắp làm thủ thuật, bổ sung dịch truyền chứa glucose. Nếu ăn uống được, cho ăn nhẹ bữa phụ (15-20g carb). Xem xét giảm liều insulin trước khi tụt xuống dưới 4.0 mmol/L.',
      citation: 'JBDS-IP 01 (2023) Section: Looming Hypoglycaemia in Hospital',
    });
  }

  // 2. DKA / HHS Emergency Check
  const isHighKetones = (patient.bloodKetones && patient.bloodKetones >= 3.0);
  const isAcidosis = (patient.venousPh && patient.venousPh < 7.3) || (patient.bicarbonate && patient.bicarbonate < 15);
  const isHyperglycemicEmergency = currentGlucoseMmol >= 11.0 || patient.diabetesType === 'T1D';

  // Check for Euglycaemic DKA (especially with SGLT2i)
  const isTakingSGLT2 = patient.currentOralMeds.some(m => ['dapagliflozin', 'empagliflozin', 'canagliflozin', 'ertugliflozin'].includes(m.toLowerCase()));
  if (isTakingSGLT2 && isAcidosis && (isHighKetones || (patient.bloodKetones && patient.bloodKetones > 1.5))) {
    alerts.push({
      id: 'euglycemic-dka',
      category: 'DKA_HHS',
      level: 'CRITICAL',
      title: 'BÁO ĐỘNG ĐỎ: NGI NGỜ TOAN CETON ĐƯỜNG HUYẾT BÌNH THƯỜNG (EUGLYCAEMIC DKA) DO SGLT2i',
      message: `Bệnh nhân dùng thuốc ức chế SGLT-2, có toan chuyển hóa (pH < 7.3 / HCO3 < 15) và Ceton máu tăng, mặc dù đường huyết có thể không cao (< 200 mg/dL).`,
      actionGuideline: '1) NGỪNG NGAY SGLT-2i. 2) Bắt đầu ngay truyền Glucose 10% (125 ml/h) song song với NaCl 0.9% vì đường huyết không cao. 3) Bắt đầu truyền insulin FRIII 0.05 - 0.1 ĐV/kg/h để dập tắt quá trình tạo ceton. 4) Theo dõi khí máu và ceton máu mỗi 1-2 giờ.',
      citation: 'ADA 2026 Standards of Care & JBDS-IP 02 DKA Guidelines',
    });
  } else if (isHighKetones && isAcidosis && isHyperglycemicEmergency) {
    alerts.push({
      id: 'dka-detected',
      category: 'DKA_HHS',
      level: 'CRITICAL',
      title: 'CẤP CỨU: TOAN CETON DO ĐÁI THÁO ĐƯỜNG (DKA - Diabetic Ketoacidosis)',
      message: `Thỏa mãn đủ 3 tiêu chuẩn chẩn đoán DKA: ĐH > 11 mmol/L (hoặc tiền sử ĐTĐ), Ceton máu > 3.0 mmol/L, pH tĩnh mạch < 7.3 hoặc HCO3 < 15 mmol/L.`,
      actionGuideline: '1) Bù dịch NaCl 0.9% 1000ml trong giờ đầu (500ml nếu sốt/tụt HA). 2) Bắt đầu truyền insulin tĩnh mạch tốc độ cố định FRIII 0.1 ĐV/kg/h (tối đa 15 ĐV/h). 3) DUY TRÌ insulin nền liều bình thường (Glargine/Degludec/Detemir). 4) KALI: Nếu K < 3.5 hoãn insulin và bù Kali trước; K 3.5 - 5.5 pha 40 mmol KCl/Lít dịch; K > 5.5 không bù Kali. 5) KHI ĐH < 14 mmol/L (<250 mg/dL): BẮT BUỘC thêm Glucose 10% 125 ml/h và giảm FRIII xuống 0.05 ĐV/kg/h.',
      citation: 'JBDS-IP 02 (Revised March 2023) Single Page Pathway for DKA',
    });
  }

  // Check HHS (Hyperosmolar Hyperglycaemic State)
  const effectiveOsm = (patient.sodium && currentGlucoseMmol) ? calculateEffectiveOsmolality(patient.sodium, currentGlucoseMmol) : null;
  const isSevereOsm = effectiveOsm ? effectiveOsm >= 320 : currentGlucoseMmol >= 30;

  // Check Mixed DKA - HHS
  const isMixedDkaHhs = (isHighKetones && isAcidosis) && (isSevereOsm || (effectiveOsm !== null && effectiveOsm >= 320));

  if (isMixedDkaHhs) {
    alerts.push({
      id: 'mixed-dka-hhs',
      category: 'DKA_HHS',
      level: 'CRITICAL',
      title: 'BÁO ĐỘNG ĐỎ: HỘI CHỨNG HỖN HỢP TOAN CETON & TĂNG ÁP LỰC THẨM THẤU (DKA - HHS MIXED)',
      message: `Bệnh nhân đồng thời có Toan Ceton (pH < 7.3 / HCO3 < 15, Ceton máu > 3.0 mmol/L) VÀ Tăng Áp Lực Thẩm Thấu (ALTT hiệu dụng ≥ 320 mOsm/kg, ĐH ≥ 30 mmol/L). Đây là thể cấp cứu có tỷ lệ tử vong cao nhất trong các biến chứng cấp tính của ĐTĐ.`,
      actionGuideline: '1) Hồi sức thể tích tuần hoàn tích cực như HHS (bù NaCl 0.9% 1000ml/giờ đầu) nhưng phải thận trọng cân bằng điện giải. 2) Bắt đầu truyền insulin tĩnh mạch FRIII 0.1 ĐV/kg/h để ức chế sinh ceton (như DKA). 3) Giữ tốc độ hạ ALTT không quá 3-8 mOsm/kg/h. 4) Bắt buộc theo dõi điện giải đồ, ALTT và ceton máu mỗi 1-2 giờ tại ICU.',
      citation: 'ADA 2026 Standards of Care & JBDS-IP Emergency Guidelines',
    });
  } else if (isSevereOsm && (!patient.bloodKetones || patient.bloodKetones < 3.0) && (!patient.venousPh || patient.venousPh >= 7.3)) {
    alerts.push({
      id: 'hhs-detected',
      category: 'DKA_HHS',
      level: 'CRITICAL',
      title: 'CẤP CỨU: TĂNG ÁP LỰC THẨM THẤU DO ĐTĐ (HHS - Hyperosmolar Hyperglycaemic State)',
      message: `Đường huyết cực cao (≥ 30 mmol/L / ≥ 600 mg/dL) hoặc ALTT hiệu dụng ≥ 320 mOsm/kg (ước tính ${effectiveOsm ? effectiveOsm + ' mOsm/kg' : 'cao'}), không có toan ceton nặng. Thiếu hụt dịch ước tính 100 - 220 ml/kg (10 - 22 Lít).`,
      actionGuideline: '1) BÙ DỊCH LÀ TRỌNG TÂM: NaCl 0.9% 1000ml trong giờ đầu, mục tiêu cân bằng dịch dương 2-3L trong 6h đầu. 2) KHÔNG DÙNG INSULIN NGAY TRỪ KHI ĐÃ BÙ DỊCH ĐẦY ĐỦ VÀ ĐƯỜNG HUYẾT NGỪNG GIẢM (dùng insulin quá sớm gây sụp đổ thể tích tuần hoàn). 3) Khi dùng insulin, liều khởi đầu thấp 0.05 ĐV/kg/h. 4) Tốc độ hạ ALTT không quá 3-8 mOsm/kg/h và hạ ĐH không quá 5 mmol/L/h để tránh phù não / hủy myelin cầu não (CPM). 5) Bắt buộc dùng LMWH dự phòng huyết khối tắc mạch.',
      citation: 'JBDS-IP 06 (Feb 2022) HHS Management Guidelines',
    });
  }

  // 3. Oral Anti-Diabetes (OAD) Safety & Contraindication Alerts
  const medsLower = patient.currentOralMeds.map(m => m.toLowerCase());

  if (medsLower.includes('metformin')) {
    if (patient.egfr !== undefined && patient.egfr < 30) {
      alerts.push({
        id: 'metformin-egfr-contraindicated',
        category: 'OAD_SAFETY',
        level: 'CRITICAL',
        title: 'CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI METFORMIN (eGFR < 30 mL/min/1.73m²)',
        message: 'Nguy cơ nhiễm toan Acid Lactic (Lactic Acidosis) đe dọa tính mạng khi độ lọc cầu thận dưới 30 mL/min.',
        actionGuideline: 'Ngừng Metformin ngay lập tức. Chuyển sang phác đồ Insulin tiêm dưới da để kiểm soát đường huyết nội viện.',
        citation: 'ADA 2026, JBDS-IP 11 & Dược thư Quốc gia Việt Nam',
      });
    } else if (patient.isScheduledSurgery) {
      alerts.push({
        id: 'metformin-surgery',
        category: 'SURGERY',
        level: 'WARNING',
        title: 'LƯU Ý METFORMIN CHU PHẪU / THỦ THUẬT',
        message: 'Nếu phẫu thuật cần tiêm thuốc cản quang hoặc bệnh nhân có nguy cơ suy thận cấp, hạ huyết áp nội viện.',
        actionGuideline: 'Ngưng dùng Metformin vào ngày phẫu thuật và chỉ dùng lại sau 48 giờ khi chức năng thận đã kiểm tra ổn định.',
        citation: 'CPOC & JBDS-IP Guideline for Perioperative Care (2022/2023)',
      });
    }
  }

  if (medsLower.some(m => ['dapagliflozin', 'empagliflozin', 'canagliflozin', 'ertugliflozin'].includes(m))) {
    if (patient.isScheduledSurgery) {
      alerts.push({
        id: 'sglt2-surgery-stop',
        category: 'SURGERY',
        level: 'CRITICAL',
        title: 'NGỪNG THUỐC SGLT2i TRƯỚC PHẪU THUẬT 3 - 4 NGÀY',
        message: 'Thuốc ức chế SGLT2 (Dapagliflozin, Empagliflozin, Canagliflozin) có nguy cơ gây toan ceton chu phẫu (Euglycaemic DKA).',
        actionGuideline: 'Dừng SGLT2i trước mổ phiên 3-4 ngày (Ertugliflozin dừng trước 4 ngày). Theo dõi ceton máu hàng ngày. Chỉ dùng lại khi bệnh nhân đã hồi phục và ăn uống bình thường.',
        citation: 'FDA Safety Alert, CPOC 2022 & ADA 2026',
      });
    }
    if (patient.wardType === 'ICU' || patient.dietType === 'NPO') {
      alerts.push({
        id: 'sglt2-acute-illness',
        category: 'OAD_SAFETY',
        level: 'CRITICAL',
        title: 'TẠM NGỪNG SGLT2i Ở BỆNH NHÂN CẤP TÍNH / NHỊN ĂN / ICU',
        message: 'SGLT2i không được khuyến cáo kiểm soát ĐH nội viện và làm tăng nguy cơ toan ceton khi bệnh nhân nhịn ăn hoặc bệnh nặng.',
        actionGuideline: 'Ngừng SGLT2i, thay thế bằng phác đồ Insulin Basal-Bolus hoặc Basal Plus.',
        citation: 'ADA 2026 Inpatient Guidelines (Rec 16.11)',
      });
    }
  }

  if (medsLower.some(m => ['gliclazide', 'glimepiride', 'glipizide', 'glibenclamide'].includes(m))) {
    if (patient.dietType === 'NPO' || patient.dietType === 'ORAL_POOR' || patient.isScheduledSurgery) {
      alerts.push({
        id: 'su-hypo-risk',
        category: 'OAD_SAFETY',
        level: 'CRITICAL',
        title: 'NGUY CƠ HẠ ĐƯỜNG HUYẾT KÉO DÀI VỚI SULFONYLUREA',
        message: 'Sulfonylurea kích thích tụy tiết insulin độc lập với mức glucose. Khi bệnh nhân ăn kém hoặc nhịn ăn, nguy cơ hạ đường huyết nặng và kéo dài 24-36 giờ.',
        actionGuideline: 'Dừng Sulfonylurea trong thời gian nằm viện hoặc nhịn ăn. Chuyển sang Insulin nền hoặc Basal Plus để kiểm soát an toàn.',
        citation: 'TS.BS Trần Quang Nam (VADE) & JBDS-IP 01',
      });
    }
  }

  // 4. Dialysis Specific Alerts
  if (patient.isOnDialysis) {
    if (patient.dialysisType === 'peritoneal' && patient.pdFluidType === 'icodextrin') {
      alerts.push({
        id: 'icodextrin-gdh-pqq',
        category: 'DIALYSIS',
        level: 'CRITICAL',
        title: 'CẢNH BÁO TỬ VONG: CẤM DÙNG MÁY THỬ ĐƯỜNG HUYẾT GDH-PQQ KHI DÙNG ICODEXTRIN',
        message: 'Icodextrin trong dịch lọc màng bụng chuyển hóa thành maltose, gây dương tính giả trên máy thử đường huyết công nghệ GDH-PQQ (kết quả hiển thị ĐH rất cao giả tạo, dẫn đến tiêm quá liều insulin gây hôn mê tử vong).',
        actionGuideline: 'BẮT BUỘC chỉ sử dụng máy đo đường huyết công nghệ Glucose Oxidase (GO) hoặc GDH-FAD/GDH-NAD không bị tương tác với maltose.',
        citation: 'JBDS-IP 11 (March 2023) Section 2.7 & FDA Black Box Alert',
      });
    }
    if (patient.dialysisType === 'hemodialysis' && patient.isDialysisDay) {
      alerts.push({
        id: 'hemodialysis-dose-reduction',
        category: 'DIALYSIS',
        level: 'WARNING',
        title: 'GIẢM 25% LIỀU INSULIN VÀO NGÀY CHẠY THẬN NHÂN TẠO (mHDx)',
        message: 'Lọc máu làm giảm đường huyết (nadir thấp nhất ở giờ thứ 3) và làm tăng độ nhạy insulin. 75% cơn hạ đường huyết xảy ra trong vòng 24h sau lọc máu.',
        actionGuideline: 'Chủ động giảm 25% liều insulin nền/bữa ăn vào ngày chạy thận. Nếu ĐH trước lọc máu < 7.0 mmol/L (< 126 mg/dL), cho ăn 20-30g carb chậm ngay đầu ca lọc.',
        citation: 'JBDS-IP 11 (March 2023) Section 3B.5 & Section 5A',
      });
    }
  }

  // 5. Corticoid / Steroid Specific Alerts
  if (patient.isTakingSteroids) {
    alerts.push({
      id: 'steroid-hyperglycaemia',
      category: 'STEROID',
      level: 'WARNING',
      title: 'ĐẶC TÍNH TĂNG ĐƯỜNG HUYẾT DO CORTICOID: ĐỈNH BUỔI CHIỀU & TỐI',
      message: 'Prednisolone hoặc Dexamethasone uống buổi sáng gây tăng ĐH từ trưa đến tối, sáng hôm sau ĐH đói có thể gần như bình thường.',
      actionGuideline: '1) Tăng cường đo ĐH mao mạch trước bữa trưa, trước bữa tối và trước khi đi ngủ. 2) Ưu tiên dùng Insulin NPH tiêm cùng lúc buổi sáng (đỉnh tác dụng 4-6h trùng đỉnh tăng ĐH của steroid). 3) Hoặc tăng liều insulin nhanh trước bữa trưa và tối 20-40%. 4) Cho ăn bữa phụ lúc đi ngủ để phòng ngừa hạ ĐH về đêm.',
      citation: 'JBDS-IP 08 (Jan 2023) & ADA 2026 Standards of Care',
    });
  }

  // 6. Sliding Scale Alone warning (Anti-pattern)
  alerts.push({
    id: 'anti-sliding-scale',
    category: 'GENERAL',
    level: 'INFO',
    title: 'KHUYẾN CÁO: KHÔNG SỬ DỤNG SLIDING-SCALE INSULIN ĐƠN ĐỘC',
    message: 'Nghiên cứu RABBIT-2 và khuyến cáo ADA 2026 (Rec 16.10): Việc dùng thang trượt (sliding scale) phản ứng đơn độc không có insulin nền làm tăng dao động đường huyết và tăng biến chứng nội viện.',
    actionGuideline: 'Luôn kết hợp Insulin nền (Basal) + Bữa ăn (Prandial) + Hiệu chỉnh (Correction scale) cho bệnh nhân ăn uống được, hoặc Basal Plus cho bệnh nhân nhịn ăn.',
    citation: 'ADA 2026 Rec 16.10 & RABBIT 2 Trial (Umpierrez GE)',
  });

  // 7. Premixed Insulin Clinical Safety Alerts
  if (patient.userPreferredRegimen === 'PREMIX') {
    if (patient.dietType === 'NPO' || patient.dietType === 'ORAL_POOR') {
      alerts.push({
        id: 'premix-npo-danger',
        category: 'HYPO',
        level: 'CRITICAL',
        title: 'CẢNH BÁO NGUY HIỂM: CHỐNG CHỈ ĐỊNH INSULIN TRỘN SẴN KHI NHỊN ĂN / ĂN UỐNG KÉM',
        message: 'Bệnh nhân đang nhịn ăn (NPO) hoặc ăn uống kém không thể dùng Insulin trộn sẵn (Premix). Thành phần tác dụng nhanh và trung gian cố định sẽ gây tụt đường huyết nghiêm trọng do thiếu carbohydrate nạp vào.',
        actionGuideline: 'Ngừng ngay phác đồ Premix. Đổi ngay sang phác đồ Basal Plus (chỉ dùng insulin nền + liều hiệu chỉnh khi ĐH cao) hoặc truyền insulin tĩnh mạch.',
        citation: 'TS.BS Trần Quang Nam (BV ĐHYD TP.HCM) & ADA Standards of Care 2026',
      });
    } else if (patient.wardType === 'ICU') {
      alerts.push({
        id: 'premix-icu-danger',
        category: 'GENERAL',
        level: 'CRITICAL',
        title: 'KHÔNG SỬ DỤNG INSULIN TRỘN SẴN TRONG KHU VỰC HỒI SỨC CẤP CỨU (ICU)',
        message: 'Bệnh nhân hồi sức nặng có huyết động không ổn định, nguy cơ suy tạng và hấp thu dưới da thất thường.',
        actionGuideline: 'Chỉ định truyền insulin tĩnh mạch liên tục (VRIII/FRIII) kèm theo dõi đường huyết mỗi 1 - 2 giờ.',
        citation: 'ADA 2026 Rec 16.5 & JBDS-IP Inpatient Protocols',
      });
    } else if (patient.isScheduledSurgery) {
      alerts.push({
        id: 'premix-surgery-warning',
        category: 'SURGERY',
        level: 'WARNING',
        title: 'LƯU Ý INSULIN TRỘN SẴN CHU PHẪU',
        message: 'Vào ngày phẫu thuật bệnh nhân phải nhịn ăn, do đó không được tiêm liều insulin trộn buổi sáng theo thường quy.',
        actionGuideline: 'Chuyển sang phác đồ Basal-Bolus hoặc truyền insulin tĩnh mạch có kiểm soát (VRIII) vào buổi sáng ngày mổ.',
        citation: 'CPOC & JBDS-IP Diabetes Perioperative Care',
      });
    }
  }

  return alerts;
};

/**
 * JBDS-IP Hypoglycemia Protocol Resolver
 */
export const getHypoProtocol = (
  patient: PatientData,
  currentGlucoseMmol: number
): HypoProtocolDetails => {
  let severityLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'LOOMING' = 'LEVEL_1';
  let algorithmPathway: 'A' | 'B' | 'C' | 'D' | 'E' = 'A';

  if (currentGlucoseMmol >= 4.0 && currentGlucoseMmol <= 6.0) {
    severityLevel = 'LOOMING';
  } else if (currentGlucoseMmol >= 3.0 && currentGlucoseMmol < 4.0) {
    severityLevel = 'LEVEL_1';
  } else if (currentGlucoseMmol >= 2.2 && currentGlucoseMmol < 3.0) {
    severityLevel = 'LEVEL_2';
  } else {
    severityLevel = 'LEVEL_3';
  }

  // Determine pathway based on diet and clinical state
  if (patient.dietType === 'ENTERAL_TUBE') {
    algorithmPathway = 'E';
  } else if (patient.dietType === 'NPO') {
    algorithmPathway = 'D';
  } else if (severityLevel === 'LEVEL_3' || patient.wardType === 'ICU') {
    algorithmPathway = 'C';
  } else if (severityLevel === 'LEVEL_2') {
    algorithmPathway = 'B';
  } else {
    algorithmPathway = 'A';
  }

  const pathwayData: Record<'A' | 'B' | 'C' | 'D' | 'E', HypoProtocolDetails> = {
    A: {
      severityLevel,
      algorithmPathway: 'A',
      title: 'Phác đồ A: Người bệnh tỉnh táo, tiếp xúc tốt, nuốt an toàn',
      definition: 'Hạ đường huyết nhẹ - trung bình ở bệnh nhân hoàn toàn tỉnh táo và hợp tác.',
      immediateAction: [
        'Dừng ngay truyền insulin nếu đang có truyền tĩnh mạch.',
        'Cho uống ngay 15 - 20g carbohydrate hấp thu nhanh:',
        '• 150 - 200 ml nước ép trái cây nguyên chất (hoặc nước đường pha: 3-4 thìa cà phê đường).',
        '• Hoặc 5-7 viên nén Dextrosol / 4-5 viên Lift GlucoTabs.',
        '• Lưu ý: Người bệnh suy thận nặng tránh dùng nước cam vì chứa nhiều Kali. Nếu đang dùng thuốc Acarbose, bắt buộc dùng đường Glucose đơn, không dùng đường mía Sucrose.',
      ],
      retestInstructions: 'Thử lại đường huyết mao mạch sau 10 - 15 phút. Nếu vẫn < 4.0 mmol/L, lặp lại bước uống trên (tối đa 3 lần). Nếu sau 30-45 phút chưa lên, báo ngay bác sĩ và chuyển Phác đồ C (tiêm TM Glucose).',
      recoveryStep: 'Khi đường huyết đã ≥ 4.0 mmol/L: Cung cấp ngay 20g carbohydrate tác dụng chậm (2 chiếc bánh quy, 1 lát bánh mì sandwich, hoặc 1 ly sữa 200ml hoặc ăn ngay bữa chính nếu đã đến giờ ăn).',
      criticalNotes: [
        'TUYỆT ĐỐI KHÔNG BỎ LIỀU INSULIN TIẾP THEO (chỉ xem xét giảm 20% liều nếu cần).',
        'Rà soát liều insulin có tác dụng tại thời điểm xảy ra cơn hạ đường huyết.',
        'Theo dõi đường huyết mao mạch ít nhất mỗi 4 giờ trong 24-48 giờ tiếp theo.',
      ],
    },
    B: {
      severityLevel,
      algorithmPathway: 'B',
      title: 'Phác đồ B: Người bệnh tỉnh nhưng lú lẫn, kích động, không hợp tác nhưng còn phản xạ nuốt',
      definition: 'Hạ đường huyết có triệu chứng thần kinh thực thể nhẹ/trung bình, khó nuốt viên/cốc nước.',
      immediateAction: [
        'Dừng ngay truyền insulin nếu có.',
        'Nếu bệnh nhân hợp tác được một phần: xử trí như Phác đồ A.',
        'Nếu không hợp tác: Bôi 2 tuýp Gel Glucose 40% (Glucogel) vào khoang má giữa răng và nướu.',
        'Nếu bôi gel không hiệu quả hoặc không có gel: Tiêm Glucagon 1mg tiêm bắp (IM) (ít tác dụng nếu do Sulfonylurea hoặc xơ gan, suy dinh dưỡng nặng).',
      ],
      retestInstructions: 'Đo lại đường huyết sau 10 - 15 phút. Nếu vẫn < 4.0 mmol/L, gọi hỗ trợ y tế khẩn cấp và chuyển sang tiêm tĩnh mạch Glucose (Phác đồ C).',
      recoveryStep: 'Khi bệnh nhân tỉnh táo và ĐH ≥ 4.0 mmol/L: Ăn 20g tinh bột chậm (hoặc 40g nếu vừa tiêm Glucagon vì cạn kiệt dự trữ glycogen).',
      criticalNotes: [
        'Không cố ép bệnh nhân uống nước lỏng nếu đang kích động/chống đối vì nguy cơ sặc phổi.',
        'Chuẩn bị sẵn sàng đường truyền tĩnh mạch.',
      ],
    },
    C: {
      severityLevel,
      algorithmPathway: 'C',
      title: 'Phác đồ C: Người bệnh hôn mê, co giật, lơ mơ sâu hoặc kích động dữ dội',
      definition: 'CẤP CỨU HẠ ĐƯỜNG HUYẾT NẶNG (LEVEL 3) - Đe dọa tổn thương não vĩnh viễn.',
      immediateAction: [
        'Kiểm tra ngay ABC (Đường thở, Thở, Tuần hoàn) và cho thở oxy nếu SpO2 < 94%.',
        'Dừng NGAY LẬP TỨC mọi dây truyền insulin tĩnh mạch.',
        'Gọi cấp cứu/hỗ trợ bác sĩ trực lập tức.',
        'Nếu CÓ ĐƯỜNG TRUYỀN TĨNH MẠCH: Truyền nhanh 100ml Glucose 20% (tốc độ 400ml/h trong 15 phút) HOẶC 200ml Glucose 10% (tốc độ 800ml/h trong 15 phút).',
        'Nếu CHƯA CÓ ĐƯỜNG TRUYỀN: Tiêm bắp ngay Glucagon 1mg IM trong khi khẩn trương thiết lập đường truyền tĩnh mạch lớn.',
      ],
      retestInstructions: 'Đo lại ĐH mao mạch sau 10 phút. Nếu vẫn < 4.0 mmol/L, lặp lại truyền Glucose 10% hoặc 20%.',
      recoveryStep: 'Khi ĐH ≥ 4.0 mmol/L và người bệnh tỉnh lại: Cho ăn 20g carb chậm (hoặc 40g nếu dùng Glucagon). Nếu bệnh nhân phải nhịn ăn, duy trì truyền tĩnh mạch Glucose 10% tốc độ 100ml/giờ.',
      criticalNotes: [
        'Không dùng Glucose 50% ngoại vi vì nguy cơ viêm tắc tĩnh mạch và hoại tử mô nếu thoát mạch (JBDS 2023 chỉ khuyến cáo 10% hoặc 20%).',
        'Theo dõi sát tri giác và thang điểm Glasgow (GCS).',
      ],
    },
    D: {
      severityLevel,
      algorithmPathway: 'D',
      title: 'Phác đồ D: Người bệnh có chỉ định nhịn ăn (NPO / Nil by mouth)',
      definition: 'Hạ đường huyết ở bệnh nhân đang nhịn ăn chuẩn bị phẫu thuật hoặc sau mổ.',
      immediateAction: [
        'Dừng ngay truyền insulin tĩnh mạch nếu đang có.',
        'Xử trí bằng đường tĩnh mạch: Truyền nhanh 100ml Glucose 20% hoặc 200ml Glucose 10% trong 15 phút (như Phác đồ C).',
      ],
      retestInstructions: 'Đo lại ĐH sau 10-15 phút. Lặp lại nếu ĐH vẫn < 4.0 mmol/L.',
      recoveryStep: 'Khi ĐH > 4.0 mmol/L: Duy trì truyền Glucose 10% tốc độ 100 ml/giờ liên tục cho đến khi bệnh nhân hết chỉ định nhịn ăn hoặc có đánh giá mới của bác sĩ.',
      criticalNotes: [
        'Không cho ăn uống bằng đường miệng vì vi phạm chỉ định nhịn ăn gây hoãn mổ hoặc trào ngược.',
        'Ở bệnh nhân ĐTĐ típ 1: Bắt buộc duy trì một lượng insulin nền tối thiểu hoặc truyền tĩnh mạch song song có đường để tránh bùng phát Toan Ceton (DKA).',
      ],
    },
    E: {
      severityLevel,
      algorithmPathway: 'E',
      title: 'Phác đồ E: Người bệnh đang nuôi ăn qua sonde dạ dày (Enteral feeding / NGT / PEG)',
      definition: 'Hạ đường huyết ở bệnh nhân có ống thông nuôi dưỡng ruột.',
      immediateAction: [
        'Dừng truyền insulin nếu có.',
        'Nếu không có đường truyền TM: Bơm qua ống thông sonde dạ dày 15 - 20g carb nhanh:',
        '• 150 - 200 ml nước cam nguyên chất HOẶC 2 tuýp Gel Glucose 40% (Glucogel) (không dùng cho sonde nhỏ fine-bore).',
        '• BẮT BUỘC TRÁNG ỐNG SONDE VỚI 40 - 50 ml NƯỚC SẠCH để tránh tắc ống.',
        'Nếu bệnh nhân có đường truyền TM: Ưu tiên truyền Glucose 10% hoặc 20% theo phác đồ C.',
      ],
      retestInstructions: 'Đo lại ĐH sau 10-15 phút. Nếu vẫn < 4.0 mmol/L, lặp lại điều trị và báo bác sĩ.',
      recoveryStep: 'Khi ĐH > 4.0 mmol/L: Khởi động lại máy nuôi ăn qua sonde (hoặc bơm thêm cữ sữa nuôi ăn tương đương 15-20g carbohydrate) HOẶC duy trì Glucose 10% 100ml/h TTM.',
      criticalNotes: [
        'CẢNH BÁO NGU CƠ NGHẸT ỐNG: Không nghiền thuốc viên hoặc dùng nước ngọt có ga để tránh làm hỏng thành ống.',
        'Nếu nuôi ăn bị gián đoạn đột ngột (tuột sonde, nghẹt ống) mà đã tiêm insulin bữa ăn, nguy cơ tụt đường huyết cực cao!',
      ],
    },
  };

  return pathwayData[algorithmPathway];
};
